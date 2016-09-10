import {isNumber} from './types';
import {FORMATTED_NUMBER} from './const';

/**
 * Returns a number for a formatted number
 * @param {String} Formatted number
 * @param {String} Format type, currently 'formatted-number' or
 * 'formatted-number-eu'
 * @return {Number} Unformatted number
 */
export const unformat = (value, format = FORMATTED_NUMBER) => {
    // Return the value as-is if it's already a number
    if (isNumber(value)) {
        return value;
    }

    // Build regex to strip out everything except digits, decimal point and
    // minus sign
    let decimal = format !== FORMATTED_NUMBER ? ',' : '.';
    let regex = new RegExp('[^0-9-' + decimal + ']', ['g']);
    let unformatted = parseFloat(
        ('' + value)
        .replace(/\((.*)\)/, '-$1') // replace bracketed values with negatives
        .replace(regex, '')         // strip out any cruft
        .replace(decimal, '.')      // make sure decimal point is standard
    );

    // This will fail silently
    return !isNaN(unformatted) ? unformatted : 0;
}
