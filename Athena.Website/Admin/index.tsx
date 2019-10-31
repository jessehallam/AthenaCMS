require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.bundle.js');
require('./styles/index.scss');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';
import Application from './components/Application';
import Bootstrap from './components/Bootstrap';
import { store } from './global';
import { RootStore } from './stores/RootStore';

(r => {
    r.keys().forEach(r);
})(require.context('./components/content/editor/widgets', true, /.+/));

ReactDOM.render(
    <ReactRouterDOM.BrowserRouter basename='/admin'>
        <RootStore.Provider value={store}>
            <Bootstrap>
                <Application />
            </Bootstrap>
        </RootStore.Provider>
    </ReactRouterDOM.BrowserRouter>,
    document.getElementById('app')
);

require('expose-loader?React!react');
require('expose-loader?mobx!mobx');
require('expose-loader?mobxReact!mobx-react');
