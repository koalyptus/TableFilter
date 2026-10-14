import {isNumber} from './types';

/**
 * Formats a numeric value with configurable separators and affixes.
 * @param {Number|String} value Numeric value
 * @param {Object} [options={}] Formatting options
 * @param {String} [options.decimal='.'] Decimal separator
 * @param {String} [options.integerSeparator=','] Thousands separator
 * @param {Number} [options.precision] Fixed number of fraction digits
 * @param {Number} [options.round] Maximum number of fraction digits
 * @param {String} [options.prefix=''] Value prefix
 * @param {String} [options.suffix=''] Value suffix
 * @returns {String} Formatted number
 */
export const formatNumberValue = (value, options = {}) => {
    if (value === null || value === undefined ||
        (typeof value === 'string' && value.trim() === '')) {
        return '';
    }
    const num = Number(value);
    if (isNaN(num) || !isFinite(num)) {
        return '';
    }

    const decimal = options.decimal || '.';
    const integerSeparator = options.integerSeparator !== undefined ?
        options.integerSeparator : ',';
    const prefix = options.prefix || '';
    const suffix = options.suffix || '';
    const numericText = typeof value === 'string' ?
        value.trim() : num.toString();
    const coefficient = numericText.toLowerCase().split('e')[0];
    const exponent = Number(numericText.toLowerCase().split('e')[1] || 0);
    const decimalIndex = coefficient.indexOf('.');
    const inputPrecision = Math.max(0, decimalIndex < 0 ? 0 :
        coefficient.length - decimalIndex - 1 - exponent);
    const maximumPrecision = options.round !== undefined ? options.round :
        options.precision !== undefined ? options.precision :
            inputPrecision;
    const minimumPrecision = options.precision !== undefined ?
        Math.min(options.precision, maximumPrecision) :
        Math.min(inputPrecision, maximumPrecision);
    const formatter = new Intl.NumberFormat('en-US', {
        useGrouping: Boolean(integerSeparator),
        minimumFractionDigits: minimumPrecision,
        maximumFractionDigits: maximumPrecision
    });
    let sign = '';
    const formatted = formatter.formatToParts(num).map((part) => {
        if (part.type === 'group') {
            return integerSeparator;
        }
        if (part.type === 'decimal') {
            return decimal;
        }
        if (part.type === 'minusSign') {
            sign = part.value;
            return '';
        }
        return part.value;
    }).join('');

    return `${sign}${prefix}${formatted}${suffix}`;
};

/**
 * Takes a string, removes all formatting/cruft and returns the raw float value
 * @param {String} Formatted number
 * @param {String} Decimal type '.' or ','
 * @return {Number} Unformatted number
 *
 * https://github.com/openexchangerates/accounting.js/blob/master/accounting.js
 */
export const parse = (value, decimal = '.') => {
    // Return the value as-is if it's already a number
    if (isNumber(value)) {
        return value;
    }

    // Build regex to strip out everything except digits, decimal point and
    // minus sign
    let regex = new RegExp('[^0-9-' + decimal + ']', ['g']);
    let unformatted = parseFloat(
        ('' + value)
            // replace bracketed values with negatives
            .replace(/\((.*)\)/, '-$1')
            // strip out any cruft
            .replace(regex, '')
            // make sure decimal point is standard
            .replace(decimal, '.')
    );

    // This will fail silently
    return !isNaN(unformatted) ? unformatted : 0;
};
