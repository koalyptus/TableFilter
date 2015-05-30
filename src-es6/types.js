/**
 * Types utilities
 */

const UNDEFINED = void 0;

export default {
    /**
     * Checks if var exists and is an object
     * @param  {String or Object}  v
     * @return {Boolean}
     */
    isObj(v){
        let isO = false;
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
    },

    /**
     * Checks if passed parameter is a function
     * @param  {Function} fn
     * @return {Boolean}
     */
    isFn(fn){
        return (fn && fn.constructor == Function);
    },

    /**
     * Checks if passed param is an array
     * @param  {Array}  obj
     * @return {Boolean}
     */
    isArray(obj){
        return (obj && obj.constructor == Array);
    },

    /**
     * Determines if passed param is undefined
     * @param  {Any}  o
     * @return {Boolean}
     */
    isUndef(o){
        return  o === UNDEFINED;
    }

};
