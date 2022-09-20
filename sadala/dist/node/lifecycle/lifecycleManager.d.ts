import { BaseComponent } from "../base.component";
import { LifeCycle, LifeCycleTriggers } from "./lifecycle";
import { AttributeHomologationStage } from "./stages/attributeHomologationStageHandler";
import { StateInitializationStage } from "./stages/stateInitializationStageHandler";
export declare class LifeCycleManager {
    lifeCycle: LifeCycle;
    component: BaseComponent<any, any>;
    attributeHomologationStage: AttributeHomologationStage;
    stateInitializationStage: StateInitializationStage;
    constructor(component: BaseComponent<any, any>);
    runStages(trigger: LifeCycleTriggers): void;
}
