import { computed, observable } from 'mobx';
import { Client } from '../api/client';
import { IAccessToken } from '../api/token';
import { Subject } from '../utility/subject';
import { RootStore } from './RootStore';

import Cookie = require('js-cookie');
type Resolver = (token: string) => void;

const cookieName = 'athena.cookie';

export class AuthenticationStore {
    private pendingResolvers: Resolver[] = [];

    readonly onAuthenticated = new Subject();
    readonly onLoginRequired = new Subject();

    constructor(private readonly root: RootStore) {
        this.token = Cookie.getJSON(cookieName);
    }

    @computed
    get authenticated(): boolean {
        return this.token && new Date(this.token.expires) > new Date();
    }

    @observable
    token: IAccessToken = null;

    /**
     * Creates a Promise which resolves an authenticated API client.
     */
    async authenticateAsync(): Promise<Client> {
        const token = await this.getAccessTokenAsync();
        return new Client({
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    /**
     * Creates a Promise which retrieves an access token.
     * If an access token is not available, the promise waits
     * until an access token becomes available.
     */
    async getAccessTokenAsync(): Promise<string> {
        if (this.authenticated) {
            return this.token.token;
        }
        return new Promise(resolve => {
            this.pendingResolvers.push(resolve);
            this.onLoginRequired.next();
        });
    }

    /**
     * Attempts to sign in using a username and password. If successful,
     * resolve all pending authenticateAsyncs. Triggers onAuthenticated
     * event when successful.
     * @param username The username.
     * @param password The password.
     */
    async signInAsync(username: string, password: string): Promise<boolean> {
        try {
            const response = await this.root.client.post<IAccessToken>('/api/auth', {
                username,
                password
            });

            this.token = response.data;
            this.pendingResolvers.forEach(resolve => resolve(this.token.token));
            this.pendingResolvers = [];

            Cookie.set(cookieName, this.token, { expires: new Date(this.token.expires) });

            this.onAuthenticated.next();

            return true;
        } catch {
            return false;
        }
    }
}
