"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateLabeled = void 0;
const add_import_to_closest_module_1 = require("../../../../utils/add-import-to-closest-module");
const elements_1 = require("../../../../utils/templates/elements");
const inputs_1 = require("../../../../utils/templates/inputs");
const template_resource_1 = require("../../../../utils/templates/template-resource");
const templates_1 = require("../../../utils/templates");
function migrateLabeled({ resource, recorder, fileSystem, }) {
    const template = (0, template_resource_1.getTemplateFromTemplateResource)(resource, fileSystem);
    const templateOffset = (0, template_resource_1.getTemplateOffset)(resource);
    (0, templates_1.replaceAttrValues)({
        resource,
        fileSystem,
        recorder,
        data: [
            {
                attrNames: ['size'],
                valueReplacer: [
                    { from: 'l', to: 'm' },
                    { from: 'm', to: 's' },
                ],
                withTagNames: ['tui-checkbox-labeled', 'tui-radio-labeled'],
            },
        ],
    });
    const elements = (0, elements_1.findElementsByTagNames)(template, [
        'tui-checkbox-labeled',
        'tui-radio-labeled',
    ]);
    elements.forEach(({ sourceCodeLocation, tagName, attrs }) => {
        var _a, _b, _c, _d;
        if (!sourceCodeLocation) {
            return;
        }
        const [, ngForAttrLocation] = Object.entries(sourceCodeLocation.attrs || {}).find(([name]) => name.includes('*ngfor')) || [];
        const [, contentAlignAttrLocation] = Object.entries(sourceCodeLocation.attrs || {}).find(([name]) => name.includes('contentalign')) || [];
        const ngForAttr = (0, inputs_1.findAttr)(attrs, '*ngFor');
        (0, add_import_to_closest_module_1.addImportToClosestModule)(resource.componentPath, tagName === 'tui-checkbox-labeled' ? 'TuiCheckbox' : 'TuiRadio', '@taiga-ui/kit');
        recorder.insertRight(templateOffset + (((_a = sourceCodeLocation.startTag) === null || _a === void 0 ? void 0 : _a.startOffset) || 1) - 1, `<label${ngForAttr ? ` *ngFor="${ngForAttr.value}"` : ''} tuiLabel>`);
        recorder.remove(templateOffset + ((_c = (_b = sourceCodeLocation.endTag) === null || _b === void 0 ? void 0 : _b.startOffset) !== null && _c !== void 0 ? _c : 0), `<${tagName}/>`.length);
        recorder.insertRight(templateOffset + (((_d = sourceCodeLocation.endTag) === null || _d === void 0 ? void 0 : _d.startOffset) || 1), '</label>');
        const attrsToRemove = [ngForAttrLocation, contentAlignAttrLocation].filter((location) => Boolean(location));
        attrsToRemove.forEach((location) => {
            recorder.remove(templateOffset + location.startOffset, location.endOffset - location.startOffset);
        });
    });
}
exports.migrateLabeled = migrateLabeled;
