import {addEvt, cancelEvt, stopEvt, targetEvt, keyCode} from './event';
import {
    addClass, createElm, createOpt, elm, getText, getFirstTextNode, hasClass,
    removeClass, removeElm, tag
} from './dom';
import {contains, matchCase, rgxEsc, trim} from './string';
import {isEmpty as isEmptyString} from './string';
import {isArray, isEmpty, isFn, isNumber, isObj, isString, isUndef}
from './types';
import {formatDate, isValidDate} from './date';
import {removeNbFormat} from './helpers';

import {root} from './root';
import {Emitter} from './emitter';
import {GridLayout} from './modules/gridLayout';
import {Loader} from './modules/loader';
import {HighlightKeyword} from './modules/highlightKeywords';
import {PopupFilter} from './modules/popupFilter';
import {Dropdown} from './modules/dropdown';
import {CheckList} from './modules/checkList';
import {RowsCounter} from './modules/rowsCounter';
import {StatusBar} from './modules/statusBar';
import {Paging} from './modules/paging';
import {ClearButton} from './modules/clearButton';
import {Help} from './modules/help';
import {AlternateRows} from './modules/alternateRows';
import {NoResults} from './modules/noResults';
import {State} from './modules/state';

import {
    INPUT, SELECT, MULTIPLE, CHECKLIST, NONE,
    ENTER_KEY, TAB_KEY, ESC_KEY, UP_ARROW_KEY, DOWN_ARROW_KEY,
    CELL_TAG, AUTO_FILTER_DELAY
} from './const';

let doc = root.document;

export class TableFilter {

    /**
     * TableFilter object constructor
     * requires `table` or `id` arguments, `row` and `configuration` optional
     * @param {DOMElement} table Table DOM element
     * @param {String} id Table id
     * @param {Number} row index indicating the 1st row
     * @param {Object} configuration object
     */
    constructor(...args) {
        this.id = null;
        this.version = '{VERSION}';
        this.year = new Date().getFullYear();
        this.tbl = null;
        this.startRow = null;
        this.refRow = null;
        this.headersRow = null;
        this.cfg = {};
        this.nbFilterableRows = 0;
        this.nbCells = null;

        // TODO: use for-of
        args.forEach((arg) => {
            if (typeof arg === 'object' && arg.nodeName === 'TABLE') {
                this.tbl = arg;
                this.id = arg.id || `tf_${new Date().getTime()}_`;
            } else if (isString(arg)) {
                this.id = arg;
                this.tbl = elm(arg);
            } else if (isNumber(arg)) {
                this.startRow = arg;
            } else if (isObj(arg)) {
                this.cfg = arg;
            }
        });

        if (!this.tbl || this.tbl.nodeName !== 'TABLE' ||
            this.getRowsNb() === 0) {
            throw new Error(`Could not instantiate TableFilter: HTML table
                DOM element not found.`);
        }

        // configuration object
        let f = this.cfg;

        /**
         * Event emitter instance
         * @type {Emitter}
         */
        this.emitter = new Emitter();

        //Start row et cols nb
        this.refRow = this.startRow === null ? 2 : (this.startRow + 1);
        try { this.nbCells = this.getCellsNb(this.refRow); }
        catch (e) { this.nbCells = this.getCellsNb(0); }

        //default script base path
        this.basePath = f.base_path || 'tablefilter/';

        /*** filters' grid properties ***/
        //enables/disables filter grid
        this.fltGrid = f.grid === false ? false : true;

        //enables/disables grid layout (fixed headers)
        this.gridLayout = Boolean(f.grid_layout);

        this.filtersRowIndex = isNaN(f.filters_row_index) ?
            0 : f.filters_row_index;
        this.headersRow = isNaN(f.headers_row_index) ?
            (this.filtersRowIndex === 0 ? 1 : 0) : f.headers_row_index;

        //defines tag of the cells containing filters (td/th)
        this.fltCellTag = isString(f.filters_cell_tag) ?
            f.filters_cell_tag : CELL_TAG;

        //stores filters ids
        this.fltIds = [];
        //stores valid rows indexes (rows visible upon filtering)
        this.validRowsIndex = [];
        //container div for paging elements, reset btn etc.
        this.infDiv = null;
        //div for rows counter
        this.lDiv = null;
        //div for reset button and results per page select
        this.rDiv = null;
        //div for paging elements
        this.mDiv = null;

        //defines css class for div containing paging elements, rows counter etc
        this.infDivCssClass = f.inf_div_css_class || 'inf';
        //defines css class for left div
        this.lDivCssClass = f.left_div_css_class || 'ldiv';
        //defines css class for right div
        this.rDivCssClass = f.right_div_css_class || 'rdiv';
        //defines css class for mid div
        this.mDivCssClass = f.middle_div_css_class || 'mdiv';
        //table container div css class
        this.contDivCssClass = f.content_div_css_class || 'cont';

        /*** filters' grid appearance ***/
        //stylesheet file
        this.stylePath = f.style_path || this.basePath + 'style/';
        this.stylesheet = f.stylesheet || this.stylePath + 'tablefilter.css';
        this.stylesheetId = this.id + '_style';
        //defines css class for filters row
        this.fltsRowCssClass = f.flts_row_css_class || 'fltrow';
        //enables/disables icons (paging, reset button)
        this.enableIcons = f.enable_icons === false ? false : true;
        //enables/disbles rows alternating bg colors
        this.alternateRows = Boolean(f.alternate_rows);
        //defines widths of columns
        this.hasColWidths = isArray(f.col_widths);
        this.colWidths = this.hasColWidths ? f.col_widths : [];
        //defines css class for filters
        this.fltCssClass = f.flt_css_class || 'flt';
        //defines css class for multiple selects filters
        this.fltMultiCssClass = f.flt_multi_css_class || 'flt_multi';
        //defines css class for filters
        this.fltSmallCssClass = f.flt_small_css_class || 'flt_s';
        //defines css class for single-filter
        this.singleFltCssClass = f.single_flt_css_class || 'single_flt';

        /*** filters' grid behaviours ***/
        //enables/disables enter key
        this.enterKey = f.enter_key === false ? false : true;
        //calls function before filtering starts
        this.onBeforeFilter = isFn(f.on_before_filter) ?
            f.on_before_filter : null;
        //calls function after filtering
        this.onAfterFilter = isFn(f.on_after_filter) ? f.on_after_filter : null;
        //enables/disables case sensitivity
        this.caseSensitive = Boolean(f.case_sensitive);
        //has exact match per column
        this.hasExactMatchByCol = isArray(f.columns_exact_match);
        this.exactMatchByCol = this.hasExactMatchByCol ?
            f.columns_exact_match : [];
        //enables/disbles exact match for search
        this.exactMatch = Boolean(f.exact_match);
        //refreshes drop-down lists upon validation
        this.linkedFilters = Boolean(f.linked_filters);
        //wheter excluded options are disabled
        this.disableExcludedOptions = Boolean(f.disable_excluded_options);
        //id of active filter
        this.activeFilterId = null;
        //enables always visible rows
        this.hasVisibleRows = Boolean(f.rows_always_visible);
        //array containing always visible rows
        this.visibleRows = this.hasVisibleRows ? f.rows_always_visible : [];
        //enables/disables external filters generation
        this.isExternalFlt = Boolean(f.external_flt_grid);
        //array containing ids of external elements containing filters
        this.externalFltTgtIds = f.external_flt_grid_ids || [];
        //stores filters elements if isExternalFlt is true
        this.externalFltEls = [];
        //calls function when filters grid loaded
        this.onFiltersLoaded = isFn(f.on_filters_loaded) ?
            f.on_filters_loaded : null;
        //enables/disables single filter search
        this.singleSearchFlt = Boolean(f.single_filter);
        //calls function after row is validated
        this.onRowValidated = isFn(f.on_row_validated) ?
            f.on_row_validated : null;
        //array defining columns for customCellData event
        this.customCellDataCols = f.custom_cell_data_cols ?
            f.custom_cell_data_cols : [];
        //calls custom function for retrieving cell data
        this.customCellData = isFn(f.custom_cell_data) ?
            f.custom_cell_data : null;
        //input watermark text array
        this.watermark = f.watermark || '';
        this.isWatermarkArray = isArray(this.watermark);
        //id of toolbar container element
        this.toolBarTgtId = f.toolbar_target_id || null;
        //enables/disables help div
        this.help = isUndef(f.help_instructions) ?
            undefined : Boolean(f.help_instructions);
        //popup filters
        this.popupFilters = Boolean(f.popup_filters);
        //active columns color
        this.markActiveColumns = Boolean(f.mark_active_columns);
        //defines css class for active column header
        this.activeColumnsCssClass = f.active_columns_css_class ||
            'activeHeader';
        //calls function before active column header is marked
        this.onBeforeActiveColumn = isFn(f.on_before_active_column) ?
            f.on_before_active_column : null;
        //calls function after active column header is marked
        this.onAfterActiveColumn = isFn(f.on_after_active_column) ?
            f.on_after_active_column : null;

        /*** select filter's customisation and behaviours ***/
        //defines 1st option text
        this.displayAllText = f.display_all_text || 'Clear';
        //enables/disables empty option in combo-box filters
        this.enableEmptyOption = Boolean(f.enable_empty_option);
        //defines empty option text
        this.emptyText = f.empty_text || '(Empty)';
        //enables/disables non empty option in combo-box filters
        this.enableNonEmptyOption = Boolean(f.enable_non_empty_option);
        //defines empty option text
        this.nonEmptyText = f.non_empty_text || '(Non empty)';
        //enables/disables onChange event on combo-box
        this.onSlcChange = f.on_change === false ? false : true;
        //enables/disables select options sorting
        this.sortSlc = f.sort_select === false ? false : true;
        //enables/disables ascending numeric options sorting
        this.isSortNumAsc = Boolean(f.sort_num_asc);
        this.sortNumAsc = this.isSortNumAsc ? f.sort_num_asc : [];
        //enables/disables descending numeric options sorting
        this.isSortNumDesc = Boolean(f.sort_num_desc);
        this.sortNumDesc = this.isSortNumDesc ? f.sort_num_desc : [];
        //Select filters are populated on demand
        this.loadFltOnDemand = Boolean(f.load_filters_on_demand);
        this.hasCustomOptions = isObj(f.custom_options);
        this.customOptions = f.custom_options;

        /*** Filter operators ***/
        this.rgxOperator = f.regexp_operator || 'rgx:';
        this.emOperator = f.empty_operator || '[empty]';
        this.nmOperator = f.nonempty_operator || '[nonempty]';
        this.orOperator = f.or_operator || '||';
        this.anOperator = f.and_operator || '&&';
        this.grOperator = f.greater_operator || '>';
        this.lwOperator = f.lower_operator || '<';
        this.leOperator = f.lower_equal_operator || '<=';
        this.geOperator = f.greater_equal_operator || '>=';
        this.dfOperator = f.different_operator || '!';
        this.lkOperator = f.like_operator || '*';
        this.eqOperator = f.equal_operator || '=';
        this.stOperator = f.start_with_operator || '{';
        this.enOperator = f.end_with_operator || '}';
        this.curExp = f.cur_exp || '^[¥£€$]';
        this.separator = f.separator || ',';

        //show/hides rows counter
        this.rowsCounter = Boolean(f.rows_counter);

        //show/hides status bar
        this.statusBar = Boolean(f.status_bar);

        //enables/disables loader/spinner indicator
        this.loader = Boolean(f.loader);

        /*** validation - reset buttons/links ***/
        //show/hides filter's validation button
        this.displayBtn = Boolean(f.btn);
        //defines validation button text
        this.btnText = f.btn_text || (!this.enableIcons ? 'Go' : '');
        //defines css class for validation button
        this.btnCssClass = f.btn_css_class ||
            (!this.enableIcons ? 'btnflt' : 'btnflt_icon');
        //show/hides reset link
        this.btnReset = Boolean(f.btn_reset);
        //defines css class for reset button
        this.btnResetCssClass = f.btn_reset_css_class || 'reset';
        //callback function before filters are cleared
        this.onBeforeReset = isFn(f.on_before_reset) ?
            f.on_before_reset : null;
        //callback function after filters are cleared
        this.onAfterReset = isFn(f.on_after_reset) ? f.on_after_reset : null;

        /*** paging ***/
        //enables/disables table paging
        this.paging = Boolean(f.paging);
        this.nbHiddenRows = 0; //nb hidden rows

        /*** autofilter on typing ***/
        //Auto filtering, table is filtered when user stops typing
        this.autoFilter = Boolean(f.auto_filter);
        //onkeyup delay timer (msecs)
        this.autoFilterDelay = !isNaN(f.auto_filter_delay) ?
            f.auto_filter_delay : AUTO_FILTER_DELAY;
        //typing indicator
        this.isUserTyping = null;
        this.autoFilterTimer = null;

        /*** keyword highlighting ***/
        //enables/disables keyword highlighting
        this.highlightKeywords = Boolean(f.highlight_keywords);

        /*** No results feature ***/
        this.noResults = isObj(f.no_results_message) ||
            Boolean(f.no_results_message);

        // state persisstence
        this.state = isObj(f.state) || Boolean(f.state);

        /*** data types ***/
        //defines default date type (european DMY)
        this.defaultDateType = f.default_date_type || 'DMY';
        //defines default thousands separator US = ',' EU = '.'
        this.thousandsSeparator = f.thousands_separator || ',';
        //defines default decimal separator
        //US & javascript = '.' EU = ','
        this.decimalSeparator = f.decimal_separator || '.';
        //enables number format per column
        this.hasColNbFormat = isArray(f.col_number_format);
        //array containing columns nb formats
        this.colNbFormat = this.hasColNbFormat ? f.col_number_format : null;
        //enables date type per column
        this.hasColDateType = isArray(f.col_date_type);
        //array containing columns date type
        this.colDateType = this.hasColDateType ? f.col_date_type : null;

        /*** ids prefixes ***/
        //css class name added to table
        this.prfxTf = 'TF';
        //filters (inputs - selects)
        this.prfxFlt = 'flt';
        //validation button
        this.prfxValButton = 'btn';
        //container div for paging elements, rows counter etc.
        this.prfxInfDiv = 'inf_';
        //left div
        this.prfxLDiv = 'ldiv_';
        //right div
        this.prfxRDiv = 'rdiv_';
        //middle div
        this.prfxMDiv = 'mdiv_';
        //responsive table css class
        this.prfxResponsive = 'resp';

        /*** extensions ***/
        //imports external script
        this.extensions = f.extensions;
        this.hasExtensions = isArray(this.extensions);

        /*** themes ***/
        this.enableDefaultTheme = Boolean(f.enable_default_theme);
        //imports themes
        this.hasThemes = (this.enableDefaultTheme || isArray(f.themes));
        this.themes = f.themes || [];
        //themes path
        this.themesPath = f.themes_path || this.stylePath + 'themes/';

        //responsive table
        this.responsive = Boolean(f.responsive);

        // Features registry
        this.Mod = {};

        // Extensions registry
        this.ExtRegistry = {};
    }

