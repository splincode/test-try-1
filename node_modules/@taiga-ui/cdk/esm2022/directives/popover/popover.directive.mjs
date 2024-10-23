import { Directive, inject } from '@angular/core';
import { tuiIfMap } from '@taiga-ui/cdk/observables';
import { TuiPopoverService } from '@taiga-ui/cdk/services';
import { PolymorpheusTemplate } from '@taiga-ui/polymorpheus';
import { distinctUntilChanged, endWith, ignoreElements, share, Subject } from 'rxjs';
import * as i0 from "@angular/core";
class TuiPopoverDirective extends PolymorpheusTemplate {
    constructor() {
        super(...arguments);
        this.service = inject((TuiPopoverService));
        this.open$ = new Subject();
        this.options = {};
        this.open = false;
        this.openChange = this.open$.pipe(distinctUntilChanged(), tuiIfMap(() => this.service.open(this, this.options).pipe(ignoreElements(), endWith(false))), share());
    }
    ngOnChanges() {
        this.open$.next(this.open);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPopoverDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPopoverDirective, usesInheritance: true, usesOnChanges: true, ngImport: i0 }); }
}
export { TuiPopoverDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPopoverDirective, decorators: [{
            type: Directive
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvZGlyZWN0aXZlcy9wb3BvdmVyL3BvcG92ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVuRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUVuRixNQUNzQixtQkFDbEIsU0FBUSxvQkFBeUM7SUFGckQ7O1FBS3FCLFlBQU8sR0FBRyxNQUFNLENBQUMsQ0FBQSxpQkFBb0IsQ0FBQSxDQUFDLENBQUM7UUFDdkMsVUFBSyxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFFdEMsWUFBTyxHQUFlLEVBQUUsQ0FBQztRQUN6QixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBRUosZUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUMzQyxvQkFBb0IsRUFBRSxFQUN0QixRQUFRLENBQUMsR0FBRyxFQUFFLENBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQy9FLEVBQ0QsS0FBSyxFQUFFLENBQ1YsQ0FBQztLQUtMO0lBSFUsV0FBVztRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDOytHQXBCaUIsbUJBQW1CO21HQUFuQixtQkFBbUI7O1NBQW5CLG1CQUFtQjs0RkFBbkIsbUJBQW1CO2tCQUR4QyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge09uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RpcmVjdGl2ZSwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHVpSWZNYXB9IGZyb20gJ0B0YWlnYS11aS9jZGsvb2JzZXJ2YWJsZXMnO1xuaW1wb3J0IHR5cGUge1R1aVBvcG92ZXJ9IGZyb20gJ0B0YWlnYS11aS9jZGsvc2VydmljZXMnO1xuaW1wb3J0IHtUdWlQb3BvdmVyU2VydmljZX0gZnJvbSAnQHRhaWdhLXVpL2Nkay9zZXJ2aWNlcyc7XG5pbXBvcnQge1BvbHltb3JwaGV1c1RlbXBsYXRlfSBmcm9tICdAdGFpZ2EtdWkvcG9seW1vcnBoZXVzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIGVuZFdpdGgsIGlnbm9yZUVsZW1lbnRzLCBzaGFyZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFR1aVBvcG92ZXJEaXJlY3RpdmU8VD5cbiAgICBleHRlbmRzIFBvbHltb3JwaGV1c1RlbXBsYXRlPFR1aVBvcG92ZXI8VCwgdm9pZD4+XG4gICAgaW1wbGVtZW50cyBPbkNoYW5nZXNcbntcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlcnZpY2UgPSBpbmplY3QoVHVpUG9wb3ZlclNlcnZpY2U8VD4pO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb3BlbiQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgcHJvdGVjdGVkIG9wdGlvbnM6IFBhcnRpYWw8VD4gPSB7fTtcbiAgICBwcm90ZWN0ZWQgb3BlbiA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IG9wZW5DaGFuZ2UgPSB0aGlzLm9wZW4kLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHR1aUlmTWFwKCgpID0+XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uub3Blbih0aGlzLCB0aGlzLm9wdGlvbnMpLnBpcGUoaWdub3JlRWxlbWVudHMoKSwgZW5kV2l0aChmYWxzZSkpLFxuICAgICAgICApLFxuICAgICAgICBzaGFyZSgpLFxuICAgICk7XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbiQubmV4dCh0aGlzLm9wZW4pO1xuICAgIH1cbn1cbiJdfQ==