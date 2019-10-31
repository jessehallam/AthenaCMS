import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { StoreProps, withStore } from '../../stores/withStore';
import { classList } from '../../utility/classList';
import LoginForm from './LoginForm';
import LoginModel from './model';

interface OwnProps extends StoreProps {}
interface OwnState {
    model: LoginModel;
}

@observer
class LoginView extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        model: new LoginModel()
    };

    componentDidMount() {
        // subscribe to auth required events:
        this.props.store.authentication.onLoginRequired.subscribe(this.onLoginRequired);
        this.props.store.authentication.onAuthenticated.subscribe(this.onAuthenticated);

        // trigger a loginRequired event if there is no token:
        this.props.store.authentication.getAccessTokenAsync();
    }

    render() {
        const classes = classList('login', this.state.model.visible && 'login--visible');
        return (
            <div className={classes}>
                <div className='login__aside' />
                <div className='login__wrapper'>
                    <div className='login__body'>
                        <LoginForm model={this.state.model} store={this.props.store} />
                    </div>
                </div>
            </div>
        );
    }

    private onAuthenticated = action(() => {
        this.state.model.visible = false;
    });

    private onLoginRequired = action(() => {
        if (!this.state.model.visible) {
            this.state.model.visible = true;
            this.state.model.reset();
        }
    });
}
export default withStore(LoginView);
