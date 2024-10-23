import type { JsonArray, JsonObject, workspaces } from '@angular-devkit/core';
export declare function getProjectTargetOptions(project: workspaces.ProjectDefinition, buildTarget: string): Record<string, JsonArray | JsonObject | boolean | number | string | null | undefined>;
