
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.TableFilter = factory();
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

define("../libs/almond/almond", function(){});

define('event',["exports"], function (exports) {
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
//# sourceMappingURL=event.js.map;
define('dom',["exports"], function (exports) {
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
//# sourceMappingURL=dom.js.map;
define('string',["exports"], function (exports) {
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
//# sourceMappingURL=string.js.map;
define('cookie',["exports"], function (exports) {
    /**
     * Cookie utilities
     */

    "use strict";

    var Cookie = {};

    Cookie.write = function (name, value, hours) {
        var expire = "";
        if (hours) {
            expire = new Date(new Date().getTime() + hours * 3600000);
            expire = "; expires=" + expire.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expire;
    };

    Cookie.read = function (name) {
        var cookieValue = "",
            search = name + "=";
        if (document.cookie.length > 0) {
            var cookie = document.cookie,
                offset = cookie.indexOf(search);
            if (offset !== -1) {
                offset += search.length;
                var end = cookie.indexOf(";", offset);
                if (end === -1) {
                    end = cookie.length;
                }
                cookieValue = unescape(cookie.substring(offset, end));
            }
        }
        return cookieValue;
    };

    Cookie.remove = function (name) {
        this.write(name, "", -1);
    };

    Cookie.valueToArray = function (name, separator) {
        if (!separator) {
            separator = ",";
        }
        //reads the cookie
        var val = this.read(name);
        //creates an array with filters' values
        var arr = val.split(separator);
        return arr;
    };

    Cookie.getValueByIndex = function (name, index, separator) {
        if (!separator) {
            separator = ",";
        }
        //reads the cookie
        var val = this.valueToArray(name, separator);
        return val[index];
    };

    exports.Cookie = Cookie;
});
//# sourceMappingURL=cookie.js.map;
define('types',["exports"], function (exports) {
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
//# sourceMappingURL=types.js.map;
define('array',["exports", "./string"], function (exports, _string) {
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
//# sourceMappingURL=array.js.map;
define('helpers',["exports", "./string"], function (exports, _string) {
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
//# sourceMappingURL=helpers.js.map;
define('date',["exports"], function (exports) {
    /**
     * Date utilities
     */

    "use strict";

    var DateHelper = {
        isValid: function isValid(dateStr, format) {
            if (!format) {
                format = "DMY";
            }
            format = format.toUpperCase();
            if (format.length != 3) {
                if (format === "DDMMMYYYY") {
                    var d = this.format(dateStr, format);
                    dateStr = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                    format = "DMY";
                }
            }
            if (format.indexOf("M") === -1 || format.indexOf("D") === -1 || format.indexOf("Y") === -1) {
                format = "DMY";
            }
            var reg1, reg2;
            // If the year is first
            if (format.substring(0, 1) == "Y") {
                reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
                reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
            } else if (format.substring(1, 2) == "Y") {
                // If the year is second
                reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/;
                reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/;
            } else {
                // The year must be third
                reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/;
                reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;
            }
            // If it doesn't conform to the right format (with either a 2 digit year or
            // 4 digit year), fail
            if (reg1.test(dateStr) === false && reg2.test(dateStr) === false) {
                return false;
            }
            // Split into 3 parts based on what the divider was
            var parts = dateStr.split(RegExp.$1);
            var mm, dd, yy;
            // Check to see if the 3 parts end up making a valid date
            if (format.substring(0, 1) === "M") {
                mm = parts[0];
            } else if (format.substring(1, 2) === "M") {
                mm = parts[1];
            } else {
                mm = parts[2];
            }
            if (format.substring(0, 1) === "D") {
                dd = parts[0];
            } else if (format.substring(1, 2) === "D") {
                dd = parts[1];
            } else {
                dd = parts[2];
            }
            if (format.substring(0, 1) === "Y") {
                yy = parts[0];
            } else if (format.substring(1, 2) === "Y") {
                yy = parts[1];
            } else {
                yy = parts[2];
            }
            if (parseInt(yy, 10) <= 50) {
                yy = (parseInt(yy, 10) + 2000).toString();
            }
            if (parseInt(yy, 10) <= 99) {
                yy = (parseInt(yy, 10) + 1900).toString();
            }
            var dt = new Date(parseInt(yy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10), 0, 0, 0, 0);
            if (parseInt(dd, 10) != dt.getDate()) {
                return false;
            }
            if (parseInt(mm, 10) - 1 != dt.getMonth()) {
                return false;
            }
            return true;
        },
        format: (function (_format) {
            var _formatWrapper = function format(_x, _x2) {
                return _format.apply(this, arguments);
            };

            _formatWrapper.toString = function () {
                return _format.toString();
            };

            return _formatWrapper;
        })(function (dateStr, format) {
            if (!format) {
                format = "DMY";
            }
            if (!dateStr || dateStr === "") {
                return new Date(1001, 0, 1);
            }
            var oDate, parts;

            function y2kDate(yr) {
                if (yr === undefined) {
                    return 0;
                }
                if (yr.length > 2) {
                    return yr;
                }
                var y;
                //>50 belong to 1900
                if (yr <= 99 && yr > 50) {
                    y = "19" + yr;
                }
                //<50 belong to 2000
                if (yr < 50 || yr === "00") {
                    y = "20" + yr;
                }
                return y;
            }

            function mmm2mm(mmm) {
                if (mmm === undefined) {
                    return 0;
                }
                var mondigit;
                var MONTH_NAMES = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                for (var m_i = 0; m_i < MONTH_NAMES.length; m_i++) {
                    var month_name = MONTH_NAMES[m_i];
                    if (mmm.toLowerCase() === month_name) {
                        mondigit = m_i + 1;
                        break;
                    }
                }
                if (mondigit > 11 || mondigit < 23) {
                    mondigit = mondigit - 12;
                }
                if (mondigit < 1 || mondigit > 12) {
                    return 0;
                }
                return mondigit;
            }

            switch (format.toUpperCase()) {
                case "DDMMMYYYY":
                    parts = dateStr.replace(/[- \/.]/g, " ").split(" ");
                    oDate = new Date(y2kDate(parts[2]), mmm2mm(parts[1]) - 1, parts[0]);
                    break;
                case "DMY":
                    parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/, "$1 $3 $5").split(" ");
                    oDate = new Date(y2kDate(parts[2]), parts[1] - 1, parts[0]);
                    break;
                case "MDY":
                    parts = dateStr.replace(/^(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])([- \/.])((\d\d)?\d\d)$/, "$1 $3 $5").split(" ");
                    oDate = new Date(y2kDate(parts[2]), parts[0] - 1, parts[1]);
                    break;
                case "YMD":
                    parts = dateStr.replace(/^((\d\d)?\d\d)([- \/.])(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])$/, "$1 $4 $6").split(" ");
                    oDate = new Date(y2kDate(parts[0]), parts[1] - 1, parts[2]);
                    break;
                default:
                    //in case format is not correct
                    parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/, "$1 $3 $5").split(" ");
                    oDate = new Date(y2kDate(parts[2]), parts[1] - 1, parts[0]);
                    break;
            }
            return oDate;
        })
    };

    exports.DateHelper = DateHelper;
});
//# sourceMappingURL=date.js.map;
define('sort',["exports", "string"], function (exports, _string) {
  /**
   * Sort helpers
   */

  "use strict";

  var Str = _string.Str;

  var Sort = {
    ignoreCase: function ignoreCase(a, b) {
      var x = Str.lower(a);
      var y = Str.lower(b);
      return x < y ? -1 : x > y ? 1 : 0;
    }
  };

  exports.Sort = Sort;
});
//# sourceMappingURL=sort.js.map;
define('modules/store',["exports", "../cookie"], function (exports, _cookie) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Cookie = _cookie.Cookie;

    var Store = exports.Store = (function () {

        /**
         * Store, persistence manager
         * @param {Object} tf TableFilter instance
         */

        function Store(tf) {
            _classCallCheck(this, Store);

            var f = tf.config();

            this.duration = !isNaN(f.set_cookie_duration) ? parseInt(f.set_cookie_duration, 10) : 100000;

            this.tf = tf;
        }

        _createClass(Store, {
            saveFilterValues: {

                /**
                 * Store filters' values in cookie
                 * @param {String} cookie name
                 */

                value: function saveFilterValues(name) {
                    var tf = this.tf;
                    var fltValues = [];
                    //store filters' values
                    for (var i = 0; i < tf.fltIds.length; i++) {
                        var value = tf.getFilterValue(i);
                        if (value === "") {
                            value = " ";
                        }
                        fltValues.push(value);
                    }
                    //adds array size
                    fltValues.push(tf.fltIds.length);

                    //writes cookie
                    Cookie.write(name, fltValues.join(tf.separator), this.duration);
                }
            },
            getFilterValues: {

                /**
                 * Retrieve filters' values from cookie
                 * @param {String} cookie name
                 * @return {Array}
                 */

                value: function getFilterValues(name) {
                    var flts = Cookie.read(name);
                    var rgx = new RegExp(this.tf.separator, "g");
                    // filters' values array
                    return flts.split(rgx);
                }
            },
            savePageNb: {

                /**
                 * Store page number in cookie
                 * @param {String} cookie name
                 */

                value: function savePageNb(name) {
                    Cookie.write(name, this.tf.Cpt.paging.currentPageNb, this.duration);
                }
            },
            getPageNb: {

                /**
                 * Retrieve page number from cookie
                 * @param {String} cookie name
                 * @return {String}
                 */

                value: function getPageNb(name) {
                    return Cookie.read(name);
                }
            },
            savePageLength: {

                /**
                 * Store page length in cookie
                 * @param {String} cookie name
                 */

                value: function savePageLength(name) {
                    Cookie.write(name, this.tf.Cpt.paging.resultsPerPageSlc.selectedIndex, this.duration);
                }
            },
            getPageLength: {

                /**
                 * Retrieve page length from cookie
                 * @param {String} cookie name
                 * @return {String}
                 */

                value: function getPageLength(name) {
                    return Cookie.read(name);
                }
            }
        });

        return Store;
    })();
});
//# sourceMappingURL=store.js.map;
define('modules/gridLayout',["exports", "../dom", "../types", "../helpers", "../event"], function (exports, _dom, _types, _helpers, _event) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Types = _types.Types;
    var Helpers = _helpers.Helpers;
    var Event = _event.Event;

    var GridLayout = exports.GridLayout = (function () {

        /**
         * Grid layout, table with fixed headers
         * @param {Object} tf TableFilter instance
         */

        function GridLayout(tf) {
            _classCallCheck(this, GridLayout);

            var f = tf.config();

            //defines grid width
            this.gridWidth = f.grid_width || null;
            //defines grid height
            this.gridHeight = f.grid_height || null;
            //defines css class for main container
            this.gridMainContCssClass = f.grid_cont_css_class || "grd_Cont";
            //defines css class for div containing table
            this.gridContCssClass = f.grid_tbl_cont_css_class || "grd_tblCont";
            //defines css class for div containing headers' table
            this.gridHeadContCssClass = f.grid_tblHead_cont_css_class || "grd_headTblCont";
            //defines css class for div containing rows counter, paging etc.
            this.gridInfDivCssClass = f.grid_inf_grid_css_class || "grd_inf";
            //defines which row contains column headers
            this.gridHeadRowIndex = f.grid_headers_row_index || 0;
            //array of headers row indexes to be placed in header table
            this.gridHeadRows = f.grid_headers_rows || [0];
            //generate filters in table headers
            this.gridEnableFilters = f.grid_enable_default_filters !== undefined ? f.grid_enable_default_filters : true;
            //default col width
            this.gridDefaultColWidth = f.grid_default_col_width || "100px";
            //enables/disables columns resizer
            this.gridEnableColResizer = f.grid_enable_cols_resizer !== undefined ? f.grid_enable_cols_resizer : false;
            //defines col resizer script path
            this.gridColResizerPath = f.grid_cont_col_resizer_path || this.basePath + "TFExt_ColsResizer/TFExt_ColsResizer.js";

            this.gridColElms = [];

            //div containing grid elements if grid_layout true
            this.prfxMainTblCont = "gridCont_";
            //div containing table if grid_layout true
            this.prfxTblCont = "tblCont_";
            //div containing headers table if grid_layout true
            this.prfxHeadTblCont = "tblHeadCont_";
            //headers' table if grid_layout true
            this.prfxHeadTbl = "tblHead_";
            //id of td containing the filter if grid_layout true
            this.prfxGridFltTd = "_td_";
            //id of th containing column header if grid_layout true
            this.prfxGridTh = "tblHeadTh_";

            this.tf = tf;
        }

        _createClass(GridLayout, {
            init: {

                /**
                 * Generates a grid with fixed headers
                 */

                value: function init() {
                    var _this = this;

                    var tf = this.tf;
                    var f = tf.config();
                    var tbl = tf.tbl;

                    if (!tf.gridLayout) {
                        return;
                    }

                    tf.isExternalFlt = true;

                    // default width of 100px if column widths not set
                    if (!tf.hasColWidth) {
                        tf.colWidth = [];
                        for (var k = 0; k < tf.nbCells; k++) {
                            var colW,
                                cell = tbl.rows[this.gridHeadRowIndex].cells[k];
                            if (cell.width !== "") {
                                colW = cell.width;
                            } else if (cell.style.width !== "") {
                                colW = parseInt(cell.style.width, 10);
                            } else {
                                colW = this.gridDefaultColWidth;
                            }
                            tf.colWidth[k] = colW;
                        }
                        tf.hasColWidth = true;
                    }
                    tf.setColWidths(this.gridHeadRowIndex);

                    var tblW; //initial table width
                    if (tbl.width !== "") {
                        tblW = tbl.width;
                    } else if (tbl.style.width !== "") {
                        tblW = parseInt(tbl.style.width, 10);
                    } else {
                        tblW = tbl.clientWidth;
                    }

                    //Main container: it will contain all the elements
                    this.tblMainCont = Dom.create("div", ["id", this.prfxMainTblCont + tf.id]);
                    this.tblMainCont.className = this.gridMainContCssClass;
                    if (this.gridWidth) {
                        this.tblMainCont.style.width = this.gridWidth;
                    }
                    tbl.parentNode.insertBefore(this.tblMainCont, tbl);

                    //Table container: div wrapping content table
                    this.tblCont = Dom.create("div", ["id", this.prfxTblCont + tf.id]);
                    this.tblCont.className = this.gridContCssClass;
                    if (this.gridWidth) {
                        this.tblCont.style.width = this.gridWidth;
                    }
                    if (this.gridHeight) {
                        this.tblCont.style.height = this.gridHeight;
                    }
                    tbl.parentNode.insertBefore(this.tblCont, tbl);
                    var t = tbl.parentNode.removeChild(tbl);
                    this.tblCont.appendChild(t);

                    //In case table width is expressed in %
                    if (tbl.style.width === "") {
                        tbl.style.width = (tf._containsStr("%", tblW) ? tbl.clientWidth : tblW) + "px";
                    }

                    var d = this.tblCont.parentNode.removeChild(this.tblCont);
                    this.tblMainCont.appendChild(d);

                    //Headers table container: div wrapping headers table
                    this.headTblCont = Dom.create("div", ["id", this.prfxHeadTblCont + tf.id]);
                    this.headTblCont.className = this.gridHeadContCssClass;
                    if (this.gridWidth) {
                        this.headTblCont.style.width = this.gridWidth;
                    }

                    //Headers table
                    this.headTbl = Dom.create("table", ["id", this.prfxHeadTbl + tf.id]);
                    var tH = Dom.create("tHead"); //IE<7 needs it

                    //1st row should be headers row, ids are added if not set
                    //Those ids are used by the sort feature
                    var hRow = tbl.rows[this.gridHeadRowIndex];
                    var sortTriggers = [];
                    for (var n = 0; n < tf.nbCells; n++) {
                        var c = hRow.cells[n];
                        var thId = c.getAttribute("id");
                        if (!thId || thId === "") {
                            thId = this.prfxGridTh + n + "_" + tf.id;
                            c.setAttribute("id", thId);
                        }
                        sortTriggers.push(thId);
                    }

                    //Filters row is created
                    var filtersRow = Dom.create("tr");
                    if (this.gridEnableFilters && tf.fltGrid) {
                        tf.externalFltTgtIds = [];
                        for (var j = 0; j < tf.nbCells; j++) {
                            var fltTdId = tf.prfxFlt + j + this.prfxGridFltTd + tf.id;
                            var cl = Dom.create(tf.fltCellTag, ["id", fltTdId]);
                            filtersRow.appendChild(cl);
                            tf.externalFltTgtIds[j] = fltTdId;
                        }
                    }
                    //Headers row are moved from content table to headers table
                    for (var i = 0; i < this.gridHeadRows.length; i++) {
                        var headRow = tbl.rows[this.gridHeadRows[0]];
                        tH.appendChild(headRow);
                    }
                    this.headTbl.appendChild(tH);
                    if (tf.filtersRowIndex === 0) {
                        tH.insertBefore(filtersRow, hRow);
                    } else {
                        tH.appendChild(filtersRow);
                    }

                    this.headTblCont.appendChild(this.headTbl);
                    this.tblCont.parentNode.insertBefore(this.headTblCont, this.tblCont);

                    //THead needs to be removed in content table for sort feature
                    var thead = Dom.tag(tbl, "thead");
                    if (thead.length > 0) {
                        tbl.removeChild(thead[0]);
                    }

                    //Headers table style
                    this.headTbl.style.tableLayout = "fixed";
                    tbl.style.tableLayout = "fixed";
                    this.headTbl.cellPadding = tbl.cellPadding;
                    this.headTbl.cellSpacing = tbl.cellSpacing;
                    // this.headTbl.style.width = tbl.style.width;

                    //content table without headers needs col widths to be reset
                    tf.setColWidths();

                    //Headers container width
                    this.headTblCont.style.width = this.tblCont.clientWidth + "px";

                    tbl.style.width = "";
                    //
                    this.headTbl.style.width = tbl.clientWidth + "px";
                    //

                    //scroll synchronisation
                    Event.add(this.tblCont, "scroll", function (evt) {
                        var elm = Event.target(evt);
                        var scrollLeft = elm.scrollLeft;
                        _this.headTblCont.scrollLeft = scrollLeft;
                        //New pointerX calc taking into account scrollLeft
                        // if(!o.isPointerXOverwritten){
                        //     try{
                        //         o.Evt.pointerX = function(evt){
                        //             var e = evt || global.event;
                        //             var bdScrollLeft = tf_StandardBody().scrollLeft +
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

                    //Sort is enabled if not specified in config object
                    if (f.sort !== false) {
                        tf.sort = true;
                        tf.sortConfig.asyncSort = true;
                        tf.sortConfig.triggerIds = sortTriggers;
                    }

                    if (this.gridEnableColResizer) {
                        if (!tf.hasExtensions) {
                            tf.extensions = {
                                name: ["ColumnsResizer_" + tf.id],
                                src: [this.gridColResizerPath],
                                description: ["Columns Resizing"],
                                initialize: [function (o) {
                                    o.SetColsResizer("ColumnsResizer_" + o.id);
                                }]
                            };
                            tf.hasExtensions = true;
                        } else {
                            if (!tf._containsStr("colsresizer", Str.lower(tf.extensions.src.toString()))) {
                                tf.extensions.name.push("ColumnsResizer_" + tf.id);
                                tf.extensions.src.push(tf.gridColResizerPath);
                                tf.extensions.description.push("Columns Resizing");
                                tf.extensions.initialize.push(function (o) {
                                    o.SetColsResizer("ColumnsResizer_" + o.id);
                                });
                            }
                        }
                    }

                    //Default columns resizer properties for grid layout
                    f.col_resizer_cols_headers_table = this.headTbl.getAttribute("id");
                    f.col_resizer_cols_headers_index = this.gridHeadRowIndex;
                    f.col_resizer_width_adjustment = 0;
                    f.col_enable_text_ellipsis = false;

                    //Cols generation for all browsers excepted IE<=7
                    this.tblHasColTag = Dom.tag(tbl, "col").length > 0 ? true : false;

                    //Col elements are enough to keep column widths after sorting and
                    //filtering
                    var createColTags = function createColTags(o) {
                        if (!o) {
                            return;
                        }
                        for (var k = tf.nbCells - 1; k >= 0; k--) {
                            var col = Dom.create("col", ["id", tf.id + "_col_" + k]);
                            tbl.firstChild.parentNode.insertBefore(col, tbl.firstChild);
                            col.style.width = tf.colWidth[k];
                            o.gridColElms[k] = col;
                        }
                        o.tblHasColTag = true;
                    };
                    if (!this.tblHasColTag) {
                        createColTags(this);
                    } else {
                        var cols = Dom.tag(tbl, "col");
                        for (var ii = 0; ii < tf.nbCells; ii++) {
                            cols[ii].setAttribute("id", tf.id + "_col_" + ii);
                            cols[ii].style.width = tf.colWidth[ii];
                            o.gridColElms.push(cols[ii]);
                        }
                    }

                    var afterColResizedFn = Types.isFn(f.on_after_col_resized) ? f.on_after_col_resized : null;
                    f.on_after_col_resized = function (o, colIndex) {
                        if (!colIndex) {
                            return;
                        }
                        var w = o.crWColsRow.cells[colIndex].style.width;
                        var col = o.gridColElms[colIndex];
                        col.style.width = w;

                        var thCW = o.crWColsRow.cells[colIndex].clientWidth;
                        var tdCW = o.crWRowDataTbl.cells[colIndex].clientWidth;

                        if (thCW != tdCW /*&& !Helpers.isIE()*/) {
                            o.headTbl.style.width = tbl.clientWidth + "px";
                        }

                        if (afterColResizedFn) {
                            afterColResizedFn.call(null, o, colIndex);
                        }
                    };

                    if (tbl.clientWidth !== this.headTbl.clientWidth) {
                        tbl.style.width = this.headTbl.clientWidth + "px";
                    }

                    // Re-adjust reference row
                    //tf.refRow = Helpers.isIE() ? (tf.refRow+1) : 0;
                }
            },
            destroy: {

                /**
                 * Removes the grid layout
                 */

                value: function destroy() {
                    var tf = this.tf;
                    var tbl = tf.tbl;

                    if (!tf.gridLayout) {
                        return;
                    }
                    var t = tbl.parentNode.removeChild(tbl);
                    this.tblMainCont.parentNode.insertBefore(t, this.tblMainCont);
                    this.tblMainCont.parentNode.removeChild(this.tblMainCont);

                    this.tblMainCont = null;
                    this.headTblCont = null;
                    this.headTbl = null;
                    this.tblCont = null;

                    tbl.outerHTML = tf.sourceTblHtml;
                    //needed to keep reference of table element
                    tbl = Dom.id(tf.id);
                }
            }
        });

        return GridLayout;
    })();
});
//# sourceMappingURL=gridLayout.js.map;
define('modules/loader',["exports", "../dom", "../types"], function (exports, _dom, _types) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Types = _types.Types;

    var global = window;

    /**
     * Loading message/spinner
     * @param {Object} tf TableFilter instance
     */

    var Loader = exports.Loader = (function () {
        function Loader(tf) {
            _classCallCheck(this, Loader);

            // TableFilter configuration
            var f = tf.config();
            //id of container element
            this.loaderTgtId = f.loader_target_id || null;
            //div containing loader
            this.loaderDiv = null;
            //defines loader text
            this.loaderText = f.loader_text || "Loading...";
            //defines loader innerHtml
            this.loaderHtml = f.loader_html || null;
            //defines css class for loader div
            this.loaderCssClass = f.loader_css_class || "loader";
            //delay for hiding loader
            this.loaderCloseDelay = 200;
            //callback function before loader is displayed
            this.onShowLoader = Types.isFn(f.on_show_loader) ? f.on_show_loader : null;
            //callback function after loader is closed
            this.onHideLoader = Types.isFn(f.on_hide_loader) ? f.on_hide_loader : null;
            //loader div
            this.prfxLoader = "load_";

            this.tf = tf;

            var containerDiv = Dom.create("div", ["id", this.prfxLoader + tf.id]);
            containerDiv.className = this.loaderCssClass;

            var targetEl = !this.loaderTgtId ? tf.tbl.parentNode : Dom.id(this.loaderTgtId);
            if (!this.loaderTgtId) {
                targetEl.insertBefore(containerDiv, tf.tbl);
            } else {
                targetEl.appendChild(containerDiv);
            }
            this.loaderDiv = Dom.id(this.prfxLoader + tf.id);
            if (!this.loaderHtml) {
                this.loaderDiv.appendChild(Dom.text(this.loaderText));
            } else {
                this.loaderDiv.innerHTML = this.loaderHtml;
            }
        }

        _createClass(Loader, {
            show: {
                value: function show(p) {
                    var _this = this;

                    if (!this.tf.loader || !this.loaderDiv || this.loaderDiv.style.display === p) {
                        return;
                    }

                    var displayLoader = function () {
                        if (!_this.loaderDiv) {
                            return;
                        }
                        if (_this.onShowLoader && p !== "none") {
                            _this.onShowLoader.call(null, _this);
                        }
                        _this.loaderDiv.style.display = p;
                        if (_this.onHideLoader && p === "none") {
                            _this.onHideLoader.call(null, _this);
                        }
                    };

                    var t = p === "none" ? this.loaderCloseDelay : 1;
                    global.setTimeout(displayLoader, t);
                }
            },
            remove: {
                value: function remove() {
                    if (!this.loaderDiv) {
                        return;
                    }
                    var tf = this.tf,
                        targetEl = !this.loaderTgtId ? tf.gridLayout ? tf.Cpt.gridLayout.tblCont : tf.tbl.parentNode : Dom.id(this.loaderTgtId);
                    targetEl.removeChild(this.loaderDiv);
                    this.loaderDiv = null;
                }
            }
        });

        return Loader;
    })();
});
//# sourceMappingURL=loader.js.map;
define('modules/highlightKeywords',["exports", "../dom", "../string"], function (exports, _dom, _string) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Str = _string.Str;

    var HighlightKeyword = exports.HighlightKeyword = (function () {

        /**
         * HighlightKeyword, highlight matched keyword
         * @param {Object} tf TableFilter instance
         */

        function HighlightKeyword(tf) {
            _classCallCheck(this, HighlightKeyword);

            var f = tf.config();
            //defines css class for highlighting
            this.highlightCssClass = f.highlight_css_class || "keyword";
            this.highlightedNodes = [];

            this.tf = tf;
        }

        _createClass(HighlightKeyword, {
            highlight: {

                /**
                 * highlight occurences of searched term in passed node
                 * @param  {Node} node
                 * @param  {String} word     Searched term
                 * @param  {String} cssClass Css class name
                 */

                value: function highlight(node, word, cssClass) {
                    // Iterate into this nodes childNodes
                    if (node.hasChildNodes) {
                        var children = node.childNodes;
                        for (var i = 0; i < children.length; i++) {
                            this.highlight(children[i], word, cssClass);
                        }
                    }

                    if (node.nodeType === 3) {
                        var tempNodeVal = Str.lower(node.nodeValue);
                        var tempWordVal = Str.lower(word);
                        if (tempNodeVal.indexOf(tempWordVal) != -1) {
                            var pn = node.parentNode;
                            if (pn && pn.className != cssClass) {
                                // word not highlighted yet
                                var nv = node.nodeValue,
                                    ni = tempNodeVal.indexOf(tempWordVal),

                                // Create a load of replacement nodes
                                before = Dom.text(nv.substr(0, ni)),
                                    docWordVal = nv.substr(ni, word.length),
                                    after = Dom.text(nv.substr(ni + word.length)),
                                    hiwordtext = Dom.text(docWordVal),
                                    hiword = Dom.create("span");
                                hiword.className = cssClass;
                                hiword.appendChild(hiwordtext);
                                pn.insertBefore(before, node);
                                pn.insertBefore(hiword, node);
                                pn.insertBefore(after, node);
                                pn.removeChild(node);
                                this.highlightedNodes.push(hiword.firstChild);
                            }
                        }
                    }
                }
            },
            unhighlight: {

                /**
                 * Removes highlight to nodes matching passed string
                 * @param  {String} word
                 * @param  {String} cssClass Css class to remove
                 */

                value: function unhighlight(word, cssClass) {
                    var arrRemove = [];
                    var highlightedNodes = this.highlightedNodes;
                    for (var i = 0; i < highlightedNodes.length; i++) {
                        var n = highlightedNodes[i];
                        if (!n) {
                            continue;
                        }
                        var tempNodeVal = Str.lower(n.nodeValue),
                            tempWordVal = Str.lower(word);
                        if (tempNodeVal.indexOf(tempWordVal) !== -1) {
                            var pn = n.parentNode;
                            if (pn && pn.className === cssClass) {
                                var prevSib = pn.previousSibling,
                                    nextSib = pn.nextSibling;
                                if (!prevSib || !nextSib) {
                                    continue;
                                }
                                nextSib.nodeValue = prevSib.nodeValue + n.nodeValue + nextSib.nodeValue;
                                prevSib.nodeValue = "";
                                n.nodeValue = "";
                                arrRemove.push(i);
                            }
                        }
                    }
                    for (var k = 0; k < arrRemove.length; k++) {
                        highlightedNodes.splice(arrRemove[k], 1);
                    }
                }
            },
            unhighlightAll: {

                /**
                 * Clear all occurrences of highlighted nodes
                 */

                value: function unhighlightAll() {
                    if (!this.tf.highlightKeywords || !this.tf.searchArgs) {
                        return;
                    }
                    for (var y = 0; y < this.tf.searchArgs.length; y++) {
                        this.unhighlight(this.tf.searchArgs[y], this.highlightCssClass);
                    }
                    this.highlightedNodes = [];
                }
            }
        });

        return HighlightKeyword;
    })();
});
//# sourceMappingURL=highlightKeywords.js.map;
define('modules/popupFilter',["exports", "../types", "../dom", "../event", "../helpers"], function (exports, _types, _dom, _event, _helpers) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Types = _types.Types;
    var Dom = _dom.Dom;
    var Event = _event.Event;
    var Helpers = _helpers.Helpers;

    var PopupFilter = exports.PopupFilter = (function () {

        /**
         * Pop-up filter component
         * @param {Object} tf TableFilter instance
         */

        function PopupFilter(tf) {
            _classCallCheck(this, PopupFilter);

            // Configuration object
            var f = tf.config();

            // Enable external filters behaviour
            tf.isExternalFlt = true;
            tf.externalFltTgtIds = [];

            //filter icon path
            this.popUpImgFlt = f.popup_filters_image || tf.themesPath + "icn_filter.gif";
            //active filter icon path
            this.popUpImgFltActive = f.popup_filters_image_active || tf.themesPath + "icn_filterActive.gif";
            this.popUpImgFltHtml = f.popup_filters_image_html || "<img src=\"" + this.popUpImgFlt + "\" alt=\"Column filter\" />";
            //defines css class for popup div containing filter
            this.popUpDivCssClass = f.popup_div_css_class || "popUpFilter";
            //callback function before popup filtes is opened
            this.onBeforePopUpOpen = Types.isFn(f.on_before_popup_filter_open) ? f.on_before_popup_filter_open : null;
            //callback function after popup filtes is opened
            this.onAfterPopUpOpen = Types.isFn(f.on_after_popup_filter_open) ? f.on_after_popup_filter_open : null;
            //callback function before popup filtes is closed
            this.onBeforePopUpClose = Types.isFn(f.on_before_popup_filter_close) ? f.on_before_popup_filter_close : null;
            //callback function after popup filtes is closed
            this.onAfterPopUpClose = Types.isFn(f.on_after_popup_filter_close) ? f.on_after_popup_filter_close : null;

            //stores filters spans
            this.popUpFltSpans = [];
            //stores filters icons
            this.popUpFltImgs = [];
            //stores filters containers
            this.popUpFltElms = this.popUpFltElmCache || [];
            this.popUpFltAdjustToContainer = true;

            //id prefix for pop-up filter span
            this.prfxPopUpSpan = "popUpSpan_";
            //id prefix for pop-up div containing filter
            this.prfxPopUpDiv = "popUpDiv_";

            this.tf = tf;
        }

        _createClass(PopupFilter, {
            onClick: {
                value: function onClick(e) {
                    var evt = e || global.event,
                        elm = evt.target.parentNode,
                        colIndex = parseInt(elm.getAttribute("ci"), 10);

                    this.closeAll(colIndex);
                    this.toggle(colIndex);

                    if (this.popUpFltAdjustToContainer) {
                        var popUpDiv = this.popUpFltElms[colIndex],
                            header = this.tf.getHeaderElement(colIndex),
                            headerWidth = header.clientWidth * 0.95;
                        if (Helpers.isIE()) {
                            var headerLeft = Dom.position(header).left;
                            popUpDiv.style.left = headerLeft + "px";
                        }
                        popUpDiv.style.width = parseInt(headerWidth, 10) + "px";
                    }
                    Event.cancel(evt);
                    Event.stop(evt);
                }
            },
            init: {

                /**
                 * Initialize DOM elements
                 */

                value: function init() {
                    var _this = this;

                    var tf = this.tf;
                    for (var i = 0; i < tf.nbCells; i++) {
                        if (tf["col" + i] === tf.fltTypeNone) {
                            continue;
                        }
                        var popUpSpan = Dom.create("span", ["id", this.prfxPopUpSpan + tf.id + "_" + i], ["ci", i]);
                        popUpSpan.innerHTML = this.popUpImgFltHtml;
                        var header = tf.getHeaderElement(i);
                        header.appendChild(popUpSpan);
                        Event.add(popUpSpan, "click", function (evt) {
                            _this.onClick(evt);
                        });
                        this.popUpFltSpans[i] = popUpSpan;
                        this.popUpFltImgs[i] = popUpSpan.firstChild;
                    }
                }
            },
            buildAll: {

                /**
                 * Build all pop-up filters elements
                 */

                value: function buildAll() {
                    for (var i = 0; i < this.popUpFltElmCache.length; i++) {
                        this.build(i, this.popUpFltElmCache[i]);
                    }
                }
            },
            build: {

                /**
                 * Build a specified pop-up filter elements
                 * @param  {Number} colIndex Column index
                 * @param  {Object} div      Optional container DOM element
                 */

                value: function build(colIndex, div) {
                    var tf = this.tf;
                    var popUpDiv = !div ? Dom.create("div", ["id", this.prfxPopUpDiv + tf.id + "_" + colIndex]) : div;
                    popUpDiv.className = this.popUpDivCssClass;
                    tf.externalFltTgtIds.push(popUpDiv.id);
                    var header = tf.getHeaderElement(colIndex);
                    header.insertBefore(popUpDiv, header.firstChild);
                    Event.add(popUpDiv, "click", function (evt) {
                        Event.stop(evt);
                    });
                    this.popUpFltElms[colIndex] = popUpDiv;
                }
            },
            toggle: {

                /**
                 * Toogle visibility of specified filter
                 * @param  {Number} colIndex Column index
                 */

                value: function toggle(colIndex) {
                    var tf = this.tf,
                        popUpFltElm = this.popUpFltElms[colIndex];

                    if (popUpFltElm.style.display === "none" || popUpFltElm.style.display === "") {
                        if (this.onBeforePopUpOpen) {
                            this.onBeforePopUpOpen.call(null, this, this.popUpFltElms[colIndex], colIndex);
                        }
                        popUpFltElm.style.display = "block";
                        if (tf["col" + colIndex] === tf.fltTypeInp) {
                            var flt = tf.getFilterElement(colIndex);
                            if (flt) {
                                flt.focus();
                            }
                        }
                        if (this.onAfterPopUpOpen) {
                            this.onAfterPopUpOpen.call(null, this, this.popUpFltElms[colIndex], colIndex);
                        }
                    } else {
                        if (this.onBeforePopUpClose) {
                            this.onBeforePopUpClose.call(null, this, this.popUpFltElms[colIndex], colIndex);
                        }
                        popUpFltElm.style.display = "none";
                        if (this.onAfterPopUpClose) {
                            this.onAfterPopUpClose.call(null, this, this.popUpFltElms[colIndex], colIndex);
                        }
                    }
                }
            },
            closeAll: {

                /**
                 * Close all filters excepted for the specified one if any
                 * @param  {Number} exceptIdx Column index of the filter to not close
                 */

                value: function closeAll(exceptIdx) {
                    for (var i = 0; i < this.popUpFltElms.length; i++) {
                        if (i === exceptIdx) {
                            continue;
                        }
                        var popUpFltElm = this.popUpFltElms[i];
                        if (popUpFltElm) {
                            popUpFltElm.style.display = "none";
                        }
                    }
                }
            },
            buildIcons: {

                /**
                 * Build all the icons representing the pop-up filters
                 */

                value: function buildIcons() {
                    for (var i = 0; i < this.popUpFltImgs.length; i++) {
                        this.buildIcon(i, false);
                    }
                }
            },
            buildIcon: {

                /**
                 * Build specified icon
                 * @param  {Number} colIndex Column index
                 * @param  {Boolean} active   Apply active state
                 */

                value: function buildIcon(colIndex, active) {
                    var activeImg = Types.isUndef(active) ? true : active;
                    if (this.popUpFltImgs[colIndex]) {
                        this.popUpFltImgs[colIndex].src = active ? this.popUpImgFltActive : this.popUpImgFlt;
                    }
                }
            },
            destroy: {

                /**
                 * Remove pop-up filters
                 */

                value: function destroy() {
                    this.popUpFltElmCache = [];
                    for (var i = 0; i < this.popUpFltElms.length; i++) {
                        var popUpFltElm = this.popUpFltElms[i],
                            popUpFltSpan = this.popUpFltSpans[i],
                            popUpFltImg = this.popUpFltImgs[i];
                        if (popUpFltElm) {
                            popUpFltElm.parentNode.removeChild(popUpFltElm);
                            this.popUpFltElmCache[i] = popUpFltElm;
                        }
                        popUpFltElm = null;
                        if (popUpFltSpan) {
                            popUpFltSpan.parentNode.removeChild(popUpFltSpan);
                        }
                        popUpFltSpan = null;
                        if (popUpFltImg) {
                            popUpFltImg.parentNode.removeChild(popUpFltImg);
                        }
                        popUpFltImg = null;
                    }
                    this.popUpFltElms = [];
                    this.popUpFltSpans = [];
                    this.popUpFltImgs = [];
                }
            }
        });

        return PopupFilter;
    })();
});
//# sourceMappingURL=popupFilter.js.map;
define('modules/dropdown',["exports", "../dom", "../array", "../string", "../sort"], function (exports, _dom, _array, _string, _sort) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var array = _array.Arr;
    var Str = _string.Str;
    var Sort = _sort.Sort;

    var Dropdown = exports.Dropdown = (function () {

        /**
         * Dropdown UI component
         * @param {Object} tf TableFilter instance
         */

        function Dropdown(tf) {
            _classCallCheck(this, Dropdown);

            // Configuration object
            var f = tf.config();

            this.enableSlcResetFilter = f.enable_slc_reset_filter ? false : true;
            //defines empty option text
            this.nonEmptyText = f.non_empty_text || "(Non empty)";
            //sets select filling method: 'innerHTML' or 'createElement'
            this.slcFillingMethod = f.slc_filling_method || "createElement";
            //IE only, tooltip text appearing on select before it is populated
            this.activateSlcTooltip = f.activate_slc_tooltip || "Click to activate";
            //tooltip text appearing on multiple select
            this.multipleSlcTooltip = f.multiple_slc_tooltip || "Use Ctrl key for multiple selections";

            this.isCustom = null;
            this.opts = null;
            this.optsTxt = null;
            this.slcInnerHtml = null;

            this.tf = tf;
        }

        _createClass(Dropdown, {
            build: {

                /**
                 * Build drop-down filter UI asynchronously
                 * @param  {Number}  colIndex   Column index
                 * @param  {Boolean} isRefreshed Enable linked refresh behaviour
                 * @param  {Boolean} isExternal Render in external container
                 * @param  {String}  extSlcId   External container id
                 */

                value: function build(colIndex, isRefreshed, isExternal, extSlcId) {
                    var tf = this.tf;
                    tf.EvtManager(tf.Evt.name.dropdown, {
                        slcIndex: colIndex,
                        slcRefreshed: isRefreshed,
                        slcExternal: isExternal,
                        slcId: extSlcId
                    });
                }
            },
            _build: {

                /**
                 * Build drop-down filter UI
                 * @param  {Number}  colIndex    Column index
                 * @param  {Boolean} isRefreshed Enable linked refresh behaviour
                 * @param  {Boolean} isExternal  Render in external container
                 * @param  {String}  extSlcId    External container id
                 */

                value: function _build(colIndex) {
                    var isRefreshed = arguments[1] === undefined ? false : arguments[1];
                    var isExternal = arguments[2] === undefined ? false : arguments[2];
                    var extSlcId = arguments[3] === undefined ? null : arguments[3];

                    var tf = this.tf;
                    colIndex = parseInt(colIndex, 10);

                    this.opts = [];
                    this.optsTxt = [];
                    this.slcInnerHtml = "";

                    var slcId = tf.fltIds[colIndex];
                    if (!Dom.id(slcId) && !isExternal || !Dom.id(extSlcId) && isExternal) {
                        return;
                    }
                    var slc = !isExternal ? Dom.id(slcId) : Dom.id(extSlcId),
                        rows = tf.tbl.rows,
                        matchCase = tf.matchCase,
                        fillMethod = Str.lower(this.slcFillingMethod);

                    //custom select test
                    this.isCustom = tf.hasCustomSlcOptions && array.has(tf.customSlcOptions.cols, colIndex);

                    //custom selects text
                    var activeFlt;
                    if (isRefreshed && tf.activeFilterId) {
                        activeFlt = tf.activeFilterId.split("_")[0];
                        activeFlt = activeFlt.split(tf.prfxFlt)[1];
                    }

                    /*** remember grid values ***/
                    var fltsValues = [],
                        fltArr = [];
                    if (tf.rememberGridValues) {
                        fltsValues = tf.Cpt.store.getFilterValues(tf.fltsValuesCookie);
                        if (fltsValues && !Str.isEmpty(fltsValues.toString())) {
                            if (this.isCustom) {
                                fltArr.push(fltsValues[colIndex]);
                            } else {
                                fltArr = fltsValues[colIndex].split(" " + tf.orOperator + " ");
                            }
                        }
                    }

                    var excludedOpts = null,
                        filteredDataCol = null;
                    if (isRefreshed && tf.disableExcludedOptions) {
                        excludedOpts = [];
                        filteredDataCol = [];
                    }

                    for (var k = tf.refRow; k < tf.nbRows; k++) {
                        // always visible rows don't need to appear on selects as always
                        // valid
                        if (tf.hasVisibleRows && array.has(tf.visibleRows, k) && !tf.paging) {
                            continue;
                        }

                        var cell = rows[k].cells,
                            nchilds = cell.length;

                        // checks if row has exact cell #
                        if (nchilds !== tf.nbCells || this.isCustom) {
                            continue;
                        }

                        // this loop retrieves cell data
                        for (var j = 0; j < nchilds; j++) {
                            if (colIndex === j && (!isRefreshed || isRefreshed && tf.disableExcludedOptions) || colIndex == j && isRefreshed && (rows[k].style.display === "" && !tf.paging || tf.paging && (!tf.validRowsIndex || tf.validRowsIndex && array.has(tf.validRowsIndex, k)) && (activeFlt === undefined || activeFlt == colIndex || activeFlt != colIndex && array.has(tf.validRowsIndex, k)))) {
                                var cell_data = tf.getCellData(j, cell[j]),

                                //Vary Peter's patch
                                cell_string = Str.matchCase(cell_data, matchCase);

                                // checks if celldata is already in array
                                if (!array.has(this.opts, cell_string, matchCase)) {
                                    this.opts.push(cell_data);
                                }

                                if (isRefreshed && tf.disableExcludedOptions) {
                                    var filteredCol = filteredDataCol[j];
                                    if (!filteredCol) {
                                        filteredCol = this.GetFilteredDataCol(j);
                                    }
                                    if (!array.has(filteredCol, cell_string, matchCase) && !array.has(excludedOpts, cell_string, matchCase) && !this.isFirstLoad) {
                                        excludedOpts.push(cell_data);
                                    }
                                }
                            } //if colIndex==j
                        } //for j
                    } //for k

                    //Retrieves custom values
                    if (this.isCustom) {
                        var customValues = tf.__getCustomValues(colIndex);
                        this.opts = customValues[0];
                        this.optsTxt = customValues[1];
                    }

                    if (tf.sortSlc && !this.isCustom) {
                        if (!matchCase) {
                            this.opts.sort(Sort.ignoreCase);
                            if (excludedOpts) {
                                excludedOpts.sort(Sort.ignoreCase);
                            }
                        } else {
                            this.opts.sort();
                            if (excludedOpts) {
                                excludedOpts.sort();
                            }
                        }
                    }

                    //asc sort
                    if (tf.sortNumAsc && array.has(tf.sortNumAsc, colIndex)) {
                        try {
                            this.opts.sort(numSortAsc);
                            if (excludedOpts) {
                                excludedOpts.sort(numSortAsc);
                            }
                            if (this.isCustom) {
                                this.optsTxt.sort(numSortAsc);
                            }
                        } catch (e) {
                            this.opts.sort();
                            if (excludedOpts) {
                                excludedOpts.sort();
                            }
                            if (this.isCustom) {
                                this.optsTxt.sort();
                            }
                        } //in case there are alphanumeric values
                    }
                    //desc sort
                    if (tf.sortNumDesc && array.has(tf.sortNumDesc, colIndex)) {
                        try {
                            this.opts.sort(numSortDesc);
                            if (excludedOpts) {
                                excludedOpts.sort(numSortDesc);
                            }
                            if (this.isCustom) {
                                this.optsTxt.sort(numSortDesc);
                            }
                        } catch (e) {
                            this.opts.sort();
                            if (excludedOpts) {
                                excludedOpts.sort();
                            }
                            if (this.isCustom) {
                                this.optsTxt.sort();
                            }
                        } //in case there are alphanumeric values
                    }

                    //populates drop-down
                    this.addOptions(colIndex, slc, isRefreshed, excludedOpts, fltsValues, fltArr);
                }
            },
            addOptions: {

                /**
                 * Add drop-down options
                 * @param {Number} colIndex     Column index
                 * @param {Object} slc          Select Dom element
                 * @param {Boolean} isRefreshed Enable linked refresh behaviour
                 * @param {Array} excludedOpts  Array of excluded options
                 * @param {Array} fltsValues    Collection of persisted filter values
                 * @param {Array} fltArr        Collection of persisted filter values
                 */

                value: function addOptions(colIndex, slc, isRefreshed, excludedOpts, fltsValues, fltArr) {
                    var tf = this.tf,
                        fillMethod = Str.lower(this.slcFillingMethod),
                        slcValue = slc.value;

                    slc.innerHTML = "";
                    slc = this.addFirstOption(slc);

                    for (var y = 0; y < this.opts.length; y++) {
                        if (this.opts[y] === "") {
                            continue;
                        }
                        var val = this.opts[y]; //option value
                        var lbl = this.isCustom ? this.optsTxt[y] : val; //option text
                        var isDisabled = false;
                        if (isRefreshed && this.disableExcludedOptions && array.has(excludedOpts, Str.matchCase(val, tf.matchCase), tf.matchCase)) {
                            isDisabled = true;
                        }

                        if (fillMethod === "innerhtml") {
                            var slcAttr = "";
                            if (tf.fillSlcOnDemand && slcValue === this.opts[y]) {
                                slcAttr = "selected=\"selected\"";
                            }
                            this.slcInnerHtml += "<option value=\"" + val + "\" " + slcAttr + (isDisabled ? "disabled=\"disabled\"" : "") + ">" + lbl + "</option>";
                        } else {
                            var opt;
                            //fill select on demand
                            if (tf.fillSlcOnDemand && slcValue === this.opts[y] && tf["col" + colIndex] === tf.fltTypeSlc) {
                                opt = Dom.createOpt(lbl, val, true);
                            } else {
                                if (tf["col" + colIndex] !== tf.fltTypeMulti) {
                                    opt = Dom.createOpt(lbl, val, fltsValues[colIndex] !== " " && val === fltsValues[colIndex] ? true : false);
                                } else {
                                    opt = Dom.createOpt(lbl, val, array.has(fltArr, Str.matchCase(this.opts[y], tf.matchCase), tf.matchCase) || fltArr.toString().indexOf(val) !== -1 ? true : false);
                                }
                            }
                            if (isDisabled) {
                                opt.disabled = true;
                            }
                            slc.appendChild(opt);
                        }
                    } // for y

                    if (fillMethod === "innerhtml") {
                        slc.innerHTML += this.slcInnerHtml;
                    }
                    slc.setAttribute("filled", "1");
                }
            },
            addFirstOption: {

                /**
                 * Add drop-down header option
                 * @param {Object} slc Select DOM element
                 */

                value: function addFirstOption(slc) {
                    var tf = this.tf,
                        fillMethod = Str.lower(this.slcFillingMethod);

                    if (fillMethod === "innerhtml") {
                        this.slcInnerHtml += "<option value=\"\">" + tf.displayAllText + "</option>";
                    } else {
                        var opt0 = Dom.createOpt(!this.enableSlcResetFilter ? "" : tf.displayAllText, "");
                        if (!this.enableSlcResetFilter) {
                            opt0.style.display = "none";
                        }
                        slc.appendChild(opt0);
                        if (tf.enableEmptyOption) {
                            var opt1 = Dom.createOpt(tf.emptyText, tf.emOperator);
                            slc.appendChild(opt1);
                        }
                        if (tf.enableNonEmptyOption) {
                            var opt2 = Dom.createOpt(tf.nonEmptyText, tf.nmOperator);
                            slc.appendChild(opt2);
                        }
                    }
                    return slc;
                }
            }
        });

        return Dropdown;
    })();
});
//# sourceMappingURL=dropdown.js.map;
define('modules/checkList',["exports", "../dom", "../array", "../string", "../sort", "../event"], function (exports, _dom, _array, _string, _sort, _event) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var array = _array.Arr;
    var Str = _string.Str;
    var Sort = _sort.Sort;
    var Event = _event.Event;

    var CheckList = exports.CheckList = (function () {

        /**
         * Checklist UI component
         * @param {Object} tf TableFilter instance
         */

        function CheckList(tf) {
            _classCallCheck(this, CheckList);

            // Configuration object
            var f = tf.config();

            this.checkListDiv = []; //checklist container div
            //defines css class for div containing checklist filter
            this.checkListDivCssClass = f.div_checklist_css_class || "div_checklist";
            //defines css class for checklist filters
            this.checkListCssClass = f.checklist_css_class || "flt_checklist";
            //defines css class for checklist item (li)
            this.checkListItemCssClass = f.checklist_item_css_class || "flt_checklist_item";
            //defines css class for selected checklist item (li)
            this.checkListSlcItemCssClass = f.checklist_selected_item_css_class || "flt_checklist_slc_item";
            //Load on demand text
            this.activateCheckListTxt = f.activate_checklist_text || "Click to load filter data";
            //defines css class for checklist filters
            this.checkListItemDisabledCssClass = f.checklist_item_disabled_css_class || "flt_checklist_item_disabled";
            this.enableCheckListResetFilter = f.enable_checklist_reset_filter === false ? false : true;
            //checklist filter container div
            this.prfxCheckListDiv = "chkdiv_";

            this.isCustom = null;
            this.opts = null;
            this.optsTxt = null;

            this.tf = tf;
        }

        _createClass(CheckList, {
            onChange: {

                // TODO: move event here

                value: function onChange(evt) {
                    this.tf.Evt.onSlcChange(evt);
                }
            },
            optionClick: {
                value: function optionClick(evt) {
                    this.setCheckListValues(evt.target);
                    this.onChange(evt);
                }
            },
            build: {

                /**
                 * Build checklist UI asynchronously
                 * @param  {Number}  colIndex   Column index
                 * @param  {Boolean} isExternal Render in external container
                 * @param  {String}  extFltId   External container id
                 */

                value: function build(colIndex, isExternal, extFltId) {
                    var tf = this.tf;
                    tf.EvtManager(tf.Evt.name.checklist, { slcIndex: colIndex, slcExternal: isExternal, slcId: extFltId });
                }
            },
            _build: {

                /**
                 * Build checklist UI
                 * @param  {Number}  colIndex   Column index
                 * @param  {Boolean} isExternal Render in external container
                 * @param  {String}  extFltId   External container id
                 */

                value: function _build(colIndex) {
                    var _this = this;

                    var isExternal = arguments[1] === undefined ? false : arguments[1];
                    var extFltId = arguments[2] === undefined ? null : arguments[2];

                    var tf = this.tf;
                    colIndex = parseInt(colIndex, 10);

                    this.opts = [];
                    this.optsTxt = [];

                    var divFltId = this.prfxCheckListDiv + colIndex + "_" + tf.id;
                    if (!Dom.id(divFltId) && !isExternal || !Dom.id(extFltId) && isExternal) {
                        return;
                    }

                    var flt = !isExternal ? this.checkListDiv[colIndex] : Dom.id(extFltId);
                    var ul = Dom.create("ul", ["id", tf.fltIds[colIndex]], ["colIndex", colIndex]);
                    ul.className = this.checkListCssClass;
                    Event.add(ul, "change", function (evt) {
                        _this.onChange(evt);
                    });

                    var rows = tf.tbl.rows;
                    this.isCustom = tf.hasCustomSlcOptions && array.has(tf.customSlcOptions.cols, colIndex);

                    var activeFlt;
                    if (tf.refreshFilters && tf.activeFilterId) {
                        activeFlt = tf.activeFilterId.split("_")[0];
                        activeFlt = activeFlt.split(tf.prfxFlt)[1];
                    }

                    var excludedOpts,
                        filteredDataCol = [];
                    if (tf.refreshFilters && tf.disableExcludedOptions) {
                        excludedOpts = [];
                    }

                    for (var k = tf.refRow; k < tf.nbRows; k++) {
                        // always visible rows don't need to appear on selects as always
                        // valid
                        if (tf.hasVisibleRows && array.has(tf.visibleRows, k) && !tf.paging) {
                            continue;
                        }

                        var cells = rows[k].cells;
                        var ncells = cells.length;

                        // checks if row has exact cell #
                        if (ncells !== tf.nbCells || this.isCustom) {
                            continue;
                        }

                        // this loop retrieves cell data
                        for (var j = 0; j < ncells; j++) {
                            if (colIndex === j && (!tf.refreshFilters || tf.refreshFilters && tf.disableExcludedOptions) || colIndex === j && tf.refreshFilters && (rows[k].style.display === "" && !tf.paging || tf.paging && (!activeFlt || activeFlt === colIndex || activeFlt != colIndex && array.has(tf.validRowsIndex, k)))) {
                                var cell_data = tf.getCellData(j, cells[j]);
                                //Vary Peter's patch
                                var cell_string = Str.matchCase(cell_data, tf.matchCase);
                                // checks if celldata is already in array
                                if (!array.has(this.opts, cell_string, tf.matchCase)) {
                                    this.opts.push(cell_data);
                                }
                                var filteredCol = filteredDataCol[j];
                                if (tf.refreshFilters && tf.disableExcludedOptions) {
                                    if (!filteredCol) {
                                        filteredDataCol[j] = tf.GetFilteredDataCol(j);
                                    }
                                    if (!array.has(filteredCol, cell_string, tf.matchCase) && !array.has(excludedOpts, cell_string, tf.matchCase) && !tf.isFirstLoad) {
                                        excludedOpts.push(cell_data);
                                    }
                                }
                            }
                        }
                    }

                    //Retrieves custom values
                    if (this.isCustom) {
                        var customValues = tf.__getCustomValues(colIndex);
                        this.opts = customValues[0];
                        this.optsTxt = customValues[1];
                    }

                    if (tf.sortSlc && !this.isCustom) {
                        if (!tf.matchCase) {
                            this.opts.sort(Sort.ignoreCase);
                            if (excludedOpts) {
                                excludedOpts.sort(Sort.ignoreCase);
                            }
                        } else {
                            this.opts.sort();
                            if (excludedOpts) {
                                excludedOpts.sort();
                            }
                        }
                    }
                    //asc sort
                    if (tf.sortNumAsc && array.has(tf.sortNumAsc, colIndex)) {
                        try {
                            this.opts.sort(numSortAsc);
                            if (excludedOpts) {
                                excludedOpts.sort(numSortAsc);
                            }
                            if (this.isCustom) {
                                this.optsTxt.sort(numSortAsc);
                            }
                        } catch (e) {
                            this.opts.sort();
                            if (excludedOpts) {
                                excludedOpts.sort();
                            }
                            if (this.isCustom) {
                                this.optsTxt.sort();
                            }
                        } //in case there are alphanumeric values
                    }
                    //desc sort
                    if (tf.sortNumDesc && array.has(tf.sortNumDesc, colIndex)) {
                        try {
                            this.opts.sort(numSortDesc);
                            if (excludedOpts) {
                                excludedOpts.sort(numSortDesc);
                            }
                            if (this.isCustom) {
                                this.optsTxt.sort(numSortDesc);
                            }
                        } catch (e) {
                            this.opts.sort();
                            if (excludedOpts) {
                                excludedOpts.sort();
                            }
                            if (this.isCustom) {
                                this.optsTxt.sort();
                            }
                        } //in case there are alphanumeric values
                    }

                    this.addChecks(colIndex, ul, tf.separator);

                    if (tf.fillSlcOnDemand) {
                        flt.innerHTML = "";
                    }
                    flt.appendChild(ul);
                    flt.setAttribute("filled", "1");
                }
            },
            addChecks: {

                /**
                 * Add checklist options
                 * @param {Number} colIndex  Column index
                 * @param {Object} ul        Ul element
                 * @param {String} separator Data separator
                 */

                value: function addChecks(colIndex, ul, separator) {
                    var _this = this;

                    var tf = this.tf;
                    var chkCt = this.addTChecks(colIndex, ul);
                    var flts_values = [],
                        fltArr = []; //remember grid values
                    var store = tf.Cpt.store;
                    var tmpVal = store ? store.getFilterValues(tf.fltsValuesCookie)[colIndex] : null;
                    if (tmpVal && Str.trim(tmpVal).length > 0) {
                        if (tf.hasCustomSlcOptions && array.has(tf.customSlcOptions.cols, colIndex)) {
                            fltArr.push(tmpVal);
                        } else {
                            fltArr = tmpVal.split(" " + tf.orOperator + " ");
                        }
                    }

                    for (var y = 0; y < this.opts.length; y++) {
                        var val = this.opts[y]; //item value
                        var lbl = this.isCustom ? this.optsTxt[y] : val; //item text
                        var li = Dom.createCheckItem(tf.fltIds[colIndex] + "_" + (y + chkCt), val, lbl);
                        li.className = this.checkListItemCssClass;
                        if (tf.refreshFilters && tf.disableExcludedOptions && array.has(excludedOpts, Str.matchCase(val, tf.matchCase), tf.matchCase)) {
                            Dom.addClass(li, this.checkListItemDisabledCssClass);
                            li.check.disabled = true;
                            li.disabled = true;
                        } else {
                            Event.add(li.check, "click", function (evt) {
                                _this.optionClick(evt);
                            });
                        }
                        ul.appendChild(li);

                        if (val === "") {
                            //item is hidden
                            li.style.display = "none";
                        }

                        /*** remember grid values ***/
                        if (tf.rememberGridValues) {
                            if (tf.hasCustomSlcOptions && array.has(tf.customSlcOptions.cols, colIndex) && fltArr.toString().indexOf(val) != -1 || array.has(fltArr, Str.matchCase(val, tf.matchCase), tf.matchCase)) {
                                li.check.checked = true;
                                this.setCheckListValues(li.check);
                            }
                        }
                    }
                }
            },
            addTChecks: {

                /**
                 * Add checklist header option
                 * @param {Number} colIndex Column index
                 * @param {Object} ul       Ul element
                 */

                value: function addTChecks(colIndex, ul) {
                    var _this = this;

                    var tf = this.tf;
                    var chkCt = 1;
                    var li0 = Dom.createCheckItem(tf.fltIds[colIndex] + "_0", "", tf.displayAllText);
                    li0.className = this.checkListItemCssClass;
                    ul.appendChild(li0);

                    Event.add(li0.check, "click", function (evt) {
                        _this.optionClick(evt);
                    });

                    if (!this.enableCheckListResetFilter) {
                        li0.style.display = "none";
                    }

                    if (tf.enableEmptyOption) {
                        var li1 = Dom.createCheckItem(tf.fltIds[colIndex] + "_1", tf.emOperator, tf.emptyText);
                        li1.className = this.checkListItemCssClass;
                        ul.appendChild(li1);
                        Event.add(li1.check, "click", function (evt) {
                            _this.optionClick(evt);
                        });
                        chkCt++;
                    }

                    if (tf.enableNonEmptyOption) {
                        var li2 = Dom.createCheckItem(tf.fltIds[colIndex] + "_2", tf.nmOperator, tf.nonEmptyText);
                        li2.className = this.checkListItemCssClass;
                        ul.appendChild(li2);
                        Event.add(li2.check, "click", function (evt) {
                            _this.optionClick(evt);
                        });
                        chkCt++;
                    }
                    return chkCt;
                }
            },
            setCheckListValues: {

                /**
                 * Store checked options in DOM element attribute
                 * @param {Object} o checklist option DOM element
                 */

                value: function setCheckListValues(o) {
                    if (!o) {
                        return;
                    }
                    var tf = this.tf;
                    var chkValue = o.value; //checked item value
                    var chkIndex = parseInt(o.id.split("_")[2], 10);
                    var filterTag = "ul",
                        itemTag = "li";
                    var n = o;

                    //ul tag search
                    while (Str.lower(n.nodeName) !== filterTag) {
                        n = n.parentNode;
                    }

                    var li = n.childNodes[chkIndex];
                    var colIndex = n.getAttribute("colIndex");
                    var fltValue = n.getAttribute("value"); //filter value (ul tag)
                    var fltIndexes = n.getAttribute("indexes"); //selected items (ul tag)

                    if (o.checked) {
                        //show all item
                        if (chkValue === "") {
                            if (fltIndexes && fltIndexes !== "") {
                                //items indexes
                                var indSplit = fltIndexes.split(tf.separator);
                                //checked items loop
                                for (var u = 0; u < indSplit.length; u++) {
                                    //checked item
                                    var cChk = Dom.id(tf.fltIds[colIndex] + "_" + indSplit[u]);
                                    if (cChk) {
                                        cChk.checked = false;
                                        Dom.removeClass(n.childNodes[indSplit[u]], this.checkListSlcItemCssClass);
                                    }
                                }
                            }
                            n.setAttribute("value", "");
                            n.setAttribute("indexes", "");
                        } else {
                            fltValue = fltValue ? fltValue : "";
                            chkValue = Str.trim(fltValue + " " + chkValue + " " + tf.orOperator);
                            chkIndex = fltIndexes + chkIndex + tf.separator;
                            n.setAttribute("value", chkValue);
                            n.setAttribute("indexes", chkIndex);
                            //1st option unchecked
                            if (Dom.id(tf.fltIds[colIndex] + "_0")) {
                                Dom.id(tf.fltIds[colIndex] + "_0").checked = false;
                            }
                        }

                        if (Str.lower(li.nodeName) === itemTag) {
                            Dom.removeClass(n.childNodes[0], this.checkListSlcItemCssClass);
                            Dom.addClass(li, this.checkListSlcItemCssClass);
                        }
                    } else {
                        //removes values and indexes
                        if (chkValue !== "") {
                            var replaceValue = new RegExp(Str.rgxEsc(chkValue + " " + tf.orOperator));
                            fltValue = fltValue.replace(replaceValue, "");
                            n.setAttribute("value", Str.trim(fltValue));

                            var replaceIndex = new RegExp(Str.rgxEsc(chkIndex + tf.separator));
                            fltIndexes = fltIndexes.replace(replaceIndex, "");
                            n.setAttribute("indexes", fltIndexes);
                        }
                        if (Str.lower(li.nodeName) === itemTag) {
                            Dom.removeClass(li, this.checkListSlcItemCssClass);
                        }
                    }
                }
            }
        });

        return CheckList;
    })();
});
//# sourceMappingURL=checkList.js.map;
define('modules/rowsCounter',["exports", "../dom", "../types", "../helpers"], function (exports, _dom, _types, _helpers) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Types = _types.Types;
    var Helpers = _helpers.Helpers;

    var RowsCounter = exports.RowsCounter = (function () {

        /**
         * Rows counter
         * @param {Object} tf TableFilter instance
         */

        function RowsCounter(tf) {
            _classCallCheck(this, RowsCounter);

            // TableFilter configuration
            var f = tf.config();

            //id of custom container element
            this.rowsCounterTgtId = f.rows_counter_target_id || null;
            //element containing tot nb rows
            this.rowsCounterDiv = null;
            //element containing tot nb rows label
            this.rowsCounterSpan = null;
            //defines rows counter text
            this.rowsCounterText = f.rows_counter_text || "Rows: ";
            this.fromToTextSeparator = f.from_to_text_separator || "-";
            this.overText = f.over_text || " / ";
            //defines css class rows counter
            this.totRowsCssClass = f.tot_rows_css_class || "tot";
            //rows counter div
            this.prfxCounter = "counter_";
            //nb displayed rows label
            this.prfxTotRows = "totrows_span_";
            //label preceding nb rows label
            this.prfxTotRowsTxt = "totRowsTextSpan_";
            //callback raised before counter is refreshed
            this.onBeforeRefreshCounter = Types.isFn(f.on_before_refresh_counter) ? f.on_before_refresh_counter : null;
            //callback raised after counter is refreshed
            this.onAfterRefreshCounter = Types.isFn(f.on_after_refresh_counter) ? f.on_after_refresh_counter : null;

            this.tf = tf;
        }

        _createClass(RowsCounter, {
            init: {
                value: function init() {
                    var tf = this.tf;

                    if (!tf.hasGrid() && !tf.isFirstLoad || this.rowsCounterSpan) {
                        return;
                    }

                    //rows counter container
                    var countDiv = Dom.create("div", ["id", this.prfxCounter + tf.id]);
                    countDiv.className = this.totRowsCssClass;
                    //rows counter label
                    var countSpan = Dom.create("span", ["id", this.prfxTotRows + tf.id]);
                    var countText = Dom.create("span", ["id", this.prfxTotRowsTxt + tf.id]);
                    countText.appendChild(Dom.text(this.rowsCounterText));

                    // counter is added to defined element
                    if (!this.rowsCounterTgtId) {
                        tf.setToolbar();
                    }
                    var targetEl = !this.rowsCounterTgtId ? tf.lDiv : Dom.id(this.rowsCounterTgtId);

                    //IE only: clears all for sure
                    if (this.rowsCounterDiv && Helpers.isIE()) {
                        this.rowsCounterDiv.outerHTML = "";
                    }
                    //default container: 'lDiv'
                    if (!this.rowsCounterTgtId) {
                        countDiv.appendChild(countText);
                        countDiv.appendChild(countSpan);
                        targetEl.appendChild(countDiv);
                    } else {
                        //custom container, no need to append statusDiv
                        targetEl.appendChild(countText);
                        targetEl.appendChild(countSpan);
                    }
                    this.rowsCounterDiv = countDiv;
                    this.rowsCounterSpan = countSpan;

                    this.refresh();
                }
            },
            refresh: {
                value: function refresh(p) {
                    if (!this.rowsCounterSpan) {
                        return;
                    }

                    var tf = this.tf;

                    if (this.onBeforeRefreshCounter) {
                        this.onBeforeRefreshCounter.call(null, tf, this.rowsCounterSpan);
                    }

                    var totTxt;
                    if (!tf.paging) {
                        if (p && p !== "") {
                            totTxt = p;
                        } else {
                            totTxt = tf.nbFilterableRows - tf.nbHiddenRows - (tf.hasVisibleRows ? tf.visibleRows.length : 0);
                        }
                    } else {
                        var paging = tf.Cpt.paging;
                        if (paging) {
                            //paging start row
                            var paging_start_row = parseInt(paging.startPagingRow, 10) + (tf.nbVisibleRows > 0 ? 1 : 0);
                            var paging_end_row = paging_start_row + paging.pagingLength - 1 <= tf.nbVisibleRows ? paging_start_row + paging.pagingLength - 1 : tf.nbVisibleRows;
                            totTxt = paging_start_row + this.fromToTextSeparator + paging_end_row + this.overText + tf.nbVisibleRows;
                        }
                    }
                    this.rowsCounterSpan.innerHTML = totTxt;
                    if (this.onAfterRefreshCounter) {
                        this.onAfterRefreshCounter.call(null, tf, this.rowsCounterSpan, totTxt);
                    }
                }
            },
            destroy: {
                value: function destroy() {
                    var tf = this.tf;
                    if (!tf.hasGrid()) {
                        return;
                    }
                    if (!this.rowsCounterSpan) {
                        return;
                    }

                    if (!this.rowsCounterTgtId && this.rowsCounterDiv) {
                        //IE only: clears all for sure
                        if (Helpers.isIE()) {
                            this.rowsCounterDiv.outerHTML = "";
                        } else {
                            this.rowsCounterDiv.parentNode.removeChild(this.rowsCounterDiv);
                        }
                    } else {
                        Dom.id(this.rowsCounterTgtId).innerHTML = "";
                    }
                    this.rowsCounterSpan = null;
                    this.rowsCounterDiv = null;
                }
            }
        });

        return RowsCounter;
    })();
});
//# sourceMappingURL=rowsCounter.js.map;
define('modules/statusBar',["exports", "../dom", "../event", "../types", "../helpers"], function (exports, _dom, _event, _types, _helpers) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Event = _event.Event;
    var Types = _types.Types;
    var Helpers = _helpers.Helpers;

    var global = window;

    var StatusBar = exports.StatusBar = (function () {

        /**
         * Status bar UI component
         * @param {Object} tf TableFilter instance
         */

        function StatusBar(tf) {
            _classCallCheck(this, StatusBar);

            // Configuration object
            var f = tf.config();

            //id of custom container element
            this.statusBarTgtId = f.status_bar_target_id || null;
            //element containing status bar label
            this.statusBarDiv = null;
            //status bar
            this.statusBarSpan = null;
            //status bar label
            this.statusBarSpanText = null;
            //defines status bar text
            this.statusBarText = f.status_bar_text || "";
            //defines css class status bar
            this.statusBarCssClass = f.status_bar_css_class || "status";
            //delay for status bar clearing
            this.statusBarCloseDelay = 250;

            //calls function before message is displayed
            this.onBeforeShowMsg = Types.isFn(f.on_before_show_msg) ? f.on_before_show_msg : null;
            //calls function after message is displayed
            this.onAfterShowMsg = Types.isFn(f.on_after_show_msg) ? f.on_after_show_msg : null;

            // status bar div
            this.prfxStatus = "status_";
            // status bar label
            this.prfxStatusSpan = "statusSpan_";
            // text preceding status bar label
            this.prfxStatusTxt = "statusText_";

            this.tf = tf;
        }

        _createClass(StatusBar, {
            init: {
                value: function init() {
                    var tf = this.tf;
                    if (!tf.hasGrid() && !tf.isFirstLoad) {
                        return;
                    }

                    //status bar container
                    var statusDiv = Dom.create("div", ["id", this.prfxStatus + tf.id]);
                    statusDiv.className = this.statusBarCssClass;

                    //status bar label
                    var statusSpan = Dom.create("span", ["id", this.prfxStatusSpan + tf.id]);
                    //preceding text
                    var statusSpanText = Dom.create("span", ["id", this.prfxStatusTxt + tf.id]);
                    statusSpanText.appendChild(Dom.text(this.statusBarText));

                    // target element container
                    if (!this.statusBarTgtId) {
                        tf.setToolbar();
                    }
                    var targetEl = !this.statusBarTgtId ? tf.lDiv : Dom.id(this.statusBarTgtId);

                    // TODO: use alternative to outerHTML
                    if (this.statusBarDiv && Helpers.isIE()) {
                        this.statusBarDiv.outerHTML = "";
                    }

                    //default container: 'lDiv'
                    if (!this.statusBarTgtId) {
                        statusDiv.appendChild(statusSpanText);
                        statusDiv.appendChild(statusSpan);
                        targetEl.appendChild(statusDiv);
                    } else {
                        // custom container, no need to append statusDiv
                        targetEl.appendChild(statusSpanText);
                        targetEl.appendChild(statusSpan);
                    }

                    this.statusBarDiv = statusDiv;
                    this.statusBarSpan = statusSpan;
                    this.statusBarSpanText = statusSpanText;
                }
            },
            message: {
                value: function message() {
                    var _this = this;

                    var t = arguments[0] === undefined ? "" : arguments[0];

                    var tf = this.tf;
                    if (!tf.statusBar || !this.statusBarSpan) {
                        return;
                    }
                    if (this.onBeforeShowMsg) {
                        this.onBeforeShowMsg.call(null, this.tf, t);
                    }

                    var d = t === "" ? this.statusBarCloseDelay : 1;
                    global.setTimeout(function () {
                        _this.statusBarSpan.innerHTML = t;
                        if (_this.onAfterShowMsg) {
                            _this.onAfterShowMsg.call(null, _this.tf, t);
                        }
                    }, d);
                }
            },
            destroy: {
                value: function destroy() {
                    var tf = this.tf;
                    if (!tf.hasGrid() || !this.statusBarDiv) {
                        return;
                    }

                    this.statusBarDiv.innerHTML = "";
                    this.statusBarDiv.parentNode.removeChild(this.statusBarDiv);
                    this.statusBarSpan = null;
                    this.statusBarSpanText = null;
                    this.statusBarDiv = null;
                }
            }
        });

        return StatusBar;
    })();
});
//# sourceMappingURL=statusBar.js.map;
define('modules/paging',["exports", "../dom", "../types", "../string", "../helpers", "../event"], function (exports, _dom, _types, _string, _helpers, _event) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Types = _types.Types;
    var Str = _string.Str;
    var Helpers = _helpers.Helpers;
    var Event = _event.Event;

    var Paging = exports.Paging = (function () {

        /**
         * Pagination component
         * @param {Object} tf TableFilter instance
         */

        function Paging(tf) {
            _classCallCheck(this, Paging);

            // Configuration object
            var f = tf.config();

            //css class for paging buttons (previous,next,etc.)
            this.btnPageCssClass = f.paging_btn_css_class || "pgInp";
            //stores paging select element
            this.pagingSlc = null;
            //results per page select element
            this.resultsPerPageSlc = null;
            //id of container element
            this.pagingTgtId = f.paging_target_id || null;
            //defines table paging length
            this.pagingLength = !isNaN(f.paging_length) ? f.paging_length : 10;
            //id of container element
            this.resultsPerPageTgtId = f.results_per_page_target_id || null;
            //css class for paging select element
            this.pgSlcCssClass = f.paging_slc_css_class || "pgSlc";
            //css class for paging input element
            this.pgInpCssClass = f.paging_inp_css_class || "pgNbInp";
            //stores results per page text and values
            this.resultsPerPage = f.results_per_page || null;
            //enables/disables results per page drop-down
            this.hasResultsPerPage = Types.isArray(this.resultsPerPage);
            //defines css class for results per page select
            this.resultsSlcCssClass = f.results_slc_css_class || "rspg";
            //css class for label preceding results per page select
            this.resultsSpanCssClass = f.results_span_css_class || "rspgSpan";
            //1st row index of current page
            this.startPagingRow = 0;
            //total nb of pages
            this.nbPages = 0;
            //current page nb
            this.currentPageNb = 1;
            //defines next page button text
            this.btnNextPageText = f.btn_next_page_text || ">";
            //defines previous page button text
            this.btnPrevPageText = f.btn_prev_page_text || "<";
            //defines last page button text
            this.btnLastPageText = f.btn_last_page_text || ">|";
            //defines first page button text
            this.btnFirstPageText = f.btn_first_page_text || "|<";
            //defines next page button html
            this.btnNextPageHtml = f.btn_next_page_html || (!tf.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " nextPage\" title=\"Next page\" />");
            //defines previous page button html
            this.btnPrevPageHtml = f.btn_prev_page_html || (!tf.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " previousPage\" title=\"Previous page\" />");
            //defines last page button html
            this.btnFirstPageHtml = f.btn_first_page_html || (!tf.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " firstPage\" title=\"First page\" />");
            //defines previous page button html
            this.btnLastPageHtml = f.btn_last_page_html || (!tf.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " lastPage\" title=\"Last page\" />");
            //defines text preceeding page selector drop-down
            this.pageText = f.page_text || " Page ";
            //defines text after page selector drop-down
            this.ofText = f.of_text || " of ";
            //css class for span containing tot nb of pages
            this.nbPgSpanCssClass = f.nb_pages_css_class || "nbpg";
            //enables/disables paging buttons
            this.hasPagingBtns = f.paging_btns === false ? false : true;
            //defines previous page button html
            this.pageSelectorType = f.page_selector_type || tf.fltTypeSlc;
            //calls function before page is changed
            this.onBeforeChangePage = Types.isFn(f.on_before_change_page) ? f.on_before_change_page : null;
            //calls function before page is changed
            this.onAfterChangePage = Types.isFn(f.on_after_change_page) ? f.on_after_change_page : null;

            //pages select
            this.prfxSlcPages = "slcPages_";
            //results per page select
            this.prfxSlcResults = "slcResults_";
            //label preciding results per page select
            this.prfxSlcResultsTxt = "slcResultsTxt_";
            //span containing next page button
            this.prfxBtnNextSpan = "btnNextSpan_";
            //span containing previous page button
            this.prfxBtnPrevSpan = "btnPrevSpan_";
            //span containing last page button
            this.prfxBtnLastSpan = "btnLastSpan_";
            //span containing first page button
            this.prfxBtnFirstSpan = "btnFirstSpan_";
            //next button
            this.prfxBtnNext = "btnNext_";
            //previous button
            this.prfxBtnPrev = "btnPrev_";
            //last button
            this.prfxBtnLast = "btnLast_";
            //first button
            this.prfxBtnFirst = "btnFirst_";
            //span for tot nb pages
            this.prfxPgSpan = "pgspan_";
            //span preceding pages select (contains 'Page')
            this.prfxPgBeforeSpan = "pgbeforespan_";
            //span following pages select (contains ' of ')
            this.prfxPgAfterSpan = "pgafterspan_";

            var start_row = this.refRow;
            var nrows = this.nbRows;
            //calculates page nb
            this.nbPages = Math.ceil((nrows - start_row) / this.pagingLength);

            //Paging elements events
            var o = this;
            // Paging DOM events
            this.evt = {
                slcIndex: function slcIndex() {
                    return o.pageSelectorType === tf.fltTypeSlc ? o.pagingSlc.options.selectedIndex : parseInt(o.pagingSlc.value, 10) - 1;
                },
                nbOpts: function nbOpts() {
                    return o.pageSelectorType === tf.fltTypeSlc ? parseInt(o.pagingSlc.options.length, 10) - 1 : o.nbPages - 1;
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
                    var key = Event.keyCode(e);
                    if (key === 13) {
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

            this.tf = tf;
        }

        _createClass(Paging, {
            init: {

                /**
                 * Initialize DOM elements
                 */

                value: function init() {
                    var _this = this;

                    var slcPages;
                    var tf = this.tf;
                    var evt = this.evt;

                    // Check resultsPerPage is in expected format and initialise the
                    // results per page component
                    if (this.hasResultsPerPage) {
                        if (this.resultsPerPage.length < 2) {
                            this.hasResultsPerPage = false;
                        } else {
                            this.pagingLength = this.resultsPerPage[1][0];
                            this.setResultsPerPage();
                        }
                    }

                    /*====================================================
                        - onchange event for paging select
                    =====================================================*/
                    evt.slcPagesChange = function (event) {
                        _this.changePage();
                        event.target.blur();
                    };

                    // Paging drop-down list selector
                    if (this.pageSelectorType === tf.fltTypeSlc) {
                        slcPages = Dom.create(tf.fltTypeSlc, ["id", this.prfxSlcPages + tf.id]);
                        slcPages.className = this.pgSlcCssClass;
                        Event.add(slcPages, "change", evt.slcPagesChange);
                    }

                    // Paging input selector
                    if (this.pageSelectorType === tf.fltTypeInp) {
                        slcPages = Dom.create(tf.fltTypeInp, ["id", this.prfxSlcPages + tf.id], ["value", this.currentPageNb]);
                        slcPages.className = this.pgInpCssClass;
                        Event.add(slcPages, "keypress", evt._detectKey);
                    }

                    // btns containers
                    var btnNextSpan = Dom.create("span", ["id", this.prfxBtnNextSpan + tf.id]);
                    var btnPrevSpan = Dom.create("span", ["id", this.prfxBtnPrevSpan + tf.id]);
                    var btnLastSpan = Dom.create("span", ["id", this.prfxBtnLastSpan + tf.id]);
                    var btnFirstSpan = Dom.create("span", ["id", this.prfxBtnFirstSpan + tf.id]);

                    if (this.hasPagingBtns) {
                        // Next button
                        if (!this.btnNextPageHtml) {
                            var btn_next = Dom.create(tf.fltTypeInp, ["id", this.prfxBtnNext + tf.id], ["type", "button"], ["value", this.btnNextPageText], ["title", "Next"]);
                            btn_next.className = this.btnPageCssClass;
                            Event.add(btn_next, "click", evt.next);
                            btnNextSpan.appendChild(btn_next);
                        } else {
                            btnNextSpan.innerHTML = this.btnNextPageHtml;
                            Event.add(btnNextSpan, "click", evt.next);
                        }
                        // Previous button
                        if (!this.btnPrevPageHtml) {
                            var btn_prev = Dom.create(tf.fltTypeInp, ["id", this.prfxBtnPrev + tf.id], ["type", "button"], ["value", this.btnPrevPageText], ["title", "Previous"]);
                            btn_prev.className = this.btnPageCssClass;
                            Event.add(btn_prev, "click", evt.prev);
                            btnPrevSpan.appendChild(btn_prev);
                        } else {
                            btnPrevSpan.innerHTML = this.btnPrevPageHtml;
                            Event.add(btnPrevSpan, "click", evt.prev);
                        }
                        // Last button
                        if (!this.btnLastPageHtml) {
                            var btn_last = Dom.create(tf.fltTypeInp, ["id", this.prfxBtnLast + tf.id], ["type", "button"], ["value", this.btnLastPageText], ["title", "Last"]);
                            btn_last.className = this.btnPageCssClass;
                            Event.add(btn_last, "click", evt.last);
                            btnLastSpan.appendChild(btn_last);
                        } else {
                            btnLastSpan.innerHTML = this.btnLastPageHtml;
                            Event.add(btnLastSpan, "click", evt.last);
                        }
                        // First button
                        if (!this.btnFirstPageHtml) {
                            var btn_first = Dom.create(tf.fltTypeInp, ["id", this.prfxBtnFirst + tf.id], ["type", "button"], ["value", this.btnFirstPageText], ["title", "First"]);
                            btn_first.className = this.btnPageCssClass;
                            Event.add(btn_first, "click", evt.first);
                            btnFirstSpan.appendChild(btn_first);
                        } else {
                            btnFirstSpan.innerHTML = this.btnFirstPageHtml;
                            Event.add(btnFirstSpan, "click", evt.first);
                        }
                    }

                    // paging elements (buttons+drop-down list) are added to defined element
                    if (!this.pagingTgtId) {
                        tf.setToolbar();
                    }
                    var targetEl = !this.pagingTgtId ? tf.mDiv : Dom.id(this.pagingTgtId);
                    targetEl.appendChild(btnFirstSpan);
                    targetEl.appendChild(btnPrevSpan);

                    var pgBeforeSpan = Dom.create("span", ["id", this.prfxPgBeforeSpan + tf.id]);
                    pgBeforeSpan.appendChild(Dom.text(this.pageText));
                    pgBeforeSpan.className = this.nbPgSpanCssClass;
                    targetEl.appendChild(pgBeforeSpan);
                    targetEl.appendChild(slcPages);
                    var pgAfterSpan = Dom.create("span", ["id", this.prfxPgAfterSpan + tf.id]);
                    pgAfterSpan.appendChild(Dom.text(this.ofText));
                    pgAfterSpan.className = this.nbPgSpanCssClass;
                    targetEl.appendChild(pgAfterSpan);
                    var pgspan = Dom.create("span", ["id", this.prfxPgSpan + tf.id]);
                    pgspan.className = this.nbPgSpanCssClass;
                    pgspan.appendChild(Dom.text(" " + this.nbPages + " "));
                    targetEl.appendChild(pgspan);
                    targetEl.appendChild(btnNextSpan);
                    targetEl.appendChild(btnLastSpan);
                    this.pagingSlc = Dom.id(this.prfxSlcPages + tf.id);

                    // if this.rememberGridValues==true this.setPagingInfo() is called
                    // in ResetGridValues() method
                    if (!tf.rememberGridValues || this.isPagingRemoved) {
                        this.setPagingInfo();
                    }
                    if (!tf.fltGrid) {
                        tf.ValidateAllRows();
                        this.setPagingInfo(tf.validRowsIndex);
                    }

                    this.isPagingRemoved = false;
                }
            },
            addPaging: {

                /**
                 * Add paging when filters are already instanciated
                 * @param {Boolean} filterTable Execute filtering once paging instanciated
                 */

                value: function addPaging() {
                    var filterTable = arguments[0] === undefined ? false : arguments[0];

                    var tf = this.tf;
                    if (!tf.hasGrid() || tf.paging) {
                        return;
                    }
                    tf.paging = true;
                    this.isPagingRemoved = true;
                    this.init();
                    tf.resetValues();
                    if (filterTable) {
                        tf.filter();
                    }
                }
            },
            setPagingInfo: {

                /**
                 * Calculate number of pages based on valid rows
                 * Refresh paging select according to number of pages
                 * @param {Array} validRows Collection of valid rows
                 */

                value: function setPagingInfo(validRows) {
                    var tf = this.tf;
                    var rows = tf.tbl.rows;
                    var mdiv = !this.pagingTgtId ? tf.mDiv : Dom.id(this.pagingTgtId);
                    var pgspan = Dom.id(this.prfxPgSpan + tf.id);
                    //stores valid rows indexes
                    if (validRows && validRows.length > 0) {
                        tf.validRowsIndex = validRows;
                    } else {
                        //re-sets valid rows indexes array
                        tf.validRowsIndex = [];

                        //counts rows to be grouped
                        for (var j = tf.refRow; j < tf.nbRows; j++) {
                            var row = rows[j];
                            if (!row) {
                                continue;
                            }
                            var isRowValid = row.getAttribute("validRow");
                            if (isRowValid === "true" || !isRowValid) {
                                tf.validRowsIndex.push(j);
                            }
                        }
                    }

                    //calculate nb of pages
                    this.nbPages = Math.ceil(tf.validRowsIndex.length / this.pagingLength);
                    //refresh page nb span
                    pgspan.innerHTML = this.nbPages;
                    //select clearing shortcut
                    if (this.pageSelectorType === tf.fltTypeSlc) {
                        this.pagingSlc.innerHTML = "";
                    }

                    if (this.nbPages > 0) {
                        mdiv.style.visibility = "visible";
                        if (this.pageSelectorType === tf.fltTypeSlc) {
                            for (var z = 0; z < this.nbPages; z++) {
                                var currOpt = new Option(z + 1, z * this.pagingLength, false, false);
                                this.pagingSlc.options[z] = currOpt;
                            }
                        } else {
                            //input type
                            this.pagingSlc.value = this.currentPageNb;
                        }
                    } else {
                        /*** if no results paging select and buttons are hidden ***/
                        mdiv.style.visibility = "hidden";
                    }
                    this.groupByPage(tf.validRowsIndex);
                }
            },
            groupByPage: {

                /**
                 * Group table rows by page and display valid rows
                 * @param  {Array} validRows Collection of valid rows
                 */

                value: function groupByPage(validRows) {
                    var tf = this.tf;
                    var rows = tf.tbl.rows;
                    var paging_end_row = parseInt(this.startPagingRow, 10) + parseInt(this.pagingLength, 10);

                    //store valid rows indexes
                    if (validRows) {
                        tf.validRowsIndex = validRows;
                    }

                    //this loop shows valid rows of current page
                    for (var h = 0; h < tf.validRowsIndex.length; h++) {
                        var r = rows[tf.validRowsIndex[h]];
                        if (h >= this.startPagingRow && h < paging_end_row) {
                            if (r.getAttribute("validRow") === "true" || !r.getAttribute("validRow")) {
                                r.style.display = "";
                            }
                            if (tf.alternateBgs && tf.Cpt.alternateRows) {
                                tf.Cpt.alternateRows.setRowBg(tf.validRowsIndex[h], h);
                            }
                        } else {
                            r.style.display = "none";
                            if (tf.alternateBgs && tf.Cpt.alternateRows) {
                                tf.Cpt.alternateRows.removeRowBg(tf.validRowsIndex[h]);
                            }
                        }
                    }

                    tf.nbVisibleRows = tf.validRowsIndex.length;
                    tf.isStartBgAlternate = false;
                    //re-applies filter behaviours after filtering process
                    tf.applyGridProps();
                }
            },
            setPage: {

                /**
                 * Show page based on passed param value (string or number):
                 * @param {String} or {Number} cmd possible string values: 'next',
                 * 'previous', 'last', 'first' or page number as per param
                 */

                value: function setPage(cmd) {
                    var tf = this.tf;
                    if (!tf.hasGrid() || !tf.paging) {
                        return;
                    }
                    var btnEvt = this.evt,
                        cmdtype = typeof cmd;
                    if (cmdtype === "string") {
                        switch (Str.lower(cmd)) {
                            case "next":
                                btnEvt.next();
                                break;
                            case "previous":
                                btnEvt.prev();
                                break;
                            case "last":
                                btnEvt.last();
                                break;
                            case "first":
                                btnEvt.first();
                                break;
                            default:
                                btnEvt.next();
                                break;
                        }
                    } else if (cmdtype === "number") {
                        this.changePage(cmd - 1);
                    }
                }
            },
            setResultsPerPage: {

                /**
                 * Generates UI elements for the number of results per page drop-down
                 */

                value: function setResultsPerPage() {
                    var _this = this;

                    var tf = this.tf;
                    var evt = this.evt;

                    if (!tf.hasGrid() && !tf.isFirstLoad) {
                        return;
                    }
                    if (this.resultsPerPageSlc || !this.resultsPerPage) {
                        return;
                    }

                    /*====================================================
                        - onchange event for results per page select
                    =====================================================*/
                    evt.slcResultsChange = function (ev) {
                        _this.changeResultsPerPage();
                        ev.target.blur();
                    };

                    var slcR = Dom.create(tf.fltTypeSlc, ["id", this.prfxSlcResults + tf.id]);
                    slcR.className = tf.resultsSlcCssClass;
                    var slcRText = this.resultsPerPage[0],
                        slcROpts = this.resultsPerPage[1];
                    var slcRSpan = Dom.create("span", ["id", this.prfxSlcResultsTxt + tf.id]);
                    slcRSpan.className = this.resultsSpanCssClass;

                    // results per page select is added to external element
                    if (!this.resultsPerPageTgtId) {
                        tf.setToolbar();
                    }
                    var targetEl = !this.resultsPerPageTgtId ? tf.rDiv : Dom.id(this.resultsPerPageTgtId);
                    slcRSpan.appendChild(Dom.text(slcRText));
                    targetEl.appendChild(slcRSpan);
                    targetEl.appendChild(slcR);

                    this.resultsPerPageSlc = Dom.id(this.prfxSlcResults + tf.id);

                    for (var r = 0; r < slcROpts.length; r++) {
                        var currOpt = new Option(slcROpts[r], slcROpts[r], false, false);
                        this.resultsPerPageSlc.options[r] = currOpt;
                    }
                    Event.add(slcR, "change", evt.slcResultsChange);
                }
            },
            removeResultsPerPage: {

                /**
                 * Remove number of results per page UI elements
                 */

                value: function removeResultsPerPage() {
                    var tf = this.tf;
                    if (!tf.hasGrid() || !this.resultsPerPageSlc || !this.resultsPerPage) {
                        return;
                    }
                    var slcR = this.resultsPerPageSlc,
                        slcRSpan = Dom.id(this.prfxSlcResultsTxt + tf.id);
                    if (slcR) {
                        slcR.parentNode.removeChild(slcR);
                    }
                    if (slcRSpan) {
                        slcRSpan.parentNode.removeChild(slcRSpan);
                    }
                    this.resultsPerPageSlc = null;
                }
            },
            changePage: {

                /**
                 * Change the page asynchronously according to passed index
                 * @param  {Number} index Index of the page (0-n)
                 */

                value: function changePage(index) {
                    var tf = this.tf;
                    var evt = tf.Evt;
                    tf.EvtManager(evt.name.changepage, { pgIndex: index });
                }
            },
            changeResultsPerPage: {

                /**
                 * Change rows asynchronously according to page results
                 */

                value: function changeResultsPerPage() {
                    var tf = this.tf;
                    var evt = tf.Evt;
                    tf.EvtManager(evt.name.changeresultsperpage);
                }
            },
            resetPage: {

                /**
                 * Re-set asynchronously page nb at page re-load
                 */

                value: function resetPage() {
                    var tf = this.tf;
                    var evt = tf.Evt;
                    tf.EvtManager(evt.name.resetpage);
                }
            },
            resetPageLength: {

                /**
                 * Re-set asynchronously page length at page re-load
                 */

                value: function resetPageLength() {
                    var tf = this.tf;
                    var evt = tf.Evt;
                    tf.EvtManager(evt.name.resetpagelength);
                }
            },
            _changePage: {

                /**
                 * Change the page according to passed index
                 * @param  {Number} index Index of the page (0-n)
                 */

                value: function _changePage(index) {
                    var tf = this.tf;

                    if (!tf.paging) {
                        return;
                    }
                    if (index === null) {
                        index = this.pageSelectorType === tf.fltTypeSlc ? this.pagingSlc.options.selectedIndex : this.pagingSlc.value - 1;
                    }
                    if (index >= 0 && index <= this.nbPages - 1) {
                        if (this.onBeforeChangePage) {
                            this.onBeforeChangePage.call(null, this, index);
                        }
                        this.currentPageNb = parseInt(index, 10) + 1;
                        if (this.pageSelectorType === tf.fltTypeSlc) {
                            this.pagingSlc.options[index].selected = true;
                        } else {
                            this.pagingSlc.value = this.currentPageNb;
                        }

                        if (tf.rememberPageNb) {
                            tf.Cpt.store.savePageNb(tf.pgNbCookie);
                        }
                        this.startPagingRow = this.pageSelectorType === tf.fltTypeSlc ? this.pagingSlc.value : index * this.pagingLength;

                        this.groupByPage();

                        if (this.onAfterChangePage) {
                            this.onAfterChangePage.call(null, this, index);
                        }
                    }
                }
            },
            _changeResultsPerPage: {

                /**
                 * Change rows according to page results
                 */

                value: function _changeResultsPerPage() {
                    var tf = this.tf;

                    if (!tf.paging) {
                        return;
                    }
                    var slcR = this.resultsPerPageSlc;
                    var slcPagesSelIndex = this.pageSelectorType === tf.fltTypeSlc ? this.pagingSlc.selectedIndex : parseInt(this.pagingSlc.value - 1, 10);
                    this.pagingLength = parseInt(slcR.options[slcR.selectedIndex].value, 10);
                    this.startPagingRow = this.pagingLength * slcPagesSelIndex;

                    if (!isNaN(this.pagingLength)) {
                        if (this.startPagingRow >= tf.nbFilterableRows) {
                            this.startPagingRow = tf.nbFilterableRows - this.pagingLength;
                        }
                        this.setPagingInfo();

                        if (this.pageSelectorType === tf.fltTypeSlc) {
                            var slcIndex = this.pagingSlc.options.length - 1 <= slcPagesSelIndex ? this.pagingSlc.options.length - 1 : slcPagesSelIndex;
                            this.pagingSlc.options[slcIndex].selected = true;
                        }
                        if (tf.rememberPageLen) {
                            tf.Cpt.store.savePageLength(tf.pgLenCookie);
                        }
                    }
                }
            },
            _resetPage: {

                /**
                 * Re-set page nb at page re-load
                 */

                value: function _resetPage(name) {
                    var tf = this.tf;
                    var pgnb = tf.Cpt.store.getPageNb(name);
                    if (pgnb !== "") {
                        this.changePage(pgnb - 1);
                    }
                }
            },
            _resetPageLength: {

                /**
                 * Re-set page length at page re-load
                 */

                value: function _resetPageLength(name) {
                    var tf = this.tf;
                    if (!tf.paging) {
                        return;
                    }
                    var pglenIndex = tf.Cpt.store.getPageLength(name);

                    if (pglenIndex !== "") {
                        this.resultsPerPageSlc.options[pglenIndex].selected = true;
                        this.changeResultsPerPage();
                    }
                }
            },
            destroy: {

                /**
                 * Remove paging feature
                 */

                value: function destroy() {
                    var tf = this.tf;

                    if (!tf.hasGrid()) {
                        return;
                    }
                    // btns containers
                    var btnNextSpan, btnPrevSpan, btnLastSpan, btnFirstSpan;
                    var pgBeforeSpan, pgAfterSpan, pgspan;
                    btnNextSpan = Dom.id(this.prfxBtnNextSpan + tf.id);
                    btnPrevSpan = Dom.id(this.prfxBtnPrevSpan + tf.id);
                    btnLastSpan = Dom.id(this.prfxBtnLastSpan + tf.id);
                    btnFirstSpan = Dom.id(this.prfxBtnFirstSpan + tf.id);
                    //span containing 'Page' text
                    pgBeforeSpan = Dom.id(this.prfxPgBeforeSpan + tf.id);
                    //span containing 'of' text
                    pgAfterSpan = Dom.id(this.prfxPgAfterSpan + tf.id);
                    //span containing nb of pages
                    pgspan = Dom.id(this.prfxPgSpan + tf.id);

                    var evt = this.evt;

                    if (this.pagingSlc) {
                        if (this.pageSelectorType === tf.fltTypeSlc) {
                            Event.remove(this.pagingSlc, "change", evt.slcPagesChange);
                        } else if (this.pageSelectorType === tf.fltTypeInp) {
                            Event.remove(this.pagingSlc, "keypress", evt._detectKey);
                        }
                        this.pagingSlc.parentNode.removeChild(this.pagingSlc);
                    }

                    if (btnNextSpan) {
                        Event.remove(btnNextSpan, "click", evt.next);
                        btnNextSpan.parentNode.removeChild(btnNextSpan);
                    }

                    if (btnPrevSpan) {
                        Event.remove(btnPrevSpan, "click", evt.prev);
                        btnPrevSpan.parentNode.removeChild(btnPrevSpan);
                    }

                    if (btnLastSpan) {
                        Event.remove(btnLastSpan, "click", evt.last);
                        btnLastSpan.parentNode.removeChild(btnLastSpan);
                    }

                    if (btnFirstSpan) {
                        Event.remove(btnFirstSpan, "click", evt.first);
                        btnFirstSpan.parentNode.removeChild(btnFirstSpan);
                    }

                    if (pgBeforeSpan) {
                        pgBeforeSpan.parentNode.removeChild(pgBeforeSpan);
                    }

                    if (pgAfterSpan) {
                        pgAfterSpan.parentNode.removeChild(pgAfterSpan);
                    }

                    if (pgspan) {
                        pgspan.parentNode.removeChild(pgspan);
                    }

                    if (this.hasResultsPerPage) {
                        this.removeResultsPerPage();
                    }

                    this.pagingSlc = null;
                    this.nbPages = 0;
                    this.isPagingRemoved = true;
                    tf.paging = false;
                }
            }
        });

        return Paging;
    })();
});
//# sourceMappingURL=paging.js.map;
define('modules/clearButton',["exports", "../dom", "../event"], function (exports, _dom, _event) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Event = _event.Event;

    var ClearButton = exports.ClearButton = (function () {

        /**
         * Clear button component
         * @param {Object} tf TableFilter instance
         */

        function ClearButton(tf) {
            _classCallCheck(this, ClearButton);

            // Configuration object
            var f = tf.config();

            //id of container element
            this.btnResetTgtId = f.btn_reset_target_id || null;
            //reset button element
            this.btnResetEl = null;
            //defines reset text
            this.btnResetText = f.btn_reset_text || "Reset";
            //defines reset button tooltip
            this.btnResetTooltip = f.btn_reset_tooltip || "Clear filters";
            //defines reset button innerHtml
            this.btnResetHtml = f.btn_reset_html || (!tf.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + tf.btnResetCssClass + "\" " + "title=\"" + this.btnResetTooltip + "\" />");
            //span containing reset button
            this.prfxResetSpan = "resetspan_";

            this.tf = tf;
        }

        _createClass(ClearButton, {
            onClick: {
                value: function onClick() {
                    this.tf.clearFilters();
                }
            },
            init: {

                /**
                 * Build DOM elements
                 */

                value: function init() {
                    var _this = this;

                    var tf = this.tf;

                    if (!tf.hasGrid() && !tf.isFirstLoad && tf.btnResetEl) {
                        return;
                    }

                    var resetspan = Dom.create("span", ["id", this.prfxResetSpan + tf.id]);

                    // reset button is added to defined element
                    if (!this.btnResetTgtId) {
                        tf.setToolbar();
                    }
                    var targetEl = !this.btnResetTgtId ? tf.rDiv : Dom.id(this.btnResetTgtId);
                    targetEl.appendChild(resetspan);

                    if (!this.btnResetHtml) {
                        var fltreset = Dom.create("a", ["href", "javascript:void(0);"]);
                        fltreset.className = tf.btnResetCssClass;
                        fltreset.appendChild(Dom.text(this.btnResetText));
                        resetspan.appendChild(fltreset);
                        // fltreset.onclick = this.Evt._Clear;
                        Event.add(fltreset, "click", function () {
                            _this.onClick();
                        });
                    } else {
                        resetspan.innerHTML = this.btnResetHtml;
                        var resetEl = resetspan.firstChild;
                        // resetEl.onclick = this.Evt._Clear;
                        Event.add(resetEl, "click", function () {
                            _this.onClick();
                        });
                    }
                    this.btnResetEl = resetspan.firstChild;
                }
            },
            destroy: {

                /**
                 * Remove clear button UI
                 */

                value: function destroy() {
                    var tf = this.tf;

                    if (!tf.hasGrid() || !this.btnResetEl) {
                        return;
                    }

                    var resetspan = Dom.id(tf.prfxResetSpan + tf.id);
                    if (resetspan) {
                        resetspan.parentNode.removeChild(resetspan);
                    }
                    this.btnResetEl = null;
                }
            }
        });

        return ClearButton;
    })();
});
//# sourceMappingURL=clearButton.js.map;
define('modules/help',["exports", "../dom", "../event"], function (exports, _dom, _event) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Event = _event.Event;

    var Help = exports.Help = (function () {

        /**
         * Help UI component
         * @param {Object} tf TableFilter instance
         */

        function Help(tf) {
            _classCallCheck(this, Help);

            // Configuration object
            var f = tf.config();

            //id of custom container element for instructions
            this.helpInstrTgtId = f.help_instructions_target_id || null;
            //id of custom container element for instructions
            this.helpInstrContTgtId = f.help_instructions_container_target_id || null;
            //defines help text
            this.helpInstrText = f.help_instructions_text ? f.help_instructions_text : "Use the filters above each column to filter and limit table " + "data. Avanced searches can be performed by using the following " + "operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, " + "<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, " + "<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, " + "<b>rgx:</b><br/> These operators are described here:<br/>" + "<a href=\"http://tablefilter.free.fr/#operators\" " + "target=\"_blank\">http://tablefilter.free.fr/#operators</a><hr/>";
            //defines help innerHtml
            this.helpInstrHtml = f.help_instructions_html || null;
            //defines reset button text
            this.helpInstrBtnText = f.help_instructions_btn_text || "?";
            //defines reset button innerHtml
            this.helpInstrBtnHtml = f.help_instructions_btn_html || null;
            //defines css class for help button
            this.helpInstrBtnCssClass = f.help_instructions_btn_css_class || "helpBtn";
            //defines css class for help container
            this.helpInstrContCssClass = f.help_instructions_container_css_class || "helpCont";
            //help button element
            this.helpInstrBtnEl = null;
            //help content div
            this.helpInstrContEl = null;
            this.helpInstrDefaultHtml = "<div class=\"helpFooter\"><h4>HTML Table " + "Filter Generator v. " + tf.version + "</h4>" + "<a href=\"http://tablefilter.free.fr\" target=\"_blank\">" + "http://tablefilter.free.fr</a><br/>" + "<span>&copy;2009-" + tf.year + " Max Guglielmi.</span>" + "<div align=\"center\" style=\"margin-top:8px;\">" + "<a href=\"javascript:void(0);\">Close</a></div></div>";

            //id prefix for help elements
            this.prfxHelpSpan = "helpSpan_";
            //id prefix for help elements
            this.prfxHelpDiv = "helpDiv_";

            this.tf = tf;
        }

        _createClass(Help, {
            init: {
                value: function init() {
                    var _this = this;

                    if (this.helpInstrBtnEl) {
                        return;
                    }

                    var tf = this.tf;

                    var helpspan = Dom.create("span", ["id", this.prfxHelpSpan + tf.id]);
                    var helpdiv = Dom.create("div", ["id", this.prfxHelpDiv + tf.id]);

                    //help button is added to defined element
                    if (!this.helpInstrTgtId) {
                        tf.setToolbar();
                    }
                    var targetEl = !this.helpInstrTgtId ? tf.rDiv : Dom.id(this.helpInstrTgtId);
                    targetEl.appendChild(helpspan);

                    var divContainer = !this.helpInstrContTgtId ? helpspan : Dom.id(this.helpInstrContTgtId);

                    if (!this.helpInstrBtnHtml) {
                        divContainer.appendChild(helpdiv);
                        var helplink = Dom.create("a", ["href", "javascript:void(0);"]);
                        helplink.className = this.helpInstrBtnCssClass;
                        helplink.appendChild(Dom.text(this.helpInstrBtnText));
                        helpspan.appendChild(helplink);
                        Event.add(helplink, "click", function () {
                            _this.toggle();
                        });
                    } else {
                        helpspan.innerHTML = this.helpInstrBtnHtml;
                        var helpEl = helpspan.firstChild;
                        Event.add(helpEl, "click", function () {
                            _this.toggle();
                        });
                        divContainer.appendChild(helpdiv);
                    }

                    if (!this.helpInstrHtml) {
                        helpdiv.innerHTML = this.helpInstrText;
                        helpdiv.className = this.helpInstrContCssClass;
                        Event.add(helpdiv, "dblclick", function () {
                            _this.toggle();
                        });
                    } else {
                        if (this.helpInstrContTgtId) {
                            divContainer.appendChild(helpdiv);
                        }
                        helpdiv.innerHTML = this.helpInstrHtml;
                        if (!this.helpInstrContTgtId) {
                            helpdiv.className = this.helpInstrContCssClass;
                            Event.add(helpdiv, "dblclick", function () {
                                _this.toggle();
                            });
                        }
                    }
                    helpdiv.innerHTML += this.helpInstrDefaultHtml;
                    Event.add(helpdiv, "click", function () {
                        _this.toggle();
                    });

                    this.helpInstrContEl = helpdiv;
                    this.helpInstrBtnEl = helpspan;
                }
            },
            toggle: {

                /**
                 * Toggle help pop-up
                 */

                value: function toggle() {
                    if (!this.helpInstrContEl) {
                        return;
                    }
                    var divDisplay = this.helpInstrContEl.style.display;
                    if (divDisplay === "" || divDisplay === "none") {
                        this.helpInstrContEl.style.display = "block";
                        // TODO: use CSS instead for element positioning
                        var btnLeft = Dom.position(this.helpInstrBtnEl).left;
                        if (!this.helpInstrContTgtId) {
                            this.helpInstrContEl.style.left = btnLeft - this.helpInstrContEl.clientWidth + 25 + "px";
                        }
                    } else {
                        this.helpInstrContEl.style.display = "none";
                    }
                }
            },
            destroy: {

                /**
                 * Remove help UI
                 */

                value: function destroy() {
                    if (!this.helpInstrBtnEl) {
                        return;
                    }
                    this.helpInstrBtnEl.parentNode.removeChild(this.helpInstrBtnEl);
                    this.helpInstrBtnEl = null;
                    if (!this.helpInstrContEl) {
                        return;
                    }
                    this.helpInstrContEl.parentNode.removeChild(this.helpInstrContEl);
                    this.helpInstrContEl = null;
                }
            }
        });

        return Help;
    })();
});
//# sourceMappingURL=help.js.map;
define('modules/alternateRows',["exports", "../dom"], function (exports, _dom) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;

    var AlternateRows = exports.AlternateRows = (function () {

        /**
         * Alternating rows color
         * @param {Object} tf TableFilter instance
         */

        function AlternateRows(tf) {
            _classCallCheck(this, AlternateRows);

            var f = tf.config();
            //defines css class for even rows
            this.evenCss = f.even_row_css_class || "even";
            //defines css class for odd rows
            this.oddCss = f.odd_row_css_class || "odd";

            this.tf = tf;
        }

        _createClass(AlternateRows, {
            init: {

                /**
                 * Sets alternating rows color
                 */

                value: function init() {
                    if (!this.tf.hasGrid() && !this.tf.isFirstLoad) {
                        return;
                    }
                    var rows = this.tf.tbl.rows;
                    var noValidRowsIndex = this.tf.validRowsIndex === null;
                    //1st index
                    var beginIndex = noValidRowsIndex ? this.tf.refRow : 0;
                    // nb indexes
                    var indexLen = noValidRowsIndex ? this.tf.nbFilterableRows + beginIndex : this.tf.validRowsIndex.length;
                    var idx = 0;

                    //alternates bg color
                    for (var j = beginIndex; j < indexLen; j++) {
                        var rowIdx = noValidRowsIndex ? j : this.tf.validRowsIndex[j];
                        this.setRowBg(rowIdx, idx);
                        idx++;
                    }
                }
            },
            setRowBg: {

                /**
                 * Sets row background color
                 * @param {Number} rowIdx Row index
                 * @param {Number} idx    Valid rows collection index needed to calculate bg
                 * color
                 */

                value: function setRowBg(rowIdx, idx) {
                    if (!this.tf.alternateBgs || isNaN(rowIdx)) {
                        return;
                    }
                    var rows = this.tf.tbl.rows;
                    var i = !idx ? rowIdx : idx;
                    this.removeRowBg(rowIdx);
                    Dom.addClass(rows[rowIdx], i % 2 ? this.evenCss : this.oddCss);
                }
            },
            removeRowBg: {

                /**
                 * Removes row background color
                 * @param  {Number} idx Row index
                 */

                value: function removeRowBg(idx) {
                    if (isNaN(idx)) {
                        return;
                    }
                    var rows = this.tf.tbl.rows;
                    Dom.removeClass(rows[idx], this.oddCss);
                    Dom.removeClass(rows[idx], this.evenCss);
                }
            },
            remove: {

                /**
                 * Removes all row background color
                 */

                value: function remove() {
                    if (!this.tf.hasGrid()) {
                        return;
                    }
                    var row = this.tf.tbl.rows;
                    for (var i = this.tf.refRow; i < this.tf.nbRows; i++) {
                        this.removeRowBg(i);
                    }
                    this.tf.isStartBgAlternate = true;
                }
            },
            enable: {
                value: function enable() {
                    this.tf.alternateBgs = true;
                }
            },
            disable: {
                value: function disable() {
                    this.tf.alternateBgs = false;
                }
            }
        });

        return AlternateRows;
    })();
});
//# sourceMappingURL=alternateRows.js.map;
define('modules/colOps',["exports", "../dom", "../string", "../types"], function (exports, _dom, _string, _types) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Str = _string.Str;
    var Types = _types.Types;

    var ColOps = exports.ColOps = (function () {

        /**
         * Column calculations
         * @param {Object} tf TableFilter instance
         */

        function ColOps(tf) {
            _classCallCheck(this, ColOps);

            var f = tf.config();
            this.colOperation = f.col_operation;

            //calls function before col operation
            this.onBeforeOperation = Types.isFn(f.on_before_operation) ? f.on_before_operation : null;
            //calls function after col operation
            this.onAfterOperation = Types.isFn(f.on_after_operation) ? f.on_after_operation : null;

            this.tf = tf;
        }

        _createClass(ColOps, {
            calc: {

                /**
                 * Calculates columns' values
                 * Configuration options are stored in 'colOperation' property
                 * - 'id' contains ids of elements showing result (array)
                 * - 'col' contains the columns' indexes (array)
                 * - 'operation' contains operation type (array, values: 'sum', 'mean',
                 *   'min', 'max', 'median', 'q1', 'q3')
                 * - 'write_method' array defines which method to use for displaying the
                 *    result (innerHTML, setValue, createTextNode) - default: 'innerHTML'
                 * - 'tot_row_index' defines in which row results are displayed
                 *   (integers array)
                 *
                 * - changes made by Nuovella:
                 * (1) optimized the routine (now it will only process each column once),
                 * (2) added calculations for the median, lower and upper quartile.
                 */

                value: function calc() {
                    if (!this.tf.isFirstLoad && !this.tf.hasGrid()) {
                        return;
                    }

                    if (this.onBeforeOperation) {
                        this.onBeforeOperation.call(null, this.tf);
                    }

                    var colOperation = this.colOperation,
                        labelId = colOperation.id,
                        colIndex = colOperation.col,
                        operation = colOperation.operation,
                        outputType = colOperation.write_method,
                        totRowIndex = colOperation.tot_row_index,
                        excludeRow = colOperation.exclude_row,
                        decimalPrecision = colOperation.decimal_precision !== undefined ? colOperation.decimal_precision : 2;

                    //nuovella: determine unique list of columns to operate on
                    var ucolIndex = [],
                        ucolMax = 0;
                    ucolIndex[ucolMax] = colIndex[0];

                    for (var ii = 1; ii < colIndex.length; ii++) {
                        var saved = 0;
                        //see if colIndex[ii] is already in the list of unique indexes
                        for (var jj = 0; jj <= ucolMax; jj++) {
                            if (ucolIndex[jj] === colIndex[ii]) {
                                saved = 1;
                            }
                        }
                        //if not saved then, save the index;
                        if (saved === 0) {
                            ucolMax++;
                            ucolIndex[ucolMax] = colIndex[ii];
                        }
                    }

                    if (Str.lower(typeof labelId) == "object" && Str.lower(typeof colIndex) == "object" && Str.lower(typeof operation) == "object") {
                        var row = this.tf.tbl.rows,
                            colvalues = [];

                        for (var ucol = 0; ucol <= ucolMax; ucol++) {
                            //this retrieves col values
                            //use ucolIndex because we only want to pass through this loop
                            //once for each column get the values in this unique column
                            colvalues.push(this.tf.getColValues(ucolIndex[ucol], true, excludeRow));

                            //next: calculate all operations for this column
                            var result,
                                nbvalues = 0,
                                temp,
                                meanValue = 0,
                                sumValue = 0,
                                minValue = null,
                                maxValue = null,
                                q1Value = null,
                                medValue = null,
                                q3Value = null,
                                meanFlag = 0,
                                sumFlag = 0,
                                minFlag = 0,
                                maxFlag = 0,
                                q1Flag = 0,
                                medFlag = 0,
                                q3Flag = 0,
                                theList = [],
                                opsThisCol = [],
                                decThisCol = [],
                                labThisCol = [],
                                oTypeThisCol = [],
                                mThisCol = -1;

                            for (var k = 0; k < colIndex.length; k++) {
                                if (colIndex[k] === ucolIndex[ucol]) {
                                    mThisCol++;
                                    opsThisCol[mThisCol] = Str.lower(operation[k]);
                                    decThisCol[mThisCol] = decimalPrecision[k];
                                    labThisCol[mThisCol] = labelId[k];
                                    oTypeThisCol = outputType !== undefined && Str.lower(typeof outputType) === "object" ? outputType[k] : null;

                                    switch (opsThisCol[mThisCol]) {
                                        case "mean":
                                            meanFlag = 1;
                                            break;
                                        case "sum":
                                            sumFlag = 1;
                                            break;
                                        case "min":
                                            minFlag = 1;
                                            break;
                                        case "max":
                                            maxFlag = 1;
                                            break;
                                        case "median":
                                            medFlag = 1;
                                            break;
                                        case "q1":
                                            q1Flag = 1;
                                            break;
                                        case "q3":
                                            q3Flag = 1;
                                            break;
                                    }
                                }
                            }

                            for (var j = 0; j < colvalues[ucol].length; j++) {
                                //sort the list for calculation of median and quartiles
                                if (q1Flag == 1 || q3Flag == 1 || medFlag == 1) {
                                    if (j < colvalues[ucol].length - 1) {
                                        for (k = j + 1; k < colvalues[ucol].length; k++) {
                                            if (eval(colvalues[ucol][k]) < eval(colvalues[ucol][j])) {
                                                temp = colvalues[ucol][j];
                                                colvalues[ucol][j] = colvalues[ucol][k];
                                                colvalues[ucol][k] = temp;
                                            }
                                        }
                                    }
                                }
                                var cvalue = parseFloat(colvalues[ucol][j]);
                                theList[j] = parseFloat(cvalue);

                                if (!isNaN(cvalue)) {
                                    nbvalues++;
                                    if (sumFlag === 1 || meanFlag === 1) {
                                        sumValue += parseFloat(cvalue);
                                    }
                                    if (minFlag === 1) {
                                        if (minValue === null) {
                                            minValue = parseFloat(cvalue);
                                        } else {
                                            minValue = parseFloat(cvalue) < minValue ? parseFloat(cvalue) : minValue;
                                        }
                                    }
                                    if (maxFlag === 1) {
                                        if (maxValue === null) {
                                            maxValue = parseFloat(cvalue);
                                        } else {
                                            maxValue = parseFloat(cvalue) > maxValue ? parseFloat(cvalue) : maxValue;
                                        }
                                    }
                                }
                            } //for j
                            if (meanFlag === 1) {
                                meanValue = sumValue / nbvalues;
                            }
                            if (medFlag === 1) {
                                var aux = 0;
                                if (nbvalues % 2 === 1) {
                                    aux = Math.floor(nbvalues / 2);
                                    medValue = theList[aux];
                                } else {
                                    medValue = (theList[nbvalues / 2] + theList[nbvalues / 2 - 1]) / 2;
                                }
                            }
                            var posa;
                            if (q1Flag === 1) {
                                posa = 0;
                                posa = Math.floor(nbvalues / 4);
                                if (4 * posa == nbvalues) {
                                    q1Value = (theList[posa - 1] + theList[posa]) / 2;
                                } else {
                                    q1Value = theList[posa];
                                }
                            }
                            if (q3Flag === 1) {
                                posa = 0;
                                var posb = 0;
                                posa = Math.floor(nbvalues / 4);
                                if (4 * posa === nbvalues) {
                                    posb = 3 * posa;
                                    q3Value = (theList[posb] + theList[posb - 1]) / 2;
                                } else {
                                    q3Value = theList[nbvalues - posa - 1];
                                }
                            }

                            for (var i = 0; i <= mThisCol; i++) {
                                switch (opsThisCol[i]) {
                                    case "mean":
                                        result = meanValue;
                                        break;
                                    case "sum":
                                        result = sumValue;
                                        break;
                                    case "min":
                                        result = minValue;
                                        break;
                                    case "max":
                                        result = maxValue;
                                        break;
                                    case "median":
                                        result = medValue;
                                        break;
                                    case "q1":
                                        result = q1Value;
                                        break;
                                    case "q3":
                                        result = q3Value;
                                        break;
                                }

                                var precision = !isNaN(decThisCol[i]) ? decThisCol[i] : 2;

                                //if outputType is defined
                                if (oTypeThisCol && result) {
                                    result = result.toFixed(precision);

                                    if (Dom.id(labThisCol[i])) {
                                        switch (Str.lower(oTypeThisCol)) {
                                            case "innerhtml":
                                                if (isNaN(result) || !isFinite(result) || nbvalues === 0) {
                                                    Dom.id(labThisCol[i]).innerHTML = ".";
                                                } else {
                                                    Dom.id(labThisCol[i]).innerHTML = result;
                                                }
                                                break;
                                            case "setvalue":
                                                Dom.id(labThisCol[i]).value = result;
                                                break;
                                            case "createtextnode":
                                                var oldnode = Dom.id(labThisCol[i]).firstChild;
                                                var txtnode = Dom.text(result);
                                                Dom.id(labThisCol[i]).replaceChild(txtnode, oldnode);
                                                break;
                                        } //switch
                                    }
                                } else {
                                    try {
                                        if (isNaN(result) || !isFinite(result) || nbvalues === 0) {
                                            Dom.id(labThisCol[i]).innerHTML = ".";
                                        } else {
                                            Dom.id(labThisCol[i]).innerHTML = result.toFixed(precision);
                                        }
                                    } catch (e) {} //catch
                                } //else
                            } //for i

                            // row(s) with result are always visible
                            var totRow = totRowIndex && totRowIndex[ucol] ? row[totRowIndex[ucol]] : null;
                            if (totRow) {
                                totRow.style.display = "";
                            }
                        } //for ucol
                    } //if typeof

                    if (this.onAfterOperation) {
                        this.onAfterOperation.call(null, this.tf);
                    }
                }
            }
        });

        return ColOps;
    })();
});
//# sourceMappingURL=colOps.js.map;
/*----------------------------------------------------------------------------\
|                            Sortable Table 1.12                              |
|-----------------------------------------------------------------------------|
|                         Created by Erik Arvidsson                           |
|                  (http://webfx.eae.net/contact.html#erik)                   |
|                      For WebFX (http://webfx.eae.net/)                      |
|-----------------------------------------------------------------------------|
| A DOM 1 based script that allows an ordinary HTML table to be sortable.     |
|-----------------------------------------------------------------------------|
|                  Copyright (c) 1998 - 2006 Erik Arvidsson                   |
|-----------------------------------------------------------------------------|
| Licensed under the Apache License, Version 2.0 (the "License"); you may not |
| use this file except in compliance with the License.  You may obtain a copy |
| of the License at http://www.apache.org/licenses/LICENSE-2.0                |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| Unless  required  by  applicable law or  agreed  to  in  writing,  software |
| distributed under the License is distributed on an  "AS IS" BASIS,  WITHOUT |
| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |
| License  for the  specific language  governing permissions  and limitations |
| under the License.                                                          |
|-----------------------------------------------------------------------------|
| 2003-01-10 | First version                                                  |
| 2003-01-19 | Minor changes to the date parsing                              |
| 2003-01-28 | JScript 5.0 fixes (no support for 'in' operator)               |
| 2003-02-01 | Sloppy typo like error fixed in getInnerText                   |
| 2003-07-04 | Added workaround for IE cellIndex bug.                         |
| 2003-11-09 | The bDescending argument to sort was not correctly working     |
|            | Using onclick DOM0 event if no support for addEventListener    |
|            | or attachEvent                                                 |
| 2004-01-13 | Adding addSortType and removeSortType which makes it a lot     |
|            | easier to add new, custom sort types.                          |
| 2004-01-27 | Switch to use descending = false as the default sort order.    |
|            | Change defaultDescending to suit your needs.                   |
| 2004-03-14 | Improved sort type None look and feel a bit                    |
| 2004-08-26 | Made the handling of tBody and tHead more flexible. Now you    |
|            | can use another tHead or no tHead, and you can chose some      |
|            | other tBody.                                                   |
| 2006-04-25 | Changed license to Apache Software License 2.0                 |
|-----------------------------------------------------------------------------|
| Created 2003-01-10 | All changes are in the log above. | Updated 2006-04-25 |
\----------------------------------------------------------------------------*/


