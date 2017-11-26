webpackJsonp([0],{

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./array": 70,
	"./array.js": 70,
	"./const": 15,
	"./const.js": 15,
	"./cookie": 116,
	"./cookie.js": 116,
	"./dom": 10,
	"./dom.js": 10,
	"./emitter": 109,
	"./emitter.js": 109,
	"./event": 19,
	"./event.js": 19,
	"./extensions/advancedGrid/adapterEzEditTable": 441,
	"./extensions/advancedGrid/adapterEzEditTable.js": 441,
	"./extensions/advancedGrid/advancedGrid": 443,
	"./extensions/advancedGrid/advancedGrid.js": 443,
	"./extensions/colOps/colOps": 444,
	"./extensions/colOps/colOps.js": 444,
	"./extensions/colsVisibility/colsVisibility": 445,
	"./extensions/colsVisibility/colsVisibility.js": 445,
	"./extensions/filtersVisibility/filtersVisibility": 446,
	"./extensions/filtersVisibility/filtersVisibility.js": 446,
	"./extensions/sort/adapterSortabletable": 442,
	"./extensions/sort/adapterSortabletable.js": 442,
	"./extensions/sort/sort": 447,
	"./extensions/sort/sort.js": 447,
	"./feature": 11,
	"./feature.js": 11,
	"./modules/alternateRows": 125,
	"./modules/alternateRows.js": 125,
	"./modules/baseDropdown": 69,
	"./modules/baseDropdown.js": 69,
	"./modules/checkList": 128,
	"./modules/checkList.js": 128,
	"./modules/clearButton": 124,
	"./modules/clearButton.js": 124,
	"./modules/dateType": 111,
	"./modules/dateType.js": 111,
	"./modules/dropdown": 110,
	"./modules/dropdown.js": 110,
	"./modules/gridLayout": 117,
	"./modules/gridLayout.js": 117,
	"./modules/hash": 114,
	"./modules/hash.js": 114,
	"./modules/help": 112,
	"./modules/help.js": 112,
	"./modules/highlightKeywords": 119,
	"./modules/highlightKeywords.js": 119,
	"./modules/loader": 118,
	"./modules/loader.js": 118,
	"./modules/markActiveColumns": 121,
	"./modules/markActiveColumns.js": 121,
	"./modules/noResults": 126,
	"./modules/noResults.js": 126,
	"./modules/paging": 127,
	"./modules/paging.js": 127,
	"./modules/popupFilter": 120,
	"./modules/popupFilter.js": 120,
	"./modules/rowsCounter": 122,
	"./modules/rowsCounter.js": 122,
	"./modules/state": 113,
	"./modules/state.js": 113,
	"./modules/statusBar": 123,
	"./modules/statusBar.js": 123,
	"./modules/storage": 115,
	"./modules/storage.js": 115,
	"./modules/toolbar": 33,
	"./modules/toolbar.js": 33,
	"./number": 68,
	"./number.js": 68,
	"./root": 16,
	"./root.js": 16,
	"./settings": 7,
	"./settings.js": 7,
	"./sort": 107,
	"./sort.js": 107,
	"./string": 21,
	"./string.js": 21,
	"./tablefilter": 108,
	"./tablefilter.js": 108,
	"./types": 3,
	"./types.js": 3
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 440;

/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _const = __webpack_require__(15);

var _settings = __webpack_require__(7);

var _root = __webpack_require__(16);

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
        var _this = _possibleConstructorReturn(this, (AdapterEzEditTable.__proto__ || Object.getPrototypeOf(AdapterEzEditTable)).call(this, tf, cfg.name));

        _this.desc = (0, _settings.defaultsStr)(cfg.description, 'ezEditTable adapter');

        /**
         * Filename of ezEditTable library
         * @type {String}
         */
        _this.filename = (0, _settings.defaultsStr)(cfg.filename, 'ezEditTable.js');

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
        _this.stylesheet = (0, _settings.defaultsStr)(cfg.stylesheet, _this.vendorPath + 'ezEditTable.css');

        /**
         * Name of ezEditTable stylesheet
         * @type {String}
         */
        _this.stylesheetName = (0, _settings.defaultsStr)(cfg.stylesheet_name, 'ezEditTableCss');

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


    _createClass(AdapterEzEditTable, [{
        key: 'init',
        value: function init() {
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
        }

        /**
         * Instantiate ezEditTable component for advanced grid features
         * @private
         */

    }, {
        key: '_setAdvancedGrid',
        value: function _setAdvancedGrid() {
            var tf = this.tf;

            //start row for EditTable constructor needs to be calculated
            var startRow = void 0,
                cfg = this.cfg,
                thead = (0, _dom.tag)(tf.dom(), 'thead');

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
                            /* eslint-disable */
                            slc.SelectRowByIndex(nextRowIndex);
                            /* eslint-enable */
                        } else {
                            /* eslint-disable */
                            et.ClearSelections();
                            /* eslint-enable */
                            var cellIndex = selectedElm.cellIndex,
                                _row = tf.dom().rows[nextRowIndex];
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
                            var r = tf.dom().rows[nextRowIndex];
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
                    d = keyCode === 34 || keyCode === 33 ? paging && paging.pageLength || et.nbRowsPerPage : 1;

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
                            et.nbRowsPerPage = paging.pageLength;
                            var validIndexes = tf.validRowsIndex,
                                validIdxLen = validIndexes.length,
                                pagingEndRow = parseInt(paging.startPagingRow, 10) + parseInt(paging.pageLength, 10);
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
                    var fnB = cfg.on_before_selected_row;
                    cfg.on_before_selected_row = function () {
                        var args = arguments;
                        onBeforeSelection(args[0], args[1], args[2]);
                        if (fnB) {
                            fnB.call(null, args[0], args[1], args[2]);
                        }
                    };
                    var fnA = cfg.on_after_selected_row;
                    cfg.on_after_selected_row = function () {
                        var args = arguments;
                        onAfterSelection(args[0], args[1], args[2]);
                        if (fnA) {
                            fnA.call(null, args[0], args[1], args[2]);
                        }
                    };
                } else {
                    var fnD = cfg.on_before_selected_cell;
                    cfg.on_before_selected_cell = function () {
                        var args = arguments;
                        onBeforeSelection(args[0], args[1], args[2]);
                        if (fnD) {
                            fnD.call(null, args[0], args[1], args[2]);
                        }
                    };
                    var fnC = cfg.on_after_selected_cell;
                    cfg.on_after_selected_cell = function () {
                        var args = arguments;
                        onAfterSelection(args[0], args[1], args[2]);
                        if (fnC) {
                            fnC.call(null, args[0], args[1], args[2]);
                        }
                    };
                }
            }
            if (editable) {
                //Added or removed rows, TF rows number needs to be re-calculated
                var fnE = cfg.on_added_dom_row;
                cfg.on_added_dom_row = function () {
                    var args = arguments;
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
                        fnE.call(null, args[0], args[1], args[2]);
                    }
                };
                if (cfg.actions && cfg.actions['delete']) {
                    var fnF = cfg.actions['delete'].on_after_submit;
                    cfg.actions['delete'].on_after_submit = function () {
                        var args = arguments;
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
                            fnF.call(null, args[0], args[1]);
                        }
                    };
                }
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
        }

        /**
         * Toggle behaviour
         */

    }, {
        key: 'toggle',
        value: function toggle() {
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
        }
    }, {
        key: '_toggleForInputFilter',
        value: function _toggleForInputFilter() {
            var tf = this.tf;
            if (!tf.getActiveFilterId()) {
                return;
            }
            var colIndex = tf.getColumnIndexFromFilterId(tf.getActiveFilterId());
            var filterType = tf.getFilterType(colIndex);
            if (filterType === _const.INPUT) {
                this.toggle();
            }
        }

        /**
         * Remove advanced grid
         */

    }, {
        key: 'destroy',
        value: function destroy() {
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
        }
    }]);

    return AdapterEzEditTable;
}(_feature.Feature);

exports.default = AdapterEzEditTable;

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _types = __webpack_require__(3);

var _dom = __webpack_require__(10);

var _event = __webpack_require__(19);

var _number = __webpack_require__(68);

var _const = __webpack_require__(15);