    /**
     * Initialise features and layout
     */
    init() {
        if (this.initialized) {
            return;
        }

        let Mod = this.Mod;
        let n = this.singleSearchFlt ? 1 : this.nbCells;
        let inpclass;

        //loads stylesheet if not imported
        this.import(this.stylesheetId, this.stylesheet, null, 'link');

        //loads theme
        if (this.hasThemes) {
            this.loadThemes();
        }

        // Instantiate help feature and initialise only if set true
        if (!Mod.help) {
            Mod.help = new Help(this);
        }
        if (this.help) {
            Mod.help.init();
        }

        if (this.state) {
            if (!Mod.state) {
                Mod.state = new State(this);
            }
            Mod.state.init();
        }

        if (this.gridLayout) {
            if (!Mod.gridLayout) {
                Mod.gridLayout = new GridLayout(this);
            }
            Mod.gridLayout.init();
        }

        if (this.loader) {
            if (!Mod.loader) {
                Mod.loader = new Loader(this);
            }
            Mod.loader.init();
        }

        if (this.highlightKeywords) {
            Mod.highlightKeyword = new HighlightKeyword(this);
            Mod.highlightKeyword.init();
        }

        if (this.popupFilters) {
            if (!Mod.popupFilter) {
                Mod.popupFilter = new PopupFilter(this);
            }
            Mod.popupFilter.init();
        }

        //filters grid is not generated
        if (!this.fltGrid) {
            this._initNoFilters();
        } else {
            let fltrow = this._insertFiltersRow();

            this.nbFilterableRows = this.getRowsNb();

            // Generate filters
            for (let i = 0; i < n; i++) {
                this.emitter.emit('before-filter-init', this, i);

                let fltcell = createElm(this.fltCellTag),
                    col = this.getFilterType(i);

                if (this.singleSearchFlt) {
                    fltcell.colSpan = this.nbCells;
                }
                if (!this.gridLayout) {
                    fltrow.appendChild(fltcell);
                }
                inpclass = (i === n - 1 && this.displayBtn) ?
                    this.fltSmallCssClass : this.fltCssClass;

                //only 1 input for single search
                if (this.singleSearchFlt) {
                    col = INPUT;
                    inpclass = this.singleFltCssClass;
                }

                //drop-down filters
                if (col === SELECT || col === MULTIPLE) {
                    if (!Mod.dropdown) {
                        Mod.dropdown = new Dropdown(this);
                    }
                    Mod.dropdown.init(i, this.isExternalFlt, fltcell);
                }
                // checklist
                else if (col === CHECKLIST) {
                    if (!Mod.checkList) {
                        Mod.checkList = new CheckList(this);
                    }
                    Mod.checkList.init(i, this.isExternalFlt, fltcell);
                } else {
                    this._buildInputFilter(i, inpclass, fltcell);
                }

                // this adds submit button
                if (i === n - 1 && this.displayBtn) {
                    this._buildSubmitButton(i, fltcell);
                }

                this.emitter.emit('after-filter-init', this, i);
            }

            this.emitter.on(['filter-focus'],
                (tf, filter) => this.setActiveFilterId(filter.id));

        }//if this.fltGrid

        /* Features */
        if (this.hasVisibleRows) {
            this.emitter.on(['after-filtering'],
                () => this.enforceVisibility());
            this.enforceVisibility();
        }
        if (this.rowsCounter) {
            Mod.rowsCounter = new RowsCounter(this);
            Mod.rowsCounter.init();
        }
        if (this.statusBar) {
            Mod.statusBar = new StatusBar(this);
            Mod.statusBar.init();
        }
        if (this.paging) {
            if (!Mod.paging) {
                Mod.paging = new Paging(this);
                Mod.paging.init();
            } else {
                Mod.paging.reset();
            }
        }
        if (this.btnReset) {
            Mod.clearButton = new ClearButton(this);
            Mod.clearButton.init();
        }

        if (this.hasColWidths && !this.gridLayout) {
            this.setColWidths();
        }
        if (this.alternateRows) {
            Mod.alternateRows = new AlternateRows(this);
            Mod.alternateRows.init();
        }
        if (this.noResults) {
            if (!Mod.noResults) {
                Mod.noResults = new NoResults(this);
            }
            Mod.noResults.init();
        }

        //TF css class is added to table
        if (!this.gridLayout) {
            addClass(this.tbl, this.prfxTf);
            if (this.responsive) {
                addClass(this.tbl, this.prfxResponsive);
            }
        }

        /* Loads extensions */
        if (this.hasExtensions) {
            this.initExtensions();
        }

        // Subscribe to events
        if (this.markActiveColumns) {
            this.emitter.on(['before-filtering'],
                () => this.clearActiveColumns());
            this.emitter.on(['cell-processed'],
                (tf, colIndex) => this.markActiveColumn(colIndex));
        }
        if (this.linkedFilters) {
            this.emitter.on(['after-filtering'], () => this.linkFilters());
        }

        this.initialized = true;

        if (this.onFiltersLoaded) {
            this.onFiltersLoaded.call(null, this);
        }
        this.emitter.emit('initialized', this);
    }

