import {Feature} from '../feature';
import {addClass, removeClass, hasClass} from '../dom';
import {EMPTY_FN} from '../types';
import {defaultsStr, defaultsFn} from '../settings';

/**
 * Visual indicator for filtered columns
 * @export
 * @class MarkActiveColumns
 * @extends {Feature}
 */
export class MarkActiveColumns extends Feature {

    /**
     * Create an instance of MarkActiveColumns
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, MarkActiveColumns);

        let config = this.config.mark_active_columns || {};

        /**
         * Css class for filtered (active) columns
         * @type {String}
         */
        this.headerCssClass = defaultsStr(config.header_css_class,
            'activeHeader');

        /**
         * Css class for filtered (active) column cells
         * @type {String}
         */
        this.cellCssClass = defaultsStr(config.cell_css_class,
            'activeCell');

        /**
         * Enable/disable column highlighting
         * @type {Boolean}
         */
        this.highlightColumn = Boolean(config.highlight_column);

        /**
         * Callback fired before a column is marked as filtered
         * @type {Function}
         */
        this.onBeforeActiveColumn = defaultsFn(config.on_before_active_column,
            EMPTY_FN);

        /**
         * Callback fired after a column is marked as filtered
         * @type {Function}
         */
        this.onAfterActiveColumn = defaultsFn(config.on_after_active_column,
            EMPTY_FN);
    }

    /**
     * Initialise MarkActiveColumns instance
     */
    init() {
        if (this.initialized) {
            return;
        }

        this.emitter.on(['before-filtering'], () => this.clearActiveColumns());
        this.emitter.on(
            ['cell-processed'],
            (tf, colIndex) => this.markActiveColumn(colIndex)
        );

        /** @inherited */
        this.initialized = true;
    }

    /**
     * Clear filtered columns visual indicator (background color)
     */
    clearActiveColumns() {
        let tf = this.tf;
        tf.eachCol((idx) => {
            removeClass(tf.getHeaderElement(idx), this.headerCssClass);

            if (this.highlightColumn) {
                this.eachColumnCell(idx,
                    (cell) => removeClass(cell, this.cellCssClass));
            }
        });
    }

    /**
     * Mark currently filtered column
     * @param  {Number} colIndex Column index
     */
    markActiveColumn(colIndex) {
        let tf = this.tf;
        let header = tf.getHeaderElement(colIndex);
        if (hasClass(header, this.headerCssClass)) {
            return;
        }

        this.onBeforeActiveColumn(this, colIndex);

        addClass(header, this.headerCssClass);

        if (this.highlightColumn) {
            this.eachColumnCell(colIndex,
                (cell) => addClass(cell, this.cellCssClass));
        }

        this.onAfterActiveColumn(this, colIndex);
    }

    /**
     * Column cells iterator
     * TODO: make public and move into TableFilter if used elsewhere
     * @param {Number} colIndex
     * @param {Function} fn
     * @param {DOMElement} tbl
     * @private
     */
    eachColumnCell(colIndex, fn = EMPTY_FN, tbl = this.tf.dom()) {
        // TODO: remove [].forEach when polyfill for PhanthomJs is available
        [].forEach.call(
            tbl.querySelectorAll(`tbody td:nth-child(${colIndex + 1})`), fn);
    }

    /**
     * Remove feature
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        this.clearActiveColumns();
        this.emitter.off(['before-filtering'], () => this.clearActiveColumns());
        this.emitter.off(
            ['cell-processed'],
            (tf, colIndex) => this.markActiveColumn(colIndex)
        );

        /** @inherited */
        this.initialized = false;
    }
}
