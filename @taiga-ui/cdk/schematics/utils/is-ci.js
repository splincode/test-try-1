"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.tuiIsCI = void 0;
/**
 * @deprecated: drop in v5.0
 */
function tuiIsCI() {
    return (process.env.TUI_CI === 'true' ||
        !!process.env.CI || // Another CI
        !!process.env.GITHUB_ACTION || // Github CI
        !!process.env.GITLAB_CI || // Gitlab CI
        !!process.env.CIRCLECI || // Circle CI
        !!process.env.TF_BUILD || // Azure CI
        !!process.env.CIRRUS_CI || // Cirrus CI
        !!process.env.BUILDKITE || // Build Kite CI
        !!process.env.HEROKU_TEST_RUN_ID || // Heroku CI
        !!process.env.CODEBUILD_BUILD_ID || // CodeBuild CI
        !!process.env.TEAMCITY_VERSION || // TeamCity CI
        !!process.env.BUILD_ID // Jenkins/Hudson
    );
}
exports.tuiIsCI = tuiIsCI;
