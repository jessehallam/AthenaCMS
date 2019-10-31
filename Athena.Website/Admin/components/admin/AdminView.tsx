import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { toggleScrollEvent } from '../../event';
import { classList } from '../../utility/classList';
import AdminRouter from './AdminRouter';
import Header from './header/Header';

interface Model {
    enableScroll: boolean;
}

@observer
class AdminView extends React.Component {
    readonly model: Model = observable.object({ enableScroll: true });

    componentDidMount() {
        toggleScrollEvent.subscribe(value => {
            console.log('toggleScrollEvent:got value', value);
            this.model.enableScroll = value;
        });
    }

    render() {
        const contentBoxClasses = classList(
            'admin__mainContentBox',
            !this.model.enableScroll && 'admin__mainContentBox--disableScroll'
        );
        return (
            <div className='admin'>
                <Header />

                <div className={contentBoxClasses}>
                    <div className='admin__mainContentWrapper'>
                        <AdminRouter />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminView;
