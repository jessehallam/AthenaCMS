import * as React from 'react';
import { Route, Switch } from 'react-router';
import ContentRouter from '../content/ContentRouter';
import MediaRouter from '../media/MediaRouter';
import TaxonomyRouter from '../taxonomy/TaxonomyRouter';

export default function AdminRouter() {
    return (
        <Switch>
            <Route path='/admin/content' component={ContentRouter} />
            <Route path='/admin/media' component={MediaRouter} />
            <Route path='/admin/taxonomy' component={TaxonomyRouter} />
        </Switch>
    );
}
