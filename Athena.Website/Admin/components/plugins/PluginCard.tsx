import React = require('react');
import { IPlugin } from '../../stores/interfaces';

export interface PluginCardProps {
    plugin: IPlugin;
}

export default function PluginCard(props: PluginCardProps) {
    const { plugin } = props;
    return (
        <div className='card  pluginCard' style={{ width: '24rem' }}>
            <div className='card-body'>
                <h5 className='card-title pluginCard__displayName'>{plugin.displayName}</h5>
                <div>
                    <p className='card-text pluginCard__description'>{plugin.description}</p>

                    <dl className='pluginCard__details'>
                        <dt>Author:</dt>
                        <dd>{plugin.author.name}</dd>

                        <dt>Version:</dt>
                        <dd>{plugin.version}</dd>
                    </dl>

                    <button className='btn btn-default' type='button'>
                        <i className='fas fa-cogs' style={{ marginRight: '.5rem' }} /> Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
