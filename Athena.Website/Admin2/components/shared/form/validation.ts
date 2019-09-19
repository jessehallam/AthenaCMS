export interface CustomRule {
    custom: (value: any) => true | string;
    message: string;
}

export interface RequiredRule {
    message: string;
    required: true;
}

export interface RegExpRule {
    message: string;
    regex: RegExp;
}

export type ValidationRule = CustomRule | RequiredRule | RegExpRule;

const isRegExpRule = (rule: ValidationRule): rule is RegExpRule => (rule as RegExpRule).regex instanceof RegExp;
const isRequiredRule = (rule: ValidationRule): rule is RequiredRule => (rule as RequiredRule).required === true;

export type InputValidator = (value: any) => true | string;

export function createValidator(rules: ValidationRule[]): InputValidator {
    if (!rules) return () => true;
    return (value: any) => {
        for (let rule of rules) {
            if (isRequiredRule(rule)) {
                if (!value) return rule.message;
            } else if (isRegExpRule(rule)) {
                if (!rule.regex.test(value)) return rule.message;
            } else {
                let customResult = rule.custom(value);
                if (typeof customResult === 'string') {
                    return customResult;
                }
            }
        }
        return true;
    };
}
