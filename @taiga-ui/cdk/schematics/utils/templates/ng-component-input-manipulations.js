"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeInputProperty = exports.replaceInputPropertyByDirective = exports.getInputPropertyValueOffsets = exports.getInputPropertyOffsets = exports.replaceInputProperty = void 0;
const ng_morph_1 = require("ng-morph");
const add_import_to_closest_module_1 = require("../add-import-to-closest-module");
const elements_1 = require("./elements");
const template_resource_1 = require("./template-resource");
/**
 * Replace component input property by new value
 * ___
 * Example:
 * 1. Before
 * ```html
 * <tui-input-slider secondary="123"></tui-input-slider>
 * ```
 * 2. Execute
 * ```ts
 * const wasModified = replaceInputProperty({
 *      templateResource,
 *      fileSystem,
 *      componentSelector: 'tui-input-slider',
 *      from: 'secondary',
 *      to: 'tuiTextfieldCustomContent',
 * });
 * ```
 * 3. After
 * ```html
 * <tui-input-slider tuiTextfieldCustomContent="123"></tui-input-slider>
 * ```
 * ___
 * @return true if something was changed
 */
function replaceInputProperty({ templateResource, fileSystem, componentSelector, from, to, newValue = '', filterFn, }) {
    const template = (0, template_resource_1.getTemplateFromTemplateResource)(templateResource, fileSystem);
    const path = fileSystem.resolve((0, template_resource_1.getPathFromTemplateResource)(templateResource));
    const recorder = fileSystem.edit(path);
    const templateOffset = (0, template_resource_1.getTemplateOffset)(templateResource);
    const selector = (0, ng_morph_1.coerceArray)(componentSelector);
    const stringProperties = [
        ...(0, elements_1.findAttributeOnElementWithTag)(template, from, selector, filterFn),
        ...(0, elements_1.findAttributeOnElementWithAttrs)(template, from, selector, filterFn),
    ].map((offset) => templateOffset + offset);
    const propertyBindings = [
        ...(0, elements_1.findAttributeOnElementWithTag)(template, `[${from}]`, selector, filterFn),
        ...(0, elements_1.findAttributeOnElementWithAttrs)(template, `[${from}]`, selector, filterFn),
    ].map((offset) => templateOffset + offset);
    const propertyValues = newValue
        ? getInputPropertyValueOffsets(template, from, selector).map(([start, end]) => [
            templateOffset + start,
            templateOffset + end,
        ])
        : [];
    if (!stringProperties.length && !propertyBindings.length) {
        return false;
    }
    stringProperties.forEach((offset) => {
        recorder.remove(offset, from.length);
        recorder.insertRight(offset, to);
    });
    propertyBindings.forEach((offset) => {
        recorder.remove(offset, `[${from}]`.length);
        recorder.insertRight(offset, to.startsWith('[') ? to : `[${to}]`);
    });
    propertyValues.forEach(([startOffset, endOffset]) => {
        recorder.remove(startOffset !== null && startOffset !== void 0 ? startOffset : 0, (endOffset !== null && endOffset !== void 0 ? endOffset : 0) - (startOffset !== null && startOffset !== void 0 ? startOffset : 0));
        recorder.insertRight(startOffset !== null && startOffset !== void 0 ? startOffset : 0, newValue);
    });
    return true;
}
exports.replaceInputProperty = replaceInputProperty;
/**
 * @example
 * // 10 symbols before property `size` and string `size="s"` has 8-symbols length
 * const template = '<tui-card size="s"></tui-card>';
 *
 * getInputPropertyOffsets(template, 'size', ['tui-card']) // [[10, 18]]
 */
function getInputPropertyOffsets(html, attrName, tags, 
// eslint-disable-next-line no-restricted-syntax
filterFn = () => true) {
    return (0, elements_1.findElementsWithAttribute)(html, attrName)
        .filter((element) => (tags.includes(element.tagName) || tags.includes('*')) &&
        filterFn(element))
        .map((element) => {
        var _a, _b;
        const { startOffset = 0, endOffset = 0 } = ((_b = (_a = element.sourceCodeLocation) === null || _a === void 0 ? void 0 : _a.attrs) === null || _b === void 0 ? void 0 : _b[attrName.toLowerCase()]) || {};
        return [startOffset, endOffset];
    });
}
exports.getInputPropertyOffsets = getInputPropertyOffsets;
/**
 * @example
 * // `<tui-card size="` has 16-symbols length
 * const template = '<tui-card size="xl"></tui-card>';
 *
 * getInputPropertyValueOffsets(template, 'size', ['tui-card']) // [ [16, 18] ]
 */
function getInputPropertyValueOffsets(template, attrName, tags) {
    const stringProperties = getInputPropertyOffsets(template, attrName, tags).map(([start, end]) => [start + attrName.length + '="'.length, end - 1]);
    const propertyBindings = getInputPropertyOffsets(template, `[${attrName}]`, tags).map(([start, end]) => [start + `[${attrName}]`.length + '="'.length, end - 1]);
    return [...stringProperties, ...propertyBindings];
}
exports.getInputPropertyValueOffsets = getInputPropertyValueOffsets;
function replaceInputPropertyByDirective({ templateResource, fileSystem, componentSelector, inputProperty, directive, directiveModule, filterFn, }) {
    const wasModified = replaceInputProperty({
        templateResource,
        fileSystem,
        componentSelector,
        from: inputProperty,
        to: directive,
        filterFn,
    });
    if (wasModified && directiveModule) {
        (0, add_import_to_closest_module_1.addImportToClosestModule)(templateResource.componentPath, directiveModule.name, directiveModule.moduleSpecifier);
    }
}
exports.replaceInputPropertyByDirective = replaceInputPropertyByDirective;
/**
 * After removing property from the tag (which uses multi lines inside template) it can leave redundant space.
 * It is not critical because html is valid even with this extra space.
 * TODO: Find a way to fix it
 */
function removeInputProperty({ templateResource, fileSystem, componentSelector, inputProperty, filterFn, }) {
    const template = (0, template_resource_1.getTemplateFromTemplateResource)(templateResource, fileSystem);
    const templateOffset = (0, template_resource_1.getTemplateOffset)(templateResource);
    const path = fileSystem.resolve((0, template_resource_1.getPathFromTemplateResource)(templateResource));
    const recorder = fileSystem.edit(path);
    const propertyOffsets = [
        ...getInputPropertyOffsets(template, inputProperty, [componentSelector], filterFn),
        ...getInputPropertyOffsets(template, `[${inputProperty}]`, [componentSelector], filterFn),
    ].map(([start, end]) => [templateOffset + start, templateOffset + end]);
    propertyOffsets.forEach(([start, end]) => {
        recorder.remove(start !== null && start !== void 0 ? start : 0, (end !== null && end !== void 0 ? end : 0) - (start !== null && start !== void 0 ? start : 0));
    });
}
exports.removeInputProperty = removeInputProperty;
