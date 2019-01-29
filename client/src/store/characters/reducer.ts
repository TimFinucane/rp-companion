import { combineReducers } from 'redux';

import { Character, Note } from 'data/characters';
import { CharacterActionType, Names } from './actions';

export type State = Readonly<{
    characters: Character[];
    notes: Note[];
}>;

function character_reducer(state = [] as Character[], action: CharacterActionType) {
    switch(action.type) {
        case Names.CREATE_CHARACTER:
            return [...state, action.payload];
            break;
        case Names.DELETE_CHARACTER:
            return state.filter(c => c.name !== action.payload);
            break;
        case Names.MODIFY_CHARACTER:
            return state.map(c => c.name === action.payload.original_name ? action.payload.character : c);
            break;
        default:
            return state;
    }
}

function note_reducer(state = [] as Note[], action: CharacterActionType) {
    switch(action.type) {
        case Names.CREATE_NOTE:
            return [...state, action.payload];
        case Names.DELETE_NOTE:
            return state.filter(c => c.character_name !== action.payload);
        case Names.MOVE_NOTE:
            return [
                ...state.filter(c => c.character_name !== action.payload.character_name),
                action.payload
            ];
        case Names.MODIFY_CHARACTER:
            return state.map(c => c.character_name === action.payload.original_name ?
                {...c, character_name: action.payload.character.name} :
                c
            );
        case Names.DELETE_CHARACTER:
            return state.filter(c => c.character_name === action.payload);
        default:
            return state;
    }
}

export default combineReducers<State>({
    characters: character_reducer,
    notes: note_reducer
});
