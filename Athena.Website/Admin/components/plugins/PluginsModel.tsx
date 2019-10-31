import { IObservableArray, observable, runInAction } from 'mobx';
import { IPlugin } from '../../stores/interfaces';
import { RootStore } from '../../stores/RootStore';

export default class PluginsModel {
    constructor(private store: RootStore) {}

    @observable
    plugins: IObservableArray<IPlugin> = observable.array();

    async load() {
        const plugins = await this.store.admin.getPluginsAsync();

        runInAction(() => this.plugins.replace(plugins));
    }
}
