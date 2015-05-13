define(['exports', '../cookie'], function (exports, _cookie) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var Store = (function () {

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

        _createClass(Store, [{
            key: 'saveFilterValues',

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
                    if (value === '') {
                        value = ' ';
                    }
                    fltValues.push(value);
                }
                //adds array size
                fltValues.push(tf.fltIds.length);

                //writes cookie
                _cookie.Cookie.write(name, fltValues.join(tf.separator), this.duration);
            }
        }, {
            key: 'getFilterValues',

            /**
             * Retrieve filters' values from cookie
             * @param {String} cookie name
             * @return {Array}
             */
            value: function getFilterValues(name) {
                var flts = _cookie.Cookie.read(name);
                var rgx = new RegExp(this.tf.separator, 'g');
                // filters' values array
                return flts.split(rgx);
            }
        }, {
            key: 'savePageNb',

            /**
             * Store page number in cookie
             * @param {String} cookie name
             */
            value: function savePageNb(name) {
                _cookie.Cookie.write(name, this.tf.Cpt.paging.currentPageNb, this.duration);
            }
        }, {
            key: 'getPageNb',

            /**
             * Retrieve page number from cookie
             * @param {String} cookie name
             * @return {String}
             */
            value: function getPageNb(name) {
                return _cookie.Cookie.read(name);
            }
        }, {
            key: 'savePageLength',

            /**
             * Store page length in cookie
             * @param {String} cookie name
             */
            value: function savePageLength(name) {
                _cookie.Cookie.write(name, this.tf.Cpt.paging.resultsPerPageSlc.selectedIndex, this.duration);
            }
        }, {
            key: 'getPageLength',

            /**
             * Retrieve page length from cookie
             * @param {String} cookie name
             * @return {String}
             */
            value: function getPageLength(name) {
                return _cookie.Cookie.read(name);
            }
        }]);

        return Store;
    })();

    exports.Store = Store;
});
//# sourceMappingURL=store.js.map