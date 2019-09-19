export type EqualityFn = (newArgs: any[], lastArgs: any[]) => boolean;

function defaultEqualityFn(newInputs: unknown[], oldInputs: unknown[]): boolean {
    if (newInputs.length !== oldInputs.length) {
        return false;
    }

    for (let i = 0; i < newInputs.length; i++) {
        if (newInputs[i] !== oldInputs[i]) {
            return false;
        }
    }

    return true;
}

export function memoizeOne<ResultFn extends (this: any, ...args: any[]) => ReturnType<ResultFn>>(
    resultFn: ResultFn,
    isEqual: EqualityFn = defaultEqualityFn
) {
    let lastThis: unknown;
    let lastArgs: unknown[] = [];
    let lastResult: ReturnType<ResultFn>;
    let calledOnce: boolean = false;

    return function memoized(this: unknown, ...newArgs: unknown[]): ReturnType<ResultFn> {
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }

        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    };
}

export function memoizeMany<ResultFn extends (this: any, ...args: any[]) => ReturnType<ResultFn>>(
    resultFn: ResultFn,
    isEqual: EqualityFn = defaultEqualityFn
) {
    interface MemoizeRecord {
        this: unknown;
        args: unknown[];
        result: ReturnType<ResultFn>;
    }

    const records: MemoizeRecord[] = [];

    return function memoized(this: unknown, ...newArgs: unknown[]): ReturnType<ResultFn> {
        for (let i = 0; i < records.length; i++) {
            const r = records[i];
            if (r.this === this && isEqual(newArgs, r.args)) {
                return r.result;
            }
        }

        let record: MemoizeRecord = {
            args: newArgs,
            result: resultFn.apply(this, newArgs),
            this: this
        };

        records.push(record);
        return record.result;
    };
}
