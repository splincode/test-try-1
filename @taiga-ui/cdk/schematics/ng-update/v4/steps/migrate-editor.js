"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateEditor = exports.TUI_EDITOR_VERSION = void 0;
const ng_morph_1 = require("ng-morph");
const file_globs_1 = require("../../../constants/file-globs");
const replace_identifier_1 = require("../../steps/replace-identifier");
const replace_package_name_1 = require("../../steps/replace-package-name");
exports.TUI_EDITOR_VERSION = '^4.11.0';
function migrateEditor(fileSystem, options) {
    const moduleSpecifier = ['@tinkoff/tui-editor', '@taiga-ui/addon-editor'];
    const hasEditor = moduleSpecifier.every((pkg) => !(0, ng_morph_1.getPackageJsonDependency)(fileSystem.tree, pkg));
    if (hasEditor) {
        return;
    }
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} migrating editor...`);
    (0, replace_identifier_1.replaceIdentifiers)(options, [
        {
            from: { name: 'TuiEditorModule', moduleSpecifier },
            to: [
                { name: 'TuiEditor', moduleSpecifier: '@taiga-ui/editor' },
                { name: 'TuiEditorSocket', moduleSpecifier: '@taiga-ui/editor' },
            ],
        },
        {
            from: { name: 'TuiEditorSocketModule', moduleSpecifier },
            to: { name: 'TuiEditorSocket', moduleSpecifier: '@taiga-ui/editor' },
        },
        {
            from: { name: 'TuiToolbarModule', moduleSpecifier },
            to: { name: 'TuiToolbar', moduleSpecifier: '@taiga-ui/editor' },
        },
        {
            from: { name: 'defaultEditorExtensions', moduleSpecifier },
            to: {
                name: 'TUI_EDITOR_DEFAULT_EXTENSIONS',
                moduleSpecifier: '@taiga-ui/editor',
            },
        },
        {
            from: { name: 'TUI_EDITOR_DEFAULT_EXTENSIONS', moduleSpecifier },
            to: {
                name: 'TUI_EDITOR_DEFAULT_EXTENSIONS',
                moduleSpecifier: '@taiga-ui/editor',
            },
        },
        {
            from: [
                { name: 'defaultEditorTools', moduleSpecifier },
                { name: 'TUI_EDITOR_DEFAULT_TOOLS', moduleSpecifier },
            ],
            to: { name: 'TUI_EDITOR_DEFAULT_TOOLS', moduleSpecifier: '@taiga-ui/editor' },
        },
        {
            from: { name: 'TUI_EDITOR_DEFAULT_EDITOR_TOOLS', moduleSpecifier },
            to: { name: 'TUI_EDITOR_DEFAULT_TOOLS', moduleSpecifier: '@taiga-ui/editor' },
        },
        {
            from: { name: 'TuiColorPickerModule', moduleSpecifier },
            to: { name: 'TuiColorPickerModule', moduleSpecifier: '@taiga-ui/legacy' },
        },
        {
            from: { name: 'TuiInputColorModule', moduleSpecifier },
            to: { name: 'TuiInputColorModule', moduleSpecifier: '@taiga-ui/legacy' },
        },
    ]);
    (0, ng_morph_1.getSourceFiles)(file_globs_1.ALL_TS_FILES).forEach((sourceFile) => sourceFile.replaceWithText(sourceFile
        .getFullText()
        .replaceAll(/import\(['"`](@tinkoff|@taiga-ui)\/(tui-editor|addon-editor)\/(.*)['"`]\)/g, "import('@taiga-ui/editor')")));
    (0, ng_morph_1.saveActiveProject)();
    moduleSpecifier.forEach((pkg) => (0, replace_package_name_1.replacePackageName)(pkg, { name: '@taiga-ui/editor', version: exports.TUI_EDITOR_VERSION }, fileSystem.tree));
    (0, ng_morph_1.saveActiveProject)();
    !options['skip-logs'] && (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} successfully migrated \n`);
}
exports.migrateEditor = migrateEditor;
