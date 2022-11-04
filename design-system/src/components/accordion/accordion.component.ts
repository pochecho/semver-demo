import { DESIGN_SYSTEM_CONFIGURATION } from "../../desing-system.configuration";
import { AccordionConfiguration } from "./accordion.configuration";
import { ACCORDION_SELECTORS } from "./accordion.selectors";
import _accordionBaseStyles_ from "./styles/accordion.scss";
import _accordionBaseTemplate_ from "./templates/accordion.template.html";
import { BaseComponent } from "@bancolombia/sadala";

const ACCORDION_ATTRIBUTES = ["icon-left", "title"];

export class Accordion extends BaseComponent<AccordionConfiguration, any> {
  static identifierName = "accordion";

  static get observedAttributes() {
    return ACCORDION_ATTRIBUTES;
  }

  constructor() {
    super(DESIGN_SYSTEM_CONFIGURATION);
    this.attributesNames = ACCORDION_ATTRIBUTES;

    this.lifeCycleManager.lifeCycle["template-configuration"] = {
      callback: () => {
        this._generateBaseStructure();
      },
      trigger: "after-connection",
    };

    this.lifeCycleManager.runStages("before-connection");
  }

  connectedCallback(): void {
    super.connectedCallback();
  }
  private _generateBaseStructure() {
    this.addBaseTemplate({
      template: _accordionBaseTemplate_,
      style: _accordionBaseStyles_,
    });

    const toggleButton = this.innerShadowDomRoot.querySelector(
      ACCORDION_SELECTORS["toggle-button"]
    );
    const header = this.innerShadowDomRoot.getElementById("header");

    if (!!toggleButton) {
      toggleButton.addEventListener("click", () => {
        if (!!header) {
          console.log(toggleButton, header);
          header.setAttribute(
            "aria-expanded",
            String(!(header.getAttribute("aria-expanded") == "true"))
          );
          this.classList.toggle("bc-active");
        }
      });
    }

    //    const a = {
    //         'super basic': _accordionBaseTemplate_
    //     }
  }
}
