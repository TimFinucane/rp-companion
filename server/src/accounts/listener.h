#pragma once

#include <cpprest/http_listener.h>
#include <cpprest/uri.h>

#include <functional>

#include "accounts.h"

namespace accounts
{
    class Listener
    {
    public:
        Listener( const web::uri& accounts_uri, Accounts& accounts )
            : listener( accounts_uri )
        {
            using std::placeholders::_1;
            listener.support( web::http::methods::GET,  std::bind( &Listener::get,      this, _1 ) );
            listener.support( web::http::methods::PUT,  std::bind( &Listener::put,      this, _1 ) );
            listener.support( web::http::methods::POST, std::bind( &Listener::post,     this, _1 ) );
            listener.support( web::http::methods::DEL,  std::bind( &Listener::delete_,  this, _1 ) );
        }

        auto open()
        {
            return listener.open();
        }
        auto close()
        {
            return listener.close();
        }

    private:
        using http_listener = web::http::experimental::listener::http_listener;
        using request = web::http::http_request;

        const string_t Q_TOKEN = U( "token" );
        const string_t Q_USERNAME = U( "username" );
        const string_t Q_PASSWORD = U( "token" );
        const string_t Q_ERROR = U( "error" );


        // Checks for any of the following GET requests to accounts:
        // - GET with token, returns { "username": username } of associated token
        // - GET with username and json body of { password }, returns a newly created token { "token": token }
        void    get( request message )
        {
            auto query = web::http::uri::split_query( message.relative_uri().path() );

            // Check for what components are present
            if( query.count( Q_TOKEN ) )
            {
                // Construct { "username": username } as response
                web::json::value response;
                response[Q_USERNAME] = web::json::value::string( accounts.get_username( query[Q_TOKEN] ) );

                message.reply( web::http::status_codes::OK, response );
            }
            else if( query.count( Q_USERNAME ) )
            {
                // Looks for password in the body of the message, uses it to generate a token.
                // TODO: Better error detection?
                // TODO: Check password is correct
                message.extract_json().then( [&]( web::json::value& message_body ) {
                    const auto& username = query.at( Q_USERNAME );
                    const auto& password = message_body.at( Q_PASSWORD ).as_string();

                    web::json::value response;
                    web::http::status_code status;

                    string_t error_message;
                    if( check_account( username, password, error_message, status ) )
                    {
                        response[Q_ERROR] = web::json::value::string( error_message );
                    }
                    else
                    {
                        response[Q_TOKEN] = web::json::value::string(
                            accounts.create_token( query.at( Q_USERNAME ), message_body.at( Q_PASSWORD ).as_string() )
                        );
                        status = web::http::status_codes::OK;
                    }

                    message.reply( status, response );
                } );
            }
            else
                bad_request_reply( message );
        }
        // Checks for any of the following PUT requests to accounts:
        // - PUT with username, json body of: {old_password, new_password}.
        //      Creates a new account if one does not exist, otherwise doesnt do anything.
        //      returns: nothing if successful (200 OK)
        //               { "error": error_message } if the account exists AND the password is different.
        void    put( request message )
        {
            auto query = web::http::uri::split_query( message.relative_uri().path() );
            if( query.count( Q_USERNAME ) )
            {
                message.extract_json().then( [&]( web::json::value& message_body ) {
                    const auto& username = query[Q_USERNAME];
                    const auto& new_password = message_body.at( U( "new_password" ) ).as_string();
                    const auto& old_password = message_body.at( U( "old_password" ) ).as_string();

                    web::http::status_code status;
                    web::json::value response;

                    string_t error_message;
                    if( check_account( username, old_password, error_message, status ) )
                    {
                        response[Q_ERROR] = web::json::value::string( error_message );
                    }
                    else
                    {
                        status = web::http::status_codes::OK;
                    }

                    message.reply( status, response );
                } );
            }
            else
                bad_request_reply( message );
        }
        // Checks for any of the following:
        // - POST with username, json body as password.
        //      Creates a new account if one does not exist.
        //      returns 200 OK if created
        //              { "error": error_message } if the account exists.
        void    post( request message )
        {
            auto query = web::http::uri::split_query( message.relative_uri().path() );
            if( query.count( Q_USERNAME ) )
            {
                message.extract_json().then( [&]( web::json::value& message_body ) {
                    const auto& username = query.at( Q_USERNAME );
                    const auto& password = message_body.at( Q_PASSWORD ).as_string();

                    web::http::status_code status;
                    web::json::value response;

                    if( accounts.exists( username ) )
                    {
                        status = web::http::status_codes::BadRequest;
                        response[Q_ERROR] = web::json::value::string( U( "Account already exists with that name" ) );
                    }
                    else
                    {
                        accounts.add( username, password );

                        status = web::http::status_codes::OK;
                    }

                    message.reply( status, response );
                } );
            }
            else
                bad_request_reply( message );
        }
        // Checks for any of the following:
        // - DELETE with username, json body is { password }. Deletes the account.
        //      returns (200 OK) if successful, or { "error": ... } otherwise
        // - DELETE with token, password. Expires the token.
        void    delete_( request message )
        {
            auto query = web::http::uri::split_query( message.relative_uri().path() );
            if( query.count( Q_USERNAME ) )
            {
                message.extract_json().then( [&]( web::json::value& message_body ) {
                    const auto& username = query.at( Q_USERNAME );
                    const auto& password = message_body.at( Q_PASSWORD ).as_string();

                    web::http::status_code status;
                    web::json::value response;
                    string_t error_message;
                    if( check_account( username, password, error_message, status ) )
                    {
                        response[Q_ERROR] = web::json::value::string( error_message );
                    }
                    else
                    {
                        accounts.remove( username, password );

                        status = web::http::status_codes::OK;
                    }

                    message.reply( status, response );
                } );
            }
            else
                bad_request_reply( message );
        }

        //void    error( pplx::task<void> proc );

        bool    check_account( const string_t& username, string_t& message, web::http::status_code& code )
        {
            if( !accounts.exists( username ) )
            {
                message = U( "Given username does not exist! Cannot get token." );
                code = web::http::status_codes::BadRequest;

                return true;
            }
            return false;
        }
        bool    check_account( const string_t& username, const string_t& password, string_t& message, web::http::status_code& code )
        {
            if( check_account( username, message, code ) )
                return true;
            else if( !accounts.verify( username, password ) )
            {
                message = U( "Password incorrect" );
                code = web::http::status_codes::BadRequest;

                return true;
            }
            return false;
        }

        void    bad_request_reply( request& message )
        {
            web::json::value response;
            response[Q_ERROR] = web::json::value::string( U( "Query should either contain token or username (with password in body)" ) );
            message.reply( web::http::status_codes::BadRequest, response );
        }

        http_listener   listener;
        Accounts&       accounts;
    };
}