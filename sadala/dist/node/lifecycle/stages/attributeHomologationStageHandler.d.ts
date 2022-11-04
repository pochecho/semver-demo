import { BaseComponent } from "../../base.component";
import { StageHandler } from "./stageHandler";
export declare class AttributeChangedEvent {
    static identifier: string;
    static create(attribute: string, previousValue: any, value: any): CustomEvent<{
        attribute: string;
        previousValue: any;
        value: any;
    }>;
}
export declare class AttributeHomologationStage implements StageHandler {
    component: BaseComponent<any, any>;
    attributeHomologationCalls: Array<{
        attributeName: string;
        origin: "programatic" | "inline";
        value: any;
    }>;
    constructor(component: BaseComponent<any, any>);
    init(): void;
    private createDefaultConfiguration;
    private homologate;
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    toString(data: any): string;
    fromString(data: string): any;
    private setConfiguration;
    private perfomAction;
}
