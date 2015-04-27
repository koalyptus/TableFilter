
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.ColsVisibility = factory();
    }
})(this, function() {/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                //Lop off the last part of baseParts, so that . matches the
                //"directory" and not name of the baseName's module. For instance,
                //baseName of "one/two/three", maps to "one/two/three.js", but we
                //want the directory, "one/two" for this normalization.
                name = baseParts.slice(0, baseParts.length - 1).concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("../../../libs/almond/almond", function(){});

define('../../dom',["exports"], function (exports) {
    /**
     * DOM utilities
     */

    "use strict";

    var Dom = {};

    /**
     * Returns text + text of children of given node
     * @param  {NodeElement} node
     * @return {String}
     */
    Dom.getText = function (node) {
        var s = node.textContent || node.innerText || node.innerHTML.replace(/<[^<>]+>/g, "");
        s = s.replace(/^\s+/, "").replace(/\s+$/, "");
        return s;
    };

    /**
     * Creates an html element with given collection of attributes
     * @param  {String} tag a string of the html tag to create
     * @param  {Array} an undetermined number of arrays containing the with 2
     *                    items, the attribute name and its value ['id','myId']
     * @return {Object}     created element
     */
    Dom.create = function (tag) {
        if (!tag || tag === "") {
            return;
        }

        var el = document.createElement(tag),
            args = arguments;

        if (args.length > 1) {
            for (var i = 0; i < args.length; i++) {
                var argtype = typeof args[i];
                if (argtype.toLowerCase() === "object" && args[i].length === 2) {
                    el.setAttribute(args[i][0], args[i][1]);
                }
            }
        }
        return el;
    };

    /**
     * Returns a text node with given text
     * @param  {String} text
     * @return {Object}
     */
    Dom.text = function (text) {
        return document.createTextNode(text);
    };

    /**
     * Returns offset position of passed element
     * @param  {object} obj [description]
     * @return {object}     literal object with left and top values
     */
    Dom.position = function (obj) {
        var l = 0,
            t = 0;
        if (obj && obj.offsetParent) {
            do {
                l += obj.offsetLeft;
                t += obj.offsetTop;
            } while (obj == obj.offsetParent);
        }
        return { left: l, top: t };
    };

    Dom.hasClass = function (ele, cls) {
        if (!ele) {
            return false;
        }

        if (supportsClassList()) {
            return ele.classList.contains(cls);
        }
        return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    };

    Dom.addClass = function (ele, cls) {
        if (!ele) {
            return;
        }

        if (supportsClassList()) {
            ele.classList.add(cls);
            return;
        }

        if (ele.className === "") {
            ele.className = cls;
        } else if (!this.hasClass(ele, cls)) {
            ele.className += " " + cls;
        }
    };

    Dom.removeClass = function (ele, cls) {
        if (!ele) {
            return;
        }

        if (supportsClassList()) {
            ele.classList.remove(cls);
            return;
        }
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)", "g");
        ele.className = ele.className.replace(reg, "");
    };

    /**
     * Creates and returns an option element
     * @param  {String}  text  option text
     * @param  {String}  value option value
     * @param  {Boolean} isSel whether option is selected
     * @return {Object}        option element
     */
    Dom.createOpt = function (text, value, isSel) {
        var isSelected = isSel ? true : false,
            opt = isSelected ? this.create("option", ["value", value], ["selected", "true"]) : this.create("option", ["value", value]);
        opt.appendChild(this.text(text));
        return opt;
    };

    /**
     * Creates and returns a checklist item
     * @param  {Number} chkIndex  index of check item
     * @param  {String} chkValue  check item value
     * @param  {String} labelText check item label text
     * @return {Object}           li DOM element
     */
    Dom.createCheckItem = function (chkIndex, chkValue, labelText) {
        var li = this.create("li"),
            label = this.create("label", ["for", chkIndex]),
            check = this.create("input", ["id", chkIndex], ["name", chkIndex], ["type", "checkbox"], ["value", chkValue]);
        label.appendChild(check);
        label.appendChild(this.text(labelText));
        li.appendChild(label);
        li.label = label;
        li.check = check;
        return li;
    };

    Dom.id = function (id) {
        return document.getElementById(id);
    };

    Dom.tag = function (o, tagname) {
        return o.getElementsByTagName(tagname);
    };

    // HTML5 classList API
    function supportsClassList() {
        return document.documentElement.classList;
    }

    exports.Dom = Dom;
});
define('../../types',["exports"], function (exports) {
    /**
     * Types utilities
     */

    "use strict";

    var Types = {};

    var UNDEFINED = void 0;

    /**
     * Checks if var exists and is an object
     * @param  {String or Object}  v
     * @return {Boolean}
     */
    Types.isObj = function (v) {
        var isO = false;
        if (typeof v === "string") {
            if (window[v] && typeof window[v] === "object") {
                isO = true;
            }
        } else {
            if (v && typeof v === "object") {
                isO = true;
            }
        }
        return isO;
    };

    /**
     * Checks if passed parameter is a function
     * @param  {Function} fn
     * @return {Boolean}
     */
    Types.isFn = function (fn) {
        return fn && fn.constructor == Function;
    };

    /**
     * Checks if passed param is an array
     * @param  {Array}  obj
     * @return {Boolean}
     */
    Types.isArray = function (obj) {
        return obj && obj.constructor == Array;
    };

    /**
     * Determines if passed param is undefined
     * @param  {Any}  o
     * @return {Boolean}
     */
    Types.isUndef = function (o) {
        return o === UNDEFINED;
    };

    exports.Types = Types;
});

define('../../event',["exports"], function (exports) {
    /**
     * DOM event utilities
     */

    "use strict";

    var Event = {
        add: function add(obj, type, func, capture) {
            if (obj.addEventListener) {
                obj.addEventListener(type, func, capture);
            } else if (obj.attachEvent) {
                obj.attachEvent("on" + type, func);
            } else {
                obj["on" + type] = func;
            }
        },
        remove: function remove(obj, type, func, capture) {
            if (obj.detachEvent) {
                obj.detachEvent("on" + type, func);
            } else if (obj.removeEventListener) {
                obj.removeEventListener(type, func, capture);
            } else {
                obj["on" + type] = null;
            }
        },
        stop: function stop(evt) {
            if (!evt) {
                evt = window.event;
            }
            if (evt.stopPropagation) {
                evt.stopPropagation();
            } else {
                evt.cancelBubble = true;
            }
        },
        cancel: function cancel(evt) {
            if (!evt) {
                evt = window.event;
            }
            if (evt.preventDefault) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
        },
        target: function target(evt) {
            return evt && evt.target || window.event && window.event.srcElement;
        },
        keyCode: function keyCode(evt) {
            return evt.charCode ? evt.charCode : evt.keyCode ? evt.keyCode : evt.which ? evt.which : 0;
        }
    };

    exports.Event = Event;
});
define('../../string',["exports"], function (exports) {
    /**
     * String utilities
     */

    "use strict";

    var Str = {};

    Str.lower = function (text) {
        return text.toLowerCase();
    };

    Str.upper = function (text) {
        return text.toUpperCase();
    };

    Str.trim = function (text) {
        if (text.trim) {
            return text.trim();
        }
        return text.replace(/^\s*|\s*$/g, "");
    };

    Str.isEmpty = function (text) {
        return this.trim(text) === "";
    };

    Str.rgxEsc = function (text) {
        function escape(e) {
            var a = new RegExp("\\" + e, "g");
            text = text.replace(a, "\\" + e);
        }

        var chars = ["\\", "[", "^", "$", ".", "|", "?", "*", "+", "(", ")"];
        for (var e = 0; e < chars.length; e++) {
            escape(chars[e]);
        }
        return text;
    };

    Str.matchCase = function (text, mc) {
        if (!mc) {
            return this.lower(text);
        }
        return text;
    };

    exports.Str = Str;
});
define('../../helpers',["exports", "./string"], function (exports, _string) {
    /**
     * Misc helpers
     */

    "use strict";

    var Str = _string.Str;

    var Helpers = {
        isIE: function isIE() {
            return /msie|MSIE/.test(navigator.userAgent);
        },

        removeNbFormat: function removeNbFormat(data, format) {
            if (!data) {
                return;
            }
            if (!format) {
                format = "us";
            }
            var n = data;
            if (Str.lower(format) === "us") {
                n = +n.replace(/[^\d\.-]/g, "");
            } else {
                n = +n.replace(/[^\d\,-]/g, "").replace(",", ".");
            }
            return n;
        }
    };

    exports.Helpers = Helpers;
});
define('../../array',["exports", "./string"], function (exports, _string) {
    /**
     * Array utilities
     */

    "use strict";

    var Str = _string.Str;

    var Arr = {
        has: function has(arr, val, caseSensitive) {
            var sCase = caseSensitive === undefined ? false : caseSensitive;
            for (var i = 0; i < arr.length; i++) {
                if (Str.matchCase(arr[i].toString(), sCase) == val) {
                    return true;
                }
            }
            return false;
        },
        indexByValue: function indexByValue(arr, val, caseSensitive) {
            var sCase = caseSensitive === undefined ? false : caseSensitive;
            for (var i = 0; i < arr.length; i++) {
                if (Str.matchCase(arr[i].toString(), sCase) == val) {
                    return i;
                }
            }
            return -1;
        }
    };

    exports.Arr = Arr;
});
define('colsVisibility',["exports", "../../dom", "../../types", "../../event", "../../helpers", "../../array"], function (exports, _dom, _types, _event, _helpers, _array) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Types = _types.Types;
    var Event = _event.Event;
    var Helpers = _helpers.Helpers;
    var Arr = _array.Arr;

    var ColsVisibility = exports.ColsVisibility = (function () {

        /**
         * Columns Visibility extension
         * @param {Object} tf TableFilter instance
         */

        function ColsVisibility(tf) {
            var ext = arguments[1] === undefined ? {
                name: "ColsVisibility",
                description: "Columns visibility manager"
            } : arguments[1];

            _classCallCheck(this, ColsVisibility);

            // Configuration object
            var f = ext;
            var cfg = tf.config();

            this.initialized = false;
            this.extName = f.name;
            this.extDesc = f.description;

            //show/hide cols span element
            this.spanEl = null;
            //show/hide cols button element
            this.btnEl = null;
            //show/hide cols container div element
            this.contEl = null;

            //tick to hide or show column
            this.tickToHide = f.tick_to_hide === false ? false : true;
            //enables/disables cols manager generation
            this.manager = f.manager === false ? false : true;
            //only if external headers
            this.headersTbl = f.headers_table || false;
            //only if external headers
            this.headersIndex = f.headers_index || 1;
            //id of container element
            this.contElTgtId = f.container_target_id || null;
            //alternative headers text
            this.headersText = f.headers_text || null;
            //id of button container element
            this.btnTgtId = f.btn_target_id || null;
            //defines show/hide cols text
            this.btnText = f.btn_text || "Columns&#9660;";
            //defines show/hide cols button innerHtml
            this.btnHtml = f.btn_html || null;
            //defines css class for show/hide cols button
            this.btnCssClass = f.btn_css_class || "colVis";
            //defines close link text
            this.btnCloseText = f.btn_close_text || "Close";
            //defines close button innerHtml
            this.btnCloseHtml = f.btn_close_html || null;
            //defines css class for close button
            this.btnCloseCssClass = f.btn_close_css_class || this.btnCssClass;

            this.path = f.path || tf.extensionsPath + "colsVisibility/";
            this.stylesheet = f.stylesheet || "colsVisibility.css";
            //span containing show/hide cols button
            this.prfx = "colVis_";
            //defines css class span containing show/hide cols
            this.spanCssClass = f.span_css_class || "colVisSpan";
            this.prfxCont = this.prfx + "Cont_";
            //defines css class div containing show/hide cols
            this.contCssClass = f.cont_css_class || "colVisCont";
            //defines css class for cols list (ul)
            this.listCssClass = cfg.list_css_class || "cols_checklist";
            //defines css class for list item (li)
            this.listItemCssClass = cfg.checklist_item_css_class || "cols_checklist_item";
            //defines css class for selected list item (li)
            this.listSlcItemCssClass = cfg.checklist_selected_item_css_class || "cols_checklist_slc_item";
            //text preceding columns list
            this.text = f.text || (this.tickToHide ? "Hide: " : "Show: ");
            this.atStart = f.at_start || null;
            this.enableHover = Boolean(f.enable_hover);
            //enables select all option
            this.enableTickAll = Boolean(f.enable_tick_all);
            //text preceding columns list
            this.tickAllText = f.tick_all_text || "Select all:";

            //array containing hidden columns indexes
            this.hiddenCols = [];
            this.tblHasColTag = Dom.tag(tf.tbl, "col").length > 0;

            //callback invoked just after cols manager is loaded
            this.onLoaded = Types.isFn(f.on_loaded) ? f.on_loaded : null;
            //calls function before cols manager is opened
            this.onBeforeOpen = Types.isFn(f.on_before_open) ? f.on_before_open : null;
            //calls function after cols manager is opened
            this.onAfterOpen = Types.isFn(f.on_after_open) ? f.on_after_open : null;
            //calls function before cols manager is closed
            this.onBeforeClose = Types.isFn(f.on_before_close) ? f.on_before_close : null;
            //calls function after cols manager is closed
            this.onAfterClose = Types.isFn(f.on_after_close) ? f.on_after_close : null;

            //calls function before col is hidden
            this.onBeforeColHidden = Types.isFn(f.on_before_col_hidden) ? f.on_before_col_hidden : null;
            //calls function after col is hidden
            this.onAfterColHidden = Types.isFn(f.on_after_col_hidden) ? f.on_after_col_hidden : null;
            //calls function before col is displayed
            this.onBeforeColDisplayed = Types.isFn(f.on_before_col_displayed) ? f.on_before_col_displayed : null;
            //calls function after col is displayed
            this.onAfterColDisplayed = Types.isFn(f.on_after_col_displayed) ? f.on_after_col_displayed : null;

            //Grid layout compatibility
            if (tf.gridLayout) {
                this.headersTbl = tf.Cpt.gridLayout.headTbl; //headers table
                this.headersIndex = 0; //headers index
                this.onAfterColDisplayed = function () {};
                this.onAfterColHidden = function () {};
            }

            //Loads extension stylesheet
            tf.includeFile(f.name + "Style", this.path + this.stylesheet, null, "link");

            this.tf = tf;

            this.init();
        }

        _createClass(ColsVisibility, {
            toggle: {
                value: function toggle(evt) {
                    var tf = this.tf;
                    var contDisplay = this.contEl.style.display;
                    var onBeforeOpen = this.onBeforeOpen;
                    var onBeforeClose = this.onBeforeClose;
                    var onAfterOpen = this.onAfterOpen;
                    var onAfterClose = this.onAfterClose;

                    if (onBeforeOpen && contDisplay !== "inline") {
                        onBeforeOpen.call(null, this);
                    }
                    if (onBeforeClose && contDisplay === "inline") {
                        onBeforeClose.call(null, this);
                    }

                    this.contEl.style.display = contDisplay === "inline" ? "none" : "inline";

                    if (onAfterOpen && contDisplay !== "inline") {
                        onAfterOpen.call(null, this);
                    }
                    if (onAfterClose && contDisplay === "inline") {
                        onAfterClose.call(null, this);
                    }
                }
            },
            checkItem: {
                value: function checkItem(lbl) {
                    var li = lbl.parentNode;
                    if (!li || !lbl) {
                        return;
                    }
                    var isChecked = lbl.firstChild.checked;
                    var colIndex = lbl.firstChild.getAttribute("id").split("_")[1];
                    colIndex = parseInt(colIndex, 10);
                    if (isChecked) {
                        Dom.addClass(li, this.listSlcItemCssClass);
                    } else {
                        Dom.removeClass(li, this.listSlcItemCssClass);
                    }

                    var hide = false;
                    if (this.tickToHide && isChecked || !this.tickToHide && !isChecked) {
                        hide = true;
                    }
                    this.setHidden(colIndex, hide);
                }
            },
            init: {
                value: function init() {
                    if (!this.manager) {
                        return;
                    }
                    this.buildBtn();
                    this.buildManager();

                    this.initialized = true;
                }
            },
            buildBtn: {

                /**
                 * Build main button UI
                 */

                value: function buildBtn() {
                    var _this = this;

                    if (this.btnEl) {
                        return;
                    }
                    var tf = this.tf;
                    var span = Dom.create("span", ["id", this.prfx + tf.id]);
                    span.className = this.spanCssClass;

                    //Container element (rdiv or custom element)
                    if (!this.btnTgtId) {
                        tf.setToolbar();
                    }
                    var targetEl = !this.btnTgtId ? tf.rDiv : Dom.id(this.btnTgtId);

                    if (!this.btnTgtId) {
                        var firstChild = targetEl.firstChild;
                        firstChild.parentNode.insertBefore(span, firstChild);
                    } else {
                        targetEl.appendChild(span);
                    }

                    if (!this.btnHtml) {
                        var btn = Dom.create("a", ["href", "javascript:;"]);
                        btn.className = this.btnCssClass;
                        btn.title = this.extDesc;

                        btn.innerHTML = this.btnText;
                        span.appendChild(btn);
                        if (!this.enableHover) {
                            Event.add(btn, "click", function (evt) {
                                _this.toggle(evt);
                            });
                        } else {
                            Event.add(btn, "mouseover", function (evt) {
                                _this.toggle(evt);
                            });
                        }
                    } else {
                        //Custom html
                        span.innerHTML = this.btnHtml;
                        var colVisEl = span.firstChild;
                        if (!this.enableHover) {
                            Event.add(colVisEl, "click", function (evt) {
                                _this.toggle(evt);
                            });
                        } else {
                            Event.add(colVisEl, "mouseover", function (evt) {
                                _this.toggle(evt);
                            });
                        }
                    }

                    this.spanEl = span;
                    this.btnEl = this.spanEl.firstChild;

                    if (this.onLoaded) {
                        this.onLoaded.call(null, this);
                    }
                }
            },
            buildManager: {

                /**
                 * Build columns manager UI
                 */

                value: function buildManager() {
                    var _this = this;

                    var tf = this.tf;

                    var container = !this.contElTgtId ? Dom.create("div", ["id", this.prfxCont + tf.id]) : Dom.id(this.contElTgtId);
                    container.className = this.contCssClass;

                    //Extension description
                    var extNameLabel = Dom.create("p");
                    extNameLabel.innerHTML = this.text;
                    container.appendChild(extNameLabel);

                    //Headers list
                    var ul = Dom.create("ul", ["id", "ul" + this.extName + "_" + tf.id]);
                    ul.className = this.listCssClass;

                    var tbl = this.headersTbl ? this.headersTbl : tf.tbl;
                    var headerIndex = this.headersTbl ? this.headersIndex : tf.getHeadersRowIndex();
                    var headerRow = tbl.rows[headerIndex];

                    //Tick all option
                    if (this.enableTickAll) {
                        var li = Dom.createCheckItem("col__" + tf.id, this.tickAllText, this.tickAllText);
                        Dom.addClass(li, this.listItemCssClass);
                        ul.appendChild(li);
                        li.check.checked = !this.tickToHide;

                        Event.add(li.check, "click", function (evt) {
                            for (var h = 0; h < headerRow.cells.length; h++) {
                                var itm = Dom.id("col_" + h + "_" + tf.id);
                                if (itm && li.check.checked !== itm.checked) {
                                    itm.click();
                                    itm.checked = li.check.checked;
                                }
                            }
                        });
                    }

                    for (var i = 0; i < headerRow.cells.length; i++) {
                        var cell = headerRow.cells[i];
                        var cellText = this.headersText && this.headersText[i] ? this.headersText[i] : this._getHeaderText(cell);
                        var liElm = Dom.createCheckItem("col_" + i + "_" + tf.id, cellText, cellText);
                        Dom.addClass(liElm, this.listItemCssClass);
                        if (!this.tickToHide) {
                            Dom.addClass(liElm, this.listSlcItemCssClass);
                        }
                        ul.appendChild(liElm);
                        if (!this.tickToHide) {
                            liElm.check.checked = true;
                        }

                        Event.add(liElm.check, "click", function (evt) {
                            var elm = Event.target(evt);
                            var lbl = elm.parentNode;
                            _this.checkItem(lbl);
                        });
                    }

                    //separator
                    var p = Dom.create("p", ["align", "center"]);
                    var btn;
                    //Close link
                    if (!this.btnCloseHtml) {
                        btn = Dom.create("a", ["href", "javascript:;"]);
                        btn.className = this.btnCloseCssClass;
                        btn.innerHTML = this.btnCloseText;
                        Event.add(btn, "click", function (evt) {
                            _this.toggle(evt);
                        });
                        p.appendChild(btn);
                    } else {
                        p.innerHTML = this.btnCloseHtml;
                        btn = p.firstChild;
                        Event.add(btn, "click", function (evt) {
                            _this.toggle(evt);
                        });
                    }

                    container.appendChild(ul);
                    container.appendChild(p);

                    this.btnEl.parentNode.insertBefore(container, this.btnEl);
                    this.contEl = container;

                    if (this.atStart) {
                        var a = this.atStart;
                        for (var k = 0; k < a.length; k++) {
                            var itm = Dom.id("col_" + a[k] + "_" + tf.id);
                            if (itm) {
                                itm.click();
                            }
                        }
                    }
                }
            },
            setHidden: {

                /**
                 * Hide or show specified columns
                 * @param {Numner} colIndex Column index
                 * @param {Boolean} hide    hide column if true or show if false
                 */

                value: function setHidden(colIndex, hide) {
                    var tf = this.tf;
                    var tbl = tf.tbl;
                    var col = Dom.tag(tbl, "col")[colIndex];

                    if (this.onBeforeColHidden && hide) {
                        this.onBeforeColHidden.call(null, this, colIndex);
                    }
                    if (this.onBeforeColDisplayed && !hide) {
                        this.onBeforeColDisplayed.call(null, this, colIndex);
                    }

                    this._hideCells(tbl, colIndex, hide);
                    if (this.headersTbl) {
                        this._hideCells(this.headersTbl, colIndex, hide);
                    }

                    var hiddenCols = this.hiddenCols;
                    if (hide) {
                        if (hiddenCols.indexOf(colIndex) === -1) {
                            this.hiddenCols.push(colIndex);
                        }
                    } else {
                        var itemIndex = Arr.indexByValue(hiddenCols, colIndex, true);
                        if (hiddenCols.indexOf(colIndex) !== -1) {
                            this.hiddenCols.splice(itemIndex, 1);
                        }
                    }

                    var gridLayout;
                    var headTbl;
                    var gridColElms;
                    if (this.onAfterColHidden && hide) {
                        //This event is fired just after a column is displayed for
                        //grid_layout compatibility
                        if (tf.gridLayout) {
                            gridLayout = tf.Cpt.gridLayout;
                            headTbl = gridLayout.headTbl;
                            gridColElms = gridLayout.gridColElms;
                            if (Helpers.isIE()) {
                                tbl.style.width = headTbl.clientWidth + "px";
                            } else {
                                var ths = headTbl.rows[this.headersIndex].cells;
                                var hiddenWidth = 0;
                                for (var i = 0; i < tf.nbCells; i++) {
                                    if (ths[i].style.display === "none") {
                                        var w = parseInt(ths[i].style.width, 10);
                                        ths[i].style.width = 0;
                                        hiddenWidth += w;
                                    }
                                }
                                var headTblW = parseInt(headTbl.style.width, 10);

                                headTbl.style.width = headTblW - hiddenWidth + "px";
                                tbl.style.width = headTbl.style.width;
                                gridColElms[colIndex].style.display = "none";
                            }
                        }
                        this.onAfterColHidden.call(null, this, colIndex);
                    }

                    if (this.onAfterColDisplayed && !hide) {
                        //This event is fired just after a column is displayed for
                        //grid_layout compatibility
                        if (tf.gridLayout) {
                            gridLayout = tf.Cpt.gridLayout;
                            headTbl = gridLayout.headTbl;
                            gridColElms = gridLayout.gridColElms;
                            gridColElms[colIndex].style.display = "";
                            var width = parseInt(gridColElms[colIndex].style.width, 10);
                            var header = tf.getHeaderElement(colIndex);
                            header.style.width = width + "px";
                            headTbl.style.width = parseInt(headTbl.style.width, 10) + width + "px";
                            tf.tbl.style.width = headTbl.style.width;
                        }
                        this.onAfterColDisplayed.call(null, this, colIndex);
                    }
                }
            },
            showCol: {

                /**
                 * Show specified column
                 * @param  {Number} colIndex Column index
                 */

                value: function showCol(colIndex) {
                    if (colIndex === undefined || !this.isColHidden(colIndex)) {
                        return;
                    }
                    if (this.manager && this.contEl) {
                        var itm = Dom.id("col_" + colIndex + "_" + this.tf.id);
                        if (itm) {
                            itm.click();
                        }
                    } else {
                        this.setHidden(colIndex, false);
                    }
                }
            },
            hideCol: {

                /**
                 * Hide specified column
                 * @param  {Number} colIndex Column index
                 */

                value: function hideCol(colIndex) {
                    if (colIndex === undefined || this.isColHidden(colIndex)) {
                        return;
                    }
                    if (this.manager && this.contEl) {
                        var itm = Dom.id("col_" + colIndex + "_" + this.tf.id);
                        if (itm) {
                            itm.click();
                        }
                    } else {
                        this.setHidden(colIndex, true);
                    }
                }
            },
            isColHidden: {

                /**
                 * Determine if specified column is hidden
                 * @param  {Number} colIndex Column index
                 */

                value: function isColHidden(colIndex) {
                    if (this.hiddenCols.indexOf(colIndex) !== -1) {
                        return true;
                    }
                    return false;
                }
            },
            toggleCol: {

                /**
                 * Toggle visibility of specified column
                 * @param  {Number} colIndex Column index
                 */

                value: function toggleCol(colIndex) {
                    if (colIndex === undefined || this.isColHidden(colIndex)) {
                        this.showCol(colIndex);
                    } else {
                        this.hideCol(colIndex);
                    }
                }
            },
            getHiddenCols: {

                /**
                 * Returns the indexes of the columns currently hidden
                 * @return {Array} column indexes
                 */

                value: function getHiddenCols() {
                    return this.hiddenCols;
                }
            },
            destroy: {

                /**
                 * Remove the columns manager
                 */

                value: function destroy() {
                    if (!this.btnEl || !this.contEl) {
                        return;
                    }
                    if (Dom.id(this.contElTgtId)) {
                        Dom.id(this.contElTgtId).innerHTML = "";
                    } else {
                        this.contEl.innerHTML = "";
                        this.contEl.parentNode.removeChild(this.contEl);
                        this.contEl = null;
                    }
                    this.btnEl.innerHTML = "";
                    this.btnEl.parentNode.removeChild(this.btnEl);
                    this.btnEl = null;
                    this.initialized = false;
                }
            },
            _getHeaderText: {
                value: function _getHeaderText(cell) {
                    if (!cell.hasChildNodes) {
                        return "";
                    }

                    for (var i = 0; i < cell.childNodes.length; i++) {
                        var n = cell.childNodes[i];
                        if (n.nodeType === 3) {
                            return n.nodeValue;
                        } else if (n.nodeType === 1) {
                            if (n.id && n.id.indexOf("popUp") !== -1) {
                                continue;
                            } else {
                                return Dom.getText(n);
                            }
                        }
                        continue;
                    }
                    return "";
                }
            },
            _hideCells: {
                value: function _hideCells(tbl, colIndex, hide) {
                    for (var i = 0; i < tbl.rows.length; i++) {
                        var row = tbl.rows[i];
                        var cell = row.cells[colIndex];
                        if (cell) {
                            cell.style.display = hide ? "none" : "";
                        }
                    }
                }
            }
        });

        return ColsVisibility;
    })();
});

    return require('ColsVisibility');

});