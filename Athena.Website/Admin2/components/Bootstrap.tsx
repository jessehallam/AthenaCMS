import { runInAction } from 'mobx';
import * as React from 'react';
import * as bootstrap from '../boostrap';
import { StoreProps, withStore } from '../stores/withStore';

interface OwnProps extends StoreProps {}
interface OwnState {}

class Bootstrap extends React.Component<OwnProps, OwnState> {
    componentDidMount() {
        const { store } = this.props;
        const { admin } = store;

        runInAction('boostrap', () => {
            admin.navItems.push(...bootstrap.navItems);
            admin.routes.push(...bootstrap.routes);
        });
    }

    render() {
        return this.props.children;
    }
}

export default withStore(Bootstrap);
