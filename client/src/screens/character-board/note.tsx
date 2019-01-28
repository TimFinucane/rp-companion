/**
 * A note displays the character details, and allows you to edit the details.
 * A note can also be dragged around the screen.
 */

import * as React from 'react';
import { DragSourceSpec, DragSourceCollector, DragElementWrapper, DragSourceOptions, DragSource } from 'react-dnd';

import Character from 'common/character';
import * as styles from './styles.scss';
import { CHARACTER_TARGET } from 'data/characters';

// Drag Stuff
const source: DragSourceSpec<Character, {character_name: string}> = {
    beginDrag(props) {
        return { character_name: props.name };
    }
};
interface CollectProps {
    connect_drag_source: DragElementWrapper<DragSourceOptions>;
}
const collector: DragSourceCollector<CollectProps> = (connect, monitor) => {
    return {connect_drag_source: connect.dragSource()};
};

class NoteView extends React.Component<Character & CollectProps, {edit: boolean}> {
    public render() {
        return this.props.connect_drag_source(<div className={styles.note} onClick={() => this.setState({edit: !this.state.edit})}>
            {this.render_title()}
            {this.render_body()}
        </div>);
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

export default DragSource(CHARACTER_TARGET, source, collector)(NoteView);
