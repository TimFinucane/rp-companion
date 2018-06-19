import * as React from 'react';
import { Page, PageInfo } from './page';
import { Explorer, ExplorerProps } from './explorer';
import * as styles from './styles.scss';

interface WikiProps
{
    selected: string[];
    root: any;
    pages: any;
}

export class Wiki extends React.Component<WikiProps, {}>
{
    public render()
    {
        return <div className={styles.wiki}>
            <Explorer selected={this.props.selected} root={this.props.root} />
            {this.props.selected ? <Page {...this.props.pages[this.props.selected.join( '/' )]} /> : { /* TODO: Empty page */ } }
        </div>;
    }
}
