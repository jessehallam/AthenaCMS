import { action, observable } from 'mobx';
import * as React from 'react';
import { IContentType } from '../../../ObjectModel/interfaces';
import Application from '../../Application';
import PageHeader from '../../shared/PageHeader';
import AddContentType from './AddContentType';
import ContentTypePanel from './ContentTypePanel';

export interface IViewContentType extends IContentType {
    recordCount?: number;
}

interface OwnProps {}
interface OwnState {
    contentTypes: IViewContentType[];
    loading: boolean;
    showAddDrawer: boolean;
}

export default class ContentHomeView extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        contentTypes: observable.array(),
        loading: true,
        showAddDrawer: false
    };

    async componentDidMount() {
        await this.refreshContentTypes();

        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <div className='contentView'>
                <PageHeader actionBar={this.renderActionBar()} title='Content Management' />
                <AddContentType
                    isOpen={this.state.showAddDrawer}
                    onCancel={() => this.setState({ showAddDrawer: false })}
                    onComplete={this.onContentTypeAdded}
                />

                <div className='row'>
                    <div className='col-7'>
                        <ContentTypePanel contentTypes={this.state.contentTypes} loading={this.state.loading} />
                    </div>
                </div>
            </div>
        );
    }

    @action.bound
    private onContentTypeAdded(contentType: IContentType) {
        this.refreshContentTypes();
        this.setState({ showAddDrawer: false });
    }

    private async refreshContentTypes() {
        const contentTypes: IViewContentType[] = await Application.tenant.content.getContentTypesAsync();
        const counts = await Application.tenant.content.getContentCountsAsync();

        counts.forEach(count => {
            contentTypes.find(x => x.id == count.typeId).recordCount = count.total;
        });

        this.setState({ contentTypes });
    }

    private renderActionBar() {
        return [
            <button
                className='btn btn-primary'
                key='add'
                onClick={e => this.setState({ showAddDrawer: true })}
                type='button'
            >
                Add Content Type
            </button>
        ];
    }
}
