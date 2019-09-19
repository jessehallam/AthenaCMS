import { observable } from 'mobx';
import { IPlugin } from './interfaces';
import { RootStore } from './RootStore';

export interface INavItem {
    label: React.ReactNode;
    url: string;
}

export class AdminStore {
    @observable
    readonly navItems: INavItem[] = [];

    @observable
    readonly routes: JSX.Element[] = [];

    @observable
    readonly widgets: Map<string, React.ComponentType> = observable.map();

    constructor(private root: RootStore) {}

    async getPluginsAsync(): Promise<IPlugin[]> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.get<IPlugin[]>('/api/admin/plugin');
        return response.data;
    }
}
