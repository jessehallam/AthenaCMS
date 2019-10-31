import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { IContentType } from '../../../stores/interfaces';
import PagePanel from '../../shared/PagePanel';
import ContentTypesModel from './models/ContentTypesModel';

interface OwnProps {
    model: ContentTypesModel;
}

const subTitle = (
    <div>
        Content types refer to the different types of content in your site. Built-in content types are{' '}
        <strong>Article</strong> and <strong>Image</strong>. You can define your own content types to store different
        kinds of data.
    </div>
);

@observer
export default class ContentTypeListPanel extends React.Component<OwnProps> {
    render() {
        return <PagePanel content={this.renderTable()} subTitle={subTitle} title='Content Types' />;
    }

    private renderActions(contentType: IContentType) {
        const canDelete = contentType.id !== 1 && contentType.id !== 2;
        const onDelete = () => this.props.model.delete.show(contentType);
        return (
            <div className='dropdown'>
                <a className='btn btn-sm btn-clean btn-icon' href='#' data-toggle='dropdown'>
                    <i className='fas fa-ellipsis-h' />
                </a>
                <div className='dropdown-menu dropdown-menu-right'>
                    <ul className='dropdown-list'>
                        <li className='dropdown-listitem'>
                            <a className='dropdown-link' href='#'>
                                <i className='fas fa-edit' /> Edit
                            </a>
                        </li>

                        {canDelete && (
                            <li className='dropdown-listitem'>
                                <a className='dropdown-link' href='#' onClick={onDelete}>
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
        const url = (contentType: IContentType) => `/content/` + contentType.name.toLowerCase();
        return this.props.model.contentTypes.map(contentType => (
            <tr key={contentType.id}>
                <td>
                    <Link to={url(contentType)}>{contentType.name}</Link>
                </td>
                <td>{contentType.total}</td>
                <td className='dropdown-cell'>{this.renderActions(contentType)}</td>
            </tr>
        ));
    }

    private renderTable() {
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
}
