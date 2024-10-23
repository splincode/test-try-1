import { CHAR_NO_BREAK_SPACE, CHAR_EN_DASH } from '@taiga-ui/cdk/constants';
import { tuiInRange, tuiNormalizeToIntNumber } from '@taiga-ui/cdk/utils/math';

function tuiDateClamp(date, min, max) {
    if (max && max < date) {
        return max;
    }
    if (min && min > date) {
        return min;
    }
    return date;
}

const DAYS_IN_WEEK = 7;
const DAYS_IN_NORMAL_YEAR = 365;
const DAYS_IN_LEAP_YEAR = 366;
const MONTHS_IN_YEAR = 12;
const MIN_DAY = 1;
const MIN_MONTH = 0;
const MAX_MONTH = 11;
const MIN_YEAR = 0;
const MAX_YEAR = 9999;
const RANGE_SEPARATOR_CHAR = `${CHAR_NO_BREAK_SPACE}${CHAR_EN_DASH}${CHAR_NO_BREAK_SPACE}`;
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * HOURS_IN_DAY;

/**
 * @internal 'dd.mm.yyyy'.length
 * Used in:
 * - {@link TuiInputDateComponent}
 * - {@link TuiInputDateRangeComponent}
 * - {@link TuiInputDateTimeComponent}
 */
const DATE_FILLER_LENGTH = 10;
/**
 * @internal
 * Used in {@link TuiInputDateRangeComponent}
 */
const DATE_RANGE_FILLER_LENGTH = 2 * DATE_FILLER_LENGTH + RANGE_SEPARATOR_CHAR.length;

const TuiDayOfWeek = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
};

const TuiMonthNumber = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
};

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
/**
 * Immutable year object
 * @nosideeffects
 */
