import { DOMHelpers } from "./helpers/DOMHelpers";
import { TemplateResolver } from "./resolvers/templates/template.resolver";
import { StylesResolver } from "./resolvers/styles/styles.resolver";
import { TemplateConfiguration } from "./resolvers/templates/interfaces/template-configuration.interface";
import { LoggingHelper } from "./helpers/LoggingHelper";
import { LifeCycleManager } from "./lifecycle/lifecycleManager";
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
export declare abstract class BaseComponent<Configuration extends BaseConfiguration, State extends BaseState> extends HTMLElement {
    stylesResolver: StylesResolver;
    templateResolver: TemplateResolver;
    domHelpers: DOMHelpers;
    loggingHelper: LoggingHelper;
    configurationRef: Configuration;
    attributesNames: Array<string>;
    state: State;
    innerShadowDomRoot: ShadowRoot;
    designSystemConfiguration: DesingSystemConfiguration;
    lifeCycleManager: LifeCycleManager;
    constructor(designSystemConfiguration: DesingSystemConfiguration);
    setUp(): void;
    addBaseTemplate(configuration: TemplateConfiguration): void;
    spyAttribute(attributeName: string, callback: Function): void;
    addStyleToShadowRoot(styles: any, shadowRoot: ShadowRoot): void;
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    connectedCallback(): void;
}
