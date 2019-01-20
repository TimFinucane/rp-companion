import * as React from 'react';
import Character from 'common/character';

import { NoteData, Note } from './note';
import * as styles from './styles.scss';

export default class NoteBoard extends React.Component<{characters: Character[]}, {[name: string]: NoteData}> {

    /**
     * Updates state to give position to character if a new one is added.
     * TODO: Remove state for characters removed?
     */
    public static getDerivedStateFromProps(props: {characters: Character[]}, state: {[name: string]: NoteData}) {
        let newState = state;
        for(const character of props.characters)
            if(!state.hasOwnProperty(character.name))
                newState = {
                    ...newState,
                    [character.name]: {position: {x: 50, y: 50}}
                };

        return newState;
    }

    public render() {
        return <div className={styles.noteBoard}>
            {this.props.characters.map((character, i) =>
                <Note key={character.name} index={i} {...character} {...this.state[character.name]}/>
            )}
        </div>;
    }

    public state = {} as {[name: string]: NoteData};
}
