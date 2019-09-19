import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import PagePanel from '../../../../shared/PagePanel';
import { WidgetProps, withWidget } from '../../widget/context';
import { widget } from '../decorator';

interface OwnProps extends WidgetProps {}
interface OwnState {}

@observer
class EditorWidget extends React.Component<OwnProps, OwnState> {
    render() {
        if (!this.props.model) return null;
        return <PagePanel className='editorWidget pagePanel--widget' content={this.renderContent()} />;
    }

    @action.bound
    private onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.props.model.content.content = event.target.value;
    }

    private renderContent() {
        return (
            <div>
                <textarea
                    className='form-control'
                    onChange={this.onChange}
                    placeholder='Content goes here...'
                    rows={14}
                    value={this.props.model.content.content}
                />
            </div>
        );
    }
}

widget('editor', withWidget(EditorWidget));
