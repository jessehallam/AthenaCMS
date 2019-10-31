import { observer } from 'mobx-react';
import * as React from 'react';
import * as urlParse from 'url-parse';
import { StoreProps, withStore } from '../../../../stores/withStore';
import { EditorModel } from '../model';
import { WidgetProvider } from './context';
import { WidgetModel } from './model';

interface OwnProps extends StoreProps {
    editor: EditorModel;
    url: string;
}
interface OwnState {}

@observer
class WidgetLoader extends React.Component<OwnProps, OwnState> {
    readonly model = new WidgetModel();

    componentDidMount() {
        this.updateWidget();
    }

    componentDidUpdate(prev: OwnProps) {
        this.updateWidget(prev);
    }

    render() {
        if (!this.model.loaded) return null;
        const Widget = this.props.store.admin.widgets.get(this.model.name);
        if (!Widget) {
            console.warn(`Cannot render widget ${this.model.name}. Widget is not registered.`);
            return null;
        }
        return (
            <WidgetProvider value={this.model}>
                <Widget />
            </WidgetProvider>
        );
    }

    private updateWidget(prev?: OwnProps) {
        if (prev && prev.url === this.props.url) {
            return;
        }
        const url = urlParse(this.props.url, {}, true);
        this.model.name = url.pathname;
        this.model.options = url.query;
        this.model.content = this.props.editor.content;
        this.model.contentType = this.props.editor.contentType;
        this.model.loaded = true;
    }
}

export default withStore(WidgetLoader);
