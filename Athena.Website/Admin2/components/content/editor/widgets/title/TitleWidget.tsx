import { observer } from 'mobx-react';
import * as React from 'react';
import PagePanel from '../../../../shared/PagePanel';
import { WidgetProps, withWidget } from '../../widget/context';
import { widget } from '../decorator';

interface OwnProps extends WidgetProps {}
interface OwnState {}

@observer
class TitleWidget extends React.Component<OwnProps, OwnState> {
    render() {
        if (!this.props.model) return null;
        return <PagePanel className='titleWidget' content={this.renderContent()} />;
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.model.content.title = e.target.value;
    };

    private renderContent() {
        return (
            <input
                className='form-control title-control'
                onChange={this.onChange}
                placeholder='Enter title'
                value={this.props.model.content.title}
            />
        );
    }
}

widget('title', withWidget(TitleWidget));
