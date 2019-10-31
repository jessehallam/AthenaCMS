import { observer } from 'mobx-react';
import * as React from 'react';
import PagePanel from '../shared/PagePanel';
import SecurityModel from './SecurityModel';

interface OwnProps {
    model: SecurityModel;
}
interface OwnState {}

@observer
class UserPanel extends React.Component<OwnProps, OwnState> {
    render() {
        return <PagePanel content={this.renderTable()} title='Users' />;
    }

    private renderRows() {
        return this.props.model.users.map(user => (
            <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td></td>
            </tr>
        ));
    }

    private renderTable() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>User name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
        );
    }
}

export default UserPanel;
