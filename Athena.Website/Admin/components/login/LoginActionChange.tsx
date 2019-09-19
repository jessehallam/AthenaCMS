import * as React from 'react';
import { LoginActionType } from './LoginAction';

interface OwnProps {
    action: LoginActionType;
    onActionChange: (action: LoginActionType) => void;
}

export default function LoginActionChange(props: OwnProps) {
    if (props.action === 'register') {
        return (
            <div className='login__signIn'>
                Already have an account?{' '}
                <a href='#' onClick={() => props.onActionChange('signin')}>
                    Sign In
                </a>
            </div>
        );
    } else if (props.action === 'signin') {
        return (
            <div className='login__signUp'>
                Don't have an account yet?{' '}
                <a href='#' onClick={() => props.onActionChange('register')}>
                    Sign Up
                </a>
            </div>
        );
    }
}
