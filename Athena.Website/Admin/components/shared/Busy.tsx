import React = require('react');

export interface BusyProps {
    busy: boolean;
    children?: React.ReactNode;
}

export function Busy(props: BusyProps) {
    return (
        <span>
            {props.busy && <i className='fas fa-circle-notch fa-spin busy-indicaton mr-1' />} {props.children}
        </span>
    );
}
