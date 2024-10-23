import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { tuiCreateTokenFromFactory } from '@taiga-ui/cdk/utils';
import * as i0 from "@angular/core";
export const TUI_THEME_COLOR = tuiCreateTokenFromFactory(() => inject(Meta).getTag('name="theme-color"')?.content ?? '');
class TuiThemeColorService {
    constructor() {
        this.current = inject(TUI_THEME_COLOR);
        this.doc = inject(DOCUMENT);
        this.meta = inject(Meta);
        this.color = this.current;
    }
    get color() {
        return this.current;
    }
    set color(content) {
        this.current = content;
        this.meta.updateTag({ name: 'theme-color', content });
        this.doc.documentElement.style.setProperty('--tui-theme-color', content);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiThemeColorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiThemeColorService, providedIn: 'root' }); }
}
export { TuiThemeColorService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiThemeColorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtY29sb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay9zZXJ2aWNlcy90aGVtZS1jb2xvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBRTlELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyx5QkFBeUIsQ0FDcEQsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQ2pFLENBQUM7QUFPRixNQUdhLG9CQUFvQjtJQUs3QjtRQUpRLFlBQU8sR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekIsUUFBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QixTQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxPQUFlO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0UsQ0FBQzsrR0FqQlEsb0JBQW9CO21IQUFwQixvQkFBb0IsY0FGakIsTUFBTTs7U0FFVCxvQkFBb0I7NEZBQXBCLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtpbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXRhfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7dHVpQ3JlYXRlVG9rZW5Gcm9tRmFjdG9yeX0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUVUlfVEhFTUVfQ09MT1IgPSB0dWlDcmVhdGVUb2tlbkZyb21GYWN0b3J5PHN0cmluZz4oXG4gICAgKCkgPT4gaW5qZWN0KE1ldGEpLmdldFRhZygnbmFtZT1cInRoZW1lLWNvbG9yXCInKT8uY29udGVudCA/PyAnJyxcbik7XG5cbmludGVyZmFjZSBUdWlUaGVtZUNvbG9yIHtcbiAgICBnZXQgY29sb3IoKTogc3RyaW5nO1xuICAgIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKTtcbn1cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVHVpVGhlbWVDb2xvclNlcnZpY2UgaW1wbGVtZW50cyBUdWlUaGVtZUNvbG9yIHtcbiAgICBwcml2YXRlIGN1cnJlbnQgPSBpbmplY3QoVFVJX1RIRU1FX0NPTE9SKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRvYyA9IGluamVjdChET0NVTUVOVCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBtZXRhID0gaW5qZWN0KE1ldGEpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmN1cnJlbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgY29sb3IoY29udGVudDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMubWV0YS51cGRhdGVUYWcoe25hbWU6ICd0aGVtZS1jb2xvcicsIGNvbnRlbnR9KTtcbiAgICAgICAgdGhpcy5kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXR1aS10aGVtZS1jb2xvcicsIGNvbnRlbnQpO1xuICAgIH1cbn1cbiJdfQ==