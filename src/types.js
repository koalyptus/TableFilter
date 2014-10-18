/**
 * Types utilities
 */

(function(window, TF){
    'use strict';

    TF.Types = {};

    /**
     * Checks if var exists and is an object
     * @param  {String or Object}  v
     * @return {Boolean}
     */
    TF.Types.isObj = function(v){
        var isO = false;
        if(typeof v === 'string'){
            if(window[v] && typeof window[v] === 'object'){
                isO = true;
            }
        } else {
            if(v && typeof v === 'object'){
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
    TF.Types.isFn = function(fn){
        return (fn && fn.constructor == Function);
    };

    /**
     * Checks if passed param is an array
     * @param  {Array}  obj
     * @return {Boolean}
     */
    TF.Types.isArray = function(obj){
        return (obj && obj.constructor == Array);
    };

})(this, this.TF);