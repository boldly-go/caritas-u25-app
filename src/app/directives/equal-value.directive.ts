import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[u25EqualValue]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EqualValueDirective, multi: true }]
})
export class EqualValueDirective implements Validator {
    @Input() u25EqualValue: string;

    constructor() {}

    validate(control: AbstractControl): ValidationErrors | null {
        return equalValueValidator(this.u25EqualValue)(control);
    }
}

export function equalValueValidator(toCompare: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const equal = toCompare === control.value;
        return equal ? null : { notEqual: true };
    };
}
