"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceEnums = void 0;
const ng_morph_1 = require("ng-morph");
const get_named_import_references_1 = require("../../utils/get-named-import-references");
const import_manipulations_1 = require("../../utils/import-manipulations");
function replaceEnumWithString(enumName, replaceValues, keepAsType = true) {
    var _a;
    const references = (0, get_named_import_references_1.getNamedImportReferences)(enumName);
    for (const ref of references) {
        if (ref.wasForgotten()) {
            continue;
        }
        const parent = ref.getParent();
        if (ng_morph_1.Node.isImportSpecifier(parent) && !(keepAsType && containTypeRef(parent))) {
            (0, import_manipulations_1.removeImport)(parent);
            continue;
        }
        if (ng_morph_1.Node.isTypeReference(parent) && !keepAsType) {
            const declaration = parent.getParent();
            (_a = declaration.removeType) === null || _a === void 0 ? void 0 : _a.call(declaration);
            continue;
        }
        if (!ng_morph_1.Node.isPropertyAccessExpression(parent)) {
            continue;
        }
        const key = Object.keys(replaceValues).find((key) => parent.getName() === key);
        if (key) {
            parent.replaceWithText(`'${replaceValues[key]}'`);
        }
    }
}
function containTypeRef(node) {
    return node
        .getNameNode()
        .findReferencesAsNodes()
        .some((ref) => ng_morph_1.Node.isTypeReference(ref.getParent()));
}
function replaceEnums(options, enums) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} replacing enums imports...`);
    enums.forEach(({ name, replaceValues, keepAsType }) => replaceEnumWithString(name, replaceValues, keepAsType));
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} enums replaced \n`);
}
exports.replaceEnums = replaceEnums;
