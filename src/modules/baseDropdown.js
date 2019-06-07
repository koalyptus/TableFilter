import {Feature} from '../feature';
import {
    ignoreCase, numSortAsc, numSortDesc,
    dateSortAsc, dateSortDesc, sortNumberStr, sortDateStr
} from '../sort';
import {isArray, isObj, isEmpty} from '../types';
import {NUMBER, FORMATTED_NUMBER, DATE} from '../const';

/**
 * Base class for Dropdown and CheckList UI components
 * @export
 * @class BaseDropdown
 * @extends {Feature}
 */
export class BaseDropdown extends Feature {

    /**
     * Creates an instance of BaseDropdown
     * @param {TableFilter} tf
     */
    constructor(tf, cls) {
        super(tf, cls);

        let f = this.config;

        /**
         * Filter options custom sorter on a column basis
         * @type {Object}
         */
        this.customSorter = isObj(f.filter_options_sorter) &&
            isArray(f.filter_options_sorter.col) &&
            isArray(f.filter_options_sorter.comparer) ?
            f.filter_options_sorter :
            null;

        // TODO: move here all properties shared by Dropdown and CheckList

        /**
         * Has custom options
         * @type {Boolean}
         * @private
         */
        this.isCustom = false;

        /**
         * List of options values
         * @type {Array}
         * @private
         */
        this.opts = [];

        /**
         * List of options texts for custom values
         * @type {Array}
         * @private
         */
        this.optsTxt = [];

        /**
         * List of options to be excluded from the checklist filter
         * @type {Array}
         * @private
         */
        this.excludedOpts = [];
    }

    /**
     * Sort passed options based on the type of the specified column
     * @param {Number} colIndex Column index
     * @param {Array} [options=[]] Collection of values
     * @return {Array} Sorted values
     * @private
     */
    sortOptions(colIndex, options = []) {
        let {tf} = this;

        if (tf.isCustomOptions(colIndex) || !tf.sortSlc ||
            (isArray(tf.sortSlc) && tf.sortSlc.indexOf(colIndex) === -1)) {
            return options;
        }

        let { caseSensitive, sortFilterOptionsDesc } = tf;
        let isSortDesc = sortFilterOptionsDesc.indexOf(colIndex) !== -1;
        let compareFn;

        if (this.customSorter &&
            this.customSorter.col.indexOf(colIndex) !== -1) {
            var idx = this.customSorter.col.indexOf(colIndex);
            compareFn = this.customSorter.comparer[idx];
        }
        else if (tf.hasType(colIndex, [NUMBER, FORMATTED_NUMBER])) {
            let decimal = tf.getDecimal(colIndex);
            let comparer = isSortDesc ? numSortDesc : numSortAsc;
            compareFn = sortNumberStr(comparer, decimal);
        }
        else if (tf.hasType(colIndex, [DATE])) {
            let locale = tf.feature('dateType').getLocale(colIndex);
            let comparer = isSortDesc ? dateSortDesc : dateSortAsc;
            compareFn = sortDateStr(comparer, locale);
        } else { // string
            compareFn = caseSensitive ? undefined : ignoreCase;
            if (isSortDesc) {
                return options.sort(compareFn).reverse();
            }
        }

        return options.sort(compareFn);
    }

    /**
     * Regenerate filters of specified columns and maintain selection if any
     * @param {Array} colIndexes Collection of column indexes
     * @private
     */
    refreshFilters(colIndexes) {
        colIndexes.forEach((colIdx) => {
            let values = this.getValues(colIdx);
            this.build(colIdx, this.tf.linkedFilters);
            this.selectOptions(colIdx, values);
        });
    }

    /**
     * Check passed row contains a valid linked value
     * @param {Number} rowIdx Row index
     * @param {Number} activeFilterIdx Current active filter index
     * @returns {Boolean}
     */
    isValidLinkedValue(rowIdx, activeFilterIdx) {
        let tf = this.tf;

        if (tf.disableExcludedOptions) {
            return true;
        }

        if (tf.paging) {
            if (!isEmpty(activeFilterIdx) && tf.isRowValid(rowIdx)) {
                return true;
            }
        } else {
            if (tf.isRowDisplayed(rowIdx)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Refresh linked filters to offer only selected options
     */
    linkFilters() {
        let tf = this.tf;
        if (!tf.linkedFilters || !tf.activeFilterId) {
            return;
        }

        this.refreshAll();
    }
}
