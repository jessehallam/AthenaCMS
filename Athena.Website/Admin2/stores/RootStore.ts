import { observable } from 'mobx';
import { Client } from '../api/client';
import { AdminStore } from './AdminStore';
import { AuthenticationStore } from './AuthenticationStore';
import ContentStore from './ContentStore';
import { Provider } from './provider';
import SecurityStore from './SecurityStore';
import TaxonomyStore from './TaxonomyStore';
import { UtilityStore } from './UtilityStore';

export class RootStore {
    @observable readonly admin = new AdminStore(this);
    @observable readonly authentication = new AuthenticationStore(this);
    @observable readonly client = new Client({});
    @observable readonly content = new ContentStore(this);
    @observable readonly security = new SecurityStore(this);
    @observable readonly taxonomy = new TaxonomyStore(this);
    @observable readonly utility = new UtilityStore(this);

    static readonly Provider = Provider;
}
