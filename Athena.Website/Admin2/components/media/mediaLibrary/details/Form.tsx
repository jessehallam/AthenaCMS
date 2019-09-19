import { observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { MediaDetailsProps } from './MediaDetails';

interface OwnProps extends MediaDetailsProps {}
interface OwnState {}

@observer
export default class Form extends React.Component<OwnProps, OwnState> {
    render() {
        const { model } = this.props;
        const { form } = model;

        return (
            <form className='mediaDetails__form'>
                <div className='mediaDetails__formBody'>
                    <div className='mediaDetails__formGroup'>
                        <label className='mediaDetails__formLabel' htmlFor='altText'>
                            Alternative Text
                        </label>
                        <input
                            className='form-control'
                            id='altText'
                            onChange={e => (form.altText = e.target.value)}
                            type='text'
                            value={form.altText}
                        />
                    </div>
                    <div className='mediaDetails__formGroup'>
                        <label className='mediaDetails__formLabel' htmlFor='title'>
                            Title
                        </label>
                        <input
                            className='form-control'
                            id='title'
                            onChange={e => (form.title = e.target.value)}
                            type='text'
                            value={form.title}
                        />
                    </div>
                    <div className='mediaDetails__formGroup'>
                        <label className='mediaDetails__formLabel' htmlFor='caption'>
                            Caption
                        </label>
                        <textarea
                            className='form-control'
                            id='caption'
                            onChange={e => (form.caption = e.target.value)}
                            rows={3}
                            value={form.caption}
                        />
                    </div>
                    <div className='mediaDetails__formGroup'>
                        <label className='mediaDetails__formLabel' htmlFor='desc'>
                            Description
                        </label>
                        <textarea
                            className='form-control'
                            id='desc'
                            onChange={e => (form.description = e.target.value)}
                            rows={3}
                            value={form.description}
                        />
                    </div>
                </div>
                <div className='mediaDetails__formFooter'>
                    <div>
                        <Link to={model.editUrl}>Edit more details</Link>
                        {' | '}
                        <a className='text-danger' href='#'>
                            Delete permanently
                        </a>
                    </div>
                    <button
                        className='btn btn-primary'
                        disabled={model.saving}
                        onClick={() => model.save()}
                        type='button'
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        );
    }
}
