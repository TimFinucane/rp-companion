import React from 'react';
import Showdown from 'showdown';

interface ParagraphProps
{
    markdown: string;
}

export class Paragraph extends React.Component<ParagraphProps, {}>
{
    public render()
    {
        const converter = new Showdown.Converter();
        const htmlText = converter.makeHtml( this.props.markdown );

        // TODO: Security
        return <div className='section-paragraph' dangerouslySetInnerHTML={{ __html: htmlText }} />;
    }
}
