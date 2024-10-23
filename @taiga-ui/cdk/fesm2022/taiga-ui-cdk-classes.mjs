import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { inject, signal, ChangeDetectorRef, computed, Directive, Input, INJECTOR, ViewContainerRef, ViewChild, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl, NgModel } from '@angular/forms';
import { EMPTY_FUNCTION } from '@taiga-ui/cdk/constants';
import { TUI_FALLBACK_VALUE } from '@taiga-ui/cdk/tokens';
import { tuiPure, tuiProvide } from '@taiga-ui/cdk/utils';
import { Subject, delay, startWith, map, filter, distinctUntilChanged, switchMap, merge, EMPTY } from 'rxjs';

class TuiValueTransformer {
}

const FLAGS = { self: true, optional: true };
/**
 * Basic ControlValueAccessor class to build form components upon
 */
class TuiControl {
    constructor() {
        this.fallback = inject(TUI_FALLBACK_VALUE, FLAGS);
        this.refresh$ = new Subject();
        this.pseudoInvalid = signal(null);
        this.internal = signal(this.fallback);
        this.control = inject(NgControl, { self: true });
        this.cdr = inject(ChangeDetectorRef);
        this.transformer = inject(TuiValueTransformer, FLAGS);
        this.value = computed(() => this.internal() ?? this.fallback);
        this.readOnly = signal(false);
        this.touched = signal(false);
        this.status = signal(undefined);
        this.disabled = computed(() => this.status() === 'DISABLED');
        this.interactive = computed(() => !this.disabled() && !this.readOnly());
        this.invalid = computed(() => this.pseudoInvalid() !== null
            ? !!this.pseudoInvalid() && this.interactive()
            : this.interactive() && this.touched() && this.status() === 'INVALID');
        this.mode = computed(() => 
        // eslint-disable-next-line no-nested-ternary
        this.readOnly() ? 'readonly' : this.invalid() ? 'invalid' : 'valid');
        this.onTouched = EMPTY_FUNCTION;
        this.onChange = EMPTY_FUNCTION;
        this.control.valueAccessor = this;
        this.refresh$
            .pipe(delay(0), startWith(null), map(() => this.control.control), filter(Boolean), distinctUntilChanged(), switchMap((c) => merge(c.valueChanges, c.statusChanges, c.events || EMPTY).pipe(startWith(null))), takeUntilDestroyed())
            .subscribe(() => this.update());
    }
    set readOnlySetter(readOnly) {
        this.readOnly.set(readOnly);
    }
    set invalidSetter(invalid) {
        this.pseudoInvalid.set(invalid);
    }
    registerOnChange(onChange) {
        this.refresh$.next();
        this.onChange = (value) => {
            if (value === this.internal()) {
                return;
            }
            onChange(this.toControlValue(value));
            this.internal.set(value);
            this.update();
        };
    }
    registerOnTouched(onTouched) {
        this.onTouched = () => {
            onTouched();
            this.update();
        };
    }
    setDisabledState() {
        this.update();
    }
    writeValue(value) {
        // TODO: https://github.com/angular/angular/issues/14988
        const safe = this.control instanceof NgModel ? this.control.model : value;
        this.internal.set(this.fromControlValue(safe));
        this.update();
    }
    fromControlValue(value) {
        return this.transformer ? this.transformer.fromControlValue(value) : value;
    }
    toControlValue(value) {
        return this.transformer ? this.transformer.toControlValue(value) : value;
    }
    update() {
        this.status.set(this.control.control?.status);
        this.touched.set(!!this.control.control?.touched);
        this.cdr.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiControl, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiControl, inputs: { readOnlySetter: ["readOnly", "readOnlySetter"], invalidSetter: ["invalid", "invalidSetter"] }, ngImport: i0 }); }
}
__decorate([
    tuiPure
], TuiControl.prototype, "fromControlValue", null);
__decorate([
    tuiPure
], TuiControl.prototype, "toControlValue", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiControl, decorators: [{
            type: Directive
        }], ctorParameters: function () { return []; }, propDecorators: { readOnlySetter: [{
                type: Input,
                args: ['readOnly']
            }], invalidSetter: [{
                type: Input,
                args: ['invalid']
            }], fromControlValue: [], toControlValue: [] } });
function tuiAsControl(control) {
    return tuiProvide(TuiControl, control);
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
/**
 * Abstract class for host element for dynamically created portals.
 */
class TuiPortals {
    constructor() {
        this.injector = inject(INJECTOR);
        this.nothing = inject(TuiPortalService).attach(this);
    }
    addComponentChild(component) {
        const injector = component.createInjector(this.injector);
        const ref = this.vcr.createComponent(component.component, { injector });
        ref.changeDetectorRef.detectChanges();
        return ref;
    }
    addTemplateChild(templateRef, context) {
        return this.vcr.createEmbeddedView(templateRef, context);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPortals, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPortals, viewQueries: [{ propertyName: "vcr", first: true, predicate: ["viewContainer"], descendants: true, read: ViewContainerRef }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPortals, decorators: [{
            type: Directive
        }], propDecorators: { vcr: [{
                type: ViewChild,
                args: ['viewContainer', { read: ViewContainerRef }]
            }] } });
/**
 * Abstract service for displaying portals
 */
class TuiPortalService {
    attach(host) {
        this.host = host;
    }
    add(component) {
        return this.safeHost.addComponentChild(component);
    }
    remove({ hostView }) {
        if (!hostView.destroyed) {
            hostView.destroy();
        }
    }
    addTemplate(templateRef, context) {
        return this.safeHost.addTemplateChild(templateRef, context);
    }
    removeTemplate(viewRef) {
        if (!viewRef.destroyed) {
            viewRef.destroy();
        }
    }
    get safeHost() {
        if (!this.host) {
            throw new TuiNoHostException();
        }
        return this.host;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPortalService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPortalService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPortalService, decorators: [{
            type: Injectable
        }] });
function tuiAsPortal(portal) {
    return tuiProvide(TuiPortalService, portal);
}
class TuiNoHostException extends Error {
    constructor() {
        super(ngDevMode ? 'Portals cannot be used without TuiPortalHostComponent' : '');
    }
}

class TuiValidationError {
    constructor(message, context = {}) {
        this.message = message;
        this.context = context;
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { TuiControl, TuiNoHostException, TuiPortalService, TuiPortals, TuiValidationError, TuiValueTransformer, tuiAsControl, tuiAsPortal };
//# sourceMappingURL=taiga-ui-cdk-classes.mjs.map
