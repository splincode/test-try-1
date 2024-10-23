"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStylesToAngularJson = exports.isInvalidAngularJson = void 0;
const tslib_1 = require("tslib");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const workspace_1 = require("@schematics/angular/utility/workspace");
const ng_morph_1 = require("ng-morph");
const is_string_1 = require("../../utils/miscellaneous/is-string");
const versions_1 = require("../ng-add/constants/versions");
const get_project_target_options_1 = require("./get-project-target-options");
const get_projects_1 = require("./get-projects");
function hasTaigaIcons(assets) {
    return !!(assets === null || assets === void 0 ? void 0 : assets.find((asset) => {
        var _a;
        return (0, is_string_1.tuiIsString)(asset)
            ? asset.includes('taiga-ui')
            : (_a = asset === null || asset === void 0 ? void 0 : asset.input) === null || _a === void 0 ? void 0 : _a.includes('taiga-ui');
    }));
}
function isInvalidAngularJson(tree) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return ((0, workspace_1.getWorkspace)(tree)
            // eslint-disable-next-line no-restricted-syntax
            .then(() => false)
            /**
             * Possible error – "Invalid format version detected - Expected:[ 1 ] Found: [ 2 ]"
             * @see https://github.com/angular/angular-cli/blob/main/packages/angular_devkit/core/src/workspace/json/reader.ts#L67-L69
             */
            // eslint-disable-next-line no-restricted-syntax
            .catch(() => true));
    });
}
exports.isInvalidAngularJson = isInvalidAngularJson;
function addStylesToAngularJson(options, context, taigaStyles, filter, stylesToReplace, tree) {
    const MANUAL_MIGRATION_TIPS = `Add styles ${taigaStyles.join(',')} to angular.json manually.`;
    return (0, workspace_1.updateWorkspace)((workspace) => {
        const projects = (0, get_projects_1.getProjects)(options, workspace);
        if (!projects.length) {
            context.logger.warn(`[WARNING]: Target project not found. ${MANUAL_MIGRATION_TIPS}`);
            return;
        }
        for (const project of projects) {
            let targetOptions;
            try {
                targetOptions = (0, get_project_target_options_1.getProjectTargetOptions)(project, 'build');
            }
            catch (_a) {
                context.logger.warn(`[WARNING]: No buildable project was found. ${MANUAL_MIGRATION_TIPS}`);
                return;
            }
            if (stylesToReplace && !hasTaigaIcons(targetOptions.assets)) {
                return;
            }
            const styles = targetOptions.styles;
            if (filter === null || filter === void 0 ? void 0 : filter(styles)) {
                taigaStyles = [];
            }
            if (!styles && taigaStyles.length) {
                targetOptions.styles = taigaStyles;
            }
            if (stylesToReplace &&
                (styles === null || styles === void 0 ? void 0 : styles.filter((style) => style !== stylesToReplace.from))) {
                const orderList = [
                    ...taigaStyles,
                    ...stylesToReplace.to,
                    ...styles.filter((style) => style !== stylesToReplace.from),
                ];
                targetOptions.styles = Array.from(new Set(orderList));
            }
            else {
                const orderList = [...taigaStyles, ...(styles || [])];
                targetOptions.styles = Array.from(new Set(orderList));
            }
            if (tree && stylesToReplace) {
                (0, ng_morph_1.addPackageJsonDependency)(tree, {
                    name: '@taiga-ui/styles',
                    version: versions_1.TAIGA_VERSION,
                });
                context.addTask(new tasks_1.NodePackageInstallTask());
            }
        }
    });
}
exports.addStylesToAngularJson = addStylesToAngularJson;
