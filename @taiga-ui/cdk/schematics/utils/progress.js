"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupProgressLogger = void 0;
/// <reference types="node" />
const node_readline_1 = require("node:readline");
const ng_morph_1 = require("ng-morph");
function setupProgressLogger({ total, prefix = '', tabs = 2, }) {
    let i = 1;
    return (message, incrementIndex = true) => {
        if (process.env.CI) {
            return;
        }
        const isLast = i === total;
        const progressLog = `(${i} / ${total}) ${prefix} ${isLast ? ng_morph_1.SUCCESS_SYMBOL : message}`;
        i = incrementIndex ? i + 1 : i;
        (0, node_readline_1.clearLine)(process.stdout, 0);
        (0, node_readline_1.cursorTo)(process.stdout, 0);
        process.stdout.write(ng_morph_1.SMALL_TAB_SYMBOL.repeat(tabs) + progressLog);
        if (isLast && incrementIndex) {
            process.stdout.write('\n');
        }
    };
}
exports.setupProgressLogger = setupProgressLogger;
