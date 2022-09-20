import { BaseComponent } from "@bancolombia/sadala";
import { InputSelectConfiguration } from "./input-select.configuration";
export declare class InputSelect extends BaseComponent<InputSelectConfiguration, any> {
    static identifierName: string;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
}
