import * as i0 from '@angular/core';
import { inject, Injectable, Directive } from '@angular/core';
import { tuiTypedFromEvent, tuiPreventDefault } from '@taiga-ui/cdk/observables';
import { tuiCreateToken, tuiInjectElement, tuiDistanceBetweenTouches } from '@taiga-ui/cdk/utils';
import { Observable, merge, filter, switchMap, scan, map, takeUntil } from 'rxjs';

/**
 * Zoom options
 */
const TUI_ZOOM_OPTIONS = tuiCreateToken({
    wheelSensitivity: 0.01,
});

const TOUCH_SENSITIVITY = 0.01;
class TuiZoomService extends Observable {
    constructor() {
        const el = tuiInjectElement();
        const { wheelSensitivity } = inject(TUI_ZOOM_OPTIONS);
        super((subscriber) => merge(tuiTypedFromEvent(el, 'touchstart', { passive: true }).pipe(filter(({ touches }) => touches.length > 1), switchMap((startEvent) => tuiTypedFromEvent(el, 'touchmove', { passive: true }).pipe(tuiPreventDefault(), scan((prev, event) => {
            const distance = tuiDistanceBetweenTouches(event);
            return {
                event,
                distance,
                delta: (distance - prev.distance) *
                    TOUCH_SENSITIVITY,
            };
        }, {
            event: startEvent,
            distance: tuiDistanceBetweenTouches(startEvent),
            delta: 0,
        }), map(({ event, delta }) => {
            const clientX = ((event.touches[0]?.clientX ?? 0) +
                (event.touches[1]?.clientX ?? 0)) /
                2;
            const clientY = ((event.touches[0]?.clientY ?? 0) +
                (event.touches[1]?.clientY ?? 0)) /
                2;
            return { clientX, clientY, delta, event };
        }), takeUntil(tuiTypedFromEvent(el, 'touchend'))))), tuiTypedFromEvent(el, 'wheel', { passive: false }).pipe(tuiPreventDefault(), map((wheel) => ({
            clientX: wheel.clientX,
            clientY: wheel.clientY,
            delta: -wheel.deltaY * wheelSensitivity,
            event: wheel,
        })))).subscribe(subscriber));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiZoomService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiZoomService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiZoomService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class TuiZoom {
    constructor() {
        this.tuiZoom = inject(TuiZoomService);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiZoom, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiZoom, isStandalone: true, selector: "[tuiZoom]", outputs: { tuiZoom: "tuiZoom" }, host: { properties: { "style.touch-action": "\"none\"" } }, providers: [TuiZoomService], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiZoom, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiZoom]',
                    outputs: ['tuiZoom'],
                    providers: [TuiZoomService],
                    host: {
                        '[style.touch-action]': '"none"',
                    },
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TUI_ZOOM_OPTIONS, TuiZoom, TuiZoomService };
//# sourceMappingURL=taiga-ui-cdk-directives-zoom.mjs.map