    /**
     * Detect <enter> key
     * @param {Event} evt
     */
    detectKey(evt) {
        if (!this.enterKey) {
            return;
        }
        if (evt) {
            let key = keyCode(evt);
            if (key === ENTER_KEY) {
                this.filter();
                cancelEvt(evt);
                stopEvt(evt);
            } else {
                this.isUserTyping = true;
                root.clearInterval(this.autoFilterTimer);
                this.autoFilterTimer = null;
            }
        }
    }

    /**
     * Filter's keyup event: if auto-filter on, detect user is typing and filter
     * columns
     * @param {Event} evt
     */
    onKeyUp(evt) {
        if (!this.autoFilter) {
            return;
        }
        let key = keyCode(evt);
        this.isUserTyping = false;

        function filter() {
            root.clearInterval(this.autoFilterTimer);
            this.autoFilterTimer = null;
            if (!this.isUserTyping) {
                this.filter();
                this.isUserTyping = null;
            }
        }

        if (key !== ENTER_KEY && key !== TAB_KEY && key !== ESC_KEY &&
            key !== UP_ARROW_KEY && key !== DOWN_ARROW_KEY) {
            if (this.autoFilterTimer === null) {
                this.autoFilterTimer = root.setInterval(filter.bind(this),
                    this.autoFilterDelay);
            }
        } else {
            root.clearInterval(this.autoFilterTimer);
            this.autoFilterTimer = null;
        }
    }

    /**
     * Filter's keydown event: if auto-filter on, detect user is typing
     */
    onKeyDown() {
        if (this.autoFilter) {
            this.isUserTyping = true;
        }
    }

    /**
     * Filter's focus event
     * @param {Event} evt
     */
    onInpFocus(evt) {
        let elm = targetEvt(evt);
        this.emitter.emit('filter-focus', this, elm);
    }

    /**
     * Filter's blur event: if auto-filter on, clear interval on filter blur
     */
    onInpBlur() {
        if (this.autoFilter) {
            this.isUserTyping = false;
            root.clearInterval(this.autoFilterTimer);
        }
        this.emitter.emit('filter-blur', this);
    }

    /**
     * Insert filters row at initialization
     */
    _insertFiltersRow() {
        if (this.gridLayout) {
            return;
        }
        let fltrow;

        let thead = tag(this.tbl, 'thead');
        if (thead.length > 0) {
            fltrow = thead[0].insertRow(this.filtersRowIndex);
        } else {
            fltrow = this.tbl.insertRow(this.filtersRowIndex);
        }

        fltrow.className = this.fltsRowCssClass;

        if (this.isExternalFlt) {
            fltrow.style.display = NONE;
        }

        this.emitter.emit('filters-row-inserted', this, fltrow);
        return fltrow;
    }

    /**
     * Initialize filtersless table
     */
    _initNoFilters() {
        if (this.fltGrid) {
            return;
        }
        this.refRow = this.refRow > 0 ? this.refRow - 1 : 0;
        this.nbFilterableRows = this.getRowsNb();
    }

    /**
     * Build input filter type
     * @param  {Number} colIndex      Column index
     * @param  {String} cssClass      Css class applied to filter
     * @param  {DOMElement} container Container DOM element
     */
    _buildInputFilter(colIndex, cssClass, container) {
        let col = this.getFilterType(colIndex);
        let externalFltTgtId = this.isExternalFlt ?
            this.externalFltTgtIds[colIndex] : null;
        let inptype = col === INPUT ? 'text' : 'hidden';
        let inp = createElm(INPUT,
            ['id', this.prfxFlt + colIndex + '_' + this.id],
            ['type', inptype], ['ct', colIndex]);

        if (inptype !== 'hidden' && this.watermark) {
            inp.setAttribute('placeholder',
                this.isWatermarkArray ? (this.watermark[colIndex] || '') :
                    this.watermark
            );
        }
        inp.className = cssClass || this.fltCssClass;
        addEvt(inp, 'focus', (evt) => this.onInpFocus(evt));

        //filter is appended in custom element
        if (externalFltTgtId) {
            elm(externalFltTgtId).appendChild(inp);
            this.externalFltEls.push(inp);
        } else {
            container.appendChild(inp);
        }

        this.fltIds.push(inp.id);

        addEvt(inp, 'keypress', (evt) => this.detectKey(evt));
        addEvt(inp, 'keydown', () => this.onKeyDown());
        addEvt(inp, 'keyup', (evt) => this.onKeyUp(evt));
        addEvt(inp, 'blur', () => this.onInpBlur());
    }

    /**
     * Build submit button
     * @param  {Number} colIndex      Column index
     * @param  {DOMElement} container Container DOM element
     */
    _buildSubmitButton(colIndex, container) {
        let externalFltTgtId = this.isExternalFlt ?
            this.externalFltTgtIds[colIndex] : null;
        let btn = createElm(INPUT,
            ['id', this.prfxValButton + colIndex + '_' + this.id],
            ['type', 'button'], ['value', this.btnText]);
        btn.className = this.btnCssClass;

        //filter is appended in custom element
        if (externalFltTgtId) {
            elm(externalFltTgtId).appendChild(btn);
        } else {
            container.appendChild(btn);
        }

        addEvt(btn, 'click', () => this.filter());
    }

    /**
     * Return a feature instance for a given name
     * @param  {String} name Name of the feature
     * @return {Object}
     */
    feature(name) {
        return this.Mod[name];
    }

    /**
     * Initialise all the extensions defined in the configuration object
     */
    initExtensions() {
        let exts = this.extensions;
        // Set config's publicPath dynamically for Webpack...
        __webpack_public_path__ = this.basePath;

        this.emitter.emit('before-loading-extensions', this);
        for (let i = 0, len = exts.length; i < len; i++) {
            let ext = exts[i];
            if (!this.ExtRegistry[ext.name]) {
                this.loadExtension(ext);
            }
        }
        this.emitter.emit('after-loading-extensions', this);
    }

