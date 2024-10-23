import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Directive } from '@angular/core';
import { tuiInjectElement, tuiIsHTMLElement, tuiContainsOrAfter } from '@taiga-ui/cdk/utils/dom';
import { tuiGetNativeFocused, tuiBlurNativeFocused, tuiGetClosestFocusable } from '@taiga-ui/cdk/utils/focus';

class TuiFocusTrap {
    constructor() {
        this.doc = inject(DOCUMENT);
        this.el = tuiInjectElement();
        this.activeElement = tuiGetNativeFocused(this.doc);
        /**
         * This would cause currently focused element to lose focus,
         * but it might cause ExpressionChanged error due to potential HostBinding.
         * Microtask keeps it in the same frame but allows change detection to run
         */
        void Promise.resolve().then(() => this.el.focus());
    }
    ngOnDestroy() {
        tuiBlurNativeFocused(this.doc);
        /**
         * HostListeners are triggered even after ngOnDestroy
         * {@link https://github.com/angular/angular/issues/38100}
         * so we need to delay it but stay in the same sync cycle,
         * therefore using Promise instead of setTimeout
         */
        // eslint-disable-next-line
        Promise.resolve().then(() => {
            if (tuiIsHTMLElement(this.activeElement)) {
                this.activeElement.focus();
            }
        });
    }
    onFocusIn(node) {
        if (!tuiContainsOrAfter(this.el, node)) {
            tuiGetClosestFocusable({
                initial: this.el,
                root: this.el,
            })?.focus();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFocusTrap, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiFocusTrap, isStandalone: true, selector: "[tuiFocusTrap]", host: { attributes: { "tabIndex": "0" }, listeners: { "window:focusin.silent": "onFocusIn($event.target)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFocusTrap, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiFocusTrap]',
                    host: {
                        tabIndex: '0',
                        '(window:focusin.silent)': 'onFocusIn($event.target)',
                    },
                }]
        }], ctorParameters: function () { return []; } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiFocusTrap };
//# sourceMappingURL=taiga-ui-cdk-directives-focus-trap.mjs.map
