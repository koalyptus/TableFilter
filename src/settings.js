import {isBoolean, isString, isFn, isArray} from './types';

/** Configuration settings helpers  */

/**
 * If passed value is not of boolean type return the default value
 * otherwise return the value itself
 * @param  {Boolean|Any}  value
 * @param  {Boolean} default value
 * @return {Boolean|Any}
 */
export const defaultsBool =
    (val, defaultVal) => isBoolean(val) ? val : defaultVal;

/**
 * If passed value is not of string type return the default value
 * otherwise return the value itself
 * @param  {String|Any}  value
 * @param  {String} default value
 * @return {String|Any}
 */
export const defaultsStr =
    (val, defaultVal) => isString(val) ? val : defaultVal;

/**
 * If passed value is not of number type return the default value
 * otherwise return the value itself
 * @param  {Number|Any}  value
 * @param  {Number} default value
 * @return {Number|Any}
 */
export const defaultsNb =
    (val, defaultVal) => isNaN(val) ? defaultVal : val;

/**
 * If passed value is not of array type return the default value
 * otherwise return the value itself
 * @param  {Array|Any}  value
 * @param  {Array} default value
 * @return {Array|Any}
 */
export const defaultsArr =
    (val, defaultVal) => isArray(val) ? val : defaultVal;

/**
 * If passed value is not of function type return the default value
 * otherwise return the value itself
 * @param  {Function|Any}  value
 * @param  {Function} default value
 * @return {Function|Any}
 */
export const defaultsFn =
    (val, defaultVal) => isFn(val) ? val : defaultVal;
