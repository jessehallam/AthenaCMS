import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import PagePanel from '../../PagePanel';
import { withWidget, WithWidgetProps } from '../Context';

interface OwnProps extends WithWidgetProps {}
interface OwnState {}

@observer
class TitleWidget extends React.Component<OwnProps, OwnState> {
    render() {
        return <PagePanel content={this.renderContent()} />;
    }

    @action.bound
    private onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.editor.content.title = e.target.value;
    }

    private renderContent() {
        return (
            <div className='titleWidget'>
                <input
                    className='form-control'
                    onChange={this.onChange}
                    placeholder='Enter Title'
                    type='text'
                    value={this.props.editor.content.title}
                />
            </div>
        );
    }
}

export default withWidget(TitleWidget);
