import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Wiki } from './wiki';
import { ElementType } from './wiki/section-elements/element';
import './styles.scss';

const page1 = {
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
};

const wikiInfo = {
    selected: ['example-wiki', 'folder1', 'page1'],
    root: {
        name: 'example-wiki',
        files: [
            { name: 'folder1', files: [{ name: 'page1' }, {name: 'page2'}] }
        ]
    },

    pages: {
        'example-wiki/folder1/page1': page1
    }
};

ReactDOM.render( <Wiki {...wikiInfo} />, document.getElementsByTagName( "body" )[0] );
