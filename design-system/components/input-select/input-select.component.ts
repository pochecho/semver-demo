import { prefix } from "../../desing-system.configuration";
import { BaseComponent } from "../../../saiya-prince/src/base.component";
import { InputSelectConfiguration } from "./input-select.configuration";
import _baseTemplate_ from "./templates/base.template.html";
import _item_ from "./templates/item.html";
import baseTemplateStyle from "./styles/input-select.scss";
import { LIST_CONTAINER_SELECTOR } from "./input-select.selectors";

export class InputSelect extends BaseComponent<InputSelectConfiguration> {
  static identifierName = "input-select";

  static get observedAttributes() {
    return ["items"];
  }

  constructor() {
    super();

    this.generateBaseStructure = this._generateBaseStructure;

    this.onUpdate("items", (items: Array<any>) => {
      this.parseItemsIntoContainer(items, _item_, LIST_CONTAINER_SELECTOR);
    });
  }

  setConfiguration(configuration: InputSelectConfiguration): any {
    return super.setConfiguration(configuration);
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  _generateBaseStructure() {
    this.addBaseTemplate({
      template: _baseTemplate_,
      scope: {
        prefix: prefix,
        label: this.getAttribute("label") || "Raulcito",
      },
      style: baseTemplateStyle,
    });
  }

  connectedCallback() {
    this.initialize();
  }
}
