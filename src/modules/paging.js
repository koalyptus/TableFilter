import {Feature} from '../feature';
import {createElm, createOpt, createText, elm, removeElm} from '../dom';
import {isArray, isNull, EMPTY_FN} from '../types';
import {addEvt, removeEvt, isKeyPressed, bound} from '../event';
import {INPUT, SELECT, NONE, ENTER_KEY} from '../const';
import {
    defaultsStr, defaultsNb, defaultsBool, defaultsArr, defaultsFn
} from '../settings';
import {CENTER, RIGHT} from './toolbar';

/**
 * Paging UI component
 * @export
 * @class Paging
 * @extends {Feature}
 */
export class Paging extends Feature {

    /**
     * Creates an instance of Paging
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, Paging);

        // Configuration object
        let f = this.config.paging || {};

        /**
         * Css class for the paging buttons (previous, next, etc.)
         * @type {String}
         */
        this.btnCssClass = defaultsStr(f.btn_css_class, 'pgInp');

        /**
         * Main select DOM element
         * @type {DOMElement}
         */
        this.pageSlc = null;

        /**
         * Results per page select DOM element
         * @type {DOMElement}
         */
        this.pageLengthSlc = null;

        /**
         * ID of custom container element
         * @type {String}
         */
        this.tgtId = defaultsStr(f.target_id, null);

        /**
         * Number of rows contained in a page
         * @type {Number}
         */
        this.pageLength = defaultsNb(f.length, 10);

        /**
         * ID of custom container element for the results per page selector
         * @type {String}
         */
        this.pageLengthTgtId = defaultsStr(f.results_per_page_target_id, null);

        /**
         * Css class for the paging select element
         * @type {String}
         */
        this.pgSlcCssClass = defaultsStr(f.slc_css_class, 'pgSlc');

        /**
         * Css class for the paging input element
         * @type {String}
         */
        this.pgInpCssClass = defaultsStr(f.inp_css_class, 'pgNbInp');

        /**
         * Label and values for the results per page select, example of usage:
         * ['Records: ', [10,25,50,100]]
         * @type {Array}
         */
        this.resultsPerPage = defaultsArr(f.results_per_page, null);

        /**
         * Determines if results per page is configured
         * @type {Boolean}
         */
        this.hasResultsPerPage = isArray(this.resultsPerPage);

        /**
         * Css class for the results per page select
         * @type {String}
         */
        this.resultsSlcCssClass = defaultsStr(f.results_slc_css_class, 'rspg');

        /**
         * Css class for the label preceding results per page select
         * @type {String}
         */
        this.resultsSpanCssClass = defaultsStr(f.results_span_css_class,
            'rspgSpan');

        /**
         * Index of the first row of current page
         * @type {Number}
         * @private
         */
        this.startPagingRow = 0;

        /**
         * Total number of pages
         * @type {Number}
         * @private
         */
        this.nbPages = 0;

        /**
         * Current page number
         * @type {Number}
         * @private
         */
        this.currentPageNb = 1;

        /**
         * Next page button text
         * @type {String}
         */
        this.btnNextPageText = defaultsStr(f.btn_next_page_text, '>');

        /**
         * Previous page button text
         * @type {String}
         */
        this.btnPrevPageText = defaultsStr(f.btn_prev_page_text, '<');

        /**
         * Last page button text
         * @type {String}
         */
        this.btnLastPageText = defaultsStr(f.btn_last_page_text, '>|');

        /**
         * First page button text
         * @type {String}
         */
        this.btnFirstPageText = defaultsStr(f.btn_first_page_text, '|<');

        /**
         * Next page button HTML
         * @type {String}
         */
        this.btnNextPageHtml = defaultsStr(f.btn_next_page_html,
            (!tf.enableIcons ? null :
                '<input type="button" value="" class="' + this.btnCssClass +
                ' nextPage" title="Next page" />'));

        /**
         * Previous page button HTML
         * @type {String}
         */
        this.btnPrevPageHtml = defaultsStr(f.btn_prev_page_html,
            (!tf.enableIcons ? null :
                '<input type="button" value="" class="' + this.btnCssClass +
                ' previousPage" title="Previous page" />'));

        /**
         * First page button HTML
         * @type {String}
         */
        this.btnFirstPageHtml = defaultsStr(f.btn_first_page_html,
            (!tf.enableIcons ? null :
                '<input type="button" value="" class="' + this.btnCssClass +
                ' firstPage" title="First page" />'));

