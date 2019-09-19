import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../../../../ObjectModel/content/Content';
import { MediaDetailViewModel } from './viewModel';

interface OwnProps {
    content: Content;
    onPrevious: VoidFunction;
    onNext: VoidFunction;
    onClose: VoidFunction;
}

interface OwnState {
    viewModel: MediaDetailViewModel;
}

@observer
export default class MediaDetails extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        viewModel: null
    };

    render() {
        const { viewModel } = this.state;

        if (!viewModel || !this.props.content) {
            return null;
        }

        return (
            <div className='mediaDetails'>
                <div className='mediaDetails__container'>
                    <header className='mediaDetails__header'>
                        <h2 className='mediaDetails__title'>Attachment Details</h2>
                        <ul className='mediaDetails__toolbar'>
                            <li className='mediaDetails__toolbarButton' onClick={this.props.onPrevious}>
                                <i className='fas fa-angle-left' />
                            </li>
                            <li className='mediaDetails__toolbarButton' onClick={this.props.onNext}>
                                <i className='fas fa-angle-right' />
                            </li>
                            <li className='mediaDetails__toolbarButton' onClick={this.props.onClose}>
                                <i className='fas fa-times' />
                            </li>
                        </ul>
                    </header>
                    <div className='mediaDetails__body'>
                        <div className='mediaDetails__imageWrapper'>
                            <div className='mediaDetails__absoluteImageContainer'>
                                <img className='mediaDetails__image' src={viewModel.src} />
                            </div>
                        </div>
                        <div className='mediaDetails__metaWrapper'>
                            <ul className='mediaDetails__staticInfo'>{this.renderStaticInfo()}</ul>
                            <form className='mediaDetails__form'>
                                <div className='mediaDetails__formBody'>
                                    <div className='mediaDetails__formGroup'>
                                        <label className='mediaDetails__formLabel' htmlFor='altText'>
                                            Alternative Text
                                        </label>
                                        <input
                                            className='form-control'
                                            id='altText'
                                            onChange={e => (viewModel.altText = e.target.value)}
                                            type='text'
                                            value={viewModel.altText}
                                        />
                                    </div>
                                    <div className='mediaDetails__formGroup'>
                                        <label className='mediaDetails__formLabel' htmlFor='title'>
                                            Title
                                        </label>
                                        <input
                                            className='form-control'
                                            id='title'
                                            onChange={e => (viewModel.title = e.target.value)}
                                            type='text'
                                            value={viewModel.title}
                                        />
                                    </div>
                                    <div className='mediaDetails__formGroup'>
                                        <label className='mediaDetails__formLabel' htmlFor='caption'>
                                            Caption
                                        </label>
                                        <textarea
                                            className='form-control'
                                            id='caption'
                                            onChange={e => (viewModel.caption = e.target.value)}
                                            rows={3}
                                            value={viewModel.caption}
                                        />
                                    </div>
                                    <div className='mediaDetails__formGroup'>
                                        <label className='mediaDetails__formLabel' htmlFor='desc'>
                                            Description
                                        </label>
                                        <textarea
                                            className='form-control'
                                            id='desc'
                                            onChange={e => (viewModel.description = e.target.value)}
                                            rows={3}
                                            value={viewModel.description}
                                        />
                                    </div>
                                </div>
                                <div className='mediaDetails__formFooter'>
                                    <div>
                                        <Link to={viewModel.editorUri}>Edit more details</Link>
                                        {' | '}
                                        <a className='text-danger' href='#'>
                                            Delete permanently
                                        </a>
                                    </div>
                                    <button className='btn btn-primary' onClick={this.onSaveChanges} type='button'>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    @action.bound
    private onSaveChanges() {
        this.state.viewModel.saveChangesAsync();
    }

    private renderStaticInfo() {
        const { viewModel } = this.state;

        return [
            <li key='filename'>
                <strong>File name:</strong> {viewModel.fileName}
            </li>,
            <li key='filetype'>
                <strong>File type:</strong> {viewModel.contentType}
            </li>,
            <li key='uploaddate'>
                <strong>Uploaded on:</strong> {viewModel.createdAt}
            </li>,
            <li key='filesize'>
                <strong>File size:</strong> {viewModel.size}
            </li>,
            <li key='uploadedby'>
                <strong>Uploaded by:</strong> {viewModel.uploadedBy}
            </li>,
            <li key='url'>
                <strong>URL:</strong> {viewModel.url}
            </li>
        ];
    }

    static getDerivedStateFromProps(props: OwnProps, state: OwnState): Partial<OwnState> {
        // not interested in computing state if content isn't specified.
        if (!props.content) return null;
        // not interested in computed state if content hasn't changed.
        if (state.viewModel && state.viewModel.isEqual(props.content)) return null;
        // create a view model over the content object.
        return {
            viewModel: new MediaDetailViewModel(props.content)
        };
    }
}
