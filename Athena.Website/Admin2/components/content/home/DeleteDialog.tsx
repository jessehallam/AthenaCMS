import { observer } from 'mobx-react';
import * as React from 'react';
import { IContentType } from '../../../stores/interfaces';
import Modal from '../../shared/modal/Modal';

interface OwnProps {
    entity: IContentType;
    onClose: VoidFunction;
    onConfirm: VoidFunction;
    visible: boolean;
}
interface OwnState {}

@observer
class DeleteDialog extends React.Component<OwnProps, OwnState> {
    render() {
        if (!this.props.entity) return null;
        return (
            <Modal backdrop='static' isOpen={this.props.visible} onClose={this.props.onClose}>
                <Modal.Header canClose={true} title='Delete content type' />
                <Modal.Body>
                    <p>
                        Really delete <strong>{this.props.entity.name}</strong>?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-default' type='button' data-dismiss='modal'>
                        Cancel
                    </button>

                    <button className='btn btn-danger' onClick={this.props.onConfirm} type='button'>
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DeleteDialog;
