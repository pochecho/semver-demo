import { BaseComponent } from "../../framework/base.component";
export declare class ComplexInput extends BaseComponent<any> {
    static identifierName: string;
    constructor();
    setConfiguration(configuration: any): void;
    _generateBaseStructure(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    adoptedCallback(): void;
    render(): void;
}
