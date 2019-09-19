import { ISecurityActivity, IUser, IUserGroup, IUserGroupCount } from './interfaces';
import { RootStore } from './RootStore';

export default class SecurityStore {
    constructor(private root: RootStore) {}

    async getSecurityActivitiesAsync(): Promise<ISecurityActivity[]> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.get<ISecurityActivity[]>('/api/admin/security/security-activity');
        return response.data;
    }

    async getUserGroupCountsAsync(): Promise<IUserGroupCount[]> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.get<IUserGroupCount[]>('/api/admin/security/group/counts');
        return response.data;
    }

    async getUserGroupsAsync(): Promise<IUserGroup[]> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.get<IUserGroup[]>('/api/admin/security/group');
        return response.data;
    }

    async getUsersAsync(): Promise<IUser[]> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.get<IUser[]>('/api/admin/security/user');
        return response.data;
    }
}