var _settings = __webpack_require__(7);

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
        var _this = _possibleConstructorReturn(this, (AdapterSortableTable.__proto__ || Object.getPrototypeOf(AdapterSortableTable)).call(this, tf, opts.name));

        _this.name = opts.name;

        /**
         * Module description
         * @type {String}
         */
        _this.desc = (0, _settings.defaultsStr)(opts.description, 'Sortable table');

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
        _this.sortTypes = (0, _settings.defaultsArr)(opts.types, tf.colTypes);

        /**
         * Column to be sorted at initialization, ie:
         * sort_col_at_start: [1, true]
         * @type {Array}
         */
        _this.sortColAtStart = (0, _settings.defaultsArr)(opts.sort_col_at_start, null);

        /**
         * Enable asynchronous sort, if triggers are external
         * @type {Boolean}
         */
        _this.asyncSort = Boolean(opts.async_sort);

        /**
         * List of element IDs triggering sort on a per column basis
         * @type {Array}
         */
        _this.triggerIds = (0, _settings.defaultsArr)(opts.trigger_ids, []);

        // edit .sort-arrow.descending / .sort-arrow.ascending in
        // tablefilter.css to reflect any path change
        /**
         * Path to images
         * @type {String}
         */
        _this.imgPath = (0, _settings.defaultsStr)(opts.images_path, tf.themesPath);

        /**
         * Blank image file name
         * @type {String}
         */
        _this.imgBlank = (0, _settings.defaultsStr)(opts.image_blank, 'blank.png');

        /**
         * Css class for sort indicator image
         * @type {String}
         */
        _this.imgClassName = (0, _settings.defaultsStr)(opts.image_class_name, 'sort-arrow');

        /**
         * Css class for ascending sort indicator image
         * @type {String}
         */
        _this.imgAscClassName = (0, _settings.defaultsStr)(opts.image_asc_class_name, 'ascending');

        /**
         * Css class for descending sort indicator image
         * @type {String}
         */
        _this.imgDescClassName = (0, _settings.defaultsStr)(opts.image_desc_class_name, 'descending');

        /**
         * Cell attribute key storing custom value used for sorting
         * @type {String}
         */
        _this.customKey = (0, _settings.defaultsStr)(opts.custom_key, 'data-tf-sortKey');

        /**
         * Callback fired when sort extension is instanciated
         * @type {Function}
         */
        _this.onSortLoaded = (0, _settings.defaultsFn)(opts.on_sort_loaded, _types.EMPTY_FN);

        /**
         * Callback fired before a table column is sorted
         * @type {Function}
         */
        _this.onBeforeSort = (0, _settings.defaultsFn)(opts.on_before_sort, _types.EMPTY_FN);

        /**
         * Callback fired after a table column is sorted
         * @type {Function}
         */
        _this.onAfterSort = (0, _settings.defaultsFn)(opts.on_after_sort, _types.EMPTY_FN);

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


    _createClass(AdapterSortableTable, [{
        key: 'init',
        value: function init() {
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

            this.onSortLoaded(tf, this);

            /*** SortableTable callbacks ***/
            this.stt.onbeforesort = function () {
                adpt.onBeforeSort(tf, adpt.stt.sortColumn);

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

                adpt.onAfterSort(tf, adpt.stt.sortColumn, adpt.stt.descending);
                adpt.emitter.emit('column-sorted', tf, adpt.stt.sortColumn, adpt.stt.descending);
            };

            // Column sort at start
            var sortColAtStart = adpt.sortColAtStart;
            if (sortColAtStart) {
                this.stt.sort(sortColAtStart[0], sortColAtStart[1]);
            }

            this.emitter.on(['sort'], function (tf, colIdx, desc) {
                return _this2.sortByColumnIndex(colIdx, desc);
            });

            /** @inherited */
            this.initialized = true;

            this.emitter.emit('sort-initialized', tf, this);
        }

        /**
         * Sort specified column
         * @param {Number} colIdx Column index
         * @param {Boolean} desc Optional: descending manner
         */

    }, {
        key: 'sortByColumnIndex',
        value: function sortByColumnIndex(colIdx, desc) {
            this.stt.sort(colIdx, desc);
        }

        /**
         * Set SortableTable overrides for TableFilter integration
         */

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
        }

        /**
         * Adds a sort type
         */

    }, {
        key: 'addSortType',
        value: function addSortType() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            // Extract the arguments
            var id = args[0],
                caster = args[1],
                sorter = args[2];

            SortableTable.prototype.addSortType(id, caster, sorter);
        }

        /**
         * Sets the sort types on a column basis
         * @private
         */

    }, {
        key: 'setSortTypes',
        value: function setSortTypes() {
            var _this3 = this;

            var tf = this.tf,
                sortTypes = this.sortTypes,
                _sortTypes = [];

            tf.eachCol(function (i) {
                var colType = void 0;
                if (sortTypes[i]) {
                    colType = sortTypes[i];
                    if ((0, _types.isObj)(colType)) {
                        if (colType.type === _const.DATE) {
                            colType = _this3._addDateType(i, sortTypes);
                        } else if (colType.type === _const.FORMATTED_NUMBER) {
                            var decimal = colType.decimal || tf.decimalSeparator;
                            colType = _this3._addNumberType(i, decimal);
                        }
                    } else {
                        colType = colType.toLowerCase();
                        if (colType === _const.DATE) {
                            colType = _this3._addDateType(i, sortTypes);
                        } else if (colType === _const.FORMATTED_NUMBER || colType === _const.NUMBER) {
                            colType = _this3._addNumberType(i, tf.decimalSeparator);
                        } else if (colType === _const.NONE) {
                            // TODO: normalise 'none' vs 'None'
                            colType = 'None';
                        }
                    }
                } else {
                    colType = _const.STRING;
                }
                _sortTypes.push(colType);
            });

            //Public TF method to add sort type

            //Custom sort types
            this.addSortType('caseinsensitivestring', SortableTable.toUpperCase);
            this.addSortType(_const.STRING);
            this.addSortType(_const.IP_ADDRESS, ipAddress, sortIP);

            this.stt = new SortableTable(tf.dom(), _sortTypes);

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
        }
    }, {
        key: '_addDateType',
        value: function _addDateType(colIndex, types) {
            var tf = this.tf;
            var dateType = tf.feature('dateType');
            var locale = dateType.getOptions(colIndex, types).locale || tf.locale;
            var colType = _const.DATE + '-' + locale;

            this.addSortType(colType, function (value) {
                var parsedDate = dateType.parse(value, locale);
                // Invalid date defaults to Wed Feb 04 -768 11:00:00
                return isNaN(+parsedDate) ? new Date(-86400000000000) : parsedDate;
            });
            return colType;
        }
    }, {
        key: '_addNumberType',
        value: function _addNumberType(colIndex, decimal) {
            var colType = '' + _const.FORMATTED_NUMBER + (decimal === '.' ? '' : '-custom');

            this.addSortType(colType, function (value) {
                return (0, _number.parse)(value, decimal);
            });
            return colType;
        }

        /**
         * Remove extension
         */

    }, {
        key: 'destroy',
        value: function destroy() {
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
        }
    }]);

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

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adapterEzEditTable = __webpack_require__(441);

