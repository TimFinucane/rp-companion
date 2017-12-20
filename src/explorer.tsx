/* Author: Tim Finucane, Copyright: MIT
 * This module is for displaying the file heirarchy of the wiki,
 * similar to other solution explorers
 */

import * as React from "react";
const css = require( "./explorer.scss" );

class Element extends React.Component<{ name: string }>
{
    public render()
    {
        return <li className={css.element}>Element {this.props.name}</li>;
    }
}

export class Explorer extends React.Component<{ names: string[] }>
{
    public render()
    {
        // Render each element as a list
        const elements: JSX.Element[] = [];

        for ( const name of this.props.names )
        {
            elements.push( <Element key={name} name={name} /> );
        }

        return <ul className={css.list}>{elements}</ul>;
    }
}