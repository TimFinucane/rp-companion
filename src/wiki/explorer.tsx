import * as React from 'react';
import styles from './wiki-styles.scss';

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
            return <li className={styles.folder} key={file.name}>
                <p className={styles.title}>{file.name}</p>
                <ul>
                    {( file as Folder ).children.map( child => this.render_file( child ) )}
                </ul>
            </li>
        else
            return <li className={styles.file} key={file.name}>{file.name}</li>
    }

    render()
    {
        return <div className={styles.explorer}>
            <h1 className={styles.title}>{this.props.root.name}</h1>
            <ul>{( this.props.root as Folder ).children.map( child => this.render_file( child ) )}</ul>
        </div>
    }
}