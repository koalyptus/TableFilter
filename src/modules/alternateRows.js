define(['../dom'], function (dom) {
    'use strict';

    /**
     * Alternating rows color
     * @param {Object} tf TableFilter instance
     */
    function AlternateRows(tf) {
        var f = tf.fObj;
        //defines css class for even rows
        this.evenCss = f.even_row_css_class || 'even';
        //defines css class for odd rows
        this.oddCss = f.odd_row_css_class || 'odd';

        this.tf = tf;
    }

    /**
     * Sets alternating rows color
     */
    AlternateRows.prototype.set = function() {
        if(!this.tf.hasGrid && !this.tf.isFirstLoad){
            return;
        }
        var rows = this.tf.tbl.rows;
        var noValidRowsIndex = this.tf.validRowsIndex===null;
        //1st index
        var beginIndex = noValidRowsIndex ? this.tf.refRow : 0;
        // nb indexes
        var indexLen = noValidRowsIndex ?
                this.tf.nbFilterableRows+beginIndex :
                this.tf.validRowsIndex.length;
        var idx = 0;

        //alternates bg color
        for(var j=beginIndex; j<indexLen; j++){
            var rowIdx = noValidRowsIndex ? j : this.tf.validRowsIndex[j];
            this.setRowBg(rowIdx, idx);
            idx++;
        }
    };

    /**
     * Sets row background color
     * @param {Number} rowIdx Row index
     * @param {Number} idx    Valid rows collection index needed to calculate bg
     * color
     */
    AlternateRows.prototype.setRowBg = function(rowIdx, idx) {
        if(!this.tf.alternateBgs || isNaN(rowIdx)){
            return;
        }
        var rows = this.tf.tbl.rows;
        var i = !idx ? rowIdx : idx;
        this.removeRowBg(rowIdx);
        dom.addClass(
            rows[rowIdx],
            (i%2) ? this.evenCss : this.oddCss
        );
    };

    /**
     * Removes row background color
     * @param  {Number} idx Row index
     */
    AlternateRows.prototype.removeRowBg = function(idx) {
        if(isNaN(idx)){
            return;
        }
        var rows = this.tf.tbl.rows;
        dom.removeClass(rows[idx], this.oddCss);
        dom.removeClass(rows[idx], this.evenCss);
    };

    /**
     * Removes all row background color
     */
    AlternateRows.prototype.remove = function() {
        if(!this.tf.hasGrid){
            return;
        }
        var row = this.tf.tbl.rows;
        for(var i=this.tf.refRow; i<this.tf.nbRows; i++){
            this.removeRowBg(i);
        }
        this.tf.isStartBgAlternate = true;
    };

    AlternateRows.prototype.enable = function() {
        this.tf.alternateBgs = true;
    };

    AlternateRows.prototype.disable = function() {
        this.tf.alternateBgs = false;
    };

    return AlternateRows;
});
