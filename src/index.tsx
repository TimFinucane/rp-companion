import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Wiki } from './wiki/wiki';
import { ElementType } from './wiki/section-elements/element';
import './styles.scss'

let page1 = {
    'title': 'page_one',
    'author': 'me',
    'visibility': 'all',
    'sections': [
        {
            'author': 'me',
            'title': 'section_one',
            'elements': [
                { 'type': ElementType.PARAGRAPH, 'content': { 'markdown': 'Heyoooooo' } },
                { 'type': ElementType.PARAGRAPH, 'content': { 'markdown': 'Heyooooo2' } }]
        },
        {
            'author': 'me',
            'title': 'section_two',
            'elements': [
                { 'type': ElementType.PARAGRAPH, 'content': { 'markdown': 'Heyoooooo' } },
                { 'type': ElementType.PARAGRAPH, 'content': { 'markdown': 'Heyooooo2' } }]
        }
    ]
};

let wikiInfo = {
    'selected': ['page_one'],
    'root': {
        'name': 'example-wiki',
        'children': [page1]
    }
}


ReactDOM.render( <Wiki {...wikiInfo} />, document.getElementsByTagName( "body" )[0] );