/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccordionsGroup = void 0;
const sadala_1 = __webpack_require__(2);
const desing_system_configuration_1 = __webpack_require__(3);
class AccordionsGroup extends sadala_1.BaseComponent {
    constructor() {
        super(desing_system_configuration_1.DESIGN_SYSTEM_CONFIGURATION);
    }
}
exports.AccordionsGroup = AccordionsGroup;
AccordionsGroup.identifierName = "accordions-group";


/***/ }),
/* 2 */
/***/ ((module) => {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base.component.ts":
/*!*******************************!*\
  !*** ./src/base.component.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_647__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseComponent = void 0;
const DOMHelpers_1 = __nested_webpack_require_647__(/*! ./helpers/DOMHelpers */ "./src/helpers/DOMHelpers.ts");
const HTMLTemplate_resolver_1 = __nested_webpack_require_647__(/*! ./resolvers/templates/HTMLTemplate.resolver */ "./src/resolvers/templates/HTMLTemplate.resolver.ts");
const scss_styles_resolver_1 = __nested_webpack_require_647__(/*! ./resolvers/styles/scss-styles.resolver */ "./src/resolvers/styles/scss-styles.resolver.ts");
const LoggingHelper_1 = __nested_webpack_require_647__(/*! ./helpers/LoggingHelper */ "./src/helpers/LoggingHelper.ts");
const lifecycleManager_1 = __nested_webpack_require_647__(/*! ./lifecycle/lifecycleManager */ "./src/lifecycle/lifecycleManager.ts");
const attributeHomologationStageHandler_1 = __nested_webpack_require_647__(/*! ./lifecycle/stages/attributeHomologationStageHandler */ "./src/lifecycle/stages/attributeHomologationStageHandler.ts");
const DEFAULT_DESIGN_SYSTEM_CONFIGURATION = {
    prefix: "sadala",
    logStatus: false,
};
class BaseComponent extends HTMLElement {
    constructor(designSystemConfiguration) {
        super();
        this.designSystemConfiguration = !!designSystemConfiguration
            ? Object.assign(Object.assign({}, DEFAULT_DESIGN_SYSTEM_CONFIGURATION), designSystemConfiguration) : DEFAULT_DESIGN_SYSTEM_CONFIGURATION;
        this.state = {
            rendered: false,
            attributeHomologationCalls: [],
        };
        this.innerShadowDomRoot =
            this.shadowRoot || this.attachShadow({ mode: "open" });
        this.stylesResolver = new scss_styles_resolver_1.SCSSStylesResolver();
        this.domHelpers = new DOMHelpers_1.DOMHelpers();
        this.templateResolver = new HTMLTemplate_resolver_1.HTMLTemplateResolver(this.domHelpers);
        this.loggingHelper = new LoggingHelper_1.LoggingHelper();
        this.loggingHelper.isActive = !!this.designSystemConfiguration.logStatus;
        this.lifeCycleManager = new lifecycleManager_1.LifeCycleManager(this);
        this.configurationRef = {};
    }
    setUp() {
        this.lifeCycleManager.runStages("after-connection");
    }
    addBaseTemplate(configuration) {
        configuration.scope = this.state;
        const baseTemplateHTML = this.templateResolver.getTemplate(configuration);
        baseTemplateHTML.forEach((node) => {
            this.innerShadowDomRoot.appendChild(node);
        });
        if (!!configuration.style) {
            this.addStyleToShadowRoot(configuration.style, this.innerShadowDomRoot);
        }
    }
    spyAttribute(attributeName, callback) {
        this.addEventListener(attributeHomologationStageHandler_1.AttributeChangedEvent.identifier, (event) => {
            const attribute = event.detail["attribute"];
            if (attribute === attributeName) {
                callback(event.detail);
            }
        });
    }
    addStyleToShadowRoot(styles, shadowRoot) {
        const formattedStyle = this.stylesResolver.formatStyles(styles);
        const styleElement = document.createElement("style");
        styleElement.textContent = formattedStyle;
        shadowRoot.appendChild(styleElement);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.lifeCycleManager.attributeHomologationStage.attributeChangedCallback(name, oldValue, newValue);
    }
    connectedCallback() {
        this.setUp();
    }
}
exports.BaseComponent = BaseComponent;


/***/ }),

/***/ "./src/component-name-resolver.ts":
/*!****************************************!*\
  !*** ./src/component-name-resolver.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveComponentName = void 0;
function resolveComponentName(prefix, componentClass) {
    return `${prefix}-${componentClass.identifierName}`;
}
exports.resolveComponentName = resolveComponentName;


/***/ }),

/***/ "./src/helpers/DOMHelpers.ts":
/*!***********************************!*\
  !*** ./src/helpers/DOMHelpers.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOMHelpers = void 0;
class DOMHelpers {
    removeAllChildren(parent) {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
    }
}
exports.DOMHelpers = DOMHelpers;


/***/ }),

/***/ "./src/helpers/GeneralHelpers.ts":
/*!***************************************!*\
  !*** ./src/helpers/GeneralHelpers.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clone = exports.curry = void 0;
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}
exports.curry = curry;
function clone(message) {
    if (Array.isArray(message)) {
        return [...message];
    }
    if (typeof message === "object") {
        return Object.assign({}, message);
    }
    return message;
}
exports.clone = clone;


/***/ }),

/***/ "./src/helpers/LoggingHelper.ts":
/*!**************************************!*\
  !*** ./src/helpers/LoggingHelper.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_6247__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingHelper = void 0;
const GeneralHelpers_1 = __nested_webpack_require_6247__(/*! ./GeneralHelpers */ "./src/helpers/GeneralHelpers.ts");
class LoggingHelper {
    constructor() {
        this.log = (0, GeneralHelpers_1.curry)((message) => {
            if (this.isActive) {
                let persist = this._historical;
                if (!!this._group) {
                    persist = this._group.messages;
                }
                persist.push({
                    date: new Date(),
                    message: (0, GeneralHelpers_1.clone)(message),
                });
            }
        });
        this._historical = [];
        this.isActive = false;
        this._group = null;
    }
    group(name) {
        this._group = {
            name,
            messages: [],
        };
    }
    groupEnd() {
        const clonedGroup = (0, GeneralHelpers_1.clone)(this._group);
        this._group = null;
        this._historical.push(clonedGroup);
    }
    get historical() {
        return this._historical;
    }
    get historicalReport() {
        return JSON.stringify(this.historical, null, 2);
    }
}
exports.LoggingHelper = LoggingHelper;


/***/ }),

/***/ "./src/lifecycle/lifecycle.ts":
/*!************************************!*\
  !*** ./src/lifecycle/lifecycle.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifeCycleStages = exports.lifeCycleOrder = void 0;
exports.lifeCycleOrder = [
    "attribute-homologation",
    "state-initialization",
    "template-configuration",
];
var LifeCycleStages;
(function (LifeCycleStages) {
    LifeCycleStages["attributeHomologation"] = "attribute-homologation";
    LifeCycleStages["stateInitialization"] = "state-initialization";
    LifeCycleStages["TemplateConfiguration"] = "template-configuration";
})(LifeCycleStages = exports.LifeCycleStages || (exports.LifeCycleStages = {}));


/***/ }),

