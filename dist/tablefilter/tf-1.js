webpackJsonp([1],{

/***/ 434:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./array": 15,
		"./array.js": 15,
		"./const": 10,
		"./const.js": 10,
		"./cookie": 28,
		"./cookie.js": 28,
		"./dom": 3,
		"./dom.js": 3,
		"./emitter": 7,
		"./emitter.js": 7,
		"./event": 1,
		"./event.js": 1,
		"./extensions/advancedGrid/adapterEzEditTable": 435,
		"./extensions/advancedGrid/adapterEzEditTable.js": 435,
		"./extensions/advancedGrid/advancedGrid": 436,
		"./extensions/advancedGrid/advancedGrid.js": 436,
		"./extensions/colOps/colOps": 437,
		"./extensions/colOps/colOps.js": 437,
		"./extensions/colsVisibility/colsVisibility": 438,
		"./extensions/colsVisibility/colsVisibility.js": 438,
		"./extensions/filtersVisibility/filtersVisibility": 439,
		"./extensions/filtersVisibility/filtersVisibility.js": 439,
		"./extensions/sort/adapterSortabletable": 440,
		"./extensions/sort/adapterSortabletable.js": 440,
		"./extensions/sort/sort": 441,
		"./extensions/sort/sort.js": 441,
		"./feature": 9,
		"./feature.js": 9,
		"./modules/alternateRows": 23,
		"./modules/alternateRows.js": 23,
		"./modules/checkList": 17,
		"./modules/checkList.js": 17,
		"./modules/clearButton": 21,
		"./modules/clearButton.js": 21,
		"./modules/dateType": 29,
		"./modules/dateType.js": 29,
		"./modules/dropdown": 14,
		"./modules/dropdown.js": 14,
		"./modules/gridLayout": 8,
		"./modules/gridLayout.js": 8,
		"./modules/hash": 26,
		"./modules/hash.js": 26,
		"./modules/help": 22,
		"./modules/help.js": 22,
		"./modules/highlightKeywords": 12,
		"./modules/highlightKeywords.js": 12,
		"./modules/loader": 11,
		"./modules/loader.js": 11,
		"./modules/noResults": 24,
		"./modules/noResults.js": 24,
		"./modules/paging": 20,
		"./modules/paging.js": 20,
		"./modules/popupFilter": 13,
		"./modules/popupFilter.js": 13,
		"./modules/rowsCounter": 18,
		"./modules/rowsCounter.js": 18,
		"./modules/state": 25,
		"./modules/state.js": 25,
		"./modules/statusBar": 19,
		"./modules/statusBar.js": 19,
		"./modules/storage": 27,
		"./modules/storage.js": 27,
		"./number": 6,
		"./number.js": 6,
		"./root": 2,
		"./root.js": 2,
		"./sort": 16,
		"./sort.js": 16,
		"./string": 5,
		"./string.js": 5,
		"./types": 4,
		"./types.js": 4
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
	webpackContext.id = 434;


/***/ },

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _const = __webpack_require__(10);
	
	var _root = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var INSTANTIATION_ERROR = 'Failed to instantiate EditTable object.\n    \n"ezEditTable" dependency not found.';
	
	/**
	 * Adapter module for ezEditTable, an external library providing advanced
	 * grid features (selection and edition):
	 * http://codecanyon.net/item/ezedittable-enhance-html-tables/2425123?ref=koalyptus
	 */
	
	var AdapterEzEditTable = function (_Feature) {
	    _inherits(AdapterEzEditTable, _Feature);
	
	    /**
	     * Creates an instance of AdapterEzEditTable
	     *
	     * @param {TableFilter} tf TableFilter instance
	     * @param {Object} cfg Configuration options for ezEditTable library
	     */
	    function AdapterEzEditTable(tf, cfg) {
	        _classCallCheck(this, AdapterEzEditTable);
	
	        /**
	         * Module description
	         * @type {String}
	         */
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, cfg.name));
	
	        _this.desc = cfg.description || 'ezEditTable adapter';
	
	        /**
	         * Filename of ezEditTable library
	         * @type {String}
	         */
	        _this.filename = cfg.filename || 'ezEditTable.js';
	
	        /**
	         * Path to ezEditTable library
	         * @type {String}
	         */
	        _this.vendorPath = cfg.vendor_path;
	
	        /**
	         * Load ezEditTable stylesheet
	         * @type {Boolean}
	         */
	        _this.loadStylesheet = Boolean(cfg.load_stylesheet);
	
	        /**
	         * Path to ezEditTable stylesheet
	         * @type {String}
	         */
	        _this.stylesheet = cfg.stylesheet || _this.vendorPath + 'ezEditTable.css';
	
	        /**
	         * Name of ezEditTable stylesheet
	         * @type {String}
	         */
	        _this.stylesheetName = cfg.stylesheet_name || 'ezEditTableCss';
	
	        // Enable the ezEditTable's scroll into view behaviour if grid layout on
	        cfg.scroll_into_view = cfg.scroll_into_view === false ? false : tf.gridLayout;
	
	        /**
	         * ezEditTable instance
	         * @type {EditTable}
	         * @private
	         */
	        _this._ezEditTable = null;
	
	        /**
	         * ezEditTable configuration
	         * @private
	         */
	        _this.cfg = cfg;
	
	        _this.enable();
	        return _this;
	    }
	
	    /**
	     * Conditionally load ezEditTable library and set advanced grid
	     */
	
	
	    AdapterEzEditTable.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	        var tf = this.tf;
	        if (_root.root.EditTable) {
	            this._setAdvancedGrid();
	        } else {
	            var path = this.vendorPath + this.filename;
	            tf.import(this.filename, path, function () {
	                return _this2._setAdvancedGrid();
	            });
	        }
	        if (this.loadStylesheet && !tf.isImported(this.stylesheet, 'link')) {
	            tf.import(this.stylesheetName, this.stylesheet, null, 'link');
	        }
	
	        // TODO: hack to prevent ezEditTable enter key event hijaking.
	        // Needs to be fixed in the vendor's library
	        this.emitter.on(['filter-focus', 'filter-blur'], function () {
	            return _this2._toggleForInputFilter();
	        });
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
	    /**
	     * Instantiate ezEditTable component for advanced grid features
	     * @private
	     */
	
	
	    AdapterEzEditTable.prototype._setAdvancedGrid = function _setAdvancedGrid() {
	        var tf = this.tf;
	
	        //start row for EditTable constructor needs to be calculated
	        var startRow = void 0,
	            cfg = this.cfg,
	            thead = (0, _dom.tag)(tf.tbl, 'thead');
	
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
	            (function () {
	                //Row navigation needs to be calculated according to TableFilter's
	                //validRowsIndex array
	                var onAfterSelection = function onAfterSelection(et, selectedElm, e) {
	                    var slc = et.Selection;
	                    //Next valid filtered row needs to be selected
	                    var doSelect = function doSelect(nextRowIndex) {
	                        if (et.defaultSelection === 'row') {
	                            /* eslint-disable */
	                            slc.SelectRowByIndex(nextRowIndex);
	                            /* eslint-enable */
	                        } else {
	                            /* eslint-disable */
	                            et.ClearSelections();
	                            /* eslint-enable */
	                            var cellIndex = selectedElm.cellIndex,
	                                _row = tf.tbl.rows[nextRowIndex];
	                            if (et.defaultSelection === 'both') {
	                                /* eslint-disable */
	                                slc.SelectRowByIndex(nextRowIndex);
	                                /* eslint-enable */
	                            }
	                            if (_row) {
	                                /* eslint-disable */
	                                slc.SelectCell(_row.cells[cellIndex]);
	                                /* eslint-enable */
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
	
	                    /* eslint-disable */
	                    keyCode = e !== undefined ? et.Event.GetKey(e) : 0,
	
	                    /* eslint-enable */
	                    isRowValid = validIndexes.indexOf(row.rowIndex) !== -1,
	                        nextRowIndex = void 0,
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
	                            } else if (rowIndex === validIndexes[0] && paging.currentPageNb !== 1) {
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
	                        /* eslint-disable */
	                        var row = slc.GetActiveRow();
	                        /* eslint-enable */
	                        if (row) {
	                            row.scrollIntoView(false);
	                        }
	                        /* eslint-disable */
	                        var cell = slc.GetActiveCell();
	                        /* eslint-enable */
	                        if (cell) {
	                            cell.scrollIntoView(false);
	                        }
	                    };
	                }
	
	                //Rows navigation when rows are filtered is performed with the
	                //EditTable row selection callback events
	                if (cfg.default_selection === 'row') {
	                    (function () {
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
	                    })();
	                } else {
	                    (function () {
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
	                    })();
	                }
	            })();
	        }
	        if (editable) {
	            (function () {
	                //Added or removed rows, TF rows number needs to be re-calculated
	                var fnE = cfg.on_added_dom_row;
	                cfg.on_added_dom_row = function () {
	                    tf.nbFilterableRows++;
	                    if (!tf.paging) {
	                        tf.emitter.emit('rows-changed', tf, this);
	                    } else {
	                        tf.nbFilterableRows++;
	                        tf.paging = false;
	                        tf.feature('paging').destroy();
	                        tf.feature('paging').reset();
	                    }
	                    if (tf.alternateRows) {
	                        tf.feature('alternateRows').init();
	                    }
	                    if (fnE) {
	                        fnE.call(null, arguments[0], arguments[1], arguments[2]);
	                    }
	                };
	                if (cfg.actions && cfg.actions['delete']) {
	                    (function () {
	                        var fnF = cfg.actions['delete'].on_after_submit;
	                        cfg.actions['delete'].on_after_submit = function () {
	                            tf.nbFilterableRows--;
	                            if (!tf.paging) {
	                                tf.emitter.emit('rows-changed', tf, this);
	                            } else {
	                                tf.nbFilterableRows--;
	                                tf.paging = false;
	                                tf.feature('paging').destroy();
	                                tf.feature('paging').reset(false);
	                            }
	                            if (tf.alternateRows) {
	                                tf.feature('alternateRows').init();
	                            }
	                            if (fnF) {
	                                fnF.call(null, arguments[0], arguments[1]);
	                            }
	                        };
	                    })();
	                }
	            })();
	        }
	
	        try {
	            /* eslint-disable */
	            this._ezEditTable = new EditTable(tf.id, cfg, startRow);
	            this._ezEditTable.Init();
	            /* eslint-enable */
	        } catch (e) {
	            throw new Error(INSTANTIATION_ERROR);
	        }
	
	        this.initialized = true;
	    };
	
	    /**
	     * Reset advanced grid when previously removed
	     */
	
	
	    AdapterEzEditTable.prototype.reset = function reset() {
	        var ezEditTable = this._ezEditTable;
	        if (ezEditTable) {
	            if (this.cfg.selection) {
	                /* eslint-disable */
	                ezEditTable.Selection.Set();
	                /* eslint-enable */
	            }
	            if (this.cfg.editable) {
	                /* eslint-disable */
	                ezEditTable.Editable.Set();
	                /* eslint-enable */
	            }
	        }
	    };
	
	    /**
	     * Toggle behaviour
	     */
	
	
	    AdapterEzEditTable.prototype.toggle = function toggle() {
	        var ezEditTable = this._ezEditTable;
	        if (ezEditTable.editable) {
	            /* eslint-disable */
	            ezEditTable.Editable.Remove();
	            /* eslint-enable */
	        } else {
	            /* eslint-disable */
	            ezEditTable.Editable.Set();
	            /* eslint-enable */
	        }
	        if (ezEditTable.selection) {
	            /* eslint-disable */
	            ezEditTable.Selection.Remove();
	            /* eslint-enable */
	        } else {
	            /* eslint-disable */
	            ezEditTable.Selection.Set();
	            /* eslint-enable */
	        }
	    };
	
	    AdapterEzEditTable.prototype._toggleForInputFilter = function _toggleForInputFilter() {
	        var tf = this.tf;
	        if (!tf.getActiveFilterId()) {
	            return;
	        }
	        var colIndex = tf.getColumnIndexFromFilterId(tf.getActiveFilterId());
	        var filterType = tf.getFilterType(colIndex);
	        if (filterType === _const.INPUT) {
	            this.toggle();
	        }
	    };
	
	    /**
	     * Remove advanced grid
	     */
	
	
	    AdapterEzEditTable.prototype.destroy = function destroy() {
	        var _this3 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	        var ezEditTable = this._ezEditTable;
	        if (ezEditTable) {
	            if (this.cfg.selection) {
	                /* eslint-disable */
	                ezEditTable.Selection.ClearSelections();
	                ezEditTable.Selection.Remove();
	                /* eslint-enable */
	            }
	            if (this.cfg.editable) {
	                /* eslint-disable */
	                ezEditTable.Editable.Remove();
	                /* eslint-enable */
	            }
	        }
	
	        this.emitter.off(['filter-focus', 'filter-blur'], function () {
	            return _this3._toggleForInputFilter();
	        });
	        this.initialized = false;
	    };
	
	    return AdapterEzEditTable;
	}(_feature.Feature);
	
	exports.default = AdapterEzEditTable;

