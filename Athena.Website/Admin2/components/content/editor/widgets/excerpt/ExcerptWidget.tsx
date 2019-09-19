import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import PagePanel from '../../../../shared/PagePanel';
import { WidgetProps, withWidget } from '../../widget/context';
import { widget } from '../decorator';

interface OwnProps extends WidgetProps {}
interface OwnState {}

@observer
class ExcerptWidget extends React.Component<OwnProps, OwnState> {
    render() {
        return <PagePanel className='excerptWidget pagePanel--widget' content={this.renderBody()} title='Excerpt' />;
    }

    @action.bound
    private onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.props.model.content.excerpt = e.target.value;
    }

    private renderBody() {
        return (
            <div>
                <textarea
                    className='form-control'
                    onChange={this.onChange}
                    placeholder='Generated automatically if left blank.'
                    rows={3}
                    value={this.props.model.content.excerpt}
                />
            </div>
        );
    }
}

widget('excerpt', withWidget(ExcerptWidget));
