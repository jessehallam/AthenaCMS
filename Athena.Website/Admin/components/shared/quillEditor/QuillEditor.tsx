import * as React from 'react';
import toolbar from './toolbar';

interface OwnProps {}
interface OwnState {}

declare var Quill: any;

export default class QuillEditor extends React.Component<OwnProps, OwnState> {
    div: HTMLDivElement;
    quill: any;
    toolbar: any;

    componentDidMount() {
        this.quill = new Quill(this.div, {
            modules: {
                toolbar
            },
            theme: 'snow'
        });

        this.toolbar = this.quill.getModule('toolbar');
        this.toolbar.addHandler('image', this.showImageUI.bind(this));
    }

    render() {
        return (
            <div className='quillEditor'>
                <div className='quillEditor__editor' ref={div => (this.div = div)} />
            </div>
        );
    }

    private showImageUI() {}
}
