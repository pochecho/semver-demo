export interface BaseCallback {
    callback: Function;
    parameters: any[];
    context: any;
}
export interface TemplateConfiguration {
    path?: string;
    template?: string;
    scope?: {
        [index: string]: any;
    };
    style?: string;
}
export declare abstract class BaseComponent<Configuration> extends HTMLElement {
    pendingsCall: Array<BaseCallback>;
    rendered: boolean;
    configuration: Configuration;
    innerShadowDomRoot: ShadowRoot;
    generateBaseStructure: Function | undefined;
    observedAttributesNames: Array<string>;
    attributeListeners: any;
    constructor();
    parseItemsIntoContainer(items: Array<any>, template: string, selector: string): void;
    onUpdate(attributeName: string, callback: Function): void;
    initialize(): void;
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    private convertTemplateToNodes;
    mapItemsToTemplate(items: Array<any>, template: string): Array<NodeListOf<Element>>;
    getTemplate(configuration: TemplateConfiguration): NodeListOf<Element>;
    addBaseTemplate(configuration: TemplateConfiguration): void;
    setConfiguration(configuration: any): void;
}
