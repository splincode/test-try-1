"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateAlertService = void 0;
const ng_morph_1 = require("ng-morph");
const get_named_import_references_1 = require("../../../utils/get-named-import-references");
const OPTIONS_MIGRATIONS = {
    autoClose: (property) => {
        const [propertyKey, propertyValue] = property.getText().split(/\s?:\s?/);
        switch (propertyValue) {
            case 'false':
                return property.replaceWithText(`${propertyKey}: 0`);
            case 'true':
                return property.replaceWithText(`${propertyKey}: 3_000`);
            default:
                return null;
        }
    },
    defaultAutoCloseTime: (property) => property.replaceWithText(property.getText().replace('defaultAutoCloseTime', 'autoClose')),
    status: (property) => property.replaceWithText(property.getText().replace('status', 'appearance')),
    hasCloseButton: (property) => property.replaceWithText(property.getText().replace('hasCloseButton', 'closeable')),
    hasIcon: (property) => {
        const [, propertyValue] = property.getText().split(/\s?:\s?/);
        switch (propertyValue) {
            case 'false':
                return property.replaceWithText("icon: ''");
            case 'true':
                return property.remove();
            default:
                return property.replaceWithText(`// TODO: (Taiga UI migration) "hasIcon" is deleted. Use "icon: ''" to hide icon. Use "icon: TUI_NOTIFICATION_DEFAULT_OPTIONS['icon']" to show it.\n${property.getText()}`);
        }
    },
};
function migrateAlertService(options) {
    !options['skip-logs'] &&
        (0, ng_morph_1.infoLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.REPLACE_SYMBOL} replacing inject(TuiAlertService).open({autoClose: boolean})...`);
    const alertServiceRefs = (0, get_named_import_references_1.getNamedImportReferences)('TuiAlertService', '@taiga-ui/core');
    // inject(TuiAlertService).open(...)
    const viaDirectInjects = alertServiceRefs.map((x) => x.getFirstAncestor((node) => node.isKind(ng_morph_1.SyntaxKind.CallExpression) &&
        node.getFullText().includes('inject(TuiAlertService') &&
        node.getFullText().includes('.open')));
    // readonly alertService = inject(TuiAlertService);
    const viaClassProperty = alertServiceRefs
        .map((x) => {
        var _a;
        return (_a = x
            .getFirstAncestorByKind(ng_morph_1.SyntaxKind.PropertyDeclaration)) === null || _a === void 0 ? void 0 : _a.findReferencesAsNodes();
    })
        .flat()
        .map(toAlertServiceOpenCallExpression);
    // constructor(private readonly legacyWayService: TuiAlertService) {}
    const viaConstructorParam = alertServiceRefs
        .map((x) => { var _a; return (_a = x.getFirstAncestorByKind(ng_morph_1.SyntaxKind.Parameter)) === null || _a === void 0 ? void 0 : _a.findReferencesAsNodes(); })
        .flat()
        .map(toAlertServiceOpenCallExpression);
    const inlineAlertOptions = [];
    [...viaDirectInjects, ...viaClassProperty, ...viaConstructorParam].forEach((callExpression) => {
        if (!callExpression || callExpression.wasForgotten()) {
            return;
        }
        const [, arg] = callExpression.getArguments();
        const expression = (arg === null || arg === void 0 ? void 0 : arg.isKind(ng_morph_1.SyntaxKind.PropertyAccessExpression))
            ? findOptionsInitializer(arg)
            : arg;
        if (ng_morph_1.Node.isObjectLiteralExpression(expression)) {
            inlineAlertOptions.push(expression);
        }
    });
    const standaloneAlertOptions = (0, get_named_import_references_1.getNamedImportReferences)('TuiAlertOptions', '@taiga-ui/core')
        .map((n) => {
        const type = n.getFirstAncestorByKind(ng_morph_1.SyntaxKind.TypeReference);
        const siblings = [
            ...((type === null || type === void 0 ? void 0 : type.getPreviousSiblings()) || []),
            ...((type === null || type === void 0 ? void 0 : type.getNextSiblings()) || []),
        ];
        return siblings.find(ng_morph_1.Node.isObjectLiteralExpression);
    })
        .filter((x) => !!x);
    [...inlineAlertOptions, ...standaloneAlertOptions].forEach((options) => {
        Object.entries(OPTIONS_MIGRATIONS).forEach(([propertyName, migration]) => {
            const property = options.getProperty(propertyName);
            if (!property) {
                return;
            }
            const isShorthandPropertyAssignment = ng_morph_1.Node.isShorthandPropertyAssignment(property) &&
                !property.hasObjectAssignmentInitializer();
            const previousPropertyText = property.getText();
            migration(property);
            if (isShorthandPropertyAssignment && !property.wasForgotten()) {
                property.replaceWithText(`${property.getText()}: ${previousPropertyText}`);
            }
        });
    });
    !options['skip-logs'] &&
        (0, ng_morph_1.successLog)(`${ng_morph_1.SMALL_TAB_SYMBOL}${ng_morph_1.SUCCESS_SYMBOL} "true => 3_000" & "false => 0" were replaced  \n`);
}
exports.migrateAlertService = migrateAlertService;
function toAlertServiceOpenCallExpression(node) {
    return node === null || node === void 0 ? void 0 : node.getFirstAncestor((x) => x.isKind(ng_morph_1.SyntaxKind.CallExpression) && x.getFullText().includes('.open'));
}
function findOptionsInitializer(ref) {
    var _a;
    return (_a = ref === null || ref === void 0 ? void 0 : ref.getFirstChildByKind(ng_morph_1.SyntaxKind.Identifier)) === null || _a === void 0 ? void 0 : _a.findReferencesAsNodes().map((n) => {
        var _a;
        return (_a = n
            .getFirstAncestorByKind(ng_morph_1.SyntaxKind.PropertyDeclaration)) === null || _a === void 0 ? void 0 : _a.getFirstChildByKind(ng_morph_1.SyntaxKind.ObjectLiteralExpression);
    }).find(Boolean);
}
