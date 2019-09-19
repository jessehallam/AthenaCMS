import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

interface OwnProps {
    onAddItem: (name: string, value: string) => void;
}

interface OwnState {
    form: { name: string; value: string };
}

@observer
export default class AddPartial extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        form: observable.object({ name: '', value: '' })
    };

    render() {
        return (
            <div className='widgetMeta__addNew'>
                <label className='wigdetMeta__addNewLabel'>
                    <strong>Add New Custom Field:</strong>
                </label>

                <div className='widgetMeta__metaWrapper'>
                    <div className='widgetMeta__nameWrapper'>
                        <div className='input-group'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>Name</span>
                            </div>
                            <input
                                className='form-control'
                                onChange={e => (this.state.form.name = e.target.value)}
                                type='text'
                                value={this.state.form.name}
                            />
                        </div>
                    </div>

                    <div className='widgetMeta__valueWrapper'>
                        <div className='input-group'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>Value</span>
                            </div>
                            <input
                                className='form-control'
                                onChange={e => (this.state.form.value = e.target.value)}
                                type='text'
                                value={this.state.form.value}
                            />
                        </div>
                    </div>
                </div>

                <div className='widgetMeta__addActions'>
                    <button className='btn btn-primary' onClick={this.onSubmit} type='button'>
                        Add Custom Field
                    </button>
                </div>
            </div>
        );
    }

    @action.bound
    private onSubmit() {
        this.props.onAddItem(this.state.form.name, this.state.form.value);
        this.state.form.name = '';
        this.state.form.value = '';
    }
}
