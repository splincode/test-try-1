"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateImportProvidersFrom = void 0;
const ng_morph_1 = require("ng-morph");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
function migrateImportProvidersFrom(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} updating importProvidersFrom`);
    const refs = [
        ...(0, get_named_import_references_1.getNamedImportReferences)('TuiDialogModule', '@taiga-ui/core'),
        ...(0, get_named_import_references_1.getNamedImportReferences)('TuiAlertModule', '@taiga-ui/core'),
        ...(0, get_named_import_references_1.getNamedImportReferences)('TuiPushModule', '@taiga-ui/kit'),
        ...(0, get_named_import_references_1.getNamedImportReferences)('TuiPdfViewerModule', '@taiga-ui/kit'),
        ...(0, get_named_import_references_1.getNamedImportReferences)('TuiPreviewModule', '@taiga-ui/addon-preview'),
    ];
    for (const ref of refs) {
        if (ref.wasForgotten()) {
            return;
        }
        const callExpression = ref.getParentWhile(ng_morph_1.Node.isCallExpression);
        if ((callExpression === null || callExpression === void 0 ? void 0 : callExpression.getExpression().getText()) === 'importProvidersFrom') {
            const node = callExpression
                .getArguments()
                .find((arg) => arg.getText() === ref.getText());
            if (node) {
                callExpression.removeArgument(node);
            }
        }
    }
}
exports.migrateImportProvidersFrom = migrateImportProvidersFrom;
