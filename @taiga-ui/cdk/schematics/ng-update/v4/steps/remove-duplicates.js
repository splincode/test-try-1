"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicates = void 0;
const ng_morph_1 = require("ng-morph");
const constants_1 = require("../../../constants");
function removeDuplicates(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} removing duplicates...`);
    const classes = (0, ng_morph_1.getClasses)(constants_1.ALL_TS_FILES);
    const modules = (0, ng_morph_1.getDecorators)(classes, { name: 'NgModule' });
    const components = (0, ng_morph_1.getDecorators)(classes, { name: 'Component' });
    [...modules, ...components].forEach((decorator) => {
        const [metadata] = decorator.getArguments();
        if (!metadata || !ng_morph_1.Node.isObjectLiteralExpression(metadata)) {
            return;
        }
        const property = metadata.getProperty('imports');
        if (!ng_morph_1.Node.isPropertyAssignment(property)) {
            return;
        }
        const importsInitializer = property.getInitializer();
        if (!importsInitializer || !ng_morph_1.Node.isArrayLiteralExpression(importsInitializer)) {
            return;
        }
        const indexToRemove = [];
        const existingImports = new Set();
        importsInitializer.getElements().forEach((el, index) => {
            if (existingImports.has(el.getText())) {
                indexToRemove.push(index);
            }
            else {
                existingImports.add(el.getText());
            }
        });
        indexToRemove.forEach((index, i) => importsInitializer.removeElement(index - i));
    });
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} duplicates removed \n`);
}
exports.removeDuplicates = removeDuplicates;
