/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseComponent = void 0;
const scss_styles_resolver_1 = __webpack_require__(2);
class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.stylesResolver = new scss_styles_resolver_1.SCSSStylesResolver();
        this.pendingsCall = [];
        this.rendered = false;
        this.$configuration = {};
        this.observedAttributesNames = [];
        this.attributeListeners = {};
    }
    parseItemsIntoContainer(items, template, selector) {
        const data = this.mapItemsToTemplate(items, template);
        const container = this.innerShadowDomRoot.querySelector(selector);
        this.removeChilds(container);
        data.forEach((x) => x.forEach((y) => container.appendChild(y)));
    }
    removeChilds(parent) {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
    }
    onUpdate(attributeName, callback) {
        this.attributeListeners[attributeName] = { callback };
    }
    initialize() {
        this.innerShadowDomRoot =
            this.shadowRoot || this.attachShadow({ mode: "open" });
        !!this.generateBaseStructure ? this.generateBaseStructure() : null;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        const keys = Object.keys(this.attributeListeners);
        if (keys.indexOf(name) >= 0) {
            const value = this.getAttribute(name);
            const callback = this.attributeListeners[name]["callback"];
            callback(JSON.parse(value || "[]"));
        }
    }
    convertTemplateToNodes(template) {
        const domParser = new DOMParser();
        const innerDocument = domParser.parseFromString(template, "text/html");
        const content = innerDocument.body.querySelectorAll(":scope > *");
        return content;
    }
    mapItemsToTemplate(items, template) {
        return items.map((x) => this.getTemplate({
            template,
            scope: {
                ...x,
            },
        }));
    }
    getTemplate(configuration) {
        let template = null;
        if (!!configuration.template) {
            template = configuration.template;
        }
        else if (!!configuration.path) {
            template = __webpack_require__(4)(configuration.path);
        }
        const scope = configuration.scope || {};
        const variablesToFindPattern = /\{([a-zA-Z0-9\-]+)\}/gm;
        let currentlyResult = variablesToFindPattern.exec(template);
        let transformedTemplate = template;
        while (!!currentlyResult) {
            const match = currentlyResult[0];
            const identifier = currentlyResult[1];
            transformedTemplate = transformedTemplate.replace(match, scope[identifier] || match);
            currentlyResult = variablesToFindPattern.exec(template);
        }
        return this.convertTemplateToNodes(transformedTemplate);
    }
    addBaseTemplate(configuration) {
        const baseTemplateHTML = this.getTemplate(configuration);
        baseTemplateHTML.forEach((node) => {
            this.innerShadowDomRoot.appendChild(node);
        });
        if (!!configuration.style) {
            this.addStyleToShadowRoot(configuration.style, this.innerShadowDomRoot);
        }
    }
    addStyleToShadowRoot(styles, shadowRoot) {
        const formattedStyle = this.stylesResolver.formatStyles(styles);
        const styleElement = document.createElement("style");
        styleElement.textContent = formattedStyle;
        shadowRoot.appendChild(styleElement);
    }
    setConfiguration(configuration) {
        this.$configuration = new Proxy({ ...configuration }, {
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
        });
        return this.$configuration;
    }
}
exports.BaseComponent = BaseComponent;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SCSSStylesResolver = void 0;
const styles_resolver_1 = __webpack_require__(3);
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
/* 3 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StylesResolver = void 0;
class StylesResolver {
}
exports.StylesResolver = StylesResolver;


/***/ }),
/* 4 */
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 4;
module.exports = webpackEmptyContext;

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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseComponent = void 0;
var base_component_1 = __webpack_require__(1);
Object.defineProperty(exports, "BaseComponent", ({ enumerable: true, get: function () { return base_component_1.BaseComponent; } }));

})();

/******/ })()
;
//# sourceMappingURL=main.js.map