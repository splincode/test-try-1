import type { DevkitFileSystem } from 'ng-morph';
import type { ReplacementAttributeToDirective, TemplateResource } from '../../interfaces';
export declare function replaceAttrsByDirective({ resource, fileSystem, data, }: {
    fileSystem: DevkitFileSystem;
    resource: TemplateResource;
    data: ReplacementAttributeToDirective[];
}): void;
