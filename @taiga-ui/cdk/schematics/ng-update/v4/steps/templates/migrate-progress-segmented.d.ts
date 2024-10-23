import type { UpdateRecorder } from '@angular-devkit/schematics';
import type { DevkitFileSystem } from 'ng-morph';
import type { TemplateResource } from '../../../../ng-update/interfaces';
export declare function migrateProgressSegmented({ resource, recorder, fileSystem, }: {
    fileSystem: DevkitFileSystem;
    recorder: UpdateRecorder;
    resource: TemplateResource;
}): void;
