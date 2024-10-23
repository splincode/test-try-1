import { isIos } from '@ng-web-apis/platform';

/**
 * @description:
 * All Chrome / Chromium-based browsers will return MacIntel on macOS,
 * no matter what the hardware architecture is. See the source code here:
 * https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/frame/navigator_id.cc;l=64;drc=703d3c472cf27470dad21a3f2c8972aca3732cd6
 * But maybe in future years, it will be changed to MacM1
 *
 * Documentation:
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform
 */
function tuiIsApple(navigator) {
    return navigator.platform.startsWith('Mac') || navigator.platform === 'iPhone';
}

function tuiIsEdge(userAgent) {
    return userAgent.toLowerCase().includes('edge');
}

function tuiIsFirefox(userAgent) {
    return userAgent.toLowerCase().includes('firefox');
}

/**
 * @deprecated: drop in v5, use import {isApple} from '@ng-web-apis/platform';
 * @param navigator
 */
const tuiIsIos = isIos;

// TODO: Drop change to Document in v5
function tuiIsSafari({ ownerDocument: doc }) {
    const win = doc?.defaultView;
    const isMacOsSafari = win.safari !== undefined &&
        win.safari?.pushNotification?.toString() === '[object SafariRemoteNotification]';
    const isIosSafari = !!win.navigator?.vendor?.includes('Apple') &&
        !win.navigator?.userAgent?.includes('CriOS') &&
        !win.navigator?.userAgent?.includes('FxiOS');
    return isMacOsSafari || isIosSafari;
}

/**
 * Generated bundle index. Do not edit.
 */

export { tuiIsApple, tuiIsEdge, tuiIsFirefox, tuiIsIos, tuiIsSafari };
//# sourceMappingURL=taiga-ui-cdk-utils-browser.mjs.map
