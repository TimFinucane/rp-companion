import React from 'react';
import { Page, PageInfo } from './page';
import { Explorer, ExplorerProps, Folder as ExplorerFolder } from './explorer';
import styles from './wiki-styles.scss';

interface Folder
{
    name: string;
    children: Array<Folder | PageInfo>;
}

interface WikiProps
{
    selected: string[];
    root: Folder;
}

export class Wiki extends React.Component<WikiProps, {}>
{
    public render()
    {
        return <div className={styles.wiki}>
            <Explorer curFile={[]} root={this.buildFolderTree( this.props.root ) as ExplorerFolder} />
            {this.props.selected ? <Page {...this.getSelectedPage( this.props.root, this.props.selected )} /> : { /* TODO: Empty page */ } }
        </div>;
    }

    private buildFolderTree( root: Folder | PageInfo  ): ExplorerFolder | { name: string }
    {
        if( 'children' in root )
            return {
                name: ( root as Folder ).name,
                children: ( root as Folder ).children.map( (child) => this.buildFolderTree( child ) )
            };
        else
            return { name: (root as PageInfo).title };
    }

    private getSelectedPage( dir: Folder, path: string[] ): PageInfo
    {
        for( const child of dir.children )
            if( ( child as Folder ).name && ( child as Folder ).name === path[0] )
                return this.getSelectedPage( child as Folder, path.slice( 1 ) );
            else if( ( child as PageInfo ).title && ( child as PageInfo ).title === path[0] )
                return child as PageInfo;

        throw Error( 'Directory ' + dir.name + ' does not contain ' + path.join( '/' ) );
    }
}
