webpackJsonp([1],{

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./array": 6,
		"./array.js": 6,
		"./cookie": 4,
		"./cookie.js": 4,
		"./date": 7,
		"./date.js": 7,
		"./dom": 2,
		"./dom.js": 2,
		"./event": 1,
		"./event.js": 1,
		"./extensions/advancedGrid/adapterEzEditTable": 24,
		"./extensions/advancedGrid/adapterEzEditTable.js": 24,
		"./extensions/advancedGrid/advancedGrid": 25,
		"./extensions/advancedGrid/advancedGrid.js": 25,
		"./extensions/colOps/colOps": 26,
		"./extensions/colOps/colOps.js": 26,
		"./extensions/colsVisibility/colsVisibility": 27,
		"./extensions/colsVisibility/colsVisibility.js": 27,
		"./extensions/filtersVisibility/filtersVisibility": 28,
		"./extensions/filtersVisibility/filtersVisibility.js": 28,
		"./extensions/sort/adapterSortabletable": 29,
		"./extensions/sort/adapterSortabletable.js": 29,
		"./extensions/sort/sort": 30,
		"./extensions/sort/sort.js": 30,
		"./helpers": 8,
		"./helpers.js": 8,
		"./modules/alternateRows": 22,
		"./modules/alternateRows.js": 22,
		"./modules/checkList": 16,
		"./modules/checkList.js": 16,
		"./modules/clearButton": 20,
		"./modules/clearButton.js": 20,
		"./modules/dropdown": 14,
		"./modules/dropdown.js": 14,
		"./modules/gridLayout": 10,
		"./modules/gridLayout.js": 10,
		"./modules/help": 21,
		"./modules/help.js": 21,
		"./modules/highlightKeywords": 12,
		"./modules/highlightKeywords.js": 12,
		"./modules/loader": 11,
		"./modules/loader.js": 11,
		"./modules/paging": 19,
		"./modules/paging.js": 19,
		"./modules/popupFilter": 13,
		"./modules/popupFilter.js": 13,
		"./modules/rowsCounter": 17,
		"./modules/rowsCounter.js": 17,
		"./modules/statusBar": 18,
		"./modules/statusBar.js": 18,
		"./modules/store": 9,
		"./modules/store.js": 9,
		"./sort": 15,
		"./sort.js": 15,
		"./string": 3,
		"./string.js": 3,
		"./types": 5,
		"./types.js": 5
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 23;


/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _dom = __webpack_require__(2);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var AdapterEzEditTable = (function () {
	    /**
	     * Adapter module for ezEditTable, an external library providing advanced
	     * grid features (selection and edition):
	     * http://codecanyon.net/item/ezedittable-enhance-html-tables/2425123?ref=koalyptus
	     *
	     * @param {Object} tf TableFilter instance
	     */
	
	    function AdapterEzEditTable(tf, cfg) {
	        _classCallCheck(this, AdapterEzEditTable);
	
	        // ezEditTable config
	        this.initialized = false;
	        this.desc = cfg.description || 'ezEditTable adapter';
	        this.filename = cfg.filename || 'ezEditTable.js';
	        this.vendorPath = cfg.vendor_path;
	        this.loadStylesheet = Boolean(cfg.load_stylesheet);
	        this.stylesheet = cfg.stylesheet || this.vendorPath + 'ezEditTable.css';
	        this.stylesheetName = cfg.stylesheet_name || 'ezEditTableCss';
	        this.err = 'Failed to instantiate EditTable object.\n"ezEditTable" ' + 'dependency not found.';
	        // Enable the ezEditTable's scroll into view behaviour if grid layout on
	        cfg.scroll_into_view = cfg.scroll_into_view === false ? false : tf.gridLayout;
	
	        this._ezEditTable = null;
	        this.cfg = cfg;
	        this.tf = tf;
	    }
	
	    /**
	     * Conditionally load ezEditTable library and set advanced grid
	     * @return {[type]} [description]
	     */
	
	    _createClass(AdapterEzEditTable, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;
	
	            var tf = this.tf;
	            if (window.EditTable) {
	                this._setAdvancedGrid();
	            } else {
	                var path = this.vendorPath + this.filename;
	                tf['import'](this.filename, path, function () {
	                    _this._setAdvancedGrid();
	                });
	            }
	            if (this.loadStylesheet && !tf.isImported(this.stylesheet, 'link')) {
	                tf['import'](this.stylesheetName, this.stylesheet, null, 'link');
	            }
	        }
	
	        /**
	         * Instantiate ezEditTable component for advanced grid features
	         */
	    }, {
	        key: '_setAdvancedGrid',
	        value: function _setAdvancedGrid() {
	            var tf = this.tf;
	
	            //start row for EditTable constructor needs to be calculated
	            var startRow,
	                cfg = this.cfg,
	                thead = _dom2['default'].tag(tf.tbl, 'thead');
	
	            //if thead exists and startRow not specified, startRow is calculated
	            //automatically by EditTable
	            if (thead.length > 0 && !cfg.startRow) {
	                startRow = undefined;
	            }
	            //otherwise startRow config property if any or TableFilter refRow
	            else {
	                    startRow = cfg.startRow || tf.refRow;
	                }
	
	            cfg.base_path = cfg.base_path || tf.basePath + 'ezEditTable/';
	            var editable = cfg.editable;
	            var selectable = cfg.selection;
	
	            if (selectable) {
	                cfg.default_selection = cfg.default_selection || 'row';
	            }
	            //CSS Styles
	            cfg.active_cell_css = cfg.active_cell_css || 'ezETSelectedCell';
	
	            var _lastValidRowIndex = 0;
	            var _lastRowIndex = 0;
	
	            if (selectable) {
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
	                                row = tf.tbl.rows[nextRowIndex];
	                            if (et.defaultSelection === 'both') {
	                                slc.SelectRowByIndex(nextRowIndex);
	                            }
	                            if (row) {
	                                slc.SelectCell(row.cells[cellIndex]);
	                            }
	                        }
	                        //Table is filtered
	                        if (tf.validRowsIndex.length !== tf.getRowsNb()) {
	                            var r = tf.tbl.rows[nextRowIndex];
	                            if (r) {
	                                r.scrollIntoView(false);
	                            }
	                            if (cell) {
	                                if (cell.cellIndex === tf.getCellsNb() - 1 && tf.gridLayout) {
	                                    tf.tblCont.scrollLeft = 100000000;
	                                } else if (cell.cellIndex === 0 && tf.gridLayout) {
	                                    tf.tblCont.scrollLeft = 0;
	                                } else {
	                                    cell.scrollIntoView(false);
	                                }
	                            }
	                        }
	                    };
	
	                    //table is not filtered
	                    if (!tf.validRowsIndex) {
	                        return;
	                    }
	                    var validIndexes = tf.validRowsIndex,
	                        validIdxLen = validIndexes.length,
	                        row = et.defaultSelection !== 'row' ? selectedElm.parentNode : selectedElm,
	
	                    //cell for default_selection = 'both' or 'cell'
	                    cell = selectedElm.nodeName === 'TD' ? selectedElm : null,
	                        keyCode = e !== undefined ? et.Event.GetKey(e) : 0,
	                        isRowValid = validIndexes.indexOf(row.rowIndex) !== -1,
	                        nextRowIndex,
	                        paging = tf.feature('paging'),
	
	                    //pgup/pgdown keys
	                    d = keyCode === 34 || keyCode === 33 ? paging && paging.pagingLength || et.nbRowsPerPage : 1;
	
	                    //If next row is not valid, next valid filtered row needs to be
	                    //calculated
	                    if (!isRowValid) {
	                        //Selection direction up/down
	                        if (row.rowIndex > _lastRowIndex) {
	                            //last row
	                            if (row.rowIndex >= validIndexes[validIdxLen - 1]) {
	                                nextRowIndex = validIndexes[validIdxLen - 1];
	                            } else {
	                                var calcRowIndex = _lastValidRowIndex + d;
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
	                                var v = validIndexes[_lastValidRowIndex - d];
	                                nextRowIndex = v ? v : validIndexes[0];
	                            }
	                        }
	                        _lastRowIndex = row.rowIndex;
	                        doSelect(nextRowIndex);
	                    } else {
	                        //If filtered row is valid, special calculation for
	                        //pgup/pgdown keys
	                        if (keyCode !== 34 && keyCode !== 33) {
	                            _lastValidRowIndex = validIndexes.indexOf(row.rowIndex);
	                            _lastRowIndex = row.rowIndex;
	                        } else {
	                            if (keyCode === 34) {
	                                //pgdown
	                                //last row
	                                if (_lastValidRowIndex + d <= validIdxLen - 1) {
	                                    nextRowIndex = validIndexes[_lastValidRowIndex + d];
	                                } else {
	                                    nextRowIndex = [validIdxLen - 1];
	                                }
	                            } else {
	                                //pgup
	                                //first row
	                                if (_lastValidRowIndex - d <= validIndexes[0]) {
	                                    nextRowIndex = validIndexes[0];
	                                } else {
	                                    nextRowIndex = validIndexes[_lastValidRowIndex - d];
	                                }
	                            }
	                            _lastRowIndex = nextRowIndex;
	                            _lastValidRowIndex = validIndexes.indexOf(nextRowIndex);
	                            doSelect(nextRowIndex);
	                        }
	                    }
	                };
	
	                //Page navigation has to be enforced whenever selected row is out of
	                //the current page range
	                var onBeforeSelection = function onBeforeSelection(et, selectedElm) {
	                    var row = et.defaultSelection !== 'row' ? selectedElm.parentNode : selectedElm;
	                    if (tf.paging) {
	                        if (tf.feature('paging').nbPages > 1) {
	                            var paging = tf.feature('paging');
	                            //page length is re-assigned in case it has changed
	                            et.nbRowsPerPage = paging.pagingLength;
	                            var validIndexes = tf.validRowsIndex,
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
	                if (tf.paging) {
	                    tf.feature('paging').onAfterChangePage = function (paging) {
	                        var advGrid = paging.tf.extension('advancedGrid');
	                        var et = advGrid._ezEditTable;
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
	                if (cfg.default_selection === 'row') {
	                    var fnB = cfg.on_before_selected_row;
	                    cfg.on_before_selected_row = function () {
	                        onBeforeSelection(arguments[0], arguments[1], arguments[2]);
	                        if (fnB) {
	                            fnB.call(null, arguments[0], arguments[1], arguments[2]);
	                        }
	                    };
	                    var fnA = cfg.on_after_selected_row;
	                    cfg.on_after_selected_row = function () {
	                        onAfterSelection(arguments[0], arguments[1], arguments[2]);
	                        if (fnA) {
	                            fnA.call(null, arguments[0], arguments[1], arguments[2]);
	                        }
	                    };
	                } else {
	                    var fnD = cfg.on_before_selected_cell;
	                    cfg.on_before_selected_cell = function () {
	                        onBeforeSelection(arguments[0], arguments[1], arguments[2]);
	                        if (fnD) {
	                            fnD.call(null, arguments[0], arguments[1], arguments[2]);
	                        }
	                    };
	                    var fnC = cfg.on_after_selected_cell;
	                    cfg.on_after_selected_cell = function () {
	                        onAfterSelection(arguments[0], arguments[1], arguments[2]);
	                        if (fnC) {
	                            fnC.call(null, arguments[0], arguments[1], arguments[2]);
	                        }
	                    };
	                }
	            }
	            if (editable) {
	                //Added or removed rows, TF rows number needs to be re-calculated
	                var fnE = cfg.on_added_dom_row;
	                cfg.on_added_dom_row = function () {
	                    tf.nbFilterableRows++;
	                    if (!tf.paging) {
	                        tf.feature('rowsCounter').refresh();
	                    } else {
	                        tf.nbRows++;
	                        tf.nbVisibleRows++;
	                        tf.nbFilterableRows++;
	                        tf.paging = false;
	                        tf.feature('paging').destroy();
	                        tf.feature('paging').reset();
	                    }
	                    if (tf.alternateBgs) {
	                        tf.feature('alternateRows').init();
	                    }
	                    if (fnE) {
	                        fnE.call(null, arguments[0], arguments[1], arguments[2]);
	                    }
	                };
	                if (cfg.actions && cfg.actions['delete']) {
	                    var fnF = cfg.actions['delete'].on_after_submit;
	                    cfg.actions['delete'].on_after_submit = function () {
	                        tf.nbFilterableRows--;
	                        if (!tf.paging) {
	                            tf.feature('rowsCounter').refresh();
	                        } else {
	                            tf.nbRows--;
	                            tf.nbVisibleRows--;
	                            tf.nbFilterableRows--;
	                            tf.paging = false;
	                            tf.feature('paging').destroy();
	                            tf.feature('paging').reset(false);
	                        }
	                        if (tf.alternateBgs) {
	                            tf.feature('alternateRows').init();
	                        }
	                        if (fnF) {
	                            fnF.call(null, arguments[0], arguments[1]);
	                        }
	                    };
	                }
	            }
	
	            try {
	                this._ezEditTable = new EditTable(tf.id, cfg, startRow);
	                this._ezEditTable.Init();
	            } catch (e) {
	                throw new Error(this.err);
	            }
	
	            this.initialized = true;
	        }
	
	        /**
	         * Reset advanced grid when previously removed
	         */
	    }, {
	        key: 'reset',
	        value: function reset() {
	            var ezEditTable = this._ezEditTable;
	            if (ezEditTable) {
	                if (this.cfg.selection) {
	                    ezEditTable.Selection.Set();
	                }
	                if (this.cfg.editable) {
	                    ezEditTable.Editable.Set();
	                }
	            }
	        }
	
	        /**
	         * Remove advanced grid
	         */
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var ezEditTable = this._ezEditTable;
	            if (ezEditTable) {
	                if (this.cfg.selection) {
	                    ezEditTable.Selection.ClearSelections();
	                    ezEditTable.Selection.Remove();
	                }
	                if (this.cfg.editable) {
	                    ezEditTable.Editable.Remove();
	                }
	            }
	            this.initialized = false;
	        }
	    }]);
	
	    return AdapterEzEditTable;
	})();
	
	exports['default'] = AdapterEzEditTable;
	module.exports = exports['default'];

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _adapterEzEditTable = __webpack_require__(24);
	
	var _adapterEzEditTable2 = _interopRequireDefault(_adapterEzEditTable);

	exports['default'] = _adapterEzEditTable2['default'];
	module.exports = exports['default'];

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _dom = __webpack_require__(2);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _string = __webpack_require__(3);
	
	var _string2 = _interopRequireDefault(_string);
	
	var _types = __webpack_require__(5);
	
	var _types2 = _interopRequireDefault(_types);
	
	var ColOps = (function () {
	
	    /**
	     * Column calculations
	     * @param {Object} tf TableFilter instance
	     */
	
	    function ColOps(tf, opts) {
	        _classCallCheck(this, ColOps);
	
	        //calls function before col operation
	        this.onBeforeOperation = _types2['default'].isFn(opts.on_before_operation) ? opts.on_before_operation : null;
	        //calls function after col operation
	        this.onAfterOperation = _types2['default'].isFn(opts.on_after_operation) ? opts.on_after_operation : null;
	
	        this.opts = opts;
	        this.tf = tf;
	    }
	
	    _createClass(ColOps, [{
	        key: 'init',
	        value: function init() {
	            this.calc();
	        }
	
	        /**
	         * Calculates columns' values
	         * Configuration options are stored in 'opts' property
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
	    }, {
	        key: 'calc',
	        value: function calc() {
	            var tf = this.tf;
	            if (!tf.isFirstLoad && !tf.hasGrid()) {
	                return;
	            }
	
	            if (this.onBeforeOperation) {
	                this.onBeforeOperation.call(null, tf);
	            }
	
	            var opts = this.opts,
	                labelId = opts.id,
	                colIndex = opts.col,
	                operation = opts.operation,
	                outputType = opts.write_method,
	                totRowIndex = opts.tot_row_index,
	                excludeRow = opts.exclude_row,
	                decimalPrecision = _types2['default'].isUndef(opts.decimal_precision) ? 2 : opts.decimal_precision;
	
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
	
	            if (_string2['default'].lower(typeof labelId) == 'object' && _string2['default'].lower(typeof colIndex) == 'object' && _string2['default'].lower(typeof operation) == 'object') {
	                var rows = tf.tbl.rows,
	                    colvalues = [];
	
	                for (var ucol = 0; ucol <= ucolMax; ucol++) {
	                    //this retrieves col values
	                    //use ucolIndex because we only want to pass through this loop
	                    //once for each column get the values in this unique column
	                    colvalues.push(tf.getColValues(ucolIndex[ucol], true, excludeRow));
	
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
	                            opsThisCol[mThisCol] = _string2['default'].lower(operation[k]);
	                            decThisCol[mThisCol] = decimalPrecision[k];
	                            labThisCol[mThisCol] = labelId[k];
	                            oTypeThisCol = outputType !== undefined && _string2['default'].lower(typeof outputType) === 'object' ? outputType[k] : null;
	
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
	                        posa = 0.0;
	                        posa = Math.floor(nbvalues / 4);
	                        if (4 * posa == nbvalues) {
	                            q1Value = (theList[posa - 1] + theList[posa]) / 2;
	                        } else {
	                            q1Value = theList[posa];
	                        }
	                    }
	                    if (q3Flag === 1) {
	                        posa = 0.0;
	                        var posb = 0.0;
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
	
	                            if (_dom2['default'].id(labThisCol[i])) {
	                                switch (_string2['default'].lower(oTypeThisCol)) {
	                                    case 'innerhtml':
	                                        if (isNaN(result) || !isFinite(result) || nbvalues === 0) {
	                                            _dom2['default'].id(labThisCol[i]).innerHTML = '.';
	                                        } else {
	                                            _dom2['default'].id(labThisCol[i]).innerHTML = result;
	                                        }
	                                        break;
	                                    case 'setvalue':
	                                        _dom2['default'].id(labThisCol[i]).value = result;
	                                        break;
	                                    case 'createtextnode':
	                                        var oldnode = _dom2['default'].id(labThisCol[i]).firstChild;
	                                        var txtnode = _dom2['default'].text(result);
	                                        _dom2['default'].id(labThisCol[i]).replaceChild(txtnode, oldnode);
	                                        break;
	                                } //switch
	                            }
	                        } else {
	                                try {
	                                    if (isNaN(result) || !isFinite(result) || nbvalues === 0) {
	                                        _dom2['default'].id(labThisCol[i]).innerHTML = '.';
	                                    } else {
	                                        _dom2['default'].id(labThisCol[i]).innerHTML = result.toFixed(precision);
	                                    }
	                                } catch (e) {} //catch
	                            } //else
	                    } //for i
	
	                    // row(s) with result are always visible
	                    var totRow = totRowIndex && totRowIndex[ucol] ? rows[totRowIndex[ucol]] : null;
	                    if (totRow) {
	                        totRow.style.display = '';
	                    }
	                } //for ucol
	            } //if typeof
	
	            if (this.onAfterOperation) {
	                this.onAfterOperation.call(null, tf);
	            }
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {}
	    }]);
	
	    return ColOps;
	})();
	
	exports['default'] = ColOps;
	module.exports = exports['default'];

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _dom = __webpack_require__(2);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _types = __webpack_require__(5);
	
	var _types2 = _interopRequireDefault(_types);
	
	var _event = __webpack_require__(1);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _array = __webpack_require__(6);
	
	var _array2 = _interopRequireDefault(_array);
	
	var ColsVisibility = (function () {
	
	    /**
	     * Columns Visibility extension
	     * @param {Object} tf TableFilter instance
	     * @param {Object} f Config
	     */
	
	    function ColsVisibility(tf, f) {
	        _classCallCheck(this, ColsVisibility);
	
	        // Configuration object
	        var cfg = tf.config();
	
	        this.initialized = false;
	        this.name = f.name;
	        this.desc = f.description || 'Columns visibility manager';
	
	        //show/hide cols span element
	        this.spanEl = null;
	        //show/hide cols button element
	        this.btnEl = null;
	        //show/hide cols container div element
	        this.contEl = null;
	
	        //tick to hide or show column
	        this.tickToHide = f.tick_to_hide === false ? false : true;
	        //enables/disables cols manager generation
	        this.manager = f.manager === false ? false : true;
	        //only if external headers
	        this.headersTbl = f.headers_table || false;
	        //only if external headers
	        this.headersIndex = f.headers_index || 1;
	        //id of container element
	        this.contElTgtId = f.container_target_id || null;
	        //alternative headers text
	        this.headersText = f.headers_text || null;
	        //id of button container element
	        this.btnTgtId = f.btn_target_id || null;
	        //defines show/hide cols text
	        this.btnText = f.btn_text || 'Columns&#9660;';
	        //defines show/hide cols button innerHtml
	        this.btnHtml = f.btn_html || null;
	        //defines css class for show/hide cols button
	        this.btnCssClass = f.btn_css_class || 'colVis';
	        //defines close link text
	        this.btnCloseText = f.btn_close_text || 'Close';
	        //defines close button innerHtml
	        this.btnCloseHtml = f.btn_close_html || null;
	        //defines css class for close button
	        this.btnCloseCssClass = f.btn_close_css_class || this.btnCssClass;
	        this.stylesheet = f.stylesheet || 'colsVisibility.css';
	        //span containing show/hide cols button
	        this.prfx = 'colVis_';
	        //defines css class span containing show/hide cols
	        this.spanCssClass = f.span_css_class || 'colVisSpan';
	        this.prfxCont = this.prfx + 'Cont_';
	        //defines css class div containing show/hide cols
	        this.contCssClass = f.cont_css_class || 'colVisCont';
	        //defines css class for cols list (ul)
	        this.listCssClass = cfg.list_css_class || 'cols_checklist';
	        //defines css class for list item (li)
	        this.listItemCssClass = cfg.checklist_item_css_class || 'cols_checklist_item';
	        //defines css class for selected list item (li)
	        this.listSlcItemCssClass = cfg.checklist_selected_item_css_class || 'cols_checklist_slc_item';
	        //text preceding columns list
	        this.text = f.text || (this.tickToHide ? 'Hide: ' : 'Show: ');
	        this.atStart = f.at_start || null;
	        this.enableHover = Boolean(f.enable_hover);
	        //enables select all option
	        this.enableTickAll = Boolean(f.enable_tick_all);
	        //text preceding columns list
	        this.tickAllText = f.tick_all_text || 'Select all:';
	
	        //array containing hidden columns indexes
	        this.hiddenCols = [];
	        this.tblHasColTag = _dom2['default'].tag(tf.tbl, 'col').length > 0;
	
	        //callback invoked just after cols manager is loaded
	        this.onLoaded = _types2['default'].isFn(f.on_loaded) ? f.on_loaded : null;
	        //calls function before cols manager is opened
	        this.onBeforeOpen = _types2['default'].isFn(f.on_before_open) ? f.on_before_open : null;
	        //calls function after cols manager is opened
	        this.onAfterOpen = _types2['default'].isFn(f.on_after_open) ? f.on_after_open : null;
	        //calls function before cols manager is closed
	        this.onBeforeClose = _types2['default'].isFn(f.on_before_close) ? f.on_before_close : null;
	        //calls function after cols manager is closed
	        this.onAfterClose = _types2['default'].isFn(f.on_after_close) ? f.on_after_close : null;
	
	        //callback before col is hidden
	        this.onBeforeColHidden = _types2['default'].isFn(f.on_before_col_hidden) ? f.on_before_col_hidden : null;
	        //callback after col is hidden
	        this.onAfterColHidden = _types2['default'].isFn(f.on_after_col_hidden) ? f.on_after_col_hidden : null;
	        //callback before col is displayed
	        this.onBeforeColDisplayed = _types2['default'].isFn(f.on_before_col_displayed) ? f.on_before_col_displayed : null;
	        //callback after col is displayed
	        this.onAfterColDisplayed = _types2['default'].isFn(f.on_after_col_displayed) ? f.on_after_col_displayed : null;
	
	        //Grid layout compatibility
	        if (tf.gridLayout) {
	            this.headersTbl = tf.feature('gridLayout').headTbl; //headers table
	            this.headersIndex = 0; //headers index
	            this.onAfterColDisplayed = function () {};
	            this.onAfterColHidden = function () {};
	        }
	
	        //Loads extension stylesheet
	        tf['import'](f.name + 'Style', tf.stylePath + this.stylesheet, null, 'link');
	
	        this.tf = tf;
	    }
	
	    _createClass(ColsVisibility, [{
	        key: 'toggle',
	        value: function toggle() {
	            var contDisplay = this.contEl.style.display;
	            var onBeforeOpen = this.onBeforeOpen;
	            var onBeforeClose = this.onBeforeClose;
	            var onAfterOpen = this.onAfterOpen;
	            var onAfterClose = this.onAfterClose;
	
	            if (onBeforeOpen && contDisplay !== 'inline') {
	                onBeforeOpen.call(null, this);
	            }
	            if (onBeforeClose && contDisplay === 'inline') {
	                onBeforeClose.call(null, this);
	            }
	
	            this.contEl.style.display = contDisplay === 'inline' ? 'none' : 'inline';
	
	            if (onAfterOpen && contDisplay !== 'inline') {
	                onAfterOpen.call(null, this);
	            }
	            if (onAfterClose && contDisplay === 'inline') {
	                onAfterClose.call(null, this);
	            }
	        }
	    }, {
	        key: 'checkItem',
	        value: function checkItem(lbl) {
	            var li = lbl.parentNode;
	            if (!li || !lbl) {
	                return;
	            }
	            var isChecked = lbl.firstChild.checked;
	            var colIndex = lbl.firstChild.getAttribute('id').split('_')[1];
	            colIndex = parseInt(colIndex, 10);
	            if (isChecked) {
	                _dom2['default'].addClass(li, this.listSlcItemCssClass);
	            } else {
	                _dom2['default'].removeClass(li, this.listSlcItemCssClass);
	            }
	
	            var hide = false;
	            if (this.tickToHide && isChecked || !this.tickToHide && !isChecked) {
	                hide = true;
	            }
	            this.setHidden(colIndex, hide);
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            if (!this.manager) {
	                return;
	            }
	            this.buildBtn();
	            this.buildManager();
	
	            this.initialized = true;
	        }
	
	        /**
	         * Build main button UI
	         */
	    }, {
	        key: 'buildBtn',
	        value: function buildBtn() {
	            var _this = this;
	
	            if (this.btnEl) {
	                return;
	            }
	            var tf = this.tf;
	            var span = _dom2['default'].create('span', ['id', this.prfx + tf.id]);
	            span.className = this.spanCssClass;
	
	            //Container element (rdiv or custom element)
	            if (!this.btnTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.btnTgtId ? tf.rDiv : _dom2['default'].id(this.btnTgtId);
	
	            if (!this.btnTgtId) {
	                var firstChild = targetEl.firstChild;
	                firstChild.parentNode.insertBefore(span, firstChild);
	            } else {
	                targetEl.appendChild(span);
	            }
	
	            if (!this.btnHtml) {
	                var btn = _dom2['default'].create('a', ['href', 'javascript:;']);
	                btn.className = this.btnCssClass;
	                btn.title = this.desc;
	
	                btn.innerHTML = this.btnText;
	                span.appendChild(btn);
	                if (!this.enableHover) {
	                    _event2['default'].add(btn, 'click', function (evt) {
	                        _this.toggle(evt);
	                    });
	                } else {
	                    _event2['default'].add(btn, 'mouseover', function (evt) {
	                        _this.toggle(evt);
	                    });
	                }
	            } else {
	                //Custom html
	                span.innerHTML = this.btnHtml;
	                var colVisEl = span.firstChild;
	                if (!this.enableHover) {
	                    _event2['default'].add(colVisEl, 'click', function (evt) {
	                        _this.toggle(evt);
	                    });
	                } else {
	                    _event2['default'].add(colVisEl, 'mouseover', function (evt) {
	                        _this.toggle(evt);
	                    });
	                }
	            }
	
	            this.spanEl = span;
	            this.btnEl = this.spanEl.firstChild;
	
	            if (this.onLoaded) {
	                this.onLoaded.call(null, this);
	            }
	        }
	
	        /**
	         * Build columns manager UI
	         */
	    }, {
	        key: 'buildManager',
	        value: function buildManager() {
	            var _this2 = this;
	
	            var tf = this.tf;
	
	            var container = !this.contElTgtId ? _dom2['default'].create('div', ['id', this.prfxCont + tf.id]) : _dom2['default'].id(this.contElTgtId);
	            container.className = this.contCssClass;
	
	            //Extension description
	            var extNameLabel = _dom2['default'].create('p');
	            extNameLabel.innerHTML = this.text;
	            container.appendChild(extNameLabel);
	
	            //Headers list
	            var ul = _dom2['default'].create('ul', ['id', 'ul' + this.name + '_' + tf.id]);
	            ul.className = this.listCssClass;
	
	            var tbl = this.headersTbl ? this.headersTbl : tf.tbl;
	            var headerIndex = this.headersTbl ? this.headersIndex : tf.getHeadersRowIndex();
	            var headerRow = tbl.rows[headerIndex];
	
	            //Tick all option
	            if (this.enableTickAll) {
	                var li = _dom2['default'].createCheckItem('col__' + tf.id, this.tickAllText, this.tickAllText);
	                _dom2['default'].addClass(li, this.listItemCssClass);
	                ul.appendChild(li);
	                li.check.checked = !this.tickToHide;
	
	                _event2['default'].add(li.check, 'click', function () {
	                    for (var h = 0; h < headerRow.cells.length; h++) {
	                        var itm = _dom2['default'].id('col_' + h + '_' + tf.id);
	                        if (itm && li.check.checked !== itm.checked) {
	                            itm.click();
	                            itm.checked = li.check.checked;
	                        }
	                    }
	                });
	            }
	
	            for (var i = 0; i < headerRow.cells.length; i++) {
	                var cell = headerRow.cells[i];
	                var cellText = this.headersText && this.headersText[i] ? this.headersText[i] : this._getHeaderText(cell);
	                var liElm = _dom2['default'].createCheckItem('col_' + i + '_' + tf.id, cellText, cellText);
	                _dom2['default'].addClass(liElm, this.listItemCssClass);
	                if (!this.tickToHide) {
	                    _dom2['default'].addClass(liElm, this.listSlcItemCssClass);
	                }
	                ul.appendChild(liElm);
	                if (!this.tickToHide) {
	                    liElm.check.checked = true;
	                }
	
	                _event2['default'].add(liElm.check, 'click', function (evt) {
	                    var elm = _event2['default'].target(evt);
	                    var lbl = elm.parentNode;
	                    _this2.checkItem(lbl);
	                });
	            }
	
	            //separator
	            var p = _dom2['default'].create('p', ['align', 'center']);
	            var btn;
	            //Close link
	            if (!this.btnCloseHtml) {
	                btn = _dom2['default'].create('a', ['href', 'javascript:;']);
	                btn.className = this.btnCloseCssClass;
	                btn.innerHTML = this.btnCloseText;
	                _event2['default'].add(btn, 'click', function (evt) {
	                    _this2.toggle(evt);
	                });
	                p.appendChild(btn);
	            } else {
	                p.innerHTML = this.btnCloseHtml;
	                btn = p.firstChild;
	                _event2['default'].add(btn, 'click', function (evt) {
	                    _this2.toggle(evt);
	                });
	            }
	
	            container.appendChild(ul);
	            container.appendChild(p);
	
	            this.btnEl.parentNode.insertBefore(container, this.btnEl);
	            this.contEl = container;
	
	            if (this.atStart) {
	                var a = this.atStart;
	                for (var k = 0; k < a.length; k++) {
	                    var itm = _dom2['default'].id('col_' + a[k] + '_' + tf.id);
	                    if (itm) {
	                        itm.click();
	                    }
	                }
	            }
	        }
	
	        /**
	         * Hide or show specified columns
	         * @param {Numner} colIndex Column index
	         * @param {Boolean} hide    hide column if true or show if false
	         */
	    }, {
	        key: 'setHidden',
	        value: function setHidden(colIndex, hide) {
	            var tf = this.tf;
	            var tbl = tf.tbl;
	
	            if (this.onBeforeColHidden && hide) {
	                this.onBeforeColHidden.call(null, this, colIndex);
	            }
	            if (this.onBeforeColDisplayed && !hide) {
	                this.onBeforeColDisplayed.call(null, this, colIndex);
	            }
	
	            this._hideCells(tbl, colIndex, hide);
	            if (this.headersTbl) {
	                this._hideCells(this.headersTbl, colIndex, hide);
	            }
	
	            var hiddenCols = this.hiddenCols;
	            if (hide) {
	                if (hiddenCols.indexOf(colIndex) === -1) {
	                    this.hiddenCols.push(colIndex);
	                }
	            } else {
	                var itemIndex = _array2['default'].indexByValue(hiddenCols, colIndex, true);
	                if (hiddenCols.indexOf(colIndex) !== -1) {
	                    this.hiddenCols.splice(itemIndex, 1);
	                }
	            }
	
	            var gridLayout;
	            var headTbl;
	            var gridColElms;
	            if (this.onAfterColHidden && hide) {
	                //This event is fired just after a column is displayed for
	                //grid_layout support
	                //TODO: grid layout module should be responsible for those
	                //calculations
	                if (tf.gridLayout) {
	                    gridLayout = tf.feature('gridLayout');
	                    headTbl = gridLayout.headTbl;
	                    gridColElms = gridLayout.gridColElms;
	                    var hiddenWidth = parseInt(gridColElms[colIndex].style.width, 10);
	
	                    var headTblW = parseInt(headTbl.style.width, 10);
	                    headTbl.style.width = headTblW - hiddenWidth + 'px';
	                    tbl.style.width = headTbl.style.width;
	                }
	                this.onAfterColHidden.call(null, this, colIndex);
	            }
	
	            if (this.onAfterColDisplayed && !hide) {
	                //This event is fired just after a column is displayed for
	                //grid_layout support
	                //TODO: grid layout module should be responsible for those
	                //calculations
	                if (tf.gridLayout) {
	                    gridLayout = tf.feature('gridLayout');
	                    headTbl = gridLayout.headTbl;
	                    gridColElms = gridLayout.gridColElms;
	                    var width = parseInt(gridColElms[colIndex].style.width, 10);
	                    headTbl.style.width = parseInt(headTbl.style.width, 10) + width + 'px';
	                    tf.tbl.style.width = headTbl.style.width;
	                }
	                this.onAfterColDisplayed.call(null, this, colIndex);
	            }
	        }
	
	        /**
	         * Show specified column
	         * @param  {Number} colIndex Column index
	         */
	    }, {
	        key: 'showCol',
	        value: function showCol(colIndex) {
	            if (colIndex === undefined || !this.isColHidden(colIndex)) {
	                return;
	            }
	            if (this.manager && this.contEl) {
	                var itm = _dom2['default'].id('col_' + colIndex + '_' + this.tf.id);
	                if (itm) {
	                    itm.click();
	                }
	            } else {
	                this.setHidden(colIndex, false);
	            }
	        }
	
	        /**
	         * Hide specified column
	         * @param  {Number} colIndex Column index
	         */
	    }, {
	        key: 'hideCol',
	        value: function hideCol(colIndex) {
	            if (colIndex === undefined || this.isColHidden(colIndex)) {
	                return;
	            }
	            if (this.manager && this.contEl) {
	                var itm = _dom2['default'].id('col_' + colIndex + '_' + this.tf.id);
	                if (itm) {
	                    itm.click();
	                }
	            } else {
	                this.setHidden(colIndex, true);
	            }
	        }
	
	        /**
	         * Determine if specified column is hidden
	         * @param  {Number} colIndex Column index
	         */
	    }, {
	        key: 'isColHidden',
	        value: function isColHidden(colIndex) {
	            if (this.hiddenCols.indexOf(colIndex) !== -1) {
	                return true;
	            }
	            return false;
	        }
	
	        /**
	         * Toggle visibility of specified column
	         * @param  {Number} colIndex Column index
	         */
	    }, {
	        key: 'toggleCol',
	        value: function toggleCol(colIndex) {
	            if (colIndex === undefined || this.isColHidden(colIndex)) {
	                this.showCol(colIndex);
	            } else {
	                this.hideCol(colIndex);
	            }
	        }
	
	        /**
	         * Returns the indexes of the columns currently hidden
	         * @return {Array} column indexes
	         */
	    }, {
	        key: 'getHiddenCols',
	        value: function getHiddenCols() {
	            return this.hiddenCols;
	        }
	
	        /**
	         * Remove the columns manager
	         */
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            if (!this.btnEl && !this.contEl) {
	                return;
	            }
	            if (_dom2['default'].id(this.contElTgtId)) {
	                _dom2['default'].id(this.contElTgtId).innerHTML = '';
	            } else {
	                this.contEl.innerHTML = '';
	                this.contEl.parentNode.removeChild(this.contEl);
	                this.contEl = null;
	            }
	            this.btnEl.innerHTML = '';
	            this.btnEl.parentNode.removeChild(this.btnEl);
	            this.btnEl = null;
	            this.initialized = false;
	        }
	    }, {
	        key: '_getHeaderText',
	        value: function _getHeaderText(cell) {
	            if (!cell.hasChildNodes) {
	                return '';
	            }
	
	            for (var i = 0; i < cell.childNodes.length; i++) {
	                var n = cell.childNodes[i];
	                if (n.nodeType === 3) {
	                    return n.nodeValue;
	                } else if (n.nodeType === 1) {
	                    if (n.id && n.id.indexOf('popUp') !== -1) {
	                        continue;
	                    } else {
	                        return _dom2['default'].getText(n);
	                    }
	                }
	                continue;
	            }
	            return '';
	        }
	    }, {
	        key: '_hideCells',
	        value: function _hideCells(tbl, colIndex, hide) {
	            for (var i = 0; i < tbl.rows.length; i++) {
	                var row = tbl.rows[i];
	                var cell = row.cells[colIndex];
	                if (cell) {
	                    cell.style.display = hide ? 'none' : '';
	                }
	            }
	        }
	    }]);
	
	    return ColsVisibility;
	})();
	
	exports['default'] = ColsVisibility;
	module.exports = exports['default'];

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _dom = __webpack_require__(2);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _types = __webpack_require__(5);
	
	var _types2 = _interopRequireDefault(_types);
	
	var _event = __webpack_require__(1);
	
	var _event2 = _interopRequireDefault(_event);
	
	var FiltersVisibility = (function () {
	
	    /**
	     * Filters Row Visibility extension
	     * @param {Object} tf TableFilter instance
	     * @param {Object} f Config
	     */
	
	    function FiltersVisibility(tf, f) {
	        _classCallCheck(this, FiltersVisibility);
	
	        this.initialized = false;
	        this.name = f.name;
	        this.desc = f.description || 'Filters row visibility manager';
	
	        // Path and image filenames
	        this.stylesheet = f.stylesheet || 'filtersVisibility.css';
	        this.icnExpand = f.expand_icon_name || 'icn_exp.png';
	        this.icnCollapse = f.collapse_icon_name || 'icn_clp.png';
	
	        //expand/collapse filters span element
	        this.contEl = null;
	        //expand/collapse filters btn element
	        this.btnEl = null;
	
	        this.icnExpandHtml = '<img src="' + tf.themesPath + this.icnExpand + '" alt="Expand filters" >';
	        this.icnCollapseHtml = '<img src="' + tf.themesPath + this.icnCollapse + '" alt="Collapse filters" >';
	        this.defaultText = 'Toggle filters';
	
	        //id of container element
	        this.targetId = f.target_id || null;
	        //enables/disables expand/collapse icon
	        this.enableIcon = f.enable_icon === false ? false : true;
	        this.btnText = f.btn_text || '';
	
	        //defines expand/collapse filters text
	        this.collapseBtnHtml = this.enableIcon ? this.icnCollapseHtml + this.btnText : this.btnText || this.defaultText;
	        this.expandBtnHtml = this.enableIcon ? this.icnExpandHtml + this.btnText : this.btnText || this.defaultText;
	
	        //defines expand/collapse filters button innerHtml
	        this.btnHtml = f.btn_html || null;
	        //defines css class for expand/collapse filters button
	        this.btnCssClass = f.btn_css_class || 'btnExpClpFlt';
	        //defines css class span containing expand/collapse filters
	        this.contCssClass = f.cont_css_class || 'expClpFlt';
	        this.filtersRowIndex = !_types2['default'].isUndef(f.filters_row_index) ? f.filters_row_index : tf.getFiltersRowIndex();
	
	        this.visibleAtStart = !_types2['default'].isUndef(f.visible_at_start) ? Boolean(f.visible_at_start) : true;
	
	        // Prefix
	        this.prfx = 'fltsVis_';
	
	        //callback before filters row is shown
	        this.onBeforeShow = _types2['default'].isFn(f.on_before_show) ? f.on_before_show : null;
	        //callback after filters row is shown
	        this.onAfterShow = _types2['default'].isFn(f.on_after_show) ? f.on_after_show : null;
	        //callback before filters row is hidden
	        this.onBeforeHide = _types2['default'].isFn(f.on_before_hide) ? f.on_before_hide : null;
	        //callback after filters row is hidden
	        this.onAfterHide = _types2['default'].isFn(f.on_after_hide) ? f.on_after_hide : null;
	
	        //Loads extension stylesheet
	        tf['import'](f.name + 'Style', tf.stylePath + this.stylesheet, null, 'link');
	
	        this.tf = tf;
	    }
	
	    /**
	     * Initialise extension
	     */
	
	    _createClass(FiltersVisibility, [{
	        key: 'init',
	        value: function init() {
	            if (this.initialized) {
	                return;
	            }
	
	            this.buildUI();
	            this.initialized = true;
	        }
	
	        /**
	         * Build UI elements
	         */
	    }, {
	        key: 'buildUI',
	        value: function buildUI() {
	            var _this = this;
	
	            var tf = this.tf;
	            var span = _dom2['default'].create('span', ['id', this.prfx + tf.id]);
	            span.className = this.contCssClass;
	
	            //Container element (rdiv or custom element)
	            if (!this.targetId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.targetId ? tf.rDiv : _dom2['default'].id(this.targetId);
	
	            if (!this.targetId) {
	                var firstChild = targetEl.firstChild;
	                firstChild.parentNode.insertBefore(span, firstChild);
	            } else {
	                targetEl.appendChild(span);
	            }
	
	            var btn = undefined;
	            if (!this.btnHtml) {
	                btn = _dom2['default'].create('a', ['href', 'javascript:void(0);']);
	                btn.className = this.btnCssClass;
	                btn.title = this.btnText || this.defaultText;
	                btn.innerHTML = this.collapseBtnHtml;
	                span.appendChild(btn);
	                _event2['default'].add(btn, 'click', function () {
	                    return _this.toggle();
	                });
	            } else {
	                //Custom html
	                span.innerHTML = this.btnHtml;
	                btn = span.firstChild;
	                _event2['default'].add(btn, 'click', function () {
	                    return _this.toggle();
	                });
	            }
	
	            this.contEl = span;
	            this.btnEl = btn;
	
	            if (!this.visibleAtStart) {
	                this.toggle();
	            }
	        }
	
	        /**
	         * Toggle filters visibility
	         */
	    }, {
	        key: 'toggle',
	        value: function toggle() {
	            var tf = this.tf;
	            var tbl = tf.gridLayout ? tf.feature('gridLayout').headTbl : tf.tbl;
	            var fltRow = tbl.rows[this.filtersRowIndex];
	            var fltRowDisplay = fltRow.style.display;
	
	            if (this.onBeforeShow && fltRowDisplay !== '') {
	                this.onBeforeShow.call(this, this);
	            }
	            if (this.onBeforeHide && fltRowDisplay === '') {
	                this.onBeforeHide.call(null, this);
	            }
	
	            fltRow.style.display = fltRowDisplay === '' ? 'none' : '';
	            if (this.enableIcon && !this.btnHtml) {
	                this.btnEl.innerHTML = fltRowDisplay === '' ? this.expandBtnHtml : this.collapseBtnHtml;
	            }
	
	            if (this.onAfterShow && fltRowDisplay !== '') {
	                this.onAfterShow.call(null, this);
	            }
	            if (this.onAfterHide && fltRowDisplay === '') {
	                this.onAfterHide.call(null, this);
	            }
	        }
	
	        /**
	         * Destroy the UI
	         */
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            if (!this.btnEl && !this.contEl) {
	                return;
	            }
	
	            this.btnEl.innerHTML = '';
	            this.btnEl.parentNode.removeChild(this.btnEl);
	            this.btnEl = null;
	
	            this.contEl.innerHTML = '';
	            this.contEl.parentNode.removeChild(this.contEl);
	            this.contEl = null;
	            this.initialized = false;
	        }
	    }]);
	
	    return FiltersVisibility;
	})();
	
	exports['default'] = FiltersVisibility;
	module.exports = exports['default'];

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _types = __webpack_require__(5);
	
	var _types2 = _interopRequireDefault(_types);
	
	var _dom = __webpack_require__(2);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _array = __webpack_require__(6);
	
	var _array2 = _interopRequireDefault(_array);
	
	var _event = __webpack_require__(1);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _date = __webpack_require__(7);
	
	var _date2 = _interopRequireDefault(_date);
	
	var _helpers = __webpack_require__(8);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	var AdapterSortableTable = (function () {
	
	    /**
	     * SortableTable Adapter module
	     * @param {Object} tf TableFilter instance
	     */
	
	    function AdapterSortableTable(tf, opts) {
	        _classCallCheck(this, AdapterSortableTable);
	
	        // Configuration object
	        var f = tf.config();
	
	        this.initialized = false;
	        this.name = opts.name;
	        this.desc = opts.description || 'Sortable table';
	
	        //indicates if paging is enabled
	        this.isPaged = false;
	
	        //indicates if tables was sorted
	        this.sorted = false;
	
	        this.sortTypes = _types2['default'].isArray(opts.types) ? opts.types : [];
	        this.sortColAtStart = _types2['default'].isArray(opts.sort_col_at_start) ? opts.sort_col_at_start : null;
	        this.asyncSort = Boolean(opts.async_sort);
	        this.triggerIds = _types2['default'].isArray(opts.trigger_ids) ? opts.trigger_ids : [];
	
	        // edit .sort-arrow.descending / .sort-arrow.ascending in
	        // tablefilter.css to reflect any path change
	        this.imgPath = opts.images_path || tf.themesPath;
	        this.imgBlank = opts.image_blank || 'blank.png';
	        this.imgClassName = opts.image_class_name || 'sort-arrow';
	        this.imgAscClassName = opts.image_asc_class_name || 'ascending';
	        this.imgDescClassName = opts.image_desc_class_name || 'descending';
	        //cell attribute storing custom key
	        this.customKey = opts.custom_key || 'data-tf-sortKey';
	
	        /*** TF additional events ***/
	        //additional paging events for alternating background
	        // o.Evt._Paging.nextEvt = function(){
	        // if(o.sorted && o.alternateBgs) o.Filter();
	        // }
	        // o.Evt._Paging.prevEvt = o.Evt._Paging.nextEvt;
	        // o.Evt._Paging.firstEvt = o.Evt._Paging.nextEvt;
	        // o.Evt._Paging.lastEvt = o.Evt._Paging.nextEvt;
	        // o.Evt._OnSlcPagesChangeEvt = o.Evt._Paging.nextEvt;
	
	        // callback invoked after sort is loaded and instanciated
	        this.onSortLoaded = _types2['default'].isFn(opts.on_sort_loaded) ? opts.on_sort_loaded : null;
	        // callback invoked before table is sorted
	        this.onBeforeSort = _types2['default'].isFn(opts.on_before_sort) ? opts.on_before_sort : null;
	        // callback invoked after table is sorted
	        this.onAfterSort = _types2['default'].isFn(opts.on_after_sort) ? f.on_after_sort : null;
	
	        this.tf = tf;
	    }
	
	    //Converters
	
	    _createClass(AdapterSortableTable, [{
	        key: 'init',
	        value: function init() {
	            var tf = this.tf;
	            var adpt = this;
	
	            // SortableTable class sanity check (sortabletable.js)
	            if (_types2['default'].isUndef(SortableTable)) {
	                throw new Error('SortableTable class not found.');
	            }
	
	            this.overrideSortableTable();
	            this.setSortTypes();
	
	            //Column sort at start
	            var sortColAtStart = adpt.sortColAtStart;
	            if (sortColAtStart) {
	                this.stt.sort(sortColAtStart[0], sortColAtStart[1]);
	            }
	
	            if (this.onSortLoaded) {
	                this.onSortLoaded.call(null, tf, this);
	            }
	
	            /*** SortableTable callbacks ***/
	            this.stt.onbeforesort = function () {
	                if (this.onBeforeSort) {
	                    this.onBeforeSort.call(null, tf, this.stt.sortColumn);
	                }
	
	                /*** sort behaviour for paging ***/
	                if (tf.paging) {
	                    adpt.isPaged = true;
	                    tf.paging = false;
	                    tf.feature('paging').destroy();
	                }
	            };
	
	            this.stt.onsort = function () {
	                adpt.sorted = true;
	
	                //rows alternating bg issue
	                // TODO: move into AlternateRows component
	                if (tf.alternateBgs) {
	                    var rows = tf.tbl.rows,
	                        c = 0;
	
	                    var setClass = function setClass(row, i, removeOnly) {
	                        if (_types2['default'].isUndef(removeOnly)) {
	                            removeOnly = false;
	                        }
	                        var altRows = tf.feature('alternateRows'),
	                            oddCls = altRows.oddCss,
	                            evenCls = altRows.evenCss;
	                        _dom2['default'].removeClass(row, oddCls);
	                        _dom2['default'].removeClass(row, evenCls);
	
	                        if (!removeOnly) {
	                            _dom2['default'].addClass(row, i % 2 ? oddCls : evenCls);
	                        }
	                    };
	
	                    for (var i = tf.refRow; i < tf.nbRows; i++) {
	                        var isRowValid = rows[i].getAttribute('validRow');
	                        if (tf.paging && rows[i].style.display === '') {
	                            setClass(rows[i], c);
	                            c++;
	                        } else {
	                            if ((isRowValid === 'true' || isRowValid === null) && rows[i].style.display === '') {
	                                setClass(rows[i], c);
	                                c++;
	                            } else {
	                                setClass(rows[i], c, true);
	                            }
	                        }
	                    }
	                }
	                //sort behaviour for paging
	                if (adpt.isPaged) {
	                    var paginator = tf.feature('paging');
	                    paginator.reset(false);
	                    paginator.setPage(paginator.getPage());
	                    adpt.isPaged = false;
	                }
	
	                if (adpt.onAfterSort) {
	                    adpt.onAfterSort.call(null, tf, tf.stt.sortColumn);
	                }
	            };
	
	            this.initialized = true;
	        }
	
	        /**
	         * Sort specified column
	         * @param  {Number} colIdx Column index
	         */
	    }, {
	        key: 'sortByColumnIndex',
	        value: function sortByColumnIndex(colIdx) {
	            this.stt.sort(colIdx);
	        }
	    }, {
	        key: 'overrideSortableTable',
	        value: function overrideSortableTable() {
	            var adpt = this,
	                tf = this.tf;
	
	            /**
	             * Overrides headerOnclick method in order to handle th event
	             * @param  {Object} e [description]
	             */
	            SortableTable.prototype.headerOnclick = function (evt) {
	                if (!adpt.initialized) {
	                    return;
	                }
	
	                // find Header element
	                var el = evt.target || evt.srcElement;
	
	                while (el.tagName !== 'TD' && el.tagName !== 'TH') {
	                    el = el.parentNode;
	                }
	
	                this.sort(SortableTable.msie ? SortableTable.getCellIndex(el) : el.cellIndex);
	            };
	
	            /**
	             * Overrides getCellIndex IE returns wrong cellIndex when columns are
	             * hidden
	             * @param  {Object} oTd TD element
	             * @return {Number}     Cell index
	             */
	            SortableTable.getCellIndex = function (oTd) {
	                var cells = oTd.parentNode.cells,
	                    l = cells.length,
	                    i = undefined;
	                for (i = 0; cells[i] != oTd && i < l; i++) {}
	                return i;
	            };
	
	            /**
	             * Overrides initHeader in order to handle filters row position
	             * @param  {Array} oSortTypes
	             */
	            SortableTable.prototype.initHeader = function (oSortTypes) {
	                var stt = this;
	                if (!stt.tHead) {
	                    if (tf.gridLayout) {
	                        stt.tHead = tf.feature('gridLayout').headTbl.tHead;
	                    } else {
	                        return;
	                    }
	                }
	
	                stt.headersRow = tf.headersRow;
	                var cells = stt.tHead.rows[stt.headersRow].cells;
	                stt.sortTypes = oSortTypes || [];
	                var l = cells.length;
	                var img = undefined,
	                    c = undefined;
	
	                for (var i = 0; i < l; i++) {
	                    c = cells[i];
	                    if (stt.sortTypes[i] !== null && stt.sortTypes[i] !== 'None') {
	                        c.style.cursor = 'pointer';
	                        img = _dom2['default'].create('img', ['src', adpt.imgPath + adpt.imgBlank]);
	                        c.appendChild(img);
	                        if (stt.sortTypes[i] !== null) {
	                            c.setAttribute('_sortType', stt.sortTypes[i]);
	                        }
	                        _event2['default'].add(c, 'click', stt._headerOnclick);
	                    } else {
	                        c.setAttribute('_sortType', oSortTypes[i]);
	                        c._sortType = 'None';
	                    }
	                }
	                stt.updateHeaderArrows();
	            };
	
	            /**
	             * Overrides updateHeaderArrows in order to handle arrows indicators
	             */
	            SortableTable.prototype.updateHeaderArrows = function () {
	                var stt = this;
	                var cells = undefined,
	                    l = undefined,
	                    img = undefined;
	
	                // external headers
	                if (adpt.asyncSort && adpt.triggerIds.length > 0) {
	                    var triggers = adpt.triggerIds;
	                    cells = [];
	                    l = triggers.length;
	                    for (var j = 0; j < triggers.length; j++) {
	                        cells.push(_dom2['default'].id(triggers[j]));
	                    }
	                } else {
	                    if (!this.tHead) {
	                        return;
	                    }
	                    cells = stt.tHead.rows[stt.headersRow].cells;
	                    l = cells.length;
	                }
	                for (var i = 0; i < l; i++) {
	                    var cellAttr = cells[i].getAttribute('_sortType');
	                    if (cellAttr !== null && cellAttr !== 'None') {
	                        img = cells[i].lastChild || cells[i];
	                        if (img.nodeName.toLowerCase() !== 'img') {
	                            img = _dom2['default'].create('img', ['src', adpt.imgPath + adpt.imgBlank]);
	                            cells[i].appendChild(img);
	                        }
	                        if (i === stt.sortColumn) {
	                            img.className = adpt.imgClassName + ' ' + (this.descending ? adpt.imgDescClassName : adpt.imgAscClassName);
	                        } else {
	                            img.className = adpt.imgClassName;
	                        }
	                    }
	                }
	            };
	
	            /**
	             * Overrides getRowValue for custom key value feature
	             * @param  {Object} oRow    Row element
	             * @param  {String} sType
	             * @param  {Number} nColumn
	             * @return {String}
	             */
	            SortableTable.prototype.getRowValue = function (oRow, sType, nColumn) {
	                var stt = this;
	                // if we have defined a custom getRowValue use that
	                var sortTypeInfo = stt._sortTypeInfo[sType];
	                if (sortTypeInfo && sortTypeInfo.getRowValue) {
	                    return sortTypeInfo.getRowValue(oRow, nColumn);
	                }
	                var c = oRow.cells[nColumn];
	                var s = SortableTable.getInnerText(c);
	                return stt.getValueFromString(s, sType);
	            };
	
	            /**
	             * Overrides getInnerText in order to avoid Firefox unexpected sorting
	             * behaviour with untrimmed text elements
	             * @param  {Object} oNode DOM element
	             * @return {String}       DOM element inner text
	             */
	            SortableTable.getInnerText = function (oNode) {
	                if (!oNode) {
	                    return;
	                }
	                if (oNode.getAttribute(adpt.customKey)) {
	                    return oNode.getAttribute(adpt.customKey);
	                } else {
	                    return _dom2['default'].getText(oNode);
	                }
	            };
	        }
	    }, {
	        key: 'addSortType',
	        value: function addSortType() {
	            var args = arguments;
	            SortableTable.prototype.addSortType(args[0], args[1], args[2], args[3]);
	        }
	    }, {
	        key: 'setSortTypes',
	        value: function setSortTypes() {
	            var _this = this;
	
	            var tf = this.tf,
	                sortTypes = this.sortTypes,
	                _sortTypes = [];
	
	            for (var i = 0; i < tf.nbCells; i++) {
	                var colType = undefined;
	
	                if (sortTypes[i]) {
	                    colType = sortTypes[i].toLowerCase();
	                    if (colType === 'none') {
	                        colType = 'None';
	                    }
	                } else {
	                    // resolve column types
	                    if (tf.hasColNbFormat && tf.colNbFormat[i] !== null) {
	                        colType = tf.colNbFormat[i].toLowerCase();
	                    } else if (tf.hasColDateType && tf.colDateType[i] !== null) {
	                        colType = tf.colDateType[i].toLowerCase() + 'date';
	                    } else {
	                        colType = 'String';
	                    }
	                }
	                _sortTypes.push(colType);
	            }
	
	            //Public TF method to add sort type
	
	            //Custom sort types
	            this.addSortType('number', Number);
	            this.addSortType('caseinsensitivestring', SortableTable.toUpperCase);
	            this.addSortType('date', SortableTable.toDate);
	            this.addSortType('string');
	            this.addSortType('us', usNumberConverter);
	            this.addSortType('eu', euNumberConverter);
	            this.addSortType('dmydate', dmyDateConverter);
	            this.addSortType('ymddate', ymdDateConverter);
	            this.addSortType('mdydate', mdyDateConverter);
	            this.addSortType('ddmmmyyyydate', ddmmmyyyyDateConverter);
	            this.addSortType('ipaddress', ipAddress, sortIP);
	
	            this.stt = new SortableTable(tf.tbl, _sortTypes);
	
	            /*** external table headers adapter ***/
	            if (this.asyncSort && this.triggerIds.length > 0) {
	                (function () {
	                    var triggers = _this.triggerIds;
	                    for (var j = 0; j < triggers.length; j++) {
	                        if (triggers[j] === null) {
	                            continue;
	                        }
	                        var trigger = _dom2['default'].id(triggers[j]);
	                        if (trigger) {
	                            trigger.style.cursor = 'pointer';
	
	                            _event2['default'].add(trigger, 'click', function (evt) {
	                                var elm = evt.target;
	                                if (!_this.tf.sort) {
	                                    return;
	                                }
	                                _this.stt.asyncSort(_array2['default'].indexByValue(triggers, elm.id, true));
	                            });
	                            trigger.setAttribute('_sortType', _sortTypes[j]);
	                        }
	                    }
	                })();
	            }
	        }
	
	        /**
	         * Destroy sort
	         */
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var tf = this.tf;
	            this.sorted = false;
	            this.initialized = false;
	            this.stt.destroy();
	
	            var ids = tf.getFiltersId();
	            for (var idx = 0; idx < ids.length; idx++) {
	                var header = tf.getHeaderElement(idx);
	                var img = _dom2['default'].tag(header, 'img');
	
	                if (img.length === 1) {
	                    header.removeChild(img[0]);
	                }
	            }
	        }
	    }]);
	
	    return AdapterSortableTable;
	})();
	
	exports['default'] = AdapterSortableTable;
	function usNumberConverter(s) {
	    return _helpers2['default'].removeNbFormat(s, 'us');
	}
	function euNumberConverter(s) {
	    return _helpers2['default'].removeNbFormat(s, 'eu');
	}
	function dateConverter(s, format) {
	    return _date2['default'].format(s, format);
	}
	function dmyDateConverter(s) {
	    return dateConverter(s, 'DMY');
	}
	function mdyDateConverter(s) {
	    return dateConverter(s, 'MDY');
	}
	function ymdDateConverter(s) {
	    return dateConverter(s, 'YMD');
	}
	function ddmmmyyyyDateConverter(s) {
	    return dateConverter(s, 'DDMMMYYYY');
	}
	
	function ipAddress(value) {
	    var vals = value.split('.');
	    for (var x in vals) {
	        var val = vals[x];
	        while (3 > val.length) {
	            val = '0' + val;
	        }
	        vals[x] = val;
	    }
	    return vals.join('.');
	}
	
	function sortIP(a, b) {
	    var aa = ipAddress(a.value.toLowerCase());
	    var bb = ipAddress(b.value.toLowerCase());
	    if (aa == bb) {
	        return 0;
	    } else if (aa < bb) {
	        return -1;
	    } else {
	        return 1;
	    }
	}
	module.exports = exports['default'];

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	// import 'script!sortabletable';
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _adapterSortabletable = __webpack_require__(29);
	
	var _adapterSortabletable2 = _interopRequireDefault(_adapterSortabletable);
	
	if (!window.SortableTable) {
	    __webpack_require__(31);
	}
	
	exports['default'] = _adapterSortabletable2['default'];
	module.exports = exports['default'];

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32)(__webpack_require__(33)+"\n\n// SCRIPT-LOADER FOOTER\n//# sourceURL=script:///C:/Users/max.guglielmi/Documents/dev/perso/javascript/GitHub/TableFilter/libs/sortabletable.js")

/***/ },

