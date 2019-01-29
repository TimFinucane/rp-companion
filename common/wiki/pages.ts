import { ElementType } from './elements';

export interface Section {
    title: string;
    author?: string;
    elements: ElementType[];
}

export interface Page {
    title: string;
    author: string;
    // TODO: visibility
    sections: Section[];
}

export default interface Pages { [name: string]: Page };
