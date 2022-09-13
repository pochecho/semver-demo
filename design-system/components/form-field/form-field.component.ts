import { prefix } from "../../desing-system.configuration";
import { BaseComponent } from "../../../saiya-prince/src/base.component";
import _formFieldStyles_ from "./styles/form-field.scss";
import _formFieldBaseTemplate_ from "./templates/base.html";

export class FormField extends BaseComponent<void> {
  static identifierName = "form-field";
  constructor() {
    super();
    this.generateBaseStructure = this._generateBaseStructure;
  }
  private _generateBaseStructure() {
    this.addBaseTemplate({
      template: _formFieldBaseTemplate_,
      scope: {
        prefix: prefix,
      },
      style: _formFieldStyles_,
    });
  }

  connectedCallback() {
    this.initialize();
  }
}
