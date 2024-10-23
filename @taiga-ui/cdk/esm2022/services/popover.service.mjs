import { inject, Injectable } from '@angular/core';
import { tuiProvide } from '@taiga-ui/cdk/utils';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { Observable } from 'rxjs';
import { TuiIdService } from './id.service';
import * as i0 from "@angular/core";
class TuiPopoverService {
    constructor(items, component, options = {}) {
        this.options = options;
        this.id = inject(TuiIdService);
        this.component = new PolymorpheusComponent(component);
        this.items$ = inject(items);
    }
    open(content, options = {}) {
        return new Observable((observer) => {
            const item = {
                ...this.options,
                ...options,
                content,
                $implicit: observer,
                component: this.component,
                createdAt: Date.now(),
                id: this.id.generate(),
                completeWith: (result) => {
                    observer.next(result);
                    observer.complete();
                },
            };
            this.items$.next([...this.items$.value, item]);
            return () => {
                this.items$.next(this.items$.value.filter((value) => value !== item));
            };
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPopoverService, deps: "invalid", target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPopoverService }); }
}
export { TuiPopoverService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPopoverService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined }, { type: undefined }, { type: undefined }]; } });
export function tuiAsPopover(popover) {
    return tuiProvide(TuiPopoverService, popover);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY2RrL3NlcnZpY2VzL3BvcG92ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFL0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFN0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVoQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDOztBQWMxQyxNQUNzQixpQkFBaUI7SUFNbkMsWUFDSSxLQUF3RSxFQUN4RSxTQUFvQixFQUNELFVBQWEsRUFBTztRQUFwQixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBUDFCLE9BQUUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFTdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxJQUFJLENBQ1AsT0FBMkUsRUFDM0UsVUFBc0IsRUFBRTtRQUV4QixPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEdBQUc7Z0JBQ1QsR0FBRyxJQUFJLENBQUMsT0FBTztnQkFDZixHQUFHLE9BQU87Z0JBQ1YsT0FBTztnQkFDUCxTQUFTLEVBQUUsUUFBUTtnQkFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDckIsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO2dCQUN0QixZQUFZLEVBQUUsQ0FBQyxNQUE4QixFQUFRLEVBQUU7b0JBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3RCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQzthQUNKLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUUvQyxPQUFPLEdBQUcsRUFBRTtnQkFDUixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFFLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzsrR0F4Q2lCLGlCQUFpQjttSEFBakIsaUJBQWlCOztTQUFqQixpQkFBaUI7NEZBQWpCLGlCQUFpQjtrQkFEdEMsVUFBVTs7QUE0Q1gsTUFBTSxVQUFVLFlBQVksQ0FBQyxPQUFxQztJQUM5RCxPQUFPLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1Byb3ZpZGVyLCBQcm92aWRlclRva2VuLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHtUdWlDb250ZXh0fSBmcm9tICdAdGFpZ2EtdWkvY2RrL3R5cGVzJztcbmltcG9ydCB7dHVpUHJvdmlkZX0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscyc7XG5pbXBvcnQgdHlwZSB7UG9seW1vcnBoZXVzQ29udGVudH0gZnJvbSAnQHRhaWdhLXVpL3BvbHltb3JwaGV1cyc7XG5pbXBvcnQge1BvbHltb3JwaGV1c0NvbXBvbmVudH0gZnJvbSAnQHRhaWdhLXVpL3BvbHltb3JwaGV1cyc7XG5pbXBvcnQgdHlwZSB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZlcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1R1aUlkU2VydmljZX0gZnJvbSAnLi9pZC5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBUdWlQb3BvdmVyQ29udGV4dDxPPiBleHRlbmRzIFR1aUNvbnRleHQ8T2JzZXJ2ZXI8Tz4+IHtcbiAgICByZWFkb25seSBjb21wb25lbnQ6IFBvbHltb3JwaGV1c0NvbXBvbmVudDxhbnk+O1xuICAgIHJlYWRvbmx5IGNyZWF0ZWRBdDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgY29tcGxldGVXaXRoOiAodmFsdWU6IE8pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCB0eXBlIFR1aVBvcG92ZXI8VCwgTz4gPSBUICZcbiAgICBUdWlQb3BvdmVyQ29udGV4dDxPPiAmIHtcbiAgICAgICAgY29udGVudDogUG9seW1vcnBoZXVzQ29udGVudDxUICYgVHVpUG9wb3ZlckNvbnRleHQ8Tz4+O1xuICAgIH07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUdWlQb3BvdmVyU2VydmljZTxULCBLID0gdm9pZD4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29tcG9uZW50OiBQb2x5bW9ycGhldXNDb21wb25lbnQ8YW55PjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlkID0gaW5qZWN0KFR1aUlkU2VydmljZSk7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgaXRlbXMkOiBCZWhhdmlvclN1YmplY3Q8UmVhZG9ubHlBcnJheTxUdWlQb3BvdmVyPFQsIGFueT4+PjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpdGVtczogUHJvdmlkZXJUb2tlbjxCZWhhdmlvclN1YmplY3Q8UmVhZG9ubHlBcnJheTxUdWlQb3BvdmVyPFQsIGFueT4+Pj4sXG4gICAgICAgIGNvbXBvbmVudDogVHlwZTxhbnk+LFxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogVCA9IHt9IGFzIFQsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbmV3IFBvbHltb3JwaGV1c0NvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICB0aGlzLml0ZW1zJCA9IGluamVjdChpdGVtcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW48RyA9IHZvaWQ+KFxuICAgICAgICBjb250ZW50OiBQb2x5bW9ycGhldXNDb250ZW50PFQgJiBUdWlQb3BvdmVyQ29udGV4dDxLIGV4dGVuZHMgdm9pZCA/IEcgOiBLPj4sXG4gICAgICAgIG9wdGlvbnM6IFBhcnRpYWw8VD4gPSB7fSxcbiAgICApOiBPYnNlcnZhYmxlPEsgZXh0ZW5kcyB2b2lkID8gRyA6IEs+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICAgICAgICRpbXBsaWNpdDogb2JzZXJ2ZXIsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiB0aGlzLmNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuaWQuZ2VuZXJhdGUoKSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZVdpdGg6IChyZXN1bHQ6IEsgZXh0ZW5kcyB2b2lkID8gRyA6IEspOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLml0ZW1zJC5uZXh0KFsuLi50aGlzLml0ZW1zJC52YWx1ZSwgaXRlbV0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMkLm5leHQodGhpcy5pdGVtcyQudmFsdWUuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUgIT09IGl0ZW0pKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR1aUFzUG9wb3Zlcihwb3BvdmVyOiBUeXBlPFR1aVBvcG92ZXJTZXJ2aWNlPGFueT4+KTogUHJvdmlkZXIge1xuICAgIHJldHVybiB0dWlQcm92aWRlKFR1aVBvcG92ZXJTZXJ2aWNlLCBwb3BvdmVyKTtcbn1cbiJdfQ==