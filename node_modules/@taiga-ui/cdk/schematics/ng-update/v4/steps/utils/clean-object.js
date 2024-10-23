"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObject = void 0;
function checkValueIsEmpty(value) {
    // eslint-disable-next-line
    const nextValue = typeof value === 'string' ? value.trim() : value;
    return ['', NaN, null, undefined].includes(nextValue);
}
function cleanObject(object) {
    return JSON.parse(JSON.stringify(object, (_key, value) => checkValueIsEmpty(value) ? undefined : value));
}
exports.cleanObject = cleanObject;
