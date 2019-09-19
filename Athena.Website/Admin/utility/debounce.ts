export function debounce<ResultFn extends (this: any, ...args: any[]) => ReturnType<ResultFn>>(
    callback: ResultFn,
    delay: number
) {
    let handle: number;
    let fn = function(...args: any[]) {
        window.clearTimeout(handle);
        handle = window.setTimeout(() => callback.apply(this, args), delay);
    };
    return fn;
}
