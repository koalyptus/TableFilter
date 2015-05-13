define(['exports', 'module', '../../dom', '../../types', '../../event', '../../helpers', '../../array'], function (exports, module, _dom, _types, _event, _helpers, _array) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
            this.tblHasColTag = _dom.Dom.tag(tf.tbl, 'col').length > 0;

            //callback invoked just after cols manager is loaded
            this.onLoaded = _types.Types.isFn(f.on_loaded) ? f.on_loaded : null;
            //calls function before cols manager is opened
            this.onBeforeOpen = _types.Types.isFn(f.on_before_open) ? f.on_before_open : null;
            //calls function after cols manager is opened
            this.onAfterOpen = _types.Types.isFn(f.on_after_open) ? f.on_after_open : null;
            //calls function before cols manager is closed
            this.onBeforeClose = _types.Types.isFn(f.on_before_close) ? f.on_before_close : null;
            //calls function after cols manager is closed
            this.onAfterClose = _types.Types.isFn(f.on_after_close) ? f.on_after_close : null;

            //calls function before col is hidden
            this.onBeforeColHidden = _types.Types.isFn(f.on_before_col_hidden) ? f.on_before_col_hidden : null;
            //calls function after col is hidden
            this.onAfterColHidden = _types.Types.isFn(f.on_after_col_hidden) ? f.on_after_col_hidden : null;
            //calls function before col is displayed
            this.onBeforeColDisplayed = _types.Types.isFn(f.on_before_col_displayed) ? f.on_before_col_displayed : null;
            //calls function after col is displayed
            this.onAfterColDisplayed = _types.Types.isFn(f.on_after_col_displayed) ? f.on_after_col_displayed : null;

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
                    _dom.Dom.addClass(li, this.listSlcItemCssClass);
                } else {
                    _dom.Dom.removeClass(li, this.listSlcItemCssClass);
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
                var span = _dom.Dom.create('span', ['id', this.prfx + tf.id]);
                span.className = this.spanCssClass;

                //Container element (rdiv or custom element)
                if (!this.btnTgtId) {
                    tf.setToolbar();
                }
                var targetEl = !this.btnTgtId ? tf.rDiv : _dom.Dom.id(this.btnTgtId);

                if (!this.btnTgtId) {
                    var firstChild = targetEl.firstChild;
                    firstChild.parentNode.insertBefore(span, firstChild);
                } else {
                    targetEl.appendChild(span);
                }

                if (!this.btnHtml) {
                    var btn = _dom.Dom.create('a', ['href', 'javascript:;']);
                    btn.className = this.btnCssClass;
                    btn.title = this.extDesc;

                    btn.innerHTML = this.btnText;
                    span.appendChild(btn);
                    if (!this.enableHover) {
                        _event.Event.add(btn, 'click', function (evt) {
                            _this.toggle(evt);
                        });
                    } else {
                        _event.Event.add(btn, 'mouseover', function (evt) {
                            _this.toggle(evt);
                        });
                    }
                } else {
                    //Custom html
                    span.innerHTML = this.btnHtml;
                    var colVisEl = span.firstChild;
                    if (!this.enableHover) {
                        _event.Event.add(colVisEl, 'click', function (evt) {
                            _this.toggle(evt);
                        });
                    } else {
                        _event.Event.add(colVisEl, 'mouseover', function (evt) {
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

                var container = !this.contElTgtId ? _dom.Dom.create('div', ['id', this.prfxCont + tf.id]) : _dom.Dom.id(this.contElTgtId);
                container.className = this.contCssClass;

                //Extension description
                var extNameLabel = _dom.Dom.create('p');
                extNameLabel.innerHTML = this.text;
                container.appendChild(extNameLabel);

                //Headers list
                var ul = _dom.Dom.create('ul', ['id', 'ul' + this.extName + '_' + tf.id]);
                ul.className = this.listCssClass;

                var tbl = this.headersTbl ? this.headersTbl : tf.tbl;
                var headerIndex = this.headersTbl ? this.headersIndex : tf.getHeadersRowIndex();
                var headerRow = tbl.rows[headerIndex];

                //Tick all option
                if (this.enableTickAll) {
                    var li = _dom.Dom.createCheckItem('col__' + tf.id, this.tickAllText, this.tickAllText);
                    _dom.Dom.addClass(li, this.listItemCssClass);
                    ul.appendChild(li);
                    li.check.checked = !this.tickToHide;

                    _event.Event.add(li.check, 'click', function (evt) {
                        for (var h = 0; h < headerRow.cells.length; h++) {
                            var itm = _dom.Dom.id('col_' + h + '_' + tf.id);
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
                    var liElm = _dom.Dom.createCheckItem('col_' + i + '_' + tf.id, cellText, cellText);
                    _dom.Dom.addClass(liElm, this.listItemCssClass);
                    if (!this.tickToHide) {
                        _dom.Dom.addClass(liElm, this.listSlcItemCssClass);
                    }
                    ul.appendChild(liElm);
                    if (!this.tickToHide) {
                        liElm.check.checked = true;
                    }

                    _event.Event.add(liElm.check, 'click', function (evt) {
                        var elm = _event.Event.target(evt);
                        var lbl = elm.parentNode;
                        _this2.checkItem(lbl);
                    });
                }

                //separator
                var p = _dom.Dom.create('p', ['align', 'center']);
                var btn;
                //Close link
                if (!this.btnCloseHtml) {
                    btn = _dom.Dom.create('a', ['href', 'javascript:;']);
                    btn.className = this.btnCloseCssClass;
                    btn.innerHTML = this.btnCloseText;
                    _event.Event.add(btn, 'click', function (evt) {
                        _this2.toggle(evt);
                    });
                    p.appendChild(btn);
                } else {
                    p.innerHTML = this.btnCloseHtml;
                    btn = p.firstChild;
                    _event.Event.add(btn, 'click', function (evt) {
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
                        var itm = _dom.Dom.id('col_' + a[k] + '_' + tf.id);
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
                var col = _dom.Dom.tag(tbl, 'col')[colIndex];

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
                    var itemIndex = _array.Arr.indexByValue(hiddenCols, colIndex, true);
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
                        if (_helpers.Helpers.isIE()) {
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
                    var itm = _dom.Dom.id('col_' + colIndex + '_' + this.tf.id);
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
                    var itm = _dom.Dom.id('col_' + colIndex + '_' + this.tf.id);
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
                if (_dom.Dom.id(this.contElTgtId)) {
                    _dom.Dom.id(this.contElTgtId).innerHTML = '';
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
                            return _dom.Dom.getText(n);
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

    module.exports = ColsVisibility;
});
//# sourceMappingURL=colsVisibility.js.map