"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATTRS_TO_DIRECTIVE_REPLACE = void 0;
const elements_1 = require("../../../../utils/templates/elements");
exports.ATTRS_TO_DIRECTIVE_REPLACE = [
    {
        componentSelector: [
            'tui-primitive-textfield',
            'tui-input-number',
            'tui-input-slider',
        ],
        inputProperty: 'prefix',
        directive: 'tuiTextfieldPrefix',
        directiveModule: {
            name: 'TuiTextfieldControllerModule',
            moduleSpecifier: '@taiga-ui/core',
        },
    },
    {
        componentSelector: [
            'tui-primitive-textfield',
            'tui-input-number',
            'tui-input-slider',
            'tui-input-time',
        ],
        inputProperty: 'postfix',
        directive: 'tuiTextfieldPostfix',
        directiveModule: {
            name: 'TuiTextfieldControllerModule',
            moduleSpecifier: '@taiga-ui/core',
        },
    },
    {
        componentSelector: ['tui-primitive-textfield'],
        inputProperty: 'filler',
        directive: 'tuiTextfieldFiller',
        directiveModule: {
            name: 'TuiTextfieldControllerModule',
            moduleSpecifier: '@taiga-ui/core',
        },
    },
    {
        componentSelector: ['a', 'button'],
        filterFn: (el) => (0, elements_1.hasElementAttribute)(el, 'tuiLink'),
        inputProperty: 'iconRotated',
        directive: 'tuiChevron',
        directiveModule: {
            name: 'TuiChevron',
            moduleSpecifier: '@taiga-ui/kit',
        },
    },
    {
        componentSelector: ['button', 'a'],
        inputProperty: 'showLoader',
        directive: 'loading',
        directiveModule: {
            name: 'TuiButtonLoading',
            moduleSpecifier: '@taiga-ui/kit',
        },
        filterFn: (el) => (0, elements_1.hasElementAttribute)(el, 'tuiButton') ||
            (0, elements_1.hasElementAttribute)(el, 'tuiIconButton'),
    },
    {
        componentSelector: ['*'],
        inputProperty: 'pseudoFocus',
        directive: 'tuiAppearanceFocus',
        directiveModule: {
            name: 'TuiAppearance',
            moduleSpecifier: '@taiga-ui/core',
        },
    },
];
