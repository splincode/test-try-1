import type { FactoryProvider, InjectionToken } from '@angular/core';
export declare function tuiProvideOptions<T>(provide: InjectionToken<T>, options: Partial<T>, fallback: T): FactoryProvider;
