import { AccordionConfiguration } from "./accordion.configuration";
import { BaseComponent } from "@bancolombia/sadala";
export declare class Accordion extends BaseComponent<AccordionConfiguration, any> {
    static identifierName: string;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    private _generateBaseStructure;
}
