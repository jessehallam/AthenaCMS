import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { after } from '../../utility/delay';
import Application from '../Application';
import LoginAction, { LoginActionType } from './LoginAction';
import LoginActionChange from './LoginActionChange';
import { LoginModel } from './LoginView';

interface OwnProps {
    model: LoginModel;
}

interface OwnState {
    action: LoginActionType;
    busy: boolean;
    error: string;
}

@observer
class LoginForm extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        action: 'signin',
        busy: false,
        error: ''
    };

    get busy() {
        return this.state.busy;
    }

    set busy(busy: boolean) {
        this.setState({ busy });
    }

    get error() {
        return this.state.error;
    }

    set error(error: string) {
        this.setState({ error });
    }

    render() {
        return (
            <div className='login__form'>
                <h3 className='login__title'>Sign In</h3>
                <form action='' noValidate={true} onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            onChange={e => (this.props.model.username = e.target.value)}
                            placeholder='Username / Email'
                            value={this.props.model.username}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            autoComplete='password'
                            className='form-control'
                            onChange={e => (this.props.model.password = e.target.value)}
                            placeholder='Password'
                            type='password'
                            value={this.props.model.password}
                        />
                    </div>

                    <div className='login__error'>{this.state.error}</div>

                    <LoginAction action={this.state.action} busy={this.state.busy} />
                </form>

                <LoginActionChange action={this.state.action} onActionChange={this.onActionChange} />
            </div>
        );
    }

    @action.bound
    private onActionChange(action: LoginActionType) {
        this.setState({ action });
    }

    @action.bound
    private async onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const { model } = this.props;
        const { username, password } = model;

        if (!username) {
            this.setState({ error: 'Username is required.' });
        } else if (!password) {
            this.setState({ error: 'Password is required.' });
        } else {
            this.busy = true;
            const startTime = new Date();
            const result = await Application.tenant.authentication.signInAsync(username, password);

            after(startTime, 1000).then(() => {
                if (!result) {
                    this.error = 'Invalid username or password.';
                }
                this.busy = false;
            });
        }
    }
}

export default LoginForm;
