"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateIcons = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const ng_morph_1 = require("ng-morph");
const get_file_system_1 = require("../../utils/get-file-system");
const rename_icons_1 = require("./rename-icons");
const rename_proprietary_icons_1 = require("./rename-proprietary-icons");
function migrateIcons(options) {
    return (0, schematics_1.chain)([
        (tree, context) => {
            const fileSystem = (0, get_file_system_1.getFileSystem)(tree);
            !options['skip-logs'] &&
                (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} replacing icons...`);
            if (hasProprietaryIcons(tree)) {
                (0, rename_proprietary_icons_1.renameProprietaryIcons)(context);
            }
            else {
                (0, rename_icons_1.renameIcons)();
            }
            fileSystem.commitEdits();
            (0, ng_morph_1.saveActiveProject)();
            !options['skip-logs'] &&
                (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} Icons successfully migrated \n`);
        },
    ]);
}
exports.migrateIcons = migrateIcons;
function hasProprietaryIcons(tree) {
    return (!!(0, ng_morph_1.getPackageJsonDependency)(tree, '@taiga-ui/proprietary-icons') ||
        !!(0, ng_morph_1.getPackageJsonDependency)(tree, '@taiga-ui/proprietary'));
}
