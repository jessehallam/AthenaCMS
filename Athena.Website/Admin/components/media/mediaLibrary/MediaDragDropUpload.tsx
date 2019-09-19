import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { classList } from '../../../utility/classList';
import Application from '../../Application';

class DragDropUploadModel {
    @observable dragging: boolean = false;
    @observable uploading: boolean = false;

    @computed get active() {
        return this.dragging || this.uploading;
    }

    @action.bound
    async upload(files: FileList) {
        this.uploading = true;
        const contents = [];

        for (let i = 0; i < files.length; i++) {
            contents.push(await Application.tenant.media.uploadMediaAsync(files[i]));
        }
        this.uploading = false;
    }
}

interface OwnProps {}
interface OwnState {
    model: DragDropUploadModel;
}

const dropEvents = ['drop'];
const endEvents = ['dragleave', 'dragend', 'drop'];
const startEvents = ['dragover', 'dragenter'];
const suppressEvents = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];

@observer
export default class MediaDragDropUpload extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        model: new DragDropUploadModel()
    };

    private div: HTMLDivElement;

    get model() {
        return this.state.model;
    }

    componentDidMount() {
        suppressEvents.forEach(event => document.addEventListener(event, this.suppressEventHandler));
        startEvents.forEach(event => document.addEventListener(event, this.startHandler));
        endEvents.forEach(event => document.addEventListener(event, this.endHandler));
        dropEvents.forEach(event => document.addEventListener(event, this.dropHandler));
    }

    componentWillUnmount() {
        suppressEvents.forEach(event => document.removeEventListener(event, this.suppressEventHandler));
        startEvents.forEach(event => document.removeEventListener(event, this.startHandler));
        endEvents.forEach(event => document.removeEventListener(event, this.endHandler));
        dropEvents.forEach(event => document.removeEventListener(event, this.dropHandler));
    }

    render() {
        const classes = classList('dragDropUpload', this.model.active && 'dragDropUpload--active');
        const label = this.model.uploading ? 'Uploading... please wait' : 'Drop file to upload';
        return (
            <div className={classes} ref={div => (this.div = div)}>
                <form className='dragDropUpload__container' action='' method='post' encType='multipart/form-data'>
                    <div className='dragDropUpload__content'>
                        <i className='fas fa-file-download dragDropUpload__icon' />
                        <div className='dragDropUpload__label'>{label}</div>
                    </div>
                </form>
            </div>
        );
    }

    private dropHandler = (e: DragEvent) => {
        console.log('dropHandler');
        this.model.upload(e.dataTransfer.files);
    };

    private endHandler = (e: DragEvent) => {
        console.log('endHandler', e.target);
        if (e.target === this.div) {
            this.model.dragging = false;
        }
    };

    private startHandler = (e: DragEvent) => {
        //console.log('startHandler');
        this.model.dragging = true;
    };

    private suppressEventHandler = (e: DragEvent) => {
        //console.log('suppressEventHandler');
        e.preventDefault();
        e.stopPropagation();
    };
}
