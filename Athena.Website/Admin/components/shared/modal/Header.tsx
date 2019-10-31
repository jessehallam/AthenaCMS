import * as React from 'react';

interface OwnProps {
    canClose?: boolean;
    title: React.ReactNode;
}
interface OwnState {}

class Header extends React.Component<OwnProps, OwnState> {
    render() {
        return (
            <div className='modal-header'>
                <h5 className='modal-title'>{this.props.title}</h5>
                {this.props.canClose && (
                    <button className='close' data-dismiss='modal' type='button'>
                        <span>&times;</span>
                    </button>
                )}
            </div>
        );
    }
}

export default Header;
