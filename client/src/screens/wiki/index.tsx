import * as React from 'react';
import { connect } from 'react-redux';

import { State } from 'store';
import Directory from 'common/wiki/directory';
import Pages from 'common/wiki/pages';
import { actions } from 'store/wiki/actions';

import PageView from './page';
import { Explorer } from './explorer';
import * as styles from './styles.scss';

interface WikiProps
{
    selected: string;
    directory: Directory;
    pages: Pages;

    change_selection: (selection: string) => void;
}

function map_state_to_props(state: State) {
    return {
        selected: state.wiki.selection,
        directory: state.wiki.directory,
        pages: state.wiki.pages
    };
}
const map_dispatch_to_props = {
    change_selection: actions.change_selection
};

class Wiki extends React.Component<WikiProps, {}>
{
    public render()
    {
        return <div className={styles.wiki}>
            <Explorer selected={this.props.selected} root={this.props.directory} change_selection={this.props.change_selection} />
            {this.props.selected ? <PageView {...this.props.pages[this.props.selected]} /> : null }
        </div>;
    }
}

export default connect(map_state_to_props, map_dispatch_to_props)(Wiki);
