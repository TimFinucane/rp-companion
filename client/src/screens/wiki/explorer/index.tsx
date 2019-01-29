import * as React from 'react';

import Directory from 'common/wiki/directory';

import * as styles from './styles.scss';

export interface ExplorerProps
{
    selected: string; // Path to currently used file
    root: Directory; // The folder structure
    change_selection: (sel: string) => void;
}

function render_entry(file: string, selected: boolean, change_selection: (sel: string) => void) {
    // TODO: Optimize these callbacks?
    if(selected)
        return <b key={file} onClick={() => change_selection(file)}>{file}</b>;
    else
        return <p key={file} onClick={() => change_selection(file)}>{file}</p>;
}

/*
 * Shows the entire folder/file set as a tree-like structure.
 */
export const Explorer = ( props: ExplorerProps ) => (
    <div className={styles.explorer}>
        {props.root.map(file => render_entry(file, file === props.selected, props.change_selection))}
    </div>
)
