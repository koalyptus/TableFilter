import {Feature} from './feature';
import Dom from '../dom';

export class AlternateRows extends Feature {

    /**
     * Alternating rows color
     * @param {Object} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'alternateRows');

        var config = this.config;
        //defines css class for even rows
        this.evenCss = config.even_row_css_class || 'even';
        //defines css class for odd rows
        this.oddCss = config.odd_row_css_class || 'odd';
    }

    /**
     * Sets alternating rows color
     */
    init() {
        if(this.initialized){
            return;
        }

        this.processAll();

        // Subscribe to events
        this.emitter.on(['row-processed', 'row-paged'],
            (tf, rowIndex, arrIndex, isValid)=>
                this.processRow(rowIndex, arrIndex, isValid));
        this.emitter.on(['column-sorted'], ()=> this.processAll());

        this.initialized = true;
    }

    processAll() {
        if(!this.isEnabled()){
            return;
        }
        var tf = this.tf;
        var validRowsIndex = tf.getValidRows(true);
        var noValidRowsIndex = validRowsIndex.length === 0;
        //1st index
        var beginIndex = noValidRowsIndex ? tf.refRow : 0;
        // nb indexes
        var indexLen = noValidRowsIndex ?
                tf.nbFilterableRows+beginIndex :
                validRowsIndex.length;
        var idx = 0;

        //alternates bg color
        for(var j=beginIndex; j<indexLen; j++){
            var rowIdx = noValidRowsIndex ? j : validRowsIndex[j];
            this.setRowBg(rowIdx, idx);
            idx++;
        }
    }

    /**
     * Set/remove row background based on row validation
     * @param  {Number}  rowIdx  Row index
     * @param  {Boolean} isValid Valid row flag
     */
    processRow(rowIdx, arrIdx, isValid) {
        if(isValid){
            this.setRowBg(rowIdx, arrIdx);
        } else {
            this.removeRowBg(rowIdx);
        }
    }

    /**
     * Sets row background color
     * @param {Number} rowIdx Row index
     * @param {Number} idx    Valid rows collection index needed to calculate bg
     * color
     */
    setRowBg(rowIdx, idx) {
        if(!this.isEnabled() || isNaN(rowIdx)){
            return;
        }
        var rows = this.tf.tbl.rows;
        var i = isNaN(idx) ? rowIdx : idx;
        this.removeRowBg(rowIdx);

        Dom.addClass(
            rows[rowIdx],
            (i%2) ? this.evenCss : this.oddCss
        );
    }

    /**
     * Removes row background color
     * @param  {Number} idx Row index
     */
    removeRowBg(idx) {
        if(isNaN(idx)){
            return;
        }
        var rows = this.tf.tbl.rows;
        Dom.removeClass(rows[idx], this.oddCss);
        Dom.removeClass(rows[idx], this.evenCss);
    }

    /**
     * Removes all alternating backgrounds
     */
    destroy() {
        if(!this.initialized){
            return;
        }
        for(var i=0; i<this.tf.nbRows; i++){
            this.removeRowBg(i);
        }

        // Unsubscribe to events
        this.emitter.off(['row-processed', 'row-paged'],
            (tf, rowIndex, arrIndex, isValid)=>
                this.processRow(rowIndex, arrIndex, isValid));
        this.emitter.off(['column-sorted'], ()=> this.processAll());

        this.initialized = false;
    }

}
