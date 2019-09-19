import * as mobxObj from 'mobx';
import * as mobxReactObj from 'mobx-react';
import * as ReactObj from 'react';

declare global {
    var mobx: typeof mobxObj;
    var mobxReact: typeof mobxReactObj;
    var React: typeof ReactObj;
}
