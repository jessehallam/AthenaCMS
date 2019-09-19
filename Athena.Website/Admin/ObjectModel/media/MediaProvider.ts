import { Content } from '../content/Content';
import { IContent } from '../interfaces';
import Tenant from '../Tenant';

export default class MediaProvider {
    constructor(private readonly tenant: Tenant) {}

    async uploadMediaAsync(file: File): Promise<Content> {
        const client = await this.tenant.authentication.authenticateAsync();
        const data = new FormData();
        data.append('file', file);
        const response = await client.post<IContent>('/api/admin/media', data);
        return Content.fromObject(response.data);
    }
}
