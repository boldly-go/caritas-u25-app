import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[u25SecurePassword]',
    providers: [{ provide: NG_VALIDATORS, useExisting: SecurePasswordDirective, multi: true }]
})
export class SecurePasswordDirective implements Validator {
    constructor() {}

    validate(control: AbstractControl): ValidationErrors | null {
        return securePasswordValidator()(control);
    }
}

export function securePasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const regExp = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{10,}');
        const securePassword = regExp.test(control.value);
        return securePassword ? null : { insecurePassword: false };
    };
}
