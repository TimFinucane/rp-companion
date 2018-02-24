import { Paragraph } from './paragraph';

export { Paragraph };

export enum ElementType
{
    PARAGRAPH,
    PICTURE
}

export interface Element
{
    type: ElementType,
    content: any
}