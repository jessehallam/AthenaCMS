import * as React from 'react';
import Nav from './Nav';
import ProfileButton from './ProfileButton';
import Search from './Search';

export default function Header() {
    return (
        <header className='header'>
            <div className='header__wrapper'>
                <Nav />

                <div className='header__right'>
                    <Search />
                    <ProfileButton />
                </div>
            </div>
        </header>
    );
}
