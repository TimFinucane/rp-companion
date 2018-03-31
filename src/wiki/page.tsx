import React from 'react';

import { Section, SectionInfo } from './section';
import styles from './wiki-styles.scss';

interface PageProps
{
    author: string;
    visibility?: any;
    title: string;
    sections: SectionInfo[];
}
export { PageProps as PageInfo };

export class Page extends React.Component<PageProps, {}>
{
    public render()
    {
        return <div className={styles.page}>
            <h1 className={styles.title}>{this.props.title}</h1>
            <div className={styles.sections}>
                {this.props.sections.map( ( section, i ) => <Section {...section} key={section.title} /> )}
            </div>
        </div>;
    }
}
