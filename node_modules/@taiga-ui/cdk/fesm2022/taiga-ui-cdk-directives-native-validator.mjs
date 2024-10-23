import * as i0 from '@angular/core';
import { inject, DestroyRef, NgZone, Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { tuiZonefree, tuiTakeUntilDestroyed } from '@taiga-ui/cdk/observables';
import { tuiInjectElement, tuiProvide } from '@taiga-ui/cdk/utils';
import { timer } from 'rxjs';

class TuiNativeValidator {
    constructor() {
        this.destroyRef = inject(DestroyRef);
        this.zone = inject(NgZone);
        this.el = tuiInjectElement();
        this.tuiNativeValidator = 'Invalid';
    }
    validate(control) {
        this.control = control;
        timer(0)
            .pipe(tuiZonefree(this.zone), tuiTakeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.handleValidation());
        return null;
    }
    handleValidation() {
        this.el.setCustomValidity?.(this.control?.touched && this.control?.invalid ? this.tuiNativeValidator : '');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiNativeValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiNativeValidator, isStandalone: true, selector: "[tuiNativeValidator]", inputs: { tuiNativeValidator: "tuiNativeValidator" }, host: { listeners: { "focusout": "handleValidation()" } }, providers: [tuiProvide(NG_VALIDATORS, TuiNativeValidator, true)], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiNativeValidator, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiNativeValidator]',
                    providers: [tuiProvide(NG_VALIDATORS, TuiNativeValidator, true)],
                    host: {
                        '(focusout)': 'handleValidation()',
                    },
                }]
        }], propDecorators: { tuiNativeValidator: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiNativeValidator };
//# sourceMappingURL=taiga-ui-cdk-directives-native-validator.mjs.map
