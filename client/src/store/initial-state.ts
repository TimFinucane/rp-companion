import Wiki from 'common/wiki';
import Character from 'common/character';

/**
 * This is some initial test state
 */

const wiki: Wiki | any = {
    directory: [
        'page-a',
        'page-b'
    ],

    selection: 'page-a',

    pages: {
        'page-a': {
            title: 'page_one',
            author: 'me',
            sections: [
                {
                    title: 'section_one',
                    author: 'me',
                    elements: [
                        { type: "paragraph", markdown: 'Heyoooooo' },
                        { type: "paragraph", markdown: 'Heyooooo2' }
                    ]
                },
                {
                    title: 'section_two',
                    author: 'me',
                    elements: [
                        { type: "paragraph", markdown: 'Heyoooooo' },
                        { type: "paragraph", markdown: 'Heyooooo2' }
                    ]
                }
            ]
        }
    }
};

const characters: Character[] = [
    {name: "Lucy", text: "Lucy is a girl"},
    {name: "Stephen", text: "Stephen is an elf"},
    {name: "Kate", text: "Kate is a dwarf"}
];

export default {
    wiki,
    characters: {characters}
};
