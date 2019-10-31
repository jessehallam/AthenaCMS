import { observer } from 'mobx-react';
import * as React from 'react';
import PagePanel from '../shared/PagePanel';
import TaxonomyModel from './TaxonomyModel';

interface OwnProps {
    model: TaxonomyModel;
}
interface OwnState {}

@observer
export default class TermPanel extends React.Component<OwnProps, OwnState> {
    render() {
        return <PagePanel content={this.renderTable()} title='Terms' />;
    }

    private renderRows() {
        const { model } = this.props;
        return model.terms.map((term, i) => (
            <tr key={i}>
                <td>{term.name}</td>
                <td>{0}</td>
                <td></td>
            </tr>
        ));
    }

    private renderTable() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th># Contents</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
        );
    }
}
