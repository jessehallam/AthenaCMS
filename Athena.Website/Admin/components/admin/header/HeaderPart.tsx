import * as React from 'react';
import Nav from './Nav';
import ProfileButton from './ProfileButton';
import Search from './Search';

interface OwnProps {}
interface OwnState {}

export default class HeaderPart extends React.Component<OwnProps, OwnState> {
    render() {
        return (
            <header className='adminHeaderPart'>
                <div className='adminHeaderPart__wrapper'>
                    <Nav />

                    <div className='adminHeaderPart__right'>
                        <Search />
                        <ProfileButton />
                    </div>
                </div>
            </header>
        );
    }
}
