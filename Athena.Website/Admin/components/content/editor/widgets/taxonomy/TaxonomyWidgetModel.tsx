import { action, computed, IObservableArray, observable, runInAction } from 'mobx';
import { ITaxonomy, ITerm } from '../../../../../stores/interfaces';
import { RootStore } from '../../../../../stores/RootStore';
import { WidgetModel } from '../../widget/model';

export interface IAddProperties {
    name: string;
    parentId: string;
    saving: boolean;
    visible: boolean;
}

export interface IOptions {
    taxonomyId: string;
    title: string;
}

type ChangeType = (event: React.ChangeEvent<HTMLInputElement>) => void;

export default class TaxonomyWidgetModel {
    constructor(private readonly widget: WidgetModel<IOptions>, private readonly store: RootStore) {}

    @observable
    add: IAddProperties = {
        name: '',
        parentId: '',
        saving: false,
        visible: false
    };

    @observable
    loaded: boolean = false;

    @observable
    taxonomy: ITaxonomy;

    @observable
    terms: IObservableArray<ITerm> = observable.array();

    @computed
    get options() {
        return this.widget.options;
    }

    get activeTerms(): Record<number, boolean> {
        const { content } = this.widget;
        const terms = content.taxonomyTerms;
        return terms.reduce((dict, term) => {
            dict[term.id] = true;
            return dict;
        }, {});
    }

    async addTerm(term: ITerm): Promise<void> {
        term = await this.store.taxonomy.createTerm(term);
        runInAction(() => this.terms.push(term));
    }

    createChangeHandler(term: ITerm): ChangeType {
        return event => {
            const { content } = this.widget;
            if (event.target.checked) {
                content.taxonomyTerms.push({
                    id: term.id,
                    name: term.name,
                    parentId: term.parentId,
                    taxonomyId: term.taxonomyId
                });
            } else {
                const index = content.taxonomyTerms.findIndex(x => x.id === term.id);
                if (~index) {
                    content.taxonomyTerms.splice(index, 1);
                }
            }
        };
    }

    @action.bound
    async load() {
        const taxonomies = await this.store.taxonomy.getTaxonomies();
        const taxonomy = taxonomies.find(x => x.id === Number(this.options.taxonomyId));
        const terms = await this.store.taxonomy.getTerms(taxonomy.id);

        runInAction(() => {
            this.taxonomy = taxonomy;
            this.terms.replace(terms);
            this.loaded = true;
        });
    }
}
