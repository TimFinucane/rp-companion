import * as React from 'react';
import * as SectionElements from './section-elements/element';
import * as styles from './styles.scss';

interface SectionProps
{
    author: string;
    visibility?: any;
    title: string;
    elements: SectionElements.Element[];
}
// Export under different name to recognize there could be a difference between
// the stored section info in the db and what needs to be passed to Section
export { SectionProps as SectionInfo };

export class Section extends React.Component<SectionProps, {}>
{
    public render()
    {
        return <div>
            <h2 className={styles.title}>{this.props.title}</h2>
            <div className={styles.elements}>
                {this.props.elements.map( ( element, i ) => this.render_element( element ) )}
            </div>
        </div>;
    }

    private render_element( element: SectionElements.Element )
    {
        switch( element.type )
        {
            case SectionElements.ElementType.PARAGRAPH:
                return <SectionElements.Paragraph {...element.content} />; // Produces react unique key warning
        }
        throw Error( 'Cannot create element, unknown element type: ' + element.toString() );
    }
}
