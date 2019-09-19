import * as React from 'react';
import PageHeader from '../../shared/PageHeader';
import Widget from '../../shared/widgets/Widget';
import { DashboardSpan } from './dashboard';
import { ContentEditorModel } from './model';

interface OwnProps {
    model: ContentEditorModel;
}

interface OwnState {}

export default class ContentEditorView extends React.Component<OwnProps, OwnState> {
    render() {
        const { content, dashboard } = this.props.model;
        const title = (content.id ? 'Edit' : 'Create') + ' ' + content.type.name;

        return (
            <div className='contentEditor'>
                <PageHeader title={title} />

                {this.renderRow(dashboard)}
            </div>
        );
    }

    private renderColumn(span: DashboardSpan) {
        const rows =
            typeof span.content === 'string'
                ? this.renderWidget(span.content)
                : span.content.map(row => this.renderRow(row));

        const className = span.span ? `col-${span.span}` : 'col';
        return (
            <div className={className} key={span.key}>
                {rows}
            </div>
        );
    }

    private renderRow(span: DashboardSpan) {
        const columns =
            typeof span.content === 'string' ? (
                <div className='col'>{this.renderWidget(span.content)}</div>
            ) : (
                span.content.map(col => this.renderColumn(col))
            );

        return (
            <div className='row' data-row-span={span.span} key={span.key}>
                {columns}
            </div>
        );
    }

    private renderWidget(content: string) {
        return <Widget content={content} />;
    }
}
