import * as jQuery from 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

export interface ModalProps {
    backdrop?: boolean | 'static';
    focus?: boolean;
    isOpen?: boolean;
    keyboard?: boolean;
    onClose?: VoidFunction;
}

interface OwnState {}

interface ModalOptions {
    backdrop?: boolean | 'static';
    focus?: boolean;
    keyboard?: boolean;
}

class Modal extends React.Component<ModalProps, OwnState> {
    render() {
        return ReactDOM.createPortal(<ModalContent {...this.props} />, document.body);
    }

    static readonly Body = Body;
    static readonly Footer = Footer;
    static readonly Header = Header;
}

class ModalContent extends React.Component<ModalProps> {
    private div: HTMLDivElement;

    componentDidMount() {
        if (this.props.isOpen) {
            this.show();
        }
        const j: any = jQuery(this.div);
        j.on('hidden.bs.modal', () => {
            if (this.props.onClose) {
                this.props.onClose();
            }
        });
    }

    componentDidUpdate(prev: ModalProps) {
        if (!prev.isOpen && this.props.isOpen) {
            this.show();
        } else if (prev.isOpen && !this.props.isOpen) {
            const j: any = jQuery(this.div);
            j.modal('hide');
        }
    }

    render() {
        return (
            <div className='modal' tabIndex={-1} role='dialog' ref={div => (this.div = div)}>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>{this.props.children}</div>
                </div>
            </div>
        );
    }

    private show() {
        const j: any = jQuery(this.div);
        j.modal(createModalOptions(this.props));
    }
}

function createModalOptions(props: ModalProps): ModalOptions {
    const options: ModalOptions = {};

    if (props.backdrop !== void 0) options.backdrop = props.backdrop;
    if (props.focus !== void 0) options.focus = props.focus;
    if (props.keyboard !== void 0) options.keyboard = props.keyboard;
    return options;
}

export default Modal;
