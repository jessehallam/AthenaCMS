import { action, computed, observable } from 'mobx';
import { IContentType } from '../../../../stores/interfaces';
import { delay } from '../../../../utility/delay';
import notify from '../../../../utility/notify';
import { assignObservable } from '../../../../utility/observable';
import EditContentType from '../EditContentType';
import ContentTypesModel from './ContentTypesModel';

export default class EditContentTypeModel {
    constructor(private base: ContentTypesModel) {}

    @computed
    get renderer() {
        if (!this.target) return null;
        return <EditContentType model={this} />;
    }

    @observable
    saving: boolean = false;

    @observable
    target: IContentType = { name: '' };

    @observable
    visible: boolean = false;

    @action.bound
    async save(data: IContentType) {
        this.saving = true;
        this.target.name = data.name;

        const operation = this.target.id ? 'update' : 'create';

        const wait = delay(1000);
        const result =
            operation === 'update'
                ? await this.base.store.content.updateContentTypeAsync(this.target)
                : await this.base.store.content.createContentType(this.target);

        assignObservable(this.target, result);
        if (operation === 'create') this.base.contentTypes.push(this.target);

        this.saving = false;
        this.visible = false;

        notify.success(`Content type ${operation === 'create' ? 'created' : 'saved'}.`);
        await wait;
    }

    @action.bound
    show(contentType?: IContentType) {
        this.target = contentType || { id: null, name: '' };
        this.visible = true;
    }
}
