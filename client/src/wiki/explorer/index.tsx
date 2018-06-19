import * as React from 'react';
import * as styles from './styles.scss';

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
    selected: string[]; // Path to currently used file
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
    <div key={file.name} className={styles.file + ((selected === file.name) ? ' ' + styles.selected : '')}>{file.name}</div>
);
const FolderElement = (folder: Folder, selected: string[]) => {
    const isSelected = selected.length > 0 && selected[0] === folder.name;
    const nextSelection = isSelected ? selected.slice( 1 ) : [];

    return <div className={styles.folder + (isSelected ? ' ' + styles.selected : '')}>
        <div className={styles.title}>{folder.name}</div>
        { folder.files.map( (child) => render_path( child, nextSelection ) ) }
    </div>;
};

/*
 * Shows the entire folder/file set as a tree-like structure.
 */
export const Explorer = ( props: ExplorerProps ) => (
    <div className={styles.explorer}>
        {render_path( props.root, props.selected )}
    </div>
)
