export function after(startTime: Date, interval: number): Promise<void> {
    const elapsed = Date.now() - startTime.getTime();

    if (elapsed < interval) {
        return delay(interval - elapsed);
    }

    return Promise.resolve();
}

export function delay(timeout: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
