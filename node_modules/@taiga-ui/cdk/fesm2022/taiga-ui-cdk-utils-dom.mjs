import { tuiClamp } from '@taiga-ui/cdk/utils/math';
import { tuiIsPresent } from '@taiga-ui/cdk/utils/miscellaneous';
import { inject, ElementRef } from '@angular/core';

function tuiContainsOrAfter(current, node) {
    try {
        return (current.contains(node) ||
            !!(node.compareDocumentPosition(current) & Node.DOCUMENT_POSITION_PRECEDING));
    }
    catch {
        return false;
    }
}

function tuiIsInput(element) {
    return element.matches('input');
}
function tuiIsTextarea(element) {
    return element.matches('textarea');
}
function tuiIsTextfield(element) {
    return tuiIsInput(element) || tuiIsTextarea(element);
}
function tuiIsElement(node) {
    return !!node && 'nodeType' in node && node.nodeType === Node.ELEMENT_NODE;
}
function tuiIsHTMLElement(node) {
    const defaultView = node?.ownerDocument.defaultView;
    return !!node && !!defaultView && node instanceof defaultView.HTMLElement;
}
function tuiIsTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
}

function tuiIsInputEvent(event) {
    return 'data' in event && 'inputType' in event;
}

/**
 * Gets actual target from open Shadow DOM if event happened within it
 */
function tuiGetActualTarget(event) {
    return event.composedPath()[0];
}

const DEFAULT_FORMAT = 'text/plain';
/**
 * Gets text from data of clipboardEvent, it also works in IE and Edge browsers
 */
function tuiGetClipboardDataText(event, format = DEFAULT_FORMAT) {
    return 'clipboardData' in event && event.clipboardData !== null
        ? event.clipboardData.getData(format) ||
            event.clipboardData.getData(DEFAULT_FORMAT)
        : event.target.ownerDocument.defaultView.clipboardData.getData('text');
}

function tuiGetDocumentOrShadowRoot(node) {
    return 'getRootNode' in node && node.isConnected
        ? node.getRootNode()
        : node.ownerDocument;
}

/**
 * Returns array of Elements covering edges of given element or null if at least one edge middle point is visible
 *
 * CAUTION: Empty array means element if offscreen i.e. covered by no elements, rather than not covered
 * ```ts
 * function tuiGetElementObscures(element: Element): readonly [Element, Element, Element, Element] | [] | null
 * ```
 */
function tuiGetElementObscures(element) {
    const { ownerDocument } = element;
    if (!ownerDocument?.defaultView || !element.getBoundingClientRect) {
        return null;
    }
    const { innerWidth, innerHeight } = ownerDocument.defaultView;
    const doc = tuiGetDocumentOrShadowRoot(element);
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
        return null;
    }
    const left = tuiClamp(Math.round(rect.left) + 2, 0, innerWidth);
    const top = tuiClamp(Math.round(rect.top) + 2, 0, innerHeight);
    const right = tuiClamp(Math.round(rect.right) - 2, 0, innerWidth);
    const bottom = tuiClamp(Math.round(rect.bottom) - 2, 0, innerHeight);
    const horizontalMiddle = tuiClamp(Math.round(rect.left + rect.width / 2), 0, innerWidth);
    const verticalMiddle = tuiClamp(Math.round(rect.top + rect.height / 2), 0, innerHeight);
    const elements = [
        doc.elementFromPoint(horizontalMiddle, top),
        doc.elementFromPoint(horizontalMiddle, bottom),
        doc.elementFromPoint(left, verticalMiddle),
        doc.elementFromPoint(right, verticalMiddle),
    ];
    const nonNull = elements.filter(tuiIsPresent);
    if (!nonNull.length) {
        return [];
    }
    const filtered = nonNull.filter((el) => !element.contains(el) && !el.contains(element));
    return filtered.length === 4
        ? filtered
        : null;
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
/**
 * Calculates offset for an element relative to it's parent several levels above
 *
 * @param host parent element
 * @param element
 * @return object with offsetTop and offsetLeft number properties
 */
function tuiGetElementOffset(host, element) {
    ngDevMode && console.assert(host.contains(element), 'Host must contain element');
    let { offsetTop, offsetLeft, offsetParent } = element;
    while (tuiIsHTMLElement(offsetParent) && offsetParent !== host) {
        offsetTop += offsetParent.offsetTop;
        offsetLeft += offsetParent.offsetLeft;
        offsetParent = offsetParent.offsetParent;
    }
    return { offsetTop, offsetLeft };
}

function tuiGetElementPoint(x, y, element) {
    const { left, top, width, height } = element.getBoundingClientRect();
    return [tuiClamp(x - left, 0, width) / width, tuiClamp(y - top, 0, height) / height];
}

/**
 * @description:
 * cross browser way to get selected text
 *
 * History:
 * BUG - window.getSelection() fails when text selected in a form field
 * https://bugzilla.mozilla.org/show_bug.cgi?id=85686
 */
function tuiGetSelectedText({ getSelection, document }) {
    return document.activeElement && tuiIsTextfield(document.activeElement)
        ? document.activeElement.value.slice(document.activeElement.selectionStart || 0, document.activeElement.selectionEnd || 0)
        : getSelection()?.toString() || null;
}

function tuiInjectElement() {
    return inject(ElementRef).nativeElement;
}

function tuiIsCurrentTarget({ target, currentTarget }) {
    return target === currentTarget;
}

function tuiIsElementEditable(element) {
    return (tuiIsTextfield(element) && !element.readOnly) || !!element.isContentEditable;
}

/**
 * Checks if an app is running inside <iframe /> tag
 */
function tuiIsInsideIframe(win) {
    return win.parent !== win;
}

/**
 * Checks if node is inside a specific selector
 *
 * @param node
 * @param selector
 * @return true if node is inside a particular selector
 */
function tuiIsNodeIn(node, selector) {
    return tuiIsTextNode(node)
        ? !!node.parentElement?.closest(selector)
        : tuiIsElement(node) && !!node.closest(selector);
}

function tuiPointToClientRect(x = 0, y = 0) {
    const rect = {
        x,
        y,
        left: x,
        right: x,
        top: y,
        bottom: y,
        width: 0,
        height: 0,
    };
    return {
        ...rect,
        toJSON: () => rect,
    };
}

function tuiRetargetedBoundaryCrossing(event) {
    // firefox
    if ('explicitOriginalTarget' in event) {
        return event?.explicitOriginalTarget !== event.target;
    }
    // chrome
    if ('pointerId' in event) {
        return event.pointerId === -1;
    }
    // safari
    if ('detail' in event && 'webkitForce' in event) {
        return event?.detail === 0;
    }
    return false;
}

/**
 * Generated bundle index. Do not edit.
 */

export { tuiContainsOrAfter, tuiGetActualTarget, tuiGetClipboardDataText, tuiGetDocumentOrShadowRoot, tuiGetElementObscures, tuiGetElementOffset, tuiGetElementPoint, tuiGetSelectedText, tuiInjectElement, tuiIsCurrentTarget, tuiIsElement, tuiIsElementEditable, tuiIsHTMLElement, tuiIsInput, tuiIsInputEvent, tuiIsInsideIframe, tuiIsNodeIn, tuiIsTextNode, tuiIsTextarea, tuiIsTextfield, tuiPointToClientRect, tuiRetargetedBoundaryCrossing };
//# sourceMappingURL=taiga-ui-cdk-utils-dom.mjs.map
