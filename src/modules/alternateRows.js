define(["exports", "../dom"], function (exports, _dom) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var dom = _dom;
  var AlternateRows = (function () {
    var AlternateRows = function AlternateRows(tf) {
      var f = tf.fObj;
      //defines css class for even rows
      this.evenCss = f.even_row_css_class || "even";
      //defines css class for odd rows
      this.oddCss = f.odd_row_css_class || "odd";

      this.tf = tf;
    };

    _classProps(AlternateRows, null, {
      set: {
        writable: true,
        value: function () {
          if (!this.tf.hasGrid && !this.tf.isFirstLoad) {
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
      },
      setRowBg: {
        writable: true,
        value: function (rowIdx, idx) {
          if (!this.tf.alternateBgs || isNaN(rowIdx)) {
            return;
          }
          var rows = this.tf.tbl.rows;
          var i = !idx ? rowIdx : idx;
          this.removeRowBg(rowIdx);
          dom.addClass(rows[rowIdx], (i % 2) ? this.evenCss : this.oddCss);
        }
      },
      removeRowBg: {
        writable: true,
        value: function (idx) {
          if (isNaN(idx)) {
            return;
          }
          var rows = this.tf.tbl.rows;
          dom.removeClass(rows[idx], this.oddCss);
          dom.removeClass(rows[idx], this.evenCss);
        }
      },
      remove: {
        writable: true,
        value: function () {
          if (!this.tf.hasGrid) {
            return;
          }
          var row = this.tf.tbl.rows;
          for (var i = this.tf.refRow; i < this.tf.nbRows; i++) {
            this.removeRowBg(i);
          }
          this.tf.isStartBgAlternate = true;
        }
      },
      enable: {
        writable: true,
        value: function () {
          this.tf.alternateBgs = true;
        }
      },
      disable: {
        writable: true,
        value: function () {
          this.tf.alternateBgs = false;
        }
      }
    });

    return AlternateRows;
  })();

  exports.AlternateRows = AlternateRows;
});