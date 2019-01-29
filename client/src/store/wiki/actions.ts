import { action, ActionType, createAction } from 'typesafe-actions';
import Wiki from 'common/wiki';

export const actions = {
    change_selection: (selection: string) => action("wiki/change-selection", selection)
};

export type WikiActionType = ActionType<typeof actions>;
