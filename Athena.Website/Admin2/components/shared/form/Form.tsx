import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as React from 'react';
import { FormContext } from './context';
import { Control } from './Control';
import Input, { InputConfig } from './Input';

export type ValidationResult = true | Record<string, string>;
export type InputDecorator = (jsx: JSX.Element) => JSX.Element;

export interface IFormResult<T> {
    data: T;
    valid: boolean;
    validationErrors: Record<string, string>;
}

export default class Form<T extends {} = any> {
    private controls: Control[] = [];

    readonly Form: React.ComponentType<React.ComponentProps<'form'>>;

    constructor() {
        const that = this;
        this.Form = observer(
            class Form extends React.Component<React.ComponentProps<'form'>> {
                componentDidMount() {
                    that.reset();
                }

                render() {
                    return (
                        <FormContext.Provider value={that}>
                            <form {...this.props} onSubmit={this.onSubmit} />
                        </FormContext.Provider>
                    );
                }

                private onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                    const validation = that.validate();
                    if (validation === true) {
                        if (this.props.onSubmit) this.props.onSubmit(e);
                    } else {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                };
            }
        );
    }

    createInputDecorator(config: InputConfig): InputDecorator {
        const control = new Control(config);
        this.controls.push(control);
        return (jsx: JSX.Element): JSX.Element => <Input control={control} element={jsx} />;
    }

    @action.bound
    reset() {
        this.controls.forEach(control => control.reset());
    }

    @action.bound
    submit(): IFormResult<T> {
        const validation = this.validate();
        let data: any = {};

        this.controls.forEach(control => {
            const path = typeof control.config.id === 'string' ? [control.config.id] : control.config.id;
            const lens = R.lensPath(path);
            data = R.set(lens, control.value, data);
        });
        return {
            data,
            valid: validation === true,
            validationErrors: validation === true ? {} : validation
        };
    }

    @action.bound
    update(options: Partial<Record<keyof T, Partial<InputConfig>>>) {
        this.controls.forEach(control => {
            if (options[control.config.id]) {
                control.config = {
                    ...control.config,
                    ...options[control.config.id]
                };
            }
        });
    }

    @action.bound
    validate(): ValidationResult {
        const errors: Record<string, string> = {};
        let valid = true;
        this.controls.forEach(control => {
            control.validate();
            if (!control.isValid) {
                valid = false;
                errors[control.config.id] = control.error;
            }
        });
        return valid ? true : errors;
    }
}
