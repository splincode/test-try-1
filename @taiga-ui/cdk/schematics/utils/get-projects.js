"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = void 0;
function getProjects(options, workspace) {
    var _a;
    const projects = Array.from(workspace.projects.entries())
        .filter(([_, project]) => project.targets.get('build'))
        .map(([_, project]) => project);
    const nameFromContext = options.project || ((_a = workspace.extensions.defaultProject) === null || _a === void 0 ? void 0 : _a.toString()) || '';
    const projectFromContext = workspace.projects.get(nameFromContext);
    return projectFromContext ? [projectFromContext] : projects;
}
exports.getProjects = getProjects;
