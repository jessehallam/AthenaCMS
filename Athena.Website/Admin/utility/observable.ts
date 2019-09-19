import { set } from 'mobx';

export const assignObservable = <T extends object>(target: T, values: any) => {
    set(target, values);
    return target;
};
