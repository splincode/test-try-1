import type { ElementRef, NgZone } from '@angular/core';
import type { Observable } from 'rxjs';
import type { TuiAutofocusOptions } from '../autofocus.options';
import { AbstractTuiAutofocusHandler } from './abstract.handler';
export declare class TuiDefaultAutofocusHandler extends AbstractTuiAutofocusHandler {
    private readonly animationFrame$;
    private readonly zone;
    constructor(el: ElementRef<HTMLElement>, animationFrame$: Observable<number>, zone: NgZone, options: TuiAutofocusOptions);
    setFocus(): void;
}
