"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateAddonDoc = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const ng_morph_1 = require("ng-morph");
const file_globs_1 = require("../../../constants/file-globs");
const steps_1 = require("../../steps");
const remove_module_1 = require("../../steps/remove-module");
const get_file_system_1 = require("../../utils/get-file-system");
const replace_symbols_1 = require("./replace-symbols");
function migrateAddonDoc(options) {
    return (0, schematics_1.chain)([
        (tree, _context) => {
            const fileSystem = (0, get_file_system_1.getFileSystem)(tree);
            if (!(0, ng_morph_1.getPackageJsonDependency)(fileSystem.tree, '@taiga-ui/addon-doc')) {
                return;
            }
            !options['skip-logs'] &&
                (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} replacing...`);
            (0, remove_module_1.removeModules)(options, [
                {
                    name: 'tuiGenerateRoutes',
                    moduleSpecifier: '@taiga-ui/addon-doc',
                },
            ]);
            (0, steps_1.renameTypes)(options, [
                {
                    from: 'TuiDocExample',
                    to: 'Record<string, TuiRawLoaderContent>',
                    moduleSpecifier: ['@taiga-ui/addon-doc'],
                    removeImport: true,
                    newImports: [
                        {
                            name: 'TuiRawLoaderContent',
                            moduleSpecifier: '@taiga-ui/addon-doc',
                        },
                    ],
                },
            ]);
            (0, ng_morph_1.getSourceFiles)(file_globs_1.ALL_TS_FILES).forEach((file) => file.replaceWithText(file
                .getFullText()
                .replaceAll(/RouterModule\.forChild\(tuiGenerateRoutes\(\w+\)\)/g, 'RouterModule')));
            (0, steps_1.replaceIdentifiers)(options, replace_symbols_1.DOC_SYMBOLS_TO_REPLACE);
            fileSystem.commitEdits();
            (0, ng_morph_1.saveActiveProject)();
            !options['skip-logs'] &&
                (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} addon-doc successfully migrated \n`);
        },
    ]);
}
exports.migrateAddonDoc = migrateAddonDoc;
