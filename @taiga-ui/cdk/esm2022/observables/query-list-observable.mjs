import { tuiGetOriginalArrayFromQueryList } from '@taiga-ui/cdk/utils/miscellaneous';
import { map, startWith } from 'rxjs';
/**
 * Converts changes observable of a QueryList to an Observable of arrays
 */
export function tuiQueryListChanges(queryList) {
    return queryList.changes.pipe(startWith(null), map(() => tuiGetOriginalArrayFromQueryList(queryList)));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktbGlzdC1vYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY2RrL29ic2VydmFibGVzL3F1ZXJ5LWxpc3Qtb2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUVuRixPQUFPLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVwQzs7R0FFRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsU0FBdUI7SUFFdkIsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDekIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUNmLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUN6RCxDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtRdWVyeUxpc3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0dWlHZXRPcmlnaW5hbEFycmF5RnJvbVF1ZXJ5TGlzdH0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscy9taXNjZWxsYW5lb3VzJztcbmltcG9ydCB0eXBlIHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwLCBzdGFydFdpdGh9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIENvbnZlcnRzIGNoYW5nZXMgb2JzZXJ2YWJsZSBvZiBhIFF1ZXJ5TGlzdCB0byBhbiBPYnNlcnZhYmxlIG9mIGFycmF5c1xuICovXG5leHBvcnQgZnVuY3Rpb24gdHVpUXVlcnlMaXN0Q2hhbmdlczxUPihcbiAgICBxdWVyeUxpc3Q6IFF1ZXJ5TGlzdDxUPixcbik6IE9ic2VydmFibGU8cmVhZG9ubHkgVFtdPiB7XG4gICAgcmV0dXJuIHF1ZXJ5TGlzdC5jaGFuZ2VzLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgICAgbWFwKCgpID0+IHR1aUdldE9yaWdpbmFsQXJyYXlGcm9tUXVlcnlMaXN0KHF1ZXJ5TGlzdCkpLFxuICAgICk7XG59XG4iXX0=