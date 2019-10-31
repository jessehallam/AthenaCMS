import { observer } from 'mobx-react';
import * as React from 'react';
import { classList } from '../../../utility/classList';
import { withForm, WithFormProps } from './context';
import { Control } from './Control';
import { ValidationRule } from './validation';

export interface InputConfig<TOnChange = any> {
    id: string | string[];
    initialValue?: any;
    label: string;
    onChange?: (arg: TOnChange) => any;
    rules?: ValidationRule[];
    valueProperty?: string;
}

export interface InputProps extends WithFormProps {
    control: Control;
    element: JSX.Element;
}

interface OwnState {}

@observer
class Input extends React.Component<InputProps, OwnState> {
    get id() {
        const config = this.props.control.config;
        return typeof config.id === 'string' ? config.id : config.id.join('.');
    }

    render() {
        const { control } = this.props;
        const { config } = control;
        return (
            <div className='form-group'>
                <label htmlFor={this.id}>{config.label}</label>
                {this.renderElement()}
                <div className='form-group__validation'>
                    <span className='form-group__error text-danger'>{control.error}</span>
                </div>
            </div>
        );
    }

    private renderElement() {
        const { control, element } = this.props;
        const { config } = control;

        return React.createElement(element.type, {
            ...element.props,
            className: classList(!control.isValid && 'is-invalid', element.props.className),
            id: this.id,
            onChange: event => {
                control.value = event.target[config.valueProperty ? config.valueProperty : 'value'];
            },
            [config.valueProperty ? config.valueProperty : 'value']: control.value === void 0 ? '' : control.value
        });
    }
}

export default withForm(Input);
