import type { TuiIdentityMatcher } from '@taiga-ui/cdk/types';
/**
 * Checks identity for nullable elements.
 *
 * @param a element a
 * @param b element b
 * @param handler called if both elements are not null
 * @return true if either both are null or they pass identity handler
 */
export declare function tuiNullableSame<T>(a: T | null, b: T | null, handler: TuiIdentityMatcher<T>): boolean;
