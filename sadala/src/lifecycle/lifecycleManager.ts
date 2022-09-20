import { BaseComponent } from "../base.component";
import {
  LifeCycle,
  lifeCycleOrder,
  LifeCycleStages,
  LifeCycleTriggers,
} from "./lifecycle";
import { AttributeHomologationStage } from "./stages/attributeHomologationStageHandler";
import { StateInitializationStage } from "./stages/stateInitializationStageHandler";

export class LifeCycleManager {
  lifeCycle: LifeCycle;
  component: BaseComponent<any, any>;

  attributeHomologationStage: AttributeHomologationStage;
  stateInitializationStage: StateInitializationStage;

  constructor(component: BaseComponent<any, any>) {
    this.component = component;

    this.attributeHomologationStage = new AttributeHomologationStage(component);
    this.stateInitializationStage = new StateInitializationStage(component);

    this.lifeCycle = {
      "attribute-homologation": {
        callback: () => this.attributeHomologationStage.init(),
        trigger: "before-connection",
      },
      "state-initialization": {
        callback: () => this.stateInitializationStage.init(),
        trigger: "before-connection",
      },
    };
  }

  runStages(trigger: LifeCycleTriggers) {
    lifeCycleOrder.forEach((stageName: string) => {
      const stage = this.lifeCycle[stageName as LifeCycleStages];
      if (!!stage?.callback && stage.trigger === trigger) {
        stage.callback();
      }
    });
  }
}
