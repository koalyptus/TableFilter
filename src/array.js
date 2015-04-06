define(["exports", "string"], function (exports, _string) {
    /**
     * Array utilities
     */

    "use strict";

    var Str = _string.Str;

    var Arr = {
        has: function has(arr, val, caseSensitive) {
            var sCase = caseSensitive === undefined ? false : caseSensitive;
            for (var i = 0; i < arr.length; i++) {
                if (Str.matchCase(arr[i].toString(), sCase) == val) {
                    return true;
                }
            }
            return false;
        },
        indexByValue: function indexByValue(arr, val, caseSensitive) {
            var sCase = caseSensitive === undefined ? false : caseSensitive;
            for (var i = 0; i < arr.length; i++) {
                if (Str.matchCase(arr[i].toString(), sCase) == val) {
                    return i;
                }
            }
            return -1;
        }
    };

    exports.Arr = Arr;
});
//# sourceMappingURL=array.js.map