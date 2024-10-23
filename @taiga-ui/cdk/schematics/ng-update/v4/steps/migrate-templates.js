"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateTemplates = void 0;
const ng_morph_1 = require("ng-morph");
const constants_1 = require("../../../constants");
const add_import_to_closest_module_1 = require("../../../utils/add-import-to-closest-module");
const progress_1 = require("../../../utils/progress");
const get_component_templates_1 = require("../../../utils/templates/get-component-templates");
const template_resource_1 = require("../../../utils/templates/template-resource");
const templates_1 = require("../../utils/templates");
const replace_attrs_by_directives_1 = require("../../utils/templates/replace-attrs-by-directives");
const constants_2 = require("./constants");
const templates_2 = require("./templates");
const migrate_blocked_1 = require("./templates/migrate-blocked");
const migrate_number_precision_1 = require("./templates/migrate-number-precision");
function getAction({ action, requiredData, }) {
    return ({ resource, fileSystem, recorder, }) => action({ resource, fileSystem, recorder, data: requiredData });
}
function migrateTemplates(fileSystem, options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} migrating templates...`);
    const componentWithTemplatesPaths = (0, get_component_templates_1.getComponentTemplates)(constants_1.ALL_TS_FILES);
    const actions = [
        getAction({ action: templates_1.addHTMLCommentTags, requiredData: constants_2.HTML_COMMENTS }),
        getAction({
            action: replace_attrs_by_directives_1.replaceAttrsByDirective,
            requiredData: constants_2.ATTRS_TO_DIRECTIVE_REPLACE,
        }),
        getAction({ action: templates_1.replaceTags, requiredData: constants_2.TAGS_TO_REPLACE }),
        getAction({ action: templates_1.replaceAttrs, requiredData: constants_2.ATTRS_TO_REPLACE }),
        getAction({ action: templates_1.replaceAttrValues, requiredData: constants_2.ATTR_WITH_VALUES_TO_REPLACE }),
        getAction({ action: templates_1.removeInputs, requiredData: constants_2.INPUTS_TO_REMOVE }),
        templates_2.migrateAxes,
        templates_2.migrateBadge,
        templates_2.migrateCheckbox,
        templates_2.migrateFocusable,
        templates_2.migrateRadio,
        templates_2.migrateToggle,
        templates_2.migrateAvatar,
        templates_2.migrateExpandable,
        templates_2.migrateBadgedContent,
        templates_2.migratePreventDefault,
        templates_2.migrateMobileTabs,
        templates_2.migrateMoney,
        templates_2.migrateLabeled,
        migrate_blocked_1.migrateBlocked,
        templates_2.migrateProgressSegmented,
        templates_2.migrateThumbnailCard,
        templates_2.migrateOverscroll,
        templates_2.migrateButtonAppearance,
        templates_2.migrateLabel,
        migrate_number_precision_1.migrateNumberPrecision,
        templates_2.migrateNotification,
        templates_2.migrateFilterPipe,
        templates_2.migrateActiveZoneParent,
    ];
    const progressLog = (0, progress_1.setupProgressLogger)({
        total: componentWithTemplatesPaths.length,
    });
    componentWithTemplatesPaths.forEach((resource) => {
        const path = fileSystem.resolve((0, template_resource_1.getPathFromTemplateResource)(resource));
        const recorder = fileSystem.edit(path);
        actions.forEach((action, actionIndex) => {
            const isLastAction = actionIndex === actions.length - 1;
            !options['skip-logs'] && progressLog(action.name, isLastAction);
            action({ resource, fileSystem, recorder });
        });
    });
    fileSystem.commitEdits();
    (0, add_import_to_closest_module_1.saveAddedImports)();
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} templates migrated \n`);
}
exports.migrateTemplates = migrateTemplates;
