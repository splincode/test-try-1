import type { TuiSchema } from '../../ng-add/schema';
import type { RemovedModule } from '../interfaces/removed-module';
export declare function removeModules(options: TuiSchema, modules: readonly RemovedModule[]): void;
export declare function removeModule(name: string, moduleSpecifier: string): void;
