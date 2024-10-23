import { tuiIsPresent, tuiPx } from '@taiga-ui/cdk/utils';
import { AbstractTuiAutofocusHandler } from './abstract.handler';
const TEXTFIELD_ATTRS = [
    'type',
    'inputMode',
    'autocomplete',
    'accept',
    'min',
    'max',
    'step',
    'pattern',
    'size',
    'maxlength',
];
export class TuiIosAutofocusHandler extends AbstractTuiAutofocusHandler {
    constructor(el, renderer, zone, win, options) {
        super(el, options);
        this.renderer = renderer;
        this.zone = zone;
        this.win = win;
    }
    setFocus() {
        if (this.isTextFieldElement) {
            this.zone.runOutsideAngular(() => this.iosWebkitAutofocus());
        }
        else {
            this.element.focus({ preventScroll: true });
        }
    }
    iosWebkitAutofocus() {
        const fakeInput = this.makeFakeInput();
        const duration = this.getDurationTimeBeforeFocus();
        let fakeFocusTimeoutId = 0;
        let elementFocusTimeoutId = 0;
        const blurHandler = () => fakeInput.focus({ preventScroll: true });
        const focusHandler = () => {
            clearTimeout(fakeFocusTimeoutId);
            fakeFocusTimeoutId = this.win.setTimeout(() => {
                clearTimeout(elementFocusTimeoutId);
                fakeInput.removeEventListener('blur', blurHandler);
                fakeInput.removeEventListener('focus', focusHandler);
                elementFocusTimeoutId = this.win.setTimeout(() => {
                    this.element.focus({ preventScroll: this.options.preventScroll });
                    fakeInput.remove();
                }, duration);
            });
        };
        fakeInput.addEventListener('blur', blurHandler, { once: true });
        fakeInput.addEventListener('focus', focusHandler);
        if (this.insideDialog()) {
            this.win.document.body.appendChild(fakeInput);
        }
        else {
            this.element.parentElement?.appendChild(fakeInput);
        }
        fakeInput.focus({ preventScroll: true });
    }
    /**
     * @note:
     * emulate textfield position in layout with cursor
     * before focus to real textfield element
     *
     * required note:
     * [fakeInput.readOnly = true] ~
     * don't use {readOnly: true} value, it's doesn't work for emulate autofill
     *
     * [fakeInput.style.opacity = 0] ~
     * don't use {opacity: 0}, sometimes it's doesn't work for emulate real input
     *
     * [fakeInput.style.fontSize = 16px] ~
     * disable possible auto zoom
     *
     * [fakeInput.style.top/left] ~
     * emulate position cursor before focus to real textfield element
     */
    makeFakeInput() {
        const fakeInput = this.renderer.createElement('input');
        const rect = this.element.getBoundingClientRect();
        this.patchFakeInputFromFocusableElement(fakeInput);
        fakeInput.style.height = tuiPx(rect.height);
        fakeInput.style.width = tuiPx(rect.width / 2);
        fakeInput.style.position = 'fixed';
        fakeInput.style.zIndex = '-99999999';
        fakeInput.style.caretColor = 'transparent';
        fakeInput.style.border = 'none';
        fakeInput.style.outline = 'none';
        fakeInput.style.color = 'transparent';
        fakeInput.style.background = 'transparent';
        fakeInput.style.cursor = 'none';
        fakeInput.style.fontSize = tuiPx(16);
        fakeInput.style.top = tuiPx(rect.top);
        fakeInput.style.left = tuiPx(rect.left);
        return fakeInput;
    }
    getDurationTimeBeforeFocus() {
        return (parseFloat(this.win
            .getComputedStyle(this.element)
            .getPropertyValue('--tui-duration')) || 0);
    }
    /**
     * @note:
     * unfortunately, in older versions of iOS
     * there is a bug that the fake input cursor
     * will move along with the dialog animation
     * and then that dialog will be shaking
     */
    insideDialog() {
        return !!this.element.closest('tui-dialog');
    }
    /**
     * @note:
     * inherit basic attributes values from real input
     * for help iOS detect what do you want see on keyboard,
     * for example [inputMode=numeric, autocomplete=cc-number]
     */
    patchFakeInputFromFocusableElement(fakeInput) {
        TEXTFIELD_ATTRS.forEach((attr) => {
            const value = this.element.getAttribute(attr);
            if (tuiIsPresent(value)) {
                fakeInput.setAttribute(attr, value);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9zLmhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvZGlyZWN0aXZlcy9hdXRvLWZvY3VzL2hhbmRsZXJzL2lvcy5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFHeEQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFL0QsTUFBTSxlQUFlLEdBQUc7SUFDcEIsTUFBTTtJQUNOLFdBQVc7SUFDWCxjQUFjO0lBQ2QsUUFBUTtJQUNSLEtBQUs7SUFDTCxLQUFLO0lBQ0wsTUFBTTtJQUNOLFNBQVM7SUFDVCxNQUFNO0lBQ04sV0FBVztDQUNMLENBQUM7QUFFWCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsMkJBQTJCO0lBQ25FLFlBQ0ksRUFBMkIsRUFDVixRQUFtQixFQUNuQixJQUFZLEVBQ1osR0FBVyxFQUM1QixPQUE0QjtRQUU1QixLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBTEYsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUloQyxDQUFDO0lBRU0sUUFBUTtRQUNYLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztTQUNoRTthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxhQUFhLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUM3QztJQUNMLENBQUM7SUFFTyxrQkFBa0I7UUFDdEIsTUFBTSxTQUFTLEdBQXFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FB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UyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ2hDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVPLDBCQUEwQjtRQUM5QixPQUFPLENBQ0gsVUFBVSxDQUNOLElBQUksQ0FBQyxHQUFHO2FBQ0gsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUM5QixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUMxQyxJQUFJLENBQUMsQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLFlBQVk7UUFDaEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssa0NBQWtDLENBQUMsU0FBMkI7UUFDbEUsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTlDLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN2QztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge0VsZW1lbnRSZWYsIE5nWm9uZSwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHVpSXNQcmVzZW50LCB0dWlQeH0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscyc7XG5cbmltcG9ydCB0eXBlIHtUdWlBdXRvZm9jdXNPcHRpb25zfSBmcm9tICcuLi9hdXRvZm9jdXMub3B0aW9ucyc7XG5pbXBvcnQge0Fic3RyYWN0VHVpQXV0b2ZvY3VzSGFuZGxlcn0gZnJvbSAnLi9hYnN0cmFjdC5oYW5kbGVyJztcblxuY29uc3QgVEVYVEZJRUxEX0FUVFJTID0gW1xuICAgICd0eXBlJyxcbiAgICAnaW5wdXRNb2RlJyxcbiAgICAnYXV0b2NvbXBsZXRlJyxcbiAgICAnYWNjZXB0JyxcbiAgICAnbWluJyxcbiAgICAnbWF4JyxcbiAgICAnc3RlcCcsXG4gICAgJ3BhdHRlcm4nLFxuICAgICdzaXplJyxcbiAgICAnbWF4bGVuZ3RoJyxcbl0gYXMgY29uc3Q7XG5cbmV4cG9ydCBjbGFzcyBUdWlJb3NBdXRvZm9jdXNIYW5kbGVyIGV4dGVuZHMgQWJzdHJhY3RUdWlBdXRvZm9jdXNIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgem9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHdpbjogV2luZG93LFxuICAgICAgICBvcHRpb25zOiBUdWlBdXRvZm9jdXNPcHRpb25zLFxuICAgICkge1xuICAgICAgICBzdXBlcihlbCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc1RleHRGaWVsZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLmlvc1dlYmtpdEF1dG9mb2N1cygpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5mb2N1cyh7cHJldmVudFNjcm9sbDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpb3NXZWJraXRBdXRvZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZha2VJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IHRoaXMubWFrZUZha2VJbnB1dCgpO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZ2V0RHVyYXRpb25UaW1lQmVmb3JlRm9jdXMoKTtcbiAgICAgICAgbGV0IGZha2VGb2N1c1RpbWVvdXRJZCA9IDA7XG4gICAgICAgIGxldCBlbGVtZW50Rm9jdXNUaW1lb3V0SWQgPSAwO1xuXG4gICAgICAgIGNvbnN0IGJsdXJIYW5kbGVyID0gKCk6IHZvaWQgPT4gZmFrZUlucHV0LmZvY3VzKHtwcmV2ZW50U2Nyb2xsOiB0cnVlfSk7XG4gICAgICAgIGNvbnN0IGZvY3VzSGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChmYWtlRm9jdXNUaW1lb3V0SWQpO1xuXG4gICAgICAgICAgICBmYWtlRm9jdXNUaW1lb3V0SWQgPSB0aGlzLndpbi5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZWxlbWVudEZvY3VzVGltZW91dElkKTtcblxuICAgICAgICAgICAgICAgIGZha2VJbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgYmx1ckhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGZha2VJbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIGZvY3VzSGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50Rm9jdXNUaW1lb3V0SWQgPSB0aGlzLndpbi5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZvY3VzKHtwcmV2ZW50U2Nyb2xsOiB0aGlzLm9wdGlvbnMucHJldmVudFNjcm9sbH0pO1xuICAgICAgICAgICAgICAgICAgICBmYWtlSW5wdXQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZmFrZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBibHVySGFuZGxlciwge29uY2U6IHRydWV9KTtcbiAgICAgICAgZmFrZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZm9jdXNIYW5kbGVyKTtcblxuICAgICAgICBpZiAodGhpcy5pbnNpZGVEaWFsb2coKSkge1xuICAgICAgICAgICAgdGhpcy53aW4uZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmYWtlSW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQ/LmFwcGVuZENoaWxkKGZha2VJbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBmYWtlSW5wdXQuZm9jdXMoe3ByZXZlbnRTY3JvbGw6IHRydWV9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbm90ZTpcbiAgICAgKiBlbXVsYXRlIHRleHRmaWVsZCBwb3NpdGlvbiBpbiBsYXlvdXQgd2l0aCBjdXJzb3JcbiAgICAgKiBiZWZvcmUgZm9jdXMgdG8gcmVhbCB0ZXh0ZmllbGQgZWxlbWVudFxuICAgICAqXG4gICAgICogcmVxdWlyZWQgbm90ZTpcbiAgICAgKiBbZmFrZUlucHV0LnJlYWRPbmx5ID0gdHJ1ZV0gflxuICAgICAqIGRvbid0IHVzZSB7cmVhZE9ubHk6IHRydWV9IHZhbHVlLCBpdCdzIGRvZXNuJ3Qgd29yayBmb3IgZW11bGF0ZSBhdXRvZmlsbFxuICAgICAqXG4gICAgICogW2Zha2VJbnB1dC5zdHlsZS5vcGFjaXR5ID0gMF0gflxuICAgICAqIGRvbid0IHVzZSB7b3BhY2l0eTogMH0sIHNvbWV0aW1lcyBpdCdzIGRvZXNuJ3Qgd29yayBmb3IgZW11bGF0ZSByZWFsIGlucHV0XG4gICAgICpcbiAgICAgKiBbZmFrZUlucHV0LnN0eWxlLmZvbnRTaXplID0gMTZweF0gflxuICAgICAqIGRpc2FibGUgcG9zc2libGUgYXV0byB6b29tXG4gICAgICpcbiAgICAgKiBbZmFrZUlucHV0LnN0eWxlLnRvcC9sZWZ0XSB+XG4gICAgICogZW11bGF0ZSBwb3NpdGlvbiBjdXJzb3IgYmVmb3JlIGZvY3VzIHRvIHJlYWwgdGV4dGZpZWxkIGVsZW1lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIG1ha2VGYWtlSW5wdXQoKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGZha2VJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY29uc3QgcmVjdDogRE9NUmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLnBhdGNoRmFrZUlucHV0RnJvbUZvY3VzYWJsZUVsZW1lbnQoZmFrZUlucHV0KTtcblxuICAgICAgICBmYWtlSW5wdXQuc3R5bGUuaGVpZ2h0ID0gdHVpUHgocmVjdC5oZWlnaHQpO1xuICAgICAgICBmYWtlSW5wdXQuc3R5bGUud2lkdGggPSB0dWlQeChyZWN0LndpZHRoIC8gMik7XG4gICAgICAgIGZha2VJbnB1dC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgIGZha2VJbnB1dC5zdHlsZS56SW5kZXggPSAnLTk5OTk5OTk5JztcbiAgICAgICAgZmFrZUlucHV0LnN0eWxlLmNhcmV0Q29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICBmYWtlSW5wdXQuc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuICAgICAgICBmYWtlSW5wdXQuc3R5bGUub3V0bGluZSA9ICdub25lJztcbiAgICAgICAgZmFrZUlucHV0LnN0eWxlLmNvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgZmFrZUlucHV0LnN0eWxlLmJhY2tncm91bmQgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICBmYWtlSW5wdXQuc3R5bGUuY3Vyc29yID0gJ25vbmUnO1xuICAgICAgICBmYWtlSW5wdXQuc3R5bGUuZm9udFNpemUgPSB0dWlQeCgxNik7XG4gICAgICAgIGZha2VJbnB1dC5zdHlsZS50b3AgPSB0dWlQeChyZWN0LnRvcCk7XG4gICAgICAgIGZha2VJbnB1dC5zdHlsZS5sZWZ0ID0gdHVpUHgocmVjdC5sZWZ0KTtcblxuICAgICAgICByZXR1cm4gZmFrZUlucHV0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RHVyYXRpb25UaW1lQmVmb3JlRm9jdXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHBhcnNlRmxvYXQoXG4gICAgICAgICAgICAgICAgdGhpcy53aW5cbiAgICAgICAgICAgICAgICAgICAgLmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgnLS10dWktZHVyYXRpb24nKSxcbiAgICAgICAgICAgICkgfHwgMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBub3RlOlxuICAgICAqIHVuZm9ydHVuYXRlbHksIGluIG9sZGVyIHZlcnNpb25zIG9mIGlPU1xuICAgICAqIHRoZXJlIGlzIGEgYnVnIHRoYXQgdGhlIGZha2UgaW5wdXQgY3Vyc29yXG4gICAgICogd2lsbCBtb3ZlIGFsb25nIHdpdGggdGhlIGRpYWxvZyBhbmltYXRpb25cbiAgICAgKiBhbmQgdGhlbiB0aGF0IGRpYWxvZyB3aWxsIGJlIHNoYWtpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIGluc2lkZURpYWxvZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5lbGVtZW50LmNsb3Nlc3QoJ3R1aS1kaWFsb2cnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbm90ZTpcbiAgICAgKiBpbmhlcml0IGJhc2ljIGF0dHJpYnV0ZXMgdmFsdWVzIGZyb20gcmVhbCBpbnB1dFxuICAgICAqIGZvciBoZWxwIGlPUyBkZXRlY3Qgd2hhdCBkbyB5b3Ugd2FudCBzZWUgb24ga2V5Ym9hcmQsXG4gICAgICogZm9yIGV4YW1wbGUgW2lucHV0TW9kZT1udW1lcmljLCBhdXRvY29tcGxldGU9Y2MtbnVtYmVyXVxuICAgICAqL1xuICAgIHByaXZhdGUgcGF0Y2hGYWtlSW5wdXRGcm9tRm9jdXNhYmxlRWxlbWVudChmYWtlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgVEVYVEZJRUxEX0FUVFJTLmZvckVhY2goKGF0dHIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcblxuICAgICAgICAgICAgaWYgKHR1aUlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBmYWtlSW5wdXQuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19