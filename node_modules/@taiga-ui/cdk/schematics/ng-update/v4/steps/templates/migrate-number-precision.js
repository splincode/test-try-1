"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateNumberPrecision = void 0;
const remove_attrs_1 = require("../../../../ng-update/v4/steps/utils/remove-attrs");
const add_import_to_closest_module_1 = require("../../../../utils/add-import-to-closest-module");
const elements_1 = require("../../../../utils/templates/elements");
const inputs_1 = require("../../../../utils/templates/inputs");
const template_resource_1 = require("../../../../utils/templates/template-resource");
const normalize_attr_value_1 = require("../utils/normalize-attr-value");
function migrateNumberPrecision({ resource, recorder, fileSystem, }) {
    const template = (0, template_resource_1.getTemplateFromTemplateResource)(resource, fileSystem);
    const templateOffset = (0, template_resource_1.getTemplateOffset)(resource);
    const elements = (0, elements_1.findElementsByTagName)(template, 'tui-input-number');
    elements.forEach(({ attrs, sourceCodeLocation }) => {
        var _a;
        if (!sourceCodeLocation) {
            return;
        }
        const decimalAttr = (0, inputs_1.findAttr)(attrs, 'decimal');
        const precisionAttr = (0, inputs_1.findAttr)(attrs, 'precision');
        if (decimalAttr || precisionAttr) {
            (0, add_import_to_closest_module_1.addImportToClosestModule)(resource.componentPath, 'TuiNumberFormat', '@taiga-ui/core');
            const format = `{${decimalAttr ? `decimalMode: ${(0, normalize_attr_value_1.normalizeAttrValue)(decimalAttr.name, decimalAttr.value)}` : ''}${decimalAttr ? ', ' : ''}${precisionAttr ? `precision: ${(0, normalize_attr_value_1.normalizeAttrValue)(precisionAttr.name, precisionAttr.value)}` : ''}`;
            const formatPart = `[tuiNumberFormat]="${format}"`;
            const insertTo = (((_a = sourceCodeLocation === null || sourceCodeLocation === void 0 ? void 0 : sourceCodeLocation.startTag) === null || _a === void 0 ? void 0 : _a.startOffset) || 0) +
                '<tui-input-number '.length;
            recorder.insertRight(templateOffset + insertTo, formatPart);
        }
        const attrsToRemove = [decimalAttr, precisionAttr].filter((attr) => attr !== undefined);
        (0, remove_attrs_1.removeAttrs)(attrsToRemove, sourceCodeLocation, recorder, templateOffset);
    });
}
exports.migrateNumberPrecision = migrateNumberPrecision;
