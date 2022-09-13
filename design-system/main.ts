import { Accordion } from './components/accordion/accordion.component';
import { ComplexInput } from './components/complex-input/complex-input.component';
import { FormField } from './components/form-field/form-field.component';
import { Icon } from './components/icon/icon.component';
import { InputSelect } from "./components/input-select/input-select.component";
import { prefix } from "./desing-system.configuration";


customElements.define(`${prefix}-${Icon.identifierName}`, Icon);
customElements.define(`${prefix}-${FormField.identifierName}`, FormField);
customElements.define(`${prefix}-${Accordion.identifierName}`, Accordion);
customElements.define(`${prefix}-${ComplexInput.identifierName}`, ComplexInput);
customElements.define(`${prefix}-${InputSelect.identifierName}`, InputSelect);
