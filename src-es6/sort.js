/**
 * Sort helpers
 */

import {Str} from './string';

var Sort = {
   ignoreCase(a, b){
        var x = Str.lower(a);
        var y = Str.lower(b);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }
};

exports.Sort = Sort;