function SortableTable(oTable, oSortTypes) {

	this.sortTypes = oSortTypes || [];

	this.sortColumn = null;
	this.descending = null;

	var oThis = this;
	this._headerOnclick = function (e) {
		oThis.headerOnclick(e);
	};

	if (oTable) {
		this.setTable( oTable );
		this.document = oTable.ownerDocument || oTable.document;
	}
	else {
		this.document = document;
	}


	// only IE needs this
	var win = this.document.defaultView || this.document.parentWindow;
	this._onunload = function () {
		oThis.destroy();
	};
	if (win && typeof win.attachEvent != "undefined") {
		win.attachEvent("onunload", this._onunload);
	}
}

SortableTable.gecko = navigator.product == "Gecko";
SortableTable.msie = /msie/i.test(navigator.userAgent);
// Mozilla is faster when doing the DOM manipulations on
// an orphaned element. MSIE is not
SortableTable.removeBeforeSort = SortableTable.gecko;

SortableTable.prototype.onsort = function () {};

// default sort order. true -> descending, false -> ascending
SortableTable.prototype.defaultDescending = false;

// shared between all instances. This is intentional to allow external files
// to modify the prototype
SortableTable.prototype._sortTypeInfo = {};

SortableTable.prototype.setTable = function (oTable) {
	if ( this.tHead )
		this.uninitHeader();
	this.element = oTable;
	this.setTHead( oTable.tHead );
	this.setTBody( oTable.tBodies[0] );
};

