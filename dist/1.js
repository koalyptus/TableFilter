webpackJsonp([1],{

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./array": 7,
		"./array.js": 7,
		"./cookie": 5,
		"./cookie.js": 5,
		"./date": 9,
		"./date.js": 9,
		"./dom": 3,
		"./dom.js": 3,
		"./event": 2,
		"./event.js": 2,
		"./extensions/colsVisibility/colsVisibility": 25,
		"./extensions/colsVisibility/colsVisibility.js": 25,
		"./extensions/sortabletable/adapterSortabletable": 26,
		"./extensions/sortabletable/adapterSortabletable.js": 26,
		"./helpers": 8,
		"./helpers.js": 8,
		"./modules/alternateRows": 23,
		"./modules/alternateRows.js": 23,
		"./modules/checkList": 17,
		"./modules/checkList.js": 17,
		"./modules/clearButton": 21,
		"./modules/clearButton.js": 21,
		"./modules/colOps": 24,
		"./modules/colOps.js": 24,
		"./modules/dropdown": 16,
		"./modules/dropdown.js": 16,
		"./modules/gridLayout": 12,
		"./modules/gridLayout.js": 12,
		"./modules/help": 22,
		"./modules/help.js": 22,
		"./modules/highlightKeywords": 14,
		"./modules/highlightKeywords.js": 14,
		"./modules/loader": 13,
		"./modules/loader.js": 13,
		"./modules/paging": 20,
		"./modules/paging.js": 20,
		"./modules/popupFilter": 15,
		"./modules/popupFilter.js": 15,
		"./modules/rowsCounter": 18,
		"./modules/rowsCounter.js": 18,
		"./modules/statusBar": 19,
		"./modules/statusBar.js": 19,
		"./modules/store": 11,
		"./modules/store.js": 11,
		"./sort": 10,
		"./sort.js": 10,
		"./string": 4,
		"./string.js": 4,
		"./types": 6,
		"./types.js": 6
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
	webpackContext.id = 1;


/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Dom = __webpack_require__(3);

	var _Types = __webpack_require__(6);

	var _Event = __webpack_require__(2);

	var _Helpers = __webpack_require__(8);

	var _Arr = __webpack_require__(7);

	var ColsVisibility = (function () {

	    /**
	     * Columns Visibility extension
	     * @param {Object} tf TableFilter instance
	     */

	    function ColsVisibility(tf) {
	        var ext = arguments[1] === undefined ? {
	            name: 'colsVisibility',
	            description: 'Columns visibility manager'
	        } : arguments[1];

	        _classCallCheck(this, ColsVisibility);

	        // Configuration object
	        var f = ext;
	        var cfg = tf.config();

	        this.initialized = false;
	        this.extName = f.name;
	        this.extDesc = f.description;

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

	        this.path = f.path || tf.extensionsPath + 'colsVisibility/';
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
	        this.tblHasColTag = _Dom.Dom.tag(tf.tbl, 'col').length > 0;

	        //callback invoked just after cols manager is loaded
	        this.onLoaded = _Types.Types.isFn(f.on_loaded) ? f.on_loaded : null;
	        //calls function before cols manager is opened
	        this.onBeforeOpen = _Types.Types.isFn(f.on_before_open) ? f.on_before_open : null;
	        //calls function after cols manager is opened
	        this.onAfterOpen = _Types.Types.isFn(f.on_after_open) ? f.on_after_open : null;
	        //calls function before cols manager is closed
	        this.onBeforeClose = _Types.Types.isFn(f.on_before_close) ? f.on_before_close : null;
	        //calls function after cols manager is closed
	        this.onAfterClose = _Types.Types.isFn(f.on_after_close) ? f.on_after_close : null;

	        //calls function before col is hidden
	        this.onBeforeColHidden = _Types.Types.isFn(f.on_before_col_hidden) ? f.on_before_col_hidden : null;
	        //calls function after col is hidden
	        this.onAfterColHidden = _Types.Types.isFn(f.on_after_col_hidden) ? f.on_after_col_hidden : null;
	        //calls function before col is displayed
	        this.onBeforeColDisplayed = _Types.Types.isFn(f.on_before_col_displayed) ? f.on_before_col_displayed : null;
	        //calls function after col is displayed
	        this.onAfterColDisplayed = _Types.Types.isFn(f.on_after_col_displayed) ? f.on_after_col_displayed : null;

	        //Grid layout compatibility
	        if (tf.gridLayout) {
	            this.headersTbl = tf.Cpt.gridLayout.headTbl; //headers table
	            this.headersIndex = 0; //headers index
	            this.onAfterColDisplayed = function () {};
	            this.onAfterColHidden = function () {};
	        }

	        //Loads extension stylesheet
	        tf.includeFile(f.name + 'Style', this.path + '/' + this.stylesheet, null, 'link');

	        this.tf = tf;
	    }

	    _createClass(ColsVisibility, [{
	        key: 'toggle',
	        value: function toggle(evt) {
	            var tf = this.tf;
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
	                _Dom.Dom.addClass(li, this.listSlcItemCssClass);
	            } else {
	                _Dom.Dom.removeClass(li, this.listSlcItemCssClass);
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
	    }, {
	        key: 'buildBtn',

	        /**
	         * Build main button UI
	         */
	        value: function buildBtn() {
	            var _this = this;

	            if (this.btnEl) {
	                return;
	            }
	            var tf = this.tf;
	            var span = _Dom.Dom.create('span', ['id', this.prfx + tf.id]);
	            span.className = this.spanCssClass;

	            //Container element (rdiv or custom element)
	            if (!this.btnTgtId) {
	                tf.setToolbar();
	            }
	            var targetEl = !this.btnTgtId ? tf.rDiv : _Dom.Dom.id(this.btnTgtId);

	            if (!this.btnTgtId) {
	                var firstChild = targetEl.firstChild;
	                firstChild.parentNode.insertBefore(span, firstChild);
	            } else {
	                targetEl.appendChild(span);
	            }

	            if (!this.btnHtml) {
	                var btn = _Dom.Dom.create('a', ['href', 'javascript:;']);
	                btn.className = this.btnCssClass;
	                btn.title = this.extDesc;

	                btn.innerHTML = this.btnText;
	                span.appendChild(btn);
	                if (!this.enableHover) {
	                    _Event.Event.add(btn, 'click', function (evt) {
	                        _this.toggle(evt);
	                    });
	                } else {
	                    _Event.Event.add(btn, 'mouseover', function (evt) {
	                        _this.toggle(evt);
	                    });
	                }
	            } else {
	                //Custom html
	                span.innerHTML = this.btnHtml;
	                var colVisEl = span.firstChild;
	                if (!this.enableHover) {
	                    _Event.Event.add(colVisEl, 'click', function (evt) {
	                        _this.toggle(evt);
	                    });
	                } else {
	                    _Event.Event.add(colVisEl, 'mouseover', function (evt) {
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
	    }, {
	        key: 'buildManager',

	        /**
	         * Build columns manager UI
	         */
	        value: function buildManager() {
	            var _this2 = this;

	            var tf = this.tf;

	            var container = !this.contElTgtId ? _Dom.Dom.create('div', ['id', this.prfxCont + tf.id]) : _Dom.Dom.id(this.contElTgtId);
	            container.className = this.contCssClass;

	            //Extension description
	            var extNameLabel = _Dom.Dom.create('p');
	            extNameLabel.innerHTML = this.text;
	            container.appendChild(extNameLabel);

	            //Headers list
	            var ul = _Dom.Dom.create('ul', ['id', 'ul' + this.extName + '_' + tf.id]);
	            ul.className = this.listCssClass;

	            var tbl = this.headersTbl ? this.headersTbl : tf.tbl;
	            var headerIndex = this.headersTbl ? this.headersIndex : tf.getHeadersRowIndex();
	            var headerRow = tbl.rows[headerIndex];

	            //Tick all option
	            if (this.enableTickAll) {
	                var li = _Dom.Dom.createCheckItem('col__' + tf.id, this.tickAllText, this.tickAllText);
	                _Dom.Dom.addClass(li, this.listItemCssClass);
	                ul.appendChild(li);
	                li.check.checked = !this.tickToHide;

	                _Event.Event.add(li.check, 'click', function (evt) {
	                    for (var h = 0; h < headerRow.cells.length; h++) {
	                        var itm = _Dom.Dom.id('col_' + h + '_' + tf.id);
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
	                var liElm = _Dom.Dom.createCheckItem('col_' + i + '_' + tf.id, cellText, cellText);
	                _Dom.Dom.addClass(liElm, this.listItemCssClass);
	                if (!this.tickToHide) {
	                    _Dom.Dom.addClass(liElm, this.listSlcItemCssClass);
	                }
	                ul.appendChild(liElm);
	                if (!this.tickToHide) {
	                    liElm.check.checked = true;
	                }

	                _Event.Event.add(liElm.check, 'click', function (evt) {
	                    var elm = _Event.Event.target(evt);
	                    var lbl = elm.parentNode;
	                    _this2.checkItem(lbl);
	                });
	            }

	            //separator
	            var p = _Dom.Dom.create('p', ['align', 'center']);
	            var btn;
	            //Close link
	            if (!this.btnCloseHtml) {
	                btn = _Dom.Dom.create('a', ['href', 'javascript:;']);
	                btn.className = this.btnCloseCssClass;
	                btn.innerHTML = this.btnCloseText;
	                _Event.Event.add(btn, 'click', function (evt) {
	                    _this2.toggle(evt);
	                });
	                p.appendChild(btn);
	            } else {
	                p.innerHTML = this.btnCloseHtml;
	                btn = p.firstChild;
	                _Event.Event.add(btn, 'click', function (evt) {
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
	                    var itm = _Dom.Dom.id('col_' + a[k] + '_' + tf.id);
	                    if (itm) {
	                        itm.click();
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'setHidden',

	        /**
	         * Hide or show specified columns
	         * @param {Numner} colIndex Column index
	         * @param {Boolean} hide    hide column if true or show if false
	         */
	        value: function setHidden(colIndex, hide) {
	            var tf = this.tf;
	            var tbl = tf.tbl;
	            var col = _Dom.Dom.tag(tbl, 'col')[colIndex];

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
	                var itemIndex = _Arr.Arr.indexByValue(hiddenCols, colIndex, true);
	                if (hiddenCols.indexOf(colIndex) !== -1) {
	                    this.hiddenCols.splice(itemIndex, 1);
	                }
	            }

	            var gridLayout;
	            var headTbl;
	            var gridColElms;
	            if (this.onAfterColHidden && hide) {
	                //This event is fired just after a column is displayed for
	                //grid_layout compatibility
	                if (tf.gridLayout) {
	                    gridLayout = tf.Cpt.gridLayout;
	                    headTbl = gridLayout.headTbl;
	                    gridColElms = gridLayout.gridColElms;
	                    if (_Helpers.Helpers.isIE()) {
	                        tbl.style.width = headTbl.clientWidth + 'px';
	                    } else {
	                        var ths = headTbl.rows[this.headersIndex].cells;
	                        var hiddenWidth = 0;
	                        for (var i = 0; i < tf.nbCells; i++) {
	                            if (ths[i].style.display === 'none') {
	                                var w = parseInt(ths[i].style.width, 10);
	                                ths[i].style.width = 0;
	                                hiddenWidth += w;
	                            }
	                        }
	                        var headTblW = parseInt(headTbl.style.width, 10);

	                        headTbl.style.width = headTblW - hiddenWidth + 'px';
	                        tbl.style.width = headTbl.style.width;
	                        gridColElms[colIndex].style.display = 'none';
	                    }
	                }
	                this.onAfterColHidden.call(null, this, colIndex);
	            }

	            if (this.onAfterColDisplayed && !hide) {
	                //This event is fired just after a column is displayed for
	                //grid_layout compatibility
	                if (tf.gridLayout) {
	                    gridLayout = tf.Cpt.gridLayout;
	                    headTbl = gridLayout.headTbl;
	                    gridColElms = gridLayout.gridColElms;
	                    gridColElms[colIndex].style.display = '';
	                    var width = parseInt(gridColElms[colIndex].style.width, 10);
	                    var header = tf.getHeaderElement(colIndex);
	                    header.style.width = width + 'px';
	                    headTbl.style.width = parseInt(headTbl.style.width, 10) + width + 'px';
	                    tf.tbl.style.width = headTbl.style.width;
	                }
	                this.onAfterColDisplayed.call(null, this, colIndex);
	            }
	        }
	    }, {
	        key: 'showCol',

	        /**
	         * Show specified column
	         * @param  {Number} colIndex Column index
	         */
	        value: function showCol(colIndex) {
	            if (colIndex === undefined || !this.isColHidden(colIndex)) {
	                return;
	            }
	            if (this.manager && this.contEl) {
	                var itm = _Dom.Dom.id('col_' + colIndex + '_' + this.tf.id);
	                if (itm) {
	                    itm.click();
	                }
	            } else {
	                this.setHidden(colIndex, false);
	            }
	        }
	    }, {
	        key: 'hideCol',

	        /**
	         * Hide specified column
	         * @param  {Number} colIndex Column index
	         */
	        value: function hideCol(colIndex) {
	            if (colIndex === undefined || this.isColHidden(colIndex)) {
	                return;
	            }
	            if (this.manager && this.contEl) {
	                var itm = _Dom.Dom.id('col_' + colIndex + '_' + this.tf.id);
	                if (itm) {
	                    itm.click();
	                }
	            } else {
	                this.setHidden(colIndex, true);
	            }
	        }
	    }, {
	        key: 'isColHidden',

	        /**
	         * Determine if specified column is hidden
	         * @param  {Number} colIndex Column index
	         */
	        value: function isColHidden(colIndex) {
	            if (this.hiddenCols.indexOf(colIndex) !== -1) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'toggleCol',

	        /**
	         * Toggle visibility of specified column
	         * @param  {Number} colIndex Column index
	         */
	        value: function toggleCol(colIndex) {
	            if (colIndex === undefined || this.isColHidden(colIndex)) {
	                this.showCol(colIndex);
	            } else {
	                this.hideCol(colIndex);
	            }
	        }
	    }, {
	        key: 'getHiddenCols',

	        /**
	         * Returns the indexes of the columns currently hidden
	         * @return {Array} column indexes
	         */
	        value: function getHiddenCols() {
	            return this.hiddenCols;
	        }
	    }, {
	        key: 'destroy',

	        /**
	         * Remove the columns manager
	         */
	        value: function destroy() {
	            if (!this.btnEl || !this.contEl) {
	                return;
	            }
	            if (_Dom.Dom.id(this.contElTgtId)) {
	                _Dom.Dom.id(this.contElTgtId).innerHTML = '';
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
	                        return _Dom.Dom.getText(n);
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

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _Types = __webpack_require__(6);

	var _Dom = __webpack_require__(3);

	var _Arr = __webpack_require__(7);

	var _Event = __webpack_require__(2);

	var _DateHelper = __webpack_require__(9);

	var _Helpers = __webpack_require__(8);

	__webpack_require__(27);

	var AdapterSortableTable = (function () {

	    /**
	     * SortableTable Adapter module
	     * @param {Object} tf TableFilter instance
	     */

	    function AdapterSortableTable(tf) {
	        _classCallCheck(this, AdapterSortableTable);

	        // Configuration object
	        var f = tf.config();

	        this.isPaged = false;

	        //indicates if tables was sorted
	        this.sorted = false;

	        // edit .sort-arrow.descending / .sort-arrow.ascending in filtergrid.css
	        // to reflect any path change
	        this.sortImgPath = f.sort_images_path || tf.themesPath;
	        this.sortImgBlank = f.sort_image_blank || 'blank.png';
	        this.sortImgClassName = f.sort_image_class_name || 'sort-arrow';
	        this.sortImgAscClassName = f.sort_image_asc_class_name || 'ascending';
	        this.sortImgDescClassName = f.sort_image_desc_class_name || 'descending';
	        //cell attribute storing custom key
	        this.sortCustomKey = f.sort_custom_key || 'data-tf-sortKey';

	        /*** TF additional events ***/
	        //additional paging events for alternating background
	        // o.Evt._Paging.nextEvt = function(){ if(o.sorted && o.alternateBgs) o.Filter(); }
	        // o.Evt._Paging.prevEvt = o.Evt._Paging.nextEvt;
	        // o.Evt._Paging.firstEvt = o.Evt._Paging.nextEvt;
	        // o.Evt._Paging.lastEvt = o.Evt._Paging.nextEvt;
	        // o.Evt._OnSlcPagesChangeEvt = o.Evt._Paging.nextEvt;

	        // callback invoked after sort is loaded and instanciated
	        this.onSortLoaded = _Types.Types.isFn(f.on_sort_loaded) ? f.on_sort_loaded : null;
	        // callback invoked before table is sorted
	        this.onBeforeSort = _Types.Types.isFn(f.on_before_sort) ? f.on_before_sort : null;
	        // callback invoked after table is sorted
	        this.onAfterSort = _Types.Types.isFn(f.on_after_sort) ? f.on_after_sort : null;

	        this.tf = tf;
	    }

	    _createClass(AdapterSortableTable, [{
	        key: 'init',
	        value: function init() {
	            var tf = this.tf;
	            var sortConfig = tf.sortConfig;
	            var adpt = this;

	            // SortableTable class sanity check (sortabletable.js)
	            if (_Types.Types.isUndef(SortableTable)) {
	                throw new Error('SortableTable class not found.');
	            }

	            this.overrideSortableTable();
	            this.setSortTypes();

	            //Column sort at start
	            if (sortConfig.sortCol) {
	                this.stt.sort(sortConfig.sortCol[0], sortConfig.sortCol[1]);
	            }

	            tf.isSortEnabled = true;
	            if (this.onSortLoaded) {
	                this.onSortLoaded.call(null, tf, this);
	            }

	            /*** SortableTable callbacks ***/
	            this.stt.onbeforesort = function () {
	                if (this.onBeforeSort) {
	                    this.onBeforeSort.call(null, tf, this.stt.sortColumn);
	                }

	                tf.performSort();

	                /*** sort behaviour for paging ***/
	                if (tf.paging) {
	                    adpt.isPaged = true;
	                    tf.paging = false;
	                    tf.Cpt.paging.destroy();
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
	                        if (_Types.Types.isUndef(removeOnly)) {
	                            removeOnly = false;
	                        }
	                        var altRows = tf.Cpt.alternateRows,
	                            oddCls = altRows.oddCss,
	                            evenCls = altRows.evenCss;
	                        _Dom.Dom.removeClass(row, oddCls);
	                        _Dom.Dom.removeClass(row, evenCls);

	                        if (!removeOnly) {
	                            _Dom.Dom.addClass(row, i % 2 ? oddCls : evenCls);
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
	                    var paginator = tf.Cpt.paging,
	                        config = tf.config();
	                    if (paginator.hasResultsPerPage) {
	                        var slc = paginator.resultsPerPageSlc;
	                        config.paging_length = slc.options[slc.selectedIndex].value;
	                    }
	                    paginator.addPaging(false);
	                    paginator.setPage(paginator.currentPageNb);
	                    adpt.isPaged = false;
	                }

	                if (adpt.onAfterSort) {
	                    adpt.onAfterSort.call(null, tf, tf.stt.sortColumn);
	                }
	            };
	        }
	    }, {
	        key: 'sortByColumnIndex',

	        /**
	         * Sort specified column
	         * @param  {Number} colIdx Column index
	         */
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
	                if (!tf.sort) {
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
	                    i;
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
	                    // throw new Error('Sorting feature requires a THEAD element');
	                    return;
	                }
	                stt.headersRow = tf.headersRow;
	                var cells = stt.tHead.rows[stt.headersRow].cells;
	                var doc = stt.tHead.ownerDocument || stt.tHead.document;
	                stt.sortTypes = oSortTypes || [];
	                var l = cells.length;
	                var img, c;
	                for (var i = 0; i < l; i++) {
	                    c = cells[i];
	                    if (stt.sortTypes[i] !== null && stt.sortTypes[i] !== 'None') {
	                        c.style.cursor = 'pointer';
	                        img = _Dom.Dom.create('img', ['src', adpt.sortImgPath + adpt.sortImgBlank]);
	                        c.appendChild(img);
	                        if (stt.sortTypes[i] !== null) {
	                            c.setAttribute('_sortType', stt.sortTypes[i]);
	                        }
	                        _Event.Event.add(c, 'click', stt._headerOnclick);
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
	                var cells, l, img;
	                // external headers
	                if (tf.sortConfig.asyncSort && tf.sortConfig.triggerIds !== null) {
	                    var triggers = tf.sortConfig.triggerIds;
	                    cells = [];
	                    l = triggers.length;
	                    for (var j = 0; j < triggers.length; j++) {
	                        cells.push(_Dom.Dom.id(triggers[j]));
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
	                            img = _Dom.Dom.create('img', ['src', adpt.sortImgPath + adpt.sortImgBlank]);
	                            cells[i].appendChild(img);
	                        }
	                        if (i === stt.sortColumn) {
	                            img.className = adpt.sortImgClassName + ' ' + (this.descending ? adpt.sortImgDescClassName : adpt.sortImgAscClassName);
	                        } else {
	                            img.className = adpt.sortImgClassName;
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
	                if (oNode.getAttribute(adpt.sortCustomKey)) {
	                    return oNode.getAttribute(adpt.sortCustomKey);
	                } else {
	                    return _Dom.Dom.getText(oNode);
	                }
	            };
	        }
	    }, {
	        key: 'addSortType',
	        value: function addSortType() {
	            SortableTable.prototype.addSortType(arguments[0], arguments[1], arguments[2], arguments[3]);
	        }
	    }, {
	        key: 'setSortTypes',
	        value: function setSortTypes() {
	            var _this = this;

	            var tf = this.tf,
	                configSort = tf.sortConfig,
	                configSortTypes = configSort.sortTypes,
	                sortTypes = [];

	            for (var i = 0; i < tf.nbCells; i++) {
	                var colType;

	                if (configSortTypes !== null && configSortTypes[i] != null) {
	                    colType = configSortTypes[i].toLowerCase();
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
	                sortTypes.push(colType);
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

	            this.stt = new SortableTable(tf.tbl, sortTypes);

	            /*** external table headers adapter ***/
	            if (configSort.asyncSort && configSort.triggerIds !== null) {
	                var triggers = configSort.triggerIds;
	                for (var j = 0; j < triggers.length; j++) {
	                    if (triggers[j] === null) {
	                        continue;
	                    }
	                    var trigger = _Dom.Dom.id(triggers[j]);
	                    if (trigger) {
	                        trigger.style.cursor = 'pointer';

	                        _Event.Event.add(trigger, 'click', function (evt) {
	                            var elm = evt.target;
	                            if (!_this.tf.sort) {
	                                return;
	                            }
	                            _this.stt.asyncSort(_Arr.Arr.indexByValue(triggers, elm.id, true));
	                        });
	                        trigger.setAttribute('_sortType', sortTypes[j]);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'destroy',

	        /**
	         * Destroy sort
	         */
	        value: function destroy() {
	            var tf = this.tf;
	            tf.sort = false;
	            this.sorted = false;
	            this.stt.destroy();

	            var ids = tf.getFiltersId();
	            for (var idx = 0; idx < ids.length; idx++) {
	                var header = tf.getHeaderElement(idx);
	                var img = _Dom.Dom.tag(header, 'img');

	                if (img.length === 1) {
	                    header.removeChild(img[0]);
	                }
	            }
	        }
	    }]);

	    return AdapterSortableTable;
	})();

	exports['default'] = AdapterSortableTable;

	//Converters
	function usNumberConverter(s) {
	    return _Helpers.Helpers.removeNbFormat(s, 'us');
	}
	function euNumberConverter(s) {
	    return _Helpers.Helpers.removeNbFormat(s, 'eu');
	}
	function dateConverter(s, format) {
	    return _DateHelper.DateHelper.format(s, format);
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

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(28)(__webpack_require__(29))

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

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

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "/*----------------------------------------------------------------------------\\\r\n|                            Sortable Table 1.12                              |\r\n|-----------------------------------------------------------------------------|\r\n|                         Created by Erik Arvidsson                           |\r\n|                  (http://webfx.eae.net/contact.html#erik)                   |\r\n|                      For WebFX (http://webfx.eae.net/)                      |\r\n|-----------------------------------------------------------------------------|\r\n| A DOM 1 based script that allows an ordinary HTML table to be sortable.     |\r\n|-----------------------------------------------------------------------------|\r\n|                  Copyright (c) 1998 - 2006 Erik Arvidsson                   |\r\n|-----------------------------------------------------------------------------|\r\n| Licensed under the Apache License, Version 2.0 (the \"License\"); you may not |\r\n| use this file except in compliance with the License.  You may obtain a copy |\r\n| of the License at http://www.apache.org/licenses/LICENSE-2.0                |\r\n| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |\r\n| Unless  required  by  applicable law or  agreed  to  in  writing,  software |\r\n| distributed under the License is distributed on an  \"AS IS\" BASIS,  WITHOUT |\r\n| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |\r\n| License  for the  specific language  governing permissions  and limitations |\r\n| under the License.                                                          |\r\n|-----------------------------------------------------------------------------|\r\n| 2003-01-10 | First version                                                  |\r\n| 2003-01-19 | Minor changes to the date parsing                              |\r\n| 2003-01-28 | JScript 5.0 fixes (no support for 'in' operator)               |\r\n| 2003-02-01 | Sloppy typo like error fixed in getInnerText                   |\r\n| 2003-07-04 | Added workaround for IE cellIndex bug.                         |\r\n| 2003-11-09 | The bDescending argument to sort was not correctly working     |\r\n|            | Using onclick DOM0 event if no support for addEventListener    |\r\n|            | or attachEvent                                                 |\r\n| 2004-01-13 | Adding addSortType and removeSortType which makes it a lot     |\r\n|            | easier to add new, custom sort types.                          |\r\n| 2004-01-27 | Switch to use descending = false as the default sort order.    |\r\n|            | Change defaultDescending to suit your needs.                   |\r\n| 2004-03-14 | Improved sort type None look and feel a bit                    |\r\n| 2004-08-26 | Made the handling of tBody and tHead more flexible. Now you    |\r\n|            | can use another tHead or no tHead, and you can chose some      |\r\n|            | other tBody.                                                   |\r\n| 2006-04-25 | Changed license to Apache Software License 2.0                 |\r\n|-----------------------------------------------------------------------------|\r\n| Created 2003-01-10 | All changes are in the log above. | Updated 2006-04-25 |\r\n\\----------------------------------------------------------------------------*/\r\n\r\n\r\nfunction SortableTable(oTable, oSortTypes) {\r\n\r\n\tthis.sortTypes = oSortTypes || [];\r\n\r\n\tthis.sortColumn = null;\r\n\tthis.descending = null;\r\n\r\n\tvar oThis = this;\r\n\tthis._headerOnclick = function (e) {\r\n\t\toThis.headerOnclick(e);\r\n\t};\r\n\r\n\tif (oTable) {\r\n\t\tthis.setTable( oTable );\r\n\t\tthis.document = oTable.ownerDocument || oTable.document;\r\n\t}\r\n\telse {\r\n\t\tthis.document = document;\r\n\t}\r\n\r\n\r\n\t// only IE needs this\r\n\tvar win = this.document.defaultView || this.document.parentWindow;\r\n\tthis._onunload = function () {\r\n\t\toThis.destroy();\r\n\t};\r\n\tif (win && typeof win.attachEvent != \"undefined\") {\r\n\t\twin.attachEvent(\"onunload\", this._onunload);\r\n\t}\r\n}\r\n\r\nSortableTable.gecko = navigator.product == \"Gecko\";\r\nSortableTable.msie = /msie/i.test(navigator.userAgent);\r\n// Mozilla is faster when doing the DOM manipulations on\r\n// an orphaned element. MSIE is not\r\nSortableTable.removeBeforeSort = SortableTable.gecko;\r\n\r\nSortableTable.prototype.onsort = function () {};\r\n\r\n// default sort order. true -> descending, false -> ascending\r\nSortableTable.prototype.defaultDescending = false;\r\n\r\n// shared between all instances. This is intentional to allow external files\r\n// to modify the prototype\r\nSortableTable.prototype._sortTypeInfo = {};\r\n\r\nSortableTable.prototype.setTable = function (oTable) {\r\n\tif ( this.tHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.element = oTable;\r\n\tthis.setTHead( oTable.tHead );\r\n\tthis.setTBody( oTable.tBodies[0] );\r\n};\r\n\r\nSortableTable.prototype.setTHead = function (oTHead) {\r\n\tif (this.tHead && this.tHead != oTHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.tHead = oTHead;\r\n\tthis.initHeader( this.sortTypes );\r\n};\r\n\r\nSortableTable.prototype.setTBody = function (oTBody) {\r\n\tthis.tBody = oTBody;\r\n};\r\n\r\nSortableTable.prototype.setSortTypes = function ( oSortTypes ) {\r\n\tif ( this.tHead )\r\n\t\tthis.uninitHeader();\r\n\tthis.sortTypes = oSortTypes || [];\r\n\tif ( this.tHead )\r\n\t\tthis.initHeader( this.sortTypes );\r\n};\r\n\r\n// adds arrow containers and events\r\n// also binds sort type to the header cells so that reordering columns does\r\n// not break the sort types\r\nSortableTable.prototype.initHeader = function (oSortTypes) {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar doc = this.tHead.ownerDocument || this.tHead.document;\r\n\tthis.sortTypes = oSortTypes || [];\r\n\tvar l = cells.length;\r\n\tvar img, c;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tc = cells[i];\r\n\t\tif (this.sortTypes[i] != null && this.sortTypes[i] != \"None\") {\r\n\t\t\timg = doc.createElement(\"IMG\");\r\n\t\t\timg.src = \"images/blank.png\";\r\n\t\t\tc.appendChild(img);\r\n\t\t\tif (this.sortTypes[i] != null)\r\n\t\t\t\tc._sortType = this.sortTypes[i];\r\n\t\t\tif (typeof c.addEventListener != \"undefined\")\r\n\t\t\t\tc.addEventListener(\"click\", this._headerOnclick, false);\r\n\t\t\telse if (typeof c.attachEvent != \"undefined\")\r\n\t\t\t\tc.attachEvent(\"onclick\", this._headerOnclick);\r\n\t\t\telse\r\n\t\t\t\tc.onclick = this._headerOnclick;\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\tc.setAttribute( \"_sortType\", oSortTypes[i] );\r\n\t\t\tc._sortType = \"None\";\r\n\t\t}\r\n\t}\r\n\tthis.updateHeaderArrows();\r\n};\r\n\r\n// remove arrows and events\r\nSortableTable.prototype.uninitHeader = function () {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar l = cells.length;\r\n\tvar c;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tc = cells[i];\r\n\t\tif (c._sortType != null && c._sortType != \"None\") {\r\n\t\t\tc.removeChild(c.lastChild);\r\n\t\t\tif (typeof c.removeEventListener != \"undefined\")\r\n\t\t\t\tc.removeEventListener(\"click\", this._headerOnclick, false);\r\n\t\t\telse if (typeof c.detachEvent != \"undefined\")\r\n\t\t\t\tc.detachEvent(\"onclick\", this._headerOnclick);\r\n\t\t\tc._sortType = null;\r\n\t\t\tc.removeAttribute( \"_sortType\" );\r\n\t\t}\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.updateHeaderArrows = function () {\r\n\tif (!this.tHead) return;\r\n\tvar cells = this.tHead.rows[0].cells;\r\n\tvar l = cells.length;\r\n\tvar img;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tif (cells[i]._sortType != null && cells[i]._sortType != \"None\") {\r\n\t\t\timg = cells[i].lastChild;\r\n\t\t\tif (i == this.sortColumn)\r\n\t\t\t\timg.className = \"sort-arrow \" + (this.descending ? \"descending\" : \"ascending\");\r\n\t\t\telse\r\n\t\t\t\timg.className = \"sort-arrow\";\r\n\t\t}\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.headerOnclick = function (e) {\r\n\t// find TD element\r\n\tvar el = e.target || e.srcElement;\r\n\twhile (el.tagName != \"TD\")\r\n\t\tel = el.parentNode;\r\n\r\n\tthis.sort(SortableTable.msie ? SortableTable.getCellIndex(el) : el.cellIndex);\r\n};\r\n\r\n// IE returns wrong cellIndex when columns are hidden\r\nSortableTable.getCellIndex = function (oTd) {\r\n\tvar cells = oTd.parentNode.childNodes\r\n\tvar l = cells.length;\r\n\tvar i;\r\n\tfor (i = 0; cells[i] != oTd && i < l; i++)\r\n\t\t;\r\n\treturn i;\r\n};\r\n\r\nSortableTable.prototype.getSortType = function (nColumn) {\r\n\treturn this.sortTypes[nColumn] || \"String\";\r\n};\r\n\r\n// only nColumn is required\r\n// if bDescending is left out the old value is taken into account\r\n// if sSortType is left out the sort type is found from the sortTypes array\r\n\r\nSortableTable.prototype.sort = function (nColumn, bDescending, sSortType) {\r\n\tif (!this.tBody) return;\r\n\tif (sSortType == null)\r\n\t\tsSortType = this.getSortType(nColumn);\r\n\r\n\t// exit if None\r\n\tif (sSortType == \"None\")\r\n\t\treturn;\r\n\r\n\tif (bDescending == null) {\r\n\t\tif (this.sortColumn != nColumn)\r\n\t\t\tthis.descending = this.defaultDescending;\r\n\t\telse\r\n\t\t\tthis.descending = !this.descending;\r\n\t}\r\n\telse\r\n\t\tthis.descending = bDescending;\r\n\r\n\tthis.sortColumn = nColumn;\r\n\r\n\tif (typeof this.onbeforesort == \"function\")\r\n\t\tthis.onbeforesort();\r\n\r\n\tvar f = this.getSortFunction(sSortType, nColumn);\r\n\tvar a = this.getCache(sSortType, nColumn);\r\n\tvar tBody = this.tBody;\r\n\r\n\ta.sort(f);\r\n\r\n\tif (this.descending)\r\n\t\ta.reverse();\r\n\r\n\tif (SortableTable.removeBeforeSort) {\r\n\t\t// remove from doc\r\n\t\tvar nextSibling = tBody.nextSibling;\r\n\t\tvar p = tBody.parentNode;\r\n\t\tp.removeChild(tBody);\r\n\t}\r\n\r\n\t// insert in the new order\r\n\tvar l = a.length;\r\n\tfor (var i = 0; i < l; i++)\r\n\t\ttBody.appendChild(a[i].element);\r\n\r\n\tif (SortableTable.removeBeforeSort) {\r\n\t\t// insert into doc\r\n\t\tp.insertBefore(tBody, nextSibling);\r\n\t}\r\n\r\n\tthis.updateHeaderArrows();\r\n\r\n\tthis.destroyCache(a);\r\n\r\n\tif (typeof this.onsort == \"function\")\r\n\t\tthis.onsort();\r\n};\r\n\r\nSortableTable.prototype.asyncSort = function (nColumn, bDescending, sSortType) {\r\n\tvar oThis = this;\r\n\tthis._asyncsort = function () {\r\n\t\toThis.sort(nColumn, bDescending, sSortType);\r\n\t};\r\n\twindow.setTimeout(this._asyncsort, 1);\r\n};\r\n\r\nSortableTable.prototype.getCache = function (sType, nColumn) {\r\n\tif (!this.tBody) return [];\r\n\tvar rows = this.tBody.rows;\r\n\tvar l = rows.length;\r\n\tvar a = new Array(l);\r\n\tvar r;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tr = rows[i];\r\n\t\ta[i] = {\r\n\t\t\tvalue:\t\tthis.getRowValue(r, sType, nColumn),\r\n\t\t\telement:\tr\r\n\t\t};\r\n\t};\r\n\treturn a;\r\n};\r\n\r\nSortableTable.prototype.destroyCache = function (oArray) {\r\n\tvar l = oArray.length;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\toArray[i].value = null;\r\n\t\toArray[i].element = null;\r\n\t\toArray[i] = null;\r\n\t}\r\n};\r\n\r\nSortableTable.prototype.getRowValue = function (oRow, sType, nColumn) {\r\n\t// if we have defined a custom getRowValue use that\r\n\tif (this._sortTypeInfo[sType] && this._sortTypeInfo[sType].getRowValue)\r\n\t\treturn this._sortTypeInfo[sType].getRowValue(oRow, nColumn);\r\n\r\n\tvar s;\r\n\tvar c = oRow.cells[nColumn];\r\n\tif (typeof c.innerText != \"undefined\")\r\n\t\ts = c.innerText;\r\n\telse\r\n\t\ts = SortableTable.getInnerText(c);\r\n\treturn this.getValueFromString(s, sType);\r\n};\r\n\r\nSortableTable.getInnerText = function (oNode) {\r\n\tvar s = \"\";\r\n\tvar cs = oNode.childNodes;\r\n\tvar l = cs.length;\r\n\tfor (var i = 0; i < l; i++) {\r\n\t\tswitch (cs[i].nodeType) {\r\n\t\t\tcase 1: //ELEMENT_NODE\r\n\t\t\t\ts += SortableTable.getInnerText(cs[i]);\r\n\t\t\t\tbreak;\r\n\t\t\tcase 3:\t//TEXT_NODE\r\n\t\t\t\ts += cs[i].nodeValue;\r\n\t\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n\treturn s;\r\n};\r\n\r\nSortableTable.prototype.getValueFromString = function (sText, sType) {\r\n\tif (this._sortTypeInfo[sType])\r\n\t\treturn this._sortTypeInfo[sType].getValueFromString( sText );\r\n\treturn sText;\r\n\t/*\r\n\tswitch (sType) {\r\n\t\tcase \"Number\":\r\n\t\t\treturn Number(sText);\r\n\t\tcase \"CaseInsensitiveString\":\r\n\t\t\treturn sText.toUpperCase();\r\n\t\tcase \"Date\":\r\n\t\t\tvar parts = sText.split(\"-\");\r\n\t\t\tvar d = new Date(0);\r\n\t\t\td.setFullYear(parts[0]);\r\n\t\t\td.setDate(parts[2]);\r\n\t\t\td.setMonth(parts[1] - 1);\r\n\t\t\treturn d.valueOf();\r\n\t}\r\n\treturn sText;\r\n\t*/\r\n\t};\r\n\r\nSortableTable.prototype.getSortFunction = function (sType, nColumn) {\r\n\tif (this._sortTypeInfo[sType])\r\n\t\treturn this._sortTypeInfo[sType].compare;\r\n\treturn SortableTable.basicCompare;\r\n};\r\n\r\nSortableTable.prototype.destroy = function () {\r\n\tthis.uninitHeader();\r\n\tvar win = this.document.parentWindow;\r\n\tif (win && typeof win.detachEvent != \"undefined\") {\t// only IE needs this\r\n\t\twin.detachEvent(\"onunload\", this._onunload);\r\n\t}\r\n\tthis._onunload = null;\r\n\tthis.element = null;\r\n\tthis.tHead = null;\r\n\tthis.tBody = null;\r\n\tthis.document = null;\r\n\tthis._headerOnclick = null;\r\n\tthis.sortTypes = null;\r\n\tthis._asyncsort = null;\r\n\tthis.onsort = null;\r\n};\r\n\r\n// Adds a sort type to all instance of SortableTable\r\n// sType : String - the identifier of the sort type\r\n// fGetValueFromString : function ( s : string ) : T - A function that takes a\r\n//    string and casts it to a desired format. If left out the string is just\r\n//    returned\r\n// fCompareFunction : function ( n1 : T, n2 : T ) : Number - A normal JS sort\r\n//    compare function. Takes two values and compares them. If left out less than,\r\n//    <, compare is used\r\n// fGetRowValue : function( oRow : HTMLTRElement, nColumn : int ) : T - A function\r\n//    that takes the row and the column index and returns the value used to compare.\r\n//    If left out then the innerText is first taken for the cell and then the\r\n//    fGetValueFromString is used to convert that string the desired value and type\r\n\r\nSortableTable.prototype.addSortType = function (sType, fGetValueFromString, fCompareFunction, fGetRowValue) {\r\n\tthis._sortTypeInfo[sType] = {\r\n\t\ttype:\t\t\t\tsType,\r\n\t\tgetValueFromString:\tfGetValueFromString || SortableTable.idFunction,\r\n\t\tcompare:\t\t\tfCompareFunction || SortableTable.basicCompare,\r\n\t\tgetRowValue:\t\tfGetRowValue\r\n\t};\r\n};\r\n\r\n// this removes the sort type from all instances of SortableTable\r\nSortableTable.prototype.removeSortType = function (sType) {\r\n\tdelete this._sortTypeInfo[sType];\r\n};\r\n\r\nSortableTable.basicCompare = function compare(n1, n2) {\r\n\tif (n1.value < n2.value)\r\n\t\treturn -1;\r\n\tif (n2.value < n1.value)\r\n\t\treturn 1;\r\n\treturn 0;\r\n};\r\n\r\nSortableTable.idFunction = function (x) {\r\n\treturn x;\r\n};\r\n\r\nSortableTable.toUpperCase = function (s) {\r\n\treturn s.toUpperCase();\r\n};\r\n\r\nSortableTable.toDate = function (s) {\r\n\tvar parts = s.split(\"-\");\r\n\tvar d = new Date(0);\r\n\td.setFullYear(parts[0]);\r\n\td.setDate(parts[2]);\r\n\td.setMonth(parts[1] - 1);\r\n\treturn d.valueOf();\r\n};\r\n\r\n\r\n// add sort types\r\nSortableTable.prototype.addSortType(\"Number\", Number);\r\nSortableTable.prototype.addSortType(\"CaseInsensitiveString\", SortableTable.toUpperCase);\r\nSortableTable.prototype.addSortType(\"Date\", SortableTable.toDate);\r\nSortableTable.prototype.addSortType(\"String\");\r\n// None is a special case\r\n"

/***/ }

});