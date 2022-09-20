import { BaseComponent } from "../../base.component";
import { StageHandler } from "./stageHandler";

export class StateInitializationStage implements StageHandler {
  component: BaseComponent<any, any>;
  constructor(component: BaseComponent<any, any>) {
    this.component = component;
  }

  init() {
    this.component.state = new Proxy(
      {
        ...this.component.designSystemConfiguration,
        ...this.component.configurationRef,
      },
      {
        set: (target, property, value) => {
          this.component.dispatchEvent(
            new CustomEvent("state-updated", {
              detail: {
                property,
                value,
              },
            })
          );
          target[property] = value;
          return true;
        },
      }
    );

  }
}
