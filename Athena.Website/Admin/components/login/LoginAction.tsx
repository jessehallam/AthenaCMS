import * as React from 'react';
import { LoginAction } from './model';

interface Props {
    action: LoginAction;
    busy: boolean;
}

export default function LoginAction(props: Props) {
    const busyIcon = props.busy && props.action === 'login' && <i className='fas fa-circle-notch fa-spin' />;
    if (props.action === 'login') {
        return (
            <div className='login__actions'>
                <a className='login__forgot' href='#'>
                    Forgot Password?
                </a>

                <button className='btn btn-primary login__btn login__btn--primary' disabled={props.busy} type='submit'>
                    {busyIcon} Sign In
                </button>
            </div>
        );
    } else if (props.action === 'register') {
        return (
            <div className='login__actions'>
                <span />
                <button className='btn btn-primary login__btn login__btn--primary' disabled={props.busy} type='submit'>
                    Register
                </button>
            </div>
        );
    } else throw new Error();
}
