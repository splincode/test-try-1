"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateDestroyService = void 0;
const ng_morph_1 = require("ng-morph");
const add_unique_import_1 = require("../../../utils/add-unique-import");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
const import_manipulations_1 = require("../../../utils/import-manipulations");
const insert_todo_1 = require("../../../utils/insert-todo");
function migrateDestroyService(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} migrating TuiDestroyService => takeUntilDestroyed ...`);
    const references = (0, get_named_import_references_1.getNamedImportReferences)('TuiDestroyService', '@taiga-ui/cdk');
    const nodesForComments = [];
    references.forEach((ref) => {
        var _a;
        if (ref.wasForgotten()) {
            return;
        }
        const parent = ref.getParent();
        const destroyObservableUsages = [];
        if (ng_morph_1.Node.isImportSpecifier(parent)) {
            // - import {TuiDestroyService} from '@taiga-ui/cdk';
            // + import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
            (0, import_manipulations_1.removeImport)(parent);
            (0, add_unique_import_1.addUniqueImport)(parent.getSourceFile().getFilePath(), 'takeUntilDestroyed', '@angular/core/rxjs-interop');
        }
        else if (ng_morph_1.Node.isArrayLiteralExpression(parent) &&
            parent.getParent().getText().includes('providers')) {
            // providers: [TuiDestroyService]
            const index = parent
                .getElements()
                .findIndex((el) => el.getText() === 'TuiDestroyService');
            parent.removeElement(index);
        }
        else if (ng_morph_1.Node.isTypeReference(parent)) {
            // constructor(private destroy$: TuiDestroyService) {}
            const constructorParameter = parent.getParent();
            if (ng_morph_1.Node.isParameterDeclaration(constructorParameter)) {
                destroyObservableUsages.push(...constructorParameter.findReferencesAsNodes());
                constructorParameter.remove();
            }
        }
        else if (ng_morph_1.Node.isCallExpression(parent) &&
            ng_morph_1.Node.isDecorator(parent.getParent())) {
            // constructor(@Self() @Inject(TuiDestroyService) destroy$: TuiDestroyService) {}
            const constructorParameter = (_a = parent.getParent()) === null || _a === void 0 ? void 0 : _a.getParent();
            if (ng_morph_1.Node.isParameterDeclaration(constructorParameter)) {
                destroyObservableUsages.push(...constructorParameter.findReferencesAsNodes());
                constructorParameter.remove();
            }
        }
        else if (ng_morph_1.Node.isCallExpression(parent) &&
            parent.getText().includes('inject(')) {
            const injectDestination = parent.getParent();
            const possibleTakeUntil = injectDestination && findTakeUntil(injectDestination);
            if (possibleTakeUntil) {
                // takeUntil(inject(TuiDestroyService), {...})
                possibleTakeUntil.replaceWithText('takeUntilDestroyed()');
            }
            else if (ng_morph_1.Node.isPropertyDeclaration(injectDestination)) {
                // private destroy$ = inject(TuiDestroyService), {...});
                destroyObservableUsages.push(...injectDestination.findReferencesAsNodes());
                injectDestination.remove();
            }
        }
        else {
            nodesForComments.push(ref);
        }
        destroyObservableUsages.forEach((node) => {
            const possibleTakeUntil = findTakeUntil(node);
            if (!possibleTakeUntil) {
                return;
            }
            const constructor = possibleTakeUntil.getFirstAncestorByKind(ng_morph_1.SyntaxKind.Constructor);
            if (constructor) {
                // we are definitely inside an injection context
                possibleTakeUntil.replaceWithText('takeUntilDestroyed()');
                return;
            }
            // other cases when we are not sure if we are inside an injection context
            (0, add_unique_import_1.addUniqueImport)(possibleTakeUntil.getSourceFile().getFilePath(), 'DestroyRef', '@angular/core');
            (0, add_unique_import_1.addUniqueImport)(possibleTakeUntil.getSourceFile().getFilePath(), 'inject', '@angular/core');
            const componentClass = possibleTakeUntil.getFirstAncestorByKind(ng_morph_1.SyntaxKind.ClassDeclaration);
            if (componentClass) {
                !componentClass.getProperty('destroyRef') &&
                    componentClass.addProperty({
                        name: 'destroyRef',
                        initializer: 'inject(DestroyRef)',
                        isReadonly: true,
                    });
                possibleTakeUntil.replaceWithText('takeUntilDestroyed(this.destroyRef)');
                return;
            }
            nodesForComments.push(node);
        });
    });
    /**
     * Inserting code comment should be placed after all AST-manipulations of this migration!
     * When we insert some text into the source file,
     * all previously queried refs will be forgotten and not be available for use.
     * So, we should re-query them. It is not performance-friendly.
     * ---
     * We suppose that one code comment per file about `TuiDestroyService` is enough.
     * ---
     * @see https://ts-morph.com/manipulation/#strongwarningstrong
     */
    nodesForComments.forEach((ref) => {
        if (ref.wasForgotten()) {
            return;
        }
        const identifier = ng_morph_1.Node.isIdentifier(ref)
            ? ref
            : ref.getFirstAncestorByKind(ng_morph_1.SyntaxKind.Identifier);
        identifier &&
            (0, insert_todo_1.insertTodo)(identifier, 'use takeUntilDestroyed (https://angular.io/api/core/rxjs-interop/takeUntilDestroyed) instead of legacy TuiDestroyService');
    });
    !options['skip-logs'] && (0, ng_morph_1.titleLog)(`${ng_morph_1.FINISH_SYMBOL} successfully migrated \n`);
}
exports.migrateDestroyService = migrateDestroyService;
function findTakeUntil(node, maxDepth = 10) {
    if (node.wasForgotten()) {
        return null;
    }
    if (ng_morph_1.Node.isCallExpression(node) && node.getText().includes('takeUntil(')) {
        return node;
    }
    const parent = node.getParent();
    return parent && maxDepth ? findTakeUntil(parent, maxDepth - 1) : null;
}
