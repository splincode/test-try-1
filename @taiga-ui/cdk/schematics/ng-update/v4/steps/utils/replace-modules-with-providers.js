"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceModulesWithProviders = void 0;
const ng_morph_1 = require("ng-morph");
const add_unique_import_1 = require("../../../../utils/add-unique-import");
const get_named_import_references_1 = require("../../../../utils/get-named-import-references");
const import_manipulations_1 = require("../../../../utils/import-manipulations");
const replaceModulesWithProviders = (options, list) => {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} replacing modules with providers...`);
    list.forEach(replaceModule);
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} modules replaced \n`);
};
exports.replaceModulesWithProviders = replaceModulesWithProviders;
function replaceModule({ from, to }) {
    const references = (0, get_named_import_references_1.getNamedImportReferences)(from.name, from.moduleSpecifier);
    const toReplace = Array.isArray(to) ? to : [to];
    references.forEach((ref) => {
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        if (ng_morph_1.Node.isImportSpecifier(parent)) {
            (0, import_manipulations_1.removeImport)(parent);
            toReplace.forEach((provider) => addImport(provider, parent.getSourceFile().getFilePath()));
        }
        else if (ng_morph_1.Node.isArrayLiteralExpression(parent)) {
            const index = parent
                .getElements()
                .findIndex((el) => el.getText() === from.name);
            parent.removeElement(index);
            toReplace.forEach((provider) => addProvider(provider, parent.getSourceFile().getFilePath()));
        }
    });
}
function addImport(identifier, filePath) {
    (0, add_unique_import_1.addUniqueImport)(filePath, identifier.name, identifier.providerSpecifier);
}
function addProvider(identifier, filePath) {
    const provider = `${identifier.name}${identifier.isFunction ? '()' : ''}`;
    const componentClass = (0, ng_morph_1.getNgComponents)(filePath)[0];
    if (componentClass) {
        (0, ng_morph_1.addProviderToComponent)(componentClass, provider);
    }
    const moduleClass = (0, ng_morph_1.getNgModules)(filePath)[0];
    if (moduleClass) {
        (0, ng_morph_1.addProviderToNgModule)(moduleClass, provider);
    }
}
