import * as React from 'react';

interface OwnProps {
    actionBar?: React.ReactNode;
    title: React.ReactNode;
    toolbar?: React.ReactNode;
}

interface OwnState {}

export default class PageHeader extends React.Component<OwnProps, OwnState> {
    render() {
        return (
            <div className='pageHeader'>
                <div className='pageHeader__left'>
                    <h2 className='pageHeader__title'>{this.props.title}</h2>
                    {this.renderActionBar()}
                </div>

                <div className='pageHeader__right'>{this.renderToolbar()}</div>
            </div>
        );
    }

    private renderActionBar(): React.ReactNode {
        if (!this.props.actionBar) return null;
        return (
            <div className='pageHeader__actionBar'>
                <div className='pageHeader__separator' />
                {this.props.actionBar}
            </div>
        );
    }

    private renderToolbar(): React.ReactNode {
        if (!this.props.toolbar) return null;
        return <div className='pageHeader__toolbar'>{this.props.toolbar}</div>;
    }
}
