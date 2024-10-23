"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameTypes = void 0;
const ng_morph_1 = require("ng-morph");
const add_unique_import_1 = require("../../utils/add-unique-import");
const get_named_import_references_1 = require("../../utils/get-named-import-references");
const import_manipulations_1 = require("../../utils/import-manipulations");
function renameType({ from, to, moduleSpecifier, preserveGenerics = false, removeImport = false, newImports = [], }) {
    const references = (0, get_named_import_references_1.getNamedImportReferences)(from, moduleSpecifier);
    references.forEach((ref) => {
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        if (ng_morph_1.Node.isImportSpecifier(parent)) {
            processImport(parent, from, to, removeImport);
        }
        else if (ng_morph_1.Node.isTypeReference(parent)) {
            const targetType = preserveGenerics && to ? addGeneric(to, parent.getTypeArguments()) : to;
            parent.replaceWithText(targetType || 'any');
            newImports.forEach(({ name, moduleSpecifier }) => {
                (0, add_unique_import_1.addUniqueImport)(parent.getSourceFile().getFilePath(), name, moduleSpecifier);
            });
        }
    });
}
function processImport(node, from, to, remove) {
    const filePath = node.getSourceFile().getFilePath();
    const targetImportAlreadyExists = Boolean((0, ng_morph_1.getImports)(filePath, { namedImports: to }).length);
    if (to && !targetImportAlreadyExists && !remove) {
        (0, import_manipulations_1.renameImport)(node, removeGeneric(to), removeGeneric(from));
    }
    else {
        (0, import_manipulations_1.removeImport)(node);
    }
}
function removeGeneric(type) {
    return type.replaceAll(/<.*>$/gi, '');
}
function addGeneric(typeName, generics) {
    const typeArgs = generics.map((t) => t.getType().getText());
    const genericType = typeArgs.length ? `<${typeArgs.join(', ')}>` : '';
    return typeName + genericType;
}
function renameTypes(options, types) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} renaming types...`);
    types.forEach(renameType);
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} types renamed \n`);
}
exports.renameTypes = renameTypes;
