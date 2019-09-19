import { isObservable, set } from 'mobx';

export function assignObservable<T>(dest: T, source: Partial<T>) {
    if (!isObservable(dest)) throw new Error('Cannot assignObservable to a non-observable object.');

    set(dest, source);
    return dest;
}
