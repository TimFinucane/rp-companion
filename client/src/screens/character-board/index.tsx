/**
 * The character screen allows you to view characters and give them notes
 */

import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Note, Character } from 'data/characters';
import { actions } from 'store/characters/actions';

import { State } from 'store';

import NoteBoard from './note-board';
import Explorer from './explorer';

import * as styles from './styles.scss';

interface Props {
    characters: Character[];
    notes: Note[];

    create_note: (note: Note) => any;
    delete_note: (note_name: string) => any;
    move_note: (note: Note) => any;

    modify_character: (original_name: string, character: Character) => any;
}

function map_state_to_props(state: State) { // TODO: Not any
    return {
        characters: state.characters.characters,
        notes: state.characters.notes
    };
}
const map_dispatch_to_props = {
    create_note: actions.create_note,
    delete_note: actions.delete_note,
    move_note: actions.move_note,
    modify_character: actions.modify_character
};

class CharacterBoard extends React.Component<Props> {
    public render(): React.ReactNode {
        return <div className={styles.characterScreen}>
            <Explorer
                characters={this.props.characters}
                selected={this.props.notes.map(note => note.character_name)}
                delete_note={this.props.delete_note}/>
            <NoteBoard {...this.props}/>
        </div>;
    }
}

export default connect(map_state_to_props, map_dispatch_to_props)(CharacterBoard); // TODO: Decorators still bad.
