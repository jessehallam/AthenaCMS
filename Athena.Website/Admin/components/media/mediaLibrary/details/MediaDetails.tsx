import { observer } from 'mobx-react';
import * as React from 'react';
import Backdrop, { attachToBody } from '../../../shared/backdrop';
import Header from './Header';
import ImageContainer from './ImageContainer';
import MediaDetailsModel from './MediaDetailsModel';
import Metadata from './Metadata';

export interface MediaDetailsProps {
    model: MediaDetailsModel;
}
interface OwnState {}

@observer
class MediaDetailsView extends React.Component<MediaDetailsProps, OwnState> {
    render() {
        const { model } = this.props;
        if (!model.selected) return null;
        return (
            <div className='mediaDetails'>
                <Backdrop />
                <div className='mediaDetails__container'>
                    <Header model={model} />

                    <div className='mediaDetails__body'>
                        <ImageContainer model={model} />
                        <Metadata model={model} />
                    </div>
                </div>
            </div>
        );
    }
}

export default attachToBody(MediaDetailsView);
