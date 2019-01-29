interface Element {
    type: string;
}

export interface Paragraph extends Element {
    type: "paragraph";
    markdown: string;
}

export interface Image extends Element {
    type: "image";
    src: string;
}

export type ElementType = Paragraph | Image;