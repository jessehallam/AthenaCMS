import { Quill as QuillType } from 'quill';
import * as RamdaExports from 'ramda';
import * as ReactExports from 'react';

declare global {
    export type Quill = QuillType;
    var Quill: typeof QuillType;
    var R: typeof RamdaExports;
    var React: typeof ReactExports;
}
