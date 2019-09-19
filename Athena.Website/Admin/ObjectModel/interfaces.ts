export type ContentStatus = 'draft' | 'published';

export interface IAccessToken {
    expires: string;
    refreshToken: string;
    token: string;
}

export interface IContent {
    content: string;
    customFields: ICustomField[];
    createdAt: string;
    createdBy: {
        email: string;
        id: number;
        userName: string;
    };
    excerpt: string;
    id: number;
    publishedAt: string;
    status: ContentStatus;
    taxonomyTerms: IContentTerm[];
    title: string;
    type: {
        id: number;
        name: string;
    };
    updatedAt: string;
}

export interface IContentTerm {
    id: number;
    name: string;
    parentId?: number;
    taxonomyId?: number;
}

export interface ICustomField {
    fieldKey: string;
    id: number;
    fieldValue: string;
    private?: boolean;
}

export interface IContentType {
    id: number;
    name: string;
}

export interface IContentCount {
    total: number;
    typeId: number;
    typeName: string;
}

export interface ITaxonomy {
    allowMultiple: boolean;
    id: number;
    isHierarchical: boolean;
    name: string;
}

export interface ITerm {
    id: number;
    name: string;
    parentId?: number;
    taxonomyId: number;
}

export interface ITaxonomyCount {
    count: number;
    id: number;
    name: string;
}

export interface ITermCount {
    count: number;
    id: number;
    name: string;
}
