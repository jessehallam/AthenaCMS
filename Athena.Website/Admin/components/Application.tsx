import * as React from 'react';
import Tenant from '../ObjectModel/Tenant';
import AdminView from './admin/AdminView';
import LoginView from './login/LoginView';

interface OwnProps {}
interface OwnState {}

class Application extends React.Component<OwnProps, OwnState> {
    static readonly tenant: Tenant = new Tenant();

    componentDidMount() {
        /** Trigger an onLoginRequired event to pull up the login view. */
        Application.tenant.authentication.authenticateAsync();
    }

    render() {
        return (
            <div className='admin'>
                <AdminView />
                <LoginView />
            </div>
        );
    }
}

export default Application;
