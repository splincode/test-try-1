import { Directive, inject, Input, Output } from '@angular/core';
import { TuiActiveZone } from '@taiga-ui/cdk/directives/active-zone';
import { tuiIfMap } from '@taiga-ui/cdk/observables';
import { map, Subject } from 'rxjs';
import { TuiObscuredService } from './obscured.service';
import * as i0 from "@angular/core";
/**
 * Directive that monitors element visibility
 */
class TuiObscured {
    constructor() {
        this.activeZone = inject(TuiActiveZone, { optional: true });
        this.enabled$ = new Subject();
        this.obscured$ = inject(TuiObscuredService, { self: true }).pipe(map((by) => !!by?.every((el) => !this.activeZone?.contains(el))));
        this.tuiObscured = this.enabled$.pipe(tuiIfMap(() => this.obscured$));
    }
    set tuiObscuredEnabled(enabled) {
        this.enabled$.next(enabled);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiObscured, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiObscured, isStandalone: true, selector: "[tuiObscured]", inputs: { tuiObscuredEnabled: "tuiObscuredEnabled" }, outputs: { tuiObscured: "tuiObscured" }, providers: [TuiObscuredService], ngImport: i0 }); }
}
export { TuiObscured };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiObscured, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiObscured]',
                    providers: [TuiObscuredService],
                }]
        }], propDecorators: { tuiObscured: [{
                type: Output
            }], tuiObscuredEnabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzY3VyZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2RrL2RpcmVjdGl2ZXMvb2JzY3VyZWQvb2JzY3VyZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFdEQ7O0dBRUc7QUFDSCxNQUthLFdBQVc7SUFMeEI7UUFNcUIsZUFBVSxHQUFHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNyRCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUNsQyxjQUFTLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsSUFBSSxDQUN0RSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDbkUsQ0FBQztRQUdjLGdCQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0tBTXBGO0lBSkcsSUFDVyxrQkFBa0IsQ0FBQyxPQUFnQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDOytHQWJRLFdBQVc7bUdBQVgsV0FBVywySkFGVCxDQUFDLGtCQUFrQixDQUFDOztTQUV0QixXQUFXOzRGQUFYLFdBQVc7a0JBTHZCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDbEM7OEJBU21CLFdBQVc7c0JBRDFCLE1BQU07Z0JBSUksa0JBQWtCO3NCQUQ1QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIGluamVjdCwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1R1aUFjdGl2ZVpvbmV9IGZyb20gJ0B0YWlnYS11aS9jZGsvZGlyZWN0aXZlcy9hY3RpdmUtem9uZSc7XG5pbXBvcnQge3R1aUlmTWFwfSBmcm9tICdAdGFpZ2EtdWkvY2RrL29ic2VydmFibGVzJztcbmltcG9ydCB7bWFwLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtUdWlPYnNjdXJlZFNlcnZpY2V9IGZyb20gJy4vb2JzY3VyZWQuc2VydmljZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgbW9uaXRvcnMgZWxlbWVudCB2aXNpYmlsaXR5XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgc2VsZWN0b3I6ICdbdHVpT2JzY3VyZWRdJyxcbiAgICBwcm92aWRlcnM6IFtUdWlPYnNjdXJlZFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBUdWlPYnNjdXJlZCB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBhY3RpdmVab25lID0gaW5qZWN0KFR1aUFjdGl2ZVpvbmUsIHtvcHRpb25hbDogdHJ1ZX0pO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZW5hYmxlZCQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb2JzY3VyZWQkID0gaW5qZWN0KFR1aU9ic2N1cmVkU2VydmljZSwge3NlbGY6IHRydWV9KS5waXBlKFxuICAgICAgICBtYXAoKGJ5KSA9PiAhIWJ5Py5ldmVyeSgoZWwpID0+ICF0aGlzLmFjdGl2ZVpvbmU/LmNvbnRhaW5zKGVsKSkpLFxuICAgICk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgdHVpT2JzY3VyZWQgPSB0aGlzLmVuYWJsZWQkLnBpcGUodHVpSWZNYXAoKCkgPT4gdGhpcy5vYnNjdXJlZCQpKTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCB0dWlPYnNjdXJlZEVuYWJsZWQoZW5hYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmVuYWJsZWQkLm5leHQoZW5hYmxlZCk7XG4gICAgfVxufVxuIl19