/***/ "./src/lifecycle/lifecycleManager.ts":
/*!*******************************************!*\
  !*** ./src/lifecycle/lifecycleManager.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_8570__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifeCycleManager = void 0;
const lifecycle_1 = __nested_webpack_require_8570__(/*! ./lifecycle */ "./src/lifecycle/lifecycle.ts");
const attributeHomologationStageHandler_1 = __nested_webpack_require_8570__(/*! ./stages/attributeHomologationStageHandler */ "./src/lifecycle/stages/attributeHomologationStageHandler.ts");
const stateInitializationStageHandler_1 = __nested_webpack_require_8570__(/*! ./stages/stateInitializationStageHandler */ "./src/lifecycle/stages/stateInitializationStageHandler.ts");
class LifeCycleManager {
    constructor(component) {
        this.component = component;
        this.attributeHomologationStage = new attributeHomologationStageHandler_1.AttributeHomologationStage(component);
        this.stateInitializationStage = new stateInitializationStageHandler_1.StateInitializationStage(component);
        this.lifeCycle = {
            "attribute-homologation": {
                callback: () => this.attributeHomologationStage.init(),
                trigger: "before-connection",
            },
            "state-initialization": {
                callback: () => this.stateInitializationStage.init(),
                trigger: "before-connection",
            },
        };
    }
    runStages(trigger) {
        lifecycle_1.lifeCycleOrder.forEach((stageName) => {
            const stage = this.lifeCycle[stageName];
            if (!!(stage === null || stage === void 0 ? void 0 : stage.callback) && stage.trigger === trigger) {
                stage.callback();
            }
        });
    }
}
exports.LifeCycleManager = LifeCycleManager;


/***/ }),

/***/ "./src/lifecycle/stages/attributeHomologationStageHandler.ts":
/*!*******************************************************************!*\
  !*** ./src/lifecycle/stages/attributeHomologationStageHandler.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_10558__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeHomologationStage = exports.AttributeChangedEvent = void 0;
const GeneralHelpers_1 = __nested_webpack_require_10558__(/*! ../../helpers/GeneralHelpers */ "./src/helpers/GeneralHelpers.ts");
class AttributeChangedEvent {
    static create(attribute, previousValue, value) {
        return new CustomEvent(AttributeChangedEvent.identifier, {
            cancelable: false,
            detail: {
                attribute,
                previousValue: (0, GeneralHelpers_1.clone)(previousValue),
                value: (0, GeneralHelpers_1.clone)(value),
            },
        });
    }
}
exports.AttributeChangedEvent = AttributeChangedEvent;
AttributeChangedEvent.identifier = "attribute-changed";
class AttributeHomologationStage {
    constructor(component) {
        this.component = component;
        this.attributeHomologationCalls = [];
        this.component.addEventListener(AttributeChangedEvent.identifier, (event) => {
            const loggingObject = Object.assign({}, Object.assign({}, event.detail));
            this.component.loggingHelper.group(`Configuration Changed (Proxy) ${this.component.constructor.name}`);
            this.component.loggingHelper.log(loggingObject);
            this.component.loggingHelper.groupEnd();
        });
    }
    init() {
        const emptyConfiguration = this.createDefaultConfiguration(this.component.attributesNames);
        this.setConfiguration(emptyConfiguration);
    }
    createDefaultConfiguration(attributeList) {
        return attributeList.reduce((previousValue, currentValue) => {
            previousValue[currentValue] = null;
            return previousValue;
        }, {});
    }
    homologate(name, oldValue, newValue, previusCallKind, callKind, transformDataFunction, homologationFunction) {
        const isInAttributeHomologationCallsIndex = this.attributeHomologationCalls.findIndex((x) => {
            return x.attributeName === name;
        });
        const parsedValue = transformDataFunction(newValue);
        if (isInAttributeHomologationCallsIndex >= 0) {
            const previusCall = this.attributeHomologationCalls[isInAttributeHomologationCallsIndex];
            if ((previusCall === null || previusCall === void 0 ? void 0 : previusCall.origin) !== previusCallKind) {
                this.component.configurationRef[name] = parsedValue;
                this.component.dispatchEvent(AttributeChangedEvent.create(name, (0, GeneralHelpers_1.clone)(oldValue), (0, GeneralHelpers_1.clone)(newValue)));
            }
            else {
                this.attributeHomologationCalls.splice(isInAttributeHomologationCallsIndex, 1);
            }
        }
        else {
            this.attributeHomologationCalls.push({
                attributeName: name,
                origin: callKind,
                value: parsedValue,
            });
            homologationFunction(name, oldValue, newValue, parsedValue);
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.homologate(name, oldValue, newValue, "programatic", "inline", (data) => this.fromString(data), (name, oldValue, originValue, parsedValue) => {
            this.component.dispatchEvent(AttributeChangedEvent.create(name, oldValue, parsedValue));
            this.component.state[name] = parsedValue;
            this.component.configurationRef[name] = parsedValue;
        });
    }
    toString(data) {
        if (typeof data !== "string") {
            return JSON.stringify(data);
        }
        return data;
    }
    fromString(data) {
        try {
            const result = JSON.parse(data);
            if (typeof result !== "object") {
                return data;
            }
            return result;
        }
        catch (error) {
            return data;
        }
    }
    setConfiguration(configuration) {
        this.component.configurationRef = new Proxy(Object.assign({}, configuration), {
            set: (target, property, value) => {
                if (value instanceof Promise) {
                    value.then((x) => {
                        this.perfomAction(x, property, Object.assign({}, target));
                        target[property] = x;
                    });
                }
                else {
                    this.perfomAction(value, property, Object.assign({}, target));
                    target[property] = value;
                }
                return true;
            },
        });
        return this.component.configurationRef;
    }
    perfomAction(value, property, target) {
        this.homologate(property, Object.assign({}, target)[property], value, "inline", "programatic", (data) => this.toString(data), (name, oldValue, originValue, parsedValue) => {
            this.component.dispatchEvent(AttributeChangedEvent.create(name, (0, GeneralHelpers_1.clone)(oldValue), (0, GeneralHelpers_1.clone)(originValue)));
            this.component.state[property] = value;
            this.component.setAttribute(name, parsedValue);
        });
    }
}
exports.AttributeHomologationStage = AttributeHomologationStage;


/***/ }),

/***/ "./src/lifecycle/stages/stateInitializationStageHandler.ts":
/*!*****************************************************************!*\
  !*** ./src/lifecycle/stages/stateInitializationStageHandler.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateInitializationStage = void 0;
class StateInitializationStage {
    constructor(component) {
        this.component = component;
    }
    init() {
        console.log('Wake up ', Object.assign(Object.assign({}, this.component.designSystemConfiguration), this.component.configurationRef));
        this.component.state = new Proxy(Object.assign(Object.assign({}, this.component.designSystemConfiguration), this.component.configurationRef), {
            set: (target, property, value) => {
                this.component.dispatchEvent(new CustomEvent("state-updated", {
                    detail: {
                        property,
                        value,
                    },
                }));
                target[property] = value;
                return true;
            },
        });
    }
}
exports.StateInitializationStage = StateInitializationStage;


/***/ }),

