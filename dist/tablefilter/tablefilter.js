(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "tf-" + ({}[chunkId]||chunkId) + "-" + {"0":"a863074fc4c95570fe36"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tablefilter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/diacritics/index.js":
/*!******************************************!*\
  !*** ./node_modules/diacritics/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.remove = removeDiacritics;

var replacementList = [
  {
    base: ' ',
    chars: "\u00A0",
  }, {
    base: '0',
    chars: "\u07C0",
  }, {
    base: 'A',
    chars: "\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F",
  }, {
    base: 'AA',
    chars: "\uA732",
  }, {
    base: 'AE',
    chars: "\u00C6\u01FC\u01E2",
  }, {
    base: 'AO',
    chars: "\uA734",
  }, {
    base: 'AU',
    chars: "\uA736",
  }, {
    base: 'AV',
    chars: "\uA738\uA73A",
  }, {
    base: 'AY',
    chars: "\uA73C",
  }, {
    base: 'B',
    chars: "\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0181",
  }, {
    base: 'C',
    chars: "\u24b8\uff23\uA73E\u1E08\u0106\u0043\u0108\u010A\u010C\u00C7\u0187\u023B",
  }, {
    base: 'D',
    chars: "\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018A\u0189\u1D05\uA779",
  }, {
    base: 'Dh',
    chars: "\u00D0",
  }, {
    base: 'DZ',
    chars: "\u01F1\u01C4",
  }, {
    base: 'Dz',
    chars: "\u01F2\u01C5",
  }, {
    base: 'E',
    chars: "\u025B\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E\u1D07",
  }, {
    base: 'F',
    chars: "\uA77C\u24BB\uFF26\u1E1E\u0191\uA77B",
  }, {
    base: 'G',
    chars: "\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E\u0262",
  }, {
    base: 'H',
    chars: "\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D",
  }, {
    base: 'I',
    chars: "\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197",
  }, {
    base: 'J',
    chars: "\u24BF\uFF2A\u0134\u0248\u0237",
  }, {
    base: 'K',
    chars: "\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2",
  }, {
    base: 'L',
    chars: "\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780",
  }, {
    base: 'LJ',
    chars: "\u01C7",
  }, {
    base: 'Lj',
    chars: "\u01C8",
  }, {
    base: 'M',
    chars: "\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C\u03FB",
  }, {
    base: 'N',
    chars: "\uA7A4\u0220\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u019D\uA790\u1D0E",
  }, {
    base: 'NJ',
    chars: "\u01CA",
  }, {
    base: 'Nj',
    chars: "\u01CB",
  }, {
    base: 'O',
    chars: "\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C",
  }, {
    base: 'OE',
    chars: "\u0152",
  }, {
    base: 'OI',
    chars: "\u01A2",
  }, {
    base: 'OO',
    chars: "\uA74E",
  }, {
    base: 'OU',
    chars: "\u0222",
  }, {
    base: 'P',
    chars: "\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754",
  }, {
    base: 'Q',
    chars: "\u24C6\uFF31\uA756\uA758\u024A",
  }, {
    base: 'R',
    chars: "\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782",
  }, {
    base: 'S',
    chars: "\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784",
  }, {
    base: 'T',
    chars: "\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786",
  }, {
    base: 'Th',
    chars: "\u00DE",
  }, {
    base: 'TZ',
    chars: "\uA728",
  }, {
    base: 'U',
    chars: "\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244",
  }, {
    base: 'V',
    chars: "\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245",
  }, {
    base: 'VY',
    chars: "\uA760",
  }, {
    base: 'W',
    chars: "\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72",
  }, {
    base: 'X',
    chars: "\u24CD\uFF38\u1E8A\u1E8C",
  }, {
    base: 'Y',
    chars: "\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE",
  }, {
    base: 'Z',
    chars: "\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762",
  }, {
    base: 'a',
    chars: "\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250\u0251",
  }, {
    base: 'aa',
    chars: "\uA733",
  }, {
    base: 'ae',
    chars: "\u00E6\u01FD\u01E3",
  }, {
    base: 'ao',
    chars: "\uA735",
  }, {
    base: 'au',
    chars: "\uA737",
  }, {
    base: 'av',
    chars: "\uA739\uA73B",
  }, {
    base: 'ay',
    chars: "\uA73D",
  }, {
    base: 'b',
    chars: "\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253\u0182",
  }, {
    base: 'c',
    chars: "\uFF43\u24D2\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184",
  }, {
    base: 'd',
    chars: "\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\u018B\u13E7\u0501\uA7AA",
  }, {
    base: 'dh',
    chars: "\u00F0",
  }, {
    base: 'dz',
    chars: "\u01F3\u01C6",
  }, {
    base: 'e',
    chars: "\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u01DD",
  }, {
    base: 'f',
    chars: "\u24D5\uFF46\u1E1F\u0192",
  }, {
    base: 'ff',
    chars: "\uFB00",
  }, {
    base: 'fi',
    chars: "\uFB01",
  }, {
    base: 'fl',
    chars: "\uFB02",
  }, {
    base: 'ffi',
    chars: "\uFB03",
  }, {
    base: 'ffl',
    chars: "\uFB04",
  }, {
    base: 'g',
    chars: "\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\uA77F\u1D79",
  }, {
    base: 'h',
    chars: "\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265",
  }, {
    base: 'hv',
    chars: "\u0195",
  }, {
    base: 'i',
    chars: "\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131",
  }, {
    base: 'j',
    chars: "\u24D9\uFF4A\u0135\u01F0\u0249",
  }, {
    base: 'k',
    chars: "\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3",
  }, {
    base: 'l',
    chars: "\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747\u026D",
  }, {
    base: 'lj',
    chars: "\u01C9",
  }, {
    base: 'm',
    chars: "\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F",
  }, {
    base: 'n',
    chars: "\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5\u043B\u0509",
  }, {
    base: 'nj',
    chars: "\u01CC",
  }, {
    base: 'o',
    chars: "\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\uA74B\uA74D\u0275\u0254\u1D11",
  }, {
    base: 'oe',
    chars: "\u0153",
  }, {
    base: 'oi',
    chars: "\u01A3",
  }, {
    base: 'oo',
    chars: "\uA74F",
  }, {
    base: 'ou',
    chars: "\u0223",
  }, {
    base: 'p',
    chars: "\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755\u03C1",
  }, {
    base: 'q',
    chars: "\u24E0\uFF51\u024B\uA757\uA759",
  }, {
    base: 'r',
    chars: "\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783",
  }, {
    base: 's',
    chars: "\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B\u0282",
  }, {
    base: 'ss',
    chars: "\xDF",
  }, {
    base: 't',
    chars: "\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787",
  }, {
    base: 'th',
    chars: "\u00FE",
  }, {
    base: 'tz',
    chars: "\uA729",
  }, {
    base: 'u',
    chars: "\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289",
  }, {
    base: 'v',
    chars: "\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C",
  }, {
    base: 'vy',
    chars: "\uA761",
  }, {
    base: 'w',
    chars: "\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73",
  }, {
    base: 'x',
    chars: "\u24E7\uFF58\u1E8B\u1E8D",
  }, {
    base: 'y',
    chars: "\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF",
  }, {
    base: 'z',
    chars: "\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763",
  }
];

var diacriticsMap = {};
for (var i = 0; i < replacementList.length; i += 1) {
  var chars = replacementList[i].chars;
  for (var j = 0; j < chars.length; j += 1) {
    diacriticsMap[chars[j]] = replacementList[i].base;
  }
}

function removeDiacritics(str) {
  return str.replace(/[^\u0000-\u007e]/g, function(c) {
    return diacriticsMap[c] || c;
  });
}

exports.replacementList = replacementList;
exports.diacriticsMap = diacriticsMap;


/***/ }),

/***/ "./node_modules/sugar-core/sugar-core.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-core/sugar-core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
 *  Sugar v2.0.6
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) Andrew Plummer
 *  https://sugarjs.com/
 *
 * ---------------------------- */
(function() {
  'use strict';

  /***
   * @module Core
   * @description Core functionality including the ability to define methods and
   *              extend onto natives.
   *
   ***/

  // The global to export.
  var Sugar;

  // The name of Sugar in the global namespace.
  var SUGAR_GLOBAL = 'Sugar';

  // Natives available on initialization. Letting Object go first to ensure its
  // global is set by the time the rest are checking for chainable Object methods.
  var NATIVE_NAMES = 'Object Number String Array Date RegExp Function';

  // Static method flag
  var STATIC   = 0x1;

  // Instance method flag
  var INSTANCE = 0x2;

  // IE8 has a broken defineProperty but no defineProperties so this saves a try/catch.
  var PROPERTY_DESCRIPTOR_SUPPORT = !!(Object.defineProperty && Object.defineProperties);

  var globalContext = getGlobal();

  // Whether object instance methods can be mapped to the prototype.
  var allowObjectPrototype = false;

  // A map from Array to SugarArray.
  var namespacesByName = {};

  // A map from [object Object] to namespace.
  var namespacesByClassString = {};

  // Defining properties.
  // istanbul ignore next
  var defineProperty = PROPERTY_DESCRIPTOR_SUPPORT ?  Object.defineProperty : definePropertyShim;

  // A default chainable class for unknown types.
  var DefaultChainable = getNewChainableClass('Chainable');


  // Global methods

  function getGlobal() {
    // Get global context by keyword here to avoid issues with libraries
    // that can potentially alter this script's context object.
    return testGlobal(typeof global !== 'undefined' && global) ||
           testGlobal(typeof window !== 'undefined' && window);
  }

  function testGlobal(obj) {
    // Note that Rhino uses a different "global" keyword so perform an
    // extra check here to ensure that it's actually the global object.
    return obj && obj.Object === Object ? obj : null;
  }

  function setupGlobal() {
    Sugar = globalContext[SUGAR_GLOBAL];
    // istanbul ignore if
    if (Sugar) {
      // Reuse already defined Sugar global object.
      return;
    }
    Sugar = function(arg) {
      forEachProperty(Sugar, function(sugarNamespace, name) {
        // Although only the only enumerable properties on the global
        // object are Sugar namespaces, environments that can't set
        // non-enumerable properties will step through the utility methods
        // as well here, so use this check to only allow true namespaces.
        if (hasOwn(namespacesByName, name)) {
          sugarNamespace.extend(arg);
        }
      });
      return Sugar;
    };
    // istanbul ignore else
    if ( true && module.exports) {
      // Node or webpack environment
      module.exports = Sugar;
    } else {
      // Unwrapped browser environment
      try {
        globalContext[SUGAR_GLOBAL] = Sugar;
      } catch (e) {
        // Contexts such as QML have a read-only global context.
      }
    }
    forEachProperty(NATIVE_NAMES.split(' '), function(name) {
      createNamespace(name);
    });
    setGlobalProperties();
  }

  /***
   * @method createNamespace(name)
   * @returns SugarNamespace
   * @namespace Sugar
   * @short Creates a new Sugar namespace.
   * @extra This method is for plugin developers who want to define methods to be
   *        used with natives that Sugar does not handle by default. The new
   *        namespace will appear on the `Sugar` global with all the methods of
   *        normal namespaces, including the ability to define new methods. When
   *        extended, any defined methods will be mapped to `name` in the global
   *        context.
   *
   * @example
   *
   *   Sugar.createNamespace('Boolean');
   *
   * @param {string} name - The namespace name.
   *
   ***/
  function createNamespace(name) {

    // Is the current namespace Object?
    var isObject = name === 'Object';

    // A Sugar namespace is also a chainable class: Sugar.Array, etc.
    var sugarNamespace = getNewChainableClass(name, true);

    /***
     * @method extend([opts])
     * @returns Sugar
     * @namespace Sugar
     * @short Extends Sugar defined methods onto natives.
     * @extra This method can be called on individual namespaces like
     *        `Sugar.Array` or on the `Sugar` global itself, in which case
     *        [opts] will be forwarded to each `extend` call. For more,
     *        see `extending`.
     *
     * @options
     *
     *   methods           An array of method names to explicitly extend.
     *
     *   except            An array of method names or global namespaces (`Array`,
     *                     `String`) to explicitly exclude. Namespaces should be the
     *                     actual global objects, not strings.
     *
     *   namespaces        An array of global namespaces (`Array`, `String`) to
     *                     explicitly extend. Namespaces should be the actual
     *                     global objects, not strings.
     *
     *   enhance           A shortcut to disallow all "enhance" flags at once
     *                     (flags listed below). For more, see `enhanced methods`.
     *                     Default is `true`.
     *
     *   enhanceString     A boolean allowing String enhancements. Default is `true`.
     *
     *   enhanceArray      A boolean allowing Array enhancements. Default is `true`.
     *
     *   objectPrototype   A boolean allowing Sugar to extend Object.prototype
     *                     with instance methods. This option is off by default
     *                     and should generally not be used except with caution.
     *                     For more, see `object methods`.
     *
     * @example
     *
     *   Sugar.Array.extend();
     *   Sugar.extend();
     *
     * @option {Array<string>} [methods]
     * @option {Array<string|NativeConstructor>} [except]
     * @option {Array<NativeConstructor>} [namespaces]
     * @option {boolean} [enhance]
     * @option {boolean} [enhanceString]
     * @option {boolean} [enhanceArray]
     * @option {boolean} [objectPrototype]
     * @param {ExtendOptions} [opts]
     *
     ***
     * @method extend([opts])
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Extends Sugar defined methods for a specific namespace onto natives.
     * @param {ExtendOptions} [opts]
     *
     ***/
    var extend = function (opts) {

      var nativeClass = globalContext[name], nativeProto = nativeClass.prototype;
      var staticMethods = {}, instanceMethods = {}, methodsByName;

      function objectRestricted(name, target) {
        return isObject && target === nativeProto &&
               (!allowObjectPrototype || name === 'get' || name === 'set');
      }

      function arrayOptionExists(field, val) {
        var arr = opts[field];
        if (arr) {
          for (var i = 0, el; el = arr[i]; i++) {
            if (el === val) {
              return true;
            }
          }
        }
        return false;
      }

      function arrayOptionExcludes(field, val) {
        return opts[field] && !arrayOptionExists(field, val);
      }

      function disallowedByFlags(methodName, target, flags) {
        // Disallowing methods by flag currently only applies if methods already
        // exist to avoid enhancing native methods, as aliases should still be
        // extended (i.e. Array#all should still be extended even if Array#every
        // is being disallowed by a flag).
        if (!target[methodName] || !flags) {
          return false;
        }
        for (var i = 0; i < flags.length; i++) {
          if (opts[flags[i]] === false) {
            return true;
          }
        }
      }

      function namespaceIsExcepted() {
        return arrayOptionExists('except', nativeClass) ||
               arrayOptionExcludes('namespaces', nativeClass);
      }

      function methodIsExcepted(methodName) {
        return arrayOptionExists('except', methodName);
      }

      function canExtend(methodName, method, target) {
        return !objectRestricted(methodName, target) &&
               !disallowedByFlags(methodName, target, method.flags) &&
               !methodIsExcepted(methodName);
      }

      opts = opts || {};
      methodsByName = opts.methods;

      if (namespaceIsExcepted()) {
        return;
      } else if (isObject && typeof opts.objectPrototype === 'boolean') {
        // Store "objectPrototype" flag for future reference.
        allowObjectPrototype = opts.objectPrototype;
      }

      forEachProperty(methodsByName || sugarNamespace, function(method, methodName) {
        if (methodsByName) {
          // If we have method names passed in an array,
          // then we need to flip the key and value here
          // and find the method in the Sugar namespace.
          methodName = method;
          method = sugarNamespace[methodName];
        }
        if (hasOwn(method, 'instance') && canExtend(methodName, method, nativeProto)) {
          instanceMethods[methodName] = method.instance;
        }
        if(hasOwn(method, 'static') && canExtend(methodName, method, nativeClass)) {
          staticMethods[methodName] = method;
        }
      });

      // Accessing the extend target each time instead of holding a reference as
      // it may have been overwritten (for example Date by Sinon). Also need to
      // access through the global to allow extension of user-defined namespaces.
      extendNative(nativeClass, staticMethods);
      extendNative(nativeProto, instanceMethods);

      if (!methodsByName) {
        // If there are no method names passed, then
        // all methods in the namespace will be extended
        // to the native. This includes all future defined
        // methods, so add a flag here to check later.
        setProperty(sugarNamespace, 'active', true);
      }
      return sugarNamespace;
    };

    function defineWithOptionCollect(methodName, instance, args) {
      setProperty(sugarNamespace, methodName, function(arg1, arg2, arg3) {
        var opts = collectDefineOptions(arg1, arg2, arg3);
        defineMethods(sugarNamespace, opts.methods, instance, args, opts.last);
        return sugarNamespace;
      });
    }

    /***
     * @method defineStatic(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines static methods on the namespace that can later be extended
     *        onto the native globals.
     * @extra Accepts either a single object mapping names to functions, or name
     *        and function as two arguments. If `extend` was previously called
     *        with no arguments, the method will be immediately mapped to its
     *        native when defined.
     *
     * @example
     *
     *   Sugar.Number.defineStatic({
     *     isOdd: function (num) {
     *       return num % 2 === 1;
     *     }
     *   });
     *
     * @signature defineStatic(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    defineWithOptionCollect('defineStatic', STATIC);

    /***
     * @method defineInstance(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines methods on the namespace that can later be extended as
     *        instance methods onto the native prototype.
     * @extra Accepts either a single object mapping names to functions, or name
     *        and function as two arguments. All functions should accept the
     *        native for which they are mapped as their first argument, and should
     *        never refer to `this`. If `extend` was previously called with no
     *        arguments, the method will be immediately mapped to its native when
     *        defined.
     *
     *        Methods cannot accept more than 4 arguments in addition to the
     *        native (5 arguments total). Any additional arguments will not be
     *        mapped. If the method needs to accept unlimited arguments, use
     *        `defineInstanceWithArguments`. Otherwise if more options are
     *        required, use an options object instead.
     *
     * @example
     *
     *   Sugar.Number.defineInstance({
     *     square: function (num) {
     *       return num * num;
     *     }
     *   });
     *
     * @signature defineInstance(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    defineWithOptionCollect('defineInstance', INSTANCE);

    /***
     * @method defineInstanceAndStatic(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short A shortcut to define both static and instance methods on the namespace.
     * @extra This method is intended for use with `Object` instance methods. Sugar
     *        will not map any methods to `Object.prototype` by default, so defining
     *        instance methods as static helps facilitate their proper use.
     *
     * @example
     *
     *   Sugar.Object.defineInstanceAndStatic({
     *     isAwesome: function (obj) {
     *       // check if obj is awesome!
     *     }
     *   });
     *
     * @signature defineInstanceAndStatic(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    defineWithOptionCollect('defineInstanceAndStatic', INSTANCE | STATIC);


    /***
     * @method defineStaticWithArguments(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines static methods that collect arguments.
     * @extra This method is identical to `defineStatic`, except that when defined
     *        methods are called, they will collect any arguments past `n - 1`,
     *        where `n` is the number of arguments that the method accepts.
     *        Collected arguments will be passed to the method in an array
     *        as the last argument defined on the function.
     *
     * @example
     *
     *   Sugar.Number.defineStaticWithArguments({
     *     addAll: function (num, args) {
     *       for (var i = 0; i < args.length; i++) {
     *         num += args[i];
     *       }
     *       return num;
     *     }
     *   });
     *
     * @signature defineStaticWithArguments(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    defineWithOptionCollect('defineStaticWithArguments', STATIC, true);

    /***
     * @method defineInstanceWithArguments(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines instance methods that collect arguments.
     * @extra This method is identical to `defineInstance`, except that when
     *        defined methods are called, they will collect any arguments past
     *        `n - 1`, where `n` is the number of arguments that the method
     *        accepts. Collected arguments will be passed to the method as the
     *        last argument defined on the function.
     *
     * @example
     *
     *   Sugar.Number.defineInstanceWithArguments({
     *     addAll: function (num, args) {
     *       for (var i = 0; i < args.length; i++) {
     *         num += args[i];
     *       }
     *       return num;
     *     }
     *   });
     *
     * @signature defineInstanceWithArguments(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    defineWithOptionCollect('defineInstanceWithArguments', INSTANCE, true);

    /***
     * @method defineStaticPolyfill(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines static methods that are mapped onto the native if they do
     *        not already exist.
     * @extra Intended only for use creating polyfills that follow the ECMAScript
     *        spec. Accepts either a single object mapping names to functions, or
     *        name and function as two arguments. Note that polyfill methods will
     *        be immediately mapped onto their native prototype regardless of the
     *        use of `extend`.
     *
     * @example
     *
     *   Sugar.Object.defineStaticPolyfill({
     *     keys: function (obj) {
     *       // get keys!
     *     }
     *   });
     *
     * @signature defineStaticPolyfill(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    setProperty(sugarNamespace, 'defineStaticPolyfill', function(arg1, arg2, arg3) {
      var opts = collectDefineOptions(arg1, arg2, arg3);
      extendNative(globalContext[name], opts.methods, true, opts.last);
      return sugarNamespace;
    });

    /***
     * @method defineInstancePolyfill(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines instance methods that are mapped onto the native prototype
     *        if they do not already exist.
     * @extra Intended only for use creating polyfills that follow the ECMAScript
     *        spec. Accepts either a single object mapping names to functions, or
     *        name and function as two arguments. This method differs from
     *        `defineInstance` as there is no static signature (as the method
     *        is mapped as-is to the native), so it should refer to its `this`
     *        object. Note that polyfill methods will be immediately mapped onto
     *        their native prototype regardless of the use of `extend`.
     *
     * @example
     *
     *   Sugar.Array.defineInstancePolyfill({
     *     indexOf: function (arr, el) {
     *       // index finding code here!
     *     }
     *   });
     *
     * @signature defineInstancePolyfill(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    setProperty(sugarNamespace, 'defineInstancePolyfill', function(arg1, arg2, arg3) {
      var opts = collectDefineOptions(arg1, arg2, arg3);
      extendNative(globalContext[name].prototype, opts.methods, true, opts.last);
      // Map instance polyfills to chainable as well.
      forEachProperty(opts.methods, function(fn, methodName) {
        defineChainableMethod(sugarNamespace, methodName, fn);
      });
      return sugarNamespace;
    });

    /***
     * @method alias(toName, from)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Aliases one Sugar method to another.
     *
     * @example
     *
     *   Sugar.Array.alias('all', 'every');
     *
     * @signature alias(toName, fn)
     * @param {string} toName - Name for new method.
     * @param {string|Function} from - Method to alias, or string shortcut.
     ***/
    setProperty(sugarNamespace, 'alias', function(name, source) {
      var method = typeof source === 'string' ? sugarNamespace[source] : source;
      setMethod(sugarNamespace, name, method);
      return sugarNamespace;
    });

    // Each namespace can extend only itself through its .extend method.
    setProperty(sugarNamespace, 'extend', extend);

    // Cache the class to namespace relationship for later use.
    namespacesByName[name] = sugarNamespace;
    namespacesByClassString['[object ' + name + ']'] = sugarNamespace;

    mapNativeToChainable(name);
    mapObjectChainablesToNamespace(sugarNamespace);


    // Export
    return Sugar[name] = sugarNamespace;
  }

  function setGlobalProperties() {
    setProperty(Sugar, 'VERSION', '2.0.6');
    setProperty(Sugar, 'extend', Sugar);
    setProperty(Sugar, 'toString', toString);
    setProperty(Sugar, 'createNamespace', createNamespace);

    setProperty(Sugar, 'util', {
      'hasOwn': hasOwn,
      'getOwn': getOwn,
      'setProperty': setProperty,
      'classToString': classToString,
      'defineProperty': defineProperty,
      'forEachProperty': forEachProperty,
      'mapNativeToChainable': mapNativeToChainable
    });
  }

  function toString() {
    return SUGAR_GLOBAL;
  }


  // Defining Methods

  function defineMethods(sugarNamespace, methods, type, args, flags) {
    forEachProperty(methods, function(method, methodName) {
      var instanceMethod, staticMethod = method;
      if (args) {
        staticMethod = wrapMethodWithArguments(method);
      }
      if (flags) {
        staticMethod.flags = flags;
      }

      // A method may define its own custom implementation, so
      // make sure that's not the case before creating one.
      if (type & INSTANCE && !method.instance) {
        instanceMethod = wrapInstanceMethod(method, args);
        setProperty(staticMethod, 'instance', instanceMethod);
      }

      if (type & STATIC) {
        setProperty(staticMethod, 'static', true);
      }

      setMethod(sugarNamespace, methodName, staticMethod);

      if (sugarNamespace.active) {
        // If the namespace has been activated (.extend has been called),
        // then map this method as well.
        sugarNamespace.extend(methodName);
      }
    });
  }

  function collectDefineOptions(arg1, arg2, arg3) {
    var methods, last;
    if (typeof arg1 === 'string') {
      methods = {};
      methods[arg1] = arg2;
      last = arg3;
    } else {
      methods = arg1;
      last = arg2;
    }
    return {
      last: last,
      methods: methods
    };
  }

  function wrapInstanceMethod(fn, args) {
    return args ? wrapMethodWithArguments(fn, true) : wrapInstanceMethodFixed(fn);
  }

  function wrapMethodWithArguments(fn, instance) {
    // Functions accepting enumerated arguments will always have "args" as the
    // last argument, so subtract one from the function length to get the point
    // at which to start collecting arguments. If this is an instance method on
    // a prototype, then "this" will be pushed into the arguments array so start
    // collecting 1 argument earlier.
    var startCollect = fn.length - 1 - (instance ? 1 : 0);
    return function() {
      var args = [], collectedArgs = [], len;
      if (instance) {
        args.push(this);
      }
      len = Math.max(arguments.length, startCollect);
      // Optimized: no leaking arguments
      for (var i = 0; i < len; i++) {
        if (i < startCollect) {
          args.push(arguments[i]);
        } else {
          collectedArgs.push(arguments[i]);
        }
      }
      args.push(collectedArgs);
      return fn.apply(this, args);
    };
  }

  function wrapInstanceMethodFixed(fn) {
    switch(fn.length) {
      // Wrapped instance methods will always be passed the instance
      // as the first argument, but requiring the argument to be defined
      // may cause confusion here, so return the same wrapped function regardless.
      case 0:
      case 1:
        return function() {
          return fn(this);
        };
      case 2:
        return function(a) {
          return fn(this, a);
        };
      case 3:
        return function(a, b) {
          return fn(this, a, b);
        };
      case 4:
        return function(a, b, c) {
          return fn(this, a, b, c);
        };
      case 5:
        return function(a, b, c, d) {
          return fn(this, a, b, c, d);
        };
    }
  }

  // Method helpers

  function extendNative(target, source, polyfill, override) {
    forEachProperty(source, function(method, name) {
      if (polyfill && !override && target[name]) {
        // Method exists, so bail.
        return;
      }
      setProperty(target, name, method);
    });
  }

  function setMethod(sugarNamespace, methodName, method) {
    sugarNamespace[methodName] = method;
    if (method.instance) {
      defineChainableMethod(sugarNamespace, methodName, method.instance, true);
    }
  }


  // Chainables

  function getNewChainableClass(name) {
    var fn = function SugarChainable(obj, arg) {
      if (!(this instanceof fn)) {
        return new fn(obj, arg);
      }
      if (this.constructor !== fn) {
        // Allow modules to define their own constructors.
        obj = this.constructor.apply(obj, arguments);
      }
      this.raw = obj;
    };
    setProperty(fn, 'toString', function() {
      return SUGAR_GLOBAL + name;
    });
    setProperty(fn.prototype, 'valueOf', function() {
      return this.raw;
    });
    return fn;
  }

  function defineChainableMethod(sugarNamespace, methodName, fn) {
    var wrapped = wrapWithChainableResult(fn), existing, collision, dcp;
    dcp = DefaultChainable.prototype;
    existing = dcp[methodName];

    // If the method was previously defined on the default chainable, then a
    // collision exists, so set the method to a disambiguation function that will
    // lazily evaluate the object and find it's associated chainable. An extra
    // check is required to avoid false positives from Object inherited methods.
    collision = existing && existing !== Object.prototype[methodName];

    // The disambiguation function is only required once.
    if (!existing || !existing.disambiguate) {
      dcp[methodName] = collision ? disambiguateMethod(methodName) : wrapped;
    }

    // The target chainable always receives the wrapped method. Additionally,
    // if the target chainable is Sugar.Object, then map the wrapped method
    // to all other namespaces as well if they do not define their own method
    // of the same name. This way, a Sugar.Number will have methods like
    // isEqual that can be called on any object without having to traverse up
    // the prototype chain and perform disambiguation, which costs cycles.
    // Note that the "if" block below actually does nothing on init as Object
    // goes first and no other namespaces exist yet. However it needs to be
    // here as Object instance methods defined later also need to be mapped
    // back onto existing namespaces.
    sugarNamespace.prototype[methodName] = wrapped;
    if (sugarNamespace === Sugar.Object) {
      mapObjectChainableToAllNamespaces(methodName, wrapped);
    }
  }

  function mapObjectChainablesToNamespace(sugarNamespace) {
    forEachProperty(Sugar.Object && Sugar.Object.prototype, function(val, methodName) {
      if (typeof val === 'function') {
        setObjectChainableOnNamespace(sugarNamespace, methodName, val);
      }
    });
  }

  function mapObjectChainableToAllNamespaces(methodName, fn) {
    forEachProperty(namespacesByName, function(sugarNamespace) {
      setObjectChainableOnNamespace(sugarNamespace, methodName, fn);
    });
  }

  function setObjectChainableOnNamespace(sugarNamespace, methodName, fn) {
    var proto = sugarNamespace.prototype;
    if (!hasOwn(proto, methodName)) {
      proto[methodName] = fn;
    }
  }

  function wrapWithChainableResult(fn) {
    return function() {
      return new DefaultChainable(fn.apply(this.raw, arguments));
    };
  }

  function disambiguateMethod(methodName) {
    var fn = function() {
      var raw = this.raw, sugarNamespace;
      if (raw != null) {
        // Find the Sugar namespace for this unknown.
        sugarNamespace = namespacesByClassString[classToString(raw)];
      }
      if (!sugarNamespace) {
        // If no sugarNamespace can be resolved, then default
        // back to Sugar.Object so that undefined and other
        // non-supported types can still have basic object
        // methods called on them, such as type checks.
        sugarNamespace = Sugar.Object;
      }

      return new sugarNamespace(raw)[methodName].apply(this, arguments);
    };
    fn.disambiguate = true;
    return fn;
  }

  function mapNativeToChainable(name, methodNames) {
    var sugarNamespace = namespacesByName[name],
        nativeProto = globalContext[name].prototype;

    if (!methodNames && ownPropertyNames) {
      methodNames = ownPropertyNames(nativeProto);
    }

    forEachProperty(methodNames, function(methodName) {
      if (nativeMethodProhibited(methodName)) {
        // Sugar chainables have their own constructors as well as "valueOf"
        // methods, so exclude them here. The __proto__ argument should be trapped
        // by the function check below, however simply accessing this property on
        // Object.prototype causes QML to segfault, so pre-emptively excluding it.
        return;
      }
      try {
        var fn = nativeProto[methodName];
        if (typeof fn !== 'function') {
          // Bail on anything not a function.
          return;
        }
      } catch (e) {
        // Function.prototype has properties that
        // will throw errors when accessed.
        return;
      }
      defineChainableMethod(sugarNamespace, methodName, fn);
    });
  }

  function nativeMethodProhibited(methodName) {
    return methodName === 'constructor' ||
           methodName === 'valueOf' ||
           methodName === '__proto__';
  }


  // Util

  // Internal references
  var ownPropertyNames = Object.getOwnPropertyNames,
      internalToString = Object.prototype.toString,
      internalHasOwnProperty = Object.prototype.hasOwnProperty;

  // Defining this as a variable here as the ES5 module
  // overwrites it to patch DONTENUM.
  var forEachProperty = function (obj, fn) {
    for(var key in obj) {
      if (!hasOwn(obj, key)) continue;
      if (fn.call(obj, obj[key], key, obj) === false) break;
    }
  };

  // istanbul ignore next
  function definePropertyShim(obj, prop, descriptor) {
    obj[prop] = descriptor.value;
  }

  function setProperty(target, name, value, enumerable) {
    defineProperty(target, name, {
      value: value,
      enumerable: !!enumerable,
      configurable: true,
      writable: true
    });
  }

  // PERF: Attempts to speed this method up get very Heisenbergy. Quickly
  // returning based on typeof works for primitives, but slows down object
  // types. Even === checks on null and undefined (no typeof) will end up
  // basically breaking even. This seems to be as fast as it can go.
  function classToString(obj) {
    return internalToString.call(obj);
  }

  function hasOwn(obj, prop) {
    return !!obj && internalHasOwnProperty.call(obj, prop);
  }

  function getOwn(obj, prop) {
    if (hasOwn(obj, prop)) {
      return obj[prop];
    }
  }

  setupGlobal();

  /***
   * @module Common
   * @description Internal utility and common methods.
   ***/

  // Flag allowing native methods to be enhanced.
  var ENHANCEMENTS_FLAG = 'enhance';

  // For type checking, etc. Excludes object as this is more nuanced.
  var NATIVE_TYPES = 'Boolean Number String Date RegExp Function Array Error Set Map';

  // Do strings have no keys?
  var NO_KEYS_IN_STRING_OBJECTS = !('0' in Object('a'));

  // Prefix for private properties.
  var PRIVATE_PROP_PREFIX = '_sugar_';

  // Matches 1..2 style ranges in properties.
  var PROPERTY_RANGE_REG = /^(.*?)\[([-\d]*)\.\.([-\d]*)\](.*)$/;

  // WhiteSpace/LineTerminator as defined in ES5.1 plus Unicode characters in the Space, Separator category.
  var TRIM_CHARS = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';

  // Regex for matching a formatted string.
  var STRING_FORMAT_REG = /([{}])\1|{([^}]*)}|(%)%|(%(\w*))/g;

  // Common chars
  var HALF_WIDTH_ZERO = 0x30,
      FULL_WIDTH_ZERO = 0xff10,
      HALF_WIDTH_PERIOD   = '.',
      FULL_WIDTH_PERIOD   = '．',
      HALF_WIDTH_COMMA    = ',',
      OPEN_BRACE  = '{',
      CLOSE_BRACE = '}';

  // Namespace aliases
  var sugarObject   = Sugar.Object,
      sugarArray    = Sugar.Array,
      sugarDate     = Sugar.Date,
      sugarString   = Sugar.String,
      sugarNumber   = Sugar.Number,
      sugarFunction = Sugar.Function,
      sugarRegExp   = Sugar.RegExp;

  // Class checks
  var isSerializable,
      isBoolean, isNumber, isString,
      isDate, isRegExp, isFunction,
      isArray, isSet, isMap, isError;

  function buildClassChecks() {

    var knownTypes = {};

    function addCoreTypes() {

      var names = spaceSplit(NATIVE_TYPES);

      isBoolean = buildPrimitiveClassCheck(names[0]);
      isNumber  = buildPrimitiveClassCheck(names[1]);
      isString  = buildPrimitiveClassCheck(names[2]);

      isDate   = buildClassCheck(names[3]);
      isRegExp = buildClassCheck(names[4]);

      // Wanted to enhance performance here by using simply "typeof"
      // but Firefox has two major issues that make this impossible,
      // one fixed, the other not, so perform a full class check here.
      //
      // 1. Regexes can be typeof "function" in FF < 3
      //    https://bugzilla.mozilla.org/show_bug.cgi?id=61911 (fixed)
      //
      // 2. HTMLEmbedElement and HTMLObjectElement are be typeof "function"
      //    https://bugzilla.mozilla.org/show_bug.cgi?id=268945 (won't fix)
      isFunction = buildClassCheck(names[5]);

      // istanbul ignore next
      isArray = Array.isArray || buildClassCheck(names[6]);
      isError = buildClassCheck(names[7]);

      isSet = buildClassCheck(names[8], typeof Set !== 'undefined' && Set);
      isMap = buildClassCheck(names[9], typeof Map !== 'undefined' && Map);

      // Add core types as known so that they can be checked by value below,
      // notably excluding Functions and adding Arguments and Error.
      addKnownType('Arguments');
      addKnownType(names[0]);
      addKnownType(names[1]);
      addKnownType(names[2]);
      addKnownType(names[3]);
      addKnownType(names[4]);
      addKnownType(names[6]);

    }

    function addArrayTypes() {
      var types = 'Int8 Uint8 Uint8Clamped Int16 Uint16 Int32 Uint32 Float32 Float64';
      forEach(spaceSplit(types), function(str) {
        addKnownType(str + 'Array');
      });
    }

    function addKnownType(className) {
      var str = '[object '+ className +']';
      knownTypes[str] = true;
    }

    function isKnownType(className) {
      return knownTypes[className];
    }

    function buildClassCheck(className, globalObject) {
      // istanbul ignore if
      if (globalObject && isClass(new globalObject, 'Object')) {
        return getConstructorClassCheck(globalObject);
      } else {
        return getToStringClassCheck(className);
      }
    }

    // Map and Set may be [object Object] in certain IE environments.
    // In this case we need to perform a check using the constructor
    // instead of Object.prototype.toString.
    // istanbul ignore next
    function getConstructorClassCheck(obj) {
      var ctorStr = String(obj);
      return function(obj) {
        return String(obj.constructor) === ctorStr;
      };
    }

    function getToStringClassCheck(className) {
      return function(obj, str) {
        // perf: Returning up front on instanceof appears to be slower.
        return isClass(obj, className, str);
      };
    }

    function buildPrimitiveClassCheck(className) {
      var type = className.toLowerCase();
      return function(obj) {
        var t = typeof obj;
        return t === type || t === 'object' && isClass(obj, className);
      };
    }

    addCoreTypes();
    addArrayTypes();

    isSerializable = function(obj, className) {
      // Only known objects can be serialized. This notably excludes functions,
      // host objects, Symbols (which are matched by reference), and instances
      // of classes. The latter can arguably be matched by value, but
      // distinguishing between these and host objects -- which should never be
      // compared by value -- is very tricky so not dealing with it here.
      return isKnownType(className) || isPlainObject(obj, className);
    };

  }

  function isClass(obj, className, str) {
    if (!str) {
      str = classToString(obj);
    }
    return str === '[object '+ className +']';
  }

  // Wrapping the core's "define" methods to
  // save a few bytes in the minified script.
  function wrapNamespace(method) {
    return function(sugarNamespace, arg1, arg2) {
      sugarNamespace[method](arg1, arg2);
    };
  }

  // Method define aliases
  var alias                       = wrapNamespace('alias'),
      defineStatic                = wrapNamespace('defineStatic'),
      defineInstance              = wrapNamespace('defineInstance'),
      defineStaticPolyfill        = wrapNamespace('defineStaticPolyfill'),
      defineInstancePolyfill      = wrapNamespace('defineInstancePolyfill'),
      defineInstanceAndStatic     = wrapNamespace('defineInstanceAndStatic'),
      defineInstanceWithArguments = wrapNamespace('defineInstanceWithArguments');

  function defineInstanceSimilar(sugarNamespace, set, fn, flags) {
    defineInstance(sugarNamespace, collectSimilarMethods(set, fn), flags);
  }

  function defineInstanceAndStaticSimilar(sugarNamespace, set, fn, flags) {
    defineInstanceAndStatic(sugarNamespace, collectSimilarMethods(set, fn), flags);
  }

  function collectSimilarMethods(set, fn) {
    var methods = {};
    if (isString(set)) {
      set = spaceSplit(set);
    }
    forEach(set, function(el, i) {
      fn(methods, el, i);
    });
    return methods;
  }

  // This song and dance is to fix methods to a different length
  // from what they actually accept in order to stay in line with
  // spec. Additionally passing argument length, as some methods
  // throw assertion errors based on this (undefined check is not
  // enough). Fortunately for now spec is such that passing 3
  // actual arguments covers all requirements. Note that passing
  // the argument length also forces the compiler to not rewrite
  // length of the compiled function.
  function fixArgumentLength(fn) {
    var staticFn = function(a) {
      var args = arguments;
      return fn(a, args[1], args[2], args.length - 1);
    };
    staticFn.instance = function(b) {
      var args = arguments;
      return fn(this, b, args[1], args.length);
    };
    return staticFn;
  }

  function defineAccessor(namespace, name, fn) {
    setProperty(namespace, name, fn);
  }

  function defineOptionsAccessor(namespace, defaults) {
    var obj = simpleClone(defaults);

    function getOption(name) {
      return obj[name];
    }

    function setOption(arg1, arg2) {
      var options;
      if (arguments.length === 1) {
        options = arg1;
      } else {
        options = {};
        options[arg1] = arg2;
      }
      forEachProperty(options, function(val, name) {
        if (val === null) {
          val = defaults[name];
        }
        obj[name] = val;
      });
    }

    defineAccessor(namespace, 'getOption', getOption);
    defineAccessor(namespace, 'setOption', setOption);
    return getOption;
  }

  // For methods defined directly on the prototype like Range
  function defineOnPrototype(ctor, methods) {
    var proto = ctor.prototype;
    forEachProperty(methods, function(val, key) {
      proto[key] = val;
    });
  }

  // Argument helpers

  function assertArgument(exists) {
    if (!exists) {
      throw new TypeError('Argument required');
    }
  }

  function assertCallable(obj) {
    if (!isFunction(obj)) {
      throw new TypeError('Function is not callable');
    }
  }

  function assertArray(obj) {
    if (!isArray(obj)) {
      throw new TypeError('Array required');
    }
  }

  function assertWritable(obj) {
    if (isPrimitive(obj)) {
      // If strict mode is active then primitives will throw an
      // error when attempting to write properties. We can't be
      // sure if strict mode is available, so pre-emptively
      // throw an error here to ensure consistent behavior.
      throw new TypeError('Property cannot be written');
    }
  }

  // Coerces an object to a positive integer.
  // Does not allow Infinity.
  function coercePositiveInteger(n) {
    n = +n || 0;
    if (n < 0 || !isNumber(n) || !isFinite(n)) {
      throw new RangeError('Invalid number');
    }
    return trunc(n);
  }


  // General helpers

  function isDefined(o) {
    return o !== undefined;
  }

  function isUndefined(o) {
    return o === undefined;
  }

  function privatePropertyAccessor(key) {
    var privateKey = PRIVATE_PROP_PREFIX + key;
    return function(obj, val) {
      if (arguments.length > 1) {
        setProperty(obj, privateKey, val);
        return obj;
      }
      return obj[privateKey];
    };
  }

  function setChainableConstructor(sugarNamespace, createFn) {
    sugarNamespace.prototype.constructor = function() {
      return createFn.apply(this, arguments);
    };
  }

  // Fuzzy matching helpers

  function getMatcher(f) {
    if (!isPrimitive(f)) {
      var className = classToString(f);
      if (isRegExp(f, className)) {
        return regexMatcher(f);
      } else if (isDate(f, className)) {
        return dateMatcher(f);
      } else if (isFunction(f, className)) {
        return functionMatcher(f);
      } else if (isPlainObject(f, className)) {
        return fuzzyMatcher(f);
      }
    }
    // Default is standard isEqual
    return defaultMatcher(f);
  }

  function fuzzyMatcher(obj) {
    var matchers = {};
    return function(el, i, arr) {
      var matched = true;
      if (!isObjectType(el)) {
        return false;
      }
      forEachProperty(obj, function(val, key) {
        matchers[key] = getOwn(matchers, key) || getMatcher(val);
        if (matchers[key].call(arr, el[key], i, arr) === false) {
          matched = false;
        }
        return matched;
      });
      return matched;
    };
  }

  function defaultMatcher(f) {
    return function(el) {
      return isEqual(el, f);
    };
  }

  function regexMatcher(reg) {
    reg = RegExp(reg);
    return function(el) {
      return reg.test(el);
    };
  }

  function dateMatcher(d) {
    var ms = d.getTime();
    return function(el) {
      return !!(el && el.getTime) && el.getTime() === ms;
    };
  }

  function functionMatcher(fn) {
    return function(el, i, arr) {
      // Return true up front if match by reference
      return el === fn || fn.call(arr, el, i, arr);
    };
  }

  // Object helpers

  function getKeys(obj) {
    return Object.keys(obj);
  }

  function deepHasProperty(obj, key, any) {
    return handleDeepProperty(obj, key, any, true);
  }

  function deepGetProperty(obj, key, any) {
    return handleDeepProperty(obj, key, any, false);
  }

  function deepSetProperty(obj, key, val) {
    handleDeepProperty(obj, key, false, false, true, false, val);
    return obj;
  }

  function handleDeepProperty(obj, key, any, has, fill, fillLast, val) {
    var ns, bs, ps, cbi, set, isLast, isPush, isIndex, nextIsIndex, exists;
    ns = obj;
    if (key == null) return;

    if (isObjectType(key)) {
      // Allow array and array-like accessors
      bs = [key];
    } else {
      key = String(key);
      if (key.indexOf('..') !== -1) {
        return handleArrayIndexRange(obj, key, any, val);
      }
      bs = key.split('[');
    }

    set = isDefined(val);

    for (var i = 0, blen = bs.length; i < blen; i++) {
      ps = bs[i];

      if (isString(ps)) {
        ps = periodSplit(ps);
      }

      for (var j = 0, plen = ps.length; j < plen; j++) {
        key = ps[j];

        // Is this the last key?
        isLast = i === blen - 1 && j === plen - 1;

        // Index of the closing ]
        cbi = key.indexOf(']');

        // Is the key an array index?
        isIndex = cbi !== -1;

        // Is this array push syntax "[]"?
        isPush = set && cbi === 0;

        // If the bracket split was successful and this is the last element
        // in the dot split, then we know the next key will be an array index.
        nextIsIndex = blen > 1 && j === plen - 1;

        if (isPush) {
          // Set the index to the end of the array
          key = ns.length;
        } else if (isIndex) {
          // Remove the closing ]
          key = key.slice(0, -1);
        }

        // If the array index is less than 0, then
        // add its length to allow negative indexes.
        if (isIndex && key < 0) {
          key = +key + ns.length;
        }

        // Bracket keys may look like users[5] or just [5], so the leading
        // characters are optional. We can enter the namespace if this is the
        // 2nd part, if there is only 1 part, or if there is an explicit key.
        if (i || key || blen === 1) {

          // TODO: need to be sure this check handles ''.length when
          // we refactor.
          exists = any ? key in Object(ns) : hasOwn(ns, key);

          // Non-existent namespaces are only filled if they are intermediate
          // (not at the end) or explicitly filling the last.
          if (fill && (!isLast || fillLast) && !exists) {
            // For our purposes, last only needs to be an array.
            ns = ns[key] = nextIsIndex || (fillLast && isLast) ? [] : {};
            continue;
          }

          if (has) {
            if (isLast || !exists) {
              return exists;
            }
          } else if (set && isLast) {
            assertWritable(ns);
            ns[key] = val;
          }

          ns = exists ? ns[key] : undefined;
        }

      }
    }
    return ns;
  }

  // Get object property with support for 0..1 style range notation.
  function handleArrayIndexRange(obj, key, any, val) {
    var match, start, end, leading, trailing, arr, set;
    match = key.match(PROPERTY_RANGE_REG);
    if (!match) {
      return;
    }

    set = isDefined(val);
    leading = match[1];

    if (leading) {
      arr = handleDeepProperty(obj, leading, any, false, set ? true : false, true);
    } else {
      arr = obj;
    }

    assertArray(arr);

    trailing = match[4];
    start    = match[2] ? +match[2] : 0;
    end      = match[3] ? +match[3] : arr.length;

    // A range of 0..1 is inclusive, so we need to add 1 to the end. If this
    // pushes the index from -1 to 0, then set it to the full length of the
    // array, otherwise it will return nothing.
    end = end === -1 ? arr.length : end + 1;

    if (set) {
      for (var i = start; i < end; i++) {
        handleDeepProperty(arr, i + trailing, any, false, true, false, val);
      }
    } else {
      arr = arr.slice(start, end);

      // If there are trailing properties, then they need to be mapped for each
      // element in the array.
      if (trailing) {
        if (trailing.charAt(0) === HALF_WIDTH_PERIOD) {
          // Need to chomp the period if one is trailing after the range. We
          // can't do this at the regex level because it will be required if
          // we're setting the value as it needs to be concatentated together
          // with the array index to be set.
          trailing = trailing.slice(1);
        }
        return map(arr, function(el) {
          return handleDeepProperty(el, trailing);
        });
      }
    }
    return arr;
  }

  function getOwnKey(obj, key) {
    if (hasOwn(obj, key)) {
      return key;
    }
  }

  function hasProperty(obj, prop) {
    return !isPrimitive(obj) && prop in obj;
  }

  function isObjectType(obj, type) {
    return !!obj && (type || typeof obj) === 'object';
  }

  function isPrimitive(obj, type) {
    type = type || typeof obj;
    return obj == null || type === 'string' || type === 'number' || type === 'boolean';
  }

  function isPlainObject(obj, className) {
    return isObjectType(obj) &&
           isClass(obj, 'Object', className) &&
           hasValidPlainObjectPrototype(obj) &&
           hasOwnEnumeratedProperties(obj);
  }

  function hasValidPlainObjectPrototype(obj) {
    var hasToString = 'toString' in obj;
    var hasConstructor = 'constructor' in obj;
    // An object created with Object.create(null) has no methods in the
    // prototype chain, so check if any are missing. The additional hasToString
    // check is for false positives on some host objects in old IE which have
    // toString but no constructor. If the object has an inherited constructor,
    // then check if it is Object (the "isPrototypeOf" tapdance here is a more
    // robust way of ensuring this if the global has been hijacked). Note that
    // accessing the constructor directly (without "in" or "hasOwnProperty")
    // will throw a permissions error in IE8 on cross-domain windows.
    return (!hasConstructor && !hasToString) ||
            (hasConstructor && !hasOwn(obj, 'constructor') &&
             hasOwn(obj.constructor.prototype, 'isPrototypeOf'));
  }

  function hasOwnEnumeratedProperties(obj) {
    // Plain objects are generally defined as having enumerated properties
    // all their own, however in early IE environments without defineProperty,
    // there may also be enumerated methods in the prototype chain, so check
    // for both of these cases.
    var objectProto = Object.prototype;
    for (var key in obj) {
      var val = obj[key];
      if (!hasOwn(obj, key) && val !== objectProto[key]) {
        return false;
      }
    }
    return true;
  }

  function simpleRepeat(n, fn) {
    for (var i = 0; i < n; i++) {
      fn(i);
    }
  }

  function simpleClone(obj) {
    return simpleMerge({}, obj);
  }

  // TODO: Use Object.assign here going forward.
  function simpleMerge(target, source) {
    forEachProperty(source, function(val, key) {
      target[key] = val;
    });
    return target;
  }

  // Make primtives types like strings into objects.
  function coercePrimitiveToObject(obj) {
    if (isPrimitive(obj)) {
      obj = Object(obj);
    }
    // istanbul ignore next
    if (NO_KEYS_IN_STRING_OBJECTS && isString(obj)) {
      forceStringCoercion(obj);
    }
    return obj;
  }

  // Force strings to have their indexes set in
  // environments that don't do this automatically.
  // istanbul ignore next
  function forceStringCoercion(obj) {
    var i = 0, chr;
    while (chr = obj.charAt(i)) {
      obj[i++] = chr;
    }
  }

  // Equality helpers

  // Perf
  function isEqual(a, b, stack) {
    var aClass, bClass;
    if (a === b) {
      // Return quickly up front when matched by reference,
      // but be careful about 0 !== -0.
      return a !== 0 || 1 / a === 1 / b;
    }
    aClass = classToString(a);
    bClass = classToString(b);
    if (aClass !== bClass) {
      return false;
    }

    if (isSerializable(a, aClass) && isSerializable(b, bClass)) {
      return objectIsEqual(a, b, aClass, stack);
    } else if (isSet(a, aClass) && isSet(b, bClass)) {
      return a.size === b.size && isEqual(setToArray(a), setToArray(b), stack);
    } else if (isMap(a, aClass) && isMap(b, bClass)) {
      return a.size === b.size && isEqual(mapToArray(a), mapToArray(b), stack);
    } else if (isError(a, aClass) && isError(b, bClass)) {
      return a.toString() === b.toString();
    }

    return false;
  }

  // Perf
  function objectIsEqual(a, b, aClass, stack) {
    var aType = typeof a, bType = typeof b, propsEqual, count;
    if (aType !== bType) {
      return false;
    }
    if (isObjectType(a.valueOf())) {
      if (a.length !== b.length) {
        // perf: Quickly returning up front for arrays.
        return false;
      }
      count = 0;
      propsEqual = true;
      iterateWithCyclicCheck(a, false, stack, function(key, val, cyc, stack) {
        if (!cyc && (!(key in b) || !isEqual(val, b[key], stack))) {
          propsEqual = false;
        }
        count++;
        return propsEqual;
      });
      if (!propsEqual || count !== getKeys(b).length) {
        return false;
      }
    }
    // Stringifying the value handles NaN, wrapped primitives, dates, and errors in one go.
    return a.valueOf().toString() === b.valueOf().toString();
  }

  // Serializes an object in a way that will provide a token unique
  // to the type, class, and value of an object. Host objects, class
  // instances etc, are not serializable, and are held in an array
  // of references that will return the index as a unique identifier
  // for the object. This array is passed from outside so that the
  // calling function can decide when to dispose of this array.
  function serializeInternal(obj, refs, stack) {
    var type = typeof obj, sign = '', className, value, ref;

    // Return up front on
    if (1 / obj === -Infinity) {
      sign = '-';
    }

    // Return quickly for primitives to save cycles
    if (isPrimitive(obj, type) && !isRealNaN(obj)) {
      return type + sign + obj;
    }

    className = classToString(obj);

    if (!isSerializable(obj, className)) {
      ref = indexOf(refs, obj);
      if (ref === -1) {
        ref = refs.length;
        refs.push(obj);
      }
      return ref;
    } else if (isObjectType(obj)) {
      value = serializeDeep(obj, refs, stack) + obj.toString();
    } else if (obj.valueOf) {
      value = obj.valueOf();
    }
    return type + className + sign + value;
  }

  function serializeDeep(obj, refs, stack) {
    var result = '';
    iterateWithCyclicCheck(obj, true, stack, function(key, val, cyc, stack) {
      result += cyc ? 'CYC' : key + serializeInternal(val, refs, stack);
    });
    return result;
  }

  function iterateWithCyclicCheck(obj, sortedKeys, stack, fn) {

    function next(val, key) {
      var cyc = false;

      // Allowing a step into the structure before triggering this check to save
      // cycles on standard JSON structures and also to try as hard as possible to
      // catch basic properties that may have been modified.
      if (stack.length > 1) {
        var i = stack.length;
        while (i--) {
          if (stack[i] === val) {
            cyc = true;
          }
        }
      }

      stack.push(val);
      fn(key, val, cyc, stack);
      stack.pop();
    }

    function iterateWithSortedKeys() {
      // Sorted keys is required for serialization, where object order
      // does not matter but stringified order does.
      var arr = getKeys(obj).sort(), key;
      for (var i = 0; i < arr.length; i++) {
        key = arr[i];
        next(obj[key], arr[i]);
      }
    }

    // This method for checking for cyclic structures was egregiously stolen from
    // the ingenious method by @kitcambridge from the Underscore script:
    // https://github.com/documentcloud/underscore/issues/240
    if (!stack) {
      stack = [];
    }

    if (sortedKeys) {
      iterateWithSortedKeys();
    } else {
      forEachProperty(obj, next);
    }
  }


  // Array helpers

  function isArrayIndex(n) {
    return n >>> 0 == n && n != 0xFFFFFFFF;
  }

  function iterateOverSparseArray(arr, fn, fromIndex, loop) {
    var indexes = getSparseArrayIndexes(arr, fromIndex, loop), index;
    for (var i = 0, len = indexes.length; i < len; i++) {
      index = indexes[i];
      fn.call(arr, arr[index], index, arr);
    }
    return arr;
  }

  // It's unclear whether or not sparse arrays qualify as "simple enumerables".
  // If they are not, however, the wrapping function will be deoptimized, so
  // isolate here (also to share between es5 and array modules).
  function getSparseArrayIndexes(arr, fromIndex, loop, fromRight) {
    var indexes = [], i;
    for (i in arr) {
      // istanbul ignore next
      if (isArrayIndex(i) && (loop || (fromRight ? i <= fromIndex : i >= fromIndex))) {
        indexes.push(+i);
      }
    }
    indexes.sort(function(a, b) {
      var aLoop = a > fromIndex;
      var bLoop = b > fromIndex;
      // This block cannot be reached unless ES5 methods are being shimmed.
      // istanbul ignore if
      if (aLoop !== bLoop) {
        return aLoop ? -1 : 1;
      }
      return a - b;
    });
    return indexes;
  }

  function getEntriesForIndexes(obj, find, loop, isString) {
    var result, length = obj.length;
    if (!isArray(find)) {
      return entryAtIndex(obj, find, length, loop, isString);
    }
    result = new Array(find.length);
    forEach(find, function(index, i) {
      result[i] = entryAtIndex(obj, index, length, loop, isString);
    });
    return result;
  }

  function getNormalizedIndex(index, length, loop) {
    if (index && loop) {
      index = index % length;
    }
    if (index < 0) index = length + index;
    return index;
  }

  function entryAtIndex(obj, index, length, loop, isString) {
    index = getNormalizedIndex(index, length, loop);
    return isString ? obj.charAt(index) : obj[index];
  }

  function mapWithShortcuts(el, f, context, mapArgs) {
    if (!f) {
      return el;
    } else if (f.apply) {
      return f.apply(context, mapArgs);
    } else if (isArray(f)) {
      return map(f, function(m) {
        return mapWithShortcuts(el, m, context, mapArgs);
      });
    } else if (isFunction(el[f])) {
      return el[f].call(el);
    } else {
      return deepGetProperty(el, f, true);
    }
  }

  function spaceSplit(str) {
    return str.split(' ');
  }

  function commaSplit(str) {
    return str.split(HALF_WIDTH_COMMA);
  }

  function periodSplit(str) {
    return str.split(HALF_WIDTH_PERIOD);
  }

  function forEach(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (!(i in arr)) {
        return iterateOverSparseArray(arr, fn, i);
      }
      fn(arr[i], i);
    }
  }

  function filter(arr, fn) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      var el = arr[i];
      if (i in arr && fn(el, i)) {
        result.push(el);
      }
    }
    return result;
  }

  function map(arr, fn) {
    // perf: Not using fixed array len here as it may be sparse.
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      if (i in arr) {
        result.push(fn(arr[i], i));
      }
    }
    return result;
  }

  function indexOf(arr, el) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (i in arr && arr[i] === el) return i;
    }
    return -1;
  }

  // Number helpers

  // istanbul ignore next
  var trunc = Math.trunc || function(n) {
    if (n === 0 || !isFinite(n)) return n;
    return n < 0 ? ceil(n) : floor(n);
  };

  function isRealNaN(obj) {
    // This is only true of NaN
    return obj != null && obj !== obj;
  }

  function withPrecision(val, precision, fn) {
    var multiplier = pow(10, abs(precision || 0));
    fn = fn || round;
    if (precision < 0) multiplier = 1 / multiplier;
    return fn(val * multiplier) / multiplier;
  }

  function padNumber(num, place, sign, base, replacement) {
    var str = abs(num).toString(base || 10);
    str = repeatString(replacement || '0', place - str.replace(/\.\d+/, '').length) + str;
    if (sign || num < 0) {
      str = (num < 0 ? '-' : '+') + str;
    }
    return str;
  }

  function getOrdinalSuffix(num) {
    if (num >= 11 && num <= 13) {
      return 'th';
    } else {
      switch(num % 10) {
        case 1:  return 'st';
        case 2:  return 'nd';
        case 3:  return 'rd';
        default: return 'th';
      }
    }
  }

  // Fullwidth number helpers
  var fullWidthNumberReg, fullWidthNumberMap, fullWidthNumbers;

  function buildFullWidthNumber() {
    var fwp = FULL_WIDTH_PERIOD, hwp = HALF_WIDTH_PERIOD, hwc = HALF_WIDTH_COMMA, fwn = '';
    fullWidthNumberMap = {};
    for (var i = 0, digit; i <= 9; i++) {
      digit = chr(i + FULL_WIDTH_ZERO);
      fwn += digit;
      fullWidthNumberMap[digit] = chr(i + HALF_WIDTH_ZERO);
    }
    fullWidthNumberMap[hwc] = '';
    fullWidthNumberMap[fwp] = hwp;
    // Mapping this to itself to capture it easily
    // in stringToNumber to detect decimals later.
    fullWidthNumberMap[hwp] = hwp;
    fullWidthNumberReg = allCharsReg(fwn + fwp + hwc + hwp);
    fullWidthNumbers = fwn;
  }

  // Takes into account full-width characters, commas, and decimals.
  function stringToNumber(str, base) {
    var sanitized, isDecimal;
    sanitized = str.replace(fullWidthNumberReg, function(chr) {
      var replacement = getOwn(fullWidthNumberMap, chr);
      if (replacement === HALF_WIDTH_PERIOD) {
        isDecimal = true;
      }
      return replacement;
    });
    return isDecimal ? parseFloat(sanitized) : parseInt(sanitized, base || 10);
  }

  // Math aliases
  var abs   = Math.abs,
      pow   = Math.pow,
      min   = Math.min,
      max   = Math.max,
      ceil  = Math.ceil,
      floor = Math.floor,
      round = Math.round;


  // String helpers

  var chr = String.fromCharCode;

  function trim(str) {
    return str.trim();
  }

  function repeatString(str, num) {
    var result = '';
    str = str.toString();
    while (num > 0) {
      if (num & 1) {
        result += str;
      }
      if (num >>= 1) {
        str += str;
      }
    }
    return result;
  }

  function simpleCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function createFormatMatcher(bracketMatcher, percentMatcher, precheck) {

    var reg = STRING_FORMAT_REG;
    var compileMemoized = memoizeFunction(compile);

    function getToken(format, match) {
      var get, token, literal, fn;
      var bKey = match[2];
      var pLit = match[3];
      var pKey = match[5];
      if (match[4] && percentMatcher) {
        token = pKey;
        get = percentMatcher;
      } else if (bKey) {
        token = bKey;
        get = bracketMatcher;
      } else if (pLit && percentMatcher) {
        literal = pLit;
      } else {
        literal = match[1] || match[0];
      }
      if (get) {
        assertPassesPrecheck(precheck, bKey, pKey);
        fn = function(obj, opt) {
          return get(obj, token, opt);
        };
      }
      format.push(fn || getLiteral(literal));
    }

    function getSubstring(format, str, start, end) {
      if (end > start) {
        var sub = str.slice(start, end);
        assertNoUnmatched(sub, OPEN_BRACE);
        assertNoUnmatched(sub, CLOSE_BRACE);
        format.push(function() {
          return sub;
        });
      }
    }

    function getLiteral(str) {
      return function() {
        return str;
      };
    }

    function assertPassesPrecheck(precheck, bt, pt) {
      if (precheck && !precheck(bt, pt)) {
        throw new TypeError('Invalid token '+ (bt || pt) +' in format string');
      }
    }

    function assertNoUnmatched(str, chr) {
      if (str.indexOf(chr) !== -1) {
        throw new TypeError('Unmatched '+ chr +' in format string');
      }
    }

    function compile(str) {
      var format = [], lastIndex = 0, match;
      reg.lastIndex = 0;
      while(match = reg.exec(str)) {
        getSubstring(format, str, lastIndex, match.index);
        getToken(format, match);
        lastIndex = reg.lastIndex;
      }
      getSubstring(format, str, lastIndex, str.length);
      return format;
    }

    return function(str, obj, opt) {
      var format = compileMemoized(str), result = '';
      for (var i = 0; i < format.length; i++) {
        result += format[i](obj, opt);
      }
      return result;
    };
  }

  // Inflection helper

  var Inflections = {};

  function getAcronym(str) {
    // istanbul ignore next
    return Inflections.acronyms && Inflections.acronyms.find(str);
  }

  function getHumanWord(str) {
    // istanbul ignore next
    return Inflections.human && Inflections.human.find(str);
  }

  function runHumanRules(str) {
    // istanbul ignore next
    return Inflections.human && Inflections.human.runRules(str) || str;
  }

  // RegExp helpers

  function allCharsReg(src) {
    return RegExp('[' + src + ']', 'g');
  }

  function getRegExpFlags(reg, add) {
    var flags = '';
    add = add || '';
    function checkFlag(prop, flag) {
      if (prop || add.indexOf(flag) > -1) {
        flags += flag;
      }
    }
    checkFlag(reg.global, 'g');
    checkFlag(reg.ignoreCase, 'i');
    checkFlag(reg.multiline, 'm');
    checkFlag(reg.sticky, 'y');
    return flags;
  }

  function escapeRegExp(str) {
    if (!isString(str)) str = String(str);
    return str.replace(/([\\/'*+?|()[\]{}.^$-])/g,'\\$1');
  }

  // Date helpers

  var _utc = privatePropertyAccessor('utc');

  function callDateGet(d, method) {
    return d['get' + (_utc(d) ? 'UTC' : '') + method]();
  }

  function callDateSet(d, method, value, safe) {
    // "Safe" denotes not setting the date if the value is the same as what is
    // currently set. In theory this should be a noop, however it will cause
    // timezone shifts when in the middle of a DST fallback. This is unavoidable
    // as the notation itself is ambiguous (i.e. there are two "1:00ams" on
    // November 1st, 2015 in northern hemisphere timezones that follow DST),
    // however when advancing or rewinding dates this can throw off calculations
    // so avoiding this unintentional shifting on an opt-in basis.
    if (safe && value === callDateGet(d, method, value)) {
      return;
    }
    d['set' + (_utc(d) ? 'UTC' : '') + method](value);
  }

  // Memoization helpers

  var INTERNAL_MEMOIZE_LIMIT = 1000;

  // Note that attemps to consolidate this with Function#memoize
  // ended up clunky as that is also serializing arguments. Separating
  // these implementations turned out to be simpler.
  function memoizeFunction(fn) {
    var memo = {}, counter = 0;

    return function(key) {
      if (hasOwn(memo, key)) {
        return memo[key];
      }
      // istanbul ignore if
      if (counter === INTERNAL_MEMOIZE_LIMIT) {
        memo = {};
        counter = 0;
      }
      counter++;
      return memo[key] = fn(key);
    };
  }

  // ES6 helpers

  function setToArray(set) {
    var arr = new Array(set.size), i = 0;
    set.forEach(function(val) {
      arr[i++] = val;
    });
    return arr;
  }

  function mapToArray(map) {
    var arr = new Array(map.size), i = 0;
    map.forEach(function(val, key) {
      arr[i++] = [key, val];
    });
    return arr;
  }

  buildClassChecks();
  buildFullWidthNumber();

  /***
   * @module ES5
   * @description Functions and polyfill methods that fix ES5 functionality. This
   *              module is excluded from default builds, and can be included if
   *              you need legacy browser support (IE8 and below).
   *
   ***/

  // Non-enumerable properties on Object.prototype. In early JScript implementations
  // (< IE9) these will shadow object properties and break for..in loops.
  var DONT_ENUM_PROPS = [
    'valueOf',
    'toString',
    'constructor',
    'isPrototypeOf',
    'hasOwnProperty',
    'toLocaleString',
    'propertyIsEnumerable'
  ];

  /***
   * @fix
   * @short Fixes DontEnum bug for iteration methods in < IE9.
   ***/
  function buildDontEnumFix() {
    if (!({toString:1}).propertyIsEnumerable('toString')) {
      var forEachEnumerableProperty = forEachProperty;
      forEachProperty = function(obj, fn) {
        forEachEnumerableProperty(obj, fn);
        for (var i = 0, key; key = DONT_ENUM_PROPS[i]; i++) {
          if (hasOwn(obj, key)) {
            if(fn.call(obj, obj[key], key, obj) === false) break;
          }
        }
      };
    }
  }

  /***
   * @fix
   * @short Adds native methods to chainables in < IE9.
   ***/
  function buildChainableNativeMethodsFix() {
    if (!Object.getOwnPropertyNames) {
      defineNativeMethodsOnChainable();
    }
  }

  // Polyfilled methods will automatically be added to the chainable prototype.
  // However, Object.getOwnPropertyNames cannot be shimmed for non-enumerable
  // properties, so if it does not exist, then the only way to access native
  // methods previous to ES5 is to provide them as a list of tokens here.
  function defineNativeMethodsOnChainable() {

    var nativeTokens = {
      'Function': 'apply,call',
      'RegExp':   'compile,exec,test',
      'Number':   'toExponential,toFixed,toLocaleString,toPrecision',
      'Object':   'hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString',
      'Array':    'concat,join,pop,push,reverse,shift,slice,sort,splice,toLocaleString,unshift',
      'Date':     'getTime,getTimezoneOffset,setTime,toDateString,toGMTString,toLocaleDateString,toLocaleString,toLocaleTimeString,toTimeString,toUTCString',
      'String':   'anchor,big,blink,bold,charAt,charCodeAt,concat,fixed,fontcolor,fontsize,indexOf,italics,lastIndexOf,link,localeCompare,match,replace,search,slice,small,split,strike,sub,substr,substring,sup,toLocaleLowerCase,toLocaleUpperCase,toLowerCase,toUpperCase'
    };

    var dateTokens = 'FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds'.split(',');

    function addDateTokens(prefix, arr) {
      for (var i = 0; i < dateTokens.length; i++) {
        arr.push(prefix + dateTokens[i]);
      }
    }

    forEachProperty(nativeTokens, function(str, name) {
      var tokens = str.split(',');
      if (name === 'Date') {
        addDateTokens('get', tokens);
        addDateTokens('set', tokens);
        addDateTokens('getUTC', tokens);
        addDateTokens('setUTC', tokens);
      }
      tokens.push('toString');
      mapNativeToChainable(name, tokens);
    });

  }


  buildDontEnumFix();
  buildChainableNativeMethodsFix();


  /*** @namespace Object ***/

  function assertNonNull(obj) {
    if (obj == null) {
      throw new TypeError('Object required');
    }
  }

  defineStaticPolyfill(sugarObject, {

    'keys': function(obj) {
      var keys = [];
      assertNonNull(obj);
      forEachProperty(coercePrimitiveToObject(obj), function(val, key) {
        keys.push(key);
      });
      return keys;
    }

  });


  /*** @namespace Array ***/

  function arrayIndexOf(arr, search, fromIndex, fromRight) {
    var length = arr.length, defaultFromIndex, index, increment;

    increment = fromRight ? -1 : 1;
    defaultFromIndex = fromRight ? length - 1 : 0;
    fromIndex = trunc(fromIndex);
    if (!fromIndex && fromIndex !== 0) {
      fromIndex = defaultFromIndex;
    }
    if (fromIndex < 0) {
      fromIndex = length + fromIndex;
    }
    if ((!fromRight && fromIndex < 0) || (fromRight && fromIndex >= length)) {
      fromIndex = defaultFromIndex;
    }

    index = fromIndex;

    while((fromRight && index >= 0) || (!fromRight && index < length)) {
      if (!(index in arr)) {
        return sparseIndexOf(arr, search, fromIndex, fromRight);
      }
      if (isArrayIndex(index) && arr[index] === search) {
        return index;
      }
      index += increment;
    }
    return -1;
  }

  function sparseIndexOf(arr, search, fromIndex, fromRight) {
    var indexes = getSparseArrayIndexes(arr, fromIndex, false, fromRight), index;
    indexes.sort(function(a, b) {
      return fromRight ? b - a : a - b;
    });
    while ((index = indexes.shift()) !== undefined) {
      if (arr[index] === search) {
        return +index;
      }
    }
    return -1;
  }

  function arrayReduce(arr, fn, initialValue, fromRight) {
    var length = arr.length, count = 0, defined = isDefined(initialValue), result, index;
    assertCallable(fn);
    if (length == 0 && !defined) {
      throw new TypeError('Reduce called on empty array with no initial value');
    } else if (defined) {
      result = initialValue;
    } else {
      result = arr[fromRight ? length - 1 : count];
      count++;
    }
    while(count < length) {
      index = fromRight ? length - count - 1 : count;
      if (index in arr) {
        result = fn(result, arr[index], index, arr);
      }
      count++;
    }
    return result;
  }

  defineStaticPolyfill(sugarArray, {

    /***
     *
     * @method isArray(obj)
     * @returns Boolean
     * @polyfill ES5
     * @static
     * @short Returns true if `obj` is an Array.
     *
     * @example
     *
     *   Array.isArray(3)        -> false
     *   Array.isArray(true)     -> false
     *   Array.isArray('wasabi') -> false
     *   Array.isArray([1,2,3])  -> true
     *
     ***/
    'isArray': function(obj) {
      return isArray(obj);
    }

  });

  defineInstancePolyfill(sugarArray, {

    'every': function(fn) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, context = arguments[1];
      var length = this.length, index = 0;
      assertCallable(fn);
      while(index < length) {
        if (index in this && !fn.call(context, this[index], index, this)) {
          return false;
        }
        index++;
      }
      return true;
    },

    'some': function(fn) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, context = arguments[1];
      var length = this.length, index = 0;
      assertCallable(fn);
      while(index < length) {
        if (index in this && fn.call(context, this[index], index, this)) {
          return true;
        }
        index++;
      }
      return false;
    },

    'map': function(fn) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, context = arguments[1];
      var length = this.length, index = 0, result = new Array(length);
      assertCallable(fn);
      while(index < length) {
        if (index in this) {
          result[index] = fn.call(context, this[index], index, this);
        }
        index++;
      }
      return result;
    },

    'filter': function(fn) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, context = arguments[1];
      var length = this.length, index = 0, result = [];
      assertCallable(fn);
      while(index < length) {
        if (index in this && fn.call(context, this[index], index, this)) {
          result.push(this[index]);
        }
        index++;
      }
      return result;
    },

    /***
     * @method indexOf(search, [fromIndex] = 0)
     * @returns Number
     * @polyfill ES5
     * @short Searches the array and returns the first index where `search` occurs,
     *        or `-1` if the element is not found.
     * @extra [fromIndex] is the index from which to begin the search. This
     *        method performs a simple strict equality comparison on `search`.
     *        Sugar does not enhance this method to support `enhanced matching`.
     *        For such functionality, use the `findIndex` method instead.
     *
     * @example
     *
     *   [1,2,3].indexOf(3) -> 1
     *   [1,2,3].indexOf(7) -> -1
     *
     ***/
    'indexOf': function(search) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, fromIndex = arguments[1];
      if (isString(this)) return this.indexOf(search, fromIndex);
      return arrayIndexOf(this, search, fromIndex);
    },

    /***
     * @method lastIndexOf(search, [fromIndex] = array.length - 1)
     * @returns Number
     * @polyfill ES5
     * @short Searches the array from the end and returns the first index where
     *        `search` occurs, or `-1` if the element is not found.
     * @extra [fromIndex] is the index from which to begin the search. This method
     *        performs a simple strict equality comparison on `search`.
     *        Sugar does not enhance this method to support `enhanced matching`.
     *
     * @example
     *
     *   [1,2,1].lastIndexOf(1) -> 2
     *   [1,2,1].lastIndexOf(7) -> -1
     *
     ***/
    'lastIndexOf': function(search) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, fromIndex = arguments[1];
      if (isString(this)) return this.lastIndexOf(search, fromIndex);
      return arrayIndexOf(this, search, fromIndex, true);
    },

    /***
     * @method forEach([eachFn], [context])
     * @polyfill ES5
     * @short Iterates over the array, calling [eachFn] on each loop.
     * @extra [context] becomes the `this` object.
     *
     * @callback eachFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   ['a','b','c'].forEach(function(a) {
     *     // Called 3 times: 'a','b','c'
     *   });
     *
     ***/
    'forEach': function(eachFn) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, context = arguments[1];
      var length = this.length, index = 0;
      assertCallable(eachFn);
      while(index < length) {
        if (index in this) {
          eachFn.call(context, this[index], index, this);
        }
        index++;
      }
    },

    /***
     * @method reduce(reduceFn, [init])
     * @returns Mixed
     * @polyfill ES5
     * @short Reduces the array to a single result.
     * @extra This operation is sometimes called "accumulation", as it takes the
     *        result of the last iteration of `reduceFn` and passes it as the first
     *        argument to the next iteration, "accumulating" that value as it goes.
     *        The return value of this method will be the return value of the final
     *        iteration of `reduceFn`. If [init] is passed, it will be the initial
     *        "accumulator" (the first argument). If [init] is not passed, then it
     *        will take the first element in the array, and `reduceFn` will not be
     *        called for that element.
     *
     * @callback reduceFn
     *
     *   acc  The "accumulator". Either [init], the result of the last iteration
     *        of `reduceFn`, or the first element of the array.
     *   el   The current element for this iteration.
     *   idx  The current index for this iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3].reduce(function(a, b) {
     *     return a - b; // 1 - 2 - 3
     *   });
     *
     *   [1,2,3].reduce(function(a, b) {
     *     return a - b; // 100 - 1 - 2 - 3
     *   }, 100);
     *
     ***/
    'reduce': function(reduceFn) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, context = arguments[1];
      return arrayReduce(this, reduceFn, context);
    },

    /***
     * @method reduceRight([reduceFn], [init])
     * @returns Mixed
     * @polyfill ES5
     * @short Similar to `Array#reduce`, but operates on the elements in reverse.
     *
     * @callback reduceFn
     *
     *   acc  The "accumulator", either [init], the result of the last iteration
     *        of `reduceFn`, or the last element of the array.
     *   el   The current element for this iteration.
     *   idx  The current index for this iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3].reduceRight(function(a, b) {
     *     return a - b; // 3 - 2 - 1
     *   });
     *
     *   [1,2,3].reduceRight(function(a, b) {
     *     return a - b; // 100 - 3 - 2 - 1
     *   }, 100);
     *
     *
     ***/
    'reduceRight': function(reduceFn) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, context = arguments[1];
      return arrayReduce(this, reduceFn, context, true);
    }

  });


  /*** @namespace String ***/

  var TRIM_REG = RegExp('^[' + TRIM_CHARS + ']+|['+ TRIM_CHARS +']+$', 'g');

  defineInstancePolyfill(sugarString, {
    /***
     * @method trim()
     * @returns String
     * @polyfill ES5
     * @short Removes leading and trailing whitespace from the string.
     * @extra Whitespace is defined as line breaks, tabs, and any character in the
     *        "Space, Separator" Unicode category, conforming to the the ES5 spec.
     *
     * @example
     *
     *   '   wasabi   '.trim()      -> 'wasabi'
     *   '   wasabi   '.trimLeft()  -> 'wasabi   '
     *   '   wasabi   '.trimRight() -> '   wasabi'
     *
     ***/
    'trim': function() {
      return this.toString().replace(TRIM_REG, '');
    }
  });


  /*** @namespace Function ***/

  defineInstancePolyfill(sugarFunction, {

     /***
     * @method bind(context, [arg1], ...)
     * @returns Function
     * @polyfill ES5
     * @short Binds `context` as the `this` object for the function when it is
     *        called. Also allows currying an unlimited number of parameters.
     * @extra "currying" means setting parameters ([arg1], [arg2], etc.) ahead of
     *        time so that they are passed when the function is called later. If
     *        you pass additional parameters when the function is actually called,
     *        they will be added to the end of the curried parameters.
     *
     * @example
     *
     *   logThis.bind('woof')()   -> logs 'woof' as its this object
     *   addArgs.bind(1, 2, 3)()  -> returns 5 with 1 as the this object
     *   addArgs.bind(1)(2, 3, 4) -> returns 9
     *
     ***/
    'bind': function(context) {
      // Optimized: no leaking arguments
      var boundArgs = []; for(var $i = 1, $len = arguments.length; $i < $len; $i++) boundArgs.push(arguments[$i]);
      var fn = this, bound;
      assertCallable(this);
      bound = function() {
        // Optimized: no leaking arguments
        var args = []; for(var $i = 0, $len = arguments.length; $i < $len; $i++) args.push(arguments[$i]);
        return fn.apply(fn.prototype && this instanceof fn ? this : context, boundArgs.concat(args));
      };
      bound.prototype = this.prototype;
      return bound;
    }

  });


  /*** @namespace Date ***/

  defineStaticPolyfill(sugarDate, {

     /***
     * @method now()
     * @returns String
     * @polyfill ES5
     * @static
     * @short Returns the current time as a Unix timestamp.
     * @extra The number of milliseconds since January 1st, 1970 00:00:00 (UTC).
     *
     * @example
     *
     *   Date.now() -> ex. 1311938296231
     *
     ***/
    'now': function() {
      return new Date().getTime();
    }

  });

  function hasISOSupport() {
    var d = new Date(Date.UTC(2000, 0));
    return !!d.toISOString && d.toISOString() === '2000-01-01T00:00:00.000Z';
  }

  defineInstancePolyfill(sugarDate, {

     /***
     * @method toISOString()
     * @returns String
     * @polyfill ES5
     * @short Formats the string to ISO8601 format.
     * @extra This will always format as UTC time.
     *
     * @example
     *
     *   Date.create().toISOString() -> ex. 2011-07-05 12:24:55.528Z
     *
     ***/
    'toISOString': function() {
      return padNumber(this.getUTCFullYear(), 4) + '-' +
             padNumber(this.getUTCMonth() + 1, 2) + '-' +
             padNumber(this.getUTCDate(), 2) + 'T' +
             padNumber(this.getUTCHours(), 2) + ':' +
             padNumber(this.getUTCMinutes(), 2) + ':' +
             padNumber(this.getUTCSeconds(), 2) + '.' +
             padNumber(this.getUTCMilliseconds(), 3) + 'Z';
    },

     /***
     * @method toJSON([key])
     * @returns String
     * @polyfill ES5
     * @short Returns a JSON representation of the date.
     * @extra This is effectively an alias for `toISOString`. Will always return
     *        the date in UTC time. [key] is ignored.
     *
     * @example
     *
     *   Date.create().toJSON() -> ex. 2011-07-05 12:24:55.528Z
     *
     ***/
    'toJSON': function(key) {
      // Force compiler to respect argument length.
      var argLen = arguments.length;
      return this.toISOString(key);
    }

  }, !hasISOSupport());

}).call(this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/allCharsReg.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/allCharsReg.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function allCharsReg(src) {
  return RegExp('[' + src + ']', 'g');
}

module.exports = allCharsReg;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/callDateGet.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/callDateGet.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utc = __webpack_require__(/*! ../var/_utc */ "./node_modules/sugar-date/common/var/_utc.js");

function callDateGet(d, method) {
  return d['get' + (_utc(d) ? 'UTC' : '') + method]();
}

module.exports = callDateGet;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/callDateSet.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/callDateSet.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utc = __webpack_require__(/*! ../var/_utc */ "./node_modules/sugar-date/common/var/_utc.js"),
    callDateGet = __webpack_require__(/*! ./callDateGet */ "./node_modules/sugar-date/common/internal/callDateGet.js");

function callDateSet(d, method, value, safe) {
  // "Safe" denotes not setting the date if the value is the same as what is
  // currently set. In theory this should be a noop, however it will cause
  // timezone shifts when in the middle of a DST fallback. This is unavoidable
  // as the notation itself is ambiguous (i.e. there are two "1:00ams" on
  // November 1st, 2015 in northern hemisphere timezones that follow DST),
  // however when advancing or rewinding dates this can throw off calculations
  // so avoiding this unintentional shifting on an opt-in basis.
  if (safe && value === callDateGet(d, method, value)) {
    return;
  }
  d['set' + (_utc(d) ? 'UTC' : '') + method](value);
}

module.exports = callDateSet;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/collectSimilarMethods.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/collectSimilarMethods.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = __webpack_require__(/*! ./forEach */ "./node_modules/sugar-date/common/internal/forEach.js"),
    spaceSplit = __webpack_require__(/*! ./spaceSplit */ "./node_modules/sugar-date/common/internal/spaceSplit.js"),
    classChecks = __webpack_require__(/*! ../var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js");

var isString = classChecks.isString;

function collectSimilarMethods(set, fn) {
  var methods = {};
  if (isString(set)) {
    set = spaceSplit(set);
  }
  forEach(set, function(el, i) {
    fn(methods, el, i);
  });
  return methods;
}

module.exports = collectSimilarMethods;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/commaSplit.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/commaSplit.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CommonChars = __webpack_require__(/*! ../var/CommonChars */ "./node_modules/sugar-date/common/var/CommonChars.js");

var HALF_WIDTH_COMMA = CommonChars.HALF_WIDTH_COMMA;

function commaSplit(str) {
  return str.split(HALF_WIDTH_COMMA);
}

module.exports = commaSplit;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/createFormatMatcher.js":
/*!************************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/createFormatMatcher.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var STRING_FORMAT_REG = __webpack_require__(/*! ../var/STRING_FORMAT_REG */ "./node_modules/sugar-date/common/var/STRING_FORMAT_REG.js"),
    CommonChars = __webpack_require__(/*! ../var/CommonChars */ "./node_modules/sugar-date/common/var/CommonChars.js"),
    memoizeFunction = __webpack_require__(/*! ./memoizeFunction */ "./node_modules/sugar-date/common/internal/memoizeFunction.js");

var OPEN_BRACE = CommonChars.OPEN_BRACE,
    CLOSE_BRACE = CommonChars.CLOSE_BRACE;

function createFormatMatcher(bracketMatcher, percentMatcher, precheck) {

  var reg = STRING_FORMAT_REG;
  var compileMemoized = memoizeFunction(compile);

  function getToken(format, match) {
    var get, token, literal, fn;
    var bKey = match[2];
    var pLit = match[3];
    var pKey = match[5];
    if (match[4] && percentMatcher) {
      token = pKey;
      get = percentMatcher;
    } else if (bKey) {
      token = bKey;
      get = bracketMatcher;
    } else if (pLit && percentMatcher) {
      literal = pLit;
    } else {
      literal = match[1] || match[0];
    }
    if (get) {
      assertPassesPrecheck(precheck, bKey, pKey);
      fn = function(obj, opt) {
        return get(obj, token, opt);
      };
    }
    format.push(fn || getLiteral(literal));
  }

  function getSubstring(format, str, start, end) {
    if (end > start) {
      var sub = str.slice(start, end);
      assertNoUnmatched(sub, OPEN_BRACE);
      assertNoUnmatched(sub, CLOSE_BRACE);
      format.push(function() {
        return sub;
      });
    }
  }

  function getLiteral(str) {
    return function() {
      return str;
    };
  }

  function assertPassesPrecheck(precheck, bt, pt) {
    if (precheck && !precheck(bt, pt)) {
      throw new TypeError('Invalid token '+ (bt || pt) +' in format string');
    }
  }

  function assertNoUnmatched(str, chr) {
    if (str.indexOf(chr) !== -1) {
      throw new TypeError('Unmatched '+ chr +' in format string');
    }
  }

  function compile(str) {
    var format = [], lastIndex = 0, match;
    reg.lastIndex = 0;
    while(match = reg.exec(str)) {
      getSubstring(format, str, lastIndex, match.index);
      getToken(format, match);
      lastIndex = reg.lastIndex;
    }
    getSubstring(format, str, lastIndex, str.length);
    return format;
  }

  return function(str, obj, opt) {
    var format = compileMemoized(str), result = '';
    for (var i = 0; i < format.length; i++) {
      result += format[i](obj, opt);
    }
    return result;
  };
}

module.exports = createFormatMatcher;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/defineAccessor.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/defineAccessor.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(/*! ../var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var setProperty = coreUtilityAliases.setProperty;

function defineAccessor(namespace, name, fn) {
  setProperty(namespace, name, fn);
}

module.exports = defineAccessor;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/defineInstanceSimilar.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/defineInstanceSimilar.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var methodDefineAliases = __webpack_require__(/*! ../var/methodDefineAliases */ "./node_modules/sugar-date/common/var/methodDefineAliases.js"),
    collectSimilarMethods = __webpack_require__(/*! ./collectSimilarMethods */ "./node_modules/sugar-date/common/internal/collectSimilarMethods.js");

var defineInstance = methodDefineAliases.defineInstance;

function defineInstanceSimilar(sugarNamespace, set, fn, flags) {
  defineInstance(sugarNamespace, collectSimilarMethods(set, fn), flags);
}

module.exports = defineInstanceSimilar;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/defineOnPrototype.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/defineOnPrototype.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(/*! ../var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var forEachProperty = coreUtilityAliases.forEachProperty;

function defineOnPrototype(ctor, methods) {
  var proto = ctor.prototype;
  forEachProperty(methods, function(val, key) {
    proto[key] = val;
  });
}

module.exports = defineOnPrototype;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/defineOptionsAccessor.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/defineOptionsAccessor.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var simpleClone = __webpack_require__(/*! ./simpleClone */ "./node_modules/sugar-date/common/internal/simpleClone.js"),
    defineAccessor = __webpack_require__(/*! ./defineAccessor */ "./node_modules/sugar-date/common/internal/defineAccessor.js"),
    coreUtilityAliases = __webpack_require__(/*! ../var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var forEachProperty = coreUtilityAliases.forEachProperty;

function defineOptionsAccessor(namespace, defaults) {
  var obj = simpleClone(defaults);

  function getOption(name) {
    return obj[name];
  }

  function setOption(arg1, arg2) {
    var options;
    if (arguments.length === 1) {
      options = arg1;
    } else {
      options = {};
      options[arg1] = arg2;
    }
    forEachProperty(options, function(val, name) {
      if (val === null) {
        val = defaults[name];
      }
      obj[name] = val;
    });
  }

  defineAccessor(namespace, 'getOption', getOption);
  defineAccessor(namespace, 'setOption', setOption);
  return getOption;
}

module.exports = defineOptionsAccessor;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/escapeRegExp.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/escapeRegExp.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(/*! ../var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js");

var isString = classChecks.isString;

function escapeRegExp(str) {
  if (!isString(str)) str = String(str);
  return str.replace(/([\\/'*+?|()[\]{}.^$-])/g,'\\$1');
}

module.exports = escapeRegExp;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/filter.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/filter.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function filter(arr, fn) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var el = arr[i];
    if (i in arr && fn(el, i)) {
      result.push(el);
    }
  }
  return result;
}

module.exports = filter;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/forEach.js":
/*!************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/forEach.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var iterateOverSparseArray = __webpack_require__(/*! ./iterateOverSparseArray */ "./node_modules/sugar-date/common/internal/iterateOverSparseArray.js");

function forEach(arr, fn) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!(i in arr)) {
      return iterateOverSparseArray(arr, fn, i);
    }
    fn(arr[i], i);
  }
}

module.exports = forEach;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/getKeys.js":
/*!************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/getKeys.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getKeys(obj) {
  return Object.keys(obj);
}

module.exports = getKeys;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/getOrdinalSuffix.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/getOrdinalSuffix.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getOrdinalSuffix(num) {
  if (num >= 11 && num <= 13) {
    return 'th';
  } else {
    switch(num % 10) {
      case 1:  return 'st';
      case 2:  return 'nd';
      case 3:  return 'rd';
      default: return 'th';
    }
  }
}

module.exports = getOrdinalSuffix;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/getOwnKey.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/getOwnKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(/*! ../var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var hasOwn = coreUtilityAliases.hasOwn;

function getOwnKey(obj, key) {
  if (hasOwn(obj, key)) {
    return key;
  }
}

module.exports = getOwnKey;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/getSparseArrayIndexes.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/getSparseArrayIndexes.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayIndex = __webpack_require__(/*! ./isArrayIndex */ "./node_modules/sugar-date/common/internal/isArrayIndex.js");

function getSparseArrayIndexes(arr, fromIndex, loop, fromRight) {
  var indexes = [], i;
  for (i in arr) {
    // istanbul ignore next
    if (isArrayIndex(i) && (loop || (fromRight ? i <= fromIndex : i >= fromIndex))) {
      indexes.push(+i);
    }
  }
  indexes.sort(function(a, b) {
    var aLoop = a > fromIndex;
    var bLoop = b > fromIndex;
    // This block cannot be reached unless ES5 methods are being shimmed.
    // istanbul ignore if
    if (aLoop !== bLoop) {
      return aLoop ? -1 : 1;
    }
    return a - b;
  });
  return indexes;
}

module.exports = getSparseArrayIndexes;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/hasOwnEnumeratedProperties.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/hasOwnEnumeratedProperties.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(/*! ../var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var hasOwn = coreUtilityAliases.hasOwn;

function hasOwnEnumeratedProperties(obj) {
  // Plain objects are generally defined as having enumerated properties
  // all their own, however in early IE environments without defineProperty,
  // there may also be enumerated methods in the prototype chain, so check
  // for both of these cases.
  var objectProto = Object.prototype;
  for (var key in obj) {
    var val = obj[key];
    if (!hasOwn(obj, key) && val !== objectProto[key]) {
      return false;
    }
  }
  return true;
}

module.exports = hasOwnEnumeratedProperties;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/hasValidPlainObjectPrototype.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/hasValidPlainObjectPrototype.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(/*! ../var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var hasOwn = coreUtilityAliases.hasOwn;

function hasValidPlainObjectPrototype(obj) {
  var hasToString = 'toString' in obj;
  var hasConstructor = 'constructor' in obj;
  // An object created with Object.create(null) has no methods in the
  // prototype chain, so check if any are missing. The additional hasToString
  // check is for false positives on some host objects in old IE which have
  // toString but no constructor. If the object has an inherited constructor,
  // then check if it is Object (the "isPrototypeOf" tapdance here is a more
  // robust way of ensuring this if the global has been hijacked). Note that
  // accessing the constructor directly (without "in" or "hasOwnProperty")
  // will throw a permissions error in IE8 on cross-domain windows.
  return (!hasConstructor && !hasToString) ||
          (hasConstructor && !hasOwn(obj, 'constructor') &&
           hasOwn(obj.constructor.prototype, 'isPrototypeOf'));
}

module.exports = hasValidPlainObjectPrototype;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/isArrayIndex.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/isArrayIndex.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isArrayIndex(n) {
  return n >>> 0 == n && n != 0xFFFFFFFF;
}

module.exports = isArrayIndex;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/isClass.js":
/*!************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/isClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(/*! ../var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var classToString = coreUtilityAliases.classToString;

function isClass(obj, className, str) {
  if (!str) {
    str = classToString(obj);
  }
  return str === '[object '+ className +']';
}

module.exports = isClass;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/isDefined.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/isDefined.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isDefined(o) {
  return o !== undefined;
}

module.exports = isDefined;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/isObjectType.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/isObjectType.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isObjectType(obj, type) {
  return !!obj && (type || typeof obj) === 'object';
}

module.exports = isObjectType;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/isPlainObject.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/isPlainObject.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isClass = __webpack_require__(/*! ./isClass */ "./node_modules/sugar-date/common/internal/isClass.js"),
    isObjectType = __webpack_require__(/*! ./isObjectType */ "./node_modules/sugar-date/common/internal/isObjectType.js"),
    hasOwnEnumeratedProperties = __webpack_require__(/*! ./hasOwnEnumeratedProperties */ "./node_modules/sugar-date/common/internal/hasOwnEnumeratedProperties.js"),
    hasValidPlainObjectPrototype = __webpack_require__(/*! ./hasValidPlainObjectPrototype */ "./node_modules/sugar-date/common/internal/hasValidPlainObjectPrototype.js");

function isPlainObject(obj, className) {
  return isObjectType(obj) &&
         isClass(obj, 'Object', className) &&
         hasValidPlainObjectPrototype(obj) &&
         hasOwnEnumeratedProperties(obj);
}

module.exports = isPlainObject;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/isUndefined.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/isUndefined.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isUndefined(o) {
  return o === undefined;
}

module.exports = isUndefined;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/iterateOverSparseArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/iterateOverSparseArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getSparseArrayIndexes = __webpack_require__(/*! ./getSparseArrayIndexes */ "./node_modules/sugar-date/common/internal/getSparseArrayIndexes.js");

function iterateOverSparseArray(arr, fn, fromIndex, loop) {
  var indexes = getSparseArrayIndexes(arr, fromIndex, loop), index;
  for (var i = 0, len = indexes.length; i < len; i++) {
    index = indexes[i];
    fn.call(arr, arr[index], index, arr);
  }
  return arr;
}

module.exports = iterateOverSparseArray;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/map.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/map.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function map(arr, fn) {
  // perf: Not using fixed array len here as it may be sparse.
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (i in arr) {
      result.push(fn(arr[i], i));
    }
  }
  return result;
}

module.exports = map;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/memoizeFunction.js":
/*!********************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/memoizeFunction.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var INTERNAL_MEMOIZE_LIMIT = __webpack_require__(/*! ../var/INTERNAL_MEMOIZE_LIMIT */ "./node_modules/sugar-date/common/var/INTERNAL_MEMOIZE_LIMIT.js"),
    coreUtilityAliases = __webpack_require__(/*! ../var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var hasOwn = coreUtilityAliases.hasOwn;

function memoizeFunction(fn) {
  var memo = {}, counter = 0;

  return function(key) {
    if (hasOwn(memo, key)) {
      return memo[key];
    }
    // istanbul ignore if
    if (counter === INTERNAL_MEMOIZE_LIMIT) {
      memo = {};
      counter = 0;
    }
    counter++;
    return memo[key] = fn(key);
  };
}

module.exports = memoizeFunction;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/padNumber.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/padNumber.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mathAliases = __webpack_require__(/*! ../var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js"),
    repeatString = __webpack_require__(/*! ./repeatString */ "./node_modules/sugar-date/common/internal/repeatString.js");

var abs = mathAliases.abs;

function padNumber(num, place, sign, base, replacement) {
  var str = abs(num).toString(base || 10);
  str = repeatString(replacement || '0', place - str.replace(/\.\d+/, '').length) + str;
  if (sign || num < 0) {
    str = (num < 0 ? '-' : '+') + str;
  }
  return str;
}

module.exports = padNumber;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/periodSplit.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/periodSplit.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CommonChars = __webpack_require__(/*! ../var/CommonChars */ "./node_modules/sugar-date/common/var/CommonChars.js");

var HALF_WIDTH_PERIOD = CommonChars.HALF_WIDTH_PERIOD;

function periodSplit(str) {
  return str.split(HALF_WIDTH_PERIOD);
}

module.exports = periodSplit;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/privatePropertyAccessor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/privatePropertyAccessor.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PRIVATE_PROP_PREFIX = __webpack_require__(/*! ../var/PRIVATE_PROP_PREFIX */ "./node_modules/sugar-date/common/var/PRIVATE_PROP_PREFIX.js"),
    coreUtilityAliases = __webpack_require__(/*! ../var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var setProperty = coreUtilityAliases.setProperty;

function privatePropertyAccessor(key) {
  var privateKey = PRIVATE_PROP_PREFIX + key;
  return function(obj, val) {
    if (arguments.length > 1) {
      setProperty(obj, privateKey, val);
      return obj;
    }
    return obj[privateKey];
  };
}

module.exports = privatePropertyAccessor;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/repeatString.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/repeatString.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function repeatString(str, num) {
  var result = '';
  str = str.toString();
  while (num > 0) {
    if (num & 1) {
      result += str;
    }
    if (num >>= 1) {
      str += str;
    }
  }
  return result;
}

module.exports = repeatString;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/setChainableConstructor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/setChainableConstructor.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function setChainableConstructor(sugarNamespace, createFn) {
  sugarNamespace.prototype.constructor = function() {
    return createFn.apply(this, arguments);
  };
}

module.exports = setChainableConstructor;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/simpleCapitalize.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/simpleCapitalize.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function simpleCapitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = simpleCapitalize;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/simpleClone.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/simpleClone.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var simpleMerge = __webpack_require__(/*! ./simpleMerge */ "./node_modules/sugar-date/common/internal/simpleMerge.js");

function simpleClone(obj) {
  return simpleMerge({}, obj);
}

module.exports = simpleClone;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/simpleMerge.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/simpleMerge.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(/*! ../var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var forEachProperty = coreUtilityAliases.forEachProperty;

function simpleMerge(target, source) {
  forEachProperty(source, function(val, key) {
    target[key] = val;
  });
  return target;
}

module.exports = simpleMerge;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/spaceSplit.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/spaceSplit.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function spaceSplit(str) {
  return str.split(' ');
}

module.exports = spaceSplit;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/trim.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/trim.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function trim(str) {
  return str.trim();
}

module.exports = trim;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/withPrecision.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/withPrecision.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mathAliases = __webpack_require__(/*! ../var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js");

var abs = mathAliases.abs,
    pow = mathAliases.pow,
    round = mathAliases.round;

function withPrecision(val, precision, fn) {
  var multiplier = pow(10, abs(precision || 0));
  fn = fn || round;
  if (precision < 0) multiplier = 1 / multiplier;
  return fn(val * multiplier) / multiplier;
}

module.exports = withPrecision;

/***/ }),

/***/ "./node_modules/sugar-date/common/internal/wrapNamespace.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/common/internal/wrapNamespace.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function wrapNamespace(method) {
  return function(sugarNamespace, arg1, arg2) {
    sugarNamespace[method](arg1, arg2);
  };
}

module.exports = wrapNamespace;

/***/ }),

/***/ "./node_modules/sugar-date/common/var/CommonChars.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/common/var/CommonChars.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  HALF_WIDTH_ZERO: 0x30,
  FULL_WIDTH_ZERO: 0xff10,
  HALF_WIDTH_PERIOD: '.',
  FULL_WIDTH_PERIOD: '．',
  HALF_WIDTH_COMMA: ',',
  OPEN_BRACE: '{',
  CLOSE_BRACE: '}'
};

/***/ }),

/***/ "./node_modules/sugar-date/common/var/INTERNAL_MEMOIZE_LIMIT.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sugar-date/common/var/INTERNAL_MEMOIZE_LIMIT.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 1000;

/***/ }),

/***/ "./node_modules/sugar-date/common/var/NATIVE_TYPES.js":
/*!************************************************************!*\
  !*** ./node_modules/sugar-date/common/var/NATIVE_TYPES.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 'Boolean Number String Date RegExp Function Array Error Set Map';

/***/ }),

/***/ "./node_modules/sugar-date/common/var/PRIVATE_PROP_PREFIX.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sugar-date/common/var/PRIVATE_PROP_PREFIX.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '_sugar_';

/***/ }),

/***/ "./node_modules/sugar-date/common/var/STRING_FORMAT_REG.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sugar-date/common/var/STRING_FORMAT_REG.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = /([{}])\1|{([^}]*)}|(%)%|(%(\w*))/g;

/***/ }),

/***/ "./node_modules/sugar-date/common/var/_utc.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/common/var/_utc.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var privatePropertyAccessor = __webpack_require__(/*! ../internal/privatePropertyAccessor */ "./node_modules/sugar-date/common/internal/privatePropertyAccessor.js");

module.exports = privatePropertyAccessor('utc');

/***/ }),

/***/ "./node_modules/sugar-date/common/var/chr.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/common/var/chr.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = String.fromCharCode;

/***/ }),

/***/ "./node_modules/sugar-date/common/var/classChecks.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/common/var/classChecks.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NATIVE_TYPES = __webpack_require__(/*! ./NATIVE_TYPES */ "./node_modules/sugar-date/common/var/NATIVE_TYPES.js"),
    forEach = __webpack_require__(/*! ../internal/forEach */ "./node_modules/sugar-date/common/internal/forEach.js"),
    isClass = __webpack_require__(/*! ../internal/isClass */ "./node_modules/sugar-date/common/internal/isClass.js"),
    spaceSplit = __webpack_require__(/*! ../internal/spaceSplit */ "./node_modules/sugar-date/common/internal/spaceSplit.js"),
    isPlainObject = __webpack_require__(/*! ../internal/isPlainObject */ "./node_modules/sugar-date/common/internal/isPlainObject.js");

var isSerializable,
    isBoolean, isNumber, isString,
    isDate, isRegExp, isFunction,
    isArray, isSet, isMap, isError;

function buildClassChecks() {

  var knownTypes = {};

  function addCoreTypes() {

    var names = spaceSplit(NATIVE_TYPES);

    isBoolean = buildPrimitiveClassCheck(names[0]);
    isNumber  = buildPrimitiveClassCheck(names[1]);
    isString  = buildPrimitiveClassCheck(names[2]);

    isDate   = buildClassCheck(names[3]);
    isRegExp = buildClassCheck(names[4]);

    // Wanted to enhance performance here by using simply "typeof"
    // but Firefox has two major issues that make this impossible,
    // one fixed, the other not, so perform a full class check here.
    //
    // 1. Regexes can be typeof "function" in FF < 3
    //    https://bugzilla.mozilla.org/show_bug.cgi?id=61911 (fixed)
    //
    // 2. HTMLEmbedElement and HTMLObjectElement are be typeof "function"
    //    https://bugzilla.mozilla.org/show_bug.cgi?id=268945 (won't fix)
    isFunction = buildClassCheck(names[5]);

    // istanbul ignore next
    isArray = Array.isArray || buildClassCheck(names[6]);
    isError = buildClassCheck(names[7]);

    isSet = buildClassCheck(names[8], typeof Set !== 'undefined' && Set);
    isMap = buildClassCheck(names[9], typeof Map !== 'undefined' && Map);

    // Add core types as known so that they can be checked by value below,
    // notably excluding Functions and adding Arguments and Error.
    addKnownType('Arguments');
    addKnownType(names[0]);
    addKnownType(names[1]);
    addKnownType(names[2]);
    addKnownType(names[3]);
    addKnownType(names[4]);
    addKnownType(names[6]);

  }

  function addArrayTypes() {
    var types = 'Int8 Uint8 Uint8Clamped Int16 Uint16 Int32 Uint32 Float32 Float64';
    forEach(spaceSplit(types), function(str) {
      addKnownType(str + 'Array');
    });
  }

  function addKnownType(className) {
    var str = '[object '+ className +']';
    knownTypes[str] = true;
  }

  function isKnownType(className) {
    return knownTypes[className];
  }

  function buildClassCheck(className, globalObject) {
    // istanbul ignore if
    if (globalObject && isClass(new globalObject, 'Object')) {
      return getConstructorClassCheck(globalObject);
    } else {
      return getToStringClassCheck(className);
    }
  }

  // Map and Set may be [object Object] in certain IE environments.
  // In this case we need to perform a check using the constructor
  // instead of Object.prototype.toString.
  // istanbul ignore next
  function getConstructorClassCheck(obj) {
    var ctorStr = String(obj);
    return function(obj) {
      return String(obj.constructor) === ctorStr;
    };
  }

  function getToStringClassCheck(className) {
    return function(obj, str) {
      // perf: Returning up front on instanceof appears to be slower.
      return isClass(obj, className, str);
    };
  }

  function buildPrimitiveClassCheck(className) {
    var type = className.toLowerCase();
    return function(obj) {
      var t = typeof obj;
      return t === type || t === 'object' && isClass(obj, className);
    };
  }

  addCoreTypes();
  addArrayTypes();

  isSerializable = function(obj, className) {
    // Only known objects can be serialized. This notably excludes functions,
    // host objects, Symbols (which are matched by reference), and instances
    // of classes. The latter can arguably be matched by value, but
    // distinguishing between these and host objects -- which should never be
    // compared by value -- is very tricky so not dealing with it here.
    return isKnownType(className) || isPlainObject(obj, className);
  };

}

buildClassChecks();

module.exports = {
  isSerializable: isSerializable,
  isBoolean: isBoolean,
  isNumber: isNumber,
  isString: isString,
  isDate: isDate,
  isRegExp: isRegExp,
  isFunction: isFunction,
  isArray: isArray,
  isSet: isSet,
  isMap: isMap,
  isError: isError
};

/***/ }),

/***/ "./node_modules/sugar-date/common/var/coreUtilityAliases.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/common/var/coreUtilityAliases.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

module.exports = {
  hasOwn: Sugar.util.hasOwn,
  getOwn: Sugar.util.getOwn,
  setProperty: Sugar.util.setProperty,
  classToString: Sugar.util.classToString,
  defineProperty: Sugar.util.defineProperty,
  forEachProperty: Sugar.util.forEachProperty,
  mapNativeToChainable: Sugar.util.mapNativeToChainable
};

/***/ }),

/***/ "./node_modules/sugar-date/common/var/fullwidthNumberHelpers.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sugar-date/common/var/fullwidthNumberHelpers.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CommonChars = __webpack_require__(/*! ./CommonChars */ "./node_modules/sugar-date/common/var/CommonChars.js"),
    chr = __webpack_require__(/*! ./chr */ "./node_modules/sugar-date/common/var/chr.js"),
    allCharsReg = __webpack_require__(/*! ../internal/allCharsReg */ "./node_modules/sugar-date/common/internal/allCharsReg.js");

var HALF_WIDTH_ZERO = CommonChars.HALF_WIDTH_ZERO,
    FULL_WIDTH_ZERO = CommonChars.FULL_WIDTH_ZERO,
    HALF_WIDTH_PERIOD = CommonChars.HALF_WIDTH_PERIOD,
    FULL_WIDTH_PERIOD = CommonChars.FULL_WIDTH_PERIOD,
    HALF_WIDTH_COMMA = CommonChars.HALF_WIDTH_COMMA;

var fullWidthNumberReg, fullWidthNumberMap, fullWidthNumbers;

function buildFullWidthNumber() {
  var fwp = FULL_WIDTH_PERIOD, hwp = HALF_WIDTH_PERIOD, hwc = HALF_WIDTH_COMMA, fwn = '';
  fullWidthNumberMap = {};
  for (var i = 0, digit; i <= 9; i++) {
    digit = chr(i + FULL_WIDTH_ZERO);
    fwn += digit;
    fullWidthNumberMap[digit] = chr(i + HALF_WIDTH_ZERO);
  }
  fullWidthNumberMap[hwc] = '';
  fullWidthNumberMap[fwp] = hwp;
  // Mapping this to itself to capture it easily
  // in stringToNumber to detect decimals later.
  fullWidthNumberMap[hwp] = hwp;
  fullWidthNumberReg = allCharsReg(fwn + fwp + hwc + hwp);
  fullWidthNumbers = fwn;
}

buildFullWidthNumber();

module.exports = {
  fullWidthNumberReg: fullWidthNumberReg,
  fullWidthNumberMap: fullWidthNumberMap,
  fullWidthNumbers: fullWidthNumbers
};

/***/ }),

/***/ "./node_modules/sugar-date/common/var/mathAliases.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/common/var/mathAliases.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  abs: Math.abs,
  pow: Math.pow,
  min: Math.min,
  max: Math.max,
  ceil: Math.ceil,
  floor: Math.floor,
  round: Math.round
};

/***/ }),

/***/ "./node_modules/sugar-date/common/var/methodDefineAliases.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sugar-date/common/var/methodDefineAliases.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wrapNamespace = __webpack_require__(/*! ../internal/wrapNamespace */ "./node_modules/sugar-date/common/internal/wrapNamespace.js");

module.exports = {
  alias: wrapNamespace('alias'),
  defineStatic: wrapNamespace('defineStatic'),
  defineInstance: wrapNamespace('defineInstance'),
  defineStaticPolyfill: wrapNamespace('defineStaticPolyfill'),
  defineInstancePolyfill: wrapNamespace('defineInstancePolyfill'),
  defineInstanceAndStatic: wrapNamespace('defineInstanceAndStatic'),
  defineInstanceWithArguments: wrapNamespace('defineInstanceWithArguments')
};

/***/ }),

/***/ "./node_modules/sugar-date/common/var/namespaceAliases.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/common/var/namespaceAliases.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

module.exports = {
  sugarObject: Sugar.Object,
  sugarArray: Sugar.Array,
  sugarDate: Sugar.Date,
  sugarString: Sugar.String,
  sugarNumber: Sugar.Number,
  sugarFunction: Sugar.Function,
  sugarRegExp: Sugar.RegExp
};

/***/ }),

/***/ "./node_modules/sugar-date/common/var/trunc.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/common/var/trunc.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mathAliases = __webpack_require__(/*! ./mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js");

var ceil = mathAliases.ceil,
    floor = mathAliases.floor;

var trunc = Math.trunc || function(n) {
  if (n === 0 || !isFinite(n)) return n;
  return n < 0 ? ceil(n) : floor(n);
};

module.exports = trunc;

/***/ }),

/***/ "./node_modules/sugar-date/date/addDays.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/date/addDays.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.addDays;

/***/ }),

/***/ "./node_modules/sugar-date/date/addHours.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/addHours.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.addHours;

/***/ }),

/***/ "./node_modules/sugar-date/date/addLocale.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/addLocale.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    LocaleHelpers = __webpack_require__(/*! ./var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js");

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'addLocale': function(code, set) {
    return localeManager.add(code, set);
  }

});

module.exports = Sugar.Date.addLocale;

/***/ }),

/***/ "./node_modules/sugar-date/date/addMilliseconds.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/date/addMilliseconds.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.addMilliseconds;

/***/ }),

/***/ "./node_modules/sugar-date/date/addMinutes.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/addMinutes.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.addMinutes;

/***/ }),

/***/ "./node_modules/sugar-date/date/addMonths.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/addMonths.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.addMonths;

/***/ }),

/***/ "./node_modules/sugar-date/date/addSeconds.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/addSeconds.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.addSeconds;

/***/ }),

/***/ "./node_modules/sugar-date/date/addWeeks.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/addWeeks.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.addWeeks;

/***/ }),

/***/ "./node_modules/sugar-date/date/addYears.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/addYears.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.addYears;

/***/ }),

/***/ "./node_modules/sugar-date/date/advance.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/date/advance.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    advanceDateWithArgs = __webpack_require__(/*! ./internal/advanceDateWithArgs */ "./node_modules/sugar-date/date/internal/advanceDateWithArgs.js");

Sugar.Date.defineInstanceWithArguments({

  'advance': function(d, args) {
    return advanceDateWithArgs(d, args, 1);
  }

});

module.exports = Sugar.Date.advance;

/***/ }),

/***/ "./node_modules/sugar-date/date/beginningOfDay.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/date/beginningOfDay.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.beginningOfDay;

/***/ }),

/***/ "./node_modules/sugar-date/date/beginningOfISOWeek.js":
/*!************************************************************!*\
  !*** ./node_modules/sugar-date/date/beginningOfISOWeek.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    resetTime = __webpack_require__(/*! ./internal/resetTime */ "./node_modules/sugar-date/date/internal/resetTime.js"),
    getWeekday = __webpack_require__(/*! ./internal/getWeekday */ "./node_modules/sugar-date/date/internal/getWeekday.js"),
    setWeekday = __webpack_require__(/*! ./internal/setWeekday */ "./node_modules/sugar-date/date/internal/setWeekday.js");

Sugar.Date.defineInstance({

  'beginningOfISOWeek': function(date) {
    var day = getWeekday(date);
    if (day === 0) {
      day = -6;
    } else if (day !== 1) {
      day = 1;
    }
    setWeekday(date, day);
    return resetTime(date);
  }

});

module.exports = Sugar.Date.beginningOfISOWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/beginningOfMonth.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/date/beginningOfMonth.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.beginningOfMonth;

/***/ }),

/***/ "./node_modules/sugar-date/date/beginningOfWeek.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/date/beginningOfWeek.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.beginningOfWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/beginningOfYear.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/date/beginningOfYear.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.beginningOfYear;

/***/ }),

/***/ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js":
/*!************************************************************************!*\
  !*** ./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildDateUnitMethods = __webpack_require__(/*! ../internal/buildDateUnitMethods */ "./node_modules/sugar-date/date/internal/buildDateUnitMethods.js");

buildDateUnitMethods();

/***/ }),

/***/ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildNumberUnitMethods = __webpack_require__(/*! ../internal/buildNumberUnitMethods */ "./node_modules/sugar-date/date/internal/buildNumberUnitMethods.js");

buildNumberUnitMethods();

/***/ }),

/***/ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js":
/*!************************************************************************!*\
  !*** ./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildRelativeAliases = __webpack_require__(/*! ../internal/buildRelativeAliases */ "./node_modules/sugar-date/date/internal/buildRelativeAliases.js");

buildRelativeAliases();

/***/ }),

/***/ "./node_modules/sugar-date/date/build/setDateChainableConstructorCall.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/sugar-date/date/build/setDateChainableConstructorCall.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setDateChainableConstructor = __webpack_require__(/*! ../internal/setDateChainableConstructor */ "./node_modules/sugar-date/date/internal/setDateChainableConstructor.js");

setDateChainableConstructor();

/***/ }),

/***/ "./node_modules/sugar-date/date/clone.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/date/clone.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    cloneDate = __webpack_require__(/*! ./internal/cloneDate */ "./node_modules/sugar-date/date/internal/cloneDate.js");

Sugar.Date.defineInstance({

  'clone': function(date) {
    return cloneDate(date);
  }

});

module.exports = Sugar.Date.clone;

/***/ }),

/***/ "./node_modules/sugar-date/date/create.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/date/create.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    createDate = __webpack_require__(/*! ./internal/createDate */ "./node_modules/sugar-date/date/internal/createDate.js");

__webpack_require__(/*! ./build/setDateChainableConstructorCall */ "./node_modules/sugar-date/date/build/setDateChainableConstructorCall.js");

Sugar.Date.defineStatic({

  'create': function(d, options) {
    return createDate(d, options);
  }

});

module.exports = Sugar.Date.create;

/***/ }),

/***/ "./node_modules/sugar-date/date/daysAgo.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/date/daysAgo.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.daysAgo;

/***/ }),

/***/ "./node_modules/sugar-date/date/daysFromNow.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/date/daysFromNow.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.daysFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/date/daysInMonth.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/date/daysInMonth.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    getDaysInMonth = __webpack_require__(/*! ./internal/getDaysInMonth */ "./node_modules/sugar-date/date/internal/getDaysInMonth.js");

Sugar.Date.defineInstance({

  'daysInMonth': function(date) {
    return getDaysInMonth(date);
  }

});

module.exports = Sugar.Date.daysInMonth;

/***/ }),

/***/ "./node_modules/sugar-date/date/daysSince.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/daysSince.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.daysSince;

/***/ }),

/***/ "./node_modules/sugar-date/date/daysUntil.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/daysUntil.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.daysUntil;

/***/ }),

/***/ "./node_modules/sugar-date/date/endOfDay.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/endOfDay.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.endOfDay;

/***/ }),

/***/ "./node_modules/sugar-date/date/endOfISOWeek.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/date/endOfISOWeek.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    DateUnitIndexes = __webpack_require__(/*! ./var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    getWeekday = __webpack_require__(/*! ./internal/getWeekday */ "./node_modules/sugar-date/date/internal/getWeekday.js"),
    setWeekday = __webpack_require__(/*! ./internal/setWeekday */ "./node_modules/sugar-date/date/internal/setWeekday.js"),
    moveToEndOfUnit = __webpack_require__(/*! ./internal/moveToEndOfUnit */ "./node_modules/sugar-date/date/internal/moveToEndOfUnit.js");

var DAY_INDEX = DateUnitIndexes.DAY_INDEX;

Sugar.Date.defineInstance({

  'endOfISOWeek': function(date) {
    if (getWeekday(date) !== 0) {
      setWeekday(date, 7);
    }
    return moveToEndOfUnit(date, DAY_INDEX);
  }

});

module.exports = Sugar.Date.endOfISOWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/endOfMonth.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/endOfMonth.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.endOfMonth;

/***/ }),

/***/ "./node_modules/sugar-date/date/endOfWeek.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/endOfWeek.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.endOfWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/endOfYear.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/endOfYear.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.endOfYear;

/***/ }),

/***/ "./node_modules/sugar-date/date/format.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/date/format.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    dateFormat = __webpack_require__(/*! ./internal/dateFormat */ "./node_modules/sugar-date/date/internal/dateFormat.js");

Sugar.Date.defineInstance({

  'format': function(date, f, localeCode) {
    return dateFormat(date, f, localeCode);
  }

});

module.exports = Sugar.Date.format;

/***/ }),

/***/ "./node_modules/sugar-date/date/get.js":
/*!*********************************************!*\
  !*** ./node_modules/sugar-date/date/get.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    createDateWithContext = __webpack_require__(/*! ./internal/createDateWithContext */ "./node_modules/sugar-date/date/internal/createDateWithContext.js");

Sugar.Date.defineInstance({

  'get': function(date, d, options) {
    return createDateWithContext(date, d, options);
  }

});

module.exports = Sugar.Date.get;

/***/ }),

/***/ "./node_modules/sugar-date/date/getAllLocaleCodes.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/date/getAllLocaleCodes.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    LocaleHelpers = __webpack_require__(/*! ./var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    getKeys = __webpack_require__(/*! ../common/internal/getKeys */ "./node_modules/sugar-date/common/internal/getKeys.js");

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'getAllLocaleCodes': function() {
    return getKeys(localeManager.getAll());
  }

});

module.exports = Sugar.Date.getAllLocaleCodes;

/***/ }),

/***/ "./node_modules/sugar-date/date/getAllLocales.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/date/getAllLocales.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    LocaleHelpers = __webpack_require__(/*! ./var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js");

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'getAllLocales': function() {
    return localeManager.getAll();
  }

});

module.exports = Sugar.Date.getAllLocales;

/***/ }),

/***/ "./node_modules/sugar-date/date/getISOWeek.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/getISOWeek.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    getWeekNumber = __webpack_require__(/*! ./internal/getWeekNumber */ "./node_modules/sugar-date/date/internal/getWeekNumber.js");

Sugar.Date.defineInstance({

  'getISOWeek': function(date) {
    return getWeekNumber(date, true);
  }

});

module.exports = Sugar.Date.getISOWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/getLocale.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/getLocale.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    LocaleHelpers = __webpack_require__(/*! ./var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js");

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'getLocale': function(code) {
    return localeManager.get(code, !code);
  }

});

module.exports = Sugar.Date.getLocale;

/***/ }),

/***/ "./node_modules/sugar-date/date/getOption.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/getOption.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    _dateOptions = __webpack_require__(/*! ./var/_dateOptions */ "./node_modules/sugar-date/date/var/_dateOptions.js");

module.exports = Sugar.Date.getOption;

/***/ }),

/***/ "./node_modules/sugar-date/date/getUTCOffset.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/date/getUTCOffset.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    getUTCOffset = __webpack_require__(/*! ./internal/getUTCOffset */ "./node_modules/sugar-date/date/internal/getUTCOffset.js");

Sugar.Date.defineInstance({

  'getUTCOffset': function(date, iso) {
    return getUTCOffset(date, iso);
  }

});

module.exports = Sugar.Date.getUTCOffset;

/***/ }),

/***/ "./node_modules/sugar-date/date/getUTCWeekday.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/date/getUTCWeekday.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

Sugar.Date.defineInstance({

  'getUTCWeekday': function(date) {
    return date.getUTCDay();
  }

});

module.exports = Sugar.Date.getUTCWeekday;

/***/ }),

/***/ "./node_modules/sugar-date/date/getWeekday.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/getWeekday.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    getWeekday = __webpack_require__(/*! ./internal/getWeekday */ "./node_modules/sugar-date/date/internal/getWeekday.js");

Sugar.Date.defineInstance({

  'getWeekday': function(date) {
    return getWeekday(date);
  }

});

module.exports = Sugar.Date.getWeekday;

/***/ }),

/***/ "./node_modules/sugar-date/date/hoursAgo.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/hoursAgo.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.hoursAgo;

/***/ }),

/***/ "./node_modules/sugar-date/date/hoursFromNow.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/date/hoursFromNow.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.hoursFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/date/hoursSince.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/hoursSince.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.hoursSince;

/***/ }),

/***/ "./node_modules/sugar-date/date/hoursUntil.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/hoursUntil.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.hoursUntil;

/***/ }),

/***/ "./node_modules/sugar-date/date/index.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/date/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Static Methods
__webpack_require__(/*! ./addLocale */ "./node_modules/sugar-date/date/addLocale.js");
__webpack_require__(/*! ./create */ "./node_modules/sugar-date/date/create.js");
__webpack_require__(/*! ./getAllLocaleCodes */ "./node_modules/sugar-date/date/getAllLocaleCodes.js");
__webpack_require__(/*! ./getAllLocales */ "./node_modules/sugar-date/date/getAllLocales.js");
__webpack_require__(/*! ./getLocale */ "./node_modules/sugar-date/date/getLocale.js");
__webpack_require__(/*! ./removeLocale */ "./node_modules/sugar-date/date/removeLocale.js");
__webpack_require__(/*! ./setLocale */ "./node_modules/sugar-date/date/setLocale.js");

// Instance Methods
__webpack_require__(/*! ../number/day */ "./node_modules/sugar-date/number/day.js");
__webpack_require__(/*! ../number/dayAfter */ "./node_modules/sugar-date/number/dayAfter.js");
__webpack_require__(/*! ../number/dayAgo */ "./node_modules/sugar-date/number/dayAgo.js");
__webpack_require__(/*! ../number/dayBefore */ "./node_modules/sugar-date/number/dayBefore.js");
__webpack_require__(/*! ../number/dayFromNow */ "./node_modules/sugar-date/number/dayFromNow.js");
__webpack_require__(/*! ../number/days */ "./node_modules/sugar-date/number/days.js");
__webpack_require__(/*! ../number/daysAfter */ "./node_modules/sugar-date/number/daysAfter.js");
__webpack_require__(/*! ../number/daysAgo */ "./node_modules/sugar-date/number/daysAgo.js");
__webpack_require__(/*! ../number/daysBefore */ "./node_modules/sugar-date/number/daysBefore.js");
__webpack_require__(/*! ../number/daysFromNow */ "./node_modules/sugar-date/number/daysFromNow.js");
__webpack_require__(/*! ../number/duration */ "./node_modules/sugar-date/number/duration.js");
__webpack_require__(/*! ../number/hour */ "./node_modules/sugar-date/number/hour.js");
__webpack_require__(/*! ../number/hourAfter */ "./node_modules/sugar-date/number/hourAfter.js");
__webpack_require__(/*! ../number/hourAgo */ "./node_modules/sugar-date/number/hourAgo.js");
__webpack_require__(/*! ../number/hourBefore */ "./node_modules/sugar-date/number/hourBefore.js");
__webpack_require__(/*! ../number/hourFromNow */ "./node_modules/sugar-date/number/hourFromNow.js");
__webpack_require__(/*! ../number/hours */ "./node_modules/sugar-date/number/hours.js");
__webpack_require__(/*! ../number/hoursAfter */ "./node_modules/sugar-date/number/hoursAfter.js");
__webpack_require__(/*! ../number/hoursAgo */ "./node_modules/sugar-date/number/hoursAgo.js");
__webpack_require__(/*! ../number/hoursBefore */ "./node_modules/sugar-date/number/hoursBefore.js");
__webpack_require__(/*! ../number/hoursFromNow */ "./node_modules/sugar-date/number/hoursFromNow.js");
__webpack_require__(/*! ../number/millisecond */ "./node_modules/sugar-date/number/millisecond.js");
__webpack_require__(/*! ../number/millisecondAfter */ "./node_modules/sugar-date/number/millisecondAfter.js");
__webpack_require__(/*! ../number/millisecondAgo */ "./node_modules/sugar-date/number/millisecondAgo.js");
__webpack_require__(/*! ../number/millisecondBefore */ "./node_modules/sugar-date/number/millisecondBefore.js");
__webpack_require__(/*! ../number/millisecondFromNow */ "./node_modules/sugar-date/number/millisecondFromNow.js");
__webpack_require__(/*! ../number/milliseconds */ "./node_modules/sugar-date/number/milliseconds.js");
__webpack_require__(/*! ../number/millisecondsAfter */ "./node_modules/sugar-date/number/millisecondsAfter.js");
__webpack_require__(/*! ../number/millisecondsAgo */ "./node_modules/sugar-date/number/millisecondsAgo.js");
__webpack_require__(/*! ../number/millisecondsBefore */ "./node_modules/sugar-date/number/millisecondsBefore.js");
__webpack_require__(/*! ../number/millisecondsFromNow */ "./node_modules/sugar-date/number/millisecondsFromNow.js");
__webpack_require__(/*! ../number/minute */ "./node_modules/sugar-date/number/minute.js");
__webpack_require__(/*! ../number/minuteAfter */ "./node_modules/sugar-date/number/minuteAfter.js");
__webpack_require__(/*! ../number/minuteAgo */ "./node_modules/sugar-date/number/minuteAgo.js");
__webpack_require__(/*! ../number/minuteBefore */ "./node_modules/sugar-date/number/minuteBefore.js");
__webpack_require__(/*! ../number/minuteFromNow */ "./node_modules/sugar-date/number/minuteFromNow.js");
__webpack_require__(/*! ../number/minutes */ "./node_modules/sugar-date/number/minutes.js");
__webpack_require__(/*! ../number/minutesAfter */ "./node_modules/sugar-date/number/minutesAfter.js");
__webpack_require__(/*! ../number/minutesAgo */ "./node_modules/sugar-date/number/minutesAgo.js");
__webpack_require__(/*! ../number/minutesBefore */ "./node_modules/sugar-date/number/minutesBefore.js");
__webpack_require__(/*! ../number/minutesFromNow */ "./node_modules/sugar-date/number/minutesFromNow.js");
__webpack_require__(/*! ../number/month */ "./node_modules/sugar-date/number/month.js");
__webpack_require__(/*! ../number/monthAfter */ "./node_modules/sugar-date/number/monthAfter.js");
__webpack_require__(/*! ../number/monthAgo */ "./node_modules/sugar-date/number/monthAgo.js");
__webpack_require__(/*! ../number/monthBefore */ "./node_modules/sugar-date/number/monthBefore.js");
__webpack_require__(/*! ../number/monthFromNow */ "./node_modules/sugar-date/number/monthFromNow.js");
__webpack_require__(/*! ../number/months */ "./node_modules/sugar-date/number/months.js");
__webpack_require__(/*! ../number/monthsAfter */ "./node_modules/sugar-date/number/monthsAfter.js");
__webpack_require__(/*! ../number/monthsAgo */ "./node_modules/sugar-date/number/monthsAgo.js");
__webpack_require__(/*! ../number/monthsBefore */ "./node_modules/sugar-date/number/monthsBefore.js");
__webpack_require__(/*! ../number/monthsFromNow */ "./node_modules/sugar-date/number/monthsFromNow.js");
__webpack_require__(/*! ../number/second */ "./node_modules/sugar-date/number/second.js");
__webpack_require__(/*! ../number/secondAfter */ "./node_modules/sugar-date/number/secondAfter.js");
__webpack_require__(/*! ../number/secondAgo */ "./node_modules/sugar-date/number/secondAgo.js");
__webpack_require__(/*! ../number/secondBefore */ "./node_modules/sugar-date/number/secondBefore.js");
__webpack_require__(/*! ../number/secondFromNow */ "./node_modules/sugar-date/number/secondFromNow.js");
__webpack_require__(/*! ../number/seconds */ "./node_modules/sugar-date/number/seconds.js");
__webpack_require__(/*! ../number/secondsAfter */ "./node_modules/sugar-date/number/secondsAfter.js");
__webpack_require__(/*! ../number/secondsAgo */ "./node_modules/sugar-date/number/secondsAgo.js");
__webpack_require__(/*! ../number/secondsBefore */ "./node_modules/sugar-date/number/secondsBefore.js");
__webpack_require__(/*! ../number/secondsFromNow */ "./node_modules/sugar-date/number/secondsFromNow.js");
__webpack_require__(/*! ../number/week */ "./node_modules/sugar-date/number/week.js");
__webpack_require__(/*! ../number/weekAfter */ "./node_modules/sugar-date/number/weekAfter.js");
__webpack_require__(/*! ../number/weekAgo */ "./node_modules/sugar-date/number/weekAgo.js");
__webpack_require__(/*! ../number/weekBefore */ "./node_modules/sugar-date/number/weekBefore.js");
__webpack_require__(/*! ../number/weekFromNow */ "./node_modules/sugar-date/number/weekFromNow.js");
__webpack_require__(/*! ../number/weeks */ "./node_modules/sugar-date/number/weeks.js");
__webpack_require__(/*! ../number/weeksAfter */ "./node_modules/sugar-date/number/weeksAfter.js");
__webpack_require__(/*! ../number/weeksAgo */ "./node_modules/sugar-date/number/weeksAgo.js");
__webpack_require__(/*! ../number/weeksBefore */ "./node_modules/sugar-date/number/weeksBefore.js");
__webpack_require__(/*! ../number/weeksFromNow */ "./node_modules/sugar-date/number/weeksFromNow.js");
__webpack_require__(/*! ../number/year */ "./node_modules/sugar-date/number/year.js");
__webpack_require__(/*! ../number/yearAfter */ "./node_modules/sugar-date/number/yearAfter.js");
__webpack_require__(/*! ../number/yearAgo */ "./node_modules/sugar-date/number/yearAgo.js");
__webpack_require__(/*! ../number/yearBefore */ "./node_modules/sugar-date/number/yearBefore.js");
__webpack_require__(/*! ../number/yearFromNow */ "./node_modules/sugar-date/number/yearFromNow.js");
__webpack_require__(/*! ../number/years */ "./node_modules/sugar-date/number/years.js");
__webpack_require__(/*! ../number/yearsAfter */ "./node_modules/sugar-date/number/yearsAfter.js");
__webpack_require__(/*! ../number/yearsAgo */ "./node_modules/sugar-date/number/yearsAgo.js");
__webpack_require__(/*! ../number/yearsBefore */ "./node_modules/sugar-date/number/yearsBefore.js");
__webpack_require__(/*! ../number/yearsFromNow */ "./node_modules/sugar-date/number/yearsFromNow.js");
__webpack_require__(/*! ./addDays */ "./node_modules/sugar-date/date/addDays.js");
__webpack_require__(/*! ./addHours */ "./node_modules/sugar-date/date/addHours.js");
__webpack_require__(/*! ./addMilliseconds */ "./node_modules/sugar-date/date/addMilliseconds.js");
__webpack_require__(/*! ./addMinutes */ "./node_modules/sugar-date/date/addMinutes.js");
__webpack_require__(/*! ./addMonths */ "./node_modules/sugar-date/date/addMonths.js");
__webpack_require__(/*! ./addSeconds */ "./node_modules/sugar-date/date/addSeconds.js");
__webpack_require__(/*! ./addWeeks */ "./node_modules/sugar-date/date/addWeeks.js");
__webpack_require__(/*! ./addYears */ "./node_modules/sugar-date/date/addYears.js");
__webpack_require__(/*! ./advance */ "./node_modules/sugar-date/date/advance.js");
__webpack_require__(/*! ./beginningOfDay */ "./node_modules/sugar-date/date/beginningOfDay.js");
__webpack_require__(/*! ./beginningOfISOWeek */ "./node_modules/sugar-date/date/beginningOfISOWeek.js");
__webpack_require__(/*! ./beginningOfMonth */ "./node_modules/sugar-date/date/beginningOfMonth.js");
__webpack_require__(/*! ./beginningOfWeek */ "./node_modules/sugar-date/date/beginningOfWeek.js");
__webpack_require__(/*! ./beginningOfYear */ "./node_modules/sugar-date/date/beginningOfYear.js");
__webpack_require__(/*! ./clone */ "./node_modules/sugar-date/date/clone.js");
__webpack_require__(/*! ./daysAgo */ "./node_modules/sugar-date/date/daysAgo.js");
__webpack_require__(/*! ./daysFromNow */ "./node_modules/sugar-date/date/daysFromNow.js");
__webpack_require__(/*! ./daysInMonth */ "./node_modules/sugar-date/date/daysInMonth.js");
__webpack_require__(/*! ./daysSince */ "./node_modules/sugar-date/date/daysSince.js");
__webpack_require__(/*! ./daysUntil */ "./node_modules/sugar-date/date/daysUntil.js");
__webpack_require__(/*! ./endOfDay */ "./node_modules/sugar-date/date/endOfDay.js");
__webpack_require__(/*! ./endOfISOWeek */ "./node_modules/sugar-date/date/endOfISOWeek.js");
__webpack_require__(/*! ./endOfMonth */ "./node_modules/sugar-date/date/endOfMonth.js");
__webpack_require__(/*! ./endOfWeek */ "./node_modules/sugar-date/date/endOfWeek.js");
__webpack_require__(/*! ./endOfYear */ "./node_modules/sugar-date/date/endOfYear.js");
__webpack_require__(/*! ./format */ "./node_modules/sugar-date/date/format.js");
__webpack_require__(/*! ./get */ "./node_modules/sugar-date/date/get.js");
__webpack_require__(/*! ./getISOWeek */ "./node_modules/sugar-date/date/getISOWeek.js");
__webpack_require__(/*! ./getUTCOffset */ "./node_modules/sugar-date/date/getUTCOffset.js");
__webpack_require__(/*! ./getUTCWeekday */ "./node_modules/sugar-date/date/getUTCWeekday.js");
__webpack_require__(/*! ./getWeekday */ "./node_modules/sugar-date/date/getWeekday.js");
__webpack_require__(/*! ./hoursAgo */ "./node_modules/sugar-date/date/hoursAgo.js");
__webpack_require__(/*! ./hoursFromNow */ "./node_modules/sugar-date/date/hoursFromNow.js");
__webpack_require__(/*! ./hoursSince */ "./node_modules/sugar-date/date/hoursSince.js");
__webpack_require__(/*! ./hoursUntil */ "./node_modules/sugar-date/date/hoursUntil.js");
__webpack_require__(/*! ./is */ "./node_modules/sugar-date/date/is.js");
__webpack_require__(/*! ./isAfter */ "./node_modules/sugar-date/date/isAfter.js");
__webpack_require__(/*! ./isBefore */ "./node_modules/sugar-date/date/isBefore.js");
__webpack_require__(/*! ./isBetween */ "./node_modules/sugar-date/date/isBetween.js");
__webpack_require__(/*! ./isFriday */ "./node_modules/sugar-date/date/isFriday.js");
__webpack_require__(/*! ./isFuture */ "./node_modules/sugar-date/date/isFuture.js");
__webpack_require__(/*! ./isLastMonth */ "./node_modules/sugar-date/date/isLastMonth.js");
__webpack_require__(/*! ./isLastWeek */ "./node_modules/sugar-date/date/isLastWeek.js");
__webpack_require__(/*! ./isLastYear */ "./node_modules/sugar-date/date/isLastYear.js");
__webpack_require__(/*! ./isLeapYear */ "./node_modules/sugar-date/date/isLeapYear.js");
__webpack_require__(/*! ./isMonday */ "./node_modules/sugar-date/date/isMonday.js");
__webpack_require__(/*! ./isNextMonth */ "./node_modules/sugar-date/date/isNextMonth.js");
__webpack_require__(/*! ./isNextWeek */ "./node_modules/sugar-date/date/isNextWeek.js");
__webpack_require__(/*! ./isNextYear */ "./node_modules/sugar-date/date/isNextYear.js");
__webpack_require__(/*! ./isPast */ "./node_modules/sugar-date/date/isPast.js");
__webpack_require__(/*! ./isSaturday */ "./node_modules/sugar-date/date/isSaturday.js");
__webpack_require__(/*! ./isSunday */ "./node_modules/sugar-date/date/isSunday.js");
__webpack_require__(/*! ./isThisMonth */ "./node_modules/sugar-date/date/isThisMonth.js");
__webpack_require__(/*! ./isThisWeek */ "./node_modules/sugar-date/date/isThisWeek.js");
__webpack_require__(/*! ./isThisYear */ "./node_modules/sugar-date/date/isThisYear.js");
__webpack_require__(/*! ./isThursday */ "./node_modules/sugar-date/date/isThursday.js");
__webpack_require__(/*! ./isToday */ "./node_modules/sugar-date/date/isToday.js");
__webpack_require__(/*! ./isTomorrow */ "./node_modules/sugar-date/date/isTomorrow.js");
__webpack_require__(/*! ./isTuesday */ "./node_modules/sugar-date/date/isTuesday.js");
__webpack_require__(/*! ./isUTC */ "./node_modules/sugar-date/date/isUTC.js");
__webpack_require__(/*! ./isValid */ "./node_modules/sugar-date/date/isValid.js");
__webpack_require__(/*! ./isWednesday */ "./node_modules/sugar-date/date/isWednesday.js");
__webpack_require__(/*! ./isWeekday */ "./node_modules/sugar-date/date/isWeekday.js");
__webpack_require__(/*! ./isWeekend */ "./node_modules/sugar-date/date/isWeekend.js");
__webpack_require__(/*! ./isYesterday */ "./node_modules/sugar-date/date/isYesterday.js");
__webpack_require__(/*! ./iso */ "./node_modules/sugar-date/date/iso.js");
__webpack_require__(/*! ./millisecondsAgo */ "./node_modules/sugar-date/date/millisecondsAgo.js");
__webpack_require__(/*! ./millisecondsFromNow */ "./node_modules/sugar-date/date/millisecondsFromNow.js");
__webpack_require__(/*! ./millisecondsSince */ "./node_modules/sugar-date/date/millisecondsSince.js");
__webpack_require__(/*! ./millisecondsUntil */ "./node_modules/sugar-date/date/millisecondsUntil.js");
__webpack_require__(/*! ./minutesAgo */ "./node_modules/sugar-date/date/minutesAgo.js");
__webpack_require__(/*! ./minutesFromNow */ "./node_modules/sugar-date/date/minutesFromNow.js");
__webpack_require__(/*! ./minutesSince */ "./node_modules/sugar-date/date/minutesSince.js");
__webpack_require__(/*! ./minutesUntil */ "./node_modules/sugar-date/date/minutesUntil.js");
__webpack_require__(/*! ./monthsAgo */ "./node_modules/sugar-date/date/monthsAgo.js");
__webpack_require__(/*! ./monthsFromNow */ "./node_modules/sugar-date/date/monthsFromNow.js");
__webpack_require__(/*! ./monthsSince */ "./node_modules/sugar-date/date/monthsSince.js");
__webpack_require__(/*! ./monthsUntil */ "./node_modules/sugar-date/date/monthsUntil.js");
__webpack_require__(/*! ./relative */ "./node_modules/sugar-date/date/relative.js");
__webpack_require__(/*! ./relativeTo */ "./node_modules/sugar-date/date/relativeTo.js");
__webpack_require__(/*! ./reset */ "./node_modules/sugar-date/date/reset.js");
__webpack_require__(/*! ./rewind */ "./node_modules/sugar-date/date/rewind.js");
__webpack_require__(/*! ./secondsAgo */ "./node_modules/sugar-date/date/secondsAgo.js");
__webpack_require__(/*! ./secondsFromNow */ "./node_modules/sugar-date/date/secondsFromNow.js");
__webpack_require__(/*! ./secondsSince */ "./node_modules/sugar-date/date/secondsSince.js");
__webpack_require__(/*! ./secondsUntil */ "./node_modules/sugar-date/date/secondsUntil.js");
__webpack_require__(/*! ./set */ "./node_modules/sugar-date/date/set.js");
__webpack_require__(/*! ./setISOWeek */ "./node_modules/sugar-date/date/setISOWeek.js");
__webpack_require__(/*! ./setUTC */ "./node_modules/sugar-date/date/setUTC.js");
__webpack_require__(/*! ./setWeekday */ "./node_modules/sugar-date/date/setWeekday.js");
__webpack_require__(/*! ./weeksAgo */ "./node_modules/sugar-date/date/weeksAgo.js");
__webpack_require__(/*! ./weeksFromNow */ "./node_modules/sugar-date/date/weeksFromNow.js");
__webpack_require__(/*! ./weeksSince */ "./node_modules/sugar-date/date/weeksSince.js");
__webpack_require__(/*! ./weeksUntil */ "./node_modules/sugar-date/date/weeksUntil.js");
__webpack_require__(/*! ./yearsAgo */ "./node_modules/sugar-date/date/yearsAgo.js");
__webpack_require__(/*! ./yearsFromNow */ "./node_modules/sugar-date/date/yearsFromNow.js");
__webpack_require__(/*! ./yearsSince */ "./node_modules/sugar-date/date/yearsSince.js");
__webpack_require__(/*! ./yearsUntil */ "./node_modules/sugar-date/date/yearsUntil.js");

// Accessors
__webpack_require__(/*! ./getOption */ "./node_modules/sugar-date/date/getOption.js");
__webpack_require__(/*! ./setOption */ "./node_modules/sugar-date/date/setOption.js");

module.exports = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/advanceDate.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/advanceDate.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var updateDate = __webpack_require__(/*! ./updateDate */ "./node_modules/sugar-date/date/internal/updateDate.js");

function advanceDate(d, unit, num, reset) {
  var set = {};
  set[unit] = num;
  return updateDate(d, set, reset, 1);
}

module.exports = advanceDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/advanceDateWithArgs.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/advanceDateWithArgs.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var updateDate = __webpack_require__(/*! ./updateDate */ "./node_modules/sugar-date/date/internal/updateDate.js"),
    collectUpdateDateArguments = __webpack_require__(/*! ./collectUpdateDateArguments */ "./node_modules/sugar-date/date/internal/collectUpdateDateArguments.js");

function advanceDateWithArgs(d, args, dir) {
  args = collectUpdateDateArguments(args, true);
  return updateDate(d, args[0], args[1], dir);
}

module.exports = advanceDateWithArgs;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/arrayToRegAlternates.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/arrayToRegAlternates.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = __webpack_require__(/*! ../../common/internal/map */ "./node_modules/sugar-date/common/internal/map.js"),
    escapeRegExp = __webpack_require__(/*! ../../common/internal/escapeRegExp */ "./node_modules/sugar-date/common/internal/escapeRegExp.js");

function arrayToRegAlternates(arr) {
  var joined = arr.join('');
  if (!arr || !arr.length) {
    return '';
  }
  if (joined.length === arr.length) {
    return '[' + joined + ']';
  }
  // map handles sparse arrays so no need to compact the array here.
  return map(arr, escapeRegExp).join('|');
}

module.exports = arrayToRegAlternates;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/assertDateIsValid.js":
/*!********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/assertDateIsValid.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dateIsValid = __webpack_require__(/*! ./dateIsValid */ "./node_modules/sugar-date/date/internal/dateIsValid.js");

function assertDateIsValid(d) {
  if (!dateIsValid(d)) {
    throw new TypeError('Date is not valid');
  }
}

module.exports = assertDateIsValid;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/buildDateUnitMethods.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/buildDateUnitMethods.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(/*! ../var/DateUnits */ "./node_modules/sugar-date/date/var/DateUnits.js"),
    DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    forEach = __webpack_require__(/*! ../../common/internal/forEach */ "./node_modules/sugar-date/common/internal/forEach.js"),
    createDate = __webpack_require__(/*! ./createDate */ "./node_modules/sugar-date/date/internal/createDate.js"),
    compareDate = __webpack_require__(/*! ./compareDate */ "./node_modules/sugar-date/date/internal/compareDate.js"),
    advanceDate = __webpack_require__(/*! ./advanceDate */ "./node_modules/sugar-date/date/internal/advanceDate.js"),
    moveToEndOfUnit = __webpack_require__(/*! ./moveToEndOfUnit */ "./node_modules/sugar-date/date/internal/moveToEndOfUnit.js"),
    namespaceAliases = __webpack_require__(/*! ../../common/var/namespaceAliases */ "./node_modules/sugar-date/common/var/namespaceAliases.js"),
    simpleCapitalize = __webpack_require__(/*! ../../common/internal/simpleCapitalize */ "./node_modules/sugar-date/common/internal/simpleCapitalize.js"),
    moveToBeginningOfUnit = __webpack_require__(/*! ./moveToBeginningOfUnit */ "./node_modules/sugar-date/date/internal/moveToBeginningOfUnit.js"),
    defineInstanceSimilar = __webpack_require__(/*! ../../common/internal/defineInstanceSimilar */ "./node_modules/sugar-date/common/internal/defineInstanceSimilar.js"),
    getTimeDistanceForUnit = __webpack_require__(/*! ./getTimeDistanceForUnit */ "./node_modules/sugar-date/date/internal/getTimeDistanceForUnit.js");

var sugarDate = namespaceAliases.sugarDate,
    HOURS_INDEX = DateUnitIndexes.HOURS_INDEX,
    DAY_INDEX = DateUnitIndexes.DAY_INDEX;

function buildDateUnitMethods() {

  defineInstanceSimilar(sugarDate, DateUnits, function(methods, unit, index) {
    var name = unit.name, caps = simpleCapitalize(name);

    if (index > DAY_INDEX) {
      forEach(['Last','This','Next'], function(shift) {
        methods['is' + shift + caps] = function(d, localeCode) {
          return compareDate(d, shift + ' ' + name, 0, localeCode, { locale: 'en' });
        };
      });
    }
    if (index > HOURS_INDEX) {
      methods['beginningOf' + caps] = function(d, localeCode) {
        return moveToBeginningOfUnit(d, index, localeCode);
      };
      methods['endOf' + caps] = function(d, localeCode) {
        return moveToEndOfUnit(d, index, localeCode);
      };
    }

    methods['add' + caps + 's'] = function(d, num, reset) {
      return advanceDate(d, name, num, reset);
    };

    var since = function(date, d, options) {
      return getTimeDistanceForUnit(date, createDate(d, options, true), unit);
    };
    var until = function(date, d, options) {
      return getTimeDistanceForUnit(createDate(d, options, true), date, unit);
    };

    methods[name + 'sAgo']   = methods[name + 'sUntil']   = until;
    methods[name + 'sSince'] = methods[name + 'sFromNow'] = since;

  });

}

module.exports = buildDateUnitMethods;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/buildNumberUnitMethods.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/buildNumberUnitMethods.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(/*! ../var/DateUnits */ "./node_modules/sugar-date/date/var/DateUnits.js"),
    createDate = __webpack_require__(/*! ./createDate */ "./node_modules/sugar-date/date/internal/createDate.js"),
    mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js"),
    advanceDate = __webpack_require__(/*! ./advanceDate */ "./node_modules/sugar-date/date/internal/advanceDate.js"),
    namespaceAliases = __webpack_require__(/*! ../../common/var/namespaceAliases */ "./node_modules/sugar-date/common/var/namespaceAliases.js"),
    defineInstanceSimilar = __webpack_require__(/*! ../../common/internal/defineInstanceSimilar */ "./node_modules/sugar-date/common/internal/defineInstanceSimilar.js");

var sugarNumber = namespaceAliases.sugarNumber,
    round = mathAliases.round;

function buildNumberUnitMethods() {
  defineInstanceSimilar(sugarNumber, DateUnits, function(methods, unit) {
    var name = unit.name, base, after, before;
    base = function(n) {
      return round(n * unit.multiplier);
    };
    after = function(n, d, options) {
      return advanceDate(createDate(d, options, true), name, n);
    };
    before = function(n, d, options) {
      return advanceDate(createDate(d, options, true), name, -n);
    };
    methods[name] = base;
    methods[name + 's'] = base;
    methods[name + 'Before'] = before;
    methods[name + 'sBefore'] = before;
    methods[name + 'Ago'] = before;
    methods[name + 'sAgo'] = before;
    methods[name + 'After'] = after;
    methods[name + 'sAfter'] = after;
    methods[name + 'FromNow'] = after;
    methods[name + 'sFromNow'] = after;
  });
}

module.exports = buildNumberUnitMethods;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/buildRelativeAliases.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/buildRelativeAliases.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(/*! ../var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    spaceSplit = __webpack_require__(/*! ../../common/internal/spaceSplit */ "./node_modules/sugar-date/common/internal/spaceSplit.js"),
    fullCompareDate = __webpack_require__(/*! ./fullCompareDate */ "./node_modules/sugar-date/date/internal/fullCompareDate.js"),
    namespaceAliases = __webpack_require__(/*! ../../common/var/namespaceAliases */ "./node_modules/sugar-date/common/var/namespaceAliases.js"),
    defineInstanceSimilar = __webpack_require__(/*! ../../common/internal/defineInstanceSimilar */ "./node_modules/sugar-date/common/internal/defineInstanceSimilar.js");

var English = LocaleHelpers.English,
    sugarDate = namespaceAliases.sugarDate;

function buildRelativeAliases() {
  var special  = spaceSplit('Today Yesterday Tomorrow Weekday Weekend Future Past');
  var weekdays = English.weekdays.slice(0, 7);
  var months   = English.months.slice(0, 12);
  var together = special.concat(weekdays).concat(months);
  defineInstanceSimilar(sugarDate, together, function(methods, name) {
    methods['is'+ name] = function(d) {
      return fullCompareDate(d, name);
    };
  });
}

module.exports = buildRelativeAliases;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/callDateSetWithWeek.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/callDateSetWithWeek.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateSet = __webpack_require__(/*! ../../common/internal/callDateSet */ "./node_modules/sugar-date/common/internal/callDateSet.js"),
    setISOWeekNumber = __webpack_require__(/*! ./setISOWeekNumber */ "./node_modules/sugar-date/date/internal/setISOWeekNumber.js");

function callDateSetWithWeek(d, method, value, safe) {
  if (method === 'ISOWeek') {
    setISOWeekNumber(d, value);
  } else {
    callDateSet(d, method, value, safe);
  }
}

module.exports = callDateSetWithWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/cloneDate.js":
/*!************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/cloneDate.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utc = __webpack_require__(/*! ../../common/var/_utc */ "./node_modules/sugar-date/common/var/_utc.js");

function cloneDate(d) {
  // Rhino environments have a bug where new Date(d) truncates
  // milliseconds so need to call getTime() here.
  var clone = new Date(d.getTime());
  _utc(clone, !!_utc(d));
  return clone;
}

module.exports = cloneDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/collectDateParamsFromArguments.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/collectDateParamsFromArguments.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    isDefined = __webpack_require__(/*! ../../common/internal/isDefined */ "./node_modules/sugar-date/common/internal/isDefined.js"),
    walkUnitDown = __webpack_require__(/*! ./walkUnitDown */ "./node_modules/sugar-date/date/internal/walkUnitDown.js");

var YEAR_INDEX = DateUnitIndexes.YEAR_INDEX;

function collectDateParamsFromArguments(args) {
  var params = {}, index = 0;
  walkUnitDown(YEAR_INDEX, function(unit) {
    var arg = args[index++];
    if (isDefined(arg)) {
      params[unit.name] = arg;
    }
  });
  return params;
}

module.exports = collectDateParamsFromArguments;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/collectUpdateDateArguments.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/collectUpdateDateArguments.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    simpleClone = __webpack_require__(/*! ../../common/internal/simpleClone */ "./node_modules/sugar-date/common/internal/simpleClone.js"),
    isObjectType = __webpack_require__(/*! ../../common/internal/isObjectType */ "./node_modules/sugar-date/common/internal/isObjectType.js"),
    getDateParamsFromString = __webpack_require__(/*! ./getDateParamsFromString */ "./node_modules/sugar-date/date/internal/getDateParamsFromString.js"),
    collectDateParamsFromArguments = __webpack_require__(/*! ./collectDateParamsFromArguments */ "./node_modules/sugar-date/date/internal/collectDateParamsFromArguments.js");

var isNumber = classChecks.isNumber,
    isString = classChecks.isString;

function collectUpdateDateArguments(args, allowDuration) {
  var arg1 = args[0], arg2 = args[1], params, reset;
  if (allowDuration && isString(arg1)) {
    params = getDateParamsFromString(arg1);
    reset  = arg2;
  } else if (isNumber(arg1) && isNumber(arg2)) {
    params = collectDateParamsFromArguments(args);
  } else {
    params = isObjectType(arg1) ? simpleClone(arg1) : arg1;
    reset  = arg2;
  }
  return [params, reset];
}

module.exports = collectUpdateDateArguments;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/compareDate.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/compareDate.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MINUTES = __webpack_require__(/*! ../var/MINUTES */ "./node_modules/sugar-date/date/var/MINUTES.js"),
    DateUnits = __webpack_require__(/*! ../var/DateUnits */ "./node_modules/sugar-date/date/var/DateUnits.js"),
    DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    _utc = __webpack_require__(/*! ../../common/var/_utc */ "./node_modules/sugar-date/common/var/_utc.js"),
    tzOffset = __webpack_require__(/*! ./tzOffset */ "./node_modules/sugar-date/date/internal/tzOffset.js"),
    cloneDate = __webpack_require__(/*! ./cloneDate */ "./node_modules/sugar-date/date/internal/cloneDate.js"),
    isDefined = __webpack_require__(/*! ../../common/internal/isDefined */ "./node_modules/sugar-date/common/internal/isDefined.js"),
    advanceDate = __webpack_require__(/*! ./advanceDate */ "./node_modules/sugar-date/date/internal/advanceDate.js"),
    dateIsValid = __webpack_require__(/*! ./dateIsValid */ "./node_modules/sugar-date/date/internal/dateIsValid.js"),
    moveToEndOfUnit = __webpack_require__(/*! ./moveToEndOfUnit */ "./node_modules/sugar-date/date/internal/moveToEndOfUnit.js"),
    getExtendedDate = __webpack_require__(/*! ./getExtendedDate */ "./node_modules/sugar-date/date/internal/getExtendedDate.js"),
    moveToBeginningOfUnit = __webpack_require__(/*! ./moveToBeginningOfUnit */ "./node_modules/sugar-date/date/internal/moveToBeginningOfUnit.js");

var MONTH_INDEX = DateUnitIndexes.MONTH_INDEX;

function compareDate(date, d, margin, localeCode, options) {
  var loMargin = 0, hiMargin = 0, timezoneShift, compareEdges, override, min, max, p, t;

  function getTimezoneShift() {
    // If there is any specificity in the date then we're implicitly not
    // checking absolute time, so ignore timezone shifts.
    if (p.set && p.set.specificity) {
      return 0;
    }
    return (tzOffset(p.date) - tzOffset(date)) * MINUTES;
  }

  function addSpecificUnit() {
    var unit = DateUnits[p.set.specificity];
    return advanceDate(cloneDate(p.date), unit.name, 1).getTime() - 1;
  }

  if (_utc(date)) {
    options = options || {};
    options.fromUTC = true;
    options.setUTC = true;
  }

  p = getExtendedDate(null, d, options, true);

  if (margin > 0) {
    loMargin = hiMargin = margin;
    override = true;
  }
  if (!dateIsValid(p.date)) return false;
  if (p.set && p.set.specificity) {
    if (isDefined(p.set.edge) || isDefined(p.set.shift)) {
      compareEdges = true;
      moveToBeginningOfUnit(p.date, p.set.specificity, localeCode);
    }
    if (compareEdges || p.set.specificity === MONTH_INDEX) {
      max = moveToEndOfUnit(cloneDate(p.date), p.set.specificity, localeCode).getTime();
    } else {
      max = addSpecificUnit();
    }
    if (!override && isDefined(p.set.sign) && p.set.specificity) {
      // If the time is relative, there can occasionally be an disparity between
      // the relative date and "now", which it is being compared to, so set an
      // extra margin to account for this.
      loMargin = 50;
      hiMargin = -50;
    }
  }
  t   = date.getTime();
  min = p.date.getTime();
  max = max || min;
  timezoneShift = getTimezoneShift();
  // istanbul ignore if
  if (timezoneShift) {
    min -= timezoneShift;
    max -= timezoneShift;
  }
  return t >= (min - loMargin) && t <= (max + hiMargin);
}

module.exports = compareDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/compareDay.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/compareDay.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setDate = __webpack_require__(/*! ./setDate */ "./node_modules/sugar-date/date/internal/setDate.js"),
    getDate = __webpack_require__(/*! ./getDate */ "./node_modules/sugar-date/date/internal/getDate.js"),
    getYear = __webpack_require__(/*! ./getYear */ "./node_modules/sugar-date/date/internal/getYear.js"),
    getMonth = __webpack_require__(/*! ./getMonth */ "./node_modules/sugar-date/date/internal/getMonth.js"),
    getNewDate = __webpack_require__(/*! ./getNewDate */ "./node_modules/sugar-date/date/internal/getNewDate.js");

function compareDay(d, shift) {
  var comp = getNewDate();
  if (shift) {
    setDate(comp, getDate(comp) + shift);
  }
  return getYear(d) === getYear(comp) &&
         getMonth(d) === getMonth(comp) &&
         getDate(d) === getDate(comp);
}

module.exports = compareDay;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/createDate.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/createDate.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getExtendedDate = __webpack_require__(/*! ./getExtendedDate */ "./node_modules/sugar-date/date/internal/getExtendedDate.js");

function createDate(d, options, forceClone) {
  return getExtendedDate(null, d, options, forceClone).date;
}

module.exports = createDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/createDateWithContext.js":
/*!************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/createDateWithContext.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getExtendedDate = __webpack_require__(/*! ./getExtendedDate */ "./node_modules/sugar-date/date/internal/getExtendedDate.js");

function createDateWithContext(contextDate, d, options, forceClone) {
  return getExtendedDate(contextDate, d, options, forceClone).date;
}

module.exports = createDateWithContext;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/dateFormat.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/dateFormat.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CoreOutputFormats = __webpack_require__(/*! ../var/CoreOutputFormats */ "./node_modules/sugar-date/date/var/CoreOutputFormats.js"),
    formattingTokens = __webpack_require__(/*! ../var/formattingTokens */ "./node_modules/sugar-date/date/var/formattingTokens.js"),
    assertDateIsValid = __webpack_require__(/*! ./assertDateIsValid */ "./node_modules/sugar-date/date/internal/assertDateIsValid.js");

var dateFormatMatcher = formattingTokens.dateFormatMatcher;

function dateFormat(d, format, localeCode) {
  assertDateIsValid(d);
  format = CoreOutputFormats[format] || format || '{long}';
  return dateFormatMatcher(format, d, localeCode);
}

module.exports = dateFormat;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/dateIsValid.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/dateIsValid.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dateIsValid(d) {
  return !isNaN(d.getTime());
}

module.exports = dateIsValid;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/dateRelative.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/dateRelative.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(/*! ../var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    dateFormat = __webpack_require__(/*! ./dateFormat */ "./node_modules/sugar-date/date/internal/dateFormat.js"),
    classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    assertDateIsValid = __webpack_require__(/*! ./assertDateIsValid */ "./node_modules/sugar-date/date/internal/assertDateIsValid.js"),
    getAdjustedUnitForDate = __webpack_require__(/*! ./getAdjustedUnitForDate */ "./node_modules/sugar-date/date/internal/getAdjustedUnitForDate.js");

var isFunction = classChecks.isFunction,
    localeManager = LocaleHelpers.localeManager;

function dateRelative(d, dRelative, arg1, arg2) {
  var adu, format, type, localeCode, fn;
  assertDateIsValid(d);
  if (isFunction(arg1)) {
    fn = arg1;
  } else {
    localeCode = arg1;
    fn = arg2;
  }
  adu = getAdjustedUnitForDate(d, dRelative);
  if (fn) {
    format = fn.apply(d, adu.concat(localeManager.get(localeCode)));
    if (format) {
      return dateFormat(d, format, localeCode);
    }
  }
  // Adjust up if time is in ms, as this doesn't
  // look very good for a standard relative date.
  if (adu[1] === 0) {
    adu[1] = 1;
    adu[0] = 1;
  }
  if (dRelative) {
    type = 'duration';
  } else if (adu[2] > 0) {
    type = 'future';
  } else {
    type = 'past';
  }
  return localeManager.get(localeCode).getRelativeFormat(adu, type);
}

module.exports = dateRelative;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/defaultNewDate.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/defaultNewDate.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function defaultNewDate() {
  return new Date;
}

module.exports = defaultNewDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/deleteDateParam.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/deleteDateParam.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDateParamKey = __webpack_require__(/*! ./getDateParamKey */ "./node_modules/sugar-date/date/internal/getDateParamKey.js");

function deleteDateParam(params, key) {
  delete params[getDateParamKey(params, key)];
}

module.exports = deleteDateParam;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/fullCompareDate.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/fullCompareDate.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(/*! ../var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    trim = __webpack_require__(/*! ../../common/internal/trim */ "./node_modules/sugar-date/common/internal/trim.js"),
    getMonth = __webpack_require__(/*! ./getMonth */ "./node_modules/sugar-date/date/internal/getMonth.js"),
    isDefined = __webpack_require__(/*! ../../common/internal/isDefined */ "./node_modules/sugar-date/common/internal/isDefined.js"),
    getNewDate = __webpack_require__(/*! ./getNewDate */ "./node_modules/sugar-date/date/internal/getNewDate.js"),
    compareDay = __webpack_require__(/*! ./compareDay */ "./node_modules/sugar-date/date/internal/compareDay.js"),
    getWeekday = __webpack_require__(/*! ./getWeekday */ "./node_modules/sugar-date/date/internal/getWeekday.js"),
    dateIsValid = __webpack_require__(/*! ./dateIsValid */ "./node_modules/sugar-date/date/internal/dateIsValid.js"),
    classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    compareDate = __webpack_require__(/*! ./compareDate */ "./node_modules/sugar-date/date/internal/compareDate.js");

var isString = classChecks.isString,
    English = LocaleHelpers.English;

function fullCompareDate(date, d, margin) {
  var tmp;
  if (!dateIsValid(date)) return;
  if (isString(d)) {
    d = trim(d).toLowerCase();
    switch(true) {
      case d === 'future':    return date.getTime() > getNewDate().getTime();
      case d === 'past':      return date.getTime() < getNewDate().getTime();
      case d === 'today':     return compareDay(date);
      case d === 'tomorrow':  return compareDay(date,  1);
      case d === 'yesterday': return compareDay(date, -1);
      case d === 'weekday':   return getWeekday(date) > 0 && getWeekday(date) < 6;
      case d === 'weekend':   return getWeekday(date) === 0 || getWeekday(date) === 6;

      case (isDefined(tmp = English.weekdayMap[d])):
        return getWeekday(date) === tmp;
      case (isDefined(tmp = English.monthMap[d])):
        return getMonth(date) === tmp;
    }
  }
  return compareDate(date, d, margin);
}

module.exports = fullCompareDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getAdjustedUnit.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getAdjustedUnit.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js"),
    iterateOverDateUnits = __webpack_require__(/*! ./iterateOverDateUnits */ "./node_modules/sugar-date/date/internal/iterateOverDateUnits.js");

var abs = mathAliases.abs;

function getAdjustedUnit(ms, fn) {
  var unitIndex = 0, value = 0;
  iterateOverDateUnits(function(unit, i) {
    value = abs(fn(unit));
    if (value >= 1) {
      unitIndex = i;
      return false;
    }
  });
  return [value, unitIndex, ms];
}

module.exports = getAdjustedUnit;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getAdjustedUnitForDate.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getAdjustedUnitForDate.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNewDate = __webpack_require__(/*! ./getNewDate */ "./node_modules/sugar-date/date/internal/getNewDate.js"),
    mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js"),
    getAdjustedUnit = __webpack_require__(/*! ./getAdjustedUnit */ "./node_modules/sugar-date/date/internal/getAdjustedUnit.js"),
    getTimeDistanceForUnit = __webpack_require__(/*! ./getTimeDistanceForUnit */ "./node_modules/sugar-date/date/internal/getTimeDistanceForUnit.js");

var abs = mathAliases.abs;

function getAdjustedUnitForDate(d, dRelative) {
  var ms;
  if (!dRelative) {
    dRelative = getNewDate();
    if (d > dRelative) {
      // If our date is greater than the one that we got from getNewDate, it
      // means that we are finding the unit for a date that is in the future
      // relative to now. However, often the incoming date was created in
      // the same cycle as our comparison, but our "now" date will have been
      // created an instant after it, creating situations where "5 minutes from
      // now" becomes "4 minutes from now" in the same tick. To prevent this,
      // subtract a buffer of 10ms to compensate.
      dRelative = new Date(dRelative.getTime() - 10);
    }
  }
  ms = d - dRelative;
  return getAdjustedUnit(ms, function(u) {
    return abs(getTimeDistanceForUnit(d, dRelative, u));
  });
}

module.exports = getAdjustedUnitForDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getAdjustedUnitForNumber.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getAdjustedUnitForNumber.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trunc = __webpack_require__(/*! ../../common/var/trunc */ "./node_modules/sugar-date/common/var/trunc.js"),
    withPrecision = __webpack_require__(/*! ../../common/internal/withPrecision */ "./node_modules/sugar-date/common/internal/withPrecision.js"),
    getAdjustedUnit = __webpack_require__(/*! ./getAdjustedUnit */ "./node_modules/sugar-date/date/internal/getAdjustedUnit.js");

function getAdjustedUnitForNumber(ms) {
  return getAdjustedUnit(ms, function(unit) {
    return trunc(withPrecision(ms / unit.multiplier, 1));
  });
}

module.exports = getAdjustedUnitForNumber;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getArrayWithOffset.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getArrayWithOffset.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getArrayWithOffset(arr, n, alternate, offset) {
  var val;
  if (alternate > 1) {
    val = arr[n + (alternate - 1) * offset];
  }
  return val || arr[n];
}

module.exports = getArrayWithOffset;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getDate.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getDate.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateGet = __webpack_require__(/*! ../../common/internal/callDateGet */ "./node_modules/sugar-date/common/internal/callDateGet.js");

function getDate(d) {
  return callDateGet(d, 'Date');
}

module.exports = getDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getDateParam.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getDateParam.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDateParamKey = __webpack_require__(/*! ./getDateParamKey */ "./node_modules/sugar-date/date/internal/getDateParamKey.js"),
    coreUtilityAliases = __webpack_require__(/*! ../../common/var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js");

var getOwn = coreUtilityAliases.getOwn;

function getDateParam(params, key) {
  return getOwn(params, getDateParamKey(params, key));
}

module.exports = getDateParam;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getDateParamKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getDateParamKey.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getOwnKey = __webpack_require__(/*! ../../common/internal/getOwnKey */ "./node_modules/sugar-date/common/internal/getOwnKey.js");

function getDateParamKey(params, key) {
  return getOwnKey(params, key) ||
         getOwnKey(params, key + 's') ||
         (key === 'day' && getOwnKey(params, 'date'));
}

module.exports = getDateParamKey;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getDateParamsFromString.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getDateParamsFromString.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isUndefined = __webpack_require__(/*! ../../common/internal/isUndefined */ "./node_modules/sugar-date/common/internal/isUndefined.js");

function getDateParamsFromString(str) {
  var match, num, params = {};
  match = str.match(/^(-?\d*[\d.]\d*)?\s?(\w+?)s?$/i);
  if (match) {
    if (isUndefined(num)) {
      num = match[1] ? +match[1] : 1;
    }
    params[match[2].toLowerCase()] = num;
  }
  return params;
}

module.exports = getDateParamsFromString;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getDaysInMonth.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getDaysInMonth.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getYear = __webpack_require__(/*! ./getYear */ "./node_modules/sugar-date/date/internal/getYear.js"),
    getMonth = __webpack_require__(/*! ./getMonth */ "./node_modules/sugar-date/date/internal/getMonth.js"),
    callDateGet = __webpack_require__(/*! ../../common/internal/callDateGet */ "./node_modules/sugar-date/common/internal/callDateGet.js");

function getDaysInMonth(d) {
  return 32 - callDateGet(new Date(getYear(d), getMonth(d), 32), 'Date');
}

module.exports = getDaysInMonth;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getDaysSince.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getDaysSince.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(/*! ../var/DateUnits */ "./node_modules/sugar-date/date/var/DateUnits.js"),
    DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    getTimeDistanceForUnit = __webpack_require__(/*! ./getTimeDistanceForUnit */ "./node_modules/sugar-date/date/internal/getTimeDistanceForUnit.js");

var DAY_INDEX = DateUnitIndexes.DAY_INDEX;

function getDaysSince(d1, d2) {
  return getTimeDistanceForUnit(d1, d2, DateUnits[DAY_INDEX]);
}

module.exports = getDaysSince;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getEnglishVariant.js":
/*!********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getEnglishVariant.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EnglishLocaleBaseDefinition = __webpack_require__(/*! ../var/EnglishLocaleBaseDefinition */ "./node_modules/sugar-date/date/var/EnglishLocaleBaseDefinition.js"),
    simpleMerge = __webpack_require__(/*! ../../common/internal/simpleMerge */ "./node_modules/sugar-date/common/internal/simpleMerge.js"),
    simpleClone = __webpack_require__(/*! ../../common/internal/simpleClone */ "./node_modules/sugar-date/common/internal/simpleClone.js");

function getEnglishVariant(v) {
  return simpleMerge(simpleClone(EnglishLocaleBaseDefinition), v);
}

module.exports = getEnglishVariant;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getExtendedDate.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getExtendedDate.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MINUTES = __webpack_require__(/*! ../var/MINUTES */ "./node_modules/sugar-date/date/var/MINUTES.js"),
    ABBREVIATED_YEAR_REG = __webpack_require__(/*! ../var/ABBREVIATED_YEAR_REG */ "./node_modules/sugar-date/date/var/ABBREVIATED_YEAR_REG.js"),
    LocaleHelpers = __webpack_require__(/*! ../var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    _utc = __webpack_require__(/*! ../../common/var/_utc */ "./node_modules/sugar-date/common/var/_utc.js"),
    trunc = __webpack_require__(/*! ../../common/var/trunc */ "./node_modules/sugar-date/common/var/trunc.js"),
    forEach = __webpack_require__(/*! ../../common/internal/forEach */ "./node_modules/sugar-date/common/internal/forEach.js"),
    tzOffset = __webpack_require__(/*! ./tzOffset */ "./node_modules/sugar-date/date/internal/tzOffset.js"),
    isDefined = __webpack_require__(/*! ../../common/internal/isDefined */ "./node_modules/sugar-date/common/internal/isDefined.js"),
    resetTime = __webpack_require__(/*! ./resetTime */ "./node_modules/sugar-date/date/internal/resetTime.js"),
    getNewDate = __webpack_require__(/*! ./getNewDate */ "./node_modules/sugar-date/date/internal/getNewDate.js"),
    updateDate = __webpack_require__(/*! ./updateDate */ "./node_modules/sugar-date/date/internal/updateDate.js"),
    setWeekday = __webpack_require__(/*! ./setWeekday */ "./node_modules/sugar-date/date/internal/setWeekday.js"),
    simpleMerge = __webpack_require__(/*! ../../common/internal/simpleMerge */ "./node_modules/sugar-date/common/internal/simpleMerge.js"),
    advanceDate = __webpack_require__(/*! ./advanceDate */ "./node_modules/sugar-date/date/internal/advanceDate.js"),
    isUndefined = __webpack_require__(/*! ../../common/internal/isUndefined */ "./node_modules/sugar-date/common/internal/isUndefined.js"),
    classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    dateIsValid = __webpack_require__(/*! ./dateIsValid */ "./node_modules/sugar-date/date/internal/dateIsValid.js"),
    simpleClone = __webpack_require__(/*! ../../common/internal/simpleClone */ "./node_modules/sugar-date/common/internal/simpleClone.js"),
    isObjectType = __webpack_require__(/*! ../../common/internal/isObjectType */ "./node_modules/sugar-date/common/internal/isObjectType.js"),
    moveToEndOfUnit = __webpack_require__(/*! ./moveToEndOfUnit */ "./node_modules/sugar-date/date/internal/moveToEndOfUnit.js"),
    deleteDateParam = __webpack_require__(/*! ./deleteDateParam */ "./node_modules/sugar-date/date/internal/deleteDateParam.js"),
    coreUtilityAliases = __webpack_require__(/*! ../../common/var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js"),
    moveToBeginningOfUnit = __webpack_require__(/*! ./moveToBeginningOfUnit */ "./node_modules/sugar-date/date/internal/moveToBeginningOfUnit.js"),
    iterateOverDateParams = __webpack_require__(/*! ./iterateOverDateParams */ "./node_modules/sugar-date/date/internal/iterateOverDateParams.js"),
    getYearFromAbbreviation = __webpack_require__(/*! ./getYearFromAbbreviation */ "./node_modules/sugar-date/date/internal/getYearFromAbbreviation.js"),
    iterateOverHigherDateParams = __webpack_require__(/*! ./iterateOverHigherDateParams */ "./node_modules/sugar-date/date/internal/iterateOverHigherDateParams.js");

var isNumber = classChecks.isNumber,
    isString = classChecks.isString,
    isDate = classChecks.isDate,
    getOwn = coreUtilityAliases.getOwn,
    English = LocaleHelpers.English,
    localeManager = LocaleHelpers.localeManager,
    DAY_INDEX = DateUnitIndexes.DAY_INDEX,
    WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX,
    YEAR_INDEX = DateUnitIndexes.YEAR_INDEX;

function getExtendedDate(contextDate, d, opt, forceClone) {

  // Locals
  var date, set, loc, afterCallbacks, relative, weekdayDir;

  // Options
  var optPrefer, optLocale, optFromUTC, optSetUTC, optParams, optClone;

  afterCallbacks = [];

  setupOptions(opt);

  function setupOptions(opt) {
    opt = isString(opt) ? { locale: opt } : opt || {};
    optPrefer  = +!!getOwn(opt, 'future') - +!!getOwn(opt, 'past');
    optLocale  = getOwn(opt, 'locale');
    optFromUTC = getOwn(opt, 'fromUTC');
    optSetUTC  = getOwn(opt, 'setUTC');
    optParams  = getOwn(opt, 'params');
    optClone   = getOwn(opt, 'clone');
  }

  function parseFormatValues(match, dif) {
    var set = optParams || {};
    forEach(dif.to, function(param, i) {
      var str = match[i + 1], val;
      if (!str) return;

      val = parseIrregular(str, param);

      if (isUndefined(val)) {
        val = loc.parseValue(str, param);
      }

      set[param] = val;
    });
    return set;
  }

  function parseIrregular(str, param) {
    if (param === 'utc') {
      return 1;
    } else if (param === 'year') {
      var match = str.match(ABBREVIATED_YEAR_REG);
      if (match) {
        return getYearFromAbbreviation(match[1], date, optPrefer);
      }
    }
  }

  // Force the UTC flags to be true if the source date
  // date is UTC, as they will be overwritten later.
  function cloneDateByFlag(d, clone) {
    if (_utc(d) && !isDefined(optFromUTC)) {
      optFromUTC = true;
    }
    if (_utc(d) && !isDefined(optSetUTC)) {
      optSetUTC = true;
    }
    if (clone) {
      d = new Date(d.getTime());
    }
    return d;
  }

  function afterDateSet(fn) {
    afterCallbacks.push(fn);
  }

  function fireCallbacks() {
    forEach(afterCallbacks, function(fn) {
      fn.call();
    });
  }

  function parseStringDate(str) {

    str = str.toLowerCase();

    // The act of getting the locale will initialize
    // if it is missing and add the required formats.
    loc = localeManager.get(optLocale);

    for (var i = 0, dif, match; dif = loc.compiledFormats[i]; i++) {
      match = str.match(dif.reg);
      if (match) {

        // Note that caching the format will modify the compiledFormats array
        // which is not a good idea to do inside its for loop, however we
        // know at this point that we have a matched format and that we will
        // break out below, so simpler to do it here.
        loc.cacheFormat(dif, i);

        set = parseFormatValues(match, dif);

        if (isDefined(set.timestamp)) {
          date.setTime(set.timestamp);
          break;
        }

        if (isDefined(set.ampm)) {
          handleAmpm(set.ampm);
        }

        if (set.utc || isDefined(set.tzHour)) {
          handleTimezoneOffset(set.tzHour, set.tzMinute);
        }

        if (isDefined(set.shift) && isUndefined(set.unit)) {
          // "next january", "next monday", etc
          handleUnitlessShift();
        }

        if (isDefined(set.num) && isUndefined(set.unit)) {
          // "the second of January", etc
          handleUnitlessNum(set.num);
        }

        if (set.midday) {
          // "noon" and "midnight"
          handleMidday(set.midday);
        }

        if (isDefined(set.day)) {
          // Relative day localizations such as "today" and "tomorrow".
          handleRelativeDay(set.day);
        }

        if (isDefined(set.unit)) {
          // "3 days ago", etc
          handleRelativeUnit(set.unit);
        }

        if (set.edge) {
          // "the end of January", etc
          handleEdge(set.edge, set);
        }

        break;
      }
    }

    if (!set) {
      // TODO: remove in next major version
      // Fall back to native parsing
      date = new Date(str);
      if (optFromUTC && dateIsValid(date)) {
        // Falling back to system date here which cannot be parsed as UTC,
        // so if we're forcing UTC then simply add the offset.
        date.setTime(date.getTime() + (tzOffset(date) * MINUTES));
      }
    } else if (relative) {
      updateDate(date, set, false, 1);
    } else {
      updateDate(date, set, true, 0, optPrefer, weekdayDir, contextDate);
    }
    fireCallbacks();
    return date;
  }

  function handleAmpm(ampm) {
    if (ampm === 1 && set.hour < 12) {
      // If the time is 1pm-11pm advance the time by 12 hours.
      set.hour += 12;
    } else if (ampm === 0 && set.hour === 12) {
      // If it is 12:00am then set the hour to 0.
      set.hour = 0;
    }
  }

  function handleTimezoneOffset(tzHour, tzMinute) {
    // Adjust for timezone offset
    _utc(date, true);

    // Sign is parsed as part of the hour, so flip
    // the minutes if it's negative.

    if (tzHour < 0) {
      tzMinute *= -1;
    }

    var offset = tzHour * 60 + (tzMinute || 0);
    if (offset) {
      set.minute = (set.minute || 0) - offset;
    }
  }

  function handleUnitlessShift() {
    if (isDefined(set.month)) {
      // "next January"
      set.unit = YEAR_INDEX;
    } else if (isDefined(set.weekday)) {
      // "next Monday"
      set.unit = WEEK_INDEX;
    }
  }

  function handleUnitlessNum(num) {
    if (isDefined(set.weekday)) {
      // "The second Tuesday of March"
      setOrdinalWeekday(num);
    } else if (isDefined(set.month)) {
      // "The second of March"
      set.date = set.num;
    }
  }

  function handleMidday(hour) {
    set.hour = hour % 24;
    if (hour > 23) {
      // If the date has hours past 24, we need to prevent it from traversing
      // into a new day as that would make it being part of a new week in
      // ambiguous dates such as "Monday".
      afterDateSet(function() {
        advanceDate(date, 'date', trunc(hour / 24));
      });
    }
  }

  function handleRelativeDay() {
    resetTime(date);
    if (isUndefined(set.unit)) {
      set.unit = DAY_INDEX;
      set.num  = set.day;
      delete set.day;
    }
  }

  function handleRelativeUnit(unitIndex) {
    var num;

    if (isDefined(set.num)) {
      num = set.num;
    } else if (isDefined(set.edge) && isUndefined(set.shift)) {
      num = 0;
    } else {
      num = 1;
    }

    // If a weekday is defined, there are 3 possible formats being applied:
    //
    // 1. "the day after monday": unit is days
    // 2. "next monday": short for "next week monday", unit is weeks
    // 3. "the 2nd monday of next month": unit is months
    //
    // In the first case, we need to set the weekday up front, as the day is
    // relative to it. The second case also needs to be handled up front for
    // formats like "next monday at midnight" which will have its weekday reset
    // if not set up front. The last case will set up the params necessary to
    // shift the weekday and allow separateAbsoluteUnits below to handle setting
    // it after the date has been shifted.
    if(isDefined(set.weekday)) {
      if(unitIndex === MONTH_INDEX) {
        setOrdinalWeekday(num);
        num = 1;
      } else {
        updateDate(date, { weekday: set.weekday }, true);
        delete set.weekday;
      }
    }

    if (set.half) {
      // Allow localized "half" as a standalone colloquialism. Purposely avoiding
      // the locale number system to reduce complexity. The units "month" and
      // "week" are purposely excluded in the English date formats below, as
      // "half a week" and "half a month" are meaningless as exact dates.
      num *= set.half;
    }

    if (isDefined(set.shift)) {
      // Shift and unit, ie "next month", "last week", etc.
      num *= set.shift;
    } else if (set.sign) {
      // Unit and sign, ie "months ago", "weeks from now", etc.
      num *= set.sign;
    }

    if (isDefined(set.day)) {
      // "the day after tomorrow"
      num += set.day;
      delete set.day;
    }

    // Formats like "the 15th of last month" or "6:30pm of next week"
    // contain absolute units in addition to relative ones, so separate
    // them here, remove them from the params, and set up a callback to
    // set them after the relative ones have been set.
    separateAbsoluteUnits(unitIndex);

    // Finally shift the unit.
    set[English.units[unitIndex]] = num;
    relative = true;
  }

  function handleEdge(edge, params) {
    var edgeIndex = params.unit, weekdayOfMonth;
    if (!edgeIndex) {
      // If we have "the end of January", then we need to find the unit index.
      iterateOverHigherDateParams(params, function(unitName, val, unit, i) {
        if (unitName === 'weekday' && isDefined(params.month)) {
          // If both a month and weekday exist, then we have a format like
          // "the last tuesday in November, 2012", where the "last" is still
          // relative to the end of the month, so prevent the unit "weekday"
          // from taking over.
          return;
        }
        edgeIndex = i;
      });
    }
    if (edgeIndex === MONTH_INDEX && isDefined(params.weekday)) {
      // If a weekday in a month exists (as described above),
      // then set it up to be set after the date has been shifted.
      weekdayOfMonth = params.weekday;
      delete params.weekday;
    }
    afterDateSet(function() {
      var stopIndex;
      // "edge" values that are at the very edge are "2" so the beginning of the
      // year is -2 and the end of the year is 2. Conversely, the "last day" is
      // actually 00:00am so it is 1. -1 is reserved but unused for now.
      if (edge < 0) {
        moveToBeginningOfUnit(date, edgeIndex, optLocale);
      } else if (edge > 0) {
        if (edge === 1) {
          stopIndex = DAY_INDEX;
          moveToBeginningOfUnit(date, DAY_INDEX);
        }
        moveToEndOfUnit(date, edgeIndex, optLocale, stopIndex);
      }
      if (isDefined(weekdayOfMonth)) {
        setWeekday(date, weekdayOfMonth, -edge);
        resetTime(date);
      }
    });
    if (edgeIndex === MONTH_INDEX) {
      params.specificity = DAY_INDEX;
    } else {
      params.specificity = edgeIndex - 1;
    }
  }

  function setOrdinalWeekday(num) {
    // If we have "the 2nd Tuesday of June", then pass the "weekdayDir"
    // flag along to updateDate so that the date does not accidentally traverse
    // into the previous month. This needs to be independent of the "prefer"
    // flag because we are only ensuring that the weekday is in the future, not
    // the entire date.
    set.weekday = 7 * (num - 1) + set.weekday;
    set.date = 1;
    weekdayDir = 1;
  }

  function separateAbsoluteUnits(unitIndex) {
    var params;

    iterateOverDateParams(set, function(name, val, unit, i) {
      // If there is a time unit set that is more specific than
      // the matched unit we have a string like "5:30am in 2 minutes",
      // which is meaningless, so invalidate the date...
      if (i >= unitIndex) {
        date.setTime(NaN);
        return false;
      } else if (i < unitIndex) {
        // ...otherwise set the params to set the absolute date
        // as a callback after the relative date has been set.
        params = params || {};
        params[name] = val;
        deleteDateParam(set, name);
      }
    });
    if (params) {
      afterDateSet(function() {
        updateDate(date, params, true, 0, false, weekdayDir);
        if (optParams) {
          simpleMerge(optParams, params);
        }
      });
      if (set.edge) {
        // "the end of March of next year"
        handleEdge(set.edge, params);
        delete set.edge;
      }
    }
  }

  if (contextDate && d) {
    // If a context date is passed ("get" and "unitsFromNow"),
    // then use it as the starting point.
    date = cloneDateByFlag(contextDate, true);
  } else {
    date = getNewDate();
  }

  _utc(date, optFromUTC);

  if (isString(d)) {
    date = parseStringDate(d);
  } else if (isDate(d)) {
    date = cloneDateByFlag(d, optClone || forceClone);
  } else if (isObjectType(d)) {
    set = simpleClone(d);
    updateDate(date, set, true);
  } else if (isNumber(d) || d === null) {
    date.setTime(d);
  }
  // A date created by parsing a string presumes that the format *itself* is
  // UTC, but not that the date, once created, should be manipulated as such. In
  // other words, if you are creating a date object from a server time
  // "2012-11-15T12:00:00Z", in the majority of cases you are using it to create
  // a date that will, after creation, be manipulated as local, so reset the utc
  // flag here unless "setUTC" is also set.
  _utc(date, !!optSetUTC);
  return {
    set: set,
    date: date
  };
}

module.exports = getExtendedDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getHigherUnitIndex.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getHigherUnitIndex.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js");

var DAY_INDEX = DateUnitIndexes.DAY_INDEX,
    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX;

function getHigherUnitIndex(index) {
  return index === DAY_INDEX ? MONTH_INDEX : index + 1;
}

module.exports = getHigherUnitIndex;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getHours.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getHours.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateGet = __webpack_require__(/*! ../../common/internal/callDateGet */ "./node_modules/sugar-date/common/internal/callDateGet.js");

function getHours(d) {
  return callDateGet(d, 'Hours');
}

module.exports = getHours;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getLowerUnitIndex.js":
/*!********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getLowerUnitIndex.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js");

var HOURS_INDEX = DateUnitIndexes.HOURS_INDEX,
    DAY_INDEX = DateUnitIndexes.DAY_INDEX,
    WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX;

function getLowerUnitIndex(index) {
  if (index === MONTH_INDEX) {
    return DAY_INDEX;
  } else if (index === WEEK_INDEX) {
    return HOURS_INDEX;
  }
  return index - 1;
}

module.exports = getLowerUnitIndex;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getMeridiemToken.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getMeridiemToken.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(/*! ../var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    trunc = __webpack_require__(/*! ../../common/var/trunc */ "./node_modules/sugar-date/common/var/trunc.js"),
    getHours = __webpack_require__(/*! ./getHours */ "./node_modules/sugar-date/date/internal/getHours.js");

var localeManager = LocaleHelpers.localeManager;

function getMeridiemToken(d, localeCode) {
  var hours = getHours(d);
  return localeManager.get(localeCode).ampm[trunc(hours / 12)] || '';
}

module.exports = getMeridiemToken;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getMonth.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getMonth.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateGet = __webpack_require__(/*! ../../common/internal/callDateGet */ "./node_modules/sugar-date/common/internal/callDateGet.js");

function getMonth(d) {
  return callDateGet(d, 'Month');
}

module.exports = getMonth;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getNewDate.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getNewDate.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dateOptions = __webpack_require__(/*! ../var/_dateOptions */ "./node_modules/sugar-date/date/var/_dateOptions.js");

function getNewDate() {
  return _dateOptions('newDateInternal')();
}

module.exports = getNewDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getNewLocale.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getNewLocale.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LOCALE_ARRAY_FIELDS = __webpack_require__(/*! ../var/LOCALE_ARRAY_FIELDS */ "./node_modules/sugar-date/date/var/LOCALE_ARRAY_FIELDS.js"),
    ISODefaults = __webpack_require__(/*! ../var/ISODefaults */ "./node_modules/sugar-date/date/var/ISODefaults.js"),
    CoreParsingTokens = __webpack_require__(/*! ../var/CoreParsingTokens */ "./node_modules/sugar-date/date/var/CoreParsingTokens.js"),
    CoreParsingFormats = __webpack_require__(/*! ../var/CoreParsingFormats */ "./node_modules/sugar-date/date/var/CoreParsingFormats.js"),
    LocalizedParsingTokens = __webpack_require__(/*! ../var/LocalizedParsingTokens */ "./node_modules/sugar-date/date/var/LocalizedParsingTokens.js"),
    map = __webpack_require__(/*! ../../common/internal/map */ "./node_modules/sugar-date/common/internal/map.js"),
    filter = __webpack_require__(/*! ../../common/internal/filter */ "./node_modules/sugar-date/common/internal/filter.js"),
    forEach = __webpack_require__(/*! ../../common/internal/forEach */ "./node_modules/sugar-date/common/internal/forEach.js"),
    isDefined = __webpack_require__(/*! ../../common/internal/isDefined */ "./node_modules/sugar-date/common/internal/isDefined.js"),
    commaSplit = __webpack_require__(/*! ../../common/internal/commaSplit */ "./node_modules/sugar-date/common/internal/commaSplit.js"),
    classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js"),
    isUndefined = __webpack_require__(/*! ../../common/internal/isUndefined */ "./node_modules/sugar-date/common/internal/isUndefined.js"),
    simpleMerge = __webpack_require__(/*! ../../common/internal/simpleMerge */ "./node_modules/sugar-date/common/internal/simpleMerge.js"),
    getOrdinalSuffix = __webpack_require__(/*! ../../common/internal/getOrdinalSuffix */ "./node_modules/sugar-date/common/internal/getOrdinalSuffix.js"),
    getArrayWithOffset = __webpack_require__(/*! ./getArrayWithOffset */ "./node_modules/sugar-date/date/internal/getArrayWithOffset.js"),
    getRegNonCapturing = __webpack_require__(/*! ./getRegNonCapturing */ "./node_modules/sugar-date/date/internal/getRegNonCapturing.js"),
    coreUtilityAliases = __webpack_require__(/*! ../../common/var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js"),
    iterateOverDateUnits = __webpack_require__(/*! ./iterateOverDateUnits */ "./node_modules/sugar-date/date/internal/iterateOverDateUnits.js"),
    arrayToRegAlternates = __webpack_require__(/*! ./arrayToRegAlternates */ "./node_modules/sugar-date/date/internal/arrayToRegAlternates.js"),
    fullwidthNumberHelpers = __webpack_require__(/*! ../../common/var/fullwidthNumberHelpers */ "./node_modules/sugar-date/common/var/fullwidthNumberHelpers.js"),
    getAdjustedUnitForNumber = __webpack_require__(/*! ./getAdjustedUnitForNumber */ "./node_modules/sugar-date/date/internal/getAdjustedUnitForNumber.js"),
    getParsingTokenWithSuffix = __webpack_require__(/*! ./getParsingTokenWithSuffix */ "./node_modules/sugar-date/date/internal/getParsingTokenWithSuffix.js");

var hasOwn = coreUtilityAliases.hasOwn,
    getOwn = coreUtilityAliases.getOwn,
    forEachProperty = coreUtilityAliases.forEachProperty,
    fullWidthNumberMap = fullwidthNumberHelpers.fullWidthNumberMap,
    fullWidthNumbers = fullwidthNumberHelpers.fullWidthNumbers,
    pow = mathAliases.pow,
    max = mathAliases.max,
    ISO_FIRST_DAY_OF_WEEK = ISODefaults.ISO_FIRST_DAY_OF_WEEK,
    ISO_FIRST_DAY_OF_WEEK_YEAR = ISODefaults.ISO_FIRST_DAY_OF_WEEK_YEAR,
    isString = classChecks.isString,
    isFunction = classChecks.isFunction;

function getNewLocale(def) {

  function Locale(def) {
    this.init(def);
  }

  Locale.prototype = {

    getMonthName: function(n, alternate) {
      if (this.monthSuffix) {
        return (n + 1) + this.monthSuffix;
      }
      return getArrayWithOffset(this.months, n, alternate, 12);
    },

    getWeekdayName: function(n, alternate) {
      return getArrayWithOffset(this.weekdays, n, alternate, 7);
    },

    // TODO: rename to parse in next major version
    parseValue: function(str, param) {
      var map = this[param + 'Map'];
      if (hasOwn(map, str)) {
        return map[str];
      }
      return this.parseNumber(str, param);
    },

    // TODO: analyze performance of parsing first vs checking
    // numeralMap first.
    parseNumber: function(str, param) {
      var val;

      // Simple numerals such as "one" are mapped directly in
      // the numeral map so catch up front if there is a match.
      if (hasOwn(this.numeralMap, str)) {
        val = this.numeralMap[str];
      }

      // TODO: perf test isNaN vs other methods
      if (isNaN(val)) {
        val = this.parseRegularNumerals(str);
      }

      if (isNaN(val)) {
        val = this.parseIrregularNumerals(str);
      }

      if (param === 'month') {
        // Months are the only numeric date field
        // whose value is not the same as its number.
        val -= 1;
      }

      return val;
    },

    // TODO: perf test returning up front if no regular decimals exist
    parseRegularNumerals: function(str) {
      // Allow decimals as commas and the minus-sign as per ISO-8601.
      str = str.replace(/^−/, '-').replace(/,/, '.');

      // The unary plus operator here shows better performance and handles
      // every format that parseFloat does with the exception of trailing
      // characters, which are guaranteed not to be in our string at this point.
      return +str;
    },

    parseIrregularNumerals: function(str) {
      var place = 1, num = 0, lastWasPlace, isPlace, numeral, digit, arr;

      // Note that "numerals" that need to be converted through this method are
      // all considered to be single characters in order to handle CJK. This
      // method is by no means unique to CJK, but the complexity of handling
      // inflections in non-CJK languages adds too much overhead for not enough
      // value, so avoiding for now.
      arr = str.split('');
      for (var i = arr.length - 1; numeral = arr[i]; i--) {
        digit = getOwn(this.numeralMap, numeral);
        if (isUndefined(digit)) {
          digit = getOwn(fullWidthNumberMap, numeral) || 0;
        }
        isPlace = digit > 0 && digit % 10 === 0;
        if (isPlace) {
          if (lastWasPlace) {
            num += place;
          }
          if (i) {
            place = digit;
          } else {
            num += digit;
          }
        } else {
          num += digit * place;
          place *= 10;
        }
        lastWasPlace = isPlace;
      }
      return num;
    },

    getOrdinal: function(n) {
      var suffix = this.ordinalSuffix;
      return suffix || getOrdinalSuffix(n);
    },

    getRelativeFormat: function(adu, type) {
      return this.convertAdjustedToFormat(adu, type);
    },

    getDuration: function(ms) {
      return this.convertAdjustedToFormat(getAdjustedUnitForNumber(max(0, ms)), 'duration');
    },

    getFirstDayOfWeek: function() {
      var val = this.firstDayOfWeek;
      return isDefined(val) ? val : ISO_FIRST_DAY_OF_WEEK;
    },

    getFirstDayOfWeekYear: function() {
      return this.firstDayOfWeekYear || ISO_FIRST_DAY_OF_WEEK_YEAR;
    },

    convertAdjustedToFormat: function(adu, type) {
      var sign, unit, mult,
          num    = adu[0],
          u      = adu[1],
          ms     = adu[2],
          format = this[type] || this.relative;
      if (isFunction(format)) {
        return format.call(this, num, u, ms, type);
      }
      mult = !this.plural || num === 1 ? 0 : 1;
      unit = this.units[mult * 8 + u] || this.units[u];
      sign = this[ms > 0 ? 'fromNow' : 'ago'];
      return format.replace(/\{(.*?)\}/g, function(full, match) {
        switch(match) {
          case 'num': return num;
          case 'unit': return unit;
          case 'sign': return sign;
        }
      });
    },

    cacheFormat: function(dif, i) {
      this.compiledFormats.splice(i, 1);
      this.compiledFormats.unshift(dif);
    },

    addFormat: function(format) {
      var loc = this, src, to;

      function getTokenSrc(token) {
        var suffix, src, tmp,
            opt   = token.match(/\?$/),
            nc    = token.match(/^(\d+)\??$/),
            slice = token.match(/(\d)(?:-(\d))?/),
            param = token.replace(/[^a-z]+$/i, '');

        // Allowing alias tokens such as {time}
        if (tmp = getOwn(loc.parsingAliases, param)) {
          src = formatToSrc(tmp);
          if (opt) {
            src = getRegNonCapturing(src, true);
          }
          return src;
        }

        if (nc) {
          src = loc.tokens[nc[1]];
        } else if (tmp = getOwn(CoreParsingTokens, param)) {
          src = tmp.src;
          param = tmp.param || param;
        } else {
          tmp = getOwn(loc.parsingTokens, param) || getOwn(loc, param);

          // Both the "months" array and the "month" parsing token can be accessed
          // by either {month} or {months}, falling back as necessary, however
          // regardless of whether or not a fallback occurs, the final field to
          // be passed to addRawFormat must be normalized as singular.
          param = param.replace(/s$/, '');

          if (!tmp) {
            tmp = getOwn(loc.parsingTokens, param) || getOwn(loc, param + 's');
          }

          if (isString(tmp)) {
            src = tmp;
            suffix = loc[param + 'Suffix'];
          } else {

            // This is a hack to temporarily disallow parsing of single character
            // weekdays until the format can be changed to allow for this.
            if (param === 'weekday' && loc.code === 'ko') {
              tmp = filter(tmp, function(str) {
                return str.length > 1;
              });
            }

            if (slice) {
              tmp = filter(tmp, function(m, i) {
                var mod = i % (loc.units ? 8 : tmp.length);
                return mod >= slice[1] && mod <= (slice[2] || slice[1]);
              });
            }
            src = arrayToRegAlternates(tmp);
          }
        }
        if (!src) {
          return '';
        }
        if (nc) {
          // Non-capturing tokens like {0}
          src = getRegNonCapturing(src);
        } else {
          // Capturing group and add to parsed tokens
          to.push(param);
          src = '(' + src + ')';
        }
        if (suffix) {
          // Date/time suffixes such as those in CJK
          src = getParsingTokenWithSuffix(param, src, suffix);
        }
        if (opt) {
          src += '?';
        }
        return src;
      }

      function formatToSrc(str) {

        // Make spaces optional
        str = str.replace(/ /g, ' ?');

        str = str.replace(/\{([^,]+?)\}/g, function(match, token) {
          var tokens = token.split('|');
          if (tokens.length > 1) {
            return getRegNonCapturing(map(tokens, getTokenSrc).join('|'));
          } else {
            return getTokenSrc(token);
          }
        });

        return str;
      }

      function parseInputFormat() {
        to = [];
        src = formatToSrc(format);
      }

      parseInputFormat();
      loc.addRawFormat(src, to);
    },

    addRawFormat: function(format, to) {
      this.compiledFormats.unshift({
        reg: RegExp('^ *' + format + ' *$', 'i'),
        to: to
      });
    },

    init: function(def) {
      var loc = this;

      // -- Initialization helpers

      function initFormats() {
        loc.compiledFormats = [];
        loc.parsingAliases = {};
        loc.parsingTokens = {};
      }

      function initDefinition() {
        simpleMerge(loc, def);
      }

      function initArrayFields() {
        forEach(LOCALE_ARRAY_FIELDS, function(name) {
          var val = loc[name];
          if (isString(val)) {
            loc[name] = commaSplit(val);
          } else if (!val) {
            loc[name] = [];
          }
        });
      }

      // -- Value array build helpers

      function buildValueArray(name, mod, map, fn) {
        var field = name, all = [], setMap;
        if (!loc[field]) {
          field += 's';
        }
        if (!map) {
          map = {};
          setMap = true;
        }
        forAllAlternates(field, function(alt, j, i) {
          var idx = j * mod + i, val;
          val = fn ? fn(i) : i;
          map[alt] = val;
          map[alt.toLowerCase()] = val;
          all[idx] = alt;
        });
        loc[field] = all;
        if (setMap) {
          loc[name + 'Map'] = map;
        }
      }

      function forAllAlternates(field, fn) {
        forEach(loc[field], function(str, i) {
          forEachAlternate(str, function(alt, j) {
            fn(alt, j, i);
          });
        });
      }

      function forEachAlternate(str, fn) {
        var arr = map(str.split('+'), function(split) {
          return split.replace(/(.+):(.+)$/, function(full, base, suffixes) {
            return map(suffixes.split('|'), function(suffix) {
              return base + suffix;
            }).join('|');
          });
        }).join('|');
        forEach(arr.split('|'), fn);
      }

      function buildNumerals() {
        var map = {};
        buildValueArray('numeral', 10, map);
        buildValueArray('article', 1, map, function() {
          return 1;
        });
        buildValueArray('placeholder', 4, map, function(n) {
          return pow(10, n + 1);
        });
        loc.numeralMap = map;
      }

      function buildTimeFormats() {
        loc.parsingAliases['time'] = getTimeFormat();
        loc.parsingAliases['tzOffset'] = getTZOffsetFormat();
      }

      function getTimeFormat(standalone) {
        var src, sep;
        sep = getTimeSeparatorSrc(standalone);
        if (loc.ampmFront) {
          // "ampmFront" exists mostly for CJK locales, which also presume that
          // time suffixes exist, allowing this to be a simpler regex.
          src = '{ampm?} {hour} (?:{minute} (?::?{second})?)?';
        } else if(loc.ampm.length) {
          src = '{hour}(?:'+sep+'{minute?}(?:'+sep+'{second?})? {ampm?}| {ampm})';
        } else {
          src = '{hour}(?:'+sep+'{minute?}(?:'+sep+'{second?})?)';
        }
        return src;
      }

      function getTimeSeparatorSrc() {
        if (loc.timeSeparator) {
          return '[:' + loc.timeSeparator + ']';
        } else {
          return ':';
        }
      }

      function getTZOffsetFormat() {
        return '(?:{Z}|{GMT?}(?:{tzHour}(?::?{tzMinute}(?: \\([\\w\\s]+\\))?)?)?)?';
      }

      function buildParsingTokens() {
        forEachProperty(LocalizedParsingTokens, function(token, name) {
          var src = token.base ? getCoreTokensForBase(token.base) : token.src, arr;
          if (token.requiresNumerals || loc.numeralUnits) {
            src += getNumeralSrc();
          }
          arr = loc[name + 's'];
          if (arr && arr.length) {
            src += '|' + arrayToRegAlternates(arr);
          }
          loc.parsingTokens[name] = src;
        });
      }

      function getCoreTokensForBase(base) {
        return map(base.split('|'), function(key) {
          return CoreParsingTokens[key].src;
        }).join('|');
      }

      function getNumeralSrc() {
        var all, src = '';
        all = loc.numerals.concat(loc.placeholders).concat(loc.articles);
        if (loc.allowsFullWidth) {
          all = all.concat(fullWidthNumbers.split(''));
        }
        if (all.length) {
          src = '|(?:' + arrayToRegAlternates(all) + ')+';
        }
        return src;
      }

      function buildTimeSuffixes() {
        iterateOverDateUnits(function(unit, i) {
          var token = loc.timeSuffixes[i];
          if (token) {
            loc[(unit.alias || unit.name) + 'Suffix'] = token;
          }
        });
      }

      function buildModifiers() {
        forEach(loc.modifiers, function(modifier) {
          var name = modifier.name, mapKey = name + 'Map', map;
          map = loc[mapKey] || {};
          forEachAlternate(modifier.src, function(alt, j) {
            var token = getOwn(loc.parsingTokens, name), val = modifier.value;
            map[alt] = val;
            loc.parsingTokens[name] = token ? token + '|' + alt : alt;
            if (modifier.name === 'sign' && j === 0) {
              // Hooking in here to set the first "fromNow" or "ago" modifier
              // directly on the locale, so that it can be reused in the
              // relative format.
              loc[val === 1 ? 'fromNow' : 'ago'] = alt;
            }
          });
          loc[mapKey] = map;
        });
      }

      // -- Format adding helpers

      function addCoreFormats() {
        forEach(CoreParsingFormats, function(df) {
          var src = df.src;
          if (df.localeCheck && !df.localeCheck(loc)) {
            return;
          }
          if (df.mdy && loc.mdy) {
            // Use the mm/dd/yyyy variant if it
            // exists and the locale requires it
            src = df.mdy;
          }
          if (df.time) {
            // Core formats that allow time require the time
            // reg on both sides, so add both versions here.
            loc.addFormat(getFormatWithTime(src, true));
            loc.addFormat(getFormatWithTime(src));
          } else {
            loc.addFormat(src);
          }
        });
        loc.addFormat('{time}');
      }

      function addLocaleFormats() {
        addFormatSet('parse');
        addFormatSet('timeParse', true);
        addFormatSet('timeFrontParse', true, true);
      }

      function addFormatSet(field, allowTime, timeFront) {
        forEach(loc[field], function(format) {
          if (allowTime) {
            format = getFormatWithTime(format, timeFront);
          }
          loc.addFormat(format);
        });
      }

      function getFormatWithTime(baseFormat, timeBefore) {
        if (timeBefore) {
          return getTimeBefore() + baseFormat;
        }
        return baseFormat + getTimeAfter();
      }

      function getTimeBefore() {
        return getRegNonCapturing('{time}[,\\s\\u3000]', true);
      }

      function getTimeAfter() {
        var markers = ',?[\\s\\u3000]', localized;
        localized = arrayToRegAlternates(loc.timeMarkers);
        if (localized) {
          markers += '| (?:' + localized + ') ';
        }
        markers = getRegNonCapturing(markers, loc.timeMarkerOptional);
        return getRegNonCapturing(markers + '{time}{tzOffset}', true);
      }

      initFormats();
      initDefinition();
      initArrayFields();

      buildValueArray('month', 12);
      buildValueArray('weekday', 7);
      buildValueArray('unit', 8);
      buildValueArray('ampm', 2);

      buildNumerals();
      buildTimeFormats();
      buildParsingTokens();
      buildTimeSuffixes();
      buildModifiers();

      // The order of these formats is important. Order is reversed so formats
      // that are initialized later will take precedence. Generally, this means
      // that more specific formats should come later.
      addCoreFormats();
      addLocaleFormats();

    }

  };

  return new Locale(def);
}

module.exports = getNewLocale;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getParsingTokenWithSuffix.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getParsingTokenWithSuffix.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocalizedParsingTokens = __webpack_require__(/*! ../var/LocalizedParsingTokens */ "./node_modules/sugar-date/date/var/LocalizedParsingTokens.js"),
    getRegNonCapturing = __webpack_require__(/*! ./getRegNonCapturing */ "./node_modules/sugar-date/date/internal/getRegNonCapturing.js");

function getParsingTokenWithSuffix(field, src, suffix) {
  var token = LocalizedParsingTokens[field];
  if (token.requiresSuffix) {
    src = getRegNonCapturing(src + getRegNonCapturing(suffix));
  } else if (token.requiresSuffixOr) {
    src += getRegNonCapturing(token.requiresSuffixOr + '|' + suffix);
  } else {
    src += getRegNonCapturing(suffix, true);
  }
  return src;
}

module.exports = getParsingTokenWithSuffix;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getRegNonCapturing.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getRegNonCapturing.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getRegNonCapturing(src, opt) {
  if (src.length > 1) {
    src = '(?:' + src + ')';
  }
  if (opt) {
    src += '?';
  }
  return src;
}

module.exports = getRegNonCapturing;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getTimeDistanceForUnit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getTimeDistanceForUnit.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trunc = __webpack_require__(/*! ../../common/var/trunc */ "./node_modules/sugar-date/common/var/trunc.js"),
    cloneDate = __webpack_require__(/*! ./cloneDate */ "./node_modules/sugar-date/date/internal/cloneDate.js"),
    advanceDate = __webpack_require__(/*! ./advanceDate */ "./node_modules/sugar-date/date/internal/advanceDate.js");

function getTimeDistanceForUnit(d1, d2, unit) {
  var fwd = d2 > d1, num, tmp;
  if (!fwd) {
    tmp = d2;
    d2  = d1;
    d1  = tmp;
  }
  num = d2 - d1;
  if (unit.multiplier > 1) {
    num = trunc(num / unit.multiplier);
  }
  // For higher order with potential ambiguity, use the numeric calculation
  // as a starting point, then iterate until we pass the target date. Decrement
  // starting point by 1 to prevent overshooting the date due to inconsistencies
  // in ambiguous units numerically. For example, calculating the number of days
  // from the beginning of the year to August 5th at 11:59:59 by doing a simple
  // d2 - d1 will produce different results depending on whether or not a
  // timezone shift was encountered due to DST, however that should not have an
  // effect on our calculation here, so subtract by 1 to ensure that the
  // starting point has not already overshot our target date.
  if (unit.ambiguous) {
    d1 = cloneDate(d1);
    if (num) {
      num -= 1;
      advanceDate(d1, unit.name, num);
    }
    while (d1 < d2) {
      advanceDate(d1, unit.name, 1);
      if (d1 > d2) {
        break;
      }
      num += 1;
    }
  }
  return fwd ? -num : num;
}

module.exports = getTimeDistanceForUnit;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getUTCOffset.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getUTCOffset.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utc = __webpack_require__(/*! ../../common/var/_utc */ "./node_modules/sugar-date/common/var/_utc.js"),
    trunc = __webpack_require__(/*! ../../common/var/trunc */ "./node_modules/sugar-date/common/var/trunc.js"),
    tzOffset = __webpack_require__(/*! ./tzOffset */ "./node_modules/sugar-date/date/internal/tzOffset.js"),
    padNumber = __webpack_require__(/*! ../../common/internal/padNumber */ "./node_modules/sugar-date/common/internal/padNumber.js"),
    mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js");

var abs = mathAliases.abs;

function getUTCOffset(d, iso) {
  var offset = _utc(d) ? 0 : tzOffset(d), hours, mins, colon;
  colon  = iso === true ? ':' : '';
  if (!offset && iso) return 'Z';
  hours = padNumber(trunc(-offset / 60), 2, true);
  mins = padNumber(abs(offset % 60), 2);
  return  hours + colon + mins;
}

module.exports = getUTCOffset;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getUnitIndexForParamName.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getUnitIndexForParamName.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var iterateOverDateParams = __webpack_require__(/*! ./iterateOverDateParams */ "./node_modules/sugar-date/date/internal/iterateOverDateParams.js");

function getUnitIndexForParamName(name) {
  var params = {}, unitIndex;
  params[name] = 1;
  iterateOverDateParams(params, function(name, val, unit, i) {
    unitIndex = i;
    return false;
  });
  return unitIndex;
}

module.exports = getUnitIndexForParamName;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getWeekNumber.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getWeekNumber.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ISODefaults = __webpack_require__(/*! ../var/ISODefaults */ "./node_modules/sugar-date/date/var/ISODefaults.js"),
    setDate = __webpack_require__(/*! ./setDate */ "./node_modules/sugar-date/date/internal/setDate.js"),
    getDate = __webpack_require__(/*! ./getDate */ "./node_modules/sugar-date/date/internal/getDate.js"),
    cloneDate = __webpack_require__(/*! ./cloneDate */ "./node_modules/sugar-date/date/internal/cloneDate.js"),
    isUndefined = __webpack_require__(/*! ../../common/internal/isUndefined */ "./node_modules/sugar-date/common/internal/isUndefined.js"),
    moveToEndOfWeek = __webpack_require__(/*! ./moveToEndOfWeek */ "./node_modules/sugar-date/date/internal/moveToEndOfWeek.js"),
    moveToBeginningOfWeek = __webpack_require__(/*! ./moveToBeginningOfWeek */ "./node_modules/sugar-date/date/internal/moveToBeginningOfWeek.js"),
    moveToFirstDayOfWeekYear = __webpack_require__(/*! ./moveToFirstDayOfWeekYear */ "./node_modules/sugar-date/date/internal/moveToFirstDayOfWeekYear.js");

var ISO_FIRST_DAY_OF_WEEK = ISODefaults.ISO_FIRST_DAY_OF_WEEK,
    ISO_FIRST_DAY_OF_WEEK_YEAR = ISODefaults.ISO_FIRST_DAY_OF_WEEK_YEAR;

function getWeekNumber(d, allowPrevious, firstDayOfWeek, firstDayOfWeekYear) {
  var isoWeek, n = 0;
  if (isUndefined(firstDayOfWeek)) {
    firstDayOfWeek = ISO_FIRST_DAY_OF_WEEK;
  }
  if (isUndefined(firstDayOfWeekYear)) {
    firstDayOfWeekYear = ISO_FIRST_DAY_OF_WEEK_YEAR;
  }
  // Moving to the end of the week allows for forward year traversal, ie
  // Dec 29 2014 is actually week 01 of 2015.
  isoWeek = moveToEndOfWeek(cloneDate(d), firstDayOfWeek);
  moveToFirstDayOfWeekYear(isoWeek, firstDayOfWeek, firstDayOfWeekYear);
  if (allowPrevious && d < isoWeek) {
    // If the date is still before the start of the year, then it should be
    // the last week of the previous year, ie Jan 1 2016 is actually week 53
    // of 2015, so move to the beginning of the week to traverse the year.
    isoWeek = moveToBeginningOfWeek(cloneDate(d), firstDayOfWeek);
    moveToFirstDayOfWeekYear(isoWeek, firstDayOfWeek, firstDayOfWeekYear);
  }
  while (isoWeek <= d) {
    // Doing a very simple walk to get the week number.
    setDate(isoWeek, getDate(isoWeek) + 7);
    n++;
  }
  return n;
}

module.exports = getWeekNumber;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getWeekYear.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getWeekYear.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(/*! ../var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    getYear = __webpack_require__(/*! ./getYear */ "./node_modules/sugar-date/date/internal/getYear.js"),
    getMonth = __webpack_require__(/*! ./getMonth */ "./node_modules/sugar-date/date/internal/getMonth.js"),
    getWeekNumber = __webpack_require__(/*! ./getWeekNumber */ "./node_modules/sugar-date/date/internal/getWeekNumber.js");

var localeManager = LocaleHelpers.localeManager;

function getWeekYear(d, localeCode, iso) {
  var year, month, firstDayOfWeek, firstDayOfWeekYear, week, loc;
  year = getYear(d);
  month = getMonth(d);
  if (month === 0 || month === 11) {
    if (!iso) {
      loc = localeManager.get(localeCode);
      firstDayOfWeek = loc.getFirstDayOfWeek(localeCode);
      firstDayOfWeekYear = loc.getFirstDayOfWeekYear(localeCode);
    }
    week = getWeekNumber(d, false, firstDayOfWeek, firstDayOfWeekYear);
    if (month === 0 && week === 0) {
      year -= 1;
    } else if (month === 11 && week === 1) {
      year += 1;
    }
  }
  return year;
}

module.exports = getWeekYear;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getWeekday.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getWeekday.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateGet = __webpack_require__(/*! ../../common/internal/callDateGet */ "./node_modules/sugar-date/common/internal/callDateGet.js");

function getWeekday(d) {
  return callDateGet(d, 'Day');
}

module.exports = getWeekday;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getYear.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getYear.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateGet = __webpack_require__(/*! ../../common/internal/callDateGet */ "./node_modules/sugar-date/common/internal/callDateGet.js");

function getYear(d) {
  return callDateGet(d, 'FullYear');
}

module.exports = getYear;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/getYearFromAbbreviation.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/getYearFromAbbreviation.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getYear = __webpack_require__(/*! ./getYear */ "./node_modules/sugar-date/date/internal/getYear.js"),
    mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js");

var abs = mathAliases.abs;

function getYearFromAbbreviation(str, d, prefer) {
  // Following IETF here, adding 1900 or 2000 depending on the last two digits.
  // Note that this makes no accordance for what should happen after 2050, but
  // intentionally ignoring this for now. https://www.ietf.org/rfc/rfc2822.txt
  var val = +str, delta;
  val += val < 50 ? 2000 : 1900;
  if (prefer) {
    delta = val - getYear(d);
    if (delta / abs(delta) !== prefer) {
      val += prefer * 100;
    }
  }
  return val;
}

module.exports = getYearFromAbbreviation;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/isUTC.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/isUTC.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utc = __webpack_require__(/*! ../../common/var/_utc */ "./node_modules/sugar-date/common/var/_utc.js"),
    tzOffset = __webpack_require__(/*! ./tzOffset */ "./node_modules/sugar-date/date/internal/tzOffset.js");

function isUTC(d) {
  return !!_utc(d) || tzOffset(d) === 0;
}

module.exports = isUTC;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/iterateOverDateParams.js":
/*!************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/iterateOverDateParams.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    isDefined = __webpack_require__(/*! ../../common/internal/isDefined */ "./node_modules/sugar-date/common/internal/isDefined.js"),
    getDateParam = __webpack_require__(/*! ./getDateParam */ "./node_modules/sugar-date/date/internal/getDateParam.js"),
    iterateOverDateUnits = __webpack_require__(/*! ./iterateOverDateUnits */ "./node_modules/sugar-date/date/internal/iterateOverDateUnits.js");

var DAY_INDEX = DateUnitIndexes.DAY_INDEX;

function iterateOverDateParams(params, fn, startIndex, endIndex) {

  function run(name, unit, i) {
    var val = getDateParam(params, name);
    if (isDefined(val)) {
      fn(name, val, unit, i);
    }
  }

  iterateOverDateUnits(function (unit, i) {
    var result = run(unit.name, unit, i);
    if (result !== false && i === DAY_INDEX) {
      // Check for "weekday", which has a distinct meaning
      // in the context of setting a date, but has the same
      // meaning as "day" as a unit of time.
      result = run('weekday', unit, i);
    }
    return result;
  }, startIndex, endIndex);

}

module.exports = iterateOverDateParams;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/iterateOverDateUnits.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/iterateOverDateUnits.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(/*! ../var/DateUnits */ "./node_modules/sugar-date/date/var/DateUnits.js"),
    DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    isUndefined = __webpack_require__(/*! ../../common/internal/isUndefined */ "./node_modules/sugar-date/common/internal/isUndefined.js");

var YEAR_INDEX = DateUnitIndexes.YEAR_INDEX;

function iterateOverDateUnits(fn, startIndex, endIndex) {
  endIndex = endIndex || 0;
  if (isUndefined(startIndex)) {
    startIndex = YEAR_INDEX;
  }
  for (var index = startIndex; index >= endIndex; index--) {
    if (fn(DateUnits[index], index) === false) {
      break;
    }
  }
}

module.exports = iterateOverDateUnits;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/iterateOverHigherDateParams.js":
/*!******************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/iterateOverHigherDateParams.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    iterateOverDateParams = __webpack_require__(/*! ./iterateOverDateParams */ "./node_modules/sugar-date/date/internal/iterateOverDateParams.js");

var DAY_INDEX = DateUnitIndexes.DAY_INDEX,
    YEAR_INDEX = DateUnitIndexes.YEAR_INDEX;

function iterateOverHigherDateParams(params, fn) {
  iterateOverDateParams(params, fn, YEAR_INDEX, DAY_INDEX);
}

module.exports = iterateOverHigherDateParams;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/moveToBeginningOfUnit.js":
/*!************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/moveToBeginningOfUnit.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(/*! ../var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    getLowerUnitIndex = __webpack_require__(/*! ./getLowerUnitIndex */ "./node_modules/sugar-date/date/internal/getLowerUnitIndex.js"),
    moveToBeginningOfWeek = __webpack_require__(/*! ./moveToBeginningOfWeek */ "./node_modules/sugar-date/date/internal/moveToBeginningOfWeek.js"),
    setUnitAndLowerToEdge = __webpack_require__(/*! ./setUnitAndLowerToEdge */ "./node_modules/sugar-date/date/internal/setUnitAndLowerToEdge.js");

var WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
    localeManager = LocaleHelpers.localeManager;

function moveToBeginningOfUnit(d, unitIndex, localeCode) {
  if (unitIndex === WEEK_INDEX) {
    moveToBeginningOfWeek(d, localeManager.get(localeCode).getFirstDayOfWeek());
  }
  return setUnitAndLowerToEdge(d, getLowerUnitIndex(unitIndex));
}

module.exports = moveToBeginningOfUnit;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/moveToBeginningOfWeek.js":
/*!************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/moveToBeginningOfWeek.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setWeekday = __webpack_require__(/*! ./setWeekday */ "./node_modules/sugar-date/date/internal/setWeekday.js"),
    getWeekday = __webpack_require__(/*! ./getWeekday */ "./node_modules/sugar-date/date/internal/getWeekday.js"),
    mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js");

var floor = mathAliases.floor;

function moveToBeginningOfWeek(d, firstDayOfWeek) {
  setWeekday(d, floor((getWeekday(d) - firstDayOfWeek) / 7) * 7 + firstDayOfWeek);
  return d;
}

module.exports = moveToBeginningOfWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/moveToEndOfUnit.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/moveToEndOfUnit.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(/*! ../var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    moveToEndOfWeek = __webpack_require__(/*! ./moveToEndOfWeek */ "./node_modules/sugar-date/date/internal/moveToEndOfWeek.js"),
    getLowerUnitIndex = __webpack_require__(/*! ./getLowerUnitIndex */ "./node_modules/sugar-date/date/internal/getLowerUnitIndex.js"),
    setUnitAndLowerToEdge = __webpack_require__(/*! ./setUnitAndLowerToEdge */ "./node_modules/sugar-date/date/internal/setUnitAndLowerToEdge.js");

var WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
    localeManager = LocaleHelpers.localeManager;

function moveToEndOfUnit(d, unitIndex, localeCode, stopIndex) {
  if (unitIndex === WEEK_INDEX) {
    moveToEndOfWeek(d, localeManager.get(localeCode).getFirstDayOfWeek());
  }
  return setUnitAndLowerToEdge(d, getLowerUnitIndex(unitIndex), stopIndex, true);
}

module.exports = moveToEndOfUnit;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/moveToEndOfWeek.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/moveToEndOfWeek.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setWeekday = __webpack_require__(/*! ./setWeekday */ "./node_modules/sugar-date/date/internal/setWeekday.js"),
    getWeekday = __webpack_require__(/*! ./getWeekday */ "./node_modules/sugar-date/date/internal/getWeekday.js"),
    mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js");

var ceil = mathAliases.ceil;

function moveToEndOfWeek(d, firstDayOfWeek) {
  var target = firstDayOfWeek - 1;
  setWeekday(d, ceil((getWeekday(d) - target) / 7) * 7 + target);
  return d;
}

module.exports = moveToEndOfWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/moveToFirstDayOfWeekYear.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/moveToFirstDayOfWeekYear.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    setDate = __webpack_require__(/*! ./setDate */ "./node_modules/sugar-date/date/internal/setDate.js"),
    setUnitAndLowerToEdge = __webpack_require__(/*! ./setUnitAndLowerToEdge */ "./node_modules/sugar-date/date/internal/setUnitAndLowerToEdge.js"),
    moveToBeginningOfWeek = __webpack_require__(/*! ./moveToBeginningOfWeek */ "./node_modules/sugar-date/date/internal/moveToBeginningOfWeek.js");

var MONTH_INDEX = DateUnitIndexes.MONTH_INDEX;

function moveToFirstDayOfWeekYear(d, firstDayOfWeek, firstDayOfWeekYear) {
  setUnitAndLowerToEdge(d, MONTH_INDEX);
  setDate(d, firstDayOfWeekYear);
  moveToBeginningOfWeek(d, firstDayOfWeek);
}

module.exports = moveToFirstDayOfWeekYear;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/resetLowerUnits.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/resetLowerUnits.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getLowerUnitIndex = __webpack_require__(/*! ./getLowerUnitIndex */ "./node_modules/sugar-date/date/internal/getLowerUnitIndex.js"),
    setUnitAndLowerToEdge = __webpack_require__(/*! ./setUnitAndLowerToEdge */ "./node_modules/sugar-date/date/internal/setUnitAndLowerToEdge.js");

function resetLowerUnits(d, unitIndex) {
  return setUnitAndLowerToEdge(d, getLowerUnitIndex(unitIndex));
}

module.exports = resetLowerUnits;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/resetTime.js":
/*!************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/resetTime.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    setUnitAndLowerToEdge = __webpack_require__(/*! ./setUnitAndLowerToEdge */ "./node_modules/sugar-date/date/internal/setUnitAndLowerToEdge.js");

var HOURS_INDEX = DateUnitIndexes.HOURS_INDEX;

function resetTime(d) {
  return setUnitAndLowerToEdge(d, HOURS_INDEX);
}

module.exports = resetTime;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/setDate.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/setDate.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateSet = __webpack_require__(/*! ../../common/internal/callDateSet */ "./node_modules/sugar-date/common/internal/callDateSet.js");

function setDate(d, val) {
  callDateSet(d, 'Date', val);
}

module.exports = setDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/setDateChainableConstructor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/setDateChainableConstructor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createDate = __webpack_require__(/*! ./createDate */ "./node_modules/sugar-date/date/internal/createDate.js"),
    namespaceAliases = __webpack_require__(/*! ../../common/var/namespaceAliases */ "./node_modules/sugar-date/common/var/namespaceAliases.js"),
    setChainableConstructor = __webpack_require__(/*! ../../common/internal/setChainableConstructor */ "./node_modules/sugar-date/common/internal/setChainableConstructor.js");

var sugarDate = namespaceAliases.sugarDate;

function setDateChainableConstructor() {
  setChainableConstructor(sugarDate, createDate);
}

module.exports = setDateChainableConstructor;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/setISOWeekNumber.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/setISOWeekNumber.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ISODefaults = __webpack_require__(/*! ../var/ISODefaults */ "./node_modules/sugar-date/date/var/ISODefaults.js"),
    getDate = __webpack_require__(/*! ./getDate */ "./node_modules/sugar-date/date/internal/getDate.js"),
    setDate = __webpack_require__(/*! ./setDate */ "./node_modules/sugar-date/date/internal/setDate.js"),
    setYear = __webpack_require__(/*! ./setYear */ "./node_modules/sugar-date/date/internal/setYear.js"),
    getYear = __webpack_require__(/*! ./getYear */ "./node_modules/sugar-date/date/internal/getYear.js"),
    getMonth = __webpack_require__(/*! ./getMonth */ "./node_modules/sugar-date/date/internal/getMonth.js"),
    setMonth = __webpack_require__(/*! ./setMonth */ "./node_modules/sugar-date/date/internal/setMonth.js"),
    cloneDate = __webpack_require__(/*! ./cloneDate */ "./node_modules/sugar-date/date/internal/cloneDate.js"),
    getWeekday = __webpack_require__(/*! ./getWeekday */ "./node_modules/sugar-date/date/internal/getWeekday.js"),
    setWeekday = __webpack_require__(/*! ./setWeekday */ "./node_modules/sugar-date/date/internal/setWeekday.js"),
    classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    moveToFirstDayOfWeekYear = __webpack_require__(/*! ./moveToFirstDayOfWeekYear */ "./node_modules/sugar-date/date/internal/moveToFirstDayOfWeekYear.js");

var isNumber = classChecks.isNumber,
    ISO_FIRST_DAY_OF_WEEK = ISODefaults.ISO_FIRST_DAY_OF_WEEK,
    ISO_FIRST_DAY_OF_WEEK_YEAR = ISODefaults.ISO_FIRST_DAY_OF_WEEK_YEAR;

function setISOWeekNumber(d, num) {
  if (isNumber(num)) {
    // Intentionally avoiding updateDate here to prevent circular dependencies.
    var isoWeek = cloneDate(d), dow = getWeekday(d);
    moveToFirstDayOfWeekYear(isoWeek, ISO_FIRST_DAY_OF_WEEK, ISO_FIRST_DAY_OF_WEEK_YEAR);
    setDate(isoWeek, getDate(isoWeek) + 7 * (num - 1));
    setYear(d, getYear(isoWeek));
    setMonth(d, getMonth(isoWeek));
    setDate(d, getDate(isoWeek));
    setWeekday(d, dow || 7);
  }
  return d.getTime();
}

module.exports = setISOWeekNumber;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/setMonth.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/setMonth.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateSet = __webpack_require__(/*! ../../common/internal/callDateSet */ "./node_modules/sugar-date/common/internal/callDateSet.js");

function setMonth(d, val) {
  callDateSet(d, 'Month', val);
}

module.exports = setMonth;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/setUnitAndLowerToEdge.js":
/*!************************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/setUnitAndLowerToEdge.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isDefined = __webpack_require__(/*! ../../common/internal/isDefined */ "./node_modules/sugar-date/common/internal/isDefined.js"),
    classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    callDateSet = __webpack_require__(/*! ../../common/internal/callDateSet */ "./node_modules/sugar-date/common/internal/callDateSet.js"),
    walkUnitDown = __webpack_require__(/*! ./walkUnitDown */ "./node_modules/sugar-date/date/internal/walkUnitDown.js");

var isFunction = classChecks.isFunction;

function setUnitAndLowerToEdge(d, startIndex, stopIndex, end) {
  walkUnitDown(startIndex, function(unit, i) {
    var val = end ? unit.end : unit.start;
    if (isFunction(val)) {
      val = val(d);
    }
    callDateSet(d, unit.method, val);
    return !isDefined(stopIndex) || i > stopIndex;
  });
  return d;
}

module.exports = setUnitAndLowerToEdge;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/setWeekday.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/setWeekday.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setDate = __webpack_require__(/*! ./setDate */ "./node_modules/sugar-date/date/internal/setDate.js"),
    getDate = __webpack_require__(/*! ./getDate */ "./node_modules/sugar-date/date/internal/getDate.js"),
    getWeekday = __webpack_require__(/*! ./getWeekday */ "./node_modules/sugar-date/date/internal/getWeekday.js"),
    classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js");

var isNumber = classChecks.isNumber,
    abs = mathAliases.abs;

function setWeekday(d, dow, dir) {
  if (!isNumber(dow)) return;
  var currentWeekday = getWeekday(d);
  if (dir) {
    // Allow a "direction" parameter to determine whether a weekday can
    // be set beyond the current weekday in either direction.
    var ndir = dir > 0 ? 1 : -1;
    var offset = dow % 7 - currentWeekday;
    if (offset && offset / abs(offset) !== ndir) {
      dow += 7 * ndir;
    }
  }
  setDate(d, getDate(d) + dow - currentWeekday);
  return d.getTime();
}

module.exports = setWeekday;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/setYear.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/setYear.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateSet = __webpack_require__(/*! ../../common/internal/callDateSet */ "./node_modules/sugar-date/common/internal/callDateSet.js");

function setYear(d, val) {
  callDateSet(d, 'FullYear', val);
}

module.exports = setYear;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/tzOffset.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/tzOffset.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function tzOffset(d) {
  return d.getTimezoneOffset();
}

module.exports = tzOffset;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/updateDate.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/updateDate.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(/*! ../var/DateUnits */ "./node_modules/sugar-date/date/var/DateUnits.js"),
    DateUnitIndexes = __webpack_require__(/*! ../var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    trunc = __webpack_require__(/*! ../../common/var/trunc */ "./node_modules/sugar-date/common/var/trunc.js"),
    setDate = __webpack_require__(/*! ./setDate */ "./node_modules/sugar-date/date/internal/setDate.js"),
    getDate = __webpack_require__(/*! ./getDate */ "./node_modules/sugar-date/date/internal/getDate.js"),
    getMonth = __webpack_require__(/*! ./getMonth */ "./node_modules/sugar-date/date/internal/getMonth.js"),
    getNewDate = __webpack_require__(/*! ./getNewDate */ "./node_modules/sugar-date/date/internal/getNewDate.js"),
    setWeekday = __webpack_require__(/*! ./setWeekday */ "./node_modules/sugar-date/date/internal/setWeekday.js"),
    mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js"),
    callDateGet = __webpack_require__(/*! ../../common/internal/callDateGet */ "./node_modules/sugar-date/common/internal/callDateGet.js"),
    classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    resetLowerUnits = __webpack_require__(/*! ./resetLowerUnits */ "./node_modules/sugar-date/date/internal/resetLowerUnits.js"),
    getLowerUnitIndex = __webpack_require__(/*! ./getLowerUnitIndex */ "./node_modules/sugar-date/date/internal/getLowerUnitIndex.js"),
    getHigherUnitIndex = __webpack_require__(/*! ./getHigherUnitIndex */ "./node_modules/sugar-date/date/internal/getHigherUnitIndex.js"),
    callDateSetWithWeek = __webpack_require__(/*! ./callDateSetWithWeek */ "./node_modules/sugar-date/date/internal/callDateSetWithWeek.js"),
    iterateOverDateParams = __webpack_require__(/*! ./iterateOverDateParams */ "./node_modules/sugar-date/date/internal/iterateOverDateParams.js");

var DAY_INDEX = DateUnitIndexes.DAY_INDEX,
    WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX,
    YEAR_INDEX = DateUnitIndexes.YEAR_INDEX,
    round = mathAliases.round,
    isNumber = classChecks.isNumber;

function updateDate(d, params, reset, advance, prefer, weekdayDir, contextDate) {
  var upperUnitIndex;

  function setUpperUnit(unitName, unitIndex) {
    if (prefer && !upperUnitIndex) {
      if (unitName === 'weekday') {
        upperUnitIndex = WEEK_INDEX;
      } else {
        upperUnitIndex = getHigherUnitIndex(unitIndex);
      }
    }
  }

  function setSpecificity(unitIndex) {
    // Other functions may preemptively set the specificity before arriving
    // here so concede to them if they have already set more specific units.
    if (unitIndex > params.specificity) {
      return;
    }
    params.specificity = unitIndex;
  }

  function canDisambiguate() {
    if (!upperUnitIndex || upperUnitIndex > YEAR_INDEX) {
      return;
    }

    switch(prefer) {
      case -1: return d >= (contextDate || getNewDate());
      case  1: return d <= (contextDate || getNewDate());
    }
  }

  function disambiguateHigherUnit() {
    var unit = DateUnits[upperUnitIndex];
    advance = prefer;
    setUnit(unit.name, 1, unit, upperUnitIndex);
  }

  function handleFraction(unit, unitIndex, fraction) {
    if (unitIndex) {
      var lowerUnit = DateUnits[getLowerUnitIndex(unitIndex)];
      var val = round(unit.multiplier / lowerUnit.multiplier * fraction);
      params[lowerUnit.name] = val;
    }
  }

  function monthHasShifted(d, targetMonth) {
    if (targetMonth < 0) {
      targetMonth = targetMonth % 12 + 12;
    }
    return targetMonth % 12 !== getMonth(d);
  }

  function setUnit(unitName, value, unit, unitIndex) {
    var method = unit.method, checkMonth, fraction;

    setUpperUnit(unitName, unitIndex);
    setSpecificity(unitIndex);

    fraction = value % 1;
    if (fraction) {
      handleFraction(unit, unitIndex, fraction);
      value = trunc(value);
    }

    if (unitName === 'weekday') {
      if (!advance) {
        // Weekdays are always considered absolute units so simply set them
        // here even if it is an "advance" operation. This is to help avoid
        // ambiguous meanings in "advance" as well as to neatly allow formats
        // like "Wednesday of next week" without more complex logic.
        setWeekday(d, value, weekdayDir);
      }
      return;
    }
    checkMonth = unitIndex === MONTH_INDEX && getDate(d) > 28;

    // If we are advancing or rewinding, then we need we need to set the
    // absolute time if the unit is "hours" or less. This is due to the fact
    // that setting by method is ambiguous during DST shifts. For example,
    // 1:00am on November 1st 2015 occurs twice in North American timezones
    // with DST, the second time being after the clocks are rolled back at
    // 2:00am. When springing forward this is automatically handled as there
    // is no 2:00am so the date automatically jumps to 3:00am. However, when
    // rolling back, setHours(2) will always choose the first "2am" even if
    // the date is currently set to the second, causing unintended jumps.
    // This ambiguity is unavoidable when setting dates as the notation is
    // ambiguous. However when advancing, we clearly want the resulting date
    // to be an acutal hour ahead, which can only be accomplished by setting
    // the absolute time. Conversely, any unit higher than "hours" MUST use
    // the internal set methods, as they are ambiguous as absolute units of
    // time. Years may be 365 or 366 days depending on leap years, months are
    // all over the place, and even days may be 23-25 hours depending on DST
    // shifts. Finally, note that the kind of jumping described above will
    // occur when calling ANY "set" method on the date and will occur even if
    // the value being set is identical to the one currently set (i.e.
    // setHours(2) on a date at 2am may not be a noop). This is precarious,
    // so avoiding this situation in callDateSet by checking up front that
    // the value is not the same before setting.
    if (advance && !unit.ambiguous) {
      d.setTime(d.getTime() + (value * advance * unit.multiplier));
      return;
    } else if (advance) {
      if (unitIndex === WEEK_INDEX) {
        value *= 7;
        method = DateUnits[DAY_INDEX].method;
      }
      value = (value * advance) + callDateGet(d, method);
    }
    callDateSetWithWeek(d, method, value, advance);
    if (checkMonth && monthHasShifted(d, value)) {
      // As we are setting the units in reverse order, there is a chance that
      // our date may accidentally traverse into a new month, such as setting
      // { month: 1, date 15 } on January 31st. Check for this here and reset
      // the date to the last day of the previous month if this has happened.
      setDate(d, 0);
    }
  }

  if (isNumber(params) && advance) {
    // If param is a number and advancing, the number is in milliseconds.
    params = { millisecond: params };
  } else if (isNumber(params)) {
    // Otherwise just set the timestamp and return.
    d.setTime(params);
    return d;
  }

  iterateOverDateParams(params, setUnit);

  if (reset && params.specificity) {
    resetLowerUnits(d, params.specificity);
  }

  // If past or future is preferred, then the process of "disambiguation" will
  // ensure that an ambiguous time/date ("4pm", "thursday", "June", etc.) will
  // be in the past or future. Weeks are only considered ambiguous if there is
  // a weekday, i.e. "thursday" is an ambiguous week, but "the 4th" is an
  // ambiguous month.
  if (canDisambiguate()) {
    disambiguateHigherUnit();
  }
  return d;
}

module.exports = updateDate;

/***/ }),

/***/ "./node_modules/sugar-date/date/internal/walkUnitDown.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/date/internal/walkUnitDown.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(/*! ../var/DateUnits */ "./node_modules/sugar-date/date/var/DateUnits.js"),
    getLowerUnitIndex = __webpack_require__(/*! ./getLowerUnitIndex */ "./node_modules/sugar-date/date/internal/getLowerUnitIndex.js");

function walkUnitDown(unitIndex, fn) {
  while (unitIndex >= 0) {
    if (fn(DateUnits[unitIndex], unitIndex) === false) {
      break;
    }
    unitIndex = getLowerUnitIndex(unitIndex);
  }
}

module.exports = walkUnitDown;

/***/ }),

/***/ "./node_modules/sugar-date/date/is.js":
/*!********************************************!*\
  !*** ./node_modules/sugar-date/date/is.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    fullCompareDate = __webpack_require__(/*! ./internal/fullCompareDate */ "./node_modules/sugar-date/date/internal/fullCompareDate.js");

Sugar.Date.defineInstance({

  'is': function(date, d, margin) {
    return fullCompareDate(date, d, margin);
  }

});

module.exports = Sugar.Date.is;

/***/ }),

/***/ "./node_modules/sugar-date/date/isAfter.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/date/isAfter.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    createDate = __webpack_require__(/*! ./internal/createDate */ "./node_modules/sugar-date/date/internal/createDate.js");

Sugar.Date.defineInstance({

  'isAfter': function(date, d, margin) {
    return date.getTime() > createDate(d).getTime() - (margin || 0);
  }

});

module.exports = Sugar.Date.isAfter;

/***/ }),

/***/ "./node_modules/sugar-date/date/isBefore.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/isBefore.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    createDate = __webpack_require__(/*! ./internal/createDate */ "./node_modules/sugar-date/date/internal/createDate.js");

Sugar.Date.defineInstance({

  'isBefore': function(date, d, margin) {
    return date.getTime() < createDate(d).getTime() + (margin || 0);
  }

});

module.exports = Sugar.Date.isBefore;

/***/ }),

/***/ "./node_modules/sugar-date/date/isBetween.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/isBetween.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    createDate = __webpack_require__(/*! ./internal/createDate */ "./node_modules/sugar-date/date/internal/createDate.js"),
    mathAliases = __webpack_require__(/*! ../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js");

var min = mathAliases.min,
    max = mathAliases.max;

Sugar.Date.defineInstance({

  'isBetween': function(date, d1, d2, margin) {
    var t  = date.getTime();
    var t1 = createDate(d1).getTime();
    var t2 = createDate(d2).getTime();
    var lo = min(t1, t2);
    var hi = max(t1, t2);
    margin = margin || 0;
    return (lo - margin <= t) && (hi + margin >= t);
  }

});

module.exports = Sugar.Date.isBetween;

/***/ }),

/***/ "./node_modules/sugar-date/date/isFriday.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/isFriday.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isFriday;

/***/ }),

/***/ "./node_modules/sugar-date/date/isFuture.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/isFuture.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isFuture;

/***/ }),

/***/ "./node_modules/sugar-date/date/isLastMonth.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/date/isLastMonth.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.isLastMonth;

/***/ }),

/***/ "./node_modules/sugar-date/date/isLastWeek.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/isLastWeek.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.isLastWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/isLastYear.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/isLastYear.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.isLastYear;

/***/ }),

/***/ "./node_modules/sugar-date/date/isLeapYear.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/isLeapYear.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    getYear = __webpack_require__(/*! ./internal/getYear */ "./node_modules/sugar-date/date/internal/getYear.js");

Sugar.Date.defineInstance({

  'isLeapYear': function(date) {
    var year = getYear(date);
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

});

module.exports = Sugar.Date.isLeapYear;

/***/ }),

/***/ "./node_modules/sugar-date/date/isMonday.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/isMonday.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isMonday;

/***/ }),

/***/ "./node_modules/sugar-date/date/isNextMonth.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/date/isNextMonth.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.isNextMonth;

/***/ }),

/***/ "./node_modules/sugar-date/date/isNextWeek.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/isNextWeek.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.isNextWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/isNextYear.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/isNextYear.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.isNextYear;

/***/ }),

/***/ "./node_modules/sugar-date/date/isPast.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/date/isPast.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isPast;

/***/ }),

/***/ "./node_modules/sugar-date/date/isSaturday.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/isSaturday.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isSaturday;

/***/ }),

/***/ "./node_modules/sugar-date/date/isSunday.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/isSunday.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isSunday;

/***/ }),

/***/ "./node_modules/sugar-date/date/isThisMonth.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/date/isThisMonth.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.isThisMonth;

/***/ }),

/***/ "./node_modules/sugar-date/date/isThisWeek.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/isThisWeek.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.isThisWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/isThisYear.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/isThisYear.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.isThisYear;

/***/ }),

/***/ "./node_modules/sugar-date/date/isThursday.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/isThursday.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isThursday;

/***/ }),

/***/ "./node_modules/sugar-date/date/isToday.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/date/isToday.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isToday;

/***/ }),

/***/ "./node_modules/sugar-date/date/isTomorrow.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/isTomorrow.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isTomorrow;

/***/ }),

/***/ "./node_modules/sugar-date/date/isTuesday.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/isTuesday.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isTuesday;

/***/ }),

/***/ "./node_modules/sugar-date/date/isUTC.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/date/isUTC.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    isUTC = __webpack_require__(/*! ./internal/isUTC */ "./node_modules/sugar-date/date/internal/isUTC.js");

Sugar.Date.defineInstance({

  'isUTC': function(date) {
    return isUTC(date);
  }

});

module.exports = Sugar.Date.isUTC;

/***/ }),

/***/ "./node_modules/sugar-date/date/isValid.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/date/isValid.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    dateIsValid = __webpack_require__(/*! ./internal/dateIsValid */ "./node_modules/sugar-date/date/internal/dateIsValid.js");

Sugar.Date.defineInstance({

  'isValid': function(date) {
    return dateIsValid(date);
  }

});

module.exports = Sugar.Date.isValid;

/***/ }),

/***/ "./node_modules/sugar-date/date/isWednesday.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/date/isWednesday.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isWednesday;

/***/ }),

/***/ "./node_modules/sugar-date/date/isWeekday.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/isWeekday.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isWeekday;

/***/ }),

/***/ "./node_modules/sugar-date/date/isWeekend.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/isWeekend.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isWeekend;

/***/ }),

/***/ "./node_modules/sugar-date/date/isYesterday.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/date/isYesterday.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildRelativeAliasesCall */ "./node_modules/sugar-date/date/build/buildRelativeAliasesCall.js");

module.exports = Sugar.Date.isYesterday;

/***/ }),

/***/ "./node_modules/sugar-date/date/iso.js":
/*!*********************************************!*\
  !*** ./node_modules/sugar-date/date/iso.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

Sugar.Date.defineInstance({

  'iso': function(date) {
    return date.toISOString();
  }

});

module.exports = Sugar.Date.iso;

/***/ }),

/***/ "./node_modules/sugar-date/date/millisecondsAgo.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/date/millisecondsAgo.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.millisecondsAgo;

/***/ }),

/***/ "./node_modules/sugar-date/date/millisecondsFromNow.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/date/millisecondsFromNow.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.millisecondsFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/date/millisecondsSince.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/date/millisecondsSince.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.millisecondsSince;

/***/ }),

/***/ "./node_modules/sugar-date/date/millisecondsUntil.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/date/millisecondsUntil.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.millisecondsUntil;

/***/ }),

/***/ "./node_modules/sugar-date/date/minutesAgo.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/minutesAgo.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.minutesAgo;

/***/ }),

/***/ "./node_modules/sugar-date/date/minutesFromNow.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/date/minutesFromNow.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.minutesFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/date/minutesSince.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/date/minutesSince.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.minutesSince;

/***/ }),

/***/ "./node_modules/sugar-date/date/minutesUntil.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/date/minutesUntil.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.minutesUntil;

/***/ }),

/***/ "./node_modules/sugar-date/date/monthsAgo.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/monthsAgo.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.monthsAgo;

/***/ }),

/***/ "./node_modules/sugar-date/date/monthsFromNow.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/date/monthsFromNow.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.monthsFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/date/monthsSince.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/date/monthsSince.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.monthsSince;

/***/ }),

/***/ "./node_modules/sugar-date/date/monthsUntil.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/date/monthsUntil.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.monthsUntil;

/***/ }),

/***/ "./node_modules/sugar-date/date/range.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/date/range.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    DateRangeConstructor = __webpack_require__(/*! ../range/var/DateRangeConstructor */ "./node_modules/sugar-date/range/var/DateRangeConstructor.js");

Sugar.Date.defineStatic({

  'range': DateRangeConstructor

});

module.exports = Sugar.Date.range;

/***/ }),

/***/ "./node_modules/sugar-date/date/relative.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/relative.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    dateRelative = __webpack_require__(/*! ./internal/dateRelative */ "./node_modules/sugar-date/date/internal/dateRelative.js");

Sugar.Date.defineInstance({

  'relative': function(date, localeCode, relativeFn) {
    return dateRelative(date, null, localeCode, relativeFn);
  }

});

module.exports = Sugar.Date.relative;

/***/ }),

/***/ "./node_modules/sugar-date/date/relativeTo.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/relativeTo.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    createDate = __webpack_require__(/*! ./internal/createDate */ "./node_modules/sugar-date/date/internal/createDate.js"),
    dateRelative = __webpack_require__(/*! ./internal/dateRelative */ "./node_modules/sugar-date/date/internal/dateRelative.js");

Sugar.Date.defineInstance({

  'relativeTo': function(date, d, localeCode) {
    return dateRelative(date, createDate(d), localeCode);
  }

});

module.exports = Sugar.Date.relativeTo;

/***/ }),

/***/ "./node_modules/sugar-date/date/removeLocale.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/date/removeLocale.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    LocaleHelpers = __webpack_require__(/*! ./var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js");

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'removeLocale': function(code) {
    return localeManager.remove(code);
  }

});

module.exports = Sugar.Date.removeLocale;

/***/ }),

/***/ "./node_modules/sugar-date/date/reset.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/date/reset.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    DateUnitIndexes = __webpack_require__(/*! ./var/DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    moveToBeginningOfUnit = __webpack_require__(/*! ./internal/moveToBeginningOfUnit */ "./node_modules/sugar-date/date/internal/moveToBeginningOfUnit.js"),
    getUnitIndexForParamName = __webpack_require__(/*! ./internal/getUnitIndexForParamName */ "./node_modules/sugar-date/date/internal/getUnitIndexForParamName.js");

var DAY_INDEX = DateUnitIndexes.DAY_INDEX;

Sugar.Date.defineInstance({

  'reset': function(date, unit, localeCode) {
    var unitIndex = unit ? getUnitIndexForParamName(unit) : DAY_INDEX;
    moveToBeginningOfUnit(date, unitIndex, localeCode);
    return date;
  }

});

module.exports = Sugar.Date.reset;

/***/ }),

/***/ "./node_modules/sugar-date/date/rewind.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/date/rewind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    advanceDateWithArgs = __webpack_require__(/*! ./internal/advanceDateWithArgs */ "./node_modules/sugar-date/date/internal/advanceDateWithArgs.js");

Sugar.Date.defineInstanceWithArguments({

  'rewind': function(d, args) {
    return advanceDateWithArgs(d, args, -1);
  }

});

module.exports = Sugar.Date.rewind;

/***/ }),

/***/ "./node_modules/sugar-date/date/secondsAgo.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/secondsAgo.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.secondsAgo;

/***/ }),

/***/ "./node_modules/sugar-date/date/secondsFromNow.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/date/secondsFromNow.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.secondsFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/date/secondsSince.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/date/secondsSince.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.secondsSince;

/***/ }),

/***/ "./node_modules/sugar-date/date/secondsUntil.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/date/secondsUntil.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.secondsUntil;

/***/ }),

/***/ "./node_modules/sugar-date/date/set.js":
/*!*********************************************!*\
  !*** ./node_modules/sugar-date/date/set.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    updateDate = __webpack_require__(/*! ./internal/updateDate */ "./node_modules/sugar-date/date/internal/updateDate.js"),
    collectUpdateDateArguments = __webpack_require__(/*! ./internal/collectUpdateDateArguments */ "./node_modules/sugar-date/date/internal/collectUpdateDateArguments.js");

Sugar.Date.defineInstanceWithArguments({

  'set': function(d, args) {
    args = collectUpdateDateArguments(args);
    return updateDate(d, args[0], args[1]);
  }

});

module.exports = Sugar.Date.set;

/***/ }),

/***/ "./node_modules/sugar-date/date/setISOWeek.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/setISOWeek.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    setISOWeekNumber = __webpack_require__(/*! ./internal/setISOWeekNumber */ "./node_modules/sugar-date/date/internal/setISOWeekNumber.js");

Sugar.Date.defineInstance({

  'setISOWeek': function(date, num) {
    return setISOWeekNumber(date, num);
  }

});

module.exports = Sugar.Date.setISOWeek;

/***/ }),

/***/ "./node_modules/sugar-date/date/setLocale.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/setLocale.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    LocaleHelpers = __webpack_require__(/*! ./var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js");

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'setLocale': function(code) {
    return localeManager.set(code);
  }

});

module.exports = Sugar.Date.setLocale;

/***/ }),

/***/ "./node_modules/sugar-date/date/setOption.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/date/setOption.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    _dateOptions = __webpack_require__(/*! ./var/_dateOptions */ "./node_modules/sugar-date/date/var/_dateOptions.js");

module.exports = Sugar.Date.setOption;

/***/ }),

/***/ "./node_modules/sugar-date/date/setUTC.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/date/setUTC.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    _utc = __webpack_require__(/*! ../common/var/_utc */ "./node_modules/sugar-date/common/var/_utc.js");

Sugar.Date.defineInstance({

  'setUTC': function(date, on) {
    return _utc(date, on);
  }

});

module.exports = Sugar.Date.setUTC;

/***/ }),

/***/ "./node_modules/sugar-date/date/setWeekday.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/setWeekday.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    setWeekday = __webpack_require__(/*! ./internal/setWeekday */ "./node_modules/sugar-date/date/internal/setWeekday.js");

Sugar.Date.defineInstance({

  'setWeekday': function(date, dow) {
    return setWeekday(date, dow);
  }

});

module.exports = Sugar.Date.setWeekday;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/ABBREVIATED_YEAR_REG.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/ABBREVIATED_YEAR_REG.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = /^'?(\d{1,2})$/;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/AmericanEnglishDefinition.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/AmericanEnglishDefinition.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getEnglishVariant = __webpack_require__(/*! ../internal/getEnglishVariant */ "./node_modules/sugar-date/date/internal/getEnglishVariant.js");

var AmericanEnglishDefinition = getEnglishVariant({
  'mdy': true,
  'firstDayOfWeek': 0,
  'firstDayOfWeekYear': 1,
  'short':  '{MM}/{dd}/{yyyy}',
  'medium': '{Month} {d}, {yyyy}',
  'long':   '{Month} {d}, {yyyy} {time}',
  'full':   '{Weekday}, {Month} {d}, {yyyy} {time}',
  'stamp':  '{Dow} {Mon} {d} {yyyy} {time}',
  'time':   '{h}:{mm} {TT}'
});

module.exports = AmericanEnglishDefinition;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/BritishEnglishDefinition.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/BritishEnglishDefinition.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getEnglishVariant = __webpack_require__(/*! ../internal/getEnglishVariant */ "./node_modules/sugar-date/date/internal/getEnglishVariant.js");

var BritishEnglishDefinition = getEnglishVariant({
  'short':  '{dd}/{MM}/{yyyy}',
  'medium': '{d} {Month} {yyyy}',
  'long':   '{d} {Month} {yyyy} {H}:{mm}',
  'full':   '{Weekday}, {d} {Month}, {yyyy} {time}',
  'stamp':  '{Dow} {d} {Mon} {yyyy} {time}'
});

module.exports = BritishEnglishDefinition;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/CanadianEnglishDefinition.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/CanadianEnglishDefinition.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getEnglishVariant = __webpack_require__(/*! ../internal/getEnglishVariant */ "./node_modules/sugar-date/date/internal/getEnglishVariant.js");

var CanadianEnglishDefinition = getEnglishVariant({
  'short':  '{yyyy}-{MM}-{dd}',
  'medium': '{d} {Month}, {yyyy}',
  'long':   '{d} {Month}, {yyyy} {H}:{mm}',
  'full':   '{Weekday}, {d} {Month}, {yyyy} {time}',
  'stamp':  '{Dow} {d} {Mon} {yyyy} {time}'
});

module.exports = CanadianEnglishDefinition;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/CoreOutputFormats.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/CoreOutputFormats.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CoreOutputFormats = {
  'ISO8601': '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{SSS}{Z}',
  'RFC1123': '{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {ZZ}',
  'RFC1036': '{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {ZZ}'
};

module.exports = CoreOutputFormats;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/CoreParsingFormats.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/CoreParsingFormats.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CoreParsingFormats = [
  {
    // 12-1978
    // 08-1978 (MDY)
    src: '{MM}[-.\\/]{yyyy}'
  },
  {
    // 12/08/1978
    // 08/12/1978 (MDY)
    time: true,
    src: '{dd}[-\\/]{MM}(?:[-\\/]{yyyy|yy|y})?',
    mdy: '{MM}[-\\/]{dd}(?:[-\\/]{yyyy|yy|y})?'
  },
  {
    // 12.08.1978
    // 08.12.1978 (MDY)
    time: true,
    src: '{dd}\\.{MM}(?:\\.{yyyy|yy|y})?',
    mdy: '{MM}\\.{dd}(?:\\.{yyyy|yy|y})?',
    localeCheck: function(loc) {
      // Do not allow this format if the locale
      // uses a period as a time separator.
      return loc.timeSeparator !== '.';
    }
  },
  {
    // 1975-08-25
    time: true,
    src: '{yyyy}[-.\\/]{MM}(?:[-.\\/]{dd})?'
  },
  {
    // .NET JSON
    src: '\\\\/Date\\({timestamp}(?:[-+]\\d{4,4})?\\)\\\\/'
  },
  {
    // ISO-8601
    src: '{iyyyy}(?:-?{MM}(?:-?{dd}(?:T{ihh}(?::?{imm}(?::?{ss})?)?)?)?)?{tzOffset?}'
  }
];

module.exports = CoreParsingFormats;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/CoreParsingTokens.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/CoreParsingTokens.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CoreParsingTokens = {
  'yyyy': {
    param: 'year',
    src: '[-−+]?\\d{4,6}'
  },
  'yy': {
    param: 'year',
    src: '\\d{2}'
  },
  'y': {
    param: 'year',
    src: '\\d'
  },
  'ayy': {
    param: 'year',
    src: '\'\\d{2}'
  },
  'MM': {
    param: 'month',
    src: '(?:1[012]|0?[1-9])'
  },
  'dd': {
    param: 'date',
    src: '(?:3[01]|[12][0-9]|0?[1-9])'
  },
  'hh': {
    param: 'hour',
    src: '(?:2[0-4]|[01]?[0-9])'
  },
  'mm': {
    param: 'minute',
    src: '[0-5]\\d'
  },
  'ss': {
    param: 'second',
    src: '[0-5]\\d(?:[,.]\\d+)?'
  },
  'tzHour': {
    src: '[-−+](?:2[0-4]|[01]?[0-9])'
  },
  'tzMinute': {
    src: '[0-5]\\d'
  },
  'iyyyy': {
    param: 'year',
    src: '(?:[-−+]?\\d{4}|[-−+]\\d{5,6})'
  },
  'ihh': {
    param: 'hour',
    src: '(?:2[0-4]|[01][0-9])(?:[,.]\\d+)?'
  },
  'imm': {
    param: 'minute',
    src: '[0-5]\\d(?:[,.]\\d+)?'
  },
  'GMT': {
    param: 'utc',
    src: 'GMT'
  },
  'Z': {
    param: 'utc',
    src: 'Z'
  },
  'timestamp': {
    src: '\\d+'
  }
};

module.exports = CoreParsingTokens;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/DATE_OPTIONS.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/date/var/DATE_OPTIONS.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultNewDate = __webpack_require__(/*! ../internal/defaultNewDate */ "./node_modules/sugar-date/date/internal/defaultNewDate.js");

var DATE_OPTIONS = {
  'newDateInternal': defaultNewDate
};

module.exports = DATE_OPTIONS;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/DateUnitIndexes.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/DateUnitIndexes.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  HOURS_INDEX: 3,
  DAY_INDEX: 4,
  WEEK_INDEX: 5,
  MONTH_INDEX: 6,
  YEAR_INDEX: 7
};

/***/ }),

/***/ "./node_modules/sugar-date/date/var/DateUnits.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/date/var/DateUnits.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDaysInMonth = __webpack_require__(/*! ../internal/getDaysInMonth */ "./node_modules/sugar-date/date/internal/getDaysInMonth.js");

var DateUnits = [
  {
    name: 'millisecond',
    method: 'Milliseconds',
    multiplier: 1,
    start: 0,
    end: 999
  },
  {
    name: 'second',
    method: 'Seconds',
    multiplier: 1000,
    start: 0,
    end: 59
  },
  {
    name: 'minute',
    method: 'Minutes',
    multiplier: 60 * 1000,
    start: 0,
    end: 59
  },
  {
    name: 'hour',
    method: 'Hours',
    multiplier: 60 * 60 * 1000,
    start: 0,
    end: 23
  },
  {
    name: 'day',
    alias: 'date',
    method: 'Date',
    ambiguous: true,
    multiplier: 24 * 60 * 60 * 1000,
    start: 1,
    end: function(d) {
      return getDaysInMonth(d);
    }
  },
  {
    name: 'week',
    method: 'ISOWeek',
    ambiguous: true,
    multiplier: 7 * 24 * 60 * 60 * 1000
  },
  {
    name: 'month',
    method: 'Month',
    ambiguous: true,
    multiplier: 30.4375 * 24 * 60 * 60 * 1000,
    start: 0,
    end: 11
  },
  {
    name: 'year',
    method: 'FullYear',
    ambiguous: true,
    multiplier: 365.25 * 24 * 60 * 60 * 1000,
    start: 0
  }
];

module.exports = DateUnits;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/EnglishLocaleBaseDefinition.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/EnglishLocaleBaseDefinition.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EnglishLocaleBaseDefinition = {
  'code': 'en',
  'plural': true,
  'timeMarkers': 'at',
  'ampm': 'AM|A.M.|a,PM|P.M.|p',
  'units': 'millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s',
  'months': 'Jan:uary|,Feb:ruary|,Mar:ch|,Apr:il|,May,Jun:e|,Jul:y|,Aug:ust|,Sep:tember|t|,Oct:ober|,Nov:ember|,Dec:ember|',
  'weekdays': 'Sun:day|,Mon:day|,Tue:sday|,Wed:nesday|,Thu:rsday|,Fri:day|,Sat:urday|+weekend',
  'numerals': 'zero,one|first,two|second,three|third,four:|th,five|fifth,six:|th,seven:|th,eight:|h,nin:e|th,ten:|th',
  'articles': 'a,an,the',
  'tokens': 'the,st|nd|rd|th,of|in,a|an,on',
  'time': '{H}:{mm}',
  'past': '{num} {unit} {sign}',
  'future': '{num} {unit} {sign}',
  'duration': '{num} {unit}',
  'modifiers': [
    { 'name': 'half',   'src': 'half', 'value': .5 },
    { 'name': 'midday', 'src': 'noon', 'value': 12 },
    { 'name': 'midday', 'src': 'midnight', 'value': 24 },
    { 'name': 'day',    'src': 'yesterday', 'value': -1 },
    { 'name': 'day',    'src': 'today|tonight', 'value': 0 },
    { 'name': 'day',    'src': 'tomorrow', 'value': 1 },
    { 'name': 'sign',   'src': 'ago|before', 'value': -1 },
    { 'name': 'sign',   'src': 'from now|after|from|in|later', 'value': 1 },
    { 'name': 'edge',   'src': 'first day|first|beginning', 'value': -2 },
    { 'name': 'edge',   'src': 'last day', 'value': 1 },
    { 'name': 'edge',   'src': 'end|last', 'value': 2 },
    { 'name': 'shift',  'src': 'last', 'value': -1 },
    { 'name': 'shift',  'src': 'the|this', 'value': 0 },
    { 'name': 'shift',  'src': 'next', 'value': 1 }
  ],
  'parse': [
    '(?:just)? now',
    '{shift} {unit:5-7}',
    '{months?} {year}',
    '{midday} {4?} {day|weekday}',
    '{months},?[-.\\/\\s]?{year?}',
    '{edge} of (?:day)? {day|weekday}',
    '{0} {num}{1?} {weekday} {2} {months},? {year?}',
    '{shift?} {day?} {weekday?} (?:at)? {midday}',
    '{sign?} {3?} {half} {3?} {unit:3-4|unit:7} {sign?}',
    '{0?} {edge} {weekday?} {2} {shift?} {unit:4-7?} {months?},? {year?}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{shift} {unit:5?} {weekday}',
    '{0?} {date}{1?} {2?} {months?}',
    '{weekday} {2?} {shift} {unit:5}',
    '{0?} {num} {2?} {months}\\.?,? {year?}',
    '{num?} {unit:4-5} {sign} {day|weekday}',
    '{0|months} {date?}{1?} of {shift} {unit:6-7}',
    '{0?} {num}{1?} {weekday} of {shift} {unit:6}',
    '{year?}[-.\\/\\s]?{months}[-.\\/\\s]{date}',
    '{date}[-.\\/\\s]{months}(?:[-.\\/\\s]{year|yy})?',
    '{weekday?}\\.?,? {months}\\.?,? {date}{1?},? {year?}',
    '{weekday?}\\.?,? {date} {months} {year}'
  ],
  'timeFrontParse': [
    '{sign} {num} {unit}',
    '{num} {unit} {sign}',
    '{4?} {day|weekday}'
  ]
};

module.exports = EnglishLocaleBaseDefinition;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/FormatTokensBase.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/FormatTokensBase.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TIMEZONE_ABBREVIATION_REG = __webpack_require__(/*! ./TIMEZONE_ABBREVIATION_REG */ "./node_modules/sugar-date/date/var/TIMEZONE_ABBREVIATION_REG.js"),
    LocaleHelpers = __webpack_require__(/*! ./LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    DateUnitIndexes = __webpack_require__(/*! ./DateUnitIndexes */ "./node_modules/sugar-date/date/var/DateUnitIndexes.js"),
    trunc = __webpack_require__(/*! ../../common/var/trunc */ "./node_modules/sugar-date/common/var/trunc.js"),
    getDate = __webpack_require__(/*! ../internal/getDate */ "./node_modules/sugar-date/date/internal/getDate.js"),
    getYear = __webpack_require__(/*! ../internal/getYear */ "./node_modules/sugar-date/date/internal/getYear.js"),
    getHours = __webpack_require__(/*! ../internal/getHours */ "./node_modules/sugar-date/date/internal/getHours.js"),
    getMonth = __webpack_require__(/*! ../internal/getMonth */ "./node_modules/sugar-date/date/internal/getMonth.js"),
    cloneDate = __webpack_require__(/*! ../internal/cloneDate */ "./node_modules/sugar-date/date/internal/cloneDate.js"),
    padNumber = __webpack_require__(/*! ../../common/internal/padNumber */ "./node_modules/sugar-date/common/internal/padNumber.js"),
    getWeekday = __webpack_require__(/*! ../internal/getWeekday */ "./node_modules/sugar-date/date/internal/getWeekday.js"),
    callDateGet = __webpack_require__(/*! ../../common/internal/callDateGet */ "./node_modules/sugar-date/common/internal/callDateGet.js"),
    mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js"),
    getWeekYear = __webpack_require__(/*! ../internal/getWeekYear */ "./node_modules/sugar-date/date/internal/getWeekYear.js"),
    getUTCOffset = __webpack_require__(/*! ../internal/getUTCOffset */ "./node_modules/sugar-date/date/internal/getUTCOffset.js"),
    getDaysSince = __webpack_require__(/*! ../internal/getDaysSince */ "./node_modules/sugar-date/date/internal/getDaysSince.js"),
    getWeekNumber = __webpack_require__(/*! ../internal/getWeekNumber */ "./node_modules/sugar-date/date/internal/getWeekNumber.js"),
    getMeridiemToken = __webpack_require__(/*! ../internal/getMeridiemToken */ "./node_modules/sugar-date/date/internal/getMeridiemToken.js"),
    setUnitAndLowerToEdge = __webpack_require__(/*! ../internal/setUnitAndLowerToEdge */ "./node_modules/sugar-date/date/internal/setUnitAndLowerToEdge.js");

var localeManager = LocaleHelpers.localeManager,
    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX,
    ceil = mathAliases.ceil;

var FormatTokensBase = [
  {
    ldml: 'Dow',
    strf: 'a',
    lowerToken: 'dow',
    get: function(d, localeCode) {
      return localeManager.get(localeCode).getWeekdayName(getWeekday(d), 2);
    }
  },
  {
    ldml: 'Weekday',
    strf: 'A',
    lowerToken: 'weekday',
    allowAlternates: true,
    get: function(d, localeCode, alternate) {
      return localeManager.get(localeCode).getWeekdayName(getWeekday(d), alternate);
    }
  },
  {
    ldml: 'Mon',
    strf: 'b h',
    lowerToken: 'mon',
    get: function(d, localeCode) {
      return localeManager.get(localeCode).getMonthName(getMonth(d), 2);
    }
  },
  {
    ldml: 'Month',
    strf: 'B',
    lowerToken: 'month',
    allowAlternates: true,
    get: function(d, localeCode, alternate) {
      return localeManager.get(localeCode).getMonthName(getMonth(d), alternate);
    }
  },
  {
    strf: 'C',
    get: function(d) {
      return getYear(d).toString().slice(0, 2);
    }
  },
  {
    ldml: 'd date day',
    strf: 'd',
    strfPadding: 2,
    ldmlPaddedToken: 'dd',
    ordinalToken: 'do',
    get: function(d) {
      return getDate(d);
    }
  },
  {
    strf: 'e',
    get: function(d) {
      return padNumber(getDate(d), 2, false, 10, ' ');
    }
  },
  {
    ldml: 'H 24hr',
    strf: 'H',
    strfPadding: 2,
    ldmlPaddedToken: 'HH',
    get: function(d) {
      return getHours(d);
    }
  },
  {
    ldml: 'h hours 12hr',
    strf: 'I',
    strfPadding: 2,
    ldmlPaddedToken: 'hh',
    get: function(d) {
      return getHours(d) % 12 || 12;
    }
  },
  {
    ldml: 'D',
    strf: 'j',
    strfPadding: 3,
    ldmlPaddedToken: 'DDD',
    get: function(d) {
      var s = setUnitAndLowerToEdge(cloneDate(d), MONTH_INDEX);
      return getDaysSince(d, s) + 1;
    }
  },
  {
    ldml: 'M',
    strf: 'm',
    strfPadding: 2,
    ordinalToken: 'Mo',
    ldmlPaddedToken: 'MM',
    get: function(d) {
      return getMonth(d) + 1;
    }
  },
  {
    ldml: 'm minutes',
    strf: 'M',
    strfPadding: 2,
    ldmlPaddedToken: 'mm',
    get: function(d) {
      return callDateGet(d, 'Minutes');
    }
  },
  {
    ldml: 'Q',
    get: function(d) {
      return ceil((getMonth(d) + 1) / 3);
    }
  },
  {
    ldml: 'TT',
    strf: 'p',
    get: function(d, localeCode) {
      return getMeridiemToken(d, localeCode);
    }
  },
  {
    ldml: 'tt',
    strf: 'P',
    get: function(d, localeCode) {
      return getMeridiemToken(d, localeCode).toLowerCase();
    }
  },
  {
    ldml: 'T',
    lowerToken: 't',
    get: function(d, localeCode) {
      return getMeridiemToken(d, localeCode).charAt(0);
    }
  },
  {
    ldml: 's seconds',
    strf: 'S',
    strfPadding: 2,
    ldmlPaddedToken: 'ss',
    get: function(d) {
      return callDateGet(d, 'Seconds');
    }
  },
  {
    ldml: 'S ms',
    strfPadding: 3,
    ldmlPaddedToken: 'SSS',
    get: function(d) {
      return callDateGet(d, 'Milliseconds');
    }
  },
  {
    ldml: 'e',
    strf: 'u',
    ordinalToken: 'eo',
    get: function(d) {
      return getWeekday(d) || 7;
    }
  },
  {
    strf: 'U',
    strfPadding: 2,
    get: function(d) {
      // Sunday first, 0-53
      return getWeekNumber(d, false, 0);
    }
  },
  {
    ldml: 'W',
    strf: 'V',
    strfPadding: 2,
    ordinalToken: 'Wo',
    ldmlPaddedToken: 'WW',
    get: function(d) {
      // Monday first, 1-53 (ISO8601)
      return getWeekNumber(d, true);
    }
  },
  {
    strf: 'w',
    get: function(d) {
      return getWeekday(d);
    }
  },
  {
    ldml: 'w',
    ordinalToken: 'wo',
    ldmlPaddedToken: 'ww',
    get: function(d, localeCode) {
      // Locale dependent, 1-53
      var loc = localeManager.get(localeCode),
          dow = loc.getFirstDayOfWeek(localeCode),
          doy = loc.getFirstDayOfWeekYear(localeCode);
      return getWeekNumber(d, true, dow, doy);
    }
  },
  {
    strf: 'W',
    strfPadding: 2,
    get: function(d) {
      // Monday first, 0-53
      return getWeekNumber(d, false);
    }
  },
  {
    ldmlPaddedToken: 'gggg',
    ldmlTwoDigitToken: 'gg',
    get: function(d, localeCode) {
      return getWeekYear(d, localeCode);
    }
  },
  {
    strf: 'G',
    strfPadding: 4,
    strfTwoDigitToken: 'g',
    ldmlPaddedToken: 'GGGG',
    ldmlTwoDigitToken: 'GG',
    get: function(d, localeCode) {
      return getWeekYear(d, localeCode, true);
    }
  },
  {
    ldml: 'year',
    ldmlPaddedToken: 'yyyy',
    ldmlTwoDigitToken: 'yy',
    strf: 'Y',
    strfPadding: 4,
    strfTwoDigitToken: 'y',
    get: function(d) {
      return getYear(d);
    }
  },
  {
    ldml: 'ZZ',
    strf: 'z',
    get: function(d) {
      return getUTCOffset(d);
    }
  },
  {
    ldml: 'X',
    get: function(d) {
      return trunc(d.getTime() / 1000);
    }
  },
  {
    ldml: 'x',
    get: function(d) {
      return d.getTime();
    }
  },
  {
    ldml: 'Z',
    get: function(d) {
      return getUTCOffset(d, true);
    }
  },
  {
    ldml: 'z',
    strf: 'Z',
    get: function(d) {
      // Note that this is not accurate in all browsing environments!
      // https://github.com/moment/moment/issues/162
      // It will continue to be supported for Node and usage with the
      // understanding that it may be blank.
      var match = d.toString().match(TIMEZONE_ABBREVIATION_REG);
      // istanbul ignore next
      return match ? match[1] : '';
    }
  },
  {
    strf: 'D',
    alias: '%m/%d/%y'
  },
  {
    strf: 'F',
    alias: '%Y-%m-%d'
  },
  {
    strf: 'r',
    alias: '%I:%M:%S %p'
  },
  {
    strf: 'R',
    alias: '%H:%M'
  },
  {
    strf: 'T',
    alias: '%H:%M:%S'
  },
  {
    strf: 'x',
    alias: '{short}'
  },
  {
    strf: 'X',
    alias: '{time}'
  },
  {
    strf: 'c',
    alias: '{stamp}'
  }
];

module.exports = FormatTokensBase;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/ISODefaults.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/date/var/ISODefaults.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  ISO_FIRST_DAY_OF_WEEK: 1,
  ISO_FIRST_DAY_OF_WEEK_YEAR: 4
};

/***/ }),

/***/ "./node_modules/sugar-date/date/var/LOCALE_ARRAY_FIELDS.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/LOCALE_ARRAY_FIELDS.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LOCALE_ARRAY_FIELDS = [
  'months', 'weekdays', 'units', 'numerals', 'placeholders',
  'articles', 'tokens', 'timeMarkers', 'ampm', 'timeSuffixes',
  'parse', 'timeParse', 'timeFrontParse', 'modifiers'
];

module.exports = LOCALE_ARRAY_FIELDS;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/LazyLoadedLocales.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/LazyLoadedLocales.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BritishEnglishDefinition = __webpack_require__(/*! ./BritishEnglishDefinition */ "./node_modules/sugar-date/date/var/BritishEnglishDefinition.js"),
    AmericanEnglishDefinition = __webpack_require__(/*! ./AmericanEnglishDefinition */ "./node_modules/sugar-date/date/var/AmericanEnglishDefinition.js"),
    CanadianEnglishDefinition = __webpack_require__(/*! ./CanadianEnglishDefinition */ "./node_modules/sugar-date/date/var/CanadianEnglishDefinition.js");

var LazyLoadedLocales = {
  'en-US': AmericanEnglishDefinition,
  'en-GB': BritishEnglishDefinition,
  'en-AU': BritishEnglishDefinition,
  'en-CA': CanadianEnglishDefinition
};

module.exports = LazyLoadedLocales;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/LocaleHelpers.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/date/var/LocaleHelpers.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LazyLoadedLocales = __webpack_require__(/*! ./LazyLoadedLocales */ "./node_modules/sugar-date/date/var/LazyLoadedLocales.js"),
    AmericanEnglishDefinition = __webpack_require__(/*! ./AmericanEnglishDefinition */ "./node_modules/sugar-date/date/var/AmericanEnglishDefinition.js"),
    getNewLocale = __webpack_require__(/*! ../internal/getNewLocale */ "./node_modules/sugar-date/date/internal/getNewLocale.js");

var English, localeManager;

function buildLocales() {

  function LocaleManager(loc) {
    this.locales = {};
    this.add(loc);
  }

  LocaleManager.prototype = {

    get: function(code, fallback) {
      var loc = this.locales[code];
      if (!loc && LazyLoadedLocales[code]) {
        loc = this.add(code, LazyLoadedLocales[code]);
      } else if (!loc && code) {
        loc = this.locales[code.slice(0, 2)];
      }
      return loc || fallback === false ? loc : this.current;
    },

    getAll: function() {
      return this.locales;
    },

    set: function(code) {
      var loc = this.get(code, false);
      if (!loc) {
        throw new TypeError('Invalid Locale: ' + code);
      }
      return this.current = loc;
    },

    add: function(code, def) {
      if (!def) {
        def = code;
        code = def.code;
      } else {
        def.code = code;
      }
      var loc = def.compiledFormats ? def : getNewLocale(def);
      this.locales[code] = loc;
      if (!this.current) {
        this.current = loc;
      }
      return loc;
    },

    remove: function(code) {
      if (this.current.code === code) {
        this.current = this.get('en');
      }
      return delete this.locales[code];
    }

  };

  // Sorry about this guys...
  English = getNewLocale(AmericanEnglishDefinition);
  localeManager = new LocaleManager(English);
}

buildLocales();

module.exports = {
  English: English,
  localeManager: localeManager
};

/***/ }),

/***/ "./node_modules/sugar-date/date/var/LocalizedParsingTokens.js":
/*!********************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/LocalizedParsingTokens.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocalizedParsingTokens = {
  'year': {
    base: 'yyyy|ayy',
    requiresSuffix: true
  },
  'month': {
    base: 'MM',
    requiresSuffix: true
  },
  'date': {
    base: 'dd',
    requiresSuffix: true
  },
  'hour': {
    base: 'hh',
    requiresSuffixOr: ':'
  },
  'minute': {
    base: 'mm'
  },
  'second': {
    base: 'ss'
  },
  'num': {
    src: '\\d+',
    requiresNumerals: true
  }
};

module.exports = LocalizedParsingTokens;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/MINUTES.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/date/var/MINUTES.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 60 * 1000;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/TIMEZONE_ABBREVIATION_REG.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/TIMEZONE_ABBREVIATION_REG.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = /\(([-+]\d{2,4}|\w{3,5})\)$/;

/***/ }),

/***/ "./node_modules/sugar-date/date/var/_dateOptions.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/date/var/_dateOptions.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DATE_OPTIONS = __webpack_require__(/*! ./DATE_OPTIONS */ "./node_modules/sugar-date/date/var/DATE_OPTIONS.js"),
    namespaceAliases = __webpack_require__(/*! ../../common/var/namespaceAliases */ "./node_modules/sugar-date/common/var/namespaceAliases.js"),
    defineOptionsAccessor = __webpack_require__(/*! ../../common/internal/defineOptionsAccessor */ "./node_modules/sugar-date/common/internal/defineOptionsAccessor.js");

var sugarDate = namespaceAliases.sugarDate;

module.exports = defineOptionsAccessor(sugarDate, DATE_OPTIONS);

/***/ }),

/***/ "./node_modules/sugar-date/date/var/formattingTokens.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/date/var/formattingTokens.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(/*! ./LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js"),
    FormatTokensBase = __webpack_require__(/*! ./FormatTokensBase */ "./node_modules/sugar-date/date/var/FormatTokensBase.js"),
    CoreOutputFormats = __webpack_require__(/*! ./CoreOutputFormats */ "./node_modules/sugar-date/date/var/CoreOutputFormats.js"),
    forEach = __webpack_require__(/*! ../../common/internal/forEach */ "./node_modules/sugar-date/common/internal/forEach.js"),
    padNumber = __webpack_require__(/*! ../../common/internal/padNumber */ "./node_modules/sugar-date/common/internal/padNumber.js"),
    spaceSplit = __webpack_require__(/*! ../../common/internal/spaceSplit */ "./node_modules/sugar-date/common/internal/spaceSplit.js"),
    namespaceAliases = __webpack_require__(/*! ../../common/var/namespaceAliases */ "./node_modules/sugar-date/common/var/namespaceAliases.js"),
    coreUtilityAliases = __webpack_require__(/*! ../../common/var/coreUtilityAliases */ "./node_modules/sugar-date/common/var/coreUtilityAliases.js"),
    createFormatMatcher = __webpack_require__(/*! ../../common/internal/createFormatMatcher */ "./node_modules/sugar-date/common/internal/createFormatMatcher.js"),
    defineInstanceSimilar = __webpack_require__(/*! ../../common/internal/defineInstanceSimilar */ "./node_modules/sugar-date/common/internal/defineInstanceSimilar.js");

var localeManager = LocaleHelpers.localeManager,
    hasOwn = coreUtilityAliases.hasOwn,
    getOwn = coreUtilityAliases.getOwn,
    forEachProperty = coreUtilityAliases.forEachProperty,
    sugarDate = namespaceAliases.sugarDate;

var ldmlTokens, strfTokens;

function buildDateFormatTokens() {

  function addFormats(target, tokens, fn) {
    if (tokens) {
      forEach(spaceSplit(tokens), function(token) {
        target[token] = fn;
      });
    }
  }

  function buildLowercase(get) {
    return function(d, localeCode) {
      return get(d, localeCode).toLowerCase();
    };
  }

  function buildOrdinal(get) {
    return function(d, localeCode) {
      var n = get(d, localeCode);
      return n + localeManager.get(localeCode).getOrdinal(n);
    };
  }

  function buildPadded(get, padding) {
    return function(d, localeCode) {
      return padNumber(get(d, localeCode), padding);
    };
  }

  function buildTwoDigits(get) {
    return function(d, localeCode) {
      return get(d, localeCode) % 100;
    };
  }

  function buildAlias(alias) {
    return function(d, localeCode) {
      return dateFormatMatcher(alias, d, localeCode);
    };
  }

  function buildAlternates(f) {
    for (var n = 1; n <= 5; n++) {
      buildAlternate(f, n);
    }
  }

  function buildAlternate(f, n) {
    var alternate = function(d, localeCode) {
      return f.get(d, localeCode, n);
    };
    addFormats(ldmlTokens, f.ldml + n, alternate);
    if (f.lowerToken) {
      ldmlTokens[f.lowerToken + n] = buildLowercase(alternate);
    }
  }

  function getIdentityFormat(name) {
    return function(d, localeCode) {
      var loc = localeManager.get(localeCode);
      return dateFormatMatcher(loc[name], d, localeCode);
    };
  }

  ldmlTokens = {};
  strfTokens = {};

  forEach(FormatTokensBase, function(f) {
    var get = f.get, getPadded;
    if (f.lowerToken) {
      ldmlTokens[f.lowerToken] = buildLowercase(get);
    }
    if (f.ordinalToken) {
      ldmlTokens[f.ordinalToken] = buildOrdinal(get, f);
    }
    if (f.ldmlPaddedToken) {
      ldmlTokens[f.ldmlPaddedToken] = buildPadded(get, f.ldmlPaddedToken.length);
    }
    if (f.ldmlTwoDigitToken) {
      ldmlTokens[f.ldmlTwoDigitToken] = buildPadded(buildTwoDigits(get), 2);
    }
    if (f.strfTwoDigitToken) {
      strfTokens[f.strfTwoDigitToken] = buildPadded(buildTwoDigits(get), 2);
    }
    if (f.strfPadding) {
      getPadded = buildPadded(get, f.strfPadding);
    }
    if (f.alias) {
      get = buildAlias(f.alias);
    }
    if (f.allowAlternates) {
      buildAlternates(f);
    }
    addFormats(ldmlTokens, f.ldml, get);
    addFormats(strfTokens, f.strf, getPadded || get);
  });

  forEachProperty(CoreOutputFormats, function(src, name) {
    addFormats(ldmlTokens, name, buildAlias(src));
  });

  defineInstanceSimilar(sugarDate, 'short medium long full', function(methods, name) {
    var fn = getIdentityFormat(name);
    addFormats(ldmlTokens, name, fn);
    methods[name] = fn;
  });

  addFormats(ldmlTokens, 'time', getIdentityFormat('time'));
  addFormats(ldmlTokens, 'stamp', getIdentityFormat('stamp'));
}

var dateFormatMatcher;

function buildDateFormatMatcher() {

  function getLdml(d, token, localeCode) {
    return getOwn(ldmlTokens, token)(d, localeCode);
  }

  function getStrf(d, token, localeCode) {
    return getOwn(strfTokens, token)(d, localeCode);
  }

  function checkDateToken(ldml, strf) {
    return hasOwn(ldmlTokens, ldml) || hasOwn(strfTokens, strf);
  }

  // Format matcher for LDML or STRF tokens.
  dateFormatMatcher = createFormatMatcher(getLdml, getStrf, checkDateToken);
}

buildDateFormatTokens();

buildDateFormatMatcher();

module.exports = {
  ldmlTokens: ldmlTokens,
  strfTokens: strfTokens,
  dateFormatMatcher: dateFormatMatcher
};

/***/ }),

/***/ "./node_modules/sugar-date/date/weeksAgo.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/weeksAgo.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.weeksAgo;

/***/ }),

/***/ "./node_modules/sugar-date/date/weeksFromNow.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/date/weeksFromNow.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.weeksFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/date/weeksSince.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/weeksSince.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.weeksSince;

/***/ }),

/***/ "./node_modules/sugar-date/date/weeksUntil.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/weeksUntil.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.weeksUntil;

/***/ }),

/***/ "./node_modules/sugar-date/date/yearsAgo.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/date/yearsAgo.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.yearsAgo;

/***/ }),

/***/ "./node_modules/sugar-date/date/yearsFromNow.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/date/yearsFromNow.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.yearsFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/date/yearsSince.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/yearsSince.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.yearsSince;

/***/ }),

/***/ "./node_modules/sugar-date/date/yearsUntil.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/date/yearsUntil.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ./build/buildDateUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildDateUnitMethodsCall.js");

module.exports = Sugar.Date.yearsUntil;

/***/ }),

/***/ "./node_modules/sugar-date/index.js":
/*!******************************************!*\
  !*** ./node_modules/sugar-date/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./date */ "./node_modules/sugar-date/date/index.js");
__webpack_require__(/*! ./range */ "./node_modules/sugar-date/range/index.js");

module.exports = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

/***/ }),

/***/ "./node_modules/sugar-date/locales/ca.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/ca.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Catalan locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('ca')
 *
 */
addLocale('ca', {
  'plural': true,
  'units': 'milisegon:|s,segon:|s,minut:|s,hor:a|es,di:a|es,setman:a|es,mes:|os,any:|s',
  'months': 'gen:er|,febr:er|,mar:ç|,abr:il|,mai:g|,jun:y|,jul:iol|,ag:ost|,set:embre|,oct:ubre|,nov:embre|,des:embre|',
  'weekdays': 'diumenge|dg,dilluns|dl,dimarts|dt,dimecres|dc,dijous|dj,divendres|dv,dissabte|ds',
  'numerals': 'zero,un,dos,tres,quatre,cinc,sis,set,vuit,nou,deu',
  'tokens': 'el,la,de',
  'short':  '{dd}/{MM}/{yyyy}',
  'medium': '{d} {month} {yyyy}',
  'long':   '{d} {month} {yyyy} {time}',
  'full':   '{weekday} {d} {month} {yyyy} {time}',
  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{sign} {num} {unit}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarkers': 'a las',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': "abans d'ahir", 'value': -2 },
    { 'name': 'day', 'src': 'ahir', 'value': -1 },
    { 'name': 'day', 'src': 'avui', 'value': 0 },
    { 'name': 'day', 'src': 'demà|dema', 'value': 1 },
    { 'name': 'sign', 'src': 'fa', 'value': -1 },
    { 'name': 'sign', 'src': 'en', 'value': 1 },
    { 'name': 'shift', 'src': 'passat', 'value': -1 },
    { 'name': 'shift', 'src': 'el proper|la propera', 'value': 1 }
  ],
  'parse': [
    '{sign} {num} {unit}',
    '{num} {unit} {sign}',
    '{0?}{1?} {unit:5-7} {shift}',
    '{0?}{1?} {shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift} {weekday}',
    '{weekday} {shift}',
    '{date?} {2?} {months}\\.? {2?} {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "ca" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/da.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/da.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Danish locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('da')
 *
 */
addLocale('da', {
  'plural': true,
  'units': 'millisekund:|er,sekund:|er,minut:|ter,tim:e|er,dag:|e,ug:e|er|en,måned:|er|en+maaned:|er|en,år:||et+aar:||et',
  'months': 'jan:uar|,feb:ruar|,mar:ts|,apr:il|,maj,jun:i|,jul:i|,aug:ust|,sep:tember|,okt:ober|,nov:ember|,dec:ember|',
  'weekdays': 'søn:dag|+son:dag|,man:dag|,tir:sdag|,ons:dag|,tor:sdag|,fre:dag|,lør:dag|+lor:dag|',
  'numerals': 'nul,en|et,to,tre,fire,fem,seks,syv,otte,ni,ti',
  'tokens':   'den,for',
  'articles': 'den',
  'short':  '{dd}-{MM}-{yyyy}',
  'medium': '{d}. {month} {yyyy}',
  'long':   '{d}. {month} {yyyy} {time}',
  'full':   '{weekday} d. {d}. {month} {yyyy} {time}',
  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{num} {unit} {sign}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'forgårs|i forgårs|forgaars|i forgaars', 'value': -2 },
    { 'name': 'day', 'src': 'i går|igår|i gaar|igaar', 'value': -1 },
    { 'name': 'day', 'src': 'i dag|idag', 'value': 0 },
    { 'name': 'day', 'src': 'i morgen|imorgen', 'value': 1 },
    { 'name': 'day', 'src': 'over morgon|overmorgen|i over morgen|i overmorgen|iovermorgen', 'value': 2 },
    { 'name': 'sign', 'src': 'siden', 'value': -1 },
    { 'name': 'sign', 'src': 'om', 'value':  1 },
    { 'name': 'shift', 'src': 'i sidste|sidste', 'value': -1 },
    { 'name': 'shift', 'src': 'denne', 'value': 0 },
    { 'name': 'shift', 'src': 'næste|naeste', 'value': 1 }
  ],
  'parse': [
    '{months} {year?}',
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{1?} {num} {unit} {sign}',
    '{shift} {unit:5-7}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{date} {months?}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{shift} {weekday}',
    '{0?} {weekday?},? {date}\\.? {months?}\\.? {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "da" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/de.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/de.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * German locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('de')
 *
 */
addLocale('de', {
  'plural': true,
  'units': 'Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en|e',
  'months': 'Jan:uar|,Feb:ruar|,M:är|ärz|ar|arz,Apr:il|,Mai,Juni,Juli,Aug:ust|,Sept:ember|,Okt:ober|,Nov:ember|,Dez:ember|',
  'weekdays': 'So:nntag|,Mo:ntag|,Di:enstag|,Mi:ttwoch|,Do:nnerstag|,Fr:eitag|,Sa:mstag|',
  'numerals': 'null,ein:|e|er|en|em,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn',
  'tokens': 'der',
  'short': '{dd}.{MM}.{yyyy}',
  'medium': '{d}. {Month} {yyyy}',
  'long': '{d}. {Month} {yyyy} {time}',
  'full': '{Weekday}, {d}. {Month} {yyyy} {time}',
  'stamp': '{Dow} {d} {Mon} {yyyy} {time}',
  'time': '{H}:{mm}',
  'past': '{sign} {num} {unit}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarkers': 'um',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'vorgestern', 'value': -2 },
    { 'name': 'day', 'src': 'gestern', 'value': -1 },
    { 'name': 'day', 'src': 'heute', 'value': 0 },
    { 'name': 'day', 'src': 'morgen', 'value': 1 },
    { 'name': 'day', 'src': 'übermorgen|ubermorgen|uebermorgen', 'value': 2 },
    { 'name': 'sign', 'src': 'vor:|her', 'value': -1 },
    { 'name': 'sign', 'src': 'in', 'value': 1 },
    { 'name': 'shift', 'src': 'letzte:|r|n|s', 'value': -1 },
    { 'name': 'shift', 'src': 'nächste:|r|n|s+nachste:|r|n|s+naechste:|r|n|s+kommende:n|r', 'value': 1 }
  ],
  'parse': [
    '{months} {year?}',
    '{sign} {num} {unit}',
    '{num} {unit} {sign}',
    '{shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift?} {day|weekday}',
    '{weekday?},? {date}\\.? {months?}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{shift} {weekday}',
    '{weekday?},? {date}\\.? {months?}\\.? {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "de" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/es.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/es.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Spanish locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('es')
 *
 */
addLocale('es', {
  'plural': true,
  'units': 'milisegundo:|s,segundo:|s,minuto:|s,hora:|s,día|días|dia|dias,semana:|s,mes:|es,año|años|ano|anos',
  'months': 'ene:ro|,feb:rero|,mar:zo|,abr:il|,may:o|,jun:io|,jul:io|,ago:sto|,sep:tiembre|,oct:ubre|,nov:iembre|,dic:iembre|',
  'weekdays': 'dom:ingo|,lun:es|,mar:tes|,mié:rcoles|+mie:rcoles|,jue:ves|,vie:rnes|,sáb:ado|+sab:ado|',
  'numerals': 'cero,uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez',
  'tokens': 'el,la,de',
  'short':  '{dd}/{MM}/{yyyy}',
  'medium': '{d} de {Month} de {yyyy}',
  'long':   '{d} de {Month} de {yyyy} {time}',
  'full':   '{weekday}, {d} de {month} de {yyyy} {time}',
  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{sign} {num} {unit}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarkers': 'a las',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'anteayer', 'value': -2 },
    { 'name': 'day', 'src': 'ayer', 'value': -1 },
    { 'name': 'day', 'src': 'hoy', 'value': 0 },
    { 'name': 'day', 'src': 'mañana|manana', 'value': 1 },
    { 'name': 'sign', 'src': 'hace', 'value': -1 },
    { 'name': 'sign', 'src': 'dentro de', 'value': 1 },
    { 'name': 'shift', 'src': 'pasad:o|a', 'value': -1 },
    { 'name': 'shift', 'src': 'próximo|próxima|proximo|proxima', 'value': 1 }
  ],
  'parse': [
    '{months} {2?} {year?}',
    '{sign} {num} {unit}',
    '{num} {unit} {sign}',
    '{0?}{1?} {unit:5-7} {shift}',
    '{0?}{1?} {shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift?} {day|weekday} {shift?}',
    '{date} {2?} {months?}\\.? {2?} {year?}'
  ],
  'timeFrontParse': [
    '{shift?} {weekday} {shift?}',
    '{date} {2?} {months?}\\.? {2?} {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "es" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/fi.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/fi.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Finnish locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('fi')
 *
 */
addLocale('fi', {
  'plural': true,
  'units': 'millisekun:ti|tia|nin|teja|tina,sekun:ti|tia|nin|teja|tina,minuut:ti|tia|in|teja|tina,tun:ti|tia|nin|teja|tina,päiv:ä|ää|än|iä|änä,viik:ko|koa|on|olla|koja|kona,kuukau:si|tta|den+kuussa,vuo:si|tta|den|sia|tena|nna',
  'months': 'tammi:kuuta||kuu,helmi:kuuta||kuu,maalis:kuuta||kuu,huhti:kuuta||kuu,touko:kuuta||kuu,kesä:kuuta||kuu,heinä:kuuta||kuu,elo:kuuta||kuu,syys:kuuta||kuu,loka:kuuta||kuu,marras:kuuta||kuu,joulu:kuuta||kuu',
  'weekdays': 'su:nnuntai||nnuntaina,ma:anantai||anantaina,ti:istai||istaina,ke:skiviikko||skiviikkona,to:rstai||rstaina,pe:rjantai||rjantaina,la:uantai||uantaina',
  'numerals': 'nolla,yksi|ensimmäinen,kaksi|toinen,kolm:e|as,neljä:|s,vii:si|des,kuu:si|des,seitsemä:n|s,kahdeksa:n|s,yhdeksä:n|s,kymmene:n|s',
  'short': '{d}.{M}.{yyyy}',
  'medium': '{d}. {month} {yyyy}',
  'long': '{d}. {month} {yyyy} klo {time}',
  'full': '{weekday} {d}. {month} {yyyy} klo {time}',
  'stamp': '{dow} {d} {mon} {yyyy} {time}',
  'time': '{H}.{mm}',
  'timeMarkers': 'klo,kello',
  'timeSeparator': '.',
  'ordinalSuffix': '.',
  'relative': function(num, unit, ms, format) {
    var units = this['units'];
    function numberWithUnit(mult) {
      return num + ' ' + units[(8 * mult) + unit];
    }
    function baseUnit() {
      return numberWithUnit(num === 1 ? 0 : 1);
    }
    switch(format) {
      case 'duration':  return baseUnit();
      case 'past':      return baseUnit() + ' sitten';
      case 'future':    return numberWithUnit(2) + ' kuluttua';
    }
  },
  'modifiers': [
    { 'name': 'day',   'src': 'toissa päivänä', 'value': -2 },
    { 'name': 'day',   'src': 'eilen|eilistä', 'value': -1 },
    { 'name': 'day',   'src': 'tänään', 'value': 0 },
    { 'name': 'day',   'src': 'huomenna|huomista', 'value': 1 },
    { 'name': 'day',   'src': 'ylihuomenna|ylihuomista', 'value': 2 },
    { 'name': 'sign',  'src': 'sitten|aiemmin', 'value': -1 },
    { 'name': 'sign',  'src': 'päästä|kuluttua|myöhemmin', 'value': 1 },
    { 'name': 'edge',  'src': 'lopussa', 'value': 2 },
    { 'name': 'edge',  'src': 'ensimmäinen|ensimmäisenä', 'value': -2 },
    { 'name': 'shift', 'src': 'edel:linen|lisenä', 'value': -1 },
    { 'name': 'shift', 'src': 'viime', 'value': -1 },
    { 'name': 'shift', 'src': 'tä:llä|ssä|nä|mä', 'value': 0 },
    { 'name': 'shift', 'src': 'seuraava|seuraavana|tuleva|tulevana|ensi', 'value': 1 }
  ],
  'parse': [
    '{months} {year?}',
    '{shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift?} {day|weekday}',
    '{weekday?},? {date}\\.? {months?}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{shift?} {day|weekday}',
    '{num?} {unit} {sign}',
    '{weekday?},? {date}\\.? {months?}\\.? {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "fi" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/fr.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/fr.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * French locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('fr')
 *
 */
addLocale('fr', {
  'plural': true,
  'units': 'milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|née|nee',
  'months': 'janv:ier|,févr:ier|+fevr:ier|,mars,avr:il|,mai,juin,juil:let|,août,sept:embre|,oct:obre|,nov:embre|,déc:embre|+dec:embre|',
  'weekdays': 'dim:anche|,lun:di|,mar:di|,mer:credi|,jeu:di|,ven:dredi|,sam:edi|',
  'numerals': 'zéro,un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix',
  'tokens': "l'|la|le,er",
  'short':  '{dd}/{MM}/{yyyy}',
  'medium': '{d} {month} {yyyy}',
  'long':   '{d} {month} {yyyy} {time}',
  'full':   '{weekday} {d} {month} {yyyy} {time}',
  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{sign} {num} {unit}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarkers': 'à',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'hier', 'value': -1 },
    { 'name': 'day', 'src': "aujourd'hui", 'value': 0 },
    { 'name': 'day', 'src': 'demain', 'value': 1 },
    { 'name': 'sign', 'src': 'il y a', 'value': -1 },
    { 'name': 'sign', 'src': "dans|d'ici", 'value': 1 },
    { 'name': 'shift', 'src': 'derni:èr|er|ère|ere', 'value': -1 },
    { 'name': 'shift', 'src': 'prochain:|e', 'value': 1 }
  ],
  'parse': [
    '{months} {year?}',
    '{sign} {num} {unit}',
    '{0?} {unit:5-7} {shift}'
  ],
  'timeParse': [
    '{day|weekday} {shift?}',
    '{weekday?},? {0?} {date}{1?} {months}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{0?} {weekday} {shift}',
    '{weekday?},? {0?} {date}{1?} {months}\\.? {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "fr" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/index.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/locales/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./ca */ "./node_modules/sugar-date/locales/ca.js");
__webpack_require__(/*! ./da */ "./node_modules/sugar-date/locales/da.js");
__webpack_require__(/*! ./de */ "./node_modules/sugar-date/locales/de.js");
__webpack_require__(/*! ./es */ "./node_modules/sugar-date/locales/es.js");
__webpack_require__(/*! ./fi */ "./node_modules/sugar-date/locales/fi.js");
__webpack_require__(/*! ./fr */ "./node_modules/sugar-date/locales/fr.js");
__webpack_require__(/*! ./it */ "./node_modules/sugar-date/locales/it.js");
__webpack_require__(/*! ./ja */ "./node_modules/sugar-date/locales/ja.js");
__webpack_require__(/*! ./ko */ "./node_modules/sugar-date/locales/ko.js");
__webpack_require__(/*! ./nl */ "./node_modules/sugar-date/locales/nl.js");
__webpack_require__(/*! ./no */ "./node_modules/sugar-date/locales/no.js");
__webpack_require__(/*! ./pl */ "./node_modules/sugar-date/locales/pl.js");
__webpack_require__(/*! ./pt */ "./node_modules/sugar-date/locales/pt.js");
__webpack_require__(/*! ./ru */ "./node_modules/sugar-date/locales/ru.js");
__webpack_require__(/*! ./sv */ "./node_modules/sugar-date/locales/sv.js");
__webpack_require__(/*! ./zh-CN */ "./node_modules/sugar-date/locales/zh-CN.js");
__webpack_require__(/*! ./zh-TW */ "./node_modules/sugar-date/locales/zh-TW.js");

module.exports = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

/***/ }),

/***/ "./node_modules/sugar-date/locales/it.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/it.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Italian locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('it')
 *
 */
addLocale('it', {
  'plural': true,
  'units': 'millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i',
  'months': 'gen:naio|,feb:braio|,mar:zo|,apr:ile|,mag:gio|,giu:gno|,lug:lio|,ago:sto|,set:tembre|,ott:obre|,nov:embre|,dic:embre|',
  'weekdays': 'dom:enica|,lun:edì||edi,mar:tedì||tedi,mer:coledì||coledi,gio:vedì||vedi,ven:erdì||erdi,sab:ato|',
  'numerals': "zero,un:|a|o|',due,tre,quattro,cinque,sei,sette,otto,nove,dieci",
  'tokens': "l'|la|il",
  'short': '{dd}/{MM}/{yyyy}',
  'medium': '{d} {month} {yyyy}',
  'long': '{d} {month} {yyyy} {time}',
  'full': '{weekday}, {d} {month} {yyyy} {time}',
  'stamp': '{dow} {d} {mon} {yyyy} {time}',
  'time': '{H}:{mm}',
  'past': '{num} {unit} {sign}',
  'future': '{num} {unit} {sign}',
  'duration': '{num} {unit}',
  'timeMarkers': 'alle',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'ieri', 'value': -1 },
    { 'name': 'day', 'src': 'oggi', 'value': 0 },
    { 'name': 'day', 'src': 'domani', 'value': 1 },
    { 'name': 'day', 'src': 'dopodomani', 'value': 2 },
    { 'name': 'sign', 'src': 'fa', 'value': -1 },
    { 'name': 'sign', 'src': 'da adesso', 'value': 1 },
    { 'name': 'shift', 'src': 'scors:o|a', 'value': -1 },
    { 'name': 'shift', 'src': 'prossim:o|a', 'value': 1 }
  ],
  'parse': [
    '{months} {year?}',
    '{num} {unit} {sign}',
    '{0?} {unit:5-7} {shift}',
    '{0?} {shift} {unit:5-7}'
  ],
  'timeParse': [
    '{day|weekday} {shift?}',
    '{weekday?},? {date} {months?}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{day|weekday} {shift?}',
    '{weekday?},? {date} {months?}\\.? {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "it" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/ja.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/ja.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Japanese locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('ja')
 *
 */
addLocale('ja', {
  'ampmFront': true,
  'numeralUnits': true,
  'allowsFullWidth': true,
  'timeMarkerOptional': true,
  'firstDayOfWeek': 0,
  'firstDayOfWeekYear': 1,
  'units': 'ミリ秒,秒,分,時間,日,週間|週,ヶ月|ヵ月|月,年|年度',
  'weekdays': '日:曜日||曜,月:曜日||曜,火:曜日||曜,水:曜日||曜,木:曜日||曜,金:曜日||曜,土:曜日||曜',
  'numerals': '〇,一,二,三,四,五,六,七,八,九',
  'placeholders': '十,百,千,万',
  'timeSuffixes': ',秒,分,時,日,,月,年度?',
  'short':  '{yyyy}/{MM}/{dd}',
  'medium': '{yyyy}年{M}月{d}日',
  'long':   '{yyyy}年{M}月{d}日{time}',
  'full':   '{yyyy}年{M}月{d}日{time} {weekday}',
  'stamp':  '{yyyy}年{M}月{d}日 {H}:{mm} {dow}',
  'time':   '{tt}{h}時{mm}分',
  'past':   '{num}{unit}{sign}',
  'future': '{num}{unit}{sign}',
  'duration': '{num}{unit}',
  'ampm': '午前,午後',
  'modifiers': [
    { 'name': 'day', 'src': '一昨々日|前々々日', 'value': -3 },
    { 'name': 'day', 'src': '一昨日|おととい|前々日', 'value': -2 },
    { 'name': 'day', 'src': '昨日|前日', 'value': -1 },
    { 'name': 'day', 'src': '今日|当日|本日', 'value': 0 },
    { 'name': 'day', 'src': '明日|翌日|次日', 'value': 1 },
    { 'name': 'day', 'src': '明後日|翌々日', 'value': 2 },
    { 'name': 'day', 'src': '明々後日|翌々々日', 'value': 3 },
    { 'name': 'sign', 'src': '前', 'value': -1 },
    { 'name': 'sign', 'src': '後', 'value': 1 },
    { 'name': 'edge', 'src': '始|初日|頭', 'value': -2 },
    { 'name': 'edge', 'src': '末|尻', 'value': 2 },
    { 'name': 'edge', 'src': '末日', 'value': 1 },
    { 'name': 'shift', 'src': '一昨々|前々々', 'value': -3 },
    { 'name': 'shift', 'src': '一昨|前々|先々', 'value': -2 },
    { 'name': 'shift', 'src': '先|昨|去|前', 'value': -1 },
    { 'name': 'shift', 'src': '今|本|当', 'value':  0 },
    { 'name': 'shift', 'src': '来|明|翌|次', 'value':  1 },
    { 'name': 'shift', 'src': '明後|翌々|次々|再来|さ来', 'value': 2 },
    { 'name': 'shift', 'src': '明々後|翌々々', 'value':  3 }
  ],
  'parse': [
    '{month}{edge}',
    '{num}{unit}{sign}',
    '{year?}{month}',
    '{year}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{shift}{unit:5}{weekday?}',
    '{shift}{unit:7}{month}{edge}',
    '{shift}{unit:7}{month?}{date?}',
    '{shift}{unit:6}{edge?}{date?}',
    '{year?}{month?}{date}'
  ]
});


// This package does not export anything as it is
// simply registering the "ja" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/ko.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/ko.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Korean locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('ko')
 *
 */
addLocale('ko', {
  'ampmFront': true,
  'numeralUnits': true,
  'units': '밀리초,초,분,시간,일,주,개월|달,년|해',
  'weekdays': '일:요일|,월:요일|,화:요일|,수:요일|,목:요일|,금:요일|,토:요일|',
  'numerals': '영|제로,일|한,이,삼,사,오,육,칠,팔,구,십',
  'short':  '{yyyy}.{MM}.{dd}',
  'medium': '{yyyy}년 {M}월 {d}일',
  'long':   '{yyyy}년 {M}월 {d}일 {time}',
  'full':   '{yyyy}년 {M}월 {d}일 {weekday} {time}',
  'stamp':  '{yyyy}년 {M}월 {d}일 {H}:{mm} {dow}',
  'time':   '{tt} {h}시 {mm}분',
  'past':   '{num}{unit} {sign}',
  'future': '{num}{unit} {sign}',
  'duration': '{num}{unit}',
  'timeSuffixes': ',초,분,시,일,,월,년',
  'ampm': '오전,오후',
  'modifiers': [
    { 'name': 'day', 'src': '그저께', 'value': -2 },
    { 'name': 'day', 'src': '어제', 'value': -1 },
    { 'name': 'day', 'src': '오늘', 'value': 0 },
    { 'name': 'day', 'src': '내일', 'value': 1 },
    { 'name': 'day', 'src': '모레', 'value': 2 },
    { 'name': 'sign', 'src': '전', 'value': -1 },
    { 'name': 'sign', 'src': '후', 'value':  1 },
    { 'name': 'shift', 'src': '지난|작', 'value': -1 },
    { 'name': 'shift', 'src': '이번|올', 'value': 0 },
    { 'name': 'shift', 'src': '다음|내', 'value': 1 }
  ],
  'parse': [
    '{num}{unit} {sign}',
    '{shift?} {unit:5-7}',
    '{year?} {month}',
    '{year}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{shift} {unit:5?} {weekday}',
    '{year?} {month?} {date} {weekday?}'
  ]
});


// This package does not export anything as it is
// simply registering the "ko" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/nl.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/nl.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Dutch locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('nl')
 *
 */
addLocale('nl', {
  'plural': true,
  'units': 'milliseconde:|n,seconde:|n,minu:ut|ten,uur,dag:|en,we:ek|ken,maand:|en,jaar',
  'months': 'jan:uari|,feb:ruari|,maart|mrt,apr:il|,mei,jun:i|,jul:i|,aug:ustus|,sep:tember|,okt:ober|,nov:ember|,dec:ember|',
  'weekdays': 'zondag|zo,maandag|ma,dinsdag|di,woensdag|wo|woe,donderdag|do,vrijdag|vr|vrij,zaterdag|za',
  'numerals': 'nul,een,twee,drie,vier,vijf,zes,zeven,acht,negen,tien',
  'short':  '{dd}-{MM}-{yyyy}',
  'medium': '{d} {month} {yyyy}',
  'long':   '{d} {Month} {yyyy} {time}',
  'full':   '{weekday} {d} {Month} {yyyy} {time}',
  'stamp':  '{dow} {d} {Mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{num} {unit} {sign}',
  'future': '{num} {unit} {sign}',
  'duration': '{num} {unit}',
  'timeMarkers': "'s,om",
  'modifiers': [
    { 'name': 'day', 'src': 'gisteren', 'value': -1 },
    { 'name': 'day', 'src': 'vandaag', 'value': 0 },
    { 'name': 'day', 'src': 'morgen', 'value': 1 },
    { 'name': 'day', 'src': 'overmorgen', 'value': 2 },
    { 'name': 'sign', 'src': 'geleden', 'value': -1 },
    { 'name': 'sign', 'src': 'vanaf nu', 'value': 1 },
    { 'name': 'shift', 'src': 'laatste|vorige|afgelopen', 'value': -1 },
    { 'name': 'shift', 'src': 'volgend:|e', 'value': 1 }
  ],
  'parse': [
    '{months} {year?}',
    '{num} {unit} {sign}',
    '{0?} {unit:5-7} {shift}',
    '{0?} {shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift?} {day|weekday}',
    '{weekday?},? {date} {months?}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{shift?} {day|weekday}',
    '{weekday?},? {date} {months?}\\.? {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "nl" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/no.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/no.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Norwegian locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('no')
 *
 */
addLocale('no', {
  'plural': true,
  'units': 'millisekund:|er,sekund:|er,minutt:|er,tim:e|er,dag:|er,uk:e|er|en,måned:|er|en+maaned:|er|en,år:||et+aar:||et',
  'months': 'januar,februar,mars,april,mai,juni,juli,august,september,oktober,november,desember',
  'weekdays': 'søndag|sondag,mandag,tirsdag,onsdag,torsdag,fredag,lørdag|lordag',
  'numerals': 'en|et,to,tre,fire,fem,seks,sju|syv,åtte,ni,ti',
  'tokens': 'den,for',
  'articles': 'den',
  'short':'d. {d}. {month} {yyyy}',
  'long': 'den {d}. {month} {yyyy} {H}:{mm}',
  'full': '{Weekday} den {d}. {month} {yyyy} {H}:{mm}:{ss}',
  'past': '{num} {unit} {sign}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'forgårs|i forgårs|forgaars|i forgaars', 'value': -2 },
    { 'name': 'day', 'src': 'i går|igår|i gaar|igaar', 'value': -1 },
    { 'name': 'day', 'src': 'i dag|idag', 'value': 0 },
    { 'name': 'day', 'src': 'i morgen|imorgen', 'value': 1 },
    { 'name': 'day', 'src': 'overimorgen|overmorgen|over i morgen', 'value': 2 },
    { 'name': 'sign', 'src': 'siden', 'value': -1 },
    { 'name': 'sign', 'src': 'om', 'value':  1 },
    { 'name': 'shift', 'src': 'i siste|siste', 'value': -1 },
    { 'name': 'shift', 'src': 'denne', 'value': 0 },
    { 'name': 'shift', 'src': 'neste', 'value': 1 }
  ],
  'parse': [
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{1?} {num} {unit} {sign}',
    '{shift} {unit:5-7}'
  ],
  'timeParse': [
    '{date} {month}',
    '{shift} {weekday}',
    '{0?} {weekday?},? {date?} {month}\\.? {year}'
  ]
});


// This package does not export anything as it is
// simply registering the "no" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/pl.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/pl.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Polish locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('pl')
 *
 */
addLocale('pl', {
  'plural': true,
  'units': 'milisekund:a|y|,sekund:a|y|,minut:a|y|,godzin:a|y|,dzień|dni|dni,tydzień|tygodnie|tygodni,miesiąc|miesiące|miesięcy,rok|lata|lat',
  'months': 'sty:cznia||czeń,lut:ego||y,mar:ca||zec,kwi:etnia||ecień,maj:a|,cze:rwca||rwiec,lip:ca||iec,sie:rpnia||rpień,wrz:eśnia||esień,paź:dziernika||dziernik,lis:topada||topad,gru:dnia||dzień',
  'weekdays': 'nie:dziela||dzielę,pon:iedziałek|,wt:orek|,śr:oda||odę,czw:artek|,piątek|pt,sobota|sb|sobotę',
  'numerals': 'zero,jeden|jedną,dwa|dwie,trzy,cztery,pięć,sześć,siedem,osiem,dziewięć,dziesięć',
  'tokens': 'w|we,roku',
  'short': '{dd}.{MM}.{yyyy}',
  'medium': '{d} {month} {yyyy}',
  'long':  '{d} {month} {yyyy} {time}',
  'full' : '{weekday}, {d} {month} {yyyy} {time}',
  'stamp': '{dow} {d} {mon} {yyyy} {time}',
  'time': '{H}:{mm}',
  'timeMarkers': 'o',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'przedwczoraj', 'value': -2 },
    { 'name': 'day', 'src': 'wczoraj', 'value': -1 },
    { 'name': 'day', 'src': 'dzisiaj|dziś', 'value': 0 },
    { 'name': 'day', 'src': 'jutro', 'value': 1 },
    { 'name': 'day', 'src': 'pojutrze', 'value': 2 },
    { 'name': 'sign', 'src': 'temu|przed', 'value': -1 },
    { 'name': 'sign', 'src': 'za', 'value': 1 },
    { 'name': 'shift', 'src': 'zeszły|zeszła|ostatni|ostatnia', 'value': -1 },
    { 'name': 'shift', 'src': 'następny|następna|następnego|przyszły|przyszła|przyszłego', 'value': 1 }
  ],
  'relative': function (num, unit, ms, format) {
    // special cases for relative days
    var DAY = 4;
    if (unit === DAY) {
      if (num === 1 && format === 'past')   return 'wczoraj';
      if (num === 1 && format === 'future') return 'jutro';
      if (num === 2 && format === 'past')   return 'przedwczoraj';
      if (num === 2 && format === 'future') return 'pojutrze';
    }

    var mult;
    var last  = +num.toFixed(0).slice(-1);
    var last2 = +num.toFixed(0).slice(-2);
    switch (true) {
      case num === 1:                  mult = 0; break;
      case last2 >= 12 && last2 <= 14: mult = 2; break;
      case last  >=  2 && last  <=  4: mult = 1; break;
      default:                         mult = 2;
    }
    var text = this['units'][(mult * 8) + unit];
    var prefix = num + ' ';

    // changing to accusative case for 'past' and 'future' formats
    // (only singular feminine unit words are different in accusative, each of which ends with 'a')
    if ((format === 'past' || format === 'future') && num === 1) {
      text = text.replace(/a$/, 'ę');
    }

    text = prefix + text;
    switch (format) {
      case 'duration': return text;
      case 'past':     return text + ' temu';
      case 'future':   return 'za ' + text;
    }
  },
  'parse': [
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{months} {year?}',
    '{shift} {unit:5-7}',
    '{0} {shift?} {weekday}'
  ],
  'timeFrontParse': [
    '{day|weekday}',
    '{date} {months} {year?} {1?}',
    '{0?} {shift?} {weekday}'
  ]
});


// This package does not export anything as it is
// simply registering the "pl" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/pt.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/pt.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Portuguese locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('pt')
 *
 */
addLocale('pt', {
  'plural': true,
  'units': 'milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,mês|mêses|mes|meses,ano:|s',
  'months': 'jan:eiro|,fev:ereiro|,mar:ço|,abr:il|,mai:o|,jun:ho|,jul:ho|,ago:sto|,set:embro|,out:ubro|,nov:embro|,dez:embro|',
  'weekdays': 'dom:ingo|,seg:unda-feira|,ter:ça-feira|,qua:rta-feira|,qui:nta-feira|,sex:ta-feira|,sáb:ado||ado',
  'numerals': 'zero,um:|a,dois|duas,três|tres,quatro,cinco,seis,sete,oito,nove,dez',
  'tokens': 'a,de',
  'short':  '{dd}/{MM}/{yyyy}',
  'medium': '{d} de {Month} de {yyyy}',
  'long':   '{d} de {Month} de {yyyy} {time}',
  'full':   '{Weekday}, {d} de {Month} de {yyyy} {time}',
  'stamp':  '{Dow} {d} {Mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{num} {unit} {sign}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'timeMarkers': 'às',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'anteontem', 'value': -2 },
    { 'name': 'day', 'src': 'ontem', 'value': -1 },
    { 'name': 'day', 'src': 'hoje', 'value': 0 },
    { 'name': 'day', 'src': 'amanh:ã|a', 'value': 1 },
    { 'name': 'sign', 'src': 'atrás|atras|há|ha', 'value': -1 },
    { 'name': 'sign', 'src': 'daqui a', 'value': 1 },
    { 'name': 'shift', 'src': 'passad:o|a', 'value': -1 },
    { 'name': 'shift', 'src': 'próximo|próxima|proximo|proxima', 'value': 1 }
  ],
  'parse': [
    '{months} {1?} {year?}',
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{0?} {unit:5-7} {shift}',
    '{0?} {shift} {unit:5-7}'
  ],
  'timeParse': [
    '{shift?} {day|weekday}',
    '{0?} {shift} {weekday}',
    '{date} {1?} {months?} {1?} {year?}'
  ],
  'timeFrontParse': [
    '{shift?} {day|weekday}',
    '{date} {1?} {months?} {1?} {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "pt" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/ru.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/ru.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Russian locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('ru')
 *
 */
addLocale('ru', {
  'firstDayOfWeekYear': 1,
  'units': 'миллисекунд:а|у|ы|,секунд:а|у|ы|,минут:а|у|ы|,час:||а|ов,день|день|дня|дней,недел:я|ю|и|ь|е,месяц:||а|ев|е,год|год|года|лет|году',
  'months': 'янв:аря||.|арь,фев:раля||р.|раль,мар:та||т,апр:еля||.|ель,мая|май,июн:я||ь,июл:я||ь,авг:уста||.|уст,сен:тября||т.|тябрь,окт:ября||.|ябрь,ноя:бря||брь,дек:абря||.|абрь',
  'weekdays': 'воскресенье|вс,понедельник|пн,вторник|вт,среда|ср,четверг|чт,пятница|пт,суббота|сб',
  'numerals': 'ноль,од:ин|ну,дв:а|е,три,четыре,пять,шесть,семь,восемь,девять,десять',
  'tokens': 'в|на,г\\.?(?:ода)?',
  'short':  '{dd}.{MM}.{yyyy}',
  'medium': '{d} {month} {yyyy} г.',
  'long':   '{d} {month} {yyyy} г., {time}',
  'full':   '{weekday}, {d} {month} {yyyy} г., {time}',
  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'timeMarkers': 'в',
  'ampm': ' утра, вечера',
  'modifiers': [
    { 'name': 'day', 'src': 'позавчера', 'value': -2 },
    { 'name': 'day', 'src': 'вчера', 'value': -1 },
    { 'name': 'day', 'src': 'сегодня', 'value': 0 },
    { 'name': 'day', 'src': 'завтра', 'value': 1 },
    { 'name': 'day', 'src': 'послезавтра', 'value': 2 },
    { 'name': 'sign', 'src': 'назад', 'value': -1 },
    { 'name': 'sign', 'src': 'через', 'value': 1 },
    { 'name': 'shift', 'src': 'прошл:ый|ой|ом', 'value': -1 },
    { 'name': 'shift', 'src': 'следующ:ий|ей|ем', 'value': 1 }
  ],
  'relative': function(num, unit, ms, format) {
    var numberWithUnit, last = num.toString().slice(-1), mult;
    switch(true) {
      case num >= 11 && num <= 15: mult = 3; break;
      case last == 1: mult = 1; break;
      case last >= 2 && last <= 4: mult = 2; break;
      default: mult = 3;
    }
    numberWithUnit = num + ' ' + this['units'][(mult * 8) + unit];
    switch(format) {
      case 'duration':  return numberWithUnit;
      case 'past':      return numberWithUnit + ' назад';
      case 'future':    return 'через ' + numberWithUnit;
    }
  },
  'parse': [
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{months} {year?}',
    '{0?} {shift} {unit:5-7}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{0?} {shift} {weekday}',
    '{date} {months?} {year?} {1?}'
  ],
  'timeFrontParse': [
    '{0?} {shift} {weekday}',
    '{date} {months?} {year?} {1?}'
  ]
});


// This package does not export anything as it is
// simply registering the "ru" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/sv.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/locales/sv.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Swedish locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('sv')
 *
 */
addLocale('sv', {
  'plural': true,
  'units': 'millisekund:|er,sekund:|er,minut:|er,timm:e|ar,dag:|ar,veck:a|or|an,månad:|er|en+manad:|er|en,år:||et+ar:||et',
  'months': 'jan:uari|,feb:ruari|,mar:s|,apr:il|,maj,jun:i|,jul:i|,aug:usti|,sep:tember|,okt:ober|,nov:ember|,dec:ember|',
  'weekdays': 'sön:dag|+son:dag|,mån:dag||dagen+man:dag||dagen,tis:dag|,ons:dag|,tor:sdag|,fre:dag|,lör:dag||dag',
  'numerals': 'noll,en|ett,två|tva,tre,fyra,fem,sex,sju,åtta|atta,nio,tio',
  'tokens': 'den,för|for',
  'articles': 'den',
  'short':  '{yyyy}-{MM}-{dd}',
  'medium': '{d} {month} {yyyy}',
  'long':   '{d} {month} {yyyy} {time}',
  'full':   '{weekday} {d} {month} {yyyy} {time}',
  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
  'time':   '{H}:{mm}',
  'past':   '{num} {unit} {sign}',
  'future': '{sign} {num} {unit}',
  'duration': '{num} {unit}',
  'ampm': 'am,pm',
  'modifiers': [
    { 'name': 'day', 'src': 'förrgår|i förrgår|iförrgår|forrgar|i forrgar|iforrgar', 'value': -2 },
    { 'name': 'day', 'src': 'går|i går|igår|gar|i gar|igar', 'value': -1 },
    { 'name': 'day', 'src': 'dag|i dag|idag', 'value': 0 },
    { 'name': 'day', 'src': 'morgon|i morgon|imorgon', 'value': 1 },
    { 'name': 'day', 'src': 'över morgon|övermorgon|i över morgon|i övermorgon|iövermorgon|over morgon|overmorgon|i over morgon|i overmorgon|iovermorgon', 'value': 2 },
    { 'name': 'sign', 'src': 'sedan|sen', 'value': -1 },
    { 'name': 'sign', 'src': 'om', 'value':  1 },
    { 'name': 'shift', 'src': 'i förra|förra|i forra|forra', 'value': -1 },
    { 'name': 'shift', 'src': 'denna', 'value': 0 },
    { 'name': 'shift', 'src': 'nästa|nasta', 'value': 1 }
  ],
  'parse': [
    '{months} {year?}',
    '{num} {unit} {sign}',
    '{sign} {num} {unit}',
    '{1?} {num} {unit} {sign}',
    '{shift} {unit:5-7}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{shift} {weekday}',
    '{0?} {weekday?},? {date} {months?}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{day|weekday}',
    '{shift} {weekday}',
    '{0?} {weekday?},? {date} {months?}\\.? {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "sv" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/zh-CN.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/locales/zh-CN.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Simplified Chinese locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('zh-CN')
 *
 */
addLocale('zh-CN', {
  'ampmFront': true,
  'numeralUnits': true,
  'allowsFullWidth': true,
  'timeMarkerOptional': true,
  'units': '毫秒,秒钟,分钟,小时,天,个星期|周,个月,年',
  'weekdays': '星期日|日|周日|星期天,星期一|一|周一,星期二|二|周二,星期三|三|周三,星期四|四|周四,星期五|五|周五,星期六|六|周六',
  'numerals': '〇,一,二,三,四,五,六,七,八,九',
  'placeholders': '十,百,千,万',
  'short':  '{yyyy}-{MM}-{dd}',
  'medium': '{yyyy}年{M}月{d}日',
  'long':   '{yyyy}年{M}月{d}日{time}',
  'full':   '{yyyy}年{M}月{d}日{weekday}{time}',
  'stamp':  '{yyyy}年{M}月{d}日{H}:{mm}{dow}',
  'time':   '{tt}{h}点{mm}分',
  'past':   '{num}{unit}{sign}',
  'future': '{num}{unit}{sign}',
  'duration': '{num}{unit}',
  'timeSuffixes': ',秒,分钟?,点|时,日|号,,月,年',
  'ampm': '上午,下午',
  'modifiers': [
    { 'name': 'day', 'src': '大前天', 'value': -3 },
    { 'name': 'day', 'src': '前天', 'value': -2 },
    { 'name': 'day', 'src': '昨天', 'value': -1 },
    { 'name': 'day', 'src': '今天', 'value': 0 },
    { 'name': 'day', 'src': '明天', 'value': 1 },
    { 'name': 'day', 'src': '后天', 'value': 2 },
    { 'name': 'day', 'src': '大后天', 'value': 3 },
    { 'name': 'sign', 'src': '前', 'value': -1 },
    { 'name': 'sign', 'src': '后', 'value':  1 },
    { 'name': 'shift', 'src': '上|去', 'value': -1 },
    { 'name': 'shift', 'src': '这', 'value':  0 },
    { 'name': 'shift', 'src': '下|明', 'value':  1 }
  ],
  'parse': [
    '{num}{unit}{sign}',
    '{shift}{unit:5-7}',
    '{year?}{month}',
    '{year}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{shift}{weekday}',
    '{year?}{month?}{date}'
  ]
});


// This package does not export anything as it is
// simply registering the "zh-CN" locale.

/***/ }),

/***/ "./node_modules/sugar-date/locales/zh-TW.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/locales/zh-TW.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(/*! ../date/addLocale */ "./node_modules/sugar-date/date/addLocale.js");

/*
 * Traditional Chinese locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('zh-TW')
 *
 */
addLocale('zh-TW', {
  'ampmFront': true,
  'numeralUnits': true,
  'allowsFullWidth': true,
  'timeMarkerOptional': true,
  'units': '毫秒,秒鐘,分鐘,小時,天,個星期|週,個月,年',
  'weekdays': '星期日|日|週日|星期天,星期一|一|週一,星期二|二|週二,星期三|三|週三,星期四|四|週四,星期五|五|週五,星期六|六|週六',
  'numerals': '〇,一,二,三,四,五,六,七,八,九',
  'placeholders': '十,百,千,万',
  'short':  '{yyyy}/{MM}/{dd}',
  'medium': '{yyyy}年{M}月{d}日',
  'long':   '{yyyy}年{M}月{d}日{time}',
  'full':   '{yyyy}年{M}月{d}日{weekday}{time}',
  'stamp':  '{yyyy}年{M}月{d}日{H}:{mm}{dow}',
  'time':   '{tt}{h}點{mm}分',
  'past':   '{num}{unit}{sign}',
  'future': '{num}{unit}{sign}',
  'duration': '{num}{unit}',
  'timeSuffixes': ',秒,分鐘?,點|時,日|號,,月,年',
  'ampm': '上午,下午',
  'modifiers': [
    { 'name': 'day', 'src': '大前天', 'value': -3 },
    { 'name': 'day', 'src': '前天', 'value': -2 },
    { 'name': 'day', 'src': '昨天', 'value': -1 },
    { 'name': 'day', 'src': '今天', 'value': 0 },
    { 'name': 'day', 'src': '明天', 'value': 1 },
    { 'name': 'day', 'src': '後天', 'value': 2 },
    { 'name': 'day', 'src': '大後天', 'value': 3 },
    { 'name': 'sign', 'src': '前', 'value': -1 },
    { 'name': 'sign', 'src': '後', 'value': 1 },
    { 'name': 'shift', 'src': '上|去', 'value': -1 },
    { 'name': 'shift', 'src': '這', 'value':  0 },
    { 'name': 'shift', 'src': '下|明', 'value':  1 }
  ],
  'parse': [
    '{num}{unit}{sign}',
    '{shift}{unit:5-7}',
    '{year?}{month}',
    '{year}'
  ],
  'timeParse': [
    '{day|weekday}',
    '{shift}{weekday}',
    '{year?}{month?}{date}'
  ]
});


// This package does not export anything as it is
// simply registering the "zh-TW" locale.

/***/ }),

/***/ "./node_modules/sugar-date/number/day.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/number/day.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.day;

/***/ }),

/***/ "./node_modules/sugar-date/number/dayAfter.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/number/dayAfter.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.dayAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/dayAgo.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/number/dayAgo.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.dayAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/dayBefore.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/number/dayBefore.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.dayBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/dayFromNow.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/dayFromNow.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.dayFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/days.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/number/days.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.days;

/***/ }),

/***/ "./node_modules/sugar-date/number/daysAfter.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/number/daysAfter.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.daysAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/daysAgo.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/number/daysAgo.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.daysAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/daysBefore.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/daysBefore.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.daysBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/daysFromNow.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/daysFromNow.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.daysFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/duration.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/number/duration.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js"),
    LocaleHelpers = __webpack_require__(/*! ../date/var/LocaleHelpers */ "./node_modules/sugar-date/date/var/LocaleHelpers.js");

var localeManager = LocaleHelpers.localeManager;

Sugar.Number.defineInstance({

  'duration': function(n, localeCode) {
    return localeManager.get(localeCode).getDuration(n);
  }

});

module.exports = Sugar.Number.duration;

/***/ }),

/***/ "./node_modules/sugar-date/number/hour.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/number/hour.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.hour;

/***/ }),

/***/ "./node_modules/sugar-date/number/hourAfter.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/number/hourAfter.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.hourAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/hourAgo.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/number/hourAgo.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.hourAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/hourBefore.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/hourBefore.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.hourBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/hourFromNow.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/hourFromNow.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.hourFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/hours.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/number/hours.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.hours;

/***/ }),

/***/ "./node_modules/sugar-date/number/hoursAfter.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/hoursAfter.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.hoursAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/hoursAgo.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/number/hoursAgo.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.hoursAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/hoursBefore.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/hoursBefore.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.hoursBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/hoursFromNow.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/number/hoursFromNow.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.hoursFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/millisecond.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/millisecond.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.millisecond;

/***/ }),

/***/ "./node_modules/sugar-date/number/millisecondAfter.js":
/*!************************************************************!*\
  !*** ./node_modules/sugar-date/number/millisecondAfter.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.millisecondAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/millisecondAgo.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/number/millisecondAgo.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.millisecondAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/millisecondBefore.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/number/millisecondBefore.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.millisecondBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/millisecondFromNow.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/number/millisecondFromNow.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.millisecondFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/milliseconds.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/number/milliseconds.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.milliseconds;

/***/ }),

/***/ "./node_modules/sugar-date/number/millisecondsAfter.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/number/millisecondsAfter.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.millisecondsAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/millisecondsAgo.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/number/millisecondsAgo.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.millisecondsAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/millisecondsBefore.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/number/millisecondsBefore.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.millisecondsBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/millisecondsFromNow.js":
/*!***************************************************************!*\
  !*** ./node_modules/sugar-date/number/millisecondsFromNow.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.millisecondsFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/minute.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/number/minute.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.minute;

/***/ }),

/***/ "./node_modules/sugar-date/number/minuteAfter.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/minuteAfter.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.minuteAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/minuteAgo.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/number/minuteAgo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.minuteAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/minuteBefore.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/number/minuteBefore.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.minuteBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/minuteFromNow.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/number/minuteFromNow.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.minuteFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/minutes.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/number/minutes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.minutes;

/***/ }),

/***/ "./node_modules/sugar-date/number/minutesAfter.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/number/minutesAfter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.minutesAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/minutesAgo.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/minutesAgo.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.minutesAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/minutesBefore.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/number/minutesBefore.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.minutesBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/minutesFromNow.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/number/minutesFromNow.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.minutesFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/month.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/number/month.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.month;

/***/ }),

/***/ "./node_modules/sugar-date/number/monthAfter.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/monthAfter.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.monthAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/monthAgo.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/number/monthAgo.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.monthAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/monthBefore.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/monthBefore.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.monthBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/monthFromNow.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/number/monthFromNow.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.monthFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/months.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/number/months.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.months;

/***/ }),

/***/ "./node_modules/sugar-date/number/monthsAfter.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/monthsAfter.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.monthsAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/monthsAgo.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/number/monthsAgo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.monthsAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/monthsBefore.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/number/monthsBefore.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.monthsBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/monthsFromNow.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/number/monthsFromNow.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.monthsFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/second.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/number/second.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.second;

/***/ }),

/***/ "./node_modules/sugar-date/number/secondAfter.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/secondAfter.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.secondAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/secondAgo.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/number/secondAgo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.secondAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/secondBefore.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/number/secondBefore.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.secondBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/secondFromNow.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/number/secondFromNow.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.secondFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/seconds.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/number/seconds.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.seconds;

/***/ }),

/***/ "./node_modules/sugar-date/number/secondsAfter.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/number/secondsAfter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.secondsAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/secondsAgo.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/secondsAgo.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.secondsAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/secondsBefore.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/number/secondsBefore.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.secondsBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/secondsFromNow.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/number/secondsFromNow.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.secondsFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/week.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/number/week.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.week;

/***/ }),

/***/ "./node_modules/sugar-date/number/weekAfter.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/number/weekAfter.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.weekAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/weekAgo.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/number/weekAgo.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.weekAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/weekBefore.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/weekBefore.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.weekBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/weekFromNow.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/weekFromNow.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.weekFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/weeks.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/number/weeks.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.weeks;

/***/ }),

/***/ "./node_modules/sugar-date/number/weeksAfter.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/weeksAfter.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.weeksAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/weeksAgo.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/number/weeksAgo.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.weeksAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/weeksBefore.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/weeksBefore.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.weeksBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/weeksFromNow.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/number/weeksFromNow.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.weeksFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/year.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/number/year.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.year;

/***/ }),

/***/ "./node_modules/sugar-date/number/yearAfter.js":
/*!*****************************************************!*\
  !*** ./node_modules/sugar-date/number/yearAfter.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.yearAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/yearAgo.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/number/yearAgo.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.yearAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/yearBefore.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/yearBefore.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.yearBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/yearFromNow.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/yearFromNow.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.yearFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/number/years.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/number/years.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.years;

/***/ }),

/***/ "./node_modules/sugar-date/number/yearsAfter.js":
/*!******************************************************!*\
  !*** ./node_modules/sugar-date/number/yearsAfter.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.yearsAfter;

/***/ }),

/***/ "./node_modules/sugar-date/number/yearsAgo.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/number/yearsAgo.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.yearsAgo;

/***/ }),

/***/ "./node_modules/sugar-date/number/yearsBefore.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/number/yearsBefore.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.yearsBefore;

/***/ }),

/***/ "./node_modules/sugar-date/number/yearsFromNow.js":
/*!********************************************************!*\
  !*** ./node_modules/sugar-date/number/yearsFromNow.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

__webpack_require__(/*! ../date/build/buildNumberUnitMethodsCall */ "./node_modules/sugar-date/date/build/buildNumberUnitMethodsCall.js");

module.exports = Sugar.Number.yearsFromNow;

/***/ }),

/***/ "./node_modules/sugar-date/range/build/buildDateRangeUnitsCall.js":
/*!************************************************************************!*\
  !*** ./node_modules/sugar-date/range/build/buildDateRangeUnitsCall.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildDateRangeUnits = __webpack_require__(/*! ../internal/buildDateRangeUnits */ "./node_modules/sugar-date/range/internal/buildDateRangeUnits.js");

buildDateRangeUnits();

/***/ }),

/***/ "./node_modules/sugar-date/range/clamp.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/range/clamp.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    rangeClamp = __webpack_require__(/*! ./internal/rangeClamp */ "./node_modules/sugar-date/range/internal/rangeClamp.js"),
    defineOnPrototype = __webpack_require__(/*! ../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js");

defineOnPrototype(Range, {

  'clamp': function(el) {
    return rangeClamp(this, el);
  }

});

// This package does not export anything as it is
// simply defining "clamp" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/clone.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/range/clone.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    defineOnPrototype = __webpack_require__(/*! ../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js");

defineOnPrototype(Range, {

  'clone': function() {
    return new Range(this.start, this.end);
  }

});

// This package does not export anything as it is
// simply defining "clone" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/contains.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/range/contains.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    defineOnPrototype = __webpack_require__(/*! ../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js");

defineOnPrototype(Range, {

  'contains': function(el) {
    if (el == null) return false;
    if (el.start && el.end) {
      return el.start >= this.start && el.start <= this.end &&
             el.end   >= this.start && el.end   <= this.end;
    } else {
      return el >= this.start && el <= this.end;
    }
  }

});

// This package does not export anything as it is
// simply defining "contains" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/days.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/range/days.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./build/buildDateRangeUnitsCall */ "./node_modules/sugar-date/range/build/buildDateRangeUnitsCall.js");

// This package does not export anything as it is
// simply defining "days" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/every.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/range/every.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    rangeEvery = __webpack_require__(/*! ./internal/rangeEvery */ "./node_modules/sugar-date/range/internal/rangeEvery.js"),
    defineOnPrototype = __webpack_require__(/*! ../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js");

defineOnPrototype(Range, {

  'every': function(amount, everyFn) {
    return rangeEvery(this, amount, false, everyFn);
  }

});

// This package does not export anything as it is
// simply defining "every" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/hours.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/range/hours.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./build/buildDateRangeUnitsCall */ "./node_modules/sugar-date/range/build/buildDateRangeUnitsCall.js");

// This package does not export anything as it is
// simply defining "hours" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/index.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/range/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Static Methods
__webpack_require__(/*! ../date/range */ "./node_modules/sugar-date/date/range.js");

// Prototype Methods
__webpack_require__(/*! ./clamp */ "./node_modules/sugar-date/range/clamp.js");
__webpack_require__(/*! ./clone */ "./node_modules/sugar-date/range/clone.js");
__webpack_require__(/*! ./contains */ "./node_modules/sugar-date/range/contains.js");
__webpack_require__(/*! ./days */ "./node_modules/sugar-date/range/days.js");
__webpack_require__(/*! ./every */ "./node_modules/sugar-date/range/every.js");
__webpack_require__(/*! ./hours */ "./node_modules/sugar-date/range/hours.js");
__webpack_require__(/*! ./intersect */ "./node_modules/sugar-date/range/intersect.js");
__webpack_require__(/*! ./isValid */ "./node_modules/sugar-date/range/isValid.js");
__webpack_require__(/*! ./milliseconds */ "./node_modules/sugar-date/range/milliseconds.js");
__webpack_require__(/*! ./minutes */ "./node_modules/sugar-date/range/minutes.js");
__webpack_require__(/*! ./months */ "./node_modules/sugar-date/range/months.js");
__webpack_require__(/*! ./seconds */ "./node_modules/sugar-date/range/seconds.js");
__webpack_require__(/*! ./span */ "./node_modules/sugar-date/range/span.js");
__webpack_require__(/*! ./toArray */ "./node_modules/sugar-date/range/toArray.js");
__webpack_require__(/*! ./toString */ "./node_modules/sugar-date/range/toString.js");
__webpack_require__(/*! ./union */ "./node_modules/sugar-date/range/union.js");
__webpack_require__(/*! ./weeks */ "./node_modules/sugar-date/range/weeks.js");
__webpack_require__(/*! ./years */ "./node_modules/sugar-date/range/years.js");

module.exports = __webpack_require__(/*! sugar-core */ "./node_modules/sugar-core/sugar-core.js");

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/Range.js":
/*!*********************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/Range.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cloneRangeMember = __webpack_require__(/*! ./cloneRangeMember */ "./node_modules/sugar-date/range/internal/cloneRangeMember.js");

function Range(start, end) {
  this.start = cloneRangeMember(start);
  this.end   = cloneRangeMember(end);
}

module.exports = Range;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/buildDateRangeUnits.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/buildDateRangeUnits.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MULTIPLIERS = __webpack_require__(/*! ../var/MULTIPLIERS */ "./node_modules/sugar-date/range/var/MULTIPLIERS.js"),
    DURATION_UNITS = __webpack_require__(/*! ../var/DURATION_UNITS */ "./node_modules/sugar-date/range/var/DURATION_UNITS.js"),
    Range = __webpack_require__(/*! ./Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    trunc = __webpack_require__(/*! ../../common/var/trunc */ "./node_modules/sugar-date/common/var/trunc.js"),
    forEach = __webpack_require__(/*! ../../common/internal/forEach */ "./node_modules/sugar-date/common/internal/forEach.js"),
    rangeEvery = __webpack_require__(/*! ./rangeEvery */ "./node_modules/sugar-date/range/internal/rangeEvery.js"),
    simpleCapitalize = __webpack_require__(/*! ../../common/internal/simpleCapitalize */ "./node_modules/sugar-date/common/internal/simpleCapitalize.js"),
    defineOnPrototype = __webpack_require__(/*! ../../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js");

function buildDateRangeUnits() {
  var methods = {};
  forEach(DURATION_UNITS.split('|'), function(unit, i) {
    var name = unit + 's', mult, fn;
    if (i < 4) {
      fn = function() {
        return rangeEvery(this, unit, true);
      };
    } else {
      mult = MULTIPLIERS[simpleCapitalize(name)];
      fn = function() {
        return trunc((this.end - this.start) / mult);
      };
    }
    methods[name] = fn;
  });
  defineOnPrototype(Range, methods);
}

module.exports = buildDateRangeUnits;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/cloneRangeMember.js":
/*!********************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/cloneRangeMember.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    getRangeMemberPrimitiveValue = __webpack_require__(/*! ./getRangeMemberPrimitiveValue */ "./node_modules/sugar-date/range/internal/getRangeMemberPrimitiveValue.js");

var isDate = classChecks.isDate;

function cloneRangeMember(m) {
  if (isDate(m)) {
    return new Date(m.getTime());
  } else {
    return getRangeMemberPrimitiveValue(m);
  }
}

module.exports = cloneRangeMember;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/createDateRangeFromString.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/createDateRangeFromString.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    DurationTextFormats = __webpack_require__(/*! ../var/DurationTextFormats */ "./node_modules/sugar-date/range/var/DurationTextFormats.js"),
    incrementDate = __webpack_require__(/*! ./incrementDate */ "./node_modules/sugar-date/range/internal/incrementDate.js"),
    getDateForRange = __webpack_require__(/*! ./getDateForRange */ "./node_modules/sugar-date/range/internal/getDateForRange.js"),
    namespaceAliases = __webpack_require__(/*! ../../common/var/namespaceAliases */ "./node_modules/sugar-date/common/var/namespaceAliases.js"),
    getDateIncrementObject = __webpack_require__(/*! ./getDateIncrementObject */ "./node_modules/sugar-date/range/internal/getDateIncrementObject.js");

var sugarDate = namespaceAliases.sugarDate,
    RANGE_REG_FROM_TO = DurationTextFormats.RANGE_REG_FROM_TO,
    RANGE_REG_REAR_DURATION = DurationTextFormats.RANGE_REG_REAR_DURATION,
    RANGE_REG_FRONT_DURATION = DurationTextFormats.RANGE_REG_FRONT_DURATION;

function createDateRangeFromString(str) {
  var match, datetime, duration, dio, start, end;
  if (sugarDate.get && (match = str.match(RANGE_REG_FROM_TO))) {
    start = getDateForRange(match[1].replace('from', 'at'));
    end = sugarDate.get(start, match[2]);
    return new Range(start, end);
  }
  if (match = str.match(RANGE_REG_FRONT_DURATION)) {
    duration = match[1];
    datetime = match[2];
  }
  if (match = str.match(RANGE_REG_REAR_DURATION)) {
    datetime = match[1];
    duration = match[2];
  }
  if (datetime && duration) {
    start = getDateForRange(datetime);
    dio = getDateIncrementObject(duration);
    end = incrementDate(start, dio[0], dio[1]);
  } else {
    start = str;
  }
  return new Range(getDateForRange(start), getDateForRange(end));
}

module.exports = createDateRangeFromString;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/getDateForRange.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/getDateForRange.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    namespaceAliases = __webpack_require__(/*! ../../common/var/namespaceAliases */ "./node_modules/sugar-date/common/var/namespaceAliases.js");

var isDate = classChecks.isDate,
    sugarDate = namespaceAliases.sugarDate;

function getDateForRange(d) {
  if (isDate(d)) {
    return d;
  } else if (d == null) {
    return new Date();
  } else if (sugarDate.create) {
    return sugarDate.create(d);
  }
  return new Date(d);
}

module.exports = getDateForRange;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/getDateIncrementObject.js":
/*!**************************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/getDateIncrementObject.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DURATION_REG = __webpack_require__(/*! ../var/DURATION_REG */ "./node_modules/sugar-date/range/var/DURATION_REG.js"),
    classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    simpleCapitalize = __webpack_require__(/*! ../../common/internal/simpleCapitalize */ "./node_modules/sugar-date/common/internal/simpleCapitalize.js");

var isNumber = classChecks.isNumber;

function getDateIncrementObject(amt) {
  var match, val, unit;
  if (isNumber(amt)) {
    return [amt, 'Milliseconds'];
  }
  match = amt.match(DURATION_REG);
  val = +match[1] || 1;
  unit = simpleCapitalize(match[2].toLowerCase());
  if (unit.match(/hour|minute|second/i)) {
    unit += 's';
  } else if (unit === 'Year') {
    unit = 'FullYear';
  } else if (unit === 'Week') {
    unit = 'Date';
    val *= 7;
  } else if (unit === 'Day') {
    unit = 'Date';
  }
  return [val, unit];
}

module.exports = getDateIncrementObject;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/getGreaterPrecision.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/getGreaterPrecision.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mathAliases = __webpack_require__(/*! ../../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js"),
    getPrecision = __webpack_require__(/*! ./getPrecision */ "./node_modules/sugar-date/range/internal/getPrecision.js");

var max = mathAliases.max;

function getGreaterPrecision(n1, n2) {
  return max(getPrecision(n1), getPrecision(n2));
}

module.exports = getGreaterPrecision;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/getPrecision.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/getPrecision.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var periodSplit = __webpack_require__(/*! ../../common/internal/periodSplit */ "./node_modules/sugar-date/common/internal/periodSplit.js");

function getPrecision(n) {
  var split = periodSplit(n.toString());
  return split[1] ? split[1].length : 0;
}

module.exports = getPrecision;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/getRangeMemberNumericValue.js":
/*!******************************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/getRangeMemberNumericValue.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js");

var isString = classChecks.isString;

function getRangeMemberNumericValue(m) {
  return isString(m) ? m.charCodeAt(0) : m;
}

module.exports = getRangeMemberNumericValue;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/getRangeMemberPrimitiveValue.js":
/*!********************************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/getRangeMemberPrimitiveValue.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js");

var isDate = classChecks.isDate;

function getRangeMemberPrimitiveValue(m) {
  if (m == null) return m;
  return isDate(m) ? m.getTime() : m.valueOf();
}

module.exports = getRangeMemberPrimitiveValue;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/incrementDate.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/incrementDate.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MULTIPLIERS = __webpack_require__(/*! ../var/MULTIPLIERS */ "./node_modules/sugar-date/range/var/MULTIPLIERS.js"),
    callDateSet = __webpack_require__(/*! ../../common/internal/callDateSet */ "./node_modules/sugar-date/common/internal/callDateSet.js"),
    callDateGet = __webpack_require__(/*! ../../common/internal/callDateGet */ "./node_modules/sugar-date/common/internal/callDateGet.js");

function incrementDate(src, amount, unit) {
  var mult = MULTIPLIERS[unit], d;
  if (mult) {
    d = new Date(src.getTime() + (amount * mult));
  } else {
    d = new Date(src);
    callDateSet(d, unit, callDateGet(src, unit) + amount);
  }
  return d;
}

module.exports = incrementDate;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/incrementNumber.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/incrementNumber.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var withPrecision = __webpack_require__(/*! ../../common/internal/withPrecision */ "./node_modules/sugar-date/common/internal/withPrecision.js");

function incrementNumber(current, amount, precision) {
  return withPrecision(current + amount, precision);
}

module.exports = incrementNumber;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/incrementString.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/incrementString.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var chr = __webpack_require__(/*! ../../common/var/chr */ "./node_modules/sugar-date/common/var/chr.js");

function incrementString(current, amount) {
  return chr(current.charCodeAt(0) + amount);
}

module.exports = incrementString;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/isValidRangeMember.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/isValidRangeMember.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var valueIsNotInfinite = __webpack_require__(/*! ./valueIsNotInfinite */ "./node_modules/sugar-date/range/internal/valueIsNotInfinite.js"),
    getRangeMemberPrimitiveValue = __webpack_require__(/*! ./getRangeMemberPrimitiveValue */ "./node_modules/sugar-date/range/internal/getRangeMemberPrimitiveValue.js");

function isValidRangeMember(m) {
  var val = getRangeMemberPrimitiveValue(m);
  return (!!val || val === 0) && valueIsNotInfinite(m);
}

module.exports = isValidRangeMember;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/rangeClamp.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/rangeClamp.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cloneRangeMember = __webpack_require__(/*! ./cloneRangeMember */ "./node_modules/sugar-date/range/internal/cloneRangeMember.js");

function rangeClamp(range, obj) {
  var clamped,
      start = range.start,
      end = range.end,
      min = end < start ? end : start,
      max = start > end ? start : end;
  if (obj < min) {
    clamped = min;
  } else if (obj > max) {
    clamped = max;
  } else {
    clamped = obj;
  }
  return cloneRangeMember(clamped);
}

module.exports = rangeClamp;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/rangeEvery.js":
/*!**************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/rangeEvery.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    rangeIsValid = __webpack_require__(/*! ./rangeIsValid */ "./node_modules/sugar-date/range/internal/rangeIsValid.js"),
    incrementDate = __webpack_require__(/*! ./incrementDate */ "./node_modules/sugar-date/range/internal/incrementDate.js"),
    incrementNumber = __webpack_require__(/*! ./incrementNumber */ "./node_modules/sugar-date/range/internal/incrementNumber.js"),
    incrementString = __webpack_require__(/*! ./incrementString */ "./node_modules/sugar-date/range/internal/incrementString.js"),
    getGreaterPrecision = __webpack_require__(/*! ./getGreaterPrecision */ "./node_modules/sugar-date/range/internal/getGreaterPrecision.js"),
    getDateIncrementObject = __webpack_require__(/*! ./getDateIncrementObject */ "./node_modules/sugar-date/range/internal/getDateIncrementObject.js");

var isNumber = classChecks.isNumber,
    isString = classChecks.isString,
    isDate = classChecks.isDate,
    isFunction = classChecks.isFunction;

function rangeEvery(range, step, countOnly, fn) {
  var increment,
      precision,
      dio,
      unit,
      start   = range.start,
      end     = range.end,
      inverse = end < start,
      current = start,
      index   = 0,
      result  = [];

  if (!rangeIsValid(range)) {
    return countOnly ? NaN : [];
  }
  if (isFunction(step)) {
    fn = step;
    step = null;
  }
  step = step || 1;
  if (isNumber(start)) {
    precision = getGreaterPrecision(start, step);
    increment = function() {
      return incrementNumber(current, step, precision);
    };
  } else if (isString(start)) {
    increment = function() {
      return incrementString(current, step);
    };
  } else if (isDate(start)) {
    dio  = getDateIncrementObject(step);
    step = dio[0];
    unit = dio[1];
    increment = function() {
      return incrementDate(current, step, unit);
    };
  }
  // Avoiding infinite loops
  if (inverse && step > 0) {
    step *= -1;
  }
  while(inverse ? current >= end : current <= end) {
    if (!countOnly) {
      result.push(current);
    }
    if (fn) {
      fn(current, index, range);
    }
    current = increment();
    index++;
  }
  return countOnly ? index - 1 : result;
}

module.exports = rangeEvery;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/rangeIsValid.js":
/*!****************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/rangeIsValid.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValidRangeMember = __webpack_require__(/*! ./isValidRangeMember */ "./node_modules/sugar-date/range/internal/isValidRangeMember.js");

function rangeIsValid(range) {
  return isValidRangeMember(range.start) &&
         isValidRangeMember(range.end) &&
         typeof range.start === typeof range.end;
}

module.exports = rangeIsValid;

/***/ }),

/***/ "./node_modules/sugar-date/range/internal/valueIsNotInfinite.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sugar-date/range/internal/valueIsNotInfinite.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function valueIsNotInfinite(m) {
  return m !== -Infinity && m !== Infinity;
}

module.exports = valueIsNotInfinite;

/***/ }),

/***/ "./node_modules/sugar-date/range/intersect.js":
/*!****************************************************!*\
  !*** ./node_modules/sugar-date/range/intersect.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    defineOnPrototype = __webpack_require__(/*! ../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js");

defineOnPrototype(Range, {

  'intersect': function(range) {
    if (range.start > this.end || range.end < this.start) {
      return new Range(NaN, NaN);
    }
    return new Range(
      this.start > range.start ? this.start : range.start,
      this.end   < range.end   ? this.end   : range.end
    );
  }

});

// This package does not export anything as it is
// simply defining "intersect" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/isValid.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/range/isValid.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    rangeIsValid = __webpack_require__(/*! ./internal/rangeIsValid */ "./node_modules/sugar-date/range/internal/rangeIsValid.js"),
    defineOnPrototype = __webpack_require__(/*! ../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js");

defineOnPrototype(Range, {

  'isValid': function() {
    return rangeIsValid(this);
  }

});

// This package does not export anything as it is
// simply defining "isValid" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/milliseconds.js":
/*!*******************************************************!*\
  !*** ./node_modules/sugar-date/range/milliseconds.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./build/buildDateRangeUnitsCall */ "./node_modules/sugar-date/range/build/buildDateRangeUnitsCall.js");

// This package does not export anything as it is
// simply defining "milliseconds" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/minutes.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/range/minutes.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./build/buildDateRangeUnitsCall */ "./node_modules/sugar-date/range/build/buildDateRangeUnitsCall.js");

// This package does not export anything as it is
// simply defining "minutes" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/months.js":
/*!*************************************************!*\
  !*** ./node_modules/sugar-date/range/months.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./build/buildDateRangeUnitsCall */ "./node_modules/sugar-date/range/build/buildDateRangeUnitsCall.js");

// This package does not export anything as it is
// simply defining "months" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/seconds.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/range/seconds.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./build/buildDateRangeUnitsCall */ "./node_modules/sugar-date/range/build/buildDateRangeUnitsCall.js");

// This package does not export anything as it is
// simply defining "seconds" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/span.js":
/*!***********************************************!*\
  !*** ./node_modules/sugar-date/range/span.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    mathAliases = __webpack_require__(/*! ../common/var/mathAliases */ "./node_modules/sugar-date/common/var/mathAliases.js"),
    rangeIsValid = __webpack_require__(/*! ./internal/rangeIsValid */ "./node_modules/sugar-date/range/internal/rangeIsValid.js"),
    defineOnPrototype = __webpack_require__(/*! ../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js"),
    getRangeMemberNumericValue = __webpack_require__(/*! ./internal/getRangeMemberNumericValue */ "./node_modules/sugar-date/range/internal/getRangeMemberNumericValue.js");

var abs = mathAliases.abs;

defineOnPrototype(Range, {

  'span': function() {
    var n = getRangeMemberNumericValue(this.end) - getRangeMemberNumericValue(this.start);
    return rangeIsValid(this) ? abs(n) + 1 : NaN;
  }

});

// This package does not export anything as it is
// simply defining "span" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/toArray.js":
/*!**************************************************!*\
  !*** ./node_modules/sugar-date/range/toArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    rangeEvery = __webpack_require__(/*! ./internal/rangeEvery */ "./node_modules/sugar-date/range/internal/rangeEvery.js"),
    defineOnPrototype = __webpack_require__(/*! ../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js");

defineOnPrototype(Range, {

  'toArray': function() {
    return rangeEvery(this);
  }

});

// This package does not export anything as it is
// simply defining "toArray" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/toString.js":
/*!***************************************************!*\
  !*** ./node_modules/sugar-date/range/toString.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    rangeIsValid = __webpack_require__(/*! ./internal/rangeIsValid */ "./node_modules/sugar-date/range/internal/rangeIsValid.js"),
    defineOnPrototype = __webpack_require__(/*! ../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js");

defineOnPrototype(Range, {

  'toString': function() {
    return rangeIsValid(this) ? this.start + '..' + this.end : 'Invalid Range';
  }

});

// This package does not export anything as it is
// simply defining "toString" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/union.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/range/union.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ./internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    defineOnPrototype = __webpack_require__(/*! ../common/internal/defineOnPrototype */ "./node_modules/sugar-date/common/internal/defineOnPrototype.js");

defineOnPrototype(Range, {

  'union': function(range) {
    return new Range(
      this.start < range.start ? this.start : range.start,
      this.end   > range.end   ? this.end   : range.end
    );
  }

});

// This package does not export anything as it is
// simply defining "union" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/var/DURATION_REG.js":
/*!***********************************************************!*\
  !*** ./node_modules/sugar-date/range/var/DURATION_REG.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DURATION_UNITS = __webpack_require__(/*! ./DURATION_UNITS */ "./node_modules/sugar-date/range/var/DURATION_UNITS.js");

module.exports = RegExp('(\\d+)?\\s*('+ DURATION_UNITS +')s?', 'i');

/***/ }),

/***/ "./node_modules/sugar-date/range/var/DURATION_UNITS.js":
/*!*************************************************************!*\
  !*** ./node_modules/sugar-date/range/var/DURATION_UNITS.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 'year|month|week|day|hour|minute|second|millisecond';

/***/ }),

/***/ "./node_modules/sugar-date/range/var/DateRangeConstructor.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sugar-date/range/var/DateRangeConstructor.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(/*! ../internal/Range */ "./node_modules/sugar-date/range/internal/Range.js"),
    classChecks = __webpack_require__(/*! ../../common/var/classChecks */ "./node_modules/sugar-date/common/var/classChecks.js"),
    getDateForRange = __webpack_require__(/*! ../internal/getDateForRange */ "./node_modules/sugar-date/range/internal/getDateForRange.js"),
    createDateRangeFromString = __webpack_require__(/*! ../internal/createDateRangeFromString */ "./node_modules/sugar-date/range/internal/createDateRangeFromString.js");

var isString = classChecks.isString;

var DateRangeConstructor = function(start, end) {
  if (arguments.length === 1 && isString(start)) {
    return createDateRangeFromString(start);
  }
  return new Range(getDateForRange(start), getDateForRange(end));
};

module.exports = DateRangeConstructor;

/***/ }),

/***/ "./node_modules/sugar-date/range/var/DurationTextFormats.js":
/*!******************************************************************!*\
  !*** ./node_modules/sugar-date/range/var/DurationTextFormats.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FULL_CAPTURED_DURATION = __webpack_require__(/*! ./FULL_CAPTURED_DURATION */ "./node_modules/sugar-date/range/var/FULL_CAPTURED_DURATION.js");

module.exports = {
  RANGE_REG_FROM_TO: /(?:from)?\s*(.+)\s+(?:to|until)\s+(.+)$/i,
  RANGE_REG_REAR_DURATION: RegExp('(.+)\\s*for\\s*' + FULL_CAPTURED_DURATION, 'i'),
  RANGE_REG_FRONT_DURATION: RegExp('(?:for)?\\s*'+ FULL_CAPTURED_DURATION +'\\s*(?:starting)?\\s(?:at\\s)?(.+)', 'i')
};

/***/ }),

/***/ "./node_modules/sugar-date/range/var/FULL_CAPTURED_DURATION.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sugar-date/range/var/FULL_CAPTURED_DURATION.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DURATION_UNITS = __webpack_require__(/*! ./DURATION_UNITS */ "./node_modules/sugar-date/range/var/DURATION_UNITS.js");

module.exports = '((?:\\d+)?\\s*(?:' + DURATION_UNITS + '))s?';

/***/ }),

/***/ "./node_modules/sugar-date/range/var/MULTIPLIERS.js":
/*!**********************************************************!*\
  !*** ./node_modules/sugar-date/range/var/MULTIPLIERS.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MULTIPLIERS = {
  'Hours': 60 * 60 * 1000,
  'Minutes': 60 * 1000,
  'Seconds': 1000,
  'Milliseconds': 1
};

module.exports = MULTIPLIERS;

/***/ }),

/***/ "./node_modules/sugar-date/range/weeks.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/range/weeks.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./build/buildDateRangeUnitsCall */ "./node_modules/sugar-date/range/build/buildDateRangeUnitsCall.js");

// This package does not export anything as it is
// simply defining "weeks" on Range.prototype.

/***/ }),

/***/ "./node_modules/sugar-date/range/years.js":
/*!************************************************!*\
  !*** ./node_modules/sugar-date/range/years.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./build/buildDateRangeUnitsCall */ "./node_modules/sugar-date/range/build/buildDateRangeUnitsCall.js");

// This package does not export anything as it is
// simply defining "years" on Range.prototype.

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/array.js":
/*!**********************!*\
  !*** ./src/array.js ***!
  \**********************/
/*! exports provided: has */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has; });
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string */ "./src/string.js");
/**
 * Array utilities
 */

/**
 * Checks if given item can be found in the passed collection
 * @param  {Array} arr  collection
 * @param  {Any} val  item to search
 * @param  {Boolean} caseSensitive respects case if true
 * @return {Boolean}
 */

var has = function has(arr, val, caseSensitive) {
  var sCase = Boolean(caseSensitive);

  for (var i = 0, l = arr.length; i < l; i++) {
    if (Object(_string__WEBPACK_IMPORTED_MODULE_0__["matchCase"])(arr[i].toString(), sCase) === val) {
      return true;
    }
  }

  return false;
};

/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: INPUT, SELECT, MULTIPLE, CHECKLIST, NONE, ENTER_KEY, TAB_KEY, ESC_KEY, UP_ARROW_KEY, DOWN_ARROW_KEY, HEADER_TAG, CELL_TAG, STRING, NUMBER, FORMATTED_NUMBER, DATE, IP_ADDRESS, AUTO_FILTER_DELAY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INPUT", function() { return INPUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT", function() { return SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MULTIPLE", function() { return MULTIPLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECKLIST", function() { return CHECKLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NONE", function() { return NONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENTER_KEY", function() { return ENTER_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TAB_KEY", function() { return TAB_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ESC_KEY", function() { return ESC_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UP_ARROW_KEY", function() { return UP_ARROW_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOWN_ARROW_KEY", function() { return DOWN_ARROW_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_TAG", function() { return HEADER_TAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CELL_TAG", function() { return CELL_TAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRING", function() { return STRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUMBER", function() { return NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORMATTED_NUMBER", function() { return FORMATTED_NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE", function() { return DATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IP_ADDRESS", function() { return IP_ADDRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTO_FILTER_DELAY", function() { return AUTO_FILTER_DELAY; });
/**
 * Filter types
 */

/**
 * Input filter type
 * @type {String}
 */
var INPUT = 'input';
/**
 * Select filter type
 * @type {String}
 */

var SELECT = 'select';
/**
 * Multiple select filter type
 * @type {String}
 */

var MULTIPLE = 'multiple';
/**
 * Checklist filter type
 * @type {String}
 */

var CHECKLIST = 'checklist';
/**
 * None filter type
 * @type {String}
 */

var NONE = 'none';
/**
 * Key codes
 */

/**
 * Enter key code
 * @type {Number}
 */

var ENTER_KEY = 13;
/**
 * Tab key code
 * @type {Number}
 */

var TAB_KEY = 9;
/**
 * Escape key code
 * @type {Number}
 */

var ESC_KEY = 27;
/**
 * Up arrow key code
 * @type {Number}
 */

var UP_ARROW_KEY = 38;
/**
 * Down arrow key code
 * @type {Number}
 */

var DOWN_ARROW_KEY = 40;
/**
 * HTML tags
 */

/**
 * Header cell tag
 * @type {String}
 */

var HEADER_TAG = 'TH';
/**
 * Cell tag
 * @type {String}
 */

var CELL_TAG = 'TD';
/**
 * Data types
 */

/**
 * String
 * @type {String}
 */

var STRING = 'string';
/**
 * Number
 * @type {String}
 */

var NUMBER = 'number';
/**
 * Formatted number
 * @type {String}
 */

var FORMATTED_NUMBER = 'formatted-number';
/**
 * Date
 * @type {String}
 */

var DATE = 'date';
/**
 * IP address
 * @type {String}
 */

var IP_ADDRESS = 'ipaddress';
/**
 * Default values
 */

/**
 * Auto filter delay in milliseconds
 * @type {Number}
 */

var AUTO_FILTER_DELAY = 750;

/***/ }),

/***/ "./src/cookie.js":
/*!***********************!*\
  !*** ./src/cookie.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./root */ "./src/root.js");

/**
 * Cookie utilities
 */

var doc = _root__WEBPACK_IMPORTED_MODULE_0__["root"].document;
/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * Write a cookie
   * @param {String} name Name of the cookie
   * @param {String} value Value of the cookie
   * @param {Number} hours Cookie duration in hours
   */
  write: function write(name, value, hours) {
    var expire = '';

    if (hours) {
      expire = new Date(new Date().getTime() + hours * 3600000);
      expire = '; expires=' + expire.toGMTString();
    }

    doc.cookie = name + '=' + escape(value) + expire;
  },

  /**
   * Read a cookie
   * @param {String} name Name of the cookie
   * @returns {String} Value of the cookie
   */
  read: function read(name) {
    var cookieValue = '',
        search = name + '=';

    if (doc.cookie.length > 0) {
      var cookie = doc.cookie,
          offset = cookie.indexOf(search);

      if (offset !== -1) {
        offset += search.length;
        var end = cookie.indexOf(';', offset);

        if (end === -1) {
          end = cookie.length;
        }

        cookieValue = unescape(cookie.substring(offset, end));
      }
    }

    return cookieValue;
  },

  /**
   * Remove a cookie
   * @param {String} name Name of the cookie
   */
  remove: function remove(name) {
    this.write(name, '', -1);
  }
});

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/*! exports provided: getText, getFirstTextNode, createElm, removeElm, createText, hasClass, addClass, removeClass, createOpt, createCheckItem, elm, tag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getText", function() { return getText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstTextNode", function() { return getFirstTextNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElm", function() { return createElm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeElm", function() { return removeElm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createText", function() { return createText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createOpt", function() { return createOpt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCheckItem", function() { return createCheckItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elm", function() { return elm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tag", function() { return tag; });
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./root */ "./src/root.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/types.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./string */ "./src/string.js");



/**
 * DOM utilities
 */

var doc = _root__WEBPACK_IMPORTED_MODULE_0__["root"].document;
/**
 * Returns text + text of children of given node
 * @param  {NodeElement} node
 * @return {String}
 */

var getText = function getText(node) {
  if (Object(_types__WEBPACK_IMPORTED_MODULE_1__["isUndef"])(node.textContent)) {
    return Object(_string__WEBPACK_IMPORTED_MODULE_2__["trim"])(node.innerText);
  }

  return Object(_string__WEBPACK_IMPORTED_MODULE_2__["trim"])(node.textContent);
};
/**
 * Returns the first text node contained in the supplied node
 * @param  {NodeElement} node node
 * @return {String}
 */

var getFirstTextNode = function getFirstTextNode(node) {
  for (var i = 0; i < node.childNodes.length; i++) {
    var n = node.childNodes[i];

    if (n.nodeType === 3) {
      return n.data;
    }
  }
};
/**
 * Creates an html element with given collection of attributes
 * @param  {String} tag html tag name
 * @param  {Array} an undetermined number of arrays containing the with 2
 *                    items, the attribute name and its value ['id','myId']
 * @return {Object}     created element
 */

var createElm = function createElm() {
  var tag = arguments.length <= 0 ? undefined : arguments[0];

  if (!Object(_types__WEBPACK_IMPORTED_MODULE_1__["isString"])(tag)) {
    return null;
  }

  var el = doc.createElement(tag);

  for (var i = 0; i < arguments.length; i++) {
    var arg = i < 0 || arguments.length <= i ? undefined : arguments[i];

    if (Object(_types__WEBPACK_IMPORTED_MODULE_1__["isArray"])(arg) && arg.length === 2) {
      el.setAttribute(arg[0], arg[1]);
    }
  }

  return el;
};
/**
 * Removes passed node from DOM
 * @param  {DOMElement} node
 * @return {DOMElement} old node reference
 */

var removeElm = function removeElm(node) {
  return node.parentNode.removeChild(node);
};
/**
 * Returns a text node with given text
 * @param  {String} txt
 * @return {Object}
 */

var createText = function createText(txt) {
  return doc.createTextNode(txt);
};
/**
 * Determine whether the passed elements is assigned the given class
 * @param {DOMElement} ele DOM element
 * @param {String} cls CSS class name
 * @returns {Boolean}
 */

var hasClass = function hasClass(ele, cls) {
  if (Object(_types__WEBPACK_IMPORTED_MODULE_1__["isUndef"])(ele)) {
    return false;
  }

  if (supportsClassList()) {
    return ele.classList.contains(cls);
  }

  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
/**
 * Adds the specified class to the passed element
 * @param {DOMElement} ele DOM element
 * @param {String} cls CSS class name
 */

var addClass = function addClass(ele, cls) {
  if (Object(_types__WEBPACK_IMPORTED_MODULE_1__["isUndef"])(ele)) {
    return;
  }

  if (supportsClassList()) {
    ele.classList.add(cls);
    return;
  }

  if (ele.className === '') {
    ele.className = cls;
  } else if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
};
/**
 * Removes the specified class to the passed element
 * @param {DOMElement} ele DOM element
 * @param {String} cls CSS class name
 */

var removeClass = function removeClass(ele, cls) {
  if (Object(_types__WEBPACK_IMPORTED_MODULE_1__["isUndef"])(ele)) {
    return;
  }

  if (supportsClassList()) {
    ele.classList.remove(cls);
    return;
  }

  var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'g');
  ele.className = ele.className.replace(reg, '');
};
/**
 * Creates and returns an option element
 * @param  {String}  text  option text
 * @param  {String}  value option value
 * @param  {Boolean} isSel whether option is selected
 * @return {Object}        option element
 */

var createOpt = function createOpt(text, value, isSel) {
  var isSelected = isSel ? true : false;
  var opt = isSelected ? createElm('option', ['value', value], ['selected', 'true']) : createElm('option', ['value', value]);
  opt.appendChild(createText(text));
  return opt;
};
/**
 * Creates and returns a checklist item
 * @param  {String} id  index of check item
 * @param  {String} chkValue  check item value
 * @param  {String} labelText check item label text
 * @param  {Array} extraAttr  array containing attribute name and its value
 * @return {Object}           li DOM element
 */

var createCheckItem = function createCheckItem(id, chkValue, labelText) {
  var extraAttr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var li = createElm('li');
  var label = createElm('label', ['for', id]);
  var check = createElm('input', ['id', id], ['name', id], ['type', 'checkbox'], ['value', chkValue], extraAttr);
  label.appendChild(check);
  label.appendChild(createText(labelText));
  li.appendChild(label);
  li.label = label;
  li.check = check;
  return li;
};
/**
 * Returns the element matching the supplied Id
 * @param  {String} id  Element identifier
 * @return {DOMElement}
 */

var elm = function elm(id) {
  return doc.getElementById(id);
};
/**
 * Returns list of element matching the supplied tag name
 * @param  {String} tagname  Tag name
 * @return {NodeList}
 */

var tag = function tag(o, tagname) {
  return o.getElementsByTagName(tagname);
}; // HTML5 classList API

function supportsClassList() {
  return doc.documentElement.classList;
}

/***/ }),

/***/ "./src/emitter.js":
/*!************************!*\
  !*** ./src/emitter.js ***!
  \************************/
/*! exports provided: Emitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Emitter", function() { return Emitter; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Event emitter class
 */
var Emitter = /*#__PURE__*/function () {
  /**
   * Creates an instance of Emitter.
   */
  function Emitter() {
    _classCallCheck(this, Emitter);

    /**
     * Events object
     * @type {Object}
     */
    this.events = {};
  }
  /**
   * Subscribe to an event
   * @param  {Array}   evts Collection of event names
   * @param  {Function} fn  Function invoked when event is emitted
   */


  _createClass(Emitter, [{
    key: "on",
    value: function on(evts, fn) {
      var _this = this;

      evts.forEach(function (evt) {
        _this.events[evt] = _this.events[evt] || [];

        _this.events[evt].push(fn);
      });
    }
    /**
     * Unsubscribe to an event
     * @param  {Array}   evts Collection of event names
     * @param  {Function} fn  Function invoked when event is emitted
     */

  }, {
    key: "off",
    value: function off(evts, fn) {
      var _this2 = this;

      evts.forEach(function (evt) {
        if (evt in _this2.events) {
          _this2.events[evt].splice(_this2.events[evt].indexOf(fn), 1);
        }
      });
    }
    /**
     * Emit an event
     * @param  {String} evt Event name followed by any other argument passed to
     * the invoked function
     */

  }, {
    key: "emit",
    value: function emit(evt
    /*, args...*/
    ) {
      if (evt in this.events) {
        for (var i = 0; i < this.events[evt].length; i++) {
          this.events[evt][i].apply(this, [].slice.call(arguments, 1));
        }
      }
    }
  }]);

  return Emitter;
}();

/***/ }),

/***/ "./src/event.js":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/*! exports provided: addEvt, removeEvt, stopEvt, cancelEvt, targetEvt, keyCode, isKeyPressed, bound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEvt", function() { return addEvt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEvt", function() { return removeEvt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopEvt", function() { return stopEvt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelEvt", function() { return cancelEvt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetEvt", function() { return targetEvt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyCode", function() { return keyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKeyPressed", function() { return isKeyPressed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bound", function() { return bound; });
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./root */ "./src/root.js");

/**
 * DOM event utilities
 */

/**
 * Add event handler for specified event on passed element
 *
 * @param {DOMElement} obj Element
 * @param {String} type Event type
 * @param {Function} Handler
 * @param {Boolean} capture Specifiy whether the event should be executed in
 * the capturing or in the bubbling phase
 */

var addEvt = function addEvt(obj, type, func, capture) {
  if (obj.addEventListener) {
    obj.addEventListener(type, func, capture);
  } else if (obj.attachEvent) {
    obj.attachEvent('on' + type, func);
  } else {
    obj['on' + type] = func;
  }
};
/**
 * Remove event handler for specified event on passed element
 *
 * @param {DOMElement} obj Element
 * @param {String} type Event type
 * @param {Function} Handler
 * @param {Boolean} capture Specifiy whether the event should be executed in
 * the capturing or in the bubbling phase
 */

var removeEvt = function removeEvt(obj, type, func, capture) {
  if (obj.removeEventListener) {
    obj.removeEventListener(type, func, capture);
  } else if (obj.detachEvent) {
    obj.detachEvent('on' + type, func);
  } else {
    obj['on' + type] = null;
  }
};
/**
 * Prevents further propagation of the current event in the bubbling phase
 *
 * @param {Event} evt Event on the DOM
 */

var stopEvt = function stopEvt(evt) {
  if (!evt) {
    evt = _root__WEBPACK_IMPORTED_MODULE_0__["root"].event;
  }

  if (evt.stopPropagation) {
    evt.stopPropagation();
  } else {
    evt.cancelBubble = true;
  }
};
/**
 * Cancels the event if it is cancelable, without stopping further
 * propagation of the event.
 *
 * @param {Event} evt Event on the DOM
 */

var cancelEvt = function cancelEvt(evt) {
  if (!evt) {
    evt = _root__WEBPACK_IMPORTED_MODULE_0__["root"].event;
  }

  if (evt.preventDefault) {
    evt.preventDefault();
  } else {
    evt.returnValue = false;
  }
};
/**
 * Reference to the object that dispatched the event
 *
 * @param {Event} evt Event on the DOM
 * @returns {DOMElement}
 */

var targetEvt = function targetEvt(evt) {
  if (!evt) {
    evt = _root__WEBPACK_IMPORTED_MODULE_0__["root"].event;
  }

  return evt.target || evt.srcElement;
};
/**
 * Returns the Unicode value of pressed key
 *
 * @param {Event} evt Event on the DOM
 * @returns {Number}
 */

var keyCode = function keyCode(evt) {
  return evt.charCode ? evt.charCode : evt.keyCode ? evt.keyCode : evt.which ? evt.which : 0;
};
/**
 * Check code of pressed key is one of the expected key codes
 *
 * @param {Event} evt key event
 * @param {Array} keyCodes list of keycodes to check
 */

var isKeyPressed = function isKeyPressed(evt) {
  var keyCodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return keyCodes.indexOf(keyCode(evt)) !== -1;
};
/**
 * Bind passed function to passed scope
 * @param {Function} fn function
 * @param {Object} scope object instance
 */

function bound(fn, scope) {
  var boundFnName = "".concat(fn.name, "_bound");

  if (!scope[boundFnName]) {
    scope[boundFnName] = fn.bind(scope);
  }

  return scope[boundFnName];
}

/***/ }),

/***/ "./src/feature.js":
/*!************************!*\
  !*** ./src/feature.js ***!
  \************************/
/*! exports provided: Feature */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Feature", function() { return Feature; });
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string */ "./src/string.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var NOT_IMPLEMENTED = 'Not implemented.';
/**
 * Base class defining the interface of a TableFilter feature
 */

var Feature = /*#__PURE__*/function () {
  /**
   * Creates an instance of Feature
   * @param {Object} tf TableFilter instance
   * @param {Class} feature Feature class for TableFilter registration
   */
  function Feature(tf, cls) {
    var _this = this;

    _classCallCheck(this, Feature);

    cls.meta = cls.meta || {};
    /**
     * TableFilter instance
     * @type {TableFilter}
     */

    this.tf = tf;
    /**
     * Feature name is the camelised class name as per TableFilter's
     * convention
     * @type {String}
     */

    this.feature = cls.meta.altName || cls.meta.name || Object(_string__WEBPACK_IMPORTED_MODULE_0__["toCamelCase"])(cls.name);
    /**
     * TableFilter feature setting
     * @type {Boolean}
     */

    this.enabled = tf[this.feature];
    /**
     * TableFilter configuration
     * @type {Object}
     */

    this.config = tf.config();
    /**
     * TableFilter emitter instance
     * @type {Emitter}
     */

    this.emitter = tf.emitter;
    /**
     * Field indicating whether Feature is initialized
     * @type {Boolean}
     */

    this.initialized = false;
    /** Subscribe to destroy event */

    this.emitter.on(['destroy'], function () {
      return _this.destroy();
    });
  }
  /**
   * Initialize the feature
   */


  _createClass(Feature, [{
    key: "init",
    value: function init() {
      throw new Error(NOT_IMPLEMENTED);
    }
    /**
     * Reset the feature after being disabled
     */

  }, {
    key: "reset",
    value: function reset() {
      this.enable();
      this.init();
    }
    /**
     * Destroy the feature
     */

  }, {
    key: "destroy",
    value: function destroy() {
      throw new Error(NOT_IMPLEMENTED);
    }
    /**
     * Enable the feature
     */

  }, {
    key: "enable",
    value: function enable() {
      this.enabled = true;
    }
    /**
     * Disable the feature
     */

  }, {
    key: "disable",
    value: function disable() {
      this.enabled = false;
    }
    /**
     * Indicate whether the feature is enabled or not
     * @returns {Boolean}
     */

  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return this.enabled === true;
    }
  }]);

  return Feature;
}();

/***/ }),

/***/ "./src/modules/alternateRows.js":
/*!**************************************!*\
  !*** ./src/modules/alternateRows.js ***!
  \**************************************/
/*! exports provided: AlternateRows */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlternateRows", function() { return AlternateRows; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event */ "./src/event.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





/**
 * Rows with alternating background color for improved readability
 */

var AlternateRows = /*#__PURE__*/function (_Feature) {
  _inherits(AlternateRows, _Feature);

  var _super = _createSuper(AlternateRows);

  /**
   * Creates an instance of AlternateRows.
   *
   * @param {Object} tf TableFilter instance
   */
  function AlternateRows(tf) {
    var _this;

    _classCallCheck(this, AlternateRows);

    _this = _super.call(this, tf, AlternateRows);
    var config = _this.config;
    /**
     * Css class for even rows (default: 'even')
     * @type {String}
     */

    _this.evenCss = Object(_settings__WEBPACK_IMPORTED_MODULE_2__["defaultsStr"])(config.even_row_css_class, 'even');
    /**
     * Css class for odd rows (default: 'odd')
     * @type {String}
     */

    _this.oddCss = Object(_settings__WEBPACK_IMPORTED_MODULE_2__["defaultsStr"])(config.odd_row_css_class, 'odd');
    return _this;
  }
  /**
   * Sets alternating rows color
   */


  _createClass(AlternateRows, [{
    key: "init",
    value: function init() {
      if (this.initialized) {
        return;
      }

      this.processAll(); // Subscribe to events

      this.emitter.on(['row-processed', 'row-paged'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.processRowHandler, this));
      this.emitter.on(['column-sorted', 'rows-changed'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.processAll, this));
      /** @inherited */

      this.initialized = true;
    }
    /**
     * Apply background to all valid rows
     */

  }, {
    key: "processAll",
    value: function processAll() {
      if (!this.isEnabled()) {
        return;
      }

      var tf = this.tf;
      var validRowsIndex = tf.getValidRows(true);
      var indexLen = validRowsIndex.length;
      var idx = 0; //alternates bg color

      for (var j = 0; j < indexLen; j++) {
        var rowIdx = validRowsIndex[j];
        this.setRowBg(rowIdx, idx);
        idx++;
      }
    }
    /**
     * Set/remove row background based on row validation
     * @param  {Number}  rowIdx  Row index
     * @param  {Number}  arrIdx  Array index
     * @param  {Boolean} isValid Valid row flag
     */

  }, {
    key: "processRow",
    value: function processRow(rowIdx, arrIdx, isValid) {
      if (isValid) {
        this.setRowBg(rowIdx, arrIdx);
      } else {
        this.removeRowBg(rowIdx);
      }
    }
    /**
     * Sets row background color
     * @param {Number} rowIdx Row index
     * @param {Number} idx    Valid rows collection index needed to calculate bg
     * color
     * @private
     */

  }, {
    key: "setRowBg",
    value: function setRowBg(rowIdx, idx) {
      if (!this.isEnabled() || isNaN(rowIdx)) {
        return;
      }

      var rows = this.tf.dom().rows;
      var i = isNaN(idx) ? rowIdx : idx;
      this.removeRowBg(rowIdx);
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(rows[rowIdx], i % 2 ? this.evenCss : this.oddCss);
    }
    /**
     * Removes row background color
     * @param  {Number} idx Row index
     * @private
     */

  }, {
    key: "removeRowBg",
    value: function removeRowBg(idx) {
      if (isNaN(idx)) {
        return;
      }

      var rows = this.tf.dom().rows;
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(rows[idx], this.oddCss);
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(rows[idx], this.evenCss);
    }
    /** @private */

  }, {
    key: "processRowHandler",
    value: function processRowHandler(tf, rowIndex, arrIndex, isValid) {
      this.processRow(rowIndex, arrIndex, isValid);
    }
    /**
     * Removes all alternating backgrounds
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      if (!this.initialized) {
        return;
      }

      var eachRow = this.tf.eachRow(0);
      eachRow(function (row, i) {
        return _this2.removeRowBg(i);
      }); // Unsubscribe to events

      this.emitter.off(['row-processed', 'row-paged'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.processRowHandler, this));
      this.emitter.off(['column-sorted', 'rows-changed'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.processAll, this));
      this.initialized = false;
    }
  }]);

  return AlternateRows;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);

/***/ }),

/***/ "./src/modules/baseDropdown.js":
/*!*************************************!*\
  !*** ./src/modules/baseDropdown.js ***!
  \*************************************/
/*! exports provided: BaseDropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseDropdown", function() { return BaseDropdown; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sort */ "./src/sort.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const */ "./src/const.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





/**
 * Base class for Dropdown and CheckList UI components
 * @export
 * @class BaseDropdown
 * @extends {Feature}
 */

var BaseDropdown = /*#__PURE__*/function (_Feature) {
  _inherits(BaseDropdown, _Feature);

  var _super = _createSuper(BaseDropdown);

  /**
   * Creates an instance of BaseDropdown
   * @param {TableFilter} tf
   */
  function BaseDropdown(tf, cls) {
    var _this;

    _classCallCheck(this, BaseDropdown);

    _this = _super.call(this, tf, cls);
    var f = _this.config;
    /**
     * Filter options custom sorter on a column basis
     * @type {Object}
     */

    _this.customSorter = Object(_types__WEBPACK_IMPORTED_MODULE_2__["isObj"])(f.filter_options_sorter) && Object(_types__WEBPACK_IMPORTED_MODULE_2__["isArray"])(f.filter_options_sorter.col) && Object(_types__WEBPACK_IMPORTED_MODULE_2__["isArray"])(f.filter_options_sorter.comparer) ? f.filter_options_sorter : null; // TODO: move here all properties shared by Dropdown and CheckList

    /**
     * Has custom options
     * @type {Boolean}
     * @private
     */

    _this.isCustom = false;
    /**
     * List of options values
     * @type {Array}
     * @private
     */

    _this.opts = [];
    /**
     * List of options texts for custom values
     * @type {Array}
     * @private
     */

    _this.optsTxt = [];
    /**
     * List of options to be excluded from the checklist filter
     * @type {Array}
     * @private
     */

    _this.excludedOpts = [];
    return _this;
  }
  /**
   * Sort passed options based on the type of the specified column
   * @param {Number} colIndex Column index
   * @param {Array} [options=[]] Collection of values
   * @return {Array} Sorted values
   * @private
   */


  _createClass(BaseDropdown, [{
    key: "sortOptions",
    value: function sortOptions(colIndex) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var tf = this.tf;

      if (tf.isCustomOptions(colIndex) || !tf.sortSlc || Object(_types__WEBPACK_IMPORTED_MODULE_2__["isArray"])(tf.sortSlc) && tf.sortSlc.indexOf(colIndex) === -1) {
        return options;
      }

      var caseSensitive = tf.caseSensitive,
          sortFilterOptionsDesc = tf.sortFilterOptionsDesc;
      var isSortDesc = sortFilterOptionsDesc.indexOf(colIndex) !== -1;
      var compareFn;

      if (this.customSorter && this.customSorter.col.indexOf(colIndex) !== -1) {
        var idx = this.customSorter.col.indexOf(colIndex);
        compareFn = this.customSorter.comparer[idx];
      } else if (tf.hasType(colIndex, [_const__WEBPACK_IMPORTED_MODULE_3__["NUMBER"], _const__WEBPACK_IMPORTED_MODULE_3__["FORMATTED_NUMBER"]])) {
        var decimal = tf.getDecimal(colIndex);
        var comparer = isSortDesc ? _sort__WEBPACK_IMPORTED_MODULE_1__["numSortDesc"] : _sort__WEBPACK_IMPORTED_MODULE_1__["numSortAsc"];
        compareFn = Object(_sort__WEBPACK_IMPORTED_MODULE_1__["sortNumberStr"])(comparer, decimal);
      } else if (tf.hasType(colIndex, [_const__WEBPACK_IMPORTED_MODULE_3__["DATE"]])) {
        var locale = tf.feature('dateType').getLocale(colIndex);

        var _comparer = isSortDesc ? _sort__WEBPACK_IMPORTED_MODULE_1__["dateSortDesc"] : _sort__WEBPACK_IMPORTED_MODULE_1__["dateSortAsc"];

        compareFn = Object(_sort__WEBPACK_IMPORTED_MODULE_1__["sortDateStr"])(_comparer, locale);
      } else {
        // string
        compareFn = caseSensitive ? undefined : _sort__WEBPACK_IMPORTED_MODULE_1__["ignoreCase"];

        if (isSortDesc) {
          return options.sort(compareFn).reverse();
        }
      }

      return options.sort(compareFn);
    }
    /**
     * Regenerate filters of specified columns and maintain selection if any
     * @param {Array} colIndexes Collection of column indexes
     * @private
     */

  }, {
    key: "refreshFilters",
    value: function refreshFilters(colIndexes) {
      var _this2 = this;

      colIndexes.forEach(function (colIdx) {
        var values = _this2.getValues(colIdx);

        _this2.build(colIdx, _this2.tf.linkedFilters);

        _this2.selectOptions(colIdx, values);
      });
    }
    /**
     * Check passed row contains a valid linked value
     * @param {Number} rowIdx Row index
     * @param {Number} activeFilterIdx Current active filter index
     * @returns {Boolean}
     */

  }, {
    key: "isValidLinkedValue",
    value: function isValidLinkedValue(rowIdx, activeFilterIdx) {
      var tf = this.tf;

      if (tf.disableExcludedOptions) {
        return true;
      }

      if (tf.paging) {
        if (!Object(_types__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(activeFilterIdx) && tf.isRowValid(rowIdx)) {
          return true;
        }
      } else {
        if (tf.isRowDisplayed(rowIdx)) {
          return true;
        }
      }

      return false;
    }
    /**
     * Refresh linked filters to offer only selected options
     */

  }, {
    key: "linkFilters",
    value: function linkFilters() {
      var tf = this.tf;

      if (!tf.linkedFilters || !tf.activeFilterId) {
        return;
      }

      this.refreshAll();
    }
  }]);

  return BaseDropdown;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);

/***/ }),

/***/ "./src/modules/checkList.js":
/*!**********************************!*\
  !*** ./src/modules/checkList.js ***!
  \**********************************/
/*! exports provided: CheckList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckList", function() { return CheckList; });
/* harmony import */ var _baseDropdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseDropdown */ "./src/modules/baseDropdown.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../array */ "./src/array.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../string */ "./src/string.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../event */ "./src/event.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }









/**
 * Checklist filter UI component
 * @export
 * @class CheckList
 * @extends {BaseDropdown}
 */

var CheckList = /*#__PURE__*/function (_BaseDropdown) {
  _inherits(CheckList, _BaseDropdown);

  var _super = _createSuper(CheckList);

  /**
   * Creates an instance of CheckList
   * @param {TableFilter} tf TableFilter instance
   */
  function CheckList(tf) {
    var _this;

    _classCallCheck(this, CheckList);

    _this = _super.call(this, tf, CheckList);
    var f = _this.config;
    /**
     * List of container DOM elements
     * @type {Array}
     */

    _this.containers = [];
    /**
     * Css class for the container of the checklist filter (div)
     * @type {String}
     */

    _this.containerCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_7__["defaultsStr"])(f.div_checklist_css_class, 'div_checklist');
    /**
     * Css class for the checklist filter element (ul)
     * @type {String}
     */

    _this.filterCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_7__["defaultsStr"])(f.checklist_css_class, 'flt_checklist');
    /**
     * Css class for the item of a checklist (li)
     * @type {String}
     */

    _this.itemCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_7__["defaultsStr"])(f.checklist_item_css_class, 'flt_checklist_item');
    /**
     * Css class for a selected item of a checklist (li)
     * @type {String}
     */

    _this.selectedItemCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_7__["defaultsStr"])(f.checklist_selected_item_css_class, 'flt_checklist_slc_item');
    /**
     * Text placed in the filter's container when load filter on demand
     * feature is enabled
     * @type {String}
     */

    _this.activateText = Object(_settings__WEBPACK_IMPORTED_MODULE_7__["defaultsStr"])(f.activate_checklist_text, 'Click to load filter data');
    /**
     * Css class for a disabled item of a checklist (li)
     * @type {String}
     */

    _this.disabledItemCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_7__["defaultsStr"])(f.checklist_item_disabled_css_class, 'flt_checklist_item_disabled');
    /**
     * Enable the reset filter option as first item
     * @type {Boolean}
     */

    _this.enableResetOption = Object(_settings__WEBPACK_IMPORTED_MODULE_7__["defaultsBool"])(f.enable_checklist_reset_filter, true);
    /**
     * Prefix for container element ID
     * @type {String}
     * @private
     */

    _this.prfx = 'chkdiv_';
    return _this;
  }
  /**
   * Checklist option click event handler
   * @param {Event} evt
   * @private
   */


  _createClass(CheckList, [{
    key: "optionClick",
    value: function optionClick(evt) {
      var elm = Object(_event__WEBPACK_IMPORTED_MODULE_4__["targetEvt"])(evt);
      var tf = this.tf;
      this.emitter.emit('filter-focus', tf, elm);
      this.setItemOption(elm);
      tf.filter();
    }
    /**
     * Checklist container click event handler for load-on-demand feature
     * @param {Event} evt
     * @private
     */

  }, {
    key: "onCheckListClick",
    value: function onCheckListClick(evt) {
      var _this2 = this;

      var elm = Object(_event__WEBPACK_IMPORTED_MODULE_4__["targetEvt"])(evt);

      if (this.tf.loadFltOnDemand && elm.getAttribute('filled') === '0') {
        var ct = elm.getAttribute('ct');
        var div = this.containers[ct];
        this.build(ct);
        Object(_event__WEBPACK_IMPORTED_MODULE_4__["removeEvt"])(div, 'click', function (evt) {
          return _this2.onCheckListClick(evt);
        });
      }
    }
    /**
     * Refresh all checklist filters
     */

  }, {
    key: "refreshAll",
    value: function refreshAll() {
      var colIdxs = this.tf.getFiltersByType(_const__WEBPACK_IMPORTED_MODULE_6__["CHECKLIST"], true);
      this.refreshFilters(colIdxs);
    }
    /**
     * Initialize checklist filter
     * @param  {Number}     colIndex   Column index
     * @param  {Boolean}    isExternal External filter flag
     * @param  {DOMElement} container  Dom element containing the filter
     */

  }, {
    key: "init",
    value: function init(colIndex, isExternal, container) {
      var _this3 = this;

      var tf = this.tf;
      var externalFltTgtId = isExternal ? tf.externalFltIds[colIndex] : null;
      var divCont = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('div', ['id', "".concat(this.prfx).concat(colIndex, "_").concat(tf.id)], ['ct', colIndex], ['filled', '0']);
      divCont.className = this.containerCssClass; //filter is appended in desired element

      if (externalFltTgtId) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(externalFltTgtId).appendChild(divCont);
      } else {
        container.appendChild(divCont);
      }

      this.containers[colIndex] = divCont;
      tf.fltIds.push(tf.buildFilterId(colIndex));

      if (!tf.loadFltOnDemand) {
        this.build(colIndex);
      } else {
        Object(_event__WEBPACK_IMPORTED_MODULE_4__["addEvt"])(divCont, 'click', function (evt) {
          return _this3.onCheckListClick(evt);
        });
        divCont.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createText"])(this.activateText));
      }

      this.emitter.on(['build-checklist-filter'], function (tf, colIndex, isLinked) {
        return _this3.build(colIndex, isLinked);
      });
      this.emitter.on(['select-checklist-options'], function (tf, colIndex, values) {
        return _this3.selectOptions(colIndex, values);
      });
      this.emitter.on(['rows-changed'], function () {
        return _this3.refreshAll();
      });
      this.emitter.on(['after-filtering'], function () {
        return _this3.linkFilters();
      });
      /** @inherited */

      this.initialized = true;
    }
    /**
     * Build checklist UI
     * @param  {Number}  colIndex   Column index
     * @param  {Boolean} isLinked    Enable linked filters behaviour
     */

  }, {
    key: "build",
    value: function build(colIndex) {
      var _this4 = this;

      var isLinked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var tf = this.tf;
      colIndex = Number(colIndex);
      this.emitter.emit('before-populating-filter', tf, colIndex);
      /** @inherited */

      this.opts = [];
      /** @inherited */

      this.optsTxt = [];
      var flt = this.containers[colIndex];
      var ul = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('ul', ['id', tf.fltIds[colIndex]], ['colIndex', colIndex]);
      ul.className = this.filterCssClass;
      var caseSensitive = tf.caseSensitive;
      /** @inherited */

      this.isCustom = tf.isCustomOptions(colIndex); //Retrieves custom values

      if (this.isCustom) {
        var customValues = tf.getCustomOptions(colIndex);
        this.opts = customValues[0];
        this.optsTxt = customValues[1];
      }

      var activeIdx;
      var activeFilterId = tf.getActiveFilterId();

      if (isLinked && activeFilterId) {
        activeIdx = tf.getColumnIndexFromFilterId(activeFilterId);
      }

      var filteredDataCol = [];

      if (isLinked && tf.disableExcludedOptions) {
        /** @inherited */
        this.excludedOpts = [];
      }

      flt.innerHTML = '';
      var eachRow = tf.eachRow();
      eachRow(function (row) {
        var cellValue = tf.getCellValue(row.cells[colIndex]); //Vary Peter's patch

        var cellString = Object(_string__WEBPACK_IMPORTED_MODULE_3__["matchCase"])(cellValue, caseSensitive); // checks if celldata is already in array

        if (!Object(_array__WEBPACK_IMPORTED_MODULE_2__["has"])(_this4.opts, cellString, caseSensitive)) {
          _this4.opts.push(cellValue);
        }

        var filteredCol = filteredDataCol[colIndex];

        if (isLinked && tf.disableExcludedOptions) {
          if (!filteredCol) {
            filteredCol = tf.getVisibleColumnValues(colIndex);
          }

          if (!Object(_array__WEBPACK_IMPORTED_MODULE_2__["has"])(filteredCol, cellString, caseSensitive) && !Object(_array__WEBPACK_IMPORTED_MODULE_2__["has"])(_this4.excludedOpts, cellString, caseSensitive)) {
            _this4.excludedOpts.push(cellValue);
          }
        }
      }, // continue conditions function
      function (row, k) {
        // excluded rows don't need to appear on selects as always valid
        if (tf.excludeRows.indexOf(k) !== -1) {
          return true;
        } // checks if row has expected number of cells


        if (row.cells.length !== tf.nbCells || _this4.isCustom) {
          return true;
        }

        if (isLinked && !_this4.isValidLinkedValue(k, activeIdx)) {
          return true;
        }
      }); //sort options

      this.opts = this.sortOptions(colIndex, this.opts);

      if (this.excludedOpts) {
        this.excludedOpts = this.sortOptions(colIndex, this.excludedOpts);
      }

      this.addChecks(colIndex, ul);

      if (tf.loadFltOnDemand) {
        flt.innerHTML = '';
      }

      flt.appendChild(ul);
      flt.setAttribute('filled', '1');
      this.emitter.emit('after-populating-filter', tf, colIndex, flt);
    }
    /**
     * Add checklist options
     * @param {Number} colIndex  Column index
     * @param {Object} ul        Ul element
     * @private
     */

  }, {
    key: "addChecks",
    value: function addChecks(colIndex, ul) {
      var _this5 = this;

      var tf = this.tf;
      var chkCt = this.addTChecks(colIndex, ul);

      for (var y = 0; y < this.opts.length; y++) {
        var val = this.opts[y]; //item value

        var lbl = this.isCustom ? this.optsTxt[y] : val; //item text

        var fltId = tf.fltIds[colIndex];
        var lblIdx = y + chkCt;
        var li = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createCheckItem"])("".concat(fltId, "_").concat(lblIdx), val, lbl, ['data-idx', lblIdx]);
        li.className = this.itemCssClass;

        if (tf.linkedFilters && tf.disableExcludedOptions && Object(_array__WEBPACK_IMPORTED_MODULE_2__["has"])(this.excludedOpts, Object(_string__WEBPACK_IMPORTED_MODULE_3__["matchCase"])(val, tf.caseSensitive), tf.caseSensitive)) {
          Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(li, this.disabledItemCssClass);
          li.check.disabled = true;
          li.disabled = true;
        } else {
          Object(_event__WEBPACK_IMPORTED_MODULE_4__["addEvt"])(li.check, 'click', function (evt) {
            return _this5.optionClick(evt);
          });
        }

        ul.appendChild(li);

        if (val === '') {
          //item is hidden
          li.style.display = _const__WEBPACK_IMPORTED_MODULE_6__["NONE"];
        }
      }
    }
    /**
     * Add checklist header option
     * @param {Number} colIndex Column index
     * @param {Object} ul       Ul element
     * @private
     */

  }, {
    key: "addTChecks",
    value: function addTChecks(colIndex, ul) {
      var _this6 = this;

      var tf = this.tf;
      var chkCt = 1;
      var fltId = tf.fltIds[colIndex];
      var li0 = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createCheckItem"])("".concat(fltId, "_0"), '', tf.getClearFilterText(colIndex), ['data-idx', 0]);
      li0.className = this.itemCssClass;
      ul.appendChild(li0);
      Object(_event__WEBPACK_IMPORTED_MODULE_4__["addEvt"])(li0.check, 'click', function (evt) {
        return _this6.optionClick(evt);
      });

      if (!this.enableResetOption) {
        li0.style.display = _const__WEBPACK_IMPORTED_MODULE_6__["NONE"];
      }

      if (tf.enableEmptyOption) {
        var li1 = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createCheckItem"])("".concat(fltId, "_1"), tf.emOperator, tf.emptyText, ['data-idx', 1]);
        li1.className = this.itemCssClass;
        ul.appendChild(li1);
        Object(_event__WEBPACK_IMPORTED_MODULE_4__["addEvt"])(li1.check, 'click', function (evt) {
          return _this6.optionClick(evt);
        });
        chkCt++;
      }

      if (tf.enableNonEmptyOption) {
        var li2 = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createCheckItem"])("".concat(fltId, "_2"), tf.nmOperator, tf.nonEmptyText, ['data-idx', 2]);
        li2.className = this.itemCssClass;
        ul.appendChild(li2);
        Object(_event__WEBPACK_IMPORTED_MODULE_4__["addEvt"])(li2.check, 'click', function (evt) {
          return _this6.optionClick(evt);
        });
        chkCt++;
      }

      return chkCt;
    }
    /**
     * Set/unset value of passed item option in filter's DOM element attribute
     * @param {Object} o checklist option DOM element
     * @private
     */

  }, {
    key: "setItemOption",
    value: function setItemOption(o) {
      var _this7 = this;

      if (!o) {
        return;
      }

      var tf = this.tf;
      var chkValue = o.value; //checked item value

      var chkIndex = o.dataset.idx;
      var colIdx = tf.getColumnIndexFromFilterId(o.id);
      var n = tf.getFilterElement(parseInt(colIdx, 10));
      var items = n.childNodes;
      var li = items[chkIndex]; //selected values (ul tag)

      var slcValues = n.getAttribute('value') || ''; //selected items indexes (ul tag)

      var slcIndexes = n.getAttribute('indexes') || '';

      if (o.checked) {
        //show all item
        if (chkValue === '') {
          //items indexes
          var indexes = slcIndexes.split(tf.separator);
          indexes.forEach(function (idx) {
            idx = Number(idx);
            var li = items[idx];
            var chx = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(li, 'input')[0];

            if (chx && idx > 0) {
              chx.checked = false;
              Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(li, _this7.selectedItemCssClass);
            }
          });
          n.setAttribute('value', '');
          n.setAttribute('indexes', '');
        } else {
          var _indexes = slcIndexes + chkIndex + tf.separator;

          var values = Object(_string__WEBPACK_IMPORTED_MODULE_3__["trim"])(slcValues + ' ' + chkValue + ' ' + tf.orOperator);
          n.setAttribute('value', values);
          n.setAttribute('indexes', _indexes); //uncheck first option

          var chx0 = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(items[0], 'input')[0];

          if (chx0) {
            chx0.checked = false;
          }
        }

        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(items[0], this.selectedItemCssClass);
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(li, this.selectedItemCssClass);
      } else {
        //removes values and indexes
        var replaceValue = new RegExp(Object(_string__WEBPACK_IMPORTED_MODULE_3__["rgxEsc"])(chkValue + ' ' + tf.orOperator));

        var _values = slcValues.replace(replaceValue, '');

        var replaceIndex = new RegExp(Object(_string__WEBPACK_IMPORTED_MODULE_3__["rgxEsc"])(chkIndex + tf.separator));

        var _indexes2 = slcIndexes.replace(replaceIndex, '');

        n.setAttribute('value', Object(_string__WEBPACK_IMPORTED_MODULE_3__["trim"])(_values));
        n.setAttribute('indexes', _indexes2);
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(li, this.selectedItemCssClass);
      }
    }
    /**
     * Select filter options programmatically
     * @param  {Number} colIndex Column index
     * @param  {Array}  values   Array of option values to select
     */

  }, {
    key: "selectOptions",
    value: function selectOptions(colIndex) {
      var _this8 = this;

      var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var tf = this.tf;
      var flt = tf.getFilterElement(colIndex);

      if (!flt || values.length === 0) {
        return;
      }

      var lis = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(flt, 'li');
      flt.setAttribute('value', '');
      flt.setAttribute('indexes', '');
      [].forEach.call(lis, function (li) {
        var chk = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(li, 'input')[0];
        var chkVal = Object(_string__WEBPACK_IMPORTED_MODULE_3__["matchCase"])(chk.value, tf.caseSensitive);

        if (chkVal !== '' && Object(_array__WEBPACK_IMPORTED_MODULE_2__["has"])(values, chkVal, tf.caseSensitive)) {
          chk.checked = true;
        } else {
          // Check non-empty-text or empty-text option
          if (values.indexOf(tf.nmOperator) !== -1 && chkVal === Object(_string__WEBPACK_IMPORTED_MODULE_3__["matchCase"])(tf.nonEmptyText, tf.caseSensitive)) {
            chk.checked = true;
          } else if (values.indexOf(tf.emOperator) !== -1 && chkVal === Object(_string__WEBPACK_IMPORTED_MODULE_3__["matchCase"])(tf.emptyText, tf.caseSensitive)) {
            chk.checked = true;
          } else {
            chk.checked = false;
          }
        }

        _this8.setItemOption(chk);
      });
    }
    /**
     * Get filter values for a given column index
     * @param {Number} colIndex Column index
     * @returns {Array} values Collection of selected values
     */

  }, {
    key: "getValues",
    value: function getValues(colIndex) {
      var tf = this.tf;
      var flt = tf.getFilterElement(colIndex);

      if (!flt) {
        return [];
      }

      var fltAttr = flt.getAttribute('value');
      var values = Object(_types__WEBPACK_IMPORTED_MODULE_5__["isEmpty"])(fltAttr) ? '' : fltAttr; //removes last operator ||

      values = values.substr(0, values.length - 3); //turn || separated values into array

      values = values.split(' ' + tf.orOperator + ' ');
      return values;
    }
    /**
     * Destroy CheckList instance
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this9 = this;

      this.emitter.off(['build-checklist-filter'], function (tf, colIndex, isLinked) {
        return _this9.build(colIndex, isLinked);
      });
      this.emitter.off(['select-checklist-options'], function (tf, colIndex, values) {
        return _this9.selectOptions(colIndex, values);
      });
      this.emitter.off(['rows-changed'], function () {
        return _this9.refreshAll();
      });
      this.emitter.off(['after-filtering'], function () {
        return _this9.linkFilters();
      });
      this.initialized = false;
    }
  }]);

  return CheckList;
}(_baseDropdown__WEBPACK_IMPORTED_MODULE_0__["BaseDropdown"]);

/***/ }),

/***/ "./src/modules/clearButton.js":
/*!************************************!*\
  !*** ./src/modules/clearButton.js ***!
  \************************************/
/*! exports provided: ClearButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClearButton", function() { return ClearButton; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event */ "./src/event.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toolbar */ "./src/modules/toolbar.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







/**
 * Clear button UI component
 */

var ClearButton = /*#__PURE__*/function (_Feature) {
  _inherits(ClearButton, _Feature);

  var _super = _createSuper(ClearButton);

  /**
   * Creates an instance of ClearButton
   * @param {TableFilter} tf TableFilter instance
   */
  function ClearButton(tf) {
    var _this;

    _classCallCheck(this, ClearButton);

    _this = _super.call(this, tf, ClearButton);
    var f = _this.config.btn_reset || {};
    /**
     * Container element ID
     * @type {String}
     */

    _this.targetId = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.target_id, null);
    /**
     * Text for the clear button
     * @type {String}
     */

    _this.text = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.text, null);
    /**
     * Css class for reset button
     * @type {String}
     */

    _this.cssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.css_class, 'reset');
    /**
     * Tooltip text for the clear button
     * @type {String}
     */

    _this.tooltip = f.tooltip || 'Clear filters';
    /**
     * Custom Html string for the clear button
     * @type {String}
     */

    _this.html = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.html, !tf.enableIcons || _this.text ? null : '<input type="button" value="" class="' + _this.cssClass + '" ' + 'title="' + _this.tooltip + '" />');
    /**
     * Default position in toolbar ('left'|'center'|'right')
     * @type {String}
     */

    _this.toolbarPosition = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.toolbar_position, _toolbar__WEBPACK_IMPORTED_MODULE_5__["RIGHT"]);
    /**
     * Clear button container element
     * @type {DOMElement}
     * @private
     */

    _this.container = null;
    /**
     * Clear button element
     * @type {DOMElement}
     * @private
     */

    _this.element = null;
    return _this;
  }
  /**
   * Click event handler for clear button
   * @private
   */


  _createClass(ClearButton, [{
    key: "onClick",
    value: function onClick() {
      if (!this.isEnabled()) {
        return;
      }

      this.tf.clearFilters();
    }
    /**
     * Initialize clear button component
     */

  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      var tf = this.tf;

      if (this.initialized) {
        return;
      }

      this.emitter.emit('initializing-feature', this, !Object(_types__WEBPACK_IMPORTED_MODULE_4__["isNull"])(this.targetId));
      var cont = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      var targetEl = !this.targetId ? tf.feature('toolbar').container(this.toolbarPosition) : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.targetId);
      targetEl.appendChild(cont);

      if (!this.html) {
        var fltReset = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('a', ['href', 'javascript:void(0);']);
        fltReset.className = this.cssClass;
        fltReset.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createText"])(this.text));
        cont.appendChild(fltReset);
        Object(_event__WEBPACK_IMPORTED_MODULE_2__["addEvt"])(fltReset, 'click', function () {
          return _this2.onClick();
        });
      } else {
        cont.innerHTML = this.html;
        var resetEl = cont.firstChild;
        Object(_event__WEBPACK_IMPORTED_MODULE_2__["addEvt"])(resetEl, 'click', function () {
          return _this2.onClick();
        });
      }

      this.element = cont.firstChild;
      this.container = cont;
      /** @inherited */

      this.initialized = true;
      this.emitter.emit('feature-initialized', this);
    }
    /**
     * Destroy ClearButton instance
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.initialized) {
        return;
      }

      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.element);
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.container);
      this.element = null;
      this.container = null;
      this.initialized = false;
    }
  }]);

  return ClearButton;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]); // TODO: remove as soon as feature name is fixed

ClearButton.meta = {
  altName: 'btnReset'
};

/***/ }),

/***/ "./src/modules/dateType.js":
/*!*********************************!*\
  !*** ./src/modules/dateType.js ***!
  \*********************************/
/*! exports provided: DateType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateType", function() { return DateType; });
/* harmony import */ var sugar_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sugar-date */ "./node_modules/sugar-date/index.js");
/* harmony import */ var sugar_date__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sugar_date__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sugar_date_locales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sugar-date/locales */ "./node_modules/sugar-date/locales/index.js");
/* harmony import */ var sugar_date_locales__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sugar_date_locales__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../root */ "./src/root.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







/**
 * Wrapper for Sugar Date module providing datetime helpers and locales
 * @export
 * @class DateType
 */

var DateType = /*#__PURE__*/function (_Feature) {
  _inherits(DateType, _Feature);

  var _super = _createSuper(DateType);

  /**
   * Creates an instance of DateType
   * @param {TableFilter} tf TableFilter instance
   */
  function DateType(tf) {
    var _this;

    _classCallCheck(this, DateType);

    _this = _super.call(this, tf, DateType);
    /**
     * Global locale
     * @type {String}
     */

    _this.locale = tf.locale;
    /**
     * Sugar Date instance
     * @type {Object}
     */

    _this.datetime = sugar_date__WEBPACK_IMPORTED_MODULE_0__["Date"];

    _this.enable();

    return _this;
  }
  /**
   * Initialize DateType instance
   */


  _createClass(DateType, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      } // Set global locale


      this.datetime.setLocale(this.locale); // Add formats from column types configuration if any

      this.addConfigFormats(this.tf.colTypes);
      this.emitter.on(['add-date-type-formats'], function (tf, types) {
        return _this2.addConfigFormats(types);
      }); // Broadcast date-type initialization

      this.emitter.emit('date-type-initialized', this.tf, this);
      /** @inherited */

      this.initialized = true;
    }
    /**
     * Parse a string representation of a date for a specified locale and return
     * a date object
     * @param {String} dateStr String representation of a date
     * @param {String} localeCode Locale code (ie 'en-us')
     * @returns {Date}
     */

  }, {
    key: "parse",
    value: function parse(dateStr, localeCode) {
      return this.datetime.create(dateStr, localeCode);
    }
    /**
     * Check string representation of a date for a specified locale is valid
     * @param {any} dateStr String representation of a date
     * @param {any} localeCode Locale code (ie 'en-us')
     * @returns {Boolean}
     */

  }, {
    key: "isValid",
    value: function isValid(dateStr, localeCode) {
      return this.datetime.isValid(this.parse(dateStr, localeCode));
    }
    /**
     * Return the type object of a specified column as per configuration or
     * passed collection
     * @param {Number} colIndex Column index
     * @param {Array} types Collection of column types, optional
     * @returns {Object}
     */

  }, {
    key: "getOptions",
    value: function getOptions(colIndex, types) {
      types = types || this.tf.colTypes;
      var colType = types[colIndex];
      return Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(colType) ? colType : {};
    }
    /**
     * Return the locale code for supplied column index as per configuration
     * or global setting
     * @param {Number} colIndex Column index
     * @returns {String} Locale code (ie: 'en-us')
     */

  }, {
    key: "getLocale",
    value: function getLocale(colIndex) {
      return this.getOptions(colIndex).locale || this.locale;
    }
    /**
     * Add date time format(s) to a locale as specified by the passed
     * collection of column types, ie:
     *  [
     *      'string',
     *      'number',
     *      { type: 'date', locale: 'en', format: ['{dd}/{MM}/{yyyy}']}
     * ]
     *
     * @param {Array} [types=[]] Collection of column types
     */

  }, {
    key: "addConfigFormats",
    value: function addConfigFormats() {
      var _this3 = this;

      var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      types.forEach(function (type, idx) {
        var options = _this3.getOptions(idx, types);

        if (options.type === _const__WEBPACK_IMPORTED_MODULE_4__["DATE"] && options.hasOwnProperty('format')) {
          var locale = _this3.datetime.getLocale(options.locale || _this3.locale);

          var formats = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(options.format) ? options.format : [options.format]; // Sugar date module throws exceptions with locale.addFormat

          try {
            formats.forEach(function (format) {
              locale.addFormat(format);
            });
          } catch (ex) {
            _root__WEBPACK_IMPORTED_MODULE_5__["root"].console.error(ex);
          }
        }
      });
    }
    /**
     * Remove DateType instance
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this4 = this;

      if (!this.initialized) {
        return;
      } // TODO: remove added formats


      this.emitter.off(['add-date-type-formats'], function (tf, types) {
        return _this4.addConfigFormats(types);
      });
      this.initialized = false;
    }
  }]);

  return DateType;
}(_feature__WEBPACK_IMPORTED_MODULE_2__["Feature"]);

/***/ }),

/***/ "./src/modules/dropdown.js":
/*!*********************************!*\
  !*** ./src/modules/dropdown.js ***!
  \*********************************/
/*! exports provided: Dropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dropdown", function() { return Dropdown; });
/* harmony import */ var _baseDropdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseDropdown */ "./src/modules/baseDropdown.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../array */ "./src/array.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../string */ "./src/string.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../event */ "./src/event.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








/**
 * Dropdown filter UI component
 * @export
 * @class Dropdown
 * @extends {BaseDropdown}
 */

var Dropdown = /*#__PURE__*/function (_BaseDropdown) {
  _inherits(Dropdown, _BaseDropdown);

  var _super = _createSuper(Dropdown);

  /**
   * Creates an instance of Dropdown
   * @param {TableFilter} tf TableFilter instance
   */
  function Dropdown(tf) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _super.call(this, tf, Dropdown); // Configuration object

    var f = _this.config;
    /**
     * Enable the reset filter option as first item
     * @type {Boolean}
     */

    _this.enableSlcResetFilter = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsBool"])(f.enable_slc_reset_filter, true);
    /**
     * Non empty option text
     * @type {String}
     */

    _this.nonEmptyText = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.non_empty_text, '(Non empty)');
    /**
     * Tooltip text appearing on multiple select
     * @type {String}
     */

    _this.multipleSlcTooltip = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.multiple_slc_tooltip, 'Use Ctrl/Cmd key for multiple selections');
    return _this;
  }
  /**
   * Drop-down filter focus event handler
   * @param {Event} e DOM Event
   * @private
   */


  _createClass(Dropdown, [{
    key: "onSlcFocus",
    value: function onSlcFocus(e) {
      var elm = Object(_event__WEBPACK_IMPORTED_MODULE_4__["targetEvt"])(e);
      var tf = this.tf; // select is populated when element has focus

      if (tf.loadFltOnDemand && elm.getAttribute('filled') === '0') {
        var ct = elm.getAttribute('ct');
        this.build(ct);
      }

      this.emitter.emit('filter-focus', tf, elm);
    }
    /**
     * Drop-down filter change event handler
     * @private
     */

  }, {
    key: "onSlcChange",
    value: function onSlcChange() {
      if (this.tf.onSlcChange) {
        this.tf.filter();
      }
    }
    /**
     * Refresh all drop-down filters
     */

  }, {
    key: "refreshAll",
    value: function refreshAll() {
      var selectFlts = this.tf.getFiltersByType(_const__WEBPACK_IMPORTED_MODULE_5__["SELECT"], true);
      var multipleFlts = this.tf.getFiltersByType(_const__WEBPACK_IMPORTED_MODULE_5__["MULTIPLE"], true);
      var colIdxs = selectFlts.concat(multipleFlts);
      this.refreshFilters(colIdxs);
    }
    /**
     * Initialize drop-down filter
     * @param  {Number}     colIndex   Column index
     * @param  {Boolean}    isExternal External filter flag
     * @param  {DOMElement} container  Dom element containing the filter
     */

  }, {
    key: "init",
    value: function init(colIndex, isExternal, container) {
      var _this2 = this;

      var tf = this.tf;
      var col = tf.getFilterType(colIndex);
      var externalFltTgtId = isExternal ? tf.externalFltIds[colIndex] : null;
      var slc = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(_const__WEBPACK_IMPORTED_MODULE_5__["SELECT"], ['id', tf.buildFilterId(colIndex)], ['ct', colIndex], ['filled', '0']);

      if (col === _const__WEBPACK_IMPORTED_MODULE_5__["MULTIPLE"]) {
        slc.multiple = _const__WEBPACK_IMPORTED_MODULE_5__["MULTIPLE"];
        slc.title = this.multipleSlcTooltip;
      }

      slc.className = col.toLowerCase() === _const__WEBPACK_IMPORTED_MODULE_5__["SELECT"] ? tf.fltCssClass : tf.fltMultiCssClass; //filter is appended in container element

      if (externalFltTgtId) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(externalFltTgtId).appendChild(slc);
      } else {
        container.appendChild(slc);
      }

      tf.fltIds.push(slc.id);

      if (!tf.loadFltOnDemand) {
        this.build(colIndex);
      } else {
        //1st option is created here since build isn't invoked
        var opt0 = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createOpt"])(tf.getClearFilterText(colIndex), '');
        slc.appendChild(opt0);
      }

      Object(_event__WEBPACK_IMPORTED_MODULE_4__["addEvt"])(slc, 'change', function () {
        return _this2.onSlcChange();
      });
      Object(_event__WEBPACK_IMPORTED_MODULE_4__["addEvt"])(slc, 'focus', function (e) {
        return _this2.onSlcFocus(e);
      });
      this.emitter.on(['build-select-filter'], function (tf, colIndex, isLinked, isExternal) {
        return _this2.build(colIndex, isLinked, isExternal);
      });
      this.emitter.on(['select-options'], function (tf, colIndex, values) {
        return _this2.selectOptions(colIndex, values);
      });
      this.emitter.on(['rows-changed'], function () {
        return _this2.refreshAll();
      });
      this.emitter.on(['after-filtering'], function () {
        return _this2.linkFilters();
      });
      /** @inherited */

      this.initialized = true;
    }
    /**
     * Build drop-down filter UI
     * @param  {Number}  colIndex    Column index
     * @param  {Boolean} isLinked    Enable linked filters behaviour
     */

  }, {
    key: "build",
    value: function build(colIndex) {
      var _this3 = this;

      var isLinked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var tf = this.tf;
      colIndex = Number(colIndex);
      this.emitter.emit('before-populating-filter', tf, colIndex);
      /** @inherited */

      this.opts = [];
      /** @inherited */

      this.optsTxt = [];
      var slc = tf.getFilterElement(colIndex); //custom select test

      /** @inherited */

      this.isCustom = tf.isCustomOptions(colIndex); //Retrieves custom values

      if (this.isCustom) {
        var customValues = tf.getCustomOptions(colIndex);
        this.opts = customValues[0];
        this.optsTxt = customValues[1];
      } //custom selects text


      var activeIdx;
      var activeFilterId = tf.getActiveFilterId();

      if (isLinked && activeFilterId) {
        activeIdx = tf.getColumnIndexFromFilterId(activeFilterId);
      }

      var excludedOpts = null,
          filteredDataCol = null;

      if (isLinked && tf.disableExcludedOptions) {
        excludedOpts = [];
        filteredDataCol = [];
      }

      var eachRow = tf.eachRow();
      eachRow(function (row) {
        var cellValue = tf.getCellValue(row.cells[colIndex]); //Vary Peter's patch

        var cellString = Object(_string__WEBPACK_IMPORTED_MODULE_3__["matchCase"])(cellValue, tf.caseSensitive); // checks if celldata is already in array

        if (!Object(_array__WEBPACK_IMPORTED_MODULE_2__["has"])(_this3.opts, cellString, tf.caseSensitive)) {
          _this3.opts.push(cellValue);
        }

        if (isLinked && tf.disableExcludedOptions) {
          var filteredCol = filteredDataCol[colIndex];

          if (!filteredCol) {
            filteredCol = tf.getVisibleColumnValues(colIndex);
          }

          if (!Object(_array__WEBPACK_IMPORTED_MODULE_2__["has"])(filteredCol, cellString, tf.caseSensitive) && !Object(_array__WEBPACK_IMPORTED_MODULE_2__["has"])(excludedOpts, cellString, tf.caseSensitive)) {
            excludedOpts.push(cellValue);
          }
        }
      }, // continue conditions function
      function (row, k) {
        // excluded rows don't need to appear on selects as always valid
        if (tf.excludeRows.indexOf(k) !== -1) {
          return true;
        } // checks if row has expected number of cells


        if (row.cells.length !== tf.nbCells || _this3.isCustom) {
          return true;
        }

        if (isLinked && !_this3.isValidLinkedValue(k, activeIdx)) {
          return true;
        }
      }); //sort options

      this.opts = this.sortOptions(colIndex, this.opts);

      if (excludedOpts) {
        excludedOpts = this.sortOptions(colIndex, excludedOpts);
      } //populates drop-down


      this.addOptions(colIndex, slc, isLinked, excludedOpts);
      this.emitter.emit('after-populating-filter', tf, colIndex, slc);
    }
    /**
     * Add drop-down options
     * @param {Number} colIndex     Column index
     * @param {Object} slc          Select Dom element
     * @param {Boolean} isLinked    Enable linked refresh behaviour
     * @param {Array} excludedOpts  Array of excluded options
     */

  }, {
    key: "addOptions",
    value: function addOptions(colIndex, slc, isLinked, excludedOpts) {
      var tf = this.tf,
          slcValue = slc.value;
      slc.innerHTML = '';
      slc = this.addFirstOption(slc);

      for (var y = 0; y < this.opts.length; y++) {
        if (this.opts[y] === '') {
          continue;
        }

        var val = this.opts[y]; //option value

        var lbl = this.isCustom ? this.optsTxt[y] : val; //option text

        var isDisabled = false;

        if (isLinked && tf.disableExcludedOptions && Object(_array__WEBPACK_IMPORTED_MODULE_2__["has"])(excludedOpts, Object(_string__WEBPACK_IMPORTED_MODULE_3__["matchCase"])(val, tf.caseSensitive), tf.caseSensitive)) {
          isDisabled = true;
        }

        var opt = void 0; //fill select on demand

        if (tf.loadFltOnDemand && slcValue === this.opts[y] && tf.getFilterType(colIndex) === _const__WEBPACK_IMPORTED_MODULE_5__["SELECT"]) {
          opt = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createOpt"])(lbl, val, true);
        } else {
          opt = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createOpt"])(lbl, val, false);
        }

        if (isDisabled) {
          opt.disabled = true;
        }

        slc.appendChild(opt);
      } // for y


      slc.setAttribute('filled', '1');
    }
    /**
     * Add drop-down header option
     * @param {Object} slc Select DOM element
     */

  }, {
    key: "addFirstOption",
    value: function addFirstOption(slc) {
      var tf = this.tf;
      var colIdx = tf.getColumnIndexFromFilterId(slc.id);
      var opt0 = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createOpt"])(!this.enableSlcResetFilter ? '' : tf.getClearFilterText(colIdx), '');

      if (!this.enableSlcResetFilter) {
        opt0.style.display = _const__WEBPACK_IMPORTED_MODULE_5__["NONE"];
      }

      slc.appendChild(opt0);

      if (tf.enableEmptyOption) {
        var opt1 = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createOpt"])(tf.emptyText, tf.emOperator);
        slc.appendChild(opt1);
      }

      if (tf.enableNonEmptyOption) {
        var opt2 = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createOpt"])(tf.nonEmptyText, tf.nmOperator);
        slc.appendChild(opt2);
      }

      return slc;
    }
    /**
     * Select filter options programmatically
     * @param  {Number} colIndex Column index
     * @param  {Array}  values   Array of option values to select
     */

  }, {
    key: "selectOptions",
    value: function selectOptions(colIndex) {
      var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var tf = this.tf;

      if (values.length === 0) {
        return;
      }

      var slc = tf.getFilterElement(colIndex);
      [].forEach.call(slc.options, function (option) {
        // Empty value means clear all selections and first option is the
        // clear all option
        if (values[0] === '' || option.value === '') {
          option.selected = false;
        }

        if (option.value !== '' && Object(_array__WEBPACK_IMPORTED_MODULE_2__["has"])(values, option.value, true)) {
          option.selected = true;
        } //if

      });
    }
    /**
     * Get filter values for a given column index
     * @param {Number} colIndex Column index
     * @returns {Array}  values  Array of selected values
     */

  }, {
    key: "getValues",
    value: function getValues(colIndex) {
      var tf = this.tf;
      var slc = tf.getFilterElement(colIndex);
      var values = []; // IE >= 9 does not support the selectedOptions property :(

      if (slc.selectedOptions) {
        [].forEach.call(slc.selectedOptions, function (option) {
          return values.push(option.value);
        });
      } else {
        [].forEach.call(slc.options, function (option) {
          if (option.selected) {
            values.push(option.value);
          }
        });
      }

      return values;
    }
    /**
     * Destroy Dropdown instance
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this4 = this;

      this.emitter.off(['build-select-filter'], function (colIndex, isLinked, isExternal) {
        return _this4.build(colIndex, isLinked, isExternal);
      });
      this.emitter.off(['select-options'], function (tf, colIndex, values) {
        return _this4.selectOptions(colIndex, values);
      });
      this.emitter.off(['rows-changed'], function () {
        return _this4.refreshAll();
      });
      this.emitter.off(['after-filtering'], function () {
        return _this4.linkFilters();
      });
      this.initialized = false;
    }
  }]);

  return Dropdown;
}(_baseDropdown__WEBPACK_IMPORTED_MODULE_0__["BaseDropdown"]);

/***/ }),

/***/ "./src/modules/gridLayout.js":
/*!***********************************!*\
  !*** ./src/modules/gridLayout.js ***!
  \***********************************/
/*! exports provided: GridLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridLayout", function() { return GridLayout; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event */ "./src/event.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../string */ "./src/string.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







/**
 * Grid layout, table with fixed headers
 */

var GridLayout = /*#__PURE__*/function (_Feature) {
  _inherits(GridLayout, _Feature);

  var _super = _createSuper(GridLayout);

  /**
   * Creates an instance of GridLayout
   * @param {TableFilter} tf TableFilter instance
   */
  function GridLayout(tf) {
    var _this;

    _classCallCheck(this, GridLayout);

    _this = _super.call(this, tf, GridLayout);
    var f = _this.config.grid_layout || {};
    /**
     * Grid-layout container width as CSS string
     * @type {String}
     */

    _this.width = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.width, null);
    /**
     * Grid-layout container height as CSS string
     * @type {String}
     */

    _this.height = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.height, null);
    /**
     * Css class for main container element
     * @type {String}
     */

    _this.mainContCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.cont_css_class, 'grd_Cont');
    /**
     * Css class for body table container element
     * @type {String}
     */

    _this.contCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.tbl_cont_css_class, 'grd_tblCont');
    /**
     * Css class for headers table container element
     * @type {String}
     */

    _this.headContCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.tbl_head_css_class, 'grd_headTblCont');
    /**
     * Css class for toolbar container element (rows counter, paging etc.)
     * @type {String}
     */

    _this.infDivCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.inf_grid_css_class, 'grd_inf');
    /**
     * Index of the headers row, default: 0
     * @type {Number}
     */

    _this.headRowIndex = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsNb"])(f.headers_row_index, 0);
    /**
     * Collection of the header row indexes to be moved into headers table
     * @type {Array}
     */

    _this.headRows = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsArr"])(f.headers_rows, [0]);
    /**
     * Enable or disable column filters generation, default: true
     * @type {Boolean}
     */

    _this.filters = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsBool"])(f.filters, true);
    /**
     * Enable or disable column headers, default: false
     * @type {Boolean}
     */

    _this.noHeaders = Boolean(f.no_headers);
    /**
     * Grid-layout default column widht as CSS string
     * @type {String}
     */

    _this.defaultColWidth = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.default_col_width, '100px');
    /**
     * List of column elements
     * @type {Array}
     * @private
     */

    _this.colElms = [];
    /**
     * Prefix for grid-layout filter's cell ID
     * @type {String}
     * @private
     */

    _this.prfxGridFltTd = '_td_';
    /**
     * Prefix for grid-layout header's cell ID
     * @type {String}
     * @private
     */

    _this.prfxGridTh = 'tblHeadTh_';
    /**
     * Mark-up of original HTML table
     * @type {String}
     * @private
     */

    _this.sourceTblHtml = tf.dom().outerHTML;
    /**
     * Indicates if working table has column elements
     * @type {Boolean}
     * @private
     */

    _this.tblHasColTag = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(tf.dom(), 'col').length > 0 ? true : false;
    /**
     * Main container element
     * @private
     */

    _this.tblMainCont = null;
    /**
     * Table container element
     * @private
     */

    _this.tblCont = null;
    /**
     * Headers' table container element
     * @private
     */

    _this.headTblCont = null;
    /**
     * Headers' table element
     * @private
     */

    _this.headTbl = null; // filters flag at TF level

    tf.fltGrid = _this.filters;
    return _this;
  }
  /**
   * Generates a grid with fixed headers
   * TODO: reduce size of init by extracting single purposed methods
   */


  _createClass(GridLayout, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var tf = this.tf;
      var tbl = tf.dom();

      if (this.initialized) {
        return;
      } // Override relevant TableFilter properties


      this.setOverrides(); // Assign default column widths

      this.setDefaultColWidths(); //Main container: it will contain all the elements

      this.tblMainCont = this.createContainer('div', this.mainContCssClass);

      if (this.width) {
        this.tblMainCont.style.width = this.width;
      }

      tbl.parentNode.insertBefore(this.tblMainCont, tbl); //Table container: div wrapping content table

      this.tblCont = this.createContainer('div', this.contCssClass);
      this.setConfigWidth(this.tblCont);

      if (this.height) {
        this.tblCont.style.height = this.height;
      }

      tbl.parentNode.insertBefore(this.tblCont, tbl);
      var t = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(tbl);
      this.tblCont.appendChild(t); //In case table width is expressed in %

      if (tbl.style.width === '') {
        var tblW = this.initialTableWidth();
        tbl.style.width = (Object(_string__WEBPACK_IMPORTED_MODULE_3__["contains"])('%', tblW) ? tbl.clientWidth : tblW) + 'px';
      }

      var d = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.tblCont);
      this.tblMainCont.appendChild(d); //Headers table container: div wrapping headers table

      this.headTblCont = this.createContainer('div', this.headContCssClass); //Headers table

      this.headTbl = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('table');
      var tH = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('tHead'); //1st row should be headers row, ids are added if not set
      //Those ids are used by the sort feature

      var hRow = tbl.rows[this.headRowIndex];
      var sortTriggers = this.getSortTriggerIds(hRow); //Filters row is created

      var filtersRow = this.createFiltersRow(); //Headers row are moved from content table to headers table

      this.setHeadersRow(tH);
      this.headTbl.appendChild(tH);

      if (tf.filtersRowIndex === 0) {
        tH.insertBefore(filtersRow, hRow);
      } else {
        tH.appendChild(filtersRow);
      }

      this.headTblCont.appendChild(this.headTbl);
      this.tblCont.parentNode.insertBefore(this.headTblCont, this.tblCont); //THead needs to be removed in content table for sort feature

      var thead = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(tbl, 'thead');

      if (thead.length > 0) {
        tbl.removeChild(thead[0]);
      } // ensure table layout is always set even if already set in css
      // definitions, potentially with custom css class this could be lost


      this.headTbl.style.tableLayout = 'fixed';
      tbl.style.tableLayout = 'fixed'; //content table without headers needs col widths to be reset

      tf.setColWidths(this.headTbl); //Headers container width

      this.headTbl.style.width = tbl.style.width; //
      //scroll synchronisation

      Object(_event__WEBPACK_IMPORTED_MODULE_2__["addEvt"])(this.tblCont, 'scroll', function (evt) {
        var elm = Object(_event__WEBPACK_IMPORTED_MODULE_2__["targetEvt"])(evt);
        var scrollLeft = elm.scrollLeft;
        _this2.headTblCont.scrollLeft = scrollLeft; //New pointerX calc taking into account scrollLeft
        // if(!o.isPointerXOverwritten){
        //     try{
        //         o.Evt.pointerX = function(evt){
        //             let e = evt || global.event;
        //             let bdScrollLeft = tf_StandardBody().scrollLeft +
        //                 scrollLeft;
        //             return (e.pageX + scrollLeft) ||
        //                 (e.clientX + bdScrollLeft);
        //         };
        //         o.isPointerXOverwritten = true;
        //     } catch(err) {
        //         o.isPointerXOverwritten = false;
        //     }
        // }
      }); // TODO: Trigger a custom event handled by sort extension

      var sort = tf.extension('sort');

      if (sort) {
        sort.asyncSort = true;
        sort.triggerIds = sortTriggers;
      } //Col elements are enough to keep column widths after sorting and
      //filtering


      this.setColumnElements();

      if (tf.popupFilters) {
        filtersRow.style.display = _const__WEBPACK_IMPORTED_MODULE_4__["NONE"];
      }
      /** @inherited */


      this.initialized = true;
    }
    /**
     * Overrides TableFilter instance properties to adjust to grid layout mode
     * @private
     */

  }, {
    key: "setOverrides",
    value: function setOverrides() {
      var tf = this.tf;
      tf.refRow = 0;
      tf.headersRow = 0;
      tf.filtersRowIndex = 1;
    }
    /**
     * Set grid-layout default column widths if column widths are not defined
     * @private
     */

  }, {
    key: "setDefaultColWidths",
    value: function setDefaultColWidths() {
      var _this3 = this;

      var tf = this.tf;

      if (tf.colWidths.length > 0) {
        return;
      }

      tf.eachCol(function (k) {
        var colW;
        var cell = tf.dom().rows[tf.getHeadersRowIndex()].cells[k];

        if (cell.width !== '') {
          colW = cell.width;
        } else if (cell.style.width !== '') {
          colW = parseInt(cell.style.width, 10);
        } else {
          colW = _this3.defaultColWidth;
        }

        tf.colWidths[k] = colW;
      });
      tf.setColWidths();
    }
    /**
     * Initial table width
     * @returns {Number}
     * @private
     */

  }, {
    key: "initialTableWidth",
    value: function initialTableWidth() {
      var tbl = this.tf.dom();
      var width; //initial table width

      if (tbl.width !== '') {
        width = tbl.width;
      } else if (tbl.style.width !== '') {
        width = tbl.style.width;
      } else {
        width = tbl.clientWidth;
      }

      return parseInt(width, 10);
    }
    /**
     * Creates container element
     * @param {String} tag Tag name
     * @param {String} className Css class to assign to element
     * @returns {DOMElement}
     * @private
     */

  }, {
    key: "createContainer",
    value: function createContainer(tag, className) {
      var element = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(tag);
      element.className = className;
      return element;
    }
    /**
     * Creates filters row with cells
     * @returns {HTMLTableRowElement}
     * @private
     */

  }, {
    key: "createFiltersRow",
    value: function createFiltersRow() {
      var _this4 = this;

      var tf = this.tf;
      var filtersRow = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('tr');

      if (this.filters && tf.fltGrid) {
        tf.externalFltIds = [];
        tf.eachCol(function (j) {
          var fltTdId = "".concat(tf.prfxFlt + j + _this4.prfxGridFltTd + tf.id);
          var cl = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(tf.fltCellTag, ['id', fltTdId]);
          filtersRow.appendChild(cl);
          tf.externalFltIds[j] = fltTdId;
        });
      }

      return filtersRow;
    }
    /**
     * Generates column elements if necessary and assigns their widths
     * @private
     */

  }, {
    key: "setColumnElements",
    value: function setColumnElements() {
      var tf = this.tf;
      var cols = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(tf.dom(), 'col');
      this.tblHasColTag = cols.length > 0;

      for (var k = tf.getCellsNb() - 1; k >= 0; k--) {
        var col = void 0;

        if (!this.tblHasColTag) {
          col = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('col');
          tf.dom().insertBefore(col, tf.dom().firstChild);
        } else {
          col = cols[k];
        }

        col.style.width = tf.colWidths[k];
        this.colElms[k] = col;
      }

      this.tblHasColTag = true;
    }
    /**
     * Sets headers row in headers table
     * @param {HTMLHeadElement} tableHead Table head element
     * @private
     */

  }, {
    key: "setHeadersRow",
    value: function setHeadersRow(tableHead) {
      if (this.noHeaders) {
        // Handle table with no headers, assuming here headers do not
        // exist
        tableHead.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('tr'));
      } else {
        // Headers row are moved from content table to headers table
        for (var i = 0; i < this.headRows.length; i++) {
          var row = this.tf.dom().rows[this.headRows[i]];
          tableHead.appendChild(row);
        }
      }
    }
    /**
     * Sets width defined in configuration to passed element
     * @param {DOMElement} element DOM element
     * @private
     */

  }, {
    key: "setConfigWidth",
    value: function setConfigWidth(element) {
      if (!this.width) {
        return;
      }

      if (this.width.indexOf('%') !== -1) {
        element.style.width = '100%';
      } else {
        element.style.width = this.width;
      }
    }
    /**
     * Returns a list of header IDs used for specifing external sort triggers
     * @param {HTMLTableRowElement} row DOM row element
     * @returns {Array} List of IDs
     * @private
     */

  }, {
    key: "getSortTriggerIds",
    value: function getSortTriggerIds(row) {
      var _this5 = this;

      var tf = this.tf;
      var sortTriggers = [];
      tf.eachCol(function (n) {
        var c = row.cells[n];
        var thId = c.getAttribute('id');

        if (!thId || thId === '') {
          thId = "".concat(_this5.prfxGridTh + n, "_").concat(tf.id);
          c.setAttribute('id', thId);
        }

        sortTriggers.push(thId);
      });
      return sortTriggers;
    }
    /**
     * Removes the grid layout
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var tf = this.tf;
      var tbl = tf.dom();

      if (!this.initialized) {
        return;
      }

      var t = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(tbl);
      this.tblMainCont.parentNode.insertBefore(t, this.tblMainCont);
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.tblMainCont);
      this.tblMainCont = null;
      this.headTblCont = null;
      this.headTbl = null;
      this.tblCont = null;
      tbl.outerHTML = this.sourceTblHtml; //needed to keep reference of table element for future usage

      this.tf.tbl = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(tf.id);
      this.initialized = false;
    }
  }]);

  return GridLayout;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);

/***/ }),

/***/ "./src/modules/hash.js":
/*!*****************************!*\
  !*** ./src/modules/hash.js ***!
  \*****************************/
/*! exports provided: hasHashChange, Hash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasHashChange", function() { return hasHashChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hash", function() { return Hash; });
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../event */ "./src/event.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../root */ "./src/root.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var JSON = _root__WEBPACK_IMPORTED_MODULE_1__["root"].JSON;
var location = _root__WEBPACK_IMPORTED_MODULE_1__["root"].location;
var decodeURIComponent = _root__WEBPACK_IMPORTED_MODULE_1__["root"].decodeURIComponent;
var encodeURIComponent = _root__WEBPACK_IMPORTED_MODULE_1__["root"].encodeURIComponent;
/**
 * Checks if browser has onhashchange event
 */

var hasHashChange = function hasHashChange() {
  var docMode = _root__WEBPACK_IMPORTED_MODULE_1__["root"].documentMode;
  return 'onhashchange' in _root__WEBPACK_IMPORTED_MODULE_1__["root"] && (docMode === undefined || docMode > 7);
};
/**
 * Manages state via URL hash changes
 *
 * @export
 * @class Hash
 */

var Hash = /*#__PURE__*/function () {
  /**
   * Creates an instance of Hash
   *
   * @param {State} state Instance of State
   */
  function Hash(state) {
    _classCallCheck(this, Hash);

    /**
     * State object
     * @type {State}
     */
    this.state = state;
    /**
     * Cached URL hash
     * @type {String} Hash string
     * @private
     */

    this.lastHash = null;
    /**
     * Application event emitter instance
     * @type {Emitter}
     */

    this.emitter = state.emitter;
    /**
     * Bound sync wrapper for future use
     * @private
     */

    this.boundSync = null;
  }
  /**
   * Initializes the Hash object
   */


  _createClass(Hash, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (!hasHashChange()) {
        return;
      }

      this.lastHash = location.hash; //Store a bound sync wrapper

      this.boundSync = this.sync.bind(this);
      this.emitter.on(['state-changed'], function (tf, state) {
        return _this.update(state);
      });
      this.emitter.on(['initialized'], this.boundSync);
      Object(_event__WEBPACK_IMPORTED_MODULE_0__["addEvt"])(_root__WEBPACK_IMPORTED_MODULE_1__["root"], 'hashchange', this.boundSync);
    }
    /**
     * Updates the URL hash based on a state change
     *
     * @param {State} state Instance of State
     */

  }, {
    key: "update",
    value: function update(state) {
      var hash = "#".concat(encodeURIComponent(JSON.stringify(state)));

      if (this.lastHash === hash) {
        return;
      }

      location.hash = hash;
      this.lastHash = hash;
    }
    /**
     * Converts a URL hash into a JSON object
     *
     * @param {String} hash URL hash fragment
     * @returns {Object} JSON object
     */

  }, {
    key: "parse",
    value: function parse(hash) {
      if (hash.indexOf('#') === -1) {
        return null;
      }

      hash = hash.substr(1);
      return JSON.parse(decodeURIComponent(hash));
    }
    /**
     * Applies current hash state to features
     */

  }, {
    key: "sync",
    value: function sync() {
      var state = this.parse(location.hash);

      if (!state) {
        return;
      } // override current state with persisted one and sync features


      this.state.overrideAndSync(state);
    }
    /**
     * Release Hash event subscriptions and clear fields
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.emitter.off(['state-changed'], function (tf, state) {
        return _this2.update(state);
      });
      this.emitter.off(['initialized'], this.boundSync);
      Object(_event__WEBPACK_IMPORTED_MODULE_0__["removeEvt"])(_root__WEBPACK_IMPORTED_MODULE_1__["root"], 'hashchange', this.boundSync);
      this.state = null;
      this.lastHash = null;
      this.emitter = null;
    }
  }]);

  return Hash;
}();

/***/ }),

/***/ "./src/modules/help.js":
/*!*****************************!*\
  !*** ./src/modules/help.js ***!
  \*****************************/
/*! exports provided: Help */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Help", function() { return Help; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event */ "./src/event.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../root */ "./src/root.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./toolbar */ "./src/modules/toolbar.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }









var WIKI_URL = 'https://github.com/koalyptus/TableFilter/wiki/' + '4.-Filter-operators';
var WEBSITE_URL = 'https://www.tablefilter.com/';
/**
 * Help UI component
 */

var Help = /*#__PURE__*/function (_Feature) {
  _inherits(Help, _Feature);

  var _super = _createSuper(Help);

  /**
   * Creates an instance of Help
   * @param {TableFilter} tf TableFilter instance
   */
  function Help(tf) {
    var _this;

    _classCallCheck(this, Help);

    _this = _super.call(this, tf, Help);
    var f = _this.config.help_instructions || {};
    /**
     * ID of main custom container element
     * @type {String}
     */

    _this.tgtId = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.target_id, null);
    /**
     * ID of custom container element for instructions
     * @type {String}
     */

    _this.contTgtId = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.container_target_id, null);
    /**
     * Instructions text (accepts HTML)
     * @type {String}
     */

    _this.instrText = !Object(_types__WEBPACK_IMPORTED_MODULE_5__["isEmpty"])(f.text) ? f.text : 'Use the filters above each column to filter and limit table ' + 'data. Advanced searches can be performed by using the following ' + 'operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, ' + '<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, ' + '<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, ' + '<b>rgx:</b><br/><a href="' + WIKI_URL + '" target="_blank">' + 'Learn more</a><hr/>';
    /**
     * Instructions HTML
     * @type {String}
     */

    _this.instrHtml = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.html, null);
    /**
     * Help button text ('?')
     * @type {String}
     */

    _this.btnText = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.btn_text, '?');
    /**
     * Custom help button HTML
     * @type {String}
     */

    _this.btnHtml = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.btn_html, null);
    /**
     * Css class for help button
     * @type {String}
     */

    _this.btnCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.btn_css_class, 'helpBtn');
    /**
     * Css class for help container element
     * @type {String}
     */

    _this.contCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.container_css_class, 'helpCont');
    /**
     * Button DOM element
     * @type {DOMElement}
     */

    _this.btn = null;
    /**
     * Help container DOM element
     * @type {DOMElement}
     */

    _this.cont = null;
    /**
     * Adjust container left position when table's horizontal scroll is
     * on, typically when `responsive` option is enabled.
     * @type {Number}
     * @defaultValue 25
     */

    _this.contAdjustLeftPosition = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsNb"])(f.container_adjust_left_position, 25);
    /**
     * Bound mouseup wrapper
     * @private
     */

    _this.boundMouseup = null;
    /**
     * Default HTML appended to instructions text
     * @type {String}
     */

    _this.defaultHtml = '<div class="helpFooter"><h4>TableFilter ' + 'v' + tf.version + '</h4>' + '<a href="' + WEBSITE_URL + '" target="_blank">' + WEBSITE_URL + '</a>' + '<br/><span>&copy;2015-' + tf.year + ' Max Guglielmi</span>' + '<div align="center" style="margin-top:8px;">' + '<a href="javascript:void(0);" class="close">Close</a></div></div>';
    /**
     * Default position in toolbar ('left'|'center'|'right')
     * @type {String}
     */

    _this.toolbarPosition = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.toolbar_position, _toolbar__WEBPACK_IMPORTED_MODULE_7__["RIGHT"]);

    _this.emitter.on(['init-help'], function () {
      return _this.init();
    });

    return _this;
  }
  /**
   * Mouse-up event handler handling popup auto-close behaviour
   * @private
   */


  _createClass(Help, [{
    key: "onMouseup",
    value: function onMouseup(evt) {
      var targetElm = Object(_event__WEBPACK_IMPORTED_MODULE_2__["targetEvt"])(evt);

      while (targetElm && targetElm !== this.cont && targetElm !== this.btn) {
        targetElm = targetElm.parentNode;
      }

      if (targetElm !== this.cont && targetElm !== this.btn) {
        this.toggle();
      }

      return;
    }
    /**
     * Initialise Help instance
     */

  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      }

      this.emitter.emit('initializing-feature', this, !Object(_types__WEBPACK_IMPORTED_MODULE_5__["isNull"])(this.tgtId));
      var tf = this.tf;
      var btn = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      var cont = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('div');
      this.boundMouseup = this.onMouseup.bind(this); //help button is added to defined element

      var targetEl = !this.tgtId ? tf.feature('toolbar').container(this.toolbarPosition) : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.tgtId);
      targetEl.appendChild(btn);
      var divContainer = !this.contTgtId ? btn : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.contTgtId);

      if (!this.btnHtml) {
        divContainer.appendChild(cont);
        var helplink = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('a', ['href', 'javascript:void(0);']);
        helplink.className = this.btnCssClass;
        helplink.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createText"])(this.btnText));
        btn.appendChild(helplink);
        Object(_event__WEBPACK_IMPORTED_MODULE_2__["addEvt"])(helplink, 'click', function () {
          return _this2.toggle();
        });
      } else {
        btn.innerHTML = this.btnHtml;
        var helpEl = btn.firstChild;
        Object(_event__WEBPACK_IMPORTED_MODULE_2__["addEvt"])(helpEl, 'click', function () {
          return _this2.toggle();
        });
        divContainer.appendChild(cont);
      }

      if (!this.instrHtml) {
        cont.innerHTML = this.instrText;
        cont.className = this.contCssClass;
      } else {
        if (this.contTgtId) {
          divContainer.appendChild(cont);
        }

        cont.innerHTML = this.instrHtml;

        if (!this.contTgtId) {
          cont.className = this.contCssClass;
        }
      }

      cont.innerHTML += this.defaultHtml;
      Object(_event__WEBPACK_IMPORTED_MODULE_2__["addEvt"])(cont, 'click', function () {
        return _this2.toggle();
      });
      this.cont = cont;
      this.btn = btn;
      /** @inherited */

      this.initialized = true;
      this.emitter.emit('feature-initialized', this);
    }
    /**
     * Toggle help pop-up
     */

  }, {
    key: "toggle",
    value: function toggle() {
      // check only if explicitily disabled as in this case undefined
      // signifies the help feature is enabled by default
      if (!this.isEnabled()) {
        return;
      } // ensure mouseup event handler is removed


      Object(_event__WEBPACK_IMPORTED_MODULE_2__["removeEvt"])(_root__WEBPACK_IMPORTED_MODULE_4__["root"], 'mouseup', this.boundMouseup);
      var divDisplay = this.cont.style.display;

      if (divDisplay === '' || divDisplay === _const__WEBPACK_IMPORTED_MODULE_3__["NONE"]) {
        this.cont.style.display = 'inline'; // if table element has a horizontal scrollbar adjust container
        // left position

        if (this.tf.dom().scrollLeft > 0) {
          this.cont.style.left = "".concat(this.btn.offsetLeft - this.tf.dom().scrollLeft + this.contAdjustLeftPosition, "px");
          console.log(this.btn.offsetLeft, this.tf.dom().scrollLeft);
        }

        Object(_event__WEBPACK_IMPORTED_MODULE_2__["addEvt"])(_root__WEBPACK_IMPORTED_MODULE_4__["root"], 'mouseup', this.boundMouseup);
      } else {
        this.cont.style.display = _const__WEBPACK_IMPORTED_MODULE_3__["NONE"];
        this.cont.style.left = '';
      }
    }
    /**
     * Remove help UI
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.initialized) {
        return;
      }

      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.btn);
      this.btn = null;
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.cont);
      this.cont = null;
      this.boundMouseup = null;
      this.initialized = false;
    }
  }]);

  return Help;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]); // TODO: remove as soon as feature name is fixed

Help.meta = {
  alwaysInstantiate: true
};

/***/ }),

/***/ "./src/modules/highlightKeywords.js":
/*!******************************************!*\
  !*** ./src/modules/highlightKeywords.js ***!
  \******************************************/
/*! exports provided: HighlightKeyword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighlightKeyword", function() { return HighlightKeyword; });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../string */ "./src/string.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





/**
 * Highlight matched keywords upon filtering
 *
 * @export
 * @class HighlightKeyword
 */

var HighlightKeyword = /*#__PURE__*/function () {
  /**
   * Creates an instance of HighlightKeyword
   * @param {TableFilter} tf TableFilter instance
   */
  function HighlightKeyword(tf) {
    _classCallCheck(this, HighlightKeyword);

    var f = tf.config();
    /**
     * Css class for highlighted term
     * @type {String}
     */

    this.highlightCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.highlight_css_class, 'keyword');
    /**
     * TableFilter instance
     * @type {TableFilter}
     */

    this.tf = tf;
    /**
     * TableFilter's emitter instance
     * @type {Emitter}
     */

    this.emitter = tf.emitter;
  }
  /**
   * Initializes HighlightKeyword instance
   */


  _createClass(HighlightKeyword, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.emitter.on(['before-filtering', 'destroy'], function () {
        return _this.unhighlightAll();
      });
      this.emitter.on(['highlight-keyword'], function (tf, cell, term) {
        return _this._processTerm(cell, term);
      });
    }
    /**
     * Highlight occurences of searched term in passed node
     * @param  {Node} node
     * @param  {String} term     Searched term
     * @param  {String} cssClass Css class name
     *
     * TODO: refactor this method
     */

  }, {
    key: "highlight",
    value: function highlight(node, term, cssClass) {
      // Iterate into this nodes childNodes
      if (node.hasChildNodes) {
        var children = node.childNodes;

        for (var i = 0; i < children.length; i++) {
          this.highlight(children[i], term, cssClass);
        }
      }

      if (node.nodeType === 3) {
        var nodeVal = node.nodeValue.toLowerCase();
        var termIdx = nodeVal.indexOf(term.toLowerCase());

        if (termIdx !== -1) {
          var pn = node.parentNode;

          if (pn && pn.className !== cssClass) {
            // term not highlighted yet
            var nv = node.nodeValue,
                // Create a load of replacement nodes
            before = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["createText"])(nv.substr(0, termIdx)),
                value = nv.substr(termIdx, term.length),
                after = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["createText"])(nv.substr(termIdx + term.length)),
                text = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["createText"])(value),
                container = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["createElm"])('span');
            container.className = cssClass;
            container.appendChild(text);
            pn.insertBefore(before, node);
            pn.insertBefore(container, node);
            pn.insertBefore(after, node);
            pn.removeChild(node);
          }
        }
      }
    }
    /**
     * Removes highlight to nodes matching passed string
     * @param  {String} term
     * @param  {String} cssClass Css class to remove
     */

  }, {
    key: "unhighlight",
    value: function unhighlight(term, cssClass) {
      var highlightedNodes = this.tf.dom().querySelectorAll(".".concat(cssClass));

      for (var i = 0; i < highlightedNodes.length; i++) {
        var n = highlightedNodes[i];
        var nodeVal = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getText"])(n);

        if (Object(_types__WEBPACK_IMPORTED_MODULE_1__["isNull"])(term) || nodeVal.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
          var parentNode = n.parentNode;
          parentNode.replaceChild(Object(_dom__WEBPACK_IMPORTED_MODULE_0__["createText"])(nodeVal), n);
          parentNode.normalize();
        }
      }
    }
    /**
     * Clear all occurrences of highlighted nodes
     */

  }, {
    key: "unhighlightAll",
    value: function unhighlightAll() {
      if (!this.tf.highlightKeywords) {
        return;
      }

      this.unhighlight(null, this.highlightCssClass);
    }
    /**  Remove feature */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.emitter.off(['before-filtering', 'destroy'], function () {
        return _this2.unhighlightAll();
      });
      this.emitter.off(['highlight-keyword'], function (tf, cell, term) {
        return _this2._processTerm(cell, term);
      });
    }
    /**
     * Ensure filtering operators are handled before highlighting any match
     * @param {any} Table cell to look searched term into
     * @param {any} Searched termIdx
     */

  }, {
    key: "_processTerm",
    value: function _processTerm(cell, term) {
      var tf = this.tf;
      var reLk = new RegExp(Object(_string__WEBPACK_IMPORTED_MODULE_2__["rgxEsc"])(tf.lkOperator));
      var reEq = new RegExp(tf.eqOperator);
      var reSt = new RegExp(tf.stOperator);
      var reEn = new RegExp(tf.enOperator);
      var reLe = new RegExp(tf.leOperator);
      var reGe = new RegExp(tf.geOperator);
      var reL = new RegExp(tf.lwOperator);
      var reG = new RegExp(tf.grOperator);
      var reD = new RegExp(tf.dfOperator);
      term = term.replace(reLk, '').replace(reEq, '').replace(reSt, '').replace(reEn, '');

      if (reLe.test(term) || reGe.test(term) || reL.test(term) || reG.test(term) || reD.test(term)) {
        term = Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getText"])(cell);
      }

      if (term === '') {
        return;
      }

      this.highlight(cell, term, this.highlightCssClass);
    }
  }]);

  return HighlightKeyword;
}(); // TODO: remove as soon as feature name is fixed

HighlightKeyword.meta = {
  name: 'highlightKeyword',
  altName: 'highlightKeywords'
};

/***/ }),

/***/ "./src/modules/loader.js":
/*!*******************************!*\
  !*** ./src/modules/loader.js ***!
  \*******************************/
/*! exports provided: Loader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return Loader; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../root */ "./src/root.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var BEFORE_ACTION_EVENTS = ['before-filtering', 'before-populating-filter', 'before-page-change', 'before-clearing-filters', 'before-page-length-change', 'before-reset-page', 'before-reset-page-length', 'before-loading-extensions', 'before-loading-themes'];
var AFTER_ACTION_EVENTS = ['after-filtering', 'after-populating-filter', 'after-page-change', 'after-clearing-filters', 'after-page-length-change', 'after-reset-page', 'after-reset-page-length', 'after-loading-extensions', 'after-loading-themes'];
/**
 * Activity indicator
 *
 * @export
 * @class Loader
 * @extends {Feature}
 */

var Loader = /*#__PURE__*/function (_Feature) {
  _inherits(Loader, _Feature);

  var _super = _createSuper(Loader);

  /**
   * Creates an instance of Loader.
   *
   * @param {TableFilter} tf TableFilter instance
   */
  function Loader(tf) {
    var _this;

    _classCallCheck(this, Loader);

    _this = _super.call(this, tf, Loader);
    var f = _this.config.loader || {};
    /**
     * ID of custom container element
     * @type {String}
     */

    _this.targetId = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.target_id, null);
    /**
     * Loader container DOM element
     * @type {DOMElement}
     */

    _this.cont = null;
    /**
     * Text displayed when indicator is visible
     * @type {String}
     */

    _this.text = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.text, 'Loading...');
    /**
     * Custom HTML injected in Loader's container element
     * @type {String}
     */

    _this.html = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.html, null);
    /**
     * Css class for Loader's container element
     * @type {String}
     */

    _this.cssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.css_class, 'loader');
    /**
     * Close delay in milliseconds
     * @type {Number}
     */

    _this.closeDelay = 250;
    /**
     * Callback fired when loader is displayed
     * @type {Function}
     */

    _this.onShow = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsFn"])(f.on_show_loader, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired when loader is closed
     * @type {Function}
     */

    _this.onHide = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsFn"])(f.on_hide_loader, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    return _this;
  }
  /**
   * Initializes Loader instance
   */


  _createClass(Loader, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      }

      var tf = this.tf;
      var emitter = this.emitter;
      var containerDiv = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('div');
      containerDiv.className = this.cssClass;
      var targetEl = !this.targetId ? tf.dom().parentNode : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.targetId);

      if (!this.targetId) {
        targetEl.insertBefore(containerDiv, tf.dom());
      } else {
        targetEl.appendChild(containerDiv);
      }

      this.cont = containerDiv;

      if (!this.html) {
        this.cont.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createText"])(this.text));
      } else {
        this.cont.innerHTML = this.html;
      }

      this.show(_const__WEBPACK_IMPORTED_MODULE_4__["NONE"]); // Subscribe to events

      emitter.on(BEFORE_ACTION_EVENTS, function () {
        return _this2.show('');
      });
      emitter.on(AFTER_ACTION_EVENTS, function () {
        return _this2.show(_const__WEBPACK_IMPORTED_MODULE_4__["NONE"]);
      });
      /** @inherited */

      this.initialized = true;
    }
    /**
     * Shows or hides activity indicator
     * @param {String} Two possible values: '' or 'none'
     */

  }, {
    key: "show",
    value: function show(p) {
      if (!this.isEnabled()) {
        return;
      }

      function displayLoader() {
        if (!this.cont) {
          return;
        }

        if (p !== _const__WEBPACK_IMPORTED_MODULE_4__["NONE"]) {
          this.onShow(this);
        }

        this.cont.style.display = p;

        if (p === _const__WEBPACK_IMPORTED_MODULE_4__["NONE"]) {
          this.onHide(this);
        }
      }

      ;
      var t = p === _const__WEBPACK_IMPORTED_MODULE_4__["NONE"] ? this.closeDelay : 1;
      _root__WEBPACK_IMPORTED_MODULE_3__["root"].setTimeout(displayLoader.bind(this), t);
    }
    /**
     * Removes feature
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      if (!this.initialized) {
        return;
      }

      var emitter = this.emitter;
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.cont);
      this.cont = null; // Unsubscribe to events

      emitter.off(BEFORE_ACTION_EVENTS, function () {
        return _this3.show('');
      });
      emitter.off(AFTER_ACTION_EVENTS, function () {
        return _this3.show(_const__WEBPACK_IMPORTED_MODULE_4__["NONE"]);
      });
      this.initialized = false;
    }
  }]);

  return Loader;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);

/***/ }),

/***/ "./src/modules/markActiveColumns.js":
/*!******************************************!*\
  !*** ./src/modules/markActiveColumns.js ***!
  \******************************************/
/*! exports provided: MarkActiveColumns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkActiveColumns", function() { return MarkActiveColumns; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





/**
 * Visual indicator for filtered columns
 * @export
 * @class MarkActiveColumns
 * @extends {Feature}
 */

var MarkActiveColumns = /*#__PURE__*/function (_Feature) {
  _inherits(MarkActiveColumns, _Feature);

  var _super = _createSuper(MarkActiveColumns);

  /**
   * Create an instance of MarkActiveColumns
   * @param {TableFilter} tf TableFilter instance
   */
  function MarkActiveColumns(tf) {
    var _this;

    _classCallCheck(this, MarkActiveColumns);

    _this = _super.call(this, tf, MarkActiveColumns);
    var config = _this.config.mark_active_columns || {};
    /**
     * Css class for filtered (active) columns
     * @type {String}
     */

    _this.headerCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(config.header_css_class, 'activeHeader');
    /**
     * Css class for filtered (active) column cells
     * @type {String}
     */

    _this.cellCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(config.cell_css_class, 'activeCell');
    /**
     * Enable/disable column highlighting
     * @type {Boolean}
     */

    _this.highlightColumn = Boolean(config.highlight_column);
    /**
     * Callback fired before a column is marked as filtered
     * @type {Function}
     */

    _this.onBeforeActiveColumn = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsFn"])(config.on_before_active_column, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after a column is marked as filtered
     * @type {Function}
     */

    _this.onAfterActiveColumn = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsFn"])(config.on_after_active_column, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    return _this;
  }
  /**
   * Initialise MarkActiveColumns instance
   */


  _createClass(MarkActiveColumns, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      }

      this.emitter.on(['before-filtering'], function () {
        return _this2.clearActiveColumns();
      });
      this.emitter.on(['cell-processed'], function (tf, colIndex) {
        return _this2.markActiveColumn(colIndex);
      });
      /** @inherited */

      this.initialized = true;
    }
    /**
     * Clear filtered columns visual indicator (background color)
     */

  }, {
    key: "clearActiveColumns",
    value: function clearActiveColumns() {
      var _this3 = this;

      var tf = this.tf;
      tf.eachCol(function (idx) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(tf.getHeaderElement(idx), _this3.headerCssClass);

        if (_this3.highlightColumn) {
          _this3.eachColumnCell(idx, function (cell) {
            return Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(cell, _this3.cellCssClass);
          });
        }
      });
    }
    /**
     * Mark currently filtered column
     * @param  {Number} colIndex Column index
     */

  }, {
    key: "markActiveColumn",
    value: function markActiveColumn(colIndex) {
      var _this4 = this;

      var tf = this.tf;
      var header = tf.getHeaderElement(colIndex);

      if (Object(_dom__WEBPACK_IMPORTED_MODULE_1__["hasClass"])(header, this.headerCssClass)) {
        return;
      }

      this.onBeforeActiveColumn(this, colIndex);
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(header, this.headerCssClass);

      if (this.highlightColumn) {
        this.eachColumnCell(colIndex, function (cell) {
          return Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(cell, _this4.cellCssClass);
        });
      }

      this.onAfterActiveColumn(this, colIndex);
    }
    /**
     * Column cells iterator
     * TODO: make public and move into TableFilter if used elsewhere
     * @param {Number} colIndex
     * @param {Function} fn
     * @param {DOMElement} tbl
     * @private
     */

  }, {
    key: "eachColumnCell",
    value: function eachColumnCell(colIndex) {
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"];
      var tbl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.tf.dom();
      // TODO: remove [].forEach when polyfill for PhanthomJs is available
      [].forEach.call(tbl.querySelectorAll("tbody td:nth-child(".concat(colIndex + 1, ")")), fn);
    }
    /**
     * Remove feature
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;

      if (!this.initialized) {
        return;
      }

      this.clearActiveColumns();
      this.emitter.off(['before-filtering'], function () {
        return _this5.clearActiveColumns();
      });
      this.emitter.off(['cell-processed'], function (tf, colIndex) {
        return _this5.markActiveColumn(colIndex);
      });
      /** @inherited */

      this.initialized = false;
    }
  }]);

  return MarkActiveColumns;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);

/***/ }),

/***/ "./src/modules/noResults.js":
/*!**********************************!*\
  !*** ./src/modules/noResults.js ***!
  \**********************************/
/*! exports provided: NoResults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoResults", function() { return NoResults; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






/**
 * UI when filtering yields no matches
 * @export
 * @class NoResults
 * @extends {Feature}
 */

var NoResults = /*#__PURE__*/function (_Feature) {
  _inherits(NoResults, _Feature);

  var _super = _createSuper(NoResults);

  /**
   * Creates an instance of NoResults
   * @param {TableFilter} tf TableFilter instance
   */
  function NoResults(tf) {
    var _this;

    _classCallCheck(this, NoResults);

    _this = _super.call(this, tf, NoResults); //configuration object

    var f = _this.config.no_results_message || {};
    /**
     * Text (accepts HTML)
     * @type {String}
     */

    _this.content = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.content, 'No results');
    /**
     * Custom container DOM element
     * @type {DOMElement}
     */

    _this.customContainer = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.custom_container, null);
    /**
     * ID of custom container element
     * @type {String}
     */

    _this.customContainerId = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.custom_container_id, null);
    /**
     * Indicates if UI is contained in a external element
     * @type {Boolean}
     * @private
     */

    _this.isExternal = !Object(_types__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(_this.customContainer) || !Object(_types__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(_this.customContainerId);
    /**
     * Css class assigned to container element
     * @type {String}
     */

    _this.cssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.css_class, 'no-results');
    /**
     * Stores container DOM element
     * @type {DOMElement}
     */

    _this.cont = null;
    /**
     * Callback fired before the message is displayed
     * @type {Function}
     */

    _this.onBeforeShow = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsFn"])(f.on_before_show_msg, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after the message is displayed
     * @type {Function}
     */

    _this.onAfterShow = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsFn"])(f.on_after_show_msg, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired before the message is hidden
     * @type {Function}
     */

    _this.onBeforeHide = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsFn"])(f.on_before_hide_msg, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after the message is hidden
     * @type {Function}
     */

    _this.onAfterHide = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsFn"])(f.on_after_hide_msg, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    return _this;
  }
  /**
   * Initializes NoResults instance
   */


  _createClass(NoResults, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      }

      var tf = this.tf;
      var target = this.customContainer || Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.customContainerId) || tf.dom(); //container

      var cont = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('div');
      cont.className = this.cssClass;
      cont.innerHTML = this.content;

      if (this.isExternal) {
        target.appendChild(cont);
      } else {
        target.parentNode.insertBefore(cont, target.nextSibling);
      }

      this.cont = cont; // subscribe to after-filtering event

      this.emitter.on(['initialized', 'after-filtering'], function () {
        return _this2.toggle();
      });
      /** @inherited */

      this.initialized = true;
    }
    /**
     * Toggle no results message
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this.tf.getValidRowsNb() > 0) {
        this.hide();
      } else {
        this.show();
      }
    }
    /**
     * Show no results message
     */

  }, {
    key: "show",
    value: function show() {
      if (!this.initialized || !this.isEnabled()) {
        return;
      }

      this.onBeforeShow(this.tf, this);
      this.setWidth();
      this.cont.style.display = 'block';
      this.onAfterShow(this.tf, this);
    }
    /**
     * Hide no results message
     */

  }, {
    key: "hide",
    value: function hide() {
      if (!this.initialized || !this.isEnabled()) {
        return;
      }

      this.onBeforeHide(this.tf, this);
      this.cont.style.display = _const__WEBPACK_IMPORTED_MODULE_3__["NONE"];
      this.onAfterHide(this.tf, this);
    }
    /**
     * Sets no results container width
     * @private
     */

  }, {
    key: "setWidth",
    value: function setWidth() {
      if (!this.initialized || this.isExternal || !this.isEnabled()) {
        return;
      }

      var tf = this.tf;

      if (tf.gridLayout) {
        var gridLayout = tf.feature('gridLayout');
        this.cont.style.width = gridLayout.headTbl.clientWidth + 'px';
      } else {
        this.cont.style.width = (tf.dom().tHead ? tf.dom().tHead.clientWidth : tf.dom().tBodies[0].clientWidth) + 'px';
      }
    }
    /** Remove feature */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      if (!this.initialized) {
        return;
      }

      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.cont);
      this.cont = null; // unsubscribe to after-filtering event

      this.emitter.off(['after-filtering'], function () {
        return _this3.toggle();
      });
      this.initialized = false;
    }
  }]);

  return NoResults;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);

/***/ }),

/***/ "./src/modules/paging.js":
/*!*******************************!*\
  !*** ./src/modules/paging.js ***!
  \*******************************/
/*! exports provided: Paging */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Paging", function() { return Paging; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event */ "./src/event.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./toolbar */ "./src/modules/toolbar.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








/**
 * Paging UI component
 * @export
 * @class Paging
 * @extends {Feature}
 */

var Paging = /*#__PURE__*/function (_Feature) {
  _inherits(Paging, _Feature);

  var _super = _createSuper(Paging);

  /**
   * Creates an instance of Paging
   * @param {TableFilter} tf TableFilter instance
   */
  function Paging(tf) {
    var _this;

    _classCallCheck(this, Paging);

    _this = _super.call(this, tf, Paging); // Configuration object

    var f = _this.config.paging || {};
    /**
     * Css class for the paging buttons (previous, next, etc.)
     * @type {String}
     */

    _this.btnCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_css_class, 'pgInp');
    /**
     * Main select DOM element
     * @type {DOMElement}
     */

    _this.pageSlc = null;
    /**
     * Results per page select DOM element
     * @type {DOMElement}
     */

    _this.pageLengthSlc = null;
    /**
     * ID of custom container element
     * @type {String}
     */

    _this.tgtId = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.target_id, null);
    /**
     * Number of rows contained in a page
     * @type {Number}
     */

    _this.pageLength = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsNb"])(f.length, 10);
    /**
     * ID of custom container element for the results per page selector
     * @type {String}
     */

    _this.pageLengthTgtId = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.results_per_page_target_id, null);
    /**
     * Css class for the paging select element
     * @type {String}
     */

    _this.pgSlcCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.slc_css_class, 'pgSlc');
    /**
     * Css class for the paging input element
     * @type {String}
     */

    _this.pgInpCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.inp_css_class, 'pgNbInp');
    /**
     * Label and values for the results per page select, example of usage:
     * ['Records: ', [10,25,50,100]]
     * @type {Array}
     */

    _this.resultsPerPage = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsArr"])(f.results_per_page, null);
    /**
     * Determines if results per page is configured
     * @type {Boolean}
     */

    _this.hasResultsPerPage = Object(_types__WEBPACK_IMPORTED_MODULE_2__["isArray"])(_this.resultsPerPage);
    /**
     * Css class for the results per page select
     * @type {String}
     */

    _this.resultsSlcCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.results_slc_css_class, 'rspg');
    /**
     * Css class for the label preceding results per page select
     * @type {String}
     */

    _this.resultsSpanCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.results_span_css_class, 'rspgSpan');
    /**
     * Index of the first row of current page
     * @type {Number}
     * @private
     */

    _this.startPagingRow = 0;
    /**
     * Total number of pages
     * @type {Number}
     * @private
     */

    _this.nbPages = 0;
    /**
     * Current page number
     * @type {Number}
     * @private
     */

    _this.currentPageNb = 1;
    /**
     * Next page button text
     * @type {String}
     */

    _this.btnNextPageText = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_next_page_text, '>');
    /**
     * Previous page button text
     * @type {String}
     */

    _this.btnPrevPageText = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_prev_page_text, '<');
    /**
     * Last page button text
     * @type {String}
     */

    _this.btnLastPageText = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_last_page_text, '>|');
    /**
     * First page button text
     * @type {String}
     */

    _this.btnFirstPageText = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_first_page_text, '|<');
    /**
     * Next page button HTML
     * @type {String}
     */

    _this.btnNextPageHtml = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_next_page_html, !tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnCssClass + ' nextPage" title="Next page" />');
    /**
     * Previous page button HTML
     * @type {String}
     */

    _this.btnPrevPageHtml = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_prev_page_html, !tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnCssClass + ' previousPage" title="Previous page" />');
    /**
     * First page button HTML
     * @type {String}
     */

    _this.btnFirstPageHtml = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_first_page_html, !tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnCssClass + ' firstPage" title="First page" />');
    /**
     * Last page button HTML
     * @type {String}
     */

    _this.btnLastPageHtml = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_last_page_html, !tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnCssClass + ' lastPage" title="Last page" />');
    /**
     * Text preceeding page selector drop-down
     * @type {String}
     */

    _this.pageText = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.page_text, ' Page ');
    /**
     * Text after page selector drop-down
     * @type {String}
     */

    _this.ofText = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.of_text, ' of ');
    /**
     * Css class for the span containing total number of pages
     * @type {String}
     */

    _this.nbPgSpanCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.nb_pages_css_class, 'nbpg');
    /**
     * Determines if paging buttons are enabled (default: true)
     * @type {Boolean}
     */

    _this.hasBtns = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsBool"])(f.btns, true);
    /**
     * Defines page selector type, two possible values: 'select', 'input'
     * @type {String}
     */

    _this.pageSelectorType = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.page_selector_type, _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"]);
    /**
     * Default position in toolbar ('left'|'center'|'right')
     * @type {String}
     */

    _this.toolbarPosition = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.toolbar_position, _toolbar__WEBPACK_IMPORTED_MODULE_6__["CENTER"]);
    /**
     * Callback fired before the page is changed
     * @type {Function}
     */

    _this.onBeforeChangePage = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsFn"])(f.on_before_change_page, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after the page is changed
     * @type {Function}
     */

    _this.onAfterChangePage = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsFn"])(f.on_after_change_page, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Label preciding results per page select
     * @type {DOMElement}
     * @private
     */

    _this.slcResultsTxt = null;
    /**
     * Span containing next page button
     * @type {DOMElement}
     * @private
     */

    _this.btnNextCont = null;
    /**
     * Span containing previous page button
     * @type {DOMElement}
     * @private
     */

    _this.btnPrevCont = null;
    /**
     * Span containing last page button
     * @type {DOMElement}
     * @private
     */

    _this.btnLastCont = null;
    /**
     * Span containing first page button
     * @type {DOMElement}
     * @private
     */

    _this.btnFirstCont = null;
    /**
     * Span for tot nb pages
     * @type {DOMElement}
     * @private
     */

    _this.pgCont = null;
    /**
     * Span preceding pages select (contains 'Page')
     * @type {DOMElement}
     * @private
     */

    _this.pgBefore = null;
    /**
     * Span following pages select (contains ' of ')
     * @type {DOMElement}
     * @private
     */

    _this.pgAfter = null;
    var startRow = tf.refRow;
    var nrows = tf.getRowsNb(true); //calculates page nb

    _this.nbPages = Math.ceil((nrows - startRow) / _this.pageLength);

    var o = _assertThisInitialized(_this);
    /**
     * Paging DOM events handlers
     * @type {String}
     * @private
     */


    _this.evt = {
      slcIndex: function slcIndex() {
        return o.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"] ? o.pageSlc.options.selectedIndex : parseInt(o.pageSlc.value, 10) - 1;
      },
      nbOpts: function nbOpts() {
        return o.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"] ? parseInt(o.pageSlc.options.length, 10) - 1 : o.nbPages - 1;
      },
      next: function next() {
        var nextIndex = o.evt.slcIndex() < o.evt.nbOpts() ? o.evt.slcIndex() + 1 : 0;
        o.changePage(nextIndex);
      },
      prev: function prev() {
        var prevIndex = o.evt.slcIndex() > 0 ? o.evt.slcIndex() - 1 : o.evt.nbOpts();
        o.changePage(prevIndex);
      },
      last: function last() {
        o.changePage(o.evt.nbOpts());
      },
      first: function first() {
        o.changePage(0);
      },
      _detectKey: function _detectKey(e) {
        if (Object(_event__WEBPACK_IMPORTED_MODULE_3__["isKeyPressed"])(e, [_const__WEBPACK_IMPORTED_MODULE_4__["ENTER_KEY"]])) {
          if (tf.sorted) {
            tf.filter();
            o.changePage(o.evt.slcIndex());
          } else {
            o.changePage();
          }

          this.blur();
        }
      },
      slcPagesChange: null,
      nextEvt: null,
      prevEvt: null,
      lastEvt: null,
      firstEvt: null
    };
    return _this;
  }
  /**
   * Initialize DOM elements
   */


  _createClass(Paging, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var slcPages;
      var tf = this.tf;
      var evt = this.evt;

      if (this.initialized) {
        return;
      }

      this.emitter.emit('initializing-feature', this, !Object(_types__WEBPACK_IMPORTED_MODULE_2__["isNull"])(this.tgtId)); // Check resultsPerPage is in expected format and initialise the
      // results per page component

      if (this.hasResultsPerPage) {
        if (this.resultsPerPage.length < 2) {
          this.hasResultsPerPage = false;
        } else {
          this.pageLength = this.resultsPerPage[1][0];
          this.setResultsPerPage();
        }
      }

      evt.slcPagesChange = function (event) {
        var slc = event.target;

        _this2.changePage(slc.selectedIndex);
      }; // Paging drop-down list selector


      if (this.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"]) {
        slcPages = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(_const__WEBPACK_IMPORTED_MODULE_4__["SELECT"]);
        slcPages.className = this.pgSlcCssClass;
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(slcPages, 'change', evt.slcPagesChange);
      } // Paging input selector


      if (this.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["INPUT"]) {
        slcPages = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(_const__WEBPACK_IMPORTED_MODULE_4__["INPUT"], ['value', this.currentPageNb]);
        slcPages.className = this.pgInpCssClass;
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(slcPages, 'keypress', evt._detectKey);
      } // btns containers


      var btnNextSpan = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      var btnPrevSpan = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      var btnLastSpan = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      var btnFirstSpan = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');

      if (this.hasBtns) {
        // Next button
        if (!this.btnNextPageHtml) {
          var btnNext = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(_const__WEBPACK_IMPORTED_MODULE_4__["INPUT"], ['type', 'button'], ['value', this.btnNextPageText], ['title', 'Next']);
          btnNext.className = this.btnCssClass;
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btnNext, 'click', evt.next);
          btnNextSpan.appendChild(btnNext);
        } else {
          btnNextSpan.innerHTML = this.btnNextPageHtml;
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btnNextSpan, 'click', evt.next);
        } // Previous button


        if (!this.btnPrevPageHtml) {
          var btnPrev = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(_const__WEBPACK_IMPORTED_MODULE_4__["INPUT"], ['type', 'button'], ['value', this.btnPrevPageText], ['title', 'Previous']);
          btnPrev.className = this.btnCssClass;
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btnPrev, 'click', evt.prev);
          btnPrevSpan.appendChild(btnPrev);
        } else {
          btnPrevSpan.innerHTML = this.btnPrevPageHtml;
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btnPrevSpan, 'click', evt.prev);
        } // Last button


        if (!this.btnLastPageHtml) {
          var btnLast = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(_const__WEBPACK_IMPORTED_MODULE_4__["INPUT"], ['type', 'button'], ['value', this.btnLastPageText], ['title', 'Last']);
          btnLast.className = this.btnCssClass;
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btnLast, 'click', evt.last);
          btnLastSpan.appendChild(btnLast);
        } else {
          btnLastSpan.innerHTML = this.btnLastPageHtml;
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btnLastSpan, 'click', evt.last);
        } // First button


        if (!this.btnFirstPageHtml) {
          var btnFirst = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(_const__WEBPACK_IMPORTED_MODULE_4__["INPUT"], ['type', 'button'], ['value', this.btnFirstPageText], ['title', 'First']);
          btnFirst.className = this.btnCssClass;
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btnFirst, 'click', evt.first);
          btnFirstSpan.appendChild(btnFirst);
        } else {
          btnFirstSpan.innerHTML = this.btnFirstPageHtml;
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(btnFirstSpan, 'click', evt.first);
        }
      } // paging elements (buttons+drop-down list) are added to defined element


      var targetEl = !this.tgtId ? tf.feature('toolbar').container(this.toolbarPosition) : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.tgtId);
      targetEl.appendChild(btnFirstSpan);
      targetEl.appendChild(btnPrevSpan);
      var pgBeforeSpan = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      pgBeforeSpan.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createText"])(this.pageText));
      pgBeforeSpan.className = this.nbPgSpanCssClass;
      targetEl.appendChild(pgBeforeSpan);
      targetEl.appendChild(slcPages);
      var pgAfterSpan = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      pgAfterSpan.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createText"])(this.ofText));
      pgAfterSpan.className = this.nbPgSpanCssClass;
      targetEl.appendChild(pgAfterSpan);
      var pgSpan = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      pgSpan.className = this.nbPgSpanCssClass;
      pgSpan.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createText"])(' ' + this.nbPages + ' '));
      targetEl.appendChild(pgSpan);
      targetEl.appendChild(btnNextSpan);
      targetEl.appendChild(btnLastSpan);
      this.btnNextCont = btnNextSpan;
      this.btnPrevCont = btnPrevSpan;
      this.btnLastCont = btnLastSpan;
      this.btnFirstCont = btnFirstSpan;
      this.pgCont = pgSpan;
      this.pgBefore = pgBeforeSpan;
      this.pgAfter = pgAfterSpan;
      this.pageSlc = slcPages;
      this.setPagingInfo();

      if (!tf.fltGrid) {
        tf.validateAllRows();
        this.setPagingInfo(tf.validRowsIndex);
      }

      this.emitter.on(['after-filtering'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.resetPagingInfo, this));
      this.emitter.on(['change-page'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.changePageHandler, this));
      this.emitter.on(['change-page-results'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.changePageResultsHandler, this));
      /** @inherited */

      this.initialized = true;
      this.emitter.emit('feature-initialized', this);
    }
    /**
     * Reset paging when filters are already instantiated
     * @param {Boolean} filterTable Execute filtering once paging instanciated
     */

  }, {
    key: "reset",
    value: function reset() {
      var filterTable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.enable();
      this.init();

      if (filterTable) {
        this.tf.filter();
      }
    }
    /**
     * Reset paging info from scratch after a filtering process
     */

  }, {
    key: "resetPagingInfo",
    value: function resetPagingInfo() {
      this.startPagingRow = 0;
      this.currentPageNb = 1;
      this.setPagingInfo(this.tf.validRowsIndex);
    }
    /**
     * Calculate number of pages based on valid rows
     * Refresh paging select according to number of pages
     * @param {Array} validRows Collection of valid rows
     */

  }, {
    key: "setPagingInfo",
    value: function setPagingInfo(validRows) {
      var tf = this.tf;
      var cont = !this.tgtId ? tf.feature('toolbar').container(this.toolbarPosition) : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.tgtId); //store valid rows indexes

      tf.validRowsIndex = validRows || tf.getValidRows(true); //calculate nb of pages

      this.nbPages = Math.ceil(tf.validRowsIndex.length / this.pageLength); //refresh page nb span

      this.pgCont.innerHTML = this.nbPages; //select clearing shortcut

      if (this.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"]) {
        this.pageSlc.innerHTML = '';
      }

      if (this.nbPages > 0) {
        cont.style.visibility = 'visible';

        if (this.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"]) {
          for (var z = 0; z < this.nbPages; z++) {
            var opt = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createOpt"])(z + 1, z * this.pageLength, false);
            this.pageSlc.options[z] = opt;
          }
        } else {
          //input type
          this.pageSlc.value = this.currentPageNb;
        }
      } else {
        /*** if no results paging select and buttons are hidden ***/
        cont.style.visibility = 'hidden';
      }

      this.groupByPage(tf.validRowsIndex);
    }
    /**
     * Group table rows by page and display valid rows
     * @param  {Array} validRows Collection of valid rows
     */

  }, {
    key: "groupByPage",
    value: function groupByPage(validRows) {
      var tf = this.tf;
      var rows = tf.dom().rows;
      var startPagingRow = parseInt(this.startPagingRow, 10);
      var endPagingRow = startPagingRow + parseInt(this.pageLength, 10); //store valid rows indexes

      if (validRows) {
        tf.validRowsIndex = validRows;
      } //this loop shows valid rows of current page


      for (var h = 0, len = tf.getValidRowsNb(true); h < len; h++) {
        var validRowIdx = tf.validRowsIndex[h];
        var r = rows[validRowIdx];
        var isRowValid = r.getAttribute('validRow');
        var rowDisplayed = false;

        if (h >= startPagingRow && h < endPagingRow) {
          if (Object(_types__WEBPACK_IMPORTED_MODULE_2__["isNull"])(isRowValid) || Boolean(isRowValid === 'true')) {
            r.style.display = '';
            rowDisplayed = true;
          }
        } else {
          r.style.display = _const__WEBPACK_IMPORTED_MODULE_4__["NONE"];
        }

        this.emitter.emit('row-paged', tf, validRowIdx, h, rowDisplayed);
      } // broadcast grouping by page


      this.emitter.emit('grouped-by-page', tf, this);
    }
    /**
     * Return the current page number
     * @return {Number} Page number
     */

  }, {
    key: "getPage",
    value: function getPage() {
      return this.currentPageNb;
    }
    /**
     * Show page defined by passed argument (string or number):
     * @param {String}/{Number} cmd possible string values: 'next',
     *   'previous', 'last', 'first' or page number as per param
     */

  }, {
    key: "setPage",
    value: function setPage(cmd) {
      var tf = this.tf;

      if (!tf.isInitialized() || !this.isEnabled()) {
        return;
      }

      var btnEvt = this.evt,
          cmdtype = _typeof(cmd);

      if (cmdtype === 'string') {
        switch (cmd.toLowerCase()) {
          case 'next':
            btnEvt.next();
            break;

          case 'previous':
            btnEvt.prev();
            break;

          case 'last':
            btnEvt.last();
            break;

          case 'first':
            btnEvt.first();
            break;

          default:
            btnEvt.next();
            break;
        }
      } else if (cmdtype === 'number') {
        this.changePage(cmd - 1);
      }
    }
    /**
     * Generates UI elements for the number of results per page drop-down
     */

  }, {
    key: "setResultsPerPage",
    value: function setResultsPerPage() {
      var _this3 = this;

      var tf = this.tf;
      var evt = this.evt;

      if (this.pageLengthSlc || !this.resultsPerPage) {
        return;
      }

      evt.slcResultsChange = function (ev) {
        _this3.onChangeResultsPerPage();

        ev.target.blur();
      };

      var slcR = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(_const__WEBPACK_IMPORTED_MODULE_4__["SELECT"]);
      slcR.className = this.resultsSlcCssClass;
      var slcRText = this.resultsPerPage[0],
          slcROpts = this.resultsPerPage[1];
      var slcRSpan = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      slcRSpan.className = this.resultsSpanCssClass; // results per page select is added to external element

      var targetEl = !this.pageLengthTgtId ? tf.feature('toolbar').container(_toolbar__WEBPACK_IMPORTED_MODULE_6__["RIGHT"]) : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.pageLengthTgtId);
      slcRSpan.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createText"])(slcRText));
      var help = tf.feature('help');

      if (help && help.btn) {
        help.btn.parentNode.insertBefore(slcRSpan, help.btn);
        help.btn.parentNode.insertBefore(slcR, help.btn);
      } else {
        targetEl.appendChild(slcRSpan);
        targetEl.appendChild(slcR);
      }

      for (var r = 0; r < slcROpts.length; r++) {
        var currOpt = new Option(slcROpts[r], slcROpts[r], false, false);
        slcR.options[r] = currOpt;
      }

      Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(slcR, 'change', evt.slcResultsChange);
      this.slcResultsTxt = slcRSpan;
      this.pageLengthSlc = slcR;
    }
    /**
     * Remove number of results per page UI elements
     */

  }, {
    key: "removeResultsPerPage",
    value: function removeResultsPerPage() {
      var tf = this.tf;

      if (!tf.isInitialized() || !this.pageLengthSlc || !this.resultsPerPage) {
        return;
      }

      if (this.pageLengthSlc) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.pageLengthSlc);
      }

      if (this.slcResultsTxt) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.slcResultsTxt);
      }

      this.pageLengthSlc = null;
      this.slcResultsTxt = null;
    }
    /**
     * Change the page based on passed index
     * @param {Number} index Index of the page (0-n)
     */

  }, {
    key: "changePage",
    value: function changePage(index) {
      var tf = this.tf;

      if (!this.isEnabled()) {
        return;
      }

      this.emitter.emit('before-page-change', tf, index + 1);

      if (index === null) {
        index = this.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"] ? this.pageSlc.options.selectedIndex : this.pageSlc.value - 1;
      }

      if (index >= 0 && index <= this.nbPages - 1) {
        this.onBeforeChangePage(this, index + 1);
        this.currentPageNb = parseInt(index, 10) + 1;

        if (this.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"]) {
          this.pageSlc.options[index].selected = true;
        } else {
          this.pageSlc.value = this.currentPageNb;
        }

        this.startPagingRow = this.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"] ? this.pageSlc.value : index * this.pageLength;
        this.groupByPage();
        this.onAfterChangePage(this, index + 1);
      }

      this.emitter.emit('after-page-change', tf, index + 1);
    }
    /**
     * Change the number of results per page based on passed value
     * @param {String} val The number of results per page
     */

  }, {
    key: "changeResultsPerPage",
    value: function changeResultsPerPage(val) {
      if (!this.isEnabled() || isNaN(val)) {
        return;
      }

      this.pageLengthSlc.value = val;
      this.onChangeResultsPerPage();
    }
    /**
     * Change rows according to page results drop-down
     */

  }, {
    key: "onChangeResultsPerPage",
    value: function onChangeResultsPerPage() {
      var tf = this.tf;

      if (!this.isEnabled() || tf.getValidRowsNb() === 0) {
        return;
      }

      var slcR = this.pageLengthSlc,
          pageSelectorType = this.pageSelectorType,
          pageSlc = this.pageSlc,
          emitter = this.emitter;
      emitter.emit('before-page-length-change', tf);
      var slcIndex = slcR.selectedIndex;
      var slcPagesSelIndex = pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"] ? pageSlc.selectedIndex : parseInt(pageSlc.value - 1, 10);
      this.pageLength = parseInt(slcR.options[slcIndex].value, 10);
      this.startPagingRow = this.pageLength * slcPagesSelIndex;

      if (!isNaN(this.pageLength)) {
        if (this.startPagingRow >= tf.nbFilterableRows) {
          this.startPagingRow = tf.nbFilterableRows - this.pageLength;
        }

        this.setPagingInfo();

        if (pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"]) {
          var slcIdx = pageSlc.options.length - 1 <= slcPagesSelIndex ? pageSlc.options.length - 1 : slcPagesSelIndex;
          pageSlc.options[slcIdx].selected = true;
        }
      }

      emitter.emit('after-page-length-change', tf, this.pageLength);
    }
    /**
     * Re-set page nb at page re-load
     */

  }, {
    key: "resetPage",
    value: function resetPage() {
      var tf = this.tf;

      if (!this.isEnabled()) {
        return;
      }

      this.emitter.emit('before-reset-page', tf);
      var pgNb = tf.feature('store').getPageNb();

      if (pgNb !== '') {
        this.changePage(pgNb - 1);
      }

      this.emitter.emit('after-reset-page', tf, pgNb);
    }
    /**
     * Re-set page length value at page re-load
     */

  }, {
    key: "resetPageLength",
    value: function resetPageLength() {
      var tf = this.tf;

      if (!this.isEnabled()) {
        return;
      }

      this.emitter.emit('before-reset-page-length', tf);
      var pglenIndex = tf.feature('store').getPageLength();

      if (pglenIndex !== '') {
        this.pageLengthSlc.options[pglenIndex].selected = true;
        this.changeResultsPerPage();
      }

      this.emitter.emit('after-reset-page-length', tf, pglenIndex);
    }
    /** @private */

  }, {
    key: "changePageHandler",
    value: function changePageHandler(tf, pageNumber) {
      this.setPage(pageNumber);
    }
    /** @private */

  }, {
    key: "changePageResultsHandler",
    value: function changePageResultsHandler(tf, pageLength) {
      this.changeResultsPerPage(pageLength);
    }
    /**
     * Remove paging feature
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.initialized) {
        return;
      }

      var evt = this.evt;

      if (this.pageSlc) {
        if (this.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["SELECT"]) {
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["removeEvt"])(this.pageSlc, 'change', evt.slcPagesChange);
        } else if (this.pageSelectorType === _const__WEBPACK_IMPORTED_MODULE_4__["INPUT"]) {
          Object(_event__WEBPACK_IMPORTED_MODULE_3__["removeEvt"])(this.pageSlc, 'keypress', evt._detectKey);
        }

        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.pageSlc);
      }

      if (this.btnNextCont) {
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["removeEvt"])(this.btnNextCont, 'click', evt.next);
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.btnNextCont);
        this.btnNextCont = null;
      }

      if (this.btnPrevCont) {
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["removeEvt"])(this.btnPrevCont, 'click', evt.prev);
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.btnPrevCont);
        this.btnPrevCont = null;
      }

      if (this.btnLastCont) {
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["removeEvt"])(this.btnLastCont, 'click', evt.last);
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.btnLastCont);
        this.btnLastCont = null;
      }

      if (this.btnFirstCont) {
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["removeEvt"])(this.btnFirstCont, 'click', evt.first);
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.btnFirstCont);
        this.btnFirstCont = null;
      }

      if (this.pgBefore) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.pgBefore);
        this.pgBefore = null;
      }

      if (this.pgAfter) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.pgAfter);
        this.pgAfter = null;
      }

      if (this.pgCont) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.pgCont);
        this.pgCont = null;
      }

      if (this.hasResultsPerPage) {
        this.removeResultsPerPage();
      }

      this.emitter.off(['after-filtering'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.resetPagingInfo, this));
      this.emitter.off(['change-page'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.changePageHandler, this));
      this.emitter.off(['change-page-results'], Object(_event__WEBPACK_IMPORTED_MODULE_3__["bound"])(this.changePageResultsHandler, this));
      this.pageSlc = null;
      this.nbPages = 0;
      this.initialized = false;
    }
  }]);

  return Paging;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);

/***/ }),

/***/ "./src/modules/popupFilter.js":
/*!************************************!*\
  !*** ./src/modules/popupFilter.js ***!
  \************************************/
/*! exports provided: PopupFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupFilter", function() { return PopupFilter; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event */ "./src/event.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../root */ "./src/root.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








/**
 * Pop-up filter component
 * @export
 * @class PopupFilter
 * @extends {Feature}
 */

var PopupFilter = /*#__PURE__*/function (_Feature) {
  _inherits(PopupFilter, _Feature);

  var _super = _createSuper(PopupFilter);

  /**
   * Creates an instance of PopupFilter
   * @param {TableFilter} tf TableFilter instance
   */
  function PopupFilter(tf) {
    var _this;

    _classCallCheck(this, PopupFilter);

    _this = _super.call(this, tf, PopupFilter); // Configuration object

    var f = _this.config.popup_filters || {};
    /**
     * Close active popup filter upon filtering, enabled by default
     * @type {Boolean}
     */

    _this.closeOnFiltering = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsBool"])(f.close_on_filtering, true);
    /**
     * Filter icon path
     * @type {String}
     */

    _this.iconPath = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.image, tf.themesPath + 'icn_filter.gif');
    /**
     * Active filter icon path
     * @type {string}
     */

    _this.activeIconPath = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.image_active, tf.themesPath + 'icn_filterActive.gif');
    /**
     * HTML for the filter icon
     * @type {string}
     */

    _this.iconHtml = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.image_html, '<img src="' + _this.iconPath + '" alt="Column filter" />');
    /**
     * Css class assigned to the popup container element
     * @type {String}
     */

    _this.placeholderCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.placeholder_css_class, 'popUpPlaceholder');
    /**
     * Css class assigned to filter container element
     * @type {String}
     */

    _this.containerCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsStr"])(f.div_css_class, 'popUpFilter');
    /**
     * Ensure filter's container element width matches column width, enabled
     * by default
     * @type {Boolean}
     */

    _this.adjustToContainer = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsBool"])(f.adjust_to_container, true);
    /**
     * Callback fired before a popup filter is opened
     * @type {Function}
     */

    _this.onBeforeOpen = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_before_popup_filter_open, _types__WEBPACK_IMPORTED_MODULE_1__["EMPTY_FN"]);
    /**
     * Callback fired after a popup filter is opened
     * @type {Function}
     */

    _this.onAfterOpen = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_after_popup_filter_open, _types__WEBPACK_IMPORTED_MODULE_1__["EMPTY_FN"]);
    /**
     * Callback fired before a popup filter is closed
     * @type {Function}
     */

    _this.onBeforeClose = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_before_popup_filter_close, _types__WEBPACK_IMPORTED_MODULE_1__["EMPTY_FN"]);
    /**
     * Callback fired after a popup filter is closed
     * @type {Function}
     */

    _this.onAfterClose = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsFn"])(f.on_after_popup_filter_close, _types__WEBPACK_IMPORTED_MODULE_1__["EMPTY_FN"]);
    /**
     * Collection of filters spans
     * @type {Array}
     * @private
     */

    _this.fltSpans = [];
    /**
     * Collection of filters icons
     * @type {Array}
     * @private
     */

    _this.fltIcons = [];
    /**
     * Collection of filters icons cached after pop-up filters are removed
     * @type {Array}
     * @private
     */

    _this.filtersCache = null;
    /**
     * Collection of filters containers
     * @type {Array}
     * @private
     */

    _this.fltElms = Object(_settings__WEBPACK_IMPORTED_MODULE_6__["defaultsArr"])(_this.filtersCache, []);
    /**
     * Prefix for pop-up filter container ID
     * @type {String}
     * @private
     */

    _this.prfxDiv = 'popup_';
    /**
     * Column index of popup filter currently active
     * @type {Number}
     * @private
     */

    _this.activeFilterIdx = -1;
    return _this;
  }
  /**
   * Click event handler for pop-up filter icon
   * @private
   */


  _createClass(PopupFilter, [{
    key: "onClick",
    value: function onClick(evt) {
      var elm = Object(_event__WEBPACK_IMPORTED_MODULE_3__["targetEvt"])(evt).parentNode;
      var colIndex = parseInt(elm.getAttribute('ci'), 10);
      this.closeAll(colIndex);
      this.toggle(colIndex);

      if (this.adjustToContainer) {
        var cont = this.fltElms[colIndex],
            header = this.tf.getHeaderElement(colIndex),
            headerWidth = header.clientWidth * 0.95;
        cont.style.width = parseInt(headerWidth, 10) + 'px';
      }

      Object(_event__WEBPACK_IMPORTED_MODULE_3__["cancelEvt"])(evt);
      Object(_event__WEBPACK_IMPORTED_MODULE_3__["stopEvt"])(evt);
    }
    /**
     * Mouse-up event handler handling popup filter auto-close behaviour
     * @private
     */

  }, {
    key: "onMouseup",
    value: function onMouseup(evt) {
      if (this.activeFilterIdx === -1) {
        return;
      }

      var targetElm = Object(_event__WEBPACK_IMPORTED_MODULE_3__["targetEvt"])(evt);
      var activeFlt = this.fltElms[this.activeFilterIdx];
      var icon = this.fltIcons[this.activeFilterIdx];

      if (icon === targetElm) {
        return;
      }

      while (targetElm && targetElm !== activeFlt) {
        targetElm = targetElm.parentNode;
      }

      if (targetElm !== activeFlt) {
        this.close(this.activeFilterIdx);
      }

      return;
    }
    /**
     * Initialize DOM elements
     */

  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      }

      var tf = this.tf; // Enable external filters

      tf.externalFltIds = ['']; // Override filters row index supplied by configuration

      tf.filtersRowIndex = 0; // Override headers row index if no grouped headers
      // TODO: Because of the filters row generation, headers row index needs
      // adjusting: prevent useless row generation

      if (tf.headersRow <= 1 && isNaN(tf.config().headers_row_index)) {
        tf.headersRow = 0;
      } // Adjust headers row index for grid-layout mode
      // TODO: Because of the filters row generation, headers row index needs
      // adjusting: prevent useless row generation


      if (tf.gridLayout) {
        tf.headersRow--;
        this.buildIcons();
      } // subscribe to events


      this.emitter.on(['before-filtering'], function () {
        return _this2.setIconsState();
      });
      this.emitter.on(['after-filtering'], function () {
        return _this2.closeAll();
      });
      this.emitter.on(['cell-processed'], function (tf, cellIndex) {
        return _this2.changeState(cellIndex, true);
      });
      this.emitter.on(['filters-row-inserted'], function () {
        return _this2.buildIcons();
      });
      this.emitter.on(['before-filter-init'], function (tf, colIndex) {
        return _this2.build(colIndex);
      });
      /** @inherited */

      this.initialized = true;
    }
    /**
     * Reset previously destroyed feature
     */

  }, {
    key: "reset",
    value: function reset() {
      this.enable();
      this.init();
      this.buildIcons();
      this.buildAll();
    }
    /**
     * Build all filters icons
     */

  }, {
    key: "buildIcons",
    value: function buildIcons() {
      var _this3 = this;

      var tf = this.tf; // TODO: Because of the filters row generation, headers row index needs
      // adjusting: prevent useless row generation

      tf.headersRow++;
      tf.eachCol(function (i) {
        var icon = Object(_dom__WEBPACK_IMPORTED_MODULE_2__["createElm"])('span', ['ci', i]);
        icon.innerHTML = _this3.iconHtml;
        var header = tf.getHeaderElement(i);
        header.appendChild(icon);
        Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(icon, 'click', function (evt) {
          return _this3.onClick(evt);
        });
        _this3.fltSpans[i] = icon;
        _this3.fltIcons[i] = icon.firstChild;
      }, // continue condition function
      function (i) {
        return tf.getFilterType(i) === _const__WEBPACK_IMPORTED_MODULE_4__["NONE"];
      });
    }
    /**
     * Build all pop-up filters elements
     */

  }, {
    key: "buildAll",
    value: function buildAll() {
      for (var i = 0; i < this.filtersCache.length; i++) {
        this.build(i, this.filtersCache[i]);
      }
    }
    /**
     * Build a specified pop-up filter elements
     * @param  {Number} colIndex Column index
     * @param  {Object} div      Optional container DOM element
     */

  }, {
    key: "build",
    value: function build(colIndex, div) {
      var tf = this.tf;
      var contId = "".concat(this.prfxDiv).concat(tf.id, "_").concat(colIndex);
      var placeholder = Object(_dom__WEBPACK_IMPORTED_MODULE_2__["createElm"])('div', ['class', this.placeholderCssClass]);
      var cont = div || Object(_dom__WEBPACK_IMPORTED_MODULE_2__["createElm"])('div', ['id', contId], ['class', this.containerCssClass]);
      tf.externalFltIds[colIndex] = cont.id;
      placeholder.appendChild(cont);
      var header = tf.getHeaderElement(colIndex);
      header.insertBefore(placeholder, header.firstChild);
      Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(cont, 'click', function (evt) {
        return Object(_event__WEBPACK_IMPORTED_MODULE_3__["stopEvt"])(evt);
      });
      this.fltElms[colIndex] = cont;
    }
    /**
     * Toggle visibility of specified filter
     * @param  {Number} colIndex Column index
     */

  }, {
    key: "toggle",
    value: function toggle(colIndex) {
      if (!this.isOpen(colIndex)) {
        this.open(colIndex);
      } else {
        this.close(colIndex);
      }
    }
    /**
     * Open popup filter of specified column
     * @param {Number} colIndex Column index
     */

  }, {
    key: "open",
    value: function open(colIndex) {
      var _this4 = this;

      var tf = this.tf,
          container = this.fltElms[colIndex];
      this.onBeforeOpen(this, container, colIndex);
      container.style.display = 'block';
      this.activeFilterIdx = colIndex;
      Object(_event__WEBPACK_IMPORTED_MODULE_3__["addEvt"])(_root__WEBPACK_IMPORTED_MODULE_5__["root"], 'mouseup', function (evt) {
        return _this4.onMouseup(evt);
      });

      if (tf.getFilterType(colIndex) === _const__WEBPACK_IMPORTED_MODULE_4__["INPUT"]) {
        var flt = tf.getFilterElement(colIndex);

        if (flt) {
          flt.focus();
        }
      }

      this.onAfterOpen(this, container, colIndex);
    }
    /**
     * Close popup filter of specified column
     * @param {Number} colIndex Column index
     */

  }, {
    key: "close",
    value: function close(colIndex) {
      var _this5 = this;

      var container = this.fltElms[colIndex];
      this.onBeforeClose(this, container, colIndex);
      container.style.display = _const__WEBPACK_IMPORTED_MODULE_4__["NONE"];

      if (this.activeFilterIdx === colIndex) {
        this.activeFilterIdx = -1;
      }

      Object(_event__WEBPACK_IMPORTED_MODULE_3__["removeEvt"])(_root__WEBPACK_IMPORTED_MODULE_5__["root"], 'mouseup', function (evt) {
        return _this5.onMouseup(evt);
      });
      this.onAfterClose(this, container, colIndex);
    }
    /**
     * Check if popup filter for specified column is open
     * @param {Number} colIndex Column index
     * @returns {Boolean}
     */

  }, {
    key: "isOpen",
    value: function isOpen(colIndex) {
      return this.fltElms[colIndex].style.display === 'block';
    }
    /**
     * Close all filters excepted for the specified one if any
     * @param  {Number} exceptIdx Column index of the filter to not close
     */

  }, {
    key: "closeAll",
    value: function closeAll(exceptIdx) {
      // Do not close filters only if argument is undefined and close on
      // filtering option is disabled
      if (Object(_types__WEBPACK_IMPORTED_MODULE_1__["isUndef"])(exceptIdx) && !this.closeOnFiltering) {
        return;
      }

      for (var i = 0; i < this.fltElms.length; i++) {
        if (i === exceptIdx) {
          continue;
        }

        var fltType = this.tf.getFilterType(i);
        var isMultipleFilter = fltType === _const__WEBPACK_IMPORTED_MODULE_4__["CHECKLIST"] || fltType === _const__WEBPACK_IMPORTED_MODULE_4__["MULTIPLE"]; // Always hide all single selection filter types but hide multiple
        // selection filter types only if index set

        if (!isMultipleFilter || !Object(_types__WEBPACK_IMPORTED_MODULE_1__["isUndef"])(exceptIdx)) {
          this.close(i);
        }
      }
    }
    /**
     * Build all the icons representing the pop-up filters
     */

  }, {
    key: "setIconsState",
    value: function setIconsState() {
      for (var i = 0; i < this.fltIcons.length; i++) {
        this.changeState(i, false);
      }
    }
    /**
     * Apply specified icon state
     * @param  {Number} colIndex Column index
     * @param  {Boolean} active   Apply active state
     */

  }, {
    key: "changeState",
    value: function changeState(colIndex, active) {
      var icon = this.fltIcons[colIndex];

      if (icon) {
        icon.src = active ? this.activeIconPath : this.iconPath;
      }
    }
    /**
     * Remove pop-up filters
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this6 = this;

      if (!this.initialized) {
        return;
      }

      this.filtersCache = [];

      for (var i = 0; i < this.fltElms.length; i++) {
        var container = this.fltElms[i],
            placeholder = container.parentNode,
            icon = this.fltSpans[i],
            iconImg = this.fltIcons[i];

        if (container) {
          Object(_dom__WEBPACK_IMPORTED_MODULE_2__["removeElm"])(container);
          this.filtersCache[i] = container;
        }

        container = null;

        if (placeholder) {
          Object(_dom__WEBPACK_IMPORTED_MODULE_2__["removeElm"])(placeholder);
        }

        placeholder = null;

        if (icon) {
          Object(_dom__WEBPACK_IMPORTED_MODULE_2__["removeElm"])(icon);
        }

        icon = null;

        if (iconImg) {
          Object(_dom__WEBPACK_IMPORTED_MODULE_2__["removeElm"])(iconImg);
        }

        iconImg = null;
      }

      this.fltElms = [];
      this.fltSpans = [];
      this.fltIcons = []; // TODO: expose an API to handle external filter IDs

      this.tf.externalFltIds = []; // unsubscribe to events

      this.emitter.off(['before-filtering'], function () {
        return _this6.setIconsState();
      });
      this.emitter.off(['after-filtering'], function () {
        return _this6.closeAll();
      });
      this.emitter.off(['cell-processed'], function (tf, cellIndex) {
        return _this6.changeState(cellIndex, true);
      });
      this.emitter.off(['filters-row-inserted'], function () {
        return _this6.buildIcons();
      });
      this.emitter.off(['before-filter-init'], function (tf, colIndex) {
        return _this6.build(colIndex);
      });
      this.initialized = false;
    }
  }]);

  return PopupFilter;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]); // TODO: remove as soon as feature name is fixed

PopupFilter.meta = {
  altName: 'popupFilters'
};

/***/ }),

/***/ "./src/modules/rowsCounter.js":
/*!************************************!*\
  !*** ./src/modules/rowsCounter.js ***!
  \************************************/
/*! exports provided: RowsCounter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowsCounter", function() { return RowsCounter; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toolbar */ "./src/modules/toolbar.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






/**
 * Rows counter UI component
 * @export
 * @class RowsCounter
 * @extends {Feature}
 */

var RowsCounter = /*#__PURE__*/function (_Feature) {
  _inherits(RowsCounter, _Feature);

  var _super = _createSuper(RowsCounter);

  /**
   * Creates an instance of RowsCounter
   * @param {TableFilter} tf TableFilter instance
   */
  function RowsCounter(tf) {
    var _this;

    _classCallCheck(this, RowsCounter);

    _this = _super.call(this, tf, RowsCounter); // TableFilter configuration

    var f = _this.config.rows_counter || {};
    /**
     * ID of custom container element
     * @type {String}
     */

    _this.targetId = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.target_id, null);
    /**
     * Container DOM element
     * @type {DOMElement}
     * @private
     */

    _this.container = null;
    /**
     * Container DOM element for label displaying the total number of rows
     * @type {DOMElement}
     * @private
     */

    _this.label = null;
    /**
     * Text preceding the total number of rows
     * @type {String}
     */

    _this.text = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.text, 'Rows: ');
    /**
     * Separator symbol appearing between the first and last visible rows of
     * current page when paging is enabled. ie: Rows: 31-40 / 70
     * @type {String}
     */

    _this.fromToTextSeparator = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.separator, '-');
    /**
     * Separator symbol appearing between the first and last visible rows of
     * current page and the total number of filterable rows when paging is
     * enabled. ie: Rows: 31-40 / 70
     * @type {String}
     */

    _this.overText = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.over_text, ' / ');
    /**
     * Css class for container element
     * @type {String}
     */

    _this.cssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.css_class, 'tot');
    /**
     * Default position in toolbar ('left'|'center'|'right')
     * @type {String}
     */

    _this.toolbarPosition = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsStr"])(f.toolbar_position, _toolbar__WEBPACK_IMPORTED_MODULE_4__["LEFT"]);
    /**
     * Callback fired before the counter is refreshed
     * @type {Function}
     */

    _this.onBeforeRefreshCounter = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsFn"])(f.on_before_refresh_counter, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    /**
     * Callback fired after the counter is refreshed
     * @type {Function}
     */

    _this.onAfterRefreshCounter = Object(_settings__WEBPACK_IMPORTED_MODULE_3__["defaultsFn"])(f.on_after_refresh_counter, _types__WEBPACK_IMPORTED_MODULE_2__["EMPTY_FN"]);
    return _this;
  }
  /**
   * Initializes RowsCounter instance
   */


  _createClass(RowsCounter, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      }

      this.emitter.emit('initializing-feature', this, !Object(_types__WEBPACK_IMPORTED_MODULE_2__["isNull"])(this.targetId));
      var tf = this.tf; //rows counter container

      var countDiv = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('div');
      countDiv.className = this.cssClass; //rows counter label

      var countSpan = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      var countText = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('span');
      countText.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createText"])(this.text)); // counter is added to defined element

      var targetEl = !this.targetId ? tf.feature('toolbar').container(this.toolbarPosition) : Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.targetId); //default container: 'lDiv'

      if (!this.targetId) {
        countDiv.appendChild(countText);
        countDiv.appendChild(countSpan);
        targetEl.appendChild(countDiv);
      } else {
        //custom container, no need to append statusDiv
        targetEl.appendChild(countText);
        targetEl.appendChild(countSpan);
      }

      this.container = countDiv;
      this.label = countSpan; // subscribe to events

      this.emitter.on(['after-filtering', 'grouped-by-page'], function () {
        return _this2.refresh(tf.getValidRowsNb());
      });
      this.emitter.on(['rows-changed'], function () {
        return _this2.refresh();
      });
      /** @inherited */

      this.initialized = true;
      this.refresh();
      this.emitter.emit('feature-initialized', this);
    }
    /**
     * Refreshes the rows counter
     * @param {Number} p Optional parameter the total number of rows to display
     */

  }, {
    key: "refresh",
    value: function refresh(p) {
      if (!this.initialized || !this.isEnabled()) {
        return;
      }

      var tf = this.tf;
      this.onBeforeRefreshCounter(tf, this.label);
      var totTxt;

      if (!tf.paging) {
        if (p && p !== '') {
          totTxt = p;
        } else {
          totTxt = tf.getFilterableRowsNb() - tf.nbHiddenRows;
        }
      } else {
        var paging = tf.feature('paging');

        if (paging) {
          var nbValidRows = tf.getValidRowsNb(); //paging start row

          var pagingStartRow = parseInt(paging.startPagingRow, 10) + (nbValidRows > 0 ? 1 : 0);
          var pagingEndRow = pagingStartRow + paging.pageLength - 1 <= nbValidRows ? pagingStartRow + paging.pageLength - 1 : nbValidRows;
          totTxt = pagingStartRow + this.fromToTextSeparator + pagingEndRow + this.overText + nbValidRows;
        }
      }

      this.label.innerHTML = totTxt;
      this.onAfterRefreshCounter(tf, this.label, totTxt);
    }
    /**
     * Remove feature
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      if (!this.initialized) {
        return;
      }

      if (!this.targetId && this.container) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.container);
      } else {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.targetId).innerHTML = '';
      }

      this.label = null;
      this.container = null; // unsubscribe to events

      this.emitter.off(['after-filtering', 'grouped-by-page'], function () {
        return _this3.refresh(tf.getValidRowsNb());
      });
      this.emitter.off(['rows-changed'], function () {
        return _this3.refresh();
      });
      this.initialized = false;
    }
  }]);

  return RowsCounter;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);

/***/ }),

/***/ "./src/modules/state.js":
/*!******************************!*\
  !*** ./src/modules/state.js ***!
  \******************************/
/*! exports provided: State */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hash */ "./src/modules/hash.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../string */ "./src/string.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







/**
 * Features state object persistable with localStorage, cookie or URL hash
 *
 * @export
 * @class State
 * @extends {Feature}
 */

var State = /*#__PURE__*/function (_Feature) {
  _inherits(State, _Feature);

  var _super = _createSuper(State);

  /**
   * Creates an instance of State
   * @param {TableFilter} tf TableFilter instance
   */
  function State(tf) {
    var _this;

    _classCallCheck(this, State);

    _this = _super.call(this, tf, State);
    var cfg = _this.config.state || {};
    /**
     * Determines whether state is persisted with URL hash
     * @type {Boolean}
     */

    _this.enableHash = cfg === true || Object(_types__WEBPACK_IMPORTED_MODULE_4__["isArray"])(cfg.types) && cfg.types.indexOf('hash') !== -1;
    /**
     * Determines whether state is persisted with localStorage
     * @type {Boolean}
     */

    _this.enableLocalStorage = Object(_types__WEBPACK_IMPORTED_MODULE_4__["isArray"])(cfg.types) && cfg.types.indexOf('local_storage') !== -1;
    /**
     * Determines whether state is persisted with localStorage
     * @type {Boolean}
     */

    _this.enableCookie = Object(_types__WEBPACK_IMPORTED_MODULE_4__["isArray"])(cfg.types) && cfg.types.indexOf('cookie') !== -1;
    /**
     * Persist filters values, enabled by default
     * @type {Boolean}
     */

    _this.persistFilters = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsBool"])(cfg.filters, true);
    /**
     * Persist current page number when paging is enabled
     * @type {Boolean}
     */

    _this.persistPageNumber = Boolean(cfg.page_number);
    /**
     * Persist page length when paging is enabled
     * @type {Boolean}
     */

    _this.persistPageLength = Boolean(cfg.page_length);
    /**
     * Persist column sorting
     * @type {Boolean}
     */

    _this.persistSort = Boolean(cfg.sort);
    /**
     * Persist columns visibility
     * @type {Boolean}
     */

    _this.persistColsVisibility = Boolean(cfg.columns_visibility);
    /**
     * Persist filters row visibility
     * @type {Boolean}
     */

    _this.persistFiltersVisibility = Boolean(cfg.filters_visibility);
    /**
     * Cookie duration in hours
     * @type {Boolean}
     */

    _this.cookieDuration = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsNb"])(parseInt(cfg.cookie_duration, 10), 87600);
    /**
     * Enable Storage if localStorage or cookie is required
     * @type {Boolean}
     * @private
     */

    _this.enableStorage = _this.enableLocalStorage || _this.enableCookie;
    /**
     * Storage instance if storage is required
     * @type {Storage}
     * @private
     */

    _this.storage = null;
    /**
     * Hash instance if URL hash is required
     * @type {Boolean}
     * @private
     */

    _this.hash = null;
    /**
     * Current page number
     * @type {Number}
     * @private
     */

    _this.pageNb = null;
    /**
     * Current page length
     * @type {Number}
     * @private
     */

    _this.pageLength = null;
    /**
     * Current column sorting
     * @type {Object}
     * @private
     */

    _this.sort = null;
    /**
     * Current hidden columns
     * @type {Object}
     * @private
     */

    _this.hiddenCols = null;
    /**
     * Filters row visibility
     * @type {Boolean}
     * @private
     */

    _this.filtersVisibility = null;
    /**
     * State object
     * @type {Object}
     * @private
     */

    _this.state = {};
    /**
     * Prefix for column ID
     * @type {String}
     * @private
     */

    _this.prfxCol = 'col_';
    /**
     * Prefix for page number ID
     * @type {String}
     * @private
     */

    _this.pageNbKey = 'page';
    /**
     * Prefix for page length ID
     * @type {String}
     * @private
     */

    _this.pageLengthKey = 'page_length';
    /**
     * Prefix for filters visibility ID
     * @type {String}
     * @private
     */

    _this.filtersVisKey = 'filters_visibility';
    return _this;
  }
  /**
   * Initializes State instance
   */


  _createClass(State, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      }

      this.emitter.on(['after-filtering'], function () {
        return _this2.update();
      });
      this.emitter.on(['after-page-change', 'after-clearing-filters'], function (tf, pageNb) {
        return _this2.updatePage(pageNb);
      });
      this.emitter.on(['after-page-length-change'], function (tf, pageLength) {
        return _this2.updatePageLength(pageLength);
      });
      this.emitter.on(['column-sorted'], function (tf, index, descending) {
        return _this2.updateSort(index, descending);
      });
      this.emitter.on(['sort-initialized'], function () {
        return _this2._syncSort();
      });
      this.emitter.on(['columns-visibility-initialized'], function () {
        return _this2._syncColsVisibility();
      });
      this.emitter.on(['column-shown', 'column-hidden'], function (tf, feature, colIndex, hiddenCols) {
        return _this2.updateColsVisibility(hiddenCols);
      });
      this.emitter.on(['filters-visibility-initialized'], function () {
        return _this2._syncFiltersVisibility();
      });
      this.emitter.on(['filters-toggled'], function (tf, extension, visible) {
        return _this2.updateFiltersVisibility(visible);
      });

      if (this.enableHash) {
        this.hash = new _hash__WEBPACK_IMPORTED_MODULE_1__["Hash"](this);
        this.hash.init();
      }

      if (this.enableStorage) {
        this.storage = new _storage__WEBPACK_IMPORTED_MODULE_2__["Storage"](this);
        this.storage.init();
      }
      /** @inherited */


      this.initialized = true;
    }
    /**
     * Update state object based on current features state
     */

  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      if (!this.isEnabled()) {
        return;
      }

      var state = this.state;
      var tf = this.tf;

      if (this.persistFilters) {
        var filterValues = tf.getFiltersValue();
        filterValues.forEach(function (val, idx) {
          var key = "".concat(_this3.prfxCol).concat(idx);

          if (Object(_types__WEBPACK_IMPORTED_MODULE_4__["isString"])(val) && Object(_string__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(val)) {
            if (state.hasOwnProperty(key)) {
              state[key].flt = undefined;
            }
          } else {
            state[key] = state[key] || {};
            state[key].flt = val;
          }
        });
      }

      if (this.persistPageNumber) {
        if (Object(_types__WEBPACK_IMPORTED_MODULE_4__["isNull"])(this.pageNb)) {
          state[this.pageNbKey] = undefined;
        } else {
          state[this.pageNbKey] = this.pageNb;
        }
      }

      if (this.persistPageLength) {
        if (Object(_types__WEBPACK_IMPORTED_MODULE_4__["isNull"])(this.pageLength)) {
          state[this.pageLengthKey] = undefined;
        } else {
          state[this.pageLengthKey] = this.pageLength;
        }
      }

      if (this.persistSort) {
        if (!Object(_types__WEBPACK_IMPORTED_MODULE_4__["isNull"])(this.sort)) {
          // Remove previuosly sorted column
          Object.keys(state).forEach(function (key) {
            if (key.indexOf(_this3.prfxCol) !== -1 && state[key]) {
              state[key].sort = undefined;
            }
          });
          var key = "".concat(this.prfxCol).concat(this.sort.column);
          state[key] = state[key] || {};
          state[key].sort = {
            descending: this.sort.descending
          };
        }
      }

      if (this.persistColsVisibility) {
        if (!Object(_types__WEBPACK_IMPORTED_MODULE_4__["isNull"])(this.hiddenCols)) {
          // Clear previuosly hidden columns
          Object.keys(state).forEach(function (key) {
            if (key.indexOf(_this3.prfxCol) !== -1 && state[key]) {
              state[key].hidden = undefined;
            }
          });
          this.hiddenCols.forEach(function (colIdx) {
            var key = "".concat(_this3.prfxCol).concat(colIdx);
            state[key] = state[key] || {};
            state[key].hidden = true;
          });
        }
      }

      if (this.persistFiltersVisibility) {
        if (Object(_types__WEBPACK_IMPORTED_MODULE_4__["isNull"])(this.filtersVisibility)) {
          state[this.filtersVisKey] = undefined;
        } else {
          state[this.filtersVisKey] = this.filtersVisibility;
        }
      }

      this.emitter.emit('state-changed', tf, state);
    }
    /**
     * Refresh page number field on page number changes
     *
     * @param {Number} pageNb Current page number
     */

  }, {
    key: "updatePage",
    value: function updatePage(pageNb) {
      this.pageNb = pageNb;
      this.update();
    }
    /**
     * Refresh page length field on page length changes
     *
     * @param {Number} pageLength Current page length value
     */

  }, {
    key: "updatePageLength",
    value: function updatePageLength(pageLength) {
      this.pageLength = pageLength;
      this.update();
    }
    /**
     * Refresh column sorting information on sort changes
     *
     * @param index {Number} Column index
     * @param {Boolean} descending Descending manner
     */

  }, {
    key: "updateSort",
    value: function updateSort(index, descending) {
      this.sort = {
        column: index,
        descending: descending
      };
      this.update();
    }
    /**
     * Refresh hidden columns information on columns visibility changes
     *
     * @param {Array} hiddenCols Columns indexes
     */

  }, {
    key: "updateColsVisibility",
    value: function updateColsVisibility(hiddenCols) {
      this.hiddenCols = hiddenCols;
      this.update();
    }
    /**
     * Refresh filters visibility on filters visibility change
     *
     * @param {Boolean} visible Visibility flad
     */

  }, {
    key: "updateFiltersVisibility",
    value: function updateFiltersVisibility(visible) {
      this.filtersVisibility = visible;
      this.update();
    }
    /**
     * Override state field
     *
     * @param state State object
     */

  }, {
    key: "override",
    value: function override(state) {
      this.state = state;
      this.emitter.emit('state-changed', this.tf, state);
    }
    /**
     * Sync stored features state
     */

  }, {
    key: "sync",
    value: function sync() {
      var state = this.state;
      var tf = this.tf;

      this._syncFilters();

      if (this.persistPageNumber) {
        var pageNumber = state[this.pageNbKey];
        this.emitter.emit('change-page', tf, pageNumber);
      }

      if (this.persistPageLength) {
        var pageLength = state[this.pageLengthKey];
        this.emitter.emit('change-page-results', tf, pageLength);
      }

      this._syncSort();

      this._syncColsVisibility();

      this._syncFiltersVisibility();
    }
    /**
     * Override current state with passed one and sync features
     *
     * @param {Object} state State object
     */

  }, {
    key: "overrideAndSync",
    value: function overrideAndSync(state) {
      // To prevent state to react to features changes, state is temporarily
      // disabled
      this.disable(); // State is overriden with passed state object

      this.override(state); // New hash state is applied to features

      this.sync(); // State is re-enabled

      this.enable();
    }
    /**
     * Sync filters with stored values and filter table
     *
     * @private
     */

  }, {
    key: "_syncFilters",
    value: function _syncFilters() {
      var _this4 = this;

      if (!this.persistFilters) {
        return;
      }

      var state = this.state;
      var tf = this.tf; // clear all filters
      // TODO: use tf.clearFilters() once it allows to not filter the table

      tf.eachCol(function (colIdx) {
        return tf.setFilterValue(colIdx, '');
      });
      Object.keys(state).forEach(function (key) {
        if (key.indexOf(_this4.prfxCol) !== -1) {
          var colIdx = parseInt(key.replace(_this4.prfxCol, ''), 10);
          var val = state[key].flt;
          tf.setFilterValue(colIdx, val);
        }
      });
      tf.filter();
    }
    /**
     * Sync sorted column with stored sorting information and sort table
     *
     * @private
     */

  }, {
    key: "_syncSort",
    value: function _syncSort() {
      var _this5 = this;

      if (!this.persistSort) {
        return;
      }

      var state = this.state;
      var tf = this.tf;
      Object.keys(state).forEach(function (key) {
        if (key.indexOf(_this5.prfxCol) !== -1) {
          var colIdx = parseInt(key.replace(_this5.prfxCol, ''), 10);

          if (!Object(_types__WEBPACK_IMPORTED_MODULE_4__["isUndef"])(state[key].sort)) {
            var sort = state[key].sort;

            _this5.emitter.emit('sort', tf, colIdx, sort.descending);
          }
        }
      });
    }
    /**
     * Sync hidden columns with stored information
     *
     * @private
     */

  }, {
    key: "_syncColsVisibility",
    value: function _syncColsVisibility() {
      var _this6 = this;

      if (!this.persistColsVisibility) {
        return;
      }

      var state = this.state;
      var tf = this.tf;
      var hiddenCols = [];
      Object.keys(state).forEach(function (key) {
        if (key.indexOf(_this6.prfxCol) !== -1) {
          var colIdx = parseInt(key.replace(_this6.prfxCol, ''), 10);

          if (!Object(_types__WEBPACK_IMPORTED_MODULE_4__["isUndef"])(state[key].hidden)) {
            hiddenCols.push(colIdx);
          }
        }
      });
      hiddenCols.forEach(function (colIdx) {
        _this6.emitter.emit('hide-column', tf, colIdx);
      });
    }
    /**
     * Sync filters visibility with stored information
     *
     * @private
     */

  }, {
    key: "_syncFiltersVisibility",
    value: function _syncFiltersVisibility() {
      if (!this.persistFiltersVisibility) {
        return;
      }

      var state = this.state;
      var tf = this.tf;
      var filtersVisibility = state[this.filtersVisKey];
      this.filtersVisibility = filtersVisibility;
      this.emitter.emit('show-filters', tf, filtersVisibility);
    }
    /**
     * Destroy State instance
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this7 = this;

      if (!this.initialized) {
        return;
      }

      this.state = {};
      this.emitter.off(['after-filtering'], function () {
        return _this7.update();
      });
      this.emitter.off(['after-page-change', 'after-clearing-filters'], function (tf, pageNb) {
        return _this7.updatePage(pageNb);
      });
      this.emitter.off(['after-page-length-change'], function (tf, index) {
        return _this7.updatePageLength(index);
      });
      this.emitter.off(['column-sorted'], function (tf, index, descending) {
        return _this7.updateSort(index, descending);
      });
      this.emitter.off(['sort-initialized'], function () {
        return _this7._syncSort();
      });
      this.emitter.off(['columns-visibility-initialized'], function () {
        return _this7._syncColsVisibility();
      });
      this.emitter.off(['column-shown', 'column-hidden'], function (tf, feature, colIndex, hiddenCols) {
        return _this7.updateColsVisibility(hiddenCols);
      });
      this.emitter.off(['filters-visibility-initialized'], function () {
        return _this7._syncFiltersVisibility();
      });
      this.emitter.off(['filters-toggled'], function (tf, extension, visible) {
        return _this7.updateFiltersVisibility(visible);
      });

      if (this.enableHash) {
        this.hash.destroy();
        this.hash = null;
      }

      if (this.enableStorage) {
        this.storage.destroy();
        this.storage = null;
      }

      this.initialized = false;
    }
  }]);

  return State;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);

/***/ }),

/***/ "./src/modules/statusBar.js":
/*!**********************************!*\
  !*** ./src/modules/statusBar.js ***!
  \**********************************/
/*! exports provided: StatusBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusBar", function() { return StatusBar; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../root */ "./src/root.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toolbar */ "./src/modules/toolbar.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var EVENTS = ['after-filtering', 'after-populating-filter', 'after-page-change', 'after-clearing-filters', 'after-page-length-change', 'after-reset-page', 'after-reset-page-length', 'after-loading-extensions', 'after-loading-themes'];
/**
 * Status bar UI component
 * @export
 * @class StatusBar
 * @extends {Feature}
 */

var StatusBar = /*#__PURE__*/function (_Feature) {
  _inherits(StatusBar, _Feature);

  var _super = _createSuper(StatusBar);

  /**
   * Creates an instance of StatusBar
   * @param {TableFilter} tf TableFilter instance
   */
  function StatusBar(tf) {
    var _this;

    _classCallCheck(this, StatusBar);

    _this = _super.call(this, tf, StatusBar); // Configuration object

    var f = _this.config.status_bar || {};
    /**
     * ID of custom container element
     * @type {String}
     */

    _this.targetId = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.target_id, null);
    /**
     * Container DOM element
     * @type {DOMElement}
     * @private
     */

    _this.container = null;
    /**
     * Message container DOM element
     * @type {DOMElement}
     * @private
     */

    _this.msgContainer = null;
    /**
     * Label container DOM element
     * @type {DOMElement}
     * @private
     */

    _this.labelContainer = null;
    /**
     * Text preceding status message
     * @type {String}
     */

    _this.text = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.text, '');
    /**
     * Css class for container element
     * @type {String}
     */

    _this.cssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.css_class, 'status');
    /**
     * Message visibility duration in milliseconds
     * @type {Number}
     * @private
     */

    _this.delay = 250;
    /**
     * Callback fired before the message is displayed
     * @type {Function}
     */

    _this.onBeforeShowMsg = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsFn"])(f.on_before_show_msg, _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"]);
    /**
     * Callback fired after the message is displayed
     * @type {Function}
     */

    _this.onAfterShowMsg = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsFn"])(f.on_after_show_msg, _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"]);
    /**
     * Message appearing upon filtering
     * @type {String}
     */

    _this.msgFilter = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_filter, 'Filtering data...');
    /**
     * Message appearing when a drop-down filter is populated
     * @type {String}
     */

    _this.msgPopulate = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_populate, 'Populating filter...');
    /**
     * Message appearing when a checklist filter is populated
     * @type {String}
     */

    _this.msgPopulateCheckList = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_populate_checklist, 'Populating list...');
    /**
     * Message appearing when a pagination page is changed
     * @type {String}
     */

    _this.msgChangePage = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_change_page, 'Collecting paging data...');
    /**
     * Message appearing when filters are cleared
     * @type {String}
     */

    _this.msgClear = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_clear, 'Clearing filters...');
    /**
     * Message appearing when the page length is changed
     * @type {String}
     */

    _this.msgChangeResults = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_change_results, 'Changing results per page...');
    /**
     * Message appearing when the page is re-set
     * @type {String}
     */

    _this.msgResetPage = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_reset_page, 'Re-setting page...');
    /**
     * Message appearing when the page length is re-set
     * @type {String}
     */

    _this.msgResetPageLength = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_reset_page_length, 'Re-setting page length...');
    /**
     * Message appearing upon column sorting
     * @type {String}
     */

    _this.msgSort = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_sort, 'Sorting data...');
    /**
     * Message appearing when extensions are loading
     * @type {String}
     */

    _this.msgLoadExtensions = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_load_extensions, 'Loading extensions...');
    /**
     * Message appearing when themes are loading
     * @type {String}
     */

    _this.msgLoadThemes = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.msg_load_themes, 'Loading theme(s)...');
    /**
     * Default position in toolbar ('left'|'center'|'right')
     * @type {String}
     */

    _this.toolbarPosition = Object(_settings__WEBPACK_IMPORTED_MODULE_4__["defaultsStr"])(f.toolbar_position, _toolbar__WEBPACK_IMPORTED_MODULE_5__["LEFT"]);
    return _this;
  }
  /**
   * Initializes StatusBar instance
   */


  _createClass(StatusBar, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      }

      var tf = this.tf;
      var emitter = this.emitter;
      emitter.emit('initializing-feature', this, !Object(_types__WEBPACK_IMPORTED_MODULE_3__["isNull"])(this.targetId)); // status bar container

      var statusDiv = Object(_dom__WEBPACK_IMPORTED_MODULE_2__["createElm"])('div');
      statusDiv.className = this.cssClass; // status bar label

      var statusSpan = Object(_dom__WEBPACK_IMPORTED_MODULE_2__["createElm"])('span'); // preceding text

      var statusSpanText = Object(_dom__WEBPACK_IMPORTED_MODULE_2__["createElm"])('span');
      statusSpanText.appendChild(Object(_dom__WEBPACK_IMPORTED_MODULE_2__["createText"])(this.text)); // target element container

      var targetEl = !this.targetId ? tf.feature('toolbar').container(this.toolbarPosition) : Object(_dom__WEBPACK_IMPORTED_MODULE_2__["elm"])(this.targetId); // default container

      if (!this.targetId) {
        statusDiv.appendChild(statusSpanText);
        statusDiv.appendChild(statusSpan);
        targetEl.appendChild(statusDiv);
      } else {
        // custom container, no need to append statusDiv
        targetEl.appendChild(statusSpanText);
        targetEl.appendChild(statusSpan);
      }

      this.container = statusDiv;
      this.msgContainer = statusSpan;
      this.labelContainer = statusSpanText; // subscribe to events

      emitter.on(['before-filtering'], function () {
        return _this2.message(_this2.msgFilter);
      });
      emitter.on(['before-populating-filter'], function () {
        return _this2.message(_this2.msgPopulate);
      });
      emitter.on(['before-page-change'], function () {
        return _this2.message(_this2.msgChangePage);
      });
      emitter.on(['before-clearing-filters'], function () {
        return _this2.message(_this2.msgClear);
      });
      emitter.on(['before-page-length-change'], function () {
        return _this2.message(_this2.msgChangeResults);
      });
      emitter.on(['before-reset-page'], function () {
        return _this2.message(_this2.msgResetPage);
      });
      emitter.on(['before-reset-page-length'], function () {
        return _this2.message(_this2.msgResetPageLength);
      });
      emitter.on(['before-loading-extensions'], function () {
        return _this2.message(_this2.msgLoadExtensions);
      });
      emitter.on(['before-loading-themes'], function () {
        return _this2.message(_this2.msgLoadThemes);
      });
      emitter.on(EVENTS, function () {
        return _this2.message('');
      });
      /** @inherited */

      this.initialized = true;
      emitter.emit('feature-initialized', this);
    }
    /**
     * Display status message
     * @param {String} [t=''] Message to be displayed
     */

  }, {
    key: "message",
    value: function message() {
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (!this.isEnabled()) {
        return;
      }

      this.onBeforeShowMsg(this.tf, t);
      var d = t === '' ? this.delay : 1;
      _root__WEBPACK_IMPORTED_MODULE_1__["root"].setTimeout(function () {
        if (!_this3.initialized) {
          return;
        }

        _this3.msgContainer.innerHTML = t;

        _this3.onAfterShowMsg(_this3.tf, t);
      }, d);
    }
    /**
     * Destroy StatusBar instance
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this4 = this;

      if (!this.initialized) {
        return;
      }

      var emitter = this.emitter;
      this.container.innerHTML = '';

      if (!this.targetId) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_2__["removeElm"])(this.container);
      }

      this.labelContainer = null;
      this.msgContainer = null;
      this.container = null; // Unsubscribe to events

      emitter.off(['before-filtering'], function () {
        return _this4.message(_this4.msgFilter);
      });
      emitter.off(['before-populating-filter'], function () {
        return _this4.message(_this4.msgPopulate);
      });
      emitter.off(['before-page-change'], function () {
        return _this4.message(_this4.msgChangePage);
      });
      emitter.off(['before-clearing-filters'], function () {
        return _this4.message(_this4.msgClear);
      });
      emitter.off(['before-page-length-change'], function () {
        return _this4.message(_this4.msgChangeResults);
      });
      emitter.off(['before-reset-page'], function () {
        return _this4.message(_this4.msgResetPage);
      });
      emitter.off(['before-reset-page-length'], function () {
        return _this4.message(_this4.msgResetPageLength);
      });
      emitter.off(['before-loading-extensions'], function () {
        return _this4.message(_this4.msgLoadExtensions);
      });
      emitter.off(['before-loading-themes'], function () {
        return _this4.message(_this4.msgLoadThemes);
      });
      emitter.off(EVENTS, function () {
        return _this4.message('');
      });
      this.initialized = false;
    }
  }]);

  return StatusBar;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]);

/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/*! exports provided: hasStorage, Storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasStorage", function() { return hasStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return Storage; });
/* harmony import */ var _cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cookie */ "./src/cookie.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../root */ "./src/root.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var JSON = _root__WEBPACK_IMPORTED_MODULE_1__["root"].JSON;
var localStorage = _root__WEBPACK_IMPORTED_MODULE_1__["root"].localStorage;
var location = _root__WEBPACK_IMPORTED_MODULE_1__["root"].location;
/**
 * Checks if browser has Storage feature
 */

var hasStorage = function hasStorage() {
  return 'Storage' in _root__WEBPACK_IMPORTED_MODULE_1__["root"];
};
/**
 * Stores the features state in browser's local storage or cookie
 *
 * @export
 * @class Storage
 */

var Storage = /*#__PURE__*/function () {
  /**
   * Creates an instance of Storage
   *
   * @param {State} state Instance of State
   */
  function Storage(state) {
    _classCallCheck(this, Storage);

    /**
     * State object
     * @type {State}
     * @private
     */
    this.state = state;
    /**
     * TableFilter object
     * @type {TableFilter}
     * @private
     */

    this.tf = state.tf;
    /**
     * Persist with local storage
     * @type {Boolean}
     * @private
     */

    this.enableLocalStorage = state.enableLocalStorage && hasStorage();
    /**
     * Persist with cookie
     * @type {Boolean}
     * @private
     */

    this.enableCookie = state.enableCookie && !this.enableLocalStorage;
    /**
     * Emitter object
     * @type {Emitter}
     * @private
     */

    this.emitter = state.emitter;
    /**
     * Cookie duration in hours from state object
     * @type {Number}
     * @private
     */

    this.duration = state.cookieDuration;
  }
  /**
   * Initializes the Storage object
   */


  _createClass(Storage, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.emitter.on(['state-changed'], function (tf, state) {
        return _this.save(state);
      });
      this.emitter.on(['initialized'], function () {
        return _this.sync();
      });
    }
    /**
     * Persists the features state on state changes
     *
     * @param {State} state Instance of State
     */

  }, {
    key: "save",
    value: function save(state) {
      if (this.enableLocalStorage) {
        localStorage[this.getKey()] = JSON.stringify(state);
      } else {
        _cookie__WEBPACK_IMPORTED_MODULE_0__["default"].write(this.getKey(), JSON.stringify(state), this.duration);
      }
    }
    /**
     * Turns stored string into a State JSON object
     *
     *  @returns {Object} JSON object
     */

  }, {
    key: "retrieve",
    value: function retrieve() {
      var state = null;

      if (this.enableLocalStorage) {
        state = localStorage[this.getKey()];
      } else {
        state = _cookie__WEBPACK_IMPORTED_MODULE_0__["default"].read(this.getKey());
      }

      if (!state) {
        return null;
      }

      return JSON.parse(state);
    }
    /**
     * Removes persisted state from storage
     */

  }, {
    key: "remove",
    value: function remove() {
      if (this.enableLocalStorage) {
        localStorage.removeItem(this.getKey());
      } else {
        _cookie__WEBPACK_IMPORTED_MODULE_0__["default"].remove(this.getKey());
      }
    }
    /**
     * Applies persisted state to features
     */

  }, {
    key: "sync",
    value: function sync() {
      var state = this.retrieve();

      if (!state) {
        return;
      } // override current state with persisted one and sync features


      this.state.overrideAndSync(state);
    }
    /**
     * Returns the storage key
     *
     * @returns {String} Key
     */

  }, {
    key: "getKey",
    value: function getKey() {
      return JSON.stringify({
        key: "".concat(this.tf.prfxTf, "_").concat(this.tf.id),
        path: location.pathname
      });
    }
    /**
     * Release Storage event subscriptions and clear fields
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.emitter.off(['state-changed'], function (tf, state) {
        return _this2.save(state);
      });
      this.emitter.off(['initialized'], function () {
        return _this2.sync();
      });
      this.remove();
      this.state = null;
      this.emitter = null;
    }
  }]);

  return Storage;
}();

/***/ }),

/***/ "./src/modules/toolbar.js":
/*!********************************!*\
  !*** ./src/modules/toolbar.js ***!
  \********************************/
/*! exports provided: LEFT, RIGHT, CENTER, Toolbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEFT", function() { return LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIGHT", function() { return RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CENTER", function() { return CENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toolbar", function() { return Toolbar; });
/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../feature */ "./src/feature.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./src/dom.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./src/types.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var EVENTS = ['initializing-feature', 'initializing-extension'];
/** Left position in toolbar */

var LEFT = 'left';
/** Right position in toolbar */

var RIGHT = 'right';
/** Center position in toolbar */

var CENTER = 'center';
/**
 * Toolbar UI component
 * @export
 * @class Toolbar
 * @extends {Feature}
 */

var Toolbar = /*#__PURE__*/function (_Feature) {
  _inherits(Toolbar, _Feature);

  var _super = _createSuper(Toolbar);

  /**
   * Create an instance of Toolbar
   * @param {TableFilter} tf TableFilter instance
   * @memberof Toolbar
   */
  function Toolbar(tf) {
    var _this;

    _classCallCheck(this, Toolbar);

    _this = _super.call(this, tf, Toolbar); // Configuration object

    var f = _this.config.toolbar || {};
    /**
     * Css class for toolbar's container DOM element
     * @type {String}
     */

    _this.contCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_2__["defaultsStr"])(f.container_css_class, 'inf');
    /**
     * Css class for left-side inner container DOM element
     * @type {String}
     */

    _this.lContCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_2__["defaultsStr"])(f.left_cont_css_class, 'ldiv');
    /**
     * Css class for right-side inner container DOM element
     * @type {String}
     */

    _this.rContCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_2__["defaultsStr"])(f.right_cont_css_class, 'rdiv');
    /**
     * Css class for middle inner container DOM element
     * @type {String}
     */

    _this.cContCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_2__["defaultsStr"])(f.center_cont_css_class, 'mdiv');
    /**
     * Toolbar's custom container ID
     * @type {String}
     */

    _this.tgtId = Object(_settings__WEBPACK_IMPORTED_MODULE_2__["defaultsStr"])(f.target_id, null);
    /**
     * Toolbar's container DOM element
     * @type {DOMElement}
     * @private
     */

    _this.cont = null;
    /**
     * Left-side inner container DOM element (rows counter in toolbar)
     * @type {DOMElement}
     * @private
     */

    _this.lCont = null;
    /**
     * Right-side inner container DOM element (reset button,
     * page length selector in toolbar)
     * @type {DOMElement}
     * @private
     */

    _this.rCont = null;
    /**
     * Middle inner container DOM element (paging elements in toolbar)
     * @type {DOMElement}
     * @private
     */

    _this.cCont = null;
    /**
     * Container elements inside toolbar
     * @private
     */

    _this.innerCont = {
      left: null,
      center: null,
      right: null
    };

    _this.emitter.on(EVENTS, function (feature, isExternal) {
      return _this.init(isExternal);
    });
    /** @inherited */


    _this.enabled = true;
    return _this;
  }
  /**
   * Initialize toolbar components
   * @param {Boolean} isExternal initialize only if component belongs
   * to toolbar
   */


  _createClass(Toolbar, [{
    key: "init",
    value: function init(isExternal) {
      if (this.initialized || isExternal) {
        return;
      }

      var tf = this.tf; // default container

      var container = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('div');
      container.className = this.contCssClass; // custom container

      if (this.tgtId) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.tgtId).appendChild(container);
      } // grid-layout
      else if (tf.gridLayout) {
          var gridLayout = tf.Mod.gridLayout;
          gridLayout.tblMainCont.appendChild(container);
          container.className = gridLayout.infDivCssClass;
        } // default location: just above the table
        else {
            var cont = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('caption');
            cont.appendChild(container);
            tf.dom().insertBefore(cont, tf.dom().firstChild);
          }

      this.cont = container; // left container

      this.lCont = this.createContainer(container, this.lContCssClass); // right container

      this.rCont = this.createContainer(container, this.rContCssClass); // middle container

      this.cCont = this.createContainer(container, this.cContCssClass);
      this.innerCont = {
        left: this.lCont,
        center: this.cCont,
        right: this.rCont
      };
      /** @inherited */

      this.initialized = true; // emit help initialisation only if undefined

      if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isUndef"])(tf.help)) {
        // explicitily enable help to initialise feature by
        // default, only if setting is undefined
        tf.Mod.help.enable();
        this.emitter.emit('init-help', tf);
      }
    }
    /**
     * Return the container based on requested position inside the toolbar
     * @param {String} [position=RIGHT] 3 possible positions: 'left', 'center',
     * 'right'
     * @param {DOMElement} el optional DOM element to be inserter in container
     * @returns {DOMElement}
     */

  }, {
    key: "container",
    value: function container() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RIGHT;
      var el = arguments.length > 1 ? arguments[1] : undefined;
      var cont = this.innerCont[position];

      if (el) {
        cont.appendChild(el);
      }

      return cont;
    }
    /**
     * Create DOM element inside passed container
     * @param {DOMElement} container
     * @param {String} css
     * @private
     */

  }, {
    key: "createContainer",
    value: function createContainer(container, css) {
      var div = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('div', ['class', css]);
      container.appendChild(div);
      return div;
    }
    /**
     * Destroy Toolbar instance
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.initialized) {
        return;
      }

      var tf = this.tf;
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(this.cont);
      this.cont = null;
      var tbl = tf.dom();
      var captions = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(tbl, 'caption');
      [].forEach.call(captions, function (el) {
        return Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeElm"])(el);
      });
      /** @inherited */

      this.initialized = false;
    }
  }]);

  return Toolbar;
}(_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"]); // TODO: remove as soon as feature name is fixed

Toolbar.meta = {
  alwaysInstantiate: true
};

/***/ }),

/***/ "./src/number.js":
/*!***********************!*\
  !*** ./src/number.js ***!
  \***********************/
/*! exports provided: parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/types.js");

/**
 * Takes a string, removes all formatting/cruft and returns the raw float value
 * @param {String} Formatted number
 * @param {String} Decimal type '.' or ','
 * @return {Number} Unformatted number
 *
 * https://github.com/openexchangerates/accounting.js/blob/master/accounting.js
 */

var parse = function parse(value) {
  var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

  // Return the value as-is if it's already a number
  if (Object(_types__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(value)) {
    return value;
  } // Build regex to strip out everything except digits, decimal point and
  // minus sign


  var regex = new RegExp('[^0-9-' + decimal + ']', ['g']);
  var unformatted = parseFloat(('' + value). // replace bracketed values with negatives
  replace(/\((.*)\)/, '-$1') // strip out any cruft
  .replace(regex, '') // make sure decimal point is standard
  .replace(decimal, '.')); // This will fail silently

  return !isNaN(unformatted) ? unformatted : 0;
};

/***/ }),

/***/ "./src/root.js":
/*!*********************!*\
  !*** ./src/root.js ***!
  \*********************/
/*! exports provided: root */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "root", function() { return root; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Export window or global object depending on the environment
 */
var root = (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self.self === self && self || (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global.global === global && global || undefined;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/*! exports provided: defaultsBool, defaultsStr, defaultsNb, defaultsArr, defaultsFn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultsBool", function() { return defaultsBool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultsStr", function() { return defaultsStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultsNb", function() { return defaultsNb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultsArr", function() { return defaultsArr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultsFn", function() { return defaultsFn; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/types.js");

/** Configuration settings helpers  */

/**
 * If passed value is not of boolean type return the default value
 * otherwise return the value itself
 * @param  {Boolean|Any}  value
 * @param  {Boolean} default value
 * @return {Boolean|Any}
 */

var defaultsBool = function defaultsBool(val, defaultVal) {
  return Object(_types__WEBPACK_IMPORTED_MODULE_0__["isBoolean"])(val) ? val : defaultVal;
};
/**
 * If passed value is not of string type return the default value
 * otherwise return the value itself
 * @param  {String|Any}  value
 * @param  {String} default value
 * @return {String|Any}
 */

var defaultsStr = function defaultsStr(val, defaultVal) {
  return Object(_types__WEBPACK_IMPORTED_MODULE_0__["isString"])(val) ? val : defaultVal;
};
/**
 * If passed value is not of number type return the default value
 * otherwise return the value itself
 * @param  {Number|Any}  value
 * @param  {Number} default value
 * @return {Number|Any}
 */

var defaultsNb = function defaultsNb(val, defaultVal) {
  return isNaN(val) ? defaultVal : val;
};
/**
 * If passed value is not of array type return the default value
 * otherwise return the value itself
 * @param  {Array|Any}  value
 * @param  {Array} default value
 * @return {Array|Any}
 */

var defaultsArr = function defaultsArr(val, defaultVal) {
  return Object(_types__WEBPACK_IMPORTED_MODULE_0__["isArray"])(val) ? val : defaultVal;
};
/**
 * If passed value is not of function type return the default value
 * otherwise return the value itself
 * @param  {Function|Any}  value
 * @param  {Function} default value
 * @return {Function|Any}
 */

var defaultsFn = function defaultsFn(val, defaultVal) {
  return Object(_types__WEBPACK_IMPORTED_MODULE_0__["isFn"])(val) ? val : defaultVal;
};

/***/ }),

/***/ "./src/sort.js":
/*!*********************!*\
  !*** ./src/sort.js ***!
  \*********************/
/*! exports provided: ignoreCase, numSortAsc, numSortDesc, dateSortAsc, dateSortDesc, sortNumberStr, sortDateStr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ignoreCase", function() { return ignoreCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numSortAsc", function() { return numSortAsc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numSortDesc", function() { return numSortDesc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateSortAsc", function() { return dateSortAsc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateSortDesc", function() { return dateSortDesc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortNumberStr", function() { return sortNumberStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortDateStr", function() { return sortDateStr; });
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number */ "./src/number.js");
/* harmony import */ var sugar_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sugar-date */ "./node_modules/sugar-date/index.js");
/* harmony import */ var sugar_date__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sugar_date__WEBPACK_IMPORTED_MODULE_1__);


/** Sorting utilities */

/**
 * Case insensitive compare function for passed strings
 * @param  {String} First string
 * @param  {String} Second string
 * @return {Number} -1 if first string lower than second one
 *                  0 if first string same order as second one
 *                  1 if first string greater than second one
 */

var ignoreCase = function ignoreCase(a, b) {
  var x = a.toLowerCase();
  var y = b.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
};
/**
 * Compare function for sorting passed numbers in ascending manner
 * @param {Number} First number
 * @param {Number} Second number
 * @return {Number} Negative, zero or positive number
 */

var numSortAsc = function numSortAsc(a, b) {
  return a - b;
};
/**
 * Compare function for sorting passed numbers in descending manner
 * @param {Number} First number
 * @param {Number} Second number
 * @return {Number} Negative, zero or positive number
 */

var numSortDesc = function numSortDesc(a, b) {
  return b - a;
};
/**
 * Compare function for sorting passed dates in ascending manner according to
 * the corresponding UTC numeric value (returned by getTime)
 * @param {Date} First date object
 * @param {Date} Second date object
 * @return {Number} Negative, zero or positive number
 */

var dateSortAsc = function dateSortAsc(date1, date2) {
  return date1.getTime() - date2.getTime();
};
/**
 * Compare function for sorting passed dates in descending manner according to
 * the corresponding UTC numeric value (returned by getTime)
 * @param {Date} First date object
 * @param {Date} Second date object
 * @return {Number} Negative, zero or positive number
 */

var dateSortDesc = function dateSortDesc(date1, date2) {
  return date2.getTime() - date1.getTime();
};
/**
 * Curried compare function for sorting passed formatted numbers in desired
 * fashion according to supplied compare function and decimal separator
 * @param {Function} Compare function
 * @param {String} [decimal=','] Decimal separator
 * @return {Function} Compare function receiving parsed numeric arguments
 */

var sortNumberStr = function sortNumberStr(compareFn) {
  var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
  return function (numStr1, numStr2) {
    var num1 = Object(_number__WEBPACK_IMPORTED_MODULE_0__["parse"])(numStr1, decimal);
    var num2 = Object(_number__WEBPACK_IMPORTED_MODULE_0__["parse"])(numStr2, decimal);
    return compareFn(num1, num2);
  };
};
/**
 * Curried compare function for sorting passed formatted dates in desired
 * fashion according to supplied compare function and locale
 * @param {Function} Compare function
 * @param {String} [locale='en-us'] Locale code
 * @return {Function} Compare function receiving parsed date arguments
 */

var sortDateStr = function sortDateStr(compareFn) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-us';
  return function (dateStr1, dateStr2) {
    var date1 = sugar_date__WEBPACK_IMPORTED_MODULE_1__["Date"].create(dateStr1, locale);
    var date2 = sugar_date__WEBPACK_IMPORTED_MODULE_1__["Date"].create(dateStr2, locale);
    return compareFn(date1, date2);
  };
};

/***/ }),

/***/ "./src/string.js":
/*!***********************!*\
  !*** ./src/string.js ***!
  \***********************/
/*! exports provided: trim, isEmpty, rgxEsc, matchCase, contains, toCamelCase, uuid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trim", function() { return trim; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgxEsc", function() { return rgxEsc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchCase", function() { return matchCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return contains; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCamelCase", function() { return toCamelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uuid", function() { return uuid; });
/* harmony import */ var diacritics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! diacritics */ "./node_modules/diacritics/index.js");
/* harmony import */ var diacritics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(diacritics__WEBPACK_IMPORTED_MODULE_0__);

/**
 * String utilities
 */

/**
 * Removes whitespace from both sides of passed string
 * @param  {String} text
 * @return {String}
 */

var trim = function trim(text) {
  if (text.trim) {
    return text.trim();
  }

  return text.replace(/^\s*|\s*$/g, '');
};
/**
 * Checks if passed string is empty
 * @param {String} text
 * @return {Boolean}
 */

var isEmpty = function isEmpty(text) {
  return trim(text) === '';
};
/**
 * Makes regex safe string by escaping special characters from passed string
 * @param {String} text
 * @return {String} escaped string
 */

var rgxEsc = function rgxEsc(text) {
  var chars = /[-\/\\^$*+?.()|[\]{}]/g;
  var escMatch = '\\$&';
  return String(text).replace(chars, escMatch);
};
/**
 * Returns passed string as lowercase if caseSensitive flag set false. By
 * default it returns the string with no casing changes.
 * @param {String} text
 * @return {String} string
 */

var matchCase = function matchCase(text) {
  var caseSensitive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!caseSensitive) {
    return text.toLowerCase();
  }

  return text;
};
/**
 * Checks if passed data contains the searched term
 * @param  {String} term                Searched term
 * @param  {String} data                Data string
 * @param  {Boolean} exactMatch         Exact match
 * @param  {Boolean} caseSensitive      Case sensitive
 * @param  {Boolean} ignoreDiacritics   Ignore diacritics
 * @return {Boolean}
 */

var contains = function contains(term, data) {
  var exactMatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var caseSensitive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var ignoreDiacritics = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  // Improved by Cedric Wartel (cwl) automatic exact match for selects and
  // special characters are now filtered
  var regexp;
  var modifier = caseSensitive ? 'g' : 'gi';

  if (ignoreDiacritics) {
    term = Object(diacritics__WEBPACK_IMPORTED_MODULE_0__["remove"])(term);
    data = Object(diacritics__WEBPACK_IMPORTED_MODULE_0__["remove"])(data);
  }

  if (exactMatch) {
    regexp = new RegExp('(^\\s*)' + rgxEsc(term) + '(\\s*$)', modifier);
  } else {
    regexp = new RegExp(rgxEsc(term), modifier);
  }

  return regexp.test(data);
};
/**
 * Camelize a string, cutting the string by multiple separators like
 * hyphens, underscores and spaces.
 * @param  {String} text text to camelize
 * @return {String}      camelized text
 */

var toCamelCase = function toCamelCase() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function (match, p1, p2) {
    if (p2) {
      return p2.toUpperCase();
    }

    return p1.toLowerCase();
  });
};
/**
 * Generate a string in the format of a UUID (Universally Unique IDentifier).
 * NOTE: This format of 8 chars, followed by 3 groups of 4 chars, followed by 12
 * chars is known as a UUID and is defined in RFC4122 and is a standard for
 * generating unique IDs. This function DOES NOT implement this standard.
 * It simply outputs a string that looks similar. The standard is found here:
 * https://www.ietf.org/rfc/rfc4122.txt
 * source: https://gist.github.com/gordonbrander/2230317
 * @return {String}
 */

var uuid = function uuid() {
  var chr4 = function chr4() {
    return Math.random().toString(16).slice(-4);
  };

  return chr4() + chr4() + '-' + chr4() + '-' + chr4() + '-' + chr4() + '-' + chr4() + chr4() + chr4();
};

/***/ }),

/***/ "./src/tablefilter.js":
/*!****************************!*\
  !*** ./src/tablefilter.js ***!
  \****************************/
/*! exports provided: TableFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableFilter", function() { return TableFilter; });
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event */ "./src/event.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./string */ "./src/string.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./src/types.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./number */ "./src/number.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings */ "./src/settings.js");
/* harmony import */ var _root__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./root */ "./src/root.js");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./emitter */ "./src/emitter.js");
/* harmony import */ var _modules_dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/dropdown */ "./src/modules/dropdown.js");
/* harmony import */ var _modules_checkList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/checkList */ "./src/modules/checkList.js");
/* harmony import */ var _modules_dateType__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/dateType */ "./src/modules/dateType.js");
/* harmony import */ var _modules_help__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/help */ "./src/modules/help.js");
/* harmony import */ var _modules_state__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/state */ "./src/modules/state.js");
/* harmony import */ var _modules_gridLayout__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/gridLayout */ "./src/modules/gridLayout.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/loader */ "./src/modules/loader.js");
/* harmony import */ var _modules_highlightKeywords__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/highlightKeywords */ "./src/modules/highlightKeywords.js");
/* harmony import */ var _modules_popupFilter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modules/popupFilter */ "./src/modules/popupFilter.js");
/* harmony import */ var _modules_markActiveColumns__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/markActiveColumns */ "./src/modules/markActiveColumns.js");
/* harmony import */ var _modules_rowsCounter__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/rowsCounter */ "./src/modules/rowsCounter.js");
/* harmony import */ var _modules_statusBar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./modules/statusBar */ "./src/modules/statusBar.js");
/* harmony import */ var _modules_clearButton__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./modules/clearButton */ "./src/modules/clearButton.js");
/* harmony import */ var _modules_alternateRows__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./modules/alternateRows */ "./src/modules/alternateRows.js");
/* harmony import */ var _modules_noResults__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./modules/noResults */ "./src/modules/noResults.js");
/* harmony import */ var _modules_paging__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./modules/paging */ "./src/modules/paging.js");
/* harmony import */ var _modules_toolbar__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./modules/toolbar */ "./src/modules/toolbar.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./const */ "./src/const.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



























var doc = _root__WEBPACK_IMPORTED_MODULE_6__["root"].document;
var FEATURES = [_modules_dateType__WEBPACK_IMPORTED_MODULE_10__["DateType"], _modules_help__WEBPACK_IMPORTED_MODULE_11__["Help"], _modules_state__WEBPACK_IMPORTED_MODULE_12__["State"], _modules_markActiveColumns__WEBPACK_IMPORTED_MODULE_17__["MarkActiveColumns"], _modules_gridLayout__WEBPACK_IMPORTED_MODULE_13__["GridLayout"], _modules_loader__WEBPACK_IMPORTED_MODULE_14__["Loader"], _modules_highlightKeywords__WEBPACK_IMPORTED_MODULE_15__["HighlightKeyword"], _modules_popupFilter__WEBPACK_IMPORTED_MODULE_16__["PopupFilter"], _modules_rowsCounter__WEBPACK_IMPORTED_MODULE_18__["RowsCounter"], _modules_statusBar__WEBPACK_IMPORTED_MODULE_19__["StatusBar"], _modules_clearButton__WEBPACK_IMPORTED_MODULE_20__["ClearButton"], _modules_alternateRows__WEBPACK_IMPORTED_MODULE_21__["AlternateRows"], _modules_noResults__WEBPACK_IMPORTED_MODULE_22__["NoResults"], _modules_paging__WEBPACK_IMPORTED_MODULE_23__["Paging"], _modules_toolbar__WEBPACK_IMPORTED_MODULE_24__["Toolbar"]];
/**
 * Makes HTML tables filterable and a bit more :)
 *
 * @export
 * @class TableFilter
 */

var TableFilter = /*#__PURE__*/function () {
  /**
   * Creates an instance of TableFilter
   * requires `table` or `id` arguments, `row` and `configuration` optional
   * @param {HTMLTableElement} table Table DOM element
   * @param {String} id Table id
   * @param {Number} row index indicating the 1st row
   * @param {Object} configuration object
   */
  function TableFilter() {
    var _this = this;

    _classCallCheck(this, TableFilter);

    /**
     * ID of current instance
     * @type {String}
     * @private
     */
    this.id = null;
    /**
     * Current version
     * @type {String}
     */

    this.version = '0.7.0';
    /**
     * Current year
     * @type {Number}
     * @private
     */

    this.year = new Date().getFullYear();
    /**
     * HTML Table DOM element
     * @type {DOMElement}
     * @private
     */

    this.tbl = null;
    /**
     * Calculated row's index from which starts filtering once filters
     * are generated
     * @type {Number}
     */

    this.refRow = null;
    /**
     * Index of the headers row
     * @type {Number}
     * @private
     */

    this.headersRow = null;
    /**
     * Configuration object
     * @type {Object}
     * @private
     */

    this.cfg = {};
    /**
     * Number of rows that can be filtered
     * @type {Number}
     * @private
     */

    this.nbFilterableRows = 0;
    /**
     * Number of cells in the reference row
     * @type {Number}
     * @private
     */

    this.nbCells = null;
    /**
     * Has a configuration object
     * @type {Object}
     * @private
     */

    this.hasConfig = false;
    /** @private */

    this.initialized = false;
    var startRow; // TODO: use for-of

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args.forEach(function (arg) {
      if (_typeof(arg) === 'object' && arg.nodeName === 'TABLE') {
        _this.tbl = arg;
        _this.id = arg.id || "tf_".concat(Object(_string__WEBPACK_IMPORTED_MODULE_2__["uuid"])());
        _this.tbl.id = _this.id;
      } else if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isString"])(arg)) {
        _this.id = arg;
        _this.tbl = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(arg);
      } else if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isNumber"])(arg)) {
        startRow = arg;
      } else if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(arg)) {
        _this.cfg = arg;
        _this.hasConfig = true;
      }
    });

    if (!this.tbl || this.tbl.nodeName !== 'TABLE') {
      throw new Error("Could not instantiate TableFilter: HTML table\n                DOM element not found.");
    }

    if (this.getRowsNb(true) === 0) {
      throw new Error("Could not instantiate TableFilter: HTML table\n                requires at least 1 row.");
    } // configuration object


    var f = this.cfg;
    /**
     * Event emitter instance
     * @type {Emitter}
     */

    this.emitter = new _emitter__WEBPACK_IMPORTED_MODULE_7__["Emitter"](); // start row

    this.refRow = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isUndef"])(startRow) ? 2 : startRow + 1;
    /**
     * Collection of filter type by column
     * @type {Array}
     * @private
     */

    this.filterTypes = [].map.call((this.dom().rows[this.refRow] || this.dom().rows[0]).cells, function (cell, idx) {
      var colType = _this.cfg["col_".concat(idx)];

      return !colType ? _const__WEBPACK_IMPORTED_MODULE_25__["INPUT"] : colType.toLowerCase();
    });
    /**
     * Base path for static assets
     * @type {String}
     */

    this.basePath = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.base_path, 'tablefilter/');
    /*** filters' grid properties ***/

    /**
     * Enable/disable filters
     * @type {Boolean}
     */

    this.fltGrid = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsBool"])(f.grid, true);
    /**
     * Enable/disable grid layout (fixed headers)
     * @type {Object|Boolean}
     */

    this.gridLayout = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.grid_layout) || Boolean(f.grid_layout);
    /**
     * Filters row index
     * @type {Number}
     */

    this.filtersRowIndex = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsNb"])(f.filters_row_index, 0);
    /**
     * Headers row index
     * @type {Number}
     */

    this.headersRow = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsNb"])(f.headers_row_index, this.filtersRowIndex === 0 ? 1 : 0);
    /**
     * Define the type of cell containing a filter (td/th)
     * @type {String}
     */

    this.fltCellTag = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.filters_cell_tag, _const__WEBPACK_IMPORTED_MODULE_25__["CELL_TAG"]);
    /**
     * List of filters IDs
     * @type {Array}
     * @private
     */

    this.fltIds = [];
    /**
     * List of valid rows indexes (rows visible upon filtering)
     * @type {Array}
     * @private
     */

    this.validRowsIndex = [];
    /*** filters' grid appearance ***/

    /**
     * Path for stylesheets
     * @type {String}
     */

    this.stylePath = this.getStylePath();
    /**
     * Main stylesheet path
     * @type {String}
     */

    this.stylesheet = this.getStylesheetPath();
    /**
     * Main stylesheet ID
     * @type {String}
     * @private
     */

    this.stylesheetId = this.id + '_style';
    /**
     * Css class for the filters row
     * @type {String}
     */

    this.fltsRowCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.flts_row_css_class, 'fltrow');
    /**
     * Enable/disable icons (paging, reset button)
     * @type {Boolean}
     */

    this.enableIcons = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsBool"])(f.enable_icons, true);
    /**
     * Enable/disable alternating rows
     * @type {Boolean}
     */

    this.alternateRows = Boolean(f.alternate_rows);
    /**
     * Columns widths array
     * @type {Array}
     */

    this.colWidths = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsArr"])(f.col_widths, []);
    /**
     * Default column width when column widths are defined
     */

    this.defaultColWidth = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsNb"])(f.default_col_width, 100);
    /**
     * Css class for a filter element
     * @type {String}
     */

    this.fltCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.flt_css_class, 'flt');
    /**
     * Css class for multiple select filters
     * @type {String}
     */

    this.fltMultiCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.flt_multi_css_class, 'flt_multi');
    /**
     * Css class for small filter (when submit button is active)
     * @type {String}
     */

    this.fltSmallCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.flt_small_css_class, 'flt_s');
    /**
     * Css class for single filter type
     * @type {String}
     */

    this.singleFltCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])((f.single_filter || {}).css_class, 'single_flt');
    /*** filters' grid behaviours ***/

    /**
     * Enable/disable enter key for input type filters
     * @type {Boolean}
     */

    this.enterKey = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsBool"])(f.enter_key, true);
    /**
     * Callback fired before filtering process starts
     * @type {Function}
     */

    this.onBeforeFilter = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsFn"])(f.on_before_filter, _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"]);
    /**
     * Callback fired after filtering process is completed
     * @type {Function}
     */

    this.onAfterFilter = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsFn"])(f.on_after_filter, _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"]);
    /**
     * Enable/disable case sensitivity for filtering, default false
     * @type {Boolean}
     */

    this.caseSensitive = Boolean(f.case_sensitive);
    /**
     * Indicate whether exact match filtering is enabled on a per column
     * basis
     * @type {Boolean}
     * @private
     */

    this.hasExactMatchByCol = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(f.columns_exact_match);
    /**
     * Exact match filtering per column array
     * @type {Array}
     */

    this.exactMatchByCol = this.hasExactMatchByCol ? f.columns_exact_match : [];
    /**
     * Globally enable/disable exact match filtering
     * @type {Boolean}
     */

    this.exactMatch = Boolean(f.exact_match);
    /**
     * Ignore diacritics globally or on a column basis
     * @type {Boolean|Array}
     */

    this.ignoreDiacritics = f.ignore_diacritics;
    /**
     * Enable/disable linked filters filtering mode
     * @type {Boolean}
     */

    this.linkedFilters = Boolean(f.linked_filters);
    /**
     * Enable/disable readonly state for excluded options when
     * linked filters filtering mode is on
     * @type {Boolean}
     */

    this.disableExcludedOptions = Boolean(f.disable_excluded_options);
    /**
     * Active filter ID
     * @type {String}
     * @private
     */

    this.activeFilterId = null;
    /**
     * Determine if there are excluded rows from filtering
     * @type {Boolean}
     * @private
     */

    this.hasExcludedRows = Boolean(Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(f.exclude_rows) && f.exclude_rows.length > 0);
    /**
     * List of row indexes to be excluded from filtering
     * @type {Array}
     */

    this.excludeRows = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsArr"])(f.exclude_rows, []);
    /**
     * List of containers IDs where external filters will be generated
     * @type {Array}
     */

    this.externalFltIds = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsArr"])(f.external_flt_ids, []);
    /**
     * Callback fired after filters are generated
     * @type {Function}
     */

    this.onFiltersLoaded = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsFn"])(f.on_filters_loaded, _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"]);
    /**
     * Enable/disable single filter mode
     * @type {Boolean|Object}
     */

    this.singleFlt = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.single_filter) || Boolean(f.single_filter);
    /**
     * Specify columns to be excluded from single filter search, by default
     * searching in all columns:
     * single_filter: {
     *      exclude_cols: [2, 7]
     * }
     */

    this.singleFltExcludeCols = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.single_filter) && Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(f.single_filter.exclude_cols) ? f.single_filter.exclude_cols : [];
    /**
     * Callback fired after a row is validated during filtering
     * @type {Function}
     */

    this.onRowValidated = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsFn"])(f.on_row_validated, _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"]);
    /**
     * Specify which column implements a custom cell parser to retrieve the
     * cell value:
     * cell_parser: {
     *     cols: [0, 2],
     *     parse: function(tf, cell, colIndex) {
     *         // custom cell parser logic here
     *         return cellValue;
     *     }
     * }
     * @type {Object}
     */

    this.cellParser = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.cell_parser) && Object(_types__WEBPACK_IMPORTED_MODULE_3__["isFn"])(f.cell_parser.parse) && Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(f.cell_parser.cols) ? f.cell_parser : {
      cols: [],
      parse: _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"]
    };
    /**
     * Global watermark text for input filter type or watermark for each
     * filter if an array is supplied
     * @type {String|Array}
     */

    this.watermark = f.watermark || '';
    /**
     * Indicate whether watermark is on a per column basis
     * @type {Boolean}
     * @private
     */

    this.isWatermarkArray = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(this.watermark);
    /**
     * Indicate whether help UI component is disabled
     * @type {Boolean}
     */

    this.help = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isUndef"])(f.help_instructions) ? undefined : Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.help_instructions) || Boolean(f.help_instructions);
    /**
     * Indicate whether pop-up filters UI is enabled
     * @type {Boolean|Object}
     */

    this.popupFilters = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.popup_filters) || Boolean(f.popup_filters);
    /**
     * Indicate whether filtered (active) columns indicator is enabled
     * @type {Boolean}
     */

    this.markActiveColumns = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.mark_active_columns) || Boolean(f.mark_active_columns);
    /*** select filter's customisation and behaviours ***/

    /**
     * Text for clear option in drop-down filter types (1st option)
     * @type {String|Array}
     */

    this.clearFilterText = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(f.clear_filter_text) ? f.clear_filter_text : Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.clear_filter_text, 'Clear');
    /**
     * Indicate whether empty option is enabled in drop-down filter types
     * @type {Boolean}
     */

    this.enableEmptyOption = Boolean(f.enable_empty_option);
    /**
     * Text for empty option in drop-down filter types
     * @type {String}
     */

    this.emptyText = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.empty_text, '(Empty)');
    /**
     * Indicate whether non-empty option is enabled in drop-down filter
     * types
     * @type {Boolean}
     */

    this.enableNonEmptyOption = Boolean(f.enable_non_empty_option);
    /**
     * Text for non-empty option in drop-down filter types
     * @type {String}
     */

    this.nonEmptyText = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.non_empty_text, '(Non empty)');
    /**
     * Indicate whether drop-down filter types filter the table by default
     * on change event
     * @type {Boolean}
     */

    this.onSlcChange = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsBool"])(f.on_change, true);
    /**
     * Make drop-down filter types options sorted in alpha-numeric manner
     * by default globally or on a column basis
     * @type {Boolean|Array}
     */

    this.sortSlc = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isUndef"])(f.sort_select) ? true : Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsArr"])(f.sort_select, Boolean(f.sort_select));
    /**
     * List of columns implementing filter options sorting in ascending
     * manner based on column data type
     * @type {Array}
     */

    this.sortFilterOptionsAsc = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsArr"])(f.sort_filter_options_asc, []);
    /**
     * List of columns implementing filter options sorting in descending
     * manner based on column data type
     * @type {Array}
     */

    this.sortFilterOptionsDesc = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsArr"])(f.sort_filter_options_desc, []);
    /**
     * Indicate whether drop-down filter types are populated on demand at
     * first usage
     * @type {Boolean}
     */

    this.loadFltOnDemand = Boolean(f.load_filters_on_demand);
    /**
     * Indicate whether custom drop-down filter options are implemented
     * @type {Boolean}
     */

    this.hasCustomOptions = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.custom_options);
    /**
     * Custom options definition of a per column basis, ie:
     *	custom_options: {
     *      cols:[0, 1],
     *      texts: [
     *          ['a0', 'b0', 'c0'],
     *          ['a1', 'b1', 'c1']
     *      ],
     *      values: [
     *          ['a0', 'b0', 'c0'],
     *          ['a1', 'b1', 'c1']
     *      ],
     *      sorts: [false, true]
     *  }
     *
     * @type {Object}
     */

    this.customOptions = f.custom_options;
    /*** Filter operators ***/

    /**
     * Regular expression operator for input filter. Defaults to 'rgx:'
     * @type {String}
     */

    this.rgxOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.regexp_operator, 'rgx:');
    /**
     * Empty cells operator for input filter. Defaults to '[empty]'
     * @type {String}
     */

    this.emOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.empty_operator, '[empty]');
    /**
     * Non-empty cells operator for input filter. Defaults to '[nonempty]'
     * @type {String}
     */

    this.nmOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.nonempty_operator, '[nonempty]');
    /**
     * Logical OR operator for input filter. Defaults to '||'
     * @type {String}
     */

    this.orOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.or_operator, '||');
    /**
     * Logical AND operator for input filter. Defaults to '&&'
     * @type {String}
     */

    this.anOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.and_operator, '&&');
    /**
     * Greater than operator for input filter. Defaults to '>'
     * @type {String}
     */

    this.grOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.greater_operator, '>');
    /**
     * Lower than operator for input filter. Defaults to '<'
     * @type {String}
     */

    this.lwOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.lower_operator, '<');
    /**
     * Lower than or equal operator for input filter. Defaults to '<='
     * @type {String}
     */

    this.leOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.lower_equal_operator, '<=');
    /**
     * Greater than or equal operator for input filter. Defaults to '>='
     * @type {String}
     */

    this.geOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.greater_equal_operator, '>=');
    /**
     * Inequality operator for input filter. Defaults to '!'
     * @type {String}
     */

    this.dfOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.different_operator, '!');
    /**
     * Like operator for input filter. Defaults to '*'
     * @type {String}
     */

    this.lkOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.like_operator, '*');
    /**
     * Strict equality operator for input filter. Defaults to '='
     * @type {String}
     */

    this.eqOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.equal_operator, '=');
    /**
     * Starts with operator for input filter. Defaults to '='
     * @type {String}
     */

    this.stOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.start_with_operator, '{');
    /**
     * Ends with operator for input filter. Defaults to '='
     * @type {String}
     */

    this.enOperator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.end_with_operator, '}'); // this.curExp = f.cur_exp || '^[¥£€$]';

    /**
     * Stored values separator
     * @type {String}
     */

    this.separator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.separator, ',');
    /**
     * Enable rows counter UI component
     * @type {Boolean|Object}
     */

    this.rowsCounter = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.rows_counter) || Boolean(f.rows_counter);
    /**
     * Enable status bar UI component
     * @type {Boolean|Object}
     */

    this.statusBar = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.status_bar) || Boolean(f.status_bar);
    /**
     * Enable activity/spinner indicator UI component
     * @type {Boolean|Object}
     */

    this.loader = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.loader) || Boolean(f.loader);
    /*** validation - reset buttons/links ***/

    /**
     * Enable filters submission button
     * @type {Boolean}
     */

    this.displayBtn = Boolean(f.btn);
    /**
     * Define filters submission button text
     * @type {String}
     */

    this.btnText = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_text, !this.enableIcons ? 'Go' : '');
    /**
     * Css class for filters submission button
     * @type {String}
     */

    this.btnCssClass = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.btn_css_class, !this.enableIcons ? 'btnflt' : 'btnflt_icon');
    /**
     * Enable clear button
     * @type {Object|Boolean}
     */

    this.btnReset = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.btn_reset) || Boolean(f.btn_reset);
    /**
     * Callback fired before filters are cleared
     * @type {Function}
     */

    this.onBeforeReset = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsFn"])(f.on_before_reset, _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"]);
    /**
     * Callback fired after filters are cleared
     * @type {Function}
     */

    this.onAfterReset = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsFn"])(f.on_after_reset, _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"]);
    /**
     * Enable paging component
     * @type {Object|Boolean}
     */

    this.paging = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.paging) || Boolean(f.paging);
    /**
     * Number of hidden rows
     * @type {Number}
     * @private
     */

    this.nbHiddenRows = 0;
    /**
     * Enable auto-filter behaviour, table is filtered when a user
     * stops typing
     * @type {Object|Boolean}
     */

    this.autoFilter = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.auto_filter) || Boolean(f.auto_filter);
    /**
     * Auto-filter delay in milliseconds
     * @type {Number}
     */

    this.autoFilterDelay = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.auto_filter) && Object(_types__WEBPACK_IMPORTED_MODULE_3__["isNumber"])(f.auto_filter.delay) ? f.auto_filter.delay : _const__WEBPACK_IMPORTED_MODULE_25__["AUTO_FILTER_DELAY"];
    /**
     * Indicate whether user is typing
     * @type {Boolean}
     * @private
     */

    this.isUserTyping = null;
    /**
     * Auto-filter interval ID
     * @type {String}
     * @private
     */

    this.autoFilterTimer = null;
    /**
     * Enable keyword highlighting behaviour
     * @type {Boolean}
     */

    this.highlightKeywords = Boolean(f.highlight_keywords);
    /**
     * Enable no results message UI component
     * @type {Object|Boolean}
     */

    this.noResults = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.no_results_message) || Boolean(f.no_results_message);
    /**
     * Enable state persistence
     * @type {Object|Boolean}
     */

    this.state = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.state) || Boolean(f.state);
    /*** data types ***/

    /**
     * Enable date type module
     * @type {Boolean}
     * @private
     */

    this.dateType = true;
    /**
     * Define default locale, default to 'en' as per Sugar Date module:
     * https://sugarjs.com/docs/#/DateLocales
     * @type {String}
     */

    this.locale = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.locale, 'en');
    /**
     * Define thousands separator ',' or '.', defaults to ','
     * @type {String}
     */

    this.thousandsSeparator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.thousands_separator, ',');
    /**
     * Define decimal separator ',' or '.', defaults to '.'
     * @type {String}
     */

    this.decimalSeparator = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(f.decimal_separator, '.');
    /**
     * Define data types on a column basis, possible values 'string',
     * 'number', 'formatted-number', 'date', 'ipaddress' ie:
     * col_types : [
     *  'string', 'date', 'number',
     *  { type: 'formatted-number', decimal: ',', thousands: '.' },
     *  { type: 'date', locale: 'en-gb' },
     *  { type: 'date', format: ['{dd}-{months}-{yyyy|yy}'] }
     * ]
     *
     * Refer to https://sugarjs.com/docs/#/DateParsing for exhaustive
     * information on date parsing formats supported by Sugar Date
     * @type {Array}
     */

    this.colTypes = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(f.col_types) ? f.col_types : [];
    /*** ids prefixes ***/

    /**
     * Main prefix
     * @private
     */

    this.prfxTf = 'TF';
    /**
     * Filter's ID prefix (inputs - selects)
     * @private
     */

    this.prfxFlt = 'flt';
    /**
     * Button's ID prefix
     * @private
     */

    this.prfxValButton = 'btn';
    /**
     * Responsive Css class
     * @private
     */

    this.prfxResponsive = 'resp';
    /** @private */

    this.stickyCssClass = 'sticky';
    /*** extensions ***/

    /**
     * List of loaded extensions
     * @type {Array}
     */

    this.extensions = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsArr"])(f.extensions, []);
    /*** themes ***/

    /**
     * Enable default theme
     * @type {Boolean}
     */

    this.enableDefaultTheme = Boolean(f.enable_default_theme);
    /**
     * Determine whether themes are enables
     * @type {Boolean}
     * @private
     */

    this.hasThemes = this.enableDefaultTheme || Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(f.themes);
    /**
     * List of themes, ie:
     * themes: [{ name: 'skyblue' }]
     * @type {Array}
     */

    this.themes = Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsArr"])(f.themes, []);
    /**
     * Define path to themes assets, defaults to
     * 'tablefilter/style/themes/'. Usage:
     * themes: [{ name: 'skyblue' }]
     * @type {Array}
     */

    this.themesPath = this.getThemesPath();
    /**
     * Enable responsive layout
     * @type {Boolean}
     */

    this.responsive = Boolean(f.responsive);
    /**
     * Enable toolbar component
     * @type {Object|Boolean}
     */

    this.toolbar = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(f.toolbar) || Boolean(f.toolbar);
    /**
     * Enable sticky headers
     * @type {Boolean}
     */

    this.stickyHeaders = Boolean(f.sticky_headers);
    /**
     * Features registry
     * @private
     */

    this.Mod = {};
    /**
     * Extensions registry
     * @private
     */

    this.ExtRegistry = {}; // instantiate features if needed

    this.instantiateFeatures(FEATURES);
  }
  /**
   * Initialise features and layout
   */


  _createClass(TableFilter, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.initialized) {
        return;
      } // import main stylesheet


      this["import"](this.stylesheetId, this.getStylesheetPath(), null, 'link');
      var Mod = this.Mod;
      var inpclass; //loads theme

      this.loadThemes(); //explicitly initialise features in given order

      this.initFeatures([_modules_dateType__WEBPACK_IMPORTED_MODULE_10__["DateType"], _modules_help__WEBPACK_IMPORTED_MODULE_11__["Help"], _modules_state__WEBPACK_IMPORTED_MODULE_12__["State"], _modules_markActiveColumns__WEBPACK_IMPORTED_MODULE_17__["MarkActiveColumns"], _modules_gridLayout__WEBPACK_IMPORTED_MODULE_13__["GridLayout"], _modules_loader__WEBPACK_IMPORTED_MODULE_14__["Loader"], _modules_highlightKeywords__WEBPACK_IMPORTED_MODULE_15__["HighlightKeyword"], _modules_popupFilter__WEBPACK_IMPORTED_MODULE_16__["PopupFilter"]]); //filters grid is not generated

      if (!this.fltGrid) {
        this._initNoFilters();
      } else {
        var fltrow = this._insertFiltersRow();

        this.nbCells = this.getCellsNb(this.refRow);
        this.nbFilterableRows = this.getRowsNb();
        var n = this.singleFlt ? 1 : this.nbCells; //build filters

        for (var i = 0; i < n; i++) {
          this.emitter.emit('before-filter-init', this, i);
          var fltCell = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(this.fltCellTag),
              col = this.getFilterType(i);

          if (this.singleFlt) {
            fltCell.colSpan = this.nbCells;
          }

          if (!this.gridLayout) {
            fltrow.appendChild(fltCell);
          }

          inpclass = i === n - 1 && this.displayBtn ? this.fltSmallCssClass : this.fltCssClass; //only 1 input for single search

          if (this.singleFlt) {
            col = _const__WEBPACK_IMPORTED_MODULE_25__["INPUT"];
            inpclass = this.singleFltCssClass;
          } //drop-down filters


          if (col === _const__WEBPACK_IMPORTED_MODULE_25__["SELECT"] || col === _const__WEBPACK_IMPORTED_MODULE_25__["MULTIPLE"]) {
            Mod.dropdown = Mod.dropdown || new _modules_dropdown__WEBPACK_IMPORTED_MODULE_8__["Dropdown"](this);
            Mod.dropdown.init(i, this.isExternalFlt(), fltCell);
          } // checklist
          else if (col === _const__WEBPACK_IMPORTED_MODULE_25__["CHECKLIST"]) {
              Mod.checkList = Mod.checkList || new _modules_checkList__WEBPACK_IMPORTED_MODULE_9__["CheckList"](this);
              Mod.checkList.init(i, this.isExternalFlt(), fltCell);
            } else {
              this._buildInputFilter(i, inpclass, fltCell);
            } // this adds submit button


          if (i === n - 1 && this.displayBtn) {
            this._buildSubmitButton(this.isExternalFlt() ? Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.externalFltIds[i]) : fltCell);
          }

          this.emitter.emit('after-filter-init', this, i);
        }

        this.emitter.on(['filter-focus'], function (tf, filter) {
          return _this2.setActiveFilterId(filter.id);
        });
      } //if this.fltGrid

      /* Features */


      if (this.hasExcludedRows) {
        this.emitter.on(['after-filtering'], function () {
          return _this2.setExcludeRows();
        });
        this.setExcludeRows();
      }

      this.initFeatures([_modules_rowsCounter__WEBPACK_IMPORTED_MODULE_18__["RowsCounter"], _modules_statusBar__WEBPACK_IMPORTED_MODULE_19__["StatusBar"], _modules_clearButton__WEBPACK_IMPORTED_MODULE_20__["ClearButton"], _modules_alternateRows__WEBPACK_IMPORTED_MODULE_21__["AlternateRows"], _modules_noResults__WEBPACK_IMPORTED_MODULE_22__["NoResults"], _modules_paging__WEBPACK_IMPORTED_MODULE_23__["Paging"], _modules_toolbar__WEBPACK_IMPORTED_MODULE_24__["Toolbar"]]);
      this.setColWidths(); //TF css class is added to table

      if (!this.gridLayout) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(this.dom(), this.prfxTf);

        if (this.responsive) {
          Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(this.dom(), this.prfxResponsive);
        }

        if (this.colWidths.length > 0) {
          this.setFixedLayout();
        }

        if (this.stickyHeaders && this.dom().tHead) {
          Object(_dom__WEBPACK_IMPORTED_MODULE_1__["addClass"])(this.dom(), this.stickyCssClass);
        }
      }
      /* Load extensions */


      this.initExtensions();
      this.initialized = true;
      this.onFiltersLoaded(this);
      this.emitter.emit('initialized', this);
    }
    /**
     * Detect <enter> key
     * @param {Event} evt
     */

  }, {
    key: "detectKey",
    value: function detectKey(evt) {
      if (!this.enterKey) {
        return;
      }

      if (Object(_event__WEBPACK_IMPORTED_MODULE_0__["isKeyPressed"])(evt, [_const__WEBPACK_IMPORTED_MODULE_25__["ENTER_KEY"]])) {
        this.filter();
        Object(_event__WEBPACK_IMPORTED_MODULE_0__["cancelEvt"])(evt);
        Object(_event__WEBPACK_IMPORTED_MODULE_0__["stopEvt"])(evt);
      } else {
        this.isUserTyping = true;
        _root__WEBPACK_IMPORTED_MODULE_6__["root"].clearInterval(this.autoFilterTimer);
        this.autoFilterTimer = null;
      }
    }
    /**
     * Filter's keyup event: if auto-filter on, detect user is typing and filter
     * columns
     * @param {Event} evt
     */

  }, {
    key: "onKeyUp",
    value: function onKeyUp(evt) {
      if (!this.autoFilter) {
        return;
      }

      this.isUserTyping = false;

      function filter() {
        _root__WEBPACK_IMPORTED_MODULE_6__["root"].clearInterval(this.autoFilterTimer);
        this.autoFilterTimer = null;

        if (!this.isUserTyping) {
          this.filter();
          this.isUserTyping = null;
        }
      }

      if (Object(_event__WEBPACK_IMPORTED_MODULE_0__["isKeyPressed"])(evt, [_const__WEBPACK_IMPORTED_MODULE_25__["ENTER_KEY"], _const__WEBPACK_IMPORTED_MODULE_25__["TAB_KEY"], _const__WEBPACK_IMPORTED_MODULE_25__["ESC_KEY"], _const__WEBPACK_IMPORTED_MODULE_25__["UP_ARROW_KEY"], _const__WEBPACK_IMPORTED_MODULE_25__["DOWN_ARROW_KEY"]])) {
        _root__WEBPACK_IMPORTED_MODULE_6__["root"].clearInterval(this.autoFilterTimer);
        this.autoFilterTimer = null;
      } else {
        if (this.autoFilterTimer !== null) {
          return;
        }

        this.autoFilterTimer = _root__WEBPACK_IMPORTED_MODULE_6__["root"].setInterval(filter.bind(this), this.autoFilterDelay);
      }
    }
    /**
     * Filter's keydown event: if auto-filter on, detect user is typing
     */

  }, {
    key: "onKeyDown",
    value: function onKeyDown() {
      if (this.autoFilter) {
        this.isUserTyping = true;
      }
    }
    /**
     * Filter's focus event
     * @param {Event} evt
     */

  }, {
    key: "onInpFocus",
    value: function onInpFocus(evt) {
      var elm = Object(_event__WEBPACK_IMPORTED_MODULE_0__["targetEvt"])(evt);
      this.emitter.emit('filter-focus', this, elm);
    }
    /**
     * Filter's blur event: if auto-filter on, clear interval on filter blur
     */

  }, {
    key: "onInpBlur",
    value: function onInpBlur() {
      if (this.autoFilter) {
        this.isUserTyping = false;
        _root__WEBPACK_IMPORTED_MODULE_6__["root"].clearInterval(this.autoFilterTimer);
      }

      this.emitter.emit('filter-blur', this);
    }
    /**
     * Insert filters row at initialization
     */

  }, {
    key: "_insertFiltersRow",
    value: function _insertFiltersRow() {
      // TODO: prevent filters row generation for popup filters too,
      // to reduce and simplify headers row index adjusting across lib modules
      // (GridLayout, PopupFilter etc)
      if (this.gridLayout) {
        return;
      }

      var fltrow;
      var thead = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(this.dom(), 'thead');

      if (thead.length > 0) {
        fltrow = thead[0].insertRow(this.filtersRowIndex);
      } else {
        fltrow = this.dom().insertRow(this.filtersRowIndex);
      }

      fltrow.className = this.fltsRowCssClass;

      if (this.isExternalFlt()) {
        fltrow.style.display = _const__WEBPACK_IMPORTED_MODULE_25__["NONE"];
      }

      this.emitter.emit('filters-row-inserted', this, fltrow);
      return fltrow;
    }
    /**
     * Initialize filtersless table
     */

  }, {
    key: "_initNoFilters",
    value: function _initNoFilters() {
      if (this.fltGrid) {
        return;
      }

      this.refRow = this.refRow > 0 ? this.refRow - 1 : 0;
      this.nbFilterableRows = this.getRowsNb();
    }
    /**
     * Build input filter type
     * @param  {Number} colIndex      Column index
     * @param  {String} cssClass      Css class applied to filter
     * @param  {DOMElement} container Container DOM element
     */

  }, {
    key: "_buildInputFilter",
    value: function _buildInputFilter(colIndex, cssClass, container) {
      var _this3 = this;

      var col = this.getFilterType(colIndex);
      var externalFltTgtId = this.isExternalFlt() ? this.externalFltIds[colIndex] : null;
      var inpType = col === _const__WEBPACK_IMPORTED_MODULE_25__["INPUT"] ? 'text' : 'hidden';
      var inp = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(_const__WEBPACK_IMPORTED_MODULE_25__["INPUT"], ['id', this.buildFilterId(colIndex)], ['type', inpType], ['ct', colIndex]);

      if (inpType !== 'hidden' && this.watermark) {
        inp.setAttribute('placeholder', this.isWatermarkArray ? this.watermark[colIndex] || '' : this.watermark);
      }

      inp.className = cssClass || this.fltCssClass;
      Object(_event__WEBPACK_IMPORTED_MODULE_0__["addEvt"])(inp, 'focus', function (evt) {
        return _this3.onInpFocus(evt);
      }); //filter is appended in custom element

      if (externalFltTgtId) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(externalFltTgtId).appendChild(inp);
      } else {
        container.appendChild(inp);
      }

      this.fltIds.push(inp.id);
      Object(_event__WEBPACK_IMPORTED_MODULE_0__["addEvt"])(inp, 'keypress', function (evt) {
        return _this3.detectKey(evt);
      });
      Object(_event__WEBPACK_IMPORTED_MODULE_0__["addEvt"])(inp, 'keydown', function () {
        return _this3.onKeyDown();
      });
      Object(_event__WEBPACK_IMPORTED_MODULE_0__["addEvt"])(inp, 'keyup', function (evt) {
        return _this3.onKeyUp(evt);
      });
      Object(_event__WEBPACK_IMPORTED_MODULE_0__["addEvt"])(inp, 'blur', function () {
        return _this3.onInpBlur();
      });
    }
    /**
     * Build submit button
     * @param  {DOMElement} container Container DOM element
     */

  }, {
    key: "_buildSubmitButton",
    value: function _buildSubmitButton(container) {
      var _this4 = this;

      var btn = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])(_const__WEBPACK_IMPORTED_MODULE_25__["INPUT"], ['type', 'button'], ['value', this.btnText]);
      btn.className = this.btnCssClass; //filter is appended in container element

      container.appendChild(btn);
      Object(_event__WEBPACK_IMPORTED_MODULE_0__["addEvt"])(btn, 'click', function () {
        return _this4.filter();
      });
    }
    /**
     * Conditionally istantiate each feature class in passed collection if
     * required by configuration and add it to the features registry. A feature
     * class meta information contains a `name` field and optional `altName` and
     * `alwaysInstantiate` fields
     * @param {Array} [features=[]]
     * @private
     */

  }, {
    key: "instantiateFeatures",
    value: function instantiateFeatures() {
      var _this5 = this;

      var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      features.forEach(function (featureCls) {
        var Cls = featureCls; // assign meta info if not present

        Cls.meta = Cls.meta || {
          name: null,
          altName: null
        };
        Cls.meta.name = Object(_string__WEBPACK_IMPORTED_MODULE_2__["toCamelCase"])(Cls.name);
        var _Cls$meta = Cls.meta,
            name = _Cls$meta.name,
            altName = _Cls$meta.altName,
            alwaysInstantiate = _Cls$meta.alwaysInstantiate;
        var prop = altName || name;

        if (!_this5.hasConfig || _this5[prop] === true || Boolean(alwaysInstantiate)) {
          _this5.Mod[name] = _this5.Mod[name] || new Cls(_this5);
        }
      });
    }
    /**
     * Initialise each feature class in passed collection.
     * @param {Array} [features=[]]
     * @private
     */

  }, {
    key: "initFeatures",
    value: function initFeatures() {
      var _this6 = this;

      var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      features.forEach(function (featureCls) {
        var _featureCls$meta = featureCls.meta,
            name = _featureCls$meta.name,
            altName = _featureCls$meta.altName;
        var prop = altName || name;

        if (_this6[prop] === true && _this6.Mod[name]) {
          _this6.Mod[name].init();
        }
      });
    }
    /**
     * Return a feature instance for a given name
     * @param  {String} name Name of the feature
     * @return {Object}
     */

  }, {
    key: "feature",
    value: function feature(name) {
      return this.Mod[name];
    }
    /**
     * Initialise all the extensions defined in the configuration object
     */

  }, {
    key: "initExtensions",
    value: function initExtensions() {
      var _this7 = this;

      var exts = this.extensions;

      if (exts.length === 0) {
        return;
      } // Set config's publicPath dynamically for Webpack...


      __webpack_require__.p = this.basePath;
      this.emitter.emit('before-loading-extensions', this);
      exts.forEach(function (ext) {
        _this7.loadExtension(ext);
      });
      this.emitter.emit('after-loading-extensions', this);
    }
    /**
     * Load an extension module
     * @param  {Object} ext Extension config object
     */

  }, {
    key: "loadExtension",
    value: function loadExtension(ext) {
      var _this8 = this;

      if (!ext || !ext.name || this.hasExtension(ext.name)) {
        return;
      }

      var name = ext.name,
          path = ext.path;
      var modulePath;

      if (name && path) {
        modulePath = ext.path + name;
      } else {
        name = name.replace('.js', '');
        modulePath = 'extensions/{}/{}'.replace(/{}/g, name);
      } // Require pattern for Webpack


      __webpack_require__.e(/*! AMD require */ 0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./src sync recursive ^\\.\\/.*$")("./" + modulePath)]; (function (mod) {
        /* eslint-disable */
        var inst = new mod["default"](_this8, ext);
        /* eslint-enable */

        inst.init();
        _this8.ExtRegistry[name] = inst;
      }).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);}).catch(__webpack_require__.oe);
    }
    /**
     * Get an extension instance
     * @param  {String} name Name of the extension
     * @return {Object}      Extension instance
     */

  }, {
    key: "extension",
    value: function extension(name) {
      return this.ExtRegistry[name];
    }
    /**
     * Check passed extension name exists
     * @param  {String}  name Name of the extension
     * @return {Boolean}
     */

  }, {
    key: "hasExtension",
    value: function hasExtension(name) {
      return !Object(_types__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(this.ExtRegistry[name]);
    }
    /**
     * Register the passed extension instance with associated name
     * @param {Object} inst Extension instance
     * @param {String} name Name of the extension
     */

  }, {
    key: "registerExtension",
    value: function registerExtension(inst, name) {
      this.ExtRegistry[name] = inst;
    }
    /**
     * Destroy all the extensions store in extensions registry
     */

  }, {
    key: "destroyExtensions",
    value: function destroyExtensions() {
      var reg = this.ExtRegistry;
      Object.keys(reg).forEach(function (key) {
        reg[key].destroy();
        reg[key] = undefined;
      });
    }
    /**
     * Load themes defined in the configuration object
     */

  }, {
    key: "loadThemes",
    value: function loadThemes() {
      var _this9 = this;

      if (!this.hasThemes) {
        return;
      }

      var themes = this.themes;
      this.emitter.emit('before-loading-themes', this); //Default theme config

      if (this.enableDefaultTheme) {
        var defaultTheme = {
          name: 'default'
        };
        this.themes.push(defaultTheme);
      }

      themes.forEach(function (theme, i) {
        var name = theme.name,
            path = theme.path;
        var styleId = _this9.prfxTf + name;

        if (name && !path) {
          path = _this9.themesPath + name + '/' + name + '.css';
        } else if (!name && theme.path) {
          name = 'theme{0}'.replace('{0}', i);
        }

        if (!_this9.isImported(path, 'link')) {
          _this9["import"](styleId, path, null, 'link');
        }
      }); // Enable loader indicator

      this.loader = true;
      this.emitter.emit('after-loading-themes', this);
    }
    /**
     * Return stylesheet DOM element for a given theme name
     * @return {DOMElement} stylesheet element
     */

  }, {
    key: "getStylesheet",
    value: function getStylesheet() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
      return Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.prfxTf + name);
    }
    /**
     * Destroy filter grid
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this10 = this;

      if (!this.initialized) {
        return;
      }

      var emitter = this.emitter;

      if (this.isExternalFlt() && !this.popupFilters) {
        this.removeExternalFlts();
      }

      this.destroyExtensions();
      this.validateAllRows(); // broadcast destroy event modules and extensions are subscribed to

      emitter.emit('destroy', this);

      if (this.fltGrid && !this.gridLayout) {
        this.dom().deleteRow(this.filtersRowIndex);
      } // unsubscribe to events


      if (this.hasExcludedRows) {
        emitter.off(['after-filtering'], function () {
          return _this10.setExcludeRows();
        });
      }

      this.emitter.off(['filter-focus'], function (tf, filter) {
        return _this10.setActiveFilterId(filter.id);
      });
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(this.dom(), this.prfxTf);
      Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(this.dom(), this.prfxResponsive);

      if (this.dom().tHead) {
        Object(_dom__WEBPACK_IMPORTED_MODULE_1__["removeClass"])(this.dom().tHead, this.stickyCssClass);
      }

      this.nbHiddenRows = 0;
      this.validRowsIndex = [];
      this.fltIds = [];
      this.initialized = false;
    }
    /**
     * Remove all the external column filters
     */

  }, {
    key: "removeExternalFlts",
    value: function removeExternalFlts() {
      if (!this.isExternalFlt()) {
        return;
      }

      var ids = this.externalFltIds;
      ids.forEach(function (id) {
        var externalFlt = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(id);

        if (externalFlt) {
          externalFlt.innerHTML = '';
        }
      });
    }
    /**
     * Check if given column implements a filter with custom options
     * @param  {Number}  colIndex Column's index
     * @return {Boolean}
     */

  }, {
    key: "isCustomOptions",
    value: function isCustomOptions(colIndex) {
      return this.hasCustomOptions && this.customOptions.cols.indexOf(colIndex) !== -1;
    }
    /**
     * Returns an array [[value0, value1 ...],[text0, text1 ...]] with the
     * custom options values and texts
     * @param  {Number} colIndex Column's index
     * @return {Array}
     */

  }, {
    key: "getCustomOptions",
    value: function getCustomOptions(colIndex) {
      if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(colIndex) || !this.isCustomOptions(colIndex)) {
        return;
      }

      var customOptions = this.customOptions;
      var cols = customOptions.cols;
      var optTxt = [],
          optArray = [];
      var index = cols.indexOf(colIndex);
      var slcValues = customOptions.values[index];
      var slcTexts = customOptions.texts[index];
      var slcSort = customOptions.sorts[index];

      for (var r = 0, len = slcValues.length; r < len; r++) {
        optArray.push(slcValues[r]);

        if (slcTexts[r]) {
          optTxt.push(slcTexts[r]);
        } else {
          optTxt.push(slcValues[r]);
        }
      }

      if (slcSort) {
        optArray.sort();
        optTxt.sort();
      }

      return [optArray, optTxt];
    }
    /**
     * Filter the table by retrieving the data from each cell in every single
     * row and comparing it to the search term for current column. A row is
     * hidden when all the search terms are not found in inspected row.
     */

  }, {
    key: "filter",
    value: function filter() {
      var _this11 = this;

      if (!this.fltGrid || !this.initialized) {
        return;
      }

      var emitter = this.emitter; //fire onbefore callback

      this.onBeforeFilter(this);
      emitter.emit('before-filtering', this);
      var hiddenRows = 0;
      this.validRowsIndex = []; // search args

      var searchArgs = this.getFiltersValue();
      var eachRow = this.eachRow();
      eachRow(function (row, k) {
        // already filtered rows display re-init
        row.style.display = '';
        var cells = row.cells;
        var nbCells = cells.length;
        var occurence = [],
            isMatch = true,
            //only for single filter search
        isSingleFltMatch = false; // this loop retrieves cell data

        for (var j = 0; j < nbCells; j++) {
          //searched keyword
          var sA = searchArgs[_this11.singleFlt ? 0 : j];

          if (sA === '') {
            continue;
          }

          var cellValue = Object(_string__WEBPACK_IMPORTED_MODULE_2__["matchCase"])(_this11.getCellValue(cells[j]), _this11.caseSensitive); //multiple search parameter operator ||

          var sAOrSplit = sA.toString().split(_this11.orOperator),
              //multiple search || parameter boolean
          hasMultiOrSA = sAOrSplit.length > 1,
              //multiple search parameter operator &&
          sAAndSplit = sA.toString().split(_this11.anOperator),
              //multiple search && parameter boolean
          hasMultiAndSA = sAAndSplit.length > 1; //detect operators or array query

          if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(sA) || hasMultiOrSA || hasMultiAndSA) {
            var cS = void 0,
                s = void 0;
            var found = false;

            if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(sA)) {
              s = sA;
            } else {
              s = hasMultiOrSA ? sAOrSplit : sAAndSplit;
            } // isolate search term and check occurence in cell data


            for (var w = 0, len = s.length; w < len; w++) {
              cS = Object(_string__WEBPACK_IMPORTED_MODULE_2__["trim"])(s[w]);
              found = _this11._match(cS, cellValue, cells[j]);

              if (found) {
                emitter.emit('highlight-keyword', _this11, cells[j], cS);
              }

              if (hasMultiOrSA && found || hasMultiAndSA && !found) {
                break;
              }

              if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(sA) && found) {
                break;
              }
            }

            occurence[j] = found;
          } //single search parameter
          else {
              occurence[j] = _this11._match(Object(_string__WEBPACK_IMPORTED_MODULE_2__["trim"])(sA), cellValue, cells[j]);

              if (occurence[j]) {
                emitter.emit('highlight-keyword', _this11, cells[j], sA);
              }
            }

          if (!occurence[j]) {
            isMatch = false;
          }

          if (_this11.singleFlt && _this11.singleFltExcludeCols.indexOf(j) === -1 && occurence[j]) {
            isSingleFltMatch = true;
          }

          emitter.emit('cell-processed', _this11, j, cells[j]);
        } //for j


        if (isSingleFltMatch) {
          isMatch = true;
        }

        _this11.validateRow(k, isMatch);

        if (!isMatch) {
          hiddenRows++;
        }

        emitter.emit('row-processed', _this11, k, _this11.validRowsIndex.length - 1, isMatch);
      }, // continue condition
      function (row) {
        return row.cells.length !== _this11.nbCells;
      });
      this.nbHiddenRows = hiddenRows; //fire onafterfilter callback

      this.onAfterFilter(this);
      emitter.emit('after-filtering', this, searchArgs);
    }
    /**
     * Match search term in cell data
     * @param {String} term       Search term
     * @param {String} cellValue  Cell data
     * @param {DOMElement} cell   Current cell
     * @return {Boolean}
     * @private
     */

  }, {
    key: "_match",
    value: function _match(term, cellValue, cell) {
      var numData;
      var colIdx = cell.cellIndex;
      var decimal = this.getDecimal(colIdx);
      var reLe = new RegExp(this.leOperator),
          reGe = new RegExp(this.geOperator),
          reL = new RegExp(this.lwOperator),
          reG = new RegExp(this.grOperator),
          reD = new RegExp(this.dfOperator),
          reLk = new RegExp(Object(_string__WEBPACK_IMPORTED_MODULE_2__["rgxEsc"])(this.lkOperator)),
          reEq = new RegExp(this.eqOperator),
          reSt = new RegExp(this.stOperator),
          reEn = new RegExp(this.enOperator),
          // re_an = new RegExp(this.anOperator),
      // re_cr = new RegExp(this.curExp),
      reEm = this.emOperator,
          reNm = this.nmOperator,
          reRe = new RegExp(Object(_string__WEBPACK_IMPORTED_MODULE_2__["rgxEsc"])(this.rgxOperator));
      term = Object(_string__WEBPACK_IMPORTED_MODULE_2__["matchCase"])(term, this.caseSensitive);
      var occurence = false; //Search arg operator tests

      var hasLO = reL.test(term),
          hasLE = reLe.test(term),
          hasGR = reG.test(term),
          hasGE = reGe.test(term),
          hasDF = reD.test(term),
          hasEQ = reEq.test(term),
          hasLK = reLk.test(term),
          // hatermN = re_an.test(term),
      hasST = reSt.test(term),
          hasEN = reEn.test(term),
          hasEM = reEm === term,
          hasNM = reNm === term,
          hasRE = reRe.test(term); // Check for dates or resolve date type

      if (this.hasType(colIdx, [_const__WEBPACK_IMPORTED_MODULE_25__["DATE"]])) {
        var dte1, dte2;
        var dateType = this.Mod.dateType;
        var isValidDate = dateType.isValid.bind(dateType);
        var parseDate = dateType.parse.bind(dateType);
        var locale = dateType.getLocale(colIdx); // Search arg dates tests

        var isLDate = hasLO && isValidDate(term.replace(reL, ''), locale);
        var isLEDate = hasLE && isValidDate(term.replace(reLe, ''), locale);
        var isGDate = hasGR && isValidDate(term.replace(reG, ''), locale);
        var isGEDate = hasGE && isValidDate(term.replace(reGe, ''), locale);
        var isDFDate = hasDF && isValidDate(term.replace(reD, ''), locale);
        var isEQDate = hasEQ && isValidDate(term.replace(reEq, ''), locale);
        dte1 = parseDate(cellValue, locale); // lower equal date

        if (isLEDate) {
          dte2 = parseDate(term.replace(reLe, ''), locale);
          occurence = dte1 <= dte2;
        } // lower date
        else if (isLDate) {
            dte2 = parseDate(term.replace(reL, ''), locale);
            occurence = dte1 < dte2;
          } // greater equal date
          else if (isGEDate) {
              dte2 = parseDate(term.replace(reGe, ''), locale);
              occurence = dte1 >= dte2;
            } // greater date
            else if (isGDate) {
                dte2 = parseDate(term.replace(reG, ''), locale);
                occurence = dte1 > dte2;
              } // different date
              else if (isDFDate) {
                  dte2 = parseDate(term.replace(reD, ''), locale);
                  occurence = dte1.toString() !== dte2.toString();
                } // equal date
                else if (isEQDate) {
                    dte2 = parseDate(term.replace(reEq, ''), locale);
                    occurence = dte1.toString() === dte2.toString();
                  } // searched keyword with * operator doesn't have to be a date
                  else if (reLk.test(term)) {
                      // like date
                      occurence = Object(_string__WEBPACK_IMPORTED_MODULE_2__["contains"])(term.replace(reLk, ''), cellValue, false, this.caseSensitive);
                    } else if (isValidDate(term)) {
                      dte2 = parseDate(term, locale);
                      occurence = dte1.toString() === dte2.toString();
                    } //empty
                    else if (hasEM) {
                        occurence = !cell.hasChildNodes();
                      } //non-empty
                      else if (hasNM) {
                          occurence = cell.hasChildNodes();
                        } else {
                          occurence = Object(_string__WEBPACK_IMPORTED_MODULE_2__["contains"])(term, cellValue, this.isExactMatch(colIdx), this.caseSensitive);
                        }
      } else {
        // Convert to number anyways to auto-resolve type in case not
        // defined by configuration. Order is important first try to
        // parse formatted number then fallback to Number coercion
        // to avoid false positives with Number
        numData = Object(_number__WEBPACK_IMPORTED_MODULE_4__["parse"])(cellValue, decimal) || Number(cellValue); // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},
        // rgx:)
        //regexp

        if (hasRE) {
          //in case regexp throws
          try {
            //operator is removed
            var srchArg = term.replace(reRe, '');
            var rgx = new RegExp(srchArg);
            occurence = rgx.test(cellValue);
          } catch (ex) {
            occurence = false;
          }
        } // lower equal
        else if (hasLE) {
            occurence = numData <= Object(_number__WEBPACK_IMPORTED_MODULE_4__["parse"])(term.replace(reLe, ''), decimal);
          } //greater equal
          else if (hasGE) {
              occurence = numData >= Object(_number__WEBPACK_IMPORTED_MODULE_4__["parse"])(term.replace(reGe, ''), decimal);
            } //lower
            else if (hasLO) {
                occurence = numData < Object(_number__WEBPACK_IMPORTED_MODULE_4__["parse"])(term.replace(reL, ''), decimal);
              } //greater
              else if (hasGR) {
                  occurence = numData > Object(_number__WEBPACK_IMPORTED_MODULE_4__["parse"])(term.replace(reG, ''), decimal);
                } //different
                else if (hasDF) {
                    occurence = Object(_string__WEBPACK_IMPORTED_MODULE_2__["contains"])(term.replace(reD, ''), cellValue, false, this.caseSensitive) ? false : true;
                  } //like
                  else if (hasLK) {
                      occurence = Object(_string__WEBPACK_IMPORTED_MODULE_2__["contains"])(term.replace(reLk, ''), cellValue, false, this.caseSensitive);
                    } //equal
                    else if (hasEQ) {
                        occurence = Object(_string__WEBPACK_IMPORTED_MODULE_2__["contains"])(term.replace(reEq, ''), cellValue, true, this.caseSensitive);
                      } //starts with
                      else if (hasST) {
                          occurence = cellValue.indexOf(term.replace(reSt, '')) === 0 ? true : false;
                        } //ends with
                        else if (hasEN) {
                            var searchArg = term.replace(reEn, '');
                            occurence = cellValue.lastIndexOf(searchArg, cellValue.length - 1) === cellValue.length - 1 - (searchArg.length - 1) && cellValue.lastIndexOf(searchArg, cellValue.length - 1) > -1 ? true : false;
                          } //empty
                          else if (hasEM) {
                              occurence = !cell.hasChildNodes();
                            } //non-empty
                            else if (hasNM) {
                                occurence = cell.hasChildNodes();
                              } else {
                                // If numeric type data, perform a strict equality test and
                                // fallback to unformatted number string comparison
                                if (numData && this.hasType(colIdx, [_const__WEBPACK_IMPORTED_MODULE_25__["NUMBER"], _const__WEBPACK_IMPORTED_MODULE_25__["FORMATTED_NUMBER"]]) && !this.singleFlt) {
                                  // parseNb can return 0 for strings which are not
                                  // formatted numbers, in that case return the original
                                  // string. TODO: handle this in parseNb
                                  term = Object(_number__WEBPACK_IMPORTED_MODULE_4__["parse"])(term, decimal) || term;
                                  occurence = numData === term || Object(_string__WEBPACK_IMPORTED_MODULE_2__["contains"])(term.toString(), numData.toString(), this.isExactMatch(colIdx), this.caseSensitive);
                                } else {
                                  // Finally test search term is contained in cell data
                                  occurence = Object(_string__WEBPACK_IMPORTED_MODULE_2__["contains"])(term, cellValue, this.isExactMatch(colIdx), this.caseSensitive, this.ignoresDiacritics(colIdx));
                                }
                              }
      } //else


      return occurence;
    }
    /**
     * Return the data of a specified column
     * @param {Number} colIndex Column index
     * @param {Boolean} [includeHeaders=false] Include headers row
     * @param {Array} [exclude=[]] List of row indexes to be excluded
     * @return Flat list of data for a column
     */

  }, {
    key: "getColumnData",
    value: function getColumnData(colIndex) {
      var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      return this.getColValues(colIndex, includeHeaders, true, exclude);
    }
    /**
     * Return the values of a specified column
     * @param {Number} colIndex Column index
     * @param {Boolean} [includeHeaders=false] Include headers row
     * @param {Array} [exclude=[]] List of row indexes to be excluded
     * @return Flat list of values for a column
     */

  }, {
    key: "getColumnValues",
    value: function getColumnValues(colIndex) {
      var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      return this.getColValues(colIndex, includeHeaders, false, exclude);
    }
    /**
     * Return the data of a specified column
     * @param  {Number} colIndex Column index
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [typed=false] Return a typed value
     * @param  {Array} [exclude=[]] List of row indexes to be excluded
     * @return {Array}           Flat list of data for a column
     * @private
     */

  }, {
    key: "getColValues",
    value: function getColValues(colIndex) {
      var _this12 = this;

      var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var typed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var exclude = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var colValues = [];
      var getContent = typed ? this.getCellData.bind(this) : this.getCellValue.bind(this);

      if (includeHeaders) {
        colValues.push(this.getHeadersText()[colIndex]);
      }

      var eachRow = this.eachRow();
      eachRow(function (row, i) {
        // checks if current row index appears in exclude array
        var isExludedRow = exclude.indexOf(i) !== -1;
        var cells = row.cells; // checks if row has exact cell # and is not excluded

        if (cells.length === _this12.nbCells && !isExludedRow) {
          var data = getContent(cells[colIndex]);
          colValues.push(data);
        }
      });
      return colValues;
    }
    /**
     * Return the filter's value of a specified column
     * @param  {Number} index Column index
     * @return {String}       Filter value
     */

  }, {
    key: "getFilterValue",
    value: function getFilterValue(index) {
      if (!this.fltGrid) {
        return;
      }

      var fltValue = '';
      var flt = this.getFilterElement(index);

      if (!flt) {
        return fltValue;
      }

      var fltColType = this.getFilterType(index);

      if (fltColType !== _const__WEBPACK_IMPORTED_MODULE_25__["MULTIPLE"] && fltColType !== _const__WEBPACK_IMPORTED_MODULE_25__["CHECKLIST"]) {
        fltValue = flt.value;
      } //mutiple select
      else if (fltColType === _const__WEBPACK_IMPORTED_MODULE_25__["MULTIPLE"]) {
          fltValue = this.feature('dropdown').getValues(index);
        } //checklist
        else if (fltColType === _const__WEBPACK_IMPORTED_MODULE_25__["CHECKLIST"]) {
            fltValue = this.feature('checkList').getValues(index);
          } //return an empty string if collection is empty or contains a single
      //empty string


      if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(fltValue) && fltValue.length === 0 || fltValue.length === 1 && fltValue[0] === '') {
        fltValue = '';
      }

      return fltValue;
    }
    /**
     * Return the filters' values
     * @return {Array} List of filters' values
     */

  }, {
    key: "getFiltersValue",
    value: function getFiltersValue() {
      var _this13 = this;

      if (!this.fltGrid) {
        return;
      }

      var searchArgs = [];
      this.fltIds.forEach(function (id, i) {
        var fltValue = _this13.getFilterValue(i);

        if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(fltValue)) {
          searchArgs.push(fltValue);
        } else {
          searchArgs.push(Object(_string__WEBPACK_IMPORTED_MODULE_2__["trim"])(fltValue));
        }
      });
      return searchArgs;
    }
    /**
     * Return the ID of a specified column's filter
     * @param  {Number} index Column's index
     * @return {String}       ID of the filter element
     */

  }, {
    key: "getFilterId",
    value: function getFilterId(index) {
      if (!this.fltGrid) {
        return;
      }

      return this.fltIds[index];
    }
    /**
     * Return the list of ids of filters matching a specified type.
     * Note: hidden filters are also returned
     *
     * @param  {String} type  Filter type string ('input', 'select', 'multiple',
     *                        'checklist')
     * @param  {Boolean} bool If true returns columns indexes instead of IDs
     * @return {[type]}       List of element IDs or column indexes
     */

  }, {
    key: "getFiltersByType",
    value: function getFiltersByType(type, bool) {
      if (!this.fltGrid) {
        return;
      }

      var arr = [];

      for (var i = 0, len = this.fltIds.length; i < len; i++) {
        var fltType = this.getFilterType(i);

        if (fltType === type.toLowerCase()) {
          var a = bool ? i : this.fltIds[i];
          arr.push(a);
        }
      }

      return arr;
    }
    /**
     * Return the filter's DOM element for a given column
     * @param  {Number} index     Column's index
     * @return {DOMElement}
     */

  }, {
    key: "getFilterElement",
    value: function getFilterElement(index) {
      return Object(_dom__WEBPACK_IMPORTED_MODULE_1__["elm"])(this.fltIds[index]);
    }
    /**
     * Return the number of cells for a given row index
     * @param  {Number} rowIndex Index of the row
     * @return {Number}          Number of cells
     */

  }, {
    key: "getCellsNb",
    value: function getCellsNb() {
      var rowIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var tr = this.dom().rows[rowIndex >= 0 ? rowIndex : 0];
      return tr ? tr.cells.length : 0;
    }
    /**
     * Return the number of working rows starting from reference row if
     * defined
     * @param  {Boolean} includeHeaders Include the headers row(s)
     * @return {Number}                 Number of working rows
     */

  }, {
    key: "getRowsNb",
    value: function getRowsNb(includeHeaders) {
      var nbRows = this.getWorkingRows().length;

      if (this.dom().tHead) {
        return includeHeaders ? nbRows + this.dom().querySelectorAll('thead > tr').length : nbRows;
      }

      return includeHeaders ? nbRows : nbRows - this.refRow;
    }
    /**
     * Return the collection of the working rows, that is, the rows belonging
     * to the tbody section(s)
     * @returns {Array}
     */

  }, {
    key: "getWorkingRows",
    value: function getWorkingRows() {
      return doc.querySelectorAll("table#".concat(this.id, " > tbody > tr"));
    }
    /**
     * Return the text content of a given cell
     * @param {DOMElement} Cell's DOM element
     * @return {String}
     */

  }, {
    key: "getCellValue",
    value: function getCellValue(cell) {
      var idx = cell.cellIndex;
      var cellParser = this.cellParser; // Invoke cellParser for this column if any

      if (cellParser.cols.indexOf(idx) !== -1) {
        return cellParser.parse(this, cell, idx);
      } else {
        return Object(_dom__WEBPACK_IMPORTED_MODULE_1__["getText"])(cell);
      }
    }
    /**
     * Return the typed data of a given cell based on the column type definition
     * @param  {DOMElement} cell Cell's DOM element
     * @return {String|Number|Date}
     */

  }, {
    key: "getCellData",
    value: function getCellData(cell) {
      var colIndex = cell.cellIndex;
      var value = this.getCellValue(cell);

      if (this.hasType(colIndex, [_const__WEBPACK_IMPORTED_MODULE_25__["FORMATTED_NUMBER"]])) {
        return Object(_number__WEBPACK_IMPORTED_MODULE_4__["parse"])(value, this.getDecimal(colIndex));
      } else if (this.hasType(colIndex, [_const__WEBPACK_IMPORTED_MODULE_25__["NUMBER"]])) {
        return Number(value);
      } else if (this.hasType(colIndex, [_const__WEBPACK_IMPORTED_MODULE_25__["DATE"]])) {
        var dateType = this.Mod.dateType;
        return dateType.parse(value, dateType.getLocale(colIndex));
      }

      return value;
    }
    /**
     * Return the table data based on its columns data type definitions
     * with following structure:
     * [
     *     [rowIndex, [data0, data1...]],
     *     [rowIndex, [data0, data1...]]
     * ]
     * @param {Boolean} [includeHeaders=false] Include headers row
     * @param {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @return {Array}
     */

  }, {
    key: "getData",
    value: function getData() {
      var includeHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var excludeHiddenCols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.getTableData(includeHeaders, excludeHiddenCols, true);
    }
    /**
     * Return the table values with following structure:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param {Boolean} [includeHeaders=false] Include headers row
     * @param {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @return {Array}
     */

  }, {
    key: "getValues",
    value: function getValues() {
      var includeHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var excludeHiddenCols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.getTableData(includeHeaders, excludeHiddenCols, false);
    }
    /**
     * Return the table data with following structure:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @param  {Boolean} [typed=false] Return typed value
     * @return {Array}
     * @private
     *
     * TODO: provide an API returning data in JSON format
     */

  }, {
    key: "getTableData",
    value: function getTableData() {
      var _this14 = this;

      var includeHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var excludeHiddenCols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var typed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var tblData = [];
      var getContent = typed ? this.getCellData.bind(this) : this.getCellValue.bind(this);

      if (includeHeaders) {
        var headers = this.getHeadersText(excludeHiddenCols);
        tblData.push([this.getHeadersRowIndex(), headers]);
      }

      var eachRow = this.eachRow();
      eachRow(function (row, k) {
        var rowData = [k, []];
        var cells = row.cells;

        for (var j = 0, len = cells.length; j < len; j++) {
          if (excludeHiddenCols && _this14.hasExtension('colsVisibility')) {
            if (_this14.extension('colsVisibility').isColHidden(j)) {
              continue;
            }
          }

          var cellContent = getContent(cells[j]);
          rowData[1].push(cellContent);
        }

        tblData.push(rowData);
      });
      return tblData;
    }
    /**
     * Return the filtered table data based on its columns data type definitions
     * with following structure:
     * [
     *     [rowIndex, [data0, data1...]],
     *     [rowIndex, [data0, data1...]]
     * ]
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @return {Array}
     *
     * TODO: provide an API returning data in JSON format
     */

  }, {
    key: "getFilteredData",
    value: function getFilteredData() {
      var includeHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var excludeHiddenCols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.filteredData(includeHeaders, excludeHiddenCols, true);
    }
    /**
     * Return the filtered table values with following structure:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @return {Array}
     *
     * TODO: provide an API returning data in JSON format
     */

  }, {
    key: "getFilteredValues",
    value: function getFilteredValues() {
      var includeHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var excludeHiddenCols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.filteredData(includeHeaders, excludeHiddenCols, false);
    }
    /**
     * Return the filtered data with following structure:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @param  {Boolean} [typed=false] Return typed value
     * @return {Array}
     * @private
     *
     * TODO: provide an API returning data in JSON format
     */

  }, {
    key: "filteredData",
    value: function filteredData() {
      var includeHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var excludeHiddenCols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var typed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.validRowsIndex.length === 0) {
        return [];
      }

      var rows = this.dom().rows,
          filteredData = [];
      var getContent = typed ? this.getCellData.bind(this) : this.getCellValue.bind(this);

      if (includeHeaders) {
        var headers = this.getHeadersText(excludeHiddenCols);
        filteredData.push([this.getHeadersRowIndex(), headers]);
      }

      var validRows = this.getValidRows(true);

      for (var i = 0; i < validRows.length; i++) {
        var rData = [this.validRowsIndex[i], []],
            cells = rows[this.validRowsIndex[i]].cells;

        for (var k = 0; k < cells.length; k++) {
          if (excludeHiddenCols && this.hasExtension('colsVisibility')) {
            if (this.extension('colsVisibility').isColHidden(k)) {
              continue;
            }
          }

          var cellValue = getContent(cells[k]);
          rData[1].push(cellValue);
        }

        filteredData.push(rData);
      }

      return filteredData;
    }
    /**
     * Return the filtered data for a given column index
     * @param {any} colIndex Colmun's index
     * @param {boolean} [includeHeaders=false] Optional Include headers row
     * @param {any} [exclude=[]] Optional List of row indexes to be excluded
     * @return {Array} Flat list of typed values [data0, data1, data2...]
     *
     * TODO: provide an API returning data in JSON format
     */

  }, {
    key: "getFilteredColumnData",
    value: function getFilteredColumnData(colIndex) {
      var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      return this.getFilteredDataCol(colIndex, includeHeaders, true, exclude, false);
    }
    /**
     * Return the filtered and visible data for a given column index
     * @param {any} colIndex Colmun's index
     * @param {boolean} [includeHeaders=false] Optional Include headers row
     * @param {any} [exclude=[]] Optional List of row indexes to be excluded
     * @return {Array} Flat list of typed values [data0, data1, data2...]
     *
     * TODO: provide an API returning data in JSON format
     */

  }, {
    key: "getVisibleColumnData",
    value: function getVisibleColumnData(colIndex) {
      var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      return this.getFilteredDataCol(colIndex, includeHeaders, true, exclude, true);
    }
    /**
     * Return the filtered values for a given column index
     * @param {any} colIndex Colmun's index
     * @param {boolean} [includeHeaders=false] Optional Include headers row
     * @param {any} [exclude=[]] Optional List of row indexes to be excluded
     * @return {Array} Flat list of values ['value0', 'value1', 'value2'...]
     *
     * TODO: provide an API returning data in JSON format
     */

  }, {
    key: "getFilteredColumnValues",
    value: function getFilteredColumnValues(colIndex) {
      var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      return this.getFilteredDataCol(colIndex, includeHeaders, false, exclude, false);
    }
    /**
     * Return the filtered and visible values for a given column index
     * @param {any} colIndex Colmun's index
     * @param {boolean} [includeHeaders=false] Optional Include headers row
     * @param {any} [exclude=[]] Optional List of row indexes to be excluded
     * @return {Array} Flat list of values ['value0', 'value1', 'value2'...]
     *
     * TODO: provide an API returning data in JSON format
     */

  }, {
    key: "getVisibleColumnValues",
    value: function getVisibleColumnValues(colIndex) {
      var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      return this.getFilteredDataCol(colIndex, includeHeaders, false, exclude, true);
    }
    /**
     * Return the filtered data for a given column index
     * @param  {Number} colIndex Colmun's index
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [typed=false] Return typed value
     * @param  {Array} [exclude=[]] List of row indexes to be excluded
     * @param  {Boolean} [visible=true] Return only filtered and visible data
     *                           (relevant for paging)
     * @return {Array}           Flat list of values ['val0','val1','val2'...]
     * @private
     *
     * TODO: provide an API returning data in JSON format
     */

  }, {
    key: "getFilteredDataCol",
    value: function getFilteredDataCol(colIndex) {
      var _this15 = this;

      var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var typed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var exclude = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var visible = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isUndef"])(colIndex)) {
        return [];
      }

      var rows = this.dom().rows;
      var getContent = typed ? this.getCellData.bind(this) : this.getCellValue.bind(this); // ensure valid rows index do not contain excluded rows and row is
      // displayed

      var validRows = this.getValidRows(true).filter(function (rowIdx) {
        return exclude.indexOf(rowIdx) === -1 && (visible ? _this15.getRowDisplay(rows[rowIdx]) !== 'none' : true);
      }); // convert column value to expected type if necessary

      var validColValues = validRows.map(function (rowIdx) {
        return getContent(rows[rowIdx].cells[colIndex]);
      });

      if (includeHeaders) {
        validColValues.unshift(this.getHeadersText()[colIndex]);
      }

      return validColValues;
    }
    /**
     * Get the display value of a row
     * @param  {HTMLTableRowElement} row DOM element of the row
     * @return {String}     Usually 'none' or ''
     */

  }, {
    key: "getRowDisplay",
    value: function getRowDisplay(row) {
      return row.style.display;
    }
    /**
     * Validate/invalidate row by setting the 'validRow' attribute on the row
     * @param  {Number}  rowIndex Index of the row
     * @param  {Boolean} isValid
     */

  }, {
    key: "validateRow",
    value: function validateRow(rowIndex, isValid) {
      var row = this.dom().rows[rowIndex];

      if (!row || !Object(_types__WEBPACK_IMPORTED_MODULE_3__["isBoolean"])(isValid)) {
        return;
      } // always visible rows are valid


      if (this.excludeRows.indexOf(rowIndex) !== -1) {
        isValid = true;
      }

      var displayFlag = isValid ? '' : _const__WEBPACK_IMPORTED_MODULE_25__["NONE"],
          validFlag = isValid ? 'true' : 'false';
      row.style.display = displayFlag;

      if (this.paging) {
        row.setAttribute('validRow', validFlag);
      }

      if (isValid) {
        if (this.validRowsIndex.indexOf(rowIndex) === -1) {
          this.validRowsIndex.push(rowIndex);
        }

        this.onRowValidated(this, rowIndex);
        this.emitter.emit('row-validated', this, rowIndex);
      }
    }
    /**
     * Validate all filterable rows
     */

  }, {
    key: "validateAllRows",
    value: function validateAllRows() {
      if (!this.initialized) {
        return;
      }

      this.validRowsIndex = [];

      for (var k = this.refRow; k < this.nbFilterableRows; k++) {
        this.validateRow(k, true);
      }
    }
    /**
     * Set search value to a given filter
     * @param {Number} index     Column's index
     * @param {String or Array} query  searcharg Search term
     */

  }, {
    key: "setFilterValue",
    value: function setFilterValue(index) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (!this.fltGrid) {
        return;
      }

      var slc = this.getFilterElement(index),
          fltColType = this.getFilterType(index);

      if (!slc) {
        return;
      } //multiple selects


      if (fltColType === _const__WEBPACK_IMPORTED_MODULE_25__["MULTIPLE"]) {
        var values = Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(query) ? query : query.split(' ' + this.orOperator + ' ');

        if (this.loadFltOnDemand && !this.initialized) {
          this.emitter.emit('build-select-filter', this, index, this.linkedFilters, this.isExternalFlt());
        }

        this.emitter.emit('select-options', this, index, values);
      } //checklist
      else if (fltColType === _const__WEBPACK_IMPORTED_MODULE_25__["CHECKLIST"]) {
          var _values = [];

          if (this.loadFltOnDemand && !this.initialized) {
            this.emitter.emit('build-checklist-filter', this, index, this.linkedFilters);
          }

          if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(query)) {
            _values = query;
          } else {
            query = Object(_string__WEBPACK_IMPORTED_MODULE_2__["matchCase"])(query, this.caseSensitive);
            _values = query.split(' ' + this.orOperator + ' ');
          }

          this.emitter.emit('select-checklist-options', this, index, _values);
        } else {
          if (this.loadFltOnDemand && !this.initialized) {
            this.emitter.emit('build-select-filter', this, index, this.linkedFilters, this.isExternalFlt());
          }

          slc.value = query;
        }
    }
    /**
     * Make passed or default working table element width fixed
     * @param {TableElement} tbl optional table DOM element
     */

  }, {
    key: "setFixedLayout",
    value: function setFixedLayout() {
      var tbl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dom();
      var colWidths = this.colWidths;
      var tableWidth = tbl.clientWidth;

      if (colWidths.length > 0) {
        var defaultWidth = this.defaultColWidth;
        tableWidth = colWidths.reduce(function (x, y) {
          return parseInt(x || defaultWidth, 10) + parseInt(y || defaultWidth, 10);
        });
      }

      tbl.style.width = "".concat(tableWidth, "px");
      tbl.style.tableLayout = 'fixed';
    }
    /**
     * Set passed or default working table columns' widths with configuration
     * values
     * @param {TableElement} tbl optional table DOM element
     */

  }, {
    key: "setColWidths",
    value: function setColWidths() {
      var tbl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dom();
      var colWidths = this.colWidths;

      if (colWidths.length === 0) {
        return;
      }

      var colTags = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(tbl, 'col');
      var tblHasColTag = colTags.length > 0;
      var frag = !tblHasColTag ? doc.createDocumentFragment() : null;
      this.eachCol(function (k) {
        var col;

        if (tblHasColTag) {
          col = colTags[k];
        } else {
          col = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('col');
          frag.appendChild(col);
        }

        col.style.width = colWidths[k];
      });

      if (!tblHasColTag) {
        tbl.insertBefore(frag, tbl.firstChild);
      }
    }
    /**
     * Exclude rows from actions
     */

  }, {
    key: "setExcludeRows",
    value: function setExcludeRows() {
      var _this16 = this;

      if (!this.hasExcludedRows) {
        return;
      }

      this.excludeRows.forEach(function (rowIdx) {
        return _this16.validateRow(rowIdx, true);
      });
    }
    /**
     * Clear all the filters' values
     */

  }, {
    key: "clearFilters",
    value: function clearFilters() {
      if (!this.fltGrid) {
        return;
      }

      this.emitter.emit('before-clearing-filters', this);
      this.onBeforeReset(this, this.getFiltersValue());

      for (var i = 0, len = this.fltIds.length; i < len; i++) {
        this.setFilterValue(i, '');
      }

      this.filter();
      this.onAfterReset(this);
      this.emitter.emit('after-clearing-filters', this);
    }
    /**
     * Return the ID of the current active filter
     * @return {String}
     */

  }, {
    key: "getActiveFilterId",
    value: function getActiveFilterId() {
      return this.activeFilterId;
    }
    /**
     * Set the ID of the current active filter
     * @param {String} filterId Element ID
     */

  }, {
    key: "setActiveFilterId",
    value: function setActiveFilterId(filterId) {
      this.activeFilterId = filterId;
    }
    /**
     * Return the column index for a given filter ID
     * @param {string} [filterId=''] Filter ID
     * @return {Number} Column index
     */

  }, {
    key: "getColumnIndexFromFilterId",
    value: function getColumnIndexFromFilterId() {
      var filterId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var idx = filterId.split('_')[0];
      idx = idx.split(this.prfxFlt)[1];
      return parseInt(idx, 10);
    }
    /**
     * Build filter element ID for a given column index
     * @param {any} colIndex
     * @return {String} Filter element ID string
     * @private
     */

  }, {
    key: "buildFilterId",
    value: function buildFilterId(colIndex) {
      return "".concat(this.prfxFlt).concat(colIndex, "_").concat(this.id);
    }
    /**
     * Check if has external filters
     * @returns {Boolean}
     * @private
     */

  }, {
    key: "isExternalFlt",
    value: function isExternalFlt() {
      return this.externalFltIds.length > 0;
    }
    /**
     * Returns styles path
     * @returns {String}
     * @private
     */

  }, {
    key: "getStylePath",
    value: function getStylePath() {
      return Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(this.config.style_path, this.basePath + 'style/');
    }
    /**
     * Returns main stylesheet path
     * @returns {String}
     * @private
     */

  }, {
    key: "getStylesheetPath",
    value: function getStylesheetPath() {
      return Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(this.config.stylesheet, this.getStylePath() + 'tablefilter.css');
    }
    /**
     * Returns themes path
     * @returns {String}
     * @private
     */

  }, {
    key: "getThemesPath",
    value: function getThemesPath() {
      return Object(_settings__WEBPACK_IMPORTED_MODULE_5__["defaultsStr"])(this.config.themes_path, this.getStylePath() + 'themes/');
    }
    /**
     * Make specified column's filter active
     * @param colIndex Index of a column
     */

  }, {
    key: "activateFilter",
    value: function activateFilter(colIndex) {
      if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isUndef"])(colIndex)) {
        return;
      }

      this.setActiveFilterId(this.getFilterId(colIndex));
    }
    /**
     * Determine if passed filter column implements exact query match
     * @param  {Number}  colIndex   Column index
     * @return {Boolean}
     */

  }, {
    key: "isExactMatch",
    value: function isExactMatch(colIndex) {
      var fltType = this.getFilterType(colIndex);
      return this.exactMatchByCol[colIndex] || this.exactMatch || fltType !== _const__WEBPACK_IMPORTED_MODULE_25__["INPUT"];
    }
    /**
     * Check if passed row is valid
     * @param {Number} rowIndex Row index
     * @return {Boolean}
     */

  }, {
    key: "isRowValid",
    value: function isRowValid(rowIndex) {
      return this.getValidRows().indexOf(rowIndex) !== -1;
    }
    /**
     * Check if passed row is visible
     * @param {Number} rowIndex Row index
     * @return {Boolean}
     */

  }, {
    key: "isRowDisplayed",
    value: function isRowDisplayed(rowIndex) {
      var row = this.dom().rows[rowIndex];
      return this.getRowDisplay(row) === '';
    }
    /**
     * Check if specified column filter ignores diacritics.
     * Note this is only applicable to input filter types.
     * @param {Number} colIndex    Column index
     * @return {Boolean}
     */

  }, {
    key: "ignoresDiacritics",
    value: function ignoresDiacritics(colIndex) {
      var ignoreDiac = this.ignoreDiacritics;

      if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(ignoreDiac)) {
        return ignoreDiac[colIndex];
      }

      return Boolean(ignoreDiac);
    }
    /**
     * Return clear all text for specified filter column
     * @param {Number} colIndex    Column index
     * @return {String}
     */

  }, {
    key: "getClearFilterText",
    value: function getClearFilterText(colIndex) {
      var clearText = this.clearFilterText;

      if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isArray"])(clearText)) {
        return clearText[colIndex];
      }

      return clearText;
    }
    /**
     * Column iterator invoking continue and break condition callbacks if any
     * then calling supplied callback for each item
     * @param {Function} [fn=EMPTY_FN] callback
     * @param {Function} [continueFn=EMPTY_FN] continue condition callback
     * @param {Function} [breakFn=EMPTY_FN] break condition callback
     */

  }, {
    key: "eachCol",
    value: function eachCol() {
      var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"];
      var continueFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"];
      var breakFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"];
      var len = this.getCellsNb(this.refRow);

      for (var i = 0; i < len; i++) {
        if (continueFn(i) === true) {
          continue;
        }

        if (breakFn(i) === true) {
          break;
        }

        fn(i);
      }
    }
    /**
     * Rows iterator starting from supplied row index or defaulting to reference
     * row index. Closure function accepts a callback function and optional
     * continue and break callbacks.
     * @param {Number} startIdx Row index from which filtering starts
     */

  }, {
    key: "eachRow",
    value: function eachRow() {
      var _this17 = this;

      var startIdx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.refRow;
      return function () {
        var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"];
        var continueFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"];
        var breakFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _types__WEBPACK_IMPORTED_MODULE_3__["EMPTY_FN"];

        var rows = _this17.dom().rows;

        var len = _this17.getRowsNb(true);

        for (var i = startIdx; i < len; i++) {
          if (continueFn(rows[i], i) === true) {
            continue;
          }

          if (breakFn(rows[i], i) === true) {
            break;
          }

          fn(rows[i], i);
        }
      };
    }
    /**
     * Check if passed script or stylesheet is already imported
     * @param  {String}  filePath Ressource path
     * @param  {String}  type     Possible values: 'script' or 'link'
     * @return {Boolean}
     */

  }, {
    key: "isImported",
    value: function isImported(filePath) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'script';
      var imported = false,
          attr = type === 'script' ? 'src' : 'href',
          files = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(doc, type);

      for (var i = 0, len = files.length; i < len; i++) {
        if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isUndef"])(files[i][attr])) {
          continue;
        }

        if (files[i][attr].match(filePath)) {
          imported = true;
          break;
        }
      }

      return imported;
    }
    /**
     * Import script or stylesheet
     * @param  {String}   fileId   Ressource ID
     * @param  {String}   filePath Ressource path
     * @param  {Function} callback Callback
     * @param  {String}   type     Possible values: 'script' or 'link'
     */

  }, {
    key: "import",
    value: function _import(fileId, filePath, callback) {
      var _this18 = this;

      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'script';

      if (this.isImported(filePath, type)) {
        return;
      }

      var o = this,
          isLoaded = false,
          file,
          head = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(doc, 'head')[0];

      if (type.toLowerCase() === 'link') {
        file = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('link', ['id', fileId], ['type', 'text/css'], ['rel', 'stylesheet'], ['href', filePath]);
      } else {
        file = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["createElm"])('script', ['id', fileId], ['type', 'text/javascript'], ['src', filePath]);
      } //Browser <> IE onload event works only for scripts, not for stylesheets


      file.onload = file.onreadystatechange = function () {
        if (!isLoaded && (!_this18.readyState || _this18.readyState === 'loaded' || _this18.readyState === 'complete')) {
          isLoaded = true;

          if (typeof callback === 'function') {
            callback.call(null, o);
          }
        }
      };

      file.onerror = function () {
        throw new Error("TableFilter could not load: ".concat(filePath));
      };

      head.appendChild(file);
    }
    /**
     * Check if table has filters grid
     * @return {Boolean}
     */

  }, {
    key: "isInitialized",
    value: function isInitialized() {
      return this.initialized;
    }
    /**
     * Get list of filter IDs
     * @return {Array} List of filters ids
     */

  }, {
    key: "getFiltersId",
    value: function getFiltersId() {
      return this.fltIds || [];
    }
    /**
     * Get filtered (valid) rows indexes
     * @param  {Boolean} reCalc Force calculation of filtered rows list
     * @return {Array}          List of row indexes
     */

  }, {
    key: "getValidRows",
    value: function getValidRows(reCalc) {
      var _this19 = this;

      if (!reCalc) {
        return this.validRowsIndex;
      }

      this.validRowsIndex = [];
      var eachRow = this.eachRow();
      eachRow(function (row) {
        if (!_this19.paging) {
          if (_this19.getRowDisplay(row) !== _const__WEBPACK_IMPORTED_MODULE_25__["NONE"]) {
            _this19.validRowsIndex.push(row.rowIndex);
          }
        } else {
          if (row.getAttribute('validRow') === 'true' || row.getAttribute('validRow') === null) {
            _this19.validRowsIndex.push(row.rowIndex);
          }
        }
      });
      return this.validRowsIndex;
    }
    /**
     * Get the index of the row containing the filters
     * @return {Number}
     */

  }, {
    key: "getFiltersRowIndex",
    value: function getFiltersRowIndex() {
      return this.filtersRowIndex;
    }
    /**
     * Get the index of the headers row
     * @return {Number}
     */

  }, {
    key: "getHeadersRowIndex",
    value: function getHeadersRowIndex() {
      return this.headersRow;
    }
    /**
     * Get the row index from where the filtering process start (1st filterable
     * row)
     * @return {Number}
     */

  }, {
    key: "getStartRowIndex",
    value: function getStartRowIndex() {
      return this.refRow;
    }
    /**
     * Get the index of the last row
     * @return {Number}
     */

  }, {
    key: "getLastRowIndex",
    value: function getLastRowIndex() {
      var nbRows = this.getRowsNb(true);
      return nbRows - 1;
    }
    /**
     * Determine whether the specified column has one of the passed types
     * @param {Number} colIndex Column index
     * @param {Array} [types=[]] List of column types
     * @return {Boolean}
     */

  }, {
    key: "hasType",
    value: function hasType(colIndex) {
      var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (this.colTypes.length === 0) {
        return false;
      }

      var colType = this.colTypes[colIndex];

      if (Object(_types__WEBPACK_IMPORTED_MODULE_3__["isObj"])(colType)) {
        colType = colType.type;
      }

      return types.indexOf(colType) !== -1;
    }
    /**
     * Get the header DOM element for a given column index
     * @param  {Number} colIndex Column index
     * @return {Element}
     */

  }, {
    key: "getHeaderElement",
    value: function getHeaderElement(colIndex) {
      var table = this.gridLayout ? this.Mod.gridLayout.headTbl : this.dom();
      var tHead = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["tag"])(table, 'thead');
      var rowIdx = this.getHeadersRowIndex();
      var header;

      if (tHead.length === 0) {
        header = table.rows[rowIdx].cells[colIndex];
      }

      if (tHead.length === 1) {
        header = tHead[0].rows[rowIdx].cells[colIndex];
      }

      return header;
    }
    /**
     * Return the list of headers' text
     * @param  {Boolean} excludeHiddenCols  Optional: exclude hidden columns
     * @return {Array} list of headers' text
     */

  }, {
    key: "getHeadersText",
    value: function getHeadersText() {
      var _this20 = this;

      var excludeHiddenCols = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var headers = [];
      this.eachCol(function (j) {
        var header = _this20.getHeaderElement(j);

        var headerText = Object(_dom__WEBPACK_IMPORTED_MODULE_1__["getFirstTextNode"])(header);
        headers.push(headerText);
      }, // continue condition function
      function (j) {
        if (excludeHiddenCols && _this20.hasExtension('colsVisibility')) {
          return _this20.extension('colsVisibility').isColHidden(j);
        }

        return false;
      });
      return headers;
    }
    /**
     * Return the filter type for a specified column
     * @param  {Number} colIndex Column's index
     * @return {String}
     */

  }, {
    key: "getFilterType",
    value: function getFilterType(colIndex) {
      return this.filterTypes[colIndex];
    }
    /**
     * Get the total number of filterable rows
     * @return {Number}
     */

  }, {
    key: "getFilterableRowsNb",
    value: function getFilterableRowsNb() {
      return this.getRowsNb(false);
    }
    /**
     * Return the total number of valid rows
     * @param {Boolean} [reCalc=false] Forces calculation of filtered rows
     * @return {Number}
     */

  }, {
    key: "getValidRowsNb",
    value: function getValidRowsNb() {
      var reCalc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this.getValidRows(reCalc).length;
    }
    /**
     * Return the working DOM element
     * @return {HTMLTableElement}
     */

  }, {
    key: "dom",
    value: function dom() {
      return this.tbl;
    }
    /**
     * Return the decimal separator for supplied column as per column type
     * configuration or global setting
     * @param {Number} colIndex Column index
     * @returns {String} '.' or ','
     */

  }, {
    key: "getDecimal",
    value: function getDecimal(colIndex) {
      var decimal = this.decimalSeparator;

      if (this.hasType(colIndex, [_const__WEBPACK_IMPORTED_MODULE_25__["FORMATTED_NUMBER"]])) {
        var colType = this.colTypes[colIndex];

        if (colType.hasOwnProperty('decimal')) {
          decimal = colType.decimal;
        }
      }

      return decimal;
    }
    /**
     * Get the configuration object (literal object)
     * @return {Object}
     */

  }, {
    key: "config",
    value: function config() {
      return this.cfg;
    }
  }]);

  return TableFilter;
}();

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/*! exports provided: EMPTY_FN, isObj, isFn, isArray, isString, isNumber, isBoolean, isUndef, isNull, isEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_FN", function() { return EMPTY_FN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObj", function() { return isObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFn", function() { return isFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndef", function() { return isUndef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return isNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/**
 * Types utilities
 */
var UNDEFINED = void 0;
/**
 * Return an empty function
 * @return {Function}
 */

var EMPTY_FN = function EMPTY_FN() {};
/**
 * Check passed argument is an object
 * @param  {Object}  obj
 * @return {Boolean}
 */

var isObj = function isObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
/**
 * Check passed argument is a function
 * @param  {Function} obj
 * @return {Boolean}
 */

var isFn = function isFn(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};
/**
 * Check passed argument is an array
 * @param  {Array}  obj
 * @return {Boolean}
 */

var isArray = function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
/**
 * Check passed argument is a string
 * @param {String} obj obj
 * @returns {Boolean}
 */

var isString = function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
};
/**
 * Check passed argument is a number
 * @param {Number} obj
 * @returns {Boolean}
 */

var isNumber = function isNumber(obj) {
  return Object.prototype.toString.call(obj) === '[object Number]';
};
/**
 * Check passed argument is a boolean
 * @param {Boolean} obj
 * @returns {Boolean}
 */

var isBoolean = function isBoolean(obj) {
  return Object.prototype.toString.call(obj) === '[object Boolean]';
};
/**
 * Check passed argument is undefined
 * @param  {Any}  obj
 * @return {Boolean}
 */

var isUndef = function isUndef(obj) {
  return obj === UNDEFINED;
};
/**
 * Check passed argument is null
 * @param  {Any}  obj
 * @return {Boolean}
 */

var isNull = function isNull(obj) {
  return obj === null;
};
/**
 * Check passed argument is empty (undefined, null or empty string)
 * @param  {Any}  obj
 * @return {Boolean}
 */

var isEmpty = function isEmpty(obj) {
  return isUndef(obj) || isNull(obj) || obj.length === 0;
};

/***/ })

/******/ });
});
//# sourceMappingURL=tablefilter.js.map