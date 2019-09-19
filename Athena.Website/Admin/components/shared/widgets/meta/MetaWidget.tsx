import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ICustomField } from '../../../../ObjectModel/interfaces';
import PagePanel from '../../PagePanel';
import { withWidget, WithWidgetProps } from '../Context';
import AddPartial from './AddPartial';
import ListItem from './ListItem';

export interface IViewCustomField extends ICustomField {
    created?: boolean;
    deleted?: boolean;
}

interface OwnProps extends WithWidgetProps {}
interface OwnState {}

@observer
class MetaWidget extends React.Component<OwnProps, OwnState> {
    get content() {
        return this.props.editor.content;
    }

    get items(): IViewCustomField[] {
        return this.content.customFields;
    }

    render() {
        return <PagePanel content={this.renderContent()} title='Custom Fields' />;
    }

    @action.bound
    private onAddCustomField(name: string, value: string) {
        const item: IViewCustomField = { fieldKey: name, fieldValue: value, id: null };
        this.items.push(item);
    }

    @action.bound
    private onDeleteItem(item: IViewCustomField) {
        item.deleted = true;
        setTimeout(() => {
            const i = this.items.indexOf(item);
            if (i >= 0) this.items.splice(i, 1);
        }, 500);
    }

    private renderContent() {
        return (
            <div className='widgetMeta'>
                <AddPartial onAddItem={this.onAddCustomField} />
                <ul className='widgetMeta__metaList'>{this.renderListItems()}</ul>
            </div>
        );
    }

    private renderListItems() {
        return this.items.map((item, i) => {
            return <ListItem item={item} key={i} onDelete={() => this.onDeleteItem(item)} />;
        });
    }
}

export default withWidget(MetaWidget);
