import { SCSSStylesResolver } from "./resolvers/styles/scss-styles.resolver";
import { StylesResolver } from "./resolvers/styles/styles.resolver";
import { TemplateConfiguration } from "./resolvers/templates/interfaces/template-configuration.interface";

export interface BaseCallback {
  callback: Function;
  parameters: any[];
  context: any;
}



export abstract class BaseComponent<Configuration> extends HTMLElement {
  stylesResolver: StylesResolver;

  pendingsCall: Array<BaseCallback>;
  rendered: boolean;

  $configuration: Configuration;
  innerShadowDomRoot!: ShadowRoot;

  generateBaseStructure: Function | undefined;
  observedAttributesNames: Array<string>;
  attributeListeners: any;

  constructor() {
    super();
    this.stylesResolver = new SCSSStylesResolver();
    this.pendingsCall = [];
    this.rendered = false;
    this.$configuration = {} as Configuration;
    this.observedAttributesNames = [];
    this.attributeListeners = {};
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
    selector: string
  ): void {
    const data: NodeListOf<Element>[] = this.mapItemsToTemplate(
      items,
      template
    );
    const container = this.innerShadowDomRoot.querySelector(
      selector
    ) as HTMLUListElement;
    this.removeChilds(container);
    data.forEach((x) => x.forEach((y) => container.appendChild(y)));
  }

  removeChilds(parent: HTMLElement) {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  }

  onUpdate(attributeName: string, callback: Function) {
    this.attributeListeners[attributeName] = { callback };
  }

  initialize() {
    this.innerShadowDomRoot =
      this.shadowRoot || this.attachShadow({ mode: "open" });
    // const template = this.defineStyle();
    // this.innerShadowDomRoot.appendChild(template.content.cloneNode(true));
    !!this.generateBaseStructure ? this.generateBaseStructure() : null;
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    const keys = Object.keys(this.attributeListeners);

    if (keys.indexOf(name) >= 0) {
      const value = this.getAttribute(name);
      const callback = this.attributeListeners[name]["callback"];
      // const kind = this.attributeListeners[name]["kind"];
      // const val = value as "array";

      callback(JSON.parse(value || "[]"));
    }
  }
  /**
   * Turn a string HTML into a Node HTML
   * @param template String HTML content that is wished to convert to HTML Node
   * @returns Template turned to Node
   */
  private convertTemplateToNodes(template: string): NodeListOf<Element> {
    const domParser = new DOMParser();
    const innerDocument: Document = domParser.parseFromString(
      template,
      "text/html"
    );
    const content: NodeListOf<Element> =
      innerDocument.body.querySelectorAll(":scope > *");
    return content;
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

  getTemplate(configuration: TemplateConfiguration): NodeListOf<Element> {
    let template = null;
    if (!!configuration.template) {
      template = configuration.template;
    } else if (!!configuration.path) {
      template = require(configuration.path);
    }

    const scope = configuration.scope || {};

    const variablesToFindPattern = /\{([a-zA-Z0-9\-]+)\}/gm;
    let currentlyResult = variablesToFindPattern.exec(template);
    let transformedTemplate: string = template;
    while (!!currentlyResult) {
      const match = currentlyResult[0];
      const identifier = currentlyResult[1];
      transformedTemplate = transformedTemplate.replace(
        match,
        scope[identifier] || match
      );
      currentlyResult = variablesToFindPattern.exec(template);
    }

    return this.convertTemplateToNodes(transformedTemplate);
  }

  addBaseTemplate(configuration: TemplateConfiguration): void {
    const baseTemplateHTML = this.getTemplate(configuration);
    baseTemplateHTML.forEach((node: Node) => {
      this.innerShadowDomRoot.appendChild(node);
    });

    if (!!configuration.style) {
      this.addStyleToShadowRoot(configuration.style, this.innerShadowDomRoot);
    }
  }

  public addStyleToShadowRoot(styles: any, shadowRoot: ShadowRoot) {
    const formattedStyle = this.stylesResolver.formatStyles(styles);
    const styleElement = document.createElement("style");
    styleElement.textContent = formattedStyle;
    shadowRoot.appendChild(styleElement);
  }

  setConfiguration(configuration: any): any {
    this.$configuration = new Proxy(
      { ...configuration },
      {
        set: (target, property, value) => {
          console.log("Proxy ", target[property], " to ", value);

          if (!!this.attributeListeners[property]) {
            const observer = this.attributeListeners[property];
            console.log(observer, value);

            observer.callback(value);
          }
          target[property] = value;
          return true;
        },
      }
    );
    return this.$configuration;
  }
}
