import { ITaxonomy, ITaxonomyCount, ITerm, ITermCount } from '../interfaces';
import Tenant from '../Tenant';

export default class TaxonomyProvider {
    constructor(private readonly tenant: Tenant) {}

    async createTaxonomyAsync(taxonomy: ITaxonomy): Promise<ITaxonomy> {
        const client = await this.tenant.authentication.authenticateAsync();
        const response = await client.post<ITaxonomy>('/api/taxonomy', taxonomy);
        return response.data;
    }

    async getTaxonomiesAsync(): Promise<ITaxonomy[]> {
        const response = await this.tenant.requester.get<ITaxonomy[]>('/api/taxonomy');
        return response.data;
    }

    async getTaxonomyCountsAsnyc(): Promise<ITaxonomyCount[]> {
        const response = await this.tenant.requester.get('/api/taxonomy/counts');
        return response.data;
    }

    async getTermCountsAsnyc(): Promise<ITermCount[]> {
        const response = await this.tenant.requester.get('/api/term/counts');
        return response.data;
    }

    async getTermsAsync(taxonomyId: number): Promise<ITerm[]> {
        const response = await this.tenant.requester.get<ITerm[]>('/api/term', { typeId: taxonomyId });
        return response.data;
    }

    async updateTaxonomyAsync(taxonomy: ITaxonomy): Promise<ITaxonomy> {
        const client = await this.tenant.authentication.authenticateAsync();
        const response = await client.put<ITaxonomy>('/api/taxonomy', taxonomy);
        return response.data;
    }
}
