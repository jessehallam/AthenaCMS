import * as React from 'react';
import ReactSelect from 'react-select';
import { ActionMeta } from 'react-select/src/types';
import { Term } from '../../../../stores/taxonomy/taxonomy.interfaces';
import PagePanel from '../../PagePanel';
import { withWidget, WithWidgetProps } from '../Context';
import { TaxonomyWidgetArgs, TaxonomyWidgetModel } from './TaxonomyWidgetLoader';

interface OwnProps extends WithWidgetProps<TaxonomyWidgetArgs> {
    model: TaxonomyWidgetModel;
}
interface OwnState {
    value: any;
}

class TaxonomyWidget extends React.Component<OwnProps, OwnState> {
    readonly state: OwnState = { value: null };

    render() {
        return <PagePanel content={this.renderContent()} title={this.props.args.title} />;
    }

    private getOptionLabel = (term: Term) => term.name;
    private getOptionValue = (term: Term) => '' + term.id;
    private onMultiChanged = (value: any, actionMeta: ActionMeta) => this.setState({ value });

    private renderContent() {
        return (
            <div className='widgetTaxonomy'>
                <div className='widgetTaxonomy__select form-group'>{this.renderSelect()}</div>
                <div>
                    <a href='#'>Create New</a>
                </div>
            </div>
        );
    }

    private renderSelect() {
        const { model } = this.props;

        if (model.taxonomy.allowMultiple) {
            return (
                <ReactSelect
                    getOptionLabel={this.getOptionLabel}
                    getOptionValue={this.getOptionValue}
                    isMulti={true}
                    onChange={this.onMultiChanged}
                    options={model.terms}
                    value={this.state.value}
                />
            );
        } else {
            return (
                <ReactSelect
                    getOptionLabel={this.getOptionLabel}
                    getOptionValue={this.getOptionValue}
                    onChange={this.onMultiChanged}
                    options={model.terms}
                    value={this.state.value}
                />
            );
        }
    }
}

export default withWidget(TaxonomyWidget);
