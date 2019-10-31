import { action, observable } from 'mobx';
import { IContentType } from '../../../stores/interfaces';
import { RootStore } from '../../../stores/RootStore';

export interface IViewContentType extends IContentType {
    recordCount?: number;
}

export interface EditProps {
    entity: IContentType;
    visible: boolean;
}

export interface DeleteProps {
    entity: IContentType;
    visible: boolean;
}

export class ContentHomeModel {
    @observable contentTypes: IViewContentType[] = [];
    @observable loadingContentTypes: boolean = false;

    @observable delete: DeleteProps = { entity: null, visible: false };
    @observable edit: EditProps = { entity: null, visible: false };

    constructor(readonly store: RootStore) {}

    @action.bound
    async refreshContentTypesAsync() {
        this.loadingContentTypes = true;
        this.contentTypes = await this.store.content.getContentTypesAsync();
        const counts = await this.store.content.getContentCountsAsync();
        counts.forEach(count => {
            this.contentTypes.find(x => x.id === count.typeId).recordCount = count.total;
        });
        this.loadingContentTypes = false;
    }
}
