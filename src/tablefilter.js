import {addEvt, cancelEvt, stopEvt, targetEvt, isKeyPressed} from './event';
import {
    addClass, createElm, elm, getText, getFirstTextNode, removeClass, tag
} from './dom';
import {contains, matchCase, rgxEsc, trim, toCamelCase, uuid} from './string';
import {
    isArray, isEmpty, isFn, isNumber, isObj, isString, isUndef, EMPTY_FN,
    isBoolean
} from './types';
import {parse as parseNb} from './number';
import {
    defaultsBool, defaultsStr, defaultsFn,
    defaultsNb, defaultsArr
} from './settings';

import {root} from './root';
import {Emitter} from './emitter';
import {Dropdown} from './modules/dropdown';
import {CheckList} from './modules/checkList';
import {DateType} from './modules/dateType';
import {Help} from './modules/help';
import {State} from './modules/state';
import {GridLayout} from './modules/gridLayout';
import {Loader} from './modules/loader';
import {HighlightKeyword} from './modules/highlightKeywords';
import {PopupFilter} from './modules/popupFilter';
import {MarkActiveColumns} from './modules/markActiveColumns';
import {RowsCounter} from './modules/rowsCounter';
import {StatusBar} from './modules/statusBar';
import {ClearButton} from './modules/clearButton';
import {AlternateRows} from './modules/alternateRows';
import {NoResults} from './modules/noResults';
import {Paging} from './modules/paging';
import {Toolbar} from './modules/toolbar';

import {
    INPUT, SELECT, MULTIPLE, CHECKLIST, NONE,
    ENTER_KEY, TAB_KEY, ESC_KEY, UP_ARROW_KEY, DOWN_ARROW_KEY,
    CELL_TAG, AUTO_FILTER_DELAY, NUMBER, DATE, FORMATTED_NUMBER
} from './const';

let doc = root.document;

const FEATURES = [
    DateType, Help, State, MarkActiveColumns, GridLayout, Loader,
    HighlightKeyword, PopupFilter, RowsCounter, StatusBar, ClearButton,
    AlternateRows, NoResults, Paging, Toolbar
];

/**
 * Makes HTML tables filterable and a bit more :)
 *
 * @export
 * @class TableFilter
 */
export class TableFilter {

