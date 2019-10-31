import { IObservableArray, observable } from 'mobx';
import { IContent } from '../../../stores/interfaces';
import ContentFilterModel from '../../shared/ContentFilterModel';

class MediaLibraryFilterModel extends ContentFilterModel {}

export default class MediaLibraryModel {
    @observable
    contents: IObservableArray<IContent> = observable.array();

    @observable
    loaded: boolean = false;

    @observable
    filters = new MediaLibraryFilterModel(this.contents);
}
