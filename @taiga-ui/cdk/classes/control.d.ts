import type { Provider, Type } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import type { ControlValueAccessor, FormControlStatus } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { TuiValueTransformer } from './value-transformer';
import * as i0 from "@angular/core";
/**
 * Basic ControlValueAccessor class to build form components upon
 */
export declare abstract class TuiControl<T> implements ControlValueAccessor {
    private readonly fallback;
    private readonly refresh$;
    private readonly pseudoInvalid;
    private readonly internal;
    protected readonly control: NgControl;
    protected readonly cdr: ChangeDetectorRef;
    protected readonly transformer: TuiValueTransformer<any, any> | null;
    readonly value: import("@angular/core").Signal<T>;
    readonly readOnly: import("@angular/core").WritableSignal<boolean>;
    readonly touched: import("@angular/core").WritableSignal<boolean>;
    readonly status: import("@angular/core").WritableSignal<FormControlStatus | undefined>;
    readonly disabled: import("@angular/core").Signal<boolean>;
    readonly interactive: import("@angular/core").Signal<boolean>;
    readonly invalid: import("@angular/core").Signal<boolean>;
    readonly mode: import("@angular/core").Signal<"invalid" | "readonly" | "valid">;
    onTouched: (...args: any[]) => void;
    onChange: (value: T) => void;
    constructor();
    set readOnlySetter(readOnly: boolean);
    set invalidSetter(invalid: boolean | null);
    registerOnChange(onChange: (value: unknown) => void): void;
    registerOnTouched(onTouched: () => void): void;
    setDisabledState(): void;
    writeValue(value: T | null): void;
    private fromControlValue;
    private toControlValue;
    private update;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiControl<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiControl<any>, never, never, { "readOnlySetter": { "alias": "readOnly"; "required": false; }; "invalidSetter": { "alias": "invalid"; "required": false; }; }, {}, never, never, false, never>;
}
export declare function tuiAsControl<T>(control: Type<TuiControl<T>>): Provider;
