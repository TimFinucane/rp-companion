import { Character, Note } from 'data/characters';
import { CharacterActionType, actions, Names } from './actions';
import { combineReducers } from 'redux';

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
            return [
                ...state.filter(c => c.name !== action.payload.name),
                action.payload
            ];
            break;
        default:
            return state;
    }
}

function note_reducer(state = [] as Note[], action: CharacterActionType) {
    switch(action.type) {
        case Names.CREATE_NOTE:
            return [...state, action.payload];
            break;
        case Names.DELETE_NOTE:
            return state.filter(c => c.character_name !== action.payload);
            break;
        case Names.MOVE_NOTE:
            return [
                ...state.filter(c => c.character_name !== action.payload.character_name),
                action.payload
            ];
            break;
        default:
            return state;
    }
}

export default combineReducers<State>({
    characters: character_reducer,
    notes: note_reducer
});
