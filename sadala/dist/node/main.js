(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sadala"] = factory();
	else
		root["sadala"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base.component.ts":
/*!*******************************!*\
  !*** ./src/base.component.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseComponent = void 0;
const DOMHelpers_1 = __webpack_require__(/*! ./helpers/DOMHelpers */ "./src/helpers/DOMHelpers.ts");
const HTMLTemplate_resolver_1 = __webpack_require__(/*! ./resolvers/templates/HTMLTemplate.resolver */ "./src/resolvers/templates/HTMLTemplate.resolver.ts");
const scss_styles_resolver_1 = __webpack_require__(/*! ./resolvers/styles/scss-styles.resolver */ "./src/resolvers/styles/scss-styles.resolver.ts");
const LoggingHelper_1 = __webpack_require__(/*! ./helpers/LoggingHelper */ "./src/helpers/LoggingHelper.ts");
const lifecycleManager_1 = __webpack_require__(/*! ./lifecycle/lifecycleManager */ "./src/lifecycle/lifecycleManager.ts");
const attributeHomologationStageHandler_1 = __webpack_require__(/*! ./lifecycle/stages/attributeHomologationStageHandler */ "./src/lifecycle/stages/attributeHomologationStageHandler.ts");
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingHelper = void 0;
const GeneralHelpers_1 = __webpack_require__(/*! ./GeneralHelpers */ "./src/helpers/GeneralHelpers.ts");
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifeCycleManager = void 0;
const lifecycle_1 = __webpack_require__(/*! ./lifecycle */ "./src/lifecycle/lifecycle.ts");
const attributeHomologationStageHandler_1 = __webpack_require__(/*! ./stages/attributeHomologationStageHandler */ "./src/lifecycle/stages/attributeHomologationStageHandler.ts");
const stateInitializationStageHandler_1 = __webpack_require__(/*! ./stages/stateInitializationStageHandler */ "./src/lifecycle/stages/stateInitializationStageHandler.ts");
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeHomologationStage = exports.AttributeChangedEvent = void 0;
const GeneralHelpers_1 = __webpack_require__(/*! ../../helpers/GeneralHelpers */ "./src/helpers/GeneralHelpers.ts");
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SCSSStylesResolver = void 0;
const styles_resolver_1 = __webpack_require__(/*! ./styles.resolver */ "./src/resolvers/styles/styles.resolver.ts");
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HTMLTemplateResolver = void 0;
const template_resolver_1 = __webpack_require__(/*! ./template.resolver */ "./src/resolvers/templates/template.resolver.ts");
const view_engine_1 = __webpack_require__(/*! ./view-engine */ "./src/resolvers/templates/view-engine.ts");
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViewEngine = exports.LoopControlStructure = exports.ConditionControlStructure = void 0;
const DOMHelpers_1 = __webpack_require__(/*! ../../helpers/DOMHelpers */ "./src/helpers/DOMHelpers.ts");
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
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
var base_component_1 = __webpack_require__(/*! ./base.component */ "./src/base.component.ts");
Object.defineProperty(exports, "BaseComponent", ({ enumerable: true, get: function () { return base_component_1.BaseComponent; } }));
var component_name_resolver_1 = __webpack_require__(/*! ./component-name-resolver */ "./src/component-name-resolver.ts");
Object.defineProperty(exports, "resolveComponentName", ({ enumerable: true, get: function () { return component_name_resolver_1.resolveComponentName; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=main.js.map