export interface CustomRule {
    custom: (value: any) => string | true;
    message: string;
}

export interface RegexRule {
    message: string;
    regex: RegExp;
}

export interface RequiredRule {
    message: string;
    required: true;
}

export type ValidationRule = CustomRule | RegexRule | RequiredRule;

const isCustomRule = (rule: ValidationRule): rule is CustomRule => typeof (rule as CustomRule).custom === 'function';
const isRegexRule = (rule: ValidationRule): rule is RegexRule => (rule as RegexRule).regex instanceof RegExp;
const isRequiredRule = (rule: ValidationRule): rule is RequiredRule => (rule as RequiredRule).required === true;

export type ValidatorFunc = (value: any) => true | string;

export function getValidator(rules: ValidationRule[]): ValidatorFunc {
    if (!rules || !rules.length) return () => true;
    return value => {
        for (let rule of rules) {
            if (isCustomRule(rule)) {
                let customResult = rule.custom(value);
                if (typeof customResult === 'string') return customResult;
            }
            if (isRegexRule(rule)) {
                if (!rule.regex.test(value)) return rule.message;
            }
            if (isRequiredRule(rule) && !value) return rule.message;
        }
        return true;
    };
}
