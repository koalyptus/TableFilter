<<<<<<< HEAD
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
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
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
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
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "tf-" + ({}[chunkId]||chunkId) + "-" + {"0":"274dfa7999625931f0bf"}[chunkId] + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 108);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
 *  Sugar v2.0.4
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

  // The global context. Rhino uses a different "global" keyword so
  // do an extra check to be sure that it's actually the global context.
  var globalContext = typeof global !== 'undefined' && global.Object === Object ? global : this;

  // Is the environment node?
  var hasExports = typeof module !== 'undefined' && module.exports;

  // Whether object instance methods can be mapped to the prototype.
  var allowObjectPrototype = false;

  // A map from Array to SugarArray.
  var namespacesByName = {};

  // A map from [object Object] to namespace.
  var namespacesByClassString = {};

  // Defining properties.
  var defineProperty = PROPERTY_DESCRIPTOR_SUPPORT ?  Object.defineProperty : definePropertyShim;

  // A default chainable class for unknown types.
  var DefaultChainable = getNewChainableClass('Chainable');


  // Global methods

  function setupGlobal() {
    Sugar = globalContext[SUGAR_GLOBAL];
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
    if (hasExports) {
      module.exports = Sugar;
    } else {
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
     *        name and function as two arguments.
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
     *        object.
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
      var raw = this.raw, sugarNamespace, fn;
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

      fn = new sugarNamespace(raw)[methodName];

      if (fn.disambiguate) {
        // If the method about to be called on this chainable is
        // itself a disambiguation method, then throw an error to
        // prevent infinite recursion.
        throw new TypeError('Cannot resolve namespace for ' + raw);
      }

      return fn.apply(this, arguments);
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

}).call(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildNumberUnitMethods = __webpack_require__(183);

buildNumberUnitMethods();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildDateUnitMethods = __webpack_require__(268);

buildDateUnitMethods();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Types utilities
 */

var UNDEFINED = void 0;

/**
 * Return an empty function
 * @return {Function}
 */
var EMPTY_FN = exports.EMPTY_FN = function EMPTY_FN() {};

/**
 * Check passed argument is an object
 * @param  {Object}  obj
 * @return {Boolean}
 */
var isObj = exports.isObj = function isObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

/**
 * Check passed argument is a function
 * @param  {Function} obj
 * @return {Boolean}
 */
var isFn = exports.isFn = function isFn(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};

/**
 * Check passed argument is an array
 * @param  {Array}  obj
 * @return {Boolean}
 */
var isArray = exports.isArray = function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

/**
 * Check passed argument is a string
 * @param {String} obj obj
 * @returns {Boolean}
 */
var isString = exports.isString = function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
};

/**
 * Check passed argument is a number
 * @param {Number} obj
 * @returns {Boolean}
 */
var isNumber = exports.isNumber = function isNumber(obj) {
  return Object.prototype.toString.call(obj) === '[object Number]';
};

/**
 * Check passed argument is a boolean
 * @param {Boolean} obj
 * @returns {Boolean}
 */
var isBoolean = exports.isBoolean = function isBoolean(obj) {
  return Object.prototype.toString.call(obj) === '[object Boolean]';
};

/**
 * Check passed argument is undefined
 * @param  {Any}  obj
 * @return {Boolean}
 */
var isUndef = exports.isUndef = function isUndef(obj) {
  return obj === UNDEFINED;
};

/**
 * Check passed argument is null
 * @param  {Any}  obj
 * @return {Boolean}
 */
var isNull = exports.isNull = function isNull(obj) {
  return obj === null;
};

/**
 * Check passed argument is empty (undefined, null or empty string)
 * @param  {Any}  obj
 * @return {Boolean}
 */
var isEmpty = exports.isEmpty = function isEmpty(obj) {
  return isUndef(obj) || isNull(obj) || obj.length === 0;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    LocaleHelpers = __webpack_require__(8);

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'addLocale': function(code, set) {
    return localeManager.add(code, set);
  }

});

module.exports = Sugar.Date.addLocale;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NATIVE_TYPES = __webpack_require__(143),
    forEach = __webpack_require__(27),
    isClass = __webpack_require__(77),
    spaceSplit = __webpack_require__(45),
    isPlainObject = __webpack_require__(144),
    coreUtilityAliases = __webpack_require__(12);

var classToString = coreUtilityAliases.classToString;

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
    if (globalObject && isClass(new globalObject, 'Object')) {
      return getConstructorClassCheck(globalObject);
    } else {
      return getToStringClassCheck(className);
    }
  }

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
    className = className || classToString(obj);
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultsFn = exports.defaultsArr = exports.defaultsNb = exports.defaultsStr = exports.defaultsBool = undefined;

var _types = __webpack_require__(3);

/** Configuration settings helpers  */

/**
 * If passed value is not of boolean type return the default value
 * otherwise return the value itself
 * @param  {Boolean|Any}  value
 * @param  {Boolean} default value
 * @return {Boolean|Any}
 */
var defaultsBool = exports.defaultsBool = function defaultsBool(val, defaultVal) {
  return (0, _types.isBoolean)(val) ? val : defaultVal;
};

/**
 * If passed value is not of string type return the default value
 * otherwise return the value itself
 * @param  {String|Any}  value
 * @param  {String} default value
 * @return {String|Any}
 */
var defaultsStr = exports.defaultsStr = function defaultsStr(val, defaultVal) {
  return (0, _types.isString)(val) ? val : defaultVal;
};

/**
 * If passed value is not of number type return the default value
 * otherwise return the value itself
 * @param  {Number|Any}  value
 * @param  {Number} default value
 * @return {Number|Any}
 */
var defaultsNb = exports.defaultsNb = function defaultsNb(val, defaultVal) {
  return isNaN(val) ? defaultVal : val;
};

/**
 * If passed value is not of array type return the default value
 * otherwise return the value itself
 * @param  {Array|Any}  value
 * @param  {Array} default value
 * @return {Array|Any}
 */
var defaultsArr = exports.defaultsArr = function defaultsArr(val, defaultVal) {
  return (0, _types.isArray)(val) ? val : defaultVal;
};

/**
 * If passed value is not of function type return the default value
 * otherwise return the value itself
 * @param  {Function|Any}  value
 * @param  {Function} default value
 * @return {Function|Any}
 */
var defaultsFn = exports.defaultsFn = function defaultsFn(val, defaultVal) {
  return (0, _types.isFn)(val) ? val : defaultVal;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LazyLoadedLocales = __webpack_require__(131),
    AmericanEnglishDefinition = __webpack_require__(73),
    getNewLocale = __webpack_require__(135);

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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tag = exports.elm = exports.createCheckItem = exports.createOpt = exports.removeClass = exports.addClass = exports.hasClass = exports.createText = exports.removeElm = exports.createElm = exports.getFirstTextNode = exports.getText = undefined;

var _root = __webpack_require__(16);

var _types = __webpack_require__(3);

var _string = __webpack_require__(21);

/**
 * DOM utilities
 */

var doc = _root.root.document;

/**
 * Returns text + text of children of given node
 * @param  {NodeElement} node
 * @return {String}
 */
var getText = exports.getText = function getText(node) {
    if ((0, _types.isUndef)(node.textContent)) {
        return (0, _string.trim)(node.innerText);
    }
    return (0, _string.trim)(node.textContent);
};

/**
 * Returns the first text node contained in the supplied node
 * @param  {NodeElement} node node
 * @return {String}
 */
var getFirstTextNode = exports.getFirstTextNode = function getFirstTextNode(node) {
    for (var i = 0; i < node.childNodes.length; i++) {
        var n = node.childNodes[i];
        if (n.nodeType === 3) {
            return n.data;
        }
    }
};

/**
 * Creates an html element with given collection of attributes
 * @param  {String} tag a string of the html tag to create
 * @param  {Array} an undetermined number of arrays containing the with 2
 *                    items, the attribute name and its value ['id','myId']
 * @return {Object}     created element
 */
var createElm = exports.createElm = function createElm() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var tag = args[0];
    if (!(0, _types.isString)(tag)) {
        return null;
    }

    var el = doc.createElement(tag);
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];

        if ((0, _types.isArray)(arg) && arg.length === 2) {
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
var removeElm = exports.removeElm = function removeElm(node) {
    return node.parentNode.removeChild(node);
};

/**
 * Returns a text node with given text
 * @param  {String} txt
 * @return {Object}
 */
var createText = exports.createText = function createText(txt) {
    return doc.createTextNode(txt);
};

/**
 * Determine whether the passed elements is assigned the given class
 * @param {DOMElement} ele DOM element
 * @param {String} cls CSS class name
 * @returns {Boolean}
 */
var hasClass = exports.hasClass = function hasClass(ele, cls) {
    if ((0, _types.isUndef)(ele)) {
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
var addClass = exports.addClass = function addClass(ele, cls) {
    if ((0, _types.isUndef)(ele)) {
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
var removeClass = exports.removeClass = function removeClass(ele, cls) {
    if ((0, _types.isUndef)(ele)) {
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
var createOpt = exports.createOpt = function createOpt(text, value, isSel) {
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
 * @return {Object}           li DOM element
 */
var createCheckItem = exports.createCheckItem = function createCheckItem(id, chkValue, labelText) {
    var li = createElm('li');
    var label = createElm('label', ['for', id]);
    var check = createElm('input', ['id', id], ['name', id], ['type', 'checkbox'], ['value', chkValue]);
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
var elm = exports.elm = function elm(id) {
    return doc.getElementById(id);
};

/**
 * Returns list of element matching the supplied tag name
 * @param  {String} tagname  Tag name
 * @return {NodeList}
 */
var tag = exports.tag = function tag(o, tagname) {
    return o.getElementsByTagName(tagname);
};

// HTML5 classList API
function supportsClassList() {
    return doc.documentElement.classList;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOT_IMPLEMENTED = 'Not implemented.';

/**
 * Base class defining the interface of a TableFilter feature
 */

var Feature = exports.Feature = function () {
  /**
   * Creates an instance of Feature
   * @param {Object} tf TableFilter instance
   * @param {String} feature Feature name known by TableFilter
   */
  function Feature(tf, feature) {
    var _this = this;

    _classCallCheck(this, Feature);

    /**
     * TableFilter instance
     * @type {TableFilter}
     */
    this.tf = tf;

    /**
     * Feature name
     * @type {String}
     */
    this.feature = feature;

    /**
     * TableFilter feature setting
     * @type {Boolean}
     */
    this.enabled = tf[feature];

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
    key: 'init',
    value: function init() {
      throw new Error(NOT_IMPLEMENTED);
    }

    /**
     * Reset the feature after being disabled
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.enable();
      this.init();
    }

    /**
     * Destroy the feature
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      throw new Error(NOT_IMPLEMENTED);
    }

    /**
     * Enable the feature
     */

  }, {
    key: 'enable',
    value: function enable() {
      this.enabled = true;
    }

    /**
     * Disable the feature
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.enabled = false;
    }

    /**
     * Indicate whether the feature is enabled or not
     * @returns {Boolean}
     */

  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return this.enabled === true;
    }
  }]);

  return Feature;
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildRelativeAliases = __webpack_require__(323);

buildRelativeAliases();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cloneRangeMember = __webpack_require__(101);

function Range(start, end) {
  this.start = cloneRangeMember(start);
  this.end   = cloneRangeMember(end);
}

module.exports = Range;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FEATURES = exports.AUTO_FILTER_DELAY = exports.IP_ADDRESS = exports.DATE = exports.FORMATTED_NUMBER = exports.NUMBER = exports.STRING = exports.CELL_TAG = exports.HEADER_TAG = exports.DOWN_ARROW_KEY = exports.UP_ARROW_KEY = exports.ESC_KEY = exports.TAB_KEY = exports.ENTER_KEY = exports.NONE = exports.CHECKLIST = exports.MULTIPLE = exports.SELECT = exports.INPUT = undefined;

var _dateType = __webpack_require__(111);

var _help = __webpack_require__(112);

var _state = __webpack_require__(113);

var _gridLayout = __webpack_require__(117);

var _loader = __webpack_require__(118);

var _highlightKeywords = __webpack_require__(119);

var _popupFilter = __webpack_require__(120);

var _markActiveColumns = __webpack_require__(121);

var _rowsCounter = __webpack_require__(122);

var _statusBar = __webpack_require__(123);

var _clearButton = __webpack_require__(124);

var _alternateRows = __webpack_require__(125);

var _noResults = __webpack_require__(126);

var _paging = __webpack_require__(127);

var _toolbar = __webpack_require__(33);

/**
 * Filter types
 */

/**
 * Input filter type
 * @type {String}
 */
var INPUT = exports.INPUT = 'input';
/**
 * Select filter type
 * @type {String}
 */
var SELECT = exports.SELECT = 'select';
/**
 * Multiple select filter type
 * @type {String}
 */
var MULTIPLE = exports.MULTIPLE = 'multiple';
/**
 * Checklist filter type
 * @type {String}
 */
var CHECKLIST = exports.CHECKLIST = 'checklist';
/**
 * None filter type
 * @type {String}
 */
var NONE = exports.NONE = 'none';

/**
 * Key codes
 */

/**
 * Enter key code
 * @type {Number}
 */
var ENTER_KEY = exports.ENTER_KEY = 13;
/**
 * Tab key code
 * @type {Number}
 */
var TAB_KEY = exports.TAB_KEY = 9;
/**
 * Escape key code
 * @type {Number}
 */
var ESC_KEY = exports.ESC_KEY = 27;
/**
 * Up arrow key code
 * @type {Number}
 */
var UP_ARROW_KEY = exports.UP_ARROW_KEY = 38;
/**
 * Down arrow key code
 * @type {Number}
 */
var DOWN_ARROW_KEY = exports.DOWN_ARROW_KEY = 40;

/**
 * HTML tags
 */

/**
 * Header cell tag
 * @type {String}
 */
var HEADER_TAG = exports.HEADER_TAG = 'TH';
/**
 * Cell tag
 * @type {String}
 */
var CELL_TAG = exports.CELL_TAG = 'TD';

/**
 * Data types
 */

/**
 * String
 * @type {String}
 */
var STRING = exports.STRING = 'string';

/**
 * Number
 * @type {String}
 */
var NUMBER = exports.NUMBER = 'number';

/**
 * Formatted number
 * @type {String}
 */
var FORMATTED_NUMBER = exports.FORMATTED_NUMBER = 'formatted-number';

/**
 * Date
 * @type {String}
 */
var DATE = exports.DATE = 'date';

/**
 * IP address
 * @type {String}
 */
var IP_ADDRESS = exports.IP_ADDRESS = 'ipaddress';

/**
 * Default values
 */

/**
 * Auto filter delay in milliseconds
 * @type {Number}
 */
var AUTO_FILTER_DELAY = exports.AUTO_FILTER_DELAY = 750;

/**
 * TableFilter features definitions
 * @type {Object}
 */
var FEATURES = exports.FEATURES = {
  dateType: {
    class: _dateType.DateType,
    name: 'dateType'
  },
  help: {
    class: _help.Help,
    name: 'help',
    enforce: true
  },
  state: {
    class: _state.State,
    name: 'state'
  },
  markActiveColumns: {
    class: _markActiveColumns.MarkActiveColumns,
    name: 'markActiveColumns'
  },
  gridLayout: {
    class: _gridLayout.GridLayout,
    name: 'gridLayout'
  },
  loader: {
    class: _loader.Loader,
    name: 'loader'
  },
  highlightKeyword: {
    class: _highlightKeywords.HighlightKeyword,
    name: 'highlightKeyword',
    property: 'highlightKeywords'
  },
  popupFilter: {
    class: _popupFilter.PopupFilter,
    name: 'popupFilter',
    property: 'popupFilters'
  },
  rowsCounter: {
    class: _rowsCounter.RowsCounter,
    name: 'rowsCounter'
  },
  statusBar: {
    class: _statusBar.StatusBar,
    name: 'statusBar'
  },
  clearButton: {
    class: _clearButton.ClearButton,
    name: 'clearButton',
    property: 'btnReset'
  },
  alternateRows: {
    class: _alternateRows.AlternateRows,
    name: 'alternateRows'
  },
  noResults: {
    class: _noResults.NoResults,
    name: 'noResults'
  },
  paging: {
    class: _paging.Paging,
    name: 'paging'
  },
  toolbar: {
    class: _toolbar.Toolbar,
    name: 'toolbar',
    enforce: true
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Export window or global object depending on the environment
 */
var root = exports.root = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global.global === global && global || undefined;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(12);

var forEachProperty = coreUtilityAliases.forEachProperty;

function defineOnPrototype(ctor, methods) {
  var proto = ctor.prototype;
  forEachProperty(methods, function(val, key) {
    proto[key] = val;
  });
}

module.exports = defineOnPrototype;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utc = __webpack_require__(22);

function callDateGet(d, method) {
  return d['get' + (_utc(d) ? 'UTC' : '') + method]();
}

module.exports = callDateGet;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.keyCode = exports.targetEvt = exports.cancelEvt = exports.stopEvt = exports.removeEvt = exports.addEvt = undefined;

var _root = __webpack_require__(16);

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
var addEvt = exports.addEvt = function addEvt(obj, type, func, capture) {
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
var removeEvt = exports.removeEvt = function removeEvt(obj, type, func, capture) {
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
var stopEvt = exports.stopEvt = function stopEvt(evt) {
    if (!evt) {
        evt = _root.root.event;
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
var cancelEvt = exports.cancelEvt = function cancelEvt(evt) {
    if (!evt) {
        evt = _root.root.event;
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
var targetEvt = exports.targetEvt = function targetEvt(evt) {
    if (!evt) {
        evt = _root.root.event;
    }
    return evt.target || evt.srcElement;
};

/**
 * Returns the Unicode value of pressed key
 *
 * @param {Event} evt Event on the DOM
 * @returns {Number}
 */
var keyCode = exports.keyCode = function keyCode(evt) {
    return evt.charCode ? evt.charCode : evt.keyCode ? evt.keyCode : evt.which ? evt.which : 0;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateGet = __webpack_require__(18);

function getWeekday(d) {
  return callDateGet(d, 'Day');
}

module.exports = getWeekday;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.contains = exports.matchCase = exports.rgxEsc = exports.isEmpty = exports.trim = undefined;

var _diacritics = __webpack_require__(129);

/**
 * String utilities
 */

/**
 * Removes whitespace from both sides of passed string
 * @param  {String} text
 * @return {String}
 */
var trim = exports.trim = function trim(text) {
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
var isEmpty = exports.isEmpty = function isEmpty(text) {
    return trim(text) === '';
};

/**
 * Makes regex safe string by escaping special characters from passed string
 * @param {String} text
 * @return {String} escaped string
 */
var rgxEsc = exports.rgxEsc = function rgxEsc(text) {
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
var matchCase = exports.matchCase = function matchCase(text) {
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
var contains = exports.contains = function contains(term, data) {
    var exactMatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var caseSensitive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var ignoreDiacritics = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // Improved by Cedric Wartel (cwl) automatic exact match for selects and
    // special characters are now filtered
    var regexp = void 0;
    var modifier = caseSensitive ? 'g' : 'gi';
    if (ignoreDiacritics) {
        term = (0, _diacritics.remove)(term);
        data = (0, _diacritics.remove)(data);
    }
    if (exactMatch) {
        regexp = new RegExp('(^\\s*)' + rgxEsc(term) + '(\\s*$)', modifier);
    } else {
        regexp = new RegExp(rgxEsc(term), modifier);
    }
    return regexp.test(data);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var privatePropertyAccessor = __webpack_require__(149);

module.exports = privatePropertyAccessor('utc');

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mathAliases = __webpack_require__(9);

var ceil = mathAliases.ceil,
    floor = mathAliases.floor;

var trunc = Math.trunc || function(n) {
  if (n === 0 || !isFinite(n)) return n;
  return n < 0 ? ceil(n) : floor(n);
};

module.exports = trunc;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setDate = __webpack_require__(36),
    getDate = __webpack_require__(37),
    getWeekday = __webpack_require__(20),
    classChecks = __webpack_require__(5),
    mathAliases = __webpack_require__(9);

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildDateRangeUnits = __webpack_require__(399);

buildDateRangeUnits();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var iterateOverSparseArray = __webpack_require__(139);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isDefined(o) {
  return o !== undefined;
}

module.exports = isDefined;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDaysInMonth = __webpack_require__(79);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateGet = __webpack_require__(18);

function getYear(d) {
  return callDateGet(d, 'FullYear');
}

module.exports = getYear;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateGet = __webpack_require__(18);

function getMonth(d) {
  return callDateGet(d, 'Month');
}

module.exports = getMonth;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getExtendedDate = __webpack_require__(59);

function createDate(d, options, forceClone) {
  return getExtendedDate(null, d, options, forceClone).date;
}

module.exports = createDate;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.Toolbar = exports.CENTER = exports.RIGHT = exports.LEFT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _settings = __webpack_require__(7);

var _types = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVENTS = ['initializing-feature', 'initializing-extension'];

/** Left position in toolbar */
var LEFT = exports.LEFT = 'left';
/** Right position in toolbar */
var RIGHT = exports.RIGHT = 'right';
/** Center position in toolbar */
var CENTER = exports.CENTER = 'center';

/**
 * Toolbar UI component
 * @export
 * @class Toolbar
 * @extends {Feature}
 */

var Toolbar = exports.Toolbar = function (_Feature) {
        _inherits(Toolbar, _Feature);

        /**
         * Create an instance of Toolbar
         * @param {TableFilter} tf TableFilter instance
         * @memberof Toolbar
         */
        function Toolbar(tf) {
                _classCallCheck(this, Toolbar);

                // Configuration object
                var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, tf, 'toolbar'));

                var f = _this.config.toolbar || {};

                /**
                 * Css class for toolbar's container DOM element
                 * @type {String}
                 */
                _this.contCssClass = (0, _settings.defaultsStr)(f.container_css_class, 'inf');

                /**
                 * Css class for left-side inner container DOM element
                 * @type {String}
                 */
                _this.lContCssClass = (0, _settings.defaultsStr)(f.left_cont_css_class, 'ldiv');

                /**
                 * Css class for right-side inner container DOM element
                 * @type {String}
                 */
                _this.rContCssClass = (0, _settings.defaultsStr)(f.right_cont_css_class, 'rdiv');

                /**
                 * Css class for middle inner container DOM element
                 * @type {String}
                 */
                _this.cContCssClass = (0, _settings.defaultsStr)(f.center_cont_css_class, 'mdiv');

                /**
                 * Toolbar's custom container ID
                 * @type {String}
                 */
                _this.tgtId = (0, _settings.defaultsStr)(f.target_id, null);

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
                key: 'init',
                value: function init(isExternal) {
                        if (this.initialized || isExternal) {
                                return;
                        }

                        var tf = this.tf;

                        // default container
                        var container = (0, _dom.createElm)('div');
                        container.className = this.contCssClass;

                        // custom container
                        if (this.tgtId) {
                                (0, _dom.elm)(this.tgtId).appendChild(container);
                        }
                        // grid-layout
                        else if (tf.gridLayout) {
                                        var gridLayout = tf.Mod.gridLayout;
                                        gridLayout.tblMainCont.appendChild(container);
                                        container.className = gridLayout.infDivCssClass;
                                }
                                // default location: just above the table
                                else {
                                                var cont = (0, _dom.createElm)('caption');
                                                cont.appendChild(container);
                                                tf.dom().insertBefore(cont, tf.dom().firstChild);
                                        }
                        this.cont = container;

                        // left container
                        this.lCont = this.createContainer(container, this.lContCssClass);

                        // right container
                        this.rCont = this.createContainer(container, this.rContCssClass);

                        // middle container
                        this.cCont = this.createContainer(container, this.cContCssClass);

                        this.innerCont = {
                                left: this.lCont,
                                center: this.cCont,
                                right: this.rCont
                        };

                        /** @inherited */
                        this.initialized = true;

                        // emit help initialisation only if undefined
                        if ((0, _types.isUndef)(tf.help)) {
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
                key: 'container',
                value: function container() {
                        var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RIGHT;
                        var el = arguments[1];

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
                key: 'createContainer',
                value: function createContainer(container, css) {
                        var div = (0, _dom.createElm)('div', ['class', css]);
                        container.appendChild(div);
                        return div;
                }

                /**
                 * Destroy Toolbar instance
                 */

        }, {
                key: 'destroy',
                value: function destroy() {
                        if (!this.initialized) {
                                return;
                        }

                        var tf = this.tf;

                        (0, _dom.removeElm)(this.cont);
                        this.cont = null;

                        var tbl = tf.dom();
                        var captions = (0, _dom.tag)(tbl, 'caption');
                        [].forEach.call(captions, function (el) {
                                return (0, _dom.removeElm)(el);
                        });

                        /** @inherited */
                        this.initialized = false;
                }
        }]);

        return Toolbar;
}(_feature.Feature);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isDefined = __webpack_require__(28),
    classChecks = __webpack_require__(5),
    callDateSet = __webpack_require__(35),
    walkUnitDown = __webpack_require__(85);

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utc = __webpack_require__(22),
    callDateGet = __webpack_require__(18);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateSet = __webpack_require__(35);

function setDate(d, val) {
  callDateSet(d, 'Date', val);
}

module.exports = setDate;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateGet = __webpack_require__(18);

function getDate(d) {
  return callDateGet(d, 'Date');
}

module.exports = getDate;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utc = __webpack_require__(22);

function cloneDate(d) {
  // Rhino environments have a bug where new Date(d) truncates
  // milliseconds so need to call getTime() here.
  var clone = new Date(d.getTime());
  _utc(clone, !!_utc(d));
  return clone;
}

module.exports = cloneDate;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isUndefined(o) {
  return o === undefined;
}

module.exports = isUndefined;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(6);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dateOptions = __webpack_require__(60);

function getNewDate() {
  return _dateOptions('newDateInternal')();
}

module.exports = getNewDate;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var updateDate = __webpack_require__(47);

function advanceDate(d, unit, num, reset) {
  var set = {};
  set[unit] = num;
  return updateDate(d, set, reset, 1);
}

module.exports = advanceDate;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var simpleMerge = __webpack_require__(55);

function simpleClone(obj) {
  return simpleMerge({}, obj);
}

module.exports = simpleClone;

/***/ }),
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function spaceSplit(str) {
  return str.split(' ');
}

module.exports = spaceSplit;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function tzOffset(d) {
  return d.getTimezoneOffset();
}

module.exports = tzOffset;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(29),
    DateUnitIndexes = __webpack_require__(6),
    trunc = __webpack_require__(23),
    setDate = __webpack_require__(36),
    getDate = __webpack_require__(37),
    getMonth = __webpack_require__(31),
    getNewDate = __webpack_require__(41),
    setWeekday = __webpack_require__(24),
    mathAliases = __webpack_require__(9),
    callDateGet = __webpack_require__(18),
    classChecks = __webpack_require__(5),
    resetLowerUnits = __webpack_require__(162),
    getLowerUnitIndex = __webpack_require__(40),
    getHigherUnitIndex = __webpack_require__(163),
    callDateSetWithWeek = __webpack_require__(164),
    iterateOverDateParams = __webpack_require__(48);

var DAY_INDEX = DateUnitIndexes.DAY_INDEX,
    WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX,
    YEAR_INDEX = DateUnitIndexes.YEAR_INDEX,
    round = mathAliases.round,
    isNumber = classChecks.isNumber;

function updateDate(d, params, reset, advance, prefer, weekdayDir) {
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
      case -1: return d > getNewDate();
      case  1: return d < getNewDate();
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(6),
    isDefined = __webpack_require__(28),
    getDateParam = __webpack_require__(167),
    iterateOverDateUnits = __webpack_require__(58);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(8),
    DateUnitIndexes = __webpack_require__(6),
    moveToEndOfWeek = __webpack_require__(89),
    getLowerUnitIndex = __webpack_require__(40),
    setUnitAndLowerToEdge = __webpack_require__(34);

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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(8),
    DateUnitIndexes = __webpack_require__(6),
    getLowerUnitIndex = __webpack_require__(40),
    moveToBeginningOfWeek = __webpack_require__(61),
    setUnitAndLowerToEdge = __webpack_require__(34);

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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var methodDefineAliases = __webpack_require__(184),
    collectSimilarMethods = __webpack_require__(186);

var defineInstance = methodDefineAliases.defineInstance;

function defineInstanceSimilar(sugarNamespace, set, fn, flags) {
  defineInstance(sugarNamespace, collectSimilarMethods(set, fn), flags);
}

module.exports = defineInstanceSimilar;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dateIsValid(d) {
  return !isNaN(d.getTime());
}

module.exports = dateIsValid;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValidRangeMember = __webpack_require__(400);

function rangeIsValid(range) {
  return isValidRangeMember(range.start) &&
         isValidRangeMember(range.end) &&
         typeof range.start === typeof range.end;
}

module.exports = rangeIsValid;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EnglishLocaleBaseDefinition = __webpack_require__(133),
    simpleMerge = __webpack_require__(55),
    simpleClone = __webpack_require__(43);

function getEnglishVariant(v) {
  return simpleMerge(simpleClone(EnglishLocaleBaseDefinition), v);
}

module.exports = getEnglishVariant;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(12);

var forEachProperty = coreUtilityAliases.forEachProperty;

function simpleMerge(target, source) {
  forEachProperty(source, function(val, key) {
    target[key] = val;
  });
  return target;
}

module.exports = simpleMerge;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  ISO_FIRST_DAY_OF_WEEK: 1,
  ISO_FIRST_DAY_OF_WEEK_YEAR: 4
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isObjectType(obj, type) {
  return !!obj && (type || typeof obj) === 'object';
}

module.exports = isObjectType;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(29),
    DateUnitIndexes = __webpack_require__(6),
    isUndefined = __webpack_require__(39);

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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MINUTES = __webpack_require__(83),
    ParsingTokens = __webpack_require__(74),
    LocaleHelpers = __webpack_require__(8),
    DateUnitIndexes = __webpack_require__(6),
    _utc = __webpack_require__(22),
    trunc = __webpack_require__(23),
    forEach = __webpack_require__(27),
    tzOffset = __webpack_require__(46),
    resetTime = __webpack_require__(84),
    isDefined = __webpack_require__(28),
    setWeekday = __webpack_require__(24),
    updateDate = __webpack_require__(47),
    getNewDate = __webpack_require__(41),
    isUndefined = __webpack_require__(39),
    classChecks = __webpack_require__(5),
    advanceDate = __webpack_require__(42),
    simpleClone = __webpack_require__(43),
    isObjectType = __webpack_require__(57),
    moveToEndOfUnit = __webpack_require__(49),
    deleteDateParam = __webpack_require__(169),
    coreUtilityAliases = __webpack_require__(12),
    getParsingTokenValue = __webpack_require__(170),
    moveToBeginningOfUnit = __webpack_require__(50),
    iterateOverDateParams = __webpack_require__(48),
    getYearFromAbbreviation = __webpack_require__(171),
    iterateOverHigherDateParams = __webpack_require__(172);

var isNumber = classChecks.isNumber,
    isString = classChecks.isString,
    isDate = classChecks.isDate,
    hasOwn = coreUtilityAliases.hasOwn,
    getOwn = coreUtilityAliases.getOwn,
    English = LocaleHelpers.English,
    localeManager = LocaleHelpers.localeManager,
    DAY_INDEX = DateUnitIndexes.DAY_INDEX,
    WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX,
    YEAR_INDEX = DateUnitIndexes.YEAR_INDEX;

function getExtendedDate(contextDate, d, opt, forceClone) {

  var date, set, loc, options, afterCallbacks, relative, weekdayDir;

  afterCallbacks = [];
  options = getDateOptions(opt);

  function getDateOptions(opt) {
    var options = isString(opt) ? { locale: opt } : opt || {};
    options.prefer = +!!getOwn(options, 'future') - +!!getOwn(options, 'past');
    return options;
  }

  function getFormatParams(match, dif) {
    var set = getOwn(options, 'params') || {};
    forEach(dif.to, function(field, i) {
      var str = match[i + 1], token, val;
      if (!str) return;
      if (field === 'yy' || field === 'y') {
        field = 'year';
        val = getYearFromAbbreviation(str, date, getOwn(options, 'prefer'));
      } else if (token = getOwn(ParsingTokens, field)) {
        field = token.param || field;
        val = getParsingTokenValue(token, str);
      } else {
        val = loc.getTokenValue(field, str);
      }
      set[field] = val;
    });
    return set;
  }

  // Clone date will set the utc flag, but it will
  // be overriden later, so set option flags instead.
  function cloneDateByFlag(d, clone) {
    if (_utc(d) && !isDefined(getOwn(options, 'fromUTC'))) {
      options.fromUTC = true;
    }
    if (_utc(d) && !isDefined(getOwn(options, 'setUTC'))) {
      options.setUTC = true;
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
    loc = localeManager.get(getOwn(options, 'locale'));

    for (var i = 0, dif, match; dif = loc.compiledFormats[i]; i++) {
      match = str.match(dif.reg);
      if (match) {

        // Note that caching the format will modify the compiledFormats array
        // which is not a good idea to do inside its for loop, however we
        // know at this point that we have a matched format and that we will
        // break out below, so simpler to do it here.
        loc.cacheFormat(dif, i);

        set = getFormatParams(match, dif);

        if (isDefined(set.timestamp)) {
          str = set.timestamp;
          set = null;
          break;
        }

        if (isDefined(set.ampm)) {
          handleAmpm(set.ampm);
        }

        if (set.utc || isDefined(set.tzHour)) {
          handleTimezoneOffset(set.tzHour, set.tzMinute, set.tzSign);
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

        if (set.yearSign) {
          set.year *= set.yearSign;
        }

        break;
      }
    }

    if (!set) {
      // Fall back to native parsing
      date = new Date(str);
      if (getOwn(options, 'fromUTC')) {
        // Falling back to system date here which cannot be parsed as UTC,
        // so if we're forcing UTC then simply add the offset.
        date.setTime(date.getTime() + (tzOffset(date) * MINUTES));
      }
    } else if (relative) {
      updateDate(date, set, false, 1);
    } else {
      if (_utc(date)) {
        // UTC times can traverse into other days or even months,
        // so preemtively reset the time here to prevent this.
        resetTime(date);
      }
      updateDate(date, set, true, 0, getOwn(options, 'prefer'), weekdayDir);
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

  function handleTimezoneOffset(tzHour, tzMinute, tzSign) {
    // Adjust for timezone offset
    _utc(date, true);
    var offset = (tzSign || 1) * ((tzHour || 0) * 60 + (tzMinute || 0));
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
    var num = isDefined(set.num) ? set.num : 1;

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
        moveToBeginningOfUnit(date, edgeIndex, getOwn(options, 'locale'));
      } else if (edge > 0) {
        if (edge === 1) {
          stopIndex = DAY_INDEX;
          moveToBeginningOfUnit(date, DAY_INDEX);
        }
        moveToEndOfUnit(date, edgeIndex, getOwn(options, 'locale'), stopIndex);
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
        updateDate(date, params, true, false, getOwn(options, 'prefer'), weekdayDir);
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

  _utc(date, getOwn(options, 'fromUTC'));

  if (isString(d)) {
    date = parseStringDate(d);
  } else if (isDate(d)) {
    date = cloneDateByFlag(d, hasOwn(options, 'clone') || forceClone);
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
  _utc(date, !!getOwn(options, 'setUTC'));
  return {
    set: set,
    date: date
  };
}

module.exports = getExtendedDate;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DATE_OPTIONS = __webpack_require__(158),
    namespaceAliases = __webpack_require__(25),
    defineOptionsAccessor = __webpack_require__(160);

var sugarDate = namespaceAliases.sugarDate;

module.exports = defineOptionsAccessor(sugarDate, DATE_OPTIONS);

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setWeekday = __webpack_require__(24),
    getWeekday = __webpack_require__(20),
    mathAliases = __webpack_require__(9);

var floor = mathAliases.floor;

function moveToBeginningOfWeek(d, firstDayOfWeek) {
  setWeekday(d, floor((getWeekday(d) - firstDayOfWeek) / 7) * 7 + firstDayOfWeek);
  return d;
}

module.exports = moveToBeginningOfWeek;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function simpleCapitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = simpleCapitalize;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trunc = __webpack_require__(23),
    cloneDate = __webpack_require__(38),
    advanceDate = __webpack_require__(42);

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
  // as a starting point, then iterate until we pass the target date.
  if (unit.ambiguous) {
    d1 = cloneDate(d1);
    if (num) {
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mathAliases = __webpack_require__(9),
    repeatString = __webpack_require__(299);

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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ISODefaults = __webpack_require__(56),
    setDate = __webpack_require__(36),
    getDate = __webpack_require__(37),
    cloneDate = __webpack_require__(38),
    isUndefined = __webpack_require__(39),
    moveToEndOfWeek = __webpack_require__(89),
    moveToBeginningOfWeek = __webpack_require__(61),
    moveToFirstDayOfWeekYear = __webpack_require__(87);

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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 'year|month|week|day|hour|minute|second|millisecond';

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(5),
    rangeIsValid = __webpack_require__(53),
    incrementDate = __webpack_require__(104),
    incrementNumber = __webpack_require__(402),
    incrementString = __webpack_require__(403),
    getGreaterPrecision = __webpack_require__(404),
    getDateIncrementObject = __webpack_require__(106);

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parse = undefined;

var _types = __webpack_require__(3);

/**
 * Takes a string, removes all formatting/cruft and returns the raw float value
 * @param {String} Formatted number
 * @param {String} Decimal type '.' or ','
 * @return {Number} Unformatted number
 *
 * https://github.com/openexchangerates/accounting.js/blob/master/accounting.js
 */
var parse = exports.parse = function parse(value) {
    var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

    // Return the value as-is if it's already a number
    if ((0, _types.isNumber)(value)) {
        return value;
    }

    // Build regex to strip out everything except digits, decimal point and
    // minus sign
    var regex = new RegExp('[^0-9-' + decimal + ']', ['g']);
    var unformatted = parseFloat(('' + value).
    // replace bracketed values with negatives
    replace(/\((.*)\)/, '-$1')
    // strip out any cruft
    .replace(regex, '')
    // make sure decimal point is standard
    .replace(decimal, '.'));

    // This will fail silently
    return !isNaN(unformatted) ? unformatted : 0;
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseDropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _sort = __webpack_require__(107);

var _types = __webpack_require__(3);

var _const = __webpack_require__(15);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Base class for Dropdown and CheckList UI components
 * @export
 * @class BaseDropdown
 * @extends {Feature}
 */
var BaseDropdown = exports.BaseDropdown = function (_Feature) {
    _inherits(BaseDropdown, _Feature);

    /**
     * Creates an instance of BaseDropdown
     * @param {TableFilter} tf
     */
    function BaseDropdown(tf) {
        _classCallCheck(this, BaseDropdown);

        var _this = _possibleConstructorReturn(this, (BaseDropdown.__proto__ || Object.getPrototypeOf(BaseDropdown)).call(this, tf, 'baseDropdown'));

        var f = _this.config;

        /**
         * Filter options custom sorter on a column basis
         * @type {Object}
         */
        _this.customSorter = (0, _types.isObj)(f.filter_options_sorter) && (0, _types.isArray)(f.filter_options_sorter.col) && (0, _types.isArray)(f.filter_options_sorter.comparer) ? f.filter_options_sorter : null;

        // TODO: move here all properties shared by Dropdown CheckList

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
        key: 'sortOptions',
        value: function sortOptions(colIndex) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var tf = this.tf;

            if (tf.isCustomOptions(colIndex) || !tf.sortSlc || (0, _types.isArray)(tf.sortSlc) && tf.sortSlc.indexOf(colIndex) === -1) {
                return options;
            }

            var caseSensitive = tf.caseSensitive,
                sortNumDesc = tf.sortNumDesc;

            var compareFn = void 0;

            if (this.customSorter && this.customSorter.col.indexOf(colIndex) !== -1) {
                var idx = this.customSorter.col.indexOf(colIndex);
                compareFn = this.customSorter.comparer[idx];
            } else if (tf.hasType(colIndex, [_const.NUMBER, _const.FORMATTED_NUMBER])) {
                var decimal = tf.getDecimal(colIndex);
                var comparer = _sort.numSortAsc;
                if (sortNumDesc === true || sortNumDesc.indexOf(colIndex) !== -1) {
                    comparer = _sort.numSortDesc;
                }
                compareFn = (0, _sort.sortNumberStr)(comparer, decimal);
            } else if (tf.hasType(colIndex, [_const.DATE])) {
                var locale = tf.feature('dateType').getLocale(colIndex);
                var _comparer = _sort.dateSortAsc;
                compareFn = (0, _sort.sortDateStr)(_comparer, locale);
            } else {
                // string
                compareFn = caseSensitive ? undefined : _sort.ignoreCase;
            }

            return options.sort(compareFn);
        }

        /**
         * Regenerate filters of specified columns and maintain selection if any
         * @param {Array} colIndexes Collection of column indexes
         * @private
         */

    }, {
        key: 'refreshFilters',
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
        key: 'isValidLinkedValue',
        value: function isValidLinkedValue(rowIdx, activeFilterIdx) {
            var tf = this.tf;

            if (tf.disableExcludedOptions) {
                return true;
            }

            if (tf.paging) {
                if (!(0, _types.isEmpty)(activeFilterIdx) && tf.isRowValid(rowIdx)) {
                    return true;
                }
            } else {
                if (tf.isRowDisplayed(rowIdx)) {
                    return true;
                }
            }

            return false;
        }
    }]);

    return BaseDropdown;
}(_feature.Feature);

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.has = undefined;

var _string = __webpack_require__(21);

/**
 * Checks if given item can be found in the passed collection
 * @param  {Array} arr  collection
 * @param  {Any} val  item to search
 * @param  {Boolean} caseSensitive respects case if true
 * @return {Boolean}
 */
var has = exports.has = function has(arr, val, caseSensitive) {
    var sCase = Boolean(caseSensitive);
    for (var i = 0, l = arr.length; i < l; i++) {
        if ((0, _string.matchCase)(arr[i].toString(), sCase) === val) {
            return true;
        }
    }
    return false;
}; /**
    * Array utilities
    */

/***/ }),
/* 71 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(130);
__webpack_require__(387);

module.exports = __webpack_require__(0);

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getEnglishVariant = __webpack_require__(54);

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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ParsingTokens = {
  'yyyy': {
    param: 'year',
    src: '\\d{4}'
  },
  'MM': {
    param: 'month',
    src: '[01]?\\d'
  },
  'dd': {
    param: 'date',
    src: '[0123]?\\d'
  },
  'hh': {
    param: 'hour',
    src: '[0-2]?\\d'
  },
  'mm': {
    param: 'minute',
    src: '[0-5]\\d'
  },
  'ss': {
    param: 'second',
    src: '[0-5]\\d(?:[,.]\\d+)?'
  },
  'yy': {
    param: 'year',
    src: '\\d{2}'
  },
  'y': {
    param: 'year',
    src: '\\d'
  },
  'yearSign': {
    src: '[+-]',
    sign: true
  },
  'tzHour': {
    src: '[0-1]\\d'
  },
  'tzMinute': {
    src: '[0-5]\\d'
  },
  'tzSign': {
    src: '[+−-]',
    sign: true
  },
  'ihh': {
    param: 'hour',
    src: '[0-2]?\\d(?:[,.]\\d+)?'
  },
  'imm': {
    param: 'minute',
    src: '[0-5]\\d(?:[,.]\\d+)?'
  },
  'GMT': {
    param: 'utc',
    src: 'GMT',
    val: 1
  },
  'Z': {
    param: 'utc',
    src: 'Z',
    val: 1
  },
  'timestamp': {
    src: '\\d+'
  }
};

module.exports = ParsingTokens;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocalizedParsingTokens = {
  'year': {
    base: 'yyyy',
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
/* 76 */
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(12);

var classToString = coreUtilityAliases.classToString;

function isClass(obj, className, str) {
  if (!str) {
    str = classToString(obj);
  }
  return str === '[object '+ className +']';
}

module.exports = isClass;

/***/ }),
/* 78 */
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getYear = __webpack_require__(30),
    getMonth = __webpack_require__(31),
    callDateGet = __webpack_require__(18);

function getDaysInMonth(d) {
  return 32 - callDateGet(new Date(getYear(d), getMonth(d), 32), 'Date');
}

module.exports = getDaysInMonth;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = String.fromCharCode;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mathAliases = __webpack_require__(9);

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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mathAliases = __webpack_require__(9),
    iterateOverDateUnits = __webpack_require__(58);

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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 60 * 1000;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(6),
    setUnitAndLowerToEdge = __webpack_require__(34);

var HOURS_INDEX = DateUnitIndexes.HOURS_INDEX;

function resetTime(d) {
  return setUnitAndLowerToEdge(d, HOURS_INDEX);
}

module.exports = resetTime;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(29),
    getLowerUnitIndex = __webpack_require__(40);

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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ISODefaults = __webpack_require__(56),
    getDate = __webpack_require__(37),
    setDate = __webpack_require__(36),
    setYear = __webpack_require__(165),
    getYear = __webpack_require__(30),
    getMonth = __webpack_require__(31),
    setMonth = __webpack_require__(166),
    cloneDate = __webpack_require__(38),
    getWeekday = __webpack_require__(20),
    setWeekday = __webpack_require__(24),
    classChecks = __webpack_require__(5),
    moveToFirstDayOfWeekYear = __webpack_require__(87);

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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(6),
    setDate = __webpack_require__(36),
    setUnitAndLowerToEdge = __webpack_require__(34),
    moveToBeginningOfWeek = __webpack_require__(61);

var MONTH_INDEX = DateUnitIndexes.MONTH_INDEX;

function moveToFirstDayOfWeekYear(d, firstDayOfWeek, firstDayOfWeekYear) {
  setUnitAndLowerToEdge(d, MONTH_INDEX);
  setDate(d, firstDayOfWeekYear);
  moveToBeginningOfWeek(d, firstDayOfWeek);
}

module.exports = moveToFirstDayOfWeekYear;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getOwnKey = __webpack_require__(168);

function getDateParamKey(params, key) {
  return getOwnKey(params, key) ||
         getOwnKey(params, key + 's') ||
         (key === 'day' && getOwnKey(params, 'date'));
}

module.exports = getDateParamKey;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setWeekday = __webpack_require__(24),
    getWeekday = __webpack_require__(20),
    mathAliases = __webpack_require__(9);

var ceil = mathAliases.ceil;

function moveToEndOfWeek(d, firstDayOfWeek) {
  var target = firstDayOfWeek - 1;
  setWeekday(d, ceil((getWeekday(d) - target) / 7) * 7 + target);
  return d;
}

module.exports = moveToEndOfWeek;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MINUTES = __webpack_require__(83),
    DateUnits = __webpack_require__(29),
    DateUnitIndexes = __webpack_require__(6),
    _utc = __webpack_require__(22),
    tzOffset = __webpack_require__(46),
    cloneDate = __webpack_require__(38),
    isDefined = __webpack_require__(28),
    advanceDate = __webpack_require__(42),
    dateIsValid = __webpack_require__(52),
    moveToEndOfUnit = __webpack_require__(49),
    getExtendedDate = __webpack_require__(59),
    moveToBeginningOfUnit = __webpack_require__(50);

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
  if (timezoneShift) {
    min -= timezoneShift;
    max -= timezoneShift;
  }
  return t >= (min - loMargin) && t <= (max + hiMargin);
}

module.exports = compareDate;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getExtendedDate = __webpack_require__(59);

function createDateWithContext(contextDate, d, options, forceClone) {
  return getExtendedDate(contextDate, d, options, forceClone).date;
}

module.exports = createDateWithContext;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var updateDate = __webpack_require__(47),
    collectDateArguments = __webpack_require__(93);

function advanceDateWithArgs(d, args, dir) {
  args = collectDateArguments(args, true);
  return updateDate(d, args[0], args[1], dir);
}

module.exports = advanceDateWithArgs;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(5),
    simpleClone = __webpack_require__(43),
    isObjectType = __webpack_require__(57),
    getDateParamsFromString = __webpack_require__(277),
    collectDateParamsFromArguments = __webpack_require__(278);

var isNumber = classChecks.isNumber,
    isString = classChecks.isString;

function collectDateArguments(args, allowDuration) {
  var arg1 = args[0], arg2 = args[1];
  if (allowDuration && isString(arg1)) {
    arg1 = getDateParamsFromString(arg1);
  } else if (isNumber(arg1) && isNumber(arg2)) {
    arg1 = collectDateParamsFromArguments(args);
    arg2 = null;
  } else {
    if (isObjectType(arg1)) {
      arg1 = simpleClone(arg1);
    }
  }
  return [arg1, arg2];
}

module.exports = collectDateArguments;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CoreOutputFormats = __webpack_require__(95),
    formattingTokens = __webpack_require__(296),
    assertDateIsValid = __webpack_require__(98);

var dateFormatMatcher = formattingTokens.dateFormatMatcher;

function dateFormat(d, format, localeCode) {
  assertDateIsValid(d);
  format = CoreOutputFormats[format] || format || '{long}';
  return dateFormatMatcher(format, d, localeCode);
}

module.exports = dateFormat;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CoreOutputFormats = {
  'ISO8601': '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{SSS}{Z}',
  'RFC1123': '{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {ZZ}',
  'RFC1036': '{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {ZZ}'
};

module.exports = CoreOutputFormats;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateGet = __webpack_require__(18);

function getHours(d) {
  return callDateGet(d, 'Hours');
}

module.exports = getHours;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utc = __webpack_require__(22),
    trunc = __webpack_require__(23),
    tzOffset = __webpack_require__(46),
    padNumber = __webpack_require__(64),
    mathAliases = __webpack_require__(9);

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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dateIsValid = __webpack_require__(52);

function assertDateIsValid(d) {
  if (!dateIsValid(d)) {
    throw new TypeError('Date is not valid');
  }
}

module.exports = assertDateIsValid;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(8),
    trim = __webpack_require__(317),
    getMonth = __webpack_require__(31),
    isDefined = __webpack_require__(28),
    getNewDate = __webpack_require__(41),
    compareDay = __webpack_require__(318),
    getWeekday = __webpack_require__(20),
    dateIsValid = __webpack_require__(52),
    classChecks = __webpack_require__(5),
    compareDate = __webpack_require__(90);

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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(8),
    dateFormat = __webpack_require__(94),
    classChecks = __webpack_require__(5),
    assertDateIsValid = __webpack_require__(98),
    getAdjustedUnitForDate = __webpack_require__(364);

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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(5),
    getRangeMemberPrimitiveValue = __webpack_require__(102);

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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(5);

var isDate = classChecks.isDate;

function getRangeMemberPrimitiveValue(m) {
  if (m == null) return m;
  return isDate(m) ? m.getTime() : m.valueOf();
}

module.exports = getRangeMemberPrimitiveValue;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(5),
    namespaceAliases = __webpack_require__(25);

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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MULTIPLIERS = __webpack_require__(105),
    callDateSet = __webpack_require__(35),
    callDateGet = __webpack_require__(18);

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
/* 105 */
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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DURATION_REG = __webpack_require__(393),
    classChecks = __webpack_require__(5),
    simpleCapitalize = __webpack_require__(62);

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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortDateStr = exports.sortNumberStr = exports.dateSortDesc = exports.dateSortAsc = exports.numSortDesc = exports.numSortAsc = exports.ignoreCase = undefined;

var _number = __webpack_require__(68);

var _sugarDate = __webpack_require__(72);

/** Sorting utilities */

/**
 * Case insensitive compare function for passed strings
 * @param  {String} First string
 * @param  {String} Second string
 * @return {Number} -1 if first string lower than second one
 *                  0 if first string same order as second one
 *                  1 if first string greater than second one
 */
var ignoreCase = exports.ignoreCase = function ignoreCase(a, b) {
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
var numSortAsc = exports.numSortAsc = function numSortAsc(a, b) {
  return a - b;
};

/**
 * Compare function for sorting passed numbers in descending manner
 * @param {Number} First number
 * @param {Number} Second number
 * @return {Number} Negative, zero or positive number
 */
var numSortDesc = exports.numSortDesc = function numSortDesc(a, b) {
  return b - a;
};

/**
 * Compare function for sorting passed dates in ascending manner according to
 * the corresponding UTC numeric value (returned by getTime)
 * @param {Date} First date object
 * @param {Date} Second date object
 * @return {Number} Negative, zero or positive number
 */
var dateSortAsc = exports.dateSortAsc = function dateSortAsc(date1, date2) {
  return date1.getTime() - date2.getTime();
};

/**
 * Compare function for sorting passed dates in descending manner according to
 * the corresponding UTC numeric value (returned by getTime)
 * @param {Date} First date object
 * @param {Date} Second date object
 * @return {Number} Negative, zero or positive number
 */
var dateSortDesc = exports.dateSortDesc = function dateSortDesc(date1, date2) {
  return date2.getTime() - date1.getTime();
};

/**
 * Curried compare function for sorting passed formatted numbers in desired
 * fashion according to supplied compare function and decimal separator
 * @param {Function} Compare function
 * @param {String} [decimal=','] Decimal separator
 * @return {Function} Compare function receiving parsed numeric arguments
 */
var sortNumberStr = exports.sortNumberStr = function sortNumberStr(compareFn) {
  var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';

  return function (numStr1, numStr2) {
    var num1 = (0, _number.parse)(numStr1, decimal);
    var num2 = (0, _number.parse)(numStr2, decimal);
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
var sortDateStr = exports.sortDateStr = function sortDateStr(compareFn) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-us';

  return function (dateStr1, dateStr2) {
    var date1 = _sugarDate.Date.create(dateStr1, locale);
    var date2 = _sugarDate.Date.create(dateStr2, locale);
    return compareFn(date1, date2);
  };
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TableFilter = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(19);

var _dom = __webpack_require__(10);

var _string = __webpack_require__(21);

var _types = __webpack_require__(3);

var _number = __webpack_require__(68);

var _settings = __webpack_require__(7);

var _root = __webpack_require__(16);

var _emitter = __webpack_require__(109);

var _dropdown = __webpack_require__(110);

var _checkList = __webpack_require__(128);

var _const = __webpack_require__(15);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var doc = _root.root.document;

/**
 * Makes HTML tables filterable and a bit more :)
 *
 * @export
 * @class TableFilter
 */

var TableFilter = exports.TableFilter = function () {

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
        this.version = '0.6.3';

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

        var startRow = void 0;

        // TODO: use for-of

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        args.forEach(function (arg) {
            if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.nodeName === 'TABLE') {
                _this.tbl = arg;
                _this.id = arg.id || 'tf_' + new Date().getTime() + '_';
            } else if ((0, _types.isString)(arg)) {
                _this.id = arg;
                _this.tbl = (0, _dom.elm)(arg);
            } else if ((0, _types.isNumber)(arg)) {
                startRow = arg;
            } else if ((0, _types.isObj)(arg)) {
                _this.cfg = arg;
                _this.hasConfig = true;
            }
        });

        if (!this.tbl || this.tbl.nodeName !== 'TABLE') {
            throw new Error('Could not instantiate TableFilter: HTML table\n                DOM element not found.');
        }

        if (this.getRowsNb() === 0) {
            throw new Error('Could not instantiate TableFilter: HTML table\n                requires at least 1 row.');
        }

        // configuration object
        var f = this.cfg;

        /**
         * Event emitter instance
         * @type {Emitter}
         */
        this.emitter = new _emitter.Emitter();

        // start row
        this.refRow = (0, _types.isUndef)(startRow) ? 2 : startRow + 1;

        /**
         * Collection of filter type by column
         * @type {Array}
         * @private
         */
        this.filterTypes = [].map.call((this.dom().rows[this.refRow] || this.dom().rows[0]).cells, function (cell, idx) {
            var colType = _this.cfg['col_' + idx];
            return !colType ? _const.INPUT : colType.toLowerCase();
        });

        /**
         * Base path for static assets
         * @type {String}
         */
        this.basePath = (0, _settings.defaultsStr)(f.base_path, 'tablefilter/');

        /*** filters' grid properties ***/

        /**
         * Enable/disable filters
         * @type {Boolean}
         */
        this.fltGrid = (0, _settings.defaultsBool)(f.grid, true);

        /**
         * Enable/disable grid layout (fixed headers)
         * @type {Object|Boolean}
         */
        this.gridLayout = (0, _types.isObj)(f.grid_layout) || Boolean(f.grid_layout);

        /**
         * Filters row index
         * @type {Number}
         */
        this.filtersRowIndex = (0, _settings.defaultsNb)(f.filters_row_index, 0);

        /**
         * Headers row index
         * @type {Number}
         */
        this.headersRow = (0, _settings.defaultsNb)(f.headers_row_index, this.filtersRowIndex === 0 ? 1 : 0);

        /**
         * Define the type of cell containing a filter (td/th)
         * @type {String}
         */
        this.fltCellTag = (0, _settings.defaultsStr)(f.filters_cell_tag, _const.CELL_TAG);

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
        this.fltsRowCssClass = (0, _settings.defaultsStr)(f.flts_row_css_class, 'fltrow');

        /**
         * Enable/disable icons (paging, reset button)
         * @type {Boolean}
         */
        this.enableIcons = (0, _settings.defaultsBool)(f.enable_icons, true);

        /**
         * Enable/disable alternating rows
         * @type {Boolean}
         */
        this.alternateRows = Boolean(f.alternate_rows);

        /**
         * Columns widths array
         * @type {Array}
         */
        this.colWidths = (0, _settings.defaultsArr)(f.col_widths, []);

        /**
         * Css class for a filter element
         * @type {String}
         */
        this.fltCssClass = (0, _settings.defaultsStr)(f.flt_css_class, 'flt');

        /**
         * Css class for multiple select filters
         * @type {String}
         */
        this.fltMultiCssClass = (0, _settings.defaultsStr)(f.flt_multi_css_class, 'flt_multi');

        /**
         * Css class for small filter (when submit button is active)
         * @type {String}
         */
        this.fltSmallCssClass = (0, _settings.defaultsStr)(f.flt_small_css_class, 'flt_s');

        /**
         * Css class for single filter type
         * @type {String}
         */
        this.singleFltCssClass = (0, _settings.defaultsStr)(f.single_flt_css_class, 'single_flt');

        /*** filters' grid behaviours ***/

        /**
         * Enable/disable enter key for input type filters
         * @type {Boolean}
         */
        this.enterKey = (0, _settings.defaultsBool)(f.enter_key, true);

        /**
         * Callback fired before filtering process starts
         * @type {Function}
         */
        this.onBeforeFilter = (0, _settings.defaultsFn)(f.on_before_filter, _types.EMPTY_FN);

        /**
         * Callback fired after filtering process is completed
         * @type {Function}
         */
        this.onAfterFilter = (0, _settings.defaultsFn)(f.on_after_filter, _types.EMPTY_FN);

        /**
         * Enable/disable case sensitivity filtering
         * @type {Boolean}
         */
        this.caseSensitive = Boolean(f.case_sensitive);

        /**
         * Indicate whether exact match filtering is enabled on a per column
         * basis
         * @type {Boolean}
         * @private
         */
        this.hasExactMatchByCol = (0, _types.isArray)(f.columns_exact_match);

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
         * Filter rows with uneven number of cells (rowspan, cellspan)
         * @type {Boolean}
         */
        this.allowUnevenRows = Boolean(f.allow_uneven_rows);

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
        this.hasExcludedRows = Boolean((0, _types.isArray)(f.exclude_rows) && f.exclude_rows.length > 0);

        /**
         * List of row indexes to be excluded from filtering
         * @type {Array}
         */
        this.excludeRows = (0, _settings.defaultsArr)(f.exclude_rows, []);

        /**
         * List of containers IDs where external filters will be generated
         * @type {Array}
         */
        this.externalFltTgtIds = (0, _settings.defaultsArr)(f.external_flt_grid_ids, []);

        /**
         * Callback fired after filters are generated
         * @type {Function}
         */
        this.onFiltersLoaded = (0, _settings.defaultsFn)(f.on_filters_loaded, _types.EMPTY_FN);

        /**
         * Enable/disable single filter filtering all columns
         * @type {Boolean}
         */
        this.singleSearchFlt = Boolean(f.single_filter);

        /**
         * Callback fired after a row is validated during filtering
         * @type {Function}
         */
        this.onRowValidated = (0, _settings.defaultsFn)(f.on_row_validated, _types.EMPTY_FN);

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
        this.cellParser = (0, _types.isObj)(f.cell_parser) && (0, _types.isFn)(f.cell_parser.parse) && (0, _types.isArray)(f.cell_parser.cols) ? f.cell_parser : { cols: [], parse: _types.EMPTY_FN };

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
        this.isWatermarkArray = (0, _types.isArray)(this.watermark);

        /**
         * Indicate whether help UI component is disabled
         * @type {Boolean}
         */
        this.help = (0, _types.isUndef)(f.help_instructions) ? undefined : (0, _types.isObj)(f.help_instructions) || Boolean(f.help_instructions);

        /**
         * Indicate whether pop-up filters UI is enabled
         * @type {Boolean}
         */
        this.popupFilters = (0, _types.isObj)(f.popup_filters) || Boolean(f.popup_filters);

        /**
         * Indicate whether filtered (active) columns indicator is enabled
         * @type {Boolean}
         */
        this.markActiveColumns = (0, _types.isObj)(f.mark_active_columns) || Boolean(f.mark_active_columns);

        /*** select filter's customisation and behaviours ***/
        /**
         * Text for clear option in drop-down filter types (1st option)
         * @type {String|Array}
         */
        this.clearFilterText = (0, _settings.defaultsStr)(f.clear_filter_text, 'Clear');

        /**
         * Indicate whether empty option is enabled in drop-down filter types
         * @type {Boolean}
         */
        this.enableEmptyOption = Boolean(f.enable_empty_option);

        /**
         * Text for empty option in drop-down filter types
         * @type {String}
         */
        this.emptyText = (0, _settings.defaultsStr)(f.empty_text, '(Empty)');

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
        this.nonEmptyText = (0, _settings.defaultsStr)(f.non_empty_text, '(Non empty)');

        /**
         * Indicate whether drop-down filter types filter the table by default
         * on change event
         * @type {Boolean}
         */
        this.onSlcChange = (0, _settings.defaultsBool)(f.on_change, true);

        /**
         * Make drop-down filter types options sorted in alpha-numeric manner
         * by default globally or on a column basis
         * @type {Boolean|Array}
         */
        this.sortSlc = (0, _types.isUndef)(f.sort_select) ? true : (0, _types.isArray)(f.sort_select) ? f.sort_select : Boolean(f.sort_select);

        /**
         * Indicate whether options in drop-down filter types are sorted in a
         * ascending numeric manner
         * @type {Boolean}
         * @private
         */
        this.isSortNumAsc = Boolean(f.sort_num_asc);

        /**
         * List of columns implementing options sorting in a ascending numeric
         * manner
         * @type {Array}
         */
        this.sortNumAsc = this.isSortNumAsc ? f.sort_num_asc : [];

        /**
         * Indicate whether options in drop-down filter types are sorted in a
         * descending numeric manner
         * @type {Boolean}
         * @private
         */
        this.isSortNumDesc = Boolean(f.sort_num_desc);

        /**
         * List of columns implementing options sorting in a descending numeric
         * manner
         * @type {Array}
         */
        this.sortNumDesc = this.isSortNumDesc ? f.sort_num_desc : [];

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
        this.hasCustomOptions = (0, _types.isObj)(f.custom_options);

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
        this.rgxOperator = (0, _settings.defaultsStr)(f.regexp_operator, 'rgx:');

        /**
         * Empty cells operator for input filter. Defaults to '[empty]'
         * @type {String}
         */
        this.emOperator = (0, _settings.defaultsStr)(f.empty_operator, '[empty]');

        /**
         * Non-empty cells operator for input filter. Defaults to '[nonempty]'
         * @type {String}
         */
        this.nmOperator = (0, _settings.defaultsStr)(f.nonempty_operator, '[nonempty]');

        /**
         * Logical OR operator for input filter. Defaults to '||'
         * @type {String}
         */
        this.orOperator = (0, _settings.defaultsStr)(f.or_operator, '||');

        /**
         * Logical AND operator for input filter. Defaults to '&&'
         * @type {String}
         */
        this.anOperator = (0, _settings.defaultsStr)(f.and_operator, '&&');

        /**
         * Greater than operator for input filter. Defaults to '>'
         * @type {String}
         */
        this.grOperator = (0, _settings.defaultsStr)(f.greater_operator, '>');

        /**
         * Lower than operator for input filter. Defaults to '<'
         * @type {String}
         */
        this.lwOperator = (0, _settings.defaultsStr)(f.lower_operator, '<');

        /**
         * Lower than or equal operator for input filter. Defaults to '<='
         * @type {String}
         */
        this.leOperator = (0, _settings.defaultsStr)(f.lower_equal_operator, '<=');

        /**
         * Greater than or equal operator for input filter. Defaults to '>='
         * @type {String}
         */
        this.geOperator = (0, _settings.defaultsStr)(f.greater_equal_operator, '>=');

        /**
         * Inequality operator for input filter. Defaults to '!'
         * @type {String}
         */
        this.dfOperator = (0, _settings.defaultsStr)(f.different_operator, '!');

        /**
         * Like operator for input filter. Defaults to '*'
         * @type {String}
         */
        this.lkOperator = (0, _settings.defaultsStr)(f.like_operator, '*');

        /**
         * Strict equality operator for input filter. Defaults to '='
         * @type {String}
         */
        this.eqOperator = (0, _settings.defaultsStr)(f.equal_operator, '=');

        /**
         * Starts with operator for input filter. Defaults to '='
         * @type {String}
         */
        this.stOperator = (0, _settings.defaultsStr)(f.start_with_operator, '{');

        /**
         * Ends with operator for input filter. Defaults to '='
         * @type {String}
         */
        this.enOperator = (0, _settings.defaultsStr)(f.end_with_operator, '}');

        // this.curExp = f.cur_exp || '^[¥£€$]';

        /**
         * Stored values separator
         * @type {String}
         */
        this.separator = (0, _settings.defaultsStr)(f.separator, ',');

        /**
         * Enable rows counter UI component
         * @type {Boolean|Object}
         */
        this.rowsCounter = (0, _types.isObj)(f.rows_counter) || Boolean(f.rows_counter);

        /**
         * Enable status bar UI component
         * @type {Boolean|Object}
         */
        this.statusBar = (0, _types.isObj)(f.status_bar) || Boolean(f.status_bar);

        /**
         * Enable activity/spinner indicator UI component
         * @type {Boolean|Object}
         */
        this.loader = (0, _types.isObj)(f.loader) || Boolean(f.loader);

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
        this.btnText = (0, _settings.defaultsStr)(f.btn_text, !this.enableIcons ? 'Go' : '');

        /**
         * Css class for filters submission button
         * @type {String}
         */
        this.btnCssClass = (0, _settings.defaultsStr)(f.btn_css_class, !this.enableIcons ? 'btnflt' : 'btnflt_icon');

        /**
         * Enable clear button
         * @type {Boolean}
         */
        this.btnReset = Boolean(f.btn_reset);

        /**
         * Callback fired before filters are cleared
         * @type {Function}
         */
        this.onBeforeReset = (0, _settings.defaultsFn)(f.on_before_reset, _types.EMPTY_FN);

        /**
         * Callback fired after filters are cleared
         * @type {Function}
         */
        this.onAfterReset = (0, _settings.defaultsFn)(f.on_after_reset, _types.EMPTY_FN);

        /**
         * Enable paging component
         * @type {Object|Boolean}
         */
        this.paging = (0, _types.isObj)(f.paging) || Boolean(f.paging);

        /**
         * Number of hidden rows
         * @type {Number}
         * @private
         */
        this.nbHiddenRows = 0;

        /**
         * Enable auto-filter behaviour, table is filtered when a user
         * stops typing
         * @type {Boolean}
         */
        this.autoFilter = Boolean(f.auto_filter);

        /**
         * Auto-filter delay in msecs
         * @type {Number}
         */
        this.autoFilterDelay = (0, _settings.defaultsNb)(f.auto_filter_delay, _const.AUTO_FILTER_DELAY);

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
        this.noResults = (0, _types.isObj)(f.no_results_message) || Boolean(f.no_results_message);

        /**
         * Enable state persistence
         * @type {Object|Boolean}
         */
        this.state = (0, _types.isObj)(f.state) || Boolean(f.state);

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
        this.locale = (0, _settings.defaultsStr)(f.locale, 'en');

        /**
         * Define thousands separator ',' or '.', defaults to ','
         * @type {String}
         */
        this.thousandsSeparator = (0, _settings.defaultsStr)(f.thousands_separator, ',');

        /**
         * Define decimal separator ',' or '.', defaults to '.'
         * @type {String}
         */
        this.decimalSeparator = (0, _settings.defaultsStr)(f.decimal_separator, '.');

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
        this.colTypes = (0, _types.isArray)(f.col_types) ? f.col_types : [];

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

        /*** extensions ***/
        /**
         * List of loaded extensions
         * @type {Array}
         */
        this.extensions = (0, _settings.defaultsArr)(f.extensions, []);

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
        this.hasThemes = this.enableDefaultTheme || (0, _types.isArray)(f.themes);

        /**
         * List of themes, ie:
         * themes: [{ name: 'skyblue' }]
         * @type {Array}
         */
        this.themes = (0, _settings.defaultsArr)(f.themes, []);

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
        this.toolbar = (0, _types.isObj)(f.toolbar) || Boolean(f.toolbar);

        /**
         * Features registry
         * @private
         */
        this.Mod = {};

        /**
         * Extensions registry
         * @private
         */
        this.ExtRegistry = {};

        // conditionally instantiate required features
        this.instantiateFeatures(Object.keys(_const.FEATURES).map(function (item) {
            return _const.FEATURES[item];
        }));
    }

    /**
     * Initialise features and layout
     */


    _createClass(TableFilter, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            if (this.initialized) {
                return;
            }

            // import main stylesheet
            this.import(this.stylesheetId, this.getStylesheetPath(), null, 'link');

            this.nbCells = this.getCellsNb(this.refRow);
            var Mod = this.Mod;
            var n = this.singleSearchFlt ? 1 : this.nbCells;
            var inpclass = void 0;

            //loads theme
            this.loadThemes();

            var dateType = _const.FEATURES.dateType,
                help = _const.FEATURES.help,
                state = _const.FEATURES.state,
                markActiveColumns = _const.FEATURES.markActiveColumns,
                gridLayout = _const.FEATURES.gridLayout,
                loader = _const.FEATURES.loader,
                highlightKeyword = _const.FEATURES.highlightKeyword,
                popupFilter = _const.FEATURES.popupFilter,
                rowsCounter = _const.FEATURES.rowsCounter,
                statusBar = _const.FEATURES.statusBar,
                clearButton = _const.FEATURES.clearButton,
                alternateRows = _const.FEATURES.alternateRows,
                noResults = _const.FEATURES.noResults,
                paging = _const.FEATURES.paging,
                toolbar = _const.FEATURES.toolbar;

            //explicitly initialise features in given order

            this.initFeatures([dateType, help, state, markActiveColumns, gridLayout, loader, highlightKeyword, popupFilter]);

            //filters grid is not generated
            if (!this.fltGrid) {
                this._initNoFilters();
            } else {
                var fltrow = this._insertFiltersRow();

                this.nbFilterableRows = this.getRowsNb();

                // Generate filters
                for (var i = 0; i < n; i++) {
                    this.emitter.emit('before-filter-init', this, i);

                    var fltCell = (0, _dom.createElm)(this.fltCellTag),
                        col = this.getFilterType(i);

                    if (this.singleSearchFlt) {
                        fltCell.colSpan = this.nbCells;
                    }
                    if (!this.gridLayout) {
                        fltrow.appendChild(fltCell);
                    }
                    inpclass = i === n - 1 && this.displayBtn ? this.fltSmallCssClass : this.fltCssClass;

                    //only 1 input for single search
                    if (this.singleSearchFlt) {
                        col = _const.INPUT;
                        inpclass = this.singleFltCssClass;
                    }

                    //drop-down filters
                    if (col === _const.SELECT || col === _const.MULTIPLE) {
                        Mod.dropdown = Mod.dropdown || new _dropdown.Dropdown(this);
                        Mod.dropdown.init(i, this.isExternalFlt(), fltCell);
                    }
                    // checklist
                    else if (col === _const.CHECKLIST) {
                            Mod.checkList = Mod.checkList || new _checkList.CheckList(this);
                            Mod.checkList.init(i, this.isExternalFlt(), fltCell);
                        } else {
                            this._buildInputFilter(i, inpclass, fltCell);
                        }

                    // this adds submit button
                    if (i === n - 1 && this.displayBtn) {
                        this._buildSubmitButton(this.isExternalFlt() ? (0, _dom.elm)(this.externalFltTgtIds[i]) : fltCell);
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

            this.initFeatures([rowsCounter, statusBar, clearButton, alternateRows, noResults, paging, toolbar]);

            this.setColWidths();

            //TF css class is added to table
            if (!this.gridLayout) {
                (0, _dom.addClass)(this.dom(), this.prfxTf);
                if (this.responsive) {
                    (0, _dom.addClass)(this.dom(), this.prfxResponsive);
                }
            }

            /* Load extensions */
            this.initExtensions();

            // Subscribe to events
            if (this.linkedFilters) {
                this.emitter.on(['after-filtering'], function () {
                    return _this2.linkFilters();
                });
            }

            this.initialized = true;

            this.onFiltersLoaded(this);

            this.emitter.emit('initialized', this);
        }

        /**
         * Detect <enter> key
         * @param {Event} evt
         */

    }, {
        key: 'detectKey',
        value: function detectKey(evt) {
            if (!this.enterKey) {
                return;
            }
            if (evt) {
                var key = (0, _event.keyCode)(evt);
                if (key === _const.ENTER_KEY) {
                    this.filter();
                    (0, _event.cancelEvt)(evt);
                    (0, _event.stopEvt)(evt);
                } else {
                    this.isUserTyping = true;
                    _root.root.clearInterval(this.autoFilterTimer);
                    this.autoFilterTimer = null;
                }
            }
        }

        /**
         * Filter's keyup event: if auto-filter on, detect user is typing and filter
         * columns
         * @param {Event} evt
         */

    }, {
        key: 'onKeyUp',
        value: function onKeyUp(evt) {
            if (!this.autoFilter) {
                return;
            }
            var key = (0, _event.keyCode)(evt);
            this.isUserTyping = false;

            function filter() {
                _root.root.clearInterval(this.autoFilterTimer);
                this.autoFilterTimer = null;
                if (!this.isUserTyping) {
                    this.filter();
                    this.isUserTyping = null;
                }
            }

            if (key !== _const.ENTER_KEY && key !== _const.TAB_KEY && key !== _const.ESC_KEY && key !== _const.UP_ARROW_KEY && key !== _const.DOWN_ARROW_KEY) {
                if (this.autoFilterTimer === null) {
                    this.autoFilterTimer = _root.root.setInterval(filter.bind(this), this.autoFilterDelay);
                }
            } else {
                _root.root.clearInterval(this.autoFilterTimer);
                this.autoFilterTimer = null;
            }
        }

        /**
         * Filter's keydown event: if auto-filter on, detect user is typing
         */

    }, {
        key: 'onKeyDown',
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
        key: 'onInpFocus',
        value: function onInpFocus(evt) {
            var elm = (0, _event.targetEvt)(evt);
            this.emitter.emit('filter-focus', this, elm);
        }

        /**
         * Filter's blur event: if auto-filter on, clear interval on filter blur
         */

    }, {
        key: 'onInpBlur',
        value: function onInpBlur() {
            if (this.autoFilter) {
                this.isUserTyping = false;
                _root.root.clearInterval(this.autoFilterTimer);
            }
            this.emitter.emit('filter-blur', this);
        }

        /**
         * Insert filters row at initialization
         */

    }, {
        key: '_insertFiltersRow',
        value: function _insertFiltersRow() {
            // TODO: prevent filters row generation for popup filters too,
            // to reduce and simplify headers row index adjusting across lib modules
            // (GridLayout, PopupFilter etc)
            if (this.gridLayout) {
                return;
            }
            var fltrow = void 0;

            var thead = (0, _dom.tag)(this.dom(), 'thead');
            if (thead.length > 0) {
                fltrow = thead[0].insertRow(this.filtersRowIndex);
            } else {
                fltrow = this.dom().insertRow(this.filtersRowIndex);
            }

            fltrow.className = this.fltsRowCssClass;

            if (this.isExternalFlt()) {
                fltrow.style.display = _const.NONE;
            }

            this.emitter.emit('filters-row-inserted', this, fltrow);
            return fltrow;
        }

        /**
         * Initialize filtersless table
         */

    }, {
        key: '_initNoFilters',
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
        key: '_buildInputFilter',
        value: function _buildInputFilter(colIndex, cssClass, container) {
            var _this3 = this;

            var col = this.getFilterType(colIndex);
            var externalFltTgtId = this.isExternalFlt() ? this.externalFltTgtIds[colIndex] : null;
            var inpType = col === _const.INPUT ? 'text' : 'hidden';
            var inp = (0, _dom.createElm)(_const.INPUT, ['id', this.buildFilterId(colIndex)], ['type', inpType], ['ct', colIndex]);

            if (inpType !== 'hidden' && this.watermark) {
                inp.setAttribute('placeholder', this.isWatermarkArray ? this.watermark[colIndex] || '' : this.watermark);
            }
            inp.className = cssClass || this.fltCssClass;
            (0, _event.addEvt)(inp, 'focus', function (evt) {
                return _this3.onInpFocus(evt);
            });

            //filter is appended in custom element
            if (externalFltTgtId) {
                (0, _dom.elm)(externalFltTgtId).appendChild(inp);
            } else {
                container.appendChild(inp);
            }

            this.fltIds.push(inp.id);

            (0, _event.addEvt)(inp, 'keypress', function (evt) {
                return _this3.detectKey(evt);
            });
            (0, _event.addEvt)(inp, 'keydown', function () {
                return _this3.onKeyDown();
            });
            (0, _event.addEvt)(inp, 'keyup', function (evt) {
                return _this3.onKeyUp(evt);
            });
            (0, _event.addEvt)(inp, 'blur', function () {
                return _this3.onInpBlur();
            });
        }

        /**
         * Build submit button
         * @param  {DOMElement} container Container DOM element
         */

    }, {
        key: '_buildSubmitButton',
        value: function _buildSubmitButton(container) {
            var _this4 = this;

            var btn = (0, _dom.createElm)(_const.INPUT, ['type', 'button'], ['value', this.btnText]);
            btn.className = this.btnCssClass;

            //filter is appended in container element
            container.appendChild(btn);

            (0, _event.addEvt)(btn, 'click', function () {
                return _this4.filter();
            });
        }

        /**
         * Istantiate the collection of features required by the
         * configuration and add them to the features registry. A feature is
         * described by a `class` and `name` fields and and optional `property`
         * field:
         * {
         *   class: AClass,
         *   name: 'aClass'
         * }
         * @param {Array} [features=[]]
         * @private
         */

    }, {
        key: 'instantiateFeatures',
        value: function instantiateFeatures() {
            var _this5 = this;

            var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            features.forEach(function (feature) {
                // TODO: remove the property field.
                // Due to naming convention inconsistencies, a `property`
                // field is added to allow a conditional instanciation based
                // on that property on TableFilter, if supplied.
                feature.property = feature.property || feature.name;
                if (!_this5.hasConfig || _this5[feature.property] === true || feature.enforce === true) {
                    var Cls = feature.class,
                        name = feature.name;


                    _this5.Mod[name] = _this5.Mod[name] || new Cls(_this5);
                }
            });
        }

        /**
         * Initialise the passed features collection. A feature is described by a
         * `class` and `name` fields and and optional `property` field:
         * {
         *   class: AClass,
         *   name: 'aClass'
         * }
         * @param {Array} [features=[]]
         * @private
         */

    }, {
        key: 'initFeatures',
        value: function initFeatures() {
            var _this6 = this;

            var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            features.forEach(function (feature) {
                var property = feature.property,
                    name = feature.name;

                if (_this6[property] === true && _this6.Mod[name]) {
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
        key: 'feature',
        value: function feature(name) {
            return this.Mod[name];
        }

        /**
         * Initialise all the extensions defined in the configuration object
         */

    }, {
        key: 'initExtensions',
        value: function initExtensions() {
            var _this7 = this;

            var exts = this.extensions;
            if (exts.length === 0) {
                return;
            }

            // Set config's publicPath dynamically for Webpack...
            __webpack_require__.p = this.basePath;

            this.emitter.emit('before-loading-extensions', this);

            // for (let i = 0, len = exts.length; i < len; i++) {
            exts.forEach(function (ext) {
                // let ext = exts[i];
                _this7.loadExtension(ext);
            });
            this.emitter.emit('after-loading-extensions', this);
        }

        /**
         * Load an extension module
         * @param  {Object} ext Extension config object
         */

    }, {
        key: 'loadExtension',
        value: function loadExtension(ext) {
            var _this8 = this;

            if (!ext || !ext.name || this.hasExtension(ext.name)) {
                return;
            }

            // let name = ext.name;
            // let path = ext.path;
            var name = ext.name,
                path = ext.path;

            var modulePath = void 0;

            if (name && path) {
                modulePath = ext.path + name;
            } else {
                name = name.replace('.js', '');
                modulePath = 'extensions/{}/{}'.replace(/{}/g, name);
            }

            // Require pattern for Webpack
            __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(440)("./" + modulePath)]; (function (mod) {
                /* eslint-disable */
                var inst = new mod.default(_this8, ext);
                /* eslint-enable */
                inst.init();
                _this8.ExtRegistry[name] = inst;
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        }

        /**
         * Get an extension instance
         * @param  {String} name Name of the extension
         * @return {Object}      Extension instance
         */

    }, {
        key: 'extension',
        value: function extension(name) {
            return this.ExtRegistry[name];
        }

        /**
         * Check passed extension name exists
         * @param  {String}  name Name of the extension
         * @return {Boolean}
         */

    }, {
        key: 'hasExtension',
        value: function hasExtension(name) {
            return !(0, _types.isEmpty)(this.ExtRegistry[name]);
        }

        /**
         * Register the passed extension instance with associated name
         * @param {Object} inst Extension instance
         * @param {String} name Name of the extension
         */

    }, {
        key: 'registerExtension',
        value: function registerExtension(inst, name) {
            this.ExtRegistry[name] = inst;
        }

        /**
         * Destroy all the extensions store in extensions registry
         */

    }, {
        key: 'destroyExtensions',
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
        key: 'loadThemes',
        value: function loadThemes() {
            var _this9 = this;

            if (!this.hasThemes) {
                return;
            }

            var themes = this.themes;
            this.emitter.emit('before-loading-themes', this);

            //Default theme config
            if (this.enableDefaultTheme) {
                var defaultTheme = { name: 'default' };
                this.themes.push(defaultTheme);
            }
            // if (isArray(themes)) {
            themes.forEach(function (theme, i) {
                // for (let i = 0, len = themes.length; i < len; i++) {
                // let theme = themes[i];
                // let name = theme.name;
                // let path = theme.path;
                var name = theme.name,
                    path = theme.path;

                var styleId = _this9.prfxTf + name;
                if (name && !path) {
                    path = _this9.themesPath + name + '/' + name + '.css';
                } else if (!name && theme.path) {
                    name = 'theme{0}'.replace('{0}', i);
                }

                if (!_this9.isImported(path, 'link')) {
                    _this9.import(styleId, path, null, 'link');
                }
            });
            // }

            // Enable loader indicator
            this.loader = true;

            this.emitter.emit('after-loading-themes', this);
        }

        /**
         * Return stylesheet DOM element for a given theme name
         * @return {DOMElement} stylesheet element
         */

    }, {
        key: 'getStylesheet',
        value: function getStylesheet() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

            return (0, _dom.elm)(this.prfxTf + name);
        }

        /**
         * Destroy filter grid
         */

    }, {
        key: 'destroy',
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

            this.validateAllRows();

            // broadcast destroy event modules and extensions are subscribed to
            emitter.emit('destroy', this);

            if (this.fltGrid && !this.gridLayout) {
                this.dom().deleteRow(this.filtersRowIndex);
            }

            // unsubscribe to events
            if (this.hasExcludedRows) {
                emitter.off(['after-filtering'], function () {
                    return _this10.setExcludeRows();
                });
            }
            if (this.linkedFilters) {
                emitter.off(['after-filtering'], function () {
                    return _this10.linkFilters();
                });
            }
            this.emitter.off(['filter-focus'], function (tf, filter) {
                return _this10.setActiveFilterId(filter.id);
            });

            (0, _dom.removeClass)(this.dom(), this.prfxTf);
            (0, _dom.removeClass)(this.dom(), this.prfxResponsive);

            this.nbHiddenRows = 0;
            this.validRowsIndex = [];
            this.fltIds = [];
            this.initialized = false;
        }

        /**
         * Remove all the external column filters
         */

    }, {
        key: 'removeExternalFlts',
        value: function removeExternalFlts() {
            if (!this.isExternalFlt()) {
                return;
            }
            var ids = this.externalFltTgtIds /*,
                                             len = ids.length*/;
            ids.forEach(function (id) {
                // for (let ct = 0; ct < len; ct++) {
                var /*externalFltTgtId = ids[ct],*/
                externalFlt = (0, _dom.elm)(id);
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
        key: 'isCustomOptions',
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
        key: 'getCustomOptions',
        value: function getCustomOptions(colIndex) {
            if ((0, _types.isEmpty)(colIndex) || !this.isCustomOptions(colIndex)) {
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
        key: 'filter',
        value: function filter() {
            var _this11 = this;

            if (!this.fltGrid || !this.initialized) {
                return;
            }
            //fire onbefore callback
            this.onBeforeFilter(this);
            this.emitter.emit('before-filtering', this);

            var /*row = this.dom().rows,
                nbRows = this.getRowsNb(true),*/
            hiddenRows = 0;

            this.validRowsIndex = [];
            // search args re-init
            var searchArgs = this.getFiltersValue();

            var eachRow = this.eachRow();
            eachRow(function (row, k) {
                // for (let k = this.refRow; k < nbRows; k++) {
                // already filtered rows display re-init
                row.style.display = '';

                var cells = row.cells;
                var nbCells = cells.length;

                // // checks if row has exact cell #
                // if (nbCells !== this.nbCells) {
                //     continue;
                // }

                var occurence = [],
                    isRowValid = true,

                //only for single filter search
                singleFltRowValid = false;

                // this loop retrieves cell data
                for (var j = 0; j < nbCells; j++) {
                    //searched keyword
                    var sA = searchArgs[_this11.singleSearchFlt ? 0 : j];

                    if (sA === '') {
                        continue;
                    }

                    var cellValue = (0, _string.matchCase)(_this11.getCellValue(cells[j]), _this11.caseSensitive);

                    //multiple search parameter operator ||
                    var sAOrSplit = sA.toString().split(_this11.orOperator),

                    //multiple search || parameter boolean
                    hasMultiOrSA = sAOrSplit.length > 1,

                    //multiple search parameter operator &&
                    sAAndSplit = sA.toString().split(_this11.anOperator),

                    //multiple search && parameter boolean
                    hasMultiAndSA = sAAndSplit.length > 1;

                    //detect operators or array query
                    if ((0, _types.isArray)(sA) || hasMultiOrSA || hasMultiAndSA) {
                        var cS = void 0,
                            s = void 0,
                            occur = false;
                        if ((0, _types.isArray)(sA)) {
                            s = sA;
                        } else {
                            s = hasMultiOrSA ? sAOrSplit : sAAndSplit;
                        }
                        // isolate search term and check occurence in cell data
                        for (var w = 0, len = s.length; w < len; w++) {
                            cS = (0, _string.trim)(s[w]);
                            occur = _this11._matcth(cS, cellValue, j);

                            if (occur) {
                                _this11.emitter.emit('highlight-keyword', _this11, cells[j], cS);
                            }
                            if (hasMultiOrSA && occur || hasMultiAndSA && !occur) {
                                break;
                            }
                            if ((0, _types.isArray)(sA) && occur) {
                                break;
                            }
                        }
                        occurence[j] = occur;
                    }
                    //single search parameter
                    else {
                            occurence[j] = _this11._matcth((0, _string.trim)(sA), cellValue, j);
                            if (occurence[j]) {
                                _this11.emitter.emit('highlight-keyword', _this11, cells[j], sA);
                            }
                        } //else single param

                    if (!occurence[j]) {
                        isRowValid = false;
                    }
                    if (_this11.singleSearchFlt && occurence[j]) {
                        singleFltRowValid = true;
                    }

                    _this11.emitter.emit('cell-processed', _this11, j, cells[j]);
                } //for j

                if (_this11.singleSearchFlt && singleFltRowValid) {
                    isRowValid = true;
                }

                _this11.validateRow(k, isRowValid);
                if (!isRowValid) {
                    hiddenRows++;
                }

                _this11.emitter.emit('row-processed', _this11, k, _this11.validRowsIndex.length, isRowValid);
            },
            // continue condition
            function (row) {
                return !_this11.allowUnevenRows && row.cells.length !== _this11.nbCells;
            });

            this.nbHiddenRows = hiddenRows;

            //fire onafterfilter callback
            this.onAfterFilter(this);

            this.emitter.emit('after-filtering', this, searchArgs);
        }

        /**
         * Match search term in cell data
         * @param {String} term      Search term
         * @param {String} cellValue  Cell data
         * @param {Number} colIdx    Column index
         * @return {Boolean}
         * @private
         */

    }, {
        key: '_matcth',
        value: function _matcth(term, cellValue, colIdx) {
            var numData = void 0;
            var decimal = this.getDecimal(colIdx);
            var reLe = new RegExp(this.leOperator),
                reGe = new RegExp(this.geOperator),
                reL = new RegExp(this.lwOperator),
                reG = new RegExp(this.grOperator),
                reD = new RegExp(this.dfOperator),
                reLk = new RegExp((0, _string.rgxEsc)(this.lkOperator)),
                reEq = new RegExp(this.eqOperator),
                reSt = new RegExp(this.stOperator),
                reEn = new RegExp(this.enOperator),

            // re_an = new RegExp(this.anOperator),
            // re_cr = new RegExp(this.curExp),
            reEm = this.emOperator,
                reNm = this.nmOperator,
                reRe = new RegExp((0, _string.rgxEsc)(this.rgxOperator));

            term = (0, _string.matchCase)(term, this.caseSensitive);

            var occurence = false;

            //Search arg operator tests
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
                hasRE = reRe.test(term);

            // Check for dates or resolve date type
            if (this.hasType(colIdx, [_const.DATE])) {
                var dte1 = void 0,
                    dte2 = void 0;

                var dateType = this.Mod.dateType;
                var isValidDate = dateType.isValid.bind(dateType);
                var parseDate = dateType.parse.bind(dateType);
                var locale = dateType.getLocale(colIdx);

                // Search arg dates tests
                var isLDate = hasLO && isValidDate(term.replace(reL, ''), locale);
                var isLEDate = hasLE && isValidDate(term.replace(reLe, ''), locale);
                var isGDate = hasGR && isValidDate(term.replace(reG, ''), locale);
                var isGEDate = hasGE && isValidDate(term.replace(reGe, ''), locale);
                var isDFDate = hasDF && isValidDate(term.replace(reD, ''), locale);
                var isEQDate = hasEQ && isValidDate(term.replace(reEq, ''), locale);

                dte1 = parseDate(cellValue, locale);

                // lower equal date
                if (isLEDate) {
                    dte2 = parseDate(term.replace(reLe, ''), locale);
                    occurence = dte1 <= dte2;
                }
                // lower date
                else if (isLDate) {
                        dte2 = parseDate(term.replace(reL, ''), locale);
                        occurence = dte1 < dte2;
                    }
                    // greater equal date
                    else if (isGEDate) {
                            dte2 = parseDate(term.replace(reGe, ''), locale);
                            occurence = dte1 >= dte2;
                        }
                        // greater date
                        else if (isGDate) {
                                dte2 = parseDate(term.replace(reG, ''), locale);
                                occurence = dte1 > dte2;
                            }
                            // different date
                            else if (isDFDate) {
                                    dte2 = parseDate(term.replace(reD, ''), locale);
                                    occurence = dte1.toString() !== dte2.toString();
                                }
                                // equal date
                                else if (isEQDate) {
                                        dte2 = parseDate(term.replace(reEq, ''), locale);
                                        occurence = dte1.toString() === dte2.toString();
                                    }
                                    // searched keyword with * operator doesn't have to be a date
                                    else if (reLk.test(term)) {
                                            // like date
                                            occurence = (0, _string.contains)(term.replace(reLk, ''), cellValue, false, this.caseSensitive);
                                        } else if (isValidDate(term)) {
                                            dte2 = parseDate(term, locale);
                                            occurence = dte1.toString() === dte2.toString();
                                        }
                                        //empty
                                        else if (hasEM) {
                                                occurence = (0, _string.isEmpty)(cellValue);
                                            }
                                            //non-empty
                                            else if (hasNM) {
                                                    occurence = !(0, _string.isEmpty)(cellValue);
                                                } else {
                                                    occurence = (0, _string.contains)(term, cellValue, this.isExactMatch(colIdx), this.caseSensitive);
                                                }
            } else {
                // Convert to number anyways to auto-resolve type in case not
                // defined by configuration. Order is important first try to
                // parse formatted number then fallback to Number coercion
                // to avoid false positives with Number
                numData = (0, _number.parse)(cellValue, decimal) || Number(cellValue);

                // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},
                // rgx:)
                // lower equal
                if (hasLE) {
                    occurence = numData <= (0, _number.parse)(term.replace(reLe, ''), decimal);
                }
                //greater equal
                else if (hasGE) {
                        occurence = numData >= (0, _number.parse)(term.replace(reGe, ''), decimal);
                    }
                    //lower
                    else if (hasLO) {
                            occurence = numData < (0, _number.parse)(term.replace(reL, ''), decimal);
                        }
                        //greater
                        else if (hasGR) {
                                occurence = numData > (0, _number.parse)(term.replace(reG, ''), decimal);
                            }
                            //different
                            else if (hasDF) {
                                    occurence = (0, _string.contains)(term.replace(reD, ''), cellValue, false, this.caseSensitive) ? false : true;
                                }
                                //like
                                else if (hasLK) {
                                        occurence = (0, _string.contains)(term.replace(reLk, ''), cellValue, false, this.caseSensitive);
                                    }
                                    //equal
                                    else if (hasEQ) {
                                            occurence = (0, _string.contains)(term.replace(reEq, ''), cellValue, true, this.caseSensitive);
                                        }
                                        //starts with
                                        else if (hasST) {
                                                occurence = cellValue.indexOf(term.replace(reSt, '')) === 0 ? true : false;
                                            }
                                            //ends with
                                            else if (hasEN) {
                                                    var searchArg = term.replace(reEn, '');
                                                    occurence = cellValue.lastIndexOf(searchArg, cellValue.length - 1) === cellValue.length - 1 - (searchArg.length - 1) && cellValue.lastIndexOf(searchArg, cellValue.length - 1) > -1 ? true : false;
                                                }
                                                //empty
                                                else if (hasEM) {
                                                        occurence = (0, _string.isEmpty)(cellValue);
                                                    }
                                                    //non-empty
                                                    else if (hasNM) {
                                                            occurence = !(0, _string.isEmpty)(cellValue);
                                                        }
                                                        //regexp
                                                        else if (hasRE) {
                                                                //in case regexp throws
                                                                try {
                                                                    //operator is removed
                                                                    var srchArg = term.replace(reRe, '');
                                                                    var rgx = new RegExp(srchArg);
                                                                    occurence = rgx.test(cellValue);
                                                                } catch (ex) {
                                                                    occurence = false;
                                                                }
                                                            } else {
                                                                // If numeric type data, perform a strict equality test and
                                                                // fallback to unformatted number string comparison
                                                                if (numData && this.hasType(colIdx, [_const.NUMBER, _const.FORMATTED_NUMBER]) && !this.singleSearchFlt) {
                                                                    // parseNb can return 0 for strings which are not
                                                                    // formatted numbers, in that case return the original
                                                                    // string. TODO: handle this in parseNb
                                                                    term = (0, _number.parse)(term, decimal) || term;
                                                                    occurence = numData === term || (0, _string.contains)(term.toString(), numData.toString(), this.isExactMatch(colIdx), this.caseSensitive);
                                                                } else {
                                                                    // Finally test search term is contained in cell data
                                                                    occurence = (0, _string.contains)(term, cellValue, this.isExactMatch(colIdx), this.caseSensitive, this.ignoresDiacritics(colIdx));
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
        key: 'getColumnData',
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
        key: 'getColumnValues',
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
        key: 'getColValues',
        value: function getColValues(colIndex) {
            var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var _this12 = this;

            var typed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var exclude = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

            // let row = this.dom().rows;
            // let nbRows = this.getRowsNb(true);
            var colValues = [];
            var getContent = typed ? this.getCellData.bind(this) : this.getCellValue.bind(this);

            if (includeHeaders) {
                colValues.push(this.getHeadersText()[colIndex]);
            }

            // for (let i = this.refRow; i < nbRows; i++) {
            //     let isExludedRow = false;
            //     // checks if current row index appears in exclude array
            //     if (exclude.length > 0) {
            //         isExludedRow = exclude.indexOf(i) !== -1;
            //     }
            //     let cell = row[i].cells,
            //         nbCells = cell.length;

            //     // checks if row has exact cell # and is not excluded
            //     if (nbCells === this.nbCells && !isExludedRow) {
            //         let data = getContent(cell[colIndex]);
            //         colValues.push(data);
            //     }
            // }
            var eachRow = this.eachRow();
            eachRow(function (row, i) {
                var isExludedRow = exclude.indexOf(i) !== -1;
                // checks if current row index appears in exclude array
                // if (exclude.length > 0) {
                //     isExludedRow = exclude.indexOf(i) !== -1;
                // }
                var cells = row.cells;

                // checks if row has exact cell # and is not excluded
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
        key: 'getFilterValue',
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
            if (fltColType !== _const.MULTIPLE && fltColType !== _const.CHECKLIST) {
                fltValue = flt.value;
            }
            //mutiple select
            else if (fltColType === _const.MULTIPLE) {
                    fltValue = this.feature('dropdown').getValues(index);
                }
                //checklist
                else if (fltColType === _const.CHECKLIST) {
                        fltValue = this.feature('checkList').getValues(index);
                    }
            //return an empty string if collection is empty or contains a single
            //empty string
            if ((0, _types.isArray)(fltValue) && fltValue.length === 0 || fltValue.length === 1 && fltValue[0] === '') {
                fltValue = '';
            }

            return fltValue;
        }

        /**
         * Return the filters' values
         * @return {Array} List of filters' values
         */

    }, {
        key: 'getFiltersValue',
        value: function getFiltersValue() {
            var _this13 = this;

            if (!this.fltGrid) {
                return;
            }
            var searchArgs = [];
            // for (let i = 0, len = this.fltIds.length; i < len; i++) {
            this.fltIds.forEach(function (id, i) {
                var fltValue = _this13.getFilterValue(i);
                if ((0, _types.isArray)(fltValue)) {
                    searchArgs.push(fltValue);
                } else {
                    searchArgs.push((0, _string.trim)(fltValue));
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
        key: 'getFilterId',
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
        key: 'getFiltersByType',
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
        key: 'getFilterElement',
        value: function getFilterElement(index) {
            return (0, _dom.elm)(this.fltIds[index]);
        }

        /**
         * Return the number of cells for a given row index
         * @param  {Number} rowIndex Index of the row
         * @return {Number}          Number of cells
         */

    }, {
        key: 'getCellsNb',
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
        key: 'getRowsNb',
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
        key: 'getWorkingRows',
        value: function getWorkingRows() {
            return this.dom().querySelectorAll('tbody > tr');
        }

        /**
         * Return the text content of a given cell
         * @param {DOMElement} Cell's DOM element
         * @return {String}
         */

    }, {
        key: 'getCellValue',
        value: function getCellValue(cell) {
            var idx = cell.cellIndex;
            var cellParser = this.cellParser;
            // Invoke cellParser for this column if any
            if (cellParser.cols.indexOf(idx) !== -1) {
                return cellParser.parse(this, cell, idx);
            } else {
                return (0, _dom.getText)(cell);
            }
        }

        /**
         * Return the typed data of a given cell based on the column type definition
         * @param  {DOMElement} cell Cell's DOM element
         * @return {String|Number|Date}
         */

    }, {
        key: 'getCellData',
        value: function getCellData(cell) {
            var colIndex = cell.cellIndex;
            var value = this.getCellValue(cell);

            if (this.hasType(colIndex, [_const.FORMATTED_NUMBER])) {
                return (0, _number.parse)(value, this.getDecimal(colIndex));
            } else if (this.hasType(colIndex, [_const.NUMBER])) {
                return Number(value);
            } else if (this.hasType(colIndex, [_const.DATE])) {
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
        key: 'getData',
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
        key: 'getValues',
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
        key: 'getTableData',
        value: function getTableData() {
            var includeHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var _this14 = this;

            var excludeHiddenCols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var typed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            // let rows = this.dom().rows;
            // let nbRows = this.getRowsNb(true);
            var tblData = [];
            var getContent = typed ? this.getCellData.bind(this) : this.getCellValue.bind(this);

            if (includeHeaders) {
                var headers = this.getHeadersText(excludeHiddenCols);
                tblData.push([this.getHeadersRowIndex(), headers]);
            }
            // for (let k = this.refRow; k < nbRows; k++) {
            //     let rowData = [k, []];
            //     let cells = rows[k].cells;
            //     for (let j = 0, len = cells.length; j < len; j++) {
            //       if (excludeHiddenCols && this.hasExtension('colsVisibility')) {
            //             if (this.extension('colsVisibility').isColHidden(j)) {
            //                 continue;
            //             }
            //         }
            //         let cellValue = getContent(cells[j]);
            //         rowData[1].push(cellValue);
            //     }
            //     tblData.push(rowData);
            // }
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
        key: 'getFilteredData',
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
        key: 'getFilteredValues',
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
        key: 'filteredData',
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
        key: 'getFilteredColumnData',
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
        key: 'getVisibleColumnData',
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
        key: 'getFilteredColumnValues',
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
        key: 'getVisibleColumnValues',
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
        key: 'getFilteredDataCol',
        value: function getFilteredDataCol(colIndex) {
            var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var typed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var _this15 = this;

            var exclude = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
            var visible = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

            if ((0, _types.isUndef)(colIndex)) {
                return [];
            }

            var rows = this.dom().rows;
            var getContent = typed ? this.getCellData.bind(this) : this.getCellValue.bind(this);

            // ensure valid rows index do not contain excluded rows and row is
            // displayed
            var validRows = this.getValidRows(true).filter(function (rowIdx) {
                return exclude.indexOf(rowIdx) === -1 && (visible ? _this15.getRowDisplay(rows[rowIdx]) !== 'none' : true);
            });

            // convert column value to expected type if necessary
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
        key: 'getRowDisplay',
        value: function getRowDisplay(row) {
            return row.style.display;
        }

        /**
         * Validate/invalidate row by setting the 'validRow' attribute on the row
         * @param  {Number}  rowIndex Index of the row
         * @param  {Boolean} isValid
         */

    }, {
        key: 'validateRow',
        value: function validateRow(rowIndex, isValid) {
            var row = this.dom().rows[rowIndex];
            if (!row || !(0, _types.isBoolean)(isValid)) {
                return;
            }

            // always visible rows are valid
            if (this.excludeRows.indexOf(rowIndex) !== -1) {
                isValid = true;
            }

            var displayFlag = isValid ? '' : _const.NONE,
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
        key: 'validateAllRows',
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
        key: 'setFilterValue',
        value: function setFilterValue(index) {
            var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            if (!this.fltGrid) {
                return;
            }
            var slc = this.getFilterElement(index),
                fltColType = this.getFilterType(index);

            if (!slc) {
                return;
            }

            if (fltColType !== _const.MULTIPLE && fltColType !== _const.CHECKLIST) {
                if (this.loadFltOnDemand && !this.initialized) {
                    this.emitter.emit('build-select-filter', this, index, this.linkedFilters, this.isExternalFlt());
                }
                slc.value = query;
            }
            //multiple selects
            else if (fltColType === _const.MULTIPLE) {
                    var values = (0, _types.isArray)(query) ? query : query.split(' ' + this.orOperator + ' ');

                    if (this.loadFltOnDemand && !this.initialized) {
                        this.emitter.emit('build-select-filter', this, index, this.linkedFilters, this.isExternalFlt());
                    }

                    this.emitter.emit('select-options', this, index, values);
                }
                //checklist
                else if (fltColType === _const.CHECKLIST) {
                        var _values = [];
                        if (this.loadFltOnDemand && !this.initialized) {
                            this.emitter.emit('build-checklist-filter', this, index, this.linkedFilters);
                        }
                        if ((0, _types.isArray)(query)) {
                            _values = query;
                        } else {
                            query = (0, _string.matchCase)(query, this.caseSensitive);
                            _values = query.split(' ' + this.orOperator + ' ');
                        }

                        this.emitter.emit('select-checklist-options', this, index, _values);
                    }
        }

        /**
         * Set them columns' widths as per configuration
         * @param {Element} tbl DOM element
         */

    }, {
        key: 'setColWidths',
        value: function setColWidths(tbl) {
            var colWidths = this.colWidths;
            if (colWidths.length === 0) {
                return;
            }

            tbl = tbl || this.dom();

            var colTags = (0, _dom.tag)(tbl, 'col');
            var tblHasColTag = colTags.length > 0;
            var frag = !tblHasColTag ? doc.createDocumentFragment() : null;

            this.eachCol(function (k) {
                var col = void 0;
                if (tblHasColTag) {
                    col = colTags[k];
                } else {
                    col = (0, _dom.createElm)('col');
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
        key: 'setExcludeRows',
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
        key: 'clearFilters',
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
        key: 'getActiveFilterId',
        value: function getActiveFilterId() {
            return this.activeFilterId;
        }

        /**
         * Set the ID of the current active filter
         * @param {String} filterId Element ID
         */

    }, {
        key: 'setActiveFilterId',
        value: function setActiveFilterId(filterId) {
            this.activeFilterId = filterId;
        }

        /**
         * Return the column index for a given filter ID
         * @param {string} [filterId=''] Filter ID
         * @return {Number} Column index
         */

    }, {
        key: 'getColumnIndexFromFilterId',
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
        key: 'buildFilterId',
        value: function buildFilterId(colIndex) {
            return '' + this.prfxFlt + colIndex + '_' + this.id;
        }

        /**
         * Check if has external filters
         * @returns {Boolean}
         * @private
         */

    }, {
        key: 'isExternalFlt',
        value: function isExternalFlt() {
            return this.externalFltTgtIds.length > 0;
        }

        /**
         * Returns styles path
         * @returns {String}
         * @private
         */

    }, {
        key: 'getStylePath',
        value: function getStylePath() {
            return (0, _settings.defaultsStr)(this.config.style_path, this.basePath + 'style/');
        }

        /**
         * Returns main stylesheet path
         * @returns {String}
         * @private
         */

    }, {
        key: 'getStylesheetPath',
        value: function getStylesheetPath() {
            return (0, _settings.defaultsStr)(this.config.stylesheet, this.getStylePath() + 'tablefilter.css');
        }

        /**
         * Returns themes path
         * @returns {String}
         * @private
         */

    }, {
        key: 'getThemesPath',
        value: function getThemesPath() {
            return (0, _settings.defaultsStr)(this.config.themes_path, this.getStylePath() + 'themes/');
        }

        /**
         * Make specified column's filter active
         * @param colIndex Index of a column
         */

    }, {
        key: 'activateFilter',
        value: function activateFilter(colIndex) {
            if ((0, _types.isUndef)(colIndex)) {
                return;
            }
            this.setActiveFilterId(this.getFilterId(colIndex));
        }

        /**
         * Refresh the filters subject to linking ('select', 'multiple',
         * 'checklist' type)
         */

    }, {
        key: 'linkFilters',
        value: function linkFilters() {
            var _this17 = this;

            if (!this.linkedFilters || !this.activeFilterId) {
                return;
            }
            var slcA1 = this.getFiltersByType(_const.SELECT, true),
                slcA2 = this.getFiltersByType(_const.MULTIPLE, true),
                slcA3 = this.getFiltersByType(_const.CHECKLIST, true),
                slcIndex = slcA1.concat(slcA2);
            slcIndex = slcIndex.concat(slcA3);

            slcIndex.forEach(function (colIdx) {
                // for (let i = 0, len = slcIndex.length; i < len; i++) {
                // let colIdx = slcIndex[i];
                var curSlc = _this17.getFilterElement(colIdx);
                var slcSelectedValue = _this17.getFilterValue(colIdx);

                //1st option needs to be inserted
                if (_this17.loadFltOnDemand) {
                    var opt0 = (0, _dom.createOpt)(_this17.getClearFilterText(colIdx), '');
                    curSlc.innerHTML = '';
                    curSlc.appendChild(opt0);
                }

                if (slcA3.indexOf(colIdx) !== -1) {
                    _this17.emitter.emit('build-checklist-filter', _this17, colIdx, true);
                } else {
                    _this17.emitter.emit('build-select-filter', _this17, colIdx, true);
                }

                _this17.setFilterValue(colIdx, slcSelectedValue);
            });
        }

        /**
         * Determine if passed filter column implements exact query match
         * @param  {Number}  colIndex   Column index
         * @return {Boolean}
         */

    }, {
        key: 'isExactMatch',
        value: function isExactMatch(colIndex) {
            var fltType = this.getFilterType(colIndex);
            return this.exactMatchByCol[colIndex] || this.exactMatch || fltType !== _const.INPUT;
        }

        /**
         * Check if passed row is valid
         * @param {Number} rowIndex Row index
         * @return {Boolean}
         */

    }, {
        key: 'isRowValid',
        value: function isRowValid(rowIndex) {
            return this.getValidRows().indexOf(rowIndex) !== -1;
        }

        /**
         * Check if passed row is visible
         * @param {Number} rowIndex Row index
         * @return {Boolean}
         */

    }, {
        key: 'isRowDisplayed',
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
        key: 'ignoresDiacritics',
        value: function ignoresDiacritics(colIndex) {
            var ignoreDiac = this.ignoreDiacritics;
            if ((0, _types.isArray)(ignoreDiac)) {
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
        key: 'getClearFilterText',
        value: function getClearFilterText(colIndex) {
            var clearText = this.clearFilterText;
            if ((0, _types.isArray)(clearText)) {
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
        key: 'eachCol',
        value: function eachCol() {
            var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _types.EMPTY_FN;
            var continueFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types.EMPTY_FN;
            var breakFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _types.EMPTY_FN;

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
    }, {
        key: 'eachRow',
        value: function eachRow() {
            var _this18 = this;

            var startIdx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.refRow;

            return function () {
                var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _types.EMPTY_FN;
                var continueFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types.EMPTY_FN;
                var breakFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _types.EMPTY_FN;

                var rows = _this18.dom().rows;
                var len = _this18.getRowsNb(true);
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
        key: 'isImported',
        value: function isImported(filePath) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'script';

            var imported = false,
                attr = type === 'script' ? 'src' : 'href',
                files = (0, _dom.tag)(doc, type);
            for (var i = 0, len = files.length; i < len; i++) {
                if ((0, _types.isUndef)(files[i][attr])) {
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
        key: 'import',
        value: function _import(fileId, filePath, callback) {
            var _this19 = this;

            var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'script';

            if (this.isImported(filePath, type)) {
                return;
            }
            var o = this,
                isLoaded = false,
                file = void 0,
                head = (0, _dom.tag)(doc, 'head')[0];

            if (type.toLowerCase() === 'link') {
                file = (0, _dom.createElm)('link', ['id', fileId], ['type', 'text/css'], ['rel', 'stylesheet'], ['href', filePath]);
            } else {
                file = (0, _dom.createElm)('script', ['id', fileId], ['type', 'text/javascript'], ['src', filePath]);
            }

            //Browser <> IE onload event works only for scripts, not for stylesheets
            file.onload = file.onreadystatechange = function () {
                if (!isLoaded && (!_this19.readyState || _this19.readyState === 'loaded' || _this19.readyState === 'complete')) {
                    isLoaded = true;
                    if (typeof callback === 'function') {
                        callback.call(null, o);
                    }
                }
            };
            file.onerror = function () {
                throw new Error('TableFilter could not load: ' + filePath);
            };
            head.appendChild(file);
        }

        /**
         * Check if table has filters grid
         * @return {Boolean}
         */

    }, {
        key: 'isInitialized',
        value: function isInitialized() {
            return this.initialized;
        }

        /**
         * Get list of filter IDs
         * @return {Array} List of filters ids
         */

    }, {
        key: 'getFiltersId',
        value: function getFiltersId() {
            return this.fltIds || [];
        }

        /**
         * Get filtered (valid) rows indexes
         * @param  {Boolean} reCalc Force calculation of filtered rows list
         * @return {Array}          List of row indexes
         */

    }, {
        key: 'getValidRows',
        value: function getValidRows(reCalc) {
            var _this20 = this;

            if (!reCalc) {
                return this.validRowsIndex;
            }

            // let nbRows = this.getRowsNb(true);
            this.validRowsIndex = [];
            // for (let k = this.refRow; k < nbRows; k++) {
            //     let r = this.dom().rows[k];
            //     if (!this.paging) {
            //         if (this.getRowDisplay(r) !== NONE) {
            //             this.validRowsIndex.push(r.rowIndex);
            //         }
            //     } else {
            //         if (r.getAttribute('validRow') === 'true' ||
            //             r.getAttribute('validRow') === null) {
            //             this.validRowsIndex.push(r.rowIndex);
            //         }
            //     }
            // }
            var eachRow = this.eachRow();
            eachRow(function (row) {
                // for (let k = this.refRow; k < nbRows; k++) {
                // let r = this.dom().rows[k];
                if (!_this20.paging) {
                    if (_this20.getRowDisplay(row) !== _const.NONE) {
                        _this20.validRowsIndex.push(row.rowIndex);
                    }
                } else {
                    if (row.getAttribute('validRow') === 'true' || row.getAttribute('validRow') === null) {
                        _this20.validRowsIndex.push(row.rowIndex);
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
        key: 'getFiltersRowIndex',
        value: function getFiltersRowIndex() {
            return this.filtersRowIndex;
        }

        /**
         * Get the index of the headers row
         * @return {Number}
         */

    }, {
        key: 'getHeadersRowIndex',
        value: function getHeadersRowIndex() {
            return this.headersRow;
        }

        /**
         * Get the row index from where the filtering process start (1st filterable
         * row)
         * @return {Number}
         */

    }, {
        key: 'getStartRowIndex',
        value: function getStartRowIndex() {
            return this.refRow;
        }

        /**
         * Get the index of the last row
         * @return {Number}
         */

    }, {
        key: 'getLastRowIndex',
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
        key: 'hasType',
        value: function hasType(colIndex) {
            var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            if (this.colTypes.length === 0) {
                return false;
            }
            var colType = this.colTypes[colIndex];
            if ((0, _types.isObj)(colType)) {
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
        key: 'getHeaderElement',
        value: function getHeaderElement(colIndex) {
            var table = this.gridLayout ? this.Mod.gridLayout.headTbl : this.dom();
            var tHead = (0, _dom.tag)(table, 'thead');
            var rowIdx = this.getHeadersRowIndex();
            var header = void 0;
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
        key: 'getHeadersText',
        value: function getHeadersText() {
            var _this21 = this;

            var excludeHiddenCols = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var headers = [];
            this.eachCol(function (j) {
                var header = _this21.getHeaderElement(j);
                var headerText = (0, _dom.getFirstTextNode)(header);
                headers.push(headerText);
            },
            // continue condition function
            function (j) {
                if (excludeHiddenCols && _this21.hasExtension('colsVisibility')) {
                    return _this21.extension('colsVisibility').isColHidden(j);
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
        key: 'getFilterType',
        value: function getFilterType(colIndex) {
            return this.filterTypes[colIndex];
        }

        /**
         * Get the total number of filterable rows
         * @return {Number}
         */

    }, {
        key: 'getFilterableRowsNb',
        value: function getFilterableRowsNb() {
            return this.getRowsNb(false);
        }

        /**
         * Return the total number of valid rows
         * @param {Boolean} [reCalc=false] Forces calculation of filtered rows
         * @return {Number}
         */

    }, {
        key: 'getValidRowsNb',
        value: function getValidRowsNb() {
            var reCalc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return this.getValidRows(reCalc).length;
        }

        /**
         * Return the working DOM element
         * @return {HTMLTableElement}
         */

    }, {
        key: 'dom',
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
        key: 'getDecimal',
        value: function getDecimal(colIndex) {
            var decimal = this.decimalSeparator;
            if (this.hasType(colIndex, [_const.FORMATTED_NUMBER])) {
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
        key: 'config',
        value: function config() {
            return this.cfg;
        }
    }]);

    return TableFilter;
}();

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Event emitter class
 */
var Emitter = exports.Emitter = function () {
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
        value: function emit(evt /*, args...*/) {
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
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseDropdown = __webpack_require__(69);

var _dom = __webpack_require__(10);

var _array = __webpack_require__(70);

var _string = __webpack_require__(21);

var _event = __webpack_require__(19);

var _const = __webpack_require__(15);

var _settings = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dropdown filter UI component
 * @export
 * @class Dropdown
 * @extends {BaseDropdown}
 */
var Dropdown = exports.Dropdown = function (_BaseDropdown) {
    _inherits(Dropdown, _BaseDropdown);

    /**
     * Creates an instance of Dropdown
     * @param {TableFilter} tf TableFilter instance
     */
    function Dropdown(tf) {
        _classCallCheck(this, Dropdown);

        // Configuration object
        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, tf, 'dropdown'));

        var f = _this.config;

        /**
         * Enable the reset filter option as first item
         * @type {Boolean}
         */
        _this.enableSlcResetFilter = (0, _settings.defaultsBool)(f.enable_slc_reset_filter, true);

        /**
         * Non empty option text
         * @type {String}
         */
        _this.nonEmptyText = (0, _settings.defaultsStr)(f.non_empty_text, '(Non empty)');

        /**
         * Tooltip text appearing on multiple select
         * @type {String}
         */
        _this.multipleSlcTooltip = (0, _settings.defaultsStr)(f.multiple_slc_tooltip, 'Use Ctrl/Cmd key for multiple selections');
        return _this;
    }

    /**
     * Drop-down filter focus event handler
     * @param {Event} e DOM Event
     * @private
     */


    _createClass(Dropdown, [{
        key: 'onSlcFocus',
        value: function onSlcFocus(e) {
            var elm = (0, _event.targetEvt)(e);
            var tf = this.tf;
            // select is populated when element has focus
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
        key: 'onSlcChange',
        value: function onSlcChange() {
            if (this.tf.onSlcChange) {
                this.tf.filter();
            }
        }

        /**
         * Refresh all drop-down filters
         */

    }, {
        key: 'refreshAll',
        value: function refreshAll() {
            var selectFlts = this.tf.getFiltersByType(_const.SELECT, true);
            var multipleFlts = this.tf.getFiltersByType(_const.MULTIPLE, true);
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
        key: 'init',
        value: function init(colIndex, isExternal, container) {
            var _this2 = this;

            var tf = this.tf;
            var col = tf.getFilterType(colIndex);
            var externalFltTgtId = isExternal ? tf.externalFltTgtIds[colIndex] : null;

            var slc = (0, _dom.createElm)(_const.SELECT, ['id', tf.buildFilterId(colIndex)], ['ct', colIndex], ['filled', '0']);

            if (col === _const.MULTIPLE) {
                slc.multiple = _const.MULTIPLE;
                slc.title = this.multipleSlcTooltip;
            }
            slc.className = col.toLowerCase() === _const.SELECT ? tf.fltCssClass : tf.fltMultiCssClass;

            //filter is appended in container element
            if (externalFltTgtId) {
                (0, _dom.elm)(externalFltTgtId).appendChild(slc);
            } else {
                container.appendChild(slc);
            }

            tf.fltIds.push(slc.id);

            if (!tf.loadFltOnDemand) {
                this.build(colIndex);
            } else {
                //1st option is created here since build isn't invoked
                var opt0 = (0, _dom.createOpt)(tf.getClearFilterText(colIndex), '');
                slc.appendChild(opt0);
            }

            (0, _event.addEvt)(slc, 'change', function () {
                return _this2.onSlcChange();
            });
            (0, _event.addEvt)(slc, 'focus', function (e) {
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

            /** @inherited */
            this.initialized = true;
        }

        /**
         * Build drop-down filter UI
         * @param  {Number}  colIndex    Column index
         * @param  {Boolean} isLinked    Enable linked filters behaviour
         */

    }, {
        key: 'build',
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

            // let slcId = tf.fltIds[colIndex];
            // let slc = elm(slcId);
            // let rows = tf.dom().rows;
            // let nbRows = tf.getRowsNb(true);

            var slc = tf.getFilterElement(colIndex);

            //custom select test
            /** @inherited */
            this.isCustom = tf.isCustomOptions(colIndex);

            //Retrieves custom values
            if (this.isCustom) {
                var customValues = tf.getCustomOptions(colIndex);
                this.opts = customValues[0];
                this.optsTxt = customValues[1];
            }

            //custom selects text
            var activeIdx = void 0;
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

            // for (let k = tf.refRow; k < nbRows; k++) {
            //     // always visible rows don't need to appear on selects as always
            //     // valid
            //     if (tf.excludeRows.indexOf(k) !== -1) {
            //         continue;
            //     }

            //     let cell = rows[k].cells,
            //         nchilds = cell.length;

            //     // checks if row has exact cell #
            //     if (nchilds !== tf.nbCells || this.isCustom) {
            //         continue;
            //     }

            //     if (isLinked && !this.isValidLinkedValue(k, activeIdx)) {
            //         continue;
            //     }

            //     let cellValue = tf.getCellValue(cell[colIndex]),
            //         //Vary Peter's patch
            //         cellString = matchCase(cellValue, tf.caseSensitive);

            //     // checks if celldata is already in array
            //     if (!has(this.opts, cellString, tf.caseSensitive)) {
            //         this.opts.push(cellValue);
            //     }

            //     if (isLinked && tf.disableExcludedOptions) {
            //         let filteredCol = filteredDataCol[colIndex];
            //         if (!filteredCol) {
            //             filteredCol = tf.getVisibleColumnValues(colIndex);
            //         }
            //         if (!has(filteredCol, cellString, tf.caseSensitive) &&
            //             !has(excludedOpts, cellString, tf.caseSensitive)) {
            //             excludedOpts.push(cellValue);
            //         }
            //     }
            // }

            var eachRow = tf.eachRow();
            eachRow(function (row) {
                var cellValue = tf.getCellValue(row.cells[colIndex]);
                //Vary Peter's patch
                var cellString = (0, _string.matchCase)(cellValue, tf.caseSensitive);

                // checks if celldata is already in array
                if (!(0, _array.has)(_this3.opts, cellString, tf.caseSensitive)) {
                    _this3.opts.push(cellValue);
                }

                if (isLinked && tf.disableExcludedOptions) {
                    var filteredCol = filteredDataCol[colIndex];
                    if (!filteredCol) {
                        filteredCol = tf.getVisibleColumnValues(colIndex);
                    }
                    if (!(0, _array.has)(filteredCol, cellString, tf.caseSensitive) && !(0, _array.has)(excludedOpts, cellString, tf.caseSensitive)) {
                        excludedOpts.push(cellValue);
                    }
                }
            },
            // continue conditions function
            function (row, k) {
                // excluded rows don't need to appear on selects as always valid
                if (tf.excludeRows.indexOf(k) !== -1) {
                    return true;
                }

                // checks if row has expected number of cells
                if (row.cells.length !== tf.nbCells || _this3.isCustom) {
                    return true;
                }

                if (isLinked && !_this3.isValidLinkedValue(k, activeIdx)) {
                    return true;
                }
            });

            //sort options
            this.opts = this.sortOptions(colIndex, this.opts);
            if (excludedOpts) {
                excludedOpts = this.sortOptions(colIndex, excludedOpts);
            }

            //populates drop-down
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
        key: 'addOptions',
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
                if (isLinked && tf.disableExcludedOptions && (0, _array.has)(excludedOpts, (0, _string.matchCase)(val, tf.caseSensitive), tf.caseSensitive)) {
                    isDisabled = true;
                }

                var opt = void 0;
                //fill select on demand
                if (tf.loadFltOnDemand && slcValue === this.opts[y] && tf.getFilterType(colIndex) === _const.SELECT) {
                    opt = (0, _dom.createOpt)(lbl, val, true);
                } else {
                    opt = (0, _dom.createOpt)(lbl, val, false);
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
        key: 'addFirstOption',
        value: function addFirstOption(slc) {
            var tf = this.tf;
            var colIdx = tf.getColumnIndexFromFilterId(slc.id);
            var opt0 = (0, _dom.createOpt)(!this.enableSlcResetFilter ? '' : tf.getClearFilterText(colIdx), '');
            if (!this.enableSlcResetFilter) {
                opt0.style.display = _const.NONE;
            }
            slc.appendChild(opt0);
            if (tf.enableEmptyOption) {
                var opt1 = (0, _dom.createOpt)(tf.emptyText, tf.emOperator);
                slc.appendChild(opt1);
            }
            if (tf.enableNonEmptyOption) {
                var opt2 = (0, _dom.createOpt)(tf.nonEmptyText, tf.nmOperator);
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
        key: 'selectOptions',
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

                if (option.value !== '' && (0, _array.has)(values, option.value, true)) {
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
        key: 'getValues',
        value: function getValues(colIndex) {
            var tf = this.tf;
            var slc = tf.getFilterElement(colIndex);
            var values = [];

            // IE >= 9 does not support the selectedOptions property :(
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
        key: 'destroy',
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
            this.initialized = false;
        }
    }]);

    return Dropdown;
}(_baseDropdown.BaseDropdown);

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DateType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sugarDate = __webpack_require__(72);

__webpack_require__(422);

var _feature = __webpack_require__(11);

var _types = __webpack_require__(3);

var _const = __webpack_require__(15);

var _root = __webpack_require__(16);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper for Sugar Date module providing datetime helpers and locales
 * @export
 * @class DateType
 */
var DateType = exports.DateType = function (_Feature) {
    _inherits(DateType, _Feature);

    /**
     * Creates an instance of DateType
     * @param {TableFilter} tf TableFilter instance
     */
    function DateType(tf) {
        _classCallCheck(this, DateType);

        /**
         * Global locale
         * @type {String}
         */
        var _this = _possibleConstructorReturn(this, (DateType.__proto__ || Object.getPrototypeOf(DateType)).call(this, tf, 'dateType'));

        _this.locale = tf.locale;

        /**
         * Sugar Date instance
         * @type {Object}
         */
        _this.datetime = _sugarDate.Date;

        _this.enable();
        return _this;
    }

    /**
     * Initialize DateType instance
     */


    _createClass(DateType, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            if (this.initialized) {
                return;
            }

            // Set global locale
            this.datetime.setLocale(this.locale);

            // Add formats from column types configuration if any
            this.addConfigFormats(this.tf.colTypes);

            this.emitter.on(['add-date-type-formats'], function (tf, types) {
                return _this2.addConfigFormats(types);
            });

            // Broadcast date-type initialization
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
        key: 'parse',
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
        key: 'isValid',
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
        key: 'getOptions',
        value: function getOptions(colIndex, types) {
            types = types || this.tf.colTypes;
            var colType = types[colIndex];
            return (0, _types.isObj)(colType) ? colType : {};
        }

        /**
         * Return the locale code for supplied column index as per configuration
         * or global setting
         * @param {Number} colIndex Column index
         * @returns {String} Locale code (ie: 'en-us')
         */

    }, {
        key: 'getLocale',
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
        key: 'addConfigFormats',
        value: function addConfigFormats() {
            var _this3 = this;

            var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            types.forEach(function (type, idx) {
                var options = _this3.getOptions(idx, types);
                if (options.type === _const.DATE && options.hasOwnProperty('format')) {
                    var locale = _this3.datetime.getLocale(options.locale || _this3.locale);
                    var formats = (0, _types.isArray)(options.format) ? options.format : [options.format];

                    // Sugar date module throws exceptions with locale.addFormat
                    try {
                        formats.forEach(function (format) {
                            locale.addFormat(format);
                        });
                    } catch (ex) {
                        _root.root.console.error(ex);
                    }
                }
            });
        }

        /**
         * Remove DateType instance
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this4 = this;

            if (!this.initialized) {
                return;
            }

            // TODO: remove added formats

            this.emitter.off(['add-date-type-formats'], function (tf, types) {
                return _this4.addConfigFormats(types);
            });

            this.initialized = false;
        }
    }]);

    return DateType;
}(_feature.Feature);

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.Help = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _event = __webpack_require__(19);

var _const = __webpack_require__(15);

var _root = __webpack_require__(16);

var _types = __webpack_require__(3);

var _settings = __webpack_require__(7);

var _toolbar = __webpack_require__(33);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIKI_URL = 'https://github.com/koalyptus/TableFilter/wiki/' + '4.-Filter-operators';
var WEBSITE_URL = 'http://koalyptus.github.io/TableFilter/';

/**
 * Help UI component
 */

var Help = exports.Help = function (_Feature) {
        _inherits(Help, _Feature);

        /**
         * Creates an instance of Help
         * @param {TableFilter} tf TableFilter instance
         */
        function Help(tf) {
                _classCallCheck(this, Help);

                var _this = _possibleConstructorReturn(this, (Help.__proto__ || Object.getPrototypeOf(Help)).call(this, tf, 'help'));

                var f = _this.config.help_instructions || {};

                /**
                 * ID of main custom container element
                 * @type {String}
                 */
                _this.tgtId = (0, _settings.defaultsStr)(f.target_id, null);

                /**
                 * ID of custom container element for instructions
                 * @type {String}
                 */
                _this.contTgtId = (0, _settings.defaultsStr)(f.container_target_id, null);

                /**
                 * Instructions text (accepts HTML)
                 * @type {String}
                 */
                _this.instrText = !(0, _types.isEmpty)(f.text) ? f.text : 'Use the filters above each column to filter and limit table ' + 'data. Advanced searches can be performed by using the following ' + 'operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, ' + '<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, ' + '<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, ' + '<b>rgx:</b><br/><a href="' + WIKI_URL + '" target="_blank">' + 'Learn more</a><hr/>';

                /**
                 * Instructions HTML
                 * @type {String}
                 */
                _this.instrHtml = (0, _settings.defaultsStr)(f.html, null);

                /**
                 * Help button text ('?')
                 * @type {String}
                 */
                _this.btnText = (0, _settings.defaultsStr)(f.btn_text, '?');

                /**
                 * Custom help button HTML
                 * @type {String}
                 */
                _this.btnHtml = (0, _settings.defaultsStr)(f.btn_html, null);

                /**
                 * Css class for help button
                 * @type {String}
                 */
                _this.btnCssClass = (0, _settings.defaultsStr)(f.btn_css_class, 'helpBtn');

                /**
                 * Css class for help container element
                 * @type {String}
                 */
                _this.contCssClass = (0, _settings.defaultsStr)(f.container_css_class, 'helpCont');

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
                _this.toolbarPosition = (0, _settings.defaultsStr)(f.toolbar_position, _toolbar.RIGHT);

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
                key: 'onMouseup',
                value: function onMouseup(evt) {
                        var targetElm = (0, _event.targetEvt)(evt);

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
                key: 'init',
                value: function init() {
                        var _this2 = this;

                        if (this.initialized) {
                                return;
                        }

                        this.emitter.emit('initializing-feature', this, !(0, _types.isNull)(this.tgtId));

                        var tf = this.tf;

                        var btn = (0, _dom.createElm)('span');
                        var cont = (0, _dom.createElm)('div');

                        this.boundMouseup = this.onMouseup.bind(this);

                        //help button is added to defined element
                        var targetEl = !this.tgtId ? tf.feature('toolbar').container(this.toolbarPosition) : (0, _dom.elm)(this.tgtId);
                        targetEl.appendChild(btn);

                        var divContainer = !this.contTgtId ? btn : (0, _dom.elm)(this.contTgtId);

                        if (!this.btnHtml) {
                                divContainer.appendChild(cont);
                                var helplink = (0, _dom.createElm)('a', ['href', 'javascript:void(0);']);
                                helplink.className = this.btnCssClass;
                                helplink.appendChild((0, _dom.createText)(this.btnText));
                                btn.appendChild(helplink);
                                (0, _event.addEvt)(helplink, 'click', function () {
                                        return _this2.toggle();
                                });
                        } else {
                                btn.innerHTML = this.btnHtml;
                                var helpEl = btn.firstChild;
                                (0, _event.addEvt)(helpEl, 'click', function () {
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
                        (0, _event.addEvt)(cont, 'click', function () {
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
                key: 'toggle',
                value: function toggle() {
                        // check only if explicitily disabled as in this case undefined
                        // signifies the help feature is enabled by default
                        if (!this.isEnabled()) {
                                return;
                        }

                        // ensure mouseup event handler is removed
                        (0, _event.removeEvt)(_root.root, 'mouseup', this.boundMouseup);

                        var divDisplay = this.cont.style.display;
                        if (divDisplay === '' || divDisplay === _const.NONE) {
                                this.cont.style.display = 'inline';
                                (0, _event.addEvt)(_root.root, 'mouseup', this.boundMouseup);
                        } else {
                                this.cont.style.display = _const.NONE;
                        }
                }

                /**
                 * Remove help UI
                 */

        }, {
                key: 'destroy',
                value: function destroy() {
                        if (!this.initialized) {
                                return;
                        }
                        (0, _dom.removeElm)(this.btn);
                        this.btn = null;

                        (0, _dom.removeElm)(this.cont);
                        this.cont = null;

                        this.boundMouseup = null;
                        this.initialized = false;
                }
        }]);

        return Help;
}(_feature.Feature);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.State = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _hash = __webpack_require__(114);

var _storage = __webpack_require__(115);

var _string = __webpack_require__(21);

var _types = __webpack_require__(3);

var _settings = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Features state object persistable with localStorage, cookie or URL hash
 *
 * @export
 * @class State
 * @extends {Feature}
 */
var State = exports.State = function (_Feature) {
    _inherits(State, _Feature);

    /**
     * Creates an instance of State
     * @param {TableFilter} tf TableFilter instance
     */
    function State(tf) {
        _classCallCheck(this, State);

        var _this = _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this, tf, 'state'));

        var cfg = _this.config.state || {};

        /**
         * Determines whether state is persisted with URL hash
         * @type {Boolean}
         */
        _this.enableHash = cfg === true || (0, _types.isArray)(cfg.types) && cfg.types.indexOf('hash') !== -1;

        /**
         * Determines whether state is persisted with localStorage
         * @type {Boolean}
         */
        _this.enableLocalStorage = (0, _types.isArray)(cfg.types) && cfg.types.indexOf('local_storage') !== -1;

        /**
         * Determines whether state is persisted with localStorage
         * @type {Boolean}
         */
        _this.enableCookie = (0, _types.isArray)(cfg.types) && cfg.types.indexOf('cookie') !== -1;

        /**
         * Persist filters values, enabled by default
         * @type {Boolean}
         */
        _this.persistFilters = (0, _settings.defaultsBool)(cfg.filters, true);

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
        _this.cookieDuration = (0, _settings.defaultsNb)(parseInt(cfg.cookie_duration, 10), 87600);

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
        key: 'init',
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
                this.hash = new _hash.Hash(this);
                this.hash.init();
            }
            if (this.enableStorage) {
                this.storage = new _storage.Storage(this);
                this.storage.init();
            }

            /**
             * @inherited
             */
            this.initialized = true;
        }

        /**
         * Update state object based on current features state
         */

    }, {
        key: 'update',
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
                    var key = '' + _this3.prfxCol + idx;

                    if ((0, _types.isString)(val) && (0, _string.isEmpty)(val)) {
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
                if ((0, _types.isNull)(this.pageNb)) {
                    state[this.pageNbKey] = undefined;
                } else {
                    state[this.pageNbKey] = this.pageNb;
                }
            }

            if (this.persistPageLength) {
                if ((0, _types.isNull)(this.pageLength)) {
                    state[this.pageLengthKey] = undefined;
                } else {
                    state[this.pageLengthKey] = this.pageLength;
                }
            }

            if (this.persistSort) {
                if (!(0, _types.isNull)(this.sort)) {
                    // Remove previuosly sorted column
                    Object.keys(state).forEach(function (key) {
                        if (key.indexOf(_this3.prfxCol) !== -1 && state[key]) {
                            state[key].sort = undefined;
                        }
                    });

                    var key = '' + this.prfxCol + this.sort.column;
                    state[key] = state[key] || {};
                    state[key].sort = { descending: this.sort.descending };
                }
            }

            if (this.persistColsVisibility) {
                if (!(0, _types.isNull)(this.hiddenCols)) {
                    // Clear previuosly hidden columns
                    Object.keys(state).forEach(function (key) {
                        if (key.indexOf(_this3.prfxCol) !== -1 && state[key]) {
                            state[key].hidden = undefined;
                        }
                    });

                    this.hiddenCols.forEach(function (colIdx) {
                        var key = '' + _this3.prfxCol + colIdx;
                        state[key] = state[key] || {};
                        state[key].hidden = true;
                    });
                }
            }

            if (this.persistFiltersVisibility) {
                if ((0, _types.isNull)(this.filtersVisibility)) {
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
        key: 'updatePage',
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
        key: 'updatePageLength',
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
        key: 'updateSort',
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
        key: 'updateColsVisibility',
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
        key: 'updateFiltersVisibility',
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
        key: 'override',
        value: function override(state) {
            this.state = state;
        }

        /**
         * Sync stored features state
         */

    }, {
        key: 'sync',
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
        key: 'overrideAndSync',
        value: function overrideAndSync(state) {
            // To prevent state to react to features changes, state is temporarily
            // disabled
            this.disable();
            // State is overriden with passed state object
            this.override(state);
            // New hash state is applied to features
            this.sync();
            // State is re-enabled
            this.enable();
        }

        /**
         * Sync filters with stored values and filter table
         *
         * @private
         */

    }, {
        key: '_syncFilters',
        value: function _syncFilters() {
            var _this4 = this;

            if (!this.persistFilters) {
                return;
            }
            var state = this.state;
            var tf = this.tf;

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
        key: '_syncSort',
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
                    if (!(0, _types.isUndef)(state[key].sort)) {
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
        key: '_syncColsVisibility',
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
                    if (!(0, _types.isUndef)(state[key].hidden)) {
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
        key: '_syncFiltersVisibility',
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
        key: 'destroy',
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
}(_feature.Feature);

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Hash = exports.hasHashChange = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(19);

var _root = __webpack_require__(16);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSON = _root.root.JSON;
var location = _root.root.location;
var decodeURIComponent = _root.root.decodeURIComponent;
var encodeURIComponent = _root.root.encodeURIComponent;

/**
 * Checks if browser has onhashchange event
 */
var hasHashChange = exports.hasHashChange = function hasHashChange() {
    var docMode = _root.root.documentMode;
    return 'onhashchange' in _root.root && (docMode === undefined || docMode > 7);
};

/**
 * Manages state via URL hash changes
 *
 * @export
 * @class Hash
 */

var Hash = exports.Hash = function () {

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
        key: 'init',
        value: function init() {
            var _this = this;

            if (!hasHashChange()) {
                return;
            }

            this.lastHash = location.hash;
            //Store a bound sync wrapper
            this.boundSync = this.sync.bind(this);
            this.emitter.on(['state-changed'], function (tf, state) {
                return _this.update(state);
            });
            this.emitter.on(['initialized'], this.boundSync);
            (0, _event.addEvt)(_root.root, 'hashchange', this.boundSync);
        }

        /**
         * Updates the URL hash based on a state change
         *
         * @param {State} state Instance of State
         */

    }, {
        key: 'update',
        value: function update(state) {
            var hash = '#' + encodeURIComponent(JSON.stringify(state));
            if (this.lastHash === hash) {
                return;
            }

            location.hash = hash;
            this.lastHash = hash;
        }

        /**
         * Converts a URL hash into a state JSON object
         *
         * @param {String} hash URL hash fragment
         * @returns {Object} JSON object
         */

    }, {
        key: 'parse',
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
        key: 'sync',
        value: function sync() {
            var state = this.parse(location.hash);
            if (!state) {
                return;
            }
            // override current state with persisted one and sync features
            this.state.overrideAndSync(state);
        }

        /**
         * Release Hash event subscriptions and clear fields
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this2 = this;

            this.emitter.off(['state-changed'], function (tf, state) {
                return _this2.update(state);
            });
            this.emitter.off(['initialized'], this.boundSync);
            (0, _event.removeEvt)(_root.root, 'hashchange', this.boundSync);

            this.state = null;
            this.lastHash = null;
            this.emitter = null;
        }
    }]);

    return Hash;
}();

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Storage = exports.hasStorage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cookie = __webpack_require__(116);

var _cookie2 = _interopRequireDefault(_cookie);

var _root = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSON = _root.root.JSON;
var localStorage = _root.root.localStorage;
var location = _root.root.location;

/**
 * Checks if browser has Storage feature
 */
var hasStorage = exports.hasStorage = function hasStorage() {
    return 'Storage' in _root.root;
};

/**
 * Stores the features state in browser's local storage or cookie
 *
 * @export
 * @class Storage
 */

var Storage = exports.Storage = function () {

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
        key: 'init',
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
        key: 'save',
        value: function save(state) {
            if (this.enableLocalStorage) {
                localStorage[this.getKey()] = JSON.stringify(state);
            } else {
                _cookie2.default.write(this.getKey(), JSON.stringify(state), this.duration);
            }
        }

        /**
         * Turns stored string into a State JSON object
         *
         *  @returns {Object} JSON object
         */

    }, {
        key: 'retrieve',
        value: function retrieve() {
            var state = null;
            if (this.enableLocalStorage) {
                state = localStorage[this.getKey()];
            } else {
                state = _cookie2.default.read(this.getKey());
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
        key: 'remove',
        value: function remove() {
            if (this.enableLocalStorage) {
                localStorage.removeItem(this.getKey());
            } else {
                _cookie2.default.remove(this.getKey());
            }
        }

        /**
         * Applies persisted state to features
         */

    }, {
        key: 'sync',
        value: function sync() {
            var state = this.retrieve();
            if (!state) {
                return;
            }
            // override current state with persisted one and sync features
            this.state.overrideAndSync(state);
        }

        /**
         * Returns the storage key
         *
         * @returns {String} Key
         */

    }, {
        key: 'getKey',
        value: function getKey() {
            return JSON.stringify({
                key: this.tf.prfxTf + '_' + this.tf.id,
                path: location.pathname
            });
        }

        /**
         * Release Storage event subscriptions and clear fields
         */

    }, {
        key: 'destroy',
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
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _root = __webpack_require__(16);

/**
 * Cookie utilities
 */

var doc = _root.root.document;

exports.default = {

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
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GridLayout = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _event = __webpack_require__(19);

var _string = __webpack_require__(21);

var _const = __webpack_require__(15);

var _settings = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Grid layout, table with fixed headers
 */
var GridLayout = exports.GridLayout = function (_Feature) {
    _inherits(GridLayout, _Feature);

    /**
     * Creates an instance of GridLayout
     * @param {TableFilter} tf TableFilter instance
     */
    function GridLayout(tf) {
        _classCallCheck(this, GridLayout);

        var _this = _possibleConstructorReturn(this, (GridLayout.__proto__ || Object.getPrototypeOf(GridLayout)).call(this, tf, 'gridLayout'));

        var f = _this.config.grid_layout || {};

        /**
         * Grid-layout container width as CSS string
         * @type {String}
         */
        _this.width = (0, _settings.defaultsStr)(f.width, null);

        /**
         * Grid-layout container height as CSS string
         * @type {String}
         */
        _this.height = (0, _settings.defaultsStr)(f.height, null);

        /**
         * Css class for main container element
         * @type {String}
         */
        _this.mainContCssClass = (0, _settings.defaultsStr)(f.cont_css_class, 'grd_Cont');

        /**
         * Css class for body table container element
         * @type {String}
         */
        _this.contCssClass = (0, _settings.defaultsStr)(f.tbl_cont_css_class, 'grd_tblCont');

        /**
         * Css class for headers table container element
         * @type {String}
         */
        _this.headContCssClass = (0, _settings.defaultsStr)(f.tbl_head_css_class, 'grd_headTblCont');

        /**
         * Css class for toolbar container element (rows counter, paging etc.)
         * @type {String}
         */
        _this.infDivCssClass = (0, _settings.defaultsStr)(f.inf_grid_css_class, 'grd_inf');

        /**
         * Index of the headers row, default: 0
         * @type {Number}
         */
        _this.headRowIndex = (0, _settings.defaultsNb)(f.headers_row_index, 0);

        /**
         * Collection of the header row indexes to be moved into headers table
         * @type {Array}
         */
        _this.headRows = (0, _settings.defaultsArr)(f.headers_rows, [0]);

        /**
         * Enable or disable column filters generation, default: true
         * @type {Boolean}
         */
        _this.filters = (0, _settings.defaultsBool)(f.filters, true);

        /**
         * Enable or disable column headers, default: false
         * @type {Boolean}
         */
        _this.noHeaders = Boolean(f.no_headers);

        /**
         * Grid-layout default column widht as CSS string
         * @type {String}
         */
        _this.defaultColWidth = (0, _settings.defaultsStr)(f.default_col_width, '100px');

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
        _this.tblHasColTag = (0, _dom.tag)(tf.dom(), 'col').length > 0 ? true : false;

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
        _this.headTbl = null;

        // filters flag at TF level
        tf.fltGrid = _this.filters;
        return _this;
    }

    /**
     * Generates a grid with fixed headers
     * TODO: reduce size of init by extracting single purposed methods
     */


    _createClass(GridLayout, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            var tf = this.tf;
            var tbl = tf.dom();

            if (this.initialized) {
                return;
            }

            // Override relevant TableFilter properties
            this.setOverrides();

            // Assign default column widths
            this.setDefaultColWidths();

            //Main container: it will contain all the elements
            this.tblMainCont = this.createContainer('div', this.mainContCssClass);
            if (this.width) {
                this.tblMainCont.style.width = this.width;
            }
            tbl.parentNode.insertBefore(this.tblMainCont, tbl);

            //Table container: div wrapping content table
            this.tblCont = this.createContainer('div', this.contCssClass);
            this.setConfigWidth(this.tblCont);
            if (this.height) {
                this.tblCont.style.height = this.height;
            }
            tbl.parentNode.insertBefore(this.tblCont, tbl);
            var t = (0, _dom.removeElm)(tbl);
            this.tblCont.appendChild(t);

            //In case table width is expressed in %
            if (tbl.style.width === '') {
                var tblW = this.initialTableWidth();
                tbl.style.width = ((0, _string.contains)('%', tblW) ? tbl.clientWidth : tblW) + 'px';
            }

            var d = (0, _dom.removeElm)(this.tblCont);
            this.tblMainCont.appendChild(d);

            //Headers table container: div wrapping headers table
            this.headTblCont = this.createContainer('div', this.headContCssClass);

            //Headers table
            this.headTbl = (0, _dom.createElm)('table');
            var tH = (0, _dom.createElm)('tHead');

            //1st row should be headers row, ids are added if not set
            //Those ids are used by the sort feature
            var hRow = tbl.rows[this.headRowIndex];
            var sortTriggers = this.getSortTriggerIds(hRow);

            //Filters row is created
            var filtersRow = this.createFiltersRow();

            //Headers row are moved from content table to headers table
            this.setHeadersRow(tH);

            this.headTbl.appendChild(tH);
            if (tf.filtersRowIndex === 0) {
                tH.insertBefore(filtersRow, hRow);
            } else {
                tH.appendChild(filtersRow);
            }

            this.headTblCont.appendChild(this.headTbl);
            this.tblCont.parentNode.insertBefore(this.headTblCont, this.tblCont);

            //THead needs to be removed in content table for sort feature
            var thead = (0, _dom.tag)(tbl, 'thead');
            if (thead.length > 0) {
                tbl.removeChild(thead[0]);
            }

            // ensure table layout is always set even if already set in css
            // definitions, potentially with custom css class this could be lost
            this.headTbl.style.tableLayout = 'fixed';
            tbl.style.tableLayout = 'fixed';

            //content table without headers needs col widths to be reset
            tf.setColWidths(this.headTbl);

            //Headers container width
            this.headTbl.style.width = tbl.style.width;
            //

            //scroll synchronisation
            (0, _event.addEvt)(this.tblCont, 'scroll', function (evt) {
                var elm = (0, _event.targetEvt)(evt);
                var scrollLeft = elm.scrollLeft;
                _this2.headTblCont.scrollLeft = scrollLeft;
                //New pointerX calc taking into account scrollLeft
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
            });

            // TODO: Trigger a custom event handled by sort extension
            var sort = tf.extension('sort');
            if (sort) {
                sort.asyncSort = true;
                sort.triggerIds = sortTriggers;
            }

            //Col elements are enough to keep column widths after sorting and
            //filtering
            this.setColumnElements();

            if (tf.popupFilters) {
                filtersRow.style.display = _const.NONE;
            }

            /** @inherited */
            this.initialized = true;
        }

        /**
         * Overrides TableFilter instance properties to adjust to grid layout mode
         * @private
         */

    }, {
        key: 'setOverrides',
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
        key: 'setDefaultColWidths',
        value: function setDefaultColWidths() {
            var _this3 = this;

            var tf = this.tf;
            if (tf.colWidths.length > 0) {
                return;
            }

            tf.eachCol(function (k) {
                var colW = void 0;
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
        key: 'initialTableWidth',
        value: function initialTableWidth() {
            var tbl = this.tf.dom();
            var width = void 0; //initial table width

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
        key: 'createContainer',
        value: function createContainer(tag, className) {
            var element = (0, _dom.createElm)(tag);
            element.className = className;
            return element;
        }

        /**
         * Creates filters row with cells
         * @returns {HTMLTableRowElement}
         * @private
         */

    }, {
        key: 'createFiltersRow',
        value: function createFiltersRow() {
            var _this4 = this;

            var tf = this.tf;
            var filtersRow = (0, _dom.createElm)('tr');
            if (this.filters && tf.fltGrid) {
                tf.externalFltTgtIds = [];
                tf.eachCol(function (j) {
                    var fltTdId = '' + (tf.prfxFlt + j + _this4.prfxGridFltTd + tf.id);
                    var cl = (0, _dom.createElm)(tf.fltCellTag, ['id', fltTdId]);
                    filtersRow.appendChild(cl);
                    tf.externalFltTgtIds[j] = fltTdId;
                });
            }
            return filtersRow;
        }

        /**
         * Generates column elements if necessary and assigns their widths
         * @private
         */

    }, {
        key: 'setColumnElements',
        value: function setColumnElements() {
            var tf = this.tf;
            var cols = (0, _dom.tag)(tf.dom(), 'col');
            this.tblHasColTag = cols.length > 0;

            for (var k = tf.getCellsNb() - 1; k >= 0; k--) {
                var col = void 0;

                if (!this.tblHasColTag) {
                    col = (0, _dom.createElm)('col');
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
        key: 'setHeadersRow',
        value: function setHeadersRow(tableHead) {
            if (this.noHeaders) {
                // Handle table with no headers, assuming here headers do not
                // exist
                tableHead.appendChild((0, _dom.createElm)('tr'));
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
        key: 'setConfigWidth',
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
        key: 'getSortTriggerIds',
        value: function getSortTriggerIds(row) {
            var _this5 = this;

            var tf = this.tf;
            var sortTriggers = [];
            tf.eachCol(function (n) {
                var c = row.cells[n];
                var thId = c.getAttribute('id');
                if (!thId || thId === '') {
                    thId = _this5.prfxGridTh + n + '_' + tf.id;
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
        key: 'destroy',
        value: function destroy() {
            var tf = this.tf;
            var tbl = tf.dom();

            if (!this.initialized) {
                return;
            }
            var t = (0, _dom.removeElm)(tbl);
            this.tblMainCont.parentNode.insertBefore(t, this.tblMainCont);
            (0, _dom.removeElm)(this.tblMainCont);

            this.tblMainCont = null;
            this.headTblCont = null;
            this.headTbl = null;
            this.tblCont = null;

            tbl.outerHTML = this.sourceTblHtml;
            //needed to keep reference of table element for future usage
            this.tf.tbl = (0, _dom.elm)(tf.id);

            this.initialized = false;
        }
    }]);

    return GridLayout;
}(_feature.Feature);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Loader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _types = __webpack_require__(3);

var _root = __webpack_require__(16);

var _const = __webpack_require__(15);

var _settings = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVENTS = ['before-filtering', 'before-populating-filter', 'before-page-change', 'before-clearing-filters', 'before-page-length-change', 'before-reset-page', 'before-reset-page-length', 'before-loading-extensions', 'before-loading-themes'];

/**
 * Activity indicator
 *
 * @export
 * @class Loader
 * @extends {Feature}
 */

var Loader = exports.Loader = function (_Feature) {
    _inherits(Loader, _Feature);

    /**
     * Creates an instance of Loader.
     *
     * @param {TableFilter} tf TableFilter instance
     */
    function Loader(tf) {
        _classCallCheck(this, Loader);

        var _this = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this, tf, 'loader'));

        var f = _this.config.loader || {};

        /**
         * ID of custom container element
         * @type {String}
         */
        _this.targetId = (0, _settings.defaultsStr)(f.target_id, null);

        /**
         * Loader container DOM element
         * @type {DOMElement}
         */
        _this.cont = null;

        /**
         * Text displayed when indicator is visible
         * @type {String}
         */
        _this.text = (0, _settings.defaultsStr)(f.text, 'Loading...');

        /**
         * Custom HTML injected in Loader's container element
         * @type {String}
         */
        _this.html = (0, _settings.defaultsStr)(f.html, null);

        /**
         * Css class for Loader's container element
         * @type {String}
         */
        _this.cssClass = (0, _settings.defaultsStr)(f.css_class, 'loader');

        /**
         * Close delay in milliseconds
         * @type {Number}
         */
        _this.closeDelay = 250;

        /**
         * Callback fired when loader is displayed
         * @type {Function}
         */
        _this.onShow = (0, _settings.defaultsFn)(f.on_show_loader, _types.EMPTY_FN);

        /**
         * Callback fired when loader is closed
         * @type {Function}
         */
        _this.onHide = (0, _settings.defaultsFn)(f.on_hide_loader, _types.EMPTY_FN);
        return _this;
    }

    /**
     * Initializes Loader instance
     */


    _createClass(Loader, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            if (this.initialized) {
                return;
            }

            var tf = this.tf;
            var emitter = this.emitter;

            var containerDiv = (0, _dom.createElm)('div');
            containerDiv.className = this.cssClass;

            var targetEl = !this.targetId ? tf.dom().parentNode : (0, _dom.elm)(this.targetId);
            if (!this.targetId) {
                targetEl.insertBefore(containerDiv, tf.dom());
            } else {
                targetEl.appendChild(containerDiv);
            }
            this.cont = containerDiv;
            if (!this.html) {
                this.cont.appendChild((0, _dom.createText)(this.text));
            } else {
                this.cont.innerHTML = this.html;
            }

            this.show(_const.NONE);

            // Subscribe to events
            emitter.on(EVENTS, function () {
                return _this2.show('');
            });
            emitter.on(EVENTS, function () {
                return _this2.show(_const.NONE);
            });

            /** @inherited */
            this.initialized = true;
        }

        /**
         * Shows or hides activity indicator
         * @param {String} Two possible values: '' or 'none'
         */

    }, {
        key: 'show',
        value: function show(p) {
            var _this3 = this;

            if (!this.isEnabled()) {
                return;
            }

            var displayLoader = function displayLoader() {
                if (!_this3.cont) {
                    return;
                }
                if (p !== _const.NONE) {
                    _this3.onShow(_this3);
                }
                _this3.cont.style.display = p;
                if (p === _const.NONE) {
                    _this3.onHide(_this3);
                }
            };

            var t = p === _const.NONE ? this.closeDelay : 1;
            _root.root.setTimeout(displayLoader, t);
        }

        /**
         * Removes feature
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this4 = this;

            if (!this.initialized) {
                return;
            }

            var emitter = this.emitter;

            (0, _dom.removeElm)(this.cont);
            this.cont = null;

            // Unsubscribe to events
            emitter.off(EVENTS, function () {
                return _this4.show('');
            });
            emitter.off(EVENTS, function () {
                return _this4.show(_const.NONE);
            });

            this.initialized = false;
        }
    }]);

    return Loader;
}(_feature.Feature);

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HighlightKeyword = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(10);

var _types = __webpack_require__(3);

var _string = __webpack_require__(21);

var _settings = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Highlight matched keywords upon filtering
 *
 * @export
 * @class HighlightKeyword
 */
var HighlightKeyword = exports.HighlightKeyword = function () {

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
        this.highlightCssClass = (0, _settings.defaultsStr)(f.highlight_css_class, 'keyword');

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
        key: 'init',
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
        key: 'highlight',
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
                        before = (0, _dom.createText)(nv.substr(0, termIdx)),
                            value = nv.substr(termIdx, term.length),
                            after = (0, _dom.createText)(nv.substr(termIdx + term.length)),
                            text = (0, _dom.createText)(value),
                            container = (0, _dom.createElm)('span');
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
        key: 'unhighlight',
        value: function unhighlight(term, cssClass) {
            var highlightedNodes = this.tf.dom().querySelectorAll('.' + cssClass);
            for (var i = 0; i < highlightedNodes.length; i++) {
                var n = highlightedNodes[i];
                var nodeVal = (0, _dom.getText)(n);

                if (nodeVal.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
                    var parentNode = n.parentNode;
                    parentNode.replaceChild((0, _dom.createText)(nodeVal), n);
                    parentNode.normalize();
                }
            }
        }

        /**
         * Clear all occurrences of highlighted nodes
         */

    }, {
        key: 'unhighlightAll',
        value: function unhighlightAll() {
            var _this2 = this;

            if (!this.tf.highlightKeywords) {
                return;
            }
            // iterate filters values to unhighlight all values
            this.tf.getFiltersValue().forEach(function (val) {
                if ((0, _types.isArray)(val)) {
                    val.forEach(function (item) {
                        return _this2.unhighlight(item, _this2.highlightCssClass);
                    });
                } else {
                    _this2.unhighlight(val, _this2.highlightCssClass);
                }
            });
        }

        /**  Remove feature */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this3 = this;

            this.emitter.off(['before-filtering', 'destroy'], function () {
                return _this3.unhighlightAll();
            });
            this.emitter.off(['highlight-keyword'], function (tf, cell, term) {
                return _this3._processTerm(cell, term);
            });
        }

        /**
         * Ensure filtering operators are handled before highlighting any match
         * @param {any} Table cell to look searched term into
         * @param {any} Searched termIdx
         */

    }, {
        key: '_processTerm',
        value: function _processTerm(cell, term) {
            var tf = this.tf;
            var reLk = new RegExp((0, _string.rgxEsc)(tf.lkOperator));
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
                term = (0, _dom.getText)(cell);
            }

            if (term === '') {
                return;
            }

            this.highlight(cell, term, this.highlightCssClass);
        }
    }]);

    return HighlightKeyword;
}();

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PopupFilter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _types = __webpack_require__(3);

var _dom = __webpack_require__(10);

var _event = __webpack_require__(19);

var _const = __webpack_require__(15);

var _root = __webpack_require__(16);

var _settings = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Pop-up filter component
 * @export
 * @class PopupFilter
 * @extends {Feature}
 */
var PopupFilter = exports.PopupFilter = function (_Feature) {
    _inherits(PopupFilter, _Feature);

    /**
     * Creates an instance of PopupFilter
     * @param {TableFilter} tf TableFilter instance
     */
    function PopupFilter(tf) {
        _classCallCheck(this, PopupFilter);

        // Configuration object
        var _this = _possibleConstructorReturn(this, (PopupFilter.__proto__ || Object.getPrototypeOf(PopupFilter)).call(this, tf, 'popupFilters'));

        var f = _this.config.popup_filters || {};

        /**
         * Close active popup filter upon filtering, enabled by default
         * @type {Boolean}
         */
        _this.closeOnFiltering = (0, _settings.defaultsBool)(f.close_on_filtering, true);

        /**
         * Filter icon path
         * @type {String}
         */
        _this.iconPath = (0, _settings.defaultsStr)(f.image, tf.themesPath + 'icn_filter.gif');

        /**
         * Active filter icon path
         * @type {string}
         */
        _this.activeIconPath = (0, _settings.defaultsStr)(f.image_active, tf.themesPath + 'icn_filterActive.gif');

        /**
         * HTML for the filter icon
         * @type {string}
         */
        _this.iconHtml = (0, _settings.defaultsStr)(f.image_html, '<img src="' + _this.iconPath + '" alt="Column filter" />');

        /**
         * Css class assigned to the popup container element
         * @type {String}
         */
        _this.placeholderCssClass = (0, _settings.defaultsStr)(f.placeholder_css_class, 'popUpPlaceholder');

        /**
         * Css class assigned to filter container element
         * @type {String}
         */
        _this.containerCssClass = (0, _settings.defaultsStr)(f.div_css_class, 'popUpFilter');

        /**
         * Ensure filter's container element width matches column width, enabled
         * by default
         * @type {Boolean}
         */
        _this.adjustToContainer = (0, _settings.defaultsBool)(f.adjust_to_container, true);

        /**
         * Callback fired before a popup filter is opened
         * @type {Function}
         */
        _this.onBeforeOpen = (0, _settings.defaultsFn)(f.on_before_popup_filter_open, _types.EMPTY_FN);

        /**
         * Callback fired after a popup filter is opened
         * @type {Function}
         */
        _this.onAfterOpen = (0, _settings.defaultsFn)(f.on_after_popup_filter_open, _types.EMPTY_FN);

        /**
         * Callback fired before a popup filter is closed
         * @type {Function}
         */
        _this.onBeforeClose = (0, _settings.defaultsFn)(f.on_before_popup_filter_close, _types.EMPTY_FN);

        /**
         * Callback fired after a popup filter is closed
         * @type {Function}
         */
        _this.onAfterClose = (0, _settings.defaultsFn)(f.on_after_popup_filter_close, _types.EMPTY_FN);

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
        _this.fltElms = (0, _settings.defaultsArr)(_this.filtersCache, []);

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
        key: 'onClick',
        value: function onClick(evt) {
            var elm = (0, _event.targetEvt)(evt).parentNode;
            var colIndex = parseInt(elm.getAttribute('ci'), 10);

            this.closeAll(colIndex);
            this.toggle(colIndex);

            if (this.adjustToContainer) {
                var cont = this.fltElms[colIndex],
                    header = this.tf.getHeaderElement(colIndex),
                    headerWidth = header.clientWidth * 0.95;
                cont.style.width = parseInt(headerWidth, 10) + 'px';
            }
            (0, _event.cancelEvt)(evt);
            (0, _event.stopEvt)(evt);
        }

        /**
         * Mouse-up event handler handling popup filter auto-close behaviour
         * @private
         */

    }, {
        key: 'onMouseup',
        value: function onMouseup(evt) {
            if (this.activeFilterIdx === -1) {
                return;
            }
            var targetElm = (0, _event.targetEvt)(evt);
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
        key: 'init',
        value: function init() {
            var _this2 = this;

            if (this.initialized) {
                return;
            }

            var tf = this.tf;

            // Enable external filters
            tf.externalFltTgtIds = [''];

            // Override filters row index supplied by configuration
            tf.filtersRowIndex = 0;

            // Override headers row index if no grouped headers
            // TODO: Because of the filters row generation, headers row index needs
            // adjusting: prevent useless row generation
            if (tf.headersRow <= 1 && isNaN(tf.config().headers_row_index)) {
                tf.headersRow = 0;
            }

            // Adjust headers row index for grid-layout mode
            // TODO: Because of the filters row generation, headers row index needs
            // adjusting: prevent useless row generation
            if (tf.gridLayout) {
                tf.headersRow--;
                this.buildIcons();
            }

            // subscribe to events
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
        key: 'reset',
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
        key: 'buildIcons',
        value: function buildIcons() {
            var _this3 = this;

            var tf = this.tf;

            // TODO: Because of the filters row generation, headers row index needs
            // adjusting: prevent useless row generation
            tf.headersRow++;

            tf.eachCol(function (i) {
                var icon = (0, _dom.createElm)('span', ['ci', i]);
                icon.innerHTML = _this3.iconHtml;
                var header = tf.getHeaderElement(i);
                header.appendChild(icon);
                (0, _event.addEvt)(icon, 'click', function (evt) {
                    return _this3.onClick(evt);
                });
                _this3.fltSpans[i] = icon;
                _this3.fltIcons[i] = icon.firstChild;
            },
            // continue condition function
            function (i) {
                return tf.getFilterType(i) === _const.NONE;
            });
        }

        /**
         * Build all pop-up filters elements
         */

    }, {
        key: 'buildAll',
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
        key: 'build',
        value: function build(colIndex, div) {
            var tf = this.tf;
            var contId = '' + this.prfxDiv + tf.id + '_' + colIndex;
            var placeholder = (0, _dom.createElm)('div', ['class', this.placeholderCssClass]);
            var cont = div || (0, _dom.createElm)('div', ['id', contId], ['class', this.containerCssClass]);
            tf.externalFltTgtIds[colIndex] = cont.id;
            placeholder.appendChild(cont);

            var header = tf.getHeaderElement(colIndex);
            header.insertBefore(placeholder, header.firstChild);
            (0, _event.addEvt)(cont, 'click', function (evt) {
                return (0, _event.stopEvt)(evt);
            });
            this.fltElms[colIndex] = cont;
        }

        /**
         * Toggle visibility of specified filter
         * @param  {Number} colIndex Column index
         */

    }, {
        key: 'toggle',
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
        key: 'open',
        value: function open(colIndex) {
            var _this4 = this;

            var tf = this.tf,
                container = this.fltElms[colIndex];

            this.onBeforeOpen(this, container, colIndex);

            container.style.display = 'block';
            this.activeFilterIdx = colIndex;
            (0, _event.addEvt)(_root.root, 'mouseup', function (evt) {
                return _this4.onMouseup(evt);
            });

            if (tf.getFilterType(colIndex) === _const.INPUT) {
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
        key: 'close',
        value: function close(colIndex) {
            var _this5 = this;

            var container = this.fltElms[colIndex];

            this.onBeforeClose(this, container, colIndex);

            container.style.display = _const.NONE;
            if (this.activeFilterIdx === colIndex) {
                this.activeFilterIdx = -1;
            }
            (0, _event.removeEvt)(_root.root, 'mouseup', function (evt) {
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
        key: 'isOpen',
        value: function isOpen(colIndex) {
            return this.fltElms[colIndex].style.display === 'block';
        }

        /**
         * Close all filters excepted for the specified one if any
         * @param  {Number} exceptIdx Column index of the filter to not close
         */

    }, {
        key: 'closeAll',
        value: function closeAll(exceptIdx) {
            // Do not close filters only if argument is undefined and close on
            // filtering option is disabled
            if ((0, _types.isUndef)(exceptIdx) && !this.closeOnFiltering) {
                return;
            }
            for (var i = 0; i < this.fltElms.length; i++) {
                if (i === exceptIdx) {
                    continue;
                }
                var fltType = this.tf.getFilterType(i);
                var isMultipleFilter = fltType === _const.CHECKLIST || fltType === _const.MULTIPLE;

                // Always hide all single selection filter types but hide multiple
                // selection filter types only if index set
                if (!isMultipleFilter || !(0, _types.isUndef)(exceptIdx)) {
                    this.close(i);
                }
            }
        }

        /**
         * Build all the icons representing the pop-up filters
         */

    }, {
        key: 'setIconsState',
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
        key: 'changeState',
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
        key: 'destroy',
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
                    (0, _dom.removeElm)(container);
                    this.filtersCache[i] = container;
                }
                container = null;
                if (placeholder) {
                    (0, _dom.removeElm)(placeholder);
                }
                placeholder = null;
                if (icon) {
                    (0, _dom.removeElm)(icon);
                }
                icon = null;
                if (iconImg) {
                    (0, _dom.removeElm)(iconImg);
                }
                iconImg = null;
            }
            this.fltElms = [];
            this.fltSpans = [];
            this.fltIcons = [];

            // TODO: expose an API to handle external filter IDs
            this.tf.externalFltTgtIds = [];

            // unsubscribe to events
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
}(_feature.Feature);

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MarkActiveColumns = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _types = __webpack_require__(3);

var _settings = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Visual indicator for filtered columns
 * @export
 * @class MarkActiveColumns
 * @extends {Feature}
 */
var MarkActiveColumns = exports.MarkActiveColumns = function (_Feature) {
    _inherits(MarkActiveColumns, _Feature);

    /**
     * Create an instance of MarkActiveColumns
     * @param {TableFilter} tf TableFilter instance
     */
    function MarkActiveColumns(tf) {
        _classCallCheck(this, MarkActiveColumns);

        var _this = _possibleConstructorReturn(this, (MarkActiveColumns.__proto__ || Object.getPrototypeOf(MarkActiveColumns)).call(this, tf, 'markActiveColumns'));

        var config = _this.config.mark_active_columns || {};

        /**
         * Css class for filtered (active) columns
         * @type {String}
         */
        _this.headerCssClass = (0, _settings.defaultsStr)(config.header_css_class, 'activeHeader');

        /**
         * Css class for filtered (active) column cells
         * @type {String}
         */
        _this.cellCssClass = (0, _settings.defaultsStr)(config.cell_css_class, 'activeCell');

        /**
         * Enable/disable column highlighting
         * @type {Boolean}
         */
        _this.highlightColumn = Boolean(config.highlight_column);

        /**
         * Callback fired before a column is marked as filtered
         * @type {Function}
         */
        _this.onBeforeActiveColumn = (0, _settings.defaultsFn)(config.on_before_active_column, _types.EMPTY_FN);

        /**
         * Callback fired after a column is marked as filtered
         * @type {Function}
         */
        _this.onAfterActiveColumn = (0, _settings.defaultsFn)(config.on_after_active_column, _types.EMPTY_FN);
        return _this;
    }

    /**
     * Initialise MarkActiveColumns instance
     */


    _createClass(MarkActiveColumns, [{
        key: 'init',
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
        key: 'clearActiveColumns',
        value: function clearActiveColumns() {
            var _this3 = this;

            var tf = this.tf;
            tf.eachCol(function (idx) {
                (0, _dom.removeClass)(tf.getHeaderElement(idx), _this3.headerCssClass);

                if (_this3.highlightColumn) {
                    _this3.eachColumnCell(idx, function (cell) {
                        return (0, _dom.removeClass)(cell, _this3.cellCssClass);
                    });
                }
            });
        }

        /**
         * Mark currently filtered column
         * @param  {Number} colIndex Column index
         */

    }, {
        key: 'markActiveColumn',
        value: function markActiveColumn(colIndex) {
            var _this4 = this;

            var tf = this.tf;
            var header = tf.getHeaderElement(colIndex);
            if ((0, _dom.hasClass)(header, this.headerCssClass)) {
                return;
            }

            this.onBeforeActiveColumn(this, colIndex);

            (0, _dom.addClass)(header, this.headerCssClass);

            if (this.highlightColumn) {
                this.eachColumnCell(colIndex, function (cell) {
                    return (0, _dom.addClass)(cell, _this4.cellCssClass);
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
        key: 'eachColumnCell',
        value: function eachColumnCell(colIndex) {
            var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types.EMPTY_FN;
            var tbl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.tf.dom();

            // TODO: remove [].forEach when polyfill for PhanthomJs is available
            [].forEach.call(tbl.querySelectorAll('tbody td:nth-child(' + (colIndex + 1) + ')'), fn);
        }

        /**
         * Remove feature
         */

    }, {
        key: 'destroy',
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
}(_feature.Feature);

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.RowsCounter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _types = __webpack_require__(3);

var _settings = __webpack_require__(7);

var _toolbar = __webpack_require__(33);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Rows counter UI component
 * @export
 * @class RowsCounter
 * @extends {Feature}
 */
var RowsCounter = exports.RowsCounter = function (_Feature) {
        _inherits(RowsCounter, _Feature);

        /**
         * Creates an instance of RowsCounter
         * @param {TableFilter} tf TableFilter instance
         */
        function RowsCounter(tf) {
                _classCallCheck(this, RowsCounter);

                // TableFilter configuration
                var _this = _possibleConstructorReturn(this, (RowsCounter.__proto__ || Object.getPrototypeOf(RowsCounter)).call(this, tf, 'rowsCounter'));

                var f = _this.config.rows_counter || {};

                /**
                 * ID of custom container element
                 * @type {String}
                 */
                _this.targetId = (0, _settings.defaultsStr)(f.target_id, null);

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
                _this.text = (0, _settings.defaultsStr)(f.text, 'Rows: ');

                /**
                 * Separator symbol appearing between the first and last visible rows of
                 * current page when paging is enabled. ie: Rows: 31-40 / 70
                 * @type {String}
                 */
                _this.fromToTextSeparator = (0, _settings.defaultsStr)(f.separator, '-');

                /**
                 * Separator symbol appearing between the first and last visible rows of
                 * current page and the total number of filterable rows when paging is
                 * enabled. ie: Rows: 31-40 / 70
                 * @type {String}
                 */
                _this.overText = (0, _settings.defaultsStr)(f.over_text, ' / ');

                /**
                 * Css class for container element
                 * @type {String}
                 */
                _this.cssClass = (0, _settings.defaultsStr)(f.css_class, 'tot');

                /**
                 * Default position in toolbar ('left'|'center'|'right')
                 * @type {String}
                 */
                _this.toolbarPosition = (0, _settings.defaultsStr)(f.toolbar_position, _toolbar.LEFT);

                /**
                 * Callback fired before the counter is refreshed
                 * @type {Function}
                 */
                _this.onBeforeRefreshCounter = (0, _settings.defaultsFn)(f.on_before_refresh_counter, _types.EMPTY_FN);

                /**
                 * Callback fired after the counter is refreshed
                 * @type {Function}
                 */
                _this.onAfterRefreshCounter = (0, _settings.defaultsFn)(f.on_after_refresh_counter, _types.EMPTY_FN);
                return _this;
        }

        /**
         * Initializes RowsCounter instance
         */


        _createClass(RowsCounter, [{
                key: 'init',
                value: function init() {
                        var _this2 = this;

                        if (this.initialized) {
                                return;
                        }

                        this.emitter.emit('initializing-feature', this, !(0, _types.isNull)(this.targetId));

                        var tf = this.tf;

                        //rows counter container
                        var countDiv = (0, _dom.createElm)('div');
                        countDiv.className = this.cssClass;
                        //rows counter label
                        var countSpan = (0, _dom.createElm)('span');
                        var countText = (0, _dom.createElm)('span');
                        countText.appendChild((0, _dom.createText)(this.text));

                        // counter is added to defined element
                        var targetEl = !this.targetId ? tf.feature('toolbar').container(this.toolbarPosition) : (0, _dom.elm)(this.targetId);

                        //default container: 'lDiv'
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
                        this.label = countSpan;

                        // subscribe to events
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
                key: 'refresh',
                value: function refresh(p) {
                        if (!this.initialized || !this.isEnabled()) {
                                return;
                        }

                        var tf = this.tf;

                        this.onBeforeRefreshCounter(tf, this.label);

                        var totTxt = void 0;
                        if (!tf.paging) {
                                if (p && p !== '') {
                                        totTxt = p;
                                } else {
                                        totTxt = tf.getFilterableRowsNb() - tf.nbHiddenRows;
                                }
                        } else {
                                var paging = tf.feature('paging');
                                if (paging) {
                                        var nbValidRows = tf.getValidRowsNb();
                                        //paging start row
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
                key: 'destroy',
                value: function destroy() {
                        var _this3 = this;

                        if (!this.initialized) {
                                return;
                        }

                        if (!this.targetId && this.container) {
                                (0, _dom.removeElm)(this.container);
                        } else {
                                (0, _dom.elm)(this.targetId).innerHTML = '';
                        }
                        this.label = null;
                        this.container = null;

                        // unsubscribe to events
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
}(_feature.Feature);

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StatusBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _root = __webpack_require__(16);

var _dom = __webpack_require__(10);

var _types = __webpack_require__(3);

var _settings = __webpack_require__(7);

var _toolbar = __webpack_require__(33);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVENTS = ['after-filtering', 'after-populating-filter', 'after-page-change', 'after-clearing-filters', 'after-page-length-change', 'after-reset-page', 'after-reset-page-length', 'after-loading-extensions', 'after-loading-themes'];

/**
 * Status bar UI component
 * @export
 * @class StatusBar
 * @extends {Feature}
 */

var StatusBar = exports.StatusBar = function (_Feature) {
    _inherits(StatusBar, _Feature);

    /**
     * Creates an instance of StatusBar
     * @param {TableFilter} tf TableFilter instance
     */
    function StatusBar(tf) {
        _classCallCheck(this, StatusBar);

        // Configuration object
        var _this = _possibleConstructorReturn(this, (StatusBar.__proto__ || Object.getPrototypeOf(StatusBar)).call(this, tf, 'statusBar'));

        var f = _this.config.status_bar || {};

        /**
         * ID of custom container element
         * @type {String}
         */
        _this.targetId = (0, _settings.defaultsStr)(f.target_id, null);

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
        _this.text = (0, _settings.defaultsStr)(f.text, '');

        /**
         * Css class for container element
         * @type {String}
         */
        _this.cssClass = (0, _settings.defaultsStr)(f.css_class, 'status');

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
        _this.onBeforeShowMsg = (0, _settings.defaultsFn)(f.on_before_show_msg, _types.EMPTY_FN);

        /**
         * Callback fired after the message is displayed
         * @type {Function}
         */
        _this.onAfterShowMsg = (0, _settings.defaultsFn)(f.on_after_show_msg, _types.EMPTY_FN);

        /**
         * Message appearing upon filtering
         * @type {String}
         */
        _this.msgFilter = (0, _settings.defaultsStr)(f.msg_filter, 'Filtering data...');

        /**
         * Message appearing when a drop-down filter is populated
         * @type {String}
         */
        _this.msgPopulate = (0, _settings.defaultsStr)(f.msg_populate, 'Populating filter...');

        /**
         * Message appearing when a checklist filter is populated
         * @type {String}
         */
        _this.msgPopulateCheckList = (0, _settings.defaultsStr)(f.msg_populate_checklist, 'Populating list...');

        /**
         * Message appearing when a pagination page is changed
         * @type {String}
         */
        _this.msgChangePage = (0, _settings.defaultsStr)(f.msg_change_page, 'Collecting paging data...');

        /**
         * Message appearing when filters are cleared
         * @type {String}
         */
        _this.msgClear = (0, _settings.defaultsStr)(f.msg_clear, 'Clearing filters...');

        /**
         * Message appearing when the page length is changed
         * @type {String}
         */
        _this.msgChangeResults = (0, _settings.defaultsStr)(f.msg_change_results, 'Changing results per page...');

        /**
         * Message appearing when the page is re-set
         * @type {String}
         */
        _this.msgResetPage = (0, _settings.defaultsStr)(f.msg_reset_page, 'Re-setting page...');

        /**
         * Message appearing when the page length is re-set
         * @type {String}
         */
        _this.msgResetPageLength = (0, _settings.defaultsStr)(f.msg_reset_page_length, 'Re-setting page length...');

        /**
         * Message appearing upon column sorting
         * @type {String}
         */
        _this.msgSort = (0, _settings.defaultsStr)(f.msg_sort, 'Sorting data...');

        /**
         * Message appearing when extensions are loading
         * @type {String}
         */
        _this.msgLoadExtensions = (0, _settings.defaultsStr)(f.msg_load_extensions, 'Loading extensions...');

        /**
         * Message appearing when themes are loading
         * @type {String}
         */
        _this.msgLoadThemes = (0, _settings.defaultsStr)(f.msg_load_themes, 'Loading theme(s)...');

        /**
         * Default position in toolbar ('left'|'center'|'right')
         * @type {String}
         */
        _this.toolbarPosition = (0, _settings.defaultsStr)(f.toolbar_position, _toolbar.LEFT);
        return _this;
    }

    /**
     * Initializes StatusBar instance
     */


    _createClass(StatusBar, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            if (this.initialized) {
                return;
            }

            var tf = this.tf;
            var emitter = this.emitter;

            emitter.emit('initializing-feature', this, !(0, _types.isNull)(this.targetId));

            // status bar container
            var statusDiv = (0, _dom.createElm)('div');
            statusDiv.className = this.cssClass;

            // status bar label
            var statusSpan = (0, _dom.createElm)('span');
            // preceding text
            var statusSpanText = (0, _dom.createElm)('span');
            statusSpanText.appendChild((0, _dom.createText)(this.text));

            // target element container
            var targetEl = !this.targetId ? tf.feature('toolbar').container(this.toolbarPosition) : (0, _dom.elm)(this.targetId);

            // default container
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
            this.labelContainer = statusSpanText;

            // subscribe to events
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
        key: 'message',
        value: function message() {
            var _this3 = this;

            var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            if (!this.isEnabled()) {
                return;
            }

            this.onBeforeShowMsg(this.tf, t);

            var d = t === '' ? this.delay : 1;
            _root.root.setTimeout(function () {
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
        key: 'destroy',
        value: function destroy() {
            var _this4 = this;

            if (!this.initialized) {
                return;
            }

            var emitter = this.emitter;

            this.container.innerHTML = '';
            if (!this.targetId) {
                (0, _dom.removeElm)(this.container);
            }
            this.labelContainer = null;
            this.msgContainer = null;
            this.container = null;

            // Unsubscribe to events
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
}(_feature.Feature);

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClearButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _event = __webpack_require__(19);

var _settings = __webpack_require__(7);

var _types = __webpack_require__(3);

var _toolbar = __webpack_require__(33);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Clear button UI component
 */
var ClearButton = exports.ClearButton = function (_Feature) {
    _inherits(ClearButton, _Feature);

    /**
     * Creates an instance of ClearButton
     * @param {TableFilter} tf TableFilter instance
     */
    function ClearButton(tf) {
        _classCallCheck(this, ClearButton);

        var _this = _possibleConstructorReturn(this, (ClearButton.__proto__ || Object.getPrototypeOf(ClearButton)).call(this, tf, 'btnReset'));

        var f = _this.config;

        /**
         * Container element ID
         * @type {String}
         */
        _this.targetId = (0, _settings.defaultsStr)(f.btn_reset_target_id, null);

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

        /**
         * Text for the clear button
         * @type {String}
         */
        _this.text = (0, _settings.defaultsStr)(f.btn_reset_text, 'Reset');

        /**
         * Css class for reset button
         * @type {String}
         */
        _this.cssClass = (0, _settings.defaultsStr)(f.btn_reset_css_class, 'reset');

        /**
         * Tooltip text for the clear button
         * @type {String}
         */
        _this.tooltip = f.btn_reset_tooltip || 'Clear filters';

        /**
         * Custom Html string for the clear button
         * @type {String}
         */
        _this.html = (0, _settings.defaultsStr)(f.btn_reset_html, !tf.enableIcons ? null : '<input type="button" value="" class="' + _this.cssClass + '" ' + 'title="' + _this.tooltip + '" />');

        /**
         * Default position in toolbar ('left'|'center'|'right')
         * @type {String}
         */
        _this.toolbarPosition = (0, _settings.defaultsStr)(f.toolbar_position, _toolbar.RIGHT);
        return _this;
    }

    /**
     * Click event handler for clear button
     * @private
     */


    _createClass(ClearButton, [{
        key: 'onClick',
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
        key: 'init',
        value: function init() {
            var _this2 = this;

            var tf = this.tf;

            if (this.initialized) {
                return;
            }

            this.emitter.emit('initializing-feature', this, !(0, _types.isNull)(this.targetId));

            var cont = (0, _dom.createElm)('span');

            var targetEl = !this.targetId ? tf.feature('toolbar').container(this.toolbarPosition) : (0, _dom.elm)(this.targetId);
            targetEl.appendChild(cont);

            if (!this.html) {
                var fltReset = (0, _dom.createElm)('a', ['href', 'javascript:void(0);']);
                fltReset.className = this.cssClass;
                fltReset.appendChild((0, _dom.createText)(this.text));
                cont.appendChild(fltReset);
                (0, _event.addEvt)(fltReset, 'click', function () {
                    return _this2.onClick();
                });
            } else {
                cont.innerHTML = this.html;
                var resetEl = cont.firstChild;
                (0, _event.addEvt)(resetEl, 'click', function () {
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
        key: 'destroy',
        value: function destroy() {
            if (!this.initialized) {
                return;
            }
            (0, _dom.removeElm)(this.element);
            (0, _dom.removeElm)(this.container);
            this.element = null;
            this.container = null;
            this.initialized = false;
        }
    }]);

    return ClearButton;
}(_feature.Feature);

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AlternateRows = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _settings = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Rows with alternating background color for improved readability
 */
var AlternateRows = exports.AlternateRows = function (_Feature) {
    _inherits(AlternateRows, _Feature);

    /**
     * Creates an instance of AlternateRows.
     *
     * @param {Object} tf TableFilter instance
     */
    function AlternateRows(tf) {
        _classCallCheck(this, AlternateRows);

        var _this = _possibleConstructorReturn(this, (AlternateRows.__proto__ || Object.getPrototypeOf(AlternateRows)).call(this, tf, 'alternateRows'));

        var config = _this.config;
        /**
         * Css class for even rows (default: 'even')
         * @type {String}
         */
        _this.evenCss = (0, _settings.defaultsStr)(config.even_row_css_class, 'even');

        /**
         * Css class for odd rows (default: 'odd')
         * @type {String}
         */
        _this.oddCss = (0, _settings.defaultsStr)(config.odd_row_css_class, 'odd');
        return _this;
    }

    /**
     * Sets alternating rows color
     */


    _createClass(AlternateRows, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            if (this.initialized) {
                return;
            }

            this.processAll();

            // Subscribe to events
            this.emitter.on(['row-processed', 'row-paged'], function (tf, rowIndex, arrIndex, isValid) {
                return _this2.processRow(rowIndex, arrIndex, isValid);
            });
            this.emitter.on(['column-sorted', 'rows-changed'], function () {
                return _this2.processAll();
            });

            /** @inherited */
            this.initialized = true;
        }

        /**
         * Apply background to all valid rows
         */

    }, {
        key: 'processAll',
        value: function processAll() {
            if (!this.isEnabled()) {
                return;
            }
            var tf = this.tf;
            var validRowsIndex = tf.getValidRows(true);
            var indexLen = validRowsIndex.length;
            var idx = 0;

            //alternates bg color
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
        key: 'processRow',
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
        key: 'setRowBg',
        value: function setRowBg(rowIdx, idx) {
            if (!this.isEnabled() || isNaN(rowIdx)) {
                return;
            }
            var rows = this.tf.dom().rows;
            var i = isNaN(idx) ? rowIdx : idx;
            this.removeRowBg(rowIdx);

            (0, _dom.addClass)(rows[rowIdx], i % 2 ? this.evenCss : this.oddCss);
        }

        /**
         * Removes row background color
         * @param  {Number} idx Row index
         * @private
         */

    }, {
        key: 'removeRowBg',
        value: function removeRowBg(idx) {
            if (isNaN(idx)) {
                return;
            }
            var rows = this.tf.dom().rows;
            (0, _dom.removeClass)(rows[idx], this.oddCss);
            (0, _dom.removeClass)(rows[idx], this.evenCss);
        }

        /**
         * Removes all alternating backgrounds
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this3 = this;

            if (!this.initialized) {
                return;
            }
            // let nbRows = this.tf.getRowsNb(true);
            // for (let i = 0; i < nbRows; i++) {
            //     this.removeRowBg(i);
            // }
            var eachRow = this.tf.eachRow(0);
            eachRow(function (row, i) {
                return _this3.removeRowBg(i);
            });

            // Unsubscribe to events
            this.emitter.off(['row-processed', 'row-paged'], function (tf, rowIndex, arrIndex, isValid) {
                return _this3.processRow(rowIndex, arrIndex, isValid);
            });
            this.emitter.off(['column-sorted', 'rows-changed'], function () {
                return _this3.processAll();
            });

            this.initialized = false;
        }
    }]);

    return AlternateRows;
}(_feature.Feature);

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoResults = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _types = __webpack_require__(3);

var _const = __webpack_require__(15);

var _settings = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * UI when filtering yields no matches
 * @export
 * @class NoResults
 * @extends {Feature}
 */
var NoResults = exports.NoResults = function (_Feature) {
    _inherits(NoResults, _Feature);

    /**
     * Creates an instance of NoResults
     * @param {TableFilter} tf TableFilter instance
     */
    function NoResults(tf) {
        _classCallCheck(this, NoResults);

        //configuration object
        var _this = _possibleConstructorReturn(this, (NoResults.__proto__ || Object.getPrototypeOf(NoResults)).call(this, tf, 'noResults'));

        var f = _this.config.no_results_message || {};

        /**
         * Text (accepts HTML)
         * @type {String}
         */
        _this.content = (0, _settings.defaultsStr)(f.content, 'No results');

        /**
         * Custom container DOM element
         * @type {DOMElement}
         */
        _this.customContainer = (0, _settings.defaultsStr)(f.custom_container, null);

        /**
         * ID of custom container element
         * @type {String}
         */
        _this.customContainerId = (0, _settings.defaultsStr)(f.custom_container_id, null);

        /**
         * Indicates if UI is contained in a external element
         * @type {Boolean}
         * @private
         */
        _this.isExternal = !(0, _types.isEmpty)(_this.customContainer) || !(0, _types.isEmpty)(_this.customContainerId);

        /**
         * Css class assigned to container element
         * @type {String}
         */
        _this.cssClass = (0, _settings.defaultsStr)(f.css_class, 'no-results');

        /**
         * Stores container DOM element
         * @type {DOMElement}
         */
        _this.cont = null;

        /**
         * Callback fired before the message is displayed
         * @type {Function}
         */
        _this.onBeforeShow = (0, _settings.defaultsFn)(f.on_before_show_msg, _types.EMPTY_FN);

        /**
         * Callback fired after the message is displayed
         * @type {Function}
         */
        _this.onAfterShow = (0, _settings.defaultsFn)(f.on_after_show_msg, _types.EMPTY_FN);

        /**
         * Callback fired before the message is hidden
         * @type {Function}
         */
        _this.onBeforeHide = (0, _settings.defaultsFn)(f.on_before_hide_msg, _types.EMPTY_FN);

        /**
         * Callback fired after the message is hidden
         * @type {Function}
         */
        _this.onAfterHide = (0, _settings.defaultsFn)(f.on_after_hide_msg, _types.EMPTY_FN);
        return _this;
    }

    /**
     * Initializes NoResults instance
     */


    _createClass(NoResults, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            if (this.initialized) {
                return;
            }
            var tf = this.tf;
            var target = this.customContainer || (0, _dom.elm)(this.customContainerId) || tf.dom();

            //container
            var cont = (0, _dom.createElm)('div');
            cont.className = this.cssClass;
            cont.innerHTML = this.content;

            if (this.isExternal) {
                target.appendChild(cont);
            } else {
                target.parentNode.insertBefore(cont, target.nextSibling);
            }

            this.cont = cont;

            // subscribe to after-filtering event
            this.emitter.on(['after-filtering'], function () {
                return _this2.toggle();
            });

            /** @inherited */
            this.initialized = true;

            this.hide();
        }

        /**
         * Toggle no results message
         */

    }, {
        key: 'toggle',
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
        key: 'show',
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
        key: 'hide',
        value: function hide() {
            if (!this.initialized || !this.isEnabled()) {
                return;
            }
            this.onBeforeHide(this.tf, this);

            this.cont.style.display = _const.NONE;

            this.onAfterHide(this.tf, this);
        }

        /**
         * Sets no results container width
         * @private
         */

    }, {
        key: 'setWidth',
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

        /**
         * Remove feature
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this3 = this;

            if (!this.initialized) {
                return;
            }
            (0, _dom.removeElm)(this.cont);
            this.cont = null;
            // unsubscribe to after-filtering event
            this.emitter.off(['after-filtering'], function () {
                return _this3.toggle();
            });

            this.initialized = false;
        }
    }]);

    return NoResults;
}(_feature.Feature);

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Paging = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _types = __webpack_require__(3);

var _event = __webpack_require__(19);

var _const = __webpack_require__(15);

var _settings = __webpack_require__(7);

var _toolbar = __webpack_require__(33);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Paging UI component
 * @export
 * @class Paging
 * @extends {Feature}
 */
var Paging = exports.Paging = function (_Feature) {
    _inherits(Paging, _Feature);

    /**
     * Creates an instance of Paging
     * @param {TableFilter} tf TableFilter instance
     */
    function Paging(tf) {
        _classCallCheck(this, Paging);

        // Configuration object
        var _this = _possibleConstructorReturn(this, (Paging.__proto__ || Object.getPrototypeOf(Paging)).call(this, tf, 'paging'));

        var f = _this.config.paging || {};

        /**
         * Css class for the paging buttons (previous, next, etc.)
         * @type {String}
         */
        _this.btnCssClass = (0, _settings.defaultsStr)(f.btn_css_class, 'pgInp');

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
        _this.tgtId = (0, _settings.defaultsStr)(f.target_id, null);

        /**
         * Number of rows contained in a page
         * @type {Number}
         */
        _this.pageLength = (0, _settings.defaultsNb)(f.length, 10);

        /**
         * ID of custom container element for the results per page selector
         * @type {String}
         */
        _this.pageLengthTgtId = (0, _settings.defaultsStr)(f.results_per_page_target_id, null);

        /**
         * Css class for the paging select element
         * @type {String}
         */
        _this.pgSlcCssClass = (0, _settings.defaultsStr)(f.slc_css_class, 'pgSlc');

        /**
         * Css class for the paging input element
         * @type {String}
         */
        _this.pgInpCssClass = (0, _settings.defaultsStr)(f.inp_css_class, 'pgNbInp');

        /**
         * Label and values for the results per page select, example of usage:
         * ['Records: ', [10,25,50,100]]
         * @type {Array}
         */
        _this.resultsPerPage = (0, _settings.defaultsArr)(f.results_per_page, null);

        /**
         * Determines if results per page is configured
         * @type {Boolean}
         */
        _this.hasResultsPerPage = (0, _types.isArray)(_this.resultsPerPage);

        /**
         * Css class for the results per page select
         * @type {String}
         */
        _this.resultsSlcCssClass = (0, _settings.defaultsStr)(f.results_slc_css_class, 'rspg');

        /**
         * Css class for the label preceding results per page select
         * @type {String}
         */
        _this.resultsSpanCssClass = (0, _settings.defaultsStr)(f.results_span_css_class, 'rspgSpan');

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
        _this.btnNextPageText = (0, _settings.defaultsStr)(f.btn_next_page_text, '>');

        /**
         * Previous page button text
         * @type {String}
         */
        _this.btnPrevPageText = (0, _settings.defaultsStr)(f.btn_prev_page_text, '<');

        /**
         * Last page button text
         * @type {String}
         */
        _this.btnLastPageText = (0, _settings.defaultsStr)(f.btn_last_page_text, '>|');

        /**
         * First page button text
         * @type {String}
         */
        _this.btnFirstPageText = (0, _settings.defaultsStr)(f.btn_first_page_text, '|<');

        /**
         * Next page button HTML
         * @type {String}
         */
        _this.btnNextPageHtml = (0, _settings.defaultsStr)(f.btn_next_page_html, !tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnCssClass + ' nextPage" title="Next page" />');

        /**
         * Previous page button HTML
         * @type {String}
         */
        _this.btnPrevPageHtml = (0, _settings.defaultsStr)(f.btn_prev_page_html, !tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnCssClass + ' previousPage" title="Previous page" />');

        /**
         * First page button HTML
         * @type {String}
         */
        _this.btnFirstPageHtml = (0, _settings.defaultsStr)(f.btn_first_page_html, !tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnCssClass + ' firstPage" title="First page" />');

        /**
         * Last page button HTML
         * @type {String}
         */
        _this.btnLastPageHtml = (0, _settings.defaultsStr)(f.btn_last_page_html, !tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnCssClass + ' lastPage" title="Last page" />');

        /**
         * Text preceeding page selector drop-down
         * @type {String}
         */
        _this.pageText = (0, _settings.defaultsStr)(f.page_text, ' Page ');

        /**
         * Text after page selector drop-down
         * @type {String}
         */
        _this.ofText = (0, _settings.defaultsStr)(f.of_text, ' of ');

        /**
         * Css class for the span containing total number of pages
         * @type {String}
         */
        _this.nbPgSpanCssClass = (0, _settings.defaultsStr)(f.nb_pages_css_class, 'nbpg');

        /**
         * Determines if paging buttons are enabled (default: true)
         * @type {Boolean}
         */
        _this.hasBtns = (0, _settings.defaultsBool)(f.btns, true);

        /**
         * Defines page selector type, two possible values: 'select', 'input'
         * @type {String}
         */
        _this.pageSelectorType = (0, _settings.defaultsStr)(f.page_selector_type, _const.SELECT);

        /**
         * Default position in toolbar ('left'|'center'|'right')
         * @type {String}
         */
        _this.toolbarPosition = (0, _settings.defaultsStr)(f.toolbar_position, _toolbar.CENTER);

        /**
         * Callback fired before the page is changed
         * @type {Function}
         */
        _this.onBeforeChangePage = (0, _settings.defaultsFn)(f.on_before_change_page, _types.EMPTY_FN);

        /**
         * Callback fired after the page is changed
         * @type {Function}
         */
        _this.onAfterChangePage = (0, _settings.defaultsFn)(f.on_after_change_page, _types.EMPTY_FN);

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
        var nrows = tf.getRowsNb(true);
        //calculates page nb
        _this.nbPages = Math.ceil((nrows - startRow) / _this.pageLength);

        var o = _this;
        /**
         * Paging DOM events handlers
         * @type {String}
         * @private
         */
        _this.evt = {
            slcIndex: function slcIndex() {
                return o.pageSelectorType === _const.SELECT ? o.pageSlc.options.selectedIndex : parseInt(o.pageSlc.value, 10) - 1;
            },
            nbOpts: function nbOpts() {
                return o.pageSelectorType === _const.SELECT ? parseInt(o.pageSlc.options.length, 10) - 1 : o.nbPages - 1;
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
                var key = (0, _event.keyCode)(e);
                if (key === _const.ENTER_KEY) {
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
        key: 'init',
        value: function init() {
            var _this2 = this;

            var slcPages = void 0;
            var tf = this.tf;
            var evt = this.evt;

            if (this.initialized) {
                return;
            }

            this.emitter.emit('initializing-feature', this, !(0, _types.isNull)(this.tgtId));

            // Check resultsPerPage is in expected format and initialise the
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
            };

            // Paging drop-down list selector
            if (this.pageSelectorType === _const.SELECT) {
                slcPages = (0, _dom.createElm)(_const.SELECT);
                slcPages.className = this.pgSlcCssClass;
                (0, _event.addEvt)(slcPages, 'change', evt.slcPagesChange);
            }

            // Paging input selector
            if (this.pageSelectorType === _const.INPUT) {
                slcPages = (0, _dom.createElm)(_const.INPUT, ['value', this.currentPageNb]);
                slcPages.className = this.pgInpCssClass;
                (0, _event.addEvt)(slcPages, 'keypress', evt._detectKey);
            }

            // btns containers
            var btnNextSpan = (0, _dom.createElm)('span');
            var btnPrevSpan = (0, _dom.createElm)('span');
            var btnLastSpan = (0, _dom.createElm)('span');
            var btnFirstSpan = (0, _dom.createElm)('span');

            if (this.hasBtns) {
                // Next button
                if (!this.btnNextPageHtml) {
                    var btnNext = (0, _dom.createElm)(_const.INPUT, ['type', 'button'], ['value', this.btnNextPageText], ['title', 'Next']);
                    btnNext.className = this.btnCssClass;
                    (0, _event.addEvt)(btnNext, 'click', evt.next);
                    btnNextSpan.appendChild(btnNext);
                } else {
                    btnNextSpan.innerHTML = this.btnNextPageHtml;
                    (0, _event.addEvt)(btnNextSpan, 'click', evt.next);
                }
                // Previous button
                if (!this.btnPrevPageHtml) {
                    var btnPrev = (0, _dom.createElm)(_const.INPUT, ['type', 'button'], ['value', this.btnPrevPageText], ['title', 'Previous']);
                    btnPrev.className = this.btnCssClass;
                    (0, _event.addEvt)(btnPrev, 'click', evt.prev);
                    btnPrevSpan.appendChild(btnPrev);
                } else {
                    btnPrevSpan.innerHTML = this.btnPrevPageHtml;
                    (0, _event.addEvt)(btnPrevSpan, 'click', evt.prev);
                }
                // Last button
                if (!this.btnLastPageHtml) {
                    var btnLast = (0, _dom.createElm)(_const.INPUT, ['type', 'button'], ['value', this.btnLastPageText], ['title', 'Last']);
                    btnLast.className = this.btnCssClass;
                    (0, _event.addEvt)(btnLast, 'click', evt.last);
                    btnLastSpan.appendChild(btnLast);
                } else {
                    btnLastSpan.innerHTML = this.btnLastPageHtml;
                    (0, _event.addEvt)(btnLastSpan, 'click', evt.last);
                }
                // First button
                if (!this.btnFirstPageHtml) {
                    var btnFirst = (0, _dom.createElm)(_const.INPUT, ['type', 'button'], ['value', this.btnFirstPageText], ['title', 'First']);
                    btnFirst.className = this.btnCssClass;
                    (0, _event.addEvt)(btnFirst, 'click', evt.first);
                    btnFirstSpan.appendChild(btnFirst);
                } else {
                    btnFirstSpan.innerHTML = this.btnFirstPageHtml;
                    (0, _event.addEvt)(btnFirstSpan, 'click', evt.first);
                }
            }

            // paging elements (buttons+drop-down list) are added to defined element
            var targetEl = !this.tgtId ? tf.feature('toolbar').container(this.toolbarPosition) : (0, _dom.elm)(this.tgtId);
            targetEl.appendChild(btnFirstSpan);
            targetEl.appendChild(btnPrevSpan);

            var pgBeforeSpan = (0, _dom.createElm)('span');
            pgBeforeSpan.appendChild((0, _dom.createText)(this.pageText));
            pgBeforeSpan.className = this.nbPgSpanCssClass;
            targetEl.appendChild(pgBeforeSpan);
            targetEl.appendChild(slcPages);
            var pgAfterSpan = (0, _dom.createElm)('span');
            pgAfterSpan.appendChild((0, _dom.createText)(this.ofText));
            pgAfterSpan.className = this.nbPgSpanCssClass;
            targetEl.appendChild(pgAfterSpan);
            var pgSpan = (0, _dom.createElm)('span');
            pgSpan.className = this.nbPgSpanCssClass;
            pgSpan.appendChild((0, _dom.createText)(' ' + this.nbPages + ' '));
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

            this.emitter.on(['after-filtering'], function () {
                return _this2.resetPagingInfo();
            });
            this.emitter.on(['change-page'], function (tf, pageNumber) {
                return _this2.setPage(pageNumber);
            });
            this.emitter.on(['change-page-results'], function (tf, pageLength) {
                return _this2.changeResultsPerPage(pageLength);
            });

            /** @inherited */
            this.initialized = true;

            this.emitter.emit('feature-initialized', this);
        }

        /**
         * Reset paging when filters are already instantiated
         * @param {Boolean} filterTable Execute filtering once paging instanciated
         */

    }, {
        key: 'reset',
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
        key: 'resetPagingInfo',
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
        key: 'setPagingInfo',
        value: function setPagingInfo(validRows) {
            var tf = this.tf;
            var cont = !this.tgtId ? tf.feature('toolbar').container(this.toolbarPosition) : (0, _dom.elm)(this.tgtId);

            //store valid rows indexes
            tf.validRowsIndex = validRows || tf.getValidRows(true);

            //calculate nb of pages
            this.nbPages = Math.ceil(tf.validRowsIndex.length / this.pageLength);
            //refresh page nb span
            this.pgCont.innerHTML = this.nbPages;
            //select clearing shortcut
            if (this.pageSelectorType === _const.SELECT) {
                this.pageSlc.innerHTML = '';
            }

            if (this.nbPages > 0) {
                cont.style.visibility = 'visible';
                if (this.pageSelectorType === _const.SELECT) {
                    for (var z = 0; z < this.nbPages; z++) {
                        var opt = (0, _dom.createOpt)(z + 1, z * this.pageLength, false);
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
        key: 'groupByPage',
        value: function groupByPage(validRows) {
            var tf = this.tf;
            var rows = tf.dom().rows;
            var startPagingRow = parseInt(this.startPagingRow, 10);
            var endPagingRow = startPagingRow + parseInt(this.pageLength, 10);

            //store valid rows indexes
            if (validRows) {
                tf.validRowsIndex = validRows;
            }

            //this loop shows valid rows of current page
            for (var h = 0, len = tf.getValidRowsNb(true); h < len; h++) {
                var validRowIdx = tf.validRowsIndex[h];
                var r = rows[validRowIdx];
                var isRowValid = r.getAttribute('validRow');
                var rowDisplayed = false;

                if (h >= startPagingRow && h < endPagingRow) {
                    if ((0, _types.isNull)(isRowValid) || Boolean(isRowValid === 'true')) {
                        r.style.display = '';
                        rowDisplayed = true;
                    }
                } else {
                    r.style.display = _const.NONE;
                }
                this.emitter.emit('row-paged', tf, validRowIdx, h, rowDisplayed);
            }

            // broadcast grouping by page
            this.emitter.emit('grouped-by-page', tf, this);
        }

        /**
         * Return the current page number
         * @return {Number} Page number
         */

    }, {
        key: 'getPage',
        value: function getPage() {
            return this.currentPageNb;
        }

        /**
         * Show page defined by passed argument (string or number):
         * @param {String}/{Number} cmd possible string values: 'next',
         *   'previous', 'last', 'first' or page number as per param
         */

    }, {
        key: 'setPage',
        value: function setPage(cmd) {
            var tf = this.tf;
            if (!tf.isInitialized() || !this.isEnabled()) {
                return;
            }
            var btnEvt = this.evt,
                cmdtype = typeof cmd === 'undefined' ? 'undefined' : _typeof(cmd);
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
        key: 'setResultsPerPage',
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

            var slcR = (0, _dom.createElm)(_const.SELECT);
            slcR.className = this.resultsSlcCssClass;
            var slcRText = this.resultsPerPage[0],
                slcROpts = this.resultsPerPage[1];
            var slcRSpan = (0, _dom.createElm)('span');
            slcRSpan.className = this.resultsSpanCssClass;

            // results per page select is added to external element
            var targetEl = !this.pageLengthTgtId ? tf.feature('toolbar').container(_toolbar.RIGHT) : (0, _dom.elm)(this.pageLengthTgtId);
            slcRSpan.appendChild((0, _dom.createText)(slcRText));

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
            (0, _event.addEvt)(slcR, 'change', evt.slcResultsChange);
            this.slcResultsTxt = slcRSpan;
            this.pageLengthSlc = slcR;
        }

        /**
         * Remove number of results per page UI elements
         */

    }, {
        key: 'removeResultsPerPage',
        value: function removeResultsPerPage() {
            var tf = this.tf;
            if (!tf.isInitialized() || !this.pageLengthSlc || !this.resultsPerPage) {
                return;
            }
            if (this.pageLengthSlc) {
                (0, _dom.removeElm)(this.pageLengthSlc);
            }
            if (this.slcResultsTxt) {
                (0, _dom.removeElm)(this.slcResultsTxt);
            }
            this.pageLengthSlc = null;
            this.slcResultsTxt = null;
        }

        /**
         * Change the page based on passed index
         * @param {Number} index Index of the page (0-n)
         */

    }, {
        key: 'changePage',
        value: function changePage(index) {
            var tf = this.tf;

            if (!this.isEnabled()) {
                return;
            }

            this.emitter.emit('before-page-change', tf, index + 1);

            if (index === null) {
                index = this.pageSelectorType === _const.SELECT ? this.pageSlc.options.selectedIndex : this.pageSlc.value - 1;
            }
            if (index >= 0 && index <= this.nbPages - 1) {
                this.onBeforeChangePage(this, index + 1);

                this.currentPageNb = parseInt(index, 10) + 1;
                if (this.pageSelectorType === _const.SELECT) {
                    this.pageSlc.options[index].selected = true;
                } else {
                    this.pageSlc.value = this.currentPageNb;
                }

                this.startPagingRow = this.pageSelectorType === _const.SELECT ? this.pageSlc.value : index * this.pageLength;

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
        key: 'changeResultsPerPage',
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
        key: 'onChangeResultsPerPage',
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
            var slcPagesSelIndex = pageSelectorType === _const.SELECT ? pageSlc.selectedIndex : parseInt(pageSlc.value - 1, 10);
            this.pageLength = parseInt(slcR.options[slcIndex].value, 10);
            this.startPagingRow = this.pageLength * slcPagesSelIndex;

            if (!isNaN(this.pageLength)) {
                if (this.startPagingRow >= tf.nbFilterableRows) {
                    this.startPagingRow = tf.nbFilterableRows - this.pageLength;
                }
                this.setPagingInfo();

                if (pageSelectorType === _const.SELECT) {
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
        key: 'resetPage',
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
        key: 'resetPageLength',
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

        /**
         * Remove paging feature
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this4 = this;

            if (!this.initialized) {
                return;
            }

            var evt = this.evt;

            if (this.pageSlc) {
                if (this.pageSelectorType === _const.SELECT) {
                    (0, _event.removeEvt)(this.pageSlc, 'change', evt.slcPagesChange);
                } else if (this.pageSelectorType === _const.INPUT) {
                    (0, _event.removeEvt)(this.pageSlc, 'keypress', evt._detectKey);
                }
                (0, _dom.removeElm)(this.pageSlc);
            }

            if (this.btnNextCont) {
                (0, _event.removeEvt)(this.btnNextCont, 'click', evt.next);
                (0, _dom.removeElm)(this.btnNextCont);
                this.btnNextCont = null;
            }

            if (this.btnPrevCont) {
                (0, _event.removeEvt)(this.btnPrevCont, 'click', evt.prev);
                (0, _dom.removeElm)(this.btnPrevCont);
                this.btnPrevCont = null;
            }

            if (this.btnLastCont) {
                (0, _event.removeEvt)(this.btnLastCont, 'click', evt.last);
                (0, _dom.removeElm)(this.btnLastCont);
                this.btnLastCont = null;
            }

            if (this.btnFirstCont) {
                (0, _event.removeEvt)(this.btnFirstCont, 'click', evt.first);
                (0, _dom.removeElm)(this.btnFirstCont);
                this.btnFirstCont = null;
            }

            if (this.pgBefore) {
                (0, _dom.removeElm)(this.pgBefore);
                this.pgBefore = null;
            }

            if (this.pgAfter) {
                (0, _dom.removeElm)(this.pgAfter);
                this.pgAfter = null;
            }

            if (this.pgCont) {
                (0, _dom.removeElm)(this.pgCont);
                this.pgCont = null;
            }

            if (this.hasResultsPerPage) {
                this.removeResultsPerPage();
            }

            this.emitter.off(['after-filtering'], function () {
                return _this4.resetPagingInfo();
            });
            this.emitter.off(['change-page'], function (tf, pageNumber) {
                return _this4.setPage(pageNumber);
            });
            this.emitter.off(['change-page-results'], function (tf, pageLength) {
                return _this4.changeResultsPerPage(pageLength);
            });

            this.pageSlc = null;
            this.nbPages = 0;

            this.initialized = false;
        }
    }]);

    return Paging;
}(_feature.Feature);

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseDropdown = __webpack_require__(69);

var _dom = __webpack_require__(10);

var _array = __webpack_require__(70);

var _string = __webpack_require__(21);

var _event = __webpack_require__(19);

var _types = __webpack_require__(3);

var _const = __webpack_require__(15);

var _settings = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Checklist filter UI component
 * @export
 * @class CheckList
 * @extends {BaseDropdown}
 */
var CheckList = exports.CheckList = function (_BaseDropdown) {
    _inherits(CheckList, _BaseDropdown);

    /**
     * Creates an instance of CheckList
     * @param {TableFilter} tf TableFilter instance
     */
    function CheckList(tf) {
        _classCallCheck(this, CheckList);

        var _this = _possibleConstructorReturn(this, (CheckList.__proto__ || Object.getPrototypeOf(CheckList)).call(this, tf, 'checkList'));

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
        _this.containerCssClass = (0, _settings.defaultsStr)(f.div_checklist_css_class, 'div_checklist');

        /**
         * Css class for the checklist filter element (ul)
         * @type {String}
         */
        _this.filterCssClass = (0, _settings.defaultsStr)(f.checklist_css_class, 'flt_checklist');

        /**
         * Css class for the item of a checklist (li)
         * @type {String}
         */
        _this.itemCssClass = (0, _settings.defaultsStr)(f.checklist_item_css_class, 'flt_checklist_item');

        /**
         * Css class for a selected item of a checklist (li)
         * @type {String}
         */
        _this.selectedItemCssClass = (0, _settings.defaultsStr)(f.checklist_selected_item_css_class, 'flt_checklist_slc_item');

        /**
         * Text placed in the filter's container when load filter on demand
         * feature is enabled
         * @type {String}
         */
        _this.activateText = (0, _settings.defaultsStr)(f.activate_checklist_text, 'Click to load filter data');

        /**
         * Css class for a disabled item of a checklist (li)
         * @type {String}
         */
        _this.disabledItemCssClass = (0, _settings.defaultsStr)(f.checklist_item_disabled_css_class, 'flt_checklist_item_disabled');

        /**
         * Enable the reset filter option as first item
         * @type {Boolean}
         */
        _this.enableResetOption = (0, _settings.defaultsBool)(f.enable_checklist_reset_filter, true);

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
        key: 'optionClick',
        value: function optionClick(evt) {
            var elm = (0, _event.targetEvt)(evt);
            var tf = this.tf;

            this.emitter.emit('filter-focus', tf, elm);
            this.setCheckListValues(elm);
            tf.filter();
        }

        /**
         * Checklist container click event handler for load-on-demand feature
         * @param {Event} evt
         * @private
         */

    }, {
        key: 'onCheckListClick',
        value: function onCheckListClick(evt) {
            var _this2 = this;

            var elm = (0, _event.targetEvt)(evt);
            if (this.tf.loadFltOnDemand && elm.getAttribute('filled') === '0') {
                var ct = elm.getAttribute('ct');
                var div = this.containers[ct];
                this.build(ct);
                (0, _event.removeEvt)(div, 'click', function (evt) {
                    return _this2.onCheckListClick(evt);
                });
            }
        }

        /**
         * Refresh all checklist filters
         */

    }, {
        key: 'refreshAll',
        value: function refreshAll() {
            var colIdxs = this.tf.getFiltersByType(_const.CHECKLIST, true);
            this.refreshFilters(colIdxs);
        }

        /**
         * Initialize checklist filter
         * @param  {Number}     colIndex   Column index
         * @param  {Boolean}    isExternal External filter flag
         * @param  {DOMElement} container  Dom element containing the filter
         */

    }, {
        key: 'init',
        value: function init(colIndex, isExternal, container) {
            var _this3 = this;

            var tf = this.tf;
            var externalFltTgtId = isExternal ? tf.externalFltTgtIds[colIndex] : null;

            var divCont = (0, _dom.createElm)('div', ['id', '' + this.prfx + colIndex + '_' + tf.id], ['ct', colIndex], ['filled', '0']);
            divCont.className = this.containerCssClass;

            //filter is appended in desired element
            if (externalFltTgtId) {
                (0, _dom.elm)(externalFltTgtId).appendChild(divCont);
            } else {
                container.appendChild(divCont);
            }

            this.containers[colIndex] = divCont;
            tf.fltIds.push(tf.buildFilterId(colIndex));

            if (!tf.loadFltOnDemand) {
                this.build(colIndex);
            } else {
                (0, _event.addEvt)(divCont, 'click', function (evt) {
                    return _this3.onCheckListClick(evt);
                });
                divCont.appendChild((0, _dom.createText)(this.activateText));
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

            /** @inherited */
            this.initialized = true;
        }

        /**
         * Build checklist UI
         * @param  {Number}  colIndex   Column index
         * @param  {Boolean} isLinked    Enable linked filters behaviour
         */

    }, {
        key: 'build',
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
            var ul = (0, _dom.createElm)('ul', ['id', tf.fltIds[colIndex]], ['colIndex', colIndex]);
            ul.className = this.filterCssClass;

            // let rows = tf.dom().rows;
            // let nbRows = tf.getRowsNb(true);
            var caseSensitive = tf.caseSensitive;
            /** @inherited */
            this.isCustom = tf.isCustomOptions(colIndex);

            //Retrieves custom values
            if (this.isCustom) {
                var customValues = tf.getCustomOptions(colIndex);
                this.opts = customValues[0];
                this.optsTxt = customValues[1];
            }

            var activeIdx = void 0;
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

            // for (let k = tf.refRow; k < nbRows; k++) {
            //     // always visible rows don't need to appear on selects as always
            //     // valid
            //     if (tf.excludeRows.indexOf(k) !== -1) {
            //         continue;
            //     }

            //     let cells = rows[k].cells;
            //     let ncells = cells.length;

            //     // checks if row has exact cell #
            //     if (ncells !== tf.nbCells || this.isCustom) {
            //         continue;
            //     }

            //     if (isLinked && !this.isValidLinkedValue(k, activeIdx)) {
            //         continue;
            //     }

            //     let cellValue = tf.getCellValue(cells[colIndex]);
            //     //Vary Peter's patch
            //     let cellString = matchCase(cellValue, caseSensitive);
            //     // checks if celldata is already in array
            //     if (!has(this.opts, cellString, caseSensitive)) {
            //         this.opts.push(cellValue);
            //     }
            //     let filteredCol = filteredDataCol[colIndex];
            //     if (isLinked && tf.disableExcludedOptions) {
            //         if (!filteredCol) {
            //             filteredCol = tf.getVisibleColumnValues(colIndex);
            //         }
            //         if (!has(filteredCol, cellString, caseSensitive) &&
            //             !has(this.excludedOpts, cellString,
            //                 caseSensitive)) {
            //             this.excludedOpts.push(cellValue);
            //         }
            //     }
            // }

            var eachRow = tf.eachRow();
            eachRow(function (row) {
                var cellValue = tf.getCellValue(row.cells[colIndex]);
                //Vary Peter's patch
                var cellString = (0, _string.matchCase)(cellValue, caseSensitive);
                // checks if celldata is already in array
                if (!(0, _array.has)(_this4.opts, cellString, caseSensitive)) {
                    _this4.opts.push(cellValue);
                }
                var filteredCol = filteredDataCol[colIndex];
                if (isLinked && tf.disableExcludedOptions) {
                    if (!filteredCol) {
                        filteredCol = tf.getVisibleColumnValues(colIndex);
                    }
                    if (!(0, _array.has)(filteredCol, cellString, caseSensitive) && !(0, _array.has)(_this4.excludedOpts, cellString, caseSensitive)) {
                        _this4.excludedOpts.push(cellValue);
                    }
                }
            },
            // continue conditions function
            function (row, k) {
                // excluded rows don't need to appear on selects as always valid
                if (tf.excludeRows.indexOf(k) !== -1) {
                    return true;
                }

                // checks if row has expected number of cells
                if (row.cells.length !== tf.nbCells || _this4.isCustom) {
                    return true;
                }

                if (isLinked && !_this4.isValidLinkedValue(k, activeIdx)) {
                    return true;
                }
            });

            //sort options
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
        key: 'addChecks',
        value: function addChecks(colIndex, ul) {
            var _this5 = this;

            var tf = this.tf;
            var chkCt = this.addTChecks(colIndex, ul);

            for (var y = 0; y < this.opts.length; y++) {
                var val = this.opts[y]; //item value
                var lbl = this.isCustom ? this.optsTxt[y] : val; //item text
                var fltId = tf.fltIds[colIndex];
                var li = (0, _dom.createCheckItem)(fltId + '_' + (y + chkCt), val, lbl);
                li.className = this.itemCssClass;

                if (tf.linkedFilters && tf.disableExcludedOptions && (0, _array.has)(this.excludedOpts, (0, _string.matchCase)(val, tf.caseSensitive), tf.caseSensitive)) {
                    (0, _dom.addClass)(li, this.disabledItemCssClass);
                    li.check.disabled = true;
                    li.disabled = true;
                } else {
                    (0, _event.addEvt)(li.check, 'click', function (evt) {
                        return _this5.optionClick(evt);
                    });
                }
                ul.appendChild(li);

                if (val === '') {
                    //item is hidden
                    li.style.display = _const.NONE;
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
        key: 'addTChecks',
        value: function addTChecks(colIndex, ul) {
            var _this6 = this;

            var tf = this.tf;
            var chkCt = 1;
            var fltId = tf.fltIds[colIndex];
            var li0 = (0, _dom.createCheckItem)(fltId + '_0', '', tf.getClearFilterText(colIndex));
            li0.className = this.itemCssClass;
            ul.appendChild(li0);

            (0, _event.addEvt)(li0.check, 'click', function (evt) {
                return _this6.optionClick(evt);
            });

            if (!this.enableResetOption) {
                li0.style.display = _const.NONE;
            }

            if (tf.enableEmptyOption) {
                var li1 = (0, _dom.createCheckItem)(fltId + '_1', tf.emOperator, tf.emptyText);
                li1.className = this.itemCssClass;
                ul.appendChild(li1);
                (0, _event.addEvt)(li1.check, 'click', function (evt) {
                    return _this6.optionClick(evt);
                });
                chkCt++;
            }

            if (tf.enableNonEmptyOption) {
                var li2 = (0, _dom.createCheckItem)(fltId + '_2', tf.nmOperator, tf.nonEmptyText);
                li2.className = this.itemCssClass;
                ul.appendChild(li2);
                (0, _event.addEvt)(li2.check, 'click', function (evt) {
                    return _this6.optionClick(evt);
                });
                chkCt++;
            }
            return chkCt;
        }

        /**
         * Store checked options in DOM element attribute
         * @param {Object} o checklist option DOM element
         * @private
         */

    }, {
        key: 'setCheckListValues',
        value: function setCheckListValues(o) {
            if (!o) {
                return;
            }

            var tf = this.tf;
            var chkValue = o.value; //checked item value
            // TODO: provide helper to extract column index, ugly!
            var chkIndex = parseInt(o.id.split('_')[2], 10);
            var colIdx = tf.getColumnIndexFromFilterId(o.id);
            var itemTag = 'LI';

            var n = tf.getFilterElement(parseInt(colIdx, 10));
            var li = n.childNodes[chkIndex];
            var colIndex = n.getAttribute('colIndex');
            var fltValue = n.getAttribute('value'); //filter value (ul tag)
            var fltIndexes = n.getAttribute('indexes'); //selected items (ul tag)

            if (o.checked) {
                //show all item
                if (chkValue === '') {
                    if (fltIndexes && fltIndexes !== '') {
                        //items indexes
                        var indSplit = fltIndexes.split(tf.separator);
                        //checked items loop
                        for (var u = 0; u < indSplit.length; u++) {
                            //checked item
                            var cChk = (0, _dom.elm)(tf.fltIds[colIndex] + '_' + indSplit[u]);
                            if (cChk) {
                                cChk.checked = false;
                                (0, _dom.removeClass)(n.childNodes[indSplit[u]], this.selectedItemCssClass);
                            }
                        }
                    }
                    n.setAttribute('value', '');
                    n.setAttribute('indexes', '');
                } else {
                    fltValue = fltValue ? fltValue : '';
                    chkValue = (0, _string.trim)(fltValue + ' ' + chkValue + ' ' + tf.orOperator);
                    chkIndex = fltIndexes + chkIndex + tf.separator;
                    n.setAttribute('value', chkValue);
                    n.setAttribute('indexes', chkIndex);
                    //1st option unchecked
                    if ((0, _dom.elm)(tf.fltIds[colIndex] + '_0')) {
                        (0, _dom.elm)(tf.fltIds[colIndex] + '_0').checked = false;
                    }
                }

                if (li.nodeName === itemTag) {
                    (0, _dom.removeClass)(n.childNodes[0], this.selectedItemCssClass);
                    (0, _dom.addClass)(li, this.selectedItemCssClass);
                }
            } else {
                //removes values and indexes
                if (chkValue !== '') {
                    var replaceValue = new RegExp((0, _string.rgxEsc)(chkValue + ' ' + tf.orOperator));
                    fltValue = fltValue.replace(replaceValue, '');
                    n.setAttribute('value', (0, _string.trim)(fltValue));

                    var replaceIndex = new RegExp((0, _string.rgxEsc)(chkIndex + tf.separator));
                    fltIndexes = fltIndexes.replace(replaceIndex, '');
                    n.setAttribute('indexes', fltIndexes);
                }
                if (li.nodeName === itemTag) {
                    (0, _dom.removeClass)(li, this.selectedItemCssClass);
                }
            }
        }

        /**
         * Select filter options programmatically
         * @param  {Number} colIndex Column index
         * @param  {Array}  values   Array of option values to select
         */

    }, {
        key: 'selectOptions',
        value: function selectOptions(colIndex) {
            var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var tf = this.tf;
            var flt = tf.getFilterElement(colIndex);
            if (tf.getFilterType(colIndex) !== _const.CHECKLIST || !flt || values.length === 0) {
                return;
            }

            var lisNb = (0, _dom.tag)(flt, 'li').length;

            flt.setAttribute('value', '');
            flt.setAttribute('indexes', '');

            for (var k = 0; k < lisNb; k++) {
                var li = (0, _dom.tag)(flt, 'li')[k];
                var lbl = (0, _dom.tag)(li, 'label')[0];
                var chk = (0, _dom.tag)(li, 'input')[0];
                var lblTxt = (0, _string.matchCase)((0, _dom.getText)(lbl), tf.caseSensitive);

                if (lblTxt !== '' && (0, _array.has)(values, lblTxt, tf.caseSensitive)) {
                    chk.checked = true;
                } else {
                    // Check non-empty-text or empty-text option
                    if (values.indexOf(tf.nmOperator) !== -1 && lblTxt === (0, _string.matchCase)(tf.nonEmptyText, tf.caseSensitive)) {
                        chk.checked = true;
                    } else if (values.indexOf(tf.emOperator) !== -1 && lblTxt === (0, _string.matchCase)(tf.emptyText, tf.caseSensitive)) {
                        chk.checked = true;
                    } else {
                        chk.checked = false;
                    }
                }
                this.setCheckListValues(chk);
            }
        }

        /**
         * Get filter values for a given column index
         * @param {Number} colIndex Column index
         * @returns {Array} values Collection of selected values
         */

    }, {
        key: 'getValues',
        value: function getValues(colIndex) {
            var tf = this.tf;
            var flt = tf.getFilterElement(colIndex);
            var fltAttr = flt.getAttribute('value');
            var values = (0, _types.isEmpty)(fltAttr) ? '' : fltAttr;
            //removes last operator ||
            values = values.substr(0, values.length - 3);
            //turn || separated values into array
            values = values.split(' ' + tf.orOperator + ' ');

            return values;
        }

        /**
         * Destroy CheckList instance
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this7 = this;

            this.emitter.off(['build-checklist-filter'], function (tf, colIndex, isLinked) {
                return _this7.build(colIndex, isLinked);
            });
            this.emitter.off(['select-checklist-options'], function (tf, colIndex, values) {
                return _this7.selectOptions(colIndex, values);
            });
            this.emitter.off(['rows-changed'], function () {
                return _this7.refreshAll();
            });

            this.initialized = false;
        }
    }]);

    return CheckList;
}(_baseDropdown.BaseDropdown);

/***/ }),
/* 129 */
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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Static Methods
__webpack_require__(4);
__webpack_require__(157);
__webpack_require__(176);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);

// Instance Methods
__webpack_require__(182);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(354);
__webpack_require__(355);
__webpack_require__(356);
__webpack_require__(357);
__webpack_require__(358);
__webpack_require__(359);
__webpack_require__(360);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(363);
__webpack_require__(365);
__webpack_require__(366);
__webpack_require__(368);
__webpack_require__(369);
__webpack_require__(370);
__webpack_require__(371);
__webpack_require__(372);
__webpack_require__(373);
__webpack_require__(374);
__webpack_require__(375);
__webpack_require__(376);
__webpack_require__(377);
__webpack_require__(378);
__webpack_require__(379);
__webpack_require__(380);
__webpack_require__(381);
__webpack_require__(382);
__webpack_require__(383);
__webpack_require__(384);

// Accessors
__webpack_require__(385);
__webpack_require__(386);

module.exports = __webpack_require__(0);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BritishEnglishDefinition = __webpack_require__(132),
    AmericanEnglishDefinition = __webpack_require__(73),
    CanadianEnglishDefinition = __webpack_require__(134);

var LazyLoadedLocales = {
  'en-US': AmericanEnglishDefinition,
  'en-GB': BritishEnglishDefinition,
  'en-AU': BritishEnglishDefinition,
  'en-CA': CanadianEnglishDefinition
};

module.exports = LazyLoadedLocales;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getEnglishVariant = __webpack_require__(54);

var BritishEnglishDefinition = getEnglishVariant({
  'short':  '{dd}/{MM}/{yyyy}',
  'medium': '{d} {Month} {yyyy}',
  'long':   '{d} {Month} {yyyy} {H}:{mm}',
  'full':   '{Weekday}, {d} {Month}, {yyyy} {time}',
  'stamp':  '{Dow} {d} {Mon} {yyyy} {time}'
});

module.exports = BritishEnglishDefinition;

/***/ }),
/* 133 */
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
    "{months?} (?:{year}|'{yy})",
    '{midday} {4?} {day|weekday}',
    '{months},?(?:[-.\\/\\s]{year})?',
    '{edge} of (?:day)? {day|weekday}',
    '{0} {num}{1?} {weekday} {2} {months},? {year?}',
    '{shift?} {day?} {weekday?} {timeMarker?} {midday}',
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
    '{year}[-.\\/\\s]{months}[-.\\/\\s]{date}',
    '{0|months} {date?}{1?} of {shift} {unit:6-7}',
    '{0?} {num}{1?} {weekday} of {shift} {unit:6}',
    "{date}[-.\\/\\s]{months}[-.\\/\\s](?:{year}|'?{yy})",
    "{weekday?}\\.?,? {months}\\.?,? {date}{1?},? (?:{year}|'{yy})?"
  ],
  'timeFrontParse': [
    '{sign} {num} {unit}',
    '{num} {unit} {sign}',
    '{4?} {day|weekday}'
  ]
};

module.exports = EnglishLocaleBaseDefinition;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getEnglishVariant = __webpack_require__(54);

var CanadianEnglishDefinition = getEnglishVariant({
  'short':  '{yyyy}-{MM}-{dd}',
  'medium': '{d} {Month}, {yyyy}',
  'long':   '{d} {Month}, {yyyy} {H}:{mm}',
  'full':   '{Weekday}, {d} {Month}, {yyyy} {time}',
  'stamp':  '{Dow} {d} {Mon} {yyyy} {time}'
});

module.exports = CanadianEnglishDefinition;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LOCALE_ARRAY_FIELDS = __webpack_require__(136),
    ISODefaults = __webpack_require__(56),
    ParsingTokens = __webpack_require__(74),
    CoreParsingFormats = __webpack_require__(137),
    LocalizedParsingTokens = __webpack_require__(75),
    map = __webpack_require__(76),
    filter = __webpack_require__(138),
    forEach = __webpack_require__(27),
    isDefined = __webpack_require__(28),
    commaSplit = __webpack_require__(142),
    classChecks = __webpack_require__(5),
    isUndefined = __webpack_require__(39),
    mathAliases = __webpack_require__(9),
    simpleMerge = __webpack_require__(55),
    getOrdinalSuffix = __webpack_require__(147),
    getRegNonCapturing = __webpack_require__(78),
    coreUtilityAliases = __webpack_require__(12),
    getArrayWithOffset = __webpack_require__(148),
    iterateOverDateUnits = __webpack_require__(58),
    arrayToRegAlternates = __webpack_require__(151),
    fullwidthNumberHelpers = __webpack_require__(153),
    getAdjustedUnitForNumber = __webpack_require__(155),
    getParsingTokenWithSuffix = __webpack_require__(156);

var getOwn = coreUtilityAliases.getOwn,
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

    getTokenValue: function(field, str) {
      var map = this[field + 'Map'], val;
      if (map) {
        val = map[str];
      }
      if (isUndefined(val)) {
        val = this.getNumber(str);
        if (field === 'month') {
          // Months are the only numeric date field
          // whose value is not the same as its number.
          val -= 1;
        }
      }
      return val;
    },

    getNumber: function(str) {
      var num = this.numeralMap[str];
      if (isDefined(num)) {
        return num;
      }
      // The unary plus operator here show better performance and handles
      // every format that parseFloat does with the exception of trailing
      // characters, which are guaranteed not to be in our string at this point.
      num = +str.replace(/,/, '.');
      if (!isNaN(num)) {
        return num;
      }
      num = this.getNumeralValue(str);
      if (!isNaN(num)) {
        this.numeralMap[str] = num;
        return num;
      }
      return num;
    },

    getNumeralValue: function(str) {
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

    addFormat: function(src, to) {
      var loc = this;

      function getTokenSrc(str) {
        var suffix, src, val,
            opt   = str.match(/\?$/),
            nc    = str.match(/^(\d+)\??$/),
            slice = str.match(/(\d)(?:-(\d))?/),
            key   = str.replace(/[^a-z]+$/i, '');

        // Allowing alias tokens such as {time}
        if (val = getOwn(loc.parsingAliases, key)) {
          src = replaceParsingTokens(val);
          if (opt) {
            src = getRegNonCapturing(src, true);
          }
          return src;
        }

        if (nc) {
          src = loc.tokens[nc[1]];
        } else if (val = getOwn(ParsingTokens, key)) {
          src = val.src;
        } else {
          val = getOwn(loc.parsingTokens, key) || getOwn(loc, key);

          // Both the "months" array and the "month" parsing token can be accessed
          // by either {month} or {months}, falling back as necessary, however
          // regardless of whether or not a fallback occurs, the final field to
          // be passed to addRawFormat must be normalized as singular.
          key = key.replace(/s$/, '');

          if (!val) {
            val = getOwn(loc.parsingTokens, key) || getOwn(loc, key + 's');
          }

          if (isString(val)) {
            src = val;
            suffix = loc[key + 'Suffix'];
          } else {
            if (slice) {
              val = filter(val, function(m, i) {
                var mod = i % (loc.units ? 8 : val.length);
                return mod >= slice[1] && mod <= (slice[2] || slice[1]);
              });
            }
            src = arrayToRegAlternates(val);
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
          to.push(key);
          src = '(' + src + ')';
        }
        if (suffix) {
          // Date/time suffixes such as those in CJK
          src = getParsingTokenWithSuffix(key, src, suffix);
        }
        if (opt) {
          src += '?';
        }
        return src;
      }

      function replaceParsingTokens(str) {

        // Make spaces optional
        str = str.replace(/ /g, ' ?');

        return str.replace(/\{([^,]+?)\}/g, function(match, token) {
          var tokens = token.split('|'), src;
          if (tokens.length > 1) {
            src = getRegNonCapturing(map(tokens, getTokenSrc).join('|'));
          } else {
            src = getTokenSrc(token);
          }
          return src;
        });
      }

      if (!to) {
        to = [];
        src = replaceParsingTokens(src);
      }

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

      function getTimeFormat() {
        var src;
        if (loc.ampmFront) {
          // "ampmFront" exists mostly for CJK locales, which also presume that
          // time suffixes exist, allowing this to be a simpler regex.
          src = '{ampm?} {hour} (?:{minute} (?::?{second})?)?';
        } else if(loc.ampm.length) {
          src = '{hour}(?:[.:]{minute}(?:[.:]{second})? {ampm?}| {ampm})';
        } else {
          src = '{hour}(?:[.:]{minute}(?:[.:]{second})?)';
        }
        return src;
      }

      function getTZOffsetFormat() {
        return '(?:{Z}|{GMT?}(?:{tzSign}{tzHour}(?::?{tzMinute}(?: \\([\\w\\s]+\\))?)?)?)?';
      }

      function buildParsingTokens() {
        forEachProperty(LocalizedParsingTokens, function(token, name) {
          var src, arr;
          src = token.base ? ParsingTokens[token.base].src : token.src;
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
        return getRegNonCapturing(markers + '{time}', true);
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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LOCALE_ARRAY_FIELDS = [
  'months', 'weekdays', 'units', 'numerals', 'placeholders',
  'articles', 'tokens', 'timeMarkers', 'ampm', 'timeSuffixes',
  'parse', 'timeParse', 'timeFrontParse', 'modifiers'
];

module.exports = LOCALE_ARRAY_FIELDS;

/***/ }),
/* 137 */
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
    src: '{dd}[-.\\/]{MM}(?:[-.\\/]{yyyy|yy|y})?',
    mdy: '{MM}[-.\\/]{dd}(?:[-.\\/]{yyyy|yy|y})?'
  },
  {
    // 1975-08-25
    time: true,
    src: '{yyyy}[-.\\/]{MM}(?:[-.\\/]{dd})?'
  },
  {
    // .NET JSON
    src: '\\\\/Date\\({timestamp}(?:[+-]\\d{4,4})?\\)\\\\/'
  },
  {
    // ISO-8601
    src: '{yearSign?}{yyyy}(?:-?{MM}(?:-?{dd}(?:T{ihh}(?::?{imm}(?::?{ss})?)?)?)?)?{tzOffset?}'
  }
];

module.exports = CoreParsingFormats;

/***/ }),
/* 138 */
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
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getSparseArrayIndexes = __webpack_require__(140);

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
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayIndex = __webpack_require__(141);

function getSparseArrayIndexes(arr, fromIndex, loop, fromRight) {
  var indexes = [], i;
  for (i in arr) {
    if (isArrayIndex(i) && (loop || (fromRight ? i <= fromIndex : i >= fromIndex))) {
      indexes.push(+i);
    }
  }
  indexes.sort(function(a, b) {
    var aLoop = a > fromIndex;
    var bLoop = b > fromIndex;
    if (aLoop !== bLoop) {
      return aLoop ? -1 : 1;
    }
    return a - b;
  });
  return indexes;
}

module.exports = getSparseArrayIndexes;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isArrayIndex(n) {
  return n >>> 0 == n && n != 0xFFFFFFFF;
}

module.exports = isArrayIndex;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CommonChars = __webpack_require__(44);

var HALF_WIDTH_COMMA = CommonChars.HALF_WIDTH_COMMA;

function commaSplit(str) {
  return str.split(HALF_WIDTH_COMMA);
}

module.exports = commaSplit;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 'Boolean Number String Date RegExp Function Array Error Set Map';

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isClass = __webpack_require__(77),
    isObjectType = __webpack_require__(57),
    hasOwnEnumeratedProperties = __webpack_require__(145),
    hasValidPlainObjectPrototype = __webpack_require__(146);

function isPlainObject(obj, className) {
  return isObjectType(obj) &&
         isClass(obj, 'Object', className) &&
         hasValidPlainObjectPrototype(obj) &&
         hasOwnEnumeratedProperties(obj);
}

module.exports = isPlainObject;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(12);

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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(12);

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
/* 147 */
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
/* 148 */
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
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PRIVATE_PROP_PREFIX = __webpack_require__(150),
    coreUtilityAliases = __webpack_require__(12);

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
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '_sugar_';

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = __webpack_require__(76),
    escapeRegExp = __webpack_require__(152);

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
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(5);

var isString = classChecks.isString;

function escapeRegExp(str) {
  if (!isString(str)) str = String(str);
  return str.replace(/([\\\/\'*+?|()\[\]{}.^$-])/g,'\\$1');
}

module.exports = escapeRegExp;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CommonChars = __webpack_require__(44),
    chr = __webpack_require__(80),
    allCharsReg = __webpack_require__(154);

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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function allCharsReg(src) {
  return RegExp('[' + src + ']', 'g');
}

module.exports = allCharsReg;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trunc = __webpack_require__(23),
    withPrecision = __webpack_require__(81),
    getAdjustedUnit = __webpack_require__(82);

function getAdjustedUnitForNumber(ms) {
  return getAdjustedUnit(ms, function(unit) {
    return trunc(withPrecision(ms / unit.multiplier, 1));
  });
}

module.exports = getAdjustedUnitForNumber;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocalizedParsingTokens = __webpack_require__(75),
    getRegNonCapturing = __webpack_require__(78);

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
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    createDate = __webpack_require__(32);

__webpack_require__(173);

Sugar.Date.defineStatic({

  'create': function(d, options) {
    return createDate(d, options);
  }

});

module.exports = Sugar.Date.create;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultNewDate = __webpack_require__(159);

var DATE_OPTIONS = {
  'newDateInternal': defaultNewDate
};

module.exports = DATE_OPTIONS;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function defaultNewDate() {
  return new Date;
}

module.exports = defaultNewDate;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var simpleClone = __webpack_require__(43),
    defineAccessor = __webpack_require__(161),
    coreUtilityAliases = __webpack_require__(12);

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
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(12);

var setProperty = coreUtilityAliases.setProperty;

function defineAccessor(namespace, name, fn) {
  setProperty(namespace, name, fn);
}

module.exports = defineAccessor;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getLowerUnitIndex = __webpack_require__(40),
    setUnitAndLowerToEdge = __webpack_require__(34);

function resetLowerUnits(d, unitIndex) {
  return setUnitAndLowerToEdge(d, getLowerUnitIndex(unitIndex));
}

module.exports = resetLowerUnits;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(6);

var DAY_INDEX = DateUnitIndexes.DAY_INDEX,
    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX;

function getHigherUnitIndex(index) {
  return index === DAY_INDEX ? MONTH_INDEX : index + 1;
}

module.exports = getHigherUnitIndex;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateSet = __webpack_require__(35),
    setISOWeekNumber = __webpack_require__(86);

function callDateSetWithWeek(d, method, value, safe) {
  if (method === 'ISOWeek') {
    setISOWeekNumber(d, value);
  } else {
    callDateSet(d, method, value, safe);
  }
}

module.exports = callDateSetWithWeek;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateSet = __webpack_require__(35);

function setYear(d, val) {
  callDateSet(d, 'FullYear', val);
}

module.exports = setYear;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callDateSet = __webpack_require__(35);

function setMonth(d, val) {
  callDateSet(d, 'Month', val);
}

module.exports = setMonth;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDateParamKey = __webpack_require__(88),
    coreUtilityAliases = __webpack_require__(12);

var getOwn = coreUtilityAliases.getOwn;

function getDateParam(params, key) {
  return getOwn(params, getDateParamKey(params, key));
}

module.exports = getDateParam;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreUtilityAliases = __webpack_require__(12);

var hasOwn = coreUtilityAliases.hasOwn;

function getOwnKey(obj, key) {
  if (hasOwn(obj, key)) {
    return key;
  }
}

module.exports = getOwnKey;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDateParamKey = __webpack_require__(88);

function deleteDateParam(params, key) {
  delete params[getDateParamKey(params, key)];
}

module.exports = deleteDateParam;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getParsingTokenValue(token, str) {
  var val;
  if (token.val) {
    val = token.val;
  } else if (token.sign) {
    val = str === '+' ? 1 : -1;
  } else if (token.bool) {
    val = !!val;
  } else {
    val = +str.replace(/,/, '.');
  }
  if (token.param === 'month') {
    val -= 1;
  }
  return val;
}

module.exports = getParsingTokenValue;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getYear = __webpack_require__(30),
    mathAliases = __webpack_require__(9);

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
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(6),
    iterateOverDateParams = __webpack_require__(48);

var DAY_INDEX = DateUnitIndexes.DAY_INDEX,
    YEAR_INDEX = DateUnitIndexes.YEAR_INDEX;

function iterateOverHigherDateParams(params, fn) {
  iterateOverDateParams(params, fn, YEAR_INDEX, DAY_INDEX);
}

module.exports = iterateOverHigherDateParams;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setDateChainableConstructor = __webpack_require__(174);

setDateChainableConstructor();

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createDate = __webpack_require__(32),
    namespaceAliases = __webpack_require__(25),
    setChainableConstructor = __webpack_require__(175);

var sugarDate = namespaceAliases.sugarDate;

function setDateChainableConstructor() {
  setChainableConstructor(sugarDate, createDate);
}

module.exports = setDateChainableConstructor;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function setChainableConstructor(sugarNamespace, createFn) {
  sugarNamespace.prototype.constructor = function() {
    return createFn.apply(this, arguments);
  };
}

module.exports = setChainableConstructor;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    LocaleHelpers = __webpack_require__(8),
    getKeys = __webpack_require__(177);

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'getAllLocaleCodes': function() {
    return getKeys(localeManager.getAll());
  }

});

module.exports = Sugar.Date.getAllLocaleCodes;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getKeys(obj) {
  return Object.keys(obj);
}

module.exports = getKeys;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    LocaleHelpers = __webpack_require__(8);

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'getAllLocales': function() {
    return localeManager.getAll();
  }

});

module.exports = Sugar.Date.getAllLocales;

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    LocaleHelpers = __webpack_require__(8);

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'getLocale': function(code) {
    return localeManager.get(code, !code);
  }

});

module.exports = Sugar.Date.getLocale;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    LocaleHelpers = __webpack_require__(8);

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'removeLocale': function(code) {
    return localeManager.remove(code);
  }

});

module.exports = Sugar.Date.removeLocale;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    LocaleHelpers = __webpack_require__(8);

var localeManager = LocaleHelpers.localeManager;

Sugar.Date.defineStatic({

  'setLocale': function(code) {
    return localeManager.set(code);
  }

});

module.exports = Sugar.Date.setLocale;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.day;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(29),
    createDate = __webpack_require__(32),
    mathAliases = __webpack_require__(9),
    advanceDate = __webpack_require__(42),
    namespaceAliases = __webpack_require__(25),
    defineInstanceSimilar = __webpack_require__(51);

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
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wrapNamespace = __webpack_require__(185);

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
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function wrapNamespace(method) {
  return function(sugarNamespace, arg1, arg2) {
    sugarNamespace[method](arg1, arg2);
  };
}

module.exports = wrapNamespace;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = __webpack_require__(27),
    spaceSplit = __webpack_require__(45),
    classChecks = __webpack_require__(5);

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
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.dayAfter;

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.dayAgo;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.dayBefore;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.dayFromNow;

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.days;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.daysAfter;

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.daysAgo;

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.daysBefore;

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.daysFromNow;

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    LocaleHelpers = __webpack_require__(8);

var localeManager = LocaleHelpers.localeManager;

Sugar.Number.defineInstance({

  'duration': function(n, localeCode) {
    return localeManager.get(localeCode).getDuration(n);
  }

});

module.exports = Sugar.Number.duration;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.hour;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.hourAfter;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.hourAgo;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.hourBefore;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.hourFromNow;

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.hours;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.hoursAfter;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.hoursAgo;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.hoursBefore;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.hoursFromNow;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.millisecond;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.millisecondAfter;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.millisecondAgo;

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.millisecondBefore;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.millisecondFromNow;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.milliseconds;

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.millisecondsAfter;

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.millisecondsAgo;

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.millisecondsBefore;

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.millisecondsFromNow;

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.minute;

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.minuteAfter;

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.minuteAgo;

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.minuteBefore;

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.minuteFromNow;

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.minutes;

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.minutesAfter;

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.minutesAgo;

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.minutesBefore;

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.minutesFromNow;

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.month;

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.monthAfter;

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.monthAgo;

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.monthBefore;

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.monthFromNow;

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.months;

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.monthsAfter;

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.monthsAgo;

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.monthsBefore;

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.monthsFromNow;

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.second;

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.secondAfter;

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.secondAgo;

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.secondBefore;

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.secondFromNow;

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.seconds;

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.secondsAfter;

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.secondsAgo;

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.secondsBefore;

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.secondsFromNow;

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.week;

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.weekAfter;

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.weekAgo;

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.weekBefore;

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.weekFromNow;

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.weeks;

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.weeksAfter;

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.weeksAgo;

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.weeksBefore;

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.weeksFromNow;

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.year;

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.yearAfter;

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.yearAgo;

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.yearBefore;

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.yearFromNow;

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.years;

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.yearsAfter;

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.yearsAgo;

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.yearsBefore;

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(1);

module.exports = Sugar.Number.yearsFromNow;

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.addDays;

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(29),
    DateUnitIndexes = __webpack_require__(6),
    forEach = __webpack_require__(27),
    compareDate = __webpack_require__(90),
    advanceDate = __webpack_require__(42),
    moveToEndOfUnit = __webpack_require__(49),
    simpleCapitalize = __webpack_require__(62),
    namespaceAliases = __webpack_require__(25),
    defineInstanceSimilar = __webpack_require__(51),
    moveToBeginningOfUnit = __webpack_require__(50),
    createDateWithContext = __webpack_require__(91),
    getTimeDistanceForUnit = __webpack_require__(63);

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
      return getTimeDistanceForUnit(date, createDateWithContext(date, d, options, true), unit);
    };
    var until = function(date, d, options) {
      return getTimeDistanceForUnit(createDateWithContext(date, d, options, true), date, unit);
    };

    methods[name + 'sAgo']   = methods[name + 'sUntil']   = until;
    methods[name + 'sSince'] = methods[name + 'sFromNow'] = since;

  });

}

module.exports = buildDateUnitMethods;

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.addHours;

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.addMilliseconds;

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.addMinutes;

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.addMonths;

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.addSeconds;

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.addWeeks;

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.addYears;

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    advanceDateWithArgs = __webpack_require__(92);

Sugar.Date.defineInstanceWithArguments({

  'advance': function(d, args) {
    return advanceDateWithArgs(d, args, 1);
  }

});

module.exports = Sugar.Date.advance;

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isUndefined = __webpack_require__(39);

function getDateParamsFromString(str) {
  var match, num, params = {};
  match = str.match(/^(-?\d*[\d.]\d*)?\s?(\w+?)s?$/i);
  if (match) {
    if (isUndefined(num)) {
      num = +match[1];
      if (isNaN(num)) {
        num = 1;
      }
    }
    params[match[2].toLowerCase()] = num;
  }
  return params;
}

module.exports = getDateParamsFromString;

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnitIndexes = __webpack_require__(6),
    isDefined = __webpack_require__(28),
    walkUnitDown = __webpack_require__(85);

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
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.beginningOfDay;

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    resetTime = __webpack_require__(84),
    getWeekday = __webpack_require__(20),
    setWeekday = __webpack_require__(24);

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
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.beginningOfMonth;

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.beginningOfWeek;

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.beginningOfYear;

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    cloneDate = __webpack_require__(38);

Sugar.Date.defineInstance({

  'clone': function(date) {
    return cloneDate(date);
  }

});

module.exports = Sugar.Date.clone;

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.daysAgo;

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.daysFromNow;

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    getDaysInMonth = __webpack_require__(79);

Sugar.Date.defineInstance({

  'daysInMonth': function(date) {
    return getDaysInMonth(date);
  }

});

module.exports = Sugar.Date.daysInMonth;

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.daysSince;

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.daysUntil;

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.endOfDay;

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    DateUnitIndexes = __webpack_require__(6),
    getWeekday = __webpack_require__(20),
    setWeekday = __webpack_require__(24),
    moveToEndOfUnit = __webpack_require__(49);

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
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.endOfMonth;

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.endOfWeek;

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.endOfYear;

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    dateFormat = __webpack_require__(94);

Sugar.Date.defineInstance({

  'format': function(date, f, localeCode) {
    return dateFormat(date, f, localeCode);
  }

});

module.exports = Sugar.Date.format;

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(8),
    FormatTokensBase = __webpack_require__(297),
    CoreOutputFormats = __webpack_require__(95),
    forEach = __webpack_require__(27),
    padNumber = __webpack_require__(64),
    spaceSplit = __webpack_require__(45),
    namespaceAliases = __webpack_require__(25),
    coreUtilityAliases = __webpack_require__(12),
    createFormatMatcher = __webpack_require__(303),
    defineInstanceSimilar = __webpack_require__(51);

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
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TIMEZONE_ABBREVIATION_REG = __webpack_require__(298),
    LocaleHelpers = __webpack_require__(8),
    DateUnitIndexes = __webpack_require__(6),
    trunc = __webpack_require__(23),
    getDate = __webpack_require__(37),
    getYear = __webpack_require__(30),
    getHours = __webpack_require__(96),
    getMonth = __webpack_require__(31),
    cloneDate = __webpack_require__(38),
    padNumber = __webpack_require__(64),
    getWeekday = __webpack_require__(20),
    callDateGet = __webpack_require__(18),
    mathAliases = __webpack_require__(9),
    getWeekYear = __webpack_require__(300),
    getUTCOffset = __webpack_require__(97),
    getDaysSince = __webpack_require__(301),
    getWeekNumber = __webpack_require__(65),
    getMeridiemToken = __webpack_require__(302),
    setUnitAndLowerToEdge = __webpack_require__(34);

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
      return match ? match[1]: '';
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
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = /(\w{3})[()\s\d]*$/;

/***/ }),
/* 299 */
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
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(8),
    getYear = __webpack_require__(30),
    getMonth = __webpack_require__(31),
    getWeekNumber = __webpack_require__(65);

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
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateUnits = __webpack_require__(29),
    DateUnitIndexes = __webpack_require__(6),
    getTimeDistanceForUnit = __webpack_require__(63);

var DAY_INDEX = DateUnitIndexes.DAY_INDEX;

function getDaysSince(d1, d2) {
  return getTimeDistanceForUnit(d1, d2, DateUnits[DAY_INDEX]);
}

module.exports = getDaysSince;

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(8),
    trunc = __webpack_require__(23),
    getHours = __webpack_require__(96);

var localeManager = LocaleHelpers.localeManager;

function getMeridiemToken(d, localeCode) {
  var hours = getHours(d);
  return localeManager.get(localeCode).ampm[trunc(hours / 12)] || '';
}

module.exports = getMeridiemToken;

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var STRING_FORMAT_REG = __webpack_require__(304),
    CommonChars = __webpack_require__(44),
    memoizeFunction = __webpack_require__(305);

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
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = /([{}])\1|\{([^}]*)\}|(%)%|(%(\w*))/g;

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var INTERNAL_MEMOIZE_LIMIT = __webpack_require__(306),
    coreUtilityAliases = __webpack_require__(12);

var hasOwn = coreUtilityAliases.hasOwn;

function memoizeFunction(fn) {
  var memo = {}, counter = 0;

  return function(key) {
    if (hasOwn(memo, key)) {
      return memo[key];
    }
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
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 1000;

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    createDateWithContext = __webpack_require__(91);

Sugar.Date.defineInstance({

  'get': function(date, d, options) {
    return createDateWithContext(date, d, options);
  }

});

module.exports = Sugar.Date.get;

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    getWeekNumber = __webpack_require__(65);

Sugar.Date.defineInstance({

  'getISOWeek': function(date) {
    return getWeekNumber(date, true);
  }

});

module.exports = Sugar.Date.getISOWeek;

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    getUTCOffset = __webpack_require__(97);

Sugar.Date.defineInstance({

  'getUTCOffset': function(date, iso) {
    return getUTCOffset(date, iso);
  }

});

module.exports = Sugar.Date.getUTCOffset;

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

Sugar.Date.defineInstance({

  'getUTCWeekday': function(date) {
    return date.getUTCDay();
  }

});

module.exports = Sugar.Date.getUTCWeekday;

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    getWeekday = __webpack_require__(20);

Sugar.Date.defineInstance({

  'getWeekday': function(date) {
    return getWeekday(date);
  }

});

module.exports = Sugar.Date.getWeekday;

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.hoursAgo;

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.hoursFromNow;

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.hoursSince;

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.hoursUntil;

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    fullCompareDate = __webpack_require__(99);

Sugar.Date.defineInstance({

  'is': function(date, d, margin) {
    return fullCompareDate(date, d, margin);
  }

});

module.exports = Sugar.Date.is;

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function trim(str) {
  return str.trim();
}

module.exports = trim;

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setDate = __webpack_require__(36),
    getDate = __webpack_require__(37),
    getYear = __webpack_require__(30),
    getMonth = __webpack_require__(31),
    getNewDate = __webpack_require__(41);

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
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    createDate = __webpack_require__(32);

Sugar.Date.defineInstance({

  'isAfter': function(date, d, margin) {
    return date.getTime() > createDate(d).getTime() - (margin || 0);
  }

});

module.exports = Sugar.Date.isAfter;

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    createDate = __webpack_require__(32);

Sugar.Date.defineInstance({

  'isBefore': function(date, d, margin) {
    return date.getTime() < createDate(d).getTime() + (margin || 0);
  }

});

module.exports = Sugar.Date.isBefore;

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    createDate = __webpack_require__(32),
    mathAliases = __webpack_require__(9);

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
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isFriday;

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocaleHelpers = __webpack_require__(8),
    spaceSplit = __webpack_require__(45),
    fullCompareDate = __webpack_require__(99),
    namespaceAliases = __webpack_require__(25),
    defineInstanceSimilar = __webpack_require__(51);

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
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isFuture;

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.isLastMonth;

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.isLastWeek;

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.isLastYear;

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    getYear = __webpack_require__(30);

Sugar.Date.defineInstance({

  'isLeapYear': function(date) {
    var year = getYear(date);
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

});

module.exports = Sugar.Date.isLeapYear;

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isMonday;

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.isNextMonth;

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.isNextWeek;

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.isNextYear;

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isPast;

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isSaturday;

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isSunday;

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.isThisMonth;

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.isThisWeek;

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.isThisYear;

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isThursday;

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isToday;

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isTomorrow;

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isTuesday;

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    isUTC = __webpack_require__(344);

Sugar.Date.defineInstance({

  'isUTC': function(date) {
    return isUTC(date);
  }

});

module.exports = Sugar.Date.isUTC;

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utc = __webpack_require__(22),
    tzOffset = __webpack_require__(46);

function isUTC(d) {
  return !!_utc(d) || tzOffset(d) === 0;
}

module.exports = isUTC;

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    dateIsValid = __webpack_require__(52);

Sugar.Date.defineInstance({

  'isValid': function(date) {
    return dateIsValid(date);
  }

});

module.exports = Sugar.Date.isValid;

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isWednesday;

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isWeekday;

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isWeekend;

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(13);

module.exports = Sugar.Date.isYesterday;

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

Sugar.Date.defineInstance({

  'iso': function(date) {
    return date.toISOString();
  }

});

module.exports = Sugar.Date.iso;

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.millisecondsAgo;

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.millisecondsFromNow;

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.millisecondsSince;

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.millisecondsUntil;

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.minutesAgo;

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.minutesFromNow;

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.minutesSince;

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.minutesUntil;

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.monthsAgo;

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.monthsFromNow;

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.monthsSince;

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.monthsUntil;

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    dateRelative = __webpack_require__(100);

Sugar.Date.defineInstance({

  'relative': function(date, localeCode, fn) {
    return dateRelative(date, null, localeCode, fn);
  }

});

module.exports = Sugar.Date.relative;

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNewDate = __webpack_require__(41),
    mathAliases = __webpack_require__(9),
    getAdjustedUnit = __webpack_require__(82),
    getTimeDistanceForUnit = __webpack_require__(63);

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
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    createDate = __webpack_require__(32),
    dateRelative = __webpack_require__(100);

Sugar.Date.defineInstance({

  'relativeTo': function(date, d, localeCode) {
    return dateRelative(date, createDate(d), localeCode);
  }

});

module.exports = Sugar.Date.relativeTo;

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    DateUnitIndexes = __webpack_require__(6),
    moveToBeginningOfUnit = __webpack_require__(50),
    getUnitIndexForParamName = __webpack_require__(367);

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
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var iterateOverDateParams = __webpack_require__(48);

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
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    advanceDateWithArgs = __webpack_require__(92);

Sugar.Date.defineInstanceWithArguments({

  'rewind': function(d, args) {
    return advanceDateWithArgs(d, args, -1);
  }

});

module.exports = Sugar.Date.rewind;

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.secondsAgo;

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.secondsFromNow;

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.secondsSince;

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.secondsUntil;

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    updateDate = __webpack_require__(47),
    collectDateArguments = __webpack_require__(93);

Sugar.Date.defineInstanceWithArguments({

  'set': function(d, args) {
    args = collectDateArguments(args);
    return updateDate(d, args[0], args[1]);
  }

});

module.exports = Sugar.Date.set;

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    setISOWeekNumber = __webpack_require__(86);

Sugar.Date.defineInstance({

  'setISOWeek': function(date, num) {
    return setISOWeekNumber(date, num);
  }

});

module.exports = Sugar.Date.setISOWeek;

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    _utc = __webpack_require__(22);

Sugar.Date.defineInstance({

  'setUTC': function(date, on) {
    return _utc(date, on);
  }

});

module.exports = Sugar.Date.setUTC;

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    setWeekday = __webpack_require__(24);

Sugar.Date.defineInstance({

  'setWeekday': function(date, dow) {
    return setWeekday(date, dow);
  }

});

module.exports = Sugar.Date.setWeekday;

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.weeksAgo;

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.weeksFromNow;

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.weeksSince;

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.weeksUntil;

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.yearsAgo;

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.yearsFromNow;

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.yearsSince;

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0);

__webpack_require__(2);

module.exports = Sugar.Date.yearsUntil;

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    _dateOptions = __webpack_require__(60);

module.exports = Sugar.Date.getOption;

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    _dateOptions = __webpack_require__(60);

module.exports = Sugar.Date.setOption;

/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Static Methods
__webpack_require__(388);

// Prototype Methods
__webpack_require__(394);
__webpack_require__(396);
__webpack_require__(397);
__webpack_require__(398);
__webpack_require__(407);
__webpack_require__(408);
__webpack_require__(409);
__webpack_require__(410);
__webpack_require__(411);
__webpack_require__(412);
__webpack_require__(413);
__webpack_require__(414);
__webpack_require__(415);
__webpack_require__(417);
__webpack_require__(418);
__webpack_require__(419);
__webpack_require__(420);
__webpack_require__(421);

module.exports = __webpack_require__(0);

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sugar = __webpack_require__(0),
    DateRangeConstructor = __webpack_require__(389);

Sugar.Date.defineStatic({

  'range': DateRangeConstructor

});

module.exports = Sugar.Date.range;

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    classChecks = __webpack_require__(5),
    getDateForRange = __webpack_require__(103),
    createDateRangeFromString = __webpack_require__(390);

var isString = classChecks.isString;

var DateRangeConstructor = function(start, end) {
  if (arguments.length === 1 && isString(start)) {
    return createDateRangeFromString(start);
  }
  return new Range(getDateForRange(start), getDateForRange(end));
};

module.exports = DateRangeConstructor;

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    DurationTextFormats = __webpack_require__(391),
    incrementDate = __webpack_require__(104),
    getDateForRange = __webpack_require__(103),
    namespaceAliases = __webpack_require__(25),
    getDateIncrementObject = __webpack_require__(106);

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
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FULL_CAPTURED_DURATION = __webpack_require__(392);

module.exports = {
  RANGE_REG_FROM_TO: /(?:from)?\s*(.+)\s+(?:to|until)\s+(.+)$/i,
  RANGE_REG_REAR_DURATION: RegExp('(.+)\\s*for\\s*' + FULL_CAPTURED_DURATION, 'i'),
  RANGE_REG_FRONT_DURATION: RegExp('(?:for)?\\s*'+ FULL_CAPTURED_DURATION +'\\s*(?:starting)?\\s(?:at\\s)?(.+)', 'i')
};

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DURATION_UNITS = __webpack_require__(66);

module.exports = '((?:\\d+)?\\s*(?:' + DURATION_UNITS + '))s?';

/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DURATION_UNITS = __webpack_require__(66);

module.exports = RegExp('(\\d+)?\\s*('+ DURATION_UNITS +')s?', 'i');

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    rangeClamp = __webpack_require__(395),
    defineOnPrototype = __webpack_require__(17);

defineOnPrototype(Range, {

  'clamp': function(el) {
    return rangeClamp(this, el);
  }

});

// This package does not export anything as it is
// simply defining "clamp" on Range.prototype.

/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cloneRangeMember = __webpack_require__(101);

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
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    defineOnPrototype = __webpack_require__(17);

defineOnPrototype(Range, {

  'clone': function() {
    return new Range(this.start, this.end);
  }

});

// This package does not export anything as it is
// simply defining "clone" on Range.prototype.

/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    defineOnPrototype = __webpack_require__(17);

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
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);

// This package does not export anything as it is
// simply defining "days" on Range.prototype.

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MULTIPLIERS = __webpack_require__(105),
    DURATION_UNITS = __webpack_require__(66),
    Range = __webpack_require__(14),
    trunc = __webpack_require__(23),
    forEach = __webpack_require__(27),
    rangeEvery = __webpack_require__(67),
    simpleCapitalize = __webpack_require__(62),
    defineOnPrototype = __webpack_require__(17);

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
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var valueIsNotInfinite = __webpack_require__(401),
    getRangeMemberPrimitiveValue = __webpack_require__(102);

function isValidRangeMember(m) {
  var val = getRangeMemberPrimitiveValue(m);
  return (!!val || val === 0) && valueIsNotInfinite(m);
}

module.exports = isValidRangeMember;

/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function valueIsNotInfinite(m) {
  return m !== -Infinity && m !== Infinity;
}

module.exports = valueIsNotInfinite;

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var withPrecision = __webpack_require__(81);

function incrementNumber(current, amount, precision) {
  return withPrecision(current + amount, precision);
}

module.exports = incrementNumber;

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var chr = __webpack_require__(80);

function incrementString(current, amount) {
  return chr(current.charCodeAt(0) + amount);
}

module.exports = incrementString;

/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mathAliases = __webpack_require__(9),
    getPrecision = __webpack_require__(405);

var max = mathAliases.max;

function getGreaterPrecision(n1, n2) {
  return max(getPrecision(n1), getPrecision(n2));
}

module.exports = getGreaterPrecision;

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var periodSplit = __webpack_require__(406);

function getPrecision(n) {
  var split = periodSplit(n.toString());
  return split[1] ? split[1].length : 0;
}

module.exports = getPrecision;

/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CommonChars = __webpack_require__(44);

var HALF_WIDTH_PERIOD = CommonChars.HALF_WIDTH_PERIOD;

function periodSplit(str) {
  return str.split(HALF_WIDTH_PERIOD);
}

module.exports = periodSplit;

/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    rangeEvery = __webpack_require__(67),
    defineOnPrototype = __webpack_require__(17);

defineOnPrototype(Range, {

  'every': function(amount, fn) {
    return rangeEvery(this, amount, false, fn);
  }

});

// This package does not export anything as it is
// simply defining "every" on Range.prototype.

/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);

// This package does not export anything as it is
// simply defining "hours" on Range.prototype.

/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    defineOnPrototype = __webpack_require__(17);

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
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    rangeIsValid = __webpack_require__(53),
    defineOnPrototype = __webpack_require__(17);

defineOnPrototype(Range, {

  'isValid': function() {
    return rangeIsValid(this);
  }

});

// This package does not export anything as it is
// simply defining "isValid" on Range.prototype.

/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);

// This package does not export anything as it is
// simply defining "milliseconds" on Range.prototype.

/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);

// This package does not export anything as it is
// simply defining "minutes" on Range.prototype.

/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);

// This package does not export anything as it is
// simply defining "months" on Range.prototype.

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);

// This package does not export anything as it is
// simply defining "seconds" on Range.prototype.

/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    mathAliases = __webpack_require__(9),
    rangeIsValid = __webpack_require__(53),
    defineOnPrototype = __webpack_require__(17),
    getRangeMemberNumericValue = __webpack_require__(416);

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
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classChecks = __webpack_require__(5);

var isString = classChecks.isString;

function getRangeMemberNumericValue(m) {
  return isString(m) ? m.charCodeAt(0) : m;
}

module.exports = getRangeMemberNumericValue;

/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    rangeEvery = __webpack_require__(67),
    defineOnPrototype = __webpack_require__(17);

defineOnPrototype(Range, {

  'toArray': function() {
    return rangeEvery(this);
  }

});

// This package does not export anything as it is
// simply defining "toArray" on Range.prototype.

/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    rangeIsValid = __webpack_require__(53),
    defineOnPrototype = __webpack_require__(17);

defineOnPrototype(Range, {

  'toString': function() {
    return rangeIsValid(this) ? this.start + '..' + this.end : 'Invalid Range';
  }

});

// This package does not export anything as it is
// simply defining "toString" on Range.prototype.

/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Range = __webpack_require__(14),
    defineOnPrototype = __webpack_require__(17);

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
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);

// This package does not export anything as it is
// simply defining "weeks" on Range.prototype.

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);

// This package does not export anything as it is
// simply defining "years" on Range.prototype.

/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(423);
__webpack_require__(424);
__webpack_require__(425);
__webpack_require__(426);
__webpack_require__(427);
__webpack_require__(428);
__webpack_require__(429);
__webpack_require__(430);
__webpack_require__(431);
__webpack_require__(432);
__webpack_require__(433);
__webpack_require__(434);
__webpack_require__(435);
__webpack_require__(436);
__webpack_require__(437);
__webpack_require__(438);
__webpack_require__(439);

module.exports = __webpack_require__(0);

/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
    '{shift?} {day|weekday}',
    '{weekday?},? {date} {months?}\\.? {year?}'
  ],
  'timeFrontParse': [
    '{shift?} {day|weekday}',
    '{weekday?},? {date} {months?}\\.? {year?}'
  ]
});


// This package does not export anything as it is
// simply registering the "it" locale.

/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addLocale = __webpack_require__(4);

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

/***/ })
/******/ ]);
});
=======
/** 
 *	 tablefilter v0.6.3 by Max Guglielmi
 *	 build date: 2017-11-30T02:49:15.503Z 
 *	 MIT License  
 */ 

!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var i=e();for(var n in i)("object"==typeof exports?exports:t)[n]=i[n]}}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i=window.webpackJsonp;window.webpackJsonp=function(e,n,s){for(var a,o,u=0,l=[];u<e.length;u++)o=e[u],r[o]&&l.push(r[o][0]),r[o]=0;for(a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a]);for(i&&i(e,n,s);l.length;)l.shift()()};var n={},r={1:0};return e.e=function(t){function i(){o.onerror=o.onload=null,clearTimeout(u);var e=r[t];0!==e&&(e&&e[1](new Error("Loading chunk "+t+" failed.")),r[t]=void 0)}var n=r[t];if(0===n)return new Promise(function(t){t()});if(n)return n[2];var s=new Promise(function(e,i){n=r[t]=[e,i]});n[2]=s;var a=document.getElementsByTagName("head")[0],o=document.createElement("script");o.type="text/javascript",o.charset="utf-8",o.async=!0,o.timeout=12e4,e.nc&&o.setAttribute("nonce",e.nc),o.src=e.p+"tf-"+({}[t]||t)+"-"+{0:"789aa3c9851693c1f448"}[t]+".js";var u=setTimeout(i,12e4);return o.onerror=o.onload=i,a.appendChild(o),s},e.m=t,e.c=n,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e.oe=function(t){throw console.error(t),t},e(e.s=108)}([function(t,e,i){(function(e){(function(){"use strict";function i(t){function e(t,e,i){_(n,t,function(t,r,o){var u=a(t,r,o);return s(n,u.methods,e,i,u.last),n})}var i="Object"===t,n=h(t),r=function(e){function r(t,e){return i&&e===d&&(!D||"get"===t||"set"===t)}function s(t,i){var n=e[t];if(n)for(var r,s=0;r=n[s];s++)if(r===i)return!0;return!1}function a(t,i){return e[t]&&!s(t,i)}function o(t,i,n){if(!i[t]||!n)return!1;for(var r=0;r<n.length;r++)if(!1===e[n[r]])return!0}function u(t){return s("except",t)}function l(t,e,i){return!r(t,i)&&!o(t,i,e.flags)&&!u(t)}var f,h=I[t],d=h.prototype,m={},p={};if(e=e||{},f=e.methods,!function(){return s("except",h)||a("namespaces",h)}())return i&&"boolean"==typeof e.objectPrototype&&(D=e.objectPrototype),U(f||n,function(t,e){f&&(e=t,t=n[e]),k(t,"instance")&&l(e,t,d)&&(p[e]=t.instance),k(t,"static")&&l(e,t,h)&&(m[e]=t)}),c(h,m),c(d,p),f||_(n,"active",!0),n};return e("defineStatic",N),e("defineInstance",F),e("defineInstanceAndStatic",F|N),e("defineStaticWithArguments",N,!0),e("defineInstanceWithArguments",F,!0),_(n,"defineStaticPolyfill",function(e,i,r){var s=a(e,i,r);return c(I[t],s.methods,!0,s.last),n}),_(n,"defineInstancePolyfill",function(e,i,r){var s=a(e,i,r);return c(I[t].prototype,s.methods,!0,s.last),U(s.methods,function(t,e){d(n,e,t)}),n}),_(n,"alias",function(t,e){var i="string"==typeof e?n[e]:e;return f(n,t,i),n}),_(n,"extend",r),M[t]=n,A["[object "+t+"]"]=n,b(t),m(n),T[t]=n}function n(){_(T,"extend",T),_(T,"toString",r),_(T,"createNamespace",i),_(T,"util",{hasOwn:k,getOwn:E,setProperty:_,classToString:C,defineProperty:L,forEachProperty:U,mapNativeToChainable:b})}function r(){return S}function s(t,e,i,n,r){U(e,function(e,s){var a,l=e;n&&(l=u(e)),r&&(l.flags=r),i&F&&!e.instance&&(a=o(e,n),_(l,"instance",a)),i&N&&_(l,"static",!0),f(t,s,l),t.active&&t.extend(s)})}function a(t,e,i){var n,r;return"string"==typeof t?(n={},n[t]=e,r=i):(n=t,r=e),{last:r,methods:n}}function o(t,e){return e?u(t,!0):l(t)}function u(t,e){var i=t.length-1-(e?1:0);return function(){var n,r=[],s=[];e&&r.push(this),n=Math.max(arguments.length,i);for(var a=0;a<n;a++)a<i?r.push(arguments[a]):s.push(arguments[a]);return r.push(s),t.apply(this,r)}}function l(t){switch(t.length){case 0:case 1:return function(){return t(this)};case 2:return function(e){return t(this,e)};case 3:return function(e,i){return t(this,e,i)};case 4:return function(e,i,n){return t(this,e,i,n)};case 5:return function(e,i,n,r){return t(this,e,i,n,r)}}}function c(t,e,i,n){U(e,function(e,r){i&&!n&&t[r]||_(t,r,e)})}function f(t,e,i){t[e]=i,i.instance&&d(t,e,i.instance,!0)}function h(t){var e=function(t,i){if(!(this instanceof e))return new e(t,i);this.constructor!==e&&(t=this.constructor.apply(t,arguments)),this.raw=t};return _(e,"toString",function(){return S+t}),_(e.prototype,"valueOf",function(){return this.raw}),e}function d(t,e,i){var n,r,s,a=v(i);s=j.prototype,n=s[e],r=n&&n!==Object.prototype[e],n&&n.disambiguate||(s[e]=r?y(e):a),t.prototype[e]=a,t===T.Object&&p(e,a)}function m(t){U(T.Object&&T.Object.prototype,function(e,i){"function"==typeof e&&g(t,i,e)})}function p(t,e){U(M,function(i){g(i,t,e)})}function g(t,e,i){var n=t.prototype;k(n,e)||(n[e]=i)}function v(t){return function(){return new j(t.apply(this.raw,arguments))}}function y(t){var e=function(){var e,i,n=this.raw;if(null!=n&&(e=A[C(n)]),e||(e=T.Object),i=new e(n)[t],i.disambiguate)throw new TypeError("Cannot resolve namespace for "+n);return i.apply(this,arguments)};return e.disambiguate=!0,e}function b(t,e){var i=M[t],n=I[t].prototype;!e&&H&&(e=H(n)),U(e,function(t){if(!w(t)){try{var e=n[t];if("function"!=typeof e)return}catch(t){return}d(i,t,e)}})}function w(t){return"constructor"===t||"valueOf"===t||"__proto__"===t}function x(t,e,i){t[e]=i.value}function _(t,e,i,n){L(t,e,{value:i,enumerable:!!n,configurable:!0,writable:!0})}function C(t){return B.call(t)}function k(t,e){return!!t&&z.call(t,e)}function E(t,e){if(k(t,e))return t[e]}var T,S="Sugar",O="Object Number String Array Date RegExp Function",N=1,F=2,P=!(!Object.defineProperty||!Object.defineProperties),I=void 0!==e&&e.Object===Object?e:this,R=void 0!==t&&t.exports,D=!1,M={},A={},L=P?Object.defineProperty:x,j=h("Chainable"),H=Object.getOwnPropertyNames,B=Object.prototype.toString,z=Object.prototype.hasOwnProperty,U=function(t,e){for(var i in t)if(k(t,i)&&!1===e.call(t,t[i],i,t))break};!function(){if(!(T=I[S])){if(T=function(t){return U(T,function(e,i){k(M,i)&&e.extend(t)}),T},R)t.exports=T;else try{I[S]=T}catch(t){}U(O.split(" "),function(t){i(t)}),n()}}()}).call(this)}).call(e,i(71))},function(t,e,i){"use strict";i(183)()},function(t,e,i){"use strict";i(268)()},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=(e.EMPTY_FN=function(){},e.isObj=function(t){return"[object Object]"===Object.prototype.toString.call(t)},e.isFn=function(t){return"[object Function]"===Object.prototype.toString.call(t)},e.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},e.isString=function(t){return"[object String]"===Object.prototype.toString.call(t)},e.isNumber=function(t){return"[object Number]"===Object.prototype.toString.call(t)},e.isBoolean=function(t){return"[object Boolean]"===Object.prototype.toString.call(t)},e.isUndef=function(t){return void 0===t}),r=e.isNull=function(t){return null===t};e.isEmpty=function(t){return n(t)||r(t)||0===t.length}},function(t,e,i){"use strict";var n=i(0),r=i(8),s=r.localeManager;n.Date.defineStatic({addLocale:function(t,e){return s.add(t,e)}}),t.exports=n.Date.addLocale},function(t,e,i){"use strict";var n,r,s,a,o,u,l,c,f,h,d,m=i(143),p=i(27),g=i(77),v=i(45),y=i(144),b=i(12),w=b.classToString;!function(){function t(t){C["[object "+t+"]"]=!0}function e(t){return C[t]}function i(t,e){return e&&g(new e,"Object")?b(e):x(t)}function b(t){var e=String(t);return function(t){return String(t.constructor)===e}}function x(t){return function(e,i){return g(e,t,i)}}function _(t){var e=t.toLowerCase();return function(i){var n=typeof i;return n===e||"object"===n&&g(i,t)}}var C={};!function(){var e=v(m);r=_(e[0]),s=_(e[1]),a=_(e[2]),o=i(e[3]),u=i(e[4]),l=i(e[5]),c=Array.isArray||i(e[6]),d=i(e[7]),f=i(e[8],"undefined"!=typeof Set&&Set),h=i(e[9],"undefined"!=typeof Map&&Map),t("Arguments"),t(e[0]),t(e[1]),t(e[2]),t(e[3]),t(e[4]),t(e[6])}(),function(){p(v("Int8 Uint8 Uint8Clamped Int16 Uint16 Int32 Uint32 Float32 Float64"),function(e){t(e+"Array")})}(),n=function(t,i){return i=i||w(t),e(i)||y(t,i)}}(),t.exports={isSerializable:n,isBoolean:r,isNumber:s,isString:a,isDate:o,isRegExp:u,isFunction:l,isArray:c,isSet:f,isMap:h,isError:d}},function(t,e,i){"use strict";t.exports={HOURS_INDEX:3,DAY_INDEX:4,WEEK_INDEX:5,MONTH_INDEX:6,YEAR_INDEX:7}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.defaultsFn=e.defaultsArr=e.defaultsNb=e.defaultsStr=e.defaultsBool=void 0;var n=i(3);e.defaultsBool=function(t,e){return(0,n.isBoolean)(t)?t:e},e.defaultsStr=function(t,e){return(0,n.isString)(t)?t:e},e.defaultsNb=function(t,e){return isNaN(t)?e:t},e.defaultsArr=function(t,e){return(0,n.isArray)(t)?t:e},e.defaultsFn=function(t,e){return(0,n.isFn)(t)?t:e}},function(t,e,i){"use strict";var n,r,s=i(131),a=i(73),o=i(135);!function(){function t(t){this.locales={},this.add(t)}t.prototype={get:function(t,e){var i=this.locales[t];return!i&&s[t]?i=this.add(t,s[t]):!i&&t&&(i=this.locales[t.slice(0,2)]),i||!1===e?i:this.current},getAll:function(){return this.locales},set:function(t){var e=this.get(t,!1);if(!e)throw new TypeError("Invalid Locale: "+t);return this.current=e},add:function(t,e){e?e.code=t:(e=t,t=e.code);var i=e.compiledFormats?e:o(e);return this.locales[t]=i,this.current||(this.current=i),i},remove:function(t){return this.current.code===t&&(this.current=this.get("en")),delete this.locales[t]}},n=o(a),r=new t(n)}(),t.exports={English:n,localeManager:r}},function(t,e,i){"use strict";t.exports={abs:Math.abs,pow:Math.pow,min:Math.min,max:Math.max,ceil:Math.ceil,floor:Math.floor,round:Math.round}},function(t,e,i){"use strict";function n(){return o.documentElement.classList}Object.defineProperty(e,"__esModule",{value:!0}),e.tag=e.elm=e.createCheckItem=e.createOpt=e.removeClass=e.addClass=e.hasClass=e.createText=e.removeElm=e.createElm=e.getFirstTextNode=e.getText=void 0;var r=i(16),s=i(3),a=i(21),o=r.root.document,u=(e.getText=function(t){return(0,s.isUndef)(t.textContent)?(0,a.trim)(t.innerText):(0,a.trim)(t.textContent)},e.getFirstTextNode=function(t){for(var e=0;e<t.childNodes.length;e++){var i=t.childNodes[e];if(3===i.nodeType)return i.data}},e.createElm=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];var n=e[0];if(!(0,s.isString)(n))return null;for(var r=o.createElement(n),a=0;a<e.length;a++){var u=e[a];(0,s.isArray)(u)&&2===u.length&&r.setAttribute(u[0],u[1])}return r}),l=(e.removeElm=function(t){return t.parentNode.removeChild(t)},e.createText=function(t){return o.createTextNode(t)}),c=e.hasClass=function(t,e){return!(0,s.isUndef)(t)&&(n()?t.classList.contains(e):t.className.match(new RegExp("(\\s|^)"+e+"(\\s|$)")))};e.addClass=function(t,e){if(!(0,s.isUndef)(t))return n()?void t.classList.add(e):void(""===t.className?t.className=e:c(t,e)||(t.className+=" "+e))},e.removeClass=function(t,e){if(!(0,s.isUndef)(t)){if(n())return void t.classList.remove(e);var i=new RegExp("(\\s|^)"+e+"(\\s|$)","g");t.className=t.className.replace(i,"")}},e.createOpt=function(t,e,i){var n=!!i,r=n?u("option",["value",e],["selected","true"]):u("option",["value",e]);return r.appendChild(l(t)),r},e.createCheckItem=function(t,e,i){var n=u("li"),r=u("label",["for",t]),s=u("input",["id",t],["name",t],["type","checkbox"],["value",e]);return r.appendChild(s),r.appendChild(l(i)),n.appendChild(r),n.label=r,n.check=s,n},e.elm=function(t){return o.getElementById(t)},e.tag=function(t,e){return t.getElementsByTagName(e)}},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();e.Feature=function(){function t(e,i){var r=this;n(this,t),this.tf=e,this.feature=i,this.enabled=e[i],this.config=e.config(),this.emitter=e.emitter,this.initialized=!1,this.emitter.on(["destroy"],function(){return r.destroy()})}return r(t,[{key:"init",value:function(){throw new Error("Not implemented.")}},{key:"reset",value:function(){this.enable(),this.init()}},{key:"destroy",value:function(){throw new Error("Not implemented.")}},{key:"enable",value:function(){this.enabled=!0}},{key:"disable",value:function(){this.enabled=!1}},{key:"isEnabled",value:function(){return!0===this.enabled}}]),t}()},function(t,e,i){"use strict";var n=i(0);t.exports={hasOwn:n.util.hasOwn,getOwn:n.util.getOwn,setProperty:n.util.setProperty,classToString:n.util.classToString,defineProperty:n.util.defineProperty,forEachProperty:n.util.forEachProperty,mapNativeToChainable:n.util.mapNativeToChainable}},function(t,e,i){"use strict";i(323)()},function(t,e,i){"use strict";function n(t,e){this.start=r(t),this.end=r(e)}var r=i(101);t.exports=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FEATURES=e.AUTO_FILTER_DELAY=e.IP_ADDRESS=e.DATE=e.FORMATTED_NUMBER=e.NUMBER=e.STRING=e.CELL_TAG=e.HEADER_TAG=e.DOWN_ARROW_KEY=e.UP_ARROW_KEY=e.ESC_KEY=e.TAB_KEY=e.ENTER_KEY=e.NONE=e.CHECKLIST=e.MULTIPLE=e.SELECT=e.INPUT=void 0;var n=i(111),r=i(112),s=i(113),a=i(117),o=i(118),u=i(119),l=i(120),c=i(121),f=i(122),h=i(123),d=i(124),m=i(125),p=i(126),g=i(127),v=i(33);e.INPUT="input",e.SELECT="select",e.MULTIPLE="multiple",e.CHECKLIST="checklist",e.NONE="none",e.ENTER_KEY=13,e.TAB_KEY=9,e.ESC_KEY=27,e.UP_ARROW_KEY=38,e.DOWN_ARROW_KEY=40,e.HEADER_TAG="TH",e.CELL_TAG="TD",e.STRING="string",e.NUMBER="number",e.FORMATTED_NUMBER="formatted-number",e.DATE="date",e.IP_ADDRESS="ipaddress",e.AUTO_FILTER_DELAY=750,e.FEATURES={dateType:{class:n.DateType,name:"dateType"},help:{class:r.Help,name:"help",enforce:!0},state:{class:s.State,name:"state"},markActiveColumns:{class:c.MarkActiveColumns,name:"markActiveColumns"},gridLayout:{class:a.GridLayout,name:"gridLayout"},loader:{class:o.Loader,name:"loader"},highlightKeyword:{class:u.HighlightKeyword,name:"highlightKeyword",property:"highlightKeywords"},popupFilter:{class:l.PopupFilter,name:"popupFilter",property:"popupFilters"},rowsCounter:{class:f.RowsCounter,name:"rowsCounter"},statusBar:{class:h.StatusBar,name:"statusBar"},clearButton:{class:d.ClearButton,name:"clearButton",property:"btnReset"},alternateRows:{class:m.AlternateRows,name:"alternateRows"},noResults:{class:p.NoResults,name:"noResults"},paging:{class:g.Paging,name:"paging"},toolbar:{class:v.Toolbar,name:"toolbar",enforce:!0}}},function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.root="object"===("undefined"==typeof self?"undefined":i(self))&&self.self===self&&self||"object"===(void 0===t?"undefined":i(t))&&t.global===t&&t||void 0}).call(e,i(71))},function(t,e,i){"use strict";function n(t,e){var i=t.prototype;s(e,function(t,e){i[e]=t})}var r=i(12),s=r.forEachProperty;t.exports=n},function(t,e,i){"use strict";function n(t,e){return t["get"+(r(t)?"UTC":"")+e]()}var r=i(22);t.exports=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.keyCode=e.targetEvt=e.cancelEvt=e.stopEvt=e.removeEvt=e.addEvt=void 0;var n=i(16);e.addEvt=function(t,e,i,n){t.addEventListener?t.addEventListener(e,i,n):t.attachEvent?t.attachEvent("on"+e,i):t["on"+e]=i},e.removeEvt=function(t,e,i,n){t.removeEventListener?t.removeEventListener(e,i,n):t.detachEvent?t.detachEvent("on"+e,i):t["on"+e]=null},e.stopEvt=function(t){t||(t=n.root.event),t.stopPropagation?t.stopPropagation():t.cancelBubble=!0},e.cancelEvt=function(t){t||(t=n.root.event),t.preventDefault?t.preventDefault():t.returnValue=!1},e.targetEvt=function(t){return t||(t=n.root.event),t.target||t.srcElement},e.keyCode=function(t){return t.charCode?t.charCode:t.keyCode?t.keyCode:t.which?t.which:0}},function(t,e,i){"use strict";function n(t){return r(t,"Day")}var r=i(18);t.exports=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.contains=e.matchCase=e.rgxEsc=e.isEmpty=e.trim=void 0;var n=i(129),r=e.trim=function(t){return t.trim?t.trim():t.replace(/^\s*|\s*$/g,"")},s=(e.isEmpty=function(t){return""===r(t)},e.rgxEsc=function(t){var e=/[-\/\\^$*+?.()|[\]{}]/g;return String(t).replace(e,"\\$&")});e.matchCase=function(t){return arguments.length>1&&void 0!==arguments[1]&&arguments[1]?t:t.toLowerCase()},e.contains=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=void 0,u=r?"g":"gi";return a&&(t=(0,n.remove)(t),e=(0,n.remove)(e)),o=i?new RegExp("(^\\s*)"+s(t)+"(\\s*$)",u):new RegExp(s(t),u),o.test(e)}},function(t,e,i){"use strict";var n=i(149);t.exports=n("utc")},function(t,e,i){"use strict";var n=i(9),r=n.ceil,s=n.floor,a=Math.trunc||function(t){return 0!==t&&isFinite(t)?t<0?r(t):s(t):t};t.exports=a},function(t,e,i){"use strict";function n(t,e,i){if(l(e)){var n=a(t);if(i){var o=i>0?1:-1,u=e%7-n;u&&u/c(u)!==o&&(e+=7*o)}return r(t,s(t)+e-n),t.getTime()}}var r=i(36),s=i(37),a=i(20),o=i(5),u=i(9),l=o.isNumber,c=u.abs;t.exports=n},function(t,e,i){"use strict";var n=i(0);t.exports={sugarObject:n.Object,sugarArray:n.Array,sugarDate:n.Date,sugarString:n.String,sugarNumber:n.Number,sugarFunction:n.Function,sugarRegExp:n.RegExp}},function(t,e,i){"use strict";i(399)()},function(t,e,i){"use strict";function n(t,e){for(var i=0,n=t.length;i<n;i++){if(!(i in t))return r(t,e,i);e(t[i],i)}}var r=i(139);t.exports=n},function(t,e,i){"use strict";function n(t){return void 0!==t}t.exports=n},function(t,e,i){"use strict";var n=i(79),r=[{name:"millisecond",method:"Milliseconds",multiplier:1,start:0,end:999},{name:"second",method:"Seconds",multiplier:1e3,start:0,end:59},{name:"minute",method:"Minutes",multiplier:6e4,start:0,end:59},{name:"hour",method:"Hours",multiplier:36e5,start:0,end:23},{name:"day",alias:"date",method:"Date",ambiguous:!0,multiplier:864e5,start:1,end:function(t){return n(t)}},{name:"week",method:"ISOWeek",ambiguous:!0,multiplier:6048e5},{name:"month",method:"Month",ambiguous:!0,multiplier:26298e5,start:0,end:11},{name:"year",method:"FullYear",ambiguous:!0,multiplier:315576e5,start:0}];t.exports=r},function(t,e,i){"use strict";function n(t){return r(t,"FullYear")}var r=i(18);t.exports=n},function(t,e,i){"use strict";function n(t){return r(t,"Month")}var r=i(18);t.exports=n},function(t,e,i){"use strict";function n(t,e,i){return r(null,t,e,i).date}var r=i(59);t.exports=n},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Toolbar=e.CENTER=e.RIGHT=e.LEFT=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(10),l=i(7),c=i(3),f=["initializing-feature","initializing-extension"],h=(e.LEFT="left",e.RIGHT="right");e.CENTER="center",e.Toolbar=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"toolbar")),s=i.config.toolbar||{};return i.contCssClass=(0,l.defaultsStr)(s.container_css_class,"inf"),i.lContCssClass=(0,l.defaultsStr)(s.left_cont_css_class,"ldiv"),i.rContCssClass=(0,l.defaultsStr)(s.right_cont_css_class,"rdiv"),i.cContCssClass=(0,l.defaultsStr)(s.center_cont_css_class,"mdiv"),i.tgtId=(0,l.defaultsStr)(s.target_id,null),i.cont=null,i.lCont=null,i.rCont=null,i.cCont=null,i.innerCont={left:null,center:null,right:null},i.emitter.on(f,function(t,e){return i.init(e)}),i.enabled=!0,i}return s(e,t),a(e,[{key:"init",value:function(t){if(!this.initialized&&!t){var e=this.tf,i=(0,u.createElm)("div");if(i.className=this.contCssClass,this.tgtId)(0,u.elm)(this.tgtId).appendChild(i);else if(e.gridLayout){var n=e.Mod.gridLayout;n.tblMainCont.appendChild(i),i.className=n.infDivCssClass}else{var r=(0,u.createElm)("caption");r.appendChild(i),e.dom().insertBefore(r,e.dom().firstChild)}this.cont=i,this.lCont=this.createContainer(i,this.lContCssClass),this.rCont=this.createContainer(i,this.rContCssClass),this.cCont=this.createContainer(i,this.cContCssClass),this.innerCont={left:this.lCont,center:this.cCont,right:this.rCont},this.initialized=!0,(0,c.isUndef)(e.help)&&(e.Mod.help.enable(),this.emitter.emit("init-help",e))}}},{key:"container",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,e=arguments[1],i=this.innerCont[t];return e&&i.appendChild(e),i}},{key:"createContainer",value:function(t,e){var i=(0,u.createElm)("div",["class",e]);return t.appendChild(i),i}},{key:"destroy",value:function(){if(this.initialized){var t=this.tf;(0,u.removeElm)(this.cont),this.cont=null;var e=t.dom(),i=(0,u.tag)(e,"caption");[].forEach.call(i,function(t){return(0,u.removeElm)(t)}),this.initialized=!1}}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e,i,n){return o(e,function(e,s){var o=n?e.end:e.start;return u(o)&&(o=o(t)),a(t,e.method,o),!r(i)||s>i}),t}var r=i(28),s=i(5),a=i(35),o=i(85),u=s.isFunction;t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){n&&i===s(t,e,i)||t["set"+(r(t)?"UTC":"")+e](i)}var r=i(22),s=i(18);t.exports=n},function(t,e,i){"use strict";function n(t,e){r(t,"Date",e)}var r=i(35);t.exports=n},function(t,e,i){"use strict";function n(t){return r(t,"Date")}var r=i(18);t.exports=n},function(t,e,i){"use strict";function n(t){var e=new Date(t.getTime());return r(e,!!r(t)),e}var r=i(22);t.exports=n},function(t,e,i){"use strict";function n(t){return void 0===t}t.exports=n},function(t,e,i){"use strict";function n(t){return t===u?a:t===o?s:t-1}var r=i(6),s=r.HOURS_INDEX,a=r.DAY_INDEX,o=r.WEEK_INDEX,u=r.MONTH_INDEX;t.exports=n},function(t,e,i){"use strict";function n(){return r("newDateInternal")()}var r=i(60);t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){var s={};return s[e]=i,r(t,s,n,1)}var r=i(47);t.exports=n},function(t,e,i){"use strict";function n(t){return r({},t)}var r=i(55);t.exports=n},function(t,e,i){"use strict";t.exports={HALF_WIDTH_ZERO:48,FULL_WIDTH_ZERO:65296,HALF_WIDTH_PERIOD:".",FULL_WIDTH_PERIOD:"．",HALF_WIDTH_COMMA:",",OPEN_BRACE:"{",CLOSE_BRACE:"}"}},function(t,e,i){"use strict";function n(t){return t.split(" ")}t.exports=n},function(t,e,i){"use strict";function n(t){return t.getTimezoneOffset()}t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n,s,h){function m(t,e){s&&!F&&(F="weekday"===t?x:v(e))}function T(t){t>e.specificity||(e.specificity=t)}function S(t,i,n){if(i){var s=r[g(i)],a=k(t.multiplier/s.multiplier*n);e[s.name]=a}}function O(t,e){return e<0&&(e=e%12+12),e%12!==l(t)}function N(e,i,s,l){var c,p,g=s.method;return m(e,l),T(l),p=i%1,p&&(S(s,l,p),i=a(i)),"weekday"===e?void(n||f(t,i,h)):(c=l===_&&u(t)>28,n&&!s.ambiguous?void t.setTime(t.getTime()+i*n*s.multiplier):(n&&(l===x&&(i*=7,g=r[w].method),i=i*n+d(t,g)),y(t,g,i,n),void(c&&O(t,i)&&o(t,0))))}var F;if(E(e)&&n)e={millisecond:e};else if(E(e))return t.setTime(e),t;return b(e,N),i&&e.specificity&&p(t,e.specificity),function(){if(F&&!(F>C))switch(s){case-1:return t>c();case 1:return t<c()}}()&&function(){var t=r[F];n=s,N(t.name,1,t,F)}(),t}var r=i(29),s=i(6),a=i(23),o=i(36),u=i(37),l=i(31),c=i(41),f=i(24),h=i(9),d=i(18),m=i(5),p=i(162),g=i(40),v=i(163),y=i(164),b=i(48),w=s.DAY_INDEX,x=s.WEEK_INDEX,_=s.MONTH_INDEX,C=s.YEAR_INDEX,k=h.round,E=m.isNumber;t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){function r(i,n,r){var o=a(t,i);s(o)&&e(i,o,n,r)}o(function(t,e){var i=r(t.name,t,e);return!1!==i&&e===u&&(i=r("weekday",t,e)),i},i,n)}var r=i(6),s=i(28),a=i(167),o=i(58),u=r.DAY_INDEX;t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){return e===l&&a(t,c.get(i).getFirstDayOfWeek()),u(t,o(e),n,!0)}var r=i(8),s=i(6),a=i(89),o=i(40),u=i(34),l=s.WEEK_INDEX,c=r.localeManager;t.exports=n},function(t,e,i){"use strict";function n(t,e,i){return e===l&&o(t,c.get(i).getFirstDayOfWeek()),u(t,a(e))}var r=i(8),s=i(6),a=i(40),o=i(61),u=i(34),l=s.WEEK_INDEX,c=r.localeManager;t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){a(t,s(e,i),n)}var r=i(184),s=i(186),a=r.defineInstance;t.exports=n},function(t,e,i){"use strict";function n(t){return!isNaN(t.getTime())}t.exports=n},function(t,e,i){"use strict";function n(t){return r(t.start)&&r(t.end)&&typeof t.start==typeof t.end}var r=i(400);t.exports=n},function(t,e,i){"use strict";function n(t){return s(a(r),t)}var r=i(133),s=i(55),a=i(43);t.exports=n},function(t,e,i){"use strict";function n(t,e){return s(e,function(e,i){t[i]=e}),t}var r=i(12),s=r.forEachProperty;t.exports=n},function(t,e,i){"use strict";t.exports={ISO_FIRST_DAY_OF_WEEK:1,ISO_FIRST_DAY_OF_WEEK_YEAR:4}},function(t,e,i){"use strict";function n(t,e){return!!t&&"object"===(e||typeof t)}t.exports=n},function(t,e,i){"use strict";function n(t,e,i){i=i||0,a(e)&&(e=o);for(var n=e;n>=i&&!1!==t(r[n],n);n--);}var r=i(29),s=i(6),a=i(39),o=s.YEAR_INDEX;t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){function a(t,e){var i=D(tt,"params")||{};return c(e.to,function(e,n){var r,a,o=t[n+1];o&&("yy"===e||"y"===e?(e="year",a=O(o,$,D(tt,"prefer"))):(r=D(s,e))?(e=r.param||e,a=E(r,o)):a=Q.getTokenValue(e,o),i[e]=a)}),i}function o(t,e){return u(t)&&!d(D(tt,"fromUTC"))&&(tt.fromUTC=!0),u(t)&&!d(D(tt,"setUTC"))&&(tt.setUTC=!0),e&&(t=new Date(t.getTime())),t}function y(t){et.push(t)}function k(){c(et,function(t){t.call()})}function z(t){1===t&&J.hour<12?J.hour+=12:0===t&&12===J.hour&&(J.hour=0)}function U(t,e,i){u($,!0);var n=(i||1)*(60*(t||0)+(e||0));n&&(J.minute=(J.minute||0)-n)}function W(){d(J.month)?J.unit=B:d(J.weekday)&&(J.unit=j)}function V(t){d(J.weekday)?q(t):d(J.month)&&(J.date=J.num)}function Y(t){J.hour=t%24,t>23&&y(function(){b($,"date",l(t/24))})}function K(){h($),v(J.unit)&&(J.unit=L,J.num=J.day,delete J.day)}function G(t){var e=d(J.num)?J.num:1;d(J.weekday)&&(t===H?(q(e),e=1):(p($,{weekday:J.weekday},!0),delete J.weekday)),J.half&&(e*=J.half),d(J.shift)?e*=J.shift:J.sign&&(e*=J.sign),d(J.day)&&(e+=J.day,delete J.day),Z(t),J[M.units[t]]=e,it=!0}function X(t,e){var i,n=e.unit;n||N(e,function(t,i,r,s){"weekday"===t&&d(e.month)||(n=s)}),n===H&&d(e.weekday)&&(i=e.weekday,delete e.weekday),y(function(){var e;t<0?T($,n,D(tt,"locale")):t>0&&(1===t&&(e=L,T($,L)),_($,n,D(tt,"locale"),e)),d(i)&&(m($,i,-t),h($))}),e.specificity=n===H?L:n-1}function q(t){J.weekday=7*(t-1)+J.weekday,J.date=1,nt=1}function Z(t){var e;S(J,function(i,n,r,s){if(s>=t)return $.setTime(NaN),!1;s<t&&(e=e||{},e[i]=n,C(J,i))}),e&&(y(function(){p($,e,!0,!1,D(tt,"prefer"),nt)}),J.edge&&(X(J.edge,e),delete J.edge))}var $,J,Q,tt,et,it,nt;return et=[],tt=function(t){var e=P(t)?{locale:t}:t||{};return e.prefer=+!!D(e,"future")-+!!D(e,"past"),e}(i),$=t&&e?o(t,!0):g(),u($,D(tt,"fromUTC")),P(e)?$=function(t){t=t.toLowerCase(),Q=A.get(D(tt,"locale"));for(var e,i,n=0;e=Q.compiledFormats[n];n++)if(i=t.match(e.reg)){if(Q.cacheFormat(e,n),J=a(i,e),d(J.timestamp)){t=J.timestamp,J=null;break}d(J.ampm)&&z(J.ampm),(J.utc||d(J.tzHour))&&U(J.tzHour,J.tzMinute,J.tzSign),d(J.shift)&&v(J.unit)&&W(),d(J.num)&&v(J.unit)&&V(J.num),J.midday&&Y(J.midday),d(J.day)&&K(J.day),d(J.unit)&&G(J.unit),J.edge&&X(J.edge,J),J.yearSign&&(J.year*=J.yearSign);break}return J?it?p($,J,!1,1):(u($)&&h($),p($,J,!0,0,D(tt,"prefer"),nt)):($=new Date(t),D(tt,"fromUTC")&&$.setTime($.getTime()+f($)*r)),k(),$}(e):I(e)?$=o(e,R(tt,"clone")||n):x(e)?(J=w(e),p($,J,!0)):(F(e)||null===e)&&$.setTime(e),u($,!!D(tt,"setUTC")),{set:J,date:$}}var r=i(83),s=i(74),a=i(8),o=i(6),u=i(22),l=i(23),c=i(27),f=i(46),h=i(84),d=i(28),m=i(24),p=i(47),g=i(41),v=i(39),y=i(5),b=i(42),w=i(43),x=i(57),_=i(49),C=i(169),k=i(12),E=i(170),T=i(50),S=i(48),O=i(171),N=i(172),F=y.isNumber,P=y.isString,I=y.isDate,R=k.hasOwn,D=k.getOwn,M=a.English,A=a.localeManager,L=o.DAY_INDEX,j=o.WEEK_INDEX,H=o.MONTH_INDEX,B=o.YEAR_INDEX;t.exports=n},function(t,e,i){"use strict";var n=i(158),r=i(25),s=i(160),a=r.sugarDate;t.exports=s(a,n)},function(t,e,i){"use strict";function n(t,e){return r(t,7*o((s(t)-e)/7)+e),t}var r=i(24),s=i(20),a=i(9),o=a.floor;t.exports=n},function(t,e,i){"use strict";function n(t){return t.charAt(0).toUpperCase()+t.slice(1)}t.exports=n},function(t,e,i){"use strict";function n(t,e,i){var n,o,u=e>t;if(u||(o=e,e=t,t=o),n=e-t,i.multiplier>1&&(n=r(n/i.multiplier)),i.ambiguous)for(t=s(t),n&&a(t,i.name,n);t<e&&(a(t,i.name,1),!(t>e));)n+=1;return u?-n:n}var r=i(23),s=i(38),a=i(42);t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n,r){var o=a(t).toString(n||10);return o=s(r||"0",e-o.replace(/\.\d+/,"").length)+o,(i||t<0)&&(o=(t<0?"-":"+")+o),o}var r=i(9),s=i(299),a=r.abs;t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){var r,m=0;for(u(i)&&(i=h),u(n)&&(n=d),r=l(o(t),i),f(r,i,n),e&&t<r&&(r=c(o(t),i),f(r,i,n));r<=t;)s(r,a(r)+7),m++;return m}var r=i(56),s=i(36),a=i(37),o=i(38),u=i(39),l=i(89),c=i(61),f=i(87),h=r.ISO_FIRST_DAY_OF_WEEK,d=r.ISO_FIRST_DAY_OF_WEEK_YEAR;t.exports=n},function(t,e,i){"use strict";t.exports="year|month|week|day|hour|minute|second|millisecond"},function(t,e,i){"use strict";function n(t,e,i,n){var r,p,g,v,y=t.start,b=t.end,w=b<y,x=y,_=0,C=[];if(!s(t))return i?NaN:[];for(m(e)&&(n=e,e=null),e=e||1,f(y)?(p=l(y,e),r=function(){return o(x,e,p)}):h(y)?r=function(){return u(x,e)}:d(y)&&(g=c(e),e=g[0],v=g[1],r=function(){return a(x,e,v)}),w&&e>0&&(e*=-1);w?x>=b:x<=b;)i||C.push(x),n&&n(x,_,t),x=r(),_++;return i?_-1:C}var r=i(5),s=i(53),a=i(104),o=i(402),u=i(403),l=i(404),c=i(106),f=r.isNumber,h=r.isString,d=r.isDate,m=r.isFunction;t.exports=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parse=void 0;var n=i(3);e.parse=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".";if((0,n.isNumber)(t))return t;var i=new RegExp("[^0-9-"+e+"]",["g"]),r=parseFloat((""+t).replace(/\((.*)\)/,"-$1").replace(i,"").replace(e,"."));return isNaN(r)?0:r}},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.BaseDropdown=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(107),l=i(3),c=i(15);e.BaseDropdown=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"baseDropdown")),s=i.config;return i.customSorter=(0,l.isObj)(s.filter_options_sorter)&&(0,l.isArray)(s.filter_options_sorter.col)&&(0,l.isArray)(s.filter_options_sorter.comparer)?s.filter_options_sorter:null,i.isCustom=!1,i.opts=[],i.optsTxt=[],i.excludedOpts=[],i}return s(e,t),a(e,[{key:"sortOptions",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=this.tf;if(i.isCustomOptions(t)||!i.sortSlc||(0,l.isArray)(i.sortSlc)&&-1===i.sortSlc.indexOf(t))return e;var n=i.caseSensitive,r=i.sortNumDesc,s=void 0;if(this.customSorter&&-1!==this.customSorter.col.indexOf(t)){var a=this.customSorter.col.indexOf(t);s=this.customSorter.comparer[a]}else if(i.hasType(t,[c.NUMBER,c.FORMATTED_NUMBER])){var o=i.getDecimal(t),f=u.numSortAsc;!0!==r&&-1===r.indexOf(t)||(f=u.numSortDesc),s=(0,u.sortNumberStr)(f,o)}else if(i.hasType(t,[c.DATE])){var h=i.feature("dateType").getLocale(t),d=u.dateSortAsc;s=(0,u.sortDateStr)(d,h)}else s=n?void 0:u.ignoreCase;return e.sort(s)}},{key:"refreshFilters",value:function(t){var e=this;t.forEach(function(t){var i=e.getValues(t);e.build(t,e.tf.linkedFilters),e.selectOptions(t,i)})}},{key:"isValidLinkedValue",value:function(t,e){var i=this.tf;if(i.disableExcludedOptions)return!0;if(i.paging){if(!(0,l.isEmpty)(e)&&i.isRowValid(t))return!0}else if(i.isRowDisplayed(t))return!0;return!1}}]),e}(o.Feature)},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.has=void 0;var n=i(21);e.has=function(t,e,i){for(var r=Boolean(i),s=0,a=t.length;s<a;s++)if((0,n.matchCase)(t[s].toString(),r)===e)return!0;return!1}},function(t,e){var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(i=window)}t.exports=i},function(t,e,i){"use strict";i(130),i(387),t.exports=i(0)},function(t,e,i){"use strict";var n=i(54),r=n({mdy:!0,firstDayOfWeek:0,firstDayOfWeekYear:1,short:"{MM}/{dd}/{yyyy}",medium:"{Month} {d}, {yyyy}",long:"{Month} {d}, {yyyy} {time}",full:"{Weekday}, {Month} {d}, {yyyy} {time}",stamp:"{Dow} {Mon} {d} {yyyy} {time}",time:"{h}:{mm} {TT}"});t.exports=r},function(t,e,i){"use strict";var n={yyyy:{param:"year",src:"\\d{4}"},MM:{param:"month",src:"[01]?\\d"},dd:{param:"date",src:"[0123]?\\d"},hh:{param:"hour",src:"[0-2]?\\d"},mm:{param:"minute",src:"[0-5]\\d"},ss:{param:"second",src:"[0-5]\\d(?:[,.]\\d+)?"},yy:{param:"year",src:"\\d{2}"},y:{param:"year",src:"\\d"},yearSign:{src:"[+-]",sign:!0},tzHour:{src:"[0-1]\\d"},tzMinute:{src:"[0-5]\\d"},tzSign:{src:"[+−-]",sign:!0},ihh:{param:"hour",src:"[0-2]?\\d(?:[,.]\\d+)?"},imm:{param:"minute",src:"[0-5]\\d(?:[,.]\\d+)?"},GMT:{param:"utc",src:"GMT",val:1},Z:{param:"utc",src:"Z",val:1},timestamp:{src:"\\d+"}};t.exports=n},function(t,e,i){"use strict";var n={year:{base:"yyyy",requiresSuffix:!0},month:{base:"MM",requiresSuffix:!0},date:{base:"dd",requiresSuffix:!0},hour:{base:"hh",requiresSuffixOr:":"},minute:{base:"mm"},second:{base:"ss"},num:{src:"\\d+",requiresNumerals:!0}};t.exports=n},function(t,e,i){"use strict";function n(t,e){for(var i=[],n=0,r=t.length;n<r;n++)n in t&&i.push(e(t[n],n));return i}t.exports=n},function(t,e,i){"use strict";function n(t,e,i){return i||(i=s(t)),i==="[object "+e+"]"}var r=i(12),s=r.classToString;t.exports=n},function(t,e,i){"use strict";function n(t,e){return t.length>1&&(t="(?:"+t+")"),e&&(t+="?"),t}t.exports=n},function(t,e,i){"use strict";function n(t){return 32-a(new Date(r(t),s(t),32),"Date")}var r=i(30),s=i(31),a=i(18);t.exports=n},function(t,e,i){"use strict";t.exports=String.fromCharCode},function(t,e,i){"use strict";function n(t,e,i){var n=a(10,s(e||0));return i=i||o,e<0&&(n=1/n),i(t*n)/n}var r=i(9),s=r.abs,a=r.pow,o=r.round;t.exports=n},function(t,e,i){"use strict";function n(t,e){var i=0,n=0;return s(function(t,r){if((n=a(e(t)))>=1)return i=r,!1}),[n,i,t]}var r=i(9),s=i(58),a=r.abs;t.exports=n},function(t,e,i){"use strict";t.exports=6e4},function(t,e,i){"use strict";function n(t){return s(t,a)}var r=i(6),s=i(34),a=r.HOURS_INDEX;t.exports=n},function(t,e,i){"use strict";function n(t,e){for(;t>=0&&!1!==e(r[t],t);)t=s(t)}var r=i(29),s=i(40);t.exports=n},function(t,e,i){"use strict";function n(t,e){if(g(e)){var i=f(t),n=h(t);p(i,v,y),a(i,s(i)+7*(e-1)),o(t,u(i)),c(t,l(i)),a(t,s(i)),d(t,n||7)}return t.getTime()}var r=i(56),s=i(37),a=i(36),o=i(165),u=i(30),l=i(31),c=i(166),f=i(38),h=i(20),d=i(24),m=i(5),p=i(87),g=m.isNumber,v=r.ISO_FIRST_DAY_OF_WEEK,y=r.ISO_FIRST_DAY_OF_WEEK_YEAR;t.exports=n},function(t,e,i){"use strict";function n(t,e,i){a(t,u),s(t,i),o(t,e)}var r=i(6),s=i(36),a=i(34),o=i(61),u=r.MONTH_INDEX;t.exports=n},function(t,e,i){"use strict";function n(t,e){return r(t,e)||r(t,e+"s")||"day"===e&&r(t,"date")}var r=i(168);t.exports=n},function(t,e,i){"use strict";function n(t,e){var i=e-1;return r(t,7*o((s(t)-i)/7)+i),t}var r=i(24),s=i(20),a=i(9),o=a.ceil;t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n,a){var v,y,b,w,x,_,C,k=0,E=0;return o(t)&&(a=a||{},a.fromUTC=!0,a.setUTC=!0),_=m(null,e,a,!0),i>0&&(k=E=i,b=!0),!!h(_.date)&&(_.set&&_.set.specificity&&((c(_.set.edge)||c(_.set.shift))&&(y=!0,p(_.date,_.set.specificity,n)),x=y||_.set.specificity===g?d(l(_.date),_.set.specificity,n).getTime():function(){var t=s[_.set.specificity];return f(l(_.date),t.name,1).getTime()-1}(),!b&&c(_.set.sign)&&_.set.specificity&&(k=50,E=-50)),C=t.getTime(),w=_.date.getTime(),x=x||w,v=function(){return _.set&&_.set.specificity?0:(u(_.date)-u(t))*r}(),v&&(w-=v,x-=v),C>=w-k&&C<=x+E)}var r=i(83),s=i(29),a=i(6),o=i(22),u=i(46),l=i(38),c=i(28),f=i(42),h=i(52),d=i(49),m=i(59),p=i(50),g=a.MONTH_INDEX;t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){return r(t,e,i,n).date}var r=i(59);t.exports=n},function(t,e,i){"use strict";function n(t,e,i){return e=s(e,!0),r(t,e[0],e[1],i)}var r=i(47),s=i(93);t.exports=n},function(t,e,i){"use strict";function n(t,e){var i=t[0],n=t[1];return e&&c(i)?i=o(i):l(i)&&l(n)?(i=u(t),n=null):a(i)&&(i=s(i)),[i,n]}var r=i(5),s=i(43),a=i(57),o=i(277),u=i(278),l=r.isNumber,c=r.isString;t.exports=n},function(t,e,i){"use strict";function n(t,e,i){return a(t),e=r[e]||e||"{long}",o(e,t,i)}var r=i(95),s=i(296),a=i(98),o=s.dateFormatMatcher;t.exports=n},function(t,e,i){"use strict";var n={ISO8601:"{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{SSS}{Z}",RFC1123:"{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {ZZ}",RFC1036:"{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {ZZ}"};t.exports=n},function(t,e,i){"use strict";function n(t){return r(t,"Hours")}var r=i(18);t.exports=n},function(t,e,i){"use strict";function n(t,e){var i,n,u,c=r(t)?0:a(t);return u=!0===e?":":"",!c&&e?"Z":(i=o(s(-c/60),2,!0),n=o(l(c%60),2),i+u+n)}var r=i(22),s=i(23),a=i(46),o=i(64),u=i(9),l=u.abs;t.exports=n},function(t,e,i){"use strict";function n(t){if(!r(t))throw new TypeError("Date is not valid")}var r=i(52);t.exports=n},function(t,e,i){"use strict";function n(t,e,i){var n;if(f(t)){if(m(e))switch(e=s(e).toLowerCase(),!0){case"future"===e:return t.getTime()>u().getTime();case"past"===e:return t.getTime()<u().getTime();case"today"===e:return l(t);case"tomorrow"===e:return l(t,1);case"yesterday"===e:return l(t,-1);case"weekday"===e:return c(t)>0&&c(t)<6;case"weekend"===e:return 0===c(t)||6===c(t);case o(n=p.weekdayMap[e]):return c(t)===n;case o(n=p.monthMap[e]):return a(t)===n}return d(t,e,i)}}var r=i(8),s=i(317),a=i(31),o=i(28),u=i(41),l=i(318),c=i(20),f=i(52),h=i(5),d=i(90),m=h.isString,p=r.English;t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){var r,a,f,h,d;return o(t),l(i)?d=i:(h=i,d=n),r=u(t,e),d&&(a=d.apply(t,r.concat(c.get(h))))?s(t,a,h):(0===r[1]&&(r[1]=1,r[0]=1),f=e?"duration":r[2]>0?"future":"past",c.get(h).getRelativeFormat(r,f))}var r=i(8),s=i(94),a=i(5),o=i(98),u=i(364),l=a.isFunction,c=r.localeManager;t.exports=n},function(t,e,i){"use strict";function n(t){return a(t)?new Date(t.getTime()):s(t)}var r=i(5),s=i(102),a=r.isDate;t.exports=n},function(t,e,i){"use strict";function n(t){return null==t?t:s(t)?t.getTime():t.valueOf()}var r=i(5),s=r.isDate;t.exports=n},function(t,e,i){"use strict";function n(t){return a(t)?t:null==t?new Date:o.create?o.create(t):new Date(t)}var r=i(5),s=i(25),a=r.isDate,o=s.sugarDate;t.exports=n},function(t,e,i){"use strict";function n(t,e,i){var n,o=r[i];return o?n=new Date(t.getTime()+e*o):(n=new Date(t),s(n,i,a(t,i)+e)),n}var r=i(105),s=i(35),a=i(18);t.exports=n},function(t,e,i){"use strict";var n={Hours:36e5,Minutes:6e4,Seconds:1e3,Milliseconds:1};t.exports=n},function(t,e,i){"use strict";function n(t){var e,i,n;return o(t)?[t,"Milliseconds"]:(e=t.match(r),i=+e[1]||1,n=a(e[2].toLowerCase()),n.match(/hour|minute|second/i)?n+="s":"Year"===n?n="FullYear":"Week"===n?(n="Date",i*=7):"Day"===n&&(n="Date"),[i,n])}var r=i(393),s=i(5),a=i(62),o=s.isNumber;t.exports=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sortDateStr=e.sortNumberStr=e.dateSortDesc=e.dateSortAsc=e.numSortDesc=e.numSortAsc=e.ignoreCase=void 0;var n=i(68),r=i(72);e.ignoreCase=function(t,e){var i=t.toLowerCase(),n=e.toLowerCase();return i<n?-1:i>n?1:0},e.numSortAsc=function(t,e){return t-e},e.numSortDesc=function(t,e){return e-t},e.dateSortAsc=function(t,e){return t.getTime()-e.getTime()},e.dateSortDesc=function(t,e){return e.getTime()-t.getTime()},e.sortNumberStr=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",";return function(i,r){var s=(0,n.parse)(i,e),a=(0,n.parse)(r,e);return t(s,a)}},e.sortDateStr=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en-us";return function(i,n){var s=r.Date.create(i,e),a=r.Date.create(n,e);return t(s,a)}}},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.TableFilter=void 0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),a=i(19),o=i(10),u=i(21),l=i(3),c=i(68),f=i(7),h=i(16),d=i(109),m=i(110),p=i(128),g=i(15),v=h.root.document;e.TableFilter=function(){function t(){var e=this;n(this,t),this.id=null,this.version="0.6.3",this.year=(new Date).getFullYear(),this.tbl=null,this.refRow=null,this.headersRow=null,this.cfg={},this.nbFilterableRows=0,this.nbCells=null,this.hasConfig=!1,this.initialized=!1;for(var i=void 0,s=arguments.length,a=Array(s),u=0;u<s;u++)a[u]=arguments[u];if(a.forEach(function(t){"object"===(void 0===t?"undefined":r(t))&&"TABLE"===t.nodeName?(e.tbl=t,e.id=t.id||"tf_"+(new Date).getTime()+"_"):(0,l.isString)(t)?(e.id=t,e.tbl=(0,o.elm)(t)):(0,l.isNumber)(t)?i=t:(0,l.isObj)(t)&&(e.cfg=t,e.hasConfig=!0)}),!this.tbl||"TABLE"!==this.tbl.nodeName)throw new Error("Could not instantiate TableFilter: HTML table\n                DOM element not found.");if(0===this.getRowsNb())throw new Error("Could not instantiate TableFilter: HTML table\n                requires at least 1 row.");var c=this.cfg;this.emitter=new d.Emitter,this.refRow=(0,l.isUndef)(i)?2:i+1,this.filterTypes=[].map.call((this.dom().rows[this.refRow]||this.dom().rows[0]).cells,function(t,i){var n=e.cfg["col_"+i];return n?n.toLowerCase():g.INPUT}),this.basePath=(0,f.defaultsStr)(c.base_path,"tablefilter/"),this.fltGrid=(0,f.defaultsBool)(c.grid,!0),this.gridLayout=(0,l.isObj)(c.grid_layout)||Boolean(c.grid_layout),this.filtersRowIndex=(0,f.defaultsNb)(c.filters_row_index,0),this.headersRow=(0,f.defaultsNb)(c.headers_row_index,0===this.filtersRowIndex?1:0),this.fltCellTag=(0,f.defaultsStr)(c.filters_cell_tag,g.CELL_TAG),this.fltIds=[],this.validRowsIndex=[],this.stylePath=this.getStylePath(),this.stylesheet=this.getStylesheetPath(),this.stylesheetId=this.id+"_style",this.fltsRowCssClass=(0,f.defaultsStr)(c.flts_row_css_class,"fltrow"),this.enableIcons=(0,f.defaultsBool)(c.enable_icons,!0),this.alternateRows=Boolean(c.alternate_rows),this.colWidths=(0,f.defaultsArr)(c.col_widths,[]),this.fltCssClass=(0,f.defaultsStr)(c.flt_css_class,"flt"),this.fltMultiCssClass=(0,f.defaultsStr)(c.flt_multi_css_class,"flt_multi"),this.fltSmallCssClass=(0,f.defaultsStr)(c.flt_small_css_class,"flt_s"),this.singleFltCssClass=(0,f.defaultsStr)(c.single_flt_css_class,"single_flt"),this.enterKey=(0,f.defaultsBool)(c.enter_key,!0),this.onBeforeFilter=(0,f.defaultsFn)(c.on_before_filter,l.EMPTY_FN),this.onAfterFilter=(0,f.defaultsFn)(c.on_after_filter,l.EMPTY_FN),this.caseSensitive=Boolean(c.case_sensitive),this.hasExactMatchByCol=(0,l.isArray)(c.columns_exact_match),this.exactMatchByCol=this.hasExactMatchByCol?c.columns_exact_match:[],this.exactMatch=Boolean(c.exact_match),this.ignoreDiacritics=c.ignore_diacritics,this.linkedFilters=Boolean(c.linked_filters),this.disableExcludedOptions=Boolean(c.disable_excluded_options),this.activeFilterId=null,this.hasExcludedRows=Boolean((0,l.isArray)(c.exclude_rows)&&c.exclude_rows.length>0),this.excludeRows=(0,f.defaultsArr)(c.exclude_rows,[]),this.externalFltTgtIds=(0,f.defaultsArr)(c.external_flt_grid_ids,[]),this.onFiltersLoaded=(0,f.defaultsFn)(c.on_filters_loaded,l.EMPTY_FN),this.singleSearchFlt=Boolean(c.single_filter),this.onRowValidated=(0,f.defaultsFn)(c.on_row_validated,l.EMPTY_FN),this.cellParser=(0,l.isObj)(c.cell_parser)&&(0,l.isFn)(c.cell_parser.parse)&&(0,l.isArray)(c.cell_parser.cols)?c.cell_parser:{cols:[],parse:l.EMPTY_FN},this.watermark=c.watermark||"",this.isWatermarkArray=(0,l.isArray)(this.watermark),this.help=(0,l.isUndef)(c.help_instructions)?void 0:(0,l.isObj)(c.help_instructions)||Boolean(c.help_instructions),this.popupFilters=(0,l.isObj)(c.popup_filters)||Boolean(c.popup_filters),this.markActiveColumns=(0,l.isObj)(c.mark_active_columns)||Boolean(c.mark_active_columns),this.clearFilterText=(0,f.defaultsStr)(c.clear_filter_text,"Clear"),this.enableEmptyOption=Boolean(c.enable_empty_option),this.emptyText=(0,f.defaultsStr)(c.empty_text,"(Empty)"),this.enableNonEmptyOption=Boolean(c.enable_non_empty_option),this.nonEmptyText=(0,f.defaultsStr)(c.non_empty_text,"(Non empty)"),this.onSlcChange=(0,f.defaultsBool)(c.on_change,!0),this.sortSlc=!!(0,l.isUndef)(c.sort_select)||((0,l.isArray)(c.sort_select)?c.sort_select:Boolean(c.sort_select)),this.isSortNumAsc=Boolean(c.sort_num_asc),this.sortNumAsc=this.isSortNumAsc?c.sort_num_asc:[],this.isSortNumDesc=Boolean(c.sort_num_desc),this.sortNumDesc=this.isSortNumDesc?c.sort_num_desc:[],this.loadFltOnDemand=Boolean(c.load_filters_on_demand),this.hasCustomOptions=(0,l.isObj)(c.custom_options),this.customOptions=c.custom_options,this.rgxOperator=(0,f.defaultsStr)(c.regexp_operator,"rgx:"),this.emOperator=(0,f.defaultsStr)(c.empty_operator,"[empty]"),this.nmOperator=(0,f.defaultsStr)(c.nonempty_operator,"[nonempty]"),this.orOperator=(0,f.defaultsStr)(c.or_operator,"||"),this.anOperator=(0,f.defaultsStr)(c.and_operator,"&&"),this.grOperator=(0,f.defaultsStr)(c.greater_operator,">"),this.lwOperator=(0,f.defaultsStr)(c.lower_operator,"<"),this.leOperator=(0,f.defaultsStr)(c.lower_equal_operator,"<="),this.geOperator=(0,f.defaultsStr)(c.greater_equal_operator,">="),this.dfOperator=(0,f.defaultsStr)(c.different_operator,"!"),this.lkOperator=(0,f.defaultsStr)(c.like_operator,"*"),this.eqOperator=(0,f.defaultsStr)(c.equal_operator,"="),this.stOperator=(0,f.defaultsStr)(c.start_with_operator,"{"),this.enOperator=(0,f.defaultsStr)(c.end_with_operator,"}"),this.separator=(0,f.defaultsStr)(c.separator,","),this.rowsCounter=(0,l.isObj)(c.rows_counter)||Boolean(c.rows_counter),this.statusBar=(0,l.isObj)(c.status_bar)||Boolean(c.status_bar),this.loader=(0,l.isObj)(c.loader)||Boolean(c.loader),this.displayBtn=Boolean(c.btn),this.btnText=(0,f.defaultsStr)(c.btn_text,this.enableIcons?"":"Go"),this.btnCssClass=(0,f.defaultsStr)(c.btn_css_class,this.enableIcons?"btnflt_icon":"btnflt"),this.btnReset=Boolean(c.btn_reset),this.onBeforeReset=(0,f.defaultsFn)(c.on_before_reset,l.EMPTY_FN),this.onAfterReset=(0,f.defaultsFn)(c.on_after_reset,l.EMPTY_FN),this.paging=(0,l.isObj)(c.paging)||Boolean(c.paging),this.nbHiddenRows=0,this.autoFilter=Boolean(c.auto_filter),this.autoFilterDelay=(0,f.defaultsNb)(c.auto_filter_delay,g.AUTO_FILTER_DELAY),this.isUserTyping=null,this.autoFilterTimer=null,this.highlightKeywords=Boolean(c.highlight_keywords),this.noResults=(0,l.isObj)(c.no_results_message)||Boolean(c.no_results_message),this.state=(0,l.isObj)(c.state)||Boolean(c.state),this.dateType=!0,this.locale=(0,f.defaultsStr)(c.locale,"en"),this.thousandsSeparator=(0,f.defaultsStr)(c.thousands_separator,","),this.decimalSeparator=(0,f.defaultsStr)(c.decimal_separator,"."),this.colTypes=(0,l.isArray)(c.col_types)?c.col_types:[],this.prfxTf="TF",this.prfxFlt="flt",this.prfxValButton="btn",this.prfxResponsive="resp",this.extensions=(0,f.defaultsArr)(c.extensions,[]),this.enableDefaultTheme=Boolean(c.enable_default_theme),this.hasThemes=this.enableDefaultTheme||(0,l.isArray)(c.themes),this.themes=(0,f.defaultsArr)(c.themes,[]),this.themesPath=this.getThemesPath(),this.responsive=Boolean(c.responsive),this.toolbar=(0,l.isObj)(c.toolbar)||Boolean(c.toolbar),this.Mod={},this.ExtRegistry={},this.instantiateFeatures(Object.keys(g.FEATURES).map(function(t){return g.FEATURES[t]}))}return s(t,[{key:"init",value:function(){var t=this;if(!this.initialized){this.import(this.stylesheetId,this.getStylesheetPath(),null,"link");var e=this.Mod,i=void 0;this.loadThemes();var n=g.FEATURES.dateType,r=g.FEATURES.help,s=g.FEATURES.state,a=g.FEATURES.markActiveColumns,u=g.FEATURES.gridLayout,l=g.FEATURES.loader,c=g.FEATURES.highlightKeyword,f=g.FEATURES.popupFilter,h=g.FEATURES.rowsCounter,d=g.FEATURES.statusBar,v=g.FEATURES.clearButton,y=g.FEATURES.alternateRows,b=g.FEATURES.noResults,w=g.FEATURES.paging,x=g.FEATURES.toolbar;if(this.initFeatures([n,r,s,a,u,l,c,f]),this.fltGrid){var _=this._insertFiltersRow();this.nbCells=this.getCellsNb(this.refRow),this.nbFilterableRows=this.getRowsNb();for(var C=this.singleSearchFlt?1:this.nbCells,k=0;k<C;k++){this.emitter.emit("before-filter-init",this,k);var E=(0,o.createElm)(this.fltCellTag),T=this.getFilterType(k);this.singleSearchFlt&&(E.colSpan=this.nbCells),this.gridLayout||_.appendChild(E),i=k===C-1&&this.displayBtn?this.fltSmallCssClass:this.fltCssClass,this.singleSearchFlt&&(T=g.INPUT,i=this.singleFltCssClass),T===g.SELECT||T===g.MULTIPLE?(e.dropdown=e.dropdown||new m.Dropdown(this),e.dropdown.init(k,this.isExternalFlt(),E)):T===g.CHECKLIST?(e.checkList=e.checkList||new p.CheckList(this),e.checkList.init(k,this.isExternalFlt(),E)):this._buildInputFilter(k,i,E),k===C-1&&this.displayBtn&&this._buildSubmitButton(this.isExternalFlt()?(0,o.elm)(this.externalFltTgtIds[k]):E),this.emitter.emit("after-filter-init",this,k)}this.emitter.on(["filter-focus"],function(e,i){return t.setActiveFilterId(i.id)})}else this._initNoFilters();this.hasExcludedRows&&(this.emitter.on(["after-filtering"],function(){return t.setExcludeRows()}),this.setExcludeRows()),this.initFeatures([h,d,v,y,b,w,x]),this.setColWidths(),this.gridLayout||((0,o.addClass)(this.dom(),this.prfxTf),this.responsive&&(0,o.addClass)(this.dom(),this.prfxResponsive)),this.initExtensions(),this.linkedFilters&&this.emitter.on(["after-filtering"],function(){return t.linkFilters()}),this.initialized=!0,this.onFiltersLoaded(this),this.emitter.emit("initialized",this)}}},{key:"detectKey",value:function(t){if(this.enterKey&&t){(0,a.keyCode)(t)===g.ENTER_KEY?(this.filter(),(0,a.cancelEvt)(t),(0,a.stopEvt)(t)):(this.isUserTyping=!0,h.root.clearInterval(this.autoFilterTimer),this.autoFilterTimer=null)}}},{key:"onKeyUp",value:function(t){function e(){h.root.clearInterval(this.autoFilterTimer),this.autoFilterTimer=null,this.isUserTyping||(this.filter(),this.isUserTyping=null)}if(this.autoFilter){var i=(0,a.keyCode)(t);this.isUserTyping=!1,i!==g.ENTER_KEY&&i!==g.TAB_KEY&&i!==g.ESC_KEY&&i!==g.UP_ARROW_KEY&&i!==g.DOWN_ARROW_KEY?null===this.autoFilterTimer&&(this.autoFilterTimer=h.root.setInterval(e.bind(this),this.autoFilterDelay)):(h.root.clearInterval(this.autoFilterTimer),this.autoFilterTimer=null)}}},{key:"onKeyDown",value:function(){this.autoFilter&&(this.isUserTyping=!0)}},{key:"onInpFocus",value:function(t){var e=(0,a.targetEvt)(t);this.emitter.emit("filter-focus",this,e)}},{key:"onInpBlur",value:function(){this.autoFilter&&(this.isUserTyping=!1,h.root.clearInterval(this.autoFilterTimer)),this.emitter.emit("filter-blur",this)}},{key:"_insertFiltersRow",value:function(){if(!this.gridLayout){var t=void 0,e=(0,o.tag)(this.dom(),"thead");return t=e.length>0?e[0].insertRow(this.filtersRowIndex):this.dom().insertRow(this.filtersRowIndex),t.className=this.fltsRowCssClass,this.isExternalFlt()&&(t.style.display=g.NONE),this.emitter.emit("filters-row-inserted",this,t),t}}},{key:"_initNoFilters",value:function(){this.fltGrid||(this.refRow=this.refRow>0?this.refRow-1:0,this.nbFilterableRows=this.getRowsNb())}},{key:"_buildInputFilter",value:function(t,e,i){var n=this,r=this.getFilterType(t),s=this.isExternalFlt()?this.externalFltTgtIds[t]:null,u=r===g.INPUT?"text":"hidden",l=(0,o.createElm)(g.INPUT,["id",this.buildFilterId(t)],["type",u],["ct",t]);"hidden"!==u&&this.watermark&&l.setAttribute("placeholder",this.isWatermarkArray?this.watermark[t]||"":this.watermark),l.className=e||this.fltCssClass,(0,a.addEvt)(l,"focus",function(t){return n.onInpFocus(t)}),s?(0,o.elm)(s).appendChild(l):i.appendChild(l),this.fltIds.push(l.id),(0,a.addEvt)(l,"keypress",function(t){return n.detectKey(t)}),(0,a.addEvt)(l,"keydown",function(){return n.onKeyDown()}),(0,a.addEvt)(l,"keyup",function(t){return n.onKeyUp(t)}),(0,a.addEvt)(l,"blur",function(){return n.onInpBlur()})}},{key:"_buildSubmitButton",value:function(t){var e=this,i=(0,o.createElm)(g.INPUT,["type","button"],["value",this.btnText]);i.className=this.btnCssClass,t.appendChild(i),(0,a.addEvt)(i,"click",function(){return e.filter()})}},{key:"instantiateFeatures",value:function(){var t=this;(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).forEach(function(e){if(e.property=e.property||e.name,!t.hasConfig||!0===t[e.property]||!0===e.enforce){var i=e.class,n=e.name;t.Mod[n]=t.Mod[n]||new i(t)}})}},{key:"initFeatures",value:function(){var t=this;(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).forEach(function(e){var i=e.property,n=e.name;!0===t[i]&&t.Mod[n]&&t.Mod[n].init()})}},{key:"feature",value:function(t){return this.Mod[t]}},{key:"initExtensions",value:function(){var t=this.extensions;if(0!==t.length){i.p=this.basePath,this.emitter.emit("before-loading-extensions",this);for(var e=0,n=t.length;e<n;e++){var r=t[e];this.loadExtension(r)}this.emitter.emit("after-loading-extensions",this)}}},{key:"loadExtension",value:function(t){var e=this;if(t&&t.name&&!this.hasExtension(t.name)){var n=t.name,r=t.path,s=void 0;n&&r?s=t.path+n:(n=n.replace(".js",""),s="extensions/{}/{}".replace(/{}/g,n)),i.e(0).then(function(){var r=[i(440)("./"+s)];(function(i){var r=new i.default(e,t);r.init(),e.ExtRegistry[n]=r}).apply(null,r)}).catch(i.oe)}}},{key:"extension",value:function(t){return this.ExtRegistry[t]}},{key:"hasExtension",value:function(t){return!(0,l.isEmpty)(this.ExtRegistry[t])}},{key:"registerExtension",value:function(t,e){this.ExtRegistry[e]=t}},{key:"destroyExtensions",value:function(){var t=this.ExtRegistry;Object.keys(t).forEach(function(e){t[e].destroy(),t[e]=void 0})}},{key:"loadThemes",value:function(){if(this.hasThemes){var t=this.themes;if(this.emitter.emit("before-loading-themes",this),this.enableDefaultTheme){var e={name:"default"};this.themes.push(e)}if((0,l.isArray)(t))for(var i=0,n=t.length;i<n;i++){var r=t[i],s=r.name,a=r.path,o=this.prfxTf+s;s&&!a?a=this.themesPath+s+"/"+s+".css":!s&&r.path&&(s="theme{0}".replace("{0}",i)),this.isImported(a,"link")||this.import(o,a,null,"link")}this.loader=!0,this.emitter.emit("after-loading-themes",this)}}},{key:"getStylesheet",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default";return(0,o.elm)(this.prfxTf+t)}},{key:"destroy",value:function(){var t=this;if(this.initialized){var e=this.emitter;this.isExternalFlt()&&!this.popupFilters&&this.removeExternalFlts(),this.destroyExtensions(),this.validateAllRows(),e.emit("destroy",this),this.fltGrid&&!this.gridLayout&&this.dom().deleteRow(this.filtersRowIndex),this.hasExcludedRows&&e.off(["after-filtering"],function(){return t.setExcludeRows()}),this.linkedFilters&&e.off(["after-filtering"],function(){return t.linkFilters()}),this.emitter.off(["filter-focus"],function(e,i){return t.setActiveFilterId(i.id)}),(0,o.removeClass)(this.dom(),this.prfxTf),(0,o.removeClass)(this.dom(),this.prfxResponsive),this.nbHiddenRows=0,this.validRowsIndex=[],this.fltIds=[],this.initialized=!1}}},{key:"removeExternalFlts",value:function(){if(this.isExternalFlt())for(var t=this.externalFltTgtIds,e=t.length,i=0;i<e;i++){var n=t[i],r=(0,o.elm)(n);r&&(r.innerHTML="")}}},{key:"isCustomOptions",value:function(t){return this.hasCustomOptions&&-1!==this.customOptions.cols.indexOf(t)}},{key:"getCustomOptions",value:function(t){if(!(0,l.isEmpty)(t)&&this.isCustomOptions(t)){for(var e=this.customOptions,i=e.cols,n=[],r=[],s=i.indexOf(t),a=e.values[s],o=e.texts[s],u=e.sorts[s],c=0,f=a.length;c<f;c++)r.push(a[c]),o[c]?n.push(o[c]):n.push(a[c]);return u&&(r.sort(),n.sort()),[r,n]}}},{key:"filter",value:function(){if(this.fltGrid&&this.initialized){this.onBeforeFilter(this),this.emitter.emit("before-filtering",this);var t=this.dom().rows,e=this.getRowsNb(!0),i=0;this.validRowsIndex=[];for(var n=this.getFiltersValue(),r=this.refRow;r<e;r++){t[r].style.display="";var s=t[r].cells,a=s.length;if(a===this.nbCells){for(var o=[],c=!0,f=!1,h=0;h<a;h++){var d=n[this.singleSearchFlt?0:h];if(""!==d){var m=(0,u.matchCase)(this.getCellValue(s[h]),this.caseSensitive),p=d.toString().split(this.orOperator),g=p.length>1,v=d.toString().split(this.anOperator),y=v.length>1;if((0,l.isArray)(d)||g||y){var b=void 0,w=void 0,x=!1;w=(0,l.isArray)(d)?d:g?p:v;for(var _=0,C=w.length;_<C&&(b=(0,u.trim)(w[_]),x=this._match(b,m,h),x&&this.emitter.emit("highlight-keyword",this,s[h],b),!(g&&x||y&&!x))&&(!(0,l.isArray)(d)||!x);_++);o[h]=x}else o[h]=this._match((0,u.trim)(d),m,h),o[h]&&this.emitter.emit("highlight-keyword",this,s[h],d);o[h]||(c=!1),this.singleSearchFlt&&o[h]&&(f=!0),this.emitter.emit("cell-processed",this,h,s[h])}}this.singleSearchFlt&&f&&(c=!0),this.validateRow(r,c),c||i++,this.emitter.emit("row-processed",this,r,this.validRowsIndex.length,c)}}this.nbHiddenRows=i,this.onAfterFilter(this),this.emitter.emit("after-filtering",this,n)}}},{key:"_match",value:function(t,e,i){var n=void 0,r=this.getDecimal(i),s=new RegExp(this.leOperator),a=new RegExp(this.geOperator),o=new RegExp(this.lwOperator),l=new RegExp(this.grOperator),f=new RegExp(this.dfOperator),h=new RegExp((0,u.rgxEsc)(this.lkOperator)),d=new RegExp(this.eqOperator),m=new RegExp(this.stOperator),p=new RegExp(this.enOperator),v=this.emOperator,y=this.nmOperator,b=new RegExp((0,u.rgxEsc)(this.rgxOperator));t=(0,u.matchCase)(t,this.caseSensitive);var w=!1,x=o.test(t),_=s.test(t),C=l.test(t),k=a.test(t),E=f.test(t),T=d.test(t),S=h.test(t),O=m.test(t),N=p.test(t),F=v===t,P=y===t,I=b.test(t);if(this.hasType(i,[g.DATE])){var R=void 0,D=void 0,M=this.Mod.dateType,A=M.isValid.bind(M),L=M.parse.bind(M),j=M.getLocale(i),H=x&&A(t.replace(o,""),j),B=_&&A(t.replace(s,""),j),z=C&&A(t.replace(l,""),j),U=k&&A(t.replace(a,""),j),W=E&&A(t.replace(f,""),j),V=T&&A(t.replace(d,""),j);R=L(e,j),B?(D=L(t.replace(s,""),j),w=R<=D):H?(D=L(t.replace(o,""),j),w=R<D):U?(D=L(t.replace(a,""),j),w=R>=D):z?(D=L(t.replace(l,""),j),w=R>D):W?(D=L(t.replace(f,""),j),w=R.toString()!==D.toString()):V?(D=L(t.replace(d,""),j),w=R.toString()===D.toString()):h.test(t)?w=(0,u.contains)(t.replace(h,""),e,!1,this.caseSensitive):A(t)?(D=L(t,j),w=R.toString()===D.toString()):w=F?(0,u.isEmpty)(e):P?!(0,u.isEmpty)(e):(0,u.contains)(t,e,this.isExactMatch(i),this.caseSensitive)}else if(n=(0,c.parse)(e,r)||Number(e),_)w=n<=(0,c.parse)(t.replace(s,""),r);else if(k)w=n>=(0,c.parse)(t.replace(a,""),r);else if(x)w=n<(0,c.parse)(t.replace(o,""),r);else if(C)w=n>(0,c.parse)(t.replace(l,""),r);else if(E)w=!(0,u.contains)(t.replace(f,""),e,!1,this.caseSensitive);else if(S)w=(0,u.contains)(t.replace(h,""),e,!1,this.caseSensitive);else if(T)w=(0,u.contains)(t.replace(d,""),e,!0,this.caseSensitive);else if(O)w=0===e.indexOf(t.replace(m,""));else if(N){var Y=t.replace(p,"");w=e.lastIndexOf(Y,e.length-1)===e.length-1-(Y.length-1)&&e.lastIndexOf(Y,e.length-1)>-1}else if(F)w=(0,u.isEmpty)(e);else if(P)w=!(0,u.isEmpty)(e);else if(I)try{var K=t.replace(b,""),G=new RegExp(K);w=G.test(e)}catch(t){w=!1}else n&&this.hasType(i,[g.NUMBER,g.FORMATTED_NUMBER])&&!this.singleSearchFlt?(t=(0,c.parse)(t,r)||t,w=n===t||(0,u.contains)(t.toString(),n.toString(),this.isExactMatch(i),this.caseSensitive)):w=(0,u.contains)(t,e,this.isExactMatch(i),this.caseSensitive,this.ignoresDiacritics(i));return w}},{key:"getColumnData",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return this.getColValues(t,e,!0,i)}},{key:"getColumnValues",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return this.getColValues(t,e,!1,i)}},{key:"getColValues",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],r=this.dom().rows,s=this.getRowsNb(!0),a=[],o=i?this.getCellData.bind(this):this.getCellValue.bind(this);e&&a.push(this.getHeadersText()[t]);for(var u=this.refRow;u<s;u++){var l=!1;n.length>0&&(l=-1!==n.indexOf(u));var c=r[u].cells;if(c.length===this.nbCells&&!l){var f=o(c[t]);a.push(f)}}return a}},{key:"getFilterValue",value:function(t){if(this.fltGrid){var e="",i=this.getFilterElement(t);if(!i)return e;var n=this.getFilterType(t);return n!==g.MULTIPLE&&n!==g.CHECKLIST?e=i.value:n===g.MULTIPLE?e=this.feature("dropdown").getValues(t):n===g.CHECKLIST&&(e=this.feature("checkList").getValues(t)),((0,l.isArray)(e)&&0===e.length||1===e.length&&""===e[0])&&(e=""),e}}},{key:"getFiltersValue",value:function(){if(this.fltGrid){for(var t=[],e=0,i=this.fltIds.length;e<i;e++){var n=this.getFilterValue(e);(0,l.isArray)(n)?t.push(n):t.push((0,u.trim)(n))}return t}}},{key:"getFilterId",value:function(t){if(this.fltGrid)return this.fltIds[t]}},{key:"getFiltersByType",value:function(t,e){if(this.fltGrid){for(var i=[],n=0,r=this.fltIds.length;n<r;n++){if(this.getFilterType(n)===t.toLowerCase()){var s=e?n:this.fltIds[n];i.push(s)}}return i}}},{key:"getFilterElement",value:function(t){return(0,o.elm)(this.fltIds[t])}},{key:"getCellsNb",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.dom().rows[t>=0?t:0];return e?e.cells.length:0}},{key:"getRowsNb",value:function(t){var e=this.getWorkingRows().length;return this.dom().tHead?t?e+this.dom().querySelectorAll("thead > tr").length:e:t?e:e-this.refRow}},{key:"getWorkingRows",value:function(){return this.dom().querySelectorAll("tbody > tr")}},{key:"getCellValue",value:function(t){var e=t.cellIndex,i=this.cellParser;return-1!==i.cols.indexOf(e)?i.parse(this,t,e):(0,o.getText)(t)}},{key:"getCellData",value:function(t){var e=t.cellIndex,i=this.getCellValue(t);if(this.hasType(e,[g.FORMATTED_NUMBER]))return(0,c.parse)(i,this.getDecimal(e));if(this.hasType(e,[g.NUMBER]))return Number(i);if(this.hasType(e,[g.DATE])){var n=this.Mod.dateType;return n.parse(i,n.getLocale(e))}return i}},{key:"getData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.getTableData(t,e,!0)}},{key:"getValues",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.getTableData(t,e,!1)}},{key:"getTableData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=this.dom().rows,r=this.getRowsNb(!0),s=[],a=i?this.getCellData.bind(this):this.getCellValue.bind(this);if(t){var o=this.getHeadersText(e);s.push([this.getHeadersRowIndex(),o])}for(var u=this.refRow;u<r;u++){for(var l=[u,[]],c=n[u].cells,f=0,h=c.length;f<h;f++)if(!(e&&this.hasExtension("colsVisibility")&&this.extension("colsVisibility").isColHidden(f))){var d=a(c[f]);l[1].push(d)}s.push(l)}return s}},{key:"getFilteredData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.filteredData(t,e,!0)}},{key:"getFilteredValues",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.filteredData(t,e,!1)}},{key:"filteredData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(0===this.validRowsIndex.length)return[];var n=this.dom().rows,r=[],s=i?this.getCellData.bind(this):this.getCellValue.bind(this);if(t){var a=this.getHeadersText(e);r.push([this.getHeadersRowIndex(),a])}for(var o=this.getValidRows(!0),u=0;u<o.length;u++){for(var l=[this.validRowsIndex[u],[]],c=n[this.validRowsIndex[u]].cells,f=0;f<c.length;f++)if(!(e&&this.hasExtension("colsVisibility")&&this.extension("colsVisibility").isColHidden(f))){var h=s(c[f]);l[1].push(h)}r.push(l)}return r}},{key:"getFilteredColumnData",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return this.getFilteredDataCol(t,e,!0,i,!1)}},{key:"getVisibleColumnData",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return this.getFilteredDataCol(t,e,!0,i,!0)}},{key:"getFilteredColumnValues",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return this.getFilteredDataCol(t,e,!1,i,!1)}},{key:"getVisibleColumnValues",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return this.getFilteredDataCol(t,e,!1,i,!0)}},{key:"getFilteredDataCol",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=this,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],s=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if((0,l.isUndef)(t))return[];var a=this.dom().rows,o=i?this.getCellData.bind(this):this.getCellValue.bind(this),u=this.getValidRows(!0).filter(function(t){return-1===r.indexOf(t)&&(!s||"none"!==n.getRowDisplay(a[t]))}),c=u.map(function(e){return o(a[e].cells[t])});return e&&c.unshift(this.getHeadersText()[t]),c}},{key:"getRowDisplay",value:function(t){return t.style.display}},{key:"validateRow",value:function(t,e){var i=this.dom().rows[t];if(i&&(0,l.isBoolean)(e)){-1!==this.excludeRows.indexOf(t)&&(e=!0);var n=e?"":g.NONE,r=e?"true":"false";i.style.display=n,this.paging&&i.setAttribute("validRow",r),e&&(-1===this.validRowsIndex.indexOf(t)&&this.validRowsIndex.push(t),this.onRowValidated(this,t),this.emitter.emit("row-validated",this,t))}}},{key:"validateAllRows",value:function(){if(this.initialized){this.validRowsIndex=[];for(var t=this.refRow;t<this.nbFilterableRows;t++)this.validateRow(t,!0)}}},{key:"setFilterValue",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(this.fltGrid){var i=this.getFilterElement(t),n=this.getFilterType(t);if(i)if(n!==g.MULTIPLE&&n!==g.CHECKLIST)this.loadFltOnDemand&&!this.initialized&&this.emitter.emit("build-select-filter",this,t,this.linkedFilters,this.isExternalFlt()),i.value=e;else if(n===g.MULTIPLE){var r=(0,l.isArray)(e)?e:e.split(" "+this.orOperator+" ");this.loadFltOnDemand&&!this.initialized&&this.emitter.emit("build-select-filter",this,t,this.linkedFilters,this.isExternalFlt()),this.emitter.emit("select-options",this,t,r)}else if(n===g.CHECKLIST){var s=[];this.loadFltOnDemand&&!this.initialized&&this.emitter.emit("build-checklist-filter",this,t,this.linkedFilters),(0,l.isArray)(e)?s=e:(e=(0,u.matchCase)(e,this.caseSensitive),s=e.split(" "+this.orOperator+" ")),this.emitter.emit("select-checklist-options",this,t,s)}}}},{key:"setColWidths",value:function(t){var e=this.colWidths;if(0!==e.length){t=t||this.dom();var i=(0,o.tag)(t,"col"),n=i.length>0,r=n?null:v.createDocumentFragment();this.eachCol(function(t){var s=void 0;n?s=i[t]:(s=(0,o.createElm)("col"),r.appendChild(s)),s.style.width=e[t]}),n||t.insertBefore(r,t.firstChild)}}},{key:"setExcludeRows",value:function(){var t=this;this.hasExcludedRows&&this.excludeRows.forEach(function(e){return t.validateRow(e,!0)})}},{key:"clearFilters",value:function(){if(this.fltGrid){this.emitter.emit("before-clearing-filters",this),this.onBeforeReset(this,this.getFiltersValue());for(var t=0,e=this.fltIds.length;t<e;t++)this.setFilterValue(t,"");this.filter(),this.onAfterReset(this),this.emitter.emit("after-clearing-filters",this)}}},{key:"getActiveFilterId",value:function(){return this.activeFilterId}},{key:"setActiveFilterId",value:function(t){this.activeFilterId=t}},{key:"getColumnIndexFromFilterId",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=t.split("_")[0];return e=e.split(this.prfxFlt)[1],parseInt(e,10)}},{key:"buildFilterId",value:function(t){return""+this.prfxFlt+t+"_"+this.id}},{key:"isExternalFlt",value:function(){return this.externalFltTgtIds.length>0}},{key:"getStylePath",value:function(){return(0,f.defaultsStr)(this.config.style_path,this.basePath+"style/")}},{key:"getStylesheetPath",value:function(){return(0,f.defaultsStr)(this.config.stylesheet,this.getStylePath()+"tablefilter.css")}},{key:"getThemesPath",value:function(){return(0,f.defaultsStr)(this.config.themes_path,this.getStylePath()+"themes/")}},{key:"activateFilter",value:function(t){(0,l.isUndef)(t)||this.setActiveFilterId(this.getFilterId(t))}},{key:"linkFilters",value:function(){if(this.linkedFilters&&this.activeFilterId){var t=this.getFiltersByType(g.SELECT,!0),e=this.getFiltersByType(g.MULTIPLE,!0),i=this.getFiltersByType(g.CHECKLIST,!0),n=t.concat(e);n=n.concat(i);for(var r=0,s=n.length;r<s;r++){var a=n[r],u=(0,o.elm)(this.fltIds[a]),l=this.getFilterValue(a);if(this.loadFltOnDemand){var c=(0,o.createOpt)(this.getClearFilterText(a),"");u.innerHTML="",u.appendChild(c)}-1!==i.indexOf(a)?this.emitter.emit("build-checklist-filter",this,a,!0):this.emitter.emit("build-select-filter",this,a,!0),this.setFilterValue(a,l)}}}},{key:"isExactMatch",value:function(t){var e=this.getFilterType(t);return this.exactMatchByCol[t]||this.exactMatch||e!==g.INPUT}},{key:"isRowValid",value:function(t){return-1!==this.getValidRows().indexOf(t)}},{key:"isRowDisplayed",value:function(t){var e=this.dom().rows[t];return""===this.getRowDisplay(e)}},{key:"ignoresDiacritics",value:function(t){var e=this.ignoreDiacritics;return(0,l.isArray)(e)?e[t]:Boolean(e)}},{key:"getClearFilterText",value:function(t){var e=this.clearFilterText;return(0,l.isArray)(e)?e[t]:e}},{key:"eachCol",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l.EMPTY_FN,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.EMPTY_FN,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:l.EMPTY_FN,n=this.getCellsNb(this.refRow),r=0;r<n;r++)if(!0!==e(r)){if(!0===i(r))break;t(r)}}},{key:"isImported",value:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"script",i=!1,n="script"===e?"src":"href",r=(0,o.tag)(v,e),s=0,a=r.length;s<a;s++)if(!(0,l.isUndef)(r[s][n])&&r[s][n].match(t)){i=!0;break}return i}},{key:"import",value:function(t,e,i){var n=this,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"script";if(!this.isImported(e,r)){var s=this,a=!1,u=void 0,l=(0,o.tag)(v,"head")[0];u="link"===r.toLowerCase()?(0,o.createElm)("link",["id",t],["type","text/css"],["rel","stylesheet"],["href",e]):(0,o.createElm)("script",["id",t],["type","text/javascript"],["src",e]),u.onload=u.onreadystatechange=function(){a||n.readyState&&"loaded"!==n.readyState&&"complete"!==n.readyState||(a=!0,"function"==typeof i&&i.call(null,s))},u.onerror=function(){throw new Error("TableFilter could not load: "+e)},l.appendChild(u)}}},{key:"isInitialized",value:function(){return this.initialized}},{key:"getFiltersId",value:function(){return this.fltIds||[]}},{key:"getValidRows",value:function(t){if(!t)return this.validRowsIndex;var e=this.getRowsNb(!0);this.validRowsIndex=[];for(var i=this.refRow;i<e;i++){var n=this.dom().rows[i];this.paging?"true"!==n.getAttribute("validRow")&&null!==n.getAttribute("validRow")||this.validRowsIndex.push(n.rowIndex):this.getRowDisplay(n)!==g.NONE&&this.validRowsIndex.push(n.rowIndex)}return this.validRowsIndex}},{key:"getFiltersRowIndex",value:function(){return this.filtersRowIndex}},{key:"getHeadersRowIndex",value:function(){return this.headersRow}},{key:"getStartRowIndex",value:function(){return this.refRow}},{key:"getLastRowIndex",value:function(){return this.getRowsNb(!0)-1}},{key:"hasType",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(0===this.colTypes.length)return!1;var i=this.colTypes[t];return(0,l.isObj)(i)&&(i=i.type),-1!==e.indexOf(i)}},{key:"getHeaderElement",value:function(t){var e=this.gridLayout?this.Mod.gridLayout.headTbl:this.dom(),i=(0,o.tag)(e,"thead"),n=this.getHeadersRowIndex(),r=void 0;return 0===i.length&&(r=e.rows[n].cells[t]),1===i.length&&(r=i[0].rows[n].cells[t]),r}},{key:"getHeadersText",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=[];return this.eachCol(function(e){var n=t.getHeaderElement(e),r=(0,o.getFirstTextNode)(n);i.push(r)},function(i){return!(!e||!t.hasExtension("colsVisibility"))&&t.extension("colsVisibility").isColHidden(i)}),i}},{key:"getFilterType",value:function(t){return this.filterTypes[t]}},{key:"getFilterableRowsNb",value:function(){return this.getRowsNb(!1)}},{key:"getValidRowsNb",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.getValidRows(t).length}},{key:"dom",value:function(){return this.tbl}},{key:"getDecimal",value:function(t){var e=this.decimalSeparator;if(this.hasType(t,[g.FORMATTED_NUMBER])){var i=this.colTypes[t];i.hasOwnProperty("decimal")&&(e=i.decimal)}return e}},{key:"config",value:function(){return this.cfg}}]),t}()},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();e.Emitter=function(){function t(){n(this,t),this.events={}}return r(t,[{key:"on",value:function(t,e){var i=this;t.forEach(function(t){i.events[t]=i.events[t]||[],i.events[t].push(e)})}},{key:"off",value:function(t,e){var i=this;t.forEach(function(t){t in i.events&&i.events[t].splice(i.events[t].indexOf(e),1)})}},{key:"emit",value:function(t){if(t in this.events)for(var e=0;e<this.events[t].length;e++)this.events[t][e].apply(this,[].slice.call(arguments,1))}}]),t}()},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Dropdown=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(69),u=i(10),l=i(70),c=i(21),f=i(19),h=i(15),d=i(7);e.Dropdown=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"dropdown")),s=i.config;return i.enableSlcResetFilter=(0,d.defaultsBool)(s.enable_slc_reset_filter,!0),i.nonEmptyText=(0,d.defaultsStr)(s.non_empty_text,"(Non empty)"),i.multipleSlcTooltip=(0,d.defaultsStr)(s.multiple_slc_tooltip,"Use Ctrl/Cmd key for multiple selections"),i}return s(e,t),a(e,[{key:"onSlcFocus",value:function(t){var e=(0,f.targetEvt)(t),i=this.tf;if(i.loadFltOnDemand&&"0"===e.getAttribute("filled")){var n=e.getAttribute("ct");this.build(n)}this.emitter.emit("filter-focus",i,e)}},{key:"onSlcChange",value:function(){this.tf.onSlcChange&&this.tf.filter()}},{key:"refreshAll",value:function(){var t=this.tf.getFiltersByType(h.SELECT,!0),e=this.tf.getFiltersByType(h.MULTIPLE,!0),i=t.concat(e);this.refreshFilters(i)}},{key:"init",value:function(t,e,i){var n=this,r=this.tf,s=r.getFilterType(t),a=e?r.externalFltTgtIds[t]:null,o=(0,u.createElm)(h.SELECT,["id",r.buildFilterId(t)],["ct",t],["filled","0"]);if(s===h.MULTIPLE&&(o.multiple=h.MULTIPLE,o.title=this.multipleSlcTooltip),o.className=s.toLowerCase()===h.SELECT?r.fltCssClass:r.fltMultiCssClass,a?(0,u.elm)(a).appendChild(o):i.appendChild(o),r.fltIds.push(o.id),r.loadFltOnDemand){var l=(0,u.createOpt)(r.getClearFilterText(t),"");o.appendChild(l)}else this.build(t);(0,f.addEvt)(o,"change",function(){return n.onSlcChange()}),(0,f.addEvt)(o,"focus",function(t){return n.onSlcFocus(t)}),this.emitter.on(["build-select-filter"],function(t,e,i,r){return n.build(e,i,r)}),this.emitter.on(["select-options"],function(t,e,i){return n.selectOptions(e,i)}),this.emitter.on(["rows-changed"],function(){return n.refreshAll()}),this.initialized=!0}},{key:"build",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=this.tf;t=parseInt(t,10),this.emitter.emit("before-populating-filter",i,t),this.opts=[],this.optsTxt=[];var n=i.fltIds[t],r=(0,u.elm)(n),s=i.dom().rows,a=i.getRowsNb(!0);if(this.isCustom=i.isCustomOptions(t),this.isCustom){var o=i.getCustomOptions(t);this.opts=o[0],this.optsTxt=o[1]}var f=void 0,h=i.getActiveFilterId();e&&h&&(f=i.getColumnIndexFromFilterId(h));var d=null,m=null;e&&i.disableExcludedOptions&&(d=[],m=[]);for(var p=i.refRow;p<a;p++)if(-1===i.excludeRows.indexOf(p)){var g=s[p].cells,v=g.length;if(v===i.nbCells&&!this.isCustom&&(!e||this.isValidLinkedValue(p,f)))for(var y=0;y<v;y++)if(t===y){var b=i.getCellValue(g[y]),w=(0,c.matchCase)(b,i.caseSensitive);if((0,l.has)(this.opts,w,i.caseSensitive)||this.opts.push(b),e&&i.disableExcludedOptions){var x=m[y];x||(x=i.getVisibleColumnValues(y)),(0,l.has)(x,w,i.caseSensitive)||(0,l.has)(d,w,i.caseSensitive)||d.push(b)}}}this.opts=this.sortOptions(t,this.opts),d&&(d=this.sortOptions(t,d)),this.addOptions(t,r,e,d),this.emitter.emit("after-populating-filter",i,t,r)}},{key:"addOptions",value:function(t,e,i,n){var r=this.tf,s=e.value;e.innerHTML="",e=this.addFirstOption(e);for(var a=0;a<this.opts.length;a++)if(""!==this.opts[a]){var o=this.opts[a],f=this.isCustom?this.optsTxt[a]:o,d=!1;i&&r.disableExcludedOptions&&(0,l.has)(n,(0,c.matchCase)(o,r.caseSensitive),r.caseSensitive)&&(d=!0);var m=void 0;m=r.loadFltOnDemand&&s===this.opts[a]&&r.getFilterType(t)===h.SELECT?(0,u.createOpt)(f,o,!0):(0,u.createOpt)(f,o,!1),d&&(m.disabled=!0),e.appendChild(m)}e.setAttribute("filled","1")}},{key:"addFirstOption",value:function(t){var e=this.tf,i=e.getColumnIndexFromFilterId(t.id),n=(0,u.createOpt)(this.enableSlcResetFilter?e.getClearFilterText(i):"","");if(this.enableSlcResetFilter||(n.style.display=h.NONE),t.appendChild(n),e.enableEmptyOption){var r=(0,u.createOpt)(e.emptyText,e.emOperator);t.appendChild(r)}if(e.enableNonEmptyOption){var s=(0,u.createOpt)(e.nonEmptyText,e.nmOperator);t.appendChild(s)}return t}},{key:"selectOptions",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=this.tf;if(0!==e.length){var n=i.getFilterElement(t);[].forEach.call(n.options,function(t){""!==e[0]&&""!==t.value||(t.selected=!1),""!==t.value&&(0,l.has)(e,t.value,!0)&&(t.selected=!0)})}}},{key:"getValues",value:function(t){var e=this.tf,i=e.getFilterElement(t),n=[];return i.selectedOptions?[].forEach.call(i.selectedOptions,function(t){return n.push(t.value)}):[].forEach.call(i.options,function(t){t.selected&&n.push(t.value)}),n}},{key:"destroy",value:function(){var t=this;this.emitter.off(["build-select-filter"],function(e,i,n){return t.build(e,i,n)}),this.emitter.off(["select-options"],function(e,i,n){return t.selectOptions(i,n)}),this.emitter.off(["rows-changed"],function(){return t.refreshAll()}),this.initialized=!1}}]),e}(o.BaseDropdown)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.DateType=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(72);i(422);var u=i(11),l=i(3),c=i(15),f=i(16);e.DateType=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"dateType"));return i.locale=t.locale,i.datetime=o.Date,i.enable(),i}return s(e,t),a(e,[{key:"init",value:function(){var t=this;this.initialized||(this.datetime.setLocale(this.locale),this.addConfigFormats(this.tf.colTypes),this.emitter.on(["add-date-type-formats"],function(e,i){return t.addConfigFormats(i)}),this.emitter.emit("date-type-initialized",this.tf,this),this.initialized=!0)}},{key:"parse",value:function(t,e){return this.datetime.create(t,e)}},{key:"isValid",value:function(t,e){return this.datetime.isValid(this.parse(t,e))}},{key:"getOptions",value:function(t,e){e=e||this.tf.colTypes;var i=e[t];return(0,l.isObj)(i)?i:{}}},{key:"getLocale",value:function(t){return this.getOptions(t).locale||this.locale}},{key:"addConfigFormats",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.forEach(function(i,n){var r=t.getOptions(n,e);if(r.type===c.DATE&&r.hasOwnProperty("format")){var s=t.datetime.getLocale(r.locale||t.locale),a=(0,l.isArray)(r.format)?r.format:[r.format];try{a.forEach(function(t){s.addFormat(t)})}catch(t){f.root.console.error(t)}}})}},{key:"destroy",value:function(){var t=this;this.initialized&&(this.emitter.off(["add-date-type-formats"],function(e,i){return t.addConfigFormats(i)}),this.initialized=!1)}}]),e}(u.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Help=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(10),l=i(19),c=i(15),f=i(16),h=i(3),d=i(7),m=i(33),p="https://github.com/koalyptus/TableFilter/wiki/4.-Filter-operators",g="http://koalyptus.github.io/TableFilter/";e.Help=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"help")),s=i.config.help_instructions||{};return i.tgtId=(0,d.defaultsStr)(s.target_id,null),i.contTgtId=(0,d.defaultsStr)(s.container_target_id,null),i.instrText=(0,h.isEmpty)(s.text)?'Use the filters above each column to filter and limit table data. Advanced searches can be performed by using the following operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, <b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, <b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, <b>rgx:</b><br/><a href="'+p+'" target="_blank">Learn more</a><hr/>':s.text,i.instrHtml=(0,d.defaultsStr)(s.html,null),i.btnText=(0,d.defaultsStr)(s.btn_text,"?"),i.btnHtml=(0,d.defaultsStr)(s.btn_html,null),i.btnCssClass=(0,d.defaultsStr)(s.btn_css_class,"helpBtn"),i.contCssClass=(0,d.defaultsStr)(s.container_css_class,"helpCont"),i.btn=null,i.cont=null,i.boundMouseup=null,i.defaultHtml='<div class="helpFooter"><h4>TableFilter v'+t.version+'</h4><a href="'+g+'" target="_blank">'+g+"</a><br/><span>&copy;2015-"+t.year+' Max Guglielmi</span><div align="center" style="margin-top:8px;"><a href="javascript:void(0);" class="close">Close</a></div></div>',i.toolbarPosition=(0,d.defaultsStr)(s.toolbar_position,m.RIGHT),i.emitter.on(["init-help"],function(){return i.init()}),i}return s(e,t),a(e,[{key:"onMouseup",value:function(t){for(var e=(0,l.targetEvt)(t);e&&e!==this.cont&&e!==this.btn;)e=e.parentNode;e!==this.cont&&e!==this.btn&&this.toggle()}},{key:"init",value:function(){var t=this;if(!this.initialized){this.emitter.emit("initializing-feature",this,!(0,h.isNull)(this.tgtId));var e=this.tf,i=(0,u.createElm)("span"),n=(0,u.createElm)("div");this.boundMouseup=this.onMouseup.bind(this);(this.tgtId?(0,u.elm)(this.tgtId):e.feature("toolbar").container(this.toolbarPosition)).appendChild(i);var r=this.contTgtId?(0,u.elm)(this.contTgtId):i;if(this.btnHtml){i.innerHTML=this.btnHtml;var s=i.firstChild;(0,l.addEvt)(s,"click",function(){return t.toggle()}),r.appendChild(n)}else{r.appendChild(n);var a=(0,u.createElm)("a",["href","javascript:void(0);"]);a.className=this.btnCssClass,a.appendChild((0,u.createText)(this.btnText)),i.appendChild(a),(0,l.addEvt)(a,"click",function(){return t.toggle()})}this.instrHtml?(this.contTgtId&&r.appendChild(n),n.innerHTML=this.instrHtml,this.contTgtId||(n.className=this.contCssClass)):(n.innerHTML=this.instrText,n.className=this.contCssClass),n.innerHTML+=this.defaultHtml,(0,l.addEvt)(n,"click",function(){return t.toggle()}),this.cont=n,this.btn=i,this.initialized=!0,this.emitter.emit("feature-initialized",this)}}},{key:"toggle",value:function(){if(this.isEnabled()){(0,l.removeEvt)(f.root,"mouseup",this.boundMouseup);var t=this.cont.style.display;""===t||t===c.NONE?(this.cont.style.display="inline",(0,l.addEvt)(f.root,"mouseup",this.boundMouseup)):this.cont.style.display=c.NONE}}},{key:"destroy",value:function(){this.initialized&&((0,u.removeElm)(this.btn),this.btn=null,(0,u.removeElm)(this.cont),this.cont=null,this.boundMouseup=null,this.initialized=!1)}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.State=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(114),l=i(115),c=i(21),f=i(3),h=i(7);e.State=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"state")),s=i.config.state||{};return i.enableHash=!0===s||(0,f.isArray)(s.types)&&-1!==s.types.indexOf("hash"),i.enableLocalStorage=(0,f.isArray)(s.types)&&-1!==s.types.indexOf("local_storage"),i.enableCookie=(0,f.isArray)(s.types)&&-1!==s.types.indexOf("cookie"),i.persistFilters=(0,h.defaultsBool)(s.filters,!0),i.persistPageNumber=Boolean(s.page_number),i.persistPageLength=Boolean(s.page_length),i.persistSort=Boolean(s.sort),i.persistColsVisibility=Boolean(s.columns_visibility),i.persistFiltersVisibility=Boolean(s.filters_visibility),i.cookieDuration=(0,h.defaultsNb)(parseInt(s.cookie_duration,10),87600),i.enableStorage=i.enableLocalStorage||i.enableCookie,i.storage=null,i.hash=null,i.pageNb=null,i.pageLength=null,i.sort=null,i.hiddenCols=null,i.filtersVisibility=null,i.state={},i.prfxCol="col_",i.pageNbKey="page",i.pageLengthKey="page_length",i.filtersVisKey="filters_visibility",i}return s(e,t),a(e,[{key:"init",value:function(){var t=this;this.initialized||(this.emitter.on(["after-filtering"],function(){return t.update()}),this.emitter.on(["after-page-change","after-clearing-filters"],function(e,i){return t.updatePage(i)}),this.emitter.on(["after-page-length-change"],function(e,i){return t.updatePageLength(i)}),this.emitter.on(["column-sorted"],function(e,i,n){return t.updateSort(i,n)}),this.emitter.on(["sort-initialized"],function(){return t._syncSort()}),this.emitter.on(["columns-visibility-initialized"],function(){return t._syncColsVisibility()}),this.emitter.on(["column-shown","column-hidden"],function(e,i,n,r){return t.updateColsVisibility(r)}),this.emitter.on(["filters-visibility-initialized"],function(){return t._syncFiltersVisibility()}),this.emitter.on(["filters-toggled"],function(e,i,n){return t.updateFiltersVisibility(n)}),this.enableHash&&(this.hash=new u.Hash(this),this.hash.init()),this.enableStorage&&(this.storage=new l.Storage(this),this.storage.init()),this.initialized=!0)}},{key:"update",value:function(){var t=this;if(this.isEnabled()){var e=this.state,i=this.tf;if(this.persistFilters){i.getFiltersValue().forEach(function(i,n){var r=""+t.prfxCol+n;(0,f.isString)(i)&&(0,c.isEmpty)(i)?e.hasOwnProperty(r)&&(e[r].flt=void 0):(e[r]=e[r]||{},e[r].flt=i)})}if(this.persistPageNumber&&((0,f.isNull)(this.pageNb)?e[this.pageNbKey]=void 0:e[this.pageNbKey]=this.pageNb),this.persistPageLength&&((0,f.isNull)(this.pageLength)?e[this.pageLengthKey]=void 0:e[this.pageLengthKey]=this.pageLength),this.persistSort&&!(0,f.isNull)(this.sort)){Object.keys(e).forEach(function(i){-1!==i.indexOf(t.prfxCol)&&e[i]&&(e[i].sort=void 0)});var n=""+this.prfxCol+this.sort.column;e[n]=e[n]||{},e[n].sort={descending:this.sort.descending}}this.persistColsVisibility&&((0,f.isNull)(this.hiddenCols)||(Object.keys(e).forEach(function(i){-1!==i.indexOf(t.prfxCol)&&e[i]&&(e[i].hidden=void 0)}),this.hiddenCols.forEach(function(i){var n=""+t.prfxCol+i;e[n]=e[n]||{},e[n].hidden=!0}))),this.persistFiltersVisibility&&((0,f.isNull)(this.filtersVisibility)?e[this.filtersVisKey]=void 0:e[this.filtersVisKey]=this.filtersVisibility),this.emitter.emit("state-changed",i,e)}}},{key:"updatePage",value:function(t){this.pageNb=t,this.update()}},{key:"updatePageLength",value:function(t){this.pageLength=t,this.update()}},{key:"updateSort",value:function(t,e){this.sort={column:t,descending:e},this.update()}},{key:"updateColsVisibility",value:function(t){this.hiddenCols=t,this.update()}},{key:"updateFiltersVisibility",value:function(t){this.filtersVisibility=t,this.update()}},{key:"override",value:function(t){this.state=t}},{key:"sync",value:function(){var t=this.state,e=this.tf;if(this._syncFilters(),this.persistPageNumber){var i=t[this.pageNbKey];this.emitter.emit("change-page",e,i)}if(this.persistPageLength){var n=t[this.pageLengthKey];this.emitter.emit("change-page-results",e,n)}this._syncSort(),this._syncColsVisibility(),this._syncFiltersVisibility()}},{key:"overrideAndSync",value:function(t){this.disable(),this.override(t),this.sync(),this.enable()}},{key:"_syncFilters",value:function(){var t=this;if(this.persistFilters){var e=this.state,i=this.tf;Object.keys(e).forEach(function(n){if(-1!==n.indexOf(t.prfxCol)){var r=parseInt(n.replace(t.prfxCol,""),10),s=e[n].flt;i.setFilterValue(r,s)}}),i.filter()}}},{key:"_syncSort",value:function(){var t=this;if(this.persistSort){var e=this.state,i=this.tf;Object.keys(e).forEach(function(n){if(-1!==n.indexOf(t.prfxCol)){var r=parseInt(n.replace(t.prfxCol,""),10);if(!(0,f.isUndef)(e[n].sort)){var s=e[n].sort;t.emitter.emit("sort",i,r,s.descending)}}})}}},{key:"_syncColsVisibility",value:function(){var t=this;if(this.persistColsVisibility){var e=this.state,i=this.tf,n=[];Object.keys(e).forEach(function(i){if(-1!==i.indexOf(t.prfxCol)){var r=parseInt(i.replace(t.prfxCol,""),10);(0,f.isUndef)(e[i].hidden)||n.push(r)}}),n.forEach(function(e){t.emitter.emit("hide-column",i,e)})}}},{key:"_syncFiltersVisibility",value:function(){if(this.persistFiltersVisibility){var t=this.state,e=this.tf,i=t[this.filtersVisKey];this.filtersVisibility=i,this.emitter.emit("show-filters",e,i)}}},{key:"destroy",value:function(){var t=this;this.initialized&&(this.state={},this.emitter.off(["after-filtering"],function(){return t.update()}),this.emitter.off(["after-page-change","after-clearing-filters"],function(e,i){return t.updatePage(i)}),this.emitter.off(["after-page-length-change"],function(e,i){return t.updatePageLength(i)}),this.emitter.off(["column-sorted"],function(e,i,n){return t.updateSort(i,n)}),this.emitter.off(["sort-initialized"],function(){return t._syncSort()}),this.emitter.off(["columns-visibility-initialized"],function(){return t._syncColsVisibility()}),this.emitter.off(["column-shown","column-hidden"],function(e,i,n,r){return t.updateColsVisibility(r)}),this.emitter.off(["filters-visibility-initialized"],function(){return t._syncFiltersVisibility()}),this.emitter.off(["filters-toggled"],function(e,i,n){return t.updateFiltersVisibility(n)}),this.enableHash&&(this.hash.destroy(),this.hash=null),this.enableStorage&&(this.storage.destroy(),this.storage=null),this.initialized=!1)}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Hash=e.hasHashChange=void 0;var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=i(19),a=i(16),o=a.root.JSON,u=a.root.location,l=a.root.decodeURIComponent,c=a.root.encodeURIComponent,f=e.hasHashChange=function(){var t=a.root.documentMode;return"onhashchange"in a.root&&(void 0===t||t>7)};e.Hash=function(){function t(e){n(this,t),this.state=e,this.lastHash=null,this.emitter=e.emitter,this.boundSync=null}return r(t,[{key:"init",value:function(){var t=this;f()&&(this.lastHash=u.hash,this.boundSync=this.sync.bind(this),this.emitter.on(["state-changed"],function(e,i){return t.update(i)}),this.emitter.on(["initialized"],this.boundSync),(0,s.addEvt)(a.root,"hashchange",this.boundSync))}},{key:"update",value:function(t){var e="#"+c(o.stringify(t));this.lastHash!==e&&(u.hash=e,this.lastHash=e)}},{key:"parse",value:function(t){return-1===t.indexOf("#")?null:(t=t.substr(1),o.parse(l(t)))}},{key:"sync",value:function(){var t=this.parse(u.hash);t&&this.state.overrideAndSync(t)}},{key:"destroy",value:function(){var t=this;this.emitter.off(["state-changed"],function(e,i){return t.update(i)}),this.emitter.off(["initialized"],this.boundSync),(0,s.removeEvt)(a.root,"hashchange",this.boundSync),this.state=null,this.lastHash=null,this.emitter=null}}]),t}()},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Storage=e.hasStorage=void 0;var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=i(116),a=function(t){return t&&t.__esModule?t:{default:t}}(s),o=i(16),u=o.root.JSON,l=o.root.localStorage,c=o.root.location,f=e.hasStorage=function(){return"Storage"in o.root};e.Storage=function(){function t(e){n(this,t),this.state=e,this.tf=e.tf,this.enableLocalStorage=e.enableLocalStorage&&f(),this.enableCookie=e.enableCookie&&!this.enableLocalStorage,this.emitter=e.emitter,this.duration=e.cookieDuration}return r(t,[{key:"init",value:function(){var t=this;this.emitter.on(["state-changed"],function(e,i){return t.save(i)}),this.emitter.on(["initialized"],function(){return t.sync()})}},{key:"save",value:function(t){this.enableLocalStorage?l[this.getKey()]=u.stringify(t):a.default.write(this.getKey(),u.stringify(t),this.duration)}},{key:"retrieve",value:function(){var t=null;return t=this.enableLocalStorage?l[this.getKey()]:a.default.read(this.getKey()),t?u.parse(t):null}},{key:"remove",value:function(){this.enableLocalStorage?l.removeItem(this.getKey()):a.default.remove(this.getKey())}},{key:"sync",value:function(){var t=this.retrieve();t&&this.state.overrideAndSync(t)}},{key:"getKey",value:function(){return u.stringify({key:this.tf.prfxTf+"_"+this.tf.id,path:c.pathname})}},{key:"destroy",value:function(){var t=this;this.emitter.off(["state-changed"],function(e,i){return t.save(i)}),this.emitter.off(["initialized"],function(){return t.sync()}),this.remove(),this.state=null,this.emitter=null}}]),t}()},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(16),r=n.root.document;e.default={write:function(t,e,i){var n="";i&&(n=new Date((new Date).getTime()+36e5*i),n="; expires="+n.toGMTString()),r.cookie=t+"="+escape(e)+n},read:function(t){var e="",i=t+"=";if(r.cookie.length>0){var n=r.cookie,s=n.indexOf(i);if(-1!==s){s+=i.length;var a=n.indexOf(";",s);-1===a&&(a=n.length),e=unescape(n.substring(s,a))}}return e},remove:function(t){this.write(t,"",-1)}}},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.GridLayout=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(10),l=i(19),c=i(21),f=i(15),h=i(7);e.GridLayout=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"gridLayout")),s=i.config.grid_layout||{};return i.width=(0,h.defaultsStr)(s.width,null),i.height=(0,h.defaultsStr)(s.height,null),i.mainContCssClass=(0,h.defaultsStr)(s.cont_css_class,"grd_Cont"),i.contCssClass=(0,h.defaultsStr)(s.tbl_cont_css_class,"grd_tblCont"),i.headContCssClass=(0,h.defaultsStr)(s.tbl_head_css_class,"grd_headTblCont"),i.infDivCssClass=(0,h.defaultsStr)(s.inf_grid_css_class,"grd_inf"),i.headRowIndex=(0,h.defaultsNb)(s.headers_row_index,0),i.headRows=(0,h.defaultsArr)(s.headers_rows,[0]),i.filters=(0,h.defaultsBool)(s.filters,!0),i.noHeaders=Boolean(s.no_headers),i.defaultColWidth=(0,h.defaultsStr)(s.default_col_width,"100px"),i.colElms=[],i.prfxGridFltTd="_td_",i.prfxGridTh="tblHeadTh_",i.sourceTblHtml=t.dom().outerHTML,i.tblHasColTag=(0,u.tag)(t.dom(),"col").length>0,i.tblMainCont=null,i.tblCont=null,i.headTblCont=null,i.headTbl=null,t.fltGrid=i.filters,i}return s(e,t),a(e,[{key:"init",value:function(){var t=this,e=this.tf,i=e.dom();if(!this.initialized){this.setOverrides(),this.setDefaultColWidths(),this.tblMainCont=this.createContainer("div",this.mainContCssClass),this.width&&(this.tblMainCont.style.width=this.width),i.parentNode.insertBefore(this.tblMainCont,i),this.tblCont=this.createContainer("div",this.contCssClass),this.setConfigWidth(this.tblCont),this.height&&(this.tblCont.style.height=this.height),i.parentNode.insertBefore(this.tblCont,i);var n=(0,u.removeElm)(i);if(this.tblCont.appendChild(n),""===i.style.width){var r=this.initialTableWidth();i.style.width=((0,c.contains)("%",r)?i.clientWidth:r)+"px"}var s=(0,u.removeElm)(this.tblCont);this.tblMainCont.appendChild(s),this.headTblCont=this.createContainer("div",this.headContCssClass),this.headTbl=(0,u.createElm)("table");var a=(0,u.createElm)("tHead"),o=i.rows[this.headRowIndex],h=this.getSortTriggerIds(o),d=this.createFiltersRow();this.setHeadersRow(a),this.headTbl.appendChild(a),0===e.filtersRowIndex?a.insertBefore(d,o):a.appendChild(d),this.headTblCont.appendChild(this.headTbl),this.tblCont.parentNode.insertBefore(this.headTblCont,this.tblCont);var m=(0,u.tag)(i,"thead");m.length>0&&i.removeChild(m[0]),this.headTbl.style.tableLayout="fixed",i.style.tableLayout="fixed",e.setColWidths(this.headTbl),this.headTbl.style.width=i.style.width,(0,l.addEvt)(this.tblCont,"scroll",function(e){var i=(0,l.targetEvt)(e),n=i.scrollLeft;t.headTblCont.scrollLeft=n});var p=e.extension("sort");p&&(p.asyncSort=!0,p.triggerIds=h),this.setColumnElements(),e.popupFilters&&(d.style.display=f.NONE),this.initialized=!0}}},{key:"setOverrides",value:function(){var t=this.tf;t.refRow=0,t.headersRow=0,t.filtersRowIndex=1}},{key:"setDefaultColWidths",value:function(){var t=this,e=this.tf;e.colWidths.length>0||(e.eachCol(function(i){var n=void 0,r=e.dom().rows[e.getHeadersRowIndex()].cells[i];n=""!==r.width?r.width:""!==r.style.width?parseInt(r.style.width,10):t.defaultColWidth,e.colWidths[i]=n}),e.setColWidths())}},{key:"initialTableWidth",value:function(){var t=this.tf.dom(),e=void 0;return e=""!==t.width?t.width:""!==t.style.width?t.style.width:t.clientWidth,parseInt(e,10)}},{key:"createContainer",value:function(t,e){var i=(0,u.createElm)(t);return i.className=e,i}},{key:"createFiltersRow",value:function(){var t=this,e=this.tf,i=(0,u.createElm)("tr");return this.filters&&e.fltGrid&&(e.externalFltTgtIds=[],e.eachCol(function(n){var r=""+(e.prfxFlt+n+t.prfxGridFltTd+e.id),s=(0,u.createElm)(e.fltCellTag,["id",r]);i.appendChild(s),e.externalFltTgtIds[n]=r})),i}},{key:"setColumnElements",value:function(){var t=this.tf,e=(0,u.tag)(t.dom(),"col");this.tblHasColTag=e.length>0;for(var i=t.getCellsNb()-1;i>=0;i--){var n=void 0;this.tblHasColTag?n=e[i]:(n=(0,u.createElm)("col"),t.dom().insertBefore(n,t.dom().firstChild)),n.style.width=t.colWidths[i],this.colElms[i]=n}this.tblHasColTag=!0}},{key:"setHeadersRow",value:function(t){if(this.noHeaders)t.appendChild((0,u.createElm)("tr"));else for(var e=0;e<this.headRows.length;e++){var i=this.tf.dom().rows[this.headRows[e]];t.appendChild(i)}}},{key:"setConfigWidth",value:function(t){this.width&&(-1!==this.width.indexOf("%")?t.style.width="100%":t.style.width=this.width)}},{key:"getSortTriggerIds",value:function(t){var e=this,i=this.tf,n=[];return i.eachCol(function(r){var s=t.cells[r],a=s.getAttribute("id");a&&""!==a||(a=e.prfxGridTh+r+"_"+i.id,s.setAttribute("id",a)),n.push(a)}),n}},{key:"destroy",value:function(){var t=this.tf,e=t.dom();if(this.initialized){var i=(0,u.removeElm)(e);this.tblMainCont.parentNode.insertBefore(i,this.tblMainCont),(0,u.removeElm)(this.tblMainCont),this.tblMainCont=null,this.headTblCont=null,this.headTbl=null,this.tblCont=null,e.outerHTML=this.sourceTblHtml,this.tf.tbl=(0,u.elm)(t.id),this.initialized=!1}}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Loader=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(10),l=i(3),c=i(16),f=i(15),h=i(7),d=["before-filtering","before-populating-filter","before-page-change","before-clearing-filters","before-page-length-change","before-reset-page","before-reset-page-length","before-loading-extensions","before-loading-themes"];e.Loader=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"loader")),s=i.config.loader||{};return i.targetId=(0,h.defaultsStr)(s.target_id,null),i.cont=null,i.text=(0,h.defaultsStr)(s.text,"Loading..."),i.html=(0,h.defaultsStr)(s.html,null),i.cssClass=(0,h.defaultsStr)(s.css_class,"loader"),i.closeDelay=250,i.onShow=(0,h.defaultsFn)(s.on_show_loader,l.EMPTY_FN),i.onHide=(0,h.defaultsFn)(s.on_hide_loader,l.EMPTY_FN),i}return s(e,t),a(e,[{key:"init",value:function(){var t=this;if(!this.initialized){var e=this.tf,i=this.emitter,n=(0,u.createElm)("div");n.className=this.cssClass;var r=this.targetId?(0,u.elm)(this.targetId):e.dom().parentNode;this.targetId?r.appendChild(n):r.insertBefore(n,e.dom()),this.cont=n,this.html?this.cont.innerHTML=this.html:this.cont.appendChild((0,u.createText)(this.text)),this.show(f.NONE),i.on(d,function(){return t.show("")}),i.on(d,function(){return t.show(f.NONE)}),this.initialized=!0}}},{key:"show",value:function(t){var e=this;if(this.isEnabled()){var i=function(){e.cont&&(t!==f.NONE&&e.onShow(e),e.cont.style.display=t,t===f.NONE&&e.onHide(e))},n=t===f.NONE?this.closeDelay:1;c.root.setTimeout(i,n)}}},{key:"destroy",value:function(){var t=this;if(this.initialized){var e=this.emitter;(0,u.removeElm)(this.cont),this.cont=null,e.off(d,function(){return t.show("")}),e.off(d,function(){return t.show(f.NONE)}),this.initialized=!1}}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.HighlightKeyword=void 0;var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=i(10),a=i(3),o=i(21),u=i(7);e.HighlightKeyword=function(){function t(e){n(this,t);var i=e.config();this.highlightCssClass=(0,u.defaultsStr)(i.highlight_css_class,"keyword"),this.tf=e,this.emitter=e.emitter}return r(t,[{key:"init",value:function(){var t=this;this.emitter.on(["before-filtering","destroy"],function(){return t.unhighlightAll()}),this.emitter.on(["highlight-keyword"],function(e,i,n){return t._processTerm(i,n)})}},{key:"highlight",value:function(t,e,i){if(t.hasChildNodes)for(var n=t.childNodes,r=0;r<n.length;r++)this.highlight(n[r],e,i);if(3===t.nodeType){var a=t.nodeValue.toLowerCase(),o=a.indexOf(e.toLowerCase());if(-1!==o){var u=t.parentNode;if(u&&u.className!==i){var l=t.nodeValue,c=(0,s.createText)(l.substr(0,o)),f=l.substr(o,e.length),h=(0,s.createText)(l.substr(o+e.length)),d=(0,s.createText)(f),m=(0,s.createElm)("span");m.className=i,m.appendChild(d),u.insertBefore(c,t),u.insertBefore(m,t),u.insertBefore(h,t),u.removeChild(t)}}}}},{key:"unhighlight",value:function(t,e){for(var i=this.tf.dom().querySelectorAll("."+e),n=0;n<i.length;n++){var r=i[n],a=(0,s.getText)(r);if(-1!==a.toLowerCase().indexOf(t.toLowerCase())){var o=r.parentNode;o.replaceChild((0,s.createText)(a),r),o.normalize()}}}},{key:"unhighlightAll",value:function(){var t=this;this.tf.highlightKeywords&&this.tf.getFiltersValue().forEach(function(e){(0,a.isArray)(e)?e.forEach(function(e){return t.unhighlight(e,t.highlightCssClass)}):t.unhighlight(e,t.highlightCssClass)})}},{key:"destroy",value:function(){var t=this;this.emitter.off(["before-filtering","destroy"],function(){return t.unhighlightAll()}),this.emitter.off(["highlight-keyword"],function(e,i,n){return t._processTerm(i,n)})}},{key:"_processTerm",value:function(t,e){var i=this.tf,n=new RegExp((0,o.rgxEsc)(i.lkOperator)),r=new RegExp(i.eqOperator),a=new RegExp(i.stOperator),u=new RegExp(i.enOperator),l=new RegExp(i.leOperator),c=new RegExp(i.geOperator),f=new RegExp(i.lwOperator),h=new RegExp(i.grOperator),d=new RegExp(i.dfOperator);e=e.replace(n,"").replace(r,"").replace(a,"").replace(u,""),(l.test(e)||c.test(e)||f.test(e)||h.test(e)||d.test(e))&&(e=(0,s.getText)(t)),""!==e&&this.highlight(t,e,this.highlightCssClass)}}]),t}()},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.PopupFilter=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(3),l=i(10),c=i(19),f=i(15),h=i(16),d=i(7);e.PopupFilter=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"popupFilters")),s=i.config.popup_filters||{};return i.closeOnFiltering=(0,d.defaultsBool)(s.close_on_filtering,!0),i.iconPath=(0,d.defaultsStr)(s.image,t.themesPath+"icn_filter.gif"),i.activeIconPath=(0,d.defaultsStr)(s.image_active,t.themesPath+"icn_filterActive.gif"),i.iconHtml=(0,d.defaultsStr)(s.image_html,'<img src="'+i.iconPath+'" alt="Column filter" />'),i.placeholderCssClass=(0,d.defaultsStr)(s.placeholder_css_class,"popUpPlaceholder"),i.containerCssClass=(0,d.defaultsStr)(s.div_css_class,"popUpFilter"),i.adjustToContainer=(0,d.defaultsBool)(s.adjust_to_container,!0),i.onBeforeOpen=(0,d.defaultsFn)(s.on_before_popup_filter_open,u.EMPTY_FN),i.onAfterOpen=(0,d.defaultsFn)(s.on_after_popup_filter_open,u.EMPTY_FN),i.onBeforeClose=(0,d.defaultsFn)(s.on_before_popup_filter_close,u.EMPTY_FN),i.onAfterClose=(0,d.defaultsFn)(s.on_after_popup_filter_close,u.EMPTY_FN),i.fltSpans=[],i.fltIcons=[],i.filtersCache=null,i.fltElms=(0,d.defaultsArr)(i.filtersCache,[]),i.prfxDiv="popup_",i.activeFilterIdx=-1,i}return s(e,t),a(e,[{key:"onClick",value:function(t){var e=(0,c.targetEvt)(t).parentNode,i=parseInt(e.getAttribute("ci"),10);if(this.closeAll(i),this.toggle(i),this.adjustToContainer){var n=this.fltElms[i],r=this.tf.getHeaderElement(i),s=.95*r.clientWidth;n.style.width=parseInt(s,10)+"px"}(0,c.cancelEvt)(t),(0,c.stopEvt)(t)}},{key:"onMouseup",value:function(t){if(-1!==this.activeFilterIdx){var e=(0,c.targetEvt)(t),i=this.fltElms[this.activeFilterIdx];if(this.fltIcons[this.activeFilterIdx]!==e){for(;e&&e!==i;)e=e.parentNode;e!==i&&this.close(this.activeFilterIdx)}}}},{key:"init",value:function(){var t=this;if(!this.initialized){var e=this.tf;e.externalFltTgtIds=[""],e.filtersRowIndex=0,e.headersRow<=1&&isNaN(e.config().headers_row_index)&&(e.headersRow=0),e.gridLayout&&(e.headersRow--,this.buildIcons()),this.emitter.on(["before-filtering"],function(){return t.setIconsState()}),this.emitter.on(["after-filtering"],function(){return t.closeAll()}),this.emitter.on(["cell-processed"],function(e,i){return t.changeState(i,!0)}),this.emitter.on(["filters-row-inserted"],function(){return t.buildIcons()}),this.emitter.on(["before-filter-init"],function(e,i){return t.build(i)}),this.initialized=!0}}},{key:"reset",value:function(){this.enable(),this.init(),this.buildIcons(),this.buildAll()}},{key:"buildIcons",value:function(){var t=this,e=this.tf;e.headersRow++,e.eachCol(function(i){var n=(0,l.createElm)("span",["ci",i]);n.innerHTML=t.iconHtml,e.getHeaderElement(i).appendChild(n),(0,c.addEvt)(n,"click",function(e){return t.onClick(e)}),t.fltSpans[i]=n,t.fltIcons[i]=n.firstChild},function(t){return e.getFilterType(t)===f.NONE})}},{key:"buildAll",value:function(){for(var t=0;t<this.filtersCache.length;t++)this.build(t,this.filtersCache[t])}},{key:"build",value:function(t,e){var i=this.tf,n=""+this.prfxDiv+i.id+"_"+t,r=(0,l.createElm)("div",["class",this.placeholderCssClass]),s=e||(0,l.createElm)("div",["id",n],["class",this.containerCssClass]);i.externalFltTgtIds[t]=s.id,r.appendChild(s);var a=i.getHeaderElement(t);a.insertBefore(r,a.firstChild),(0,c.addEvt)(s,"click",function(t){return(0,c.stopEvt)(t)}),this.fltElms[t]=s}},{key:"toggle",value:function(t){this.isOpen(t)?this.close(t):this.open(t)}},{key:"open",value:function(t){var e=this,i=this.tf,n=this.fltElms[t];if(this.onBeforeOpen(this,n,t),n.style.display="block",this.activeFilterIdx=t,(0,c.addEvt)(h.root,"mouseup",function(t){return e.onMouseup(t)}),i.getFilterType(t)===f.INPUT){var r=i.getFilterElement(t);r&&r.focus()}this.onAfterOpen(this,n,t)}},{key:"close",value:function(t){var e=this,i=this.fltElms[t];this.onBeforeClose(this,i,t),i.style.display=f.NONE,this.activeFilterIdx===t&&(this.activeFilterIdx=-1),(0,c.removeEvt)(h.root,"mouseup",function(t){return e.onMouseup(t)}),this.onAfterClose(this,i,t)}},{key:"isOpen",value:function(t){return"block"===this.fltElms[t].style.display}},{key:"closeAll",value:function(t){if(!(0,u.isUndef)(t)||this.closeOnFiltering)for(var e=0;e<this.fltElms.length;e++)if(e!==t){var i=this.tf.getFilterType(e),n=i===f.CHECKLIST||i===f.MULTIPLE;n&&(0,u.isUndef)(t)||this.close(e)}}},{key:"setIconsState",value:function(){for(var t=0;t<this.fltIcons.length;t++)this.changeState(t,!1)}},{key:"changeState",value:function(t,e){var i=this.fltIcons[t];i&&(i.src=e?this.activeIconPath:this.iconPath)}},{key:"destroy",value:function(){var t=this;if(this.initialized){this.filtersCache=[];for(var e=0;e<this.fltElms.length;e++){var i=this.fltElms[e],n=i.parentNode,r=this.fltSpans[e],s=this.fltIcons[e];i&&((0,l.removeElm)(i),this.filtersCache[e]=i),i=null,n&&(0,l.removeElm)(n),n=null,r&&(0,l.removeElm)(r),r=null,s&&(0,l.removeElm)(s),s=null}this.fltElms=[],this.fltSpans=[],this.fltIcons=[],this.tf.externalFltTgtIds=[],this.emitter.off(["before-filtering"],function(){return t.setIconsState()}),this.emitter.off(["after-filtering"],function(){return t.closeAll()}),this.emitter.off(["cell-processed"],function(e,i){return t.changeState(i,!0)}),this.emitter.off(["filters-row-inserted"],function(){return t.buildIcons()}),this.emitter.off(["before-filter-init"],function(e,i){return t.build(i)}),this.initialized=!1}}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.MarkActiveColumns=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(10),l=i(3),c=i(7);e.MarkActiveColumns=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"markActiveColumns")),s=i.config.mark_active_columns||{};return i.headerCssClass=(0,c.defaultsStr)(s.header_css_class,"activeHeader"),i.cellCssClass=(0,c.defaultsStr)(s.cell_css_class,"activeCell"),i.highlightColumn=Boolean(s.highlight_column),i.onBeforeActiveColumn=(0,c.defaultsFn)(s.on_before_active_column,l.EMPTY_FN),i.onAfterActiveColumn=(0,c.defaultsFn)(s.on_after_active_column,l.EMPTY_FN),i}return s(e,t),a(e,[{key:"init",value:function(){var t=this;this.initialized||(this.emitter.on(["before-filtering"],function(){return t.clearActiveColumns()}),this.emitter.on(["cell-processed"],function(e,i){return t.markActiveColumn(i)}),this.initialized=!0)}},{key:"clearActiveColumns",value:function(){var t=this,e=this.tf;e.eachCol(function(i){(0,u.removeClass)(e.getHeaderElement(i),t.headerCssClass),t.highlightColumn&&t.eachColumnCell(i,function(e){return(0,u.removeClass)(e,t.cellCssClass)})})}},{key:"markActiveColumn",value:function(t){var e=this,i=this.tf,n=i.getHeaderElement(t);(0,u.hasClass)(n,this.headerCssClass)||(this.onBeforeActiveColumn(this,t),(0,u.addClass)(n,this.headerCssClass),this.highlightColumn&&this.eachColumnCell(t,function(t){return(0,u.addClass)(t,e.cellCssClass)}),this.onAfterActiveColumn(this,t))}},{key:"eachColumnCell",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.EMPTY_FN,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.tf.dom();[].forEach.call(i.querySelectorAll("tbody td:nth-child("+(t+1)+")"),e)}},{key:"destroy",value:function(){var t=this;this.initialized&&(this.clearActiveColumns(),this.emitter.off(["before-filtering"],function(){return t.clearActiveColumns()}),this.emitter.off(["cell-processed"],function(e,i){return t.markActiveColumn(i)}),this.initialized=!1)}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.RowsCounter=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(10),l=i(3),c=i(7),f=i(33);e.RowsCounter=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"rowsCounter")),s=i.config.rows_counter||{};return i.targetId=(0,c.defaultsStr)(s.target_id,null),i.container=null,i.label=null,i.text=(0,c.defaultsStr)(s.text,"Rows: "),i.fromToTextSeparator=(0,c.defaultsStr)(s.separator,"-"),i.overText=(0,c.defaultsStr)(s.over_text," / "),i.cssClass=(0,c.defaultsStr)(s.css_class,"tot"),i.toolbarPosition=(0,c.defaultsStr)(s.toolbar_position,f.LEFT),i.onBeforeRefreshCounter=(0,c.defaultsFn)(s.on_before_refresh_counter,l.EMPTY_FN),i.onAfterRefreshCounter=(0,c.defaultsFn)(s.on_after_refresh_counter,l.EMPTY_FN),i}return s(e,t),a(e,[{key:"init",value:function(){var t=this;if(!this.initialized){this.emitter.emit("initializing-feature",this,!(0,l.isNull)(this.targetId));var e=this.tf,i=(0,u.createElm)("div");i.className=this.cssClass;var n=(0,u.createElm)("span"),r=(0,u.createElm)("span");r.appendChild((0,u.createText)(this.text));var s=this.targetId?(0,u.elm)(this.targetId):e.feature("toolbar").container(this.toolbarPosition);this.targetId?(s.appendChild(r),s.appendChild(n)):(i.appendChild(r),i.appendChild(n),s.appendChild(i)),this.container=i,this.label=n,this.emitter.on(["after-filtering","grouped-by-page"],function(){return t.refresh(e.getValidRowsNb())}),this.emitter.on(["rows-changed"],function(){return t.refresh()}),this.initialized=!0,this.refresh(),this.emitter.emit("feature-initialized",this)}}},{key:"refresh",value:function(t){if(this.initialized&&this.isEnabled()){var e=this.tf;this.onBeforeRefreshCounter(e,this.label);var i=void 0;if(e.paging){var n=e.feature("paging");if(n){var r=e.getValidRowsNb(),s=parseInt(n.startPagingRow,10)+(r>0?1:0),a=s+n.pageLength-1<=r?s+n.pageLength-1:r;i=s+this.fromToTextSeparator+a+this.overText+r}}else i=t&&""!==t?t:e.getFilterableRowsNb()-e.nbHiddenRows;this.label.innerHTML=i,this.onAfterRefreshCounter(e,this.label,i)}}},{key:"destroy",value:function(){var t=this;this.initialized&&(!this.targetId&&this.container?(0,u.removeElm)(this.container):(0,u.elm)(this.targetId).innerHTML="",this.label=null,this.container=null,this.emitter.off(["after-filtering","grouped-by-page"],function(){return t.refresh(tf.getValidRowsNb())}),this.emitter.off(["rows-changed"],function(){return t.refresh()}),this.initialized=!1)}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.StatusBar=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(16),l=i(10),c=i(3),f=i(7),h=i(33),d=["after-filtering","after-populating-filter","after-page-change","after-clearing-filters","after-page-length-change","after-reset-page","after-reset-page-length","after-loading-extensions","after-loading-themes"];e.StatusBar=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"statusBar")),s=i.config.status_bar||{};return i.targetId=(0,f.defaultsStr)(s.target_id,null),i.container=null,i.msgContainer=null,i.labelContainer=null,i.text=(0,f.defaultsStr)(s.text,""),i.cssClass=(0,f.defaultsStr)(s.css_class,"status"),i.delay=250,i.onBeforeShowMsg=(0,f.defaultsFn)(s.on_before_show_msg,c.EMPTY_FN),i.onAfterShowMsg=(0,f.defaultsFn)(s.on_after_show_msg,c.EMPTY_FN),i.msgFilter=(0,f.defaultsStr)(s.msg_filter,"Filtering data..."),i.msgPopulate=(0,f.defaultsStr)(s.msg_populate,"Populating filter..."),i.msgPopulateCheckList=(0,f.defaultsStr)(s.msg_populate_checklist,"Populating list..."),i.msgChangePage=(0,f.defaultsStr)(s.msg_change_page,"Collecting paging data..."),i.msgClear=(0,f.defaultsStr)(s.msg_clear,"Clearing filters..."),i.msgChangeResults=(0,f.defaultsStr)(s.msg_change_results,"Changing results per page..."),i.msgResetPage=(0,f.defaultsStr)(s.msg_reset_page,"Re-setting page..."),i.msgResetPageLength=(0,f.defaultsStr)(s.msg_reset_page_length,"Re-setting page length..."),i.msgSort=(0,f.defaultsStr)(s.msg_sort,"Sorting data..."),i.msgLoadExtensions=(0,f.defaultsStr)(s.msg_load_extensions,"Loading extensions..."),i.msgLoadThemes=(0,f.defaultsStr)(s.msg_load_themes,"Loading theme(s)..."),i.toolbarPosition=(0,f.defaultsStr)(s.toolbar_position,h.LEFT),i}return s(e,t),a(e,[{key:"init",value:function(){var t=this;if(!this.initialized){var e=this.tf,i=this.emitter;i.emit("initializing-feature",this,!(0,c.isNull)(this.targetId));var n=(0,l.createElm)("div");n.className=this.cssClass;var r=(0,l.createElm)("span"),s=(0,l.createElm)("span");s.appendChild((0,l.createText)(this.text));var a=this.targetId?(0,l.elm)(this.targetId):e.feature("toolbar").container(this.toolbarPosition);this.targetId?(a.appendChild(s),a.appendChild(r)):(n.appendChild(s),n.appendChild(r),a.appendChild(n)),this.container=n,this.msgContainer=r,this.labelContainer=s,i.on(["before-filtering"],function(){return t.message(t.msgFilter)}),i.on(["before-populating-filter"],function(){return t.message(t.msgPopulate)}),i.on(["before-page-change"],function(){return t.message(t.msgChangePage)}),i.on(["before-clearing-filters"],function(){return t.message(t.msgClear)}),i.on(["before-page-length-change"],function(){return t.message(t.msgChangeResults)}),i.on(["before-reset-page"],function(){return t.message(t.msgResetPage)}),i.on(["before-reset-page-length"],function(){return t.message(t.msgResetPageLength)}),i.on(["before-loading-extensions"],function(){return t.message(t.msgLoadExtensions)}),i.on(["before-loading-themes"],function(){return t.message(t.msgLoadThemes)}),i.on(d,function(){return t.message("")}),this.initialized=!0,i.emit("feature-initialized",this)}}},{key:"message",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(this.isEnabled()){this.onBeforeShowMsg(this.tf,e);var i=""===e?this.delay:1;u.root.setTimeout(function(){t.initialized&&(t.msgContainer.innerHTML=e,t.onAfterShowMsg(t.tf,e))},i)}}},{key:"destroy",value:function(){var t=this;if(this.initialized){var e=this.emitter;this.container.innerHTML="",this.targetId||(0,l.removeElm)(this.container),this.labelContainer=null,this.msgContainer=null,this.container=null,e.off(["before-filtering"],function(){return t.message(t.msgFilter)}),e.off(["before-populating-filter"],function(){return t.message(t.msgPopulate)}),e.off(["before-page-change"],function(){return t.message(t.msgChangePage)}),e.off(["before-clearing-filters"],function(){return t.message(t.msgClear)}),e.off(["before-page-length-change"],function(){return t.message(t.msgChangeResults)}),e.off(["before-reset-page"],function(){return t.message(t.msgResetPage)}),e.off(["before-reset-page-length"],function(){return t.message(t.msgResetPageLength)}),e.off(["before-loading-extensions"],function(){return t.message(t.msgLoadExtensions)}),e.off(["before-loading-themes"],function(){return t.message(t.msgLoadThemes)}),e.off(d,function(){return t.message("")}),this.initialized=!1}}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.ClearButton=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(10),l=i(19),c=i(7),f=i(3),h=i(33);e.ClearButton=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"btnReset")),s=i.config;return i.targetId=(0,c.defaultsStr)(s.btn_reset_target_id,null),i.container=null,i.element=null,i.text=(0,c.defaultsStr)(s.btn_reset_text,"Reset"),i.cssClass=(0,c.defaultsStr)(s.btn_reset_css_class,"reset"),i.tooltip=s.btn_reset_tooltip||"Clear filters",i.html=(0,c.defaultsStr)(s.btn_reset_html,t.enableIcons?'<input type="button" value="" class="'+i.cssClass+'" title="'+i.tooltip+'" />':null),i.toolbarPosition=(0,c.defaultsStr)(s.toolbar_position,h.RIGHT),i}return s(e,t),a(e,[{key:"onClick",value:function(){this.isEnabled()&&this.tf.clearFilters()}},{key:"init",value:function(){var t=this,e=this.tf;if(!this.initialized){this.emitter.emit("initializing-feature",this,!(0,f.isNull)(this.targetId));var i=(0,u.createElm)("span");if((this.targetId?(0,u.elm)(this.targetId):e.feature("toolbar").container(this.toolbarPosition)).appendChild(i),this.html){i.innerHTML=this.html;var n=i.firstChild;(0,l.addEvt)(n,"click",function(){return t.onClick()})}else{var r=(0,u.createElm)("a",["href","javascript:void(0);"]);r.className=this.cssClass,r.appendChild((0,u.createText)(this.text)),i.appendChild(r),(0,l.addEvt)(r,"click",function(){return t.onClick()})}this.element=i.firstChild,this.container=i,this.initialized=!0,this.emitter.emit("feature-initialized",this)}}},{key:"destroy",value:function(){this.initialized&&((0,u.removeElm)(this.element),(0,u.removeElm)(this.container),this.element=null,this.container=null,this.initialized=!1)}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.AlternateRows=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(10),l=i(7);e.AlternateRows=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"alternateRows")),s=i.config;return i.evenCss=(0,l.defaultsStr)(s.even_row_css_class,"even"),i.oddCss=(0,l.defaultsStr)(s.odd_row_css_class,"odd"),i}return s(e,t),a(e,[{key:"init",value:function(){var t=this;this.initialized||(this.processAll(),this.emitter.on(["row-processed","row-paged"],function(e,i,n,r){return t.processRow(i,n,r)}),this.emitter.on(["column-sorted","rows-changed"],function(){return t.processAll()}),this.initialized=!0)}},{key:"processAll",value:function(){if(this.isEnabled())for(var t=this.tf,e=t.getValidRows(!0),i=e.length,n=0,r=0;r<i;r++){var s=e[r];this.setRowBg(s,n),n++}}},{key:"processRow",value:function(t,e,i){i?this.setRowBg(t,e):this.removeRowBg(t)}},{key:"setRowBg",value:function(t,e){if(this.isEnabled()&&!isNaN(t)){var i=this.tf.dom().rows,n=isNaN(e)?t:e;this.removeRowBg(t),(0,u.addClass)(i[t],n%2?this.evenCss:this.oddCss)}}},{key:"removeRowBg",value:function(t){if(!isNaN(t)){var e=this.tf.dom().rows;(0,u.removeClass)(e[t],this.oddCss),(0,u.removeClass)(e[t],this.evenCss)}}},{key:"destroy",value:function(){var t=this;if(this.initialized){for(var e=this.tf.getRowsNb(!0),i=0;i<e;i++)this.removeRowBg(i);this.emitter.off(["row-processed","row-paged"],function(e,i,n,r){return t.processRow(i,n,r)}),this.emitter.off(["column-sorted","rows-changed"],function(){return t.processAll()}),this.initialized=!1}}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.NoResults=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(11),u=i(10),l=i(3),c=i(15),f=i(7);e.NoResults=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"noResults")),s=i.config.no_results_message||{};return i.content=(0,f.defaultsStr)(s.content,"No results"),i.customContainer=(0,f.defaultsStr)(s.custom_container,null),i.customContainerId=(0,f.defaultsStr)(s.custom_container_id,null),i.isExternal=!(0,l.isEmpty)(i.customContainer)||!(0,l.isEmpty)(i.customContainerId),i.cssClass=(0,f.defaultsStr)(s.css_class,"no-results"),i.cont=null,i.onBeforeShow=(0,f.defaultsFn)(s.on_before_show_msg,l.EMPTY_FN),i.onAfterShow=(0,f.defaultsFn)(s.on_after_show_msg,l.EMPTY_FN),i.onBeforeHide=(0,f.defaultsFn)(s.on_before_hide_msg,l.EMPTY_FN),i.onAfterHide=(0,f.defaultsFn)(s.on_after_hide_msg,l.EMPTY_FN),i}return s(e,t),a(e,[{key:"init",value:function(){var t=this;if(!this.initialized){var e=this.tf,i=this.customContainer||(0,u.elm)(this.customContainerId)||e.dom(),n=(0,u.createElm)("div");n.className=this.cssClass,n.innerHTML=this.content,this.isExternal?i.appendChild(n):i.parentNode.insertBefore(n,i.nextSibling),this.cont=n,this.emitter.on(["after-filtering"],function(){return t.toggle()}),this.initialized=!0,this.hide()}}},{key:"toggle",value:function(){this.tf.getValidRowsNb()>0?this.hide():this.show()}},{key:"show",value:function(){this.initialized&&this.isEnabled()&&(this.onBeforeShow(this.tf,this),this.setWidth(),this.cont.style.display="block",this.onAfterShow(this.tf,this))}},{key:"hide",value:function(){this.initialized&&this.isEnabled()&&(this.onBeforeHide(this.tf,this),this.cont.style.display=c.NONE,this.onAfterHide(this.tf,this))}},{key:"setWidth",value:function(){if(this.initialized&&!this.isExternal&&this.isEnabled()){var t=this.tf;if(t.gridLayout){var e=t.feature("gridLayout");this.cont.style.width=e.headTbl.clientWidth+"px"}else this.cont.style.width=(t.dom().tHead?t.dom().tHead.clientWidth:t.dom().tBodies[0].clientWidth)+"px"}}},{key:"destroy",value:function(){var t=this;this.initialized&&((0,u.removeElm)(this.cont),this.cont=null,this.emitter.off(["after-filtering"],function(){return t.toggle()}),this.initialized=!1)}}]),e}(o.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Paging=void 0;var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),u=i(11),l=i(10),c=i(3),f=i(19),h=i(15),d=i(7),m=i(33);e.Paging=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"paging")),s=i.config.paging||{};i.btnCssClass=(0,d.defaultsStr)(s.btn_css_class,"pgInp"),i.pageSlc=null,i.pageLengthSlc=null,i.tgtId=(0,d.defaultsStr)(s.target_id,null),i.pageLength=(0,d.defaultsNb)(s.length,10),i.pageLengthTgtId=(0,d.defaultsStr)(s.results_per_page_target_id,null),i.pgSlcCssClass=(0,d.defaultsStr)(s.slc_css_class,"pgSlc"),i.pgInpCssClass=(0,d.defaultsStr)(s.inp_css_class,"pgNbInp"),i.resultsPerPage=(0,d.defaultsArr)(s.results_per_page,null),i.hasResultsPerPage=(0,c.isArray)(i.resultsPerPage),i.resultsSlcCssClass=(0,d.defaultsStr)(s.results_slc_css_class,"rspg"),i.resultsSpanCssClass=(0,d.defaultsStr)(s.results_span_css_class,"rspgSpan"),i.startPagingRow=0,i.nbPages=0,i.currentPageNb=1,i.btnNextPageText=(0,d.defaultsStr)(s.btn_next_page_text,">"),i.btnPrevPageText=(0,d.defaultsStr)(s.btn_prev_page_text,"<"),i.btnLastPageText=(0,d.defaultsStr)(s.btn_last_page_text,">|"),i.btnFirstPageText=(0,d.defaultsStr)(s.btn_first_page_text,"|<"),i.btnNextPageHtml=(0,d.defaultsStr)(s.btn_next_page_html,t.enableIcons?'<input type="button" value="" class="'+i.btnCssClass+' nextPage" title="Next page" />':null),i.btnPrevPageHtml=(0,d.defaultsStr)(s.btn_prev_page_html,t.enableIcons?'<input type="button" value="" class="'+i.btnCssClass+' previousPage" title="Previous page" />':null),i.btnFirstPageHtml=(0,d.defaultsStr)(s.btn_first_page_html,t.enableIcons?'<input type="button" value="" class="'+i.btnCssClass+' firstPage" title="First page" />':null),i.btnLastPageHtml=(0,d.defaultsStr)(s.btn_last_page_html,t.enableIcons?'<input type="button" value="" class="'+i.btnCssClass+' lastPage" title="Last page" />':null),i.pageText=(0,d.defaultsStr)(s.page_text," Page "),i.ofText=(0,d.defaultsStr)(s.of_text," of "),i.nbPgSpanCssClass=(0,d.defaultsStr)(s.nb_pages_css_class,"nbpg"),i.hasBtns=(0,d.defaultsBool)(s.btns,!0),i.pageSelectorType=(0,d.defaultsStr)(s.page_selector_type,h.SELECT),i.toolbarPosition=(0,d.defaultsStr)(s.toolbar_position,m.CENTER),i.onBeforeChangePage=(0,d.defaultsFn)(s.on_before_change_page,c.EMPTY_FN),i.onAfterChangePage=(0,d.defaultsFn)(s.on_after_change_page,c.EMPTY_FN),i.slcResultsTxt=null,i.btnNextCont=null,i.btnPrevCont=null,i.btnLastCont=null,i.btnFirstCont=null,i.pgCont=null,i.pgBefore=null,i.pgAfter=null;var a=t.refRow,o=t.getRowsNb(!0);i.nbPages=Math.ceil((o-a)/i.pageLength);var u=i;return i.evt={slcIndex:function(){return u.pageSelectorType===h.SELECT?u.pageSlc.options.selectedIndex:parseInt(u.pageSlc.value,10)-1},nbOpts:function(){return u.pageSelectorType===h.SELECT?parseInt(u.pageSlc.options.length,10)-1:u.nbPages-1},next:function(){var t=u.evt.slcIndex()<u.evt.nbOpts()?u.evt.slcIndex()+1:0;u.changePage(t)},prev:function(){var t=u.evt.slcIndex()>0?u.evt.slcIndex()-1:u.evt.nbOpts();u.changePage(t)},last:function(){u.changePage(u.evt.nbOpts())},first:function(){u.changePage(0)},_detectKey:function(e){(0,f.keyCode)(e)===h.ENTER_KEY&&(t.sorted?(t.filter(),u.changePage(u.evt.slcIndex())):u.changePage(),this.blur())},slcPagesChange:null,nextEvt:null,prevEvt:null,lastEvt:null,firstEvt:null},i}return s(e,t),o(e,[{key:"init",value:function(){var t=this,e=void 0,i=this.tf,n=this.evt;if(!this.initialized){this.emitter.emit("initializing-feature",this,!(0,c.isNull)(this.tgtId)),this.hasResultsPerPage&&(this.resultsPerPage.length<2?this.hasResultsPerPage=!1:(this.pageLength=this.resultsPerPage[1][0],this.setResultsPerPage())),n.slcPagesChange=function(e){var i=e.target;t.changePage(i.selectedIndex)},this.pageSelectorType===h.SELECT&&(e=(0,l.createElm)(h.SELECT),e.className=this.pgSlcCssClass,(0,f.addEvt)(e,"change",n.slcPagesChange)),this.pageSelectorType===h.INPUT&&(e=(0,l.createElm)(h.INPUT,["value",this.currentPageNb]),e.className=this.pgInpCssClass,(0,f.addEvt)(e,"keypress",n._detectKey));var r=(0,l.createElm)("span"),s=(0,l.createElm)("span"),a=(0,l.createElm)("span"),o=(0,l.createElm)("span");if(this.hasBtns){if(this.btnNextPageHtml)r.innerHTML=this.btnNextPageHtml,(0,f.addEvt)(r,"click",n.next);else{var u=(0,l.createElm)(h.INPUT,["type","button"],["value",this.btnNextPageText],["title","Next"]);u.className=this.btnCssClass,(0,f.addEvt)(u,"click",n.next),r.appendChild(u)}if(this.btnPrevPageHtml)s.innerHTML=this.btnPrevPageHtml,(0,f.addEvt)(s,"click",n.prev);else{var d=(0,l.createElm)(h.INPUT,["type","button"],["value",this.btnPrevPageText],["title","Previous"]);d.className=this.btnCssClass,(0,f.addEvt)(d,"click",n.prev),s.appendChild(d)}if(this.btnLastPageHtml)a.innerHTML=this.btnLastPageHtml,(0,f.addEvt)(a,"click",n.last);else{var m=(0,l.createElm)(h.INPUT,["type","button"],["value",this.btnLastPageText],["title","Last"]);m.className=this.btnCssClass,(0,f.addEvt)(m,"click",n.last),a.appendChild(m)}if(this.btnFirstPageHtml)o.innerHTML=this.btnFirstPageHtml,(0,f.addEvt)(o,"click",n.first);else{var p=(0,l.createElm)(h.INPUT,["type","button"],["value",this.btnFirstPageText],["title","First"]);p.className=this.btnCssClass,(0,f.addEvt)(p,"click",n.first),o.appendChild(p)}}var g=this.tgtId?(0,l.elm)(this.tgtId):i.feature("toolbar").container(this.toolbarPosition);g.appendChild(o),g.appendChild(s);var v=(0,l.createElm)("span");v.appendChild((0,l.createText)(this.pageText)),v.className=this.nbPgSpanCssClass,g.appendChild(v),g.appendChild(e);var y=(0,l.createElm)("span");y.appendChild((0,l.createText)(this.ofText)),y.className=this.nbPgSpanCssClass,g.appendChild(y);var b=(0,l.createElm)("span");b.className=this.nbPgSpanCssClass,b.appendChild((0,l.createText)(" "+this.nbPages+" ")),g.appendChild(b),g.appendChild(r),g.appendChild(a),this.btnNextCont=r,this.btnPrevCont=s,this.btnLastCont=a,this.btnFirstCont=o,this.pgCont=b,this.pgBefore=v,this.pgAfter=y,this.pageSlc=e,this.setPagingInfo(),i.fltGrid||(i.validateAllRows(),this.setPagingInfo(i.validRowsIndex)),this.emitter.on(["after-filtering"],function(){return t.resetPagingInfo()}),this.emitter.on(["change-page"],function(e,i){return t.setPage(i)}),this.emitter.on(["change-page-results"],function(e,i){return t.changeResultsPerPage(i)}),this.initialized=!0,this.emitter.emit("feature-initialized",this)}}},{key:"reset",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.enable(),this.init(),t&&this.tf.filter()}},{key:"resetPagingInfo",value:function(){this.startPagingRow=0,this.currentPageNb=1,this.setPagingInfo(this.tf.validRowsIndex)}},{key:"setPagingInfo",value:function(t){var e=this.tf,i=this.tgtId?(0,l.elm)(this.tgtId):e.feature("toolbar").container(this.toolbarPosition);if(e.validRowsIndex=t||e.getValidRows(!0),this.nbPages=Math.ceil(e.validRowsIndex.length/this.pageLength),this.pgCont.innerHTML=this.nbPages,this.pageSelectorType===h.SELECT&&(this.pageSlc.innerHTML=""),this.nbPages>0)if(i.style.visibility="visible",this.pageSelectorType===h.SELECT)for(var n=0;n<this.nbPages;n++){var r=(0,l.createOpt)(n+1,n*this.pageLength,!1);this.pageSlc.options[n]=r}else this.pageSlc.value=this.currentPageNb;else i.style.visibility="hidden";this.groupByPage(e.validRowsIndex)}},{key:"groupByPage",value:function(t){var e=this.tf,i=e.dom().rows,n=parseInt(this.startPagingRow,10),r=n+parseInt(this.pageLength,10);t&&(e.validRowsIndex=t);for(var s=0,a=e.getValidRowsNb(!0);s<a;s++){var o=e.validRowsIndex[s],u=i[o],l=u.getAttribute("validRow"),f=!1;s>=n&&s<r?((0,c.isNull)(l)||Boolean("true"===l))&&(u.style.display="",f=!0):u.style.display=h.NONE,this.emitter.emit("row-paged",e,o,s,f)}this.emitter.emit("grouped-by-page",e,this)}},{key:"getPage",value:function(){return this.currentPageNb}},{key:"setPage",value:function(t){if(this.tf.isInitialized()&&this.isEnabled()){var e=this.evt,i=void 0===t?"undefined":a(t);if("string"===i)switch(t.toLowerCase()){case"next":e.next();break;case"previous":e.prev();break;case"last":e.last();break;case"first":e.first();break;default:e.next()}else"number"===i&&this.changePage(t-1)}}},{key:"setResultsPerPage",value:function(){var t=this,e=this.tf,i=this.evt;if(!this.pageLengthSlc&&this.resultsPerPage){i.slcResultsChange=function(e){t.onChangeResultsPerPage(),e.target.blur()};var n=(0,l.createElm)(h.SELECT);n.className=this.resultsSlcCssClass;var r=this.resultsPerPage[0],s=this.resultsPerPage[1],a=(0,l.createElm)("span");a.className=this.resultsSpanCssClass;var o=this.pageLengthTgtId?(0,l.elm)(this.pageLengthTgtId):e.feature("toolbar").container(m.RIGHT);a.appendChild((0,l.createText)(r));var u=e.feature("help");u&&u.btn?(u.btn.parentNode.insertBefore(a,u.btn),u.btn.parentNode.insertBefore(n,u.btn)):(o.appendChild(a),o.appendChild(n));for(var c=0;c<s.length;c++){var d=new Option(s[c],s[c],!1,!1);n.options[c]=d}(0,f.addEvt)(n,"change",i.slcResultsChange),this.slcResultsTxt=a,this.pageLengthSlc=n}}},{key:"removeResultsPerPage",value:function(){this.tf.isInitialized()&&this.pageLengthSlc&&this.resultsPerPage&&(this.pageLengthSlc&&(0,l.removeElm)(this.pageLengthSlc),this.slcResultsTxt&&(0,l.removeElm)(this.slcResultsTxt),this.pageLengthSlc=null,this.slcResultsTxt=null)}},{key:"changePage",value:function(t){var e=this.tf;this.isEnabled()&&(this.emitter.emit("before-page-change",e,t+1),null===t&&(t=this.pageSelectorType===h.SELECT?this.pageSlc.options.selectedIndex:this.pageSlc.value-1),t>=0&&t<=this.nbPages-1&&(this.onBeforeChangePage(this,t+1),this.currentPageNb=parseInt(t,10)+1,this.pageSelectorType===h.SELECT?this.pageSlc.options[t].selected=!0:this.pageSlc.value=this.currentPageNb,this.startPagingRow=this.pageSelectorType===h.SELECT?this.pageSlc.value:t*this.pageLength,this.groupByPage(),this.onAfterChangePage(this,t+1)),this.emitter.emit("after-page-change",e,t+1))}},{key:"changeResultsPerPage",value:function(t){this.isEnabled()&&!isNaN(t)&&(this.pageLengthSlc.value=t,this.onChangeResultsPerPage())}},{key:"onChangeResultsPerPage",value:function(){var t=this.tf;if(this.isEnabled()&&0!==t.getValidRowsNb()){var e=this.pageLengthSlc,i=this.pageSelectorType,n=this.pageSlc,r=this.emitter;r.emit("before-page-length-change",t);var s=e.selectedIndex,a=i===h.SELECT?n.selectedIndex:parseInt(n.value-1,10);if(this.pageLength=parseInt(e.options[s].value,10),this.startPagingRow=this.pageLength*a,!isNaN(this.pageLength)&&(this.startPagingRow>=t.nbFilterableRows&&(this.startPagingRow=t.nbFilterableRows-this.pageLength),this.setPagingInfo(),i===h.SELECT)){var o=n.options.length-1<=a?n.options.length-1:a;n.options[o].selected=!0}r.emit("after-page-length-change",t,this.pageLength)}}},{key:"resetPage",value:function(){var t=this.tf;if(this.isEnabled()){this.emitter.emit("before-reset-page",t);var e=t.feature("store").getPageNb();""!==e&&this.changePage(e-1),this.emitter.emit("after-reset-page",t,e)}}},{key:"resetPageLength",value:function(){var t=this.tf;if(this.isEnabled()){this.emitter.emit("before-reset-page-length",t);var e=t.feature("store").getPageLength();""!==e&&(this.pageLengthSlc.options[e].selected=!0,this.changeResultsPerPage()),this.emitter.emit("after-reset-page-length",t,e)}}},{key:"destroy",value:function(){var t=this;if(this.initialized){var e=this.evt;this.pageSlc&&(this.pageSelectorType===h.SELECT?(0,f.removeEvt)(this.pageSlc,"change",e.slcPagesChange):this.pageSelectorType===h.INPUT&&(0,f.removeEvt)(this.pageSlc,"keypress",e._detectKey),(0,l.removeElm)(this.pageSlc)),this.btnNextCont&&((0,f.removeEvt)(this.btnNextCont,"click",e.next),(0,l.removeElm)(this.btnNextCont),this.btnNextCont=null),this.btnPrevCont&&((0,f.removeEvt)(this.btnPrevCont,"click",e.prev),(0,l.removeElm)(this.btnPrevCont),this.btnPrevCont=null),this.btnLastCont&&((0,f.removeEvt)(this.btnLastCont,"click",e.last),(0,l.removeElm)(this.btnLastCont),this.btnLastCont=null),this.btnFirstCont&&((0,f.removeEvt)(this.btnFirstCont,"click",e.first),(0,l.removeElm)(this.btnFirstCont),this.btnFirstCont=null),this.pgBefore&&((0,l.removeElm)(this.pgBefore),this.pgBefore=null),this.pgAfter&&((0,l.removeElm)(this.pgAfter),this.pgAfter=null),this.pgCont&&((0,l.removeElm)(this.pgCont),this.pgCont=null),this.hasResultsPerPage&&this.removeResultsPerPage(),this.emitter.off(["after-filtering"],function(){return t.resetPagingInfo()}),this.emitter.off(["change-page"],function(e,i){return t.setPage(i)}),this.emitter.off(["change-page-results"],function(e,i){return t.changeResultsPerPage(i)}),this.pageSlc=null,this.nbPages=0,this.initialized=!1}}}]),e}(u.Feature)},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.CheckList=void 0;var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(69),u=i(10),l=i(70),c=i(21),f=i(19),h=i(3),d=i(15),m=i(7);e.CheckList=function(t){function e(t){n(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,"checkList")),s=i.config;return i.containers=[],i.containerCssClass=(0,m.defaultsStr)(s.div_checklist_css_class,"div_checklist"),i.filterCssClass=(0,m.defaultsStr)(s.checklist_css_class,"flt_checklist"),i.itemCssClass=(0,m.defaultsStr)(s.checklist_item_css_class,"flt_checklist_item"),i.selectedItemCssClass=(0,m.defaultsStr)(s.checklist_selected_item_css_class,"flt_checklist_slc_item"),i.activateText=(0,m.defaultsStr)(s.activate_checklist_text,"Click to load filter data"),i.disabledItemCssClass=(0,m.defaultsStr)(s.checklist_item_disabled_css_class,"flt_checklist_item_disabled"),i.enableResetOption=(0,m.defaultsBool)(s.enable_checklist_reset_filter,!0),i.prfx="chkdiv_",i}return s(e,t),a(e,[{key:"optionClick",value:function(t){var e=(0,f.targetEvt)(t),i=this.tf;this.emitter.emit("filter-focus",i,e),this.setCheckListValues(e),i.filter()}},{key:"onCheckListClick",value:function(t){var e=this,i=(0,f.targetEvt)(t);if(this.tf.loadFltOnDemand&&"0"===i.getAttribute("filled")){var n=i.getAttribute("ct"),r=this.containers[n];this.build(n),(0,f.removeEvt)(r,"click",function(t){return e.onCheckListClick(t)})}}},{key:"refreshAll",value:function(){var t=this.tf.getFiltersByType(d.CHECKLIST,!0);this.refreshFilters(t)}},{key:"init",value:function(t,e,i){var n=this,r=this.tf,s=e?r.externalFltTgtIds[t]:null,a=(0,u.createElm)("div",["id",""+this.prfx+t+"_"+r.id],["ct",t],["filled","0"]);a.className=this.containerCssClass,s?(0,u.elm)(s).appendChild(a):i.appendChild(a),this.containers[t]=a,r.fltIds.push(r.buildFilterId(t)),r.loadFltOnDemand?((0,f.addEvt)(a,"click",function(t){return n.onCheckListClick(t)}),a.appendChild((0,u.createText)(this.activateText))):this.build(t),this.emitter.on(["build-checklist-filter"],function(t,e,i){return n.build(e,i)}),this.emitter.on(["select-checklist-options"],function(t,e,i){return n.selectOptions(e,i)}),this.emitter.on(["rows-changed"],function(){return n.refreshAll()}),this.initialized=!0}},{key:"build",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=this.tf;t=parseInt(t,10),this.emitter.emit("before-populating-filter",i,t),this.opts=[],this.optsTxt=[];var n=this.containers[t],r=(0,u.createElm)("ul",["id",i.fltIds[t]],["colIndex",t]);r.className=this.filterCssClass;var s=i.dom().rows,a=i.getRowsNb(!0),o=i.caseSensitive;if(this.isCustom=i.isCustomOptions(t),this.isCustom){var f=i.getCustomOptions(t);this.opts=f[0],this.optsTxt=f[1]}var h=void 0,d=i.getActiveFilterId();e&&d&&(h=i.getColumnIndexFromFilterId(d));var m=[];e&&i.disableExcludedOptions&&(this.excludedOpts=[]),n.innerHTML="";for(var p=i.refRow;p<a;p++)if(-1===i.excludeRows.indexOf(p)){var g=s[p].cells,v=g.length;if(v===i.nbCells&&!this.isCustom&&(!e||this.isValidLinkedValue(p,h)))for(var y=0;y<v;y++)if(t===y){var b=i.getCellValue(g[y]),w=(0,c.matchCase)(b,o);(0,l.has)(this.opts,w,o)||this.opts.push(b);var x=m[y];e&&i.disableExcludedOptions&&(x||(x=i.getVisibleColumnValues(y)),(0,l.has)(x,w,o)||(0,l.has)(this.excludedOpts,w,o)||this.excludedOpts.push(b))}}this.opts=this.sortOptions(t,this.opts),this.excludedOpts&&(this.excludedOpts=this.sortOptions(t,this.excludedOpts)),this.addChecks(t,r),i.loadFltOnDemand&&(n.innerHTML=""),n.appendChild(r),n.setAttribute("filled","1"),this.emitter.emit("after-populating-filter",i,t,n)}},{key:"addChecks",value:function(t,e){for(var i=this,n=this.tf,r=this.addTChecks(t,e),s=0;s<this.opts.length;s++){var a=this.opts[s],o=this.isCustom?this.optsTxt[s]:a,h=n.fltIds[t],m=(0,u.createCheckItem)(h+"_"+(s+r),a,o);m.className=this.itemCssClass,n.linkedFilters&&n.disableExcludedOptions&&(0,l.has)(this.excludedOpts,(0,c.matchCase)(a,n.caseSensitive),n.caseSensitive)?((0,u.addClass)(m,this.disabledItemCssClass),m.check.disabled=!0,m.disabled=!0):(0,f.addEvt)(m.check,"click",function(t){return i.optionClick(t)}),e.appendChild(m),""===a&&(m.style.display=d.NONE)}}},{key:"addTChecks",value:function(t,e){var i=this,n=this.tf,r=1,s=n.fltIds[t],a=(0,u.createCheckItem)(s+"_0","",n.getClearFilterText(t));if(a.className=this.itemCssClass,e.appendChild(a),(0,f.addEvt)(a.check,"click",function(t){return i.optionClick(t)}),this.enableResetOption||(a.style.display=d.NONE),n.enableEmptyOption){var o=(0,u.createCheckItem)(s+"_1",n.emOperator,n.emptyText);o.className=this.itemCssClass,e.appendChild(o),(0,f.addEvt)(o.check,"click",function(t){return i.optionClick(t)}),r++}if(n.enableNonEmptyOption){var l=(0,u.createCheckItem)(s+"_2",n.nmOperator,n.nonEmptyText);l.className=this.itemCssClass,e.appendChild(l),(0,f.addEvt)(l.check,"click",function(t){return i.optionClick(t)}),r++}return r}},{key:"setCheckListValues",value:function(t){if(t){var e=this.tf,i=t.value,n=parseInt(t.id.split("_")[2],10),r=e.getColumnIndexFromFilterId(t.id),s=e.getFilterElement(parseInt(r,10)),a=s.childNodes[n],o=s.getAttribute("colIndex"),l=s.getAttribute("value"),f=s.getAttribute("indexes");if(t.checked){if(""===i){if(f&&""!==f)for(var h=f.split(e.separator),d=0;d<h.length;d++){var m=(0,u.elm)(e.fltIds[o]+"_"+h[d]);m&&(m.checked=!1,(0,u.removeClass)(s.childNodes[h[d]],this.selectedItemCssClass))}s.setAttribute("value",""),s.setAttribute("indexes","")}else l=l||"",i=(0,c.trim)(l+" "+i+" "+e.orOperator),n=f+n+e.separator,s.setAttribute("value",i),s.setAttribute("indexes",n),(0,u.elm)(e.fltIds[o]+"_0")&&((0,u.elm)(e.fltIds[o]+"_0").checked=!1);"LI"===a.nodeName&&((0,u.removeClass)(s.childNodes[0],this.selectedItemCssClass),(0,u.addClass)(a,this.selectedItemCssClass))}else{if(""!==i){var p=new RegExp((0,c.rgxEsc)(i+" "+e.orOperator));l=l.replace(p,""),s.setAttribute("value",(0,c.trim)(l));var g=new RegExp((0,c.rgxEsc)(n+e.separator));f=f.replace(g,""),s.setAttribute("indexes",f)}"LI"===a.nodeName&&(0,u.removeClass)(a,this.selectedItemCssClass)}}}},{key:"selectOptions",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=this.tf,n=i.getFilterElement(t);if(i.getFilterType(t)===d.CHECKLIST&&n&&0!==e.length){var r=(0,u.tag)(n,"li").length;n.setAttribute("value",""),n.setAttribute("indexes","");for(var s=0;s<r;s++){var a=(0,u.tag)(n,"li")[s],o=(0,u.tag)(a,"label")[0],f=(0,u.tag)(a,"input")[0],h=(0,c.matchCase)((0,u.getText)(o),i.caseSensitive);""!==h&&(0,l.has)(e,h,i.caseSensitive)?f.checked=!0:-1!==e.indexOf(i.nmOperator)&&h===(0,c.matchCase)(i.nonEmptyText,i.caseSensitive)?f.checked=!0:-1!==e.indexOf(i.emOperator)&&h===(0,c.matchCase)(i.emptyText,i.caseSensitive)?f.checked=!0:f.checked=!1,this.setCheckListValues(f)}}}},{key:"getValues",value:function(t){var e=this.tf,i=e.getFilterElement(t),n=i.getAttribute("value"),r=(0,h.isEmpty)(n)?"":n;return r=r.substr(0,r.length-3),r=r.split(" "+e.orOperator+" ")}},{key:"destroy",value:function(){var t=this;this.emitter.off(["build-checklist-filter"],function(e,i,n){return t.build(i,n)}),this.emitter.off(["select-checklist-options"],function(e,i,n){return t.selectOptions(i,n)}),this.emitter.off(["rows-changed"],function(){return t.refreshAll()}),this.initialized=!1}}]),e}(o.BaseDropdown)},function(t,e){function i(t){return t.replace(/[^\u0000-\u007e]/g,function(t){return r[t]||t})}e.remove=i;for(var n=[{base:" ",chars:" "},{base:"0",chars:"߀"},{base:"A",chars:"ⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"},{base:"AA",chars:"Ꜳ"},{base:"AE",chars:"ÆǼǢ"},{base:"AO",chars:"Ꜵ"},{base:"AU",chars:"Ꜷ"},{base:"AV",chars:"ꜸꜺ"},{base:"AY",chars:"Ꜽ"},{base:"B",chars:"ⒷＢḂḄḆɃƁ"},{base:"C",chars:"ⒸＣꜾḈĆCĈĊČÇƇȻ"},{base:"D",chars:"ⒹＤḊĎḌḐḒḎĐƊƉᴅꝹ"},{base:"Dh",chars:"Ð"},{base:"DZ",chars:"ǱǄ"},{base:"Dz",chars:"ǲǅ"},{base:"E",chars:"ɛⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎᴇ"},{base:"F",chars:"ꝼⒻＦḞƑꝻ"},{base:"G",chars:"ⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾɢ"},{base:"H",chars:"ⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"},{base:"I",chars:"ⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"},{base:"J",chars:"ⒿＪĴɈȷ"},{base:"K",chars:"ⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"},{base:"L",chars:"ⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"},{base:"LJ",chars:"Ǉ"},{base:"Lj",chars:"ǈ"},{base:"M",chars:"ⓂＭḾṀṂⱮƜϻ"},{base:"N",chars:"ꞤȠⓃＮǸŃÑṄŇṆŅṊṈƝꞐᴎ"},{base:"NJ",chars:"Ǌ"},{base:"Nj",chars:"ǋ"},{base:"O",chars:"ⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"},{base:"OE",chars:"Œ"},{base:"OI",chars:"Ƣ"},{base:"OO",chars:"Ꝏ"},{base:"OU",chars:"Ȣ"},{base:"P",chars:"ⓅＰṔṖƤⱣꝐꝒꝔ"},{base:"Q",chars:"ⓆＱꝖꝘɊ"},{base:"R",chars:"ⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"},{base:"S",chars:"ⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"},{base:"T",chars:"ⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"},{base:"Th",chars:"Þ"},{base:"TZ",chars:"Ꜩ"},{base:"U",chars:"ⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"},{base:"V",chars:"ⓋＶṼṾƲꝞɅ"},{base:"VY",chars:"Ꝡ"},{base:"W",chars:"ⓌＷẀẂŴẆẄẈⱲ"},{base:"X",chars:"ⓍＸẊẌ"},{base:"Y",chars:"ⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"},{base:"Z",chars:"ⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"},{base:"a",chars:"ⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐɑ"},{base:"aa",chars:"ꜳ"},{base:"ae",chars:"æǽǣ"},{base:"ao",chars:"ꜵ"},{base:"au",chars:"ꜷ"},{base:"av",chars:"ꜹꜻ"},{base:"ay",chars:"ꜽ"},{base:"b",chars:"ⓑｂḃḅḇƀƃɓƂ"},{base:"c",chars:"ｃⓒćĉċčçḉƈȼꜿↄ"},{base:"d",chars:"ⓓｄḋďḍḑḓḏđƌɖɗƋᏧԁꞪ"},{base:"dh",chars:"ð"},{base:"dz",chars:"ǳǆ"},{base:"e",chars:"ⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇǝ"},{base:"f",chars:"ⓕｆḟƒ"},{base:"ff",chars:"ﬀ"},{base:"fi",chars:"ﬁ"},{base:"fl",chars:"ﬂ"},{base:"ffi",chars:"ﬃ"},{base:"ffl",chars:"ﬄ"},{base:"g",chars:"ⓖｇǵĝḡğġǧģǥɠꞡꝿᵹ"},{base:"h",chars:"ⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"},{base:"hv",chars:"ƕ"},{base:"i",chars:"ⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"},{base:"j",chars:"ⓙｊĵǰɉ"},{base:"k",chars:"ⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"},{base:"l",chars:"ⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇɭ"},{base:"lj",chars:"ǉ"},{base:"m",chars:"ⓜｍḿṁṃɱɯ"},{base:"n",chars:"ⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥлԉ"},{base:"nj",chars:"ǌ"},{base:"o",chars:"ⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿꝋꝍɵɔᴑ"},{base:"oe",chars:"œ"},{base:"oi",chars:"ƣ"},{base:"oo",chars:"ꝏ"},{base:"ou",chars:"ȣ"},{base:"p",chars:"ⓟｐṕṗƥᵽꝑꝓꝕρ"},{base:"q",chars:"ⓠｑɋꝗꝙ"},{base:"r",chars:"ⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"},{base:"s",chars:"ⓢｓśṥŝṡšṧṣṩșşȿꞩꞅẛʂ"},{base:"ss",chars:"ß"},{base:"t",chars:"ⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"},{base:"th",chars:"þ"},{base:"tz",chars:"ꜩ"},{base:"u",chars:"ⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"},{base:"v",chars:"ⓥｖṽṿʋꝟʌ"},{base:"vy",chars:"ꝡ"},{base:"w",chars:"ⓦｗẁẃŵẇẅẘẉⱳ"},{base:"x",chars:"ⓧｘẋẍ"},{base:"y",chars:"ⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"},{base:"z",chars:"ⓩｚźẑżžẓẕƶȥɀⱬꝣ"}],r={},s=0;s<n.length;s+=1)for(var a=n[s].chars,o=0;o<a.length;o+=1)r[a[o]]=n[s].base;e.replacementList=n,e.diacriticsMap=r},function(t,e,i){"use strict";i(4),i(157),i(176),i(178),i(179),i(180),i(181),i(182),i(187),i(188),i(189),i(190),i(191),i(192),i(193),i(194),i(195),i(196),i(197),i(198),i(199),i(200),i(201),i(202),i(203),i(204),i(205),i(206),i(207),i(208),i(209),i(210),i(211),i(212),i(213),i(214),i(215),i(216),i(217),i(218),i(219),i(220),i(221),i(222),i(223),i(224),i(225),i(226),i(227),i(228),i(229),i(230),i(231),i(232),i(233),i(234),i(235),i(236),i(237),i(238),i(239),i(240),i(241),i(242),i(243),i(244),i(245),i(246),i(247),i(248),i(249),i(250),i(251),i(252),i(253),i(254),i(255),i(256),i(257),i(258),i(259),i(260),i(261),i(262),i(263),i(264),i(265),i(266),i(267),i(269),i(270),i(271),i(272),i(273),i(274),i(275),i(276),i(279),i(280),i(281),i(282),i(283),i(284),i(285),i(286),i(287),i(288),i(289),i(290),i(291),i(292),i(293),i(294),i(295),i(307),i(308),i(309),i(310),i(311),i(312),i(313),i(314),i(315),i(316),i(319),i(320),i(321),i(322),i(324),i(325),i(326),i(327),i(328),i(329),i(330),i(331),i(332),i(333),i(334),i(335),i(336),i(337),i(338),i(339),i(340),i(341),i(342),i(343),i(345),i(346),i(347),i(348),i(349),i(350),i(351),i(352),i(353),i(354),i(355),i(356),i(357),i(358),i(359),i(360),i(361),i(362),i(363),i(365),i(366),i(368),i(369),i(370),i(371),i(372),i(373),i(374),i(375),i(376),i(377),i(378),i(379),i(380),i(381),i(382),i(383),i(384),i(385),i(386),t.exports=i(0)},function(t,e,i){"use strict";var n=i(132),r=i(73),s=i(134),a={"en-US":r,"en-GB":n,"en-AU":n,"en-CA":s};t.exports=a},function(t,e,i){"use strict";var n=i(54),r=n({short:"{dd}/{MM}/{yyyy}",medium:"{d} {Month} {yyyy}",long:"{d} {Month} {yyyy} {H}:{mm}",full:"{Weekday}, {d} {Month}, {yyyy} {time}",stamp:"{Dow} {d} {Mon} {yyyy} {time}"});t.exports=r},function(t,e,i){"use strict";var n={code:"en",plural:!0,timeMarkers:"at",ampm:"AM|A.M.|a,PM|P.M.|p",units:"millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s",months:"Jan:uary|,Feb:ruary|,Mar:ch|,Apr:il|,May,Jun:e|,Jul:y|,Aug:ust|,Sep:tember|t|,Oct:ober|,Nov:ember|,Dec:ember|",weekdays:"Sun:day|,Mon:day|,Tue:sday|,Wed:nesday|,Thu:rsday|,Fri:day|,Sat:urday|+weekend",numerals:"zero,one|first,two|second,three|third,four:|th,five|fifth,six:|th,seven:|th,eight:|h,nin:e|th,ten:|th",articles:"a,an,the",tokens:"the,st|nd|rd|th,of|in,a|an,on",time:"{H}:{mm}",past:"{num} {unit} {sign}",future:"{num} {unit} {sign}",duration:"{num} {unit}",modifiers:[{name:"half",src:"half",value:.5},{name:"midday",src:"noon",value:12},{name:"midday",src:"midnight",value:24},{name:"day",src:"yesterday",value:-1},{name:"day",src:"today|tonight",value:0},{name:"day",src:"tomorrow",value:1},{name:"sign",src:"ago|before",value:-1},{name:"sign",src:"from now|after|from|in|later",value:1},{name:"edge",src:"first day|first|beginning",value:-2},{name:"edge",src:"last day",value:1},{name:"edge",src:"end|last",value:2},{name:"shift",src:"last",value:-1},{name:"shift",src:"the|this",value:0},{name:"shift",src:"next",value:1}],parse:["(?:just)? now","{shift} {unit:5-7}","{months?} (?:{year}|'{yy})","{midday} {4?} {day|weekday}","{months},?(?:[-.\\/\\s]{year})?","{edge} of (?:day)? {day|weekday}","{0} {num}{1?} {weekday} {2} {months},? {year?}","{shift?} {day?} {weekday?} {timeMarker?} {midday}","{sign?} {3?} {half} {3?} {unit:3-4|unit:7} {sign?}","{0?} {edge} {weekday?} {2} {shift?} {unit:4-7?} {months?},? {year?}"],timeParse:["{day|weekday}","{shift} {unit:5?} {weekday}","{0?} {date}{1?} {2?} {months?}","{weekday} {2?} {shift} {unit:5}","{0?} {num} {2?} {months}\\.?,? {year?}","{num?} {unit:4-5} {sign} {day|weekday}","{year}[-.\\/\\s]{months}[-.\\/\\s]{date}","{0|months} {date?}{1?} of {shift} {unit:6-7}","{0?} {num}{1?} {weekday} of {shift} {unit:6}","{date}[-.\\/\\s]{months}[-.\\/\\s](?:{year}|'?{yy})","{weekday?}\\.?,? {months}\\.?,? {date}{1?},? (?:{year}|'{yy})?"],timeFrontParse:["{sign} {num} {unit}","{num} {unit} {sign}","{4?} {day|weekday}"]};t.exports=n},function(t,e,i){"use strict";var n=i(54),r=n({short:"{yyyy}-{MM}-{dd}",medium:"{d} {Month}, {yyyy}",long:"{d} {Month}, {yyyy} {H}:{mm}",full:"{Weekday}, {d} {Month}, {yyyy} {time}",stamp:"{Dow} {d} {Mon} {yyyy} {time}"});t.exports=r},function(t,e,i){"use strict";function n(t){function e(t){this.init(t)}return e.prototype={getMonthName:function(t,e){return this.monthSuffix?t+1+this.monthSuffix:x(this.months,t,e,12)},getWeekdayName:function(t,e){return x(this.weekdays,t,e,7)},getTokenValue:function(t,e){var i,n=this[t+"Map"];return n&&(i=n[e]),p(i)&&(i=this.getNumber(e),"month"===t&&(i-=1)),i},getNumber:function(t){var e=this.numeralMap[t];return h(e)?e:(e=+t.replace(/,/,"."),isNaN(e)?(e=this.getNumeralValue(t),isNaN(e)?e:(this.numeralMap[t]=e,e)):e)},getNumeralValue:function(t){var e,i,n,r,s,a=1,o=0;s=t.split("");for(var u=s.length-1;n=s[u];u--)r=S(this.numeralMap,n),p(r)&&(r=S(N,n)||0),i=r>0&&r%10==0,i?(e&&(o+=a),u?a=r:o+=r):(o+=r*a,a*=10),e=i;return o},getOrdinal:function(t){return this.ordinalSuffix||y(t)},getRelativeFormat:function(t,e){return this.convertAdjustedToFormat(t,e)},getDuration:function(t){return this.convertAdjustedToFormat(E(I(0,t)),"duration")},getFirstDayOfWeek:function(){var t=this.firstDayOfWeek;return h(t)?t:R},getFirstDayOfWeekYear:function(){return this.firstDayOfWeekYear||D},convertAdjustedToFormat:function(t,e){var i,n,r,s=t[0],a=t[1],o=t[2],u=this[e]||this.relative;return A(u)?u.call(this,s,a,o,e):(r=this.plural&&1!==s?1:0,n=this.units[8*r+a]||this.units[a],i=this[o>0?"fromNow":"ago"],u.replace(/\{(.*?)\}/g,function(t,e){switch(e){case"num":return s;case"unit":return n;case"sign":return i}}))},cacheFormat:function(t,e){this.compiledFormats.splice(e,1),this.compiledFormats.unshift(t)},addFormat:function(t,e){function i(t){var i,s,o,u=t.match(/\?$/),l=t.match(/^(\d+)\??$/),f=t.match(/(\d)(?:-(\d))?/),h=t.replace(/[^a-z]+$/i,"");return(o=S(r.parsingAliases,h))?(s=n(o),u&&(s=b(s,!0)),s):(l?s=r.tokens[l[1]]:(o=S(a,h))?s=o.src:(o=S(r.parsingTokens,h)||S(r,h),h=h.replace(/s$/,""),o||(o=S(r.parsingTokens,h)||S(r,h+"s")),M(o)?(s=o,i=r[h+"Suffix"]):(f&&(o=c(o,function(t,e){var i=e%(r.units?8:o.length);return i>=f[1]&&i<=(f[2]||f[1])})),s=C(o))),s?(l?s=b(s):(e.push(h),s="("+s+")"),i&&(s=T(h,s,i)),u&&(s+="?"),s):"")}function n(t){return t=t.replace(/ /g," ?"),t.replace(/\{([^,]+?)\}/g,function(t,e){var n=e.split("|");return n.length>1?b(l(n,i).join("|")):i(e)})}var r=this;e||(e=[],t=n(t)),r.addRawFormat(t,e)},addRawFormat:function(t,e){this.compiledFormats.unshift({reg:RegExp("^ *"+t+" *$","i"),to:e})},init:function(t){function e(t,e,n,r){var s,a=t,o=[];y[a]||(a+="s"),n||(n={},s=!0),i(a,function(t,i,s){var a,u=i*e+s;a=r?r(s):s,n[t]=a,n[t.toLowerCase()]=a,o[u]=t}),y[a]=o,s&&(y[t+"Map"]=n)}function i(t,e){f(y[t],function(t,i){n(t,function(t,n){e(t,n,i)})})}function n(t,e){var i=l(t.split("+"),function(t){return t.replace(/(.+):(.+)$/,function(t,e,i){return l(i.split("|"),function(t){return e+t}).join("|")})}).join("|");f(i.split("|"),e)}function s(){return y.ampmFront?"{ampm?} {hour} (?:{minute} (?::?{second})?)?":y.ampm.length?"{hour}(?:[.:]{minute}(?:[.:]{second})? {ampm?}| {ampm})":"{hour}(?:[.:]{minute}(?:[.:]{second})?)"}function c(){var t,e="";return t=y.numerals.concat(y.placeholders).concat(y.articles),y.allowsFullWidth&&(t=t.concat(F.split(""))),t.length&&(e="|(?:"+C(t)+")+"),e}function h(t,e,i){f(y[t],function(t){e&&(t=m(t,i)),y.addFormat(t)})}function m(t,e){return e?p()+t:t+g()}function p(){return b("{time}[,\\s\\u3000]",!0)}function g(){var t,e=",?[\\s\\u3000]";return t=C(y.timeMarkers),t&&(e+="| (?:"+t+") "),e=b(e,y.timeMarkerOptional),b(e+"{time}",!0)}var y=this;!function(){y.compiledFormats=[],y.parsingAliases={},y.parsingTokens={}}(),function(){v(y,t)}(),function(){f(r,function(t){var e=y[t];M(e)?y[t]=d(e):e||(y[t]=[])})}(),e("month",12),e("weekday",7),e("unit",8),e("ampm",2),function(){var t={};e("numeral",10,t),e("article",1,t,function(){return 1}),e("placeholder",4,t,function(t){return P(10,t+1)}),y.numeralMap=t}(),function(){y.parsingAliases.time=s(),y.parsingAliases.tzOffset="(?:{Z}|{GMT?}(?:{tzSign}{tzHour}(?::?{tzMinute}(?: \\([\\w\\s]+\\))?)?)?)?"}(),function(){O(u,function(t,e){var i,n;i=t.base?a[t.base].src:t.src,(t.requiresNumerals||y.numeralUnits)&&(i+=c()),n=y[e+"s"],n&&n.length&&(i+="|"+C(n)),y.parsingTokens[e]=i})}(),function(){_(function(t,e){var i=y.timeSuffixes[e];i&&(y[(t.alias||t.name)+"Suffix"]=i)})}(),function(){f(y.modifiers,function(t){var e,i=t.name,r=i+"Map";e=y[r]||{},n(t.src,function(n,r){var s=S(y.parsingTokens,i),a=t.value;e[n]=a,y.parsingTokens[i]=s?s+"|"+n:n,"sign"===t.name&&0===r&&(y[1===a?"fromNow":"ago"]=n)}),y[r]=e})}(),function(){f(o,function(t){var e=t.src;t.mdy&&y.mdy&&(e=t.mdy),t.time?(y.addFormat(m(e,!0)),y.addFormat(m(e))):y.addFormat(e)}),y.addFormat("{time}")}(),function(){h("parse"),h("timeParse",!0),h("timeFrontParse",!0,!0)}()}},new e(t)}var r=i(136),s=i(56),a=i(74),o=i(137),u=i(75),l=i(76),c=i(138),f=i(27),h=i(28),d=i(142),m=i(5),p=i(39),g=i(9),v=i(55),y=i(147),b=i(78),w=i(12),x=i(148),_=i(58),C=i(151),k=i(153),E=i(155),T=i(156),S=w.getOwn,O=w.forEachProperty,N=k.fullWidthNumberMap,F=k.fullWidthNumbers,P=g.pow,I=g.max,R=s.ISO_FIRST_DAY_OF_WEEK,D=s.ISO_FIRST_DAY_OF_WEEK_YEAR,M=m.isString,A=m.isFunction;t.exports=n},function(t,e,i){"use strict";var n=["months","weekdays","units","numerals","placeholders","articles","tokens","timeMarkers","ampm","timeSuffixes","parse","timeParse","timeFrontParse","modifiers"];t.exports=n},function(t,e,i){"use strict";var n=[{src:"{MM}[-.\\/]{yyyy}"},{time:!0,src:"{dd}[-.\\/]{MM}(?:[-.\\/]{yyyy|yy|y})?",mdy:"{MM}[-.\\/]{dd}(?:[-.\\/]{yyyy|yy|y})?"},{time:!0,src:"{yyyy}[-.\\/]{MM}(?:[-.\\/]{dd})?"},{src:"\\\\/Date\\({timestamp}(?:[+-]\\d{4,4})?\\)\\\\/"},{src:"{yearSign?}{yyyy}(?:-?{MM}(?:-?{dd}(?:T{ihh}(?::?{imm}(?::?{ss})?)?)?)?)?{tzOffset?}"}];t.exports=n},function(t,e,i){"use strict";function n(t,e){for(var i=[],n=0,r=t.length;n<r;n++){var s=t[n];n in t&&e(s,n)&&i.push(s)}return i}t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){for(var s,a=r(t,i,n),o=0,u=a.length;o<u;o++)s=a[o],e.call(t,t[s],s,t);return t}var r=i(140);t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){var s,a=[];for(s in t)r(s)&&(i||(n?s<=e:s>=e))&&a.push(+s);return a.sort(function(t,i){var n=t>e;return n!==i>e?n?-1:1:t-i}),a}var r=i(141);t.exports=n},function(t,e,i){"use strict";function n(t){return t>>>0==t&&4294967295!=t}t.exports=n},function(t,e,i){"use strict";function n(t){return t.split(s)}var r=i(44),s=r.HALF_WIDTH_COMMA;t.exports=n},function(t,e,i){"use strict";t.exports="Boolean Number String Date RegExp Function Array Error Set Map"},function(t,e,i){"use strict";function n(t,e){return s(t)&&r(t,"Object",e)&&o(t)&&a(t)}var r=i(77),s=i(57),a=i(145),o=i(146);t.exports=n},function(t,e,i){"use strict";function n(t){var e=Object.prototype;for(var i in t){var n=t[i];if(!s(t,i)&&n!==e[i])return!1}return!0}var r=i(12),s=r.hasOwn;t.exports=n},function(t,e,i){"use strict";function n(t){var e="toString"in t,i="constructor"in t;return!i&&!e||i&&!s(t,"constructor")&&s(t.constructor.prototype,"isPrototypeOf")}var r=i(12),s=r.hasOwn;t.exports=n},function(t,e,i){"use strict";function n(t){if(t>=11&&t<=13)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){var r;return i>1&&(r=t[e+(i-1)*n]),r||t[e]}t.exports=n},function(t,e,i){"use strict";function n(t){var e=r+t;return function(t,i){return arguments.length>1?(a(t,e,i),t):t[e]}}var r=i(150),s=i(12),a=s.setProperty;t.exports=n},function(t,e,i){"use strict";t.exports="_sugar_"},function(t,e,i){"use strict";function n(t){var e=t.join("");return t&&t.length?e.length===t.length?"["+e+"]":r(t,s).join("|"):""}var r=i(76),s=i(152);t.exports=n},function(t,e,i){"use strict";function n(t){return s(t)||(t=String(t)),t.replace(/([\\\/\'*+?|()\[\]{}.^$-])/g,"\\$1")}var r=i(5),s=r.isString;t.exports=n},function(t,e,i){"use strict";var n,r,s,a=i(44),o=i(80),u=i(154),l=a.HALF_WIDTH_ZERO,c=a.FULL_WIDTH_ZERO,f=a.HALF_WIDTH_PERIOD,h=a.FULL_WIDTH_PERIOD,d=a.HALF_WIDTH_COMMA;!function(){var t=h,e=f,i=d,a="";r={};for(var m,p=0;p<=9;p++)m=o(p+c),a+=m,r[m]=o(p+l);r[i]="",r[t]=e,r[e]=e,n=u(a+t+i+e),s=a}(),t.exports={fullWidthNumberReg:n,fullWidthNumberMap:r,fullWidthNumbers:s}},function(t,e,i){"use strict";function n(t){return RegExp("["+t+"]","g")}t.exports=n},function(t,e,i){"use strict";function n(t){return a(t,function(e){return r(s(t/e.multiplier,1))})}var r=i(23),s=i(81),a=i(82);t.exports=n},function(t,e,i){"use strict";function n(t,e,i){var n=r[t];return n.requiresSuffix?e=s(e+s(i)):n.requiresSuffixOr?e+=s(n.requiresSuffixOr+"|"+i):e+=s(i,!0),e}var r=i(75),s=i(78);t.exports=n},function(t,e,i){"use strict";var n=i(0),r=i(32);i(173),n.Date.defineStatic({create:function(t,e){return r(t,e)}}),t.exports=n.Date.create},function(t,e,i){"use strict";var n=i(159),r={newDateInternal:n};t.exports=r},function(t,e,i){"use strict";function n(){return new Date}t.exports=n},function(t,e,i){"use strict";function n(t,e){function i(t){return a[t]}function n(t,i){var n;1===arguments.length?n=t:(n={},n[t]=i),o(n,function(t,i){null===t&&(t=e[i]),a[i]=t})}var a=r(e);return s(t,"getOption",i),s(t,"setOption",n),i}var r=i(43),s=i(161),a=i(12),o=a.forEachProperty;t.exports=n},function(t,e,i){"use strict";function n(t,e,i){s(t,e,i)}var r=i(12),s=r.setProperty;t.exports=n},function(t,e,i){"use strict";function n(t,e){return s(t,r(e))}var r=i(40),s=i(34);t.exports=n},function(t,e,i){"use strict";function n(t){return t===s?a:t+1}var r=i(6),s=r.DAY_INDEX,a=r.MONTH_INDEX;t.exports=n},function(t,e,i){"use strict";function n(t,e,i,n){"ISOWeek"===e?s(t,i):r(t,e,i,n)}var r=i(35),s=i(86);t.exports=n},function(t,e,i){"use strict";function n(t,e){r(t,"FullYear",e)}var r=i(35);t.exports=n},function(t,e,i){"use strict";function n(t,e){r(t,"Month",e)}var r=i(35);t.exports=n},function(t,e,i){"use strict";function n(t,e){return a(t,r(t,e))}var r=i(88),s=i(12),a=s.getOwn;t.exports=n},function(t,e,i){"use strict";function n(t,e){if(s(t,e))return e}var r=i(12),s=r.hasOwn;t.exports=n},function(t,e,i){"use strict";function n(t,e){delete t[r(t,e)]}var r=i(88);t.exports=n},function(t,e,i){"use strict";function n(t,e){var i;return i=t.val?t.val:t.sign?"+"===e?1:-1:t.bool?!!i:+e.replace(/,/,"."),"month"===t.param&&(i-=1),i}t.exports=n},function(t,e,i){"use strict";function n(t,e,i){var n,s=+t;return s+=s<50?2e3:1900,i&&(n=s-r(e))/a(n)!==i&&(s+=100*i),s}var r=i(30),s=i(9),a=s.abs;t.exports=n},function(t,e,i){"use strict";function n(t,e){s(t,e,o,a)}var r=i(6),s=i(48),a=r.DAY_INDEX,o=r.YEAR_INDEX;t.exports=n},function(t,e,i){"use strict";i(174)()},function(t,e,i){"use strict";function n(){a(o,r)}var r=i(32),s=i(25),a=i(175),o=s.sugarDate;t.exports=n},function(t,e,i){"use strict";function n(t,e){t.prototype.constructor=function(){return e.apply(this,arguments)}}t.exports=n},function(t,e,i){"use strict";var n=i(0),r=i(8),s=i(177),a=r.localeManager;n.Date.defineStatic({getAllLocaleCodes:function(){return s(a.getAll())}}),t.exports=n.Date.getAllLocaleCodes},function(t,e,i){"use strict";function n(t){return Object.keys(t)}t.exports=n},function(t,e,i){"use strict";var n=i(0),r=i(8),s=r.localeManager;n.Date.defineStatic({getAllLocales:function(){return s.getAll()}}),t.exports=n.Date.getAllLocales},function(t,e,i){"use strict";var n=i(0),r=i(8),s=r.localeManager;n.Date.defineStatic({getLocale:function(t){return s.get(t,!t)}}),t.exports=n.Date.getLocale},function(t,e,i){"use strict";var n=i(0),r=i(8),s=r.localeManager;n.Date.defineStatic({removeLocale:function(t){return s.remove(t)}}),t.exports=n.Date.removeLocale},function(t,e,i){"use strict";var n=i(0),r=i(8),s=r.localeManager;n.Date.defineStatic({setLocale:function(t){return s.set(t)}}),t.exports=n.Date.setLocale},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.day},function(t,e,i){"use strict";function n(){l(c,r,function(t,e){var i,n,r,a=e.name;i=function(t){return f(t*e.multiplier)},n=function(t,e,i){return o(s(e,i,!0),a,t)},r=function(t,e,i){return o(s(e,i,!0),a,-t)},t[a]=i,t[a+"s"]=i,t[a+"Before"]=r,t[a+"sBefore"]=r,t[a+"Ago"]=r,t[a+"sAgo"]=r,t[a+"After"]=n,t[a+"sAfter"]=n,t[a+"FromNow"]=n,t[a+"sFromNow"]=n})}var r=i(29),s=i(32),a=i(9),o=i(42),u=i(25),l=i(51),c=u.sugarNumber,f=a.round;t.exports=n},function(t,e,i){"use strict";var n=i(185);t.exports={alias:n("alias"),defineStatic:n("defineStatic"),defineInstance:n("defineInstance"),defineStaticPolyfill:n("defineStaticPolyfill"),defineInstancePolyfill:n("defineInstancePolyfill"),defineInstanceAndStatic:n("defineInstanceAndStatic"),defineInstanceWithArguments:n("defineInstanceWithArguments")}},function(t,e,i){"use strict";function n(t){return function(e,i,n){e[t](i,n)}}t.exports=n},function(t,e,i){"use strict";function n(t,e){var i={};return o(t)&&(t=s(t)),r(t,function(t,n){e(i,t,n)}),i}var r=i(27),s=i(45),a=i(5),o=a.isString;t.exports=n},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.dayAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.dayAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.dayBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.dayFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.days},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.daysAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.daysAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.daysBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.daysFromNow},function(t,e,i){"use strict";var n=i(0),r=i(8),s=r.localeManager;n.Number.defineInstance({duration:function(t,e){return s.get(e).getDuration(t)}}),t.exports=n.Number.duration},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.hour},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.hourAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.hourAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.hourBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.hourFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.hours},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.hoursAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.hoursAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.hoursBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.hoursFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.millisecond},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.millisecondAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.millisecondAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.millisecondBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.millisecondFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.milliseconds},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.millisecondsAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.millisecondsAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.millisecondsBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.millisecondsFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.minute},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.minuteAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.minuteAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.minuteBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.minuteFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.minutes},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.minutesAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.minutesAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.minutesBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.minutesFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.month},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.monthAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.monthAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.monthBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.monthFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.months},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.monthsAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.monthsAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.monthsBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.monthsFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.second},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.secondAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.secondAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.secondBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.secondFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.seconds},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.secondsAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.secondsAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.secondsBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.secondsFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.week},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.weekAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.weekAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.weekBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.weekFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.weeks},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.weeksAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.weeksAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.weeksBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.weeksFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.year},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.yearAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.yearAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.yearBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.yearFromNow},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.years},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.yearsAfter},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.yearsAgo},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.yearsBefore},function(t,e,i){"use strict";var n=i(0);i(1),t.exports=n.Number.yearsFromNow},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.addDays},function(t,e,i){"use strict";function n(){h(g,r,function(t,e,i){var n=e.name,r=c(n);i>y&&a(["Last","This","Next"],function(e){t["is"+e+r]=function(t,i){return o(t,e+" "+n,0,i,{locale:"en"})}}),i>v&&(t["beginningOf"+r]=function(t,e){return d(t,i,e)},t["endOf"+r]=function(t,e){return l(t,i,e)}),t["add"+r+"s"]=function(t,e,i){return u(t,n,e,i)};var s=function(t,i,n){return p(t,m(t,i,n,!0),e)},f=function(t,i,n){return p(m(t,i,n,!0),t,e)};t[n+"sAgo"]=t[n+"sUntil"]=f,t[n+"sSince"]=t[n+"sFromNow"]=s})}var r=i(29),s=i(6),a=i(27),o=i(90),u=i(42),l=i(49),c=i(62),f=i(25),h=i(51),d=i(50),m=i(91),p=i(63),g=f.sugarDate,v=s.HOURS_INDEX,y=s.DAY_INDEX;t.exports=n},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.addHours},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.addMilliseconds},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.addMinutes},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.addMonths},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.addSeconds},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.addWeeks},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.addYears},function(t,e,i){"use strict";var n=i(0),r=i(92);n.Date.defineInstanceWithArguments({advance:function(t,e){return r(t,e,1)}}),t.exports=n.Date.advance},function(t,e,i){"use strict";function n(t){var e,i,n={};return e=t.match(/^(-?\d*[\d.]\d*)?\s?(\w+?)s?$/i),e&&(r(i)&&(i=+e[1],isNaN(i)&&(i=1)),n[e[2].toLowerCase()]=i),n}var r=i(39);t.exports=n},function(t,e,i){"use strict";function n(t){var e={},i=0;return a(o,function(n){var r=t[i++];s(r)&&(e[n.name]=r)}),e}var r=i(6),s=i(28),a=i(85),o=r.YEAR_INDEX;t.exports=n},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.beginningOfDay},function(t,e,i){"use strict";var n=i(0),r=i(84),s=i(20),a=i(24);n.Date.defineInstance({beginningOfISOWeek:function(t){var e=s(t);return 0===e?e=-6:1!==e&&(e=1),a(t,e),r(t)}}),t.exports=n.Date.beginningOfISOWeek},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.beginningOfMonth},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.beginningOfWeek},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.beginningOfYear},function(t,e,i){"use strict";var n=i(0),r=i(38);n.Date.defineInstance({clone:function(t){return r(t)}}),t.exports=n.Date.clone},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.daysAgo},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.daysFromNow},function(t,e,i){"use strict";var n=i(0),r=i(79);n.Date.defineInstance({daysInMonth:function(t){return r(t)}}),t.exports=n.Date.daysInMonth},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.daysSince},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.daysUntil},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.endOfDay},function(t,e,i){"use strict";var n=i(0),r=i(6),s=i(20),a=i(24),o=i(49),u=r.DAY_INDEX;n.Date.defineInstance({endOfISOWeek:function(t){return 0!==s(t)&&a(t,7),o(t,u)}}),t.exports=n.Date.endOfISOWeek},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.endOfMonth},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.endOfWeek},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.endOfYear},function(t,e,i){"use strict";var n=i(0),r=i(94);n.Date.defineInstance({format:function(t,e,i){return r(t,e,i)}}),t.exports=n.Date.format},function(t,e,i){"use strict";var n,r,s,a=i(8),o=i(297),u=i(95),l=i(27),c=i(64),f=i(45),h=i(25),d=i(12),m=i(303),p=i(51),g=a.localeManager,v=d.hasOwn,y=d.getOwn,b=d.forEachProperty,w=h.sugarDate;!function(){function t(t,e,i){e&&l(f(e),function(e){t[e]=i})}function e(t){return function(e,i){return t(e,i).toLowerCase()}}function i(t){return function(e,i){var n=t(e,i);return n+g.get(i).getOrdinal(n)}}function a(t,e){return function(i,n){return c(t(i,n),e)}}function h(t){return function(e,i){return t(e,i)%100}}function d(t){return function(e,i){return s(t,e,i)}}function m(t){for(var e=1;e<=5;e++)v(t,e)}function v(i,r){var s=function(t,e){return i.get(t,e,r)};t(n,i.ldml+r,s),i.lowerToken&&(n[i.lowerToken+r]=e(s))}function y(t){return function(e,i){var n=g.get(i);return s(n[t],e,i)}}n={},r={},l(o,function(s){var o,u=s.get;s.lowerToken&&(n[s.lowerToken]=e(u)),s.ordinalToken&&(n[s.ordinalToken]=i(u)),s.ldmlPaddedToken&&(n[s.ldmlPaddedToken]=a(u,s.ldmlPaddedToken.length)),s.ldmlTwoDigitToken&&(n[s.ldmlTwoDigitToken]=a(h(u),2)),s.strfTwoDigitToken&&(r[s.strfTwoDigitToken]=a(h(u),2)),s.strfPadding&&(o=a(u,s.strfPadding)),s.alias&&(u=d(s.alias)),s.allowAlternates&&m(s),t(n,s.ldml,u),t(r,s.strf,o||u)}),b(u,function(e,i){t(n,i,d(e))}),p(w,"short medium long full",function(e,i){var r=y(i);t(n,i,r),e[i]=r}),t(n,"time",y("time")),t(n,"stamp",y("stamp"))}(),function(){function t(t,e,i){return y(n,e)(t,i)}function e(t,e,i){return y(r,e)(t,i)}function i(t,e){return v(n,t)||v(r,e)}s=m(t,e,i)}(),t.exports={ldmlTokens:n,strfTokens:r,dateFormatMatcher:s}},function(t,e,i){"use strict";var n=i(298),r=i(8),s=i(6),a=i(23),o=i(37),u=i(30),l=i(96),c=i(31),f=i(38),h=i(64),d=i(20),m=i(18),p=i(9),g=i(300),v=i(97),y=i(301),b=i(65),w=i(302),x=i(34),_=r.localeManager,C=s.MONTH_INDEX,k=p.ceil,E=[{ldml:"Dow",strf:"a",lowerToken:"dow",get:function(t,e){return _.get(e).getWeekdayName(d(t),2)}},{ldml:"Weekday",strf:"A",lowerToken:"weekday",allowAlternates:!0,get:function(t,e,i){return _.get(e).getWeekdayName(d(t),i)}},{ldml:"Mon",strf:"b h",lowerToken:"mon",get:function(t,e){return _.get(e).getMonthName(c(t),2)}},{ldml:"Month",strf:"B",lowerToken:"month",allowAlternates:!0,get:function(t,e,i){return _.get(e).getMonthName(c(t),i)}},{strf:"C",get:function(t){return u(t).toString().slice(0,2)}},{ldml:"d date day",strf:"d",strfPadding:2,ldmlPaddedToken:"dd",ordinalToken:"do",get:function(t){return o(t)}},{strf:"e",get:function(t){return h(o(t),2,!1,10," ")}},{ldml:"H 24hr",strf:"H",strfPadding:2,ldmlPaddedToken:"HH",get:function(t){return l(t)}},{ldml:"h hours 12hr",strf:"I",strfPadding:2,ldmlPaddedToken:"hh",get:function(t){return l(t)%12||12}},{ldml:"D",strf:"j",strfPadding:3,ldmlPaddedToken:"DDD",get:function(t){var e=x(f(t),C);return y(t,e)+1}},{ldml:"M",strf:"m",strfPadding:2,ordinalToken:"Mo",ldmlPaddedToken:"MM",get:function(t){return c(t)+1}},{ldml:"m minutes",strf:"M",strfPadding:2,ldmlPaddedToken:"mm",get:function(t){return m(t,"Minutes")}},{ldml:"Q",get:function(t){return k((c(t)+1)/3)}},{ldml:"TT",strf:"p",get:function(t,e){return w(t,e)}},{ldml:"tt",strf:"P",get:function(t,e){return w(t,e).toLowerCase()}},{ldml:"T",lowerToken:"t",get:function(t,e){return w(t,e).charAt(0)}},{ldml:"s seconds",strf:"S",strfPadding:2,ldmlPaddedToken:"ss",get:function(t){return m(t,"Seconds")}},{ldml:"S ms",strfPadding:3,ldmlPaddedToken:"SSS",get:function(t){return m(t,"Milliseconds")}},{ldml:"e",strf:"u",ordinalToken:"eo",get:function(t){return d(t)||7}},{strf:"U",strfPadding:2,get:function(t){return b(t,!1,0)}},{ldml:"W",strf:"V",strfPadding:2,ordinalToken:"Wo",ldmlPaddedToken:"WW",get:function(t){return b(t,!0)}},{strf:"w",get:function(t){return d(t)}},{ldml:"w",ordinalToken:"wo",ldmlPaddedToken:"ww",get:function(t,e){var i=_.get(e),n=i.getFirstDayOfWeek(e),r=i.getFirstDayOfWeekYear(e);return b(t,!0,n,r)}},{strf:"W",strfPadding:2,get:function(t){return b(t,!1)}},{ldmlPaddedToken:"gggg",ldmlTwoDigitToken:"gg",get:function(t,e){return g(t,e)}},{strf:"G",strfPadding:4,strfTwoDigitToken:"g",ldmlPaddedToken:"GGGG",ldmlTwoDigitToken:"GG",get:function(t,e){return g(t,e,!0)}},{ldml:"year",ldmlPaddedToken:"yyyy",ldmlTwoDigitToken:"yy",strf:"Y",strfPadding:4,strfTwoDigitToken:"y",get:function(t){return u(t)}},{ldml:"ZZ",strf:"z",get:function(t){return v(t)}},{ldml:"X",get:function(t){return a(t.getTime()/1e3)}},{ldml:"x",get:function(t){return t.getTime()}},{ldml:"Z",get:function(t){return v(t,!0)}},{ldml:"z",strf:"Z",get:function(t){var e=t.toString().match(n);return e?e[1]:""}},{strf:"D",alias:"%m/%d/%y"},{strf:"F",alias:"%Y-%m-%d"},{strf:"r",alias:"%I:%M:%S %p"},{strf:"R",alias:"%H:%M"},{strf:"T",alias:"%H:%M:%S"},{strf:"x",alias:"{short}"},{strf:"X",alias:"{time}"},{strf:"c",alias:"{stamp}"}];t.exports=E},function(t,e,i){"use strict";t.exports=/(\w{3})[()\s\d]*$/},function(t,e,i){"use strict";function n(t,e){var i="";for(t=t.toString();e>0;)1&e&&(i+=t),(e>>=1)&&(t+=t);return i}t.exports=n},function(t,e,i){"use strict";function n(t,e,i){var n,r,l,c,f,h;return n=s(t),r=a(t),0!==r&&11!==r||(i||(h=u.get(e),l=h.getFirstDayOfWeek(e),c=h.getFirstDayOfWeekYear(e)),f=o(t,!1,l,c),0===r&&0===f?n-=1:11===r&&1===f&&(n+=1)),n}var r=i(8),s=i(30),a=i(31),o=i(65),u=r.localeManager;t.exports=n},function(t,e,i){"use strict";function n(t,e){return a(t,e,r[o])}var r=i(29),s=i(6),a=i(63),o=s.DAY_INDEX;t.exports=n},function(t,e,i){"use strict";function n(t,e){var i=a(t);return o.get(e).ampm[s(i/12)]||""}var r=i(8),s=i(23),a=i(96),o=r.localeManager;t.exports=n},function(t,e,i){"use strict";function n(t,e,i){function n(n,r){var s,a,o,u,f=r[2],h=r[3],d=r[5];r[4]&&e?(a=d,s=e):f?(a=f,s=t):o=h&&e?h:r[1]||r[0],s&&(c(i,f,d),u=function(t,e){return s(t,a,e)}),n.push(u||l(o))}function s(t,e,i,n){if(n>i){var r=e.slice(i,n);f(r,o),f(r,u),t.push(function(){return r})}}function l(t){return function(){return t}}function c(t,e,i){if(t&&!t(e,i))throw new TypeError("Invalid token "+(e||i)+" in format string")}function f(t,e){if(-1!==t.indexOf(e))throw new TypeError("Unmatched "+e+" in format string")}function h(t){var e,i=[],r=0;for(d.lastIndex=0;e=d.exec(t);)s(i,t,r,e.index),n(i,e),r=d.lastIndex;return s(i,t,r,t.length),i}var d=r,m=a(h);return function(t,e,i){for(var n=m(t),r="",s=0;s<n.length;s++)r+=n[s](e,i);return r}}var r=i(304),s=i(44),a=i(305),o=s.OPEN_BRACE,u=s.CLOSE_BRACE;t.exports=n},function(t,e,i){"use strict";t.exports=/([{}])\1|\{([^}]*)\}|(%)%|(%(\w*))/g},function(t,e,i){"use strict";function n(t){var e={},i=0;return function(n){return a(e,n)?e[n]:(i===r&&(e={},i=0),i++,e[n]=t(n))}}var r=i(306),s=i(12),a=s.hasOwn;t.exports=n},function(t,e,i){"use strict";t.exports=1e3},function(t,e,i){"use strict";var n=i(0),r=i(91);n.Date.defineInstance({get:function(t,e,i){return r(t,e,i)}}),t.exports=n.Date.get},function(t,e,i){"use strict";var n=i(0),r=i(65);n.Date.defineInstance({getISOWeek:function(t){return r(t,!0)}}),t.exports=n.Date.getISOWeek},function(t,e,i){"use strict";var n=i(0),r=i(97);n.Date.defineInstance({getUTCOffset:function(t,e){return r(t,e)}}),t.exports=n.Date.getUTCOffset},function(t,e,i){"use strict";var n=i(0);n.Date.defineInstance({getUTCWeekday:function(t){return t.getUTCDay()}}),t.exports=n.Date.getUTCWeekday},function(t,e,i){"use strict";var n=i(0),r=i(20);n.Date.defineInstance({getWeekday:function(t){return r(t)}}),t.exports=n.Date.getWeekday},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.hoursAgo},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.hoursFromNow},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.hoursSince},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.hoursUntil},function(t,e,i){"use strict";var n=i(0),r=i(99);n.Date.defineInstance({is:function(t,e,i){return r(t,e,i)}}),t.exports=n.Date.is},function(t,e,i){"use strict";function n(t){return t.trim()}t.exports=n},function(t,e,i){"use strict";function n(t,e){var i=u();return e&&r(i,s(i)+e),a(t)===a(i)&&o(t)===o(i)&&s(t)===s(i)}var r=i(36),s=i(37),a=i(30),o=i(31),u=i(41);t.exports=n},function(t,e,i){"use strict";var n=i(0),r=i(32);n.Date.defineInstance({isAfter:function(t,e,i){return t.getTime()>r(e).getTime()-(i||0)}}),t.exports=n.Date.isAfter},function(t,e,i){"use strict";var n=i(0),r=i(32);n.Date.defineInstance({isBefore:function(t,e,i){return t.getTime()<r(e).getTime()+(i||0)}}),t.exports=n.Date.isBefore},function(t,e,i){"use strict";var n=i(0),r=i(32),s=i(9),a=s.min,o=s.max;n.Date.defineInstance({isBetween:function(t,e,i,n){var s=t.getTime(),u=r(e).getTime(),l=r(i).getTime(),c=a(u,l),f=o(u,l);return n=n||0,c-n<=s&&f+n>=s}}),t.exports=n.Date.isBetween},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isFriday},function(t,e,i){"use strict";function n(){var t=s("Today Yesterday Tomorrow Weekday Weekend Future Past"),e=l.weekdays.slice(0,7),i=l.months.slice(0,12),n=t.concat(e).concat(i);u(c,n,function(t,e){t["is"+e]=function(t){return a(t,e)}})}var r=i(8),s=i(45),a=i(99),o=i(25),u=i(51),l=r.English,c=o.sugarDate;t.exports=n},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isFuture},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.isLastMonth},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.isLastWeek},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.isLastYear},function(t,e,i){"use strict";var n=i(0),r=i(30);n.Date.defineInstance({isLeapYear:function(t){var e=r(t);return e%4==0&&e%100!=0||e%400==0}}),t.exports=n.Date.isLeapYear},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isMonday},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.isNextMonth},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.isNextWeek},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.isNextYear},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isPast},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isSaturday},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isSunday},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.isThisMonth},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.isThisWeek},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.isThisYear},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isThursday},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isToday},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isTomorrow},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isTuesday},function(t,e,i){"use strict";var n=i(0),r=i(344);n.Date.defineInstance({isUTC:function(t){return r(t)}}),t.exports=n.Date.isUTC},function(t,e,i){"use strict";function n(t){return!!r(t)||0===s(t)}var r=i(22),s=i(46);t.exports=n},function(t,e,i){"use strict";var n=i(0),r=i(52);n.Date.defineInstance({isValid:function(t){return r(t)}}),t.exports=n.Date.isValid},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isWednesday},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isWeekday},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isWeekend},function(t,e,i){"use strict";var n=i(0);i(13),t.exports=n.Date.isYesterday},function(t,e,i){"use strict";var n=i(0);n.Date.defineInstance({iso:function(t){return t.toISOString()}}),t.exports=n.Date.iso},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.millisecondsAgo},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.millisecondsFromNow},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.millisecondsSince},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.millisecondsUntil},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.minutesAgo},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.minutesFromNow},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.minutesSince},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.minutesUntil},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.monthsAgo},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.monthsFromNow},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.monthsSince},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.monthsUntil},function(t,e,i){"use strict";var n=i(0),r=i(100);n.Date.defineInstance({relative:function(t,e,i){return r(t,null,e,i)}}),t.exports=n.Date.relative},function(t,e,i){"use strict";function n(t,e){var i;return e||(e=r(),t>e&&(e=new Date(e.getTime()-10))),i=t-e,a(i,function(i){return u(o(t,e,i))})}var r=i(41),s=i(9),a=i(82),o=i(63),u=s.abs;t.exports=n},function(t,e,i){"use strict";var n=i(0),r=i(32),s=i(100);n.Date.defineInstance({relativeTo:function(t,e,i){return s(t,r(e),i)}}),t.exports=n.Date.relativeTo},function(t,e,i){"use strict";var n=i(0),r=i(6),s=i(50),a=i(367),o=r.DAY_INDEX;n.Date.defineInstance({reset:function(t,e,i){var n=e?a(e):o;return s(t,n,i),t}}),t.exports=n.Date.reset},function(t,e,i){"use strict";function n(t){var e,i={};return i[t]=1,r(i,function(t,i,n,r){return e=r,!1}),e}var r=i(48);t.exports=n},function(t,e,i){"use strict";var n=i(0),r=i(92);n.Date.defineInstanceWithArguments({rewind:function(t,e){return r(t,e,-1)}}),t.exports=n.Date.rewind},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.secondsAgo},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.secondsFromNow},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.secondsSince},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.secondsUntil},function(t,e,i){"use strict";var n=i(0),r=i(47),s=i(93);n.Date.defineInstanceWithArguments({set:function(t,e){return e=s(e),r(t,e[0],e[1])}}),t.exports=n.Date.set},function(t,e,i){"use strict";var n=i(0),r=i(86);n.Date.defineInstance({setISOWeek:function(t,e){return r(t,e)}}),t.exports=n.Date.setISOWeek},function(t,e,i){"use strict";var n=i(0),r=i(22);n.Date.defineInstance({setUTC:function(t,e){return r(t,e)}}),t.exports=n.Date.setUTC},function(t,e,i){"use strict";var n=i(0),r=i(24);n.Date.defineInstance({setWeekday:function(t,e){return r(t,e)}}),t.exports=n.Date.setWeekday},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.weeksAgo},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.weeksFromNow},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.weeksSince},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.weeksUntil},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.yearsAgo},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.yearsFromNow},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.yearsSince},function(t,e,i){"use strict";var n=i(0);i(2),t.exports=n.Date.yearsUntil},function(t,e,i){"use strict";var n=i(0);i(60);t.exports=n.Date.getOption},function(t,e,i){"use strict";var n=i(0);i(60);t.exports=n.Date.setOption},function(t,e,i){"use strict";i(388),i(394),i(396),i(397),i(398),i(407),i(408),i(409),i(410),i(411),i(412),i(413),i(414),i(415),i(417),i(418),i(419),i(420),i(421),t.exports=i(0)},function(t,e,i){"use strict";var n=i(0),r=i(389);n.Date.defineStatic({range:r}),t.exports=n.Date.range},function(t,e,i){"use strict";var n=i(14),r=i(5),s=i(103),a=i(390),o=r.isString,u=function(t,e){return 1===arguments.length&&o(t)?a(t):new n(s(t),s(e))};t.exports=u},function(t,e,i){"use strict";function n(t){var e,i,n,s,u,m;return c.get&&(e=t.match(f))?(u=o(e[1].replace("from","at")),m=c.get(u,e[2]),new r(u,m)):((e=t.match(d))&&(n=e[1],i=e[2]),(e=t.match(h))&&(i=e[1],n=e[2]),i&&n?(u=o(i),s=l(n),m=a(u,s[0],s[1])):u=t,new r(o(u),o(m)))}var r=i(14),s=i(391),a=i(104),o=i(103),u=i(25),l=i(106),c=u.sugarDate,f=s.RANGE_REG_FROM_TO,h=s.RANGE_REG_REAR_DURATION,d=s.RANGE_REG_FRONT_DURATION;t.exports=n},function(t,e,i){"use strict";var n=i(392);t.exports={RANGE_REG_FROM_TO:/(?:from)?\s*(.+)\s+(?:to|until)\s+(.+)$/i,RANGE_REG_REAR_DURATION:RegExp("(.+)\\s*for\\s*"+n,"i"),RANGE_REG_FRONT_DURATION:RegExp("(?:for)?\\s*"+n+"\\s*(?:starting)?\\s(?:at\\s)?(.+)","i")}},function(t,e,i){"use strict";var n=i(66);t.exports="((?:\\d+)?\\s*(?:"+n+"))s?"},function(t,e,i){"use strict";var n=i(66);t.exports=RegExp("(\\d+)?\\s*("+n+")s?","i")},function(t,e,i){"use strict";var n=i(14),r=i(395);i(17)(n,{clamp:function(t){return r(this,t)}})},function(t,e,i){"use strict";function n(t,e){var i,n=t.start,s=t.end,a=s<n?s:n,o=n>s?n:s;return i=e<a?a:e>o?o:e,r(i)}var r=i(101);t.exports=n},function(t,e,i){"use strict";var n=i(14);i(17)(n,{clone:function(){return new n(this.start,this.end)}})},function(t,e,i){"use strict";var n=i(14);i(17)(n,{contains:function(t){return null!=t&&(t.start&&t.end?t.start>=this.start&&t.start<=this.end&&t.end>=this.start&&t.end<=this.end:t>=this.start&&t<=this.end)}})},function(t,e,i){"use strict";i(26)},function(t,e,i){"use strict";function n(){var t={};u(s.split("|"),function(e,i){var n,s,a=e+"s";i<4?s=function(){return l(this,e,!0)}:(n=r[c(a)],s=function(){return o((this.end-this.start)/n)}),t[a]=s}),f(a,t)}var r=i(105),s=i(66),a=i(14),o=i(23),u=i(27),l=i(67),c=i(62),f=i(17);t.exports=n},function(t,e,i){"use strict";function n(t){var e=s(t);return(!!e||0===e)&&r(t)}var r=i(401),s=i(102);t.exports=n},function(t,e,i){"use strict";function n(t){return t!==-1/0&&t!==1/0}t.exports=n},function(t,e,i){"use strict";function n(t,e,i){return r(t+e,i)}var r=i(81);t.exports=n},function(t,e,i){"use strict";function n(t,e){return r(t.charCodeAt(0)+e)}var r=i(80);t.exports=n},function(t,e,i){"use strict";function n(t,e){return a(s(t),s(e))}var r=i(9),s=i(405),a=r.max;t.exports=n},function(t,e,i){"use strict";function n(t){var e=r(t.toString());return e[1]?e[1].length:0}var r=i(406);t.exports=n},function(t,e,i){"use strict";function n(t){return t.split(s)}var r=i(44),s=r.HALF_WIDTH_PERIOD;t.exports=n},function(t,e,i){"use strict";var n=i(14),r=i(67);i(17)(n,{every:function(t,e){return r(this,t,!1,e)}})},function(t,e,i){"use strict";i(26)},function(t,e,i){"use strict";var n=i(14);i(17)(n,{intersect:function(t){return t.start>this.end||t.end<this.start?new n(NaN,NaN):new n(this.start>t.start?this.start:t.start,this.end<t.end?this.end:t.end)}})},function(t,e,i){"use strict";var n=i(14),r=i(53);i(17)(n,{isValid:function(){return r(this)}})},function(t,e,i){"use strict";i(26)},function(t,e,i){"use strict";i(26)},function(t,e,i){"use strict";i(26)},function(t,e,i){"use strict";i(26)},function(t,e,i){"use strict";var n=i(14),r=i(9),s=i(53),a=i(17),o=i(416),u=r.abs;a(n,{span:function(){var t=o(this.end)-o(this.start);return s(this)?u(t)+1:NaN}})},function(t,e,i){"use strict";function n(t){return s(t)?t.charCodeAt(0):t}var r=i(5),s=r.isString;t.exports=n},function(t,e,i){"use strict";var n=i(14),r=i(67);i(17)(n,{toArray:function(){return r(this)}})},function(t,e,i){"use strict";var n=i(14),r=i(53);i(17)(n,{toString:function(){return r(this)?this.start+".."+this.end:"Invalid Range"}})},function(t,e,i){"use strict";var n=i(14);i(17)(n,{union:function(t){return new n(this.start<t.start?this.start:t.start,this.end>t.end?this.end:t.end)}})},function(t,e,i){"use strict";i(26)},function(t,e,i){"use strict";i(26)},function(t,e,i){"use strict";i(423),i(424),i(425),i(426),i(427),i(428),i(429),i(430),i(431),i(432),i(433),i(434),i(435),i(436),i(437),i(438),i(439),t.exports=i(0)},function(t,e,i){"use strict";i(4)("ca",{plural:!0,units:"milisegon:|s,segon:|s,minut:|s,hor:a|es,di:a|es,setman:a|es,mes:|os,any:|s",months:"gen:er|,febr:er|,mar:ç|,abr:il|,mai:g|,jun:y|,jul:iol|,ag:ost|,set:embre|,oct:ubre|,nov:embre|,des:embre|",weekdays:"diumenge|dg,dilluns|dl,dimarts|dt,dimecres|dc,dijous|dj,divendres|dv,dissabte|ds",numerals:"zero,un,dos,tres,quatre,cinc,sis,set,vuit,nou,deu",tokens:"el,la,de",short:"{dd}/{MM}/{yyyy}",medium:"{d} {month} {yyyy}",long:"{d} {month} {yyyy} {time}",full:"{weekday} {d} {month} {yyyy} {time}",stamp:"{dow} {d} {mon} {yyyy} {time}",time:"{H}:{mm}",past:"{sign} {num} {unit}",future:"{sign} {num} {unit}",duration:"{num} {unit}",timeMarkers:"a las",ampm:"am,pm",modifiers:[{name:"day",src:"abans d'ahir",value:-2},{name:"day",src:"ahir",value:-1},{name:"day",src:"avui",value:0},{name:"day",src:"demà|dema",value:1},{name:"sign",src:"fa",value:-1},{name:"sign",src:"en",value:1},{name:"shift",src:"passat",value:-1},{name:"shift",src:"el proper|la propera",value:1}],parse:["{sign} {num} {unit}","{num} {unit} {sign}","{0?}{1?} {unit:5-7} {shift}","{0?}{1?} {shift} {unit:5-7}"],timeParse:["{shift} {weekday}","{weekday} {shift}","{date?} {2?} {months}\\.? {2?} {year?}"]})},function(t,e,i){"use strict";i(4)("da",{plural:!0,units:"millisekund:|er,sekund:|er,minut:|ter,tim:e|er,dag:|e,ug:e|er|en,måned:|er|en+maaned:|er|en,år:||et+aar:||et",months:"jan:uar|,feb:ruar|,mar:ts|,apr:il|,maj,jun:i|,jul:i|,aug:ust|,sep:tember|,okt:ober|,nov:ember|,dec:ember|",weekdays:"søn:dag|+son:dag|,man:dag|,tir:sdag|,ons:dag|,tor:sdag|,fre:dag|,lør:dag|+lor:dag|",numerals:"nul,en|et,to,tre,fire,fem,seks,syv,otte,ni,ti",tokens:"den,for",articles:"den",short:"{dd}-{MM}-{yyyy}",medium:"{d}. {month} {yyyy}",long:"{d}. {month} {yyyy} {time}",full:"{weekday} d. {d}. {month} {yyyy} {time}",stamp:"{dow} {d} {mon} {yyyy} {time}",time:"{H}:{mm}",past:"{num} {unit} {sign}",future:"{sign} {num} {unit}",duration:"{num} {unit}",ampm:"am,pm",modifiers:[{name:"day",src:"forgårs|i forgårs|forgaars|i forgaars",value:-2},{name:"day",src:"i går|igår|i gaar|igaar",value:-1},{name:"day",src:"i dag|idag",value:0},{name:"day",src:"i morgen|imorgen",value:1},{name:"day",src:"over morgon|overmorgen|i over morgen|i overmorgen|iovermorgen",value:2},{name:"sign",src:"siden",value:-1},{name:"sign",src:"om",value:1},{name:"shift",src:"i sidste|sidste",value:-1},{name:"shift",src:"denne",value:0},{name:"shift",src:"næste|naeste",value:1}],parse:["{months} {year?}","{num} {unit} {sign}","{sign} {num} {unit}","{1?} {num} {unit} {sign}","{shift} {unit:5-7}"],timeParse:["{day|weekday}","{date} {months?}\\.? {year?}"],timeFrontParse:["{shift} {weekday}","{0?} {weekday?},? {date}\\.? {months?}\\.? {year?}"]})},function(t,e,i){"use strict";i(4)("de",{plural:!0,units:"Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en|e",months:"Jan:uar|,Feb:ruar|,M:är|ärz|ar|arz,Apr:il|,Mai,Juni,Juli,Aug:ust|,Sept:ember|,Okt:ober|,Nov:ember|,Dez:ember|",weekdays:"So:nntag|,Mo:ntag|,Di:enstag|,Mi:ttwoch|,Do:nnerstag|,Fr:eitag|,Sa:mstag|",numerals:"null,ein:|e|er|en|em,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn",tokens:"der",short:"{dd}.{MM}.{yyyy}",medium:"{d}. {Month} {yyyy}",long:"{d}. {Month} {yyyy} {time}",full:"{Weekday}, {d}. {Month} {yyyy} {time}",stamp:"{Dow} {d} {Mon} {yyyy} {time}",time:"{H}:{mm}",past:"{sign} {num} {unit}",future:"{sign} {num} {unit}",duration:"{num} {unit}",timeMarkers:"um",ampm:"am,pm",modifiers:[{name:"day",src:"vorgestern",value:-2},{name:"day",src:"gestern",value:-1},{name:"day",src:"heute",value:0},{name:"day",src:"morgen",value:1},{name:"day",src:"übermorgen|ubermorgen|uebermorgen",value:2},{name:"sign",src:"vor:|her",value:-1},{name:"sign",src:"in",value:1},{name:"shift",src:"letzte:|r|n|s",value:-1},{name:"shift",src:"nächste:|r|n|s+nachste:|r|n|s+naechste:|r|n|s+kommende:n|r",value:1}],parse:["{months} {year?}","{sign} {num} {unit}","{num} {unit} {sign}","{shift} {unit:5-7}"],timeParse:["{shift?} {day|weekday}","{weekday?},? {date}\\.? {months?}\\.? {year?}"],timeFrontParse:["{shift} {weekday}","{weekday?},? {date}\\.? {months?}\\.? {year?}"]})},function(t,e,i){"use strict";i(4)("es",{plural:!0,units:"milisegundo:|s,segundo:|s,minuto:|s,hora:|s,día|días|dia|dias,semana:|s,mes:|es,año|años|ano|anos",months:"ene:ro|,feb:rero|,mar:zo|,abr:il|,may:o|,jun:io|,jul:io|,ago:sto|,sep:tiembre|,oct:ubre|,nov:iembre|,dic:iembre|",weekdays:"dom:ingo|,lun:es|,mar:tes|,mié:rcoles|+mie:rcoles|,jue:ves|,vie:rnes|,sáb:ado|+sab:ado|",numerals:"cero,uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez",tokens:"el,la,de",short:"{dd}/{MM}/{yyyy}",medium:"{d} de {Month} de {yyyy}",long:"{d} de {Month} de {yyyy} {time}",full:"{weekday}, {d} de {month} de {yyyy} {time}",stamp:"{dow} {d} {mon} {yyyy} {time}",time:"{H}:{mm}",past:"{sign} {num} {unit}",future:"{sign} {num} {unit}",duration:"{num} {unit}",timeMarkers:"a las",ampm:"am,pm",modifiers:[{name:"day",src:"anteayer",value:-2},{name:"day",src:"ayer",value:-1},{name:"day",src:"hoy",value:0},{name:"day",src:"mañana|manana",value:1},{name:"sign",src:"hace",value:-1},{name:"sign",src:"dentro de",value:1},{name:"shift",src:"pasad:o|a",value:-1},{name:"shift",src:"próximo|próxima|proximo|proxima",value:1}],parse:["{months} {2?} {year?}","{sign} {num} {unit}","{num} {unit} {sign}","{0?}{1?} {unit:5-7} {shift}","{0?}{1?} {shift} {unit:5-7}"],timeParse:["{shift?} {day|weekday} {shift?}","{date} {2?} {months?}\\.? {2?} {year?}"],timeFrontParse:["{shift?} {weekday} {shift?}","{date} {2?} {months?}\\.? {2?} {year?}"]})},function(t,e,i){"use strict";i(4)("fi",{plural:!0,units:"millisekun:ti|tia|nin|teja|tina,sekun:ti|tia|nin|teja|tina,minuut:ti|tia|in|teja|tina,tun:ti|tia|nin|teja|tina,päiv:ä|ää|än|iä|änä,viik:ko|koa|on|olla|koja|kona,kuukau:si|tta|den+kuussa,vuo:si|tta|den|sia|tena|nna",months:"tammi:kuuta||kuu,helmi:kuuta||kuu,maalis:kuuta||kuu,huhti:kuuta||kuu,touko:kuuta||kuu,kesä:kuuta||kuu,heinä:kuuta||kuu,elo:kuuta||kuu,syys:kuuta||kuu,loka:kuuta||kuu,marras:kuuta||kuu,joulu:kuuta||kuu",weekdays:"su:nnuntai||nnuntaina,ma:anantai||anantaina,ti:istai||istaina,ke:skiviikko||skiviikkona,to:rstai||rstaina,pe:rjantai||rjantaina,la:uantai||uantaina",numerals:"nolla,yksi|ensimmäinen,kaksi|toinen,kolm:e|as,neljä:|s,vii:si|des,kuu:si|des,seitsemä:n|s,kahdeksa:n|s,yhdeksä:n|s,kymmene:n|s",short:"{d}.{M}.{yyyy}",medium:"{d}. {month} {yyyy}",long:"{d}. {month} {yyyy} klo {time}",full:"{weekday} {d}. {month} {yyyy} klo {time}",stamp:"{dow} {d} {mon} {yyyy} {time}",time:"{H}.{mm}",timeMarkers:"klo,kello",ordinalSuffix:".",relative:function(t,e,i,n){function r(i){return t+" "+a[8*i+e]}function s(){return r(1===t?0:1)}var a=this.units;switch(n){case"duration":return s();case"past":return s()+" sitten";case"future":return r(2)+" kuluttua"}},modifiers:[{name:"day",src:"toissa päivänä",value:-2},{name:"day",src:"eilen|eilistä",value:-1},{name:"day",src:"tänään",value:0},{name:"day",src:"huomenna|huomista",value:1},{name:"day",src:"ylihuomenna|ylihuomista",value:2},{name:"sign",src:"sitten|aiemmin",value:-1},{name:"sign",src:"päästä|kuluttua|myöhemmin",value:1},{name:"edge",src:"lopussa",value:2},{name:"edge",src:"ensimmäinen|ensimmäisenä",value:-2},{name:"shift",src:"edel:linen|lisenä",value:-1},{name:"shift",src:"viime",value:-1},{name:"shift",src:"tä:llä|ssä|nä|mä",value:0},{name:"shift",src:"seuraava|seuraavana|tuleva|tulevana|ensi",value:1}],parse:["{months} {year?}","{shift} {unit:5-7}"],timeParse:["{shift?} {day|weekday}","{weekday?},? {date}\\.? {months?}\\.? {year?}"],timeFrontParse:["{shift?} {day|weekday}","{num?} {unit} {sign}","{weekday?},? {date}\\.? {months?}\\.? {year?}"]})},function(t,e,i){"use strict";i(4)("fr",{plural:!0,units:"milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|née|nee",months:"janv:ier|,févr:ier|+fevr:ier|,mars,avr:il|,mai,juin,juil:let|,août,sept:embre|,oct:obre|,nov:embre|,déc:embre|+dec:embre|",weekdays:"dim:anche|,lun:di|,mar:di|,mer:credi|,jeu:di|,ven:dredi|,sam:edi|",numerals:"zéro,un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix",tokens:"l'|la|le,er",short:"{dd}/{MM}/{yyyy}",medium:"{d} {month} {yyyy}",long:"{d} {month} {yyyy} {time}",full:"{weekday} {d} {month} {yyyy} {time}",stamp:"{dow} {d} {mon} {yyyy} {time}",time:"{H}:{mm}",past:"{sign} {num} {unit}",future:"{sign} {num} {unit}",duration:"{num} {unit}",timeMarkers:"à",ampm:"am,pm",modifiers:[{name:"day",src:"hier",value:-1},{name:"day",src:"aujourd'hui",value:0},{name:"day",src:"demain",value:1},{name:"sign",src:"il y a",value:-1},{name:"sign",src:"dans|d'ici",value:1},{name:"shift",src:"derni:èr|er|ère|ere",value:-1},{name:"shift",src:"prochain:|e",value:1}],parse:["{months} {year?}","{sign} {num} {unit}","{0?} {unit:5-7} {shift}"],timeParse:["{day|weekday} {shift?}","{weekday?},? {0?} {date}{1?} {months}\\.? {year?}"],timeFrontParse:["{0?} {weekday} {shift}","{weekday?},? {0?} {date}{1?} {months}\\.? {year?}"]})},function(t,e,i){"use strict";i(4)("it",{plural:!0,units:"millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i",months:"gen:naio|,feb:braio|,mar:zo|,apr:ile|,mag:gio|,giu:gno|,lug:lio|,ago:sto|,set:tembre|,ott:obre|,nov:embre|,dic:embre|",weekdays:"dom:enica|,lun:edì||edi,mar:tedì||tedi,mer:coledì||coledi,gio:vedì||vedi,ven:erdì||erdi,sab:ato|",numerals:"zero,un:|a|o|',due,tre,quattro,cinque,sei,sette,otto,nove,dieci",tokens:"l'|la|il",short:"{dd}/{MM}/{yyyy}",medium:"{d} {month} {yyyy}",long:"{d} {month} {yyyy} {time}",full:"{weekday}, {d} {month} {yyyy} {time}",stamp:"{dow} {d} {mon} {yyyy} {time}",time:"{H}:{mm}",past:"{num} {unit} {sign}",future:"{num} {unit} {sign}",duration:"{num} {unit}",timeMarkers:"alle",ampm:"am,pm",modifiers:[{name:"day",src:"ieri",value:-1},{name:"day",src:"oggi",value:0},{name:"day",src:"domani",value:1},{name:"day",src:"dopodomani",value:2},{name:"sign",src:"fa",value:-1},{name:"sign",src:"da adesso",value:1},{name:"shift",src:"scors:o|a",value:-1},{name:"shift",src:"prossim:o|a",value:1}],parse:["{months} {year?}","{num} {unit} {sign}","{0?} {unit:5-7} {shift}","{0?} {shift} {unit:5-7}"],timeParse:["{shift?} {day|weekday}","{weekday?},? {date} {months?}\\.? {year?}"],timeFrontParse:["{shift?} {day|weekday}","{weekday?},? {date} {months?}\\.? {year?}"]})},function(t,e,i){"use strict";i(4)("ja",{ampmFront:!0,numeralUnits:!0,allowsFullWidth:!0,timeMarkerOptional:!0,firstDayOfWeek:0,firstDayOfWeekYear:1,units:"ミリ秒,秒,分,時間,日,週間|週,ヶ月|ヵ月|月,年|年度",weekdays:"日:曜日||曜,月:曜日||曜,火:曜日||曜,水:曜日||曜,木:曜日||曜,金:曜日||曜,土:曜日||曜",numerals:"〇,一,二,三,四,五,六,七,八,九",placeholders:"十,百,千,万",timeSuffixes:",秒,分,時,日,,月,年度?",short:"{yyyy}/{MM}/{dd}",medium:"{yyyy}年{M}月{d}日",long:"{yyyy}年{M}月{d}日{time}",full:"{yyyy}年{M}月{d}日{time} {weekday}",stamp:"{yyyy}年{M}月{d}日 {H}:{mm} {dow}",time:"{tt}{h}時{mm}分",past:"{num}{unit}{sign}",future:"{num}{unit}{sign}",duration:"{num}{unit}",ampm:"午前,午後",modifiers:[{name:"day",src:"一昨々日|前々々日",value:-3},{name:"day",src:"一昨日|おととい|前々日",value:-2},{name:"day",src:"昨日|前日",value:-1},{name:"day",src:"今日|当日|本日",value:0},{name:"day",src:"明日|翌日|次日",value:1},{name:"day",src:"明後日|翌々日",value:2},{name:"day",src:"明々後日|翌々々日",value:3},{name:"sign",src:"前",value:-1},{name:"sign",src:"後",value:1},{name:"edge",src:"始|初日|頭",value:-2},{name:"edge",src:"末|尻",value:2},{name:"edge",src:"末日",value:1},{name:"shift",src:"一昨々|前々々",value:-3},{name:"shift",src:"一昨|前々|先々",value:-2},{name:"shift",src:"先|昨|去|前",value:-1},{name:"shift",src:"今|本|当",value:0},{name:"shift",src:"来|明|翌|次",value:1},{name:"shift",src:"明後|翌々|次々|再来|さ来",value:2},{name:"shift",src:"明々後|翌々々",value:3}],parse:["{month}{edge}","{num}{unit}{sign}","{year?}{month}","{year}"],timeParse:["{day|weekday}","{shift}{unit:5}{weekday?}","{shift}{unit:7}{month}{edge}","{shift}{unit:7}{month?}{date?}","{shift}{unit:6}{edge?}{date?}","{year?}{month?}{date}"]})},function(t,e,i){"use strict";i(4)("ko",{ampmFront:!0,numeralUnits:!0,units:"밀리초,초,분,시간,일,주,개월|달,년|해",weekdays:"일:요일|,월:요일|,화:요일|,수:요일|,목:요일|,금:요일|,토:요일|",numerals:"영|제로,일|한,이,삼,사,오,육,칠,팔,구,십",short:"{yyyy}.{MM}.{dd}",medium:"{yyyy}년 {M}월 {d}일",long:"{yyyy}년 {M}월 {d}일 {time}",full:"{yyyy}년 {M}월 {d}일 {weekday} {time}",stamp:"{yyyy}년 {M}월 {d}일 {H}:{mm} {dow}",time:"{tt} {h}시 {mm}분",past:"{num}{unit} {sign}",future:"{num}{unit} {sign}",duration:"{num}{unit}",timeSuffixes:",초,분,시,일,,월,년",ampm:"오전,오후",modifiers:[{name:"day",src:"그저께",value:-2},{name:"day",src:"어제",value:-1},{name:"day",src:"오늘",value:0},{name:"day",src:"내일",value:1},{name:"day",src:"모레",value:2},{name:"sign",src:"전",value:-1},{name:"sign",src:"후",value:1},{name:"shift",src:"지난|작",value:-1},{name:"shift",src:"이번|올",value:0},{name:"shift",src:"다음|내",value:1}],parse:["{num}{unit} {sign}","{shift?} {unit:5-7}","{year?} {month}","{year}"],timeParse:["{day|weekday}","{shift} {unit:5?} {weekday}","{year?} {month?} {date} {weekday?}"]})},function(t,e,i){"use strict";i(4)("nl",{plural:!0,units:"milliseconde:|n,seconde:|n,minu:ut|ten,uur,dag:|en,we:ek|ken,maand:|en,jaar",months:"jan:uari|,feb:ruari|,maart|mrt,apr:il|,mei,jun:i|,jul:i|,aug:ustus|,sep:tember|,okt:ober|,nov:ember|,dec:ember|",weekdays:"zondag|zo,maandag|ma,dinsdag|di,woensdag|wo|woe,donderdag|do,vrijdag|vr|vrij,zaterdag|za",numerals:"nul,een,twee,drie,vier,vijf,zes,zeven,acht,negen,tien",short:"{dd}-{MM}-{yyyy}",medium:"{d} {month} {yyyy}",long:"{d} {Month} {yyyy} {time}",full:"{weekday} {d} {Month} {yyyy} {time}",stamp:"{dow} {d} {Mon} {yyyy} {time}",time:"{H}:{mm}",past:"{num} {unit} {sign}",future:"{num} {unit} {sign}",duration:"{num} {unit}",timeMarkers:"'s,om",modifiers:[{name:"day",src:"gisteren",value:-1},{name:"day",src:"vandaag",value:0},{name:"day",src:"morgen",value:1},{name:"day",src:"overmorgen",value:2},{name:"sign",src:"geleden",value:-1},{name:"sign",src:"vanaf nu",value:1},{name:"shift",src:"laatste|vorige|afgelopen",value:-1},{name:"shift",src:"volgend:|e",value:1}],parse:["{months} {year?}","{num} {unit} {sign}","{0?} {unit:5-7} {shift}","{0?} {shift} {unit:5-7}"],timeParse:["{shift?} {day|weekday}","{weekday?},? {date} {months?}\\.? {year?}"],timeFrontParse:["{shift?} {day|weekday}","{weekday?},? {date} {months?}\\.? {year?}"]})},function(t,e,i){"use strict";i(4)("no",{plural:!0,units:"millisekund:|er,sekund:|er,minutt:|er,tim:e|er,dag:|er,uk:e|er|en,måned:|er|en+maaned:|er|en,år:||et+aar:||et",months:"januar,februar,mars,april,mai,juni,juli,august,september,oktober,november,desember",weekdays:"søndag|sondag,mandag,tirsdag,onsdag,torsdag,fredag,lørdag|lordag",numerals:"en|et,to,tre,fire,fem,seks,sju|syv,åtte,ni,ti",tokens:"den,for",articles:"den",short:"d. {d}. {month} {yyyy}",long:"den {d}. {month} {yyyy} {H}:{mm}",full:"{Weekday} den {d}. {month} {yyyy} {H}:{mm}:{ss}",past:"{num} {unit} {sign}",future:"{sign} {num} {unit}",duration:"{num} {unit}",ampm:"am,pm",modifiers:[{name:"day",src:"forgårs|i forgårs|forgaars|i forgaars",value:-2},{name:"day",src:"i går|igår|i gaar|igaar",value:-1},{name:"day",src:"i dag|idag",value:0},{name:"day",src:"i morgen|imorgen",value:1},{name:"day",src:"overimorgen|overmorgen|over i morgen",value:2},{name:"sign",src:"siden",value:-1},{name:"sign",src:"om",value:1},{name:"shift",src:"i siste|siste",value:-1},{name:"shift",src:"denne",value:0},{name:"shift",src:"neste",value:1}],parse:["{num} {unit} {sign}","{sign} {num} {unit}","{1?} {num} {unit} {sign}","{shift} {unit:5-7}"],timeParse:["{date} {month}","{shift} {weekday}","{0?} {weekday?},? {date?} {month}\\.? {year}"]})},function(t,e,i){"use strict";i(4)("pl",{plural:!0,units:"milisekund:a|y|,sekund:a|y|,minut:a|y|,godzin:a|y|,dzień|dni|dni,tydzień|tygodnie|tygodni,miesiąc|miesiące|miesięcy,rok|lata|lat",months:"sty:cznia||czeń,lut:ego||y,mar:ca||zec,kwi:etnia||ecień,maj:a|,cze:rwca||rwiec,lip:ca||iec,sie:rpnia||rpień,wrz:eśnia||esień,paź:dziernika||dziernik,lis:topada||topad,gru:dnia||dzień",weekdays:"nie:dziela||dzielę,pon:iedziałek|,wt:orek|,śr:oda||odę,czw:artek|,piątek|pt,sobota|sb|sobotę",numerals:"zero,jeden|jedną,dwa|dwie,trzy,cztery,pięć,sześć,siedem,osiem,dziewięć,dziesięć",tokens:"w|we,roku",short:"{dd}.{MM}.{yyyy}",medium:"{d} {month} {yyyy}",long:"{d} {month} {yyyy} {time}",full:"{weekday}, {d} {month} {yyyy} {time}",stamp:"{dow} {d} {mon} {yyyy} {time}",time:"{H}:{mm}",timeMarkers:"o",ampm:"am,pm",modifiers:[{name:"day",src:"przedwczoraj",value:-2},{name:"day",src:"wczoraj",value:-1},{name:"day",src:"dzisiaj|dziś",value:0},{name:"day",src:"jutro",value:1},{name:"day",src:"pojutrze",value:2},{name:"sign",src:"temu|przed",value:-1},{name:"sign",src:"za",value:1},{name:"shift",src:"zeszły|zeszła|ostatni|ostatnia",value:-1},{name:"shift",src:"następny|następna|następnego|przyszły|przyszła|przyszłego",value:1}],relative:function(t,e,i,n){if(4===e){if(1===t&&"past"===n)return"wczoraj";if(1===t&&"future"===n)return"jutro";if(2===t&&"past"===n)return"przedwczoraj";if(2===t&&"future"===n)return"pojutrze"}var r,s=+t.toFixed(0).slice(-1),a=+t.toFixed(0).slice(-2);switch(!0){case 1===t:r=0;break;case a>=12&&a<=14:r=2;break;case s>=2&&s<=4:r=1;break;default:r=2}var o=this.units[8*r+e],u=t+" ";switch("past"!==n&&"future"!==n||1!==t||(o=o.replace(/a$/,"ę")),o=u+o,n){case"duration":return o;case"past":return o+" temu";case"future":return"za "+o}},parse:["{num} {unit} {sign}","{sign} {num} {unit}","{months} {year?}","{shift} {unit:5-7}","{0} {shift?} {weekday}"],timeFrontParse:["{day|weekday}","{date} {months} {year?} {1?}","{0?} {shift?} {weekday}"]})},function(t,e,i){"use strict";i(4)("pt",{plural:!0,units:"milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,mês|mêses|mes|meses,ano:|s",months:"jan:eiro|,fev:ereiro|,mar:ço|,abr:il|,mai:o|,jun:ho|,jul:ho|,ago:sto|,set:embro|,out:ubro|,nov:embro|,dez:embro|",weekdays:"dom:ingo|,seg:unda-feira|,ter:ça-feira|,qua:rta-feira|,qui:nta-feira|,sex:ta-feira|,sáb:ado||ado",numerals:"zero,um:|a,dois|duas,três|tres,quatro,cinco,seis,sete,oito,nove,dez",tokens:"a,de",short:"{dd}/{MM}/{yyyy}",medium:"{d} de {Month} de {yyyy}",long:"{d} de {Month} de {yyyy} {time}",full:"{Weekday}, {d} de {Month} de {yyyy} {time}",stamp:"{Dow} {d} {Mon} {yyyy} {time}",time:"{H}:{mm}",past:"{num} {unit} {sign}",future:"{sign} {num} {unit}",duration:"{num} {unit}",timeMarkers:"às",ampm:"am,pm",modifiers:[{name:"day",src:"anteontem",value:-2},{name:"day",src:"ontem",value:-1},{name:"day",src:"hoje",value:0},{name:"day",src:"amanh:ã|a",value:1},{name:"sign",src:"atrás|atras|há|ha",value:-1},{name:"sign",src:"daqui a",value:1},{name:"shift",src:"passad:o|a",value:-1},{name:"shift",src:"próximo|próxima|proximo|proxima",value:1}],parse:["{months} {1?} {year?}","{num} {unit} {sign}","{sign} {num} {unit}","{0?} {unit:5-7} {shift}","{0?} {shift} {unit:5-7}"],timeParse:["{shift?} {day|weekday}","{0?} {shift} {weekday}","{date} {1?} {months?} {1?} {year?}"],timeFrontParse:["{shift?} {day|weekday}","{date} {1?} {months?} {1?} {year?}"]})},function(t,e,i){"use strict";i(4)("ru",{firstDayOfWeekYear:1,units:"миллисекунд:а|у|ы|,секунд:а|у|ы|,минут:а|у|ы|,час:||а|ов,день|день|дня|дней,недел:я|ю|и|ь|е,месяц:||а|ев|е,год|год|года|лет|году",months:"янв:аря||.|арь,фев:раля||р.|раль,мар:та||т,апр:еля||.|ель,мая|май,июн:я||ь,июл:я||ь,авг:уста||.|уст,сен:тября||т.|тябрь,окт:ября||.|ябрь,ноя:бря||брь,дек:абря||.|абрь",weekdays:"воскресенье|вс,понедельник|пн,вторник|вт,среда|ср,четверг|чт,пятница|пт,суббота|сб",numerals:"ноль,од:ин|ну,дв:а|е,три,четыре,пять,шесть,семь,восемь,девять,десять",tokens:"в|на,г\\.?(?:ода)?",short:"{dd}.{MM}.{yyyy}",medium:"{d} {month} {yyyy} г.",long:"{d} {month} {yyyy} г., {time}",full:"{weekday}, {d} {month} {yyyy} г., {time}",stamp:"{dow} {d} {mon} {yyyy} {time}",time:"{H}:{mm}",timeMarkers:"в",ampm:" утра, вечера",modifiers:[{name:"day",src:"позавчера",value:-2},{name:"day",src:"вчера",value:-1},{name:"day",src:"сегодня",value:0},{name:"day",src:"завтра",value:1},{name:"day",src:"послезавтра",value:2},{name:"sign",src:"назад",value:-1},{name:"sign",src:"через",value:1},{name:"shift",src:"прошл:ый|ой|ом",value:-1},{name:"shift",src:"следующ:ий|ей|ем",value:1}],relative:function(t,e,i,n){var r,s,a=t.toString().slice(-1);switch(!0){case t>=11&&t<=15:s=3;break;case 1==a:s=1;break;case a>=2&&a<=4:s=2;break;default:s=3}switch(r=t+" "+this.units[8*s+e],n){case"duration":return r;case"past":return r+" назад";case"future":return"через "+r}},parse:["{num} {unit} {sign}","{sign} {num} {unit}","{months} {year?}","{0?} {shift} {unit:5-7}"],timeParse:["{day|weekday}","{0?} {shift} {weekday}","{date} {months?} {year?} {1?}"],timeFrontParse:["{0?} {shift} {weekday}","{date} {months?} {year?} {1?}"]})},function(t,e,i){"use strict";i(4)("sv",{plural:!0,units:"millisekund:|er,sekund:|er,minut:|er,timm:e|ar,dag:|ar,veck:a|or|an,månad:|er|en+manad:|er|en,år:||et+ar:||et",months:"jan:uari|,feb:ruari|,mar:s|,apr:il|,maj,jun:i|,jul:i|,aug:usti|,sep:tember|,okt:ober|,nov:ember|,dec:ember|",weekdays:"sön:dag|+son:dag|,mån:dag||dagen+man:dag||dagen,tis:dag|,ons:dag|,tor:sdag|,fre:dag|,lör:dag||dag",numerals:"noll,en|ett,två|tva,tre,fyra,fem,sex,sju,åtta|atta,nio,tio",tokens:"den,för|for",articles:"den",short:"{yyyy}-{MM}-{dd}",medium:"{d} {month} {yyyy}",long:"{d} {month} {yyyy} {time}",full:"{weekday} {d} {month} {yyyy} {time}",stamp:"{dow} {d} {mon} {yyyy} {time}",time:"{H}:{mm}",past:"{num} {unit} {sign}",future:"{sign} {num} {unit}",duration:"{num} {unit}",ampm:"am,pm",modifiers:[{name:"day",src:"förrgår|i förrgår|iförrgår|forrgar|i forrgar|iforrgar",value:-2},{name:"day",src:"går|i går|igår|gar|i gar|igar",value:-1},{name:"day",src:"dag|i dag|idag",value:0},{name:"day",src:"morgon|i morgon|imorgon",value:1},{name:"day",src:"över morgon|övermorgon|i över morgon|i övermorgon|iövermorgon|over morgon|overmorgon|i over morgon|i overmorgon|iovermorgon",value:2},{name:"sign",src:"sedan|sen",value:-1},{name:"sign",src:"om",value:1},{name:"shift",src:"i förra|förra|i forra|forra",value:-1},{name:"shift",src:"denna",value:0},{name:"shift",src:"nästa|nasta",value:1}],parse:["{months} {year?}","{num} {unit} {sign}","{sign} {num} {unit}","{1?} {num} {unit} {sign}","{shift} {unit:5-7}"],timeParse:["{day|weekday}","{shift} {weekday}","{0?} {weekday?},? {date} {months?}\\.? {year?}"],timeFrontParse:["{day|weekday}","{shift} {weekday}","{0?} {weekday?},? {date} {months?}\\.? {year?}"]})},function(t,e,i){"use strict";i(4)("zh-CN",{ampmFront:!0,numeralUnits:!0,allowsFullWidth:!0,timeMarkerOptional:!0,units:"毫秒,秒钟,分钟,小时,天,个星期|周,个月,年",weekdays:"星期日|日|周日|星期天,星期一|一|周一,星期二|二|周二,星期三|三|周三,星期四|四|周四,星期五|五|周五,星期六|六|周六",numerals:"〇,一,二,三,四,五,六,七,八,九",placeholders:"十,百,千,万",short:"{yyyy}-{MM}-{dd}",medium:"{yyyy}年{M}月{d}日",long:"{yyyy}年{M}月{d}日{time}",full:"{yyyy}年{M}月{d}日{weekday}{time}",stamp:"{yyyy}年{M}月{d}日{H}:{mm}{dow}",time:"{tt}{h}点{mm}分",past:"{num}{unit}{sign}",future:"{num}{unit}{sign}",duration:"{num}{unit}",timeSuffixes:",秒,分钟?,点|时,日|号,,月,年",ampm:"上午,下午",modifiers:[{name:"day",src:"大前天",value:-3},{name:"day",src:"前天",value:-2},{name:"day",src:"昨天",value:-1},{name:"day",src:"今天",value:0},{name:"day",src:"明天",value:1},{name:"day",src:"后天",value:2},{name:"day",src:"大后天",value:3},{name:"sign",src:"前",value:-1},{name:"sign",src:"后",value:1},{name:"shift",src:"上|去",value:-1},{name:"shift",src:"这",value:0},{name:"shift",src:"下|明",value:1}],parse:["{num}{unit}{sign}","{shift}{unit:5-7}","{year?}{month}","{year}"],timeParse:["{day|weekday}","{shift}{weekday}","{year?}{month?}{date}"]})},function(t,e,i){"use strict";i(4)("zh-TW",{ampmFront:!0,numeralUnits:!0,allowsFullWidth:!0,timeMarkerOptional:!0,units:"毫秒,秒鐘,分鐘,小時,天,個星期|週,個月,年",weekdays:"星期日|日|週日|星期天,星期一|一|週一,星期二|二|週二,星期三|三|週三,星期四|四|週四,星期五|五|週五,星期六|六|週六",numerals:"〇,一,二,三,四,五,六,七,八,九",placeholders:"十,百,千,万",short:"{yyyy}/{MM}/{dd}",medium:"{yyyy}年{M}月{d}日",long:"{yyyy}年{M}月{d}日{time}",full:"{yyyy}年{M}月{d}日{weekday}{time}",stamp:"{yyyy}年{M}月{d}日{H}:{mm}{dow}",time:"{tt}{h}點{mm}分",past:"{num}{unit}{sign}",future:"{num}{unit}{sign}",duration:"{num}{unit}",timeSuffixes:",秒,分鐘?,點|時,日|號,,月,年",ampm:"上午,下午",modifiers:[{name:"day",src:"大前天",value:-3},{name:"day",src:"前天",value:-2},{name:"day",src:"昨天",value:-1},{name:"day",src:"今天",value:0},{name:"day",src:"明天",value:1},{name:"day",src:"後天",value:2},{name:"day",src:"大後天",value:3},{name:"sign",src:"前",value:-1},{name:"sign",src:"後",value:1},{name:"shift",src:"上|去",value:-1},{name:"shift",src:"這",value:0},{name:"shift",src:"下|明",value:1}],parse:["{num}{unit}{sign}","{shift}{unit:5-7}","{year?}{month}","{year}"],timeParse:["{day|weekday}","{shift}{weekday}","{year?}{month?}{date}"]})}])});
>>>>>>> master
//# sourceMappingURL=tablefilter.js.map