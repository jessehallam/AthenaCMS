export type SubjectCallback<T> = (value?: T) => void;
export type SubjectSubscription = VoidFunction;

export class Subject<T> {
    private callbacks: Array<SubjectCallback<T>> = [];

    next(value?: T) {
        this.callbacks.forEach(callback => callback(value));
    }

    subscribe(callback: SubjectCallback<T>): SubjectSubscription {
        this.callbacks.push(callback);
        return () => {
            const i = this.callbacks.indexOf(callback);

            if (i >= 0) {
                this.callbacks.splice(i, 1);
            }
        };
    }
}
