import * as React from 'react';
import { MediaDetailsProps } from './MediaDetails';

export default function ImageContainer({ model }: MediaDetailsProps) {
    return (
        <div className='mediaDetails__imageWrapper'>
            <div className='mediaDetails__absoluteImageContainer'>
                <img className='mediaDetails__image' src={model.src} />
            </div>
        </div>
    );
}
