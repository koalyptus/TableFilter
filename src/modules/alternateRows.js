import {Feature} from '../feature';
import {addClass, removeClass} from '../dom';
import {defaultsStr} from '../settings';
import {bound} from '../event';

/**
 * Rows with alternating background color for improved readability
 */
export class AlternateRows extends Feature {

    /**
     * Creates an instance of AlternateRows.
     *
     * @param {Object} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, AlternateRows);

        let config = this.config;

        /**
         * Css class for even rows (default: 'even')
         * @type {String}
         */
        this.evenCss = defaultsStr(config.even_row_css_class, 'even');

        /**
         * Css class for odd rows (default: 'odd')
         * @type {String}
         */
        this.oddCss = defaultsStr(config.odd_row_css_class, 'odd');
    }

    /**
     * Sets alternating rows color
     */
    init() {
        if (this.initialized) {
            return;
        }

        this.processAll();

        // Subscribe to events
        this.emitter.on(['row-processed', 'row-paged'],
            bound(this.processRowHandler, this));
        this.emitter.on(['column-sorted', 'rows-changed'],
            bound(this.processAll, this));

        /** @inherited */
        this.initialized = true;
    }

    /**
     * Apply background to all valid rows
     */
    processAll() {
        if (!this.isEnabled()) {
            return;
        }
        let tf = this.tf;
        let validRowsIndex = tf.getValidRows(true);
        let indexLen = validRowsIndex.length;
        let idx = 0;

        //alternates bg color
        for (let j = 0; j < indexLen; j++) {
            let rowIdx = validRowsIndex[j];
            this.setRowBg(rowIdx, idx);
            idx++;
        }
    }

    /**
     * Set/remove row background based on row validation
     * @param  {Number}  rowIdx  Row index
     * @param  {Number}  arrIdx  Array index
     * @param  {Boolean} isValid Valid row flag
     */
    processRow(rowIdx, arrIdx, isValid) {
        if (isValid) {
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
     * @private
     */
    setRowBg(rowIdx, idx) {
        if (!this.isEnabled() || isNaN(rowIdx)) {
            return;
        }
        let rows = this.tf.dom().rows;
        let i = isNaN(idx) ? rowIdx : idx;
        this.removeRowBg(rowIdx);

        addClass(rows[rowIdx], (i % 2) ? this.evenCss : this.oddCss);
    }

    /**
     * Removes row background color
     * @param  {Number} idx Row index
     * @private
     */
    removeRowBg(idx) {
        if (isNaN(idx)) {
            return;
        }
        let rows = this.tf.dom().rows;
        removeClass(rows[idx], this.oddCss);
        removeClass(rows[idx], this.evenCss);
    }

    /** @private */
    processRowHandler(tf, rowIndex, arrIndex, isValid) {
        this.processRow(rowIndex, arrIndex, isValid);
    }

    /**
     * Removes all alternating backgrounds
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        let eachRow = this.tf.eachRow(0);
        eachRow((row, i) => this.removeRowBg(i));

        // Unsubscribe to events
        this.emitter.off(['row-processed', 'row-paged'],
            bound(this.processRowHandler, this));
        this.emitter.off(['column-sorted', 'rows-changed'],
            bound(this.processAll, this));

        this.initialized = false;
    }

}
