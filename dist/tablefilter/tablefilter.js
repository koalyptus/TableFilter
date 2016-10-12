(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "tf-" + ({}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TableFilter = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _event = __webpack_require__(1);
	
	var _dom = __webpack_require__(3);
	
	var _string = __webpack_require__(5);
	
	var _types = __webpack_require__(4);
	
	var _number = __webpack_require__(6);
	
	var _root = __webpack_require__(2);
	
	var _emitter = __webpack_require__(7);
	
	var _gridLayout = __webpack_require__(8);
	
	var _loader = __webpack_require__(11);
	
	var _highlightKeywords = __webpack_require__(12);
	
	var _popupFilter = __webpack_require__(13);
	
	var _dropdown = __webpack_require__(14);
	
	var _checkList = __webpack_require__(17);
	
	var _rowsCounter = __webpack_require__(18);
	
	var _statusBar = __webpack_require__(19);
	
	var _paging = __webpack_require__(20);
	
	var _clearButton = __webpack_require__(21);
	
	var _help = __webpack_require__(22);
	
	var _alternateRows = __webpack_require__(23);
	
	var _noResults = __webpack_require__(24);
	
	var _state = __webpack_require__(25);
	
	var _dateType = __webpack_require__(29);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var doc = _root.root.document;
	
	/**
	 * Makes HTML tables filterable and a bit more :)
	 *
	 * @export
	 * @class TableFilter
	 */
	
	var TableFilter = exports.TableFilter = function () {
	
	    /**
	     * Creates an instance of TableFilter
	     * requires `table` or `id` arguments, `row` and `configuration` optional
	     * @param {DOMElement} table Table DOM element
	     * @param {String} id Table id
	     * @param {Number} row index indicating the 1st row
	     * @param {Object} configuration object
	     */
	    function TableFilter() {
	        var _this = this;
	
	        _classCallCheck(this, TableFilter);
	
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
	        this.version = '0.3.3';
	
	        /**
	         * Current year
	         * @type {Number}
	         * @private
	         */
	        this.year = new Date().getFullYear();
	
	        /**
	         * HTML Table DOM element
	         * @type {DOMElement}
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
	
	        var startRow = void 0;
	
	        // TODO: use for-of
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        args.forEach(function (arg) {
	            if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.nodeName === 'TABLE') {
	                _this.tbl = arg;
	                _this.id = arg.id || 'tf_' + new Date().getTime() + '_';
	            } else if ((0, _types.isString)(arg)) {
	                _this.id = arg;
	                _this.tbl = (0, _dom.elm)(arg);
	            } else if ((0, _types.isNumber)(arg)) {
	                startRow = arg;
	            } else if ((0, _types.isObj)(arg)) {
	                _this.cfg = arg;
	            }
	        });
	
	        if (!this.tbl || this.tbl.nodeName !== 'TABLE' || this.getRowsNb() === 0) {
	            throw new Error('Could not instantiate TableFilter: HTML table\n                DOM element not found.');
	        }
	
	        // configuration object
	        var f = this.cfg;
	
	        /**
	         * Event emitter instance
	         * @type {Emitter}
	         */
	        this.emitter = new _emitter.Emitter();
	
	        //Start row et cols nb
	        this.refRow = (0, _types.isUndef)(startRow) ? 2 : startRow + 1;
	        try {
	            this.nbCells = this.getCellsNb(this.refRow);
	        } catch (e) {
	            this.nbCells = this.getCellsNb(0);
	        }
	
	        /**
	         * Base path for static assets
	         * @type {String}
	         */
	        this.basePath = f.base_path || 'tablefilter/';
	
	        /*** filters' grid properties ***/
	
	        /**
	         * Enable/disable filters
	         * @type {Boolean}
	         */
	        this.fltGrid = f.grid === false ? false : true;
	
	        /**
	         * Enable/disable grid layout (fixed headers)
	         * @type {Boolean}
	         */
	        this.gridLayout = Boolean(f.grid_layout);
	
	        /**
	         * Filters row index
	         * @type {Number}
	         */
	        this.filtersRowIndex = isNaN(f.filters_row_index) ? 0 : f.filters_row_index;
	
	        /**
	         * Headers row index
	         * @type {Number}
	         */
	        this.headersRow = isNaN(f.headers_row_index) ? this.filtersRowIndex === 0 ? 1 : 0 : f.headers_row_index;
	
	        /**
	         * Define the type of cell containing a filter (td/th)
	         * @type {String}
	         */
	        this.fltCellTag = (0, _types.isString)(f.filters_cell_tag) ? f.filters_cell_tag : _const.CELL_TAG;
	
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
	
	        /**
	         * Toolbar's container DOM element
	         * @type {DOMElement}
	         * @private
	         */
	        this.infDiv = null;
	
	        /**
	         * Left-side inner container DOM element (rows counter in toolbar)
	         * @type {DOMElement}
	         * @private
	         */
	        this.lDiv = null;
	
	        /**
	         * Right-side inner container DOM element (reset button,
	         * page length selector in toolbar)
	         * @type {DOMElement}
	         * @private
	         */
	        this.rDiv = null;
	
	        /**
	         * Middle inner container DOM element (paging elements in toolbar)
	         * @type {DOMElement}
	         * @private
	         */
	        this.mDiv = null;
	
	        /**
	         * Css class for toolbar's container DOM element
	         * @type {String}
	         */
	        this.infDivCssClass = f.inf_div_css_class || 'inf';
	
	        /**
	         * Css class for left-side inner container DOM element
	         * @type {String}
	         */
	        this.lDivCssClass = f.left_div_css_class || 'ldiv';
	
	        /**
	         * Css class for right-side inner container DOM element
	         * @type {String}
	         */
	        this.rDivCssClass = f.right_div_css_class || 'rdiv';
	
	        /**
	         * Css class for middle inner container DOM element
	         * @type {String}
	         */
	        this.mDivCssClass = f.middle_div_css_class || 'mdiv';
	
	        /*** filters' grid appearance ***/
	        /**
	         * Path for stylesheets
	         * @type {String}
	         */
	        this.stylePath = f.style_path || this.basePath + 'style/';
	
	        /**
	         * Main stylesheet path
	         * @type {String}
	         */
	        this.stylesheet = f.stylesheet || this.stylePath + 'tablefilter.css';
	
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
	        this.fltsRowCssClass = f.flts_row_css_class || 'fltrow';
	
	        /**
	         * Enable/disable icons (paging, reset button)
	         * @type {Boolean}
	         */
	        this.enableIcons = f.enable_icons === false ? false : true;
	
	        /**
	         * Enable/disable alternating rows
	         * @type {Boolean}
	         */
	        this.alternateRows = Boolean(f.alternate_rows);
	
	        /**
	         * Indicate whether columns widths are set
	         * @type {Boolean}
	         * @private
	         */
	        this.hasColWidths = (0, _types.isArray)(f.col_widths);
	
	        /**
	         * Columns widths array
	         * @type {Array}
	         */
	        this.colWidths = this.hasColWidths ? f.col_widths : [];
	
	        /**
	         * Css class for a filter element
	         * @type {String}
	         */
	        this.fltCssClass = f.flt_css_class || 'flt';
	
	        /**
	         * Css class for multiple select filters
	         * @type {String}
	         */
	        this.fltMultiCssClass = f.flt_multi_css_class || 'flt_multi';
	
	        /**
	         * Css class for small filter (when submit button is active)
	         * @type {String}
	         */
	        this.fltSmallCssClass = f.flt_small_css_class || 'flt_s';
	
	        /**
	         * Css class for single filter type
	         * @type {String}
	         */
	        this.singleFltCssClass = f.single_flt_css_class || 'single_flt';
	
	        /*** filters' grid behaviours ***/
	
	        /**
	         * Enable/disable enter key for input type filters
	         * @type {Boolean}
	         */
	        this.enterKey = f.enter_key === false ? false : true;
	
	        /**
	         * Callback fired before filtering process starts
	         * @type {Function}
	         */
	        this.onBeforeFilter = (0, _types.isFn)(f.on_before_filter) ? f.on_before_filter : null;
	
	        /**
	         * Callback fired after filtering process is completed
	         * @type {Function}
	         */
	        this.onAfterFilter = (0, _types.isFn)(f.on_after_filter) ? f.on_after_filter : null;
	
	        /**
	         * Enable/disable case sensitivity filtering
	         * @type {Boolean}
	         */
	        this.caseSensitive = Boolean(f.case_sensitive);
	
	        /**
	         * Indicate whether exact match filtering is enabled on a per column
	         * basis
	         * @type {Boolean}
	         * @private
	         */
	        this.hasExactMatchByCol = (0, _types.isArray)(f.columns_exact_match);
	
	        /**
	         * Exact match filtering per column array
	         * @type {Array}
	         */
	        this.exactMatchByCol = this.hasExactMatchByCol ? f.columns_exact_match : [];
	
	        /**
	         * Globally enable/disable exact match filtering
	         * @type {Boolean}
	         */
	        this.exactMatch = Boolean(f.exact_match);
	
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
	         * Enable/disable always visible rows, excluded from filtering
	         * @type {Boolean}
	         */
	        this.hasVisibleRows = Boolean(f.rows_always_visible);
	
	        /**
	         * List of row indexes to be excluded from filtering
	         * @type {Array}
	         */
	        this.visibleRows = this.hasVisibleRows ? f.rows_always_visible : [];
	
	        /**
	         * Enable/disable external filters generation
	         * @type {Boolean}
	         */
	        this.isExternalFlt = Boolean(f.external_flt_grid);
	
	        /**
	         * List of containers IDs where external filters will be generated
	         * @type {Array}
	         */
	        this.externalFltTgtIds = f.external_flt_grid_ids || [];
	
	        /**
	         * Callback fired after filters are generated
	         * @type {Function}
	         */
	        this.onFiltersLoaded = (0, _types.isFn)(f.on_filters_loaded) ? f.on_filters_loaded : null;
	
	        /**
	         * Enable/disable single filter filtering all columns
	         * @type {Boolean}
	         */
	        this.singleSearchFlt = Boolean(f.single_filter);
	
	        /**
	         * Callback fired after a row is validated during filtering
	         * @type {Function}
	         */
	        this.onRowValidated = (0, _types.isFn)(f.on_row_validated) ? f.on_row_validated : null;
	
	        /**
	         * List of columns implementing custom filtering
	         * @type {Array}
	         */
	        this.customCellDataCols = f.custom_cell_data_cols ? f.custom_cell_data_cols : [];
	
	        /**
	         * Delegate function for retrieving cell data with custom logic
	         * @type {Function}
	         */
	        this.customCellData = (0, _types.isFn)(f.custom_cell_data) ? f.custom_cell_data : null;
	
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
	        this.isWatermarkArray = (0, _types.isArray)(this.watermark);
	
	        /**
	         * Toolbar's custom container ID
	         * @type {String}
	         */
	        this.toolBarTgtId = f.toolbar_target_id || null;
	
	        /**
	         * Indicate whether help UI component is disabled
	         * @type {Boolean}
	         */
	        this.help = (0, _types.isUndef)(f.help_instructions) ? undefined : Boolean(f.help_instructions);
	
	        /**
	         * Indicate whether pop-up filters UI is enabled
	         * @type {Boolean}
	         */
	        this.popupFilters = Boolean(f.popup_filters);
	
	        /**
	         * Indicate whether filtered (active) columns indicator is enabled
	         * @type {Boolean}
	         */
	        this.markActiveColumns = Boolean(f.mark_active_columns);
	
	        /**
	         * Css class for filtered (active) columns
	         * @type {String}
	         */
	        this.activeColumnsCssClass = f.active_columns_css_class || 'activeHeader';
	
	        /**
	         * Callback fired before a column is marked as filtered
	         * @type {Function}
	         */
	        this.onBeforeActiveColumn = (0, _types.isFn)(f.on_before_active_column) ? f.on_before_active_column : null;
	
	        /**
	         * Callback fired after a column is marked as filtered
	         * @type {Function}
	         */
	        this.onAfterActiveColumn = (0, _types.isFn)(f.on_after_active_column) ? f.on_after_active_column : null;
	
	        /*** select filter's customisation and behaviours ***/
	        /**
	         * Text for clear option in drop-down filter types (1st option)
	         * @type {String}
	         */
	        this.displayAllText = f.display_all_text || 'Clear';
	
	        /**
	         * Indicate whether empty option is enabled in drop-down filter types
	         * @type {Boolean}
	         */
	        this.enableEmptyOption = Boolean(f.enable_empty_option);
	
	        /**
	         * Text for empty option in drop-down filter types
	         * @type {String}
	         */
	        this.emptyText = f.empty_text || '(Empty)';
	
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
	        this.nonEmptyText = f.non_empty_text || '(Non empty)';
	
	        /**
	         * Indicate whether drop-down filter types filter the table by default
	         * on change event
	         * @type {Boolean}
	         */
	        this.onSlcChange = f.on_change === false ? false : true;
	
	        /**
	         * Indicate whether options in drop-down filter types are sorted in a
	         * alpha-numeric manner by default
	         * @type {Boolean}
	         */
	        this.sortSlc = f.sort_select === false ? false : true;
	
	        /**
	         * Indicate whether options in drop-down filter types are sorted in a
	         * ascending numeric manner
	         * @type {Boolean}
	         * @private
	         */
	        this.isSortNumAsc = Boolean(f.sort_num_asc);
	
	        /**
	         * List of columns implementing options sorting in a ascending numeric
	         * manner
	         * @type {Array}
	         */
	        this.sortNumAsc = this.isSortNumAsc ? f.sort_num_asc : [];
	
	        /**
	         * Indicate whether options in drop-down filter types are sorted in a
	         * descending numeric manner
	         * @type {Boolean}
	         * @private
	         */
	        this.isSortNumDesc = Boolean(f.sort_num_desc);
	
	        /**
	         * List of columns implementing options sorting in a descending numeric
	         * manner
	         * @type {Array}
	         */
	        this.sortNumDesc = this.isSortNumDesc ? f.sort_num_desc : [];
	
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
	        this.hasCustomOptions = (0, _types.isObj)(f.custom_options);
	
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
	        this.rgxOperator = f.regexp_operator || 'rgx:';
	
	        /**
	         * Empty cells operator for input filter. Defaults to '[empty]'
	         * @type {String}
	         */
	        this.emOperator = f.empty_operator || '[empty]';
	
	        /**
	         * Non-empty cells operator for input filter. Defaults to '[nonempty]'
	         * @type {String}
	         */
	        this.nmOperator = f.nonempty_operator || '[nonempty]';
	
	        /**
	         * Logical OR operator for input filter. Defaults to '||'
	         * @type {String}
	         */
	        this.orOperator = f.or_operator || '||';
	
	        /**
	         * Logical AND operator for input filter. Defaults to '&&'
	         * @type {String}
	         */
	        this.anOperator = f.and_operator || '&&';
	
	        /**
	         * Greater than operator for input filter. Defaults to '>'
	         * @type {String}
	         */
	        this.grOperator = f.greater_operator || '>';
	
	        /**
	         * Lower than operator for input filter. Defaults to '<'
	         * @type {String}
	         */
	        this.lwOperator = f.lower_operator || '<';
	
	        /**
	         * Lower than or equal operator for input filter. Defaults to '<='
	         * @type {String}
	         */
	        this.leOperator = f.lower_equal_operator || '<=';
	
	        /**
	         * Greater than or equal operator for input filter. Defaults to '>='
	         * @type {String}
	         */
	        this.geOperator = f.greater_equal_operator || '>=';
	
	        /**
	         * Inequality operator for input filter. Defaults to '!'
	         * @type {String}
	         */
	        this.dfOperator = f.different_operator || '!';
	
	        /**
	         * Like operator for input filter. Defaults to '!'
	         * @type {String}
	         */
	        this.lkOperator = f.like_operator || '*';
	
	        /**
	         * Strict equality operator for input filter. Defaults to '='
	         * @type {String}
	         */
	        this.eqOperator = f.equal_operator || '=';
	
	        /**
	         * Starts with operator for input filter. Defaults to '='
	         * @type {String}
	         */
	        this.stOperator = f.start_with_operator || '{';
	
	        /**
	         * Ends with operator for input filter. Defaults to '='
	         * @type {String}
	         */
	        this.enOperator = f.end_with_operator || '}';
	
	        // this.curExp = f.cur_exp || '^[¥£€$]';
	
	        /**
	         * Stored values separator
	         * @type {String}
	         */
	        this.separator = f.separator || ',';
	
	        /**
	         * Enable rows counter UI component
	         * @type {Boolean}
	         */
	        this.rowsCounter = Boolean(f.rows_counter);
	
	        /**
	         * Enable status bar UI component
	         * @type {Boolean}
	         */
	        this.statusBar = Boolean(f.status_bar);
	
	        /**
	         * Enable activity/spinner indicator UI component
	         * @type {Boolean}
	         */
	        this.loader = Boolean(f.loader);
	
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
	        this.btnText = f.btn_text || (!this.enableIcons ? 'Go' : '');
	
	        /**
	         * Css class for filters submission button
	         * @type {String}
	         */
	        this.btnCssClass = f.btn_css_class || (!this.enableIcons ? 'btnflt' : 'btnflt_icon');
	
	        /**
	         * Enable clear button
	         * @type {Boolean}
	         */
	        this.btnReset = Boolean(f.btn_reset);
	
	        /**
	         * Callback fired before filters are cleared
	         * @type {Function}
	         */
	        this.onBeforeReset = (0, _types.isFn)(f.on_before_reset) ? f.on_before_reset : null;
	
	        /**
	         * Callback fired after filters are cleared
	         * @type {Function}
	         */
	        this.onAfterReset = (0, _types.isFn)(f.on_after_reset) ? f.on_after_reset : null;
	
	        /**
	         * Enable paging component
	         * @type {Boolean}
	         */
	        this.paging = Boolean(f.paging);
	
	        /**
	         * Number of hidden rows
	         * @type {Number}
	         * @private
	         */
	        this.nbHiddenRows = 0;
	
	        /**
	         * Enable auto-filter behaviour, table is filtered when a user
	         * stops typing
	         * @type {Boolean}
	         */
	        this.autoFilter = Boolean(f.auto_filter);
	
	        /**
	         * Auto-filter delay in msecs
	         * @type {Number}
	         */
	        this.autoFilterDelay = !isNaN(f.auto_filter_delay) ? f.auto_filter_delay : _const.AUTO_FILTER_DELAY;
	
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
	         * @type {Boolean}
	         */
	        this.noResults = (0, _types.isObj)(f.no_results_message) || Boolean(f.no_results_message);
	
	        /**
	         * Enable state persistence
	         * @type {Boolean}
	         */
	        this.state = (0, _types.isObj)(f.state) || Boolean(f.state);
	
	        /*** data types ***/
	
	        /**
	         * Define default locale, default to 'en' as per Sugar Date module:
	         * https://sugarjs.com/docs/#/DateLocales
	         * @type {String}
	         */
	        this.locale = f.locale || 'en';
	
	        /**
	         * Define thousands separator ',' or '.', defaults to ','
	         * @type {String}
	         */
	        this.thousandsSeparator = f.thousands_separator || ',';
	
	        /**
	         * Define decimal separator ',' or '.', defaults to '.'
	         * @type {String}
	         */
	        this.decimalSeparator = f.decimal_separator || '.';
	
	        /**
	         * Determine whether table has columns data types
	         * @type {Boolean}
	         * @private
	         */
	        this.hasColTypes = (0, _types.isArray)(f.col_types);
	
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
	        this.colTypes = this.hasColTypes ? f.col_types : [];
	
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
	         * Toolbar container ID prefix
	         * @private
	         */
	        this.prfxInfDiv = 'inf_';
	
	        /**
	         * Toolbar left element ID prefix
	         * @private
	         */
	        this.prfxLDiv = 'ldiv_';
	
	        /**
	         * Toolbar right element ID prefix
	         * @private
	         */
	        this.prfxRDiv = 'rdiv_';
	
	        /**
	         * Toolbar middle element ID prefix
	         * @private
	         */
	        this.prfxMDiv = 'mdiv_';
	
	        /**
	         * Responsive Css class
	         * @private
	         */
	        this.prfxResponsive = 'resp';
	
	        /*** extensions ***/
	        /**
	         * List of loaded extensions
	         * @type {Array}
	         * @private
	         */
	        this.extensions = f.extensions;
	
	        /**
	         * Determine whether extensions are loaded
	         * @type {Boolean}
	         * @private
	         */
	        this.hasExtensions = (0, _types.isArray)(this.extensions);
	
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
	        this.hasThemes = this.enableDefaultTheme || (0, _types.isArray)(f.themes);
	
	        /**
	         * List of themes, ie:
	         * themes: [{ name: 'skyblue' }]
	         * @type {Array}
	         */
	        this.themes = f.themes || [];
	
	        /**
	         * Define path to themes assets, defaults to
	         * 'tablefilter/style/themes/'. Usage:
	         * themes: [{ name: 'skyblue' }]
	         * @type {Array}
	         */
	        this.themesPath = f.themes_path || this.stylePath + 'themes/';
	
	        /**
	         * Enable responsive layout
	         * @type {Boolean}
	         */
	        this.responsive = Boolean(f.responsive);
	
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
	    }
	
	    /**
	     * Initialise features and layout
	     */
	
	
	    TableFilter.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var Mod = this.Mod;
	        var n = this.singleSearchFlt ? 1 : this.nbCells;
	        var inpclass = void 0;
	
	        //loads stylesheet if not imported
	        this.import(this.stylesheetId, this.stylesheet, null, 'link');
	
	        //loads theme
	        if (this.hasThemes) {
	            this.loadThemes();
	        }
	
	        // Instanciate sugar date wrapper
	        if (!Mod.dateType) {
	            Mod.dateType = new _dateType.DateType(this);
	        }
	        Mod.dateType.init();
	
	        // Instantiate help feature and initialise only if set true
	        if (!Mod.help) {
	            Mod.help = new _help.Help(this);
	        }
	        if (this.help) {
	            Mod.help.init();
	        }
	
	        if (this.state) {
	            if (!Mod.state) {
	                Mod.state = new _state.State(this);
	            }
	            Mod.state.init();
	        }
	
	        if (this.gridLayout) {
	            if (!Mod.gridLayout) {
	                Mod.gridLayout = new _gridLayout.GridLayout(this);
	            }
	            Mod.gridLayout.init();
	        }
	
	        if (this.loader) {
	            if (!Mod.loader) {
	                Mod.loader = new _loader.Loader(this);
	            }
	            Mod.loader.init();
	        }
	
	        if (this.highlightKeywords) {
	            Mod.highlightKeyword = new _highlightKeywords.HighlightKeyword(this);
	            Mod.highlightKeyword.init();
	        }
	
	        if (this.popupFilters) {
	            if (!Mod.popupFilter) {
	                Mod.popupFilter = new _popupFilter.PopupFilter(this);
	            }
	            Mod.popupFilter.init();
	        }
	
	        //filters grid is not generated
	        if (!this.fltGrid) {
	            this._initNoFilters();
	        } else {
	            var fltrow = this._insertFiltersRow();
	
	            this.nbFilterableRows = this.getRowsNb();
	
	            // Generate filters
	            for (var i = 0; i < n; i++) {
	                this.emitter.emit('before-filter-init', this, i);
	
	                var fltcell = (0, _dom.createElm)(this.fltCellTag),
	                    col = this.getFilterType(i);
	
	                if (this.singleSearchFlt) {
	                    fltcell.colSpan = this.nbCells;
	                }
	                if (!this.gridLayout) {
	                    fltrow.appendChild(fltcell);
	                }
	                inpclass = i === n - 1 && this.displayBtn ? this.fltSmallCssClass : this.fltCssClass;
	
	                //only 1 input for single search
	                if (this.singleSearchFlt) {
	                    col = _const.INPUT;
	                    inpclass = this.singleFltCssClass;
	                }
	
	                //drop-down filters
	                if (col === _const.SELECT || col === _const.MULTIPLE) {
	                    if (!Mod.dropdown) {
	                        Mod.dropdown = new _dropdown.Dropdown(this);
	                    }
	                    Mod.dropdown.init(i, this.isExternalFlt, fltcell);
	                }
	                // checklist
	                else if (col === _const.CHECKLIST) {
	                        if (!Mod.checkList) {
	                            Mod.checkList = new _checkList.CheckList(this);
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
	
	            this.emitter.on(['filter-focus'], function (tf, filter) {
	                return _this2.setActiveFilterId(filter.id);
	            });
	        } //if this.fltGrid
	
	        /* Features */
	        if (this.hasVisibleRows) {
	            this.emitter.on(['after-filtering'], function () {
	                return _this2.enforceVisibility();
	            });
	            this.enforceVisibility();
	        }
	        if (this.rowsCounter) {
	            Mod.rowsCounter = new _rowsCounter.RowsCounter(this);
	            Mod.rowsCounter.init();
	        }
	        if (this.statusBar) {
	            Mod.statusBar = new _statusBar.StatusBar(this);
	            Mod.statusBar.init();
	        }
	        if (this.paging) {
	            if (!Mod.paging) {
	                Mod.paging = new _paging.Paging(this);
	                Mod.paging.init();
	            } else {
	                Mod.paging.reset();
	            }
	        }
	        if (this.btnReset) {
	            Mod.clearButton = new _clearButton.ClearButton(this);
	            Mod.clearButton.init();
	        }
	
	        if (this.hasColWidths && !this.gridLayout) {
	            this.setColWidths();
	        }
	        if (this.alternateRows) {
	            Mod.alternateRows = new _alternateRows.AlternateRows(this);
	            Mod.alternateRows.init();
	        }
	        if (this.noResults) {
	            if (!Mod.noResults) {
	                Mod.noResults = new _noResults.NoResults(this);
	            }
	            Mod.noResults.init();
	        }
	
	        //TF css class is added to table
	        if (!this.gridLayout) {
	            (0, _dom.addClass)(this.tbl, this.prfxTf);
	            if (this.responsive) {
	                (0, _dom.addClass)(this.tbl, this.prfxResponsive);
	            }
	        }
	
	        /* Loads extensions */
	        if (this.hasExtensions) {
	            this.initExtensions();
	        }
	
	        // Subscribe to events
	        if (this.markActiveColumns) {
	            this.emitter.on(['before-filtering'], function () {
	                return _this2.clearActiveColumns();
	            });
	            this.emitter.on(['cell-processed'], function (tf, colIndex) {
	                return _this2.markActiveColumn(colIndex);
	            });
	        }
	        if (this.linkedFilters) {
	            this.emitter.on(['after-filtering'], function () {
	                return _this2.linkFilters();
	            });
	        }
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	
	        if (this.onFiltersLoaded) {
	            this.onFiltersLoaded.call(null, this);
	        }
	        this.emitter.emit('initialized', this);
	    };
	
	    /**
	     * Detect <enter> key
	     * @param {Event} evt
	     */
	
	
	    TableFilter.prototype.detectKey = function detectKey(evt) {
	        if (!this.enterKey) {
	            return;
	        }
	        if (evt) {
	            var key = (0, _event.keyCode)(evt);
	            if (key === _const.ENTER_KEY) {
	                this.filter();
	                (0, _event.cancelEvt)(evt);
	                (0, _event.stopEvt)(evt);
	            } else {
	                this.isUserTyping = true;
	                _root.root.clearInterval(this.autoFilterTimer);
	                this.autoFilterTimer = null;
	            }
	        }
	    };
	
	    /**
	     * Filter's keyup event: if auto-filter on, detect user is typing and filter
	     * columns
	     * @param {Event} evt
	     */
	
	
	    TableFilter.prototype.onKeyUp = function onKeyUp(evt) {
	        if (!this.autoFilter) {
	            return;
	        }
	        var key = (0, _event.keyCode)(evt);
	        this.isUserTyping = false;
	
	        function filter() {
	            _root.root.clearInterval(this.autoFilterTimer);
	            this.autoFilterTimer = null;
	            if (!this.isUserTyping) {
	                this.filter();
	                this.isUserTyping = null;
	            }
	        }
	
	        if (key !== _const.ENTER_KEY && key !== _const.TAB_KEY && key !== _const.ESC_KEY && key !== _const.UP_ARROW_KEY && key !== _const.DOWN_ARROW_KEY) {
	            if (this.autoFilterTimer === null) {
	                this.autoFilterTimer = _root.root.setInterval(filter.bind(this), this.autoFilterDelay);
	            }
	        } else {
	            _root.root.clearInterval(this.autoFilterTimer);
	            this.autoFilterTimer = null;
	        }
	    };
	
	    /**
	     * Filter's keydown event: if auto-filter on, detect user is typing
	     */
	
	
	    TableFilter.prototype.onKeyDown = function onKeyDown() {
	        if (this.autoFilter) {
	            this.isUserTyping = true;
	        }
	    };
	
	    /**
	     * Filter's focus event
	     * @param {Event} evt
	     */
	
	
	    TableFilter.prototype.onInpFocus = function onInpFocus(evt) {
	        var elm = (0, _event.targetEvt)(evt);
	        this.emitter.emit('filter-focus', this, elm);
	    };
	
	    /**
	     * Filter's blur event: if auto-filter on, clear interval on filter blur
	     */
	
	
	    TableFilter.prototype.onInpBlur = function onInpBlur() {
	        if (this.autoFilter) {
	            this.isUserTyping = false;
	            _root.root.clearInterval(this.autoFilterTimer);
	        }
	        this.emitter.emit('filter-blur', this);
	    };
	
	    /**
	     * Insert filters row at initialization
	     */
	
	
	    TableFilter.prototype._insertFiltersRow = function _insertFiltersRow() {
	        // TODO: prevent filters row generation for popup filters too,
	        // to reduce and simplify headers row index adjusting across lib modules
	        // (GridLayout, PopupFilter etc)
	        if (this.gridLayout) {
	            return;
	        }
	        var fltrow = void 0;
	
	        var thead = (0, _dom.tag)(this.tbl, 'thead');
	        if (thead.length > 0) {
	            fltrow = thead[0].insertRow(this.filtersRowIndex);
	        } else {
	            fltrow = this.tbl.insertRow(this.filtersRowIndex);
	        }
	
	        fltrow.className = this.fltsRowCssClass;
	
	        if (this.isExternalFlt) {
	            fltrow.style.display = _const.NONE;
	        }
	
	        this.emitter.emit('filters-row-inserted', this, fltrow);
	        return fltrow;
	    };
	
	    /**
	     * Initialize filtersless table
	     */
	
	
	    TableFilter.prototype._initNoFilters = function _initNoFilters() {
	        if (this.fltGrid) {
	            return;
	        }
	        this.refRow = this.refRow > 0 ? this.refRow - 1 : 0;
	        this.nbFilterableRows = this.getRowsNb();
	    };
	
	    /**
	     * Build input filter type
	     * @param  {Number} colIndex      Column index
	     * @param  {String} cssClass      Css class applied to filter
	     * @param  {DOMElement} container Container DOM element
	     */
	
	
	    TableFilter.prototype._buildInputFilter = function _buildInputFilter(colIndex, cssClass, container) {
	        var _this3 = this;
	
	        var col = this.getFilterType(colIndex);
	        var externalFltTgtId = this.isExternalFlt ? this.externalFltTgtIds[colIndex] : null;
	        var inptype = col === _const.INPUT ? 'text' : 'hidden';
	        var inp = (0, _dom.createElm)(_const.INPUT, ['id', this.prfxFlt + colIndex + '_' + this.id], ['type', inptype], ['ct', colIndex]);
	
	        if (inptype !== 'hidden' && this.watermark) {
	            inp.setAttribute('placeholder', this.isWatermarkArray ? this.watermark[colIndex] || '' : this.watermark);
	        }
	        inp.className = cssClass || this.fltCssClass;
	        (0, _event.addEvt)(inp, 'focus', function (evt) {
	            return _this3.onInpFocus(evt);
	        });
	
	        //filter is appended in custom element
	        if (externalFltTgtId) {
	            (0, _dom.elm)(externalFltTgtId).appendChild(inp);
	        } else {
	            container.appendChild(inp);
	        }
	
	        this.fltIds.push(inp.id);
	
	        (0, _event.addEvt)(inp, 'keypress', function (evt) {
	            return _this3.detectKey(evt);
	        });
	        (0, _event.addEvt)(inp, 'keydown', function () {
	            return _this3.onKeyDown();
	        });
	        (0, _event.addEvt)(inp, 'keyup', function (evt) {
	            return _this3.onKeyUp(evt);
	        });
	        (0, _event.addEvt)(inp, 'blur', function () {
	            return _this3.onInpBlur();
	        });
	    };
	
	    /**
	     * Build submit button
	     * @param  {Number} colIndex      Column index
	     * @param  {DOMElement} container Container DOM element
	     */
	
	
	    TableFilter.prototype._buildSubmitButton = function _buildSubmitButton(colIndex, container) {
	        var _this4 = this;
	
	        var externalFltTgtId = this.isExternalFlt ? this.externalFltTgtIds[colIndex] : null;
	        var btn = (0, _dom.createElm)(_const.INPUT, ['id', this.prfxValButton + colIndex + '_' + this.id], ['type', 'button'], ['value', this.btnText]);
	        btn.className = this.btnCssClass;
	
	        //filter is appended in custom element
	        if (externalFltTgtId) {
	            (0, _dom.elm)(externalFltTgtId).appendChild(btn);
	        } else {
	            container.appendChild(btn);
	        }
	
	        (0, _event.addEvt)(btn, 'click', function () {
	            return _this4.filter();
	        });
	    };
	
	    /**
	     * Return a feature instance for a given name
	     * @param  {String} name Name of the feature
	     * @return {Object}
	     */
	
	
	    TableFilter.prototype.feature = function feature(name) {
	        return this.Mod[name];
	    };
	
	    /**
	     * Initialise all the extensions defined in the configuration object
	     */
	
	
	    TableFilter.prototype.initExtensions = function initExtensions() {
	        var exts = this.extensions;
	        // Set config's publicPath dynamically for Webpack...
	        __webpack_require__.p = this.basePath;
	
	        this.emitter.emit('before-loading-extensions', this);
	        for (var i = 0, len = exts.length; i < len; i++) {
	            var ext = exts[i];
	            if (!this.ExtRegistry[ext.name]) {
	                this.loadExtension(ext);
	            }
	        }
	        this.emitter.emit('after-loading-extensions', this);
	    };
	
	    /**
	     * Load an extension module
	     * @param  {Object} ext Extension config object
	     */
	
	
	    TableFilter.prototype.loadExtension = function loadExtension(ext) {
	        var _this5 = this;
	
	        if (!ext || !ext.name) {
	            return;
	        }
	
	        var name = ext.name;
	        var path = ext.path;
	        var modulePath = void 0;
	
	        if (name && path) {
	            modulePath = ext.path + name;
	        } else {
	            name = name.replace('.js', '');
	            modulePath = 'extensions/{}/{}'.replace(/{}/g, name);
	        }
	
	        // Require pattern for Webpack
	        __webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(434)("./" + modulePath)]; (function (mod) {
	            /* eslint-disable */
	            var inst = new mod.default(_this5, ext);
	            /* eslint-enable */
	            inst.init();
	            _this5.ExtRegistry[name] = inst;
	        }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	    };
	
	    /**
	     * Get an extension instance
	     * @param  {String} name Name of the extension
	     * @return {Object}      Extension instance
	     */
	
	
	    TableFilter.prototype.extension = function extension(name) {
	        return this.ExtRegistry[name];
	    };
	
	    /**
	     * Check passed extension name exists
	     * @param  {String}  name Name of the extension
	     * @return {Boolean}
	     */
	
	
	    TableFilter.prototype.hasExtension = function hasExtension(name) {
	        return !(0, _types.isEmpty)(this.ExtRegistry[name]);
	    };
	
	    /**
	     * Destroy all the extensions defined in the configuration object
	     */
	
	
	    TableFilter.prototype.destroyExtensions = function destroyExtensions() {
	        var exts = this.extensions;
	
	        for (var i = 0, len = exts.length; i < len; i++) {
	            var ext = exts[i];
	            var extInstance = this.ExtRegistry[ext.name];
	            if (extInstance) {
	                extInstance.destroy();
	                this.ExtRegistry[ext.name] = undefined;
	            }
	        }
	    };
	
	    /**
	     * Load themes defined in the configuration object
	     */
	
	
	    TableFilter.prototype.loadThemes = function loadThemes() {
	        var themes = this.themes;
	        this.emitter.emit('before-loading-themes', this);
	
	        //Default theme config
	        if (this.enableDefaultTheme) {
	            var defaultTheme = { name: 'default' };
	            this.themes.push(defaultTheme);
	        }
	        if ((0, _types.isArray)(themes)) {
	            for (var i = 0, len = themes.length; i < len; i++) {
	                var theme = themes[i];
	                var name = theme.name;
	                var path = theme.path;
	                var styleId = this.prfxTf + name;
	                if (name && !path) {
	                    path = this.themesPath + name + '/' + name + '.css';
	                } else if (!name && theme.path) {
	                    name = 'theme{0}'.replace('{0}', i);
	                }
	
	                if (!this.isImported(path, 'link')) {
	                    this.import(styleId, path, null, 'link');
	                }
	            }
	        }
	
	        // Enable loader indicator
	        this.loader = true;
	
	        this.emitter.emit('after-loading-themes', this);
	    };
	
	    /**
	     * Return stylesheet DOM element for a given theme name
	     * @return {DOMElement} stylesheet element
	     */
	
	
	    TableFilter.prototype.getStylesheet = function getStylesheet() {
	        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
	
	        return (0, _dom.elm)(this.prfxTf + name);
	    };
	
	    /**
	     * Destroy filter grid
	     */
	
	
	    TableFilter.prototype.destroy = function destroy() {
	        var _this6 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        var Mod = this.Mod;
	        var emitter = this.emitter;
	
	        if (this.isExternalFlt && !this.popupFilters) {
	            this.removeExternalFlts();
	        }
	        if (this.infDiv) {
	            this.removeToolbar();
	        }
	        if (this.markActiveColumns) {
	            this.clearActiveColumns();
	            emitter.off(['before-filtering'], function () {
	                return _this6.clearActiveColumns();
	            });
	            emitter.off(['cell-processed'], function (tf, colIndex) {
	                return _this6.markActiveColumn(colIndex);
	            });
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
	            var feature = Mod[key];
	            if (feature && (0, _types.isFn)(feature.destroy)) {
	                feature.destroy();
	            }
	        });
	
	        // unsubscribe to events
	        if (this.hasVisibleRows) {
	            emitter.off(['after-filtering'], function () {
	                return _this6.enforceVisibility();
	            });
	        }
	        if (this.linkedFilters) {
	            emitter.off(['after-filtering'], function () {
	                return _this6.linkFilters();
	            });
	        }
	        this.emitter.off(['filter-focus'], function (tf, filter) {
	            return _this6.setActiveFilterId(filter.id);
	        });
	
	        (0, _dom.removeClass)(this.tbl, this.prfxTf);
	        (0, _dom.removeClass)(this.tbl, this.prfxResponsive);
	
	        this.nbHiddenRows = 0;
	        this.validRowsIndex = [];
	        this.fltIds = [];
	        this.initialized = false;
	    };
	
	    /**
	     * Generate container element for paging, reset button, rows counter etc.
	     */
	
	
	    TableFilter.prototype.setToolbar = function setToolbar() {
	        if (this.infDiv) {
	            return;
	        }
	
	        /*** container div ***/
	        var infdiv = (0, _dom.createElm)('div', ['id', this.prfxInfDiv + this.id]);
	        infdiv.className = this.infDivCssClass;
	
	        //custom container
	        if (this.toolBarTgtId) {
	            (0, _dom.elm)(this.toolBarTgtId).appendChild(infdiv);
	        }
	        //grid-layout
	        else if (this.gridLayout) {
	                var gridLayout = this.Mod.gridLayout;
	                gridLayout.tblMainCont.appendChild(infdiv);
	                infdiv.className = gridLayout.infDivCssClass;
	            }
	            //default location: just above the table
	            else {
	                    var cont = (0, _dom.createElm)('caption');
	                    cont.appendChild(infdiv);
	                    this.tbl.insertBefore(cont, this.tbl.firstChild);
	                }
	        this.infDiv = (0, _dom.elm)(this.prfxInfDiv + this.id);
	
	        /*** left div containing rows # displayer ***/
	        var ldiv = (0, _dom.createElm)('div', ['id', this.prfxLDiv + this.id]);
	        ldiv.className = this.lDivCssClass;
	        infdiv.appendChild(ldiv);
	        this.lDiv = (0, _dom.elm)(this.prfxLDiv + this.id);
	
	        /***    right div containing reset button
	                + nb results per page select    ***/
	        var rdiv = (0, _dom.createElm)('div', ['id', this.prfxRDiv + this.id]);
	        rdiv.className = this.rDivCssClass;
	        infdiv.appendChild(rdiv);
	        this.rDiv = (0, _dom.elm)(this.prfxRDiv + this.id);
	
	        /*** mid div containing paging elements ***/
	        var mdiv = (0, _dom.createElm)('div', ['id', this.prfxMDiv + this.id]);
	        mdiv.className = this.mDivCssClass;
	        infdiv.appendChild(mdiv);
	        this.mDiv = (0, _dom.elm)(this.prfxMDiv + this.id);
	
	        // emit help initialisation only if undefined
	        if ((0, _types.isUndef)(this.help)) {
	            // explicitily set enabled field to true to initialise help by
	            // default, only if setting is undefined
	            this.Mod.help.enabled = true;
	            this.emitter.emit('init-help', this);
	        }
	    };
	
	    /**
	     * Remove toolbar container element
	     */
	
	
	    TableFilter.prototype.removeToolbar = function removeToolbar() {
	        if (!this.infDiv) {
	            return;
	        }
	        (0, _dom.removeElm)(this.infDiv);
	        this.infDiv = null;
	
	        var tbl = this.tbl;
	        var captions = (0, _dom.tag)(tbl, 'caption');
	        if (captions.length > 0) {
	            [].forEach.call(captions, function (elm) {
	                return tbl.removeChild(elm);
	            });
	        }
	    };
	
	    /**
	     * Remove all the external column filters
	     */
	
	
	    TableFilter.prototype.removeExternalFlts = function removeExternalFlts() {
	        if (!this.isExternalFlt) {
	            return;
	        }
	        var ids = this.externalFltTgtIds,
	            len = ids.length;
	        for (var ct = 0; ct < len; ct++) {
	            var externalFltTgtId = ids[ct],
	                externalFlt = (0, _dom.elm)(externalFltTgtId);
	            if (externalFlt) {
	                externalFlt.innerHTML = '';
	            }
	        }
	    };
	
	    /**
	     * Check if given column implements a filter with custom options
	     * @param  {Number}  colIndex Column's index
	     * @return {Boolean}
	     */
	
	
	    TableFilter.prototype.isCustomOptions = function isCustomOptions(colIndex) {
	        return this.hasCustomOptions && this.customOptions.cols.indexOf(colIndex) !== -1;
	    };
	
	    /**
	     * Returns an array [[value0, value1 ...],[text0, text1 ...]] with the
	     * custom options values and texts
	     * @param  {Number} colIndex Column's index
	     * @return {Array}
	     */
	
	
	    TableFilter.prototype.getCustomOptions = function getCustomOptions(colIndex) {
	        if ((0, _types.isEmpty)(colIndex) || !this.isCustomOptions(colIndex)) {
	            return;
	        }
	
	        var customOptions = this.customOptions;
	        var cols = customOptions.cols;
	        var optTxt = [],
	            optArray = [];
	        var index = cols.indexOf(colIndex);
	        var slcValues = customOptions.values[index];
	        var slcTexts = customOptions.texts[index];
	        var slcSort = customOptions.sorts[index];
	
	        for (var r = 0, len = slcValues.length; r < len; r++) {
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
	    };
	
	    /**
	     * Filter the table by retrieving the data from each cell in every single
	     * row and comparing it to the search term for current column. A row is
	     * hidden when all the search terms are not found in inspected row.
	     */
	
	
	    TableFilter.prototype.filter = function filter() {
	        if (!this.fltGrid || !this.initialized) {
	            return;
	        }
	        //invoke onbefore callback
	        if (this.onBeforeFilter) {
	            this.onBeforeFilter.call(null, this);
	        }
	        this.emitter.emit('before-filtering', this);
	
	        var row = this.tbl.rows,
	            nbRows = this.getRowsNb(true),
	            hiddenRows = 0;
	
	        this.validRowsIndex = [];
	        // search args re-init
	        var searchArgs = this.getFiltersValue();
	
	        var numData = void 0;
	        var decimal = this.decimalSeparator;
	        var re_le = new RegExp(this.leOperator),
	            re_ge = new RegExp(this.geOperator),
	            re_l = new RegExp(this.lwOperator),
	            re_g = new RegExp(this.grOperator),
	            re_d = new RegExp(this.dfOperator),
	            re_lk = new RegExp((0, _string.rgxEsc)(this.lkOperator)),
	            re_eq = new RegExp(this.eqOperator),
	            re_st = new RegExp(this.stOperator),
	            re_en = new RegExp(this.enOperator),
	
	        // re_an = new RegExp(this.anOperator),
	        // re_cr = new RegExp(this.curExp),
	        re_em = this.emOperator,
	            re_nm = this.nmOperator,
	            re_re = new RegExp((0, _string.rgxEsc)(this.rgxOperator));
	
	        //keyword highlighting
	        function highlight(str, ok, cell) {
	            /*jshint validthis:true */
	            if (this.highlightKeywords && ok) {
	                str = str.replace(re_lk, '');
	                str = str.replace(re_eq, '');
	                str = str.replace(re_st, '');
	                str = str.replace(re_en, '');
	                var w = str;
	                if (re_le.test(str) || re_ge.test(str) || re_l.test(str) || re_g.test(str) || re_d.test(str)) {
	                    w = (0, _dom.getText)(cell);
	                }
	                if (w !== '') {
	                    this.emitter.emit('highlight-keyword', this, cell, w);
	                }
	            }
	        }
	
	        //looks for search argument in current row
	        function hasArg(sA, cellData, colIdx) {
	            sA = (0, _string.matchCase)(sA, this.caseSensitive);
	
	            var occurence = false;
	
	            //Search arg operator tests
	            var hasLO = re_l.test(sA),
	                hasLE = re_le.test(sA),
	                hasGR = re_g.test(sA),
	                hasGE = re_ge.test(sA),
	                hasDF = re_d.test(sA),
	                hasEQ = re_eq.test(sA),
	                hasLK = re_lk.test(sA),
	
	            // hasAN = re_an.test(sA),
	            hasST = re_st.test(sA),
	                hasEN = re_en.test(sA),
	                hasEM = re_em === sA,
	                hasNM = re_nm === sA,
	                hasRE = re_re.test(sA);
	
	            // Check for dates or resolve date type
	            if (this.hasType(colIdx, [_const.DATE])) {
	                var dte1 = void 0,
	                    dte2 = void 0;
	
	                var dateType = this.Mod.dateType;
	                var isValidDate = dateType.isValid.bind(dateType);
	                var parseDate = dateType.parse.bind(dateType);
	                var locale = dateType.getOptions(colIdx).locale || this.locale;
	
	                // Search arg dates tests
	                var isLDate = hasLO && isValidDate(sA.replace(re_l, ''), locale);
	                var isLEDate = hasLE && isValidDate(sA.replace(re_le, ''), locale);
	                var isGDate = hasGR && isValidDate(sA.replace(re_g, ''), locale);
	                var isGEDate = hasGE && isValidDate(sA.replace(re_ge, ''), locale);
	                var isDFDate = hasDF && isValidDate(sA.replace(re_d, ''), locale);
	                var isEQDate = hasEQ && isValidDate(sA.replace(re_eq, ''), locale);
	
	                dte1 = parseDate(cellData, locale);
	
	                // lower date
	                if (isLDate) {
	                    dte2 = parseDate(sA.replace(re_l, ''), locale);
	                    occurence = dte1 < dte2;
	                }
	                // lower equal date
	                else if (isLEDate) {
	                        dte2 = parseDate(sA.replace(re_le, ''), locale);
	                        occurence = dte1 <= dte2;
	                    }
	                    // greater equal date
	                    else if (isGEDate) {
	                            dte2 = parseDate(sA.replace(re_ge, ''), locale);
	                            occurence = dte1 >= dte2;
	                        }
	                        // greater date
	                        else if (isGDate) {
	                                dte2 = parseDate(sA.replace(re_g, ''), locale);
	                                occurence = dte1 > dte2;
	                            }
	                            // different date
	                            else if (isDFDate) {
	                                    dte2 = parseDate(sA.replace(re_d, ''), locale);
	                                    occurence = dte1.toString() !== dte2.toString();
	                                }
	                                // equal date
	                                else if (isEQDate) {
	                                        dte2 = parseDate(sA.replace(re_eq, ''), locale);
	                                        occurence = dte1.toString() === dte2.toString();
	                                    }
	                                    // searched keyword with * operator doesn't have to be a date
	                                    else if (re_lk.test(sA)) {
	                                            // like date
	                                            occurence = (0, _string.contains)(sA.replace(re_lk, ''), cellData, false, this.caseSensitive);
	                                        } else if (isValidDate(sA)) {
	                                            dte2 = parseDate(sA, locale);
	                                            occurence = dte1.toString() === dte2.toString();
	                                        }
	                                        //empty
	                                        else if (hasEM) {
	                                                occurence = (0, _string.isEmpty)(cellData);
	                                            }
	                                            //non-empty
	                                            else if (hasNM) {
	                                                    occurence = !(0, _string.isEmpty)(cellData);
	                                                } else {
	                                                    occurence = (0, _string.contains)(sA, cellData, this.isExactMatch(colIdx), this.caseSensitive);
	                                                }
	            } else {
	                if (this.hasType(colIdx, [_const.FORMATTED_NUMBER])) {
	                    var colType = this.colTypes[colIdx];
	                    if (colType.hasOwnProperty('decimal')) {
	                        decimal = colType.decimal;
	                    }
	                }
	                // Convert to number anyways to auto-resolve type in case not
	                // defined by configuration
	                numData = Number(cellData) || (0, _number.parse)(cellData, decimal);
	
	                // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},
	                // rgx:)
	                // lower equal
	                if (hasLE) {
	                    occurence = numData <= (0, _number.parse)(sA.replace(re_le, ''), decimal);
	                }
	                //greater equal
	                else if (hasGE) {
	                        occurence = numData >= (0, _number.parse)(sA.replace(re_ge, ''), decimal);
	                    }
	                    //lower
	                    else if (hasLO) {
	                            occurence = numData < (0, _number.parse)(sA.replace(re_l, ''), decimal);
	                        }
	                        //greater
	                        else if (hasGR) {
	                                occurence = numData > (0, _number.parse)(sA.replace(re_g, ''), decimal);
	                            }
	                            //different
	                            else if (hasDF) {
	                                    occurence = (0, _string.contains)(sA.replace(re_d, ''), cellData, false, this.caseSensitive) ? false : true;
	                                }
	                                //like
	                                else if (hasLK) {
	                                        occurence = (0, _string.contains)(sA.replace(re_lk, ''), cellData, false, this.caseSensitive);
	                                    }
	                                    //equal
	                                    else if (hasEQ) {
	                                            occurence = (0, _string.contains)(sA.replace(re_eq, ''), cellData, true, this.caseSensitive);
	                                        }
	                                        //starts with
	                                        else if (hasST) {
	                                                occurence = cellData.indexOf(sA.replace(re_st, '')) === 0 ? true : false;
	                                            }
	                                            //ends with
	                                            else if (hasEN) {
	                                                    var searchArg = sA.replace(re_en, '');
	                                                    occurence = cellData.lastIndexOf(searchArg, cellData.length - 1) === cellData.length - 1 - (searchArg.length - 1) && cellData.lastIndexOf(searchArg, cellData.length - 1) > -1 ? true : false;
	                                                }
	                                                //empty
	                                                else if (hasEM) {
	                                                        occurence = (0, _string.isEmpty)(cellData);
	                                                    }
	                                                    //non-empty
	                                                    else if (hasNM) {
	                                                            occurence = !(0, _string.isEmpty)(cellData);
	                                                        }
	                                                        //regexp
	                                                        else if (hasRE) {
	                                                                //in case regexp fires an exception
	                                                                try {
	                                                                    //operator is removed
	                                                                    var srchArg = sA.replace(re_re, '');
	                                                                    var rgx = new RegExp(srchArg);
	                                                                    occurence = rgx.test(cellData);
	                                                                } catch (ex) {
	                                                                    occurence = false;
	                                                                }
	                                                            } else {
	                                                                // If numeric type data, perform a strict equality test and
	                                                                // fallback to unformatted number string comparison
	                                                                if (numData && this.hasType(colIdx, [_const.NUMBER, _const.FORMATTED_NUMBER]) && !this.singleSearchFlt) {
	                                                                    // parseNb can return 0 for strings which are not
	                                                                    // formatted numbers, in that case return the original
	                                                                    // string. TODO: handle this in parseNb
	                                                                    sA = (0, _number.parse)(sA, decimal) || sA;
	                                                                    occurence = numData === sA || (0, _string.contains)(sA.toString(), numData.toString(), this.isExactMatch(colIdx), this.caseSensitive);
	                                                                } else {
	                                                                    // Finally test search term is contained in cell data
	                                                                    occurence = (0, _string.contains)(sA, cellData, this.isExactMatch(colIdx), this.caseSensitive);
	                                                                }
	                                                            }
	            } //else
	            return occurence;
	        } //fn
	
	        for (var k = this.refRow; k < nbRows; k++) {
	            // already filtered rows display re-init
	            row[k].style.display = '';
	
	            var cells = row[k].cells;
	            var nchilds = cells.length;
	
	            // checks if row has exact cell #
	            if (nchilds !== this.nbCells) {
	                continue;
	            }
	
	            var occurence = [],
	                isRowValid = true,
	
	            //only for single filter search
	            singleFltRowValid = false;
	
	            // this loop retrieves cell data
	            for (var j = 0; j < nchilds; j++) {
	                //searched keyword
	                var sA = searchArgs[this.singleSearchFlt ? 0 : j];
	
	                if (sA === '') {
	                    continue;
	                }
	
	                var cellData = (0, _string.matchCase)(this.getCellData(cells[j]), this.caseSensitive);
	
	                //multiple search parameter operator ||
	                var sAOrSplit = sA.toString().split(this.orOperator),
	
	                //multiple search || parameter boolean
	                hasMultiOrSA = sAOrSplit.length > 1,
	
	                //multiple search parameter operator &&
	                sAAndSplit = sA.toString().split(this.anOperator),
	
	                //multiple search && parameter boolean
	                hasMultiAndSA = sAAndSplit.length > 1;
	
	                //detect operators or array query
	                if ((0, _types.isArray)(sA) || hasMultiOrSA || hasMultiAndSA) {
	                    var cS = void 0,
	                        s = void 0,
	                        occur = false;
	                    if ((0, _types.isArray)(sA)) {
	                        s = sA;
	                    } else {
	                        s = hasMultiOrSA ? sAOrSplit : sAAndSplit;
	                    }
	                    // TODO: improve clarity/readability of this block
	                    for (var w = 0, len = s.length; w < len; w++) {
	                        cS = (0, _string.trim)(s[w]);
	                        occur = hasArg.call(this, cS, cellData, j);
	                        highlight.call(this, cS, occur, cells[j]);
	                        if (hasMultiOrSA && occur || hasMultiAndSA && !occur) {
	                            break;
	                        }
	                        if ((0, _types.isArray)(sA) && occur) {
	                            break;
	                        }
	                    }
	                    occurence[j] = occur;
	                }
	                //single search parameter
	                else {
	                        occurence[j] = hasArg.call(this, (0, _string.trim)(sA), cellData, j);
	                        highlight.call(this, sA, occurence[j], cells[j]);
	                    } //else single param
	
	                if (!occurence[j]) {
	                    isRowValid = false;
	                }
	                if (this.singleSearchFlt && occurence[j]) {
	                    singleFltRowValid = true;
	                }
	
	                this.emitter.emit('cell-processed', this, j, cells[j]);
	            } //for j
	
	            if (this.singleSearchFlt && singleFltRowValid) {
	                isRowValid = true;
	            }
	
	            if (!isRowValid) {
	                this.validateRow(k, false);
	                hiddenRows++;
	            } else {
	                this.validateRow(k, true);
	            }
	
	            this.emitter.emit('row-processed', this, k, this.validRowsIndex.length, isRowValid);
	        } // for k
	
	        this.nbHiddenRows = hiddenRows;
	
	        //invokes onafterfilter callback
	        if (this.onAfterFilter) {
	            this.onAfterFilter.call(null, this);
	        }
	
	        this.emitter.emit('after-filtering', this, searchArgs);
	    };
	
	    /**
	     * Return the data of a specified column
	     * @param  {Number} colIndex Column index
	     * @param  {Boolean} includeHeaders  Optional: include headers row
	     * @param  {Boolean} num     Optional: return unformatted number
	     * @param  {Array} exclude   Optional: list of row indexes to be excluded
	     * @return {Array}           Flat list of data for a column
	     */
	
	
	    TableFilter.prototype.getColValues = function getColValues(colIndex) {
	        var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        var num = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	        var exclude = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
	
	        if (!this.fltGrid) {
	            return;
	        }
	        var row = this.tbl.rows;
	        var nbRows = this.getRowsNb(true);
	        var colValues = [];
	
	        if (includeHeaders) {
	            colValues.push(this.getHeadersText()[colIndex]);
	        }
	
	        for (var i = this.refRow; i < nbRows; i++) {
	            var isExludedRow = false;
	            // checks if current row index appears in exclude array
	            if (exclude.length > 0) {
	                isExludedRow = exclude.indexOf(i) !== -1;
	            }
	            var cell = row[i].cells,
	                nchilds = cell.length;
	
	            // checks if row has exact cell # and is not excluded
	            if (nchilds === this.nbCells && !isExludedRow) {
	                // this loop retrieves cell data
	                for (var j = 0; j < nchilds; j++) {
	                    if (j !== colIndex || row[i].style.display !== '') {
	                        continue;
	                    }
	                    var cellData = this.getCellData(cell[j]);
	                    var decimal = this.decimalSeparator;
	                    if (this.hasType(colIndex, [_const.FORMATTED_NUMBER])) {
	                        var colType = this.colTypes[colIndex];
	                        if (colType.hasOwnProperty('decimal')) {
	                            decimal = colType.decimal;
	                        }
	                    }
	                    var data = num ? Number(cellData) || (0, _number.parse)(cellData, decimal) : cellData;
	                    colValues.push(data);
	                }
	            }
	        }
	        return colValues;
	    };
	
	    /**
	     * Return the filter's value of a specified column
	     * @param  {Number} index Column index
	     * @return {String}       Filter value
	     */
	
	
	    TableFilter.prototype.getFilterValue = function getFilterValue(index) {
	        if (!this.fltGrid) {
	            return;
	        }
	        var fltValue = '';
	        var flt = this.getFilterElement(index);
	        if (!flt) {
	            return fltValue;
	        }
	
	        var fltColType = this.getFilterType(index);
	        if (fltColType !== _const.MULTIPLE && fltColType !== _const.CHECKLIST) {
	            fltValue = flt.value;
	        }
	        //mutiple select
	        else if (fltColType === _const.MULTIPLE) {
	                fltValue = this.feature('dropdown').getValues(index);
	            }
	            //checklist
	            else if (fltColType === _const.CHECKLIST) {
	                    fltValue = this.feature('checkList').getValues(index);
	                }
	        //return an empty string if collection is empty or contains a single
	        //empty string
	        if ((0, _types.isArray)(fltValue) && fltValue.length === 0 || fltValue.length === 1 && fltValue[0] === '') {
	            fltValue = '';
	        }
	
	        return fltValue;
	    };
	
	    /**
	     * Return the filters' values
	     * @return {Array} List of filters' values
	     */
	
	
	    TableFilter.prototype.getFiltersValue = function getFiltersValue() {
	        if (!this.fltGrid) {
	            return;
	        }
	        var searchArgs = [];
	        for (var i = 0, len = this.fltIds.length; i < len; i++) {
	            var fltValue = this.getFilterValue(i);
	            if ((0, _types.isArray)(fltValue)) {
	                searchArgs.push(fltValue);
	            } else {
	                searchArgs.push((0, _string.trim)(fltValue));
	            }
	        }
	        return searchArgs;
	    };
	
	    /**
	     * Return the ID of a specified column's filter
	     * @param  {Number} index Column's index
	     * @return {String}       ID of the filter element
	     */
	
	
	    TableFilter.prototype.getFilterId = function getFilterId(index) {
	        if (!this.fltGrid) {
	            return;
	        }
	        return this.fltIds[index];
	    };
	
	    /**
	     * Return the list of ids of filters matching a specified type.
	     * Note: hidden filters are also returned
	     *
	     * @param  {String} type  Filter type string ('input', 'select', 'multiple',
	     *                        'checklist')
	     * @param  {Boolean} bool If true returns columns indexes instead of IDs
	     * @return {[type]}       List of element IDs or column indexes
	     */
	
	
	    TableFilter.prototype.getFiltersByType = function getFiltersByType(type, bool) {
	        if (!this.fltGrid) {
	            return;
	        }
	        var arr = [];
	        for (var i = 0, len = this.fltIds.length; i < len; i++) {
	            var fltType = this.getFilterType(i);
	            if (fltType === type.toLowerCase()) {
	                var a = bool ? i : this.fltIds[i];
	                arr.push(a);
	            }
	        }
	        return arr;
	    };
	
	    /**
	     * Return the filter's DOM element for a given column
	     * @param  {Number} index     Column's index
	     * @return {DOMElement}
	     */
	
	
	    TableFilter.prototype.getFilterElement = function getFilterElement(index) {
	        var fltId = this.fltIds[index];
	        return (0, _dom.elm)(fltId);
	    };
	
	    /**
	     * Return the number of cells for a given row index
	     * @param  {Number} rowIndex Index of the row
	     * @return {Number}          Number of cells
	     */
	
	
	    TableFilter.prototype.getCellsNb = function getCellsNb() {
	        var rowIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	        var tr = this.tbl.rows[rowIndex];
	        return tr.cells.length;
	    };
	
	    /**
	     * Return the number of filterable rows starting from reference row if
	     * defined
	     * @param  {Boolean} includeHeaders Include the headers row
	     * @return {Number}                 Number of filterable rows
	     */
	
	
	    TableFilter.prototype.getRowsNb = function getRowsNb(includeHeaders) {
	        var s = (0, _types.isUndef)(this.refRow) ? 0 : this.refRow;
	        var ntrs = this.tbl.rows.length;
	        if (includeHeaders) {
	            s = 0;
	        }
	        return parseInt(ntrs - s, 10);
	    };
	
	    /**
	     * Return the data of a given cell
	     * @param  {DOMElement} cell Cell's DOM object
	     * @return {String}
	     */
	
	
	    TableFilter.prototype.getCellData = function getCellData(cell) {
	        var idx = cell.cellIndex;
	        //Check for customCellData callback
	        if (this.customCellData && this.customCellDataCols.indexOf(idx) !== -1) {
	            return this.customCellData.call(null, this, cell, idx);
	        } else {
	            return (0, _dom.getText)(cell);
	        }
	    };
	
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
	
	
	    TableFilter.prototype.getTableData = function getTableData() {
	        var includeHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	        var excludeHiddenCols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        var rows = this.tbl.rows;
	        var nbRows = this.getRowsNb(true);
	        var tblData = [];
	        if (includeHeaders) {
	            var headers = this.getHeadersText(excludeHiddenCols);
	            tblData.push([this.getHeadersRowIndex(), headers]);
	        }
	        for (var k = this.refRow; k < nbRows; k++) {
	            var rowData = [k, []];
	            var cells = rows[k].cells;
	            for (var j = 0, len = cells.length; j < len; j++) {
	                if (excludeHiddenCols && this.hasExtension('colsVisibility')) {
	                    if (this.extension('colsVisibility').isColHidden(j)) {
	                        continue;
	                    }
	                }
	                var cellData = this.getCellData(cells[j]);
	                rowData[1].push(cellData);
	            }
	            tblData.push(rowData);
	        }
	        return tblData;
	    };
	
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
	
	
	    TableFilter.prototype.getFilteredData = function getFilteredData() {
	        var includeHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	        var excludeHiddenCols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        if (!this.validRowsIndex) {
	            return [];
	        }
	        var rows = this.tbl.rows,
	            filteredData = [];
	        if (includeHeaders) {
	            var headers = this.getHeadersText(excludeHiddenCols);
	            filteredData.push([this.getHeadersRowIndex(), headers]);
	        }
	
	        var validRows = this.getValidRows(true);
	        for (var i = 0; i < validRows.length; i++) {
	            var rData = [this.validRowsIndex[i], []],
	                cells = rows[this.validRowsIndex[i]].cells;
	            for (var k = 0; k < cells.length; k++) {
	                if (excludeHiddenCols && this.hasExtension('colsVisibility')) {
	                    if (this.extension('colsVisibility').isColHidden(k)) {
	                        continue;
	                    }
	                }
	                var cellData = this.getCellData(cells[k]);
	                rData[1].push(cellData);
	            }
	            filteredData.push(rData);
	        }
	        return filteredData;
	    };
	
	    /**
	     * Return the filtered data for a given column index
	     * @param  {Number} colIndex Colmun's index
	     * @param  {Boolean} includeHeaders  Optional: include headers row
	     * @return {Array}           Flat list of values ['val0','val1','val2'...]
	     *
	     * TODO: provide an API returning data in JSON format
	     */
	
	
	    TableFilter.prototype.getFilteredDataCol = function getFilteredDataCol(colIndex) {
	        var includeHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        if ((0, _types.isUndef)(colIndex)) {
	            return [];
	        }
	        var data = this.getFilteredData(),
	            colData = [];
	        if (includeHeaders) {
	            colData.push(this.getHeadersText()[colIndex]);
	        }
	        for (var i = 0, len = data.length; i < len; i++) {
	            var r = data[i],
	
	            //cols values of current row
	            d = r[1],
	
	            //data of searched column
	            c = d[colIndex];
	            colData.push(c);
	        }
	        return colData;
	    };
	
	    /**
	     * Get the display value of a row
	     * @param  {HTMLTableRowElement} row DOM element of the row
	     * @return {String}     Usually 'none' or ''
	     */
	
	
	    TableFilter.prototype.getRowDisplay = function getRowDisplay(row) {
	        return row.style.display;
	    };
	
	    /**
	     * Validate/invalidate row by setting the 'validRow' attribute on the row
	     * @param  {Number}  rowIndex Index of the row
	     * @param  {Boolean} isValid
	     */
	
	
	    TableFilter.prototype.validateRow = function validateRow(rowIndex, isValid) {
	        var row = this.tbl.rows[rowIndex];
	        if (!row || typeof isValid !== 'boolean') {
	            return;
	        }
	
	        // always visible rows are valid
	        if (this.hasVisibleRows && this.visibleRows.indexOf(rowIndex) !== -1) {
	            isValid = true;
	        }
	
	        var displayFlag = isValid ? '' : _const.NONE,
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
	    };
	
	    /**
	     * Validate all filterable rows
	     */
	
	
	    TableFilter.prototype.validateAllRows = function validateAllRows() {
	        if (!this.initialized) {
	            return;
	        }
	        this.validRowsIndex = [];
	        for (var k = this.refRow; k < this.nbFilterableRows; k++) {
	            this.validateRow(k, true);
	        }
	    };
	
	    /**
	     * Set search value to a given filter
	     * @param {Number} index     Column's index
	     * @param {String or Array} query  searcharg Search term
	     */
	
	
	    TableFilter.prototype.setFilterValue = function setFilterValue(index) {
	        var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	        if (!this.fltGrid) {
	            return;
	        }
	        var slc = this.getFilterElement(index),
	            fltColType = this.getFilterType(index);
	
	        if (fltColType !== _const.MULTIPLE && fltColType !== _const.CHECKLIST) {
	            if (this.loadFltOnDemand && !this.initialized) {
	                this.emitter.emit('build-select-filter', this, index, this.linkedFilters, this.isExternalFlt);
	            }
	            slc.value = query;
	        }
	        //multiple selects
	        else if (fltColType === _const.MULTIPLE) {
	                var values = (0, _types.isArray)(query) ? query : query.split(' ' + this.orOperator + ' ');
	
	                if (this.loadFltOnDemand && !this.initialized) {
	                    this.emitter.emit('build-select-filter', this, index, this.linkedFilters, this.isExternalFlt);
	                }
	
	                this.emitter.emit('select-options', this, index, values);
	            }
	            //checklist
	            else if (fltColType === _const.CHECKLIST) {
	                    var _values = [];
	                    if (this.loadFltOnDemand && !this.initialized) {
	                        this.emitter.emit('build-checklist-filter', this, index, this.isExternalFlt);
	                    }
	                    if ((0, _types.isArray)(query)) {
	                        _values = query;
	                    } else {
	                        query = (0, _string.matchCase)(query, this.caseSensitive);
	                        _values = query.split(' ' + this.orOperator + ' ');
	                    }
	
	                    this.emitter.emit('select-checklist-options', this, index, _values);
	                }
	    };
	
	    /**
	     * Set them columns' widths as per configuration
	     * @param {Element} tbl DOM element
	     */
	
	
	    TableFilter.prototype.setColWidths = function setColWidths(tbl) {
	        if (!this.hasColWidths) {
	            return;
	        }
	        tbl = tbl || this.tbl;
	
	        var nbCols = this.nbCells;
	        var colWidths = this.colWidths;
	        var colTags = (0, _dom.tag)(tbl, 'col');
	        var tblHasColTag = colTags.length > 0;
	        var frag = !tblHasColTag ? doc.createDocumentFragment() : null;
	        for (var k = 0; k < nbCols; k++) {
	            var col = void 0;
	            if (tblHasColTag) {
	                col = colTags[k];
	            } else {
	                col = (0, _dom.createElm)('col', ['id', this.id + '_col_' + k]);
	                frag.appendChild(col);
	            }
	            col.style.width = colWidths[k];
	        }
	        if (!tblHasColTag) {
	            tbl.insertBefore(frag, tbl.firstChild);
	        }
	    };
	
	    /**
	     * Makes defined rows always visible
	     */
	
	
	    TableFilter.prototype.enforceVisibility = function enforceVisibility() {
	        if (!this.hasVisibleRows) {
	            return;
	        }
	        var nbRows = this.getRowsNb(true);
	        for (var i = 0, len = this.visibleRows.length; i < len; i++) {
	            var row = this.visibleRows[i];
	            //row index cannot be > nrows
	            if (row <= nbRows) {
	                this.validateRow(row, true);
	            }
	        }
	    };
	
	    /**
	     * Clear all the filters' values
	     */
	
	
	    TableFilter.prototype.clearFilters = function clearFilters() {
	        if (!this.fltGrid) {
	            return;
	        }
	
	        this.emitter.emit('before-clearing-filters', this);
	
	        if (this.onBeforeReset) {
	            this.onBeforeReset.call(null, this, this.getFiltersValue());
	        }
	        for (var i = 0, len = this.fltIds.length; i < len; i++) {
	            this.setFilterValue(i, '');
	        }
	
	        this.filter();
	
	        if (this.onAfterReset) {
	            this.onAfterReset.call(null, this);
	        }
	        this.emitter.emit('after-clearing-filters', this);
	    };
	
	    /**
	     * Clears filtered columns visual indicator (background color)
	     */
	
	
	    TableFilter.prototype.clearActiveColumns = function clearActiveColumns() {
	        for (var i = 0, len = this.getCellsNb(this.headersRow); i < len; i++) {
	            (0, _dom.removeClass)(this.getHeaderElement(i), this.activeColumnsCssClass);
	        }
	    };
	
	    /**
	     * Mark currently filtered column
	     * @param  {Number} colIndex Column index
	     */
	
	
	    TableFilter.prototype.markActiveColumn = function markActiveColumn(colIndex) {
	        var header = this.getHeaderElement(colIndex);
	        if ((0, _dom.hasClass)(header, this.activeColumnsCssClass)) {
	            return;
	        }
	        if (this.onBeforeActiveColumn) {
	            this.onBeforeActiveColumn.call(null, this, colIndex);
	        }
	        (0, _dom.addClass)(header, this.activeColumnsCssClass);
	        if (this.onAfterActiveColumn) {
	            this.onAfterActiveColumn.call(null, this, colIndex);
	        }
	    };
	
	    /**
	     * Return the ID of the current active filter
	     * @returns {String}
	     */
	
	
	    TableFilter.prototype.getActiveFilterId = function getActiveFilterId() {
	        return this.activeFilterId;
	    };
	
	    /**
	     * Set the ID of the current active filter
	     * @param {String} filterId Element ID
	     */
	
	
	    TableFilter.prototype.setActiveFilterId = function setActiveFilterId(filterId) {
	        this.activeFilterId = filterId;
	    };
	
	    /**
	     * Return the column index for a given filter ID
	     * @param {string} [filterId=''] Filter ID
	     * @returns {Number} Column index
	     */
	
	
	    TableFilter.prototype.getColumnIndexFromFilterId = function getColumnIndexFromFilterId() {
	        var filterId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	        var idx = filterId.split('_')[0];
	        idx = idx.split(this.prfxFlt)[1];
	        return parseInt(idx, 10);
	    };
	
	    /**
	     * Make specified column's filter active
	     * @param colIndex Index of a column
	     */
	
	
	    TableFilter.prototype.activateFilter = function activateFilter(colIndex) {
	        if ((0, _types.isUndef)(colIndex)) {
	            return;
	        }
	        this.setActiveFilterId(this.getFilterId(colIndex));
	    };
	
	    /**
	     * Refresh the filters subject to linking ('select', 'multiple',
	     * 'checklist' type)
	     */
	
	
	    TableFilter.prototype.linkFilters = function linkFilters() {
	        if (!this.linkedFilters || !this.activeFilterId) {
	            return;
	        }
	        var slcA1 = this.getFiltersByType(_const.SELECT, true),
	            slcA2 = this.getFiltersByType(_const.MULTIPLE, true),
	            slcA3 = this.getFiltersByType(_const.CHECKLIST, true),
	            slcIndex = slcA1.concat(slcA2);
	        slcIndex = slcIndex.concat(slcA3);
	
	        var activeIdx = this.getColumnIndexFromFilterId(this.activeFilterId);
	
	        for (var i = 0, len = slcIndex.length; i < len; i++) {
	            var curSlc = (0, _dom.elm)(this.fltIds[slcIndex[i]]);
	            var slcSelectedValue = this.getFilterValue(slcIndex[i]);
	
	            // Welcome to cyclomatic complexity hell :)
	            // TODO: simplify/refactor if statement
	            if (activeIdx !== slcIndex[i] || this.paging && slcA1.indexOf(slcIndex[i]) !== -1 && activeIdx === slcIndex[i] || !this.paging && (slcA3.indexOf(slcIndex[i]) !== -1 || slcA2.indexOf(slcIndex[i]) !== -1) || slcSelectedValue === this.displayAllText) {
	
	                //1st option needs to be inserted
	                if (this.loadFltOnDemand) {
	                    var opt0 = (0, _dom.createOpt)(this.displayAllText, '');
	                    curSlc.innerHTML = '';
	                    curSlc.appendChild(opt0);
	                }
	
	                if (slcA3.indexOf(slcIndex[i]) !== -1) {
	                    this.emitter.emit('build-checklist-filter', this, slcIndex[i]);
	                } else {
	                    this.emitter.emit('build-select-filter', this, slcIndex[i], true);
	                }
	
	                this.setFilterValue(slcIndex[i], slcSelectedValue);
	            }
	        }
	    };
	
	    /**
	     * Determines if passed filter column implements exact query match
	     * @param  {Number}  colIndex [description]
	     * @return {Boolean}          [description]
	     */
	
	
	    TableFilter.prototype.isExactMatch = function isExactMatch(colIndex) {
	        var fltType = this.getFilterType(colIndex);
	        return this.exactMatchByCol[colIndex] || this.exactMatch || fltType !== _const.INPUT;
	    };
	
	    /**
	     * Check if passed script or stylesheet is already imported
	     * @param  {String}  filePath Ressource path
	     * @param  {String}  type     Possible values: 'script' or 'link'
	     * @return {Boolean}
	     */
	
	
	    TableFilter.prototype.isImported = function isImported(filePath) {
	        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'script';
	
	        var imported = false,
	            attr = type === 'script' ? 'src' : 'href',
	            files = (0, _dom.tag)(doc, type);
	        for (var i = 0, len = files.length; i < len; i++) {
	            if ((0, _types.isUndef)(files[i][attr])) {
	                continue;
	            }
	            if (files[i][attr].match(filePath)) {
	                imported = true;
	                break;
	            }
	        }
	        return imported;
	    };
	
	    /**
	     * Import script or stylesheet
	     * @param  {String}   fileId   Ressource ID
	     * @param  {String}   filePath Ressource path
	     * @param  {Function} callback Callback
	     * @param  {String}   type     Possible values: 'script' or 'link'
	     */
	
	
	    TableFilter.prototype.import = function _import(fileId, filePath, callback) {
	        var _this7 = this;
	
	        var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'script';
	
	        if (this.isImported(filePath, type)) {
	            return;
	        }
	        var o = this,
	            isLoaded = false,
	            file = void 0,
	            head = (0, _dom.tag)(doc, 'head')[0];
	
	        if (type.toLowerCase() === 'link') {
	            file = (0, _dom.createElm)('link', ['id', fileId], ['type', 'text/css'], ['rel', 'stylesheet'], ['href', filePath]);
	        } else {
	            file = (0, _dom.createElm)('script', ['id', fileId], ['type', 'text/javascript'], ['src', filePath]);
	        }
	
	        //Browser <> IE onload event works only for scripts, not for stylesheets
	        file.onload = file.onreadystatechange = function () {
	            if (!isLoaded && (!_this7.readyState || _this7.readyState === 'loaded' || _this7.readyState === 'complete')) {
	                isLoaded = true;
	                if (typeof callback === 'function') {
	                    callback.call(null, o);
	                }
	            }
	        };
	        file.onerror = function () {
	            throw new Error('TableFilter could not load: ' + filePath);
	        };
	        head.appendChild(file);
	    };
	
	    /**
	     * Check if table has filters grid
	     * @return {Boolean}
	     */
	
	
	    TableFilter.prototype.isInitialized = function isInitialized() {
	        return this.initialized;
	    };
	
	    /**
	     * Get list of filter IDs
	     * @return {[type]} [description]
	     */
	
	
	    TableFilter.prototype.getFiltersId = function getFiltersId() {
	        return this.fltIds || [];
	    };
	
	    /**
	     * Get filtered (valid) rows indexes
	     * @param  {Boolean} reCalc Force calculation of filtered rows list
	     * @return {Array}          List of row indexes
	     */
	
	
	    TableFilter.prototype.getValidRows = function getValidRows(reCalc) {
	        if (!reCalc) {
	            return this.validRowsIndex;
	        }
	
	        var nbRows = this.getRowsNb(true);
	        this.validRowsIndex = [];
	        for (var k = this.refRow; k < nbRows; k++) {
	            var r = this.tbl.rows[k];
	            if (!this.paging) {
	                if (this.getRowDisplay(r) !== _const.NONE) {
	                    this.validRowsIndex.push(r.rowIndex);
	                }
	            } else {
	                if (r.getAttribute('validRow') === 'true' || r.getAttribute('validRow') === null) {
	                    this.validRowsIndex.push(r.rowIndex);
	                }
	            }
	        }
	        return this.validRowsIndex;
	    };
	
	    /**
	     * Get the index of the row containing the filters
	     * @return {Number}
	     */
	
	
	    TableFilter.prototype.getFiltersRowIndex = function getFiltersRowIndex() {
	        return this.filtersRowIndex;
	    };
	
	    /**
	     * Get the index of the headers row
	     * @return {Number}
	     */
	
	
	    TableFilter.prototype.getHeadersRowIndex = function getHeadersRowIndex() {
	        return this.headersRow;
	    };
	
	    /**
	     * Get the row index from where the filtering process start (1st filterable
	     * row)
	     * @return {Number}
	     */
	
	
	    TableFilter.prototype.getStartRowIndex = function getStartRowIndex() {
	        return this.refRow;
	    };
	
	    /**
	     * Get the index of the last row
	     * @return {Number}
	     */
	
	
	    TableFilter.prototype.getLastRowIndex = function getLastRowIndex() {
	        var nbRows = this.getRowsNb(true);
	        return nbRows - 1;
	    };
	
	    /**
	     * Determine whether the specified column has one of the passed types
	     * @param {Number} colIndex Column index
	     * @param {Array} [types=[]] List of column types
	     * @returns {Boolean}
	     */
	
	
	    TableFilter.prototype.hasType = function hasType(colIndex) {
	        var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	        if (!this.hasColTypes) {
	            return false;
	        }
	        var colType = this.colTypes[colIndex];
	        if ((0, _types.isObj)(colType)) {
	            colType = colType.type;
	        }
	        return types.indexOf(colType) !== -1;
	    };
	
	    /**
	     * Get the header DOM element for a given column index
	     * @param  {Number} colIndex Column index
	     * @return {Element}
	     */
	
	
	    TableFilter.prototype.getHeaderElement = function getHeaderElement(colIndex) {
	        var table = this.gridLayout ? this.Mod.gridLayout.headTbl : this.tbl;
	        var tHead = (0, _dom.tag)(table, 'thead');
	        var headersRow = this.headersRow;
	        var header = void 0;
	        for (var i = 0; i < this.nbCells; i++) {
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
	    };
	
	    /**
	     * Return the list of headers' text
	     * @param  {Boolean} excludeHiddenCols  Optional: exclude hidden columns
	     * @return {Array} list of headers' text
	     */
	
	
	    TableFilter.prototype.getHeadersText = function getHeadersText() {
	        var excludeHiddenCols = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	        var headers = [];
	        for (var j = 0; j < this.nbCells; j++) {
	            if (excludeHiddenCols && this.hasExtension('colsVisibility')) {
	                if (this.extension('colsVisibility').isColHidden(j)) {
	                    continue;
	                }
	            }
	            var header = this.getHeaderElement(j);
	            var headerText = (0, _dom.getFirstTextNode)(header);
	            headers.push(headerText);
	        }
	        return headers;
	    };
	
	    /**
	     * Return the filter type for a specified column
	     * @param  {Number} colIndex Column's index
	     * @return {String}
	     */
	
	
	    TableFilter.prototype.getFilterType = function getFilterType(colIndex) {
	        var colType = this.cfg['col_' + colIndex];
	        return !colType ? _const.INPUT : colType.toLowerCase();
	    };
	
	    /**
	     * Get the total number of filterable rows
	     * @return {Number}
	     */
	
	
	    TableFilter.prototype.getFilterableRowsNb = function getFilterableRowsNb() {
	        return this.getRowsNb(false);
	    };
	
	    /**
	     * Return the total number of valid rows
	     * @param {Boolean} [reCalc=false] Forces calculation of filtered rows
	     * @returns {Number}
	     */
	
	
	    TableFilter.prototype.getValidRowsNb = function getValidRowsNb() {
	        var reCalc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	        return this.getValidRows(reCalc).length;
	    };
	
	    /**
	     * Get the configuration object (literal object)
	     * @return {Object}
	     */
	
	
	    TableFilter.prototype.config = function config() {
	        return this.cfg;
	    };
	
	    return TableFilter;
	}();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.keyCode = exports.targetEvt = exports.cancelEvt = exports.stopEvt = exports.removeEvt = exports.addEvt = undefined;
	
	var _root = __webpack_require__(2);
	
	/**
	 * DOM event utilities
	 */
	
	/**
	 * Add event handler for specified event on passed element
	 *
	 * @param {DOMElement} obj Element
	 * @param {String} type Event type
	 * @param {Function} Handler
	 * @param {Boolean} capture Specifiy whether the event should be executed in
	 * the capturing or in the bubbling phase
	 */
	var addEvt = exports.addEvt = function addEvt(obj, type, func, capture) {
	    if (obj.addEventListener) {
	        obj.addEventListener(type, func, capture);
	    } else if (obj.attachEvent) {
	        obj.attachEvent('on' + type, func);
	    } else {
	        obj['on' + type] = func;
	    }
	};
	
	/**
	 * Remove event handler for specified event on passed element
	 *
	 * @param {DOMElement} obj Element
	 * @param {String} type Event type
	 * @param {Function} Handler
	 * @param {Boolean} capture Specifiy whether the event should be executed in
	 * the capturing or in the bubbling phase
	 */
	var removeEvt = exports.removeEvt = function removeEvt(obj, type, func, capture) {
	    if (obj.detachEvent) {
	        obj.detachEvent('on' + type, func);
	    } else if (obj.removeEventListener) {
	        obj.removeEventListener(type, func, capture);
	    } else {
	        obj['on' + type] = null;
	    }
	};
	
	/**
	 * Prevents further propagation of the current event in the bubbling phase
	 *
	 * @param {Event} evt Event on the DOM
	 */
	var stopEvt = exports.stopEvt = function stopEvt(evt) {
	    if (!evt) {
	        evt = _root.root.event;
	    }
	    if (evt.stopPropagation) {
	        evt.stopPropagation();
	    } else {
	        evt.cancelBubble = true;
	    }
	};
	
	/**
	 * Cancels the event if it is cancelable, without stopping further
	 * propagation of the event.
	 *
	 * @param {Event} evt Event on the DOM
	 */
	var cancelEvt = exports.cancelEvt = function cancelEvt(evt) {
	    if (!evt) {
	        evt = _root.root.event;
	    }
	    if (evt.preventDefault) {
	        evt.preventDefault();
	    } else {
	        evt.returnValue = false;
	    }
	};
	
	/**
	 * Reference to the object that dispatched the event
	 *
	 * @param {Event} evt Event on the DOM
	 * @returns {DOMElement}
	 */
	var targetEvt = exports.targetEvt = function targetEvt(evt) {
	    if (!evt) {
	        evt = _root.root.event;
	    }
	    return evt.target || evt.srcElement;
	};
	
	/**
	 * Returns the Unicode value of pressed key
	 *
	 * @param {Event} evt Event on the DOM
	 * @returns {Number}
	 */
	var keyCode = exports.keyCode = function keyCode(evt) {
	    return evt.charCode ? evt.charCode : evt.keyCode ? evt.keyCode : evt.which ? evt.which : 0;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/**
	 * Export window or global object depending on the environment
	 */
	var root = exports.root = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global.global === global && global || undefined;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.tag = exports.elm = exports.createCheckItem = exports.createOpt = exports.removeClass = exports.addClass = exports.hasClass = exports.createText = exports.removeElm = exports.createElm = exports.getFirstTextNode = exports.getText = undefined;
	
	var _root = __webpack_require__(2);
	
	var _types = __webpack_require__(4);
	
	var _string = __webpack_require__(5);
	
	/**
	 * DOM utilities
	 */
	
	var doc = _root.root.document;
	
	/**
	 * Returns text + text of children of given node
	 * @param  {NodeElement} node
	 * @return {String}
	 */
	var getText = exports.getText = function getText(node) {
	    if ((0, _types.isUndef)(node.textContent)) {
	        return (0, _string.trim)(node.innerText);
	    }
	    return (0, _string.trim)(node.textContent);
	};
	
	/**
	 * Returns the first text node contained in the supplied node
	 * @param  {NodeElement} node node
	 * @return {String}
	 */
	var getFirstTextNode = exports.getFirstTextNode = function getFirstTextNode(node) {
	    for (var i = 0; i < node.childNodes.length; i++) {
	        var n = node.childNodes[i];
	        if (n.nodeType === 3) {
	            return n.data;
	        }
	    }
	};
	
	/**
	 * Creates an html element with given collection of attributes
	 * @param  {String} tag a string of the html tag to create
	 * @param  {Array} an undetermined number of arrays containing the with 2
	 *                    items, the attribute name and its value ['id','myId']
	 * @return {Object}     created element
	 */
	var createElm = exports.createElm = function createElm() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }
	
	    var tag = args[0];
	    if (!(0, _types.isString)(tag)) {
	        return null;
	    }
	
	    var el = doc.createElement(tag);
	    for (var i = 0; i < args.length; i++) {
	        var arg = args[i];
	
	        if ((0, _types.isArray)(arg) && arg.length === 2) {
	            el.setAttribute(arg[0], arg[1]);
	        }
	    }
	
	    return el;
	};
	
	/**
	 * Removes passed node from DOM
	 * @param  {DOMElement} node
	 * @return {DOMElement} old node reference
	 */
	var removeElm = exports.removeElm = function removeElm(node) {
	    return node.parentNode.removeChild(node);
	};
	
	/**
	 * Returns a text node with given text
	 * @param  {String} txt
	 * @return {Object}
	 */
	var createText = exports.createText = function createText(txt) {
	    return doc.createTextNode(txt);
	};
	
	/**
	 * Determine whether the passed elements is assigned the given class
	 * @param {DOMElement} ele DOM element
	 * @param {String} cls CSS class name
	 * @returns {Boolean}
	 */
	var hasClass = exports.hasClass = function hasClass(ele, cls) {
	    if ((0, _types.isUndef)(ele)) {
	        return false;
	    }
	
	    if (supportsClassList()) {
	        return ele.classList.contains(cls);
	    }
	    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	};
	
	/**
	 * Adds the specified class to the passed element
	 * @param {DOMElement} ele DOM element
	 * @param {String} cls CSS class name
	 */
	var addClass = exports.addClass = function addClass(ele, cls) {
	    if ((0, _types.isUndef)(ele)) {
	        return;
	    }
	
	    if (supportsClassList()) {
	        ele.classList.add(cls);
	        return;
	    }
	
	    if (ele.className === '') {
	        ele.className = cls;
	    } else if (!hasClass(ele, cls)) {
	        ele.className += ' ' + cls;
	    }
	};
	
	/**
	 * Removes the specified class to the passed element
	 * @param {DOMElement} ele DOM element
	 * @param {String} cls CSS class name
	 */
	var removeClass = exports.removeClass = function removeClass(ele, cls) {
	    if ((0, _types.isUndef)(ele)) {
	        return;
	    }
	
	    if (supportsClassList()) {
	        ele.classList.remove(cls);
	        return;
	    }
	    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'g');
	    ele.className = ele.className.replace(reg, '');
	};
	
	/**
	 * Creates and returns an option element
	 * @param  {String}  text  option text
	 * @param  {String}  value option value
	 * @param  {Boolean} isSel whether option is selected
	 * @return {Object}        option element
	 */
	var createOpt = exports.createOpt = function createOpt(text, value, isSel) {
	    var isSelected = isSel ? true : false;
	    var opt = isSelected ? createElm('option', ['value', value], ['selected', 'true']) : createElm('option', ['value', value]);
	    opt.appendChild(createText(text));
	    return opt;
	};
	
	/**
	 * Creates and returns a checklist item
	 * @param  {Number} chkIndex  index of check item
	 * @param  {String} chkValue  check item value
	 * @param  {String} labelText check item label text
	 * @return {Object}           li DOM element
	 */
	var createCheckItem = exports.createCheckItem = function createCheckItem(chkIndex, chkValue, labelText) {
	    var li = createElm('li');
	    var label = createElm('label', ['for', chkIndex]);
	    var check = createElm('input', ['id', chkIndex], ['name', chkIndex], ['type', 'checkbox'], ['value', chkValue]);
	    label.appendChild(check);
	    label.appendChild(createText(labelText));
	    li.appendChild(label);
	    li.label = label;
	    li.check = check;
	    return li;
	};
	
	/**
	 * Returns the element matching the supplied Id
	 * @param  {String} id  Element identifier
	 * @return {DOMElement}
	 */
	var elm = exports.elm = function elm(id) {
	    return doc.getElementById(id);
	};
	
	/**
	 * Returns list of element matching the supplied tag name
	 * @param  {String} tagname  Tag name
	 * @return {NodeList}
	 */
	var tag = exports.tag = function tag(o, tagname) {
	    return o.getElementsByTagName(tagname);
	};
	
	// HTML5 classList API
	function supportsClassList() {
	    return doc.documentElement.classList;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	/**
	 * Types utilities
	 */
	
	var UNDEFINED = void 0;
	
	/**
	 * Check passed argument is an object
	 * @param  {Object}  obj
	 * @return {Boolean}
	 */
	var isObj = exports.isObj = function isObj(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	};
	
	/**
	 * Check passed argument is a function
	 * @param  {Function} obj
	 * @return {Boolean}
	 */
	var isFn = exports.isFn = function isFn(obj) {
	  return Object.prototype.toString.call(obj) === '[object Function]';
	};
	
	/**
	 * Check passed argument is an array
	 * @param  {Array}  obj
	 * @return {Boolean}
	 */
	var isArray = exports.isArray = function isArray(obj) {
	  return Object.prototype.toString.call(obj) === '[object Array]';
	};
	
	/**
	 * Check passed argument is a string
	 * @param {String} obj objue
	 * @returns {Boolean}
	 */
	var isString = exports.isString = function isString(obj) {
	  return Object.prototype.toString.call(obj) === '[object String]';
	};
	
	/**
	 * Check passed argument is a number
	 * @param {Number} obj
	 * @returns {Boolean}
	 */
	var isNumber = exports.isNumber = function isNumber(obj) {
	  return Object.prototype.toString.call(obj) === '[object Number]';
	};
	
	/**
	 * Check passed argument is undefined
	 * @param  {Any}  obj
	 * @return {Boolean}
	 */
	var isUndef = exports.isUndef = function isUndef(obj) {
	  return obj === UNDEFINED;
	};
	
	/**
	 * Check passed argument is null
	 * @param  {Any}  obj
	 * @return {Boolean}
	 */
	var isNull = exports.isNull = function isNull(obj) {
	  return obj === null;
	};
	
	/**
	 * Check passed argument is empty (undefined, null or empty string)
	 * @param  {Any}  obj
	 * @return {Boolean}
	 */
	var isEmpty = exports.isEmpty = function isEmpty(obj) {
	  return isUndef(obj) || isNull(obj) || obj.length === 0;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * String utilities
	 */
	
	/**
	 * Removes whitespace from both sides of passed string
	 * @param  {String} text
	 * @return {String}
	 */
	var trim = exports.trim = function trim(text) {
	    if (text.trim) {
	        return text.trim();
	    }
	    return text.replace(/^\s*|\s*$/g, '');
	};
	
	/**
	 * Checks if passed string is empty
	 * @param {String} text
	 * @return {Boolean}
	 */
	var isEmpty = exports.isEmpty = function isEmpty(text) {
	    return trim(text) === '';
	};
	
	/**
	 * Makes regex safe string by escaping special characters from passed string
	 * @param {String} text
	 * @return {String} escaped string
	 */
	var rgxEsc = exports.rgxEsc = function rgxEsc(text) {
	    var chars = /[-\/\\^$*+?.()|[\]{}]/g;
	    var escMatch = '\\$&';
	    return String(text).replace(chars, escMatch);
	};
	
	/**
	 * Returns passed string as lowercase if caseSensitive flag set false. By
	 * default it returns the string with no casing changes.
	 * @param {String} text
	 * @return {String} string
	 */
	var matchCase = exports.matchCase = function matchCase(text) {
	    var caseSensitive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	    if (!caseSensitive) {
	        return text.toLowerCase();
	    }
	    return text;
	};
	
	/**
	 * Checks if passed data contains the searched term
	 * @param  {String} term           Searched term
	 * @param  {String} data           Data string
	 * @param  {Boolean} exactMatch    Exact match
	 * @param  {Boolean} caseSensitive Case sensitive
	 * @return {Boolean}
	 */
	var contains = exports.contains = function contains(term, data) {
	    var exactMatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    var caseSensitive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	    // Improved by Cedric Wartel (cwl) automatic exact match for selects and
	    // special characters are now filtered
	    var regexp = void 0;
	    var modifier = caseSensitive ? 'g' : 'gi';
	    if (exactMatch) {
	        regexp = new RegExp('(^\\s*)' + rgxEsc(term) + '(\\s*$)', modifier);
	    } else {
	        regexp = new RegExp(rgxEsc(term), modifier);
	    }
	    return regexp.test(data);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parse = undefined;
	
	var _types = __webpack_require__(4);
	
	/**
	 * Takes a string, removes all formatting/cruft and returns the raw float value
	 * @param {String} Formatted number
	 * @param {String} Decimal type '.' or ','
	 * @return {Number} Unformatted number
	 *
	 * https://github.com/openexchangerates/accounting.js/blob/master/accounting.js
	 */
	var parse = exports.parse = function parse(value) {
	    var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
	
	    // Return the value as-is if it's already a number
	    if ((0, _types.isNumber)(value)) {
	        return value;
	    }
	
	    // Build regex to strip out everything except digits, decimal point and
	    // minus sign
	    var regex = new RegExp('[^0-9-' + decimal + ']', ['g']);
	    var unformatted = parseFloat(('' + value).replace(/\((.*)\)/, '-$1') // replace bracketed values with negatives
	    .replace(regex, '') // strip out any cruft
	    .replace(decimal, '.') // make sure decimal point is standard
	    );
	
	    // This will fail silently
	    return !isNaN(unformatted) ? unformatted : 0;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Event emitter class
	 */
	var Emitter = exports.Emitter = function () {
	    /**
	     * Creates an instance of Emitter.
	     */
	    function Emitter() {
	        _classCallCheck(this, Emitter);
	
	        /**
	         * Events object
	         * @type {Object}
	         */
	        this.events = {};
	    }
	
	    /**
	     * Subscribe to an event
	     * @param  {Array}   evts Collection of event names
	     * @param  {Function} fn  Function invoked when event is emitted
	     */
	
	
	    Emitter.prototype.on = function on(evts, fn) {
	        var _this = this;
	
	        evts.forEach(function (evt) {
	            _this.events[evt] = _this.events[evt] || [];
	            _this.events[evt].push(fn);
	        });
	    };
	
	    /**
	     * Unsubscribe to an event
	     * @param  {Array}   evts Collection of event names
	     * @param  {Function} fn  Function invoked when event is emitted
	     */
	
	
	    Emitter.prototype.off = function off(evts, fn) {
	        var _this2 = this;
	
	        evts.forEach(function (evt) {
	            if (evt in _this2.events) {
	                _this2.events[evt].splice(_this2.events[evt].indexOf(fn), 1);
	            }
	        });
	    };
	
	    /**
	     * Emit an event
	     * @param  {String} evt Event name followed by any other argument passed to
	     * the invoked function
	     */
	
	
	    Emitter.prototype.emit = function emit(evt /*, args...*/) {
	        if (evt in this.events) {
	            for (var i = 0; i < this.events[evt].length; i++) {
	                this.events[evt][i].apply(this, [].slice.call(arguments, 1));
	            }
	        }
	    };
	
	    return Emitter;
	}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GridLayout = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _event = __webpack_require__(1);
	
	var _string = __webpack_require__(5);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Grid layout, table with fixed headers
	 */
	var GridLayout = exports.GridLayout = function (_Feature) {
	    _inherits(GridLayout, _Feature);
	
	    /**
	     * Creates an instance of GridLayout
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function GridLayout(tf) {
	        _classCallCheck(this, GridLayout);
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'gridLayout'));
	
	        var f = _this.config;
	
	        /**
	         * Grid-layout container width as CSS string
	         * @type {String}
	         */
	        _this.width = f.grid_width || null;
	
	        /**
	         * Grid-layout container height as CSS string
	         * @type {String}
	         */
	        _this.height = f.grid_height || null;
	
	        /**
	         * Css class for main container element
	         * @type {String}
	         */
	        _this.mainContCssClass = f.grid_cont_css_class || 'grd_Cont';
	
	        /**
	         * Css class for body table container element
	         * @type {String}
	         */
	        _this.contCssClass = f.grid_tbl_cont_css_class || 'grd_tblCont';
	
	        /**
	         * Css class for headers table container element
	         * @type {String}
	         */
	        _this.headContCssClass = f.grid_tblHead_cont_css_class || 'grd_headTblCont';
	
	        /**
	         * Css class for toolbar container element (rows counter, paging etc.)
	         * @type {String}
	         */
	        _this.infDivCssClass = f.grid_inf_grid_css_class || 'grd_inf';
	
	        /**
	         * Index of the headers row, default: 0
	         * @type {Number}
	         */
	        _this.headRowIndex = f.grid_headers_row_index || 0;
	
	        /**
	         * Collection of the header row indexes to be moved into headers table
	         * @type {Array}
	         */
	        _this.headRows = f.grid_headers_rows || [0];
	
	        /**
	         * Enable or disable column filters generation, default: true
	         * @type {Boolean}
	         */
	        _this.enableFilters = f.grid_enable_default_filters === false ? false : true;
	
	        /**
	         * Enable or disable column headers, default: false
	         * @type {Boolean}
	         */
	        _this.noHeaders = Boolean(f.grid_no_headers);
	
	        /**
	         * Grid-layout default column widht as CSS string
	         * @type {String}
	         */
	        _this.defaultColWidth = f.grid_default_col_width || '100px';
	
	        /**
	         * List of column elements
	         * @type {Array}
	         * @private
	         */
	        _this.colElms = [];
	
	        /**
	         * Prefix for grid-layout main container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxMainTblCont = 'gridCont_';
	
	        /**
	         * Prefix for grid-layout body table container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxTblCont = 'tblCont_';
	
	        /**
	         * Prefix for grid-layout headers table container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxHeadTblCont = 'tblHeadCont_';
	
	        /**
	         * Prefix for grid-layout headers table ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxHeadTbl = 'tblHead_';
	
	        /**
	         * Prefix for grid-layout filter's cell ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxGridFltTd = '_td_';
	
	        /**
	         * Prefix for grid-layout header's cell ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxGridTh = 'tblHeadTh_';
	
	        /**
	         * Mark-up of original HTML table
	         * @type {String}
	         * @private
	         */
	        _this.sourceTblHtml = tf.tbl.outerHTML;
	
	        /**
	         * Indicates if working table has column elements
	         * @type {Boolean}
	         * @private
	         */
	        _this.tblHasColTag = (0, _dom.tag)(tf.tbl, 'col').length > 0 ? true : false;
	
	        /**
	         * Main container element
	         * @private
	         */
	        _this.tblMainCont = null;
	
	        /**
	         * Table container element
	         * @private
	         */
	        _this.tblCont = null;
	
	        /**
	         * Headers' table container element
	         * @private
	         */
	        _this.headTblCont = null;
	
	        /**
	         * Headers' table element
	         * @private
	         */
	        _this.headTbl = null;
	
	        // filters flag at TF level
	        tf.fltGrid = _this.enableFilters;
	        return _this;
	    }
	
	    /**
	     * Generates a grid with fixed headers
	     * TODO: reduce size of init by extracting single purposed methods
	     */
	
	
	    GridLayout.prototype.init = function init() {
	        var _this2 = this;
	
	        var tf = this.tf;
	        var tbl = tf.tbl;
	
	        if (this.initialized) {
	            return;
	        }
	
	        // Override relevant TableFilter properties
	        this.setOverrides();
	
	        // Assign default column widths
	        this.setDefaultColWidths();
	
	        // Initial table width
	        var tblW = this.initialTableWidth();
	
	        //Main container: it will contain all the elements
	        this.tblMainCont = this.createContainer(this.prfxMainTblCont + tf.id, 'div', this.mainContCssClass);
	        if (this.width) {
	            this.tblMainCont.style.width = this.width;
	        }
	        tbl.parentNode.insertBefore(this.tblMainCont, tbl);
	
	        //Table container: div wrapping content table
	        this.tblCont = this.createContainer(this.prfxTblCont + tf.id, 'div', this.contCssClass);
	        this.setConfigWidth(this.tblCont);
	        if (this.height) {
	            this.tblCont.style.height = this.height;
	        }
	        tbl.parentNode.insertBefore(this.tblCont, tbl);
	        var t = (0, _dom.removeElm)(tbl);
	        this.tblCont.appendChild(t);
	
	        //In case table width is expressed in %
	        if (tbl.style.width === '') {
	            tbl.style.width = ((0, _string.contains)('%', tblW) ? tbl.clientWidth : tblW) + 'px';
	        }
	
	        var d = (0, _dom.removeElm)(this.tblCont);
	        this.tblMainCont.appendChild(d);
	
	        //Headers table container: div wrapping headers table
	        this.headTblCont = this.createContainer(this.prfxHeadTblCont + tf.id, 'div', this.headContCssClass);
	        this.setConfigWidth(this.headTblCont);
	
	        //Headers table
	        this.headTbl = (0, _dom.createElm)('table', ['id', this.prfxHeadTbl + tf.id]);
	        var tH = (0, _dom.createElm)('tHead');
	
	        //1st row should be headers row, ids are added if not set
	        //Those ids are used by the sort feature
	        var hRow = tbl.rows[this.headRowIndex];
	        var sortTriggers = this.getSortTriggerIds(hRow);
	
	        //Filters row is created
	        var filtersRow = this.createFiltersRow();
	
	        //Headers row are moved from content table to headers table
	        this.setHeadersRow(tH);
	
	        this.headTbl.appendChild(tH);
	        if (tf.filtersRowIndex === 0) {
	            tH.insertBefore(filtersRow, hRow);
	        } else {
	            tH.appendChild(filtersRow);
	        }
	
	        this.headTblCont.appendChild(this.headTbl);
	        this.tblCont.parentNode.insertBefore(this.headTblCont, this.tblCont);
	
	        //THead needs to be removed in content table for sort feature
	        var thead = (0, _dom.tag)(tbl, 'thead');
	        if (thead.length > 0) {
	            tbl.removeChild(thead[0]);
	        }
	
	        //Headers table style
	        this.headTbl.style.tableLayout = 'fixed';
	        tbl.style.tableLayout = 'fixed';
	        this.headTbl.cellPadding = tbl.cellPadding;
	        this.headTbl.cellSpacing = tbl.cellSpacing;
	        // this.headTbl.style.width = tbl.style.width;
	
	        //content table without headers needs col widths to be reset
	        tf.setColWidths(this.headTbl);
	
	        //Headers container width
	        // this.headTblCont.style.width = this.tblCont.clientWidth+'px';
	
	        tbl.style.width = '';
	        //
	        this.headTbl.style.width = tbl.clientWidth + 'px';
	        //
	
	        //scroll synchronisation
	        (0, _event.addEvt)(this.tblCont, 'scroll', function (evt) {
	            var elm = (0, _event.targetEvt)(evt);
	            var scrollLeft = elm.scrollLeft;
	            _this2.headTblCont.scrollLeft = scrollLeft;
	            //New pointerX calc taking into account scrollLeft
	            // if(!o.isPointerXOverwritten){
	            //     try{
	            //         o.Evt.pointerX = function(evt){
	            //             let e = evt || global.event;
	            //             let bdScrollLeft = tf_StandardBody().scrollLeft +
	            //                 scrollLeft;
	            //             return (e.pageX + scrollLeft) ||
	            //                 (e.clientX + bdScrollLeft);
	            //         };
	            //         o.isPointerXOverwritten = true;
	            //     } catch(err) {
	            //         o.isPointerXOverwritten = false;
	            //     }
	            // }
	        });
	
	        // TODO: Trigger a custom event handled by sort extension
	        var sort = tf.extension('sort');
	        if (sort) {
	            sort.asyncSort = true;
	            sort.triggerIds = sortTriggers;
	        }
	
	        //Col elements are enough to keep column widths after sorting and
	        //filtering
	        this.setColumnElements();
	
	        if (tf.popupFilters) {
	            filtersRow.style.display = _const.NONE;
	        }
	
	        if (tbl.clientWidth !== this.headTbl.clientWidth) {
	            tbl.style.width = this.headTbl.clientWidth + 'px';
	        }
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Overrides TableFilter instance properties to adjust to grid layout mode
	     * @private
	     */
	
	
	    GridLayout.prototype.setOverrides = function setOverrides() {
	        var tf = this.tf;
	        tf.refRow = 0;
	        tf.headersRow = 0;
	        tf.filtersRowIndex = 1;
	        tf.isExternalFlt = true;
	    };
	
	    /**
	     * Set grid-layout default column widths if column widths are not defined
	     * @private
	     */
	
	
	    GridLayout.prototype.setDefaultColWidths = function setDefaultColWidths() {
	        var tf = this.tf;
	        if (tf.hasColWidths) {
	            return;
	        }
	        for (var k = 0, len = tf.getCellsNb(); k < len; k++) {
	            var colW = void 0;
	            var cell = tf.tbl.rows[tf.getHeadersRowIndex()].cells[k];
	            if (cell.width !== '') {
	                colW = cell.width;
	            } else if (cell.style.width !== '') {
	                colW = parseInt(cell.style.width, 10);
	            } else {
	                colW = this.defaultColWidth;
	            }
	            tf.colWidths[k] = colW;
	        }
	        tf.hasColWidths = true;
	        tf.setColWidths();
	    };
	
	    /**
	     * Initial table width
	     * @returns {Number}
	     * @private
	     */
	
	
	    GridLayout.prototype.initialTableWidth = function initialTableWidth() {
	        var tbl = this.tf.tbl;
	        var width = void 0; //initial table width
	
	        if (tbl.width !== '') {
	            width = tbl.width;
	        } else if (tbl.style.width !== '') {
	            width = tbl.style.width;
	        } else {
	            width = tbl.clientWidth;
	        }
	        return parseInt(width, 10);
	    };
	
	    /**
	     * Creates container element
	     * @param {String} id Element ID
	     * @param {String} tag Tag name
	     * @param {String} className Css class to assign to element
	     * @returns {DOMElement}
	     * @private
	     */
	
	
	    GridLayout.prototype.createContainer = function createContainer(id, tag, className) {
	        var element = (0, _dom.createElm)(tag, ['id', id]);
	        element.className = className;
	        return element;
	    };
	
	    /**
	     * Creates filters row with cells
	     * @returns {HTMLTableRowElement}
	     * @private
	     */
	
	
	    GridLayout.prototype.createFiltersRow = function createFiltersRow() {
	        var tf = this.tf;
	        var filtersRow = (0, _dom.createElm)('tr');
	        if (this.enableFilters && tf.fltGrid) {
	            tf.externalFltTgtIds = [];
	            for (var j = 0; j < tf.getCellsNb(); j++) {
	                var fltTdId = tf.prfxFlt + j + this.prfxGridFltTd + tf.id;
	                var cl = (0, _dom.createElm)(tf.fltCellTag, ['id', fltTdId]);
	                filtersRow.appendChild(cl);
	                tf.externalFltTgtIds[j] = fltTdId;
	            }
	        }
	        return filtersRow;
	    };
	
	    /**
	     * Generates column elements if necessary and assigns their widths
	     * @private
	     */
	
	
	    GridLayout.prototype.setColumnElements = function setColumnElements() {
	        var tf = this.tf;
	        var cols = (0, _dom.tag)(tf.tbl, 'col');
	        this.tblHasColTag = cols.length > 0;
	
	        for (var k = tf.nbCells - 1; k >= 0; k--) {
	            var col = void 0;
	            var id = tf.id + '_col_' + k;
	
	            if (!this.tblHasColTag) {
	                col = (0, _dom.createElm)('col', ['id', id]);
	                tf.tbl.insertBefore(col, tf.tbl.firstChild);
	            } else {
	                col = cols[k];
	                col.setAttribute('id', id);
	            }
	            col.style.width = tf.colWidths[k];
	            this.colElms[k] = col;
	        }
	        this.tblHasColTag = true;
	    };
	
	    /**
	     * Sets headers row in headers table
	     * @param {HTMLHeadElement} tableHead Table head element
	     * @private
	     */
	
	
	    GridLayout.prototype.setHeadersRow = function setHeadersRow(tableHead) {
	        if (this.noHeaders) {
	            // Handle table with no headers, assuming here headers do not
	            // exist
	            tableHead.appendChild((0, _dom.createElm)('tr'));
	        } else {
	            // Headers row are moved from content table to headers table
	            for (var i = 0; i < this.headRows.length; i++) {
	                var row = this.tf.tbl.rows[this.headRows[i]];
	                tableHead.appendChild(row);
	            }
	        }
	    };
	
	    /**
	     * Sets width defined in configuration to passed element
	     * @param {DOMElement} element DOM element
	     * @private
	     */
	
	
	    GridLayout.prototype.setConfigWidth = function setConfigWidth(element) {
	        if (!this.width) {
	            return;
	        }
	        if (this.width.indexOf('%') !== -1) {
	            element.style.width = '100%';
	        } else {
	            element.style.width = this.width;
	        }
	    };
	
	    /**
	     * Returns a list of header IDs used for specifing external sort triggers
	     * @param {HTMLTableRowElement} row DOM row element
	     * @returns {Array} List of IDs
	     * @private
	     */
	
	
	    GridLayout.prototype.getSortTriggerIds = function getSortTriggerIds(row) {
	        var tf = this.tf;
	        var sortTriggers = [];
	        for (var n = 0; n < tf.getCellsNb(); n++) {
	            var c = row.cells[n];
	            var thId = c.getAttribute('id');
	            if (!thId || thId === '') {
	                thId = this.prfxGridTh + n + '_' + tf.id;
	                c.setAttribute('id', thId);
	            }
	            sortTriggers.push(thId);
	        }
	        return sortTriggers;
	    };
	
	    /**
	     * Removes the grid layout
	     */
	
	
	    GridLayout.prototype.destroy = function destroy() {
	        var tf = this.tf;
	        var tbl = tf.tbl;
	
	        if (!this.initialized) {
	            return;
	        }
	        var t = (0, _dom.removeElm)(tbl);
	        this.tblMainCont.parentNode.insertBefore(t, this.tblMainCont);
	        (0, _dom.removeElm)(this.tblMainCont);
	
	        this.tblMainCont = null;
	        this.headTblCont = null;
	        this.headTbl = null;
	        this.tblCont = null;
	
	        tbl.outerHTML = this.sourceTblHtml;
	        //needed to keep reference of table element for future usage
	        this.tf.tbl = (0, _dom.elm)(tf.id);
	
	        this.initialized = false;
	    };
	
	    return GridLayout;
	}(_feature.Feature);

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NOTIMPLEMENTED = 'Not implemented.';
	
	/**
	 * Base class defining the interface of a TableFilter feature
	 */
	
	var Feature = exports.Feature = function () {
	  /**
	   * Creates an instance of Feature
	   * @param {Object} tf TableFilter instance
	   * @param {String} feature Feature name known by TableFilter
	   */
	  function Feature(tf, feature) {
	    _classCallCheck(this, Feature);
	
	    /**
	     * TableFilter instance
	     * @type {TableFilter}
	     */
	    this.tf = tf;
	
	    /**
	     * Feature name
	     * @type {String}
	     */
	    this.feature = feature;
	
	    /**
	     * TableFilter feature setting
	     * @type {Boolean}
	     */
	    this.enabled = tf[feature];
	
	    /**
	     * TableFilter configuration
	     * @type {Object}
	     */
	    this.config = tf.config();
	
	    /**
	     * TableFilter emitter instance
	     * @type {Emitter}
	     */
	    this.emitter = tf.emitter;
	
	    /**
	     * Field indicating whether Feature is initialized
	     * @type {Boolean}
	     */
	    this.initialized = false;
	  }
	
	  /**
	   * Initialize the feature
	   */
	
	
	  Feature.prototype.init = function init() {
	    throw new Error(NOTIMPLEMENTED);
	  };
	
	  /**
	   * Reset the feature after being disabled
	   */
	
	
	  Feature.prototype.reset = function reset() {
	    this.enable();
	    this.init();
	  };
	
	  /**
	   * Destroy the feature
	   */
	
	
	  Feature.prototype.destroy = function destroy() {
	    throw new Error(NOTIMPLEMENTED);
	  };
	
	  /**
	   * Enable the feature
	   */
	
	
	  Feature.prototype.enable = function enable() {
	    this.enabled = true;
	  };
	
	  /**
	   * Disable the feature
	   */
	
	
	  Feature.prototype.disable = function disable() {
	    this.enabled = false;
	  };
	
	  /**
	   * Indicate whether the feature is enabled or not
	   * @returns {Boolean}
	   */
	
	
	  Feature.prototype.isEnabled = function isEnabled() {
	    return this.enabled;
	  };
	
	  return Feature;
	}();

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Filter types
	 */
	
	/**
	 * Input filter type
	 * @type {String}
	 */
	var INPUT = exports.INPUT = 'input';
	/**
	 * Select filter type
	 * @type {String}
	 */
	var SELECT = exports.SELECT = 'select';
	/**
	 * Multiple select filter type
	 * @type {String}
	 */
	var MULTIPLE = exports.MULTIPLE = 'multiple';
	/**
	 * Checklist filter type
	 * @type {String}
	 */
	var CHECKLIST = exports.CHECKLIST = 'checklist';
	/**
	 * None filter type
	 * @type {String}
	 */
	var NONE = exports.NONE = 'none';
	
	/**
	 * Key codes
	 */
	
	/**
	 * Enter key code
	 * @type {Number}
	 */
	var ENTER_KEY = exports.ENTER_KEY = 13;
	/**
	 * Tab key code
	 * @type {Number}
	 */
	var TAB_KEY = exports.TAB_KEY = 9;
	/**
	 * Escape key code
	 * @type {Number}
	 */
	var ESC_KEY = exports.ESC_KEY = 27;
	/**
	 * Up arrow key code
	 * @type {Number}
	 */
	var UP_ARROW_KEY = exports.UP_ARROW_KEY = 38;
	/**
	 * Down arrow key code
	 * @type {Number}
	 */
	var DOWN_ARROW_KEY = exports.DOWN_ARROW_KEY = 40;
	
	/**
	 * HTML tags
	 */
	
	/**
	 * Header cell tag
	 * @type {String}
	 */
	var HEADER_TAG = exports.HEADER_TAG = 'TH';
	/**
	 * Cell tag
	 * @type {String}
	 */
	var CELL_TAG = exports.CELL_TAG = 'TD';
	
	/**
	 * Data types
	 */
	
	/**
	 * String
	 * @type {String}
	 */
	var STRING = exports.STRING = 'string';
	
	/**
	 * Number
	 * @type {String}
	 */
	var NUMBER = exports.NUMBER = 'number';
	
	/**
	 * Formatted number
	 * @type {String}
	 */
	var FORMATTED_NUMBER = exports.FORMATTED_NUMBER = 'formatted-number';
	
	/**
	 * Date
	 * @type {String}
	 */
	var DATE = exports.DATE = 'date';
	
	/**
	 * IP address
	 * @type {String}
	 */
	var IP_ADDRESS = exports.IP_ADDRESS = 'ipaddress';
	
	/**
	 * Default values
	 */
	
	/**
	 * Auto filter delay in milliseconds
	 * @type {Number}
	 */
	var AUTO_FILTER_DELAY = exports.AUTO_FILTER_DELAY = 750;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Loader = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	var _root = __webpack_require__(2);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Activity indicator
	 *
	 * @export
	 * @class Loader
	 * @extends {Feature}
	 */
	var Loader = exports.Loader = function (_Feature) {
	    _inherits(Loader, _Feature);
	
	    /**
	     * Creates an instance of Loader.
	     *
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function Loader(tf) {
	        _classCallCheck(this, Loader);
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'loader'));
	
	        var f = _this.config;
	
	        /**
	         * ID of custom container element
	         * @type {String}
	         */
	        _this.targetId = f.loader_target_id || null;
	
	        /**
	         * Loader container DOM element
	         * @type {DOMElement}
	         */
	        _this.cont = null;
	
	        /**
	         * Text displayed when indicator is visible
	         * @type {String}
	         */
	        _this.text = f.loader_text || 'Loading...';
	
	        /**
	         * Custom HTML injected in Loader's container element
	         * @type {String}
	         */
	        _this.html = f.loader_html || null;
	
	        /**
	         * Css class for Loader's container element
	         * @type {String}
	         */
	        _this.cssClass = f.loader_css_class || 'loader';
	
	        /**
	         * Close delay in milliseconds
	         * @type {Number}
	         */
	        _this.closeDelay = 250;
	
	        /**
	         * Callback fired when loader is displayed
	         * @type {Function}
	         */
	        _this.onShow = (0, _types.isFn)(f.on_show_loader) ? f.on_show_loader : null;
	
	        /**
	         * Callback fired when loader is closed
	         * @type {Function}
	         */
	        _this.onHide = (0, _types.isFn)(f.on_hide_loader) ? f.on_hide_loader : null;
	
	        /**
	         * Prefix for container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfx = 'load_';
	        return _this;
	    }
	
	    /**
	     * Initializes Loader instance
	     */
	
	
	    Loader.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var tf = this.tf;
	        var emitter = this.emitter;
	
	        var containerDiv = (0, _dom.createElm)('div', ['id', this.prfx + tf.id]);
	        containerDiv.className = this.cssClass;
	
	        var targetEl = !this.targetId ? tf.tbl.parentNode : (0, _dom.elm)(this.targetId);
	        if (!this.targetId) {
	            targetEl.insertBefore(containerDiv, tf.tbl);
	        } else {
	            targetEl.appendChild(containerDiv);
	        }
	        this.cont = containerDiv;
	        if (!this.html) {
	            this.cont.appendChild((0, _dom.createText)(this.text));
	        } else {
	            this.cont.innerHTML = this.html;
	        }
	
	        this.show(_const.NONE);
	
	        // Subscribe to events
	        emitter.on(['before-filtering', 'before-populating-filter', 'before-page-change', 'before-clearing-filters', 'before-page-length-change', 'before-reset-page', 'before-reset-page-length', 'before-loading-extensions', 'before-loading-themes'], function () {
	            return _this2.show('');
	        });
	        emitter.on(['after-filtering', 'after-populating-filter', 'after-page-change', 'after-clearing-filters', 'after-page-length-change', 'after-reset-page', 'after-reset-page-length', 'after-loading-extensions', 'after-loading-themes'], function () {
	            return _this2.show(_const.NONE);
	        });
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Shows or hides activity indicator
	     * @param {String} Two possible values: '' or 'none'
	     */
	
	
	    Loader.prototype.show = function show(p) {
	        var _this3 = this;
	
	        if (!this.isEnabled()) {
	            return;
	        }
	
	        var displayLoader = function displayLoader() {
	            if (!_this3.cont) {
	                return;
	            }
	            if (_this3.onShow && p !== _const.NONE) {
	                _this3.onShow.call(null, _this3);
	            }
	            _this3.cont.style.display = p;
	            if (_this3.onHide && p === _const.NONE) {
	                _this3.onHide.call(null, _this3);
	            }
	        };
	
	        var t = p === _const.NONE ? this.closeDelay : 1;
	        _root.root.setTimeout(displayLoader, t);
	    };
	
	    /**
	     * Removes feature
	     */
	
	
	    Loader.prototype.destroy = function destroy() {
	        var _this4 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        var emitter = this.emitter;
	
	        (0, _dom.removeElm)(this.cont);
	        this.cont = null;
	
	        // Unsubscribe to events
	        emitter.off(['before-filtering', 'before-populating-filter', 'before-page-change', 'before-clearing-filters', 'before-page-length-change', 'before-reset-page', 'before-reset-page-length', 'before-loading-extensions', 'before-loading-themes'], function () {
	            return _this4.show('');
	        });
	        emitter.off(['after-filtering', 'after-populating-filter', 'after-page-change', 'after-clearing-filters', 'after-page-length-change', 'after-reset-page', 'after-reset-page-length', 'after-loading-extensions', 'after-loading-themes'], function () {
	            return _this4.show(_const.NONE);
	        });
	
	        this.initialized = false;
	    };
	
	    return Loader;
	}(_feature.Feature);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HighlightKeyword = undefined;
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Highlight matched keywords upon filtering
	 *
	 * @export
	 * @class HighlightKeyword
	 */
	var HighlightKeyword = exports.HighlightKeyword = function () {
	
	    /**
	     * Creates an instance of HighlightKeyword
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function HighlightKeyword(tf) {
	        _classCallCheck(this, HighlightKeyword);
	
	        var f = tf.config();
	
	        /**
	         * Css class for highlighted term
	         * @type {String}
	         */
	        this.highlightCssClass = f.highlight_css_class || 'keyword';
	
	        /**
	         * TableFilter instance
	         * @type {TableFilter}
	         */
	        this.tf = tf;
	
	        /**
	         * TableFilter's emitter instance
	         * @type {Emitter}
	         */
	        this.emitter = tf.emitter;
	    }
	
	    /**
	     * Initializes HighlightKeyword instance
	     */
	
	
	    HighlightKeyword.prototype.init = function init() {
	        var _this = this;
	
	        this.emitter.on(['before-filtering', 'destroy'], function () {
	            return _this.unhighlightAll();
	        });
	        this.emitter.on(['highlight-keyword'], function (tf, cell, term) {
	            return _this.highlight(cell, term, _this.highlightCssClass);
	        });
	    };
	
	    /**
	     * Highlight occurences of searched term in passed node
	     * @param  {Node} node
	     * @param  {String} term     Searched term
	     * @param  {String} cssClass Css class name
	     *
	     * TODO: refactor this method
	     */
	
	
	    HighlightKeyword.prototype.highlight = function highlight(node, term, cssClass) {
	        // Iterate into this nodes childNodes
	        if (node.hasChildNodes) {
	            var children = node.childNodes;
	            for (var i = 0; i < children.length; i++) {
	                this.highlight(children[i], term, cssClass);
	            }
	        }
	
	        if (node.nodeType === 3) {
	            var nodeVal = node.nodeValue.toLowerCase();
	            var termIdx = nodeVal.indexOf(term.toLowerCase());
	
	            if (termIdx !== -1) {
	                var pn = node.parentNode;
	                if (pn && pn.className !== cssClass) {
	                    // term not highlighted yet
	                    var nv = node.nodeValue,
	
	                    // Create a load of replacement nodes
	                    before = (0, _dom.createText)(nv.substr(0, termIdx)),
	                        value = nv.substr(termIdx, term.length),
	                        after = (0, _dom.createText)(nv.substr(termIdx + term.length)),
	                        text = (0, _dom.createText)(value),
	                        container = (0, _dom.createElm)('span');
	                    container.className = cssClass;
	                    container.appendChild(text);
	                    pn.insertBefore(before, node);
	                    pn.insertBefore(container, node);
	                    pn.insertBefore(after, node);
	                    pn.removeChild(node);
	                }
	            }
	        }
	    };
	
	    /**
	     * Removes highlight to nodes matching passed string
	     * @param  {String} term
	     * @param  {String} cssClass Css class to remove
	     */
	
	
	    HighlightKeyword.prototype.unhighlight = function unhighlight(term, cssClass) {
	        var highlightedNodes = this.tf.tbl.querySelectorAll('.' + cssClass);
	        for (var i = 0; i < highlightedNodes.length; i++) {
	            var n = highlightedNodes[i];
	            var nodeVal = (0, _dom.getText)(n);
	
	            if (nodeVal.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
	                var parentNode = n.parentNode;
	                parentNode.replaceChild((0, _dom.createText)(nodeVal), n);
	                parentNode.normalize();
	            }
	        }
	    };
	
	    /**
	     * Clear all occurrences of highlighted nodes
	     */
	
	
	    HighlightKeyword.prototype.unhighlightAll = function unhighlightAll() {
	        var _this2 = this;
	
	        if (!this.tf.highlightKeywords) {
	            return;
	        }
	        // iterate filters values to unhighlight all values
	        this.tf.getFiltersValue().forEach(function (val) {
	            if ((0, _types.isArray)(val)) {
	                val.forEach(function (item) {
	                    return _this2.unhighlight(item, _this2.highlightCssClass);
	                });
	            } else {
	                _this2.unhighlight(val, _this2.highlightCssClass);
	            }
	        });
	    };
	
	    /**
	     * Remove feature
	     */
	
	
	    HighlightKeyword.prototype.destroy = function destroy() {
	        var _this3 = this;
	
	        this.emitter.off(['before-filtering', 'destroy'], function () {
	            return _this3.unhighlightAll();
	        });
	        this.emitter.off(['highlight-keyword'], function (tf, cell, term) {
	            return _this3.highlight(cell, term, _this3.highlightCssClass);
	        });
	    };
	
	    return HighlightKeyword;
	}();

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PopupFilter = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _types = __webpack_require__(4);
	
	var _dom = __webpack_require__(3);
	
	var _event = __webpack_require__(1);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Pop-up filter component
	 * @export
	 * @class PopupFilter
	 * @extends {Feature}
	 */
	var PopupFilter = exports.PopupFilter = function (_Feature) {
	    _inherits(PopupFilter, _Feature);
	
	    /**
	     * Creates an instance of PopupFilter
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function PopupFilter(tf) {
	        _classCallCheck(this, PopupFilter);
	
	        // Configuration object
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'popupFilters'));
	
	        var f = _this.config;
	
	        // Enable external filters
	        tf.isExternalFlt = true;
	        tf.externalFltTgtIds = [];
	
	        /**
	         * Filter icon path
	         * @type {String}
	         */
	        _this.iconPath = f.popup_filters_image || tf.themesPath + 'icn_filter.gif';
	
	        /**
	         * Active filter icon path
	         * @type {string}
	         */
	        _this.activeIconPath = f.popup_filters_image_active || tf.themesPath + 'icn_filterActive.gif';
	
	        /**
	         * HTML for the filter icon
	         * @type {string}
	         */
	        _this.iconHtml = f.popup_filters_image_html || '<img src="' + _this.iconPath + '" alt="Column filter" />';
	
	        /**
	         * Css class assigned to filter container element
	         * @type {String}
	         */
	        _this.containerCssClass = f.popup_div_css_class || 'popUpFilter';
	
	        /**
	         * Callback fired before a popup filter is opened
	         * @type {Function}
	         */
	        _this.onBeforeOpen = (0, _types.isFn)(f.on_before_popup_filter_open) ? f.on_before_popup_filter_open : null;
	
	        /**
	         * Callback fired after a popup filter is opened
	         * @type {Function}
	         */
	        _this.onAfterOpen = (0, _types.isFn)(f.on_after_popup_filter_open) ? f.on_after_popup_filter_open : null;
	
	        /**
	         * Callback fired before a popup filter is closed
	         * @type {Function}
	         */
	        _this.onBeforeClose = (0, _types.isFn)(f.on_before_popup_filter_close) ? f.on_before_popup_filter_close : null;
	
	        /**
	         * Callback fired after a popup filter is closed
	         * @type {Function}
	         */
	        _this.onAfterClose = (0, _types.isFn)(f.on_after_popup_filter_close) ? f.on_after_popup_filter_close : null;
	
	        /**
	         * Collection of filters spans
	         * @type {Array}
	         * @private
	         */
	        _this.fltSpans = [];
	
	        /**
	         * Collection of filters icons
	         * @type {Array}
	         * @private
	         */
	        _this.fltIcons = [];
	
	        /**
	         * Collection of filters icons cached after pop-up filters are removed
	         * @type {Array}
	         * @private
	         */
	        _this.filtersCache = null;
	
	        /**
	         * Collection of filters containers
	         * @type {Array}
	         * @private
	         */
	        _this.fltElms = _this.filtersCache || [];
	
	        /**
	         * Ensure filter's container element width matches column width
	         * @type {Boolean}
	         */
	        _this.adjustToContainer = true;
	
	        /**
	         * Prefix for pop-up filter span ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxSpan = 'popUpSpan_';
	
	        /**
	         * Prefix for pop-up filter container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxDiv = 'popUpDiv_';
	        return _this;
	    }
	
	    /**
	     * Click event handler for pop-up filter icon
	     * @private
	     */
	
	
	    PopupFilter.prototype.onClick = function onClick(evt) {
	        var elm = (0, _event.targetEvt)(evt).parentNode,
	            colIndex = parseInt(elm.getAttribute('ci'), 10);
	
	        this.closeAll(colIndex);
	        this.toggle(colIndex);
	
	        if (this.adjustToContainer) {
	            var popUpDiv = this.fltElms[colIndex],
	                header = this.tf.getHeaderElement(colIndex),
	                headerWidth = header.clientWidth * 0.95;
	            popUpDiv.style.width = parseInt(headerWidth, 10) + 'px';
	        }
	        (0, _event.cancelEvt)(evt);
	        (0, _event.stopEvt)(evt);
	    };
	
	    /**
	     * Initialize DOM elements
	     */
	
	
	    PopupFilter.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var tf = this.tf;
	
	        // Override headers row index if no grouped headers
	        // TODO: Because of the filters row generation, headers row index needs
	        // adjusting: prevent useless row generation
	        if (tf.headersRow <= 1 && isNaN(tf.config().headers_row_index)) {
	            tf.headersRow = 0;
	        }
	
	        // Adjust headers row index for grid-layout mode
	        // TODO: Because of the filters row generation, headers row index needs
	        // adjusting: prevent useless row generation
	        if (tf.gridLayout) {
	            tf.headersRow--;
	            this.buildIcons();
	        }
	
	        // subscribe to events
	        this.emitter.on(['before-filtering'], function () {
	            return _this2.setIconsState();
	        });
	        this.emitter.on(['after-filtering'], function () {
	            return _this2.closeAll();
	        });
	        this.emitter.on(['cell-processed'], function (tf, cellIndex) {
	            return _this2.changeState(cellIndex, true);
	        });
	        this.emitter.on(['filters-row-inserted'], function () {
	            return _this2.buildIcons();
	        });
	        this.emitter.on(['before-filter-init'], function (tf, colIndex) {
	            return _this2.build(colIndex);
	        });
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Reset previously destroyed feature
	     */
	
	
	    PopupFilter.prototype.reset = function reset() {
	        this.enable();
	        this.init();
	        this.buildAll();
	    };
	
	    /**
	     * Build all filters icons
	     */
	
	
	    PopupFilter.prototype.buildIcons = function buildIcons() {
	        var _this3 = this;
	
	        var tf = this.tf;
	
	        // TODO: Because of the filters row generation, headers row index needs
	        // adjusting: prevent useless row generation
	        tf.headersRow++;
	
	        for (var i = 0; i < tf.nbCells; i++) {
	            if (tf.getFilterType(i) === _const.NONE) {
	                continue;
	            }
	            var popUpSpan = (0, _dom.createElm)('span', ['id', this.prfxSpan + tf.id + '_' + i], ['ci', i]);
	            popUpSpan.innerHTML = this.iconHtml;
	            var header = tf.getHeaderElement(i);
	            header.appendChild(popUpSpan);
	            (0, _event.addEvt)(popUpSpan, 'click', function (evt) {
	                return _this3.onClick(evt);
	            });
	            this.fltSpans[i] = popUpSpan;
	            this.fltIcons[i] = popUpSpan.firstChild;
	        }
	    };
	
	    /**
	     * Build all pop-up filters elements
	     */
	
	
	    PopupFilter.prototype.buildAll = function buildAll() {
	        for (var i = 0; i < this.filtersCache.length; i++) {
	            this.build(i, this.filtersCache[i]);
	        }
	    };
	
	    /**
	     * Build a specified pop-up filter elements
	     * @param  {Number} colIndex Column index
	     * @param  {Object} div      Optional container DOM element
	     */
	
	
	    PopupFilter.prototype.build = function build(colIndex, div) {
	        var tf = this.tf;
	        var popUpDiv = !div ? (0, _dom.createElm)('div', ['id', this.prfxDiv + tf.id + '_' + colIndex]) : div;
	        popUpDiv.className = this.containerCssClass;
	        tf.externalFltTgtIds.push(popUpDiv.id);
	        var header = tf.getHeaderElement(colIndex);
	        header.insertBefore(popUpDiv, header.firstChild);
	        (0, _event.addEvt)(popUpDiv, 'click', function (evt) {
	            return (0, _event.stopEvt)(evt);
	        });
	        this.fltElms[colIndex] = popUpDiv;
	    };
	
	    /**
	     * Toogle visibility of specified filter
	     * @param  {Number} colIndex Column index
	     */
	
	
	    PopupFilter.prototype.toggle = function toggle(colIndex) {
	        var tf = this.tf,
	            popUpFltElm = this.fltElms[colIndex];
	
	        if (popUpFltElm.style.display === _const.NONE || popUpFltElm.style.display === '') {
	            if (this.onBeforeOpen) {
	                this.onBeforeOpen.call(null, this, this.fltElms[colIndex], colIndex);
	            }
	            popUpFltElm.style.display = 'block';
	            if (tf.getFilterType(colIndex) === _const.INPUT) {
	                var flt = tf.getFilterElement(colIndex);
	                if (flt) {
	                    flt.focus();
	                }
	            }
	            if (this.onAfterOpen) {
	                this.onAfterOpen.call(null, this, this.fltElms[colIndex], colIndex);
	            }
	        } else {
	            if (this.onBeforeClose) {
	                this.onBeforeClose.call(null, this, this.fltElms[colIndex], colIndex);
	            }
	            popUpFltElm.style.display = _const.NONE;
	            if (this.onAfterClose) {
	                this.onAfterClose.call(null, this, this.fltElms[colIndex], colIndex);
	            }
	        }
	    };
	
	    /**
	     * Close all filters excepted for the specified one if any
	     * @param  {Number} exceptIdx Column index of the filter to not close
	     */
	
	
	    PopupFilter.prototype.closeAll = function closeAll(exceptIdx) {
	        for (var i = 0; i < this.fltElms.length; i++) {
	            if (i === exceptIdx) {
	                continue;
	            }
	            var popUpFltElm = this.fltElms[i];
	            if (popUpFltElm) {
	                popUpFltElm.style.display = _const.NONE;
	            }
	        }
	    };
	
	    /**
	     * Build all the icons representing the pop-up filters
	     */
	
	
	    PopupFilter.prototype.setIconsState = function setIconsState() {
	        for (var i = 0; i < this.fltIcons.length; i++) {
	            this.changeState(i, false);
	        }
	    };
	
	    /**
	     * Apply specified icon state
	     * @param  {Number} colIndex Column index
	     * @param  {Boolean} active   Apply active state
	     */
	
	
	    PopupFilter.prototype.changeState = function changeState(colIndex, active) {
	        if (this.fltIcons[colIndex]) {
	            this.fltIcons[colIndex].src = active ? this.activeIconPath : this.iconPath;
	        }
	    };
	
	    /**
	     * Remove pop-up filters
	     */
	
	
	    PopupFilter.prototype.destroy = function destroy() {
	        var _this4 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        this.filtersCache = [];
	        for (var i = 0; i < this.fltElms.length; i++) {
	            var popUpFltElm = this.fltElms[i],
	                popUpFltSpan = this.fltSpans[i],
	                popUpFltImg = this.fltIcons[i];
	            if (popUpFltElm) {
	                (0, _dom.removeElm)(popUpFltElm);
	                this.filtersCache[i] = popUpFltElm;
	            }
	            popUpFltElm = null;
	            if (popUpFltSpan) {
	                (0, _dom.removeElm)(popUpFltSpan);
	            }
	            popUpFltSpan = null;
	            if (popUpFltImg) {
	                (0, _dom.removeElm)(popUpFltImg);
	            }
	            popUpFltImg = null;
	        }
	        this.fltElms = [];
	        this.fltSpans = [];
	        this.fltIcons = [];
	
	        // unsubscribe to events
	        this.emitter.off(['before-filtering'], function () {
	            return _this4.setIconsState();
	        });
	        this.emitter.off(['after-filtering'], function () {
	            return _this4.closeAll();
	        });
	        this.emitter.off(['cell-processed'], function (tf, cellIndex) {
	            return _this4.changeState(cellIndex, true);
	        });
	        this.emitter.off(['filters-row-inserted'], function () {
	            return _this4.buildIcons();
	        });
	        this.emitter.off(['before-filter-init'], function (tf, colIndex) {
	            return _this4.build(colIndex);
	        });
	
	        this.initialized = false;
	    };
	
	    return PopupFilter;
	}(_feature.Feature);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Dropdown = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _array = __webpack_require__(15);
	
	var _string = __webpack_require__(5);
	
	var _sort = __webpack_require__(16);
	
	var _event = __webpack_require__(1);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SORT_ERROR = 'Filter options for column {0} cannot be sorted in ' + '{1} manner.';
	
	/**
	 * Dropdown filter UI component
	 */
	
	var Dropdown = exports.Dropdown = function (_Feature) {
	    _inherits(Dropdown, _Feature);
	
	    /**
	     * Creates an instance of Dropdown
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function Dropdown(tf) {
	        _classCallCheck(this, Dropdown);
	
	        // Configuration object
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'dropdown'));
	
	        var f = _this.config;
	
	        /**
	         * Enable the reset filter option as first item
	         * @type {Boolean}
	         */
	        _this.enableSlcResetFilter = f.enable_slc_reset_filter === false ? false : true;
	
	        /**
	         * Non empty option text
	         * @type {String}
	         */
	        _this.nonEmptyText = f.non_empty_text || '(Non empty)';
	
	        /**
	         * Tooltip text appearing on multiple select
	         * @type {String}
	         */
	        _this.multipleSlcTooltip = f.multiple_slc_tooltip || 'Use Ctrl/Cmd key for multiple selections';
	
	        /**
	         * Indicates drop-down has custom options
	         * @private
	         */
	        _this.isCustom = null;
	
	        /**
	         * List of options values
	         * @type {Array}
	         * @private
	         */
	        _this.opts = null;
	
	        /**
	         * List of options texts for custom values
	         * @type {Array}
	         * @private
	         */
	        _this.optsTxt = null;
	        return _this;
	    }
	
	    /**
	     * Drop-down filter focus event handler
	     * @param {Event} e DOM Event
	     * @private
	     */
	
	
	    Dropdown.prototype.onSlcFocus = function onSlcFocus(e) {
	        var elm = (0, _event.targetEvt)(e);
	        var tf = this.tf;
	        // select is populated when element has focus
	        if (tf.loadFltOnDemand && elm.getAttribute('filled') === '0') {
	            var ct = elm.getAttribute('ct');
	            this.build(ct);
	        }
	        this.emitter.emit('filter-focus', tf, elm);
	    };
	
	    /**
	     * Drop-down filter change event handler
	     * @private
	     */
	
	
	    Dropdown.prototype.onSlcChange = function onSlcChange() {
	        if (this.tf.onSlcChange) {
	            this.tf.filter();
	        }
	    };
	
	    /**
	     * Initialize drop-down filter
	     * @param  {Number}     colIndex   Column index
	     * @param  {Boolean}    isExternal External filter flag
	     * @param  {DOMElement} container  Dom element containing the filter
	     */
	
	
	    Dropdown.prototype.init = function init(colIndex, isExternal, container) {
	        var _this2 = this;
	
	        var tf = this.tf;
	        var col = tf.getFilterType(colIndex);
	        var externalFltTgtId = isExternal ? tf.externalFltTgtIds[colIndex] : null;
	
	        var slc = (0, _dom.createElm)(_const.SELECT, ['id', tf.prfxFlt + colIndex + '_' + tf.id], ['ct', colIndex], ['filled', '0']);
	
	        if (col === _const.MULTIPLE) {
	            slc.multiple = _const.MULTIPLE;
	            slc.title = this.multipleSlcTooltip;
	        }
	        slc.className = col.toLowerCase() === _const.SELECT ? tf.fltCssClass : tf.fltMultiCssClass;
	
	        //filter is appended in container element
	        if (externalFltTgtId) {
	            (0, _dom.elm)(externalFltTgtId).appendChild(slc);
	        } else {
	            container.appendChild(slc);
	        }
	
	        tf.fltIds.push(slc.id);
	
	        if (!tf.loadFltOnDemand) {
	            this.build(colIndex);
	        } else {
	            //1st option is created here since build isn't invoked
	            var opt0 = (0, _dom.createOpt)(tf.displayAllText, '');
	            slc.appendChild(opt0);
	        }
	
	        (0, _event.addEvt)(slc, 'change', function () {
	            return _this2.onSlcChange();
	        });
	        (0, _event.addEvt)(slc, 'focus', function (e) {
	            return _this2.onSlcFocus(e);
	        });
	
	        this.emitter.on(['build-select-filter'], function (tf, colIndex, isLinked, isExternal) {
	            return _this2.build(colIndex, isLinked, isExternal);
	        });
	        this.emitter.on(['select-options'], function (tf, colIndex, values) {
	            return _this2.selectOptions(colIndex, values);
	        });
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Build drop-down filter UI
	     * @param  {Number}  colIndex    Column index
	     * @param  {Boolean} isLinked    Enable linked refresh behaviour
	     */
	
	
	    Dropdown.prototype.build = function build(colIndex) {
	        var isLinked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        var tf = this.tf;
	        colIndex = parseInt(colIndex, 10);
	
	        this.emitter.emit('before-populating-filter', tf, colIndex);
	
	        this.opts = [];
	        this.optsTxt = [];
	
	        var slcId = tf.fltIds[colIndex];
	        var slc = (0, _dom.elm)(slcId);
	        var rows = tf.tbl.rows;
	        var nbRows = tf.getRowsNb(true);
	
	        //custom select test
	        this.isCustom = tf.isCustomOptions(colIndex);
	
	        //custom selects text
	        var activeIdx = void 0;
	        var activeFilterId = tf.getActiveFilterId();
	        if (isLinked && activeFilterId) {
	            activeIdx = tf.getColumnIndexFromFilterId(activeFilterId);
	        }
	
	        var excludedOpts = null,
	            filteredDataCol = null;
	        if (isLinked && tf.disableExcludedOptions) {
	            excludedOpts = [];
	            filteredDataCol = [];
	        }
	
	        for (var k = tf.refRow; k < nbRows; k++) {
	            // always visible rows don't need to appear on selects as always
	            // valid
	            if (tf.hasVisibleRows && tf.visibleRows.indexOf(k) !== -1) {
	                continue;
	            }
	
	            var cell = rows[k].cells,
	                nchilds = cell.length;
	
	            // checks if row has exact cell #
	            if (nchilds !== tf.nbCells || this.isCustom) {
	                continue;
	            }
	
	            // this loop retrieves cell data
	            for (var j = 0; j < nchilds; j++) {
	                // WTF: cyclomatic complexity hell
	                // TODO: simplify hell below
	                if (colIndex === j && (!isLinked || isLinked && tf.disableExcludedOptions) || colIndex === j && isLinked && (rows[k].style.display === '' && !tf.paging || tf.paging && (!tf.validRowsIndex || tf.validRowsIndex && tf.validRowsIndex.indexOf(k) !== -1) && (activeIdx === undefined || activeIdx === colIndex || activeIdx !== colIndex && tf.validRowsIndex.indexOf(k) !== -1))) {
	                    var cellData = tf.getCellData(cell[j]),
	
	                    //Vary Peter's patch
	                    cellString = (0, _string.matchCase)(cellData, tf.caseSensitive);
	
	                    // checks if celldata is already in array
	                    if (!(0, _array.has)(this.opts, cellString, tf.caseSensitive)) {
	                        this.opts.push(cellData);
	                    }
	
	                    if (isLinked && tf.disableExcludedOptions) {
	                        var filteredCol = filteredDataCol[j];
	                        if (!filteredCol) {
	                            filteredCol = tf.getFilteredDataCol(j);
	                        }
	                        if (!(0, _array.has)(filteredCol, cellString, tf.caseSensitive) && !(0, _array.has)(excludedOpts, cellString, tf.caseSensitive)) {
	                            excludedOpts.push(cellData);
	                        }
	                    }
	                } //if colIndex==j
	            } //for j
	        } //for k
	
	        //Retrieves custom values
	        if (this.isCustom) {
	            var customValues = tf.getCustomOptions(colIndex);
	            this.opts = customValues[0];
	            this.optsTxt = customValues[1];
	        }
	
	        if (tf.sortSlc && !this.isCustom) {
	            if (!tf.caseSensitive) {
	                this.opts.sort(_sort.ignoreCase);
	                if (excludedOpts) {
	                    excludedOpts.sort(_sort.ignoreCase);
	                }
	            } else {
	                this.opts.sort();
	                if (excludedOpts) {
	                    excludedOpts.sort();
	                }
	            }
	        }
	
	        //asc sort
	        if (tf.sortNumAsc.indexOf(colIndex) !== -1) {
	            try {
	                this.opts.sort(_sort.numSortAsc);
	                if (excludedOpts) {
	                    excludedOpts.sort(_sort.numSortAsc);
	                }
	                if (this.isCustom) {
	                    this.optsTxt.sort(_sort.numSortAsc);
	                }
	            } catch (e) {
	                throw new Error(SORT_ERROR.replace('{0}', colIndex).replace('{1}', 'ascending'));
	            } //in case there are alphanumeric values
	        }
	        //desc sort
	        if (tf.sortNumDesc.indexOf(colIndex) !== -1) {
	            try {
	                this.opts.sort(_sort.numSortDesc);
	                if (excludedOpts) {
	                    excludedOpts.sort(_sort.numSortDesc);
	                }
	                if (this.isCustom) {
	                    this.optsTxt.sort(_sort.numSortDesc);
	                }
	            } catch (e) {
	                throw new Error(SORT_ERROR.replace('{0}', colIndex).replace('{1}', 'ascending'));
	            } //in case there are alphanumeric values
	        }
	
	        //populates drop-down
	        this.addOptions(colIndex, slc, isLinked, excludedOpts);
	
	        this.emitter.emit('after-populating-filter', tf, colIndex, slc);
	    };
	
	    /**
	     * Add drop-down options
	     * @param {Number} colIndex     Column index
	     * @param {Object} slc          Select Dom element
	     * @param {Boolean} isLinked    Enable linked refresh behaviour
	     * @param {Array} excludedOpts  Array of excluded options
	     */
	
	
	    Dropdown.prototype.addOptions = function addOptions(colIndex, slc, isLinked, excludedOpts) {
	        var tf = this.tf,
	            slcValue = slc.value;
	
	        slc.innerHTML = '';
	        slc = this.addFirstOption(slc);
	
	        for (var y = 0; y < this.opts.length; y++) {
	            if (this.opts[y] === '') {
	                continue;
	            }
	            var val = this.opts[y]; //option value
	            var lbl = this.isCustom ? this.optsTxt[y] : val; //option text
	            var isDisabled = false;
	            if (isLinked && tf.disableExcludedOptions && (0, _array.has)(excludedOpts, (0, _string.matchCase)(val, tf.caseSensitive), tf.caseSensitive)) {
	                isDisabled = true;
	            }
	
	            var opt = void 0;
	            //fill select on demand
	            if (tf.loadFltOnDemand && slcValue === this.opts[y] && tf.getFilterType(colIndex) === _const.SELECT) {
	                opt = (0, _dom.createOpt)(lbl, val, true);
	            } else {
	                opt = (0, _dom.createOpt)(lbl, val, false);
	            }
	            if (isDisabled) {
	                opt.disabled = true;
	            }
	            slc.appendChild(opt);
	        } // for y
	
	        slc.setAttribute('filled', '1');
	    };
	
	    /**
	     * Add drop-down header option
	     * @param {Object} slc Select DOM element
	     */
	
	
	    Dropdown.prototype.addFirstOption = function addFirstOption(slc) {
	        var tf = this.tf;
	
	        var opt0 = (0, _dom.createOpt)(!this.enableSlcResetFilter ? '' : tf.displayAllText, '');
	        if (!this.enableSlcResetFilter) {
	            opt0.style.display = _const.NONE;
	        }
	        slc.appendChild(opt0);
	        if (tf.enableEmptyOption) {
	            var opt1 = (0, _dom.createOpt)(tf.emptyText, tf.emOperator);
	            slc.appendChild(opt1);
	        }
	        if (tf.enableNonEmptyOption) {
	            var opt2 = (0, _dom.createOpt)(tf.nonEmptyText, tf.nmOperator);
	            slc.appendChild(opt2);
	        }
	        return slc;
	    };
	
	    /**
	     * Select filter options programmatically
	     * @param  {Number} colIndex Column index
	     * @param  {Array}  values   Array of option values to select
	     */
	
	
	    Dropdown.prototype.selectOptions = function selectOptions(colIndex) {
	        var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	        var tf = this.tf;
	        if (tf.getFilterType(colIndex) !== _const.MULTIPLE || values.length === 0) {
	            return;
	        }
	        var slc = tf.getFilterElement(colIndex);
	        [].forEach.call(slc.options, function (option) {
	            // Empty value means clear all selections and first option is the
	            // clear all option
	            if (values[0] === '' || option.value === '') {
	                option.selected = false;
	            }
	
	            if (option.value !== '' && (0, _array.has)(values, option.value, true)) {
	                option.selected = true;
	            } //if
	        });
	    };
	
	    /**
	     * Get filter values for a given column index
	     * @param {Number} colIndex Column index
	     * @returns {Array}  values  Array of selected values
	     */
	
	
	    Dropdown.prototype.getValues = function getValues(colIndex) {
	        var tf = this.tf;
	        var slc = tf.getFilterElement(colIndex);
	        var values = [];
	
	        // IE >= 9 does not support the selectedOptions property :(
	        if (slc.selectedOptions) {
	            [].forEach.call(slc.selectedOptions, function (option) {
	                return values.push(option.value);
	            });
	        } else {
	            [].forEach.call(slc.options, function (option) {
	                if (option.selected) {
	                    values.push(option.value);
	                }
	            });
	        }
	
	        return values;
	    };
	
	    /**
	     * Destroy Dropdown instance
	     */
	
	
	    Dropdown.prototype.destroy = function destroy() {
	        var _this3 = this;
	
	        this.emitter.off(['build-select-filter'], function (colIndex, isLinked, isExternal) {
	            return _this3.build(colIndex, isLinked, isExternal);
	        });
	        this.emitter.off(['select-options'], function (tf, colIndex, values) {
	            return _this3.selectOptions(colIndex, values);
	        });
	    };
	
	    return Dropdown;
	}(_feature.Feature);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.has = undefined;
	
	var _string = __webpack_require__(5);
	
	/**
	 * Checks if given item can be found in the passed collection
	 * @param  {Array} arr  collection
	 * @param  {Any} val  item to search
	 * @param  {Boolean} caseSensitive respects case if true
	 * @return {Boolean}
	 */
	var has = exports.has = function has(arr, val, caseSensitive) {
	    var sCase = Boolean(caseSensitive);
	    for (var i = 0, l = arr.length; i < l; i++) {
	        if ((0, _string.matchCase)(arr[i].toString(), sCase) === val) {
	            return true;
	        }
	    }
	    return false;
	}; /**
	    * Array utilities
	    */

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Sorting utilities
	 */
	
	/**
	 * Case insensitive compare function for passed strings
	 * @param  {String} First string
	 * @param  {String} Second string
	 * @return {Number} -1 if first string lower than second one
	 *                  0 if first string same order as second one
	 *                  1 if first string greater than second one
	 */
	var ignoreCase = exports.ignoreCase = function ignoreCase(a, b) {
	  var x = a.toLowerCase();
	  var y = b.toLowerCase();
	  return x < y ? -1 : x > y ? 1 : 0;
	};
	
	/**
	 * Sorts passed numbers in a ascending manner
	 * @param {Number} First number
	 * @param {Number} Second number
	 * @param {Number} Negative, zero or positive number
	 */
	var numSortAsc = exports.numSortAsc = function numSortAsc(a, b) {
	  return a - b;
	};
	
	/**
	 * Sorts passed numbers in a descending manner
	 * @param {Number} First number
	 * @param {Number} Second number
	 * @param {Number} Negative, zero or positive number
	 */
	var numSortDesc = exports.numSortDesc = function numSortDesc(a, b) {
	  return b - a;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CheckList = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _array = __webpack_require__(15);
	
	var _string = __webpack_require__(5);
	
	var _sort = __webpack_require__(16);
	
	var _event = __webpack_require__(1);
	
	var _types = __webpack_require__(4);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SORT_ERROR = 'Filter options for column {0} cannot be sorted in ' + '{1} manner.';
	
	/**
	 * Checklist filter UI component
	 */
	
	var CheckList = exports.CheckList = function (_Feature) {
	    _inherits(CheckList, _Feature);
	
	    /**
	     * Creates an instance of CheckList
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function CheckList(tf) {
	        _classCallCheck(this, CheckList);
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'checkList'));
	
	        var f = _this.config;
	
	        /**
	         * List of container DOM elements
	         * @type {Array}
	         */
	        _this.containers = [];
	
	        /**
	         * Css class for the container of the checklist filter (div)
	         * @type {String}
	         */
	        _this.containerCssClass = f.div_checklist_css_class || 'div_checklist';
	
	        /**
	         * Css class for the checklist filter element (ul)
	         * @type {String}
	         */
	        _this.filterCssClass = f.checklist_css_class || 'flt_checklist';
	
	        /**
	         * Css class for the item of a checklist (li)
	         * @type {String}
	         */
	        _this.itemCssClass = f.checklist_item_css_class || 'flt_checklist_item';
	
	        /**
	         * Css class for a selected item of a checklist (li)
	         * @type {String}
	         */
	        _this.selectedItemCssClass = f.checklist_selected_item_css_class || 'flt_checklist_slc_item';
	
	        /**
	         * Text placed in the filter's container when load filter on demand
	         * feature is enabled
	         * @type {String}
	         */
	        _this.activateText = f.activate_checklist_text || 'Click to load filter data';
	
	        /**
	         * Css class for a disabled item of a checklist (li)
	         * @type {String}
	         */
	        _this.disabledItemCssClass = f.checklist_item_disabled_css_class || 'flt_checklist_item_disabled';
	
	        /**
	         * Enable the reset filter option as first item
	         * @type {Boolean}
	         */
	        _this.enableResetOption = f.enable_checklist_reset_filter === false ? false : true;
	
	        /**
	         * Prefix for container element ID
	         * @type {String}
	         * @private
	         */
	        _this.prfx = 'chkdiv_';
	
	        /**
	         * Has custom options
	         * @type {Boolean}
	         * @private
	         */
	        _this.isCustom = false;
	
	        /**
	         * List of options values
	         * @type {Array}
	         * @private
	         */
	        _this.opts = [];
	
	        /**
	         * List of options texts for custom values
	         * @type {Array}
	         * @private
	         */
	        _this.optsTxt = [];
	
	        /**
	         * List of options to be excluded from the checklist filter
	         * @type {Array}
	         * @private
	         */
	        _this.excludedOpts = [];
	        return _this;
	    }
	
	    /**
	     * Checklist option click event handler
	     * @param {Event} evt
	     */
	
	
	    CheckList.prototype.optionClick = function optionClick(evt) {
	        var elm = (0, _event.targetEvt)(evt);
	        var tf = this.tf;
	
	        this.emitter.emit('filter-focus', tf, elm);
	        this.setCheckListValues(elm);
	        tf.filter();
	    };
	
	    /**
	     * Checklist container click event handler for load-on-demand feature
	     * @param {Event} evt
	     */
	
	
	    CheckList.prototype.onCheckListClick = function onCheckListClick(evt) {
	        var _this2 = this;
	
	        var elm = (0, _event.targetEvt)(evt);
	        if (this.tf.loadFltOnDemand && elm.getAttribute('filled') === '0') {
	            var ct = elm.getAttribute('ct');
	            var div = this.containers[ct];
	            this.build(ct);
	            (0, _event.removeEvt)(div, 'click', function (evt) {
	                return _this2.onCheckListClick(evt);
	            });
	        }
	    };
	
	    /**
	     * Initialize checklist filter
	     * @param  {Number}     colIndex   Column index
	     * @param  {Boolean}    isExternal External filter flag
	     * @param  {DOMElement} container  Dom element containing the filter
	     */
	
	
	    CheckList.prototype.init = function init(colIndex, isExternal, container) {
	        var _this3 = this;
	
	        var tf = this.tf;
	        var externalFltTgtId = isExternal ? tf.externalFltTgtIds[colIndex] : null;
	
	        var divCont = (0, _dom.createElm)('div', ['id', this.prfx + colIndex + '_' + tf.id], ['ct', colIndex], ['filled', '0']);
	        divCont.className = this.containerCssClass;
	
	        //filter is appended in desired element
	        if (externalFltTgtId) {
	            (0, _dom.elm)(externalFltTgtId).appendChild(divCont);
	        } else {
	            container.appendChild(divCont);
	        }
	
	        this.containers[colIndex] = divCont;
	        tf.fltIds.push(tf.prfxFlt + colIndex + '_' + tf.id);
	
	        if (!tf.loadFltOnDemand) {
	            this.build(colIndex);
	        } else {
	            (0, _event.addEvt)(divCont, 'click', function (evt) {
	                return _this3.onCheckListClick(evt);
	            });
	            divCont.appendChild((0, _dom.createText)(this.activateText));
	        }
	
	        this.emitter.on(['build-checklist-filter'], function (tf, colIndex) {
	            return _this3.build(colIndex);
	        });
	
	        this.emitter.on(['select-checklist-options'], function (tf, colIndex, values) {
	            return _this3.selectOptions(colIndex, values);
	        });
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Build checklist UI
	     * @param  {Number}  colIndex   Column index
	     */
	
	
	    CheckList.prototype.build = function build(colIndex) {
	        var tf = this.tf;
	        colIndex = parseInt(colIndex, 10);
	
	        this.emitter.emit('before-populating-filter', tf, colIndex);
	
	        this.opts = [];
	        this.optsTxt = [];
	
	        var flt = this.containers[colIndex];
	        var ul = (0, _dom.createElm)('ul', ['id', tf.fltIds[colIndex]], ['colIndex', colIndex]);
	        ul.className = this.filterCssClass;
	
	        var rows = tf.tbl.rows;
	        var nbRows = tf.getRowsNb(true);
	        var caseSensitive = tf.caseSensitive;
	        this.isCustom = tf.isCustomOptions(colIndex);
	
	        var activeIdx = void 0;
	        var activeFilterId = tf.getActiveFilterId();
	        if (tf.linkedFilters && activeFilterId) {
	            activeIdx = tf.getColumnIndexFromFilterId(activeFilterId);
	        }
	
	        var filteredDataCol = [];
	        if (tf.linkedFilters && tf.disableExcludedOptions) {
	            this.excludedOpts = [];
	        }
	
	        flt.innerHTML = '';
	
	        for (var k = tf.refRow; k < nbRows; k++) {
	            // always visible rows don't need to appear on selects as always
	            // valid
	            if (tf.hasVisibleRows && tf.visibleRows.indexOf(k) !== -1) {
	                continue;
	            }
	
	            var cells = rows[k].cells;
	            var ncells = cells.length;
	
	            // checks if row has exact cell #
	            if (ncells !== tf.nbCells || this.isCustom) {
	                continue;
	            }
	
	            // this loop retrieves cell data
	            for (var j = 0; j < ncells; j++) {
	                // WTF: cyclomatic complexity hell :)
	                if (colIndex === j && (!tf.linkedFilters || tf.linkedFilters && tf.disableExcludedOptions) || colIndex === j && tf.linkedFilters && (rows[k].style.display === '' && !tf.paging || tf.paging && (!activeIdx || activeIdx === colIndex || activeIdx !== colIndex && tf.validRowsIndex.indexOf(k) !== -1))) {
	
	                    var cellData = tf.getCellData(cells[j]);
	                    //Vary Peter's patch
	                    var cellString = (0, _string.matchCase)(cellData, caseSensitive);
	                    // checks if celldata is already in array
	                    if (!(0, _array.has)(this.opts, cellString, caseSensitive)) {
	                        this.opts.push(cellData);
	                    }
	                    var filteredCol = filteredDataCol[j];
	                    if (tf.linkedFilters && tf.disableExcludedOptions) {
	                        if (!filteredCol) {
	                            filteredCol = tf.getFilteredDataCol(j);
	                        }
	                        if (!(0, _array.has)(filteredCol, cellString, caseSensitive) && !(0, _array.has)(this.excludedOpts, cellString, caseSensitive)) {
	                            this.excludedOpts.push(cellData);
	                        }
	                    }
	                }
	            }
	        }
	
	        //Retrieves custom values
	        if (this.isCustom) {
	            var customValues = tf.getCustomOptions(colIndex);
	            this.opts = customValues[0];
	            this.optsTxt = customValues[1];
	        }
	
	        if (tf.sortSlc && !this.isCustom) {
	            if (!caseSensitive) {
	                this.opts.sort(_sort.ignoreCase);
	                if (this.excludedOpts) {
	                    this.excludedOpts.sort(_sort.ignoreCase);
	                }
	            } else {
	                this.opts.sort();
	                if (this.excludedOpts) {
	                    this.excludedOpts.sort();
	                }
	            }
	        }
	        //asc sort
	        if (tf.sortNumAsc.indexOf(colIndex) !== -1) {
	            try {
	                this.opts.sort(_sort.numSortAsc);
	                if (this.excludedOpts) {
	                    this.excludedOpts.sort(_sort.numSortAsc);
	                }
	                if (this.isCustom) {
	                    this.optsTxt.sort(_sort.numSortAsc);
	                }
	            } catch (e) {
	                throw new Error(SORT_ERROR.replace('{0}', colIndex).replace('{1}', 'ascending'));
	            } //in case there are alphanumeric values
	        }
	        //desc sort
	        if (tf.sortNumDesc.indexOf(colIndex) !== -1) {
	            try {
	                this.opts.sort(_sort.numSortDesc);
	                if (this.excludedOpts) {
	                    this.excludedOpts.sort(_sort.numSortDesc);
	                }
	                if (this.isCustom) {
	                    this.optsTxt.sort(_sort.numSortDesc);
	                }
	            } catch (e) {
	                throw new Error(SORT_ERROR.replace('{0}', colIndex).replace('{1}', 'descending'));
	            } //in case there are alphanumeric values
	        }
	
	        this.addChecks(colIndex, ul);
	
	        if (tf.loadFltOnDemand) {
	            flt.innerHTML = '';
	        }
	        flt.appendChild(ul);
	        flt.setAttribute('filled', '1');
	
	        this.emitter.emit('after-populating-filter', tf, colIndex, flt);
	    };
	
	    /**
	     * Add checklist options
	     * @param {Number} colIndex  Column index
	     * @param {Object} ul        Ul element
	     */
	
	
	    CheckList.prototype.addChecks = function addChecks(colIndex, ul) {
	        var _this4 = this;
	
	        var tf = this.tf;
	        var chkCt = this.addTChecks(colIndex, ul);
	
	        for (var y = 0; y < this.opts.length; y++) {
	            var val = this.opts[y]; //item value
	            var lbl = this.isCustom ? this.optsTxt[y] : val; //item text
	            var li = (0, _dom.createCheckItem)(tf.fltIds[colIndex] + '_' + (y + chkCt), val, lbl);
	            li.className = this.itemCssClass;
	
	            if (tf.linkedFilters && tf.disableExcludedOptions && (0, _array.has)(this.excludedOpts, (0, _string.matchCase)(val, tf.caseSensitive), tf.caseSensitive)) {
	                (0, _dom.addClass)(li, this.disabledItemCssClass);
	                li.check.disabled = true;
	                li.disabled = true;
	            } else {
	                (0, _event.addEvt)(li.check, 'click', function (evt) {
	                    return _this4.optionClick(evt);
	                });
	            }
	            ul.appendChild(li);
	
	            if (val === '') {
	                //item is hidden
	                li.style.display = _const.NONE;
	            }
	        }
	    };
	
	    /**
	     * Add checklist header option
	     * @param {Number} colIndex Column index
	     * @param {Object} ul       Ul element
	     */
	
	
	    CheckList.prototype.addTChecks = function addTChecks(colIndex, ul) {
	        var _this5 = this;
	
	        var tf = this.tf;
	        var chkCt = 1;
	        var li0 = (0, _dom.createCheckItem)(tf.fltIds[colIndex] + '_0', '', tf.displayAllText);
	        li0.className = this.itemCssClass;
	        ul.appendChild(li0);
	
	        (0, _event.addEvt)(li0.check, 'click', function (evt) {
	            return _this5.optionClick(evt);
	        });
	
	        if (!this.enableResetOption) {
	            li0.style.display = _const.NONE;
	        }
	
	        if (tf.enableEmptyOption) {
	            var li1 = (0, _dom.createCheckItem)(tf.fltIds[colIndex] + '_1', tf.emOperator, tf.emptyText);
	            li1.className = this.itemCssClass;
	            ul.appendChild(li1);
	            (0, _event.addEvt)(li1.check, 'click', function (evt) {
	                return _this5.optionClick(evt);
	            });
	            chkCt++;
	        }
	
	        if (tf.enableNonEmptyOption) {
	            var li2 = (0, _dom.createCheckItem)(tf.fltIds[colIndex] + '_2', tf.nmOperator, tf.nonEmptyText);
	            li2.className = this.itemCssClass;
	            ul.appendChild(li2);
	            (0, _event.addEvt)(li2.check, 'click', function (evt) {
	                return _this5.optionClick(evt);
	            });
	            chkCt++;
	        }
	        return chkCt;
	    };
	
	    /**
	     * Store checked options in DOM element attribute
	     * @param {Object} o checklist option DOM element
	     */
	
	
	    CheckList.prototype.setCheckListValues = function setCheckListValues(o) {
	        if (!o) {
	            return;
	        }
	
	        var tf = this.tf;
	        var chkValue = o.value; //checked item value
	        // TODO: provide helper to extract column index, ugly!
	        var chkIndex = parseInt(o.id.split('_')[2], 10);
	        var colIdx = tf.getColumnIndexFromFilterId(o.id);
	        var itemTag = 'LI';
	
	        var n = tf.getFilterElement(parseInt(colIdx, 10));
	        var li = n.childNodes[chkIndex];
	        var colIndex = n.getAttribute('colIndex');
	        var fltValue = n.getAttribute('value'); //filter value (ul tag)
	        var fltIndexes = n.getAttribute('indexes'); //selected items (ul tag)
	
	        if (o.checked) {
	            //show all item
	            if (chkValue === '') {
	                if (fltIndexes && fltIndexes !== '') {
	                    //items indexes
	                    var indSplit = fltIndexes.split(tf.separator);
	                    //checked items loop
	                    for (var u = 0; u < indSplit.length; u++) {
	                        //checked item
	                        var cChk = (0, _dom.elm)(tf.fltIds[colIndex] + '_' + indSplit[u]);
	                        if (cChk) {
	                            cChk.checked = false;
	                            (0, _dom.removeClass)(n.childNodes[indSplit[u]], this.selectedItemCssClass);
	                        }
	                    }
	                }
	                n.setAttribute('value', '');
	                n.setAttribute('indexes', '');
	            } else {
	                fltValue = fltValue ? fltValue : '';
	                chkValue = (0, _string.trim)(fltValue + ' ' + chkValue + ' ' + tf.orOperator);
	                chkIndex = fltIndexes + chkIndex + tf.separator;
	                n.setAttribute('value', chkValue);
	                n.setAttribute('indexes', chkIndex);
	                //1st option unchecked
	                if ((0, _dom.elm)(tf.fltIds[colIndex] + '_0')) {
	                    (0, _dom.elm)(tf.fltIds[colIndex] + '_0').checked = false;
	                }
	            }
	
	            if (li.nodeName === itemTag) {
	                (0, _dom.removeClass)(n.childNodes[0], this.selectedItemCssClass);
	                (0, _dom.addClass)(li, this.selectedItemCssClass);
	            }
	        } else {
	            //removes values and indexes
	            if (chkValue !== '') {
	                var replaceValue = new RegExp((0, _string.rgxEsc)(chkValue + ' ' + tf.orOperator));
	                fltValue = fltValue.replace(replaceValue, '');
	                n.setAttribute('value', (0, _string.trim)(fltValue));
	
	                var replaceIndex = new RegExp((0, _string.rgxEsc)(chkIndex + tf.separator));
	                fltIndexes = fltIndexes.replace(replaceIndex, '');
	                n.setAttribute('indexes', fltIndexes);
	            }
	            if (li.nodeName === itemTag) {
	                (0, _dom.removeClass)(li, this.selectedItemCssClass);
	            }
	        }
	    };
	
	    /**
	     * Select filter options programmatically
	     * @param  {Number} colIndex Column index
	     * @param  {Array}  values   Array of option values to select
	     */
	
	
	    CheckList.prototype.selectOptions = function selectOptions(colIndex) {
	        var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	        var tf = this.tf;
	        var flt = tf.getFilterElement(colIndex);
	        if (tf.getFilterType(colIndex) !== _const.CHECKLIST || !flt) {
	            return;
	        }
	
	        var lisNb = (0, _dom.tag)(flt, 'li').length;
	
	        flt.setAttribute('value', '');
	        flt.setAttribute('indexes', '');
	
	        for (var k = 0; k < lisNb; k++) {
	            var li = (0, _dom.tag)(flt, 'li')[k];
	            var lbl = (0, _dom.tag)(li, 'label')[0];
	            var chk = (0, _dom.tag)(li, 'input')[0];
	            var lblTxt = (0, _string.matchCase)((0, _dom.getText)(lbl), tf.caseSensitive);
	
	            if (lblTxt !== '' && (0, _array.has)(values, lblTxt, tf.caseSensitive)) {
	                chk.checked = true;
	            } else {
	                // Check non-empty-text or empty-text option
	                if (values.indexOf(tf.nmOperator) !== -1 && lblTxt === (0, _string.matchCase)(tf.nonEmptyText, tf.caseSensitive)) {
	                    chk.checked = true;
	                } else if (values.indexOf(tf.emOperator) !== -1 && lblTxt === (0, _string.matchCase)(tf.emptyText, tf.caseSensitive)) {
	                    chk.checked = true;
	                } else {
	                    chk.checked = false;
	                }
	            }
	            this.setCheckListValues(chk);
	        }
	    };
	
	    /**
	     * Get filter values for a given column index
	     * @param {Number} colIndex Column index
	     * @returns {Array} values Collection of selected values
	     */
	
	
	    CheckList.prototype.getValues = function getValues(colIndex) {
	        var tf = this.tf;
	        var flt = tf.getFilterElement(colIndex);
	        var fltAttr = flt.getAttribute('value');
	        var values = (0, _types.isEmpty)(fltAttr) ? '' : fltAttr;
	
	        //removes last operator ||
	        values = values.substr(0, values.length - 3);
	        //turn || separated values into array
	        values = values.split(' ' + tf.orOperator + ' ');
	
	        return values;
	    };
	
	    /**
	     * Destroy CheckList instance
	     */
	
	
	    CheckList.prototype.destroy = function destroy() {
	        var _this6 = this;
	
	        this.emitter.off(['build-checklist-filter'], function (tf, colIndex, isExternal) {
	            return _this6.build(colIndex, isExternal);
	        });
	        this.emitter.off(['select-checklist-options'], function (tf, colIndex, values) {
	            return _this6.selectOptions(colIndex, values);
	        });
	    };
	
	    return CheckList;
	}(_feature.Feature);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RowsCounter = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Rows counter UI component
	 * @export
	 * @class RowsCounter
	 * @extends {Feature}
	 */
	var RowsCounter = exports.RowsCounter = function (_Feature) {
	    _inherits(RowsCounter, _Feature);
	
	    /**
	     * Creates an instance of RowsCounter
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function RowsCounter(tf) {
	        _classCallCheck(this, RowsCounter);
	
	        // TableFilter configuration
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'rowsCounter'));
	
	        var f = _this.config;
	
	        /**
	         * ID of custom container element
	         * @type {String}
	         */
	        _this.targetId = f.rows_counter_target_id || null;
	
	        /**
	         * Container DOM element
	         * @type {DOMElement}
	         * @private
	         */
	        _this.container = null;
	
	        /**
	         * Container DOM element for label displaying the total number of rows
	         * @type {DOMElement}
	         * @private
	         */
	        _this.label = null;
	
	        /**
	         * Text preceding the total number of rows
	         * @type {String}
	         */
	        _this.text = f.rows_counter_text || 'Rows: ';
	
	        /**
	         * Separator symbol appearing between the first and last visible rows of
	         * current page when paging is enabled. ie: Rows: 31-40 / 70
	         * @type {String}
	         */
	        _this.fromToTextSeparator = f.from_to_text_separator || '-';
	
	        /**
	         * Separator symbol appearing between the first and last visible rows of
	         * current page and the total number of filterable rows when paging is
	         * enabled. ie: Rows: 31-40 / 70
	         * @type {String}
	         */
	        _this.overText = f.over_text || ' / ';
	
	        /**
	         * Css class for container element
	         * @type {String}
	         */
	        _this.cssClass = f.tot_rows_css_class || 'tot';
	
	        /**
	         * Prefix for container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxCounter = 'counter_';
	
	        /**
	         * Prefix for DOM element containing the counter
	         * @type {String}
	         * @private
	         */
	        _this.prfxLabel = 'totrows_span_';
	
	        /**
	         * Prefix for label preceding the counter
	         * @type {String}
	         * @private
	         */
	        _this.prfxText = 'totRowsTextSpan_';
	
	        /**
	         * Callback fired before the counter is refreshed
	         * @type {Function}
	         */
	        _this.onBeforeRefreshCounter = (0, _types.isFn)(f.on_before_refresh_counter) ? f.on_before_refresh_counter : null;
	
	        /**
	         * Callback fired after the counter is refreshed
	         * @type {Function}
	         */
	        _this.onAfterRefreshCounter = (0, _types.isFn)(f.on_after_refresh_counter) ? f.on_after_refresh_counter : null;
	        return _this;
	    }
	
	    /**
	     * Initializes RowsCounter instance
	     */
	
	
	    RowsCounter.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var tf = this.tf;
	
	        //rows counter container
	        var countDiv = (0, _dom.createElm)('div', ['id', this.prfxCounter + tf.id]);
	        countDiv.className = this.cssClass;
	        //rows counter label
	        var countSpan = (0, _dom.createElm)('span', ['id', this.prfxLabel + tf.id]);
	        var countText = (0, _dom.createElm)('span', ['id', this.prfxText + tf.id]);
	        countText.appendChild((0, _dom.createText)(this.text));
	
	        // counter is added to defined element
	        if (!this.targetId) {
	            tf.setToolbar();
	        }
	        var targetEl = !this.targetId ? tf.lDiv : (0, _dom.elm)(this.targetId);
	
	        //default container: 'lDiv'
	        if (!this.targetId) {
	            countDiv.appendChild(countText);
	            countDiv.appendChild(countSpan);
	            targetEl.appendChild(countDiv);
	        } else {
	            //custom container, no need to append statusDiv
	            targetEl.appendChild(countText);
	            targetEl.appendChild(countSpan);
	        }
	        this.container = countDiv;
	        this.label = countSpan;
	
	        // subscribe to events
	        this.emitter.on(['after-filtering', 'grouped-by-page'], function () {
	            return _this2.refresh(tf.getValidRowsNb());
	        });
	        this.emitter.on(['rows-changed'], function () {
	            return _this2.refresh();
	        });
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	        this.refresh();
	    };
	
	    /**
	     * Refreshes the rows counter
	     * @param {Number} p Optional parameter the total number of rows to display
	     * @returns
	     */
	
	
	    RowsCounter.prototype.refresh = function refresh(p) {
	        if (!this.initialized || !this.isEnabled()) {
	            return;
	        }
	
	        var tf = this.tf;
	
	        if (this.onBeforeRefreshCounter) {
	            this.onBeforeRefreshCounter.call(null, tf, this.label);
	        }
	
	        var totTxt = void 0;
	        if (!tf.paging) {
	            if (p && p !== '') {
	                totTxt = p;
	            } else {
	                totTxt = tf.getFilterableRowsNb() - tf.nbHiddenRows;
	            }
	        } else {
	            var paging = tf.feature('paging');
	            if (paging) {
	                //paging start row
	                var pagingStartRow = parseInt(paging.startPagingRow, 10) + (tf.getValidRowsNb() > 0 ? 1 : 0);
	                var pagingEndRow = pagingStartRow + paging.pagingLength - 1 <= tf.getValidRowsNb() ? pagingStartRow + paging.pagingLength - 1 : tf.getValidRowsNb();
	                totTxt = pagingStartRow + this.fromToTextSeparator + pagingEndRow + this.overText + tf.getValidRowsNb();
	            }
	        }
	
	        this.label.innerHTML = totTxt;
	        if (this.onAfterRefreshCounter) {
	            this.onAfterRefreshCounter.call(null, tf, this.label, totTxt);
	        }
	    };
	
	    /**
	     * Remove feature
	     */
	
	
	    RowsCounter.prototype.destroy = function destroy() {
	        var _this3 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        if (!this.targetId && this.container) {
	            (0, _dom.removeElm)(this.container);
	        } else {
	            (0, _dom.elm)(this.targetId).innerHTML = '';
	        }
	        this.label = null;
	        this.container = null;
	
	        // unsubscribe to events
	        this.emitter.off(['after-filtering', 'grouped-by-page'], function () {
	            return _this3.refresh(tf.getValidRowsNb());
	        });
	        this.emitter.off(['rows-changed'], function () {
	            return _this3.refresh();
	        });
	
	        this.initialized = false;
	    };
	
	    return RowsCounter;
	}(_feature.Feature);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.StatusBar = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _root = __webpack_require__(2);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Status bar UI component
	 * @export
	 * @class StatusBar
	 * @extends {Feature}
	 */
	var StatusBar = exports.StatusBar = function (_Feature) {
	    _inherits(StatusBar, _Feature);
	
	    /**
	     * Creates an instance of StatusBar
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function StatusBar(tf) {
	        _classCallCheck(this, StatusBar);
	
	        // Configuration object
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'statusBar'));
	
	        var f = _this.config;
	
	        /**
	         * ID of custom container element
	         * @type {String}
	         */
	        _this.targetId = f.status_bar_target_id || null;
	
	        /**
	         * Container DOM element
	         * @type {DOMElement}
	         * @private
	         */
	        _this.container = null;
	
	        /**
	         * Message container DOM element
	         * @type {DOMElement}
	         * @private
	         */
	        _this.msgContainer = null;
	
	        /**
	         * Label container DOM element
	         * @type {DOMElement}
	         * @private
	         */
	        _this.labelContainer = null;
	
	        /**
	         * Text preceding status message
	         * @type {String}
	         */
	        _this.text = f.status_bar_text || '';
	
	        /**
	         * Css class for container element
	         * @type {String}
	         */
	        _this.cssClass = f.status_bar_css_class || 'status';
	
	        /**
	         * Message visibility duration in milliseconds
	         * @type {Number}
	         * @private
	         */
	        _this.delay = 250;
	
	        /**
	         * Callback fired before the message is displayed
	         * @type {Function}
	         */
	        _this.onBeforeShowMsg = (0, _types.isFn)(f.on_before_show_msg) ? f.on_before_show_msg : null;
	
	        /**
	         * Callback fired after the message is displayed
	         * @type {Function}
	         */
	        _this.onAfterShowMsg = (0, _types.isFn)(f.on_after_show_msg) ? f.on_after_show_msg : null;
	
	        /**
	         * Message appearing upon filtering
	         * @type {String}
	         */
	        _this.msgFilter = f.msg_filter || 'Filtering data...';
	
	        /**
	         * Message appearing when a drop-down filter is populated
	         * @type {String}
	         */
	        _this.msgPopulate = f.msg_populate || 'Populating filter...';
	
	        /**
	         * Message appearing when a checklist filter is populated
	         * @type {String}
	         */
	        _this.msgPopulateCheckList = f.msg_populate_checklist || 'Populating list...';
	
	        /**
	         * Message appearing when a pagination page is changed
	         * @type {String}
	         */
	        _this.msgChangePage = f.msg_change_page || 'Collecting paging data...';
	
	        /**
	         * Message appearing when filters are cleared
	         * @type {String}
	         */
	        _this.msgClear = f.msg_clear || 'Clearing filters...';
	
	        /**
	         * Message appearing when the page length is changed
	         * @type {String}
	         */
	        _this.msgChangeResults = f.msg_change_results || 'Changing results per page...';
	
	        /**
	         * Message appearing when the page is re-set
	         * @type {String}
	         */
	        _this.msgResetPage = f.msg_reset_page || 'Re-setting page...';
	
	        /**
	         * Message appearing when the page length is re-set
	         * @type {String}
	         */
	        _this.msgResetPageLength = f.msg_reset_page_length || 'Re-setting page length...';
	
	        /**
	         * Message appearing upon column sorting
	         * @type {String}
	         */
	        _this.msgSort = f.msg_sort || 'Sorting data...';
	
	        /**
	         * Message appearing when extensions are loading
	         * @type {String}
	         */
	        _this.msgLoadExtensions = f.msg_load_extensions || 'Loading extensions...';
	
	        /**
	         * Message appearing when themes are loading
	         * @type {String}
	         */
	        _this.msgLoadThemes = f.msg_load_themes || 'Loading theme(s)...';
	
	        /**
	         * Prefix for container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxCont = 'status_';
	
	        /**
	         * Prefix for label container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxLabel = 'statusSpan_';
	
	        /**
	         * Prefix for text preceding the message
	         * @type {String}
	         * @private
	         */
	        _this.prfxText = 'statusText_';
	        return _this;
	    }
	
	    /**
	     * Initializes StatusBar instance
	     */
	
	
	    StatusBar.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var tf = this.tf;
	        var emitter = this.emitter;
	
	        //status bar container
	        var statusDiv = (0, _dom.createElm)('div', ['id', this.prfxCont + tf.id]);
	        statusDiv.className = this.cssClass;
	
	        //status bar label
	        var statusSpan = (0, _dom.createElm)('span', ['id', this.prfxLabel + tf.id]);
	        //preceding text
	        var statusSpanText = (0, _dom.createElm)('span', ['id', this.prfxText + tf.id]);
	        statusSpanText.appendChild((0, _dom.createText)(this.text));
	
	        // target element container
	        if (!this.targetId) {
	            tf.setToolbar();
	        }
	        var targetEl = !this.targetId ? tf.lDiv : (0, _dom.elm)(this.targetId);
	
	        //default container: 'lDiv'
	        if (!this.targetId) {
	            statusDiv.appendChild(statusSpanText);
	            statusDiv.appendChild(statusSpan);
	            targetEl.appendChild(statusDiv);
	        } else {
	            // custom container, no need to append statusDiv
	            targetEl.appendChild(statusSpanText);
	            targetEl.appendChild(statusSpan);
	        }
	
	        this.container = statusDiv;
	        this.msgContainer = statusSpan;
	        this.labelContainer = statusSpanText;
	
	        // Subscribe to events
	        emitter.on(['before-filtering'], function () {
	            return _this2.message(_this2.msgFilter);
	        });
	        emitter.on(['before-populating-filter'], function () {
	            return _this2.message(_this2.msgPopulate);
	        });
	        emitter.on(['before-page-change'], function () {
	            return _this2.message(_this2.msgChangePage);
	        });
	        emitter.on(['before-clearing-filters'], function () {
	            return _this2.message(_this2.msgClear);
	        });
	        emitter.on(['before-page-length-change'], function () {
	            return _this2.message(_this2.msgChangeResults);
	        });
	        emitter.on(['before-reset-page'], function () {
	            return _this2.message(_this2.msgResetPage);
	        });
	        emitter.on(['before-reset-page-length'], function () {
	            return _this2.message(_this2.msgResetPageLength);
	        });
	        emitter.on(['before-loading-extensions'], function () {
	            return _this2.message(_this2.msgLoadExtensions);
	        });
	        emitter.on(['before-loading-themes'], function () {
	            return _this2.message(_this2.msgLoadThemes);
	        });
	
	        emitter.on(['after-filtering', 'after-populating-filter', 'after-page-change', 'after-clearing-filters', 'after-page-length-change', 'after-reset-page', 'after-reset-page-length', 'after-loading-extensions', 'after-loading-themes'], function () {
	            return _this2.message('');
	        });
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Display status message
	     * @param {String} [t=''] Message to be displayed
	     */
	
	
	    StatusBar.prototype.message = function message() {
	        var _this3 = this;
	
	        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	        if (!this.isEnabled()) {
	            return;
	        }
	
	        if (this.onBeforeShowMsg) {
	            this.onBeforeShowMsg.call(null, this.tf, t);
	        }
	
	        var d = t === '' ? this.delay : 1;
	        _root.root.setTimeout(function () {
	            if (!_this3.initialized) {
	                return;
	            }
	            _this3.msgContainer.innerHTML = t;
	            if (_this3.onAfterShowMsg) {
	                _this3.onAfterShowMsg.call(null, _this3.tf, t);
	            }
	        }, d);
	    };
	
	    /**
	     * Destroy StatusBar instance
	     */
	
	
	    StatusBar.prototype.destroy = function destroy() {
	        var _this4 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        var emitter = this.emitter;
	
	        this.container.innerHTML = '';
	        if (!this.targetId) {
	            (0, _dom.removeElm)(this.container);
	        }
	        this.labelContainer = null;
	        this.msgContainer = null;
	        this.container = null;
	
	        // Unsubscribe to events
	        emitter.off(['before-filtering'], function () {
	            return _this4.message(_this4.msgFilter);
	        });
	        emitter.off(['before-populating-filter'], function () {
	            return _this4.message(_this4.msgPopulate);
	        });
	        emitter.off(['before-page-change'], function () {
	            return _this4.message(_this4.msgChangePage);
	        });
	        emitter.off(['before-clearing-filters'], function () {
	            return _this4.message(_this4.msgClear);
	        });
	        emitter.off(['before-page-length-change'], function () {
	            return _this4.message(_this4.msgChangeResults);
	        });
	        emitter.off(['before-reset-page'], function () {
	            return _this4.message(_this4.msgResetPage);
	        });
	        emitter.off(['before-reset-page-length'], function () {
	            return _this4.message(_this4.msgResetPageLength);
	        });
	        emitter.off(['before-loading-extensions'], function () {
	            return _this4.message(_this4.msgLoadExtensions);
	        });
	        emitter.off(['before-loading-themes'], function () {
	            return _this4.message(_this4.msgLoadThemes);
	        });
	
	        emitter.off(['after-filtering', 'after-populating-filter', 'after-page-change', 'after-clearing-filters', 'after-page-length-change', 'after-reset-page', 'after-reset-page-length', 'after-loading-extensions', 'after-loading-themes'], function () {
	            return _this4.message('');
	        });
	
	        this.initialized = false;
	    };
	
	    return StatusBar;
	}(_feature.Feature);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Paging = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	var _event = __webpack_require__(1);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Paging UI component
	 * @export
	 * @class Paging
	 * @extends {Feature}
	 */
	var Paging = exports.Paging = function (_Feature) {
	    _inherits(Paging, _Feature);
	
	    /**
	     * Creates an instance of Paging
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function Paging(tf) {
	        _classCallCheck(this, Paging);
	
	        // Configuration object
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'paging'));
	
	        var f = _this.config;
	
	        /**
	         * Css class for the paging buttons (previous, next, etc.)
	         * @type {String}
	         */
	        _this.btnPageCssClass = f.paging_btn_css_class || 'pgInp';
	
	        /**
	        * Main select DOM element
	        * @type {DOMElement}
	        */
	        _this.pagingSlc = null;
	
	        /**
	         * Results per page select DOM element
	         * @type {DOMElement}
	         */
	        _this.resultsPerPageSlc = null;
	
	        /**
	         * ID of custom container element
	         * @type {String}
	         */
	        _this.pagingTgtId = f.paging_target_id || null;
	
	        /**
	         * Number of rows contained in a page
	         * @type {Number}
	         */
	        _this.pagingLength = !isNaN(f.paging_length) ? f.paging_length : 10;
	
	        /**
	         * ID of custom container element for the results per page selector
	         * @type {String}
	         */
	        _this.resultsPerPageTgtId = f.results_per_page_target_id || null;
	
	        /**
	         * Css class for the paging select element
	         * @type {String}
	         */
	        _this.pgSlcCssClass = f.paging_slc_css_class || 'pgSlc';
	
	        /**
	         * Css class for the paging input element
	         * @type {String}
	         */
	        _this.pgInpCssClass = f.paging_inp_css_class || 'pgNbInp';
	
	        /**
	         * Label and values for the results per page select, example of usage:
	         * ['Records: ', [10,25,50,100]]
	         * @type {Array}
	         */
	        _this.resultsPerPage = f.results_per_page || null;
	
	        /**
	         * Determines if results per page is configured
	         * @type {Boolean}
	         */
	        _this.hasResultsPerPage = (0, _types.isArray)(_this.resultsPerPage);
	
	        /**
	         * Css class for the results per page select
	         * @type {String}
	         */
	        _this.resultsSlcCssClass = f.results_slc_css_class || 'rspg';
	
	        /**
	         * Css class for the label preceding results per page select
	         * @type {String}
	         */
	        _this.resultsSpanCssClass = f.results_span_css_class || 'rspgSpan';
	
	        /**
	         * Index of the first row of current page
	         * @type {Number}
	         * @private
	         */
	        _this.startPagingRow = 0;
	
	        /**
	         * Total number of pages
	         * @type {Number}
	         * @private
	         */
	        _this.nbPages = 0;
	
	        /**
	         * Current page number
	         * @type {Number}
	         * @private
	         */
	        _this.currentPageNb = 1;
	
	        /**
	         * Next page button text
	         * @type {String}
	         */
	        _this.btnNextPageText = f.btn_next_page_text || '>';
	
	        /**
	         * Previous page button text
	         * @type {String}
	         */
	        _this.btnPrevPageText = f.btn_prev_page_text || '<';
	
	        /**
	         * Last page button text
	         * @type {String}
	         */
	        _this.btnLastPageText = f.btn_last_page_text || '>|';
	
	        /**
	         * First page button text
	         * @type {String}
	         */
	        _this.btnFirstPageText = f.btn_first_page_text || '|<';
	
	        /**
	         * Next page button HTML
	         * @type {String}
	         */
	        _this.btnNextPageHtml = f.btn_next_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnPageCssClass + ' nextPage" title="Next page" />');
	
	        /**
	         * Previous page button HTML
	         * @type {String}
	         */
	        _this.btnPrevPageHtml = f.btn_prev_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnPageCssClass + ' previousPage" title="Previous page" />');
	
	        /**
	         * First page button HTML
	         * @type {String}
	         */
	        _this.btnFirstPageHtml = f.btn_first_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnPageCssClass + ' firstPage" title="First page" />');
	
	        /**
	         * Last page button HTML
	         * @type {String}
	         */
	        _this.btnLastPageHtml = f.btn_last_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnPageCssClass + ' lastPage" title="Last page" />');
	
	        /**
	         * Text preceeding page selector drop-down
	         * @type {String}
	         */
	        _this.pageText = f.page_text || ' Page ';
	
	        /**
	         * Text after page selector drop-down
	         * @type {String}
	         */
	        _this.ofText = f.of_text || ' of ';
	
	        /**
	         * Css class for the span containing total number of pages
	         * @type {String}
	         */
	        _this.nbPgSpanCssClass = f.nb_pages_css_class || 'nbpg';
	
	        /**
	         * Determines if paging buttons are enabled (default: true)
	         * @type {Boolean}
	         */
	        _this.hasPagingBtns = f.paging_btns === false ? false : true;
	
	        /**
	         * Defines page selector type, two possible values: 'select', 'input'
	         * @type {String}
	         */
	        _this.pageSelectorType = f.page_selector_type || _const.SELECT;
	
	        /**
	         * Callback fired before the page is changed
	         * @type {Function}
	         */
	        _this.onBeforeChangePage = (0, _types.isFn)(f.on_before_change_page) ? f.on_before_change_page : null;
	
	        /**
	         * Callback fired after the page is changed
	         * @type {Function}
	         */
	        _this.onAfterChangePage = (0, _types.isFn)(f.on_after_change_page) ? f.on_after_change_page : null;
	
	        /**
	         * Element IDs prefixes
	         */
	        /**
	         * Page select
	         * @type {String}
	         * @private
	         */
	        _this.prfxSlcPages = 'slcPages_';
	        /**
	         * Results per page select
	         * @type {String}
	         * @private
	         */
	        _this.prfxSlcResults = 'slcResults_';
	        /**
	         * Label preciding results per page select
	         * @type {String}
	         * @private
	         */
	        _this.prfxSlcResultsTxt = 'slcResultsTxt_';
	        /**
	         * Span containing next page button
	         * @type {String}
	         * @private
	         */
	        _this.prfxBtnNextSpan = 'btnNextSpan_';
	        /**
	         * Span containing previous page button
	         * @type {String}
	         * @private
	         */
	        _this.prfxBtnPrevSpan = 'btnPrevSpan_';
	        /**
	         * Span containing last page button
	         * @type {String}
	         * @private
	         */
	        _this.prfxBtnLastSpan = 'btnLastSpan_';
	        /**
	         * Span containing first page button
	         * @type {String}
	         * @private
	         */
	        _this.prfxBtnFirstSpan = 'btnFirstSpan_';
	        /**
	         * Next button
	         * @type {String}
	         * @private
	         */
	        _this.prfxBtnNext = 'btnNext_';
	        /**
	         * Previous button
	         * @type {String}
	         * @private
	         */
	        _this.prfxBtnPrev = 'btnPrev_';
	        /**
	         * Last button
	         * @type {String}
	         * @private
	         */
	        _this.prfxBtnLast = 'btnLast_';
	        /**
	         * First button
	         * @type {String}
	         * @private
	         */
	        _this.prfxBtnFirst = 'btnFirst_';
	        /**
	         * Span for tot nb pages
	         * @type {String}
	         * @private
	         */
	        _this.prfxPgSpan = 'pgspan_';
	        /**
	         * Span preceding pages select (contains 'Page')
	         * @type {String}
	         * @private
	         */
	        _this.prfxPgBeforeSpan = 'pgbeforespan_';
	        /**
	         * Span following pages select (contains ' of ')
	         * @type {String}
	         * @private
	         */
	        _this.prfxPgAfterSpan = 'pgafterspan_';
	
	        var start_row = tf.refRow;
	        var nrows = tf.getRowsNb(true);
	        //calculates page nb
	        _this.nbPages = Math.ceil((nrows - start_row) / _this.pagingLength);
	
	        var o = _this;
	        /**
	         * Paging DOM events handlers
	         * @type {String}
	         * @private
	         */
	        _this.evt = {
	            slcIndex: function slcIndex() {
	                return o.pageSelectorType === _const.SELECT ? o.pagingSlc.options.selectedIndex : parseInt(o.pagingSlc.value, 10) - 1;
	            },
	            nbOpts: function nbOpts() {
	                return o.pageSelectorType === _const.SELECT ? parseInt(o.pagingSlc.options.length, 10) - 1 : o.nbPages - 1;
	            },
	            next: function next() {
	                var nextIndex = o.evt.slcIndex() < o.evt.nbOpts() ? o.evt.slcIndex() + 1 : 0;
	                o.changePage(nextIndex);
	            },
	            prev: function prev() {
	                var prevIndex = o.evt.slcIndex() > 0 ? o.evt.slcIndex() - 1 : o.evt.nbOpts();
	                o.changePage(prevIndex);
	            },
	            last: function last() {
	                o.changePage(o.evt.nbOpts());
	            },
	            first: function first() {
	                o.changePage(0);
	            },
	            _detectKey: function _detectKey(e) {
	                var key = (0, _event.keyCode)(e);
	                if (key === _const.ENTER_KEY) {
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
	        return _this;
	    }
	
	    /**
	     * Initialize DOM elements
	     */
	
	
	    Paging.prototype.init = function init() {
	        var _this2 = this;
	
	        var slcPages;
	        var tf = this.tf;
	        var evt = this.evt;
	
	        if (this.initialized) {
	            return;
	        }
	
	        // Check resultsPerPage is in expected format and initialise the
	        // results per page component
	        if (this.hasResultsPerPage) {
	            if (this.resultsPerPage.length < 2) {
	                this.hasResultsPerPage = false;
	            } else {
	                this.pagingLength = this.resultsPerPage[1][0];
	                this.setResultsPerPage();
	            }
	        }
	
	        evt.slcPagesChange = function (event) {
	            var slc = event.target;
	            _this2.changePage(slc.selectedIndex);
	        };
	
	        // Paging drop-down list selector
	        if (this.pageSelectorType === _const.SELECT) {
	            slcPages = (0, _dom.createElm)(_const.SELECT, ['id', this.prfxSlcPages + tf.id]);
	            slcPages.className = this.pgSlcCssClass;
	            (0, _event.addEvt)(slcPages, 'change', evt.slcPagesChange);
	        }
	
	        // Paging input selector
	        if (this.pageSelectorType === _const.INPUT) {
	            slcPages = (0, _dom.createElm)(_const.INPUT, ['id', this.prfxSlcPages + tf.id], ['value', this.currentPageNb]);
	            slcPages.className = this.pgInpCssClass;
	            (0, _event.addEvt)(slcPages, 'keypress', evt._detectKey);
	        }
	
	        // btns containers
	        var btnNextSpan = (0, _dom.createElm)('span', ['id', this.prfxBtnNextSpan + tf.id]);
	        var btnPrevSpan = (0, _dom.createElm)('span', ['id', this.prfxBtnPrevSpan + tf.id]);
	        var btnLastSpan = (0, _dom.createElm)('span', ['id', this.prfxBtnLastSpan + tf.id]);
	        var btnFirstSpan = (0, _dom.createElm)('span', ['id', this.prfxBtnFirstSpan + tf.id]);
	
	        if (this.hasPagingBtns) {
	            // Next button
	            if (!this.btnNextPageHtml) {
	                var btn_next = (0, _dom.createElm)(_const.INPUT, ['id', this.prfxBtnNext + tf.id], ['type', 'button'], ['value', this.btnNextPageText], ['title', 'Next']);
	                btn_next.className = this.btnPageCssClass;
	                (0, _event.addEvt)(btn_next, 'click', evt.next);
	                btnNextSpan.appendChild(btn_next);
	            } else {
	                btnNextSpan.innerHTML = this.btnNextPageHtml;
	                (0, _event.addEvt)(btnNextSpan, 'click', evt.next);
	            }
	            // Previous button
	            if (!this.btnPrevPageHtml) {
	                var btn_prev = (0, _dom.createElm)(_const.INPUT, ['id', this.prfxBtnPrev + tf.id], ['type', 'button'], ['value', this.btnPrevPageText], ['title', 'Previous']);
	                btn_prev.className = this.btnPageCssClass;
	                (0, _event.addEvt)(btn_prev, 'click', evt.prev);
	                btnPrevSpan.appendChild(btn_prev);
	            } else {
	                btnPrevSpan.innerHTML = this.btnPrevPageHtml;
	                (0, _event.addEvt)(btnPrevSpan, 'click', evt.prev);
	            }
	            // Last button
	            if (!this.btnLastPageHtml) {
	                var btn_last = (0, _dom.createElm)(_const.INPUT, ['id', this.prfxBtnLast + tf.id], ['type', 'button'], ['value', this.btnLastPageText], ['title', 'Last']);
	                btn_last.className = this.btnPageCssClass;
	                (0, _event.addEvt)(btn_last, 'click', evt.last);
	                btnLastSpan.appendChild(btn_last);
	            } else {
	                btnLastSpan.innerHTML = this.btnLastPageHtml;
	                (0, _event.addEvt)(btnLastSpan, 'click', evt.last);
	            }
	            // First button
	            if (!this.btnFirstPageHtml) {
	                var btn_first = (0, _dom.createElm)(_const.INPUT, ['id', this.prfxBtnFirst + tf.id], ['type', 'button'], ['value', this.btnFirstPageText], ['title', 'First']);
	                btn_first.className = this.btnPageCssClass;
	                (0, _event.addEvt)(btn_first, 'click', evt.first);
	                btnFirstSpan.appendChild(btn_first);
	            } else {
	                btnFirstSpan.innerHTML = this.btnFirstPageHtml;
	                (0, _event.addEvt)(btnFirstSpan, 'click', evt.first);
	            }
	        }
	
	        // paging elements (buttons+drop-down list) are added to defined element
	        if (!this.pagingTgtId) {
	            tf.setToolbar();
	        }
	        var targetEl = !this.pagingTgtId ? tf.mDiv : (0, _dom.elm)(this.pagingTgtId);
	        targetEl.appendChild(btnFirstSpan);
	        targetEl.appendChild(btnPrevSpan);
	
	        var pgBeforeSpan = (0, _dom.createElm)('span', ['id', this.prfxPgBeforeSpan + tf.id]);
	        pgBeforeSpan.appendChild((0, _dom.createText)(this.pageText));
	        pgBeforeSpan.className = this.nbPgSpanCssClass;
	        targetEl.appendChild(pgBeforeSpan);
	        targetEl.appendChild(slcPages);
	        var pgAfterSpan = (0, _dom.createElm)('span', ['id', this.prfxPgAfterSpan + tf.id]);
	        pgAfterSpan.appendChild((0, _dom.createText)(this.ofText));
	        pgAfterSpan.className = this.nbPgSpanCssClass;
	        targetEl.appendChild(pgAfterSpan);
	        var pgspan = (0, _dom.createElm)('span', ['id', this.prfxPgSpan + tf.id]);
	        pgspan.className = this.nbPgSpanCssClass;
	        pgspan.appendChild((0, _dom.createText)(' ' + this.nbPages + ' '));
	        targetEl.appendChild(pgspan);
	        targetEl.appendChild(btnNextSpan);
	        targetEl.appendChild(btnLastSpan);
	        this.pagingSlc = (0, _dom.elm)(this.prfxSlcPages + tf.id);
	
	        this.setPagingInfo();
	
	        if (!tf.fltGrid) {
	            tf.validateAllRows();
	            this.setPagingInfo(tf.validRowsIndex);
	        }
	
	        this.emitter.on(['after-filtering'], function () {
	            return _this2.resetPagingInfo();
	        });
	        this.emitter.on(['change-page'], function (tf, pageNumber) {
	            return _this2.setPage(pageNumber);
	        });
	        this.emitter.on(['change-page-results'], function (tf, pageLength) {
	            return _this2.changeResultsPerPage(pageLength);
	        });
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Reset paging when filters are already instantiated
	     * @param {Boolean} filterTable Execute filtering once paging instanciated
	     */
	
	
	    Paging.prototype.reset = function reset() {
	        var filterTable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	        var tf = this.tf;
	        if (this.isEnabled()) {
	            return;
	        }
	        this.enable();
	        this.init();
	
	        if (filterTable) {
	            tf.filter();
	        }
	    };
	
	    /**
	     * Reset paging info from scratch after a filtering process
	     */
	
	
	    Paging.prototype.resetPagingInfo = function resetPagingInfo() {
	        this.startPagingRow = 0;
	        this.currentPageNb = 1;
	        this.setPagingInfo(this.tf.validRowsIndex);
	    };
	
	    /**
	     * Calculate number of pages based on valid rows
	     * Refresh paging select according to number of pages
	     * @param {Array} validRows Collection of valid rows
	     */
	
	
	    Paging.prototype.setPagingInfo = function setPagingInfo(validRows) {
	        var tf = this.tf;
	        var mdiv = !this.pagingTgtId ? tf.mDiv : (0, _dom.elm)(this.pagingTgtId);
	        var pgspan = (0, _dom.elm)(this.prfxPgSpan + tf.id);
	
	        //store valid rows indexes
	        tf.validRowsIndex = validRows || tf.getValidRows(true);
	
	        //calculate nb of pages
	        this.nbPages = Math.ceil(tf.validRowsIndex.length / this.pagingLength);
	        //refresh page nb span
	        pgspan.innerHTML = this.nbPages;
	        //select clearing shortcut
	        if (this.pageSelectorType === _const.SELECT) {
	            this.pagingSlc.innerHTML = '';
	        }
	
	        if (this.nbPages > 0) {
	            mdiv.style.visibility = 'visible';
	            if (this.pageSelectorType === _const.SELECT) {
	                for (var z = 0; z < this.nbPages; z++) {
	                    var opt = (0, _dom.createOpt)(z + 1, z * this.pagingLength, false);
	                    this.pagingSlc.options[z] = opt;
	                }
	            } else {
	                //input type
	                this.pagingSlc.value = this.currentPageNb;
	            }
	        } else {
	            /*** if no results paging select and buttons are hidden ***/
	            mdiv.style.visibility = 'hidden';
	        }
	        this.groupByPage(tf.validRowsIndex);
	    };
	
	    /**
	     * Group table rows by page and display valid rows
	     * @param  {Array} validRows Collection of valid rows
	     */
	
	
	    Paging.prototype.groupByPage = function groupByPage(validRows) {
	        var tf = this.tf;
	        var rows = tf.tbl.rows;
	        var startPagingRow = parseInt(this.startPagingRow, 10);
	        var endPagingRow = startPagingRow + parseInt(this.pagingLength, 10);
	
	        //store valid rows indexes
	        if (validRows) {
	            tf.validRowsIndex = validRows;
	        }
	
	        //this loop shows valid rows of current page
	        for (var h = 0, len = tf.getValidRowsNb(true); h < len; h++) {
	            var validRowIdx = tf.validRowsIndex[h];
	            var r = rows[validRowIdx];
	            var isRowValid = r.getAttribute('validRow');
	            var rowDisplayed = false;
	
	            if (h >= startPagingRow && h < endPagingRow) {
	                if ((0, _types.isNull)(isRowValid) || Boolean(isRowValid === 'true')) {
	                    r.style.display = '';
	                    rowDisplayed = true;
	                }
	            } else {
	                r.style.display = _const.NONE;
	            }
	            this.emitter.emit('row-paged', tf, validRowIdx, h, rowDisplayed);
	        }
	
	        // broadcast grouping by page
	        this.emitter.emit('grouped-by-page', tf, this);
	    };
	
	    /**
	     * Return the current page number
	     * @return {Number} Page number
	     */
	
	
	    Paging.prototype.getPage = function getPage() {
	        return this.currentPageNb;
	    };
	
	    /**
	     * Show page defined by passed argument (string or number):
	     * @param {String}/{Number} cmd possible string values: 'next',
	     *   'previous', 'last', 'first' or page number as per param
	     */
	
	
	    Paging.prototype.setPage = function setPage(cmd) {
	        var tf = this.tf;
	        if (!tf.isInitialized() || !this.isEnabled()) {
	            return;
	        }
	        var btnEvt = this.evt,
	            cmdtype = typeof cmd === 'undefined' ? 'undefined' : _typeof(cmd);
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
	        } else if (cmdtype === 'number') {
	            this.changePage(cmd - 1);
	        }
	    };
	
	    /**
	     * Generates UI elements for the number of results per page drop-down
	     */
	
	
	    Paging.prototype.setResultsPerPage = function setResultsPerPage() {
	        var _this3 = this;
	
	        var tf = this.tf;
	        var evt = this.evt;
	
	        if (this.resultsPerPageSlc || !this.resultsPerPage) {
	            return;
	        }
	
	        evt.slcResultsChange = function (ev) {
	            _this3.onChangeResultsPerPage();
	            ev.target.blur();
	        };
	
	        var slcR = (0, _dom.createElm)(_const.SELECT, ['id', this.prfxSlcResults + tf.id]);
	        slcR.className = this.resultsSlcCssClass;
	        var slcRText = this.resultsPerPage[0],
	            slcROpts = this.resultsPerPage[1];
	        var slcRSpan = (0, _dom.createElm)('span', ['id', this.prfxSlcResultsTxt + tf.id]);
	        slcRSpan.className = this.resultsSpanCssClass;
	
	        // results per page select is added to external element
	        if (!this.resultsPerPageTgtId) {
	            tf.setToolbar();
	        }
	        var targetEl = !this.resultsPerPageTgtId ? tf.rDiv : (0, _dom.elm)(this.resultsPerPageTgtId);
	        slcRSpan.appendChild((0, _dom.createText)(slcRText));
	
	        var help = tf.feature('help');
	        if (help && help.btn) {
	            help.btn.parentNode.insertBefore(slcRSpan, help.btn);
	            help.btn.parentNode.insertBefore(slcR, help.btn);
	        } else {
	            targetEl.appendChild(slcRSpan);
	            targetEl.appendChild(slcR);
	        }
	
	        for (var r = 0; r < slcROpts.length; r++) {
	            var currOpt = new Option(slcROpts[r], slcROpts[r], false, false);
	            slcR.options[r] = currOpt;
	        }
	        (0, _event.addEvt)(slcR, 'change', evt.slcResultsChange);
	        this.resultsPerPageSlc = slcR;
	    };
	
	    /**
	     * Remove number of results per page UI elements
	     */
	
	
	    Paging.prototype.removeResultsPerPage = function removeResultsPerPage() {
	        var tf = this.tf;
	        if (!tf.isInitialized() || !this.resultsPerPageSlc || !this.resultsPerPage) {
	            return;
	        }
	        var slcR = this.resultsPerPageSlc,
	            slcRSpan = (0, _dom.elm)(this.prfxSlcResultsTxt + tf.id);
	        if (slcR) {
	            (0, _dom.removeElm)(slcR);
	        }
	        if (slcRSpan) {
	            (0, _dom.removeElm)(slcRSpan);
	        }
	        this.resultsPerPageSlc = null;
	    };
	
	    /**
	     * Change the page based on passed index
	     * @param {Number} index Index of the page (0-n)
	     */
	
	
	    Paging.prototype.changePage = function changePage(index) {
	        var tf = this.tf;
	
	        if (!this.isEnabled()) {
	            return;
	        }
	
	        this.emitter.emit('before-page-change', tf, index + 1);
	
	        if (index === null) {
	            index = this.pageSelectorType === _const.SELECT ? this.pagingSlc.options.selectedIndex : this.pagingSlc.value - 1;
	        }
	        if (index >= 0 && index <= this.nbPages - 1) {
	            if (this.onBeforeChangePage) {
	                this.onBeforeChangePage.call(null, this, index + 1);
	            }
	            this.currentPageNb = parseInt(index, 10) + 1;
	            if (this.pageSelectorType === _const.SELECT) {
	                this.pagingSlc.options[index].selected = true;
	            } else {
	                this.pagingSlc.value = this.currentPageNb;
	            }
	
	            this.startPagingRow = this.pageSelectorType === _const.SELECT ? this.pagingSlc.value : index * this.pagingLength;
	
	            this.groupByPage();
	
	            if (this.onAfterChangePage) {
	                this.onAfterChangePage.call(null, this, index + 1);
	            }
	        }
	
	        this.emitter.emit('after-page-change', tf, index + 1);
	    };
	
	    /**
	     * Change the number of results per page based on passed value
	     * @param {String} val The number of results per page
	     */
	
	
	    Paging.prototype.changeResultsPerPage = function changeResultsPerPage(val) {
	        if (!this.isEnabled() || isNaN(val)) {
	            return;
	        }
	
	        this.resultsPerPageSlc.value = val;
	        this.onChangeResultsPerPage();
	    };
	
	    /**
	     * Change rows according to page results drop-down
	     */
	
	
	    Paging.prototype.onChangeResultsPerPage = function onChangeResultsPerPage() {
	        var tf = this.tf;
	
	        if (!this.isEnabled()) {
	            return;
	        }
	
	        this.emitter.emit('before-page-length-change', tf);
	
	        var slcR = this.resultsPerPageSlc;
	        var slcIndex = slcR.selectedIndex;
	        var slcPagesSelIndex = this.pageSelectorType === _const.SELECT ? this.pagingSlc.selectedIndex : parseInt(this.pagingSlc.value - 1, 10);
	        this.pagingLength = parseInt(slcR.options[slcIndex].value, 10);
	        this.startPagingRow = this.pagingLength * slcPagesSelIndex;
	
	        if (!isNaN(this.pagingLength)) {
	            if (this.startPagingRow >= tf.nbFilterableRows) {
	                this.startPagingRow = tf.nbFilterableRows - this.pagingLength;
	            }
	            this.setPagingInfo();
	
	            if (this.pageSelectorType === _const.SELECT) {
	                var slcIdx = this.pagingSlc.options.length - 1 <= slcPagesSelIndex ? this.pagingSlc.options.length - 1 : slcPagesSelIndex;
	                this.pagingSlc.options[slcIdx].selected = true;
	            }
	        }
	
	        this.emitter.emit('after-page-length-change', tf, this.pagingLength);
	    };
	
	    /**
	     * Re-set page nb at page re-load
	     */
	
	
	    Paging.prototype.resetPage = function resetPage() {
	        var tf = this.tf;
	        if (!this.isEnabled()) {
	            return;
	        }
	        this.emitter.emit('before-reset-page', tf);
	        var pgNb = tf.feature('store').getPageNb();
	        if (pgNb !== '') {
	            this.changePage(pgNb - 1);
	        }
	        this.emitter.emit('after-reset-page', tf, pgNb);
	    };
	
	    /**
	     * Re-set page length value at page re-load
	     */
	
	
	    Paging.prototype.resetPageLength = function resetPageLength() {
	        var tf = this.tf;
	        if (!this.isEnabled()) {
	            return;
	        }
	        this.emitter.emit('before-reset-page-length', tf);
	        var pglenIndex = tf.feature('store').getPageLength();
	
	        if (pglenIndex !== '') {
	            this.resultsPerPageSlc.options[pglenIndex].selected = true;
	            this.changeResultsPerPage();
	        }
	        this.emitter.emit('after-reset-page-length', tf, pglenIndex);
	    };
	
	    /**
	     * Remove paging feature
	     */
	
	
	    Paging.prototype.destroy = function destroy() {
	        var _this4 = this;
	
	        var tf = this.tf;
	
	        if (!this.initialized) {
	            return;
	        }
	        // btns containers
	        var btnNextSpan = (0, _dom.elm)(this.prfxBtnNextSpan + tf.id);
	        var btnPrevSpan = (0, _dom.elm)(this.prfxBtnPrevSpan + tf.id);
	        var btnLastSpan = (0, _dom.elm)(this.prfxBtnLastSpan + tf.id);
	        var btnFirstSpan = (0, _dom.elm)(this.prfxBtnFirstSpan + tf.id);
	        //span containing 'Page' text
	        var pgBeforeSpan = (0, _dom.elm)(this.prfxPgBeforeSpan + tf.id);
	        //span containing 'of' text
	        var pgAfterSpan = (0, _dom.elm)(this.prfxPgAfterSpan + tf.id);
	        //span containing nb of pages
	        var pgspan = (0, _dom.elm)(this.prfxPgSpan + tf.id);
	
	        var evt = this.evt;
	
	        if (this.pagingSlc) {
	            if (this.pageSelectorType === _const.SELECT) {
	                (0, _event.removeEvt)(this.pagingSlc, 'change', evt.slcPagesChange);
	            } else if (this.pageSelectorType === _const.INPUT) {
	                (0, _event.removeEvt)(this.pagingSlc, 'keypress', evt._detectKey);
	            }
	            (0, _dom.removeElm)(this.pagingSlc);
	        }
	
	        if (btnNextSpan) {
	            (0, _event.removeEvt)(btnNextSpan, 'click', evt.next);
	            (0, _dom.removeElm)(btnNextSpan);
	        }
	
	        if (btnPrevSpan) {
	            (0, _event.removeEvt)(btnPrevSpan, 'click', evt.prev);
	            (0, _dom.removeElm)(btnPrevSpan);
	        }
	
	        if (btnLastSpan) {
	            (0, _event.removeEvt)(btnLastSpan, 'click', evt.last);
	            (0, _dom.removeElm)(btnLastSpan);
	        }
	
	        if (btnFirstSpan) {
	            (0, _event.removeEvt)(btnFirstSpan, 'click', evt.first);
	            (0, _dom.removeElm)(btnFirstSpan);
	        }
	
	        if (pgBeforeSpan) {
	            (0, _dom.removeElm)(pgBeforeSpan);
	        }
	
	        if (pgAfterSpan) {
	            (0, _dom.removeElm)(pgAfterSpan);
	        }
	
	        if (pgspan) {
	            (0, _dom.removeElm)(pgspan);
	        }
	
	        if (this.hasResultsPerPage) {
	            this.removeResultsPerPage();
	        }
	
	        this.emitter.off(['after-filtering'], function () {
	            return _this4.resetPagingInfo();
	        });
	        this.emitter.off(['change-page'], function (tf, pageNumber) {
	            return _this4.setPage(pageNumber);
	        });
	        this.emitter.off(['change-page-results'], function (tf, pageLength) {
	            return _this4.changeResultsPerPage(pageLength);
	        });
	
	        this.pagingSlc = null;
	        this.nbPages = 0;
	        this.disable();
	        this.initialized = false;
	    };
	
	    return Paging;
	}(_feature.Feature);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ClearButton = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _event = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Clear button UI component
	 */
	var ClearButton = exports.ClearButton = function (_Feature) {
	    _inherits(ClearButton, _Feature);
	
	    /**
	     * Creates an instance of ClearButton
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function ClearButton(tf) {
	        _classCallCheck(this, ClearButton);
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'btnReset'));
	
	        var f = _this.config;
	
	        /**
	         * Container element ID
	         * @type {String}
	         */
	        _this.targetId = f.btn_reset_target_id || null;
	
	        /**
	         * Clear button element
	         * @type {DOMElement}
	         * @private
	         */
	        _this.element = null;
	
	        /**
	         * Text for the clear button
	         * @type {String}
	         */
	        _this.text = f.btn_reset_text || 'Reset';
	
	        /**
	         * Css class for reset button
	         * @type {String}
	         */
	        _this.cssClass = f.btn_reset_css_class || 'reset';
	
	        /**
	         * Tooltip text for the clear button
	         * @type {String}
	         */
	        _this.tooltip = f.btn_reset_tooltip || 'Clear filters';
	
	        /**
	         * Custom Html string for the clear button
	         * @type {String}
	         */
	        _this.html = f.btn_reset_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + _this.cssClass + '" ' + 'title="' + _this.tooltip + '" />');
	
	        /**
	         * Prefix for container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxCont = 'resetspan_';
	        return _this;
	    }
	
	    /**
	     * Click event handler for clear button
	     * @private
	     */
	
	
	    ClearButton.prototype.onClick = function onClick() {
	        if (!this.isEnabled()) {
	            return;
	        }
	        this.tf.clearFilters();
	    };
	
	    /**
	     * Initialize clear button component
	     */
	
	
	    ClearButton.prototype.init = function init() {
	        var _this2 = this;
	
	        var tf = this.tf;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var resetspan = (0, _dom.createElm)('span', ['id', this.prfxCont + tf.id]);
	
	        // reset button is added to defined element
	        if (!this.targetId) {
	            tf.setToolbar();
	        }
	        var targetEl = !this.targetId ? tf.rDiv : (0, _dom.elm)(this.targetId);
	        targetEl.appendChild(resetspan);
	
	        if (!this.html) {
	            var fltReset = (0, _dom.createElm)('a', ['href', 'javascript:void(0);']);
	            fltReset.className = this.cssClass;
	            fltReset.appendChild((0, _dom.createText)(this.text));
	            resetspan.appendChild(fltReset);
	            (0, _event.addEvt)(fltReset, 'click', function () {
	                return _this2.onClick();
	            });
	        } else {
	            resetspan.innerHTML = this.html;
	            var resetEl = resetspan.firstChild;
	            (0, _event.addEvt)(resetEl, 'click', function () {
	                return _this2.onClick();
	            });
	        }
	        this.element = resetspan.firstChild;
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Destroy ClearButton instance
	     */
	
	
	    ClearButton.prototype.destroy = function destroy() {
	        var tf = this.tf;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        var resetspan = (0, _dom.elm)(this.prfxCont + tf.id);
	        if (resetspan) {
	            (0, _dom.removeElm)(resetspan);
	        }
	        this.element = null;
	        this.initialized = false;
	    };
	
	    return ClearButton;
	}(_feature.Feature);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Help = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _event = __webpack_require__(1);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WIKI_URL = 'https://github.com/koalyptus/TableFilter/wiki/' + '4.-Filter-operators';
	var WEBSITE_URL = 'http://koalyptus.github.io/TableFilter/';
	
	/**
	 * Help UI component
	 */
	
	var Help = exports.Help = function (_Feature) {
	    _inherits(Help, _Feature);
	
	    /**
	     * Creates an instance of Help.
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function Help(tf) {
	        _classCallCheck(this, Help);
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'help'));
	
	        var f = _this.config;
	
	        /**
	         * ID of main custom container element
	         * @type {String}
	         */
	        _this.tgtId = f.help_instructions_target_id || null;
	
	        /**
	         * ID of custom container element for instructions
	         * @type {String}
	         */
	        _this.contTgtId = f.help_instructions_container_target_id || null;
	
	        /**
	         * Instructions text (accepts HTML)
	         * @type {String}
	         */
	        _this.instrText = f.help_instructions_text ? f.help_instructions_text : 'Use the filters above each column to filter and limit table ' + 'data. Advanced searches can be performed by using the following ' + 'operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, ' + '<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, ' + '<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, ' + '<b>rgx:</b><br/><a href="' + WIKI_URL + '" target="_blank">' + 'Learn more</a><hr/>';
	
	        /**
	         * Instructions HTML
	         * @type {String}
	         */
	        _this.instrHtml = f.help_instructions_html || null;
	
	        /**
	         * Help button text ('?')
	         * @type {String}
	         */
	        _this.btnText = f.help_instructions_btn_text || '?';
	
	        /**
	         * Custom help button HTML
	         * @type {String}
	         */
	        _this.btnHtml = f.help_instructions_btn_html || null;
	
	        /**
	         * Css class for help button
	         * @type {String}
	         */
	        _this.btnCssClass = f.help_instructions_btn_css_class || 'helpBtn';
	
	        /**
	         * Css class for help container element
	         * @type {String}
	         */
	        _this.contCssClass = f.help_instructions_container_css_class || 'helpCont';
	
	        /**
	         * Stores button DOM element
	         * @type {DOMElement}
	         */
	        _this.btn = null;
	
	        /**
	         * Stores help container DOM element
	         * @type {DOMElement}
	         */
	        _this.cont = null;
	
	        /**
	         * Default HTML appended to instructions text
	         * @type {String}
	         */
	        _this.defaultHtml = '<div class="helpFooter"><h4>TableFilter ' + 'v' + tf.version + '</h4>' + '<a href="' + WEBSITE_URL + '" target="_blank">' + WEBSITE_URL + '</a>' + '<br/><span>&copy;2015-' + tf.year + ' Max Guglielmi</span>' + '<div align="center" style="margin-top:8px;">' + '<a href="javascript:void(0);" class="close">Close</a></div></div>';
	
	        /**
	         * Prefix for help main container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxHelpSpan = 'helpSpan_';
	
	        /**
	         * Prefix for help instructions container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxHelpDiv = 'helpDiv_';
	
	        _this.emitter.on(['init-help'], function () {
	            return _this.init();
	        });
	        return _this;
	    }
	
	    /**
	     * Initialise Help instance
	     */
	
	
	    Help.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var tf = this.tf;
	
	        var helpspan = (0, _dom.createElm)('span', ['id', this.prfxHelpSpan + tf.id]);
	        var helpdiv = (0, _dom.createElm)('div', ['id', this.prfxHelpDiv + tf.id]);
	
	        //help button is added to defined element
	        if (!this.tgtId) {
	            tf.setToolbar();
	        }
	        var targetEl = !this.tgtId ? tf.rDiv : (0, _dom.elm)(this.tgtId);
	        targetEl.appendChild(helpspan);
	
	        var divContainer = !this.contTgtId ? helpspan : (0, _dom.elm)(this.contTgtId);
	
	        if (!this.btnHtml) {
	            divContainer.appendChild(helpdiv);
	            var helplink = (0, _dom.createElm)('a', ['href', 'javascript:void(0);']);
	            helplink.className = this.btnCssClass;
	            helplink.appendChild((0, _dom.createText)(this.btnText));
	            helpspan.appendChild(helplink);
	            (0, _event.addEvt)(helplink, 'click', function () {
	                return _this2.toggle();
	            });
	        } else {
	            helpspan.innerHTML = this.btnHtml;
	            var helpEl = helpspan.firstChild;
	            (0, _event.addEvt)(helpEl, 'click', function () {
	                return _this2.toggle();
	            });
	            divContainer.appendChild(helpdiv);
	        }
	
	        if (!this.instrHtml) {
	            helpdiv.innerHTML = this.instrText;
	            helpdiv.className = this.contCssClass;
	            (0, _event.addEvt)(helpdiv, 'dblclick', function () {
	                return _this2.toggle();
	            });
	        } else {
	            if (this.contTgtId) {
	                divContainer.appendChild(helpdiv);
	            }
	            helpdiv.innerHTML = this.instrHtml;
	            if (!this.contTgtId) {
	                helpdiv.className = this.contCssClass;
	                (0, _event.addEvt)(helpdiv, 'dblclick', function () {
	                    return _this2.toggle();
	                });
	            }
	        }
	        helpdiv.innerHTML += this.defaultHtml;
	        (0, _event.addEvt)(helpdiv, 'click', function () {
	            return _this2.toggle();
	        });
	
	        this.cont = helpdiv;
	        this.btn = helpspan;
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Toggle help pop-up
	     */
	
	
	    Help.prototype.toggle = function toggle() {
	        // check only if explicitily set to false as in this case undefined
	        // signifies the help feature is enabled by default
	        if (this.enabled === false) {
	            return;
	        }
	        var divDisplay = this.cont.style.display;
	        if (divDisplay === '' || divDisplay === _const.NONE) {
	            this.cont.style.display = 'inline';
	        } else {
	            this.cont.style.display = _const.NONE;
	        }
	    };
	
	    /**
	     * Remove help UI
	     */
	
	
	    Help.prototype.destroy = function destroy() {
	        if (!this.initialized) {
	            return;
	        }
	        (0, _dom.removeElm)(this.btn);
	        this.btn = null;
	        if (!this.cont) {
	            return;
	        }
	        (0, _dom.removeElm)(this.cont);
	        this.cont = null;
	        this.initialized = false;
	    };
	
	    return Help;
	}(_feature.Feature);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AlternateRows = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Rows with alternating background color for improved readability
	 */
	var AlternateRows = exports.AlternateRows = function (_Feature) {
	    _inherits(AlternateRows, _Feature);
	
	    /**
	     * Creates an instance of AlternateRows.
	     *
	     * @param {Object} tf TableFilter instance
	     */
	    function AlternateRows(tf) {
	        _classCallCheck(this, AlternateRows);
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'alternateRows'));
	
	        var config = _this.config;
	        /**
	         * Css class for even rows (default: 'even')
	         * @type {String}
	         */
	        _this.evenCss = config.even_row_css_class || 'even';
	
	        /**
	         * Css class for odd rows (default: 'odd')
	         * @type {String}
	         */
	        _this.oddCss = config.odd_row_css_class || 'odd';
	        return _this;
	    }
	
	    /**
	     * Sets alternating rows color
	     */
	
	
	    AlternateRows.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        this.processAll();
	
	        // Subscribe to events
	        this.emitter.on(['row-processed', 'row-paged'], function (tf, rowIndex, arrIndex, isValid) {
	            return _this2.processRow(rowIndex, arrIndex, isValid);
	        });
	        this.emitter.on(['column-sorted'], function () {
	            return _this2.processAll();
	        });
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Apply background to all valid rows
	     */
	
	
	    AlternateRows.prototype.processAll = function processAll() {
	        if (!this.isEnabled()) {
	            return;
	        }
	        var tf = this.tf;
	        var validRowsIndex = tf.getValidRows(true);
	        var indexLen = validRowsIndex.length;
	        var idx = 0;
	
	        //alternates bg color
	        for (var j = 0; j < indexLen; j++) {
	            var rowIdx = validRowsIndex[j];
	            this.setRowBg(rowIdx, idx);
	            idx++;
	        }
	    };
	
	    /**
	     * Set/remove row background based on row validation
	     * @param  {Number}  rowIdx  Row index
	     * @param  {Number}  arrIdx  Array index
	     * @param  {Boolean} isValid Valid row flag
	     */
	
	
	    AlternateRows.prototype.processRow = function processRow(rowIdx, arrIdx, isValid) {
	        if (isValid) {
	            this.setRowBg(rowIdx, arrIdx);
	        } else {
	            this.removeRowBg(rowIdx);
	        }
	    };
	
	    /**
	     * Sets row background color
	     * @param {Number} rowIdx Row index
	     * @param {Number} idx    Valid rows collection index needed to calculate bg
	     * color
	     * @private
	     */
	
	
	    AlternateRows.prototype.setRowBg = function setRowBg(rowIdx, idx) {
	        if (!this.isEnabled() || isNaN(rowIdx)) {
	            return;
	        }
	        var rows = this.tf.tbl.rows;
	        var i = isNaN(idx) ? rowIdx : idx;
	        this.removeRowBg(rowIdx);
	
	        (0, _dom.addClass)(rows[rowIdx], i % 2 ? this.evenCss : this.oddCss);
	    };
	
	    /**
	     * Removes row background color
	     * @param  {Number} idx Row index
	     * @private
	     */
	
	
	    AlternateRows.prototype.removeRowBg = function removeRowBg(idx) {
	        if (isNaN(idx)) {
	            return;
	        }
	        var rows = this.tf.tbl.rows;
	        (0, _dom.removeClass)(rows[idx], this.oddCss);
	        (0, _dom.removeClass)(rows[idx], this.evenCss);
	    };
	
	    /**
	     * Removes all alternating backgrounds
	     */
	
	
	    AlternateRows.prototype.destroy = function destroy() {
	        var _this3 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	        var nbRows = this.tf.getRowsNb(true);
	        for (var i = 0; i < nbRows; i++) {
	            this.removeRowBg(i);
	        }
	
	        // Unsubscribe to events
	        this.emitter.off(['row-processed', 'row-paged'], function (tf, rowIndex, arrIndex, isValid) {
	            return _this3.processRow(rowIndex, arrIndex, isValid);
	        });
	        this.emitter.off(['column-sorted'], function () {
	            return _this3.processAll();
	        });
	
	        this.initialized = false;
	    };
	
	    return AlternateRows;
	}(_feature.Feature);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NoResults = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * UI when filtering yields no matches
	 * @export
	 * @class NoResults
	 * @extends {Feature}
	 */
	var NoResults = exports.NoResults = function (_Feature) {
	    _inherits(NoResults, _Feature);
	
	    /**
	     * Creates an instance of NoResults
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function NoResults(tf) {
	        _classCallCheck(this, NoResults);
	
	        //configuration object
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'noResults'));
	
	        var f = _this.config.no_results_message;
	
	        /**
	         * Text (accepts HTML)
	         * @type {String}
	         */
	        _this.content = f.content || 'No results';
	
	        /**
	         * Custom container DOM element
	         * @type {DOMElement}
	         */
	        _this.customContainer = f.custom_container || null;
	
	        /**
	         * ID of custom container element
	         * @type {String}
	         */
	        _this.customContainerId = f.custom_container_id || null;
	
	        /**
	         * Indicates if UI is contained in a external element
	         * @type {Boolean}
	         * @private
	         */
	        _this.isExternal = !(0, _types.isEmpty)(_this.customContainer) || !(0, _types.isEmpty)(_this.customContainerId);
	
	        /**
	         * Css class assigned to container element
	         * @type {String}
	         */
	        _this.cssClass = f.css_class || 'no-results';
	
	        /**
	         * Stores container DOM element
	         * @type {DOMElement}
	         */
	        _this.cont = null;
	
	        /**
	         * Callback fired before the message is displayed
	         * @type {Function}
	         */
	        _this.onBeforeShow = (0, _types.isFn)(f.on_before_show_msg) ? f.on_before_show_msg : null;
	
	        /**
	         * Callback fired after the message is displayed
	         * @type {Function}
	         */
	        _this.onAfterShow = (0, _types.isFn)(f.on_after_show_msg) ? f.on_after_show_msg : null;
	
	        /**
	         * Callback fired before the message is hidden
	         * @type {Function}
	         */
	        _this.onBeforeHide = (0, _types.isFn)(f.on_before_hide_msg) ? f.on_before_hide_msg : null;
	
	        /**
	         * Callback fired after the message is hidden
	         * @type {Function}
	         */
	        _this.onAfterHide = (0, _types.isFn)(f.on_after_hide_msg) ? f.on_after_hide_msg : null;
	
	        /**
	         * Prefix for container ID
	         * @type {String}
	         * @private
	         */
	        _this.prfx = 'nores_';
	        return _this;
	    }
	
	    /**
	     * Initializes NoResults instance
	     */
	
	
	    NoResults.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	        var tf = this.tf;
	        var target = this.customContainer || (0, _dom.elm)(this.customContainerId) || tf.tbl;
	
	        //container
	        var cont = (0, _dom.createElm)('div', ['id', this.prfx + tf.id]);
	        cont.className = this.cssClass;
	        cont.innerHTML = this.content;
	
	        if (this.isExternal) {
	            target.appendChild(cont);
	        } else {
	            target.parentNode.insertBefore(cont, target.nextSibling);
	        }
	
	        this.cont = cont;
	
	        // subscribe to after-filtering event
	        this.emitter.on(['after-filtering'], function () {
	            return _this2.toggle();
	        });
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	
	        this.hide();
	    };
	
	    /**
	     * Toggle no results message
	     */
	
	
	    NoResults.prototype.toggle = function toggle() {
	        if (this.tf.getValidRowsNb() > 0) {
	            this.hide();
	        } else {
	            this.show();
	        }
	    };
	
	    /**
	     * Show no results message
	     */
	
	
	    NoResults.prototype.show = function show() {
	        if (!this.initialized || !this.isEnabled()) {
	            return;
	        }
	
	        if (this.onBeforeShow) {
	            this.onBeforeShow.call(null, this.tf, this);
	        }
	
	        this.setWidth();
	        this.cont.style.display = 'block';
	
	        if (this.onAfterShow) {
	            this.onAfterShow.call(null, this.tf, this);
	        }
	    };
	
	    /**
	     * Hide no results message
	     */
	
	
	    NoResults.prototype.hide = function hide() {
	        if (!this.initialized || !this.isEnabled()) {
	            return;
	        }
	
	        if (this.onBeforeHide) {
	            this.onBeforeHide.call(null, this.tf, this);
	        }
	
	        this.cont.style.display = _const.NONE;
	
	        if (this.onAfterHide) {
	            this.onAfterHide.call(null, this.tf, this);
	        }
	    };
	
	    /**
	     * Sets no results container width
	     * @private
	     */
	
	
	    NoResults.prototype.setWidth = function setWidth() {
	        if (!this.initialized || this.isExternal || !this.isEnabled()) {
	            return;
	        }
	        var tf = this.tf;
	        if (tf.gridLayout) {
	            var gridLayout = tf.feature('gridLayout');
	            this.cont.style.width = gridLayout.tblCont.clientWidth + 'px';
	        } else {
	            this.cont.style.width = (tf.tbl.tHead ? tf.tbl.tHead.clientWidth : tf.tbl.tBodies[0].clientWidth) + 'px';
	        }
	    };
	
	    /**
	     * Remove feature
	     */
	
	
	    NoResults.prototype.destroy = function destroy() {
	        var _this3 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	        (0, _dom.removeElm)(this.cont);
	        this.cont = null;
	        // unsubscribe to after-filtering event
	        this.emitter.off(['after-filtering'], function () {
	            return _this3.toggle();
	        });
	
	        this.initialized = false;
	    };
	
	    return NoResults;
	}(_feature.Feature);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.State = undefined;
	
	var _feature = __webpack_require__(9);
	
	var _hash = __webpack_require__(26);
	
	var _storage = __webpack_require__(27);
	
	var _string = __webpack_require__(5);
	
	var _types = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Features state object persistable with localStorage, cookie or URL hash
	 *
	 * @export
	 * @class State
	 * @extends {Feature}
	 */
	var State = exports.State = function (_Feature) {
	    _inherits(State, _Feature);
	
	    /**
	     * Creates an instance of State
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function State(tf) {
	        _classCallCheck(this, State);
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'state'));
	
	        var cfg = _this.config.state;
	
	        /**
	         * Determines whether state is persisted with URL hash
	         * @type {Boolean}
	         */
	        _this.enableHash = cfg === true || (0, _types.isArray)(cfg.types) && cfg.types.indexOf('hash') !== -1;
	
	        /**
	         * Determines whether state is persisted with localStorage
	         * @type {Boolean}
	         */
	        _this.enableLocalStorage = (0, _types.isArray)(cfg.types) && cfg.types.indexOf('local_storage') !== -1;
	
	        /**
	         * Determines whether state is persisted with localStorage
	         * @type {Boolean}
	         */
	        _this.enableCookie = (0, _types.isArray)(cfg.types) && cfg.types.indexOf('cookie') !== -1;
	
	        /**
	         * Persist filters values, enabled by default
	         * @type {Boolean}
	         */
	        _this.persistFilters = cfg.filters === false ? false : true;
	
	        /**
	         * Persist current page number when paging is enabled
	         * @type {Boolean}
	         */
	        _this.persistPageNumber = Boolean(cfg.page_number);
	
	        /**
	         * Persist page length when paging is enabled
	         * @type {Boolean}
	         */
	        _this.persistPageLength = Boolean(cfg.page_length);
	
	        /**
	         * Persist column sorting
	         * @type {Boolean}
	         */
	        _this.persistSort = Boolean(cfg.sort);
	
	        /**
	         * Persist columns visibility
	         * @type {Boolean}
	         */
	        _this.persistColsVisibility = Boolean(cfg.columns_visibility);
	
	        /**
	         * Persist filters row visibility
	         * @type {Boolean}
	         */
	        _this.persistFiltersVisibility = Boolean(cfg.filters_visibility);
	
	        /**
	         * Cookie duration in hours
	         * @type {Boolean}
	         */
	        _this.cookieDuration = !isNaN(cfg.cookie_duration) ? parseInt(cfg.cookie_duration, 10) : 87600;
	
	        /**
	         * Enable Storage if localStorage or cookie is required
	         * @type {Boolean}
	         * @private
	         */
	        _this.enableStorage = _this.enableLocalStorage || _this.enableCookie;
	
	        /**
	         * Storage instance if storage is required
	         * @type {Storage}
	         * @private
	         */
	        _this.storage = null;
	
	        /**
	         * Hash instance if URL hash is required
	         * @type {Boolean}
	         * @private
	         */
	        _this.hash = null;
	
	        /**
	         * Current page number
	         * @type {Number}
	         * @private
	         */
	        _this.pageNb = null;
	
	        /**
	         * Current page length
	         * @type {Number}
	         * @private
	         */
	        _this.pageLength = null;
	
	        /**
	         * Current column sorting
	         * @type {Object}
	         * @private
	         */
	        _this.sort = null;
	
	        /**
	         * Current hidden columns
	         * @type {Object}
	         * @private
	         */
	        _this.hiddenCols = null;
	
	        /**
	         * Filters row visibility
	         * @type {Boolean}
	         * @private
	         */
	        _this.filtersVisibility = null;
	
	        /**
	         * State object
	         * @type {Object}
	         * @private
	         */
	        _this.state = {};
	
	        /**
	         * Prefix for column ID
	         * @type {String}
	         * @private
	         */
	        _this.prfxCol = 'col_';
	
	        /**
	         * Prefix for page number ID
	         * @type {String}
	         * @private
	         */
	        _this.pageNbKey = 'page';
	
	        /**
	         * Prefix for page length ID
	         * @type {String}
	         * @private
	         */
	        _this.pageLengthKey = 'page_length';
	
	        /**
	         * Prefix for filters visibility ID
	         * @type {String}
	         * @private
	         */
	        _this.filtersVisKey = 'filters_visibility';
	        return _this;
	    }
	
	    /**
	     * Initializes State instance
	     */
	
	
	    State.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        this.emitter.on(['after-filtering'], function () {
	            return _this2.update();
	        });
	        this.emitter.on(['after-page-change', 'after-clearing-filters'], function (tf, pageNb) {
	            return _this2.updatePage(pageNb);
	        });
	        this.emitter.on(['after-page-length-change'], function (tf, pageLength) {
	            return _this2.updatePageLength(pageLength);
	        });
	        this.emitter.on(['column-sorted'], function (tf, index, descending) {
	            return _this2.updateSort(index, descending);
	        });
	        this.emitter.on(['sort-initialized'], function () {
	            return _this2._syncSort();
	        });
	        this.emitter.on(['columns-visibility-initialized'], function () {
	            return _this2._syncColsVisibility();
	        });
	        this.emitter.on(['column-shown', 'column-hidden'], function (tf, feature, colIndex, hiddenCols) {
	            return _this2.updateColsVisibility(hiddenCols);
	        });
	        this.emitter.on(['filters-visibility-initialized'], function () {
	            return _this2._syncFiltersVisibility();
	        });
	        this.emitter.on(['filters-toggled'], function (tf, extension, visible) {
	            return _this2.updateFiltersVisibility(visible);
	        });
	
	        if (this.enableHash) {
	            this.hash = new _hash.Hash(this);
	            this.hash.init();
	        }
	        if (this.enableStorage) {
	            this.storage = new _storage.Storage(this);
	            this.storage.init();
	        }
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Update state object based on current features state
	     */
	
	
	    State.prototype.update = function update() {
	        var _this3 = this;
	
	        if (!this.isEnabled()) {
	            return;
	        }
	        var state = this.state;
	        var tf = this.tf;
	
	        if (this.persistFilters) {
	            var filterValues = tf.getFiltersValue();
	
	            filterValues.forEach(function (val, idx) {
	                var key = '' + _this3.prfxCol + idx;
	
	                if ((0, _types.isString)(val) && (0, _string.isEmpty)(val)) {
	                    if (state.hasOwnProperty(key)) {
	                        state[key].flt = undefined;
	                    }
	                } else {
	                    state[key] = state[key] || {};
	                    state[key].flt = val;
	                }
	            });
	        }
	
	        if (this.persistPageNumber) {
	            if ((0, _types.isNull)(this.pageNb)) {
	                state[this.pageNbKey] = undefined;
	            } else {
	                state[this.pageNbKey] = this.pageNb;
	            }
	        }
	
	        if (this.persistPageLength) {
	            if ((0, _types.isNull)(this.pageLength)) {
	                state[this.pageLengthKey] = undefined;
	            } else {
	                state[this.pageLengthKey] = this.pageLength;
	            }
	        }
	
	        if (this.persistSort) {
	            if (!(0, _types.isNull)(this.sort)) {
	                // Remove previuosly sorted column
	                Object.keys(state).forEach(function (key) {
	                    if (key.indexOf(_this3.prfxCol) !== -1 && state[key]) {
	                        state[key].sort = undefined;
	                    }
	                });
	
	                var key = '' + this.prfxCol + this.sort.column;
	                state[key] = state[key] || {};
	                state[key].sort = { descending: this.sort.descending };
	            }
	        }
	
	        if (this.persistColsVisibility) {
	            if (!(0, _types.isNull)(this.hiddenCols)) {
	                // Clear previuosly hidden columns
	                Object.keys(state).forEach(function (key) {
	                    if (key.indexOf(_this3.prfxCol) !== -1 && state[key]) {
	                        state[key].hidden = undefined;
	                    }
	                });
	
	                this.hiddenCols.forEach(function (colIdx) {
	                    var key = '' + _this3.prfxCol + colIdx;
	                    state[key] = state[key] || {};
	                    state[key].hidden = true;
	                });
	            }
	        }
	
	        if (this.persistFiltersVisibility) {
	            if ((0, _types.isNull)(this.filtersVisibility)) {
	                state[this.filtersVisKey] = undefined;
	            } else {
	                state[this.filtersVisKey] = this.filtersVisibility;
	            }
	        }
	
	        this.emitter.emit('state-changed', tf, state);
	    };
	
	    /**
	     * Refresh page number field on page number changes
	     *
	     * @param {Number} pageNb Current page number
	     */
	
	
	    State.prototype.updatePage = function updatePage(pageNb) {
	        this.pageNb = pageNb;
	        this.update();
	    };
	
	    /**
	     * Refresh page length field on page length changes
	     *
	     * @param {Number} pageLength Current page length value
	     */
	
	
	    State.prototype.updatePageLength = function updatePageLength(pageLength) {
	        this.pageLength = pageLength;
	        this.update();
	    };
	
	    /**
	     * Refresh column sorting information on sort changes
	     *
	     * @param index {Number} Column index
	     * @param {Boolean} descending Descending manner
	     */
	
	
	    State.prototype.updateSort = function updateSort(index, descending) {
	        this.sort = {
	            column: index,
	            descending: descending
	        };
	        this.update();
	    };
	
	    /**
	     * Refresh hidden columns information on columns visibility changes
	     *
	     * @param {Array} hiddenCols Columns indexes
	     */
	
	
	    State.prototype.updateColsVisibility = function updateColsVisibility(hiddenCols) {
	        this.hiddenCols = hiddenCols;
	        this.update();
	    };
	
	    /**
	     * Refresh filters visibility on filters visibility change
	     *
	     * @param {Boolean} visible Visibility flad
	     */
	
	
	    State.prototype.updateFiltersVisibility = function updateFiltersVisibility(visible) {
	        this.filtersVisibility = visible;
	        this.update();
	    };
	
	    /**
	     * Override state field
	     *
	     * @param state State object
	     */
	
	
	    State.prototype.override = function override(state) {
	        this.state = state;
	    };
	
	    /**
	     * Sync stored features state
	     */
	
	
	    State.prototype.sync = function sync() {
	        var state = this.state;
	        var tf = this.tf;
	
	        this._syncFilters();
	
	        if (this.persistPageNumber) {
	            var pageNumber = state[this.pageNbKey];
	            this.emitter.emit('change-page', tf, pageNumber);
	        }
	
	        if (this.persistPageLength) {
	            var pageLength = state[this.pageLengthKey];
	            this.emitter.emit('change-page-results', tf, pageLength);
	        }
	
	        this._syncSort();
	        this._syncColsVisibility();
	        this._syncFiltersVisibility();
	    };
	
	    /**
	     * Override current state with passed one and sync features
	     *
	     * @param {Object} state State object
	     */
	
	
	    State.prototype.overrideAndSync = function overrideAndSync(state) {
	        // To prevent state to react to features changes, state is temporarily
	        // disabled
	        this.disable();
	        // State is overriden with passed state object
	        this.override(state);
	        // New hash state is applied to features
	        this.sync();
	        // State is re-enabled
	        this.enable();
	    };
	
	    /**
	     * Sync filters with stored values and filter table
	     *
	     * @private
	     */
	
	
	    State.prototype._syncFilters = function _syncFilters() {
	        var _this4 = this;
	
	        if (!this.persistFilters) {
	            return;
	        }
	        var state = this.state;
	        var tf = this.tf;
	
	        Object.keys(state).forEach(function (key) {
	            if (key.indexOf(_this4.prfxCol) !== -1) {
	                var colIdx = parseInt(key.replace(_this4.prfxCol, ''), 10);
	                var val = state[key].flt;
	                tf.setFilterValue(colIdx, val);
	            }
	        });
	
	        tf.filter();
	    };
	
	    /**
	     * Sync sorted column with stored sorting information and sort table
	     *
	     * @private
	     */
	
	
	    State.prototype._syncSort = function _syncSort() {
	        var _this5 = this;
	
	        if (!this.persistSort) {
	            return;
	        }
	        var state = this.state;
	        var tf = this.tf;
	
	        Object.keys(state).forEach(function (key) {
	            if (key.indexOf(_this5.prfxCol) !== -1) {
	                var colIdx = parseInt(key.replace(_this5.prfxCol, ''), 10);
	                if (!(0, _types.isUndef)(state[key].sort)) {
	                    var sort = state[key].sort;
	                    _this5.emitter.emit('sort', tf, colIdx, sort.descending);
	                }
	            }
	        });
	    };
	
	    /**
	     * Sync hidden columns with stored information
	     *
	     * @private
	     */
	
	
	    State.prototype._syncColsVisibility = function _syncColsVisibility() {
	        var _this6 = this;
	
	        if (!this.persistColsVisibility) {
	            return;
	        }
	        var state = this.state;
	        var tf = this.tf;
	        var hiddenCols = [];
	
	        Object.keys(state).forEach(function (key) {
	            if (key.indexOf(_this6.prfxCol) !== -1) {
	                var colIdx = parseInt(key.replace(_this6.prfxCol, ''), 10);
	                if (!(0, _types.isUndef)(state[key].hidden)) {
	                    hiddenCols.push(colIdx);
	                }
	            }
	        });
	
	        hiddenCols.forEach(function (colIdx) {
	            _this6.emitter.emit('hide-column', tf, colIdx);
	        });
	    };
	
	    /**
	     * Sync filters visibility with stored information
	     *
	     * @private
	     */
	
	
	    State.prototype._syncFiltersVisibility = function _syncFiltersVisibility() {
	        if (!this.persistFiltersVisibility) {
	            return;
	        }
	        var state = this.state;
	        var tf = this.tf;
	        var filtersVisibility = state[this.filtersVisKey];
	
	        this.filtersVisibility = filtersVisibility;
	        this.emitter.emit('show-filters', tf, filtersVisibility);
	    };
	
	    /**
	     * Destroy State instance
	     */
	
	
	    State.prototype.destroy = function destroy() {
	        var _this7 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        this.state = {};
	
	        this.emitter.off(['after-filtering'], function () {
	            return _this7.update();
	        });
	        this.emitter.off(['after-page-change', 'after-clearing-filters'], function (tf, pageNb) {
	            return _this7.updatePage(pageNb);
	        });
	        this.emitter.off(['after-page-length-change'], function (tf, index) {
	            return _this7.updatePageLength(index);
	        });
	        this.emitter.off(['column-sorted'], function (tf, index, descending) {
	            return _this7.updateSort(index, descending);
	        });
	        this.emitter.off(['sort-initialized'], function () {
	            return _this7._syncSort();
	        });
	        this.emitter.off(['columns-visibility-initialized'], function () {
	            return _this7._syncColsVisibility();
	        });
	        this.emitter.off(['column-shown', 'column-hidden'], function (tf, feature, colIndex, hiddenCols) {
	            return _this7.updateColsVisibility(hiddenCols);
	        });
	        this.emitter.off(['filters-visibility-initialized'], function () {
	            return _this7._syncFiltersVisibility();
	        });
	        this.emitter.off(['filters-toggled'], function (tf, extension, visible) {
	            return _this7.updateFiltersVisibility(visible);
	        });
	
	        if (this.enableHash) {
	            this.hash.destroy();
	            this.hash = null;
	        }
	
	        if (this.enableStorage) {
	            this.storage.destroy();
	            this.storage = null;
	        }
	
	        this.initialized = false;
	    };
	
	    return State;
	}(_feature.Feature);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Hash = exports.hasHashChange = undefined;
	
	var _event = __webpack_require__(1);
	
	var _root = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JSON = _root.root.JSON;
	var location = _root.root.location;
	var decodeURIComponent = _root.root.decodeURIComponent;
	var encodeURIComponent = _root.root.encodeURIComponent;
	
	/**
	 * Checks if browser has onhashchange event
	 */
	var hasHashChange = exports.hasHashChange = function hasHashChange() {
	  var docMode = _root.root.documentMode;
	  return 'onhashchange' in _root.root && (docMode === undefined || docMode > 7);
	};
	
	/**
	 * Manages state via URL hash changes
	 *
	 * @export
	 * @class Hash
	 */
	
	var Hash = exports.Hash = function () {
	
	  /**
	   * Creates an instance of Hash
	   *
	   * @param {State} state Instance of State
	   */
	  function Hash(state) {
	    _classCallCheck(this, Hash);
	
	    /**
	     * State object
	     * @type {State}
	     */
	    this.state = state;
	
	    /**
	     * Cached URL hash
	     * @type {String} Hash string
	     * @private
	     */
	    this.lastHash = null;
	
	    /**
	     * Application event emitter instance
	     * @type {Emitter}
	     */
	    this.emitter = state.emitter;
	
	    /**
	     * Bound sync wrapper for future use
	     * @private
	     */
	    this.boundSync = null;
	  }
	
	  /**
	   * Initializes the Hash object
	   */
	
	
	  Hash.prototype.init = function init() {
	    var _this = this;
	
	    if (!hasHashChange()) {
	      return;
	    }
	
	    this.lastHash = location.hash;
	    //Store a bound sync wrapper
	    this.boundSync = this.sync.bind(this);
	    this.emitter.on(['state-changed'], function (tf, state) {
	      return _this.update(state);
	    });
	    this.emitter.on(['initialized'], this.boundSync);
	    (0, _event.addEvt)(_root.root, 'hashchange', this.boundSync);
	  };
	
	  /**
	   * Updates the URL hash based on a state change
	   *
	   * @param {State} state Instance of State
	   */
	
	
	  Hash.prototype.update = function update(state) {
	    var hash = '#' + encodeURIComponent(JSON.stringify(state));
	    if (this.lastHash === hash) {
	      return;
	    }
	
	    location.hash = hash;
	    this.lastHash = hash;
	  };
	
	  /**
	   * Converts a URL hash into a state JSON object
	   *
	   * @param {String} hash URL hash fragment
	   * @returns {Object} JSON object
	   */
	
	
	  Hash.prototype.parse = function parse(hash) {
	    if (hash.indexOf('#') === -1) {
	      return null;
	    }
	    hash = hash.substr(1);
	    return JSON.parse(decodeURIComponent(hash));
	  };
	
	  /**
	   * Applies current hash state to features
	   */
	
	
	  Hash.prototype.sync = function sync() {
	    var state = this.parse(location.hash);
	    if (!state) {
	      return;
	    }
	    // override current state with persisted one and sync features
	    this.state.overrideAndSync(state);
	  };
	
	  /**
	   * Release Hash event subscriptions and clear fields
	   */
	
	
	  Hash.prototype.destroy = function destroy() {
	    var _this2 = this;
	
	    this.emitter.off(['state-changed'], function (tf, state) {
	      return _this2.update(state);
	    });
	    this.emitter.off(['initialized'], this.boundSync);
	    (0, _event.removeEvt)(_root.root, 'hashchange', this.boundSync);
	
	    this.state = null;
	    this.lastHash = null;
	    this.emitter = null;
	  };
	
	  return Hash;
	}();

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Storage = exports.hasStorage = undefined;
	
	var _cookie = __webpack_require__(28);
	
	var _cookie2 = _interopRequireDefault(_cookie);
	
	var _root = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JSON = _root.root.JSON;
	var localStorage = _root.root.localStorage;
	var location = _root.root.location;
	
	/**
	 * Checks if browser has Storage feature
	 */
	var hasStorage = exports.hasStorage = function hasStorage() {
	    return 'Storage' in _root.root;
	};
	
	/**
	 * Stores the features state in browser's local storage or cookie
	 *
	 * @export
	 * @class Storage
	 */
	
	var Storage = exports.Storage = function () {
	
	    /**
	     * Creates an instance of Storage
	     *
	     * @param {State} state Instance of State
	     */
	    function Storage(state) {
	        _classCallCheck(this, Storage);
	
	        /**
	         * State object
	         * @type {State}
	         * @private
	         */
	        this.state = state;
	
	        /**
	         * TableFilter object
	         * @type {TableFilter}
	         * @private
	         */
	        this.tf = state.tf;
	
	        /**
	         * Persist with local storage
	         * @type {Boolean}
	         * @private
	         */
	        this.enableLocalStorage = state.enableLocalStorage && hasStorage();
	
	        /**
	         * Persist with cookie
	         * @type {Boolean}
	         * @private
	         */
	        this.enableCookie = state.enableCookie && !this.enableLocalStorage;
	
	        /**
	         * Emitter object
	         * @type {Emitter}
	         * @private
	         */
	        this.emitter = state.emitter;
	
	        /**
	         * Cookie duration in hours from state object
	         * @type {Number}
	         * @private
	         */
	        this.duration = state.cookieDuration;
	    }
	
	    /**
	     * Initializes the Storage object
	     */
	
	
	    Storage.prototype.init = function init() {
	        var _this = this;
	
	        this.emitter.on(['state-changed'], function (tf, state) {
	            return _this.save(state);
	        });
	        this.emitter.on(['initialized'], function () {
	            return _this.sync();
	        });
	    };
	
	    /**
	     * Persists the features state on state changes
	     *
	     * @param {State} state Instance of State
	     */
	
	
	    Storage.prototype.save = function save(state) {
	        if (this.enableLocalStorage) {
	            localStorage[this.getKey()] = JSON.stringify(state);
	        } else {
	            _cookie2.default.write(this.getKey(), JSON.stringify(state), this.duration);
	        }
	    };
	
	    /**
	     * Turns stored string into a State JSON object
	     *
	     *  @returns {Object} JSON object
	     */
	
	
	    Storage.prototype.retrieve = function retrieve() {
	        var state = null;
	        if (this.enableLocalStorage) {
	            state = localStorage[this.getKey()];
	        } else {
	            state = _cookie2.default.read(this.getKey());
	        }
	
	        if (!state) {
	            return null;
	        }
	        return JSON.parse(state);
	    };
	
	    /**
	     * Removes persisted state from storage
	     */
	
	
	    Storage.prototype.remove = function remove() {
	        if (this.enableLocalStorage) {
	            localStorage.removeItem(this.getKey());
	        } else {
	            _cookie2.default.remove(this.getKey());
	        }
	    };
	
	    /**
	     * Applies persisted state to features
	     */
	
	
	    Storage.prototype.sync = function sync() {
	        var state = this.retrieve();
	        if (!state) {
	            return;
	        }
	        // override current state with persisted one and sync features
	        this.state.overrideAndSync(state);
	    };
	
	    /**
	     * Returns the storage key
	     *
	     * @returns {String} Key
	     */
	
	
	    Storage.prototype.getKey = function getKey() {
	        return JSON.stringify({
	            key: this.tf.prfxTf + '_' + this.tf.id,
	            path: location.pathname
	        });
	    };
	
	    /**
	     * Release Storage event subscriptions and clear fields
	     */
	
	
	    Storage.prototype.destroy = function destroy() {
	        var _this2 = this;
	
	        this.emitter.off(['state-changed'], function (tf, state) {
	            return _this2.save(state);
	        });
	        this.emitter.off(['initialized'], function () {
	            return _this2.sync();
	        });
	
	        this.remove();
	
	        this.state = null;
	        this.emitter = null;
	    };
	
	    return Storage;
	}();

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _root = __webpack_require__(2);
	
	/**
	 * Cookie utilities
	 */
	
	var doc = _root.root.document;
	
	exports.default = {
	
	    /**
	     * Write a cookie
	     * @param {String} name Name of the cookie
	     * @param {String} value Value of the cookie
	     * @param {Number} hours Cookie duration in hours
	     */
	    write: function write(name, value, hours) {
	        var expire = '';
	        if (hours) {
	            expire = new Date(new Date().getTime() + hours * 3600000);
	            expire = '; expires=' + expire.toGMTString();
	        }
	        doc.cookie = name + '=' + escape(value) + expire;
	    },
	
	
	    /**
	     * Read a cookie
	     * @param {String} name Name of the cookie
	     * @returns {String} Value of the cookie
	     */
	    read: function read(name) {
	        var cookieValue = '',
	            search = name + '=';
	        if (doc.cookie.length > 0) {
	            var cookie = doc.cookie,
	                offset = cookie.indexOf(search);
	            if (offset !== -1) {
	                offset += search.length;
	                var end = cookie.indexOf(';', offset);
	                if (end === -1) {
	                    end = cookie.length;
	                }
	                cookieValue = unescape(cookie.substring(offset, end));
	            }
	        }
	        return cookieValue;
	    },
	
	
	    /**
	     * Remove a cookie
	     * @param {String} name Name of the cookie
	     */
	    remove: function remove(name) {
	        this.write(name, '', -1);
	    }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DateType = undefined;
	
	var _sugarDate = __webpack_require__(30);
	
	__webpack_require__(416);
	
	var _feature = __webpack_require__(9);
	
	var _types = __webpack_require__(4);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Wrapper for Sugar Date module providing datetime helpers and locales
	 * @export
	 * @class DateType
	 */
	var DateType = exports.DateType = function (_Feature) {
	    _inherits(DateType, _Feature);
	
	    /**
	     * Creates an instance of DateType
	     * @param {TableFilter} tf TableFilter instance
	     */
	    function DateType(tf) {
	        _classCallCheck(this, DateType);
	
	        /**
	         * Global locale
	         * @type {String}
	         */
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'dateType'));
	
	        _this.locale = tf.locale;
	
	        /**
	         * Sugar Date instance
	         * @type {Object}
	         */
	        _this.datetime = _sugarDate.Date;
	
	        _this.enable();
	        return _this;
	    }
	
	    /**
	     * Initialize DateType instance
	     */
	
	
	    DateType.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        // Set global locale
	        this.datetime.setLocale(this.locale);
	
	        // Add formats from column types configuration if any
	        this.addConfigFormats(this.tf.colTypes);
	
	        this.emitter.on(['add-date-type-formats'], function (tf, types) {
	            return _this2.addConfigFormats(types);
	        });
	
	        // Broadcast date-type initialization
	        this.emitter.emit('date-type-initialized', this.tf, this);
	
	        /** @inherited */
	        this.initialized = true;
	    };
	
	    /**
	     * Parse a string representation of a date for a specified locale and return
	     * a date object
	     * @param {String} dateStr String representation of a date
	     * @param {String} localeCode Locale code (ie 'en-us')
	     * @returns {Date}
	     */
	
	
	    DateType.prototype.parse = function parse(dateStr, localeCode) {
	        return this.datetime.create(dateStr, localeCode);
	    };
	
	    /**
	     * Check string representation of a date for a specified locale is valid
	     * @param {any} dateStr String representation of a date
	     * @param {any} localeCode Locale code (ie 'en-us')
	     * @returns {Boolean}
	     */
	
	
	    DateType.prototype.isValid = function isValid(dateStr, localeCode) {
	        return this.datetime.isValid(this.parse(dateStr, localeCode));
	    };
	
	    /**
	     * Return the type object of a specified column as per configuration or
	     * passed collection
	     * @param {Number} colIndex Column index
	     * @param {Array} types Collection of column types, optional
	     * @returns {Object}
	     */
	
	
	    DateType.prototype.getOptions = function getOptions(colIndex, types) {
	        types = types || this.tf.colTypes;
	        var colType = types[colIndex];
	        return (0, _types.isObj)(colType) ? colType : {};
	    };
	
	    /**
	     * Add date time format(s) to a locale as specified by the passed
	     * collection of column types, ie:
	     *  [
	     *      'string',
	     *      'number',
	     *      { type: 'date', locale: 'en', format: ['{dd}/{MM}/{yyyy}']}
	     * ]
	     *
	     * @param {Array} [types=[]] Collection of column types
	     */
	
	
	    DateType.prototype.addConfigFormats = function addConfigFormats() {
	        var _this3 = this;
	
	        var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	        types.forEach(function (type, idx) {
	            var options = _this3.getOptions(idx, types);
	            if (options.type === _const.DATE && options.hasOwnProperty('format')) {
	                (function () {
	                    var locale = _this3.datetime.getLocale(options.locale || _this3.locale);
	                    if ((0, _types.isArray)(options.format)) {
	                        options.format.forEach(function (format) {
	                            locale.addFormat(format);
	                        });
	                    } else {
	                        locale.addFormat(options.format);
	                    }
	                })();
	            }
	        });
	    };
	
	    /**
	     * Remove DateType instance
	     */
	
	
	    DateType.prototype.destroy = function destroy() {
	        var _this4 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        // TODO: remove added formats
	
	        this.emitter.off(['add-date-type-formats'], function (tf, types) {
	            return _this4.addConfigFormats(types);
	        });
	
	        this.initialized = false;
	    };
	
	    return DateType;
	}(_feature.Feature);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(31);
	__webpack_require__(369);
	
	module.exports = __webpack_require__(33);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Static Methods
	__webpack_require__(32);
	__webpack_require__(92);
	__webpack_require__(138);
	__webpack_require__(140);
	__webpack_require__(141);
	__webpack_require__(142);
	__webpack_require__(143);
	
	// Instance Methods
	__webpack_require__(144);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(161);
	__webpack_require__(162);
	__webpack_require__(163);
	__webpack_require__(164);
	__webpack_require__(165);
	__webpack_require__(166);
	__webpack_require__(167);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(185);
	__webpack_require__(186);
	__webpack_require__(187);
	__webpack_require__(188);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(192);
	__webpack_require__(193);
	__webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(198);
	__webpack_require__(199);
	__webpack_require__(200);
	__webpack_require__(201);
	__webpack_require__(202);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(205);
	__webpack_require__(206);
	__webpack_require__(207);
	__webpack_require__(208);
	__webpack_require__(209);
	__webpack_require__(210);
	__webpack_require__(211);
	__webpack_require__(212);
	__webpack_require__(213);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(216);
	__webpack_require__(217);
	__webpack_require__(218);
	__webpack_require__(219);
	__webpack_require__(220);
	__webpack_require__(221);
	__webpack_require__(222);
	__webpack_require__(223);
	__webpack_require__(224);
	__webpack_require__(225);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(231);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(241);
	__webpack_require__(242);
	__webpack_require__(243);
	__webpack_require__(244);
	__webpack_require__(245);
	__webpack_require__(246);
	__webpack_require__(251);
	__webpack_require__(252);
	__webpack_require__(253);
	__webpack_require__(254);
	__webpack_require__(255);
	__webpack_require__(256);
	__webpack_require__(257);
	__webpack_require__(258);
	__webpack_require__(259);
	__webpack_require__(260);
	__webpack_require__(261);
	__webpack_require__(262);
	__webpack_require__(263);
	__webpack_require__(264);
	__webpack_require__(265);
	__webpack_require__(266);
	__webpack_require__(267);
	__webpack_require__(286);
	__webpack_require__(287);
	__webpack_require__(288);
	__webpack_require__(289);
	__webpack_require__(290);
	__webpack_require__(291);
	__webpack_require__(292);
	__webpack_require__(293);
	__webpack_require__(294);
	__webpack_require__(295);
	__webpack_require__(299);
	__webpack_require__(300);
	__webpack_require__(301);
	__webpack_require__(302);
	__webpack_require__(305);
	__webpack_require__(306);
	__webpack_require__(307);
	__webpack_require__(308);
	__webpack_require__(309);
	__webpack_require__(310);
	__webpack_require__(311);
	__webpack_require__(312);
	__webpack_require__(313);
	__webpack_require__(314);
	__webpack_require__(315);
	__webpack_require__(316);
	__webpack_require__(317);
	__webpack_require__(318);
	__webpack_require__(319);
	__webpack_require__(320);
	__webpack_require__(321);
	__webpack_require__(322);
	__webpack_require__(323);
	__webpack_require__(324);
	__webpack_require__(326);
	__webpack_require__(327);
	__webpack_require__(328);
	__webpack_require__(329);
	__webpack_require__(330);
	__webpack_require__(331);
	__webpack_require__(332);
	__webpack_require__(333);
	__webpack_require__(334);
	__webpack_require__(335);
	__webpack_require__(336);
	__webpack_require__(337);
	__webpack_require__(338);
	__webpack_require__(339);
	__webpack_require__(340);
	__webpack_require__(341);
	__webpack_require__(342);
	__webpack_require__(343);
	__webpack_require__(344);
	__webpack_require__(347);
	__webpack_require__(348);
	__webpack_require__(350);
	__webpack_require__(351);
	__webpack_require__(352);
	__webpack_require__(353);
	__webpack_require__(354);
	__webpack_require__(355);
	__webpack_require__(356);
	__webpack_require__(357);
	__webpack_require__(358);
	__webpack_require__(359);
	__webpack_require__(360);
	__webpack_require__(361);
	__webpack_require__(362);
	__webpack_require__(363);
	__webpack_require__(364);
	__webpack_require__(365);
	__webpack_require__(366);
	
	// Accessors
	__webpack_require__(367);
	__webpack_require__(368);
	
	module.exports = __webpack_require__(33);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    LocaleHelpers = __webpack_require__(34);
	
	var localeManager = LocaleHelpers.localeManager;
	
	Sugar.Date.defineStatic({
	
	  'addLocale': function(code, set) {
	    return localeManager.add(code, set);
	  }
	
	});
	
	module.exports = Sugar.Date.addLocale;

/***/ },
/* 33 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 *  Sugar v2.0.0
	 *
	 *  Freely distributable and licensed under the MIT-style license.
	 *  Copyright (c) Andrew Plummer
	 *  https://sugarjs.com/
	 *
	 * ---------------------------- */
	(function() {
	  'use strict';
	
	  /***
	   * @module Core
	   * @description Core functionality including the ability to define methods and
	   *              extend onto natives.
	   *
	   ***/
	
	  // The global to export.
	  var Sugar;
	
	  // The name of Sugar in the global namespace.
	  var SUGAR_GLOBAL = 'Sugar';
	
	  // Natives available on initialization. Letting Object go first to ensure its
	  // global is set by the time the rest are checking for chainable Object methods.
	  var NATIVE_NAMES = 'Object Number String Array Date RegExp Function';
	
	  // Static method flag
	  var STATIC   = 0x1;
	
	  // Instance method flag
	  var INSTANCE = 0x2;
	
	  // IE8 has a broken defineProperty but no defineProperties so this saves a try/catch.
	  var PROPERTY_DESCRIPTOR_SUPPORT = !!(Object.defineProperty && Object.defineProperties);
	
	  // The global context. Rhino uses a different "global" keyword so
	  // do an extra check to be sure that it's actually the global context.
	  var globalContext = typeof global !== 'undefined' && global.Object === Object ? global : this;
	
	  // Is the environment node?
	  var hasExports = typeof module !== 'undefined' && module.exports;
	
	  // Whether object instance methods can be mapped to the prototype.
	  var allowObjectPrototype = false;
	
	  // A map from Array to SugarArray.
	  var namespacesByName = {};
	
	  // A map from [object Object] to namespace.
	  var namespacesByClassString = {};
	
	  // Defining properties.
	  var defineProperty = PROPERTY_DESCRIPTOR_SUPPORT ?  Object.defineProperty : definePropertyShim;
	
	  // A default chainable class for unknown types.
	  var DefaultChainable = getNewChainableClass('Chainable');
	
	
	  // Global methods
	
	  function setupGlobal() {
	    Sugar = globalContext[SUGAR_GLOBAL];
	    if (Sugar) {
	      // Reuse already defined Sugar global object.
	      return;
	    }
	    Sugar = function(arg) {
	      forEachProperty(Sugar, function(sugarNamespace, name) {
	        // Although only the only enumerable properties on the global
	        // object are Sugar namespaces, environments that can't set
	        // non-enumerable properties will step through the utility methods
	        // as well here, so use this check to only allow true namespaces.
	        if (hasOwn(namespacesByName, name)) {
	          sugarNamespace.extend(arg);
	        }
	      });
	      return Sugar;
	    };
	    if (hasExports) {
	      module.exports = Sugar;
	    } else {
	      try {
	        globalContext[SUGAR_GLOBAL] = Sugar;
	      } catch (e) {
	        // Contexts such as QML have a read-only global context.
	      }
	    }
	    forEachProperty(NATIVE_NAMES.split(' '), function(name) {
	      createNamespace(name);
	    });
	    setGlobalProperties();
	  }
	
	  /***
	   * @method createNamespace(<name>)
	   * @returns Namespace
	   * @global
	   * @short Creates a new Sugar namespace.
	   * @extra This method is for plugin developers who want to define methods to be
	   *        used with natives that Sugar does not handle by default. The new
	   *        namespace will appear on the `Sugar` global with all the methods of
	   *        normal namespaces, including the ability to define new methods. When
	   *        extended, any defined methods will be mapped to `name` in the global
	   *        context.
	   *
	   * @example
	   *
	   *   Sugar.createNamespace('Boolean');
	   *
	   ***/
	  function createNamespace(name) {
	
	    // Is the current namespace Object?
	    var isObject = name === 'Object';
	
	    // A Sugar namespace is also a chainable class: Sugar.Array, etc.
	    var sugarNamespace = getNewChainableClass(name, true);
	
	    /***
	     * @method extend([options])
	     * @returns Sugar
	     * @global
	     * @namespace
	     * @short Extends Sugar defined methods onto natives.
	     * @extra This method can be called on individual namespaces like
	     *        `Sugar.Array` or on the `Sugar` global itself, in which case
	     *        [options] will be forwarded to each `extend` call. For more,
	     *        see `extending`.
	     *
	     * @options
	     *
	     *   methods           An array of method names to explicitly extend.
	     *
	     *   except            An array of method names or global namespaces (`Array`,
	     *                     `String`) to explicitly exclude. Namespaces should be the
	     *                     actual global objects, not strings.
	     *
	     *   namespaces        An array of global namespaces (`Array`, `String`) to
	     *                     explicitly extend. Namespaces should be the actual
	     *                     global objects, not strings.
	     *
	     *   enhance           A shortcut to disallow all "enhance" flags at once
	     *                     (flags listed below). For more, see `enhanced methods`.
	     *                     Default is `true`.
	     *
	     *   enhanceString     A boolean allowing String enhancements. Default is `true`.
	     *
	     *   enhanceArray      A boolean allowing Array enhancements. Default is `true`.
	     *
	     *   objectPrototype   A boolean allowing Sugar to extend Object.prototype
	     *                     with instance methods. This option is off by default
	     *                     and should generally not be used except with caution.
	     *                     For more, see `object methods`.
	     *
	     * @example
	     *
	     *   Sugar.Array.extend();
	     *   Sugar.extend();
	     *
	     ***/
	    var extend = function (opts) {
	
	      var nativeClass = globalContext[name], nativeProto = nativeClass.prototype;
	      var staticMethods = {}, instanceMethods = {}, methodsByName;
	
	      function objectRestricted(name, target) {
	        return isObject && target === nativeProto &&
	               (!allowObjectPrototype || name === 'get' || name === 'set');
	      }
	
	      function arrayOptionExists(field, val) {
	        var arr = opts[field];
	        if (arr) {
	          for (var i = 0, el; el = arr[i]; i++) {
	            if (el === val) {
	              return true;
	            }
	          }
	        }
	        return false;
	      }
	
	      function arrayOptionExcludes(field, val) {
	        return opts[field] && !arrayOptionExists(field, val);
	      }
	
	      function disallowedByFlags(methodName, target, flags) {
	        // Disallowing methods by flag currently only applies if methods already
	        // exist to avoid enhancing native methods, as aliases should still be
	        // extended (i.e. Array#all should still be extended even if Array#every
	        // is being disallowed by a flag).
	        if (!target[methodName] || !flags) {
	          return false;
	        }
	        for (var i = 0; i < flags.length; i++) {
	          if (opts[flags[i]] === false) {
	            return true;
	          }
	        }
	      }
	
	      function namespaceIsExcepted() {
	        return arrayOptionExists('except', nativeClass) ||
	               arrayOptionExcludes('namespaces', nativeClass);
	      }
	
	      function methodIsExcepted(methodName) {
	        return arrayOptionExists('except', methodName);
	      }
	
	      function canExtend(methodName, method, target) {
	        return !objectRestricted(methodName, target) &&
	               !disallowedByFlags(methodName, target, method.flags) &&
	               !methodIsExcepted(methodName);
	      }
	
	      opts = opts || {};
	      methodsByName = opts.methods;
	
	      if (namespaceIsExcepted()) {
	        return;
	      } else if (isObject && typeof opts.objectPrototype === 'boolean') {
	        // Store "objectPrototype" flag for future reference.
	        allowObjectPrototype = opts.objectPrototype;
	      }
	
	      forEachProperty(methodsByName || sugarNamespace, function(method, methodName) {
	        if (methodsByName) {
	          // If we have method names passed in an array,
	          // then we need to flip the key and value here
	          // and find the method in the Sugar namespace.
	          methodName = method;
	          method = sugarNamespace[methodName];
	        }
	        if (hasOwn(method, 'instance') && canExtend(methodName, method, nativeProto)) {
	          instanceMethods[methodName] = method.instance;
	        }
	        if(hasOwn(method, 'static') && canExtend(methodName, method, nativeClass)) {
	          staticMethods[methodName] = method;
	        }
	      });
	
	      // Accessing the extend target each time instead of holding a reference as
	      // it may have been overwritten (for example Date by Sinon). Also need to
	      // access through the global to allow extension of user-defined namespaces.
	      extendNative(nativeClass, staticMethods);
	      extendNative(nativeProto, instanceMethods);
	
	      if (!methodsByName) {
	        // If there are no method names passed, then
	        // all methods in the namespace will be extended
	        // to the native. This includes all future defined
	        // methods, so add a flag here to check later.
	        setProperty(sugarNamespace, 'active', true);
	      }
	      return Sugar;
	    };
	
	    function defineWithOptionCollect(methodName, instance, args) {
	      setProperty(sugarNamespace, methodName, function(arg1, arg2, arg3) {
	        var opts = collectDefineOptions(arg1, arg2, arg3);
	        defineMethods(sugarNamespace, opts.methods, instance, args, opts.last);
	        return sugarNamespace;
	      });
	    }
	
	    /***
	     * @method defineStatic(...)
	     * @returns Namespace
	     * @namespace
	     * @short Defines static methods on the namespace that can later be extended
	     *        onto the native globals.
	     * @extra Accepts either a single object mapping names to functions, or name
	     *        and function as two arguments. If `extend` was previously called
	     *        with no arguments, the method will be immediately mapped to its
	     *        native when defined.
	     *
	     * @example
	     *
	     *   Sugar.Number.defineStatic({
	     *     isOdd: function (num) {
	     *       return num % 2 === 1;
	     *     }
	     *   });
	     *
	     ***/
	    defineWithOptionCollect('defineStatic', STATIC);
	
	    /***
	     * @method defineInstance(...)
	     * @returns Namespace
	     * @namespace
	     * @short Defines methods on the namespace that can later be extended as
	     *        instance methods onto the native prototype.
	     * @extra Accepts either a single object mapping names to functions, or name
	     *        and function as two arguments. All functions should accept the
	     *        native for which they are mapped as their first argument, and should
	     *        never refer to `this`. If `extend` was previously called with no
	     *        arguments, the method will be immediately mapped to its native when
	     *        defined.
	     *
	     *        Methods cannot accept more than 4 arguments in addition to the
	     *        native (5 arguments total). Any additional arguments will not be
	     *        mapped. If the method needs to accept unlimited arguments, use
	     *        `defineInstanceWithArguments`. Otherwise if more options are
	     *        required, use an options object instead.
	     *
	     * @example
	     *
	     *   Sugar.Number.defineInstance({
	     *     square: function (num) {
	     *       return num * num;
	     *     }
	     *   });
	     *
	     ***/
	    defineWithOptionCollect('defineInstance', INSTANCE);
	
	    /***
	     * @method defineInstanceAndStatic(...)
	     * @returns Namespace
	     * @namespace
	     * @short A shortcut to define both static and instance methods on the namespace.
	     * @extra This method is intended for use with `Object` instance methods. Sugar
	     *        will not map any methods to `Object.prototype` by default, so defining
	     *        instance methods as static helps facilitate their proper use.
	     *
	     * @example
	     *
	     *   Sugar.Object.defineInstanceAndStatic({
	     *     isAwesome: function (obj) {
	     *       // check if obj is awesome!
	     *     }
	     *   });
	     *
	     ***/
	    defineWithOptionCollect('defineInstanceAndStatic', INSTANCE | STATIC);
	
	
	    /***
	     * @method defineStaticWithArguments(...)
	     * @returns Namespace
	     * @namespace
	     * @short Defines static methods that collect arguments.
	     * @extra This method is identical to `defineStatic`, except that when defined
	     *        methods are called, they will collect any arguments past `n - 1`,
	     *        where `n` is the number of arguments that the method accepts.
	     *        Collected arguments will be passed to the method in an array
	     *        as the last argument defined on the function.
	     *
	     * @example
	     *
	     *   Sugar.Number.defineStaticWithArguments({
	     *     addAll: function (num, args) {
	     *       for (var i = 0; i < args.length; i++) {
	     *         num += args[i];
	     *       }
	     *       return num;
	     *     }
	     *   });
	     *
	     ***/
	    defineWithOptionCollect('defineStaticWithArguments', STATIC, true);
	
	    /***
	     * @method defineInstanceWithArguments(...)
	     * @returns Namespace
	     * @namespace
	     * @short Defines instance methods that collect arguments.
	     * @extra This method is identical to `defineInstance`, except that when
	     *        defined methods are called, they will collect any arguments past
	     *        `n - 1`, where `n` is the number of arguments that the method
	     *        accepts. Collected arguments will be passed to the method as the
	     *        last argument defined on the function.
	     *
	     * @example
	     *
	     *   Sugar.Number.defineInstanceWithArguments({
	     *     addAll: function (num, args) {
	     *       for (var i = 0; i < args.length; i++) {
	     *         num += args[i];
	     *       }
	     *       return num;
	     *     }
	     *   });
	     *
	     ***/
	    defineWithOptionCollect('defineInstanceWithArguments', INSTANCE, true);
	
	    /***
	     * @method defineStaticPolyfill(...)
	     * @returns Namespace
	     * @namespace
	     * @short Defines static methods that are mapped onto the native if they do
	     *        not already exist.
	     * @extra Intended only for use creating polyfills that follow the ECMAScript
	     *        spec. Accepts either a single object mapping names to functions, or
	     *        name and function as two arguments.
	     *
	     * @example
	     *
	     *   Sugar.Object.defineStaticPolyfill({
	     *     keys: function (obj) {
	     *       // get keys!
	     *     }
	     *   });
	     *
	     ***/
	    setProperty(sugarNamespace, 'defineStaticPolyfill', function(arg1, arg2, arg3) {
	      var opts = collectDefineOptions(arg1, arg2, arg3);
	      extendNative(globalContext[name], opts.methods, true, opts.last);
	    });
	
	    /***
	     * @method defineInstancePolyfill(...)
	     * @returns Namespace
	     * @namespace
	     * @short Defines instance methods that are mapped onto the native prototype
	     *        if they do not already exist.
	     * @extra Intended only for use creating polyfills that follow the ECMAScript
	     *        spec. Accepts either a single object mapping names to functions, or
	     *        name and function as two arguments. This method differs from
	     *        `defineInstance` as there is no static signature (as the method
	     *        is mapped as-is to the native), so it should refer to its `this`
	     *        object.
	     *
	     * @example
	     *
	     *   Sugar.Array.defineInstancePolyfill({
	     *     indexOf: function (arr, el) {
	     *       // index finding code here!
	     *     }
	     *   });
	     *
	     ***/
	    setProperty(sugarNamespace, 'defineInstancePolyfill', function(arg1, arg2, arg3) {
	      var opts = collectDefineOptions(arg1, arg2, arg3);
	      extendNative(globalContext[name].prototype, opts.methods, true, opts.last);
	      // Map instance polyfills to chainable as well.
	      forEachProperty(opts.methods, function(fn, methodName) {
	        defineChainableMethod(sugarNamespace, methodName, fn);
	      });
	    });
	
	    /***
	     * @method alias(<toName>, <fromName>)
	     * @returns Namespace
	     * @namespace
	     * @short Aliases one Sugar method to another.
	     *
	     * @example
	     *
	     *   Sugar.Array.alias('all', 'every');
	     *
	     ***/
	    setProperty(sugarNamespace, 'alias', function(name, source) {
	      var method = typeof source === 'string' ? sugarNamespace[source] : source;
	      setMethod(sugarNamespace, name, method);
	    });
	
	    // Each namespace can extend only itself through its .extend method.
	    setProperty(sugarNamespace, 'extend', extend);
	
	    // Cache the class to namespace relationship for later use.
	    namespacesByName[name] = sugarNamespace;
	    namespacesByClassString['[object ' + name + ']'] = sugarNamespace;
	
	    mapNativeToChainable(name);
	    mapObjectChainablesToNamespace(sugarNamespace);
	
	
	    // Export
	    return Sugar[name] = sugarNamespace;
	  }
	
	  function setGlobalProperties() {
	    setProperty(Sugar, 'extend', Sugar);
	    setProperty(Sugar, 'toString', toString);
	    setProperty(Sugar, 'createNamespace', createNamespace);
	
	    setProperty(Sugar, 'util', {
	      'hasOwn': hasOwn,
	      'getOwn': getOwn,
	      'setProperty': setProperty,
	      'classToString': classToString,
	      'defineProperty': defineProperty,
	      'forEachProperty': forEachProperty,
	      'mapNativeToChainable': mapNativeToChainable
	    });
	  }
	
	  function toString() {
	    return SUGAR_GLOBAL;
	  }
	
	
	  // Defining Methods
	
	  function defineMethods(sugarNamespace, methods, type, args, flags) {
	    forEachProperty(methods, function(method, methodName) {
	      var instanceMethod, staticMethod = method;
	      if (args) {
	        staticMethod = wrapMethodWithArguments(method);
	      }
	      if (flags) {
	        staticMethod.flags = flags;
	      }
	
	      // A method may define its own custom implementation, so
	      // make sure that's not the case before creating one.
	      if (type & INSTANCE && !method.instance) {
	        instanceMethod = wrapInstanceMethod(method, args);
	        setProperty(staticMethod, 'instance', instanceMethod);
	      }
	
	      if (type & STATIC) {
	        setProperty(staticMethod, 'static', true);
	      }
	
	      setMethod(sugarNamespace, methodName, staticMethod);
	
	      if (sugarNamespace.active) {
	        // If the namespace has been activated (.extend has been called),
	        // then map this method as well.
	        sugarNamespace.extend(methodName);
	      }
	    });
	  }
	
	  function collectDefineOptions(arg1, arg2, arg3) {
	    var methods, last;
	    if (typeof arg1 === 'string') {
	      methods = {};
	      methods[arg1] = arg2;
	      last = arg3;
	    } else {
	      methods = arg1;
	      last = arg2;
	    }
	    return {
	      last: last,
	      methods: methods
	    };
	  }
	
	  function wrapInstanceMethod(fn, args) {
	    return args ? wrapMethodWithArguments(fn, true) : wrapInstanceMethodFixed(fn);
	  }
	
	  function wrapMethodWithArguments(fn, instance) {
	    // Functions accepting enumerated arguments will always have "args" as the
	    // last argument, so subtract one from the function length to get the point
	    // at which to start collecting arguments. If this is an instance method on
	    // a prototype, then "this" will be pushed into the arguments array so start
	    // collecting 1 argument earlier.
	    var startCollect = fn.length - 1 - (instance ? 1 : 0);
	    return function() {
	      var args = [], collectedArgs = [], len;
	      if (instance) {
	        args.push(this);
	      }
	      len = Math.max(arguments.length, startCollect);
	      // Optimized: no leaking arguments
	      for (var i = 0; i < len; i++) {
	        if (i < startCollect) {
	          args.push(arguments[i]);
	        } else {
	          collectedArgs.push(arguments[i]);
	        }
	      }
	      args.push(collectedArgs);
	      return fn.apply(this, args);
	    };
	  }
	
	  function wrapInstanceMethodFixed(fn) {
	    switch(fn.length) {
	      // Wrapped instance methods will always be passed the instance
	      // as the first argument, but requiring the argument to be defined
	      // may cause confusion here, so return the same wrapped function regardless.
	      case 0:
	      case 1:
	        return function() {
	          return fn(this);
	        };
	      case 2:
	        return function(a) {
	          return fn(this, a);
	        };
	      case 3:
	        return function(a, b) {
	          return fn(this, a, b);
	        };
	      case 4:
	        return function(a, b, c) {
	          return fn(this, a, b, c);
	        };
	      case 5:
	        return function(a, b, c, d) {
	          return fn(this, a, b, c, d);
	        };
	    }
	  }
	
	  // Method helpers
	
	  function extendNative(target, source, polyfill, override) {
	    forEachProperty(source, function(method, name) {
	      if (polyfill && !override && target[name]) {
	        // Method exists, so bail.
	        return;
	      }
	      setProperty(target, name, method);
	    });
	  }
	
	  function setMethod(sugarNamespace, methodName, method) {
	    sugarNamespace[methodName] = method;
	    if (method.instance) {
	      defineChainableMethod(sugarNamespace, methodName, method.instance, true);
	    }
	  }
	
	
	  // Chainables
	
	  function getNewChainableClass(name) {
	    var fn = function SugarChainable(obj, arg) {
	      if (!(this instanceof fn)) {
	        return new fn(obj, arg);
	      }
	      if (this.constructor !== fn) {
	        // Allow modules to define their own constructors.
	        obj = this.constructor.apply(obj, arguments);
	      }
	      this.raw = obj;
	    };
	    setProperty(fn, 'toString', function() {
	      return SUGAR_GLOBAL + name;
	    });
	    setProperty(fn.prototype, 'valueOf', function() {
	      return this.raw;
	    });
	    return fn;
	  }
	
	  function defineChainableMethod(sugarNamespace, methodName, fn) {
	    var wrapped = wrapWithChainableResult(fn), existing, collision, dcp;
	    dcp = DefaultChainable.prototype;
	    existing = dcp[methodName];
	
	    // If the method was previously defined on the default chainable, then a
	    // collision exists, so set the method to a disambiguation function that will
	    // lazily evaluate the object and find it's associated chainable. An extra
	    // check is required to avoid false positives from Object inherited methods.
	    collision = existing && existing !== Object.prototype[methodName];
	
	    // The disambiguation function is only required once.
	    if (!existing || !existing.disambiguate) {
	      dcp[methodName] = collision ? disambiguateMethod(methodName) : wrapped;
	    }
	
	    // The target chainable always receives the wrapped method. Additionally,
	    // if the target chainable is Sugar.Object, then map the wrapped method
	    // to all other namespaces as well if they do not define their own method
	    // of the same name. This way, a Sugar.Number will have methods like
	    // isEqual that can be called on any object without having to traverse up
	    // the prototype chain and perform disambiguation, which costs cycles.
	    // Note that the "if" block below actually does nothing on init as Object
	    // goes first and no other namespaces exist yet. However it needs to be
	    // here as Object instance methods defined later also need to be mapped
	    // back onto existing namespaces.
	    sugarNamespace.prototype[methodName] = wrapped;
	    if (sugarNamespace === Sugar.Object) {
	      mapObjectChainableToAllNamespaces(methodName, wrapped);
	    }
	  }
	
	  function mapObjectChainablesToNamespace(sugarNamespace) {
	    forEachProperty(Sugar.Object && Sugar.Object.prototype, function(val, methodName) {
	      if (typeof val === 'function') {
	        setObjectChainableOnNamespace(sugarNamespace, methodName, val);
	      }
	    });
	  }
	
	  function mapObjectChainableToAllNamespaces(methodName, fn) {
	    forEachProperty(namespacesByName, function(sugarNamespace) {
	      setObjectChainableOnNamespace(sugarNamespace, methodName, fn);
	    });
	  }
	
	  function setObjectChainableOnNamespace(sugarNamespace, methodName, fn) {
	    var proto = sugarNamespace.prototype;
	    if (!hasOwn(proto, methodName)) {
	      proto[methodName] = fn;
	    }
	  }
	
	  function wrapWithChainableResult(fn) {
	    return function() {
	      return new DefaultChainable(fn.apply(this.raw, arguments));
	    };
	  }
	
	  function disambiguateMethod(methodName) {
	    var fn = function() {
	      var raw = this.raw, sugarNamespace, fn;
	      if (raw != null) {
	        // Find the Sugar namespace for this unknown.
	        sugarNamespace = namespacesByClassString[classToString(raw)];
	      }
	      if (!sugarNamespace) {
	        // If no sugarNamespace can be resolved, then default
	        // back to Sugar.Object so that undefined and other
	        // non-supported types can still have basic object
	        // methods called on them, such as type checks.
	        sugarNamespace = Sugar.Object;
	      }
	
	      fn = new sugarNamespace(raw)[methodName];
	
	      if (fn.disambiguate) {
	        // If the method about to be called on this chainable is
	        // itself a disambiguation method, then throw an error to
	        // prevent infinite recursion.
	        throw new TypeError('Cannot resolve namespace for ' + raw);
	      }
	
	      return fn.apply(this, arguments);
	    };
	    fn.disambiguate = true;
	    return fn;
	  }
	
	  function mapNativeToChainable(name, methodNames) {
	    var sugarNamespace = namespacesByName[name],
	        nativeProto = globalContext[name].prototype;
	
	    if (!methodNames && ownPropertyNames) {
	      methodNames = ownPropertyNames(nativeProto);
	    }
	
	    forEachProperty(methodNames, function(methodName) {
	      if (nativeMethodProhibited(methodName)) {
	        // Sugar chainables have their own constructors as well as "valueOf"
	        // methods, so exclude them here. The __proto__ argument should be trapped
	        // by the function check below, however simply accessing this property on
	        // Object.prototype causes QML to segfault, so pre-emptively excluding it.
	        return;
	      }
	      try {
	        var fn = nativeProto[methodName];
	        if (typeof fn !== 'function') {
	          // Bail on anything not a function.
	          return;
	        }
	      } catch (e) {
	        // Function.prototype has properties that
	        // will throw errors when accessed.
	        return;
	      }
	      defineChainableMethod(sugarNamespace, methodName, fn);
	    });
	  }
	
	  function nativeMethodProhibited(methodName) {
	    return methodName === 'constructor' ||
	           methodName === 'valueOf' ||
	           methodName === '__proto__';
	  }
	
	
	  // Util
	
	  // Internal references
	  var ownPropertyNames = Object.getOwnPropertyNames,
	      internalToString = Object.prototype.toString,
	      internalHasOwnProperty = Object.prototype.hasOwnProperty;
	
	  // Defining this as a variable here as the ES5 module
	  // overwrites it to patch DONTENUM.
	  var forEachProperty = function (obj, fn) {
	    for(var key in obj) {
	      if (!hasOwn(obj, key)) continue;
	      if (fn.call(obj, obj[key], key, obj) === false) break;
	    }
	  };
	
	  function definePropertyShim(obj, prop, descriptor) {
	    obj[prop] = descriptor.value;
	  }
	
	  function setProperty(target, name, value, enumerable) {
	    defineProperty(target, name, {
	      value: value,
	      enumerable: !!enumerable,
	      configurable: true,
	      writable: true
	    });
	  }
	
	  // PERF: Attempts to speed this method up get very Heisenbergy. Quickly
	  // returning based on typeof works for primitives, but slows down object
	  // types. Even === checks on null and undefined (no typeof) will end up
	  // basically breaking even. This seems to be as fast as it can go.
	  function classToString(obj) {
	    return internalToString.call(obj);
	  }
	
	  function hasOwn(obj, prop) {
	    return !!obj && internalHasOwnProperty.call(obj, prop);
	  }
	
	  function getOwn(obj, prop) {
	    if (hasOwn(obj, prop)) {
	      return obj[prop];
	    }
	  }
	
	  setupGlobal();
	
	}).call(this);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LazyLoadedLocales = __webpack_require__(35),
	    AmericanEnglishDefinition = __webpack_require__(42),
	    getNewLocale = __webpack_require__(44);
	
	var English, localeManager;
	
	function buildLocales() {
	
	  function LocaleManager(loc) {
	    this.locales = {};
	    this.add(loc);
	  }
	
	  LocaleManager.prototype = {
	
	    get: function(code, fallback) {
	      var loc = this.locales[code];
	      if (!loc && LazyLoadedLocales[code]) {
	        loc = this.add(code, LazyLoadedLocales[code]);
	      } else if (!loc && code) {
	        loc = this.locales[code.slice(0, 2)];
	      }
	      return loc || fallback === false ? loc : this.current;
	    },
	
	    getAll: function() {
	      return this.locales;
	    },
	
	    set: function(code) {
	      var loc = this.get(code, false);
	      if (!loc) {
	        throw new TypeError('Invalid Locale: ' + code);
	      }
	      return this.current = loc;
	    },
	
	    add: function(code, def) {
	      if (!def) {
	        def = code;
	        code = def.code;
	      } else {
	        def.code = code;
	      }
	      var loc = def.compiledFormats ? def : getNewLocale(def);
	      this.locales[code] = loc;
	      if (!this.current) {
	        this.current = loc;
	      }
	      return loc;
	    },
	
	    remove: function(code) {
	      if (this.current.code === code) {
	        this.current = this.get('en');
	      }
	      return delete this.locales[code];
	    }
	
	  };
	
	  // Sorry about this guys...
	  English = getNewLocale(AmericanEnglishDefinition);
	  localeManager = new LocaleManager(English);
	}
	
	buildLocales();
	
	module.exports = {
	  English: English,
	  localeManager: localeManager
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var BritishEnglishDefinition = __webpack_require__(36),
	    AmericanEnglishDefinition = __webpack_require__(42),
	    CanadianEnglishDefinition = __webpack_require__(43);
	
	var LazyLoadedLocales = {
	  'en-US': AmericanEnglishDefinition,
	  'en-GB': BritishEnglishDefinition,
	  'en-AU': BritishEnglishDefinition,
	  'en-CA': CanadianEnglishDefinition
	};
	
	module.exports = LazyLoadedLocales;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getEnglishVariant = __webpack_require__(37);
	
	var BritishEnglishDefinition = getEnglishVariant({
	  'short':  '{dd}/{MM}/{yyyy}',
	  'medium': '{d} {Month} {yyyy}',
	  'long':   '{d} {Month} {yyyy} {H}:{mm}',
	  'full':   '{Weekday}, {d} {Month}, {yyyy} {time}',
	  'stamp':  '{Dow} {d} {Mon} {yyyy} {time}'
	});
	
	module.exports = BritishEnglishDefinition;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var EnglishLocaleBaseDefinition = __webpack_require__(38),
	    simpleMerge = __webpack_require__(39),
	    simpleClone = __webpack_require__(41);
	
	function getEnglishVariant(v) {
	  return simpleMerge(simpleClone(EnglishLocaleBaseDefinition), v);
	}
	
	module.exports = getEnglishVariant;

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	
	var EnglishLocaleBaseDefinition = {
	  'code': 'en',
	  'plural': true,
	  'timeMarkers': 'at',
	  'ampm': 'AM|A.M.|a,PM|P.M.|p',
	  'units': 'millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s',
	  'months': 'Jan:uary|,Feb:ruary|,Mar:ch|,Apr:il|,May,Jun:e|,Jul:y|,Aug:ust|,Sep:tember|t|,Oct:ober|,Nov:ember|,Dec:ember|',
	  'weekdays': 'Sun:day|,Mon:day|,Tue:sday|,Wed:nesday|,Thu:rsday|,Fri:day|,Sat:urday|+weekend',
	  'numerals': 'zero,one|first,two|second,three|third,four:|th,five|fifth,six:|th,seven:|th,eight:|h,nin:e|th,ten:|th',
	  'articles': 'a,an,the',
	  'tokens': 'the,st|nd|rd|th,of|in,a|an,on',
	  'time': '{H}:{mm}',
	  'past': '{num} {unit} {sign}',
	  'future': '{num} {unit} {sign}',
	  'duration': '{num} {unit}',
	  'modifiers': [
	    { 'name': 'half',   'src': 'half', 'value': .5 },
	    { 'name': 'midday', 'src': 'noon', 'value': 12 },
	    { 'name': 'midday', 'src': 'midnight', 'value': 24 },
	    { 'name': 'day',    'src': 'yesterday', 'value': -1 },
	    { 'name': 'day',    'src': 'today|tonight', 'value': 0 },
	    { 'name': 'day',    'src': 'tomorrow', 'value': 1 },
	    { 'name': 'sign',   'src': 'ago|before', 'value': -1 },
	    { 'name': 'sign',   'src': 'from now|after|from|in|later', 'value': 1 },
	    { 'name': 'edge',   'src': 'first day|first|beginning', 'value': -2 },
	    { 'name': 'edge',   'src': 'last day', 'value': 1 },
	    { 'name': 'edge',   'src': 'end|last', 'value': 2 },
	    { 'name': 'shift',  'src': 'last', 'value': -1 },
	    { 'name': 'shift',  'src': 'the|this', 'value': 0 },
	    { 'name': 'shift',  'src': 'next', 'value': 1 }
	  ],
	  'parse': [
	    '(?:just)? now',
	    '{shift} {unit:5-7}',
	    "{months?} (?:{year}|'{yy})",
	    '{midday} {4?} {day|weekday}',
	    '{months},?(?:[-.\\/\\s]{year})?',
	    '{edge} of (?:day)? {day|weekday}',
	    '{0} {num}{1?} {weekday} {2} {months},? {year?}',
	    '{shift?} {day?} {weekday?} {timeMarker?} {midday}',
	    '{sign?} {3?} {half} {3?} {unit:3-4|unit:7} {sign?}',
	    '{0?} {edge} {weekday?} {2} {shift?} {unit:4-7?} {months?},? {year?}'
	  ],
	  'timeParse': [
	    '{day|weekday}',
	    '{shift} {unit:5?} {weekday}',
	    '{0?} {date}{1?} {2?} {months?}',
	    '{weekday} {2?} {shift} {unit:5}',
	    '{0?} {num} {2?} {months}\\.?,? {year?}',
	    '{num?} {unit:4-5} {sign} {day|weekday}',
	    '{year}[-.\\/\\s]{months}[-.\\/\\s]{date}',
	    '{0|months} {date?}{1?} of {shift} {unit:6-7}',
	    '{0?} {num}{1?} {weekday} of {shift} {unit:6}',
	    "{date}[-.\\/\\s]{months}[-.\\/\\s](?:{year}|'?{yy})",
	    "{weekday?}\\.?,? {months}\\.?,? {date}{1?},? (?:{year}|'{yy})?"
	  ],
	  'timeFrontParse': [
	    '{sign} {num} {unit}',
	    '{num} {unit} {sign}',
	    '{4?} {day|weekday}'
	  ]
	};
	
	module.exports = EnglishLocaleBaseDefinition;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var coreUtilityAliases = __webpack_require__(40);
	
	var forEachProperty = coreUtilityAliases.forEachProperty;
	
	function simpleMerge(target, source) {
	  forEachProperty(source, function(val, key) {
	    target[key] = val;
	  });
	  return target;
	}
	
	module.exports = simpleMerge;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	module.exports = {
	  hasOwn: Sugar.util.hasOwn,
	  getOwn: Sugar.util.getOwn,
	  setProperty: Sugar.util.setProperty,
	  classToString: Sugar.util.classToString,
	  defineProperty: Sugar.util.defineProperty,
	  forEachProperty: Sugar.util.forEachProperty,
	  mapNativeToChainable: Sugar.util.mapNativeToChainable
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var simpleMerge = __webpack_require__(39);
	
	function simpleClone(obj) {
	  return simpleMerge({}, obj);
	}
	
	module.exports = simpleClone;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getEnglishVariant = __webpack_require__(37);
	
	var AmericanEnglishDefinition = getEnglishVariant({
	  'mdy': true,
	  'firstDayOfWeek': 0,
	  'firstDayOfWeekYear': 1,
	  'short':  '{MM}/{dd}/{yyyy}',
	  'medium': '{Month} {d}, {yyyy}',
	  'long':   '{Month} {d}, {yyyy} {time}',
	  'full':   '{Weekday}, {Month} {d}, {yyyy} {time}',
	  'stamp':  '{Dow} {Mon} {d} {yyyy} {time}',
	  'time':   '{h}:{mm} {TT}'
	});
	
	module.exports = AmericanEnglishDefinition;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getEnglishVariant = __webpack_require__(37);
	
	var CanadianEnglishDefinition = getEnglishVariant({
	  'short':  '{yyyy}-{MM}-{dd}',
	  'medium': '{d} {Month}, {yyyy}',
	  'long':   '{d} {Month}, {yyyy} {H}:{mm}',
	  'full':   '{Weekday}, {d} {Month}, {yyyy} {time}',
	  'stamp':  '{Dow} {d} {Mon} {yyyy} {time}'
	});
	
	module.exports = CanadianEnglishDefinition;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LOCALE_ARRAY_FIELDS = __webpack_require__(45),
	    ISODefaults = __webpack_require__(46),
	    ParsingTokens = __webpack_require__(47),
	    CoreParsingFormats = __webpack_require__(48),
	    LocalizedParsingTokens = __webpack_require__(49),
	    map = __webpack_require__(50),
	    filter = __webpack_require__(51),
	    forEach = __webpack_require__(52),
	    isDefined = __webpack_require__(56),
	    commaSplit = __webpack_require__(57),
	    classChecks = __webpack_require__(59),
	    isUndefined = __webpack_require__(67),
	    mathAliases = __webpack_require__(68),
	    simpleMerge = __webpack_require__(39),
	    getOrdinalSuffix = __webpack_require__(69),
	    getRegNonCapturing = __webpack_require__(70),
	    coreUtilityAliases = __webpack_require__(40),
	    getArrayWithOffset = __webpack_require__(71),
	    iterateOverDateUnits = __webpack_require__(72),
	    arrayToRegAlternates = __webpack_require__(82),
	    fullwidthNumberHelpers = __webpack_require__(84),
	    getAdjustedUnitForNumber = __webpack_require__(87),
	    getParsingTokenWithSuffix = __webpack_require__(91);
	
	var getOwn = coreUtilityAliases.getOwn,
	    forEachProperty = coreUtilityAliases.forEachProperty,
	    fullWidthNumberMap = fullwidthNumberHelpers.fullWidthNumberMap,
	    fullWidthNumbers = fullwidthNumberHelpers.fullWidthNumbers,
	    pow = mathAliases.pow,
	    max = mathAliases.max,
	    ISO_FIRST_DAY_OF_WEEK = ISODefaults.ISO_FIRST_DAY_OF_WEEK,
	    ISO_FIRST_DAY_OF_WEEK_YEAR = ISODefaults.ISO_FIRST_DAY_OF_WEEK_YEAR,
	    isString = classChecks.isString,
	    isFunction = classChecks.isFunction;
	
	function getNewLocale(def) {
	
	  function Locale(def) {
	    this.init(def);
	  }
	
	  Locale.prototype = {
	
	    getMonthName: function(n, alternate) {
	      if (this.monthSuffix) {
	        return (n + 1) + this.monthSuffix;
	      }
	      return getArrayWithOffset(this.months, n, alternate, 12);
	    },
	
	    getWeekdayName: function(n, alternate) {
	      return getArrayWithOffset(this.weekdays, n, alternate, 7);
	    },
	
	    getTokenValue: function(field, str) {
	      var map = this[field + 'Map'], val;
	      if (map) {
	        val = map[str];
	      }
	      if (isUndefined(val)) {
	        val = this.getNumber(str);
	        if (field === 'month') {
	          // Months are the only numeric date field
	          // whose value is not the same as its number.
	          val -= 1;
	        }
	      }
	      return val;
	    },
	
	    getNumber: function(str) {
	      var num = this.numeralMap[str];
	      if (isDefined(num)) {
	        return num;
	      }
	      // The unary plus operator here show better performance and handles
	      // every format that parseFloat does with the exception of trailing
	      // characters, which are guaranteed not to be in our string at this point.
	      num = +str.replace(/,/, '.');
	      if (!isNaN(num)) {
	        return num;
	      }
	      num = this.getNumeralValue(str);
	      if (!isNaN(num)) {
	        this.numeralMap[str] = num;
	        return num;
	      }
	      return num;
	    },
	
	    getNumeralValue: function(str) {
	      var place = 1, num = 0, lastWasPlace, isPlace, numeral, digit, arr;
	      // Note that "numerals" that need to be converted through this method are
	      // all considered to be single characters in order to handle CJK. This
	      // method is by no means unique to CJK, but the complexity of handling
	      // inflections in non-CJK languages adds too much overhead for not enough
	      // value, so avoiding for now.
	      arr = str.split('');
	      for (var i = arr.length - 1; numeral = arr[i]; i--) {
	        digit = getOwn(this.numeralMap, numeral);
	        if (isUndefined(digit)) {
	          digit = getOwn(fullWidthNumberMap, numeral) || 0;
	        }
	        isPlace = digit > 0 && digit % 10 === 0;
	        if (isPlace) {
	          if (lastWasPlace) {
	            num += place;
	          }
	          if (i) {
	            place = digit;
	          } else {
	            num += digit;
	          }
	        } else {
	          num += digit * place;
	          place *= 10;
	        }
	        lastWasPlace = isPlace;
	      }
	      return num;
	    },
	
	    getOrdinal: function(n) {
	      var suffix = this.ordinalSuffix;
	      return suffix || getOrdinalSuffix(n);
	    },
	
	    getRelativeFormat: function(adu, type) {
	      return this.convertAdjustedToFormat(adu, type);
	    },
	
	    getDuration: function(ms) {
	      return this.convertAdjustedToFormat(getAdjustedUnitForNumber(max(0, ms)), 'duration');
	    },
	
	    getFirstDayOfWeek: function() {
	      var val = this.firstDayOfWeek;
	      return isDefined(val) ? val : ISO_FIRST_DAY_OF_WEEK;
	    },
	
	    getFirstDayOfWeekYear: function() {
	      return this.firstDayOfWeekYear || ISO_FIRST_DAY_OF_WEEK_YEAR;
	    },
	
	    convertAdjustedToFormat: function(adu, type) {
	      var sign, unit, mult,
	          num    = adu[0],
	          u      = adu[1],
	          ms     = adu[2],
	          format = this[type] || this.relative;
	      if (isFunction(format)) {
	        return format.call(this, num, u, ms, type);
	      }
	      mult = !this.plural || num === 1 ? 0 : 1;
	      unit = this.units[mult * 8 + u] || this.units[u];
	      sign = this[ms > 0 ? 'fromNow' : 'ago'];
	      return format.replace(/\{(.*?)\}/g, function(full, match) {
	        switch(match) {
	          case 'num': return num;
	          case 'unit': return unit;
	          case 'sign': return sign;
	        }
	      });
	    },
	
	    cacheFormat: function(dif, i) {
	      this.compiledFormats.splice(i, 1);
	      this.compiledFormats.unshift(dif);
	    },
	
	    addFormat: function(src, to) {
	      var loc = this;
	
	      function getTokenSrc(str) {
	        var suffix, src, val,
	            opt   = str.match(/\?$/),
	            nc    = str.match(/^(\d+)\??$/),
	            slice = str.match(/(\d)(?:-(\d))?/),
	            key   = str.replace(/[^a-z]+$/i, '');
	
	        // Allowing alias tokens such as {time}
	        if (val = getOwn(loc.parsingAliases, key)) {
	          src = replaceParsingTokens(val);
	          if (opt) {
	            src = getRegNonCapturing(src, true);
	          }
	          return src;
	        }
	
	        if (nc) {
	          src = loc.tokens[nc[1]];
	        } else if (val = getOwn(ParsingTokens, key)) {
	          src = val.src;
	        } else {
	          val = getOwn(loc.parsingTokens, key) || getOwn(loc, key);
	
	          // Both the "months" array and the "month" parsing token can be accessed
	          // by either {month} or {months}, falling back as necessary, however
	          // regardless of whether or not a fallback occurs, the final field to
	          // be passed to addRawFormat must be normalized as singular.
	          key = key.replace(/s$/, '');
	
	          if (!val) {
	            val = getOwn(loc.parsingTokens, key) || getOwn(loc, key + 's');
	          }
	
	          if (isString(val)) {
	            src = val;
	            suffix = loc[key + 'Suffix'];
	          } else {
	            if (slice) {
	              val = filter(val, function(m, i) {
	                var mod = i % (loc.units ? 8 : val.length);
	                return mod >= slice[1] && mod <= (slice[2] || slice[1]);
	              });
	            }
	            src = arrayToRegAlternates(val);
	          }
	        }
	        if (!src) {
	          return '';
	        }
	        if (nc) {
	          // Non-capturing tokens like {0}
	          src = getRegNonCapturing(src);
	        } else {
	          // Capturing group and add to parsed tokens
	          to.push(key);
	          src = '(' + src + ')';
	        }
	        if (suffix) {
	          // Date/time suffixes such as those in CJK
	          src = getParsingTokenWithSuffix(key, src, suffix);
	        }
	        if (opt) {
	          src += '?';
	        }
	        return src;
	      }
	
	      function replaceParsingTokens(str) {
	
	        // Make spaces optional
	        str = str.replace(/ /g, ' ?');
	
	        return str.replace(/\{([^,]+?)\}/g, function(match, token) {
	          var tokens = token.split('|'), src;
	          if (tokens.length > 1) {
	            src = getRegNonCapturing(map(tokens, getTokenSrc).join('|'));
	          } else {
	            src = getTokenSrc(token);
	          }
	          return src;
	        });
	      }
	
	      if (!to) {
	        to = [];
	        src = replaceParsingTokens(src);
	      }
	
	      loc.addRawFormat(src, to);
	    },
	
	    addRawFormat: function(format, to) {
	      this.compiledFormats.unshift({
	        reg: RegExp('^ *' + format + ' *$', 'i'),
	        to: to
	      });
	    },
	
	    init: function(def) {
	      var loc = this;
	
	      // -- Initialization helpers
	
	      function initFormats() {
	        loc.compiledFormats = [];
	        loc.parsingAliases = {};
	        loc.parsingTokens = {};
	      }
	
	      function initDefinition() {
	        simpleMerge(loc, def);
	      }
	
	      function initArrayFields() {
	        forEach(LOCALE_ARRAY_FIELDS, function(name) {
	          var val = loc[name];
	          if (isString(val)) {
	            loc[name] = commaSplit(val);
	          } else if (!val) {
	            loc[name] = [];
	          }
	        });
	      }
	
	      // -- Value array build helpers
	
	      function buildValueArray(name, mod, map, fn) {
	        var field = name, all = [], setMap;
	        if (!loc[field]) {
	          field += 's';
	        }
	        if (!map) {
	          map = {};
	          setMap = true;
	        }
	        forAllAlternates(field, function(alt, j, i) {
	          var idx = j * mod + i, val;
	          val = fn ? fn(i) : i;
	          map[alt] = val;
	          map[alt.toLowerCase()] = val;
	          all[idx] = alt;
	        });
	        loc[field] = all;
	        if (setMap) {
	          loc[name + 'Map'] = map;
	        }
	      }
	
	      function forAllAlternates(field, fn) {
	        forEach(loc[field], function(str, i) {
	          forEachAlternate(str, function(alt, j) {
	            fn(alt, j, i);
	          });
	        });
	      }
	
	      function forEachAlternate(str, fn) {
	        var arr = map(str.split('+'), function(split) {
	          return split.replace(/(.+):(.+)$/, function(full, base, suffixes) {
	            return map(suffixes.split('|'), function(suffix) {
	              return base + suffix;
	            }).join('|');
	          });
	        }).join('|');
	        forEach(arr.split('|'), fn);
	      }
	
	      function buildNumerals() {
	        var map = {};
	        buildValueArray('numeral', 10, map);
	        buildValueArray('article', 1, map, function() {
	          return 1;
	        });
	        buildValueArray('placeholder', 4, map, function(n) {
	          return pow(10, n + 1);
	        });
	        loc.numeralMap = map;
	      }
	
	      function buildTimeFormats() {
	        loc.parsingAliases['time'] = getTimeFormat();
	        loc.parsingAliases['tzOffset'] = getTZOffsetFormat();
	      }
	
	      function getTimeFormat() {
	        var src;
	        if (loc.ampmFront) {
	          // "ampmFront" exists mostly for CJK locales, which also presume that
	          // time suffixes exist, allowing this to be a simpler regex.
	          src = '{ampm?} {hour} (?:{minute} (?::?{second})?)?';
	        } else if(loc.ampm.length) {
	          src = '{hour}(?:[.:]{minute}(?:[.:]{second})? {ampm?}| {ampm})';
	        } else {
	          src = '{hour}(?:[.:]{minute}(?:[.:]{second})?)';
	        }
	        return src;
	      }
	
	      function getTZOffsetFormat() {
	        return '(?:{Z}|{GMT?}(?:{tzSign}{tzHour}(?::?{tzMinute}(?: \\([\\w\\s]+\\))?)?)?)?';
	      }
	
	      function buildParsingTokens() {
	        forEachProperty(LocalizedParsingTokens, function(token, name) {
	          var src, arr;
	          src = token.base ? ParsingTokens[token.base].src : token.src;
	          if (token.requiresNumerals || loc.numeralUnits) {
	            src += getNumeralSrc();
	          }
	          arr = loc[name + 's'];
	          if (arr && arr.length) {
	            src += '|' + arrayToRegAlternates(arr);
	          }
	          loc.parsingTokens[name] = src;
	        });
	      }
	
	      function getNumeralSrc() {
	        var all, src = '';
	        all = loc.numerals.concat(loc.placeholders).concat(loc.articles);
	        if (loc.allowsFullWidth) {
	          all = all.concat(fullWidthNumbers.split(''));
	        }
	        if (all.length) {
	          src = '|(?:' + arrayToRegAlternates(all) + ')+';
	        }
	        return src;
	      }
	
	      function buildTimeSuffixes() {
	        iterateOverDateUnits(function(unit, i) {
	          var token = loc.timeSuffixes[i];
	          if (token) {
	            loc[(unit.alias || unit.name) + 'Suffix'] = token;
	          }
	        });
	      }
	
	      function buildModifiers() {
	        forEach(loc.modifiers, function(modifier) {
	          var name = modifier.name, mapKey = name + 'Map', map;
	          map = loc[mapKey] || {};
	          forEachAlternate(modifier.src, function(alt, j) {
	            var token = getOwn(loc.parsingTokens, name), val = modifier.value;
	            map[alt] = val;
	            loc.parsingTokens[name] = token ? token + '|' + alt : alt;
	            if (modifier.name === 'sign' && j === 0) {
	              // Hooking in here to set the first "fromNow" or "ago" modifier
	              // directly on the locale, so that it can be reused in the
	              // relative format.
	              loc[val === 1 ? 'fromNow' : 'ago'] = alt;
	            }
	          });
	          loc[mapKey] = map;
	        });
	      }
	
	      // -- Format adding helpers
	
	      function addCoreFormats() {
	        forEach(CoreParsingFormats, function(df) {
	          var src = df.src;
	          if (df.mdy && loc.mdy) {
	            // Use the mm/dd/yyyy variant if it
	            // exists and the locale requires it
	            src = df.mdy;
	          }
	          if (df.time) {
	            // Core formats that allow time require the time
	            // reg on both sides, so add both versions here.
	            loc.addFormat(getFormatWithTime(src, true));
	            loc.addFormat(getFormatWithTime(src));
	          } else {
	            loc.addFormat(src);
	          }
	        });
	        loc.addFormat('{time}');
	      }
	
	      function addLocaleFormats() {
	        addFormatSet('parse');
	        addFormatSet('timeParse', true);
	        addFormatSet('timeFrontParse', true, true);
	      }
	
	      function addFormatSet(field, allowTime, timeFront) {
	        forEach(loc[field], function(format) {
	          if (allowTime) {
	            format = getFormatWithTime(format, timeFront);
	          }
	          loc.addFormat(format);
	        });
	      }
	
	      function getFormatWithTime(baseFormat, timeBefore) {
	        if (timeBefore) {
	          return getTimeBefore() + baseFormat;
	        }
	        return baseFormat + getTimeAfter();
	      }
	
	      function getTimeBefore() {
	        return getRegNonCapturing('{time}[,\\s\\u3000]', true);
	      }
	
	      function getTimeAfter() {
	        var markers = ',?[\\s\\u3000]', localized;
	        localized = arrayToRegAlternates(loc.timeMarkers);
	        if (localized) {
	          markers += '| (?:' + localized + ') ';
	        }
	        markers = getRegNonCapturing(markers, loc.timeMarkerOptional);
	        return getRegNonCapturing(markers + '{time}', true);
	      }
	
	      initFormats();
	      initDefinition();
	      initArrayFields();
	
	      buildValueArray('month', 12);
	      buildValueArray('weekday', 7);
	      buildValueArray('unit', 8);
	      buildValueArray('ampm', 2);
	
	      buildNumerals();
	      buildTimeFormats();
	      buildParsingTokens();
	      buildTimeSuffixes();
	      buildModifiers();
	
	      // The order of these formats is important. Order is reversed so formats
	      // that are initialized later will take precedence. Generally, this means
	      // that more specific formats should come later.
	      addCoreFormats();
	      addLocaleFormats();
	
	    }
	
	  };
	
	  return new Locale(def);
	}
	
	module.exports = getNewLocale;

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';
	
	var LOCALE_ARRAY_FIELDS = [
	  'months', 'weekdays', 'units', 'numerals', 'placeholders',
	  'articles', 'tokens', 'timeMarkers', 'ampm', 'timeSuffixes',
	  'parse', 'timeParse', 'timeFrontParse', 'modifiers'
	];
	
	module.exports = LOCALE_ARRAY_FIELDS;

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  ISO_FIRST_DAY_OF_WEEK: 1,
	  ISO_FIRST_DAY_OF_WEEK_YEAR: 4
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';
	
	var ParsingTokens = {
	  'yyyy': {
	    param: 'year',
	    src: '\\d{4}'
	  },
	  'MM': {
	    param: 'month',
	    src: '[01]?\\d'
	  },
	  'dd': {
	    param: 'date',
	    src: '[0123]?\\d'
	  },
	  'hh': {
	    param: 'hour',
	    src: '[0-2]?\\d'
	  },
	  'mm': {
	    param: 'minute',
	    src: '[0-5]\\d'
	  },
	  'ss': {
	    param: 'second',
	    src: '[0-5]\\d(?:[,.]\\d+)?'
	  },
	  'yy': {
	    param: 'year',
	    src: '\\d{2}'
	  },
	  'y': {
	    param: 'year',
	    src: '\\d'
	  },
	  'yearSign': {
	    src: '[+-]',
	    sign: true
	  },
	  'tzHour': {
	    src: '[0-1]\\d'
	  },
	  'tzMinute': {
	    src: '[0-5]\\d'
	  },
	  'tzSign': {
	    src: '[+−-]',
	    sign: true
	  },
	  'ihh': {
	    param: 'hour',
	    src: '[0-2]?\\d(?:[,.]\\d+)?'
	  },
	  'imm': {
	    param: 'minute',
	    src: '[0-5]\\d(?:[,.]\\d+)?'
	  },
	  'GMT': {
	    param: 'utc',
	    src: 'GMT',
	    val: 1
	  },
	  'Z': {
	    param: 'utc',
	    src: 'Z',
	    val: 1
	  },
	  'timestamp': {
	    src: '\\d+'
	  }
	};
	
	module.exports = ParsingTokens;

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';
	
	var CoreParsingFormats = [
	  {
	    // 12-1978
	    // 08-1978 (MDY)
	    src: '{MM}[-.\\/]{yyyy}'
	  },
	  {
	    // 12/08/1978
	    // 08/12/1978 (MDY)
	    time: true,
	    src: '{dd}[-.\\/]{MM}(?:[-.\\/]{yyyy|yy|y})?',
	    mdy: '{MM}[-.\\/]{dd}(?:[-.\\/]{yyyy|yy|y})?'
	  },
	  {
	    // 1975-08-25
	    time: true,
	    src: '{yyyy}[-.\\/]{MM}(?:[-.\\/]{dd})?'
	  },
	  {
	    // .NET JSON
	    src: '\\\\/Date\\({timestamp}(?:[+-]\\d{4,4})?\\)\\\\/'
	  },
	  {
	    // ISO-8601
	    src: '{yearSign?}{yyyy}(?:-?{MM}(?:-?{dd}(?:T{ihh}(?::?{imm}(?::?{ss})?)?)?)?)?{tzOffset?}'
	  }
	];
	
	module.exports = CoreParsingFormats;

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';
	
	var LocalizedParsingTokens = {
	  'year': {
	    base: 'yyyy',
	    requiresSuffix: true
	  },
	  'month': {
	    base: 'MM',
	    requiresSuffix: true
	  },
	  'date': {
	    base: 'dd',
	    requiresSuffix: true
	  },
	  'hour': {
	    base: 'hh',
	    requiresSuffixOr: ':'
	  },
	  'minute': {
	    base: 'mm'
	  },
	  'second': {
	    base: 'ss'
	  },
	  'num': {
	    src: '\\d+',
	    requiresNumerals: true
	  }
	};
	
	module.exports = LocalizedParsingTokens;

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';
	
	function map(arr, fn) {
	  // perf: Not using fixed array len here as it may be sparse.
	  var result = [];
	  for (var i = 0, len = arr.length; i < len; i++) {
	    if (i in arr) {
	      result.push(fn(arr[i], i));
	    }
	  }
	  return result;
	}
	
	module.exports = map;

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';
	
	function filter(arr, fn) {
	  var result = [];
	  for (var i = 0, len = arr.length; i < len; i++) {
	    var el = arr[i];
	    if (i in arr && fn(el, i)) {
	      result.push(el);
	    }
	  }
	  return result;
	}
	
	module.exports = filter;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var iterateOverSparseArray = __webpack_require__(53);
	
	function forEach(arr, fn) {
	  for (var i = 0, len = arr.length; i < len; i++) {
	    if (!(i in arr)) {
	      return iterateOverSparseArray(arr, fn, i);
	    }
	    fn(arr[i], i);
	  }
	}
	
	module.exports = forEach;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getSparseArrayIndexes = __webpack_require__(54);
	
	function iterateOverSparseArray(arr, fn, fromIndex, loop) {
	  var indexes = getSparseArrayIndexes(arr, fromIndex, loop), index;
	  for (var i = 0, len = indexes.length; i < len; i++) {
	    index = indexes[i];
	    fn.call(arr, arr[index], index, arr);
	  }
	  return arr;
	}
	
	module.exports = iterateOverSparseArray;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArrayIndex = __webpack_require__(55);
	
	function getSparseArrayIndexes(arr, fromIndex, loop, fromRight) {
	  var indexes = [], i;
	  for (i in arr) {
	    if (isArrayIndex(i) && (loop || (fromRight ? i <= fromIndex : i >= fromIndex))) {
	      indexes.push(+i);
	    }
	  }
	  indexes.sort(function(a, b) {
	    var aLoop = a > fromIndex;
	    var bLoop = b > fromIndex;
	    if (aLoop !== bLoop) {
	      return aLoop ? -1 : 1;
	    }
	    return a - b;
	  });
	  return indexes;
	}
	
	module.exports = getSparseArrayIndexes;

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	
	function isArrayIndex(n) {
	  return n >>> 0 == n && n != 0xFFFFFFFF;
	}
	
	module.exports = isArrayIndex;

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';
	
	function isDefined(o) {
	  return o !== undefined;
	}
	
	module.exports = isDefined;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var CommonChars = __webpack_require__(58);
	
	var HALF_WIDTH_COMMA = CommonChars.HALF_WIDTH_COMMA;
	
	function commaSplit(str) {
	  return str.split(HALF_WIDTH_COMMA);
	}
	
	module.exports = commaSplit;

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  HALF_WIDTH_ZERO: 0x30,
	  FULL_WIDTH_ZERO: 0xff10,
	  HALF_WIDTH_PERIOD: '.',
	  FULL_WIDTH_PERIOD: '．',
	  HALF_WIDTH_COMMA: ',',
	  OPEN_BRACE: '{',
	  CLOSE_BRACE: '}'
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var NATIVE_TYPES = __webpack_require__(60),
	    forEach = __webpack_require__(52),
	    isClass = __webpack_require__(61),
	    spaceSplit = __webpack_require__(62),
	    isPlainObject = __webpack_require__(63),
	    coreUtilityAliases = __webpack_require__(40);
	
	var classToString = coreUtilityAliases.classToString;
	
	var isSerializable,
	    isBoolean, isNumber, isString,
	    isDate, isRegExp, isFunction,
	    isArray, isSet, isMap, isError;
	
	function buildClassChecks() {
	
	  var knownTypes = {};
	
	  function addCoreTypes() {
	
	    var names = spaceSplit(NATIVE_TYPES);
	
	    isBoolean = buildPrimitiveClassCheck(names[0]);
	    isNumber  = buildPrimitiveClassCheck(names[1]);
	    isString  = buildPrimitiveClassCheck(names[2]);
	
	    isDate   = buildClassCheck(names[3]);
	    isRegExp = buildClassCheck(names[4]);
	
	    // Wanted to enhance performance here by using simply "typeof"
	    // but Firefox has two major issues that make this impossible,
	    // one fixed, the other not, so perform a full class check here.
	    //
	    // 1. Regexes can be typeof "function" in FF < 3
	    //    https://bugzilla.mozilla.org/show_bug.cgi?id=61911 (fixed)
	    //
	    // 2. HTMLEmbedElement and HTMLObjectElement are be typeof "function"
	    //    https://bugzilla.mozilla.org/show_bug.cgi?id=268945 (won't fix)
	    isFunction = buildClassCheck(names[5]);
	
	
	    isArray = Array.isArray || buildClassCheck(names[6]);
	    isError = buildClassCheck(names[7]);
	
	    isSet = buildClassCheck(names[8], typeof Set !== 'undefined' && Set);
	    isMap = buildClassCheck(names[9], typeof Map !== 'undefined' && Map);
	
	    // Add core types as known so that they can be checked by value below,
	    // notably excluding Functions and adding Arguments and Error.
	    addKnownType('Arguments');
	    addKnownType(names[0]);
	    addKnownType(names[1]);
	    addKnownType(names[2]);
	    addKnownType(names[3]);
	    addKnownType(names[4]);
	    addKnownType(names[6]);
	
	  }
	
	  function addArrayTypes() {
	    var types = 'Int8 Uint8 Uint8Clamped Int16 Uint16 Int32 Uint32 Float32 Float64';
	    forEach(spaceSplit(types), function(str) {
	      addKnownType(str + 'Array');
	    });
	  }
	
	  function addKnownType(className) {
	    var str = '[object '+ className +']';
	    knownTypes[str] = true;
	  }
	
	  function isKnownType(className) {
	    return knownTypes[className];
	  }
	
	  function buildClassCheck(className, globalObject) {
	    if (globalObject && isClass(new globalObject, 'Object')) {
	      return getConstructorClassCheck(globalObject);
	    } else {
	      return getToStringClassCheck(className);
	    }
	  }
	
	  function getConstructorClassCheck(obj) {
	    var ctorStr = String(obj);
	    return function(obj) {
	      return String(obj.constructor) === ctorStr;
	    };
	  }
	
	  function getToStringClassCheck(className) {
	    return function(obj, str) {
	      // perf: Returning up front on instanceof appears to be slower.
	      return isClass(obj, className, str);
	    };
	  }
	
	  function buildPrimitiveClassCheck(className) {
	    var type = className.toLowerCase();
	    return function(obj) {
	      var t = typeof obj;
	      return t === type || t === 'object' && isClass(obj, className);
	    };
	  }
	
	  addCoreTypes();
	  addArrayTypes();
	
	  isSerializable = function(obj, className) {
	    // Only known objects can be serialized. This notably excludes functions,
	    // host objects, Symbols (which are matched by reference), and instances
	    // of classes. The latter can arguably be matched by value, but
	    // distinguishing between these and host objects -- which should never be
	    // compared by value -- is very tricky so not dealing with it here.
	    className = className || classToString(obj);
	    return isKnownType(className) || isPlainObject(obj, className);
	  };
	
	}
	
	buildClassChecks();
	
	module.exports = {
	  isSerializable: isSerializable,
	  isBoolean: isBoolean,
	  isNumber: isNumber,
	  isString: isString,
	  isDate: isDate,
	  isRegExp: isRegExp,
	  isFunction: isFunction,
	  isArray: isArray,
	  isSet: isSet,
	  isMap: isMap,
	  isError: isError
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 'Boolean Number String Date RegExp Function Array Error Set Map';

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var coreUtilityAliases = __webpack_require__(40);
	
	var classToString = coreUtilityAliases.classToString;
	
	function isClass(obj, className, str) {
	  if (!str) {
	    str = classToString(obj);
	  }
	  return str === '[object '+ className +']';
	}
	
	module.exports = isClass;

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';
	
	function spaceSplit(str) {
	  return str.split(' ');
	}
	
	module.exports = spaceSplit;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isClass = __webpack_require__(61),
	    isObjectType = __webpack_require__(64),
	    hasOwnEnumeratedProperties = __webpack_require__(65),
	    hasValidPlainObjectPrototype = __webpack_require__(66);
	
	function isPlainObject(obj, className) {
	  return isObjectType(obj) &&
	         isClass(obj, 'Object', className) &&
	         hasValidPlainObjectPrototype(obj) &&
	         hasOwnEnumeratedProperties(obj);
	}
	
	module.exports = isPlainObject;

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';
	
	function isObjectType(obj, type) {
	  return !!obj && (type || typeof obj) === 'object';
	}
	
	module.exports = isObjectType;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var coreUtilityAliases = __webpack_require__(40);
	
	var hasOwn = coreUtilityAliases.hasOwn;
	
	function hasOwnEnumeratedProperties(obj) {
	  // Plain objects are generally defined as having enumerated properties
	  // all their own, however in early IE environments without defineProperty,
	  // there may also be enumerated methods in the prototype chain, so check
	  // for both of these cases.
	  var objectProto = Object.prototype;
	  for (var key in obj) {
	    var val = obj[key];
	    if (!hasOwn(obj, key) && val !== objectProto[key]) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = hasOwnEnumeratedProperties;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var coreUtilityAliases = __webpack_require__(40);
	
	var hasOwn = coreUtilityAliases.hasOwn;
	
	function hasValidPlainObjectPrototype(obj) {
	  var hasToString = 'toString' in obj;
	  var hasConstructor = 'constructor' in obj;
	  // An object created with Object.create(null) has no methods in the
	  // prototype chain, so check if any are missing. The additional hasToString
	  // check is for false positives on some host objects in old IE which have
	  // toString but no constructor. If the object has an inherited constructor,
	  // then check if it is Object (the "isPrototypeOf" tapdance here is a more
	  // robust way of ensuring this if the global has been hijacked). Note that
	  // accessing the constructor directly (without "in" or "hasOwnProperty")
	  // will throw a permissions error in IE8 on cross-domain windows.
	  return (!hasConstructor && !hasToString) ||
	          (hasConstructor && !hasOwn(obj, 'constructor') &&
	           hasOwn(obj.constructor.prototype, 'isPrototypeOf'));
	}
	
	module.exports = hasValidPlainObjectPrototype;

/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';
	
	function isUndefined(o) {
	  return o === undefined;
	}
	
	module.exports = isUndefined;

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  abs: Math.abs,
	  pow: Math.pow,
	  min: Math.min,
	  max: Math.max,
	  ceil: Math.ceil,
	  floor: Math.floor,
	  round: Math.round
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';
	
	function getOrdinalSuffix(num) {
	  if (num >= 11 && num <= 13) {
	    return 'th';
	  } else {
	    switch(num % 10) {
	      case 1:  return 'st';
	      case 2:  return 'nd';
	      case 3:  return 'rd';
	      default: return 'th';
	    }
	  }
	}
	
	module.exports = getOrdinalSuffix;

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';
	
	function getRegNonCapturing(src, opt) {
	  if (src.length > 1) {
	    src = '(?:' + src + ')';
	  }
	  if (opt) {
	    src += '?';
	  }
	  return src;
	}
	
	module.exports = getRegNonCapturing;

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';
	
	function getArrayWithOffset(arr, n, alternate, offset) {
	  var val;
	  if (alternate > 1) {
	    val = arr[n + (alternate - 1) * offset];
	  }
	  return val || arr[n];
	}
	
	module.exports = getArrayWithOffset;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnits = __webpack_require__(73),
	    DateUnitIndexes = __webpack_require__(81),
	    isUndefined = __webpack_require__(67);
	
	var YEAR_INDEX = DateUnitIndexes.YEAR_INDEX;
	
	function iterateOverDateUnits(fn, startIndex, endIndex) {
	  endIndex = endIndex || 0;
	  if (isUndefined(startIndex)) {
	    startIndex = YEAR_INDEX;
	  }
	  for (var index = startIndex; index >= endIndex; index--) {
	    if (fn(DateUnits[index], index) === false) {
	      break;
	    }
	  }
	}
	
	module.exports = iterateOverDateUnits;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getDaysInMonth = __webpack_require__(74);
	
	var DateUnits = [
	  {
	    name: 'millisecond',
	    method: 'Milliseconds',
	    multiplier: 1,
	    start: 0,
	    end: 999
	  },
	  {
	    name: 'second',
	    method: 'Seconds',
	    multiplier: 1000,
	    start: 0,
	    end: 59
	  },
	  {
	    name: 'minute',
	    method: 'Minutes',
	    multiplier: 60 * 1000,
	    start: 0,
	    end: 59
	  },
	  {
	    name: 'hour',
	    method: 'Hours',
	    multiplier: 60 * 60 * 1000,
	    start: 0,
	    end: 23
	  },
	  {
	    name: 'day',
	    alias: 'date',
	    method: 'Date',
	    ambiguous: true,
	    multiplier: 24 * 60 * 60 * 1000,
	    start: 1,
	    end: function(d) {
	      return getDaysInMonth(d);
	    }
	  },
	  {
	    name: 'week',
	    method: 'ISOWeek',
	    ambiguous: true,
	    multiplier: 7 * 24 * 60 * 60 * 1000
	  },
	  {
	    name: 'month',
	    method: 'Month',
	    ambiguous: true,
	    multiplier: 30.4375 * 24 * 60 * 60 * 1000,
	    start: 0,
	    end: 11
	  },
	  {
	    name: 'year',
	    method: 'FullYear',
	    ambiguous: true,
	    multiplier: 365.25 * 24 * 60 * 60 * 1000,
	    start: 0
	  }
	];
	
	module.exports = DateUnits;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getYear = __webpack_require__(75),
	    getMonth = __webpack_require__(80),
	    callDateGet = __webpack_require__(76);
	
	function getDaysInMonth(d) {
	  return 32 - callDateGet(new Date(getYear(d), getMonth(d), 32), 'Date');
	}
	
	module.exports = getDaysInMonth;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callDateGet = __webpack_require__(76);
	
	function getYear(d) {
	  return callDateGet(d, 'FullYear');
	}
	
	module.exports = getYear;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utc = __webpack_require__(77);
	
	function callDateGet(d, method) {
	  return d['get' + (_utc(d) ? 'UTC' : '') + method]();
	}
	
	module.exports = callDateGet;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var privatePropertyAccessor = __webpack_require__(78);
	
	module.exports = privatePropertyAccessor('utc');

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var PRIVATE_PROP_PREFIX = __webpack_require__(79),
	    coreUtilityAliases = __webpack_require__(40);
	
	var setProperty = coreUtilityAliases.setProperty;
	
	function privatePropertyAccessor(key) {
	  var privateKey = PRIVATE_PROP_PREFIX + key;
	  return function(obj, val) {
	    if (arguments.length > 1) {
	      setProperty(obj, privateKey, val);
	      return obj;
	    }
	    return obj[privateKey];
	  };
	}
	
	module.exports = privatePropertyAccessor;

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = '_sugar_';

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callDateGet = __webpack_require__(76);
	
	function getMonth(d) {
	  return callDateGet(d, 'Month');
	}
	
	module.exports = getMonth;

/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  HOURS_INDEX: 3,
	  DAY_INDEX: 4,
	  WEEK_INDEX: 5,
	  MONTH_INDEX: 6,
	  YEAR_INDEX: 7
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var map = __webpack_require__(50),
	    escapeRegExp = __webpack_require__(83);
	
	function arrayToRegAlternates(arr) {
	  var joined = arr.join('');
	  if (!arr || !arr.length) {
	    return '';
	  }
	  if (joined.length === arr.length) {
	    return '[' + joined + ']';
	  }
	  // map handles sparse arrays so no need to compact the array here.
	  return map(arr, escapeRegExp).join('|');
	}
	
	module.exports = arrayToRegAlternates;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classChecks = __webpack_require__(59);
	
	var isString = classChecks.isString;
	
	function escapeRegExp(str) {
	  if (!isString(str)) str = String(str);
	  return str.replace(/([\\\/\'*+?|()\[\]{}.^$-])/g,'\\$1');
	}
	
	module.exports = escapeRegExp;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var CommonChars = __webpack_require__(58),
	    chr = __webpack_require__(85),
	    allCharsReg = __webpack_require__(86);
	
	var HALF_WIDTH_ZERO = CommonChars.HALF_WIDTH_ZERO,
	    FULL_WIDTH_ZERO = CommonChars.FULL_WIDTH_ZERO,
	    HALF_WIDTH_PERIOD = CommonChars.HALF_WIDTH_PERIOD,
	    FULL_WIDTH_PERIOD = CommonChars.FULL_WIDTH_PERIOD,
	    HALF_WIDTH_COMMA = CommonChars.HALF_WIDTH_COMMA;
	
	var fullWidthNumberReg, fullWidthNumberMap, fullWidthNumbers;
	
	function buildFullWidthNumber() {
	  var fwp = FULL_WIDTH_PERIOD, hwp = HALF_WIDTH_PERIOD, hwc = HALF_WIDTH_COMMA, fwn = '';
	  fullWidthNumberMap = {};
	  for (var i = 0, digit; i <= 9; i++) {
	    digit = chr(i + FULL_WIDTH_ZERO);
	    fwn += digit;
	    fullWidthNumberMap[digit] = chr(i + HALF_WIDTH_ZERO);
	  }
	  fullWidthNumberMap[hwc] = '';
	  fullWidthNumberMap[fwp] = hwp;
	  // Mapping this to itself to capture it easily
	  // in stringToNumber to detect decimals later.
	  fullWidthNumberMap[hwp] = hwp;
	  fullWidthNumberReg = allCharsReg(fwn + fwp + hwc + hwp);
	  fullWidthNumbers = fwn;
	}
	
	buildFullWidthNumber();
	
	module.exports = {
	  fullWidthNumberReg: fullWidthNumberReg,
	  fullWidthNumberMap: fullWidthNumberMap,
	  fullWidthNumbers: fullWidthNumbers
	};

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = String.fromCharCode;

/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';
	
	function allCharsReg(src) {
	  return RegExp('[' + src + ']', 'g');
	}
	
	module.exports = allCharsReg;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var trunc = __webpack_require__(88),
	    withPrecision = __webpack_require__(89),
	    getAdjustedUnit = __webpack_require__(90);
	
	function getAdjustedUnitForNumber(ms) {
	  return getAdjustedUnit(ms, function(unit) {
	    return trunc(withPrecision(ms / unit.multiplier, 1));
	  });
	}
	
	module.exports = getAdjustedUnitForNumber;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mathAliases = __webpack_require__(68);
	
	var ceil = mathAliases.ceil,
	    floor = mathAliases.floor;
	
	var trunc = Math.trunc || function(n) {
	  if (n === 0 || !isFinite(n)) return n;
	  return n < 0 ? ceil(n) : floor(n);
	};
	
	module.exports = trunc;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mathAliases = __webpack_require__(68);
	
	var abs = mathAliases.abs,
	    pow = mathAliases.pow,
	    round = mathAliases.round;
	
	function withPrecision(val, precision, fn) {
	  var multiplier = pow(10, abs(precision || 0));
	  fn = fn || round;
	  if (precision < 0) multiplier = 1 / multiplier;
	  return fn(val * multiplier) / multiplier;
	}
	
	module.exports = withPrecision;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mathAliases = __webpack_require__(68),
	    iterateOverDateUnits = __webpack_require__(72);
	
	var abs = mathAliases.abs;
	
	function getAdjustedUnit(ms, fn) {
	  var unitIndex = 0, value = 0;
	  iterateOverDateUnits(function(unit, i) {
	    value = abs(fn(unit));
	    if (value >= 1) {
	      unitIndex = i;
	      return false;
	    }
	  });
	  return [value, unitIndex, ms];
	}
	
	module.exports = getAdjustedUnit;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LocalizedParsingTokens = __webpack_require__(49),
	    getRegNonCapturing = __webpack_require__(70);
	
	function getParsingTokenWithSuffix(field, src, suffix) {
	  var token = LocalizedParsingTokens[field];
	  if (token.requiresSuffix) {
	    src = getRegNonCapturing(src + getRegNonCapturing(suffix));
	  } else if (token.requiresSuffixOr) {
	    src += getRegNonCapturing(token.requiresSuffixOr + '|' + suffix);
	  } else {
	    src += getRegNonCapturing(suffix, true);
	  }
	  return src;
	}
	
	module.exports = getParsingTokenWithSuffix;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    createDate = __webpack_require__(93);
	
	__webpack_require__(135);
	
	Sugar.Date.defineStatic({
	
	  'create': function(d, options) {
	    return createDate(d, options);
	  }
	
	});
	
	module.exports = Sugar.Date.create;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getExtendedDate = __webpack_require__(94);
	
	function createDate(d, options, forceClone) {
	  return getExtendedDate(null, d, options, forceClone).date;
	}
	
	module.exports = createDate;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MINUTES = __webpack_require__(95),
	    ParsingTokens = __webpack_require__(47),
	    LocaleHelpers = __webpack_require__(34),
	    DateUnitIndexes = __webpack_require__(81),
	    _utc = __webpack_require__(77),
	    trunc = __webpack_require__(88),
	    forEach = __webpack_require__(52),
	    tzOffset = __webpack_require__(96),
	    resetTime = __webpack_require__(97),
	    isDefined = __webpack_require__(56),
	    setWeekday = __webpack_require__(102),
	    updateDate = __webpack_require__(106),
	    getNewDate = __webpack_require__(107),
	    isUndefined = __webpack_require__(67),
	    classChecks = __webpack_require__(59),
	    advanceDate = __webpack_require__(127),
	    simpleClone = __webpack_require__(41),
	    isObjectType = __webpack_require__(64),
	    moveToEndOfUnit = __webpack_require__(128),
	    deleteDateParam = __webpack_require__(130),
	    coreUtilityAliases = __webpack_require__(40),
	    getParsingTokenValue = __webpack_require__(131),
	    moveToBeginningOfUnit = __webpack_require__(132),
	    iterateOverDateParams = __webpack_require__(123),
	    getYearFromAbbreviation = __webpack_require__(133),
	    iterateOverHigherDateParams = __webpack_require__(134);
	
	var isNumber = classChecks.isNumber,
	    isString = classChecks.isString,
	    isDate = classChecks.isDate,
	    hasOwn = coreUtilityAliases.hasOwn,
	    getOwn = coreUtilityAliases.getOwn,
	    English = LocaleHelpers.English,
	    localeManager = LocaleHelpers.localeManager,
	    DAY_INDEX = DateUnitIndexes.DAY_INDEX,
	    WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
	    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX,
	    YEAR_INDEX = DateUnitIndexes.YEAR_INDEX;
	
	function getExtendedDate(contextDate, d, opt, forceClone) {
	
	  var date, set, loc, options, afterCallbacks, relative, weekdayDir;
	
	  afterCallbacks = [];
	  options = getDateOptions(opt);
	
	  function getDateOptions(opt) {
	    var options = isString(opt) ? { locale: opt } : opt || {};
	    options.prefer = +!!getOwn(options, 'future') - +!!getOwn(options, 'past');
	    return options;
	  }
	
	  function getFormatParams(match, dif) {
	    var set = getOwn(options, 'params') || {};
	    forEach(dif.to, function(field, i) {
	      var str = match[i + 1], token, val;
	      if (!str) return;
	      if (field === 'yy' || field === 'y') {
	        field = 'year';
	        val = getYearFromAbbreviation(str, date, getOwn(options, 'prefer'));
	      } else if (token = getOwn(ParsingTokens, field)) {
	        field = token.param || field;
	        val = getParsingTokenValue(token, str);
	      } else {
	        val = loc.getTokenValue(field, str);
	      }
	      set[field] = val;
	    });
	    return set;
	  }
	
	  // Clone date will set the utc flag, but it will
	  // be overriden later, so set option flags instead.
	  function cloneDateByFlag(d, clone) {
	    if (_utc(d) && !isDefined(getOwn(options, 'fromUTC'))) {
	      options.fromUTC = true;
	    }
	    if (_utc(d) && !isDefined(getOwn(options, 'setUTC'))) {
	      options.setUTC = true;
	    }
	    if (clone) {
	      d = new Date(d.getTime());
	    }
	    return d;
	  }
	
	  function afterDateSet(fn) {
	    afterCallbacks.push(fn);
	  }
	
	  function fireCallbacks() {
	    forEach(afterCallbacks, function(fn) {
	      fn.call();
	    });
	  }
	
	  function parseStringDate(str) {
	
	    str = str.toLowerCase();
	
	    // The act of getting the locale will initialize
	    // if it is missing and add the required formats.
	    loc = localeManager.get(getOwn(options, 'locale'));
	
	    for (var i = 0, dif, match; dif = loc.compiledFormats[i]; i++) {
	      match = str.match(dif.reg);
	      if (match) {
	
	        // Note that caching the format will modify the compiledFormats array
	        // which is not a good idea to do inside its for loop, however we
	        // know at this point that we have a matched format and that we will
	        // break out below, so simpler to do it here.
	        loc.cacheFormat(dif, i);
	
	        set = getFormatParams(match, dif);
	
	        if (isDefined(set.timestamp)) {
	          str = set.timestamp;
	          set = null;
	          break;
	        }
	
	        if (isDefined(set.ampm)) {
	          handleAmpm(set.ampm);
	        }
	
	        if (set.utc || isDefined(set.tzHour)) {
	          handleTimezoneOffset(set.tzHour, set.tzMinute, set.tzSign);
	        }
	
	        if (isDefined(set.shift) && isUndefined(set.unit)) {
	          // "next january", "next monday", etc
	          handleUnitlessShift();
	        }
	
	        if (isDefined(set.num) && isUndefined(set.unit)) {
	          // "the second of January", etc
	          handleUnitlessNum(set.num);
	        }
	
	        if (set.midday) {
	          // "noon" and "midnight"
	          handleMidday(set.midday);
	        }
	
	        if (isDefined(set.day)) {
	          // Relative day localizations such as "today" and "tomorrow".
	          handleRelativeDay(set.day);
	        }
	
	        if (isDefined(set.unit)) {
	          // "3 days ago", etc
	          handleRelativeUnit(set.unit);
	        }
	
	        if (set.edge) {
	          // "the end of January", etc
	          handleEdge(set.edge, set);
	        }
	
	        if (set.yearSign) {
	          set.year *= set.yearSign;
	        }
	
	        break;
	      }
	    }
	
	    if (!set) {
	      // Fall back to native parsing
	      date = new Date(str);
	      if (getOwn(options, 'fromUTC')) {
	        // Falling back to system date here which cannot be parsed as UTC,
	        // so if we're forcing UTC then simply add the offset.
	        date.setTime(date.getTime() + (tzOffset(date) * MINUTES));
	      }
	    } else if (relative) {
	      updateDate(date, set, false, 1);
	    } else {
	      if (_utc(date)) {
	        // UTC times can traverse into other days or even months,
	        // so preemtively reset the time here to prevent this.
	        resetTime(date);
	      }
	      updateDate(date, set, true, 0, getOwn(options, 'prefer'), weekdayDir);
	    }
	    fireCallbacks();
	    return date;
	  }
	
	  function handleAmpm(ampm) {
	    if (ampm === 1 && set.hour < 12) {
	      // If the time is 1pm-11pm advance the time by 12 hours.
	      set.hour += 12;
	    } else if (ampm === 0 && set.hour === 12) {
	      // If it is 12:00am then set the hour to 0.
	      set.hour = 0;
	    }
	  }
	
	  function handleTimezoneOffset(tzHour, tzMinute, tzSign) {
	    // Adjust for timezone offset
	    _utc(date, true);
	    var offset = (tzSign || 1) * ((tzHour || 0) * 60 + (tzMinute || 0));
	    if (offset) {
	      set.minute = (set.minute || 0) - offset;
	    }
	  }
	
	  function handleUnitlessShift() {
	    if (isDefined(set.month)) {
	      // "next January"
	      set.unit = YEAR_INDEX;
	    } else if (isDefined(set.weekday)) {
	      // "next Monday"
	      set.unit = WEEK_INDEX;
	    }
	  }
	
	  function handleUnitlessNum(num) {
	    if (isDefined(set.weekday)) {
	      // "The second Tuesday of March"
	      setOrdinalWeekday(num);
	    } else if (isDefined(set.month)) {
	      // "The second of March"
	      set.date = set.num;
	    }
	  }
	
	  function handleMidday(hour) {
	    set.hour = hour % 24;
	    if (hour > 23) {
	      // If the date has hours past 24, we need to prevent it from traversing
	      // into a new day as that would make it being part of a new week in
	      // ambiguous dates such as "Monday".
	      afterDateSet(function() {
	        advanceDate(date, 'date', trunc(hour / 24));
	      });
	    }
	  }
	
	  function handleRelativeDay() {
	    resetTime(date);
	    if (isUndefined(set.unit)) {
	      set.unit = DAY_INDEX;
	      set.num  = set.day;
	      delete set.day;
	    }
	  }
	
	  function handleRelativeUnit(unitIndex) {
	    var num = isDefined(set.num) ? set.num : 1;
	
	    // If a weekday is defined, there are 3 possible formats being applied:
	    //
	    // 1. "the day after monday": unit is days
	    // 2. "next monday": short for "next week monday", unit is weeks
	    // 3. "the 2nd monday of next month": unit is months
	    //
	    // In the first case, we need to set the weekday up front, as the day is
	    // relative to it. The second case also needs to be handled up front for
	    // formats like "next monday at midnight" which will have its weekday reset
	    // if not set up front. The last case will set up the params necessary to
	    // shift the weekday and allow separateAbsoluteUnits below to handle setting
	    // it after the date has been shifted.
	    if(isDefined(set.weekday)) {
	      if(unitIndex === MONTH_INDEX) {
	        setOrdinalWeekday(num);
	        num = 1;
	      } else {
	        updateDate(date, { weekday: set.weekday }, true);
	        delete set.weekday;
	      }
	    }
	
	    if (set.half) {
	      // Allow localized "half" as a standalone colloquialism. Purposely avoiding
	      // the locale number system to reduce complexity. The units "month" and
	      // "week" are purposely excluded in the English date formats below, as
	      // "half a week" and "half a month" are meaningless as exact dates.
	      num *= set.half;
	    }
	
	    if (isDefined(set.shift)) {
	      // Shift and unit, ie "next month", "last week", etc.
	      num *= set.shift;
	    } else if (set.sign) {
	      // Unit and sign, ie "months ago", "weeks from now", etc.
	      num *= set.sign;
	    }
	
	    if (isDefined(set.day)) {
	      // "the day after tomorrow"
	      num += set.day;
	      delete set.day;
	    }
	
	    // Formats like "the 15th of last month" or "6:30pm of next week"
	    // contain absolute units in addition to relative ones, so separate
	    // them here, remove them from the params, and set up a callback to
	    // set them after the relative ones have been set.
	    separateAbsoluteUnits(unitIndex);
	
	    // Finally shift the unit.
	    set[English.units[unitIndex]] = num;
	    relative = true;
	  }
	
	  function handleEdge(edge, params) {
	    var edgeIndex = params.unit, weekdayOfMonth;
	    if (!edgeIndex) {
	      // If we have "the end of January", then we need to find the unit index.
	      iterateOverHigherDateParams(params, function(unitName, val, unit, i) {
	        if (unitName === 'weekday' && isDefined(params.month)) {
	          // If both a month and weekday exist, then we have a format like
	          // "the last tuesday in November, 2012", where the "last" is still
	          // relative to the end of the month, so prevent the unit "weekday"
	          // from taking over.
	          return;
	        }
	        edgeIndex = i;
	      });
	    }
	    if (edgeIndex === MONTH_INDEX && isDefined(params.weekday)) {
	      // If a weekday in a month exists (as described above),
	      // then set it up to be set after the date has been shifted.
	      weekdayOfMonth = params.weekday;
	      delete params.weekday;
	    }
	    afterDateSet(function() {
	      var stopIndex;
	      // "edge" values that are at the very edge are "2" so the beginning of the
	      // year is -2 and the end of the year is 2. Conversely, the "last day" is
	      // actually 00:00am so it is 1. -1 is reserved but unused for now.
	      if (edge < 0) {
	        moveToBeginningOfUnit(date, edgeIndex, getOwn(options, 'locale'));
	      } else if (edge > 0) {
	        if (edge === 1) {
	          stopIndex = DAY_INDEX;
	          moveToBeginningOfUnit(date, DAY_INDEX);
	        }
	        moveToEndOfUnit(date, edgeIndex, getOwn(options, 'locale'), stopIndex);
	      }
	      if (isDefined(weekdayOfMonth)) {
	        setWeekday(date, weekdayOfMonth, -edge);
	        resetTime(date);
	      }
	    });
	    if (edgeIndex === MONTH_INDEX) {
	      params.specificity = DAY_INDEX;
	    } else {
	      params.specificity = edgeIndex - 1;
	    }
	  }
	
	  function setOrdinalWeekday(num) {
	    // If we have "the 2nd Tuesday of June", then pass the "weekdayDir"
	    // flag along to updateDate so that the date does not accidentally traverse
	    // into the previous month. This needs to be independent of the "prefer"
	    // flag because we are only ensuring that the weekday is in the future, not
	    // the entire date.
	    set.weekday = 7 * (num - 1) + set.weekday;
	    set.date = 1;
	    weekdayDir = 1;
	  }
	
	  function separateAbsoluteUnits(unitIndex) {
	    var params;
	
	    iterateOverDateParams(set, function(name, val, unit, i) {
	      // If there is a time unit set that is more specific than
	      // the matched unit we have a string like "5:30am in 2 minutes",
	      // which is meaningless, so invalidate the date...
	      if (i >= unitIndex) {
	        date.setTime(NaN);
	        return false;
	      } else if (i < unitIndex) {
	        // ...otherwise set the params to set the absolute date
	        // as a callback after the relative date has been set.
	        params = params || {};
	        params[name] = val;
	        deleteDateParam(set, name);
	      }
	    });
	    if (params) {
	      afterDateSet(function() {
	        updateDate(date, params, true, false, getOwn(options, 'prefer'), weekdayDir);
	      });
	      if (set.edge) {
	        // "the end of March of next year"
	        handleEdge(set.edge, params);
	        delete set.edge;
	      }
	    }
	  }
	
	  if (contextDate && d) {
	    // If a context date is passed ("get" and "unitsFromNow"),
	    // then use it as the starting point.
	    date = cloneDateByFlag(contextDate, true);
	  } else {
	    date = getNewDate();
	  }
	
	  _utc(date, getOwn(options, 'fromUTC'));
	
	  if (isString(d)) {
	    date = parseStringDate(d);
	  } else if (isDate(d)) {
	    date = cloneDateByFlag(d, hasOwn(options, 'clone') || forceClone);
	  } else if (isObjectType(d)) {
	    set = simpleClone(d);
	    updateDate(date, set, true);
	  } else if (isNumber(d) || d === null) {
	    date.setTime(d);
	  }
	  // A date created by parsing a string presumes that the format *itself* is
	  // UTC, but not that the date, once created, should be manipulated as such. In
	  // other words, if you are creating a date object from a server time
	  // "2012-11-15T12:00:00Z", in the majority of cases you are using it to create
	  // a date that will, after creation, be manipulated as local, so reset the utc
	  // flag here unless "setUTC" is also set.
	  _utc(date, !!getOwn(options, 'setUTC'));
	  return {
	    set: set,
	    date: date
	  };
	}
	
	module.exports = getExtendedDate;

/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 60 * 1000;

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';
	
	function tzOffset(d) {
	  return d.getTimezoneOffset();
	}
	
	module.exports = tzOffset;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnitIndexes = __webpack_require__(81),
	    setUnitAndLowerToEdge = __webpack_require__(98);
	
	var HOURS_INDEX = DateUnitIndexes.HOURS_INDEX;
	
	function resetTime(d) {
	  return setUnitAndLowerToEdge(d, HOURS_INDEX);
	}
	
	module.exports = resetTime;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isDefined = __webpack_require__(56),
	    classChecks = __webpack_require__(59),
	    callDateSet = __webpack_require__(99),
	    walkUnitDown = __webpack_require__(100);
	
	var isFunction = classChecks.isFunction;
	
	function setUnitAndLowerToEdge(d, startIndex, stopIndex, end) {
	  walkUnitDown(startIndex, function(unit, i) {
	    var val = end ? unit.end : unit.start;
	    if (isFunction(val)) {
	      val = val(d);
	    }
	    callDateSet(d, unit.method, val);
	    return !isDefined(stopIndex) || i > stopIndex;
	  });
	  return d;
	}
	
	module.exports = setUnitAndLowerToEdge;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utc = __webpack_require__(77),
	    callDateGet = __webpack_require__(76);
	
	function callDateSet(d, method, value, safe) {
	  // "Safe" denotes not setting the date if the value is the same as what is
	  // currently set. In theory this should be a noop, however it will cause
	  // timezone shifts when in the middle of a DST fallback. This is unavoidable
	  // as the notation itself is ambiguous (i.e. there are two "1:00ams" on
	  // November 1st, 2015 in northern hemisphere timezones that follow DST),
	  // however when advancing or rewinding dates this can throw off calculations
	  // so avoiding this unintentional shifting on an opt-in basis.
	  if (safe && value === callDateGet(d, method, value)) {
	    return;
	  }
	  d['set' + (_utc(d) ? 'UTC' : '') + method](value);
	}
	
	module.exports = callDateSet;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnits = __webpack_require__(73),
	    getLowerUnitIndex = __webpack_require__(101);
	
	function walkUnitDown(unitIndex, fn) {
	  while (unitIndex >= 0) {
	    if (fn(DateUnits[unitIndex], unitIndex) === false) {
	      break;
	    }
	    unitIndex = getLowerUnitIndex(unitIndex);
	  }
	}
	
	module.exports = walkUnitDown;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnitIndexes = __webpack_require__(81);
	
	var HOURS_INDEX = DateUnitIndexes.HOURS_INDEX,
	    DAY_INDEX = DateUnitIndexes.DAY_INDEX,
	    WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
	    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX;
	
	function getLowerUnitIndex(index) {
	  if (index === MONTH_INDEX) {
	    return DAY_INDEX;
	  } else if (index === WEEK_INDEX) {
	    return HOURS_INDEX;
	  }
	  return index - 1;
	}
	
	module.exports = getLowerUnitIndex;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var setDate = __webpack_require__(103),
	    getDate = __webpack_require__(104),
	    getWeekday = __webpack_require__(105),
	    classChecks = __webpack_require__(59),
	    mathAliases = __webpack_require__(68);
	
	var isNumber = classChecks.isNumber,
	    abs = mathAliases.abs;
	
	function setWeekday(d, dow, dir) {
	  if (!isNumber(dow)) return;
	  var currentWeekday = getWeekday(d);
	  if (dir) {
	    // Allow a "direction" parameter to determine whether a weekday can
	    // be set beyond the current weekday in either direction.
	    var ndir = dir > 0 ? 1 : -1;
	    var offset = dow % 7 - currentWeekday;
	    if (offset && offset / abs(offset) !== ndir) {
	      dow += 7 * ndir;
	    }
	  }
	  setDate(d, getDate(d) + dow - currentWeekday);
	  return d.getTime();
	}
	
	module.exports = setWeekday;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callDateSet = __webpack_require__(99);
	
	function setDate(d, val) {
	  callDateSet(d, 'Date', val);
	}
	
	module.exports = setDate;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callDateGet = __webpack_require__(76);
	
	function getDate(d) {
	  return callDateGet(d, 'Date');
	}
	
	module.exports = getDate;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callDateGet = __webpack_require__(76);
	
	function getWeekday(d) {
	  return callDateGet(d, 'Day');
	}
	
	module.exports = getWeekday;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnits = __webpack_require__(73),
	    DateUnitIndexes = __webpack_require__(81),
	    trunc = __webpack_require__(88),
	    setDate = __webpack_require__(103),
	    getDate = __webpack_require__(104),
	    getMonth = __webpack_require__(80),
	    getNewDate = __webpack_require__(107),
	    setWeekday = __webpack_require__(102),
	    mathAliases = __webpack_require__(68),
	    callDateGet = __webpack_require__(76),
	    classChecks = __webpack_require__(59),
	    resetLowerUnits = __webpack_require__(114),
	    getLowerUnitIndex = __webpack_require__(101),
	    getHigherUnitIndex = __webpack_require__(115),
	    callDateSetWithWeek = __webpack_require__(116),
	    iterateOverDateParams = __webpack_require__(123);
	
	var DAY_INDEX = DateUnitIndexes.DAY_INDEX,
	    WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
	    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX,
	    YEAR_INDEX = DateUnitIndexes.YEAR_INDEX,
	    round = mathAliases.round,
	    isNumber = classChecks.isNumber;
	
	function updateDate(d, params, reset, advance, prefer, weekdayDir) {
	  var upperUnitIndex;
	
	  function setUpperUnit(unitName, unitIndex) {
	    if (prefer && !upperUnitIndex) {
	      if (unitName === 'weekday') {
	        upperUnitIndex = WEEK_INDEX;
	      } else {
	        upperUnitIndex = getHigherUnitIndex(unitIndex);
	      }
	    }
	  }
	
	  function setSpecificity(unitIndex) {
	    // Other functions may preemptively set the specificity before arriving
	    // here so concede to them if they have already set more specific units.
	    if (unitIndex > params.specificity) {
	      return;
	    }
	    params.specificity = unitIndex;
	  }
	
	  function canDisambiguate() {
	    if (!upperUnitIndex || upperUnitIndex > YEAR_INDEX) {
	      return;
	    }
	    switch(prefer) {
	      case -1: return d > getNewDate();
	      case  1: return d < getNewDate();
	    }
	  }
	
	  function disambiguateHigherUnit() {
	    var unit = DateUnits[upperUnitIndex];
	    advance = prefer;
	    setUnit(unit.name, 1, unit, upperUnitIndex);
	  }
	
	  function handleFraction(unit, unitIndex, fraction) {
	    if (unitIndex) {
	      var lowerUnit = DateUnits[getLowerUnitIndex(unitIndex)];
	      var val = round(unit.multiplier / lowerUnit.multiplier * fraction);
	      params[lowerUnit.name] = val;
	    }
	  }
	
	  function monthHasShifted(d, targetMonth) {
	    if (targetMonth < 0) {
	      targetMonth = targetMonth % 12 + 12;
	    }
	    return targetMonth % 12 !== getMonth(d);
	  }
	
	  function setUnit(unitName, value, unit, unitIndex) {
	    var method = unit.method, checkMonth, fraction;
	
	    setUpperUnit(unitName, unitIndex);
	    setSpecificity(unitIndex);
	
	    fraction = value % 1;
	    if (fraction) {
	      handleFraction(unit, unitIndex, fraction);
	      value = trunc(value);
	    }
	
	    if (unitName === 'weekday') {
	      if (!advance) {
	        // Weekdays are always considered absolute units so simply set them
	        // here even if it is an "advance" operation. This is to help avoid
	        // ambiguous meanings in "advance" as well as to neatly allow formats
	        // like "Wednesday of next week" without more complex logic.
	        setWeekday(d, value, weekdayDir);
	      }
	      return;
	    }
	    checkMonth = unitIndex === MONTH_INDEX && getDate(d) > 28;
	
	    // If we are advancing or rewinding, then we need we need to set the
	    // absolute time if the unit is "hours" or less. This is due to the fact
	    // that setting by method is ambiguous during DST shifts. For example,
	    // 1:00am on November 1st 2015 occurs twice in North American timezones
	    // with DST, the second time being after the clocks are rolled back at
	    // 2:00am. When springing forward this is automatically handled as there
	    // is no 2:00am so the date automatically jumps to 3:00am. However, when
	    // rolling back, setHours(2) will always choose the first "2am" even if
	    // the date is currently set to the second, causing unintended jumps.
	    // This ambiguity is unavoidable when setting dates as the notation is
	    // ambiguous. However when advancing, we clearly want the resulting date
	    // to be an acutal hour ahead, which can only be accomplished by setting
	    // the absolute time. Conversely, any unit higher than "hours" MUST use
	    // the internal set methods, as they are ambiguous as absolute units of
	    // time. Years may be 365 or 366 days depending on leap years, months are
	    // all over the place, and even days may be 23-25 hours depending on DST
	    // shifts. Finally, note that the kind of jumping described above will
	    // occur when calling ANY "set" method on the date and will occur even if
	    // the value being set is identical to the one currently set (i.e.
	    // setHours(2) on a date at 2am may not be a noop). This is precarious,
	    // so avoiding this situation in callDateSet by checking up front that
	    // the value is not the same before setting.
	    if (advance && !unit.ambiguous) {
	      d.setTime(d.getTime() + (value * advance * unit.multiplier));
	      return;
	    } else if (advance) {
	      if (unitIndex === WEEK_INDEX) {
	        value *= 7;
	        method = DateUnits[DAY_INDEX].method;
	      }
	      value = (value * advance) + callDateGet(d, method);
	    }
	    callDateSetWithWeek(d, method, value, advance);
	    if (checkMonth && monthHasShifted(d, value)) {
	      // As we are setting the units in reverse order, there is a chance that
	      // our date may accidentally traverse into a new month, such as setting
	      // { month: 1, date 15 } on January 31st. Check for this here and reset
	      // the date to the last day of the previous month if this has happened.
	      setDate(d, 0);
	    }
	  }
	
	  if (isNumber(params) && advance) {
	    // If param is a number and advancing, the number is in milliseconds.
	    params = { millisecond: params };
	  } else if (isNumber(params)) {
	    // Otherwise just set the timestamp and return.
	    d.setTime(params);
	    return d;
	  }
	
	  iterateOverDateParams(params, setUnit);
	
	  if (reset && params.specificity) {
	    resetLowerUnits(d, params.specificity);
	  }
	
	  // If past or future is preferred, then the process of "disambiguation" will
	  // ensure that an ambiguous time/date ("4pm", "thursday", "June", etc.) will
	  // be in the past or future. Weeks are only considered ambiguous if there is
	  // a weekday, i.e. "thursday" is an ambiguous week, but "the 4th" is an
	  // ambiguous month.
	  if (canDisambiguate()) {
	    disambiguateHigherUnit();
	  }
	  return d;
	}
	
	module.exports = updateDate;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _dateOptions = __webpack_require__(108);
	
	function getNewDate() {
	  return _dateOptions('newDateInternal')();
	}
	
	module.exports = getNewDate;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DATE_OPTIONS = __webpack_require__(109),
	    namespaceAliases = __webpack_require__(111),
	    defineOptionsAccessor = __webpack_require__(112);
	
	var sugarDate = namespaceAliases.sugarDate;
	
	module.exports = defineOptionsAccessor(sugarDate, DATE_OPTIONS);

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultNewDate = __webpack_require__(110);
	
	var DATE_OPTIONS = {
	  'newDateInternal': defaultNewDate
	};
	
	module.exports = DATE_OPTIONS;

/***/ },
/* 110 */
/***/ function(module, exports) {

	'use strict';
	
	function defaultNewDate() {
	  return new Date;
	}
	
	module.exports = defaultNewDate;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	module.exports = {
	  sugarObject: Sugar.Object,
	  sugarArray: Sugar.Array,
	  sugarDate: Sugar.Date,
	  sugarString: Sugar.String,
	  sugarNumber: Sugar.Number,
	  sugarFunction: Sugar.Function,
	  sugarRegExp: Sugar.RegExp
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var simpleClone = __webpack_require__(41),
	    defineAccessor = __webpack_require__(113);
	
	function defineOptionsAccessor(namespace, defaults) {
	  var obj = simpleClone(defaults);
	
	  function getOption(name) {
	    return obj[name];
	  }
	
	  function setOption(name, val) {
	    if (val === null) {
	      val = defaults[name];
	    }
	    obj[name] = val;
	  }
	
	  defineAccessor(namespace, 'getOption', getOption);
	  defineAccessor(namespace, 'setOption', setOption);
	  return getOption;
	}
	
	module.exports = defineOptionsAccessor;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var coreUtilityAliases = __webpack_require__(40);
	
	var setProperty = coreUtilityAliases.setProperty;
	
	function defineAccessor(namespace, name, fn) {
	  setProperty(namespace, name, fn);
	}
	
	module.exports = defineAccessor;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getLowerUnitIndex = __webpack_require__(101),
	    setUnitAndLowerToEdge = __webpack_require__(98);
	
	function resetLowerUnits(d, unitIndex) {
	  return setUnitAndLowerToEdge(d, getLowerUnitIndex(unitIndex));
	}
	
	module.exports = resetLowerUnits;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnitIndexes = __webpack_require__(81);
	
	var DAY_INDEX = DateUnitIndexes.DAY_INDEX,
	    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX;
	
	function getHigherUnitIndex(index) {
	  return index === DAY_INDEX ? MONTH_INDEX : index + 1;
	}
	
	module.exports = getHigherUnitIndex;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callDateSet = __webpack_require__(99),
	    setISOWeekNumber = __webpack_require__(117);
	
	function callDateSetWithWeek(d, method, value, safe) {
	  if (method === 'ISOWeek') {
	    setISOWeekNumber(d, value);
	  } else {
	    callDateSet(d, method, value, safe);
	  }
	}
	
	module.exports = callDateSetWithWeek;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ISODefaults = __webpack_require__(46),
	    getDate = __webpack_require__(104),
	    setDate = __webpack_require__(103),
	    setYear = __webpack_require__(118),
	    getYear = __webpack_require__(75),
	    getMonth = __webpack_require__(80),
	    setMonth = __webpack_require__(119),
	    cloneDate = __webpack_require__(120),
	    getWeekday = __webpack_require__(105),
	    setWeekday = __webpack_require__(102),
	    classChecks = __webpack_require__(59),
	    moveToFirstDayOfWeekYear = __webpack_require__(121);
	
	var isNumber = classChecks.isNumber,
	    ISO_FIRST_DAY_OF_WEEK = ISODefaults.ISO_FIRST_DAY_OF_WEEK,
	    ISO_FIRST_DAY_OF_WEEK_YEAR = ISODefaults.ISO_FIRST_DAY_OF_WEEK_YEAR;
	
	function setISOWeekNumber(d, num) {
	  if (isNumber(num)) {
	    // Intentionally avoiding updateDate here to prevent circular dependencies.
	    var isoWeek = cloneDate(d), dow = getWeekday(d);
	    moveToFirstDayOfWeekYear(isoWeek, ISO_FIRST_DAY_OF_WEEK, ISO_FIRST_DAY_OF_WEEK_YEAR);
	    setDate(isoWeek, getDate(isoWeek) + 7 * (num - 1));
	    setYear(d, getYear(isoWeek));
	    setMonth(d, getMonth(isoWeek));
	    setDate(d, getDate(isoWeek));
	    setWeekday(d, dow || 7);
	  }
	  return d.getTime();
	}
	
	module.exports = setISOWeekNumber;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callDateSet = __webpack_require__(99);
	
	function setYear(d, val) {
	  callDateSet(d, 'FullYear', val);
	}
	
	module.exports = setYear;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callDateSet = __webpack_require__(99);
	
	function setMonth(d, val) {
	  callDateSet(d, 'Month', val);
	}
	
	module.exports = setMonth;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utc = __webpack_require__(77);
	
	function cloneDate(d) {
	  // Rhino environments have a bug where new Date(d) truncates
	  // milliseconds so need to call getTime() here.
	  var clone = new Date(d.getTime());
	  _utc(clone, !!_utc(d));
	  return clone;
	}
	
	module.exports = cloneDate;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnitIndexes = __webpack_require__(81),
	    setDate = __webpack_require__(103),
	    setUnitAndLowerToEdge = __webpack_require__(98),
	    moveToBeginningOfWeek = __webpack_require__(122);
	
	var MONTH_INDEX = DateUnitIndexes.MONTH_INDEX;
	
	function moveToFirstDayOfWeekYear(d, firstDayOfWeek, firstDayOfWeekYear) {
	  setUnitAndLowerToEdge(d, MONTH_INDEX);
	  setDate(d, firstDayOfWeekYear);
	  moveToBeginningOfWeek(d, firstDayOfWeek);
	}
	
	module.exports = moveToFirstDayOfWeekYear;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var setWeekday = __webpack_require__(102),
	    getWeekday = __webpack_require__(105),
	    mathAliases = __webpack_require__(68);
	
	var floor = mathAliases.floor;
	
	function moveToBeginningOfWeek(d, firstDayOfWeek) {
	  setWeekday(d, floor((getWeekday(d) - firstDayOfWeek) / 7) * 7 + firstDayOfWeek);
	  return d;
	}
	
	module.exports = moveToBeginningOfWeek;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnitIndexes = __webpack_require__(81),
	    isDefined = __webpack_require__(56),
	    getDateParam = __webpack_require__(124),
	    iterateOverDateUnits = __webpack_require__(72);
	
	var DAY_INDEX = DateUnitIndexes.DAY_INDEX;
	
	function iterateOverDateParams(params, fn, startIndex, endIndex) {
	
	  function run(name, unit, i) {
	    var val = getDateParam(params, name);
	    if (isDefined(val)) {
	      fn(name, val, unit, i);
	    }
	  }
	
	  iterateOverDateUnits(function (unit, i) {
	    var result = run(unit.name, unit, i);
	    if (result !== false && i === DAY_INDEX) {
	      // Check for "weekday", which has a distinct meaning
	      // in the context of setting a date, but has the same
	      // meaning as "day" as a unit of time.
	      result = run('weekday', unit, i);
	    }
	    return result;
	  }, startIndex, endIndex);
	
	}
	
	module.exports = iterateOverDateParams;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getDateParamKey = __webpack_require__(125),
	    coreUtilityAliases = __webpack_require__(40);
	
	var getOwn = coreUtilityAliases.getOwn;
	
	function getDateParam(params, key) {
	  return getOwn(params, getDateParamKey(params, key));
	}
	
	module.exports = getDateParam;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getOwnKey = __webpack_require__(126);
	
	function getDateParamKey(params, key) {
	  return getOwnKey(params, key) ||
	         getOwnKey(params, key + 's') ||
	         (key === 'day' && getOwnKey(params, 'date'));
	}
	
	module.exports = getDateParamKey;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var coreUtilityAliases = __webpack_require__(40);
	
	var hasOwn = coreUtilityAliases.hasOwn;
	
	function getOwnKey(obj, key) {
	  if (hasOwn(obj, key)) {
	    return key;
	  }
	}
	
	module.exports = getOwnKey;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var updateDate = __webpack_require__(106);
	
	function advanceDate(d, unit, num, reset) {
	  var set = {};
	  set[unit] = num;
	  return updateDate(d, set, reset, 1);
	}
	
	module.exports = advanceDate;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LocaleHelpers = __webpack_require__(34),
	    DateUnitIndexes = __webpack_require__(81),
	    moveToEndOfWeek = __webpack_require__(129),
	    getLowerUnitIndex = __webpack_require__(101),
	    setUnitAndLowerToEdge = __webpack_require__(98);
	
	var WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
	    localeManager = LocaleHelpers.localeManager;
	
	function moveToEndOfUnit(d, unitIndex, localeCode, stopIndex) {
	  if (unitIndex === WEEK_INDEX) {
	    moveToEndOfWeek(d, localeManager.get(localeCode).getFirstDayOfWeek());
	  }
	  return setUnitAndLowerToEdge(d, getLowerUnitIndex(unitIndex), stopIndex, true);
	}
	
	module.exports = moveToEndOfUnit;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var setWeekday = __webpack_require__(102),
	    getWeekday = __webpack_require__(105),
	    mathAliases = __webpack_require__(68);
	
	var ceil = mathAliases.ceil;
	
	function moveToEndOfWeek(d, firstDayOfWeek) {
	  var target = firstDayOfWeek - 1;
	  setWeekday(d, ceil((getWeekday(d) - target) / 7) * 7 + target);
	  return d;
	}
	
	module.exports = moveToEndOfWeek;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getDateParamKey = __webpack_require__(125);
	
	function deleteDateParam(params, key) {
	  delete params[getDateParamKey(params, key)];
	}
	
	module.exports = deleteDateParam;

/***/ },
/* 131 */
/***/ function(module, exports) {

	'use strict';
	
	function getParsingTokenValue(token, str) {
	  var val;
	  if (token.val) {
	    val = token.val;
	  } else if (token.sign) {
	    val = str === '+' ? 1 : -1;
	  } else if (token.bool) {
	    val = !!val;
	  } else {
	    val = +str.replace(/,/, '.');
	  }
	  if (token.param === 'month') {
	    val -= 1;
	  }
	  return val;
	}
	
	module.exports = getParsingTokenValue;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LocaleHelpers = __webpack_require__(34),
	    DateUnitIndexes = __webpack_require__(81),
	    getLowerUnitIndex = __webpack_require__(101),
	    moveToBeginningOfWeek = __webpack_require__(122),
	    setUnitAndLowerToEdge = __webpack_require__(98);
	
	var WEEK_INDEX = DateUnitIndexes.WEEK_INDEX,
	    localeManager = LocaleHelpers.localeManager;
	
	function moveToBeginningOfUnit(d, unitIndex, localeCode) {
	  if (unitIndex === WEEK_INDEX) {
	    moveToBeginningOfWeek(d, localeManager.get(localeCode).getFirstDayOfWeek());
	  }
	  return setUnitAndLowerToEdge(d, getLowerUnitIndex(unitIndex));
	}
	
	module.exports = moveToBeginningOfUnit;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getYear = __webpack_require__(75),
	    mathAliases = __webpack_require__(68);
	
	var abs = mathAliases.abs;
	
	function getYearFromAbbreviation(str, d, prefer) {
	  // Following IETF here, adding 1900 or 2000 depending on the last two digits.
	  // Note that this makes no accordance for what should happen after 2050, but
	  // intentionally ignoring this for now. https://www.ietf.org/rfc/rfc2822.txt
	  var val = +str, delta;
	  val += val < 50 ? 2000 : 1900;
	  if (prefer) {
	    delta = val - getYear(d);
	    if (delta / abs(delta) !== prefer) {
	      val += prefer * 100;
	    }
	  }
	  return val;
	}
	
	module.exports = getYearFromAbbreviation;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnitIndexes = __webpack_require__(81),
	    iterateOverDateParams = __webpack_require__(123);
	
	var DAY_INDEX = DateUnitIndexes.DAY_INDEX,
	    YEAR_INDEX = DateUnitIndexes.YEAR_INDEX;
	
	function iterateOverHigherDateParams(params, fn) {
	  iterateOverDateParams(params, fn, YEAR_INDEX, DAY_INDEX);
	}
	
	module.exports = iterateOverHigherDateParams;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var setDateChainableConstructor = __webpack_require__(136);
	
	setDateChainableConstructor();

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createDate = __webpack_require__(93),
	    namespaceAliases = __webpack_require__(111),
	    setChainableConstructor = __webpack_require__(137);
	
	var sugarDate = namespaceAliases.sugarDate;
	
	function setDateChainableConstructor() {
	  setChainableConstructor(sugarDate, createDate);
	}
	
	module.exports = setDateChainableConstructor;

/***/ },
/* 137 */
/***/ function(module, exports) {

	'use strict';
	
	function setChainableConstructor(sugarNamespace, createFn) {
	  sugarNamespace.prototype.constructor = function() {
	    return createFn.apply(this, arguments);
	  };
	}
	
	module.exports = setChainableConstructor;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    LocaleHelpers = __webpack_require__(34),
	    getKeys = __webpack_require__(139);
	
	var localeManager = LocaleHelpers.localeManager;
	
	Sugar.Date.defineStatic({
	
	  'getAllLocaleCodes': function() {
	    return getKeys(localeManager.getAll());
	  }
	
	});
	
	module.exports = Sugar.Date.getAllLocaleCodes;

/***/ },
/* 139 */
/***/ function(module, exports) {

	'use strict';
	
	function getKeys(obj) {
	  return Object.keys(obj);
	}
	
	module.exports = getKeys;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    LocaleHelpers = __webpack_require__(34);
	
	var localeManager = LocaleHelpers.localeManager;
	
	Sugar.Date.defineStatic({
	
	  'getAllLocales': function() {
	    return localeManager.getAll();
	  }
	
	});
	
	module.exports = Sugar.Date.getAllLocales;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    LocaleHelpers = __webpack_require__(34);
	
	var localeManager = LocaleHelpers.localeManager;
	
	Sugar.Date.defineStatic({
	
	  'getLocale': function(code) {
	    return localeManager.get(code, !code);
	  }
	
	});
	
	module.exports = Sugar.Date.getLocale;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    LocaleHelpers = __webpack_require__(34);
	
	var localeManager = LocaleHelpers.localeManager;
	
	Sugar.Date.defineStatic({
	
	  'removeLocale': function(code) {
	    return localeManager.remove(code);
	  }
	
	});
	
	module.exports = Sugar.Date.removeLocale;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    LocaleHelpers = __webpack_require__(34);
	
	var localeManager = LocaleHelpers.localeManager;
	
	Sugar.Date.defineStatic({
	
	  'setLocale': function(code) {
	    return localeManager.set(code);
	  }
	
	});
	
	module.exports = Sugar.Date.setLocale;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.day;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var buildNumberUnitMethods = __webpack_require__(146);
	
	buildNumberUnitMethods();

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnits = __webpack_require__(73),
	    createDate = __webpack_require__(93),
	    mathAliases = __webpack_require__(68),
	    advanceDate = __webpack_require__(127),
	    namespaceAliases = __webpack_require__(111),
	    defineInstanceSimilar = __webpack_require__(147);
	
	var sugarNumber = namespaceAliases.sugarNumber,
	    round = mathAliases.round;
	
	function buildNumberUnitMethods() {
	  defineInstanceSimilar(sugarNumber, DateUnits, function(methods, unit) {
	    var name = unit.name, base, after, before;
	    base = function(n) {
	      return round(n * unit.multiplier);
	    };
	    after = function(n, d, options) {
	      return advanceDate(createDate(d, options, true), name, n);
	    };
	    before = function(n, d, options) {
	      return advanceDate(createDate(d, options, true), name, -n);
	    };
	    methods[name] = base;
	    methods[name + 's'] = base;
	    methods[name + 'Before'] = before;
	    methods[name + 'sBefore'] = before;
	    methods[name + 'Ago'] = before;
	    methods[name + 'sAgo'] = before;
	    methods[name + 'After'] = after;
	    methods[name + 'sAfter'] = after;
	    methods[name + 'FromNow'] = after;
	    methods[name + 'sFromNow'] = after;
	  });
	}
	
	module.exports = buildNumberUnitMethods;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var methodDefineAliases = __webpack_require__(148),
	    collectSimilarMethods = __webpack_require__(150);
	
	var defineInstance = methodDefineAliases.defineInstance;
	
	function defineInstanceSimilar(sugarNamespace, set, fn, flags) {
	  defineInstance(sugarNamespace, collectSimilarMethods(set, fn), flags);
	}
	
	module.exports = defineInstanceSimilar;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var wrapNamespace = __webpack_require__(149);
	
	module.exports = {
	  alias: wrapNamespace('alias'),
	  defineStatic: wrapNamespace('defineStatic'),
	  defineInstance: wrapNamespace('defineInstance'),
	  defineStaticPolyfill: wrapNamespace('defineStaticPolyfill'),
	  defineInstancePolyfill: wrapNamespace('defineInstancePolyfill'),
	  defineInstanceAndStatic: wrapNamespace('defineInstanceAndStatic'),
	  defineInstanceWithArguments: wrapNamespace('defineInstanceWithArguments')
	};

/***/ },
/* 149 */
/***/ function(module, exports) {

	'use strict';
	
	function wrapNamespace(method) {
	  return function(sugarNamespace, arg1, arg2) {
	    sugarNamespace[method](arg1, arg2);
	  };
	}
	
	module.exports = wrapNamespace;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var forEach = __webpack_require__(52),
	    spaceSplit = __webpack_require__(62),
	    classChecks = __webpack_require__(59);
	
	var isString = classChecks.isString;
	
	function collectSimilarMethods(set, fn) {
	  var methods = {};
	  if (isString(set)) {
	    set = spaceSplit(set);
	  }
	  forEach(set, function(el, i) {
	    fn(methods, el, i);
	  });
	  return methods;
	}
	
	module.exports = collectSimilarMethods;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.dayAfter;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.dayAgo;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.dayBefore;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.dayFromNow;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.days;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.daysAfter;

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.daysAgo;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.daysBefore;

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.daysFromNow;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    LocaleHelpers = __webpack_require__(34);
	
	var localeManager = LocaleHelpers.localeManager;
	
	Sugar.Number.defineInstance({
	
	  'duration': function(n, localeCode) {
	    return localeManager.get(localeCode).getDuration(n);
	  }
	
	});
	
	module.exports = Sugar.Number.duration;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.hour;

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.hourAfter;

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.hourAgo;

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.hourBefore;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.hourFromNow;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.hours;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.hoursAfter;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.hoursAgo;

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.hoursBefore;

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.hoursFromNow;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.millisecond;

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.millisecondAfter;

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.millisecondAgo;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.millisecondBefore;

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.millisecondFromNow;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.milliseconds;

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.millisecondsAfter;

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.millisecondsAgo;

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.millisecondsBefore;

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.millisecondsFromNow;

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.minute;

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.minuteAfter;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.minuteAgo;

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.minuteBefore;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.minuteFromNow;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.minutes;

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.minutesAfter;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.minutesAgo;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.minutesBefore;

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.minutesFromNow;

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.month;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.monthAfter;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.monthAgo;

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.monthBefore;

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.monthFromNow;

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.months;

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.monthsAfter;

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.monthsAgo;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.monthsBefore;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.monthsFromNow;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.second;

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.secondAfter;

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.secondAgo;

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.secondBefore;

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.secondFromNow;

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.seconds;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.secondsAfter;

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.secondsAgo;

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.secondsBefore;

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.secondsFromNow;

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.week;

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.weekAfter;

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.weekAgo;

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.weekBefore;

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.weekFromNow;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.weeks;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.weeksAfter;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.weeksAgo;

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.weeksBefore;

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.weeksFromNow;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.year;

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.yearAfter;

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.yearAgo;

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.yearBefore;

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.yearFromNow;

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.years;

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.yearsAfter;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.yearsAgo;

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.yearsBefore;

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(145);
	
	module.exports = Sugar.Number.yearsFromNow;

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.addDays;

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var buildDateUnitMethods = __webpack_require__(233);
	
	buildDateUnitMethods();

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnits = __webpack_require__(73),
	    DateUnitIndexes = __webpack_require__(81),
	    forEach = __webpack_require__(52),
	    compareDate = __webpack_require__(234),
	    advanceDate = __webpack_require__(127),
	    moveToEndOfUnit = __webpack_require__(128),
	    simpleCapitalize = __webpack_require__(236),
	    namespaceAliases = __webpack_require__(111),
	    defineInstanceSimilar = __webpack_require__(147),
	    moveToBeginningOfUnit = __webpack_require__(132),
	    createDateWithContext = __webpack_require__(237),
	    getTimeDistanceForUnit = __webpack_require__(238);
	
	var sugarDate = namespaceAliases.sugarDate,
	    HOURS_INDEX = DateUnitIndexes.HOURS_INDEX,
	    DAY_INDEX = DateUnitIndexes.DAY_INDEX;
	
	function buildDateUnitMethods() {
	
	  defineInstanceSimilar(sugarDate, DateUnits, function(methods, unit, index) {
	    var name = unit.name, caps = simpleCapitalize(name);
	
	    if (index > DAY_INDEX) {
	      forEach(['Last','This','Next'], function(shift) {
	        methods['is' + shift + caps] = function(d, localeCode) {
	          return compareDate(d, shift + ' ' + name, 0, localeCode, { locale: 'en' });
	        };
	      });
	    }
	    if (index > HOURS_INDEX) {
	      methods['beginningOf' + caps] = function(d, localeCode) {
	        return moveToBeginningOfUnit(d, index, localeCode);
	      };
	      methods['endOf' + caps] = function(d, localeCode) {
	        return moveToEndOfUnit(d, index, localeCode);
	      };
	    }
	
	    methods['add' + caps + 's'] = function(d, num, reset) {
	      return advanceDate(d, name, num, reset);
	    };
	
	    var since = function(date, d, options) {
	      return getTimeDistanceForUnit(date, createDateWithContext(date, d, options, true), unit);
	    };
	    var until = function(date, d, options) {
	      return getTimeDistanceForUnit(createDateWithContext(date, d, options, true), date, unit);
	    };
	
	    methods[name + 'sAgo']   = methods[name + 'sUntil']   = until;
	    methods[name + 'sSince'] = methods[name + 'sFromNow'] = since;
	
	  });
	
	}
	
	module.exports = buildDateUnitMethods;

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MINUTES = __webpack_require__(95),
	    DateUnits = __webpack_require__(73),
	    DateUnitIndexes = __webpack_require__(81),
	    _utc = __webpack_require__(77),
	    tzOffset = __webpack_require__(96),
	    cloneDate = __webpack_require__(120),
	    isDefined = __webpack_require__(56),
	    advanceDate = __webpack_require__(127),
	    dateIsValid = __webpack_require__(235),
	    moveToEndOfUnit = __webpack_require__(128),
	    getExtendedDate = __webpack_require__(94),
	    moveToBeginningOfUnit = __webpack_require__(132);
	
	var MONTH_INDEX = DateUnitIndexes.MONTH_INDEX;
	
	function compareDate(date, d, margin, localeCode, options) {
	  var loMargin = 0, hiMargin = 0, timezoneShift, compareEdges, override, min, max, p, t;
	
	  function getTimezoneShift() {
	    // If there is any specificity in the date then we're implicitly not
	    // checking absolute time, so ignore timezone shifts.
	    if (p.set && p.set.specificity) {
	      return 0;
	    }
	    return (tzOffset(p.date) - tzOffset(date)) * MINUTES;
	  }
	
	  function addSpecificUnit() {
	    var unit = DateUnits[p.set.specificity];
	    return advanceDate(cloneDate(p.date), unit.name, 1).getTime() - 1;
	  }
	
	  if (_utc(date)) {
	    options = options || {};
	    options.fromUTC = true;
	    options.setUTC = true;
	  }
	
	  p = getExtendedDate(null, d, options, true);
	
	  if (margin > 0) {
	    loMargin = hiMargin = margin;
	    override = true;
	  }
	  if (!dateIsValid(p.date)) return false;
	  if (p.set && p.set.specificity) {
	    if (isDefined(p.set.edge) || isDefined(p.set.shift)) {
	      compareEdges = true;
	      moveToBeginningOfUnit(p.date, p.set.specificity, localeCode);
	    }
	    if (compareEdges || p.set.specificity === MONTH_INDEX) {
	      max = moveToEndOfUnit(cloneDate(p.date), p.set.specificity, localeCode).getTime();
	    } else {
	      max = addSpecificUnit();
	    }
	    if (!override && isDefined(p.set.sign) && p.set.specificity) {
	      // If the time is relative, there can occasionally be an disparity between
	      // the relative date and "now", which it is being compared to, so set an
	      // extra margin to account for this.
	      loMargin = 50;
	      hiMargin = -50;
	    }
	  }
	  t   = date.getTime();
	  min = p.date.getTime();
	  max = max || min;
	  timezoneShift = getTimezoneShift();
	  if (timezoneShift) {
	    min -= timezoneShift;
	    max -= timezoneShift;
	  }
	  return t >= (min - loMargin) && t <= (max + hiMargin);
	}
	
	module.exports = compareDate;

/***/ },
/* 235 */
/***/ function(module, exports) {

	'use strict';
	
	function dateIsValid(d) {
	  return !isNaN(d.getTime());
	}
	
	module.exports = dateIsValid;

/***/ },
/* 236 */
/***/ function(module, exports) {

	'use strict';
	
	function simpleCapitalize(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	module.exports = simpleCapitalize;

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getExtendedDate = __webpack_require__(94);
	
	function createDateWithContext(contextDate, d, options, forceClone) {
	  return getExtendedDate(contextDate, d, options, forceClone).date;
	}
	
	module.exports = createDateWithContext;

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var trunc = __webpack_require__(88),
	    cloneDate = __webpack_require__(120),
	    advanceDate = __webpack_require__(127);
	
	function getTimeDistanceForUnit(d1, d2, unit) {
	  var fwd = d2 > d1, num, tmp;
	  if (!fwd) {
	    tmp = d2;
	    d2  = d1;
	    d1  = tmp;
	  }
	  num = d2 - d1;
	  if (unit.multiplier > 1) {
	    num = trunc(num / unit.multiplier);
	  }
	  // For higher order with potential ambiguity, use the numeric calculation
	  // as a starting point, then iterate until we pass the target date.
	  if (unit.ambiguous) {
	    d1 = cloneDate(d1);
	    if (num) {
	      advanceDate(d1, unit.name, num);
	    }
	    while (d1 < d2) {
	      advanceDate(d1, unit.name, 1);
	      if (d1 > d2) {
	        break;
	      }
	      num += 1;
	    }
	  }
	  return fwd ? -num : num;
	}
	
	module.exports = getTimeDistanceForUnit;

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.addHours;

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.addMilliseconds;

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.addMinutes;

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.addMonths;

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.addSeconds;

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.addWeeks;

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.addYears;

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    advanceDateWithArgs = __webpack_require__(247);
	
	Sugar.Date.defineInstanceWithArguments({
	
	  'advance': function(d, args) {
	    return advanceDateWithArgs(d, args, 1);
	  }
	
	});
	
	module.exports = Sugar.Date.advance;

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var updateDate = __webpack_require__(106),
	    collectDateArguments = __webpack_require__(248);
	
	function advanceDateWithArgs(d, args, dir) {
	  args = collectDateArguments(args, true);
	  return updateDate(d, args[0], args[1], dir);
	}
	
	module.exports = advanceDateWithArgs;

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classChecks = __webpack_require__(59),
	    simpleClone = __webpack_require__(41),
	    isObjectType = __webpack_require__(64),
	    getDateParamsFromString = __webpack_require__(249),
	    collectDateParamsFromArguments = __webpack_require__(250);
	
	var isNumber = classChecks.isNumber,
	    isString = classChecks.isString;
	
	function collectDateArguments(args, allowDuration) {
	  var arg1 = args[0], arg2 = args[1];
	  if (allowDuration && isString(arg1)) {
	    arg1 = getDateParamsFromString(arg1);
	  } else if (isNumber(arg1) && isNumber(arg2)) {
	    arg1 = collectDateParamsFromArguments(args);
	    arg2 = null;
	  } else {
	    if (isObjectType(arg1)) {
	      arg1 = simpleClone(arg1);
	    }
	  }
	  return [arg1, arg2];
	}
	
	module.exports = collectDateArguments;

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isUndefined = __webpack_require__(67);
	
	function getDateParamsFromString(str) {
	  var match, num, params = {};
	  match = str.match(/^(-?\d*[\d.]\d*)?\s?(\w+?)s?$/i);
	  if (match) {
	    if (isUndefined(num)) {
	      num = +match[1];
	      if (isNaN(num)) {
	        num = 1;
	      }
	    }
	    params[match[2].toLowerCase()] = num;
	  }
	  return params;
	}
	
	module.exports = getDateParamsFromString;

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnitIndexes = __webpack_require__(81),
	    isDefined = __webpack_require__(56),
	    walkUnitDown = __webpack_require__(100);
	
	var YEAR_INDEX = DateUnitIndexes.YEAR_INDEX;
	
	function collectDateParamsFromArguments(args) {
	  var params = {}, index = 0;
	  walkUnitDown(YEAR_INDEX, function(unit) {
	    var arg = args[index++];
	    if (isDefined(arg)) {
	      params[unit.name] = arg;
	    }
	  });
	  return params;
	}
	
	module.exports = collectDateParamsFromArguments;

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.beginningOfDay;

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    resetTime = __webpack_require__(97),
	    getWeekday = __webpack_require__(105),
	    setWeekday = __webpack_require__(102);
	
	Sugar.Date.defineInstance({
	
	  'beginningOfISOWeek': function(date) {
	    var day = getWeekday(date);
	    if (day === 0) {
	      day = -6;
	    } else if (day !== 1) {
	      day = 1;
	    }
	    setWeekday(date, day);
	    return resetTime(date);
	  }
	
	});
	
	module.exports = Sugar.Date.beginningOfISOWeek;

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.beginningOfMonth;

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.beginningOfWeek;

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.beginningOfYear;

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    cloneDate = __webpack_require__(120);
	
	Sugar.Date.defineInstance({
	
	  'clone': function(date) {
	    return cloneDate(date);
	  }
	
	});
	
	module.exports = Sugar.Date.clone;

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.daysAgo;

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.daysFromNow;

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    getDaysInMonth = __webpack_require__(74);
	
	Sugar.Date.defineInstance({
	
	  'daysInMonth': function(date) {
	    return getDaysInMonth(date);
	  }
	
	});
	
	module.exports = Sugar.Date.daysInMonth;

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.daysSince;

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.daysUntil;

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.endOfDay;

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    DateUnitIndexes = __webpack_require__(81),
	    getWeekday = __webpack_require__(105),
	    setWeekday = __webpack_require__(102),
	    moveToEndOfUnit = __webpack_require__(128);
	
	var DAY_INDEX = DateUnitIndexes.DAY_INDEX;
	
	Sugar.Date.defineInstance({
	
	  'endOfISOWeek': function(date) {
	    if (getWeekday(date) !== 0) {
	      setWeekday(date, 7);
	    }
	    return moveToEndOfUnit(date, DAY_INDEX);
	  }
	
	});
	
	module.exports = Sugar.Date.endOfISOWeek;

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.endOfMonth;

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.endOfWeek;

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.endOfYear;

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    dateFormat = __webpack_require__(268);
	
	Sugar.Date.defineInstance({
	
	  'format': function(date, f, localeCode) {
	    return dateFormat(date, f, localeCode);
	  }
	
	});
	
	module.exports = Sugar.Date.format;

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var CoreOutputFormats = __webpack_require__(269),
	    formattingTokens = __webpack_require__(270),
	    assertDateIsValid = __webpack_require__(285);
	
	var dateFormatMatcher = formattingTokens.dateFormatMatcher;
	
	function dateFormat(d, format, localeCode) {
	  assertDateIsValid(d);
	  format = CoreOutputFormats[format] || format || '{long}';
	  return dateFormatMatcher(format, d, localeCode);
	}
	
	module.exports = dateFormat;

/***/ },
/* 269 */
/***/ function(module, exports) {

	'use strict';
	
	var CoreOutputFormats = {
	  'ISO8601': '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{SSS}{Z}',
	  'RFC1123': '{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {ZZ}',
	  'RFC1036': '{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {ZZ}'
	};
	
	module.exports = CoreOutputFormats;

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LocaleHelpers = __webpack_require__(34),
	    FormatTokensBase = __webpack_require__(271),
	    CoreOutputFormats = __webpack_require__(269),
	    forEach = __webpack_require__(52),
	    padNumber = __webpack_require__(274),
	    spaceSplit = __webpack_require__(62),
	    namespaceAliases = __webpack_require__(111),
	    coreUtilityAliases = __webpack_require__(40),
	    createFormatMatcher = __webpack_require__(281),
	    defineInstanceSimilar = __webpack_require__(147);
	
	var localeManager = LocaleHelpers.localeManager,
	    hasOwn = coreUtilityAliases.hasOwn,
	    getOwn = coreUtilityAliases.getOwn,
	    forEachProperty = coreUtilityAliases.forEachProperty,
	    sugarDate = namespaceAliases.sugarDate;
	
	var ldmlTokens, strfTokens;
	
	function buildDateFormatTokens() {
	
	  function addFormats(target, tokens, fn) {
	    if (tokens) {
	      forEach(spaceSplit(tokens), function(token) {
	        target[token] = fn;
	      });
	    }
	  }
	
	  function buildLowercase(get) {
	    return function(d, localeCode) {
	      return get(d, localeCode).toLowerCase();
	    };
	  }
	
	  function buildOrdinal(get) {
	    return function(d, localeCode) {
	      var n = get(d, localeCode);
	      return n + localeManager.get(localeCode).getOrdinal(n);
	    };
	  }
	
	  function buildPadded(get, padding) {
	    return function(d, localeCode) {
	      return padNumber(get(d, localeCode), padding);
	    };
	  }
	
	  function buildTwoDigits(get) {
	    return function(d, localeCode) {
	      return get(d, localeCode) % 100;
	    };
	  }
	
	  function buildAlias(alias) {
	    return function(d, localeCode) {
	      return dateFormatMatcher(alias, d, localeCode);
	    };
	  }
	
	  function buildAlternates(f) {
	    for (var n = 1; n <= 5; n++) {
	      buildAlternate(f, n);
	    }
	  }
	
	  function buildAlternate(f, n) {
	    var alternate = function(d, localeCode) {
	      return f.get(d, localeCode, n);
	    };
	    addFormats(ldmlTokens, f.ldml + n, alternate);
	    if (f.lowerToken) {
	      ldmlTokens[f.lowerToken + n] = buildLowercase(alternate);
	    }
	  }
	
	  function getIdentityFormat(name) {
	    return function(d, localeCode) {
	      var loc = localeManager.get(localeCode);
	      return dateFormatMatcher(loc[name], d, localeCode);
	    };
	  }
	
	  ldmlTokens = {};
	  strfTokens = {};
	
	  forEach(FormatTokensBase, function(f) {
	    var get = f.get, getPadded;
	    if (f.lowerToken) {
	      ldmlTokens[f.lowerToken] = buildLowercase(get);
	    }
	    if (f.ordinalToken) {
	      ldmlTokens[f.ordinalToken] = buildOrdinal(get, f);
	    }
	    if (f.ldmlPaddedToken) {
	      ldmlTokens[f.ldmlPaddedToken] = buildPadded(get, f.ldmlPaddedToken.length);
	    }
	    if (f.ldmlTwoDigitToken) {
	      ldmlTokens[f.ldmlTwoDigitToken] = buildPadded(buildTwoDigits(get), 2);
	    }
	    if (f.strfTwoDigitToken) {
	      strfTokens[f.strfTwoDigitToken] = buildPadded(buildTwoDigits(get), 2);
	    }
	    if (f.strfPadding) {
	      getPadded = buildPadded(get, f.strfPadding);
	    }
	    if (f.alias) {
	      get = buildAlias(f.alias);
	    }
	    if (f.allowAlternates) {
	      buildAlternates(f);
	    }
	    addFormats(ldmlTokens, f.ldml, get);
	    addFormats(strfTokens, f.strf, getPadded || get);
	  });
	
	  forEachProperty(CoreOutputFormats, function(src, name) {
	    addFormats(ldmlTokens, name, buildAlias(src));
	  });
	
	  defineInstanceSimilar(sugarDate, 'short medium long full', function(methods, name) {
	    var fn = getIdentityFormat(name);
	    addFormats(ldmlTokens, name, fn);
	    methods[name] = fn;
	  });
	
	  addFormats(ldmlTokens, 'time', getIdentityFormat('time'));
	  addFormats(ldmlTokens, 'stamp', getIdentityFormat('stamp'));
	}
	
	var dateFormatMatcher;
	
	function buildDateFormatMatcher() {
	
	  function getLdml(d, token, localeCode) {
	    return getOwn(ldmlTokens, token)(d, localeCode);
	  }
	
	  function getStrf(d, token, localeCode) {
	    return getOwn(strfTokens, token)(d, localeCode);
	  }
	
	  function checkDateToken(ldml, strf) {
	    return hasOwn(ldmlTokens, ldml) || hasOwn(strfTokens, strf);
	  }
	
	  // Format matcher for LDML or STRF tokens.
	  dateFormatMatcher = createFormatMatcher(getLdml, getStrf, checkDateToken);
	}
	
	buildDateFormatTokens();
	
	buildDateFormatMatcher();
	
	module.exports = {
	  ldmlTokens: ldmlTokens,
	  strfTokens: strfTokens,
	  dateFormatMatcher: dateFormatMatcher
	};

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var TIMEZONE_ABBREVIATION_REG = __webpack_require__(272),
	    LocaleHelpers = __webpack_require__(34),
	    DateUnitIndexes = __webpack_require__(81),
	    trunc = __webpack_require__(88),
	    getDate = __webpack_require__(104),
	    getYear = __webpack_require__(75),
	    getHours = __webpack_require__(273),
	    getMonth = __webpack_require__(80),
	    cloneDate = __webpack_require__(120),
	    padNumber = __webpack_require__(274),
	    getWeekday = __webpack_require__(105),
	    callDateGet = __webpack_require__(76),
	    mathAliases = __webpack_require__(68),
	    getWeekYear = __webpack_require__(276),
	    getUTCOffset = __webpack_require__(278),
	    getDaysSince = __webpack_require__(279),
	    getWeekNumber = __webpack_require__(277),
	    getMeridiemToken = __webpack_require__(280),
	    setUnitAndLowerToEdge = __webpack_require__(98);
	
	var localeManager = LocaleHelpers.localeManager,
	    MONTH_INDEX = DateUnitIndexes.MONTH_INDEX,
	    ceil = mathAliases.ceil;
	
	var FormatTokensBase = [
	  {
	    ldml: 'Dow',
	    strf: 'a',
	    lowerToken: 'dow',
	    get: function(d, localeCode) {
	      return localeManager.get(localeCode).getWeekdayName(getWeekday(d), 2);
	    }
	  },
	  {
	    ldml: 'Weekday',
	    strf: 'A',
	    lowerToken: 'weekday',
	    allowAlternates: true,
	    get: function(d, localeCode, alternate) {
	      return localeManager.get(localeCode).getWeekdayName(getWeekday(d), alternate);
	    }
	  },
	  {
	    ldml: 'Mon',
	    strf: 'b h',
	    lowerToken: 'mon',
	    get: function(d, localeCode) {
	      return localeManager.get(localeCode).getMonthName(getMonth(d), 2);
	    }
	  },
	  {
	    ldml: 'Month',
	    strf: 'B',
	    lowerToken: 'month',
	    allowAlternates: true,
	    get: function(d, localeCode, alternate) {
	      return localeManager.get(localeCode).getMonthName(getMonth(d), alternate);
	    }
	  },
	  {
	    strf: 'C',
	    get: function(d) {
	      return getYear(d).toString().slice(0, 2);
	    }
	  },
	  {
	    ldml: 'd date day',
	    strf: 'd',
	    strfPadding: 2,
	    ldmlPaddedToken: 'dd',
	    ordinalToken: 'do',
	    get: function(d) {
	      return getDate(d);
	    }
	  },
	  {
	    strf: 'e',
	    get: function(d) {
	      return padNumber(getDate(d), 2, false, 10, ' ');
	    }
	  },
	  {
	    ldml: 'H 24hr',
	    strf: 'H',
	    strfPadding: 2,
	    ldmlPaddedToken: 'HH',
	    get: function(d) {
	      return getHours(d);
	    }
	  },
	  {
	    ldml: 'h hours 12hr',
	    strf: 'I',
	    strfPadding: 2,
	    ldmlPaddedToken: 'hh',
	    get: function(d) {
	      return getHours(d) % 12 || 12;
	    }
	  },
	  {
	    ldml: 'D',
	    strf: 'j',
	    strfPadding: 3,
	    ldmlPaddedToken: 'DDD',
	    get: function(d) {
	      var s = setUnitAndLowerToEdge(cloneDate(d), MONTH_INDEX);
	      return getDaysSince(d, s) + 1;
	    }
	  },
	  {
	    ldml: 'M',
	    strf: 'm',
	    strfPadding: 2,
	    ordinalToken: 'Mo',
	    ldmlPaddedToken: 'MM',
	    get: function(d) {
	      return getMonth(d) + 1;
	    }
	  },
	  {
	    ldml: 'm minutes',
	    strf: 'M',
	    strfPadding: 2,
	    ldmlPaddedToken: 'mm',
	    get: function(d) {
	      return callDateGet(d, 'Minutes');
	    }
	  },
	  {
	    ldml: 'Q',
	    get: function(d) {
	      return ceil((getMonth(d) + 1) / 3);
	    }
	  },
	  {
	    ldml: 'TT',
	    strf: 'p',
	    get: function(d, localeCode) {
	      return getMeridiemToken(d, localeCode);
	    }
	  },
	  {
	    ldml: 'tt',
	    strf: 'P',
	    get: function(d, localeCode) {
	      return getMeridiemToken(d, localeCode).toLowerCase();
	    }
	  },
	  {
	    ldml: 'T',
	    lowerToken: 't',
	    get: function(d, localeCode) {
	      return getMeridiemToken(d, localeCode).charAt(0);
	    }
	  },
	  {
	    ldml: 's seconds',
	    strf: 'S',
	    strfPadding: 2,
	    ldmlPaddedToken: 'ss',
	    get: function(d) {
	      return callDateGet(d, 'Seconds');
	    }
	  },
	  {
	    ldml: 'S ms',
	    strfPadding: 3,
	    ldmlPaddedToken: 'SSS',
	    get: function(d) {
	      return callDateGet(d, 'Milliseconds');
	    }
	  },
	  {
	    ldml: 'e',
	    strf: 'u',
	    ordinalToken: 'eo',
	    get: function(d) {
	      return getWeekday(d) || 7;
	    }
	  },
	  {
	    strf: 'U',
	    strfPadding: 2,
	    get: function(d) {
	      // Sunday first, 0-53
	      return getWeekNumber(d, false, 0);
	    }
	  },
	  {
	    ldml: 'W',
	    strf: 'V',
	    strfPadding: 2,
	    ordinalToken: 'Wo',
	    ldmlPaddedToken: 'WW',
	    get: function(d) {
	      // Monday first, 1-53 (ISO8601)
	      return getWeekNumber(d, true);
	    }
	  },
	  {
	    strf: 'w',
	    get: function(d) {
	      return getWeekday(d);
	    }
	  },
	  {
	    ldml: 'w',
	    ordinalToken: 'wo',
	    ldmlPaddedToken: 'ww',
	    get: function(d, localeCode) {
	      // Locale dependent, 1-53
	      var loc = localeManager.get(localeCode),
	          dow = loc.getFirstDayOfWeek(localeCode),
	          doy = loc.getFirstDayOfWeekYear(localeCode);
	      return getWeekNumber(d, true, dow, doy);
	    }
	  },
	  {
	    strf: 'W',
	    strfPadding: 2,
	    get: function(d) {
	      // Monday first, 0-53
	      return getWeekNumber(d, false);
	    }
	  },
	  {
	    ldmlPaddedToken: 'gggg',
	    ldmlTwoDigitToken: 'gg',
	    get: function(d, localeCode) {
	      return getWeekYear(d, localeCode);
	    }
	  },
	  {
	    strf: 'G',
	    strfPadding: 4,
	    strfTwoDigitToken: 'g',
	    ldmlPaddedToken: 'GGGG',
	    ldmlTwoDigitToken: 'GG',
	    get: function(d, localeCode) {
	      return getWeekYear(d, localeCode, true);
	    }
	  },
	  {
	    ldml: 'year',
	    ldmlPaddedToken: 'yyyy',
	    ldmlTwoDigitToken: 'yy',
	    strf: 'Y',
	    strfPadding: 4,
	    strfTwoDigitToken: 'y',
	    get: function(d) {
	      return getYear(d);
	    }
	  },
	  {
	    ldml: 'ZZ',
	    strf: 'z',
	    get: function(d) {
	      return getUTCOffset(d);
	    }
	  },
	  {
	    ldml: 'X',
	    get: function(d) {
	      return trunc(d.getTime() / 1000);
	    }
	  },
	  {
	    ldml: 'x',
	    get: function(d) {
	      return d.getTime();
	    }
	  },
	  {
	    ldml: 'Z',
	    get: function(d) {
	      return getUTCOffset(d, true);
	    }
	  },
	  {
	    ldml: 'z',
	    strf: 'Z',
	    get: function(d) {
	      // Note that this is not accurate in all browsing environments!
	      // https://github.com/moment/moment/issues/162
	      // It will continue to be supported for Node and usage with the
	      // understanding that it may be blank.
	      var match = d.toString().match(TIMEZONE_ABBREVIATION_REG);
	      return match ? match[1]: '';
	    }
	  },
	  {
	    strf: 'D',
	    alias: '%m/%d/%y'
	  },
	  {
	    strf: 'F',
	    alias: '%Y-%m-%d'
	  },
	  {
	    strf: 'r',
	    alias: '%I:%M:%S %p'
	  },
	  {
	    strf: 'R',
	    alias: '%H:%M'
	  },
	  {
	    strf: 'T',
	    alias: '%H:%M:%S'
	  },
	  {
	    strf: 'x',
	    alias: '{short}'
	  },
	  {
	    strf: 'X',
	    alias: '{time}'
	  },
	  {
	    strf: 'c',
	    alias: '{stamp}'
	  }
	];
	
	module.exports = FormatTokensBase;

/***/ },
/* 272 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = /(\w{3})[()\s\d]*$/;

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callDateGet = __webpack_require__(76);
	
	function getHours(d) {
	  return callDateGet(d, 'Hours');
	}
	
	module.exports = getHours;

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mathAliases = __webpack_require__(68),
	    repeatString = __webpack_require__(275);
	
	var abs = mathAliases.abs;
	
	function padNumber(num, place, sign, base, replacement) {
	  var str = abs(num).toString(base || 10);
	  str = repeatString(replacement || '0', place - str.replace(/\.\d+/, '').length) + str;
	  if (sign || num < 0) {
	    str = (num < 0 ? '-' : '+') + str;
	  }
	  return str;
	}
	
	module.exports = padNumber;

/***/ },
/* 275 */
/***/ function(module, exports) {

	'use strict';
	
	function repeatString(str, num) {
	  var result = '';
	  str = str.toString();
	  while (num > 0) {
	    if (num & 1) {
	      result += str;
	    }
	    if (num >>= 1) {
	      str += str;
	    }
	  }
	  return result;
	}
	
	module.exports = repeatString;

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LocaleHelpers = __webpack_require__(34),
	    getYear = __webpack_require__(75),
	    getMonth = __webpack_require__(80),
	    getWeekNumber = __webpack_require__(277);
	
	var localeManager = LocaleHelpers.localeManager;
	
	function getWeekYear(d, localeCode, iso) {
	  var year, month, firstDayOfWeek, firstDayOfWeekYear, week, loc;
	  year = getYear(d);
	  month = getMonth(d);
	  if (month === 0 || month === 11) {
	    if (!iso) {
	      loc = localeManager.get(localeCode);
	      firstDayOfWeek = loc.getFirstDayOfWeek(localeCode);
	      firstDayOfWeekYear = loc.getFirstDayOfWeekYear(localeCode);
	    }
	    week = getWeekNumber(d, false, firstDayOfWeek, firstDayOfWeekYear);
	    if (month === 0 && week === 0) {
	      year -= 1;
	    } else if (month === 11 && week === 1) {
	      year += 1;
	    }
	  }
	  return year;
	}
	
	module.exports = getWeekYear;

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ISODefaults = __webpack_require__(46),
	    setDate = __webpack_require__(103),
	    getDate = __webpack_require__(104),
	    cloneDate = __webpack_require__(120),
	    isUndefined = __webpack_require__(67),
	    moveToEndOfWeek = __webpack_require__(129),
	    moveToBeginningOfWeek = __webpack_require__(122),
	    moveToFirstDayOfWeekYear = __webpack_require__(121);
	
	var ISO_FIRST_DAY_OF_WEEK = ISODefaults.ISO_FIRST_DAY_OF_WEEK,
	    ISO_FIRST_DAY_OF_WEEK_YEAR = ISODefaults.ISO_FIRST_DAY_OF_WEEK_YEAR;
	
	function getWeekNumber(d, allowPrevious, firstDayOfWeek, firstDayOfWeekYear) {
	  var isoWeek, n = 0;
	  if (isUndefined(firstDayOfWeek)) {
	    firstDayOfWeek = ISO_FIRST_DAY_OF_WEEK;
	  }
	  if (isUndefined(firstDayOfWeekYear)) {
	    firstDayOfWeekYear = ISO_FIRST_DAY_OF_WEEK_YEAR;
	  }
	  // Moving to the end of the week allows for forward year traversal, ie
	  // Dec 29 2014 is actually week 01 of 2015.
	  isoWeek = moveToEndOfWeek(cloneDate(d), firstDayOfWeek);
	  moveToFirstDayOfWeekYear(isoWeek, firstDayOfWeek, firstDayOfWeekYear);
	  if (allowPrevious && d < isoWeek) {
	    // If the date is still before the start of the year, then it should be
	    // the last week of the previous year, ie Jan 1 2016 is actually week 53
	    // of 2015, so move to the beginning of the week to traverse the year.
	    isoWeek = moveToBeginningOfWeek(cloneDate(d), firstDayOfWeek);
	    moveToFirstDayOfWeekYear(isoWeek, firstDayOfWeek, firstDayOfWeekYear);
	  }
	  while (isoWeek <= d) {
	    // Doing a very simple walk to get the week number.
	    setDate(isoWeek, getDate(isoWeek) + 7);
	    n++;
	  }
	  return n;
	}
	
	module.exports = getWeekNumber;

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utc = __webpack_require__(77),
	    trunc = __webpack_require__(88),
	    tzOffset = __webpack_require__(96),
	    padNumber = __webpack_require__(274),
	    mathAliases = __webpack_require__(68);
	
	var abs = mathAliases.abs;
	
	function getUTCOffset(d, iso) {
	  var offset = _utc(d) ? 0 : tzOffset(d), hours, mins, colon;
	  colon  = iso === true ? ':' : '';
	  if (!offset && iso) return 'Z';
	  hours = padNumber(trunc(-offset / 60), 2, true);
	  mins = padNumber(abs(offset % 60), 2);
	  return  hours + colon + mins;
	}
	
	module.exports = getUTCOffset;

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DateUnits = __webpack_require__(73),
	    DateUnitIndexes = __webpack_require__(81),
	    getTimeDistanceForUnit = __webpack_require__(238);
	
	var DAY_INDEX = DateUnitIndexes.DAY_INDEX;
	
	function getDaysSince(d1, d2) {
	  return getTimeDistanceForUnit(d1, d2, DateUnits[DAY_INDEX]);
	}
	
	module.exports = getDaysSince;

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LocaleHelpers = __webpack_require__(34),
	    trunc = __webpack_require__(88),
	    getHours = __webpack_require__(273);
	
	var localeManager = LocaleHelpers.localeManager;
	
	function getMeridiemToken(d, localeCode) {
	  var hours = getHours(d);
	  return localeManager.get(localeCode).ampm[trunc(hours / 12)] || '';
	}
	
	module.exports = getMeridiemToken;

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var STRING_FORMAT_REG = __webpack_require__(282),
	    CommonChars = __webpack_require__(58),
	    memoizeFunction = __webpack_require__(283);
	
	var OPEN_BRACE = CommonChars.OPEN_BRACE,
	    CLOSE_BRACE = CommonChars.CLOSE_BRACE;
	
	function createFormatMatcher(bracketMatcher, percentMatcher, precheck) {
	
	  var reg = STRING_FORMAT_REG;
	  var compileMemoized = memoizeFunction(compile);
	
	  function getToken(format, match) {
	    var get, token, literal, fn;
	    var bKey = match[2];
	    var pLit = match[3];
	    var pKey = match[5];
	    if (match[4] && percentMatcher) {
	      token = pKey;
	      get = percentMatcher;
	    } else if (bKey) {
	      token = bKey;
	      get = bracketMatcher;
	    } else if (pLit && percentMatcher) {
	      literal = pLit;
	    } else {
	      literal = match[1] || match[0];
	    }
	    if (get) {
	      assertPassesPrecheck(precheck, bKey, pKey);
	      fn = function(obj, opt) {
	        return get(obj, token, opt);
	      };
	    }
	    format.push(fn || getLiteral(literal));
	  }
	
	  function getSubstring(format, str, start, end) {
	    if (end > start) {
	      var sub = str.slice(start, end);
	      assertNoUnmatched(sub, OPEN_BRACE);
	      assertNoUnmatched(sub, CLOSE_BRACE);
	      format.push(function() {
	        return sub;
	      });
	    }
	  }
	
	  function getLiteral(str) {
	    return function() {
	      return str;
	    };
	  }
	
	  function assertPassesPrecheck(precheck, bt, pt) {
	    if (precheck && !precheck(bt, pt)) {
	      throw new TypeError('Invalid token '+ (bt || pt) +' in format string');
	    }
	  }
	
	  function assertNoUnmatched(str, chr) {
	    if (str.indexOf(chr) !== -1) {
	      throw new TypeError('Unmatched '+ chr +' in format string');
	    }
	  }
	
	  function compile(str) {
	    var format = [], lastIndex = 0, match;
	    reg.lastIndex = 0;
	    while(match = reg.exec(str)) {
	      getSubstring(format, str, lastIndex, match.index);
	      getToken(format, match);
	      lastIndex = reg.lastIndex;
	    }
	    getSubstring(format, str, lastIndex, str.length);
	    return format;
	  }
	
	  return function(str, obj, opt) {
	    var format = compileMemoized(str), result = '';
	    for (var i = 0; i < format.length; i++) {
	      result += format[i](obj, opt);
	    }
	    return result;
	  };
	}
	
	module.exports = createFormatMatcher;

/***/ },
/* 282 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = /([{}])\1|\{([^}]*)\}|(%)%|(%(\w*))/g;

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var INTERNAL_MEMOIZE_LIMIT = __webpack_require__(284),
	    coreUtilityAliases = __webpack_require__(40);
	
	var hasOwn = coreUtilityAliases.hasOwn;
	
	function memoizeFunction(fn) {
	  var memo = {}, counter = 0;
	
	  return function(key) {
	    if (hasOwn(memo, key)) {
	      return memo[key];
	    }
	    if (counter === INTERNAL_MEMOIZE_LIMIT) {
	      memo = {};
	      counter = 0;
	    }
	    counter++;
	    return memo[key] = fn(key);
	  };
	}
	
	module.exports = memoizeFunction;

/***/ },
/* 284 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 1000;

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dateIsValid = __webpack_require__(235);
	
	function assertDateIsValid(d) {
	  if (!dateIsValid(d)) {
	    throw new TypeError('Date is not valid');
	  }
	}
	
	module.exports = assertDateIsValid;

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    createDateWithContext = __webpack_require__(237);
	
	Sugar.Date.defineInstance({
	
	  'get': function(date, d, options) {
	    return createDateWithContext(date, d, options);
	  }
	
	});
	
	module.exports = Sugar.Date.get;

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    getWeekNumber = __webpack_require__(277);
	
	Sugar.Date.defineInstance({
	
	  'getISOWeek': function(date) {
	    return getWeekNumber(date, true);
	  }
	
	});
	
	module.exports = Sugar.Date.getISOWeek;

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    getUTCOffset = __webpack_require__(278);
	
	Sugar.Date.defineInstance({
	
	  'getUTCOffset': function(date, iso) {
	    return getUTCOffset(date, iso);
	  }
	
	});
	
	module.exports = Sugar.Date.getUTCOffset;

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	Sugar.Date.defineInstance({
	
	  'getUTCWeekday': function(date) {
	    return date.getUTCDay();
	  }
	
	});
	
	module.exports = Sugar.Date.getUTCWeekday;

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    getWeekday = __webpack_require__(105);
	
	Sugar.Date.defineInstance({
	
	  'getWeekday': function(date) {
	    return getWeekday(date);
	  }
	
	});
	
	module.exports = Sugar.Date.getWeekday;

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.hoursAgo;

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.hoursFromNow;

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.hoursSince;

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.hoursUntil;

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    fullCompareDate = __webpack_require__(296);
	
	Sugar.Date.defineInstance({
	
	  'is': function(date, d, margin) {
	    return fullCompareDate(date, d, margin);
	  }
	
	});
	
	module.exports = Sugar.Date.is;

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LocaleHelpers = __webpack_require__(34),
	    trim = __webpack_require__(297),
	    getMonth = __webpack_require__(80),
	    isDefined = __webpack_require__(56),
	    getNewDate = __webpack_require__(107),
	    compareDay = __webpack_require__(298),
	    getWeekday = __webpack_require__(105),
	    dateIsValid = __webpack_require__(235),
	    classChecks = __webpack_require__(59),
	    compareDate = __webpack_require__(234);
	
	var isString = classChecks.isString,
	    English = LocaleHelpers.English;
	
	function fullCompareDate(date, d, margin) {
	  var tmp;
	  if (!dateIsValid(date)) return;
	  if (isString(d)) {
	    d = trim(d).toLowerCase();
	    switch(true) {
	      case d === 'future':    return date.getTime() > getNewDate().getTime();
	      case d === 'past':      return date.getTime() < getNewDate().getTime();
	      case d === 'today':     return compareDay(date);
	      case d === 'tomorrow':  return compareDay(date,  1);
	      case d === 'yesterday': return compareDay(date, -1);
	      case d === 'weekday':   return getWeekday(date) > 0 && getWeekday(date) < 6;
	      case d === 'weekend':   return getWeekday(date) === 0 || getWeekday(date) === 6;
	
	      case (isDefined(tmp = English.weekdayMap[d])):
	        return getWeekday(date) === tmp;
	      case (isDefined(tmp = English.monthMap[d])):
	        return getMonth(date) === tmp;
	    }
	  }
	  return compareDate(date, d, margin);
	}
	
	module.exports = fullCompareDate;

/***/ },
/* 297 */
/***/ function(module, exports) {

	'use strict';
	
	function trim(str) {
	  return str.trim();
	}
	
	module.exports = trim;

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var setDate = __webpack_require__(103),
	    getDate = __webpack_require__(104),
	    getYear = __webpack_require__(75),
	    getMonth = __webpack_require__(80),
	    getNewDate = __webpack_require__(107);
	
	function compareDay(d, shift) {
	  var comp = getNewDate();
	  if (shift) {
	    setDate(comp, getDate(comp) + shift);
	  }
	  return getYear(d) === getYear(comp) &&
	         getMonth(d) === getMonth(comp) &&
	         getDate(d) === getDate(comp);
	}
	
	module.exports = compareDay;

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    createDate = __webpack_require__(93);
	
	Sugar.Date.defineInstance({
	
	  'isAfter': function(date, d, margin) {
	    return date.getTime() > createDate(d).getTime() - (margin || 0);
	  }
	
	});
	
	module.exports = Sugar.Date.isAfter;

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    createDate = __webpack_require__(93);
	
	Sugar.Date.defineInstance({
	
	  'isBefore': function(date, d, margin) {
	    return date.getTime() < createDate(d).getTime() + (margin || 0);
	  }
	
	});
	
	module.exports = Sugar.Date.isBefore;

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    createDate = __webpack_require__(93),
	    mathAliases = __webpack_require__(68);
	
	var min = mathAliases.min,
	    max = mathAliases.max;
	
	Sugar.Date.defineInstance({
	
	  'isBetween': function(date, d1, d2, margin) {
	    var t  = date.getTime();
	    var t1 = createDate(d1).getTime();
	    var t2 = createDate(d2).getTime();
	    var lo = min(t1, t2);
	    var hi = max(t1, t2);
	    margin = margin || 0;
	    return (lo - margin <= t) && (hi + margin >= t);
	  }
	
	});
	
	module.exports = Sugar.Date.isBetween;

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isFriday;

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var buildRelativeAliases = __webpack_require__(304);
	
	buildRelativeAliases();

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LocaleHelpers = __webpack_require__(34),
	    spaceSplit = __webpack_require__(62),
	    fullCompareDate = __webpack_require__(296),
	    namespaceAliases = __webpack_require__(111),
	    defineInstanceSimilar = __webpack_require__(147);
	
	var English = LocaleHelpers.English,
	    sugarDate = namespaceAliases.sugarDate;
	
	function buildRelativeAliases() {
	  var special  = spaceSplit('Today Yesterday Tomorrow Weekday Weekend Future Past');
	  var weekdays = English.weekdays.slice(0, 7);
	  var months   = English.months.slice(0, 12);
	  var together = special.concat(weekdays).concat(months);
	  defineInstanceSimilar(sugarDate, together, function(methods, name) {
	    methods['is'+ name] = function(d) {
	      return fullCompareDate(d, name);
	    };
	  });
	}
	
	module.exports = buildRelativeAliases;

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isFuture;

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.isLastMonth;

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.isLastWeek;

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.isLastYear;

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    getYear = __webpack_require__(75);
	
	Sugar.Date.defineInstance({
	
	  'isLeapYear': function(date) {
	    var year = getYear(date);
	    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
	  }
	
	});
	
	module.exports = Sugar.Date.isLeapYear;

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isMonday;

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.isNextMonth;

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.isNextWeek;

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.isNextYear;

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isPast;

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isSaturday;

/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isSunday;

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.isThisMonth;

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.isThisWeek;

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.isThisYear;

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isThursday;

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isToday;

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isTomorrow;

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isTuesday;

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    isUTC = __webpack_require__(325);
	
	Sugar.Date.defineInstance({
	
	  'isUTC': function(date) {
	    return isUTC(date);
	  }
	
	});
	
	module.exports = Sugar.Date.isUTC;

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utc = __webpack_require__(77),
	    tzOffset = __webpack_require__(96);
	
	function isUTC(d) {
	  return !!_utc(d) || tzOffset(d) === 0;
	}
	
	module.exports = isUTC;

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    dateIsValid = __webpack_require__(235);
	
	Sugar.Date.defineInstance({
	
	  'isValid': function(date) {
	    return dateIsValid(date);
	  }
	
	});
	
	module.exports = Sugar.Date.isValid;

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isWednesday;

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isWeekday;

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isWeekend;

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(303);
	
	module.exports = Sugar.Date.isYesterday;

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	Sugar.Date.defineInstance({
	
	  'iso': function(date) {
	    return date.toISOString();
	  }
	
	});
	
	module.exports = Sugar.Date.iso;

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.millisecondsAgo;

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.millisecondsFromNow;

/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.millisecondsSince;

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.millisecondsUntil;

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.minutesAgo;

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.minutesFromNow;

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.minutesSince;

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.minutesUntil;

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.monthsAgo;

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.monthsFromNow;

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.monthsSince;

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.monthsUntil;

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    dateRelative = __webpack_require__(345);
	
	Sugar.Date.defineInstance({
	
	  'relative': function(date, localeCode, fn) {
	    return dateRelative(date, null, localeCode, fn);
	  }
	
	});
	
	module.exports = Sugar.Date.relative;

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LocaleHelpers = __webpack_require__(34),
	    dateFormat = __webpack_require__(268),
	    classChecks = __webpack_require__(59),
	    assertDateIsValid = __webpack_require__(285),
	    getAdjustedUnitForDate = __webpack_require__(346);
	
	var isFunction = classChecks.isFunction,
	    localeManager = LocaleHelpers.localeManager;
	
	function dateRelative(d, dRelative, arg1, arg2) {
	  var adu, format, type, localeCode, fn;
	  assertDateIsValid(d);
	  if (isFunction(arg1)) {
	    fn = arg1;
	  } else {
	    localeCode = arg1;
	    fn = arg2;
	  }
	  adu = getAdjustedUnitForDate(d, dRelative);
	  if (fn) {
	    format = fn.apply(d, adu.concat(localeManager.get(localeCode)));
	    if (format) {
	      return dateFormat(d, format, localeCode);
	    }
	  }
	  // Adjust up if time is in ms, as this doesn't
	  // look very good for a standard relative date.
	  if (adu[1] === 0) {
	    adu[1] = 1;
	    adu[0] = 1;
	  }
	  if (dRelative) {
	    type = 'duration';
	  } else if (adu[2] > 0) {
	    type = 'future';
	  } else {
	    type = 'past';
	  }
	  return localeManager.get(localeCode).getRelativeFormat(adu, type);
	}
	
	module.exports = dateRelative;

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getNewDate = __webpack_require__(107),
	    mathAliases = __webpack_require__(68),
	    getAdjustedUnit = __webpack_require__(90),
	    getTimeDistanceForUnit = __webpack_require__(238);
	
	var abs = mathAliases.abs;
	
	function getAdjustedUnitForDate(d, dRelative) {
	  var ms;
	  if (!dRelative) {
	    dRelative = getNewDate();
	    if (d > dRelative) {
	      // If our date is greater than the one that we got from getNewDate, it
	      // means that we are finding the unit for a date that is in the future
	      // relative to now. However, often the incoming date was created in
	      // the same cycle as our comparison, but our "now" date will have been
	      // created an instant after it, creating situations where "5 minutes from
	      // now" becomes "4 minutes from now" in the same tick. To prevent this,
	      // subtract a buffer of 10ms to compensate.
	      dRelative = new Date(dRelative.getTime() - 10);
	    }
	  }
	  ms = d - dRelative;
	  return getAdjustedUnit(ms, function(u) {
	    return abs(getTimeDistanceForUnit(d, dRelative, u));
	  });
	}
	
	module.exports = getAdjustedUnitForDate;

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    createDate = __webpack_require__(93),
	    dateRelative = __webpack_require__(345);
	
	Sugar.Date.defineInstance({
	
	  'relativeTo': function(date, d, localeCode) {
	    return dateRelative(date, createDate(d), localeCode);
	  }
	
	});
	
	module.exports = Sugar.Date.relativeTo;

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    DateUnitIndexes = __webpack_require__(81),
	    moveToBeginningOfUnit = __webpack_require__(132),
	    getUnitIndexForParamName = __webpack_require__(349);
	
	var DAY_INDEX = DateUnitIndexes.DAY_INDEX;
	
	Sugar.Date.defineInstance({
	
	  'reset': function(date, unit, localeCode) {
	    var unitIndex = unit ? getUnitIndexForParamName(unit) : DAY_INDEX;
	    moveToBeginningOfUnit(date, unitIndex, localeCode);
	    return date;
	  }
	
	});
	
	module.exports = Sugar.Date.reset;

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var iterateOverDateParams = __webpack_require__(123);
	
	function getUnitIndexForParamName(name) {
	  var params = {}, unitIndex;
	  params[name] = 1;
	  iterateOverDateParams(params, function(name, val, unit, i) {
	    unitIndex = i;
	    return false;
	  });
	  return unitIndex;
	}
	
	module.exports = getUnitIndexForParamName;

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    advanceDateWithArgs = __webpack_require__(247);
	
	Sugar.Date.defineInstanceWithArguments({
	
	  'rewind': function(d, args) {
	    return advanceDateWithArgs(d, args, -1);
	  }
	
	});
	
	module.exports = Sugar.Date.rewind;

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.secondsAgo;

/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.secondsFromNow;

/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.secondsSince;

/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.secondsUntil;

/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    updateDate = __webpack_require__(106),
	    collectDateArguments = __webpack_require__(248);
	
	Sugar.Date.defineInstanceWithArguments({
	
	  'set': function(d, args) {
	    args = collectDateArguments(args);
	    return updateDate(d, args[0], args[1]);
	  }
	
	});
	
	module.exports = Sugar.Date.set;

/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    setISOWeekNumber = __webpack_require__(117);
	
	Sugar.Date.defineInstance({
	
	  'setISOWeek': function(date, num) {
	    return setISOWeekNumber(date, num);
	  }
	
	});
	
	module.exports = Sugar.Date.setISOWeek;

/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    _utc = __webpack_require__(77);
	
	Sugar.Date.defineInstance({
	
	  'setUTC': function(date, on) {
	    return _utc(date, on);
	  }
	
	});
	
	module.exports = Sugar.Date.setUTC;

/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    setWeekday = __webpack_require__(102);
	
	Sugar.Date.defineInstance({
	
	  'setWeekday': function(date, dow) {
	    return setWeekday(date, dow);
	  }
	
	});
	
	module.exports = Sugar.Date.setWeekday;

/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.weeksAgo;

/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.weeksFromNow;

/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.weeksSince;

/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.weeksUntil;

/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.yearsAgo;

/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.yearsFromNow;

/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.yearsSince;

/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33);
	
	__webpack_require__(232);
	
	module.exports = Sugar.Date.yearsUntil;

/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    _dateOptions = __webpack_require__(108);
	
	module.exports = Sugar.Date.getOption;

/***/ },
/* 368 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    _dateOptions = __webpack_require__(108);
	
	module.exports = Sugar.Date.setOption;

/***/ },
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Static Methods
	__webpack_require__(370);
	
	// Prototype Methods
	__webpack_require__(384);
	__webpack_require__(387);
	__webpack_require__(388);
	__webpack_require__(389);
	__webpack_require__(401);
	__webpack_require__(402);
	__webpack_require__(403);
	__webpack_require__(404);
	__webpack_require__(405);
	__webpack_require__(406);
	__webpack_require__(407);
	__webpack_require__(408);
	__webpack_require__(409);
	__webpack_require__(411);
	__webpack_require__(412);
	__webpack_require__(413);
	__webpack_require__(414);
	__webpack_require__(415);
	
	module.exports = __webpack_require__(33);

/***/ },
/* 370 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Sugar = __webpack_require__(33),
	    DateRangeConstructor = __webpack_require__(371);
	
	Sugar.Date.defineStatic({
	
	  'range': DateRangeConstructor
	
	});
	
	module.exports = Sugar.Date.range;

/***/ },
/* 371 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    classChecks = __webpack_require__(59),
	    getDateForRange = __webpack_require__(375),
	    createDateRangeFromString = __webpack_require__(376);
	
	var isString = classChecks.isString;
	
	var DateRangeConstructor = function(start, end) {
	  if (arguments.length === 1 && isString(start)) {
	    return createDateRangeFromString(start);
	  }
	  return new Range(getDateForRange(start), getDateForRange(end));
	};
	
	module.exports = DateRangeConstructor;

/***/ },
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var cloneRangeMember = __webpack_require__(373);
	
	function Range(start, end) {
	  this.start = cloneRangeMember(start);
	  this.end   = cloneRangeMember(end);
	}
	
	module.exports = Range;

/***/ },
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classChecks = __webpack_require__(59),
	    getRangeMemberPrimitiveValue = __webpack_require__(374);
	
	var isDate = classChecks.isDate;
	
	function cloneRangeMember(m) {
	  if (isDate(m)) {
	    return new Date(m.getTime());
	  } else {
	    return getRangeMemberPrimitiveValue(m);
	  }
	}
	
	module.exports = cloneRangeMember;

/***/ },
/* 374 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classChecks = __webpack_require__(59);
	
	var isDate = classChecks.isDate;
	
	function getRangeMemberPrimitiveValue(m) {
	  if (m == null) return m;
	  return isDate(m) ? m.getTime() : m.valueOf();
	}
	
	module.exports = getRangeMemberPrimitiveValue;

/***/ },
/* 375 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classChecks = __webpack_require__(59),
	    namespaceAliases = __webpack_require__(111);
	
	var isDate = classChecks.isDate,
	    sugarDate = namespaceAliases.sugarDate;
	
	function getDateForRange(d) {
	  if (isDate(d)) {
	    return d;
	  } else if (d == null) {
	    return new Date();
	  } else if (sugarDate.create) {
	    return sugarDate.create(d);
	  }
	  return new Date(d);
	}
	
	module.exports = getDateForRange;

/***/ },
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    DurationTextFormats = __webpack_require__(377),
	    incrementDate = __webpack_require__(380),
	    getDateForRange = __webpack_require__(375),
	    namespaceAliases = __webpack_require__(111),
	    getDateIncrementObject = __webpack_require__(382);
	
	var sugarDate = namespaceAliases.sugarDate,
	    RANGE_REG_FROM_TO = DurationTextFormats.RANGE_REG_FROM_TO,
	    RANGE_REG_REAR_DURATION = DurationTextFormats.RANGE_REG_REAR_DURATION,
	    RANGE_REG_FRONT_DURATION = DurationTextFormats.RANGE_REG_FRONT_DURATION;
	
	function createDateRangeFromString(str) {
	  var match, datetime, duration, dio, start, end;
	  if (sugarDate.get && (match = str.match(RANGE_REG_FROM_TO))) {
	    start = getDateForRange(match[1].replace('from', 'at'));
	    end = sugarDate.get(start, match[2]);
	    return new Range(start, end);
	  }
	  if (match = str.match(RANGE_REG_FRONT_DURATION)) {
	    duration = match[1];
	    datetime = match[2];
	  }
	  if (match = str.match(RANGE_REG_REAR_DURATION)) {
	    datetime = match[1];
	    duration = match[2];
	  }
	  if (datetime && duration) {
	    start = getDateForRange(datetime);
	    dio = getDateIncrementObject(duration);
	    end = incrementDate(start, dio[0], dio[1]);
	  } else {
	    start = str;
	  }
	  return new Range(getDateForRange(start), getDateForRange(end));
	}
	
	module.exports = createDateRangeFromString;

/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var FULL_CAPTURED_DURATION = __webpack_require__(378);
	
	module.exports = {
	  RANGE_REG_FROM_TO: /(?:from)?\s*(.+)\s+(?:to|until)\s+(.+)$/i,
	  RANGE_REG_REAR_DURATION: RegExp('(.+)\\s*for\\s*' + FULL_CAPTURED_DURATION, 'i'),
	  RANGE_REG_FRONT_DURATION: RegExp('(?:for)?\\s*'+ FULL_CAPTURED_DURATION +'\\s*(?:starting)?\\s*at\\s*(.+)', 'i')
	};

/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DURATION_UNITS = __webpack_require__(379);
	
	module.exports = '((?:\\d+)?\\s*(?:' + DURATION_UNITS + '))s?';

/***/ },
/* 379 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 'year|month|week|day|hour|minute|second|millisecond';

/***/ },
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MULTIPLIERS = __webpack_require__(381),
	    callDateSet = __webpack_require__(99),
	    callDateGet = __webpack_require__(76);
	
	function incrementDate(src, amount, unit) {
	  var mult = MULTIPLIERS[unit], d;
	  if (mult) {
	    d = new Date(src.getTime() + (amount * mult));
	  } else {
	    d = new Date(src);
	    callDateSet(d, unit, callDateGet(src, unit) + amount);
	  }
	  return d;
	}
	
	module.exports = incrementDate;

/***/ },
/* 381 */
/***/ function(module, exports) {

	'use strict';
	
	var MULTIPLIERS = {
	  'Hours': 60 * 60 * 1000,
	  'Minutes': 60 * 1000,
	  'Seconds': 1000,
	  'Milliseconds': 1
	};
	
	module.exports = MULTIPLIERS;

/***/ },
/* 382 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DURATION_REG = __webpack_require__(383),
	    classChecks = __webpack_require__(59),
	    simpleCapitalize = __webpack_require__(236);
	
	var isNumber = classChecks.isNumber;
	
	function getDateIncrementObject(amt) {
	  var match, val, unit;
	  if (isNumber(amt)) {
	    return [amt, 'Milliseconds'];
	  }
	  match = amt.match(DURATION_REG);
	  val = +match[1] || 1;
	  unit = simpleCapitalize(match[2].toLowerCase());
	  if (unit.match(/hour|minute|second/i)) {
	    unit += 's';
	  } else if (unit === 'Year') {
	    unit = 'FullYear';
	  } else if (unit === 'Week') {
	    unit = 'Date';
	    val *= 7;
	  } else if (unit === 'Day') {
	    unit = 'Date';
	  }
	  return [val, unit];
	}
	
	module.exports = getDateIncrementObject;

/***/ },
/* 383 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var DURATION_UNITS = __webpack_require__(379);
	
	module.exports = RegExp('(\\d+)?\\s*('+ DURATION_UNITS +')s?', 'i');

/***/ },
/* 384 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    rangeClamp = __webpack_require__(385),
	    defineOnPrototype = __webpack_require__(386);
	
	defineOnPrototype(Range, {
	
	  'clamp': function(obj) {
	    return rangeClamp(this, obj);
	  }
	
	});
	
	// This package does not export anything as it is
	// simply defining "clamp" on Range.prototype.

/***/ },
/* 385 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var cloneRangeMember = __webpack_require__(373);
	
	function rangeClamp(range, obj) {
	  var clamped,
	      start = range.start,
	      end = range.end,
	      min = end < start ? end : start,
	      max = start > end ? start : end;
	  if (obj < min) {
	    clamped = min;
	  } else if (obj > max) {
	    clamped = max;
	  } else {
	    clamped = obj;
	  }
	  return cloneRangeMember(clamped);
	}
	
	module.exports = rangeClamp;

/***/ },
/* 386 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var coreUtilityAliases = __webpack_require__(40);
	
	var forEachProperty = coreUtilityAliases.forEachProperty;
	
	function defineOnPrototype(ctor, methods) {
	  var proto = ctor.prototype;
	  forEachProperty(methods, function(val, key) {
	    proto[key] = val;
	  });
	}
	
	module.exports = defineOnPrototype;

/***/ },
/* 387 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    defineOnPrototype = __webpack_require__(386);
	
	defineOnPrototype(Range, {
	
	  'clone': function() {
	    return new Range(this.start, this.end);
	  }
	
	});
	
	// This package does not export anything as it is
	// simply defining "clone" on Range.prototype.

/***/ },
/* 388 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    defineOnPrototype = __webpack_require__(386);
	
	defineOnPrototype(Range, {
	
	  'contains': function(obj) {
	    if (obj == null) return false;
	    if (obj.start && obj.end) {
	      return obj.start >= this.start && obj.start <= this.end &&
	             obj.end   >= this.start && obj.end   <= this.end;
	    } else {
	      return obj >= this.start && obj <= this.end;
	    }
	  }
	
	});
	
	// This package does not export anything as it is
	// simply defining "contains" on Range.prototype.

/***/ },
/* 389 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(390);
	
	// This package does not export anything as it is
	// simply defining "days" on Range.prototype.

/***/ },
/* 390 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var buildDateRangeUnits = __webpack_require__(391);
	
	buildDateRangeUnits();

/***/ },
/* 391 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MULTIPLIERS = __webpack_require__(381),
	    DURATION_UNITS = __webpack_require__(379),
	    Range = __webpack_require__(372),
	    trunc = __webpack_require__(88),
	    forEach = __webpack_require__(52),
	    rangeEvery = __webpack_require__(392),
	    simpleCapitalize = __webpack_require__(236),
	    defineOnPrototype = __webpack_require__(386);
	
	function buildDateRangeUnits() {
	  var methods = {};
	  forEach(DURATION_UNITS.split('|'), function(unit, i) {
	    var name = unit + 's', mult, fn;
	    if (i < 4) {
	      fn = function() {
	        return rangeEvery(this, unit, true);
	      };
	    } else {
	      mult = MULTIPLIERS[simpleCapitalize(name)];
	      fn = function() {
	        return trunc((this.end - this.start) / mult);
	      };
	    }
	    methods[name] = fn;
	  });
	  defineOnPrototype(Range, methods);
	}
	
	module.exports = buildDateRangeUnits;

/***/ },
/* 392 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classChecks = __webpack_require__(59),
	    rangeIsValid = __webpack_require__(393),
	    incrementDate = __webpack_require__(380),
	    incrementNumber = __webpack_require__(396),
	    incrementString = __webpack_require__(397),
	    getGreaterPrecision = __webpack_require__(398),
	    getDateIncrementObject = __webpack_require__(382);
	
	var isNumber = classChecks.isNumber,
	    isString = classChecks.isString,
	    isDate = classChecks.isDate,
	    isFunction = classChecks.isFunction;
	
	function rangeEvery(range, step, countOnly, fn) {
	  var increment,
	      precision,
	      dio,
	      unit,
	      start   = range.start,
	      end     = range.end,
	      inverse = end < start,
	      current = start,
	      index   = 0,
	      result  = [];
	
	  if (!rangeIsValid(range)) {
	    return [];
	  }
	  if (isFunction(step)) {
	    fn = step;
	    step = null;
	  }
	  step = step || 1;
	  if (isNumber(start)) {
	    precision = getGreaterPrecision(start, step);
	    increment = function() {
	      return incrementNumber(current, step, precision);
	    };
	  } else if (isString(start)) {
	    increment = function() {
	      return incrementString(current, step);
	    };
	  } else if (isDate(start)) {
	    dio  = getDateIncrementObject(step);
	    step = dio[0];
	    unit = dio[1];
	    increment = function() {
	      return incrementDate(current, step, unit);
	    };
	  }
	  // Avoiding infinite loops
	  if (inverse && step > 0) {
	    step *= -1;
	  }
	  while(inverse ? current >= end : current <= end) {
	    if (!countOnly) {
	      result.push(current);
	    }
	    if (fn) {
	      fn(current, index, range);
	    }
	    current = increment();
	    index++;
	  }
	  return countOnly ? index - 1 : result;
	}
	
	module.exports = rangeEvery;

/***/ },
/* 393 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isValidRangeMember = __webpack_require__(394);
	
	function rangeIsValid(range) {
	  return isValidRangeMember(range.start) &&
	         isValidRangeMember(range.end) &&
	         typeof range.start === typeof range.end;
	}
	
	module.exports = rangeIsValid;

/***/ },
/* 394 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var valueIsNotInfinite = __webpack_require__(395),
	    getRangeMemberPrimitiveValue = __webpack_require__(374);
	
	function isValidRangeMember(m) {
	  var val = getRangeMemberPrimitiveValue(m);
	  return (!!val || val === 0) && valueIsNotInfinite(m);
	}
	
	module.exports = isValidRangeMember;

/***/ },
/* 395 */
/***/ function(module, exports) {

	'use strict';
	
	function valueIsNotInfinite(m) {
	  return m !== -Infinity && m !== Infinity;
	}
	
	module.exports = valueIsNotInfinite;

/***/ },
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var withPrecision = __webpack_require__(89);
	
	function incrementNumber(current, amount, precision) {
	  return withPrecision(current + amount, precision);
	}
	
	module.exports = incrementNumber;

/***/ },
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var chr = __webpack_require__(85);
	
	function incrementString(current, amount) {
	  return chr(current.charCodeAt(0) + amount);
	}
	
	module.exports = incrementString;

/***/ },
/* 398 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mathAliases = __webpack_require__(68),
	    getPrecision = __webpack_require__(399);
	
	var max = mathAliases.max;
	
	function getGreaterPrecision(n1, n2) {
	  return max(getPrecision(n1), getPrecision(n2));
	}
	
	module.exports = getGreaterPrecision;

/***/ },
/* 399 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var periodSplit = __webpack_require__(400);
	
	function getPrecision(n) {
	  var split = periodSplit(n.toString());
	  return split[1] ? split[1].length : 0;
	}
	
	module.exports = getPrecision;

/***/ },
/* 400 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var CommonChars = __webpack_require__(58);
	
	var HALF_WIDTH_PERIOD = CommonChars.HALF_WIDTH_PERIOD;
	
	function periodSplit(str) {
	  return str.split(HALF_WIDTH_PERIOD);
	}
	
	module.exports = periodSplit;

/***/ },
/* 401 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    rangeEvery = __webpack_require__(392),
	    defineOnPrototype = __webpack_require__(386);
	
	defineOnPrototype(Range, {
	
	  'every': function(amount, fn) {
	    return rangeEvery(this, amount, false, fn);
	  }
	
	});
	
	// This package does not export anything as it is
	// simply defining "every" on Range.prototype.

/***/ },
/* 402 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(390);
	
	// This package does not export anything as it is
	// simply defining "hours" on Range.prototype.

/***/ },
/* 403 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    defineOnPrototype = __webpack_require__(386);
	
	defineOnPrototype(Range, {
	
	  'intersect': function(range) {
	    if (range.start > this.end || range.end < this.start) {
	      return new Range(NaN, NaN);
	    }
	    return new Range(
	      this.start > range.start ? this.start : range.start,
	      this.end   < range.end   ? this.end   : range.end
	    );
	  }
	
	});
	
	// This package does not export anything as it is
	// simply defining "intersect" on Range.prototype.

/***/ },
/* 404 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    rangeIsValid = __webpack_require__(393),
	    defineOnPrototype = __webpack_require__(386);
	
	defineOnPrototype(Range, {
	
	  'isValid': function() {
	    return rangeIsValid(this);
	  }
	
	});
	
	// This package does not export anything as it is
	// simply defining "isValid" on Range.prototype.

/***/ },
/* 405 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(390);
	
	// This package does not export anything as it is
	// simply defining "milliseconds" on Range.prototype.

/***/ },
/* 406 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(390);
	
	// This package does not export anything as it is
	// simply defining "minutes" on Range.prototype.

/***/ },
/* 407 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(390);
	
	// This package does not export anything as it is
	// simply defining "months" on Range.prototype.

/***/ },
/* 408 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(390);
	
	// This package does not export anything as it is
	// simply defining "seconds" on Range.prototype.

/***/ },
/* 409 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    mathAliases = __webpack_require__(68),
	    rangeIsValid = __webpack_require__(393),
	    defineOnPrototype = __webpack_require__(386),
	    getRangeMemberNumericValue = __webpack_require__(410);
	
	var abs = mathAliases.abs;
	
	defineOnPrototype(Range, {
	
	  'span': function() {
	    var n = getRangeMemberNumericValue(this.end) - getRangeMemberNumericValue(this.start);
	    return rangeIsValid(this) ? abs(n) + 1 : NaN;
	  }
	
	});
	
	// This package does not export anything as it is
	// simply defining "span" on Range.prototype.

/***/ },
/* 410 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classChecks = __webpack_require__(59);
	
	var isString = classChecks.isString;
	
	function getRangeMemberNumericValue(m) {
	  return isString(m) ? m.charCodeAt(0) : m;
	}
	
	module.exports = getRangeMemberNumericValue;

/***/ },
/* 411 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    rangeEvery = __webpack_require__(392),
	    defineOnPrototype = __webpack_require__(386);
	
	defineOnPrototype(Range, {
	
	  'toArray': function() {
	    return rangeEvery(this);
	  }
	
	});
	
	// This package does not export anything as it is
	// simply defining "toArray" on Range.prototype.

/***/ },
/* 412 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    rangeIsValid = __webpack_require__(393),
	    defineOnPrototype = __webpack_require__(386);
	
	defineOnPrototype(Range, {
	
	  'toString': function() {
	    return rangeIsValid(this) ? this.start + '..' + this.end : 'Invalid Range';
	  }
	
	});
	
	// This package does not export anything as it is
	// simply defining "toString" on Range.prototype.

/***/ },
/* 413 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Range = __webpack_require__(372),
	    defineOnPrototype = __webpack_require__(386);
	
	defineOnPrototype(Range, {
	
	  'union': function(range) {
	    return new Range(
	      this.start < range.start ? this.start : range.start,
	      this.end   > range.end   ? this.end   : range.end
	    );
	  }
	
	});
	
	// This package does not export anything as it is
	// simply defining "union" on Range.prototype.

/***/ },
/* 414 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(390);
	
	// This package does not export anything as it is
	// simply defining "weeks" on Range.prototype.

/***/ },
/* 415 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(390);
	
	// This package does not export anything as it is
	// simply defining "years" on Range.prototype.

/***/ },
/* 416 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(417);
	__webpack_require__(418);
	__webpack_require__(419);
	__webpack_require__(420);
	__webpack_require__(421);
	__webpack_require__(422);
	__webpack_require__(423);
	__webpack_require__(424);
	__webpack_require__(425);
	__webpack_require__(426);
	__webpack_require__(427);
	__webpack_require__(428);
	__webpack_require__(429);
	__webpack_require__(430);
	__webpack_require__(431);
	__webpack_require__(432);
	__webpack_require__(433);
	
	module.exports = __webpack_require__(33);

/***/ },
/* 417 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Catalan locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('ca')
	 *
	 */
	addLocale('ca', {
	  'plural': true,
	  'units': 'milisegon:|s,segon:|s,minut:|s,hor:a|es,di:a|es,setman:a|es,mes:|os,any:|s',
	  'months': 'gen:er|,febr:er|,mar:ç|,abr:il|,mai:g|,jun:y|,jul:iol|,ag:ost|,set:embre|,oct:ubre|,nov:embre|,des:embre|',
	  'weekdays': 'diumenge|dg,dilluns|dl,dimarts|dt,dimecres|dc,dijous|dj,divendres|dv,dissabte|ds',
	  'numerals': 'zero,un,dos,tres,quatre,cinc,sis,set,vuit,nou,deu',
	  'tokens': 'el,la,de',
	  'short':  '{dd}/{MM}/{yyyy}',
	  'medium': '{d} {month} {yyyy}',
	  'long':   '{d} {month} {yyyy} {time}',
	  'full':   '{weekday} {d} {month} {yyyy} {time}',
	  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
	  'time':   '{H}:{mm}',
	  'past':   '{sign} {num} {unit}',
	  'future': '{sign} {num} {unit}',
	  'duration': '{num} {unit}',
	  'timeMarkers': 'a las',
	  'ampm': 'am,pm',
	  'modifiers': [
	    { 'name': 'day', 'src': "abans d'ahir", 'value': -2 },
	    { 'name': 'day', 'src': 'ahir', 'value': -1 },
	    { 'name': 'day', 'src': 'avui', 'value': 0 },
	    { 'name': 'day', 'src': 'demà|dema', 'value': 1 },
	    { 'name': 'sign', 'src': 'fa', 'value': -1 },
	    { 'name': 'sign', 'src': 'en', 'value': 1 },
	    { 'name': 'shift', 'src': 'passat', 'value': -1 },
	    { 'name': 'shift', 'src': 'el proper|la propera', 'value': 1 }
	  ],
	  'parse': [
	    '{sign} {num} {unit}',
	    '{num} {unit} {sign}',
	    '{0?}{1?} {unit:5-7} {shift}',
	    '{0?}{1?} {shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{shift} {weekday}',
	    '{weekday} {shift}',
	    '{date?} {2?} {months}\\.? {2?} {year?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "ca" locale.

/***/ },
/* 418 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Danish locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('da')
	 *
	 */
	addLocale('da', {
	  'plural': true,
	  'units': 'millisekund:|er,sekund:|er,minut:|ter,tim:e|er,dag:|e,ug:e|er|en,måned:|er|en+maaned:|er|en,år:||et+aar:||et',
	  'months': 'jan:uar|,feb:ruar|,mar:ts|,apr:il|,maj,jun:i|,jul:i|,aug:ust|,sep:tember|,okt:ober|,nov:ember|,dec:ember|',
	  'weekdays': 'søn:dag|+son:dag|,man:dag|,tir:sdag|,ons:dag|,tor:sdag|,fre:dag|,lør:dag|+lor:dag|',
	  'numerals': 'nul,en|et,to,tre,fire,fem,seks,syv,otte,ni,ti',
	  'tokens':   'den,for',
	  'articles': 'den',
	  'short':  '{dd}-{MM}-{yyyy}',
	  'medium': '{d}. {month} {yyyy}',
	  'long':   '{d}. {month} {yyyy} {time}',
	  'full':   '{weekday} d. {d}. {month} {yyyy} {time}',
	  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
	  'time':   '{H}:{mm}',
	  'past':   '{num} {unit} {sign}',
	  'future': '{sign} {num} {unit}',
	  'duration': '{num} {unit}',
	  'ampm': 'am,pm',
	  'modifiers': [
	    { 'name': 'day', 'src': 'forgårs|i forgårs|forgaars|i forgaars', 'value': -2 },
	    { 'name': 'day', 'src': 'i går|igår|i gaar|igaar', 'value': -1 },
	    { 'name': 'day', 'src': 'i dag|idag', 'value': 0 },
	    { 'name': 'day', 'src': 'i morgen|imorgen', 'value': 1 },
	    { 'name': 'day', 'src': 'over morgon|overmorgen|i over morgen|i overmorgen|iovermorgen', 'value': 2 },
	    { 'name': 'sign', 'src': 'siden', 'value': -1 },
	    { 'name': 'sign', 'src': 'om', 'value':  1 },
	    { 'name': 'shift', 'src': 'i sidste|sidste', 'value': -1 },
	    { 'name': 'shift', 'src': 'denne', 'value': 0 },
	    { 'name': 'shift', 'src': 'næste|naeste', 'value': 1 }
	  ],
	  'parse': [
	    '{months} {year?}',
	    '{num} {unit} {sign}',
	    '{sign} {num} {unit}',
	    '{1?} {num} {unit} {sign}',
	    '{shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{day|weekday}',
	    '{date} {months?}\\.? {year?}'
	  ],
	  'timeFrontParse': [
	    '{shift} {weekday}',
	    '{0?} {weekday?},? {date}\\.? {months?}\\.? {year?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "da" locale.

/***/ },
/* 419 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * German locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('de')
	 *
	 */
	addLocale('de', {
	  'plural': true,
	  'units': 'Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en|e',
	  'months': 'Jan:uar|,Feb:ruar|,M:är|ärz|ar|arz,Apr:il|,Mai,Juni,Juli,Aug:ust|,Sept:ember|,Okt:ober|,Nov:ember|,Dez:ember|',
	  'weekdays': 'So:nntag|,Mo:ntag|,Di:enstag|,Mi:ttwoch|,Do:nnerstag|,Fr:eitag|,Sa:mstag|',
	  'numerals': 'null,ein:|e|er|en|em,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn',
	  'tokens': 'der',
	  'short': '{dd}.{MM}.{yyyy}',
	  'medium': '{d}. {Month} {yyyy}',
	  'long': '{d}. {Month} {yyyy} {time}',
	  'full': '{Weekday}, {d}. {Month} {yyyy} {time}',
	  'stamp': '{Dow} {d} {Mon} {yyyy} {time}',
	  'time': '{H}:{mm}',
	  'past': '{sign} {num} {unit}',
	  'future': '{sign} {num} {unit}',
	  'duration': '{num} {unit}',
	  'timeMarkers': 'um',
	  'ampm': 'am,pm',
	  'modifiers': [
	    { 'name': 'day', 'src': 'vorgestern', 'value': -2 },
	    { 'name': 'day', 'src': 'gestern', 'value': -1 },
	    { 'name': 'day', 'src': 'heute', 'value': 0 },
	    { 'name': 'day', 'src': 'morgen', 'value': 1 },
	    { 'name': 'day', 'src': 'übermorgen|ubermorgen|uebermorgen', 'value': 2 },
	    { 'name': 'sign', 'src': 'vor:|her', 'value': -1 },
	    { 'name': 'sign', 'src': 'in', 'value': 1 },
	    { 'name': 'shift', 'src': 'letzte:|r|n|s', 'value': -1 },
	    { 'name': 'shift', 'src': 'nächste:|r|n|s+nachste:|r|n|s+naechste:|r|n|s+kommende:n|r', 'value': 1 }
	  ],
	  'parse': [
	    '{months} {year?}',
	    '{sign} {num} {unit}',
	    '{num} {unit} {sign}',
	    '{shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{shift?} {day|weekday}',
	    '{weekday?},? {date}\\.? {months?}\\.? {year?}'
	  ],
	  'timeFrontParse': [
	    '{shift} {weekday}',
	    '{weekday?},? {date}\\.? {months?}\\.? {year?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "de" locale.

/***/ },
/* 420 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Spanish locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('es')
	 *
	 */
	addLocale('es', {
	  'plural': true,
	  'units': 'milisegundo:|s,segundo:|s,minuto:|s,hora:|s,día|días|dia|dias,semana:|s,mes:|es,año|años|ano|anos',
	  'months': 'ene:ro|,feb:rero|,mar:zo|,abr:il|,may:o|,jun:io|,jul:io|,ago:sto|,sep:tiembre|,oct:ubre|,nov:iembre|,dic:iembre|',
	  'weekdays': 'dom:ingo|,lun:es|,mar:tes|,mié:rcoles|+mie:rcoles|,jue:ves|,vie:rnes|,sáb:ado|+sab:ado|',
	  'numerals': 'cero,uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez',
	  'tokens': 'el,la,de',
	  'short':  '{dd}/{MM}/{yyyy}',
	  'medium': '{d} de {Month} de {yyyy}',
	  'long':   '{d} de {Month} de {yyyy} {time}',
	  'full':   '{weekday}, {d} de {month} de {yyyy} {time}',
	  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
	  'time':   '{H}:{mm}',
	  'past':   '{sign} {num} {unit}',
	  'future': '{sign} {num} {unit}',
	  'duration': '{num} {unit}',
	  'timeMarkers': 'a las',
	  'ampm': 'am,pm',
	  'modifiers': [
	    { 'name': 'day', 'src': 'anteayer', 'value': -2 },
	    { 'name': 'day', 'src': 'ayer', 'value': -1 },
	    { 'name': 'day', 'src': 'hoy', 'value': 0 },
	    { 'name': 'day', 'src': 'mañana|manana', 'value': 1 },
	    { 'name': 'sign', 'src': 'hace', 'value': -1 },
	    { 'name': 'sign', 'src': 'dentro de', 'value': 1 },
	    { 'name': 'shift', 'src': 'pasad:o|a', 'value': -1 },
	    { 'name': 'shift', 'src': 'próximo|próxima|proximo|proxima', 'value': 1 }
	  ],
	  'parse': [
	    '{months} {2?} {year?}',
	    '{sign} {num} {unit}',
	    '{num} {unit} {sign}',
	    '{0?}{1?} {unit:5-7} {shift}',
	    '{0?}{1?} {shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{shift?} {day|weekday} {shift?}',
	    '{date} {2?} {months?}\\.? {2?} {year?}'
	  ],
	  'timeFrontParse': [
	    '{shift?} {weekday} {shift?}',
	    '{date} {2?} {months?}\\.? {2?} {year?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "es" locale.

/***/ },
/* 421 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Finnish locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('fi')
	 *
	 */
	addLocale('fi', {
	  'plural': true,
	  'units': 'millisekun:ti|tia|nin|teja|tina,sekun:ti|tia|nin|teja|tina,minuut:ti|tia|in|teja|tina,tun:ti|tia|nin|teja|tina,päiv:ä|ää|än|iä|änä,viik:ko|koa|on|olla|koja|kona,kuukau:si|tta|den+kuussa,vuo:si|tta|den|sia|tena|nna',
	  'months': 'tammi:kuuta||kuu,helmi:kuuta||kuu,maalis:kuuta||kuu,huhti:kuuta||kuu,touko:kuuta||kuu,kesä:kuuta||kuu,heinä:kuuta||kuu,elo:kuuta||kuu,syys:kuuta||kuu,loka:kuuta||kuu,marras:kuuta||kuu,joulu:kuuta||kuu',
	  'weekdays': 'su:nnuntai||nnuntaina,ma:anantai||anantaina,ti:istai||istaina,ke:skiviikko||skiviikkona,to:rstai||rstaina,pe:rjantai||rjantaina,la:uantai||uantaina',
	  'numerals': 'nolla,yksi|ensimmäinen,kaksi|toinen,kolm:e|as,neljä:|s,vii:si|des,kuu:si|des,seitsemä:n|s,kahdeksa:n|s,yhdeksä:n|s,kymmene:n|s',
	  'short': '{d}.{M}.{yyyy}',
	  'medium': '{d}. {month} {yyyy}',
	  'long': '{d}. {month} {yyyy} klo {time}',
	  'full': '{weekday} {d}. {month} {yyyy} klo {time}',
	  'stamp': '{dow} {d} {mon} {yyyy} {time}',
	  'time': '{H}.{mm}',
	  'timeMarkers': 'klo,kello',
	  'ordinalSuffix': '.',
	  'relative': function(num, unit, ms, format) {
	    var units = this['units'];
	    function numberWithUnit(mult) {
	      return num + ' ' + units[(8 * mult) + unit];
	    }
	    function baseUnit() {
	      return numberWithUnit(num === 1 ? 0 : 1);
	    }
	    switch(format) {
	      case 'duration':  return baseUnit();
	      case 'past':      return baseUnit() + ' sitten';
	      case 'future':    return numberWithUnit(2) + ' kuluttua';
	    }
	  },
	  'modifiers': [
	    { 'name': 'day',   'src': 'toissa päivänä', 'value': -2 },
	    { 'name': 'day',   'src': 'eilen|eilistä', 'value': -1 },
	    { 'name': 'day',   'src': 'tänään', 'value': 0 },
	    { 'name': 'day',   'src': 'huomenna|huomista', 'value': 1 },
	    { 'name': 'day',   'src': 'ylihuomenna|ylihuomista', 'value': 2 },
	    { 'name': 'sign',  'src': 'sitten|aiemmin', 'value': -1 },
	    { 'name': 'sign',  'src': 'päästä|kuluttua|myöhemmin', 'value': 1 },
	    { 'name': 'edge',  'src': 'lopussa', 'value': 2 },
	    { 'name': 'edge',  'src': 'ensimmäinen|ensimmäisenä', 'value': -2 },
	    { 'name': 'shift', 'src': 'edel:linen|lisenä', 'value': -1 },
	    { 'name': 'shift', 'src': 'viime', 'value': -1 },
	    { 'name': 'shift', 'src': 'tä:llä|ssä|nä|mä', 'value': 0 },
	    { 'name': 'shift', 'src': 'seuraava|seuraavana|tuleva|tulevana|ensi', 'value': 1 }
	  ],
	  'parse': [
	    '{months} {year?}',
	    '{shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{shift?} {day|weekday}',
	    '{weekday?},? {date}\\.? {months?}\\.? {year?}'
	  ],
	  'timeFrontParse': [
	    '{shift?} {day|weekday}',
	    '{num?} {unit} {sign}',
	    '{weekday?},? {date}\\.? {months?}\\.? {year?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "fi" locale.

/***/ },
/* 422 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * French locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('fr')
	 *
	 */
	addLocale('fr', {
	  'plural': true,
	  'units': 'milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|née|nee',
	  'months': 'janv:ier|,févr:ier|+fevr:ier|,mars,avr:il|,mai,juin,juil:let|,août,sept:embre|,oct:obre|,nov:embre|,déc:embre|+dec:embre|',
	  'weekdays': 'dim:anche|,lun:di|,mar:di|,mer:credi|,jeu:di|,ven:dredi|,sam:edi|',
	  'numerals': 'zéro,un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix',
	  'tokens': "l'|la|le,er",
	  'short':  '{dd}/{MM}/{yyyy}',
	  'medium': '{d} {month} {yyyy}',
	  'long':   '{d} {month} {yyyy} {time}',
	  'full':   '{weekday} {d} {month} {yyyy} {time}',
	  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
	  'time':   '{H}:{mm}',
	  'past':   '{sign} {num} {unit}',
	  'future': '{sign} {num} {unit}',
	  'duration': '{num} {unit}',
	  'timeMarkers': 'à',
	  'ampm': 'am,pm',
	  'modifiers': [
	    { 'name': 'day', 'src': 'hier', 'value': -1 },
	    { 'name': 'day', 'src': "aujourd'hui", 'value': 0 },
	    { 'name': 'day', 'src': 'demain', 'value': 1 },
	    { 'name': 'sign', 'src': 'il y a', 'value': -1 },
	    { 'name': 'sign', 'src': "dans|d'ici", 'value': 1 },
	    { 'name': 'shift', 'src': 'derni:èr|er|ère|ere', 'value': -1 },
	    { 'name': 'shift', 'src': 'prochain:|e', 'value': 1 }
	  ],
	  'parse': [
	    '{months} {year?}',
	    '{sign} {num} {unit}',
	    '{0?} {unit:5-7} {shift}'
	  ],
	  'timeParse': [
	    '{day|weekday} {shift?}',
	    '{weekday?},? {0?} {date}{1?} {months}\\.? {year?}'
	  ],
	  'timeFrontParse': [
	    '{0?} {weekday} {shift}',
	    '{weekday?},? {0?} {date}{1?} {months}\\.? {year?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "fr" locale.

/***/ },
/* 423 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Italian locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('it')
	 *
	 */
	addLocale('it', {
	  'plural': true,
	  'units': 'millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i',
	  'months': 'gen:naio|,feb:braio|,mar:zo|,apr:ile|,mag:gio|,giu:gno|,lug:lio|,ago:sto|,set:tembre|,ott:obre|,nov:embre|,dic:embre|',
	  'weekdays': 'dom:enica|,lun:edì||edi,mar:tedì||tedi,mer:coledì||coledi,gio:vedì||vedi,ven:erdì||erdi,sab:ato|',
	  'numerals': "zero,un:|a|o|',due,tre,quattro,cinque,sei,sette,otto,nove,dieci",
	  'tokens': "l'|la|il",
	  'short': '{dd}/{MM}/{yyyy}',
	  'medium': '{d} {month} {yyyy}',
	  'long': '{d} {month} {yyyy} {time}',
	  'full': '{weekday}, {d} {month} {yyyy} {time}',
	  'stamp': '{dow} {d} {mon} {yyyy} {time}',
	  'time': '{H}:{mm}',
	  'past': '{num} {unit} {sign}',
	  'future': '{num} {unit} {sign}',
	  'duration': '{num} {unit}',
	  'timeMarkers': 'alle',
	  'ampm': 'am,pm',
	  'modifiers': [
	    { 'name': 'day', 'src': 'ieri', 'value': -1 },
	    { 'name': 'day', 'src': 'oggi', 'value': 0 },
	    { 'name': 'day', 'src': 'domani', 'value': 1 },
	    { 'name': 'day', 'src': 'dopodomani', 'value': 2 },
	    { 'name': 'sign', 'src': 'fa', 'value': -1 },
	    { 'name': 'sign', 'src': 'da adesso', 'value': 1 },
	    { 'name': 'shift', 'src': 'scors:o|a', 'value': -1 },
	    { 'name': 'shift', 'src': 'prossim:o|a', 'value': 1 }
	  ],
	  'parse': [
	    '{months} {year?}',
	    '{num} {unit} {sign}',
	    '{0?} {unit:5-7} {shift}',
	    '{0?} {shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{shift?} {day|weekday}',
	    '{weekday?},? {date} {months?}\\.? {year?}'
	  ],
	  'timeFrontParse': [
	    '{shift?} {day|weekday}',
	    '{weekday?},? {date} {months?}\\.? {year?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "it" locale.

/***/ },
/* 424 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Japanese locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('ja')
	 *
	 */
	addLocale('ja', {
	  'ampmFront': true,
	  'numeralUnits': true,
	  'allowsFullWidth': true,
	  'timeMarkerOptional': true,
	  'firstDayOfWeek': 0,
	  'firstDayOfWeekYear': 1,
	  'units': 'ミリ秒,秒,分,時間,日,週間|週,ヶ月|ヵ月|月,年|年度',
	  'weekdays': '日:曜日||曜,月:曜日||曜,火:曜日||曜,水:曜日||曜,木:曜日||曜,金:曜日||曜,土:曜日||曜',
	  'numerals': '〇,一,二,三,四,五,六,七,八,九',
	  'placeholders': '十,百,千,万',
	  'timeSuffixes': ',秒,分,時,日,,月,年度?',
	  'short':  '{yyyy}/{MM}/{dd}',
	  'medium': '{yyyy}年{M}月{d}日',
	  'long':   '{yyyy}年{M}月{d}日{time}',
	  'full':   '{yyyy}年{M}月{d}日{time} {weekday}',
	  'stamp':  '{yyyy}年{M}月{d}日 {H}:{mm} {dow}',
	  'time':   '{tt}{h}時{mm}分',
	  'past':   '{num}{unit}{sign}',
	  'future': '{num}{unit}{sign}',
	  'duration': '{num}{unit}',
	  'ampm': '午前,午後',
	  'modifiers': [
	    { 'name': 'day', 'src': '一昨々日|前々々日', 'value': -3 },
	    { 'name': 'day', 'src': '一昨日|おととい|前々日', 'value': -2 },
	    { 'name': 'day', 'src': '昨日|前日', 'value': -1 },
	    { 'name': 'day', 'src': '今日|当日|本日', 'value': 0 },
	    { 'name': 'day', 'src': '明日|翌日|次日', 'value': 1 },
	    { 'name': 'day', 'src': '明後日|翌々日', 'value': 2 },
	    { 'name': 'day', 'src': '明々後日|翌々々日', 'value': 3 },
	    { 'name': 'sign', 'src': '前', 'value': -1 },
	    { 'name': 'sign', 'src': '後', 'value': 1 },
	    { 'name': 'edge', 'src': '始|初日|頭', 'value': -2 },
	    { 'name': 'edge', 'src': '末|尻', 'value': 2 },
	    { 'name': 'edge', 'src': '末日', 'value': 1 },
	    { 'name': 'shift', 'src': '一昨々|前々々', 'value': -3 },
	    { 'name': 'shift', 'src': '一昨|前々|先々', 'value': -2 },
	    { 'name': 'shift', 'src': '先|昨|去|前', 'value': -1 },
	    { 'name': 'shift', 'src': '今|本|当', 'value':  0 },
	    { 'name': 'shift', 'src': '来|明|翌|次', 'value':  1 },
	    { 'name': 'shift', 'src': '明後|翌々|次々|再来|さ来', 'value': 2 },
	    { 'name': 'shift', 'src': '明々後|翌々々', 'value':  3 }
	  ],
	  'parse': [
	    '{month}{edge}',
	    '{num}{unit}{sign}',
	    '{year?}{month}',
	    '{year}'
	  ],
	  'timeParse': [
	    '{day|weekday}',
	    '{shift}{unit:5}{weekday?}',
	    '{shift}{unit:7}{month}{edge}',
	    '{shift}{unit:7}{month?}{date?}',
	    '{shift}{unit:6}{edge?}{date?}',
	    '{year?}{month?}{date}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "ja" locale.

/***/ },
/* 425 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Korean locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('ko')
	 *
	 */
	addLocale('ko', {
	  'ampmFront': true,
	  'numeralUnits': true,
	  'units': '밀리초,초,분,시간,일,주,개월|달,년|해',
	  'weekdays': '일:요일|,월:요일|,화:요일|,수:요일|,목:요일|,금:요일|,토:요일|',
	  'numerals': '영|제로,일|한,이,삼,사,오,육,칠,팔,구,십',
	  'short':  '{yyyy}.{MM}.{dd}',
	  'medium': '{yyyy}년 {M}월 {d}일',
	  'long':   '{yyyy}년 {M}월 {d}일 {time}',
	  'full':   '{yyyy}년 {M}월 {d}일 {weekday} {time}',
	  'stamp':  '{yyyy}년 {M}월 {d}일 {H}:{mm} {dow}',
	  'time':   '{tt} {h}시 {mm}분',
	  'past':   '{num}{unit} {sign}',
	  'future': '{num}{unit} {sign}',
	  'duration': '{num}{unit}',
	  'timeSuffixes': ',초,분,시,일,,월,년',
	  'ampm': '오전,오후',
	  'modifiers': [
	    { 'name': 'day', 'src': '그저께', 'value': -2 },
	    { 'name': 'day', 'src': '어제', 'value': -1 },
	    { 'name': 'day', 'src': '오늘', 'value': 0 },
	    { 'name': 'day', 'src': '내일', 'value': 1 },
	    { 'name': 'day', 'src': '모레', 'value': 2 },
	    { 'name': 'sign', 'src': '전', 'value': -1 },
	    { 'name': 'sign', 'src': '후', 'value':  1 },
	    { 'name': 'shift', 'src': '지난|작', 'value': -1 },
	    { 'name': 'shift', 'src': '이번|올', 'value': 0 },
	    { 'name': 'shift', 'src': '다음|내', 'value': 1 }
	  ],
	  'parse': [
	    '{num}{unit} {sign}',
	    '{shift?} {unit:5-7}',
	    '{year?} {month}',
	    '{year}'
	  ],
	  'timeParse': [
	    '{day|weekday}',
	    '{shift} {unit:5?} {weekday}',
	    '{year?} {month?} {date} {weekday?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "ko" locale.

/***/ },
/* 426 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Dutch locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('nl')
	 *
	 */
	addLocale('nl', {
	  'plural': true,
	  'units': 'milliseconde:|n,seconde:|n,minu:ut|ten,uur,dag:|en,we:ek|ken,maand:|en,jaar',
	  'months': 'jan:uari|,feb:ruari|,maart|mrt,apr:il|,mei,jun:i|,jul:i|,aug:ustus|,sep:tember|,okt:ober|,nov:ember|,dec:ember|',
	  'weekdays': 'zondag|zo,maandag|ma,dinsdag|di,woensdag|wo|woe,donderdag|do,vrijdag|vr|vrij,zaterdag|za',
	  'numerals': 'nul,een,twee,drie,vier,vijf,zes,zeven,acht,negen,tien',
	  'short':  '{dd}-{MM}-{yyyy}',
	  'medium': '{d} {month} {yyyy}',
	  'long':   '{d} {Month} {yyyy} {time}',
	  'full':   '{weekday} {d} {Month} {yyyy} {time}',
	  'stamp':  '{dow} {d} {Mon} {yyyy} {time}',
	  'time':   '{H}:{mm}',
	  'past':   '{num} {unit} {sign}',
	  'future': '{num} {unit} {sign}',
	  'duration': '{num} {unit}',
	  'timeMarkers': "'s,om",
	  'modifiers': [
	    { 'name': 'day', 'src': 'gisteren', 'value': -1 },
	    { 'name': 'day', 'src': 'vandaag', 'value': 0 },
	    { 'name': 'day', 'src': 'morgen', 'value': 1 },
	    { 'name': 'day', 'src': 'overmorgen', 'value': 2 },
	    { 'name': 'sign', 'src': 'geleden', 'value': -1 },
	    { 'name': 'sign', 'src': 'vanaf nu', 'value': 1 },
	    { 'name': 'shift', 'src': 'laatste|vorige|afgelopen', 'value': -1 },
	    { 'name': 'shift', 'src': 'volgend:|e', 'value': 1 }
	  ],
	  'parse': [
	    '{months} {year?}',
	    '{num} {unit} {sign}',
	    '{0?} {unit:5-7} {shift}',
	    '{0?} {shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{shift?} {day|weekday}',
	    '{weekday?},? {date} {months?}\\.? {year?}'
	  ],
	  'timeFrontParse': [
	    '{shift?} {day|weekday}',
	    '{weekday?},? {date} {months?}\\.? {year?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "nl" locale.

/***/ },
/* 427 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Norwegian locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('no')
	 *
	 */
	addLocale('no', {
	  'plural': true,
	  'units': 'millisekund:|er,sekund:|er,minutt:|er,tim:e|er,dag:|er,uk:e|er|en,måned:|er|en+maaned:|er|en,år:||et+aar:||et',
	  'months': 'januar,februar,mars,april,mai,juni,juli,august,september,oktober,november,desember',
	  'weekdays': 'søndag|sondag,mandag,tirsdag,onsdag,torsdag,fredag,lørdag|lordag',
	  'numerals': 'en|et,to,tre,fire,fem,seks,sju|syv,åtte,ni,ti',
	  'tokens': 'den,for',
	  'articles': 'den',
	  'short':'d. {d}. {month} {yyyy}',
	  'long': 'den {d}. {month} {yyyy} {H}:{mm}',
	  'full': '{Weekday} den {d}. {month} {yyyy} {H}:{mm}:{ss}',
	  'past': '{num} {unit} {sign}',
	  'future': '{sign} {num} {unit}',
	  'duration': '{num} {unit}',
	  'ampm': 'am,pm',
	  'modifiers': [
	    { 'name': 'day', 'src': 'forgårs|i forgårs|forgaars|i forgaars', 'value': -2 },
	    { 'name': 'day', 'src': 'i går|igår|i gaar|igaar', 'value': -1 },
	    { 'name': 'day', 'src': 'i dag|idag', 'value': 0 },
	    { 'name': 'day', 'src': 'i morgen|imorgen', 'value': 1 },
	    { 'name': 'day', 'src': 'overimorgen|overmorgen|over i morgen', 'value': 2 },
	    { 'name': 'sign', 'src': 'siden', 'value': -1 },
	    { 'name': 'sign', 'src': 'om', 'value':  1 },
	    { 'name': 'shift', 'src': 'i siste|siste', 'value': -1 },
	    { 'name': 'shift', 'src': 'denne', 'value': 0 },
	    { 'name': 'shift', 'src': 'neste', 'value': 1 }
	  ],
	  'parse': [
	    '{num} {unit} {sign}',
	    '{sign} {num} {unit}',
	    '{1?} {num} {unit} {sign}',
	    '{shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{date} {month}',
	    '{shift} {weekday}',
	    '{0?} {weekday?},? {date?} {month}\\.? {year}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "no" locale.

/***/ },
/* 428 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Polish locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('pl')
	 *
	 */
	addLocale('pl', {
	  'plural': true,
	  'units': 'milisekund:a|y|,sekund:a|y|,minut:a|y|,godzin:a|y|,dzień|dni|dni,tydzień|tygodnie|tygodni,miesiąc|miesiące|miesięcy,rok|lata|lat',
	  'months': 'sty:cznia||czeń,lut:ego||y,mar:ca||zec,kwi:etnia||ecień,maj:a|,cze:rwca||rwiec,lip:ca||iec,sie:rpnia||rpień,wrz:eśnia||esień,paź:dziernika||dziernik,lis:topada||topad,gru:dnia||dzień',
	  'weekdays': 'nie:dziela||dzielę,pon:iedziałek|,wt:orek|,śr:oda||odę,czw:artek|,piątek|pt,sobota|sb|sobotę',
	  'numerals': 'zero,jeden|jedną,dwa|dwie,trzy,cztery,pięć,sześć,siedem,osiem,dziewięć,dziesięć',
	  'tokens': 'w|we,roku',
	  'short': '{dd}.{MM}.{yyyy}',
	  'medium': '{d} {month} {yyyy}',
	  'long':  '{d} {month} {yyyy} {time}',
	  'full' : '{weekday}, {d} {month} {yyyy} {time}',
	  'stamp': '{dow} {d} {mon} {yyyy} {time}',
	  'time': '{H}:{mm}',
	  'timeMarkers': 'o',
	  'ampm': 'am,pm',
	  'modifiers': [
	    { 'name': 'day', 'src': 'przedwczoraj', 'value': -2 },
	    { 'name': 'day', 'src': 'wczoraj', 'value': -1 },
	    { 'name': 'day', 'src': 'dzisiaj|dziś', 'value': 0 },
	    { 'name': 'day', 'src': 'jutro', 'value': 1 },
	    { 'name': 'day', 'src': 'pojutrze', 'value': 2 },
	    { 'name': 'sign', 'src': 'temu|przed', 'value': -1 },
	    { 'name': 'sign', 'src': 'za', 'value': 1 },
	    { 'name': 'shift', 'src': 'zeszły|zeszła|ostatni|ostatnia', 'value': -1 },
	    { 'name': 'shift', 'src': 'następny|następna|następnego|przyszły|przyszła|przyszłego', 'value': 1 }
	  ],
	  'relative': function (num, unit, ms, format) {
	    // special cases for relative days
	    var DAY = 4;
	    if (unit === DAY) {
	      if (num === 1 && format === 'past')   return 'wczoraj';
	      if (num === 1 && format === 'future') return 'jutro';
	      if (num === 2 && format === 'past')   return 'przedwczoraj';
	      if (num === 2 && format === 'future') return 'pojutrze';
	    }
	
	    var mult;
	    var last  = +num.toFixed(0).slice(-1);
	    var last2 = +num.toFixed(0).slice(-2);
	    switch (true) {
	      case num === 1:                  mult = 0; break;
	      case last2 >= 12 && last2 <= 14: mult = 2; break;
	      case last  >=  2 && last  <=  4: mult = 1; break;
	      default:                         mult = 2;
	    }
	    var text = this['units'][(mult * 8) + unit];
	    var prefix = num + ' ';
	
	    // changing to accusative case for 'past' and 'future' formats
	    // (only singular feminine unit words are different in accusative, each of which ends with 'a')
	    if ((format === 'past' || format === 'future') && num === 1) {
	      text = text.replace(/a$/, 'ę');
	    }
	
	    text = prefix + text;
	    switch (format) {
	      case 'duration': return text;
	      case 'past':     return text + ' temu';
	      case 'future':   return 'za ' + text;
	    }
	  },
	  'parse': [
	    '{num} {unit} {sign}',
	    '{sign} {num} {unit}',
	    '{months} {year?}',
	    '{shift} {unit:5-7}',
	    '{0} {shift?} {weekday}'
	  ],
	  'timeFrontParse': [
	    '{day|weekday}',
	    '{date} {months} {year?} {1?}',
	    '{0?} {shift?} {weekday}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "pl" locale.

/***/ },
/* 429 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Portuguese locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('pt')
	 *
	 */
	addLocale('pt', {
	  'plural': true,
	  'units': 'milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,mês|mêses|mes|meses,ano:|s',
	  'months': 'jan:eiro|,fev:ereiro|,mar:ço|,abr:il|,mai:o|,jun:ho|,jul:ho|,ago:sto|,set:embro|,out:ubro|,nov:embro|,dez:embro|',
	  'weekdays': 'dom:ingo|,seg:unda-feira|,ter:ça-feira|,qua:rta-feira|,qui:nta-feira|,sex:ta-feira|,sáb:ado||ado',
	  'numerals': 'zero,um:|a,dois|duas,três|tres,quatro,cinco,seis,sete,oito,nove,dez',
	  'tokens': 'a,de',
	  'short':  '{dd}/{MM}/{yyyy}',
	  'medium': '{d} de {Month} de {yyyy}',
	  'long':   '{d} de {Month} de {yyyy} {time}',
	  'full':   '{Weekday}, {d} de {Month} de {yyyy} {time}',
	  'stamp':  '{Dow} {d} {Mon} {yyyy} {time}',
	  'time':   '{H}:{mm}',
	  'past':   '{num} {unit} {sign}',
	  'future': '{sign} {num} {unit}',
	  'duration': '{num} {unit}',
	  'timeMarkers': 'às',
	  'ampm': 'am,pm',
	  'modifiers': [
	    { 'name': 'day', 'src': 'anteontem', 'value': -2 },
	    { 'name': 'day', 'src': 'ontem', 'value': -1 },
	    { 'name': 'day', 'src': 'hoje', 'value': 0 },
	    { 'name': 'day', 'src': 'amanh:ã|a', 'value': 1 },
	    { 'name': 'sign', 'src': 'atrás|atras|há|ha', 'value': -1 },
	    { 'name': 'sign', 'src': 'daqui a', 'value': 1 },
	    { 'name': 'shift', 'src': 'passad:o|a', 'value': -1 },
	    { 'name': 'shift', 'src': 'próximo|próxima|proximo|proxima', 'value': 1 }
	  ],
	  'parse': [
	    '{months} {1?} {year?}',
	    '{num} {unit} {sign}',
	    '{sign} {num} {unit}',
	    '{0?} {unit:5-7} {shift}',
	    '{0?} {shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{shift?} {day|weekday}',
	    '{0?} {shift} {weekday}',
	    '{date} {1?} {months?} {1?} {year?}'
	  ],
	  'timeFrontParse': [
	    '{shift?} {day|weekday}',
	    '{date} {1?} {months?} {1?} {year?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "pt" locale.

/***/ },
/* 430 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Russian locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('ru')
	 *
	 */
	addLocale('ru', {
	  'firstDayOfWeekYear': 1,
	  'units': 'миллисекунд:а|у|ы|,секунд:а|у|ы|,минут:а|у|ы|,час:||а|ов,день|день|дня|дней,недел:я|ю|и|ь|е,месяц:||а|ев|е,год|год|года|лет|году',
	  'months': 'янв:аря||.|арь,фев:раля||р.|раль,мар:та||т,апр:еля||.|ель,мая|май,июн:я||ь,июл:я||ь,авг:уста||.|уст,сен:тября||т.|тябрь,окт:ября||.|ябрь,ноя:бря||брь,дек:абря||.|абрь',
	  'weekdays': 'воскресенье|вс,понедельник|пн,вторник|вт,среда|ср,четверг|чт,пятница|пт,суббота|сб',
	  'numerals': 'ноль,од:ин|ну,дв:а|е,три,четыре,пять,шесть,семь,восемь,девять,десять',
	  'tokens': 'в|на,г\\.?(?:ода)?',
	  'short':  '{dd}.{MM}.{yyyy}',
	  'medium': '{d} {month} {yyyy} г.',
	  'long':   '{d} {month} {yyyy} г., {time}',
	  'full':   '{weekday}, {d} {month} {yyyy} г., {time}',
	  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
	  'time':   '{H}:{mm}',
	  'timeMarkers': 'в',
	  'ampm': ' утра, вечера',
	  'modifiers': [
	    { 'name': 'day', 'src': 'позавчера', 'value': -2 },
	    { 'name': 'day', 'src': 'вчера', 'value': -1 },
	    { 'name': 'day', 'src': 'сегодня', 'value': 0 },
	    { 'name': 'day', 'src': 'завтра', 'value': 1 },
	    { 'name': 'day', 'src': 'послезавтра', 'value': 2 },
	    { 'name': 'sign', 'src': 'назад', 'value': -1 },
	    { 'name': 'sign', 'src': 'через', 'value': 1 },
	    { 'name': 'shift', 'src': 'прошл:ый|ой|ом', 'value': -1 },
	    { 'name': 'shift', 'src': 'следующ:ий|ей|ем', 'value': 1 }
	  ],
	  'relative': function(num, unit, ms, format) {
	    var numberWithUnit, last = num.toString().slice(-1), mult;
	    switch(true) {
	      case num >= 11 && num <= 15: mult = 3; break;
	      case last == 1: mult = 1; break;
	      case last >= 2 && last <= 4: mult = 2; break;
	      default: mult = 3;
	    }
	    numberWithUnit = num + ' ' + this['units'][(mult * 8) + unit];
	    switch(format) {
	      case 'duration':  return numberWithUnit;
	      case 'past':      return numberWithUnit + ' назад';
	      case 'future':    return 'через ' + numberWithUnit;
	    }
	  },
	  'parse': [
	    '{num} {unit} {sign}',
	    '{sign} {num} {unit}',
	    '{months} {year?}',
	    '{0?} {shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{day|weekday}',
	    '{0?} {shift} {weekday}',
	    '{date} {months?} {year?} {1?}'
	  ],
	  'timeFrontParse': [
	    '{0?} {shift} {weekday}',
	    '{date} {months?} {year?} {1?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "ru" locale.

/***/ },
/* 431 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Swedish locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('sv')
	 *
	 */
	addLocale('sv', {
	  'plural': true,
	  'units': 'millisekund:|er,sekund:|er,minut:|er,timm:e|ar,dag:|ar,veck:a|or|an,månad:|er|en+manad:|er|en,år:||et+ar:||et',
	  'months': 'jan:uari|,feb:ruari|,mar:s|,apr:il|,maj,jun:i|,jul:i|,aug:usti|,sep:tember|,okt:ober|,nov:ember|,dec:ember|',
	  'weekdays': 'sön:dag|+son:dag|,mån:dag||dagen+man:dag||dagen,tis:dag|,ons:dag|,tor:sdag|,fre:dag|,lör:dag||dag',
	  'numerals': 'noll,en|ett,två|tva,tre,fyra,fem,sex,sju,åtta|atta,nio,tio',
	  'tokens': 'den,för|for',
	  'articles': 'den',
	  'short':  '{yyyy}-{MM}-{dd}',
	  'medium': '{d} {month} {yyyy}',
	  'long':   '{d} {month} {yyyy} {time}',
	  'full':   '{weekday} {d} {month} {yyyy} {time}',
	  'stamp':  '{dow} {d} {mon} {yyyy} {time}',
	  'time':   '{H}:{mm}',
	  'past':   '{num} {unit} {sign}',
	  'future': '{sign} {num} {unit}',
	  'duration': '{num} {unit}',
	  'ampm': 'am,pm',
	  'modifiers': [
	    { 'name': 'day', 'src': 'förrgår|i förrgår|iförrgår|forrgar|i forrgar|iforrgar', 'value': -2 },
	    { 'name': 'day', 'src': 'går|i går|igår|gar|i gar|igar', 'value': -1 },
	    { 'name': 'day', 'src': 'dag|i dag|idag', 'value': 0 },
	    { 'name': 'day', 'src': 'morgon|i morgon|imorgon', 'value': 1 },
	    { 'name': 'day', 'src': 'över morgon|övermorgon|i över morgon|i övermorgon|iövermorgon|over morgon|overmorgon|i over morgon|i overmorgon|iovermorgon', 'value': 2 },
	    { 'name': 'sign', 'src': 'sedan|sen', 'value': -1 },
	    { 'name': 'sign', 'src': 'om', 'value':  1 },
	    { 'name': 'shift', 'src': 'i förra|förra|i forra|forra', 'value': -1 },
	    { 'name': 'shift', 'src': 'denna', 'value': 0 },
	    { 'name': 'shift', 'src': 'nästa|nasta', 'value': 1 }
	  ],
	  'parse': [
	    '{months} {year?}',
	    '{num} {unit} {sign}',
	    '{sign} {num} {unit}',
	    '{1?} {num} {unit} {sign}',
	    '{shift} {unit:5-7}'
	  ],
	  'timeParse': [
	    '{day|weekday}',
	    '{shift} {weekday}',
	    '{0?} {weekday?},? {date} {months?}\\.? {year?}'
	  ],
	  'timeFrontParse': [
	    '{day|weekday}',
	    '{shift} {weekday}',
	    '{0?} {weekday?},? {date} {months?}\\.? {year?}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "sv" locale.

/***/ },
/* 432 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Simplified Chinese locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('zh-CN')
	 *
	 */
	addLocale('zh-CN', {
	  'ampmFront': true,
	  'numeralUnits': true,
	  'allowsFullWidth': true,
	  'timeMarkerOptional': true,
	  'units': '毫秒,秒钟,分钟,小时,天,个星期|周,个月,年',
	  'weekdays': '星期日|日|周日|星期天,星期一|一|周一,星期二|二|周二,星期三|三|周三,星期四|四|周四,星期五|五|周五,星期六|六|周六',
	  'numerals': '〇,一,二,三,四,五,六,七,八,九',
	  'placeholders': '十,百,千,万',
	  'short':  '{yyyy}-{MM}-{dd}',
	  'medium': '{yyyy}年{M}月{d}日',
	  'long':   '{yyyy}年{M}月{d}日{time}',
	  'full':   '{yyyy}年{M}月{d}日{weekday}{time}',
	  'stamp':  '{yyyy}年{M}月{d}日{H}:{mm}{dow}',
	  'time':   '{tt}{h}点{mm}分',
	  'past':   '{num}{unit}{sign}',
	  'future': '{num}{unit}{sign}',
	  'duration': '{num}{unit}',
	  'timeSuffixes': ',秒,分钟?,点|时,日|号,,月,年',
	  'ampm': '上午,下午',
	  'modifiers': [
	    { 'name': 'day', 'src': '大前天', 'value': -3 },
	    { 'name': 'day', 'src': '前天', 'value': -2 },
	    { 'name': 'day', 'src': '昨天', 'value': -1 },
	    { 'name': 'day', 'src': '今天', 'value': 0 },
	    { 'name': 'day', 'src': '明天', 'value': 1 },
	    { 'name': 'day', 'src': '后天', 'value': 2 },
	    { 'name': 'day', 'src': '大后天', 'value': 3 },
	    { 'name': 'sign', 'src': '前', 'value': -1 },
	    { 'name': 'sign', 'src': '后', 'value':  1 },
	    { 'name': 'shift', 'src': '上|去', 'value': -1 },
	    { 'name': 'shift', 'src': '这', 'value':  0 },
	    { 'name': 'shift', 'src': '下|明', 'value':  1 }
	  ],
	  'parse': [
	    '{num}{unit}{sign}',
	    '{shift}{unit:5-7}',
	    '{year?}{month}',
	    '{year}'
	  ],
	  'timeParse': [
	    '{day|weekday}',
	    '{shift}{weekday}',
	    '{year?}{month?}{date}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "zh-CN" locale.

/***/ },
/* 433 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addLocale = __webpack_require__(32);
	
	/*
	 * Traditional Chinese locale definition.
	 * See the readme for customization and more information.
	 * To set this locale globally:
	 *
	 * Sugar.Date.setLocale('zh-TW')
	 *
	 */
	addLocale('zh-TW', {
	  'ampmFront': true,
	  'numeralUnits': true,
	  'allowsFullWidth': true,
	  'timeMarkerOptional': true,
	  'units': '毫秒,秒鐘,分鐘,小時,天,個星期|週,個月,年',
	  'weekdays': '星期日|日|週日|星期天,星期一|一|週一,星期二|二|週二,星期三|三|週三,星期四|四|週四,星期五|五|週五,星期六|六|週六',
	  'numerals': '〇,一,二,三,四,五,六,七,八,九',
	  'placeholders': '十,百,千,万',
	  'short':  '{yyyy}/{MM}/{dd}',
	  'medium': '{yyyy}年{M}月{d}日',
	  'long':   '{yyyy}年{M}月{d}日{time}',
	  'full':   '{yyyy}年{M}月{d}日{weekday}{time}',
	  'stamp':  '{yyyy}年{M}月{d}日{H}:{mm}{dow}',
	  'time':   '{tt}{h}點{mm}分',
	  'past':   '{num}{unit}{sign}',
	  'future': '{num}{unit}{sign}',
	  'duration': '{num}{unit}',
	  'timeSuffixes': ',秒,分鐘?,點|時,日|號,,月,年',
	  'ampm': '上午,下午',
	  'modifiers': [
	    { 'name': 'day', 'src': '大前天', 'value': -3 },
	    { 'name': 'day', 'src': '前天', 'value': -2 },
	    { 'name': 'day', 'src': '昨天', 'value': -1 },
	    { 'name': 'day', 'src': '今天', 'value': 0 },
	    { 'name': 'day', 'src': '明天', 'value': 1 },
	    { 'name': 'day', 'src': '後天', 'value': 2 },
	    { 'name': 'day', 'src': '大後天', 'value': 3 },
	    { 'name': 'sign', 'src': '前', 'value': -1 },
	    { 'name': 'sign', 'src': '後', 'value': 1 },
	    { 'name': 'shift', 'src': '上|去', 'value': -1 },
	    { 'name': 'shift', 'src': '這', 'value':  0 },
	    { 'name': 'shift', 'src': '下|明', 'value':  1 }
	  ],
	  'parse': [
	    '{num}{unit}{sign}',
	    '{shift}{unit:5-7}',
	    '{year?}{month}',
	    '{year}'
	  ],
	  'timeParse': [
	    '{day|weekday}',
	    '{shift}{weekday}',
	    '{year?}{month?}{date}'
	  ]
	});
	
	
	// This package does not export anything as it is
	// simply registering the "zh-TW" locale.

/***/ }
/******/ ])
});
;
//# sourceMappingURL=tablefilter.js.map