    /**
     * Load an extension module
     * @param  {Object} ext Extension config object
     */
    loadExtension(ext) {
        if (!ext || !ext.name) {
            return;
        }

        let name = ext.name;
        let path = ext.path;
        let modulePath;

        if (name && path) {
            modulePath = ext.path + name;
        } else {
            name = name.replace('.js', '');
            modulePath = 'extensions/{}/{}'.replace(/{}/g, name);
        }

        // Require pattern for Webpack
        require(['./' + modulePath], (mod) => {
            /* eslint-disable */
            let inst = new mod.default(this, ext);
            /* eslint-enable */
            inst.init();
            this.ExtRegistry[name] = inst;
        });
    }

    /**
     * Get an extension instance
     * @param  {String} name Name of the extension
     * @return {Object}      Extension instance
     */
    extension(name) {
        return this.ExtRegistry[name];
    }

    /**
     * Check passed extension name exists
     * @param  {String}  name Name of the extension
     * @return {Boolean}
     */
    hasExtension(name) {
        return !isEmpty(this.ExtRegistry[name]);
    }

    /**
     * Destroy all the extensions defined in the configuration object
     */
    destroyExtensions() {
        let exts = this.extensions;

        for (let i = 0, len = exts.length; i < len; i++) {
            let ext = exts[i];
            let extInstance = this.ExtRegistry[ext.name];
            if (extInstance) {
                extInstance.destroy();
                this.ExtRegistry[ext.name] = undefined;
            }
        }
    }

    /**
     * Load themes defined in the configuration object
     */
    loadThemes() {
        let themes = this.themes;
        this.emitter.emit('before-loading-themes', this);

        //Default theme config
        if (this.enableDefaultTheme) {
            let defaultTheme = { name: 'default' };
            this.themes.push(defaultTheme);
        }
        if (isArray(themes)) {
            for (let i = 0, len = themes.length; i < len; i++) {
                let theme = themes[i];
                let name = theme.name;
                let path = theme.path;
                let styleId = this.prfxTf + name;
                if (name && !path) {
                    path = this.themesPath + name + '/' + name + '.css';
                }
                else if (!name && theme.path) {
                    name = 'theme{0}'.replace('{0}', i);
                }

                if (!this.isImported(path, 'link')) {
                    this.import(styleId, path, null, 'link');
                }
            }
        }

        //Some elements need to be overriden for default theme
        //Reset button
        this.btnResetText = null;
        this.btnResetHtml = '<input type="button" value="" class="' +
            this.btnResetCssClass + '" title="Clear filters" />';

        //Paging buttons
        this.btnPrevPageHtml = '<input type="button" value="" class="' +
            this.btnPageCssClass + ' previousPage" title="Previous page" />';
        this.btnNextPageHtml = '<input type="button" value="" class="' +
            this.btnPageCssClass + ' nextPage" title="Next page" />';
        this.btnFirstPageHtml = '<input type="button" value="" class="' +
            this.btnPageCssClass + ' firstPage" title="First page" />';
        this.btnLastPageHtml = '<input type="button" value="" class="' +
            this.btnPageCssClass + ' lastPage" title="Last page" />';

        //Loader
        this.loader = true;
        this.loaderHtml = '<div class="defaultLoader"></div>';
        this.loaderText = null;

        this.emitter.emit('after-loading-themes', this);
    }

    /**
     * Return stylesheet DOM element for a given theme name
     * @return {DOMElement} stylesheet element
     */
    getStylesheet(name = 'default') {
        return elm(this.prfxTf + name);
    }

    /**
     * Destroy filter grid
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        let Mod = this.Mod;
        let emitter = this.emitter;

        if (this.isExternalFlt && !this.popupFilters) {
            this.removeExternalFlts();
        }
        if (this.infDiv) {
            this.removeToolbar();
        }
        if (this.markActiveColumns) {
            this.clearActiveColumns();
            emitter.off(['before-filtering'], () => this.clearActiveColumns());
            emitter.off(['cell-processed'],
                (tf, colIndex) => this.markActiveColumn(colIndex));
        }
        if (this.hasExtensions) {
            this.destroyExtensions();
        }

        this.validateAllRows();

        if (this.fltGrid && !this.gridLayout) {
            this.tbl.deleteRow(this.filtersRowIndex);
        }

        // broadcast destroy event
        emitter.emit('destroy', this);

        // Destroy modules
        // TODO: subcribe modules to destroy event instead
        Object.keys(Mod).forEach(function (key) {
            let feature = Mod[key];
            if (feature && isFn(feature.destroy)) {
                feature.destroy();
            }
        });

        // unsubscribe to events
        if (this.hasVisibleRows) {
            emitter.off(['after-filtering'], () => this.enforceVisibility());
        }
        if (this.linkedFilters) {
            emitter.off(['after-filtering'], () => this.linkFilters());
        }
        this.emitter.off(['filter-focus'],
            (tf, filter) => this.setActiveFilterId(filter.id));

        removeClass(this.tbl, this.prfxTf);
        removeClass(this.tbl, this.prfxResponsive);

        this.nbHiddenRows = 0;
        this.validRowsIndex = [];
        this.fltIds = [];
        this.initialized = false;
    }

    /**
     * Generate container element for paging, reset button, rows counter etc.
     */
    setToolbar() {
        if (this.infDiv) {
            return;
        }

        /*** container div ***/
        let infdiv = createElm('div', ['id', this.prfxInfDiv + this.id]);
        infdiv.className = this.infDivCssClass;

        //custom container
        if (this.toolBarTgtId) {
            elm(this.toolBarTgtId).appendChild(infdiv);
        }
        //grid-layout
        else if (this.gridLayout) {
            let gridLayout = this.Mod.gridLayout;
            gridLayout.tblMainCont.appendChild(infdiv);
            infdiv.className = gridLayout.infDivCssClass;
        }
        //default location: just above the table
        else {
            let cont = createElm('caption');
            cont.appendChild(infdiv);
            this.tbl.insertBefore(cont, this.tbl.firstChild);
        }
        this.infDiv = elm(this.prfxInfDiv + this.id);

        /*** left div containing rows # displayer ***/
        let ldiv = createElm('div', ['id', this.prfxLDiv + this.id]);
        ldiv.className = this.lDivCssClass;
        infdiv.appendChild(ldiv);
        this.lDiv = elm(this.prfxLDiv + this.id);

        /***    right div containing reset button
                + nb results per page select    ***/
        let rdiv = createElm('div', ['id', this.prfxRDiv + this.id]);
        rdiv.className = this.rDivCssClass;
        infdiv.appendChild(rdiv);
        this.rDiv = elm(this.prfxRDiv + this.id);

        /*** mid div containing paging elements ***/
        let mdiv = createElm('div', ['id', this.prfxMDiv + this.id]);
        mdiv.className = this.mDivCssClass;
        infdiv.appendChild(mdiv);
        this.mDiv = elm(this.prfxMDiv + this.id);

        // emit help initialisation only if undefined
        if (isUndef(this.help)) {
            // explicitily set enabled field to true to initialise help by
            // default, only if setting is undefined
            this.Mod.help.enabled = true;
            this.emitter.emit('init-help', this);
        }
    }

    /**
     * Remove toolbar container element
     */
    removeToolbar() {
        if (!this.infDiv) {
            return;
        }
        removeElm(this.infDiv);
        this.infDiv = null;

        let tbl = this.tbl;
        let captions = tag(tbl, 'caption');
        if (captions.length > 0) {
            [].forEach.call(captions, (elm) => tbl.removeChild(elm));
        }
    }

    /**
     * Remove all the external column filters
     */
    removeExternalFlts() {
        if (!this.isExternalFlt) {
            return;
        }
        let ids = this.externalFltTgtIds,
            len = ids.length;
        for (let ct = 0; ct < len; ct++) {
            let externalFltTgtId = ids[ct],
                externalFlt = elm(externalFltTgtId);
            if (externalFlt) {
                externalFlt.innerHTML = '';
            }
        }
    }

    /**
     * Check if given column implements a filter with custom options
     * @param  {Number}  colIndex Column's index
     * @return {Boolean}
     */
    isCustomOptions(colIndex) {
        return this.hasCustomOptions &&
            this.customOptions.cols.indexOf(colIndex) !== -1;
    }

    /**
     * Returns an array [[value0, value1 ...],[text0, text1 ...]] with the
     * custom options values and texts
     * @param  {Number} colIndex Column's index
     * @return {Array}
     */
    getCustomOptions(colIndex) {
        if (isEmpty(colIndex) || !this.isCustomOptions(colIndex)) {
            return;
        }

        let customOptions = this.customOptions;
        let cols = customOptions.cols;
        let optTxt = [], optArray = [];
        let index = cols.indexOf(colIndex);
        let slcValues = customOptions.values[index];
        let slcTexts = customOptions.texts[index];
        let slcSort = customOptions.sorts[index];

        for (let r = 0, len = slcValues.length; r < len; r++) {
            optArray.push(slcValues[r]);
            if (slcTexts[r]) {
                optTxt.push(slcTexts[r]);
            } else {
                optTxt.push(slcValues[r]);
            }
        }
        if (slcSort) {
            optArray.sort();
            optTxt.sort();
        }
        return [optArray, optTxt];
    }

