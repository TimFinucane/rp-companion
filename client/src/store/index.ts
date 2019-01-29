import { createStore, combineReducers } from 'redux';

import character_reducer from './characters/reducer';
import wiki_reducer from './wiki/reducer';

import initialState from './initial-state';

const store = createStore(
    combineReducers({
        characters: character_reducer,
        wiki: wiki_reducer
    }),
    initialState,
);

export type State = ReturnType<typeof store.getState>;
export default store;
