"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTaigaStyles = void 0;
const taiga_styles_1 = require("../../constants/taiga-styles");
const angular_json_manipulations_1 = require("../../utils/angular-json-manipulations");
function addTaigaStyles(options) {
    return (_, context) => {
        const taigaLocalStyles = [taiga_styles_1.TAIGA_THEME_STYLE, taiga_styles_1.TAIGA_THEME_FONTS];
        return (0, angular_json_manipulations_1.addStylesToAngularJson)(options, context, taigaLocalStyles);
    };
}
exports.addTaigaStyles = addTaigaStyles;
