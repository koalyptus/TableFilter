/**
 * Array utilities
 */

(function(global, TF){
    'use strict';

    var str = TF.Str;

    TF.Array = {
        has: function(arr, val, caseSensitive){
            var sCase = caseSensitive===undefined ? false : caseSensitive;
            for (var i=0; i<arr.length; i++){
                if(str.matchCase(arr[i].toString(), sCase) === val){
                    return true;
                }
            }
            return false;
        },
        indexByValue: function(arr, val, caseSensitive){
            var sCase = caseSensitive===undefined ? false : caseSensitive;
            for (var i=0; i<arr.length; i++){
                if(str.matchCase(arr[i].toString(), sCase) === val){
                    return i;
                }
            }
            return -1;
        }
    };

})(this, this.TF);