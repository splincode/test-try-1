import { NgZone } from '@angular/core';
import type { MonoTypeOperatorFunction, SchedulerLike } from 'rxjs';
export declare function tuiZonefull<T>(zone?: NgZone): MonoTypeOperatorFunction<T>;
export declare function tuiZonefree<T>(zone?: NgZone): MonoTypeOperatorFunction<T>;
export declare function tuiZoneOptimized<T>(zone?: NgZone): MonoTypeOperatorFunction<T>;
export declare function tuiZonefreeScheduler(zone?: NgZone, scheduler?: SchedulerLike): SchedulerLike;
export declare function tuiZonefullScheduler(zone?: NgZone, scheduler?: SchedulerLike): SchedulerLike;
