/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplexInput = void 0;
const configuration_1 = __webpack_require__(2);
const base_component_1 = __webpack_require__(3);
const base_complex_input_html_1 = __importDefault(__webpack_require__(5));
const input_styles_scss_1 = __importDefault(__webpack_require__(6));
class ComplexInput extends base_component_1.BaseComponent {
    constructor() {
        super();
        this.generateBaseStructure = this._generateBaseStructure;
    }
    setConfiguration(configuration) {
        super.setConfiguration(configuration);
    }
    _generateBaseStructure() {
        this.addBaseTemplate({
            template: base_complex_input_html_1.default,
            scope: {
                prefix: configuration_1.prefix,
                label: this.getAttribute('label'),
                'icon-left': this.getAttribute('icon-left')
            },
            style: input_styles_scss_1.default,
        });
    }
    connectedCallback() {
        this.initialize();
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }
    disconnectedCallback() { }
    static get observedAttributes() {
        return ["color", "text"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "color") {
            if (!oldValue) {
            }
        }
    }
    adoptedCallback() {
    }
    render() { }
}
exports.ComplexInput = ComplexInput;
ComplexInput.identifierName = "complex-input";


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prefix = void 0;
exports.prefix = "xxx";


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseComponent = void 0;
class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.pendingsCall = [];
        this.rendered = false;
        this.configuration = {};
        this.observedAttributesNames = [];
        this.attributeListeners = {};
    }
    parseItemsIntoContainer(items, template, selector) {
        const data = this.mapItemsToTemplate(items, template);
        const container = this.innerShadowDomRoot.querySelector(selector);
        data.forEach((x) => x.forEach((y) => container.appendChild(y)));
    }
    onUpdate(attributeName, callback) {
        this.attributeListeners[attributeName] = { callback };
    }
    initialize() {
        this.innerShadowDomRoot = this.attachShadow({ mode: "open" });
        !!this.generateBaseStructure ? this.generateBaseStructure() : null;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        const keys = Object.keys(this.attributeListeners);
        if (keys.indexOf(name) >= 0) {
            const value = this.getAttribute(name);
            const callback = this.attributeListeners[name]["callback"];
            const kind = this.attributeListeners[name]["kind"];
            const val = value;
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
            const style = document.createElement("style");
            style.innerText = configuration.style[0][1];
            this.innerShadowDomRoot.appendChild(style);
        }
    }
    setConfiguration(configuration) {
        this.configuration = configuration;
    }
}
exports.BaseComponent = BaseComponent;


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

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!-- <em if=\"{icon-left}\">{icon-left}</em> -->\n<label\n  >{label}\n  <input class=\"{prefix}-input\" aria-label=\"A\" type=\"text\" value=\"\" />\n</label>\n<{prefix}-input></{prefix}-input>\n<!-- <em aria-controls=\"id-content-2\">v</em> -->\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 6 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".xxx- complex-input {\n  border-color: dodgerblue;\n  border-radius: 8px;\n}\n\n:host {\n  display: flex;\n  align-items: center;\n}\n:host em {\n  height: 20px;\n  width: 20px;\n  padding: 3px;\n}\n:host label {\n  display: flex;\n  position: relative;\n  flex-direction: column;\n}\n:host label input {\n  height: 20px;\n  border-radius: 5px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputSelect = void 0;
const configuration_1 = __webpack_require__(2);
const base_component_1 = __webpack_require__(3);
const base_input_select_html_1 = __importDefault(__webpack_require__(10));
const item_html_1 = __importDefault(__webpack_require__(11));
const input_select_component_scss_1 = __importDefault(__webpack_require__(12));
const input_select_selectors_1 = __webpack_require__(13);
class InputSelect extends base_component_1.BaseComponent {
    constructor() {
        super();
        this.generateBaseStructure = this._generateBaseStructure;
        this.onUpdate("items", (items) => {
            this.parseItemsIntoContainer(items, item_html_1.default, input_select_selectors_1.LIST_CONTAINER_SELECTOR);
        });
    }
    setConfiguration(configuration) {
        super.setConfiguration(configuration);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
    }
    _generateBaseStructure() {
        this.addBaseTemplate({
            template: base_input_select_html_1.default,
            scope: {
                prefix: configuration_1.prefix,
                label: this.configuration.label || "Raulcito",
            },
            style: input_select_component_scss_1.default,
        });
    }
    connectedCallback() {
        this.initialize();
        this.addEventListener("checho", (event) => {
            console.log(event);
        });
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }
    disconnectedCallback() { }
    static get observedAttributes() {
        return ["items"];
    }
    adoptedCallback() { }
    render() { }
}
exports.InputSelect = InputSelect;
InputSelect.identifierName = "input-select";


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "\n<{prefix}-complex-input>\n</{prefix}-complex-input>\n\n\n<ul class=\"{prefix}-input-select-content\" aria-expanded=\"true\"  id=\"id-content-2\"></ul>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<li>{display}</li>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 12 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":host ul {\n  list-style: none;\n  padding: 0;\n  display: none;\n}\n:host ul li {\n  border: 1px solid red;\n}\n:host ul[aria-expanded=true] {\n  height: min-content;\n  display: initial;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
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
const complex_input_component_1 = __webpack_require__(1);
const input_select_component_1 = __webpack_require__(9);
const configuration_1 = __webpack_require__(2);
customElements.define(`${configuration_1.prefix}-${complex_input_component_1.ComplexInput.identifierName}`, complex_input_component_1.ComplexInput);
customElements.define(`${configuration_1.prefix}-${input_select_component_1.InputSelect.identifierName}`, input_select_component_1.InputSelect);

})();

/******/ })()
;