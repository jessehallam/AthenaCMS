import { observer } from 'mobx-react';
import * as React from 'react';
import FormContext from './FormContext';
import FormGroup from './FormGroup';
import FormInput from './FormInput';
import { ValidationRule } from './validation';

export interface InputConfig {
    id: string;
    initialValue?: any;
    onChange?: (event: any) => any;
    onChangeProperty?: string;
    rules?: ValidationRule[];
    valueProperty?: string;
}

export interface InputGroupProps {
    label?: string;
}

export interface FormResult<TModel> {
    data: TModel;
    valid: boolean;
}

export default class Form<TModel extends object = any> {
    private readonly context = new FormContext();

    readonly Form: React.ComponentType<React.ComponentProps<'form'>>;
    readonly Group = FormGroup;

    constructor() {
        const that = this;
        this.Form = observer(
            class Form extends React.Component<React.ComponentProps<'form'>> {
                readonly formContext = that.context;

                render() {
                    return (
                        <FormContext.Provider value={this.formContext}>
                            <form {...this.props} onSubmit={this.onSubmit} />
                        </FormContext.Provider>
                    );
                }

                private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                    if (!this.formContext.validate()) {
                        event.preventDefault();
                        event.stopPropagation();
                        return;
                    }
                    if (this.props.onSubmit) this.props.onSubmit(event);
                };
            }
        );
    }

    createInputDecorator(config: InputConfig) {
        return (content: JSX.Element) => {
            return (
                <FormInput config={config} key={config.id}>
                    {content}
                </FormInput>
            );
        };
    }

    reset() {
        this.context.reset();
    }

    submit(): FormResult<TModel> {
        return this.context.submit();
    }
}
