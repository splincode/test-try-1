function tuiGetGradientData(gradient) {
    return gradient
        .slice(0, Math.max(0, gradient.length - 1))
        .replace('linear-gradient(', '');
}

function tuiHexToRgb(hex) {
    const matches = hex
        .replace('#', '')
        .split('')
        .map((char, _, array) => (array.length === 3 ? char + char : char))
        .join('')
        .match(/.{2}/g);
    return matches
        ? matches.map((x) => Number.parseInt(x, 16))
        : [0, 0, 0];
}

const getChunksFromString = (hex, chunkSize) => hex.match(new RegExp(`.{${chunkSize}}`, 'g'));
const convertHexUnitTo256 = (hexStr) => parseInt(hexStr.repeat(2 / hexStr.length), 16);
const getAlphaFloat = (a, alpha) => {
    if (a !== undefined) {
        return Number((a / 255).toFixed(2));
    }
    if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
        return 1;
    }
    return alpha;
};
function tuiHexToRGBA(hex, alpha) {
    const [r, g, b, a] = tuiParseHex(hex, alpha);
    return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
}
function tuiIsValidHex(hex) {
    return /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
}
function tuiParseHex(hex, alpha) {
    if (!tuiIsValidHex(hex)) {
        throw new Error('Invalid HEX');
    }
    const chunkSize = Math.floor((hex.length - 1) / 3);
    const hexArr = getChunksFromString(hex.slice(1), chunkSize);
    const [r = NaN, g = NaN, b = NaN, a] = hexArr?.map(convertHexUnitTo256) ?? [];
    const floatAlpha = getAlphaFloat(a, alpha);
    return [r, g, b, floatAlpha];
}

function hsvToColor(h, s, v, n) {
    const k = (n + h / 60) % 6;
    return Math.round(v - v * s * Math.max(Math.min(k, 4 - k, 1), 0));
}
/**
 * https://stackoverflow.com/a/54024653/2706426
 */
function tuiHsvToRgb(h, s, v) {
    return [hsvToColor(h, s, v, 5), hsvToColor(h, s, v, 3), hsvToColor(h, s, v, 1)];
}

const DEFAULT = [0, 0, 0, 1];
function tuiParseColor(color) {
    const stripped = color
        .replace('#', '')
        .replace('rgba(', '')
        .replace('rgb(', '')
        .replace(')', '');
    const array = stripped.split(',').map((item) => parseFloat(item));
    if (array.length === 4) {
        return array;
    }
    if (array.length === 3) {
        return array.concat(1);
    }
    const matches = stripped.match(new RegExp(`(.{${stripped.length / 3}})`, 'g'));
    if (!matches) {
        return DEFAULT;
    }
    const parsed = matches.map((char) => parseInt(stripped.length % 2 ? char + char : char, 16));
    return [
        parsed[0] ?? DEFAULT[0],
        parsed[1] ?? DEFAULT[1],
        parsed[2] ?? DEFAULT[2],
        parsed[3] ?? DEFAULT[3],
    ];
}

