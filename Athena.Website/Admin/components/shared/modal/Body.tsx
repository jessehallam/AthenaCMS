import * as React from 'react';

interface OwnProps {}
interface OwnState {}

class Body extends React.Component<OwnProps, OwnState> {
    render() {
        return <div className='modal-body'>{this.props.children}</div>;
    }
}

export default Body;
