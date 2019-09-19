import * as React from 'react';
import { Route, Switch } from 'react-router';
import TaxonomyLoader from './TaxonomyLoader';

export default function TaxonomyRouter() {
    return (
        <Switch>
            <Route exact={true} path='/taxonomy' component={TaxonomyLoader} />
        </Switch>
    );
}
