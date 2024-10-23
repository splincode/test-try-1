import type { Provider, ProviderToken, Type } from '@angular/core';
import type { TuiContext } from '@taiga-ui/cdk/types';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import type { BehaviorSubject, Observer } from 'rxjs';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface TuiPopoverContext<O> extends TuiContext<Observer<O>> {
    readonly component: PolymorpheusComponent<any>;
    readonly createdAt: number;
    readonly id: string;
    readonly completeWith: (value: O) => void;
}
export type TuiPopover<T, O> = T & TuiPopoverContext<O> & {
    content: PolymorpheusContent<T & TuiPopoverContext<O>>;
};
export declare abstract class TuiPopoverService<T, K = void> {
    protected readonly options: T;
    private readonly component;
    private readonly id;
    protected readonly items$: BehaviorSubject<ReadonlyArray<TuiPopover<T, any>>>;
    constructor(items: ProviderToken<BehaviorSubject<ReadonlyArray<TuiPopover<T, any>>>>, component: Type<any>, options?: T);
    open<G = void>(content: PolymorpheusContent<T & TuiPopoverContext<K extends void ? G : K>>, options?: Partial<T>): Observable<K extends void ? G : K>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiPopoverService<any, any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TuiPopoverService<any, any>>;
}
export declare function tuiAsPopover(popover: Type<TuiPopoverService<any>>): Provider;
