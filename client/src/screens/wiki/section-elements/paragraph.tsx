import * as React from 'react';
import * as showdown from 'showdown';

interface ParagraphProps
{
    markdown: string;
}

export default class Paragraph extends React.Component<{ markdown: string; }, {}>
{
    public render()
    {
        const converter = new showdown.Converter();
        const htmlText = converter.makeHtml( this.props.markdown );

        // TODO: Security
        return <div className='section-paragraph' dangerouslySetInnerHTML={{ __html: htmlText }} />;
    }
}
