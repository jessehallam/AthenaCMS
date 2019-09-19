import { isEqual } from 'lodash';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface BaseLoaderState {
    lastRouteParams: any;
    loaded: boolean;
    renderedContent: React.ReactNode;
}

export abstract class BaseLoader<
    TProps extends RouteComponentProps<TRouteParams>,
    TRouteParams
> extends React.Component<TProps, BaseLoaderState> {
    readonly state: BaseLoaderState = {
        lastRouteParams: null,
        loaded: false,
        renderedContent: null
    };

    componentDidMount() {
        this.updateRoute();
    }

    componentDidUpdate() {
        this.updateRoute();
    }

    render() {
        if (!this.state.loaded) return <span>Loading...</span>;
        return this.state.renderedContent;
    }

    protected abstract renderContent(routeParams: TRouteParams): Promise<React.ReactNode>;

    protected async updateRoute() {
        const needsUpdate =
            this.state.lastRouteParams === null || !isEqual(this.state.lastRouteParams, this.props.match.params);
        if (!needsUpdate) return;
        this.setState({ lastRouteParams: this.props.match.params, loaded: false });
        const content = await this.renderContent(this.props.match.params);
        this.setState({
            loaded: true,
            renderedContent: content
        });
    }
}
