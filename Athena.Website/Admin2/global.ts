import { RootStore } from './stores/RootStore';

export const store = new RootStore();

window[Symbol.for('__athena_store__')] = store;
