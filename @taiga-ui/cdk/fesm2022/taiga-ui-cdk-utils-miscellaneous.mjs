import { FormArray, FormGroup } from '@angular/forms';
import { tuiToInt } from '@taiga-ui/cdk/utils/math';
import { InjectionToken, isSignal, signal, inject, effect, DestroyRef, EnvironmentInjector, createComponent } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

function tuiArrayRemove(array, index) {
    return array.slice(0, Math.max(index, 0)).concat(array.slice(Math.max(index + 1, 0)));
}

function tuiArrayShallowEquals(a, b) {
    return a.length === b.length && a.every((item, index) => item === b[index]);
}

function tuiArrayToggle(array, item) {
    const index = array.indexOf(item);
    return index === -1 ? [...array, item] : tuiArrayRemove(array, index);
}

/* internal */
const changeDateSeparator = (dateString, newDateSeparator) => dateString.replaceAll(/[^0-9A-Za-zА-Яа-я]/gi, newDateSeparator);

function tuiIsControlEmpty({ value = null }) {
    return value === null || value === '' || (Array.isArray(value) && !value.length);
}

function tuiCountFilledControls(control) {
    if (control instanceof FormArray) {
        return control.controls.reduce((acc, nestedControl) => acc + tuiCountFilledControls(nestedControl), 0);
    }
    if (control instanceof FormGroup) {
        return Object.values(control.controls).reduce((acc, nestedControl) => acc + tuiCountFilledControls(nestedControl), 0);
    }
    return tuiToInt(!tuiIsControlEmpty(control));
}

function tuiCreateToken(defaults) {
    return tuiCreateTokenFromFactory(() => defaults);
}
function tuiCreateTokenFromFactory(factory) {
    return factory ? new InjectionToken('', { factory }) : new InjectionToken('');
}

function tuiIsString(value) {
    return typeof value === 'string';
}

function tuiDefaultSort(x, y) {
    if (x === y) {
        return 0;
    }
    if (tuiIsString(x) && tuiIsString(y)) {
        return x.localeCompare(y);
    }
    return x > y ? 1 : -1;
}

function tuiDirectiveBinding(token, key, initial, options = { self: true }) {
    const result = isSignal(initial) ? initial : signal(initial);
    const directive = inject(token, options);
    const output = directive[`${key.toString()}Change`];
    // TODO: Figure out why effects are executed all the time and not just when result changes (check with Angular 18)
    let previous;
    effect(() => {
        const value = result();
        if (previous === value) {
            return;
        }
        if (isSignal(directive[key])) {
            directive[key].set(value);
        }
        else {
            directive[key] = value;
        }
        directive.ngOnChanges?.({});
        output?.emit?.(value);
        previous = value;
    }, { allowSignalWrites: true });
    return result;
}

function tuiDirectiveListener(token, key, options = { self: true }) {
    const prop = inject(token, options)?.[key];
    return isSignal(prop) ? prop : toSignal(prop);
}

