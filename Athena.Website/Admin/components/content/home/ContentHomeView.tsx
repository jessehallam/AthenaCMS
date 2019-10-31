import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IContentType } from '../../../stores/interfaces';
import { StoreProps, withStore } from '../../../stores/withStore';
import notify from '../../../utility/notify';
import { assignObservable } from '../../../utility/observable';
import PageHeader from '../../shared/PageHeader';
import ContentTypeListPanel from './ContentTypeListPanel';
import DeleteDialog from './DeleteDialog';
import EditContentTypeDrawer from './EditContentTypeDrawer';
import { ContentHomeModel } from './model';

interface OwnProps extends StoreProps {}
interface OwnState {
    model: ContentHomeModel;
}

@observer
class ContentHomeView extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        model: new ContentHomeModel(this.props.store)
    };

    componentDidMount() {
        this.state.model.refreshContentTypesAsync();
    }

    render() {
        const { model } = this.state;

        return (
            <div className='contentHome'>
                <PageHeader actionBar={this.renderActionBar()} title='Content Management' />

                <EditContentTypeDrawer
                    entity={model.edit.entity}
                    onCancel={this.onEditCancel}
                    onComplete={this.onEditComplete}
                    visible={model.edit.visible}
                />

                <DeleteDialog
                    entity={model.delete.entity}
                    onClose={this.onDeleteClose}
                    onConfirm={this.onDeleteConfirm}
                    visible={model.delete.visible}
                />

                <div className='row'>
                    <div className='col-7'>
                        <ContentTypeListPanel
                            model={this.state.model}
                            onDelete={this.onDeleteContentType}
                            onEdit={this.onEditContentType}
                        />
                    </div>
                </div>
            </div>
        );
    }

    @action.bound
    private onAddClick() {
        const { edit } = this.state.model;
        edit.entity = { name: '' };
        edit.visible = true;
    }

    @action.bound
    private onEditCancel() {
        const { edit } = this.state.model;
        edit.visible = false;
    }

    @action.bound
    private onDeleteClose() {
        this.state.model.delete.visible = false;
    }

    @action.bound
    private onDeleteConfirm() {
        this.state.model.delete.visible = false;
    }

    @action.bound
    private onDeleteContentType(contentType: IContentType) {
        this.state.model.delete.entity = contentType;
        this.state.model.delete.visible = true;
    }

    @action.bound
    private onEditContentType(contentType: IContentType) {
        const { edit } = this.state.model;
        edit.entity = contentType;
        edit.visible = true;
    }

    @action.bound
    private onEditComplete(contentType: IContentType) {
        const { edit } = this.state.model;
        if (!edit.entity.id) {
            this.state.model.contentTypes.push(contentType);
            notify.success('Content type created.');
        } else {
            assignObservable(edit.entity, contentType);
            notify.success('Content type updated.');
        }
        edit.visible = false;
    }

    private renderActionBar() {
        return [
            <button className='btn btn-primary' key='add' onClick={this.onAddClick} type='button'>
                Add Content Type
            </button>
        ];
    }
}

export default withStore(ContentHomeView);
