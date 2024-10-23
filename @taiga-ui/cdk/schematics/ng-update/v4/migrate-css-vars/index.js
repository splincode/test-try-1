"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateCssVars = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const ng_morph_1 = require("ng-morph");
const get_file_system_1 = require("../../utils/get-file-system");
const rename_css_vars_1 = require("./rename-css-vars");
function migrateCssVars(options) {
    return (0, schematics_1.chain)([
        (tree, _) => {
            const fileSystem = (0, get_file_system_1.getFileSystem)(tree);
            !options['skip-logs'] &&
                (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} replacing css vars...`);
            (0, rename_css_vars_1.renameCssVars)();
            fileSystem.commitEdits();
            (0, ng_morph_1.saveActiveProject)();
            !options['skip-logs'] &&
                (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} Css vars successfully migrated \n`);
        },
    ]);
}
exports.migrateCssVars = migrateCssVars;
