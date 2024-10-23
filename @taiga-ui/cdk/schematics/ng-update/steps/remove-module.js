"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeModule = exports.removeModules = void 0;
const ng_morph_1 = require("ng-morph");
const get_named_import_references_1 = require("../../utils/get-named-import-references");
const import_manipulations_1 = require("../../utils/import-manipulations");
function removeModules(options, modules) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} removing modules...`);
    modules.forEach(({ name, moduleSpecifier }) => removeModule(name, moduleSpecifier));
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} modules removed \n`);
}
exports.removeModules = removeModules;
function removeModule(name, moduleSpecifier) {
    const references = (0, get_named_import_references_1.getNamedImportReferences)(name, moduleSpecifier);
    references.forEach((ref) => {
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        if (ng_morph_1.Node.isImportSpecifier(parent)) {
            (0, import_manipulations_1.removeImport)(parent);
        }
        else if (ng_morph_1.Node.isArrayLiteralExpression(parent)) {
            const index = parent.getElements().findIndex((el) => el.getText() === name);
            parent.removeElement(index);
        }
    });
}
exports.removeModule = removeModule;