        /**
         * Last page button HTML
         * @type {String}
         */
        this.btnLastPageHtml = defaultsStr(f.btn_last_page_html,
            (!tf.enableIcons ? null :
                '<input type="button" value="" class="' + this.btnCssClass +
                ' lastPage" title="Last page" />'));

        /**
         * Text preceeding page selector drop-down
         * @type {String}
         */
        this.pageText = defaultsStr(f.page_text, ' Page ');

        /**
         * Text after page selector drop-down
         * @type {String}
         */
        this.ofText = defaultsStr(f.of_text, ' of ');

        /**
         * Css class for the span containing total number of pages
         * @type {String}
         */
        this.nbPgSpanCssClass = defaultsStr(f.nb_pages_css_class, 'nbpg');

        /**
         * Determines if paging buttons are enabled (default: true)
         * @type {Boolean}
         */
        this.hasBtns = defaultsBool(f.btns, true);

        /**
         * Defines page selector type, two possible values: 'select', 'input'
         * @type {String}
         */
        this.pageSelectorType = defaultsStr(f.page_selector_type, SELECT);

        /**
         * Default position in toolbar ('left'|'center'|'right')
         * @type {String}
         */
        this.toolbarPosition = defaultsStr(f.toolbar_position, CENTER);

        /**
         * Callback fired before the page is changed
         * @type {Function}
         */
        this.onBeforeChangePage = defaultsFn(f.on_before_change_page, EMPTY_FN);

        /**
         * Callback fired after the page is changed
         * @type {Function}
         */
        this.onAfterChangePage = defaultsFn(f.on_after_change_page, EMPTY_FN);

        /**
         * Label preciding results per page select
         * @type {DOMElement}
         * @private
         */
        this.slcResultsTxt = null;
        /**
         * Span containing next page button
         * @type {DOMElement}
         * @private
         */
        this.btnNextCont = null;
        /**
         * Span containing previous page button
         * @type {DOMElement}
         * @private
         */
        this.btnPrevCont = null;
        /**
         * Span containing last page button
         * @type {DOMElement}
         * @private
         */
        this.btnLastCont = null;
        /**
         * Span containing first page button
         * @type {DOMElement}
         * @private
         */
        this.btnFirstCont = null;
        /**
         * Span for tot nb pages
         * @type {DOMElement}
         * @private
         */
        this.pgCont = null;
        /**
         * Span preceding pages select (contains 'Page')
         * @type {DOMElement}
         * @private
         */
        this.pgBefore = null;
        /**
         * Span following pages select (contains ' of ')
         * @type {DOMElement}
         * @private
         */
        this.pgAfter = null;

        let startRow = tf.refRow;
        let nrows = tf.getRowsNb(true);
        //calculates page nb
        this.nbPages = Math.ceil((nrows - startRow) / this.pageLength);

