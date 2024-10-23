import { DOCUMENT } from '@angular/common';
import { Directive, inject } from '@angular/core';
import { tuiContainsOrAfter, tuiInjectElement, tuiIsHTMLElement, } from '@taiga-ui/cdk/utils/dom';
import { tuiBlurNativeFocused, tuiGetClosestFocusable, tuiGetNativeFocused, } from '@taiga-ui/cdk/utils/focus';
import * as i0 from "@angular/core";
class TuiFocusTrap {
    constructor() {
        this.doc = inject(DOCUMENT);
        this.el = tuiInjectElement();
        this.activeElement = tuiGetNativeFocused(this.doc);
        /**
         * This would cause currently focused element to lose focus,
         * but it might cause ExpressionChanged error due to potential HostBinding.
         * Microtask keeps it in the same frame but allows change detection to run
         */
        void Promise.resolve().then(() => this.el.focus());
    }
    ngOnDestroy() {
        tuiBlurNativeFocused(this.doc);
        /**
         * HostListeners are triggered even after ngOnDestroy
         * {@link https://github.com/angular/angular/issues/38100}
         * so we need to delay it but stay in the same sync cycle,
         * therefore using Promise instead of setTimeout
         */
        // eslint-disable-next-line
        Promise.resolve().then(() => {
            if (tuiIsHTMLElement(this.activeElement)) {
                this.activeElement.focus();
            }
        });
    }
    onFocusIn(node) {
        if (!tuiContainsOrAfter(this.el, node)) {
            tuiGetClosestFocusable({
                initial: this.el,
                root: this.el,
            })?.focus();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFocusTrap, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiFocusTrap, isStandalone: true, selector: "[tuiFocusTrap]", host: { attributes: { "tabIndex": "0" }, listeners: { "window:focusin.silent": "onFocusIn($event.target)" } }, ngImport: i0 }); }
}
export { TuiFocusTrap };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiFocusTrap, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiFocusTrap]',
                    host: {
                        tabIndex: '0',
                        '(window:focusin.silent)': 'onFocusIn($event.target)',
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvZGlyZWN0aXZlcy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQ0gsa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNoQixnQkFBZ0IsR0FDbkIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQ0gsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixtQkFBbUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFbkMsTUFRYSxZQUFZO0lBS3JCO1FBSmlCLFFBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkIsT0FBRSxHQUFHLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsa0JBQWEsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFHM0Q7Ozs7V0FJRztRQUNILEtBQUssT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLFdBQVc7UUFDZCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFL0I7Ozs7O1dBS0c7UUFDSCwyQkFBMkI7UUFDM0IsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDeEIsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDOUI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUyxTQUFTLENBQUMsSUFBVTtRQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQyxzQkFBc0IsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7YUFDaEIsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOytHQXRDUSxZQUFZO21HQUFaLFlBQVk7O1NBQVosWUFBWTs0RkFBWixZQUFZO2tCQVJ4QixTQUFTO21CQUFDO29CQUNQLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixJQUFJLEVBQUU7d0JBQ0YsUUFBUSxFQUFFLEdBQUc7d0JBQ2IseUJBQXlCLEVBQUUsMEJBQTBCO3FCQUN4RDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgdHlwZSB7T25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGlyZWN0aXZlLCBpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICB0dWlDb250YWluc09yQWZ0ZXIsXG4gICAgdHVpSW5qZWN0RWxlbWVudCxcbiAgICB0dWlJc0hUTUxFbGVtZW50LFxufSBmcm9tICdAdGFpZ2EtdWkvY2RrL3V0aWxzL2RvbSc7XG5pbXBvcnQge1xuICAgIHR1aUJsdXJOYXRpdmVGb2N1c2VkLFxuICAgIHR1aUdldENsb3Nlc3RGb2N1c2FibGUsXG4gICAgdHVpR2V0TmF0aXZlRm9jdXNlZCxcbn0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscy9mb2N1cyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgc2VsZWN0b3I6ICdbdHVpRm9jdXNUcmFwXScsXG4gICAgaG9zdDoge1xuICAgICAgICB0YWJJbmRleDogJzAnLFxuICAgICAgICAnKHdpbmRvdzpmb2N1c2luLnNpbGVudCknOiAnb25Gb2N1c0luKCRldmVudC50YXJnZXQpJyxcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUdWlGb2N1c1RyYXAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZG9jID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVsID0gdHVpSW5qZWN0RWxlbWVudCgpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYWN0aXZlRWxlbWVudCA9IHR1aUdldE5hdGl2ZUZvY3VzZWQodGhpcy5kb2MpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIHdvdWxkIGNhdXNlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnQgdG8gbG9zZSBmb2N1cyxcbiAgICAgICAgICogYnV0IGl0IG1pZ2h0IGNhdXNlIEV4cHJlc3Npb25DaGFuZ2VkIGVycm9yIGR1ZSB0byBwb3RlbnRpYWwgSG9zdEJpbmRpbmcuXG4gICAgICAgICAqIE1pY3JvdGFzayBrZWVwcyBpdCBpbiB0aGUgc2FtZSBmcmFtZSBidXQgYWxsb3dzIGNoYW5nZSBkZXRlY3Rpb24gdG8gcnVuXG4gICAgICAgICAqL1xuICAgICAgICB2b2lkIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5lbC5mb2N1cygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHR1aUJsdXJOYXRpdmVGb2N1c2VkKHRoaXMuZG9jKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSG9zdExpc3RlbmVycyBhcmUgdHJpZ2dlcmVkIGV2ZW4gYWZ0ZXIgbmdPbkRlc3Ryb3lcbiAgICAgICAgICoge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzM4MTAwfVxuICAgICAgICAgKiBzbyB3ZSBuZWVkIHRvIGRlbGF5IGl0IGJ1dCBzdGF5IGluIHRoZSBzYW1lIHN5bmMgY3ljbGUsXG4gICAgICAgICAqIHRoZXJlZm9yZSB1c2luZyBQcm9taXNlIGluc3RlYWQgb2Ygc2V0VGltZW91dFxuICAgICAgICAgKi9cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR1aUlzSFRNTEVsZW1lbnQodGhpcy5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Gb2N1c0luKG5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0dWlDb250YWluc09yQWZ0ZXIodGhpcy5lbCwgbm9kZSkpIHtcbiAgICAgICAgICAgIHR1aUdldENsb3Nlc3RGb2N1c2FibGUoe1xuICAgICAgICAgICAgICAgIGluaXRpYWw6IHRoaXMuZWwsXG4gICAgICAgICAgICAgICAgcm9vdDogdGhpcy5lbCxcbiAgICAgICAgICAgIH0pPy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19