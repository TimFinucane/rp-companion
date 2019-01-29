import * as React from 'react';

import { Page } from 'common/wiki/pages';

import Section from './section';
import * as styles from './styles.scss';

export default class PageView extends React.Component<Page, {}>
{
    public render()
    {
        return <div className={styles.page}>
            <h1 className={styles.title}>{this.props.title}</h1>
            <div className={styles.sections}>
                {this.props.sections.map( (section, i) => <Section key={section.title} {...section} /> )}
            </div>
        </div>;
    }
}
