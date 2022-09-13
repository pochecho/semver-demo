import { BaseComponent } from "../../../saiya-prince/src/base.component";
import { IconConfiguration } from "./icon.configuration";
import baseTemplateStyle from "./styles/icon.scss";
import _baseTemplate_ from './templates/base.template.html'
import { prefix } from "../../desing-system.configuration";

export class Icon extends BaseComponent<IconConfiguration> {
  static identifierName = "icon";

  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();
    this.generateBaseStructure = this._generateBaseStructure;
  }

  setConfiguration(configuration: IconConfiguration): any {
    return super.setConfiguration(configuration);
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  _generateBaseStructure() {
    this.addBaseTemplate({
      template: _baseTemplate_,
      scope: {
        prefix,
        name: this.getAttribute("name"),
      },
      style: baseTemplateStyle,
    });
  }
  connectedCallback() {
    this.initialize();

    // const style = document.createElement("style");

    // style.innerText = this.stylesResolver.formatStyles(baseTemplateStyle);
    // this.innerShadowDomRoot.appendChild(style);
    // this.innerShadowDomRoot.append("home");
    // this.innerShadowDomRoot.innerHTML += this.innerText;
  }
}
