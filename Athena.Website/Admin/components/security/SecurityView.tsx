import { observer } from 'mobx-react';
import * as React from 'react';
import { StoreProps, withStore } from '../../stores/withStore';
import PageHeader from '../shared/PageHeader';
import EditGroupDrawer from './EditGroup/EditGroupDrawer';
import SecurityModel from './SecurityModel';
import UserGroupPanel from './UserGroupPanel';
import UserPanel from './UserPanel';

interface OwnProps extends StoreProps {}
interface OwnState {}

@observer
class SecurityView extends React.Component<OwnProps, OwnState> {
    readonly model = new SecurityModel(this.props.store);

    componentDidMount() {
        this.model.load();
    }

    render() {
        const { model } = this;

        return (
            <div>
                <PageHeader title='Security Management' />

                <EditGroupDrawer model={model} />

                <div className='row'>
                    <div className='col-5'>
                        <UserGroupPanel model={model} />
                    </div>
                    <div className='col-6'>
                        <UserPanel model={model} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withStore(SecurityView);
