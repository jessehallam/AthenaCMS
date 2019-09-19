import * as React from 'react';
import PagePanel from '../../../../shared/PagePanel';
import { WidgetProps, withWidget } from '../../widget/context';
import { widget } from '../decorator';
import toolbar from './toolbar';

interface OwnProps extends WidgetProps {}
interface OwnState {}

class RichEditWidget extends React.Component<OwnProps, OwnState> {
    readonly div = React.createRef<HTMLDivElement>();
    quill: Quill;

    componentDidMount() {
        this.quill = new Quill(this.div.current, {
            modules: {
                toolbar
            },
            theme: 'snow'
        });
    }

    render() {
        const content = <div ref={this.div}></div>;
        return <PagePanel className='richEditWidget pagePanel--widget' content={content}></PagePanel>;
    }
}

widget('richedit', withWidget(RichEditWidget));
