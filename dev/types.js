define(['exports'], function (exports) {
    /**
     * Types utilities
     */

    'use strict';

    var Types = {};

    var UNDEFINED = void 0;

    /**
     * Checks if var exists and is an object
     * @param  {String or Object}  v
     * @return {Boolean}
     */
    Types.isObj = function (v) {
        var isO = false;
        if (typeof v === 'string') {
            if (window[v] && typeof window[v] === 'object') {
                isO = true;
            }
        } else {
            if (v && typeof v === 'object') {
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
//# sourceMappingURL=types.js.map