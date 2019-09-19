import { action, IObservableArray, observable } from 'mobx';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Content } from '../../../ObjectModel/content/Content';
import { IContentType } from '../../../ObjectModel/interfaces';
import Application from '../../Application';
import PageHeader from '../../shared/PageHeader';
import ContentListPanel from './ContentListPanel';

interface OwnProps extends RouteComponentProps {
    contentType: IContentType;
}

interface OwnState {
    contents: IObservableArray<Content>;
}

class ContentListView extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        contents: observable.array()
    };

    componentDidMount() {
        this.refreshContent();
    }

    render() {
        const title = `${this.props.contentType.name} Content`;
        return (
            <div className='contentView'>
                <PageHeader actionBar={this.renderActionBar()} title={title} />

                <div className='row'>
                    <div className='col'>
                        <ContentListPanel contents={this.state.contents} />
                    </div>
                </div>
            </div>
        );
    }

    @action.bound
    private onAddClick() {
        this.props.history.push(`${this.props.location.pathname}/add`);
    }

    @action.bound
    private async refreshContent() {
        const contents = await Application.tenant.content.getByContentTypeAsync(this.props.contentType.id);
        this.state.contents.replace(contents);
    }

    private renderActionBar() {
        return [
            <button className='btn btn-primary' key='add' onClick={this.onAddClick} type='button'>
                Add {this.props.contentType.name}
            </button>
        ];
    }
}

export default withRouter(ContentListView);
