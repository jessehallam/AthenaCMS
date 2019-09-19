import { AuthenticationProvider } from './authentication/AuthenticationProvider';
import ContentProvider from './content/ContentProvider';
import MediaProvider from './media/MediaProvider';
import { Requester } from './Requester';
import TaxonomyProvider from './taxonomy/TaxonomyProvider';

export default class Tenant {
    readonly authentication = new AuthenticationProvider(this);
    readonly content = new ContentProvider(this);
    readonly media = new MediaProvider(this);
    readonly requester: Requester = new Requester({});
    readonly taxonomies = new TaxonomyProvider(this);
}
