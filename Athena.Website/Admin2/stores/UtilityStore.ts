import * as dateFn from 'date-fns';
import { RootStore } from './RootStore';

export class UtilityStore {
    constructor(private root: RootStore) {}

    formatDate(date: string | Date) {
        return dateFn.format(new Date(date), 'yyyy/MM/dd');
    }
}
