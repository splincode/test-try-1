"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateToV4 = void 0;
const node_perf_hooks_1 = require("node:perf_hooks");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const ng_morph_1 = require("ng-morph");
const versions_1 = require("../../ng-add/constants/versions");
const get_execution_time_1 = require("../../utils/get-execution-time");
const steps_1 = require("../steps");
const replace_services_1 = require("../steps/replace-services");
const get_file_system_1 = require("../utils/get-file-system");
const enums_1 = require("../v4/steps/constants/enums");
const steps_2 = require("./steps");
const constants_1 = require("./steps/constants");
const functions_1 = require("./steps/constants/functions");
const modules_to_replace_1 = require("./steps/constants/modules-to-replace");
const types_1 = require("./steps/constants/types");
const drop_universal_mock_1 = require("./steps/drop-universal-mock");
const migrate_editor_1 = require("./steps/migrate-editor");
const migrate_providers_from_1 = require("./steps/migrate-providers-from");
const migrate_root_1 = require("./steps/migrate-root");
const replace_functions_1 = require("./steps/replace-functions");
const replace_modules_with_providers_1 = require("./steps/utils/replace-modules-with-providers");
function main(options) {
    return (tree, context) => {
        const fileSystem = (0, get_file_system_1.getFileSystem)(tree);
        (0, replace_functions_1.replaceFunctions)(functions_1.REPLACE_FUNCTIONS);
        (0, migrate_providers_from_1.migrateImportProvidersFrom)(options);
        (0, migrate_editor_1.migrateEditor)(fileSystem, options);
        (0, steps_1.replaceEnums)(options, enums_1.ENUMS_TO_REPLACE);
        (0, migrate_root_1.migrateRoot)(fileSystem, options);
        (0, replace_services_1.replaceServices)(options, constants_1.SERVICES_TO_REPLACE);
        (0, steps_1.replaceIdentifiers)(options, constants_1.IDENTIFIERS_TO_REPLACE);
        (0, steps_1.removeModules)(options, constants_1.MODULES_TO_REMOVE);
        (0, replace_modules_with_providers_1.replaceModulesWithProviders)(options, modules_to_replace_1.MODULES_TO_REPLACE_WITH_PROVIDERS);
        (0, steps_1.renameTypes)(options, types_1.TYPES_TO_RENAME);
        (0, steps_2.restoreTuiMapper)(options);
        (0, steps_2.restoreTuiMatcher)(options);
        (0, steps_2.migrateLegacyMask)(options);
        (0, steps_2.migrateDestroyService)(options);
        (0, steps_2.migrateOptionProviders)(options);
        (0, steps_2.migrateAllCountryIsoCodes)(options);
        (0, steps_2.migrateAlertService)(options);
        (0, steps_2.migrateNumberFormatSettings)(options);
        (0, steps_2.migrateMonthContext)(options);
        (0, drop_universal_mock_1.dropUniversalMock)(options);
        (0, ng_morph_1.saveActiveProject)();
        (0, steps_2.migrateTemplates)(fileSystem, options);
        (0, steps_1.showWarnings)(context, constants_1.MIGRATION_WARNINGS);
        fileSystem.commitEdits();
        (0, ng_morph_1.saveActiveProject)();
        (0, steps_2.removeDuplicates)(options);
        (0, steps_2.migrateStyles)();
        (0, steps_2.migrateProprietary)(fileSystem, options);
        (0, steps_2.updatePackages)(fileSystem);
        fileSystem.commitEdits();
        (0, ng_morph_1.saveActiveProject)();
        context.addTask(new tasks_1.NodePackageInstallTask());
    };
}
function updateToV4(options) {
    const t0 = node_perf_hooks_1.performance.now();
    !options['skip-logs'] &&
        (0, ng_morph_1.titleLog)(`\n\n${ng_morph_1.START_SYMBOL} Your packages will be updated to @taiga-ui/*@${versions_1.TAIGA_VERSION}\n`);
    return (0, schematics_1.chain)([
        main(options),
        () => {
            const executionTime = (0, get_execution_time_1.getExecutionTime)(t0, node_perf_hooks_1.performance.now());
            !options['skip-logs'] &&
                (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} We migrated packages to @taiga-ui/*@${versions_1.TAIGA_VERSION} in ${executionTime}. \n`);
        },
    ]);
}
exports.updateToV4 = updateToV4;
