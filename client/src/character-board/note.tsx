import * as React from 'react';

import Character from 'common/character';

export default class Note extends React.Component<Character, {edit: boolean, position: {x: number, y: number}}> {
    public render() {
        return <div
            onClick={() => this.setState({edit: true})} // TODO: Move styles into sass
            onBlur={() => this.setState({edit: false})}
            style={{position: "absolute", top: this.state.position.y, right: this.state.position.x}}
        >
            {this.render_title()}
            {this.render_body()}
        </div>;
    }

    public state = {edit: false, position: {x: 50, y: 50}};

    // PRIVATE
    private render_title() {
        if(this.state.edit)
            return <input type="text" value={this.props.name}/>;
        else
            return <h1>{this.props.name}</h1>;
    }

    private render_body() {
        if(this.state.edit)
            return <textarea>{this.props.text}</textarea>;
        else
            return <p>{this.props.text}</p>;
    }
}
