import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { classList } from '../../../utility/classList';
import { memoizeMany } from '../../../utility/memoize';

interface OwnProps extends RouteComponentProps {}
interface OwnState {}

class Nav extends React.Component<OwnProps, OwnState> {
    private navigators = memoizeMany((url: string) => {
        return (e: React.MouseEvent) => {
            e.preventDefault();
            this.props.history.push(url);
        };
    });

    render() {
        return (
            <nav className='adminHeaderNav'>
                <ul className='adminHeaderNav__items'>
                    {this.renderNavItem('/admin/content', 'Content')}
                    {this.renderNavItem('/admin/taxonomy', 'Taxonomies')}
                    {this.renderNavItem('/admin/articles', 'Articles')}
                    {this.renderNavItem('/admin/media', 'Media')}
                    {this.renderNavItem('/admin/security', 'Security')}
                </ul>
            </nav>
        );
    }

    private renderNavItem(url: string, text: string) {
        const pathname = this.props.location.pathname;
        const isActive = pathname.startsWith(url);
        const classes = classList('adminHeaderNav__item', isActive && 'adminHeaderNav__item--active');
        const onClick = this.navigators(url);

        return (
            <li className={classes}>
                <a className='adminHeaderNav__link' href='/' onClick={onClick}>
                    {text}
                </a>
            </li>
        );
    }
}

export default withRouter(Nav);
