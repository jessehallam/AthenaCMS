import { computed, observable, toJS } from 'mobx';
import * as React from 'react';
import { InputConfig } from './Form';
import { getValidator, ValidatorFunc } from './validation';

import _get = require('lodash.get');
import _set = require('lodash.set');

const formContext = React.createContext<FormContext>(null);

export class FieldContext {
    @observable
    private _valid: true | string;
    private validator: ValidatorFunc;

    constructor(private data: any, private _config: InputConfig) {
        this.validator = getValidator(_config.rules);
    }

    get config(): Readonly<InputConfig> {
        return this._config;
    }

    @computed
    get valid(): boolean {
        return this._valid === true || this._valid === null || this._valid === void 0;
    }

    @computed
    get validationError(): string {
        if (typeof this._valid === 'string') return this._valid;
    }

    @computed
    get value(): any {
        return _get(this.data, this.config.id);
    }

    set value(val: any) {
        _set(this.data, this.config.id, val);
        if (!this.valid) this.validate();
    }

    reset() {
        this.value = this.getInitialValue();
        this._valid = null;
    }

    validate(): boolean {
        this._valid = this.validator(this.value);
        return this.valid;
    }

    private getInitialValue() {
        let value =
            typeof this.config.initialValue === 'function' ? this.config.initialValue() : this.config.initialValue;

        return value === null || value === void 0 ? '' : value;
    }
}

export default class FormContext {
    @observable
    private data: any = {};

    @observable
    private fields: Map<string, FieldContext> = observable.map();

    getField(config: InputConfig) {
        if (this.fields.has(config.id)) return this.fields.get(config.id);

        const context = new FieldContext(this.data, config);
        this.fields.set(config.id, context);
        return context;
    }

    reset() {
        for (let [_, field] of this.fields) {
            field.reset();
        }
    }

    submit() {
        const data = toJS(this.data);
        const valid = Array.from(this.fields.values()).every(field => field.valid);
        return { data, valid };
    }

    unregisterField(field: FieldContext) {
        if (!this.fields[field.config.id]) throw new Error(`Field ${field.config.id} is not registered.`);

        this.fields.delete(field.config.id);
    }

    validate() {
        for (let [_, field] of this.fields) {
            if (!field.validate()) return false;
        }
        return true;
    }

    static readonly Consumer = formContext.Consumer;
    static readonly Provider = formContext.Provider;
}
