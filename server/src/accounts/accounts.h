#pragma once

#include <map>
#include <cpprest/asyncrt_utils.h>
#include <codecvt>

#include <fstream>

using string_t = utility::string_t;

namespace accounts
{
    class Account_overwrite_error : public std::runtime_error
    {
    public:
        Account_overwrite_error( const string_t& username, const char* action )
            : runtime_error(
                "Account "
                + std::wstring_convert<std::codecvt_utf8<wchar_t>, wchar_t>{}.to_bytes( username )
                + " already exists, can't "
                + action
            )
        {}
    };
    class Account_not_found_error : public std::runtime_error
    {
    public:
        Account_not_found_error( const string_t& username, const char* action )
            : runtime_error(
                "Account "
                + std::wstring_convert<std::codecvt_utf8<wchar_t>, wchar_t>{}.to_bytes( username )
                + " does not exist when trying to "
                + action )
        {
        }
    };
    class Password_incorrect_error : public std::runtime_error
    {
    public:
        Password_incorrect_error( const string_t& username, const char* action )
            : runtime_error(
                "Account "
                + std::wstring_convert<std::codecvt_utf8<wchar_t>, wchar_t>{}.to_bytes( username )
                + " does not have the password given when attempting "
                + action
            )
        {}
    };
    class Token_not_found_error : public std::runtime_error
    {
    public:
        Token_not_found_error( string_t token )
            : runtime_error(
                "Token "
                + std::wstring_convert<std::codecvt_utf8<wchar_t>, wchar_t>{}.to_bytes( token )
                + " does not exist."
            )
        {
        }
    };

    /*
     * Handles accounts and applying actions to accounts:
     *  - account creation/deletion
     *  - creating tokens for login sessions, and verifying tokens
     *  - permissions for each account
     *  - passwd changes
     *  - etc.
     */
    class Accounts
    {
    public:
        Accounts( std::string accounts_filename )
            : accounts_filename( accounts_filename )
        {
            // Attempt to load from file
            std::ifstream accounts_file( accounts_filename );

            if( accounts_file.good() )
            {
                // Contains usernames and passwords.
                auto accounts_json = json::value::parse( accounts_file );

                for( auto& account : accounts_json.as_array() )
                {
                    passwords.insert( std::make_pair( account.at( U( "username" ) ).as_string(), account.at( U( "password" ) ).as_string() ) );
                }
            }
        }
        ~Accounts();

        void        save_to_file();

        // Checks whether there is an account with the given username
        bool        exists( const string_t& username ) const
        {
            return passwords.find( username ) != passwords.end();
        }
        // Checks whether an account exists and has the given password.
        // Returns false if the password is incorrect, and Account_not_found_error if the account doesnt exist
        bool        verify( const string_t& username, const string_t& password ) const
        {
            auto account_it = passwords.find( username );

            if( account_it != passwords.end() )
                throw Account_not_found_error( username, "verify password" );

            return account_it->second == password;
        }

        // If an account with the username doesnt exist, adds an account with the given password.
        // Throws Account_Overwrite_Exception if the account exists
        void        add( const string_t& username, const string_t& password )
        {
            auto account_it = passwords.lower_bound( username );

            if( account_it != passwords.end && account_it->first == username )
                throw Account_overwrite_error( username, "create account" );

            passwords.insert( account_it, std::make_pair( username, password ) );
        }

        // Removes the given account.
        // Throws Account_not_found_error if the account does not exist
        // Throws Password_incorrect_error if the password does not match.
        // TODO: Proper throwing messages
        void        remove( const string_t& username, const string_t& password )
        {
            auto account_it = passwords.find( username );
            if( account_it == passwords.end() )
                throw Account_not_found_error( username, "delete account" );

            if( account_it->second != password )
                throw Password_incorrect_error( username, "delete account" );

            // TODO: Ensure token is not being used/automatically expire token?
            // A potential option is to only remove the account at the end of the session
            passwords.erase( account_it );
        }

        // Creates a token for a given account.
        // May throw Account_not_found_error and Password_incorrect_error in either situation.
        // Returns the token that can now be used. TODO: token expiration.
        string_t    create_token( const string_t& username, const string_t& password )
        {
            if( !exists( username ) )
                throw Account_not_found_error( username, "create token" );

            if( !verify( username, password ) )
                throw Password_incorrect_error( username, "create token" );

            string_t account_token = token_generator.generate();

            tokens.insert( std::make_pair( account_token, username ) );

            return account_token;
        }
        // Destroys a token.
        // May throw Token_not_found_error
        void        destroy_token( const string_t& account_token )
        {
            auto token_it = tokens.find( account_token );

            if( token_it == tokens.end() )
                throw Token_not_found_error( account_token );

            tokens.erase( token_it );
        }
        // Gets the username of the user associated with a token
        // May throw Token_not_found_error
        string_t    get_username( const string_t& token ) const
        {
            auto token_it = tokens.find( token );

            if( token_it == tokens.end() )
                throw Token_not_found_error( token );

            return token_it->second;
        }
    private:
        // Usernames and passwords
        std::map<string_t, string_t>    passwords; // Key = username, Value = password
        std::map<string_t, string_t>    tokens; // Key = token, Value = username

        utility::nonce_generator        token_generator;
        std::string                     accounts_filename;
    };
}