var _adapterEzEditTable2 = _interopRequireDefault(_adapterEzEditTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _adapterEzEditTable2.default;

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _types = __webpack_require__(3);

var _sort = __webpack_require__(107);

var _const = __webpack_require__(15);

var _formatNumber = __webpack_require__(448);

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _settings = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVENTS = ['after-filtering', 'after-page-change', 'after-page-length-change'];

var SUM = 'sum';
var MEAN = 'mean';
var MIN = 'min';
var MAX = 'max';
var MEDIAN = 'median';
var Q1 = 'q1';
var Q3 = 'q3';

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
        var _this = _possibleConstructorReturn(this, (ColOps.__proto__ || Object.getPrototypeOf(ColOps)).call(this, tf, opts.name));

        _this.onBeforeOperation = (0, _settings.defaultsFn)(opts.on_before_operation, _types.EMPTY_FN);

        /**
         * Callback fired after columns operations are completed
         * @type {Function}
         */
        _this.onAfterOperation = (0, _settings.defaultsFn)(opts.on_after_operation, _types.EMPTY_FN);

        /**
         * Configuration options
         * @type {Object}
         */
        _this.opts = opts;

        /**
         * List of DOM element IDs containing column's calculation result
         * @type {Array}
         */
        _this.labelIds = (0, _settings.defaultsArr)(opts.id, []);

        /**
         * List of columns' indexes for calculations
         * @type {Array}
         */
        _this.colIndexes = (0, _settings.defaultsArr)(opts.col, []);

        /**
         * List of operations - possible values: 'sum', 'mean', 'min', 'max',
         * 'median', 'q1', 'q3'
         * @type {Array}
         */
        _this.operations = (0, _settings.defaultsArr)(opts.operation, []);

        /**
         * List of write methods used to write the result - possible values:
         * 'innerHTML', 'setValue', 'createTextNode'
         * @type {Array}
         */
        _this.outputTypes = (0, _settings.defaultsArr)(opts.write_method, []);

        /**
         * List of format objects used for formatting the result -
         * refer to https://github.com/componitable/format-number to check
         * configuration options
         * @type {Array}
         */
        _this.formatResults = (0, _settings.defaultsArr)(opts.format_result, []);

        /**
         * List of row indexes displaying the results
         * @type {Array}
         */
        _this.totRowIndexes = (0, _settings.defaultsArr)(opts.tot_row_index, []);

        /**
         * List of row indexes excluded from calculations
         * @type {Array}
         */
        _this.excludeRows = (0, _settings.defaultsArr)(opts.exclude_row, []);

        /**
         * List of decimal precision for calculation results
         * @type {Array}
         */
        _this.decimalPrecisions = (0, _settings.defaultsArr)(opts.decimal_precision, 2);

        _this.enable();
        return _this;
    }

    /**
     * Initializes ColOps instance
     */


    _createClass(ColOps, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            if (this.initialized) {
                return;
            }
            // subscribe to events
            this.emitter.on(EVENTS, function () {
                return _this2.calcAll();
            });

            this.calcAll();

            /** @inherited */
            this.initialized = true;
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
        key: 'calcAll',
        value: function calcAll() {
            var tf = this.tf;
            if (!tf.isInitialized()) {
                return;
            }

            this.onBeforeOperation(tf, this);
            this.emitter.emit('before-column-operation', tf, this);

            var colIndexes = this.colIndexes,
                colOperations = this.operations,
                outputTypes = this.outputTypes,
                totRowIndexes = this.totRowIndexes,
                excludeRows = this.excludeRows,
                formatResults = this.formatResults,
                decimalPrecisions = this.decimalPrecisions;

            //nuovella: determine unique list of columns to operate on

            var uIndexes = [];
            colIndexes.forEach(function (val) {
                if (uIndexes.indexOf(val) === -1) {
                    uIndexes.push(val);
                }
            });

            var nbCols = uIndexes.length,
                rows = tf.dom().rows,
                colValues = [];

            for (var u = 0; u < nbCols; u++) {
                //this retrieves col values
                //use uIndexes because we only want to pass through this loop
                //once for each column get the values in this unique column
                colValues.push(tf.getVisibleColumnData(uIndexes[u], false, excludeRows));

                var curValues = colValues[u];

                //next: calculate all operations for this column
                var result = 0,
                    operations = [],
                    precisions = [],
                    labels = [],
                    writeType = void 0,
                    formatResult = [],
                    idx = 0;

                for (var k = 0; k < colIndexes.length; k++) {
                    if (colIndexes[k] !== uIndexes[u]) {
                        continue;
                    }
                    operations[idx] = (colOperations[k] || 'sum').toLowerCase();
                    precisions[idx] = decimalPrecisions[k];
                    labels[idx] = this.labelIds[k];
                    writeType = (0, _types.isArray)(outputTypes) ? outputTypes[k] : null;
                    formatResult[idx] = this.configureFormat(uIndexes[u], formatResults[k]);
                    idx++;
                }

                for (var i = 0; i < idx; i++) {
                    // emit values before column calculation
                    this.emitter.emit('before-column-calc', tf, this, uIndexes[u], curValues, operations[i], precisions[i]);

                    result = Number(this.calc(curValues, operations[i], null));

                    // emit column calculation result
                    this.emitter.emit('column-calc', tf, this, uIndexes[u], result, operations[i], precisions[i]);

                    // write result in expected DOM element
                    this.writeResult(result, labels[i], writeType, precisions[i], formatResult[i]);
                } //for i

                // row(s) with result are always visible
                var totRow = totRowIndexes && totRowIndexes[u] ? rows[totRowIndexes[u]] : null;
                if (totRow) {
                    totRow.style.display = '';
                }
            } //for u

            this.onAfterOperation(tf, this);
            this.emitter.emit('after-column-operation', tf, this);
        }

        /**
         * Make desired calculation on specified column.
         * @param {Number} colIndex Column index
         * @param {String} [operation=SUM] Operation type
         * @param {Number} precision Decimal precision
         * @returns {Number}
         */

    }, {
        key: 'columnCalc',
        value: function columnCalc(colIndex) {
            var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SUM;
            var precision = arguments[2];

            var excludeRows = this.excludeRows || [];
            var colValues = tf.getVisibleColumnData(colIndex, false, excludeRows);

            return Number(this.calc(colValues, operation, precision));
        }

        /**
         * Make calculation on passed values.
         * @param {Array} values List of values
         * @param {String} [operation=SUM] Optional operation type
         * @param {Number} precision Optional result precision
         * @returns {Number}
         * @private
         */

    }, {
        key: 'calc',
        value: function calc(colValues) {
            var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SUM;
            var precision = arguments[2];

            var result = 0;

            if (operation === Q1 || operation === Q3 || operation === MEDIAN) {
                colValues = this.sortColumnValues(colValues, _sort.numSortAsc);
            }

            switch (operation) {
                case MEAN:
                    result = this.calcMean(colValues);
                    break;
                case SUM:
                    result = this.calcSum(colValues);
                    break;
                case MIN:
                    result = this.calcMin(colValues);
                    break;
                case MAX:
                    result = this.calcMax(colValues);
                    break;
                case MEDIAN:
                    result = this.calcMedian(colValues);
                    break;
                case Q1:
                    result = this.calcQ1(colValues);
                    break;
                case Q3:
                    result = this.calcQ3(colValues);
                    break;
            }

            return (0, _types.isEmpty)(precision) ? result : result.toFixed(precision);
        }

        /**
         * Calculate the sum of passed values.
         * @param {Array} [values=[]] List of values
         * @returns {Number}
         */

    }, {
        key: 'calcSum',
        value: function calcSum() {
            var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            if ((0, _types.isEmpty)(values)) {
                return 0;
            }
            var result = values.reduce(function (x, y) {
                return Number(x) + Number(y);
            });
            return result;
        }

        /**
         * Calculate the mean of passed values.
         * @param {Array} [values=[]] List of values
         * @returns {Number}
         */

    }, {
        key: 'calcMean',
        value: function calcMean() {
            var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var result = this.calcSum(values) / values.length;
            return Number(result);
        }

        /**
         * Calculate the max value of passed values.
         * @param {Array} [values=[]] List of values
         * @returns {Number}
         */

    }, {
        key: 'calcMax',
        value: function calcMax() {
            var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return Math.max.apply(null, values);
        }

        /**
         * Calculate the min value of passed values.
         * @param {Array} [values=[]] List of values
         * @returns {Number}
         */

    }, {
        key: 'calcMin',
        value: function calcMin() {
            var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return Math.min.apply(null, values);
        }

        /**
         * Calculate the median of passed values.
         * @param {Array} [values=[]] List of values
         * @returns {Number}
         */

    }, {
        key: 'calcMedian',
        value: function calcMedian() {
            var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var nbValues = values.length;
            var aux = 0;
            if (nbValues % 2 === 1) {
                aux = Math.floor(nbValues / 2);
                return Number(values[aux]);
            }
            return (Number(values[nbValues / 2]) + Number(values[nbValues / 2 - 1])) / 2;
        }

        /**
         * Calculate the lower quartile of passed values.
         * @param {Array} [values=[]] List of values
         * @returns {Number}
         */

    }, {
        key: 'calcQ1',
        value: function calcQ1() {
            var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var nbValues = values.length;
            var posa = 0.0;
            posa = Math.floor(nbValues / 4);
            if (4 * posa === nbValues) {
                return (Number(values[posa - 1]) + Number(values[posa])) / 2;
            }
            return Number(values[posa]);
        }

        /**
         * Calculate the upper quartile of passed values.
         * @param {Array} [values=[]] List of values
         * @returns {Number}
         */

    }, {
        key: 'calcQ3',
        value: function calcQ3() {
            var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var nbValues = values.length;
            var posa = 0.0;
            var posb = 0.0;
            posa = Math.floor(nbValues / 4);
            if (4 * posa === nbValues) {
                posb = 3 * posa;
                return (Number(values[posb]) + Number(values[posb - 1])) / 2;
            }
            return Number(values[nbValues - posa - 1]);
        }

        /**
         * Sort passed values with supplied sorter function.
         * @param {Array} [values=[]] List of values to be sorted
         * @param {Function} sorter Sorter function
         * @returns {Array}
         */

    }, {
        key: 'sortColumnValues',
        value: function sortColumnValues() {
            var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var sorter = arguments[1];

            return values.sort(sorter);
        }

        /**
         * Write calculation result in passed DOM element with supplied write method
         * and decimal precision.
         * @param {Number} [result=0] Calculation result
         * @param {DOMElement} label DOM element
         * @param {String} [writeType='innerhtml'] Write method
         * @param {Number} [precision=2] Applied decimal precision
         * @private
         */

    }, {
        key: 'writeResult',
        value: function writeResult() {
            var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var label = arguments[1];
            var writeType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'innerhtml';
            var precision = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
            var format = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

            var labelElm = (0, _dom.elm)(label);

            if (!labelElm) {
                return;
            }

            result = result.toFixed(precision);
            if (isNaN(result) || !isFinite(result)) {
                result = '';
            } else {
                result = (0, _formatNumber2.default)(format)(result);
            }

            switch (writeType.toLowerCase()) {
                case 'innerhtml':
                    labelElm.innerHTML = result;
                    break;
                case 'setvalue':
                    labelElm.value = result;
                    break;
                case 'createtextnode':
                    var oldNode = labelElm.firstChild;
                    var txtNode = (0, _dom.createText)(result);
                    labelElm.replaceChild(txtNode, oldNode);
                    break;
            }
        }

        /**
         * Configure the format options used to format the operation result based
         * on column type.
         * @param {Number} colIndex Column index
         * @param {Object} [format={}] Format object
         * @returns {Object}
         * @private
         */

    }, {
        key: 'configureFormat',
        value: function configureFormat(colIndex) {
            var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var tf = this.tf;
            if (tf.hasType(colIndex, [_const.FORMATTED_NUMBER])) {
                var colType = tf.colTypes[colIndex];
                if (colType.decimal && !format.decimal) {
                    format.decimal = colType.decimal;
                }
                if (colType.thousands && !format.integerSeparator) {
                    format.integerSeparator = colType.thousands;
                }
            } else {
                format.decimal = format.decimal || '';
                format.integerSeparator = format.integerSeparator || '';
            }
            return format;
        }

        /** Remove extension */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this3 = this;

            if (!this.initialized) {
                return;
            }
            // unsubscribe to events
            this.emitter.off(EVENTS, function () {
                return _this3.calcAll();
            });

            this.initialized = false;
        }
    }]);

    return ColOps;
}(_feature.Feature);

exports.default = ColOps;

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _types = __webpack_require__(3);

var _event = __webpack_require__(19);

var _root = __webpack_require__(16);

var _const = __webpack_require__(15);

var _settings = __webpack_require__(7);

