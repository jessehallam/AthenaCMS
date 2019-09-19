import * as React from 'react';
import { Route, Switch } from 'react-router';
import MediaLibrary from './mediaLibrary/MediaLibraryView';

export default function MediaRouter() {
    return (
        <Switch>
            <Route exact={true} path='/admin/media' component={MediaLibrary} />
        </Switch>
    );
}
