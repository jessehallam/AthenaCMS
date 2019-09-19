import { observer } from 'mobx-react';
import * as React from 'react';
import { StoreProps, withStore } from '../../../stores/withStore';
import MediaLibraryModel from './MediaLibraryModel';
import MediaLibraryView from './MediaLibraryView';

interface OwnProps extends StoreProps {}
interface OwnState {}

const MEDIA_CONTENT_TYPE = 2;

@observer
class MediaLibraryLoader extends React.Component<OwnProps, OwnState> {
    private readonly model = new MediaLibraryModel();

    async componentDidMount() {
        this.model.contents.replace(await this.props.store.content.getContentByType(MEDIA_CONTENT_TYPE));
        this.model.loaded = true;
    }

    render() {
        if (!this.model.loaded) return null;
        return <MediaLibraryView model={this.model} />;
    }
}

export default withStore(MediaLibraryLoader);
