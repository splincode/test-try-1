"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateLegacyMask = void 0;
const ng_morph_1 = require("ng-morph");
const add_unique_import_1 = require("../../../utils/add-unique-import");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
const import_manipulations_1 = require("../../../utils/import-manipulations");
function migrateLegacyMask(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} migrating legacy mask utils...`);
    migrateTuiMaskedMoneyValueIsEmpty(options);
    migrateTuiMaskedNumberStringToNumber(options);
    !options['skip-logs'] && (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} successfully migrated \n`);
}
exports.migrateLegacyMask = migrateLegacyMask;
function migrateTuiMaskedMoneyValueIsEmpty(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} tuiMaskedMoneyValueIsEmpty`);
    const references = (0, get_named_import_references_1.getNamedImportReferences)('tuiMaskedMoneyValueIsEmpty', '@taiga-ui/core');
    references.forEach((ref) => {
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        if (ng_morph_1.Node.isImportSpecifier(parent)) {
            (0, import_manipulations_1.removeImport)(parent);
            (0, add_unique_import_1.addUniqueImport)(parent.getSourceFile().getFilePath(), 'maskitoParseNumber', '@maskito/kit');
        }
        else if (ng_morph_1.Node.isCallExpression(parent)) {
            const [value] = parent.getArguments();
            parent.replaceWithText(`Number.isNaN(maskitoParseNumber(${value === null || value === void 0 ? void 0 : value.getText()}, ','))`);
        }
    });
}
function migrateTuiMaskedNumberStringToNumber(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} tuiMaskedNumberStringToNumber`);
    const references = (0, get_named_import_references_1.getNamedImportReferences)('tuiMaskedNumberStringToNumber', '@taiga-ui/core');
    references.forEach((ref) => {
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        if (ng_morph_1.Node.isImportSpecifier(parent)) {
            (0, import_manipulations_1.removeImport)(parent);
            (0, add_unique_import_1.addUniqueImport)(parent.getSourceFile().getFilePath(), 'maskitoParseNumber', '@maskito/kit');
        }
        else if (ng_morph_1.Node.isCallExpression(parent)) {
            const [value, decimalSeparator] = parent.getArguments();
            parent.replaceWithText(`maskitoParseNumber(${value === null || value === void 0 ? void 0 : value.getText()}, ${decimalSeparator === null || decimalSeparator === void 0 ? void 0 : decimalSeparator.getText()})`);
        }
    });
}