    /**
     * Filter the table by retrieving the data from each cell in every single
     * row and comparing it to the search term for current column. A row is
     * hidden when all the search terms are not found in inspected row.
     */
    filter() {
        if (!this.fltGrid || !this.initialized) {
            return;
        }
        //invoke onbefore callback
        if (this.onBeforeFilter) {
            this.onBeforeFilter.call(null, this);
        }
        this.emitter.emit('before-filtering', this);

        let row = this.tbl.rows,
            nbRows = this.getRowsNb(true),
            hiddenRows = 0;

        this.validRowsIndex = [];
        // search args re-init
        let searchArgs = this.getFiltersValue();

        let numCellData;
        let nbFormat;
        let re_le = new RegExp(this.leOperator),
            re_ge = new RegExp(this.geOperator),
            re_l = new RegExp(this.lwOperator),
            re_g = new RegExp(this.grOperator),
            re_d = new RegExp(this.dfOperator),
            re_lk = new RegExp(rgxEsc(this.lkOperator)),
            re_eq = new RegExp(this.eqOperator),
            re_st = new RegExp(this.stOperator),
            re_en = new RegExp(this.enOperator),
            // re_an = new RegExp(this.anOperator),
            // re_cr = new RegExp(this.curExp),
            re_em = this.emOperator,
            re_nm = this.nmOperator,
            re_re = new RegExp(rgxEsc(this.rgxOperator));

        //keyword highlighting
        function highlight(str, ok, cell) {
            /*jshint validthis:true */
            if (this.highlightKeywords && ok) {
                str = str.replace(re_lk, '');
                str = str.replace(re_eq, '');
                str = str.replace(re_st, '');
                str = str.replace(re_en, '');
                let w = str;
                if (re_le.test(str) || re_ge.test(str) || re_l.test(str) ||
                    re_g.test(str) || re_d.test(str)) {
                    w = getText(cell);
                }
                if (w !== '') {
                    this.emitter.emit('highlight-keyword', this, cell, w);
                }
            }
        }

        //looks for search argument in current row
        function hasArg(sA, cellData, j) {
            sA = matchCase(sA, this.caseSensitive);

            let occurence;
            let dtType = this.hasColDateType ?
                this.colDateType[j] : this.defaultDateType;

            //Search arg operator tests
            let hasLO = re_l.test(sA),
                hasLE = re_le.test(sA),
                hasGR = re_g.test(sA),
                hasGE = re_ge.test(sA),
                hasDF = re_d.test(sA),
                hasEQ = re_eq.test(sA),
                hasLK = re_lk.test(sA),
                // hasAN = re_an.test(sA),
                hasST = re_st.test(sA),
                hasEN = re_en.test(sA),
                hasEM = (re_em === sA),
                hasNM = (re_nm === sA),
                hasRE = re_re.test(sA);

            //Search arg dates tests
            let isLDate = hasLO && isValidDate(sA.replace(re_l, ''), dtType);
            let isLEDate = hasLE && isValidDate(sA.replace(re_le, ''), dtType);
            let isGDate = hasGR && isValidDate(sA.replace(re_g, ''), dtType);
            let isGEDate = hasGE && isValidDate(sA.replace(re_ge, ''), dtType);
            let isDFDate = hasDF && isValidDate(sA.replace(re_d, ''), dtType);
            let isEQDate = hasEQ && isValidDate(sA.replace(re_eq, ''), dtType);

            let dte1, dte2;
            //dates
            if (isValidDate(cellData, dtType)) {
                dte1 = formatDate(cellData, dtType);
                // lower date
                if (isLDate) {
                    dte2 = formatDate(sA.replace(re_l, ''), dtType);
                    occurence = dte1 < dte2;
                }
                // lower equal date
                else if (isLEDate) {
                    dte2 = formatDate(sA.replace(re_le, ''), dtType);
                    occurence = dte1 <= dte2;
                }
                // greater equal date
                else if (isGEDate) {
                    dte2 = formatDate(sA.replace(re_ge, ''), dtType);
                    occurence = dte1 >= dte2;
                }
                // greater date
                else if (isGDate) {
                    dte2 = formatDate(sA.replace(re_g, ''), dtType);
                    occurence = dte1 > dte2;
                }
                // different date
                else if (isDFDate) {
                    dte2 = formatDate(sA.replace(re_d, ''), dtType);
                    occurence = dte1.toString() !== dte2.toString();
                }
                // equal date
                else if (isEQDate) {
                    dte2 = formatDate(sA.replace(re_eq, ''), dtType);
                    occurence = dte1.toString() === dte2.toString();
                }
                // searched keyword with * operator doesn't have to be a date
                else if (re_lk.test(sA)) {// like date
                    occurence = contains(sA.replace(re_lk, ''), cellData,
                        false, this.caseSensitive);
                }
                else if (isValidDate(sA, dtType)) {
                    dte2 = formatDate(sA, dtType);
                    occurence = dte1.toString() === dte2.toString();
                }
                //empty
                else if (hasEM) {
                    occurence = isEmptyString(cellData);
                }
                //non-empty
                else if (hasNM) {
                    occurence = !isEmptyString(cellData);
                } else {
                    occurence = contains(sA, cellData, this.isExactMatch(j),
                        this.caseSensitive);
                }
            }

            else {
                //first numbers need to be formated
                if (this.hasColNbFormat && this.colNbFormat[j]) {
                    numCellData = removeNbFormat(cellData, this.colNbFormat[j]);
                    nbFormat = this.colNbFormat[j];
                } else {
                    if (this.thousandsSeparator === ',' &&
                        this.decimalSeparator === '.') {
                        numCellData = removeNbFormat(cellData, 'us');
                        nbFormat = 'us';
                    } else {
                        numCellData = removeNbFormat(cellData, 'eu');
                        nbFormat = 'eu';
                    }
                }

                // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},
                // rgx:)
                // lower equal
                if (hasLE) {
                    occurence = numCellData <= removeNbFormat(
                        sA.replace(re_le, ''), nbFormat);
                }
                //greater equal
                else if (hasGE) {
                    occurence = numCellData >= removeNbFormat(
                        sA.replace(re_ge, ''), nbFormat);
                }
                //lower
                else if (hasLO) {
                    occurence = numCellData < removeNbFormat(
                        sA.replace(re_l, ''), nbFormat);
                }
                //greater
                else if (hasGR) {
                    occurence = numCellData > removeNbFormat(
                        sA.replace(re_g, ''), nbFormat);
                }
                //different
                else if (hasDF) {
                    occurence = contains(sA.replace(re_d, ''), cellData,
                        false, this.caseSensitive) ? false : true;
                }
                //like
                else if (hasLK) {
                    occurence = contains(sA.replace(re_lk, ''), cellData,
                        false, this.caseSensitive);
                }
                //equal
                else if (hasEQ) {
                    occurence = contains(sA.replace(re_eq, ''), cellData,
                        true, this.caseSensitive);
                }
                //starts with
                else if (hasST) {
                    occurence = cellData.indexOf(sA.replace(re_st, '')) === 0 ?
                        true : false;
                }
                //ends with
                else if (hasEN) {
                    let searchArg = sA.replace(re_en, '');
                    occurence =
                        cellData.lastIndexOf(searchArg, cellData.length - 1) ===
                            (cellData.length - 1) - (searchArg.length - 1) &&
                            cellData.lastIndexOf(searchArg, cellData.length - 1)
                            > -1 ? true : false;
                }
                //empty
                else if (hasEM) {
                    occurence = isEmptyString(cellData);
                }
                //non-empty
                else if (hasNM) {
                    occurence = !isEmptyString(cellData);
                }
                //regexp
                else if (hasRE) {
                    //in case regexp fires an exception
                    try {
                        //operator is removed
                        let srchArg = sA.replace(re_re, '');
                        let rgx = new RegExp(srchArg);
                        occurence = rgx.test(cellData);
                    } catch (ex) {
                        occurence = false;
                    }
                } else {
                    // If numeric type data, perform a strict equality test and
                    // fallback to unformatted number string comparison
                    if (numCellData && this.hasColNbFormat &&
                        this.colNbFormat[j] && !this.singleSearchFlt) {
                        sA = removeNbFormat(sA, nbFormat);
                        occurence = numCellData === sA ||
                            contains(sA.toString(), numCellData.toString(),
                                this.isExactMatch(j), this.caseSensitive);
                    } else {
                        // Finally test search term is contained in cell data
                        occurence = contains(sA, cellData, this.isExactMatch(j),
                            this.caseSensitive);
                    }
                }

            }//else
            return occurence;
        }//fn

        for (let k = this.refRow; k < nbRows; k++) {
            // already filtered rows display re-init
            row[k].style.display = '';

            let cells = row[k].cells;
            let nchilds = cells.length;

            // checks if row has exact cell #
            if (nchilds !== this.nbCells) {
                continue;
            }

            let occurence = [],
                isRowValid = true,
                //only for single filter search
                singleFltRowValid = false;

            // this loop retrieves cell data
            for (let j = 0; j < nchilds; j++) {
                //searched keyword
                let sA = searchArgs[this.singleSearchFlt ? 0 : j];

                if (sA === '') {
                    continue;
                }

                let cellData = matchCase(this.getCellData(cells[j]),
                    this.caseSensitive);

                //multiple search parameter operator ||
                let sAOrSplit = sA.toString().split(this.orOperator),
                    //multiple search || parameter boolean
                    hasMultiOrSA = sAOrSplit.length > 1,
                    //multiple search parameter operator &&
                    sAAndSplit = sA.toString().split(this.anOperator),
                    //multiple search && parameter boolean
                    hasMultiAndSA = sAAndSplit.length > 1;

                //detect operators or array query
                if (isArray(sA) || hasMultiOrSA || hasMultiAndSA) {
                    let cS,
                        s,
                        occur = false;
                    if (isArray(sA)) {
                        s = sA;
                    } else {
                        s = hasMultiOrSA ? sAOrSplit : sAAndSplit;
                    }
                    // TODO: improve clarity/readability of this block
                    for (let w = 0, len = s.length; w < len; w++) {
                        cS = trim(s[w]);
                        occur = hasArg.call(this, cS, cellData, j);
                        highlight.call(this, cS, occur, cells[j]);
                        if ((hasMultiOrSA && occur) ||
                            (hasMultiAndSA && !occur)) {
                            break;
                        }
                        if (isArray(sA) && occur) {
                            break;
                        }
                    }
                    occurence[j] = occur;

                }
                //single search parameter
                else {
                    occurence[j] = hasArg.call(this, trim(sA), cellData, j);
                    highlight.call(this, sA, occurence[j], cells[j]);
                }//else single param

                if (!occurence[j]) {
                    isRowValid = false;
                }
                if (this.singleSearchFlt && occurence[j]) {
                    singleFltRowValid = true;
                }

                this.emitter.emit('cell-processed', this, j, cells[j]);
            }//for j

            if (this.singleSearchFlt && singleFltRowValid) {
                isRowValid = true;
            }

            if (!isRowValid) {
                this.validateRow(k, false);
                hiddenRows++;
            } else {
                this.validateRow(k, true);
            }

            this.emitter.emit('row-processed', this, k,
                this.validRowsIndex.length, isRowValid);
        }// for k

        this.nbHiddenRows = hiddenRows;

        //invokes onafterfilter callback
        if (this.onAfterFilter) {
            this.onAfterFilter.call(null, this);
        }

        this.emitter.emit('after-filtering', this, searchArgs);
    }

