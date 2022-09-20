import { BaseComponent } from "../../base.component";
import { StageHandler } from "./stageHandler";
export declare class StateInitializationStage implements StageHandler {
    component: BaseComponent<any, any>;
    constructor(component: BaseComponent<any, any>);
    init(): void;
}
