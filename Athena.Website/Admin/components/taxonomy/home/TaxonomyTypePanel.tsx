import { observer } from 'mobx-react';
import * as React from 'react';
import { ITaxonomy } from '../../../ObjectModel/interfaces';
import Application from '../../Application';
import PagePanel from '../../shared/PagePanel';
import { IViewTaxonomy } from './TaxonomyHomeView';

interface OwnProps {
    loading: boolean;
    onEdit: (taxonomy: ITaxonomy) => void;
    onSelect: (taxonomy: ITaxonomy) => void;
    selected: IViewTaxonomy;
    taxonomies: IViewTaxonomy[];
}

interface OwnState {}

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

const subTitle: React.ReactNode = (
    <div>
        Taxonomies are a method of classifying content and data in Athena CMS. When you use a taxonomy, you're grouping
        similar things together. Built-in taxonomies are <strong>Category</strong> and <strong>Tag</strong>.
    </div>
);

@observer
export default class TaxonomyTypePanel extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        contentTypes: [],
        loading: true
    };

    async componentDidMount() {
        const contentTypes = await Application.tenant.content.getContentTypesAsync();
        this.setState({
            contentTypes,
            loading: false
        });
    }

    render() {
        return <PagePanel content={this.renderContent()} subTitle={subTitle} title='Taxonomy Types' />;
    }

    private renderActions(taxonomy: ITaxonomy) {
        if (taxonomy.id === 1 || taxonomy.id === 2) {
            return null;
        }
        return [
            <a href='#' key='edit' onClick={() => this.props.onEdit(taxonomy)}>
                Edit
            </a>,
            <span className='table__separator' key='sep' />,
            <a className='text-danger' href='#' key='delete'>
                Delete
            </a>
        ];
    }

    private renderContent() {
        let rows: React.ReactNode;

        if (this.props.loading) {
            rows = loadingRow;
        } else if (!this.props.taxonomies.length) {
            rows = noItemsRow;
        } else {
            rows = this.props.taxonomies.map((taxonomy, i) => (
                <tr key={i}>
                    <td>
                        <a
                            href='#'
                            onClick={e => {
                                e.preventDefault();
                                this.props.onSelect(taxonomy);
                            }}
                        >
                            {React.createElement(
                                taxonomy === this.props.selected ? 'strong' : 'span',
                                null,
                                taxonomy.name
                            )}
                        </a>
                    </td>
                    <td>{taxonomy.recordCount}</td>
                    <td>{this.renderActions(taxonomy)}</td>
                </tr>
            ));
        }

        return (
            <table className='table mb-0'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th># Records</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}