/***/ 32:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript === "function")
			execScript(src);
		else
			eval.call(null, src);
	}

/***/ },

/***/ 33:
/***/ function(module, exports) {

	module.exports = "/*----------------------------------------------------------------------------\\\r\n|                            Sortable Table 1.12                              |\r\n|-----------------------------------------------------------------------------|\r\n|                         Created by Erik Arvidsson                           |\r\n|                  (http://webfx.eae.net/contact.html#erik)                   |\r\n|                      For WebFX (http://webfx.eae.net/)                      |\r\n|-----------------------------------------------------------------------------|\r\n| A DOM 1 based script that allows an ordinary HTML table to be sortable.     |\r\n|-----------------------------------------------------------------------------|\r\n|                  Copyright (c) 1998 - 2006 Erik Arvidsson                   |\r\n|-----------------------------------------------------------------------------|\r\n| Licensed under the Apache License, Version 2.0 (the \"License\"); you may not |\r\n| use this file except in compliance with the License.  You may obtain a copy |\r\n| of the License at http://www.apache.org/licenses/LICENSE-2.0                |\r\n| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |\r\n| Unless  required  by  applicable law or  agreed  to  in  writing,  software |\r\n| distributed under the License is distributed on an  \"AS IS\" BASIS,  WITHOUT |\r\n| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |\r\n| License  for the  specific language  governing permissions  and limitations |\r\n| under the License.                                                          |\r\n|-----------------------------------------------------------------------------|\r\n| 2003-01-10 | First version                                                  |\r\n| 2003-01-19 | Minor changes to the date parsing                              |\r\n| 2003-01-28 | JScript 5.0 fixes (no support for 'in' operator)               |\r\n| 2003-02-01 | Sloppy typo like error fixed in getInnerText                   |\r\n| 2003-07-04 | Added workaround for IE cellIndex bug.                         |\r\n| 2003-11-09 | The bDescending argument to sort was not correctly working     |\r\n|            | Using onclick DOM0 event if no support for addEventListener    |\r\n|            | or attachEvent                                                 |\r\n| 2004-01-13 | Adding addSortType and removeSortType which makes it a lot     |\r\n|            | easier to add new, custom sort types.                          |\r\n| 2004-01-27 | Switch to use descending = false as the default sort order.    |\r\n|            | Change defaultDescending to suit your needs.                   |\r\n| 2004-03-14 | Improved sort type None look and feel a bit                    |\r\n| 2004-08-26 | Made the handling of tBody and tHead more flexible. Now you    |\r\n|            | can use another tHead or no tHead, and you can chose some      |\r\n|            | other tBody.                                                   |\r\n| 2006-04-25 | Changed license to Apache Software License 2.0                 |\r\n|-----------------------------------------------------------------------------|\r\n| Created 2003-01-10 | All changes are in the log above. | Updated 2006-04-25 |\r\n\\----------------------------------------------------------------------------*/\r\n\r\n\r\nfunction SortableTable(oTable, oSortTypes) {\r\n\r\n\tthis.sortTypes = oSortTypes || [];\r\n\r\n\tthis.sortColumn = null;\r\n\tthis.descending = null;\r\n\r\n\tvar oThis = this;\r\n\tthis._headerOnclick = function (e) {\r\n\t\toThis.headerOnclick(e);\r\n\t};\r\n\r\n\tif (oTable) {\r\n\t\tthis.setTable( oTable );\r\n\t\tthis.document = oTable.ownerDocument || oTable.document;\r\n\t}\r\n\telse {\r\n\t\tthis.document = document;\r\n\t}\r\n\r\n\r\n\t// only IE needs this\r\n\tvar win = this.document.defaultView || this.document.parentWindow;\r\n\tthis._onunload = function () {\r\n\t\toThis.destroy();\r\n\t};\r\n\tif (win && typeof win.attachEvent != \"undefined\") {\r\n\t\twin.attachEvent(\"onunload\", this._onunload);\r\n\t}\r\n}\r\n\r\nSortableTable.gecko = navigator.product == \"Gecko\";\r\nSortableTable.msie = /msie/i.test(navigator.userAgent);\r\n// Mozilla is faster when doing the DOM manipulations on\r\n// an orphaned element. MSIE is not\r\nSortableTable.removeBeforeSort = SortableTable.gecko;\r\n\r\nSortableTable.prototype.onsort = function () {};\r\n\r\n// default sort order. true -> descending, false -> ascending\r\nSortableTable.prototype.defaultDescending = false;\r\n\r\n// shared between all instances. This is intentional to allow external files\r\n// to modify the prototype\r\nSortableTable.prototype._sortTypeInfo = {};\r\n\r\nSortableTable.prototype.setTable = function (oTable) {\r\n\tif ( this.tHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.element = oTable;\r\n\tthis.setTHead( oTable.tHead );\r\n\tthis.setTBody( oTable.tBodies[0] );\r\n};\r\n\r\nSortableTable.prototype.setTHead = function (oTHead) {\r\n\tif (this.tHead && this.tHead != oTHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.tHead = oTHead;\r\n\tthis.initHeader( this.sortTypes );\r\n};\r\n\r\nSortableTable.prototype.setTBody = function (oTBody) {\r\n\tthis.tBody = oTBody;\r\n};\r\n\r\nSortableTable.prototype.setSortTypes = function ( oSortTypes ) {\r\n\tif ( this.tHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.sortTypes = oSortTypes || [];\r\n\tif ( this.tHead )\r\n\t\tthis.initHeader( this.sortTypes );\r\n};\r\n\r\n// adds arrow containers and events\r\n// also binds sort type to the header cells so that reordering columns does\r\n// not break the sort types\r\nSortableTable.prototype.initHeader = function (oSortTypes) {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar doc = this.tHead.ownerDocument || this.tHead.document;\r\n\tthis.sortTypes = oSortTypes || [];\r\n\tvar l = cells.length;\r\n\tvar img, c;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tc = cells[i];\r\n\t\tif (this.sortTypes[i] != null && this.sortTypes[i] != \"None\") {\r\n\t\t\timg = doc.createElement(\"IMG\");\r\n\t\t\timg.src = \"images/blank.png\";\r\n\t\t\tc.appendChild(img);\r\n\t\t\tif (this.sortTypes[i] != null)\r\n\t\t\t\tc._sortType = this.sortTypes[i];\r\n\t\t\tif (typeof c.addEventListener != \"undefined\")\r\n\t\t\t\tc.addEventListener(\"click\", this._headerOnclick, false);\r\n\t\t\telse if (typeof c.attachEvent != \"undefined\")\r\n\t\t\t\tc.attachEvent(\"onclick\", this._headerOnclick);\r\n\t\t\telse\r\n\t\t\t\tc.onclick = this._headerOnclick;\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\tc.setAttribute( \"_sortType\", oSortTypes[i] );\r\n\t\t\tc._sortType = \"None\";\r\n\t\t}\r\n\t}\r\n\tthis.updateHeaderArrows();\r\n};\r\n\r\n// remove arrows and events\r\nSortableTable.prototype.uninitHeader = function () {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar l = cells.length;\r\n\tvar c;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tc = cells[i];\r\n\t\tif (c._sortType != null && c._sortType != \"None\") {\r\n\t\t\tc.removeChild(c.lastChild);\r\n\t\t\tif (typeof c.removeEventListener != \"undefined\")\r\n\t\t\t\tc.removeEventListener(\"click\", this._headerOnclick, false);\r\n\t\t\telse if (typeof c.detachEvent != \"undefined\")\r\n\t\t\t\tc.detachEvent(\"onclick\", this._headerOnclick);\r\n\t\t\tc._sortType = null;\r\n\t\t\tc.removeAttribute( \"_sortType\" );\r\n\t\t}\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.updateHeaderArrows = function () {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar l = cells.length;\r\n\tvar img;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tif (cells[i]._sortType != null && cells[i]._sortType != \"None\") {\r\n\t\t\timg = cells[i].lastChild;\r\n\t\t\tif (i == this.sortColumn)\r\n\t\t\t\timg.className = \"sort-arrow \" + (this.descending ? \"descending\" : \"ascending\");\r\n\t\t\telse\r\n\t\t\t\timg.className = \"sort-arrow\";\r\n\t\t}\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.headerOnclick = function (e) {\r\n\t// find TD element\r\n\tvar el = e.target || e.srcElement;\r\n\twhile (el.tagName != \"TD\")\r\n\t\tel = el.parentNode;\r\n\r\n\tthis.sort(SortableTable.msie ? SortableTable.getCellIndex(el) : el.cellIndex);\r\n};\r\n\r\n// IE returns wrong cellIndex when columns are hidden\r\nSortableTable.getCellIndex = function (oTd) {\r\n\tvar cells = oTd.parentNode.childNodes\r\n\tvar l = cells.length;\r\n\tvar i;\r\n\tfor (i = 0; cells[i] != oTd && i < l; i++)\r\n\t\t;\r\n\treturn i;\r\n};\r\n\r\nSortableTable.prototype.getSortType = function (nColumn) {\r\n\treturn this.sortTypes[nColumn] || \"String\";\r\n};\r\n\r\n// only nColumn is required\r\n// if bDescending is left out the old value is taken into account\r\n// if sSortType is left out the sort type is found from the sortTypes array\r\n\r\nSortableTable.prototype.sort = function (nColumn, bDescending, sSortType) {\r\n\tif (!this.tBody) return;\r\n\tif (sSortType == null)\r\n\t\tsSortType = this.getSortType(nColumn);\r\n\r\n\t// exit if None\r\n\tif (sSortType == \"None\")\r\n\t\treturn;\r\n\r\n\tif (bDescending == null) {\r\n\t\tif (this.sortColumn != nColumn)\r\n\t\t\tthis.descending = this.defaultDescending;\r\n\t\telse\r\n\t\t\tthis.descending = !this.descending;\r\n\t}\r\n\telse\r\n\t\tthis.descending = bDescending;\r\n\r\n\tthis.sortColumn = nColumn;\r\n\r\n\tif (typeof this.onbeforesort == \"function\")\r\n\t\tthis.onbeforesort();\r\n\r\n\tvar f = this.getSortFunction(sSortType, nColumn);\r\n\tvar a = this.getCache(sSortType, nColumn);\r\n\tvar tBody = this.tBody;\r\n\r\n\ta.sort(f);\r\n\r\n\tif (this.descending)\r\n\t\ta.reverse();\r\n\r\n\tif (SortableTable.removeBeforeSort) {\r\n\t\t// remove from doc\r\n\t\tvar nextSibling = tBody.nextSibling;\r\n\t\tvar p = tBody.parentNode;\r\n\t\tp.removeChild(tBody);\r\n\t}\r\n\r\n\t// insert in the new order\r\n\tvar l = a.length;\r\n\tfor (var i = 0; i < l; i++)\r\n\t\ttBody.appendChild(a[i].element);\r\n\r\n\tif (SortableTable.removeBeforeSort) {\r\n\t\t// insert into doc\r\n\t\tp.insertBefore(tBody, nextSibling);\r\n\t}\r\n\r\n\tthis.updateHeaderArrows();\r\n\r\n\tthis.destroyCache(a);\r\n\r\n\tif (typeof this.onsort == \"function\")\r\n\t\tthis.onsort();\r\n};\r\n\r\nSortableTable.prototype.asyncSort = function (nColumn, bDescending, sSortType) {\r\n\tvar oThis = this;\r\n\tthis._asyncsort = function () {\r\n\t\toThis.sort(nColumn, bDescending, sSortType);\r\n\t};\r\n\twindow.setTimeout(this._asyncsort, 1);\r\n};\r\n\r\nSortableTable.prototype.getCache = function (sType, nColumn) {\r\n\tif (!this.tBody) return [];\r\n\tvar rows = this.tBody.rows;\r\n\tvar l = rows.length;\r\n\tvar a = new Array(l);\r\n\tvar r;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tr = rows[i];\r\n\t\ta[i] = {\r\n\t\t\tvalue:\t\tthis.getRowValue(r, sType, nColumn),\r\n\t\t\telement:\tr\r\n\t\t};\r\n\t};\r\n\treturn a;\r\n};\r\n\r\nSortableTable.prototype.destroyCache = function (oArray) {\r\n\tvar l = oArray.length;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\toArray[i].value = null;\r\n\t\toArray[i].element = null;\r\n\t\toArray[i] = null;\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.getRowValue = function (oRow, sType, nColumn) {\r\n\t// if we have defined a custom getRowValue use that\r\n\tif (this._sortTypeInfo[sType] && this._sortTypeInfo[sType].getRowValue)\r\n\t\treturn this._sortTypeInfo[sType].getRowValue(oRow, nColumn);\r\n\r\n\tvar s;\r\n\tvar c = oRow.cells[nColumn];\r\n\tif (typeof c.innerText != \"undefined\")\r\n\t\ts = c.innerText;\r\n\telse\r\n\t\ts = SortableTable.getInnerText(c);\r\n\treturn this.getValueFromString(s, sType);\r\n};\r\n\r\nSortableTable.getInnerText = function (oNode) {\r\n\tvar s = \"\";\r\n\tvar cs = oNode.childNodes;\r\n\tvar l = cs.length;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tswitch (cs[i].nodeType) {\r\n\t\t\tcase 1: //ELEMENT_NODE\r\n\t\t\t\ts += SortableTable.getInnerText(cs[i]);\r\n\t\t\t\tbreak;\r\n\t\t\tcase 3:\t//TEXT_NODE\r\n\t\t\t\ts += cs[i].nodeValue;\r\n\t\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n\treturn s;\r\n};\r\n\r\nSortableTable.prototype.getValueFromString = function (sText, sType) {\r\n\tif (this._sortTypeInfo[sType])\r\n\t\treturn this._sortTypeInfo[sType].getValueFromString( sText );\r\n\treturn sText;\r\n\t/*\r\n\tswitch (sType) {\r\n\t\tcase \"Number\":\r\n\t\t\treturn Number(sText);\r\n\t\tcase \"CaseInsensitiveString\":\r\n\t\t\treturn sText.toUpperCase();\r\n\t\tcase \"Date\":\r\n\t\t\tvar parts = sText.split(\"-\");\r\n\t\t\tvar d = new Date(0);\r\n\t\t\td.setFullYear(parts[0]);\r\n\t\t\td.setDate(parts[2]);\r\n\t\t\td.setMonth(parts[1] - 1);\r\n\t\t\treturn d.valueOf();\r\n\t}\r\n\treturn sText;\r\n\t*/\r\n\t};\r\n\r\nSortableTable.prototype.getSortFunction = function (sType, nColumn) {\r\n\tif (this._sortTypeInfo[sType])\r\n\t\treturn this._sortTypeInfo[sType].compare;\r\n\treturn SortableTable.basicCompare;\r\n};\r\n\r\nSortableTable.prototype.destroy = function () {\r\n\tthis.uninitHeader();\r\n\tvar win = this.document.parentWindow;\r\n\tif (win && typeof win.detachEvent != \"undefined\") {\t// only IE needs this\r\n\t\twin.detachEvent(\"onunload\", this._onunload);\r\n\t}\r\n\tthis._onunload = null;\r\n\tthis.element = null;\r\n\tthis.tHead = null;\r\n\tthis.tBody = null;\r\n\tthis.document = null;\r\n\tthis._headerOnclick = null;\r\n\tthis.sortTypes = null;\r\n\tthis._asyncsort = null;\r\n\tthis.onsort = null;\r\n};\r\n\r\n// Adds a sort type to all instance of SortableTable\r\n// sType : String - the identifier of the sort type\r\n// fGetValueFromString : function ( s : string ) : T - A function that takes a\r\n//    string and casts it to a desired format. If left out the string is just\r\n//    returned\r\n// fCompareFunction : function ( n1 : T, n2 : T ) : Number - A normal JS sort\r\n//    compare function. Takes two values and compares them. If left out less than,\r\n//    <, compare is used\r\n// fGetRowValue : function( oRow : HTMLTRElement, nColumn : int ) : T - A function\r\n//    that takes the row and the column index and returns the value used to compare.\r\n//    If left out then the innerText is first taken for the cell and then the\r\n//    fGetValueFromString is used to convert that string the desired value and type\r\n\r\nSortableTable.prototype.addSortType = function (sType, fGetValueFromString, fCompareFunction, fGetRowValue) {\r\n\tthis._sortTypeInfo[sType] = {\r\n\t\ttype:\t\t\t\tsType,\r\n\t\tgetValueFromString:\tfGetValueFromString || SortableTable.idFunction,\r\n\t\tcompare:\t\t\tfCompareFunction || SortableTable.basicCompare,\r\n\t\tgetRowValue:\t\tfGetRowValue\r\n\t};\r\n};\r\n\r\n// this removes the sort type from all instances of SortableTable\r\nSortableTable.prototype.removeSortType = function (sType) {\r\n\tdelete this._sortTypeInfo[sType];\r\n};\r\n\r\nSortableTable.basicCompare = function compare(n1, n2) {\r\n\tif (n1.value < n2.value)\r\n\t\treturn -1;\r\n\tif (n2.value < n1.value)\r\n\t\treturn 1;\r\n\treturn 0;\r\n};\r\n\r\nSortableTable.idFunction = function (x) {\r\n\treturn x;\r\n};\r\n\r\nSortableTable.toUpperCase = function (s) {\r\n\treturn s.toUpperCase();\r\n};\r\n\r\nSortableTable.toDate = function (s) {\r\n\tvar parts = s.split(\"-\");\r\n\tvar d = new Date(0);\r\n\td.setFullYear(parts[0]);\r\n\td.setDate(parts[2]);\r\n\td.setMonth(parts[1] - 1);\r\n\treturn d.valueOf();\r\n};\r\n\r\n\r\n// add sort types\r\nSortableTable.prototype.addSortType(\"Number\", Number);\r\nSortableTable.prototype.addSortType(\"CaseInsensitiveString\", SortableTable.toUpperCase);\r\nSortableTable.prototype.addSortType(\"Date\", SortableTable.toDate);\r\nSortableTable.prototype.addSortType(\"String\");\r\n// None is a special case\r\n"

/***/ }

});
//# sourceMappingURL=tf-1.js.map