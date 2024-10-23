import type { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @deprecated use {@link TuiActiveZone} instead
 */
export declare class TuiClickOutside {
    private readonly zone;
    private readonly doc;
    private readonly el;
    readonly tuiClickOutside: Observable<unknown>;
    private isOutside;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiClickOutside, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiClickOutside, "[tuiClickOutside]", never, {}, { "tuiClickOutside": "tuiClickOutside"; }, never, never, true, never>;
}