SortableTable.prototype.setTHead = function (oTHead) {
	if (this.tHead && this.tHead != oTHead )
		this.uninitHeader();
	this.tHead = oTHead;
	this.initHeader( this.sortTypes );
};

SortableTable.prototype.setTBody = function (oTBody) {
	this.tBody = oTBody;
};

SortableTable.prototype.setSortTypes = function ( oSortTypes ) {
	if ( this.tHead )
		this.uninitHeader();
	this.sortTypes = oSortTypes || [];
	if ( this.tHead )
		this.initHeader( this.sortTypes );
};

// adds arrow containers and events
// also binds sort type to the header cells so that reordering columns does
// not break the sort types
SortableTable.prototype.initHeader = function (oSortTypes) {
	if (!this.tHead) return;
	var cells = this.tHead.rows[0].cells;
	var doc = this.tHead.ownerDocument || this.tHead.document;
	this.sortTypes = oSortTypes || [];
	var l = cells.length;
	var img, c;
	for (var i = 0; i < l; i++) {
		c = cells[i];
		if (this.sortTypes[i] != null && this.sortTypes[i] != "None") {
			img = doc.createElement("IMG");
			img.src = "images/blank.png";
			c.appendChild(img);
			if (this.sortTypes[i] != null)
				c._sortType = this.sortTypes[i];
			if (typeof c.addEventListener != "undefined")
				c.addEventListener("click", this._headerOnclick, false);
			else if (typeof c.attachEvent != "undefined")
				c.attachEvent("onclick", this._headerOnclick);
			else
				c.onclick = this._headerOnclick;
		}
		else
		{
			c.setAttribute( "_sortType", oSortTypes[i] );
			c._sortType = "None";
		}
	}
	this.updateHeaderArrows();
};

