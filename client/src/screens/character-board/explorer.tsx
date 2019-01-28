import * as React from 'react';

import Character from 'common/character';
import * as styles from './styles.scss';

import Entry from './explorer-entry';
import { selected } from 'screens/wiki/explorer/styles.scss';

interface Props {
    characters: Character[];
    selected: string[];
}

export default class Explorer extends React.PureComponent<Props> {
    public render() {
        return <ul className={styles.explorer}>
            {this.props.characters.map(child =>
                <li key={child.name}>
                    <Entry character={child} is_selected={this.props.selected.includes(child.name)}/>
                </li>
            )}
        </ul>;
    }
}
