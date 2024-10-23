import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
import { EMPTY_FUNCTION } from '@taiga-ui/cdk/constants';
import { tuiProvide } from '@taiga-ui/cdk/utils';
import * as i0 from "@angular/core";
class TuiValidator {
    constructor() {
        this.onChange = EMPTY_FUNCTION;
        this.tuiValidator = Validators.nullValidator;
    }
    validate(control) {
        return this.tuiValidator(control);
    }
    registerOnValidatorChange(onChange) {
        this.onChange = onChange;
    }
    ngOnChanges() {
        this.onChange();
    }
    ngOnDestroy() {
        this.tuiValidator = Validators.nullValidator;
        this.onChange();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiValidator, isStandalone: true, selector: "[tuiValidator]", inputs: { tuiValidator: "tuiValidator" }, providers: [tuiProvide(NG_VALIDATORS, TuiValidator, true)], usesOnChanges: true, ngImport: i0 }); }
}
export { TuiValidator };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiValidator, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiValidator]',
                    providers: [tuiProvide(NG_VALIDATORS, TuiValidator, true)],
                }]
        }], propDecorators: { tuiValidator: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9kaXJlY3RpdmVzL3ZhbGlkYXRvci92YWxpZGF0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTy9DLE9BQU8sRUFBQyxhQUFhLEVBQUUsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFL0MsTUFLYSxZQUFZO0lBTHpCO1FBTVksYUFBUSxHQUFHLGNBQWMsQ0FBQztRQUczQixpQkFBWSxHQUFnQixVQUFVLENBQUMsYUFBYSxDQUFDO0tBa0IvRDtJQWhCVSxRQUFRLENBQUMsT0FBd0I7UUFDcEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSx5QkFBeUIsQ0FBQyxRQUFrQztRQUMvRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQzsrR0FyQlEsWUFBWTttR0FBWixZQUFZLHVHQUZWLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7O1NBRWpELFlBQVk7NEZBQVosWUFBWTtrQkFMeEIsU0FBUzttQkFBQztvQkFDUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsZ0JBQWdCLElBQUksQ0FBQyxDQUFDO2lCQUM3RDs4QkFLVSxZQUFZO3NCQURsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge09uQ2hhbmdlcywgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgdHlwZSB7XG4gICAgQWJzdHJhY3RDb250cm9sLFxuICAgIFZhbGlkYXRpb25FcnJvcnMsXG4gICAgVmFsaWRhdG9yLFxuICAgIFZhbGlkYXRvckZuLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge05HX1ZBTElEQVRPUlMsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RU1QVFlfRlVOQ1RJT059IGZyb20gJ0B0YWlnYS11aS9jZGsvY29uc3RhbnRzJztcbmltcG9ydCB7dHVpUHJvdmlkZX0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgc2VsZWN0b3I6ICdbdHVpVmFsaWRhdG9yXScsXG4gICAgcHJvdmlkZXJzOiBbdHVpUHJvdmlkZShOR19WQUxJREFUT1JTLCBUdWlWYWxpZGF0b3IsIHRydWUpXSxcbn0pXG5leHBvcnQgY2xhc3MgVHVpVmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBvbkNoYW5nZSA9IEVNUFRZX0ZVTkNUSU9OO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHVpVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IFZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjtcblxuICAgIHB1YmxpYyB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnR1aVZhbGlkYXRvcihjb250cm9sKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShvbkNoYW5nZTogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBvbkNoYW5nZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHVpVmFsaWRhdG9yID0gVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgfVxufVxuIl19