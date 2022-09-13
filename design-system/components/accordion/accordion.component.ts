import { BaseComponent } from "../../../saiya-prince/src/base.component";
import _accordionBaseTemplate_ from "./templates/base.html";
import _accordionBaseStyles_ from "./styles/accordion.scss";
import { prefix } from "../../desing-system.configuration";
import { ACCORDION_SELECTORS } from "./accordion.selectors";
import { AccordionConfiguration } from "./accordion.configuration";

export class Accordion extends BaseComponent<AccordionConfiguration> {
  static identifierName = "accordion";
  constructor() {
    super();
    this.generateBaseStructure = this._generateBaseStructure;
  }
  private _generateBaseStructure() {
    this.addBaseTemplate({
      template: _accordionBaseTemplate_,
      scope: {
        prefix: prefix,
        "icon-left": this.getAttribute("icon-left"),
      },
      style: _accordionBaseStyles_,
    });

    const toggleButton =
      this.innerShadowDomRoot.querySelector(ACCORDION_SELECTORS["toggle-button"])
    const header = this.innerShadowDomRoot.getElementById("header");
    
    if (!!toggleButton) {
        toggleButton.addEventListener("click", () => {
            if (!!header) {
            console.log(toggleButton,header);
          header.setAttribute(
            "aria-expanded",
            String(!(header.getAttribute("aria-expanded") == "true"))
          );
          this.classList.toggle('bc-active')
        }
      });
    }

//    const a = {
//         'super basic': _accordionBaseTemplate_ 
//     }
  }

  connectedCallback() {
    this.initialize();
  }
}
