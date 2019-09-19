import { observable } from 'mobx';
import { InputConfig } from './Input';
import { createValidator, InputValidator } from './validation';

export class Control {
    @observable config: InputConfig;
    private readonly validator: InputValidator;

    @observable private validOrError: true | string = true;

    constructor(config: InputConfig) {
        this.config = { ...config };
        this.value = this.config.initialValue;
        this.validator = createValidator(this.config.rules);
    }

    get error(): string {
        return this.validOrError === true ? null : this.validOrError;
    }

    get isValid(): boolean {
        return this.validOrError === true;
    }

    @observable value: any;

    reset() {
        this.value = this.config.initialValue;
    }

    update(config: Partial<InputConfig>) {}

    validate() {
        this.validOrError = this.validator(this.value);
    }
}
