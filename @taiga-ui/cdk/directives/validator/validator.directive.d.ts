import type { OnChanges, OnDestroy } from '@angular/core';
import type { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class TuiValidator implements Validator, OnChanges, OnDestroy {
    private onChange;
    tuiValidator: ValidatorFn;
    validate(control: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(onChange: (...args: any[]) => void): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiValidator, "[tuiValidator]", never, { "tuiValidator": { "alias": "tuiValidator"; "required": false; }; }, {}, never, never, true, never>;
}
