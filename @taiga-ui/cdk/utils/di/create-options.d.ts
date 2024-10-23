import type { FactoryProvider, InjectionToken } from '@angular/core';
export declare function tuiCreateOptions<T>(defaults: T): [token: InjectionToken<T>, provider: (item: Partial<T>) => FactoryProvider];
