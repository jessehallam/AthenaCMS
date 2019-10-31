import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { StoreProps, withStore } from '../../../../../stores/withStore';
import { delay } from '../../../../../utility/delay';
import notify from '../../../../../utility/notify';
import { assignObservable } from '../../../../../utility/observable';
import PagePanel from '../../../../shared/PagePanel';
import { WidgetProps, withWidget } from '../../widget/context';
import { widget } from '../decorator';

interface OwnProps extends StoreProps, WidgetProps {}
interface OwnState {}

interface Model {
    saving: boolean;
}

@observer
class StatusWidget extends React.Component<OwnProps, OwnState> {
    readonly model: Model = observable.object({ saving: false });

    render() {
        if (!this.props.model) return null;
        return <PagePanel className='statusWidget pagePanel--widget' content={this.renderContent()} />;
    }

    @action.bound
    private onChangeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
        const { content } = this.props.model;
        const value: typeof content.status = e.target.value as any;
        content.status = value;
    }

    @action.bound
    private async onSaveChanges() {
        this.model.saving = true;
        const throttle = delay(1000);
        const update = this.props.store.content.updateContentAsync(this.props.model.content);

        Promise.all([update, throttle]).then(
            action('success', result => {
                assignObservable(this.props.model.content, result[0]);
                this.model.saving = false;
                notify.success('Content saved.');
            }),
            action('fail', reason => {
                console.error(reason);
                this.model.saving = false;
                notify.error('Error saving content.');
            })
        );
    }

    private renderContent() {
        const saveIcon = this.model.saving && <i className='fas fa-circle-notch fa-spin' />;
        return (
            <div className='row'>
                <div className='col'>
                    {this.renderSelectBox()}

                    <div className='mt-3'>
                        <strong>Published</strong> on <strong>Oct 19, 2019 @ 4:16pm</strong>
                    </div>
                    <div className='mt-3 text-right'>
                        <button
                            className='btn btn-primary'
                            disabled={this.model.saving}
                            onClick={this.onSaveChanges}
                            type='button'
                        >
                            {saveIcon} Save Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private renderSelectBox() {
        return (
            <select className='form-control' onChange={this.onChangeStatus} value={this.props.model.content.status}>
                <option value='draft'>Draft</option>
                <option value='published'>Published</option>
            </select>
        );
    }
}

widget('status', withWidget(withStore(StatusWidget)));
