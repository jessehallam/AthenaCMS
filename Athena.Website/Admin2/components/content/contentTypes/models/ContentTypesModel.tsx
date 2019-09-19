import { IObservableArray, observable, runInAction } from 'mobx';
import { IContentType } from '../../../../stores/interfaces';
import { RootStore } from '../../../../stores/RootStore';
import DeleteContentTypeModel from './DeleteContentTypeModel';
import EditContentTypeModel from './EditContentTypeModel';

export interface IViewContentType extends IContentType {
    total?: number;
}

export default class ContentTypesModel {
    constructor(public store: RootStore) {}

    @observable
    contentTypes: IObservableArray<IViewContentType> = observable.array();

    @observable
    delete = new DeleteContentTypeModel(this);

    @observable
    edit = new EditContentTypeModel(this);

    async getContentTypesAsync() {
        const contentTypes: IViewContentType[] = await this.store.content.getContentTypesAsync();
        const contentCounts = await this.store.content.getContentCountsAsync();

        runInAction(() => {
            contentTypes.forEach(contentType => {
                const count = contentCounts.find(x => x.typeId === contentType.id);
                contentType.total = count.total;
            });
            this.contentTypes.replace(contentTypes);
        });
    }
}
