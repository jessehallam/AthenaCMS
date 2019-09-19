import * as Noty from 'noty';

require('noty/lib/noty.css');
require('noty/lib/themes/bootstrap-v4.css');

type ButtonCallback = (noty: Noty) => void;

class Notification {
    private noty: Noty;

    constructor(private readonly options: Noty.Options) {}

    button(text: string, className: string, callback: ButtonCallback) {
        this.options.buttons = this.options.buttons || [];
        this.options.buttons.push(
            Noty.button(text, className, () => {
                callback.call(null, this.noty);
            })
        );
    }

    show() {
        this.noty = new Noty(this.options);
        this.noty.show();
    }
}

class Notify {
    constructor(private defaults: Noty.Options) {}

    create(options: Noty.Options) {
        return new Notification({ ...this.defaults, ...options });
    }

    button(text: string, className: string, callback: Function) {
        return Noty.button(text, className, callback);
    }

    error(text: string, options?: Noty.Options) {
        this.show({ ...options, text, type: 'error' });
    }

    show(options: Noty.Options) {
        this.create(options).show();
    }

    success(text: string, options?: Noty.Options) {
        this.show({ ...options, text, type: 'success' });
    }

    warning(text: string, options?: Noty.Options) {
        this.show({ ...options, text, type: 'error' });
    }
}

export default new Notify({ timeout: 2000, theme: 'bootstrap-v4' });
