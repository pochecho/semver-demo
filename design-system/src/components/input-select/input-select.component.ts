import { DESIGN_SYSTEM_CONFIGURATION } from "../../desing-system.configuration";
import { BaseComponent } from "@bancolombia/sadala";
import { InputSelectConfiguration } from "./input-select.configuration";
import _baseTemplate_ from "./templates/base.template.html";
import _itemTemplate_ from "./templates/item.html";
import _baseTemplateStyle_ from "./styles/input-select.scss";
import { LIST_CONTAINER_SELECTOR } from "./input-select.selectors";

const INPUT_SELECT_ATTRIBUTES = ["items", "label"];
export class InputSelect extends BaseComponent<InputSelectConfiguration, any> {
  static identifierName = "input-select";
  static get observedAttributes() {
    return INPUT_SELECT_ATTRIBUTES;
  }

  constructor() {
    super(DESIGN_SYSTEM_CONFIGURATION);
    this.attributesNames = INPUT_SELECT_ATTRIBUTES;

    this.lifeCycleManager.lifeCycle["template-configuration"] = {
      callback: () => {
        this.addBaseTemplate({
          template: _baseTemplate_,
          style: _baseTemplateStyle_,
        });
      },
      trigger: "after-connection",
    };

    this.lifeCycleManager.runStages("before-connection");

    this.spyAttribute("items", (data: any) => {
      const items = data["value"];

      this.templateResolver.parseItemsIntoContainer(
        items,
        _itemTemplate_,
        LIST_CONTAINER_SELECTOR,
        this.innerShadowDomRoot
      );
    });

    this.spyAttribute("label", (data: any) => {
      console.log(data);
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
  }
}
