/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
import { Directive, inject, Injectable, INJECTOR, ViewChild, ViewContainerRef, } from '@angular/core';
import { tuiProvide } from '@taiga-ui/cdk/utils';
import * as i0 from "@angular/core";
/**
 * Abstract class for host element for dynamically created portals.
 */
class TuiPortals {
    constructor() {
        this.injector = inject(INJECTOR);
        this.nothing = inject(TuiPortalService).attach(this);
    }
    addComponentChild(component) {
        const injector = component.createInjector(this.injector);
        const ref = this.vcr.createComponent(component.component, { injector });
        ref.changeDetectorRef.detectChanges();
        return ref;
    }
    addTemplateChild(templateRef, context) {
        return this.vcr.createEmbeddedView(templateRef, context);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPortals, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPortals, viewQueries: [{ propertyName: "vcr", first: true, predicate: ["viewContainer"], descendants: true, read: ViewContainerRef }], ngImport: i0 }); }
}
export { TuiPortals };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPortals, decorators: [{
            type: Directive
        }], propDecorators: { vcr: [{
                type: ViewChild,
                args: ['viewContainer', { read: ViewContainerRef }]
            }] } });
/**
 * Abstract service for displaying portals
 */
class TuiPortalService {
    attach(host) {
        this.host = host;
    }
    add(component) {
        return this.safeHost.addComponentChild(component);
    }
    remove({ hostView }) {
        if (!hostView.destroyed) {
            hostView.destroy();
        }
    }
    addTemplate(templateRef, context) {
        return this.safeHost.addTemplateChild(templateRef, context);
    }
    removeTemplate(viewRef) {
        if (!viewRef.destroyed) {
            viewRef.destroy();
        }
    }
    get safeHost() {
        if (!this.host) {
            throw new TuiNoHostException();
        }
        return this.host;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPortalService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPortalService }); }
}
export { TuiPortalService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPortalService, decorators: [{
            type: Injectable
        }] });
