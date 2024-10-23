import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DestroyRef, Directive, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';
import { TUI_AUTOFOCUS_HANDLER, TUI_AUTOFOCUS_OPTIONS, TUI_AUTOFOCUS_PROVIDERS, } from './autofocus.options';
import * as i0 from "@angular/core";
class TuiAutoFocus {
    constructor() {
        this.handler = inject(TUI_AUTOFOCUS_HANDLER);
        this.options = inject(TUI_AUTOFOCUS_OPTIONS);
        this.destroyRef = inject(DestroyRef);
    }
    ngAfterViewInit() {
        if (this.autoFocus) {
            this.focus();
        }
    }
    focus() {
        if (Number.isNaN(this.options.delay)) {
            void Promise.resolve().then(() => this.handler.setFocus());
        }
        else {
            timer(this.options.delay)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.handler.setFocus());
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiAutoFocus, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "16.2.12", type: TuiAutoFocus, isStandalone: true, selector: "[tuiAutoFocus]", inputs: { autoFocus: ["tuiAutoFocus", "autoFocus", coerceBooleanProperty] }, providers: TUI_AUTOFOCUS_PROVIDERS, ngImport: i0 }); }
}
export { TuiAutoFocus };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiAutoFocus, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiAutoFocus]',
                    providers: TUI_AUTOFOCUS_PROVIDERS,
                }]
        }], propDecorators: { autoFocus: [{
                type: Input,
                args: [{
                        alias: 'tuiAutoFocus',
                        transform: coerceBooleanProperty,
                    }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2ZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9kaXJlY3RpdmVzL2F1dG8tZm9jdXMvYXV0b2ZvY3VzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUU1RCxPQUFPLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFM0IsT0FBTyxFQUNILHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsdUJBQXVCLEdBQzFCLE1BQU0scUJBQXFCLENBQUM7O0FBRTdCLE1BS2EsWUFBWTtJQUx6QjtRQU1xQixZQUFPLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEMsWUFBTyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3hDLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0F1QnBEO0lBZlUsZUFBZTtRQUNsQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQyxLQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzlEO2FBQU07WUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7aUJBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3pDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDOytHQXpCUSxZQUFZO21HQUFaLFlBQVkscUdBT04scUJBQXFCLGdCQVR6Qix1QkFBdUI7O1NBRXpCLFlBQVk7NEZBQVosWUFBWTtrQkFMeEIsU0FBUzttQkFBQztvQkFDUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsU0FBUyxFQUFFLHVCQUF1QjtpQkFDckM7OEJBVVUsU0FBUztzQkFKZixLQUFLO3VCQUFDO3dCQUNILEtBQUssRUFBRSxjQUFjO3dCQUNyQixTQUFTLEVBQUUscUJBQXFCO3FCQUNuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtCb29sZWFuSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB0eXBlIHtBZnRlclZpZXdJbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGVzdHJveVJlZiwgRGlyZWN0aXZlLCBpbmplY3QsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dGFrZVVudGlsRGVzdHJveWVkfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge3RpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgICBUVUlfQVVUT0ZPQ1VTX0hBTkRMRVIsXG4gICAgVFVJX0FVVE9GT0NVU19PUFRJT05TLFxuICAgIFRVSV9BVVRPRk9DVVNfUFJPVklERVJTLFxufSBmcm9tICcuL2F1dG9mb2N1cy5vcHRpb25zJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ1t0dWlBdXRvRm9jdXNdJyxcbiAgICBwcm92aWRlcnM6IFRVSV9BVVRPRk9DVVNfUFJPVklERVJTLFxufSlcbmV4cG9ydCBjbGFzcyBUdWlBdXRvRm9jdXMgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGhhbmRsZXIgPSBpbmplY3QoVFVJX0FVVE9GT0NVU19IQU5ETEVSKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnMgPSBpbmplY3QoVFVJX0FVVE9GT0NVU19PUFRJT05TKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG5cbiAgICBASW5wdXQoe1xuICAgICAgICBhbGlhczogJ3R1aUF1dG9Gb2N1cycsXG4gICAgICAgIHRyYW5zZm9ybTogY29lcmNlQm9vbGVhblByb3BlcnR5LFxuICAgIH0pXG4gICAgcHVibGljIGF1dG9Gb2N1czogQm9vbGVhbklucHV0O1xuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b0ZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5vcHRpb25zLmRlbGF5KSkge1xuICAgICAgICAgICAgdm9pZCBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMuaGFuZGxlci5zZXRGb2N1cygpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpbWVyKHRoaXMub3B0aW9ucy5kZWxheSlcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGFuZGxlci5zZXRGb2N1cygpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==