        let o = this;
        /**
         * Paging DOM events handlers
         * @type {String}
         * @private
         */
        this.evt = {
            slcIndex() {
                return (o.pageSelectorType === SELECT) ?
                    o.pageSlc.options.selectedIndex :
                    parseInt(o.pageSlc.value, 10) - 1;
            },
            nbOpts() {
                return (o.pageSelectorType === SELECT) ?
                    parseInt(o.pageSlc.options.length, 10) - 1 :
                    (o.nbPages - 1);
            },
            next() {
                let nextIndex = o.evt.slcIndex() < o.evt.nbOpts() ?
                    o.evt.slcIndex() + 1 : 0;
                o.changePage(nextIndex);
            },
            prev() {
                let prevIndex = o.evt.slcIndex() > 0 ?
                    o.evt.slcIndex() - 1 : o.evt.nbOpts();
                o.changePage(prevIndex);
            },
            last() {
                o.changePage(o.evt.nbOpts());
            },
            first() {
                o.changePage(0);
            },
            _detectKey(e) {
                if (isKeyPressed(e, [ENTER_KEY])) {
                    if (tf.sorted) {
                        tf.filter();
                        o.changePage(o.evt.slcIndex());
                    } else {
                        o.changePage();
                    }
                    this.blur();
                }
            },
            slcPagesChange: null,
            nextEvt: null,
            prevEvt: null,
            lastEvt: null,
            firstEvt: null
        };
    }

    /**
     * Initialize DOM elements
     */
    init() {
        let slcPages;
        let tf = this.tf;
        let evt = this.evt;

        if (this.initialized) {
            return;
        }

        this.emitter.emit('initializing-feature', this, !isNull(this.tgtId));

        // Check resultsPerPage is in expected format and initialise the
        // results per page component
        if (this.hasResultsPerPage) {
            if (this.resultsPerPage.length < 2) {
                this.hasResultsPerPage = false;
            } else {
                this.pageLength = this.resultsPerPage[1][0];
                this.setResultsPerPage();
            }
        }

        evt.slcPagesChange = (event) => {
            let slc = event.target;
            this.changePage(slc.selectedIndex);
        };

        // Paging drop-down list selector
        if (this.pageSelectorType === SELECT) {
            slcPages = createElm(SELECT);
            slcPages.className = this.pgSlcCssClass;
            addEvt(slcPages, 'change', evt.slcPagesChange);
        }

        // Paging input selector
        if (this.pageSelectorType === INPUT) {
            slcPages = createElm(INPUT, ['value', this.currentPageNb]);
            slcPages.className = this.pgInpCssClass;
            addEvt(slcPages, 'keypress', evt._detectKey);
        }

        // btns containers
        let btnNextSpan = createElm('span');
        let btnPrevSpan = createElm('span');
        let btnLastSpan = createElm('span');
        let btnFirstSpan = createElm('span');

        if (this.hasBtns) {
            // Next button
            if (!this.btnNextPageHtml) {
                let btnNext = createElm(INPUT,
                    ['type', 'button'],
                    ['value', this.btnNextPageText],
                    ['title', 'Next']
                );
                btnNext.className = this.btnCssClass;
                addEvt(btnNext, 'click', evt.next);
                btnNextSpan.appendChild(btnNext);
            } else {
                btnNextSpan.innerHTML = this.btnNextPageHtml;
                addEvt(btnNextSpan, 'click', evt.next);
            }
            // Previous button
            if (!this.btnPrevPageHtml) {
                let btnPrev = createElm(INPUT,
                    ['type', 'button'],
                    ['value', this.btnPrevPageText],
                    ['title', 'Previous']
                );
                btnPrev.className = this.btnCssClass;
                addEvt(btnPrev, 'click', evt.prev);
                btnPrevSpan.appendChild(btnPrev);
            } else {
                btnPrevSpan.innerHTML = this.btnPrevPageHtml;
                addEvt(btnPrevSpan, 'click', evt.prev);
            }
            // Last button
            if (!this.btnLastPageHtml) {
                let btnLast = createElm(INPUT,
                    ['type', 'button'],
                    ['value', this.btnLastPageText],
                    ['title', 'Last']
                );
                btnLast.className = this.btnCssClass;
                addEvt(btnLast, 'click', evt.last);
                btnLastSpan.appendChild(btnLast);
            } else {
                btnLastSpan.innerHTML = this.btnLastPageHtml;
                addEvt(btnLastSpan, 'click', evt.last);
            }
            // First button
            if (!this.btnFirstPageHtml) {
                let btnFirst = createElm(INPUT,
                    ['type', 'button'],
                    ['value', this.btnFirstPageText],
                    ['title', 'First']
                );
                btnFirst.className = this.btnCssClass;
                addEvt(btnFirst, 'click', evt.first);
                btnFirstSpan.appendChild(btnFirst);
            } else {
                btnFirstSpan.innerHTML = this.btnFirstPageHtml;
                addEvt(btnFirstSpan, 'click', evt.first);
            }
        }

        // paging elements (buttons+drop-down list) are added to defined element
        let targetEl = !this.tgtId ?
            tf.feature('toolbar').container(this.toolbarPosition) :
            elm(this.tgtId);
        targetEl.appendChild(btnFirstSpan);
        targetEl.appendChild(btnPrevSpan);

        let pgBeforeSpan = createElm('span');
        pgBeforeSpan.appendChild(createText(this.pageText));
        pgBeforeSpan.className = this.nbPgSpanCssClass;
        targetEl.appendChild(pgBeforeSpan);
        targetEl.appendChild(slcPages);
        let pgAfterSpan = createElm('span');
        pgAfterSpan.appendChild(createText(this.ofText));
        pgAfterSpan.className = this.nbPgSpanCssClass;
        targetEl.appendChild(pgAfterSpan);
        let pgSpan = createElm('span');
        pgSpan.className = this.nbPgSpanCssClass;
        pgSpan.appendChild(createText(' ' + this.nbPages + ' '));
        targetEl.appendChild(pgSpan);
        targetEl.appendChild(btnNextSpan);
        targetEl.appendChild(btnLastSpan);

        this.btnNextCont = btnNextSpan;
        this.btnPrevCont = btnPrevSpan;
        this.btnLastCont = btnLastSpan;
        this.btnFirstCont = btnFirstSpan;
        this.pgCont = pgSpan;
        this.pgBefore = pgBeforeSpan;
        this.pgAfter = pgAfterSpan;
        this.pageSlc = slcPages;

        this.setPagingInfo();

        if (!tf.fltGrid) {
            tf.validateAllRows();
            this.setPagingInfo(tf.validRowsIndex);
        }

        this.emitter.on(['after-filtering'], bound(this.resetPagingInfo, this));
        this.emitter.on(['change-page'], bound(this.changePageHandler, this));
        this.emitter.on(['change-page-results'],
            bound(this.changePageResultsHandler, this));

        /** @inherited */
        this.initialized = true;

        this.emitter.emit('feature-initialized', this);
    }

    /**
     * Reset paging when filters are already instantiated
     * @param {Boolean} filterTable Execute filtering once paging instanciated
     */
    reset(filterTable = false) {
        this.enable();
        this.init();

        if (filterTable) {
            this.tf.filter();
        }
    }

    /**
     * Reset paging info from scratch after a filtering process
     */
    resetPagingInfo() {
        this.startPagingRow = 0;
        this.currentPageNb = 1;
        this.setPagingInfo(this.tf.validRowsIndex);
    }

    /**
     * Calculate number of pages based on valid rows
     * Refresh paging select according to number of pages
     * @param {Array} validRows Collection of valid rows
     */
    setPagingInfo(validRows) {
        let tf = this.tf;
        let cont = !this.tgtId ?
            tf.feature('toolbar').container(this.toolbarPosition) :
            elm(this.tgtId);

        //store valid rows indexes
        tf.validRowsIndex = validRows || tf.getValidRows(true);

        //calculate nb of pages
        this.nbPages = Math.ceil(tf.validRowsIndex.length / this.pageLength);
        //refresh page nb span
        this.pgCont.innerHTML = this.nbPages;
        //select clearing shortcut
        if (this.pageSelectorType === SELECT) {
            this.pageSlc.innerHTML = '';
        }

        if (this.nbPages > 0) {
            cont.style.visibility = 'visible';
            if (this.pageSelectorType === SELECT) {
                for (let z = 0; z < this.nbPages; z++) {
                    let opt = createOpt(z + 1, z * this.pageLength, false);
                    this.pageSlc.options[z] = opt;
                }
            } else {
                //input type
                this.pageSlc.value = this.currentPageNb;
            }

        } else {
            /*** if no results paging select and buttons are hidden ***/
            cont.style.visibility = 'hidden';
        }
        this.groupByPage(tf.validRowsIndex);
    }

    /**
     * Group table rows by page and display valid rows
     * @param  {Array} validRows Collection of valid rows
     */
    groupByPage(validRows) {
        let tf = this.tf;
        let rows = tf.dom().rows;
        let startPagingRow = parseInt(this.startPagingRow, 10);
        let endPagingRow = startPagingRow + parseInt(this.pageLength, 10);

        //store valid rows indexes
        if (validRows) {
            tf.validRowsIndex = validRows;
        }

        //this loop shows valid rows of current page
        for (let h = 0, len = tf.getValidRowsNb(true); h < len; h++) {
            let validRowIdx = tf.validRowsIndex[h];
            let r = rows[validRowIdx];
            let isRowValid = r.getAttribute('validRow');
            let rowDisplayed = false;

            if (h >= startPagingRow && h < endPagingRow) {
                if (isNull(isRowValid) || Boolean(isRowValid === 'true')) {
                    r.style.display = '';
                    rowDisplayed = true;
                }
            } else {
                r.style.display = NONE;
            }
            this.emitter.emit('row-paged', tf, validRowIdx, h, rowDisplayed);
        }

        // broadcast grouping by page
        this.emitter.emit('grouped-by-page', tf, this);
    }

    /**
     * Return the current page number
     * @return {Number} Page number
     */
    getPage() {
        return this.currentPageNb;
    }

    /**
     * Show page defined by passed argument (string or number):
     * @param {String}/{Number} cmd possible string values: 'next',
     *   'previous', 'last', 'first' or page number as per param
     */
    setPage(cmd) {
        let tf = this.tf;
        if (!tf.isInitialized() || !this.isEnabled()) {
            return;
        }
        let btnEvt = this.evt,
            cmdtype = typeof cmd;
        if (cmdtype === 'string') {
            switch (cmd.toLowerCase()) {
                case 'next':
                    btnEvt.next();
                    break;
                case 'previous':
                    btnEvt.prev();
                    break;
                case 'last':
                    btnEvt.last();
                    break;
                case 'first':
                    btnEvt.first();
                    break;
                default:
                    btnEvt.next();
                    break;
            }
        }
        else if (cmdtype === 'number') {
            this.changePage(cmd - 1);
        }
    }

    /**
     * Generates UI elements for the number of results per page drop-down
     */
    setResultsPerPage() {
        let tf = this.tf;
        let evt = this.evt;

        if (this.pageLengthSlc || !this.resultsPerPage) {
            return;
        }

        evt.slcResultsChange = (ev) => {
            this.onChangeResultsPerPage();
            ev.target.blur();
        };

        let slcR = createElm(SELECT);
        slcR.className = this.resultsSlcCssClass;
        let slcRText = this.resultsPerPage[0],
            slcROpts = this.resultsPerPage[1];
        let slcRSpan = createElm('span');
        slcRSpan.className = this.resultsSpanCssClass;

        // results per page select is added to external element
        let targetEl = !this.pageLengthTgtId ?
            tf.feature('toolbar').container(RIGHT) :
            elm(this.pageLengthTgtId);
        slcRSpan.appendChild(createText(slcRText));

        let help = tf.feature('help');
        if (help && help.btn) {
            help.btn.parentNode.insertBefore(slcRSpan, help.btn);
            help.btn.parentNode.insertBefore(slcR, help.btn);
        } else {
            targetEl.appendChild(slcRSpan);
            targetEl.appendChild(slcR);
        }

        for (let r = 0; r < slcROpts.length; r++) {
            let currOpt = new Option(slcROpts[r], slcROpts[r], false, false);
            slcR.options[r] = currOpt;
        }
        addEvt(slcR, 'change', evt.slcResultsChange);
        this.slcResultsTxt = slcRSpan;
        this.pageLengthSlc = slcR;
    }

    /**
     * Remove number of results per page UI elements
     */
    removeResultsPerPage() {
        let tf = this.tf;
        if (!tf.isInitialized() || !this.pageLengthSlc ||
            !this.resultsPerPage) {
            return;
        }
        if (this.pageLengthSlc) {
            removeElm(this.pageLengthSlc);
        }
        if (this.slcResultsTxt) {
            removeElm(this.slcResultsTxt);
        }
        this.pageLengthSlc = null;
        this.slcResultsTxt = null;
    }

    /**
     * Change the page based on passed index
     * @param {Number} index Index of the page (0-n)
     */
    changePage(index) {
        let tf = this.tf;

        if (!this.isEnabled()) {
            return;
        }

        this.emitter.emit('before-page-change', tf, (index + 1));

        if (index === null) {
            index = this.pageSelectorType === SELECT ?
                this.pageSlc.options.selectedIndex : this.pageSlc.value - 1;
        }
        if (index >= 0 && index <= (this.nbPages - 1)) {
            this.onBeforeChangePage(this, (index + 1));

            this.currentPageNb = parseInt(index, 10) + 1;
            if (this.pageSelectorType === SELECT) {
                this.pageSlc.options[index].selected = true;
            } else {
                this.pageSlc.value = this.currentPageNb;
            }

            this.startPagingRow = (this.pageSelectorType === SELECT) ?
                this.pageSlc.value : (index * this.pageLength);

            this.groupByPage();

            this.onAfterChangePage(this, (index + 1));
        }

        this.emitter.emit('after-page-change', tf, (index + 1));
    }

    /**
     * Change the number of results per page based on passed value
     * @param {String} val The number of results per page
     */
    changeResultsPerPage(val) {
        if (!this.isEnabled() || isNaN(val)) {
            return;
        }

        this.pageLengthSlc.value = val;
        this.onChangeResultsPerPage();
    }

    /**
     * Change rows according to page results drop-down
     */
    onChangeResultsPerPage() {
        let tf = this.tf;

        if (!this.isEnabled() || tf.getValidRowsNb() === 0) {
            return;
        }

        let {
            pageLengthSlc: slcR, pageSelectorType, pageSlc, emitter
        } = this;

        emitter.emit('before-page-length-change', tf);

        let slcIndex = slcR.selectedIndex;
        let slcPagesSelIndex = (pageSelectorType === SELECT) ?
            pageSlc.selectedIndex : parseInt(pageSlc.value - 1, 10);
        this.pageLength = parseInt(slcR.options[slcIndex].value, 10);
        this.startPagingRow = this.pageLength * slcPagesSelIndex;

        if (!isNaN(this.pageLength)) {
            if (this.startPagingRow >= tf.nbFilterableRows) {
                this.startPagingRow = (tf.nbFilterableRows - this.pageLength);
            }
            this.setPagingInfo();

            if (pageSelectorType === SELECT) {
                let slcIdx = (pageSlc.options.length - 1 <= slcPagesSelIndex) ?
                    (pageSlc.options.length - 1) :
                    slcPagesSelIndex;
                pageSlc.options[slcIdx].selected = true;
            }
        }

        emitter.emit('after-page-length-change', tf, this.pageLength);
    }

    /**
     * Re-set page nb at page re-load
     */
    resetPage() {
        let tf = this.tf;
        if (!this.isEnabled()) {
            return;
        }
        this.emitter.emit('before-reset-page', tf);
        let pgNb = tf.feature('store').getPageNb();
        if (pgNb !== '') {
            this.changePage((pgNb - 1));
        }
        this.emitter.emit('after-reset-page', tf, pgNb);
    }

    /**
     * Re-set page length value at page re-load
     */
    resetPageLength() {
        let tf = this.tf;
        if (!this.isEnabled()) {
            return;
        }
        this.emitter.emit('before-reset-page-length', tf);
        let pglenIndex = tf.feature('store').getPageLength();

        if (pglenIndex !== '') {
            this.pageLengthSlc.options[pglenIndex].selected = true;
            this.changeResultsPerPage();
        }
        this.emitter.emit('after-reset-page-length', tf, pglenIndex);
    }

    /** @private */
    changePageHandler(tf, pageNumber) {
        this.setPage(pageNumber);
    }

    /** @private */
    changePageResultsHandler(tf, pageLength) {
        this.changeResultsPerPage(pageLength);
    }

    /**
     * Remove paging feature
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        let evt = this.evt;

        if (this.pageSlc) {
            if (this.pageSelectorType === SELECT) {
                removeEvt(this.pageSlc, 'change', evt.slcPagesChange);
            }
            else if (this.pageSelectorType === INPUT) {
                removeEvt(this.pageSlc, 'keypress', evt._detectKey);
            }
            removeElm(this.pageSlc);
        }

        if (this.btnNextCont) {
            removeEvt(this.btnNextCont, 'click', evt.next);
            removeElm(this.btnNextCont);
            this.btnNextCont = null;
        }

        if (this.btnPrevCont) {
            removeEvt(this.btnPrevCont, 'click', evt.prev);
            removeElm(this.btnPrevCont);
            this.btnPrevCont = null;
        }

        if (this.btnLastCont) {
            removeEvt(this.btnLastCont, 'click', evt.last);
            removeElm(this.btnLastCont);
            this.btnLastCont = null;
        }

        if (this.btnFirstCont) {
            removeEvt(this.btnFirstCont, 'click', evt.first);
            removeElm(this.btnFirstCont);
            this.btnFirstCont = null;
        }

        if (this.pgBefore) {
            removeElm(this.pgBefore);
            this.pgBefore = null;
        }

        if (this.pgAfter) {
            removeElm(this.pgAfter);
            this.pgAfter = null;
        }

        if (this.pgCont) {
            removeElm(this.pgCont);
            this.pgCont = null;
        }

        if (this.hasResultsPerPage) {
            this.removeResultsPerPage();
        }

        this.emitter.off(['after-filtering'],
            bound(this.resetPagingInfo, this));
        this.emitter.off(['change-page'], bound(this.changePageHandler, this));
        this.emitter.off(['change-page-results'],
            bound(this.changePageResultsHandler, this));

        this.pageSlc = null;
        this.nbPages = 0;

        this.initialized = false;
    }
}
