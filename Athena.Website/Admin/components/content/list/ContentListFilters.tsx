import { observer } from 'mobx-react';
import * as React from 'react';
import { IPickListItem } from '../../../utility/utility.interfaces';
import { ContentFilterType, ContentListModel } from './model';

interface OwnProps {
    model: ContentListModel;
}
interface OwnState {}

const predicateBuilders = {
    category(value: string): ContentFilterType {
        const id = Number(value);
        return content => content.taxonomyTerms.some(term => term.taxonomyId === 1 && term.id === id);
    },

    date(value: string): ContentFilterType {
        const date = new Date(value);
        return content => {
            let contentDate = new Date(content.publishedAt || content.createdAt);
            contentDate = new Date(contentDate.toDateString());
            return contentDate.getTime() == date.getTime();
        };
    },

    tag(value: string): ContentFilterType {
        const id = Number(value);
        return content => content.taxonomyTerms.some(term => term.taxonomyId === 2 && term.id === id);
    }
};

@observer
class ContentListFilters extends React.Component<OwnProps, OwnState> {
    render() {
        const { model } = this.props;
        return (
            <div className='form-group form-row'>
                <div className='col-2'>
                    {this.renderFilterSelect('-- Select Author --', () => model.authors, 'author', null)}
                </div>

                <div className='col-2'>
                    {this.renderFilterSelect(
                        '-- Select Category --',
                        () => model.categories,
                        'category',
                        predicateBuilders.category
                    )}
                </div>

                <div className='col-2'>
                    {this.renderFilterSelect('-- Select Tag --', () => model.tags, 'tag', predicateBuilders.tag)}
                </div>

                <div className='col-2'>
                    {this.renderFilterSelect('-- Select Date --', () => model.dates, 'date', predicateBuilders.date)}
                </div>

                <div className='col' style={{ display: 'flex', alignItems: 'center' }}>
                    <a href='#' onClick={this.clearFilters}>
                        Clear filters
                    </a>
                </div>
            </div>
        );
    }

    private clearFilters = () => {
        this.props.model.filters.clear();
    };

    private renderFilterSelect(
        defaultValue: string,
        getItems: () => IPickListItem[],
        filterKey: string,
        predicateBuilder: (value: string) => ContentFilterType
    ) {
        const items = getItems();
        const options = items.map(item => (
            <option key={item.value} value={item.value}>
                {item.label}
            </option>
        ));
        const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value) {
                const predicate = predicateBuilder(e.target.value);
                this.props.model.filters.set(filterKey, {
                    predicate,
                    value: e.target.value
                });
            } else {
                this.props.model.filters.delete(filterKey);
            }
        };
        const currentValue = this.props.model.filters.get(filterKey);
        options.unshift(
            <option key='__default__' value=''>
                {defaultValue}
            </option>
        );
        return (
            <select className='form-control' onChange={onChange} value={(currentValue && currentValue.value) || ''}>
                {options}
            </select>
        );
    }
}

export default ContentListFilters;
