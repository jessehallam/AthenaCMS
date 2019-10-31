import { action, computed, observable, reaction } from 'mobx';
import { toggleScrollEvent } from '../../../../event';
import { IContent } from '../../../../stores/interfaces';
import notify from '../../../../utility/notify';
import MediaLibraryModel from '../MediaLibraryModel';

export interface IForm {
    altText: string;
    caption: string;
    description: string;
    title: string;
}

export default class MediaDetailsModel {
    constructor(private readonly library: MediaLibraryModel) {
        reaction(
            () => this.selected,
            () => {
                toggleScrollEvent.next(!this.selected);
            }
        );
    }

    @observable
    private _form: IForm;

    @observable
    private _selected: IContent;

    @observable
    saving: boolean = false;

    @computed
    get form() {
        return this._form;
    }

    @computed
    get selected() {
        return this._selected;
    }

    get createdAt() {
        return this.selected.createdAt;
    }

    get editUrl() {
        return '/content/image/edit/' + this.selected.id;
    }

    get fileName() {
        return this.getCustomValue('media:file_name');
    }

    get mediaContentType() {
        return this.getCustomValue('media:content_type');
    }

    get size() {
        return this.getCustomValue('media:length');
    }

    get src() {
        return this.getCustomValue('media:url');
    }

    get uploadedBy() {
        return this.selected.createdBy.userName;
    }

    get url() {
        let src = this.src;
        if (src.startsWith('/')) {
            src = location.origin + src;
        }
        return src;
    }

    @action.bound
    close() {
        this.setItem(null);
    }

    @action.bound
    next() {
        const i = this.library.contents.indexOf(this.selected);
        this.setItem(this.library.contents[i ? i - 1 : this.library.contents.length - 1]);
    }

    @action.bound
    previous() {
        const i = this.library.contents.indexOf(this.selected);
        this.setItem(this.library.contents[i === this.library.contents.length - 1 ? 0 : i + 1]);
    }

    @action.bound
    async save() {
        this.saving = true;
        notify.success('Save successful.');
        this.saving = false;
    }

    @action.bound
    setItem(content: IContent) {
        this._selected = content;
        this._form = !content
            ? null
            : observable.object<IForm>({
                  altText: this.getCustomValue('media:alt'),
                  caption: content.excerpt,
                  description: content.content,
                  title: content.title
              });
    }

    private getCustomValue(key: string): string {
        const field = this.selected.customFields.find(x => x.fieldKey === key);
        return field && field.fieldValue;
    }
}
