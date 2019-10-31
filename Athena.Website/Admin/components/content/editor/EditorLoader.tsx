import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { StoreProps, withStore } from '../../../stores/withStore';
import EditorView from './EditorView';
import { EditorModel } from './model';

interface RouteParams {
    contentTypeName: string;
    contentId: string;
}
interface OwnProps extends RouteComponentProps<RouteParams>, StoreProps {}
interface OwnState {
    model: EditorModel;
}

@observer
class EditorLoader extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        model: new EditorModel(this.props.store)
    };

    componentDidMount() {
        this.updateRoute();
    }

    componentDidUpdate(prev: OwnProps) {
        this.updateRoute(prev);
    }

    render() {
        if (this.state.model.loading) return null;
        return <EditorView model={this.state.model} />;
    }

    private updateRoute(prev?: OwnProps) {
        const { params } = this.props.match;
        if (prev && R.equals(prev.match.params, params)) {
            return;
        }

        this.state.model.reload(params.contentTypeName, Number(params.contentId));
    }
}

export default withRouter(withStore(EditorLoader));
