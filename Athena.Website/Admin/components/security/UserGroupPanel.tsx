import { observer } from 'mobx-react';
import * as React from 'react';
import PagePanel from '../shared/PagePanel';
import SecurityModel from './SecurityModel';

interface OwnProps {
    model: SecurityModel;
}
interface OwnState {}

@observer
class UserGroupPanel extends React.Component<OwnProps, OwnState> {
    render() {
        return <PagePanel content={this.renderTable()} title='User Groups' />;
    }

    private renderRows() {
        const { model } = this.props;
        return model.userGroups.map((group, i) => (
            <tr key={i}>
                <td>{group.name}</td>
                <td>{group.count}</td>
                <td className='dropdown-cell'>
                    <div className='dropdown'>
                        <a className='btn btn-sm btn-clean btn-icon' href='#' data-toggle='dropdown'>
                            <i className='fas fa-ellipsis-h' />
                        </a>
                        <div className='dropdown-menu dropdown-menu-right'>
                            <ul className='dropdown-list'>
                                <li className='dropdown-listitem'>
                                    <a
                                        className='dropdown-link'
                                        href='#'
                                        onClick={() => model.editGroup.changeTo(group)}
                                    >
                                        <i className='fas fa-edit' /> Edit
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
        ));
    }

    private renderTable() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th># Users</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
        );
    }
}

export default UserGroupPanel;
