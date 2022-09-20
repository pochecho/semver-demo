import { DOMHelpers } from "../../helpers/DOMHelpers";
import { TemplateConfiguration } from "./interfaces/template-configuration.interface";
import { TemplateResolver } from "./template.resolver";

const patterns = [
  {
    pattern: /([a-zA-Z0-9\-]+)(@)/gm,
    tokenExtractor: (result: RegExpExecArray) => {
      return { identifier: result[1], match: result[0] };
    },
  },
  {
    pattern: /(\{\{)([a-zA-Z0-9\-]+)(\}\})/gm,
    tokenExtractor: (result: RegExpExecArray) => {
      return { identifier: result[2], match: result[0] };
    },
  },
];

export class HTMLTemplateResolver extends TemplateResolver {
  domHelpers: DOMHelpers;

  constructor(domHelpers: DOMHelpers) {
    super();
    this.domHelpers = domHelpers;
  }
  /**
   * Turn a string HTML into a Node HTML
   * @param template String HTML content that is wished to convert to HTML Node
   * @returns Template turned to Node
   */
  convertTemplateToNodes(template: string): NodeListOf<Element> {
    const domParser = new DOMParser();
    const innerDocument: Document = domParser.parseFromString(
      template,
      "text/html"
    );
    const content: NodeListOf<Element> =
      innerDocument.body.querySelectorAll(":scope > *");
    return content;
  }

  getTemplate(configuration: TemplateConfiguration): NodeListOf<Element> {
    let template = configuration.template;
    const scope = configuration.scope || {};
    let transformedTemplate: string = template;
    for (const patternConfig of patterns) {
      const pattern = patternConfig.pattern;
      let currentlyResult = pattern.exec(template);
      while (!!currentlyResult) {
        const { match, identifier } =
          patternConfig.tokenExtractor(currentlyResult);
        transformedTemplate = transformedTemplate.replace(
          match,
          scope[identifier] || match
        );
        currentlyResult = pattern.exec(template);
      }
    }

    return this.convertTemplateToNodes(transformedTemplate);
  }

  /**
   * Map a array of items using a template html. The template will be mapped with the
   * properties inside each item in items param, and then, that content will be put into the container.
   * @param items Array of items with a open interface
   * @param template Template to use
   * @param selector Container where the items will be placed
   *
   * @example
   *  items = [
   *    {
   *      name: 'loop'
   *    },
   *    {
   *      name: 'boot'
   *    }
   *  ]
   *
   *  template = '<li>{name}</li>'
   *
   *  selector = 'div.any'
   *
   *  RESULT:
   *
   *  `<div class='any'>
   *    <li>loop</li>
   *    <li>boot</li>
   *  </div>`
   */
  parseItemsIntoContainer(
    items: Array<any>,
    template: string,
    selector: string,
    shadowRoot: ShadowRoot
  ): void {
    const parsedItems: NodeListOf<Element>[] = this.mapItemsToTemplate(
      items,
      template
    );
    const container = shadowRoot.querySelector(selector) as HTMLUListElement;
    this.domHelpers.removeAllChildren(container);
    parsedItems.forEach((x) => x.forEach((y) => container.appendChild(y)));
  }

  mapItemsToTemplate(
    items: Array<any>,
    template: string
  ): Array<NodeListOf<Element>> {
    return items.map((x) =>
      this.getTemplate({
        template,
        scope: {
          ...x,
        },
      })
    );
  }
}
