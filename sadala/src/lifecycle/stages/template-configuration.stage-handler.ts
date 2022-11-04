import { BaseComponent } from "../../base.component";
import { StageHandler } from "./stageHandler";

export class TemplateConfigurationStage implements StageHandler {
  component: BaseComponent<any, any>;
  constructor(component: BaseComponent<any, any>) {
    this.component = component;
  }

  init() {
    console.log('Wake up ',  {
      ...this.component.designSystemConfiguration,
      ...this.component.configurationRef,
    },);
    
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
