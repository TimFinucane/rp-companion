/**
 * The character screen allows you to CRUD character information in a tree-like structure
 */

import * as React from 'react';

import Character from 'common/character';

import Note from './note';
import Explorer from './explorer';

export default class CharacterBoard extends React.Component<{characters: Character[]}, {active_characters: Character[]}> {
    public onSelect(character_name: string) {
        const character = this.props.characters.find(c => c.name === character_name) as Character;
        const index = this.state.active_characters.findIndex(c => c.name === character_name);

        if(index === -1)
            this.setState({active_characters: [
                ...this.state.active_characters,
                character
            ]});
        else
            this.setState({active_characters: [
                ...this.state.active_characters.slice(0, index),
                ...this.state.active_characters.slice(index + 1)
            ]});
    }

    public render() {
        return <div>
            <Explorer
                characters={this.props.characters}
                selected={this.state.active_characters.map(c => c.name)}
                onSelect={this.onSelect.bind(this)}/>
            <div>
                {this.state.active_characters.map(character =>
                    <Note key={character.name} {...character}/>
                )}
            </div>
        </div>;
    }

    public state = {active_characters: [] as Character[]};
}
