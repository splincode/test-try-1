import type { Observable } from 'rxjs';
export interface TuiTypedEventTarget<E> {
    addEventListener(type: string, listener: ((evt: E) => void) | null, options?: AddEventListenerOptions | boolean): void;
    removeEventListener(type: string, listener?: ((evt: E) => void) | null, options?: EventListenerOptions | boolean): void;
}
/**
 * Wrapper around {@link Event} to add typings to target and currentTarget.
 */
export type TuiEventWith<G extends Event, T extends TuiTypedEventTarget<G>> = G & {
    readonly currentTarget: T;
};
export declare function tuiTypedFromEvent<E extends keyof WindowEventMap>(target: Window, event: E, options?: AddEventListenerOptions): Observable<TuiEventWith<WindowEventMap[E], typeof target>>;
export declare function tuiTypedFromEvent<E extends keyof DocumentEventMap>(target: Document, event: E, options?: AddEventListenerOptions): Observable<TuiEventWith<DocumentEventMap[E], typeof target>>;
export declare function tuiTypedFromEvent<T extends Element, E extends keyof HTMLElementEventMap>(target: T, event: E, options?: AddEventListenerOptions): Observable<TuiEventWith<HTMLElementEventMap[E], typeof target>>;
export declare function tuiTypedFromEvent<E extends Event, T extends TuiTypedEventTarget<TuiEventWith<E, T>>>(target: T, event: string, options?: AddEventListenerOptions): Observable<TuiEventWith<E, T>>;
export declare function tuiTypedFromEvent<E extends Event>(target: TuiTypedEventTarget<E>, event: string, options?: AddEventListenerOptions): Observable<E>;
