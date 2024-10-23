"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAdd = void 0;
const tasks_1 = require("@angular-devkit/schematics/tasks");
const ng_morph_1 = require("ng-morph");
const packages_1 = require("./constants/packages");
const versions_1 = require("./constants/versions");
function addDependencies(tree, options) {
    const packages = [...packages_1.MAIN_PACKAGES, ...options.addons];
    packages.forEach((pack) => {
        (0, ng_morph_1.addPackageJsonDependency)(tree, {
            name: `@taiga-ui/${pack}`,
            version: versions_1.TAIGA_VERSION,
            type: ng_morph_1.NodeDependencyType.Default,
        });
    });
    (0, ng_morph_1.addPackageJsonDependency)(tree, {
        name: '@taiga-ui/event-plugins',
        version: '^4.0.2',
    });
    removeTaigaSchematicsPackage(tree);
    if (packages.includes('addon-table') || packages.includes('addon-mobile')) {
        addAngularCdkDep(tree);
    }
}
function addAngularCdkDep(tree) {
    var _a;
    const angularCore = (_a = (0, ng_morph_1.getPackageJsonDependency)(tree, '@angular/core')) === null || _a === void 0 ? void 0 : _a.version;
    if (!angularCore) {
        return;
    }
    const majorVersionArr = /\d+/.exec(angularCore);
    if (majorVersionArr) {
        (0, ng_morph_1.addPackageJsonDependency)(tree, {
            name: '@angular/cdk',
            version: `^${majorVersionArr[0]}.0.0`,
            type: ng_morph_1.NodeDependencyType.Default,
        });
    }
}
function removeTaigaSchematicsPackage(tree) {
    var _a;
    try {
        if ((_a = (0, ng_morph_1.getPackageJsonDependency)(tree, 'taiga-ui')) === null || _a === void 0 ? void 0 : _a.version) {
            (0, ng_morph_1.removePackageJsonDependency)(tree, 'taiga-ui');
        }
    }
    catch (_b) {
        // noop
    }
}
function ngAdd(options) {
    return (tree, context) => {
        context.logger.info(`The main packages will be installed - ${packages_1.MAIN_PACKAGES}`);
        addDependencies(tree, options);
        context.addTask(new tasks_1.NodePackageInstallTask(), [
            context.addTask(new tasks_1.RunSchematicTask('ng-add-setup-project', options)),
        ]);
    };
}
exports.ngAdd = ngAdd;
