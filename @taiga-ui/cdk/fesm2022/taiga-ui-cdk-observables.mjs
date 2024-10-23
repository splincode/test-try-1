import { Observable, startWith, fromEvent, concat, take, map, merge, endWith, takeWhile, repeat, tap, pipe, switchMap, EMPTY, takeUntil, NEVER, catchError, defaultIfEmpty, asyncScheduler } from 'rxjs';
import { tuiIsPresent, tuiGetOriginalArrayFromQueryList } from '@taiga-ui/cdk/utils/miscellaneous';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inject, ChangeDetectorRef, NgZone } from '@angular/core';

/**
 * Turns AbstractControl/Abstract-control-directive valueChanges into ReplaySubject(1)
 */
function tuiControlValue(control) {
    return new Observable((subscriber) => control?.valueChanges?.pipe(startWith(control.value)).subscribe(subscriber));
}

function tuiTypedFromEvent(target, event, options = {}) {
    /**
     * @note:
     * in RxJS 7 type signature `TuiTypedEventTarget<E>` !== `HasEventTargetAddRemove<E>`
     */
    return fromEvent(target, event, options);
}

class TuiDragState {
    constructor(stage, event) {
        this.stage = stage;
        this.event = event;
    }
}
function tuiDragAndDropFrom(element) {
    const { ownerDocument } = element;
    return concat(tuiTypedFromEvent(element, 'mousedown').pipe(take(1), map((event) => new TuiDragState('start', event))), merge(tuiTypedFromEvent(ownerDocument, 'mousemove').pipe(map((event) => new TuiDragState('continues', event))), merge(tuiTypedFromEvent(ownerDocument, 'mouseup'), tuiTypedFromEvent(ownerDocument, 'dragend')).pipe(take(1), map((event) => new TuiDragState('end', event)), endWith(null))).pipe(takeWhile(tuiIsPresent))).pipe(repeat());
}

function tuiPreventDefault() {
    return tap((event) => event.preventDefault());
}
function tuiStopPropagation() {
    return tap((event) => event.stopPropagation());
}

function tuiIfMap(project, predicate = Boolean) {
    return pipe(switchMap((value) => (predicate(value) ? project(value) : EMPTY)));
}

/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
function tuiMustBePresent() {
    return map((value) => {
        if (!tuiIsPresent(value)) {
            throw new TuiValuePresentException();
        }
        return value;
    });
}
class TuiValuePresentException extends Error {
    constructor() {
        super(ngDevMode ? 'Value must present' : '');
    }
}

/**
 * Converts changes observable of a QueryList to an Observable of arrays
 */
function tuiQueryListChanges(queryList) {
    return queryList.changes.pipe(startWith(null), map(() => tuiGetOriginalArrayFromQueryList(queryList)));
}

/**
 * Normalizes scroll event in case element is `html` (document.documentElement)
 */
function tuiScrollFrom(element) {
    return tuiTypedFromEvent(element === element.ownerDocument.documentElement
        ? element.ownerDocument
        : element, 'scroll');
}

// NOTE: takeUntilDestroyed and DestroyRef can cause error:
// NG0911: View has already been destroyed
// https://github.com/angular/angular/issues/54527
function tuiTakeUntilDestroyed(destroyRef) {
    return pipe(takeUntil(NEVER.pipe(takeUntilDestroyed(destroyRef), catchError(() => EMPTY), defaultIfEmpty(null))));
}

function tuiWatch(cdr = inject(ChangeDetectorRef)) {
    return tap(() => cdr.markForCheck());
}

function tuiZonefull(zone = inject(NgZone)) {
    return (source) => new Observable((subscriber) => source.subscribe({
        next: (value) => zone.run(() => subscriber.next(value)),
        error: (error) => zone.run(() => subscriber.error(error)),
        complete: () => zone.run(() => subscriber.complete()),
    }));
}
function tuiZonefree(zone = inject(NgZone)) {
    return (source) => new Observable((subscriber) => zone.runOutsideAngular(() => source.subscribe(subscriber)));
}
function tuiZoneOptimized(zone = inject(NgZone)) {
    return pipe(tuiZonefree(zone), tuiZonefull(zone));
}
class TuiZoneScheduler {
    constructor(zoneConditionFn, scheduler = asyncScheduler) {
        this.zoneConditionFn = zoneConditionFn;
        this.scheduler = scheduler;
    }
    now() {
        return this.scheduler.now();
    }
    schedule(...args) {
        return this.zoneConditionFn(() => this.scheduler.schedule(...args));
    }
}
function tuiZonefreeScheduler(zone = inject(NgZone), scheduler = asyncScheduler) {
    return new TuiZoneScheduler(zone.runOutsideAngular.bind(zone), scheduler);
}
function tuiZonefullScheduler(zone = inject(NgZone), scheduler = asyncScheduler) {
    return new TuiZoneScheduler(zone.run.bind(zone), scheduler);
}

/**
 * Generated bundle index. Do not edit.
 */

export { TuiDragState, TuiValuePresentException, tuiControlValue, tuiDragAndDropFrom, tuiIfMap, tuiMustBePresent, tuiPreventDefault, tuiQueryListChanges, tuiScrollFrom, tuiStopPropagation, tuiTakeUntilDestroyed, tuiTypedFromEvent, tuiWatch, tuiZoneOptimized, tuiZonefree, tuiZonefreeScheduler, tuiZonefull, tuiZonefullScheduler };
//# sourceMappingURL=taiga-ui-cdk-observables.mjs.map
