import { action, IObservableArray, observable } from 'mobx';
import { ITaxonomy, ITerm } from '../../stores/interfaces';
import { RootStore } from '../../stores/RootStore';

export interface IViewTaxonomy extends ITaxonomy {
    count?: number;
}

export class EditTaxonomyModel {
    constructor(private parent: TaxonomyModel) {}

    @observable
    taxonomy: ITaxonomy;

    @observable
    visible: boolean = false;

    @action.bound
    show(taxonomy: ITaxonomy) {
        this.taxonomy = taxonomy;
        this.visible = true;
    }
}

export default class TaxonomyModel {
    @observable
    private _selectedTaxonomy: ITaxonomy;

    @observable
    editTaxonomy = new EditTaxonomyModel(this);

    @observable
    loaded: boolean = false;

    @observable
    taxonomies: IObservableArray<IViewTaxonomy> = observable.array();

    @observable
    terms: IObservableArray<ITerm> = observable.array();

    get selectedTaxonomy() {
        return this._selectedTaxonomy;
    }

    set selectedTaxonomy(value: ITaxonomy) {
        this._selectedTaxonomy = value;
        this.loadTerms(value);
    }

    constructor(private store: RootStore) {}

    async load() {
        const taxonomies: IViewTaxonomy[] = await this.store.taxonomy.getTaxonomies();
        const taxonomyCounts = await this.store.taxonomy.getTaxonomyCounts();

        taxonomyCounts.forEach(count => {
            taxonomies.find(x => x.id === count.id).count = count.count;
        });

        this.taxonomies.replace(taxonomies);

        this.selectedTaxonomy = this.taxonomies[0];
        this.loaded = true;
    }

    private async loadTerms(taxonomy: ITaxonomy) {
        this.terms.replace(await this.store.taxonomy.getTerms(taxonomy.id));
    }
}
