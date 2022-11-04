// console.log((resolveComponentName as any)[1]("g", "ui"));

import { AccordionsGroup } from "./components/accordions-group/accordion-group.component";
import { Accordion } from "./components/accordion/accordion.component";
import { ComplexInput } from "./components/complex-input/complex-input.component";
import { Icon } from "./components/icon/icon.component";
import { InputSelect } from "./components/input-select/input-select.component";
import { DESIGN_SYSTEM_CONFIGURATION } from "./desing-system.configuration";
const prefix = DESIGN_SYSTEM_CONFIGURATION.prefix;
customElements.define(`${prefix}-${Icon.identifierName}`, Icon);
customElements.define(`${prefix}-${Accordion.identifierName}`, Accordion);
customElements.define(`${prefix}-${ComplexInput.identifierName}`, ComplexInput);
customElements.define(`${prefix}-${InputSelect.identifierName}`, InputSelect);
customElements.define(
  `${prefix}-${AccordionsGroup.identifierName}`,
  AccordionsGroup
);
