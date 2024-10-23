"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateAllCountryIsoCodes = void 0;
const ng_morph_1 = require("ng-morph");
const add_unique_import_1 = require("../../../utils/add-unique-import");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
function migrateAllCountryIsoCodes(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} migrating Object.values(TuiCountryIsoCode)...`);
    const references = (0, get_named_import_references_1.getNamedImportReferences)('TuiCountryIsoCode', '@taiga-ui/i18n');
    references.forEach((ref) => {
        if (ref.wasForgotten()) {
            return;
        }
        const possibleObjectValues = ref.getFirstAncestorByKind(ng_morph_1.SyntaxKind.CallExpression);
        if ((possibleObjectValues === null || possibleObjectValues === void 0 ? void 0 : possibleObjectValues.getText()) === 'Object.values(TuiCountryIsoCode)') {
            (0, add_unique_import_1.addUniqueImport)(ref.getSourceFile().getFilePath(), 'getCountries', 'libphonenumber-js');
            possibleObjectValues.replaceWithText('getCountries()');
        }
    });
    !options['skip-logs'] && (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} successfully migrated \n`);
}
exports.migrateAllCountryIsoCodes = migrateAllCountryIsoCodes;
