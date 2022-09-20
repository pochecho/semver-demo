import { IconConfiguration } from "./icon.configuration";
import { BaseComponent } from "@bancolombia/sadala";
export declare class Icon extends BaseComponent<IconConfiguration, any> {
    static identifierName: string;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
}
