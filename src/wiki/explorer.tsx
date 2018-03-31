import * as React from 'react';
import styles from './wiki-styles.scss';

interface File
{
    name: string;
}
interface Folder extends File
{
    files: File[];
}

export interface ExplorerProps
{
    curFile: string[]; // Path to currently used file
    root: any; // The folder structure
}

function render_path( file: File, selected: string[] ): JSX.Element
{
    if( (file as Folder).files )
        return FolderElement( file as Folder, selected );
    else
        return FileElement( file, selected[0] );
}

const FileElement = (file: File, selected: string) => (
    <nav key={file.name} className={styles.file + (selected === file.name) ? ' ' + styles.selected : ''}>{file.name}</nav>
);
const FolderElement = (folder: Folder, selected: string[]) => {
    const isSelected = selected.length > 0 && selected[0] === folder.name;

    return <div className={styles.folder + isSelected ? ' ' + styles.selected : ''}>
        <h6>{folder.name}</h6>
        { folder.files.map( (child) => render_path( child, isSelected ? selected.slice( 1 ) : [] ) ) }
    </div>;
};

/*
 * Shows the entire folder/file set as a tree-like structure.
 */
export const Explorer = ( props: ExplorerProps ) => (
    <div className={styles.explorer}>
        {render_path( props.root, props.curFile )}
    </div>
)
