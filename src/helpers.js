/**
 * Misc helpers
 */

/**
 * Returns a unformatted number
 * @param {String} Formatted number
 * @param {String} Format type, currently 'us' or 'eu'
 * @return {String} Unformatted number
 */
export const removeNbFormat = (data, format = 'us') => {
    if (!data) {
        return;
    }

    let n = data;
    if (format.toLowerCase() === 'us') {
        n = + n.replace(/[^\d\.-]/g, '');
    } else {
        n = + n.replace(/[^\d\,-]/g, '').replace(',', '.');
    }
    return n;
}