//
// TypeScript parser based on Dean Taylor's answer:
// https://stackoverflow.com/a/20238168/2706426
//
// SETUP CODE
const COMMA = String.raw `\s*,\s*`; // Allow space around comma.
const HEX = '#(?:[a-f0-9]{6}|[a-f0-9]{3})'; // 3 or 6 character form
const RGB = String.raw `\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*\)`; // "(1, 2, 3)"
const RGBA = String.raw `\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*,\s*\d*\.?\d+\)`; // "(1, 2, 3, 4)"
const VALUE = String.raw `(?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?`; // ".9", "-5px", "100%".
const KEYWORD = '[_a-z-][_a-z0-9-]*'; // "red", "transparent", "border-collapse".
const COLOR = [
    '(?:',
    HEX,
    '|',
    '(?:rgb|hsl)',
    RGB,
    '|',
    '(?:rgba|hsla)',
    RGBA,
    '|',
    KEYWORD,
    ')',
];
const REGEXP_ARRAY = [
    String.raw `\s*(`,
    ...COLOR,
    ')',
    String.raw `(?:\s+`,
    '(',
    VALUE,
    '))?',
    '(?:',
    COMMA,
    String.raw `\s*)?`,
];
function getPosition(match, stops) {
    const fallback = stops === 1 ? '100%' : `${stops}%`;
    return match?.includes('%') ? match : fallback;
}
function tuiParseGradient(input) {
    const stopsRegexp = new RegExp(REGEXP_ARRAY.join(''), 'gi');
    const stopsString = input.startsWith('to') || /^\d/.exec(input)
        ? input.slice(Math.max(0, input.indexOf(',') + 1)).trim()
        : input;
    const side = input.startsWith('to')
        ? input.split(',')[0]
        : 'to bottom';
    let stops = [];
    let matchColorStop = stopsRegexp.exec(stopsString);
    while (matchColorStop !== null) {
        stops = stops.concat({
            color: matchColorStop[1] || '',
            position: getPosition(matchColorStop[2] || '', stops.length),
        });
        matchColorStop = stopsRegexp.exec(stopsString);
    }
    stops = stops.filter(({ color }) => color.startsWith('#') || color.startsWith('rgb'));
    return {
        stops,
        side,
    };
}
function tuiToGradient({ stops, side }) {
    return `linear-gradient(${side}, ${stops
        .map(({ color, position }) => `rgba(${tuiParseColor(color).join(', ')}) ${position}`)
        .join(', ')})`;
}

function tuiRgbToHex(r, g, b) {
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

function tuiRgbToHsv(r, g, b) {
    const v = Math.max(r, g, b);
    const n = v - Math.min(r, g, b);
    // eslint-disable-next-line no-nested-ternary
    const h = n && (v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n);
    return [60 * (h < 0 ? h + 6 : h), v && n / v, v];
}

function tuiRgbaToHex(color) {
    if (!tuiIsValidRgba(color)) {
        throw new Error('Invalid RGBa');
    }
    const rgb = /^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i.exec(color.replaceAll(/\s/g, '')) ??
        null;
    let alpha = (rgb?.[4] ?? '').toString().trim();
    let hex = rgb
        ? ((parseInt(rgb?.[1] ?? '', 10) || 0) | (1 << 8)).toString(16).slice(1) +
            ((parseInt(rgb?.[2] ?? '', 10) || 0) | (1 << 8)).toString(16).slice(1) +
            ((parseInt(rgb?.[3] ?? '', 10) || 0) | (1 << 8)).toString(16).slice(1)
        : color;
    alpha = alpha !== '' ? alpha : 0o1;
    alpha = ((Number(alpha) * 255) | (1 << 8)).toString(16).slice(1);
    hex += alpha;
    return `#${hex.toUpperCase()}`;
}
function tuiIsValidRgba(rgba) {
    const range = String.raw `(\d|[1-9]\d|1\d{2}|2[0-4]\d|2[0-5]{2})`;
    const alpha = String.raw `([01]|0?\.\d+)`;
    return new RegExp(`^(?:rgb\\(\\s*${range}\\s*,\\s*${range}\\s*,\\s*${range}\\s*\\)|rgba\\(\\s*${range}\\s*,\\s*${range}\\s*,\\s*${range}\\s*,\\s*${alpha}\\s*\\))$`).test(rgba);
}

/**
 * Generated bundle index. Do not edit.
 */

export { tuiGetGradientData, tuiHexToRGBA, tuiHexToRgb, tuiHsvToRgb, tuiIsValidHex, tuiIsValidRgba, tuiParseColor, tuiParseGradient, tuiParseHex, tuiRgbToHex, tuiRgbToHsv, tuiRgbaToHex, tuiToGradient };
//# sourceMappingURL=taiga-ui-cdk-utils-color.mjs.map
