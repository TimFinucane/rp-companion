import * as React from 'react';

interface MapProperties
{
    map_name: string;
    image_url: string;
}

/*
 * A single instance of your standard pen and paper map.
 * Following features will/should be supported:
 *  - 'Points of Interest' on the maps (adding, removing, etc.) TODO:
 *  - Obscuring parts of the map/Slowly reveals itself to players (but not dms) TODO:
 *  - OPTIONAL: animation? TODO:
 */
export default class Map extends React.Component<MapProperties, {}>
{
    public render()
    {
        return <div>
            <img src={this.props.image_url}/>
            {/* TODO: points of interest */}
        </div>;
    }
}
