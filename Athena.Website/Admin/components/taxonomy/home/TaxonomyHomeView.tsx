import { action, IObservableArray, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ITaxonomy, ITerm } from '../../../ObjectModel/interfaces';
import { assignObservable } from '../../../utility/observable';
import Application from '../../Application';
import PageHeader from '../../shared/PageHeader';
import EditTaxonomyDrawer from './EditTaxonomyDrawer';
import TaxonomyTypePanel from './TaxonomyTypePanel';
import TermPanel from './TermPanel';

export interface IViewTaxonomy extends ITaxonomy {
    recordCount?: number;
}

export interface IViewTerm extends ITerm {
    recordCount?: number;
}

interface OwnProps extends RouteComponentProps {}
interface OwnState {
    editTaxonomy: {
        open: boolean;
        taxonomy: ITaxonomy;
    };

    loading: {
        taxonomies: boolean;
    };

    selectedTaxonomy: {
        loading: boolean;
        taxonomy: IViewTaxonomy;
        terms: IViewTerm[];
    };
    taxonomies: IObservableArray<IViewTaxonomy>;
}

@observer
class TaxonomyHomeView extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        editTaxonomy: observable.object({
            open: false,
            taxonomy: null
        }),

        loading: observable.object({
            taxonomies: true
        }),

        selectedTaxonomy: observable.object({
            loading: false,
            taxonomy: null,
            terms: []
        }),

        taxonomies: observable.array()
    };

    async componentDidMount() {
        this.state.taxonomies.replace(await Application.tenant.taxonomies.getTaxonomiesAsync());
        this.state.loading.taxonomies = false;

        for (const count of await Application.tenant.taxonomies.getTaxonomyCountsAsnyc()) {
            const taxonomy = this.state.taxonomies.find(x => x.id === count.id);
            taxonomy.recordCount = count.count;
        }

        this.onTaxonomySelected(this.state.taxonomies[0]);
    }

    render() {
        return (
            <div className='contentView'>
                <PageHeader actionBar={this.renderActionBar()} title='Taxonomy Management' />

                <EditTaxonomyDrawer
                    isOpen={this.state.editTaxonomy.open}
                    onCancel={() => (this.state.editTaxonomy.open = false)}
                    onComplete={this.onEditTaxonomyComplete}
                    taxonomy={this.state.editTaxonomy.taxonomy}
                />

                <div className='row'>
                    <div className='col-6'>
                        <TaxonomyTypePanel
                            loading={this.state.loading.taxonomies}
                            onEdit={this.onEditTaxonomy}
                            onSelect={this.onTaxonomySelected}
                            selected={this.state.selectedTaxonomy.taxonomy}
                            taxonomies={this.state.taxonomies}
                        />
                    </div>

                    <div className='col-6'>
                        <TermPanel
                            loading={this.state.selectedTaxonomy.loading}
                            taxonomy={this.state.selectedTaxonomy.taxonomy}
                            terms={this.state.selectedTaxonomy.terms}
                        />
                    </div>
                </div>
            </div>
        );
    }

    @action.bound
    private onEditTaxonomy(taxonomy: ITaxonomy) {
        this.state.editTaxonomy.taxonomy = taxonomy;
        this.state.editTaxonomy.open = true;
    }

    @action.bound
    private onEditTaxonomyComplete(taxonomy: ITaxonomy) {
        this.state.editTaxonomy.open = false;
        assignObservable(this.state.editTaxonomy.taxonomy, taxonomy);
    }

    @action.bound
    private async onTaxonomySelected(taxonomy: ITaxonomy) {
        this.state.selectedTaxonomy.taxonomy = taxonomy;
        this.state.selectedTaxonomy.loading = true;
        this.state.selectedTaxonomy.terms = await Application.tenant.taxonomies.getTermsAsync(taxonomy.id);
        this.state.selectedTaxonomy.terms.forEach(term => (term.recordCount = 0));
        for (let count of await Application.tenant.taxonomies.getTermCountsAsnyc()) {
            const term = this.state.selectedTaxonomy.terms.find(x => x.id === count.id);
            if (term) {
                term.recordCount = count.count || 0;
            }
        }
        this.state.selectedTaxonomy.loading = false;
    }

    private renderActionBar() {
        return [
            <button className='btn btn-primary' key='add' type='button'>
                Add Taxonomy
            </button>
        ];
    }
}

export default withRouter(TaxonomyHomeView);
