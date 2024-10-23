import type { workspaces } from '@angular-devkit/core';
import type { TuiSchema } from '../ng-add/schema';
export declare function getProjects(options: TuiSchema, workspace: workspaces.WorkspaceDefinition): workspaces.ProjectDefinition[];
