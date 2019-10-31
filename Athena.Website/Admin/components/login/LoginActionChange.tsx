import * as React from 'react';
import { LoginAction } from './model';

interface Props {
    action: LoginAction;
    onChange: (action: LoginAction) => void;
}

export default function LoginActionChange(props: Props) {
    if (props.action === 'login') {
        return (
            <div className='login__signUp'>
                Don't have an account yet?{' '}
                <a href='#' onClick={() => props.onChange('register')}>
                    Sign Up
                </a>
            </div>
        );
    } else if (props.action === 'register') {
        return (
            <div className='login__signIn'>
                Already have an account?{' '}
                <a href='#' onClick={() => props.onChange('login')}>
                    Sign In
                </a>
            </div>
        );
    } else throw new Error();
}