function tuiDistanceBetweenTouches({ touches }) {
    return Math.hypot((touches[0]?.clientX ?? 0) - (touches[1]?.clientX ?? 0), (touches[0]?.clientY ?? 0) - (touches[1]?.clientY ?? 0));
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
function tuiEaseInOutQuad(t) {
    ngDevMode &&
        console.assert(t >= 0 && t <= 1, 'Input must be between 0 and 1 inclusive but received ', t);
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/**
 * Flattens two-dimensional array and calculates resulting length
 *
 * @param array twi dimensional array
 */
function tuiFlatLength(array) {
    return array.reduce((count, section) => count + section.length, 0);
}

/**
 * Extracts original array from {@link QueryList} rather than
 * creating a copy like {@link QueryList.toArray} does.
 * @param queryList
 * @returns original array from {@link QueryList}.
 */
function tuiGetOriginalArrayFromQueryList(queryList) {
    let array = [];
    queryList.find((_item, _index, originalArray) => {
        array = originalArray;
        return true;
    });
    return array;
}

function tuiIsFalsy(value) {
    return !value;
}

function tuiIsNumber(value) {
    return typeof value === 'number';
}

function tuiIsObject(value) {
    return typeof value === 'object' && !!value;
}

function tuiIsPresent(value) {
    return value !== null && value !== undefined;
}

/**
 * @deprecated: drop in v5.0
 */
function tuiIsValidUrl(url) {
    return new RegExp(String.raw `^([a-zA-Z]+:\/\/)?` + // protocol
        String.raw `((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|localhost|` + // domain name
        String.raw `((\d{1,3}\.){3}\d{1,3}))` + // OR IP (v4) address
        String.raw `(\:\d+)?(\/[-a-z\d%_.~+\:]*)*` + // port and path
        String.raw `(\?[)(;&a-z\d%_.~+=-]*)?` + // query string
        String.raw `(\#[-a-z\d_]*)?$`, // fragment locator
    'i').test(url);
}

function tuiMarkControlAsTouchedAndValidate(control) {
    if (control instanceof FormArray) {
        control.controls.forEach((nestedControl) => {
            tuiMarkControlAsTouchedAndValidate(nestedControl);
        });
    }
    if (control instanceof FormGroup) {
        Object.values(control.controls).forEach((nestedControl) => {
            tuiMarkControlAsTouchedAndValidate(nestedControl);
        });
    }
    control.markAsTouched();
    control.updateValueAndValidity();
}

/**
 * Checks identity for nullable elements.
 *
 * @param a element a
 * @param b element b
 * @param handler called if both elements are not null
 * @return true if either both are null or they pass identity handler
 */
function tuiNullableSame(a, b, handler) {
    if (a === null) {
        return b === null;
    }
    if (b === null) {
        return false;
    }
    return handler(a, b);
}

function tuiProvide(provide, useExisting, multi = false) {
    return { provide, useExisting, multi };
}

function tuiProvideOptions(provide, options, fallback) {
    return {
        provide,
        useFactory: () => ({
            ...(inject(provide, { optional: true, skipSelf: true }) || fallback),
            ...options,
        }),
    };
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
function decorateMethod(originalMethod) {
    let previousArgs = [];
    let originalFnWasCalledLeastAtOnce = false;
    let pureValue;
    return function tuiPureMethodPatched(...args) {
        const isPure = originalFnWasCalledLeastAtOnce &&
            previousArgs.length === args.length &&
            args.every((arg, index) => arg === previousArgs[index]);
        if (isPure) {
            return pureValue;
        }
        previousArgs = args;
        pureValue = originalMethod.apply(this, args);
        originalFnWasCalledLeastAtOnce = true;
        return pureValue;
    };
}
function decorateGetter(originalGetter, propertyKey, enumerable = true) {
    return function tuiPureGetterPatched() {
        const value = originalGetter.call(this);
        Object.defineProperty(this, propertyKey, { enumerable, value });
        return value;
    };
}
function tuiPure(target, propertyKeyOrContext, descriptor) {
    if (typeof target === 'function') {
        const context = propertyKeyOrContext;
        if (context.kind === 'getter') {
            return decorateGetter(target, context.name);
        }
        if (context.kind === 'method') {
            return decorateMethod(target);
        }
        throw new TuiPureException();
    }
    const { get, enumerable, value } = descriptor;
    const propertyKey = propertyKeyOrContext;
    if (get) {
        return {
            configurable: true,
            enumerable,
            get: decorateGetter(get, propertyKey, enumerable),
        };
    }
    if (typeof value !== 'function') {
        throw new TuiPureException();
    }
    const original = value;
    return {
        configurable: true,
        enumerable,
        get() {
            let previousArgs = [];
            let originalFnWasCalledLeastAtOnce = false;
            let pureValue;
            const patched = (...args) => {
                const isPure = originalFnWasCalledLeastAtOnce &&
                    previousArgs.length === args.length &&
                    args.every((arg, index) => arg === previousArgs[index]);
                if (isPure) {
                    return pureValue;
                }
                previousArgs = args;
                pureValue = original.apply(this, args);
                originalFnWasCalledLeastAtOnce = true;
                return pureValue;
            };
            Object.defineProperty(this, propertyKey, {
                configurable: true,
                value: patched,
            });
            return patched;
        },
    };
}
class TuiPureException extends Error {
    constructor() {
        super(ngDevMode ? 'tuiPure can only be used with functions or getters' : '');
    }
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
/**
 * Adds 'px' to the number and turns it into a string
 */
function tuiPx(value) {
    ngDevMode && console.assert(Number.isFinite(value), 'Value must be finite number');
    return `${value}px`;
}

function tuiUniqBy(array, key) {
    return Array.from(array
        .reduce((map, item) => (map.has(item[key]) ? map : map.set(item[key], item)), new Map())
        .values());
}

const MAP = tuiCreateTokenFromFactory(() => {
    const map = new Map();
    inject(DestroyRef).onDestroy(() => map.forEach((component) => component.destroy()));
    return map;
});
function tuiWithStyles(component) {
    const map = inject(MAP);
    const environmentInjector = inject(EnvironmentInjector);
    if (!map.has(component)) {
        map.set(component, createComponent(component, { environmentInjector }));
    }
    return undefined;
}

/**
 * Generated bundle index. Do not edit.
 */

export { TuiPureException, changeDateSeparator, tuiArrayRemove, tuiArrayShallowEquals, tuiArrayToggle, tuiCountFilledControls, tuiCreateToken, tuiCreateTokenFromFactory, tuiDefaultSort, tuiDirectiveBinding, tuiDirectiveListener, tuiDistanceBetweenTouches, tuiEaseInOutQuad, tuiFlatLength, tuiGetOriginalArrayFromQueryList, tuiIsControlEmpty, tuiIsFalsy, tuiIsNumber, tuiIsObject, tuiIsPresent, tuiIsString, tuiIsValidUrl, tuiMarkControlAsTouchedAndValidate, tuiNullableSame, tuiProvide, tuiProvideOptions, tuiPure, tuiPx, tuiUniqBy, tuiWithStyles };
//# sourceMappingURL=taiga-ui-cdk-utils-miscellaneous.mjs.map
