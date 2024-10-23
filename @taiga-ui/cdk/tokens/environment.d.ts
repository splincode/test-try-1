export declare const TUI_IS_MOBILE: import("@angular/core").InjectionToken<boolean>;
export declare const TUI_IS_IOS: import("@angular/core").InjectionToken<boolean>;
export declare const TUI_IS_ANDROID: import("@angular/core").InjectionToken<boolean>;
export declare const TUI_IS_WEBKIT: import("@angular/core").InjectionToken<boolean>;
export declare const TUI_PLATFORM: import("@angular/core").InjectionToken<"android" | "ios" | "web">;
export declare const TUI_IS_TOUCH: import("@angular/core").InjectionToken<import("@angular/core").Signal<boolean>>;
/**
 * Detect if app is running under Cypress
 * {@link https://docs.cypress.io/faq/questions/using-cypress-faq#Is-there-any-way-to-detect-if-my-app-is-running-under-Cypress Cypress docs}
 */
export declare const TUI_IS_CYPRESS: import("@angular/core").InjectionToken<boolean>;
/**
 * Manually provide `true` when running tests in Playwright
 */
export declare const TUI_IS_PLAYWRIGHT: import("@angular/core").InjectionToken<boolean>;
/**
 * Detect if app is running under any of test frameworks
 */
export declare const TUI_IS_E2E: import("@angular/core").InjectionToken<boolean>;
