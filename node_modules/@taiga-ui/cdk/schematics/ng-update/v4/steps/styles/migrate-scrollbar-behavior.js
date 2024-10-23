"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateScrollbarBehavior = void 0;
function migrateScrollbarBehavior(fileContent) {
    if (!fileContent.includes('@taiga-ui/core/styles/taiga-ui-local')) {
        return fileContent;
    }
    return fileContent.replaceAll('.scroll-behavior()', 'scroll-behavior: var(--tui-scroll-behavior)');
}
exports.migrateScrollbarBehavior = migrateScrollbarBehavior;
