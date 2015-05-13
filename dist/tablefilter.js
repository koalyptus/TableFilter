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

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

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

/******/ 			script.src = __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	/* ------------------------------------------------------------------------
	    - HTML Table Filter Generator v3.0
	    - By Max Guglielmi (tablefilter.free.fr)
	    - Licensed under the MIT License
	---------------------------------------------------------------------------
	    - Special credit to:
	    Cedric Wartel, cnx.claude@free.fr, Florent Hirchy, Váry Péter,
	    Anthony Maes, Nuovella Williams, Fuggerbit, Venkata Seshagiri Rao
	    Raya, Piepiax, Manuel Kern, Baladhandayutham for active contribution
	    and/or inspiration
	------------------------------------------------------------------------ */

	var _evt = __webpack_require__(2);

	var _dom = __webpack_require__(3);

	var _str = __webpack_require__(4);

	var _cookie = __webpack_require__(5);

	var _types = __webpack_require__(6);

	var _array = __webpack_require__(7);

	var _hlp = __webpack_require__(8);

	var _dateHelper = __webpack_require__(9);

	var _Sort = __webpack_require__(10);

	// Modules

	var _Store = __webpack_require__(11);

	var _GridLayout = __webpack_require__(12);

	var _Loader = __webpack_require__(13);

	var _HighlightKeyword = __webpack_require__(14);

	var _PopupFilter = __webpack_require__(15);

	var _Dropdown = __webpack_require__(16);

	var _CheckList = __webpack_require__(17);

	var _RowsCounter = __webpack_require__(18);

	var _StatusBar = __webpack_require__(19);

	var _Paging = __webpack_require__(20);

	var _ClearButton = __webpack_require__(21);

	var _Help = __webpack_require__(22);

	var _AlternateRows = __webpack_require__(23);

	var _ColOps = __webpack_require__(24);

	var global = window,
	    isValidDate = _dateHelper.DateHelper.isValid,
	    formatDate = _dateHelper.DateHelper.format,
	    doc = global.document;

	var TableFilter = (function () {

	    /**
	     * TF object constructor
	     * @param {String} id Table id
	     * @param {Number} row index indicating the 1st row
	     * @param {Object} configuration object
	     */

	    function TableFilter(id) {
	        _classCallCheck(this, TableFilter);

	        if (arguments.length === 0) {
	            return;
	        }

	        this.id = id;
	        this.version = '3.0';
	        this.year = new Date().getFullYear();
	        this.tbl = _dom.Dom.id(id);
	        this.startRow = null;
	        this.refRow = null;
	        this.headersRow = null;
	        this.cfg = {};
	        this.nbFilterableRows = null;
	        this.nbRows = null;
	        this.nbCells = null;
	        this._hasGrid = false;
	        this.enableModules = false;

	        if (!this.tbl || _str.Str.lower(this.tbl.nodeName) !== 'table' || this.getRowsNb() === 0) {
	            throw new Error('Could not instantiate TableFilter class: ' + 'HTML table not found.');
	        }

	        if (arguments.length > 1) {
	            for (var i = 0; i < arguments.length; i++) {
	                var arg = arguments[i];
	                var argtype = typeof arg;
	                switch (_str.Str.lower(argtype)) {
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
	        this.basePath = f.base_path !== undefined ? f.base_path : '';
	        this.extensionsPath = f.extensions_path || this.basePath + 'extensions/';

	        /*** filter types ***/
	        this.fltTypeInp = 'input';
	        this.fltTypeSlc = 'select';
	        this.fltTypeMulti = 'multiple';
	        this.fltTypeCheckList = 'checklist';
	        this.fltTypeNone = 'none';
	        this.fltCol = []; //filter type of each column

	        for (var j = 0; j < this.nbCells; j++) {
	            var cfgCol = f['col_' + j];
	            var col = !cfgCol ? this.fltTypeInp : _str.Str.lower(cfgCol);
	            this.fltCol.push(col);
	            this['col' + j] = col;
	        }

	        /*** Developer's additional methods ***/
	        this.publicMethods = f.public_methods !== undefined ? f.public_methods : false;

	        /*** filters' grid properties ***/

	        //enables/disables filter grid
	        this.fltGrid = f.grid === false ? false : true;

	        /*** Grid layout ***/
	        //enables/disables grid layout (fixed headers)
	        this.gridLayout = f.grid_layout ? true : false;
	        this.sourceTblHtml = null;
	        if (this.gridLayout) {
	            //Firefox does not support outerHTML property...
	            if (this.tbl.outerHTML === undefined) {
	                setOuterHtml();
	            }
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
	        //table container div for fixed headers (IE only)
	        this.contDiv = null;

	        //defines css class for div containing paging elements, rows counter etc.
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
	        this.stylesheet = f.stylesheet || this.basePath + 'filtergrid.css';
	        this.stylesheetId = this.id + '_style';
	        //defines css class for filters row
	        this.fltsRowCssClass = f.flts_row_css_class || 'fltrow';
	        //enables/disables icons (paging, reset button)
	        this.enableIcons = f.enable_icons === false ? false : true;
	        //enables/disbles rows alternating bg colors
	        this.alternateBgs = f.alternate_rows === true ? true : false;
	        //defines widths of columns
	        this.hasColWidth = f.col_width === true ? true : false;
	        this.colWidth = this.hasColWidth ? f.col_width : null;
	        //enables/disables fixed headers
	        this.fixedHeaders = f.fixed_headers === true ? true : false;
	        //tbody height if fixed headers enabled
	        this.tBodyH = !isNaN(f.tbody_height) ? f.tbody_height : 200;
	        //defines css class for filters
	        this.fltCssClass = f.flt_css_class || 'flt';
	        //defines css class for multiple selects filters
	        this.fltMultiCssClass = f.flt_multi_css_class || 'flt_multi';
	        //defines css class for filters
	        this.fltSmallCssClass = f.flt_small_css_class || 'flt_s';
	        //defines css class for single-filter
	        this.singleFltCssClass = f.single_flt_css_class || 'single_flt';
	        this.isStartBgAlternate = true;

	        /*** filters' grid behaviours ***/
	        //enables/disables enter key
	        this.enterKey = f.enter_key === false ? false : true;
	        //enables/disables alternative fn call
	        this.isModFilterFn = f.mod_filter_fn === true ? true : false;
	        // used by tf_DetectKey fn
	        this.modFilterFn = this.isModFilterFn ? f.mod_filter_fn : null;
	        //calls function before filtering starts
	        this.onBeforeFilter = _types.Types.isFn(f.on_before_filter) ? f.on_before_filter : null;
	        //calls function after filtering
	        this.onAfterFilter = _types.Types.isFn(f.on_after_filter) ? f.on_after_filter : null;
	        //enables/disables case sensitivity
	        this.matchCase = f.match_case === true ? true : false;
	        //enables/disbles exact match for search
	        this.exactMatch = f.exact_match === true ? true : false;
	        //refreshes drop-down lists upon validation
	        this.linkedFilters = f.linked_filters === true ? true : false;
	        //wheter excluded options are disabled
	        this.disableExcludedOptions = f.disable_excluded_options === true ? true : false;
	        //stores active filter element
	        this.activeFlt = null;
	        //id of active filter
	        this.activeFilterId = null;
	        //enables/disbles column operation(sum,mean)
	        this.hasColOperation = f.col_operation ? true : false;
	        this.colOperation = null;
	        //enables always visible rows
	        this.hasVisibleRows = f.rows_always_visible ? true : false;
	        //array containing always visible rows
	        this.visibleRows = this.hasVisibleRows ? f.rows_always_visible : [];
	        //defines search type: include or exclude
	        this.searchType = f.search_type || 'include';
	        //enables/disables external filters generation
	        this.isExternalFlt = f.external_flt_grid === true ? true : false;
	        //array containing ids of external elements containing filters
	        this.externalFltTgtIds = f.external_flt_grid_ids || null;
	        //stores filters elements if isExternalFlt is true
	        this.externalFltEls = [];
	        //delays any filtering process if loader true
	        this.execDelay = !isNaN(f.exec_delay) ? parseInt(f.exec_delay, 10) : 100;
	        //calls function when filters grid loaded
	        this.onFiltersLoaded = _types.Types.isFn(f.on_filters_loaded) ? f.on_filters_loaded : null;
	        //enables/disables single filter search
	        this.singleSearchFlt = f.single_search_filter === true ? true : false;
	        //calls function after row is validated
	        this.onRowValidated = _types.Types.isFn(f.on_row_validated) ? f.on_row_validated : null;
	        //array defining columns for customCellData event
	        this.customCellDataCols = f.custom_cell_data_cols ? f.custom_cell_data_cols : [];
	        //calls custom function for retrieving cell data
	        this.customCellData = _types.Types.isFn(f.custom_cell_data) ? f.custom_cell_data : null;
	        //input watermark text array
	        this.watermark = f.watermark || '';
	        this.isWatermarkArray = _types.Types.isArray(this.watermark);
	        //id of toolbar container element
	        this.toolBarTgtId = f.toolbar_target_id || null;
	        //enables/disables help div
	        this.helpInstructions = f.help_instructions || false;
	        //popup filters
	        this.popUpFilters = f.popup_filters === true ? true : false;
	        //active columns color
	        this.markActiveColumns = f.mark_active_columns === true ? true : false;
	        //defines css class for active column header
	        this.activeColumnsCssClass = f.active_columns_css_class || 'activeHeader';
	        //calls function before active column header is marked
	        this.onBeforeActiveColumn = _types.Types.isFn(f.on_before_active_column) ? f.on_before_active_column : null;
	        //calls function after active column header is marked
	        this.onAfterActiveColumn = _types.Types.isFn(f.on_after_active_column) ? f.on_after_active_column : null;

	        /*** select filter's customisation and behaviours ***/
	        //defines 1st option text
	        this.displayAllText = f.display_all_text || '';
	        //enables/disables empty option in combo-box filters
	        this.enableEmptyOption = f.enable_empty_option === true ? true : false;
	        //defines empty option text
	        this.emptyText = f.empty_text || '(Empty)';
	        //enables/disables non empty option in combo-box filters
	        this.enableNonEmptyOption = f.enable_non_empty_option === true ? true : false;
	        //defines empty option text
	        this.nonEmptyText = f.non_empty_text || '(Non empty)';
	        //enables/disables onChange event on combo-box
	        this.onSlcChange = f.on_change === false ? false : true;
	        //enables/disables select options sorting
	        this.sortSlc = f.sort_select === false ? false : true;
	        //enables/disables ascending numeric options sorting
	        this.isSortNumAsc = f.sort_num_asc === true ? true : false;
	        this.sortNumAsc = this.isSortNumAsc ? f.sort_num_asc : null;
	        //enables/disables descending numeric options sorting
	        this.isSortNumDesc = f.sort_num_desc === true ? true : false;
	        this.sortNumDesc = this.isSortNumDesc ? f.sort_num_desc : null;
	        //enabled selects are populated on demand
	        this.fillSlcOnDemand = f.fill_slc_on_demand === true ? true : false;
	        this.hasCustomSlcOptions = _types.Types.isObj(f.custom_slc_options) ? true : false;
	        this.customSlcOptions = _types.Types.isArray(f.custom_slc_options) ? f.custom_slc_options : null;

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
	        this.rowsCounter = f.rows_counter === true ? true : false;

	        /*** status bar ***/
	        //show/hides status bar
	        this.statusBar = f.status_bar === true ? true : false;

	        /*** loader ***/
	        //enables/disables loader/spinner indicator
	        this.loader = f.loader === true ? true : false;

	        /*** validation - reset buttons/links ***/
	        //show/hides filter's validation button
	        this.displayBtn = f.btn === true ? true : false;
	        //defines validation button text
	        this.btnText = f.btn_text || (!this.enableIcons ? 'Go' : '');
	        //defines css class for validation button
	        this.btnCssClass = f.btn_css_class || (!this.enableIcons ? 'btnflt' : 'btnflt_icon');
	        //show/hides reset link
	        this.btnReset = f.btn_reset === true ? true : false;
	        //defines css class for reset button
	        this.btnResetCssClass = f.btn_reset_css_class || 'reset';
	        //callback function before filters are cleared
	        this.onBeforeReset = _types.Types.isFn(f.on_before_reset) ? f.on_before_reset : null;
	        //callback function after filters are cleared
	        this.onAfterReset = _types.Types.isFn(f.on_after_reset) ? f.on_after_reset : null;

	        /*** paging ***/
	        //enables/disables table paging
	        this.paging = f.paging === true ? true : false;
	        this.nbVisibleRows = 0; //nb visible rows
	        this.nbHiddenRows = 0; //nb hidden rows

	        /*** webfx sort adapter ***/
	        //enables/disables default table sorting
	        this.sort = f.sort === true ? true : false;
	        //indicates if sort is set (used in tfAdapter.sortabletable.js)
	        this.isSortEnabled = false;
	        this.sortConfig = f.sort_config || {};
	        this.sortConfig.name = this.sortConfig.name !== undefined ? f.sort_config.name : 'sortabletable';
	        this.sortConfig.src = this.sortConfig.src !== undefined ? f.sort_config.src : this.extensionsPath + 'sortabletable/' + 'sortabletable.js';
	        this.sortConfig.adapterSrc = this.sortConfig.adapter_src !== undefined ? f.sort_config.adapter_src : this.extensionsPath + 'sortabletable/adapterSortabletable.js';
	        this.sortConfig.initialize = this.sortConfig.initialize !== undefined ? f.sort_config.initialize : function (o) {};
	        this.sortConfig.sortTypes = _types.Types.isArray(this.sortConfig.sort_types) ? f.sort_config.sort_types : [];
	        this.sortConfig.sortCol = this.sortConfig.sort_col !== undefined ? f.sort_config.sort_col : null;
	        this.sortConfig.asyncSort = this.sortConfig.async_sort === true ? true : false;
	        this.sortConfig.triggerIds = _types.Types.isArray(this.sortConfig.sort_trigger_ids) ? f.sort_config.sort_trigger_ids : [];

	        /*** ezEditTable extension ***/
	        //enables/disables table selection feature
	        this.selectable = f.selectable === true ? true : false;
	        //enables/disables editable table feature
	        this.editable = f.editable === true ? true : false;
	        this.ezEditTableConfig = f.ezEditTable_config || {};
	        this.ezEditTableConfig.name = this.ezEditTableConfig.name !== undefined ? f.ezEditTable_config.name : 'ezedittable';
	        this.ezEditTableConfig.src = this.ezEditTableConfig.src !== undefined ? f.ezEditTable_config.src : this.extensionsPath + 'ezEditTable/ezEditTable.js';
	        //ezEditTable stylesheet not imported by default as filtergrid.css
	        //applies
	        this.ezEditTableConfig.loadStylesheet = this.ezEditTableConfig.loadStylesheet === true ? true : false;
	        this.ezEditTableConfig.stylesheet = this.ezEditTableConfig.stylesheet || this.extensionsPath + 'ezEditTable/ezEditTable.css';
	        this.ezEditTableConfig.stylesheetName = this.ezEditTableConfig.stylesheetName !== undefined ? f.ezEditTable_config.stylesheetName : 'ezEditTableCss';
	        this.ezEditTableConfig.err = 'Failed to instantiate EditTable ' + 'object.\n"ezEditTable" module may not be available.';

	        /*** onkeyup event ***/
	        //enables/disables onkeyup event, table is filtered when user stops
	        //typing
	        this.onKeyUp = f.on_keyup === true ? true : false;
	        //onkeyup delay timer (msecs)
	        this.onKeyUpDelay = !isNaN(f.on_keyup_delay) ? f.on_keyup_delay : 900;
	        this.isUserTyping = null; //typing indicator
	        this.onKeyUpTimer = undefined;

	        /*** keyword highlighting ***/
	        //enables/disables keyword highlighting
	        this.highlightKeywords = f.highlight_keywords === true ? true : false;

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
	        this.hasColNbFormat = f.col_number_format === true ? true : false;
	        //array containing columns nb formats
	        this.colNbFormat = _types.Types.isArray(this.hasColNbFormat) ? f.col_number_format : null;
	        //enables date type per column
	        this.hasColDateType = f.col_date_type === true ? true : false;
	        //array containing columns date type
	        this.colDateType = _types.Types.isArray(this.hasColDateType) ? f.col_date_type : null;

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
	        this.rememberGridValues = f.remember_grid_values === true ? true : false;
	        //cookie storing filter values
	        this.fltsValuesCookie = this.prfxCookieFltsValues + this.id;
	        //remembers page nb on page load
	        this.rememberPageNb = this.paging && f.remember_page_number ? true : false;
	        //cookie storing page nb
	        this.pgNbCookie = this.prfxCookiePageNb + this.id;
	        //remembers page length on page load
	        this.rememberPageLen = this.paging && f.remember_page_length ? true : false;
	        //cookie storing page length
	        this.pgLenCookie = this.prfxCookiePageLen + this.id;

	        /*** extensions ***/
	        //imports external script
	        // this.hasExtensions = f.extensions===true ? true : false;
	        // this.extensions = this.hasExtensions ? f.extensions : null;
	        this.extensions = f.extensions;
	        this.hasExtensions = _types.Types.isArray(this.extensions);

	        /*** themes ***/
	        this.enableDefaultTheme = f.enable_default_theme === true ? true : false;
	        //imports themes
	        this.hasThemes = f.enable_default_theme || f.themes && _types.Types.isObj(f.themes) ? true : false;
	        this.themes = this.hasThemes ? f.themes : null;
	        //themes path
	        this.themesPath = f.themes_path || this.basePath + 'TF_Themes/';

	        // Features registry
	        this.Cpt = {
	            loader: null,
	            alternateRows: null,
	            colOps: null,
	            rowsCounter: null,
	            gridLayout: null,
	            store: null,
	            highlightKeywords: null,
	            paging: null,
	            checkList: null,
	            dropdown: null,
	            popupFilter: null,
	            clearButton: null,
	            help: null,
	            statusBar: null
	        };

	        // Extensions registry
	        this.ExtRegistry = {
	            sort: null,
	            ezEditTable: null
	        };

	        /*** TF events ***/
	        var o = this;
	        this.Evt = {
	            name: {
	                filter: 'Filter',
	                dropdown: 'dropdown',
	                checklist: 'checkList',
	                changepage: 'changePage',
	                clear: 'Clear',
	                changeresultsperpage: 'changeResults',
	                resetvalues: 'ResetValues',
	                resetpage: 'resetPage',
	                resetpagelength: 'resetPageLength',
	                sort: 'Sort',
	                loadextensions: 'LoadExtensions',
	                loadthemes: 'loadThemes'
	            },

	            /*====================================================
	                - Detects <enter> key for a given element
	            =====================================================*/
	            detectKey: function detectKey(e) {
	                if (!o.enterKey) {
	                    return;
	                }
	                var _evt = e || global.event;
	                if (_evt) {
	                    var key = _evt.Event.keyCode(_evt);
	                    if (key === 13) {
	                        o._filter();
	                        _evt.Event.cancel(_evt);
	                        _evt.Event.stop(_evt);
	                    } else {
	                        o.isUserTyping = true;
	                        global.clearInterval(o.onKeyUpTimer);
	                        o.onKeyUpTimer = undefined;
	                    }
	                } //if evt
	            },
	            /*====================================================
	                - onkeyup event for text filters
	            =====================================================*/
	            onKeyUp: function onKeyUp(e) {
	                if (!o.onKeyUp) {
	                    return;
	                }
	                var _evt = e || global.event;
	                var key = _evt.Event.keyCode(_evt);
	                o.isUserTyping = false;

	                function filter() {
	                    global.clearInterval(o.onKeyUpTimer);
	                    o.onKeyUpTimer = undefined;
	                    if (!o.isUserTyping) {
	                        o.filter();
	                        o.isUserTyping = null;
	                    }
	                }

	                if (key !== 13 && key !== 9 && key !== 27 && key !== 38 && key !== 40) {
	                    if (o.onKeyUpTimer === undefined) {
	                        o.onKeyUpTimer = global.setInterval(filter, o.onKeyUpDelay);
	                    }
	                } else {
	                    global.clearInterval(o.onKeyUpTimer);
	                    o.onKeyUpTimer = undefined;
	                }
	            },
	            /*====================================================
	                - onkeydown event for input filters
	            =====================================================*/
	            onKeyDown: function onKeyDown(e) {
	                if (!o.onKeyUp) {
	                    return;
	                }
	                o.isUserTyping = true;
	            },
	            /*====================================================
	                - onblur event for input filters
	            =====================================================*/
	            onInpBlur: function onInpBlur(e) {
	                if (o.onKeyUp) {
	                    o.isUserTyping = false;
	                    global.clearInterval(o.onKeyUpTimer);
	                }
	                if (o.ezEditTable) {
	                    if (o.editable) {
	                        o.ezEditTable.Editable.Set();
	                    }
	                    if (o.selectable) {
	                        o.ezEditTable.Selection.Set();
	                    }
	                }
	            },
	            /*====================================================
	                - onfocus event for input filters
	            =====================================================*/
	            onInpFocus: function onInpFocus(e) {
	                var _evt = e || global.event;
	                o.activeFilterId = this.getAttribute('id');
	                o.activeFlt = _dom.Dom.id(o.activeFilterId);
	                if (o.popUpFilters) {
	                    _evt.Event.cancel(_evt);
	                    _evt.Event.stop(_evt);
	                }
	                if (o.ezEditTable) {
	                    if (o.editable) {
	                        o.ezEditTable.Editable.Remove();
	                    }
	                    if (o.selectable) {
	                        o.ezEditTable.Selection.Remove();
	                    }
	                }
	            },
	            /*====================================================
	                - onfocus event for select filters
	            =====================================================*/
	            onSlcFocus: function onSlcFocus(e) {
	                var _evt = e || global.event;
	                o.activeFilterId = this.getAttribute('id');
	                o.activeFlt = _dom.Dom.id(o.activeFilterId);
	                // select is populated when element has focus
	                if (o.fillSlcOnDemand && this.getAttribute('filled') === '0') {
	                    var ct = this.getAttribute('ct');
	                    o.Cpt.dropdown._build(ct);
	                }
	                if (o.popUpFilters) {
	                    _evt.Event.cancel(_evt);
	                    _evt.Event.stop(_evt);
	                }
	            },
	            /*====================================================
	                - onchange event for select filters
	            =====================================================*/
	            onSlcChange: function onSlcChange(e) {
	                if (!o.activeFlt) {
	                    return;
	                }
	                var colIndex = o.activeFlt.getAttribute('colIndex');
	                //Checks filter is a checklist and caller is not null
	                // if(o.activeFlt && colIndex &&
	                //     o['col'+colIndex]===o.fltTypeCheckList &&
	                //     !o.Evt.onSlcChange.caller){ return; }
	                var _evt = e || global.event;
	                if (o.popUpFilters) {
	                    _evt.Event.stop(_evt);
	                }
	                if (o.onSlcChange) {
	                    o.filter();
	                }
	            },
	            /*====================================================
	                - onblur event for select filters
	            =====================================================*/
	            // _OnSlcBlur: function(e) {},
	            /*====================================================
	                - onclick event for checklist filters
	            =====================================================*/
	            onCheckListClick: function onCheckListClick() {
	                if (o.fillSlcOnDemand && this.getAttribute('filled') === '0') {
	                    var ct = this.getAttribute('ct');
	                    o.Cpt.checkList._build(ct);
	                    o.Cpt.checkList.checkListDiv[ct].onclick = null;
	                    o.Cpt.checkList.checkListDiv[ct].title = '';
	                }
	            },
	            /*====================================================
	                - onclick event for checklist filter container
	            =====================================================*/
	            onCheckListFocus: function onCheckListFocus(e) {
	                o.activeFilterId = this.firstChild.getAttribute('id');
	                o.activeFlt = _dom.Dom.id(o.activeFilterId);
	            },
	            /*====================================================
	                - onclick event for validation button
	                (btn property)
	            =====================================================*/
	            onBtnClick: function onBtnClick() {
	                o.filter();
	            }
	            // ,
	            // _OnSlcPagesChangeEvt: null, //used by sort adapter
	            /*====================================================
	                - onclick event slc parent node (enables filters)
	                IE only
	            =====================================================*/
	            // _EnableSlc: function() {
	            //     this.firstChild.disabled = false;
	            //     this.firstChild.focus();
	            //     this.onclick = null;
	            // },

	            // _Paging: { //used by sort adapter
	            //     nextEvt: null,
	            //     prevEvt: null,
	            //     lastEvt: null,
	            //     firstEvt: null
	            // }
	        };
	    }

	    _createClass(TableFilter, [{
	        key: 'init',

	        /*====================================================
	            - initialises filtering grid bar behaviours and
	            layout
	        =====================================================*/
	        value: function init() {
	            if (this._hasGrid) {
	                return;
	            }
	            if (!this.tbl) {
	                this.tbl = _dom.Dom.id(this.id);
	            }
	            if (this.gridLayout) {
	                this.refRow = this.startRow === null ? 0 : this.startRow;
	            }
	            if (this.popUpFilters && (this.filtersRowIndex === 0 && this.headersRow === 1 || this.gridLayout)) {
	                this.headersRow = 0;
	            }
	            var f = this.cfg,
	                n = this.singleSearchFlt ? 1 : this.nbCells,
	                inpclass;

	            if (window['tf_' + this.id] === undefined) {
	                window['tf_' + this.id] = this;
	            }

	            //loads stylesheet if not imported
	            //Issues with browsers != IE, IE rules in this case
	            this.includeFile(this.stylesheetId, this.stylesheet, null, 'link');

	            //loads theme
	            if (this.hasThemes) {
	                this._loadThemes();
	            }

	            if (this.rememberGridValues || this.rememberPageNb || this.rememberPageLen) {
	                //var Store = require('modules/store').Store;
	                // import {Store} from 'modules/store';
	                this.Cpt.store = new _Store.Store(this);
	            }

	            if (this.gridLayout) {
	                // var GridLayout = require('modules/gridLayout').GridLayout;
	                // import {GridLayout} from 'modules/gridLayout';
	                this.Cpt.gridLayout = new _GridLayout.GridLayout(this);
	                this.Cpt.gridLayout.init();
	            }

	            if (this.loader) {
	                if (!this.Cpt.loader) {
	                    // var Loader = require('modules/loader').Loader;
	                    // import {Loader} from 'modules/loader';
	                    this.Cpt.loader = new _Loader.Loader(this);
	                }
	            }

	            if (this.highlightKeywords) {
	                // var Highlight =
	                //     require('modules/highlightKeywords').HighlightKeyword;
	                // import {HighlightKeyword} from 'modules/highlightKeywords';
	                this.Cpt.highlightKeyword = new _HighlightKeyword.HighlightKeyword(this);
	            }

	            if (this.popUpFilters) {
	                if (!this.Cpt.popupFilter) {
	                    // var PopupFilter = require('modules/popupFilter').PopupFilter;
	                    // import {PopupFilter} from 'modules/popupFilter';
	                    this.Cpt.popupFilter = new _PopupFilter.PopupFilter(this);
	                }
	                this.Cpt.popupFilter.init();
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
	                    var fltrow;
	                    if (!this.gridLayout) {
	                        var thead = _dom.Dom.tag(this.tbl, 'thead');
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
	                            this.Cpt.popupFilter.build(i);
	                        }

	                        var fltcell = _dom.Dom.create(this.fltCellTag),
	                            col = this['col' + i],
	                            externalFltTgtId = this.isExternalFlt && this.externalFltTgtIds ? this.externalFltTgtIds[i] : null;

	                        if (this.singleSearchFlt) {
	                            fltcell.colSpan = this.nbCells;
	                        }
	                        if (!this.gridLayout) {
	                            fltrow.appendChild(fltcell);
	                        }
	                        inpclass = i == n - 1 && this.displayBtn ? this.fltSmallCssClass : this.fltCssClass;

	                        if (col === undefined) {
	                            col = f['col_' + i] === undefined ? this.fltTypeInp : _str.Str.lower(f['col_' + i]);
	                        }

	                        //only 1 input for single search
	                        if (this.singleSearchFlt) {
	                            col = this.fltTypeInp;
	                            inpclass = this.singleFltCssClass;
	                        }

	                        //drop-down filters
	                        if (col === this.fltTypeSlc || col === this.fltTypeMulti) {
	                            if (!this.Cpt.dropdown) {
	                                // var Dropdown = require('modules/dropdown').Dropdown;
	                                // import {Dropdown} from 'modules/dropdown';
	                                this.Cpt.dropdown = new _Dropdown.Dropdown(this);
	                            }
	                            var dropdown = this.Cpt.dropdown;

	                            var slc = _dom.Dom.create(this.fltTypeSlc, ['id', this.prfxFlt + i + '_' + this.id], ['ct', i], ['filled', '0']);

	                            if (col === this.fltTypeMulti) {
	                                slc.multiple = this.fltTypeMulti;
	                                slc.title = dropdown.multipleSlcTooltip;
	                            }
	                            slc.className = _str.Str.lower(col) === this.fltTypeSlc ? inpclass : this.fltMultiCssClass; // for ie<=6

	                            //filter is appended in desired external element
	                            if (externalFltTgtId) {
	                                _dom.Dom.id(externalFltTgtId).appendChild(slc);
	                                this.externalFltEls.push(slc);
	                            } else {
	                                fltcell.appendChild(slc);
	                            }

	                            this.fltIds.push(this.prfxFlt + i + '_' + this.id);

	                            if (!this.fillSlcOnDemand) {
	                                dropdown._build(i);
	                            }

	                            _evt.Event.add(slc, 'keypress', this.Evt.detectKey);
	                            _evt.Event.add(slc, 'change', this.Evt.onSlcChange);
	                            _evt.Event.add(slc, 'focus', this.Evt.onSlcFocus);
	                            // evt.add(slc, 'blur', this.Evt._OnSlcBlur);

	                            //1st option is created here since dropdown.build isn't
	                            //invoked
	                            if (this.fillSlcOnDemand) {
	                                var opt0 = _dom.Dom.createOpt(this.displayAllText, '');
	                                slc.appendChild(opt0);
	                            }
	                        }
	                        // checklist
	                        else if (col === this.fltTypeCheckList) {
	                            var checkList;
	                            if (!this.Cpt.checkList) {
	                                // var CheckList =
	                                //         require('modules/checkList').CheckList;
	                                // import {CheckList} from 'modules/checkList';
	                                this.Cpt.checkList = new _CheckList.CheckList(this);
	                                checkList = this.Cpt.checkList;
	                            }

	                            var divCont = _dom.Dom.create('div', ['id', checkList.prfxCheckListDiv + i + '_' + this.id], ['ct', i], ['filled', '0']);
	                            divCont.className = checkList.checkListDivCssClass;

	                            //filter is appended in desired element
	                            if (externalFltTgtId) {
	                                _dom.Dom.id(externalFltTgtId).appendChild(divCont);
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
	                                _evt.Event.add(divCont, 'click', this.Evt.onCheckListClick);
	                                divCont.appendChild(_dom.Dom.text(checkList.activateCheckListTxt));
	                            }

	                            _evt.Event.add(divCont, 'click', this.Evt.onCheckListFocus);
	                        } else {
	                            //show/hide input
	                            var inptype = col === this.fltTypeInp ? 'text' : 'hidden';
	                            var inp = _dom.Dom.create(this.fltTypeInp, ['id', this.prfxFlt + i + '_' + this.id], ['type', inptype], ['ct', i]);
	                            if (inptype !== 'hidden' && this.watermark) {
	                                inp.setAttribute('placeholder', this.isWatermarkArray ? this.watermark[i] || '' : this.watermark);
	                            }
	                            inp.className = inpclass;
	                            inp.onfocus = this.Evt.onInpFocus;

	                            //filter is appended in desired element
	                            if (externalFltTgtId) {
	                                _dom.Dom.id(externalFltTgtId).appendChild(inp);
	                                this.externalFltEls.push(inp);
	                            } else {
	                                fltcell.appendChild(inp);
	                            }

	                            this.fltIds.push(this.prfxFlt + i + '_' + this.id);

	                            inp.onkeypress = this.Evt.detectKey;
	                            inp.onkeydown = this.Evt.onKeyDown;
	                            inp.onkeyup = this.Evt.onKeyUp;
	                            inp.onblur = this.Evt.onInpBlur;

	                            if (this.rememberGridValues) {
	                                var flts_values = this.Cpt.store.getFilterValues(this.fltsValuesCookie);
	                                if (flts_values[i] != ' ') {
	                                    this.setFilterValue(i, flts_values[i], false);
	                                }
	                            }
	                        }
	                        // this adds submit button
	                        if (i == n - 1 && this.displayBtn) {
	                            var btn = _dom.Dom.create(this.fltTypeInp, ['id', this.prfxValButton + i + '_' + this.id], ['type', 'button'], ['value', this.btnText]);
	                            btn.className = this.btnCssClass;

	                            //filter is appended in desired element
	                            if (externalFltTgtId) {
	                                _dom.Dom.id(externalFltTgtId).appendChild(btn);
	                            } else {
	                                fltcell.appendChild(btn);
	                            }

	                            btn.onclick = this.Evt.onBtnClick;
	                        } //if
	                    } // for i
	                } else {
	                    this._resetGrid();
	                } //if isFirstLoad
	            } //if this.fltGrid

	            /* Filter behaviours */
	            if (this.rowsCounter) {
	                // var RowsCounter = require('modules/rowsCounter').RowsCounter;
	                // import {RowsCounter} from 'modules/rowsCounter';
	                this.Cpt.rowsCounter = new _RowsCounter.RowsCounter(this);
	                this.Cpt.rowsCounter.init();
	            }
	            if (this.statusBar) {
	                // var StatusBar = require('modules/statusBar').StatusBar;
	                // import {StatusBar} from 'modules/statusBar';
	                this.Cpt.statusBar = new _StatusBar.StatusBar(this);
	                this.Cpt.statusBar.init();
	            }
	            if (this.paging || this.Cpt.paging && this.Cpt.paging.isPagingRemoved) {
	                // var Paging = require('modules/paging').Paging;
	                // import {Paging} from 'modules/paging';
	                // if(!this.Cpt.paging){
	                this.Cpt.paging = new _Paging.Paging(this);
	                // }
	                this.Cpt.paging.init();
	            }
	            if (this.btnReset) {
	                // var ClearButton = require('modules/clearButton').ClearButton;
	                // import {ClearButton} from 'modules/clearButton';
	                this.Cpt.clearButton = new _ClearButton.ClearButton(this);
	                this.Cpt.clearButton.init();
	            }
	            if (this.helpInstructions) {
	                // var Help = require('modules/help').Help;
	                // import {Help} from 'modules/help';
	                this.Cpt.help = new _Help.Help(this);
	                this.Cpt.help.init();
	            }
	            if (this.hasColWidth && !this.gridLayout) {
	                this.setColWidths();
	            }
	            if (this.alternateBgs) {
	                //1st time only if no paging and rememberGridValues
	                // var AlternateRows = require('modules/alternateRows').AlternateRows;
	                // import {AlternateRows} from 'modules/alternateRows';
	                this.Cpt.alternateRows = new _AlternateRows.AlternateRows(this);
	                this.Cpt.alternateRows.init();
	            }
	            if (this.hasColOperation) {
	                // var ColOps = require('modules/colOps').ColOps;
	                // import {ColOps} from 'modules/colOps';
	                this.Cpt.colOps = new _ColOps.ColOps(this);
	                this.Cpt.colOps.calc();
	            }
	            if (this.sort /*|| this.gridLayout*/) {
	                this.setSort();
	            }
	            if (this.selectable || this.editable) {
	                this.setEditable();
	            }

	            this.isFirstLoad = false;
	            this._hasGrid = true;

	            if (this.rememberGridValues || this.rememberPageLen || this.rememberPageNb) {
	                this.resetValues();
	            }

	            //TF css class is added to table
	            if (!this.gridLayout) {
	                _dom.Dom.addClass(this.tbl, this.prfxTf);
	            }

	            if (this.loader) {
	                this.Cpt.loader.show('none');
	            }

	            /* Loads extensions */
	            if (this.hasExtensions) {
	                // this.loadExtensions();
	                // this.registerExtensions();
	                this.initExtensions();
	            }

	            if (this.onFiltersLoaded) {
	                this.onFiltersLoaded.call(null, this);
	            }
	        }
	    }, {
	        key: 'EvtManager',

	        /*====================================================
	            - TF events manager
	            - Params:
	                - event name (string)
	                - config object (optional literal object)
	        =====================================================*/
	        value: function EvtManager(evt, s) {
	            var o = this;
	            var slcIndex = s && s.slcIndex !== undefined ? s.slcIndex : null;
	            var slcExternal = s && s.slcExternal !== undefined ? s.slcExternal : false;
	            var slcId = s && s.slcId !== undefined ? s.slcId : null;
	            var pgIndex = s && s.pgIndex !== undefined ? s.pgIndex : null;

	            function efx() {
	                if (!evt) {
	                    return;
	                }
	                switch (evt) {
	                    case o.Evt.name.filter:
	                        if (o.isModFilterFn) {
	                            o.modFilterFn.call(null, o);
	                        } else {
	                            o._filter();
	                        }
	                        break;
	                    case o.Evt.name.dropdown:
	                        if (o.linkedFilters) {
	                            o.Cpt.dropdown._build(slcIndex, true);
	                        } else {
	                            o.Cpt.dropdown._build(slcIndex, false, slcExternal, slcId);
	                        }
	                        break;
	                    case o.Evt.name.checklist:
	                        o.Cpt.checkList._build(slcIndex, slcExternal, slcId);
	                        break;
	                    case o.Evt.name.changepage:
	                        o.Cpt.paging._changePage(pgIndex);
	                        break;
	                    case o.Evt.name.clear:
	                        o._clearFilters();
	                        o._filter();
	                        break;
	                    case o.Evt.name.changeresultsperpage:
	                        o.Cpt.paging._changeResultsPerPage();
	                        break;
	                    case o.Evt.name.resetvalues:
	                        o._resetValues();
	                        o._filter();
	                        break;
	                    case o.Evt.name.resetpage:
	                        o.Cpt.paging._resetPage(o.pgNbCookie);
	                        break;
	                    case o.Evt.name.resetpagelength:
	                        o.Cpt.paging._resetPageLength(o.pgLenCookie);
	                        break;
	                    case o.Evt.name.sort:
	                        void 0;
	                        break;
	                    case o.Evt.name.loadextensions:
	                        o._loadExtensions();
	                        break;
	                    case o.Evt.name.loadthemes:
	                        o._loadThemes();
	                        break;
	                    default:
	                        //to be used by extensions events when needed
	                        o['_' + evt].call(null, o, s);
	                        break;
	                }
	                if (o.statusBar) {
	                    o.Cpt.statusBar.message('');
	                }
	                if (o.loader) {
	                    o.Cpt.loader.show('none');
	                }
	            }

	            if (this.loader || this.statusBar) {
	                try {
	                    this.Cpt.loader.show('');
	                    this.Cpt.statusBar.message(this['msg' + evt]);
	                } catch (e) {}
	                global.setTimeout(efx, this.execDelay);
	            } else {
	                efx();
	            }
	        }
	    }, {
	        key: 'initExtensions',
	        value: function initExtensions() {
	            var exts = this.extensions;

	            for (var i = 0; i < exts.length; i++) {
	                var ext = exts[i];
	                if (_types.Types.isUndef(this.ExtRegistry[ext.name])) {
	                    this.loadExtension(ext);
	                }
	            }
	        }
	    }, {
	        key: 'loadExtension',
	        value: function loadExtension(ext) {
	            var _this = this;

	            if (!ext || !ext.name) {
	                return;
	            }

	            var name = ext.name;
	            var path = ext.path;
	            var modulePath;

	            if (name && path) {
	                modulePath = ext.path + '/' + name;
	            } else {
	                name = name.replace('.js', '');
	                modulePath = './extensions/{}/{}'.replace(/{}/g, name);
	            }

	            __webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(1)(modulePath)]; (function (mod) {
	                var inst = new mod(_this, ext);
	                inst.init();
	                _this.ExtRegistry[name] = inst;
	            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	        }
	    }, {
	        key: 'loadThemes',
	        value: function loadThemes() {
	            this.EvtManager(this.Evt.name.loadthemes);
	        }
	    }, {
	        key: '_loadThemes',

	        /*====================================================
	            - loads TF themes
	        =====================================================*/
	        value: function _loadThemes() {
	            if (!this.hasThemes) {
	                return;
	            }
	            if (!this.Thm) {
	                /*** TF themes ***/
	                var o = this;
	                this.Thm = {
	                    list: {},
	                    add: function add(thmName, thmDesc, thmPath, thmCallBack) {
	                        var file = thmPath.split('/')[thmPath.split('/').length - 1],
	                            re = new RegExp(file),
	                            path = thmPath.replace(re, '');
	                        o.Thm.list[thmName] = {
	                            name: thmName,
	                            description: thmDesc,
	                            file: file,
	                            path: path,
	                            callback: thmCallBack
	                        };
	                    }
	                };
	            }

	            //Default theme config
	            if (this.enableDefaultTheme) {
	                this.themes = {
	                    name: ['DefaultTheme'],
	                    src: [this.themesPath + 'Default/TF_Default.css'],
	                    description: ['Default Theme']
	                };
	                this.Thm.add('DefaultTheme', this.themesPath + 'Default/TF_Default.css', 'Default Theme');
	            }
	            if (_types.Types.isArray(this.themes.name) && _types.Types.isArray(this.themes.src)) {
	                var thm = this.themes;
	                for (var i = 0; i < thm.name.length; i++) {
	                    var thmPath = thm.src[i],
	                        thmName = thm.name[i],
	                        thmInit = thm.initialize && thm.initialize[i] ? thm.initialize[i] : null,
	                        thmDesc = thm.description && thm.description[i] ? thm.description[i] : null;

	                    //Registers theme
	                    this.Thm.add(thmName, thmDesc, thmPath, thmInit);

	                    if (!this.isImported(thmPath, 'link')) {
	                        this.includeFile(thmName, thmPath, null, 'link');
	                    }
	                    if (_types.Types.isFn(thmInit)) {
	                        thmInit.call(null, this);
	                    }
	                }
	            }

	            //Some elements need to be overriden for theme
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
	        key: 'remove',

	        /*====================================================
	            - removes a filter grid
	        =====================================================*/
	        value: function remove() {
	            if (this.fltGrid && this._hasGrid) {
	                var rows = this.tbl.rows;
	                if (this.paging) {
	                    this.Cpt.paging.destroy();
	                }
	                if (this.statusBar) {
	                    this.Cpt.statusBar.destroy();
	                }
	                if (this.rowsCounter) {
	                    this.Cpt.rowsCounter.destroy();
	                }
	                if (this.btnReset) {
	                    this.Cpt.clearButton.destroy();
	                }
	                if (this.helpInstructions) {
	                    this.Cpt.help.destroy();
	                }
	                if (this.isExternalFlt && !this.popUpFilters) {
	                    this.removeExternalFlts();
	                }
	                if (this.infDiv) {
	                    this.removeToolbar();
	                }
	                if (this.highlightKeywords) {
	                    this.Cpt.highlightKeyword.unhighlightAll();
	                }
	                if (this.sort) {
	                    // this.RemoveSort();
	                    this.ExtRegistry.sort.destroy();
	                }
	                if (this.loader) {
	                    this.Cpt.loader.remove();
	                }
	                if (this.popUpFilters) {
	                    this.Cpt.popupFilter.destroy();
	                }
	                if (this.markActiveColumns) {
	                    this.clearActiveColumns();
	                }
	                if (this.editable || this.selectable) {
	                    this.removeEditable();
	                }
	                //this loop shows all rows and removes validRow attribute
	                for (var j = this.refRow; j < this.nbRows; j++) {
	                    rows[j].style.display = '';
	                    try {
	                        if (rows[j].hasAttribute('validRow')) {
	                            rows[j].removeAttribute('validRow');
	                        }
	                    } catch (e) {
	                        //ie<=6 doesn't support hasAttribute method
	                        var row = rows[j];
	                        var attribs = row.attributes;
	                        for (var x = 0; x < attribs.length; x++) {
	                            if (_str.Str.lower(attribs.nodeName) === 'validrow') {
	                                row.removeAttribute('validRow');
	                            }
	                        }
	                    }

	                    //removes alternating colors
	                    if (this.alternateBgs) {
	                        this.Cpt.alternateRows.removeRowBg(j);
	                    }
	                } //for j

	                if (this.fltGrid && !this.gridLayout) {
	                    this.fltGridEl = rows[this.filtersRowIndex];
	                    this.tbl.deleteRow(this.filtersRowIndex);
	                }
	                if (this.gridLayout) {
	                    this.Cpt.gridLayout.destroy();
	                }
	                _dom.Dom.removeClass(this.tbl, this.prfxTf);
	                this.activeFlt = null;
	                this.isStartBgAlternate = true;
	                this._hasGrid = false;
	                this.tbl = null;
	            } //if this.fltGrid
	        }
	    }, {
	        key: 'setToolbar',

	        /*====================================================
	            - Generates div above table where paging,
	            reset button, rows counter label etc. are placed
	        =====================================================*/
	        value: function setToolbar() {
	            if (this.infDiv !== null) {
	                return;
	            }

	            /*** container div ***/
	            var infdiv = _dom.Dom.create('div', ['id', this.prfxInfDiv + this.id]);
	            infdiv.className = this.infDivCssClass;

	            //custom container
	            if (this.toolBarTgtId) {
	                _dom.Dom.id(this.toolBarTgtId).appendChild(infdiv);
	            }
	            //grid-layout
	            else if (this.gridLayout) {
	                var gridLayout = this.Cpt.gridLayout;
	                gridLayout.tblMainCont.appendChild(infdiv);
	                infdiv.className = gridLayout.gridInfDivCssClass;
	            }
	            //default location: just above the table
	            else {
	                this.tbl.parentNode.insertBefore(infdiv, this.tbl);
	            }
	            this.infDiv = _dom.Dom.id(this.prfxInfDiv + this.id);

	            /*** left div containing rows # displayer ***/
	            var ldiv = _dom.Dom.create('div', ['id', this.prfxLDiv + this.id]);
	            ldiv.className = this.lDivCssClass;
	            infdiv.appendChild(ldiv);
	            this.lDiv = _dom.Dom.id(this.prfxLDiv + this.id);

	            /***    right div containing reset button
	                    + nb results per page select    ***/
	            var rdiv = _dom.Dom.create('div', ['id', this.prfxRDiv + this.id]);
	            rdiv.className = this.rDivCssClass;
	            infdiv.appendChild(rdiv);
	            this.rDiv = _dom.Dom.id(this.prfxRDiv + this.id);

	            /*** mid div containing paging elements ***/
	            var mdiv = _dom.Dom.create('div', ['id', this.prfxMDiv + this.id]);
	            mdiv.className = this.mDivCssClass;
	            infdiv.appendChild(mdiv);
	            this.mDiv = _dom.Dom.id(this.prfxMDiv + this.id);

	            // Enable help instructions by default is topbar is generated
	            if (!this.helpInstructions) {
	                if (!this.Cpt.help) {
	                    // var Help = require('modules/help').Help;
	                    // import {Help} from 'modules/help';
	                    this.Cpt.help = new _Help.Help(this);
	                }
	                this.Cpt.help.init();
	            }
	        }
	    }, {
	        key: 'removeToolbar',

	        /*====================================================
	            - Removes div above table where paging,
	            reset button, rows counter label etc. are placed
	        =====================================================*/
	        value: function removeToolbar() {
	            if (!this.infDiv) {
	                return;
	            }
	            this.infDiv.parentNode.removeChild(this.infDiv);
	            this.infDiv = null;
	        }
	    }, {
	        key: 'removeExternalFlts',

	        /*====================================================
	            - removes external filters
	        =====================================================*/
	        value: function removeExternalFlts() {
	            if (!this.isExternalFlt && !this.externalFltTgtIds) {
	                return;
	            }
	            for (var ct = 0; ct < this.externalFltTgtIds.length; ct++) {
	                var externalFltTgtId = this.externalFltTgtIds[ct],
	                    externalFlt = _dom.Dom.id(externalFltTgtId);
	                if (externalFlt) {
	                    externalFlt.innerHTML = '';
	                }
	            }
	        }
	    }, {
	        key: 'setSort',

	        /*====================================================
	            - Sets sorting feature by loading
	            WebFX Sortable Table 1.12 plugin by Erik Arvidsson
	            and TF adapter by Max Guglielmi
	        =====================================================*/
	        value: function setSort() {

	            // require(['adapterSortabletable'], (m)=> {
	            //     var adapterSortabletable = new m.AdapterSortableTable(this);
	            //     this.ExtRegistry.sort = adapterSortabletable;
	            //     adapterSortabletable.init();
	            // });

	            this.loadExtension({
	                name: 'adapterSortabletable.js',
	                path: './extensions/sortabletable'
	            });
	        }
	    }, {
	        key: 'performSort',
	        value: function performSort() {
	            this.EvtManager(this.Evt.name.sort);
	        }
	    }, {
	        key: 'setEditable',

	        /*====================================================
	            - Sets selection or edition features by loading
	            ezEditTable script by Max Guglielmi
	        =====================================================*/
	        value: function setEditable() {
	            var ezEditConfig = this.ezEditTableConfig;
	            if (this.isImported(ezEditConfig.src)) {
	                this._enableEditable();
	            } else {
	                this.includeFile(ezEditConfig.name, ezEditConfig.src, this._enableEditable);
	            }
	            if (ezEditConfig.loadStylesheet && !this.isImported(ezEditConfig.stylesheet, 'link')) {
	                this.includeFile(ezEditConfig.stylesheetName, ezEditConfig.stylesheet, null, 'link');
	            }
	        }
	    }, {
	        key: 'removeEditable',

	        /*====================================================
	            - Removes selection or edition features
	        =====================================================*/
	        value: function removeEditable() {
	            var ezEditTable = this.ezEditTable;
	            if (ezEditTable) {
	                if (this.selectable) {
	                    ezEditTable.Selection.ClearSelections();
	                    ezEditTable.Selection.Remove();
	                }
	                if (this.editable) {
	                    ezEditTable.Editable.Remove();
	                }
	            }
	        }
	    }, {
	        key: 'resetEditable',

	        /*====================================================
	            - Resets selection or edition features after
	            removal
	        =====================================================*/
	        value: function resetEditable() {
	            var ezEditTable = this.ezEditTable;
	            if (ezEditTable) {
	                if (this.selectable) {
	                    ezEditTable.Selection.Set();
	                }
	                if (this.editable) {
	                    ezEditTable.Editable.Set();
	                }
	            }
	        }
	    }, {
	        key: '_enableEditable',
	        value: function _enableEditable(o) {
	            if (!o) {
	                o = this;
	            }

	            //start row for EditTable constructor needs to be calculated
	            var startRow,
	                ezEditConfig = o.ezEditTableConfig,
	                thead = _dom.Dom.tag(o.tbl, 'thead');

	            //if thead exists and startRow not specified, startRow is calculated
	            //automatically by EditTable
	            if (thead.length > 0 && !ezEditConfig.startRow) {
	                startRow = undefined;
	            }
	            //otherwise startRow config property if any or TableFilter refRow
	            else {
	                startRow = ezEditConfig.startRow || o.refRow;
	            }

	            ezEditConfig.scroll_into_view = ezEditConfig.scroll_into_view === false ? false : true;
	            ezEditConfig.base_path = ezEditConfig.base_path || o.basePath + 'ezEditTable/';
	            ezEditConfig.editable = o.editable = o.cfg.editable;
	            ezEditConfig.selection = o.selectable = o.cfg.selectable;

	            if (o.selectable) {
	                ezEditConfig.default_selection = ezEditConfig.default_selection || 'row';
	            }
	            //CSS Styles
	            ezEditConfig.active_cell_css = ezEditConfig.active_cell_css || 'ezETSelectedCell';

	            o._lastValidRowIndex = 0;
	            o._lastRowIndex = 0;

	            if (o.selectable) {
	                //Row navigation needs to be calculated according to TableFilter's
	                //validRowsIndex array
	                var onAfterSelection = function onAfterSelection(et, selectedElm, e) {
	                    var slc = et.Selection;
	                    //Next valid filtered row needs to be selected
	                    var doSelect = function doSelect(nextRowIndex) {
	                        if (et.defaultSelection === 'row') {
	                            slc.SelectRowByIndex(nextRowIndex);
	                        } else {
	                            et.ClearSelections();
	                            var cellIndex = selectedElm.cellIndex,
	                                row = o.tbl.rows[nextRowIndex];
	                            if (et.defaultSelection === 'both') {
	                                slc.SelectRowByIndex(nextRowIndex);
	                            }
	                            if (row) {
	                                slc.SelectCell(row.cells[cellIndex]);
	                            }
	                        }
	                        //Table is filtered
	                        if (o.validRowsIndex.length !== o.getRowsNb()) {
	                            var r = o.tbl.rows[nextRowIndex];
	                            if (r) {
	                                r.scrollIntoView(false);
	                            }
	                            if (cell) {
	                                if (cell.cellIndex === o.getCellsNb() - 1 && o.gridLayout) {
	                                    o.tblCont.scrollLeft = 100000000;
	                                } else if (cell.cellIndex === 0 && o.gridLayout) {
	                                    o.tblCont.scrollLeft = 0;
	                                } else {
	                                    cell.scrollIntoView(false);
	                                }
	                            }
	                        }
	                    };

	                    //table is not filtered
	                    if (!o.validRowsIndex) {
	                        return;
	                    }
	                    var validIndexes = o.validRowsIndex,
	                        validIdxLen = validIndexes.length,
	                        row = et.defaultSelection !== 'row' ? selectedElm.parentNode : selectedElm,

	                    //cell for default_selection = 'both' or 'cell'
	                    cell = selectedElm.nodeName === 'TD' ? selectedElm : null,
	                        keyCode = e !== undefined ? et.Event.GetKey(e) : 0,
	                        isRowValid = _array.Arr.has(validIndexes, row.rowIndex),
	                        nextRowIndex,

	                    //pgup/pgdown keys
	                    d = keyCode === 34 || keyCode === 33 ? o.pagingLength || et.nbRowsPerPage : 1;

	                    //If next row is not valid, next valid filtered row needs to be
	                    //calculated
	                    if (!isRowValid) {
	                        //Selection direction up/down
	                        if (row.rowIndex > o._lastRowIndex) {
	                            //last row
	                            if (row.rowIndex >= validIndexes[validIdxLen - 1]) {
	                                nextRowIndex = validIndexes[validIdxLen - 1];
	                            } else {
	                                var calcRowIndex = o._lastValidRowIndex + d;
	                                if (calcRowIndex > validIdxLen - 1) {
	                                    nextRowIndex = validIndexes[validIdxLen - 1];
	                                } else {
	                                    nextRowIndex = validIndexes[calcRowIndex];
	                                }
	                            }
	                        } else {
	                            //first row
	                            if (row.rowIndex <= validIndexes[0]) {
	                                nextRowIndex = validIndexes[0];
	                            } else {
	                                var v = validIndexes[o._lastValidRowIndex - d];
	                                nextRowIndex = v ? v : validIndexes[0];
	                            }
	                        }
	                        o._lastRowIndex = row.rowIndex;
	                        doSelect(nextRowIndex);
	                    } else {
	                        //If filtered row is valid, special calculation for
	                        //pgup/pgdown keys
	                        if (keyCode !== 34 && keyCode !== 33) {
	                            o._lastValidRowIndex = _array.Arr.indexByValue(validIndexes, row.rowIndex);
	                            o._lastRowIndex = row.rowIndex;
	                        } else {
	                            if (keyCode === 34) {
	                                //pgdown
	                                //last row
	                                if (o._lastValidRowIndex + d <= validIdxLen - 1) {
	                                    nextRowIndex = validIndexes[o._lastValidRowIndex + d];
	                                } else {
	                                    nextRowIndex = [validIdxLen - 1];
	                                }
	                            } else {
	                                //pgup
	                                //first row
	                                if (o._lastValidRowIndex - d <= validIndexes[0]) {
	                                    nextRowIndex = validIndexes[0];
	                                } else {
	                                    nextRowIndex = validIndexes[o._lastValidRowIndex - d];
	                                }
	                            }
	                            o._lastRowIndex = nextRowIndex;
	                            o._lastValidRowIndex = _array.Arr.indexByValue(validIndexes, nextRowIndex);
	                            doSelect(nextRowIndex);
	                        }
	                    }
	                };

	                //Page navigation has to be enforced whenever selected row is out of
	                //the current page range
	                var onBeforeSelection = function onBeforeSelection(et, selectedElm, e) {
	                    var row = et.defaultSelection !== 'row' ? selectedElm.parentNode : selectedElm;
	                    if (o.paging) {
	                        if (o.Cpt.paging.nbPages > 1) {
	                            var paging = o.Cpt.paging;
	                            //page length is re-assigned in case it has changed
	                            et.nbRowsPerPage = paging.pagingLength;
	                            var validIndexes = o.validRowsIndex,
	                                validIdxLen = validIndexes.length,
	                                pagingEndRow = parseInt(paging.startPagingRow, 10) + parseInt(paging.pagingLength, 10);
	                            var rowIndex = row.rowIndex;

	                            if (rowIndex === validIndexes[validIdxLen - 1] && paging.currentPageNb !== paging.nbPages) {
	                                paging.setPage('last');
	                            } else if (rowIndex == validIndexes[0] && paging.currentPageNb !== 1) {
	                                paging.setPage('first');
	                            } else if (rowIndex > validIndexes[pagingEndRow - 1] && rowIndex < validIndexes[validIdxLen - 1]) {
	                                paging.setPage('next');
	                            } else if (rowIndex < validIndexes[paging.startPagingRow] && rowIndex > validIndexes[0]) {
	                                paging.setPage('previous');
	                            }
	                        }
	                    }
	                };

	                //Selected row needs to be visible when paging is activated
	                if (o.paging) {
	                    o.onAfterChangePage = function (tf, i) {
	                        var et = tf.ExtRegistry.ezEditTable;
	                        var slc = et.Selection;
	                        var row = slc.GetActiveRow();
	                        if (row) {
	                            row.scrollIntoView(false);
	                        }
	                        var cell = slc.GetActiveCell();
	                        if (cell) {
	                            cell.scrollIntoView(false);
	                        }
	                    };
	                }

	                //Rows navigation when rows are filtered is performed with the
	                //EditTable row selection callback events
	                if (ezEditConfig.default_selection === 'row') {
	                    var fnB = ezEditConfig.on_before_selected_row;
	                    ezEditConfig.on_before_selected_row = function () {
	                        onBeforeSelection(arguments[0], arguments[1], arguments[2]);
	                        if (fnB) {
	                            fnB.call(null, arguments[0], arguments[1], arguments[2]);
	                        }
	                    };
	                    var fnA = ezEditConfig.on_after_selected_row;
	                    ezEditConfig.on_after_selected_row = function () {
	                        onAfterSelection(arguments[0], arguments[1], arguments[2]);
	                        if (fnA) {
	                            fnA.call(null, arguments[0], arguments[1], arguments[2]);
	                        }
	                    };
	                } else {
	                    var fnD = ezEditConfig.on_before_selected_cell;
	                    ezEditConfig.on_before_selected_cell = function () {
	                        onBeforeSelection(arguments[0], arguments[1], arguments[2]);
	                        if (fnD) {
	                            fnD.call(null, arguments[0], arguments[1], arguments[2]);
	                        }
	                    };
	                    var fnC = ezEditConfig.on_after_selected_cell;
	                    ezEditConfig.on_after_selected_cell = function () {
	                        onAfterSelection(arguments[0], arguments[1], arguments[2]);
	                        if (fnC) {
	                            fnC.call(null, arguments[0], arguments[1], arguments[2]);
	                        }
	                    };
	                }
	            }
	            if (o.editable) {
	                //Added or removed rows, TF rows number needs to be re-calculated
	                var fnE = ezEditConfig.on_added_dom_row;
	                ezEditConfig.on_added_dom_row = function () {
	                    o.nbFilterableRows++;
	                    if (!o.paging) {
	                        o.Cpt.rowsCounter.refresh();
	                    } else {
	                        o.nbRows++;
	                        o.nbVisibleRows++;
	                        o.nbFilterableRows++;
	                        o.paging = false;
	                        o.Cpt.paging.destroy();
	                        o.Cpt.paging.addPaging();
	                    }
	                    if (o.alternateBgs) {
	                        o.Cpt.alternateRows.init();
	                    }
	                    if (fnE) {
	                        fnE.call(null, arguments[0], arguments[1], arguments[2]);
	                    }
	                };
	                if (ezEditConfig.actions && ezEditConfig.actions['delete']) {
	                    var fnF = ezEditConfig.actions['delete'].on_after_submit;
	                    ezEditConfig.actions['delete'].on_after_submit = function () {
	                        o.nbFilterableRows--;
	                        if (!o.paging) {
	                            o.Cpt.rowsCounter.refresh();
	                        } else {
	                            o.nbRows--;
	                            o.nbVisibleRows--;
	                            o.nbFilterableRows--;
	                            o.paging = false;
	                            o.Cpt.paging.destroy();
	                            o.Cpt.paging.addPaging(false);
	                        }
	                        if (o.alternateBgs) {
	                            o.Cpt.alternateRows.init();
	                        }
	                        if (fnF) {
	                            fnF.call(null, arguments[0], arguments[1]);
	                        }
	                    };
	                }
	            }

	            try {
	                o.ExtRegistry.ezEditTable = new EditTable(o.id, ezEditConfig, startRow);
	                o.ExtRegistry.ezEditTable.Init();
	            } catch (e) {
	                console.log(ezEditConfig.err);
	            }
	        }
	    }, {
	        key: 'resetValues',

	        /*====================================================
	            - IE bug: it seems there is no way to make
	            multiple selections programatically, only last
	            selection is kept (multiple select previously
	            populated via DOM)
	            - Work-around: defer selection with a setTimeout
	            If you find a more elegant solution to
	            this let me know ;-)
	            - For the moment only this solution seems to work!
	            - Params:
	                - slc = select object (select obj)
	                - index to be selected (integer)
	                - execute filtering (boolean)
	        =====================================================*/
	        // __deferMultipleSelection: function(slc,index,filter){
	        //     if(str.lower(slc.nodeName)!=='select'){
	        //         return;
	        //     }
	        //     var doFilter = filter===undefined ? false : filter;
	        //     var o = this;
	        //     global.setTimeout(function(){
	        //         slc.options[0].selected = false;

	        //         if(slc.options[index].value===''){
	        //             slc.options[index].selected = false;
	        //         }
	        //         else{
	        //             slc.options[index].selected = true;
	        //             if(doFilter){
	        //                 o.filter();
	        //             }
	        //         }
	        //     }, 0.1);
	        // },

	        /*====================================================
	            - Returns an array [[values],[texts]] with
	            custom values for a given filter
	            - Param: column index (integer)
	        =====================================================*/
	        // _getCustomValues: function(colIndex){
	        //     if(!colIndex){
	        //         return;
	        //     }
	        //     //custom select test
	        //     var isCustomSlc = this.hasCustomSlcOptions &&
	        //             array.has(this.customSlcOptions.cols, colIndex);
	        //     if(!isCustomSlc){
	        //         return;
	        //     }
	        //     var optTxt = [], optArray = [];
	        //     var index = array.indexByValue(this.customSlcOptions.cols, colIndex);
	        //     var slcValues = this.customSlcOptions.values[index];
	        //     var slcTexts = this.customSlcOptions.texts[index];
	        //     var slcSort = this.customSlcOptions.sorts[index];
	        //     for(var r=0; r<slcValues.length; r++){
	        //         optArray.push(slcValues[r]);
	        //         if(slcTexts[r]){
	        //             optTxt.push(slcTexts[r]);
	        //         } else {
	        //             optTxt.push(slcValues[r]);
	        //         }
	        //     }
	        //     if(slcSort){
	        //         optArray.sort();
	        //         optTxt.sort();
	        //     }
	        //     return [optArray,optTxt];
	        // },

	        value: function resetValues() {
	            this.EvtManager(this.Evt.name.resetvalues);
	        }
	    }, {
	        key: '_resetValues',

	        /*==============================================
	            - re-sets grid values when page is
	            re-loaded. It invokes resetGridValues,
	            ResetPage and ResetPageLength methods
	            - Params:
	                - name: cookie name (string)
	        ===============================================*/
	        value: function _resetValues() {
	            //only fillSlcOnDemand
	            if (this.rememberGridValues && this.fillSlcOnDemand) {
	                this.resetGridValues(this.fltsValuesCookie);
	            }
	            if (this.rememberPageLen) {
	                // this.ResetPageLength(this.pgLenCookie);
	                this.Cpt.paging.resetPageLength(this.pgLenCookie);
	            }
	            if (this.rememberPageNb) {
	                // this.ResetPage(this.pgNbCookie);
	                this.Cpt.paging.resetPage(this.pgNbCookie);
	            }
	        }
	    }, {
	        key: 'resetGridValues',

	        /*==============================================
	            - re-sets filters' values when page is
	            re-loaded if load on demand is enabled
	            - Params:
	                - name: cookie name (string)
	            - credits to Florent Hirchy
	        ===============================================*/
	        value: function resetGridValues(name) {
	            if (!this.fillSlcOnDemand) {
	                return;
	            }
	            var fltsValues = this.Cpt.store.getFilterValues(name),
	                slcFltsIndex = this.getFiltersByType(this.fltTypeSlc, true),
	                multiFltsIndex = this.getFiltersByType(this.fltTypeMulti, true);

	            //if the number of columns is the same as before page reload
	            if (Number(fltsValues[fltsValues.length - 1]) === this.fltIds.length) {
	                for (var i = 0; i < fltsValues.length - 1; i++) {
	                    if (fltsValues[i] === ' ') {
	                        continue;
	                    }
	                    var s, opt;
	                    // if fillSlcOnDemand, drop-down needs to contain stored
	                    // value(s) for filtering
	                    if (this['col' + i] === this.fltTypeSlc || this['col' + i] === this.fltTypeMulti) {
	                        var slc = _dom.Dom.id(this.fltIds[i]);
	                        slc.options[0].selected = false;

	                        //selects
	                        if (_array.Arr.has(slcFltsIndex, i)) {
	                            opt = _dom.Dom.createOpt(fltsValues[i], fltsValues[i], true);
	                            slc.appendChild(opt);
	                            this.hasStoredValues = true;
	                        }
	                        //multiple select
	                        if (_array.Arr.has(multiFltsIndex, i)) {
	                            s = fltsValues[i].split(' ' + this.orOperator + ' ');
	                            for (j = 0; j < s.length; j++) {
	                                if (s[j] === '') {
	                                    continue;
	                                }
	                                opt = _dom.Dom.createOpt(s[j], s[j], true);
	                                slc.appendChild(opt);
	                                this.hasStoredValues = true;

	                                // IE multiple selection work-around
	                                // if(hlp.isIE()){
	                                //     this.__deferMultipleSelection(slc,j,false);
	                                //     hasStoredValues = false;
	                                // }
	                            }
	                        } // if multiFltsIndex
	                    } else if (this['col' + i] == this.fltTypeCheckList) {
	                        var checkList = this.Cpt.checkList;
	                        var divChk = checkList.checkListDiv[i];
	                        divChk.title = divChk.innerHTML;
	                        divChk.innerHTML = '';

	                        var ul = _dom.Dom.create('ul', ['id', this.fltIds[i]], ['colIndex', i]);
	                        ul.className = checkList.checkListCssClass;

	                        var li0 = _dom.Dom.createCheckItem(this.fltIds[i] + '_0', '', this.displayAllText);
	                        li0.className = checkList.checkListItemCssClass;
	                        ul.appendChild(li0);

	                        divChk.appendChild(ul);

	                        s = fltsValues[i].split(' ' + this.orOperator + ' ');
	                        for (j = 0; j < s.length; j++) {
	                            if (s[j] === '') {
	                                continue;
	                            }
	                            var li = _dom.Dom.createCheckItem(this.fltIds[i] + '_' + (j + 1), s[j], s[j]);
	                            li.className = checkList.checkListItemCssClass;
	                            ul.appendChild(li);
	                            li.check.checked = true;
	                            checkList.setCheckListValues(li.check);
	                            this.hasStoredValues = true;
	                        }
	                    }
	                } //end for

	                if (!this.hasStoredValues && this.paging) {
	                    this.Cpt.paging.setPagingInfo();
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

	        /*====================================================
	            - Filtering fn
	            - retrieves data from each td in every single tr
	            and compares to search string for current
	            column
	            - tr is hidden if all search strings are not
	            found
	        =====================================================*/
	        value: function _filter() {
	            if (!this.fltGrid || !this._hasGrid && !this.isFirstLoad) {
	                return;
	            }
	            //invokes onbefore callback
	            if (this.onBeforeFilter) {
	                this.onBeforeFilter.call(null, this);
	            }

	            var row = this.tbl.rows,
	                f = this.cfg,
	                hiddenrows = 0;
	            this.validRowsIndex = [];
	            var o = this;

	            // removes keyword highlighting
	            if (this.highlightKeywords) {
	                this.Cpt.highlightKeyword.unhighlightAll();
	            }
	            //removes popup filters active icons
	            if (this.popUpFilters) {
	                this.Cpt.popupFilter.buildIcons();
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
	                re_lk = new RegExp(_str.Str.rgxEsc(this.lkOperator)),
	                re_eq = new RegExp(this.eqOperator),
	                re_st = new RegExp(this.stOperator),
	                re_en = new RegExp(this.enOperator),
	                re_an = new RegExp(this.anOperator),
	                re_cr = new RegExp(this.curExp),
	                re_em = this.emOperator,
	                re_nm = this.nmOperator,
	                re_re = new RegExp(_str.Str.rgxEsc(this.rgxOperator));

	            //keyword highlighting
	            function highlight(str, ok, cell) {
	                if (o.highlightKeywords && ok) {
	                    str = str.replace(re_lk, '');
	                    str = str.replace(re_eq, '');
	                    str = str.replace(re_st, '');
	                    str = str.replace(re_en, '');
	                    var w = str;
	                    if (re_le.test(str) || re_ge.test(str) || re_l.test(str) || re_g.test(str) || re_d.test(str)) {
	                        w = _dom.Dom.getText(cell);
	                    }
	                    if (w !== '') {
	                        o.Cpt.highlightKeyword.highlight(cell, w, o.Cpt.highlightKeyword.highlightCssClass);
	                    }
	                }
	            }

	            //looks for search argument in current row
	            function hasArg(sA, cell_data, j) {
	                var occurence;
	                //Search arg operator tests
	                var hasLO = re_l.test(sA),
	                    hasLE = re_le.test(sA),
	                    hasGR = re_g.test(sA),
	                    hasGE = re_ge.test(sA),
	                    hasDF = re_d.test(sA),
	                    hasEQ = re_eq.test(sA),
	                    hasLK = re_lk.test(sA),
	                    hasAN = re_an.test(sA),
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

	                var dte1, dte2;
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
	                        occurence = o._containsStr(sA.replace(re_lk, ''), cell_data, null, false);
	                    } else if (isValidDate(sA, dtType)) {
	                        dte2 = formatDate(sA, dtType);
	                        occurence = dte1.toString() == dte2.toString();
	                    }
	                    //empty
	                    else if (hasEM) {
	                        occurence = _str.Str.isEmpty(cell_data);
	                    }
	                    //non-empty
	                    else if (hasNM) {
	                        occurence = !_str.Str.isEmpty(cell_data);
	                    }
	                } else {
	                    //first numbers need to be formated
	                    if (o.hasColNbFormat && o.colNbFormat[j]) {
	                        num_cell_data = removeNbFormat(cell_data, o.colNbFormat[j]);
	                        nbFormat = o.colNbFormat[j];
	                    } else {
	                        if (o.thousandsSeparator === ',' && o.decimalSeparator === '.') {
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
	                        occurence = o._containsStr(sA.replace(re_d, ''), cell_data) ? false : true;
	                    }
	                    //like
	                    else if (hasLK) {
	                        occurence = o._containsStr(sA.replace(re_lk, ''), cell_data, null, false);
	                    }
	                    //equal
	                    else if (hasEQ) {
	                        occurence = o._containsStr(sA.replace(re_eq, ''), cell_data, null, true);
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
	                        occurence = _str.Str.isEmpty(cell_data);
	                    }
	                    //non-empty
	                    else if (hasNM) {
	                        occurence = !_str.Str.isEmpty(cell_data);
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
	                        var fCol = f['col_' + j];
	                        occurence = o._containsStr(sA, cell_data, !fCol ? o.fltTypeInp : fCol);
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
	                    isRowValid = this.searchType === 'include' ? true : false,

	                //only for single filter search
	                singleFltRowValid = false;

	                // this loop retrieves cell data
	                for (var j = 0; j < nchilds; j++) {
	                    //searched keyword
	                    var sA = this.searchArgs[this.singleSearchFlt ? 0 : j],
	                        dtType = this.hasColDateType ? this.colDateType[j] : this.defaultDateType;
	                    if (sA === '') {
	                        continue;
	                    }

	                    var cell_data = _str.Str.matchCase(this.getCellData(j, cell[j]), this.matchCase);

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
	                        var cS,
	                            occur = false,
	                            s = hasMultiOrSA ? sAOrSplit : sAAndSplit;
	                        for (var w = 0; w < s.length; w++) {
	                            cS = _str.Str.trim(s[w]);
	                            occur = hasArg(cS, cell_data, j);
	                            highlight(cS, occur, cell[j]);
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
	                        occurence[j] = hasArg(_str.Str.trim(sA), cell_data, j);
	                        highlight(sA, occurence[j], cell[j]);
	                    } //else single param

	                    if (!occurence[j]) {
	                        isRowValid = this.searchType === 'include' ? false : true;
	                    }
	                    if (this.singleSearchFlt && occurence[j]) {
	                        singleFltRowValid = true;
	                    }
	                    if (this.popUpFilters) {
	                        this.Cpt.popupFilter.buildIcon(j, true);
	                    }
	                    if (this.markActiveColumns) {
	                        if (k === this.refRow) {
	                            if (this.onBeforeActiveColumn) {
	                                this.onBeforeActiveColumn.call(null, this, j);
	                            }
	                            _dom.Dom.addClass(this.getHeaderElement(j), this.activeColumnsCssClass);
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
	                    // always visible rows need to be counted as valid
	                    if (this.hasVisibleRows && _array.Arr.has(this.visibleRows, k) && !this.paging) {
	                        this.validRowsIndex.push(k);
	                    } else {
	                        hiddenrows++;
	                    }
	                } else {
	                    this.validateRow(k, true);
	                    this.validRowsIndex.push(k);
	                    if (this.alternateBgs) {
	                        this.Cpt.alternateRows.setRowBg(k, this.validRowsIndex.length);
	                    }
	                    if (this.onRowValidated) {
	                        this.onRowValidated.call(null, this, k);
	                    }
	                }
	            } // for k

	            this.nbVisibleRows = this.validRowsIndex.length;
	            this.nbHiddenRows = hiddenrows;
	            this.isStartBgAlternate = false;

	            if (this.rememberGridValues) {
	                this.Cpt.store.saveFilterValues(this.fltsValuesCookie);
	            }
	            //applies filter props after filtering process
	            if (!this.paging) {
	                this.applyGridProps();
	            } else {
	                this.startPagingRow = 0;
	                this.currentPageNb = 1;
	                this.Cpt.paging.setPagingInfo(this.validRowsIndex);
	            } //starts paging process
	            //invokes onafter callback
	            if (this.onAfterFilter) {
	                this.onAfterFilter.call(null, this);
	            }
	        }
	    }, {
	        key: 'applyGridProps',

	        /*====================================================
	            - checks methods that should be called
	            after filtering and/or paging process
	        =====================================================*/
	        value: function applyGridProps() {
	            // blurs active filter (IE)
	            if (this.activeFlt && _str.Str.lower(this.activeFlt.nodeName) === this.fltTypeSlc && !this.popUpFilters) {
	                this.activeFlt.blur();
	                if (this.activeFlt.parentNode) {
	                    this.activeFlt.parentNode.focus();
	                }
	            }

	            //shows rows always visible
	            if (this.visibleRows) {
	                this.enforceVisibility();
	            }
	            //makes operation on a col
	            if (this.hasColOperation) {
	                this.Cpt.colOps.calc();
	            }
	            //re-populates drop-down filters
	            if (this.linkedFilters) {
	                this.linkFilters();
	            }
	            var nr = !this.paging && this.hasVisibleRows ? this.nbVisibleRows - this.visibleRows.length : this.nbVisibleRows;
	            //refreshes rows counter
	            if (this.rowsCounter) {
	                this.Cpt.rowsCounter.refresh(nr);
	            }

	            if (this.popUpFilters) {
	                this.Cpt.popupFilter.closeAll();
	            }
	        }
	    }, {
	        key: 'getColValues',

	        /*====================================================
	            - returns an array containing cell values of
	            a column
	            - needs following args:
	                - column index (number)
	                - a boolean set to true if we want only
	                numbers to be returned
	                - array containing rows index to be excluded
	                from returned values
	        =====================================================*/
	        value: function getColValues(colindex, num, exclude) {
	            if (!this.fltGrid) {
	                return;
	            }
	            var row = this.tbl.rows,
	                colValues = [];

	            for (var i = this.refRow; i < this.nbRows; i++) {
	                var isExludedRow = false;
	                // checks if current row index appears in exclude array
	                if (exclude && _types.Types.isArray(exclude)) {
	                    isExludedRow = _array.Arr.has(exclude, i); //boolean
	                }
	                var cell = row[i].cells,
	                    nchilds = cell.length;

	                // checks if row has exact cell # and is not excluded
	                if (nchilds == this.nbCells && !isExludedRow) {
	                    // this loop retrieves cell data
	                    for (var j = 0; j < nchilds; j++) {
	                        if (j === colindex && row[i].style.display === '') {
	                            var cell_data = _str.Str.lower(this.getCellData(j, cell[j])),
	                                nbFormat = this.colNbFormat ? this.colNbFormat[colindex] : null,
	                                data = num ? removeNbFormat(cell_data, nbFormat) : cell_data;
	                            colValues.push(data);
	                        }
	                    }
	                }
	            } //for i
	            return colValues;
	        }
	    }, {
	        key: 'getFilterValue',

	        /*====================================================
	            - Returns value of a specified filter
	            - Params:
	                - index: filter column index (numeric value)
	        =====================================================*/
	        value: function getFilterValue(index) {
	            if (!this.fltGrid) {
	                return;
	            }
	            var fltValue,
	                flt = this.getFilterElement(index);
	            if (!flt) {
	                return '';
	            }
	            var fltColType = this.fltCol[index];
	            if (fltColType !== this.fltTypeMulti && fltColType !== this.fltTypeCheckList) {
	                fltValue = flt.value;
	            }
	            //mutiple select
	            else if (fltColType === this.fltTypeMulti) {
	                fltValue = '';
	                for (var j = 0; j < flt.options.length; j++) {
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

	        /*====================================================
	            - Returns the value of every single filter
	        =====================================================*/
	        value: function getFiltersValue() {
	            if (!this.fltGrid) {
	                return;
	            }
	            var searchArgs = [];
	            for (var i = 0; i < this.fltIds.length; i++) {
	                searchArgs.push(_str.Str.trim(_str.Str.matchCase(this.getFilterValue(i), this.matchCase)));
	            }
	            return searchArgs;
	        }
	    }, {
	        key: 'getFilterId',

	        /*====================================================
	            - Returns filter id of a specified column
	            - Params:
	                - index: column index (numeric value)
	        =====================================================*/
	        value: function getFilterId(index) {
	            if (!this.fltGrid) {
	                return;
	            }
	            return this.fltIds[i];
	        }
	    }, {
	        key: 'getFiltersByType',

	        /*====================================================
	            - returns an array containing ids of filters of a
	            specified type (inputs or selects)
	            - Note that hidden filters are also returned
	            - Needs folllowing args:
	                - filter type string ('input','select',
	                'multiple')
	                - optional boolean: if set true method
	                returns column indexes otherwise filters ids
	        =====================================================*/
	        value: function getFiltersByType(type, bool) {
	            if (!this.fltGrid) {
	                return;
	            }
	            var arr = [];
	            for (var i = 0; i < this.fltIds.length; i++) {
	                var fltType = this['col' + i];
	                if (fltType === _str.Str.lower(type)) {
	                    var a = bool ? i : this.fltIds[i];
	                    arr.push(a);
	                }
	            }
	            return arr;
	        }
	    }, {
	        key: 'getFilterElement',

	        /*====================================================
	            - returns filter DOM element for a given column
	            index
	        =====================================================*/
	        value: function getFilterElement(index) {
	            if (!this.fltGrid) {
	                return null;
	            }
	            return _dom.Dom.id(this.fltIds[index]);
	        }
	    }, {
	        key: 'getCellsNb',

	        /*====================================================
	            - returns number of cells in a row
	            - if rowIndex param is passed returns number of
	            cells of specified row (number)
	        =====================================================*/
	        value: function getCellsNb(rowIndex) {
	            var tr = !rowIndex ? this.tbl.rows[0] : this.tbl.rows[rowIndex];
	            return tr.cells.length;
	        }
	    }, {
	        key: 'getRowsNb',

	        /*====================================================
	            - returns total nb of filterable rows starting
	            from reference row if defined
	            - Param:
	                - includeHeaders: if true header rows are
	                included in calculation(= table rows number)
	        =====================================================*/
	        value: function getRowsNb(includeHeaders) {
	            var s = !this.refRow ? 0 : this.refRow,
	                ntrs = this.tbl.rows.length;
	            if (includeHeaders) {
	                s = 0;
	            }
	            return parseInt(ntrs - s, 10);
	        }
	    }, {
	        key: 'getCellData',

	        /*====================================================
	            - returns text content of a given cell
	            - Params:
	                - i: index of the column (number)
	                - cell: td DOM object
	        =====================================================*/
	        value: function getCellData(i, cell) {
	            if (i === undefined || !cell) {
	                return '';
	            }
	            //First checks for customCellData event
	            if (this.customCellData && _array.Arr.has(this.customCellDataCols, i)) {
	                return this.customCellData.call(null, this, cell, i);
	            } else {
	                return _dom.Dom.getText(cell);
	            }
	        }
	    }, {
	        key: 'getTableData',

	        /*====================================================
	            - returns an array containing table data:
	            [rowindex,[value1,value2,value3...]]
	        =====================================================*/
	        value: function getTableData() {
	            var row = this.tbl.rows;
	            for (var k = this.refRow; k < this.nbRows; k++) {
	                var rowData = [k, []];
	                var cells = row[k].cells;
	                // this loop retrieves cell data
	                for (var j = 0; j < cells.length; j++) {
	                    var cell_data = this.getCellData(j, cells[j]);
	                    rowData[1].push(cell_data);
	                }
	                this.tblData.push(rowData);
	            }
	            return this.tblData;
	        }
	    }, {
	        key: 'getFilteredData',

	        /*====================================================
	            - returns an array containing filtered data:
	            [rowindex,[value1,value2,value3...]]
	        =====================================================*/
	        value: function getFilteredData(includeHeaders) {
	            if (!this.validRowsIndex) {
	                return [];
	            }
	            var row = this.tbl.rows,
	                filteredData = [];
	            if (includeHeaders) {
	                var table = this.gridLayout ? this.Cpt.gridLayout.headTbl : this.tbl,
	                    r = table.rows[this.headersRow],
	                    rowData = [r.rowIndex, []];
	                for (var j = 0; j < this.nbCells; j++) {
	                    var headerText = this.getCellData(j, r.cells[j]);
	                    rowData[1].push(headerText);
	                }
	                filteredData.push(rowData);
	            }

	            var validRows = this.getValidRowsIndex(true);
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

	        /*====================================================
	            - returns an array containing filtered data of a
	            specified column.
	            - Params:
	                - colIndex: index of the column (number)
	            - returned array:
	            [value1,value2,value3...]
	        =====================================================*/
	        value: function getFilteredDataCol(colIndex) {
	            if (colIndex === undefined) {
	                return [];
	            }
	            var data = this.getFilteredData(),
	                colData = [];
	            for (var i = 0; i < data.length; i++) {
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
	        value: function getRowDisplay(row) {
	            if (!this.fltGrid && !_types.Types.isObj(row)) {
	                return;
	            }
	            return row.style.display;
	        }
	    }, {
	        key: 'validateRow',

	        /*====================================================
	            - Validates/unvalidates row by setting 'validRow'
	            attribute and shows/hides row
	            - Params:
	                - rowIndex: index of the row (number)
	                - isValid: boolean
	        =====================================================*/
	        value: function validateRow(rowIndex, isValid) {
	            var row = this.tbl.rows[rowIndex];
	            if (!row || _str.Str.lower(typeof isValid) !== 'boolean') {
	                return;
	            }

	            // always visible rows are valid
	            if (this.hasVisibleRows && _array.Arr.has(this.visibleRows, rowIndex) && !this.paging) {
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

	        /*====================================================
	            - Validates all filterable rows
	        =====================================================*/
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

	        /*====================================================
	            - Inserts value in a specified filter
	            - Params:
	                - index: filter column index (numeric value)
	                - searcharg: search string
	                - doFilter: optional boolean for multiple
	                selects: executes filtering when multiple
	                select populated... IE only!
	        =====================================================*/
	        value: function setFilterValue(index, searcharg, doFilter) {
	            if (!this.fltGrid && !this.isFirstLoad || !this.getFilterElement(index)) {
	                return;
	            }
	            var slc = this.getFilterElement(index),
	                execFilter = doFilter === undefined ? true : doFilter,
	                fltColType = this['col' + index];
	            searcharg = searcharg === undefined ? '' : searcharg;

	            if (fltColType !== this.fltTypeMulti && fltColType != this.fltTypeCheckList) {
	                slc.value = searcharg;
	            }
	            //multiple selects
	            else if (fltColType === this.fltTypeMulti) {
	                var s = searcharg.split(' ' + this.orOperator + ' '),
	                    ct = 0; //keywords counter
	                for (var j = 0; j < slc.options.length; j++) {
	                    if (s === '' || s[0] === '') {
	                        slc.options[j].selected = false;
	                    }
	                    if (slc.options[j].value === '') {
	                        slc.options[j].selected = false;
	                    }
	                    if (slc.options[j].value !== '' && _array.Arr.has(s, slc.options[j].value, true)) {
	                        // IE multiple selection work-around
	                        // if(hlp.isIE()){
	                        //     //when last value reached filtering can be executed
	                        //     var filter = ct==(s.length-1) && execFilter ?
	                        //         true : false;
	                        //     this.__deferMultipleSelection(slc,j,filter);
	                        //     ct++;
	                        // }
	                        // else{
	                        //     slc.options[j].selected = true;
	                        // }
	                        slc.options[j].selected = true;
	                    } //if
	                } //for j
	            }
	            //checklist
	            else if (fltColType === this.fltTypeCheckList) {
	                searcharg = _str.Str.matchCase(searcharg, this.matchCase);
	                var sarg = searcharg.split(' ' + this.orOperator + ' '),
	                    fltValue = slc.setAttribute('value', ''),
	                    fltIndex = slc.setAttribute('indexes', '');
	                for (var k = 0; k < _dom.Dom.tag(slc, 'li').length; k++) {
	                    var li = _dom.Dom.tag(slc, 'li')[k],
	                        lbl = _dom.Dom.tag(li, 'label')[0],
	                        chk = _dom.Dom.tag(li, 'input')[0],
	                        lblTxt = _str.Str.matchCase(_dom.Dom.getText(lbl), this.matchCase);
	                    if (lblTxt !== '' && _array.Arr.has(sarg, lblTxt, true)) {
	                        chk.checked = true;
	                        this.Cpt.checkList.setCheckListValues(chk);
	                    } else {
	                        chk.checked = false;
	                        this.Cpt.checkList.setCheckListValues(chk);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'setColWidths',

	        /*====================================================
	            - sets coluun widths in pixels
	        =====================================================*/
	        value: function setColWidths(rowIndex) {
	            if (!this.fltGrid || !this.hasColWidth) {
	                return;
	            }
	            var o = this,
	                rIndex;
	            if (rowIndex === undefined) {
	                rIndex = this.tbl.rows[0].style.display != 'none' ? 0 : 1;
	            } else {
	                rIndex = rowIndex;
	            }
	            setWidths(this.tbl.rows[rIndex]);

	            function setWidths(row) {
	                if (!o && o.nbCells != o.colWidth.length) {
	                    return;
	                }
	                if (o.nbCells == row.cells.length) {
	                    for (var k = 0; k < o.nbCells; k++) {
	                        row.cells[k].style.width = o.colWidth[k];
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'enforceVisibility',

	        /*====================================================
	            - makes a row always visible
	            - Note this works only if paging is false
	        =====================================================*/
	        value: function enforceVisibility() {
	            if (this._hasGrid && this.hasVisibleRows && !this.paging) {
	                for (var i = 0; i < this.visibleRows.length; i++) {
	                    //row index cannot be > nrows
	                    if (this.visibleRows[i] <= this.nbRows) {
	                        this.validateRow(this.visibleRows[i], true);
	                    }
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

	        /*====================================================
	            - clears grid filters
	        =====================================================*/
	        value: function _clearFilters() {
	            if (!this.fltGrid) {
	                return;
	            }
	            if (this.onBeforeReset) {
	                this.onBeforeReset.call(null, this, this.getFiltersValue());
	            }
	            for (var i = 0; i < this.fltIds.length; i++) {
	                this.setFilterValue(i, '');
	            }
	            if (this.linkedFilters) {
	                this.activeFilterId = '';
	                this.linkFilters();
	            }
	            if (this.rememberPageLen) {
	                _cookie.Cookie.remove(this.pgLenCookie);
	            }
	            if (this.rememberPageNb) {
	                _cookie.Cookie.remove(this.pgNbCookie);
	            }
	            if (this.onAfterReset) {
	                this.onAfterReset.call(null, this);
	            }
	        }
	    }, {
	        key: 'clearActiveColumns',

	        /*====================================================
	            - clears active columns header class name
	        =====================================================*/
	        value: function clearActiveColumns() {
	            for (var i = 0; i < this.fltIds.length; i++) {
	                _dom.Dom.removeClass(this.getHeaderElement(i), this.activeColumnsCssClass);
	            }
	        }
	    }, {
	        key: 'refresh',

	        /*====================================================
	            - Re-generates filters grid
	        =====================================================*/
	        value: function refresh(config) {
	            var configObj = !config ? this.cfg : config;
	            var hasSort = this.sort;
	            //sort property is set to false in order to avoid sort object
	            //re-instanciation
	            if (hasSort) {
	                this.sort = false;
	            }
	            this.nbRows = this.getRowsNb(); //in case table is refreshed
	            this.remove();
	            window['tf_' + this.id] = new TableFilter(this.id, this.startRow, configObj);
	            this.isFirstLoad = true;
	            this.fltIds = [];
	            this.init();
	            //New tbody content needs to be referenced in sortabletable script with
	            //setTBody() method
	            if (hasSort) {
	                //this.st =  SortableTable object
	                //Note this is a method of the Sortable Table 1.12 script
	                //(Erik Arvidsson)
	                this.st.setTBody(this.tbl.tBodies[0]);
	                //finally sort property is enabled again
	                this.sort = true;
	            }
	        }
	    }, {
	        key: 'linkFilters',

	        /*====================================================
	            - retrieves select, multiple and checklist filters
	            - calls method repopulating filters
	        =====================================================*/
	        value: function linkFilters() {
	            var slcA1 = this.getFiltersByType(this.fltTypeSlc, true),
	                slcA2 = this.getFiltersByType(this.fltTypeMulti, true),
	                slcA3 = this.getFiltersByType(this.fltTypeCheckList, true),
	                slcIndex = slcA1.concat(slcA2);
	            slcIndex = slcIndex.concat(slcA3);

	            if (this.activeFilterId) {
	                var activeFlt = this.activeFilterId.split('_')[0];
	                activeFlt = activeFlt.split(this.prfxFlt)[1];
	                var slcSelectedValue;
	                for (var i = 0; i < slcIndex.length; i++) {
	                    var curSlc = _dom.Dom.id(this.fltIds[slcIndex[i]]);
	                    slcSelectedValue = this.getFilterValue(slcIndex[i]);
	                    if (activeFlt !== slcIndex[i] || this.paging && _array.Arr.has(slcA1, slcIndex[i]) && activeFlt === slcIndex[i] || !this.paging && (_array.Arr.has(slcA3, slcIndex[i]) || _array.Arr.has(slcA2, slcIndex[i])) || slcSelectedValue === this.displayAllText) {

	                        if (_array.Arr.has(slcA3, slcIndex[i])) {
	                            this.Cpt.checkList.checkListDiv[slcIndex[i]].innerHTML = '';
	                        } else {
	                            curSlc.innerHTML = '';
	                        }

	                        //1st option needs to be inserted
	                        if (this.fillSlcOnDemand) {
	                            var opt0 = _dom.Dom.createOpt(this.displayAllText, '');
	                            if (curSlc) {
	                                curSlc.appendChild(opt0);
	                            }
	                        }

	                        if (_array.Arr.has(slcA3, slcIndex[i])) {
	                            this.Cpt.checkList._build(slcIndex[i]);
	                        } else {
	                            this.Cpt.dropdown._build(slcIndex[i], true);
	                        }

	                        this.setFilterValue(slcIndex[i], slcSelectedValue);
	                    }
	                } // for i
	            }
	        }
	    }, {
	        key: '_resetGrid',

	        /*====================================================
	            - Private methods
	        =====================================================*/

	        /*====================================================
	            - Only used by AddGrid() method
	            - Resets filtering grid bar if previously removed
	        =====================================================*/
	        value: function _resetGrid() {
	            if (this.isFirstLoad) {
	                return;
	            }

	            // grid was removed, grid row element is stored in fltGridEl property
	            if (!this.gridLayout) {
	                this.tbl.rows[this.filtersRowIndex].parentNode.insertBefore(this.fltGridEl, this.tbl.rows[this.filtersRowIndex]);
	            }

	            // filters are appended in external placeholders elements
	            if (this.isExternalFlt) {
	                for (var ct = 0; ct < this.externalFltTgtIds.length; ct++) {
	                    var extFlt = _dom.Dom.id(this.externalFltTgtIds[ct]);
	                    if (extFlt) {
	                        extFlt.appendChild(this.externalFltEls[ct]);
	                        var colFltType = this['col' + ct];
	                        //IE special treatment for gridLayout, appended filters are
	                        //empty
	                        if (this.gridLayout && this.externalFltEls[ct].innerHTML === '' && colFltType !== this.fltTypeInp) {
	                            if (colFltType === this.fltTypeSlc || colFltType === this.fltTypeMulti) {
	                                this.Cpt.dropdown.build(ct);
	                            }
	                            if (colFltType === this.fltTypeCheckList) {
	                                this.Cpt.checkList.build(ct);
	                            }
	                        }
	                    }
	                }
	            }

	            this.nbFilterableRows = this.getRowsNb();
	            this.nbVisibleRows = this.nbFilterableRows;
	            this.nbRows = this.tbl.rows.length;
	            if (this.isSortEnabled) {
	                this.sort = true;
	            }

	            if (this.tbl.rows[this.filtersRowIndex].innerHTML === '') {
	                refreshFilters(this);
	            } else {
	                if (this.popUpFilters) {
	                    this.headersRow++;
	                    this.Cpt.popupFilter.buildAll();
	                }
	            }

	            /***    ie bug work-around, filters need to be re-generated since row
	                    is empty; insertBefore method doesn't seem to work properly
	                    with previously generated DOM nodes modified by innerHTML   ***/
	            function refreshFilters(o) {
	                o.tbl.deleteRow(o.filtersRowIndex);
	                o.remove();
	                o.fltIds = [];
	                o.isFirstLoad = true;
	                if (o.popUpFilters) {
	                    // o.RemovePopupFilters();
	                    o.Cpt.popupFilter.destroy();
	                }
	                o._AddGrid();
	            }

	            if (!this.gridLayout) {
	                _dom.Dom.addClass(this.tbl, this.prfxTf);
	            }
	            this._hasGrid = true;
	        }
	    }, {
	        key: '_containsStr',

	        /*==============================================
	            - Checks if data contains searched arg,
	            returns a boolean
	            - Params:
	                - arg: searched string
	                - data: data string
	                - fltType: filter type (string,
	                exact match by default for selects -
	                optional)
	                - forceMatch: boolean forcing exact
	                match (optional)
	        ===============================================*/
	        value: function _containsStr(arg, data, fltType, forceMatch) {
	            // Improved by Cedric Wartel (cwl)
	            // automatic exact match for selects and special characters are now
	            // filtered
	            var regexp,
	                modifier = this.matchCase ? 'g' : 'gi',
	                exactMatch = !forceMatch ? this.exactMatch : forceMatch;
	            if (exactMatch || fltType !== this.fltTypeInp && fltType) {
	                regexp = new RegExp('(^\\s*)' + _str.Str.rgxEsc(arg) + '(\\s*$)', modifier);
	            } else {
	                regexp = new RegExp(_str.Str.rgxEsc(arg), modifier);
	            }
	            return regexp.test(data);
	        }
	    }, {
	        key: 'isImported',
	        value: function isImported(filePath, type) {
	            var imported = false,
	                importType = !type ? 'script' : type,
	                attr = importType == 'script' ? 'src' : 'href',
	                files = _dom.Dom.tag(doc, importType);
	            for (var i = 0; i < files.length; i++) {
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
	        key: 'includeFile',
	        value: function includeFile(fileId, filePath, callback, type) {
	            var ftype = !type ? 'script' : type,
	                imported = this.isImported(filePath, ftype);
	            if (imported) {
	                return;
	            }
	            var o = this,
	                isLoaded = false,
	                file,
	                head = _dom.Dom.tag(doc, 'head')[0];

	            if (_str.Str.lower(ftype) === 'link') {
	                file = _dom.Dom.create('link', ['id', fileId], ['type', 'text/css'], ['rel', 'stylesheet'], ['href', filePath]);
	            } else {
	                file = _dom.Dom.create('script', ['id', fileId], ['type', 'text/javascript'], ['src', filePath]);
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

	        /*====================================================
	            - checks if table has a filter grid
	            - returns a boolean
	        =====================================================*/
	        value: function hasGrid() {
	            return this._hasGrid;
	        }
	    }, {
	        key: 'getFiltersId',

	        /*====================================================
	            - returns an array containing filters ids
	            - Note that hidden filters are also returned
	        =====================================================*/
	        value: function getFiltersId() {
	            if (!this._hasGrid) {
	                return;
	            }
	            return this.fltIds;
	        }
	    }, {
	        key: 'getValidRowsIndex',

	        /*====================================================
	            - returns an array containing valid rows indexes
	            (valid rows upon filtering)
	        =====================================================*/
	        value: function getValidRowsIndex(reCalc) {
	            if (!this._hasGrid) {
	                return;
	            }
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

	        /*====================================================
	            - Returns the index of the row containing the
	            filters
	        =====================================================*/
	        value: function getFiltersRowIndex() {
	            if (!this._hasGrid) {
	                return;
	            }
	            return this.filtersRowIndex;
	        }
	    }, {
	        key: 'getHeadersRowIndex',

	        /*====================================================
	            - Returns the index of the headers row
	        =====================================================*/
	        value: function getHeadersRowIndex() {
	            if (!this._hasGrid) {
	                return;
	            }
	            return this.headersRow;
	        }
	    }, {
	        key: 'getStartRowIndex',

	        /*====================================================
	            - Returns the index of the row from which will
	            start the filtering process (1st filterable row)
	        =====================================================*/
	        value: function getStartRowIndex() {
	            if (!this._hasGrid) {
	                return;
	            }
	            return this.refRow;
	        }
	    }, {
	        key: 'getLastRowIndex',

	        /*====================================================
	            - Returns the index of the last row
	        =====================================================*/
	        value: function getLastRowIndex() {
	            if (!this._hasGrid) {
	                return;
	            }
	            return this.nbRows - 1;
	        }
	    }, {
	        key: 'getHeaderElement',

	        /*====================================================
	            - returns a header DOM element for a given column
	            index
	        =====================================================*/
	        value: function getHeaderElement(colIndex) {
	            var table = this.gridLayout ? this.Cpt.gridLayout.headTbl : this.tbl;
	            var tHead = _dom.Dom.tag(table, 'thead');
	            var headersRow = this.headersRow;
	            var header;
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
	        key: 'config',

	        /*====================================================
	            - returns the original configuration object
	        =====================================================*/
	        value: function config() {
	            return this.cfg;
	        }
	    }, {
	        key: 'getFilterableRowsNb',

	        /*====================================================
	            - returns the total number of rows that can be
	            filtered
	        =====================================================*/
	        value: function getFilterableRowsNb() {
	            return this.getRowsNb(false);
	        }
	    }]);

	    return TableFilter;
	})();

	exports.TableFilter = TableFilter;

	function removeNbFormat(data, format) {
	    if (!data) {
	        return;
	    }
	    if (!format) {
	        format = 'us';
	    }
	    var n = data;
	    if (_str.Str.lower(format) === 'us') {
	        n = +n.replace(/[^\d\.-]/g, '');
	    } else {
	        n = +n.replace(/[^\d\,-]/g, '').replace(',', '.');
	    }
	    return n;
	}

	// function isStylesheetImported(stylesheet){
	//     var isImported = false;
	//     if(!doc.styleSheets){
	//         return isImported;
	//     }
	//     var s = doc.styleSheets,
	//         regexp = new RegExp(stylesheet);
	//     for(var i=0; i<s.length; i++){
	//         if(s[i].imports){//IE
	//             var imp = s[i].imports;
	//             for(var j=0; j<imp.length; j++){
	//                 if(str.lower(imp[j].href) === str.lower(stylesheet)){
	//                     isImported = true;
	//                     break;
	//                 }
	//             }
	//         } else {
	//             var r = s[i].cssRules ? s[i].cssRules : s[i].rules;
	//             for(var k=0; k<r.length; k++){
	//                 if(regexp.test(r[k].cssText)){
	//                     isImported = true;
	//                     break;
	//                 }
	//             }
	//         }
	//     }
	//     return isImported;
	// }

	//Firefox does not support outerHTML property
	function setOuterHtml() {
	    if (doc.body.__defineGetter__) {
	        if (HTMLElement) {
	            var element = HTMLElement.prototype;
	            if (element.__defineGetter__) {
	                element.__defineGetter__('outerHTML', function () {
	                    var parent = this.parentNode;
	                    var el = _dom.Dom.create(parent.tagName);
	                    el.appendChild(this);
	                    var shtml = el.innerHTML;
	                    parent.appendChild(this);
	                    return shtml;
	                });
	            }
	            if (element.__defineSetter__) {
	                HTMLElement.prototype.__defineSetter__('outerHTML', function (sHTML) {
	                    var r = this.ownerDocument.createRange();
	                    r.setStartBefore(this);
	                    var df = r.createContextualFragment(sHTML);
	                    this.parentNode.replaceChild(df, this);
	                    return sHTML;
	                });
	            }
	        }
	    }
	}

	// return TableFilter;

	// });

	// }

	/*====================================================
	    - Sets filters grid bar
	    - Calls TF Constructor and generates grid bar
	    - Params:
	            - id: table id (string)
	            - refRow (optional): row index (number)
	            - config (optional): configuration
	            object (literal object)
	    - Returns TF object
	=====================================================*/
	// function setFilterGrid(id){
	//     if(arguments.length === 0){
	//         return;
	//     }
	//     var tf = new TableFilter(arguments[0], arguments[1], arguments[2]);
	//     tf.init();
	//     window['tf_'+id] = tf;
	//     return tf;
	// }

	/*===BEGIN removable section===========================
	    - Unobtrusive grid bar generation using
	    'filterable' class
	    - If you don't use it you can remove safely this
	    section
	/*=====================================================*/
	// window['tf_isNotIE'] = !(/msie|MSIE/.test(navigator.userAgent));
	// TF.Event.add(window,
	//     (tf_isNotIE || (typeof window.addEventListener === 'function') ?
	//         'DOMContentLoaded' : 'load'),
	//     initFilterGrid);

	// function initFilterGrid(){
	//     if(!document.getElementsByTagName){ return; }
	//     var tbls = dom.tag(document,'table'), config;
	//     for (var i=0; i<tbls.length; i++){
	//         var cTbl = tbls[i], cTblId = cTbl.getAttribute('id');
	//         if(TF.Dom.hasClass(cTbl,'filterable') && cTblId){
	//             if(TF.Types.isObj(cTblId+'cfg')){
	//                 config = window[cTblId+'cfg'];
	//             } else { config = undefined; }
	//             window[cTblId+'_isUnob'] = true;
	//             setFilterGrid(cTblId,config);
	//         }
	//     }// for i
	// }
	/*===END removable section===========================*/

	// if(o.SetSortTable){ o.SetSortTable(); }

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * DOM event utilities
	 */

	'use strict';

	var Event = {
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

	exports.Event = Event;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * DOM utilities
	 */

	'use strict';

	var Dom = {};

	/**
	 * Returns text + text of children of given node
	 * @param  {NodeElement} node
	 * @return {String}
	 */
	Dom.getText = function (node) {
	    var s = node.textContent || node.innerText || node.innerHTML.replace(/<[^<>]+>/g, '');
	    s = s.replace(/^\s+/, '').replace(/\s+$/, '');
	    return s;
	};

	/**
	 * Creates an html element with given collection of attributes
	 * @param  {String} tag a string of the html tag to create
	 * @param  {Array} an undetermined number of arrays containing the with 2
	 *                    items, the attribute name and its value ['id','myId']
	 * @return {Object}     created element
	 */
	Dom.create = function (tag) {
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
	};

	/**
	 * Returns a text node with given text
	 * @param  {String} text
	 * @return {Object}
	 */
	Dom.text = function (text) {
	    return document.createTextNode(text);
	};

	/**
	 * Returns offset position of passed element
	 * @param  {object} obj [description]
	 * @return {object}     literal object with left and top values
	 */
	Dom.position = function (obj) {
	    var l = 0,
	        t = 0;
	    if (obj && obj.offsetParent) {
	        do {
	            l += obj.offsetLeft;
	            t += obj.offsetTop;
	        } while (obj == obj.offsetParent);
	    }
	    return { left: l, top: t };
	};

	Dom.hasClass = function (ele, cls) {
	    if (!ele) {
	        return false;
	    }

	    if (supportsClassList()) {
	        return ele.classList.contains(cls);
	    }
	    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	};

	Dom.addClass = function (ele, cls) {
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
	};

	Dom.removeClass = function (ele, cls) {
	    if (!ele) {
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
	Dom.createOpt = function (text, value, isSel) {
	    var isSelected = isSel ? true : false,
	        opt = isSelected ? this.create('option', ['value', value], ['selected', 'true']) : this.create('option', ['value', value]);
	    opt.appendChild(this.text(text));
	    return opt;
	};

	/**
	 * Creates and returns a checklist item
	 * @param  {Number} chkIndex  index of check item
	 * @param  {String} chkValue  check item value
	 * @param  {String} labelText check item label text
	 * @return {Object}           li DOM element
	 */
	Dom.createCheckItem = function (chkIndex, chkValue, labelText) {
	    var li = this.create('li'),
	        label = this.create('label', ['for', chkIndex]),
	        check = this.create('input', ['id', chkIndex], ['name', chkIndex], ['type', 'checkbox'], ['value', chkValue]);
	    label.appendChild(check);
	    label.appendChild(this.text(labelText));
	    li.appendChild(label);
	    li.label = label;
	    li.check = check;
	    return li;
	};

	Dom.id = function (id) {
	    return document.getElementById(id);
	};

	Dom.tag = function (o, tagname) {
	    return o.getElementsByTagName(tagname);
	};

	// HTML5 classList API
	function supportsClassList() {
	    return document.documentElement.classList;
	}

	exports.Dom = Dom;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * String utilities
	 */

	'use strict';

	var Str = {};

	Str.lower = function (text) {
	    return text.toLowerCase();
	};

	Str.upper = function (text) {
	    return text.toUpperCase();
	};

	Str.trim = function (text) {
	    if (text.trim) {
	        return text.trim();
	    }
	    return text.replace(/^\s*|\s*$/g, '');
	};

	Str.isEmpty = function (text) {
	    return this.trim(text) === '';
	};

	Str.rgxEsc = function (text) {
	    function escape(e) {
	        var a = new RegExp('\\' + e, 'g');
	        text = text.replace(a, '\\' + e);
	    }

	    var chars = ['\\', '[', '^', '$', '.', '|', '?', '*', '+', '(', ')'];
	    for (var e = 0; e < chars.length; e++) {
	        escape(chars[e]);
	    }
	    return text;
	};

	Str.matchCase = function (text, mc) {
	    if (!mc) {
	        return this.lower(text);
	    }
	    return text;
	};

	exports.Str = Str;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Cookie utilities
	 */

	'use strict';

	var Cookie = {};

	Cookie.write = function (name, value, hours) {
	    var expire = '';
	    if (hours) {
	        expire = new Date(new Date().getTime() + hours * 3600000);
	        expire = '; expires=' + expire.toGMTString();
	    }
	    document.cookie = name + '=' + escape(value) + expire;
	};

	Cookie.read = function (name) {
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
	};

	Cookie.remove = function (name) {
	    this.write(name, '', -1);
	};

	Cookie.valueToArray = function (name, separator) {
	    if (!separator) {
	        separator = ',';
	    }
	    //reads the cookie
	    var val = this.read(name);
	    //creates an array with filters' values
	    var arr = val.split(separator);
	    return arr;
	};

	Cookie.getValueByIndex = function (name, index, separator) {
	    if (!separator) {
	        separator = ',';
	    }
	    //reads the cookie
	    var val = this.valueToArray(name, separator);
	    return val[index];
	};

	exports.Cookie = Cookie;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Types utilities
	 */

	'use strict';

	var Types = {};

	var UNDEFINED = void 0;

	/**
	 * Checks if var exists and is an object
	 * @param  {String or Object}  v
	 * @return {Boolean}
	 */
	Types.isObj = function (v) {
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
	};

	/**
	 * Checks if passed parameter is a function
	 * @param  {Function} fn
	 * @return {Boolean}
	 */
	Types.isFn = function (fn) {
	    return fn && fn.constructor == Function;
	};

	/**
	 * Checks if passed param is an array
	 * @param  {Array}  obj
	 * @return {Boolean}
	 */
	Types.isArray = function (obj) {
	    return obj && obj.constructor == Array;
	};

	/**
	 * Determines if passed param is undefined
	 * @param  {Any}  o
	 * @return {Boolean}
	 */
	Types.isUndef = function (o) {
	    return o === UNDEFINED;
	};

	exports.Types = Types;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Array utilities
	 */

	'use strict';

	var _Str = __webpack_require__(4);

	var Arr = {
	    has: function has(arr, val, caseSensitive) {
	        var sCase = caseSensitive === undefined ? false : caseSensitive;
	        for (var i = 0; i < arr.length; i++) {
	            if (_Str.Str.matchCase(arr[i].toString(), sCase) == val) {
	                return true;
	            }
	        }
	        return false;
	    },
	    indexByValue: function indexByValue(arr, val, caseSensitive) {
	        var sCase = caseSensitive === undefined ? false : caseSensitive;
	        for (var i = 0; i < arr.length; i++) {
	            if (_Str.Str.matchCase(arr[i].toString(), sCase) == val) {
	                return i;
	            }
	        }
	        return -1;
	    }
	};

	exports.Arr = Arr;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Misc helpers
	 */

	'use strict';

	var _Str = __webpack_require__(4);

	var Helpers = {
	    isIE: function isIE() {
	        return /msie|MSIE/.test(navigator.userAgent);
	    },

	    removeNbFormat: function removeNbFormat(data, format) {
	        if (!data) {
	            return;
	        }
	        if (!format) {
	            format = 'us';
	        }
	        var n = data;
	        if (_Str.Str.lower(format) === 'us') {
	            n = +n.replace(/[^\d\.-]/g, '');
	        } else {
	            n = +n.replace(/[^\d\,-]/g, '').replace(',', '.');
	        }
	        return n;
	    }
	};

	exports.Helpers = Helpers;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Date utilities
	 */

	'use strict';

	var DateHelper = {
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
	        var reg1, reg2;
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
	        // If it doesn't conform to the right format (with either a 2 digit year or
	        // 4 digit year), fail
	        if (reg1.test(dateStr) === false && reg2.test(dateStr) === false) {
	            return false;
	        }
	        // Split into 3 parts based on what the divider was
	        var parts = dateStr.split(RegExp.$1);
	        var mm, dd, yy;
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
	    format: (function (_format) {
	        function format(_x, _x2) {
	            return _format.apply(this, arguments);
	        }

	        format.toString = function () {
	            return _format.toString();
	        };

	        return format;
	    })(function (dateStr, format) {
	        if (!format) {
	            format = 'DMY';
	        }
	        if (!dateStr || dateStr === '') {
	            return new Date(1001, 0, 1);
	        }
	        var oDate, parts;

	        function y2kDate(yr) {
	            if (yr === undefined) {
	                return 0;
	            }
	            if (yr.length > 2) {
	                return yr;
	            }
	            var y;
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
	            var mondigit;
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

	        switch (format.toUpperCase()) {
	            case 'DDMMMYYYY':
	                parts = dateStr.replace(/[- \/.]/g, ' ').split(' ');
	                oDate = new Date(y2kDate(parts[2]), mmm2mm(parts[1]) - 1, parts[0]);
	                break;
	            case 'DMY':
	                parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/, '$1 $3 $5').split(' ');
	                oDate = new Date(y2kDate(parts[2]), parts[1] - 1, parts[0]);
	                break;
	            case 'MDY':
	                parts = dateStr.replace(/^(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])([- \/.])((\d\d)?\d\d)$/, '$1 $3 $5').split(' ');
	                oDate = new Date(y2kDate(parts[2]), parts[0] - 1, parts[1]);
	                break;
	            case 'YMD':
	                parts = dateStr.replace(/^((\d\d)?\d\d)([- \/.])(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])$/, '$1 $4 $6').split(' ');
	                oDate = new Date(y2kDate(parts[0]), parts[1] - 1, parts[2]);
	                break;
	            default:
	                //in case format is not correct
	                parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/, '$1 $3 $5').split(' ');
	                oDate = new Date(y2kDate(parts[2]), parts[1] - 1, parts[0]);
	                break;
	        }
	        return oDate;
	    })
	};

	exports.DateHelper = DateHelper;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Sort helpers
	 */

	'use strict';

	var _Str = __webpack_require__(4);

	var Sort = {
	  ignoreCase: function ignoreCase(a, b) {
	    var x = _Str.Str.lower(a);
	    var y = _Str.Str.lower(b);
	    return x < y ? -1 : x > y ? 1 : 0;
	  }
	};

	exports.Sort = Sort;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Cookie = __webpack_require__(5);

	var Store = (function () {

	    /**
	     * Store, persistence manager
	     * @param {Object} tf TableFilter instance
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
	            _Cookie.Cookie.write(name, fltValues.join(tf.separator), this.duration);
	        }
	    }, {
	        key: 'getFilterValues',

	        /**
	         * Retrieve filters' values from cookie
	         * @param {String} cookie name
	         * @return {Array}
	         */
	        value: function getFilterValues(name) {
	            var flts = _Cookie.Cookie.read(name);
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
	            _Cookie.Cookie.write(name, this.tf.Cpt.paging.currentPageNb, this.duration);
	        }
	    }, {
	        key: 'getPageNb',

	        /**
	         * Retrieve page number from cookie
	         * @param {String} cookie name
	         * @return {String}
	         */
	        value: function getPageNb(name) {
	            return _Cookie.Cookie.read(name);
	        }
	    }, {
	        key: 'savePageLength',

	        /**
	         * Store page length in cookie
	         * @param {String} cookie name
	         */
	        value: function savePageLength(name) {
	            _Cookie.Cookie.write(name, this.tf.Cpt.paging.resultsPerPageSlc.selectedIndex, this.duration);
	        }
	    }, {
	        key: 'getPageLength',

	        /**
	         * Retrieve page length from cookie
	         * @param {String} cookie name
	         * @return {String}
	         */
	        value: function getPageLength(name) {
	            return _Cookie.Cookie.read(name);
	        }
	    }]);

	    return Store;
	})();

	exports.Store = Store;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _Types = __webpack_require__(6);

	var _Helpers = __webpack_require__(8);

	var _Event = __webpack_require__(2);

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
	        this.gridEnableColResizer = f.grid_enable_cols_resizer !== undefined ? f.grid_enable_cols_resizer : false;
	        //defines col resizer script path
	        this.gridColResizerPath = f.grid_cont_col_resizer_path || this.basePath + 'TFExt_ColsResizer/TFExt_ColsResizer.js';

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
	            if (!tf.hasColWidth) {
	                tf.colWidth = [];
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
	                    tf.colWidth[k] = colW;
	                }
	                tf.hasColWidth = true;
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
	            this.tblMainCont = _Dom.Dom.create('div', ['id', this.prfxMainTblCont + tf.id]);
	            this.tblMainCont.className = this.gridMainContCssClass;
	            if (this.gridWidth) {
	                this.tblMainCont.style.width = this.gridWidth;
	            }
	            tbl.parentNode.insertBefore(this.tblMainCont, tbl);

	            //Table container: div wrapping content table
	            this.tblCont = _Dom.Dom.create('div', ['id', this.prfxTblCont + tf.id]);
	            this.tblCont.className = this.gridContCssClass;
	            if (this.gridWidth) {
	                this.tblCont.style.width = this.gridWidth;
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
	            this.headTblCont = _Dom.Dom.create('div', ['id', this.prfxHeadTblCont + tf.id]);
	            this.headTblCont.className = this.gridHeadContCssClass;
	            if (this.gridWidth) {
	                this.headTblCont.style.width = this.gridWidth;
	            }

	            //Headers table
	            this.headTbl = _Dom.Dom.create('table', ['id', this.prfxHeadTbl + tf.id]);
	            var tH = _Dom.Dom.create('tHead'); //IE<7 needs it

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
	            var filtersRow = _Dom.Dom.create('tr');
	            if (this.gridEnableFilters && tf.fltGrid) {
	                tf.externalFltTgtIds = [];
	                for (var j = 0; j < tf.nbCells; j++) {
	                    var fltTdId = tf.prfxFlt + j + this.prfxGridFltTd + tf.id;
	                    var cl = _Dom.Dom.create(tf.fltCellTag, ['id', fltTdId]);
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
	            var thead = _Dom.Dom.tag(tbl, 'thead');
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
	            tf.setColWidths();

	            //Headers container width
	            this.headTblCont.style.width = this.tblCont.clientWidth + 'px';

	            tbl.style.width = '';
	            //
	            this.headTbl.style.width = tbl.clientWidth + 'px';
	            //

	            //scroll synchronisation
	            _Event.Event.add(this.tblCont, 'scroll', function (evt) {
	                var elm = _Event.Event.target(evt);
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

	            //Sort is enabled if not specified in config object
	            if (f.sort !== false) {
	                tf.sort = true;
	                tf.sortConfig.asyncSort = true;
	                tf.sortConfig.triggerIds = sortTriggers;
	            }

	            if (this.gridEnableColResizer) {
	                if (!tf.hasExtensions) {
	                    tf.extensions = {
	                        name: ['ColumnsResizer_' + tf.id],
	                        src: [this.gridColResizerPath],
	                        description: ['Columns Resizing'],
	                        initialize: [function (o) {
	                            o.SetColsResizer('ColumnsResizer_' + o.id);
	                        }]
	                    };
	                    tf.hasExtensions = true;
	                } else {
	                    if (!tf._containsStr('colsresizer', Str.lower(tf.extensions.src.toString()))) {
	                        tf.extensions.name.push('ColumnsResizer_' + tf.id);
	                        tf.extensions.src.push(tf.gridColResizerPath);
	                        tf.extensions.description.push('Columns Resizing');
	                        tf.extensions.initialize.push(function (o) {
	                            o.SetColsResizer('ColumnsResizer_' + o.id);
	                        });
	                    }
	                }
	            }

	            //Default columns resizer properties for grid layout
	            f.col_resizer_cols_headers_table = this.headTbl.getAttribute('id');
	            f.col_resizer_cols_headers_index = this.gridHeadRowIndex;
	            f.col_resizer_width_adjustment = 0;
	            f.col_enable_text_ellipsis = false;

	            //Cols generation for all browsers excepted IE<=7
	            this.tblHasColTag = _Dom.Dom.tag(tbl, 'col').length > 0 ? true : false;

	            //Col elements are enough to keep column widths after sorting and
	            //filtering
	            var createColTags = function createColTags(o) {
	                if (!o) {
	                    return;
	                }
	                for (var k = tf.nbCells - 1; k >= 0; k--) {
	                    var col = _Dom.Dom.create('col', ['id', tf.id + '_col_' + k]);
	                    tbl.firstChild.parentNode.insertBefore(col, tbl.firstChild);
	                    col.style.width = tf.colWidth[k];
	                    o.gridColElms[k] = col;
	                }
	                o.tblHasColTag = true;
	            };
	            if (!this.tblHasColTag) {
	                createColTags(this);
	            } else {
	                var cols = _Dom.Dom.tag(tbl, 'col');
	                for (var ii = 0; ii < tf.nbCells; ii++) {
	                    cols[ii].setAttribute('id', tf.id + '_col_' + ii);
	                    cols[ii].style.width = tf.colWidth[ii];
	                    o.gridColElms.push(cols[ii]);
	                }
	            }

	            var afterColResizedFn = _Types.Types.isFn(f.on_after_col_resized) ? f.on_after_col_resized : null;
	            f.on_after_col_resized = function (o, colIndex) {
	                if (!colIndex) {
	                    return;
	                }
	                var w = o.crWColsRow.cells[colIndex].style.width;
	                var col = o.gridColElms[colIndex];
	                col.style.width = w;

	                var thCW = o.crWColsRow.cells[colIndex].clientWidth;
	                var tdCW = o.crWRowDataTbl.cells[colIndex].clientWidth;

	                if (thCW != tdCW /*&& !Helpers.isIE()*/) {
	                    o.headTbl.style.width = tbl.clientWidth + 'px';
	                }

	                if (afterColResizedFn) {
	                    afterColResizedFn.call(null, o, colIndex);
	                }
	            };

	            if (tbl.clientWidth !== this.headTbl.clientWidth) {
	                tbl.style.width = this.headTbl.clientWidth + 'px';
	            }

	            // Re-adjust reference row
	            //tf.refRow = Helpers.isIE() ? (tf.refRow+1) : 0;
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
	            tbl = _Dom.Dom.id(tf.id);
	        }
	    }]);

	    return GridLayout;
	})();

	exports.GridLayout = GridLayout;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _Types = __webpack_require__(6);

	var global = window;

	/**
	 * Loading message/spinner
	 * @param {Object} tf TableFilter instance
	 */

	var Loader = (function () {
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
	        this.onShowLoader = _Types.Types.isFn(f.on_show_loader) ? f.on_show_loader : null;
	        //callback function after loader is closed
	        this.onHideLoader = _Types.Types.isFn(f.on_hide_loader) ? f.on_hide_loader : null;
	        //loader div
	        this.prfxLoader = 'load_';

	        this.tf = tf;

	        var containerDiv = _Dom.Dom.create('div', ['id', this.prfxLoader + tf.id]);
	        containerDiv.className = this.loaderCssClass;

	        var targetEl = !this.loaderTgtId ? tf.tbl.parentNode : _Dom.Dom.id(this.loaderTgtId);
	        if (!this.loaderTgtId) {
	            targetEl.insertBefore(containerDiv, tf.tbl);
	        } else {
	            targetEl.appendChild(containerDiv);
	        }
	        this.loaderDiv = _Dom.Dom.id(this.prfxLoader + tf.id);
	        if (!this.loaderHtml) {
	            this.loaderDiv.appendChild(_Dom.Dom.text(this.loaderText));
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
	        key: 'remove',
	        value: function remove() {
	            if (!this.loaderDiv) {
	                return;
	            }
	            var tf = this.tf,
	                targetEl = !this.loaderTgtId ? tf.gridLayout ? tf.Cpt.gridLayout.tblCont : tf.tbl.parentNode : _Dom.Dom.id(this.loaderTgtId);
	            targetEl.removeChild(this.loaderDiv);
	            this.loaderDiv = null;
	        }
	    }]);

	    return Loader;
	})();

	exports.Loader = Loader;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _Str = __webpack_require__(4);

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
	                var tempNodeVal = _Str.Str.lower(node.nodeValue);
	                var tempWordVal = _Str.Str.lower(word);
	                if (tempNodeVal.indexOf(tempWordVal) != -1) {
	                    var pn = node.parentNode;
	                    if (pn && pn.className != cssClass) {
	                        // word not highlighted yet
	                        var nv = node.nodeValue,
	                            ni = tempNodeVal.indexOf(tempWordVal),

	                        // Create a load of replacement nodes
	                        before = _Dom.Dom.text(nv.substr(0, ni)),
	                            docWordVal = nv.substr(ni, word.length),
	                            after = _Dom.Dom.text(nv.substr(ni + word.length)),
	                            hiwordtext = _Dom.Dom.text(docWordVal),
	                            hiword = _Dom.Dom.create('span');
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
	                var tempNodeVal = _Str.Str.lower(n.nodeValue),
	                    tempWordVal = _Str.Str.lower(word);
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Types = __webpack_require__(6);

	var _Dom = __webpack_require__(3);

	var _Event = __webpack_require__(2);

	var _Helpers = __webpack_require__(8);

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
	        this.onBeforePopUpOpen = _Types.Types.isFn(f.on_before_popup_filter_open) ? f.on_before_popup_filter_open : null;
	        //callback function after popup filtes is opened
	        this.onAfterPopUpOpen = _Types.Types.isFn(f.on_after_popup_filter_open) ? f.on_after_popup_filter_open : null;
	        //callback function before popup filtes is closed
	        this.onBeforePopUpClose = _Types.Types.isFn(f.on_before_popup_filter_close) ? f.on_before_popup_filter_close : null;
	        //callback function after popup filtes is closed
	        this.onAfterPopUpClose = _Types.Types.isFn(f.on_after_popup_filter_close) ? f.on_after_popup_filter_close : null;

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
	                if (_Helpers.Helpers.isIE()) {
	                    var headerLeft = _Dom.Dom.position(header).left;
	                    popUpDiv.style.left = headerLeft + 'px';
	                }
	                popUpDiv.style.width = parseInt(headerWidth, 10) + 'px';
	            }
	            _Event.Event.cancel(evt);
	            _Event.Event.stop(evt);
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
	                var popUpSpan = _Dom.Dom.create('span', ['id', this.prfxPopUpSpan + tf.id + '_' + i], ['ci', i]);
	                popUpSpan.innerHTML = this.popUpImgFltHtml;
	                var header = tf.getHeaderElement(i);
	                header.appendChild(popUpSpan);
	                _Event.Event.add(popUpSpan, 'click', function (evt) {
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
	            var popUpDiv = !div ? _Dom.Dom.create('div', ['id', this.prfxPopUpDiv + tf.id + '_' + colIndex]) : div;
	            popUpDiv.className = this.popUpDivCssClass;
	            tf.externalFltTgtIds.push(popUpDiv.id);
	            var header = tf.getHeaderElement(colIndex);
	            header.insertBefore(popUpDiv, header.firstChild);
	            _Event.Event.add(popUpDiv, 'click', function (evt) {
	                _Event.Event.stop(evt);
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
	            var activeImg = _Types.Types.isUndef(active) ? true : active;
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _array = __webpack_require__(7);

	var _Str = __webpack_require__(4);

	var _Sort = __webpack_require__(10);

	var Dropdown = (function () {

	    /**
	     * Dropdown UI component
	     * @param {Object} tf TableFilter instance
	     */

	    function Dropdown(tf) {
	        _classCallCheck(this, Dropdown);

	        // Configuration object
	        var f = tf.config();

	        this.enableSlcResetFilter = f.enable_slc_reset_filter ? false : true;
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
	         * @param  {Boolean} isRefreshed Enable linked refresh behaviour
	         * @param  {Boolean} isExternal Render in external container
	         * @param  {String}  extSlcId   External container id
	         */
	        value: function build(colIndex, isRefreshed, isExternal, extSlcId) {
	            var tf = this.tf;
	            tf.EvtManager(tf.Evt.name.dropdown, {
	                slcIndex: colIndex,
	                slcRefreshed: isRefreshed,
	                slcExternal: isExternal,
	                slcId: extSlcId
	            });
	        }
	    }, {
	        key: '_build',

	        /**
	         * Build drop-down filter UI
	         * @param  {Number}  colIndex    Column index
	         * @param  {Boolean} isRefreshed Enable linked refresh behaviour
	         * @param  {Boolean} isExternal  Render in external container
	         * @param  {String}  extSlcId    External container id
	         */
	        value: function _build(colIndex) {
	            var isRefreshed = arguments[1] === undefined ? false : arguments[1];
	            var isExternal = arguments[2] === undefined ? false : arguments[2];
	            var extSlcId = arguments[3] === undefined ? null : arguments[3];

	            var tf = this.tf;
	            colIndex = parseInt(colIndex, 10);

	            this.opts = [];
	            this.optsTxt = [];
	            this.slcInnerHtml = '';

	            var slcId = tf.fltIds[colIndex];
	            if (!_Dom.Dom.id(slcId) && !isExternal || !_Dom.Dom.id(extSlcId) && isExternal) {
	                return;
	            }
	            var slc = !isExternal ? _Dom.Dom.id(slcId) : _Dom.Dom.id(extSlcId),
	                rows = tf.tbl.rows,
	                matchCase = tf.matchCase,
	                fillMethod = _Str.Str.lower(this.slcFillingMethod);

	            //custom select test
	            this.isCustom = tf.hasCustomSlcOptions && _array.Arr.has(tf.customSlcOptions.cols, colIndex);

	            //custom selects text
	            var activeFlt;
	            if (isRefreshed && tf.activeFilterId) {
	                activeFlt = tf.activeFilterId.split('_')[0];
	                activeFlt = activeFlt.split(tf.prfxFlt)[1];
	            }

	            /*** remember grid values ***/
	            var fltsValues = [],
	                fltArr = [];
	            if (tf.rememberGridValues) {
	                fltsValues = tf.Cpt.store.getFilterValues(tf.fltsValuesCookie);
	                if (fltsValues && !_Str.Str.isEmpty(fltsValues.toString())) {
	                    if (this.isCustom) {
	                        fltArr.push(fltsValues[colIndex]);
	                    } else {
	                        fltArr = fltsValues[colIndex].split(' ' + tf.orOperator + ' ');
	                    }
	                }
	            }

	            var excludedOpts = null,
	                filteredDataCol = null;
	            if (isRefreshed && tf.disableExcludedOptions) {
	                excludedOpts = [];
	                filteredDataCol = [];
	            }

	            for (var k = tf.refRow; k < tf.nbRows; k++) {
	                // always visible rows don't need to appear on selects as always
	                // valid
	                if (tf.hasVisibleRows && _array.Arr.has(tf.visibleRows, k) && !tf.paging) {
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
	                    if (colIndex === j && (!isRefreshed || isRefreshed && tf.disableExcludedOptions) || colIndex == j && isRefreshed && (rows[k].style.display === '' && !tf.paging || tf.paging && (!tf.validRowsIndex || tf.validRowsIndex && _array.Arr.has(tf.validRowsIndex, k)) && (activeFlt === undefined || activeFlt == colIndex || activeFlt != colIndex && _array.Arr.has(tf.validRowsIndex, k)))) {
	                        var cell_data = tf.getCellData(j, cell[j]),

	                        //Vary Peter's patch
	                        cell_string = _Str.Str.matchCase(cell_data, matchCase);

	                        // checks if celldata is already in array
	                        if (!_array.Arr.has(this.opts, cell_string, matchCase)) {
	                            this.opts.push(cell_data);
	                        }

	                        if (isRefreshed && tf.disableExcludedOptions) {
	                            var filteredCol = filteredDataCol[j];
	                            if (!filteredCol) {
	                                filteredCol = this.GetFilteredDataCol(j);
	                            }
	                            if (!_array.Arr.has(filteredCol, cell_string, matchCase) && !_array.Arr.has(excludedOpts, cell_string, matchCase) && !this.isFirstLoad) {
	                                excludedOpts.push(cell_data);
	                            }
	                        }
	                    } //if colIndex==j
	                } //for j
	            } //for k

	            //Retrieves custom values
	            if (this.isCustom) {
	                var customValues = tf.__getCustomValues(colIndex);
	                this.opts = customValues[0];
	                this.optsTxt = customValues[1];
	            }

	            if (tf.sortSlc && !this.isCustom) {
	                if (!matchCase) {
	                    this.opts.sort(_Sort.Sort.ignoreCase);
	                    if (excludedOpts) {
	                        excludedOpts.sort(_Sort.Sort.ignoreCase);
	                    }
	                } else {
	                    this.opts.sort();
	                    if (excludedOpts) {
	                        excludedOpts.sort();
	                    }
	                }
	            }

	            //asc sort
	            if (tf.sortNumAsc && _array.Arr.has(tf.sortNumAsc, colIndex)) {
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
	            if (tf.sortNumDesc && _array.Arr.has(tf.sortNumDesc, colIndex)) {
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
	            this.addOptions(colIndex, slc, isRefreshed, excludedOpts, fltsValues, fltArr);
	        }
	    }, {
	        key: 'addOptions',

	        /**
	         * Add drop-down options
	         * @param {Number} colIndex     Column index
	         * @param {Object} slc          Select Dom element
	         * @param {Boolean} isRefreshed Enable linked refresh behaviour
	         * @param {Array} excludedOpts  Array of excluded options
	         * @param {Array} fltsValues    Collection of persisted filter values
	         * @param {Array} fltArr        Collection of persisted filter values
	         */
	        value: function addOptions(colIndex, slc, isRefreshed, excludedOpts, fltsValues, fltArr) {
	            var tf = this.tf,
	                fillMethod = _Str.Str.lower(this.slcFillingMethod),
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
	                if (isRefreshed && this.disableExcludedOptions && _array.Arr.has(excludedOpts, _Str.Str.matchCase(val, tf.matchCase), tf.matchCase)) {
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
	                        opt = _Dom.Dom.createOpt(lbl, val, true);
	                    } else {
	                        if (tf['col' + colIndex] !== tf.fltTypeMulti) {
	                            opt = _Dom.Dom.createOpt(lbl, val, fltsValues[colIndex] !== ' ' && val === fltsValues[colIndex] ? true : false);
	                        } else {
	                            opt = _Dom.Dom.createOpt(lbl, val, _array.Arr.has(fltArr, _Str.Str.matchCase(this.opts[y], tf.matchCase), tf.matchCase) || fltArr.toString().indexOf(val) !== -1 ? true : false);
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
	                fillMethod = _Str.Str.lower(this.slcFillingMethod);

	            if (fillMethod === 'innerhtml') {
	                this.slcInnerHtml += '<option value="">' + tf.displayAllText + '</option>';
	            } else {
	                var opt0 = _Dom.Dom.createOpt(!this.enableSlcResetFilter ? '' : tf.displayAllText, '');
	                if (!this.enableSlcResetFilter) {
	                    opt0.style.display = 'none';
	                }
	                slc.appendChild(opt0);
	                if (tf.enableEmptyOption) {
	                    var opt1 = _Dom.Dom.createOpt(tf.emptyText, tf.emOperator);
	                    slc.appendChild(opt1);
	                }
	                if (tf.enableNonEmptyOption) {
	                    var opt2 = _Dom.Dom.createOpt(tf.nonEmptyText, tf.nmOperator);
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _array = __webpack_require__(7);

	var _Str = __webpack_require__(4);

	var _Sort = __webpack_require__(10);

	var _Event = __webpack_require__(2);

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

	        this.tf = tf;
	    }

	    _createClass(CheckList, [{
	        key: 'onChange',

	        // TODO: move event here
	        value: function onChange(evt) {
	            this.tf.Evt.onSlcChange(evt);
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
	            if (!_Dom.Dom.id(divFltId) && !isExternal || !_Dom.Dom.id(extFltId) && isExternal) {
	                return;
	            }

	            var flt = !isExternal ? this.checkListDiv[colIndex] : _Dom.Dom.id(extFltId);
	            var ul = _Dom.Dom.create('ul', ['id', tf.fltIds[colIndex]], ['colIndex', colIndex]);
	            ul.className = this.checkListCssClass;
	            _Event.Event.add(ul, 'change', function (evt) {
	                _this.onChange(evt);
	            });

	            var rows = tf.tbl.rows;
	            this.isCustom = tf.hasCustomSlcOptions && _array.Arr.has(tf.customSlcOptions.cols, colIndex);

	            var activeFlt;
	            if (tf.refreshFilters && tf.activeFilterId) {
	                activeFlt = tf.activeFilterId.split('_')[0];
	                activeFlt = activeFlt.split(tf.prfxFlt)[1];
	            }

	            var excludedOpts,
	                filteredDataCol = [];
	            if (tf.refreshFilters && tf.disableExcludedOptions) {
	                excludedOpts = [];
	            }

	            for (var k = tf.refRow; k < tf.nbRows; k++) {
	                // always visible rows don't need to appear on selects as always
	                // valid
	                if (tf.hasVisibleRows && _array.Arr.has(tf.visibleRows, k) && !tf.paging) {
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
	                    if (colIndex === j && (!tf.refreshFilters || tf.refreshFilters && tf.disableExcludedOptions) || colIndex === j && tf.refreshFilters && (rows[k].style.display === '' && !tf.paging || tf.paging && (!activeFlt || activeFlt === colIndex || activeFlt != colIndex && _array.Arr.has(tf.validRowsIndex, k)))) {
	                        var cell_data = tf.getCellData(j, cells[j]);
	                        //Vary Peter's patch
	                        var cell_string = _Str.Str.matchCase(cell_data, tf.matchCase);
	                        // checks if celldata is already in array
	                        if (!_array.Arr.has(this.opts, cell_string, tf.matchCase)) {
	                            this.opts.push(cell_data);
	                        }
	                        var filteredCol = filteredDataCol[j];
	                        if (tf.refreshFilters && tf.disableExcludedOptions) {
	                            if (!filteredCol) {
	                                filteredDataCol[j] = tf.GetFilteredDataCol(j);
	                            }
	                            if (!_array.Arr.has(filteredCol, cell_string, tf.matchCase) && !_array.Arr.has(excludedOpts, cell_string, tf.matchCase) && !tf.isFirstLoad) {
	                                excludedOpts.push(cell_data);
	                            }
	                        }
	                    }
	                }
	            }

	            //Retrieves custom values
	            if (this.isCustom) {
	                var customValues = tf.__getCustomValues(colIndex);
	                this.opts = customValues[0];
	                this.optsTxt = customValues[1];
	            }

	            if (tf.sortSlc && !this.isCustom) {
	                if (!tf.matchCase) {
	                    this.opts.sort(_Sort.Sort.ignoreCase);
	                    if (excludedOpts) {
	                        excludedOpts.sort(_Sort.Sort.ignoreCase);
	                    }
	                } else {
	                    this.opts.sort();
	                    if (excludedOpts) {
	                        excludedOpts.sort();
	                    }
	                }
	            }
	            //asc sort
	            if (tf.sortNumAsc && _array.Arr.has(tf.sortNumAsc, colIndex)) {
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
	            if (tf.sortNumDesc && _array.Arr.has(tf.sortNumDesc, colIndex)) {
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
	         * @param {String} separator Data separator
	         */
	        value: function addChecks(colIndex, ul, separator) {
	            var _this2 = this;

	            var tf = this.tf;
	            var chkCt = this.addTChecks(colIndex, ul);
	            var flts_values = [],
	                fltArr = []; //remember grid values
	            var store = tf.Cpt.store;
	            var tmpVal = store ? store.getFilterValues(tf.fltsValuesCookie)[colIndex] : null;
	            if (tmpVal && _Str.Str.trim(tmpVal).length > 0) {
	                if (tf.hasCustomSlcOptions && _array.Arr.has(tf.customSlcOptions.cols, colIndex)) {
	                    fltArr.push(tmpVal);
	                } else {
	                    fltArr = tmpVal.split(' ' + tf.orOperator + ' ');
	                }
	            }

	            for (var y = 0; y < this.opts.length; y++) {
	                var val = this.opts[y]; //item value
	                var lbl = this.isCustom ? this.optsTxt[y] : val; //item text
	                var li = _Dom.Dom.createCheckItem(tf.fltIds[colIndex] + '_' + (y + chkCt), val, lbl);
	                li.className = this.checkListItemCssClass;
	                if (tf.refreshFilters && tf.disableExcludedOptions && _array.Arr.has(excludedOpts, _Str.Str.matchCase(val, tf.matchCase), tf.matchCase)) {
	                    _Dom.Dom.addClass(li, this.checkListItemDisabledCssClass);
	                    li.check.disabled = true;
	                    li.disabled = true;
	                } else {
	                    _Event.Event.add(li.check, 'click', function (evt) {
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
	                    if (tf.hasCustomSlcOptions && _array.Arr.has(tf.customSlcOptions.cols, colIndex) && fltArr.toString().indexOf(val) != -1 || _array.Arr.has(fltArr, _Str.Str.matchCase(val, tf.matchCase), tf.matchCase)) {
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
	            var li0 = _Dom.Dom.createCheckItem(tf.fltIds[colIndex] + '_0', '', tf.displayAllText);
	            li0.className = this.checkListItemCssClass;
	            ul.appendChild(li0);

	            _Event.Event.add(li0.check, 'click', function (evt) {
	                _this3.optionClick(evt);
	            });

	            if (!this.enableCheckListResetFilter) {
	                li0.style.display = 'none';
	            }

	            if (tf.enableEmptyOption) {
	                var li1 = _Dom.Dom.createCheckItem(tf.fltIds[colIndex] + '_1', tf.emOperator, tf.emptyText);
	                li1.className = this.checkListItemCssClass;
	                ul.appendChild(li1);
	                _Event.Event.add(li1.check, 'click', function (evt) {
	                    _this3.optionClick(evt);
	                });
	                chkCt++;
	            }

	            if (tf.enableNonEmptyOption) {
	                var li2 = _Dom.Dom.createCheckItem(tf.fltIds[colIndex] + '_2', tf.nmOperator, tf.nonEmptyText);
	                li2.className = this.checkListItemCssClass;
	                ul.appendChild(li2);
	                _Event.Event.add(li2.check, 'click', function (evt) {
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
	            while (_Str.Str.lower(n.nodeName) !== filterTag) {
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
	                            var cChk = _Dom.Dom.id(tf.fltIds[colIndex] + '_' + indSplit[u]);
	                            if (cChk) {
	                                cChk.checked = false;
	                                _Dom.Dom.removeClass(n.childNodes[indSplit[u]], this.checkListSlcItemCssClass);
	                            }
	                        }
	                    }
	                    n.setAttribute('value', '');
	                    n.setAttribute('indexes', '');
	                } else {
	                    fltValue = fltValue ? fltValue : '';
	                    chkValue = _Str.Str.trim(fltValue + ' ' + chkValue + ' ' + tf.orOperator);
	                    chkIndex = fltIndexes + chkIndex + tf.separator;
	                    n.setAttribute('value', chkValue);
	                    n.setAttribute('indexes', chkIndex);
	                    //1st option unchecked
	                    if (_Dom.Dom.id(tf.fltIds[colIndex] + '_0')) {
	                        _Dom.Dom.id(tf.fltIds[colIndex] + '_0').checked = false;
	                    }
	                }

	                if (_Str.Str.lower(li.nodeName) === itemTag) {
	                    _Dom.Dom.removeClass(n.childNodes[0], this.checkListSlcItemCssClass);
	                    _Dom.Dom.addClass(li, this.checkListSlcItemCssClass);
	                }
	            } else {
	                //removes values and indexes
	                if (chkValue !== '') {
	                    var replaceValue = new RegExp(_Str.Str.rgxEsc(chkValue + ' ' + tf.orOperator));
	                    fltValue = fltValue.replace(replaceValue, '');
	                    n.setAttribute('value', _Str.Str.trim(fltValue));

	                    var replaceIndex = new RegExp(_Str.Str.rgxEsc(chkIndex + tf.separator));
	                    fltIndexes = fltIndexes.replace(replaceIndex, '');
	                    n.setAttribute('indexes', fltIndexes);
	                }
	                if (_Str.Str.lower(li.nodeName) === itemTag) {
	                    _Dom.Dom.removeClass(li, this.checkListSlcItemCssClass);
	                }
	            }
	        }
	    }]);

	    return CheckList;
	})();

	exports.CheckList = CheckList;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _Types = __webpack_require__(6);

	var _Helpers = __webpack_require__(8);

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
	        this.onBeforeRefreshCounter = _Types.Types.isFn(f.on_before_refresh_counter) ? f.on_before_refresh_counter : null;
	        //callback raised after counter is refreshed
	        this.onAfterRefreshCounter = _Types.Types.isFn(f.on_after_refresh_counter) ? f.on_after_refresh_counter : null;

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
	            var countDiv = _Dom.Dom.create('div', ['id', this.prfxCounter + tf.id]);
	            countDiv.className = this.totRowsCssClass;
	            //rows counter label
	            var countSpan = _Dom.Dom.create('span', ['id', this.prfxTotRows + tf.id]);
	            var countText = _Dom.Dom.create('span', ['id', this.prfxTotRowsTxt + tf.id]);
	            countText.appendChild(_Dom.Dom.text(this.rowsCounterText));

	            // counter is added to defined element
	            if (!this.rowsCounterTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.rowsCounterTgtId ? tf.lDiv : _Dom.Dom.id(this.rowsCounterTgtId);

	            //IE only: clears all for sure
	            if (this.rowsCounterDiv && _Helpers.Helpers.isIE()) {
	                this.rowsCounterDiv.outerHTML = '';
	            }
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
	                    totTxt = tf.nbFilterableRows - tf.nbHiddenRows - (tf.hasVisibleRows ? tf.visibleRows.length : 0);
	                }
	            } else {
	                var paging = tf.Cpt.paging;
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
	            if (!tf.hasGrid()) {
	                return;
	            }
	            if (!this.rowsCounterSpan) {
	                return;
	            }

	            if (!this.rowsCounterTgtId && this.rowsCounterDiv) {
	                //IE only: clears all for sure
	                if (_Helpers.Helpers.isIE()) {
	                    this.rowsCounterDiv.outerHTML = '';
	                } else {
	                    this.rowsCounterDiv.parentNode.removeChild(this.rowsCounterDiv);
	                }
	            } else {
	                _Dom.Dom.id(this.rowsCounterTgtId).innerHTML = '';
	            }
	            this.rowsCounterSpan = null;
	            this.rowsCounterDiv = null;
	        }
	    }]);

	    return RowsCounter;
	})();

	exports.RowsCounter = RowsCounter;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _Event = __webpack_require__(2);

	var _Types = __webpack_require__(6);

	var _Helpers = __webpack_require__(8);

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
	        this.onBeforeShowMsg = _Types.Types.isFn(f.on_before_show_msg) ? f.on_before_show_msg : null;
	        //calls function after message is displayed
	        this.onAfterShowMsg = _Types.Types.isFn(f.on_after_show_msg) ? f.on_after_show_msg : null;

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
	            var statusDiv = _Dom.Dom.create('div', ['id', this.prfxStatus + tf.id]);
	            statusDiv.className = this.statusBarCssClass;

	            //status bar label
	            var statusSpan = _Dom.Dom.create('span', ['id', this.prfxStatusSpan + tf.id]);
	            //preceding text
	            var statusSpanText = _Dom.Dom.create('span', ['id', this.prfxStatusTxt + tf.id]);
	            statusSpanText.appendChild(_Dom.Dom.text(this.statusBarText));

	            // target element container
	            if (!this.statusBarTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.statusBarTgtId ? tf.lDiv : _Dom.Dom.id(this.statusBarTgtId);

	            // TODO: use alternative to outerHTML
	            if (this.statusBarDiv && _Helpers.Helpers.isIE()) {
	                this.statusBarDiv.outerHTML = '';
	            }

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _Types = __webpack_require__(6);

	var _Str = __webpack_require__(4);

	var _Helpers = __webpack_require__(8);

	var _Event = __webpack_require__(2);

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
	        this.hasResultsPerPage = _Types.Types.isArray(this.resultsPerPage);
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
	        this.onBeforeChangePage = _Types.Types.isFn(f.on_before_change_page) ? f.on_before_change_page : null;
	        //calls function before page is changed
	        this.onAfterChangePage = _Types.Types.isFn(f.on_after_change_page) ? f.on_after_change_page : null;

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
	                var key = _Event.Event.keyCode(e);
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

	            /*====================================================
	                - onchange event for paging select
	            =====================================================*/
	            evt.slcPagesChange = function (event) {
	                _this.changePage();
	                event.target.blur();
	            };

	            // Paging drop-down list selector
	            if (this.pageSelectorType === tf.fltTypeSlc) {
	                slcPages = _Dom.Dom.create(tf.fltTypeSlc, ['id', this.prfxSlcPages + tf.id]);
	                slcPages.className = this.pgSlcCssClass;
	                _Event.Event.add(slcPages, 'change', evt.slcPagesChange);
	            }

	            // Paging input selector
	            if (this.pageSelectorType === tf.fltTypeInp) {
	                slcPages = _Dom.Dom.create(tf.fltTypeInp, ['id', this.prfxSlcPages + tf.id], ['value', this.currentPageNb]);
	                slcPages.className = this.pgInpCssClass;
	                _Event.Event.add(slcPages, 'keypress', evt._detectKey);
	            }

	            // btns containers
	            var btnNextSpan = _Dom.Dom.create('span', ['id', this.prfxBtnNextSpan + tf.id]);
	            var btnPrevSpan = _Dom.Dom.create('span', ['id', this.prfxBtnPrevSpan + tf.id]);
	            var btnLastSpan = _Dom.Dom.create('span', ['id', this.prfxBtnLastSpan + tf.id]);
	            var btnFirstSpan = _Dom.Dom.create('span', ['id', this.prfxBtnFirstSpan + tf.id]);

	            if (this.hasPagingBtns) {
	                // Next button
	                if (!this.btnNextPageHtml) {
	                    var btn_next = _Dom.Dom.create(tf.fltTypeInp, ['id', this.prfxBtnNext + tf.id], ['type', 'button'], ['value', this.btnNextPageText], ['title', 'Next']);
	                    btn_next.className = this.btnPageCssClass;
	                    _Event.Event.add(btn_next, 'click', evt.next);
	                    btnNextSpan.appendChild(btn_next);
	                } else {
	                    btnNextSpan.innerHTML = this.btnNextPageHtml;
	                    _Event.Event.add(btnNextSpan, 'click', evt.next);
	                }
	                // Previous button
	                if (!this.btnPrevPageHtml) {
	                    var btn_prev = _Dom.Dom.create(tf.fltTypeInp, ['id', this.prfxBtnPrev + tf.id], ['type', 'button'], ['value', this.btnPrevPageText], ['title', 'Previous']);
	                    btn_prev.className = this.btnPageCssClass;
	                    _Event.Event.add(btn_prev, 'click', evt.prev);
	                    btnPrevSpan.appendChild(btn_prev);
	                } else {
	                    btnPrevSpan.innerHTML = this.btnPrevPageHtml;
	                    _Event.Event.add(btnPrevSpan, 'click', evt.prev);
	                }
	                // Last button
	                if (!this.btnLastPageHtml) {
	                    var btn_last = _Dom.Dom.create(tf.fltTypeInp, ['id', this.prfxBtnLast + tf.id], ['type', 'button'], ['value', this.btnLastPageText], ['title', 'Last']);
	                    btn_last.className = this.btnPageCssClass;
	                    _Event.Event.add(btn_last, 'click', evt.last);
	                    btnLastSpan.appendChild(btn_last);
	                } else {
	                    btnLastSpan.innerHTML = this.btnLastPageHtml;
	                    _Event.Event.add(btnLastSpan, 'click', evt.last);
	                }
	                // First button
	                if (!this.btnFirstPageHtml) {
	                    var btn_first = _Dom.Dom.create(tf.fltTypeInp, ['id', this.prfxBtnFirst + tf.id], ['type', 'button'], ['value', this.btnFirstPageText], ['title', 'First']);
	                    btn_first.className = this.btnPageCssClass;
	                    _Event.Event.add(btn_first, 'click', evt.first);
	                    btnFirstSpan.appendChild(btn_first);
	                } else {
	                    btnFirstSpan.innerHTML = this.btnFirstPageHtml;
	                    _Event.Event.add(btnFirstSpan, 'click', evt.first);
	                }
	            }

	            // paging elements (buttons+drop-down list) are added to defined element
	            if (!this.pagingTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.pagingTgtId ? tf.mDiv : _Dom.Dom.id(this.pagingTgtId);
	            targetEl.appendChild(btnFirstSpan);
	            targetEl.appendChild(btnPrevSpan);

	            var pgBeforeSpan = _Dom.Dom.create('span', ['id', this.prfxPgBeforeSpan + tf.id]);
	            pgBeforeSpan.appendChild(_Dom.Dom.text(this.pageText));
	            pgBeforeSpan.className = this.nbPgSpanCssClass;
	            targetEl.appendChild(pgBeforeSpan);
	            targetEl.appendChild(slcPages);
	            var pgAfterSpan = _Dom.Dom.create('span', ['id', this.prfxPgAfterSpan + tf.id]);
	            pgAfterSpan.appendChild(_Dom.Dom.text(this.ofText));
	            pgAfterSpan.className = this.nbPgSpanCssClass;
	            targetEl.appendChild(pgAfterSpan);
	            var pgspan = _Dom.Dom.create('span', ['id', this.prfxPgSpan + tf.id]);
	            pgspan.className = this.nbPgSpanCssClass;
	            pgspan.appendChild(_Dom.Dom.text(' ' + this.nbPages + ' '));
	            targetEl.appendChild(pgspan);
	            targetEl.appendChild(btnNextSpan);
	            targetEl.appendChild(btnLastSpan);
	            this.pagingSlc = _Dom.Dom.id(this.prfxSlcPages + tf.id);

	            // if this.rememberGridValues==true this.setPagingInfo() is called
	            // in ResetGridValues() method
	            if (!tf.rememberGridValues || this.isPagingRemoved) {
	                this.setPagingInfo();
	            }
	            if (!tf.fltGrid) {
	                tf.ValidateAllRows();
	                this.setPagingInfo(tf.validRowsIndex);
	            }

	            this.isPagingRemoved = false;
	        }
	    }, {
	        key: 'addPaging',

	        /**
	         * Add paging when filters are already instanciated
	         * @param {Boolean} filterTable Execute filtering once paging instanciated
	         */
	        value: function addPaging() {
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
	        value: function setPagingInfo(validRows) {
	            var tf = this.tf;
	            var rows = tf.tbl.rows;
	            var mdiv = !this.pagingTgtId ? tf.mDiv : _Dom.Dom.id(this.pagingTgtId);
	            var pgspan = _Dom.Dom.id(this.prfxPgSpan + tf.id);
	            //stores valid rows indexes
	            if (validRows && validRows.length > 0) {
	                tf.validRowsIndex = validRows;
	            } else {
	                //re-sets valid rows indexes array
	                tf.validRowsIndex = [];

	                //counts rows to be grouped
	                for (var j = tf.refRow; j < tf.nbRows; j++) {
	                    var row = rows[j];
	                    if (!row) {
	                        continue;
	                    }
	                    var isRowValid = row.getAttribute('validRow');
	                    if (isRowValid === 'true' || !isRowValid) {
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
	                        var currOpt = new Option(z + 1, z * this.pagingLength, false, false);
	                        this.pagingSlc.options[z] = currOpt;
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
	            var rows = tf.tbl.rows;
	            var paging_end_row = parseInt(this.startPagingRow, 10) + parseInt(this.pagingLength, 10);

	            //store valid rows indexes
	            if (validRows) {
	                tf.validRowsIndex = validRows;
	            }

	            //this loop shows valid rows of current page
	            for (var h = 0; h < tf.validRowsIndex.length; h++) {
	                var r = rows[tf.validRowsIndex[h]];
	                if (h >= this.startPagingRow && h < paging_end_row) {
	                    if (r.getAttribute('validRow') === 'true' || !r.getAttribute('validRow')) {
	                        r.style.display = '';
	                    }
	                    if (tf.alternateBgs && tf.Cpt.alternateRows) {
	                        tf.Cpt.alternateRows.setRowBg(tf.validRowsIndex[h], h);
	                    }
	                } else {
	                    r.style.display = 'none';
	                    if (tf.alternateBgs && tf.Cpt.alternateRows) {
	                        tf.Cpt.alternateRows.removeRowBg(tf.validRowsIndex[h]);
	                    }
	                }
	            }

	            tf.nbVisibleRows = tf.validRowsIndex.length;
	            tf.isStartBgAlternate = false;
	            //re-applies filter behaviours after filtering process
	            tf.applyGridProps();
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
	                switch (_Str.Str.lower(cmd)) {
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

	            /*====================================================
	                - onchange event for results per page select
	            =====================================================*/
	            evt.slcResultsChange = function (ev) {
	                _this2.changeResultsPerPage();
	                ev.target.blur();
	            };

	            var slcR = _Dom.Dom.create(tf.fltTypeSlc, ['id', this.prfxSlcResults + tf.id]);
	            slcR.className = tf.resultsSlcCssClass;
	            var slcRText = this.resultsPerPage[0],
	                slcROpts = this.resultsPerPage[1];
	            var slcRSpan = _Dom.Dom.create('span', ['id', this.prfxSlcResultsTxt + tf.id]);
	            slcRSpan.className = this.resultsSpanCssClass;

	            // results per page select is added to external element
	            if (!this.resultsPerPageTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.resultsPerPageTgtId ? tf.rDiv : _Dom.Dom.id(this.resultsPerPageTgtId);
	            slcRSpan.appendChild(_Dom.Dom.text(slcRText));
	            targetEl.appendChild(slcRSpan);
	            targetEl.appendChild(slcR);

	            this.resultsPerPageSlc = _Dom.Dom.id(this.prfxSlcResults + tf.id);

	            for (var r = 0; r < slcROpts.length; r++) {
	                var currOpt = new Option(slcROpts[r], slcROpts[r], false, false);
	                this.resultsPerPageSlc.options[r] = currOpt;
	            }
	            _Event.Event.add(slcR, 'change', evt.slcResultsChange);
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
	                slcRSpan = _Dom.Dom.id(this.prfxSlcResultsTxt + tf.id);
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
	                    tf.Cpt.store.savePageNb(tf.pgNbCookie);
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
	         * Change rows according to page results
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
	                    tf.Cpt.store.savePageLength(tf.pgLenCookie);
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
	            var pgnb = tf.Cpt.store.getPageNb(name);
	            if (pgnb !== '') {
	                this.changePage(pgnb - 1);
	            }
	        }
	    }, {
	        key: '_resetPageLength',

	        /**
	         * Re-set page length at page re-load
	         */
	        value: function _resetPageLength(name) {
	            var tf = this.tf;
	            if (!tf.paging) {
	                return;
	            }
	            var pglenIndex = tf.Cpt.store.getPageLength(name);

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
	            var btnNextSpan, btnPrevSpan, btnLastSpan, btnFirstSpan;
	            var pgBeforeSpan, pgAfterSpan, pgspan;
	            btnNextSpan = _Dom.Dom.id(this.prfxBtnNextSpan + tf.id);
	            btnPrevSpan = _Dom.Dom.id(this.prfxBtnPrevSpan + tf.id);
	            btnLastSpan = _Dom.Dom.id(this.prfxBtnLastSpan + tf.id);
	            btnFirstSpan = _Dom.Dom.id(this.prfxBtnFirstSpan + tf.id);
	            //span containing 'Page' text
	            pgBeforeSpan = _Dom.Dom.id(this.prfxPgBeforeSpan + tf.id);
	            //span containing 'of' text
	            pgAfterSpan = _Dom.Dom.id(this.prfxPgAfterSpan + tf.id);
	            //span containing nb of pages
	            pgspan = _Dom.Dom.id(this.prfxPgSpan + tf.id);

	            var evt = this.evt;

	            if (this.pagingSlc) {
	                if (this.pageSelectorType === tf.fltTypeSlc) {
	                    _Event.Event.remove(this.pagingSlc, 'change', evt.slcPagesChange);
	                } else if (this.pageSelectorType === tf.fltTypeInp) {
	                    _Event.Event.remove(this.pagingSlc, 'keypress', evt._detectKey);
	                }
	                this.pagingSlc.parentNode.removeChild(this.pagingSlc);
	            }

	            if (btnNextSpan) {
	                _Event.Event.remove(btnNextSpan, 'click', evt.next);
	                btnNextSpan.parentNode.removeChild(btnNextSpan);
	            }

	            if (btnPrevSpan) {
	                _Event.Event.remove(btnPrevSpan, 'click', evt.prev);
	                btnPrevSpan.parentNode.removeChild(btnPrevSpan);
	            }

	            if (btnLastSpan) {
	                _Event.Event.remove(btnLastSpan, 'click', evt.last);
	                btnLastSpan.parentNode.removeChild(btnLastSpan);
	            }

	            if (btnFirstSpan) {
	                _Event.Event.remove(btnFirstSpan, 'click', evt.first);
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _Event = __webpack_require__(2);

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

	            var resetspan = _Dom.Dom.create('span', ['id', this.prfxResetSpan + tf.id]);

	            // reset button is added to defined element
	            if (!this.btnResetTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.btnResetTgtId ? tf.rDiv : _Dom.Dom.id(this.btnResetTgtId);
	            targetEl.appendChild(resetspan);

	            if (!this.btnResetHtml) {
	                var fltreset = _Dom.Dom.create('a', ['href', 'javascript:void(0);']);
	                fltreset.className = tf.btnResetCssClass;
	                fltreset.appendChild(_Dom.Dom.text(this.btnResetText));
	                resetspan.appendChild(fltreset);
	                // fltreset.onclick = this.Evt._Clear;
	                _Event.Event.add(fltreset, 'click', function () {
	                    _this.onClick();
	                });
	            } else {
	                resetspan.innerHTML = this.btnResetHtml;
	                var resetEl = resetspan.firstChild;
	                // resetEl.onclick = this.Evt._Clear;
	                _Event.Event.add(resetEl, 'click', function () {
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

	            var resetspan = _Dom.Dom.id(tf.prfxResetSpan + tf.id);
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _Event = __webpack_require__(2);

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
	        this.helpInstrTgtId = f.help_instructions_target_id || null;
	        //id of custom container element for instructions
	        this.helpInstrContTgtId = f.help_instructions_container_target_id || null;
	        //defines help text
	        this.helpInstrText = f.help_instructions_text ? f.help_instructions_text : 'Use the filters above each column to filter and limit table ' + 'data. Avanced searches can be performed by using the following ' + 'operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, ' + '<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, ' + '<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, ' + '<b>rgx:</b><br/> These operators are described here:<br/>' + '<a href="http://tablefilter.free.fr/#operators" ' + 'target="_blank">http://tablefilter.free.fr/#operators</a><hr/>';
	        //defines help innerHtml
	        this.helpInstrHtml = f.help_instructions_html || null;
	        //defines reset button text
	        this.helpInstrBtnText = f.help_instructions_btn_text || '?';
	        //defines reset button innerHtml
	        this.helpInstrBtnHtml = f.help_instructions_btn_html || null;
	        //defines css class for help button
	        this.helpInstrBtnCssClass = f.help_instructions_btn_css_class || 'helpBtn';
	        //defines css class for help container
	        this.helpInstrContCssClass = f.help_instructions_container_css_class || 'helpCont';
	        //help button element
	        this.helpInstrBtnEl = null;
	        //help content div
	        this.helpInstrContEl = null;
	        this.helpInstrDefaultHtml = '<div class="helpFooter"><h4>HTML Table ' + 'Filter Generator v. ' + tf.version + '</h4>' + '<a href="http://tablefilter.free.fr" target="_blank">' + 'http://tablefilter.free.fr</a><br/>' + '<span>&copy;2009-' + tf.year + ' Max Guglielmi.</span>' + '<div align="center" style="margin-top:8px;">' + '<a href="javascript:void(0);">Close</a></div></div>';

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

	            if (this.helpInstrBtnEl) {
	                return;
	            }

	            var tf = this.tf;

	            var helpspan = _Dom.Dom.create('span', ['id', this.prfxHelpSpan + tf.id]);
	            var helpdiv = _Dom.Dom.create('div', ['id', this.prfxHelpDiv + tf.id]);

	            //help button is added to defined element
	            if (!this.helpInstrTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.helpInstrTgtId ? tf.rDiv : _Dom.Dom.id(this.helpInstrTgtId);
	            targetEl.appendChild(helpspan);

	            var divContainer = !this.helpInstrContTgtId ? helpspan : _Dom.Dom.id(this.helpInstrContTgtId);

	            if (!this.helpInstrBtnHtml) {
	                divContainer.appendChild(helpdiv);
	                var helplink = _Dom.Dom.create('a', ['href', 'javascript:void(0);']);
	                helplink.className = this.helpInstrBtnCssClass;
	                helplink.appendChild(_Dom.Dom.text(this.helpInstrBtnText));
	                helpspan.appendChild(helplink);
	                _Event.Event.add(helplink, 'click', function () {
	                    _this.toggle();
	                });
	            } else {
	                helpspan.innerHTML = this.helpInstrBtnHtml;
	                var helpEl = helpspan.firstChild;
	                _Event.Event.add(helpEl, 'click', function () {
	                    _this.toggle();
	                });
	                divContainer.appendChild(helpdiv);
	            }

	            if (!this.helpInstrHtml) {
	                helpdiv.innerHTML = this.helpInstrText;
	                helpdiv.className = this.helpInstrContCssClass;
	                _Event.Event.add(helpdiv, 'dblclick', function () {
	                    _this.toggle();
	                });
	            } else {
	                if (this.helpInstrContTgtId) {
	                    divContainer.appendChild(helpdiv);
	                }
	                helpdiv.innerHTML = this.helpInstrHtml;
	                if (!this.helpInstrContTgtId) {
	                    helpdiv.className = this.helpInstrContCssClass;
	                    _Event.Event.add(helpdiv, 'dblclick', function () {
	                        _this.toggle();
	                    });
	                }
	            }
	            helpdiv.innerHTML += this.helpInstrDefaultHtml;
	            _Event.Event.add(helpdiv, 'click', function () {
	                _this.toggle();
	            });

	            this.helpInstrContEl = helpdiv;
	            this.helpInstrBtnEl = helpspan;
	        }
	    }, {
	        key: 'toggle',

	        /**
	         * Toggle help pop-up
	         */
	        value: function toggle() {
	            if (!this.helpInstrContEl) {
	                return;
	            }
	            var divDisplay = this.helpInstrContEl.style.display;
	            if (divDisplay === '' || divDisplay === 'none') {
	                this.helpInstrContEl.style.display = 'block';
	                // TODO: use CSS instead for element positioning
	                var btnLeft = _Dom.Dom.position(this.helpInstrBtnEl).left;
	                if (!this.helpInstrContTgtId) {
	                    this.helpInstrContEl.style.left = btnLeft - this.helpInstrContEl.clientWidth + 25 + 'px';
	                }
	            } else {
	                this.helpInstrContEl.style.display = 'none';
	            }
	        }
	    }, {
	        key: 'destroy',

	        /**
	         * Remove help UI
	         */
	        value: function destroy() {
	            if (!this.helpInstrBtnEl) {
	                return;
	            }
	            this.helpInstrBtnEl.parentNode.removeChild(this.helpInstrBtnEl);
	            this.helpInstrBtnEl = null;
	            if (!this.helpInstrContEl) {
	                return;
	            }
	            this.helpInstrContEl.parentNode.removeChild(this.helpInstrContEl);
	            this.helpInstrContEl = null;
	        }
	    }]);

	    return Help;
	})();

	exports.Help = Help;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

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
	            if (!this.tf.hasGrid() && !this.tf.isFirstLoad) {
	                return;
	            }
	            var rows = this.tf.tbl.rows;
	            var noValidRowsIndex = this.tf.validRowsIndex === null;
	            //1st index
	            var beginIndex = noValidRowsIndex ? this.tf.refRow : 0;
	            // nb indexes
	            var indexLen = noValidRowsIndex ? this.tf.nbFilterableRows + beginIndex : this.tf.validRowsIndex.length;
	            var idx = 0;

	            //alternates bg color
	            for (var j = beginIndex; j < indexLen; j++) {
	                var rowIdx = noValidRowsIndex ? j : this.tf.validRowsIndex[j];
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
	            var i = !idx ? rowIdx : idx;
	            this.removeRowBg(rowIdx);
	            _Dom.Dom.addClass(rows[rowIdx], i % 2 ? this.evenCss : this.oddCss);
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
	            _Dom.Dom.removeClass(rows[idx], this.oddCss);
	            _Dom.Dom.removeClass(rows[idx], this.evenCss);
	        }
	    }, {
	        key: 'remove',

	        /**
	         * Removes all row background color
	         */
	        value: function remove() {
	            if (!this.tf.hasGrid()) {
	                return;
	            }
	            var row = this.tf.tbl.rows;
	            for (var i = this.tf.refRow; i < this.tf.nbRows; i++) {
	                this.removeRowBg(i);
	            }
	            this.tf.isStartBgAlternate = true;
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _Str = __webpack_require__(4);

	var _Types = __webpack_require__(6);

	var ColOps = (function () {

	    /**
	     * Column calculations
	     * @param {Object} tf TableFilter instance
	     */

	    function ColOps(tf) {
	        _classCallCheck(this, ColOps);

	        var f = tf.config();
	        this.colOperation = f.col_operation;

	        //calls function before col operation
	        this.onBeforeOperation = _Types.Types.isFn(f.on_before_operation) ? f.on_before_operation : null;
	        //calls function after col operation
	        this.onAfterOperation = _Types.Types.isFn(f.on_after_operation) ? f.on_after_operation : null;

	        this.tf = tf;
	    }

	    _createClass(ColOps, [{
	        key: 'calc',

	        /**
	         * Calculates columns' values
	         * Configuration options are stored in 'colOperation' property
	         * - 'id' contains ids of elements showing result (array)
	         * - 'col' contains the columns' indexes (array)
	         * - 'operation' contains operation type (array, values: 'sum', 'mean',
	         *   'min', 'max', 'median', 'q1', 'q3')
	         * - 'write_method' array defines which method to use for displaying the
	         *    result (innerHTML, setValue, createTextNode) - default: 'innerHTML'
	         * - 'tot_row_index' defines in which row results are displayed
	         *   (integers array)
	         *
	         * - changes made by Nuovella:
	         * (1) optimized the routine (now it will only process each column once),
	         * (2) added calculations for the median, lower and upper quartile.
	         */
	        value: function calc() {
	            if (!this.tf.isFirstLoad && !this.tf.hasGrid()) {
	                return;
	            }

	            if (this.onBeforeOperation) {
	                this.onBeforeOperation.call(null, this.tf);
	            }

	            var colOperation = this.colOperation,
	                labelId = colOperation.id,
	                colIndex = colOperation.col,
	                operation = colOperation.operation,
	                outputType = colOperation.write_method,
	                totRowIndex = colOperation.tot_row_index,
	                excludeRow = colOperation.exclude_row,
	                decimalPrecision = colOperation.decimal_precision !== undefined ? colOperation.decimal_precision : 2;

	            //nuovella: determine unique list of columns to operate on
	            var ucolIndex = [],
	                ucolMax = 0;
	            ucolIndex[ucolMax] = colIndex[0];

	            for (var ii = 1; ii < colIndex.length; ii++) {
	                var saved = 0;
	                //see if colIndex[ii] is already in the list of unique indexes
	                for (var jj = 0; jj <= ucolMax; jj++) {
	                    if (ucolIndex[jj] === colIndex[ii]) {
	                        saved = 1;
	                    }
	                }
	                //if not saved then, save the index;
	                if (saved === 0) {
	                    ucolMax++;
	                    ucolIndex[ucolMax] = colIndex[ii];
	                }
	            }

	            if (_Str.Str.lower(typeof labelId) == 'object' && _Str.Str.lower(typeof colIndex) == 'object' && _Str.Str.lower(typeof operation) == 'object') {
	                var row = this.tf.tbl.rows,
	                    colvalues = [];

	                for (var ucol = 0; ucol <= ucolMax; ucol++) {
	                    //this retrieves col values
	                    //use ucolIndex because we only want to pass through this loop
	                    //once for each column get the values in this unique column
	                    colvalues.push(this.tf.getColValues(ucolIndex[ucol], true, excludeRow));

	                    //next: calculate all operations for this column
	                    var result,
	                        nbvalues = 0,
	                        temp,
	                        meanValue = 0,
	                        sumValue = 0,
	                        minValue = null,
	                        maxValue = null,
	                        q1Value = null,
	                        medValue = null,
	                        q3Value = null,
	                        meanFlag = 0,
	                        sumFlag = 0,
	                        minFlag = 0,
	                        maxFlag = 0,
	                        q1Flag = 0,
	                        medFlag = 0,
	                        q3Flag = 0,
	                        theList = [],
	                        opsThisCol = [],
	                        decThisCol = [],
	                        labThisCol = [],
	                        oTypeThisCol = [],
	                        mThisCol = -1;

	                    for (var k = 0; k < colIndex.length; k++) {
	                        if (colIndex[k] === ucolIndex[ucol]) {
	                            mThisCol++;
	                            opsThisCol[mThisCol] = _Str.Str.lower(operation[k]);
	                            decThisCol[mThisCol] = decimalPrecision[k];
	                            labThisCol[mThisCol] = labelId[k];
	                            oTypeThisCol = outputType !== undefined && _Str.Str.lower(typeof outputType) === 'object' ? outputType[k] : null;

	                            switch (opsThisCol[mThisCol]) {
	                                case 'mean':
	                                    meanFlag = 1;
	                                    break;
	                                case 'sum':
	                                    sumFlag = 1;
	                                    break;
	                                case 'min':
	                                    minFlag = 1;
	                                    break;
	                                case 'max':
	                                    maxFlag = 1;
	                                    break;
	                                case 'median':
	                                    medFlag = 1;
	                                    break;
	                                case 'q1':
	                                    q1Flag = 1;
	                                    break;
	                                case 'q3':
	                                    q3Flag = 1;
	                                    break;
	                            }
	                        }
	                    }

	                    for (var j = 0; j < colvalues[ucol].length; j++) {
	                        //sort the list for calculation of median and quartiles
	                        if (q1Flag == 1 || q3Flag == 1 || medFlag == 1) {
	                            if (j < colvalues[ucol].length - 1) {
	                                for (k = j + 1; k < colvalues[ucol].length; k++) {
	                                    if (eval(colvalues[ucol][k]) < eval(colvalues[ucol][j])) {
	                                        temp = colvalues[ucol][j];
	                                        colvalues[ucol][j] = colvalues[ucol][k];
	                                        colvalues[ucol][k] = temp;
	                                    }
	                                }
	                            }
	                        }
	                        var cvalue = parseFloat(colvalues[ucol][j]);
	                        theList[j] = parseFloat(cvalue);

	                        if (!isNaN(cvalue)) {
	                            nbvalues++;
	                            if (sumFlag === 1 || meanFlag === 1) {
	                                sumValue += parseFloat(cvalue);
	                            }
	                            if (minFlag === 1) {
	                                if (minValue === null) {
	                                    minValue = parseFloat(cvalue);
	                                } else {
	                                    minValue = parseFloat(cvalue) < minValue ? parseFloat(cvalue) : minValue;
	                                }
	                            }
	                            if (maxFlag === 1) {
	                                if (maxValue === null) {
	                                    maxValue = parseFloat(cvalue);
	                                } else {
	                                    maxValue = parseFloat(cvalue) > maxValue ? parseFloat(cvalue) : maxValue;
	                                }
	                            }
	                        }
	                    } //for j
	                    if (meanFlag === 1) {
	                        meanValue = sumValue / nbvalues;
	                    }
	                    if (medFlag === 1) {
	                        var aux = 0;
	                        if (nbvalues % 2 === 1) {
	                            aux = Math.floor(nbvalues / 2);
	                            medValue = theList[aux];
	                        } else {
	                            medValue = (theList[nbvalues / 2] + theList[nbvalues / 2 - 1]) / 2;
	                        }
	                    }
	                    var posa;
	                    if (q1Flag === 1) {
	                        posa = 0;
	                        posa = Math.floor(nbvalues / 4);
	                        if (4 * posa == nbvalues) {
	                            q1Value = (theList[posa - 1] + theList[posa]) / 2;
	                        } else {
	                            q1Value = theList[posa];
	                        }
	                    }
	                    if (q3Flag === 1) {
	                        posa = 0;
	                        var posb = 0;
	                        posa = Math.floor(nbvalues / 4);
	                        if (4 * posa === nbvalues) {
	                            posb = 3 * posa;
	                            q3Value = (theList[posb] + theList[posb - 1]) / 2;
	                        } else {
	                            q3Value = theList[nbvalues - posa - 1];
	                        }
	                    }

	                    for (var i = 0; i <= mThisCol; i++) {
	                        switch (opsThisCol[i]) {
	                            case 'mean':
	                                result = meanValue;
	                                break;
	                            case 'sum':
	                                result = sumValue;
	                                break;
	                            case 'min':
	                                result = minValue;
	                                break;
	                            case 'max':
	                                result = maxValue;
	                                break;
	                            case 'median':
	                                result = medValue;
	                                break;
	                            case 'q1':
	                                result = q1Value;
	                                break;
	                            case 'q3':
	                                result = q3Value;
	                                break;
	                        }

	                        var precision = !isNaN(decThisCol[i]) ? decThisCol[i] : 2;

	                        //if outputType is defined
	                        if (oTypeThisCol && result) {
	                            result = result.toFixed(precision);

	                            if (_Dom.Dom.id(labThisCol[i])) {
	                                switch (_Str.Str.lower(oTypeThisCol)) {
	                                    case 'innerhtml':
	                                        if (isNaN(result) || !isFinite(result) || nbvalues === 0) {
	                                            _Dom.Dom.id(labThisCol[i]).innerHTML = '.';
	                                        } else {
	                                            _Dom.Dom.id(labThisCol[i]).innerHTML = result;
	                                        }
	                                        break;
	                                    case 'setvalue':
	                                        _Dom.Dom.id(labThisCol[i]).value = result;
	                                        break;
	                                    case 'createtextnode':
	                                        var oldnode = _Dom.Dom.id(labThisCol[i]).firstChild;
	                                        var txtnode = _Dom.Dom.text(result);
	                                        _Dom.Dom.id(labThisCol[i]).replaceChild(txtnode, oldnode);
	                                        break;
	                                } //switch
	                            }
	                        } else {
	                            try {
	                                if (isNaN(result) || !isFinite(result) || nbvalues === 0) {
	                                    _Dom.Dom.id(labThisCol[i]).innerHTML = '.';
	                                } else {
	                                    _Dom.Dom.id(labThisCol[i]).innerHTML = result.toFixed(precision);
	                                }
	                            } catch (e) {} //catch
	                        } //else
	                    } //for i

	                    // row(s) with result are always visible
	                    var totRow = totRowIndex && totRowIndex[ucol] ? row[totRowIndex[ucol]] : null;
	                    if (totRow) {
	                        totRow.style.display = '';
	                    }
	                } //for ucol
	            } //if typeof

	            if (this.onAfterOperation) {
	                this.onAfterOperation.call(null, this.tf);
	            }
	        }
	    }]);

	    return ColOps;
	})();

	exports.ColOps = ColOps;

/***/ }
/******/ ])
});
;