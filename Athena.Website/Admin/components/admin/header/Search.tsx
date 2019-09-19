import * as React from 'react';

interface OwnProps {}
interface OwnState {}

export default class Search extends React.Component<OwnProps, OwnState> {
    render() {
        return (
            <div className='adminHeaderPart__searchWrapper'>
                <div className='input-group'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>
                            <i className='fas fa-search' />
                        </span>
                    </div>

                    <input className='form-control' type='text' />
                </div>
            </div>
        );
    }
}
