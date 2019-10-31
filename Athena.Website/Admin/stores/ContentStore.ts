import { IContent, IContentCount, IContentType } from './interfaces';
import { RootStore } from './RootStore';

export default class ContentStore {
    constructor(private readonly root: RootStore) {}

    async createContentType(contentType: IContentType): Promise<IContentType> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.post<IContentType>('/api/content-type', contentType);
        return response.data;
    }

    async deleteContentTypeAsync(id: number): Promise<void> {
        const client = await this.root.authentication.authenticateAsync();
        await client.delete('/api/content-type/' + id);
    }

    async getContentById(id: number): Promise<IContent> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.get<IContent>('/api/admin/content/' + id);
        return response.data;
    }

    async getContentByType(type: number): Promise<IContent[]> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.get<IContent[]>('/api/admin/content/by-type/' + type);
        return response.data;
    }

    async getContentTypeByNameAsync(name: string): Promise<IContentType> {
        const response = await this.root.client.get<IContentType>('/api/content-type/by-name/' + name);
        return response.data;
    }

    async getContentTypesAsync(): Promise<IContentType[]> {
        const response = await this.root.client.get<IContentType[]>('/api/content-type');
        return response.data;
    }

    async getContentCountsAsync(): Promise<IContentCount[]> {
        const response = await this.root.client.get<IContentCount[]>('/api/content/counts');
        return response.data;
    }

    async updateContentAsync(content: IContent): Promise<IContent> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.put<IContent>('/api/admin/content', content);
        return response.data;
    }

    async updateContentTypeAsync(contentType: IContentType): Promise<IContentType> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.put<IContentType>('/api/content-type', contentType);
        return response.data;
    }
}