/***/ },

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _adapterEzEditTable = __webpack_require__(435);
	
	var _adapterEzEditTable2 = _interopRequireDefault(_adapterEzEditTable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _adapterEzEditTable2.default;

/***/ },

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Column calculations extension
	 */
	var ColOps = function (_Feature) {
	    _inherits(ColOps, _Feature);
	
	    /**
	     * Creates an instance of ColOps
	     *
	     * @param {TableFilter} tf TableFilter instance
	     * @param {Object} opts Configuration object
	     */
	    function ColOps(tf, opts) {
	        _classCallCheck(this, ColOps);
	
	        /**
	         * Callback fired before columns operations start
	         * @type {Function}
	         */
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, opts.name));
	
	        _this.onBeforeOperation = (0, _types.isFn)(opts.on_before_operation) ? opts.on_before_operation : null;
	
	        /**
	         * Callback fired after columns operations are completed
	         * @type {Function}
	         */
	        _this.onAfterOperation = (0, _types.isFn)(opts.on_after_operation) ? opts.on_after_operation : null;
	
	        /**
	         * Configuration options
	         * @type {Object}
	         */
	        _this.opts = opts;
	
	        _this.enable();
	        return _this;
	    }
	
	    /**
	     * Initializes ColOps instance
	     */
	
	
	    ColOps.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	        // subscribe to events
	        this.emitter.on(['after-filtering'], function () {
	            return _this2.calc();
	        });
	
	        this.calc();
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	    };
	
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
	
	
	    ColOps.prototype.calc = function calc() {
	        var tf = this.tf;
	        if (!tf.isInitialized()) {
	            return;
	        }
	
	        if (this.onBeforeOperation) {
	            this.onBeforeOperation.call(null, tf, this);
	        }
	        this.emitter.emit('before-column-operation', tf, this);
	
	        var opts = this.opts,
	            labelId = opts.id,
	            colIndex = opts.col,
	            operation = opts.operation,
	            outputType = opts.write_method,
	            totRowIndex = opts.tot_row_index,
	            excludeRow = opts.exclude_row,
	            decimalPrecision = (0, _types.isUndef)(opts.decimal_precision) ? 2 : opts.decimal_precision;
	
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
	
	        if ((0, _types.isArray)(labelId) && (0, _types.isArray)(colIndex) && (0, _types.isArray)(operation)) {
	            var rows = tf.tbl.rows,
	                colvalues = [],
	                ucol = 0;
	
	            for (; ucol <= ucolMax; ucol++) {
	                //this retrieves col values
	                //use ucolIndex because we only want to pass through this loop
	                //once for each column get the values in this unique column
	                colvalues.push(tf.getColValues(ucolIndex[ucol], false, true, excludeRow));
	
	                //next: calculate all operations for this column
	                var result = void 0,
	                    nbvalues = 0,
	                    temp = void 0,
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
	                    mThisCol = -1,
	                    k = 0,
	                    j = 0,
	                    i = 0;
	
	                for (; k < colIndex.length; k++) {
	                    if (colIndex[k] === ucolIndex[ucol]) {
	                        mThisCol++;
	                        opsThisCol[mThisCol] = operation[k].toLowerCase();
	                        decThisCol[mThisCol] = decimalPrecision[k];
	                        labThisCol[mThisCol] = labelId[k];
	                        oTypeThisCol = (0, _types.isArray)(outputType) ? outputType[k] : null;
	
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
	
	                for (; j < colvalues[ucol].length; j++) {
	                    //sort the list for calculation of median and quartiles
	                    if (q1Flag === 1 || q3Flag === 1 || medFlag === 1) {
	                        if (j < colvalues[ucol].length - 1) {
	                            for (k = j + 1; k < colvalues[ucol].length; k++) {
	                                /* eslint-disable */
	                                if (eval(colvalues[ucol][k]) < eval(colvalues[ucol][j])) {
	                                    /* eslint-enable */
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
	                var posa = void 0;
	                if (q1Flag === 1) {
	                    posa = 0.0;
	                    posa = Math.floor(nbvalues / 4);
	                    if (4 * posa === nbvalues) {
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
	
	                for (; i <= mThisCol; i++) {
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
	
	                        if ((0, _dom.elm)(labThisCol[i])) {
	                            switch (oTypeThisCol.toLowerCase()) {
	                                case 'innerhtml':
	                                    if (isNaN(result) || !isFinite(result) || nbvalues === 0) {
	                                        (0, _dom.elm)(labThisCol[i]).innerHTML = '.';
	                                    } else {
	                                        (0, _dom.elm)(labThisCol[i]).innerHTML = result;
	                                    }
	                                    break;
	                                case 'setvalue':
	                                    (0, _dom.elm)(labThisCol[i]).value = result;
	                                    break;
	                                case 'createtextnode':
	                                    var oldnode = (0, _dom.elm)(labThisCol[i]).firstChild;
	                                    var txtnode = (0, _dom.createText)(result);
	                                    (0, _dom.elm)(labThisCol[i]).replaceChild(txtnode, oldnode);
	                                    break;
	                            } //switch
	                        }
	                    } else {
	                        try {
	                            if (isNaN(result) || !isFinite(result) || nbvalues === 0) {
	                                (0, _dom.elm)(labThisCol[i]).innerHTML = '.';
	                            } else {
	                                (0, _dom.elm)(labThisCol[i]).innerHTML = result.toFixed(precision);
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
	            this.onAfterOperation.call(null, tf, this);
	        }
	        this.emitter.emit('after-column-operation', tf, this);
	    };
	
	    /**
	     * Remove extension
	     */
	
	
	    ColOps.prototype.destroy = function destroy() {
	        var _this3 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	        // unsubscribe to events
	        this.emitter.off(['after-filtering'], function () {
	            return _this3.calc();
	        });
	        this.initialized = false;
	    };
	
	    return ColOps;
	}(_feature.Feature);
	
	exports.default = ColOps;

/***/ },

/***/ 438:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	var _event = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Columns Visibility extension
	 */
	var ColsVisibility = function (_Feature) {
	    _inherits(ColsVisibility, _Feature);
	
	    /**
	     * Creates an instance of ColsVisibility
	     * @param {TableFilter} tf TableFilter instance
	     * @param {Object} Configuration object
	     */
	    function ColsVisibility(tf, f) {
	        _classCallCheck(this, ColsVisibility);
	
	        // Configuration object
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, f.name));
	
	        var cfg = _this.config;
	
	        /**
	         * Module name
	         * @type {String}
	         */
	        _this.name = f.name;
	
	        /**
	         * Module description
	         * @type {String}
	         */
	        _this.desc = f.description || 'Columns visibility manager';
	
	        /**
	         * show/hide columns container element
	         * @private
	         */
	        _this.spanEl = null;
	
	        /**
	         * show/hide columns button element
	         * @private
	         */
	        _this.btnEl = null;
	
	        /**
	         * show/hide columns main container element
	         * @private
	         */
	        _this.contEl = null;
	
	        /**
	         * Enable tick to hide a column, defaults to true
	         * @type {Boolean}
	         */
	        _this.tickToHide = f.tick_to_hide === false ? false : true;
	
	        /**
	         * Enable columns manager UI, defaults to true
	         * @type {Boolean}
	         */
	        _this.manager = f.manager === false ? false : true;
	
	        /**
	         * Headers HTML table reference only if headers are external
	         * @type {DOMElement}
	         */
	        _this.headersTbl = f.headers_table || null;
	
	        /**
	         * Headers row index only if headers are external
	         * @type {Number}
	         */
	        _this.headersIndex = f.headers_index || 1;
	
	        /**
	         * ID of main container element
	         * @type {String}
	         */
	        _this.contElTgtId = f.container_target_id || null;
	
	        /**
	         * Alternative text for column headers in column manager UI
	         * @type {Array}
	         */
	        _this.headersText = f.headers_text || null;
	
	        /**
	         * ID of button's container element
	         * @type {String}
	         */
	        _this.btnTgtId = f.btn_target_id || null;
	
	        /**
	         * Button's text, defaults to Columns&#9660;
	         * @type {String}
	         */
	        _this.btnText = f.btn_text || 'Columns&#9660;';
	
	        /**
	         * Button's inner HTML
	         * @type {String}
	         */
	        _this.btnHtml = f.btn_html || null;
	
	        /**
	         * Css class for button
	         * @type {String}
	         */
	        _this.btnCssClass = f.btn_css_class || 'colVis';
	
	        /**
	         * Columns manager UI close link text, defaults to 'Close'
	         * @type {String}
	         */
	        _this.btnCloseText = f.btn_close_text || 'Close';
	
	        /**
	         * Columns manager UI close link HTML
	         * @type {String}
	         */
	        _this.btnCloseHtml = f.btn_close_html || null;
	
	        /**
	         * Css for columns manager UI close link
	         * @type {String}
	         */
	        _this.btnCloseCssClass = f.btn_close_css_class || _this.btnCssClass;
	
	        /**
	         * Extension's stylesheet filename
	         * @type {String}
	         */
	        _this.stylesheet = f.stylesheet || 'colsVisibility.css';
	
	        /**
	         * Extension's prefix
	         * @private
	         */
	        _this.prfx = 'colVis_';
	
	        /**
	         * Css for columns manager UI span
	         * @type {String}
	         */
	        _this.spanCssClass = f.span_css_class || 'colVisSpan';
	
	        /**
	         * Main container prefix
	         * @private
	         */
	        _this.prfxCont = _this.prfx + 'Cont_';
	
	        /**
	         * Css for columns manager UI main container
	         * @type {String}
	         */
	        _this.contCssClass = f.cont_css_class || 'colVisCont';
	
	        /**
	         * Css for columns manager UI checklist (ul)
	         * @type {String}
	         */
	        _this.listCssClass = cfg.list_css_class || 'cols_checklist';
	
	        /**
	         * Css for columns manager UI checklist item (li)
	         * @type {String}
	         */
	        _this.listItemCssClass = cfg.checklist_item_css_class || 'cols_checklist_item';
	
	        /**
	         * Css for columns manager UI checklist item selected state (li)
	         * @type {String}
	         */
	        _this.listSlcItemCssClass = cfg.checklist_selected_item_css_class || 'cols_checklist_slc_item';
	
	        /**
	         * Text preceding the columns list, defaults to 'Hide' or 'Show'
	         * depending on tick mode (tick_to_hide option)
	         * @type {String}
	         */
	        _this.text = f.text || (_this.tickToHide ? 'Hide: ' : 'Show: ');
	
	        /**
	         * List of columns indexes to be hidden at initialization
	         * @type {Array}
	         */
	        _this.atStart = f.at_start || [];
	
	        /**
	         * Enable hover behaviour on columns manager button/link
	         * @type {Boolean}
	         */
	        _this.enableHover = Boolean(f.enable_hover);
	
	        /**
	         * Enable select all option, disabled by default
	         * @type {Boolean}
	         */
	        _this.enableTickAll = Boolean(f.enable_tick_all);
	
	        /**
	         * Text for select all option, defaults to 'Select all:'
	         * @type {String}
	         */
	        _this.tickAllText = f.tick_all_text || 'Select all:';
	
	        /**
	         * List of indexes of hidden columns
	         * @private
	         */
	        _this.hiddenCols = [];
	
	        /**
	         * Callback fired when the extension is initialized
	         * @type {Function}
	         */
	        _this.onLoaded = (0, _types.isFn)(f.on_loaded) ? f.on_loaded : null;
	
	        /**
	         * Callback fired before the columns manager is opened
	         * @type {Function}
	         */
	        _this.onBeforeOpen = (0, _types.isFn)(f.on_before_open) ? f.on_before_open : null;
	
	        /**
	         * Callback fired after the columns manager is opened
	         * @type {Function}
	         */
	        _this.onAfterOpen = (0, _types.isFn)(f.on_after_open) ? f.on_after_open : null;
	
	        /**
	         * Callback fired before the columns manager is closed
	         * @type {Function}
	         */
	        _this.onBeforeClose = (0, _types.isFn)(f.on_before_close) ? f.on_before_close : null;
	
	        /**
	         * Callback fired after the columns manager is closed
	         * @type {Function}
	         */
	        _this.onAfterClose = (0, _types.isFn)(f.on_after_close) ? f.on_after_close : null;
	
	        /**
	         * Callback fired before a column is hidden
	         * @type {Function}
	         */
	        _this.onBeforeColHidden = (0, _types.isFn)(f.on_before_col_hidden) ? f.on_before_col_hidden : null;
	
	        /**
	         * Callback fired after a column is hidden
	         * @type {Function}
	         */
	        _this.onAfterColHidden = (0, _types.isFn)(f.on_after_col_hidden) ? f.on_after_col_hidden : null;
	
	        /**
	         * Callback fired before a column is displayed
	         * @type {Function}
	         */
	        _this.onBeforeColDisplayed = (0, _types.isFn)(f.on_before_col_displayed) ? f.on_before_col_displayed : null;
	
	        /**
	         * Callback fired after a column is displayed
	         * @type {Function}
	         */
	        _this.onAfterColDisplayed = (0, _types.isFn)(f.on_after_col_displayed) ? f.on_after_col_displayed : null;
	
	        //Grid layout support
	        if (tf.gridLayout) {
	            _this.headersTbl = tf.feature('gridLayout').headTbl; //headers table
	            _this.headersIndex = 0; //headers index
	            _this.onAfterColDisplayed = function () {};
	            _this.onAfterColHidden = function () {};
	        }
	
	        //Loads extension stylesheet
	        tf.import(f.name + 'Style', tf.stylePath + _this.stylesheet, null, 'link');
	
	        _this.enable();
	        return _this;
	    }
	
	    /**
	     * Toggle columns manager UI
	     */
	
	
	    ColsVisibility.prototype.toggle = function toggle() {
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
	    };
	
	    /**
	     * Check an item in columns manager UI
	     * @private
	     */
	
	
	    ColsVisibility.prototype.checkItem = function checkItem(lbl) {
	        var li = lbl.parentNode;
	        if (!li || !lbl) {
	            return;
	        }
	        var isChecked = lbl.firstChild.checked;
	        var colIndex = lbl.firstChild.getAttribute('id').split('_')[1];
	        colIndex = parseInt(colIndex, 10);
	        if (isChecked) {
	            (0, _dom.addClass)(li, this.listSlcItemCssClass);
	        } else {
	            (0, _dom.removeClass)(li, this.listSlcItemCssClass);
	        }
	
	        var hide = false;
	        if (this.tickToHide && isChecked || !this.tickToHide && !isChecked) {
	            hide = true;
	        }
	        this.setHidden(colIndex, hide);
	    };
	
	    /**
	     * Initializes ColsVisibility instance
	     */
	
	
	    ColsVisibility.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized || !this.manager) {
	            return;
	        }
	
	        this.emitter.on(['hide-column'], function (tf, colIndex) {
	            return _this2.hideCol(colIndex);
	        });
	
	        this.buildBtn();
	        this.buildManager();
	
	        /**
	         * @inherited
	         */
	        this.initialized = true;
	
	        this.emitter.emit('columns-visibility-initialized', this.tf, this);
	
	        // Hide columns at start at very end of initialization, do not move
	        // as order is important
	        this._hideAtStart();
	    };
	
	    /**
	     * Build main button UI
	     */
	
	
	    ColsVisibility.prototype.buildBtn = function buildBtn() {
	        var _this3 = this;
	
	        if (this.btnEl) {
	            return;
	        }
	        var tf = this.tf;
	        var span = (0, _dom.createElm)('span', ['id', this.prfx + tf.id]);
	        span.className = this.spanCssClass;
	
	        //Container element (rdiv or custom element)
	        if (!this.btnTgtId) {
	            tf.setToolbar();
	        }
	        var targetEl = !this.btnTgtId ? tf.rDiv : (0, _dom.elm)(this.btnTgtId);
	
	        if (!this.btnTgtId) {
	            var firstChild = targetEl.firstChild;
	            firstChild.parentNode.insertBefore(span, firstChild);
	        } else {
	            targetEl.appendChild(span);
	        }
	
	        if (!this.btnHtml) {
	            var btn = (0, _dom.createElm)('a', ['href', 'javascript:;']);
	            btn.className = this.btnCssClass;
	            btn.title = this.desc;
	
	            btn.innerHTML = this.btnText;
	            span.appendChild(btn);
	            if (!this.enableHover) {
	                (0, _event.addEvt)(btn, 'click', function (evt) {
	                    return _this3.toggle(evt);
	                });
	            } else {
	                (0, _event.addEvt)(btn, 'mouseover', function (evt) {
	                    return _this3.toggle(evt);
	                });
	            }
	        } else {
	            //Custom html
	            span.innerHTML = this.btnHtml;
	            var colVisEl = span.firstChild;
	            if (!this.enableHover) {
	                (0, _event.addEvt)(colVisEl, 'click', function (evt) {
	                    return _this3.toggle(evt);
	                });
	            } else {
	                (0, _event.addEvt)(colVisEl, 'mouseover', function (evt) {
	                    return _this3.toggle(evt);
	                });
	            }
	        }
	
	        this.spanEl = span;
	        this.btnEl = this.spanEl.firstChild;
	
	        if (this.onLoaded) {
	            this.onLoaded.call(null, this);
	        }
	    };
	
	    /**
	     * Build columns manager UI
	     */
	
	
	    ColsVisibility.prototype.buildManager = function buildManager() {
	        var _this4 = this;
	
	        var tf = this.tf;
	
	        var container = !this.contElTgtId ? (0, _dom.createElm)('div', ['id', this.prfxCont + tf.id]) : (0, _dom.elm)(this.contElTgtId);
	        container.className = this.contCssClass;
	
	        //Extension description
	        var extNameLabel = (0, _dom.createElm)('p');
	        extNameLabel.innerHTML = this.text;
	        container.appendChild(extNameLabel);
	
	        //Headers list
	        var ul = (0, _dom.createElm)('ul', ['id', 'ul' + this.name + '_' + tf.id]);
	        ul.className = this.listCssClass;
	
	        var tbl = this.headersTbl ? this.headersTbl : tf.tbl;
	        var headerIndex = this.headersTbl ? this.headersIndex : tf.getHeadersRowIndex();
	        var headerRow = tbl.rows[headerIndex];
	
	        //Tick all option
	        if (this.enableTickAll) {
	            (function () {
	                var li = (0, _dom.createCheckItem)('col__' + tf.id, _this4.tickAllText, _this4.tickAllText);
	                (0, _dom.addClass)(li, _this4.listItemCssClass);
	                ul.appendChild(li);
	                li.check.checked = !_this4.tickToHide;
	
	                (0, _event.addEvt)(li.check, 'click', function () {
	                    for (var h = 0; h < headerRow.cells.length; h++) {
	                        var itm = (0, _dom.elm)('col_' + h + '_' + tf.id);
	                        if (itm && li.check.checked !== itm.checked) {
	                            itm.click();
	                            itm.checked = li.check.checked;
	                        }
	                    }
	                });
	            })();
	        }
	
	        for (var i = 0; i < headerRow.cells.length; i++) {
	            var cell = headerRow.cells[i];
	            var cellText = this.headersText && this.headersText[i] ? this.headersText[i] : this._getHeaderText(cell);
	            var liElm = (0, _dom.createCheckItem)('col_' + i + '_' + tf.id, cellText, cellText);
	            (0, _dom.addClass)(liElm, this.listItemCssClass);
	            if (!this.tickToHide) {
	                (0, _dom.addClass)(liElm, this.listSlcItemCssClass);
	            }
	            ul.appendChild(liElm);
	            if (!this.tickToHide) {
	                liElm.check.checked = true;
	            }
	
	            (0, _event.addEvt)(liElm.check, 'click', function (evt) {
	                var elm = (0, _event.targetEvt)(evt);
	                var lbl = elm.parentNode;
	                _this4.checkItem(lbl);
	            });
	        }
	
	        //separator
	        var p = (0, _dom.createElm)('p', ['align', 'center']);
	        var btn = void 0;
	        //Close link
	        if (!this.btnCloseHtml) {
	            btn = (0, _dom.createElm)('a', ['href', 'javascript:;']);
	            btn.className = this.btnCloseCssClass;
	            btn.innerHTML = this.btnCloseText;
	            (0, _event.addEvt)(btn, 'click', function (evt) {
	                return _this4.toggle(evt);
	            });
	            p.appendChild(btn);
	        } else {
	            p.innerHTML = this.btnCloseHtml;
	            btn = p.firstChild;
	            (0, _event.addEvt)(btn, 'click', function (evt) {
	                return _this4.toggle(evt);
	            });
	        }
	
	        container.appendChild(ul);
	        container.appendChild(p);
	
	        this.btnEl.parentNode.insertBefore(container, this.btnEl);
	        this.contEl = container;
	    };
	
	    /**
	     * Hide or show specified columns
	     * @param {Number} colIndex Column index
	     * @param {Boolean} hide    Hide column if true or show if false
	     */
	
	
	    ColsVisibility.prototype.setHidden = function setHidden(colIndex, hide) {
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
	        var itemIndex = hiddenCols.indexOf(colIndex);
	        if (hide) {
	            if (itemIndex === -1) {
	                this.hiddenCols.push(colIndex);
	            }
	        } else {
	            if (itemIndex !== -1) {
	                this.hiddenCols.splice(itemIndex, 1);
	            }
	        }
	
	        var gridLayout = void 0;
	        var headTbl = void 0;
	        var gridColElms = void 0;
	        if (hide) {
	            //This event is fired just after a column is displayed for
	            //grid_layout support
	            //TODO: grid layout module should be responsible for those
	            //calculations
	            if (tf.gridLayout) {
	                gridLayout = tf.feature('gridLayout');
	                headTbl = gridLayout.headTbl;
	                gridColElms = gridLayout.colElms;
	                var hiddenWidth = parseInt(gridColElms[colIndex].style.width, 10);
	
	                var headTblW = parseInt(headTbl.style.width, 10);
	                headTbl.style.width = headTblW - hiddenWidth + 'px';
	                tbl.style.width = headTbl.style.width;
	            }
	            if (this.onAfterColHidden) {
	                this.onAfterColHidden.call(null, this, colIndex);
	            }
	            this.emitter.emit('column-hidden', tf, this, colIndex, this.hiddenCols);
	        }
	
	        if (!hide) {
	            //This event is fired just after a column is displayed for
	            //grid_layout support
	            //TODO: grid layout module should be responsible for those
	            //calculations
	            if (tf.gridLayout) {
	                gridLayout = tf.feature('gridLayout');
	                headTbl = gridLayout.headTbl;
	                gridColElms = gridLayout.colElms;
	                var width = parseInt(gridColElms[colIndex].style.width, 10);
	                headTbl.style.width = parseInt(headTbl.style.width, 10) + width + 'px';
	                tf.tbl.style.width = headTbl.style.width;
	            }
	            if (this.onAfterColDisplayed) {
	                this.onAfterColDisplayed.call(null, this, colIndex);
	            }
	            this.emitter.emit('column-shown', tf, this, colIndex, this.hiddenCols);
	        }
	    };
	
	    /**
	     * Show specified column
	     * @param  {Number} colIndex Column index
	     */
	
	
	    ColsVisibility.prototype.showCol = function showCol(colIndex) {
	        if (colIndex === undefined || !this.isColHidden(colIndex)) {
	            return;
	        }
	        if (this.manager && this.contEl) {
	            var itm = (0, _dom.elm)('col_' + colIndex + '_' + this.tf.id);
	            if (itm) {
	                itm.click();
	            }
	        } else {
	            this.setHidden(colIndex, false);
	        }
	    };
	
	    /**
	     * Hide specified column
	     * @param  {Number} colIndex Column index
	     */
	
	
	    ColsVisibility.prototype.hideCol = function hideCol(colIndex) {
	        if (colIndex === undefined || this.isColHidden(colIndex)) {
	            return;
	        }
	        if (this.manager && this.contEl) {
	            var itm = (0, _dom.elm)('col_' + colIndex + '_' + this.tf.id);
	            if (itm) {
	                itm.click();
	            }
	        } else {
	            this.setHidden(colIndex, true);
	        }
	    };
	
	    /**
	     * Determine if specified column is hidden
	     * @param  {Number} colIndex Column index
	     */
	
	
	    ColsVisibility.prototype.isColHidden = function isColHidden(colIndex) {
	        if (this.hiddenCols.indexOf(colIndex) !== -1) {
	            return true;
	        }
	        return false;
	    };
	
	    /**
	     * Toggle visibility of specified column
	     * @param  {Number} colIndex Column index
	     */
	
	
	    ColsVisibility.prototype.toggleCol = function toggleCol(colIndex) {
	        if (colIndex === undefined || this.isColHidden(colIndex)) {
	            this.showCol(colIndex);
	        } else {
	            this.hideCol(colIndex);
	        }
	    };
	
	    /**
	     * Return the indexes of the columns currently hidden
	     * @return {Array} column indexes
	     */
	
	
	    ColsVisibility.prototype.getHiddenCols = function getHiddenCols() {
	        return this.hiddenCols;
	    };
	
	    /**
	     * Remove the columns manager
	     */
	
	
	    ColsVisibility.prototype.destroy = function destroy() {
	        var _this5 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	        if ((0, _dom.elm)(this.contElTgtId)) {
	            (0, _dom.elm)(this.contElTgtId).innerHTML = '';
	        } else {
	            this.contEl.innerHTML = '';
	            (0, _dom.removeElm)(this.contEl);
	            this.contEl = null;
	        }
	        this.btnEl.innerHTML = '';
	        (0, _dom.removeElm)(this.btnEl);
	        this.btnEl = null;
	
	        this.emitter.off(['hide-column'], function (tf, colIndex) {
	            return _this5.hideCol(colIndex);
	        });
	
	        this.initialized = false;
	    };
	
	    ColsVisibility.prototype._getHeaderText = function _getHeaderText(cell) {
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
	                    return (0, _dom.getText)(n);
	                }
	            }
	            continue;
	        }
	        return '';
	    };
	
	    ColsVisibility.prototype._hideCells = function _hideCells(tbl, colIndex, hide) {
	        for (var i = 0; i < tbl.rows.length; i++) {
	            var row = tbl.rows[i];
	            var cell = row.cells[colIndex];
	            if (cell) {
	                cell.style.display = hide ? 'none' : '';
	            }
	        }
	    };
	
	    ColsVisibility.prototype._hideAtStart = function _hideAtStart() {
	        var _this6 = this;
	
	        this.atStart.forEach(function (colIdx) {
	            _this6.hideCol(colIdx);
	        });
	    };
	
	    return ColsVisibility;
	}(_feature.Feature);
	
	exports.default = ColsVisibility;

/***/ },

/***/ 439:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	        value: true
	});
	
	var _feature = __webpack_require__(9);
	
	var _dom = __webpack_require__(3);
	
	var _types = __webpack_require__(4);
	
	var _event = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Filters Visibility extension
	 */
	var FiltersVisibility = function (_Feature) {
	        _inherits(FiltersVisibility, _Feature);
	
	        /**
	         * Creates an instance of FiltersVisibility
	         * @param {TableFilter} tf TableFilter instance
	         * @param {Object} Configuration object
	         */
	        function FiltersVisibility(tf, f) {
	                _classCallCheck(this, FiltersVisibility);
	
	                /**
	                 * Module name
	                 * @type {String}
	                 */
	                var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, f.name));
	
	                _this.name = f.name;
	
	                /**
	                 * Module description
	                 * @type {String}
	                 */
	                _this.desc = f.description || 'Filters row visibility manager';
	
	                /**
	                 * Extension's stylesheet filename
	                 * @type {String}
	                 */
	                _this.stylesheet = f.stylesheet || 'filtersVisibility.css';
	
	                /**
	                 * Expand icon filename
	                 * @type {String}
	                 */
	                _this.icnExpand = f.expand_icon_name || 'icn_exp.png';
	
	                /**
	                 * Collapse icon filename
	                 * @type {String}
	                 */
	                _this.icnCollapse = f.collapse_icon_name || 'icn_clp.png';
	
	                /**
	                 * Main container element
	                 * @private
	                 */
	                _this.contEl = null;
	
	                /**
	                 * Button element
	                 * @private
	                 */
	                _this.btnEl = null;
	
	                /**
	                 * Expand icon HTML
	                 * @private
	                 */
	                _this.icnExpandHtml = '<img src="' + tf.themesPath + _this.icnExpand + '" alt="Expand filters" >';
	
	                /**
	                 * Collapse icon HTML
	                 * @private
	                 */
	                _this.icnCollapseHtml = '<img src="' + tf.themesPath + _this.icnCollapse + '" alt="Collapse filters" >';
	
	                /**
	                 * Default text
	                 * @private
	                 */
	                _this.defaultText = 'Toggle filters';
	
	                /**
	                 * ID of main container element
	                 * @type {String}
	                 */
	                _this.targetId = f.target_id || null;
	
	                /**
	                 * Enable expand/collapse icon, defaults to true
	                 * @type {Boolean}
	                 */
	                _this.enableIcon = f.enable_icon === false ? false : true;
	
	                /**
	                 * Custom text for button
	                 * @type {String}
	                 */
	                _this.btnText = f.btn_text || '';
	
	                /**
	                 * Collapse button HTML
	                 * @private
	                 */
	                _this.collapseBtnHtml = _this.enableIcon ? _this.icnCollapseHtml + _this.btnText : _this.btnText || _this.defaultText;
	
	                /**
	                 * Expand button HTML
	                 * @private
	                 */
	                _this.expandBtnHtml = _this.enableIcon ? _this.icnExpandHtml + _this.btnText : _this.btnText || _this.defaultText;
	
	                /**
	                 * Button's custom HTML
	                 * @type {String}
	                 */
	                _this.btnHtml = f.btn_html || null;
	
	                /**
	                 * Css class for expand/collapse filters button
	                 * @type {String}
	                 */
	                _this.btnCssClass = f.btn_css_class || 'btnExpClpFlt';
	
	                /**
	                 * Css class for main container
	                 * @type {String}
	                 */
	                _this.contCssClass = f.cont_css_class || 'expClpFlt';
	
	                /**
	                 * Filters row index
	                 * @type {Number}
	                 */
	                _this.filtersRowIndex = !(0, _types.isUndef)(f.filters_row_index) ? f.filters_row_index : tf.getFiltersRowIndex();
	
	                /**
	                 * Make filters visible at initialization, defaults to true
	                 * @type {Boolean}
	                 */
	                _this.visibleAtStart = !(0, _types.isUndef)(f.visible_at_start) ? Boolean(f.visible_at_start) : true;
	
	                /**
	                 * Extension's prefix
	                 * @private
	                 */
	                _this.prfx = 'fltsVis_';
	
	                /**
	                 * Callback fired before filters row is shown
	                 * @type {Function}
	                 */
	                _this.onBeforeShow = (0, _types.isFn)(f.on_before_show) ? f.on_before_show : null;
	
	                /**
	                 * Callback fired after filters row is shown
	                 * @type {Function}
	                 */
	                _this.onAfterShow = (0, _types.isFn)(f.on_after_show) ? f.on_after_show : null;
	
	                /**
	                 * Callback fired before filters row is hidden
	                 * @type {Function}
	                 */
	                _this.onBeforeHide = (0, _types.isFn)(f.on_before_hide) ? f.on_before_hide : null;
	
	                /**
	                 * Callback fired after filters row is hidden
	                 * @type {Function}
	                 */
	                _this.onAfterHide = (0, _types.isFn)(f.on_after_hide) ? f.on_after_hide : null;
	
	                //Import extension's stylesheet
	                tf.import(f.name + 'Style', tf.stylePath + _this.stylesheet, null, 'link');
	
	                _this.enable();
	                return _this;
	        }
	
	        /**
	         * Initialise extension
	         */
	
	
	        FiltersVisibility.prototype.init = function init() {
	                var _this2 = this;
	
	                if (this.initialized) {
	                        return;
	                }
	
	                this.buildUI();
	
	                /**
	                 * @inherited
	                 */
	                this.initialized = true;
	
	                this.emitter.on(['show-filters'], function (tf, visible) {
	                        return _this2.show(visible);
	                });
	                this.emitter.emit('filters-visibility-initialized', this.tf, this);
	        };
	
	        /**
	         * Build UI elements
	         */
	
	
	        FiltersVisibility.prototype.buildUI = function buildUI() {
	                var _this3 = this;
	
	                var tf = this.tf;
	                var span = (0, _dom.createElm)('span', ['id', this.prfx + tf.id]);
	                span.className = this.contCssClass;
	
	                //Container element (rdiv or custom element)
	                if (!this.targetId) {
	                        tf.setToolbar();
	                }
	                var targetEl = !this.targetId ? tf.rDiv : (0, _dom.elm)(this.targetId);
	
	                if (!this.targetId) {
	                        var firstChild = targetEl.firstChild;
	                        firstChild.parentNode.insertBefore(span, firstChild);
	                } else {
	                        targetEl.appendChild(span);
	                }
	
	                var btn = void 0;
	                if (!this.btnHtml) {
	                        btn = (0, _dom.createElm)('a', ['href', 'javascript:void(0);']);
	                        btn.className = this.btnCssClass;
	                        btn.title = this.btnText || this.defaultText;
	                        btn.innerHTML = this.collapseBtnHtml;
	                        span.appendChild(btn);
	                } else {
	                        //Custom html
	                        span.innerHTML = this.btnHtml;
	                        btn = span.firstChild;
	                }
	
	                (0, _event.addEvt)(btn, 'click', function () {
	                        return _this3.toggle();
	                });
	
	                this.contEl = span;
	                this.btnEl = btn;
	
	                if (!this.visibleAtStart) {
	                        this.toggle();
	                }
	        };
	
	        /**
	         * Toggle filters visibility
	         */
	
	
	        FiltersVisibility.prototype.toggle = function toggle() {
	                var tf = this.tf;
	                var tbl = tf.gridLayout ? tf.feature('gridLayout').headTbl : tf.tbl;
	                var fltRow = tbl.rows[this.filtersRowIndex];
	                var isDisplayed = fltRow.style.display === '';
	
	                this.show(!isDisplayed);
	        };
	
	        /**
	         * Show or hide filters
	         *
	         * @param {boolean} [visible=true] Visibility flag
	         */
	
	
	        FiltersVisibility.prototype.show = function show() {
	                var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	                var tf = this.tf;
	                var tbl = tf.gridLayout ? tf.feature('gridLayout').headTbl : tf.tbl;
	                var fltRow = tbl.rows[this.filtersRowIndex];
	
	                if (this.onBeforeShow && visible) {
	                        this.onBeforeShow.call(this, this);
	                }
	                if (this.onBeforeHide && !visible) {
	                        this.onBeforeHide.call(null, this);
	                }
	
	                fltRow.style.display = visible ? '' : 'none';
	                if (this.enableIcon && !this.btnHtml) {
	                        this.btnEl.innerHTML = visible ? this.collapseBtnHtml : this.expandBtnHtml;
	                }
	
	                if (this.onAfterShow && visible) {
	                        this.onAfterShow.call(null, this);
	                }
	                if (this.onAfterHide && !visible) {
	                        this.onAfterHide.call(null, this);
	                }
	
	                this.emitter.emit('filters-toggled', tf, this, visible);
	        };
	
	        /**
	         * Destroy the UI
	         */
	
	
	        FiltersVisibility.prototype.destroy = function destroy() {
	                var _this4 = this;
	
	                if (!this.initialized) {
	                        return;
	                }
	
	                this.emitter.off(['show-filters'], function (tf, visible) {
	                        return _this4.show(visible);
	                });
	
	                this.btnEl.innerHTML = '';
	                (0, _dom.removeElm)(this.btnEl);
	                this.btnEl = null;
	
	                this.contEl.innerHTML = '';
	                (0, _dom.removeElm)(this.contEl);
	                this.contEl = null;
	                this.initialized = false;
	        };
	
	        return FiltersVisibility;
	}(_feature.Feature);
	
	exports.default = FiltersVisibility;

