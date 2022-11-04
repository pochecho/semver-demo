import { DOMHelpers } from "../../helpers/DOMHelpers";
import { TransformedState } from "./HTMLTemplate.resolver";
export interface GenericControlStructure {
    transpile: (expresion: string) => string;
    resolve: (transpiledExpression: string) => string;
}
export declare class ConditionControlStructure implements GenericControlStructure {
    transpile(expression: string): string;
    resolve(transpiledExpression: string): string;
}
export declare class LoopControlStructure implements GenericControlStructure {
    transpile(expression: string): string;
    resolve(transpiledExpression: string): string;
}
export declare class ViewEngine {
    controlStructurePipeline: {
        name: string;
        gear: GenericControlStructure;
    }[];
    prefixControlStructure: string;
    domHelpers: DOMHelpers;
    constructor();
    transformNameToLowerCamelCase(name: string): string;
    private createScope;
    private evalControlStructureExpression;
    private eval;
    searchControlStructures(templateNodes: NodeListOf<Element>, state: TransformedState): any;
    getDependentsVariables(): void;
}
