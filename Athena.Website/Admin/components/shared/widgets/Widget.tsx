import * as React from 'react';
import * as urlParse from 'url-parse';
import store from '../../../stores/rootStore';
import { withEditor, WithEditorProps } from '../../content/contentEditor/Context';
import { Provider, WithWidgetProps } from './Context';

interface OwnProps extends WithEditorProps {
    content: string;
}

interface OwnState {}

class Widget extends React.Component<OwnProps, OwnState> {
    render() {
        const parsed = urlParse(this.props.content, {}, true);
        const contextProps: WithWidgetProps = {
            editor: this.props.editor,
            args: parsed.query,
            widget: parsed.pathname
        };

        const Widget = store.dashboard.widgets[parsed.pathname];

        if (!Widget) {
            console.warn(`Could not render widget '${parsed.pathname}'. Widget is not registered.`);
            return null;
        }

        return (
            <Provider value={contextProps}>
                <Widget />
            </Provider>
        );
    }
}

export default withEditor(Widget);
