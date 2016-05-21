/**
 * Array utilities
 */

import {matchCase} from './string';

export const has = (arr, val, caseSensitive) => {
    let sCase = Boolean(caseSensitive);
    for (var i = 0, l = arr.length; i < l; i++) {
        if (matchCase(arr[i].toString(), sCase) === val) {
            return true;
        }
    }
    return false;
}
