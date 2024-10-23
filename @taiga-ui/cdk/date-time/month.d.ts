import type { TuiMonthLike } from './types';
import { TuiYear } from './year';
/**
 * Immutable object consisting of year and month
 */
export declare class TuiMonth extends TuiYear implements TuiMonthLike {
    readonly month: number;
    /**
     * @param year
     * @param month (starting with 0)
     */
    constructor(year: number, month: number);
    /**
     * Tests month and year for validity
     */
    static isValidMonth(year: number, month: number): boolean;
    /**
     * Returns number of days in a month
     */
    static getMonthDaysCount(month: number, isLeapYear: boolean): number;
    /**
     * Returns current month and year based on local time zone
     * @nosideeffects
     */
    static currentLocal(): TuiMonth;
    /**
     * Returns current month and year based on UTC
     */
    static currentUtc(): TuiMonth;
    static lengthBetween(from: TuiMonth, to: TuiMonth): number;
    /**
     * Normalizes number by clamping it between min and max month
     */
    static normalizeMonthPart(month: number): number;
    /**
     * Tests month for validity
     */
    private static isValidMonthPart;
    get formattedMonthPart(): string;
    /**
     * Returns days in a month
     */
    get daysCount(): number;
    /**
     * Passed month and year are after current
     */
    monthBefore(another: TuiMonth): boolean;
    /**
     * Passed month and year are after or the same as current
     */
    monthSameOrBefore(another: TuiMonth): boolean;
    /**
     * Passed month and year are the same as current
     */
    monthSame(another: TuiMonth): boolean;
    /**
     * Passed month and year are either before or equal to current
     */
    monthSameOrAfter(another: TuiMonth): boolean;
    /**
     * Passed month and year are before current
     */
    monthAfter(another: TuiMonth): boolean;
    /**
     * Immutably alters current month and year by passed offset
     *
     * @param offset
     * @return new month and year object as a result of offsetting current
     */
    append({ year, month }: TuiMonthLike): TuiMonth;
    toString(): string;
    valueOf(): number;
    toJSON(): string;
    /**
     * Returns native {@link Date} based on local time zone
     */
    toLocalNativeDate(): Date;
    /**
     * Returns native {@link Date} based on UTC
     */
    toUtcNativeDate(): Date;
}
