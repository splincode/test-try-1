import type { UpdateRecorder } from '@angular-devkit/schematics';
import type { DevkitFileSystem } from 'ng-morph';
import type { TemplateResource } from '../../../../interfaces';
export declare function migrateToggle({ resource, recorder, fileSystem, }: {
    fileSystem: DevkitFileSystem;
    recorder: UpdateRecorder;
    resource: TemplateResource;
}): void;
