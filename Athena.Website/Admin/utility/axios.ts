import { AxiosResponse } from 'axios';

export interface IClientError {
    code: string;
    description: string;
}

export const isClientError = (thing: any): thing is AxiosResponse<IClientError> => isResponse<IClientError>(thing);

export function isResponse<T>(thing: any): thing is AxiosResponse<T> {
    return thing && typeof thing === 'object' && typeof thing.status === 'number';
}
