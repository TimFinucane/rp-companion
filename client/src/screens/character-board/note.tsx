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
const source: DragSourceSpec<Props, {character_name: string}> = {
    beginDrag(props) {
        return { character_name: props.character.name };
    }
};
interface CollectProps {
    connect_drag_source: DragElementWrapper<DragSourceOptions>;
}
const collector: DragSourceCollector<CollectProps> = (connect, monitor) => {
    return {connect_drag_source: connect.dragSource()};
};

// NoteView stuff
interface Props {
    character: Character;
    modify_character?: (original_name: string, character: Character) => void;
}
interface State {
    edit: boolean;
    current_title: string;
    current_text: string;
}

class NoteView extends React.Component<Props & CollectProps, State> {
    public render() {
        // TODO: Bind properly
        return this.props.connect_drag_source(<div className={styles.note}
            onBlur={this.end_edit.bind(this)}>
            {this.render_title()}
            {this.render_body()}
        </div>);
    }

    public state = {edit: false, current_title: this.props.character.name, current_text: this.props.character.text};

    // PRIVATE
    private end_edit() {
        if(!this.props.modify_character)
            return;

        if(this.props.character.name !== this.state.current_title || this.props.character.text !== this.state.current_text)
            this.props.modify_character!(this.props.character.name, {name: this.state.current_title, text: this.state.current_text});
    }

    private render_title() {
        return <input className={styles.title} type="text"
            defaultValue={this.props.character.name}
            onChange={(evt) => this.setState({...this.state, current_title: evt.target.value})}
            size={this.state.current_title.length / 1.2}/>;
    }

    private render_body() {
        const lines = this.state.current_text.split('\n');

        // Resize approprately. 1.2 seems good for preventing the textarea from expanding massively.
        const cols = lines.reduce((val, line) => Math.max(val, line.length), 10) / 1.2;
        const rows = lines.length;

        return <textarea className={styles.body}
            defaultValue={this.props.character.text}
            onChange={(evt) => this.setState({...this.state, current_text: evt.target.value})}
            cols={cols} rows={rows}/>;
    }
}

export default DragSource(CHARACTER_TARGET, source, collector)(NoteView);
