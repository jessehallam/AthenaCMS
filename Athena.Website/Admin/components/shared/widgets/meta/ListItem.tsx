import { observer } from 'mobx-react';
import * as React from 'react';
import { classList } from '../../../../utility/classList';
import { IViewCustomField } from './MetaWidget';

interface OwnProps {
    item: IViewCustomField;
    onDelete: VoidFunction;
}

export default observer(function ListItem({ item, onDelete }: OwnProps) {
    console.log('Render ListItem');
    const classes = classList('widgetMeta__listItem', item.deleted && 'widgetMeta__listItem--deleted');
    return (
        <li className={classes}>
            <div className='widgetMeta__metaWrapper'>
                <div className='widgetMeta__nameWrapper'>
                    <div className='input-group'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Name</span>
                        </div>
                        <input
                            className='form-control'
                            onChange={e => (item.fieldKey = e.target.value)}
                            readOnly={item.private}
                            type='text'
                            value={item.fieldKey}
                        />
                    </div>
                </div>

                <div className='widgetMeta__valueWrapper'>
                    <div className='input-group'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Value</span>
                        </div>
                        <input
                            className='form-control'
                            onChange={e => (item.fieldValue = e.target.value)}
                            readOnly={item.private}
                            type='text'
                            value={item.fieldValue}
                        />
                    </div>
                </div>

                <div className='widgetMeta__actionWrapper'>
                    <button className='btn btn-danger btn-sm' disabled={item.private} onClick={onDelete} type='button'>
                        <i className='fas fa-trash' />
                    </button>
                </div>
            </div>
        </li>
    );
});