class TuiYear {
    constructor(year) {
        this.year = year;
        ngDevMode && console.assert(TuiYear.isValidYear(year));
    }
    /**
     * Checks year for validity
     */
    static isValidYear(year) {
        return Number.isInteger(year) && tuiInRange(year, MIN_YEAR, MAX_YEAR + 1);
    }
    /**
     * Check if passed year is a leap year
     */
    static isLeapYear(year) {
        ngDevMode && console.assert(TuiYear.isValidYear(year));
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    }
    /**
     * Returns amount of leap years from year 0 to the passed one
     */
    static getAbsoluteLeapYears(year) {
        ngDevMode && console.assert(TuiYear.isValidYear(year));
        return Math.ceil(year / 400) + (Math.ceil(year / 4) - Math.ceil(year / 100));
    }
    static lengthBetween(from, to) {
        return to.year - from.year;
    }
    /**
     * Normalizes year by clamping it between min and max years
     */
    static normalizeYearPart(year) {
        return tuiNormalizeToIntNumber(year, MIN_YEAR, MAX_YEAR);
    }
    get formattedYear() {
        return String(this.year).padStart(4, '0');
    }
    get isLeapYear() {
        return TuiYear.isLeapYear(this.year);
    }
    /**
     * Returns amount of leap years from year 0 to current
     */
    get absoluteLeapYears() {
        return TuiYear.getAbsoluteLeapYears(this.year);
    }
    /**
     * Passed year is after current
     */
    yearBefore({ year }) {
        return this.year < year;
    }
    /**
     * Passed year is the same or after current
     */
    yearSameOrBefore({ year }) {
        return this.year <= year;
    }
    /**
     * Passed year is the same as current
     */
    yearSame({ year }) {
        return this.year === year;
    }
    /**
     * Passed year is either the same of before the current
     */
    yearSameOrAfter({ year }) {
        return this.year >= year;
    }
    /**
     * Passed year is before current
     */
    yearAfter({ year }) {
        return this.year > year;
    }
    /**
     * Immutably offsets year
     */
    append({ year = 0 }) {
        ngDevMode && console.assert(Number.isInteger(year));
        const resultYear = this.year + year;
        ngDevMode && console.assert(TuiYear.isValidYear(resultYear));
        return new TuiYear(resultYear);
    }
    toString() {
        return this.formattedYear;
    }
    valueOf() {
        return this.year;
    }
    /**
     * Returns the primitive value of the given Date object.
     * Depending on the argument, the method can return either a string or a number.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/@@toPrimitive
     */
    [Symbol.toPrimitive](hint) {
        return Date.prototype[Symbol.toPrimitive].call(this, hint);
    }
    toJSON() {
        return this.formattedYear;
    }
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
/**
 * Immutable object consisting of year and month
 */
class TuiMonth extends TuiYear {
    /**
     * @param year
     * @param month (starting with 0)
     */
    constructor(year, month) {
        super(year);
        this.month = month;
        ngDevMode && console.assert(TuiMonth.isValidMonth(year, month));
    }
    /**
     * Tests month and year for validity
     */
    static isValidMonth(year, month) {
        return TuiYear.isValidYear(year) && TuiMonth.isValidMonthPart(month);
    }
    /**
     * Returns number of days in a month
     */
    static getMonthDaysCount(month, isLeapYear) {
        ngDevMode && console.assert(TuiMonth.isValidMonthPart(month));
        switch (month) {
            case TuiMonthNumber.April:
            case TuiMonthNumber.June:
            case TuiMonthNumber.November:
            case TuiMonthNumber.September:
                return 30;
            case TuiMonthNumber.February:
                return isLeapYear ? 29 : 28;
            default:
                return 31;
        }
    }
    /**
     * Returns current month and year based on local time zone
     * @nosideeffects
     */
    static currentLocal() {
        const nativeDate = new Date();
        return new TuiMonth(nativeDate.getFullYear(), nativeDate.getMonth());
    }
    /**
     * Returns current month and year based on UTC
     */
    static currentUtc() {
        const nativeDate = new Date();
        return new TuiMonth(nativeDate.getUTCFullYear(), nativeDate.getUTCMonth());
    }
    static lengthBetween(from, to) {
        const absoluteFrom = from.month + from.year * 12;
        const absoluteTo = to.month + to.year * 12;
        return absoluteTo - absoluteFrom;
    }
    /**
     * Normalizes number by clamping it between min and max month
     */
    static normalizeMonthPart(month) {
        return tuiNormalizeToIntNumber(month, MIN_MONTH, MAX_MONTH);
    }
    /**
     * Tests month for validity
     */
    static isValidMonthPart(month) {
        return Number.isInteger(month) && tuiInRange(month, MIN_MONTH, MAX_MONTH + 1);
    }
    get formattedMonthPart() {
        return String(this.month + 1).padStart(2, '0');
    }
    /**
     * Returns days in a month
     */
    get daysCount() {
        return TuiMonth.getMonthDaysCount(this.month, this.isLeapYear);
    }
    /**
     * Passed month and year are after current
     */
    monthBefore(another) {
        return (this.yearBefore(another) ||
            (this.yearSame(another) && this.month < another.month));
    }
    /**
     * Passed month and year are after or the same as current
     */
    monthSameOrBefore(another) {
        return (this.yearBefore(another) ||
            (this.yearSame(another) && this.month <= another.month));
    }
    /**
     * Passed month and year are the same as current
     */
    monthSame(another) {
        return this.yearSame(another) && this.month === another.month;
    }
    /**
     * Passed month and year are either before or equal to current
     */
    monthSameOrAfter(another) {
        return (this.yearAfter(another) ||
            (this.yearSame(another) && this.month >= another.month));
    }
    /**
     * Passed month and year are before current
     */
    monthAfter(another) {
        return (this.yearAfter(another) ||
            (this.yearSame(another) && this.month > another.month));
    }
    /**
     * Immutably alters current month and year by passed offset
     *
     * @param offset
     * @return new month and year object as a result of offsetting current
     */
    append({ year = 0, month = 0 }) {
        const totalMonths = (this.year + year) * MONTHS_IN_YEAR + this.month + month;
        return new TuiMonth(Math.floor(totalMonths / MONTHS_IN_YEAR), totalMonths % MONTHS_IN_YEAR);
    }
    toString() {
        return `${this.formattedMonthPart}.${this.formattedYear}`;
    }
    valueOf() {
        return this.toLocalNativeDate().valueOf();
    }
    toJSON() {
        return `${super.toJSON()}-${this.formattedMonthPart}`;
    }
    /**
     * Returns native {@link Date} based on local time zone
     */
    toLocalNativeDate() {
        return new Date(this.year, this.month);
    }
    /**
     * Returns native {@link Date} based on UTC
     */
    toUtcNativeDate() {
        return new Date(Date.UTC(this.year, this.month));
    }
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
/**
 * Immutable date object, consisting of day, month and year
 */
class TuiDay extends TuiMonth {
    constructor(year, month, day) {
        super(year, month);
        this.day = day;
        ngDevMode && console.assert(TuiDay.isValidDay(year, month, day));
    }
    /**
     * Creates {@link TuiDay} from native {@link Date} based on local time zone
     */
    static fromLocalNativeDate(date) {
        return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
    }
    /**
     * Creates {@link TuiDay} from native {@link Date} using UTC
     */
    static fromUtcNativeDate(date) {
        return new TuiDay(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    }
    /**
     * Check validity of year, month and day
     *
     * @param year
     * @param month
     * @param day
     * @return boolean validity
     */
    static isValidDay(year, month, day) {
        return (TuiMonth.isValidMonth(year, month) &&
            Number.isInteger(day) &&
            tuiInRange(day, MIN_DAY, TuiMonth.getMonthDaysCount(month, TuiYear.isLeapYear(year)) + 1));
    }
    /**
     * Current day based on local time zone
     */
    static currentLocal() {
        const nativeDate = new Date();
        const year = nativeDate.getFullYear();
        const month = nativeDate.getMonth();
        const day = nativeDate.getDate();
        return new TuiDay(year, month, day);
    }
    /**
     * Returns current day based on UTC
     */
    static currentUtc() {
        const nativeDate = new Date();
        const year = nativeDate.getUTCFullYear();
        const month = nativeDate.getUTCMonth();
        const day = nativeDate.getUTCDate();
        return new TuiDay(year, month, day);
    }
    /**
     * Calculates {@link TuiDay} normalizing year, month and day. {@link NaN} is turned into minimal value.
     *
     * @param year any year value, including invalid
     * @param month any month value, including invalid (months start with 0)
     * @param day any day value, including invalid
     * @return normalized date
     */
    static normalizeOf(year, month, day) {
        const normalizedYear = TuiYear.normalizeYearPart(year);
        const normalizedMonth = TuiMonth.normalizeMonthPart(month);
        const normalizedDay = TuiDay.normalizeDayPart(day, normalizedMonth, normalizedYear);
        return new TuiDay(normalizedYear, normalizedMonth, normalizedDay);
    }
    static lengthBetween(from, to) {
        return Math.round((to.toLocalNativeDate().getTime() - from.toLocalNativeDate().getTime()) /
            (1000 * 60 * 60 * 24));
    }
    static parseRawDateString(date, dateMode = 'DMY') {
        ngDevMode &&
            console.assert(date.length === DATE_FILLER_LENGTH, '[parseRawDateString]: wrong date string length');
        switch (dateMode) {
            case 'MDY':
                return {
                    day: parseInt(date.slice(3, 5), 10),
                    month: parseInt(date.slice(0, 2), 10) - 1,
                    year: parseInt(date.slice(6, 10), 10),
                };
            case 'YMD':
                return {
                    day: parseInt(date.slice(8, 10), 10),
                    month: parseInt(date.slice(5, 7), 10) - 1,
                    year: parseInt(date.slice(0, 4), 10),
                };
            case 'DMY':
            default:
                return {
                    day: parseInt(date.slice(0, 2), 10),
                    month: parseInt(date.slice(3, 5), 10) - 1,
                    year: parseInt(date.slice(6, 10), 10),
                };
        }
    }
    // TODO: Move month and year related code corresponding classes
    /**
     * Parsing a string with date with normalization
     *
     * @param rawDate date string
     * @param dateMode date format of the date string (DMY | MDY | YMD)
     * @return normalized date
     */
    static normalizeParse(rawDate, dateMode = 'DMY') {
        const { day, month, year } = this.parseRawDateString(rawDate, dateMode);
        return TuiDay.normalizeOf(year, month, day);
    }
    /**
     * Parsing a date stringified in a toJSON format
     * @param yearMonthDayString date string in format of YYYY-MM-DD
     * @return date
     * @throws exceptions if any part of the date is invalid
     */
    static jsonParse(yearMonthDayString) {
        const { day, month, year } = this.parseRawDateString(yearMonthDayString, 'YMD');
        if (!TuiMonth.isValidMonth(year, month) ||
            !Number.isInteger(day) ||
            !tuiInRange(day, MIN_DAY, TuiMonth.getMonthDaysCount(month, TuiYear.isLeapYear(year)) + 1)) {
            throw new TuiInvalidDayException(year, month, day);
        }
        return new TuiDay(year, month, day);
    }
    static normalizeDayPart(day, month, year) {
        ngDevMode && console.assert(TuiMonth.isValidMonth(year, month));
        const monthDaysCount = TuiMonth.getMonthDaysCount(month, TuiYear.isLeapYear(year));
        return tuiNormalizeToIntNumber(day, 1, monthDaysCount);
    }
    get formattedDayPart() {
        return String(this.day).padStart(2, '0');
    }
    get isWeekend() {
        const dayOfWeek = this.dayOfWeek(false);
        return dayOfWeek === TuiDayOfWeek.Saturday || dayOfWeek === TuiDayOfWeek.Sunday;
    }
    /**
     * Returns day of week
     *
     * @param startFromMonday whether week starts from Monday and not from Sunday
     * @return day of week (from 0 to 6)
     */
    dayOfWeek(startFromMonday = true) {
        const dayOfWeek = startFromMonday
            ? this.toLocalNativeDate().getDay() - 1
            : this.toLocalNativeDate().getDay();
        return dayOfWeek < 0 ? 6 : dayOfWeek;
    }
    /**
     * Passed date is after current
     */
    dayBefore(another) {
        return (this.monthBefore(another) ||
            (this.monthSame(another) && this.day < another.day));
    }
    /**
     * Passed date is after or equals to current
     */
    daySameOrBefore(another) {
        return (this.monthBefore(another) ||
            (this.monthSame(another) && this.day <= another.day));
    }
    /**
     * Passed date is the same as current
     */
    daySame(another) {
        return this.monthSame(another) && this.day === another.day;
    }
    /**
     * Passed date is either before or the same as current
     */
    daySameOrAfter(another) {
        return (this.monthAfter(another) ||
            (this.monthSame(another) && this.day >= another.day));
    }
    /**
     * Passed date is before current
     */
    dayAfter(another) {
        return (this.monthAfter(another) ||
            (this.monthSame(another) && this.day > another.day));
    }
    /**
     * Clamping date between two limits
     *
     * @param min
     * @param max
     * @return clamped date
     */
    dayLimit(min, max) {
        if (min !== null && this.dayBefore(min)) {
            return min;
        }
        if (max !== null && this.dayAfter(max)) {
            return max;
        }
        return this;
    }
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
    append({ year = 0, month = 0, day = 0 }) {
        const totalMonths = (this.year + year) * MONTHS_IN_YEAR + this.month + month;
        let years = Math.floor(totalMonths / MONTHS_IN_YEAR);
        let months = totalMonths % MONTHS_IN_YEAR;
        let days = Math.min(this.day, TuiMonth.getMonthDaysCount(months, TuiYear.isLeapYear(years))) + day;
        while (days > TuiMonth.getMonthDaysCount(months, TuiYear.isLeapYear(years))) {
            days -= TuiMonth.getMonthDaysCount(months, TuiYear.isLeapYear(years));
            if (months === TuiMonthNumber.December) {
                years++;
                months = TuiMonthNumber.January;
            }
            else {
                months++;
            }
        }
        while (days < MIN_DAY) {
            if (months === TuiMonthNumber.January) {
                years--;
                months = TuiMonthNumber.December;
            }
            else {
                months--;
            }
            days += TuiMonth.getMonthDaysCount(months, TuiYear.isLeapYear(years));
        }
        return new TuiDay(years, months, days);
    }
    /**
     * Returns formatted whole date
     */
    getFormattedDay(dateFormat, separator) {
        ngDevMode &&
            console.assert(separator.length === 1, 'Separator should consist of only 1 symbol');
        const dd = this.formattedDayPart;
        const mm = this.formattedMonthPart;
        const yyyy = this.formattedYear;
        switch (dateFormat) {
            case 'MDY':
                return `${mm}${separator}${dd}${separator}${yyyy}`;
            case 'YMD':
                return `${yyyy}${separator}${mm}${separator}${dd}`;
            case 'DMY':
            default:
                return `${dd}${separator}${mm}${separator}${yyyy}`;
        }
    }
    toString(dateFormat = 'DMY', separator = '.') {
        return this.getFormattedDay(dateFormat, separator);
    }
    toJSON() {
        return `${super.toJSON()}-${this.formattedDayPart}`;
    }
    /**
     * Returns native {@link Date} based on local time zone
     */
    toLocalNativeDate() {
        return new Date(this.year, this.month, this.day);
    }
    /**
     * Returns native {@link Date} based on UTC
     */
    toUtcNativeDate() {
        return new Date(Date.UTC(this.year, this.month, this.day));
    }
}
class TuiInvalidDayException extends Error {
    constructor(year, month, day) {
        super(ngDevMode ? `Invalid day: ${year}-${month}-${day}` : '');
    }
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
/**
 * An immutable range of two {@link TuiMonth} objects
 */
class TuiMonthRange {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        ngDevMode && console.assert(from.monthSameOrBefore(to));
    }
    static sort(month1, month2) {
        return month1.monthSameOrBefore(month2)
            ? new TuiMonthRange(month1, month2)
            : new TuiMonthRange(month2, month1);
    }
    get isSingleMonth() {
        return this.from.monthSame(this.to);
    }
    monthSame(another) {
        return this.from.monthSame(another.from) && this.to.monthSame(another.to);
    }
    toString() {
        return `${this.from}${RANGE_SEPARATOR_CHAR}${this.to}`;
    }
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
/**
 * An immutable range of two {@link TuiDay} objects
 */
class TuiDayRange extends TuiMonthRange {
    constructor(from, to) {
        super(from, to);
        this.from = from;
        this.to = to;
        ngDevMode && console.assert(from.daySameOrBefore(to));
    }
    /**
     * Creates range from two days after sorting them
     *
     * @param day1
     * @param day2
     * @return new range with sorted days
     */
    static sort(day1, day2) {
        return day1.daySameOrBefore(day2)
            ? new TuiDayRange(day1, day2)
            : new TuiDayRange(day2, day1);
    }
    /**
     * Parse and correct a day range in string format
     *
     * @param rangeString a string of dates in a format dd.mm.yyyy - dd.mm.yyyy
     * @param dateMode {@link TuiDateMode}
     * @return normalized day range object
     */
    static normalizeParse(rangeString, dateMode = 'DMY') {
        const leftDay = TuiDay.normalizeParse(rangeString.slice(0, DATE_FILLER_LENGTH), dateMode);
        if (rangeString.length < DATE_RANGE_FILLER_LENGTH) {
            return new TuiDayRange(leftDay, leftDay);
        }
        return TuiDayRange.sort(leftDay, TuiDay.normalizeParse(rangeString.slice(DATE_FILLER_LENGTH + RANGE_SEPARATOR_CHAR.length), dateMode));
    }
    get isSingleDay() {
        return this.from.daySame(this.to);
    }
    /**
     * Tests ranges for identity
     *
     * @param another second range to test against current
     * @return `true` if days are identical
     */
    daySame(another) {
        return this.from.daySame(another.from) && this.to.daySame(another.to);
    }
    /**
     * Locks range between two days included, or limits from one side if the other is null
     *
     * @param min
     * @param max
     * @return range — clamped range
     */
    dayLimit(min, max) {
        return new TuiDayRange(this.from.dayLimit(min, max), this.to.dayLimit(min, max));
    }
    /**
     * Human readable format.
     */
    getFormattedDayRange(dateFormat, dateSeparator) {
        const from = this.from.getFormattedDay(dateFormat, dateSeparator);
        const to = this.to.getFormattedDay(dateFormat, dateSeparator);
        return `${from}${RANGE_SEPARATOR_CHAR}${to}`;
    }
    toString(dateFormat = 'DMY', dateSeparator = '.') {
        return this.getFormattedDayRange(dateFormat, dateSeparator);
    }
}

const TUI_FIRST_DAY = new TuiDay(MIN_YEAR, MIN_MONTH, MIN_DAY);
const TUI_LAST_DAY = new TuiDay(MAX_YEAR, MAX_MONTH, 31);

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
/**
 * Immutable time object with hours, minutes, seconds and ms
 */
class TuiTime {
    constructor(hours, minutes, seconds = 0, ms = 0) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.ms = ms;
        ngDevMode &&
            console.assert(
            // Currently `TuiTime` could have hours more than 23
            // in order to not break current behaviour of `isValidTime` the logic is duplicated
            Number.isInteger(hours) &&
                tuiInRange(hours, 0, Infinity) &&
                Number.isInteger(minutes) &&
                tuiInRange(minutes, 0, MINUTES_IN_HOUR) &&
                Number.isInteger(seconds) &&
                tuiInRange(seconds, 0, SECONDS_IN_MINUTE) &&
                Number.isInteger(ms) &&
                tuiInRange(ms, 0, 1000), 'Time must be real, but got:', hours, minutes, seconds, ms);
    }
    /**
     * Checks if time is valid
     */
    static isValidTime(hours, minutes, seconds = 0, ms = 0) {
        return (Number.isInteger(hours) &&
            tuiInRange(hours, 0, HOURS_IN_DAY) &&
            Number.isInteger(minutes) &&
            tuiInRange(minutes, 0, MINUTES_IN_HOUR) &&
            Number.isInteger(seconds) &&
            tuiInRange(seconds, 0, SECONDS_IN_MINUTE) &&
            Number.isInteger(ms) &&
            tuiInRange(ms, 0, 1000));
    }
    /**
     * Current UTC time.
     */
    static current() {
        return TuiTime.fromAbsoluteMilliseconds(Date.now() % MILLISECONDS_IN_DAY);
    }
    /**
     * Current time in local timezone
     */
    static currentLocal() {
        const date = new Date();
        return TuiTime.fromAbsoluteMilliseconds((Date.now() - date.getTimezoneOffset() * MILLISECONDS_IN_MINUTE) %
            MILLISECONDS_IN_DAY);
    }
    /**
     * Calculates TuiTime from milliseconds
     */
    static fromAbsoluteMilliseconds(milliseconds) {
        ngDevMode && console.assert(Number.isInteger(milliseconds));
        ngDevMode &&
            console.assert(tuiInRange(milliseconds, 0, MILLISECONDS_IN_DAY), `Milliseconds must be below ${MILLISECONDS_IN_DAY} (milliseconds in a day).`);
        const hours = Math.floor(milliseconds / MILLISECONDS_IN_HOUR);
        const minutes = Math.floor((milliseconds % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
        const seconds = Math.floor(((milliseconds % MILLISECONDS_IN_HOUR) % MILLISECONDS_IN_MINUTE) / 1000) || 0;
        const ms = Math.floor(((milliseconds % MILLISECONDS_IN_HOUR) % MILLISECONDS_IN_MINUTE) % 1000) || 0;
        return new TuiTime(hours, minutes, seconds, ms);
    }
    /**
     * Parses string into TuiTime object
     */
    static fromString(time) {
        const hours = Number(time.slice(0, 2));
        const minutes = Number(time.slice(3, 5)) || 0;
        const seconds = Number(time.slice(6, 8)) || 0;
        const ms = Number(time.slice(9, 12)) || 0;
        return new TuiTime(hours, minutes, seconds, ms);
    }
    /**
     * Converts Date object into TuiTime
     * @param date
     */
    static fromLocalNativeDate(date) {
        return new TuiTime(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }
    /**
     * Shifts time by hours and minutes
     */
    shift({ hours = 0, minutes = 0, seconds = 0, ms = 0 }) {
        const newMs = (1000 + this.ms + (ms % 1000)) % 1000;
        const secondsInMs = ms < 0 ? Math.ceil(ms / 1000) : Math.floor(ms / 1000);
        const secondsToAdd = secondsInMs + seconds;
        const newSeconds = (60 + this.seconds + (secondsToAdd % 60)) % 60;
        const minutesInSeconds = secondsToAdd < 0
            ? Math.ceil(secondsToAdd / 60)
            : Math.floor(secondsToAdd / 60);
        const minutesToAdd = minutesInSeconds + minutes;
        const newMinutes = (60 + this.minutes + (minutesToAdd % 60)) % 60;
        const hoursInMinutes = minutesToAdd < 0
            ? Math.ceil(minutesToAdd / 60)
            : Math.floor(minutesToAdd / 60);
        const hoursToAdd = hoursInMinutes + hours;
        const newHours = (24 + this.hours + (hoursToAdd % 24)) % 24;
        return new TuiTime(newHours, newMinutes, newSeconds, newMs);
    }
    /**
     * Converts TuiTime to string
     */
    toString(mode) {
        const needAddMs = mode === 'HH:MM:SS.MSS' || (!mode && this.ms > 0);
        const needAddSeconds = needAddMs || mode === 'HH:MM:SS' || (!mode && this.seconds > 0);
        const hhMm = `${this.formatTime(this.hours)}:${this.formatTime(this.minutes)}`;
        const ss = needAddSeconds ? `:${this.formatTime(this.seconds)}` : '';
        const mss = needAddMs ? `.${this.formatTime(this.ms, 3)}` : '';
        return `${hhMm}${ss}${mss}`;
    }
    valueOf() {
        return this.toAbsoluteMilliseconds();
    }
    /**
     * Returns the primitive value of the given Date object.
     * Depending on the argument, the method can return either a string or a number.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/@@toPrimitive
     */
    [Symbol.toPrimitive](hint) {
        return Date.prototype[Symbol.toPrimitive].call(this, hint);
    }
    /**
     * Converts TuiTime to milliseconds
     */
    toAbsoluteMilliseconds() {
        return (this.hours * MILLISECONDS_IN_HOUR +
            this.minutes * MILLISECONDS_IN_MINUTE +
            this.seconds * 1000 +
            this.ms);
    }
    formatTime(time, digits = 2) {
        return String(time).padStart(digits, '0');
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { DATE_FILLER_LENGTH, DATE_RANGE_FILLER_LENGTH, DAYS_IN_LEAP_YEAR, DAYS_IN_NORMAL_YEAR, DAYS_IN_WEEK, HOURS_IN_DAY, MAX_MONTH, MAX_YEAR, MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND, MINUTES_IN_HOUR, MIN_DAY, MIN_MONTH, MIN_YEAR, MONTHS_IN_YEAR, RANGE_SEPARATOR_CHAR, SECONDS_IN_MINUTE, TUI_FIRST_DAY, TUI_LAST_DAY, TuiDay, TuiDayOfWeek, TuiDayRange, TuiInvalidDayException, TuiMonth, TuiMonthNumber, TuiMonthRange, TuiTime, TuiYear, tuiDateClamp };
//# sourceMappingURL=taiga-ui-cdk-date-time.mjs.map
