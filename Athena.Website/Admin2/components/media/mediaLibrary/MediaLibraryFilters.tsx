import { observer } from 'mobx-react';
import * as React from 'react';
import { IPickListItem } from '../../../utility/utility.interfaces';
import { IContentFilter } from '../../shared/ContentFilterModel';
import MediaLibraryModel from './MediaLibraryModel';

interface OwnProps {
    model: MediaLibraryModel;
}
interface OwnState {}

const style: React.CSSProperties = { width: 'auto' };

@observer
export default class MediaLibraryFilters extends React.Component<OwnProps, OwnState> {
    render() {
        const { model } = this.props;
        const { filters } = model;

        return [
            this.renderFilterSelect('-- Select Category --', () => filters.categories, filters.category),
            this.renderFilterSelect('-- Select Tag --', () => filters.tags, filters.tag),
            this.renderFilterSelect('-- Select Date --', () => filters.dates, filters.date)
        ];
    }

    private renderFilterSelect(
        defaultLabel: string,
        getItems: () => IPickListItem[],
        filter: IContentFilter<IPickListItem>
    ) {
        const items = getItems();
        items.unshift({ item: null, label: defaultLabel, value: '' });

        const options = items.map(item => (
            <option key={item.value} value={item.value}>
                {item.label}
            </option>
        ));

        const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const item = items.find(x => x.value === event.target.value);
            filter.value = item.value ? item : null;
        };

        const value = (filter.value && filter.value.value) || '';

        return (
            <select className='form-control mr-3' key={defaultLabel} onChange={onChange} style={style} value={value}>
                {options}
            </select>
        );
    }
}
