"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateButtonAppearance = void 0;
const elements_1 = require("../../../../utils/templates/elements");
const template_resource_1 = require("../../../../utils/templates/template-resource");
const remove_attrs_1 = require("../utils/remove-attrs");
const tuiButtonSelectors = ['tuiButton', 'tuiIconButton'];
const appearanceInputName = 'appearance';
const appearanceInputNameDict = {
    [appearanceInputName]: true,
    [`[${appearanceInputName}]`]: true,
};
function migrateButtonAppearance({ resource, recorder, fileSystem, }) {
    const template = (0, template_resource_1.getTemplateFromTemplateResource)(resource, fileSystem);
    const templateOffset = (0, template_resource_1.getTemplateOffset)(resource);
    const elements = tuiButtonSelectors.flatMap((selector) => (0, elements_1.findElementsWithDirective)(template, selector).filter(({ sourceCodeLocation, attrs }) => !!sourceCodeLocation &&
        attrs.some(({ name }) => appearanceInputNameDict[name])));
    if (!elements.length) {
        return;
    }
    const whiteBlockValue = 'whiteblock-active';
    elements.forEach(({ attrs, sourceCodeLocation }) => {
        var _a;
        const whiteBlockActiveAttr = attrs.find(({ value, name }) => appearanceInputNameDict[name] &&
            (value === whiteBlockValue || value === `'${whiteBlockValue}'`));
        if (whiteBlockActiveAttr) {
            (0, remove_attrs_1.removeAttrs)([whiteBlockActiveAttr], sourceCodeLocation, recorder, templateOffset);
            const { startOffset } = ((_a = sourceCodeLocation === null || sourceCodeLocation === void 0 ? void 0 : sourceCodeLocation.attrs) === null || _a === void 0 ? void 0 : _a[whiteBlockActiveAttr.name]) || { startOffset: 0, endOffset: 0 };
            recorder.insertLeft(startOffset + templateOffset, ` ${appearanceInputName}="outline-grayscale"`);
            recorder.insertLeft(startOffset + templateOffset, ' tuiAppearanceMode="checked"');
        }
    });
    const elementWithConditionAppearance = elements.find(({ attrs }) => attrs.some(({ name, value }) => name === `[${appearanceInputName}]` && !value.trim().startsWith("'")));
    if (elementWithConditionAppearance) {
        addTodo(recorder, templateOffset);
    }
}
exports.migrateButtonAppearance = migrateButtonAppearance;
function addTodo(recorder, templateOffset) {
    recorder.insertRight(templateOffset, '<!-- Taiga migration TODO: tuiButton "whiteblock-active" appearance is no longer available. Use \'appearance="outline-grayscale" tuiAppearanceMode="checked"\' -->\n');
}
