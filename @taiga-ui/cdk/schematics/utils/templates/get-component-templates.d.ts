import type { ClassDeclaration, Pattern, Query, StructureType } from 'ng-morph';
import type { TemplateResource } from '../../ng-update/interfaces/template-resource';
export declare function getComponentTemplates(pattern: Pattern, query?: Query<Omit<StructureType<ClassDeclaration>, 'kind'>>): TemplateResource[];
