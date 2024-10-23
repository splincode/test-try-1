import { Pipe } from '@angular/core';
import { tuiClamp } from '@taiga-ui/cdk/utils';
import * as i0 from "@angular/core";
class TuiRepeatTimesPipe {
    transform(n) {
        return Array.from({ length: tuiClamp(n, 0, n) }, (_, i) => i);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiRepeatTimesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiRepeatTimesPipe, isStandalone: true, name: "tuiRepeatTimes" }); }
}
export { TuiRepeatTimesPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiRepeatTimesPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiRepeatTimes',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvcGlwZXMvcmVwZWF0LXRpbWVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHFCQUFxQixDQUFDOztBQUU3QyxNQUlhLGtCQUFrQjtJQUNwQixTQUFTLENBQUMsQ0FBUztRQUN0QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7K0dBSFEsa0JBQWtCOzZHQUFsQixrQkFBa0I7O1NBQWxCLGtCQUFrQjs0RkFBbEIsa0JBQWtCO2tCQUo5QixJQUFJO21CQUFDO29CQUNGLFVBQVUsRUFBRSxJQUFJO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3R1aUNsYW1wfSBmcm9tICdAdGFpZ2EtdWkvY2RrL3V0aWxzJztcblxuQFBpcGUoe1xuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgbmFtZTogJ3R1aVJlcGVhdFRpbWVzJyxcbn0pXG5leHBvcnQgY2xhc3MgVHVpUmVwZWF0VGltZXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgcHVibGljIHRyYW5zZm9ybShuOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHtsZW5ndGg6IHR1aUNsYW1wKG4sIDAsIG4pfSwgKF8sIGkpID0+IGkpO1xuICAgIH1cbn1cbiJdfQ==