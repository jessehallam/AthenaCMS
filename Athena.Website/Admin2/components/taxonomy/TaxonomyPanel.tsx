import * as React from 'react';
import { ITaxonomy } from '../../stores/interfaces';
import PagePanel from '../shared/PagePanel';
import TaxonomyModel from './TaxonomyModel';

interface OwnProps {
    model: TaxonomyModel;
}
interface OwnState {}

const subTitle: React.ReactNode = (
    <div>
        Taxonomies are a method of classifying content and data in Athena CMS. When you use a taxonomy, you're grouping
        similar things together. Built-in taxonomies are <strong>Category</strong> and <strong>Tag</strong>.
    </div>
);

export default class TaxonomyPanel extends React.Component<OwnProps, OwnState> {
    render() {
        return <PagePanel content={this.renderTable()} subTitle={subTitle} title='Taxonomies' />;
    }

    private renderActions(taxonomy: ITaxonomy) {
        const { model } = this.props;
        return (
            <div className='dropdown'>
                <a className='btn btn-sm btn-clean btn-icon' href='#' data-toggle='dropdown'>
                    <i className='fas fa-ellipsis-h' />
                </a>
                <div className='dropdown-menu dropdown-menu-right'>
                    <ul className='dropdown-list'>
                        <li className='dropdown-listitem'>
                            <a className='dropdown-link' href='#' onClick={() => model.editTaxonomy.show(taxonomy)}>
                                <i className='fas fa-edit' /> Edit
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    private renderRows() {
        const model = this.props.model;
        return model.taxonomies.map((taxonomy, i) => (
            <tr key={i}>
                <td>
                    <a href='#' onClick={() => (model.selectedTaxonomy = taxonomy)}>
                        {React.createElement(
                            taxonomy === model.selectedTaxonomy ? 'strong' : 'span',
                            {},
                            taxonomy.name
                        )}
                    </a>
                </td>
                <td>{taxonomy.count}</td>
                <td className='dropdown-cell'>{this.renderActions(taxonomy)}</td>
            </tr>
        ));
    }

    private renderTable() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th># Terms</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
        );
    }
}
