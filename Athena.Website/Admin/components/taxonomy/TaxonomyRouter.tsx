import * as React from 'react';
import { Route, Switch } from 'react-router';
import TaxonomyHomeView from './home/TaxonomyHomeView';

export default function TaxonomyRouter() {
    return (
        <Switch>
            <Route exact={true} path='/admin/taxonomy' component={TaxonomyHomeView} />
        </Switch>
    );
}
