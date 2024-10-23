import { tuiCreateToken, tuiProvideOptions } from '@taiga-ui/cdk/utils/miscellaneous';

function tuiCreateOptions(defaults) {
    const token = tuiCreateToken(defaults);
    return [token, (options) => tuiProvideOptions(token, options, defaults)];
}

// TODO: Move all DI utils into this entry point in v.5

/**
 * Generated bundle index. Do not edit.
 */

export { tuiCreateOptions };
//# sourceMappingURL=taiga-ui-cdk-utils-di.mjs.map
