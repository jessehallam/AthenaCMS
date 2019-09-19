import { observer } from 'mobx-react';
import * as React from 'react';
import { StoreProps, withStore } from '../../stores/withStore';
import PageHeader from '../shared/PageHeader';
import PluginCard from './PluginCard';
import PluginsModel from './PluginsModel';

interface OwnProps extends StoreProps {}
interface OwnState {}

@observer
class PluginsView extends React.Component<OwnProps, OwnState> {
    readonly model = new PluginsModel(this.props.store);

    componentDidMount() {
        this.model.load();
    }

    render() {
        return (
            <div>
                <PageHeader title='Plugin Management' />

                <div className='row'>{this.renderPluginCards()}</div>
            </div>
        );
    }

    private renderPluginCards() {
        if (!this.model.plugins.length) {
            return (
                <div className='col'>
                    <p>No plugins are installed.</p>
                </div>
            );
        } else {
            return this.model.plugins.map(plugin => <PluginCard key={plugin.name} plugin={plugin} />);
        }
    }
}

export default withStore(PluginsView);
