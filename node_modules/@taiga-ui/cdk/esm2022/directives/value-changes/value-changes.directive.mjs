import { Directive, inject, Output } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import { distinctUntilChanged, EMPTY, Subject, switchAll } from 'rxjs';
import * as i0 from "@angular/core";
class TuiValueChanges {
    constructor() {
        this.container = inject(ControlContainer, { optional: true });
        this.control = inject(NgControl, { optional: true });
        this.refresh$ = new Subject();
        this.tuiValueChanges = this.refresh$.pipe(distinctUntilChanged(), switchAll(), distinctUntilChanged());
    }
    ngDoCheck() {
        this.refresh$.next(this.control?.valueChanges || this.container?.valueChanges || EMPTY);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiValueChanges, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiValueChanges, isStandalone: true, selector: "[tuiValueChanges]", outputs: { tuiValueChanges: "tuiValueChanges" }, ngImport: i0 }); }
}
export { TuiValueChanges };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiValueChanges, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiValueChanges]',
                }]
        }], propDecorators: { tuiValueChanges: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtY2hhbmdlcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvZGlyZWN0aXZlcy92YWx1ZS1jaGFuZ2VzL3ZhbHVlLWNoYW5nZXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0QsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUVyRSxNQUlhLGVBQWU7SUFKNUI7UUFLcUIsY0FBUyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZELFlBQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDOUMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFpQixDQUFDO1FBR3pDLG9CQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hELG9CQUFvQixFQUFFLEVBQ3RCLFNBQVMsRUFBRSxFQUNYLG9CQUFvQixFQUFFLENBQ3pCLENBQUM7S0FPTDtJQUxVLFNBQVM7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDZCxJQUFJLENBQUMsT0FBTyxFQUFFLFlBQVksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksSUFBSSxLQUFLLENBQ3RFLENBQUM7SUFDTixDQUFDOytHQWhCUSxlQUFlO21HQUFmLGVBQWU7O1NBQWYsZUFBZTs0RkFBZixlQUFlO2tCQUozQixTQUFTO21CQUFDO29CQUNQLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsbUJBQW1CO2lCQUNoQzs4QkFPbUIsZUFBZTtzQkFEOUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtEb0NoZWNrfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGlyZWN0aXZlLCBpbmplY3QsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xDb250YWluZXIsIE5nQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHR5cGUge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgRU1QVFksIFN1YmplY3QsIHN3aXRjaEFsbH0gZnJvbSAncnhqcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgc2VsZWN0b3I6ICdbdHVpVmFsdWVDaGFuZ2VzXScsXG59KVxuZXhwb3J0IGNsYXNzIFR1aVZhbHVlQ2hhbmdlczxUPiBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29udGFpbmVyID0gaW5qZWN0KENvbnRyb2xDb250YWluZXIsIHtvcHRpb25hbDogdHJ1ZX0pO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29udHJvbCA9IGluamVjdChOZ0NvbnRyb2wsIHtvcHRpb25hbDogdHJ1ZX0pO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVmcmVzaCQgPSBuZXcgU3ViamVjdDxPYnNlcnZhYmxlPFQ+PigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHR1aVZhbHVlQ2hhbmdlcyA9IHRoaXMucmVmcmVzaCQucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgc3dpdGNoQWxsKCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgKTtcblxuICAgIHB1YmxpYyBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaCQubmV4dChcbiAgICAgICAgICAgIHRoaXMuY29udHJvbD8udmFsdWVDaGFuZ2VzIHx8IHRoaXMuY29udGFpbmVyPy52YWx1ZUNoYW5nZXMgfHwgRU1QVFksXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19