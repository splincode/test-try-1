import { DOCUMENT } from '@angular/common';
import { Directive, inject, NgZone, Output } from '@angular/core';
import { tuiZoneOptimized } from '@taiga-ui/cdk/observables';
import { tuiContainsOrAfter, tuiGetActualTarget, tuiInjectElement, } from '@taiga-ui/cdk/utils';
import { filter, fromEvent, map } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @deprecated use {@link TuiActiveZone} instead
 */
class TuiClickOutside {
    constructor() {
        this.zone = inject(NgZone);
        this.doc = inject(DOCUMENT);
        this.el = tuiInjectElement();
        this.tuiClickOutside = fromEvent(this.doc, 'mouseup').pipe(map(tuiGetActualTarget), filter((target) => this.isOutside(target)), tuiZoneOptimized(this.zone));
    }
    isOutside(target) {
        return target === this.el || !tuiContainsOrAfter(this.el, target);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiClickOutside, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiClickOutside, isStandalone: true, selector: "[tuiClickOutside]", outputs: { tuiClickOutside: "tuiClickOutside" }, ngImport: i0 }); }
}
export { TuiClickOutside };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiClickOutside, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiClickOutside]',
                }]
        }], propDecorators: { tuiClickOutside: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLGdCQUFnQixHQUNuQixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFFNUM7O0dBRUc7QUFDSCxNQUlhLGVBQWU7SUFKNUI7UUFLcUIsU0FBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixRQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLE9BQUUsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1FBR3pCLG9CQUFlLEdBQXdCLFNBQVMsQ0FDNUQsSUFBSSxDQUFDLEdBQUcsRUFDUixTQUFTLENBQ1osQ0FBQyxJQUFJLENBQ0YsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEVBQ3ZCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUMxQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQzlCLENBQUM7S0FLTDtJQUhXLFNBQVMsQ0FBQyxNQUFZO1FBQzFCLE9BQU8sTUFBTSxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RFLENBQUM7K0dBakJRLGVBQWU7bUdBQWYsZUFBZTs7U0FBZixlQUFlOzRGQUFmLGVBQWU7a0JBSjNCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxtQkFBbUI7aUJBQ2hDOzhCQU9tQixlQUFlO3NCQUQ5QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RGlyZWN0aXZlLCBpbmplY3QsIE5nWm9uZSwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHVpWm9uZU9wdGltaXplZH0gZnJvbSAnQHRhaWdhLXVpL2Nkay9vYnNlcnZhYmxlcyc7XG5pbXBvcnQge1xuICAgIHR1aUNvbnRhaW5zT3JBZnRlcixcbiAgICB0dWlHZXRBY3R1YWxUYXJnZXQsXG4gICAgdHVpSW5qZWN0RWxlbWVudCxcbn0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscyc7XG5pbXBvcnQgdHlwZSB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgZnJvbUV2ZW50LCBtYXB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgVHVpQWN0aXZlWm9uZX0gaW5zdGVhZFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHNlbGVjdG9yOiAnW3R1aUNsaWNrT3V0c2lkZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBUdWlDbGlja091dHNpZGUge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgem9uZSA9IGluamVjdChOZ1pvbmUpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZG9jID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVsID0gdHVpSW5qZWN0RWxlbWVudCgpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHR1aUNsaWNrT3V0c2lkZTogT2JzZXJ2YWJsZTx1bmtub3duPiA9IGZyb21FdmVudChcbiAgICAgICAgdGhpcy5kb2MsXG4gICAgICAgICdtb3VzZXVwJyxcbiAgICApLnBpcGUoXG4gICAgICAgIG1hcCh0dWlHZXRBY3R1YWxUYXJnZXQpLFxuICAgICAgICBmaWx0ZXIoKHRhcmdldCkgPT4gdGhpcy5pc091dHNpZGUodGFyZ2V0KSksXG4gICAgICAgIHR1aVpvbmVPcHRpbWl6ZWQodGhpcy56b25lKSxcbiAgICApO1xuXG4gICAgcHJpdmF0ZSBpc091dHNpZGUodGFyZ2V0OiBOb2RlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0YXJnZXQgPT09IHRoaXMuZWwgfHwgIXR1aUNvbnRhaW5zT3JBZnRlcih0aGlzLmVsLCB0YXJnZXQpO1xuICAgIH1cbn1cbiJdfQ==