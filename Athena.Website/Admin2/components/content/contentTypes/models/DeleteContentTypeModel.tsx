import { action, computed, observable } from 'mobx';
import { IContentType } from '../../../../stores/interfaces';
import notify from '../../../../utility/notify';
import DeleteContentTypeModal from '../DeleteContentTypeModal';
import ContentTypesModel from './ContentTypesModel';

export default class DeleteContentTypeModel {
    constructor(private base: ContentTypesModel) {}

    @computed
    get renderer() {
        if (!this.target) return null;
        return <DeleteContentTypeModal model={this} />;
    }

    @observable
    target: IContentType = null;

    @observable
    visible: boolean = false;

    @action.bound
    async confirm() {
        this.visible = false;
        await this.base.store.content.deleteContentTypeAsync(this.target.id);
        this.base.contentTypes.remove(this.target);
        notify.success('Content type removed.');
    }

    @action.bound
    show(target: IContentType) {
        this.target = target;
        this.visible = true;
    }
}
