import * as React from 'react';
import { Subtract } from 'utility-types';
import Form from './Form';

export const FormContext = React.createContext<Form>(null);

export interface WithFormProps {
    form: Form;
}

export const withForm = <P extends WithFormProps>(Component: React.ComponentType<P>) =>
    class WithFormComponent extends React.Component<Subtract<P, WithFormProps>> {
        render() {
            return (
                <FormContext.Consumer>
                    {form => <Component {...(this.props as any)} form={form} />}
                </FormContext.Consumer>
            );
        }
    };
