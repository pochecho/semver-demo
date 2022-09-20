import { BaseComponent } from "@bancolombia/sadala";
import _accordionGroupBaseStyles_ from "./styles/accordions-group.styles.scss";
import { DESIGN_SYSTEM_CONFIGURATION } from '../../desing-system.configuration';
export class AccordionsGroup extends BaseComponent<any, any> {
  static identifierName = "accordions-group";
  constructor() {
    super(DESIGN_SYSTEM_CONFIGURATION);
    // this.lifeCycle["base-template-configuration"] = () => {
    //   this._generateBaseStructure();
    // };
  }

  // private _generateBaseStructure() {
  //   this.addStyleToShadowRoot(
  //     _accordionGroupBaseStyles_,
  //     this.innerShadowDomRoot
  //   );
  // }
}
