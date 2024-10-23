"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackages = exports.TUI_EVENT_PLUGINS_VERSION = exports.TUI_DOMPURIFY_VERSION = exports.TUI_POLYMORPHEUS_VERSION = void 0;
const ng_morph_1 = require("ng-morph");
const version_1 = require("../../../../constants/version");
const constants_1 = require("../../../constants");
const steps_1 = require("../../steps");
exports.TUI_POLYMORPHEUS_VERSION = '^4.7.3';
exports.TUI_DOMPURIFY_VERSION = '^4.1.7';
exports.TUI_EVENT_PLUGINS_VERSION = '^4.2.3';
function updatePackages({ tree }) {
    const packagesToRemove = ['@taiga-ui/addon-tablebars', '@taiga-ui/addon-preview'];
    packagesToRemove.forEach((pkg) => {
        (0, ng_morph_1.removePackageJsonDependency)(tree, pkg);
    });
    (0, steps_1.replacePackageName)('@tinkoff/ng-polymorpheus', {
        name: '@taiga-ui/polymorpheus',
        version: exports.TUI_POLYMORPHEUS_VERSION,
    }, tree);
    (0, steps_1.replacePackageName)('@tinkoff/ng-dompurify', {
        name: '@taiga-ui/dompurify',
        version: exports.TUI_DOMPURIFY_VERSION,
    }, tree);
    (0, steps_1.replacePackageName)('@tinkoff/ng-event-plugins', {
        name: '@taiga-ui/event-plugins',
        version: exports.TUI_EVENT_PLUGINS_VERSION,
    }, tree);
    const cdk = (0, ng_morph_1.getPackageJsonDependency)(tree, '@taiga-ui/cdk');
    if (!(0, ng_morph_1.getPackageJsonDependency)(tree, '@taiga-ui/event-plugins')) {
        (0, ng_morph_1.addPackageJsonDependency)(tree, {
            name: '@taiga-ui/event-plugins',
            version: exports.TUI_EVENT_PLUGINS_VERSION,
            type: cdk === null || cdk === void 0 ? void 0 : cdk.type,
        });
    }
    try {
        ['@taiga-ui/layout', '@taiga-ui/legacy'].forEach((moduleSpecifier) => {
            if ((0, ng_morph_1.getImports)(constants_1.ALL_TS_FILES, { moduleSpecifier }).length) {
                (0, ng_morph_1.addPackageJsonDependency)(tree, {
                    name: moduleSpecifier,
                    version: version_1.TUI_VERSION,
                    type: cdk === null || cdk === void 0 ? void 0 : cdk.type,
                });
            }
        });
    }
    catch (e) {
        const error = e;
        (0, ng_morph_1.errorLog)(`ATTENTION: An error occurred during migration: ${error.message}\n${error.stack}`);
    }
}
exports.updatePackages = updatePackages;
