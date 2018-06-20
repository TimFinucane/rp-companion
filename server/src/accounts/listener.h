
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

        // Checks for any of the following GET requests to accounts:
        // - GET with token, returns { "username": username } of associated token
        // - GET with username and password, returns a newly created token { "token": token }
        void    get( request message );
        // Checks for any of the following PUT requests to accounts:
        // - PUT with username, old_password, new_password.
        //      Creates a new account if one does not exist, otherwise doesnt do anything.
        //      returns: nothing if successful (200 OK)
        //               { "error": error_message } if the account exists AND the password is different.
        // - PUT with username, 
        void    put( request message );
        // Checks for any of the following:
        // - POST with username, password.
        //      Creates a new account if one does not exist.
        //      returns { "created": true if account was created }
        //              { "error": error_message } if the account exists.
        void    post( request message );
        // Checks for any of the following:
        // - DELETE with username, password. Deletes the account.
        //      returns (200 OK) if successful, or { "error": ... } otherwise
        // - DELETE with token, password. Expires the token.
        void    delete_( request message );

        void    error( pplx::task<void> proc );

        http_listener   listener;
    };
}