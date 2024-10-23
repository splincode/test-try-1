"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAngularJson = void 0;
const ng_morph_1 = require("ng-morph");
function createAngularJson({ stylesExist } = { stylesExist: false }) {
    (0, ng_morph_1.createSourceFile)('angular.json', `
{
  "version": 1,
  "projects": {
    "demo": {
        "root": "",
        "architect": {
          "build": {
            "options": {
              "main": "test/main.ts",
            ${stylesExist
        ? `"styles": [
                  "node_modules/@taiga-ui/core/styles/taiga-ui-theme.less",
                  "some.style"
                ]
                `
        : ''}}
          }
        }
    }
  }
}`, { overwrite: true });
}
exports.createAngularJson = createAngularJson;
