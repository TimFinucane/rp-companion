import * as React from 'react';
import Character from 'common/character';

import { NoteData, Note } from './note';

export default class NoteBoard extends React.Component<{characters: Character[]}, {[name: string]: NoteData}> {

    /**
     * Updates state to give position to character if a new one is added.
     * TODO: Remove state for characters removed?
     */
    public static getDerivedStateFromProps(props: Character[], state: {[name: string]: NoteData}) {
        let newState = state;
        for(const prop of props)
            if(!state[prop.name])
                newState = {
                    ...state,
                    [prop.name]: {position: {x: 50, y: 50}}
                };

        return newState;
    }

    public render() {
        return <div>
            {this.props.characters.map(character =>
                <Note key={character.name} {...character} {...this.state[character.name]}/>
            )}
        </div>;
    }

    public state = {} as {[name: string]: NoteData};
}