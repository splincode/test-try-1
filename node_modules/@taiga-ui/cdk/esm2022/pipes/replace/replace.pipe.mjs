import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
class TuiReplacePipe {
    transform(value, search, replaceValue) {
        return (value?.replace(search, 
        // TS bug: https://github.com/microsoft/TypeScript/issues/22378
        replaceValue) ?? '');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiReplacePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TuiReplacePipe, isStandalone: true, name: "tuiReplace" }); }
}
export { TuiReplacePipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiReplacePipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'tuiReplace',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2RrL3BpcGVzL3JlcGxhY2UvcmVwbGFjZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRW5DLE1BSWEsY0FBYztJQUNoQixTQUFTLENBQ1osS0FBZ0MsRUFDaEMsTUFBdUIsRUFDdkIsWUFBMEU7UUFFMUUsT0FBTyxDQUNILEtBQUssRUFBRSxPQUFPLENBQ1YsTUFBTTtRQUNOLCtEQUErRDtRQUMvRCxZQUFpQyxDQUNwQyxJQUFJLEVBQUUsQ0FDVixDQUFDO0lBQ04sQ0FBQzsrR0FiUSxjQUFjOzZHQUFkLGNBQWM7O1NBQWQsY0FBYzs0RkFBZCxjQUFjO2tCQUoxQixJQUFJO21CQUFDO29CQUNGLFVBQVUsRUFBRSxJQUFJO29CQUNoQixJQUFJLEVBQUUsWUFBWTtpQkFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7UGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBuYW1lOiAndHVpUmVwbGFjZScsXG59KVxuZXhwb3J0IGNsYXNzIFR1aVJlcGxhY2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgcHVibGljIHRyYW5zZm9ybShcbiAgICAgICAgdmFsdWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgICAgIHNlYXJjaDogUmVnRXhwIHwgc3RyaW5nLFxuICAgICAgICByZXBsYWNlVmFsdWU6IHN0cmluZyB8ICgoc3Vic3RyaW5nOiBzdHJpbmcsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gc3RyaW5nKSxcbiAgICApOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdmFsdWU/LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgc2VhcmNoLFxuICAgICAgICAgICAgICAgIC8vIFRTIGJ1ZzogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8yMjM3OFxuICAgICAgICAgICAgICAgIHJlcGxhY2VWYWx1ZSBhcyB1bmtub3duIGFzIHN0cmluZyxcbiAgICAgICAgICAgICkgPz8gJydcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=