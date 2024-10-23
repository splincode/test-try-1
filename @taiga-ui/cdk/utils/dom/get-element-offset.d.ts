/**
 * Calculates offset for an element relative to it's parent several levels above
 *
 * @param host parent element
 * @param element
 * @return object with offsetTop and offsetLeft number properties
 */
export declare function tuiGetElementOffset(host: Element, element: HTMLElement): {
    offsetLeft: number;
    offsetTop: number;
};
