"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushToObjectArrayProperty = void 0;
const ng_morph_1 = require("ng-morph");
function pushToObjectArrayProperty(objectExpression, propertyName, initializer, { unique = false, forceToArray = false, index = null, } = {}) {
    var _a, _b;
    const property = (_a = objectExpression.getProperty(propertyName)) !== null && _a !== void 0 ? _a : objectExpression.addProperty(`${propertyName}: []`);
    if (!ng_morph_1.Node.isPropertyAssignment(property)) {
        return;
    }
    if (forceToArray && !ng_morph_1.Node.isArrayLiteralExpression(property.getInitializer())) {
        property.setInitializer(`[${(_b = property === null || property === void 0 ? void 0 : property.getInitializer()) === null || _b === void 0 ? void 0 : _b.getText()}]`);
    }
    const importsInitializer = property.getInitializer();
    if (!ng_morph_1.Node.isArrayLiteralExpression(importsInitializer)) {
        return;
    }
    if (unique &&
        importsInitializer
            .getElements()
            .some((element) => element.getText() === initializer)) {
        return;
    }
    if (typeof index === 'number') {
        importsInitializer.insertElement(index, initializer);
    }
    else {
        importsInitializer.addElement(initializer);
    }
}
exports.pushToObjectArrayProperty = pushToObjectArrayProperty;
