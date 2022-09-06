import { prefix } from "../../configuration";
import { BaseComponent } from "../../framework/base.component";
import baseTemplateHTML from "./templates/base-complex-input.html";
import baseTemplateStyle from "./input.styles.scss";

export class ComplexInput extends BaseComponent<any> {
  static identifierName = "complex-input";

  // constructor: Ejecutado al instanciar el componente
  // conectedCallback: Ejecutado al insertar en el DOM
  // disconnectedCallback Ejecutado al retirarlo del DOM
  // attributeChangedCallback: Ejecutado al cambiar uno de sus atributos
  // adoptedCallback: Ejecutado cuando el componente se mueve a otro documento

  constructor() {
    super();

    this.generateBaseStructure = this._generateBaseStructure;
  }

  setConfiguration(configuration: any): void {
    super.setConfiguration(configuration);
  }

  _generateBaseStructure() {

    this.addBaseTemplate({
      template: baseTemplateHTML,
      scope: {
        prefix: prefix,
        label: this.getAttribute('label'),
        'icon-left': this.getAttribute('icon-left')
      },
      style: baseTemplateStyle,
    });
  }

  connectedCallback() {
    this.initialize();

    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return ["color", "text"];
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (name === "color") {
      if (!oldValue) {
      }
    }
  }

  adoptedCallback() {
  }

  render() {}
}
