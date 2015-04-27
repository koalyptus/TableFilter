define(["exports", "./string"], function (exports, _string) {
    /**
     * Misc helpers
     */

    "use strict";

    var Str = _string.Str;

    var Helpers = {
        isIE: function isIE() {
            return /msie|MSIE/.test(navigator.userAgent);
        },

        removeNbFormat: function removeNbFormat(data, format) {
            if (!data) {
                return;
            }
            if (!format) {
                format = "us";
            }
            var n = data;
            if (Str.lower(format) === "us") {
                n = +n.replace(/[^\d\.-]/g, "");
            } else {
                n = +n.replace(/[^\d\,-]/g, "").replace(",", ".");
            }
            return n;
        }
    };

    exports.Helpers = Helpers;
});
//# sourceMappingURL=helpers.js.map