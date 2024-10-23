import { __decorate } from "tslib";
import { Directive, inject, Input, NgZone, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { tuiZoneOptimized } from '@taiga-ui/cdk/observables';
import { TUI_ACTIVE_ELEMENT } from '@taiga-ui/cdk/tokens';
import { tuiArrayRemove, tuiInjectElement, tuiPure } from '@taiga-ui/cdk/utils';
import { distinctUntilChanged, map, skip, startWith, tap } from 'rxjs';
import * as i0 from "@angular/core";
class TuiActiveZone {
    constructor() {
        this.control = inject(NgControl, { self: true, optional: true });
        this.active$ = inject(TUI_ACTIVE_ELEMENT);
        this.zone = inject(NgZone);
        this.el = tuiInjectElement();
        this.tuiActiveZoneParent = null;
        this.subActiveZones = [];
        this.directParentActiveZone = inject(TuiActiveZone, {
            skipSelf: true,
            optional: true,
        });
        this.tuiActiveZoneChange = this.active$.pipe(map((element) => !!element && this.contains(element)), startWith(false), distinctUntilChanged(), skip(1), tap((active) => {
            if (!active && typeof this.control?.valueAccessor.onTouched === 'function') {
                this.control.valueAccessor.onTouched();
            }
        }), tuiZoneOptimized(this.zone));
        this.directParentActiveZone?.addSubActiveZone(this);
    }
    set tuiActiveZoneParentSetter(zone) {
        this.setZone(zone);
    }
    ngOnDestroy() {
        this.directParentActiveZone?.removeSubActiveZone(this);
        this.tuiActiveZoneParent?.removeSubActiveZone(this);
    }
    contains(node) {
        return (this.el.contains(node) ||
            this.subActiveZones.some((item, index, array) => array.indexOf(item) === index && item.contains(node)));
    }
    setZone(zone) {
        this.tuiActiveZoneParent?.removeSubActiveZone(this);
        zone?.addSubActiveZone(this);
        this.tuiActiveZoneParent = zone;
    }
    addSubActiveZone(activeZone) {
        this.subActiveZones = [...this.subActiveZones, activeZone];
    }
    removeSubActiveZone(activeZone) {
        this.subActiveZones = tuiArrayRemove(this.subActiveZones, this.subActiveZones.indexOf(activeZone));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiActiveZone, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiActiveZone, isStandalone: true, selector: "[tuiActiveZone]:not(ng-container), [tuiActiveZoneChange]:not(ng-container), [tuiActiveZoneParent]:not(ng-container)", inputs: { tuiActiveZoneParentSetter: ["tuiActiveZoneParent", "tuiActiveZoneParentSetter"] }, outputs: { tuiActiveZoneChange: "tuiActiveZoneChange" }, host: { listeners: { "document:mousedown.silent": "(0)" } }, exportAs: ["tuiActiveZone"], ngImport: i0 }); }
}
__decorate([
    tuiPure
], TuiActiveZone.prototype, "setZone", null);
export { TuiActiveZone };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiActiveZone, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiActiveZone]:not(ng-container), [tuiActiveZoneChange]:not(ng-container), [tuiActiveZoneParent]:not(ng-container)',
                    exportAs: 'tuiActiveZone',
                    host: {
                        '(document:mousedown.silent)': '(0)',
                    },
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { tuiActiveZoneChange: [{
                type: Output
            }], tuiActiveZoneParentSetter: [{
                type: Input,
                args: ['tuiActiveZoneParent']
            }], setZone: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXpvbmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2RrL2RpcmVjdGl2ZXMvYWN0aXZlLXpvbmUvYWN0aXZlLXpvbmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUU5RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUVyRSxNQVNhLGFBQWE7SUEwQnRCO1FBekJpQixZQUFPLEdBQVEsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDL0QsWUFBTyxHQUFHLE1BQU0sQ0FBNkIsa0JBQWtCLENBQUMsQ0FBQztRQUNqRSxTQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE9BQUUsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pDLHdCQUFtQixHQUF5QixJQUFJLENBQUM7UUFDakQsbUJBQWMsR0FBNkIsRUFBRSxDQUFDO1FBQ3JDLDJCQUFzQixHQUFHLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDNUQsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7UUFHYSx3QkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbkQsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFDckQsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUNoQixvQkFBb0IsRUFBRSxFQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtnQkFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDMUM7UUFDTCxDQUFDLENBQUMsRUFDRixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQzlCLENBQUM7UUFHRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELElBQ1cseUJBQXlCLENBQUMsSUFBMEI7UUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFVO1FBQ3RCLE9BQU8sQ0FDSCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3BCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUNuQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUMzRCxDQUNKLENBQUM7SUFDTixDQUFDO0lBR08sT0FBTyxDQUFDLElBQTBCO1FBQ3RDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsVUFBeUI7UUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sbUJBQW1CLENBQUMsVUFBeUI7UUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQ2hDLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUMxQyxDQUFDO0lBQ04sQ0FBQzsrR0FsRVEsYUFBYTttR0FBYixhQUFhOztBQW1EZDtJQURQLE9BQU87NENBS1A7U0F2RFEsYUFBYTs0RkFBYixhQUFhO2tCQVR6QixTQUFTO21CQUFDO29CQUNQLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQ0oscUhBQXFIO29CQUN6SCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsSUFBSSxFQUFFO3dCQUNGLDZCQUE2QixFQUFFLEtBQUs7cUJBQ3ZDO2lCQUNKOzBFQWNtQixtQkFBbUI7c0JBRGxDLE1BQU07Z0JBbUJJLHlCQUF5QjtzQkFEbkMsS0FBSzt1QkFBQyxxQkFBcUI7Z0JBcUJwQixPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge09uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RpcmVjdGl2ZSwgaW5qZWN0LCBJbnB1dCwgTmdab25lLCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7dHVpWm9uZU9wdGltaXplZH0gZnJvbSAnQHRhaWdhLXVpL2Nkay9vYnNlcnZhYmxlcyc7XG5pbXBvcnQge1RVSV9BQ1RJVkVfRUxFTUVOVH0gZnJvbSAnQHRhaWdhLXVpL2Nkay90b2tlbnMnO1xuaW1wb3J0IHt0dWlBcnJheVJlbW92ZSwgdHVpSW5qZWN0RWxlbWVudCwgdHVpUHVyZX0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscyc7XG5pbXBvcnQgdHlwZSB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHNraXAsIHN0YXJ0V2l0aCwgdGFwfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjpcbiAgICAgICAgJ1t0dWlBY3RpdmVab25lXTpub3QobmctY29udGFpbmVyKSwgW3R1aUFjdGl2ZVpvbmVDaGFuZ2VdOm5vdChuZy1jb250YWluZXIpLCBbdHVpQWN0aXZlWm9uZVBhcmVudF06bm90KG5nLWNvbnRhaW5lciknLFxuICAgIGV4cG9ydEFzOiAndHVpQWN0aXZlWm9uZScsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGRvY3VtZW50Om1vdXNlZG93bi5zaWxlbnQpJzogJygwKScsXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgVHVpQWN0aXZlWm9uZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb250cm9sOiBhbnkgPSBpbmplY3QoTmdDb250cm9sLCB7c2VsZjogdHJ1ZSwgb3B0aW9uYWw6IHRydWV9KTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFjdGl2ZSQgPSBpbmplY3Q8T2JzZXJ2YWJsZTxFbGVtZW50IHwgbnVsbD4+KFRVSV9BQ1RJVkVfRUxFTUVOVCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSB6b25lID0gaW5qZWN0KE5nWm9uZSk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBlbCA9IHR1aUluamVjdEVsZW1lbnQoKTtcbiAgICBwcml2YXRlIHR1aUFjdGl2ZVpvbmVQYXJlbnQ6IFR1aUFjdGl2ZVpvbmUgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIHN1YkFjdGl2ZVpvbmVzOiByZWFkb25seSBUdWlBY3RpdmVab25lW10gPSBbXTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRpcmVjdFBhcmVudEFjdGl2ZVpvbmUgPSBpbmplY3QoVHVpQWN0aXZlWm9uZSwge1xuICAgICAgICBza2lwU2VsZjogdHJ1ZSxcbiAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgfSk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgdHVpQWN0aXZlWm9uZUNoYW5nZSA9IHRoaXMuYWN0aXZlJC5waXBlKFxuICAgICAgICBtYXAoKGVsZW1lbnQpID0+ICEhZWxlbWVudCAmJiB0aGlzLmNvbnRhaW5zKGVsZW1lbnQpKSxcbiAgICAgICAgc3RhcnRXaXRoKGZhbHNlKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgc2tpcCgxKSxcbiAgICAgICAgdGFwKChhY3RpdmUpID0+IHtcbiAgICAgICAgICAgIGlmICghYWN0aXZlICYmIHR5cGVvZiB0aGlzLmNvbnRyb2w/LnZhbHVlQWNjZXNzb3Iub25Ub3VjaGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sLnZhbHVlQWNjZXNzb3Iub25Ub3VjaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICB0dWlab25lT3B0aW1pemVkKHRoaXMuem9uZSksXG4gICAgKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRpcmVjdFBhcmVudEFjdGl2ZVpvbmU/LmFkZFN1YkFjdGl2ZVpvbmUodGhpcyk7XG4gICAgfVxuXG4gICAgQElucHV0KCd0dWlBY3RpdmVab25lUGFyZW50JylcbiAgICBwdWJsaWMgc2V0IHR1aUFjdGl2ZVpvbmVQYXJlbnRTZXR0ZXIoem9uZTogVHVpQWN0aXZlWm9uZSB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRab25lKHpvbmUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXJlY3RQYXJlbnRBY3RpdmVab25lPy5yZW1vdmVTdWJBY3RpdmVab25lKHRoaXMpO1xuICAgICAgICB0aGlzLnR1aUFjdGl2ZVpvbmVQYXJlbnQ/LnJlbW92ZVN1YkFjdGl2ZVpvbmUodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbnRhaW5zKG5vZGU6IE5vZGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuZWwuY29udGFpbnMobm9kZSkgfHxcbiAgICAgICAgICAgIHRoaXMuc3ViQWN0aXZlWm9uZXMuc29tZShcbiAgICAgICAgICAgICAgICAoaXRlbSwgaW5kZXgsIGFycmF5KSA9PlxuICAgICAgICAgICAgICAgICAgICBhcnJheS5pbmRleE9mKGl0ZW0pID09PSBpbmRleCAmJiBpdGVtLmNvbnRhaW5zKG5vZGUpLFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIEB0dWlQdXJlXG4gICAgcHJpdmF0ZSBzZXRab25lKHpvbmU6IFR1aUFjdGl2ZVpvbmUgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHVpQWN0aXZlWm9uZVBhcmVudD8ucmVtb3ZlU3ViQWN0aXZlWm9uZSh0aGlzKTtcbiAgICAgICAgem9uZT8uYWRkU3ViQWN0aXZlWm9uZSh0aGlzKTtcbiAgICAgICAgdGhpcy50dWlBY3RpdmVab25lUGFyZW50ID0gem9uZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFN1YkFjdGl2ZVpvbmUoYWN0aXZlWm9uZTogVHVpQWN0aXZlWm9uZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1YkFjdGl2ZVpvbmVzID0gWy4uLnRoaXMuc3ViQWN0aXZlWm9uZXMsIGFjdGl2ZVpvbmVdO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlU3ViQWN0aXZlWm9uZShhY3RpdmVab25lOiBUdWlBY3RpdmVab25lKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3ViQWN0aXZlWm9uZXMgPSB0dWlBcnJheVJlbW92ZShcbiAgICAgICAgICAgIHRoaXMuc3ViQWN0aXZlWm9uZXMsXG4gICAgICAgICAgICB0aGlzLnN1YkFjdGl2ZVpvbmVzLmluZGV4T2YoYWN0aXZlWm9uZSksXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19