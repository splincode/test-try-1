"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceIdentifier = exports.replaceIdentifiers = void 0;
const ng_morph_1 = require("ng-morph");
const add_unique_import_1 = require("../../utils/add-unique-import");
const get_named_import_references_1 = require("../../utils/get-named-import-references");
const import_manipulations_1 = require("../../utils/import-manipulations");
const progress_1 = require("../../utils/progress");
function replaceIdentifiers(options, constants) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} replacing identifiers...`);
    const progressLog = (0, progress_1.setupProgressLogger)({
        total: constants.length,
    });
    constants.forEach(({ from, to }) => {
        toArray(from).forEach((x) => replaceIdentifier({ from: x, to }));
        !options['skip-logs'] &&
            progressLog(toArray(from)
                .map((x) => x.name)
                .join(', '));
    });
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} identifiers replaced \n`);
}
exports.replaceIdentifiers = replaceIdentifiers;
function replaceIdentifier({ from, to }) {
    const references = toArray(from)
        .map(({ name, moduleSpecifier }) => (0, get_named_import_references_1.getNamedImportReferences)(name, moduleSpecifier))
        .flat();
    references.forEach((ref) => {
        var _a;
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        if (ng_morph_1.Node.isImportSpecifier(parent)) {
            (0, import_manipulations_1.removeImport)(parent);
            addImports(to, parent.getSourceFile().getFilePath());
        }
        else {
            const decorator = ref.getParentWhile((node) => node.getKindName() !== 'Decorator');
            const inModule = ((_a = decorator === null || decorator === void 0 ? void 0 : decorator.getFirstChildIfKind(ng_morph_1.ts.SyntaxKind.Identifier)) === null || _a === void 0 ? void 0 : _a.getText()) ===
                'NgModule';
            ref.replaceWithText(getReplacementText(to, !!inModule));
        }
    });
}
exports.replaceIdentifier = replaceIdentifier;
function addImports(identifier, filePath) {
    toArray(identifier).forEach(({ name, namedImport, moduleSpecifier }) => {
        (0, add_unique_import_1.addUniqueImport)(filePath, namedImport || name, moduleSpecifier);
    });
}
function getReplacementText(to, inModule) {
    return toArray(to)
        .map(({ name, spreadInModule }) => spreadInModule && inModule ? `...${name}` : name)
        .join(', ');
}
function toArray(x) {
    return Array.isArray(x) ? x : [x];
}
