import { InjectionToken } from '@angular/core';
export declare function tuiCreateToken<T>(defaults?: T): InjectionToken<T>;
export declare function tuiCreateTokenFromFactory<T>(factory?: () => T): InjectionToken<T>;
