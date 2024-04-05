/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Form */ "./src/components/Form.jsx");



const App = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex flex-col items-center justify-center h-screen mt-[-50px]"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-[660px] mx-auto text-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "text-4xl font-bold text-white mb-5"
  }, "Welcome To ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "gradient-text"
  }, "FormGPT")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-white text-base"
  }, "Just type a description of what form you need and our formGPT will help you refine your idea until you have the perfect form for your project.")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Form__WEBPACK_IMPORTED_MODULE_1__["default"], null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/components/Form.jsx":
/*!*********************************!*\
  !*** ./src/components/Form.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const Form = () => {
  const [userMessage, setUserMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const sendMessageToChatGPT = async e => {
    e.preventDefault();
    const dataToSend = {
      prompt: userMessage
    };
    // Get the base URL
    const baseUrl = window.location.protocol + "//" + window.location.host;
    if (userMessage !== '') {
      try {
        const response = await fetch(`${baseUrl}/contact-form-plugin/wp-json/awcontactform/v1/promtsubmit/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });
        const responseData = await response.json();
        console.log(responseData); // Handle response from WordPress
      } catch (error) {
        console.error('Error sending data to WordPress:', error);
      }
    } else {
      alert('empty input');
    }
  };

  //   return (
  //     <div>
  //       <div>
  //         {chatHistory.map((chat, index) => (
  //           <div key={index}>
  //             <p>User: {chat.user}</p>
  //             <p>ChatGPT: {chat.chatgpt}</p>
  //           </div>
  //         ))}
  //       </div>
  //       <input
  //         type="text"
  //         value={userMessage}
  //         onChange={(e) => setUserMessage(e.target.value)}
  //       />
  //       <button onClick={sendMessageToChatGPT}>Send</button>
  //     </div>
  //   );
  // 
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "w-[930px] bg-white p-2.5 rounded-lg border border-slate-300 flex gap-x-3 mt-[120px]"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "w-full !border-none text-base",
    type: "text",
    name: "promt",
    id: "promt",
    placeholder: "Describe the form style you are looking for...",
    value: userMessage,
    onChange: e => setUserMessage(e.target.value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    className: "text-base px-7 py-2 rounded-md font-medium text-white generate-btn",
    onClick: sendMessageToChatGPT
  }, "Generate"));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);

/***/ }),

/***/ "./src/assets/css/main.css":
/*!*********************************!*\
  !*** ./src/assets/css/main.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/assets/scss/main.scss":
/*!***********************************!*\
  !*** ./src/assets/scss/main.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_css_main_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/css/main.css */ "./src/assets/css/main.css");
/* harmony import */ var _assets_scss_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/scss/main.scss */ "./src/assets/scss/main.scss");




/**
 * Import the stylesheet for the plugin.
 */



// Render the App component into the DOM
(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_App__WEBPACK_IMPORTED_MODULE_1__["default"], null), document.getElementById('awcf'));
jQuery(document).ready(function ($) {
  //wrapper
  $("#sendMessageToChatGPT").click(function (e) {
    e.preventDefault(); //event
    // var this2 = this;                  //use in callback
    $.ajax({
      url: my_ajax_obj.ajax_url,
      method: 'POST',
      data: {
        action: 'send_message_to_chatgpt',
        // Action hook to identify the PHP function to call
        prompt: userMessage,
        'security': my_ajax_obj.nonce
      },
      success: function (response) {
        console.log('Response from PHP function:', response);
        // Handle response as needed
      },
      error: function (xhr, status, error) {
        console.error('Error calling PHP function:', error);
      }
    });
  });
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map