    /**
     * Creates an instance of TableFilter
     * requires `table` or `id` arguments, `row` and `configuration` optional
     * @param {HTMLTableElement} table Table DOM element
     * @param {String} id Table id
     * @param {Number} row index indicating the 1st row
     * @param {Object} configuration object
     */
    constructor(...args) {
        /**
         * ID of current instance
         * @type {String}
         * @private
         */
        this.id = null;

        /**
         * Current version
         * @type {String}
         */
        this.version = '{VERSION}';

        /**
         * Current year
         * @type {Number}
         * @private
         */
        this.year = new Date().getFullYear();

        /**
         * HTML Table DOM element
         * @type {DOMElement}
         * @private
         */
        this.tbl = null;

        /**
         * Calculated row's index from which starts filtering once filters
         * are generated
         * @type {Number}
         */
        this.refRow = null;

        /**
         * Index of the headers row
         * @type {Number}
         * @private
         */
        this.headersRow = null;

        /**
         * Configuration object
         * @type {Object}
         * @private
         */
        this.cfg = {};

        /**
         * Number of rows that can be filtered
         * @type {Number}
         * @private
         */
        this.nbFilterableRows = 0;

        /**
         * Number of cells in the reference row
         * @type {Number}
         * @private
         */
        this.nbCells = null;

        /**
         * Has a configuration object
         * @type {Object}
         * @private
         */
        this.hasConfig = false;

        /** @private */
        this.initialized = false;

        let startRow;

        // TODO: use for-of
        args.forEach((arg) => {
            if (typeof arg === 'object' && arg.nodeName === 'TABLE') {
                this.tbl = arg;
                this.id = arg.id || `tf_${uuid()}`;
                this.tbl.id = this.id;
            } else if (isString(arg)) {
                this.id = arg;
                this.tbl = elm(arg);
            } else if (isNumber(arg)) {
                startRow = arg;
            } else if (isObj(arg)) {
                this.cfg = arg;
                this.hasConfig = true;
            }
        });

        if (!this.tbl || this.tbl.nodeName !== 'TABLE') {
            throw new Error(`Could not instantiate TableFilter: HTML table
                DOM element not found.`);
        }

        if (this.getRowsNb(true) === 0) {
            throw new Error(`Could not instantiate TableFilter: HTML table
                requires at least 1 row.`);
        }

        // configuration object
        let f = this.cfg;

        /**
         * Event emitter instance
         * @type {Emitter}
         */
        this.emitter = new Emitter();

        // start row
        this.refRow = isUndef(startRow) ? 2 : (startRow + 1);

        /**
         * Collection of filter type by column
         * @type {Array}
         * @private
         */
        this.filterTypes = [].map.call(
            (this.dom().rows[this.refRow] || this.dom().rows[0]).cells,
            (cell, idx) => {
                let colType = this.cfg[`col_${idx}`];
                return !colType ? INPUT : colType.toLowerCase();
            });

        /**
         * Base path for static assets
         * @type {String}
         */
        this.basePath = defaultsStr(f.base_path, 'tablefilter/');

        /*** filters' grid properties ***/

        /**
         * Enable/disable filters
         * @type {Boolean}
         */
        this.fltGrid = defaultsBool(f.grid, true);

        /**
         * Enable/disable grid layout (fixed headers)
         * @type {Object|Boolean}
         */
        this.gridLayout = isObj(f.grid_layout) || Boolean(f.grid_layout);

        /**
         * Filters row index
         * @type {Number}
         */
        this.filtersRowIndex = defaultsNb(f.filters_row_index, 0);

        /**
         * Headers row index
         * @type {Number}
         */
        this.headersRow = defaultsNb(f.headers_row_index,
            (this.filtersRowIndex === 0 ? 1 : 0));

        /**
         * Define the type of cell containing a filter (td/th)
         * @type {String}
         */
        this.fltCellTag = defaultsStr(f.filters_cell_tag, CELL_TAG);

        /**
         * List of filters IDs
         * @type {Array}
         * @private
         */
        this.fltIds = [];

        /**
         * List of valid rows indexes (rows visible upon filtering)
         * @type {Array}
         * @private
         */
        this.validRowsIndex = [];

        /*** filters' grid appearance ***/
        /**
         * Path for stylesheets
         * @type {String}
         */
        this.stylePath = this.getStylePath();

        /**
         * Main stylesheet path
         * @type {String}
         */
        this.stylesheet = this.getStylesheetPath();

        /**
         * Main stylesheet ID
         * @type {String}
         * @private
         */
        this.stylesheetId = this.id + '_style';

        /**
         * Css class for the filters row
         * @type {String}
         */
        this.fltsRowCssClass = defaultsStr(f.flts_row_css_class, 'fltrow');

        /**
         * Enable/disable icons (paging, reset button)
         * @type {Boolean}
         */
        this.enableIcons = defaultsBool(f.enable_icons, true);

        /**
         * Enable/disable alternating rows
         * @type {Boolean}
         */
        this.alternateRows = Boolean(f.alternate_rows);

        /**
         * Columns widths array
         * @type {Array}
         */
        this.colWidths = defaultsArr(f.col_widths, []);

        /**
         * Default column width when column widths are defined
         */
        this.defaultColWidth = defaultsNb(f.default_col_width, 100);

        /**
         * Css class for a filter element
         * @type {String}
         */
        this.fltCssClass = defaultsStr(f.flt_css_class, 'flt');

        /**
         * Css class for multiple select filters
         * @type {String}
         */
        this.fltMultiCssClass = defaultsStr(f.flt_multi_css_class, 'flt_multi');

        /**
         * Css class for small filter (when submit button is active)
         * @type {String}
         */
        this.fltSmallCssClass = defaultsStr(f.flt_small_css_class, 'flt_s');

        /**
         * Css class for single filter type
         * @type {String}
         */
        this.singleFltCssClass = defaultsStr((f.single_filter || {}).css_class,
            'single_flt');

        /*** filters' grid behaviours ***/

        /**
         * Enable/disable enter key for input type filters
         * @type {Boolean}
         */
        this.enterKey = defaultsBool(f.enter_key, true);

        /**
         * Callback fired before filtering process starts
         * @type {Function}
         */
        this.onBeforeFilter = defaultsFn(f.on_before_filter, EMPTY_FN);

        /**
         * Callback fired after filtering process is completed
         * @type {Function}
         */
        this.onAfterFilter = defaultsFn(f.on_after_filter, EMPTY_FN);

        /**
         * Enable/disable case sensitivity for filtering, default false
         * @type {Boolean}
         */
        this.caseSensitive = Boolean(f.case_sensitive);

        /**
         * Indicate whether exact match filtering is enabled on a per column
         * basis
         * @type {Boolean}
         * @private
         */
        this.hasExactMatchByCol = isArray(f.columns_exact_match);

        /**
         * Exact match filtering per column array
         * @type {Array}
         */
        this.exactMatchByCol = this.hasExactMatchByCol ?
            f.columns_exact_match : [];

        /**
         * Globally enable/disable exact match filtering
         * @type {Boolean}
         */
        this.exactMatch = Boolean(f.exact_match);

        /**
         * Ignore diacritics globally or on a column basis
         * @type {Boolean|Array}
         */
        this.ignoreDiacritics = f.ignore_diacritics;

        /**
         * Enable/disable linked filters filtering mode
         * @type {Boolean}
         */
        this.linkedFilters = Boolean(f.linked_filters);

        /**
         * Enable/disable readonly state for excluded options when
         * linked filters filtering mode is on
         * @type {Boolean}
         */
        this.disableExcludedOptions = Boolean(f.disable_excluded_options);

        /**
         * Active filter ID
         * @type {String}
         * @private
         */
        this.activeFilterId = null;

        /**
         * Determine if there are excluded rows from filtering
         * @type {Boolean}
         * @private
         */
        this.hasExcludedRows = Boolean(isArray(f.exclude_rows) &&
            f.exclude_rows.length > 0);

        /**
         * List of row indexes to be excluded from filtering
         * @type {Array}
         */
        this.excludeRows = defaultsArr(f.exclude_rows, []);

        /**
         * List of containers IDs where external filters will be generated
         * @type {Array}
         */
        this.externalFltIds = defaultsArr(f.external_flt_ids, []);

        /**
         * Callback fired after filters are generated
         * @type {Function}
         */
        this.onFiltersLoaded = defaultsFn(f.on_filters_loaded, EMPTY_FN);

        /**
         * Enable/disable single filter mode
         * @type {Boolean|Object}
         */
        this.singleFlt = isObj(f.single_filter) || Boolean(f.single_filter);

        /**
         * Specify columns to be excluded from single filter search, by default
         * searching in all columns:
         * single_filter: {
         *      exclude_cols: [2, 7]
         * }
         */
        this.singleFltExcludeCols = isObj(f.single_filter) &&
            isArray(f.single_filter.exclude_cols) ?
            f.single_filter.exclude_cols : [];

        /**
         * Callback fired after a row is validated during filtering
         * @type {Function}
         */
        this.onRowValidated = defaultsFn(f.on_row_validated, EMPTY_FN);

        /**
         * Specify which column implements a custom cell parser to retrieve the
         * cell value:
         * cell_parser: {
         *     cols: [0, 2],
         *     parse: function(tf, cell, colIndex) {
         *         // custom cell parser logic here
         *         return cellValue;
         *     }
         * }
         * @type {Object}
         */
        this.cellParser = isObj(f.cell_parser) && isFn(f.cell_parser.parse) &&
            isArray(f.cell_parser.cols) ?
            f.cell_parser : { cols: [], parse: EMPTY_FN };

        /**
         * Global watermark text for input filter type or watermark for each
         * filter if an array is supplied
         * @type {String|Array}
         */
        this.watermark = f.watermark || '';

        /**
         * Indicate whether watermark is on a per column basis
         * @type {Boolean}
         * @private
         */
        this.isWatermarkArray = isArray(this.watermark);

        /**
         * Indicate whether help UI component is disabled
         * @type {Boolean}
         */
        this.help = isUndef(f.help_instructions) ? undefined :
            (isObj(f.help_instructions) || Boolean(f.help_instructions));

        /**
         * Indicate whether pop-up filters UI is enabled
         * @type {Boolean|Object}
         */
        this.popupFilters = isObj(f.popup_filters) || Boolean(f.popup_filters);

        /**
         * Indicate whether filtered (active) columns indicator is enabled
         * @type {Boolean}
         */
        this.markActiveColumns = isObj(f.mark_active_columns) ||
            Boolean(f.mark_active_columns);

        /*** select filter's customisation and behaviours ***/
        /**
         * Text for clear option in drop-down filter types (1st option)
         * @type {String|Array}
         */
        this.clearFilterText = isArray(f.clear_filter_text)
            ? f.clear_filter_text
            : defaultsStr(f.clear_filter_text, 'Clear');

        /**
         * Indicate whether empty option is enabled in drop-down filter types
         * @type {Boolean}
         */
        this.enableEmptyOption = Boolean(f.enable_empty_option);

        /**
         * Text for empty option in drop-down filter types
         * @type {String}
         */
        this.emptyText = defaultsStr(f.empty_text, '(Empty)');

        /**
         * Indicate whether non-empty option is enabled in drop-down filter
         * types
         * @type {Boolean}
         */
        this.enableNonEmptyOption = Boolean(f.enable_non_empty_option);

        /**
         * Text for non-empty option in drop-down filter types
         * @type {String}
         */
        this.nonEmptyText = defaultsStr(f.non_empty_text, '(Non empty)');

        /**
         * Indicate whether drop-down filter types filter the table by default
         * on change event
         * @type {Boolean}
         */
        this.onSlcChange = defaultsBool(f.on_change, true);

        /**
         * Make drop-down filter types options sorted in alpha-numeric manner
         * by default globally or on a column basis
         * @type {Boolean|Array}
         */
        this.sortSlc = isUndef(f.sort_select)
            ? true
            : defaultsArr(f.sort_select, Boolean(f.sort_select));

        /**
         * List of columns implementing filter options sorting in ascending
         * manner based on column data type
         * @type {Array}
         */
        this.sortFilterOptionsAsc = defaultsArr(f.sort_filter_options_asc, []);

        /**
         * List of columns implementing filter options sorting in descending
         * manner based on column data type
         * @type {Array}
         */
        this.sortFilterOptionsDesc =
            defaultsArr(f.sort_filter_options_desc, []);

        /**
         * Indicate whether drop-down filter types are populated on demand at
         * first usage
         * @type {Boolean}
         */
        this.loadFltOnDemand = Boolean(f.load_filters_on_demand);

        /**
         * Indicate whether custom drop-down filter options are implemented
         * @type {Boolean}
         */
        this.hasCustomOptions = isObj(f.custom_options);

        /**
         * Custom options definition of a per column basis, ie:
         *	custom_options: {
         *      cols:[0, 1],
         *      texts: [
         *          ['a0', 'b0', 'c0'],
         *          ['a1', 'b1', 'c1']
         *      ],
         *      values: [
         *          ['a0', 'b0', 'c0'],
         *          ['a1', 'b1', 'c1']
         *      ],
         *      sorts: [false, true]
         *  }
         *
         * @type {Object}
         */
        this.customOptions = f.custom_options;

        /*** Filter operators ***/
        /**
         * Regular expression operator for input filter. Defaults to 'rgx:'
         * @type {String}
         */
        this.rgxOperator = defaultsStr(f.regexp_operator, 'rgx:');

        /**
         * Empty cells operator for input filter. Defaults to '[empty]'
         * @type {String}
         */
        this.emOperator = defaultsStr(f.empty_operator, '[empty]');

        /**
         * Non-empty cells operator for input filter. Defaults to '[nonempty]'
         * @type {String}
         */
        this.nmOperator = defaultsStr(f.nonempty_operator, '[nonempty]');

        /**
         * Logical OR operator for input filter. Defaults to '||'
         * @type {String}
         */
        this.orOperator = defaultsStr(f.or_operator, '||');

        /**
         * Logical AND operator for input filter. Defaults to '&&'
         * @type {String}
         */
        this.anOperator = defaultsStr(f.and_operator, '&&');

        /**
         * Greater than operator for input filter. Defaults to '>'
         * @type {String}
         */
        this.grOperator = defaultsStr(f.greater_operator, '>');

        /**
         * Lower than operator for input filter. Defaults to '<'
         * @type {String}
         */
        this.lwOperator = defaultsStr(f.lower_operator, '<');

        /**
         * Lower than or equal operator for input filter. Defaults to '<='
         * @type {String}
         */
        this.leOperator = defaultsStr(f.lower_equal_operator, '<=');

        /**
         * Greater than or equal operator for input filter. Defaults to '>='
         * @type {String}
         */
        this.geOperator = defaultsStr(f.greater_equal_operator, '>=');

        /**
         * Inequality operator for input filter. Defaults to '!'
         * @type {String}
         */
        this.dfOperator = defaultsStr(f.different_operator, '!');

        /**
         * Like operator for input filter. Defaults to '*'
         * @type {String}
         */
        this.lkOperator = defaultsStr(f.like_operator, '*');

        /**
         * Strict equality operator for input filter. Defaults to '='
         * @type {String}
         */
        this.eqOperator = defaultsStr(f.equal_operator, '=');

        /**
         * Starts with operator for input filter. Defaults to '='
         * @type {String}
         */
        this.stOperator = defaultsStr(f.start_with_operator, '{');

        /**
         * Ends with operator for input filter. Defaults to '='
         * @type {String}
         */
        this.enOperator = defaultsStr(f.end_with_operator, '}');

        // this.curExp = f.cur_exp || '^[¥£€$]';

        /**
         * Stored values separator
         * @type {String}
         */
        this.separator = defaultsStr(f.separator, ',');

        /**
         * Enable rows counter UI component
         * @type {Boolean|Object}
         */
        this.rowsCounter = isObj(f.rows_counter) || Boolean(f.rows_counter);

        /**
         * Enable status bar UI component
         * @type {Boolean|Object}
         */
        this.statusBar = isObj(f.status_bar) || Boolean(f.status_bar);

        /**
         * Enable activity/spinner indicator UI component
         * @type {Boolean|Object}
         */
        this.loader = isObj(f.loader) || Boolean(f.loader);

        /*** validation - reset buttons/links ***/
        /**
         * Enable filters submission button
         * @type {Boolean}
         */
        this.displayBtn = Boolean(f.btn);

        /**
         * Define filters submission button text
         * @type {String}
         */
        this.btnText = defaultsStr(f.btn_text, (!this.enableIcons ? 'Go' : ''));

        /**
         * Css class for filters submission button
         * @type {String}
         */
        this.btnCssClass = defaultsStr(f.btn_css_class,
            (!this.enableIcons ? 'btnflt' : 'btnflt_icon'));

        /**
         * Enable clear button
         * @type {Object|Boolean}
         */
        this.btnReset = isObj(f.btn_reset) || Boolean(f.btn_reset);

        /**
         * Callback fired before filters are cleared
         * @type {Function}
         */
        this.onBeforeReset = defaultsFn(f.on_before_reset, EMPTY_FN);

        /**
         * Callback fired after filters are cleared
         * @type {Function}
         */
        this.onAfterReset = defaultsFn(f.on_after_reset, EMPTY_FN);

        /**
         * Enable paging component
         * @type {Object|Boolean}
         */
        this.paging = isObj(f.paging) || Boolean(f.paging);

        /**
         * Number of hidden rows
         * @type {Number}
         * @private
         */
        this.nbHiddenRows = 0;

        /**
         * Enable auto-filter behaviour, table is filtered when a user
         * stops typing
         * @type {Object|Boolean}
         */
        this.autoFilter = isObj(f.auto_filter) || Boolean(f.auto_filter);

        /**
         * Auto-filter delay in milliseconds
         * @type {Number}
         */
        this.autoFilterDelay = isObj(f.auto_filter) &&
            isNumber(f.auto_filter.delay) ?
            f.auto_filter.delay : AUTO_FILTER_DELAY;

        /**
         * Indicate whether user is typing
         * @type {Boolean}
         * @private
         */
        this.isUserTyping = null;

        /**
         * Auto-filter interval ID
         * @type {String}
         * @private
         */
        this.autoFilterTimer = null;

        /**
         * Enable keyword highlighting behaviour
         * @type {Boolean}
         */
        this.highlightKeywords = Boolean(f.highlight_keywords);

        /**
         * Enable no results message UI component
         * @type {Object|Boolean}
         */
        this.noResults = isObj(f.no_results_message) ||
            Boolean(f.no_results_message);

        /**
         * Enable state persistence
         * @type {Object|Boolean}
         */
        this.state = isObj(f.state) || Boolean(f.state);

        /*** data types ***/

        /**
         * Enable date type module
         * @type {Boolean}
         * @private
         */
        this.dateType = true;

        /**
         * Define default locale, default to 'en' as per Sugar Date module:
         * https://sugarjs.com/docs/#/DateLocales
         * @type {String}
         */
        this.locale = defaultsStr(f.locale, 'en');

        /**
         * Define thousands separator ',' or '.', defaults to ','
         * @type {String}
         */
        this.thousandsSeparator = defaultsStr(f.thousands_separator, ',');

        /**
         * Define decimal separator ',' or '.', defaults to '.'
         * @type {String}
         */
        this.decimalSeparator = defaultsStr(f.decimal_separator, '.');

        /**
         * Define data types on a column basis, possible values 'string',
         * 'number', 'formatted-number', 'date', 'ipaddress' ie:
         * col_types : [
         *  'string', 'date', 'number',
         *  { type: 'formatted-number', decimal: ',', thousands: '.' },
         *  { type: 'date', locale: 'en-gb' },
         *  { type: 'date', format: ['{dd}-{months}-{yyyy|yy}'] }
         * ]
         *
         * Refer to https://sugarjs.com/docs/#/DateParsing for exhaustive
         * information on date parsing formats supported by Sugar Date
         * @type {Array}
         */
        this.colTypes = isArray(f.col_types) ? f.col_types : [];

        /*** ids prefixes ***/
        /**
         * Main prefix
         * @private
         */
        this.prfxTf = 'TF';

        /**
         * Filter's ID prefix (inputs - selects)
         * @private
         */
        this.prfxFlt = 'flt';

        /**
         * Button's ID prefix
         * @private
         */
        this.prfxValButton = 'btn';

        /**
         * Responsive Css class
         * @private
         */
        this.prfxResponsive = 'resp';

        /** @private */
        this.stickyCssClass = 'sticky';

        /*** extensions ***/
        /**
         * List of loaded extensions
         * @type {Array}
         */
        this.extensions = defaultsArr(f.extensions, []);

        /*** themes ***/
        /**
         * Enable default theme
         * @type {Boolean}
         */
        this.enableDefaultTheme = Boolean(f.enable_default_theme);

        /**
         * Determine whether themes are enables
         * @type {Boolean}
         * @private
         */
        this.hasThemes = (this.enableDefaultTheme || isArray(f.themes));

        /**
         * List of themes, ie:
         * themes: [{ name: 'skyblue' }]
         * @type {Array}
         */
        this.themes = defaultsArr(f.themes, []);

        /**
         * Define path to themes assets, defaults to
         * 'tablefilter/style/themes/'. Usage:
         * themes: [{ name: 'skyblue' }]
         * @type {Array}
         */
        this.themesPath = this.getThemesPath();

        /**
         * Enable responsive layout
         * @type {Boolean}
         */
        this.responsive = Boolean(f.responsive);

        /**
         * Enable toolbar component
         * @type {Object|Boolean}
         */
        this.toolbar = isObj(f.toolbar) || Boolean(f.toolbar);

        /**
         * Enable sticky headers
         * @type {Boolean}
         */
        this.stickyHeaders = Boolean(f.sticky_headers);

        /**
         * Features registry
         * @private
         */
        this.Mod = {};

        /**
         * Extensions registry
         * @private
         */
        this.ExtRegistry = {};

        // instantiate features if needed
        this.instantiateFeatures(FEATURES);
    }

