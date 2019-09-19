import * as React from 'react';

export type LoginActionType = 'register' | 'signin';

interface OwnProps {
    action: LoginActionType;
    busy: boolean;
}

export default function LoginAction(props: OwnProps) {
    const busyIcon = props.busy && props.action === 'signin' && <i className='fas fa-circle-notch fa-spin' />;

    if (props.action === 'register') {
        return (
            <div className='login__actions'>
                <span />
                <button className='btn btn-primary login__btn login__btn--primary' disabled={props.busy} type='submit'>
                    Register
                </button>
            </div>
        );
    } else if (props.action === 'signin') {
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
    }
}
