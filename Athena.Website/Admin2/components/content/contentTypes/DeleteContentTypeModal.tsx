import { action } from 'mobx';
import { observer } from 'mobx-react';
import { StoreProps, withStore } from '../../../stores/withStore';
import Modal from '../../shared/modal/Modal';
import DeleteContentTypeModel from './models/DeleteContentTypeModel';

interface OwnProps extends StoreProps {
    model: DeleteContentTypeModel;
}

@observer
class DeleteContentTypeModal extends React.Component<OwnProps> {
    render() {
        const model = this.props.model;

        return (
            <Modal isOpen={model.visible} onClose={this.onClose}>
                <Modal.Header canClose={true} title='Delete Content Type?' />
                <Modal.Body>
                    <p>
                        Really delete <strong>{model.target.name}?</strong>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-default' data-dismiss='modal' type='button'>
                        Cancel
                    </button>

                    <button className='btn btn-danger' onClick={model.confirm} type='button'>
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }

    @action.bound
    private onClose() {
        this.props.model.visible = false;
    }
}

export default withStore(DeleteContentTypeModal);
