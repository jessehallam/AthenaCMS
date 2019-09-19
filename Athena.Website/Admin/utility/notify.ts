import Noty = require('noty');
import 'noty/lib/noty.css';
import 'noty/lib/themes/bootstrap-v4.css';

const theme = 'bootstrap-v4';

class NotifyClient {
    defaults: Noty.Options = {
        timeout: 2000,
        theme
    };

    error(text: string, config: Noty.Options = {}) {
        return this.show({
            ...config,
            type: 'error',
            text
        });
    }

    show(config: Noty.Options) {
        new Noty({
            ...this.defaults,
            ...config
        }).show();
    }

    success(text: string, config: Noty.Options = {}) {
        return this.show({
            ...config,
            type: 'success',
            text
        });
    }
}

export default new NotifyClient();

// export function error(text: string, config: Noty.Options = {}) {
//     return show({
//         text,
//         ...config
//     });
// }

// export function show(config: Noty.Options) {
//     new Noty(config).show();
// }

// export function success(text: string, config: Noty.Options = {}) {
//     return show({
//         text,
//         ...config
//     });
// }
