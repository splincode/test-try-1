"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameCssVars = void 0;
/// <reference lib="es2021" />
const ng_morph_1 = require("ng-morph");
const constants_1 = require("../../../constants");
const palette_1 = require("./palette");
function renameCssVars(pattern = constants_1.ALL_FILES) {
    const sourceFiles = (0, ng_morph_1.getSourceFiles)(pattern);
    sourceFiles.forEach((file) => {
        let text = file.getFullText();
        // leave comments
        if (!file.getFilePath().endsWith('html')) {
            palette_1.DEPRECATE_VARS_WITH_COMMENT.forEach((variable) => {
                const wordRegex = new RegExp(`(^|\\n)(?=[^\\n]*\\b${variable}\\b)`, 'g');
                text = text.replaceAll(wordRegex, `$1// ${palette_1.NIGHT_VAR_COMMENT}\n`);
            });
        }
        const placeholders = {};
        Object.keys(palette_1.DEPRECATED_VARS).forEach((key, index) => {
            placeholders[key] = `__PLACEHOLDER_${index}__`;
        });
        Object.entries(palette_1.DEPRECATED_VARS)
            .sort(([prev], [next]) => (prev.length < next.length ? 1 : -1))
            .map(([from, to]) => ({
            from: new RegExp(`${from}`, 'g'),
            to,
        }))
            .forEach(({ from }) => {
            text = text.replace(from, (matched) => { var _a; return (_a = placeholders[matched]) !== null && _a !== void 0 ? _a : ''; });
        });
        const placeholderPattern = new RegExp(Object.values(placeholders).join('|'), 'g');
        text = text.replaceAll(placeholderPattern, (matched) => {
            const originalKey = Object.keys(placeholders).find((key) => placeholders[key] === matched);
            return palette_1.DEPRECATED_VARS[originalKey];
        });
        Object.entries(palette_1.DEPRECATED_NUMERIC_VARS)
            .map(([from, to]) => ({
            from: new RegExp(`${from}`, 'g'),
            to,
        }))
            .forEach(({ from, to }) => {
            text = text.replaceAll(from, to);
        });
        file.replaceWithText(text);
    });
}
exports.renameCssVars = renameCssVars;
