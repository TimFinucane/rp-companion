import { ElementType } from "screens/wiki/section-elements/element";

/**
 * This is some initial test state
 */

const not_in_yet = {
    wiki: {
        selected: ['example-wiki', 'folder1', 'page1'],
        root: {
            name: 'example-wiki',
            files: [
                { name: 'folder1', files: [{ name: 'page1' }, {name: 'page2'}] }
            ]
        },

        pages: {
            'example-wiki/folder1/page1': {
                title: 'page_one',
                author: 'me',
                visibility: 'all',
                sections: [
                    {
                        title: 'section_one',
                        author: 'me',
                        elements: [
                            { type: ElementType.PARAGRAPH, content: { markdown: 'Heyoooooo' } },
                            { type: ElementType.PARAGRAPH, content: { markdown: 'Heyooooo2' } }
                        ]
                    },
                    {
                        title: 'section_two',
                        author: 'me',
                        elements: [
                            { type: ElementType.PARAGRAPH, content: { markdown: 'Heyoooooo' } },
                            { type: ElementType.PARAGRAPH, content: { markdown: 'Heyooooo2' } }
                        ]
                    }
                ]
            }
        }
    },
};

export default {
    characters: [
        {name: "Lucy", text: "Lucy is a girl"},
        {name: "Stephen", text: "Stephen is an elf"},
        {name: "Kate", text: "Kate is a dwarf"}
    ]
};
