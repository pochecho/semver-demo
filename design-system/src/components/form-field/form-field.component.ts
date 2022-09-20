import { DESIGN_SYSTEM_CONFIGURATION } from "../../desing-system.configuration";
import { BaseComponent } from "@bancolombia/sadala";
import _formFieldStyles_ from "./styles/form-field.scss";
import _formFieldBaseTemplate_ from "./templates/base.html";

export class FormField extends BaseComponent<any, any> {
  static identifierName = "form-field";
  constructor() {
    super(DESIGN_SYSTEM_CONFIGURATION);
    // this.lifeCycle["base-template-configuration"] = () => {
    //   this._generateBaseStructure();
    // }
  }
  // private _generateBaseStructure() {
  //   this.addBaseTemplate({
  //     template: _formFieldBaseTemplate_,
  //     scope: {
  //       prefix: this.designSystemConfiguration.prefix,
  //     },
  //     style: _formFieldStyles_,
  //   });
  // }


}
