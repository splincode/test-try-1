import { TuiDay } from './day';
import { TuiMonthRange } from './month-range';
import type { TuiDateMode } from './types';
/**
 * An immutable range of two {@link TuiDay} objects
 */
export declare class TuiDayRange extends TuiMonthRange {
    readonly from: TuiDay;
    readonly to: TuiDay;
    constructor(from: TuiDay, to: TuiDay);
    /**
     * Creates range from two days after sorting them
     *
     * @param day1
     * @param day2
     * @return new range with sorted days
     */
    static sort(day1: TuiDay, day2: TuiDay): TuiDayRange;
    /**
     * Parse and correct a day range in string format
     *
     * @param rangeString a string of dates in a format dd.mm.yyyy - dd.mm.yyyy
     * @param dateMode {@link TuiDateMode}
     * @return normalized day range object
     */
    static normalizeParse(rangeString: string, dateMode?: TuiDateMode): TuiDayRange;
    get isSingleDay(): boolean;
    /**
     * Tests ranges for identity
     *
     * @param another second range to test against current
     * @return `true` if days are identical
     */
    daySame(another: TuiDayRange): boolean;
    /**
     * Locks range between two days included, or limits from one side if the other is null
     *
     * @param min
     * @param max
     * @return range — clamped range
     */
    dayLimit(min: TuiDay | null, max: TuiDay | null): TuiDayRange;
    /**
     * Human readable format.
     */
    getFormattedDayRange(dateFormat: TuiDateMode, dateSeparator: string): string;
    toString(dateFormat?: TuiDateMode, dateSeparator?: string): string;
}
