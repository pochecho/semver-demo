import { DESIGN_SYSTEM_CONFIGURATION } from "../../desing-system.configuration";
import { BaseComponent } from "@bancolombia/sadala";
import baseTemplateHTML from "./templates/base-complex-input.html";
import baseTemplateStyle from "./styles/complex-input.scss";

const COMPLEX_INPUT_ATTRIBUTES = [
  "label",
  "icon-left",
  "icon-right",
  "type",
  "entry",
  "help-text",
  "state",
  "pre",
  "placeholder",
  "character-counter-range",
];
export class ComplexInput extends BaseComponent<any, any> {
  static identifierName = "complex-input";

  constructor() {
    super(DESIGN_SYSTEM_CONFIGURATION);
    this.attributesNames = COMPLEX_INPUT_ATTRIBUTES;

    this.lifeCycleManager.lifeCycle["template-configuration"] = {
      callback: () => {
        this.addBaseTemplate({
          template: baseTemplateHTML,
          style: baseTemplateStyle,
        });

        // setTimeout(() => {

        //   const input: HTMLInputElement | null= this.innerShadowDomRoot.querySelector<HTMLInputElement>(":scope > input");
        //   console.log(input);

        //   if (!!input) input.value = "Sergio ";
        // }, 3000);
      },
      trigger: "after-connection",
    };

    this.lifeCycleManager.runStages("before-connection");
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      const input: HTMLInputElement | null =
        this.innerShadowDomRoot.querySelector<HTMLInputElement>(
          "input"
        );
      console.log(input);
      console.log(this.innerShadowDomRoot);
//*[@id="input-1"]
      if (!!input) {
        input.classList.add("bc-active");
      }
    }, 1000);
  }

  static get observedAttributes() {
    return COMPLEX_INPUT_ATTRIBUTES;
  }
}