export function tuiAsPortal(portal) {
    return tuiProvide(TuiPortalService, portal);
}
export class TuiNoHostException extends Error {
    constructor() {
        super(ngDevMode ? 'Portals cannot be used without TuiPortalHostComponent' : '');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9jbGFzc2VzL3BvcnRhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0RBQXdEO0FBRXhELE9BQU8sRUFDSCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFVBQVUsRUFDVixRQUFRLEVBQ1IsU0FBUyxFQUNULGdCQUFnQixHQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBRy9DOztHQUVHO0FBQ0gsTUFDc0IsVUFBVTtJQURoQztRQUtxQixhQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTFCLFlBQU8sR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FpQnRFO0lBZlUsaUJBQWlCLENBQUksU0FBbUM7UUFDM0QsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFFdEUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXRDLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLGdCQUFnQixDQUNuQixXQUEyQixFQUMzQixPQUFXO1FBRVgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RCxDQUFDOytHQXRCaUIsVUFBVTttR0FBVixVQUFVLDJHQUNPLGdCQUFnQjs7U0FEakMsVUFBVTs0RkFBVixVQUFVO2tCQUQvQixTQUFTOzhCQUdXLEdBQUc7c0JBRG5CLFNBQVM7dUJBQUMsZUFBZSxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDOztBQXdCeEQ7O0dBRUc7QUFDSCxNQUNzQixnQkFBZ0I7SUFHM0IsTUFBTSxDQUFDLElBQWdCO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxHQUFHLENBQUksU0FBbUM7UUFDN0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxNQUFNLENBQUksRUFBQyxRQUFRLEVBQWtCO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFTSxXQUFXLENBQUksV0FBMkIsRUFBRSxPQUFXO1FBQzFELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVNLGNBQWMsQ0FBSSxPQUEyQjtRQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNwQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsSUFBYyxRQUFRO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1osTUFBTSxJQUFJLGtCQUFrQixFQUFFLENBQUM7U0FDbEM7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQzsrR0FqQ2lCLGdCQUFnQjttSEFBaEIsZ0JBQWdCOztTQUFoQixnQkFBZ0I7NEZBQWhCLGdCQUFnQjtrQkFEckMsVUFBVTs7QUFxQ1gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUErQjtJQUN2RCxPQUFPLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsTUFBTSxPQUFPLGtCQUFtQixTQUFRLEtBQUs7SUFDekM7UUFDSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEYsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJAdGFpZ2EtdWkvdHNjb25maWcvbmctZGV2LW1vZGVcIiAvPlxuaW1wb3J0IHR5cGUge0NvbXBvbmVudFJlZiwgRW1iZWRkZWRWaWV3UmVmLCBQcm92aWRlciwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgaW5qZWN0LFxuICAgIEluamVjdGFibGUsXG4gICAgSU5KRUNUT1IsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0dWlQcm92aWRlfSBmcm9tICdAdGFpZ2EtdWkvY2RrL3V0aWxzJztcbmltcG9ydCB0eXBlIHtQb2x5bW9ycGhldXNDb21wb25lbnR9IGZyb20gJ0B0YWlnYS11aS9wb2x5bW9ycGhldXMnO1xuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZvciBob3N0IGVsZW1lbnQgZm9yIGR5bmFtaWNhbGx5IGNyZWF0ZWQgcG9ydGFscy5cbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHVpUG9ydGFscyB7XG4gICAgQFZpZXdDaGlsZCgndmlld0NvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSlcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZjciE6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGluamVjdG9yID0gaW5qZWN0KElOSkVDVE9SKTtcblxuICAgIHByb3RlY3RlZCByZWFkb25seSBub3RoaW5nID0gaW5qZWN0KFR1aVBvcnRhbFNlcnZpY2UpLmF0dGFjaCh0aGlzKTtcblxuICAgIHB1YmxpYyBhZGRDb21wb25lbnRDaGlsZDxDPihjb21wb25lbnQ6IFBvbHltb3JwaGV1c0NvbXBvbmVudDxDPik6IENvbXBvbmVudFJlZjxDPiB7XG4gICAgICAgIGNvbnN0IGluamVjdG9yID0gY29tcG9uZW50LmNyZWF0ZUluamVjdG9yKHRoaXMuaW5qZWN0b3IpO1xuICAgICAgICBjb25zdCByZWYgPSB0aGlzLnZjci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50LmNvbXBvbmVudCwge2luamVjdG9yfSk7XG5cbiAgICAgICAgcmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICByZXR1cm4gcmVmO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRUZW1wbGF0ZUNoaWxkPEM+KFxuICAgICAgICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8Qz4sXG4gICAgICAgIGNvbnRleHQ/OiBDLFxuICAgICk6IEVtYmVkZGVkVmlld1JlZjxDPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZjci5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWYsIGNvbnRleHQpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBzZXJ2aWNlIGZvciBkaXNwbGF5aW5nIHBvcnRhbHNcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFR1aVBvcnRhbFNlcnZpY2Uge1xuICAgIHByb3RlY3RlZCBob3N0PzogVHVpUG9ydGFscztcblxuICAgIHB1YmxpYyBhdHRhY2goaG9zdDogVHVpUG9ydGFscyk6IHZvaWQge1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGQ8Qz4oY29tcG9uZW50OiBQb2x5bW9ycGhldXNDb21wb25lbnQ8Qz4pOiBDb21wb25lbnRSZWY8Qz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zYWZlSG9zdC5hZGRDb21wb25lbnRDaGlsZChjb21wb25lbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmU8Qz4oe2hvc3RWaWV3fTogQ29tcG9uZW50UmVmPEM+KTogdm9pZCB7XG4gICAgICAgIGlmICghaG9zdFZpZXcuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICBob3N0Vmlldy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkVGVtcGxhdGU8Qz4odGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPEM+LCBjb250ZXh0PzogQyk6IEVtYmVkZGVkVmlld1JlZjxDPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNhZmVIb3N0LmFkZFRlbXBsYXRlQ2hpbGQodGVtcGxhdGVSZWYsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVUZW1wbGF0ZTxDPih2aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8Qz4pOiB2b2lkIHtcbiAgICAgICAgaWYgKCF2aWV3UmVmLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgdmlld1JlZi5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHNhZmVIb3N0KCk6IFR1aVBvcnRhbHMge1xuICAgICAgICBpZiAoIXRoaXMuaG9zdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR1aU5vSG9zdEV4Y2VwdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaG9zdDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0dWlBc1BvcnRhbChwb3J0YWw6IHR5cGVvZiBUdWlQb3J0YWxTZXJ2aWNlKTogUHJvdmlkZXIge1xuICAgIHJldHVybiB0dWlQcm92aWRlKFR1aVBvcnRhbFNlcnZpY2UsIHBvcnRhbCk7XG59XG5cbmV4cG9ydCBjbGFzcyBUdWlOb0hvc3RFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKG5nRGV2TW9kZSA/ICdQb3J0YWxzIGNhbm5vdCBiZSB1c2VkIHdpdGhvdXQgVHVpUG9ydGFsSG9zdENvbXBvbmVudCcgOiAnJyk7XG4gICAgfVxufVxuIl19