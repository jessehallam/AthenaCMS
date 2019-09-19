import * as React from 'react';
import { StoreProps, withStore } from '../stores/withStore';
import AdminView from './admin/AdminView';
import LoginView from './login/LoginView';

interface OwnProps extends StoreProps {}
interface OwnState {}

class Application extends React.Component<OwnProps, OwnState> {
    componentDidMount() {
        // trigger a login screen if there is no token.
        this.props.store.authentication.getAccessTokenAsync();
    }

    render() {
        return (
            <div className='application'>
                <AdminView />
                <LoginView />
            </div>
        );
    }
}

export default withStore(Application);
