export function after(startTime: Date, interval: number): Promise<void> {
    const elapsed = Date.now() - startTime.getTime();

    if (elapsed < interval) {
        return delay(interval - elapsed);
    }

    return Promise.resolve();
}

after.begin = async function(minRuntime: number, cb: Function) {
    const startTime = new Date();
    const result = cb();

    if (result instanceof Promise) {
        await result;
    }

    return after(startTime, minRuntime);
};

export function delay(timeout: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
