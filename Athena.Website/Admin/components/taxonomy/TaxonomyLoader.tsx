import { observer } from 'mobx-react';
import * as React from 'react';
import { StoreProps, withStore } from '../../stores/withStore';
import PageHeader from '../shared/PageHeader';
import EditTaxonomyDrawer from './EditTaxonomyDrawer';
import TaxonomyModel from './TaxonomyModel';
import TaxonomyPanel from './TaxonomyPanel';
import TermPanel from './TermPanel';

interface OwnProps extends StoreProps {}
interface OwnState {}

@observer
class TaxonomyLoader extends React.Component<OwnProps, OwnState> {
    readonly model = new TaxonomyModel(this.props.store);

    componentDidMount() {
        this.model.load();
    }

    render() {
        if (!this.model.loaded) return null;
        return (
            <div>
                <PageHeader actionBar={this.renderActionBar()} title='Taxonomy Management' />

                <EditTaxonomyDrawer model={this.model.editTaxonomy} />

                <div className='row'>
                    <div className='col-7'>
                        <TaxonomyPanel model={this.model} />
                    </div>

                    <div className='col'>
                        <TermPanel model={this.model} />
                    </div>
                </div>
            </div>
        );
    }

    private renderActionBar() {
        return [
            <button className='btn btn-primary' key='add' type='button'>
                Add Taxonomy
            </button>
        ];
    }
}

export default withStore(TaxonomyLoader);