/***/ "./src/resolvers/styles/scss-styles.resolver.ts":
/*!******************************************************!*\
  !*** ./src/resolvers/styles/scss-styles.resolver.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_17329__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SCSSStylesResolver = void 0;
const styles_resolver_1 = __nested_webpack_require_17329__(/*! ./styles.resolver */ "./src/resolvers/styles/styles.resolver.ts");
class SCSSStylesResolver extends styles_resolver_1.StylesResolver {
    formatStyles(styles) {
        let stylesStr = styles[0][1];
        stylesStr = stylesStr.replace("<br>", "");
        stylesStr = stylesStr.replace("\n", "");
        return stylesStr;
    }
}
exports.SCSSStylesResolver = SCSSStylesResolver;


/***/ }),

/***/ "./src/resolvers/styles/styles.resolver.ts":
/*!*************************************************!*\
  !*** ./src/resolvers/styles/styles.resolver.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StylesResolver = void 0;
class StylesResolver {
}
exports.StylesResolver = StylesResolver;


/***/ }),

/***/ "./src/resolvers/templates/HTMLTemplate.resolver.ts":
/*!**********************************************************!*\
  !*** ./src/resolvers/templates/HTMLTemplate.resolver.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_18639__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HTMLTemplateResolver = void 0;
const template_resolver_1 = __nested_webpack_require_18639__(/*! ./template.resolver */ "./src/resolvers/templates/template.resolver.ts");
const view_engine_1 = __nested_webpack_require_18639__(/*! ./view-engine */ "./src/resolvers/templates/view-engine.ts");
class HTMLTemplateResolver extends template_resolver_1.TemplateResolver {
    constructor(domHelpers) {
        super();
        this.tagPattern = {
            pattern: /([a-zA-Z0-9\-]+)(@)/gm,
            tokenExtractor: (result) => {
                return { identifier: result[1], match: result[0] };
            },
        };
        (this.valuePattern = {
            pattern: /(\{\{)([a-zA-Z0-9\-]+)(\}\})/gm,
            tokenExtractor: (result) => {
                return { identifier: result[2], match: result[0] };
            },
        }),
            (this.domHelpers = domHelpers);
    }
    convertTemplateToNodes(template) {
        const domParser = new DOMParser();
        const innerDocument = domParser.parseFromString(template, "text/html");
        const content = innerDocument.body.querySelectorAll(":scope > *");
        return content;
    }
    transformState(scope, viewEngine) {
        const transformedState = {};
        const statePropertyNamesMapper = {};
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
    getTemplate(configuration) {
        let template = configuration.template;
        const viewEngine = new view_engine_1.ViewEngine();
        console.log("Constructor name: ");
        console.log(this.constructor.name);
        console.log("Paso 1: Generar el scope con los valores transformados.");
        const { transformedState, statePropertyNamesMapper } = this.transformState(configuration.scope || {}, viewEngine);
        console.table(transformedState);
        console.table(statePropertyNamesMapper);
        let transformedTemplate = template;
        console.log("Paso 2: Eliminar el prefix@");
        transformedTemplate = this.resolvePattern(this.tagPattern, template, transformedTemplate, transformedState);
        console.log(transformedTemplate);
        console.log("Scope :", transformedState);
        console.log();
        console.log("Paso 3: Convierte el string en nodos HTML");
        const templateNodes = this.convertTemplateToNodes(transformedTemplate);
        console.log(templateNodes);
        console.log();
        console.log("Paso 4: Se buscan las estructuras de control y se ejecuta el codigo dentro de ellas");
        const computedNodes = viewEngine.searchControlStructures(templateNodes, transformedState);
        console.log("All control structures by node: ");
        console.log(computedNodes);
        console.log();
        const templateNodesFinal = [];
        for (const computedNode of computedNodes) {
            templateNodesFinal.push(...computedNode.fullNodes);
        }
        const t = templateNodesFinal.reduce((x, y) => {
            return (x += y.outerHTML);
        }, "");
        const r = [];
        this.convertTemplateToNodes(t).forEach((x) => {
            r.push(x);
        });
        return r;
    }
    resolvePattern(patternConfig, template, transformedTemplate, scope) {
        const pattern = patternConfig.pattern;
        let currentlyResult = pattern.exec(template);
        while (!!currentlyResult) {
            const { match, identifier } = patternConfig.tokenExtractor(currentlyResult);
            transformedTemplate = transformedTemplate.replace(match, scope[identifier] || match);
            currentlyResult = pattern.exec(template);
        }
        return transformedTemplate;
    }
    parseItemsIntoContainer(items, template, selector, shadowRoot) {
        const parsedItems = this.mapItemsToTemplate(items, template);
        const container = shadowRoot.querySelector(selector);
        this.domHelpers.removeAllChildren(container);
        parsedItems.forEach((x) => x.forEach((y) => container.appendChild(y)));
    }
    mapItemsToTemplate(items, template) {
        return items.map((x) => this.getTemplate({
            template,
            scope: Object.assign({}, x),
        }));
    }
}
exports.HTMLTemplateResolver = HTMLTemplateResolver;


/***/ }),

/***/ "./src/resolvers/templates/template.resolver.ts":
/*!******************************************************!*\
  !*** ./src/resolvers/templates/template.resolver.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TemplateResolver = void 0;
class TemplateResolver {
}
exports.TemplateResolver = TemplateResolver;


/***/ }),

