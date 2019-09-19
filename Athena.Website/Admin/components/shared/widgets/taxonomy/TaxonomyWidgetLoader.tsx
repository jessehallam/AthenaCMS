import { observable } from 'mobx';
import * as React from 'react';
import store from '../../../../stores/rootStore';
import { Taxonomy, Term } from '../../../../stores/taxonomy/taxonomy.interfaces';
import { withWidget, WithWidgetProps } from '../Context';
import TaxonomyWidget from './TaxonomyWidget';

export interface TaxonomyWidgetArgs {
    title: string;
    type: string;
}

export interface TaxonomyWidgetModel {
    taxonomy: Taxonomy;
    terms: Term[];
}

interface OwnProps extends WithWidgetProps<TaxonomyWidgetArgs> {}
interface OwnState {
    loaded: boolean;
    model: TaxonomyWidgetModel;
}

class TaxonomyWidgetLoader extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = {
        loaded: false,
        model: null
    };

    async componentDidMount() {
        const taxonomy = (await store.taxonomy.getTaxonomies()).find(t => t.id === Number(this.props.args.type));
        const terms = await store.taxonomy.getTerms(Number(this.props.args.type));

        this.setState({
            loaded: true,
            model: observable({
                taxonomy,
                terms
            })
        });
    }

    render() {
        if (!this.state.loaded) return null;
        return <TaxonomyWidget {...this.props} model={this.state.model} />;
    }
}

export default withWidget(TaxonomyWidgetLoader);
