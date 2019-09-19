import { observable } from 'mobx';
import EditorWidget from '../../components/shared/widgets/editor/EditorWidget';
import MetaWidget from '../../components/shared/widgets/meta/MetaWidget';
import StatusWidget from '../../components/shared/widgets/status/StatusWidget';
import TaxonomyWidgetLoader from '../../components/shared/widgets/taxonomy/TaxonomyWidgetLoader';
import TitleWidget from '../../components/shared/widgets/title/TitleWidget';
import { RootStore } from '../rootStore';

export class DashboardStore {
    @observable widgets: Record<string, React.ComponentType> = {};

    constructor(private readonly root: RootStore) {
        this.widgets.editor = EditorWidget;
        this.widgets.meta = MetaWidget;
        this.widgets.status = StatusWidget;
        this.widgets.taxonomy = TaxonomyWidgetLoader;
        this.widgets.title = TitleWidget;
    }
}
