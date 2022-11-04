import { IconConfiguration } from "./icon.configuration";
import { BaseComponent } from "@bancolombia/sadala";

import baseTemplateStyle from "./styles/icon.scss";
import _baseTemplate_ from "./templates/base.template.html";
import { DESIGN_SYSTEM_CONFIGURATION } from "../../desing-system.configuration";

const ICON_ATTRIBUTES = ["name"];

export class Icon extends BaseComponent<IconConfiguration, any> {
  static identifierName = "icon";

  static get observedAttributes() {
    return ICON_ATTRIBUTES;
  }

  constructor() {
    super(DESIGN_SYSTEM_CONFIGURATION);
    this.attributesNames = ICON_ATTRIBUTES;


    this.lifeCycleManager.lifeCycle["template-configuration"] = {
      callback: () => {
        this.addBaseTemplate({
          template: _baseTemplate_,
          style: baseTemplateStyle,
        });
      },
      trigger: "after-connection",
    };

    this.lifeCycleManager.runStages("before-connection");

  }

  connectedCallback(): void {
   
    super.connectedCallback();
  }
}
