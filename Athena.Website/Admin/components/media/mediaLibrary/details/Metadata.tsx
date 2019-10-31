import * as React from 'react';
import Form from './Form';
import { MediaDetailsProps } from './MediaDetails';
import MetadataStatic from './MetadataStatic';

interface OwnProps extends MediaDetailsProps {}
interface OwnState {}

export default class Metadata extends React.Component<OwnProps, OwnState> {
    render() {
        return (
            <div className='mediaDetails__metaWrapper'>
                <MetadataStatic {...this.props} />
                <Form {...this.props} />
            </div>
        );
    }
}
