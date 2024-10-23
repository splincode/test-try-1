"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showWarnings = void 0;
const ng_morph_1 = require("ng-morph");
const constants_1 = require("../../constants");
function showWarning({ name, message, moduleSpecifier = '**/**' }, { logger }) {
    const references = (0, ng_morph_1.getImports)(constants_1.ALL_TS_FILES, {
        moduleSpecifier,
        namedImports: [name],
    })
        .map((i) => {
        var _a;
        return (_a = i
            .getNamedImports()
            .find((namedImport) => namedImport.getName() === name)) === null || _a === void 0 ? void 0 : _a.getNameNode();
    })
        .filter((namedImport) => Boolean(namedImport));
    const referencesMeta = references.map((ref) => {
        const sourceFile = ref.getSourceFile();
        return {
            sourceFile,
            filePath: sourceFile.getFilePath().toString(),
            startLinePos: ref.getStartLinePos(),
        };
    });
    /**
     * We have to twice iterate array with refs because otherwise we get error:
     * > Attempted to get information from a node that was removed or forgotten.
     * See this {@link https://ts-morph.com/manipulation/#strongwarningstrong warning}
     */
    referencesMeta.forEach(({ sourceFile, filePath, startLinePos }) => {
        logger.warn(`[WARNING] in ${filePath}: ${message}`);
        sourceFile.insertText(startLinePos, `// TODO: (Taiga UI migration) ${message}\n`);
    });
}
function showWarnings(context, warnings) {
    warnings.forEach((warning) => showWarning(warning, context));
}
exports.showWarnings = showWarnings;
