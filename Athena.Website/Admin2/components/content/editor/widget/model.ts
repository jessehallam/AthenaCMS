import { observable } from 'mobx';
import { IContent, IContentType } from '../../../../stores/interfaces';

export class WidgetModel<TOptions = any> {
    @observable
    content: IContent;

    @observable
    contentType: IContentType;

    @observable
    loaded: boolean;

    @observable
    name: string;

    @observable
    options: TOptions;
}
