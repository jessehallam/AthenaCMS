import { action } from 'mobx';
import * as React from 'react';
import { IContentType } from '../../../ObjectModel/interfaces';
import notify from '../../../utility/notify';
import Application from '../../Application';
import { Busy } from '../../shared/Busy';
import Drawer from '../../shared/drawer/Drawer';
import Form from '../../shared/form/Form';

interface AddContentTypeForm {
    name: string;
}

interface OwnProps {
    isOpen: boolean;
    onCancel: VoidFunction;
    onComplete: (contentType: IContentType) => void;
}

interface OwnState {
    busy: boolean;
}

export default class AddContentType extends React.Component<OwnProps, OwnState> {
    readonly form = new Form<AddContentTypeForm>();
    readonly state: OwnState = { busy: false };

    readonly NameField = this.form.createInputDecorator({
        id: 'name',
        label: 'Name',
        rules: [{ required: true, message: 'Name is required.' }]
    });

    componentDidUpdate(prevProps: OwnProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.form.reset();
        }
    }

    render() {
        const { Form } = this.form;
        return (
            <Drawer canClose={true} isOpen={this.props.isOpen} style={{ width: 500 }} title='Add Content Type'>
                <Form action='' method='post' onSubmit={this.onSubmit}>
                    <Drawer.Body>{this.NameField(<input />)}</Drawer.Body>
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
                            <Busy busy={this.state.busy}>Save Changes</Busy>
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
        const form = this.form.submit();
        this.setState({ busy: true });
        try {
            const contentType = await Application.tenant.content.createContentType(form.data.name);
            notify.success('Content type created.');
            this.props.onComplete(contentType);
        } catch (err) {
            notify.error('Error creating content type.');
        } finally {
            this.setState({ busy: false });
        }
    }
}
