"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameImport = exports.removeImport = void 0;
function removeImport(specifier) {
    if (specifier.getImportDeclaration().getNamedImports().length === 1) {
        specifier.getImportDeclaration().remove();
    }
    else {
        specifier.remove();
    }
}
exports.removeImport = removeImport;
function renameImport(specifier, to, from) {
    const namedImport = specifier
        .getImportDeclaration()
        .getNamedImports()
        .find((specifier) => specifier.getName() === from);
    namedImport === null || namedImport === void 0 ? void 0 : namedImport.replaceWithText(to);
}
exports.renameImport = renameImport;
