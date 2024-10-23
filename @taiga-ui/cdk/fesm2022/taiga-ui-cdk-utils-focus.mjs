import { tuiIsHTMLElement } from '@taiga-ui/cdk/utils/dom';
import { toSignal } from '@angular/core/rxjs-interop';
import { TUI_TRUE_HANDLER, TUI_FALSE_HANDLER, svgNodeFilter } from '@taiga-ui/cdk/constants';
import { merge, fromEvent, map } from 'rxjs';

/**
 * Returns current active element, including shadow dom
 *
 * @return element or null
 */
function tuiGetNativeFocused({ activeElement }) {
    if (!activeElement?.shadowRoot) {
        return activeElement;
    }
    let element = activeElement.shadowRoot.activeElement;
    while (element?.shadowRoot) {
        element = element.shadowRoot.activeElement;
    }
    return element;
}

/**
 * Finds and blurs current active element, including shadow DOM
 */
function tuiBlurNativeFocused(doc) {
    const activeElement = tuiGetNativeFocused(doc);
    if (tuiIsHTMLElement(activeElement)) {
        activeElement.blur();
    }
}

function tuiFocusedIn(node) {
    return toSignal(merge(fromEvent(node, 'focusin').pipe(map(TUI_TRUE_HANDLER)), fromEvent(node, 'focusout').pipe(map(TUI_FALSE_HANDLER))), { initialValue: false });
}

/**
 * Checks for signs that element can be focused with keyboard. tabIndex above 0 is ignored to
 * only target natural focus order. Not checking the possibility of an element to
 * be focused, for example element can have display: none applied to it or any other
 * circumstances could prevent actual focus.
 */
function tuiIsNativeKeyboardFocusable(element) {
    if (element.hasAttribute('disabled') || element.getAttribute('tabIndex') === '-1') {
        return false;
    }
    if ((tuiIsHTMLElement(element) && element.isContentEditable) ||
        element.getAttribute('tabIndex') === '0') {
        return true;
    }
    switch (element.tagName) {
        case 'A':
        case 'LINK':
            return element.hasAttribute('href');
        case 'AUDIO':
        case 'VIDEO':
            return element.hasAttribute('controls');
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA':
            return true;
        case 'INPUT':
            return element.getAttribute('type') !== 'hidden';
        default:
            return false;
    }
}

function tuiIsNativeMouseFocusable(element) {
    return (!element.hasAttribute('disabled') &&
        (element.getAttribute('tabIndex') === '-1' ||
            tuiIsNativeKeyboardFocusable(element)));
}

/**
 * @description:
 * Finds the closest element that can be focused with a keyboard or mouse in theory
 */
function tuiGetClosestFocusable({ initial, root, previous = false, keyboard = true, }) {
    if (!root.ownerDocument) {
        return null;
    }
    const check = keyboard ? tuiIsNativeKeyboardFocusable : tuiIsNativeMouseFocusable;
    const treeWalker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, svgNodeFilter);
    treeWalker.currentNode = initial;
    while (previous ? treeWalker.previousNode() : treeWalker.nextNode()) {
        if (tuiIsHTMLElement(treeWalker.currentNode)) {
            initial = treeWalker.currentNode;
        }
        if (tuiIsHTMLElement(initial) && check(initial)) {
            return initial;
        }
    }
    return null;
}

/**
 * Checks if element is focused.
 *
 * Could return true even after blur since element remains focused if you switch away from a browser tab.
 *
 * @param node or null (as a common return value of DOM nodes walking)
 * @return true if focused
 */
function tuiIsNativeFocused(node) {
    return (!!node?.ownerDocument &&
        tuiGetNativeFocused(node.ownerDocument) === node &&
        node.ownerDocument.hasFocus());
}

/**
 * Checks if focused element is within given element.
 *
 * @param node
 * @return true if focused node is contained within element
 */
function tuiIsNativeFocusedIn(node) {
    const focused = node?.ownerDocument && tuiGetNativeFocused(node.ownerDocument);
    return !!focused && node.contains(focused) && !!node.ownerDocument?.hasFocus();
}

/**
 * Utility method for moving focus in a list of elements
 *
 * @param currentIndex currently focused index
 * @param elements array of focusable elements
 * @param step a step to move focus by, typically -1 or 1
 */
function tuiMoveFocus(currentIndex, elements, step) {
    currentIndex += step;
    while (currentIndex >= 0 && currentIndex < elements.length) {
        elements[currentIndex]?.focus();
        if (tuiIsNativeFocused(elements[currentIndex])) {
            return;
        }
        currentIndex += step;
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { tuiBlurNativeFocused, tuiFocusedIn, tuiGetClosestFocusable, tuiGetNativeFocused, tuiIsNativeFocused, tuiIsNativeFocusedIn, tuiIsNativeKeyboardFocusable, tuiIsNativeMouseFocusable, tuiMoveFocus };
//# sourceMappingURL=taiga-ui-cdk-utils-focus.mjs.map
