import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Application from '../../Application';
import { BaseLoader } from '../../shared/BaseLoader';
import ContentListView from './ContentListView';

interface RouteParams {
    name: string;
}

interface OwnProps extends RouteComponentProps<RouteParams> {}

class ContentListLoader extends BaseLoader<OwnProps, RouteParams> {
    protected async renderContent(routeParams: RouteParams) {
        const contentTypes = await Application.tenant.content.getContentTypesAsync();
        const name = routeParams.name.toUpperCase();
        const contentType = contentTypes.find(x => x.name.toUpperCase() === name);

        return <ContentListView contentType={contentType} />;
    }
}

export default withRouter(ContentListLoader);
