import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RootStore } from '../../stores/RootStore';
import { delay } from '../../utility/delay';
import LoginAction from './LoginAction';
import LoginActionChange from './LoginActionChange';
import LoginModel from './model';

interface OwnProps {
    model: LoginModel;
    store: RootStore;
}
interface OwnState {}

@observer
export default class LoginForm extends React.Component<OwnProps, OwnState> {
    render() {
        const { model } = this.props;
        const title = model.action === 'login' ? 'Sign In' : 'Register';
        return (
            <div className='login__form'>
                <h3 className='login__title'>{title}</h3>
                <form action='' noValidate={true} onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            onChange={this.onUsernameChange}
                            placeholder='Username / Email'
                            value={model.username}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            autoComplete='password'
                            className='form-control'
                            onChange={this.onPasswordChange}
                            placeholder='Password'
                            type='password'
                            value={model.password}
                        />
                    </div>

                    <div className='login__error'>{model.error}</div>
                    <LoginAction action={model.action} busy={model.busy} />
                </form>

                <LoginActionChange action={model.action} onChange={this.onActionChange} />
            </div>
        );
    }

    private onActionChange = action((action: any) => {
        this.props.model.action = action;
    });

    private onPasswordChange = action(
        (e: React.ChangeEvent<HTMLInputElement>) => (this.props.model.password = e.target.value)
    );

    private onSubmit = action(async (e: React.FormEvent) => {
        e.preventDefault();
        const { model } = this.props;
        const { username, password } = model;

        if (!username) {
            return this.setState({ error: 'Username is required.' });
        } else if (!password) {
            return this.setState({ error: 'Password is required.' });
        } else {
            model.busy = true;
            await Promise.all([delay(1000), this.signInAsync()]);
            model.busy = false;
            model.reset();
        }
    });

    private onUsernameChange = action(
        (e: React.ChangeEvent<HTMLInputElement>) => (this.props.model.username = e.target.value)
    );

    private signInAsync = async () => {
        const success = await this.props.store.authentication.signInAsync(
            this.props.model.username,
            this.props.model.password
        );
        if (!success) {
            this.props.model.error = 'Invalid username or password.';
        }
    };
}
