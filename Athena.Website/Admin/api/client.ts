import Axios, { AxiosRequestConfig } from 'axios';
import mergeRight from 'ramda/es/mergeRight';

export class Client {
    constructor(private readonly config: AxiosRequestConfig) {}

    delete(url: string, params?: any) {
        return this.send({
            method: 'delete',
            url,
            params
        });
    }

    get<TData = any>(url: string, params?: any) {
        return this.send<TData>({
            method: 'get',
            url,
            params
        });
    }

    post<TData = any>(url: string, data?: any) {
        return this.send<TData>({
            method: 'post',
            url,
            data
        });
    }

    put<TData = any>(url: string, data?: any) {
        return this.send<TData>({
            method: 'put',
            url,
            data
        });
    }

    send<TData = any>(config: AxiosRequestConfig) {
        config = mergeRight(this.config, config);
        return Axios.request<TData>(config);
    }
}