// remove arrows and events
SortableTable.prototype.uninitHeader = function () {
	if (!this.tHead) return;
	var cells = this.tHead.rows[0].cells;
	var l = cells.length;
	var c;
	for (var i = 0; i < l; i++) {
		c = cells[i];
		if (c._sortType != null && c._sortType != "None") {
			c.removeChild(c.lastChild);
			if (typeof c.removeEventListener != "undefined")
				c.removeEventListener("click", this._headerOnclick, false);
			else if (typeof c.detachEvent != "undefined")
				c.detachEvent("onclick", this._headerOnclick);
			c._sortType = null;
			c.removeAttribute( "_sortType" );
		}
	}
};

SortableTable.prototype.updateHeaderArrows = function () {
	if (!this.tHead) return;
	var cells = this.tHead.rows[0].cells;
	var l = cells.length;
	var img;
	for (var i = 0; i < l; i++) {
		if (cells[i]._sortType != null && cells[i]._sortType != "None") {
			img = cells[i].lastChild;
			if (i == this.sortColumn)
				img.className = "sort-arrow " + (this.descending ? "descending" : "ascending");
			else
				img.className = "sort-arrow";
		}
	}
};

SortableTable.prototype.headerOnclick = function (e) {
	// find TD element
	var el = e.target || e.srcElement;
	while (el.tagName != "TD")
		el = el.parentNode;

	this.sort(SortableTable.msie ? SortableTable.getCellIndex(el) : el.cellIndex);
};

// IE returns wrong cellIndex when columns are hidden
SortableTable.getCellIndex = function (oTd) {
	var cells = oTd.parentNode.childNodes
	var l = cells.length;
	var i;
	for (i = 0; cells[i] != oTd && i < l; i++)
		;
	return i;
};

SortableTable.prototype.getSortType = function (nColumn) {
	return this.sortTypes[nColumn] || "String";
};

// only nColumn is required
// if bDescending is left out the old value is taken into account
// if sSortType is left out the sort type is found from the sortTypes array

SortableTable.prototype.sort = function (nColumn, bDescending, sSortType) {
	if (!this.tBody) return;
	if (sSortType == null)
		sSortType = this.getSortType(nColumn);

	// exit if None
	if (sSortType == "None")
		return;

	if (bDescending == null) {
		if (this.sortColumn != nColumn)
			this.descending = this.defaultDescending;
		else
			this.descending = !this.descending;
	}
	else
		this.descending = bDescending;

	this.sortColumn = nColumn;

	if (typeof this.onbeforesort == "function")
		this.onbeforesort();

	var f = this.getSortFunction(sSortType, nColumn);
	var a = this.getCache(sSortType, nColumn);
	var tBody = this.tBody;

	a.sort(f);

	if (this.descending)
		a.reverse();

	if (SortableTable.removeBeforeSort) {
		// remove from doc
		var nextSibling = tBody.nextSibling;
		var p = tBody.parentNode;
		p.removeChild(tBody);
	}

	// insert in the new order
	var l = a.length;
	for (var i = 0; i < l; i++)
		tBody.appendChild(a[i].element);

	if (SortableTable.removeBeforeSort) {
		// insert into doc
		p.insertBefore(tBody, nextSibling);
	}

	this.updateHeaderArrows();

	this.destroyCache(a);

	if (typeof this.onsort == "function")
		this.onsort();
};

SortableTable.prototype.asyncSort = function (nColumn, bDescending, sSortType) {
	var oThis = this;
	this._asyncsort = function () {
		oThis.sort(nColumn, bDescending, sSortType);
	};
	window.setTimeout(this._asyncsort, 1);
};

SortableTable.prototype.getCache = function (sType, nColumn) {
	if (!this.tBody) return [];
	var rows = this.tBody.rows;
	var l = rows.length;
	var a = new Array(l);
	var r;
	for (var i = 0; i < l; i++) {
		r = rows[i];
		a[i] = {
			value:		this.getRowValue(r, sType, nColumn),
			element:	r
		};
	};
	return a;
};

SortableTable.prototype.destroyCache = function (oArray) {
	var l = oArray.length;
	for (var i = 0; i < l; i++) {
		oArray[i].value = null;
		oArray[i].element = null;
		oArray[i] = null;
	}
};

SortableTable.prototype.getRowValue = function (oRow, sType, nColumn) {
	// if we have defined a custom getRowValue use that
	if (this._sortTypeInfo[sType] && this._sortTypeInfo[sType].getRowValue)
		return this._sortTypeInfo[sType].getRowValue(oRow, nColumn);

	var s;
	var c = oRow.cells[nColumn];
	if (typeof c.innerText != "undefined")
		s = c.innerText;
	else
		s = SortableTable.getInnerText(c);
	return this.getValueFromString(s, sType);
};

SortableTable.getInnerText = function (oNode) {
	var s = "";
	var cs = oNode.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				s += SortableTable.getInnerText(cs[i]);
				break;
			case 3:	//TEXT_NODE
				s += cs[i].nodeValue;
				break;
		}
	}
	return s;
};

SortableTable.prototype.getValueFromString = function (sText, sType) {
	if (this._sortTypeInfo[sType])
		return this._sortTypeInfo[sType].getValueFromString( sText );
	return sText;
	/*
	switch (sType) {
		case "Number":
			return Number(sText);
		case "CaseInsensitiveString":
			return sText.toUpperCase();
		case "Date":
			var parts = sText.split("-");
			var d = new Date(0);
			d.setFullYear(parts[0]);
			d.setDate(parts[2]);
			d.setMonth(parts[1] - 1);
			return d.valueOf();
	}
	return sText;
	*/
	};

SortableTable.prototype.getSortFunction = function (sType, nColumn) {
	if (this._sortTypeInfo[sType])
		return this._sortTypeInfo[sType].compare;
	return SortableTable.basicCompare;
};

SortableTable.prototype.destroy = function () {
	this.uninitHeader();
	var win = this.document.parentWindow;
	if (win && typeof win.detachEvent != "undefined") {	// only IE needs this
		win.detachEvent("onunload", this._onunload);
	}
	this._onunload = null;
	this.element = null;
	this.tHead = null;
	this.tBody = null;
	this.document = null;
	this._headerOnclick = null;
	this.sortTypes = null;
	this._asyncsort = null;
	this.onsort = null;
};

// Adds a sort type to all instance of SortableTable
// sType : String - the identifier of the sort type
// fGetValueFromString : function ( s : string ) : T - A function that takes a
//    string and casts it to a desired format. If left out the string is just
//    returned
// fCompareFunction : function ( n1 : T, n2 : T ) : Number - A normal JS sort
//    compare function. Takes two values and compares them. If left out less than,
//    <, compare is used
// fGetRowValue : function( oRow : HTMLTRElement, nColumn : int ) : T - A function
//    that takes the row and the column index and returns the value used to compare.
//    If left out then the innerText is first taken for the cell and then the
//    fGetValueFromString is used to convert that string the desired value and type

SortableTable.prototype.addSortType = function (sType, fGetValueFromString, fCompareFunction, fGetRowValue) {
	this._sortTypeInfo[sType] = {
		type:				sType,
		getValueFromString:	fGetValueFromString || SortableTable.idFunction,
		compare:			fCompareFunction || SortableTable.basicCompare,
		getRowValue:		fGetRowValue
	};
};

// this removes the sort type from all instances of SortableTable
SortableTable.prototype.removeSortType = function (sType) {
	delete this._sortTypeInfo[sType];
};

SortableTable.basicCompare = function compare(n1, n2) {
	if (n1.value < n2.value)
		return -1;
	if (n2.value < n1.value)
		return 1;
	return 0;
};

SortableTable.idFunction = function (x) {
	return x;
};

SortableTable.toUpperCase = function (s) {
	return s.toUpperCase();
};

SortableTable.toDate = function (s) {
	var parts = s.split("-");
	var d = new Date(0);
	d.setFullYear(parts[0]);
	d.setDate(parts[2]);
	d.setMonth(parts[1] - 1);
	return d.valueOf();
};


// add sort types
SortableTable.prototype.addSortType("Number", Number);
SortableTable.prototype.addSortType("CaseInsensitiveString", SortableTable.toUpperCase);
SortableTable.prototype.addSortType("Date", SortableTable.toDate);
SortableTable.prototype.addSortType("String");
// None is a special case
;
define("extensions/sortabletable/sortabletable", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.SortableTable;
    };
}(this)));

