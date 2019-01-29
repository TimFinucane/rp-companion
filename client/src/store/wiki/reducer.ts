import { combineReducers } from 'redux';

import Pages from 'common/wiki/pages';
import Directory from 'common/wiki/directory';

function pages_reducer(state = {} as Pages, action: any) {
    return state;
}

function directory_reducer(state = {} as Directory, action: any) {
    return state;
}

function selection_reducer(state = {} as string[], action: any) {
    return state;
}

export default combineReducers({
    pages: pages_reducer,
    directory: directory_reducer,
    selection: selection_reducer
});
