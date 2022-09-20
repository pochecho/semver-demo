import { DOMHelpers } from "./helpers/DOMHelpers";
import { HTMLTemplateResolver } from "./resolvers/templates/HTMLTemplate.resolver";
import { TemplateResolver } from "./resolvers/templates/template.resolver";
import { SCSSStylesResolver } from "./resolvers/styles/scss-styles.resolver";
import { StylesResolver } from "./resolvers/styles/styles.resolver";
import { TemplateConfiguration } from "./resolvers/templates/interfaces/template-configuration.interface";
import { LoggingHelper } from "./helpers/LoggingHelper";

import { LifeCycleManager } from "./lifecycle/lifecycleManager";
import { AttributeChangedEvent } from "./lifecycle/stages/attributeHomologationStageHandler";

export interface BaseCallback {
  callback: Function;
  parameters: any[];
  context: any;
}

export interface AttributeListenersConfiguration {
  [index: string]: OnUpdateAttributeConfiguration;
}
export interface OnUpdateAttributeConfiguration {
  callback: Function;
}

export interface BaseConfiguration {
  id?: string;
}

export interface BaseState {
  rendered: boolean;
}

export interface DesingSystemConfiguration {
  prefix: string;
  logStatus?: boolean;
}

const DEFAULT_DESIGN_SYSTEM_CONFIGURATION: DesingSystemConfiguration = {
  prefix: "sadala",
  logStatus: false,
};
export abstract class BaseComponent<
  Configuration extends BaseConfiguration,
  State extends BaseState
> extends HTMLElement {
  stylesResolver: StylesResolver;
  templateResolver: TemplateResolver;
  domHelpers: DOMHelpers;
  loggingHelper: LoggingHelper;

  configurationRef: Configuration;

  attributesNames!: Array<string>;

  state!: State;

  innerShadowDomRoot: ShadowRoot;

  designSystemConfiguration: DesingSystemConfiguration;

  lifeCycleManager: LifeCycleManager;

  constructor(designSystemConfiguration: DesingSystemConfiguration) {
    super();

    this.designSystemConfiguration = !!designSystemConfiguration
      ? {
          ...DEFAULT_DESIGN_SYSTEM_CONFIGURATION,
          ...designSystemConfiguration,
        }
      : DEFAULT_DESIGN_SYSTEM_CONFIGURATION;
    this.state = {
      rendered: false,
      attributeHomologationCalls: [],
    } as unknown as State;

    this.innerShadowDomRoot =
      this.shadowRoot || this.attachShadow({ mode: "open" });

    this.stylesResolver = new SCSSStylesResolver();
    this.domHelpers = new DOMHelpers();
    this.templateResolver = new HTMLTemplateResolver(this.domHelpers);
    this.loggingHelper = new LoggingHelper();
    this.loggingHelper.isActive = !!this.designSystemConfiguration.logStatus;

    this.lifeCycleManager = new LifeCycleManager(this);
    this.configurationRef = {} as Configuration;
  }

  setUp() {
    this.lifeCycleManager.runStages("after-connection");
  }

  addBaseTemplate(configuration: TemplateConfiguration): void {
    configuration.scope = this.state;
    
    const baseTemplateHTML = this.templateResolver.getTemplate(configuration);
    baseTemplateHTML.forEach((node: Node) => {
      this.innerShadowDomRoot.appendChild(node);
    });

    if (!!configuration.style) {
      this.addStyleToShadowRoot(configuration.style, this.innerShadowDomRoot);
    }
  }

  public spyAttribute(attributeName: string, callback: Function) {
    this.addEventListener(AttributeChangedEvent.identifier, (event: any) => {
      const attribute = event.detail["attribute"];
      if (attribute === attributeName) {
        callback(event.detail);
      }
    });
  }

  public addStyleToShadowRoot(styles: any, shadowRoot: ShadowRoot) {
    const formattedStyle = this.stylesResolver.formatStyles(styles);
    const styleElement = document.createElement("style");
    styleElement.textContent = formattedStyle;
    shadowRoot.appendChild(styleElement);
  }
  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    this.lifeCycleManager.attributeHomologationStage.attributeChangedCallback(
      name,
      oldValue,
      newValue
    );
  }

  connectedCallback() {
    this.setUp();
  }
}
