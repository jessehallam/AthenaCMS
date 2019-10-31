import { action, computed, observable, runInAction } from 'mobx';
import { IContent, IContentTaxonomyTerm, IContentType } from '../../../stores/interfaces';
import { RootStore } from '../../../stores/RootStore';
import { IPickListItem } from '../../../utility/utility.interfaces';
import R = require('ramda');

export type ContentFilterType = (content: IContent) => boolean;
export interface ContentFilterInfo {
    predicate: ContentFilterType;
    value: string;
}

export class ContentListModel {
    @observable
    contentType: IContentType = null;

    @observable
    contents: IContent[] = [];

    @observable
    filters: Map<string, ContentFilterInfo> = observable.map();

    @observable
    loadingContent: boolean = false;

    constructor(private readonly store: RootStore) {}

    @computed
    get authors(): IPickListItem[] {
        // strip unwanted data:
        let items = this.filteredContents.map(x => x.createdBy);
        let comparer = R.eqBy((value: typeof items[0]) => value.id);
        // get unique values:
        items = R.uniqWith(comparer, items);
        // sort:
        items = R.sortBy(R.prop('userName'), items);
        // convert to pick lists:
        return items.map<IPickListItem>(item => ({
            item,
            label: item.userName,
            value: item.id
        }));
    }

    @computed
    get dates(): IPickListItem[] {
        // get either published date or created date, whichever exists:
        let items = this.filteredContents.map(x => new Date(x.publishedAt || x.createdAt));
        // get unique values:
        let eq = R.eqBy((date: Date) => date.toDateString());
        items = R.uniqWith(eq, items);
        // sort:
        items = items.sort();
        // convert:
        return items.map<IPickListItem>(item => ({
            item,
            label: item.toDateString(),
            value: item.toDateString()
        }));
    }

    @computed
    get categories(): IPickListItem[] {
        // get flat list of terms:
        let items = R.flatten<IContentTaxonomyTerm>(this.filteredContents.map(x => x.taxonomyTerms));
        // filter down to categories:
        items = items.filter(x => x.taxonomyId === 1);
        // make unique:
        items = R.uniqBy(R.prop('name'), items);
        // sort:
        items = R.sortBy(R.prop('name'), items);
        // convert:
        return items.map<IPickListItem>(item => ({
            item,
            label: item.name,
            value: item.id.toString()
        }));
    }

    @computed
    get tags(): IPickListItem[] {
        // get flat list of terms:
        let items = R.flatten<IContentTaxonomyTerm>(this.filteredContents.map(x => x.taxonomyTerms));
        // filter down to categories:
        items = items.filter(x => x.taxonomyId === 2);
        // make unique:
        items = R.uniqBy(R.prop('name'), items);
        // sort:
        items = R.sortBy(R.prop('name'), items);
        // convert:
        return items.map<IPickListItem>(item => ({
            item,
            label: item.name,
            value: item.id.toString()
        }));
    }

    @computed get filteredContents(): IContent[] {
        const filters = Array.from(this.filters.values());
        return this.contents.filter(content => filters.every(filter => filter.predicate(content)));
    }

    @action.bound
    async refreshContent() {
        this.loadingContent = true;
        const contents = await this.store.content.getContentByType(this.contentType.id);
        runInAction(() => {
            this.loadingContent = false;
            this.contents = contents;
        });
    }
}
