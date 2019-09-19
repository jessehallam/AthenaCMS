import * as React from 'react';
import PagePanel from '../../PagePanel';
import QuillEditor from '../../quillEditor/QuillEditor';

interface OwnProps {}
interface OwnState {}

export default class EditorWidget extends React.Component<OwnProps, OwnState> {
    render() {
        return (
            <div className='widgetEditor'>
                <PagePanel content={this.renderContent()} />
            </div>
        );
    }

    private renderContent() {
        return <QuillEditor />;
    }
}
