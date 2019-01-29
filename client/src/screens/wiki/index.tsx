import * as React from 'react';
import { connect } from 'react-redux';

import { State } from 'store';

import { Page, PageInfo } from './page';
import { Explorer, ExplorerProps } from './explorer';
import * as styles from './styles.scss';

interface WikiProps
{
    selected: string[];
    directory: any;
    pages: any;
}

function map_state_to_props(state: State) {
    return {
        selected: [],
        directory: state.wiki.directory,
        pages: state.wiki.pages
    }
}

class Wiki extends React.Component<WikiProps, {}>
{
    public render()
    {
        return <div className={styles.wiki}>
            <Explorer selected={this.props.selected} root={this.props.directory} />
            {this.props.selected ? <Page {...this.props.pages[this.props.selected.join( '/' )]} /> : { /* TODO: Empty page */ } }
        </div>;
    }
}

export default connect(map_state_to_props)(Wiki);
