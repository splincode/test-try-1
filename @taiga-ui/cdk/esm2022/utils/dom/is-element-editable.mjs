import { tuiIsTextfield } from './element-checks';
export function tuiIsElementEditable(element) {
    return (tuiIsTextfield(element) && !element.readOnly) || !!element.isContentEditable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtZWxlbWVudC1lZGl0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2Nkay91dGlscy9kb20vaXMtZWxlbWVudC1lZGl0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFaEQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE9BQW9CO0lBQ3JELE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUN6RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt0dWlJc1RleHRmaWVsZH0gZnJvbSAnLi9lbGVtZW50LWNoZWNrcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0dWlJc0VsZW1lbnRFZGl0YWJsZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodHVpSXNUZXh0ZmllbGQoZWxlbWVudCkgJiYgIWVsZW1lbnQucmVhZE9ubHkpIHx8ICEhZWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZTtcbn1cbiJdfQ==