import { DestroyRef, Directive, inject, Input, NgZone } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { tuiTakeUntilDestroyed, tuiZonefree } from '@taiga-ui/cdk/observables';
import { tuiInjectElement, tuiProvide } from '@taiga-ui/cdk/utils';
import { timer } from 'rxjs';
import * as i0 from "@angular/core";
class TuiNativeValidator {
    constructor() {
        this.destroyRef = inject(DestroyRef);
        this.zone = inject(NgZone);
        this.el = tuiInjectElement();
        this.tuiNativeValidator = 'Invalid';
    }
    validate(control) {
        this.control = control;
        timer(0)
            .pipe(tuiZonefree(this.zone), tuiTakeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.handleValidation());
        return null;
    }
    handleValidation() {
        this.el.setCustomValidity?.(this.control?.touched && this.control?.invalid ? this.tuiNativeValidator : '');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiNativeValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiNativeValidator, isStandalone: true, selector: "[tuiNativeValidator]", inputs: { tuiNativeValidator: "tuiNativeValidator" }, host: { listeners: { "focusout": "handleValidation()" } }, providers: [tuiProvide(NG_VALIDATORS, TuiNativeValidator, true)], ngImport: i0 }); }
}
export { TuiNativeValidator };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiNativeValidator, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiNativeValidator]',
                    providers: [tuiProvide(NG_VALIDATORS, TuiNativeValidator, true)],
                    host: {
                        '(focusout)': 'handleValidation()',
                    },
                }]
        }], propDecorators: { tuiNativeValidator: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLXZhbGlkYXRvci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvZGlyZWN0aXZlcy9uYXRpdmUtdmFsaWRhdG9yL25hdGl2ZS12YWxpZGF0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUMscUJBQXFCLEVBQUUsV0FBVyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDN0UsT0FBTyxFQUFDLGdCQUFnQixFQUFFLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7O0FBRTNCLE1BUWEsa0JBQWtCO0lBUi9CO1FBU3FCLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsU0FBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixPQUFFLEdBQUcsZ0JBQWdCLEVBQW9CLENBQUM7UUFJcEQsdUJBQWtCLEdBQUcsU0FBUyxDQUFDO0tBaUJ6QztJQWZVLFFBQVEsQ0FBQyxPQUF3QjtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUV2QixLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFUyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ2hGLENBQUM7SUFDTixDQUFDOytHQXZCUSxrQkFBa0I7bUdBQWxCLGtCQUFrQixvTEFMaEIsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDOztTQUt2RCxrQkFBa0I7NEZBQWxCLGtCQUFrQjtrQkFSOUIsU0FBUzttQkFBQztvQkFDUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsc0JBQXNCLElBQUksQ0FBQyxDQUFDO29CQUNoRSxJQUFJLEVBQUU7d0JBQ0YsWUFBWSxFQUFFLG9CQUFvQjtxQkFDckM7aUJBQ0o7OEJBUVUsa0JBQWtCO3NCQUR4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZXN0cm95UmVmLCBEaXJlY3RpdmUsIGluamVjdCwgSW5wdXQsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7QWJzdHJhY3RDb250cm9sLCBWYWxpZGF0b3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TkdfVkFMSURBVE9SU30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHt0dWlUYWtlVW50aWxEZXN0cm95ZWQsIHR1aVpvbmVmcmVlfSBmcm9tICdAdGFpZ2EtdWkvY2RrL29ic2VydmFibGVzJztcbmltcG9ydCB7dHVpSW5qZWN0RWxlbWVudCwgdHVpUHJvdmlkZX0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscyc7XG5pbXBvcnQge3RpbWVyfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ1t0dWlOYXRpdmVWYWxpZGF0b3JdJyxcbiAgICBwcm92aWRlcnM6IFt0dWlQcm92aWRlKE5HX1ZBTElEQVRPUlMsIFR1aU5hdGl2ZVZhbGlkYXRvciwgdHJ1ZSldLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhmb2N1c291dCknOiAnaGFuZGxlVmFsaWRhdGlvbigpJyxcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUdWlOYXRpdmVWYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHpvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVsID0gdHVpSW5qZWN0RWxlbWVudDxIVE1MSW5wdXRFbGVtZW50PigpO1xuICAgIHByaXZhdGUgY29udHJvbD86IEFic3RyYWN0Q29udHJvbDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHR1aU5hdGl2ZVZhbGlkYXRvciA9ICdJbnZhbGlkJztcblxuICAgIHB1YmxpYyB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBudWxsIHtcbiAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcblxuICAgICAgICB0aW1lcigwKVxuICAgICAgICAgICAgLnBpcGUodHVpWm9uZWZyZWUodGhpcy56b25lKSwgdHVpVGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGFuZGxlVmFsaWRhdGlvbigpKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGFuZGxlVmFsaWRhdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbC5zZXRDdXN0b21WYWxpZGl0eT8uKFxuICAgICAgICAgICAgdGhpcy5jb250cm9sPy50b3VjaGVkICYmIHRoaXMuY29udHJvbD8uaW52YWxpZCA/IHRoaXMudHVpTmF0aXZlVmFsaWRhdG9yIDogJycsXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19