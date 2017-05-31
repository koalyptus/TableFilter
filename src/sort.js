import {parse as parseNb} from './number';
import {Date as SugarDate} from 'sugar-date';

/** Sorting utilities */

/**
 * Case insensitive compare function for passed strings
 * @param  {String} First string
 * @param  {String} Second string
 * @return {Number} -1 if first string lower than second one
 *                  0 if first string same order as second one
 *                  1 if first string greater than second one
 */
export const ignoreCase = (a, b) => {
    let x = a.toLowerCase();
    let y = b.toLowerCase();
    return x < y ? -1 : (x > y ? 1 : 0);
};

/**
 * Compare function for sorting passed numbers in ascending manner
 * @param {Number} First number
 * @param {Number} Second number
 * @return {Number} Negative, zero or positive number
 */
export const numSortAsc = (a, b) => (a - b);

/**
 * Compare function for sorting passed numbers in descending manner
 * @param {Number} First number
 * @param {Number} Second number
 * @return {Number} Negative, zero or positive number
 */
export const numSortDesc = (a, b) => (b - a);

/**
 * Compare function for sorting passed dates in ascending manner according to
 * the corresponding UTC numeric value (returned by getTime)
 * @param {Date} First date object
 * @param {Date} Second date object
 * @return {Number} Negative, zero or positive number
 */
export const dateSortAsc = (date1, date2) => date1.getTime() - date2.getTime();

/**
 * Compare function for sorting passed dates in descending manner according to
 * the corresponding UTC numeric value (returned by getTime)
 * @param {Date} First date object
 * @param {Date} Second date object
 * @return {Number} Negative, zero or positive number
 */
export const dateSortDesc = (date1, date2) => date2.getTime() - date1.getTime();

/**
 * Curried compare function for sorting passed formatted numbers in desired
 * fashion according to supplied compare function and decimal separator
 * @param {Function} Compare function
 * @param {String} [decimal=','] Decimal separator
 * @return {Function} Compare function receiving parsed numeric arguments
 */
export const sortNumberStr = (compareFn, decimal = ',') => {
    return (numStr1, numStr2) => {
        let num1 = parseNb(numStr1, decimal);
        let num2 = parseNb(numStr2, decimal);
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
export const sortDateStr = (compareFn, locale = 'en-us') => {
    return (dateStr1, dateStr2) => {
        let date1 = SugarDate.create(dateStr1, locale);
        let date2 = SugarDate.create(dateStr2, locale);
        return compareFn(date1, date2);
    };
};