/***/ "./src/resolvers/templates/view-engine.ts":
/*!************************************************!*\
  !*** ./src/resolvers/templates/view-engine.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_24078__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViewEngine = exports.LoopControlStructure = exports.ConditionControlStructure = void 0;
const DOMHelpers_1 = __nested_webpack_require_24078__(/*! ../../helpers/DOMHelpers */ "./src/helpers/DOMHelpers.ts");
const RESPONSE_VARIABLE_NAME = "__responnse__";
const NODE_VARIABLE_NAME = "__node__";
class ConditionControlStructure {
    transpile(expression) {
        return `!!(${expression.replace("&amp", "&&")})`;
    }
    resolve(transpiledExpression) {
        return `const ${RESPONSE_VARIABLE_NAME} = ${transpiledExpression} ? [${NODE_VARIABLE_NAME}.cloneNode(true)] : [];`;
    }
}
exports.ConditionControlStructure = ConditionControlStructure;
class LoopControlStructure {
    transpile(expression) {
        const validPatterns = [
            {
                pattern: "(\\w+)[ ]*,[ ]*(\\w+)[ ]*:[ ]*(\\w+)",
                resolver: (founded) => {
                    return "";
                },
            },
            {
                pattern: "(\\w+)[ ]*:[ ]*(\\w+)[ ]*,[ ]*(\\w+)",
                resolver: (founded) => {
                    return `
for (let ${founded[1]} = ${founded[2]}; ${founded[1]} < ${founded[3]}; ${founded[1]}++) {
  ${RESPONSE_VARIABLE_NAME}.push(${NODE_VARIABLE_NAME}.cloneNode(true));
}
          `;
                },
            },
        ];
        let transpiledExpression = "";
        for (const patternConfig of validPatterns) {
            const pattern = new RegExp(patternConfig.pattern);
            let founded = pattern.exec(expression);
            console.log(patternConfig, founded, expression, 321);
            if (founded) {
                const resolver = patternConfig.resolver;
                transpiledExpression = resolver(founded);
                break;
            }
        }
        return transpiledExpression;
    }
    resolve(transpiledExpression) {
        return `let ${RESPONSE_VARIABLE_NAME} = [];\n${transpiledExpression}\n`;
    }
}
exports.LoopControlStructure = LoopControlStructure;
class ViewEngine {
    constructor() {
        this.domHelpers = new DOMHelpers_1.DOMHelpers();
        this.prefixControlStructure = "#";
        this.controlStructurePipeline = [
            {
                name: "if",
                gear: new ConditionControlStructure(),
            },
            {
                name: "for",
                gear: new LoopControlStructure(),
            },
        ];
    }
    transformNameToLowerCamelCase(name) {
        const fragments = name.split("-");
        let response = "";
        if (fragments.length > 0) {
            response = fragments[0];
        }
        if (fragments.length > 1) {
            for (let i = 1; i < fragments.length; i++) {
                const fragment = fragments[i];
                response +=
                    fragment.charAt(0).toUpperCase() + fragment.slice(1, fragment.length);
            }
        }
        return response;
    }
    createScope(state) {
        let context = "\n";
        for (const key in state) {
            if (Object.prototype.hasOwnProperty.call(state, key)) {
                const value = state[key];
                const formattedKey = this.transformNameToLowerCamelCase(key);
                if (typeof value === "string") {
                    context += `const ${formattedKey} = '${value}';\n`;
                }
                else {
                    context += `const ${formattedKey} = ${value};\n`;
                }
            }
        }
        return context;
    }
    evalControlStructureExpression(controlStructureName, expression, state, scope, node) {
        const handler = this.controlStructurePipeline
            .filter((x) => x.name === controlStructureName)
            .pop();
        let result = undefined;
        const dependentProperties = [];
        if (handler) {
            const transpiledExpression = handler.gear.transpile(expression);
            const efectiveExpression = handler.gear.resolve(transpiledExpression);
            const evalCode = `${scope}\n${efectiveExpression}`;
            console.log(controlStructureName);
            result = this.eval(evalCode, node);
            for (const property in state) {
                if (Object.prototype.hasOwnProperty.call(state, property)) {
                    const index = efectiveExpression.indexOf(property);
                    if (index > -1) {
                        dependentProperties.push(property);
                    }
                }
            }
        }
        return { result, dependentProperties };
    }
    eval(evalCode, node) {
        const bodyFunction = `${evalCode}\nreturn ${RESPONSE_VARIABLE_NAME};`;
        console.log("bodyFunction", bodyFunction);
        const evalFunction = new Function(NODE_VARIABLE_NAME, bodyFunction);
        return evalFunction(node);
    }
    searchControlStructures(templateNodes, state) {
        const response = [];
        const scope = this.createScope(state);
        templateNodes.forEach((node) => {
            const nodeMetada = {};
            const fullNodes = [];
            for (const controlStructure of this.controlStructurePipeline) {
                const attribute = `${this.prefixControlStructure}${controlStructure.name}`;
                if (node.hasAttribute(attribute)) {
                    const attributeValue = node.getAttribute(attribute) || "";
                    const result = this.evalControlStructureExpression(controlStructure.name, attributeValue, state, scope, node);
                    fullNodes.push(...result.result);
                    nodeMetada[controlStructure.name] = Object.assign({ value: attributeValue }, result);
                }
            }
            if (fullNodes.length === 0 && !('if' in nodeMetada) && !('for' in nodeMetada)) {
                fullNodes.push(node.cloneNode(true));
            }
            response.push({
                node,
                metadata: nodeMetada,
                fullNodes,
            });
        });
        return response;
    }
    getDependentsVariables() { }
}
exports.ViewEngine = ViewEngine;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_30470__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_30470__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveComponentName = exports.BaseComponent = void 0;
var base_component_1 = __nested_webpack_require_30470__(/*! ./base.component */ "./src/base.component.ts");
Object.defineProperty(exports, "BaseComponent", ({ enumerable: true, get: function () { return base_component_1.BaseComponent; } }));
var component_name_resolver_1 = __nested_webpack_require_30470__(/*! ./component-name-resolver */ "./src/component-name-resolver.ts");
Object.defineProperty(exports, "resolveComponentName", ({ enumerable: true, get: function () { return component_name_resolver_1.resolveComponentName; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=main.js.map

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DESIGN_SYSTEM_CONFIGURATION = void 0;
exports.DESIGN_SYSTEM_CONFIGURATION = {
    prefix: "bc",
    logStatus: true,
};


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Accordion = void 0;
const desing_system_configuration_1 = __webpack_require__(3);
const accordion_selectors_1 = __webpack_require__(5);
const accordion_scss_1 = __importDefault(__webpack_require__(11));
const accordion_template_html_1 = __importDefault(__webpack_require__(12));
const sadala_1 = __webpack_require__(2);
const ACCORDION_ATTRIBUTES = ["icon-left", "title"];
class Accordion extends sadala_1.BaseComponent {
    constructor() {
        super(desing_system_configuration_1.DESIGN_SYSTEM_CONFIGURATION);
        this.attributesNames = ACCORDION_ATTRIBUTES;
        this.lifeCycleManager.lifeCycle["template-configuration"] = {
            callback: () => {
                this._generateBaseStructure();
            },
            trigger: "after-connection",
        };
        this.lifeCycleManager.runStages("before-connection");
    }
    static get observedAttributes() {
        return ACCORDION_ATTRIBUTES;
    }
    connectedCallback() {
        super.connectedCallback();
    }
    _generateBaseStructure() {
        this.addBaseTemplate({
            template: accordion_template_html_1.default,
            style: accordion_scss_1.default,
        });
        const toggleButton = this.innerShadowDomRoot.querySelector(accordion_selectors_1.ACCORDION_SELECTORS["toggle-button"]);
        const header = this.innerShadowDomRoot.getElementById("header");
        if (!!toggleButton) {
            toggleButton.addEventListener("click", () => {
                if (!!header) {
                    console.log(toggleButton, header);
                    header.setAttribute("aria-expanded", String(!(header.getAttribute("aria-expanded") == "true")));
                    this.classList.toggle("bc-active");
                }
            });
        }
    }
}
exports.Accordion = Accordion;
Accordion.identifierName = "accordion";


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ACCORDION_SELECTORS = void 0;
const icon_component_1 = __webpack_require__(6);
const sadala_1 = __webpack_require__(2);
const desing_system_configuration_1 = __webpack_require__(3);
exports.ACCORDION_SELECTORS = {
    "toggle-button": `header > section:nth-child(2n) > ${(0, sadala_1.resolveComponentName)(desing_system_configuration_1.DESIGN_SYSTEM_CONFIGURATION.prefix, icon_component_1.Icon)}`,
};


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Icon = void 0;
const sadala_1 = __webpack_require__(2);
const icon_scss_1 = __importDefault(__webpack_require__(7));
const base_template_html_1 = __importDefault(__webpack_require__(10));
const desing_system_configuration_1 = __webpack_require__(3);
const ICON_ATTRIBUTES = ["name"];
class Icon extends sadala_1.BaseComponent {
    constructor() {
        super(desing_system_configuration_1.DESIGN_SYSTEM_CONFIGURATION);
        this.attributesNames = ICON_ATTRIBUTES;
        this.lifeCycleManager.lifeCycle["template-configuration"] = {
            callback: () => {
                this.addBaseTemplate({
                    template: base_template_html_1.default,
                    style: icon_scss_1.default,
                });
            },
            trigger: "after-connection",
        };
        this.lifeCycleManager.runStages("before-connection");
    }
    static get observedAttributes() {
        return ICON_ATTRIBUTES;
    }
    connectedCallback() {
        super.connectedCallback();
    }
}
exports.Icon = Icon;
Icon.identifierName = "icon";


/***/ }),
/* 7 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":host .material-symbols-outlined {\n  font-family: \"Material Symbols Outlined\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 8 */
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<span class=\"material-symbols-outlined\">name@</span>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 11 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n@keyframes shine {\n  0% {\n    background-position: -1000px 0;\n  }\n  100% {\n    background-position: 1000px 0;\n  }\n}\n@keyframes ripple-animation {\n  from {\n    opacity: 1;\n    transform: scale(0);\n  }\n  to {\n    opacity: 0;\n    transform: scale(1);\n  }\n}\n@keyframes tick {\n  0% {\n    transform: scale(0);\n  }\n  90% {\n    transform: scale(1.4);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes fade-in-out-background {\n  0% {\n    background-color: linear-gradient(90deg, #ffc0cb 50%, #00ffff 50%);\n  }\n  50% {\n    background-color: rgba(218, 218, 248, 0.5764705882);\n  }\n  100% {\n    background-color: rgba(234, 234, 250, 0);\n  }\n}\n@keyframes fadeInLeft {\n  from {\n    position: relative;\n    transform: translateX(-50%);\n  }\n  to {\n    position: relative;\n    transform: translateX(0);\n  }\n}\n@keyframes fadeInBottom {\n  from {\n    position: relative;\n    transform: translateY(100%);\n  }\n  to {\n    position: relative;\n    transform: translateY(0);\n  }\n}\n@keyframes tick {\n  0% {\n    transform: scale(0);\n  }\n  90% {\n    transform: scale(1.4);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes slide-up {\n  0% {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes slide-up-reverse {\n  0% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n}\n@keyframes slide-down-reverse {\n  0% {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes slide-down {\n  0% {\n    opacity: 1;\n    transform: translateY(0px);\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(-20px);\n    margin-bottom: -20px;\n  }\n}\n@keyframes fade-in-opacity {\n  0% {\n    opacity: 0;\n    visibility: hidden;\n  }\n  100% {\n    opacity: 1;\n    visibility: visible;\n  }\n}\n@keyframes fade-out-opacity {\n  0% {\n    opacity: 1;\n    visibility: visible;\n  }\n  100% {\n    opacity: 0;\n    visibility: hidden;\n  }\n}\n@keyframes appear {\n  0% {\n    opacity: 0;\n    transform: scale(0);\n  }\n  90% {\n    opacity: 0;\n    transform: scale(0);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes appear-at-side {\n  0% {\n    width: 0;\n    opacity: 0;\n  }\n  100% {\n    width: min-content;\n    opacity: 1;\n  }\n}\n@keyframes bc-search {\n  0% {\n    border-radius: 40px;\n  }\n  100% {\n    border-radius: 40px;\n  }\n}\n@keyframes bc-expand {\n  0% {\n    max-height: 0;\n  }\n  100% {\n    max-height: 100vh;\n  }\n}\n@keyframes bc-contract {\n  0% {\n    max-height: 100vh;\n  }\n  100% {\n    max-height: 0;\n  }\n}\n.outline {\n  outline: none;\n}\n\n/** Indica qué enfoque que se utilizará al formar la media queries - mobile o desktop */\n/**\n  * Retorna min o max, que se usará para formar todas las media queries -\n  * min-width 0 max-width\n  */\n:host {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  margin-bottom: 4px;\n  background-color: #ffffff;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby],\n:host header[aria-expanded][aria-controls][id][aria-label] {\n  padding: 16px;\n  display: flex;\n  align-items: center;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby].outline-element,\n:host header[aria-expanded][aria-controls][id][aria-label].outline-element {\n  outline: none;\n}\n@media only screen and (min-width: 576px) {\n  :host header[aria-expanded][aria-controls][id][aria-labelledby].outline-element,\n:host header[aria-expanded][aria-controls][id][aria-label].outline-element {\n    outline: 3px solid #2C2A29;\n    outline: auto;\n  }\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left {\n  display: flex;\n  align-items: center;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left bc-icon,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left bc-icon {\n  color: #2C2A29;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-img,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-img {\n  width: 32px;\n  height: 24px;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container {\n  margin-left: 8px;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title {\n  color: #2C2A29;\n  font-size: 18px;\n  letter-spacing: -0.3px;\n  line-height: 20px;\n  font-weight: 600;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title .bc-icon,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title .bc-icon {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 2px;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle {\n  color: #2C2A29;\n  font-size: 14px;\n  letter-spacing: -0.2px;\n  line-height: 18px;\n  font-family: \"Open Sans\";\n  margin-top: 4px;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle bc-icon,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle bc-icon {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 2px;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right {\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right bc-icon,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right bc-icon {\n  color: #2C2A29;\n  cursor: pointer;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right bc-icon.bc-toggle-button,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right bc-icon.bc-toggle-button {\n  margin-left: auto;\n  transform: rotate(0);\n  transition-duration: 0.35s;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-label,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-label {\n  color: #2C2A29;\n  font-size: 14px;\n  letter-spacing: -0.2px;\n  line-height: 18px;\n  font-family: \"Open Sans\";\n  margin-right: 8px;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-action-container,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-action-container {\n  display: flex;\n  align-items: center;\n  padding-left: 8px;\n  padding-right: 24px;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-action-container bc-icon,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-action-container bc-icon {\n  margin-left: 24px;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-action-container bc-icon:first-child,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-action-container bc-icon:first-child {\n  margin-left: 8px;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container {\n  display: flex;\n  align-items: center;\n  margin-left: 8px;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column {\n  margin-right: 16px;\n  text-align: right;\n  color: #2C2A29;\n  font-size: 16px;\n  letter-spacing: -0.3px;\n  line-height: 20px;\n  font-weight: 400;\n  font-family: \"Open Sans\";\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column-exchange,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column-exchange {\n  display: block;\n}\n:host header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column:last-child,\n:host header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column:last-child {\n  margin-right: 20px;\n  font-weight: 600;\n  font-family: \"CIBFontSans Bold\";\n  font-size: 18px;\n}\n:host section.bc-accordion-content[role=region] {\n  font-size: 16px;\n  max-height: 0;\n  transition-duration: 0.35s;\n  color: #2C2A29;\n  overflow-y: auto;\n  outline-color: #3455DB;\n}\n:host header[aria-expanded=true] + section.bc-accordion-content[role=region] {\n  max-height: 100vh;\n}\n:host header[aria-expanded=true][aria-controls][id][aria-label],\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] {\n  background-color: #2C2A29;\n  outline-color: #3455DB;\n}\n:host header[aria-expanded=true][aria-controls][id][aria-label] section.bc-accordion-header-left bc-icon,\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] section.bc-accordion-header-left bc-icon {\n  color: #ffffff;\n}\n:host header[aria-expanded=true][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host header[aria-expanded=true][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle,\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle {\n  color: #ffffff;\n}\n:host header[aria-expanded=true][aria-controls][id][aria-label] section.bc-accordion-header-right bc-icon,\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] section.bc-accordion-header-right bc-icon {\n  color: #ffffff;\n}\n:host header[aria-expanded=true][aria-controls][id][aria-label] section.bc-accordion-header-right bc-icon.bc-toggle-button,\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] section.bc-accordion-header-right bc-icon.bc-toggle-button {\n  transform: rotate(180deg);\n}\n:host header[aria-expanded=true][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-label,\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-label {\n  color: #ffffff;\n}\n:host header[aria-expanded=true][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column,\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column {\n  color: #ffffff;\n}\n:host header[aria-expanded=true][aria-controls][id][aria-label] > section.bc-accordion-content[role=region], :host header[aria-expanded=true][aria-controls][id][aria-label] > * > section.bc-accordion-content[role=region],\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] > section.bc-accordion-content[role=region],\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] > * > section.bc-accordion-content[role=region] {\n  max-height: 100vh;\n}\n:host header[aria-expanded=true][aria-controls][id][aria-label] .bc-accordion-container-column-mobile,\n:host header[aria-expanded=true][aria-controls][id][aria-labelledby] .bc-accordion-container-column-mobile {\n  color: #ffffff;\n}\n:host.bc-disabled > header[aria-expanded][aria-controls][id][aria-label], :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-label], :host.bc-disabled > header[aria-expanded][aria-controls][id][aria-labelledby], :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-labelledby] {\n  background-color: #e2e2e2;\n}\n:host.bc-disabled > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left bc-icon, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left bc-icon, :host.bc-disabled > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left bc-icon, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left bc-icon {\n  color: #cccccc;\n}\n:host.bc-disabled > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host.bc-disabled > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle, :host.bc-disabled > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host.bc-disabled > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle {\n  color: #cccccc;\n}\n:host.bc-disabled > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right bc-icon, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right bc-icon, :host.bc-disabled > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right bc-icon, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right bc-icon {\n  color: #cccccc;\n}\n:host.bc-disabled > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right bc-icon.bc-toggle-button, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right bc-icon.bc-toggle-button, :host.bc-disabled > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right bc-icon.bc-toggle-button, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right bc-icon.bc-toggle-button {\n  pointer-events: none;\n}\n:host.bc-disabled > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-label, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-label, :host.bc-disabled > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-label, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-label {\n  color: #cccccc;\n}\n:host.bc-disabled > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column, :host.bc-disabled > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column, :host.bc-disabled > * > header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column {\n  color: #cccccc;\n}\n:host.bc-accordion-minimal, :host.bc-accordion-minimal-unbordered {\n  background-color: transparent;\n  border-top: 1px solid #2C2A29;\n  border-bottom: 1px solid #2C2A29;\n  border-radius: 1px;\n}\n:host.bc-accordion-minimal header[aria-expanded][aria-controls][id][aria-labelledby],\n:host.bc-accordion-minimal header[aria-expanded][aria-controls][id][aria-label], :host.bc-accordion-minimal-unbordered header[aria-expanded][aria-controls][id][aria-labelledby],\n:host.bc-accordion-minimal-unbordered header[aria-expanded][aria-controls][id][aria-label] {\n  padding-top: 16px;\n  padding-bottom: 16px;\n  min-height: 74px;\n}\n:host.bc-accordion-minimal header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host.bc-accordion-minimal header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title, :host.bc-accordion-minimal-unbordered header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host.bc-accordion-minimal-unbordered header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title {\n  font-size: 16px;\n  font-family: \"Open Sans SemiBold\";\n}\n:host.bc-accordion-minimal header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle,\n:host.bc-accordion-minimal header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle, :host.bc-accordion-minimal-unbordered header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle,\n:host.bc-accordion-minimal-unbordered header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle {\n  font-size: 12px;\n}\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-label],\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-labelledby], :host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-label],\n:host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] {\n  background-color: inherit;\n}\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left bc-icon,\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left bc-icon, :host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left bc-icon,\n:host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left bc-icon {\n  color: inherit;\n}\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle,\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle, :host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle,\n:host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-subtitle {\n  color: inherit;\n}\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-icon,\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-icon, :host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-icon,\n:host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-icon {\n  color: inherit;\n}\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-icon.bc-toggle-button,\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-icon.bc-toggle-button, :host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-icon.bc-toggle-button,\n:host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-icon.bc-toggle-button {\n  transform: rotate(180deg);\n}\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-label,\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-label, :host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-label,\n:host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-label {\n  color: inherit;\n}\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column,\n:host.bc-accordion-minimal.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column, :host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column,\n:host.bc-accordion-minimal-unbordered.bc-active header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column {\n  color: inherit;\n}\n:host.bc-accordion-minimal-unbordered, :host.bc-accordion-minimal-unbordered-unbordered {\n  border: none;\n}\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-label],\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-labelledby] {\n  max-height: 62px;\n  min-height: 56px;\n  padding: 11px 16px;\n}\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left,\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left {\n  flex: 1;\n}\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title,\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-left .bc-accordion-text-container .bc-accordion-title {\n  font-family: \"Open Sans\";\n  font-size: 16px;\n  font-weight: 400;\n}\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right,\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right {\n  flex: 3;\n}\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container,\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container {\n  width: 100%;\n  justify-content: flex-end;\n}\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column,\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column {\n  flex-basis: 33.3333333333%;\n}\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-label] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column.bc-align-left,\n:host h6.bc-accordion-column header[aria-expanded][aria-controls][id][aria-labelledby] section.bc-accordion-header-right .bc-accordion-columns-container .bc-accordion-column.bc-align-left {\n  text-align: left;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<header\n  aria-expanded=\"false\"\n  aria-controls=\"45\"\n  id=\"header\"\n  aria-labelledby=\"accordion-title-basic\"\n>\n  <section class=\"bc-accordion-header-left\">\n    <prefix@-icon aria-hidden=\"true\" name=\"{{icon-left}}\"> </prefix@-icon>\n\n    <section class=\"bc-accordion-text-container\">\n      <h6 class=\"bc-accordion-title\" id=\"accordion-title-basic\">\n        {{title}}\n      </h6>\n    </section>\n  </section>\n  <section class=\"bc-accordion-header-right\">\n    <prefix@-icon\n      aria-hidden=\"true\"\n      class=\"bc-toggle-button\"\n      id=\"toggle-button\"\n      name=\"expand_more\"\n    >\n    </prefix@-icon>\n  </section>\n</header>\n<section\n  class=\"bc-accordion-content\"\n  role=\"region\"\n  aria-labelledby=\"accordion-title-basic\"\n>\n  <slot></slot>\n</section>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplexInput = void 0;
const desing_system_configuration_1 = __webpack_require__(3);
const sadala_1 = __webpack_require__(2);
const base_complex_input_html_1 = __importDefault(__webpack_require__(14));
const complex_input_scss_1 = __importDefault(__webpack_require__(15));
const COMPLEX_INPUT_ATTRIBUTES = [
    "label",
    "icon-left",
    "icon-right",
    "type",
    "entry",
    "help-text",
    "state",
    "pre",
    "placeholder",
    "character-counter-range",
];
class ComplexInput extends sadala_1.BaseComponent {
    constructor() {
        super(desing_system_configuration_1.DESIGN_SYSTEM_CONFIGURATION);
        this.attributesNames = COMPLEX_INPUT_ATTRIBUTES;
        this.lifeCycleManager.lifeCycle["template-configuration"] = {
            callback: () => {
                this.addBaseTemplate({
                    template: base_complex_input_html_1.default,
                    style: complex_input_scss_1.default,
                });
            },
            trigger: "after-connection",
        };
        this.lifeCycleManager.runStages("before-connection");
    }
    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => {
            const input = this.innerShadowDomRoot.querySelector("input");
            console.log(input);
            console.log(this.innerShadowDomRoot);
            if (!!input) {
                input.classList.add("bc-active");
            }
        }, 1000);
    }
    static get observedAttributes() {
        return COMPLEX_INPUT_ATTRIBUTES;
    }
}
exports.ComplexInput = ComplexInput;
ComplexInput.identifierName = "complex-input";


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<prefix@-icon #if=\"iconLeft\" name=\"{{iconLeft}}\"> </prefix@-icon>\n<input\n  state=\"{{state}}\"\n  class=\"{{prefix}}-input\"\n  type=\"{{type}}\"\n  id=\"input-1\"\n  value=\"\"\n/>\n<prefix@-icon #if=\"iconRight\" name=\"{{iconRight}}\"></prefix@-icon>\n<label for=\"input-1\">{{label}}</label>\n<span>Help Text</span>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 15 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":host .material-symbols-outlined {\n  font-family: \"Material Symbols Outlined\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n}\n\n@keyframes shine {\n  0% {\n    background-position: -1000px 0;\n  }\n  100% {\n    background-position: 1000px 0;\n  }\n}\n@keyframes ripple-animation {\n  from {\n    opacity: 1;\n    transform: scale(0);\n  }\n  to {\n    opacity: 0;\n    transform: scale(1);\n  }\n}\n@keyframes tick {\n  0% {\n    transform: scale(0);\n  }\n  90% {\n    transform: scale(1.4);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes fade-in-out-background {\n  0% {\n    background-color: linear-gradient(90deg, #ffc0cb 50%, #00ffff 50%);\n  }\n  50% {\n    background-color: rgba(218, 218, 248, 0.5764705882);\n  }\n  100% {\n    background-color: rgba(234, 234, 250, 0);\n  }\n}\n@keyframes fadeInLeft {\n  from {\n    position: relative;\n    transform: translateX(-50%);\n  }\n  to {\n    position: relative;\n    transform: translateX(0);\n  }\n}\n@keyframes fadeInBottom {\n  from {\n    position: relative;\n    transform: translateY(100%);\n  }\n  to {\n    position: relative;\n    transform: translateY(0);\n  }\n}\n@keyframes tick {\n  0% {\n    transform: scale(0);\n  }\n  90% {\n    transform: scale(1.4);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes slide-up {\n  0% {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes slide-up-reverse {\n  0% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n}\n@keyframes slide-down-reverse {\n  0% {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes slide-down {\n  0% {\n    opacity: 1;\n    transform: translateY(0px);\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(-20px);\n    margin-bottom: -20px;\n  }\n}\n@keyframes fade-in-opacity {\n  0% {\n    opacity: 0;\n    visibility: hidden;\n  }\n  100% {\n    opacity: 1;\n    visibility: visible;\n  }\n}\n@keyframes fade-out-opacity {\n  0% {\n    opacity: 1;\n    visibility: visible;\n  }\n  100% {\n    opacity: 0;\n    visibility: hidden;\n  }\n}\n@keyframes appear {\n  0% {\n    opacity: 0;\n    transform: scale(0);\n  }\n  90% {\n    opacity: 0;\n    transform: scale(0);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes appear-at-side {\n  0% {\n    width: 0;\n    opacity: 0;\n  }\n  100% {\n    width: min-content;\n    opacity: 1;\n  }\n}\n@keyframes bc-search {\n  0% {\n    border-radius: 40px;\n  }\n  100% {\n    border-radius: 40px;\n  }\n}\n@keyframes bc-expand {\n  0% {\n    max-height: 0;\n  }\n  100% {\n    max-height: 100vh;\n  }\n}\n@keyframes bc-contract {\n  0% {\n    max-height: 100vh;\n  }\n  100% {\n    max-height: 0;\n  }\n}\n.outline {\n  outline: none;\n}\n\n.bc-input {\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid #2C2A29;\n  color: #2C2A29;\n  display: block;\n  height: 32px;\n  left: 0px;\n  line-height: 20px;\n  top: 20px;\n  width: 100%;\n  padding: 0;\n  padding-bottom: 4px;\n  padding-top: 2px;\n}\n.bc-input:focus, .bc-input.focus-input {\n  outline: none;\n  transition: 0.5s;\n  border-bottom: solid 2px #fdda24;\n}\n\n:host {\n  width: 100%;\n  box-sizing: content-box;\n  position: relative;\n  display: inline-block;\n  padding-top: 16px !important;\n  height: 64px;\n}\n:host textarea[aria-label],\n:host textarea[id] {\n  box-sizing: border-box;\n}\n:host textarea[aria-label] ~ span,\n:host textarea[id] ~ span {\n  line-height: 16px;\n  height: 16px;\n  font-size: 14px;\n}\n:host textarea[aria-label][state=error],\n:host textarea[id][state=error] {\n  border-bottom: 2px solid #e20201;\n}\n:host textarea[aria-label][state=error] ~ span,\n:host textarea[id][state=error] ~ span {\n  color: #e20201;\n}\n:host textarea[aria-label][state],\n:host textarea[id][state] {\n  font-weight: 700;\n}\n:host textarea[aria-label][state=success],\n:host textarea[id][state=success] {\n  border-bottom: 2px solid #00c389;\n}\n:host textarea[aria-label][state=success] ~ span,\n:host textarea[id][state=success] ~ span {\n  color: #00c389;\n}\n:host textarea[aria-label]:focus,\n:host textarea[id]:focus {\n  border-bottom: 2px solid #fdda24;\n}\n:host textarea[aria-label]:active,\n:host textarea[id]:active {\n  border-bottom: 2px solid #fdda24;\n}\n:host textarea[aria-label]:focus ~ label, :host textarea[aria-label]:active ~ label, :host textarea[aria-label].bc-active ~ label,\n:host textarea[id]:focus ~ label,\n:host textarea[id]:active ~ label,\n:host textarea[id].bc-active ~ label {\n  top: 0;\n  font-size: 14px;\n  color: #2C2A29;\n  padding-left: 0;\n  width: 95%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n:host input[aria-label],\n:host input[id] {\n  box-sizing: border-box;\n  padding-right: 30px;\n}\n:host input[aria-label] ~ span,\n:host input[id] ~ span {\n  line-height: 16px;\n  height: 16px;\n  font-size: 14px;\n}\n:host input[aria-label][state=error],\n:host input[id][state=error] {\n  border-bottom: 2px solid #e20201;\n}\n:host input[aria-label][state=error] ~ span,\n:host input[id][state=error] ~ span {\n  color: #e20201;\n}\n:host input[aria-label][state],\n:host input[id][state] {\n  font-weight: 700;\n}\n:host input[aria-label][state=success],\n:host input[id][state=success] {\n  border-bottom: 2px solid #00c389;\n}\n:host input[aria-label][state=success] ~ span,\n:host input[id][state=success] ~ span {\n  color: #00c389;\n}\n:host input[aria-label]:focus,\n:host input[id]:focus {\n  border-bottom: 2px solid #fdda24;\n}\n:host input[aria-label]:active,\n:host input[id]:active {\n  border-bottom: 2px solid #fdda24;\n}\n:host input[aria-label]:focus ~ label, :host input[aria-label]:active ~ label, :host input[aria-label].bc-active ~ label,\n:host input[id]:focus ~ label,\n:host input[id]:active ~ label,\n:host input[id].bc-active ~ label {\n  top: 0;\n  font-size: 14px;\n  color: #2C2A29;\n  padding-left: 0;\n  width: 95%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n:host input[aria-label] + bc-icon,\n:host input[id] + bc-icon {\n  right: 0;\n  width: 24px;\n  left: initial;\n}\n:host input[aria-label] + bc-icon:focus-visible,\n:host input[id] + bc-icon:focus-visible {\n  outline: auto;\n}\n:host input[aria-label] + bc-icon .bc-invalid-feedback,\n:host input[id] + bc-icon .bc-invalid-feedback {\n  color: #e20201;\n  font-size: 12px;\n}\n:host input[aria-label] + bc-icon .bc-valid-feedback,\n:host input[id] + bc-icon .bc-valid-feedback {\n  color: #2C2A29;\n  font-size: 12px;\n}\n:host input[aria-label] + bc-icon .bc-span-info,\n:host input[id] + bc-icon .bc-span-info {\n  color: #2C2A29;\n}\n:host > bc-icon {\n  position: absolute;\n  top: 20px;\n  color: #2C2A29;\n  font-size: 24px;\n  z-index: 2;\n}\n:host > bc-icon:first-child {\n  left: 0;\n  width: 24px;\n}\n:host > input + bc-icon {\n  right: 0;\n  left: initial;\n}\n:host > label {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 100%;\n}\n:host bc-icon + input ~ label[for] {\n  padding-left: 30px;\n}\n:host bc-icon + input {\n  padding-left: 30px;\n}\n:host > label[for] {\n  color: #2C2A29;\n  font-size: 14px;\n  font-weight: normal;\n  left: 0px;\n  padding-left: 0px;\n  position: absolute;\n  pointer-events: none;\n  top: 20px;\n  transition: 0.2s ease all;\n  font-size: 14px;\n}\n:host > input[type=date] ~ label[for] {\n  line-height: 16px;\n  letter-spacing: -0.2px;\n  font-family: \"Open Sans\";\n}\n:host > input[type=date] ~ span {\n  size: 12px;\n  font-weight: 400;\n  line-height: 16px;\n  letter-spacing: -0.17px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputSelect = void 0;
const desing_system_configuration_1 = __webpack_require__(3);
const sadala_1 = __webpack_require__(2);
const base_template_html_1 = __importDefault(__webpack_require__(17));
const item_html_1 = __importDefault(__webpack_require__(18));
const input_select_scss_1 = __importDefault(__webpack_require__(19));
const input_select_selectors_1 = __webpack_require__(20);
const INPUT_SELECT_ATTRIBUTES = ["items", "label"];
class InputSelect extends sadala_1.BaseComponent {
    constructor() {
        super(desing_system_configuration_1.DESIGN_SYSTEM_CONFIGURATION);
        this.attributesNames = INPUT_SELECT_ATTRIBUTES;
        this.lifeCycleManager.lifeCycle["template-configuration"] = {
            callback: () => {
                this.addBaseTemplate({
                    template: base_template_html_1.default,
                    style: input_select_scss_1.default,
                });
            },
            trigger: "after-connection",
        };
        this.lifeCycleManager.runStages("before-connection");
        this.spyAttribute("items", (data) => {
            const items = data["value"];
            this.templateResolver.parseItemsIntoContainer(items, item_html_1.default, input_select_selectors_1.LIST_CONTAINER_SELECTOR, this.innerShadowDomRoot);
        });
        this.spyAttribute("label", (data) => {
            console.log(data);
        });
    }
    static get observedAttributes() {
        return INPUT_SELECT_ATTRIBUTES;
    }
    connectedCallback() {
        super.connectedCallback();
    }
}
exports.InputSelect = InputSelect;
InputSelect.identifierName = "input-select";


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<prefix@-complex-input\n  label=\"{{label}}\"\n  icon-right=\"expand_more\"\n  icon-left=\"person\"\n>\n</prefix@-complex-input>\n\n<ul\n  class=\"prefix@-input-select-content\"\n  aria-expanded=\"true\"\n  id=\"id-content-2\"\n></ul>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<li>display@</li>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 19 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":host ul {\n  list-style: none;\n  padding: 0;\n}\n:host ul li {\n  height: 32px;\n}\n:host ul[aria-expanded=true] {\n  height: min-content;\n  display: initial;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LIST_CONTAINER_SELECTOR = void 0;
exports.LIST_CONTAINER_SELECTOR = "ul";


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const accordion_group_component_1 = __webpack_require__(1);
const accordion_component_1 = __webpack_require__(4);
const complex_input_component_1 = __webpack_require__(13);
const icon_component_1 = __webpack_require__(6);
const input_select_component_1 = __webpack_require__(16);
const desing_system_configuration_1 = __webpack_require__(3);
const prefix = desing_system_configuration_1.DESIGN_SYSTEM_CONFIGURATION.prefix;
customElements.define(`${prefix}-${icon_component_1.Icon.identifierName}`, icon_component_1.Icon);
customElements.define(`${prefix}-${accordion_component_1.Accordion.identifierName}`, accordion_component_1.Accordion);
customElements.define(`${prefix}-${complex_input_component_1.ComplexInput.identifierName}`, complex_input_component_1.ComplexInput);
customElements.define(`${prefix}-${input_select_component_1.InputSelect.identifierName}`, input_select_component_1.InputSelect);
customElements.define(`${prefix}-${accordion_group_component_1.AccordionsGroup.identifierName}`, accordion_group_component_1.AccordionsGroup);

})();

/******/ })()
;