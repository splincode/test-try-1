import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
class TuiMapperPipe {
    /**
     * Maps object to an arbitrary result through a mapper function
     *
     * @param value an item to transform
     * @param mapper a mapping function
     * @param args arbitrary number of additional arguments
     */
    transform(value, mapper, ...args) {
        return mapper(value, ...args);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMapperPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiMapperPipe, isStandalone: true, name: "tuiMapper" }); }
}
export { TuiMapperPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMapperPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiMapper',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvcGlwZXMvbWFwcGVyL21hcHBlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBR25DLE1BSWEsYUFBYTtJQUN0Qjs7Ozs7O09BTUc7SUFDSSxTQUFTLENBQ1osS0FBUSxFQUNSLE1BQStCLEVBQy9CLEdBQUcsSUFBTztRQUVWLE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7K0dBZFEsYUFBYTs2R0FBYixhQUFhOztTQUFiLGFBQWE7NEZBQWIsYUFBYTtrQkFKekIsSUFBSTttQkFBQztvQkFDRixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsSUFBSSxFQUFFLFdBQVc7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1BpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQaXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHtUdWlNYXBwZXJ9IGZyb20gJ0B0YWlnYS11aS9jZGsvdHlwZXMnO1xuXG5AUGlwZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBuYW1lOiAndHVpTWFwcGVyJyxcbn0pXG5leHBvcnQgY2xhc3MgVHVpTWFwcGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIC8qKlxuICAgICAqIE1hcHMgb2JqZWN0IHRvIGFuIGFyYml0cmFyeSByZXN1bHQgdGhyb3VnaCBhIG1hcHBlciBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIGFuIGl0ZW0gdG8gdHJhbnNmb3JtXG4gICAgICogQHBhcmFtIG1hcHBlciBhIG1hcHBpbmcgZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0gYXJncyBhcmJpdHJhcnkgbnVtYmVyIG9mIGFkZGl0aW9uYWwgYXJndW1lbnRzXG4gICAgICovXG4gICAgcHVibGljIHRyYW5zZm9ybTxUIGV4dGVuZHMgdW5rbm93bltdLCBVLCBHPihcbiAgICAgICAgdmFsdWU6IFUsXG4gICAgICAgIG1hcHBlcjogVHVpTWFwcGVyPFtVLCAuLi5UXSwgRz4sXG4gICAgICAgIC4uLmFyZ3M6IFRcbiAgICApOiBHIHtcbiAgICAgICAgcmV0dXJuIG1hcHBlcih2YWx1ZSwgLi4uYXJncyk7XG4gICAgfVxufVxuIl19