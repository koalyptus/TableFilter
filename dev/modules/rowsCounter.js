define(['exports', '../dom', '../types', '../helpers'], function (exports, _dom, _types, _helpers) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var RowsCounter = (function () {

        /**
         * Rows counter
         * @param {Object} tf TableFilter instance
         */

        function RowsCounter(tf) {
            _classCallCheck(this, RowsCounter);

            // TableFilter configuration
            var f = tf.config();

            //id of custom container element
            this.rowsCounterTgtId = f.rows_counter_target_id || null;
            //element containing tot nb rows
            this.rowsCounterDiv = null;
            //element containing tot nb rows label
            this.rowsCounterSpan = null;
            //defines rows counter text
            this.rowsCounterText = f.rows_counter_text || 'Rows: ';
            this.fromToTextSeparator = f.from_to_text_separator || '-';
            this.overText = f.over_text || ' / ';
            //defines css class rows counter
            this.totRowsCssClass = f.tot_rows_css_class || 'tot';
            //rows counter div
            this.prfxCounter = 'counter_';
            //nb displayed rows label
            this.prfxTotRows = 'totrows_span_';
            //label preceding nb rows label
            this.prfxTotRowsTxt = 'totRowsTextSpan_';
            //callback raised before counter is refreshed
            this.onBeforeRefreshCounter = _types.Types.isFn(f.on_before_refresh_counter) ? f.on_before_refresh_counter : null;
            //callback raised after counter is refreshed
            this.onAfterRefreshCounter = _types.Types.isFn(f.on_after_refresh_counter) ? f.on_after_refresh_counter : null;

            this.tf = tf;
        }

        _createClass(RowsCounter, [{
            key: 'init',
            value: function init() {
                var tf = this.tf;

                if (!tf.hasGrid() && !tf.isFirstLoad || this.rowsCounterSpan) {
                    return;
                }

                //rows counter container
                var countDiv = _dom.Dom.create('div', ['id', this.prfxCounter + tf.id]);
                countDiv.className = this.totRowsCssClass;
                //rows counter label
                var countSpan = _dom.Dom.create('span', ['id', this.prfxTotRows + tf.id]);
                var countText = _dom.Dom.create('span', ['id', this.prfxTotRowsTxt + tf.id]);
                countText.appendChild(_dom.Dom.text(this.rowsCounterText));

                // counter is added to defined element
                if (!this.rowsCounterTgtId) {
                    tf.setToolbar();
                }
                var targetEl = !this.rowsCounterTgtId ? tf.lDiv : _dom.Dom.id(this.rowsCounterTgtId);

                //IE only: clears all for sure
                if (this.rowsCounterDiv && _helpers.Helpers.isIE()) {
                    this.rowsCounterDiv.outerHTML = '';
                }
                //default container: 'lDiv'
                if (!this.rowsCounterTgtId) {
                    countDiv.appendChild(countText);
                    countDiv.appendChild(countSpan);
                    targetEl.appendChild(countDiv);
                } else {
                    //custom container, no need to append statusDiv
                    targetEl.appendChild(countText);
                    targetEl.appendChild(countSpan);
                }
                this.rowsCounterDiv = countDiv;
                this.rowsCounterSpan = countSpan;

                this.refresh();
            }
        }, {
            key: 'refresh',
            value: function refresh(p) {
                if (!this.rowsCounterSpan) {
                    return;
                }

                var tf = this.tf;

                if (this.onBeforeRefreshCounter) {
                    this.onBeforeRefreshCounter.call(null, tf, this.rowsCounterSpan);
                }

                var totTxt;
                if (!tf.paging) {
                    if (p && p !== '') {
                        totTxt = p;
                    } else {
                        totTxt = tf.nbFilterableRows - tf.nbHiddenRows - (tf.hasVisibleRows ? tf.visibleRows.length : 0);
                    }
                } else {
                    var paging = tf.Cpt.paging;
                    if (paging) {
                        //paging start row
                        var paging_start_row = parseInt(paging.startPagingRow, 10) + (tf.nbVisibleRows > 0 ? 1 : 0);
                        var paging_end_row = paging_start_row + paging.pagingLength - 1 <= tf.nbVisibleRows ? paging_start_row + paging.pagingLength - 1 : tf.nbVisibleRows;
                        totTxt = paging_start_row + this.fromToTextSeparator + paging_end_row + this.overText + tf.nbVisibleRows;
                    }
                }
                this.rowsCounterSpan.innerHTML = totTxt;
                if (this.onAfterRefreshCounter) {
                    this.onAfterRefreshCounter.call(null, tf, this.rowsCounterSpan, totTxt);
                }
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                var tf = this.tf;
                if (!tf.hasGrid()) {
                    return;
                }
                if (!this.rowsCounterSpan) {
                    return;
                }

                if (!this.rowsCounterTgtId && this.rowsCounterDiv) {
                    //IE only: clears all for sure
                    if (_helpers.Helpers.isIE()) {
                        this.rowsCounterDiv.outerHTML = '';
                    } else {
                        this.rowsCounterDiv.parentNode.removeChild(this.rowsCounterDiv);
                    }
                } else {
                    _dom.Dom.id(this.rowsCounterTgtId).innerHTML = '';
                }
                this.rowsCounterSpan = null;
                this.rowsCounterDiv = null;
            }
        }]);

        return RowsCounter;
    })();

    exports.RowsCounter = RowsCounter;
});
//# sourceMappingURL=rowsCounter.js.map