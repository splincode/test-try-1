"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceServices = void 0;
const ng_morph_1 = require("ng-morph");
const add_unique_import_1 = require("../../utils/add-unique-import");
const get_named_import_references_1 = require("../../utils/get-named-import-references");
const import_manipulations_1 = require("../../utils/import-manipulations");
function replaceService({ from, to, replaceMethods }, options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.processLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.PROCESSING_SYMBOL}replacing ${from.name}...`);
    const references = (0, get_named_import_references_1.getNamedImportReferences)(from.name, from.moduleSpecifier);
    references.forEach((ref) => {
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        if (ng_morph_1.Node.isImportSpecifier(parent)) {
            (0, import_manipulations_1.removeImport)(parent);
            (0, add_unique_import_1.addUniqueImport)(parent.getSourceFile().getFilePath(), to.namedImport || to.name, to.moduleSpecifier);
            return;
        }
        if (ng_morph_1.Node.isTypeReference(parent) && (replaceMethods === null || replaceMethods === void 0 ? void 0 : replaceMethods.length)) {
            replaceProperties(parent, replaceMethods);
        }
        ref.replaceWithText(to.name);
    });
}
function replaceProperties(parent, replaceProperties) {
    const statement = parent.getParent();
    const identifier = statement.getChildrenOfKind(ng_morph_1.SyntaxKind.Identifier)[0];
    identifier === null || identifier === void 0 ? void 0 : identifier.findReferencesAsNodes().forEach((ref) => {
        let parent = ref.getParent();
        if ((ng_morph_1.Node.isPropertyAccessExpression(parent) &&
            parent.getText().startsWith('this.')) ||
            ng_morph_1.Node.isCallExpression(parent)) {
            parent = parent.getParentIfKind(ng_morph_1.SyntaxKind.PropertyAccessExpression);
        }
        if (ng_morph_1.Node.isPropertyAccessExpression(parent)) {
            replaceProperty(parent, replaceProperties);
        }
    });
}
function replaceProperty(node, properties) {
    const identifiers = node.getChildrenOfKind(ng_morph_1.SyntaxKind.Identifier);
    identifiers.forEach((identifier) => {
        const property = properties === null || properties === void 0 ? void 0 : properties.find((property) => property.from === identifier.getText());
        if (property) {
            identifier.replaceWithText(property.to);
        }
    });
}
function replaceServices(options, services) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} replacing services...`);
    services.forEach((service) => replaceService(service, options));
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} services replaced \n`);
}
exports.replaceServices = replaceServices;
