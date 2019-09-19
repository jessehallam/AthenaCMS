import { observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { StoreProps, withStore } from '../../../stores/withStore';
import PageHeader from '../../shared/PageHeader';
import ContentListPanel from './ContentListPanel';
import { ContentListModel } from './model';

interface RouteParams {
    contentTypeName: string;
}
interface OwnProps extends RouteComponentProps<RouteParams>, StoreProps {}
interface OwnState {
    model: ContentListModel;
}

@observer
class ContentListView extends React.Component<OwnProps, OwnState> {
    readonly model = new ContentListModel(this.props.store);

    async componentDidMount() {
        this.model.contentType = await this.props.store.content.getContentTypeByNameAsync(
            this.props.match.params.contentTypeName
        );
        this.model.refreshContent();
    }

    render() {
        if (!this.model.contentType) return null;
        const title = `${this.model.contentType.name} Content`;
        return (
            <div className='contentList'>
                <PageHeader actionBar={this.renderActionBar()} title={title} />

                <div className='row'>
                    <div className='col-12'>
                        <ContentListPanel model={this.model} store={this.props.store} />
                    </div>
                </div>
            </div>
        );
    }

    private renderActionBar() {
        return [
            <button className='btn btn-primary' key='add' type='button'>
                Add {this.model.contentType.name}
            </button>
        ];
    }
}

export default withRouter(withStore(ContentListView));