var _toolbar = __webpack_require__(33);

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
        var _this = _possibleConstructorReturn(this, (ColsVisibility.__proto__ || Object.getPrototypeOf(ColsVisibility)).call(this, tf, f.name));

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
        _this.desc = (0, _settings.defaultsStr)(f.description, 'Columns visibility manager');

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
        _this.tickToHide = (0, _settings.defaultsBool)(f.tick_to_hide, true);

        /**
         * Enable columns manager UI, defaults to true
         * @type {Boolean}
         */
        _this.manager = (0, _settings.defaultsBool)(f.manager, true);

        /**
         * Headers HTML table reference only if headers are external
         * @type {DOMElement}
         */
        _this.headersTbl = f.headers_table || null;

        /**
         * Headers row index only if headers are external
         * @type {Number}
         */
        _this.headersIndex = (0, _settings.defaultsNb)(f.headers_index, 1);

        /**
         * ID of main container element
         * @type {String}
         */
        _this.contElTgtId = (0, _settings.defaultsStr)(f.container_target_id, null);

        /**
         * Alternative text for column headers in column manager UI
         * @type {Array}
         */
        _this.headersText = (0, _settings.defaultsArr)(f.headers_text, []);

        /**
         * ID of button's container element
         * @type {String}
         */
        _this.btnTgtId = (0, _settings.defaultsStr)(f.btn_target_id, null);

        /**
         * Button's text, defaults to Columns&#9660;
         * @type {String}
         */
        _this.btnText = (0, _settings.defaultsStr)(f.btn_text, 'Columns&#9660;');

        /**
         * Button's inner HTML
         * @type {String}
         */
        _this.btnHtml = (0, _settings.defaultsStr)(f.btn_html, null);

        /**
         * Css class for button
         * @type {String}
         */
        _this.btnCssClass = (0, _settings.defaultsStr)(f.btn_css_class, 'colVis');

        /**
         * Columns manager UI close link text, defaults to 'Close'
         * @type {String}
         */
        _this.btnCloseText = (0, _settings.defaultsStr)(f.btn_close_text, 'Close');

        /**
         * Columns manager UI close link HTML
         * @type {String}
         */
        _this.btnCloseHtml = (0, _settings.defaultsStr)(f.btn_close_html, null);

        /**
         * Css for columns manager UI close link
         * @type {String}
         */
        _this.btnCloseCssClass = (0, _settings.defaultsStr)(f.btn_close_css_class, _this.btnCssClass);

        /**
         * Extension's stylesheet filename
         * @type {String}
         */
        _this.stylesheet = (0, _settings.defaultsStr)(f.stylesheet, 'colsVisibility.css');

        /**
         * Css for columns manager UI span
         * @type {String}
         */
        _this.spanCssClass = (0, _settings.defaultsStr)(f.span_css_class, 'colVisSpan');

        /**
         * Css for columns manager UI main container
         * @type {String}
         */
        _this.contCssClass = (0, _settings.defaultsStr)(f.cont_css_class, 'colVisCont');

        /**
         * Css for columns manager UI checklist (ul)
         * @type {String}
         */
        _this.listCssClass = (0, _settings.defaultsStr)(cfg.list_css_class, 'cols_checklist');

        /**
         * Css for columns manager UI checklist item (li)
         * @type {String}
         */
        _this.listItemCssClass = (0, _settings.defaultsStr)(cfg.checklist_item_css_class, 'cols_checklist_item');

        /**
         * Css for columns manager UI checklist item selected state (li)
         * @type {String}
         */
        _this.listSlcItemCssClass = (0, _settings.defaultsStr)(cfg.checklist_selected_item_css_class, 'cols_checklist_slc_item');

        /**
         * Text preceding the columns list, defaults to 'Hide' or 'Show'
         * depending on tick mode (tick_to_hide option)
         * @type {String}
         */
        _this.text = (0, _settings.defaultsStr)(f.text, _this.tickToHide ? 'Hide: ' : 'Show: ');

        /**
         * List of columns indexes to be hidden at initialization
         * @type {Array}
         */
        _this.atStart = (0, _settings.defaultsArr)(f.at_start, []);

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
        _this.tickAllText = (0, _settings.defaultsStr)(f.tick_all_text, 'Select all:');

        /**
         * Default position in toolbar ('left'|'center'|'right')
         * @type {String}
         */
        _this.toolbarPosition = (0, _settings.defaultsStr)(f.toolbar_position, _toolbar.RIGHT);

        /**
         * List of indexes of hidden columns
         * @private
         */
        _this.hiddenCols = [];

        /**
         * Bound mouseup wrapper
         * @private
         */
        _this.boundMouseup = null;

        /**
         * Callback fired when the extension is initialized
         * @type {Function}
         */
        _this.onLoaded = (0, _settings.defaultsFn)(f.on_loaded, _types.EMPTY_FN);

        /**
         * Callback fired before the columns manager is opened
         * @type {Function}
         */
        _this.onBeforeOpen = (0, _settings.defaultsFn)(f.on_before_open, _types.EMPTY_FN);

        /**
         * Callback fired after the columns manager is opened
         * @type {Function}
         */
        _this.onAfterOpen = (0, _settings.defaultsFn)(f.on_after_open, _types.EMPTY_FN);

        /**
         * Callback fired before the columns manager is closed
         * @type {Function}
         */
        _this.onBeforeClose = (0, _settings.defaultsFn)(f.on_before_close, _types.EMPTY_FN);

        /**
         * Callback fired after the columns manager is closed
         * @type {Function}
         */
        _this.onAfterClose = (0, _settings.defaultsFn)(f.on_after_close, _types.EMPTY_FN);

        /**
         * Callback fired before a column is hidden
         * @type {Function}
         */
        _this.onBeforeColHidden = (0, _settings.defaultsFn)(f.on_before_col_hidden, _types.EMPTY_FN);

        /**
         * Callback fired after a column is hidden
         * @type {Function}
         */
        _this.onAfterColHidden = (0, _settings.defaultsFn)(f.on_after_col_hidden, _types.EMPTY_FN);

        /**
         * Callback fired before a column is displayed
         * @type {Function}
         */
        _this.onBeforeColDisplayed = (0, _settings.defaultsFn)(f.on_before_col_displayed, _types.EMPTY_FN);

        /**
         * Callback fired after a column is displayed
         * @type {Function}
         */
        _this.onAfterColDisplayed = (0, _settings.defaultsFn)(f.on_after_col_displayed, _types.EMPTY_FN);

        //Grid layout support
        if (tf.gridLayout) {
            _this.headersTbl = tf.feature('gridLayout').headTbl; //headers table
            _this.headersIndex = 0; //headers index
        }

        //Loads extension stylesheet
        tf.import(f.name + 'Style', tf.getStylePath() + _this.stylesheet, null, 'link');

        _this.enable();
        return _this;
    }

    /**
     * Mouse-up event handler handling popup auto-close behaviour
     * @private
     */


    _createClass(ColsVisibility, [{
        key: 'onMouseup',
        value: function onMouseup(evt) {
            var targetElm = (0, _event.targetEvt)(evt);

            while (targetElm && targetElm !== this.contEl && targetElm !== this.btnEl) {
                targetElm = targetElm.parentNode;
            }

            if (targetElm !== this.contEl && targetElm !== this.btnEl) {
                this.toggle();
            }

            return;
        }

        /**
         * Toggle columns manager UI
         */

    }, {
        key: 'toggle',
        value: function toggle() {
            // ensure mouseup event handler is removed
            (0, _event.removeEvt)(_root.root, 'mouseup', this.boundMouseup);

            var contDisplay = this.contEl.style.display;

            if (contDisplay !== 'inline') {
                this.onBeforeOpen(this);
            }
            if (contDisplay === 'inline') {
                this.onBeforeClose(this);
            }

            this.contEl.style.display = contDisplay === 'inline' ? _const.NONE : 'inline';

            if (contDisplay !== 'inline') {
                this.onAfterOpen(this);
                (0, _event.addEvt)(_root.root, 'mouseup', this.boundMouseup);
            }
            if (contDisplay === 'inline') {
                this.onAfterClose(this);
            }
        }

        /**
         * Check an item in columns manager UI
         * @private
         */

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
                (0, _dom.addClass)(li, this.listSlcItemCssClass);
            } else {
                (0, _dom.removeClass)(li, this.listSlcItemCssClass);
            }

            var hide = false;
            if (this.tickToHide && isChecked || !this.tickToHide && !isChecked) {
                hide = true;
            }
            this.setHidden(colIndex, hide);
        }

        /**
         * Initializes ColsVisibility instance
         */

    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            if (this.initialized || !this.manager) {
                return;
            }

            this.emitter.emit('initializing-extension', this, !(0, _types.isNull)(this.btnTgtId));

            this.emitter.on(['hide-column'], function (tf, colIndex) {
                return _this2.hideCol(colIndex);
            });

            this.buildBtn();
            this.buildManager();

            /** @inherited */
            this.initialized = true;

            this.boundMouseup = this.onMouseup.bind(this);

            this.emitter.emit('columns-visibility-initialized', this.tf, this);
            this.emitter.emit('extension-initialized', this);

            // Hide columns at start at very end of initialization, do not move
            // as order is important
            this._hideAtStart();
        }

        /**
         * Build main button UI
         */

    }, {
        key: 'buildBtn',
        value: function buildBtn() {
            var _this3 = this;

            if (this.btnEl) {
                return;
            }
            var tf = this.tf;
            var span = (0, _dom.createElm)('span');
            span.className = this.spanCssClass;

            // Container element (rdiv or custom element)
            var targetEl = !this.btnTgtId ? tf.feature('toolbar').container(this.toolbarPosition) : (0, _dom.elm)(this.btnTgtId);

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
                // Custom html
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

            this.onLoaded(this);
        }

        /**
         * Build columns manager UI
         */

    }, {
        key: 'buildManager',
        value: function buildManager() {
            var _this4 = this;

            var tf = this.tf;

            var container = !this.contElTgtId ? (0, _dom.createElm)('div') : (0, _dom.elm)(this.contElTgtId);
            container.className = this.contCssClass;

            //Extension description
            var extNameLabel = (0, _dom.createElm)('p');
            extNameLabel.innerHTML = this.text;
            container.appendChild(extNameLabel);

            //Headers list
            var ul = (0, _dom.createElm)('ul');
            ul.className = this.listCssClass;

            var tbl = this.headersTbl || tf.dom();
            var headerIndex = this.headersTbl ? this.headersIndex : tf.getHeadersRowIndex();
            var headerRow = tbl.rows[headerIndex];

            //Tick all option
            if (this.enableTickAll) {
                var li = (0, _dom.createCheckItem)('col__' + tf.id, this.tickAllText, this.tickAllText);
                (0, _dom.addClass)(li, this.listItemCssClass);
                ul.appendChild(li);
                li.check.checked = !this.tickToHide;

                (0, _event.addEvt)(li.check, 'click', function () {
                    for (var h = 0; h < headerRow.cells.length; h++) {
                        var itm = (0, _dom.elm)('col_' + h + '_' + tf.id);
                        if (itm && li.check.checked !== itm.checked) {
                            itm.click();
                            itm.checked = li.check.checked;
                        }
                    }
                });
            }

            for (var i = 0; i < headerRow.cells.length; i++) {
                var cell = headerRow.cells[i];
                var cellText = this.headersText[i] || this._getHeaderText(cell);
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
        }

        /**
         * Hide or show specified columns
         * @param {Number} colIndex Column index
         * @param {Boolean} hide    Hide column if true or show if false
         */

    }, {
        key: 'setHidden',
        value: function setHidden(colIndex, hide) {
            var tf = this.tf;
            var tbl = tf.dom();

            if (hide) {
                this.onBeforeColHidden(this, colIndex);
            } else {
                this.onBeforeColDisplayed(this, colIndex);
            }

            this._hideElements(tbl, colIndex, hide);
            if (this.headersTbl) {
                this._hideElements(this.headersTbl, colIndex, hide);
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

            if (hide) {
                this.onAfterColHidden(this, colIndex);
                this.emitter.emit('column-hidden', tf, this, colIndex, this.hiddenCols);
            } else {
                this.onAfterColDisplayed(this, colIndex);
                this.emitter.emit('column-shown', tf, this, colIndex, this.hiddenCols);
            }
        }

        /**
         * Show specified column
         * @param  {Number} colIndex Column index
         */

    }, {
        key: 'showCol',
        value: function showCol(colIndex) {
            if ((0, _types.isUndef)(colIndex) || !this.isColHidden(colIndex)) {
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
        }

        /**
         * Hide specified column
         * @param  {Number} colIndex Column index
         */

    }, {
        key: 'hideCol',
        value: function hideCol(colIndex) {
            if ((0, _types.isUndef)(colIndex) || this.isColHidden(colIndex)) {
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
            if ((0, _types.isUndef)(colIndex) || this.isColHidden(colIndex)) {
                this.showCol(colIndex);
            } else {
                this.hideCol(colIndex);
            }
        }

        /**
         * Return the indexes of the columns currently hidden
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

            this.boundMouseup = null;

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
                        return (0, _dom.getText)(n);
                    }
                }
                continue;
            }
            return '';
        }
    }, {
        key: '_hideElements',
        value: function _hideElements(tbl, colIdx, hide) {
            this._hideCells(tbl, colIdx, hide);
            this._hideCol(tbl, colIdx, hide);
        }
    }, {
        key: '_hideCells',
        value: function _hideCells(tbl, colIdx, hide) {
            for (var i = 0; i < tbl.rows.length; i++) {
                var row = tbl.rows[i];
                var cell = row.cells[colIdx];
                if (cell) {
                    cell.style.display = hide ? _const.NONE : '';
                }
            }
        }
    }, {
        key: '_hideCol',
        value: function _hideCol(tbl, colIdx, hide) {
            var colElms = (0, _dom.tag)(this.tf.dom(), 'col');
            if (colElms.length === 0) {
                return;
            }
            colElms[colIdx].style.display = hide ? _const.NONE : '';
        }
    }, {
        key: '_hideAtStart',
        value: function _hideAtStart() {
            var _this6 = this;

            this.atStart.forEach(function (colIdx) {
                _this6.hideCol(colIdx);
            });
        }
    }]);

    return ColsVisibility;
}(_feature.Feature);

exports.default = ColsVisibility;

/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(11);

var _dom = __webpack_require__(10);

var _types = __webpack_require__(3);

var _event = __webpack_require__(19);

var _settings = __webpack_require__(7);

var _toolbar = __webpack_require__(33);

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
                var _this = _possibleConstructorReturn(this, (FiltersVisibility.__proto__ || Object.getPrototypeOf(FiltersVisibility)).call(this, tf, f.name));

                _this.name = f.name;

                /**
                 * Module description
                 * @type {String}
                 */
                _this.desc = (0, _settings.defaultsStr)(f.description, 'Filters row visibility manager');

                /**
                 * Extension's stylesheet filename
                 * @type {String}
                 */
                _this.stylesheet = (0, _settings.defaultsStr)(f.stylesheet, 'filtersVisibility.css');

                /**
                 * Expand icon filename
                 * @type {String}
                 */
                _this.icnExpand = (0, _settings.defaultsStr)(f.expand_icon_name, 'icn_exp.png');

                /**
                 * Collapse icon filename
                 * @type {String}
                 */
                _this.icnCollapse = (0, _settings.defaultsStr)(f.collapse_icon_name, 'icn_clp.png');

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
                _this.enableIcon = (0, _settings.defaultsBool)(f.enable_icon, true);

                /**
                 * Custom text for button
                 * @type {String}
                 */
                _this.btnText = (0, _settings.defaultsStr)(f.btn_text, '');

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
                _this.btnHtml = (0, _settings.defaultsStr)(f.btn_html, null);

                /**
                 * Css class for expand/collapse filters button
                 * @type {String}
                 */
                _this.btnCssClass = (0, _settings.defaultsStr)(f.btn_css_class, 'btnExpClpFlt');

                /**
                 * Css class for main container
                 * @type {String}
                 */
                _this.contCssClass = (0, _settings.defaultsStr)(f.cont_css_class, 'expClpFlt');

                /**
                 * Filters row index
                 * @type {Number}
                 */
                _this.filtersRowIndex = (0, _settings.defaultsNb)(f.filters_row_index, tf.getFiltersRowIndex());

                /**
                 * Make filters visible at initialization, defaults to true
                 * @type {Boolean}
                 */
                _this.visibleAtStart = (0, _settings.defaultsNb)(f.visible_at_start, true);

                /**
                 * Default position in toolbar ('left'|'center'|'right')
                 * @type {String}
                 */
                _this.toolbarPosition = (0, _settings.defaultsStr)(f.toolbar_position, _toolbar.RIGHT);

                /**
                 * Callback fired before filters row is shown
                 * @type {Function}
                 */
                _this.onBeforeShow = (0, _settings.defaultsFn)(f.on_before_show, _types.EMPTY_FN);

                /**
                 * Callback fired after filters row is shown
                 * @type {Function}
                 */
                _this.onAfterShow = (0, _settings.defaultsFn)(f.on_after_show, _types.EMPTY_FN);

                /**
                 * Callback fired before filters row is hidden
                 * @type {Function}
                 */
                _this.onBeforeHide = (0, _settings.defaultsFn)(f.on_before_hide, _types.EMPTY_FN);

                /**
                 * Callback fired after filters row is hidden
                 * @type {Function}
                 */
                _this.onAfterHide = (0, _settings.defaultsFn)(f.on_after_hide, _types.EMPTY_FN);

                //Import extension's stylesheet
                tf.import(f.name + 'Style', tf.getStylePath() + _this.stylesheet, null, 'link');

                _this.enable();
                return _this;
        }

        /**
         * Initialise extension
         */


        _createClass(FiltersVisibility, [{
                key: 'init',
                value: function init() {
                        var _this2 = this;

                        if (this.initialized) {
                                return;
                        }

                        this.emitter.emit('initializing-extension', this, !(0, _types.isNull)(this.targetId));

                        this.buildUI();

                        /** @inherited */
                        this.initialized = true;

                        this.emitter.on(['show-filters'], function (tf, visible) {
                                return _this2.show(visible);
                        });
                        this.emitter.emit('filters-visibility-initialized', this.tf, this);
                        this.emitter.emit('extension-initialized', this);
                }

                /**
                 * Build UI elements
                 */

        }, {
                key: 'buildUI',
                value: function buildUI() {
                        var _this3 = this;

                        var tf = this.tf;
                        var span = (0, _dom.createElm)('span');
                        span.className = this.contCssClass;

                        // Container element (rdiv or custom element)
                        var targetEl = !this.targetId ? tf.feature('toolbar').container(this.toolbarPosition) : (0, _dom.elm)(this.targetId);

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
                                // Custom html
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
                }

                /**
                 * Toggle filters visibility
                 */

        }, {
                key: 'toggle',
                value: function toggle() {
                        var tf = this.tf;
                        var tbl = tf.gridLayout ? tf.feature('gridLayout').headTbl : tf.dom();
                        var fltRow = tbl.rows[this.filtersRowIndex];
                        var isDisplayed = fltRow.style.display === '';

                        this.show(!isDisplayed);
                }

                /**
                 * Show or hide filters
                 *
                 * @param {boolean} [visible=true] Visibility flag
                 */

        }, {
                key: 'show',
                value: function show() {
                        var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                        var tf = this.tf;
                        var tbl = tf.gridLayout ? tf.feature('gridLayout').headTbl : tf.dom();
                        var fltRow = tbl.rows[this.filtersRowIndex];

                        if (visible) {
                                this.onBeforeShow(this);
                        }
                        if (!visible) {
                                this.onBeforeHide(this);
                        }

                        fltRow.style.display = visible ? '' : 'none';
                        if (this.enableIcon && !this.btnHtml) {
                                this.btnEl.innerHTML = visible ? this.collapseBtnHtml : this.expandBtnHtml;
                        }

                        if (visible) {
                                this.onAfterShow(this);
                        }
                        if (!visible) {
                                this.onAfterHide(this);
                        }

                        this.emitter.emit('filters-toggled', tf, this, visible);
                }

                /**
                 * Destroy the UI
                 */

        }, {
                key: 'destroy',
                value: function destroy() {
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
                }
        }]);

        return FiltersVisibility;
}(_feature.Feature);

exports.default = FiltersVisibility;

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _adapterSortabletable = __webpack_require__(442);

var _adapterSortabletable2 = _interopRequireDefault(_adapterSortabletable);

var _root = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!_root.root.SortableTable) {
    __webpack_require__(449);
}

exports.default = _adapterSortabletable2.default;

/***/ }),

