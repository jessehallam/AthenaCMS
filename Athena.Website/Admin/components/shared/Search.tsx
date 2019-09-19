import { action } from 'mobx';
import * as React from 'react';
import { classList } from '../../utility/classList';

interface OwnProps {
    className?: string;
    onChange?: (value: string) => void;
    value?: string;
}
interface OwnState {}

export default class Search extends React.Component<OwnProps, OwnState> {
    private input: HTMLInputElement;

    render() {
        return (
            <div className={classList('search', this.props.className)} onClick={this.onClick}>
                <div className='search__wrapper'>
                    <div className='input-group'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>
                                <i className='fas fa-search' />
                            </span>
                        </div>

                        <input
                            className='form-control'
                            onChange={this.onChange}
                            ref={input => (this.input = input)}
                            type='text'
                            value={this.props.value}
                        />
                    </div>
                </div>
            </div>
        );
    }

    @action.bound
    private onChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    @action.bound
    private onClick() {
        this.input.focus();
    }
}
