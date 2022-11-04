import { DOMHelpers } from "../../helpers/DOMHelpers";
import {
  TemplateConfiguration,
  Scope,
} from "./interfaces/template-configuration.interface";
import { TemplateResolver } from "./template.resolver";
import { ViewEngine } from "./view-engine";

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
export class HTMLTemplateResolver extends TemplateResolver {
  tagPattern: Pattern;
  valuePattern: Pattern;

  domHelpers: DOMHelpers;

  constructor(domHelpers: DOMHelpers) {
    super();
    this.tagPattern = {
      pattern: /([a-zA-Z0-9\-]+)(@)/gm,
      tokenExtractor: (result: RegExpExecArray) => {
        return { identifier: result[1], match: result[0] };
      },
    };

    (this.valuePattern = {
      pattern: /(\{\{)([a-zA-Z0-9\-]+)(\}\})/gm,
      tokenExtractor: (result: RegExpExecArray) => {
        return { identifier: result[2], match: result[0] };
      },
    }),
      (this.domHelpers = domHelpers);
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

  private transformState(
    scope: Scope,
    viewEngine: ViewEngine
  ): {
    transformedState: TransformedState;
    statePropertyNamesMapper: StatePropertyNamesMapper;
  } {
    const transformedState: TransformedState = {};
    const statePropertyNamesMapper: StatePropertyNamesMapper = {};
    for (const key in scope) {
      if (Object.prototype.hasOwnProperty.call(scope, key)) {
        const value = scope[key];

        const transformedText = viewEngine.transformNameToLowerCamelCase(key);

        statePropertyNamesMapper[key] = transformedText;
        transformedState[transformedText] = value;
      }
    }

    return {
      transformedState,
      statePropertyNamesMapper,
    };
  }

  getTemplate(configuration: TemplateConfiguration): Array<Element> {
    let template = configuration.template;
    const viewEngine = new ViewEngine();
    console.log("Constructor name: ");
    console.log(this.constructor.name);

    //Paso 1: Generar el scope con los valores transformados
    console.log("Paso 1: Generar el scope con los valores transformados.");
    const { transformedState, statePropertyNamesMapper } = this.transformState(
      configuration.scope || {},
      viewEngine
    );
    console.table(transformedState);
    console.table(statePropertyNamesMapper);

    let transformedTemplate = template;
    //Paso 2: Eliminar el prefix@ para
    console.log("Paso 2: Eliminar el prefix@");
    transformedTemplate = this.resolvePattern(
      this.tagPattern,
      template,
      transformedTemplate,
      transformedState
    );
    console.log(transformedTemplate);
    console.log("Scope :", transformedState);

    console.log();

    //Paso 3: Convierte el string en nodos HTML
    console.log("Paso 3: Convierte el string en nodos HTML");
    const templateNodes = this.convertTemplateToNodes(transformedTemplate);
    console.log(templateNodes);
    console.log();

    console.log(
      "Paso 4: Se buscan las estructuras de control y se ejecuta el codigo dentro de ellas"
    );
    const computedNodes = viewEngine.searchControlStructures(
      templateNodes,
      transformedState
    );

    console.log("All control structures by node: ");
    console.log(computedNodes);

    console.log();

    const templateNodesFinal = [];

    for (const computedNode of computedNodes) {
      templateNodesFinal.push(...computedNode.fullNodes);
    }

    const t = templateNodesFinal.reduce((x: string, y: HTMLElement) => {
      return (x += y.outerHTML);
    }, "");


    

    while (true) {
      
    }


    const r : Array<Element>= [];
    this.convertTemplateToNodes(t).forEach((x) => {
      r.push(x);
    });
    return r;
  }

  private resolvePattern(
    patternConfig: Pattern,
    template: string,
    transformedTemplate: string,
    scope: Scope
  ): string {
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
    return transformedTemplate;
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
    const parsedItems: Array<Element>[] = this.mapItemsToTemplate(
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
  ): Array<Array<Element>> {
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