define('extensions/sortabletable/adapterSortabletable',["exports", "../../types", "../../dom", "../../array", "../../event", "../../date", "../../helpers"], function (exports, _types, _dom, _array, _event, _date, _helpers) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Types = _types.Types;
    var Dom = _dom.Dom;
    var Arr = _array.Arr;
    var Event = _event.Event;
    var DateHelper = _date.DateHelper;
    var Helpers = _helpers.Helpers;

    var AdapterSortableTable = exports.AdapterSortableTable = (function () {

        /**
         * SortableTable Adapter module
         * @param {Object} tf TableFilter instance
         */

        function AdapterSortableTable(tf) {
            _classCallCheck(this, AdapterSortableTable);

            // Configuration object
            var f = tf.config();

            this.isPaged = false;

            //indicates if tables was sorted
            this.sorted = false;

            // edit .sort-arrow.descending / .sort-arrow.ascending in filtergrid.css
            // to reflect any path change
            this.sortImgPath = f.sort_images_path || tf.themesPath;
            this.sortImgBlank = f.sort_image_blank || "blank.png";
            this.sortImgClassName = f.sort_image_class_name || "sort-arrow";
            this.sortImgAscClassName = f.sort_image_asc_class_name || "ascending";
            this.sortImgDescClassName = f.sort_image_desc_class_name || "descending";
            //cell attribute storing custom key
            this.sortCustomKey = f.sort_custom_key || "data-tf-sortKey";

            /*** TF additional events ***/
            //additional paging events for alternating background
            // o.Evt._Paging.nextEvt = function(){ if(o.sorted && o.alternateBgs) o.Filter(); }
            // o.Evt._Paging.prevEvt = o.Evt._Paging.nextEvt;
            // o.Evt._Paging.firstEvt = o.Evt._Paging.nextEvt;
            // o.Evt._Paging.lastEvt = o.Evt._Paging.nextEvt;
            // o.Evt._OnSlcPagesChangeEvt = o.Evt._Paging.nextEvt;

            // callback invoked after sort is loaded and instanciated
            this.onSortLoaded = Types.isFn(f.on_sort_loaded) ? f.on_sort_loaded : null;
            // callback invoked before table is sorted
            this.onBeforeSort = Types.isFn(f.on_before_sort) ? f.on_before_sort : null;
            // callback invoked after table is sorted
            this.onAfterSort = Types.isFn(f.on_after_sort) ? f.on_after_sort : null;

            this.tf = tf;
        }

        _createClass(AdapterSortableTable, {
            init: {
                value: function init() {
                    var tf = this.tf;
                    var sortConfig = tf.sortConfig;
                    var adpt = this;

                    // SortableTable class sanity check (sortabletable.js)
                    if (Types.isUndef(SortableTable)) {
                        throw new Error("SortableTable class not found.");
                    }

                    this.overrideSortableTable();
                    this.setSortTypes();

                    //Column sort at start
                    if (sortConfig.sortCol) {
                        this.stt.sort(sortConfig.sortCol[0], sortConfig.sortCol[1]);
                    }

                    tf.isSortEnabled = true;
                    if (this.onSortLoaded) {
                        this.onSortLoaded.call(null, tf, this);
                    }

                    /*** SortableTable callbacks ***/
                    this.stt.onbeforesort = function () {
                        if (this.onBeforeSort) {
                            this.onBeforeSort.call(null, tf, this.stt.sortColumn);
                        }

                        tf.performSort();

                        /*** sort behaviour for paging ***/
                        if (tf.paging) {
                            adpt.isPaged = true;
                            tf.paging = false;
                            tf.Cpt.paging.destroy();
                        }
                    };

                    this.stt.onsort = function () {
                        adpt.sorted = true;

                        //rows alternating bg issue
                        // TODO: move into AlternateRows component
                        if (tf.alternateBgs) {
                            var rows = tf.tbl.rows,
                                c = 0;

                            var setClass = function setClass(row, i, removeOnly) {
                                if (Types.isUndef(removeOnly)) {
                                    removeOnly = false;
                                }
                                var altRows = tf.Cpt.alternateRows,
                                    oddCls = altRows.oddCss,
                                    evenCls = altRows.evenCss;
                                Dom.removeClass(row, oddCls);
                                Dom.removeClass(row, evenCls);

                                if (!removeOnly) {
                                    Dom.addClass(row, i % 2 ? oddCls : evenCls);
                                }
                            };

                            for (var i = tf.refRow; i < tf.nbRows; i++) {
                                var isRowValid = rows[i].getAttribute("validRow");
                                if (tf.paging && rows[i].style.display === "") {
                                    setClass(rows[i], c);
                                    c++;
                                } else {
                                    if ((isRowValid === "true" || isRowValid === null) && rows[i].style.display === "") {
                                        setClass(rows[i], c);
                                        c++;
                                    } else {
                                        setClass(rows[i], c, true);
                                    }
                                }
                            }
                        }
                        //sort behaviour for paging
                        if (adpt.isPaged) {
                            var paginator = tf.Cpt.paging,
                                config = tf.config();
                            if (paginator.hasResultsPerPage) {
                                var slc = paginator.resultsPerPageSlc;
                                config.paging_length = slc.options[slc.selectedIndex].value;
                            }
                            paginator.addPaging(false);
                            paginator.setPage(paginator.currentPageNb);
                            adpt.isPaged = false;
                        }

                        if (adpt.onAfterSort) {
                            adpt.onAfterSort.call(null, tf, tf.stt.sortColumn);
                        }
                    };
                }
            },
            sortByColumnIndex: {

                /**
                 * Sort specified column
                 * @param  {Number} colIdx Column index
                 */

                value: function sortByColumnIndex(colIdx) {
                    this.stt.sort(colIdx);
                }
            },
            overrideSortableTable: {
                value: function overrideSortableTable() {
                    var adpt = this,
                        tf = this.tf;

                    /**
                     * Overrides headerOnclick method in order to handle th event
                     * @param  {Object} e [description]
                     */
                    SortableTable.prototype.headerOnclick = function (evt) {
                        if (!tf.sort) {
                            return;
                        }
                        // find Header element
                        var el = evt.target || evt.srcElement;

                        while (el.tagName !== "TD" && el.tagName !== "TH") {
                            el = el.parentNode;
                        }

                        this.sort(SortableTable.msie ? SortableTable.getCellIndex(el) : el.cellIndex);
                    };

                    /**
                     * Overrides getCellIndex IE returns wrong cellIndex when columns are
                     * hidden
                     * @param  {Object} oTd TD element
                     * @return {Number}     Cell index
                     */
                    SortableTable.getCellIndex = function (oTd) {
                        var cells = oTd.parentNode.cells,
                            l = cells.length,
                            i;
                        for (i = 0; cells[i] != oTd && i < l; i++) {}
                        return i;
                    };

                    /**
                     * Overrides initHeader in order to handle filters row position
                     * @param  {Array} oSortTypes
                     */
                    SortableTable.prototype.initHeader = function (oSortTypes) {
                        var stt = this;
                        if (!stt.tHead) {
                            // throw new Error('Sorting feature requires a THEAD element');
                            return;
                        }
                        stt.headersRow = tf.headersRow;
                        var cells = stt.tHead.rows[stt.headersRow].cells;
                        var doc = stt.tHead.ownerDocument || stt.tHead.document;
                        stt.sortTypes = oSortTypes || [];
                        var l = cells.length;
                        var img, c;
                        for (var i = 0; i < l; i++) {
                            c = cells[i];
                            if (stt.sortTypes[i] !== null && stt.sortTypes[i] !== "None") {
                                c.style.cursor = "pointer";
                                img = Dom.create("img", ["src", adpt.sortImgPath + adpt.sortImgBlank]);
                                c.appendChild(img);
                                if (stt.sortTypes[i] !== null) {
                                    c.setAttribute("_sortType", stt.sortTypes[i]);
                                }
                                Event.add(c, "click", stt._headerOnclick);
                            } else {
                                c.setAttribute("_sortType", oSortTypes[i]);
                                c._sortType = "None";
                            }
                        }
                        stt.updateHeaderArrows();
                    };

                    /**
                     * Overrides updateHeaderArrows in order to handle arrows indicators
                     */
                    SortableTable.prototype.updateHeaderArrows = function () {
                        var stt = this;
                        var cells, l, img;
                        // external headers
                        if (tf.sortConfig.asyncSort && tf.sortConfig.triggerIds !== null) {
                            var triggers = tf.sortConfig.triggerIds;
                            cells = [];
                            l = triggers.length;
                            for (var j = 0; j < triggers.length; j++) {
                                cells.push(Dom.id(triggers[j]));
                            }
                        } else {
                            if (!this.tHead) {
                                return;
                            }
                            cells = stt.tHead.rows[stt.headersRow].cells;
                            l = cells.length;
                        }
                        for (var i = 0; i < l; i++) {
                            var cellAttr = cells[i].getAttribute("_sortType");
                            if (cellAttr !== null && cellAttr !== "None") {
                                img = cells[i].lastChild || cells[i];
                                if (img.nodeName.toLowerCase() !== "img") {
                                    img = Dom.create("img", ["src", adpt.sortImgPath + adpt.sortImgBlank]);
                                    cells[i].appendChild(img);
                                }
                                if (i === stt.sortColumn) {
                                    img.className = adpt.sortImgClassName + " " + (this.descending ? adpt.sortImgDescClassName : adpt.sortImgAscClassName);
                                } else {
                                    img.className = adpt.sortImgClassName;
                                }
                            }
                        }
                    };

                    /**
                     * Overrides getRowValue for custom key value feature
                     * @param  {Object} oRow    Row element
                     * @param  {String} sType
                     * @param  {Number} nColumn
                     * @return {String}
                     */
                    SortableTable.prototype.getRowValue = function (oRow, sType, nColumn) {
                        var stt = this;
                        // if we have defined a custom getRowValue use that
                        var sortTypeInfo = stt._sortTypeInfo[sType];
                        if (sortTypeInfo && sortTypeInfo.getRowValue) {
                            return sortTypeInfo.getRowValue(oRow, nColumn);
                        }
                        var c = oRow.cells[nColumn];
                        var s = SortableTable.getInnerText(c);
                        return stt.getValueFromString(s, sType);
                    };

                    /**
                     * Overrides getInnerText in order to avoid Firefox unexpected sorting
                     * behaviour with untrimmed text elements
                     * @param  {Object} oNode DOM element
                     * @return {String}       DOM element inner text
                     */
                    SortableTable.getInnerText = function (oNode) {
                        if (!oNode) {
                            return;
                        }
                        if (oNode.getAttribute(adpt.sortCustomKey)) {
                            return oNode.getAttribute(adpt.sortCustomKey);
                        } else {
                            return Dom.getText(oNode);
                        }
                    };
                }
            },
            addSortType: {
                value: function addSortType() {
                    SortableTable.prototype.addSortType(arguments[0], arguments[1], arguments[2], arguments[3]);
                }
            },
            setSortTypes: {
                value: function setSortTypes() {
                    var _this = this;

                    var tf = this.tf,
                        configSort = tf.sortConfig,
                        configSortTypes = configSort.sortTypes,
                        sortTypes = [];

                    for (var i = 0; i < tf.nbCells; i++) {
                        var colType;

                        if (configSortTypes !== null && configSortTypes[i] != null) {
                            colType = configSortTypes[i].toLowerCase();
                            if (colType === "none") {
                                colType = "None";
                            }
                        } else {
                            // resolve column types
                            if (tf.hasColNbFormat && tf.colNbFormat[i] !== null) {
                                colType = tf.colNbFormat[i].toLowerCase();
                            } else if (tf.hasColDateType && tf.colDateType[i] !== null) {
                                colType = tf.colDateType[i].toLowerCase() + "date";
                            } else {
                                colType = "String";
                            }
                        }
                        sortTypes.push(colType);
                    }

                    //Public TF method to add sort type

                    //Custom sort types
                    this.addSortType("number", Number);
                    this.addSortType("caseinsensitivestring", SortableTable.toUpperCase);
                    this.addSortType("date", SortableTable.toDate);
                    this.addSortType("string");
                    this.addSortType("us", usNumberConverter);
                    this.addSortType("eu", euNumberConverter);
                    this.addSortType("dmydate", dmyDateConverter);
                    this.addSortType("ymddate", ymdDateConverter);
                    this.addSortType("mdydate", mdyDateConverter);
                    this.addSortType("ddmmmyyyydate", ddmmmyyyyDateConverter);
                    this.addSortType("ipaddress", ipAddress, sortIP);

                    this.stt = new SortableTable(tf.tbl, sortTypes);

                    /*** external table headers adapter ***/
                    if (configSort.asyncSort && configSort.triggerIds !== null) {
                        var triggers = configSort.triggerIds;
                        for (var j = 0; j < triggers.length; j++) {
                            if (triggers[j] === null) {
                                continue;
                            }
                            var trigger = Dom.id(triggers[j]);
                            if (trigger) {
                                trigger.style.cursor = "pointer";

                                Event.add(trigger, "click", function (evt) {
                                    var elm = evt.target;
                                    if (!_this.tf.sort) {
                                        return;
                                    }
                                    _this.stt.asyncSort(Arr.indexByValue(triggers, elm.id, true));
                                });
                                trigger.setAttribute("_sortType", sortTypes[j]);
                            }
                        }
                    }
                }
            },
            destroy: {

                /**
                 * Destroy sort
                 */

                value: function destroy() {
                    var tf = this.tf;
                    tf.sort = false;
                    this.sorted = false;
                    this.stt.destroy();

                    var ids = tf.getFiltersId();
                    for (var idx = 0; idx < ids.length; idx++) {
                        var header = tf.getHeaderElement(idx);
                        var img = Dom.tag(header, "img");

                        if (img.length === 1) {
                            header.removeChild(img[0]);
                        }
                    }
                }
            }
        });

        return AdapterSortableTable;
    })();

    //Converters
    function usNumberConverter(s) {
        return Helpers.removeNbFormat(s, "us");
    }
    function euNumberConverter(s) {
        return Helpers.removeNbFormat(s, "eu");
    }
    function dateConverter(s, format) {
        return DateHelper.format(s, format);
    }
    function dmyDateConverter(s) {
        return dateConverter(s, "DMY");
    }
    function mdyDateConverter(s) {
        return dateConverter(s, "MDY");
    }
    function ymdDateConverter(s) {
        return dateConverter(s, "YMD");
    }
    function ddmmmyyyyDateConverter(s) {
        return dateConverter(s, "DDMMMYYYY");
    }

    function ipAddress(value) {
        var vals = value.split(".");
        for (var x in vals) {
            var val = vals[x];
            while (3 > val.length) {
                val = "0" + val;
            }
            vals[x] = val;
        }
        return vals.join(".");
    }

    function sortIP(a, b) {
        var aa = ipAddress(a.value.toLowerCase());
        var bb = ipAddress(b.value.toLowerCase());
        if (aa == bb) {
            return 0;
        } else if (aa < bb) {
            return -1;
        } else {
            return 1;
        }
    }
});
//# sourceMappingURL=adapterSortabletable.js.map;
define('tablefilter',["exports", "module", "event", "dom", "string", "cookie", "types", "array", "helpers", "date", "sort", "modules/store", "modules/gridLayout", "modules/loader", "modules/highlightKeywords", "modules/popupFilter", "modules/dropdown", "modules/checkList", "modules/rowsCounter", "modules/statusBar", "modules/paging", "modules/clearButton", "modules/help", "modules/alternateRows", "modules/colOps", "extensions/sortabletable/sortabletable", "extensions/sortabletable/adapterSortabletable"], function (exports, module, _event, _dom, _string, _cookie, _types, _array, _helpers, _date, _sort, _modulesStore, _modulesGridLayout, _modulesLoader, _modulesHighlightKeywords, _modulesPopupFilter, _modulesDropdown, _modulesCheckList, _modulesRowsCounter, _modulesStatusBar, _modulesPaging, _modulesClearButton, _modulesHelp, _modulesAlternateRows, _modulesColOps, _extensionsSortabletableSortabletable, _extensionsSortabletableAdapterSortabletable) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    /* ------------------------------------------------------------------------
        - HTML Table Filter Generator v3.0
        - By Max Guglielmi (tablefilter.free.fr)
        - Licensed under the MIT License
    ---------------------------------------------------------------------------
        - Special credit to:
        Cedric Wartel, cnx.claude@free.fr, Florent Hirchy, Váry Péter,
        Anthony Maes, Nuovella Williams, Fuggerbit, Venkata Seshagiri Rao
        Raya, Piepiax, Manuel Kern, Baladhandayutham for active contribution
        and/or inspiration
    ------------------------------------------------------------------------ */

    var evt = _event.Event;
    var dom = _dom.Dom;
    var str = _string.Str;
    var cookie = _cookie.Cookie;
    var types = _types.Types;
    var array = _array.Arr;
    var hlp = _helpers.Helpers;
    var dateHelper = _date.DateHelper;
    var Sort = _sort.Sort;

    // Modules
    var Store = _modulesStore.Store;
    var GridLayout = _modulesGridLayout.GridLayout;
    var Loader = _modulesLoader.Loader;
    var HighlightKeyword = _modulesHighlightKeywords.HighlightKeyword;
    var PopupFilter = _modulesPopupFilter.PopupFilter;
    var Dropdown = _modulesDropdown.Dropdown;
    var CheckList = _modulesCheckList.CheckList;
    var RowsCounter = _modulesRowsCounter.RowsCounter;
    var StatusBar = _modulesStatusBar.StatusBar;
    var Paging = _modulesPaging.Paging;
    var ClearButton = _modulesClearButton.ClearButton;
    var Help = _modulesHelp.Help;
    var AlternateRows = _modulesAlternateRows.AlternateRows;
    var ColOps = _modulesColOps.ColOps;
    var AdapterSortableTable = _extensionsSortabletableAdapterSortabletable.AdapterSortableTable;

    // import {ColsVisibility} from 'extensions/colsVisibility/colsVisibility';

    var global = window,
        isValidDate = dateHelper.isValid,
        formatDate = dateHelper.format,
        doc = global.document;

    var TableFilter = (function () {

        /**
         * TF object constructor
         * @param {String} id Table id
         * @param {Number} row index indicating the 1st row
         * @param {Object} configuration object
         */

        function TableFilter(id) {
            _classCallCheck(this, TableFilter);

            if (arguments.length === 0) {
                return;
            }

            this.id = id;
            this.version = "3.0";
            this.year = new Date().getFullYear();
            this.tbl = dom.id(id);
            this.startRow = null;
            this.refRow = null;
            this.headersRow = null;
            this.cfg = {};
            this.nbFilterableRows = null;
            this.nbRows = null;
            this.nbCells = null;
            this._hasGrid = false;
            this.enableModules = false;

            if (!this.tbl || str.lower(this.tbl.nodeName) !== "table" || this.getRowsNb() === 0) {
                throw new Error("Could not instantiate TableFilter class: " + "HTML table not found.");
            }

            if (arguments.length > 1) {
                for (var i = 0; i < arguments.length; i++) {
                    var arg = arguments[i];
                    var argtype = typeof arg;
                    switch (str.lower(argtype)) {
                        case "number":
                            this.startRow = arg;
                            break;
                        case "object":
                            this.cfg = arg;
                            break;
                    }
                }
            }

            // configuration object
            var f = this.cfg;

            //Start row et cols nb
            this.refRow = this.startRow === null ? 2 : this.startRow + 1;
            try {
                this.nbCells = this.getCellsNb(this.refRow);
            } catch (e) {
                this.nbCells = this.getCellsNb(0);
            }

            //default script base path
            this.basePath = f.base_path !== undefined ? f.base_path : "";
            this.extensionsPath = f.extensions_path || this.basePath + "extensions/";

            /*** filter types ***/
            this.fltTypeInp = "input";
            this.fltTypeSlc = "select";
            this.fltTypeMulti = "multiple";
            this.fltTypeCheckList = "checklist";
            this.fltTypeNone = "none";
            this.fltCol = []; //filter type of each column

            for (var j = 0; j < this.nbCells; j++) {
                var cfgCol = f["col_" + j];
                var col = !cfgCol ? this.fltTypeInp : str.lower(cfgCol);
                this.fltCol.push(col);
                this["col" + j] = col;
            }

            /*** Developer's additional methods ***/
            this.publicMethods = f.public_methods !== undefined ? f.public_methods : false;

            /*** filters' grid properties ***/

            //enables/disables filter grid
            this.fltGrid = f.grid === false ? false : true;

            /*** Grid layout ***/
            //enables/disables grid layout (fixed headers)
            this.gridLayout = f.grid_layout ? true : false;
            this.sourceTblHtml = null;
            if (this.gridLayout) {
                //Firefox does not support outerHTML property...
                if (this.tbl.outerHTML === undefined) {
                    setOuterHtml();
                }
                this.sourceTblHtml = this.tbl.outerHTML;
            }
            /*** ***/

            this.filtersRowIndex = f.filters_row_index || 0;
            this.headersRow = f.headers_row_index || (this.filtersRowIndex === 0 ? 1 : 0);

            if (this.gridLayout) {
                if (this.headersRow > 1) {
                    this.filtersRowIndex = this.headersRow + 1;
                } else {
                    this.filtersRowIndex = 1;
                    this.headersRow = 0;
                }
            }

            //defines tag of the cells containing filters (td/th)
            this.fltCellTag = f.filters_cell_tag !== "th" || f.filters_cell_tag !== "td" ? "td" : f.filters_cell_tag;

            //stores filters ids
            this.fltIds = [];
            //stores filters DOM elements
            this.fltElms = [];
            //stores filters values
            this.searchArgs = null;
            //stores table data
            this.tblData = [];
            //stores valid rows indexes (rows visible upon filtering)
            this.validRowsIndex = null;
            //stores filters row element
            this.fltGridEl = null;
            //is first load boolean
            this.isFirstLoad = true;
            //container div for paging elements, reset btn etc.
            this.infDiv = null;
            //div for rows counter
            this.lDiv = null;
            //div for reset button and results per page select
            this.rDiv = null;
            //div for paging elements
            this.mDiv = null;
            //table container div for fixed headers (IE only)
            this.contDiv = null;

            //defines css class for div containing paging elements, rows counter etc.
            this.infDivCssClass = f.inf_div_css_class || "inf";
            //defines css class for left div
            this.lDivCssClass = f.left_div_css_class || "ldiv";
            //defines css class for right div
            this.rDivCssClass = f.right_div_css_class || "rdiv";
            //defines css class for mid div
            this.mDivCssClass = f.middle_div_css_class || "mdiv";
            //table container div css class
            this.contDivCssClass = f.content_div_css_class || "cont";

            /*** filters' grid appearance ***/
            //stylesheet file
            this.stylesheet = f.stylesheet || this.basePath + "filtergrid.css";
            this.stylesheetId = this.id + "_style";
            //defines css class for filters row
            this.fltsRowCssClass = f.flts_row_css_class || "fltrow";
            //enables/disables icons (paging, reset button)
            this.enableIcons = f.enable_icons === false ? false : true;
            //enables/disbles rows alternating bg colors
            this.alternateBgs = f.alternate_rows === true ? true : false;
            //defines widths of columns
            this.hasColWidth = f.col_width === true ? true : false;
            this.colWidth = this.hasColWidth ? f.col_width : null;
            //enables/disables fixed headers
            this.fixedHeaders = f.fixed_headers === true ? true : false;
            //tbody height if fixed headers enabled
            this.tBodyH = !isNaN(f.tbody_height) ? f.tbody_height : 200;
            //defines css class for filters
            this.fltCssClass = f.flt_css_class || "flt";
            //defines css class for multiple selects filters
            this.fltMultiCssClass = f.flt_multi_css_class || "flt_multi";
            //defines css class for filters
            this.fltSmallCssClass = f.flt_small_css_class || "flt_s";
            //defines css class for single-filter
            this.singleFltCssClass = f.single_flt_css_class || "single_flt";
            this.isStartBgAlternate = true;

            /*** filters' grid behaviours ***/
            //enables/disables enter key
            this.enterKey = f.enter_key === false ? false : true;
            //enables/disables alternative fn call
            this.isModFilterFn = f.mod_filter_fn === true ? true : false;
            // used by tf_DetectKey fn
            this.modFilterFn = this.isModFilterFn ? f.mod_filter_fn : null;
            //calls function before filtering starts
            this.onBeforeFilter = types.isFn(f.on_before_filter) ? f.on_before_filter : null;
            //calls function after filtering
            this.onAfterFilter = types.isFn(f.on_after_filter) ? f.on_after_filter : null;
            //enables/disables case sensitivity
            this.matchCase = f.match_case === true ? true : false;
            //enables/disbles exact match for search
            this.exactMatch = f.exact_match === true ? true : false;
            //refreshes drop-down lists upon validation
            this.linkedFilters = f.linked_filters === true ? true : false;
            //wheter excluded options are disabled
            this.disableExcludedOptions = f.disable_excluded_options === true ? true : false;
            //stores active filter element
            this.activeFlt = null;
            //id of active filter
            this.activeFilterId = null;
            //enables/disbles column operation(sum,mean)
            this.hasColOperation = f.col_operation ? true : false;
            this.colOperation = null;
            //enables always visible rows
            this.hasVisibleRows = f.rows_always_visible ? true : false;
            //array containing always visible rows
            this.visibleRows = this.hasVisibleRows ? f.rows_always_visible : [];
            //defines search type: include or exclude
            this.searchType = f.search_type || "include";
            //enables/disables external filters generation
            this.isExternalFlt = f.external_flt_grid === true ? true : false;
            //array containing ids of external elements containing filters
            this.externalFltTgtIds = f.external_flt_grid_ids || null;
            //stores filters elements if isExternalFlt is true
            this.externalFltEls = [];
            //delays any filtering process if loader true
            this.execDelay = !isNaN(f.exec_delay) ? parseInt(f.exec_delay, 10) : 100;
            //calls function when filters grid loaded
            this.onFiltersLoaded = types.isFn(f.on_filters_loaded) ? f.on_filters_loaded : null;
            //enables/disables single filter search
            this.singleSearchFlt = f.single_search_filter === true ? true : false;
            //calls function after row is validated
            this.onRowValidated = types.isFn(f.on_row_validated) ? f.on_row_validated : null;
            //array defining columns for customCellData event
            this.customCellDataCols = f.custom_cell_data_cols ? f.custom_cell_data_cols : [];
            //calls custom function for retrieving cell data
            this.customCellData = types.isFn(f.custom_cell_data) ? f.custom_cell_data : null;
            //input watermark text array
            this.watermark = f.watermark || "";
            this.isWatermarkArray = types.isArray(this.watermark);
            //id of toolbar container element
            this.toolBarTgtId = f.toolbar_target_id || null;
            //enables/disables help div
            this.helpInstructions = f.help_instructions || false;
            //popup filters
            this.popUpFilters = f.popup_filters === true ? true : false;
            //active columns color
            this.markActiveColumns = f.mark_active_columns === true ? true : false;
            //defines css class for active column header
            this.activeColumnsCssClass = f.active_columns_css_class || "activeHeader";
            //calls function before active column header is marked
            this.onBeforeActiveColumn = types.isFn(f.on_before_active_column) ? f.on_before_active_column : null;
            //calls function after active column header is marked
            this.onAfterActiveColumn = types.isFn(f.on_after_active_column) ? f.on_after_active_column : null;

            /*** select filter's customisation and behaviours ***/
            //defines 1st option text
            this.displayAllText = f.display_all_text || "";
            //enables/disables empty option in combo-box filters
            this.enableEmptyOption = f.enable_empty_option === true ? true : false;
            //defines empty option text
            this.emptyText = f.empty_text || "(Empty)";
            //enables/disables non empty option in combo-box filters
            this.enableNonEmptyOption = f.enable_non_empty_option === true ? true : false;
            //defines empty option text
            this.nonEmptyText = f.non_empty_text || "(Non empty)";
            //enables/disables onChange event on combo-box
            this.onSlcChange = f.on_change === false ? false : true;
            //enables/disables select options sorting
            this.sortSlc = f.sort_select === false ? false : true;
            //enables/disables ascending numeric options sorting
            this.isSortNumAsc = f.sort_num_asc === true ? true : false;
            this.sortNumAsc = this.isSortNumAsc ? f.sort_num_asc : null;
            //enables/disables descending numeric options sorting
            this.isSortNumDesc = f.sort_num_desc === true ? true : false;
            this.sortNumDesc = this.isSortNumDesc ? f.sort_num_desc : null;
            //enabled selects are populated on demand
            this.fillSlcOnDemand = f.fill_slc_on_demand === true ? true : false;
            this.hasCustomSlcOptions = types.isObj(f.custom_slc_options) ? true : false;
            this.customSlcOptions = types.isArray(f.custom_slc_options) ? f.custom_slc_options : null;

            /*** Filter operators ***/
            this.rgxOperator = f.regexp_operator || "rgx:";
            this.emOperator = f.empty_operator || "[empty]";
            this.nmOperator = f.nonempty_operator || "[nonempty]";
            this.orOperator = f.or_operator || "||";
            this.anOperator = f.and_operator || "&&";
            this.grOperator = f.greater_operator || ">";
            this.lwOperator = f.lower_operator || "<";
            this.leOperator = f.lower_equal_operator || "<=";
            this.geOperator = f.greater_equal_operator || ">=";
            this.dfOperator = f.different_operator || "!";
            this.lkOperator = f.like_operator || "*";
            this.eqOperator = f.equal_operator || "=";
            this.stOperator = f.start_with_operator || "{";
            this.enOperator = f.end_with_operator || "}";
            this.curExp = f.cur_exp || "^[¥£€$]";
            this.separator = f.separator || ",";

            /*** rows counter ***/
            //show/hides rows counter
            this.rowsCounter = f.rows_counter === true ? true : false;

            /*** status bar ***/
            //show/hides status bar
            this.statusBar = f.status_bar === true ? true : false;

            /*** loader ***/
            //enables/disables loader/spinner indicator
            this.loader = f.loader === true ? true : false;

            /*** validation - reset buttons/links ***/
            //show/hides filter's validation button
            this.displayBtn = f.btn === true ? true : false;
            //defines validation button text
            this.btnText = f.btn_text || (!this.enableIcons ? "Go" : "");
            //defines css class for validation button
            this.btnCssClass = f.btn_css_class || (!this.enableIcons ? "btnflt" : "btnflt_icon");
            //show/hides reset link
            this.btnReset = f.btn_reset === true ? true : false;
            //defines css class for reset button
            this.btnResetCssClass = f.btn_reset_css_class || "reset";
            //callback function before filters are cleared
            this.onBeforeReset = types.isFn(f.on_before_reset) ? f.on_before_reset : null;
            //callback function after filters are cleared
            this.onAfterReset = types.isFn(f.on_after_reset) ? f.on_after_reset : null;

            /*** paging ***/
            //enables/disables table paging
            this.paging = f.paging === true ? true : false;
            this.nbVisibleRows = 0; //nb visible rows
            this.nbHiddenRows = 0; //nb hidden rows

            /*** webfx sort adapter ***/
            //enables/disables default table sorting
            this.sort = f.sort === true ? true : false;
            //indicates if sort is set (used in tfAdapter.sortabletable.js)
            this.isSortEnabled = false;
            this.sortConfig = f.sort_config || {};
            this.sortConfig.name = this.sortConfig.name !== undefined ? f.sort_config.name : "sortabletable";
            this.sortConfig.src = this.sortConfig.src !== undefined ? f.sort_config.src : this.extensionsPath + "sortabletable/" + "sortabletable.js";
            this.sortConfig.adapterSrc = this.sortConfig.adapter_src !== undefined ? f.sort_config.adapter_src : this.extensionsPath + "sortabletable/adapterSortabletable.js";
            this.sortConfig.initialize = this.sortConfig.initialize !== undefined ? f.sort_config.initialize : function (o) {};
            this.sortConfig.sortTypes = types.isArray(this.sortConfig.sort_types) ? f.sort_config.sort_types : [];
            this.sortConfig.sortCol = this.sortConfig.sort_col !== undefined ? f.sort_config.sort_col : null;
            this.sortConfig.asyncSort = this.sortConfig.async_sort === true ? true : false;
            this.sortConfig.triggerIds = types.isArray(this.sortConfig.sort_trigger_ids) ? f.sort_config.sort_trigger_ids : [];

            /*** ezEditTable extension ***/
            //enables/disables table selection feature
            this.selectable = f.selectable === true ? true : false;
            //enables/disables editable table feature
            this.editable = f.editable === true ? true : false;
            this.ezEditTableConfig = f.ezEditTable_config || {};
            this.ezEditTableConfig.name = this.ezEditTableConfig.name !== undefined ? f.ezEditTable_config.name : "ezedittable";
            this.ezEditTableConfig.src = this.ezEditTableConfig.src !== undefined ? f.ezEditTable_config.src : this.extensionsPath + "ezEditTable/ezEditTable.js";
            //ezEditTable stylesheet not imported by default as filtergrid.css
            //applies
            this.ezEditTableConfig.loadStylesheet = this.ezEditTableConfig.loadStylesheet === true ? true : false;
            this.ezEditTableConfig.stylesheet = this.ezEditTableConfig.stylesheet || this.extensionsPath + "ezEditTable/ezEditTable.css";
            this.ezEditTableConfig.stylesheetName = this.ezEditTableConfig.stylesheetName !== undefined ? f.ezEditTable_config.stylesheetName : "ezEditTableCss";
            this.ezEditTableConfig.err = "Failed to instantiate EditTable " + "object.\n\"ezEditTable\" module may not be available.";

            /*** onkeyup event ***/
            //enables/disables onkeyup event, table is filtered when user stops
            //typing
            this.onKeyUp = f.on_keyup === true ? true : false;
            //onkeyup delay timer (msecs)
            this.onKeyUpDelay = !isNaN(f.on_keyup_delay) ? f.on_keyup_delay : 900;
            this.isUserTyping = null; //typing indicator
            this.onKeyUpTimer = undefined;

            /*** keyword highlighting ***/
            //enables/disables keyword highlighting
            this.highlightKeywords = f.highlight_keywords === true ? true : false;

            /*** data types ***/
            //defines default date type (european DMY)
            this.defaultDateType = f.default_date_type || "DMY";
            //defines default thousands separator
            //US = ',' EU = '.'
            this.thousandsSeparator = f.thousands_separator || ",";
            //defines default decimal separator
            //US & javascript = '.' EU = ','
            this.decimalSeparator = f.decimal_separator || ".";
            //enables number format per column
            this.hasColNbFormat = f.col_number_format === true ? true : false;
            //array containing columns nb formats
            this.colNbFormat = types.isArray(this.hasColNbFormat) ? f.col_number_format : null;
            //enables date type per column
            this.hasColDateType = f.col_date_type === true ? true : false;
            //array containing columns date type
            this.colDateType = types.isArray(this.hasColDateType) ? f.col_date_type : null;

            /*** status messages ***/
            //filtering
            this.msgFilter = f.msg_filter || "Filtering data...";
            //populating drop-downs
            this.msgPopulate = f.msg_populate || "Populating filter...";
            //populating drop-downs
            this.msgPopulateCheckList = f.msg_populate_checklist || "Populating list...";
            //changing paging page
            this.msgChangePage = f.msg_change_page || "Collecting paging data...";
            //clearing filters
            this.msgClear = f.msg_clear || "Clearing filters...";
            //changing nb results/page
            this.msgChangeResults = f.msg_change_results || "Changing results per page...";
            //re-setting grid values
            this.msgResetValues = f.msg_reset_grid_values || "Re-setting filters values...";
            //re-setting page
            this.msgResetPage = f.msg_reset_page || "Re-setting page...";
            //re-setting page length
            this.msgResetPageLength = f.msg_reset_page_length || "Re-setting page length...";
            //table sorting
            this.msgSort = f.msg_sort || "Sorting data...";
            //extensions loading
            this.msgLoadExtensions = f.msg_load_extensions || "Loading extensions...";
            //themes loading
            this.msgLoadThemes = f.msg_load_themes || "Loading theme(s)...";

            /*** ids prefixes ***/
            //css class name added to table
            this.prfxTf = "TF";
            //filters (inputs - selects)
            this.prfxFlt = "flt";
            //validation button
            this.prfxValButton = "btn";
            //container div for paging elements, rows counter etc.
            this.prfxInfDiv = "inf_";
            //left div
            this.prfxLDiv = "ldiv_";
            //right div
            this.prfxRDiv = "rdiv_";
            //middle div
            this.prfxMDiv = "mdiv_";
            //filter values cookie
            this.prfxCookieFltsValues = "tf_flts_";
            //page nb cookie
            this.prfxCookiePageNb = "tf_pgnb_";
            //page length cookie
            this.prfxCookiePageLen = "tf_pglen_";

            /*** cookies ***/
            this.hasStoredValues = false;
            //remembers filters values on page load
            this.rememberGridValues = f.remember_grid_values === true ? true : false;
            //cookie storing filter values
            this.fltsValuesCookie = this.prfxCookieFltsValues + this.id;
            //remembers page nb on page load
            this.rememberPageNb = this.paging && f.remember_page_number ? true : false;
            //cookie storing page nb
            this.pgNbCookie = this.prfxCookiePageNb + this.id;
            //remembers page length on page load
            this.rememberPageLen = this.paging && f.remember_page_length ? true : false;
            //cookie storing page length
            this.pgLenCookie = this.prfxCookiePageLen + this.id;

            /*** extensions ***/
            //imports external script
            // this.hasExtensions = f.extensions===true ? true : false;
            // this.extensions = this.hasExtensions ? f.extensions : null;
            this.extensions = f.extensions;
            this.hasExtensions = types.isArray(this.extensions);

            /*** themes ***/
            this.enableDefaultTheme = f.enable_default_theme === true ? true : false;
            //imports themes
            this.hasThemes = f.enable_default_theme || f.themes && types.isObj(f.themes) ? true : false;
            this.themes = this.hasThemes ? f.themes : null;
            //themes path
            this.themesPath = f.themes_path || this.basePath + "TF_Themes/";

            // Features registry
            this.Cpt = {
                loader: null,
                alternateRows: null,
                colOps: null,
                rowsCounter: null,
                gridLayout: null,
                store: null,
                highlightKeywords: null,
                paging: null,
                checkList: null,
                dropdown: null,
                popupFilter: null,
                clearButton: null,
                help: null,
                statusBar: null
            };

            // Extensions registry
            this.ExtRegistry = {
                sort: null,
                ezEditTable: null
            };

            /*** TF events ***/
            var o = this;
            this.Evt = {
                name: {
                    filter: "Filter",
                    dropdown: "dropdown",
                    checklist: "checkList",
                    changepage: "changePage",
                    clear: "Clear",
                    changeresultsperpage: "changeResults",
                    resetvalues: "ResetValues",
                    resetpage: "resetPage",
                    resetpagelength: "resetPageLength",
                    sort: "Sort",
                    loadextensions: "LoadExtensions",
                    loadthemes: "loadThemes"
                },

                /*====================================================
                    - Detects <enter> key for a given element
                =====================================================*/
                detectKey: function detectKey(e) {
                    if (!o.enterKey) {
                        return;
                    }
                    var _evt = e || global.event;
                    if (_evt) {
                        var key = evt.keyCode(_evt);
                        if (key === 13) {
                            o._filter();
                            evt.cancel(_evt);
                            evt.stop(_evt);
                        } else {
                            o.isUserTyping = true;
                            global.clearInterval(o.onKeyUpTimer);
                            o.onKeyUpTimer = undefined;
                        }
                    } //if evt
                },
                /*====================================================
                    - onkeyup event for text filters
                =====================================================*/
                onKeyUp: function onKeyUp(e) {
                    if (!o.onKeyUp) {
                        return;
                    }
                    var _evt = e || global.event;
                    var key = evt.keyCode(_evt);
                    o.isUserTyping = false;

                    function filter() {
                        global.clearInterval(o.onKeyUpTimer);
                        o.onKeyUpTimer = undefined;
                        if (!o.isUserTyping) {
                            o.filter();
                            o.isUserTyping = null;
                        }
                    }

                    if (key !== 13 && key !== 9 && key !== 27 && key !== 38 && key !== 40) {
                        if (o.onKeyUpTimer === undefined) {
                            o.onKeyUpTimer = global.setInterval(filter, o.onKeyUpDelay);
                        }
                    } else {
                        global.clearInterval(o.onKeyUpTimer);
                        o.onKeyUpTimer = undefined;
                    }
                },
                /*====================================================
                    - onkeydown event for input filters
                =====================================================*/
                onKeyDown: function onKeyDown(e) {
                    if (!o.onKeyUp) {
                        return;
                    }
                    o.isUserTyping = true;
                },
                /*====================================================
                    - onblur event for input filters
                =====================================================*/
                onInpBlur: function onInpBlur(e) {
                    if (o.onKeyUp) {
                        o.isUserTyping = false;
                        global.clearInterval(o.onKeyUpTimer);
                    }
                    if (o.ezEditTable) {
                        if (o.editable) {
                            o.ezEditTable.Editable.Set();
                        }
                        if (o.selectable) {
                            o.ezEditTable.Selection.Set();
                        }
                    }
                },
                /*====================================================
                    - onfocus event for input filters
                =====================================================*/
                onInpFocus: function onInpFocus(e) {
                    var _evt = e || global.event;
                    o.activeFilterId = this.getAttribute("id");
                    o.activeFlt = dom.id(o.activeFilterId);
                    if (o.popUpFilters) {
                        evt.cancel(_evt);
                        evt.stop(_evt);
                    }
                    if (o.ezEditTable) {
                        if (o.editable) {
                            o.ezEditTable.Editable.Remove();
                        }
                        if (o.selectable) {
                            o.ezEditTable.Selection.Remove();
                        }
                    }
                },
                /*====================================================
                    - onfocus event for select filters
                =====================================================*/
                onSlcFocus: function onSlcFocus(e) {
                    var _evt = e || global.event;
                    o.activeFilterId = this.getAttribute("id");
                    o.activeFlt = dom.id(o.activeFilterId);
                    // select is populated when element has focus
                    if (o.fillSlcOnDemand && this.getAttribute("filled") === "0") {
                        var ct = this.getAttribute("ct");
                        o.Cpt.dropdown._build(ct);
                    }
                    if (o.popUpFilters) {
                        evt.cancel(_evt);
                        evt.stop(_evt);
                    }
                },
                /*====================================================
                    - onchange event for select filters
                =====================================================*/
                onSlcChange: function onSlcChange(e) {
                    if (!o.activeFlt) {
                        return;
                    }
                    var colIndex = o.activeFlt.getAttribute("colIndex");
                    //Checks filter is a checklist and caller is not null
                    // if(o.activeFlt && colIndex &&
                    //     o['col'+colIndex]===o.fltTypeCheckList &&
                    //     !o.Evt.onSlcChange.caller){ return; }
                    var _evt = e || global.event;
                    if (o.popUpFilters) {
                        evt.stop(_evt);
                    }
                    if (o.onSlcChange) {
                        o.filter();
                    }
                },
                /*====================================================
                    - onblur event for select filters
                =====================================================*/
                // _OnSlcBlur: function(e) {},
                /*====================================================
                    - onclick event for checklist filters
                =====================================================*/
                onCheckListClick: function onCheckListClick() {
                    if (o.fillSlcOnDemand && this.getAttribute("filled") === "0") {
                        var ct = this.getAttribute("ct");
                        o.Cpt.checkList._build(ct);
                        o.Cpt.checkList.checkListDiv[ct].onclick = null;
                        o.Cpt.checkList.checkListDiv[ct].title = "";
                    }
                },
                /*====================================================
                    - onclick event for checklist filter container
                =====================================================*/
                onCheckListFocus: function onCheckListFocus(e) {
                    o.activeFilterId = this.firstChild.getAttribute("id");
                    o.activeFlt = dom.id(o.activeFilterId);
                },
                /*====================================================
                    - onclick event for validation button
                    (btn property)
                =====================================================*/
                onBtnClick: function onBtnClick() {
                    o.filter();
                }
                // ,
                // _OnSlcPagesChangeEvt: null, //used by sort adapter
                /*====================================================
                    - onclick event slc parent node (enables filters)
                    IE only
                =====================================================*/
                // _EnableSlc: function() {
                //     this.firstChild.disabled = false;
                //     this.firstChild.focus();
                //     this.onclick = null;
                // },

                // _Paging: { //used by sort adapter
                //     nextEvt: null,
                //     prevEvt: null,
                //     lastEvt: null,
                //     firstEvt: null
                // }
            };
        }

        _createClass(TableFilter, {
            init: {

                /*====================================================
                    - initialises filtering grid bar behaviours and
                    layout
                =====================================================*/

                value: function init() {
                    if (this._hasGrid) {
                        return;
                    }
                    if (!this.tbl) {
                        this.tbl = dom.id(this.id);
                    }
                    if (this.gridLayout) {
                        this.refRow = this.startRow === null ? 0 : this.startRow;
                    }
                    if (this.popUpFilters && (this.filtersRowIndex === 0 && this.headersRow === 1 || this.gridLayout)) {
                        this.headersRow = 0;
                    }
                    var f = this.cfg,
                        n = this.singleSearchFlt ? 1 : this.nbCells,
                        inpclass;

                    if (window["tf_" + this.id] === undefined) {
                        window["tf_" + this.id] = this;
                    }

                    //loads stylesheet if not imported
                    //Issues with browsers != IE, IE rules in this case
                    this.includeFile(this.stylesheetId, this.stylesheet, null, "link");

                    //loads theme
                    if (this.hasThemes) {
                        this._loadThemes();
                    }

                    if (this.rememberGridValues || this.rememberPageNb || this.rememberPageLen) {
                        //var Store = require('modules/store').Store;
                        // import {Store} from 'modules/store';
                        this.Cpt.store = new Store(this);
                    }

                    if (this.gridLayout) {
                        // var GridLayout = require('modules/gridLayout').GridLayout;
                        // import {GridLayout} from 'modules/gridLayout';
                        this.Cpt.gridLayout = new GridLayout(this);
                        this.Cpt.gridLayout.init();
                    }

                    if (this.loader) {
                        if (!this.Cpt.loader) {
                            // var Loader = require('modules/loader').Loader;
                            // import {Loader} from 'modules/loader';
                            this.Cpt.loader = new Loader(this);
                        }
                    }

                    if (this.highlightKeywords) {
                        // var Highlight =
                        //     require('modules/highlightKeywords').HighlightKeyword;
                        // import {HighlightKeyword} from 'modules/highlightKeywords';
                        this.Cpt.highlightKeyword = new HighlightKeyword(this);
                    }

                    if (this.popUpFilters) {
                        if (!this.Cpt.popupFilter) {
                            // var PopupFilter = require('modules/popupFilter').PopupFilter;
                            // import {PopupFilter} from 'modules/popupFilter';
                            this.Cpt.popupFilter = new PopupFilter(this);
                        }
                        this.Cpt.popupFilter.init();
                    }

                    //filters grid is not generated
                    if (!this.fltGrid) {
                        this.refRow = this.refRow - 1;
                        if (this.gridLayout) {
                            this.refRow = 0;
                        }
                        this.nbFilterableRows = this.getRowsNb();
                        this.nbVisibleRows = this.nbFilterableRows;
                        this.nbRows = this.nbFilterableRows + this.refRow;
                    } else {
                        if (this.isFirstLoad) {
                            var fltrow;
                            if (!this.gridLayout) {
                                var thead = dom.tag(this.tbl, "thead");
                                if (thead.length > 0) {
                                    fltrow = thead[0].insertRow(this.filtersRowIndex);
                                } else {
                                    fltrow = this.tbl.insertRow(this.filtersRowIndex);
                                }

                                if (this.headersRow > 1 && this.filtersRowIndex <= this.headersRow && !this.popUpFilters) {
                                    this.headersRow++;
                                }
                                if (this.popUpFilters) {
                                    this.headersRow++;
                                }

                                fltrow.className = this.fltsRowCssClass;
                                //Disable for grid_layout
                                if (this.isExternalFlt && (!this.gridLayout || this.popUpFilters)) {
                                    fltrow.style.display = "none";
                                }
                            }

                            this.nbFilterableRows = this.getRowsNb();
                            this.nbVisibleRows = this.nbFilterableRows;
                            this.nbRows = this.tbl.rows.length;

                            for (var i = 0; i < n; i++) {
                                // this loop adds filters

                                if (this.popUpFilters) {
                                    this.Cpt.popupFilter.build(i);
                                }

                                var fltcell = dom.create(this.fltCellTag),
                                    col = this["col" + i],
                                    externalFltTgtId = this.isExternalFlt && this.externalFltTgtIds ? this.externalFltTgtIds[i] : null;

                                if (this.singleSearchFlt) {
                                    fltcell.colSpan = this.nbCells;
                                }
                                if (!this.gridLayout) {
                                    fltrow.appendChild(fltcell);
                                }
                                inpclass = i == n - 1 && this.displayBtn ? this.fltSmallCssClass : this.fltCssClass;

                                if (col === undefined) {
                                    col = f["col_" + i] === undefined ? this.fltTypeInp : str.lower(f["col_" + i]);
                                }

                                //only 1 input for single search
                                if (this.singleSearchFlt) {
                                    col = this.fltTypeInp;
                                    inpclass = this.singleFltCssClass;
                                }

                                //drop-down filters
                                if (col === this.fltTypeSlc || col === this.fltTypeMulti) {
                                    if (!this.Cpt.dropdown) {
                                        // var Dropdown = require('modules/dropdown').Dropdown;
                                        // import {Dropdown} from 'modules/dropdown';
                                        this.Cpt.dropdown = new Dropdown(this);
                                    }
                                    var dropdown = this.Cpt.dropdown;

                                    var slc = dom.create(this.fltTypeSlc, ["id", this.prfxFlt + i + "_" + this.id], ["ct", i], ["filled", "0"]);

                                    if (col === this.fltTypeMulti) {
                                        slc.multiple = this.fltTypeMulti;
                                        slc.title = dropdown.multipleSlcTooltip;
                                    }
                                    slc.className = str.lower(col) === this.fltTypeSlc ? inpclass : this.fltMultiCssClass; // for ie<=6

                                    //filter is appended in desired external element
                                    if (externalFltTgtId) {
                                        dom.id(externalFltTgtId).appendChild(slc);
                                        this.externalFltEls.push(slc);
                                    } else {
                                        fltcell.appendChild(slc);
                                    }

                                    this.fltIds.push(this.prfxFlt + i + "_" + this.id);

                                    if (!this.fillSlcOnDemand) {
                                        dropdown._build(i);
                                    }

                                    evt.add(slc, "keypress", this.Evt.detectKey);
                                    evt.add(slc, "change", this.Evt.onSlcChange);
                                    evt.add(slc, "focus", this.Evt.onSlcFocus);
                                    // evt.add(slc, 'blur', this.Evt._OnSlcBlur);

                                    //1st option is created here since dropdown.build isn't
                                    //invoked
                                    if (this.fillSlcOnDemand) {
                                        var opt0 = dom.createOpt(this.displayAllText, "");
                                        slc.appendChild(opt0);
                                    }
                                }
                                // checklist
                                else if (col === this.fltTypeCheckList) {
                                    var checkList;
                                    if (!this.Cpt.checkList) {
                                        // var CheckList =
                                        //         require('modules/checkList').CheckList;
                                        // import {CheckList} from 'modules/checkList';
                                        this.Cpt.checkList = new CheckList(this);
                                        checkList = this.Cpt.checkList;
                                    }

                                    var divCont = dom.create("div", ["id", checkList.prfxCheckListDiv + i + "_" + this.id], ["ct", i], ["filled", "0"]);
                                    divCont.className = checkList.checkListDivCssClass;

                                    //filter is appended in desired element
                                    if (externalFltTgtId) {
                                        dom.id(externalFltTgtId).appendChild(divCont);
                                        this.externalFltEls.push(divCont);
                                    } else {
                                        fltcell.appendChild(divCont);
                                    }

                                    checkList.checkListDiv[i] = divCont;
                                    this.fltIds.push(this.prfxFlt + i + "_" + this.id);
                                    if (!this.fillSlcOnDemand) {
                                        checkList._build(i);
                                    }

                                    if (this.fillSlcOnDemand) {
                                        evt.add(divCont, "click", this.Evt.onCheckListClick);
                                        divCont.appendChild(dom.text(checkList.activateCheckListTxt));
                                    }

                                    evt.add(divCont, "click", this.Evt.onCheckListFocus);
                                } else {
                                    //show/hide input
                                    var inptype = col === this.fltTypeInp ? "text" : "hidden";
                                    var inp = dom.create(this.fltTypeInp, ["id", this.prfxFlt + i + "_" + this.id], ["type", inptype], ["ct", i]);
                                    if (inptype !== "hidden" && this.watermark) {
                                        inp.setAttribute("placeholder", this.isWatermarkArray ? this.watermark[i] || "" : this.watermark);
                                    }
                                    inp.className = inpclass;
                                    inp.onfocus = this.Evt.onInpFocus;

                                    //filter is appended in desired element
                                    if (externalFltTgtId) {
                                        dom.id(externalFltTgtId).appendChild(inp);
                                        this.externalFltEls.push(inp);
                                    } else {
                                        fltcell.appendChild(inp);
                                    }

                                    this.fltIds.push(this.prfxFlt + i + "_" + this.id);

                                    inp.onkeypress = this.Evt.detectKey;
                                    inp.onkeydown = this.Evt.onKeyDown;
                                    inp.onkeyup = this.Evt.onKeyUp;
                                    inp.onblur = this.Evt.onInpBlur;

                                    if (this.rememberGridValues) {
                                        var flts_values = this.Cpt.store.getFilterValues(this.fltsValuesCookie);
                                        if (flts_values[i] != " ") {
                                            this.setFilterValue(i, flts_values[i], false);
                                        }
                                    }
                                }
                                // this adds submit button
                                if (i == n - 1 && this.displayBtn) {
                                    var btn = dom.create(this.fltTypeInp, ["id", this.prfxValButton + i + "_" + this.id], ["type", "button"], ["value", this.btnText]);
                                    btn.className = this.btnCssClass;

                                    //filter is appended in desired element
                                    if (externalFltTgtId) {
                                        dom.id(externalFltTgtId).appendChild(btn);
                                    } else {
                                        fltcell.appendChild(btn);
                                    }

                                    btn.onclick = this.Evt.onBtnClick;
                                } //if
                            } // for i
                        } else {
                            this._resetGrid();
                        } //if isFirstLoad
                    } //if this.fltGrid

                    /* Filter behaviours */
                    if (this.rowsCounter) {
                        // var RowsCounter = require('modules/rowsCounter').RowsCounter;
                        // import {RowsCounter} from 'modules/rowsCounter';
                        this.Cpt.rowsCounter = new RowsCounter(this);
                        this.Cpt.rowsCounter.init();
                    }
                    if (this.statusBar) {
                        // var StatusBar = require('modules/statusBar').StatusBar;
                        // import {StatusBar} from 'modules/statusBar';
                        this.Cpt.statusBar = new StatusBar(this);
                        this.Cpt.statusBar.init();
                    }
                    if (this.paging || this.Cpt.paging && this.Cpt.paging.isPagingRemoved) {
                        // var Paging = require('modules/paging').Paging;
                        // import {Paging} from 'modules/paging';
                        // if(!this.Cpt.paging){
                        this.Cpt.paging = new Paging(this);
                        // }
                        this.Cpt.paging.init();
                    }
                    if (this.btnReset) {
                        // var ClearButton = require('modules/clearButton').ClearButton;
                        // import {ClearButton} from 'modules/clearButton';
                        this.Cpt.clearButton = new ClearButton(this);
                        this.Cpt.clearButton.init();
                    }
                    if (this.helpInstructions) {
                        // var Help = require('modules/help').Help;
                        // import {Help} from 'modules/help';
                        this.Cpt.help = new Help(this);
                        this.Cpt.help.init();
                    }
                    if (this.hasColWidth && !this.gridLayout) {
                        this.setColWidths();
                    }
                    if (this.alternateBgs) {
                        //1st time only if no paging and rememberGridValues
                        // var AlternateRows = require('modules/alternateRows').AlternateRows;
                        // import {AlternateRows} from 'modules/alternateRows';
                        this.Cpt.alternateRows = new AlternateRows(this);
                        this.Cpt.alternateRows.init();
                    }
                    if (this.hasColOperation) {
                        // var ColOps = require('modules/colOps').ColOps;
                        // import {ColOps} from 'modules/colOps';
                        this.Cpt.colOps = new ColOps(this);
                        this.Cpt.colOps.calc();
                    }
                    if (this.sort /*|| this.gridLayout*/) {
                        this.setSort();
                    }
                    if (this.selectable || this.editable) {
                        this.setEditable();
                    }

                    this.isFirstLoad = false;
                    this._hasGrid = true;

                    if (this.rememberGridValues || this.rememberPageLen || this.rememberPageNb) {
                        this.resetValues();
                    }

                    //TF css class is added to table
                    if (!this.gridLayout) {
                        dom.addClass(this.tbl, this.prfxTf);
                    }

                    if (this.loader) {
                        this.Cpt.loader.show("none");
                    }

                    /* Loads extensions */
                    if (this.hasExtensions) {
                        // this.loadExtensions();
                        this.registerExtensions();
                        // this.initExtensions();
                    }

                    if (this.onFiltersLoaded) {
                        this.onFiltersLoaded.call(null, this);
                    }
                }
            },
            EvtManager: {

                /*====================================================
                    - TF events manager
                    - Params:
                        - event name (string)
                        - config object (optional literal object)
                =====================================================*/

                value: function EvtManager(evt, s) {
                    var o = this;
                    var slcIndex = s && s.slcIndex !== undefined ? s.slcIndex : null;
                    var slcExternal = s && s.slcExternal !== undefined ? s.slcExternal : false;
                    var slcId = s && s.slcId !== undefined ? s.slcId : null;
                    var pgIndex = s && s.pgIndex !== undefined ? s.pgIndex : null;

                    function efx() {
                        if (!evt) {
                            return;
                        }
                        switch (evt) {
                            case o.Evt.name.filter:
                                if (o.isModFilterFn) {
                                    o.modFilterFn.call(null, o);
                                } else {
                                    o._filter();
                                }
                                break;
                            case o.Evt.name.dropdown:
                                if (o.linkedFilters) {
                                    o.Cpt.dropdown._build(slcIndex, true);
                                } else {
                                    o.Cpt.dropdown._build(slcIndex, false, slcExternal, slcId);
                                }
                                break;
                            case o.Evt.name.checklist:
                                o.Cpt.checkList._build(slcIndex, slcExternal, slcId);
                                break;
                            case o.Evt.name.changepage:
                                o.Cpt.paging._changePage(pgIndex);
                                break;
                            case o.Evt.name.clear:
                                o._clearFilters();
                                o._filter();
                                break;
                            case o.Evt.name.changeresultsperpage:
                                o.Cpt.paging._changeResultsPerPage();
                                break;
                            case o.Evt.name.resetvalues:
                                o._resetValues();
                                o._filter();
                                break;
                            case o.Evt.name.resetpage:
                                o.Cpt.paging._resetPage(o.pgNbCookie);
                                break;
                            case o.Evt.name.resetpagelength:
                                o.Cpt.paging._resetPageLength(o.pgLenCookie);
                                break;
                            case o.Evt.name.sort:
                                void 0;
                                break;
                            case o.Evt.name.loadextensions:
                                o._loadExtensions();
                                break;
                            case o.Evt.name.loadthemes:
                                o._loadThemes();
                                break;
                            default:
                                //to be used by extensions events when needed
                                o["_" + evt].call(null, o, s);
                                break;
                        }
                        if (o.statusBar) {
                            o.Cpt.statusBar.message("");
                        }
                        if (o.loader) {
                            o.Cpt.loader.show("none");
                        }
                    }

                    if (this.loader || this.statusBar) {
                        try {
                            this.Cpt.loader.show("");
                            this.Cpt.statusBar.message(this["msg" + evt]);
                        } catch (e) {}
                        global.setTimeout(efx, this.execDelay);
                    } else {
                        efx();
                    }
                }
            },
            registerExtensions: {
                value: function registerExtensions() {
                    var exts = this.extensions;
                    if (exts.length === 0) {
                        return;
                    }

                    for (var i = 0; i < exts.length; i++) {
                        var ext = exts[i];
                        if (types.isUndef(this.ExtRegistry[ext.name])) {
                            this.loadExtension(ext);
                        }
                    }
                }
            },
            loadExtension: {
                value: function loadExtension(ext) {
                    var _this = this;

                    if (!ext || !ext.name || !ext.src) {
                        return;
                    }
                    var sys = global.System,
                        className = ext.name,
                        tf = this;

                    sys.config({
                        baseURL: tf.basePath
                    });

                    sys["import"](ext.src.replace(".js", "")).then(function (m) {
                        _this.ExtRegistry[className] = new m[className](_this, ext);
                    });
                }
            },
            loadThemes: {
                value: function loadThemes() {
                    this.EvtManager(this.Evt.name.loadthemes);
                }
            },
            _loadThemes: {

                /*====================================================
                    - loads TF themes
                =====================================================*/

                value: function _loadThemes() {
                    if (!this.hasThemes) {
                        return;
                    }
                    if (!this.Thm) {
                        /*** TF themes ***/
                        var o = this;
                        this.Thm = {
                            list: {},
                            add: function add(thmName, thmDesc, thmPath, thmCallBack) {
                                var file = thmPath.split("/")[thmPath.split("/").length - 1],
                                    re = new RegExp(file),
                                    path = thmPath.replace(re, "");
                                o.Thm.list[thmName] = {
                                    name: thmName,
                                    description: thmDesc,
                                    file: file,
                                    path: path,
                                    callback: thmCallBack
                                };
                            }
                        };
                    }

                    //Default theme config
                    if (this.enableDefaultTheme) {
                        this.themes = {
                            name: ["DefaultTheme"],
                            src: [this.themesPath + "Default/TF_Default.css"],
                            description: ["Default Theme"]
                        };
                        this.Thm.add("DefaultTheme", this.themesPath + "Default/TF_Default.css", "Default Theme");
                    }
                    if (types.isArray(this.themes.name) && types.isArray(this.themes.src)) {
                        var thm = this.themes;
                        for (var i = 0; i < thm.name.length; i++) {
                            var thmPath = thm.src[i],
                                thmName = thm.name[i],
                                thmInit = thm.initialize && thm.initialize[i] ? thm.initialize[i] : null,
                                thmDesc = thm.description && thm.description[i] ? thm.description[i] : null;

                            //Registers theme
                            this.Thm.add(thmName, thmDesc, thmPath, thmInit);

                            if (!this.isImported(thmPath, "link")) {
                                this.includeFile(thmName, thmPath, null, "link");
                            }
                            if (types.isFn(thmInit)) {
                                thmInit.call(null, this);
                            }
                        }
                    }

                    //Some elements need to be overriden for theme
                    //Reset button
                    this.btnResetText = null;
                    this.btnResetHtml = "<input type=\"button\" value=\"\" class=\"" + this.btnResetCssClass + "\" title=\"Clear filters\" />";

                    //Paging buttons
                    this.btnPrevPageHtml = "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " previousPage\" title=\"Previous page\" />";
                    this.btnNextPageHtml = "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " nextPage\" title=\"Next page\" />";
                    this.btnFirstPageHtml = "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " firstPage\" title=\"First page\" />";
                    this.btnLastPageHtml = "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " lastPage\" title=\"Last page\" />";

                    //Loader
                    this.loader = true;
                    this.loaderHtml = "<div class=\"defaultLoader\"></div>";
                    this.loaderText = null;
                }
            },
            remove: {

                /*====================================================
                    - removes a filter grid
                =====================================================*/

                value: function remove() {
                    if (this.fltGrid && this._hasGrid) {
                        var rows = this.tbl.rows;
                        if (this.paging) {
                            this.Cpt.paging.destroy();
                        }
                        if (this.statusBar) {
                            this.Cpt.statusBar.destroy();
                        }
                        if (this.rowsCounter) {
                            this.Cpt.rowsCounter.destroy();
                        }
                        if (this.btnReset) {
                            this.Cpt.clearButton.destroy();
                        }
                        if (this.helpInstructions) {
                            this.Cpt.help.destroy();
                        }
                        if (this.isExternalFlt && !this.popUpFilters) {
                            this.removeExternalFlts();
                        }
                        if (this.infDiv) {
                            this.removeToolbar();
                        }
                        if (this.highlightKeywords) {
                            this.Cpt.highlightKeyword.unhighlightAll();
                        }
                        if (this.sort) {
                            // this.RemoveSort();
                            this.ExtRegistry.sort.destroy();
                        }
                        if (this.loader) {
                            this.Cpt.loader.remove();
                        }
                        if (this.popUpFilters) {
                            this.Cpt.popupFilter.destroy();
                        }
                        if (this.markActiveColumns) {
                            this.clearActiveColumns();
                        }
                        if (this.editable || this.selectable) {
                            this.removeEditable();
                        }
                        //this loop shows all rows and removes validRow attribute
                        for (var j = this.refRow; j < this.nbRows; j++) {
                            rows[j].style.display = "";
                            try {
                                if (rows[j].hasAttribute("validRow")) {
                                    rows[j].removeAttribute("validRow");
                                }
                            } catch (e) {
                                //ie<=6 doesn't support hasAttribute method
                                var row = rows[j];
                                var attribs = row.attributes;
                                for (var x = 0; x < attribs.length; x++) {
                                    if (str.lower(attribs.nodeName) === "validrow") {
                                        row.removeAttribute("validRow");
                                    }
                                }
                            }

                            //removes alternating colors
                            if (this.alternateBgs) {
                                this.Cpt.alternateRows.removeRowBg(j);
                            }
                        } //for j

                        if (this.fltGrid && !this.gridLayout) {
                            this.fltGridEl = rows[this.filtersRowIndex];
                            this.tbl.deleteRow(this.filtersRowIndex);
                        }
                        if (this.gridLayout) {
                            this.Cpt.gridLayout.destroy();
                        }
                        dom.removeClass(this.tbl, this.prfxTf);
                        this.activeFlt = null;
                        this.isStartBgAlternate = true;
                        this._hasGrid = false;
                        this.tbl = null;
                    } //if this.fltGrid
                }
            },
            setToolbar: {

                /*====================================================
                    - Generates div above table where paging,
                    reset button, rows counter label etc. are placed
                =====================================================*/

                value: function setToolbar() {
                    if (this.infDiv !== null) {
                        return;
                    }

                    /*** container div ***/
                    var infdiv = dom.create("div", ["id", this.prfxInfDiv + this.id]);
                    infdiv.className = this.infDivCssClass;

                    //custom container
                    if (this.toolBarTgtId) {
                        dom.id(this.toolBarTgtId).appendChild(infdiv);
                    }
                    //grid-layout
                    else if (this.gridLayout) {
                        var gridLayout = this.Cpt.gridLayout;
                        gridLayout.tblMainCont.appendChild(infdiv);
                        infdiv.className = gridLayout.gridInfDivCssClass;
                    }
                    //default location: just above the table
                    else {
                        this.tbl.parentNode.insertBefore(infdiv, this.tbl);
                    }
                    this.infDiv = dom.id(this.prfxInfDiv + this.id);

                    /*** left div containing rows # displayer ***/
                    var ldiv = dom.create("div", ["id", this.prfxLDiv + this.id]);
                    ldiv.className = this.lDivCssClass;
                    infdiv.appendChild(ldiv);
                    this.lDiv = dom.id(this.prfxLDiv + this.id);

                    /***    right div containing reset button
                            + nb results per page select    ***/
                    var rdiv = dom.create("div", ["id", this.prfxRDiv + this.id]);
                    rdiv.className = this.rDivCssClass;
                    infdiv.appendChild(rdiv);
                    this.rDiv = dom.id(this.prfxRDiv + this.id);

                    /*** mid div containing paging elements ***/
                    var mdiv = dom.create("div", ["id", this.prfxMDiv + this.id]);
                    mdiv.className = this.mDivCssClass;
                    infdiv.appendChild(mdiv);
                    this.mDiv = dom.id(this.prfxMDiv + this.id);

                    // Enable help instructions by default is topbar is generated
                    if (!this.helpInstructions) {
                        if (!this.Cpt.help) {
                            // var Help = require('modules/help').Help;
                            // import {Help} from 'modules/help';
                            this.Cpt.help = new Help(this);
                        }
                        this.Cpt.help.init();
                    }
                }
            },
            removeToolbar: {

                /*====================================================
                    - Removes div above table where paging,
                    reset button, rows counter label etc. are placed
                =====================================================*/

                value: function removeToolbar() {
                    if (!this.infDiv) {
                        return;
                    }
                    this.infDiv.parentNode.removeChild(this.infDiv);
                    this.infDiv = null;
                }
            },
            removeExternalFlts: {

                /*====================================================
                    - removes external filters
                =====================================================*/

                value: function removeExternalFlts() {
                    if (!this.isExternalFlt && !this.externalFltTgtIds) {
                        return;
                    }
                    for (var ct = 0; ct < this.externalFltTgtIds.length; ct++) {
                        var externalFltTgtId = this.externalFltTgtIds[ct],
                            externalFlt = dom.id(externalFltTgtId);
                        if (externalFlt) {
                            externalFlt.innerHTML = "";
                        }
                    }
                }
            },
            setSort: {

                /*====================================================
                    - Sets sorting feature by loading
                    WebFX Sortable Table 1.12 plugin by Erik Arvidsson
                    and TF adapter by Max Guglielmi
                =====================================================*/

                value: function setSort() {
                    var adapterSortabletable = new AdapterSortableTable(this);
                    this.ExtRegistry.sort = adapterSortabletable;
                    adapterSortabletable.init();
                }
            },
            setOldSort: {
                value: function setOldSort() {
                    var fn = this.Evt._EnableSort,
                        sortConfig = this.sortConfig,
                        o = this;

                    if (!types.isFn(fn)) {

                        /*====================================================
                            - enables table sorting
                        =====================================================*/
                        this.Evt._EnableSort = function () {
                            //gridLayout needs sort to be re-enabled
                            if (o.isSortEnabled && !o.gridLayout) {
                                return;
                            }

                            // if(o.isImported(sortConfig.adapterSrc)){
                            //     sortConfig.initialize.call(null,o);
                            // } else {
                            //     o.includeFile(
                            //         sortConfig.name+'_adapter',
                            //         sortConfig.adapterSrc,
                            //         function(){ sortConfig.initialize.call(null, o); }
                            //     );
                            // }
                            // define(
                            //     'extensions/sortabletable/adapterSortabletable',
                            //     function(){}
                            // );
                            // require.config({
                            //     baseUrl: '../dist',
                            //     paths: {
                            //         'a': '/tablefilter',
                            //         'SortableTable':
                            //             '/extensions/sortabletable/sortabletable',
                            //         'sortabletable':
                            //             '/extensions/sortabletable/adapterSortabletable'
                            //     },
                            //     name: '../dist/extensions/sortabletable/adapterSortabletable'
                            // });

                            // Lazy loading for the sort extension
                            // console.log('lazy', define);
                            // define(['require'], function(require){
                            //     console.log(require);
                            //
                            var AdapterSortableTable = require(["extensions/sortabletable/adapterSortabletable"], function (adapterSortabletable) {
                                o.ExtRegistry.sort = new adapterSortabletable(o);
                                o.ExtRegistry.sort.init();
                            });

                            // o.includeFile(
                            //     'sortConfig.name',
                            //     o.basePath + '/extensions/sortabletable/adapterSortabletable.js',
                            //     function(){
                            //         console.log(AdapterSortableTable);
                            //     });

                            // });
                        };
                    }

                    function loadSortableTable() {
                        console.log("loadSortable");
                        if (o.isImported(sortConfig.src)) {
                            o.Evt._EnableSort();
                        } else {
                            o.includeFile(sortConfig.name, sortConfig.src, o.Evt._EnableSort);
                        }
                    }

                    // Import require.js if required for production environment
                    console.log("is require loaded: " + o.isImported("require.js"));
                    if (o.isImported("require.js")) {
                        loadSortableTable();
                    } else {
                        o.includeFile("tf-requirejs", o.basePath + "require.js", o.Evt._EnableSort);

                        // o.includeFile('tf-requirejs',
                        //     o.basePath + 'require.js',
                        //     function(){
                        // Lazy loading for the sort extension
                        // console.log('lazy', define);
                        // define(['require'], function(require){
                        //     console.log(require);
                        //     var AdapterSortableTable = require(
                        //         ['extensions/sortabletable/adapterSortabletable'],
                        //         function(adapterSortabletable){
                        //             console.log(adapterSortabletable);
                        //             // o.ExtRegistry.sort = new adapterSortabletable(o);
                        //             // o.ExtRegistry.sort.init();
                        //     });
                        // });
                        //     }
                        // );
                    }
                }
            },
            performSort: {

                /*====================================================
                    - removes sorting feature
                =====================================================*/
                // removeSort(){
                //     this.sort = false;
                // }

                value: function performSort() {
                    this.EvtManager(this.Evt.name.sort);
                }
            },
            setEditable: {

                /*====================================================
                    - Sets selection or edition features by loading
                    ezEditTable script by Max Guglielmi
                =====================================================*/

                value: function setEditable() {
                    var ezEditConfig = this.ezEditTableConfig;
                    if (this.isImported(ezEditConfig.src)) {
                        this._enableEditable();
                    } else {
                        this.includeFile(ezEditConfig.name, ezEditConfig.src, this._enableEditable);
                    }
                    if (ezEditConfig.loadStylesheet && !this.isImported(ezEditConfig.stylesheet, "link")) {
                        this.includeFile(ezEditConfig.stylesheetName, ezEditConfig.stylesheet, null, "link");
                    }
                }
            },
            removeEditable: {

                /*====================================================
                    - Removes selection or edition features
                =====================================================*/

                value: function removeEditable() {
                    var ezEditTable = this.ezEditTable;
                    if (ezEditTable) {
                        if (this.selectable) {
                            ezEditTable.Selection.ClearSelections();
                            ezEditTable.Selection.Remove();
                        }
                        if (this.editable) {
                            ezEditTable.Editable.Remove();
                        }
                    }
                }
            },
            resetEditable: {

                /*====================================================
                    - Resets selection or edition features after
                    removal
                =====================================================*/

                value: function resetEditable() {
                    var ezEditTable = this.ezEditTable;
                    if (ezEditTable) {
                        if (this.selectable) {
                            ezEditTable.Selection.Set();
                        }
                        if (this.editable) {
                            ezEditTable.Editable.Set();
                        }
                    }
                }
            },
            _enableEditable: {
                value: function _enableEditable(o) {
                    if (!o) {
                        o = this;
                    }

                    //start row for EditTable constructor needs to be calculated
                    var startRow,
                        ezEditConfig = o.ezEditTableConfig,
                        thead = dom.tag(o.tbl, "thead");

                    //if thead exists and startRow not specified, startRow is calculated
                    //automatically by EditTable
                    if (thead.length > 0 && !ezEditConfig.startRow) {
                        startRow = undefined;
                    }
                    //otherwise startRow config property if any or TableFilter refRow
                    else {
                        startRow = ezEditConfig.startRow || o.refRow;
                    }

                    ezEditConfig.scroll_into_view = ezEditConfig.scroll_into_view === false ? false : true;
                    ezEditConfig.base_path = ezEditConfig.base_path || o.basePath + "ezEditTable/";
                    ezEditConfig.editable = o.editable = o.cfg.editable;
                    ezEditConfig.selection = o.selectable = o.cfg.selectable;

                    if (o.selectable) {
                        ezEditConfig.default_selection = ezEditConfig.default_selection || "row";
                    }
                    //CSS Styles
                    ezEditConfig.active_cell_css = ezEditConfig.active_cell_css || "ezETSelectedCell";

                    o._lastValidRowIndex = 0;
                    o._lastRowIndex = 0;

                    if (o.selectable) {
                        //Row navigation needs to be calculated according to TableFilter's
                        //validRowsIndex array
                        var onAfterSelection = function onAfterSelection(et, selectedElm, e) {
                            var slc = et.Selection;
                            //Next valid filtered row needs to be selected
                            var doSelect = function doSelect(nextRowIndex) {
                                if (et.defaultSelection === "row") {
                                    slc.SelectRowByIndex(nextRowIndex);
                                } else {
                                    et.ClearSelections();
                                    var cellIndex = selectedElm.cellIndex,
                                        row = o.tbl.rows[nextRowIndex];
                                    if (et.defaultSelection === "both") {
                                        slc.SelectRowByIndex(nextRowIndex);
                                    }
                                    if (row) {
                                        slc.SelectCell(row.cells[cellIndex]);
                                    }
                                }
                                //Table is filtered
                                if (o.validRowsIndex.length !== o.getRowsNb()) {
                                    var r = o.tbl.rows[nextRowIndex];
                                    if (r) {
                                        r.scrollIntoView(false);
                                    }
                                    if (cell) {
                                        if (cell.cellIndex === o.getCellsNb() - 1 && o.gridLayout) {
                                            o.tblCont.scrollLeft = 100000000;
                                        } else if (cell.cellIndex === 0 && o.gridLayout) {
                                            o.tblCont.scrollLeft = 0;
                                        } else {
                                            cell.scrollIntoView(false);
                                        }
                                    }
                                }
                            };

                            //table is not filtered
                            if (!o.validRowsIndex) {
                                return;
                            }
                            var validIndexes = o.validRowsIndex,
                                validIdxLen = validIndexes.length,
                                row = et.defaultSelection !== "row" ? selectedElm.parentNode : selectedElm,

                            //cell for default_selection = 'both' or 'cell'
                            cell = selectedElm.nodeName === "TD" ? selectedElm : null,
                                keyCode = e !== undefined ? et.Event.GetKey(e) : 0,
                                isRowValid = array.has(validIndexes, row.rowIndex),
                                nextRowIndex,

                            //pgup/pgdown keys
                            d = keyCode === 34 || keyCode === 33 ? o.pagingLength || et.nbRowsPerPage : 1;

                            //If next row is not valid, next valid filtered row needs to be
                            //calculated
                            if (!isRowValid) {
                                //Selection direction up/down
                                if (row.rowIndex > o._lastRowIndex) {
                                    //last row
                                    if (row.rowIndex >= validIndexes[validIdxLen - 1]) {
                                        nextRowIndex = validIndexes[validIdxLen - 1];
                                    } else {
                                        var calcRowIndex = o._lastValidRowIndex + d;
                                        if (calcRowIndex > validIdxLen - 1) {
                                            nextRowIndex = validIndexes[validIdxLen - 1];
                                        } else {
                                            nextRowIndex = validIndexes[calcRowIndex];
                                        }
                                    }
                                } else {
                                    //first row
                                    if (row.rowIndex <= validIndexes[0]) {
                                        nextRowIndex = validIndexes[0];
                                    } else {
                                        var v = validIndexes[o._lastValidRowIndex - d];
                                        nextRowIndex = v ? v : validIndexes[0];
                                    }
                                }
                                o._lastRowIndex = row.rowIndex;
                                doSelect(nextRowIndex);
                            } else {
                                //If filtered row is valid, special calculation for
                                //pgup/pgdown keys
                                if (keyCode !== 34 && keyCode !== 33) {
                                    o._lastValidRowIndex = array.indexByValue(validIndexes, row.rowIndex);
                                    o._lastRowIndex = row.rowIndex;
                                } else {
                                    if (keyCode === 34) {
                                        //pgdown
                                        //last row
                                        if (o._lastValidRowIndex + d <= validIdxLen - 1) {
                                            nextRowIndex = validIndexes[o._lastValidRowIndex + d];
                                        } else {
                                            nextRowIndex = [validIdxLen - 1];
                                        }
                                    } else {
                                        //pgup
                                        //first row
                                        if (o._lastValidRowIndex - d <= validIndexes[0]) {
                                            nextRowIndex = validIndexes[0];
                                        } else {
                                            nextRowIndex = validIndexes[o._lastValidRowIndex - d];
                                        }
                                    }
                                    o._lastRowIndex = nextRowIndex;
                                    o._lastValidRowIndex = array.indexByValue(validIndexes, nextRowIndex);
                                    doSelect(nextRowIndex);
                                }
                            }
                        };

                        //Page navigation has to be enforced whenever selected row is out of
                        //the current page range
                        var onBeforeSelection = function onBeforeSelection(et, selectedElm, e) {
                            var row = et.defaultSelection !== "row" ? selectedElm.parentNode : selectedElm;
                            if (o.paging) {
                                if (o.Cpt.paging.nbPages > 1) {
                                    var paging = o.Cpt.paging;
                                    //page length is re-assigned in case it has changed
                                    et.nbRowsPerPage = paging.pagingLength;
                                    var validIndexes = o.validRowsIndex,
                                        validIdxLen = validIndexes.length,
                                        pagingEndRow = parseInt(paging.startPagingRow, 10) + parseInt(paging.pagingLength, 10);
                                    var rowIndex = row.rowIndex;

                                    if (rowIndex === validIndexes[validIdxLen - 1] && paging.currentPageNb !== paging.nbPages) {
                                        paging.setPage("last");
                                    } else if (rowIndex == validIndexes[0] && paging.currentPageNb !== 1) {
                                        paging.setPage("first");
                                    } else if (rowIndex > validIndexes[pagingEndRow - 1] && rowIndex < validIndexes[validIdxLen - 1]) {
                                        paging.setPage("next");
                                    } else if (rowIndex < validIndexes[paging.startPagingRow] && rowIndex > validIndexes[0]) {
                                        paging.setPage("previous");
                                    }
                                }
                            }
                        };

                        //Selected row needs to be visible when paging is activated
                        if (o.paging) {
                            o.onAfterChangePage = function (tf, i) {
                                var et = tf.ExtRegistry.ezEditTable;
                                var slc = et.Selection;
                                var row = slc.GetActiveRow();
                                if (row) {
                                    row.scrollIntoView(false);
                                }
                                var cell = slc.GetActiveCell();
                                if (cell) {
                                    cell.scrollIntoView(false);
                                }
                            };
                        }

                        //Rows navigation when rows are filtered is performed with the
                        //EditTable row selection callback events
                        if (ezEditConfig.default_selection === "row") {
                            var fnB = ezEditConfig.on_before_selected_row;
                            ezEditConfig.on_before_selected_row = function () {
                                onBeforeSelection(arguments[0], arguments[1], arguments[2]);
                                if (fnB) {
                                    fnB.call(null, arguments[0], arguments[1], arguments[2]);
                                }
                            };
                            var fnA = ezEditConfig.on_after_selected_row;
                            ezEditConfig.on_after_selected_row = function () {
                                onAfterSelection(arguments[0], arguments[1], arguments[2]);
                                if (fnA) {
                                    fnA.call(null, arguments[0], arguments[1], arguments[2]);
                                }
                            };
                        } else {
                            var fnD = ezEditConfig.on_before_selected_cell;
                            ezEditConfig.on_before_selected_cell = function () {
                                onBeforeSelection(arguments[0], arguments[1], arguments[2]);
                                if (fnD) {
                                    fnD.call(null, arguments[0], arguments[1], arguments[2]);
                                }
                            };
                            var fnC = ezEditConfig.on_after_selected_cell;
                            ezEditConfig.on_after_selected_cell = function () {
                                onAfterSelection(arguments[0], arguments[1], arguments[2]);
                                if (fnC) {
                                    fnC.call(null, arguments[0], arguments[1], arguments[2]);
                                }
                            };
                        }
                    }
                    if (o.editable) {
                        //Added or removed rows, TF rows number needs to be re-calculated
                        var fnE = ezEditConfig.on_added_dom_row;
                        ezEditConfig.on_added_dom_row = function () {
                            o.nbFilterableRows++;
                            if (!o.paging) {
                                o.Cpt.rowsCounter.refresh();
                            } else {
                                o.nbRows++;
                                o.nbVisibleRows++;
                                o.nbFilterableRows++;
                                o.paging = false;
                                o.Cpt.paging.destroy();
                                o.Cpt.paging.addPaging();
                            }
                            if (o.alternateBgs) {
                                o.Cpt.alternateRows.init();
                            }
                            if (fnE) {
                                fnE.call(null, arguments[0], arguments[1], arguments[2]);
                            }
                        };
                        if (ezEditConfig.actions && ezEditConfig.actions["delete"]) {
                            var fnF = ezEditConfig.actions["delete"].on_after_submit;
                            ezEditConfig.actions["delete"].on_after_submit = function () {
                                o.nbFilterableRows--;
                                if (!o.paging) {
                                    o.Cpt.rowsCounter.refresh();
                                } else {
                                    o.nbRows--;
                                    o.nbVisibleRows--;
                                    o.nbFilterableRows--;
                                    o.paging = false;
                                    o.Cpt.paging.destroy();
                                    o.Cpt.paging.addPaging(false);
                                }
                                if (o.alternateBgs) {
                                    o.Cpt.alternateRows.init();
                                }
                                if (fnF) {
                                    fnF.call(null, arguments[0], arguments[1]);
                                }
                            };
                        }
                    }

                    try {
                        o.ExtRegistry.ezEditTable = new EditTable(o.id, ezEditConfig, startRow);
                        o.ExtRegistry.ezEditTable.Init();
                    } catch (e) {
                        console.log(ezEditConfig.err);
                    }
                }
            },
            resetValues: {

                /*====================================================
                    - IE bug: it seems there is no way to make
                    multiple selections programatically, only last
                    selection is kept (multiple select previously
                    populated via DOM)
                    - Work-around: defer selection with a setTimeout
                    If you find a more elegant solution to
                    this let me know ;-)
                    - For the moment only this solution seems to work!
                    - Params:
                        - slc = select object (select obj)
                        - index to be selected (integer)
                        - execute filtering (boolean)
                =====================================================*/
                // __deferMultipleSelection: function(slc,index,filter){
                //     if(str.lower(slc.nodeName)!=='select'){
                //         return;
                //     }
                //     var doFilter = filter===undefined ? false : filter;
                //     var o = this;
                //     global.setTimeout(function(){
                //         slc.options[0].selected = false;

                //         if(slc.options[index].value===''){
                //             slc.options[index].selected = false;
                //         }
                //         else{
                //             slc.options[index].selected = true;
                //             if(doFilter){
                //                 o.filter();
                //             }
                //         }
                //     }, 0.1);
                // },

                /*====================================================
                    - Returns an array [[values],[texts]] with
                    custom values for a given filter
                    - Param: column index (integer)
                =====================================================*/
                // _getCustomValues: function(colIndex){
                //     if(!colIndex){
                //         return;
                //     }
                //     //custom select test
                //     var isCustomSlc = this.hasCustomSlcOptions &&
                //             array.has(this.customSlcOptions.cols, colIndex);
                //     if(!isCustomSlc){
                //         return;
                //     }
                //     var optTxt = [], optArray = [];
                //     var index = array.indexByValue(this.customSlcOptions.cols, colIndex);
                //     var slcValues = this.customSlcOptions.values[index];
                //     var slcTexts = this.customSlcOptions.texts[index];
                //     var slcSort = this.customSlcOptions.sorts[index];
                //     for(var r=0; r<slcValues.length; r++){
                //         optArray.push(slcValues[r]);
                //         if(slcTexts[r]){
                //             optTxt.push(slcTexts[r]);
                //         } else {
                //             optTxt.push(slcValues[r]);
                //         }
                //     }
                //     if(slcSort){
                //         optArray.sort();
                //         optTxt.sort();
                //     }
                //     return [optArray,optTxt];
                // },

                value: function resetValues() {
                    this.EvtManager(this.Evt.name.resetvalues);
                }
            },
            _resetValues: {

                /*==============================================
                    - re-sets grid values when page is
                    re-loaded. It invokes resetGridValues,
                    ResetPage and ResetPageLength methods
                    - Params:
                        - name: cookie name (string)
                ===============================================*/

                value: function _resetValues() {
                    //only fillSlcOnDemand
                    if (this.rememberGridValues && this.fillSlcOnDemand) {
                        this.resetGridValues(this.fltsValuesCookie);
                    }
                    if (this.rememberPageLen) {
                        // this.ResetPageLength(this.pgLenCookie);
                        this.Cpt.paging.resetPageLength(this.pgLenCookie);
                    }
                    if (this.rememberPageNb) {
                        // this.ResetPage(this.pgNbCookie);
                        this.Cpt.paging.resetPage(this.pgNbCookie);
                    }
                }
            },
            resetGridValues: {

                /*==============================================
                    - re-sets filters' values when page is
                    re-loaded if load on demand is enabled
                    - Params:
                        - name: cookie name (string)
                    - credits to Florent Hirchy
                ===============================================*/

                value: function resetGridValues(name) {
                    if (!this.fillSlcOnDemand) {
                        return;
                    }
                    var fltsValues = this.Cpt.store.getFilterValues(name),
                        slcFltsIndex = this.getFiltersByType(this.fltTypeSlc, true),
                        multiFltsIndex = this.getFiltersByType(this.fltTypeMulti, true);

                    //if the number of columns is the same as before page reload
                    if (Number(fltsValues[fltsValues.length - 1]) === this.fltIds.length) {
                        for (var i = 0; i < fltsValues.length - 1; i++) {
                            if (fltsValues[i] === " ") {
                                continue;
                            }
                            var s, opt;
                            // if fillSlcOnDemand, drop-down needs to contain stored
                            // value(s) for filtering
                            if (this["col" + i] === this.fltTypeSlc || this["col" + i] === this.fltTypeMulti) {
                                var slc = dom.id(this.fltIds[i]);
                                slc.options[0].selected = false;

                                //selects
                                if (array.has(slcFltsIndex, i)) {
                                    opt = dom.createOpt(fltsValues[i], fltsValues[i], true);
                                    slc.appendChild(opt);
                                    this.hasStoredValues = true;
                                }
                                //multiple select
                                if (array.has(multiFltsIndex, i)) {
                                    s = fltsValues[i].split(" " + this.orOperator + " ");
                                    for (j = 0; j < s.length; j++) {
                                        if (s[j] === "") {
                                            continue;
                                        }
                                        opt = dom.createOpt(s[j], s[j], true);
                                        slc.appendChild(opt);
                                        this.hasStoredValues = true;

                                        // IE multiple selection work-around
                                        // if(hlp.isIE()){
                                        //     this.__deferMultipleSelection(slc,j,false);
                                        //     hasStoredValues = false;
                                        // }
                                    }
                                } // if multiFltsIndex
                            } else if (this["col" + i] == this.fltTypeCheckList) {
                                var checkList = this.Cpt.checkList;
                                var divChk = checkList.checkListDiv[i];
                                divChk.title = divChk.innerHTML;
                                divChk.innerHTML = "";

                                var ul = dom.create("ul", ["id", this.fltIds[i]], ["colIndex", i]);
                                ul.className = checkList.checkListCssClass;

                                var li0 = dom.createCheckItem(this.fltIds[i] + "_0", "", this.displayAllText);
                                li0.className = checkList.checkListItemCssClass;
                                ul.appendChild(li0);

                                divChk.appendChild(ul);

                                s = fltsValues[i].split(" " + this.orOperator + " ");
                                for (j = 0; j < s.length; j++) {
                                    if (s[j] === "") {
                                        continue;
                                    }
                                    var li = dom.createCheckItem(this.fltIds[i] + "_" + (j + 1), s[j], s[j]);
                                    li.className = checkList.checkListItemCssClass;
                                    ul.appendChild(li);
                                    li.check.checked = true;
                                    checkList.setCheckListValues(li.check);
                                    this.hasStoredValues = true;
                                }
                            }
                        } //end for

                        if (!this.hasStoredValues && this.paging) {
                            this.Cpt.paging.setPagingInfo();
                        }
                    } //end if
                }
            },
            filter: {
                value: function filter() {
                    this.EvtManager(this.Evt.name.filter);
                }
            },
            _filter: {
                /*====================================================
                    - Filtering fn
                    - retrieves data from each td in every single tr
                    and compares to search string for current
                    column
                    - tr is hidden if all search strings are not
                    found
                =====================================================*/

                value: function _filter() {
                    if (!this.fltGrid || !this._hasGrid && !this.isFirstLoad) {
                        return;
                    }
                    //invokes onbefore callback
                    if (this.onBeforeFilter) {
                        this.onBeforeFilter.call(null, this);
                    }

                    var row = this.tbl.rows,
                        f = this.cfg,
                        hiddenrows = 0;
                    this.validRowsIndex = [];
                    var o = this;

                    // removes keyword highlighting
                    if (this.highlightKeywords) {
                        this.Cpt.highlightKeyword.unhighlightAll();
                    }
                    //removes popup filters active icons
                    if (this.popUpFilters) {
                        this.Cpt.popupFilter.buildIcons();
                    }
                    //removes active column header class
                    if (this.markActiveColumns) {
                        this.clearActiveColumns();
                    }
                    // search args re-init
                    this.searchArgs = this.getFiltersValue();

                    var num_cell_data, nbFormat;
                    var re_le = new RegExp(this.leOperator),
                        re_ge = new RegExp(this.geOperator),
                        re_l = new RegExp(this.lwOperator),
                        re_g = new RegExp(this.grOperator),
                        re_d = new RegExp(this.dfOperator),
                        re_lk = new RegExp(str.rgxEsc(this.lkOperator)),
                        re_eq = new RegExp(this.eqOperator),
                        re_st = new RegExp(this.stOperator),
                        re_en = new RegExp(this.enOperator),
                        re_an = new RegExp(this.anOperator),
                        re_cr = new RegExp(this.curExp),
                        re_em = this.emOperator,
                        re_nm = this.nmOperator,
                        re_re = new RegExp(str.rgxEsc(this.rgxOperator));

                    //keyword highlighting
                    function highlight(str, ok, cell) {
                        if (o.highlightKeywords && ok) {
                            str = str.replace(re_lk, "");
                            str = str.replace(re_eq, "");
                            str = str.replace(re_st, "");
                            str = str.replace(re_en, "");
                            var w = str;
                            if (re_le.test(str) || re_ge.test(str) || re_l.test(str) || re_g.test(str) || re_d.test(str)) {
                                w = dom.getText(cell);
                            }
                            if (w !== "") {
                                o.Cpt.highlightKeyword.highlight(cell, w, o.Cpt.highlightKeyword.highlightCssClass);
                            }
                        }
                    }

                    //looks for search argument in current row
                    function hasArg(sA, cell_data, j) {
                        var occurence;
                        //Search arg operator tests
                        var hasLO = re_l.test(sA),
                            hasLE = re_le.test(sA),
                            hasGR = re_g.test(sA),
                            hasGE = re_ge.test(sA),
                            hasDF = re_d.test(sA),
                            hasEQ = re_eq.test(sA),
                            hasLK = re_lk.test(sA),
                            hasAN = re_an.test(sA),
                            hasST = re_st.test(sA),
                            hasEN = re_en.test(sA),
                            hasEM = re_em === sA,
                            hasNM = re_nm === sA,
                            hasRE = re_re.test(sA);

                        //Search arg dates tests
                        var isLDate = hasLO && isValidDate(sA.replace(re_l, ""), dtType);
                        var isLEDate = hasLE && isValidDate(sA.replace(re_le, ""), dtType);
                        var isGDate = hasGR && isValidDate(sA.replace(re_g, ""), dtType);
                        var isGEDate = hasGE && isValidDate(sA.replace(re_ge, ""), dtType);
                        var isDFDate = hasDF && isValidDate(sA.replace(re_d, ""), dtType);
                        var isEQDate = hasEQ && isValidDate(sA.replace(re_eq, ""), dtType);

                        var dte1, dte2;
                        //dates
                        if (isValidDate(cell_data, dtType)) {
                            dte1 = formatDate(cell_data, dtType);
                            // lower date
                            if (isLDate) {
                                dte2 = formatDate(sA.replace(re_l, ""), dtType);
                                occurence = dte1 < dte2;
                            }
                            // lower equal date
                            else if (isLEDate) {
                                dte2 = formatDate(sA.replace(re_le, ""), dtType);
                                occurence = dte1 <= dte2;
                            }
                            // greater equal date
                            else if (isGEDate) {
                                dte2 = formatDate(sA.replace(re_ge, ""), dtType);
                                occurence = dte1 >= dte2;
                            }
                            // greater date
                            else if (isGDate) {
                                dte2 = formatDate(sA.replace(re_g, ""), dtType);
                                occurence = dte1 > dte2;
                            }
                            // different date
                            else if (isDFDate) {
                                dte2 = formatDate(sA.replace(re_d, ""), dtType);
                                occurence = dte1.toString() != dte2.toString();
                            }
                            // equal date
                            else if (isEQDate) {
                                dte2 = formatDate(sA.replace(re_eq, ""), dtType);
                                occurence = dte1.toString() == dte2.toString();
                            }
                            // searched keyword with * operator doesn't have to be a date
                            else if (re_lk.test(sA)) {
                                // like date
                                occurence = o._containsStr(sA.replace(re_lk, ""), cell_data, null, false);
                            } else if (isValidDate(sA, dtType)) {
                                dte2 = formatDate(sA, dtType);
                                occurence = dte1.toString() == dte2.toString();
                            }
                            //empty
                            else if (hasEM) {
                                occurence = str.isEmpty(cell_data);
                            }
                            //non-empty
                            else if (hasNM) {
                                occurence = !str.isEmpty(cell_data);
                            }
                        } else {
                            //first numbers need to be formated
                            if (o.hasColNbFormat && o.colNbFormat[j]) {
                                num_cell_data = removeNbFormat(cell_data, o.colNbFormat[j]);
                                nbFormat = o.colNbFormat[j];
                            } else {
                                if (o.thousandsSeparator === "," && o.decimalSeparator === ".") {
                                    num_cell_data = removeNbFormat(cell_data, "us");
                                    nbFormat = "us";
                                } else {
                                    num_cell_data = removeNbFormat(cell_data, "eu");
                                    nbFormat = "eu";
                                }
                            }

                            // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},
                            // rgx:)
                            // lower equal
                            if (hasLE) {
                                occurence = num_cell_data <= removeNbFormat(sA.replace(re_le, ""), nbFormat);
                            }
                            //greater equal
                            else if (hasGE) {
                                occurence = num_cell_data >= removeNbFormat(sA.replace(re_ge, ""), nbFormat);
                            }
                            //lower
                            else if (hasLO) {
                                occurence = num_cell_data < removeNbFormat(sA.replace(re_l, ""), nbFormat);
                            }
                            //greater
                            else if (hasGR) {
                                occurence = num_cell_data > removeNbFormat(sA.replace(re_g, ""), nbFormat);
                            }
                            //different
                            else if (hasDF) {
                                occurence = o._containsStr(sA.replace(re_d, ""), cell_data) ? false : true;
                            }
                            //like
                            else if (hasLK) {
                                occurence = o._containsStr(sA.replace(re_lk, ""), cell_data, null, false);
                            }
                            //equal
                            else if (hasEQ) {
                                occurence = o._containsStr(sA.replace(re_eq, ""), cell_data, null, true);
                            }
                            //starts with
                            else if (hasST) {
                                occurence = cell_data.indexOf(sA.replace(re_st, "")) === 0 ? true : false;
                            }
                            //ends with
                            else if (hasEN) {
                                var searchArg = sA.replace(re_en, "");
                                occurence = cell_data.lastIndexOf(searchArg, cell_data.length - 1) === cell_data.length - 1 - (searchArg.length - 1) && cell_data.lastIndexOf(searchArg, cell_data.length - 1) > -1 ? true : false;
                            }
                            //empty
                            else if (hasEM) {
                                occurence = str.isEmpty(cell_data);
                            }
                            //non-empty
                            else if (hasNM) {
                                occurence = !str.isEmpty(cell_data);
                            }
                            //regexp
                            else if (hasRE) {
                                //in case regexp fires an exception
                                try {
                                    //operator is removed
                                    var srchArg = sA.replace(re_re, "");
                                    var rgx = new RegExp(srchArg);
                                    occurence = rgx.test(cell_data);
                                } catch (e) {
                                    occurence = false;
                                }
                            } else {
                                var fCol = f["col_" + j];
                                occurence = o._containsStr(sA, cell_data, !fCol ? o.fltTypeInp : fCol);
                            }
                        } //else
                        return occurence;
                    } //fn

                    for (var k = this.refRow; k < this.nbRows; k++) {
                        /*** if table already filtered some rows are not visible ***/
                        if (row[k].style.display === "none") {
                            row[k].style.display = "";
                        }

                        var cell = row[k].cells,
                            nchilds = cell.length;

                        // checks if row has exact cell #
                        if (nchilds !== this.nbCells) {
                            continue;
                        }

                        var occurence = [],
                            isRowValid = this.searchType === "include" ? true : false,

                        //only for single filter search
                        singleFltRowValid = false;

                        // this loop retrieves cell data
                        for (var j = 0; j < nchilds; j++) {
                            //searched keyword
                            var sA = this.searchArgs[this.singleSearchFlt ? 0 : j],
                                dtType = this.hasColDateType ? this.colDateType[j] : this.defaultDateType;
                            if (sA === "") {
                                continue;
                            }

                            var cell_data = str.matchCase(this.getCellData(j, cell[j]), this.matchCase);

                            //multiple search parameter operator ||
                            var sAOrSplit = sA.split(this.orOperator),

                            //multiple search || parameter boolean
                            hasMultiOrSA = sAOrSplit.length > 1 ? true : false,

                            //multiple search parameter operator &&
                            sAAndSplit = sA.split(this.anOperator),

                            //multiple search && parameter boolean
                            hasMultiAndSA = sAAndSplit.length > 1 ? true : false;

                            //multiple sarch parameters
                            if (hasMultiOrSA || hasMultiAndSA) {
                                var cS,
                                    occur = false,
                                    s = hasMultiOrSA ? sAOrSplit : sAAndSplit;
                                for (var w = 0; w < s.length; w++) {
                                    cS = str.trim(s[w]);
                                    occur = hasArg(cS, cell_data, j);
                                    highlight(cS, occur, cell[j]);
                                    if (hasMultiOrSA && occur) {
                                        break;
                                    }
                                    if (hasMultiAndSA && !occur) {
                                        break;
                                    }
                                }
                                occurence[j] = occur;
                            }
                            //single search parameter
                            else {
                                occurence[j] = hasArg(str.trim(sA), cell_data, j);
                                highlight(sA, occurence[j], cell[j]);
                            } //else single param

                            if (!occurence[j]) {
                                isRowValid = this.searchType === "include" ? false : true;
                            }
                            if (this.singleSearchFlt && occurence[j]) {
                                singleFltRowValid = true;
                            }
                            if (this.popUpFilters) {
                                this.Cpt.popupFilter.buildIcon(j, true);
                            }
                            if (this.markActiveColumns) {
                                if (k === this.refRow) {
                                    if (this.onBeforeActiveColumn) {
                                        this.onBeforeActiveColumn.call(null, this, j);
                                    }
                                    dom.addClass(this.getHeaderElement(j), this.activeColumnsCssClass);
                                    if (this.onAfterActiveColumn) {
                                        this.onAfterActiveColumn.call(null, this, j);
                                    }
                                }
                            }
                        } //for j

                        if (this.singleSearchFlt && singleFltRowValid) {
                            isRowValid = true;
                        }

                        if (!isRowValid) {
                            this.validateRow(k, false);
                            // always visible rows need to be counted as valid
                            if (this.hasVisibleRows && array.has(this.visibleRows, k) && !this.paging) {
                                this.validRowsIndex.push(k);
                            } else {
                                hiddenrows++;
                            }
                        } else {
                            this.validateRow(k, true);
                            this.validRowsIndex.push(k);
                            if (this.alternateBgs) {
                                this.Cpt.alternateRows.setRowBg(k, this.validRowsIndex.length);
                            }
                            if (this.onRowValidated) {
                                this.onRowValidated.call(null, this, k);
                            }
                        }
                    } // for k

                    this.nbVisibleRows = this.validRowsIndex.length;
                    this.nbHiddenRows = hiddenrows;
                    this.isStartBgAlternate = false;

                    if (this.rememberGridValues) {
                        this.Cpt.store.saveFilterValues(this.fltsValuesCookie);
                    }
                    //applies filter props after filtering process
                    if (!this.paging) {
                        this.applyGridProps();
                    } else {
                        this.startPagingRow = 0;
                        this.currentPageNb = 1;
                        this.Cpt.paging.setPagingInfo(this.validRowsIndex);
                    } //starts paging process
                    //invokes onafter callback
                    if (this.onAfterFilter) {
                        this.onAfterFilter.call(null, this);
                    }
                }
            },
            applyGridProps: {

                /*====================================================
                    - checks methods that should be called
                    after filtering and/or paging process
                =====================================================*/

                value: function applyGridProps() {
                    // blurs active filter (IE)
                    if (this.activeFlt && str.lower(this.activeFlt.nodeName) === this.fltTypeSlc && !this.popUpFilters) {
                        this.activeFlt.blur();
                        if (this.activeFlt.parentNode) {
                            this.activeFlt.parentNode.focus();
                        }
                    }

                    //shows rows always visible
                    if (this.visibleRows) {
                        this.enforceVisibility();
                    }
                    //makes operation on a col
                    if (this.hasColOperation) {
                        this.Cpt.colOps.calc();
                    }
                    //re-populates drop-down filters
                    if (this.linkedFilters) {
                        this.linkFilters();
                    }
                    var nr = !this.paging && this.hasVisibleRows ? this.nbVisibleRows - this.visibleRows.length : this.nbVisibleRows;
                    //refreshes rows counter
                    if (this.rowsCounter) {
                        this.Cpt.rowsCounter.refresh(nr);
                    }

                    if (this.popUpFilters) {
                        this.Cpt.popupFilter.closeAll();
                    }
                }
            },
            getColValues: {

                /*====================================================
                    - returns an array containing cell values of
                    a column
                    - needs following args:
                        - column index (number)
                        - a boolean set to true if we want only
                        numbers to be returned
                        - array containing rows index to be excluded
                        from returned values
                =====================================================*/

                value: function getColValues(colindex, num, exclude) {
                    if (!this.fltGrid) {
                        return;
                    }
                    var row = this.tbl.rows,
                        colValues = [];

                    for (var i = this.refRow; i < this.nbRows; i++) {
                        var isExludedRow = false;
                        // checks if current row index appears in exclude array
                        if (exclude && types.isArray(exclude)) {
                            isExludedRow = array.has(exclude, i); //boolean
                        }
                        var cell = row[i].cells,
                            nchilds = cell.length;

                        // checks if row has exact cell # and is not excluded
                        if (nchilds == this.nbCells && !isExludedRow) {
                            // this loop retrieves cell data
                            for (var j = 0; j < nchilds; j++) {
                                if (j === colindex && row[i].style.display === "") {
                                    var cell_data = str.lower(this.getCellData(j, cell[j])),
                                        nbFormat = this.colNbFormat ? this.colNbFormat[colindex] : null,
                                        data = num ? removeNbFormat(cell_data, nbFormat) : cell_data;
                                    colValues.push(data);
                                }
                            }
                        }
                    } //for i
                    return colValues;
                }
            },
            getFilterValue: {

                /*====================================================
                    - Returns value of a specified filter
                    - Params:
                        - index: filter column index (numeric value)
                =====================================================*/

                value: function getFilterValue(index) {
                    if (!this.fltGrid) {
                        return;
                    }
                    var fltValue,
                        flt = this.getFilterElement(index);
                    if (!flt) {
                        return "";
                    }
                    var fltColType = this.fltCol[index];
                    if (fltColType !== this.fltTypeMulti && fltColType !== this.fltTypeCheckList) {
                        fltValue = flt.value;
                    }
                    //mutiple select
                    else if (fltColType === this.fltTypeMulti) {
                        fltValue = "";
                        for (var j = 0; j < flt.options.length; j++) {
                            if (flt.options[j].selected) {
                                fltValue = fltValue.concat(flt.options[j].value + " " + this.orOperator + " ");
                            }
                        }
                        //removes last operator ||
                        fltValue = fltValue.substr(0, fltValue.length - 4);
                    }
                    //checklist
                    else if (fltColType === this.fltTypeCheckList) {
                        if (flt.getAttribute("value") !== null) {
                            fltValue = flt.getAttribute("value");
                            //removes last operator ||
                            fltValue = fltValue.substr(0, fltValue.length - 3);
                        } else {
                            fltValue = "";
                        }
                    }
                    return fltValue;
                }
            },
            getFiltersValue: {

                /*====================================================
                    - Returns the value of every single filter
                =====================================================*/

                value: function getFiltersValue() {
                    if (!this.fltGrid) {
                        return;
                    }
                    var searchArgs = [];
                    for (var i = 0; i < this.fltIds.length; i++) {
                        searchArgs.push(str.trim(str.matchCase(this.getFilterValue(i), this.matchCase)));
                    }
                    return searchArgs;
                }
            },
            getFilterId: {

                /*====================================================
                    - Returns filter id of a specified column
                    - Params:
                        - index: column index (numeric value)
                =====================================================*/

                value: function getFilterId(index) {
                    if (!this.fltGrid) {
                        return;
                    }
                    return this.fltIds[i];
                }
            },
            getFiltersByType: {

                /*====================================================
                    - returns an array containing ids of filters of a
                    specified type (inputs or selects)
                    - Note that hidden filters are also returned
                    - Needs folllowing args:
                        - filter type string ('input','select',
                        'multiple')
                        - optional boolean: if set true method
                        returns column indexes otherwise filters ids
                =====================================================*/

                value: function getFiltersByType(type, bool) {
                    if (!this.fltGrid) {
                        return;
                    }
                    var arr = [];
                    for (var i = 0; i < this.fltIds.length; i++) {
                        var fltType = this["col" + i];
                        if (fltType === str.lower(type)) {
                            var a = bool ? i : this.fltIds[i];
                            arr.push(a);
                        }
                    }
                    return arr;
                }
            },
            getFilterElement: {

                /*====================================================
                    - returns filter DOM element for a given column
                    index
                =====================================================*/

                value: function getFilterElement(index) {
                    if (!this.fltGrid) {
                        return null;
                    }
                    return dom.id(this.fltIds[index]);
                }
            },
            getCellsNb: {

                /*====================================================
                    - returns number of cells in a row
                    - if rowIndex param is passed returns number of
                    cells of specified row (number)
                =====================================================*/

                value: function getCellsNb(rowIndex) {
                    var tr = !rowIndex ? this.tbl.rows[0] : this.tbl.rows[rowIndex];
                    return tr.cells.length;
                }
            },
            getRowsNb: {

                /*====================================================
                    - returns total nb of filterable rows starting
                    from reference row if defined
                    - Param:
                        - includeHeaders: if true header rows are
                        included in calculation(= table rows number)
                =====================================================*/

                value: function getRowsNb(includeHeaders) {
                    var s = !this.refRow ? 0 : this.refRow,
                        ntrs = this.tbl.rows.length;
                    if (includeHeaders) {
                        s = 0;
                    }
                    return parseInt(ntrs - s, 10);
                }
            },
            getCellData: {

                /*====================================================
                    - returns text content of a given cell
                    - Params:
                        - i: index of the column (number)
                        - cell: td DOM object
                =====================================================*/

                value: function getCellData(i, cell) {
                    if (i === undefined || !cell) {
                        return "";
                    }
                    //First checks for customCellData event
                    if (this.customCellData && array.has(this.customCellDataCols, i)) {
                        return this.customCellData.call(null, this, cell, i);
                    } else {
                        return dom.getText(cell);
                    }
                }
            },
            getTableData: {

                /*====================================================
                    - returns an array containing table data:
                    [rowindex,[value1,value2,value3...]]
                =====================================================*/

                value: function getTableData() {
                    var row = this.tbl.rows;
                    for (var k = this.refRow; k < this.nbRows; k++) {
                        var rowData = [k, []];
                        var cells = row[k].cells;
                        // this loop retrieves cell data
                        for (var j = 0; j < cells.length; j++) {
                            var cell_data = this.getCellData(j, cells[j]);
                            rowData[1].push(cell_data);
                        }
                        this.tblData.push(rowData);
                    }
                    return this.tblData;
                }
            },
            getFilteredData: {

                /*====================================================
                    - returns an array containing filtered data:
                    [rowindex,[value1,value2,value3...]]
                =====================================================*/

                value: function getFilteredData(includeHeaders) {
                    if (!this.validRowsIndex) {
                        return [];
                    }
                    var row = this.tbl.rows,
                        filteredData = [];
                    if (includeHeaders) {
                        var table = this.gridLayout ? this.Cpt.gridLayout.headTbl : this.tbl,
                            r = table.rows[this.headersRow],
                            rowData = [r.rowIndex, []];
                        for (var j = 0; j < this.nbCells; j++) {
                            var headerText = this.getCellData(j, r.cells[j]);
                            rowData[1].push(headerText);
                        }
                        filteredData.push(rowData);
                    }

                    var validRows = this.getValidRowsIndex(true);
                    for (var i = 0; i < validRows.length; i++) {
                        var rData = [this.validRowsIndex[i], []],
                            cells = row[this.validRowsIndex[i]].cells;
                        for (var k = 0; k < cells.length; k++) {
                            var cell_data = this.getCellData(k, cells[k]);
                            rData[1].push(cell_data);
                        }
                        filteredData.push(rData);
                    }
                    return filteredData;
                }
            },
            getFilteredDataCol: {

                /*====================================================
                    - returns an array containing filtered data of a
                    specified column.
                    - Params:
                        - colIndex: index of the column (number)
                    - returned array:
                    [value1,value2,value3...]
                =====================================================*/

                value: function getFilteredDataCol(colIndex) {
                    if (colIndex === undefined) {
                        return [];
                    }
                    var data = this.getFilteredData(),
                        colData = [];
                    for (var i = 0; i < data.length; i++) {
                        var r = data[i],

                        //cols values of current row
                        d = r[1],

                        //data of searched column
                        c = d[colIndex];
                        colData.push(c);
                    }
                    return colData;
                }
            },
            getRowDisplay: {
                value: function getRowDisplay(row) {
                    if (!this.fltGrid && !types.isObj(row)) {
                        return;
                    }
                    return row.style.display;
                }
            },
            validateRow: {

                /*====================================================
                    - Validates/unvalidates row by setting 'validRow'
                    attribute and shows/hides row
                    - Params:
                        - rowIndex: index of the row (number)
                        - isValid: boolean
                =====================================================*/

                value: function validateRow(rowIndex, isValid) {
                    var row = this.tbl.rows[rowIndex];
                    if (!row || str.lower(typeof isValid) !== "boolean") {
                        return;
                    }

                    // always visible rows are valid
                    if (this.hasVisibleRows && array.has(this.visibleRows, rowIndex) && !this.paging) {
                        isValid = true;
                    }

                    var displayFlag = isValid ? "" : "none",
                        validFlag = isValid ? "true" : "false";
                    row.style.display = displayFlag;

                    if (this.paging) {
                        row.setAttribute("validRow", validFlag);
                    }
                }
            },
            validateAllRows: {

                /*====================================================
                    - Validates all filterable rows
                =====================================================*/

                value: function validateAllRows() {
                    if (!this._hasGrid) {
                        return;
                    }
                    this.validRowsIndex = [];
                    for (var k = this.refRow; k < this.nbFilterableRows; k++) {
                        this.validateRow(k, true);
                        this.validRowsIndex.push(k);
                    }
                }
            },
            setFilterValue: {

                /*====================================================
                    - Inserts value in a specified filter
                    - Params:
                        - index: filter column index (numeric value)
                        - searcharg: search string
                        - doFilter: optional boolean for multiple
                        selects: executes filtering when multiple
                        select populated... IE only!
                =====================================================*/

                value: function setFilterValue(index, searcharg, doFilter) {
                    if (!this.fltGrid && !this.isFirstLoad || !this.getFilterElement(index)) {
                        return;
                    }
                    var slc = this.getFilterElement(index),
                        execFilter = doFilter === undefined ? true : doFilter,
                        fltColType = this["col" + index];
                    searcharg = searcharg === undefined ? "" : searcharg;

                    if (fltColType !== this.fltTypeMulti && fltColType != this.fltTypeCheckList) {
                        slc.value = searcharg;
                    }
                    //multiple selects
                    else if (fltColType === this.fltTypeMulti) {
                        var s = searcharg.split(" " + this.orOperator + " "),
                            ct = 0; //keywords counter
                        for (var j = 0; j < slc.options.length; j++) {
                            if (s === "" || s[0] === "") {
                                slc.options[j].selected = false;
                            }
                            if (slc.options[j].value === "") {
                                slc.options[j].selected = false;
                            }
                            if (slc.options[j].value !== "" && array.has(s, slc.options[j].value, true)) {
                                // IE multiple selection work-around
                                // if(hlp.isIE()){
                                //     //when last value reached filtering can be executed
                                //     var filter = ct==(s.length-1) && execFilter ?
                                //         true : false;
                                //     this.__deferMultipleSelection(slc,j,filter);
                                //     ct++;
                                // }
                                // else{
                                //     slc.options[j].selected = true;
                                // }
                                slc.options[j].selected = true;
                            } //if
                        } //for j
                    }
                    //checklist
                    else if (fltColType === this.fltTypeCheckList) {
                        searcharg = str.matchCase(searcharg, this.matchCase);
                        var sarg = searcharg.split(" " + this.orOperator + " "),
                            fltValue = slc.setAttribute("value", ""),
                            fltIndex = slc.setAttribute("indexes", "");
                        for (var k = 0; k < dom.tag(slc, "li").length; k++) {
                            var li = dom.tag(slc, "li")[k],
                                lbl = dom.tag(li, "label")[0],
                                chk = dom.tag(li, "input")[0],
                                lblTxt = str.matchCase(dom.getText(lbl), this.matchCase);
                            if (lblTxt !== "" && array.has(sarg, lblTxt, true)) {
                                chk.checked = true;
                                this.Cpt.checkList.setCheckListValues(chk);
                            } else {
                                chk.checked = false;
                                this.Cpt.checkList.setCheckListValues(chk);
                            }
                        }
                    }
                }
            },
            setColWidths: {

                /*====================================================
                    - sets coluun widths in pixels
                =====================================================*/

                value: function setColWidths(rowIndex) {
                    if (!this.fltGrid || !this.hasColWidth) {
                        return;
                    }
                    var o = this,
                        rIndex;
                    if (rowIndex === undefined) {
                        rIndex = this.tbl.rows[0].style.display != "none" ? 0 : 1;
                    } else {
                        rIndex = rowIndex;
                    }
                    setWidths(this.tbl.rows[rIndex]);

                    function setWidths(row) {
                        if (!o && o.nbCells != o.colWidth.length) {
                            return;
                        }
                        if (o.nbCells == row.cells.length) {
                            for (var k = 0; k < o.nbCells; k++) {
                                row.cells[k].style.width = o.colWidth[k];
                            }
                        }
                    }
                }
            },
            enforceVisibility: {

                /*====================================================
                    - makes a row always visible
                    - Note this works only if paging is false
                =====================================================*/

                value: function enforceVisibility() {
                    if (this._hasGrid && this.hasVisibleRows && !this.paging) {
                        for (var i = 0; i < this.visibleRows.length; i++) {
                            //row index cannot be > nrows
                            if (this.visibleRows[i] <= this.nbRows) {
                                this.validateRow(this.visibleRows[i], true);
                            }
                        }
                    }
                }
            },
            clearFilters: {
                value: function clearFilters() {
                    this.EvtManager(this.Evt.name.clear);
                }
            },
            _clearFilters: {
                /*====================================================
                    - clears grid filters
                =====================================================*/

                value: function _clearFilters() {
                    if (!this.fltGrid) {
                        return;
                    }
                    if (this.onBeforeReset) {
                        this.onBeforeReset.call(null, this, this.getFiltersValue());
                    }
                    for (var i = 0; i < this.fltIds.length; i++) {
                        this.setFilterValue(i, "");
                    }
                    if (this.linkedFilters) {
                        this.activeFilterId = "";
                        this.linkFilters();
                    }
                    if (this.rememberPageLen) {
                        cookie.remove(this.pgLenCookie);
                    }
                    if (this.rememberPageNb) {
                        cookie.remove(this.pgNbCookie);
                    }
                    if (this.onAfterReset) {
                        this.onAfterReset.call(null, this);
                    }
                }
            },
            clearActiveColumns: {

                /*====================================================
                    - clears active columns header class name
                =====================================================*/

                value: function clearActiveColumns() {
                    for (var i = 0; i < this.fltIds.length; i++) {
                        dom.removeClass(this.getHeaderElement(i), this.activeColumnsCssClass);
                    }
                }
            },
            refresh: {

                /*====================================================
                    - Re-generates filters grid
                =====================================================*/

                value: function refresh(config) {
                    var configObj = !config ? this.cfg : config;
                    var hasSort = this.sort;
                    //sort property is set to false in order to avoid sort object
                    //re-instanciation
                    if (hasSort) {
                        this.sort = false;
                    }
                    this.nbRows = this.getRowsNb(); //in case table is refreshed
                    this.remove();
                    window["tf_" + this.id] = new TableFilter(this.id, this.startRow, configObj);
                    this.isFirstLoad = true;
                    this.fltIds = [];
                    this.init();
                    //New tbody content needs to be referenced in sortabletable script with
                    //setTBody() method
                    if (hasSort) {
                        //this.st =  SortableTable object
                        //Note this is a method of the Sortable Table 1.12 script
                        //(Erik Arvidsson)
                        this.st.setTBody(this.tbl.tBodies[0]);
                        //finally sort property is enabled again
                        this.sort = true;
                    }
                }
            },
            linkFilters: {

                /*====================================================
                    - retrieves select, multiple and checklist filters
                    - calls method repopulating filters
                =====================================================*/

                value: function linkFilters() {
                    var slcA1 = this.getFiltersByType(this.fltTypeSlc, true),
                        slcA2 = this.getFiltersByType(this.fltTypeMulti, true),
                        slcA3 = this.getFiltersByType(this.fltTypeCheckList, true),
                        slcIndex = slcA1.concat(slcA2);
                    slcIndex = slcIndex.concat(slcA3);

                    if (this.activeFilterId) {
                        var activeFlt = this.activeFilterId.split("_")[0];
                        activeFlt = activeFlt.split(this.prfxFlt)[1];
                        var slcSelectedValue;
                        for (var i = 0; i < slcIndex.length; i++) {
                            var curSlc = dom.id(this.fltIds[slcIndex[i]]);
                            slcSelectedValue = this.getFilterValue(slcIndex[i]);
                            if (activeFlt !== slcIndex[i] || this.paging && array.has(slcA1, slcIndex[i]) && activeFlt === slcIndex[i] || !this.paging && (array.has(slcA3, slcIndex[i]) || array.has(slcA2, slcIndex[i])) || slcSelectedValue === this.displayAllText) {

                                if (array.has(slcA3, slcIndex[i])) {
                                    this.Cpt.checkList.checkListDiv[slcIndex[i]].innerHTML = "";
                                } else {
                                    curSlc.innerHTML = "";
                                }

                                //1st option needs to be inserted
                                if (this.fillSlcOnDemand) {
                                    var opt0 = dom.createOpt(this.displayAllText, "");
                                    if (curSlc) {
                                        curSlc.appendChild(opt0);
                                    }
                                }

                                if (array.has(slcA3, slcIndex[i])) {
                                    this.Cpt.checkList._build(slcIndex[i]);
                                } else {
                                    this.Cpt.dropdown._build(slcIndex[i], true);
                                }

                                this.setFilterValue(slcIndex[i], slcSelectedValue);
                            }
                        } // for i
                    }
                }
            },
            _resetGrid: {

                /*====================================================
                    - Private methods
                =====================================================*/

                /*====================================================
                    - Only used by AddGrid() method
                    - Resets filtering grid bar if previously removed
                =====================================================*/

                value: function _resetGrid() {
                    if (this.isFirstLoad) {
                        return;
                    }

                    // grid was removed, grid row element is stored in fltGridEl property
                    if (!this.gridLayout) {
                        this.tbl.rows[this.filtersRowIndex].parentNode.insertBefore(this.fltGridEl, this.tbl.rows[this.filtersRowIndex]);
                    }

                    // filters are appended in external placeholders elements
                    if (this.isExternalFlt) {
                        for (var ct = 0; ct < this.externalFltTgtIds.length; ct++) {
                            var extFlt = dom.id(this.externalFltTgtIds[ct]);
                            if (extFlt) {
                                extFlt.appendChild(this.externalFltEls[ct]);
                                var colFltType = this["col" + ct];
                                //IE special treatment for gridLayout, appended filters are
                                //empty
                                if (this.gridLayout && this.externalFltEls[ct].innerHTML === "" && colFltType !== this.fltTypeInp) {
                                    if (colFltType === this.fltTypeSlc || colFltType === this.fltTypeMulti) {
                                        this.Cpt.dropdown.build(ct);
                                    }
                                    if (colFltType === this.fltTypeCheckList) {
                                        this.Cpt.checkList.build(ct);
                                    }
                                }
                            }
                        }
                    }

                    this.nbFilterableRows = this.getRowsNb();
                    this.nbVisibleRows = this.nbFilterableRows;
                    this.nbRows = this.tbl.rows.length;
                    if (this.isSortEnabled) {
                        this.sort = true;
                    }

                    if (this.tbl.rows[this.filtersRowIndex].innerHTML === "") {
                        refreshFilters(this);
                    } else {
                        if (this.popUpFilters) {
                            this.headersRow++;
                            this.Cpt.popupFilter.buildAll();
                        }
                    }

                    /***    ie bug work-around, filters need to be re-generated since row
                            is empty; insertBefore method doesn't seem to work properly
                            with previously generated DOM nodes modified by innerHTML   ***/
                    function refreshFilters(o) {
                        o.tbl.deleteRow(o.filtersRowIndex);
                        o.remove();
                        o.fltIds = [];
                        o.isFirstLoad = true;
                        if (o.popUpFilters) {
                            // o.RemovePopupFilters();
                            o.Cpt.popupFilter.destroy();
                        }
                        o._AddGrid();
                    }

                    if (!this.gridLayout) {
                        dom.addClass(this.tbl, this.prfxTf);
                    }
                    this._hasGrid = true;
                }
            },
            _containsStr: {

                /*==============================================
                    - Checks if data contains searched arg,
                    returns a boolean
                    - Params:
                        - arg: searched string
                        - data: data string
                        - fltType: filter type (string,
                        exact match by default for selects -
                        optional)
                        - forceMatch: boolean forcing exact
                        match (optional)
                ===============================================*/

                value: function _containsStr(arg, data, fltType, forceMatch) {
                    // Improved by Cedric Wartel (cwl)
                    // automatic exact match for selects and special characters are now
                    // filtered
                    var regexp,
                        modifier = this.matchCase ? "g" : "gi",
                        exactMatch = !forceMatch ? this.exactMatch : forceMatch;
                    if (exactMatch || fltType !== this.fltTypeInp && fltType) {
                        regexp = new RegExp("(^\\s*)" + str.rgxEsc(arg) + "(\\s*$)", modifier);
                    } else {
                        regexp = new RegExp(str.rgxEsc(arg), modifier);
                    }
                    return regexp.test(data);
                }
            },
            isImported: {
                value: function isImported(filePath, type) {
                    var imported = false,
                        importType = !type ? "script" : type,
                        attr = importType == "script" ? "src" : "href",
                        files = dom.tag(doc, importType);
                    for (var i = 0; i < files.length; i++) {
                        if (files[i][attr] === undefined) {
                            continue;
                        }
                        if (files[i][attr].match(filePath)) {
                            imported = true;
                            break;
                        }
                    }
                    return imported;
                }
            },
            includeFile: {
                value: function includeFile(fileId, filePath, callback, type) {
                    var ftype = !type ? "script" : type,
                        imported = this.isImported(filePath, ftype);
                    if (imported) {
                        return;
                    }
                    var o = this,
                        isLoaded = false,
                        file,
                        head = dom.tag(doc, "head")[0];

                    if (str.lower(ftype) === "link") {
                        file = dom.create("link", ["id", fileId], ["type", "text/css"], ["rel", "stylesheet"], ["href", filePath]);
                    } else {
                        file = dom.create("script", ["id", fileId], ["type", "text/javascript"], ["src", filePath]);
                    }

                    //Browser <> IE onload event works only for scripts, not for stylesheets
                    file.onload = file.onreadystatechange = function () {
                        if (!isLoaded && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                            isLoaded = true;
                            if (typeof callback === "function") {
                                callback.call(null, o);
                            }
                        }
                    };
                    file.onerror = function () {
                        throw new Error("TF script could not load: " + filePath);
                    };
                    head.appendChild(file);
                }
            },
            hasGrid: {

                /*====================================================
                    - checks if table has a filter grid
                    - returns a boolean
                =====================================================*/

                value: function hasGrid() {
                    return this._hasGrid;
                }
            },
            getFiltersId: {

                /*====================================================
                    - returns an array containing filters ids
                    - Note that hidden filters are also returned
                =====================================================*/

                value: function getFiltersId() {
                    if (!this._hasGrid) {
                        return;
                    }
                    return this.fltIds;
                }
            },
            getValidRowsIndex: {

                /*====================================================
                    - returns an array containing valid rows indexes
                    (valid rows upon filtering)
                =====================================================*/

                value: function getValidRowsIndex(reCalc) {
                    if (!this._hasGrid) {
                        return;
                    }
                    if (!reCalc) {
                        return this.validRowsIndex;
                    }

                    this.validRowsIndex = [];
                    for (var k = this.refRow; k < this.getRowsNb(true); k++) {
                        var r = this.tbl.rows[k];
                        if (!this.paging) {
                            if (this.getRowDisplay(r) !== "none") {
                                this.validRowsIndex.push(r.rowIndex);
                            }
                        } else {
                            if (r.getAttribute("validRow") === "true" || r.getAttribute("validRow") === null) {
                                this.validRowsIndex.push(r.rowIndex);
                            }
                        }
                    }
                    return this.validRowsIndex;
                }
            },
            getFiltersRowIndex: {

                /*====================================================
                    - Returns the index of the row containing the
                    filters
                =====================================================*/

                value: function getFiltersRowIndex() {
                    if (!this._hasGrid) {
                        return;
                    }
                    return this.filtersRowIndex;
                }
            },
            getHeadersRowIndex: {

                /*====================================================
                    - Returns the index of the headers row
                =====================================================*/

                value: function getHeadersRowIndex() {
                    if (!this._hasGrid) {
                        return;
                    }
                    return this.headersRow;
                }
            },
            getStartRowIndex: {

                /*====================================================
                    - Returns the index of the row from which will
                    start the filtering process (1st filterable row)
                =====================================================*/

                value: function getStartRowIndex() {
                    if (!this._hasGrid) {
                        return;
                    }
                    return this.refRow;
                }
            },
            getLastRowIndex: {

                /*====================================================
                    - Returns the index of the last row
                =====================================================*/

                value: function getLastRowIndex() {
                    if (!this._hasGrid) {
                        return;
                    }
                    return this.nbRows - 1;
                }
            },
            getHeaderElement: {

                /*====================================================
                    - returns a header DOM element for a given column
                    index
                =====================================================*/

                value: function getHeaderElement(colIndex) {
                    var table = this.gridLayout ? this.Cpt.gridLayout.headTbl : this.tbl;
                    var tHead = dom.tag(table, "thead");
                    var headersRow = this.headersRow;
                    var header;
                    for (var i = 0; i < this.nbCells; i++) {
                        if (i !== colIndex) {
                            continue;
                        }
                        if (tHead.length === 0) {
                            header = table.rows[headersRow].cells[i];
                        }
                        if (tHead.length === 1) {
                            header = tHead[0].rows[headersRow].cells[i];
                        }
                        break;
                    }
                    return header;
                }
            },
            config: {

                /*====================================================
                    - returns the original configuration object
                =====================================================*/

                value: function config() {
                    return this.cfg;
                }
            },
            getFilterableRowsNb: {

                /*====================================================
                    - returns the total number of rows that can be
                    filtered
                =====================================================*/

                value: function getFilterableRowsNb() {
                    return this.getRowsNb(false);
                }
            }
        });

        return TableFilter;
    })();

    module.exports = TableFilter;

    function numSortAsc(a, b) {
        return a - b;
    }

    function numSortDesc(a, b) {
        return b - a;
    }

    function removeNbFormat(data, format) {
        if (!data) {
            return;
        }
        if (!format) {
            format = "us";
        }
        var n = data;
        if (str.lower(format) === "us") {
            n = +n.replace(/[^\d\.-]/g, "");
        } else {
            n = +n.replace(/[^\d\,-]/g, "").replace(",", ".");
        }
        return n;
    }

    // function isStylesheetImported(stylesheet){
    //     var isImported = false;
    //     if(!doc.styleSheets){
    //         return isImported;
    //     }
    //     var s = doc.styleSheets,
    //         regexp = new RegExp(stylesheet);
    //     for(var i=0; i<s.length; i++){
    //         if(s[i].imports){//IE
    //             var imp = s[i].imports;
    //             for(var j=0; j<imp.length; j++){
    //                 if(str.lower(imp[j].href) === str.lower(stylesheet)){
    //                     isImported = true;
    //                     break;
    //                 }
    //             }
    //         } else {
    //             var r = s[i].cssRules ? s[i].cssRules : s[i].rules;
    //             for(var k=0; k<r.length; k++){
    //                 if(regexp.test(r[k].cssText)){
    //                     isImported = true;
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    //     return isImported;
    // }

    //Firefox does not support outerHTML property
    function setOuterHtml() {
        if (doc.body.__defineGetter__) {
            if (HTMLElement) {
                var element = HTMLElement.prototype;
                if (element.__defineGetter__) {
                    element.__defineGetter__("outerHTML", function () {
                        var parent = this.parentNode;
                        var el = dom.create(parent.tagName);
                        el.appendChild(this);
                        var shtml = el.innerHTML;
                        parent.appendChild(this);
                        return shtml;
                    });
                }
                if (element.__defineSetter__) {
                    HTMLElement.prototype.__defineSetter__("outerHTML", function (sHTML) {
                        var r = this.ownerDocument.createRange();
                        r.setStartBefore(this);
                        var df = r.createContextualFragment(sHTML);
                        this.parentNode.replaceChild(df, this);
                        return sHTML;
                    });
                }
            }
        }
    }

    // return TableFilter;

    // });

    // }

    /*====================================================
        - Sets filters grid bar
        - Calls TF Constructor and generates grid bar
        - Params:
                - id: table id (string)
                - refRow (optional): row index (number)
                - config (optional): configuration
                object (literal object)
        - Returns TF object
    =====================================================*/
    // function setFilterGrid(id){
    //     if(arguments.length === 0){
    //         return;
    //     }
    //     var tf = new TableFilter(arguments[0], arguments[1], arguments[2]);
    //     tf.init();
    //     window['tf_'+id] = tf;
    //     return tf;
    // }

    /*===BEGIN removable section===========================
        - Unobtrusive grid bar generation using
        'filterable' class
        - If you don't use it you can remove safely this
        section
    /*=====================================================*/
    // window['tf_isNotIE'] = !(/msie|MSIE/.test(navigator.userAgent));
    // TF.Event.add(window,
    //     (tf_isNotIE || (typeof window.addEventListener === 'function') ?
    //         'DOMContentLoaded' : 'load'),
    //     initFilterGrid);

    // function initFilterGrid(){
    //     if(!document.getElementsByTagName){ return; }
    //     var tbls = dom.tag(document,'table'), config;
    //     for (var i=0; i<tbls.length; i++){
    //         var cTbl = tbls[i], cTblId = cTbl.getAttribute('id');
    //         if(TF.Dom.hasClass(cTbl,'filterable') && cTblId){
    //             if(TF.Types.isObj(cTblId+'cfg')){
    //                 config = window[cTblId+'cfg'];
    //             } else { config = undefined; }
    //             window[cTblId+'_isUnob'] = true;
    //             setFilterGrid(cTblId,config);
    //         }
    //     }// for i
    // }
    /*===END removable section===========================*/
});

