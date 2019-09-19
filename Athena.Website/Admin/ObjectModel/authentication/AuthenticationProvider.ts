import { Subject } from '../../utility/subject';
import { IAccessToken } from '../interfaces';
import { Requester } from '../Requester';
import Tenant from '../Tenant';

type TokenResolver = (value?: string | PromiseLike<string>) => void;

const cookieName = 'athena.cookie';
import Cookie = require('js-cookie');

export class AuthenticationProvider {
    private pendingResolvers: TokenResolver[] = [];
    private token: IAccessToken;

    readonly onAuthenticated = new Subject();
    readonly onLoginRequired = new Subject();

    constructor(private readonly tenant: Tenant) {
        this.token = Cookie.getJSON(cookieName);
    }

    /** Returns true if the access token is valid. */
    get isAuthenticated() {
        return this.token && new Date(this.token.expires) > new Date();
    }

    /**
     * Creates an authenticated requester object.
     */
    async authenticateAsync(): Promise<Requester> {
        const token = await this.getAccessTokenAsync();
        return new Requester({
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    /**
     * Retrieves an access token, if one is available, or
     * holds a promise open until one becomes available.
     * An onLoginRequired event will be triggered if a token
     * needs to be requested.
     */
    async getAccessTokenAsync(): Promise<string> {
        if (this.isAuthenticated) {
            return this.token.token;
        }
        return new Promise(resolve => {
            this.pendingResolvers.push(resolve);
            this.onLoginRequired.next();
        });
    }

    /**
     * Attempts to sign in using the specified username and password. If successful,
     * resolves all pending authenicateAsyncs. Triggers onAuthenticated event when
     * successful.
     * @param username A username or email address.
     * @param password The password for the specified account.
     */
    async signInAsync(username: string, password: string): Promise<IAccessToken> {
        try {
            const response = await this.tenant.requester.post<IAccessToken>('/api/auth', { username, password });
            this.token = response.data;
            this.pendingResolvers.forEach(resolve => resolve(response.data.token));
            this.pendingResolvers = [];
            Cookie.set(cookieName, this.token, { expires: new Date(this.token.expires) });
            this.onAuthenticated.next();
            return response.data;
        } catch {
            return null;
        }
    }
}
