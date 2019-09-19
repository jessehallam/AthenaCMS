import { observable } from 'mobx';
import { Content } from '../../../ObjectModel/content/Content';
import { DashboardSpan } from './dashboard';

export class ContentEditorModel {
    @observable content: Content;
    @observable dashboard: DashboardSpan;
}
