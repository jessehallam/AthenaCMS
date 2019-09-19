import { action, observable } from 'mobx';

export type LoginAction = 'login' | 'register';

export default class LoginModel {
    @observable action: LoginAction = 'login';
    @observable busy: boolean = false;
    @observable error: string = '';
    @observable username: string = '';
    @observable password: string = '';
    @observable visible: boolean = false;

    @action.bound
    reset() {
        this.username = '';
        this.password = '';
    }
}
