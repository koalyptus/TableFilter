import {BaseDropdown} from './baseDropdown';
import {
    addClass, createCheckItem, createText, createElm, elm, removeClass, tag
} from '../dom';
import {has} from '../array';
import {matchCase, trim, rgxEsc} from '../string';
import {addEvt, removeEvt, targetEvt} from '../event';
import {isEmpty} from '../types';
import {CHECKLIST, NONE} from '../const';
import {defaultsStr, defaultsBool} from '../settings';

/**
 * Checklist filter UI component
 * @export
 * @class CheckList
 * @extends {BaseDropdown}
 */
export class CheckList extends BaseDropdown {

    /**
     * Creates an instance of CheckList
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, CheckList);

        let f = this.config;

        /**
         * List of container DOM elements
         * @type {Array}
         */
        this.containers = [];

        /**
         * Css class for the container of the checklist filter (div)
         * @type {String}
         */
        this.containerCssClass = defaultsStr(f.div_checklist_css_class,
            'div_checklist');

        /**
         * Css class for the checklist filter element (ul)
         * @type {String}
         */
        this.filterCssClass = defaultsStr(f.checklist_css_class,
            'flt_checklist');

        /**
         * Css class for the item of a checklist (li)
         * @type {String}
         */
        this.itemCssClass = defaultsStr(f.checklist_item_css_class,
            'flt_checklist_item');

        /**
         * Css class for a selected item of a checklist (li)
         * @type {String}
         */
        this.selectedItemCssClass = defaultsStr(
            f.checklist_selected_item_css_class,
            'flt_checklist_slc_item'
        );

        /**
         * Text placed in the filter's container when load filter on demand
         * feature is enabled
         * @type {String}
         */
        this.activateText = defaultsStr(
            f.activate_checklist_text,
            'Click to load filter data'
        );

        /**
         * Css class for a disabled item of a checklist (li)
         * @type {String}
         */
        this.disabledItemCssClass = defaultsStr(
            f.checklist_item_disabled_css_class,
            'flt_checklist_item_disabled'
        );

        /**
         * Enable the reset filter option as first item
         * @type {Boolean}
         */
        this.enableResetOption = defaultsBool(f.enable_checklist_reset_filter,
            true);

