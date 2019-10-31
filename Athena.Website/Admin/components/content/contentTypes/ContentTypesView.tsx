import { observer } from 'mobx-react';
import { StoreProps, withStore } from '../../../stores/withStore';
import PageHeader from '../../shared/PageHeader';
import ContentTypeListPanel from './ContentTypeListPanel';
import ContentTypesModel from './models/ContentTypesModel';

interface OwnProps extends StoreProps {}

@observer
class ContentTypesView extends React.Component<OwnProps> {
    readonly model = new ContentTypesModel(this.props.store);

    componentDidMount() {
        this.model.getContentTypesAsync();
    }

    render() {
        return (
            <div>
                <PageHeader actionBar={this.renderActionBar()} title='Content Management' />

                {this.model.delete.renderer}
                {this.model.edit.renderer}

                <div className='row'>
                    <div className='col-7'>
                        <ContentTypeListPanel model={this.model} />
                    </div>
                </div>
            </div>
        );
    }

    private renderActionBar() {
        const onAdd = () => this.model.edit.show();

        return (
            <button className='btn btn-primary' onClick={onAdd} type='button'>
                Add Content Type
            </button>
        );
    }
}

export default withStore(ContentTypesView);
