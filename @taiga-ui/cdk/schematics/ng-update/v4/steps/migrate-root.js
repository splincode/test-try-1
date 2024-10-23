"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateRoot = void 0;
const ng_morph_1 = require("ng-morph");
const add_unique_import_1 = require("../../../utils/add-unique-import");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
const import_manipulations_1 = require("../../../utils/import-manipulations");
function migrateRoot(fileSystem, options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} updating TuiRoot`);
    const refs = [
        ...(0, get_named_import_references_1.getNamedImportReferences)('TuiRootModule', '@taiga-ui/core'),
        ...(0, get_named_import_references_1.getNamedImportReferences)('TuiProprietaryRootModule', '@taiga-ui/proprietary-core'),
        ...(0, get_named_import_references_1.getNamedImportReferences)('TuiProprietaryRoot2023Module', '@taiga-ui/proprietary-core'),
    ];
    for (const ref of refs) {
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        if (ng_morph_1.Node.isImportSpecifier(parent)) {
            (0, import_manipulations_1.removeImport)(parent);
            (0, add_unique_import_1.addUniqueImport)(parent.getSourceFile().getFilePath(), 'TuiRoot', '@taiga-ui/core');
        }
        else {
            replaceRootIdentifier(ref, fileSystem);
        }
    }
}
exports.migrateRoot = migrateRoot;
function replaceRootIdentifier(ref, fileSystem) {
    const callExpression = ref.getParentWhile(ng_morph_1.Node.isCallExpression);
    if (callExpression &&
        callExpression.getExpression().getText() === 'importProvidersFrom') {
        const node = callExpression
            .getArguments()
            .find((arg) => arg.getText() === ref.getText());
        if (node) {
            callExpression.removeArgument(node);
            addProviders({ callExpression, fileSystem });
        }
    }
    else {
        ref.replaceWithText('TuiRoot');
        addProviders({ fileSystem, modulePath: ref.getSourceFile().getFilePath() });
    }
}
function addProviders({ callExpression, fileSystem, modulePath, }) {
    var _a;
    const providersArray = callExpression === null || callExpression === void 0 ? void 0 : callExpression.getParentWhile(ng_morph_1.Node.isArrayLiteralExpression);
    const module = modulePath && ((_a = (0, ng_morph_1.getNgModules)(modulePath)) === null || _a === void 0 ? void 0 : _a[0]);
    if (!providersArray && !modulePath) {
        return;
    }
    const path = providersArray
        ? providersArray.getSourceFile().getFilePath()
        : modulePath || '';
    if (providersArray) {
        providersArray.addElement('NG_EVENT_PLUGINS');
    }
    else if (module) {
        (0, ng_morph_1.addProviderToNgModule)(module, 'NG_EVENT_PLUGINS', { unique: true });
    }
    if (providersArray || module) {
        (0, add_unique_import_1.addUniqueImport)(path, 'NG_EVENT_PLUGINS', '@taiga-ui/event-plugins');
    }
    (0, ng_morph_1.getActiveProject)();
    const proprietary = (0, ng_morph_1.getPackageJsonDependency)(fileSystem.tree, '@taiga-ui/proprietary-core') ||
        (0, ng_morph_1.getPackageJsonDependency)(fileSystem.tree, '@taiga-ui/proprietary');
    if (proprietary) {
        if (providersArray) {
            providersArray.addElement('TBANK_PROVIDERS');
        }
        else if (module) {
            (0, ng_morph_1.addProviderToNgModule)(module, 'TBANK_PROVIDERS', { unique: true });
        }
        if (providersArray || module) {
            (0, add_unique_import_1.addUniqueImport)(path, 'TBANK_PROVIDERS', '@taiga-ui/proprietary');
        }
    }
}
