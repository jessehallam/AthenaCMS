import { action } from 'mobx';
import * as React from 'react';
import { ITaxonomy } from '../../../ObjectModel/interfaces';
import notify from '../../../utility/notify';
import Application from '../../Application';
import Drawer from '../../shared/drawer/Drawer';
import Form from '../../shared/form/Form';

interface FormModel {
    allowMultiple: boolean;
    isHierarchical: boolean;
    name: string;
}

interface OwnProps {
    isOpen: boolean;
    onCancel: VoidFunction;
    onComplete: (taxonomy: ITaxonomy) => void;
    taxonomy: ITaxonomy;
}

interface OwnState {}

class EditTaxonomyDrawer extends React.Component<OwnProps, OwnState> {
    readonly form = new Form<FormModel>();
    readonly state: OwnState = {
        isOpen: false,
        taxonomy: null
    };

    readonly AllowMultipleField = this.form.createInputDecorator({
        id: 'allowMultiple',
        initialValue: true,
        label: 'Allow Multiple?',
        valueProperty: 'checked'
    });

    readonly IsHierarchicalField = this.form.createInputDecorator({
        id: 'isHierarchical',
        initialValue: false,
        label: 'Is Hierarchical?',
        valueProperty: 'checked'
    });

    readonly NameField = this.form.createInputDecorator({
        id: 'name',
        initialValue: '',
        label: 'Name',
        rules: [{ required: true, message: 'Name is required.' }]
    });

    componentDidUpdate(prevProps: OwnProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            const { taxonomy } = this.props;
            this.form.update({
                allowMultiple: { initialValue: taxonomy.allowMultiple },
                isHierarchical: { initialValue: taxonomy.isHierarchical },
                name: { initialValue: taxonomy.name }
            });
            this.form.reset();
        }
    }

    render() {
        const { Form } = this.form;
        const title = this.props.taxonomy && this.props.taxonomy.id ? 'Edit Taxonomy' : 'Add Taxonomy';
        return (
            <Drawer isOpen={this.props.isOpen} title={title}>
                <Form action='' onSubmit={this.onSubmit}>
                    <Drawer.Body>
                        {this.NameField(<input className='form-control' />)}
                        <div className='row'>
                            <div className='col-4'>{this.AllowMultipleField(<input type='checkbox' />)}</div>
                            <div className='col'>{this.IsHierarchicalField(<input type='checkbox' />)}</div>
                        </div>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <button className='btn btn-default' onClick={this.props.onCancel} type='button'>
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
    private async onSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        const { data } = this.form.submit();
        const payload = {
            ...this.props.taxonomy,
            ...data
        };
        let promise: Promise<ITaxonomy> = this.props.taxonomy.id
            ? Application.tenant.taxonomies.updateTaxonomyAsync(payload)
            : Application.tenant.taxonomies.createTaxonomyAsync(payload);

        try {
            this.props.onComplete(await promise);
            notify.success('Taxonomy saved successfully.');
        } catch (err) {
            console.error(err);
            notify.error('Error saving taxonomy.');
        }
    }
}

export default EditTaxonomyDrawer;
