import type { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TuiIsPresentPipe implements PipeTransform {
    transform<T>(value?: T | null): value is T;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiIsPresentPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TuiIsPresentPipe, "tuiIsPresent", true>;
}
