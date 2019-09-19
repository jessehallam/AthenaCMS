import { action, observable } from 'mobx';
import { assignObservable } from '../../utility/observable';
import { ContentStatus, IContent, IContentTerm, ICustomField } from '../interfaces';

export class Content implements IContent {
    @observable content: string;
    @observable customFields: ICustomField[];
    @observable createdAt: string;
    @observable createdBy: {
        email: string;
        id: number;
        userName: string;
    };
    @observable excerpt: string;
    @observable id: number;
    @observable publishedAt: string;
    @observable status: ContentStatus;
    @observable taxonomyTerms: IContentTerm[];
    @observable title: string;
    @observable type: {
        id: number;
        name: string;
    };
    @observable updatedAt: string;

    getCustomField(key: string, create: boolean = false) {
        let field = this.customFields.find(x => x.fieldKey === key);
        if (!field && create) {
            field = { fieldKey: key, fieldValue: '', id: null };
            this.customFields.push(field);
        }
        return field;
    }

    getCustomFieldValue(key: string, defaultValue: string = undefined) {
        const field = this.getCustomField(key);
        return field ? field.fieldValue : defaultValue;
    }

    @action.bound
    setCustomFieldValue(key: string, value: string) {
        const field = this.getCustomField(key, true);
        field.fieldValue = value;
    }

    static fromObject(o: any): Content {
        return assignObservable(new Content(), o);
    }
}
