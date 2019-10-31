import React = require('react');
import { action, reaction } from 'mobx';
import { observer } from 'mobx-react';
import Drawer from '../../shared/drawer/drawer';
import Form from '../../shared/form2/Form';
import { LoadingSpinner } from '../../shared/loading';
import EditContentTypeModel from './models/EditContentTypeModel';

interface FormProps {
    name: string;
}

interface OwnProps {
    model: EditContentTypeModel;
}

@observer
export default class EditContentType extends React.Component<OwnProps> {
    readonly form = new Form<FormProps>();
    readonly nameField = this.form.createInputDecorator({
        id: 'name',
        initialValue: () => this.props.model.target.name,
        rules: [{ required: true, message: 'Name is required.' }]
    });

    componentDidMount() {
        reaction(() => this.props.model.visible, () => this.form.reset());
    }

    render() {
        const model = this.props.model;
        const title = model.target.id ? 'Edit Content Type' : 'Add Content Type';

        const { Form, Group } = this.form;

        return (
            <Drawer canClose={true} isOpen={model.visible} onClose={this.onClose} title={title}>
                <Form onSubmit={this.onSubmit}>
                    <Drawer.Body>
                        <Group label='Name'>{this.nameField(<input className='form-control' />)}</Group>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <button
                            className='btn btn-default'
                            disabled={model.saving}
                            onClick={this.onClose}
                            type='button'
                        >
                            Cancel
                        </button>

                        <button className='btn btn-primary' disabled={model.saving} type='submit'>
                            <LoadingSpinner show={model.saving} />
                            Save Changes
                        </button>
                    </Drawer.Footer>
                </Form>
            </Drawer>
        );
    }

    @action.bound
    private onClose() {
        this.props.model.visible = false;
    }

    @action.bound
    private onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const { data } = this.form.submit();
        this.props.model.save(data);
    }
}
