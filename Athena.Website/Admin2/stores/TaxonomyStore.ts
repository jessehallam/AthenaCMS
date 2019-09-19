import { ITaxonomy, ITerm } from './interfaces';
import { RootStore } from './RootStore';

export interface ITaxonomyCount {
    count: number;
    id: number;
    name: string;
}

export default class TaxonomyStore {
    constructor(private readonly root: RootStore) {}

    async createTerm(term: ITerm): Promise<ITerm> {
        const client = await this.root.authentication.authenticateAsync();
        const response = await client.post<ITerm>('/api/term', term);
        return response.data;
    }

    async getTaxonomies(): Promise<ITaxonomy[]> {
        const response = await this.root.client.get<ITaxonomy[]>('/api/taxonomy');
        return response.data;
    }

    async getTaxonomyCounts(): Promise<ITaxonomyCount[]> {
        const response = await this.root.client.get<ITaxonomyCount[]>('/api/taxonomy/counts');
        return response.data;
    }

    async getTerms(typeId: number): Promise<ITerm[]> {
        const response = await this.root.client.get<ITerm[]>('/api/term', { typeId });
        return response.data;
    }
}
