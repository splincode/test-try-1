"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoot = void 0;
const projectRoot = () => process.env.ROOT_PATH || '/';
exports.projectRoot = projectRoot;
