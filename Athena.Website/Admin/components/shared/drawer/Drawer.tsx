import * as React from 'react';
import { createPortal } from 'react-dom';
import { classList } from '../../../utility/classList';
import Backdrop from '../Backdrop';

interface OwnProps {
    canClose?: boolean;
    className?: string;
    isOpen?: boolean;
    onClose?: VoidFunction;
    style?: React.CSSProperties;
    title: string;
}

interface OwnState {}

export default class Drawer extends React.Component<OwnProps, OwnState> {
    render() {
        const classes = classList(
            'drawer',
            'drawer--position-right',
            this.props.isOpen && 'drawer--isOpen',
            this.props.className
        );

        return createPortal(
            <div className={classes} style={this.props.style}>
                {this.renderBackdrop()}
                <header className='drawer__header'>
                    <h4 className='drawer__title'>{this.props.title}</h4>
                    {this.renderClose()}
                </header>
                {this.props.children}
            </div>,
            document.body
        );
    }

    private renderBackdrop() {
        if (!this.props.isOpen) return null;
        return <Backdrop />;
    }

    private renderClose() {
        if (!this.props.canClose) return null;
        return (
            <span className='drawer__close' onClick={this.props.onClose}>
                &times;
            </span>
        );
    }

    static Body = function(props: React.PropsWithChildren<{}>) {
        return <div className='drawer__body'>{props.children}</div>;
    };

    static Footer = function(props: React.PropsWithChildren<{}>) {
        return <div className='drawer__footer'>{props.children}</div>;
    };
}
