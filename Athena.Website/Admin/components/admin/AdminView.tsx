import * as React from 'react';
import AdminRouter from './AdminRouter';
import HeaderPart from './header/HeaderPart';

interface OwnProps {}
interface OwnState {}

export default function AdminView() {
    return (
        <div className='adminPanel'>
            <HeaderPart />

            <div className='adminPanel__mainContentBox'>
                <div className='adminPanel__mainContentWrapper'>
                    <AdminRouter />
                </div>
            </div>
        </div>
    );
}
