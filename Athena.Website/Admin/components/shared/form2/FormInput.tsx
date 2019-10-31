import React = require('react');
import { observer } from 'mobx-react';
import { classList } from '../../../utility/classList';
import { InputConfig } from './Form';
import FormContext, { FieldContext } from './FormContext';

export interface FormInputProps {
    config: InputConfig;
}

@observer
class FormInput extends React.Component<FormInputProps & { form: FormContext }> {
    private fieldContext: FieldContext;

    constructor(props: any) {
        super(props);
        this.fieldContext = this.props.form.getField(this.props.config);
        this.fieldContext.reset();
    }

    componentDidUpdate(prev: FormInputProps) {
        if (prev.config !== this.props.config)
            console.warn('FormInput.props.config has changed; this is an unsupported action.');
    }

    componentWillUnmount() {
        this.props.form.unregisterField(this.fieldContext);
    }

    render() {
        const { config, form } = this.props;
        const content = this.props.children as React.ReactElement;
        const className = classList(content.props.className, this.fieldContext.valid ? null : 'is-invalid');

        return React.cloneElement(content, {
            className: className,
            id: config.id,
            [config.onChangeProperty || 'onChange']: (event: any) => {
                const value = config.onChange ? config.onChange(event) : event.target[config.valueProperty || 'value'];
                this.fieldContext.value = value;
            },
            [config.valueProperty || 'value']: this.fieldContext.value
        });
    }
}

export default function FormInput_(props: FormInputProps & { children: any }) {
    return <FormContext.Consumer>{form => <FormInput {...props} form={form} />}</FormContext.Consumer>;
}
