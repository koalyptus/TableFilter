define(["exports"], function (exports) {
    "use strict";

    /**
     * Misc helpers
     */

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
            if (str.lower(format) === "us") {
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