    /**
     * Return the data of a specified column
     * @param  {Number} colIndex Column index
     * @param  {Boolean} includeHeaders  Optional: include headers row
     * @param  {Boolean} num     Optional: return unformatted number
     * @param  {Array} exclude   Optional: list of row indexes to be excluded
     * @return {Array}           Flat list of data for a column
     */
    getColValues(colIndex, includeHeaders = false, num = false, exclude = []) {
        if (!this.fltGrid) {
            return;
        }
        let row = this.tbl.rows;
        let nbRows = this.getRowsNb(true);
        let colValues = [];

        if (includeHeaders) {
            colValues.push(this.getHeadersText()[colIndex]);
        }

        for (let i = this.refRow; i < nbRows; i++) {
            let isExludedRow = false;
            // checks if current row index appears in exclude array
            if (exclude.length > 0) {
                isExludedRow = exclude.indexOf(i) !== -1;
            }
            let cell = row[i].cells,
                nchilds = cell.length;

            // checks if row has exact cell # and is not excluded
            if (nchilds === this.nbCells && !isExludedRow) {
                // this loop retrieves cell data
                for (let j = 0; j < nchilds; j++) {
                    if (j !== colIndex || row[i].style.display !== '') {
                        continue;
                    }
                    let cellData = this.getCellData(cell[j]),
                        nbFormat = this.colNbFormat ?
                            this.colNbFormat[colIndex] : undefined,
                        data = num ? removeNbFormat(cellData, nbFormat) :
                            cellData;
                    colValues.push(data);
                }
            }
        }
        return colValues;
    }

    /**
     * Return the filter's value of a specified column
     * @param  {Number} index Column index
     * @return {String}       Filter value
     */
    getFilterValue(index) {
        if (!this.fltGrid) {
            return;
        }
        let fltValue = '';
        let flt = this.getFilterElement(index);
        if (!flt) {
            return fltValue;
        }

        let fltColType = this.getFilterType(index);
        if (fltColType !== MULTIPLE && fltColType !== CHECKLIST) {
            fltValue = flt.value;
        }
        //mutiple select
        else if (fltColType === MULTIPLE) {
            fltValue = this.feature('dropdown').getValues(index);
        }
        //checklist
        else if (fltColType === CHECKLIST) {
            fltValue = this.feature('checkList').getValues(index);
        }
        //return an empty string if collection is empty or contains a single
        //empty string
        if (isArray(fltValue) && fltValue.length === 0 ||
            (fltValue.length === 1 && fltValue[0] === '')) {
            fltValue = '';
        }

        return fltValue;
    }

    /**
     * Return the filters' values
     * @return {Array} List of filters' values
     */
    getFiltersValue() {
        if (!this.fltGrid) {
            return;
        }
        let searchArgs = [];
        for (let i = 0, len = this.fltIds.length; i < len; i++) {
            let fltValue = this.getFilterValue(i);
            if (isArray(fltValue)) {
                searchArgs.push(fltValue);
            } else {
                searchArgs.push(trim(fltValue));
            }
        }
        return searchArgs;
    }

    /**
     * Return the ID of a specified column's filter
     * @param  {Number} index Column's index
     * @return {String}       ID of the filter element
     */
    getFilterId(index) {
        if (!this.fltGrid) {
            return;
        }
        return this.fltIds[index];
    }

    /**
     * Return the list of ids of filters matching a specified type.
     * Note: hidden filters are also returned
     *
     * @param  {String} type  Filter type string ('input', 'select', 'multiple',
     *                        'checklist')
     * @param  {Boolean} bool If true returns columns indexes instead of IDs
     * @return {[type]}       List of element IDs or column indexes
     */
    getFiltersByType(type, bool) {
        if (!this.fltGrid) {
            return;
        }
        let arr = [];
        for (let i = 0, len = this.fltIds.length; i < len; i++) {
            let fltType = this.getFilterType(i);
            if (fltType === type.toLowerCase()) {
                let a = bool ? i : this.fltIds[i];
                arr.push(a);
            }
        }
        return arr;
    }

    /**
     * Return the filter's DOM element for a given column
     * @param  {Number} index     Column's index
     * @return {DOMElement}
     */
    getFilterElement(index) {
        let fltId = this.fltIds[index];
        return elm(fltId);
    }

    /**
     * Return the number of cells for a given row index
     * @param  {Number} rowIndex Index of the row
     * @return {Number}          Number of cells
     */
    getCellsNb(rowIndex = 0) {
        let tr = this.tbl.rows[rowIndex];
        return tr.cells.length;
    }

    /**
     * Return the number of filterable rows starting from reference row if
     * defined
     * @param  {Boolean} includeHeaders Include the headers row
     * @return {Number}                 Number of filterable rows
     */
    getRowsNb(includeHeaders) {
        let s = isUndef(this.refRow) ? 0 : this.refRow;
        let ntrs = this.tbl.rows.length;
        if (includeHeaders) {
            s = 0;
        }
        return parseInt(ntrs - s, 10);
    }

    /**
     * Return the data of a given cell
     * @param  {DOMElement} cell Cell's DOM object
     * @return {String}
     */
    getCellData(cell) {
        let idx = cell.cellIndex;
        //Check for customCellData callback
        if (this.customCellData &&
            this.customCellDataCols.indexOf(idx) !== -1) {
            return this.customCellData.call(null, this, cell, idx);
        } else {
            return getText(cell);
        }
    }

