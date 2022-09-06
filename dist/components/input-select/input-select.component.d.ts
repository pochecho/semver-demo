import { BaseComponent } from "../../framework/base.component";
import { InputSelectConfiguration } from "./input-select.configuration";
export declare class InputSelect extends BaseComponent<InputSelectConfiguration> {
    static identifierName: string;
    constructor();
    setConfiguration(configuration: InputSelectConfiguration): void;
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    _generateBaseStructure(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    static get observedAttributes(): string[];
    adoptedCallback(): void;
    render(): void;
}
