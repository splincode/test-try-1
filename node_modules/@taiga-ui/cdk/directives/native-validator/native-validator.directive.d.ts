import type { AbstractControl, Validator } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class TuiNativeValidator implements Validator {
    private readonly destroyRef;
    private readonly zone;
    private readonly el;
    private control?;
    tuiNativeValidator: string;
    validate(control: AbstractControl): null;
    protected handleValidation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiNativeValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiNativeValidator, "[tuiNativeValidator]", never, { "tuiNativeValidator": { "alias": "tuiNativeValidator"; "required": false; }; }, {}, never, never, true, never>;
}
