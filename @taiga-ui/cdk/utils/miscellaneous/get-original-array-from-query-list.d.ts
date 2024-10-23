import type { QueryList } from '@angular/core';
/**
 * Extracts original array from {@link QueryList} rather than
 * creating a copy like {@link QueryList.toArray} does.
 * @param queryList
 * @returns original array from {@link QueryList}.
 */
export declare function tuiGetOriginalArrayFromQueryList<T>(queryList: QueryList<T>): readonly T[];
