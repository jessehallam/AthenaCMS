import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { IContent } from '../../../stores/interfaces';
import { RootStore } from '../../../stores/RootStore';
import { memoizeMany } from '../../../utility/memoize';
import PagePanel from '../../shared/PagePanel';
import ContentListFilters from './ContentListFilters';
import { ContentListModel } from './model';

interface OwnProps extends RouteComponentProps {
    model: ContentListModel;
    store: RootStore;
}
interface OwnState {}

const renderTerms = (content: IContent, taxonomyId: number) =>
    content.taxonomyTerms
        .filter(x => x.taxonomyId === taxonomyId)
        .map(x => x.name)
        .sort()
        .join(', ');

@observer
class ContentListPanel extends React.Component<OwnProps, OwnState> {
    private readonly memoizedTerms = memoizeMany(renderTerms);

    render() {
        return <PagePanel content={this.renderContent()} />;
    }

    private renderContent() {
        return [
            <ContentListFilters key='filters' model={this.props.model} />,

            <div className='row' key='table_row'>
                <div className='col'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Categories</th>
                                <th>Tags</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderRows()}</tbody>
                    </table>
                </div>
            </div>
        ];
    }

    private renderDate(content: IContent) {
        const { utility } = this.props.store;
        if (content.publishedAt) {
            return <span>Published {utility.formatDate(content.publishedAt)}</span>;
        } else {
            return <span>Created {utility.formatDate(content.createdAt)}</span>;
        }
    }

    private renderRows() {
        const { pathname } = this.props.location;

        return this.props.model.filteredContents.map(content => {
            return (
                <tr key={content.id}>
                    <td>
                        <Link to={`${pathname}/edit/${content.id}`}>{content.title}</Link>
                    </td>
                    <td>{content.createdBy.userName}</td>
                    <td>{this.memoizedTerms(content, 1)}</td>
                    <td>{this.memoizedTerms(content, 2)}</td>
                    <td>{this.renderDate(content)}</td>
                </tr>
            );
        });
    }
}

export default withRouter(ContentListPanel);
