import { observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { StoreProps, withStore } from '../../../stores/withStore';
import { classList } from '../../../utility/classList';

interface OwnProps extends StoreProps, RouteComponentProps {}
interface OwnState {}

@observer
class Nav extends React.Component<OwnProps, OwnState> {
    render() {
        return (
            <nav className='header__nav'>
                <ul className='header__navItems'>{this.renderNavItems()}</ul>
            </nav>
        );
    }

    private renderNavItems() {
        const { admin } = this.props.store;
        const { pathname } = this.props.location;
        return admin.navItems.map((item, i) => {
            const active = pathname.startsWith(item.url);
            const classes = classList('header__navItem', active && 'header__navItem--active');
            return (
                <li className={classes} key={'nav-' + i}>
                    <Link className='header__navLink' to={item.url}>
                        {item.label}
                    </Link>
                </li>
            );
        });
    }
}

export default withRouter(withStore(Nav));
