/**
 * The character screen allows you to CRUD character information in a tree-like structure
 */

import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Note, Character } from 'data/characters';
import { actions } from 'store/characters/actions';

import NoteBoard from './note-board';
import Explorer from './explorer';

import * as styles from './styles.scss';

interface Props {
    characters: Character[];
    notes: Note[];

    create_note: (note: Note) => any;
    delete_note: (note: Note) => any;
    move_note: (note: Note) => any;
}

function map_state_to_props(state: any) { // TODO: Not any
    return {
        characters: state.characters,
        notes: state.notes
    };
}
const map_dispatch_to_props = {
    create_note: actions.create_note,
    delete_note: (note: Note) => actions.delete_note(note.character_name),
    move_note: actions.move_note
};

class CharacterBoard extends React.Component<Props> {
    public render(): React.ReactNode {
        return <div className={styles.characterScreen}>
            <Explorer
                characters={this.props.characters}
                selected={this.props.notes.map(note => note.character_name)}/>
            <NoteBoard
                notes={this.props.notes}
                characters={this.props.characters}
                create_note={this.props.create_note}
                delete_note={this.props.delete_note}
                move_note={this.props.move_note}/>
        </div>;
    }
}

export default connect(map_state_to_props, map_dispatch_to_props)(CharacterBoard); // TODO: Decorators still bad.
