import * as React from 'react';
import { DropTarget, DropTargetSpec, ConnectDropTarget, DropTargetCollector } from 'react-dnd';

import { CHARACTER_TARGET, Note, Character } from 'data/characters';
import NoteView from './note';

import * as styles from './styles.scss';

// Drop Target stuff
interface CollectedProps {
    connectDropTarget: ConnectDropTarget;
}

const drop_target_spec: DropTargetSpec<NoteBoardProps> = {
    drop(props, monitor) {
        const elementPosition = document.getElementsByClassName(styles.noteBoard)[0].getBoundingClientRect();
        const dropPosition = monitor.getClientOffset()!;

        const position = {x: dropPosition.x - elementPosition.left, y: dropPosition.y - elementPosition.top};
        const character_name = monitor.getItem().character_name;

        if(props.notes.findIndex(c => c.character_name === character_name) !== -1)
            props.move_note({character_name, position});
        else
            props.create_note({character_name, position});
    }
};

const drop_target_collector: DropTargetCollector<CollectedProps> = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};

// NoteBoard stuff
interface NoteBoardProps {
    create_note: (note: Note) => void;
    delete_note: (note: Note) => void;
    move_note: (note: Note) => void;

    notes: Note[];
    characters: Character[]; // TODO: Map instead?
}

class NoteBoard extends React.Component<NoteBoardProps & CollectedProps> {
    public render(): React.ReactNode {
        return this.props.connectDropTarget(
            <div className={styles.noteBoard}>
                {this.props.notes.map((note, i) =>
                    <div
                        key={note.character_name}
                        className={styles.noteWrapper}
                        style={{left: note.position.x, top: note.position.y, zIndex: i}}>
                        <NoteView {...this.props.characters.find(c => c.name === note.character_name)!}/>
                    </div>
                )}
            </div>,
        );
    }
}

// TODO: Make decorator when those work.
export default DropTarget(CHARACTER_TARGET, drop_target_spec, drop_target_collector)(NoteBoard);
