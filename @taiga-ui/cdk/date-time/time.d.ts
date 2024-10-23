import type { TuiTimeLike, TuiTimeMode } from './types';
/**
 * Immutable time object with hours, minutes, seconds and ms
 */
export declare class TuiTime implements TuiTimeLike {
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;
    readonly ms: number;
    constructor(hours: number, minutes: number, seconds?: number, ms?: number);
    /**
     * Checks if time is valid
     */
    static isValidTime(hours: number, minutes: number, seconds?: number, ms?: number): boolean;
    /**
     * Current UTC time.
     */
    static current(): TuiTime;
    /**
     * Current time in local timezone
     */
    static currentLocal(): TuiTime;
    /**
     * Calculates TuiTime from milliseconds
     */
    static fromAbsoluteMilliseconds(milliseconds: number): TuiTime;
    /**
     * Parses string into TuiTime object
     */
    static fromString(time: string): TuiTime;
    /**
     * Converts Date object into TuiTime
     * @param date
     */
    static fromLocalNativeDate(date: Date): TuiTime;
    /**
     * Shifts time by hours and minutes
     */
    shift({ hours, minutes, seconds, ms }: TuiTimeLike): TuiTime;
    /**
     * Converts TuiTime to string
     */
    toString(mode?: TuiTimeMode): string;
    valueOf(): number;
    /**
     * Returns the primitive value of the given Date object.
     * Depending on the argument, the method can return either a string or a number.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/@@toPrimitive
     */
    [Symbol.toPrimitive](hint: string): number | string;
    /**
     * Converts TuiTime to milliseconds
     */
    toAbsoluteMilliseconds(): number;
    private formatTime;
}
