import { action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import PagePanel from '../../../../shared/PagePanel';
import HierarchicalAdd from './HierarchicalAdd';
import TaxonomyWidgetModel from './TaxonomyWidgetModel';

interface OwnProps {
    model: TaxonomyWidgetModel;
}
interface OwnState {}

@observer
export default class TaxonomyWidget extends React.Component<OwnProps, OwnState> {
    async componentDidMount() {}

    render() {
        const { model } = this.props;
        return (
            <PagePanel
                className='taxonomyWidget pagePanel--widget'
                content={this.renderTermList()}
                footer={this.renderFooter()}
                title={model.options.title}
            />
        );
    }

    @action.bound
    private async onAddSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();
        const { model } = this.props;
        const { add } = model;
        add.saving = true;
        this.props.model.addTerm({
            name: model.add.name,
            taxonomyId: model.taxonomy.id
        });
        runInAction(() => {
            add.name = '';
            add.parentId = '';
            add.saving = false;
        });
    }

    private renderAdd() {
        const taxononyName = this.props.model.taxonomy.name.toLowerCase();
        const add = this.props.model.add;
        return (
            <form onSubmit={this.onAddSubmit}>
                <input
                    className='form-control'
                    onChange={e => (add.name = e.target.value)}
                    placeholder={`Add new ${taxononyName}`}
                    value={add.name}
                />
            </form>
        );
    }

    private renderTerms() {
        const { model } = this.props;
        const idPrefix = `term_${model.taxonomy.id}_`;
        const activeTerms = model.activeTerms;

        return model.terms.map((term, i) => (
            <li className='taxonomyWidget__term' key={i}>
                <input
                    checked={Boolean(activeTerms[term.id])}
                    className='checkbox'
                    id={idPrefix + i}
                    onChange={model.createChangeHandler(term)}
                    type='checkbox'
                />
                <label htmlFor={idPrefix + i}>{term.name}</label>
            </li>
        ));
    }

    private renderTermList() {
        return <ul className='taxonomyWidget__termList'>{this.renderTerms()}</ul>;
    }

    private renderFooter() {
        if (this.props.model.taxonomy.isHierarchical) {
            return <HierarchicalAdd model={this.props.model} />;
        } else {
            return this.renderAdd();
        }
    }
}
