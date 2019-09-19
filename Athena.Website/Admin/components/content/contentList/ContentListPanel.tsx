import { observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../../../ObjectModel/content/Content';
import { formatDate } from '../../../utility/date';
import PagePanel from '../../shared/PagePanel';

interface OwnProps {
    contents: Content[];
}
interface OwnState {}

@observer
export default class ContentListPanel extends React.Component<OwnProps, OwnState> {
    render() {
        return <PagePanel content={this.renderContent()} />;
    }

    private renderContent() {
        return (
            <div>
                <table className='table mb-0'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Categories</th>
                            <th>Tags</th>
                            <th>Created</th>
                            <th>Published</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                </table>
            </div>
        );
    }

    private renderRows() {
        return this.props.contents.map(content => {
            const categories = content.taxonomyTerms
                .filter(x => x.taxonomyId === 1)
                .map(x => x.name)
                .join(', ');

            const tags = content.taxonomyTerms
                .filter(x => x.taxonomyId === 2)
                .map(x => x.name)
                .join(', ');

            return (
                <tr key={content.id}>
                    <td>
                        <Link to={`/admin/content/edit/${content.type.name}/${content.id}`}>{content.title}</Link>
                    </td>
                    <td>{content.createdBy.userName}</td>
                    <td>{categories}</td>
                    <td>{tags}</td>
                    <td>{formatDate(content.createdAt)}</td>
                    <td>{formatDate(content.publishedAt)}</td>
                </tr>
            );
        });
    }
}
