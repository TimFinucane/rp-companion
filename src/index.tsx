import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

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

const App = () => (
    <BrowserRouter>
        <div>
            <Link to="/wiki">Go to wiki</Link>
            <br />
            <Link to="/map">Go to map</Link>
            <Route path="/wiki" component={() => <Wiki {...wikiInfo} />}/>
            <Route path="/map" component={() => <p>todo</p>}/>
        </div>
    </BrowserRouter>
);

render( <App />, document.getElementById( "harper" ) );
