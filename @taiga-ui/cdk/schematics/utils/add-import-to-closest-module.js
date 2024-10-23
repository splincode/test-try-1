"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAddedImports = exports.addImportToClosestModule = void 0;
const ng_morph_1 = require("ng-morph");
const file_globs_1 = require("../constants/file-globs");
const add_unique_import_1 = require("./add-unique-import");
const importsToAdd = [];
function addImportToClosestModule(componentPath, moduleName, moduleSpecifier) {
    importsToAdd.push({ componentPath, moduleName, moduleSpecifier });
}
exports.addImportToClosestModule = addImportToClosestModule;
function saveAddedImports() {
    importsToAdd.forEach(({ componentPath, moduleName, moduleSpecifier }) => {
        const [ngComponent] = (0, ng_morph_1.getNgComponents)(componentPath);
        if (!ngComponent) {
            return;
        }
        if ((0, ng_morph_1.isStandaloneComponent)(ngComponent)) {
            (0, ng_morph_1.addImportToComponent)(ngComponent, moduleName, { unique: true });
            (0, add_unique_import_1.addUniqueImport)(ngComponent.getSourceFile().getFilePath(), moduleName, moduleSpecifier);
            return;
        }
        const ngModule = (0, ng_morph_1.findNgModule)(ngComponent, file_globs_1.ALL_TS_FILES);
        if (ngModule) {
            (0, ng_morph_1.addImportToNgModule)(ngModule, moduleName, {
                unique: true,
            });
            (0, add_unique_import_1.addUniqueImport)(ngModule.getSourceFile().getFilePath(), moduleName, moduleSpecifier);
        }
    });
}
exports.saveAddedImports = saveAddedImports;
