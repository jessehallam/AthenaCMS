import { observable } from 'mobx';
import { Content } from '../../../../ObjectModel/content/Content';
import { formatDate } from '../../../../utility/date';
import { prettify } from '../../../../utility/fileSize';

export class MediaDetailViewModel {
    @observable altText: string;
    @observable caption: string;
    @observable description: string;
    @observable title: string;

    get contentType() {
        return this.model.getCustomFieldValue('media:content_type');
    }

    get createdAt() {
        return formatDate(this.model.createdAt);
    }

    get editorUri() {
        return `/admin/content/edit/${this.model.type.name.toLowerCase()}/${this.model.id}`;
    }

    get fileName() {
        return this.model.getCustomFieldValue('media:file_name');
    }

    get size() {
        return prettify(Number(this.model.getCustomFieldValue('media:length')));
    }

    get src() {
        return this.model.getCustomFieldValue('media:url');
    }

    get uploadedBy() {
        return this.model.createdBy.userName;
    }

    get url() {
        let src = this.src;
        if (src.startsWith('/')) {
            src = location.origin + src;
        }
        return src;
    }

    constructor(private readonly model: Content) {
        this.altText = model.getCustomFieldValue('media:alt', '');
        this.caption = model.excerpt;
        this.description = model.content;
        this.title = model.title;
    }

    /** Indicates whether the view model represents the same content object. */
    isEqual(content: Content) {
        return content === this.model;
    }

    /**
     * Save the pending changes to the API.
     */
    async saveChangesAsync() {}
}
