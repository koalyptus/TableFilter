/**
 * Misc helpers
 */

export const removeNbFormat = (data, format) => {
    if (!data) {
        return;
    }
    if (!format) {
        format = 'us';
    }
    let n = data;
    if (format.toLowerCase() === 'us') {
        n = + n.replace(/[^\d\.-]/g, '');
    } else {
        n = + n.replace(/[^\d\,-]/g, '').replace(',', '.');
    }
    return n;
}
