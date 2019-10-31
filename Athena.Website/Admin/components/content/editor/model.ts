import { observable } from 'mobx';
import { IContent, IContentType } from '../../../stores/interfaces';
import { RootStore } from '../../../stores/RootStore';

export class EditorModel {
    @observable
    content: IContent;

    @observable
    contentType: IContentType;

    @observable
    loading: boolean;

    constructor(private readonly store: RootStore) {}

    async reload(contentTypeName: string, contentId: number) {
        this.loading = true;
        this.contentType = await this.store.content.getContentTypeByNameAsync(contentTypeName);
        this.content = await this.store.content.getContentById(contentId);
        this.loading = false;
    }
}
