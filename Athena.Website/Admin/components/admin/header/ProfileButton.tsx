import * as React from 'react';

interface OwnProps {}
interface OwnState {}

export default class ProfileButton extends React.Component<OwnProps, OwnState> {
    render() {
        return (
            <div className='adminHeaderPart__profileButton'>
                <div className='adminHeaderPart__user'>
                    Hello <span className='adminHeaderPart__username'>admin</span>
                </div>
            </div>
        );
    }
}
