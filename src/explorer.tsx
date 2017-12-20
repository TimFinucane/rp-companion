/* Author: Tim Finucane, Copyright: MIT
 * This module is for displaying the file heirarchy of the wiki,
 * similar to other solution explorers
 */

import * as React from "react";

class ElementProps
{
    public "data-name": string;
}

class Element extends React.Component<ElementProps, any>
{
    public render()
    {
        return <li>Element {this.props["data-name"]}</li>;
    }
}

export class Explorer extends React.Component
{
    public render()
    {
        return (
            <ul>
                <Element data-name="A"/>
                <Element data-name="B"/>
                <Element data-name="C"/>
            </ul>
        );
    }
}