// Extensions

// if(o.SetSortTable){ o.SetSortTable(); }
//# sourceMappingURL=tablefilter.js.map;
!function($__global){$__global.upgradeSystemLoader=function(){function e(e){var t=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@\/?#]*(?::[^:@\/?#]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return t?{href:t[0]||"",protocol:t[1]||"",authority:t[2]||"",host:t[3]||"",hostname:t[4]||"",port:t[5]||"",pathname:t[6]||"",search:t[7]||"",hash:t[8]||""}:null}function t(t,a){function r(e){var t=[];return e.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?t.pop():t.push(e)}),t.join("").replace(/^\//,"/"===e.charAt(0)?"/":"")}return g&&(a=a.replace(/\\/g,"/")),a=e(a||""),t=e(t||""),a&&t?(a.protocol||t.protocol)+(a.protocol||a.authority?a.authority:t.authority)+r(a.protocol||a.authority||"/"===a.pathname.charAt(0)?a.pathname:a.pathname?(t.authority&&!t.pathname?"/":"")+t.pathname.slice(0,t.pathname.lastIndexOf("/")+1)+a.pathname:t.pathname)+(a.protocol||a.authority||a.pathname?a.search:a.search||t.search)+a.hash:null}function a(e){function r(e,t){t._extensions=[];for(var a=0,r=e.length;r>a;a++)e[a](t)}var n=e["import"];e["import"]=function(e,t){return n.call(this,e,t).then(function(e){return e.__useDefault?e["default"]:e})},e.set("@empty",e.newModule({})),"undefined"!=typeof require&&(e._nodeRequire=require),e.config=function(e){for(var t in e){var a=e[t];if("object"!=typeof a||a instanceof Array)this[t]=a;else{this[t]=this[t]||{};for(var r in a)this[t][r]=a[r]}}};var o;if("undefined"==typeof window&&"undefined"==typeof WorkerGlobalScope&&"undefined"!=typeof process)o="file:"+process.cwd()+"/",g&&(o=o.replace(/\\/g,"/"));else if("undefined"==typeof window)o=location.href;else if(o=document.baseURI,!o){var i=document.getElementsByTagName("base");o=i[0]&&i[0].href||window.location.href}var s,l=e.locate;e.locate=function(e){return this.baseURL!=s&&(s=t(o,this.baseURL),"/"!=s.substr(s.length-1,1)&&(s+="/"),this.baseURL=s),Promise.resolve(l.call(this,e))},e._extensions=e._extensions||[],e._extensions.push(a),e.clone=function(){var e=this,t=new LoaderPolyfill(v);return t.baseURL=e.baseURL,t.paths={"*":"*.js"},r(e._extensions,t),t}}function r(e){function t(e,t){var a=e.meta&&e.meta[t.name];if(a)for(var r in a)t.metadata[r]=t.metadata[r]||a[r]}var a=/^(\s*\/\*.*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,n=/\/\*.*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;e.meta={},e._extensions=e._extensions||[],e._extensions.push(r);var o=e.locate;e.locate=function(e){return t(this,e),o.call(this,e)};var i=e.translate;e.translate=function(e){var r=e.source.match(a);if(r)for(var o=r[0].match(n),s=0;s<o.length;s++){var l=o[s].length,u=o[s].substr(0,1);if(";"==o[s].substr(l-1,1)&&l--,'"'==u||"'"==u){var d=o[s].substr(1,o[s].length-3),c=d.substr(0,d.indexOf(" "));if(c){var f=d.substr(c.length+1,d.length-c.length-1);e.metadata[c]instanceof Array?e.metadata[c].push(f):e.metadata[c]||(e.metadata[c]=f)}}}return t(this,e),i.call(this,e)}}function n(e){function a(e){var a,r=e.source.lastIndexOf("\n");-1!=r&&"//# sourceMappingURL="==e.source.substr(r+1,21)&&(a=e.source.substr(r+22,e.source.length-r-22),"undefined"!=typeof t&&(a=t(e.address,a))),__eval(e.source,e.address,a)}function r(e){for(var t=[],a=0,r=e.length;r>a;a++)-1==h.call(t,e[a])&&t.push(e[a]);return t}function o(t,a,r,n){"string"!=typeof t&&(n=r,r=a,a=t,t=null),v=!0;var o;if(o="boolean"==typeof r?{declarative:!1,deps:a,execute:n,executingRequire:r}:{declarative:!0,deps:a,declare:r},t)o.name=t,t in e.defined||(e.defined[t]=o);else if(o.declarative){if(g)throw new TypeError("Multiple anonymous System.register calls in the same module file.");g=o}}function i(e){if(!e.register){e.register=o,e.defined||(e.defined={});var t=e.onScriptLoad;e.onScriptLoad=function(e){t(e),g&&(e.metadata.entry=g),v&&(e.metadata.format=e.metadata.format||"register",e.metadata.registered=!0)}}}function s(e,t,a){if(a[e.groupIndex]=a[e.groupIndex]||[],-1==h.call(a[e.groupIndex],e)){a[e.groupIndex].push(e);for(var r=0,n=e.normalizedDeps.length;n>r;r++){var o=e.normalizedDeps[r],i=t.defined[o];if(i&&!i.evaluated){var l=e.groupIndex+(i.declarative!=e.declarative);if(void 0===i.groupIndex||i.groupIndex<l){if(void 0!==i.groupIndex&&(a[i.groupIndex].splice(h.call(a[i.groupIndex],i),1),0==a[i.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");i.groupIndex=l}s(i,t,a)}}}}function l(e,t){var a=t.defined[e];if(!a.module){a.groupIndex=0;var r=[];s(a,t,r);for(var n=!!a.declarative==r.length%2,o=r.length-1;o>=0;o--){for(var i=r[o],l=0;l<i.length;l++){var u=i[l];n?d(u,t):f(u,t)}n=!n}}}function u(e){return b[e]||(b[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(e,t){if(!e.module){var a=e.module=u(e.name),r=e.module.exports,n=e.declare.call(t.global,function(e,t){a.locked=!0,r[e]=t;for(var n=0,o=a.importers.length;o>n;n++){var i=a.importers[n];if(!i.locked){var s=h.call(i.dependencies,a);i.setters[s](r)}}return a.locked=!1,t});if(a.setters=n.setters,a.execute=n.execute,!a.setters||!a.execute)throw new TypeError("Invalid System.register form for "+e.name);for(var o=0,i=e.normalizedDeps.length;i>o;o++){var s,l=e.normalizedDeps[o],c=t.defined[l],f=b[l];f?s=f.exports:c&&!c.declarative?s=c.module.exports&&c.module.exports.__esModule?c.module.exports:{"default":c.module.exports,__useDefault:!0}:c?(d(c,t),f=c.module,s=f.exports):s=t.get(l),f&&f.importers?(f.importers.push(a),a.dependencies.push(f)):a.dependencies.push(null),a.setters[o]&&a.setters[o](s)}}}function c(e,t){var a,r=t.defined[e];if(r)r.declarative?m(e,[],t):r.evaluated||f(r,t),a=r.module.exports;else if(a=t.get(e),!a)throw new Error("Unable to load dependency "+e+".");return(!r||r.declarative)&&a&&a.__useDefault?a["default"]:a}function f(e,t){function a(){for(var a=0,r=e.normalizedDeps.length;r>a;a++){var n=e.normalizedDeps[a],o=t.defined[n];o&&f(o,t)}}if(!e.module){var r={},n=e.module={exports:r,id:e.name};e.executingRequire||a(),e.evaluated=!0;var o=e.execute.call(t.global,function(a){for(var r=0,n=e.deps.length;n>r;r++)if(e.deps[r]==a)return c(e.normalizedDeps[r],t);throw new TypeError("Module "+a+" not declared as a dependency.")},r,n);e.executingRequire&&a(),o&&(n.exports=o)}}function m(e,t,a){var r=a.defined[e];if(r&&!r.evaluated&&r.declarative){t.push(e);for(var n=0,o=r.normalizedDeps.length;o>n;n++){var i=r.normalizedDeps[n];-1==h.call(t,i)&&(a.defined[i]?m(i,t,a):a.get(i))}r.evaluated||(r.evaluated=!0,r.module.execute.call(a.global))}}"undefined"==typeof h&&(h=Array.prototype.indexOf),("undefined"==typeof __eval||"undefined"!=typeof document&&!document.addEventListener)&&(__eval=0||eval),e._extensions=e._extensions||[],e._extensions.push(n);e.__exec=a;var g,v;i(e);var b={},x=e["delete"];e["delete"]=function(e){return delete b[e],x.call(this,e)};var y=/System\.register/,_=e.fetch;e.fetch=function(e){var t=this;return i(t),t.defined[e.name]?(e.metadata.format="defined",""):(g=null,v=!1,_.call(t,e))};var w=e.translate;e.translate=function(e){return this.register=o,this.__exec=a,e.metadata.deps=e.metadata.deps||[],Promise.resolve(w.call(this,e)).then(function(t){return(e.metadata.init||e.metadata.exports)&&(e.metadata.format=e.metadata.format||"global"),("register"==e.metadata.format||!e.metadata.format&&e.source.match(y))&&(e.metadata.format="register"),t})};var z=e.instantiate;e.instantiate=function(e){var t,a=this;if(a.defined[e.name])t=a.defined[e.name],t.deps=t.deps.concat(e.metadata.deps);else if(e.metadata.entry)t=e.metadata.entry;else if(e.metadata.execute)t={declarative:!1,deps:e.metadata.deps||[],execute:e.metadata.execute,executingRequire:e.metadata.executingRequire};else if("register"==e.metadata.format){g=null,v=!1;var n=a.global.System;if(a.global.System=a,a.__exec(e),a.global.System=n,g?t=g:e.metadata.bundle=!0,!t&&p.defined[e.name]&&(t=p.defined[e.name]),!v&&!e.metadata.registered)throw new TypeError(e.name+" detected as System.register but didn't execute.")}if(!t&&"es6"!=e.metadata.format)return{deps:e.metadata.deps,execute:function(){return a.newModule({})}};if(!t)return z.call(this,e);a.defined[e.name]=t,t.deps=r(t.deps),t.name=e.name;for(var o=[],i=0,s=t.deps.length;s>i;i++)o.push(Promise.resolve(a.normalize(t.deps[i],e.name)));return Promise.all(o).then(function(r){return t.normalizedDeps=r,{deps:t.deps,execute:function(){l(e.name,a),m(e.name,[],a),a.defined[e.name]=void 0;var r=t.module.exports;return(!r||!t.declarative&&r.__esModule!==!0)&&(r={"default":r,__useDefault:!0}),a.newModule(r)}}})}}function o(e){function t(e,t,r,n){e.meta=e.meta||{};var o=e.meta[t]=e.meta[t]||{};if(o.format=o.format||"global",!e.paths[t]){var i=a(r,n);i&&(e.paths[t]=i)}}function a(e,t){if(d){var a=t?"/package.json":"";try{var r=d(e+a);return"file:"+r.substr(0,r.length-a.length)+(t?"/*.js":"")}catch(n){}}}e._extensions.push(o);var r,n,i=/(^\s*|[}\);\n]\s*)(import\s+(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s+from\s+['"]|\{)|export\s+\*\s+from\s+["']|export\s+(\{|default|function|class|var|const|let|async\s+function))/,s=/\$traceurRuntime\s*\./,l=/babelHelpers\s*\./,u=!0,d="undefined"!=typeof process&&"undefined"!=typeof require&&require.resolve,c=e.locate;e.locate=function(e){var a=this;return u&&("traceur"==a.transpiler?(t(a,"traceur","traceur/bin/traceur.js"),a.meta.traceur.exports="traceur",t(a,"traceur-runtime","traceur/bin/traceur-runtime.js")):"babel"==a.transpiler&&(t(a,"babel","babel-core/browser.js"),t(a,"babel/external-helpers","babel-core/external-helpers.js"),t(a,"babel-runtime/*","babel-runtime",!0)),u=!1),c.call(a,e)};var f=e.translate;e.translate=function(e){var t=this;return f.call(t,e).then(function(a){if("es6"==e.metadata.format||!e.metadata.format&&a.match(i))return e.metadata.format="es6",a;if("register"==e.metadata.format){if(!t.global.$traceurRuntime&&e.source.match(s))return t["import"]("traceur-runtime").then(function(){return a});if(!t.global.babelHelpers&&e.source.match(l))return t["import"]("babel/external-helpers").then(function(){return a})}return"traceur"==t.transpiler?Promise.all([r||(r=t.normalize(t.transpiler)),n||(n=t.normalize(t.transpiler+"-runtime"))]).then(function(t){return e.name==t[0]||e.name==t[1]?"(function() { var curSystem = System; "+a+"\nSystem = curSystem; })();":a}):a})}}function i(e){function t(e,t){for(var a=e.split(".");a.length;)t=t[a.shift()];return t}function a(t){for(var a in e.global){var r;if(-1==h.call(n,a)&&(!s||e.global.hasOwnProperty(a))){try{r=e.global[a]}catch(o){n.push(a)}r!==e.global&&t(a,r)}}}function r(e){if(!e.has("@@global-helpers")){var r,n={};e.set("@@global-helpers",e.newModule({prepareGlobal:function(t,o){for(var i=0;i<o.length;i++){var s=n[o[i]];if(s)for(var l in s)e.global[l]=s[l]}r={},a(function(e,t){r[e]=t})},retrieveGlobal:function(o,i,s){var l,u,d={};if(s)l=s.call(e.global);else if(i){var c=i.split(".")[0];l=t(i,e.global),d[c]=e.global[c]}else a(function(e,t){r[e]!==t&&"undefined"!=typeof t&&(d[e]=t,"undefined"!=typeof l?u||l===t||(u=!0):l=t)});return n[o]=d,u?d:l}}))}}e._extensions.push(i);var n=["indexedDB","sessionStorage","localStorage","clipboardData","frames","webkitStorageInfo","toolbar","statusbar","scrollbars","personalbar","menubar","locationbar","webkitIndexedDB","screenTop","screenLeft","external"],o="undefined"!=typeof window?"window":"undefined"!=typeof i?"global":"self";try{var s=e.global.hasOwnProperty;e.global.hasOwnProperty("window")}catch(l){s=!1}r(e);var u=e.instantiate;e.instantiate=function(e){var t=this;r(t);var a=e.metadata.exports;return e.metadata.format||(e.metadata.format="global"),"global"==e.metadata.format&&(e.metadata.execute=function(r,n,i){t.get("@@global-helpers").prepareGlobal(i.id,e.metadata.deps),a&&(e.source+=o+'["'+a+'"] = '+a+";");var s=t.global.define,r=t.global.require;return t.global.define=void 0,t.global.module=void 0,t.global.exports=void 0,t.__exec(e),t.global.require=r,t.global.define=s,t.get("@@global-helpers").retrieveGlobal(i.id,a,e.metadata.init)}),u.call(t,e)}}function s(e){function t(e){r.lastIndex=0;var t=[];e.length/e.split("\n").length<200&&(e=e.replace(n,""));for(var a;a=r.exec(e);)t.push(a[1].substr(1,a[1].length-2));return t}e._extensions.push(s);var a=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.]|module\.)(exports\s*\[['"]|\exports\s*\.)|(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])module\.exports\s*\=/,r=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g,n=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm;if("undefined"!=typeof location&&location.origin)var o=location.origin;var i=e.instantiate;e.instantiate=function(n){return n.metadata.format||(a.lastIndex=0,r.lastIndex=0,(r.exec(n.source)||a.exec(n.source))&&(n.metadata.format="cjs")),"cjs"==n.metadata.format&&(n.metadata.deps=n.metadata.deps?n.metadata.deps.concat(t(n.source)):t(n.source),n.metadata.executingRequire=!0,n.metadata.execute=function(t,a,r){var i=(n.address||"").split("/");i.pop(),i=i.join("/");var s=n.address;o&&s.substr(0,o.length)===o?(s=s.substr(o.length),i=i.substr(o.length)):"file:"==s.substr(0,5)&&(s=s.substr(5),i=i.substr(5)),p._nodeRequire&&(i=i.substr(5));var l=(e.global._g={global:e.global,exports:a,module:r,require:t,__filename:s,__dirname:i},"(function(global, exports, module, require, __filename, __dirname) { "+n.source+"\n}).call(_g.exports, _g.global, _g.exports, _g.module, _g.require, _g.__filename, _g.__dirname);"),u=e.global.define;e.global.define=void 0,e.__exec({name:n.name,address:n.address,source:l}),e.global.define=u,e.global._g=void 0}),i.call(this,n)}}function l(e){function t(e,t){e=e.replace(c,"");var a=e.match(p),r=(a[1].split(",")[t]||"require").replace(g,""),n=v[r]||(v[r]=new RegExp(f+r+m,"g"));n.lastIndex=0;for(var o,i=[];o=n.exec(e);)i.push(o[2]||o[3]);return i}function a(e,t,r,n){var o=this;if("object"==typeof e&&!(e instanceof Array))return a.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if(!(e instanceof Array)){if("string"==typeof e){var i=o.get(e);return i.__useDefault?i["default"]:i}throw new TypeError("Invalid require")}for(var s=[],l=0;l<e.length;l++)s.push(o["import"](e[l],n));Promise.all(s).then(function(e){t&&t.apply(null,e)},r)}function r(e,t,r){return function(n,o,i){if("string"==typeof n){if("function"!=typeof o)return t(n);n=[n]}return a.call(r,n,o,i,{name:e})}}function n(e){function a(a,n,o){"string"!=typeof a&&(o=n,n=a,a=null),n instanceof Array||(o=n,n=["require","exports","module"]),"function"!=typeof o&&(o=function(e){return function(){return e}}(o)),void 0===n[n.length-1]&&n.pop();var s,l,u;if(-1!=(s=h.call(n,"require"))){n.splice(s,1);var d=o.toString();n=n.concat(t(d,s))}-1!=(l=h.call(n,"exports"))&&n.splice(l,1),-1!=(u=h.call(n,"module"))&&n.splice(u,1);var c={deps:n,execute:function(t,a,d){for(var c=[],f=0;f<n.length;f++)c.push(t(n[f]));d.uri=e.baseURL+d.id,d.config=function(){},-1!=u&&c.splice(u,0,d),-1!=l&&c.splice(l,0,a),-1!=s&&c.splice(s,0,r(d.id,t,e));var m=o.apply(i,c);return"undefined"==typeof m&&d&&(m=d.exports),"undefined"!=typeof m?m:void 0}};if(a)b=0!=n.length||b||x?null:c,x=!0,e.register(a,c.deps,!1,c.execute);else{if(b)throw new TypeError("Multiple defines for anonymous module");b=c}}var n=e.onScriptLoad;e.onScriptLoad=function(e){n(e),(b||x)&&(e.metadata.format="defined",e.metadata.registered=!0),b&&(e.metadata.deps=e.metadata.deps?e.metadata.deps.concat(b.deps):b.deps,e.metadata.execute=b.execute)},a.amd={},e.amdDefine=a}function o(e){e.amdDefine||n(e),b=null,x=null;var t=e.global;y=t.module,_=t.exports,w=t.define,t.module=void 0,t.exports=void 0,t.define&&t.define===e.amdDefine||(t.define=e.amdDefine)}function s(e){var t=e.global;t.define=w,t.module=y,t.exports=_}var u="undefined"!=typeof module&&module.exports;e._extensions.push(l);var d=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/,c=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,f="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",m="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",p=/\(([^\)]*)\)/,g=/^\s+|\s+$/g,v={};e.amdRequire=function(){return a.apply(this,arguments)};var b,x,y,_,w;if(n(e),e.scriptLoader){var z=e.fetch;e.fetch=function(e){return o(this),z.call(this,e)}}var S=e.instantiate;e.instantiate=function(e){var t=this;if("amd"==e.metadata.format||!e.metadata.format&&e.source.match(d)){if(e.metadata.format="amd",t.execute!==!1&&(o(t),t.__exec(e),s(t),!b&&!x&&!u))throw new TypeError("AMD module "+e.name+" did not define");b&&(e.metadata.deps=e.metadata.deps?e.metadata.deps.concat(b.deps):b.deps,e.metadata.execute=b.execute)}return S.call(t,e)}}function u(e){function t(e,t){return e.length<t.length?!1:e.substr(0,t.length)!=t?!1:e[t.length]&&"/"!=e[t.length]?!1:!0}function a(e){for(var t=1,a=0,r=e.length;r>a;a++)"/"===e[a]&&t++;return t}function r(e,t,a){return a+e.substr(t)}function n(e,n,o){var i,s,l,u,d=0,c=0;if(n)for(var f in o.map){var m=o.map[f];if("object"==typeof m&&t(n,f)&&(l=a(f),!(c>=l)))for(var p in m)t(e,p)&&(u=a(p),d>=u||(i=p,d=u,s=f,c=l))}if(i)return r(e,i.length,o.map[s][i]);for(var f in o.map){var m=o.map[f];if("string"==typeof m&&t(e,f)){var u=a(f);d>=u||(i=f,d=u)}}return i?r(e,i.length,o.map[i]):e}e.map=e.map||{},e._extensions.push(u);var o=e.normalize;e.normalize=function(e,t,a){var r=this;r.map||(r.map={});var i=!1;return"/"==e.substr(e.length-1,1)&&(i=!0,e+="#"),Promise.resolve(o.call(r,e,t,a)).then(function(e){if(e=n(e,t,r),i){var a=e.split("/");a.pop();var o=a.pop();a.push(o),a.push(o),e=a.join("/")}return e})}}function d(e){"undefined"==typeof h&&(h=Array.prototype.indexOf),e._extensions.push(d);var t=e.normalize;e.normalize=function(e,a,r){var n,o=this;return a&&-1!=(n=a.indexOf("!"))&&(a=a.substr(0,n)),Promise.resolve(t.call(o,e,a,r)).then(function(e){var t=e.lastIndexOf("!");if(-1!=t){var n=e.substr(0,t),i=e.substr(t+1)||n.substr(n.lastIndexOf(".")+1);return new Promise(function(e){e(o.normalize(i,a,r))}).then(function(e){return i=e,o.normalize(n,a,r)}).then(function(e){return e+"!"+i})}return e})};var a=e.locate;e.locate=function(e){var t=this,r=e.name;if(this.defined&&this.defined[r])return a.call(this,e);var n=r.lastIndexOf("!");if(-1!=n){var o=r.substr(n+1);e.name=r.substr(0,n);var i=t.pluginLoader||t;return i["import"](o).then(function(){var a=i.get(o);return a=a["default"]||a,a.build===!1&&t.pluginLoader&&(e.metadata.build=!1),e.metadata.plugin=a,e.metadata.pluginName=o,e.metadata.pluginArgument=e.name,a.locate?a.locate.call(t,e):Promise.resolve(t.locate(e)).then(function(e){return e.replace(/\.js$/,"")})})}return a.call(this,e)};var r=e.fetch;e.fetch=function(e){var t=this;return e.metadata.build===!1&&t.pluginLoader?"":e.metadata.plugin&&e.metadata.plugin.fetch&&!e.metadata.pluginFetchCalled?(e.metadata.pluginFetchCalled=!0,e.metadata.plugin.fetch.call(t,e,r)):r.call(t,e)};var n=e.translate;e.translate=function(e){var t=this;return e.metadata.plugin&&e.metadata.plugin.translate?Promise.resolve(e.metadata.plugin.translate.call(t,e)).then(function(a){return"string"==typeof a&&(e.source=a),n.call(t,e)}):n.call(t,e)};var o=e.instantiate;e.instantiate=function(e){var t=this;return e.metadata.plugin&&e.metadata.plugin.instantiate?Promise.resolve(e.metadata.plugin.instantiate.call(t,e)).then(function(a){return e.metadata.format="defined",e.metadata.execute=function(){return a},o.call(t,e)}):e.metadata.plugin&&e.metadata.plugin.build===!1?(e.metadata.format="defined",e.metadata.deps.push(e.metadata.pluginName),e.metadata.execute=function(){return t.newModule({})},o.call(t,e)):o.call(t,e)}}function c(e){function t(e,t){return Promise.resolve(e.normalize(t)).then(function(r){return-1==h.call(a,r)&&(a.push(r),e.bundles[r]=e.bundles[r]||e.bundles[t],e.meta=e.meta||{},e.meta[r]=e.meta[r]||{},e.meta[r].bundle=!0),e.load(r)}).then(function(){return""})}"undefined"==typeof h&&(h=Array.prototype.indexOf),e._extensions.push(c),e.bundles=e.bundles||{};var a=[],r=e.fetch;e.fetch=function(e){var n=this;if(n.trace)return r.call(this,e);n.bundles||(n.bundles={});for(var o=0;o<a.length;o++)if(-1!=h.call(n.bundles[a[o]],e.name))return t(n,a[o]);for(var i in n.bundles)if(-1!=h.call(n.bundles[i],e.name))return t(n,i);return r.call(this,e)}}function f(e){function t(e){return parseInt(e,10)}function a(e){var a=e.match(s);return a?{major:t(a[1]),minor:t(a[2]),patch:t(a[3]),pre:a[4]&&a[4].split(".")}:{tag:e}}function r(e,a){if(e.tag&&a.tag)return 0;if(e.tag)return-1;if(a.tag)return 1;for(var r=0;r<u.length;r++){var n=u[r],o=e[n],i=a[n];if(o!=i)return isNaN(o)?-1:isNaN(i)?1:o>i?1:-1}if(!e.pre&&!a.pre)return 0;if(!e.pre)return 1;if(!a.pre)return-1;for(var r=0,s=Math.min(e.pre.length,a.pre.length);s>r;r++)if(e.pre[r]!=a.pre[r]){var d=e.pre[r].match(l),c=a.pre[r].match(l);return d&&!c?-1:c&&!d?1:d&&c?t(e.pre[r])>t(a.pre[r])?1:-1:e.pre[r]>a.pre[r]?1:-1}return e.pre.length==a.pre.length?0:e.pre.length>a.pre.length?1:-1}function n(e,t){var a=e.version;return a.tag?a.tag==t.tag:1==r(a,t)?!1:isNaN(t.minor)||isNaN(t.patch)?!1:t.pre?a.major!=t.major||a.minor!=t.minor||a.patch!=t.patch?!1:e.semver||e.fuzzy||a.pre.join(".")==t.pre.join("."):e.semver?0==a.major&&isNaN(a.minor)?t.major<1:a.major>=1?a.major==t.major:a.minor>=1?a.minor==t.minor:(a.patch||0)==t.patch:e.fuzzy?t.major==a.major&&t.minor<(a.minor||0)+1:!a.pre&&a.major==t.major&&a.minor==t.minor&&a.patch==t.patch}function o(e){var t={};((t.semver="^"==e.substr(0,1))||(t.fuzzy="~"==e.substr(0,1)))&&(e=e.substr(1));var r=t.version=a(e);return r.tag?t:(t.fuzzy||t.semver||!isNaN(r.minor)&&!isNaN(r.patch)||(t.fuzzy=!0),t.fuzzy&&isNaN(r.minor)&&(t.semver=!0,t.fuzzy=!1),t.semver&&!isNaN(r.minor)&&isNaN(r.patch)&&(t.semver=!1,t.fuzzy=!0),t)}function i(e,t){return r(a(e),a(t))}"undefined"==typeof h&&(h=Array.prototype.indexOf),e._extensions.push(f);var s=/^(\d+)(?:\.(\d+)(?:\.(\d+)(?:-([\da-z-]+(?:\.[\da-z-]+)*)(?:\+([\da-z-]+(?:\.[\da-z-]+)*))?)?)?)?$/i,l=/^\d+$/,u=["major","minor","patch"];e.versions=e.versions||{};var d=e.normalize;e.normalize=function(e,t,r){this.versions||(this.versions={});var s,l,u=this.versions,c=-1!=e.indexOf("!")?0:e.lastIndexOf("@");if(c>0){var f=e.substr(c+1,e.length-c-1).split("/");s=f[0],l=f.length,e=e.substr(0,c)+e.substr(c+s.length+1,e.length-c-s.length-1)}return Promise.resolve(d.call(this,e,t,r)).then(function(e){var t=-1!=e.indexOf("!")?0:e.indexOf("@");if(s&&(-1==t||0==t)){var r=e.split("/");r[r.length-l]+="@"+s,e=r.join("/"),t=e.indexOf("@")}var d,c;if(-1==t||0==t){for(var f in u)if(c=u[f],e.substr(0,f.length)==f&&(d=e.substr(f.length,1),!d||"/"==d))return f+"@"+("string"==typeof c?c:c[c.length-1])+e.substr(f.length);return e}var m=e.substr(0,t),p=e.substr(t+1).split("/")[0],h=p.length,g=o(e.substr(t+1).split("/")[0]);c=u[e.substr(0,t)]||[],"string"==typeof c&&(c=[c]);for(var v=c.length-1;v>=0;v--)if(n(g,a(c[v])))return m+"@"+c[v]+e.substr(t+h+1);var b;return g.semver?b=0!=g.version.major||isNaN(g.version.minor)?g.version.major:"0."+g.version.minor:g.fuzzy?b=g.version.major+"."+g.version.minor:(b=p,c.push(p),c.sort(i),u[m]=1==c.length?c[0]:c),m+"@"+b+e.substr(t+h+1)})}}function m(e){e.depCache=e.depCache||{},e._extensions.push(m);var t=e.locate;e.locate=function(e){var a=this;a.depCache||(a.depCache={});var r=a.depCache[e.name];if(r)for(var n=0;n<r.length;n++)a.load(r[n]);return t.call(a,e)}}$__global.upgradeSystemLoader=void 0;var p,h=Array.prototype.indexOf||function(e){for(var t=0,a=this.length;a>t;t++)if(this[t]===e)return t;return-1},g="undefined"!=typeof process&&!!process.platform.match(/^win/);!function(){var e=$__global.System;p=$__global.System=new LoaderPolyfill(e),p.baseURL=e.baseURL,p.paths={"*":"*.js"},p.originalSystem=e}(),p.noConflict=function(){$__global.SystemJS=p,$__global.System=p.originalSystem};var v=$__global.System.originalSystem;a(p),r(p),n(p),o(p),i(p),s(p),l(p),u(p),d(p),c(p),f(p),m(p)};var $__curScript,__eval;!function(){var doEval;if(__eval=function(e,t,a){e+="\n//# sourceURL="+t+(a?"\n//# sourceMappingURL="+a:"");try{doEval(e)}catch(r){var n="Error evaluating "+t+"\n";throw r instanceof Error?r.message=n+r.message:r=n+r,r}},"undefined"!=typeof document){var head,scripts=document.getElementsByTagName("script");if($__curScript=scripts[scripts.length-1],doEval=function(e){head||(head=document.head||document.body||document.documentElement);var t=document.createElement("script");t.text=e;var a,r=window.onerror;if(window.onerror=function(e){a=e},head.appendChild(t),head.removeChild(t),window.onerror=r,a)throw a},$__global.System&&$__global.LoaderPolyfill)$__global.upgradeSystemLoader();else{var curPath=$__curScript.src,basePath=curPath.substr(0,curPath.lastIndexOf("/")+1);document.write('<script type="text/javascript" src="'+basePath+'es6-module-loader.js" data-init="upgradeSystemLoader"></script>')}}else if("undefined"!=typeof importScripts)if(doEval=function(source){try{eval(source)}catch(e){throw e}},$__global.System&&$__global.LoaderPolyfill)$__global.upgradeSystemLoader();else{var basePath="";try{throw new Error("Get worker base path via error stack")}catch(e){e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/,function(e,t){basePath=t.replace(/\/[^\/]*$/,"/")})}importScripts(basePath+"es6-module-loader.js"),$__global.upgradeSystemLoader()}else{var es6ModuleLoader=require("es6-module-loader");$__global.System=es6ModuleLoader.System,$__global.Loader=es6ModuleLoader.Loader,$__global.upgradeSystemLoader(),module.exports=$__global.System;var vm=require("vm");doEval=function(e){vm.runInThisContext(e)}}}()}("undefined"!=typeof window?window:"undefined"!=typeof global?global:self);
//# sourceMappingURL=system.js.map;
define("../libs/system", function(){});


    return require('tablefilter');

});