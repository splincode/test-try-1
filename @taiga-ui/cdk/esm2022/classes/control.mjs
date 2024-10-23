import { __decorate } from "tslib";
import { ChangeDetectorRef, computed, Directive, inject, Input, signal, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl, NgModel } from '@angular/forms';
import { EMPTY_FUNCTION } from '@taiga-ui/cdk/constants';
import { TUI_FALLBACK_VALUE } from '@taiga-ui/cdk/tokens';
import { tuiProvide, tuiPure } from '@taiga-ui/cdk/utils';
import { delay, distinctUntilChanged, EMPTY, filter, map, merge, startWith, Subject, switchMap, } from 'rxjs';
import { TuiValueTransformer } from './value-transformer';
import * as i0 from "@angular/core";
const FLAGS = { self: true, optional: true };
/**
 * Basic ControlValueAccessor class to build form components upon
 */
class TuiControl {
    constructor() {
        this.fallback = inject(TUI_FALLBACK_VALUE, FLAGS);
        this.refresh$ = new Subject();
        this.pseudoInvalid = signal(null);
        this.internal = signal(this.fallback);
        this.control = inject(NgControl, { self: true });
        this.cdr = inject(ChangeDetectorRef);
        this.transformer = inject(TuiValueTransformer, FLAGS);
        this.value = computed(() => this.internal() ?? this.fallback);
        this.readOnly = signal(false);
        this.touched = signal(false);
        this.status = signal(undefined);
        this.disabled = computed(() => this.status() === 'DISABLED');
        this.interactive = computed(() => !this.disabled() && !this.readOnly());
        this.invalid = computed(() => this.pseudoInvalid() !== null
            ? !!this.pseudoInvalid() && this.interactive()
            : this.interactive() && this.touched() && this.status() === 'INVALID');
        this.mode = computed(() => 
        // eslint-disable-next-line no-nested-ternary
        this.readOnly() ? 'readonly' : this.invalid() ? 'invalid' : 'valid');
        this.onTouched = EMPTY_FUNCTION;
        this.onChange = EMPTY_FUNCTION;
        this.control.valueAccessor = this;
        this.refresh$
            .pipe(delay(0), startWith(null), map(() => this.control.control), filter(Boolean), distinctUntilChanged(), switchMap((c) => merge(c.valueChanges, c.statusChanges, c.events || EMPTY).pipe(startWith(null))), takeUntilDestroyed())
            .subscribe(() => this.update());
    }
    set readOnlySetter(readOnly) {
        this.readOnly.set(readOnly);
    }
    set invalidSetter(invalid) {
        this.pseudoInvalid.set(invalid);
    }
    registerOnChange(onChange) {
        this.refresh$.next();
        this.onChange = (value) => {
            if (value === this.internal()) {
                return;
            }
            onChange(this.toControlValue(value));
            this.internal.set(value);
            this.update();
        };
    }
    registerOnTouched(onTouched) {
        this.onTouched = () => {
            onTouched();
            this.update();
        };
    }
    setDisabledState() {
        this.update();
    }
    writeValue(value) {
        // TODO: https://github.com/angular/angular/issues/14988
        const safe = this.control instanceof NgModel ? this.control.model : value;
        this.internal.set(this.fromControlValue(safe));
        this.update();
    }
    fromControlValue(value) {
        return this.transformer ? this.transformer.fromControlValue(value) : value;
    }
    toControlValue(value) {
        return this.transformer ? this.transformer.toControlValue(value) : value;
    }
    update() {
        this.status.set(this.control.control?.status);
        this.touched.set(!!this.control.control?.touched);
        this.cdr.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiControl, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiControl, inputs: { readOnlySetter: ["readOnly", "readOnlySetter"], invalidSetter: ["invalid", "invalidSetter"] }, ngImport: i0 }); }
}
__decorate([
    tuiPure
], TuiControl.prototype, "fromControlValue", null);
__decorate([
    tuiPure
], TuiControl.prototype, "toControlValue", null);
export { TuiControl };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiControl, decorators: [{
            type: Directive
        }], ctorParameters: function () { return []; }, propDecorators: { readOnlySetter: [{
                type: Input,
                args: ['readOnly']
            }], invalidSetter: [{
                type: Input,
                args: ['invalid']
            }], fromControlValue: [], toControlValue: [] } });
