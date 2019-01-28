import { createStore, combineReducers } from 'redux';

import character_reducer from './characters/reducer';
import initialState from './initial-state';

export default createStore(
    character_reducer,
    initialState
);
