import { prefix } from "../../configuration";
import { BaseComponent } from "../../framework/base.component";
import {
  InputSelectConfiguration,
  InputSelectItems,
} from "./input-select.configuration";
import baseTemplateHTML from "./templates/base-input-select.html";
import itemHTML from "./templates/item.html";
import baseTemplateStyle from "./input-select.component.scss";
import { LIST_CONTAINER_SELECTOR } from "./input-select.selectors";

export class InputSelect extends BaseComponent<InputSelectConfiguration> {
  static identifierName = "input-select";

  // constructor: Ejecutado al instanciar el componente
  // conectedCallback: Ejecutado al insertar en el DOM
  // disconnectedCallback Ejecutado al retirarlo del DOM
  // attributeChangedCallback: Ejecutado al cambiar uno de sus atributos
  // adoptedCallback: Ejecutado cuando el componente se mueve a otro documento

  constructor() {
    super();

    this.generateBaseStructure = this._generateBaseStructure;

    this.onUpdate("items", (items: Array<any>) => {
      this.parseItemsIntoContainer(items, itemHTML, LIST_CONTAINER_SELECTOR);
    });
  }

  setConfiguration(configuration: InputSelectConfiguration): void {
    super.setConfiguration(configuration);
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  _generateBaseStructure() {
    this.addBaseTemplate({
      template: baseTemplateHTML,
      scope: {
        prefix: prefix,
        label: this.configuration.label || "Raulcito",
      },
      style: baseTemplateStyle,
    });
  }

  connectedCallback() {
    this.initialize();

    this.addEventListener("checho", (event) => {
      console.log(event);
    });

    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return ["items"];
  }

  adoptedCallback() {}

  render() {}
}
