import { Route } from 'react-router';
import ContentRouter from './components/content/ContentRouter';
import MediaRouter from './components/media/MediaRouter';
import PluginsView from './components/plugins/PluginsView';
import SecurityView from './components/security/SecurityView';
import TaxonomyRouter from './components/taxonomy/TaxonomyRouter';
import { INavItem } from './stores/AdminStore';
import React = require('react');

export const navItems: INavItem[] = [
    { label: 'Content', url: '/content' },
    { label: 'Taxonomies', url: '/taxonomy' },
    { label: 'Media', url: '/media' },
    { label: 'Security', url: '/security' },
    { label: 'Plugins', url: '/plugin' }
];

export const routes: JSX.Element[] = [
    <Route path='/content' component={ContentRouter} />,
    <Route path='/media' component={MediaRouter} />,
    <Route path='/taxonomy' component={TaxonomyRouter} />,
    <Route path='/plugin' component={PluginsView} />,
    <Route path='/security' component={SecurityView} />
];
