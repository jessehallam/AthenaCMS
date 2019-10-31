import * as React from 'react';
import { MediaDetailsProps } from './MediaDetails';

export default function Header({ model }: MediaDetailsProps) {
    return (
        <header className='mediaDetails__header'>
            <h2 className='mediaDetails__title'>Attachment Details</h2>
            <ul className='mediaDetails__toolbar'>
                <li className='mediaDetails__toolbarButton' onClick={() => model.previous()}>
                    <i className='fas fa-angle-left' />
                </li>
                <li className='mediaDetails__toolbarButton' onClick={() => model.next()}>
                    <i className='fas fa-angle-right' />
                </li>
                <li className='mediaDetails__toolbarButton' onClick={() => model.close()}>
                    <i className='fas fa-times' />
                </li>
            </ul>
        </header>
    );
}
