/**
 * Actions for dealing with characters and character screen data.
 */
import { action, ActionType, createAction } from 'typesafe-actions';
import { Character, Note } from 'data/characters';

export enum Names {
    CREATE_NOTE = "characters/create-note",
    DELETE_NOTE = "characters/delete-note",
    MOVE_NOTE = "characters/move-note",

    CREATE_CHARACTER = "characters/create-character",
    DELETE_CHARACTER = "characters/delete-character",
    MODIFY_CHARACTER = "characters/modify-character"
}

export const actions = {
    create_note: (note: Note) => action(Names.CREATE_NOTE, note),
    delete_note: (character_name: string) => action(Names.DELETE_NOTE, character_name),
    move_note: (note: Note) => action(Names.MOVE_NOTE, note),

    create_character: (character: Character) => action(Names.CREATE_CHARACTER, character),
    delete_character: (character_name: string) => action(Names.DELETE_CHARACTER, character_name),
    modify_character: (original_name: string, character: Character) => action(Names.MODIFY_CHARACTER, {original_name, character})
}

export type CharacterActionType = ActionType<typeof actions>;
