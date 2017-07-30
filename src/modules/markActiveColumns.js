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
        super(tf, 'markActiveColumns');

        let config = this.config.mark_active_columns || {};

        /**
         * Css class for filtered (active) columns
         * @type {String}
         */
        this.headerCssClass = defaultsStr(config.header_css_class,
            'activeHeader');

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
        let len = tf.getCellsNb();
        for (let i = 0; i < len; i++) {
            removeClass(tf.getHeaderElement(i), this.headerCssClass);
        }
    }

    /**
     * Mark currently filtered column
     * @param  {Number} colIndex Column index
     */
    markActiveColumn(colIndex) {
        let header = this.tf.getHeaderElement(colIndex);
        if (hasClass(header, this.headerCssClass)) {
            return;
        }
        this.onBeforeActiveColumn(this, colIndex);

        addClass(header, this.headerCssClass);

        this.onAfterActiveColumn(this, colIndex);
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
