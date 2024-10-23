"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreTuiMatcher = void 0;
const ng_morph_1 = require("ng-morph");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
const replace_identifier_1 = require("../../steps/replace-identifier");
function updateTuiMatcher(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} updating TuiMatcher typing to the typed version`);
    const refs = (0, get_named_import_references_1.getNamedImportReferences)('TuiMatcher', '@taiga-ui/cdk');
    for (const ref of refs) {
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        if (ng_morph_1.Node.isTypeReference(parent)) {
            const typeArguments = parent.getTypeArguments();
            if (!typeArguments || typeArguments.length !== 1) {
                return;
            }
            const [inputType] = typeArguments;
            inputType === null || inputType === void 0 ? void 0 : inputType.replaceWithText(`[${inputType.getText()}, ...any]`);
        }
    }
}
function renameTuiTypedMatcher(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} renaming TuiTypedMatcher to TuiMatcher`);
    (0, replace_identifier_1.replaceIdentifier)({
        from: { name: 'TuiTypedMatcher', moduleSpecifier: '@taiga-ui/cdk' },
        to: { name: 'TuiMatcher', moduleSpecifier: '@taiga-ui/cdk' },
    });
}
function restoreTuiMatcher(options) {
    updateTuiMatcher(options);
    renameTuiTypedMatcher(options);
    !options['skip-logs'] && (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} successfully migrated \n`);
}
exports.restoreTuiMatcher = restoreTuiMatcher;
