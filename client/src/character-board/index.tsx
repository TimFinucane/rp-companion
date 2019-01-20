/**
 * The character screen allows you to CRUD character information in a tree-like structure
 */

import * as React from 'react';

import Character from 'common/character';

import NoteBoard from './note-board';
import Explorer from './explorer';

export default class CharacterBoard extends React.Component<{characters: Character[]}, {active_characters: Character[]}> {

    public onSelect(name: string) {
        const index = this.state.active_characters.findIndex(c => c.name === name);
        if(index !== -1)
            this.setState({active_characters: [
                ...this.state.active_characters.slice(0, index),
                ...this.state.active_characters.slice(index + 1)
            ]});
        else
            this.setState({active_characters: [
                ...this.state.active_characters,
                this.props.characters.find(c => c.name === name) as Character
            ]});
    }

    public render() {
        return <div>
            <Explorer
                characters={this.props.characters}
                selected={this.state.active_characters.map(c => c.name)}
                onSelect={this.onSelect.bind(this)}/>
            <NoteBoard characters={this.state.active_characters} />
        </div>;
    }

    public state = {active_characters: [] as Character[]};
}
