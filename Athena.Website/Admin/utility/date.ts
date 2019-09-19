import * as dateFns from 'date-fns';

const dateFormat = 'iiii d, yyyy';

export function formatDate(date: string | Date) {
    return dateFns.format(toDate(date), dateFormat);
}

export function toDate(date: string | Date) {
    if (typeof date === 'string') return new Date(date);
    return date;
}
