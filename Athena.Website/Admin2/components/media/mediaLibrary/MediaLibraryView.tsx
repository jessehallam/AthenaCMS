import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IContent } from '../../../stores/interfaces';
import PageHeader from '../../shared/PageHeader';
import MediaDetailsView from './details/MediaDetails';
import MediaDetailsModel from './details/MediaDetailsModel';
import MediaGrid from './MediaGrid';
import MediaLibraryFilters from './MediaLibraryFilters';
import MediaLibraryModel from './MediaLibraryModel';

interface OwnProps {
    model: MediaLibraryModel;
}
interface OwnState {}

@observer
export default class MediaLibraryView extends React.Component<OwnProps, OwnState> {
    readonly details = new MediaDetailsModel(this.props.model);

    render() {
        const { model } = this.props;
        return (
            <div className='mediaLibrary'>
                <PageHeader actionBar={this.renderActionBar()} title='Media Library' />

                <MediaDetailsView model={this.details} />

                <div className='row'>
                    <div className='col'>
                        <MediaGrid contents={model.filters.view} onClick={this.onItemClick} />
                    </div>
                </div>
            </div>
        );
    }

    @action.bound
    private onItemClick(content: IContent) {
        this.details.setItem(content);
    }

    private renderActionBar() {
        return <MediaLibraryFilters model={this.props.model} />;
    }
}
