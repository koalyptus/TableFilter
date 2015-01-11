define(["exports", "../dom", "../types", "../helpers"], function (exports, _dom, _types, _helpers) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var Dom = _dom.Dom;
  var Types = _types.Types;
  var Helpers = _helpers.Helpers;
  var RowsCounter = (function () {
    var RowsCounter = function RowsCounter(tf) {
      // TableFilter configuration
      var f = tf.fObj;

      //id of custom container element
      this.rowsCounterTgtId = f.rows_counter_target_id || null;
      //element containing tot nb rows
      this.rowsCounterDiv = null;
      //element containing tot nb rows label
      this.rowsCounterSpan = null;
      //defines rows counter text
      this.rowsCounterText = f.rows_counter_text || "Rows: ";
      this.fromToTextSeparator = f.from_to_text_separator || "-";
      this.overText = f.over_text || " / ";
      //defines css class rows counter
      this.totRowsCssClass = f.tot_rows_css_class || "tot";
      //callback raised before counter is refreshed
      this.onBeforeRefreshCounter = Types.isFn(f.on_before_refresh_counter) ? f.on_before_refresh_counter : null;
      //callback raised after counter is refreshed
      this.onAfterRefreshCounter = Types.isFn(f.on_after_refresh_counter) ? f.on_after_refresh_counter : null;

      this.tf = tf;
    };

    _classProps(RowsCounter, null, {
      init: {
        writable: true,
        value: function () {
          var tf = this.tf;

          if ((!tf.hasGrid && !tf.isFirstLoad) || this.rowsCounterSpan) {
            return;
          }

          //rows counter container
          var countDiv = Dom.create("div", ["id", tf.prfxCounter + tf.id]);
          countDiv.className = this.totRowsCssClass;
          //rows counter label
          var countSpan = Dom.create("span", ["id", tf.prfxTotRows + tf.id]);
          var countText = Dom.create("span", ["id", tf.prfxTotRowsTxt + tf.id]);
          countText.appendChild(Dom.text(this.rowsCounterText));

          // counter is added to defined element
          if (!this.rowsCounterTgtId) {
            tf.SetTopDiv();
          }
          var targetEl = !this.rowsCounterTgtId ? tf.lDiv : Dom.id(this.rowsCounterTgtId);

          //IE only: clears all for sure
          if (this.rowsCounterDiv && Helpers.isIE()) {
            this.rowsCounterDiv.outerHTML = "";
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
      },
      refresh: {
        writable: true,
        value: function (p) {
          if (!this.rowsCounterSpan) {
            return;
          }

          var tf = this.tf;

          if (this.onBeforeRefreshCounter) {
            this.onBeforeRefreshCounter.call(null, tf, this.rowsCounterSpan);
          }

          var totTxt;
          if (!tf.paging) {
            if (p && p !== "") {
              totTxt = p;
            } else {
              totTxt = tf.nbFilterableRows - tf.nbHiddenRows - (tf.hasVisibleRows ? tf.visibleRows.length : 0);
            }
          } else {
            //paging start row
            var paging_start_row = parseInt(tf.startPagingRow, 10) + ((tf.nbVisibleRows > 0) ? 1 : 0);
            var paging_end_row = (paging_start_row + tf.pagingLength) - 1 <= tf.nbVisibleRows ? paging_start_row + tf.pagingLength - 1 : tf.nbVisibleRows;
            totTxt = paging_start_row + this.fromToTextSeparator + paging_end_row + this.overText + tf.nbVisibleRows;
          }
          this.rowsCounterSpan.innerHTML = totTxt;
          if (this.onAfterRefreshCounter) {
            this.onAfterRefreshCounter.call(null, tf, this.rowsCounterSpan, totTxt);
          }
        }
      },
      destroy: {
        writable: true,
        value: function () {
          var tf = this.tf;
          if (!tf.hasGrid) {
            return;
          }
          if (!this.rowsCounterSpan) {
            return;
          }

          if (!this.rowsCounterTgtId && this.rowsCounterDiv) {
            //IE only: clears all for sure
            if (Helpers.isIE()) {
              this.rowsCounterDiv.outerHTML = "";
            } else {
              this.rowsCounterDiv.parentNode.removeChild(this.rowsCounterDiv);
            }
          } else {
            Dom.id(this.rowsCounterTgtId).innerHTML = "";
          }
          this.rowsCounterSpan = null;
          this.rowsCounterDiv = null;
        }
      }
    });

    return RowsCounter;
  })();

  exports.RowsCounter = RowsCounter;
});