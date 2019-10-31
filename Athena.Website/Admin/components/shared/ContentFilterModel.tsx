import { action, computed, observable, reaction } from 'mobx';
import * as R from 'ramda';
import { IContent, IContentTaxonomyTerm } from '../../stores/interfaces';
import { IPickListItem } from '../../utility/utility.interfaces';

export type ContentFilterPredicate = (content: IContent) => boolean;

export interface IContentFilter<TValue> {
    value: TValue;
}

export default class ContentFilterModel {
    @observable
    private contents: IContent[] = [];

    @observable
    private filters: Map<string, ContentFilterPredicate> = observable.map();

    constructor(contents: IContent[]) {
        this.contents = contents;
    }

    /**********/
    /* Prepared filters: */
    /**********/

    readonly category = this.defineFilter('category', (item: IPickListItem) => content =>
        content.taxonomyTerms.some(term => term.id === Number(item.value) && term.taxonomyId === 1)
    );

    readonly date = this.defineFilter('date', (item: IPickListItem) => content =>
        new Date(content.publishedAt || content.createdAt).toDateString() === item.value
    );

    readonly tag = this.defineFilter('tag', (item: IPickListItem) => content =>
        content.taxonomyTerms.some(term => term.id === Number(item.value) && term.taxonomyId === 2)
    );

    /**********/
    /* Computed pick lists for filters: */
    /**********/

    @computed
    get categories(): IPickListItem[] {
        return this.createPickListFromTaxonomy(1);
    }

    @computed
    get dates(): IPickListItem[] {
        // take published date or created date, which ever exists:
        let items = this.view.map(x => new Date(x.publishedAt || x.createdAt));
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
    get tags(): IPickListItem[] {
        return this.createPickListFromTaxonomy(2);
    }

    @computed
    get view() {
        if (!this.filters.size) return this.contents;
        const predicates = Array.from(this.filters.values());
        return this.contents.filter(content => predicates.every(predicate => predicate(content)));
    }

    @action.bound
    setContents(contents: IContent[]) {
        this.contents = contents;
    }

    @action.bound
    protected defineFilter<TValue>(
        filterKey: string,
        predicateBuilder: (value: TValue) => ContentFilterPredicate
    ): IContentFilter<TValue> {
        const filter: IContentFilter<TValue> = observable.object({ value: null });
        reaction(
            () => filter.value,
            action('onFilterChange', () => {
                if (filter.value) {
                    this.filters.set(filterKey, predicateBuilder(filter.value));
                } else {
                    this.filters.delete(filterKey);
                }
            })
        );
        return filter;
    }

    private createPickListFromTaxonomy(taxonomyId: number) {
        // get flat list of terms:
        let items = R.flatten<IContentTaxonomyTerm>(this.view.map(x => x.taxonomyTerms));
        // filter down to categories:
        items = items.filter(x => x.taxonomyId === taxonomyId);
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
}
