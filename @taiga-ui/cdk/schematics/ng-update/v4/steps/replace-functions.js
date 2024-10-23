"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceFunctions = void 0;
const ng_morph_1 = require("ng-morph");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
function replaceFunctions(functions) {
    functions.forEach(({ from, to, moduleSpecifier }) => {
        (0, get_named_import_references_1.getNamedImportReferences)(from, moduleSpecifier).forEach((ref) => {
            if (ref.wasForgotten()) {
                return;
            }
            const parent = ref.getParent();
            if (ng_morph_1.Node.isImportSpecifier(parent) || ng_morph_1.Node.isCallExpression(parent)) {
                parent === null || parent === void 0 ? void 0 : parent.replaceWithText(parent === null || parent === void 0 ? void 0 : parent.getText({ includeJsDocComments: false }).trim().replace(from, to !== null && to !== void 0 ? to : from));
            }
        });
    });
}
exports.replaceFunctions = replaceFunctions;
