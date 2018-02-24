import * as React from 'react';
import styles from './styles.scss';

export interface Folder
{
    name: string
    children: Array<File>
}
type File = Folder | {name: string }

export interface ExplorerProps
{
    curFile: Array<string>, // Path to currently used file
    root: File // The folder structure
}

/*
 * Shows the entire folder/file set as a tree-like structure.
 */
export class Explorer extends React.Component<ExplorerProps, {}>
{
    render_file( file: File ): JSX.Element
    {
        if( (file as Folder).children )
            return <div className={styles.folder} key={file.name}>
                <p className={styles.title}>{file.name}</p>
                <ul>
                    {( file as Folder ).children.map( child => <li>{this.render_file( child )}</li> )}
                </ul>
            </div>
        else
            return <p className={styles.file} key={file.name}>{file.name}</p>
    }

    render()
    {
        return <div className={styles.explorer}>
            {this.render_file( this.props.root )}
        </div>
    }
}