import { action, IObservableArray, observable, runInAction } from 'mobx';
import { ISecurityActivity, IUser, IUserGroupCount } from '../../stores/interfaces';
import { RootStore } from '../../stores/RootStore';

export class EditGroupModel {
    @observable
    group: IUserGroupCount;

    @observable
    visible: boolean = false;

    @action.bound
    changeTo(group: IUserGroupCount) {
        this.group = group;
        this.visible = true;
    }
}

export default class SecurityModel {
    constructor(private store: RootStore) {}

    @observable
    editGroup = new EditGroupModel();

    @observable
    securityActivities: IObservableArray<ISecurityActivity> = observable.array();

    @observable
    userGroups: IObservableArray<IUserGroupCount> = observable.array();

    @observable
    users: IObservableArray<IUser> = observable.array();

    @action.bound
    async load() {
        const securityActivities = await this.store.security.getSecurityActivitiesAsync();
        const userGroups = await this.store.security.getUserGroupCountsAsync();
        const users = await this.store.security.getUsersAsync();

        runInAction(() => {
            this.securityActivities.replace(securityActivities);
            this.userGroups.replace(userGroups);
            this.users.replace(users);
        });
    }
}
