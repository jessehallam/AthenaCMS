import { observer } from 'mobx-react';
import * as React from 'react';
import { Switch } from 'react-router';
import { StoreProps, withStore } from '../../stores/withStore';

interface RouterProps extends StoreProps {}

function AdminRouter({ store }: RouterProps) {
    const routes = store.admin.routes.map((route, i) => React.cloneElement(route, { key: 'route-' + i }));
    return <Switch>{routes}</Switch>;
}

export default withStore(observer(AdminRouter));