    /**
     * Initialise features and layout
     */
    init() {
        if (this.initialized) {
            return;
        }

        // import main stylesheet
        this.import(this.stylesheetId, this.getStylesheetPath(), null, 'link');

        let Mod = this.Mod;
        let inpclass;

        //loads theme
        this.loadThemes();

        //explicitly initialise features in given order
        this.initFeatures([
            DateType,
            Help,
            State,
            MarkActiveColumns,
            GridLayout,
            Loader,
            HighlightKeyword,
            PopupFilter
        ]);

        //filters grid is not generated
        if (!this.fltGrid) {
            this._initNoFilters();
        } else {
            let fltrow = this._insertFiltersRow();

            this.nbCells = this.getCellsNb(this.refRow);
            this.nbFilterableRows = this.getRowsNb();

            let n = this.singleFlt ? 1 : this.nbCells;

            //build filters
            for (let i = 0; i < n; i++) {
                this.emitter.emit('before-filter-init', this, i);

                let fltCell = createElm(this.fltCellTag),
                    col = this.getFilterType(i);

                if (this.singleFlt) {
                    fltCell.colSpan = this.nbCells;
                }
                if (!this.gridLayout) {
                    fltrow.appendChild(fltCell);
                }
                inpclass = (i === n - 1 && this.displayBtn) ?
                    this.fltSmallCssClass : this.fltCssClass;

                //only 1 input for single search
                if (this.singleFlt) {
                    col = INPUT;
                    inpclass = this.singleFltCssClass;
                }

                //drop-down filters
                if (col === SELECT || col === MULTIPLE) {
                    Mod.dropdown = Mod.dropdown || new Dropdown(this);
                    Mod.dropdown.init(i, this.isExternalFlt(), fltCell);
                }
                // checklist
                else if (col === CHECKLIST) {
                    Mod.checkList = Mod.checkList || new CheckList(this);
                    Mod.checkList.init(i, this.isExternalFlt(), fltCell);
                } else {
                    this._buildInputFilter(i, inpclass, fltCell);
                }

                // this adds submit button
                if (i === n - 1 && this.displayBtn) {
                    this._buildSubmitButton(
                        this.isExternalFlt() ?
                            elm(this.externalFltIds[i]) :
                            fltCell
                    );
                }

                this.emitter.emit('after-filter-init', this, i);
            }

            this.emitter.on(['filter-focus'],
                (tf, filter) => this.setActiveFilterId(filter.id));

        }//if this.fltGrid

        /* Features */
        if (this.hasExcludedRows) {
            this.emitter.on(['after-filtering'], () => this.setExcludeRows());
            this.setExcludeRows();
        }

        this.initFeatures([
            RowsCounter,
            StatusBar,
            ClearButton,
            AlternateRows,
            NoResults,
            Paging,
            Toolbar
        ]);

        this.setColWidths();

        //TF css class is added to table
        if (!this.gridLayout) {
            addClass(this.dom(), this.prfxTf);
            if (this.responsive) {
                addClass(this.dom(), this.prfxResponsive);
            }
            if (this.colWidths.length > 0) {
                this.setFixedLayout();
            }
            if (this.stickyHeaders && this.dom().tHead) {
                addClass(this.dom(), this.stickyCssClass);
            }
        }

        /* Load extensions */
        this.initExtensions();

        this.initialized = true;

        this.onFiltersLoaded(this);

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

        if (isKeyPressed(evt, [ENTER_KEY])) {
            this.filter();
            cancelEvt(evt);
            stopEvt(evt);
        } else {
            this.isUserTyping = true;
            root.clearInterval(this.autoFilterTimer);
            this.autoFilterTimer = null;
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
        this.isUserTyping = false;

        function filter() {
            root.clearInterval(this.autoFilterTimer);
            this.autoFilterTimer = null;
            if (!this.isUserTyping) {
                this.filter();
                this.isUserTyping = null;
            }
        }

        if (isKeyPressed(evt,
            [ENTER_KEY, TAB_KEY, ESC_KEY, UP_ARROW_KEY, DOWN_ARROW_KEY])) {
            root.clearInterval(this.autoFilterTimer);
            this.autoFilterTimer = null;
        } else {
            if (this.autoFilterTimer !== null) {
                return;
            }
            this.autoFilterTimer = root.setInterval(
                filter.bind(this),
                this.autoFilterDelay);
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
        // TODO: prevent filters row generation for popup filters too,
        // to reduce and simplify headers row index adjusting across lib modules
        // (GridLayout, PopupFilter etc)
        if (this.gridLayout) {
            return;
        }
        let fltrow;

        let thead = tag(this.dom(), 'thead');
        if (thead.length > 0) {
            fltrow = thead[0].insertRow(this.filtersRowIndex);
        } else {
            fltrow = this.dom().insertRow(this.filtersRowIndex);
        }

        fltrow.className = this.fltsRowCssClass;

        if (this.isExternalFlt()) {
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
        let externalFltTgtId = this.isExternalFlt() ?
            this.externalFltIds[colIndex] : null;
        let inpType = col === INPUT ? 'text' : 'hidden';
        let inp = createElm(INPUT,
            ['id', this.buildFilterId(colIndex)],
            ['type', inpType], ['ct', colIndex]);

        if (inpType !== 'hidden' && this.watermark) {
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
     * @param  {DOMElement} container Container DOM element
     */
    _buildSubmitButton(container) {
        let btn = createElm(INPUT,
            ['type', 'button'],
            ['value', this.btnText]
        );
        btn.className = this.btnCssClass;

        //filter is appended in container element
        container.appendChild(btn);

        addEvt(btn, 'click', () => this.filter());
    }

    /**
     * Conditionally istantiate each feature class in passed collection if
     * required by configuration and add it to the features registry. A feature
     * class meta information contains a `name` field and optional `altName` and
     * `alwaysInstantiate` fields
     * @param {Array} [features=[]]
     * @private
     */
    instantiateFeatures(features = []) {
        features.forEach(featureCls => {
            let Cls = featureCls;

            // assign meta info if not present
            Cls.meta = Cls.meta || {name: null, altName: null};
            Cls.meta.name = toCamelCase(Cls.name);
            let {name, altName, alwaysInstantiate} = Cls.meta;
            let prop = altName || name;

            if (!this.hasConfig || this[prop] === true
                || Boolean(alwaysInstantiate)) {
                this.Mod[name] = this.Mod[name] || new Cls(this);
            }
        });
    }

    /**
     * Initialise each feature class in passed collection.
     * @param {Array} [features=[]]
     * @private
     */
    initFeatures(features = []) {
        features.forEach(featureCls => {
            let {name, altName} = featureCls.meta;
            let prop = altName || name;

            if (this[prop] === true && this.Mod[name]) {
                this.Mod[name].init();
            }
        });
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
        if (exts.length === 0) {
            return;
        }

        // Set config's publicPath dynamically for Webpack...
        __webpack_public_path__ = this.basePath;

        this.emitter.emit('before-loading-extensions', this);

        exts.forEach((ext) => {
            this.loadExtension(ext);
        });
        this.emitter.emit('after-loading-extensions', this);
    }

    /**
     * Load an extension module
     * @param  {Object} ext Extension config object
     */
    loadExtension(ext) {
        if (!ext || !ext.name || this.hasExtension(ext.name)) {
            return;
        }

        let {name, path} = ext;
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
     * Register the passed extension instance with associated name
     * @param {Object} inst Extension instance
     * @param {String} name Name of the extension
     */
    registerExtension(inst, name) {
        this.ExtRegistry[name] = inst;
    }

    /**
     * Destroy all the extensions store in extensions registry
     */
    destroyExtensions() {
        let reg = this.ExtRegistry;

        Object.keys(reg).forEach((key) => {
            reg[key].destroy();
            reg[key] = undefined;
        });
    }

    /**
     * Load themes defined in the configuration object
     */
    loadThemes() {
        if (!this.hasThemes) {
            return;
        }

        let themes = this.themes;
        this.emitter.emit('before-loading-themes', this);

        //Default theme config
        if (this.enableDefaultTheme) {
            let defaultTheme = { name: 'default' };
            this.themes.push(defaultTheme);
        }

        themes.forEach((theme, i) => {
            let {name, path} = theme;
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
        });

        // Enable loader indicator
        this.loader = true;

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

        let emitter = this.emitter;

        if (this.isExternalFlt() && !this.popupFilters) {
            this.removeExternalFlts();
        }

        this.destroyExtensions();

        this.validateAllRows();

        // broadcast destroy event modules and extensions are subscribed to
        emitter.emit('destroy', this);

        if (this.fltGrid && !this.gridLayout) {
            this.dom().deleteRow(this.filtersRowIndex);
        }

        // unsubscribe to events
        if (this.hasExcludedRows) {
            emitter.off(['after-filtering'], () => this.setExcludeRows());
        }

        this.emitter.off(['filter-focus'],
            (tf, filter) => this.setActiveFilterId(filter.id));

        removeClass(this.dom(), this.prfxTf);
        removeClass(this.dom(), this.prfxResponsive);
        if (this.dom().tHead) {
            removeClass(this.dom().tHead, this.stickyCssClass);
        }

        this.nbHiddenRows = 0;
        this.validRowsIndex = [];
        this.fltIds = [];
        this.initialized = false;
    }

    /**
     * Remove all the external column filters
     */
    removeExternalFlts() {
        if (!this.isExternalFlt()) {
            return;
        }
        let ids = this.externalFltIds;
        ids.forEach((id) => {
            let externalFlt = elm(id);
            if (externalFlt) {
                externalFlt.innerHTML = '';
            }
        });
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

        let emitter = this.emitter;

        //fire onbefore callback
        this.onBeforeFilter(this);
        emitter.emit('before-filtering', this);

        let hiddenRows = 0;

        this.validRowsIndex = [];
        // search args
        let searchArgs = this.getFiltersValue();

        let eachRow = this.eachRow();
        eachRow(
            (row, k) => {
                // already filtered rows display re-init
                row.style.display = '';

                let cells = row.cells;
                let nbCells = cells.length;

                let occurence = [],
                    isMatch = true,
                    //only for single filter search
                    isSingleFltMatch = false;

                // this loop retrieves cell data
                for (let j = 0; j < nbCells; j++) {
                    //searched keyword
                    let sA = searchArgs[this.singleFlt ? 0 : j];

                    if (sA === '') {
                        continue;
                    }

                    let cellValue = matchCase(this.getCellValue(cells[j]),
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
                        let cS, s;
                        let found = false;

                        if (isArray(sA)) {
                            s = sA;
                        } else {
                            s = hasMultiOrSA ? sAOrSplit : sAAndSplit;
                        }
                        // isolate search term and check occurence in cell data
                        for (let w = 0, len = s.length; w < len; w++) {
                            cS = trim(s[w]);
                            found = this._match(cS, cellValue, cells[j]);

                            if (found) {
                                emitter.emit('highlight-keyword', this,
                                    cells[j], cS);
                            }
                            if ((hasMultiOrSA && found) ||
                                (hasMultiAndSA && !found)) {
                                break;
                            }
                            if (isArray(sA) && found) {
                                break;
                            }
                        }
                        occurence[j] = found;

                    }
                    //single search parameter
                    else {
                        occurence[j] =
                            this._match(trim(sA), cellValue, cells[j]);
                        if (occurence[j]) {
                            emitter.emit('highlight-keyword', this, cells[j],
                                sA);
                        }
                    }

                    if (!occurence[j]) {
                        isMatch = false;
                    }

                    if (this.singleFlt &&
                        this.singleFltExcludeCols.indexOf(j) === -1 &&
                        occurence[j]) {
                        isSingleFltMatch = true;
                    }

                    emitter.emit('cell-processed', this, j, cells[j]);
                }//for j

                if (isSingleFltMatch) {
                    isMatch = true;
                }

                this.validateRow(k, isMatch);
                if (!isMatch) {
                    hiddenRows++;
                }

                emitter.emit('row-processed', this, k,
                    this.validRowsIndex.length - 1, isMatch);
            },
            // continue condition
            (row) => row.cells.length !== this.nbCells
        );

        this.nbHiddenRows = hiddenRows;

        //fire onafterfilter callback
        this.onAfterFilter(this);

        emitter.emit('after-filtering', this, searchArgs);
    }

    /**
     * Match search term in cell data
     * @param {String} term       Search term
     * @param {String} cellValue  Cell data
     * @param {DOMElement} cell   Current cell
     * @return {Boolean}
     * @private
     */
    _match(term, cellValue, cell) {
        let numData;
        let colIdx = cell.cellIndex;
        let decimal = this.getDecimal(colIdx);
        let reLe = new RegExp(this.leOperator),
            reGe = new RegExp(this.geOperator),
            reL = new RegExp(this.lwOperator),
            reG = new RegExp(this.grOperator),
            reD = new RegExp(this.dfOperator),
            reLk = new RegExp(rgxEsc(this.lkOperator)),
            reEq = new RegExp(this.eqOperator),
            reSt = new RegExp(this.stOperator),
            reEn = new RegExp(this.enOperator),
            // re_an = new RegExp(this.anOperator),
            // re_cr = new RegExp(this.curExp),
            reEm = this.emOperator,
            reNm = this.nmOperator,
            reRe = new RegExp(rgxEsc(this.rgxOperator));

        term = matchCase(term, this.caseSensitive);

        let occurence = false;

        //Search arg operator tests
        let hasLO = reL.test(term),
            hasLE = reLe.test(term),
            hasGR = reG.test(term),
            hasGE = reGe.test(term),
            hasDF = reD.test(term),
            hasEQ = reEq.test(term),
            hasLK = reLk.test(term),
            // hatermN = re_an.test(term),
            hasST = reSt.test(term),
            hasEN = reEn.test(term),
            hasEM = (reEm === term),
            hasNM = (reNm === term),
            hasRE = reRe.test(term);

        // Check for dates or resolve date type
        if (this.hasType(colIdx, [DATE])) {
            let dte1, dte2;

            let dateType = this.Mod.dateType;
            let isValidDate = dateType.isValid.bind(dateType);
            let parseDate = dateType.parse.bind(dateType);
            let locale = dateType.getLocale(colIdx);

            // Search arg dates tests
            let isLDate = hasLO &&
                isValidDate(term.replace(reL, ''), locale);
            let isLEDate = hasLE &&
                isValidDate(term.replace(reLe, ''), locale);
            let isGDate = hasGR &&
                isValidDate(term.replace(reG, ''), locale);
            let isGEDate = hasGE &&
                isValidDate(term.replace(reGe, ''), locale);
            let isDFDate = hasDF &&
                isValidDate(term.replace(reD, ''), locale);
            let isEQDate = hasEQ &&
                isValidDate(term.replace(reEq, ''), locale);

            dte1 = parseDate(cellValue, locale);

            // lower equal date
            if (isLEDate) {
                dte2 = parseDate(term.replace(reLe, ''), locale);
                occurence = dte1 <= dte2;
            }
            // lower date
            else if (isLDate) {
                dte2 = parseDate(term.replace(reL, ''), locale);
                occurence = dte1 < dte2;
            }
            // greater equal date
            else if (isGEDate) {
                dte2 = parseDate(term.replace(reGe, ''), locale);
                occurence = dte1 >= dte2;
            }
            // greater date
            else if (isGDate) {
                dte2 = parseDate(term.replace(reG, ''), locale);
                occurence = dte1 > dte2;
            }
            // different date
            else if (isDFDate) {
                dte2 = parseDate(term.replace(reD, ''), locale);
                occurence = dte1.toString() !== dte2.toString();
            }
            // equal date
            else if (isEQDate) {
                dte2 = parseDate(term.replace(reEq, ''), locale);
                occurence = dte1.toString() === dte2.toString();
            }
            // searched keyword with * operator doesn't have to be a date
            else if (reLk.test(term)) {// like date
                occurence = contains(term.replace(reLk, ''), cellValue,
                    false, this.caseSensitive);
            }
            else if (isValidDate(term)) {
                dte2 = parseDate(term, locale);
                occurence = dte1.toString() === dte2.toString();
            }
            //empty
            else if (hasEM) {
                occurence = !cell.hasChildNodes() || isEmpty(cellValue);
            }
            //non-empty
            else if (hasNM) {
                occurence = cell.hasChildNodes() && !isEmpty(cellValue);
            } else {
                occurence = contains(term, cellValue,
                    this.isExactMatch(colIdx), this.caseSensitive);
            }
        } else {
            // Convert to number anyways to auto-resolve type in case not
            // defined by configuration. Order is important first try to
            // parse formatted number then fallback to Number coercion
            // to avoid false positives with Number
            numData = parseNb(cellValue, decimal) || Number(cellValue);

            // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},
            // rgx:)

            //regexp
            if (hasRE) {
                //in case regexp throws
                try {
                    //operator is removed
                    let srchArg = term.replace(reRe, '');
                    let rgx = new RegExp(srchArg);
                    occurence = rgx.test(cellValue);
                } catch (ex) {
                    occurence = false;
                }
            }
            // lower equal
            else if (hasLE) {
                occurence = numData <= parseNb(
                    term.replace(reLe, ''),
                    decimal
                );
            }
            //greater equal
            else if (hasGE) {
                occurence = numData >= parseNb(
                    term.replace(reGe, ''),
                    decimal
                );
            }
            //lower
            else if (hasLO) {
                occurence = numData < parseNb(
                    term.replace(reL, ''),
                    decimal
                );
            }
            //greater
            else if (hasGR) {
                occurence = numData > parseNb(
                    term.replace(reG, ''),
                    decimal
                );
            }
            //different
            else if (hasDF) {
                occurence = contains(term.replace(reD, ''), cellValue,
                    false, this.caseSensitive) ? false : true;
            }
            //like
            else if (hasLK) {
                occurence = contains(term.replace(reLk, ''), cellValue,
                    false, this.caseSensitive);
            }
            //equal
            else if (hasEQ) {
                occurence = contains(term.replace(reEq, ''), cellValue,
                    true, this.caseSensitive);
            }
            //starts with
            else if (hasST) {
                occurence = cellValue.indexOf(term.replace(reSt, '')) === 0 ?
                    true : false;
            }
            //ends with
            else if (hasEN) {
                let searchArg = term.replace(reEn, '');
                occurence =
                    cellValue.lastIndexOf(searchArg, cellValue.length - 1) ===
                        (cellValue.length - 1) - (searchArg.length - 1) &&
                        cellValue.lastIndexOf(searchArg, cellValue.length - 1)
                        > -1 ? true : false;
            }
            //empty
            else if (hasEM) {
                occurence = !cell.hasChildNodes() || isEmpty(cellValue);
            }
            //non-empty
            else if (hasNM) {
                occurence = cell.hasChildNodes() && !isEmpty(cellValue);
            } else {
                // If numeric type data, perform a strict equality test and
                // fallback to unformatted number string comparison
                if (numData &&
                    this.hasType(colIdx, [NUMBER, FORMATTED_NUMBER]) &&
                    !this.singleFlt) {
                    // parseNb can return 0 for strings which are not
                    // formatted numbers, in that case return the original
                    // string. TODO: handle this in parseNb
                    term = parseNb(term, decimal) || term;
                    occurence = numData === term ||
                        contains(term.toString(), numData.toString(),
                            this.isExactMatch(colIdx), this.caseSensitive);
                } else {
                    // Finally test search term is contained in cell data
                    occurence = contains(
                        term,
                        cellValue,
                        this.isExactMatch(colIdx),
                        this.caseSensitive,
                        this.ignoresDiacritics(colIdx)
                    );
                }
            }

        }//else

        return occurence;
    }

    /**
     * Return the data of a specified column
     * @param {Number} colIndex Column index
     * @param {Boolean} [includeHeaders=false] Include headers row
     * @param {Array} [exclude=[]] List of row indexes to be excluded
     * @return Flat list of data for a column
     */
    getColumnData(colIndex, includeHeaders = false, exclude = []) {
        return this.getColValues(colIndex, includeHeaders, true, exclude);
    }

    /**
     * Return the values of a specified column
     * @param {Number} colIndex Column index
     * @param {Boolean} [includeHeaders=false] Include headers row
     * @param {Array} [exclude=[]] List of row indexes to be excluded
     * @return Flat list of values for a column
     */
    getColumnValues(colIndex, includeHeaders = false, exclude = []) {
        return this.getColValues(colIndex, includeHeaders, false, exclude);
    }

    /**
     * Return the data of a specified column
     * @param  {Number} colIndex Column index
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [typed=false] Return a typed value
     * @param  {Array} [exclude=[]] List of row indexes to be excluded
     * @return {Array}           Flat list of data for a column
     * @private
     */
    getColValues(
        colIndex,
        includeHeaders = false,
        typed = false,
        exclude = []
    ) {
        let colValues = [];
        let getContent = typed ? this.getCellData.bind(this) :
            this.getCellValue.bind(this);

        if (includeHeaders) {
            colValues.push(this.getHeadersText()[colIndex]);
        }

        let eachRow = this.eachRow();
        eachRow((row, i) => {
            // checks if current row index appears in exclude array
            let isExludedRow = exclude.indexOf(i) !== -1;
            let cells = row.cells;

            // checks if row has exact cell # and is not excluded
            if (cells.length === this.nbCells && !isExludedRow) {
                let data = getContent(cells[colIndex]);
                colValues.push(data);
            }
        });
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

        this.fltIds.forEach((id, i) => {
            let fltValue = this.getFilterValue(i);
            if (isArray(fltValue)) {
                searchArgs.push(fltValue);
            } else {
                searchArgs.push(trim(fltValue));
            }
        });
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
        return elm(this.fltIds[index]);
    }

    /**
     * Return the number of cells for a given row index
     * @param  {Number} rowIndex Index of the row
     * @return {Number}          Number of cells
     */
    getCellsNb(rowIndex = 0) {
        let tr = this.dom().rows[rowIndex >= 0 ? rowIndex : 0];
        return tr ? tr.cells.length : 0;
    }

    /**
     * Return the number of working rows starting from reference row if
     * defined
     * @param  {Boolean} includeHeaders Include the headers row(s)
     * @return {Number}                 Number of working rows
     */
    getRowsNb(includeHeaders) {
        let nbRows = this.getWorkingRows().length;
        if (this.dom().tHead) {
            return includeHeaders ?
                nbRows + this.dom().querySelectorAll('thead > tr').length :
                nbRows;
        }
        return includeHeaders ? nbRows : nbRows - this.refRow;
    }

    /**
     * Return the collection of the working rows, that is, the rows belonging
     * to the tbody section(s)
     * @returns {Array}
     */
    getWorkingRows() {
        return doc.querySelectorAll(`table#${this.id} > tbody > tr`);
    }

    /**
     * Return the text content of a given cell
     * @param {DOMElement} Cell's DOM element
     * @return {String}
     */
    getCellValue(cell) {
        let idx = cell.cellIndex;
        let cellParser = this.cellParser;
        // Invoke cellParser for this column if any
        if (cellParser.cols.indexOf(idx) !== -1) {
            return cellParser.parse(this, cell, idx);
        } else {
            return getText(cell);
        }
    }

    /**
     * Return the typed data of a given cell based on the column type definition
     * @param  {DOMElement} cell Cell's DOM element
     * @return {String|Number|Date}
     */
    getCellData(cell) {
        let colIndex = cell.cellIndex;
        let value = this.getCellValue(cell);

        if (this.hasType(colIndex, [FORMATTED_NUMBER])) {
            return parseNb(value, this.getDecimal(colIndex));
        }
        else if (this.hasType(colIndex, [NUMBER])) {
            return Number(value);
        }
        else if (this.hasType(colIndex, [DATE])){
            let dateType = this.Mod.dateType;
            return dateType.parse(value, dateType.getLocale(colIndex));
        }

        return value;
    }

    /**
     * Return the table data based on its columns data type definitions
     * with following structure:
     * [
     *     [rowIndex, [data0, data1...]],
     *     [rowIndex, [data0, data1...]]
     * ]
     * @param {Boolean} [includeHeaders=false] Include headers row
     * @param {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @return {Array}
     */
    getData(includeHeaders = false, excludeHiddenCols = false) {
        return this.getTableData(includeHeaders, excludeHiddenCols, true);
    }

    /**
     * Return the table values with following structure:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param {Boolean} [includeHeaders=false] Include headers row
     * @param {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @return {Array}
     */
    getValues(includeHeaders = false, excludeHiddenCols = false) {
        return this.getTableData(includeHeaders, excludeHiddenCols, false);
    }

    /**
     * Return the table data with following structure:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @param  {Boolean} [typed=false] Return typed value
     * @return {Array}
     * @private
     *
     * TODO: provide an API returning data in JSON format
     */
    getTableData(
        includeHeaders = false,
        excludeHiddenCols = false,
        typed = false
    ) {
        let tblData = [];
        let getContent = typed ? this.getCellData.bind(this) :
            this.getCellValue.bind(this);

        if (includeHeaders) {
            let headers = this.getHeadersText(excludeHiddenCols);
            tblData.push([this.getHeadersRowIndex(), headers]);
        }

        let eachRow = this.eachRow();
        eachRow((row, k) => {
            let rowData = [k, []];
            let cells = row.cells;
            for (let j = 0, len = cells.length; j < len; j++) {
                if (excludeHiddenCols && this.hasExtension('colsVisibility')) {
                    if (this.extension('colsVisibility').isColHidden(j)) {
                        continue;
                    }
                }
                let cellContent = getContent(cells[j]);
                rowData[1].push(cellContent);
            }
            tblData.push(rowData);
        });
        return tblData;
    }

    /**
     * Return the filtered table data based on its columns data type definitions
     * with following structure:
     * [
     *     [rowIndex, [data0, data1...]],
     *     [rowIndex, [data0, data1...]]
     * ]
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @return {Array}
     *
     * TODO: provide an API returning data in JSON format
     */
    getFilteredData(includeHeaders = false, excludeHiddenCols = false) {
        return this.filteredData(includeHeaders, excludeHiddenCols, true);
    }

    /**
     * Return the filtered table values with following structure:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @return {Array}
     *
     * TODO: provide an API returning data in JSON format
     */
    getFilteredValues(includeHeaders = false, excludeHiddenCols = false) {
        return this.filteredData(includeHeaders, excludeHiddenCols, false);
    }

    /**
     * Return the filtered data with following structure:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [excludeHiddenCols=false] Exclude hidden columns
     * @param  {Boolean} [typed=false] Return typed value
     * @return {Array}
     * @private
     *
     * TODO: provide an API returning data in JSON format
     */
    filteredData(
        includeHeaders = false,
        excludeHiddenCols = false,
        typed = false
    ) {
        if (this.validRowsIndex.length === 0) {
            return [];
        }
        let rows = this.dom().rows,
            filteredData = [];
        let getContent = typed ? this.getCellData.bind(this) :
            this.getCellValue.bind(this);

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
                let cellValue = getContent(cells[k]);
                rData[1].push(cellValue);
            }
            filteredData.push(rData);
        }
        return filteredData;
    }

    /**
     * Return the filtered data for a given column index
     * @param {any} colIndex Colmun's index
     * @param {boolean} [includeHeaders=false] Optional Include headers row
     * @param {any} [exclude=[]] Optional List of row indexes to be excluded
     * @return {Array} Flat list of typed values [data0, data1, data2...]
     *
     * TODO: provide an API returning data in JSON format
     */
    getFilteredColumnData(colIndex, includeHeaders = false, exclude = []) {
        return this.getFilteredDataCol(
            colIndex, includeHeaders, true, exclude, false);
    }

    /**
     * Return the filtered and visible data for a given column index
     * @param {any} colIndex Colmun's index
     * @param {boolean} [includeHeaders=false] Optional Include headers row
     * @param {any} [exclude=[]] Optional List of row indexes to be excluded
     * @return {Array} Flat list of typed values [data0, data1, data2...]
     *
     * TODO: provide an API returning data in JSON format
     */
    getVisibleColumnData(colIndex, includeHeaders = false, exclude = []) {
        return this.getFilteredDataCol(
            colIndex, includeHeaders, true, exclude, true);
    }

    /**
     * Return the filtered values for a given column index
     * @param {any} colIndex Colmun's index
     * @param {boolean} [includeHeaders=false] Optional Include headers row
     * @param {any} [exclude=[]] Optional List of row indexes to be excluded
     * @return {Array} Flat list of values ['value0', 'value1', 'value2'...]
     *
     * TODO: provide an API returning data in JSON format
     */
    getFilteredColumnValues(colIndex, includeHeaders = false, exclude = []) {
        return this.getFilteredDataCol(
            colIndex, includeHeaders, false, exclude, false);
    }

    /**
     * Return the filtered and visible values for a given column index
     * @param {any} colIndex Colmun's index
     * @param {boolean} [includeHeaders=false] Optional Include headers row
     * @param {any} [exclude=[]] Optional List of row indexes to be excluded
     * @return {Array} Flat list of values ['value0', 'value1', 'value2'...]
     *
     * TODO: provide an API returning data in JSON format
     */
    getVisibleColumnValues(colIndex, includeHeaders = false, exclude = []) {
        return this.getFilteredDataCol(
            colIndex, includeHeaders, false, exclude, true);
    }

    /**
     * Return the filtered data for a given column index
     * @param  {Number} colIndex Colmun's index
     * @param  {Boolean} [includeHeaders=false] Include headers row
     * @param  {Boolean} [typed=false] Return typed value
     * @param  {Array} [exclude=[]] List of row indexes to be excluded
     * @param  {Boolean} [visible=true] Return only filtered and visible data
     *                           (relevant for paging)
     * @return {Array}           Flat list of values ['val0','val1','val2'...]
     * @private
     *
     * TODO: provide an API returning data in JSON format
     */
    getFilteredDataCol(
        colIndex,
        includeHeaders = false,
        typed = false,
        exclude = [],
        visible = true
    ) {
        if (isUndef(colIndex)) {
            return [];
        }

        let rows = this.dom().rows;
        let getContent = typed ? this.getCellData.bind(this) :
            this.getCellValue.bind(this);

        // ensure valid rows index do not contain excluded rows and row is
        // displayed
        let validRows = this.getValidRows(true).filter((rowIdx) => {
            return exclude.indexOf(rowIdx) === -1 &&
                (visible ?
                    this.getRowDisplay(rows[rowIdx]) !== 'none' :
                    true);
        });

        // convert column value to expected type if necessary
        let validColValues = validRows.map((rowIdx) => {
            return getContent(rows[rowIdx].cells[colIndex]);
        });

        if (includeHeaders) {
            validColValues.unshift(this.getHeadersText()[colIndex]);
        }

        return validColValues;
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
        let row = this.dom().rows[rowIndex];
        if (!row || !isBoolean(isValid)) {
            return;
        }

        // always visible rows are valid
        if (this.excludeRows.indexOf(rowIndex) !== -1) {
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

            this.onRowValidated(this, rowIndex);
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

        if (!slc) {
            return;
        }

        //multiple selects
        if (fltColType === MULTIPLE) {
            let values = isArray(query) ? query :
                query.split(' ' + this.orOperator + ' ');

            if (this.loadFltOnDemand && !this.initialized) {
                this.emitter.emit('build-select-filter', this, index,
                    this.linkedFilters, this.isExternalFlt());
            }

            this.emitter.emit('select-options', this, index, values);
        }
        //checklist
        else if (fltColType === CHECKLIST) {
            let values = [];
            if (this.loadFltOnDemand && !this.initialized) {
                this.emitter.emit('build-checklist-filter', this, index,
                    this.linkedFilters);
            }
            if (isArray(query)) {
                values = query;
            } else {
                query = matchCase(query, this.caseSensitive);
                values = query.split(' ' + this.orOperator + ' ');
            }

            this.emitter.emit('select-checklist-options', this, index, values);
        }
        else {
            if (this.loadFltOnDemand && !this.initialized) {
                this.emitter.emit('build-select-filter', this, index,
                    this.linkedFilters, this.isExternalFlt());
            }
            slc.value = query;
        }
    }

    /**
     * Make passed or default working table element width fixed
     * @param {TableElement} tbl optional table DOM element
     */
    setFixedLayout(tbl = this.dom()) {
        let colWidths = this.colWidths;
        let tableWidth = tbl.clientWidth;

        if (colWidths.length > 0) {
            let defaultWidth = this.defaultColWidth;
            tableWidth = colWidths
                .reduce((x, y) =>
                    parseInt((x || defaultWidth), 10) +
                    parseInt((y || defaultWidth), 10)
                );
        }

        tbl.style.width = `${tableWidth}px`;
        tbl.style.tableLayout = 'fixed';
    }

    /**
     * Set passed or default working table columns' widths with configuration
     * values
     * @param {TableElement} tbl optional table DOM element
     */
    setColWidths(tbl = this.dom()) {
        let colWidths = this.colWidths;
        if (colWidths.length === 0) {
            return;
        }

        let colTags = tag(tbl, 'col');
        let tblHasColTag = colTags.length > 0;
        let frag = !tblHasColTag ? doc.createDocumentFragment() : null;

        this.eachCol((k) => {
            let col;
            if (tblHasColTag) {
                col = colTags[k];
            } else {
                col = createElm('col');
                frag.appendChild(col);
            }
            col.style.width = colWidths[k];
        });

        if (!tblHasColTag) {
            tbl.insertBefore(frag, tbl.firstChild);
        }
    }

    /**
     * Exclude rows from actions
     */
    setExcludeRows() {
        if (!this.hasExcludedRows) {
            return;
        }
        this.excludeRows.forEach((rowIdx) => this.validateRow(rowIdx, true));
    }

    /**
     * Clear all the filters' values
     */
    clearFilters() {
        if (!this.fltGrid) {
            return;
        }

        this.emitter.emit('before-clearing-filters', this);
        this.onBeforeReset(this, this.getFiltersValue());

        for (let i = 0, len = this.fltIds.length; i < len; i++) {
            this.setFilterValue(i, '');
        }

        this.filter();

        this.onAfterReset(this);
        this.emitter.emit('after-clearing-filters', this);
    }

    /**
     * Return the ID of the current active filter
     * @return {String}
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
     * @return {Number} Column index
     */
    getColumnIndexFromFilterId(filterId = '') {
        let idx = filterId.split('_')[0];
        idx = idx.split(this.prfxFlt)[1];
        return parseInt(idx, 10);
    }

    /**
     * Build filter element ID for a given column index
     * @param {any} colIndex
     * @return {String} Filter element ID string
     * @private
     */
    buildFilterId(colIndex) {
        return `${this.prfxFlt}${colIndex}_${this.id}`;
    }

    /**
     * Check if has external filters
     * @returns {Boolean}
     * @private
     */
    isExternalFlt() {
        return this.externalFltIds.length > 0;
    }

    /**
     * Returns styles path
     * @returns {String}
     * @private
     */
    getStylePath() {
        return defaultsStr(this.config.style_path, this.basePath + 'style/');
    }

    /**
     * Returns main stylesheet path
     * @returns {String}
     * @private
     */
    getStylesheetPath() {
        return defaultsStr(this.config.stylesheet,
            this.getStylePath() + 'tablefilter.css');
    }

    /**
     * Returns themes path
     * @returns {String}
     * @private
     */
    getThemesPath() {
        return defaultsStr(this.config.themes_path,
            this.getStylePath() + 'themes/');
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
     * Determine if passed filter column implements exact query match
     * @param  {Number}  colIndex   Column index
     * @return {Boolean}
     */
    isExactMatch(colIndex) {
        let fltType = this.getFilterType(colIndex);
        return this.exactMatchByCol[colIndex] || this.exactMatch ||
            fltType !== INPUT;
    }

    /**
     * Check if passed row is valid
     * @param {Number} rowIndex Row index
     * @return {Boolean}
     */
    isRowValid(rowIndex) {
        return this.getValidRows().indexOf(rowIndex) !== -1;
    }

    /**
     * Check if passed row is visible
     * @param {Number} rowIndex Row index
     * @return {Boolean}
     */
    isRowDisplayed(rowIndex) {
        let row = this.dom().rows[rowIndex];
        return this.getRowDisplay(row) === '';
    }

    /**
     * Check if specified column filter ignores diacritics.
     * Note this is only applicable to input filter types.
     * @param {Number} colIndex    Column index
     * @return {Boolean}
     */
    ignoresDiacritics(colIndex) {
        let ignoreDiac = this.ignoreDiacritics;
        if (isArray(ignoreDiac)) {
            return ignoreDiac[colIndex];
        }
        return Boolean(ignoreDiac);
    }

    /**
     * Return clear all text for specified filter column
     * @param {Number} colIndex    Column index
     * @return {String}
     */
    getClearFilterText(colIndex) {
        let clearText = this.clearFilterText;
        if (isArray(clearText)) {
            return clearText[colIndex];
        }
        return clearText;
    }

    /**
     * Column iterator invoking continue and break condition callbacks if any
     * then calling supplied callback for each item
     * @param {Function} [fn=EMPTY_FN] callback
     * @param {Function} [continueFn=EMPTY_FN] continue condition callback
     * @param {Function} [breakFn=EMPTY_FN] break condition callback
     */
    eachCol(fn = EMPTY_FN, continueFn = EMPTY_FN, breakFn = EMPTY_FN) {
        let len = this.getCellsNb(this.refRow);
        for (let i = 0; i < len; i++) {
            if (continueFn(i) === true) {
                continue;
            }
            if (breakFn(i) === true) {
                break;
            }
            fn(i);
        }
    }

    /**
     * Rows iterator starting from supplied row index or defaulting to reference
     * row index. Closure function accepts a callback function and optional
     * continue and break callbacks.
     * @param {Number} startIdx Row index from which filtering starts
     */
    eachRow(startIdx = this.refRow) {
        return (fn = EMPTY_FN, continueFn = EMPTY_FN, breakFn = EMPTY_FN) => {
            let rows = this.dom().rows;
            let len = this.getRowsNb(true);
            for (let i = startIdx; i < len; i++) {
                if (continueFn(rows[i], i) === true) {
                    continue;
                }
                if (breakFn(rows[i], i) === true) {
                    break;
                }
                fn(rows[i], i);
            }
        };
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
        file.onerror = () => {
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
     * @return {Array} List of filters ids
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

        this.validRowsIndex = [];

        let eachRow = this.eachRow();
        eachRow((row) => {
            if (!this.paging) {
                if (this.getRowDisplay(row) !== NONE) {
                    this.validRowsIndex.push(row.rowIndex);
                }
            } else {
                if (row.getAttribute('validRow') === 'true' ||
                    row.getAttribute('validRow') === null) {
                    this.validRowsIndex.push(row.rowIndex);
                }
            }
        });
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
     * Determine whether the specified column has one of the passed types
     * @param {Number} colIndex Column index
     * @param {Array} [types=[]] List of column types
     * @return {Boolean}
     */
    hasType(colIndex, types = []) {
        if (this.colTypes.length === 0) {
            return false;
        }
        let colType = this.colTypes[colIndex];
        if (isObj(colType)) {
            colType = colType.type;
        }
        return types.indexOf(colType) !== -1;
    }

    /**
     * Get the header DOM element for a given column index
     * @param  {Number} colIndex Column index
     * @return {Element}
     */
    getHeaderElement(colIndex) {
        let table = this.gridLayout ? this.Mod.gridLayout.headTbl : this.dom();
        let tHead = tag(table, 'thead');
        let rowIdx = this.getHeadersRowIndex();
        let header;
        if (tHead.length === 0) {
            header = table.rows[rowIdx].cells[colIndex];
        }
        if (tHead.length === 1) {
            header = tHead[0].rows[rowIdx].cells[colIndex];
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
        this.eachCol(
            (j) => {
                let header = this.getHeaderElement(j);
                let headerText = getFirstTextNode(header);
                headers.push(headerText);
            },
            // continue condition function
            (j) => {
                if (excludeHiddenCols && this.hasExtension('colsVisibility')) {
                    return this.extension('colsVisibility').isColHidden(j);
                }
                return false;
            }
        );
        return headers;
    }

    /**
     * Return the filter type for a specified column
     * @param  {Number} colIndex Column's index
     * @return {String}
     */
    getFilterType(colIndex) {
        return this.filterTypes[colIndex];
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
     * @return {Number}
     */
    getValidRowsNb(reCalc = false) {
        return this.getValidRows(reCalc).length;
    }

    /**
     * Return the working DOM element
     * @return {HTMLTableElement}
     */
    dom() {
        return this.tbl;
    }

    /**
     * Return the decimal separator for supplied column as per column type
     * configuration or global setting
     * @param {Number} colIndex Column index
     * @returns {String} '.' or ','
     */
    getDecimal(colIndex) {
        let decimal = this.decimalSeparator;
        if (this.hasType(colIndex, [FORMATTED_NUMBER])) {
            let colType = this.colTypes[colIndex];
            if (colType.hasOwnProperty('decimal')) {
                decimal = colType.decimal;
            }
        }
        return decimal;
    }

    /**
     * Get the configuration object (literal object)
     * @return {Object}
     */
    config() {
        return this.cfg;
    }
}
