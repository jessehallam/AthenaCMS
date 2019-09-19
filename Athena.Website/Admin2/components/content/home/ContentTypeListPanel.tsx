import { observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IContentType } from '../../../stores/interfaces';
import PagePanel from '../../shared/PagePanel';
import { ContentHomeModel } from './model';

interface OwnProps {
    model: ContentHomeModel;
    onDelete: (item: IContentType) => void;
    onEdit: (item: IContentType) => void;
}
interface OwnState {}

const subTitle: React.ReactNode = (
    <div>
        Content types refer to the different types of content in your site. Built-in content types are{' '}
        <strong>Article</strong> and <strong>Image</strong>. You can define your own content types to store different
        kinds of data.
    </div>
);

@observer
class ContentTypeListPanel extends React.Component<OwnProps, OwnState> {
    render() {
        return <PagePanel content={this.renderContent()} subTitle={subTitle} title='Content Types' />;
    }

    private renderContent() {
        return (
            <table className='table mb-0'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th># Records</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
        );
    }

    private renderActions(contentType: IContentType) {
        const canDelete = contentType.id > 2;
        return (
            <div className='dropdown'>
                <a className='btn btn-sm btn-clean btn-icon' href='#' data-toggle='dropdown'>
                    <i className='fas fa-ellipsis-h' />
                </a>
                <div className='dropdown-menu dropdown-menu-right'>
                    <ul className='dropdown-list'>
                        <li className='dropdown-listitem'>
                            <a className='dropdown-link' href='#' onClick={() => this.props.onEdit(contentType)}>
                                <i className='fas fa-edit' /> Edit
                            </a>
                        </li>

                        {canDelete && (
                            <li className='dropdown-listitem'>
                                <a className='dropdown-link' href='#' onClick={() => this.props.onDelete(contentType)}>
                                    <i className='fas fa-trash' /> Delete
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }

    private renderRows() {
        const { model } = this.props;
        const { contentTypes, loadingContentTypes } = model;

        if (loadingContentTypes) {
            return (
                <tr>
                    <td colSpan={3}>Loading...</td>
                </tr>
            );
        } else if (!contentTypes.length) {
            return (
                <tr>
                    <td colSpan={3}>No items to display.</td>
                </tr>
            );
        }
        return contentTypes.map((contentType, i) => (
            <tr key={i}>
                <td>
                    <Link to={`/content/${contentType.name.toLowerCase()}`}>{contentType.name}</Link>
                </td>
                <td>{contentType.recordCount}</td>
                <td className='dropdown-cell'>{this.renderActions(contentType)}</td>
            </tr>
        ));
    }
}

export default ContentTypeListPanel;
