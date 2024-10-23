"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceImports = void 0;
const ng_morph_1 = require("ng-morph");
const constants_1 = require("../../../constants");
const add_unique_import_1 = require("../../../utils/add-unique-import");
const import_manipulations_1 = require("../../../utils/import-manipulations");
const progress_1 = require("../../../utils/progress");
function replaceImports(replaceable, options) {
    const allImports = (0, ng_morph_1.getImports)(constants_1.ALL_TS_FILES);
    const progressLog = (0, progress_1.setupProgressLogger)({
        total: replaceable.length,
    });
    replaceable.forEach(({ from, to }) => {
        const importDeclarations = allImports.filter((declaration) => !declaration.wasForgotten() &&
            declaration.getModuleSpecifierValue() === from.moduleSpecifier &&
            declaration
                .getNamedImports()
                .some((specifier) => specifier.getName() === from.name));
        const namedImports = importDeclarations.map((declaration) => declaration
            .getNamedImports()
            .find((specifier) => specifier.getName() === from.name));
        namedImports.forEach((namedImport) => {
            if (ng_morph_1.Node.isImportSpecifier(namedImport) && !namedImport.wasForgotten()) {
                (0, import_manipulations_1.removeImport)(namedImport);
                (0, add_unique_import_1.addUniqueImport)(namedImport.getSourceFile().getFilePath(), to.namedImport || to.name, to.moduleSpecifier);
            }
        });
        !options['skip-logs'] && progressLog('replacing imports...', true);
    });
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} imports replaced \n`);
}
exports.replaceImports = replaceImports;
