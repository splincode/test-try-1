"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateMonthContext = void 0;
const ng_morph_1 = require("ng-morph");
const add_unique_import_1 = require("../../../utils/add-unique-import");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
const import_manipulations_1 = require("../../../utils/import-manipulations");
function migrateMonthContext(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} migrating TuiBooleanHandlerWithContext<TuiMonth, TuiMonthContext> ...`);
    const monthContextRefs = (0, get_named_import_references_1.getNamedImportReferences)('TuiMonthContext', '@taiga-ui/kit');
    monthContextRefs
        .map((n) => n.getFirstAncestorByKind(ng_morph_1.SyntaxKind.TypeReference))
        .forEach((ref) => {
        if (!ref || ref.wasForgotten()) {
            return;
        }
        const booleanHandlerWithContext = ref.getFirstAncestor((node) => node.isKind(ng_morph_1.SyntaxKind.TypeReference) &&
            !!/TuiBooleanHandlerWithContext<\s*TuiMonth\s*,\s*TuiMonthContext\s*>/.exec(node.getText()));
        if (!booleanHandlerWithContext) {
            return;
        }
        booleanHandlerWithContext.replaceWithText('TuiBooleanHandler<TuiMonth>');
        (0, add_unique_import_1.addUniqueImport)(booleanHandlerWithContext.getSourceFile().getFilePath(), 'TuiBooleanHandler', '@taiga-ui/cdk');
    });
    [
        ...monthContextRefs,
        ...(0, get_named_import_references_1.getNamedImportReferences)('TuiBooleanHandlerWithContext', '@taiga-ui/kit'),
    ]
        .map((node) => !node.wasForgotten() &&
        node.getFirstAncestorByKind(ng_morph_1.SyntaxKind.ImportSpecifier))
        .filter((x) => !!x)
        .forEach(import_manipulations_1.removeImport);
    !options['skip-logs'] && (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} successfully migrated \n`);
}
exports.migrateMonthContext = migrateMonthContext;
