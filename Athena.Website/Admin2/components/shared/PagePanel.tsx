import * as React from 'react';
import { classList } from '../../utility/classList';

interface OwnProps {
    className?: React.ReactText;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    subTitle?: React.ReactNode;
    title?: string;
    toolbar?: React.ReactNode;
}

interface OwnState {}

export default class PagePanel extends React.Component<OwnProps, OwnState> {
    render() {
        const classes = classList('pagePanel', this.props.className);
        return (
            <div className={classes}>
                {this.renderHeader()}
                <div className='pagePanel__content'>{this.props.content}</div>
                {this.renderFooter()}
            </div>
        );
    }

    private renderFooter() {
        if (!this.props.footer) return null;
        return <div className='pagePanel__footer'>{this.props.footer}</div>;
    }

    private renderHeader() {
        if (!this.props.subTitle && !this.props.title && !this.props.toolbar) return null;
        return (
            <div className='pagePanel__header'>
                <div className='pagePanel__headerWrapper'>
                    {this.renderTitle()}
                    {this.renderToolbar()}
                </div>
                {this.renderSubTitle()}
            </div>
        );
    }

    private renderSubTitle() {
        if (!this.props.subTitle) return null;
        return <div className='pagePanel__subTitle'>{this.props.subTitle}</div>;
    }

    private renderTitle() {
        if (!this.props.title) return null;
        return <h4 className='pagePanel__title'>{this.props.title}</h4>;
    }

    private renderToolbar() {
        if (!this.props.toolbar) return null;
        return (
            <div className='pagePanel__toolbar'>
                <div className='pagePanel__separator' />
                {this.props.toolbar}
            </div>
        );
    }
}
