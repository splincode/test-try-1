import type { TuiMonth } from './month';
/**
 * An immutable range of two {@link TuiMonth} objects
 */
export declare class TuiMonthRange {
    readonly from: TuiMonth;
    readonly to: TuiMonth;
    constructor(from: TuiMonth, to: TuiMonth);
    static sort(month1: TuiMonth, month2: TuiMonth): TuiMonthRange;
    get isSingleMonth(): boolean;
    monthSame(another: TuiMonthRange): boolean;
    toString(): string;
}
