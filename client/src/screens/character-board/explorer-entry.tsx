/**
 * An explorer entry is a single entry in the character explorer screen.
 * In its normal state, it displays the character name (in bold if it's selected already)
 * However, a drag may originate from an explorer entry, in which case a note view should be (bugged atm) displayed.
 */

import * as React from 'react';
import { DragSourceCollector, DragSourceSpec, DragElementWrapper, DragPreviewOptions, DragSource, DragSourceOptions } from 'react-dnd';

import { CHARACTER_TARGET, Character } from 'data/characters';
import NoteView from './note';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface EntryProps {
    character: Character;
    is_selected: boolean;

    delete_note: (name: string) => void;
}
interface EntryCollectProps {
    connect_drag_source: DragElementWrapper<DragSourceOptions>;
    connect_drag_preview: DragElementWrapper<DragPreviewOptions>;
    is_dragging: boolean;
}

const entry_source: DragSourceSpec<EntryProps, {character_name: string}> = {
    canDrag(props) {
        return !props.is_selected;
    },
    beginDrag(props) {
        return { character_name: props.character.name };
    }
};
const entry_collector: DragSourceCollector<EntryCollectProps> = (connect, monitor) => {
    return {
        connect_drag_source: connect.dragSource(),
        connect_drag_preview: connect.dragPreview(),
        is_dragging: monitor.isDragging()
    };
};

class EntryBase extends React.Component<EntryProps & EntryCollectProps> {
    public render() {
        // TODO: Wait for react-dnd to fix the preview for html5, rather than implement the hacky drag layer.
        this.props.connect_drag_preview(<div><NoteView character={this.props.character} /></div>);

        return this.props.connect_drag_source(
            this.props.is_selected ?
                <b onClick={() => this.props.delete_note(this.props.character.name)}>{this.props.character.name}</b> :
                <p>{this.props.character.name}</p>
        );
    }
}

export default DragSource(CHARACTER_TARGET, entry_source, entry_collector)(EntryBase);
