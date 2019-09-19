import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ICustomField } from '../../../../../stores/interfaces';
import PagePanel from '../../../../shared/PagePanel';
import { WidgetProps, withWidget } from '../../widget/context';
import { widget } from '../decorator';

interface OwnProps extends WidgetProps {}
interface OwnState {}

@observer
class MetaWidget extends React.Component<OwnProps, OwnState> {
    private addItem = observable.object<ICustomField>({
        fieldKey: '',
        fieldValue: ''
    });

    get content() {
        return this.props.model.content;
    }

    get customFields() {
        return this.content.customFields;
    }

    render() {
        if (!this.props.model) return null;
        return (
            <PagePanel className='metaWidget pagePanel--widget' content={this.renderContent()} title='Custom Fields' />
        );
    }

    private onAdd = () => {
        this.customFields.push(this.addItem);
        this.addItem = observable.object<ICustomField>({ fieldKey: '', fieldValue: '' });
    };

    private onRemove = (field: ICustomField) => {
        const i = this.customFields.indexOf(field);
        if (i >= 0) {
            this.customFields.splice(i, 1);
        }
    };
    private renderContent() {
        return [
            <div className='row' key='add_row'>
                <div className='col'>
                    <div className='metaWidget__addPanel'>
                        <div className='form-row mb-2'>
                            <div className='col'>
                                <input
                                    className='form-control'
                                    onChange={e => (this.addItem.fieldKey = e.target.value)}
                                    placeholder='Field name'
                                    value={this.addItem.fieldKey}
                                />
                            </div>
                            <div className='col'>
                                <input
                                    className='form-control'
                                    onChange={e => (this.addItem.fieldValue = e.target.value)}
                                    placeholder='Field value'
                                    value={this.addItem.fieldValue}
                                />
                            </div>
                        </div>
                        <div>
                            <button className='btn btn-primary' onClick={this.onAdd} type='button'>
                                Add Field
                            </button>
                        </div>
                    </div>
                </div>
            </div>,

            <div className='row' key='table_row'>
                <div className='col'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Field name</th>
                                <th>Field value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderFieldRows()}</tbody>
                    </table>
                </div>
            </div>
        ];
    }

    private renderFieldRows() {
        return this.customFields.map((field, i) => (
            <tr key={i}>
                <td>
                    <input
                        className='form-control'
                        disabled={field.protected}
                        onChange={e => (field.fieldKey = e.target.value)}
                        value={field.fieldKey}
                    />
                </td>
                <td>
                    <input
                        className='form-control'
                        disabled={field.protected}
                        onChange={e => (field.fieldValue = e.target.value)}
                        value={field.fieldValue}
                    />
                </td>
                <td>
                    <button
                        className='btn btn-sm btn-danger'
                        disabled={field.protected}
                        onClick={this.onRemove.bind(null, field)}
                        style={{ marginTop: 3 }}
                        type='button'
                    >
                        <i className='fas fa-trash'></i>
                    </button>
                </td>
            </tr>
        ));
    }
}

widget('meta', withWidget(MetaWidget));
