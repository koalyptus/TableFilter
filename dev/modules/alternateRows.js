define(['exports', '../dom'], function (exports, _dom) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var AlternateRows = (function () {

        /**
         * Alternating rows color
         * @param {Object} tf TableFilter instance
         */

        function AlternateRows(tf) {
            _classCallCheck(this, AlternateRows);

            var f = tf.config();
            //defines css class for even rows
            this.evenCss = f.even_row_css_class || 'even';
            //defines css class for odd rows
            this.oddCss = f.odd_row_css_class || 'odd';

            this.tf = tf;
        }

        _createClass(AlternateRows, [{
            key: 'init',

            /**
             * Sets alternating rows color
             */
            value: function init() {
                if (!this.tf.hasGrid() && !this.tf.isFirstLoad) {
                    return;
                }
                var rows = this.tf.tbl.rows;
                var noValidRowsIndex = this.tf.validRowsIndex === null;
                //1st index
                var beginIndex = noValidRowsIndex ? this.tf.refRow : 0;
                // nb indexes
                var indexLen = noValidRowsIndex ? this.tf.nbFilterableRows + beginIndex : this.tf.validRowsIndex.length;
                var idx = 0;

                //alternates bg color
                for (var j = beginIndex; j < indexLen; j++) {
                    var rowIdx = noValidRowsIndex ? j : this.tf.validRowsIndex[j];
                    this.setRowBg(rowIdx, idx);
                    idx++;
                }
            }
        }, {
            key: 'setRowBg',

            /**
             * Sets row background color
             * @param {Number} rowIdx Row index
             * @param {Number} idx    Valid rows collection index needed to calculate bg
             * color
             */
            value: function setRowBg(rowIdx, idx) {
                if (!this.tf.alternateBgs || isNaN(rowIdx)) {
                    return;
                }
                var rows = this.tf.tbl.rows;
                var i = !idx ? rowIdx : idx;
                this.removeRowBg(rowIdx);
                _dom.Dom.addClass(rows[rowIdx], i % 2 ? this.evenCss : this.oddCss);
            }
        }, {
            key: 'removeRowBg',

            /**
             * Removes row background color
             * @param  {Number} idx Row index
             */
            value: function removeRowBg(idx) {
                if (isNaN(idx)) {
                    return;
                }
                var rows = this.tf.tbl.rows;
                _dom.Dom.removeClass(rows[idx], this.oddCss);
                _dom.Dom.removeClass(rows[idx], this.evenCss);
            }
        }, {
            key: 'remove',

            /**
             * Removes all row background color
             */
            value: function remove() {
                if (!this.tf.hasGrid()) {
                    return;
                }
                var row = this.tf.tbl.rows;
                for (var i = this.tf.refRow; i < this.tf.nbRows; i++) {
                    this.removeRowBg(i);
                }
                this.tf.isStartBgAlternate = true;
            }
        }, {
            key: 'enable',
            value: function enable() {
                this.tf.alternateBgs = true;
            }
        }, {
            key: 'disable',
            value: function disable() {
                this.tf.alternateBgs = false;
            }
        }]);

        return AlternateRows;
    })();

    exports.AlternateRows = AlternateRows;
});
//# sourceMappingURL=alternateRows.js.map