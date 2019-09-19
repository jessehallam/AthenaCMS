import { observer } from 'mobx-react';
import * as React from 'react';
import { Content } from '../../../ObjectModel/content/Content';

interface OwnProps {
    contents: Content[];
    onSelect: (item: Content) => void;
}

interface OwnState {}

@observer
export default class MediaGrid extends React.Component<OwnProps, OwnState> {
    render() {
        return (
            <div className='mediaGrid'>
                <ul className='mediaGrid__list'>{this.renderListItems()}</ul>
            </div>
        );
    }

    private renderListItems() {
        return this.props.contents.map((content, i) => {
            const url = content.customFields.find(x => x.fieldKey === 'media:url').fieldValue;
            const css: React.CSSProperties = {
                backgroundImage: `url(${url})`
            };

            return (
                <li className='mediaGrid__listItem' key={i} onClick={() => this.props.onSelect(content)}>
                    <div className='mediaGrid__listItemContent' style={css} />
                </li>
            );
        });
    }
}
