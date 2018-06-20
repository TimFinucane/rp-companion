
#pragma once

#include <cpprest/http_listener.h>
#include <cpprest/uri.h>

class Listener
{
public:
    Listener( const web::uri& accounts_uri )
        : listener( accounts_uri )
    {}

private:
    using http_listener = web::http::experimental::listener::http_listener;
    using request = web::http::http_request;

    void    get( request message );
    void    put( request message );
    void    post( request message );
    void    delete_( request message );

    void    error( pplx::task<void> proc );

    http_listener   listener;
};
