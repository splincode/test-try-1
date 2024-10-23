"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_FILES = exports.ALL_TS_FILES = void 0;
const EXCLUDE_DIRECTORIES = [
    'e2e',
    // compiled
    'scripts',
    'dist',
    'node_modules',
    'coverage',
    'dll',
    'tmp',
    '__build__',
    // hidden directories
    '.rpt2_cache',
    '.husky',
    '.vscode',
    '.idea',
    '.github',
    '.gitlab',
    '.devplatform',
    '.angular',
    '.tmp',
    '.nx',
].join('|');
const EXCLUDE_FILE_PATTERNS = [
    '*__name@dasherize__*',
    '*__name@camelize__*',
    '*__name@underscore__*',
    '*.d', // typings
].join('|');
exports.ALL_TS_FILES = [
    `!(${EXCLUDE_FILE_PATTERNS}).ts`,
    `!(${EXCLUDE_DIRECTORIES})/**/!(${EXCLUDE_FILE_PATTERNS}).ts`,
];
exports.ALL_FILES = [
    `!(${EXCLUDE_FILE_PATTERNS}).{html,ts,less,sass,scss,css,json}`,
    `!(${EXCLUDE_DIRECTORIES})/**/!(${EXCLUDE_FILE_PATTERNS}).{html,ts,less,sass,scss,css,json}`,
];
