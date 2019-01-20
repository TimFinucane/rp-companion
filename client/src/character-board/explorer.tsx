import * as React from 'react';

import Character from 'common/character';
import * as styles from './styles.scss';

interface Props {
    characters: Character[];
    selected: string[];
    onSelect: (name: string) => void;
}

export default class Explorer extends React.PureComponent<Props> {
    public render() {
        return <ul className={styles.explorer}>
            {this.props.characters.map(child =>
                <li key={child.name} onClick={(e) => this.props.onSelect(child.name)}>
                    {this.props.selected.includes(child.name) ?
                        <b>{child.name}</b> :
                        child.name}
                </li>
            )}
        </ul>;
    }
}
