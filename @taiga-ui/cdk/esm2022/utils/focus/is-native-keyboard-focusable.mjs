import { tuiIsHTMLElement } from '@taiga-ui/cdk/utils/dom';
/**
 * Checks for signs that element can be focused with keyboard. tabIndex above 0 is ignored to
 * only target natural focus order. Not checking the possibility of an element to
 * be focused, for example element can have display: none applied to it or any other
 * circumstances could prevent actual focus.
 */
export function tuiIsNativeKeyboardFocusable(element) {
    if (element.hasAttribute('disabled') || element.getAttribute('tabIndex') === '-1') {
        return false;
    }
    if ((tuiIsHTMLElement(element) && element.isContentEditable) ||
        element.getAttribute('tabIndex') === '0') {
        return true;
    }
    switch (element.tagName) {
        case 'A':
        case 'LINK':
            return element.hasAttribute('href');
        case 'AUDIO':
        case 'VIDEO':
            return element.hasAttribute('controls');
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA':
            return true;
        case 'INPUT':
            return element.getAttribute('type') !== 'hidden';
        default:
            return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtbmF0aXZlLWtleWJvYXJkLWZvY3VzYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay91dGlscy9mb2N1cy9pcy1uYXRpdmUta2V5Ym9hcmQtZm9jdXNhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXpEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QixDQUFDLE9BQWdCO0lBQ3pELElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUMvRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELElBQ0ksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDeEQsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQzFDO1FBQ0UsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELFFBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNyQixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssTUFBTTtZQUNQLE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssT0FBTztZQUNSLE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxVQUFVO1lBQ1gsT0FBTyxJQUFJLENBQUM7UUFDaEIsS0FBSyxPQUFPO1lBQ1IsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFFBQVEsQ0FBQztRQUNyRDtZQUNJLE9BQU8sS0FBSyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dHVpSXNIVE1MRWxlbWVudH0gZnJvbSAnQHRhaWdhLXVpL2Nkay91dGlscy9kb20nO1xuXG4vKipcbiAqIENoZWNrcyBmb3Igc2lnbnMgdGhhdCBlbGVtZW50IGNhbiBiZSBmb2N1c2VkIHdpdGgga2V5Ym9hcmQuIHRhYkluZGV4IGFib3ZlIDAgaXMgaWdub3JlZCB0b1xuICogb25seSB0YXJnZXQgbmF0dXJhbCBmb2N1cyBvcmRlci4gTm90IGNoZWNraW5nIHRoZSBwb3NzaWJpbGl0eSBvZiBhbiBlbGVtZW50IHRvXG4gKiBiZSBmb2N1c2VkLCBmb3IgZXhhbXBsZSBlbGVtZW50IGNhbiBoYXZlIGRpc3BsYXk6IG5vbmUgYXBwbGllZCB0byBpdCBvciBhbnkgb3RoZXJcbiAqIGNpcmN1bXN0YW5jZXMgY291bGQgcHJldmVudCBhY3R1YWwgZm9jdXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0dWlJc05hdGl2ZUtleWJvYXJkRm9jdXNhYmxlKGVsZW1lbnQ6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgfHwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JykgPT09ICctMScpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgKHR1aUlzSFRNTEVsZW1lbnQoZWxlbWVudCkgJiYgZWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZSkgfHxcbiAgICAgICAgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JykgPT09ICcwJ1xuICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGVsZW1lbnQudGFnTmFtZSkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgY2FzZSAnTElOSyc6XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgY2FzZSAnQVVESU8nOlxuICAgICAgICBjYXNlICdWSURFTyc6XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XG4gICAgICAgIGNhc2UgJ0JVVFRPTic6XG4gICAgICAgIGNhc2UgJ1NFTEVDVCc6XG4gICAgICAgIGNhc2UgJ1RFWFRBUkVBJzpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjYXNlICdJTlBVVCc6XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSAhPT0gJ2hpZGRlbic7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIl19