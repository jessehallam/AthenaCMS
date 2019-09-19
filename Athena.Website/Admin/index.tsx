require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.bundle.js');
require('./stylesheets/admin.scss');
require('./utility/notify');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Application from './components/Application';

ReactDOM.render(
    <BrowserRouter>
        <Application />
    </BrowserRouter>,
    document.getElementById('app')
);
