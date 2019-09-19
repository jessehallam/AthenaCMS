import * as React from 'react';
import { Link } from 'react-router-dom';
import PagePanel from '../../shared/PagePanel';
import { IViewContentType } from './ContentHomeView';

interface OwnProps {
    contentTypes: IViewContentType[];
    loading?: boolean;
}
interface OwnState {}

const loadingView = (
    <tr>
        <td colSpan={3}>Loading...</td>
    </tr>
);

const noItemsToDisplay = (
    <tr>
        <td colSpan={3}>No items to display.</td>
    </tr>
);

const subTitle: React.ReactNode = (
    <div>
        Content types refer to the different types of content in your site. Built-in content types are{' '}
        <strong>Article</strong> and <strong>Image</strong>. You can define your own content types to store different
        kinds of data.
    </div>
);

export default class ContentTypePanel extends React.Component<OwnProps, OwnState> {
    render() {
        return <PagePanel content={this.renderContent()} subTitle={subTitle} title='Content Types' />;
    }

    private renderContent() {
        let rows: React.ReactNode;

        const { loading, contentTypes } = this.props;

        if (loading) {
            rows = loadingView;
        } else if (!contentTypes.length) {
            rows = noItemsToDisplay;
        } else {
            rows = contentTypes.map((contentType, i) => (
                <tr key={i}>
                    <td>
                        <Link to={`/admin/content/search/${contentType.name.toLowerCase()}`}>{contentType.name}</Link>
                    </td>
                    <td>{contentType.recordCount}</td>
                    <td></td>
                </tr>
            ));
        }

        return (
            <table className='table mb-0'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th># Records</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}
