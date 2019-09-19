export function classList(...classes: any[]) {
    return classes.filter(cls => cls && typeof cls === 'string').join(' ');
}
