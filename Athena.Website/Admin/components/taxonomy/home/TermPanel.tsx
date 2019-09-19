import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ITaxonomy, ITerm } from '../../../ObjectModel/interfaces';
import PagePanel from '../../shared/PagePanel';
import EditTermDrawer from './EditTermDrawer';
import { IViewTerm } from './TaxonomyHomeView';

interface OwnProps {
    loading: boolean;
    taxonomy: ITaxonomy;
    terms: IViewTerm[];
}

interface OwnState {
    addEdit: {
        item: ITerm;
        show: boolean;
    };
    search: {
        value: string;
    };
}

const loadingRow = (
    <tr>
        <td colSpan={3}>Loading...</td>
    </tr>
);

const noItemsRow = (
    <tr>
        <td colSpan={3}>No items to display.</td>
    </tr>
);

@observer
class TermPanel extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        addEdit: observable.object({
            item: { id: null, name: '', taxonomyId: null },
            show: false
        }),
        search: observable.object({ value: '' })
    };

    render() {
        if (!this.props.taxonomy) return null;
        return [
            <PagePanel
                content={this.renderContent()}
                key='panel'
                title={`${this.props.taxonomy.name} Terms`}
                toolbar={this.renderToolbar()}
            />,

            <EditTermDrawer
                item={this.state.addEdit.item}
                key='drawer'
                onCancel={this.onEditCancel}
                show={this.state.addEdit.show}
                taxonomy={this.props.taxonomy}
                terms={this.props.terms}
            />
        ];
    }

    @action.bound
    private onAddClick() {
        const { addEdit } = this.state;
        addEdit.item = { id: null, name: '', taxonomyId: null };
        addEdit.show = true;
    }

    @action.bound
    private onEditCancel() {
        const { addEdit } = this.state;
        addEdit.show = false;
    }

    @action.bound
    private onEditClick(item: ITerm) {
        const { addEdit } = this.state;
        addEdit.item = item;
        addEdit.show = true;
    }

    @action.bound
    private onSearchChange(value: string) {
        this.state.search.value = value;
    }

    private renderContent() {
        let rows: React.ReactNode;

        if (this.props.loading) {
            rows = loadingRow;
        } else if (!this.props.terms.length) {
            rows = noItemsRow;
        } else {
            rows = this.props.terms.map((term, i) => (
                <tr key={i}>
                    <td>{term.name}</td>
                    <td>{term.recordCount}</td>
                    <td>
                        <a href='#' key='edit' onClick={() => this.onEditClick(term)}>
                            Edit
                        </a>
                        <span className='table__separator' key='sep' />
                        <a className='text-danger' href='#' key='delete'>
                            Delete
                        </a>
                    </td>
                </tr>
            ));
        }

        return (
            <table className='table mb-0'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    private renderToolbar() {
        return (
            <div className='pagePanel__toolbarSpread'>
                <button className='btn btn-primary btn-sm' key='add' onClick={this.onAddClick} type='button'>
                    Add Term
                </button>
            </div>
        );
    }
}

export default TermPanel;
