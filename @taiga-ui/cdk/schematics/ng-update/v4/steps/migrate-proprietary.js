"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProprietaryPackages = exports.migrateProprietary = void 0;
const ng_morph_1 = require("ng-morph");
const version_1 = require("../../../../constants/version");
function migrateProprietary(fileSystem, options) {
    try {
        const proprietary = (0, ng_morph_1.getPackageJsonDependency)(fileSystem.tree, '@taiga-ui/proprietary-core') ||
            (0, ng_morph_1.getPackageJsonDependency)(fileSystem.tree, '@taiga-ui/proprietary');
        if (!proprietary) {
            return;
        }
        !options['skip-logs'] &&
            (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} migrating proprietary...`);
        replaceScopePackages();
        replaceProprietaryIconPath();
        removeProprietaryPackages(fileSystem);
        (0, ng_morph_1.addPackageJsonDependency)(fileSystem.tree, {
            name: '@taiga-ui/proprietary',
            version: version_1.TUI_VERSION,
            type: proprietary.type,
        });
        fileSystem.commitEdits();
        (0, ng_morph_1.saveActiveProject)();
    }
    catch (_a) { }
}
exports.migrateProprietary = migrateProprietary;
function replaceScopePackages() {
    var _a;
    (_a = (0, ng_morph_1.getActiveProject)()) === null || _a === void 0 ? void 0 : _a.getSourceFiles('**/**.{ts,less,scss}').forEach((sourceFile) => {
        let fullText = sourceFile.getFullText();
        fullText = fullText
            .replaceAll('@taiga-ui/proprietary-core', '@taiga-ui/proprietary')
            .replaceAll('@taiga-ui/proprietary-banking', '@taiga-ui/proprietary')
            .replaceAll('@taiga-ui/proprietary-navigation', '@taiga-ui/proprietary')
            .replaceAll('@taiga-ui/proprietary-icons', '@taiga-ui/proprietary')
            .replaceAll('@taiga-ui/proprietary-tds-icons', '@taiga-ui/proprietary')
            .replaceAll('@taiga-ui/proprietary-tds-palette', '@taiga-ui/proprietary');
        sourceFile.replaceWithText(fullText);
    });
}
function replaceProprietaryIconPath() {
    var _a;
    (_a = (0, ng_morph_1.getActiveProject)()) === null || _a === void 0 ? void 0 : _a.getSourceFiles('**/{angular,project}.json').forEach((sourceFile) => {
        let fullText = sourceFile.getFullText();
        fullText = fullText
            .replaceAll('node_modules/@taiga-ui/proprietary-icons/src', '@taiga-ui/proprietary/design-tokens/icons/src')
            .replaceAll('@taiga-ui/proprietary-icons/src', '@taiga-ui/proprietary/design-tokens/icons/src')
            .replaceAll('node_modules/@taiga-ui/proprietary-tds-icons/src', '@taiga-ui/proprietary/design-tokens/icons/src')
            .replaceAll('@taiga-ui/proprietary-tds-icons/src', '@taiga-ui/proprietary/design-tokens/icons/src');
        sourceFile.replaceWithText(fullText);
    });
}
function removeProprietaryPackages(fileSystem) {
    [
        '@taiga-ui/proprietary-core',
        '@taiga-ui/proprietary-navigation',
        '@taiga-ui/proprietary-banking',
        '@taiga-ui/proprietary-icons',
        '@taiga-ui/proprietary-tds-icons',
        '@taiga-ui/proprietary-tds-palette',
    ].forEach((name) => (0, ng_morph_1.removePackageJsonDependency)(fileSystem.tree, name));
}
exports.removeProprietaryPackages = removeProprietaryPackages;
