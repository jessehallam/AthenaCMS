import * as React from 'react';
import ReactSelect from 'react-select';
import PagePanel from '../../PagePanel';
import { withWidget, WithWidgetProps } from '../Context';

interface OwnProps extends WithWidgetProps {}
interface OwnState {}

const statusOptions: any = [{ label: 'Draft', value: 'Draft' }, { label: 'Published', value: 'Published' }];

class StatusWidget extends React.Component<OwnProps, OwnState> {
    render() {
        return <PagePanel content={this.renderContent()} title='Status' />;
    }

    private renderContent() {
        return (
            <div className='widgetStatus'>
                <div className='form-group'>
                    <ReactSelect options={statusOptions} value={statusOptions[0]} />
                </div>
                <div className='widgetStatus__commands'>
                    <a className='text-danger' href='#'>
                        Move to Trash
                    </a>

                    <button className='btn btn-primary'>Update</button>
                </div>
            </div>
        );
    }
}

export default withWidget(StatusWidget);
