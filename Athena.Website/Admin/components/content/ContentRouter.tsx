import * as React from 'react';
import { Route, Switch } from 'react-router';
import ContentEditorLoader from './contentEditor/ContentEditorLoader';
import ContentListLoader from './contentList/ContentListLoader';
import ContentHomeView from './home/ContentHomeView';

export default function ContentRouter() {
    return (
        <Switch>
            <Route
                exact={true}
                path='/admin/content/edit/:contentTypeName/:contentId'
                component={ContentEditorLoader}
            />
            <Route exact={true} path='/admin/content' component={ContentHomeView} />
            <Route exact={true} path='/admin/content/search/:name' component={ContentListLoader} />
        </Switch>
    );
}
