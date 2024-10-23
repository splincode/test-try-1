import { Directive, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
class TuiNgControl {
    constructor() {
        this.ngControl = inject(NgControl);
    }
    get control() {
        return this.ngControl.control;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiNgControl, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiNgControl, isStandalone: true, selector: "[tuiControl]", exportAs: ["ngControl"], ngImport: i0 }); }
}
export { TuiNgControl };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiNgControl, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiControl]',
                    exportAs: 'ngControl',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvZGlyZWN0aXZlcy9jb250cm9sL2NvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFekMsTUFLYSxZQUFZO0lBTHpCO1FBTXFCLGNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7S0FLbEQ7SUFIRyxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBUSxDQUFDO0lBQ25DLENBQUM7K0dBTFEsWUFBWTttR0FBWixZQUFZOztTQUFaLFlBQVk7NEZBQVosWUFBWTtrQkFMeEIsU0FBUzttQkFBQztvQkFDUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxXQUFXO2lCQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHR5cGUge0Fic3RyYWN0Q29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ1t0dWlDb250cm9sXScsXG4gICAgZXhwb3J0QXM6ICduZ0NvbnRyb2wnLFxufSlcbmV4cG9ydCBjbGFzcyBUdWlOZ0NvbnRyb2wge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbmdDb250cm9sID0gaW5qZWN0KE5nQ29udHJvbCk7XG5cbiAgICBwdWJsaWMgZ2V0IGNvbnRyb2woKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmdDb250cm9sLmNvbnRyb2whO1xuICAgIH1cbn1cbiJdfQ==