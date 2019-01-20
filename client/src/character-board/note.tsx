import * as React from 'react';

import Character from 'common/character';

export interface NoteData {
    position: {x: number, y: number};
}

export class Note extends React.Component<Character & NoteData, {edit: boolean}> {
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
            return <input type="text" defaultValue={this.props.name}/>;
        else
            return <h1>{this.props.name}</h1>;
    }

    private render_body() {
        if(this.state.edit)
            return <textarea defaultValue={this.props.text}/>;
        else
            return <p>{this.props.text}</p>;
    }
}
