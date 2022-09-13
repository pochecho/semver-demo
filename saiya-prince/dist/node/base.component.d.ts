import { StylesResolver } from "./resolvers/styles/styles.resolver";
import { TemplateConfiguration } from "./resolvers/templates/interfaces/template-configuration.interface";
export interface BaseCallback {
    callback: Function;
    parameters: any[];
    context: any;
}
export declare abstract class BaseComponent<Configuration> extends HTMLElement {
    stylesResolver: StylesResolver;
    pendingsCall: Array<BaseCallback>;
    rendered: boolean;
    $configuration: Configuration;
    innerShadowDomRoot: ShadowRoot;
    generateBaseStructure: Function | undefined;
    observedAttributesNames: Array<string>;
    attributeListeners: any;
    constructor();
    parseItemsIntoContainer(items: Array<any>, template: string, selector: string): void;
    removeChilds(parent: HTMLElement): void;
    onUpdate(attributeName: string, callback: Function): void;
    initialize(): void;
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    private convertTemplateToNodes;
    mapItemsToTemplate(items: Array<any>, template: string): Array<NodeListOf<Element>>;
    getTemplate(configuration: TemplateConfiguration): NodeListOf<Element>;
    addBaseTemplate(configuration: TemplateConfiguration): void;
    addStyleToShadowRoot(styles: any, shadowRoot: ShadowRoot): void;
    setConfiguration(configuration: any): any;
}
