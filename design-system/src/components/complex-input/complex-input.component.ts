import { DESIGN_SYSTEM_CONFIGURATION } from "../../desing-system.configuration";
import { BaseComponent } from "@bancolombia/sadala";
import baseTemplateHTML from "./templates/base-complex-input.html";
import baseTemplateStyle from "./styles/complex-input.scss";

const COMPLEX_INPUT_ATTRIBUTES = [
  "color",
  "text",
  "label",
  "icon-left",
  "icon-right",
];
export class ComplexInput extends BaseComponent<any, any> {
  static identifierName = "complex-input";

  constructor() {
    super(DESIGN_SYSTEM_CONFIGURATION);
    this.attributesNames = COMPLEX_INPUT_ATTRIBUTES;

    this.lifeCycleManager.lifeCycle["base-template-configuration"] = {
      callback: () => {
        this.addBaseTemplate({
          template: baseTemplateHTML,
          style: baseTemplateStyle,
        });
      },
      trigger: "after-connection",
    };

    this.lifeCycleManager.runStages("before-connection");
  }

  connectedCallback() {
    super.connectedCallback();
  }

  static get observedAttributes() {
    return COMPLEX_INPUT_ATTRIBUTES;
  }
}
