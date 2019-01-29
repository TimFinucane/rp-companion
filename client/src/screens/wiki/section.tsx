import * as React from 'react';

import { ElementType } from 'common/wiki/elements';
import { Section } from 'common/wiki/pages';

import Paragraph from './section-elements/paragraph';
import * as styles from './styles.scss';


export default class SectionView extends React.Component<Section, {}>
{
    public render()
    {
        return <div>
            <h2 className={styles.title}>{this.props.title}</h2>
            <div className={styles.elements}>
                {this.props.elements.map( (element, i) => this.render_element( element ) )}
            </div>
        </div>;
    }

    private render_element( element: ElementType )
    {
        switch( element.type )
        {
            case "paragraph":
                return <Paragraph markdown={element.markdown} />; // Produces react unique key warning
        }
        throw Error( 'Cannot create element, unknown element type: ' + element.toString() );
    }
}