/***/ 448:
/***/ (function(module, exports) {


module.exports = formatter;
module.exports.default = formatter;

function formatter(options) {
  options = options || {};


  // *********************************************************************************************
  // Set defaults for negatives
  // options.negative, options.negativeOut, options.separator retained for backward compatibility
  // *********************************************************************************************

  // type of negative; default left
  options.negativeType = options.negativeType || (options.negative === 'R' ? 'right' : 'left')

  // negative symbols '-' or '()'
  if (typeof options.negativeLeftSymbol !== 'string') {
    switch (options.negativeType) {
      case 'left':
        options.negativeLeftSymbol = '-';
        break;
      case 'brackets':
        options.negativeLeftSymbol = '(';
        break;
      default:
        options.negativeLeftSymbol = '';
    }
  }
  if (typeof options.negativeRightSymbol !== 'string') {
    switch (options.negativeType) {
      case 'right':
        options.negativeRightSymbol = '-';
        break;
      case 'brackets':
        options.negativeRightSymbol = ')';
        break;
      default:
        options.negativeRightSymbol = '';
    }
  }

  // whether negative symbol should be inside/outside prefix and suffix

  if (typeof options.negativeLeftOut !== "boolean") {
    options.negativeLeftOut = (options.negativeOut === false ? false : true);
  }
  if (typeof options.negativeRightOut !== "boolean") {
    options.negativeRightOut = (options.negativeOut === false ? false : true);
  }

  //prefix and suffix
  options.prefix = options.prefix || '';
  options.suffix = options.suffix || '';

  //separators
  if (typeof options.integerSeparator !== 'string') {
    options.integerSeparator = (typeof options.separator === 'string' ? options.separator : ',');
  }
  options.decimalsSeparator = typeof options.decimalsSeparator === 'string' ? options.decimalsSeparator : '';
  options.decimal = options.decimal || '.';

  //padders
  options.padLeft = options.padLeft || -1 //default no padding
  options.padRight = options.padRight || -1 //default no padding

  function format(number, overrideOptions) {
    overrideOptions = overrideOptions || {};

    if (number || number === 0) {
      number = '' + number;//convert number to string if it isn't already
    } else {
      return '';
    }

    //identify a negative number and make it absolute
    var output = [];
    var negative = number.charAt(0) === '-';
    number = number.replace(/^\-/g, '');

    //Prepare output with left hand negative and/or prefix
    if (!options.negativeLeftOut && !overrideOptions.noUnits) {
      output.push(options.prefix);
    }
    if (negative) {
      output.push(options.negativeLeftSymbol);
    }
    if (options.negativeLeftOut && !overrideOptions.noUnits) {
      output.push(options.prefix);
    }

    //Format core number
    number = number.split('.');
    if (options.round != null) round(number, options.round);
    if (options.truncate != null) number[1] = truncate(number[1], options.truncate);
    if (options.padLeft > 0) number[0] = padLeft(number[0], options.padLeft);
    if (options.padRight > 0) number[1] = padRight(number[1], options.padRight);
    if (!overrideOptions.noSeparator && number[1]) number[1] = addDecimalSeparators(number[1], options.decimalsSeparator);
    if (!overrideOptions.noSeparator && number[0]) number[0] = addIntegerSeparators(number[0], options.integerSeparator);
    output.push(number[0]);
    if (number[1]) {
      output.push(options.decimal);
      output.push(number[1]);
    }

    //Prepare output with right hand negative and/or prefix
    if (options.negativeRightOut && !overrideOptions.noUnits) {
      output.push(options.suffix);
    }
    if (negative) {
      output.push(options.negativeRightSymbol);
    }
    if (!options.negativeRightOut && !overrideOptions.noUnits) {
      output.push(options.suffix);
    }

    //join output and return
    return output.join('');
  }

  format.negative = options.negative;
  format.negativeOut = options.negativeOut;
  format.negativeType = options.negativeType;
  format.negativeLeftOut = options.negativeLeftOut;
  format.negativeLeftSymbol = options.negativeLeftSymbol;
  format.negativeRightOut = options.negativeRightOut;
  format.negativeRightSymbol = options.negativeRightSymbol;
  format.prefix = options.prefix;
  format.suffix = options.suffix;
  format.separate = options.separate;
  format.integerSeparator = options.integerSeparator;
  format.decimalsSeparator = options.decimalsSeparator;
  format.decimal = options.decimal;
  format.padLeft = options.padLeft;
  format.padRight = options.padRight;
  format.truncate = options.truncate;
  format.round = options.round;

  function unformat(number, allowedSeparators) {
    allowedSeparators = allowedSeparators || [];
    if (options.allowedSeparators) {
      options.allowedSeparators.forEach(function (s) { allowedSeparators.push (s); });
    }
    allowedSeparators.push(options.integerSeparator);
    allowedSeparators.push(options.decimalsSeparator);
    number = number.replace(options.prefix, '');
    number = number.replace(options.suffix, '');
    var newNumber = number;
    do {
      number = newNumber;
      for (var i = 0; i < allowedSeparators.length; i++) {
        newNumber = newNumber.replace(allowedSeparators[i], '');
      }
    } while (newNumber != number);
    return number;
  }
  format.unformat = unformat;

  function validate(number, allowedSeparators) {
    number = unformat(number, allowedSeparators);
    number = number.split(options.decimal);
    if (number.length > 2) {
      return false;
    } else if (options.truncate != null && number[1] && number[1].length > options.truncate) {
      return false;
    }  else if (options.round != null && number[1] && number[1].length > options.round) {
      return false;
    } else {
      return /^-?\d+\.?\d*$/.test(number);
    }
  }
  return format;
}

//where x is already the integer part of the number
function addIntegerSeparators(x, separator) {
  x += '';
  if (!separator) return x;
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x)) {
    x = x.replace(rgx, '$1' + separator + '$2');
  }
  return x;
}

