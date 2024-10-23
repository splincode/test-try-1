import type { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class TuiScrollService {
    private readonly performanceRef;
    private readonly animationFrame$;
    private readonly zone;
    scroll$(elementOrWindow: Element | Window, scrollTop: number, scrollLeft?: number, duration?: number): Observable<[number, number]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiScrollService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TuiScrollService>;
}
