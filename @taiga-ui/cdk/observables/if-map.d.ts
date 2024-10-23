import type { TuiBooleanHandler } from '@taiga-ui/cdk/types';
import type { Observable, OperatorFunction } from 'rxjs';
export declare function tuiIfMap<T, G>(project: (value: T) => Observable<G>, predicate?: TuiBooleanHandler<T>): OperatorFunction<T, G>;
