import { action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import focus from '../../../../../utility/focus';
import TaxonomyWidgetModel from './TaxonomyWidgetModel';

interface OwnProps {
    model: TaxonomyWidgetModel;
}

@observer
class HierarchicalAdd extends React.Component<OwnProps> {
    render() {
        const { model } = this.props;
        const content = model.add.visible ? this.renderForm() : this.renderOpenButton();

        return <div className='taxonomyWidget__hierarchicalAdd'>{content}</div>;
    }

    @action.bound
    private onCancel() {
        this.props.model.add.name = '';
        this.props.model.add.parentId = '';
        this.props.model.add.visible = false;
    }

    @action.bound
    private onOpenButtonClick() {
        this.props.model.add.visible = true;
    }

    @action.bound
    private async onSubmit(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        const { model } = this.props;
        const { add } = model;
        add.saving = true;
        await model.addTerm({
            name: add.name,
            parentId: add.parentId ? Number(add.parentId) : null,
            taxonomyId: model.taxonomy.id
        });
        runInAction(() => {
            add.name = '';
            add.parentId = '';
            add.saving = false;
            add.visible = false;
        });
    }

    private renderForm() {
        const { model } = this.props;
        const { add } = model;
        const canSave = !add.saving && Boolean(add.name);
        const saveIcon = add.saving && <i className='fas fa-circle-notch fa-spin' />;

        return (
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        disabled={add.saving}
                        onChange={e => (add.name = e.target.value)}
                        placeholder={`Enter ${model.taxonomy.name.toLowerCase()} name`}
                        ref={focus}
                        value={add.name}
                    />
                </div>

                <div className='form-group'>
                    <select
                        className='form-control'
                        disabled={add.saving}
                        onChange={e => (add.parentId = e.target.value)}
                        value={add.parentId}
                    >
                        {this.renderParentOptions()}
                    </select>
                </div>

                <div>
                    <button className='btn btn-default mr-2' disabled={add.saving} onClick={this.onCancel}>
                        Cancel
                    </button>

                    <button className='btn btn-primary' disabled={!canSave} type='submit'>
                        {saveIcon} Add {model.taxonomy.name}
                    </button>
                </div>
            </form>
        );
    }

    private renderOpenButton() {
        const { model } = this.props;
        return (
            <button className='btn btn-primary' key='button' onClick={this.onOpenButtonClick} type='button'>
                Add New {model.taxonomy.name}
            </button>
        );
    }

    private renderParentOptions() {
        const options = this.props.model.terms.map(term => (
            <option key={term.id} value={term.id}>
                {term.name}
            </option>
        ));
        options.unshift(
            <option key='' value=''>
                -- Select Parent --
            </option>
        );
        return options;
    }
}

export default HierarchicalAdd;

// interface OwnProps extends StoreProps {
//     taxonomy: ITaxonomy;
//     terms: ITerm[];
// }
// interface OwnState {}

// interface HierarchicalAddModel {
//     open: boolean;
//     parent: string;
//     saving: boolean;
//     text: string;
// }

// @observer
// class HierarchicalAdd extends React.Component<OwnProps, OwnState> {
//     readonly model: HierarchicalAddModel = observable.object({
//         open: false,
//         parent: '',
//         saving: false,
//         text: ''
//     });

//     render() {
//         return (
//             <div className='taxonomyWidget__hierarchicalAdd'>
//                 {!this.model.open && this.renderOpenButton()}
//                 {this.model.open && this.renderForm()}
//             </div>
//         );
//     }

//     @action.bound
//     private onCancel() {
//         this.model.parent = '';
//         this.model.text = '';
//         this.model.open = false;
//     }

//     @action.bound
//     private async onSubmit(e: React.FormEvent) {
//         e.preventDefault();
//         e.stopPropagation();
//         this.model.saving = true;
//         const term = await this.props.store.taxonomy.createTerm({
//             name: this.model.text,
//             parentId: this.model.parent ? Number(this.model.parent) : null,
//             taxonomyId: this.props.taxonomy.id
//         });
//         this.props.terms.push(term);
//         this.onCancel();
//     }

//     private renderForm() {
//         const canSave = !this.model.saving && !!this.model.text;
//         const saveIcon = this.model.saving && <i className='fas fa-circle-notch fa-spin' />;
//         return (
//             <form onSubmit={this.onSubmit}>
//                 <div className='form-group'>
//                     <input
//                         className='form-control'
//                         onChange={e => (this.model.text = e.target.value)}
//                         placeholder={`Enter ${this.props.taxonomy.name.toLowerCase()} name`}
//                         ref={focus}
//                         value={this.model.text}
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <select
//                         className='form-control'
//                         onChange={e => (this.model.parent = e.target.value)}
//                         value={this.model.parent}
//                     >
//                         {[...this.renderParentOptions()]}
//                     </select>
//                 </div>
//                 <div>
//                     <button
//                         className='btn btn-default mr-2'
//                         disabled={this.model.saving}
//                         onClick={this.onCancel}
//                         type='button'
//                     >
//                         Cancel
//                     </button>

//                     <button className='btn btn-primary' disabled={!canSave} type='submit'>
//                         {saveIcon} Add {this.props.taxonomy.name}
//                     </button>
//                 </div>
//             </form>
//         );
//     }

//     private renderOpenButton() {
//         return (
//             <button className='btn btn-primary' key='button' onClick={() => (this.model.open = true)} type='button'>
//                 Add New {this.props.taxonomy.name}
//             </button>
//         );
//     }

//     private *renderParentOptions() {
//         yield (
//             <option key='' value=''>
//                 -- Select Parent --
//             </option>
//         );
//         for (let term of this.props.terms) {
//             yield (
//                 <option key={term.id} value={term.id}>
//                     {term.name}
//                 </option>
//             );
//         }
//     }
// }

// export default withStore(HierarchicalAdd);