    /**
     * Return the table data with following format:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param  {Boolean} includeHeaders  Optional: include headers row
     * @param  {Boolean} excludeHiddenCols  Optional: exclude hidden columns
     * @return {Array}
     *
     * TODO: provide an API returning data in JSON format
     */
    getTableData(includeHeaders = false, excludeHiddenCols = false) {
        let rows = this.tbl.rows;
        let nbRows = this.getRowsNb(true);
        let tblData = [];
        if (includeHeaders) {
            let headers = this.getHeadersText(excludeHiddenCols);
            tblData.push([this.getHeadersRowIndex(), headers]);
        }
        for (let k = this.refRow; k < nbRows; k++) {
            let rowData = [k, []];
            let cells = rows[k].cells;
            for (let j = 0, len = cells.length; j < len; j++) {
                if (excludeHiddenCols && this.hasExtension('colsVisibility')) {
                    if (this.extension('colsVisibility').isColHidden(j)) {
                        continue;
                    }
                }
                let cellData = this.getCellData(cells[j]);
                rowData[1].push(cellData);
            }
            tblData.push(rowData);
        }
        return tblData;
    }

    /**
     * Return the filtered data with following format:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param  {Boolean} includeHeaders  Optional: include headers row
     * @param  {Boolean} excludeHiddenCols  Optional: exclude hidden columns
     * @return {Array}
     *
     * TODO: provide an API returning data in JSON format
     */
    getFilteredData(includeHeaders = false, excludeHiddenCols = false) {
        if (!this.validRowsIndex) {
            return [];
        }
        let rows = this.tbl.rows,
            filteredData = [];
        if (includeHeaders) {
            let headers = this.getHeadersText(excludeHiddenCols);
            filteredData.push([this.getHeadersRowIndex(), headers]);
        }

        let validRows = this.getValidRows(true);
        for (let i = 0; i < validRows.length; i++) {
            let rData = [this.validRowsIndex[i], []],
                cells = rows[this.validRowsIndex[i]].cells;
            for (let k = 0; k < cells.length; k++) {
                if (excludeHiddenCols && this.hasExtension('colsVisibility')) {
                    if (this.extension('colsVisibility').isColHidden(k)) {
                        continue;
                    }
                }
                let cellData = this.getCellData(cells[k]);
                rData[1].push(cellData);
            }
            filteredData.push(rData);
        }
        return filteredData;
    }

    /**
     * Return the filtered data for a given column index
     * @param  {Number} colIndex Colmun's index
     * @param  {Boolean} includeHeaders  Optional: include headers row
     * @return {Array}           Flat list of values ['val0','val1','val2'...]
     *
     * TODO: provide an API returning data in JSON format
     */
    getFilteredDataCol(colIndex, includeHeaders = false) {
        if (isUndef(colIndex)) {
            return [];
        }
        let data = this.getFilteredData(),
            colData = [];
        if (includeHeaders) {
            colData.push(this.getHeadersText()[colIndex]);
        }
        for (let i = 0, len = data.length; i < len; i++) {
            let r = data[i],
                //cols values of current row
                d = r[1],
                //data of searched column
                c = d[colIndex];
            colData.push(c);
        }
        return colData;
    }

    /**
     * Get the display value of a row
     * @param  {HTMLTableRowElement} row DOM element of the row
     * @return {String}     Usually 'none' or ''
     */
    getRowDisplay(row) {
        return row.style.display;
    }

    /**
     * Validate/invalidate row by setting the 'validRow' attribute on the row
     * @param  {Number}  rowIndex Index of the row
     * @param  {Boolean} isValid
     */
    validateRow(rowIndex, isValid) {
        let row = this.tbl.rows[rowIndex];
        if (!row || typeof isValid !== 'boolean') {
            return;
        }

        // always visible rows are valid
        if (this.hasVisibleRows && this.visibleRows.indexOf(rowIndex) !== -1) {
            isValid = true;
        }

        let displayFlag = isValid ? '' : NONE,
            validFlag = isValid ? 'true' : 'false';
        row.style.display = displayFlag;

        if (this.paging) {
            row.setAttribute('validRow', validFlag);
        }

        if (isValid) {
            if (this.validRowsIndex.indexOf(rowIndex) === -1) {
                this.validRowsIndex.push(rowIndex);
            }

            if (this.onRowValidated) {
                this.onRowValidated.call(null, this, rowIndex);
            }

            this.emitter.emit('row-validated', this, rowIndex);
        }
    }

    /**
     * Validate all filterable rows
     */
    validateAllRows() {
        if (!this.initialized) {
            return;
        }
        this.validRowsIndex = [];
        for (let k = this.refRow; k < this.nbFilterableRows; k++) {
            this.validateRow(k, true);
        }
    }

    /**
     * Set search value to a given filter
     * @param {Number} index     Column's index
     * @param {String or Array} query  searcharg Search term
     */
    setFilterValue(index, query = '') {
        if (!this.fltGrid) {
            return;
        }
        let slc = this.getFilterElement(index),
            fltColType = this.getFilterType(index);

        if (fltColType !== MULTIPLE && fltColType !== CHECKLIST) {
            if (this.loadFltOnDemand && !this.initialized) {
                this.emitter.emit('build-select-filter', this, index,
                    this.linkedFilters, this.isExternalFlt);
            }
            slc.value = query;
        }
        //multiple selects
        else if (fltColType === MULTIPLE) {
            let values = isArray(query) ? query :
                query.split(' ' + this.orOperator + ' ');

            if (this.loadFltOnDemand && !this.initialized) {
                this.emitter.emit('build-select-filter', this, index,
                    this.linkedFilters, this.isExternalFlt);
            }

            this.emitter.emit('select-options', this, index, values);
        }
        //checklist
        else if (fltColType === CHECKLIST) {
            let values = [];
            if (this.loadFltOnDemand && !this.initialized) {
                this.emitter.emit('build-checklist-filter', this, index,
                    this.isExternalFlt);
            }
            if (isArray(query)) {
                values = query;
            } else {
                query = matchCase(query, this.caseSensitive);
                values = query.split(' ' + this.orOperator + ' ');
            }

            this.emitter.emit('select-checklist-options', this, index, values);
        }
    }

    /**
     * Set them columns' widths as per configuration
     * @param {Element} tbl DOM element
     */
    setColWidths(tbl) {
        if (!this.hasColWidths) {
            return;
        }
        tbl = tbl || this.tbl;

        let nbCols = this.nbCells;
        let colWidths = this.colWidths;
        let colTags = tag(tbl, 'col');
        let tblHasColTag = colTags.length > 0;
        let frag = !tblHasColTag ? doc.createDocumentFragment() : null;
        for (let k = 0; k < nbCols; k++) {
            let col;
            if (tblHasColTag) {
                col = colTags[k];
            } else {
                col = createElm('col', ['id', this.id + '_col_' + k]);
                frag.appendChild(col);
            }
            col.style.width = colWidths[k];
        }
        if (!tblHasColTag) {
            tbl.insertBefore(frag, tbl.firstChild);
        }
    }

    /**
     * Makes defined rows always visible
     */
    enforceVisibility() {
        if (!this.hasVisibleRows) {
            return;
        }
        let nbRows = this.getRowsNb(true);
        for (let i = 0, len = this.visibleRows.length; i < len; i++) {
            let row = this.visibleRows[i];
            //row index cannot be > nrows
            if (row <= nbRows) {
                this.validateRow(row, true);
            }
        }
    }

    /**
     * Clear all the filters' values
     */
    clearFilters() {
        if (!this.fltGrid) {
            return;
        }

        this.emitter.emit('before-clearing-filters', this);

        if (this.onBeforeReset) {
            this.onBeforeReset.call(null, this, this.getFiltersValue());
        }
        for (let i = 0, len = this.fltIds.length; i < len; i++) {
            this.setFilterValue(i, '');
        }

        this.filter();

        if (this.onAfterReset) {
            this.onAfterReset.call(null, this);
        }
        this.emitter.emit('after-clearing-filters', this);
    }

    /**
     * Clears filtered columns visual indicator (background color)
     */
    clearActiveColumns() {
        for (let i = 0, len = this.getCellsNb(this.headersRow); i < len; i++) {
            removeClass(this.getHeaderElement(i), this.activeColumnsCssClass);
        }
    }

    /**
     * Mark currently filtered column
     * @param  {Number} colIndex Column index
     */
    markActiveColumn(colIndex) {
        let header = this.getHeaderElement(colIndex);
        if (hasClass(header, this.activeColumnsCssClass)) {
            return;
        }
        if (this.onBeforeActiveColumn) {
            this.onBeforeActiveColumn.call(null, this, colIndex);
        }
        addClass(header, this.activeColumnsCssClass);
        if (this.onAfterActiveColumn) {
            this.onAfterActiveColumn.call(null, this, colIndex);
        }
    }

