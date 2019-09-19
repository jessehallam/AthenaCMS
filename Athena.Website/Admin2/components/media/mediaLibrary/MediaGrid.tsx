import * as React from 'react';
import { IContent } from '../../../stores/interfaces';

interface OwnProps {
    contents: IContent[];
    onClick: (content: IContent) => void;
}

const mediaUrl = (content: IContent) => content.customFields.find(x => x.fieldKey === 'media:url').fieldValue;
const gridItemCss = (content: IContent): React.CSSProperties => ({
    backgroundImage: 'url(' + encodeURI(mediaUrl(content)) + ')'
});

export default function MediaGrid(props: OwnProps) {
    const items = props.contents.map((content, i) => (
        <li className='mediaLibrary__gridItem' key={i} onClick={() => props.onClick(content)}>
            <div className='mediaLibrary__gridItemContent' style={gridItemCss(content)} />
        </li>
    ));

    return (
        <div className='mediaLibrary__grid'>
            <ul className='mediaLibrary__gridList'>{items}</ul>
        </div>
    );
}
