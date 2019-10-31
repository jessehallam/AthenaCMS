import { observer } from 'mobx-react';
import * as R from 'ramda';
import * as React from 'react';
import { StoreProps, withStore } from '../../../../../stores/withStore';
import { WidgetProps, withWidget } from '../../widget/context';
import { widget } from '../decorator';
import TaxonomyWidget from './TaxonomyWidget';
import TaxonomyWidgetModel, { IOptions } from './TaxonomyWidgetModel';

interface OwnProps extends WidgetProps<IOptions>, StoreProps {}
interface OwnState {}

@observer
class TaxonomyWidgetLoader extends React.Component<OwnProps, OwnState> {
    private readonly model = new TaxonomyWidgetModel(this.props.model, this.props.store);

    componentDidMount() {
        this.update();
    }

    componentDidUpdate(prev: OwnProps) {
        this.update(prev);
    }

    render() {
        if (!this.model.loaded) return null;
        return <TaxonomyWidget model={this.model} />;
    }

    private async update(prev?: OwnProps) {
        if (prev && R.equals(prev.model.options, this.props.model.options)) {
            return;
        }

        await this.model.load();
    }
}

widget('taxonomy', withWidget(withStore(TaxonomyWidgetLoader)));
