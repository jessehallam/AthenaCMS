import * as React from 'react';
import { Subtract } from 'utility-types';
import { WidgetModel } from './model';

const context = React.createContext<WidgetModel>(null);

export const WidgetConsumer = context.Consumer;
export const WidgetProvider = context.Provider;

export interface WidgetProps<TOptions = any> {
    model: WidgetModel<TOptions>;
}

export function withWidget<P extends WidgetProps>(Component: React.ComponentType<P>) {
    return function(props: Subtract<P, WidgetProps>) {
        return <WidgetConsumer>{model => <Component {...(props as any)} model={model} />}</WidgetConsumer>;
    };
}