    /**
     * Return the ID of the current active filter
     * @returns {String}
     */
    getActiveFilterId() {
        return this.activeFilterId;
    }

    /**
     * Set the ID of the current active filter
     * @param {String} filterId Element ID
     */
    setActiveFilterId(filterId) {
        this.activeFilterId = filterId;
    }

    /**
     * Return the column index for a given filter ID
     * @param {string} [filterId=''] Filter ID
     * @returns {Number} Column index
     */
    getColumnIndexFromFilterId(filterId = '') {
        let idx = filterId.split('_')[0];
        idx = idx.split(this.prfxFlt)[1];
        return parseInt(idx, 10);
    }

    /**
     * Make specified column's filter active
     * @param colIndex Index of a column
     */
    activateFilter(colIndex) {
        if (isUndef(colIndex)) {
            return;
        }
        this.setActiveFilterId(this.getFilterId(colIndex));
    }

    /**
     * Refresh the filters subject to linking ('select', 'multiple',
     * 'checklist' type)
     */
    linkFilters() {
        if (!this.linkedFilters || !this.activeFilterId) {
            return;
        }
        let slcA1 = this.getFiltersByType(SELECT, true),
            slcA2 = this.getFiltersByType(MULTIPLE, true),
            slcA3 = this.getFiltersByType(CHECKLIST, true),
            slcIndex = slcA1.concat(slcA2);
        slcIndex = slcIndex.concat(slcA3);

        let activeIdx = this.getColumnIndexFromFilterId(this.activeFilterId);

        for (let i = 0, len = slcIndex.length; i < len; i++) {
            let curSlc = elm(this.fltIds[slcIndex[i]]);
            let slcSelectedValue = this.getFilterValue(slcIndex[i]);

            // Welcome to cyclomatic complexity hell :)
            // TODO: simplify/refactor if statement
            if (activeIdx !== slcIndex[i] ||
                (this.paging && slcA1.indexOf(slcIndex[i]) !== -1 &&
                    activeIdx === slcIndex[i]) ||
                (!this.paging && (slcA3.indexOf(slcIndex[i]) !== -1 ||
                    slcA2.indexOf(slcIndex[i]) !== -1)) ||
                slcSelectedValue === this.displayAllText) {

                //1st option needs to be inserted
                if (this.loadFltOnDemand) {
                    let opt0 = createOpt(this.displayAllText, '');
                    curSlc.innerHTML = '';
                    curSlc.appendChild(opt0);
                }

                if (slcA3.indexOf(slcIndex[i]) !== -1) {
                    this.emitter.emit('build-checklist-filter', this,
                        slcIndex[i]);
                } else {
                    this.emitter.emit('build-select-filter', this, slcIndex[i],
                        true);
                }

                this.setFilterValue(slcIndex[i], slcSelectedValue);
            }
        }
    }

    /**
     * Determines if passed filter column implements exact query match
     * @param  {Number}  colIndex [description]
     * @return {Boolean}          [description]
     */
    isExactMatch(colIndex) {
        let fltType = this.getFilterType(colIndex);
        return this.exactMatchByCol[colIndex] || this.exactMatch ||
            fltType !== INPUT;
    }

    /**
     * Check if passed script or stylesheet is already imported
     * @param  {String}  filePath Ressource path
     * @param  {String}  type     Possible values: 'script' or 'link'
     * @return {Boolean}
     */
    isImported(filePath, type = 'script') {
        let imported = false,
            attr = type === 'script' ? 'src' : 'href',
            files = tag(doc, type);
        for (let i = 0, len = files.length; i < len; i++) {
            if (isUndef(files[i][attr])) {
                continue;
            }
            if (files[i][attr].match(filePath)) {
                imported = true;
                break;
            }
        }
        return imported;
    }

    /**
     * Import script or stylesheet
     * @param  {String}   fileId   Ressource ID
     * @param  {String}   filePath Ressource path
     * @param  {Function} callback Callback
     * @param  {String}   type     Possible values: 'script' or 'link'
     */
    import(fileId, filePath, callback, type = 'script') {
        if (this.isImported(filePath, type)) {
            return;
        }
        let o = this,
            isLoaded = false,
            file,
            head = tag(doc, 'head')[0];

        if (type.toLowerCase() === 'link') {
            file = createElm('link',
                ['id', fileId], ['type', 'text/css'],
                ['rel', 'stylesheet'], ['href', filePath]
            );
        } else {
            file = createElm('script',
                ['id', fileId],
                ['type', 'text/javascript'], ['src', filePath]
            );
        }

        //Browser <> IE onload event works only for scripts, not for stylesheets
        file.onload = file.onreadystatechange = () => {
            if (!isLoaded &&
                (!this.readyState || this.readyState === 'loaded' ||
                    this.readyState === 'complete')) {
                isLoaded = true;
                if (typeof callback === 'function') {
                    callback.call(null, o);
                }
            }
        };
        file.onerror = function () {
            throw new Error(`TableFilter could not load: ${filePath}`);
        };
        head.appendChild(file);
    }

    /**
     * Check if table has filters grid
     * @return {Boolean}
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Get list of filter IDs
     * @return {[type]} [description]
     */
    getFiltersId() {
        return this.fltIds || [];
    }

    /**
     * Get filtered (valid) rows indexes
     * @param  {Boolean} reCalc Force calculation of filtered rows list
     * @return {Array}          List of row indexes
     */
    getValidRows(reCalc) {
        if (!reCalc) {
            return this.validRowsIndex;
        }

        let nbRows = this.getRowsNb(true);
        this.validRowsIndex = [];
        for (let k = this.refRow; k < nbRows; k++) {
            let r = this.tbl.rows[k];
            if (!this.paging) {
                if (this.getRowDisplay(r) !== NONE) {
                    this.validRowsIndex.push(r.rowIndex);
                }
            } else {
                if (r.getAttribute('validRow') === 'true' ||
                    r.getAttribute('validRow') === null) {
                    this.validRowsIndex.push(r.rowIndex);
                }
            }
        }
        return this.validRowsIndex;
    }

    /**
     * Get the index of the row containing the filters
     * @return {Number}
     */
    getFiltersRowIndex() {
        return this.filtersRowIndex;
    }

    /**
     * Get the index of the headers row
     * @return {Number}
     */
    getHeadersRowIndex() {
        return this.headersRow;
    }

    /**
     * Get the row index from where the filtering process start (1st filterable
     * row)
     * @return {Number}
     */
    getStartRowIndex() {
        return this.refRow;
    }

    /**
     * Get the index of the last row
     * @return {Number}
     */
    getLastRowIndex() {
        let nbRows = this.getRowsNb(true);
        return (nbRows - 1);
    }

    /**
     * Get the header DOM element for a given column index
     * @param  {Number} colIndex Column index
     * @return {Element}
     */
    getHeaderElement(colIndex) {
        let table = this.gridLayout ? this.Mod.gridLayout.headTbl : this.tbl;
        let tHead = tag(table, 'thead');
        let headersRow = this.headersRow;
        let header;
        for (let i = 0; i < this.nbCells; i++) {
            if (i !== colIndex) {
                continue;
            }
            if (tHead.length === 0) {
                header = table.rows[headersRow].cells[i];
            }
            if (tHead.length === 1) {
                header = tHead[0].rows[headersRow].cells[i];
            }
            break;
        }
        return header;
    }

    /**
     * Return the list of headers' text
     * @param  {Boolean} excludeHiddenCols  Optional: exclude hidden columns
     * @return {Array} list of headers' text
     */
    getHeadersText(excludeHiddenCols = false) {
        let headers = [];
        for (let j = 0; j < this.nbCells; j++) {
            if (excludeHiddenCols && this.hasExtension('colsVisibility')) {
                if (this.extension('colsVisibility').isColHidden(j)) {
                    continue;
                }
            }
            let header = this.getHeaderElement(j);
            let headerText = getFirstTextNode(header);
            headers.push(headerText);
        }
        return headers;
    }

    /**
     * Return the filter type for a specified column
     * @param  {Number} colIndex Column's index
     * @return {String}
     */
    getFilterType(colIndex) {
        let colType = this.cfg['col_' + colIndex];
        return !colType ? INPUT : colType.toLowerCase();
    }

    /**
     * Get the total number of filterable rows
     * @return {Number}
     */
    getFilterableRowsNb() {
        return this.getRowsNb(false);
    }

    /**
     * Return the total number of valid rows
     * @param {Boolean} [reCalc=false] Forces calculation of filtered rows
     * @returns {Number}
     */
    getValidRowsNb(reCalc = false) {
        return this.getValidRows(reCalc).length;
    }

    /**
     * Get the configuration object (literal object)
     * @return {Object}
     */
    config() {
        return this.cfg;
    }
}