export function tuiAsControl(control) {
    return tuiProvide(TuiControl, control);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9jbGFzc2VzL2NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsUUFBUSxFQUNSLFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUU5RCxPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFDSCxLQUFLLEVBQ0wsb0JBQW9CLEVBQ3BCLEtBQUssRUFDTCxNQUFNLEVBQ04sR0FBRyxFQUNILEtBQUssRUFDTCxTQUFTLEVBQ1QsT0FBTyxFQUNQLFNBQVMsR0FDWixNQUFNLE1BQU0sQ0FBQztBQUVkLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDOztBQUV4RCxNQUFNLEtBQUssR0FBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO0FBRTNDOztHQUVHO0FBQ0gsTUFDc0IsVUFBVTtJQThCNUI7UUE3QmlCLGFBQVEsR0FBRyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFNLENBQUM7UUFDbEQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDL0Isa0JBQWEsR0FBRyxNQUFNLENBQWlCLElBQUksQ0FBQyxDQUFDO1FBQzdDLGFBQVEsR0FBRyxNQUFNLENBQUMsSUFB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T0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzdFLENBQUM7SUFFTyxNQUFNO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUIsQ0FBQzsrR0E1R2lCLFVBQVU7bUdBQVYsVUFBVTs7QUErRnBCO0lBRFAsT0FBTztrREFHUDtBQUdPO0lBRFAsT0FBTztnREFHUDtTQXRHaUIsVUFBVTs0RkFBVixVQUFVO2tCQUQvQixTQUFTOzBFQXFESyxjQUFjO3NCQUR4QixLQUFLO3VCQUFDLFVBQVU7Z0JBTU4sYUFBYTtzQkFEdkIsS0FBSzt1QkFBQyxTQUFTO2dCQXVDUixnQkFBZ0IsTUFLaEIsY0FBYztBQVcxQixNQUFNLFVBQVUsWUFBWSxDQUFJLE9BQTRCO0lBQ3hELE9BQU8sVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1Byb3ZpZGVyLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgY29tcHV0ZWQsXG4gICAgRGlyZWN0aXZlLFxuICAgIGluamVjdCxcbiAgICBJbnB1dCxcbiAgICBzaWduYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0YWtlVW50aWxEZXN0cm95ZWR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB0eXBlIHtDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUNvbnRyb2xTdGF0dXN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TmdDb250cm9sLCBOZ01vZGVsfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0VNUFRZX0ZVTkNUSU9OfSBmcm9tICdAdGFpZ2EtdWkvY2RrL2NvbnN0YW50cyc7XG5pbXBvcnQge1RVSV9GQUxMQkFDS19WQUxVRX0gZnJvbSAnQHRhaWdhLXVpL2Nkay90b2tlbnMnO1xuaW1wb3J0IHt0dWlQcm92aWRlLCB0dWlQdXJlfSBmcm9tICdAdGFpZ2EtdWkvY2RrL3V0aWxzJztcbmltcG9ydCB7XG4gICAgZGVsYXksXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gICAgRU1QVFksXG4gICAgZmlsdGVyLFxuICAgIG1hcCxcbiAgICBtZXJnZSxcbiAgICBzdGFydFdpdGgsXG4gICAgU3ViamVjdCxcbiAgICBzd2l0Y2hNYXAsXG59IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1R1aVZhbHVlVHJhbnNmb3JtZXJ9IGZyb20gJy4vdmFsdWUtdHJhbnNmb3JtZXInO1xuXG5jb25zdCBGTEFHUyA9IHtzZWxmOiB0cnVlLCBvcHRpb25hbDogdHJ1ZX07XG5cbi8qKlxuICogQmFzaWMgQ29udHJvbFZhbHVlQWNjZXNzb3IgY2xhc3MgdG8gYnVpbGQgZm9ybSBjb21wb25lbnRzIHVwb25cbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVHVpQ29udHJvbDxUPiBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZhbGxiYWNrID0gaW5qZWN0KFRVSV9GQUxMQkFDS19WQUxVRSwgRkxBR1MpIGFzIFQ7XG4gICAgcHJpdmF0ZSByZWFkb25seSByZWZyZXNoJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwc2V1ZG9JbnZhbGlkID0gc2lnbmFsPGJvb2xlYW4gfCBudWxsPihudWxsKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGludGVybmFsID0gc2lnbmFsKHRoaXMuZmFsbGJhY2spO1xuXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbnRyb2wgPSBpbmplY3QoTmdDb250cm9sLCB7c2VsZjogdHJ1ZX0pO1xuICAgIHByb3RlY3RlZCByZWFkb25seSBjZHIgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIHByb3RlY3RlZCByZWFkb25seSB0cmFuc2Zvcm1lciA9IGluamVjdChUdWlWYWx1ZVRyYW5zZm9ybWVyLCBGTEFHUyk7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgdmFsdWUgPSBjb21wdXRlZCgoKSA9PiB0aGlzLmludGVybmFsKCkgPz8gdGhpcy5mYWxsYmFjayk7XG4gICAgcHVibGljIHJlYWRvbmx5IHJlYWRPbmx5ID0gc2lnbmFsKGZhbHNlKTtcbiAgICBwdWJsaWMgcmVhZG9ubHkgdG91Y2hlZCA9IHNpZ25hbChmYWxzZSk7XG4gICAgcHVibGljIHJlYWRvbmx5IHN0YXR1cyA9IHNpZ25hbDxGb3JtQ29udHJvbFN0YXR1cyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlzYWJsZWQgPSBjb21wdXRlZCgoKSA9PiB0aGlzLnN0YXR1cygpID09PSAnRElTQUJMRUQnKTtcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW50ZXJhY3RpdmUgPSBjb21wdXRlZCgoKSA9PiAhdGhpcy5kaXNhYmxlZCgpICYmICF0aGlzLnJlYWRPbmx5KCkpO1xuICAgIHB1YmxpYyByZWFkb25seSBpbnZhbGlkID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgdGhpcy5wc2V1ZG9JbnZhbGlkKCkgIT09IG51bGxcbiAgICAgICAgICAgID8gISF0aGlzLnBzZXVkb0ludmFsaWQoKSAmJiB0aGlzLmludGVyYWN0aXZlKClcbiAgICAgICAgICAgIDogdGhpcy5pbnRlcmFjdGl2ZSgpICYmIHRoaXMudG91Y2hlZCgpICYmIHRoaXMuc3RhdHVzKCkgPT09ICdJTlZBTElEJyxcbiAgICApO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IG1vZGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgICAgdGhpcy5yZWFkT25seSgpID8gJ3JlYWRvbmx5JyA6IHRoaXMuaW52YWxpZCgpID8gJ2ludmFsaWQnIDogJ3ZhbGlkJyxcbiAgICApO1xuXG4gICAgcHVibGljIG9uVG91Y2hlZCA9IEVNUFRZX0ZVTkNUSU9OO1xuICAgIHB1YmxpYyBvbkNoYW5nZTogKHZhbHVlOiBUKSA9PiB2b2lkID0gRU1QVFlfRlVOQ1RJT047XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlZnJlc2gkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBkZWxheSgwKSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICAgICAgICAgICAgbWFwKCgpID0+IHRoaXMuY29udHJvbC5jb250cm9sKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXIoQm9vbGVhbiksXG4gICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKGMpID0+XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgYy52YWx1ZUNoYW5nZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjLnN0YXR1c0NoYW5nZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAoYyBhcyBhbnkpLmV2ZW50cyB8fCBFTVBUWSxcbiAgICAgICAgICAgICAgICAgICAgKS5waXBlKHN0YXJ0V2l0aChudWxsKSksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0YWtlVW50aWxEZXN0cm95ZWQoKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGUoKSk7XG4gICAgfVxuXG4gICAgQElucHV0KCdyZWFkT25seScpXG4gICAgcHVibGljIHNldCByZWFkT25seVNldHRlcihyZWFkT25seTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnJlYWRPbmx5LnNldChyZWFkT25seSk7XG4gICAgfVxuXG4gICAgQElucHV0KCdpbnZhbGlkJylcbiAgICBwdWJsaWMgc2V0IGludmFsaWRTZXR0ZXIoaW52YWxpZDogYm9vbGVhbiB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5wc2V1ZG9JbnZhbGlkLnNldChpbnZhbGlkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShvbkNoYW5nZTogKHZhbHVlOiB1bmtub3duKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaCQubmV4dCgpO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSAodmFsdWU6IFQpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5pbnRlcm5hbCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvbkNoYW5nZSh0aGlzLnRvQ29udHJvbFZhbHVlKHZhbHVlKSk7XG4gICAgICAgICAgICB0aGlzLmludGVybmFsLnNldCh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChvblRvdWNoZWQ6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBvblRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHNldERpc2FibGVkU3RhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IFQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIC8vIFRPRE86IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE0OTg4XG4gICAgICAgIGNvbnN0IHNhZmUgPSB0aGlzLmNvbnRyb2wgaW5zdGFuY2VvZiBOZ01vZGVsID8gdGhpcy5jb250cm9sLm1vZGVsIDogdmFsdWU7XG5cbiAgICAgICAgdGhpcy5pbnRlcm5hbC5zZXQodGhpcy5mcm9tQ29udHJvbFZhbHVlKHNhZmUpKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBAdHVpUHVyZVxuICAgIHByaXZhdGUgZnJvbUNvbnRyb2xWYWx1ZSh2YWx1ZTogdW5rbm93bik6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1lciA/IHRoaXMudHJhbnNmb3JtZXIuZnJvbUNvbnRyb2xWYWx1ZSh2YWx1ZSkgOiAodmFsdWUgYXMgVCk7XG4gICAgfVxuXG4gICAgQHR1aVB1cmVcbiAgICBwcml2YXRlIHRvQ29udHJvbFZhbHVlKHZhbHVlOiBUKTogdW5rbm93biB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybWVyID8gdGhpcy50cmFuc2Zvcm1lci50b0NvbnRyb2xWYWx1ZSh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0dXMuc2V0KHRoaXMuY29udHJvbC5jb250cm9sPy5zdGF0dXMpO1xuICAgICAgICB0aGlzLnRvdWNoZWQuc2V0KCEhdGhpcy5jb250cm9sLmNvbnRyb2w/LnRvdWNoZWQpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0dWlBc0NvbnRyb2w8VD4oY29udHJvbDogVHlwZTxUdWlDb250cm9sPFQ+Pik6IFByb3ZpZGVyIHtcbiAgICByZXR1cm4gdHVpUHJvdmlkZShUdWlDb250cm9sLCBjb250cm9sKTtcbn1cbiJdfQ==