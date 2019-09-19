export interface IContentType {
    id?: number;
    name: string;
}

export interface IContentCount {
    total: number;
    typeId: number;
    typeName: string;
}

export interface IContentCreatedBy {
    email: string;
    id: string;
    userName: string;
}

export interface IContent {
    createdAt: string;
    updatedAt: string;
    createdBy: IContentCreatedBy;
    excerpt: string;
    id?: number;
    content: string;
    publishedAt?: string;
    title: string;
    status: 'draft' | 'published';
    type: { id: number; name: string };
    customFields: ICustomField[];
    taxonomyTerms: IContentTaxonomyTerm[];
}

export interface ICustomField {
    fieldKey: string;
    fieldValue: string;
    id?: number;
    private?: boolean;
    protected?: boolean;
}

export interface IContentTaxonomyTerm {
    id: number;
    name: string;
    parentId?: number;
    taxonomyId: number;
}

export interface ITaxonomy {
    allowMultiple?: boolean;
    id?: number;
    isHierarchical?: boolean;
    name: string;
}

export interface ITerm {
    id?: number;
    name: string;
    parentId?: number;
    taxonomyId: number;
}

export interface IPlugin {
    author: {
        email: string;
        name: string;
        url: string;
    };
    description: string;
    displayName: string;
    license: string;
    name: string;
    version: string;
}

export interface IUserGroup {
    id: string;
    name: string;
}

export interface IUserGroupCount {
    count: number;
    id: string;
    name: string;
}

export interface IUser {
    email: string;
    id: string;
    userName: string;
}

export interface ISecurityActivity {
    description: string;
    id: string;
    activityName: string;
}
