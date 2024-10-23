import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TuiLetContext } from './let-context';
import * as i0 from "@angular/core";
/**
 * Works like *ngIf but does not have a condition — use it to declare
 * the result of pipes calculation (i.e. async pipe)
 */
class TuiLet {
    constructor() {
        inject(ViewContainerRef).createEmbeddedView(inject((TemplateRef)), new TuiLetContext(this));
    }
    /**
     * Asserts the correct type of the context for the template that `TuiLet` will render.
     *
     * The presence of this method is a signal to the Ivy template type-check compiler that the
     * `TuiLet` structural directive renders its template with a specific context type.
     */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiLet, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiLet, isStandalone: true, selector: "[tuiLet]", inputs: { tuiLet: "tuiLet" }, ngImport: i0 }); }
}
export { TuiLet };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiLet, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiLet]',
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { tuiLet: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9kaXJlY3RpdmVzL2xldC9sZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdEYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFNUM7OztHQUdHO0FBQ0gsTUFJYSxNQUFNO0lBSWY7UUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxrQkFBa0IsQ0FDdkMsTUFBTSxDQUFDLENBQUEsV0FBNkIsQ0FBQSxDQUFDLEVBQ3JDLElBQUksYUFBYSxDQUFJLElBQUksQ0FBQyxDQUM3QixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLHNCQUFzQixDQUNoQyxJQUFlLEVBQ2YsSUFBYTtRQUViLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7K0dBdEJRLE1BQU07bUdBQU4sTUFBTTs7U0FBTixNQUFNOzRGQUFOLE1BQU07a0JBSmxCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxVQUFVO2lCQUN2QjswRUFHVSxNQUFNO3NCQURaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgaW5qZWN0LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1R1aUxldENvbnRleHR9IGZyb20gJy4vbGV0LWNvbnRleHQnO1xuXG4vKipcbiAqIFdvcmtzIGxpa2UgKm5nSWYgYnV0IGRvZXMgbm90IGhhdmUgYSBjb25kaXRpb24g4oCUIHVzZSBpdCB0byBkZWNsYXJlXG4gKiB0aGUgcmVzdWx0IG9mIHBpcGVzIGNhbGN1bGF0aW9uIChpLmUuIGFzeW5jIHBpcGUpXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgc2VsZWN0b3I6ICdbdHVpTGV0XScsXG59KVxuZXhwb3J0IGNsYXNzIFR1aUxldDxUPiB7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHVpTGV0ITogVDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpbmplY3QoVmlld0NvbnRhaW5lclJlZikuY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgICAgICAgICAgaW5qZWN0KFRlbXBsYXRlUmVmPFR1aUxldENvbnRleHQ8VD4+KSxcbiAgICAgICAgICAgIG5ldyBUdWlMZXRDb250ZXh0PFQ+KHRoaXMpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc2VydHMgdGhlIGNvcnJlY3QgdHlwZSBvZiB0aGUgY29udGV4dCBmb3IgdGhlIHRlbXBsYXRlIHRoYXQgYFR1aUxldGAgd2lsbCByZW5kZXIuXG4gICAgICpcbiAgICAgKiBUaGUgcHJlc2VuY2Ugb2YgdGhpcyBtZXRob2QgaXMgYSBzaWduYWwgdG8gdGhlIEl2eSB0ZW1wbGF0ZSB0eXBlLWNoZWNrIGNvbXBpbGVyIHRoYXQgdGhlXG4gICAgICogYFR1aUxldGAgc3RydWN0dXJhbCBkaXJlY3RpdmUgcmVuZGVycyBpdHMgdGVtcGxhdGUgd2l0aCBhIHNwZWNpZmljIGNvbnRleHQgdHlwZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG5nVGVtcGxhdGVDb250ZXh0R3VhcmQ8VD4oXG4gICAgICAgIF9kaXI6IFR1aUxldDxUPixcbiAgICAgICAgX2N0eDogdW5rbm93bixcbiAgICApOiBfY3R4IGlzIFR1aUxldENvbnRleHQ8VD4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=