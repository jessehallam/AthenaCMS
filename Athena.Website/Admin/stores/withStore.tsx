import * as React from 'react';
import { Subtract } from 'utility-types';
import { Consumer } from './provider';
import { RootStore } from './RootStore';

export interface StoreProps {
    store: RootStore;
}

export function withStore<P extends StoreProps>(Component: React.ComponentType<P>) {
    return function WithStore(props: Subtract<P, StoreProps>) {
        return <Consumer>{store => <Component {...(props as any)} store={store} />}</Consumer>;
    };
}
