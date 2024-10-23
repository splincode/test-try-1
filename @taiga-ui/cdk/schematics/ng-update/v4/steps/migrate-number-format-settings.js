"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateNumberFormatSettings = void 0;
const ng_morph_1 = require("ng-morph");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
const OPTIONS_MIGRATIONS = {
    decimalLimit: (property) => property.replaceWithText(property.getText().replace('decimalLimit', 'precision')),
    decimal: (property) => {
        const [, propertyValue] = property.getText().split(/\s?:\s?/);
        property.replaceWithText((propertyValue === null || propertyValue === void 0 ? void 0 : propertyValue.match(/^['"`]never['"`]$/))
            ? 'precision: 0'
            : property.getText().replace('decimal', 'decimalMode'));
    },
    zeroPadding: (property) => {
        const [, propertyValue] = property.getText().split(/\s?:\s?/);
        if (propertyValue === 'true') {
            property.replaceWithText('decimalMode: "always"');
        }
        else {
            property.replaceWithText(`// TODO: (Taiga UI migration) "zeroPadding" is deleted. Use "decimalMode" instead https://taiga-ui.dev/pipes/format-number/API \n${property.getText()}`);
        }
    },
};
function migrateNumberFormatSettings(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} migrating TuiNumberFormatSettings...`);
    const asFunctionArgument = [
        ...(0, get_named_import_references_1.getNamedImportReferences)('tuiFormatNumber', '@taiga-ui/core'),
        ...(0, get_named_import_references_1.getNamedImportReferences)('tuiNumberFormatProvider', '@taiga-ui/core'),
    ].map((n) => {
        var _a;
        return (_a = n
            .getFirstAncestorByKind(ng_morph_1.SyntaxKind.CallExpression)) === null || _a === void 0 ? void 0 : _a.getFirstDescendantByKind(ng_morph_1.SyntaxKind.ObjectLiteralExpression);
    });
    const asStandaloneSettingsObject = (0, get_named_import_references_1.getNamedImportReferences)('TuiNumberFormatSettings', '@taiga-ui/core').map((n) => {
        const type = n.getFirstAncestorByKind(ng_morph_1.SyntaxKind.TypeReference);
        const siblings = [
            ...((type === null || type === void 0 ? void 0 : type.getPreviousSiblings()) || []),
            ...((type === null || type === void 0 ? void 0 : type.getNextSiblings()) || []),
        ];
        return siblings.find(ng_morph_1.Node.isObjectLiteralExpression);
    });
    [...asFunctionArgument, ...asStandaloneSettingsObject]
        .filter(ng_morph_1.Node.isObjectLiteralExpression)
        .forEach((options) => {
        Object.entries(OPTIONS_MIGRATIONS).forEach(([propertyName, migration]) => {
            const property = options.getProperty(propertyName);
            if (!property) {
                return;
            }
            const isShorthandPropertyAssignment = ng_morph_1.Node.isShorthandPropertyAssignment(property) &&
                !property.hasObjectAssignmentInitializer();
            const previousPropertyText = property.getText();
            migration(property);
            if (isShorthandPropertyAssignment && !property.wasForgotten()) {
                property.replaceWithText(`${property.getText()}: ${previousPropertyText}`);
            }
        });
    });
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} migration of TuiNumberFormatSettings completes \n`);
}
exports.migrateNumberFormatSettings = migrateNumberFormatSettings;