        /**
         * Prefix for container element ID
         * @type {String}
         * @private
         */
        this.prfx = 'chkdiv_';
    }

    /**
     * Checklist option click event handler
     * @param {Event} evt
     * @private
     */
    optionClick(evt) {
        let elm = targetEvt(evt);
        let tf = this.tf;

        this.emitter.emit('filter-focus', tf, elm);
        this.setItemOption(elm);
        tf.filter();
    }

    /**
     * Checklist container click event handler for load-on-demand feature
     * @param {Event} evt
     * @private
     */
    onCheckListClick(evt) {
        let elm = targetEvt(evt);
        if (this.tf.loadFltOnDemand && elm.getAttribute('filled') === '0') {
            let ct = elm.getAttribute('ct');
            let div = this.containers[ct];
            this.build(ct);
            removeEvt(div, 'click', (evt) => this.onCheckListClick(evt));
        }
    }

    /**
     * Refresh all checklist filters
     */
    refreshAll() {
        let colIdxs = this.tf.getFiltersByType(CHECKLIST, true);
        this.refreshFilters(colIdxs);
    }

    /**
     * Initialize checklist filter
     * @param  {Number}     colIndex   Column index
     * @param  {Boolean}    isExternal External filter flag
     * @param  {DOMElement} container  Dom element containing the filter
     */
    init(colIndex, isExternal, container) {
        let tf = this.tf;
        let externalFltTgtId = isExternal ?
            tf.externalFltIds[colIndex] : null;

        let divCont = createElm('div',
            ['id', `${this.prfx}${colIndex}_${tf.id}`],
            ['ct', colIndex], ['filled', '0']);
        divCont.className = this.containerCssClass;

        //filter is appended in desired element
        if (externalFltTgtId) {
            elm(externalFltTgtId).appendChild(divCont);
        } else {
            container.appendChild(divCont);
        }

        this.containers[colIndex] = divCont;
        tf.fltIds.push(tf.buildFilterId(colIndex));

        if (!tf.loadFltOnDemand) {
            this.build(colIndex);
        } else {
            addEvt(divCont, 'click', (evt) => this.onCheckListClick(evt));
            divCont.appendChild(createText(this.activateText));
        }

        this.emitter.on(
            ['build-checklist-filter'],
            (tf, colIndex, isLinked) => this.build(colIndex, isLinked)
        );

        this.emitter.on(
            ['select-checklist-options'],
            (tf, colIndex, values) => this.selectOptions(colIndex, values)
        );

        this.emitter.on(['rows-changed'], () => this.refreshAll());

        this.emitter.on(['after-filtering'], () => this.linkFilters());

        /** @inherited */
        this.initialized = true;
    }

    /**
     * Build checklist UI
     * @param  {Number}  colIndex   Column index
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

        let flt = this.containers[colIndex];
        let ul = createElm('ul',
            ['id', tf.fltIds[colIndex]],
            ['colIndex', colIndex]);
        ul.className = this.filterCssClass;

        let caseSensitive = tf.caseSensitive;
        /** @inherited */
        this.isCustom = tf.isCustomOptions(colIndex);

        //Retrieves custom values
        if (this.isCustom) {
            let customValues = tf.getCustomOptions(colIndex);
            this.opts = customValues[0];
            this.optsTxt = customValues[1];
        }

        let activeIdx;
        let activeFilterId = tf.getActiveFilterId();

        if (isLinked && activeFilterId) {
            activeIdx = tf.getColumnIndexFromFilterId(activeFilterId);
        }

        let filteredDataCol = [];
        if (isLinked && tf.disableExcludedOptions) {
            /** @inherited */
            this.excludedOpts = [];
        }

        flt.innerHTML = '';

        let eachRow = tf.eachRow();
        eachRow(
            (row) => {
                let cellValue = tf.getCellValue(row.cells[colIndex]);
                //Vary Peter's patch
                let cellString = matchCase(cellValue, caseSensitive);
                // checks if celldata is already in array
                if (!has(this.opts, cellString, caseSensitive)) {
                    this.opts.push(cellValue);
                }
                let filteredCol = filteredDataCol[colIndex];
                if (isLinked && tf.disableExcludedOptions) {
                    if (!filteredCol) {
                        filteredCol = tf.getVisibleColumnValues(colIndex);
                    }
                    if (!has(filteredCol, cellString, caseSensitive) &&
                        !has(this.excludedOpts, cellString, caseSensitive)) {
                        this.excludedOpts.push(cellValue);
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
        if (this.excludedOpts) {
            this.excludedOpts = this.sortOptions(colIndex, this.excludedOpts);
        }

        this.addChecks(colIndex, ul);

        if (tf.loadFltOnDemand) {
            flt.innerHTML = '';
        }
        flt.appendChild(ul);
        flt.setAttribute('filled', '1');

        this.emitter.emit('after-populating-filter', tf, colIndex, flt);
    }

    /**
     * Add checklist options
     * @param {Number} colIndex  Column index
     * @param {Object} ul        Ul element
     * @private
     */
    addChecks(colIndex, ul) {
        let tf = this.tf;
        let chkCt = this.addTChecks(colIndex, ul);

        for (let y = 0; y < this.opts.length; y++) {
            let val = this.opts[y]; //item value
            let lbl = this.isCustom ? this.optsTxt[y] : val; //item text
            let fltId = tf.fltIds[colIndex];
            let lblIdx = y + chkCt;
            let li = createCheckItem(`${fltId}_${lblIdx}`, val, lbl,
                ['data-idx', lblIdx]);
            li.className = this.itemCssClass;

            if (tf.linkedFilters && tf.disableExcludedOptions &&
                has(this.excludedOpts, matchCase(val, tf.caseSensitive),
                    tf.caseSensitive)) {
                addClass(li, this.disabledItemCssClass);
                li.check.disabled = true;
                li.disabled = true;
            } else {
                addEvt(li.check, 'click', evt => this.optionClick(evt));
            }
            ul.appendChild(li);

            if (val === '') {
                //item is hidden
                li.style.display = NONE;
            }
        }
    }

    /**
     * Add checklist header option
     * @param {Number} colIndex Column index
     * @param {Object} ul       Ul element
     * @private
     */
    addTChecks(colIndex, ul) {
        let tf = this.tf;
        let chkCt = 1;
        let fltId = tf.fltIds[colIndex];
        let li0 = createCheckItem(`${fltId}_0`, '',
            tf.getClearFilterText(colIndex), ['data-idx', 0]);
        li0.className = this.itemCssClass;
        ul.appendChild(li0);

        addEvt(li0.check, 'click', evt => this.optionClick(evt));

        if (!this.enableResetOption) {
            li0.style.display = NONE;
        }

        if (tf.enableEmptyOption) {
            let li1 = createCheckItem(`${fltId}_1`, tf.emOperator,
                tf.emptyText, ['data-idx', 1]);
            li1.className = this.itemCssClass;
            ul.appendChild(li1);
            addEvt(li1.check, 'click', evt => this.optionClick(evt));
            chkCt++;
        }

        if (tf.enableNonEmptyOption) {
            let li2 = createCheckItem(`${fltId}_2`, tf.nmOperator,
                tf.nonEmptyText, ['data-idx', 2]);
            li2.className = this.itemCssClass;
            ul.appendChild(li2);
            addEvt(li2.check, 'click', evt => this.optionClick(evt));
            chkCt++;
        }
        return chkCt;
    }

    /**
     * Set/unset value of passed item option in filter's DOM element attribute
     * @param {Object} o checklist option DOM element
     * @private
     */
    setItemOption(o) {
        if (!o) {
            return;
        }

        let tf = this.tf;
        let chkValue = o.value; //checked item value
        let chkIndex = o.dataset.idx;
        let colIdx = tf.getColumnIndexFromFilterId(o.id);
        let n = tf.getFilterElement(parseInt(colIdx, 10));
        let items = n.childNodes;
        let li = items[chkIndex];
        //selected values (ul tag)
        let slcValues = n.getAttribute('value') || '';
        //selected items indexes (ul tag)
        let slcIndexes = n.getAttribute('indexes') || '';

        if (o.checked) {
            //show all item
            if (chkValue === '') {
                //items indexes
                let indexes = slcIndexes.split(tf.separator);
                indexes.forEach(idx => {
                    idx = Number(idx);
                    let li = items[idx];
                    let chx = tag(li, 'input')[0];
                    if (chx && idx > 0) {
                        chx.checked = false;
                        removeClass(li, this.selectedItemCssClass);
                    }
                });

                n.setAttribute('value', '');
                n.setAttribute('indexes', '');

            } else {
                let indexes = slcIndexes + chkIndex + tf.separator;
                let values =
                    trim(slcValues + ' ' + chkValue + ' ' + tf.orOperator);

                n.setAttribute('value', values);
                n.setAttribute('indexes', indexes);

                //uncheck first option
                let chx0 = tag(items[0], 'input')[0];
                if (chx0) {
                    chx0.checked = false;
                }
            }

            removeClass(items[0], this.selectedItemCssClass);
            addClass(li, this.selectedItemCssClass);
        } else { //removes values and indexes
            let replaceValue =
                new RegExp(rgxEsc(chkValue + ' ' + tf.orOperator));
            let values = slcValues.replace(replaceValue, '');
            let replaceIndex = new RegExp(rgxEsc(chkIndex + tf.separator));
            let indexes = slcIndexes.replace(replaceIndex, '');

            n.setAttribute('value', trim(values));
            n.setAttribute('indexes', indexes);

            removeClass(li, this.selectedItemCssClass);
        }
    }

    /**
     * Select filter options programmatically
     * @param  {Number} colIndex Column index
     * @param  {Array}  values   Array of option values to select
     */
    selectOptions(colIndex, values = []) {
        let tf = this.tf;
        let flt = tf.getFilterElement(colIndex);
        if (!flt || values.length === 0) {
            return;
        }

        let lis = tag(flt, 'li');

        flt.setAttribute('value', '');
        flt.setAttribute('indexes', '');

        [].forEach.call(lis, (li) => {
            let chk = tag(li, 'input')[0];
            let chkVal = matchCase(chk.value, tf.caseSensitive);

            if (chkVal !== '' && has(values, chkVal, tf.caseSensitive)) {
                chk.checked = true;
            } else {
                // Check non-empty-text or empty-text option
                if (values.indexOf(tf.nmOperator) !== -1 &&
                    chkVal === matchCase(tf.nonEmptyText, tf.caseSensitive)) {
                    chk.checked = true;
                }
                else if (values.indexOf(tf.emOperator) !== -1 &&
                    chkVal === matchCase(tf.emptyText, tf.caseSensitive)) {
                    chk.checked = true;
                } else {
                    chk.checked = false;
                }
            }
            this.setItemOption(chk);
        });
    }

    /**
     * Get filter values for a given column index
     * @param {Number} colIndex Column index
     * @returns {Array} values Collection of selected values
     */
    getValues(colIndex) {
        let tf = this.tf;
        let flt = tf.getFilterElement(colIndex);
        if (!flt) {
            return [];
        }

        let fltAttr = flt.getAttribute('value');
        let values = isEmpty(fltAttr) ? '' : fltAttr;
        //removes last operator ||
        values = values.substr(0, values.length - 3);
        //turn || separated values into array
        values = values.split(' ' + tf.orOperator + ' ');

        return values;
    }

    /**
     * Destroy CheckList instance
     */
    destroy() {
        this.emitter.off(
            ['build-checklist-filter'],
            (tf, colIndex, isLinked) => this.build(colIndex, isLinked)
        );
        this.emitter.off(
            ['select-checklist-options'],
            (tf, colIndex, values) => this.selectOptions(colIndex, values)
        );
        this.emitter.off(['rows-changed'], () => this.refreshAll());
        this.emitter.off(['after-filtering'], () => this.linkFilters());

        this.initialized = false;
    }
}
