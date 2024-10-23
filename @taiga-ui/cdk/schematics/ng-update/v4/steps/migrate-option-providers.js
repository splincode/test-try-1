"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateOptionProviders = void 0;
const ng_morph_1 = require("ng-morph");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
const insert_todo_1 = require("../../../utils/insert-todo");
function migrateOptionProviders(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} migrating providers...`);
    migrateInputNumberOptions(options);
    !options['skip-logs'] && (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} successfully migrated \n`);
}
exports.migrateOptionProviders = migrateOptionProviders;
function migrateInputNumberOptions(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} tuiInputNumberOptionsProvider`);
    const references = [
        ...(0, get_named_import_references_1.getNamedImportReferences)('tuiInputNumberOptionsProvider', '@taiga-ui/kit'),
        ...(0, get_named_import_references_1.getNamedImportReferences)('tuiInputNumberOptionsProvider', '@taiga-ui/legacy'),
    ];
    references.forEach((ref) => {
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        if (!ng_morph_1.Node.isCallExpression(parent)) {
            return;
        }
        const [value] = parent.getArguments();
        if (ng_morph_1.Node.isObjectLiteralExpression(value)) {
            const precision = value.getProperty('precision');
            const decimal = value.getProperty('decimal');
            [precision, decimal]
                .filter((property) => !!property)
                .forEach((property) => property.remove());
            if (precision || decimal) {
                (0, insert_todo_1.insertTodo)(parent, '"precision" and "decimal" options have been moved to FormatNumberOptions. See https://taiga-ui.dev/components/input-number#options');
            }
        }
    });
}
