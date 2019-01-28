
import Character from 'common/character';

export const CHARACTER_TARGET = 'character';
export type Character = Character;
export interface Note {
    character_name: string;
    position: {x: number, y: number};
}
