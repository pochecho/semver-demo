import { DOMHelpers } from "../../helpers/DOMHelpers";
import { TemplateConfiguration } from "./interfaces/template-configuration.interface";
import { TemplateResolver } from "./template.resolver";
export interface Pattern {
    pattern: RegExp;
    tokenExtractor: (result: RegExpExecArray) => {
        identifier: string;
        match: string;
    };
}
export interface TransformedState {
    [index: string]: string;
}
export interface StatePropertyNamesMapper {
    [index: string]: string;
}
export declare class HTMLTemplateResolver extends TemplateResolver {
    tagPattern: Pattern;
    valuePattern: Pattern;
    domHelpers: DOMHelpers;
    constructor(domHelpers: DOMHelpers);
    convertTemplateToNodes(template: string): NodeListOf<Element>;
    private transformState;
    getTemplate(configuration: TemplateConfiguration): Array<Element>;
    private resolvePattern;
    parseItemsIntoContainer(items: Array<any>, template: string, selector: string, shadowRoot: ShadowRoot): void;
    mapItemsToTemplate(items: Array<any>, template: string): Array<Array<Element>>;
}
