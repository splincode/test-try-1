import { TuiMonth } from './month';
import type { TuiDateMode, TuiDayLike } from './types';
/**
 * Immutable date object, consisting of day, month and year
 */
export declare class TuiDay extends TuiMonth {
    readonly day: number;
    constructor(year: number, month: number, day: number);
    /**
     * Creates {@link TuiDay} from native {@link Date} based on local time zone
     */
    static fromLocalNativeDate(date: Date): TuiDay;
    /**
     * Creates {@link TuiDay} from native {@link Date} using UTC
     */
    static fromUtcNativeDate(date: Date): TuiDay;
    /**
     * Check validity of year, month and day
     *
     * @param year
     * @param month
     * @param day
     * @return boolean validity
     */
    static isValidDay(year: number, month: number, day: number): boolean;
    /**
     * Current day based on local time zone
     */
    static currentLocal(): TuiDay;
    /**
     * Returns current day based on UTC
     */
    static currentUtc(): TuiDay;
    /**
     * Calculates {@link TuiDay} normalizing year, month and day. {@link NaN} is turned into minimal value.
     *
     * @param year any year value, including invalid
     * @param month any month value, including invalid (months start with 0)
     * @param day any day value, including invalid
     * @return normalized date
     */
    static normalizeOf(year: number, month: number, day: number): TuiDay;
    static lengthBetween(from: TuiDay, to: TuiDay): number;
    static parseRawDateString(date: string, dateMode?: TuiDateMode): {
        day: number;
        month: number;
        year: number;
    };
    /**
     * Parsing a string with date with normalization
     *
     * @param rawDate date string
     * @param dateMode date format of the date string (DMY | MDY | YMD)
     * @return normalized date
     */
    static normalizeParse(rawDate: string, dateMode?: TuiDateMode): TuiDay;
    /**
     * Parsing a date stringified in a toJSON format
     * @param yearMonthDayString date string in format of YYYY-MM-DD
     * @return date
     * @throws exceptions if any part of the date is invalid
     */
    static jsonParse(yearMonthDayString: string): TuiDay;
    static normalizeDayPart(day: number, month: number, year: number): number;
    get formattedDayPart(): string;
    get isWeekend(): boolean;
    /**
     * Returns day of week
     *
     * @param startFromMonday whether week starts from Monday and not from Sunday
     * @return day of week (from 0 to 6)
     */
    dayOfWeek(startFromMonday?: boolean): number;
    /**
     * Passed date is after current
     */
    dayBefore(another: TuiDay): boolean;
    /**
     * Passed date is after or equals to current
     */
    daySameOrBefore(another: TuiDay): boolean;
    /**
     * Passed date is the same as current
     */
    daySame(another: TuiDay): boolean;
    /**
     * Passed date is either before or the same as current
     */
    daySameOrAfter(another: TuiDay): boolean;
    /**
     * Passed date is before current
     */
    dayAfter(another: TuiDay): boolean;
    /**
     * Clamping date between two limits
     *
     * @param min
     * @param max
     * @return clamped date
     */
    dayLimit(min: TuiDay | null, max: TuiDay | null): TuiDay;
    /**
     * Immutably alters current day by passed offset
     *
     * If resulting month has more days than original one, date is rounded to the maximum day
     * in the resulting month. Offset of days will be calculated based on the resulted year and month
     * to not interfere with parent classes methods
     *
     * @param offset
     * @return new date object as a result of offsetting current
     */
    append({ year, month, day }: TuiDayLike): TuiDay;
    /**
     * Returns formatted whole date
     */
    getFormattedDay(dateFormat: TuiDateMode, separator: string): string;
    toString(dateFormat?: TuiDateMode, separator?: string): string;
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
export declare class TuiInvalidDayException extends Error {
    constructor(year: number, month: number, day: number);
}
