import * as i0 from "@angular/core";
export declare const TUI_THEME_COLOR: import("@angular/core").InjectionToken<string>;
interface TuiThemeColor {
    get color(): string;
    set color(value: string);
}
export declare class TuiThemeColorService implements TuiThemeColor {
    private current;
    private readonly doc;
    private readonly meta;
    constructor();
    get color(): string;
    set color(content: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiThemeColorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TuiThemeColorService>;
}
export {};
