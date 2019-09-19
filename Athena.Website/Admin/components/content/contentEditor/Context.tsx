import * as React from 'react';
import { Subtract } from 'utility-types';
import { ContentEditorModel } from './model';

const context = React.createContext<ContentEditorModel>(null);

export interface WithEditorProps {
    editor: ContentEditorModel;
}

export const Provider = context.Provider;

export function withEditor<P extends WithEditorProps>(Component: React.ComponentType<P>) {
    return function WithEditorComponent(props: Subtract<P, WithEditorProps>) {
        return <context.Consumer>{model => <Component {...(props as P)} editor={model} />}</context.Consumer>;
    };
}
