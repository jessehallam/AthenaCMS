import { action } from 'mobx';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Content } from '../../../ObjectModel/content/Content';
import { IContentType } from '../../../ObjectModel/interfaces';
import Application from '../../Application';
import { BaseLoader } from '../../shared/BaseLoader';
import ContentEditorView from './ContentEditorView';
import { Provider } from './Context';
import { defaultDashboard } from './dashboard';
import { ContentEditorModel } from './model';

interface RouteParams {
    contentId: string;
    contentTypeName: string;
}

interface OwnProps extends RouteComponentProps<RouteParams> {}

class ContentEditorLoader extends BaseLoader<OwnProps, RouteParams> {
    @action.bound
    protected async renderContent(routeParams: RouteParams) {
        const { contentId, contentTypeName } = routeParams;
        const contentType = await Application.tenant.content.getContentTypeByNameAsync(contentTypeName);
        const content =
            contentId === 'new'
                ? this.createContent(contentType)
                : await Application.tenant.content.getAsync(Number(contentId));

        const model = new ContentEditorModel();
        model.content = content;
        model.dashboard = defaultDashboard;

        return (
            <Provider value={model}>
                <ContentEditorView model={model} />
            </Provider>
        );
    }

    @action.bound
    private createContent(contentType: IContentType): Content {
        const x = new Content();
        x.content = '';
        x.createdAt = null;
        x.createdBy = null;
        x.customFields = [];
        x.excerpt = '';
        x.id = null;
        x.publishedAt = null;
        x.status = 'draft';
        x.taxonomyTerms = [];
        x.title = '';
        x.type = { id: contentType.id, name: contentType.name };
        x.updatedAt = null;
        return x;
    }
}

export default withRouter(ContentEditorLoader);
