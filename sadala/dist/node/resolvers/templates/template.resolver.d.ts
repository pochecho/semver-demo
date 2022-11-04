import { TemplateConfiguration } from "./interfaces/template-configuration.interface";
export declare abstract class TemplateResolver {
    abstract getTemplate(configuration: TemplateConfiguration): Array<Element>;
    abstract parseItemsIntoContainer(items: Array<any>, template: string, selector: string, shadowRoot: ShadowRoot): void;
    abstract convertTemplateToNodes(template: string): NodeListOf<Element>;
    abstract mapItemsToTemplate(items: Array<any>, template: string): Array<Array<Element>>;
}
