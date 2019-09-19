import { observer } from 'mobx-react';
import * as React from 'react';
import PageHeader from '../../shared/PageHeader';
import { defaultDashboard, IDashboardSpan } from './dashboard';
import { EditorModel } from './model';
import WidgetLoader from './widget/WidgetLoader';

interface OwnProps {
    model: EditorModel;
}
interface OwnState {}

type SpanType = 'column' | 'row';

@observer
class EditorView extends React.Component<OwnProps, OwnState> {
    render() {
        return (
            <div className='editor'>
                <PageHeader title='Edit Content' />

                <div className='dashboard'>{this.renderRow(defaultDashboard, 0)}</div>
            </div>
        );
    }

    private renderColumn(span: IDashboardSpan, index: number) {
        const className = span.span ? 'col-' + span.span : 'col';
        const children = !Array.isArray(span.content)
            ? this.renderWidget(span.content)
            : span.content.map((row, index) => this.renderRow(row, index));
        return <div children={children} className={className} key={index} />;
    }

    private renderRow(span: IDashboardSpan, index: number) {
        const children = !Array.isArray(span.content) ? (
            <div className='col'>{this.renderWidget(span.content)}</div>
        ) : (
            span.content.map((span, i) => this.renderColumn(span, i))
        );
        return <div children={children} className='row' key={index} />;
    }

    private renderWidget(content: string) {
        return <WidgetLoader editor={this.props.model} url={content} />;
    }
}

export default EditorView;
