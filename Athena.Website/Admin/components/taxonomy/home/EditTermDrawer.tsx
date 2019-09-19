import * as React from 'react';
import { ITaxonomy, ITerm } from '../../../ObjectModel/interfaces';
import { memoizeOne } from '../../../utility/memoize';
import Drawer from '../../shared/drawer/Drawer';
import Form from '../../shared/form/Form';

interface OwnProps {
    item: ITerm;
    onCancel: VoidFunction;
    show: boolean;
    taxonomy: ITaxonomy;
    terms: ITerm[];
}

interface OwnState {}

const memoizeParents = memoizeOne((all: ITerm[], current: ITerm) => {
    const choices: ITerm[] = [];

    choices.push({ id: null, name: '( None )', taxonomyId: null });

    all.forEach(term => {
        if (term.id !== current.id) {
            choices.push(term);
        }
    });

    return choices;
});

export default class EditTermDrawer extends React.Component<OwnProps, OwnState> {
    readonly form = new Form();

    readonly NameField = this.form.createInputDecorator({
        id: 'name',
        initialValue: '',
        label: 'Name',
        rules: [{ required: true, message: 'Name is required.' }]
    });

    readonly ParentField = this.form.createInputDecorator({
        id: 'parentId',
        initialValue: '',
        label: 'Parent'
    });

    componentDidUpdate(prev: OwnProps) {
        if (prev.item !== this.props.item) {
            const { item } = this.props;
            this.form.update({
                name: { initialValue: item.name },
                parent: { initialValue: item.parentId }
            });
            this.form.reset();
        }
    }

    render() {
        const { Form } = this.form;
        const title = this.props.item.id ? 'Edit Term' : 'Add Term';
        return (
            <Drawer isOpen={this.props.show} title={title}>
                <Form action=''>
                    <Drawer.Body>
                        {this.NameField(<input className='form-control' />)}
                        {this.renderParent()}
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

    private renderParent() {
        if (!this.props.taxonomy.isHierarchical) return null;
        const choices = memoizeParents(this.props.terms, this.props.item);
        const options = choices.map(choice => (
            <option key={choice.id || -1} value={choice.id}>
                {choice.name}
            </option>
        ));
        return this.ParentField(<select className='form-control'>{options}</select>);
    }
}
