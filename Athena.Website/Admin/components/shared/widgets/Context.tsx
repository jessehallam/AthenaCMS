import * as React from 'react';
import { Subtract } from 'utility-types';
import { ContentEditorModel } from '../../content/contentEditor/model';

const context = React.createContext<WithWidgetProps>(null);

export interface WithWidgetProps<TArgs = any> {
    args: TArgs;
    editor: ContentEditorModel;
    widget: string;
}

export const Provider = context.Provider;

export function withWidget<P extends WithWidgetProps>(Component: React.ComponentType<P>) {
    return function WithWidgetComponent(props: Subtract<P, WithWidgetProps>) {
        return <context.Consumer>{model => <Component {...(props as P)} {...model} />}</context.Consumer>;
    };
}
