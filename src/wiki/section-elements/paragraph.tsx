import React from 'react';
import Showdown from 'showdown';

interface ParagraphProps
{
    markdown: string
}

export class Paragraph extends React.Component<ParagraphProps, {}>
{
    render()
    {
        let converter = new Showdown.Converter();
        let html_text = converter.makeHtml( this.props.markdown );

        // TODO: Security
        return <div className='section-paragraph' dangerouslySetInnerHTML={{ __html: html_text }} />;
    }
}
