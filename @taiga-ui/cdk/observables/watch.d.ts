import { ChangeDetectorRef } from '@angular/core';
import type { MonoTypeOperatorFunction } from 'rxjs';
export declare function tuiWatch<T>(cdr?: ChangeDetectorRef): MonoTypeOperatorFunction<T>;
