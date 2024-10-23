import * as i0 from '@angular/core';
import { inject, Injectable, Directive, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { tuiTypedFromEvent } from '@taiga-ui/cdk/observables';
import { tuiInjectElement } from '@taiga-ui/cdk/utils/dom';
import { tuiIsPresent } from '@taiga-ui/cdk/utils/miscellaneous';
import { Observable, merge, pairwise, filter, map } from 'rxjs';
import { tuiCreateToken } from '@taiga-ui/cdk/utils';

const TUI_SWIPE_OPTIONS = tuiCreateToken({
    timeout: 500,
    threshold: 30,
});

class TuiSwipeService extends Observable {
    constructor() {
        const doc = inject(DOCUMENT);
        const el = tuiInjectElement();
        const { timeout, threshold } = inject(TUI_SWIPE_OPTIONS);
        super((subscriber) => merge(tuiTypedFromEvent(el, 'touchstart', { passive: true }), tuiTypedFromEvent(doc, 'touchend'))
            .pipe(pairwise(), filter(([first, second]) => !!first.touches.length &&
            first.touches[0]?.identifier ===
                second.changedTouches[0]?.identifier), map(([start, end]) => {
            const startX = start.touches[0]?.clientX ?? 0;
            const startY = start.touches[0]?.clientY ?? 0;
            const endX = end.changedTouches[0]?.clientX ?? 0;
            const endY = end.changedTouches[0]?.clientY ?? 0;
            const distanceX = startX - endX;
            const distanceY = startY - endY;
            const duration = end.timeStamp - start.timeStamp;
            if ((Math.abs(distanceX) > threshold ||
                Math.abs(distanceY) > threshold) &&
                duration < timeout) {
                return {
                    direction: tuiGetSwipeDirection(distanceX, distanceY),
                    events: [start, end],
                };
            }
            return null;
        }), filter(tuiIsPresent))
            .subscribe(subscriber));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiSwipeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiSwipeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiSwipeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
function tuiGetSwipeDirection(deltaX, deltaY) {
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return deltaY > 0 ? 'top' : 'bottom';
    }
    return deltaX > 0 ? 'left' : 'right';
}

class TuiSwipe {
    constructor() {
        this.tuiSwipe = inject(TuiSwipeService);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiSwipe, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiSwipe, isStandalone: true, selector: "[tuiSwipe]", outputs: { tuiSwipe: "tuiSwipe" }, providers: [TuiSwipeService], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiSwipe, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiSwipe]',
                    providers: [TuiSwipeService],
                }]
        }], propDecorators: { tuiSwipe: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TUI_SWIPE_OPTIONS, TuiSwipe, TuiSwipeService };
//# sourceMappingURL=taiga-ui-cdk-directives-swipe.mjs.map
