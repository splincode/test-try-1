import * as i0 from '@angular/core';
import { Injectable, inject, NgZone } from '@angular/core';
import { tuiProvide, tuiCreateTokenFromFactory } from '@taiga-ui/cdk/utils';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { Observable, of, defer, switchMap, map, takeUntil, timer, endWith, tap } from 'rxjs';
import { WA_PERFORMANCE, WA_ANIMATION_FRAME } from '@ng-web-apis/common';
import { tuiZonefreeScheduler } from '@taiga-ui/cdk/observables';
import { tuiClamp } from '@taiga-ui/cdk/utils/math';
import { tuiEaseInOutQuad } from '@taiga-ui/cdk/utils/miscellaneous';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';

class TuiIdService {
    static { this.autoId = 0; }
    generate() {
        return `tui_${TuiIdService.autoId++}${Date.now()}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIdService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIdService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIdService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
function tuiInjectId() {
    return inject(TuiIdService).generate();
}

class TuiPopoverService {
    constructor(items, component, options = {}) {
        this.options = options;
        this.id = inject(TuiIdService);
        this.component = new PolymorpheusComponent(component);
        this.items$ = inject(items);
    }
    open(content, options = {}) {
        return new Observable((observer) => {
            const item = {
                ...this.options,
                ...options,
                content,
                $implicit: observer,
                component: this.component,
                createdAt: Date.now(),
                id: this.id.generate(),
                completeWith: (result) => {
                    observer.next(result);
                    observer.complete();
                },
            };
            this.items$.next([...this.items$.value, item]);
            return () => {
                this.items$.next(this.items$.value.filter((value) => value !== item));
            };
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPopoverService, deps: "invalid", target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPopoverService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPopoverService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined }, { type: undefined }, { type: undefined }]; } });
function tuiAsPopover(popover) {
    return tuiProvide(TuiPopoverService, popover);
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
const SCROLL_TIME = 300;
function getX(elementOrWindow) {
    return 'scrollX' in elementOrWindow
        ? elementOrWindow.scrollX
        : elementOrWindow.scrollLeft;
}
function getY(elementOrWindow) {
    return 'scrollY' in elementOrWindow
        ? elementOrWindow.scrollY
        : elementOrWindow.scrollTop;
}
class TuiScrollService {
    constructor() {
        this.performanceRef = inject(WA_PERFORMANCE);
        this.animationFrame$ = inject(WA_ANIMATION_FRAME);
        this.zone = inject(NgZone);
    }
    scroll$(elementOrWindow, scrollTop, scrollLeft = getX(elementOrWindow), duration = SCROLL_TIME) {
        ngDevMode && console.assert(duration >= 0, 'duration cannot be negative');
        ngDevMode && console.assert(scrollTop >= 0, 'scrollTop cannot be negative');
        ngDevMode && console.assert(scrollLeft >= 0, 'scrollLeft cannot be negative');
        const initialTop = getY(elementOrWindow);
        const initialLeft = getX(elementOrWindow);
        const deltaTop = scrollTop - initialTop;
        const deltaLeft = scrollLeft - initialLeft;
        const observable = !duration
            ? of([scrollTop, scrollLeft])
            : defer(() => of(this.performanceRef.now())).pipe(switchMap((start) => this.animationFrame$.pipe(map((now) => now - start))), map((elapsed) => tuiEaseInOutQuad(tuiClamp(elapsed / duration, 0, 1))), map((percent) => [
                initialTop + deltaTop * percent,
                initialLeft + deltaLeft * percent,
            ]), takeUntil(timer(duration, tuiZonefreeScheduler(this.zone))), endWith([scrollTop, scrollLeft]));
        return observable.pipe(tap(([scrollTop, scrollLeft]) => {
            elementOrWindow.scrollTo?.(scrollLeft, scrollTop);
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiScrollService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiScrollService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiScrollService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

const TUI_THEME_COLOR = tuiCreateTokenFromFactory(() => inject(Meta).getTag('name="theme-color"')?.content ?? '');
class TuiThemeColorService {
    constructor() {
        this.current = inject(TUI_THEME_COLOR);
        this.doc = inject(DOCUMENT);
        this.meta = inject(Meta);
        this.color = this.current;
    }
    get color() {
        return this.current;
    }
    set color(content) {
        this.current = content;
        this.meta.updateTag({ name: 'theme-color', content });
        this.doc.documentElement.style.setProperty('--tui-theme-color', content);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiThemeColorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiThemeColorService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiThemeColorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

/**
 * Generated bundle index. Do not edit.
 */

export { TUI_THEME_COLOR, TuiIdService, TuiPopoverService, TuiScrollService, TuiThemeColorService, tuiAsPopover, tuiInjectId };
//# sourceMappingURL=taiga-ui-cdk-services.mjs.map
