import {isNumber} from './types';

/**
 * Formats a numeric value with configurable separators and affixes.
 *
 * Supported options: `locale`, `decimal`, `integerSeparator`, `precision`,
 * `round`, `prefix` and `suffix`. The `format-number` options `truncate`,
 * `padLeft`, `padRight`, `negativeType`, `negativeLeftSymbol`,
 * `negativeRightSymbol`, `negativeOut`, `decimalsSeparator` and `noUnits`
 * have no effect. `integerSeparator: null` disables grouping. Values of
 * magnitude 1e21 and above are rendered in full instead of exponential
 * notation.
 *
 * Requires `Intl.NumberFormat.prototype.formatToParts` (Chrome 64+, Edge 79+,
 * Firefox 58+, Safari 11+, Node 10+).
 * @param {Number|String} value Numeric value
 * @param {Object} [options={}] Formatting options
 * @param {String} [options.locale='en'] Intl locale
 * @param {String} [options.decimal] Decimal separator override
 * @param {String|null} [options.integerSeparator] Thousands separator override:
 * `undefined` uses locale default grouping, `null` or `''` disables grouping
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

    const locale = options.locale || 'en';
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
    const formatter = new Intl.NumberFormat(locale, {
        useGrouping: options.integerSeparator === undefined ||
            Boolean(options.integerSeparator),
        minimumFractionDigits: minimumPrecision,
        maximumFractionDigits: maximumPrecision
    });
    let sign = '';
    const formatted = formatter.formatToParts(num).map((part) => {
        if (part.type === 'group') {
            return options.integerSeparator === undefined ?
                part.value : options.integerSeparator;
        }
        if (part.type === 'decimal') {
            return options.decimal || part.value;
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
