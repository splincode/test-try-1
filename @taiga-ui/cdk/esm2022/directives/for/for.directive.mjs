import { Directive, inject, Input, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
class TuiFor {
    constructor() {
        this.vcr = inject(ViewContainerRef);
        this.ngForOf = [];
    }
    ngOnChanges() {
        this.ref?.destroy();
        if (this.ngForOf?.length === 0 && this.ngForEmpty) {
            this.ref = this.vcr.createEmbeddedView(this.ngForEmpty);
        }
        else if (!this.ngForOf && this.ngForElse) {
            this.ref = this.vcr.createEmbeddedView(this.ngForElse);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFor, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiFor, isStandalone: true, selector: "[ngFor][ngForOf][ngForElse],[ngFor][ngForOf][ngForEmpty]", inputs: { ngForOf: "ngForOf", ngForElse: "ngForElse", ngForEmpty: "ngForEmpty" }, usesOnChanges: true, ngImport: i0 }); }
}
export { TuiFor };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFor, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[ngFor][ngForOf][ngForElse],[ngFor][ngForOf][ngForEmpty]',
                }]
        }], propDecorators: { ngForOf: [{
                type: Input
            }], ngForElse: [{
                type: Input
            }], ngForEmpty: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9kaXJlY3RpdmVzL2Zvci9mb3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFekUsTUFJYSxNQUFNO0lBSm5CO1FBS3FCLFFBQUcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUt6QyxZQUFPLEdBQThCLEVBQUUsQ0FBQztLQWlCbEQ7SUFUVSxXQUFXO1FBQ2QsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUVwQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQy9DLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDM0Q7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDOytHQXRCUSxNQUFNO21HQUFOLE1BQU07O1NBQU4sTUFBTTs0RkFBTixNQUFNO2tCQUpsQixTQUFTO21CQUFDO29CQUNQLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsMERBQTBEO2lCQUN2RTs4QkFPVSxPQUFPO3NCQURiLEtBQUs7Z0JBSUMsU0FBUztzQkFEZixLQUFLO2dCQUlDLFVBQVU7c0JBRGhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7RW1iZWRkZWRWaWV3UmVmLCBPbkNoYW5nZXMsIFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGlyZWN0aXZlLCBpbmplY3QsIElucHV0LCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ1tuZ0Zvcl1bbmdGb3JPZl1bbmdGb3JFbHNlXSxbbmdGb3JdW25nRm9yT2ZdW25nRm9yRW1wdHldJyxcbn0pXG5leHBvcnQgY2xhc3MgVHVpRm9yPFQsIEsgPSB1bmtub3duPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgcHJpdmF0ZSByZWFkb25seSB2Y3IgPSBpbmplY3QoVmlld0NvbnRhaW5lclJlZik7XG5cbiAgICBwcml2YXRlIHJlZj86IEVtYmVkZGVkVmlld1JlZjx1bmtub3duPjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG5nRm9yT2Y6IFRbXSB8IHJlYWRvbmx5IFRbXSB8IG51bGwgPSBbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG5nRm9yRWxzZT86IFRlbXBsYXRlUmVmPEs+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbmdGb3JFbXB0eT86IFRlbXBsYXRlUmVmPEs+O1xuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZj8uZGVzdHJveSgpO1xuXG4gICAgICAgIGlmICh0aGlzLm5nRm9yT2Y/Lmxlbmd0aCA9PT0gMCAmJiB0aGlzLm5nRm9yRW1wdHkpIHtcbiAgICAgICAgICAgIHRoaXMucmVmID0gdGhpcy52Y3IuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMubmdGb3JFbXB0eSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMubmdGb3JPZiAmJiB0aGlzLm5nRm9yRWxzZSkge1xuICAgICAgICAgICAgdGhpcy5yZWYgPSB0aGlzLnZjci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5uZ0ZvckVsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19