//where x is already the decimal part of the number
function addDecimalSeparators(x, separator) {
  x += '';
  if (!separator) return x;
  var rgx = /(\d{3})(\d+)/;
  while (rgx.test(x)) {
    x = x.replace(rgx, '$1' + separator + '$2');
  }
  return x;
}

//where x is the integer part of the number
function padLeft(x, padding) {
  x = x + '';
  var buf = [];
  while (buf.length + x.length < padding) {
    buf.push('0');
  }
  return buf.join('') + x;
}

//where x is the decimals part of the number
function padRight(x, padding) {
  if (x) {
    x += '';
  } else {
    x = '';
  }
  var buf = [];
  while (buf.length + x.length < padding) {
    buf.push('0');
  }
  return x + buf.join('');
}
function truncate(x, length) {
  if (x) {
    x += '';
  }
  if (x && x.length > length) {
    return x.substr(0, length);
  } else {
    return x;
  }
}

//where number is an array with 0th item as integer string and 1st item as decimal string (no negatives)
function round(number, places) {
  if (number[1] && places >= 0 && number[1].length > places) {
    //truncate to correct number of decimal places
    var decim = number[1].slice(0, places);
    //if next digit was >= 5 we need to round up
    if (+(number[1].substr(places, 1)) >= 5) {
      //But first count leading zeros as converting to a number will loose them
      var leadingzeros = "";
      while (decim.charAt(0)==="0") {
        leadingzeros = leadingzeros + "0";
        decim = decim.substr(1);
      }
      //Then we can change decim to a number and add 1 before replacing leading zeros
      decim = (+decim + 1) + '';
      decim = leadingzeros + decim;
      if (decim.length > places) {
        //adding one has made it longer
        number[0] = (+number[0]+ +decim.charAt(0)) + ''; //add value of firstchar to the integer part
        decim = decim.substring(1);   //ignore the 1st char at the beginning which is the carry to the integer part
      }
    }
    number[1] = decim;
  }
  return number;
}