/***/ },

/***/ 440:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _feature = __webpack_require__(9);
	
	var _types = __webpack_require__(4);
	
	var _dom = __webpack_require__(3);
	
	var _event = __webpack_require__(1);
	
	var _number = __webpack_require__(6);
	
	var _const = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * SortableTable Adapter module
	 */
	var AdapterSortableTable = function (_Feature) {
	    _inherits(AdapterSortableTable, _Feature);
	
	    /**
	     * Creates an instance of AdapterSortableTable
	     * @param {TableFilter} tf TableFilter instance
	     * @param {Object} opts Configuration object
	     */
	    function AdapterSortableTable(tf, opts) {
	        _classCallCheck(this, AdapterSortableTable);
	
	        /**
	         * Module name
	         * @type {String}
	         */
	        var _this = _possibleConstructorReturn(this, _Feature.call(this, tf, opts.name));
	
	        _this.name = opts.name;
	
	        /**
	         * Module description
	         * @type {String}
	         */
	        _this.desc = opts.description || 'Sortable table';
	
	        /**
	         * Indicate whether table previously sorted
	         * @type {Boolean}
	         * @private
	         */
	        _this.sorted = false;
	
	        /**
	         * List of sort type per column basis
	         * @type {Array}
	         */
	        _this.sortTypes = (0, _types.isArray)(opts.types) ? opts.types : tf.colTypes;
	
	        /**
	         * Column to be sorted at initialization, ie:
	         * sort_col_at_start: [1, true]
	         * @type {Array}
	         */
	        _this.sortColAtStart = (0, _types.isArray)(opts.sort_col_at_start) ? opts.sort_col_at_start : null;
	
	        /**
	         * Enable asynchronous sort, if triggers are external
	         * @type {Boolean}
	         */
	        _this.asyncSort = Boolean(opts.async_sort);
	
	        /**
	         * List of element IDs triggering sort on a per column basis
	         * @type {Array}
	         */
	        _this.triggerIds = (0, _types.isArray)(opts.trigger_ids) ? opts.trigger_ids : [];
	
	        // edit .sort-arrow.descending / .sort-arrow.ascending in
	        // tablefilter.css to reflect any path change
	        /**
	         * Path to images
	         * @type {String}
	         */
	        _this.imgPath = opts.images_path || tf.themesPath;
	
	        /**
	         * Blank image file name
	         * @type {String}
	         */
	        _this.imgBlank = opts.image_blank || 'blank.png';
	
	        /**
	         * Css class for sort indicator image
	         * @type {String}
	         */
	        _this.imgClassName = opts.image_class_name || 'sort-arrow';
	
	        /**
	         * Css class for ascending sort indicator image
	         * @type {String}
	         */
	        _this.imgAscClassName = opts.image_asc_class_name || 'ascending';
	
	        /**
	         * Css class for descending sort indicator image
	         * @type {String}
	         */
	        _this.imgDescClassName = opts.image_desc_class_name || 'descending';
	
	        /**
	         * Cell attribute key storing custom value used for sorting
	         * @type {String}
	         */
	        _this.customKey = opts.custom_key || 'data-tf-sortKey';
	
	        /**
	         * Callback fired when sort extension is instanciated
	         * @type {Function}
	         */
	        _this.onSortLoaded = (0, _types.isFn)(opts.on_sort_loaded) ? opts.on_sort_loaded : null;
	
	        /**
	         * Callback fired before a table column is sorted
	         * @type {Function}
	         */
	        _this.onBeforeSort = (0, _types.isFn)(opts.on_before_sort) ? opts.on_before_sort : null;
	
	        /**
	         * Callback fired after a table column is sorted
	         * @type {Function}
	         */
	        _this.onAfterSort = (0, _types.isFn)(opts.on_after_sort) ? opts.on_after_sort : null;
	
	        /**
	         * SortableTable instance
	         * @private
	         */
	        _this.stt = null;
	
	        _this.enable();
	        return _this;
	    }
	
	    /**
	     * Initializes AdapterSortableTable instance
	     */
	
	
	    AdapterSortableTable.prototype.init = function init() {
	        var _this2 = this;
	
	        if (this.initialized) {
	            return;
	        }
	        var tf = this.tf;
	        var adpt = this;
	
	        // SortableTable class sanity check (sortabletable.js)
	        if ((0, _types.isUndef)(SortableTable)) {
	            throw new Error('SortableTable class not found.');
	        }
	
	        // Add any date format if needed
	        this.emitter.emit('add-date-type-formats', this.tf, this.sortTypes);
	
	        this.overrideSortableTable();
	        this.setSortTypes();
	
	        // Column sort at start
	        var sortColAtStart = adpt.sortColAtStart;
	        if (sortColAtStart) {
	            this.stt.sort(sortColAtStart[0], sortColAtStart[1]);
	        }
	
	        if (this.onSortLoaded) {
	            this.onSortLoaded.call(null, tf, this);
	        }
	
	        /*** SortableTable callbacks ***/
	        this.stt.onbeforesort = function () {
	            if (adpt.onBeforeSort) {
	                adpt.onBeforeSort.call(null, tf, adpt.stt.sortColumn);
	            }
	
	            /*** sort behaviour for paging ***/
	            if (tf.paging) {
	                tf.feature('paging').disable();
	            }
	        };
	
	        this.stt.onsort = function () {
	            adpt.sorted = true;
	
	            //sort behaviour for paging
	            if (tf.paging) {
	                var paginator = tf.feature('paging');
	                // recalculate valid rows index as sorting may have change it
	                tf.getValidRows(true);
	                paginator.enable();
	                paginator.setPage(paginator.getPage());
	            }
	
	            if (adpt.onAfterSort) {
	                adpt.onAfterSort.call(null, tf, adpt.stt.sortColumn, adpt.stt.descending);
	            }
	
	            adpt.emitter.emit('column-sorted', tf, adpt.stt.sortColumn, adpt.stt.descending);
	        };
	
	        this.emitter.on(['sort'], function (tf, colIdx, desc) {
	            return _this2.sortByColumnIndex(colIdx, desc);
	        });
	
	        /** @inherited */
	        this.initialized = true;
	
	        this.emitter.emit('sort-initialized', tf, this);
	    };
	
	    /**
	     * Sort specified column
	     * @param {Number} colIdx Column index
	     * @param {Boolean} desc Optional: descending manner
	     */
	
	
	    AdapterSortableTable.prototype.sortByColumnIndex = function sortByColumnIndex(colIdx, desc) {
	        this.stt.sort(colIdx, desc);
	    };
	
	    /**
	     * Set SortableTable overrides for TableFilter integration
	     */
	
	
	    AdapterSortableTable.prototype.overrideSortableTable = function overrideSortableTable() {
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
	
	            while (el.tagName !== _const.CELL_TAG && el.tagName !== _const.HEADER_TAG) {
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
	                i = void 0;
	            for (i = 0; cells[i] !== oTd && i < l; i++) {}
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
	            var img = void 0,
	                c = void 0;
	
	            for (var i = 0; i < l; i++) {
	                c = cells[i];
	                if (stt.sortTypes[i] !== null && stt.sortTypes[i] !== 'None') {
	                    c.style.cursor = 'pointer';
	                    img = (0, _dom.createElm)('img', ['src', adpt.imgPath + adpt.imgBlank]);
	                    c.appendChild(img);
	                    if (stt.sortTypes[i] !== null) {
	                        c.setAttribute('_sortType', stt.sortTypes[i]);
	                    }
	                    (0, _event.addEvt)(c, 'click', stt._headerOnclick);
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
	            var cells = void 0,
	                l = void 0,
	                img = void 0;
	
	            // external headers
	            if (adpt.asyncSort && adpt.triggerIds.length > 0) {
	                var triggers = adpt.triggerIds;
	                cells = [];
	                l = triggers.length;
	                for (var j = 0; j < l; j++) {
	                    cells.push((0, _dom.elm)(triggers[j]));
	                }
	            } else {
	                if (!this.tHead) {
	                    return;
	                }
	                cells = stt.tHead.rows[stt.headersRow].cells;
	                l = cells.length;
	            }
	            for (var i = 0; i < l; i++) {
	                var cell = cells[i];
	                if (!cell) {
	                    continue;
	                }
	                var cellAttr = cell.getAttribute('_sortType');
	                if (cellAttr !== null && cellAttr !== 'None') {
	                    img = cell.lastChild || cell;
	                    if (img.nodeName.toLowerCase() !== 'img') {
	                        img = (0, _dom.createElm)('img', ['src', adpt.imgPath + adpt.imgBlank]);
	                        cell.appendChild(img);
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
	                return (0, _dom.getText)(oNode);
	            }
	        };
	    };
	
	    /**
	     * Adds a sort type
	     */
	
	
	    AdapterSortableTable.prototype.addSortType = function addSortType() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        // Extract the arguments
	        var id = args[0];
	        var caster = args[1];
	        var sorter = args[2];
	
	        SortableTable.prototype.addSortType(id, caster, sorter);
	    };
	
	    /**
	     * Sets the sort types on a column basis
	     * @private
	     */
	
	
	    AdapterSortableTable.prototype.setSortTypes = function setSortTypes() {
	        var _this3 = this;
	
	        var tf = this.tf,
	            sortTypes = this.sortTypes,
	            _sortTypes = [];
	
	        for (var i = 0; i < tf.nbCells; i++) {
	            var colType = void 0;
	            if (sortTypes[i]) {
	                colType = sortTypes[i];
	                if ((0, _types.isObj)(colType)) {
	                    if (colType.type === _const.DATE) {
	                        colType = this._addDateType(i, sortTypes);
	                    } else if (colType.type === _const.FORMATTED_NUMBER) {
	                        var decimal = colType.decimal || tf.decimalSeparator;
	                        colType = this._addNumberType(i, decimal);
	                    }
	                } else {
	                    colType = colType.toLowerCase();
	                    if (colType === _const.DATE) {
	                        colType = this._addDateType(i, sortTypes);
	                    } else if (colType === _const.FORMATTED_NUMBER || colType === _const.NUMBER) {
	                        colType = this._addNumberType(i, tf.decimalSeparator);
	                    } else if (colType === _const.NONE) {
	                        // TODO: normalise 'none' vs 'None'
	                        colType = 'None';
	                    }
	                }
	            } else {
	                colType = _const.STRING;
	            }
	            _sortTypes.push(colType);
	        }
	
	        //Public TF method to add sort type
	
	        //Custom sort types
	        this.addSortType('caseinsensitivestring', SortableTable.toUpperCase);
	        this.addSortType(_const.STRING);
	        this.addSortType(_const.IP_ADDRESS, ipAddress, sortIP);
	
	        this.stt = new SortableTable(tf.tbl, _sortTypes);
	
	        /*** external table headers adapter ***/
	        if (this.asyncSort && this.triggerIds.length > 0) {
	            (function () {
	                var triggers = _this3.triggerIds;
	                for (var j = 0; j < triggers.length; j++) {
	                    if (triggers[j] === null) {
	                        continue;
	                    }
	                    var trigger = (0, _dom.elm)(triggers[j]);
	                    if (trigger) {
	                        trigger.style.cursor = 'pointer';
	
	                        (0, _event.addEvt)(trigger, 'click', function (evt) {
	                            var elm = evt.target;
	                            if (!_this3.tf.sort) {
	                                return;
	                            }
	                            _this3.stt.asyncSort(triggers.indexOf(elm.id));
	                        });
	                        trigger.setAttribute('_sortType', _sortTypes[j]);
	                    }
	                }
	            })();
	        }
	    };
	
	    AdapterSortableTable.prototype._addDateType = function _addDateType(colIndex, types) {
	        var tf = this.tf;
	        var dateType = tf.feature('dateType');
	        var locale = dateType.getOptions(colIndex, types).locale || tf.locale;
	        var colType = _const.DATE + '-' + locale;
	
	        this.addSortType(colType, function (value) {
	            return dateType.parse(value, locale);
	        });
	        return colType;
	    };
	
	    AdapterSortableTable.prototype._addNumberType = function _addNumberType(colIndex, decimal) {
	        var colType = '' + _const.FORMATTED_NUMBER + (decimal === '.' ? '' : '-custom');
	
	        this.addSortType(colType, function (value) {
	            return (0, _number.parse)(value, decimal);
	        });
	        return colType;
	    };
	
	    /**
	     * Remove extension
	     */
	
	
	    AdapterSortableTable.prototype.destroy = function destroy() {
	        var _this4 = this;
	
	        if (!this.initialized) {
	            return;
	        }
	        var tf = this.tf;
	        this.emitter.off(['sort'], function (tf, colIdx, desc) {
	            return _this4.sortByColumnIndex(colIdx, desc);
	        });
	        this.sorted = false;
	        this.stt.destroy();
	
	        var ids = tf.getFiltersId();
	        for (var idx = 0; idx < ids.length; idx++) {
	            var header = tf.getHeaderElement(idx);
	            var img = (0, _dom.tag)(header, 'img');
	
	            if (img.length === 1) {
	                header.removeChild(img[0]);
	            }
	        }
	        this.initialized = false;
	    };
	
	    return AdapterSortableTable;
	}(_feature.Feature);
	
	//Converters
	
	
	exports.default = AdapterSortableTable;
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
	    if (aa === bb) {
	        return 0;
	    } else if (aa < bb) {
	        return -1;
	    } else {
	        return 1;
	    }
	}

/***/ },

/***/ 441:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _adapterSortabletable = __webpack_require__(440);
	
	var _adapterSortabletable2 = _interopRequireDefault(_adapterSortabletable);
	
	var _root = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (!_root.root.SortableTable) {
	    __webpack_require__(442);
	}
	
	exports.default = _adapterSortabletable2.default;

/***/ },

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(443)(__webpack_require__(444)+"\n\n// SCRIPT-LOADER FOOTER\n//# sourceURL=script:///C:/Users/max.guglielmi/Documents/dev/perso/javascript/GitHub/TableFilter/libs/sortabletable.js")

