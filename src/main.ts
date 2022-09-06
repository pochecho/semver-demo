import { ComplexInput } from './components/complex-input/complex-input.component';
import { InputSelect } from "./components/input-select/input-select.component";
import { prefix } from "./configuration";


customElements.define(`${prefix}-${ComplexInput.identifierName}`, ComplexInput);
customElements.define(`${prefix}-${InputSelect.identifierName}`, InputSelect);
