import {BaseDropdown} from './baseDropdown';
import {createElm, createOpt, elm} from '../dom';
import {has} from '../array';
import {matchCase} from '../string';
import {addEvt, targetEvt} from '../event';
import {SELECT, MULTIPLE, NONE} from '../const';
import {defaultsStr, defaultsBool} from '../settings';

/**
 * Dropdown filter UI component
 * @export
 * @class Dropdown
 * @extends {BaseDropdown}
 */
export class Dropdown extends BaseDropdown {

    /**
     * Creates an instance of Dropdown
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, Dropdown);

        // Configuration object
        let f = this.config;

        /**
         * Enable the reset filter option as first item
         * @type {Boolean}
         */
        this.enableSlcResetFilter =
            defaultsBool(f.enable_slc_reset_filter, true);

        /**
         * Non empty option text
         * @type {String}
         */
        this.nonEmptyText = defaultsStr(f.non_empty_text, '(Non empty)');

        /**
         * Tooltip text appearing on multiple select
         * @type {String}
         */
        this.multipleSlcTooltip = defaultsStr(f.multiple_slc_tooltip,
            'Use Ctrl/Cmd key for multiple selections');
    }


    /**
     * Drop-down filter focus event handler
     * @param {Event} e DOM Event
     * @private
     */
    onSlcFocus(e) {
        let elm = targetEvt(e);
        let tf = this.tf;
        // select is populated when element has focus
        if (tf.loadFltOnDemand && elm.getAttribute('filled') === '0') {
            let ct = elm.getAttribute('ct');
            this.build(ct);
        }
        this.emitter.emit('filter-focus', tf, elm);
    }

    /**
     * Drop-down filter change event handler
     * @private
     */
    onSlcChange() {
        if (this.tf.onSlcChange) {
            this.tf.filter();
        }
    }

    /**
     * Refresh all drop-down filters
     */
    refreshAll() {
        let selectFlts = this.tf.getFiltersByType(SELECT, true);
        let multipleFlts = this.tf.getFiltersByType(MULTIPLE, true);
        let colIdxs = selectFlts.concat(multipleFlts);
        this.refreshFilters(colIdxs);
    }

    /**
     * Initialize drop-down filter
     * @param  {Number}     colIndex   Column index
     * @param  {Boolean}    isExternal External filter flag
     * @param  {DOMElement} container  Dom element containing the filter
     */
    init(colIndex, isExternal, container) {
        let tf = this.tf;
        let col = tf.getFilterType(colIndex);
        let externalFltTgtId = isExternal ?
            tf.externalFltIds[colIndex] : null;

        let slc = createElm(SELECT,
            ['id', tf.buildFilterId(colIndex)],
            ['ct', colIndex], ['filled', '0']
        );

        if (col === MULTIPLE) {
            slc.multiple = MULTIPLE;
            slc.title = this.multipleSlcTooltip;
        }
        slc.className = col.toLowerCase() === SELECT ?
            tf.fltCssClass : tf.fltMultiCssClass;

        //filter is appended in container element
        if (externalFltTgtId) {
            elm(externalFltTgtId).appendChild(slc);
        } else {
            container.appendChild(slc);
        }

        tf.fltIds.push(slc.id);

        if (!tf.loadFltOnDemand) {
            this.build(colIndex);
        } else {
            //1st option is created here since build isn't invoked
            let opt0 = createOpt(tf.getClearFilterText(colIndex), '');
            slc.appendChild(opt0);
        }

        addEvt(slc, 'change', () => this.onSlcChange());
        addEvt(slc, 'focus', (e) => this.onSlcFocus(e));

        this.emitter.on(
            ['build-select-filter'],
            (tf, colIndex, isLinked, isExternal) =>
                this.build(colIndex, isLinked, isExternal)
        );
        this.emitter.on(
            ['select-options'],
            (tf, colIndex, values) => this.selectOptions(colIndex, values)
        );
        this.emitter.on(['rows-changed'], () => this.refreshAll());

        this.emitter.on(['after-filtering'], () => this.linkFilters());

        /** @inherited */
        this.initialized = true;
    }

    /**
     * Build drop-down filter UI
     * @param  {Number}  colIndex    Column index
     * @param  {Boolean} isLinked    Enable linked filters behaviour
     */
    build(colIndex, isLinked = false) {
        let tf = this.tf;
        colIndex = Number(colIndex);

        this.emitter.emit('before-populating-filter', tf, colIndex);

        /** @inherited */
        this.opts = [];
        /** @inherited */
        this.optsTxt = [];

        let slc = tf.getFilterElement(colIndex);

        //custom select test
        /** @inherited */
        this.isCustom = tf.isCustomOptions(colIndex);

        //Retrieves custom values
        if (this.isCustom) {
            let customValues = tf.getCustomOptions(colIndex);
            this.opts = customValues[0];
            this.optsTxt = customValues[1];
        }

        //custom selects text
        let activeIdx;
        let activeFilterId = tf.getActiveFilterId();
        if (isLinked && activeFilterId) {
            activeIdx = tf.getColumnIndexFromFilterId(activeFilterId);
        }

        let excludedOpts = null,
            filteredDataCol = null;
        if (isLinked && tf.disableExcludedOptions) {
            excludedOpts = [];
            filteredDataCol = [];
        }

        let eachRow = tf.eachRow();
        eachRow(
            (row) => {
                let cellValue = tf.getCellValue(row.cells[colIndex]);
                //Vary Peter's patch
                let cellString = matchCase(cellValue, tf.caseSensitive);

                // checks if celldata is already in array
                if (!has(this.opts, cellString, tf.caseSensitive)) {
                    this.opts.push(cellValue);
                }

                if (isLinked && tf.disableExcludedOptions) {
                    let filteredCol = filteredDataCol[colIndex];
                    if (!filteredCol) {
                        filteredCol = tf.getVisibleColumnValues(colIndex);
                    }
                    if (!has(filteredCol, cellString, tf.caseSensitive) &&
                        !has(excludedOpts, cellString, tf.caseSensitive)) {
                        excludedOpts.push(cellValue);
                    }
                }
            },
            // continue conditions function
            (row, k) => {
                // excluded rows don't need to appear on selects as always valid
                if (tf.excludeRows.indexOf(k) !== -1) {
                    return true;
                }

                // checks if row has expected number of cells
                if (row.cells.length !== tf.nbCells || this.isCustom) {
                    return true;
                }

                if (isLinked && !this.isValidLinkedValue(k, activeIdx)) {
                    return true;
                }
            }
        );

        //sort options
        this.opts = this.sortOptions(colIndex, this.opts);
        if (excludedOpts) {
            excludedOpts = this.sortOptions(colIndex, excludedOpts);
        }

        //populates drop-down
        this.addOptions(colIndex, slc, isLinked, excludedOpts);

        this.emitter.emit('after-populating-filter', tf, colIndex, slc);
    }

    /**
     * Add drop-down options
     * @param {Number} colIndex     Column index
     * @param {Object} slc          Select Dom element
     * @param {Boolean} isLinked    Enable linked refresh behaviour
     * @param {Array} excludedOpts  Array of excluded options
     */
    addOptions(colIndex, slc, isLinked, excludedOpts) {
        let tf = this.tf,
            slcValue = slc.value;

        slc.innerHTML = '';
        slc = this.addFirstOption(slc);

        for (let y = 0; y < this.opts.length; y++) {
            if (this.opts[y] === '') {
                continue;
            }
            let val = this.opts[y]; //option value
            let lbl = this.isCustom ? this.optsTxt[y] : val; //option text
            let isDisabled = false;
            if (isLinked && tf.disableExcludedOptions &&
                has(excludedOpts, matchCase(val, tf.caseSensitive),
                    tf.caseSensitive)) {
                isDisabled = true;
            }

            let opt;
            //fill select on demand
            if (tf.loadFltOnDemand && slcValue === this.opts[y] &&
                tf.getFilterType(colIndex) === SELECT) {
                opt = createOpt(lbl, val, true);
            } else {
                opt = createOpt(lbl, val, false);
            }
            if (isDisabled) {
                opt.disabled = true;
            }
            slc.appendChild(opt);
        }// for y

        slc.setAttribute('filled', '1');
    }

    /**
     * Add drop-down header option
     * @param {Object} slc Select DOM element
     */
    addFirstOption(slc) {
        let tf = this.tf;
        let colIdx = tf.getColumnIndexFromFilterId(slc.id);
        let opt0 = createOpt((!this.enableSlcResetFilter ?
            '' : tf.getClearFilterText(colIdx)), '');
        if (!this.enableSlcResetFilter) {
            opt0.style.display = NONE;
        }
        slc.appendChild(opt0);
        if (tf.enableEmptyOption) {
            let opt1 = createOpt(tf.emptyText, tf.emOperator);
            slc.appendChild(opt1);
        }
        if (tf.enableNonEmptyOption) {
            let opt2 = createOpt(tf.nonEmptyText, tf.nmOperator);
            slc.appendChild(opt2);
        }
        return slc;
    }

    /**
     * Select filter options programmatically
     * @param  {Number} colIndex Column index
     * @param  {Array}  values   Array of option values to select
     */
    selectOptions(colIndex, values = []) {
        let tf = this.tf;
        if (values.length === 0) {
            return;
        }
        let slc = tf.getFilterElement(colIndex);
        [].forEach.call(slc.options, (option) => {
            // Empty value means clear all selections and first option is the
            // clear all option
            if (values[0] === '' || option.value === '') {
                option.selected = false;
            }

            if (option.value !== '' && has(values, option.value, true)) {
                option.selected = true;
            }//if
        });
    }

    /**
     * Get filter values for a given column index
     * @param {Number} colIndex Column index
     * @returns {Array}  values  Array of selected values
     */
    getValues(colIndex) {
        let tf = this.tf;
        let slc = tf.getFilterElement(colIndex);
        let values = [];

        // IE >= 9 does not support the selectedOptions property :(
        if (slc.selectedOptions) {
            [].forEach.call(slc.selectedOptions,
                option => values.push(option.value));
        } else {
            [].forEach.call(slc.options, (option) => {
                if (option.selected) {
                    values.push(option.value);
                }
            });
        }

        return values;
    }

    /**
     * Destroy Dropdown instance
     */
    destroy() {
        this.emitter.off(
            ['build-select-filter'],
            (colIndex, isLinked, isExternal) =>
                this.build(colIndex, isLinked, isExternal)
        );
        this.emitter.off(
            ['select-options'],
            (tf, colIndex, values) => this.selectOptions(colIndex, values)
        );
        this.emitter.off(['rows-changed'], () => this.refreshAll());
        this.emitter.off(['after-filtering'], () => this.linkFilters());
        this.initialized = false;
    }
}
