import { ElementRef, NgZone, Renderer2 } from '@angular/core';
import type { Observable } from 'rxjs';
import { TuiDefaultAutofocusHandler } from './handlers/default.handler';
import { TuiIosAutofocusHandler } from './handlers/ios.handler';
export interface TuiAutofocusHandler {
    setFocus(): void;
}
export interface TuiAutofocusOptions {
    readonly delay: number;
    readonly query: string;
    readonly preventScroll: boolean;
}
export declare const TUI_AUTOFOCUS_OPTIONS: import("@angular/core").InjectionToken<TuiAutofocusOptions>, tuiAutoFocusOptionsProvider: (item: Partial<TuiAutofocusOptions>) => import("@angular/core").FactoryProvider;
export declare const TUI_AUTOFOCUS_HANDLER: import("@angular/core").InjectionToken<TuiAutofocusHandler>;
export declare const TUI_AUTOFOCUS_PROVIDERS: {
    provide: import("@angular/core").InjectionToken<TuiAutofocusHandler>;
    deps: (typeof ElementRef | import("@angular/core").InjectionToken<Window> | typeof NgZone | typeof Renderer2)[];
    useFactory: (el: ElementRef<HTMLElement>, animationFrame$: Observable<number>, renderer: Renderer2, zone: NgZone, win: Window, isIos: boolean, options: TuiAutofocusOptions) => TuiDefaultAutofocusHandler | TuiIosAutofocusHandler;
}[];
