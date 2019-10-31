import * as React from 'react';

interface OwnProps {}
interface OwnState {}

class Footer extends React.Component<OwnProps, OwnState> {
    render() {
        return <div className='modal-footer'>{this.props.children}</div>;
    }
}

export default Footer;
