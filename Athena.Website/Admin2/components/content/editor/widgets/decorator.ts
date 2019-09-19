import { store } from '../../../../global';

export interface IWidgetFactory {
    (name: string): ClassDecorator;
    <TFunction extends Function>(name: string, o: TFunction): TFunction;
}

export const widget: IWidgetFactory = function<TFunction extends Function>(name: string, o?: TFunction) {
    if (o !== void 0) {
        store.admin.widgets.set(name, o as any);
        return o;
    } else {
        return constructor => {
            store.admin.widgets.set(name, constructor as any);
        };
    }
};
