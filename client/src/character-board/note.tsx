import * as React from 'react';

import Character from 'common/character';
import * as styles from './styles.scss';

export interface NoteData {
    position: {x: number, y: number};
}

export class Note extends React.Component<Character & NoteData & {index: number}, {edit: boolean}> {
    public render() {
        return <div
            className={styles.note}
            onClick={() => this.setState({edit: true})} // TODO: Move styles into sass
            onBlur={() => this.setState({edit: false})}
            style={{top: this.props.position.y, left: this.props.position.x, zIndex: this.props.index}}
        >
            {this.render_title()}
            {this.render_body()}
        </div>;
    }

    public state = {edit: false};

    // PRIVATE
    private render_title() {
        if(this.state.edit)
            return <input className={styles.title} type="text" defaultValue={this.props.name}/>;
        else
            return <h1 className={styles.title}>{this.props.name}</h1>;
    }

    private render_body() {
        if(this.state.edit)
            return <textarea className={styles.body} defaultValue={this.props.text}/>;
        else
            return <p className={styles.body} >{this.props.text}</p>;
    }
}
