define(["exports", "../cookie"], function (exports, _cookie) {
    "use strict";

    var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var Cookie = _cookie.Cookie;

    var Store = exports.Store = (function () {

        /**
         * Store, persistence manager
         * @param {Object} tf TableFilter instance
         */

        function Store(tf) {
            _classCallCheck(this, Store);

            var f = tf.config();

            this.duration = !isNaN(f.set_cookie_duration) ? parseInt(f.set_cookie_duration, 10) : 100000;

            this.tf = tf;
        }

        _prototypeProperties(Store, null, {
            saveFilterValues: {

                /**
                 * Store filters' values in cookie
                 * @param {String} cookie name
                 */

                value: function saveFilterValues(name) {
                    var tf = this.tf;
                    var fltValues = [];
                    //store filters' values
                    for (var i = 0; i < tf.fltIds.length; i++) {
                        var value = tf.getFilterValue(i);
                        if (value === "") {
                            value = " ";
                        }
                        fltValues.push(value);
                    }
                    //adds array size
                    fltValues.push(tf.fltIds.length);

                    //writes cookie
                    Cookie.write(name, fltValues.join(tf.separator), this.duration);
                },
                writable: true,
                configurable: true
            },
            getFilterValues: {

                /**
                 * Retrieve filters' values from cookie
                 * @param {String} cookie name
                 * @return {Array}
                 */

                value: function getFilterValues(name) {
                    var flts = Cookie.read(name);
                    var rgx = new RegExp(this.tf.separator, "g");
                    // filters' values array
                    return flts.split(rgx);
                },
                writable: true,
                configurable: true
            },
            savePageNb: {

                /**
                 * Store page number in cookie
                 * @param {String} cookie name
                 */

                value: function savePageNb(name) {
                    Cookie.write(name, this.tf.Cpt.paging.currentPageNb, this.duration);
                },
                writable: true,
                configurable: true
            },
            getPageNb: {

                /**
                 * Retrieve page number from cookie
                 * @param {String} cookie name
                 * @return {String}
                 */

                value: function getPageNb(name) {
                    return Cookie.read(name);
                },
                writable: true,
                configurable: true
            },
            savePageLength: {

                /**
                 * Store page length in cookie
                 * @param {String} cookie name
                 */

                value: function savePageLength(name) {
                    Cookie.write(name, this.tf.Cpt.paging.resultsPerPageSlc.selectedIndex, this.duration);
                },
                writable: true,
                configurable: true
            },
            getPageLength: {

                /**
                 * Retrieve page length from cookie
                 * @param {String} cookie name
                 * @return {String}
                 */

                value: function getPageLength(name) {
                    return Cookie.read(name);
                },
                writable: true,
                configurable: true
            }
        });

        return Store;
    })();

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
});
//# sourceMappingURL=store.js.map