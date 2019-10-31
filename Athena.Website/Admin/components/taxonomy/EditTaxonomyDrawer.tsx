import { action, reaction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import Drawer from '../shared/drawer/drawer';
import Form from '../shared/form/Form';
import { EditTaxonomyModel } from './TaxonomyModel';

interface FormData {
    name: string;
}

interface OwnProps {
    model: EditTaxonomyModel;
}
interface OwnState {}

@observer
export default class EditTaxonomyDrawer extends React.Component<OwnProps, OwnState> {
    readonly form = new Form<FormData>();

    readonly NameField = this.form.createInputDecorator({
        id: 'name',
        initialValue: '',
        label: 'Name',
        rules: [{ required: true, message: 'Name is required.' }]
    });

    readonly AllowMultipleField = this.form.createInputDecorator({
        id: 'allowMultiple',
        initialValue: false,
        label: 'Allow Multiple?',
        valueProperty: 'checked'
    });

    readonly IsHierarchicalFIeld = this.form.createInputDecorator({
        id: 'isHierarchical',
        initialValue: false,
        label: 'Is Hierarchical?',
        valueProperty: 'checked'
    });

    componentDidMount() {
        reaction(
            () => this.props.model.visible,
            visible => {
                if (visible) {
                    this.form.update({
                        name: { initialValue: this.props.model.taxonomy.name }
                    });
                    this.form.reset();
                }
            }
        );
    }

    render() {
        const { model } = this.props;
        const { Form } = this.form;
        return (
            <Drawer isOpen={model.visible} onClose={this.onClose} title='Edit Taxonomy'>
                <Form>
                    <Drawer.Body>
                        {this.NameField(<input className='form-control' />)}
                        <div className='row'>
                            <div className='col-4'>{this.AllowMultipleField(<input type='checkbox' />)}</div>
                            <div className='col-4'>{this.IsHierarchicalFIeld(<input type='checkbox' />)}</div>
                        </div>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <button className='btn btn-default' onClick={this.onClose} type='button'>
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

    @action.bound
    private onClose() {
        this.props.model.visible = false;
    }
}
