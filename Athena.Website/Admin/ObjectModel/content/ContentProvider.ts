import { IContent, IContentCount, IContentType } from '../interfaces';
import Tenant from '../Tenant';
import { Content } from './Content';

export default class ContentProvider {
    constructor(private readonly tenant: Tenant) {}

    async createContentType(name: string): Promise<IContentType> {
        const client = await this.tenant.authentication.authenticateAsync();
        const response = await client.post<IContentType>('/api/content-type', { name });
        return response.data;
    }

    async getAsync(id: number): Promise<Content> {
        const client = await this.tenant.authentication.authenticateAsync();
        const response = await client.get<IContent>('/api/admin/content/' + id);
        return Content.fromObject(response.data);
    }

    async getContentCountsAsync(): Promise<IContentCount[]> {
        const client = await this.tenant.authentication.authenticateAsync();
        const response = await client.get<IContentCount[]>('/api/content/counts');
        return response.data;
    }

    async getByContentTypeAsync(typeId: number): Promise<Content[]> {
        const client = await this.tenant.authentication.authenticateAsync();
        const response = await client.get<IContent[]>('/api/admin/content/by-type/' + typeId);
        return response.data.map(Content.fromObject);
    }

    async getContentTypeByNameAsync(name: string): Promise<IContentType> {
        const response = await this.tenant.requester.get<IContentType>('/api/content-type/by-name/' + name);
        return response.data;
    }

    async getContentTypesAsync(): Promise<IContentType[]> {
        const client = await this.tenant.authentication.authenticateAsync();
        const response = await client.get<IContentType[]>('/api/content-type');
        return response.data;
    }
}
