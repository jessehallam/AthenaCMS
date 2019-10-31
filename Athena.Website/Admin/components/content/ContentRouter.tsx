import * as React from 'react';
import { Route, Switch } from 'react-router';
import ContentTypesView from './contentTypes/ContentTypesView';
import EditorLoader from './editor/EditorLoader';
import ContentListView from './list/ContentListView';

export default function ContentRouter() {
    return (
        <Switch>
            <Route exact={true} path='/content' component={ContentTypesView} />
            <Route exact={true} path='/content/:contentTypeName' component={ContentListView} />
            <Route exact={true} path='/content/:contentTypeName/edit/:contentId' component={EditorLoader} />
        </Switch>
    );
}
