import * as React from 'react';
import Drawer from '../../shared/drawer/drawer';
import Form from '../../shared/form2/Form';
import SecurityModel from '../SecurityModel';

interface FormData {
    name: string;
}

interface OwnProps {
    model: SecurityModel;
}
interface OwnState {}

class EditGroupDrawer extends React.Component<OwnProps, OwnState> {
    readonly form = new Form<FormData>();
    readonly NameField = this.form.createInputDecorator({
        id: 'name',
        initialValue: '',
        rules: [{ required: true, message: 'Name is required.' }]
    });

    render() {
        const { model } = this.props;
        const { editGroup } = model;
        const { Form, Group } = this.form;
        return (
            <Drawer isOpen={editGroup.visible} title='Edit user group' width={800}>
                <Form>
                    <Drawer.Body>
                        <Group label='Name'>{this.NameField(<input className='form-control' />)}</Group>
                        <div className='row'>
                            <div className='col'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Security Activity</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderSecurityActivities()}</tbody>
                                </table>
                            </div>
                        </div>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <button className='btn btn-default' type='button'>
                            Cancel
                        </button>

                        <button className='btn btn-primary' type='submit'>
                            Save Changes
                        </button>
                    </Drawer.Footer>
                </Form>
            </Drawer>
        );
    }

    private renderSecurityActivities() {
        const { model } = this.props;
        return model.securityActivities.map(activity => {
            const id = `securityActivity['${activity.id}']`;
            const decorator = this.form.createInputDecorator({
                id,
                valueProperty: 'checked'
            });
            const input = decorator(<input className='checkbox' type='checkbox' />);
            const label = <label htmlFor={id}>{activity.activityName}</label>;
            return (
                <tr key={id}>
                    <td>
                        {input}
                        {label}
                    </td>
                    <td>{activity.description}</td>
                </tr>
            );
        });
    }
}

export default EditGroupDrawer;
