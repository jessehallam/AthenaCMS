import * as React from 'react';
import { Route, Switch } from 'react-router';
import MediaLibraryLoader from './mediaLibrary/MediaLibraryLoader';

export default function MediaRouter() {
    return (
        <Switch>
            <Route exact={true} path='/media' component={MediaLibraryLoader} />
        </Switch>
    );
}
