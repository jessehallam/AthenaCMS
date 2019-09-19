import * as React from 'react';
import { MediaDetailsProps } from './MediaDetails';

export default function MetadataStatic({ model }: MediaDetailsProps) {
    return (
        <ul className='mediaDetails__staticInfo'>
            <li key='filename'>
                <strong>File name:</strong> {model.fileName}
            </li>

            <li key='filetype'>
                <strong>File type:</strong> {model.mediaContentType}
            </li>

            <li key='uploaddate'>
                <strong>Uploaded on:</strong> {model.createdAt}
            </li>

            <li key='filesize'>
                <strong>File size:</strong> {model.size}
            </li>

            <li key='uploadedby'>
                <strong>Uploaded by:</strong> {model.uploadedBy}
            </li>

            <li key='url'>
                <strong>URL:</strong>{' '}
                <a href={model.url} target='_blank'>
                    {model.url}
                </a>
            </li>
        </ul>
    );
}