/***/ },

/***/ 443:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript !== "undefined")
			execScript(src);
		else
			eval.call(null, src);
	}


/***/ },

/***/ 444:
/***/ function(module, exports) {

	module.exports = "/*----------------------------------------------------------------------------\\\n|                            Sortable Table 1.12                              |\n|-----------------------------------------------------------------------------|\n|                         Created by Erik Arvidsson                           |\n|                  (http://webfx.eae.net/contact.html#erik)                   |\n|                      For WebFX (http://webfx.eae.net/)                      |\n|-----------------------------------------------------------------------------|\n| A DOM 1 based script that allows an ordinary HTML table to be sortable.     |\n|-----------------------------------------------------------------------------|\n|                  Copyright (c) 1998 - 2006 Erik Arvidsson                   |\n|-----------------------------------------------------------------------------|\n| Licensed under the Apache License, Version 2.0 (the \"License\"); you may not |\n| use this file except in compliance with the License.  You may obtain a copy |\n| of the License at http://www.apache.org/licenses/LICENSE-2.0                |\n| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |\n| Unless  required  by  applicable law or  agreed  to  in  writing,  software |\n| distributed under the License is distributed on an  \"AS IS\" BASIS,  WITHOUT |\n| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |\n| License  for the  specific language  governing permissions  and limitations |\n| under the License.                                                          |\n|-----------------------------------------------------------------------------|\n| 2003-01-10 | First version                                                  |\n| 2003-01-19 | Minor changes to the date parsing                              |\n| 2003-01-28 | JScript 5.0 fixes (no support for 'in' operator)               |\n| 2003-02-01 | Sloppy typo like error fixed in getInnerText                   |\n| 2003-07-04 | Added workaround for IE cellIndex bug.                         |\n| 2003-11-09 | The bDescending argument to sort was not correctly working     |\n|            | Using onclick DOM0 event if no support for addEventListener    |\n|            | or attachEvent                                                 |\n| 2004-01-13 | Adding addSortType and removeSortType which makes it a lot     |\n|            | easier to add new, custom sort types.                          |\n| 2004-01-27 | Switch to use descending = false as the default sort order.    |\n|            | Change defaultDescending to suit your needs.                   |\n| 2004-03-14 | Improved sort type None look and feel a bit                    |\n| 2004-08-26 | Made the handling of tBody and tHead more flexible. Now you    |\n|            | can use another tHead or no tHead, and you can chose some      |\n|            | other tBody.                                                   |\n| 2006-04-25 | Changed license to Apache Software License 2.0                 |\n|-----------------------------------------------------------------------------|\n| Created 2003-01-10 | All changes are in the log above. | Updated 2006-04-25 |\n\\----------------------------------------------------------------------------*/\n\n\nfunction SortableTable(oTable, oSortTypes) {\n\n\tthis.sortTypes = oSortTypes || [];\n\n\tthis.sortColumn = null;\n\tthis.descending = null;\n\n\tvar oThis = this;\n\tthis._headerOnclick = function (e) {\n\t\toThis.headerOnclick(e);\n\t};\n\n\tif (oTable) {\n\t\tthis.setTable( oTable );\n\t\tthis.document = oTable.ownerDocument || oTable.document;\n\t}\n\telse {\n\t\tthis.document = document;\n\t}\n\n\n\t// only IE needs this\n\tvar win = this.document.defaultView || this.document.parentWindow;\n\tthis._onunload = function () {\n\t\toThis.destroy();\n\t};\n\tif (win && typeof win.attachEvent != \"undefined\") {\n\t\twin.attachEvent(\"onunload\", this._onunload);\n\t}\n}\n\nSortableTable.gecko = navigator.product == \"Gecko\";\nSortableTable.msie = /msie/i.test(navigator.userAgent);\n// Mozilla is faster when doing the DOM manipulations on\n// an orphaned element. MSIE is not\nSortableTable.removeBeforeSort = SortableTable.gecko;\n\nSortableTable.prototype.onsort = function () {};\n\n// default sort order. true -> descending, false -> ascending\nSortableTable.prototype.defaultDescending = false;\n\n// shared between all instances. This is intentional to allow external files\n// to modify the prototype\nSortableTable.prototype._sortTypeInfo = {};\n\nSortableTable.prototype.setTable = function (oTable) {\n\tif ( this.tHead )\n\t\tthis.uninitHeader();\n\tthis.element = oTable;\n\tthis.setTHead( oTable.tHead );\n\tthis.setTBody( oTable.tBodies[0] );\n};\n\nSortableTable.prototype.setTHead = function (oTHead) {\n\tif (this.tHead && this.tHead != oTHead )\n\t\tthis.uninitHeader();\n\tthis.tHead = oTHead;\n\tthis.initHeader( this.sortTypes );\n};\n\nSortableTable.prototype.setTBody = function (oTBody) {\n\tthis.tBody = oTBody;\n};\n\nSortableTable.prototype.setSortTypes = function ( oSortTypes ) {\n\tif ( this.tHead )\n\t\tthis.uninitHeader();\n\tthis.sortTypes = oSortTypes || [];\n\tif ( this.tHead )\n\t\tthis.initHeader( this.sortTypes );\n};\n\n// adds arrow containers and events\n// also binds sort type to the header cells so that reordering columns does\n// not break the sort types\nSortableTable.prototype.initHeader = function (oSortTypes) {\n\tif (!this.tHead) return;\n\tvar cells = this.tHead.rows[0].cells;\n\tvar doc = this.tHead.ownerDocument || this.tHead.document;\n\tthis.sortTypes = oSortTypes || [];\n\tvar l = cells.length;\n\tvar img, c;\n\tfor (var i = 0; i < l; i++) {\n\t\tc = cells[i];\n\t\tif (this.sortTypes[i] != null && this.sortTypes[i] != \"None\") {\n\t\t\timg = doc.createElement(\"IMG\");\n\t\t\timg.src = \"images/blank.png\";\n\t\t\tc.appendChild(img);\n\t\t\tif (this.sortTypes[i] != null)\n\t\t\t\tc._sortType = this.sortTypes[i];\n\t\t\tif (typeof c.addEventListener != \"undefined\")\n\t\t\t\tc.addEventListener(\"click\", this._headerOnclick, false);\n\t\t\telse if (typeof c.attachEvent != \"undefined\")\n\t\t\t\tc.attachEvent(\"onclick\", this._headerOnclick);\n\t\t\telse\n\t\t\t\tc.onclick = this._headerOnclick;\n\t\t}\n\t\telse\n\t\t{\n\t\t\tc.setAttribute( \"_sortType\", oSortTypes[i] );\n\t\t\tc._sortType = \"None\";\n\t\t}\n\t}\n\tthis.updateHeaderArrows();\n};\n\n// remove arrows and events\nSortableTable.prototype.uninitHeader = function () {\n\tif (!this.tHead) return;\n\tvar cells = this.tHead.rows[0].cells;\n\tvar l = cells.length;\n\tvar c;\n\tfor (var i = 0; i < l; i++) {\n\t\tc = cells[i];\n\t\tif (c._sortType != null && c._sortType != \"None\") {\n\t\t\tc.removeChild(c.lastChild);\n\t\t\tif (typeof c.removeEventListener != \"undefined\")\n\t\t\t\tc.removeEventListener(\"click\", this._headerOnclick, false);\n\t\t\telse if (typeof c.detachEvent != \"undefined\")\n\t\t\t\tc.detachEvent(\"onclick\", this._headerOnclick);\n\t\t\tc._sortType = null;\n\t\t\tc.removeAttribute( \"_sortType\" );\n\t\t}\n\t}\n};\n\nSortableTable.prototype.updateHeaderArrows = function () {\n\tif (!this.tHead) return;\n\tvar cells = this.tHead.rows[0].cells;\n\tvar l = cells.length;\n\tvar img;\n\tfor (var i = 0; i < l; i++) {\n\t\tif (cells[i]._sortType != null && cells[i]._sortType != \"None\") {\n\t\t\timg = cells[i].lastChild;\n\t\t\tif (i == this.sortColumn)\n\t\t\t\timg.className = \"sort-arrow \" + (this.descending ? \"descending\" : \"ascending\");\n\t\t\telse\n\t\t\t\timg.className = \"sort-arrow\";\n\t\t}\n\t}\n};\n\nSortableTable.prototype.headerOnclick = function (e) {\n\t// find TD element\n\tvar el = e.target || e.srcElement;\n\twhile (el.tagName != \"TD\")\n\t\tel = el.parentNode;\n\n\tthis.sort(SortableTable.msie ? SortableTable.getCellIndex(el) : el.cellIndex);\n};\n\n// IE returns wrong cellIndex when columns are hidden\nSortableTable.getCellIndex = function (oTd) {\n\tvar cells = oTd.parentNode.childNodes\n\tvar l = cells.length;\n\tvar i;\n\tfor (i = 0; cells[i] != oTd && i < l; i++)\n\t\t;\n\treturn i;\n};\n\nSortableTable.prototype.getSortType = function (nColumn) {\n\treturn this.sortTypes[nColumn] || \"String\";\n};\n\n// only nColumn is required\n// if bDescending is left out the old value is taken into account\n// if sSortType is left out the sort type is found from the sortTypes array\n\nSortableTable.prototype.sort = function (nColumn, bDescending, sSortType) {\n\tif (!this.tBody) return;\n\tif (sSortType == null)\n\t\tsSortType = this.getSortType(nColumn);\n\n\t// exit if None\n\tif (sSortType == \"None\")\n\t\treturn;\n\n\tif (bDescending == null) {\n\t\tif (this.sortColumn != nColumn)\n\t\t\tthis.descending = this.defaultDescending;\n\t\telse\n\t\t\tthis.descending = !this.descending;\n\t}\n\telse\n\t\tthis.descending = bDescending;\n\n\tthis.sortColumn = nColumn;\n\n\tif (typeof this.onbeforesort == \"function\")\n\t\tthis.onbeforesort();\n\n\tvar f = this.getSortFunction(sSortType, nColumn);\n\tvar a = this.getCache(sSortType, nColumn);\n\tvar tBody = this.tBody;\n\n\ta.sort(f);\n\n\tif (this.descending)\n\t\ta.reverse();\n\n\tif (SortableTable.removeBeforeSort) {\n\t\t// remove from doc\n\t\tvar nextSibling = tBody.nextSibling;\n\t\tvar p = tBody.parentNode;\n\t\tp.removeChild(tBody);\n\t}\n\n\t// insert in the new order\n\tvar l = a.length;\n\tfor (var i = 0; i < l; i++)\n\t\ttBody.appendChild(a[i].element);\n\n\tif (SortableTable.removeBeforeSort) {\n\t\t// insert into doc\n\t\tp.insertBefore(tBody, nextSibling);\n\t}\n\n\tthis.updateHeaderArrows();\n\n\tthis.destroyCache(a);\n\n\tif (typeof this.onsort == \"function\")\n\t\tthis.onsort();\n};\n\nSortableTable.prototype.asyncSort = function (nColumn, bDescending, sSortType) {\n\tvar oThis = this;\n\tthis._asyncsort = function () {\n\t\toThis.sort(nColumn, bDescending, sSortType);\n\t};\n\twindow.setTimeout(this._asyncsort, 1);\n};\n\nSortableTable.prototype.getCache = function (sType, nColumn) {\n\tif (!this.tBody) return [];\n\tvar rows = this.tBody.rows;\n\tvar l = rows.length;\n\tvar a = new Array(l);\n\tvar r;\n\tfor (var i = 0; i < l; i++) {\n\t\tr = rows[i];\n\t\ta[i] = {\n\t\t\tvalue:\t\tthis.getRowValue(r, sType, nColumn),\n\t\t\telement:\tr\n\t\t};\n\t};\n\treturn a;\n};\n\nSortableTable.prototype.destroyCache = function (oArray) {\n\tvar l = oArray.length;\n\tfor (var i = 0; i < l; i++) {\n\t\toArray[i].value = null;\n\t\toArray[i].element = null;\n\t\toArray[i] = null;\n\t}\n};\n\nSortableTable.prototype.getRowValue = function (oRow, sType, nColumn) {\n\t// if we have defined a custom getRowValue use that\n\tif (this._sortTypeInfo[sType] && this._sortTypeInfo[sType].getRowValue)\n\t\treturn this._sortTypeInfo[sType].getRowValue(oRow, nColumn);\n\n\tvar s;\n\tvar c = oRow.cells[nColumn];\n\tif (typeof c.innerText != \"undefined\")\n\t\ts = c.innerText;\n\telse\n\t\ts = SortableTable.getInnerText(c);\n\treturn this.getValueFromString(s, sType);\n};\n\nSortableTable.getInnerText = function (oNode) {\n\tvar s = \"\";\n\tvar cs = oNode.childNodes;\n\tvar l = cs.length;\n\tfor (var i = 0; i < l; i++) {\n\t\tswitch (cs[i].nodeType) {\n\t\t\tcase 1: //ELEMENT_NODE\n\t\t\t\ts += SortableTable.getInnerText(cs[i]);\n\t\t\t\tbreak;\n\t\t\tcase 3:\t//TEXT_NODE\n\t\t\t\ts += cs[i].nodeValue;\n\t\t\t\tbreak;\n\t\t}\n\t}\n\treturn s;\n};\n\nSortableTable.prototype.getValueFromString = function (sText, sType) {\n\tif (this._sortTypeInfo[sType])\n\t\treturn this._sortTypeInfo[sType].getValueFromString( sText );\n\treturn sText;\n\t/*\n\tswitch (sType) {\n\t\tcase \"Number\":\n\t\t\treturn Number(sText);\n\t\tcase \"CaseInsensitiveString\":\n\t\t\treturn sText.toUpperCase();\n\t\tcase \"Date\":\n\t\t\tvar parts = sText.split(\"-\");\n\t\t\tvar d = new Date(0);\n\t\t\td.setFullYear(parts[0]);\n\t\t\td.setDate(parts[2]);\n\t\t\td.setMonth(parts[1] - 1);\n\t\t\treturn d.valueOf();\n\t}\n\treturn sText;\n\t*/\n\t};\n\nSortableTable.prototype.getSortFunction = function (sType, nColumn) {\n\tif (this._sortTypeInfo[sType])\n\t\treturn this._sortTypeInfo[sType].compare;\n\treturn SortableTable.basicCompare;\n};\n\nSortableTable.prototype.destroy = function () {\n\tthis.uninitHeader();\n\tvar win = this.document.parentWindow;\n\tif (win && typeof win.detachEvent != \"undefined\") {\t// only IE needs this\n\t\twin.detachEvent(\"onunload\", this._onunload);\n\t}\n\tthis._onunload = null;\n\tthis.element = null;\n\tthis.tHead = null;\n\tthis.tBody = null;\n\tthis.document = null;\n\tthis._headerOnclick = null;\n\tthis.sortTypes = null;\n\tthis._asyncsort = null;\n\tthis.onsort = null;\n};\n\n// Adds a sort type to all instance of SortableTable\n// sType : String - the identifier of the sort type\n// fGetValueFromString : function ( s : string ) : T - A function that takes a\n//    string and casts it to a desired format. If left out the string is just\n//    returned\n// fCompareFunction : function ( n1 : T, n2 : T ) : Number - A normal JS sort\n//    compare function. Takes two values and compares them. If left out less than,\n//    <, compare is used\n// fGetRowValue : function( oRow : HTMLTRElement, nColumn : int ) : T - A function\n//    that takes the row and the column index and returns the value used to compare.\n//    If left out then the innerText is first taken for the cell and then the\n//    fGetValueFromString is used to convert that string the desired value and type\n\nSortableTable.prototype.addSortType = function (sType, fGetValueFromString, fCompareFunction, fGetRowValue) {\n\tthis._sortTypeInfo[sType] = {\n\t\ttype:\t\t\t\tsType,\n\t\tgetValueFromString:\tfGetValueFromString || SortableTable.idFunction,\n\t\tcompare:\t\t\tfCompareFunction || SortableTable.basicCompare,\n\t\tgetRowValue:\t\tfGetRowValue\n\t};\n};\n\n// this removes the sort type from all instances of SortableTable\nSortableTable.prototype.removeSortType = function (sType) {\n\tdelete this._sortTypeInfo[sType];\n};\n\nSortableTable.basicCompare = function compare(n1, n2) {\n\tif (n1.value < n2.value)\n\t\treturn -1;\n\tif (n2.value < n1.value)\n\t\treturn 1;\n\treturn 0;\n};\n\nSortableTable.idFunction = function (x) {\n\treturn x;\n};\n\nSortableTable.toUpperCase = function (s) {\n\treturn s.toUpperCase();\n};\n\nSortableTable.toDate = function (s) {\n\tvar parts = s.split(\"-\");\n\tvar d = new Date(0);\n\td.setFullYear(parts[0]);\n\td.setDate(parts[2]);\n\td.setMonth(parts[1] - 1);\n\treturn d.valueOf();\n};\n\n\n// add sort types\nSortableTable.prototype.addSortType(\"Number\", Number);\nSortableTable.prototype.addSortType(\"CaseInsensitiveString\", SortableTable.toUpperCase);\nSortableTable.prototype.addSortType(\"Date\", SortableTable.toDate);\nSortableTable.prototype.addSortType(\"String\");\n// None is a special case\n"

/***/ }

});
//# sourceMappingURL=tf-1.js.map