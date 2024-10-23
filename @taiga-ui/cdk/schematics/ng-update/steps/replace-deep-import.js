"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceDeepImports = void 0;
const ng_morph_1 = require("ng-morph");
const constants_1 = require("../../constants");
const DEEP_REGEX = /(@taiga-ui\/\w+)\/.*/;
function replaceDeepImports(options) {
    if (options['skip-deep-imports']) {
        return;
    }
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} replacing deep imports...`);
    const deepImports = (0, ng_morph_1.getImports)(constants_1.ALL_TS_FILES).filter((imp) => DEEP_REGEX.test(imp.getModuleSpecifier().getLiteralValue()));
    (0, ng_morph_1.editImports)(deepImports, (deepImport) => {
        const specifier = deepImport.moduleSpecifier.replace(DEEP_REGEX, '$1');
        return { moduleSpecifier: specifier };
    });
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} deep imports replaced \n`);
}
exports.replaceDeepImports = replaceDeepImports;
