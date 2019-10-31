import { createContext } from 'react';
import { RootStore } from './RootStore';

const context = createContext<RootStore>(null);
const { Consumer, Provider } = context;

export { Consumer, Provider };
