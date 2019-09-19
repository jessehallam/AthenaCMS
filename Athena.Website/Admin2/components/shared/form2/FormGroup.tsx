import React = require('react');
import { observer } from 'mobx-react';
import { classList } from '../../../utility/classList';
import FormContext from './FormContext';
import FormInput_, { FormInputProps } from './FormInput';

export interface FormGroupProps {
    className?: string;
    label?: string;
    noValidate?: boolean;
    style?: React.CSSProperties;
}

@observer
class FormGroup extends React.Component<FormGroupProps & { form: FormContext }> {
    render() {
        const classes = classList('form-group', this.props.className);
        const input = this.findFormInput();

        if (!input) throw new Error('<FormGroup> must enclose a FormInput (created with createInputDecorator)!');

        const field = this.props.form.getField(input.props.config);
        const label = this.props.label && (
            <label className={classList(!field.valid ? 'text-danger' : '')} htmlFor={input.props.config.id}>
                {this.props.label}
            </label>
        );
        const validate = !this.props.noValidate && (
            <div className='form-group__validation'>
                <span className='form-group__error text-danger'>{!field.valid ? field.validationError : ''}</span>
            </div>
        );

        return (
            <div className={classes} style={this.props.style}>
                {label}
                {this.props.children}
                {validate}
            </div>
        );
    }

    private findFormInput(): React.ReactElement<FormInputProps> {
        const children = React.Children.toArray(this.props.children);
        for (let i = 0; i < children.length; i++) {
            const child = children[i] as React.ReactElement;
            if (child.type === FormInput_) {
                return child;
            }
        }
    }
}

export default function FormGroup_(props: FormGroupProps & { children: any }) {
    return <FormContext.Consumer>{form => <FormGroup {...props} form={form} />}</FormContext.Consumer>;
}
