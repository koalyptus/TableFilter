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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _event = __webpack_require__(1);
	
	var _dom = __webpack_require__(3);
	
	var _string = __webpack_require__(5);
	
	var _types = __webpack_require__(4);
	
	var _date = __webpack_require__(6);
	
	var _helpers = __webpack_require__(7);
	
	var _root = __webpack_require__(2);
	
	var _emitter = __webpack_require__(8);
	
	var _gridLayout = __webpack_require__(9);
	
	var _loader = __webpack_require__(12);
	
	var _highlightKeywords = __webpack_require__(13);
	
	var _popupFilter = __webpack_require__(14);
	
	var _dropdown = __webpack_require__(15);
	
	var _checkList = __webpack_require__(18);
	
	var _rowsCounter = __webpack_require__(19);
	
	var _statusBar = __webpack_require__(20);
	
	var _paging = __webpack_require__(21);
	
	var _clearButton = __webpack_require__(22);
	
	var _help = __webpack_require__(23);
	
	var _alternateRows = __webpack_require__(24);
	
	var _noResults = __webpack_require__(25);
	
	var _state = __webpack_require__(26);
	
	var _const = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var doc = _root.root.document;
	
	var TableFilter = exports.TableFilter = function () {
	
	    /**
	     * TableFilter object constructor
	     * requires `table` or `id` arguments, `row` and `configuration` optional
	     * @param {DOMElement} table Table DOM element
	     * @param {String} id Table id
	     * @param {Number} row index indicating the 1st row
	     * @param {Object} configuration object
	     */
	
	    function TableFilter() {
	        var _this = this;
	
	        _classCallCheck(this, TableFilter);
	
	        this.id = null;
	        this.version = '0.2.39';
	        this.year = new Date().getFullYear();
	        this.tbl = null;
	        this.startRow = null;
	        this.refRow = null;
	        this.headersRow = null;
	        this.cfg = {};
	        this.nbFilterableRows = 0;
	        this.nbCells = null;
	
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
	                _this.startRow = arg;
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
	        this.refRow = this.startRow === null ? 2 : this.startRow + 1;
	        try {
	            this.nbCells = this.getCellsNb(this.refRow);
	        } catch (e) {
	            this.nbCells = this.getCellsNb(0);
	        }
	
	        //default script base path
	        this.basePath = f.base_path || 'tablefilter/';
	
	        /*** filters' grid properties ***/
	        //enables/disables filter grid
	        this.fltGrid = f.grid === false ? false : true;
	
	        //enables/disables grid layout (fixed headers)
	        this.gridLayout = Boolean(f.grid_layout);
	
	        this.filtersRowIndex = isNaN(f.filters_row_index) ? 0 : f.filters_row_index;
	        this.headersRow = isNaN(f.headers_row_index) ? this.filtersRowIndex === 0 ? 1 : 0 : f.headers_row_index;
	
	        //defines tag of the cells containing filters (td/th)
	        this.fltCellTag = (0, _types.isString)(f.filters_cell_tag) ? f.filters_cell_tag : _const.CELL_TAG;
	
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
	        this.hasColWidths = (0, _types.isArray)(f.col_widths);
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
	        this.onBeforeFilter = (0, _types.isFn)(f.on_before_filter) ? f.on_before_filter : null;
	        //calls function after filtering
	        this.onAfterFilter = (0, _types.isFn)(f.on_after_filter) ? f.on_after_filter : null;
	        //enables/disables case sensitivity
	        this.caseSensitive = Boolean(f.case_sensitive);
	        //has exact match per column
	        this.hasExactMatchByCol = (0, _types.isArray)(f.columns_exact_match);
	        this.exactMatchByCol = this.hasExactMatchByCol ? f.columns_exact_match : [];
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
	        this.onFiltersLoaded = (0, _types.isFn)(f.on_filters_loaded) ? f.on_filters_loaded : null;
	        //enables/disables single filter search
	        this.singleSearchFlt = Boolean(f.single_filter);
	        //calls function after row is validated
	        this.onRowValidated = (0, _types.isFn)(f.on_row_validated) ? f.on_row_validated : null;
	        //array defining columns for customCellData event
	        this.customCellDataCols = f.custom_cell_data_cols ? f.custom_cell_data_cols : [];
	        //calls custom function for retrieving cell data
	        this.customCellData = (0, _types.isFn)(f.custom_cell_data) ? f.custom_cell_data : null;
	        //input watermark text array
	        this.watermark = f.watermark || '';
	        this.isWatermarkArray = (0, _types.isArray)(this.watermark);
	        //id of toolbar container element
	        this.toolBarTgtId = f.toolbar_target_id || null;
	        //enables/disables help div
	        this.help = (0, _types.isUndef)(f.help_instructions) ? undefined : Boolean(f.help_instructions);
	        //popup filters
	        this.popupFilters = Boolean(f.popup_filters);
	        //active columns color
	        this.markActiveColumns = Boolean(f.mark_active_columns);
	        //defines css class for active column header
	        this.activeColumnsCssClass = f.active_columns_css_class || 'activeHeader';
	        //calls function before active column header is marked
	        this.onBeforeActiveColumn = (0, _types.isFn)(f.on_before_active_column) ? f.on_before_active_column : null;
	        //calls function after active column header is marked
	        this.onAfterActiveColumn = (0, _types.isFn)(f.on_after_active_column) ? f.on_after_active_column : null;
	
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
	        this.hasCustomOptions = (0, _types.isObj)(f.custom_options);
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
	        this.btnCssClass = f.btn_css_class || (!this.enableIcons ? 'btnflt' : 'btnflt_icon');
	        //show/hides reset link
	        this.btnReset = Boolean(f.btn_reset);
	        //defines css class for reset button
	        this.btnResetCssClass = f.btn_reset_css_class || 'reset';
	        //callback function before filters are cleared
	        this.onBeforeReset = (0, _types.isFn)(f.on_before_reset) ? f.on_before_reset : null;
	        //callback function after filters are cleared
	        this.onAfterReset = (0, _types.isFn)(f.on_after_reset) ? f.on_after_reset : null;
	
	        /*** paging ***/
	        //enables/disables table paging
	        this.paging = Boolean(f.paging);
	        this.nbHiddenRows = 0; //nb hidden rows
	
	        /*** autofilter on typing ***/
	        //Auto filtering, table is filtered when user stops typing
	        this.autoFilter = Boolean(f.auto_filter);
	        //onkeyup delay timer (msecs)
	        this.autoFilterDelay = !isNaN(f.auto_filter_delay) ? f.auto_filter_delay : _const.AUTO_FILTER_DELAY;
	        //typing indicator
	        this.isUserTyping = null;
	        this.autoFilterTimer = null;
	
	        /*** keyword highlighting ***/
	        //enables/disables keyword highlighting
	        this.highlightKeywords = Boolean(f.highlight_keywords);
	
	        /*** No results feature ***/
	        this.noResults = (0, _types.isObj)(f.no_results_message) || Boolean(f.no_results_message);
	
	        // state persisstence
	        this.state = (0, _types.isObj)(f.state) || Boolean(f.state);
	
	        /*** data types ***/
	        //defines default date type (european DMY)
	        this.defaultDateType = f.default_date_type || 'DMY';
	        //defines default thousands separator US = ',' EU = '.'
	        this.thousandsSeparator = f.thousands_separator || ',';
	        //defines default decimal separator
	        //US & javascript = '.' EU = ','
	        this.decimalSeparator = f.decimal_separator || '.';
	        //enables number format per column
	        this.hasColNbFormat = (0, _types.isArray)(f.col_number_format);
	        //array containing columns nb formats
	        this.colNbFormat = this.hasColNbFormat ? f.col_number_format : null;
	        //enables date type per column
	        this.hasColDateType = (0, _types.isArray)(f.col_date_type);
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
	        this.hasExtensions = (0, _types.isArray)(this.extensions);
	
	        /*** themes ***/
	        this.enableDefaultTheme = Boolean(f.enable_default_theme);
	        //imports themes
	        this.hasThemes = this.enableDefaultTheme || (0, _types.isArray)(f.themes);
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
	            this.externalFltEls.push(inp);
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
	        __webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(30)("./" + modulePath)]; (function (mod) {
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
	
	        //Some elements need to be overriden for default theme
	        //Reset button
	        this.btnResetText = null;
	        this.btnResetHtml = '<input type="button" value="" class="' + this.btnResetCssClass + '" title="Clear filters" />';
	
	        //Paging buttons
	        this.btnPrevPageHtml = '<input type="button" value="" class="' + this.btnPageCssClass + ' previousPage" title="Previous page" />';
	        this.btnNextPageHtml = '<input type="button" value="" class="' + this.btnPageCssClass + ' nextPage" title="Next page" />';
	        this.btnFirstPageHtml = '<input type="button" value="" class="' + this.btnPageCssClass + ' firstPage" title="First page" />';
	        this.btnLastPageHtml = '<input type="button" value="" class="' + this.btnPageCssClass + ' lastPage" title="Last page" />';
	
	        //Loader
	        this.loader = true;
	        this.loaderHtml = '<div class="defaultLoader"></div>';
	        this.loaderText = null;
	
	        this.emitter.emit('after-loading-themes', this);
	    };
	
	    /**
	     * Return stylesheet DOM element for a given theme name
	     * @return {DOMElement} stylesheet element
	     */
	
	
	    TableFilter.prototype.getStylesheet = function getStylesheet() {
	        var name = arguments.length <= 0 || arguments[0] === undefined ? 'default' : arguments[0];
	
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
	
	        var numCellData = void 0;
	        var nbFormat = void 0;
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
	        function hasArg(sA, cellData, j) {
	            sA = (0, _string.matchCase)(sA, this.caseSensitive);
	
	            var occurence = void 0;
	            var dtType = this.hasColDateType ? this.colDateType[j] : this.defaultDateType;
	
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
	
	            //Search arg dates tests
	            var isLDate = hasLO && (0, _date.isValidDate)(sA.replace(re_l, ''), dtType);
	            var isLEDate = hasLE && (0, _date.isValidDate)(sA.replace(re_le, ''), dtType);
	            var isGDate = hasGR && (0, _date.isValidDate)(sA.replace(re_g, ''), dtType);
	            var isGEDate = hasGE && (0, _date.isValidDate)(sA.replace(re_ge, ''), dtType);
	            var isDFDate = hasDF && (0, _date.isValidDate)(sA.replace(re_d, ''), dtType);
	            var isEQDate = hasEQ && (0, _date.isValidDate)(sA.replace(re_eq, ''), dtType);
	
	            var dte1 = void 0,
	                dte2 = void 0;
	            //dates
	            if ((0, _date.isValidDate)(cellData, dtType)) {
	                dte1 = (0, _date.formatDate)(cellData, dtType);
	                // lower date
	                if (isLDate) {
	                    dte2 = (0, _date.formatDate)(sA.replace(re_l, ''), dtType);
	                    occurence = dte1 < dte2;
	                }
	                // lower equal date
	                else if (isLEDate) {
	                        dte2 = (0, _date.formatDate)(sA.replace(re_le, ''), dtType);
	                        occurence = dte1 <= dte2;
	                    }
	                    // greater equal date
	                    else if (isGEDate) {
	                            dte2 = (0, _date.formatDate)(sA.replace(re_ge, ''), dtType);
	                            occurence = dte1 >= dte2;
	                        }
	                        // greater date
	                        else if (isGDate) {
	                                dte2 = (0, _date.formatDate)(sA.replace(re_g, ''), dtType);
	                                occurence = dte1 > dte2;
	                            }
	                            // different date
	                            else if (isDFDate) {
	                                    dte2 = (0, _date.formatDate)(sA.replace(re_d, ''), dtType);
	                                    occurence = dte1.toString() !== dte2.toString();
	                                }
	                                // equal date
	                                else if (isEQDate) {
	                                        dte2 = (0, _date.formatDate)(sA.replace(re_eq, ''), dtType);
	                                        occurence = dte1.toString() === dte2.toString();
	                                    }
	                                    // searched keyword with * operator doesn't have to be a date
	                                    else if (re_lk.test(sA)) {
	                                            // like date
	                                            occurence = (0, _string.contains)(sA.replace(re_lk, ''), cellData, false, this.caseSensitive);
	                                        } else if ((0, _date.isValidDate)(sA, dtType)) {
	                                            dte2 = (0, _date.formatDate)(sA, dtType);
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
	                                                    occurence = (0, _string.contains)(sA, cellData, this.isExactMatch(j), this.caseSensitive);
	                                                }
	            } else {
	                //first numbers need to be formated
	                if (this.hasColNbFormat && this.colNbFormat[j]) {
	                    numCellData = (0, _helpers.removeNbFormat)(cellData, this.colNbFormat[j]);
	                    nbFormat = this.colNbFormat[j];
	                } else {
	                    if (this.thousandsSeparator === ',' && this.decimalSeparator === '.') {
	                        numCellData = (0, _helpers.removeNbFormat)(cellData, 'us');
	                        nbFormat = 'us';
	                    } else {
	                        numCellData = (0, _helpers.removeNbFormat)(cellData, 'eu');
	                        nbFormat = 'eu';
	                    }
	                }
	
	                // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},
	                // rgx:)
	                // lower equal
	                if (hasLE) {
	                    occurence = numCellData <= (0, _helpers.removeNbFormat)(sA.replace(re_le, ''), nbFormat);
	                }
	                //greater equal
	                else if (hasGE) {
	                        occurence = numCellData >= (0, _helpers.removeNbFormat)(sA.replace(re_ge, ''), nbFormat);
	                    }
	                    //lower
	                    else if (hasLO) {
	                            occurence = numCellData < (0, _helpers.removeNbFormat)(sA.replace(re_l, ''), nbFormat);
	                        }
	                        //greater
	                        else if (hasGR) {
	                                occurence = numCellData > (0, _helpers.removeNbFormat)(sA.replace(re_g, ''), nbFormat);
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
	                                                                if (numCellData && this.hasColNbFormat && this.colNbFormat[j] && !this.singleSearchFlt) {
	                                                                    sA = (0, _helpers.removeNbFormat)(sA, nbFormat);
	                                                                    occurence = numCellData === sA || (0, _string.contains)(sA.toString(), numCellData.toString(), this.isExactMatch(j), this.caseSensitive);
	                                                                } else {
	                                                                    // Finally test search term is contained in cell data
	                                                                    occurence = (0, _string.contains)(sA, cellData, this.isExactMatch(j), this.caseSensitive);
	                                                                }
	                                                            }
	            } //else
	            return occurence;
	        } //fn
	
	        for (var k = this.refRow; k < nbRows; k++) {
	            // already filtered rows display re-init
	            row[k].style.display = '';
	
	            var cells = row[k].cells,
	                nchilds = cells.length;
	
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
	        var includeHeaders = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	        var num = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	        var exclude = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
	
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
	                    var cellData = this.getCellData(cell[j]),
	                        nbFormat = this.colNbFormat ? this.colNbFormat[colIndex] : undefined,
	                        data = num ? (0, _helpers.removeNbFormat)(cellData, nbFormat) : cellData;
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
	        var rowIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
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
	        var includeHeaders = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	        var excludeHiddenCols = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
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
	        var includeHeaders = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	        var excludeHiddenCols = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
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
	        var includeHeaders = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
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
	        var query = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
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
	        var filterId = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
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
	        var type = arguments.length <= 1 || arguments[1] === undefined ? 'script' : arguments[1];
	
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
	
	        var type = arguments.length <= 3 || arguments[3] === undefined ? 'script' : arguments[3];
	
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
	        var excludeHiddenCols = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
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
	        var reCalc = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
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
	    var caseSensitive = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
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
	    var exactMatch = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	    var caseSensitive = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Date utilities
	 */
	
	/**
	 * Verifies passed formatted date string is valid
	 * @param  {String}  dateStr Formatted date string
	 * @param  {String}  format accepted formats: 'DMY', 'MDY', 'YMD', 'DDMMMYYYY'
	 * @return {Boolean}
	 */
	var isValidDate = exports.isValidDate = function isValidDate(dateStr, format) {
	    if (!format) {
	        format = 'DMY';
	    }
	    format = format.toUpperCase();
	    if (format.length !== 3) {
	        if (format === 'DDMMMYYYY') {
	            var d = formatDate(dateStr, format);
	            dateStr = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	            format = 'DMY';
	        }
	    }
	    if (format.indexOf('M') === -1 || format.indexOf('D') === -1 || format.indexOf('Y') === -1) {
	        format = 'DMY';
	    }
	    var reg1 = void 0,
	        reg2 = void 0;
	    // If the year is first
	    if (format.substring(0, 1) === 'Y') {
	        reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
	        reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
	    } else if (format.substring(1, 2) === 'Y') {
	        // If the year is second
	        reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/;
	        reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/;
	    } else {
	        // The year must be third
	        reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/;
	        reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;
	    }
	    // If it doesn't conform to the right format (with either a 2 digit year
	    // or 4 digit year), fail
	    if (reg1.test(dateStr) === false && reg2.test(dateStr) === false) {
	        return false;
	    }
	    // Split into 3 parts based on what the divider was
	    var parts = dateStr.split(RegExp.$1);
	    var mm = void 0,
	        dd = void 0,
	        yy = void 0;
	    // Check to see if the 3 parts end up making a valid date
	    if (format.substring(0, 1) === 'M') {
	        mm = parts[0];
	    } else if (format.substring(1, 2) === 'M') {
	        mm = parts[1];
	    } else {
	        mm = parts[2];
	    }
	    if (format.substring(0, 1) === 'D') {
	        dd = parts[0];
	    } else if (format.substring(1, 2) === 'D') {
	        dd = parts[1];
	    } else {
	        dd = parts[2];
	    }
	    if (format.substring(0, 1) === 'Y') {
	        yy = parts[0];
	    } else if (format.substring(1, 2) === 'Y') {
	        yy = parts[1];
	    } else {
	        yy = parts[2];
	    }
	    if (parseInt(yy, 10) <= 50) {
	        yy = (parseInt(yy, 10) + 2000).toString();
	    }
	    if (parseInt(yy, 10) <= 99) {
	        yy = (parseInt(yy, 10) + 1900).toString();
	    }
	    var dt = new Date(parseInt(yy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10), 0, 0, 0, 0);
	    if (parseInt(dd, 10) !== dt.getDate()) {
	        return false;
	    }
	    if (parseInt(mm, 10) - 1 !== dt.getMonth()) {
	        return false;
	    }
	    return true;
	};
	
	/**
	 * Converts formatted date into a Date object
	 * @param  {String} dateStr Formatted date string
	 * @param  {String} format accepted formats: 'DMY', 'MDY', 'YMD', 'DDMMMYYYY'
	 * @return {Object} date object
	 */
	var formatDate = exports.formatDate = function formatDate(dateStr, formatStr) {
	    if (!formatStr) {
	        formatStr = 'DMY';
	    }
	    if (!dateStr || dateStr === '') {
	        return new Date(1001, 0, 1);
	    }
	    var oDate = void 0;
	    var parts = void 0;
	
	    switch (formatStr.toUpperCase()) {
	        case 'DDMMMYYYY':
	            parts = dateStr.replace(/[- \/.]/g, ' ').split(' ');
	            oDate = new Date(y2kDate(parts[2]), mmm2mm(parts[1]) - 1, parts[0]);
	            break;
	        case 'DMY':
	            /* eslint-disable */
	            parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/, '$1 $3 $5').split(' ');
	            oDate = new Date(y2kDate(parts[2]), parts[1] - 1, parts[0]);
	            /* eslint-enable */
	            break;
	        case 'MDY':
	            /* eslint-disable */
	            parts = dateStr.replace(/^(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])([- \/.])((\d\d)?\d\d)$/, '$1 $3 $5').split(' ');
	            oDate = new Date(y2kDate(parts[2]), parts[0] - 1, parts[1]);
	            /* eslint-enable */
	            break;
	        case 'YMD':
	            /* eslint-disable */
	            parts = dateStr.replace(/^((\d\d)?\d\d)([- \/.])(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])$/, '$1 $4 $6').split(' ');
	            oDate = new Date(y2kDate(parts[0]), parts[1] - 1, parts[2]);
	            /* eslint-enable */
	            break;
	        default:
	            //in case format is not correct
	            /* eslint-disable */
	            parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/, '$1 $3 $5').split(' ');
	            oDate = new Date(y2kDate(parts[2]), parts[1] - 1, parts[0]);
	            /* eslint-enable */
	            break;
	    }
	    return oDate;
	};
	
	function y2kDate(yr) {
	    if (yr === undefined) {
	        return 0;
	    }
	    if (yr.length > 2) {
	        return yr;
	    }
	    var y = void 0;
	    //>50 belong to 1900
	    if (yr <= 99 && yr > 50) {
	        y = '19' + yr;
	    }
	    //<50 belong to 2000
	    if (yr < 50 || yr === '00') {
	        y = '20' + yr;
	    }
	    return y;
	}
	
	function mmm2mm(mmm) {
	    if (mmm === undefined) {
	        return 0;
	    }
	    var mondigit = void 0;
	    var MONTH_NAMES = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
	    for (var m_i = 0; m_i < MONTH_NAMES.length; m_i++) {
	        var month_name = MONTH_NAMES[m_i];
	        if (mmm.toLowerCase() === month_name) {
	            mondigit = m_i + 1;
	            break;
	        }
	    }
	    if (mondigit > 11 || mondigit < 23) {
	        mondigit = mondigit - 12;
	    }
	    if (mondigit < 1 || mondigit > 12) {
	        return 0;
	    }
	    return mondigit;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Misc helpers
	 */
	
	/**
	 * Returns a unformatted number
	 * @param {String} Formatted number
	 * @param {String} Format type, currently 'us' or 'eu'
	 * @return {String} Unformatted number
	 */
	var removeNbFormat = exports.removeNbFormat = function removeNbFormat(data) {
	    var format = arguments.length <= 1 || arguments[1] === undefined ? 'us' : arguments[1];
	
	    if (!data) {
	        return;
	    }
	
	    var n = data;
	    if (format.toLowerCase() === 'us') {
	        n = +n.replace(/[^\d\.-]/g, '');
	    } else {
	        n = +n.replace(/[^\d\,-]/g, '').replace(',', '.');
	    }
	    return n;
	};

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	        value: true
	});
	exports.GridLayout = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	var _event = __webpack_require__(1);
	
	var _string = __webpack_require__(5);
	
	var _const = __webpack_require__(11);
	
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
	         * @param {Object} tf TableFilter instance
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
	
	                // filters flag at TF level
	                tf.fltGrid = _this.enableFilters;
	                return _this;
	        }
	
	        /**
	         * Generates a grid with fixed headers
	         *
	         * TODO: reduce size of init by extracting single purposed methods
	         */
	
	
	        GridLayout.prototype.init = function init() {
	                var _this2 = this;
	
	                var tf = this.tf;
	                var f = this.config;
	                var tbl = tf.tbl;
	
	                if (this.initialized) {
	                        return;
	                }
	
	                // Override reference rows indexes
	                tf.refRow = (0, _types.isNull)(tf.startRow) ? 0 : tf.startRow;
	                tf.headersRow = 0;
	                tf.filtersRowIndex = 1;
	
	                tf.isExternalFlt = true;
	
	                // Assign default column widths
	                this.setDefaultColWidths();
	
	                var tblW = void 0; //initial table width
	                if (tbl.width !== '') {
	                        tblW = tbl.width;
	                } else if (tbl.style.width !== '') {
	                        tblW = parseInt(tbl.style.width, 10);
	                } else {
	                        tblW = tbl.clientWidth;
	                }
	
	                //Main container: it will contain all the elements
	                this.tblMainCont = (0, _dom.createElm)('div', ['id', this.prfxMainTblCont + tf.id]);
	                this.tblMainCont.className = this.mainContCssClass;
	                if (this.width) {
	                        this.tblMainCont.style.width = this.width;
	                }
	                tbl.parentNode.insertBefore(this.tblMainCont, tbl);
	
	                //Table container: div wrapping content table
	                this.tblCont = (0, _dom.createElm)('div', ['id', this.prfxTblCont + tf.id]);
	                this.tblCont.className = this.contCssClass;
	                if (this.width) {
	                        if (this.width.indexOf('%') !== -1) {
	                                this.tblCont.style.width = '100%';
	                        } else {
	                                this.tblCont.style.width = this.width;
	                        }
	                }
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
	                this.headTblCont = (0, _dom.createElm)('div', ['id', this.prfxHeadTblCont + tf.id]);
	                this.headTblCont.className = this.headContCssClass;
	                if (this.width) {
	                        if (this.width.indexOf('%') !== -1) {
	                                this.headTblCont.style.width = '100%';
	                        } else {
	                                this.headTblCont.style.width = this.width;
	                        }
	                }
	
	                //Headers table
	                this.headTbl = (0, _dom.createElm)('table', ['id', this.prfxHeadTbl + tf.id]);
	                var tH = (0, _dom.createElm)('tHead');
	
	                //1st row should be headers row, ids are added if not set
	                //Those ids are used by the sort feature
	                var hRow = tbl.rows[this.headRowIndex];
	                var sortTriggers = [];
	                for (var n = 0; n < tf.nbCells; n++) {
	                        var c = hRow.cells[n];
	                        var thId = c.getAttribute('id');
	                        if (!thId || thId === '') {
	                                thId = this.prfxGridTh + n + '_' + tf.id;
	                                c.setAttribute('id', thId);
	                        }
	                        sortTriggers.push(thId);
	                }
	
	                //Filters row is created
	                var filtersRow = (0, _dom.createElm)('tr');
	                if (this.enableFilters && tf.fltGrid) {
	                        tf.externalFltTgtIds = [];
	                        for (var j = 0; j < tf.nbCells; j++) {
	                                var fltTdId = tf.prfxFlt + j + this.prfxGridFltTd + tf.id;
	                                var cl = (0, _dom.createElm)(tf.fltCellTag, ['id', fltTdId]);
	                                filtersRow.appendChild(cl);
	                                tf.externalFltTgtIds[j] = fltTdId;
	                        }
	                }
	
	                //Headers row are moved from content table to headers table
	                if (!this.noHeaders) {
	                        for (var i = 0; i < this.headRows.length; i++) {
	                                var headRow = tbl.rows[this.headRows[i]];
	                                tH.appendChild(headRow);
	                        }
	                } else {
	                        // Handle table with no headers, assuming here headers do not
	                        // exist
	                        tH.appendChild((0, _dom.createElm)('tr'));
	                }
	
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
	
	                //Configure sort extension if any
	                var sort = (f.extensions || []).filter(function (itm) {
	                        return itm.name === 'sort';
	                });
	                if (sort.length === 1) {
	                        sort[0].async_sort = true;
	                        sort[0].trigger_ids = sortTriggers;
	                }
	
	                //Cols generation for all browsers excepted IE<=7
	                this.tblHasColTag = (0, _dom.tag)(tbl, 'col').length > 0 ? true : false;
	
	                //Col elements are enough to keep column widths after sorting and
	                //filtering
	                var createColTags = function createColTags() {
	                        for (var k = tf.nbCells - 1; k >= 0; k--) {
	                                var col = (0, _dom.createElm)('col', ['id', tf.id + '_col_' + k]);
	                                tbl.insertBefore(col, tbl.firstChild);
	                                col.style.width = tf.colWidths[k];
	                                this.colElms[k] = col;
	                        }
	                        this.tblHasColTag = true;
	                };
	
	                if (!this.tblHasColTag) {
	                        createColTags.call(this);
	                } else {
	                        var cols = (0, _dom.tag)(tbl, 'col');
	                        for (var ii = 0; ii < tf.nbCells; ii++) {
	                                cols[ii].setAttribute('id', tf.id + '_col_' + ii);
	                                cols[ii].style.width = tf.colWidths[ii];
	                                this.colElms.push(cols[ii]);
	                        }
	                }
	
	                if (tf.popupFilters) {
	                        filtersRow.style.display = _const.NONE;
	                }
	
	                if (tbl.clientWidth !== this.headTbl.clientWidth) {
	                        tbl.style.width = this.headTbl.clientWidth + 'px';
	                }
	
	                this.initialized = true;
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
/* 10 */
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
/* 11 */
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
	 * Default values
	 */
	
	/**
	 * Auto filter delay in milliseconds
	 * @type {Number}
	 */
	var AUTO_FILTER_DELAY = exports.AUTO_FILTER_DELAY = 750;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Loader = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	var _root = __webpack_require__(2);
	
	var _const = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Loader = exports.Loader = function (_Feature) {
	    _inherits(Loader, _Feature);
	
	    /**
	     * Loading message/spinner
	     * @param {Object} tf TableFilter instance
	     */
	
	    function Loader(tf) {
	        _classCallCheck(this, Loader);
	
	        // TableFilter configuration
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'loader'));
	
	        var f = _this.config;
	
	        //id of container element
	        _this.loaderTgtId = f.loader_target_id || null;
	        //div containing loader
	        _this.loaderDiv = null;
	        //defines loader text
	        _this.loaderText = f.loader_text || 'Loading...';
	        //defines loader innerHtml
	        _this.loaderHtml = f.loader_html || null;
	        //defines css class for loader div
	        _this.loaderCssClass = f.loader_css_class || 'loader';
	        //delay for hiding loader
	        _this.loaderCloseDelay = 250;
	        //callback function before loader is displayed
	        _this.onShowLoader = (0, _types.isFn)(f.on_show_loader) ? f.on_show_loader : null;
	        //callback function after loader is closed
	        _this.onHideLoader = (0, _types.isFn)(f.on_hide_loader) ? f.on_hide_loader : null;
	        //loader div
	        _this.prfxLoader = 'load_';
	        return _this;
	    }
	
	    Loader.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var tf = this.tf;
	        var emitter = this.emitter;
	
	        var containerDiv = (0, _dom.createElm)('div', ['id', this.prfxLoader + tf.id]);
	        containerDiv.className = this.loaderCssClass;
	
	        var targetEl = !this.loaderTgtId ? tf.tbl.parentNode : (0, _dom.elm)(this.loaderTgtId);
	        if (!this.loaderTgtId) {
	            targetEl.insertBefore(containerDiv, tf.tbl);
	        } else {
	            targetEl.appendChild(containerDiv);
	        }
	        this.loaderDiv = containerDiv;
	        if (!this.loaderHtml) {
	            this.loaderDiv.appendChild((0, _dom.createText)(this.loaderText));
	        } else {
	            this.loaderDiv.innerHTML = this.loaderHtml;
	        }
	
	        this.show(_const.NONE);
	
	        // Subscribe to events
	        emitter.on(['before-filtering', 'before-populating-filter', 'before-page-change', 'before-clearing-filters', 'before-page-length-change', 'before-reset-page', 'before-reset-page-length', 'before-loading-extensions', 'before-loading-themes'], function () {
	            return _this2.show('');
	        });
	        emitter.on(['after-filtering', 'after-populating-filter', 'after-page-change', 'after-clearing-filters', 'after-page-length-change', 'after-reset-page', 'after-reset-page-length', 'after-loading-extensions', 'after-loading-themes'], function () {
	            return _this2.show(_const.NONE);
	        });
	
	        this.initialized = true;
	    };
	
	    Loader.prototype.show = function show(p) {
	        var _this3 = this;
	
	        if (!this.isEnabled()) {
	            return;
	        }
	
	        var displayLoader = function displayLoader() {
	            if (!_this3.loaderDiv) {
	                return;
	            }
	            if (_this3.onShowLoader && p !== _const.NONE) {
	                _this3.onShowLoader.call(null, _this3);
	            }
	            _this3.loaderDiv.style.display = p;
	            if (_this3.onHideLoader && p === _const.NONE) {
	                _this3.onHideLoader.call(null, _this3);
	            }
	        };
	
	        var t = p === _const.NONE ? this.loaderCloseDelay : 1;
	        _root.root.setTimeout(displayLoader, t);
	    };
	
	    Loader.prototype.destroy = function destroy() {
	        var _this4 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        var emitter = this.emitter;
	
	        (0, _dom.removeElm)(this.loaderDiv);
	        this.loaderDiv = null;
	
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HighlightKeyword = undefined;
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HighlightKeyword = exports.HighlightKeyword = function () {
	
	    /**
	     * HighlightKeyword, highlight matched keyword
	     * @param {Object} tf TableFilter instance
	     */
	
	    function HighlightKeyword(tf) {
	        _classCallCheck(this, HighlightKeyword);
	
	        var f = tf.config();
	        //defines css class for highlighting
	        this.highlightCssClass = f.highlight_css_class || 'keyword';
	
	        this.tf = tf;
	        this.emitter = tf.emitter;
	    }
	
	    HighlightKeyword.prototype.init = function init() {
	        var _this = this;
	
	        this.emitter.on(['before-filtering', 'destroy'], function () {
	            return _this.unhighlightAll();
	        });
	        this.emitter.on(['highlight-keyword'], function (tf, cell, word) {
	            return _this.highlight(cell, word, _this.highlightCssClass);
	        });
	    };
	
	    /**
	     * highlight occurences of searched term in passed node
	     * @param  {Node} node
	     * @param  {String} word     Searched term
	     * @param  {String} cssClass Css class name
	     *
	     * TODO: refactor this method
	     */
	
	
	    HighlightKeyword.prototype.highlight = function highlight(node, word, cssClass) {
	        // Iterate into this nodes childNodes
	        if (node.hasChildNodes) {
	            var children = node.childNodes;
	            for (var i = 0; i < children.length; i++) {
	                this.highlight(children[i], word, cssClass);
	            }
	        }
	
	        if (node.nodeType === 3) {
	            var tempNodeVal = node.nodeValue.toLowerCase();
	            var tempWordVal = word.toLowerCase();
	            if (tempNodeVal.indexOf(tempWordVal) !== -1) {
	                var pn = node.parentNode;
	                if (pn && pn.className !== cssClass) {
	                    // word not highlighted yet
	                    var nv = node.nodeValue,
	                        ni = tempNodeVal.indexOf(tempWordVal),
	
	                    // Create a load of replacement nodes
	                    before = (0, _dom.createText)(nv.substr(0, ni)),
	                        docWordVal = nv.substr(ni, word.length),
	                        after = (0, _dom.createText)(nv.substr(ni + word.length)),
	                        hiwordtext = (0, _dom.createText)(docWordVal),
	                        hiword = (0, _dom.createElm)('span');
	                    hiword.className = cssClass;
	                    hiword.appendChild(hiwordtext);
	                    pn.insertBefore(before, node);
	                    pn.insertBefore(hiword, node);
	                    pn.insertBefore(after, node);
	                    pn.removeChild(node);
	                }
	            }
	        }
	    };
	
	    /**
	     * Removes highlight to nodes matching passed string
	     * @param  {String} word
	     * @param  {String} cssClass Css class to remove
	     */
	
	
	    HighlightKeyword.prototype.unhighlight = function unhighlight(word, cssClass) {
	        var highlightedNodes = this.tf.tbl.querySelectorAll('.' + cssClass);
	        for (var i = 0; i < highlightedNodes.length; i++) {
	            var n = highlightedNodes[i];
	            var nodeVal = (0, _dom.getText)(n),
	                tempNodeVal = nodeVal.toLowerCase(),
	                tempWordVal = word.toLowerCase();
	
	            if (tempNodeVal.indexOf(tempWordVal) !== -1) {
	                n.parentNode.replaceChild((0, _dom.createText)(nodeVal), n);
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
	
	    HighlightKeyword.prototype.destroy = function destroy() {
	        var _this3 = this;
	
	        this.emitter.off(['before-filtering', 'destroy'], function () {
	            return _this3.unhighlightAll();
	        });
	        this.emitter.off(['highlight-keyword'], function (tf, cell, word) {
	            return _this3.highlight(cell, word, _this3.highlightCssClass);
	        });
	    };
	
	    return HighlightKeyword;
	}();

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PopupFilter = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _types = __webpack_require__(4);
	
	var _dom = __webpack_require__(3);
	
	var _event = __webpack_require__(1);
	
	var _const = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PopupFilter = exports.PopupFilter = function (_Feature) {
	    _inherits(PopupFilter, _Feature);
	
	    /**
	     * Pop-up filter component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function PopupFilter(tf) {
	        _classCallCheck(this, PopupFilter);
	
	        // Configuration object
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'popupFilters'));
	
	        var f = _this.config;
	
	        // Enable external filters
	        tf.isExternalFlt = true;
	        tf.externalFltTgtIds = [];
	
	        //filter icon path
	        _this.popUpImgFlt = f.popup_filters_image || tf.themesPath + 'icn_filter.gif';
	        //active filter icon path
	        _this.popUpImgFltActive = f.popup_filters_image_active || tf.themesPath + 'icn_filterActive.gif';
	        _this.popUpImgFltHtml = f.popup_filters_image_html || '<img src="' + _this.popUpImgFlt + '" alt="Column filter" />';
	        //defines css class for popup div containing filter
	        _this.popUpDivCssClass = f.popup_div_css_class || 'popUpFilter';
	        //callback function before popup filtes is opened
	        _this.onBeforePopUpOpen = (0, _types.isFn)(f.on_before_popup_filter_open) ? f.on_before_popup_filter_open : null;
	        //callback function after popup filtes is opened
	        _this.onAfterPopUpOpen = (0, _types.isFn)(f.on_after_popup_filter_open) ? f.on_after_popup_filter_open : null;
	        //callback function before popup filtes is closed
	        _this.onBeforePopUpClose = (0, _types.isFn)(f.on_before_popup_filter_close) ? f.on_before_popup_filter_close : null;
	        //callback function after popup filtes is closed
	        _this.onAfterPopUpClose = (0, _types.isFn)(f.on_after_popup_filter_close) ? f.on_after_popup_filter_close : null;
	
	        //stores filters spans
	        _this.popUpFltSpans = [];
	        //stores filters icons
	        _this.popUpFltImgs = [];
	        //stores filters containers
	        _this.popUpFltElms = _this.popUpFltElmCache || [];
	        _this.popUpFltAdjustToContainer = true;
	
	        //id prefix for pop-up filter span
	        _this.prfxPopUpSpan = 'popUpSpan_';
	        //id prefix for pop-up div containing filter
	        _this.prfxPopUpDiv = 'popUpDiv_';
	        return _this;
	    }
	
	    PopupFilter.prototype.onClick = function onClick(evt) {
	        var elm = (0, _event.targetEvt)(evt).parentNode,
	            colIndex = parseInt(elm.getAttribute('ci'), 10);
	
	        this.closeAll(colIndex);
	        this.toggle(colIndex);
	
	        if (this.popUpFltAdjustToContainer) {
	            var popUpDiv = this.popUpFltElms[colIndex],
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
	        if (tf.headersRow <= 1) {
	            tf.headersRow = 0;
	        }
	
	        for (var i = 0; i < tf.nbCells; i++) {
	            if (tf.getFilterType(i) === _const.NONE) {
	                continue;
	            }
	            var popUpSpan = (0, _dom.createElm)('span', ['id', this.prfxPopUpSpan + tf.id + '_' + i], ['ci', i]);
	            popUpSpan.innerHTML = this.popUpImgFltHtml;
	            var header = tf.getHeaderElement(i);
	            header.appendChild(popUpSpan);
	            (0, _event.addEvt)(popUpSpan, 'click', function (evt) {
	                return _this2.onClick(evt);
	            });
	            this.popUpFltSpans[i] = popUpSpan;
	            this.popUpFltImgs[i] = popUpSpan.firstChild;
	        }
	
	        // subscribe to events
	        this.emitter.on(['before-filtering'], function () {
	            return _this2.buildIcons();
	        });
	        this.emitter.on(['after-filtering'], function () {
	            return _this2.closeAll();
	        });
	        this.emitter.on(['cell-processed'], function (tf, cellIndex) {
	            return _this2.buildIcon(cellIndex, true);
	        });
	        this.emitter.on(['filters-row-inserted'], function () {
	            return _this2.tf.headersRow++;
	        });
	        this.emitter.on(['before-filter-init'], function (tf, colIndex) {
	            return _this2.build(colIndex);
	        });
	
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
	     * Build all pop-up filters elements
	     */
	
	
	    PopupFilter.prototype.buildAll = function buildAll() {
	        for (var i = 0; i < this.popUpFltElmCache.length; i++) {
	            this.build(i, this.popUpFltElmCache[i]);
	        }
	    };
	
	    /**
	     * Build a specified pop-up filter elements
	     * @param  {Number} colIndex Column index
	     * @param  {Object} div      Optional container DOM element
	     */
	
	
	    PopupFilter.prototype.build = function build(colIndex, div) {
	        var tf = this.tf;
	        var popUpDiv = !div ? (0, _dom.createElm)('div', ['id', this.prfxPopUpDiv + tf.id + '_' + colIndex]) : div;
	        popUpDiv.className = this.popUpDivCssClass;
	        tf.externalFltTgtIds.push(popUpDiv.id);
	        var header = tf.getHeaderElement(colIndex);
	        header.insertBefore(popUpDiv, header.firstChild);
	        (0, _event.addEvt)(popUpDiv, 'click', function (evt) {
	            return (0, _event.stopEvt)(evt);
	        });
	        this.popUpFltElms[colIndex] = popUpDiv;
	    };
	
	    /**
	     * Toogle visibility of specified filter
	     * @param  {Number} colIndex Column index
	     */
	
	
	    PopupFilter.prototype.toggle = function toggle(colIndex) {
	        var tf = this.tf,
	            popUpFltElm = this.popUpFltElms[colIndex];
	
	        if (popUpFltElm.style.display === _const.NONE || popUpFltElm.style.display === '') {
	            if (this.onBeforePopUpOpen) {
	                this.onBeforePopUpOpen.call(null, this, this.popUpFltElms[colIndex], colIndex);
	            }
	            popUpFltElm.style.display = 'block';
	            if (tf.getFilterType(colIndex) === _const.INPUT) {
	                var flt = tf.getFilterElement(colIndex);
	                if (flt) {
	                    flt.focus();
	                }
	            }
	            if (this.onAfterPopUpOpen) {
	                this.onAfterPopUpOpen.call(null, this, this.popUpFltElms[colIndex], colIndex);
	            }
	        } else {
	            if (this.onBeforePopUpClose) {
	                this.onBeforePopUpClose.call(null, this, this.popUpFltElms[colIndex], colIndex);
	            }
	            popUpFltElm.style.display = _const.NONE;
	            if (this.onAfterPopUpClose) {
	                this.onAfterPopUpClose.call(null, this, this.popUpFltElms[colIndex], colIndex);
	            }
	        }
	    };
	
	    /**
	     * Close all filters excepted for the specified one if any
	     * @param  {Number} exceptIdx Column index of the filter to not close
	     */
	
	
	    PopupFilter.prototype.closeAll = function closeAll(exceptIdx) {
	        for (var i = 0; i < this.popUpFltElms.length; i++) {
	            if (i === exceptIdx) {
	                continue;
	            }
	            var popUpFltElm = this.popUpFltElms[i];
	            if (popUpFltElm) {
	                popUpFltElm.style.display = _const.NONE;
	            }
	        }
	    };
	
	    /**
	     * Build all the icons representing the pop-up filters
	     */
	
	
	    PopupFilter.prototype.buildIcons = function buildIcons() {
	        for (var i = 0; i < this.popUpFltImgs.length; i++) {
	            this.buildIcon(i, false);
	        }
	    };
	
	    /**
	     * Apply specified icon state
	     * @param  {Number} colIndex Column index
	     * @param  {Boolean} active   Apply active state
	     */
	
	
	    PopupFilter.prototype.buildIcon = function buildIcon(colIndex, active) {
	        if (this.popUpFltImgs[colIndex]) {
	            this.popUpFltImgs[colIndex].src = active ? this.popUpImgFltActive : this.popUpImgFlt;
	        }
	    };
	
	    /**
	     * Remove pop-up filters
	     */
	
	
	    PopupFilter.prototype.destroy = function destroy() {
	        var _this3 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        this.popUpFltElmCache = [];
	        for (var i = 0; i < this.popUpFltElms.length; i++) {
	            var popUpFltElm = this.popUpFltElms[i],
	                popUpFltSpan = this.popUpFltSpans[i],
	                popUpFltImg = this.popUpFltImgs[i];
	            if (popUpFltElm) {
	                (0, _dom.removeElm)(popUpFltElm);
	                this.popUpFltElmCache[i] = popUpFltElm;
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
	        this.popUpFltElms = [];
	        this.popUpFltSpans = [];
	        this.popUpFltImgs = [];
	
	        // unsubscribe to events
	        this.emitter.off(['before-filtering'], function () {
	            return _this3.buildIcons();
	        });
	        this.emitter.off(['after-filtering'], function () {
	            return _this3.closeAll();
	        });
	        this.emitter.off(['cell-processed'], function (tf, cellIndex) {
	            return _this3.buildIcon(cellIndex, true);
	        });
	        this.emitter.off(['filters-row-inserted'], function () {
	            return _this3.tf.headersRow++;
	        });
	        this.emitter.off(['before-filter-init'], function (tf, colIndex) {
	            return _this3.build(colIndex);
	        });
	
	        this.initialized = false;
	    };
	
	    return PopupFilter;
	}(_feature.Feature);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Dropdown = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _dom = __webpack_require__(3);
	
	var _array = __webpack_require__(16);
	
	var _string = __webpack_require__(5);
	
	var _sort = __webpack_require__(17);
	
	var _event = __webpack_require__(1);
	
	var _const = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SORT_ERROR = 'Filter options for column {0} cannot be sorted in ' + '{1} manner.';
	
	var Dropdown = exports.Dropdown = function (_Feature) {
	    _inherits(Dropdown, _Feature);
	
	    /**
	     * Dropdown UI component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function Dropdown(tf) {
	        _classCallCheck(this, Dropdown);
	
	        // Configuration object
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'dropdown'));
	
	        var f = tf.config();
	
	        _this.enableSlcResetFilter = f.enable_slc_reset_filter === false ? false : true;
	        //defines empty option text
	        _this.nonEmptyText = f.non_empty_text || '(Non empty)';
	        //IE only, tooltip text appearing on select before it is populated
	        _this.activateSlcTooltip = f.activate_slc_tooltip || 'Click to activate';
	        //tooltip text appearing on multiple select
	        _this.multipleSlcTooltip = f.multiple_slc_tooltip || 'Use Ctrl key for multiple selections';
	
	        _this.isCustom = null;
	        _this.opts = null;
	        _this.optsTxt = null;
	        _this.slcInnerHtml = null;
	        return _this;
	    }
	
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
	            tf.externalFltEls.push(slc);
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
	
	        this.initialized = true;
	    };
	
	    /**
	     * Build drop-down filter UI
	     * @param  {Number}  colIndex    Column index
	     * @param  {Boolean} isLinked    Enable linked refresh behaviour
	     */
	
	
	    Dropdown.prototype.build = function build(colIndex) {
	        var isLinked = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	        var tf = this.tf;
	        colIndex = parseInt(colIndex, 10);
	
	        this.emitter.emit('before-populating-filter', tf, colIndex);
	
	        this.opts = [];
	        this.optsTxt = [];
	        this.slcInnerHtml = '';
	
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
	        var values = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CheckList = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _dom = __webpack_require__(3);
	
	var _array = __webpack_require__(16);
	
	var _string = __webpack_require__(5);
	
	var _sort = __webpack_require__(17);
	
	var _event = __webpack_require__(1);
	
	var _types = __webpack_require__(4);
	
	var _const = __webpack_require__(11);
	
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
	     * Checklist change event handler
	     * @param {Event} evt
	     */
	
	
	    CheckList.prototype.onChange = function onChange(evt) {
	        console.log('onChange', evt);
	        var elm = (0, _event.targetEvt)(evt);
	        var tf = this.tf;
	        this.emitter.emit('filter-focus', tf, elm);
	        tf.filter();
	    };
	
	    /**
	     * Checklist option click event handler
	     * @param {Event} evt
	     */
	
	
	    CheckList.prototype.optionClick = function optionClick(evt) {
	        /*console.log('optionClick',evt);*/
	        this.setCheckListValues(evt.target);
	        this.onChange(evt);
	    };
	
	    /**
	     * Checklist container click event handler for load on demand feature
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
	            tf.externalFltEls.push(divCont);
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
	
	        this.emitter.on(['build-checklist-filter'], function (tf, colIndex, isExternal) {
	            return _this3.build(colIndex, isExternal);
	        });
	
	        this.emitter.on(['select-checklist-options'], function (tf, colIndex, values) {
	            return _this3.selectOptions(colIndex, values);
	        });
	
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
	        // addEvt(ul, 'change', (evt) => this.onChange(evt));
	
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
	        var values = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RowsCounter = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RowsCounter = exports.RowsCounter = function (_Feature) {
	    _inherits(RowsCounter, _Feature);
	
	    /**
	     * Rows counter
	     * @param {Object} tf TableFilter instance
	     */
	
	    function RowsCounter(tf) {
	        _classCallCheck(this, RowsCounter);
	
	        // TableFilter configuration
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'rowsCounter'));
	
	        var f = _this.config;
	
	        //id of custom container element
	        _this.rowsCounterTgtId = f.rows_counter_target_id || null;
	        //element containing tot nb rows
	        _this.rowsCounterDiv = null;
	        //element containing tot nb rows label
	        _this.rowsCounterSpan = null;
	        //defines rows counter text
	        _this.rowsCounterText = f.rows_counter_text || 'Rows: ';
	        _this.fromToTextSeparator = f.from_to_text_separator || '-';
	        _this.overText = f.over_text || ' / ';
	        //defines css class rows counter
	        _this.totRowsCssClass = f.tot_rows_css_class || 'tot';
	        //rows counter div
	        _this.prfxCounter = 'counter_';
	        //nb displayed rows label
	        _this.prfxTotRows = 'totrows_span_';
	        //label preceding nb rows label
	        _this.prfxTotRowsTxt = 'totRowsTextSpan_';
	        //callback raised before counter is refreshed
	        _this.onBeforeRefreshCounter = (0, _types.isFn)(f.on_before_refresh_counter) ? f.on_before_refresh_counter : null;
	        //callback raised after counter is refreshed
	        _this.onAfterRefreshCounter = (0, _types.isFn)(f.on_after_refresh_counter) ? f.on_after_refresh_counter : null;
	        return _this;
	    }
	
	    RowsCounter.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var tf = this.tf;
	
	        //rows counter container
	        var countDiv = (0, _dom.createElm)('div', ['id', this.prfxCounter + tf.id]);
	        countDiv.className = this.totRowsCssClass;
	        //rows counter label
	        var countSpan = (0, _dom.createElm)('span', ['id', this.prfxTotRows + tf.id]);
	        var countText = (0, _dom.createElm)('span', ['id', this.prfxTotRowsTxt + tf.id]);
	        countText.appendChild((0, _dom.createText)(this.rowsCounterText));
	
	        // counter is added to defined element
	        if (!this.rowsCounterTgtId) {
	            tf.setToolbar();
	        }
	        var targetEl = !this.rowsCounterTgtId ? tf.lDiv : (0, _dom.elm)(this.rowsCounterTgtId);
	
	        //default container: 'lDiv'
	        if (!this.rowsCounterTgtId) {
	            countDiv.appendChild(countText);
	            countDiv.appendChild(countSpan);
	            targetEl.appendChild(countDiv);
	        } else {
	            //custom container, no need to append statusDiv
	            targetEl.appendChild(countText);
	            targetEl.appendChild(countSpan);
	        }
	        this.rowsCounterDiv = countDiv;
	        this.rowsCounterSpan = countSpan;
	
	        // subscribe to events
	        this.emitter.on(['after-filtering', 'grouped-by-page'], function () {
	            return _this2.refresh(tf.getValidRowsNb());
	        });
	        this.emitter.on(['rows-changed'], function () {
	            return _this2.refresh();
	        });
	
	        this.initialized = true;
	        this.refresh();
	    };
	
	    RowsCounter.prototype.refresh = function refresh(p) {
	        if (!this.initialized || !this.isEnabled()) {
	            return;
	        }
	
	        var tf = this.tf;
	
	        if (this.onBeforeRefreshCounter) {
	            this.onBeforeRefreshCounter.call(null, tf, this.rowsCounterSpan);
	        }
	
	        var totTxt;
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
	
	        this.rowsCounterSpan.innerHTML = totTxt;
	        if (this.onAfterRefreshCounter) {
	            this.onAfterRefreshCounter.call(null, tf, this.rowsCounterSpan, totTxt);
	        }
	    };
	
	    RowsCounter.prototype.destroy = function destroy() {
	        var _this3 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        if (!this.rowsCounterTgtId && this.rowsCounterDiv) {
	            (0, _dom.removeElm)(this.rowsCounterDiv);
	        } else {
	            (0, _dom.elm)(this.rowsCounterTgtId).innerHTML = '';
	        }
	        this.rowsCounterSpan = null;
	        this.rowsCounterDiv = null;
	
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.StatusBar = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _root = __webpack_require__(2);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var StatusBar = exports.StatusBar = function (_Feature) {
	    _inherits(StatusBar, _Feature);
	
	    /**
	     * Status bar UI component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function StatusBar(tf) {
	        _classCallCheck(this, StatusBar);
	
	        // Configuration object
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'statusBar'));
	
	        var f = _this.config;
	
	        //id of custom container element
	        _this.statusBarTgtId = f.status_bar_target_id || null;
	        //element containing status bar label
	        _this.statusBarDiv = null;
	        //status bar
	        _this.statusBarSpan = null;
	        //status bar label
	        _this.statusBarSpanText = null;
	        //defines status bar text
	        _this.statusBarText = f.status_bar_text || '';
	        //defines css class status bar
	        _this.statusBarCssClass = f.status_bar_css_class || 'status';
	        //delay for status bar clearing
	        _this.statusBarCloseDelay = 250;
	
	        //calls function before message is displayed
	        _this.onBeforeShowMsg = (0, _types.isFn)(f.on_before_show_msg) ? f.on_before_show_msg : null;
	        //calls function after message is displayed
	        _this.onAfterShowMsg = (0, _types.isFn)(f.on_after_show_msg) ? f.on_after_show_msg : null;
	
	        //status messages
	        _this.msgFilter = f.msg_filter || 'Filtering data...';
	        //populating drop-downs
	        _this.msgPopulate = f.msg_populate || 'Populating filter...';
	        //populating drop-downs
	        _this.msgPopulateCheckList = f.msg_populate_checklist || 'Populating list...';
	        //changing paging page
	        _this.msgChangePage = f.msg_change_page || 'Collecting paging data...';
	        //clearing filters
	        _this.msgClear = f.msg_clear || 'Clearing filters...';
	        //changing nb results/page
	        _this.msgChangeResults = f.msg_change_results || 'Changing results per page...';
	        //re-setting page
	        _this.msgResetPage = f.msg_reset_page || 'Re-setting page...';
	        //re-setting page length
	        _this.msgResetPageLength = f.msg_reset_page_length || 'Re-setting page length...';
	        //table sorting
	        _this.msgSort = f.msg_sort || 'Sorting data...';
	        //extensions loading
	        _this.msgLoadExtensions = f.msg_load_extensions || 'Loading extensions...';
	        //themes loading
	        _this.msgLoadThemes = f.msg_load_themes || 'Loading theme(s)...';
	
	        // status bar div
	        _this.prfxStatus = 'status_';
	        // status bar label
	        _this.prfxStatusSpan = 'statusSpan_';
	        // text preceding status bar label
	        _this.prfxStatusTxt = 'statusText_';
	        return _this;
	    }
	
	    StatusBar.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var tf = this.tf;
	        var emitter = this.emitter;
	
	        //status bar container
	        var statusDiv = (0, _dom.createElm)('div', ['id', this.prfxStatus + tf.id]);
	        statusDiv.className = this.statusBarCssClass;
	
	        //status bar label
	        var statusSpan = (0, _dom.createElm)('span', ['id', this.prfxStatusSpan + tf.id]);
	        //preceding text
	        var statusSpanText = (0, _dom.createElm)('span', ['id', this.prfxStatusTxt + tf.id]);
	        statusSpanText.appendChild((0, _dom.createText)(this.statusBarText));
	
	        // target element container
	        if (!this.statusBarTgtId) {
	            tf.setToolbar();
	        }
	        var targetEl = !this.statusBarTgtId ? tf.lDiv : (0, _dom.elm)(this.statusBarTgtId);
	
	        //default container: 'lDiv'
	        if (!this.statusBarTgtId) {
	            statusDiv.appendChild(statusSpanText);
	            statusDiv.appendChild(statusSpan);
	            targetEl.appendChild(statusDiv);
	        } else {
	            // custom container, no need to append statusDiv
	            targetEl.appendChild(statusSpanText);
	            targetEl.appendChild(statusSpan);
	        }
	
	        this.statusBarDiv = statusDiv;
	        this.statusBarSpan = statusSpan;
	        this.statusBarSpanText = statusSpanText;
	
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
	
	        this.initialized = true;
	    };
	
	    StatusBar.prototype.message = function message() {
	        var _this3 = this;
	
	        var t = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	        if (!this.isEnabled()) {
	            return;
	        }
	
	        if (this.onBeforeShowMsg) {
	            this.onBeforeShowMsg.call(null, this.tf, t);
	        }
	
	        var d = t === '' ? this.statusBarCloseDelay : 1;
	        _root.root.setTimeout(function () {
	            if (!_this3.initialized) {
	                return;
	            }
	            _this3.statusBarSpan.innerHTML = t;
	            if (_this3.onAfterShowMsg) {
	                _this3.onAfterShowMsg.call(null, _this3.tf, t);
	            }
	        }, d);
	    };
	
	    StatusBar.prototype.destroy = function destroy() {
	        var _this4 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        var emitter = this.emitter;
	
	        this.statusBarDiv.innerHTML = '';
	        if (!this.statusBarTgtId) {
	            (0, _dom.removeElm)(this.statusBarDiv);
	        }
	        this.statusBarSpan = null;
	        this.statusBarSpanText = null;
	        this.statusBarDiv = null;
	
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Paging = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _feature = __webpack_require__(10);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	var _event = __webpack_require__(1);
	
	var _const = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Paging = exports.Paging = function (_Feature) {
	    _inherits(Paging, _Feature);
	
	    /**
	     * Pagination component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function Paging(tf) {
	        _classCallCheck(this, Paging);
	
	        // Configuration object
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'paging'));
	
	        var f = _this.config;
	
	        //css class for paging buttons (previous,next,etc.)
	        _this.btnPageCssClass = f.paging_btn_css_class || 'pgInp';
	        //stores paging select element
	        _this.pagingSlc = null;
	        //results per page select element
	        _this.resultsPerPageSlc = null;
	        //id of container element
	        _this.pagingTgtId = f.paging_target_id || null;
	        //defines table paging length
	        _this.pagingLength = !isNaN(f.paging_length) ? f.paging_length : 10;
	        //id of container element
	        _this.resultsPerPageTgtId = f.results_per_page_target_id || null;
	        //css class for paging select element
	        _this.pgSlcCssClass = f.paging_slc_css_class || 'pgSlc';
	        //css class for paging input element
	        _this.pgInpCssClass = f.paging_inp_css_class || 'pgNbInp';
	        //stores results per page text and values
	        _this.resultsPerPage = f.results_per_page || null;
	        //enables/disables results per page drop-down
	        _this.hasResultsPerPage = (0, _types.isArray)(_this.resultsPerPage);
	        //defines css class for results per page select
	        _this.resultsSlcCssClass = f.results_slc_css_class || 'rspg';
	        //css class for label preceding results per page select
	        _this.resultsSpanCssClass = f.results_span_css_class || 'rspgSpan';
	        //1st row index of current page
	        _this.startPagingRow = 0;
	        //total nb of pages
	        _this.nbPages = 0;
	        //current page nb
	        _this.currentPageNb = 1;
	        //defines next page button text
	        _this.btnNextPageText = f.btn_next_page_text || '>';
	        //defines previous page button text
	        _this.btnPrevPageText = f.btn_prev_page_text || '<';
	        //defines last page button text
	        _this.btnLastPageText = f.btn_last_page_text || '>|';
	        //defines first page button text
	        _this.btnFirstPageText = f.btn_first_page_text || '|<';
	        //defines next page button html
	        _this.btnNextPageHtml = f.btn_next_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnPageCssClass + ' nextPage" title="Next page" />');
	        //defines previous page button html
	        _this.btnPrevPageHtml = f.btn_prev_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnPageCssClass + ' previousPage" title="Previous page" />');
	        //defines last page button html
	        _this.btnFirstPageHtml = f.btn_first_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnPageCssClass + ' firstPage" title="First page" />');
	        //defines previous page button html
	        _this.btnLastPageHtml = f.btn_last_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + _this.btnPageCssClass + ' lastPage" title="Last page" />');
	        //defines text preceeding page selector drop-down
	        _this.pageText = f.page_text || ' Page ';
	        //defines text after page selector drop-down
	        _this.ofText = f.of_text || ' of ';
	        //css class for span containing tot nb of pages
	        _this.nbPgSpanCssClass = f.nb_pages_css_class || 'nbpg';
	        //enables/disables paging buttons
	        _this.hasPagingBtns = f.paging_btns === false ? false : true;
	        //defines previous page button html
	        _this.pageSelectorType = f.page_selector_type || _const.SELECT;
	        //calls function before page is changed
	        _this.onBeforeChangePage = (0, _types.isFn)(f.on_before_change_page) ? f.on_before_change_page : null;
	        //calls function before page is changed
	        _this.onAfterChangePage = (0, _types.isFn)(f.on_after_change_page) ? f.on_after_change_page : null;
	
	        //pages select
	        _this.prfxSlcPages = 'slcPages_';
	        //results per page select
	        _this.prfxSlcResults = 'slcResults_';
	        //label preciding results per page select
	        _this.prfxSlcResultsTxt = 'slcResultsTxt_';
	        //span containing next page button
	        _this.prfxBtnNextSpan = 'btnNextSpan_';
	        //span containing previous page button
	        _this.prfxBtnPrevSpan = 'btnPrevSpan_';
	        //span containing last page button
	        _this.prfxBtnLastSpan = 'btnLastSpan_';
	        //span containing first page button
	        _this.prfxBtnFirstSpan = 'btnFirstSpan_';
	        //next button
	        _this.prfxBtnNext = 'btnNext_';
	        //previous button
	        _this.prfxBtnPrev = 'btnPrev_';
	        //last button
	        _this.prfxBtnLast = 'btnLast_';
	        //first button
	        _this.prfxBtnFirst = 'btnFirst_';
	        //span for tot nb pages
	        _this.prfxPgSpan = 'pgspan_';
	        //span preceding pages select (contains 'Page')
	        _this.prfxPgBeforeSpan = 'pgbeforespan_';
	        //span following pages select (contains ' of ')
	        _this.prfxPgAfterSpan = 'pgafterspan_';
	
	        var start_row = tf.refRow;
	        var nrows = tf.getRowsNb(true);
	        //calculates page nb
	        _this.nbPages = Math.ceil((nrows - start_row) / _this.pagingLength);
	
	        //Paging elements events
	        var o = _this;
	        // Paging DOM events
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
	
	        this.initialized = true;
	    };
	
	    /**
	     * Reset paging when filters are already instantiated
	     * @param {Boolean} filterTable Execute filtering once paging instanciated
	     */
	
	
	    Paging.prototype.reset = function reset() {
	        var filterTable = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
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
	     * Change the page according to passed index
	     * @param  {Number} index Index of the page (0-n)
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ClearButton = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _dom = __webpack_require__(3);
	
	var _event = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ClearButton = exports.ClearButton = function (_Feature) {
	    _inherits(ClearButton, _Feature);
	
	    /**
	     * Clear button component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function ClearButton(tf) {
	        _classCallCheck(this, ClearButton);
	
	        // Configuration object
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'btnReset'));
	
	        var f = _this.config;
	
	        //id of container element
	        _this.btnResetTgtId = f.btn_reset_target_id || null;
	        //reset button element
	        _this.btnResetEl = null;
	        //defines reset text
	        _this.btnResetText = f.btn_reset_text || 'Reset';
	        //defines reset button tooltip
	        _this.btnResetTooltip = f.btn_reset_tooltip || 'Clear filters';
	        //defines reset button innerHtml
	        _this.btnResetHtml = f.btn_reset_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + tf.btnResetCssClass + '" ' + 'title="' + _this.btnResetTooltip + '" />');
	        //span containing reset button
	        _this.prfxResetSpan = 'resetspan_';
	        return _this;
	    }
	
	    ClearButton.prototype.onClick = function onClick() {
	        if (!this.isEnabled()) {
	            return;
	        }
	        this.tf.clearFilters();
	    };
	
	    /**
	     * Build DOM elements
	     */
	
	
	    ClearButton.prototype.init = function init() {
	        var _this2 = this;
	
	        var tf = this.tf;
	
	        if (this.initialized) {
	            return;
	        }
	
	        var resetspan = (0, _dom.createElm)('span', ['id', this.prfxResetSpan + tf.id]);
	
	        // reset button is added to defined element
	        if (!this.btnResetTgtId) {
	            tf.setToolbar();
	        }
	        var targetEl = !this.btnResetTgtId ? tf.rDiv : (0, _dom.elm)(this.btnResetTgtId);
	        targetEl.appendChild(resetspan);
	
	        if (!this.btnResetHtml) {
	            var fltreset = (0, _dom.createElm)('a', ['href', 'javascript:voelm(0);']);
	            fltreset.className = tf.btnResetCssClass;
	            fltreset.appendChild((0, _dom.createText)(this.btnResetText));
	            resetspan.appendChild(fltreset);
	            (0, _event.addEvt)(fltreset, 'click', function () {
	                return _this2.onClick();
	            });
	        } else {
	            resetspan.innerHTML = this.btnResetHtml;
	            var resetEl = resetspan.firstChild;
	            (0, _event.addEvt)(resetEl, 'click', function () {
	                return _this2.onClick();
	            });
	        }
	        this.btnResetEl = resetspan.firstChild;
	
	        this.initialized = true;
	    };
	
	    /**
	     * Remove clear button UI
	     */
	
	
	    ClearButton.prototype.destroy = function destroy() {
	        var tf = this.tf;
	
	        if (!this.initialized) {
	            return;
	        }
	
	        var resetspan = (0, _dom.elm)(this.prfxResetSpan + tf.id);
	        if (resetspan) {
	            (0, _dom.removeElm)(resetspan);
	        }
	        this.btnResetEl = null;
	        this.initialized = false;
	    };
	
	    return ClearButton;
	}(_feature.Feature);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Help = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _dom = __webpack_require__(3);
	
	var _event = __webpack_require__(1);
	
	var _const = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WIKI_URL = 'https://github.com/koalyptus/TableFilter/wiki/' + '4.-Filter-operators';
	var WEBSITE_URL = 'http://koalyptus.github.io/TableFilter/';
	
	var Help = exports.Help = function (_Feature) {
	    _inherits(Help, _Feature);
	
	    /**
	     * Help UI component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function Help(tf) {
	        _classCallCheck(this, Help);
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'help'));
	
	        var f = _this.config;
	
	        //id of custom container element for instructions
	        _this.tgtId = f.help_instructions_target_id || null;
	        //id of custom container element for instructions
	        _this.contTgtId = f.help_instructions_container_target_id || null;
	        //defines help text
	        _this.instrText = f.help_instructions_text ? f.help_instructions_text : 'Use the filters above each column to filter and limit table ' + 'data. Advanced searches can be performed by using the following ' + 'operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, ' + '<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, ' + '<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, ' + '<b>rgx:</b><br/><a href="' + WIKI_URL + '" target="_blank">' + 'Learn more</a><hr/>';
	        //defines help innerHtml
	        _this.instrHtml = f.help_instructions_html || null;
	        //defines reset button text
	        _this.btnText = f.help_instructions_btn_text || '?';
	        //defines reset button innerHtml
	        _this.btnHtml = f.help_instructions_btn_html || null;
	        //defines css class for help button
	        _this.btnCssClass = f.help_instructions_btn_css_class || 'helpBtn';
	        //defines css class for help container
	        _this.contCssClass = f.help_instructions_container_css_class || 'helpCont';
	        //help button element
	        _this.btn = null;
	        //help content div
	        _this.cont = null;
	        _this.defaultHtml = '<div class="helpFooter"><h4>TableFilter ' + 'v' + tf.version + '</h4>' + '<a href="' + WEBSITE_URL + '" target="_blank">' + WEBSITE_URL + '</a>' + '<br/><span>&copy;2015-' + tf.year + ' Max Guglielmi</span>' + '<div align="center" style="margin-top:8px;">' + '<a href="javascript:void(0);" class="close">Close</a></div></div>';
	
	        //id prefix for help elements
	        _this.prfxHelpSpan = 'helpSpan_';
	        //id prefix for help elements
	        _this.prfxHelpDiv = 'helpDiv_';
	
	        _this.emitter.on(['init-help'], function () {
	            return _this.init();
	        });
	        return _this;
	    }
	
	    /**
	     * Initialise Help instance
	     *
	     * @returns (description)
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AlternateRows = undefined;
	
	var _feature = __webpack_require__(10);
	
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NoResults = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	var _const = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NoResults = exports.NoResults = function (_Feature) {
	    _inherits(NoResults, _Feature);
	
	    /**
	     * No results message UI component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function NoResults(tf) {
	        _classCallCheck(this, NoResults);
	
	        //configuration object
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'noResults'));
	
	        var f = _this.config.no_results_message;
	
	        _this.content = f.content || 'No results';
	        _this.customContainer = f.custom_container || null;
	        _this.customContainerId = f.custom_container_id || null;
	        _this.isExternal = !(0, _types.isEmpty)(_this.customContainer) || !(0, _types.isEmpty)(_this.customContainerId);
	        _this.cssClass = f.css_class || 'no-results';
	
	        _this.cont = null;
	
	        //callback before message is displayed
	        _this.onBeforeShowMsg = (0, _types.isFn)(f.on_before_show_msg) ? f.on_before_show_msg : null;
	        //callback after message is displayed
	        _this.onAfterShowMsg = (0, _types.isFn)(f.on_after_show_msg) ? f.on_after_show_msg : null;
	        //callback before message is hidden
	        _this.onBeforeHideMsg = (0, _types.isFn)(f.on_before_hide_msg) ? f.on_before_hide_msg : null;
	        //callback after message is hidden
	        _this.onAfterHideMsg = (0, _types.isFn)(f.on_after_hide_msg) ? f.on_after_hide_msg : null;
	
	        _this.prfxNoResults = 'nores_';
	        return _this;
	    }
	
	    NoResults.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	        var tf = this.tf;
	        var target = this.customContainer || (0, _dom.elm)(this.customContainerId) || tf.tbl;
	
	        //container
	        var cont = (0, _dom.createElm)('div', ['id', this.prfxNoResults + tf.id]);
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
	
	        this.initialized = true;
	        this.hide();
	    };
	
	    NoResults.prototype.toggle = function toggle() {
	        if (this.tf.getValidRowsNb() > 0) {
	            this.hide();
	        } else {
	            this.show();
	        }
	    };
	
	    NoResults.prototype.show = function show() {
	        if (!this.initialized || !this.isEnabled()) {
	            return;
	        }
	
	        if (this.onBeforeShowMsg) {
	            this.onBeforeShowMsg.call(null, this.tf, this);
	        }
	
	        this.setWidth();
	        this.cont.style.display = 'block';
	
	        if (this.onAfterShowMsg) {
	            this.onAfterShowMsg.call(null, this.tf, this);
	        }
	    };
	
	    NoResults.prototype.hide = function hide() {
	        if (!this.initialized || !this.isEnabled()) {
	            return;
	        }
	
	        if (this.onBeforeHideMsg) {
	            this.onBeforeHideMsg.call(null, this.tf, this);
	        }
	
	        this.cont.style.display = _const.NONE;
	
	        if (this.onBeforeHideMsg) {
	            this.onBeforeHideMsg.call(null, this.tf, this);
	        }
	    };
	
	    NoResults.prototype.setWidth = function setWidth() {
	        if (!this.initialized || this.isExternal || !this.isEnabled()) {
	            return;
	        }
	        if (this.tf.gridLayout) {
	            var gridLayout = this.tf.feature('gridLayout');
	            this.cont.style.width = gridLayout.tblCont.clientWidth + 'px';
	        } else {
	            this.cont.style.width = this.tf.tbl.clientWidth + 'px';
	        }
	    };
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.State = undefined;
	
	var _feature = __webpack_require__(10);
	
	var _hash = __webpack_require__(27);
	
	var _storage = __webpack_require__(28);
	
	var _string = __webpack_require__(5);
	
	var _types = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Reflects the state of features to be persisted via hash, localStorage or
	 * cookie
	 *
	 * @export
	 * @class State
	 * @extends {Feature}
	 */
	
	var State = exports.State = function (_Feature) {
	    _inherits(State, _Feature);
	
	    /**
	     * Creates an instance of State
	     *
	     * @param {TableFilter} tf TableFilter instance
	     */
	
	    function State(tf) {
	        _classCallCheck(this, State);
	
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, 'state'));
	
	        var cfg = _this.config.state;
	
	        _this.enableHash = cfg === true || (0, _types.isArray)(cfg.types) && cfg.types.indexOf('hash') !== -1;
	        _this.enableLocalStorage = (0, _types.isArray)(cfg.types) && cfg.types.indexOf('local_storage') !== -1;
	        _this.enableCookie = (0, _types.isArray)(cfg.types) && cfg.types.indexOf('cookie') !== -1;
	        _this.persistFilters = cfg.filters === false ? false : true;
	        _this.persistPageNumber = Boolean(cfg.page_number);
	        _this.persistPageLength = Boolean(cfg.page_length);
	        _this.persistSort = Boolean(cfg.sort);
	        _this.persistColsVisibility = Boolean(cfg.columns_visibility);
	        _this.persistFiltersVisibility = Boolean(cfg.filters_visibility);
	        _this.cookieDuration = !isNaN(cfg.cookie_duration) ? parseInt(cfg.cookie_duration, 10) : 87600;
	
	        _this.enableStorage = _this.enableLocalStorage || _this.enableCookie;
	        _this.hash = null;
	        _this.pageNb = null;
	        _this.pageLength = null;
	        _this.sort = null;
	        _this.hiddenCols = null;
	        _this.filtersVisibility = null;
	
	        _this.state = {};
	        _this.prfxCol = 'col_';
	        _this.pageNbKey = 'page';
	        _this.pageLengthKey = 'page_length';
	        _this.filtersVisKey = 'filters_visibility';
	        return _this;
	    }
	
	    /**
	     * Initializes the State object
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
/* 27 */
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
	
	var hasHashChange = exports.hasHashChange = function hasHashChange() {
	    var docMode = _root.root.documentMode;
	    return 'onhashchange' in _root.root && (docMode === undefined || docMode > 7);
	};
	
	/**
	 * Manages the URL hash reflecting the features state to be persisted
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
	
	        this.state = state;
	        this.lastHash = null;
	        this.emitter = state.emitter;
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
	
	        this.emitter.on(['state-changed'], function (tf, state) {
	            return _this.update(state);
	        });
	        this.emitter.on(['initialized'], function () {
	            return _this.sync();
	        });
	        (0, _event.addEvt)(_root.root, 'hashchange', function () {
	            return _this.sync();
	        });
	    };
	
	    /**
	     * Updates the URL hash based on a state change
	     *
	     * @param {State} state Instance of State
	     */
	
	
	    Hash.prototype.update = function update(state) {
	        var hash = '#' + JSON.stringify(state);
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
	        this.emitter.off(['initialized'], function () {
	            return _this2.sync();
	        });
	        (0, _event.removeEvt)(_root.root, 'hashchange', function () {
	            return _this2.sync();
	        });
	
	        this.state = null;
	        this.lastHash = null;
	        this.emitter = null;
	    };
	
	    return Hash;
	}();

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Storage = exports.hasStorage = undefined;
	
	var _cookie = __webpack_require__(29);
	
	var _cookie2 = _interopRequireDefault(_cookie);
	
	var _root = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JSON = _root.root.JSON;
	var localStorage = _root.root.localStorage;
	var location = _root.root.location;
	
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
	
	        this.state = state;
	        this.tf = state.tf;
	        this.enableLocalStorage = state.enableLocalStorage && hasStorage();
	        this.enableCookie = state.enableCookie && !this.enableLocalStorage;
	        this.emitter = state.emitter;
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
/* 29 */
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
	    write: function write(name, value, hours) {
	        var expire = '';
	        if (hours) {
	            expire = new Date(new Date().getTime() + hours * 3600000);
	            expire = '; expires=' + expire.toGMTString();
	        }
	        doc.cookie = name + '=' + escape(value) + expire;
	    },
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
	    remove: function remove(name) {
	        this.write(name, '', -1);
	    },
	    valueToArray: function valueToArray(name, separator) {
	        if (!separator) {
	            separator = ',';
	        }
	        //reads the cookie
	        var val = this.read(name);
	        //creates an array with filters' values
	        var arr = val.split(separator);
	        return arr;
	    },
	    getValueByIndex: function getValueByIndex(name, index, separator) {
	        if (!separator) {
	            separator = ',';
	        }
	        //reads the cookie
	        var val = this.valueToArray(name, separator);
	        return val[index];
	    }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=tablefilter.js.map