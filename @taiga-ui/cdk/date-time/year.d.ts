import type { TuiYearLike } from './types';
/**
 * Immutable year object
 * @nosideeffects
 */
export declare class TuiYear implements TuiYearLike {
    readonly year: number;
    constructor(year: number);
    /**
     * Checks year for validity
     */
    static isValidYear(year: number): boolean;
    /**
     * Check if passed year is a leap year
     */
    static isLeapYear(year: number): boolean;
    /**
     * Returns amount of leap years from year 0 to the passed one
     */
    static getAbsoluteLeapYears(year: number): number;
    static lengthBetween(from: TuiYear, to: TuiYear): number;
    /**
     * Normalizes year by clamping it between min and max years
     */
    static normalizeYearPart(year: number): number;
    get formattedYear(): string;
    get isLeapYear(): boolean;
    /**
     * Returns amount of leap years from year 0 to current
     */
    get absoluteLeapYears(): number;
    /**
     * Passed year is after current
     */
    yearBefore({ year }: TuiYear): boolean;
    /**
     * Passed year is the same or after current
     */
    yearSameOrBefore({ year }: TuiYear): boolean;
    /**
     * Passed year is the same as current
     */
    yearSame({ year }: TuiYear): boolean;
    /**
     * Passed year is either the same of before the current
     */
    yearSameOrAfter({ year }: TuiYear): boolean;
    /**
     * Passed year is before current
     */
    yearAfter({ year }: TuiYear): boolean;
    /**
     * Immutably offsets year
     */
    append({ year }: TuiYearLike): TuiYear;
    toString(): string;
    valueOf(): number;
    /**
     * Returns the primitive value of the given Date object.
     * Depending on the argument, the method can return either a string or a number.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/@@toPrimitive
     */
    [Symbol.toPrimitive](hint: string): number | string;
    toJSON(): string;
}
