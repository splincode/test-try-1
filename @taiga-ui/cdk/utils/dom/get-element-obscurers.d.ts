/**
 * Returns array of Elements covering edges of given element or null if at least one edge middle point is visible
 *
 * CAUTION: Empty array means element if offscreen i.e. covered by no elements, rather than not covered
 * ```ts
 * function tuiGetElementObscures(element: Element): readonly [Element, Element, Element, Element] | [] | null
 * ```
 */
export declare function tuiGetElementObscures(element: Element): readonly [Element, Element, Element, Element] | [] | null;
