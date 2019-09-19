import { observable } from 'mobx';
import * as React from 'react';
import { classList } from '../../utility/classList';
import Application from '../Application';
import LoginForm from './LoginForm';

export interface LoginModel {
    username: string;
    password: string;
}

interface OwnProps {}

interface OwnState {
    model: LoginModel;
    visible: boolean;
}

class LoginView extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        model: observable({
            username: '',
            password: ''
        }),
        visible: false
    };

    componentDidMount() {
        Application.tenant.authentication.onAuthenticated.subscribe(() => {
            this.setState({ visible: false });
        });

        Application.tenant.authentication.onLoginRequired.subscribe(() => {
            if (this.state.visible) return;
            this.setState({
                model: observable({
                    username: '',
                    password: ''
                }),
                visible: true
            });
        });
    }

    render() {
        const classes = classList('login', this.state.visible && 'login--visible');
        return (
            <div className={classes}>
                <div className='login__aside' />
                <div className='login__wrapper'>
                    <div className='login__body'>
                        <LoginForm model={this.state.model} />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginView;
