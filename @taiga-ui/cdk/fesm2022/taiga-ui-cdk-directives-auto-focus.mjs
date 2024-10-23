import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { ElementRef, Renderer2, NgZone, inject, DestroyRef, Directive, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { race, timer, throttleTime, map, skipWhile, take } from 'rxjs';
import { WA_ANIMATION_FRAME, WA_WINDOW } from '@ng-web-apis/common';
import { TUI_IS_IOS } from '@taiga-ui/cdk/tokens';
import { tuiPx, tuiIsPresent, tuiCreateOptions, tuiCreateToken } from '@taiga-ui/cdk/utils';
import { tuiZonefreeScheduler } from '@taiga-ui/cdk/observables';

class AbstractTuiAutofocusHandler {
    constructor(el, options) {
        this.el = el;
        this.options = options;
    }
    get element() {
        // TODO: Remove when legacy controls are dropped
        const el = this.el.nativeElement.tagName.includes('-')
            ? this.el.nativeElement.querySelector(this.options.query)
            : this.el.nativeElement;
        return el || this.el.nativeElement;
    }
    get isTextFieldElement() {
        return this.element.matches(this.options.query);
    }
}

const TIMEOUT = 1000;
const NG_ANIMATION_SELECTOR = '.ng-animating';
class TuiDefaultAutofocusHandler extends AbstractTuiAutofocusHandler {
    constructor(el, animationFrame$, zone, options) {
        super(el, options);
        this.animationFrame$ = animationFrame$;
        this.zone = zone;
    }
    setFocus() {
        if (this.isTextFieldElement) {
            race(timer(this.options.delay || TIMEOUT), this.animationFrame$.pipe(throttleTime(100, tuiZonefreeScheduler(this.zone)), map(() => this.element.closest(NG_ANIMATION_SELECTOR)), skipWhile(Boolean), take(1))).subscribe(() => this.element.focus({ preventScroll: this.options.preventScroll }));
        }
        else {
            this.element.focus({ preventScroll: true });
        }
    }
}

const TEXTFIELD_ATTRS = [
    'type',
    'inputMode',
    'autocomplete',
    'accept',
    'min',
    'max',
    'step',
    'pattern',
    'size',
    'maxlength',
];
class TuiIosAutofocusHandler extends AbstractTuiAutofocusHandler {
    constructor(el, renderer, zone, win, options) {
        super(el, options);
        this.renderer = renderer;
        this.zone = zone;
        this.win = win;
    }
    setFocus() {
        if (this.isTextFieldElement) {
            this.zone.runOutsideAngular(() => this.iosWebkitAutofocus());
        }
        else {
            this.element.focus({ preventScroll: true });
        }
    }
    iosWebkitAutofocus() {
        const fakeInput = this.makeFakeInput();
        const duration = this.getDurationTimeBeforeFocus();
        let fakeFocusTimeoutId = 0;
        let elementFocusTimeoutId = 0;
        const blurHandler = () => fakeInput.focus({ preventScroll: true });
        const focusHandler = () => {
            clearTimeout(fakeFocusTimeoutId);
            fakeFocusTimeoutId = this.win.setTimeout(() => {
                clearTimeout(elementFocusTimeoutId);
                fakeInput.removeEventListener('blur', blurHandler);
                fakeInput.removeEventListener('focus', focusHandler);
                elementFocusTimeoutId = this.win.setTimeout(() => {
                    this.element.focus({ preventScroll: this.options.preventScroll });
                    fakeInput.remove();
                }, duration);
            });
        };
        fakeInput.addEventListener('blur', blurHandler, { once: true });
        fakeInput.addEventListener('focus', focusHandler);
        if (this.insideDialog()) {
            this.win.document.body.appendChild(fakeInput);
        }
        else {
            this.element.parentElement?.appendChild(fakeInput);
        }
        fakeInput.focus({ preventScroll: true });
    }
    /**
     * @note:
     * emulate textfield position in layout with cursor
     * before focus to real textfield element
     *
     * required note:
     * [fakeInput.readOnly = true] ~
     * don't use {readOnly: true} value, it's doesn't work for emulate autofill
     *
     * [fakeInput.style.opacity = 0] ~
     * don't use {opacity: 0}, sometimes it's doesn't work for emulate real input
     *
     * [fakeInput.style.fontSize = 16px] ~
     * disable possible auto zoom
     *
     * [fakeInput.style.top/left] ~
     * emulate position cursor before focus to real textfield element
     */
    makeFakeInput() {
        const fakeInput = this.renderer.createElement('input');
        const rect = this.element.getBoundingClientRect();
        this.patchFakeInputFromFocusableElement(fakeInput);
        fakeInput.style.height = tuiPx(rect.height);
        fakeInput.style.width = tuiPx(rect.width / 2);
        fakeInput.style.position = 'fixed';
        fakeInput.style.zIndex = '-99999999';
        fakeInput.style.caretColor = 'transparent';
        fakeInput.style.border = 'none';
        fakeInput.style.outline = 'none';
        fakeInput.style.color = 'transparent';
        fakeInput.style.background = 'transparent';
        fakeInput.style.cursor = 'none';
        fakeInput.style.fontSize = tuiPx(16);
        fakeInput.style.top = tuiPx(rect.top);
        fakeInput.style.left = tuiPx(rect.left);
        return fakeInput;
    }
    getDurationTimeBeforeFocus() {
        return (parseFloat(this.win
            .getComputedStyle(this.element)
            .getPropertyValue('--tui-duration')) || 0);
    }
    /**
     * @note:
     * unfortunately, in older versions of iOS
     * there is a bug that the fake input cursor
     * will move along with the dialog animation
     * and then that dialog will be shaking
     */
    insideDialog() {
        return !!this.element.closest('tui-dialog');
    }
    /**
     * @note:
     * inherit basic attributes values from real input
     * for help iOS detect what do you want see on keyboard,
     * for example [inputMode=numeric, autocomplete=cc-number]
     */
    patchFakeInputFromFocusableElement(fakeInput) {
        TEXTFIELD_ATTRS.forEach((attr) => {
            const value = this.element.getAttribute(attr);
            if (tuiIsPresent(value)) {
                fakeInput.setAttribute(attr, value);
            }
        });
    }
}

const [TUI_AUTOFOCUS_OPTIONS, tuiAutoFocusOptionsProvider] = tuiCreateOptions({
    delay: NaN,
    query: 'input, textarea, select, [contenteditable]',
    preventScroll: false,
});
const TUI_AUTOFOCUS_HANDLER = tuiCreateToken();
const TUI_AUTOFOCUS_PROVIDERS = [
    {
        provide: TUI_AUTOFOCUS_HANDLER,
        deps: [
            ElementRef,
            WA_ANIMATION_FRAME,
            Renderer2,
            NgZone,
            WA_WINDOW,
            TUI_IS_IOS,
            TUI_AUTOFOCUS_OPTIONS,
        ],
        useFactory: (el, animationFrame$, renderer, zone, win, isIos, options) => isIos
            ? new TuiIosAutofocusHandler(el, renderer, zone, win, options)
            : new TuiDefaultAutofocusHandler(el, animationFrame$, zone, options),
    },
];

class TuiAutoFocus {
    constructor() {
        this.handler = inject(TUI_AUTOFOCUS_HANDLER);
        this.options = inject(TUI_AUTOFOCUS_OPTIONS);
        this.destroyRef = inject(DestroyRef);
    }
    ngAfterViewInit() {
        if (this.autoFocus) {
            this.focus();
        }
    }
    focus() {
        if (Number.isNaN(this.options.delay)) {
            void Promise.resolve().then(() => this.handler.setFocus());
        }
        else {
            timer(this.options.delay)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.handler.setFocus());
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiAutoFocus, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "16.2.12", type: TuiAutoFocus, isStandalone: true, selector: "[tuiAutoFocus]", inputs: { autoFocus: ["tuiAutoFocus", "autoFocus", coerceBooleanProperty] }, providers: TUI_AUTOFOCUS_PROVIDERS, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiAutoFocus, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiAutoFocus]',
                    providers: TUI_AUTOFOCUS_PROVIDERS,
                }]
        }], propDecorators: { autoFocus: [{
                type: Input,
                args: [{
                        alias: 'tuiAutoFocus',
                        transform: coerceBooleanProperty,
                    }]
            }] } });

class TuiSynchronousAutofocusHandler extends AbstractTuiAutofocusHandler {
    setFocus() {
        this.element.focus({ preventScroll: true });
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { AbstractTuiAutofocusHandler, TUI_AUTOFOCUS_HANDLER, TUI_AUTOFOCUS_OPTIONS, TUI_AUTOFOCUS_PROVIDERS, TuiAutoFocus, TuiDefaultAutofocusHandler, TuiIosAutofocusHandler, TuiSynchronousAutofocusHandler, tuiAutoFocusOptionsProvider };
//# sourceMappingURL=taiga-ui-cdk-directives-auto-focus.mjs.map
