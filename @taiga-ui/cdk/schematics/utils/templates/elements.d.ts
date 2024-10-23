import type { ChildNode, Element } from 'parse5/dist/tree-adapters/default';
export declare function findElementsByFn(nodes: ChildNode[], predicateFn: (el: Element) => boolean): Element[];
export declare function findElementsInTemplateByFn(html: string, predicateFn: (el: Element) => boolean): Element[];
export declare function findElementsByTagName(html: string, tagName: string, filterFn?: (element: Element) => boolean): Element[];
export declare function findElementsByTagNames(html: string, tagNames: string[]): Element[];
/**
 * Parses a HTML fragment and traverses all AST nodes in order find elements that
 * include the specified directive as attribute or input.
 */
export declare function findElementsWithDirective(html: string, attributeName: string): Element[];
/**
 * Parses a HTML fragment and traverses all AST nodes in order find elements that
 * include the specified attribute.
 */
export declare function findElementsWithAttribute(html: string, attributeName: string): Element[];
/**
 * Parses a HTML fragment and traverses all AST nodes in order find elements that include the specified attribute and tag name.
 * @param html
 * @param attributeName
 */
export declare function findElementsWithAttributeOnTag(html: string, attributeNames: string[], tagNames?: string[], filterFn?: (element: Element) => boolean): Element[];
/**
 * Finds elements with explicit tag names that also contain the specified attribute. Returns the
 * attribute start offset based on the specified HTML.
 */
export declare function findAttributeOnElementWithTag(html: string, name: string, tagNames: string[], filterFn?: (element: Element) => boolean): number[];
/**
 * Finds elements that contain the given attribute and contain at least one of the other
 * specified attributes. Returns the primary attribute's start offset based on the specified HTML.
 */
export declare function findAttributeOnElementWithAttrs(html: string, name: string, attrs: string[], filterFn?: (element: Element) => boolean): number[];
/** Shorthand function that checks if the specified element contains the given attribute. */
export declare function hasElementAttribute(element: Element, attributeName: string): boolean;
/** Gets the start offset of the given attribute from a Parse5 element. */
export declare function getStartOffsetOfAttribute(element: Element, attributeName: string): number;
