import { combineReducers } from 'redux';

import Pages from 'common/wiki/pages';
import Directory from 'common/wiki/directory';

import { WikiActionType } from './actions';

function pages_reducer(state = {} as Pages, action: WikiActionType) {
    return state;
}

function directory_reducer(state = {} as Directory, action: WikiActionType) {
    return state;
}

function selection_reducer(state = "" as string, action: WikiActionType) {
    switch(action.type) {
        case "wiki/change-selection":
            return action.payload;
    }
    return state;
}

export default combineReducers({
    pages: pages_reducer,
    directory: directory_reducer,
    selection: selection_reducer
});
