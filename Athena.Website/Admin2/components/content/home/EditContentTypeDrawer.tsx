import { action } from 'mobx';
import * as React from 'react';
import { IContentType } from '../../../stores/interfaces';
import { StoreProps, withStore } from '../../../stores/withStore';
import Drawer from '../../shared/drawer/drawer';
import Form from '../../shared/form2/Form';

interface FormData {
    name: string;
}

interface OwnProps extends StoreProps {
    entity: IContentType;
    onCancel: VoidFunction;
    onComplete: (entity: IContentType) => void;
    visible: boolean;
}

interface OwnState {
    busy: boolean;
}

class EditContentTypeDrawer extends React.Component<OwnProps, OwnState> {
    readonly form = new Form<FormData>();
    readonly state: OwnState = { busy: false };

    readonly NameInput = this.form.createInputDecorator({
        id: 'name',
        initialValue: () => this.props.entity && this.props.entity.name,
        rules: [{ required: true, message: 'Name is required' }]
    });

    componentDidUpdate(prev: OwnProps) {
        if (!prev.visible && this.props.visible) {
            this.form.reset();
        }
    }

    render() {
        const { entity, visible } = this.props;
        const title = entity && entity.id ? 'Edit content type' : 'Add content type';
        const { Form, Group } = this.form;
        return (
            <Drawer isOpen={visible} title={title}>
                <Form onSubmit={this.onSubmit}>
                    <Drawer.Body>
                        <Group label='Name'>{this.NameInput(<input className='form-control' />)}</Group>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <button
                            className='btn btn-default'
                            disabled={this.state.busy}
                            onClick={this.props.onCancel}
                            type='button'
                        >
                            Cancel
                        </button>

                        <button className='btn btn-primary' disabled={this.state.busy} type='submit'>
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

        const { data } = this.form.submit();
        this.setState({ busy: true });

        const content = this.props.store.content;
        const entity = this.props.entity;

        const result = this.props.entity.id
            ? await content.updateContentTypeAsync({ ...entity, name: data.name })
            : await content.createContentType({ name: data.name });

        this.props.onComplete(result);
        this.setState({ busy: false });
    }
}

export default withStore(EditContentTypeDrawer);
