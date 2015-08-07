(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
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
/******/ 	__webpack_require__.p = "/dist/tablefilter/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Event = __webpack_require__(2);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Str = __webpack_require__(4);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	var _Cookie = __webpack_require__(5);
	
	var _Cookie2 = _interopRequireDefault(_Cookie);
	
	var _Types = __webpack_require__(6);
	
	var _Types2 = _interopRequireDefault(_Types);
	
	var _Arr = __webpack_require__(7);
	
	var _Arr2 = _interopRequireDefault(_Arr);
	
	var _DateHelper = __webpack_require__(8);
	
	var _DateHelper2 = _interopRequireDefault(_DateHelper);
	
	var _Helpers = __webpack_require__(9);
	
	var _Helpers2 = _interopRequireDefault(_Helpers);
	
	// Features
	
	var _Store = __webpack_require__(10);
	
	var _GridLayout = __webpack_require__(11);
	
	var _Loader = __webpack_require__(12);
	
	var _HighlightKeyword = __webpack_require__(13);
	
	var _PopupFilter = __webpack_require__(14);
	
	var _Dropdown = __webpack_require__(15);
	
	var _CheckList = __webpack_require__(16);
	
	var _RowsCounter = __webpack_require__(17);
	
	var _StatusBar = __webpack_require__(18);
	
	var _Paging = __webpack_require__(19);
	
	var _ClearButton = __webpack_require__(20);
	
	var _Help = __webpack_require__(21);
	
	var _AlternateRows = __webpack_require__(22);
	
	var global = window,
	    isValidDate = _DateHelper2['default'].isValid,
	    formatDate = _DateHelper2['default'].format,
	    doc = global.document;
	
	var TableFilter = (function () {
	
	    /**
	     * TF object constructor
	     * @param {String} id Table id
	     * @param {Number} row index indicating the 1st row
	     * @param {Object} configuration object
	     *
	     * TODO: Accept a TABLE element or query selectors
	     */
	
	    function TableFilter(id) {
	        _classCallCheck(this, TableFilter);
	
	        if (arguments.length === 0) {
	            return;
	        }
	
	        this.id = id;
	        this.version = '0.0.0';
	        this.year = new Date().getFullYear();
	        this.tbl = _Dom2['default'].id(id);
	        this.startRow = null;
	        this.refRow = null;
	        this.headersRow = null;
	        this.cfg = {};
	        this.nbFilterableRows = null;
	        this.nbRows = null;
	        this.nbCells = null;
	        this._hasGrid = false;
	        this.enableModules = false;
	
	        if (!this.tbl || this.tbl.nodeName != 'TABLE' || this.getRowsNb() === 0) {
	            throw new Error('Could not instantiate TableFilter: HTML table not found.');
	        }
	
	        if (arguments.length > 1) {
	            for (var i = 0, len = arguments.length; i < len; i++) {
	                var arg = arguments[i];
	                var argtype = typeof arg;
	                switch (_Str2['default'].lower(argtype)) {
	                    case 'number':
	                        this.startRow = arg;
	                        break;
	                    case 'object':
	                        this.cfg = arg;
	                        break;
	                }
	            }
	        }
	
	        // configuration object
	        var f = this.cfg;
	
	        //Start row et cols nb
	        this.refRow = this.startRow === null ? 2 : this.startRow + 1;
	        try {
	            this.nbCells = this.getCellsNb(this.refRow);
	        } catch (e) {
	            this.nbCells = this.getCellsNb(0);
	        }
	
	        //default script base path
	        this.basePath = f.base_path || 'tablefilter/';
	
	        /*** filter types ***/
	        this.fltTypeInp = 'input';
	        this.fltTypeSlc = 'select';
	        this.fltTypeMulti = 'multiple';
	        this.fltTypeCheckList = 'checklist';
	        this.fltTypeNone = 'none';
	
	        /*** filters' grid properties ***/
	
	        //enables/disables filter grid
	        this.fltGrid = f.grid === false ? false : true;
	
	        /*** Grid layout ***/
	        //enables/disables grid layout (fixed headers)
	        this.gridLayout = Boolean(f.grid_layout);
	        this.sourceTblHtml = null;
	        if (this.gridLayout) {
	            this.sourceTblHtml = this.tbl.outerHTML;
	        }
	        /*** ***/
	
	        this.filtersRowIndex = f.filters_row_index || 0;
	        this.headersRow = f.headers_row_index || (this.filtersRowIndex === 0 ? 1 : 0);
	
	        if (this.gridLayout) {
	            if (this.headersRow > 1) {
	                this.filtersRowIndex = this.headersRow + 1;
	            } else {
	                this.filtersRowIndex = 1;
	                this.headersRow = 0;
	            }
	        }
	
	        //defines tag of the cells containing filters (td/th)
	        this.fltCellTag = f.filters_cell_tag !== 'th' || f.filters_cell_tag !== 'td' ? 'td' : f.filters_cell_tag;
	
	        //stores filters ids
	        this.fltIds = [];
	        //stores filters DOM elements
	        this.fltElms = [];
	        //stores filters values
	        this.searchArgs = null;
	        //stores table data
	        this.tblData = [];
	        //stores valid rows indexes (rows visible upon filtering)
	        this.validRowsIndex = null;
	        //stores filters row element
	        this.fltGridEl = null;
	        //is first load boolean
	        this.isFirstLoad = true;
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
	        this.alternateBgs = Boolean(f.alternate_rows);
	        //defines widths of columns
	        this.hasColWidths = _Types2['default'].isArray(f.col_widths);
	        this.colWidths = this.hasColWidths ? f.col_widths : null;
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
	        this.onBeforeFilter = _Types2['default'].isFn(f.on_before_filter) ? f.on_before_filter : null;
	        //calls function after filtering
	        this.onAfterFilter = _Types2['default'].isFn(f.on_after_filter) ? f.on_after_filter : null;
	        //enables/disables case sensitivity
	        this.caseSensitive = Boolean(f.case_sensitive);
	        //enables/disbles exact match for search
	        this.exactMatch = Boolean(f.exact_match);
	        //refreshes drop-down lists upon validation
	        this.linkedFilters = Boolean(f.linked_filters);
	        //wheter excluded options are disabled
	        this.disableExcludedOptions = Boolean(f.disable_excluded_options);
	        //stores active filter element
	        this.activeFlt = null;
	        //id of active filter
	        this.activeFilterId = null;
	        //enables always visible rows
	        this.hasVisibleRows = Boolean(f.rows_always_visible);
	        //array containing always visible rows
	        this.visibleRows = this.hasVisibleRows ? f.rows_always_visible : [];
	        //enables/disables external filters generation
	        this.isExternalFlt = Boolean(f.external_flt_grid);
	        //array containing ids of external elements containing filters
	        this.externalFltTgtIds = f.external_flt_grid_ids || null;
	        //stores filters elements if isExternalFlt is true
	        this.externalFltEls = [];
	        //delays any filtering process if loader true
	        this.execDelay = !isNaN(f.exec_delay) ? parseInt(f.exec_delay, 10) : 100;
	        //calls function when filters grid loaded
	        this.onFiltersLoaded = _Types2['default'].isFn(f.on_filters_loaded) ? f.on_filters_loaded : null;
	        //enables/disables single filter search
	        this.singleSearchFlt = Boolean(f.single_search_filter);
	        //calls function after row is validated
	        this.onRowValidated = _Types2['default'].isFn(f.on_row_validated) ? f.on_row_validated : null;
	        //array defining columns for customCellData event
	        this.customCellDataCols = f.custom_cell_data_cols ? f.custom_cell_data_cols : [];
	        //calls custom function for retrieving cell data
	        this.customCellData = _Types2['default'].isFn(f.custom_cell_data) ? f.custom_cell_data : null;
	        //input watermark text array
	        this.watermark = f.watermark || '';
	        this.isWatermarkArray = _Types2['default'].isArray(this.watermark);
	        //id of toolbar container element
	        this.toolBarTgtId = f.toolbar_target_id || null;
	        //enables/disables help div
	        this.helpInstructions = _Types2['default'].isUndef(f.help_instructions) ? undefined : Boolean(f.help_instructions);
	        //popup filters
	        this.popUpFilters = Boolean(f.popup_filters);
	        //active columns color
	        this.markActiveColumns = Boolean(f.mark_active_columns);
	        //defines css class for active column header
	        this.activeColumnsCssClass = f.active_columns_css_class || 'activeHeader';
	        //calls function before active column header is marked
	        this.onBeforeActiveColumn = _Types2['default'].isFn(f.on_before_active_column) ? f.on_before_active_column : null;
	        //calls function after active column header is marked
	        this.onAfterActiveColumn = _Types2['default'].isFn(f.on_after_active_column) ? f.on_after_active_column : null;
	
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
	        this.sortNumAsc = this.isSortNumAsc ? f.sort_num_asc : null;
	        //enables/disables descending numeric options sorting
	        this.isSortNumDesc = Boolean(f.sort_num_desc);
	        this.sortNumDesc = this.isSortNumDesc ? f.sort_num_desc : null;
	        //enabled selects are populated on demand
	        this.fillSlcOnDemand = Boolean(f.fill_slc_on_demand);
	        this.hasCustomOptions = _Types2['default'].isObj(f.custom_options);
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
	
	        /*** rows counter ***/
	        //show/hides rows counter
	        this.rowsCounter = Boolean(f.rows_counter);
	
	        /*** status bar ***/
	        //show/hides status bar
	        this.statusBar = Boolean(f.status_bar);
	
	        /*** loader ***/
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
	        this.onBeforeReset = _Types2['default'].isFn(f.on_before_reset) ? f.on_before_reset : null;
	        //callback function after filters are cleared
	        this.onAfterReset = _Types2['default'].isFn(f.on_after_reset) ? f.on_after_reset : null;
	
	        /*** paging ***/
	        //enables/disables table paging
	        this.paging = Boolean(f.paging);
	        this.nbVisibleRows = 0; //nb visible rows
	        this.nbHiddenRows = 0; //nb hidden rows
	
	        /*** autofilter on typing ***/
	        //enables/disables auto filtering, table is filtered when user stops
	        //typing
	        this.autoFilter = Boolean(f.auto_filter);
	        //onkeyup delay timer (msecs)
	        this.autoFilterDelay = !isNaN(f.auto_filter_delay) ? f.auto_filter_delay : 900;
	        //typing indicator
	        this.isUserTyping = null;
	        this.autoFilterTimer = null;
	
	        /*** keyword highlighting ***/
	        //enables/disables keyword highlighting
	        this.highlightKeywords = Boolean(f.highlight_keywords);
	
	        /*** data types ***/
	        //defines default date type (european DMY)
	        this.defaultDateType = f.default_date_type || 'DMY';
	        //defines default thousands separator
	        //US = ',' EU = '.'
	        this.thousandsSeparator = f.thousands_separator || ',';
	        //defines default decimal separator
	        //US & javascript = '.' EU = ','
	        this.decimalSeparator = f.decimal_separator || '.';
	        //enables number format per column
	        this.hasColNbFormat = _Types2['default'].isArray(f.col_number_format);
	        //array containing columns nb formats
	        this.colNbFormat = this.hasColNbFormat ? f.col_number_format : null;
	        //enables date type per column
	        this.hasColDateType = _Types2['default'].isArray(f.col_date_type);
	        //array containing columns date type
	        this.colDateType = this.hasColDateType ? f.col_date_type : null;
	
	        /*** status messages ***/
	        //filtering
	        this.msgFilter = f.msg_filter || 'Filtering data...';
	        //populating drop-downs
	        this.msgPopulate = f.msg_populate || 'Populating filter...';
	        //populating drop-downs
	        this.msgPopulateCheckList = f.msg_populate_checklist || 'Populating list...';
	        //changing paging page
	        this.msgChangePage = f.msg_change_page || 'Collecting paging data...';
	        //clearing filters
	        this.msgClear = f.msg_clear || 'Clearing filters...';
	        //changing nb results/page
	        this.msgChangeResults = f.msg_change_results || 'Changing results per page...';
	        //re-setting grid values
	        this.msgResetValues = f.msg_reset_grid_values || 'Re-setting filters values...';
	        //re-setting page
	        this.msgResetPage = f.msg_reset_page || 'Re-setting page...';
	        //re-setting page length
	        this.msgResetPageLength = f.msg_reset_page_length || 'Re-setting page length...';
	        //table sorting
	        this.msgSort = f.msg_sort || 'Sorting data...';
	        //extensions loading
	        this.msgLoadExtensions = f.msg_load_extensions || 'Loading extensions...';
	        //themes loading
	        this.msgLoadThemes = f.msg_load_themes || 'Loading theme(s)...';
	
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
	        //filter values cookie
	        this.prfxCookieFltsValues = 'tf_flts_';
	        //page nb cookie
	        this.prfxCookiePageNb = 'tf_pgnb_';
	        //page length cookie
	        this.prfxCookiePageLen = 'tf_pglen_';
	
	        /*** cookies ***/
	        this.hasStoredValues = false;
	        //remembers filters values on page load
	        this.rememberGridValues = Boolean(f.remember_grid_values);
	        //cookie storing filter values
	        this.fltsValuesCookie = this.prfxCookieFltsValues + this.id;
	        //remembers page nb on page load
	        this.rememberPageNb = this.paging && f.remember_page_number;
	        //cookie storing page nb
	        this.pgNbCookie = this.prfxCookiePageNb + this.id;
	        //remembers page length on page load
	        this.rememberPageLen = this.paging && f.remember_page_length;
	        //cookie storing page length
	        this.pgLenCookie = this.prfxCookiePageLen + this.id;
	
	        /*** extensions ***/
	        //imports external script
	        this.extensions = f.extensions;
	        this.hasExtensions = _Types2['default'].isArray(this.extensions);
	
	        /*** themes ***/
	        this.enableDefaultTheme = Boolean(f.enable_default_theme);
	        //imports themes
	        this.hasThemes = this.enableDefaultTheme || _Types2['default'].isArray(f.themes);
	        this.themes = f.themes || [];
	        //themes path
	        this.themesPath = f.themes_path || this.stylePath + 'themes/';
	
	        // Features registry
	        this.Mod = {};
	
	        // Extensions registry
	        this.ExtRegistry = {};
	
	        /*** TF events ***/
	        this.Evt = {
	            name: {
	                filter: 'Filter',
	                dropdown: 'DropDown',
	                checklist: 'CheckList',
	                changepage: 'ChangePage',
	                clear: 'Clear',
	                changeresultsperpage: 'ChangeResults',
	                resetvalues: 'ResetValues',
	                resetpage: 'ResetPage',
	                resetpagelength: 'ResetPageLength',
	                loadextensions: 'LoadExtensions',
	                loadthemes: 'LoadThemes'
	            },
	
	            // Detect <enter> key
	            detectKey: function detectKey(e) {
	                if (!this.enterKey) {
	                    return;
	                }
	                var _ev = e || global.event;
	                if (_ev) {
	                    var key = _Event2['default'].keyCode(_ev);
	                    if (key === 13) {
	                        this.filter();
	                        _Event2['default'].cancel(_ev);
	                        _Event2['default'].stop(_ev);
	                    } else {
	                        this.isUserTyping = true;
	                        global.clearInterval(this.autoFilterTimer);
	                        this.autoFilterTimer = null;
	                    }
	                }
	            },
	            // if auto-filter on, detect user is typing and filter columns
	            onKeyUp: function onKeyUp(e) {
	                if (!this.autoFilter) {
	                    return;
	                }
	                var _ev = e || global.event;
	                var key = _Event2['default'].keyCode(_ev);
	                this.isUserTyping = false;
	
	                function filter() {
	                    /*jshint validthis:true */
	                    global.clearInterval(this.autoFilterTimer);
	                    this.autoFilterTimer = null;
	                    if (!this.isUserTyping) {
	                        this.filter();
	                        this.isUserTyping = null;
	                    }
	                }
	
	                if (key !== 13 && key !== 9 && key !== 27 && key !== 38 && key !== 40) {
	                    if (this.autoFilterTimer === null) {
	                        this.autoFilterTimer = global.setInterval(filter.bind(this), this.autoFilterDelay);
	                    }
	                } else {
	                    global.clearInterval(this.autoFilterTimer);
	                    this.autoFilterTimer = null;
	                }
	            },
	            // if auto-filter on, detect user is typing
	            onKeyDown: function onKeyDown() {
	                if (!this.autoFilter) {
	                    return;
	                }
	                this.isUserTyping = true;
	            },
	            // if auto-filter on, clear interval on filter blur
	            onInpBlur: function onInpBlur() {
	                if (this.autoFilter) {
	                    this.isUserTyping = false;
	                    global.clearInterval(this.autoFilterTimer);
	                }
	                // TODO: hack to prevent ezEditTable enter key event hijaking.
	                // Needs to be fixed in the vendor's library
	                if (this.hasExtension('advancedGrid')) {
	                    var advGrid = this.extension('advancedGrid');
	                    var ezEditTable = advGrid._ezEditTable;
	                    if (advGrid.cfg.editable) {
	                        ezEditTable.Editable.Set();
	                    }
	                    if (advGrid.cfg.selection) {
	                        ezEditTable.Selection.Set();
	                    }
	                }
	            },
	            // set focused text-box filter as active
	            onInpFocus: function onInpFocus(e) {
	                var _ev = e || global.event;
	                var elm = _Event2['default'].target(_ev);
	                this.activeFilterId = elm.getAttribute('id');
	                this.activeFlt = _Dom2['default'].id(this.activeFilterId);
	                if (this.popUpFilters) {
	                    _Event2['default'].cancel(_ev);
	                    _Event2['default'].stop(_ev);
	                }
	                // TODO: hack to prevent ezEditTable enter key event hijaking.
	                // Needs to be fixed in the vendor's library
	                if (this.hasExtension('advancedGrid')) {
	                    var advGrid = this.extension('advancedGrid');
	                    var ezEditTable = advGrid._ezEditTable;
	                    if (advGrid.cfg.editable) {
	                        ezEditTable.Editable.Remove();
	                    }
	                    if (advGrid.cfg.selection) {
	                        ezEditTable.Selection.Remove();
	                    }
	                }
	            },
	            // set focused drop-down filter as active
	            onSlcFocus: function onSlcFocus(e) {
	                var _ev = e || global.event;
	                var elm = _Event2['default'].target(_ev);
	                this.activeFilterId = elm.getAttribute('id');
	                this.activeFlt = _Dom2['default'].id(this.activeFilterId);
	                // select is populated when element has focus
	                if (this.fillSlcOnDemand && elm.getAttribute('filled') === '0') {
	                    var ct = elm.getAttribute('ct');
	                    this.Mod.dropdown._build(ct);
	                }
	                if (this.popUpFilters) {
	                    _Event2['default'].cancel(_ev);
	                    _Event2['default'].stop(_ev);
	                }
	            },
	            // filter columns on drop-down filter change
	            onSlcChange: function onSlcChange(e) {
	                if (!this.activeFlt) {
	                    return;
	                }
	                var _ev = e || global.event;
	                if (this.popUpFilters) {
	                    _Event2['default'].stop(_ev);
	                }
	                if (this.onSlcChange) {
	                    this.filter();
	                }
	            },
	            // fill checklist filter on click if required
	            onCheckListClick: function onCheckListClick(e) {
	                var _ev = e || global.event;
	                var elm = _Event2['default'].target(_ev);
	                if (this.fillSlcOnDemand && elm.getAttribute('filled') === '0') {
	                    var ct = elm.getAttribute('ct');
	                    this.Mod.checkList._build(ct);
	                    this.Mod.checkList.checkListDiv[ct].onclick = null;
	                    this.Mod.checkList.checkListDiv[ct].title = '';
	                }
	            },
	            // filter when validation button clicked
	            onBtnClick: function onBtnClick() {
	                this.filter();
	            }
	        };
	    }
	
	    _createClass(TableFilter, [{
	        key: 'init',
	
	        /**
	         * Initialise filtering grid bar behaviours and layout
	         *
	         * TODO: decompose in smaller methods
	         */
	        value: function init() {
	            if (this._hasGrid) {
	                return;
	            }
	            if (!this.tbl) {
	                this.tbl = _Dom2['default'].id(this.id);
	            }
	            if (this.gridLayout) {
	                this.refRow = this.startRow === null ? 0 : this.startRow;
	            }
	            if (this.popUpFilters && (this.filtersRowIndex === 0 && this.headersRow === 1 || this.gridLayout)) {
	                this.headersRow = 0;
	            }
	
	            var Mod = this.Mod;
	            var n = this.singleSearchFlt ? 1 : this.nbCells,
	                inpclass = undefined;
	
	            //loads stylesheet if not imported
	            this['import'](this.stylesheetId, this.stylesheet, null, 'link');
	
	            //loads theme
	            if (this.hasThemes) {
	                this._loadThemes();
	            }
	
	            if (this.rememberGridValues || this.rememberPageNb || this.rememberPageLen) {
	                Mod.store = new _Store.Store(this);
	            }
	
	            if (this.gridLayout) {
	                Mod.gridLayout = new _GridLayout.GridLayout(this);
	                Mod.gridLayout.init();
	            }
	
	            if (this.loader) {
	                if (!Mod.loader) {
	                    Mod.loader = new _Loader.Loader(this);
	                }
	            }
	
	            if (this.highlightKeywords) {
	                Mod.highlightKeyword = new _HighlightKeyword.HighlightKeyword(this);
	            }
	
	            if (this.popUpFilters) {
	                if (!Mod.popupFilter) {
	                    Mod.popupFilter = new _PopupFilter.PopupFilter(this);
	                }
	                Mod.popupFilter.init();
	            }
	
	            //filters grid is not generated
	            if (!this.fltGrid) {
	                this.refRow = this.refRow - 1;
	                if (this.gridLayout) {
	                    this.refRow = 0;
	                }
	                this.nbFilterableRows = this.getRowsNb();
	                this.nbVisibleRows = this.nbFilterableRows;
	                this.nbRows = this.nbFilterableRows + this.refRow;
	            } else {
	                if (this.isFirstLoad) {
	                    var fltrow = undefined;
	                    if (!this.gridLayout) {
	                        var thead = _Dom2['default'].tag(this.tbl, 'thead');
	                        if (thead.length > 0) {
	                            fltrow = thead[0].insertRow(this.filtersRowIndex);
	                        } else {
	                            fltrow = this.tbl.insertRow(this.filtersRowIndex);
	                        }
	
	                        if (this.headersRow > 1 && this.filtersRowIndex <= this.headersRow && !this.popUpFilters) {
	                            this.headersRow++;
	                        }
	                        if (this.popUpFilters) {
	                            this.headersRow++;
	                        }
	
	                        fltrow.className = this.fltsRowCssClass;
	                        //Disable for grid_layout
	                        if (this.isExternalFlt && (!this.gridLayout || this.popUpFilters)) {
	                            fltrow.style.display = 'none';
	                        }
	                    }
	
	                    this.nbFilterableRows = this.getRowsNb();
	                    this.nbVisibleRows = this.nbFilterableRows;
	                    this.nbRows = this.tbl.rows.length;
	
	                    for (var i = 0; i < n; i++) {
	                        // this loop adds filters
	
	                        if (this.popUpFilters) {
	                            Mod.popupFilter.build(i);
	                        }
	
	                        var fltcell = _Dom2['default'].create(this.fltCellTag),
	                            col = this.getFilterType(i),
	                            externalFltTgtId = this.isExternalFlt && this.externalFltTgtIds ? this.externalFltTgtIds[i] : null;
	
	                        if (this.singleSearchFlt) {
	                            fltcell.colSpan = this.nbCells;
	                        }
	                        if (!this.gridLayout) {
	                            fltrow.appendChild(fltcell);
	                        }
	                        inpclass = i == n - 1 && this.displayBtn ? this.fltSmallCssClass : this.fltCssClass;
	
	                        //only 1 input for single search
	                        if (this.singleSearchFlt) {
	                            col = this.fltTypeInp;
	                            inpclass = this.singleFltCssClass;
	                        }
	
	                        //drop-down filters
	                        if (col === this.fltTypeSlc || col === this.fltTypeMulti) {
	                            if (!Mod.dropdown) {
	                                Mod.dropdown = new _Dropdown.Dropdown(this);
	                            }
	                            var dropdown = Mod.dropdown;
	
	                            var slc = _Dom2['default'].create(this.fltTypeSlc, ['id', this.prfxFlt + i + '_' + this.id], ['ct', i], ['filled', '0']);
	
	                            if (col === this.fltTypeMulti) {
	                                slc.multiple = this.fltTypeMulti;
	                                slc.title = dropdown.multipleSlcTooltip;
	                            }
	                            slc.className = _Str2['default'].lower(col) === this.fltTypeSlc ? inpclass : this.fltMultiCssClass; // for ie<=6
	
	                            //filter is appended in desired external element
	                            if (externalFltTgtId) {
	                                _Dom2['default'].id(externalFltTgtId).appendChild(slc);
	                                this.externalFltEls.push(slc);
	                            } else {
	                                fltcell.appendChild(slc);
	                            }
	
	                            this.fltIds.push(this.prfxFlt + i + '_' + this.id);
	
	                            if (!this.fillSlcOnDemand) {
	                                dropdown._build(i);
	                            }
	
	                            _Event2['default'].add(slc, 'keypress', this.Evt.detectKey.bind(this));
	                            _Event2['default'].add(slc, 'change', this.Evt.onSlcChange.bind(this));
	                            _Event2['default'].add(slc, 'focus', this.Evt.onSlcFocus.bind(this));
	
	                            //1st option is created here since dropdown.build isn't
	                            //invoked
	                            if (this.fillSlcOnDemand) {
	                                var opt0 = _Dom2['default'].createOpt(this.displayAllText, '');
	                                slc.appendChild(opt0);
	                            }
	                        }
	                        // checklist
	                        else if (col === this.fltTypeCheckList) {
	                            var checkList = undefined;
	                            Mod.checkList = new _CheckList.CheckList(this);
	                            checkList = Mod.checkList;
	
	                            var divCont = _Dom2['default'].create('div', ['id', checkList.prfxCheckListDiv + i + '_' + this.id], ['ct', i], ['filled', '0']);
	                            divCont.className = checkList.checkListDivCssClass;
	
	                            //filter is appended in desired element
	                            if (externalFltTgtId) {
	                                _Dom2['default'].id(externalFltTgtId).appendChild(divCont);
	                                this.externalFltEls.push(divCont);
	                            } else {
	                                fltcell.appendChild(divCont);
	                            }
	
	                            checkList.checkListDiv[i] = divCont;
	                            this.fltIds.push(this.prfxFlt + i + '_' + this.id);
	                            if (!this.fillSlcOnDemand) {
	                                checkList._build(i);
	                            }
	
	                            if (this.fillSlcOnDemand) {
	                                _Event2['default'].add(divCont, 'click', this.Evt.onCheckListClick.bind(this));
	                                divCont.appendChild(_Dom2['default'].text(checkList.activateCheckListTxt));
	                            }
	                        } else {
	                            //show/hide input
	                            var inptype = col === this.fltTypeInp ? 'text' : 'hidden';
	                            var inp = _Dom2['default'].create(this.fltTypeInp, ['id', this.prfxFlt + i + '_' + this.id], ['type', inptype], ['ct', i]);
	                            if (inptype !== 'hidden' && this.watermark) {
	                                inp.setAttribute('placeholder', this.isWatermarkArray ? this.watermark[i] || '' : this.watermark);
	                            }
	                            inp.className = inpclass;
	                            _Event2['default'].add(inp, 'focus', this.Evt.onInpFocus.bind(this));
	
	                            //filter is appended in desired element
	                            if (externalFltTgtId) {
	                                _Dom2['default'].id(externalFltTgtId).appendChild(inp);
	                                this.externalFltEls.push(inp);
	                            } else {
	                                fltcell.appendChild(inp);
	                            }
	
	                            this.fltIds.push(this.prfxFlt + i + '_' + this.id);
	
	                            _Event2['default'].add(inp, 'keypress', this.Evt.detectKey.bind(this));
	                            _Event2['default'].add(inp, 'keydown', this.Evt.onKeyDown.bind(this));
	                            _Event2['default'].add(inp, 'keyup', this.Evt.onKeyUp.bind(this));
	                            _Event2['default'].add(inp, 'blur', this.Evt.onInpBlur.bind(this));
	
	                            if (this.rememberGridValues) {
	                                var flts_values = this.Mod.store.getFilterValues(this.fltsValuesCookie);
	                                if (flts_values[i] != ' ') {
	                                    this.setFilterValue(i, flts_values[i], false);
	                                }
	                            }
	                        }
	                        // this adds submit button
	                        if (i == n - 1 && this.displayBtn) {
	                            var btn = _Dom2['default'].create(this.fltTypeInp, ['id', this.prfxValButton + i + '_' + this.id], ['type', 'button'], ['value', this.btnText]);
	                            btn.className = this.btnCssClass;
	
	                            //filter is appended in desired element
	                            if (externalFltTgtId) {
	                                _Dom2['default'].id(externalFltTgtId).appendChild(btn);
	                            } else {
	                                fltcell.appendChild(btn);
	                            }
	
	                            _Event2['default'].add(btn, 'click', this.Evt.onBtnClick.bind(this));
	                        } //if
	                    } // for i
	                } else {
	                    this._resetGrid();
	                } //if isFirstLoad
	            } //if this.fltGrid
	
	            /* Filter behaviours */
	            if (this.hasVisibleRows) {
	                this.enforceVisibility();
	            }
	            if (this.rowsCounter) {
	                Mod.rowsCounter = new _RowsCounter.RowsCounter(this);
	                Mod.rowsCounter.init();
	            }
	            if (this.statusBar) {
	                Mod.statusBar = new _StatusBar.StatusBar(this);
	                Mod.statusBar.init();
	            }
	            if (this.paging || Mod.paging) {
	                if (!Mod.paging) {
	                    Mod.paging = new _Paging.Paging(this);
	                }
	
	                // TODO: handle both cases in paging init
	                if (Mod.paging.isPagingRemoved) {
	                    Mod.paging.reset();
	                } else {
	                    Mod.paging.init();
	                }
	            }
	            if (this.btnReset) {
	                Mod.clearButton = new _ClearButton.ClearButton(this);
	                Mod.clearButton.init();
	            }
	            if (this.helpInstructions) {
	                if (!Mod.help) {
	                    Mod.help = new _Help.Help(this);
	                }
	                Mod.help.init();
	            }
	            if (this.hasColWidths && !this.gridLayout) {
	                this.setColWidths();
	            }
	            if (this.alternateBgs) {
	                Mod.alternateRows = new _AlternateRows.AlternateRows(this);
	                Mod.alternateRows.init();
	            }
	
	            this.isFirstLoad = false;
	            this._hasGrid = true;
	
	            if (this.rememberGridValues || this.rememberPageLen || this.rememberPageNb) {
	                this.resetValues();
	            }
	
	            //TF css class is added to table
	            if (!this.gridLayout) {
	                _Dom2['default'].addClass(this.tbl, this.prfxTf);
	            }
	
	            if (this.loader) {
	                Mod.loader.show('none');
	            }
	
	            /* Loads extensions */
	            if (this.hasExtensions) {
	                this.initExtensions();
	            }
	
	            if (this.onFiltersLoaded) {
	                this.onFiltersLoaded.call(null, this);
	            }
	        }
	    }, {
	        key: 'EvtManager',
	
	        /**
	         * Manages state messages
	         * @param {String} evt Event name
	         * @param {Object} cfg Config object
	         */
	        value: function EvtManager(evt) {
	            var cfg = arguments[1] === undefined ? { slcIndex: null, slcExternal: false, slcId: null, pgIndex: null } : arguments[1];
	
	            var slcIndex = cfg.slcIndex;
	            var slcExternal = cfg.slcExternal;
	            var slcId = cfg.slcId;
	            var pgIndex = cfg.pgIndex;
	            var cpt = this.Mod;
	
	            function efx() {
	                /*jshint validthis:true */
	                var ev = this.Evt.name;
	
	                switch (evt) {
	                    case ev.filter:
	                        this._filter();
	                        break;
	                    case ev.dropdown:
	                        if (this.linkedFilters) {
	                            cpt.dropdown._build(slcIndex, true);
	                        } else {
	                            cpt.dropdown._build(slcIndex, false, slcExternal, slcId);
	                        }
	                        break;
	                    case ev.checklist:
	                        cpt.checkList._build(slcIndex, slcExternal, slcId);
	                        break;
	                    case ev.changepage:
	                        cpt.paging._changePage(pgIndex);
	                        break;
	                    case ev.clear:
	                        this._clearFilters();
	                        this._filter();
	                        break;
	                    case ev.changeresultsperpage:
	                        cpt.paging._changeResultsPerPage();
	                        break;
	                    case ev.resetvalues:
	                        this._resetValues();
	                        this._filter();
	                        break;
	                    case ev.resetpage:
	                        cpt.paging._resetPage(this.pgNbCookie);
	                        break;
	                    case ev.resetpagelength:
	                        cpt.paging._resetPageLength(this.pgLenCookie);
	                        break;
	                    case ev.loadextensions:
	                        this._loadExtensions();
	                        break;
	                    case ev.loadthemes:
	                        this._loadThemes();
	                        break;
	                }
	                if (this.statusBar) {
	                    cpt.statusBar.message('');
	                }
	                if (this.loader) {
	                    cpt.loader.show('none');
	                }
	            }
	
	            if (!this.loader && !this.statusBar && !this.linkedFilters) {
	                efx.call(this);
	            } else {
	                if (this.loader) {
	                    cpt.loader.show('');
	                }
	                if (this.statusBar) {
	                    cpt.statusBar.message(this['msg' + evt]);
	                }
	                global.setTimeout(efx.bind(this), this.execDelay);
	            }
	        }
	    }, {
	        key: 'feature',
	
	        /**
	         * Return a feature instance for a given name
	         * @param  {String} name Name of the feature
	         * @return {Object}
	         */
	        value: function feature(name) {
	            return this.Mod[name];
	        }
	    }, {
	        key: 'initExtensions',
	
	        /**
	         * Initialise all the extensions defined in the configuration object
	         */
	        value: function initExtensions() {
	            var exts = this.extensions;
	
	            for (var i = 0, len = exts.length; i < len; i++) {
	                var ext = exts[i];
	                if (!this.ExtRegistry[ext.name]) {
	                    this.loadExtension(ext);
	                }
	            }
	        }
	    }, {
	        key: 'loadExtension',
	
	        /**
	         * Load an extension module
	         * @param  {Object} ext Extension config object
	         */
	        value: function loadExtension(ext) {
	            var _this = this;
	
	            if (!ext || !ext.name) {
	                return;
	            }
	
	            var name = ext.name;
	            var path = ext.path;
	            var modulePath = undefined;
	
	            if (name && path) {
	                modulePath = ext.path + name;
	            } else {
	                name = name.replace('.js', '');
	                modulePath = 'extensions/{}/{}'.replace(/{}/g, name);
	            }
	
	            __webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(1)("./" + modulePath)]; (function (mod) {
	                var inst = new mod(_this, ext);
	                inst.init();
	                _this.ExtRegistry[name] = inst;
	            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	        }
	    }, {
	        key: 'extension',
	
	        /**
	         * Get an extension instance
	         * @param  {String} name Name of the extension
	         * @return {Object}      Extension instance
	         */
	        value: function extension(name) {
	            return this.ExtRegistry[name];
	        }
	    }, {
	        key: 'hasExtension',
	
	        /**
	         * Check passed extension name exists
	         * @param  {String}  name Name of the extension
	         * @return {Boolean}
	         */
	        value: function hasExtension(name) {
	            return !_Types2['default'].isEmpty(this.ExtRegistry[name]);
	        }
	    }, {
	        key: 'destroyExtensions',
	
	        /**
	         * Destroy all the extensions defined in the configuration object
	         */
	        value: function destroyExtensions() {
	            var exts = this.extensions;
	
	            for (var i = 0, len = exts.length; i < len; i++) {
	                var ext = exts[i];
	                var extInstance = this.ExtRegistry[ext.name];
	                if (extInstance) {
	                    extInstance.destroy();
	                    this.ExtRegistry[ext.name] = null;
	                }
	            }
	        }
	    }, {
	        key: 'loadThemes',
	        value: function loadThemes() {
	            this.EvtManager(this.Evt.name.loadthemes);
	        }
	    }, {
	        key: '_loadThemes',
	
	        /**
	         * Load themes defined in the configuration object
	         */
	        value: function _loadThemes() {
	            var themes = this.themes;
	            //Default theme config
	            if (this.enableDefaultTheme) {
	                var defaultTheme = { name: 'default' };
	                this.themes.push(defaultTheme);
	            }
	            if (_Types2['default'].isArray(themes)) {
	                for (var i = 0, len = themes.length; i < len; i++) {
	                    var theme = themes[i];
	                    var _name = theme.name;
	                    var path = theme.path;
	                    var styleId = this.prfxTf + _name;
	                    if (_name && !path) {
	                        path = this.themesPath + _name + '/' + _name + '.css';
	                    } else if (!_name && theme.path) {
	                        _name = 'theme{0}'.replace('{0}', i);
	                    }
	
	                    if (!this.isImported(path, 'link')) {
	                        this['import'](styleId, path, null, 'link');
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
	        }
	    }, {
	        key: 'getStylesheet',
	
	        /**
	         * Return stylesheet DOM element for a given theme name
	         * @return {DOMElement} stylesheet element
	         */
	        value: function getStylesheet() {
	            var name = arguments[0] === undefined ? 'default' : arguments[0];
	
	            return _Dom2['default'].id(this.prfxTf + name);
	        }
	    }, {
	        key: 'destroy',
	
	        /**
	         * Destroy filter grid
	         */
	        value: function destroy() {
	            if (!this._hasGrid) {
	                return;
	            }
	            var rows = this.tbl.rows,
	                Mod = this.Mod;
	
	            if (this.isExternalFlt && !this.popUpFilters) {
	                this.removeExternalFlts();
	            }
	            if (this.infDiv) {
	                this.removeToolbar();
	            }
	            if (this.highlightKeywords) {
	                Mod.highlightKeyword.unhighlightAll();
	            }
	            if (this.markActiveColumns) {
	                this.clearActiveColumns();
	            }
	            if (this.hasExtensions) {
	                this.destroyExtensions();
	            }
	
	            //this loop shows all rows and removes validRow attribute
	            for (var j = this.refRow; j < this.nbRows; j++) {
	                rows[j].style.display = '';
	
	                if (rows[j].hasAttribute('validRow')) {
	                    rows[j].removeAttribute('validRow');
	                }
	
	                //removes alternating colors
	                if (this.alternateBgs) {
	                    Mod.alternateRows.removeRowBg(j);
	                }
	            } //for j
	
	            if (this.fltGrid && !this.gridLayout) {
	                this.fltGridEl = rows[this.filtersRowIndex];
	                this.tbl.deleteRow(this.filtersRowIndex);
	            }
	
	            // Destroy modules
	            Object.keys(Mod).forEach(function (key) {
	                var feature = Mod[key];
	                if (feature && _Types2['default'].isFn(feature.destroy)) {
	                    feature.destroy();
	                }
	            });
	
	            _Dom2['default'].removeClass(this.tbl, this.prfxTf);
	            this.activeFlt = null;
	            this.isStartBgAlternate = true;
	            this._hasGrid = false;
	            this.tbl = null;
	        }
	    }, {
	        key: 'setToolbar',
	
	        /**
	         * Generate container element for paging, reset button, rows counter etc.
	         */
	        value: function setToolbar() {
	            if (this.infDiv) {
	                return;
	            }
	
	            /*** container div ***/
	            var infdiv = _Dom2['default'].create('div', ['id', this.prfxInfDiv + this.id]);
	            infdiv.className = this.infDivCssClass;
	
	            //custom container
	            if (this.toolBarTgtId) {
	                _Dom2['default'].id(this.toolBarTgtId).appendChild(infdiv);
	            }
	            //grid-layout
	            else if (this.gridLayout) {
	                var gridLayout = this.Mod.gridLayout;
	                gridLayout.tblMainCont.appendChild(infdiv);
	                infdiv.className = gridLayout.gridInfDivCssClass;
	            }
	            //default location: just above the table
	            else {
	                var cont = _Dom2['default'].create('caption');
	                cont.appendChild(infdiv);
	                this.tbl.insertBefore(cont, this.tbl.firstChild);
	            }
	            this.infDiv = _Dom2['default'].id(this.prfxInfDiv + this.id);
	
	            /*** left div containing rows # displayer ***/
	            var ldiv = _Dom2['default'].create('div', ['id', this.prfxLDiv + this.id]);
	            ldiv.className = this.lDivCssClass;
	            infdiv.appendChild(ldiv);
	            this.lDiv = _Dom2['default'].id(this.prfxLDiv + this.id);
	
	            /***    right div containing reset button
	                    + nb results per page select    ***/
	            var rdiv = _Dom2['default'].create('div', ['id', this.prfxRDiv + this.id]);
	            rdiv.className = this.rDivCssClass;
	            infdiv.appendChild(rdiv);
	            this.rDiv = _Dom2['default'].id(this.prfxRDiv + this.id);
	
	            /*** mid div containing paging elements ***/
	            var mdiv = _Dom2['default'].create('div', ['id', this.prfxMDiv + this.id]);
	            mdiv.className = this.mDivCssClass;
	            infdiv.appendChild(mdiv);
	            this.mDiv = _Dom2['default'].id(this.prfxMDiv + this.id);
	
	            // Enable help instructions by default if topbar is generated and not
	            // explicitely set to false
	            if (_Types2['default'].isUndef(this.helpInstructions)) {
	                if (!this.Mod.help) {
	                    this.Mod.help = new _Help.Help(this);
	                }
	                this.Mod.help.init();
	                this.helpInstructions = true;
	            }
	        }
	    }, {
	        key: 'removeToolbar',
	
	        /**
	         * Remove toolbar container element
	         */
	        value: function removeToolbar() {
	            if (!this.infDiv) {
	                return;
	            }
	            this.infDiv.parentNode.removeChild(this.infDiv);
	            this.infDiv = null;
	
	            var tbl = this.tbl;
	            var captions = _Dom2['default'].tag(tbl, 'caption');
	            if (captions.length > 0) {
	                [].forEach.call(captions, function (elm) {
	                    tbl.removeChild(elm);
	                });
	            }
	        }
	    }, {
	        key: 'removeExternalFlts',
	
	        /**
	         * Remove all the external column filters
	         */
	        value: function removeExternalFlts() {
	            if (!this.isExternalFlt || !this.externalFltTgtIds) {
	                return;
	            }
	            var ids = this.externalFltTgtIds,
	                len = ids.length;
	            for (var ct = 0; ct < len; ct++) {
	                var externalFltTgtId = ids[ct],
	                    externalFlt = _Dom2['default'].id(externalFltTgtId);
	                if (externalFlt) {
	                    externalFlt.innerHTML = '';
	                }
	            }
	        }
	    }, {
	        key: 'isCustomOptions',
	
	        /**
	         * Check if given column implements a filter with custom options
	         * @param  {Number}  colIndex Column's index
	         * @return {Boolean}
	         */
	        value: function isCustomOptions(colIndex) {
	            return this.hasCustomOptions && this.customOptions.cols.indexOf(colIndex) != -1;
	        }
	    }, {
	        key: 'getCustomOptions',
	
	        /**
	         * Returns an array [[value0, value1 ...],[text0, text1 ...]] with the
	         * custom options values and texts
	         * @param  {Number} colIndex Column's index
	         * @return {Array}
	         */
	        value: function getCustomOptions(colIndex) {
	            if (!colIndex || !this.isCustomOptions(colIndex)) {
	                return;
	            }
	
	            var customOptions = this.customOptions;
	            var cols = customOptions.cols;
	            var optTxt = [],
	                optArray = [];
	            var index = _Arr2['default'].indexByValue(cols, colIndex);
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
	        }
	    }, {
	        key: 'resetValues',
	        value: function resetValues() {
	            this.EvtManager(this.Evt.name.resetvalues);
	        }
	    }, {
	        key: '_resetValues',
	
	        /**
	         * Reset persisted filter values
	         */
	        value: function _resetValues() {
	            //only fillSlcOnDemand
	            if (this.rememberGridValues && this.fillSlcOnDemand) {
	                this._resetGridValues(this.fltsValuesCookie);
	            }
	            if (this.rememberPageLen && this.Mod.paging) {
	                this.Mod.paging.resetPageLength(this.pgLenCookie);
	            }
	            if (this.rememberPageNb && this.Mod.paging) {
	                this.Mod.paging.resetPage(this.pgNbCookie);
	            }
	        }
	    }, {
	        key: '_resetGridValues',
	
	        /**
	         * Reset persisted filter values when load filters on demand feature is
	         * enabled
	         * @param  {String} name cookie name storing filter values
	         */
	        value: function _resetGridValues(name) {
	            if (!this.fillSlcOnDemand) {
	                return;
	            }
	            var fltsValues = this.Mod.store.getFilterValues(name),
	                slcFltsIndex = this.getFiltersByType(this.fltTypeSlc, true),
	                multiFltsIndex = this.getFiltersByType(this.fltTypeMulti, true);
	
	            //if the number of columns is the same as before page reload
	            if (Number(fltsValues[fltsValues.length - 1]) === this.fltIds.length) {
	                for (var i = 0; i < fltsValues.length - 1; i++) {
	                    if (fltsValues[i] === ' ') {
	                        continue;
	                    }
	                    var s = undefined,
	                        opt = undefined;
	                    var fltType = this.getFilterType(i);
	                    // if fillSlcOnDemand, drop-down needs to contain stored
	                    // value(s) for filtering
	                    if (fltType === this.fltTypeSlc || fltType === this.fltTypeMulti) {
	                        var slc = _Dom2['default'].id(this.fltIds[i]);
	                        slc.options[0].selected = false;
	
	                        //selects
	                        if (_Arr2['default'].has(slcFltsIndex, i)) {
	                            opt = _Dom2['default'].createOpt(fltsValues[i], fltsValues[i], true);
	                            slc.appendChild(opt);
	                            this.hasStoredValues = true;
	                        }
	                        //multiple select
	                        if (_Arr2['default'].has(multiFltsIndex, i)) {
	                            s = fltsValues[i].split(' ' + this.orOperator + ' ');
	                            for (var j = 0, len = s.length; j < len; j++) {
	                                if (s[j] === '') {
	                                    continue;
	                                }
	                                opt = _Dom2['default'].createOpt(s[j], s[j], true);
	                                slc.appendChild(opt);
	                                this.hasStoredValues = true;
	                            }
	                        } // if multiFltsIndex
	                    } else if (fltType === this.fltTypeCheckList) {
	                        var checkList = this.Mod.checkList;
	                        var divChk = checkList.checkListDiv[i];
	                        divChk.title = divChk.innerHTML;
	                        divChk.innerHTML = '';
	
	                        var ul = _Dom2['default'].create('ul', ['id', this.fltIds[i]], ['colIndex', i]);
	                        ul.className = checkList.checkListCssClass;
	
	                        var li0 = _Dom2['default'].createCheckItem(this.fltIds[i] + '_0', '', this.displayAllText);
	                        li0.className = checkList.checkListItemCssClass;
	                        ul.appendChild(li0);
	
	                        divChk.appendChild(ul);
	
	                        s = fltsValues[i].split(' ' + this.orOperator + ' ');
	                        for (var j = 0, len = s.length; j < len; j++) {
	                            if (s[j] === '') {
	                                continue;
	                            }
	                            var li = _Dom2['default'].createCheckItem(this.fltIds[i] + '_' + (j + 1), s[j], s[j]);
	                            li.className = checkList.checkListItemCssClass;
	                            ul.appendChild(li);
	                            li.check.checked = true;
	                            checkList.setCheckListValues(li.check);
	                            this.hasStoredValues = true;
	                        }
	                    }
	                } //end for
	
	                if (!this.hasStoredValues && this.paging) {
	                    this.Mod.paging.setPagingInfo();
	                }
	            } //end if
	        }
	    }, {
	        key: 'filter',
	        value: function filter() {
	            this.EvtManager(this.Evt.name.filter);
	        }
	    }, {
	        key: '_filter',
	
	        /**
	         * Filter the table by retrieving the data from each cell in every single
	         * row and comparing it to the search term for current column. A row is
	         * hidden when all the search terms are not found in inspected row.
	         *
	         * TODO: Reduce complexity of this massive method
	         */
	        value: function _filter() {
	            if (!this.fltGrid || !this._hasGrid && !this.isFirstLoad) {
	                return;
	            }
	            //invoke onbefore callback
	            if (this.onBeforeFilter) {
	                this.onBeforeFilter.call(null, this);
	            }
	
	            var row = this.tbl.rows,
	                Mod = this.Mod,
	                hiddenrows = 0;
	
	            this.validRowsIndex = [];
	
	            // removes keyword highlighting
	            if (this.highlightKeywords) {
	                Mod.highlightKeyword.unhighlightAll();
	            }
	            //removes popup filters active icons
	            if (this.popUpFilters) {
	                Mod.popupFilter.buildIcons();
	            }
	            //removes active column header class
	            if (this.markActiveColumns) {
	                this.clearActiveColumns();
	            }
	            // search args re-init
	            this.searchArgs = this.getFiltersValue();
	
	            var num_cell_data, nbFormat;
	            var re_le = new RegExp(this.leOperator),
	                re_ge = new RegExp(this.geOperator),
	                re_l = new RegExp(this.lwOperator),
	                re_g = new RegExp(this.grOperator),
	                re_d = new RegExp(this.dfOperator),
	                re_lk = new RegExp(_Str2['default'].rgxEsc(this.lkOperator)),
	                re_eq = new RegExp(this.eqOperator),
	                re_st = new RegExp(this.stOperator),
	                re_en = new RegExp(this.enOperator),
	
	            // re_an = new RegExp(this.anOperator),
	            // re_cr = new RegExp(this.curExp),
	            re_em = this.emOperator,
	                re_nm = this.nmOperator,
	                re_re = new RegExp(_Str2['default'].rgxEsc(this.rgxOperator));
	
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
	                        w = _Dom2['default'].getText(cell);
	                    }
	                    if (w !== '') {
	                        Mod.highlightKeyword.highlight(cell, w, Mod.highlightKeyword.highlightCssClass);
	                    }
	                }
	            }
	
	            //looks for search argument in current row
	            function hasArg(sA, cell_data, j) {
	                /*jshint validthis:true */
	                var occurence = undefined,
	                    removeNbFormat = _Helpers2['default'].removeNbFormat;
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
	                var isLDate = hasLO && isValidDate(sA.replace(re_l, ''), dtType);
	                var isLEDate = hasLE && isValidDate(sA.replace(re_le, ''), dtType);
	                var isGDate = hasGR && isValidDate(sA.replace(re_g, ''), dtType);
	                var isGEDate = hasGE && isValidDate(sA.replace(re_ge, ''), dtType);
	                var isDFDate = hasDF && isValidDate(sA.replace(re_d, ''), dtType);
	                var isEQDate = hasEQ && isValidDate(sA.replace(re_eq, ''), dtType);
	
	                var dte1 = undefined,
	                    dte2 = undefined;
	                //dates
	                if (isValidDate(cell_data, dtType)) {
	                    dte1 = formatDate(cell_data, dtType);
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
	                        occurence = dte1.toString() != dte2.toString();
	                    }
	                    // equal date
	                    else if (isEQDate) {
	                        dte2 = formatDate(sA.replace(re_eq, ''), dtType);
	                        occurence = dte1.toString() == dte2.toString();
	                    }
	                    // searched keyword with * operator doesn't have to be a date
	                    else if (re_lk.test(sA)) {
	                        // like date
	                        occurence = this._containsStr(sA.replace(re_lk, ''), cell_data, null, false);
	                    } else if (isValidDate(sA, dtType)) {
	                        dte2 = formatDate(sA, dtType);
	                        occurence = dte1.toString() == dte2.toString();
	                    }
	                    //empty
	                    else if (hasEM) {
	                        occurence = _Str2['default'].isEmpty(cell_data);
	                    }
	                    //non-empty
	                    else if (hasNM) {
	                        occurence = !_Str2['default'].isEmpty(cell_data);
	                    }
	                } else {
	                    //first numbers need to be formated
	                    if (this.hasColNbFormat && this.colNbFormat[j]) {
	                        num_cell_data = removeNbFormat(cell_data, this.colNbFormat[j]);
	                        nbFormat = this.colNbFormat[j];
	                    } else {
	                        if (this.thousandsSeparator === ',' && this.decimalSeparator === '.') {
	                            num_cell_data = removeNbFormat(cell_data, 'us');
	                            nbFormat = 'us';
	                        } else {
	                            num_cell_data = removeNbFormat(cell_data, 'eu');
	                            nbFormat = 'eu';
	                        }
	                    }
	
	                    // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},
	                    // rgx:)
	                    // lower equal
	                    if (hasLE) {
	                        occurence = num_cell_data <= removeNbFormat(sA.replace(re_le, ''), nbFormat);
	                    }
	                    //greater equal
	                    else if (hasGE) {
	                        occurence = num_cell_data >= removeNbFormat(sA.replace(re_ge, ''), nbFormat);
	                    }
	                    //lower
	                    else if (hasLO) {
	                        occurence = num_cell_data < removeNbFormat(sA.replace(re_l, ''), nbFormat);
	                    }
	                    //greater
	                    else if (hasGR) {
	                        occurence = num_cell_data > removeNbFormat(sA.replace(re_g, ''), nbFormat);
	                    }
	                    //different
	                    else if (hasDF) {
	                        occurence = this._containsStr(sA.replace(re_d, ''), cell_data) ? false : true;
	                    }
	                    //like
	                    else if (hasLK) {
	                        occurence = this._containsStr(sA.replace(re_lk, ''), cell_data, null, false);
	                    }
	                    //equal
	                    else if (hasEQ) {
	                        occurence = this._containsStr(sA.replace(re_eq, ''), cell_data, null, true);
	                    }
	                    //starts with
	                    else if (hasST) {
	                        occurence = cell_data.indexOf(sA.replace(re_st, '')) === 0 ? true : false;
	                    }
	                    //ends with
	                    else if (hasEN) {
	                        var searchArg = sA.replace(re_en, '');
	                        occurence = cell_data.lastIndexOf(searchArg, cell_data.length - 1) === cell_data.length - 1 - (searchArg.length - 1) && cell_data.lastIndexOf(searchArg, cell_data.length - 1) > -1 ? true : false;
	                    }
	                    //empty
	                    else if (hasEM) {
	                        occurence = _Str2['default'].isEmpty(cell_data);
	                    }
	                    //non-empty
	                    else if (hasNM) {
	                        occurence = !_Str2['default'].isEmpty(cell_data);
	                    }
	                    //regexp
	                    else if (hasRE) {
	                        //in case regexp fires an exception
	                        try {
	                            //operator is removed
	                            var srchArg = sA.replace(re_re, '');
	                            var rgx = new RegExp(srchArg);
	                            occurence = rgx.test(cell_data);
	                        } catch (e) {
	                            occurence = false;
	                        }
	                    } else {
	                        occurence = this._containsStr(sA, cell_data, this.getFilterType(j));
	                    }
	                } //else
	                return occurence;
	            } //fn
	
	            for (var k = this.refRow; k < this.nbRows; k++) {
	                /*** if table already filtered some rows are not visible ***/
	                if (row[k].style.display === 'none') {
	                    row[k].style.display = '';
	                }
	
	                var cell = row[k].cells,
	                    nchilds = cell.length;
	
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
	                    var sA = this.searchArgs[this.singleSearchFlt ? 0 : j];
	                    var dtType = this.hasColDateType ? this.colDateType[j] : this.defaultDateType;
	                    if (sA === '') {
	                        continue;
	                    }
	
	                    var cell_data = _Str2['default'].matchCase(this.getCellData(j, cell[j]), this.caseSensitive);
	
	                    //multiple search parameter operator ||
	                    var sAOrSplit = sA.split(this.orOperator),
	
	                    //multiple search || parameter boolean
	                    hasMultiOrSA = sAOrSplit.length > 1 ? true : false,
	
	                    //multiple search parameter operator &&
	                    sAAndSplit = sA.split(this.anOperator),
	
	                    //multiple search && parameter boolean
	                    hasMultiAndSA = sAAndSplit.length > 1 ? true : false;
	
	                    //multiple sarch parameters
	                    if (hasMultiOrSA || hasMultiAndSA) {
	                        var cS = undefined,
	                            occur = false,
	                            s = hasMultiOrSA ? sAOrSplit : sAAndSplit;
	                        for (var w = 0, len = s.length; w < len; w++) {
	                            cS = _Str2['default'].trim(s[w]);
	                            occur = hasArg.call(this, cS, cell_data, j);
	                            highlight.call(this, cS, occur, cell[j]);
	                            if (hasMultiOrSA && occur) {
	                                break;
	                            }
	                            if (hasMultiAndSA && !occur) {
	                                break;
	                            }
	                        }
	                        occurence[j] = occur;
	                    }
	                    //single search parameter
	                    else {
	                        occurence[j] = hasArg.call(this, _Str2['default'].trim(sA), cell_data, j);
	                        highlight.call(this, sA, occurence[j], cell[j]);
	                    } //else single param
	
	                    if (!occurence[j]) {
	                        isRowValid = false;
	                    }
	                    if (this.singleSearchFlt && occurence[j]) {
	                        singleFltRowValid = true;
	                    }
	                    if (this.popUpFilters) {
	                        Mod.popupFilter.buildIcon(j, true);
	                    }
	                    if (this.markActiveColumns) {
	                        if (k === this.refRow) {
	                            if (this.onBeforeActiveColumn) {
	                                this.onBeforeActiveColumn.call(null, this, j);
	                            }
	                            _Dom2['default'].addClass(this.getHeaderElement(j), this.activeColumnsCssClass);
	                            if (this.onAfterActiveColumn) {
	                                this.onAfterActiveColumn.call(null, this, j);
	                            }
	                        }
	                    }
	                } //for j
	
	                if (this.singleSearchFlt && singleFltRowValid) {
	                    isRowValid = true;
	                }
	
	                if (!isRowValid) {
	                    this.validateRow(k, false);
	                    if (Mod.alternateRows) {
	                        Mod.alternateRows.removeRowBg(k);
	                    }
	                    // always visible rows need to be counted as valid
	                    if (this.hasVisibleRows && this.visibleRows.indexOf(k) !== -1) {
	                        this.validRowsIndex.push(k);
	                    } else {
	                        hiddenrows++;
	                    }
	                } else {
	                    this.validateRow(k, true);
	                    this.validRowsIndex.push(k);
	                    if (this.alternateBgs) {
	                        Mod.alternateRows.setRowBg(k, this.validRowsIndex.length);
	                    }
	                    if (this.onRowValidated) {
	                        this.onRowValidated.call(null, this, k);
	                    }
	                }
	            } // for k
	
	            this.nbVisibleRows = this.validRowsIndex.length;
	            this.nbHiddenRows = hiddenrows;
	
	            if (this.rememberGridValues) {
	                Mod.store.saveFilterValues(this.fltsValuesCookie);
	            }
	            //applies filter props after filtering process
	            if (!this.paging) {
	                this.applyProps();
	            } else {
	                // Shouldn't need to care of that here...
	                // TODO: provide a method in paging module
	                Mod.paging.startPagingRow = 0;
	                Mod.paging.currentPageNb = 1;
	                //
	                Mod.paging.setPagingInfo(this.validRowsIndex);
	            }
	            //invokes onafter callback
	            if (this.onAfterFilter) {
	                this.onAfterFilter.call(null, this);
	            }
	        }
	    }, {
	        key: 'applyProps',
	
	        /**
	         * Re-apply the features/behaviour concerned by filtering/paging operation
	         *
	         * NOTE: this will disappear whenever custom events in place
	         */
	        value: function applyProps() {
	            var Mod = this.Mod;
	
	            //shows rows always visible
	            if (this.hasVisibleRows) {
	                this.enforceVisibility();
	            }
	            //columns operations
	            if (this.hasExtension('colOps')) {
	                this.extension('colOps').calc();
	            }
	
	            //re-populates drop-down filters
	            if (this.linkedFilters) {
	                this.linkFilters();
	            }
	
	            if (this.rowsCounter) {
	                Mod.rowsCounter.refresh(this.nbVisibleRows);
	            }
	
	            if (this.popUpFilters) {
	                Mod.popupFilter.closeAll();
	            }
	        }
	    }, {
	        key: 'getColValues',
	
	        /**
	         * Return the data of a specified colum
	         * @param  {Number} colindex Column index
	         * @param  {Boolean} num     Return unformatted number
	         * @param  {Array} exclude   List of row indexes to be excluded
	         * @return {Array}           Flat list of data for a column
	         */
	        value: function getColValues(colindex) {
	            var num = arguments[1] === undefined ? false : arguments[1];
	            var exclude = arguments[2] === undefined ? undefined : arguments[2];
	
	            if (!this.fltGrid) {
	                return;
	            }
	            var row = this.tbl.rows,
	                colValues = [];
	
	            for (var i = this.refRow; i < this.nbRows; i++) {
	                var isExludedRow = false;
	                // checks if current row index appears in exclude array
	                if (exclude && _Types2['default'].isArray(exclude)) {
	                    isExludedRow = _Arr2['default'].has(exclude, i);
	                }
	                var cell = row[i].cells,
	                    nchilds = cell.length;
	
	                // checks if row has exact cell # and is not excluded
	                if (nchilds === this.nbCells && !isExludedRow) {
	                    // this loop retrieves cell data
	                    for (var j = 0; j < nchilds; j++) {
	                        if (j != colindex || row[i].style.display !== '') {
	                            continue;
	                        }
	                        var cell_data = _Str2['default'].lower(this.getCellData(j, cell[j])),
	                            nbFormat = this.colNbFormat ? this.colNbFormat[colindex] : null,
	                            data = num ? _Helpers2['default'].removeNbFormat(cell_data, nbFormat) : cell_data;
	                        colValues.push(data);
	                    }
	                }
	            }
	            return colValues;
	        }
	    }, {
	        key: 'getFilterValue',
	
	        /**
	         * Return the filter's value of a specified column
	         * @param  {Number} index Column index
	         * @return {String}       Filter value
	         */
	        value: function getFilterValue(index) {
	            if (!this.fltGrid) {
	                return;
	            }
	            var fltValue = undefined,
	                flt = this.getFilterElement(index);
	            if (!flt) {
	                return '';
	            }
	
	            var fltColType = this.getFilterType(index);
	            if (fltColType !== this.fltTypeMulti && fltColType !== this.fltTypeCheckList) {
	                fltValue = flt.value;
	            }
	            //mutiple select
	            else if (fltColType === this.fltTypeMulti) {
	                fltValue = '';
	                for (var j = 0, len = flt.options.length; j < len; j++) {
	                    if (flt.options[j].selected) {
	                        fltValue = fltValue.concat(flt.options[j].value + ' ' + this.orOperator + ' ');
	                    }
	                }
	                //removes last operator ||
	                fltValue = fltValue.substr(0, fltValue.length - 4);
	            }
	            //checklist
	            else if (fltColType === this.fltTypeCheckList) {
	                if (flt.getAttribute('value') !== null) {
	                    fltValue = flt.getAttribute('value');
	                    //removes last operator ||
	                    fltValue = fltValue.substr(0, fltValue.length - 3);
	                } else {
	                    fltValue = '';
	                }
	            }
	            return fltValue;
	        }
	    }, {
	        key: 'getFiltersValue',
	
	        /**
	         * Return the filters' values
	         * @return {Array} List of filters' values
	         */
	        value: function getFiltersValue() {
	            if (!this.fltGrid) {
	                return;
	            }
	            var searchArgs = [];
	            for (var i = 0, len = this.fltIds.length; i < len; i++) {
	                searchArgs.push(_Str2['default'].trim(_Str2['default'].matchCase(this.getFilterValue(i), this.caseSensitive)));
	            }
	            return searchArgs;
	        }
	    }, {
	        key: 'getFilterId',
	
	        /**
	         * Return the ID of the filter of a specified column
	         * @param  {Number} index Column's index
	         * @return {String}       ID of the filter element
	         */
	        value: function getFilterId(index) {
	            if (!this.fltGrid) {
	                return;
	            }
	            return this.fltIds[index];
	        }
	    }, {
	        key: 'getFiltersByType',
	
	        /**
	         * Return the list of ids of filters matching a specified type.
	         * Note: hidden filters are also returned
	         *
	         * @param  {String} type  Filter type string ('input', 'select', 'multiple',
	         *                        'checklist')
	         * @param  {Boolean} bool If true returns columns indexes instead of IDs
	         * @return {[type]}       List of element IDs or column indexes
	         */
	        value: function getFiltersByType(type, bool) {
	            if (!this.fltGrid) {
	                return;
	            }
	            var arr = [];
	            for (var i = 0, len = this.fltIds.length; i < len; i++) {
	                var fltType = this.getFilterType(i);
	                if (fltType === _Str2['default'].lower(type)) {
	                    var a = bool ? i : this.fltIds[i];
	                    arr.push(a);
	                }
	            }
	            return arr;
	        }
	    }, {
	        key: 'getFilterElement',
	
	        /**
	         * Return the filter's DOM element for a given column
	         * @param  {Number} index     Column's index
	         * @return {DOMElement}
	         */
	        value: function getFilterElement(index) {
	            var fltId = this.fltIds[index];
	            return _Dom2['default'].id(fltId);
	        }
	    }, {
	        key: 'getCellsNb',
	
	        /**
	         * Return the number of cells for a given row index
	         * @param  {Number} rowIndex Index of the row
	         * @return {Number}          Number of cells
	         */
	        value: function getCellsNb() {
	            var rowIndex = arguments[0] === undefined ? 0 : arguments[0];
	
	            var tr = this.tbl.rows[rowIndex];
	            return tr.cells.length;
	        }
	    }, {
	        key: 'getRowsNb',
	
	        /**
	         * Return the number of filterable rows starting from reference row if
	         * defined
	         * @param  {Boolean} includeHeaders Include the headers row
	         * @return {Number}                 Number of filterable rows
	         */
	        value: function getRowsNb(includeHeaders) {
	            var s = _Types2['default'].isUndef(this.refRow) ? 0 : this.refRow,
	                ntrs = this.tbl.rows.length;
	            if (includeHeaders) {
	                s = 0;
	            }
	            return parseInt(ntrs - s, 10);
	        }
	    }, {
	        key: 'getCellData',
	
	        /**
	         * Return the data of a given cell
	         * @param  {Number} i    Column's index
	         * @param  {Object} cell Cell's DOM object
	         * @return {String}
	         */
	        value: function getCellData(i, cell) {
	            if (_Types2['default'].isUndef(i) || !cell) {
	                return '';
	            }
	            //First checks for customCellData event
	            if (this.customCellData && _Arr2['default'].has(this.customCellDataCols, i)) {
	                return this.customCellData.call(null, this, cell, i);
	            } else {
	                return _Dom2['default'].getText(cell);
	            }
	        }
	    }, {
	        key: 'getTableData',
	
	        /**
	         * Return the table data with following format:
	         * [
	         *     [rowIndex, [value0, value1...]],
	         *     [rowIndex, [value0, value1...]]
	         * ]
	         * @return {Array}
	         *
	         * TODO: provide an API returning data in JSON format
	         */
	        value: function getTableData() {
	            var row = this.tbl.rows;
	            for (var k = this.refRow; k < this.nbRows; k++) {
	                var rowData = [k, []];
	                var cells = row[k].cells;
	                // this loop retrieves cell data
	                for (var j = 0, len = cells.length; j < len; j++) {
	                    var cell_data = this.getCellData(j, cells[j]);
	                    rowData[1].push(cell_data);
	                }
	                this.tblData.push(rowData);
	            }
	            return this.tblData;
	        }
	    }, {
	        key: 'getFilteredData',
	
	        /**
	         * Return the filtered data with following format:
	         * [
	         *     [rowIndex, [value0, value1...]],
	         *     [rowIndex, [value0, value1...]]
	         * ]
	         * @param  {Boolean} includeHeaders  Include headers row
	         * @return {Array}
	         *
	         * TODO: provide an API returning data in JSON format
	         */
	        value: function getFilteredData(includeHeaders) {
	            if (!this.validRowsIndex) {
	                return [];
	            }
	            var row = this.tbl.rows,
	                filteredData = [];
	            if (includeHeaders) {
	                var table = this.gridLayout ? this.Mod.gridLayout.headTbl : this.tbl,
	                    r = table.rows[this.headersRow],
	                    rowData = [r.rowIndex, []];
	                for (var j = 0; j < this.nbCells; j++) {
	                    var headerText = this.getCellData(j, r.cells[j]);
	                    rowData[1].push(headerText);
	                }
	                filteredData.push(rowData);
	            }
	
	            var validRows = this.getValidRows(true);
	            for (var i = 0; i < validRows.length; i++) {
	                var rData = [this.validRowsIndex[i], []],
	                    cells = row[this.validRowsIndex[i]].cells;
	                for (var k = 0; k < cells.length; k++) {
	                    var cell_data = this.getCellData(k, cells[k]);
	                    rData[1].push(cell_data);
	                }
	                filteredData.push(rData);
	            }
	            return filteredData;
	        }
	    }, {
	        key: 'getFilteredDataCol',
	
	        /**
	         * Return the filtered data for a given column index
	         * @param  {Number} colIndex Colmun's index
	         * @return {Array}           Flat list of values ['val0','val1','val2'...]
	         *
	         * TODO: provide an API returning data in JSON format
	         */
	        value: function getFilteredDataCol(colIndex) {
	            if (colIndex === undefined) {
	                return [];
	            }
	            var data = this.getFilteredData(),
	                colData = [];
	            for (var i = 0, len = data.length; i < len; i++) {
	                var r = data[i],
	
	                //cols values of current row
	                d = r[1],
	
	                //data of searched column
	                c = d[colIndex];
	                colData.push(c);
	            }
	            return colData;
	        }
	    }, {
	        key: 'getRowDisplay',
	
	        /**
	         * Get the display value of a row
	         * @param  {RowElement} DOM element of the row
	         * @return {String}     Usually 'none' or ''
	         */
	        value: function getRowDisplay(row) {
	            if (!this.fltGrid || !_Types2['default'].isObj(row)) {
	                return;
	            }
	            return row.style.display;
	        }
	    }, {
	        key: 'validateRow',
	
	        /**
	         * Validate/invalidate row by setting the 'validRow' attribute on the row
	         * @param  {Number}  rowIndex Index of the row
	         * @param  {Boolean} isValid
	         */
	        value: function validateRow(rowIndex, isValid) {
	            var row = this.tbl.rows[rowIndex];
	            if (!row || typeof isValid !== 'boolean') {
	                return;
	            }
	
	            // always visible rows are valid
	            if (this.hasVisibleRows && this.visibleRows.indexOf(rowIndex) !== -1) {
	                isValid = true;
	            }
	
	            var displayFlag = isValid ? '' : 'none',
	                validFlag = isValid ? 'true' : 'false';
	            row.style.display = displayFlag;
	
	            if (this.paging) {
	                row.setAttribute('validRow', validFlag);
	            }
	        }
	    }, {
	        key: 'validateAllRows',
	
	        /**
	         * Validate all filterable rows
	         */
	        value: function validateAllRows() {
	            if (!this._hasGrid) {
	                return;
	            }
	            this.validRowsIndex = [];
	            for (var k = this.refRow; k < this.nbFilterableRows; k++) {
	                this.validateRow(k, true);
	                this.validRowsIndex.push(k);
	            }
	        }
	    }, {
	        key: 'setFilterValue',
	
	        /**
	         * Set search value to a given filter
	         * @param {Number} index     Column's index
	         * @param {String} searcharg Search term
	         */
	        value: function setFilterValue(index) {
	            var searcharg = arguments[1] === undefined ? '' : arguments[1];
	
	            if (!this.fltGrid && !this.isFirstLoad || !this.getFilterElement(index)) {
	                return;
	            }
	            var slc = this.getFilterElement(index),
	                fltColType = this.getFilterType(index);
	
	            if (fltColType !== this.fltTypeMulti && fltColType != this.fltTypeCheckList) {
	                slc.value = searcharg;
	            }
	            //multiple selects
	            else if (fltColType === this.fltTypeMulti) {
	                var s = searcharg.split(' ' + this.orOperator + ' ');
	                // let ct = 0; //keywords counter
	                for (var j = 0, len = slc.options.length; j < len; j++) {
	                    var option = slc.options[j];
	                    if (s === '' || s[0] === '') {
	                        option.selected = false;
	                    }
	                    if (option.value === '') {
	                        option.selected = false;
	                    }
	                    if (option.value !== '' && _Arr2['default'].has(s, option.value, true)) {
	                        option.selected = true;
	                    } //if
	                } //for j
	            }
	            //checklist
	            else if (fltColType === this.fltTypeCheckList) {
	                searcharg = _Str2['default'].matchCase(searcharg, this.caseSensitive);
	                var sarg = searcharg.split(' ' + this.orOperator + ' ');
	                var lisNb = _Dom2['default'].tag(slc, 'li').length;
	
	                slc.setAttribute('value', '');
	                slc.setAttribute('indexes', '');
	
	                for (var k = 0; k < lisNb; k++) {
	                    var li = _Dom2['default'].tag(slc, 'li')[k],
	                        lbl = _Dom2['default'].tag(li, 'label')[0],
	                        chk = _Dom2['default'].tag(li, 'input')[0],
	                        lblTxt = _Str2['default'].matchCase(_Dom2['default'].getText(lbl), this.caseSensitive);
	                    if (lblTxt !== '' && _Arr2['default'].has(sarg, lblTxt, true)) {
	                        chk.checked = true;
	                        this.Mod.checkList.setCheckListValues(chk);
	                    } else {
	                        chk.checked = false;
	                        this.Mod.checkList.setCheckListValues(chk);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'setColWidths',
	
	        /**
	         * Set them columns' widths as per configuration
	         * @param {Number} rowIndex Optional row index to apply the widths to
	         * @param {Element} tbl DOM element
	         */
	        value: function setColWidths(rowIndex, tbl) {
	            if (!this.fltGrid || !this.hasColWidths) {
	                return;
	            }
	            tbl = tbl || this.tbl;
	            var rIndex = undefined;
	            if (rowIndex === undefined) {
	                rIndex = tbl.rows[0].style.display != 'none' ? 0 : 1;
	            } else {
	                rIndex = rowIndex;
	            }
	
	            setWidths.call(this, tbl.rows[rIndex]);
	
	            function setWidths(row) {
	                /*jshint validthis:true */
	                var nbCols = this.nbCells;
	                var colWidths = this.colWidths;
	                if (nbCols != colWidths.length || nbCols != row.cells.length) {
	                    throw new Error('Columns number mismatch!');
	                }
	
	                var colTags = _Dom2['default'].tag(tbl, 'col');
	                var tblHasColTag = colTags.length > 0;
	                var frag = !tblHasColTag ? doc.createDocumentFragment() : null;
	                for (var k = 0; k < nbCols; k++) {
	                    // row.cells[k].style.width = colWidths[k];
	                    var col = undefined;
	                    if (tblHasColTag) {
	                        col = colTags[k];
	                    } else {
	                        col = _Dom2['default'].create('col', ['id', this.id + '_col_' + k]);
	                        frag.appendChild(col);
	                    }
	                    col.style.width = colWidths[k];
	                }
	                if (!tblHasColTag) {
	                    tbl.insertBefore(frag, tbl.firstChild);
	                }
	            }
	        }
	    }, {
	        key: 'enforceVisibility',
	
	        /**
	         * Makes defined rows always visible
	         */
	        value: function enforceVisibility() {
	            if (!this.hasVisibleRows) {
	                return;
	            }
	            for (var i = 0, len = this.visibleRows.length; i < len; i++) {
	                var row = this.visibleRows[i];
	                //row index cannot be > nrows
	                if (row <= this.nbRows) {
	                    this.validateRow(row, true);
	                }
	            }
	        }
	    }, {
	        key: 'clearFilters',
	        value: function clearFilters() {
	            this.EvtManager(this.Evt.name.clear);
	        }
	    }, {
	        key: '_clearFilters',
	
	        /**
	         * Clear all the filters' values
	         */
	        value: function _clearFilters() {
	            if (!this.fltGrid) {
	                return;
	            }
	            if (this.onBeforeReset) {
	                this.onBeforeReset.call(null, this, this.getFiltersValue());
	            }
	            for (var i = 0, len = this.fltIds.length; i < len; i++) {
	                this.setFilterValue(i, '');
	            }
	            if (this.linkedFilters) {
	                this.activeFilterId = '';
	                this.linkFilters();
	            }
	            if (this.rememberPageLen) {
	                _Cookie2['default'].remove(this.pgLenCookie);
	            }
	            if (this.rememberPageNb) {
	                _Cookie2['default'].remove(this.pgNbCookie);
	            }
	            if (this.onAfterReset) {
	                this.onAfterReset.call(null, this);
	            }
	        }
	    }, {
	        key: 'clearActiveColumns',
	
	        /**
	         * Clears filtered columns visual indicator (background color)
	         * @return {[type]} [description]
	         */
	        value: function clearActiveColumns() {
	            for (var i = 0, len = this.fltIds.length; i < len; i++) {
	                _Dom2['default'].removeClass(this.getHeaderElement(i), this.activeColumnsCssClass);
	            }
	        }
	    }, {
	        key: 'linkFilters',
	
	        /**
	         * Refresh the filters subject to linking ('select', 'multiple',
	         * 'checklist' type)
	         */
	        value: function linkFilters() {
	            if (!this.activeFilterId) {
	                return;
	            }
	            var slcA1 = this.getFiltersByType(this.fltTypeSlc, true),
	                slcA2 = this.getFiltersByType(this.fltTypeMulti, true),
	                slcA3 = this.getFiltersByType(this.fltTypeCheckList, true),
	                slcIndex = slcA1.concat(slcA2);
	            slcIndex = slcIndex.concat(slcA3);
	
	            var activeFlt = this.activeFilterId.split('_')[0];
	            activeFlt = activeFlt.split(this.prfxFlt)[1];
	            var slcSelectedValue = undefined;
	            for (var i = 0, len = slcIndex.length; i < len; i++) {
	                var curSlc = _Dom2['default'].id(this.fltIds[slcIndex[i]]);
	                slcSelectedValue = this.getFilterValue(slcIndex[i]);
	
	                // Welcome to cyclomatic complexity hell :)
	                // TODO: simplify/refactor if statement
	                if (activeFlt !== slcIndex[i] || this.paging && _Arr2['default'].has(slcA1, slcIndex[i]) && activeFlt === slcIndex[i] || !this.paging && (_Arr2['default'].has(slcA3, slcIndex[i]) || _Arr2['default'].has(slcA2, slcIndex[i])) || slcSelectedValue === this.displayAllText) {
	
	                    if (_Arr2['default'].has(slcA3, slcIndex[i])) {
	                        this.Mod.checkList.checkListDiv[slcIndex[i]].innerHTML = '';
	                    } else {
	                        curSlc.innerHTML = '';
	                    }
	
	                    //1st option needs to be inserted
	                    if (this.fillSlcOnDemand) {
	                        var opt0 = _Dom2['default'].createOpt(this.displayAllText, '');
	                        if (curSlc) {
	                            curSlc.appendChild(opt0);
	                        }
	                    }
	
	                    if (_Arr2['default'].has(slcA3, slcIndex[i])) {
	                        this.Mod.checkList._build(slcIndex[i]);
	                    } else {
	                        this.Mod.dropdown._build(slcIndex[i], true);
	                    }
	
	                    this.setFilterValue(slcIndex[i], slcSelectedValue);
	                }
	            } // for i
	        }
	    }, {
	        key: '_resetGrid',
	
	        /**
	         * Re-generate the filters grid bar when previously removed
	         */
	        value: function _resetGrid() {
	            if (this.isFirstLoad) {
	                return;
	            }
	
	            var Mod = this.Mod;
	            var tbl = this.tbl;
	            var rows = tbl.rows;
	            var filtersRowIndex = this.filtersRowIndex;
	            var filtersRow = rows[filtersRowIndex];
	
	            // grid was removed, grid row element is stored in fltGridEl property
	            if (!this.gridLayout) {
	                // If table has a thead ensure the filters row is appended in the
	                // thead element
	                if (tbl.tHead) {
	                    var tempRow = tbl.tHead.insertRow(this.filtersRowIndex);
	                    tbl.tHead.replaceChild(this.fltGridEl, tempRow);
	                } else {
	                    filtersRow.parentNode.insertBefore(this.fltGridEl, filtersRow);
	                }
	            }
	
	            // filters are appended in external placeholders elements
	            if (this.isExternalFlt) {
	                var externalFltTgtIds = this.externalFltTgtIds;
	                for (var ct = 0, len = externalFltTgtIds.length; ct < len; ct++) {
	                    var extFlt = _Dom2['default'].id(externalFltTgtIds[ct]);
	
	                    if (!extFlt) {
	                        continue;
	                    }
	
	                    var externalFltEl = this.externalFltEls[ct];
	                    extFlt.appendChild(externalFltEl);
	                    var colFltType = this.getFilterType(ct);
	                    //IE special treatment for gridLayout, appended filters are
	                    //empty
	                    if (this.gridLayout && externalFltEl.innerHTML === '' && colFltType !== this.fltTypeInp) {
	                        if (colFltType === this.fltTypeSlc || colFltType === this.fltTypeMulti) {
	                            Mod.dropdown.build(ct);
	                        }
	                        if (colFltType === this.fltTypeCheckList) {
	                            Mod.checkList.build(ct);
	                        }
	                    }
	                }
	            }
	
	            this.nbFilterableRows = this.getRowsNb();
	            this.nbVisibleRows = this.nbFilterableRows;
	            this.nbRows = rows.length;
	
	            if (this.popUpFilters) {
	                this.headersRow++;
	                Mod.popupFilter.buildAll();
	            }
	
	            if (!this.gridLayout) {
	                _Dom2['default'].addClass(this.tbl, this.prfxTf);
	            }
	            this._hasGrid = true;
	        }
	    }, {
	        key: '_containsStr',
	
	        /**
	         * Checks if passed data contains the searched arg
	         * @param  {String} arg         Search term
	         * @param  {String} data        Data string
	         * @param  {String} fltType     Filter type ('input', 'select')
	         * @param  {Boolean} forceMatch Exact match
	         * @return {Boolean]}
	         *
	         * TODO: move into string module, remove fltType in order to decouple it
	         * from TableFilter module
	         */
	        value: function _containsStr(arg, data, fltType, forceMatch) {
	            // Improved by Cedric Wartel (cwl)
	            // automatic exact match for selects and special characters are now
	            // filtered
	            var regexp = undefined,
	                modifier = this.caseSensitive ? 'g' : 'gi',
	                exactMatch = !forceMatch ? this.exactMatch : forceMatch;
	            if (exactMatch || fltType !== this.fltTypeInp && fltType) {
	                regexp = new RegExp('(^\\s*)' + _Str2['default'].rgxEsc(arg) + '(\\s*$)', modifier);
	            } else {
	                regexp = new RegExp(_Str2['default'].rgxEsc(arg), modifier);
	            }
	            return regexp.test(data);
	        }
	    }, {
	        key: 'isImported',
	
	        /**
	         * Check if passed script or stylesheet is already imported
	         * @param  {String}  filePath Ressource path
	         * @param  {String}  type     Possible values: 'script' or 'link'
	         * @return {Boolean}
	         */
	        value: function isImported(filePath, type) {
	            var imported = false,
	                importType = !type ? 'script' : type,
	                attr = importType == 'script' ? 'src' : 'href',
	                files = _Dom2['default'].tag(doc, importType);
	            for (var i = 0, len = files.length; i < len; i++) {
	                if (files[i][attr] === undefined) {
	                    continue;
	                }
	                if (files[i][attr].match(filePath)) {
	                    imported = true;
	                    break;
	                }
	            }
	            return imported;
	        }
	    }, {
	        key: 'import',
	
	        /**
	         * Import script or stylesheet
	         * @param  {String}   fileId   Ressource ID
	         * @param  {String}   filePath Ressource path
	         * @param  {Function} callback Callback
	         * @param  {String}   type     Possible values: 'script' or 'link'
	         */
	        value: function _import(fileId, filePath, callback, type) {
	            var ftype = !type ? 'script' : type,
	                imported = this.isImported(filePath, ftype);
	            if (imported) {
	                return;
	            }
	            var o = this,
	                isLoaded = false,
	                file = undefined,
	                head = _Dom2['default'].tag(doc, 'head')[0];
	
	            if (_Str2['default'].lower(ftype) === 'link') {
	                file = _Dom2['default'].create('link', ['id', fileId], ['type', 'text/css'], ['rel', 'stylesheet'], ['href', filePath]);
	            } else {
	                file = _Dom2['default'].create('script', ['id', fileId], ['type', 'text/javascript'], ['src', filePath]);
	            }
	
	            //Browser <> IE onload event works only for scripts, not for stylesheets
	            file.onload = file.onreadystatechange = function () {
	                if (!isLoaded && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
	                    isLoaded = true;
	                    if (typeof callback === 'function') {
	                        callback.call(null, o);
	                    }
	                }
	            };
	            file.onerror = function () {
	                throw new Error('TF script could not load: ' + filePath);
	            };
	            head.appendChild(file);
	        }
	    }, {
	        key: 'hasGrid',
	
	        /**
	         * Check if table has filters grid
	         * @return {Boolean}
	         */
	        value: function hasGrid() {
	            return this._hasGrid;
	        }
	    }, {
	        key: 'getFiltersId',
	
	        /**
	         * Get list of filter IDs
	         * @return {[type]} [description]
	         */
	        value: function getFiltersId() {
	            return this.fltIds || [];
	        }
	    }, {
	        key: 'getValidRows',
	
	        /**
	         * Get filtered (valid) rows indexes
	         * @param  {Boolean} reCalc Force calculation of filtered rows list
	         * @return {Array}          List of row indexes
	         */
	        value: function getValidRows(reCalc) {
	            if (!reCalc) {
	                return this.validRowsIndex;
	            }
	
	            this.validRowsIndex = [];
	            for (var k = this.refRow; k < this.getRowsNb(true); k++) {
	                var r = this.tbl.rows[k];
	                if (!this.paging) {
	                    if (this.getRowDisplay(r) !== 'none') {
	                        this.validRowsIndex.push(r.rowIndex);
	                    }
	                } else {
	                    if (r.getAttribute('validRow') === 'true' || r.getAttribute('validRow') === null) {
	                        this.validRowsIndex.push(r.rowIndex);
	                    }
	                }
	            }
	            return this.validRowsIndex;
	        }
	    }, {
	        key: 'getFiltersRowIndex',
	
	        /**
	         * Get the index of the row containing the filters
	         * @return {Number}
	         */
	        value: function getFiltersRowIndex() {
	            return this.filtersRowIndex;
	        }
	    }, {
	        key: 'getHeadersRowIndex',
	
	        /**
	         * Get the index of the headers row
	         * @return {Number}
	         */
	        value: function getHeadersRowIndex() {
	            return this.headersRow;
	        }
	    }, {
	        key: 'getStartRowIndex',
	
	        /**
	         * Get the row index from where the filtering process start (1st filterable
	         * row)
	         * @return {Number}
	         */
	        value: function getStartRowIndex() {
	            return this.refRow;
	        }
	    }, {
	        key: 'getLastRowIndex',
	
	        /**
	         * Get the index of the last row
	         * @return {Number}
	         */
	        value: function getLastRowIndex() {
	            if (!this._hasGrid) {
	                return;
	            }
	            return this.nbRows - 1;
	        }
	    }, {
	        key: 'getHeaderElement',
	
	        /**
	         * Get the header DOM element for a given column index
	         * @param  {Number} colIndex Column index
	         * @return {Object}
	         */
	        value: function getHeaderElement(colIndex) {
	            var table = this.gridLayout ? this.Mod.gridLayout.headTbl : this.tbl;
	            var tHead = _Dom2['default'].tag(table, 'thead');
	            var headersRow = this.headersRow;
	            var header = undefined;
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
	        }
	    }, {
	        key: 'getFilterType',
	
	        /**
	         * Return the filter type for a specified column
	         * @param  {Number} colIndex Column's index
	         * @return {String}
	         */
	        value: function getFilterType(colIndex) {
	            var colType = this.cfg['col_' + colIndex];
	            return !colType ? this.fltTypeInp : _Str2['default'].lower(colType);
	        }
	    }, {
	        key: 'getFilterableRowsNb',
	
	        /**
	         * Get the total number of filterable rows
	         * @return {Number}
	         */
	        value: function getFilterableRowsNb() {
	            return this.getRowsNb(false);
	        }
	    }, {
	        key: 'config',
	
	        /**
	         * Get the configuration object (literal object)
	         * @return {Object}
	         */
	        value: function config() {
	            return this.cfg;
	        }
	    }]);
	
	    return TableFilter;
	})();
	
	exports.TableFilter = TableFilter;

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	/**
	 * DOM event utilities
	 */
	
	exports['default'] = {
	    add: function add(obj, type, func, capture) {
	        if (obj.addEventListener) {
	            obj.addEventListener(type, func, capture);
	        } else if (obj.attachEvent) {
	            obj.attachEvent('on' + type, func);
	        } else {
	            obj['on' + type] = func;
	        }
	    },
	    remove: function remove(obj, type, func, capture) {
	        if (obj.detachEvent) {
	            obj.detachEvent('on' + type, func);
	        } else if (obj.removeEventListener) {
	            obj.removeEventListener(type, func, capture);
	        } else {
	            obj['on' + type] = null;
	        }
	    },
	    stop: function stop(evt) {
	        if (!evt) {
	            evt = window.event;
	        }
	        if (evt.stopPropagation) {
	            evt.stopPropagation();
	        } else {
	            evt.cancelBubble = true;
	        }
	    },
	    cancel: function cancel(evt) {
	        if (!evt) {
	            evt = window.event;
	        }
	        if (evt.preventDefault) {
	            evt.preventDefault();
	        } else {
	            evt.returnValue = false;
	        }
	    },
	    target: function target(evt) {
	        return evt && evt.target || window.event && window.event.srcElement;
	    },
	    keyCode: function keyCode(evt) {
	        return evt.charCode ? evt.charCode : evt.keyCode ? evt.keyCode : evt.which ? evt.which : 0;
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	/**
	 * DOM utilities
	 */
	
	exports['default'] = {
	
	    /**
	     * Returns text + text of children of given node
	     * @param  {NodeElement} node
	     * @return {String}
	     */
	    getText: function getText(node) {
	        var s = node.textContent || node.innerText || node.innerHTML.replace(/<[^<>]+>/g, '');
	        s = s.replace(/^\s+/, '').replace(/\s+$/, '');
	        return s;
	    },
	
	    /**
	     * Creates an html element with given collection of attributes
	     * @param  {String} tag a string of the html tag to create
	     * @param  {Array} an undetermined number of arrays containing the with 2
	     *                    items, the attribute name and its value ['id','myId']
	     * @return {Object}     created element
	     */
	    create: function create(tag) {
	        if (!tag || tag === '') {
	            return;
	        }
	
	        var el = document.createElement(tag),
	            args = arguments;
	
	        if (args.length > 1) {
	            for (var i = 0; i < args.length; i++) {
	                var argtype = typeof args[i];
	                if (argtype.toLowerCase() === 'object' && args[i].length === 2) {
	                    el.setAttribute(args[i][0], args[i][1]);
	                }
	            }
	        }
	        return el;
	    },
	
	    /**
	     * Returns a text node with given text
	     * @param  {String} txt
	     * @return {Object}
	     */
	    text: function text(txt) {
	        return document.createTextNode(txt);
	    },
	
	    hasClass: function hasClass(ele, cls) {
	        if (!ele) {
	            return false;
	        }
	
	        if (supportsClassList()) {
	            return ele.classList.contains(cls);
	        }
	        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	    },
	
	    addClass: function addClass(ele, cls) {
	        if (!ele) {
	            return;
	        }
	
	        if (supportsClassList()) {
	            ele.classList.add(cls);
	            return;
	        }
	
	        if (ele.className === '') {
	            ele.className = cls;
	        } else if (!this.hasClass(ele, cls)) {
	            ele.className += ' ' + cls;
	        }
	    },
	
	    removeClass: function removeClass(ele, cls) {
	        if (!ele) {
	            return;
	        }
	
	        if (supportsClassList()) {
	            ele.classList.remove(cls);
	            return;
	        }
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'g');
	        ele.className = ele.className.replace(reg, '');
	    },
	
	    /**
	     * Creates and returns an option element
	     * @param  {String}  text  option text
	     * @param  {String}  value option value
	     * @param  {Boolean} isSel whether option is selected
	     * @return {Object}        option element
	     */
	    createOpt: function createOpt(text, value, isSel) {
	        var isSelected = isSel ? true : false,
	            opt = isSelected ? this.create('option', ['value', value], ['selected', 'true']) : this.create('option', ['value', value]);
	        opt.appendChild(this.text(text));
	        return opt;
	    },
	
	    /**
	     * Creates and returns a checklist item
	     * @param  {Number} chkIndex  index of check item
	     * @param  {String} chkValue  check item value
	     * @param  {String} labelText check item label text
	     * @return {Object}           li DOM element
	     */
	    createCheckItem: function createCheckItem(chkIndex, chkValue, labelText) {
	        var li = this.create('li'),
	            label = this.create('label', ['for', chkIndex]),
	            check = this.create('input', ['id', chkIndex], ['name', chkIndex], ['type', 'checkbox'], ['value', chkValue]);
	        label.appendChild(check);
	        label.appendChild(this.text(labelText));
	        li.appendChild(label);
	        li.label = label;
	        li.check = check;
	        return li;
	    },
	
	    id: function id(_id) {
	        return document.getElementById(_id);
	    },
	
	    tag: function tag(o, tagname) {
	        return o.getElementsByTagName(tagname);
	    }
	};
	
	// HTML5 classList API
	function supportsClassList() {
	    return document.documentElement.classList;
	}
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	/**
	 * String utilities
	 */
	
	exports['default'] = {
	
	    lower: function lower(text) {
	        return text.toLowerCase();
	    },
	
	    upper: function upper(text) {
	        return text.toUpperCase();
	    },
	
	    trim: function trim(text) {
	        if (text.trim) {
	            return text.trim();
	        }
	        return text.replace(/^\s*|\s*$/g, '');
	    },
	
	    isEmpty: function isEmpty(text) {
	        return this.trim(text) === '';
	    },
	
	    rgxEsc: function rgxEsc(text) {
	        var chars = /[-\/\\^$*+?.()|[\]{}]/g;
	        var escMatch = '\\$&';
	        return String(text).replace(chars, escMatch);
	    },
	
	    matchCase: function matchCase(text, mc) {
	        if (!mc) {
	            return this.lower(text);
	        }
	        return text;
	    }
	
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	/**
	 * Cookie utilities
	 */
	
	exports['default'] = {
	
	    write: function write(name, value, hours) {
	        var expire = '';
	        if (hours) {
	            expire = new Date(new Date().getTime() + hours * 3600000);
	            expire = '; expires=' + expire.toGMTString();
	        }
	        document.cookie = name + '=' + escape(value) + expire;
	    },
	
	    read: function read(name) {
	        var cookieValue = '',
	            search = name + '=';
	        if (document.cookie.length > 0) {
	            var cookie = document.cookie,
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
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	/**
	 * Types utilities
	 */
	
	var UNDEFINED = void 0;
	
	exports['default'] = {
	    /**
	     * Check if argument is an object or a global object
	     * @param  {String or Object}  v
	     * @return {Boolean}
	     */
	    isObj: function isObj(v) {
	        var isO = false;
	        if (typeof v === 'string') {
	            if (window[v] && typeof window[v] === 'object') {
	                isO = true;
	            }
	        } else {
	            if (v && typeof v === 'object') {
	                isO = true;
	            }
	        }
	        return isO;
	    },
	
	    /**
	     * Check if argument is a function
	     * @param  {Function} fn
	     * @return {Boolean}
	     */
	    isFn: function isFn(fn) {
	        return fn && fn.constructor == Function;
	    },
	
	    /**
	     * Check if argument is an array
	     * @param  {Array}  obj
	     * @return {Boolean}
	     */
	    isArray: function isArray(obj) {
	        return obj && obj.constructor == Array;
	    },
	
	    /**
	     * Determine if argument is undefined
	     * @param  {Any}  o
	     * @return {Boolean}
	     */
	    isUndef: function isUndef(o) {
	        return o === UNDEFINED;
	    },
	
	    /**
	     * Determine if argument is null
	     * @param  {Any}  o
	     * @return {Boolean}
	     */
	    isNull: function isNull(o) {
	        return o === null;
	    },
	
	    /**
	     * Determine if argument is empty (undefined, null or empty string)
	     * @param  {Any}  o
	     * @return {Boolean}
	     */
	    isEmpty: function isEmpty(o) {
	        return this.isUndef(o) || this.isNull(o) || o.length === 0;
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	/**
	 * Array utilities
	 */
	
	var _Str = __webpack_require__(4);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	exports['default'] = {
	    has: function has(arr, val, caseSensitive) {
	        var sCase = caseSensitive === undefined ? false : caseSensitive;
	        for (var i = 0; i < arr.length; i++) {
	            if (_Str2['default'].matchCase(arr[i].toString(), sCase) == val) {
	                return true;
	            }
	        }
	        return false;
	    },
	    indexByValue: function indexByValue(arr, val, caseSensitive) {
	        var sCase = caseSensitive === undefined ? false : caseSensitive;
	        for (var i = 0; i < arr.length; i++) {
	            if (_Str2['default'].matchCase(arr[i].toString(), sCase) == val) {
	                return i;
	            }
	        }
	        return -1;
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	/**
	 * Date utilities
	 */
	
	exports['default'] = {
	    isValid: function isValid(dateStr, format) {
	        if (!format) {
	            format = 'DMY';
	        }
	        format = format.toUpperCase();
	        if (format.length != 3) {
	            if (format === 'DDMMMYYYY') {
	                var d = this.format(dateStr, format);
	                dateStr = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	                format = 'DMY';
	            }
	        }
	        if (format.indexOf('M') === -1 || format.indexOf('D') === -1 || format.indexOf('Y') === -1) {
	            format = 'DMY';
	        }
	        var reg1 = undefined,
	            reg2 = undefined;
	        // If the year is first
	        if (format.substring(0, 1) == 'Y') {
	            reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
	            reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
	        } else if (format.substring(1, 2) == 'Y') {
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
	        var mm = undefined,
	            dd = undefined,
	            yy = undefined;
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
	        if (parseInt(dd, 10) != dt.getDate()) {
	            return false;
	        }
	        if (parseInt(mm, 10) - 1 != dt.getMonth()) {
	            return false;
	        }
	        return true;
	    },
	    format: function format(dateStr, formatStr) {
	        if (!formatStr) {
	            formatStr = 'DMY';
	        }
	        if (!dateStr || dateStr === '') {
	            return new Date(1001, 0, 1);
	        }
	        var oDate = undefined;
	        var parts = undefined;
	
	        switch (formatStr.toUpperCase()) {
	            case 'DDMMMYYYY':
	                parts = dateStr.replace(/[- \/.]/g, ' ').split(' ');
	                oDate = new Date(y2kDate(parts[2]), mmm2mm(parts[1]) - 1, parts[0]);
	                break;
	            case 'DMY':
	                /* jshint ignore:start */
	                parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/, '$1 $3 $5').split(' ');
	                oDate = new Date(y2kDate(parts[2]), parts[1] - 1, parts[0]);
	                /* jshint ignore:end */
	                break;
	            case 'MDY':
	                /* jshint ignore:start */
	                parts = dateStr.replace(/^(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])([- \/.])((\d\d)?\d\d)$/, '$1 $3 $5').split(' ');
	                oDate = new Date(y2kDate(parts[2]), parts[0] - 1, parts[1]);
	                /* jshint ignore:end */
	                break;
	            case 'YMD':
	                /* jshint ignore:start */
	                parts = dateStr.replace(/^((\d\d)?\d\d)([- \/.])(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])$/, '$1 $4 $6').split(' ');
	                oDate = new Date(y2kDate(parts[0]), parts[1] - 1, parts[2]);
	                /* jshint ignore:end */
	                break;
	            default:
	                //in case format is not correct
	                /* jshint ignore:start */
	                parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/, '$1 $3 $5').split(' ');
	                oDate = new Date(y2kDate(parts[2]), parts[1] - 1, parts[0]);
	                /* jshint ignore:end */
	                break;
	        }
	        return oDate;
	    }
	};
	
	function y2kDate(yr) {
	    if (yr === undefined) {
	        return 0;
	    }
	    if (yr.length > 2) {
	        return yr;
	    }
	    var y = undefined;
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
	    var mondigit = undefined;
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
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	/**
	 * Misc helpers
	 */
	
	var _Str = __webpack_require__(4);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	exports['default'] = {
	    removeNbFormat: function removeNbFormat(data, format) {
	        if (!data) {
	            return;
	        }
	        if (!format) {
	            format = 'us';
	        }
	        var n = data;
	        if (_Str2['default'].lower(format) === 'us') {
	            n = +n.replace(/[^\d\.-]/g, '');
	        } else {
	            n = +n.replace(/[^\d\,-]/g, '').replace(',', '.');
	        }
	        return n;
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Cookie = __webpack_require__(5);
	
	var _Cookie2 = _interopRequireDefault(_Cookie);
	
	var Store = (function () {
	
	    /**
	     * Store, persistence manager
	     * @param {Object} tf TableFilter instance
	     *
	     * TODO: use localStorage and fallback to cookie persistence
	     */
	
	    function Store(tf) {
	        _classCallCheck(this, Store);
	
	        var f = tf.config();
	
	        this.duration = !isNaN(f.set_cookie_duration) ? parseInt(f.set_cookie_duration, 10) : 100000;
	
	        this.tf = tf;
	    }
	
	    _createClass(Store, [{
	        key: 'saveFilterValues',
	
	        /**
	         * Store filters' values in cookie
	         * @param {String} cookie name
	         */
	        value: function saveFilterValues(name) {
	            var tf = this.tf;
	            var fltValues = [];
	            //store filters' values
	            for (var i = 0; i < tf.fltIds.length; i++) {
	                var value = tf.getFilterValue(i);
	                if (value === '') {
	                    value = ' ';
	                }
	                fltValues.push(value);
	            }
	            //adds array size
	            fltValues.push(tf.fltIds.length);
	
	            //writes cookie
	            _Cookie2['default'].write(name, fltValues.join(tf.separator), this.duration);
	        }
	    }, {
	        key: 'getFilterValues',
	
	        /**
	         * Retrieve filters' values from cookie
	         * @param {String} cookie name
	         * @return {Array}
	         */
	        value: function getFilterValues(name) {
	            var flts = _Cookie2['default'].read(name);
	            var rgx = new RegExp(this.tf.separator, 'g');
	            // filters' values array
	            return flts.split(rgx);
	        }
	    }, {
	        key: 'savePageNb',
	
	        /**
	         * Store page number in cookie
	         * @param {String} cookie name
	         */
	        value: function savePageNb(name) {
	            _Cookie2['default'].write(name, this.tf.feature('paging').currentPageNb, this.duration);
	        }
	    }, {
	        key: 'getPageNb',
	
	        /**
	         * Retrieve page number from cookie
	         * @param {String} cookie name
	         * @return {String}
	         */
	        value: function getPageNb(name) {
	            return _Cookie2['default'].read(name);
	        }
	    }, {
	        key: 'savePageLength',
	
	        /**
	         * Store page length in cookie
	         * @param {String} cookie name
	         */
	        value: function savePageLength(name) {
	            _Cookie2['default'].write(name, this.tf.feature('paging').resultsPerPageSlc.selectedIndex, this.duration);
	        }
	    }, {
	        key: 'getPageLength',
	
	        /**
	         * Retrieve page length from cookie
	         * @param {String} cookie name
	         * @return {String}
	         */
	        value: function getPageLength(name) {
	            return _Cookie2['default'].read(name);
	        }
	    }]);
	
	    return Store;
	})();
	
	exports.Store = Store;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Types = __webpack_require__(6);
	
	var _Types2 = _interopRequireDefault(_Types);
	
	var _Event = __webpack_require__(2);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var GridLayout = (function () {
	
	    /**
	     * Grid layout, table with fixed headers
	     * @param {Object} tf TableFilter instance
	     */
	
	    function GridLayout(tf) {
	        _classCallCheck(this, GridLayout);
	
	        var f = tf.config();
	
	        //defines grid width
	        this.gridWidth = f.grid_width || null;
	        //defines grid height
	        this.gridHeight = f.grid_height || null;
	        //defines css class for main container
	        this.gridMainContCssClass = f.grid_cont_css_class || 'grd_Cont';
	        //defines css class for div containing table
	        this.gridContCssClass = f.grid_tbl_cont_css_class || 'grd_tblCont';
	        //defines css class for div containing headers' table
	        this.gridHeadContCssClass = f.grid_tblHead_cont_css_class || 'grd_headTblCont';
	        //defines css class for div containing rows counter, paging etc.
	        this.gridInfDivCssClass = f.grid_inf_grid_css_class || 'grd_inf';
	        //defines which row contains column headers
	        this.gridHeadRowIndex = f.grid_headers_row_index || 0;
	        //array of headers row indexes to be placed in header table
	        this.gridHeadRows = f.grid_headers_rows || [0];
	        //generate filters in table headers
	        this.gridEnableFilters = f.grid_enable_default_filters !== undefined ? f.grid_enable_default_filters : true;
	        //default col width
	        this.gridDefaultColWidth = f.grid_default_col_width || '100px';
	        //enables/disables columns resizer
	        // this.gridEnableColResizer = f.grid_enable_cols_resizer!==undefined ?
	        //     f.grid_enable_cols_resizer : false;
	        // //defines col resizer script path
	        // this.gridColResizerPath = f.grid_cont_col_resizer_path ||
	        //     this.basePath+'TFExt_ColsResizer/TFExt_ColsResizer.js';
	
	        this.gridColElms = [];
	
	        //div containing grid elements if grid_layout true
	        this.prfxMainTblCont = 'gridCont_';
	        //div containing table if grid_layout true
	        this.prfxTblCont = 'tblCont_';
	        //div containing headers table if grid_layout true
	        this.prfxHeadTblCont = 'tblHeadCont_';
	        //headers' table if grid_layout true
	        this.prfxHeadTbl = 'tblHead_';
	        //id of td containing the filter if grid_layout true
	        this.prfxGridFltTd = '_td_';
	        //id of th containing column header if grid_layout true
	        this.prfxGridTh = 'tblHeadTh_';
	
	        this.tf = tf;
	    }
	
	    _createClass(GridLayout, [{
	        key: 'init',
	
	        /**
	         * Generates a grid with fixed headers
	         */
	        value: function init() {
	            var _this = this;
	
	            var tf = this.tf;
	            var f = tf.config();
	            var tbl = tf.tbl;
	
	            if (!tf.gridLayout) {
	                return;
	            }
	
	            tf.isExternalFlt = true;
	
	            // default width of 100px if column widths not set
	            if (!tf.hasColWidths) {
	                tf.colWidths = [];
	                for (var k = 0; k < tf.nbCells; k++) {
	                    var colW,
	                        cell = tbl.rows[this.gridHeadRowIndex].cells[k];
	                    if (cell.width !== '') {
	                        colW = cell.width;
	                    } else if (cell.style.width !== '') {
	                        colW = parseInt(cell.style.width, 10);
	                    } else {
	                        colW = this.gridDefaultColWidth;
	                    }
	                    tf.colWidths[k] = colW;
	                }
	                tf.hasColWidths = true;
	            }
	            tf.setColWidths(this.gridHeadRowIndex);
	
	            var tblW; //initial table width
	            if (tbl.width !== '') {
	                tblW = tbl.width;
	            } else if (tbl.style.width !== '') {
	                tblW = parseInt(tbl.style.width, 10);
	            } else {
	                tblW = tbl.clientWidth;
	            }
	
	            //Main container: it will contain all the elements
	            this.tblMainCont = _Dom2['default'].create('div', ['id', this.prfxMainTblCont + tf.id]);
	            this.tblMainCont.className = this.gridMainContCssClass;
	            if (this.gridWidth) {
	                this.tblMainCont.style.width = this.gridWidth;
	            }
	            tbl.parentNode.insertBefore(this.tblMainCont, tbl);
	
	            //Table container: div wrapping content table
	            this.tblCont = _Dom2['default'].create('div', ['id', this.prfxTblCont + tf.id]);
	            this.tblCont.className = this.gridContCssClass;
	            if (this.gridWidth) {
	                if (this.gridWidth.indexOf('%') != -1) {
	                    console.log(this.gridWidth);
	                    this.tblCont.style.width = '100%';
	                } else {
	                    this.tblCont.style.width = this.gridWidth;
	                }
	            }
	            if (this.gridHeight) {
	                this.tblCont.style.height = this.gridHeight;
	            }
	            tbl.parentNode.insertBefore(this.tblCont, tbl);
	            var t = tbl.parentNode.removeChild(tbl);
	            this.tblCont.appendChild(t);
	
	            //In case table width is expressed in %
	            if (tbl.style.width === '') {
	                tbl.style.width = (tf._containsStr('%', tblW) ? tbl.clientWidth : tblW) + 'px';
	            }
	
	            var d = this.tblCont.parentNode.removeChild(this.tblCont);
	            this.tblMainCont.appendChild(d);
	
	            //Headers table container: div wrapping headers table
	            this.headTblCont = _Dom2['default'].create('div', ['id', this.prfxHeadTblCont + tf.id]);
	            this.headTblCont.className = this.gridHeadContCssClass;
	            if (this.gridWidth) {
	                if (this.gridWidth.indexOf('%') != -1) {
	                    console.log(this.gridWidth);
	                    this.headTblCont.style.width = '100%';
	                } else {
	                    this.headTblCont.style.width = this.gridWidth;
	                }
	            }
	
	            //Headers table
	            this.headTbl = _Dom2['default'].create('table', ['id', this.prfxHeadTbl + tf.id]);
	            var tH = _Dom2['default'].create('tHead'); //IE<7 needs it
	
	            //1st row should be headers row, ids are added if not set
	            //Those ids are used by the sort feature
	            var hRow = tbl.rows[this.gridHeadRowIndex];
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
	            var filtersRow = _Dom2['default'].create('tr');
	            if (this.gridEnableFilters && tf.fltGrid) {
	                tf.externalFltTgtIds = [];
	                for (var j = 0; j < tf.nbCells; j++) {
	                    var fltTdId = tf.prfxFlt + j + this.prfxGridFltTd + tf.id;
	                    var cl = _Dom2['default'].create(tf.fltCellTag, ['id', fltTdId]);
	                    filtersRow.appendChild(cl);
	                    tf.externalFltTgtIds[j] = fltTdId;
	                }
	            }
	            //Headers row are moved from content table to headers table
	            for (var i = 0; i < this.gridHeadRows.length; i++) {
	                var headRow = tbl.rows[this.gridHeadRows[0]];
	                tH.appendChild(headRow);
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
	            var thead = _Dom2['default'].tag(tbl, 'thead');
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
	            tf.setColWidths(0, this.headTbl);
	
	            //Headers container width
	            // this.headTblCont.style.width = this.tblCont.clientWidth+'px';
	
	            tbl.style.width = '';
	            //
	            this.headTbl.style.width = tbl.clientWidth + 'px';
	            //
	
	            //scroll synchronisation
	            _Event2['default'].add(this.tblCont, 'scroll', function (evt) {
	                var elm = _Event2['default'].target(evt);
	                var scrollLeft = elm.scrollLeft;
	                _this.headTblCont.scrollLeft = scrollLeft;
	                //New pointerX calc taking into account scrollLeft
	                // if(!o.isPointerXOverwritten){
	                //     try{
	                //         o.Evt.pointerX = function(evt){
	                //             var e = evt || global.event;
	                //             var bdScrollLeft = tf_StandardBody().scrollLeft +
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
	
	            // if(this.gridEnableColResizer){
	            //     if(!tf.hasExtensions){
	            //         tf.extensions = {
	            //             name:['ColumnsResizer_'+tf.id],
	            //             src:[this.gridColResizerPath],
	            //             description:['Columns Resizing'],
	            //             initialize:[function(o){
	            //                 o.SetColsResizer('ColumnsResizer_'+o.id);}]
	            //         };
	            //         tf.hasExtensions = true;
	            //     } else {
	            //         if(!tf._containsStr(
	            //             'colsresizer',
	            //             Str.lower(tf.extensions.src.toString())) ){
	            //             tf.extensions.name.push('ColumnsResizer_'+tf.id);
	            //             tf.extensions.src.push(tf.gridColResizerPath);
	            //             tf.extensions.description.push('Columns Resizing');
	            //             tf.extensions.initialize.push(function(o){
	            //                 o.SetColsResizer('ColumnsResizer_'+o.id);});
	            //         }
	            //     }
	            // }
	
	            //Default columns resizer properties for grid layout
	            // f.col_resizer_cols_headers_table = this.headTbl.getAttribute('id');
	            // f.col_resizer_cols_headers_index = this.gridHeadRowIndex;
	            // f.col_resizer_width_adjustment = 0;
	            // f.col_enable_text_ellipsis = false;
	
	            //Cols generation for all browsers excepted IE<=7
	            this.tblHasColTag = _Dom2['default'].tag(tbl, 'col').length > 0 ? true : false;
	
	            //Col elements are enough to keep column widths after sorting and
	            //filtering
	            var createColTags = function createColTags() {
	                for (var k = tf.nbCells - 1; k >= 0; k--) {
	                    var col = _Dom2['default'].create('col', ['id', tf.id + '_col_' + k]);
	                    tbl.insertBefore(col, tbl.firstChild);
	                    col.style.width = tf.colWidths[k];
	                    this.gridColElms[k] = col;
	                }
	                this.tblHasColTag = true;
	            };
	
	            if (!this.tblHasColTag) {
	                createColTags.call(this);
	            } else {
	                var cols = _Dom2['default'].tag(tbl, 'col');
	                for (var ii = 0; ii < tf.nbCells; ii++) {
	                    cols[ii].setAttribute('id', tf.id + '_col_' + ii);
	                    cols[ii].style.width = tf.colWidths[ii];
	                    this.gridColElms.push(cols[ii]);
	                }
	            }
	
	            var afterColResizedFn = _Types2['default'].isFn(f.on_after_col_resized) ? f.on_after_col_resized : null;
	            f.on_after_col_resized = function (o, colIndex) {
	                if (!colIndex) {
	                    return;
	                }
	                var w = o.crWColsRow.cells[colIndex].style.width;
	                var col = o.gridColElms[colIndex];
	                col.style.width = w;
	
	                var thCW = o.crWColsRow.cells[colIndex].clientWidth;
	                var tdCW = o.crWRowDataTbl.cells[colIndex].clientWidth;
	
	                if (thCW != tdCW) {
	                    o.headTbl.style.width = tbl.clientWidth + 'px';
	                }
	
	                if (afterColResizedFn) {
	                    afterColResizedFn.call(null, o, colIndex);
	                }
	            };
	
	            if (tbl.clientWidth !== this.headTbl.clientWidth) {
	                tbl.style.width = this.headTbl.clientWidth + 'px';
	            }
	        }
	    }, {
	        key: 'destroy',
	
	        /**
	         * Removes the grid layout
	         */
	        value: function destroy() {
	            var tf = this.tf;
	            var tbl = tf.tbl;
	
	            if (!tf.gridLayout) {
	                return;
	            }
	            var t = tbl.parentNode.removeChild(tbl);
	            this.tblMainCont.parentNode.insertBefore(t, this.tblMainCont);
	            this.tblMainCont.parentNode.removeChild(this.tblMainCont);
	
	            this.tblMainCont = null;
	            this.headTblCont = null;
	            this.headTbl = null;
	            this.tblCont = null;
	
	            tbl.outerHTML = tf.sourceTblHtml;
	            //needed to keep reference of table element
	            tbl = _Dom2['default'].id(tf.id);
	        }
	    }]);
	
	    return GridLayout;
	})();
	
	exports.GridLayout = GridLayout;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Types = __webpack_require__(6);
	
	var _Types2 = _interopRequireDefault(_Types);
	
	var global = window;
	
	var Loader = (function () {
	
	    /**
	     * Loading message/spinner
	     * @param {Object} tf TableFilter instance
	     */
	
	    function Loader(tf) {
	        _classCallCheck(this, Loader);
	
	        // TableFilter configuration
	        var f = tf.config();
	        //id of container element
	        this.loaderTgtId = f.loader_target_id || null;
	        //div containing loader
	        this.loaderDiv = null;
	        //defines loader text
	        this.loaderText = f.loader_text || 'Loading...';
	        //defines loader innerHtml
	        this.loaderHtml = f.loader_html || null;
	        //defines css class for loader div
	        this.loaderCssClass = f.loader_css_class || 'loader';
	        //delay for hiding loader
	        this.loaderCloseDelay = 200;
	        //callback function before loader is displayed
	        this.onShowLoader = _Types2['default'].isFn(f.on_show_loader) ? f.on_show_loader : null;
	        //callback function after loader is closed
	        this.onHideLoader = _Types2['default'].isFn(f.on_hide_loader) ? f.on_hide_loader : null;
	        //loader div
	        this.prfxLoader = 'load_';
	
	        this.tf = tf;
	
	        var containerDiv = _Dom2['default'].create('div', ['id', this.prfxLoader + tf.id]);
	        containerDiv.className = this.loaderCssClass;
	
	        var targetEl = !this.loaderTgtId ? tf.tbl.parentNode : _Dom2['default'].id(this.loaderTgtId);
	        if (!this.loaderTgtId) {
	            targetEl.insertBefore(containerDiv, tf.tbl);
	        } else {
	            targetEl.appendChild(containerDiv);
	        }
	        this.loaderDiv = _Dom2['default'].id(this.prfxLoader + tf.id);
	        if (!this.loaderHtml) {
	            this.loaderDiv.appendChild(_Dom2['default'].text(this.loaderText));
	        } else {
	            this.loaderDiv.innerHTML = this.loaderHtml;
	        }
	    }
	
	    _createClass(Loader, [{
	        key: 'show',
	        value: function show(p) {
	            var _this = this;
	
	            if (!this.tf.loader || !this.loaderDiv || this.loaderDiv.style.display === p) {
	                return;
	            }
	
	            var displayLoader = function displayLoader() {
	                if (!_this.loaderDiv) {
	                    return;
	                }
	                if (_this.onShowLoader && p !== 'none') {
	                    _this.onShowLoader.call(null, _this);
	                }
	                _this.loaderDiv.style.display = p;
	                if (_this.onHideLoader && p === 'none') {
	                    _this.onHideLoader.call(null, _this);
	                }
	            };
	
	            var t = p === 'none' ? this.loaderCloseDelay : 1;
	            global.setTimeout(displayLoader, t);
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            if (!this.loaderDiv) {
	                return;
	            }
	            var tf = this.tf,
	                targetEl = !this.loaderTgtId ? tf.gridLayout ? tf.feature('gridLayout').tblCont : tf.tbl.parentNode : _Dom2['default'].id(this.loaderTgtId);
	            targetEl.removeChild(this.loaderDiv);
	            this.loaderDiv = null;
	        }
	    }]);
	
	    return Loader;
	})();
	
	exports.Loader = Loader;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Str = __webpack_require__(4);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	var HighlightKeyword = (function () {
	
	    /**
	     * HighlightKeyword, highlight matched keyword
	     * @param {Object} tf TableFilter instance
	     */
	
	    function HighlightKeyword(tf) {
	        _classCallCheck(this, HighlightKeyword);
	
	        var f = tf.config();
	        //defines css class for highlighting
	        this.highlightCssClass = f.highlight_css_class || 'keyword';
	        this.highlightedNodes = [];
	
	        this.tf = tf;
	    }
	
	    _createClass(HighlightKeyword, [{
	        key: 'highlight',
	
	        /**
	         * highlight occurences of searched term in passed node
	         * @param  {Node} node
	         * @param  {String} word     Searched term
	         * @param  {String} cssClass Css class name
	         */
	        value: function highlight(node, word, cssClass) {
	            // Iterate into this nodes childNodes
	            if (node.hasChildNodes) {
	                var children = node.childNodes;
	                for (var i = 0; i < children.length; i++) {
	                    this.highlight(children[i], word, cssClass);
	                }
	            }
	
	            if (node.nodeType === 3) {
	                var tempNodeVal = _Str2['default'].lower(node.nodeValue);
	                var tempWordVal = _Str2['default'].lower(word);
	                if (tempNodeVal.indexOf(tempWordVal) != -1) {
	                    var pn = node.parentNode;
	                    if (pn && pn.className != cssClass) {
	                        // word not highlighted yet
	                        var nv = node.nodeValue,
	                            ni = tempNodeVal.indexOf(tempWordVal),
	
	                        // Create a load of replacement nodes
	                        before = _Dom2['default'].text(nv.substr(0, ni)),
	                            docWordVal = nv.substr(ni, word.length),
	                            after = _Dom2['default'].text(nv.substr(ni + word.length)),
	                            hiwordtext = _Dom2['default'].text(docWordVal),
	                            hiword = _Dom2['default'].create('span');
	                        hiword.className = cssClass;
	                        hiword.appendChild(hiwordtext);
	                        pn.insertBefore(before, node);
	                        pn.insertBefore(hiword, node);
	                        pn.insertBefore(after, node);
	                        pn.removeChild(node);
	                        this.highlightedNodes.push(hiword.firstChild);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'unhighlight',
	
	        /**
	         * Removes highlight to nodes matching passed string
	         * @param  {String} word
	         * @param  {String} cssClass Css class to remove
	         */
	        value: function unhighlight(word, cssClass) {
	            var arrRemove = [];
	            var highlightedNodes = this.highlightedNodes;
	            for (var i = 0; i < highlightedNodes.length; i++) {
	                var n = highlightedNodes[i];
	                if (!n) {
	                    continue;
	                }
	                var tempNodeVal = _Str2['default'].lower(n.nodeValue),
	                    tempWordVal = _Str2['default'].lower(word);
	                if (tempNodeVal.indexOf(tempWordVal) !== -1) {
	                    var pn = n.parentNode;
	                    if (pn && pn.className === cssClass) {
	                        var prevSib = pn.previousSibling,
	                            nextSib = pn.nextSibling;
	                        if (!prevSib || !nextSib) {
	                            continue;
	                        }
	                        nextSib.nodeValue = prevSib.nodeValue + n.nodeValue + nextSib.nodeValue;
	                        prevSib.nodeValue = '';
	                        n.nodeValue = '';
	                        arrRemove.push(i);
	                    }
	                }
	            }
	            for (var k = 0; k < arrRemove.length; k++) {
	                highlightedNodes.splice(arrRemove[k], 1);
	            }
	        }
	    }, {
	        key: 'unhighlightAll',
	
	        /**
	         * Clear all occurrences of highlighted nodes
	         */
	        value: function unhighlightAll() {
	            if (!this.tf.highlightKeywords || !this.tf.searchArgs) {
	                return;
	            }
	            for (var y = 0; y < this.tf.searchArgs.length; y++) {
	                this.unhighlight(this.tf.searchArgs[y], this.highlightCssClass);
	            }
	            this.highlightedNodes = [];
	        }
	    }]);
	
	    return HighlightKeyword;
	})();
	
	exports.HighlightKeyword = HighlightKeyword;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Types = __webpack_require__(6);
	
	var _Types2 = _interopRequireDefault(_Types);
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Event = __webpack_require__(2);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var PopupFilter = (function () {
	
	    /**
	     * Pop-up filter component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function PopupFilter(tf) {
	        _classCallCheck(this, PopupFilter);
	
	        // Configuration object
	        var f = tf.config();
	
	        // Enable external filters behaviour
	        tf.isExternalFlt = true;
	        tf.externalFltTgtIds = [];
	
	        //filter icon path
	        this.popUpImgFlt = f.popup_filters_image || tf.themesPath + 'icn_filter.gif';
	        //active filter icon path
	        this.popUpImgFltActive = f.popup_filters_image_active || tf.themesPath + 'icn_filterActive.gif';
	        this.popUpImgFltHtml = f.popup_filters_image_html || '<img src="' + this.popUpImgFlt + '" alt="Column filter" />';
	        //defines css class for popup div containing filter
	        this.popUpDivCssClass = f.popup_div_css_class || 'popUpFilter';
	        //callback function before popup filtes is opened
	        this.onBeforePopUpOpen = _Types2['default'].isFn(f.on_before_popup_filter_open) ? f.on_before_popup_filter_open : null;
	        //callback function after popup filtes is opened
	        this.onAfterPopUpOpen = _Types2['default'].isFn(f.on_after_popup_filter_open) ? f.on_after_popup_filter_open : null;
	        //callback function before popup filtes is closed
	        this.onBeforePopUpClose = _Types2['default'].isFn(f.on_before_popup_filter_close) ? f.on_before_popup_filter_close : null;
	        //callback function after popup filtes is closed
	        this.onAfterPopUpClose = _Types2['default'].isFn(f.on_after_popup_filter_close) ? f.on_after_popup_filter_close : null;
	
	        //stores filters spans
	        this.popUpFltSpans = [];
	        //stores filters icons
	        this.popUpFltImgs = [];
	        //stores filters containers
	        this.popUpFltElms = this.popUpFltElmCache || [];
	        this.popUpFltAdjustToContainer = true;
	
	        //id prefix for pop-up filter span
	        this.prfxPopUpSpan = 'popUpSpan_';
	        //id prefix for pop-up div containing filter
	        this.prfxPopUpDiv = 'popUpDiv_';
	
	        this.tf = tf;
	    }
	
	    _createClass(PopupFilter, [{
	        key: 'onClick',
	        value: function onClick(e) {
	            var evt = e || global.event,
	                elm = evt.target.parentNode,
	                colIndex = parseInt(elm.getAttribute('ci'), 10);
	
	            this.closeAll(colIndex);
	            this.toggle(colIndex);
	
	            if (this.popUpFltAdjustToContainer) {
	                var popUpDiv = this.popUpFltElms[colIndex],
	                    header = this.tf.getHeaderElement(colIndex),
	                    headerWidth = header.clientWidth * 0.95;
	                popUpDiv.style.width = parseInt(headerWidth, 10) + 'px';
	            }
	            _Event2['default'].cancel(evt);
	            _Event2['default'].stop(evt);
	        }
	    }, {
	        key: 'init',
	
	        /**
	         * Initialize DOM elements
	         */
	        value: function init() {
	            var _this = this;
	
	            var tf = this.tf;
	            for (var i = 0; i < tf.nbCells; i++) {
	                if (tf['col' + i] === tf.fltTypeNone) {
	                    continue;
	                }
	                var popUpSpan = _Dom2['default'].create('span', ['id', this.prfxPopUpSpan + tf.id + '_' + i], ['ci', i]);
	                popUpSpan.innerHTML = this.popUpImgFltHtml;
	                var header = tf.getHeaderElement(i);
	                header.appendChild(popUpSpan);
	                _Event2['default'].add(popUpSpan, 'click', function (evt) {
	                    _this.onClick(evt);
	                });
	                this.popUpFltSpans[i] = popUpSpan;
	                this.popUpFltImgs[i] = popUpSpan.firstChild;
	            }
	        }
	    }, {
	        key: 'buildAll',
	
	        /**
	         * Build all pop-up filters elements
	         */
	        value: function buildAll() {
	            for (var i = 0; i < this.popUpFltElmCache.length; i++) {
	                this.build(i, this.popUpFltElmCache[i]);
	            }
	        }
	    }, {
	        key: 'build',
	
	        /**
	         * Build a specified pop-up filter elements
	         * @param  {Number} colIndex Column index
	         * @param  {Object} div      Optional container DOM element
	         */
	        value: function build(colIndex, div) {
	            var tf = this.tf;
	            var popUpDiv = !div ? _Dom2['default'].create('div', ['id', this.prfxPopUpDiv + tf.id + '_' + colIndex]) : div;
	            popUpDiv.className = this.popUpDivCssClass;
	            tf.externalFltTgtIds.push(popUpDiv.id);
	            var header = tf.getHeaderElement(colIndex);
	            header.insertBefore(popUpDiv, header.firstChild);
	            _Event2['default'].add(popUpDiv, 'click', function (evt) {
	                _Event2['default'].stop(evt);
	            });
	            this.popUpFltElms[colIndex] = popUpDiv;
	        }
	    }, {
	        key: 'toggle',
	
	        /**
	         * Toogle visibility of specified filter
	         * @param  {Number} colIndex Column index
	         */
	        value: function toggle(colIndex) {
	            var tf = this.tf,
	                popUpFltElm = this.popUpFltElms[colIndex];
	
	            if (popUpFltElm.style.display === 'none' || popUpFltElm.style.display === '') {
	                if (this.onBeforePopUpOpen) {
	                    this.onBeforePopUpOpen.call(null, this, this.popUpFltElms[colIndex], colIndex);
	                }
	                popUpFltElm.style.display = 'block';
	                if (tf['col' + colIndex] === tf.fltTypeInp) {
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
	                popUpFltElm.style.display = 'none';
	                if (this.onAfterPopUpClose) {
	                    this.onAfterPopUpClose.call(null, this, this.popUpFltElms[colIndex], colIndex);
	                }
	            }
	        }
	    }, {
	        key: 'closeAll',
	
	        /**
	         * Close all filters excepted for the specified one if any
	         * @param  {Number} exceptIdx Column index of the filter to not close
	         */
	        value: function closeAll(exceptIdx) {
	            for (var i = 0; i < this.popUpFltElms.length; i++) {
	                if (i === exceptIdx) {
	                    continue;
	                }
	                var popUpFltElm = this.popUpFltElms[i];
	                if (popUpFltElm) {
	                    popUpFltElm.style.display = 'none';
	                }
	            }
	        }
	    }, {
	        key: 'buildIcons',
	
	        /**
	         * Build all the icons representing the pop-up filters
	         */
	        value: function buildIcons() {
	            for (var i = 0; i < this.popUpFltImgs.length; i++) {
	                this.buildIcon(i, false);
	            }
	        }
	    }, {
	        key: 'buildIcon',
	
	        /**
	         * Build specified icon
	         * @param  {Number} colIndex Column index
	         * @param  {Boolean} active   Apply active state
	         */
	        value: function buildIcon(colIndex, active) {
	            if (this.popUpFltImgs[colIndex]) {
	                this.popUpFltImgs[colIndex].src = active ? this.popUpImgFltActive : this.popUpImgFlt;
	            }
	        }
	    }, {
	        key: 'destroy',
	
	        /**
	         * Remove pop-up filters
	         */
	        value: function destroy() {
	            this.popUpFltElmCache = [];
	            for (var i = 0; i < this.popUpFltElms.length; i++) {
	                var popUpFltElm = this.popUpFltElms[i],
	                    popUpFltSpan = this.popUpFltSpans[i],
	                    popUpFltImg = this.popUpFltImgs[i];
	                if (popUpFltElm) {
	                    popUpFltElm.parentNode.removeChild(popUpFltElm);
	                    this.popUpFltElmCache[i] = popUpFltElm;
	                }
	                popUpFltElm = null;
	                if (popUpFltSpan) {
	                    popUpFltSpan.parentNode.removeChild(popUpFltSpan);
	                }
	                popUpFltSpan = null;
	                if (popUpFltImg) {
	                    popUpFltImg.parentNode.removeChild(popUpFltImg);
	                }
	                popUpFltImg = null;
	            }
	            this.popUpFltElms = [];
	            this.popUpFltSpans = [];
	            this.popUpFltImgs = [];
	        }
	    }]);
	
	    return PopupFilter;
	})();
	
	exports.PopupFilter = PopupFilter;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Arr = __webpack_require__(7);
	
	var _Arr2 = _interopRequireDefault(_Arr);
	
	var _Str = __webpack_require__(4);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	var _Sort = __webpack_require__(23);
	
	var _Sort2 = _interopRequireDefault(_Sort);
	
	var Dropdown = (function () {
	
	    /**
	     * Dropdown UI component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function Dropdown(tf) {
	        _classCallCheck(this, Dropdown);
	
	        // Configuration object
	        var f = tf.config();
	
	        this.enableSlcResetFilter = f.enable_slc_reset_filter === false ? false : true;
	        //defines empty option text
	        this.nonEmptyText = f.non_empty_text || '(Non empty)';
	        //sets select filling method: 'innerHTML' or 'createElement'
	        this.slcFillingMethod = f.slc_filling_method || 'createElement';
	        //IE only, tooltip text appearing on select before it is populated
	        this.activateSlcTooltip = f.activate_slc_tooltip || 'Click to activate';
	        //tooltip text appearing on multiple select
	        this.multipleSlcTooltip = f.multiple_slc_tooltip || 'Use Ctrl key for multiple selections';
	
	        this.isCustom = null;
	        this.opts = null;
	        this.optsTxt = null;
	        this.slcInnerHtml = null;
	
	        this.tf = tf;
	    }
	
	    _createClass(Dropdown, [{
	        key: 'build',
	
	        /**
	         * Build drop-down filter UI asynchronously
	         * @param  {Number}  colIndex   Column index
	         * @param  {Boolean} isLinked Enable linked refresh behaviour
	         * @param  {Boolean} isExternal Render in external container
	         * @param  {String}  extSlcId   External container id
	         */
	        value: function build(colIndex, isLinked, isExternal, extSlcId) {
	            var tf = this.tf;
	            tf.EvtManager(tf.Evt.name.dropdown, {
	                slcIndex: colIndex,
	                slcRefreshed: isLinked,
	                slcExternal: isExternal,
	                slcId: extSlcId
	            });
	        }
	    }, {
	        key: '_build',
	
	        /**
	         * Build drop-down filter UI
	         * @param  {Number}  colIndex    Column index
	         * @param  {Boolean} isLinked Enable linked refresh behaviour
	         * @param  {Boolean} isExternal  Render in external container
	         * @param  {String}  extSlcId    External container id
	         */
	        value: function _build(colIndex) {
	            var isLinked = arguments[1] === undefined ? false : arguments[1];
	            var isExternal = arguments[2] === undefined ? false : arguments[2];
	            var extSlcId = arguments[3] === undefined ? null : arguments[3];
	
	            var tf = this.tf;
	            colIndex = parseInt(colIndex, 10);
	
	            this.opts = [];
	            this.optsTxt = [];
	            this.slcInnerHtml = '';
	
	            var slcId = tf.fltIds[colIndex];
	            if (!_Dom2['default'].id(slcId) && !isExternal || !_Dom2['default'].id(extSlcId) && isExternal) {
	                return;
	            }
	            var slc = !isExternal ? _Dom2['default'].id(slcId) : _Dom2['default'].id(extSlcId),
	                rows = tf.tbl.rows,
	                matchCase = tf.matchCase;
	
	            //custom select test
	            this.isCustom = tf.isCustomOptions(colIndex);
	
	            //custom selects text
	            var activeFlt;
	            if (isLinked && tf.activeFilterId) {
	                activeFlt = tf.activeFilterId.split('_')[0];
	                activeFlt = activeFlt.split(tf.prfxFlt)[1];
	            }
	
	            /*** remember grid values ***/
	            var fltsValues = [],
	                fltArr = [];
	            if (tf.rememberGridValues) {
	                fltsValues = tf.feature('store').getFilterValues(tf.fltsValuesCookie);
	                if (fltsValues && !_Str2['default'].isEmpty(fltsValues.toString())) {
	                    if (this.isCustom) {
	                        fltArr.push(fltsValues[colIndex]);
	                    } else {
	                        fltArr = fltsValues[colIndex].split(' ' + tf.orOperator + ' ');
	                    }
	                }
	            }
	
	            var excludedOpts = null,
	                filteredDataCol = null;
	            if (isLinked && tf.disableExcludedOptions) {
	                excludedOpts = [];
	                filteredDataCol = [];
	            }
	
	            for (var k = tf.refRow; k < tf.nbRows; k++) {
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
	                    if (colIndex === j && (!isLinked || isLinked && tf.disableExcludedOptions) || colIndex == j && isLinked && (rows[k].style.display === '' && !tf.paging || tf.paging && (!tf.validRowsIndex || tf.validRowsIndex && _Arr2['default'].has(tf.validRowsIndex, k)) && (activeFlt === undefined || activeFlt == colIndex || activeFlt != colIndex && _Arr2['default'].has(tf.validRowsIndex, k)))) {
	                        var cell_data = tf.getCellData(j, cell[j]),
	
	                        //Vary Peter's patch
	                        cell_string = _Str2['default'].matchCase(cell_data, matchCase);
	
	                        // checks if celldata is already in array
	                        if (!_Arr2['default'].has(this.opts, cell_string, matchCase)) {
	                            this.opts.push(cell_data);
	                        }
	
	                        if (isLinked && tf.disableExcludedOptions) {
	                            var filteredCol = filteredDataCol[j];
	                            if (!filteredCol) {
	                                filteredCol = tf.getFilteredDataCol(j);
	                            }
	                            if (!_Arr2['default'].has(filteredCol, cell_string, matchCase) && !_Arr2['default'].has(excludedOpts, cell_string, matchCase) && !this.isFirstLoad) {
	                                excludedOpts.push(cell_data);
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
	                if (!matchCase) {
	                    this.opts.sort(_Sort2['default'].ignoreCase);
	                    if (excludedOpts) {
	                        excludedOpts.sort(_Sort2['default'].ignoreCase);
	                    }
	                } else {
	                    this.opts.sort();
	                    if (excludedOpts) {
	                        excludedOpts.sort();
	                    }
	                }
	            }
	
	            //asc sort
	            if (tf.sortNumAsc && _Arr2['default'].has(tf.sortNumAsc, colIndex)) {
	                try {
	                    this.opts.sort(numSortAsc);
	                    if (excludedOpts) {
	                        excludedOpts.sort(numSortAsc);
	                    }
	                    if (this.isCustom) {
	                        this.optsTxt.sort(numSortAsc);
	                    }
	                } catch (e) {
	                    this.opts.sort();
	                    if (excludedOpts) {
	                        excludedOpts.sort();
	                    }
	                    if (this.isCustom) {
	                        this.optsTxt.sort();
	                    }
	                } //in case there are alphanumeric values
	            }
	            //desc sort
	            if (tf.sortNumDesc && _Arr2['default'].has(tf.sortNumDesc, colIndex)) {
	                try {
	                    this.opts.sort(numSortDesc);
	                    if (excludedOpts) {
	                        excludedOpts.sort(numSortDesc);
	                    }
	                    if (this.isCustom) {
	                        this.optsTxt.sort(numSortDesc);
	                    }
	                } catch (e) {
	                    this.opts.sort();
	                    if (excludedOpts) {
	                        excludedOpts.sort();
	                    }
	                    if (this.isCustom) {
	                        this.optsTxt.sort();
	                    }
	                } //in case there are alphanumeric values
	            }
	
	            //populates drop-down
	            this.addOptions(colIndex, slc, isLinked, excludedOpts, fltsValues, fltArr);
	        }
	    }, {
	        key: 'addOptions',
	
	        /**
	         * Add drop-down options
	         * @param {Number} colIndex     Column index
	         * @param {Object} slc          Select Dom element
	         * @param {Boolean} isLinked    Enable linked refresh behaviour
	         * @param {Array} excludedOpts  Array of excluded options
	         * @param {Array} fltsValues    Collection of persisted filter values
	         * @param {Array} fltArr        Collection of persisted filter values
	         */
	        value: function addOptions(colIndex, slc, isLinked, excludedOpts, fltsValues, fltArr) {
	            var tf = this.tf,
	                fillMethod = _Str2['default'].lower(this.slcFillingMethod),
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
	                if (isLinked && tf.disableExcludedOptions && _Arr2['default'].has(excludedOpts, _Str2['default'].matchCase(val, tf.matchCase), tf.matchCase)) {
	                    isDisabled = true;
	                }
	
	                if (fillMethod === 'innerhtml') {
	                    var slcAttr = '';
	                    if (tf.fillSlcOnDemand && slcValue === this.opts[y]) {
	                        slcAttr = 'selected="selected"';
	                    }
	                    this.slcInnerHtml += '<option value="' + val + '" ' + slcAttr + (isDisabled ? 'disabled="disabled"' : '') + '>' + lbl + '</option>';
	                } else {
	                    var opt;
	                    //fill select on demand
	                    if (tf.fillSlcOnDemand && slcValue === this.opts[y] && tf['col' + colIndex] === tf.fltTypeSlc) {
	                        opt = _Dom2['default'].createOpt(lbl, val, true);
	                    } else {
	                        if (tf['col' + colIndex] !== tf.fltTypeMulti) {
	                            opt = _Dom2['default'].createOpt(lbl, val, fltsValues[colIndex] !== ' ' && val === fltsValues[colIndex] ? true : false);
	                        } else {
	                            opt = _Dom2['default'].createOpt(lbl, val, _Arr2['default'].has(fltArr, _Str2['default'].matchCase(this.opts[y], tf.matchCase), tf.matchCase) || fltArr.toString().indexOf(val) !== -1 ? true : false);
	                        }
	                    }
	                    if (isDisabled) {
	                        opt.disabled = true;
	                    }
	                    slc.appendChild(opt);
	                }
	            } // for y
	
	            if (fillMethod === 'innerhtml') {
	                slc.innerHTML += this.slcInnerHtml;
	            }
	            slc.setAttribute('filled', '1');
	        }
	    }, {
	        key: 'addFirstOption',
	
	        /**
	         * Add drop-down header option
	         * @param {Object} slc Select DOM element
	         */
	        value: function addFirstOption(slc) {
	            var tf = this.tf,
	                fillMethod = _Str2['default'].lower(this.slcFillingMethod);
	
	            if (fillMethod === 'innerhtml') {
	                this.slcInnerHtml += '<option value="">' + tf.displayAllText + '</option>';
	            } else {
	                var opt0 = _Dom2['default'].createOpt(!this.enableSlcResetFilter ? '' : tf.displayAllText, '');
	                if (!this.enableSlcResetFilter) {
	                    opt0.style.display = 'none';
	                }
	                slc.appendChild(opt0);
	                if (tf.enableEmptyOption) {
	                    var opt1 = _Dom2['default'].createOpt(tf.emptyText, tf.emOperator);
	                    slc.appendChild(opt1);
	                }
	                if (tf.enableNonEmptyOption) {
	                    var opt2 = _Dom2['default'].createOpt(tf.nonEmptyText, tf.nmOperator);
	                    slc.appendChild(opt2);
	                }
	            }
	            return slc;
	        }
	    }]);
	
	    return Dropdown;
	})();
	
	exports.Dropdown = Dropdown;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Arr = __webpack_require__(7);
	
	var _Arr2 = _interopRequireDefault(_Arr);
	
	var _Str = __webpack_require__(4);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	var _Sort = __webpack_require__(23);
	
	var _Sort2 = _interopRequireDefault(_Sort);
	
	var _Event = __webpack_require__(2);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var CheckList = (function () {
	
	    /**
	     * Checklist UI component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function CheckList(tf) {
	        _classCallCheck(this, CheckList);
	
	        // Configuration object
	        var f = tf.config();
	
	        this.checkListDiv = []; //checklist container div
	        //defines css class for div containing checklist filter
	        this.checkListDivCssClass = f.div_checklist_css_class || 'div_checklist';
	        //defines css class for checklist filters
	        this.checkListCssClass = f.checklist_css_class || 'flt_checklist';
	        //defines css class for checklist item (li)
	        this.checkListItemCssClass = f.checklist_item_css_class || 'flt_checklist_item';
	        //defines css class for selected checklist item (li)
	        this.checkListSlcItemCssClass = f.checklist_selected_item_css_class || 'flt_checklist_slc_item';
	        //Load on demand text
	        this.activateCheckListTxt = f.activate_checklist_text || 'Click to load filter data';
	        //defines css class for checklist filters
	        this.checkListItemDisabledCssClass = f.checklist_item_disabled_css_class || 'flt_checklist_item_disabled';
	        this.enableCheckListResetFilter = f.enable_checklist_reset_filter === false ? false : true;
	        //checklist filter container div
	        this.prfxCheckListDiv = 'chkdiv_';
	
	        this.isCustom = null;
	        this.opts = null;
	        this.optsTxt = null;
	        this.excludedOpts = null;
	
	        this.tf = tf;
	    }
	
	    _createClass(CheckList, [{
	        key: 'onChange',
	
	        // TODO: move event here
	        value: function onChange(evt) {
	            var elm = evt.target;
	            this.tf.activeFilterId = elm.getAttribute('id');
	            this.tf.activeFlt = _Dom2['default'].id(this.tf.activeFilterId);
	            this.tf.Evt.onSlcChange.call(this.tf, evt);
	        }
	    }, {
	        key: 'optionClick',
	        value: function optionClick(evt) {
	            this.setCheckListValues(evt.target);
	            this.onChange(evt);
	        }
	    }, {
	        key: 'build',
	
	        /**
	         * Build checklist UI asynchronously
	         * @param  {Number}  colIndex   Column index
	         * @param  {Boolean} isExternal Render in external container
	         * @param  {String}  extFltId   External container id
	         */
	        value: function build(colIndex, isExternal, extFltId) {
	            var tf = this.tf;
	            tf.EvtManager(tf.Evt.name.checklist, { slcIndex: colIndex, slcExternal: isExternal, slcId: extFltId });
	        }
	    }, {
	        key: '_build',
	
	        /**
	         * Build checklist UI
	         * @param  {Number}  colIndex   Column index
	         * @param  {Boolean} isExternal Render in external container
	         * @param  {String}  extFltId   External container id
	         */
	        value: function _build(colIndex) {
	            var _this = this;
	
	            var isExternal = arguments[1] === undefined ? false : arguments[1];
	            var extFltId = arguments[2] === undefined ? null : arguments[2];
	
	            var tf = this.tf;
	            colIndex = parseInt(colIndex, 10);
	
	            this.opts = [];
	            this.optsTxt = [];
	
	            var divFltId = this.prfxCheckListDiv + colIndex + '_' + tf.id;
	            if (!_Dom2['default'].id(divFltId) && !isExternal || !_Dom2['default'].id(extFltId) && isExternal) {
	                return;
	            }
	
	            var flt = !isExternal ? this.checkListDiv[colIndex] : _Dom2['default'].id(extFltId);
	            var ul = _Dom2['default'].create('ul', ['id', tf.fltIds[colIndex]], ['colIndex', colIndex]);
	            ul.className = this.checkListCssClass;
	            _Event2['default'].add(ul, 'change', function (evt) {
	                _this.onChange(evt);
	            });
	
	            var rows = tf.tbl.rows;
	            this.isCustom = tf.isCustomOptions(colIndex);
	
	            var activeFlt;
	            if (tf.linkedFilters && tf.activeFilterId) {
	                activeFlt = tf.activeFilterId.split('_')[0];
	                activeFlt = activeFlt.split(tf.prfxFlt)[1];
	            }
	
	            var filteredDataCol = [];
	            if (tf.linkedFilters && tf.disableExcludedOptions) {
	                this.excludedOpts = [];
	            }
	
	            for (var k = tf.refRow; k < tf.nbRows; k++) {
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
	                    if (colIndex === j && (!tf.linkedFilters || tf.linkedFilters && tf.disableExcludedOptions) || colIndex === j && tf.linkedFilters && (rows[k].style.display === '' && !tf.paging || tf.paging && (!activeFlt || activeFlt === colIndex || activeFlt != colIndex && _Arr2['default'].has(tf.validRowsIndex, k)))) {
	                        var cell_data = tf.getCellData(j, cells[j]);
	                        //Vary Peter's patch
	                        var cell_string = _Str2['default'].matchCase(cell_data, tf.matchCase);
	                        // checks if celldata is already in array
	                        if (!_Arr2['default'].has(this.opts, cell_string, tf.matchCase)) {
	                            this.opts.push(cell_data);
	                        }
	                        var filteredCol = filteredDataCol[j];
	                        if (tf.linkedFilters && tf.disableExcludedOptions) {
	                            if (!filteredCol) {
	                                filteredCol = tf.getFilteredDataCol(j);
	                            }
	                            if (!_Arr2['default'].has(filteredCol, cell_string, tf.matchCase) && !_Arr2['default'].has(this.excludedOpts, cell_string, tf.matchCase) && !tf.isFirstLoad) {
	                                this.excludedOpts.push(cell_data);
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
	                if (!tf.matchCase) {
	                    this.opts.sort(_Sort2['default'].ignoreCase);
	                    if (this.excludedOpts) {
	                        this.excludedOpts.sort(_Sort2['default'].ignoreCase);
	                    }
	                } else {
	                    this.opts.sort();
	                    if (this.excludedOpts) {
	                        this.excludedOpts.sort();
	                    }
	                }
	            }
	            //asc sort
	            if (tf.sortNumAsc && _Arr2['default'].has(tf.sortNumAsc, colIndex)) {
	                try {
	                    this.opts.sort(numSortAsc);
	                    if (this.excludedOpts) {
	                        this.excludedOpts.sort(numSortAsc);
	                    }
	                    if (this.isCustom) {
	                        this.optsTxt.sort(numSortAsc);
	                    }
	                } catch (e) {
	                    this.opts.sort();
	                    if (this.excludedOpts) {
	                        this.excludedOpts.sort();
	                    }
	                    if (this.isCustom) {
	                        this.optsTxt.sort();
	                    }
	                } //in case there are alphanumeric values
	            }
	            //desc sort
	            if (tf.sortNumDesc && _Arr2['default'].has(tf.sortNumDesc, colIndex)) {
	                try {
	                    this.opts.sort(numSortDesc);
	                    if (this.excludedOpts) {
	                        this.excludedOpts.sort(numSortDesc);
	                    }
	                    if (this.isCustom) {
	                        this.optsTxt.sort(numSortDesc);
	                    }
	                } catch (e) {
	                    this.opts.sort();
	                    if (this.excludedOpts) {
	                        this.excludedOpts.sort();
	                    }
	                    if (this.isCustom) {
	                        this.optsTxt.sort();
	                    }
	                } //in case there are alphanumeric values
	            }
	
	            this.addChecks(colIndex, ul, tf.separator);
	
	            if (tf.fillSlcOnDemand) {
	                flt.innerHTML = '';
	            }
	            flt.appendChild(ul);
	            flt.setAttribute('filled', '1');
	        }
	    }, {
	        key: 'addChecks',
	
	        /**
	         * Add checklist options
	         * @param {Number} colIndex  Column index
	         * @param {Object} ul        Ul element
	         */
	        value: function addChecks(colIndex, ul) {
	            var _this2 = this;
	
	            var tf = this.tf;
	            var chkCt = this.addTChecks(colIndex, ul);
	            var fltArr = []; //remember grid values
	            var store = tf.feature('store');
	            var tmpVal = store ? store.getFilterValues(tf.fltsValuesCookie)[colIndex] : null;
	            if (tmpVal && _Str2['default'].trim(tmpVal).length > 0) {
	                if (tf.hasCustomSlcOptions && _Arr2['default'].has(tf.customSlcOptions.cols, colIndex)) {
	                    fltArr.push(tmpVal);
	                } else {
	                    fltArr = tmpVal.split(' ' + tf.orOperator + ' ');
	                }
	            }
	
	            for (var y = 0; y < this.opts.length; y++) {
	                var val = this.opts[y]; //item value
	                var lbl = this.isCustom ? this.optsTxt[y] : val; //item text
	                var li = _Dom2['default'].createCheckItem(tf.fltIds[colIndex] + '_' + (y + chkCt), val, lbl);
	                li.className = this.checkListItemCssClass;
	                if (tf.linkedFilters && tf.disableExcludedOptions && _Arr2['default'].has(this.excludedOpts, _Str2['default'].matchCase(val, tf.matchCase), tf.matchCase)) {
	                    _Dom2['default'].addClass(li, this.checkListItemDisabledCssClass);
	                    li.check.disabled = true;
	                    li.disabled = true;
	                } else {
	                    _Event2['default'].add(li.check, 'click', function (evt) {
	                        _this2.optionClick(evt);
	                    });
	                }
	                ul.appendChild(li);
	
	                if (val === '') {
	                    //item is hidden
	                    li.style.display = 'none';
	                }
	
	                /*** remember grid values ***/
	                if (tf.rememberGridValues) {
	                    if (tf.hasCustomSlcOptions && _Arr2['default'].has(tf.customSlcOptions.cols, colIndex) && fltArr.toString().indexOf(val) != -1 || _Arr2['default'].has(fltArr, _Str2['default'].matchCase(val, tf.matchCase), tf.matchCase)) {
	                        li.check.checked = true;
	                        this.setCheckListValues(li.check);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'addTChecks',
	
	        /**
	         * Add checklist header option
	         * @param {Number} colIndex Column index
	         * @param {Object} ul       Ul element
	         */
	        value: function addTChecks(colIndex, ul) {
	            var _this3 = this;
	
	            var tf = this.tf;
	            var chkCt = 1;
	            var li0 = _Dom2['default'].createCheckItem(tf.fltIds[colIndex] + '_0', '', tf.displayAllText);
	            li0.className = this.checkListItemCssClass;
	            ul.appendChild(li0);
	
	            _Event2['default'].add(li0.check, 'click', function (evt) {
	                _this3.optionClick(evt);
	            });
	
	            if (!this.enableCheckListResetFilter) {
	                li0.style.display = 'none';
	            }
	
	            if (tf.enableEmptyOption) {
	                var li1 = _Dom2['default'].createCheckItem(tf.fltIds[colIndex] + '_1', tf.emOperator, tf.emptyText);
	                li1.className = this.checkListItemCssClass;
	                ul.appendChild(li1);
	                _Event2['default'].add(li1.check, 'click', function (evt) {
	                    _this3.optionClick(evt);
	                });
	                chkCt++;
	            }
	
	            if (tf.enableNonEmptyOption) {
	                var li2 = _Dom2['default'].createCheckItem(tf.fltIds[colIndex] + '_2', tf.nmOperator, tf.nonEmptyText);
	                li2.className = this.checkListItemCssClass;
	                ul.appendChild(li2);
	                _Event2['default'].add(li2.check, 'click', function (evt) {
	                    _this3.optionClick(evt);
	                });
	                chkCt++;
	            }
	            return chkCt;
	        }
	    }, {
	        key: 'setCheckListValues',
	
	        /**
	         * Store checked options in DOM element attribute
	         * @param {Object} o checklist option DOM element
	         */
	        value: function setCheckListValues(o) {
	            if (!o) {
	                return;
	            }
	            var tf = this.tf;
	            var chkValue = o.value; //checked item value
	            var chkIndex = parseInt(o.id.split('_')[2], 10);
	            var filterTag = 'ul',
	                itemTag = 'li';
	            var n = o;
	
	            //ul tag search
	            while (_Str2['default'].lower(n.nodeName) !== filterTag) {
	                n = n.parentNode;
	            }
	
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
	                            var cChk = _Dom2['default'].id(tf.fltIds[colIndex] + '_' + indSplit[u]);
	                            if (cChk) {
	                                cChk.checked = false;
	                                _Dom2['default'].removeClass(n.childNodes[indSplit[u]], this.checkListSlcItemCssClass);
	                            }
	                        }
	                    }
	                    n.setAttribute('value', '');
	                    n.setAttribute('indexes', '');
	                } else {
	                    fltValue = fltValue ? fltValue : '';
	                    chkValue = _Str2['default'].trim(fltValue + ' ' + chkValue + ' ' + tf.orOperator);
	                    chkIndex = fltIndexes + chkIndex + tf.separator;
	                    n.setAttribute('value', chkValue);
	                    n.setAttribute('indexes', chkIndex);
	                    //1st option unchecked
	                    if (_Dom2['default'].id(tf.fltIds[colIndex] + '_0')) {
	                        _Dom2['default'].id(tf.fltIds[colIndex] + '_0').checked = false;
	                    }
	                }
	
	                if (_Str2['default'].lower(li.nodeName) === itemTag) {
	                    _Dom2['default'].removeClass(n.childNodes[0], this.checkListSlcItemCssClass);
	                    _Dom2['default'].addClass(li, this.checkListSlcItemCssClass);
	                }
	            } else {
	                //removes values and indexes
	                if (chkValue !== '') {
	                    var replaceValue = new RegExp(_Str2['default'].rgxEsc(chkValue + ' ' + tf.orOperator));
	                    fltValue = fltValue.replace(replaceValue, '');
	                    n.setAttribute('value', _Str2['default'].trim(fltValue));
	
	                    var replaceIndex = new RegExp(_Str2['default'].rgxEsc(chkIndex + tf.separator));
	                    fltIndexes = fltIndexes.replace(replaceIndex, '');
	                    n.setAttribute('indexes', fltIndexes);
	                }
	                if (_Str2['default'].lower(li.nodeName) === itemTag) {
	                    _Dom2['default'].removeClass(li, this.checkListSlcItemCssClass);
	                }
	            }
	        }
	    }]);
	
	    return CheckList;
	})();
	
	exports.CheckList = CheckList;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Types = __webpack_require__(6);
	
	var _Types2 = _interopRequireDefault(_Types);
	
	var RowsCounter = (function () {
	
	    /**
	     * Rows counter
	     * @param {Object} tf TableFilter instance
	     */
	
	    function RowsCounter(tf) {
	        _classCallCheck(this, RowsCounter);
	
	        // TableFilter configuration
	        var f = tf.config();
	
	        //id of custom container element
	        this.rowsCounterTgtId = f.rows_counter_target_id || null;
	        //element containing tot nb rows
	        this.rowsCounterDiv = null;
	        //element containing tot nb rows label
	        this.rowsCounterSpan = null;
	        //defines rows counter text
	        this.rowsCounterText = f.rows_counter_text || 'Rows: ';
	        this.fromToTextSeparator = f.from_to_text_separator || '-';
	        this.overText = f.over_text || ' / ';
	        //defines css class rows counter
	        this.totRowsCssClass = f.tot_rows_css_class || 'tot';
	        //rows counter div
	        this.prfxCounter = 'counter_';
	        //nb displayed rows label
	        this.prfxTotRows = 'totrows_span_';
	        //label preceding nb rows label
	        this.prfxTotRowsTxt = 'totRowsTextSpan_';
	        //callback raised before counter is refreshed
	        this.onBeforeRefreshCounter = _Types2['default'].isFn(f.on_before_refresh_counter) ? f.on_before_refresh_counter : null;
	        //callback raised after counter is refreshed
	        this.onAfterRefreshCounter = _Types2['default'].isFn(f.on_after_refresh_counter) ? f.on_after_refresh_counter : null;
	
	        this.tf = tf;
	    }
	
	    _createClass(RowsCounter, [{
	        key: 'init',
	        value: function init() {
	            var tf = this.tf;
	
	            if (!tf.hasGrid() && !tf.isFirstLoad || this.rowsCounterSpan) {
	                return;
	            }
	
	            //rows counter container
	            var countDiv = _Dom2['default'].create('div', ['id', this.prfxCounter + tf.id]);
	            countDiv.className = this.totRowsCssClass;
	            //rows counter label
	            var countSpan = _Dom2['default'].create('span', ['id', this.prfxTotRows + tf.id]);
	            var countText = _Dom2['default'].create('span', ['id', this.prfxTotRowsTxt + tf.id]);
	            countText.appendChild(_Dom2['default'].text(this.rowsCounterText));
	
	            // counter is added to defined element
	            if (!this.rowsCounterTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.rowsCounterTgtId ? tf.lDiv : _Dom2['default'].id(this.rowsCounterTgtId);
	
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
	
	            this.refresh();
	        }
	    }, {
	        key: 'refresh',
	        value: function refresh(p) {
	            if (!this.rowsCounterSpan) {
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
	                    totTxt = tf.nbFilterableRows - tf.nbHiddenRows;
	                }
	            } else {
	                var paging = tf.feature('paging');
	                if (paging) {
	                    //paging start row
	                    var paging_start_row = parseInt(paging.startPagingRow, 10) + (tf.nbVisibleRows > 0 ? 1 : 0);
	                    var paging_end_row = paging_start_row + paging.pagingLength - 1 <= tf.nbVisibleRows ? paging_start_row + paging.pagingLength - 1 : tf.nbVisibleRows;
	                    totTxt = paging_start_row + this.fromToTextSeparator + paging_end_row + this.overText + tf.nbVisibleRows;
	                }
	            }
	
	            this.rowsCounterSpan.innerHTML = totTxt;
	            if (this.onAfterRefreshCounter) {
	                this.onAfterRefreshCounter.call(null, tf, this.rowsCounterSpan, totTxt);
	            }
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var tf = this.tf;
	            if (!tf.hasGrid() || !this.rowsCounterSpan) {
	                return;
	            }
	
	            if (!this.rowsCounterTgtId && this.rowsCounterDiv) {
	                this.rowsCounterDiv.parentNode.removeChild(this.rowsCounterDiv);
	            } else {
	                _Dom2['default'].id(this.rowsCounterTgtId).innerHTML = '';
	            }
	            this.rowsCounterSpan = null;
	            this.rowsCounterDiv = null;
	        }
	    }]);
	
	    return RowsCounter;
	})();
	
	exports.RowsCounter = RowsCounter;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Types = __webpack_require__(6);
	
	var _Types2 = _interopRequireDefault(_Types);
	
	var global = window;
	
	var StatusBar = (function () {
	
	    /**
	     * Status bar UI component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function StatusBar(tf) {
	        _classCallCheck(this, StatusBar);
	
	        // Configuration object
	        var f = tf.config();
	
	        //id of custom container element
	        this.statusBarTgtId = f.status_bar_target_id || null;
	        //element containing status bar label
	        this.statusBarDiv = null;
	        //status bar
	        this.statusBarSpan = null;
	        //status bar label
	        this.statusBarSpanText = null;
	        //defines status bar text
	        this.statusBarText = f.status_bar_text || '';
	        //defines css class status bar
	        this.statusBarCssClass = f.status_bar_css_class || 'status';
	        //delay for status bar clearing
	        this.statusBarCloseDelay = 250;
	
	        //calls function before message is displayed
	        this.onBeforeShowMsg = _Types2['default'].isFn(f.on_before_show_msg) ? f.on_before_show_msg : null;
	        //calls function after message is displayed
	        this.onAfterShowMsg = _Types2['default'].isFn(f.on_after_show_msg) ? f.on_after_show_msg : null;
	
	        // status bar div
	        this.prfxStatus = 'status_';
	        // status bar label
	        this.prfxStatusSpan = 'statusSpan_';
	        // text preceding status bar label
	        this.prfxStatusTxt = 'statusText_';
	
	        this.tf = tf;
	    }
	
	    _createClass(StatusBar, [{
	        key: 'init',
	        value: function init() {
	            var tf = this.tf;
	            if (!tf.hasGrid() && !tf.isFirstLoad) {
	                return;
	            }
	
	            //status bar container
	            var statusDiv = _Dom2['default'].create('div', ['id', this.prfxStatus + tf.id]);
	            statusDiv.className = this.statusBarCssClass;
	
	            //status bar label
	            var statusSpan = _Dom2['default'].create('span', ['id', this.prfxStatusSpan + tf.id]);
	            //preceding text
	            var statusSpanText = _Dom2['default'].create('span', ['id', this.prfxStatusTxt + tf.id]);
	            statusSpanText.appendChild(_Dom2['default'].text(this.statusBarText));
	
	            // target element container
	            if (!this.statusBarTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.statusBarTgtId ? tf.lDiv : _Dom2['default'].id(this.statusBarTgtId);
	
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
	        }
	    }, {
	        key: 'message',
	        value: function message() {
	            var _this = this;
	
	            var t = arguments[0] === undefined ? '' : arguments[0];
	
	            var tf = this.tf;
	            if (!tf.statusBar || !this.statusBarSpan) {
	                return;
	            }
	            if (this.onBeforeShowMsg) {
	                this.onBeforeShowMsg.call(null, this.tf, t);
	            }
	
	            var d = t === '' ? this.statusBarCloseDelay : 1;
	            global.setTimeout(function () {
	                _this.statusBarSpan.innerHTML = t;
	                if (_this.onAfterShowMsg) {
	                    _this.onAfterShowMsg.call(null, _this.tf, t);
	                }
	            }, d);
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var tf = this.tf;
	            if (!tf.hasGrid() || !this.statusBarDiv) {
	                return;
	            }
	
	            this.statusBarDiv.innerHTML = '';
	            this.statusBarDiv.parentNode.removeChild(this.statusBarDiv);
	            this.statusBarSpan = null;
	            this.statusBarSpanText = null;
	            this.statusBarDiv = null;
	        }
	    }]);
	
	    return StatusBar;
	})();
	
	exports.StatusBar = StatusBar;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Types = __webpack_require__(6);
	
	var _Types2 = _interopRequireDefault(_Types);
	
	var _Str = __webpack_require__(4);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	var _Event = __webpack_require__(2);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var Paging = (function () {
	
	    /**
	     * Pagination component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function Paging(tf) {
	        _classCallCheck(this, Paging);
	
	        // Configuration object
	        var f = tf.config();
	
	        //css class for paging buttons (previous,next,etc.)
	        this.btnPageCssClass = f.paging_btn_css_class || 'pgInp';
	        //stores paging select element
	        this.pagingSlc = null;
	        //results per page select element
	        this.resultsPerPageSlc = null;
	        //id of container element
	        this.pagingTgtId = f.paging_target_id || null;
	        //defines table paging length
	        this.pagingLength = !isNaN(f.paging_length) ? f.paging_length : 10;
	        //id of container element
	        this.resultsPerPageTgtId = f.results_per_page_target_id || null;
	        //css class for paging select element
	        this.pgSlcCssClass = f.paging_slc_css_class || 'pgSlc';
	        //css class for paging input element
	        this.pgInpCssClass = f.paging_inp_css_class || 'pgNbInp';
	        //stores results per page text and values
	        this.resultsPerPage = f.results_per_page || null;
	        //enables/disables results per page drop-down
	        this.hasResultsPerPage = _Types2['default'].isArray(this.resultsPerPage);
	        //defines css class for results per page select
	        this.resultsSlcCssClass = f.results_slc_css_class || 'rspg';
	        //css class for label preceding results per page select
	        this.resultsSpanCssClass = f.results_span_css_class || 'rspgSpan';
	        //1st row index of current page
	        this.startPagingRow = 0;
	        //total nb of pages
	        this.nbPages = 0;
	        //current page nb
	        this.currentPageNb = 1;
	        //defines next page button text
	        this.btnNextPageText = f.btn_next_page_text || '>';
	        //defines previous page button text
	        this.btnPrevPageText = f.btn_prev_page_text || '<';
	        //defines last page button text
	        this.btnLastPageText = f.btn_last_page_text || '>|';
	        //defines first page button text
	        this.btnFirstPageText = f.btn_first_page_text || '|<';
	        //defines next page button html
	        this.btnNextPageHtml = f.btn_next_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + this.btnPageCssClass + ' nextPage" title="Next page" />');
	        //defines previous page button html
	        this.btnPrevPageHtml = f.btn_prev_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + this.btnPageCssClass + ' previousPage" title="Previous page" />');
	        //defines last page button html
	        this.btnFirstPageHtml = f.btn_first_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + this.btnPageCssClass + ' firstPage" title="First page" />');
	        //defines previous page button html
	        this.btnLastPageHtml = f.btn_last_page_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + this.btnPageCssClass + ' lastPage" title="Last page" />');
	        //defines text preceeding page selector drop-down
	        this.pageText = f.page_text || ' Page ';
	        //defines text after page selector drop-down
	        this.ofText = f.of_text || ' of ';
	        //css class for span containing tot nb of pages
	        this.nbPgSpanCssClass = f.nb_pages_css_class || 'nbpg';
	        //enables/disables paging buttons
	        this.hasPagingBtns = f.paging_btns === false ? false : true;
	        //defines previous page button html
	        this.pageSelectorType = f.page_selector_type || tf.fltTypeSlc;
	        //calls function before page is changed
	        this.onBeforeChangePage = _Types2['default'].isFn(f.on_before_change_page) ? f.on_before_change_page : null;
	        //calls function before page is changed
	        this.onAfterChangePage = _Types2['default'].isFn(f.on_after_change_page) ? f.on_after_change_page : null;
	
	        //pages select
	        this.prfxSlcPages = 'slcPages_';
	        //results per page select
	        this.prfxSlcResults = 'slcResults_';
	        //label preciding results per page select
	        this.prfxSlcResultsTxt = 'slcResultsTxt_';
	        //span containing next page button
	        this.prfxBtnNextSpan = 'btnNextSpan_';
	        //span containing previous page button
	        this.prfxBtnPrevSpan = 'btnPrevSpan_';
	        //span containing last page button
	        this.prfxBtnLastSpan = 'btnLastSpan_';
	        //span containing first page button
	        this.prfxBtnFirstSpan = 'btnFirstSpan_';
	        //next button
	        this.prfxBtnNext = 'btnNext_';
	        //previous button
	        this.prfxBtnPrev = 'btnPrev_';
	        //last button
	        this.prfxBtnLast = 'btnLast_';
	        //first button
	        this.prfxBtnFirst = 'btnFirst_';
	        //span for tot nb pages
	        this.prfxPgSpan = 'pgspan_';
	        //span preceding pages select (contains 'Page')
	        this.prfxPgBeforeSpan = 'pgbeforespan_';
	        //span following pages select (contains ' of ')
	        this.prfxPgAfterSpan = 'pgafterspan_';
	
	        var start_row = this.refRow;
	        var nrows = this.nbRows;
	        //calculates page nb
	        this.nbPages = Math.ceil((nrows - start_row) / this.pagingLength);
	
	        //Paging elements events
	        var o = this;
	        // Paging DOM events
	        this.evt = {
	            slcIndex: function slcIndex() {
	                return o.pageSelectorType === tf.fltTypeSlc ? o.pagingSlc.options.selectedIndex : parseInt(o.pagingSlc.value, 10) - 1;
	            },
	            nbOpts: function nbOpts() {
	                return o.pageSelectorType === tf.fltTypeSlc ? parseInt(o.pagingSlc.options.length, 10) - 1 : o.nbPages - 1;
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
	                var key = _Event2['default'].keyCode(e);
	                if (key === 13) {
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
	
	        this.tf = tf;
	    }
	
	    _createClass(Paging, [{
	        key: 'init',
	
	        /**
	         * Initialize DOM elements
	         */
	        value: function init() {
	            var _this = this;
	
	            var slcPages;
	            var tf = this.tf;
	            var evt = this.evt;
	
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
	                _this.changePage(slc.selectedIndex);
	            };
	
	            // Paging drop-down list selector
	            if (this.pageSelectorType === tf.fltTypeSlc) {
	                slcPages = _Dom2['default'].create(tf.fltTypeSlc, ['id', this.prfxSlcPages + tf.id]);
	                slcPages.className = this.pgSlcCssClass;
	                _Event2['default'].add(slcPages, 'change', evt.slcPagesChange);
	            }
	
	            // Paging input selector
	            if (this.pageSelectorType === tf.fltTypeInp) {
	                slcPages = _Dom2['default'].create(tf.fltTypeInp, ['id', this.prfxSlcPages + tf.id], ['value', this.currentPageNb]);
	                slcPages.className = this.pgInpCssClass;
	                _Event2['default'].add(slcPages, 'keypress', evt._detectKey);
	            }
	
	            // btns containers
	            var btnNextSpan = _Dom2['default'].create('span', ['id', this.prfxBtnNextSpan + tf.id]);
	            var btnPrevSpan = _Dom2['default'].create('span', ['id', this.prfxBtnPrevSpan + tf.id]);
	            var btnLastSpan = _Dom2['default'].create('span', ['id', this.prfxBtnLastSpan + tf.id]);
	            var btnFirstSpan = _Dom2['default'].create('span', ['id', this.prfxBtnFirstSpan + tf.id]);
	
	            if (this.hasPagingBtns) {
	                // Next button
	                if (!this.btnNextPageHtml) {
	                    var btn_next = _Dom2['default'].create(tf.fltTypeInp, ['id', this.prfxBtnNext + tf.id], ['type', 'button'], ['value', this.btnNextPageText], ['title', 'Next']);
	                    btn_next.className = this.btnPageCssClass;
	                    _Event2['default'].add(btn_next, 'click', evt.next);
	                    btnNextSpan.appendChild(btn_next);
	                } else {
	                    btnNextSpan.innerHTML = this.btnNextPageHtml;
	                    _Event2['default'].add(btnNextSpan, 'click', evt.next);
	                }
	                // Previous button
	                if (!this.btnPrevPageHtml) {
	                    var btn_prev = _Dom2['default'].create(tf.fltTypeInp, ['id', this.prfxBtnPrev + tf.id], ['type', 'button'], ['value', this.btnPrevPageText], ['title', 'Previous']);
	                    btn_prev.className = this.btnPageCssClass;
	                    _Event2['default'].add(btn_prev, 'click', evt.prev);
	                    btnPrevSpan.appendChild(btn_prev);
	                } else {
	                    btnPrevSpan.innerHTML = this.btnPrevPageHtml;
	                    _Event2['default'].add(btnPrevSpan, 'click', evt.prev);
	                }
	                // Last button
	                if (!this.btnLastPageHtml) {
	                    var btn_last = _Dom2['default'].create(tf.fltTypeInp, ['id', this.prfxBtnLast + tf.id], ['type', 'button'], ['value', this.btnLastPageText], ['title', 'Last']);
	                    btn_last.className = this.btnPageCssClass;
	                    _Event2['default'].add(btn_last, 'click', evt.last);
	                    btnLastSpan.appendChild(btn_last);
	                } else {
	                    btnLastSpan.innerHTML = this.btnLastPageHtml;
	                    _Event2['default'].add(btnLastSpan, 'click', evt.last);
	                }
	                // First button
	                if (!this.btnFirstPageHtml) {
	                    var btn_first = _Dom2['default'].create(tf.fltTypeInp, ['id', this.prfxBtnFirst + tf.id], ['type', 'button'], ['value', this.btnFirstPageText], ['title', 'First']);
	                    btn_first.className = this.btnPageCssClass;
	                    _Event2['default'].add(btn_first, 'click', evt.first);
	                    btnFirstSpan.appendChild(btn_first);
	                } else {
	                    btnFirstSpan.innerHTML = this.btnFirstPageHtml;
	                    _Event2['default'].add(btnFirstSpan, 'click', evt.first);
	                }
	            }
	
	            // paging elements (buttons+drop-down list) are added to defined element
	            if (!this.pagingTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.pagingTgtId ? tf.mDiv : _Dom2['default'].id(this.pagingTgtId);
	            targetEl.appendChild(btnFirstSpan);
	            targetEl.appendChild(btnPrevSpan);
	
	            var pgBeforeSpan = _Dom2['default'].create('span', ['id', this.prfxPgBeforeSpan + tf.id]);
	            pgBeforeSpan.appendChild(_Dom2['default'].text(this.pageText));
	            pgBeforeSpan.className = this.nbPgSpanCssClass;
	            targetEl.appendChild(pgBeforeSpan);
	            targetEl.appendChild(slcPages);
	            var pgAfterSpan = _Dom2['default'].create('span', ['id', this.prfxPgAfterSpan + tf.id]);
	            pgAfterSpan.appendChild(_Dom2['default'].text(this.ofText));
	            pgAfterSpan.className = this.nbPgSpanCssClass;
	            targetEl.appendChild(pgAfterSpan);
	            var pgspan = _Dom2['default'].create('span', ['id', this.prfxPgSpan + tf.id]);
	            pgspan.className = this.nbPgSpanCssClass;
	            pgspan.appendChild(_Dom2['default'].text(' ' + this.nbPages + ' '));
	            targetEl.appendChild(pgspan);
	            targetEl.appendChild(btnNextSpan);
	            targetEl.appendChild(btnLastSpan);
	            this.pagingSlc = _Dom2['default'].id(this.prfxSlcPages + tf.id);
	
	            if (!tf.rememberGridValues || this.isPagingRemoved) {
	                this.setPagingInfo();
	            }
	            if (!tf.fltGrid) {
	                tf.validateAllRows();
	                this.setPagingInfo(tf.validRowsIndex);
	            }
	
	            this.isPagingRemoved = false;
	        }
	    }, {
	        key: 'reset',
	
	        /**
	         * Reset paging when filters are already instantiated
	         * @param {Boolean} filterTable Execute filtering once paging instanciated
	         */
	        value: function reset() {
	            var filterTable = arguments[0] === undefined ? false : arguments[0];
	
	            var tf = this.tf;
	            if (!tf.hasGrid() || tf.paging) {
	                return;
	            }
	            tf.paging = true;
	            this.isPagingRemoved = true;
	            this.init();
	            tf.resetValues();
	            if (filterTable) {
	                tf.filter();
	            }
	        }
	    }, {
	        key: 'setPagingInfo',
	
	        /**
	         * Calculate number of pages based on valid rows
	         * Refresh paging select according to number of pages
	         * @param {Array} validRows Collection of valid rows
	         */
	        value: function setPagingInfo() {
	            var validRows = arguments[0] === undefined ? [] : arguments[0];
	
	            var tf = this.tf;
	            var rows = tf.tbl.rows;
	            var mdiv = !this.pagingTgtId ? tf.mDiv : _Dom2['default'].id(this.pagingTgtId);
	            var pgspan = _Dom2['default'].id(this.prfxPgSpan + tf.id);
	
	            //store valid rows indexes
	            tf.validRowsIndex = validRows;
	
	            if (validRows.length === 0) {
	                //counts rows to be grouped
	                for (var j = tf.refRow; j < tf.nbRows; j++) {
	                    var row = rows[j];
	                    if (!row) {
	                        continue;
	                    }
	
	                    var isRowValid = row.getAttribute('validRow');
	                    if (_Types2['default'].isNull(isRowValid) || Boolean(isRowValid === 'true')) {
	                        tf.validRowsIndex.push(j);
	                    }
	                }
	            }
	
	            //calculate nb of pages
	            this.nbPages = Math.ceil(tf.validRowsIndex.length / this.pagingLength);
	            //refresh page nb span
	            pgspan.innerHTML = this.nbPages;
	            //select clearing shortcut
	            if (this.pageSelectorType === tf.fltTypeSlc) {
	                this.pagingSlc.innerHTML = '';
	            }
	
	            if (this.nbPages > 0) {
	                mdiv.style.visibility = 'visible';
	                if (this.pageSelectorType === tf.fltTypeSlc) {
	                    for (var z = 0; z < this.nbPages; z++) {
	                        var opt = _Dom2['default'].createOpt(z + 1, z * this.pagingLength, false);
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
	        }
	    }, {
	        key: 'groupByPage',
	
	        /**
	         * Group table rows by page and display valid rows
	         * @param  {Array} validRows Collection of valid rows
	         */
	        value: function groupByPage(validRows) {
	            var tf = this.tf;
	            var alternateRows = tf.feature('alternateRows');
	            var rows = tf.tbl.rows;
	            var endPagingRow = parseInt(this.startPagingRow, 10) + parseInt(this.pagingLength, 10);
	
	            //store valid rows indexes
	            if (validRows) {
	                tf.validRowsIndex = validRows;
	            }
	
	            //this loop shows valid rows of current page
	            for (var h = 0, len = tf.validRowsIndex.length; h < len; h++) {
	                var validRowIdx = tf.validRowsIndex[h];
	                var r = rows[validRowIdx];
	                var isRowValid = r.getAttribute('validRow');
	
	                if (h >= this.startPagingRow && h < endPagingRow) {
	                    if (_Types2['default'].isNull(isRowValid) || Boolean(isRowValid === 'true')) {
	                        r.style.display = '';
	                    }
	                    if (tf.alternateBgs && alternateRows) {
	                        alternateRows.setRowBg(validRowIdx, h);
	                    }
	                } else {
	                    r.style.display = 'none';
	                    if (tf.alternateBgs && alternateRows) {
	                        alternateRows.removeRowBg(validRowIdx);
	                    }
	                }
	            }
	
	            tf.nbVisibleRows = tf.validRowsIndex.length;
	            //re-applies filter behaviours after filtering process
	            tf.applyProps();
	        }
	    }, {
	        key: 'getPage',
	
	        /**
	         * Return the current page number
	         * @return {Number} Page number
	         */
	        value: function getPage() {
	            return this.currentPageNb;
	        }
	    }, {
	        key: 'setPage',
	
	        /**
	         * Show page based on passed param value (string or number):
	         * @param {String} or {Number} cmd possible string values: 'next',
	         * 'previous', 'last', 'first' or page number as per param
	         */
	        value: function setPage(cmd) {
	            var tf = this.tf;
	            if (!tf.hasGrid() || !tf.paging) {
	                return;
	            }
	            var btnEvt = this.evt,
	                cmdtype = typeof cmd;
	            if (cmdtype === 'string') {
	                switch (_Str2['default'].lower(cmd)) {
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
	        }
	    }, {
	        key: 'setResultsPerPage',
	
	        /**
	         * Generates UI elements for the number of results per page drop-down
	         */
	        value: function setResultsPerPage() {
	            var _this2 = this;
	
	            var tf = this.tf;
	            var evt = this.evt;
	
	            if (!tf.hasGrid() && !tf.isFirstLoad) {
	                return;
	            }
	            if (this.resultsPerPageSlc || !this.resultsPerPage) {
	                return;
	            }
	
	            evt.slcResultsChange = function (ev) {
	                _this2.changeResultsPerPage();
	                ev.target.blur();
	            };
	
	            var slcR = _Dom2['default'].create(tf.fltTypeSlc, ['id', this.prfxSlcResults + tf.id]);
	            slcR.className = this.resultsSlcCssClass;
	            var slcRText = this.resultsPerPage[0],
	                slcROpts = this.resultsPerPage[1];
	            var slcRSpan = _Dom2['default'].create('span', ['id', this.prfxSlcResultsTxt + tf.id]);
	            slcRSpan.className = this.resultsSpanCssClass;
	
	            // results per page select is added to external element
	            if (!this.resultsPerPageTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.resultsPerPageTgtId ? tf.rDiv : _Dom2['default'].id(this.resultsPerPageTgtId);
	            slcRSpan.appendChild(_Dom2['default'].text(slcRText));
	
	            var help = tf.feature('help');
	            if (help && help.cont) {
	                help.cont.parentNode.insertBefore(slcRSpan, help.cont);
	                help.cont.parentNode.insertBefore(slcR, help.cont);
	            } else {
	                targetEl.appendChild(slcRSpan);
	                targetEl.appendChild(slcR);
	            }
	
	            for (var r = 0; r < slcROpts.length; r++) {
	                var currOpt = new Option(slcROpts[r], slcROpts[r], false, false);
	                slcR.options[r] = currOpt;
	            }
	            _Event2['default'].add(slcR, 'change', evt.slcResultsChange);
	            this.resultsPerPageSlc = slcR;
	        }
	    }, {
	        key: 'removeResultsPerPage',
	
	        /**
	         * Remove number of results per page UI elements
	         */
	        value: function removeResultsPerPage() {
	            var tf = this.tf;
	            if (!tf.hasGrid() || !this.resultsPerPageSlc || !this.resultsPerPage) {
	                return;
	            }
	            var slcR = this.resultsPerPageSlc,
	                slcRSpan = _Dom2['default'].id(this.prfxSlcResultsTxt + tf.id);
	            if (slcR) {
	                slcR.parentNode.removeChild(slcR);
	            }
	            if (slcRSpan) {
	                slcRSpan.parentNode.removeChild(slcRSpan);
	            }
	            this.resultsPerPageSlc = null;
	        }
	    }, {
	        key: 'changePage',
	
	        /**
	         * Change the page asynchronously according to passed index
	         * @param  {Number} index Index of the page (0-n)
	         */
	        value: function changePage(index) {
	            var tf = this.tf;
	            var evt = tf.Evt;
	            tf.EvtManager(evt.name.changepage, { pgIndex: index });
	        }
	    }, {
	        key: 'changeResultsPerPage',
	
	        /**
	         * Change rows asynchronously according to page results
	         */
	        value: function changeResultsPerPage() {
	            var tf = this.tf;
	            var evt = tf.Evt;
	            tf.EvtManager(evt.name.changeresultsperpage);
	        }
	    }, {
	        key: 'resetPage',
	
	        /**
	         * Re-set asynchronously page nb at page re-load
	         */
	        value: function resetPage() {
	            var tf = this.tf;
	            var evt = tf.Evt;
	            tf.EvtManager(evt.name.resetpage);
	        }
	    }, {
	        key: 'resetPageLength',
	
	        /**
	         * Re-set asynchronously page length at page re-load
	         */
	        value: function resetPageLength() {
	            var tf = this.tf;
	            var evt = tf.Evt;
	            tf.EvtManager(evt.name.resetpagelength);
	        }
	    }, {
	        key: '_changePage',
	
	        /**
	         * Change the page according to passed index
	         * @param  {Number} index Index of the page (0-n)
	         */
	        value: function _changePage(index) {
	            var tf = this.tf;
	
	            if (!tf.paging) {
	                return;
	            }
	            if (index === null) {
	                index = this.pageSelectorType === tf.fltTypeSlc ? this.pagingSlc.options.selectedIndex : this.pagingSlc.value - 1;
	            }
	            if (index >= 0 && index <= this.nbPages - 1) {
	                if (this.onBeforeChangePage) {
	                    this.onBeforeChangePage.call(null, this, index);
	                }
	                this.currentPageNb = parseInt(index, 10) + 1;
	                if (this.pageSelectorType === tf.fltTypeSlc) {
	                    this.pagingSlc.options[index].selected = true;
	                } else {
	                    this.pagingSlc.value = this.currentPageNb;
	                }
	
	                if (tf.rememberPageNb) {
	                    tf.feature('store').savePageNb(tf.pgNbCookie);
	                }
	                this.startPagingRow = this.pageSelectorType === tf.fltTypeSlc ? this.pagingSlc.value : index * this.pagingLength;
	
	                this.groupByPage();
	
	                if (this.onAfterChangePage) {
	                    this.onAfterChangePage.call(null, this, index);
	                }
	            }
	        }
	    }, {
	        key: '_changeResultsPerPage',
	
	        /**
	         * Change rows according to page results drop-down
	         * TODO: accept a parameter setting the results per page length
	         */
	        value: function _changeResultsPerPage() {
	            var tf = this.tf;
	
	            if (!tf.paging) {
	                return;
	            }
	            var slcR = this.resultsPerPageSlc;
	            var slcPagesSelIndex = this.pageSelectorType === tf.fltTypeSlc ? this.pagingSlc.selectedIndex : parseInt(this.pagingSlc.value - 1, 10);
	            this.pagingLength = parseInt(slcR.options[slcR.selectedIndex].value, 10);
	            this.startPagingRow = this.pagingLength * slcPagesSelIndex;
	
	            if (!isNaN(this.pagingLength)) {
	                if (this.startPagingRow >= tf.nbFilterableRows) {
	                    this.startPagingRow = tf.nbFilterableRows - this.pagingLength;
	                }
	                this.setPagingInfo();
	
	                if (this.pageSelectorType === tf.fltTypeSlc) {
	                    var slcIndex = this.pagingSlc.options.length - 1 <= slcPagesSelIndex ? this.pagingSlc.options.length - 1 : slcPagesSelIndex;
	                    this.pagingSlc.options[slcIndex].selected = true;
	                }
	                if (tf.rememberPageLen) {
	                    tf.feature('store').savePageLength(tf.pgLenCookie);
	                }
	            }
	        }
	    }, {
	        key: '_resetPage',
	
	        /**
	         * Re-set page nb at page re-load
	         */
	        value: function _resetPage(name) {
	            var tf = this.tf;
	            var pgnb = tf.feature('store').getPageNb(name);
	            if (pgnb !== '') {
	                this.changePage(pgnb - 1);
	            }
	        }
	    }, {
	        key: '_resetPageLength',
	
	        /**
	         * Re-set page length value at page re-load
	         */
	        value: function _resetPageLength(name) {
	            var tf = this.tf;
	            if (!tf.paging) {
	                return;
	            }
	            var pglenIndex = tf.feature('store').getPageLength(name);
	
	            if (pglenIndex !== '') {
	                this.resultsPerPageSlc.options[pglenIndex].selected = true;
	                this.changeResultsPerPage();
	            }
	        }
	    }, {
	        key: 'destroy',
	
	        /**
	         * Remove paging feature
	         */
	        value: function destroy() {
	            var tf = this.tf;
	
	            if (!tf.hasGrid()) {
	                return;
	            }
	            // btns containers
	            var btnNextSpan = _Dom2['default'].id(this.prfxBtnNextSpan + tf.id);
	            var btnPrevSpan = _Dom2['default'].id(this.prfxBtnPrevSpan + tf.id);
	            var btnLastSpan = _Dom2['default'].id(this.prfxBtnLastSpan + tf.id);
	            var btnFirstSpan = _Dom2['default'].id(this.prfxBtnFirstSpan + tf.id);
	            //span containing 'Page' text
	            var pgBeforeSpan = _Dom2['default'].id(this.prfxPgBeforeSpan + tf.id);
	            //span containing 'of' text
	            var pgAfterSpan = _Dom2['default'].id(this.prfxPgAfterSpan + tf.id);
	            //span containing nb of pages
	            var pgspan = _Dom2['default'].id(this.prfxPgSpan + tf.id);
	
	            var evt = this.evt;
	
	            if (this.pagingSlc) {
	                if (this.pageSelectorType === tf.fltTypeSlc) {
	                    _Event2['default'].remove(this.pagingSlc, 'change', evt.slcPagesChange);
	                } else if (this.pageSelectorType === tf.fltTypeInp) {
	                    _Event2['default'].remove(this.pagingSlc, 'keypress', evt._detectKey);
	                }
	                this.pagingSlc.parentNode.removeChild(this.pagingSlc);
	            }
	
	            if (btnNextSpan) {
	                _Event2['default'].remove(btnNextSpan, 'click', evt.next);
	                btnNextSpan.parentNode.removeChild(btnNextSpan);
	            }
	
	            if (btnPrevSpan) {
	                _Event2['default'].remove(btnPrevSpan, 'click', evt.prev);
	                btnPrevSpan.parentNode.removeChild(btnPrevSpan);
	            }
	
	            if (btnLastSpan) {
	                _Event2['default'].remove(btnLastSpan, 'click', evt.last);
	                btnLastSpan.parentNode.removeChild(btnLastSpan);
	            }
	
	            if (btnFirstSpan) {
	                _Event2['default'].remove(btnFirstSpan, 'click', evt.first);
	                btnFirstSpan.parentNode.removeChild(btnFirstSpan);
	            }
	
	            if (pgBeforeSpan) {
	                pgBeforeSpan.parentNode.removeChild(pgBeforeSpan);
	            }
	
	            if (pgAfterSpan) {
	                pgAfterSpan.parentNode.removeChild(pgAfterSpan);
	            }
	
	            if (pgspan) {
	                pgspan.parentNode.removeChild(pgspan);
	            }
	
	            if (this.hasResultsPerPage) {
	                this.removeResultsPerPage();
	            }
	
	            this.pagingSlc = null;
	            this.nbPages = 0;
	            this.isPagingRemoved = true;
	            tf.paging = false;
	        }
	    }]);
	
	    return Paging;
	})();
	
	exports.Paging = Paging;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Event = __webpack_require__(2);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var ClearButton = (function () {
	
	    /**
	     * Clear button component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function ClearButton(tf) {
	        _classCallCheck(this, ClearButton);
	
	        // Configuration object
	        var f = tf.config();
	
	        //id of container element
	        this.btnResetTgtId = f.btn_reset_target_id || null;
	        //reset button element
	        this.btnResetEl = null;
	        //defines reset text
	        this.btnResetText = f.btn_reset_text || 'Reset';
	        //defines reset button tooltip
	        this.btnResetTooltip = f.btn_reset_tooltip || 'Clear filters';
	        //defines reset button innerHtml
	        this.btnResetHtml = f.btn_reset_html || (!tf.enableIcons ? null : '<input type="button" value="" class="' + tf.btnResetCssClass + '" ' + 'title="' + this.btnResetTooltip + '" />');
	        //span containing reset button
	        this.prfxResetSpan = 'resetspan_';
	
	        this.tf = tf;
	    }
	
	    _createClass(ClearButton, [{
	        key: 'onClick',
	        value: function onClick() {
	            this.tf.clearFilters();
	        }
	    }, {
	        key: 'init',
	
	        /**
	         * Build DOM elements
	         */
	        value: function init() {
	            var _this = this;
	
	            var tf = this.tf;
	
	            if (!tf.hasGrid() && !tf.isFirstLoad && tf.btnResetEl) {
	                return;
	            }
	
	            var resetspan = _Dom2['default'].create('span', ['id', this.prfxResetSpan + tf.id]);
	
	            // reset button is added to defined element
	            if (!this.btnResetTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.btnResetTgtId ? tf.rDiv : _Dom2['default'].id(this.btnResetTgtId);
	            targetEl.appendChild(resetspan);
	
	            if (!this.btnResetHtml) {
	                var fltreset = _Dom2['default'].create('a', ['href', 'javascript:void(0);']);
	                fltreset.className = tf.btnResetCssClass;
	                fltreset.appendChild(_Dom2['default'].text(this.btnResetText));
	                resetspan.appendChild(fltreset);
	                // fltreset.onclick = this.Evt._Clear;
	                _Event2['default'].add(fltreset, 'click', function () {
	                    _this.onClick();
	                });
	            } else {
	                resetspan.innerHTML = this.btnResetHtml;
	                var resetEl = resetspan.firstChild;
	                // resetEl.onclick = this.Evt._Clear;
	                _Event2['default'].add(resetEl, 'click', function () {
	                    _this.onClick();
	                });
	            }
	            this.btnResetEl = resetspan.firstChild;
	        }
	    }, {
	        key: 'destroy',
	
	        /**
	         * Remove clear button UI
	         */
	        value: function destroy() {
	            var tf = this.tf;
	
	            if (!tf.hasGrid() || !this.btnResetEl) {
	                return;
	            }
	
	            var resetspan = _Dom2['default'].id(tf.prfxResetSpan + tf.id);
	            if (resetspan) {
	                resetspan.parentNode.removeChild(resetspan);
	            }
	            this.btnResetEl = null;
	        }
	    }]);
	
	    return ClearButton;
	})();
	
	exports.ClearButton = ClearButton;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var _Event = __webpack_require__(2);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var Help = (function () {
	
	    /**
	     * Help UI component
	     * @param {Object} tf TableFilter instance
	     */
	
	    function Help(tf) {
	        _classCallCheck(this, Help);
	
	        // Configuration object
	        var f = tf.config();
	
	        //id of custom container element for instructions
	        this.tgtId = f.help_instructions_target_id || null;
	        //id of custom container element for instructions
	        this.contTgtId = f.help_instructions_container_target_id || null;
	        //defines help text
	        this.instrText = f.help_instructions_text ? f.help_instructions_text : 'Use the filters above each column to filter and limit table ' + 'data. Avanced searches can be performed by using the following ' + 'operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, ' + '<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, ' + '<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, ' + '<b>rgx:</b><br/>' + '<a href="https://github.com/koalyptus/TableFilter/wiki/' + '4.-Filter-operators" target="_blank">Learn more</a>.<hr/>';
	        //defines help innerHtml
	        this.instrHtml = f.help_instructions_html || null;
	        //defines reset button text
	        this.btnText = f.help_instructions_btn_text || '?';
	        //defines reset button innerHtml
	        this.btnHtml = f.help_instructions_btn_html || null;
	        //defines css class for help button
	        this.btnCssClass = f.help_instructions_btn_css_class || 'helpBtn';
	        //defines css class for help container
	        this.contCssClass = f.help_instructions_container_css_class || 'helpCont';
	        //help button element
	        this.btn = null;
	        //help content div
	        this.cont = null;
	        this.defaultHtml = '<div class="helpFooter"><h4>TableFilter ' + 'v. ' + tf.version + '</h4>' + '<a href="https://github.com/koalyptus/TableFilter/" ' + ' target="_blank">https://github.com/koalyptus/TableFilter/</a>' + '<br/><span>&copy;2015-' + tf.year + ' Max Guglielmi.</span>' + '<div align="center" style="margin-top:8px;">' + '<a href="javascript:void(0);" class="close">Close</a></div></div>';
	
	        //id prefix for help elements
	        this.prfxHelpSpan = 'helpSpan_';
	        //id prefix for help elements
	        this.prfxHelpDiv = 'helpDiv_';
	
	        this.tf = tf;
	    }
	
	    _createClass(Help, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;
	
	            if (this.btn) {
	                return;
	            }
	
	            var tf = this.tf;
	
	            var helpspan = _Dom2['default'].create('span', ['id', this.prfxHelpSpan + tf.id]);
	            var helpdiv = _Dom2['default'].create('div', ['id', this.prfxHelpDiv + tf.id]);
	
	            //help button is added to defined element
	            if (!this.tgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.tgtId ? tf.rDiv : _Dom2['default'].id(this.tgtId);
	            targetEl.appendChild(helpspan);
	
	            var divContainer = !this.contTgtId ? helpspan : _Dom2['default'].id(this.contTgtId);
	
	            if (!this.btnHtml) {
	                divContainer.appendChild(helpdiv);
	                var helplink = _Dom2['default'].create('a', ['href', 'javascript:void(0);']);
	                helplink.className = this.btnCssClass;
	                helplink.appendChild(_Dom2['default'].text(this.btnText));
	                helpspan.appendChild(helplink);
	                _Event2['default'].add(helplink, 'click', function () {
	                    _this.toggle();
	                });
	            } else {
	                helpspan.innerHTML = this.btnHtml;
	                var helpEl = helpspan.firstChild;
	                _Event2['default'].add(helpEl, 'click', function () {
	                    _this.toggle();
	                });
	                divContainer.appendChild(helpdiv);
	            }
	
	            if (!this.instrHtml) {
	                helpdiv.innerHTML = this.instrText;
	                helpdiv.className = this.contCssClass;
	                _Event2['default'].add(helpdiv, 'dblclick', function () {
	                    _this.toggle();
	                });
	            } else {
	                if (this.contTgtId) {
	                    divContainer.appendChild(helpdiv);
	                }
	                helpdiv.innerHTML = this.instrHtml;
	                if (!this.contTgtId) {
	                    helpdiv.className = this.contCssClass;
	                    _Event2['default'].add(helpdiv, 'dblclick', function () {
	                        _this.toggle();
	                    });
	                }
	            }
	            helpdiv.innerHTML += this.defaultHtml;
	            _Event2['default'].add(helpdiv, 'click', function () {
	                _this.toggle();
	            });
	
	            this.cont = helpdiv;
	            this.btn = helpspan;
	        }
	    }, {
	        key: 'toggle',
	
	        /**
	         * Toggle help pop-up
	         */
	        value: function toggle() {
	            if (!this.cont) {
	                return;
	            }
	            var divDisplay = this.cont.style.display;
	            if (divDisplay === '' || divDisplay === 'none') {
	                this.cont.style.display = 'inline';
	            } else {
	                this.cont.style.display = 'none';
	            }
	        }
	    }, {
	        key: 'destroy',
	
	        /**
	         * Remove help UI
	         */
	        value: function destroy() {
	            if (!this.btn) {
	                return;
	            }
	            this.btn.parentNode.removeChild(this.btn);
	            this.btn = null;
	            if (!this.cont) {
	                return;
	            }
	            this.cont.parentNode.removeChild(this.cont);
	            this.cont = null;
	        }
	    }]);
	
	    return Help;
	})();
	
	exports.Help = Help;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _Dom = __webpack_require__(3);
	
	var _Dom2 = _interopRequireDefault(_Dom);
	
	var AlternateRows = (function () {
	
	    /**
	     * Alternating rows color
	     * @param {Object} tf TableFilter instance
	     */
	
	    function AlternateRows(tf) {
	        _classCallCheck(this, AlternateRows);
	
	        var f = tf.config();
	        //defines css class for even rows
	        this.evenCss = f.even_row_css_class || 'even';
	        //defines css class for odd rows
	        this.oddCss = f.odd_row_css_class || 'odd';
	
	        this.tf = tf;
	    }
	
	    _createClass(AlternateRows, [{
	        key: 'init',
	
	        /**
	         * Sets alternating rows color
	         */
	        value: function init() {
	            var tf = this.tf;
	            if (!tf.hasGrid() && !tf.isFirstLoad) {
	                return;
	            }
	            var validRowsIndex = tf.validRowsIndex;
	            var noValidRowsIndex = validRowsIndex === null;
	            //1st index
	            var beginIndex = noValidRowsIndex ? tf.refRow : 0;
	            // nb indexes
	            var indexLen = noValidRowsIndex ? tf.nbFilterableRows + beginIndex : validRowsIndex.length;
	            var idx = 0;
	
	            //alternates bg color
	            for (var j = beginIndex; j < indexLen; j++) {
	                var rowIdx = noValidRowsIndex ? j : validRowsIndex[j];
	                this.setRowBg(rowIdx, idx);
	                idx++;
	            }
	        }
	    }, {
	        key: 'setRowBg',
	
	        /**
	         * Sets row background color
	         * @param {Number} rowIdx Row index
	         * @param {Number} idx    Valid rows collection index needed to calculate bg
	         * color
	         */
	        value: function setRowBg(rowIdx, idx) {
	            if (!this.tf.alternateBgs || isNaN(rowIdx)) {
	                return;
	            }
	            var rows = this.tf.tbl.rows;
	            var i = isNaN(idx) ? rowIdx : idx;
	            this.removeRowBg(rowIdx);
	
	            _Dom2['default'].addClass(rows[rowIdx], i % 2 ? this.evenCss : this.oddCss);
	        }
	    }, {
	        key: 'removeRowBg',
	
	        /**
	         * Removes row background color
	         * @param  {Number} idx Row index
	         */
	        value: function removeRowBg(idx) {
	            if (isNaN(idx)) {
	                return;
	            }
	            var rows = this.tf.tbl.rows;
	            _Dom2['default'].removeClass(rows[idx], this.oddCss);
	            _Dom2['default'].removeClass(rows[idx], this.evenCss);
	        }
	    }, {
	        key: 'remove',
	
	        /**
	         * Removes all alternating backgrounds
	         */
	        value: function remove() {
	            if (!this.tf.hasGrid()) {
	                return;
	            }
	            for (var i = this.tf.refRow; i < this.tf.nbRows; i++) {
	                this.removeRowBg(i);
	            }
	        }
	    }, {
	        key: 'enable',
	        value: function enable() {
	            this.tf.alternateBgs = true;
	        }
	    }, {
	        key: 'disable',
	        value: function disable() {
	            this.tf.alternateBgs = false;
	        }
	    }]);
	
	    return AlternateRows;
	})();
	
	exports.AlternateRows = AlternateRows;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	     value: true
	});
	
	var _Str = __webpack_require__(4);
	
	var _Str2 = _interopRequireDefault(_Str);
	
	exports['default'] = {
	     ignoreCase: function ignoreCase(a, b) {
	          var x = _Str2['default'].lower(a);
	          var y = _Str2['default'].lower(b);
	          return x < y ? -1 : x > y ? 1 : 0;
	     }
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=tablefilter.js.map