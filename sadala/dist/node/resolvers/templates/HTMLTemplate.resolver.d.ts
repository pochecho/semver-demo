import { DOMHelpers } from "../../helpers/DOMHelpers";
import { TemplateConfiguration } from "./interfaces/template-configuration.interface";
import { TemplateResolver } from "./template.resolver";
export declare class HTMLTemplateResolver extends TemplateResolver {
    domHelpers: DOMHelpers;
    constructor(domHelpers: DOMHelpers);
    convertTemplateToNodes(template: string): NodeListOf<Element>;
    getTemplate(configuration: TemplateConfiguration): NodeListOf<Element>;
    parseItemsIntoContainer(items: Array<any>, template: string, selector: string, shadowRoot: ShadowRoot): void;
    mapItemsToTemplate(items: Array<any>, template: string): Array<NodeListOf<Element>>;
}
