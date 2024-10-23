"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTaigaAssetsToAngularJson = exports.addTaigaIcons = void 0;
const workspace_1 = require("@schematics/angular/utility/workspace");
const get_project_target_options_1 = require("../../utils/get-project-target-options");
const get_projects_1 = require("../../utils/get-projects");
const ICON_ASSETS = {
    glob: '**/*',
    input: 'node_modules/@taiga-ui/icons/src',
    output: 'assets/taiga-ui/icons',
};
function addTaigaIcons(options) {
    return (_) => addTaigaAssetsToAngularJson(options);
}
exports.addTaigaIcons = addTaigaIcons;
function addTaigaAssetsToAngularJson(options) {
    return (0, workspace_1.updateWorkspace)((workspace) => {
        const project = (0, get_projects_1.getProjects)(options, workspace)[0];
        if (project) {
            const targetOptions = (0, get_project_target_options_1.getProjectTargetOptions)(project, 'build');
            const assets = targetOptions.assets;
            targetOptions.assets = assets ? [...assets, ICON_ASSETS] : [ICON_ASSETS];
        }
    });
}
exports.addTaigaAssetsToAngularJson = addTaigaAssetsToAngularJson;