/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(450)(__webpack_require__(451)+"\n\n// SCRIPT-LOADER FOOTER\n//# sourceURL=script:///C:/Users/max.guglielmi/Documents/dev/perso/javascript/GitHub/TableFilter/libs/sortabletable.js")

/***/ }),

/***/ 450:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 451:
/***/ (function(module, exports) {

module.exports = "/*----------------------------------------------------------------------------\\\r\n|                            Sortable Table 1.12                              |\r\n|-----------------------------------------------------------------------------|\r\n|                         Created by Erik Arvidsson                           |\r\n|                  (http://webfx.eae.net/contact.html#erik)                   |\r\n|                      For WebFX (http://webfx.eae.net/)                      |\r\n|-----------------------------------------------------------------------------|\r\n| A DOM 1 based script that allows an ordinary HTML table to be sortable.     |\r\n|-----------------------------------------------------------------------------|\r\n|                  Copyright (c) 1998 - 2006 Erik Arvidsson                   |\r\n|-----------------------------------------------------------------------------|\r\n| Licensed under the Apache License, Version 2.0 (the \"License\"); you may not |\r\n| use this file except in compliance with the License.  You may obtain a copy |\r\n| of the License at http://www.apache.org/licenses/LICENSE-2.0                |\r\n| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |\r\n| Unless  required  by  applicable law or  agreed  to  in  writing,  software |\r\n| distributed under the License is distributed on an  \"AS IS\" BASIS,  WITHOUT |\r\n| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |\r\n| License  for the  specific language  governing permissions  and limitations |\r\n| under the License.                                                          |\r\n|-----------------------------------------------------------------------------|\r\n| 2003-01-10 | First version                                                  |\r\n| 2003-01-19 | Minor changes to the date parsing                              |\r\n| 2003-01-28 | JScript 5.0 fixes (no support for 'in' operator)               |\r\n| 2003-02-01 | Sloppy typo like error fixed in getInnerText                   |\r\n| 2003-07-04 | Added workaround for IE cellIndex bug.                         |\r\n| 2003-11-09 | The bDescending argument to sort was not correctly working     |\r\n|            | Using onclick DOM0 event if no support for addEventListener    |\r\n|            | or attachEvent                                                 |\r\n| 2004-01-13 | Adding addSortType and removeSortType which makes it a lot     |\r\n|            | easier to add new, custom sort types.                          |\r\n| 2004-01-27 | Switch to use descending = false as the default sort order.    |\r\n|            | Change defaultDescending to suit your needs.                   |\r\n| 2004-03-14 | Improved sort type None look and feel a bit                    |\r\n| 2004-08-26 | Made the handling of tBody and tHead more flexible. Now you    |\r\n|            | can use another tHead or no tHead, and you can chose some      |\r\n|            | other tBody.                                                   |\r\n| 2006-04-25 | Changed license to Apache Software License 2.0                 |\r\n|-----------------------------------------------------------------------------|\r\n| Created 2003-01-10 | All changes are in the log above. | Updated 2006-04-25 |\r\n\\----------------------------------------------------------------------------*/\r\n\r\n\r\nfunction SortableTable(oTable, oSortTypes) {\r\n\r\n\tthis.sortTypes = oSortTypes || [];\r\n\r\n\tthis.sortColumn = null;\r\n\tthis.descending = null;\r\n\r\n\tvar oThis = this;\r\n\tthis._headerOnclick = function (e) {\r\n\t\toThis.headerOnclick(e);\r\n\t};\r\n\r\n\tif (oTable) {\r\n\t\tthis.setTable( oTable );\r\n\t\tthis.document = oTable.ownerDocument || oTable.document;\r\n\t}\r\n\telse {\r\n\t\tthis.document = document;\r\n\t}\r\n\r\n\r\n\t// only IE needs this\r\n\tvar win = this.document.defaultView || this.document.parentWindow;\r\n\tthis._onunload = function () {\r\n\t\toThis.destroy();\r\n\t};\r\n\tif (win && typeof win.attachEvent != \"undefined\") {\r\n\t\twin.attachEvent(\"onunload\", this._onunload);\r\n\t}\r\n}\r\n\r\nSortableTable.gecko = navigator.product == \"Gecko\";\r\nSortableTable.msie = /msie/i.test(navigator.userAgent);\r\n// Mozilla is faster when doing the DOM manipulations on\r\n// an orphaned element. MSIE is not\r\nSortableTable.removeBeforeSort = SortableTable.gecko;\r\n\r\nSortableTable.prototype.onsort = function () {};\r\n\r\n// default sort order. true -> descending, false -> ascending\r\nSortableTable.prototype.defaultDescending = false;\r\n\r\n// shared between all instances. This is intentional to allow external files\r\n// to modify the prototype\r\nSortableTable.prototype._sortTypeInfo = {};\r\n\r\nSortableTable.prototype.setTable = function (oTable) {\r\n\tif ( this.tHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.element = oTable;\r\n\tthis.setTHead( oTable.tHead );\r\n\tthis.setTBody( oTable.tBodies[0] );\r\n};\r\n\r\nSortableTable.prototype.setTHead = function (oTHead) {\r\n\tif (this.tHead && this.tHead != oTHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.tHead = oTHead;\r\n\tthis.initHeader( this.sortTypes );\r\n};\r\n\r\nSortableTable.prototype.setTBody = function (oTBody) {\r\n\tthis.tBody = oTBody;\r\n};\r\n\r\nSortableTable.prototype.setSortTypes = function ( oSortTypes ) {\r\n\tif ( this.tHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.sortTypes = oSortTypes || [];\r\n\tif ( this.tHead )\r\n\t\tthis.initHeader( this.sortTypes );\r\n};\r\n\r\n// adds arrow containers and events\r\n// also binds sort type to the header cells so that reordering columns does\r\n// not break the sort types\r\nSortableTable.prototype.initHeader = function (oSortTypes) {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar doc = this.tHead.ownerDocument || this.tHead.document;\r\n\tthis.sortTypes = oSortTypes || [];\r\n\tvar l = cells.length;\r\n\tvar img, c;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tc = cells[i];\r\n\t\tif (this.sortTypes[i] != null && this.sortTypes[i] != \"None\") {\r\n\t\t\timg = doc.createElement(\"IMG\");\r\n\t\t\timg.src = \"images/blank.png\";\r\n\t\t\tc.appendChild(img);\r\n\t\t\tif (this.sortTypes[i] != null)\r\n\t\t\t\tc._sortType = this.sortTypes[i];\r\n\t\t\tif (typeof c.addEventListener != \"undefined\")\r\n\t\t\t\tc.addEventListener(\"click\", this._headerOnclick, false);\r\n\t\t\telse if (typeof c.attachEvent != \"undefined\")\r\n\t\t\t\tc.attachEvent(\"onclick\", this._headerOnclick);\r\n\t\t\telse\r\n\t\t\t\tc.onclick = this._headerOnclick;\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\tc.setAttribute( \"_sortType\", oSortTypes[i] );\r\n\t\t\tc._sortType = \"None\";\r\n\t\t}\r\n\t}\r\n\tthis.updateHeaderArrows();\r\n};\r\n\r\n// remove arrows and events\r\nSortableTable.prototype.uninitHeader = function () {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar l = cells.length;\r\n\tvar c;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tc = cells[i];\r\n\t\tif (c._sortType != null && c._sortType != \"None\") {\r\n\t\t\tc.removeChild(c.lastChild);\r\n\t\t\tif (typeof c.removeEventListener != \"undefined\")\r\n\t\t\t\tc.removeEventListener(\"click\", this._headerOnclick, false);\r\n\t\t\telse if (typeof c.detachEvent != \"undefined\")\r\n\t\t\t\tc.detachEvent(\"onclick\", this._headerOnclick);\r\n\t\t\tc._sortType = null;\r\n\t\t\tc.removeAttribute( \"_sortType\" );\r\n\t\t}\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.updateHeaderArrows = function () {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar l = cells.length;\r\n\tvar img;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tif (cells[i]._sortType != null && cells[i]._sortType != \"None\") {\r\n\t\t\timg = cells[i].lastChild;\r\n\t\t\tif (i == this.sortColumn)\r\n\t\t\t\timg.className = \"sort-arrow \" + (this.descending ? \"descending\" : \"ascending\");\r\n\t\t\telse\r\n\t\t\t\timg.className = \"sort-arrow\";\r\n\t\t}\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.headerOnclick = function (e) {\r\n\t// find TD element\r\n\tvar el = e.target || e.srcElement;\r\n\twhile (el.tagName != \"TD\")\r\n\t\tel = el.parentNode;\r\n\r\n\tthis.sort(SortableTable.msie ? SortableTable.getCellIndex(el) : el.cellIndex);\r\n};\r\n\r\n// IE returns wrong cellIndex when columns are hidden\r\nSortableTable.getCellIndex = function (oTd) {\r\n\tvar cells = oTd.parentNode.childNodes\r\n\tvar l = cells.length;\r\n\tvar i;\r\n\tfor (i = 0; cells[i] != oTd && i < l; i++)\r\n\t\t;\r\n\treturn i;\r\n};\r\n\r\nSortableTable.prototype.getSortType = function (nColumn) {\r\n\treturn this.sortTypes[nColumn] || \"String\";\r\n};\r\n\r\n// only nColumn is required\r\n// if bDescending is left out the old value is taken into account\r\n// if sSortType is left out the sort type is found from the sortTypes array\r\n\r\nSortableTable.prototype.sort = function (nColumn, bDescending, sSortType) {\r\n\tif (!this.tBody) return;\r\n\tif (sSortType == null)\r\n\t\tsSortType = this.getSortType(nColumn);\r\n\r\n\t// exit if None\r\n\tif (sSortType == \"None\")\r\n\t\treturn;\r\n\r\n\tif (bDescending == null) {\r\n\t\tif (this.sortColumn != nColumn)\r\n\t\t\tthis.descending = this.defaultDescending;\r\n\t\telse\r\n\t\t\tthis.descending = !this.descending;\r\n\t}\r\n\telse\r\n\t\tthis.descending = bDescending;\r\n\r\n\tthis.sortColumn = nColumn;\r\n\r\n\tif (typeof this.onbeforesort == \"function\")\r\n\t\tthis.onbeforesort();\r\n\r\n\tvar f = this.getSortFunction(sSortType, nColumn);\r\n\tvar a = this.getCache(sSortType, nColumn);\r\n\tvar tBody = this.tBody;\r\n\r\n\ta.sort(f);\r\n\r\n\tif (this.descending)\r\n\t\ta.reverse();\r\n\r\n\tif (SortableTable.removeBeforeSort) {\r\n\t\t// remove from doc\r\n\t\tvar nextSibling = tBody.nextSibling;\r\n\t\tvar p = tBody.parentNode;\r\n\t\tp.removeChild(tBody);\r\n\t}\r\n\r\n\t// insert in the new order\r\n\tvar l = a.length;\r\n\tfor (var i = 0; i < l; i++)\r\n\t\ttBody.appendChild(a[i].element);\r\n\r\n\tif (SortableTable.removeBeforeSort) {\r\n\t\t// insert into doc\r\n\t\tp.insertBefore(tBody, nextSibling);\r\n\t}\r\n\r\n\tthis.updateHeaderArrows();\r\n\r\n\tthis.destroyCache(a);\r\n\r\n\tif (typeof this.onsort == \"function\")\r\n\t\tthis.onsort();\r\n};\r\n\r\nSortableTable.prototype.asyncSort = function (nColumn, bDescending, sSortType) {\r\n\tvar oThis = this;\r\n\tthis._asyncsort = function () {\r\n\t\toThis.sort(nColumn, bDescending, sSortType);\r\n\t};\r\n\twindow.setTimeout(this._asyncsort, 1);\r\n};\r\n\r\nSortableTable.prototype.getCache = function (sType, nColumn) {\r\n\tif (!this.tBody) return [];\r\n\tvar rows = this.tBody.rows;\r\n\tvar l = rows.length;\r\n\tvar a = new Array(l);\r\n\tvar r;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tr = rows[i];\r\n\t\ta[i] = {\r\n\t\t\tvalue:\t\tthis.getRowValue(r, sType, nColumn),\r\n\t\t\telement:\tr\r\n\t\t};\r\n\t};\r\n\treturn a;\r\n};\r\n\r\nSortableTable.prototype.destroyCache = function (oArray) {\r\n\tvar l = oArray.length;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\toArray[i].value = null;\r\n\t\toArray[i].element = null;\r\n\t\toArray[i] = null;\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.getRowValue = function (oRow, sType, nColumn) {\r\n\t// if we have defined a custom getRowValue use that\r\n\tif (this._sortTypeInfo[sType] && this._sortTypeInfo[sType].getRowValue)\r\n\t\treturn this._sortTypeInfo[sType].getRowValue(oRow, nColumn);\r\n\r\n\tvar s;\r\n\tvar c = oRow.cells[nColumn];\r\n\tif (typeof c.innerText != \"undefined\")\r\n\t\ts = c.innerText;\r\n\telse\r\n\t\ts = SortableTable.getInnerText(c);\r\n\treturn this.getValueFromString(s, sType);\r\n};\r\n\r\nSortableTable.getInnerText = function (oNode) {\r\n\tvar s = \"\";\r\n\tvar cs = oNode.childNodes;\r\n\tvar l = cs.length;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tswitch (cs[i].nodeType) {\r\n\t\t\tcase 1: //ELEMENT_NODE\r\n\t\t\t\ts += SortableTable.getInnerText(cs[i]);\r\n\t\t\t\tbreak;\r\n\t\t\tcase 3:\t//TEXT_NODE\r\n\t\t\t\ts += cs[i].nodeValue;\r\n\t\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n\treturn s;\r\n};\r\n\r\nSortableTable.prototype.getValueFromString = function (sText, sType) {\r\n\tif (this._sortTypeInfo[sType])\r\n\t\treturn this._sortTypeInfo[sType].getValueFromString( sText );\r\n\treturn sText;\r\n\t/*\r\n\tswitch (sType) {\r\n\t\tcase \"Number\":\r\n\t\t\treturn Number(sText);\r\n\t\tcase \"CaseInsensitiveString\":\r\n\t\t\treturn sText.toUpperCase();\r\n\t\tcase \"Date\":\r\n\t\t\tvar parts = sText.split(\"-\");\r\n\t\t\tvar d = new Date(0);\r\n\t\t\td.setFullYear(parts[0]);\r\n\t\t\td.setDate(parts[2]);\r\n\t\t\td.setMonth(parts[1] - 1);\r\n\t\t\treturn d.valueOf();\r\n\t}\r\n\treturn sText;\r\n\t*/\r\n\t};\r\n\r\nSortableTable.prototype.getSortFunction = function (sType, nColumn) {\r\n\tif (this._sortTypeInfo[sType])\r\n\t\treturn this._sortTypeInfo[sType].compare;\r\n\treturn SortableTable.basicCompare;\r\n};\r\n\r\nSortableTable.prototype.destroy = function () {\r\n\tthis.uninitHeader();\r\n\tvar win = this.document.parentWindow;\r\n\tif (win && typeof win.detachEvent != \"undefined\") {\t// only IE needs this\r\n\t\twin.detachEvent(\"onunload\", this._onunload);\r\n\t}\r\n\tthis._onunload = null;\r\n\tthis.element = null;\r\n\tthis.tHead = null;\r\n\tthis.tBody = null;\r\n\tthis.document = null;\r\n\tthis._headerOnclick = null;\r\n\tthis.sortTypes = null;\r\n\tthis._asyncsort = null;\r\n\tthis.onsort = null;\r\n};\r\n\r\n// Adds a sort type to all instance of SortableTable\r\n// sType : String - the identifier of the sort type\r\n// fGetValueFromString : function ( s : string ) : T - A function that takes a\r\n//    string and casts it to a desired format. If left out the string is just\r\n//    returned\r\n// fCompareFunction : function ( n1 : T, n2 : T ) : Number - A normal JS sort\r\n//    compare function. Takes two values and compares them. If left out less than,\r\n//    <, compare is used\r\n// fGetRowValue : function( oRow : HTMLTRElement, nColumn : int ) : T - A function\r\n//    that takes the row and the column index and returns the value used to compare.\r\n//    If left out then the innerText is first taken for the cell and then the\r\n//    fGetValueFromString is used to convert that string the desired value and type\r\n\r\nSortableTable.prototype.addSortType = function (sType, fGetValueFromString, fCompareFunction, fGetRowValue) {\r\n\tthis._sortTypeInfo[sType] = {\r\n\t\ttype:\t\t\t\tsType,\r\n\t\tgetValueFromString:\tfGetValueFromString || SortableTable.idFunction,\r\n\t\tcompare:\t\t\tfCompareFunction || SortableTable.basicCompare,\r\n\t\tgetRowValue:\t\tfGetRowValue\r\n\t};\r\n};\r\n\r\n// this removes the sort type from all instances of SortableTable\r\nSortableTable.prototype.removeSortType = function (sType) {\r\n\tdelete this._sortTypeInfo[sType];\r\n};\r\n\r\nSortableTable.basicCompare = function compare(n1, n2) {\r\n\tif (n1.value < n2.value)\r\n\t\treturn -1;\r\n\tif (n2.value < n1.value)\r\n\t\treturn 1;\r\n\treturn 0;\r\n};\r\n\r\nSortableTable.idFunction = function (x) {\r\n\treturn x;\r\n};\r\n\r\nSortableTable.toUpperCase = function (s) {\r\n\treturn s.toUpperCase();\r\n};\r\n\r\nSortableTable.toDate = function (s) {\r\n\tvar parts = s.split(\"-\");\r\n\tvar d = new Date(0);\r\n\td.setFullYear(parts[0]);\r\n\td.setDate(parts[2]);\r\n\td.setMonth(parts[1] - 1);\r\n\treturn d.valueOf();\r\n};\r\n\r\n\r\n// add sort types\r\nSortableTable.prototype.addSortType(\"Number\", Number);\r\nSortableTable.prototype.addSortType(\"CaseInsensitiveString\", SortableTable.toUpperCase);\r\nSortableTable.prototype.addSortType(\"Date\", SortableTable.toDate);\r\nSortableTable.prototype.addSortType(\"String\");\r\n// None is a special case\r\n"

/***/ })

});
//# sourceMappingURL=tf-0-274dfa7999625931f0bf.js.map