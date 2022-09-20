import { TemplateConfiguration } from "./interfaces/template-configuration.interface";

export abstract class TemplateResolver {
  abstract getTemplate(
    configuration: TemplateConfiguration
  ): NodeListOf<Element>;
  abstract parseItemsIntoContainer(
    items: Array<any>,
    template: string,
    selector: string,
    shadowRoot: ShadowRoot
  ): void;
  abstract convertTemplateToNodes(template: string): NodeListOf<Element>;
  abstract mapItemsToTemplate(
    items: Array<any>,
    template: string
  ): Array<NodeListOf<Element>>;
}
