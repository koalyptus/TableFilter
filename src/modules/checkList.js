import {BaseDropdown} from './baseDropdown';
import {
    addClass, createCheckItem, createText, createElm, elm, removeClass,
    removeElm, tag
} from '../dom';
import {has} from '../array';
import {matchCase, trim, rgxEsc} from '../string';
import {addEvt, removeEvt, targetEvt} from '../event';
import {isArray, isEmpty} from '../types';
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
         * `<tf-checklist>` hosts, when the bridge is active
         * @type {Array}
         * @private
         */
        this.ceElms = [];

        /**
         * Handlers bound to each `<tf-checklist>` host
         * @type {Array}
         * @private
         */
        this.ceEvt = [];

        /**
         * Selected values reported by each `<tf-checklist>` host
         * @type {Array}
         * @private
         */
        this.ceValues = [];

        /**
         * Trigger names cached per column for `<tf-checklist>` hosts
         * @type {Array}
         * @private
         */
        this.ceNames = [];

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
     * `<tf-checklist>` selection event handler
     * @param {Number} colIndex Column index
     * @param {Event} evt `selection-change` event
     * @private
     */
    onCESelectionChange(colIndex, evt) {
        let tf = this.tf;
        let host = this.ceElms[colIndex];
        let values = evt.detail && isArray(evt.detail.values) ?
            evt.detail.values.slice() : [];

        values = this.normalizeCESelection(colIndex, values);
        this.ceValues[colIndex] = values;
        this.syncCEText(colIndex);

        this.emitter.emit('filter-focus', tf, host);
        tf.filter();
    }

    /**
     * `<tf-checklist>` open event handler used by the load-on-demand
     * feature: the options are rendered on the first expansion
     * @param {Number} colIndex Column index
     * @param {Event} evt `open-change` event
     * @private
     */
    onCEOpenChange(colIndex, evt) {
        let host = this.ceElms[colIndex];
        if (!evt.detail || !evt.detail.open || !host) {
            return;
        }
        if (host.getAttribute('filled') !== '1') {
            this.build(colIndex);
        }
    }

    /**
     * Keep the reset option exclusive. The element toggles every option
     * independently, while the legacy checklist clears the other
     * selections when the reset item is picked and unchecks the reset
     * item when another option is picked (checkList.js:391-425).
     * @param {Number} colIndex Column index
     * @param {Array} values Selected values reported by the element
     * @returns {Array} Normalized selection
     * @private
     */
    normalizeCESelection(colIndex, values) {
        let host = this.ceElms[colIndex];
        let previous = this.ceValues[colIndex] || [];
        let hasReset = values.indexOf('') !== -1;

        if (!host || !hasReset || values.length === 1) {
            return values;
        }

        let normalized = previous.indexOf('') === -1 ?
            [''] : values.filter((value) => value !== '');
        host.setSelectedValues(normalized);
        return normalized;
    }

    /**
     * Render the trigger text from the column name and the selection
     * count, and name the listbox from the same column name
     * (v1-webcomponents-investigation.md:247-289)
     * @param {Number} colIndex Column index
     * @private
     */
    syncCEText(colIndex) {
        let host = this.ceElms[colIndex];
        if (!host) {
            return;
        }

        let name = this.getCEName(colIndex);
        let count = (this.ceValues[colIndex] || [])
            .filter((value) => value !== '').length;

        host.setAttribute('trigger-text',
            count ? `${name} (${count})` : name);
        host.setAttribute('listbox-label', `${name} options`);
    }

    /**
     * Return the trigger name for a column: its header text, or a
     * position-based fallback when the header is empty
     * @param {Number} colIndex Column index
     * @returns {String} Column name
     * @private
     */
    getCEName(colIndex) {
        let name = this.ceNames[colIndex];
        if (!name) {
            let header = this.tf.getHeadersText()[colIndex];
            name = header || `Column ${colIndex + 1}`;
            this.ceNames[colIndex] = name;
        }
        return name;
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
        // Store stable handler refs so `destroy()` removes the right
        // listeners (the emitter keys on function identity).
        this.onBuildChecklistFilter =
            (tf, colIndex, isLinked) => this.build(colIndex, isLinked);
        this.onSelectChecklistOptions =
            (tf, colIndex, values) =>
                this.selectOptions(colIndex, values);
        this.onRowsChanged = () => this.refreshAll();
        this.onAfterFiltering = () => this.linkFilters();

        // Bridge to <tf-checklist> (#930). The element is used when the
        // source registers it (Vite / module load); otherwise the legacy
        // div/ul/li structure is rendered.
        // TODO(#965): drop this fork once <tf-checklist> is part of the
        // published bundle so the element path is the only path.
        if (typeof customElements !== 'undefined' &&
            customElements.get('tf-checklist')) {
            this.initCE(colIndex, isExternal, container);
        } else {
            this.initLegacy(colIndex, isExternal, container);
        }

        this.emitter.on(['build-checklist-filter'],
            this.onBuildChecklistFilter);
        this.emitter.on(['select-checklist-options'],
            this.onSelectChecklistOptions);
        this.emitter.on(['rows-changed'], this.onRowsChanged);
        this.emitter.on(['after-filtering'], this.onAfterFiltering);

        /** @inherited */
        this.initialized = true;
    }

    /**
     * Initialize using the <tf-checklist> custom element
     * @param  {Number}     colIndex   Column index
     * @param  {Boolean}    isExternal External filter flag
     * @param  {DOMElement} container  Dom element containing the filter
     * @private
     */
    initCE(colIndex, isExternal, container) {
        let tf = this.tf;
        let externalFltTgtId = isExternal ?
            tf.externalFltIds[colIndex] : null;

        let host = document.createElement('tf-checklist');
        // The host carries the filter id: `getFilterElement()`,
        // `getFilterId()` and `getColumnIndexFromFilterId()` resolve it.
        host.id = tf.buildFilterId(colIndex);
        host.className = this.containerCssClass;
        host.setAttribute('col', String(colIndex));

        if (externalFltTgtId) {
            elm(externalFltTgtId).appendChild(host);
        } else {
            container.appendChild(host);
        }

        this.containers[colIndex] = host;
        this.ceElms[colIndex] = host;
        this.ceValues[colIndex] = [];
        tf.fltIds.push(host.id);

        let evt = this.ceEvt[colIndex] = {
            selectionChange: (e) => this.onCESelectionChange(colIndex, e),
            openChange: (e) => this.onCEOpenChange(colIndex, e)
        };
        addEvt(host, 'selection-change', evt.selectionChange);
        addEvt(host, 'open-change', evt.openChange);

        if (!tf.loadFltOnDemand) {
            this.build(colIndex);
        } else {
            host.setAttribute('trigger-text', this.activateText);
            host.setAttribute('listbox-label', `${this.activateText} options`);
        }
    }

    /**
     * Initialize using the legacy div/ul/li structure
     * @param  {Number}     colIndex   Column index
     * @param  {Boolean}    isExternal External filter flag
     * @param  {DOMElement} container  Dom element containing the filter
     * @private
     */
    initLegacy(colIndex, isExternal, container) {
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

        if (this.ceElms[colIndex]) {
            this.buildCE(colIndex);
        } else {
            this.buildLegacy(colIndex);
        }
    }

    /**
     * Render the options into a <tf-checklist> host
     * @param {Number} colIndex Column index
     * @private
     */
    buildCE(colIndex) {
        let tf = this.tf;
        let host = this.ceElms[colIndex];

        host.setOptions(this.getOptionEntries(colIndex)
            .filter((entry) => !entry.hidden)
            .map((entry) => ({
                value: entry.value,
                text: entry.text,
                disabled: entry.disabled
            })));
        host.setAttribute('filled', '1');

        this.ceValues[colIndex] = [];
        this.syncCEText(colIndex);

        this.emitter.emit('after-populating-filter', tf, colIndex, host);
    }

    /**
     * Render the options into the legacy ul element
     * @param {Number} colIndex Column index
     * @private
     */
    buildLegacy(colIndex) {
        let tf = this.tf;
        let flt = this.containers[colIndex];
        let ul = createElm('ul',
            ['id', tf.fltIds[colIndex]],
            ['colIndex', colIndex]);
        ul.className = this.filterCssClass;

        flt.innerHTML = '';
        this.addChecks(colIndex, ul);

        if (tf.loadFltOnDemand) {
            flt.innerHTML = '';
        }
        flt.appendChild(ul);
        flt.setAttribute('filled', '1');

        this.emitter.emit('after-populating-filter', tf, colIndex, flt);
    }

    /**
     * Return the checklist entries in render order: the reset option,
     * the optional empty and non-empty options, then the column values.
     * A `hidden` entry is rendered with `display: none` by the legacy
     * path and skipped by `<tf-checklist>`, which has no hidden option
     * state (checkList.js:321-324, :345-347).
     * @param {Number} colIndex Column index
     * @returns {Array} Option entries
     * @private
     */
    getOptionEntries(colIndex) {
        let tf = this.tf;
        let entries = [{
            value: '',
            text: tf.getClearFilterText(colIndex),
            hidden: !this.enableResetOption
        }];

        if (tf.enableEmptyOption) {
            entries.push({ value: tf.emOperator, text: tf.emptyText });
        }

        if (tf.enableNonEmptyOption) {
            entries.push({ value: tf.nmOperator, text: tf.nonEmptyText });
        }

        this.opts.forEach((val, y) => {
            entries.push({
                value: val,
                text: this.isCustom ? this.optsTxt[y] : val,
                disabled: tf.linkedFilters && tf.disableExcludedOptions &&
                    has(this.excludedOpts,
                        matchCase(val, tf.caseSensitive), tf.caseSensitive),
                hidden: val === ''
            });
        });

        return entries;
    }

    /**
     * Add checklist options
     * @param {Number} colIndex  Column index
     * @param {Object} ul        Ul element
     * @private
     */
    addChecks(colIndex, ul) {
        let tf = this.tf;
        let fltId = tf.fltIds[colIndex];

        this.getOptionEntries(colIndex).forEach((entry, idx) => {
            let li = createCheckItem(`${fltId}_${idx}`, entry.value,
                entry.text, ['data-idx', idx]);
            li.className = this.itemCssClass;

            if (entry.disabled) {
                addClass(li, this.disabledItemCssClass);
                li.check.disabled = true;
                li.disabled = true;
            } else {
                addEvt(li.check, 'click', evt => this.optionClick(evt));
            }
            ul.appendChild(li);

            if (entry.hidden) {
                li.style.display = NONE;
            }
        });
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
        if (this.ceElms[colIndex]) {
            this.selectOptionsCE(colIndex, values);
            return;
        }

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
     * Select options on a <tf-checklist> host. Values are matched against
     * the rendered entries the way the legacy `selectOptions()` matches
     * the checkbox values, and the reset value (`''`) clears the
     * selection instead of being selected (checkList.js:457-477).
     * @param  {Number} colIndex Column index
     * @param  {Array}  values   Array of option values to select
     * @private
     */
    selectOptionsCE(colIndex, values) {
        let tf = this.tf;
        let host = this.ceElms[colIndex];
        if (!host) {
            return;
        }

        // Legacy `selectOptions()` returns early for an empty values array
        // (checkList.js:677), so mirror that for path parity: a
        // `setFilterValue(col, [])` does not change the selection.
        if (isArray(values) && values.length === 0) {
            return;
        }

        let requested = (isArray(values) ? values : [])
            .filter((value) => String(value) !== '');
        let selected = [];

        this.getOptionEntries(colIndex)
            .filter((entry) => !entry.hidden)
            .forEach((entry) => {
                let value = matchCase(String(entry.value), tf.caseSensitive);
                if (has(requested, value, tf.caseSensitive)) {
                    selected.push(entry.value);
                }
            });

        host.setSelectedValues(selected);
        this.ceValues[colIndex] = selected;
        this.syncCEText(colIndex);
    }

    /**
     * Get filter values for a given column index
     * @param {Number} colIndex Column index
     * @returns {Array} values Collection of selected values
     */
    getValues(colIndex) {
        let host = this.ceElms[colIndex];
        if (host) {
            let values = host.getSelectedValues();
            return values.length === 0 ? [''] : values;
        }

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
     * Remove the <tf-checklist> hosts and the handlers bound to them
     * @private
     */
    destroyCE() {
        this.ceElms.forEach((host, colIndex) => {
            if (!host) {
                return;
            }
            let evt = this.ceEvt[colIndex];
            if (evt) {
                removeEvt(host, 'selection-change', evt.selectionChange);
                removeEvt(host, 'open-change', evt.openChange);
            }
            if (host.parentNode) {
                removeElm(host);
            }
        });

        this.ceElms = [];
        this.ceEvt = [];
        this.ceValues = [];
    }

    /**
     * Destroy CheckList instance
     */
    destroy() {
        if (this.onBuildChecklistFilter) {
            this.emitter.off(['build-checklist-filter'],
                this.onBuildChecklistFilter);
        }
        if (this.onSelectChecklistOptions) {
            this.emitter.off(['select-checklist-options'],
                this.onSelectChecklistOptions);
        }
        if (this.onRowsChanged) {
            this.emitter.off(['rows-changed'], this.onRowsChanged);
        }
        if (this.onAfterFiltering) {
            this.emitter.off(['after-filtering'], this.onAfterFiltering);
        }

        this.destroyCE();

        this.initialized = false;
    }
}
