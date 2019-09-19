import { DashboardStore } from './dashboard/dashboardStore';

export class RootStore {
    readonly dashboard = new DashboardStore(this);
}

const store = new RootStore();
window['ROOT'] = store;

export default store;
