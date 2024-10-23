import type { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TuiReplacePipe implements PipeTransform {
    transform(value: string | null | undefined, search: RegExp | string, replaceValue: string | ((substring: string, ...args: unknown[]) => string)): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiReplacePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TuiReplacePipe, "tuiReplace", true>;
}
