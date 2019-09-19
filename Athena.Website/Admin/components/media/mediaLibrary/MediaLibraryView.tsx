import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Content } from '../../../ObjectModel/content/Content';
import Application from '../../Application';
import PageHeader from '../../shared/PageHeader';
import MediaDetails from './mediaDetails/MediaDetails';
import MediaDragDropUpload from './MediaDragDropUpload';
import MediaGrid from './MediaGrid';

class MediaLibraryModel {
    @observable contents: Content[] = [];
    @observable selectedContent: Content = null;
}

interface OwnProps {}
interface OwnState {
    model: MediaLibraryModel;
}

@observer
export default class MediaLibrary extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        model: new MediaLibraryModel()
    };

    get model() {
        return this.state.model;
    }

    async componentDidMount() {
        this.model.contents = await Application.tenant.content.getByContentTypeAsync(2);
    }

    render() {
        const { model } = this;
        return (
            <div className='mediaLibrary'>
                <PageHeader actionBar={this.renderActionBar()} title='Media Library' />
                <MediaDragDropUpload />
                <MediaDetails
                    content={model.selectedContent}
                    onClose={this.onDetailClose}
                    onNext={this.onNextSelected}
                    onPrevious={this.onPreviousSelected}
                />

                <div className='row'>
                    <div className='col'>
                        <MediaGrid contents={model.contents} onSelect={this.onSelectGridItem} />
                    </div>
                </div>
            </div>
        );
    }

    @action.bound
    private onDetailClose() {
        this.model.selectedContent = null;
    }

    @action.bound
    private onNextSelected() {
        let i = this.model.contents.indexOf(this.model.selectedContent);
        this.model.selectedContent = this.model.contents[i + 1];
    }

    @action.bound
    private onPreviousSelected() {
        let i = this.model.contents.indexOf(this.model.selectedContent);
        this.model.selectedContent = this.model.contents[i - 1];
    }

    @action.bound
    private onSelectGridItem(content: Content) {
        this.model.selectedContent = content;
    }

    private renderActionBar() {
        return <span>Drop a file anywhere to upload.</span>;
    }
}
