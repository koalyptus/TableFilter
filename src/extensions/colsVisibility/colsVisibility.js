define(["exports", "../../dom", "../../types", "../../event", "../../helpers", "../../array"], function (exports, _dom, _types, _event, _helpers, _array) {
    "use strict";

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Dom = _dom.Dom;
    var Types = _types.Types;
    var Event = _event.Event;
    var Helpers = _helpers.Helpers;
    var Arr = _array.Arr;

    var ColsVisibility = exports.ColsVisibility = (function () {

        /**
         * Columns Visibility extension
         * @param {Object} tf TableFilter instance
         */

        function ColsVisibility(tf, ext) {
            _classCallCheck(this, ColsVisibility);

            // Configuration object
            var f = tf.config();

            this.colsVisibility = f.cols_visibility;

            this.colVisInitialized = false;
            this.colVisExtName = ext.name;
            this.colVisExtDesc = ext.description;

            //show/hide cols span element
            this.colVisSpanEl = null;
            //show/hide cols button element
            this.btnColVisEl = null;
            //show/hide cols container div element
            this.colVisContEl = null;

            //tick to hide or show column
            this.colVisTickToHide = Boolean(f.colvis_tick_to_hide || true);
            //enables/disables cols manager generation
            this.colVisManager = Boolean(f.colvis_manager || true);
            //only if external headers
            this.colVisHeadersTbl = f.colvis_headers_table || null;
            //only if external headers
            this.colVisHeadersIndex = f.colvis_headers_index || 1;
            //id of container element
            this.colVisContElTgtId = f.colvis_container_target_id || null;
            //alternative headers text
            this.colVisHeadersText = f.colvis_headers_text || null;
            //id of button container element
            this.btnColVisTgtId = f.btn_colvis_target_id || null;
            //defines show/hide cols text
            this.btnColVisText = f.btn_colvis_text || "Display columns&#9660;";
            //defines show/hide cols button innerHtml
            this.btnColVisHtml = f.btn_colvis_html || null;
            //defines css class for show/hide cols button
            this.btnColVisCssClass = f.btn_colvis_css_class || "colVis";
            //defines close link text
            this.btnColVisCloseText = f.btn_colvis_close_text || "Close";
            //defines close button innerHtml
            this.btnColVisCloseHtml = f.btn_colvis_close_html || null;
            //defines css class for close button
            this.btnColVisCloseCssClass = f.btn_colvis_close_css_class || this.btnColVisCssClass;

            this.colVisExtPath = ext.path || "TFExt_ColsVisibility/";
            this.colVisStylesheet = "TFExt_ColsVisibility.css";
            //span containing show/hide cols button
            this.prfxColVisSpan = "colVis_";
            //defines css class span containing show/hide cols
            this.colVisSpanCss = f.colvis_span_css_class || "colVisSpan";
            this.prfxColVisCont = "colVisCont_";
            //defines css class div containing show/hide cols
            this.colVisContCss = f.colvis_cont_css_class || "colVisCont";
            //defines css class for cols list (ul)
            this.colVisListCss = f.colvis_list_css_class || "cols_checklist";
            //defines css class for list item (li)
            this.colVisListItemCssClass = f.checklist_item_css_class || "cols_checklist_item";
            //defines css class for selected list item (li)
            this.colVisListSlcItemCssClass = f.checklist_selected_item_css_class || "cols_checklist_slc_item";
            //text preceding columns list
            this.colVisText = f.colvis_text || "Hide columns: ";
            this.colVisAtStart = f.colvis_at_start || null;
            this.colVisEnableHover = Boolean(f.colvis_enable_hover) || false;
            //enables select all option
            this.colVisEnableTickAll = Boolean(f.colvis_enable_tick_all) || false;
            //text preceding columns list
            this.colVisTickAllText = f.colvis_tick_all_text || "Select all:";
            this.colVisIsOpen = false;
            //array containing hidden columns indexes
            this.colVisHiddenCols = [];
            this.tblHasColTag = Dom.tag(tf.tbl, "col").length > 0;

            //callback invoked just after cols manager is loaded
            this.onColsManagerLoaded = Types.isFn(f.on_cols_manager_loaded) ? f.on_cols_manager_loaded : null;
            //calls function before cols manager is opened
            this.onBeforeOpenColsManager = Types.isFn(f.on_before_open_cols_manager) ? f.on_before_open_cols_manager : null;
            //calls function after cols manager is opened
            this.onAfterOpenColsManager = Types.isFn(f.on_after_open_cols_manager) ? f.on_after_open_cols_manager : null;
            //calls function before cols manager is closed
            this.onBeforeCloseColsManager = Types.isFn(f.on_before_close_cols_manager) ? f.on_before_close_cols_manager : null;
            //calls function after cols manager is closed
            this.onAfterCloseColsManager = Types.isFn(f.on_after_close_cols_manager) ? f.on_after_close_cols_manager : null;

            //calls function before col is hidden
            this.onBeforeColIsHidden = Types.isFn(f.on_before_col_is_hidden) ? f.on_before_col_is_hidden : null;
            //calls function after col is hidden
            this.onAfterColIsHidden = Types.isFn(f.on_after_col_is_hidden) ? f.on_after_col_is_hidden : null;
            //calls function before col is displayed
            this.onBeforeColIsDisplayed = Types.isFn(f.on_before_col_is_displayed) ? f.on_before_col_is_displayed : null;
            //calls function after col is displayed
            this.onAfterColIsDisplayed = Types.isFn(f.on_after_col_is_displayed) ? f.on_after_col_is_displayed : null;

            //Grid layout compatibility
            if (tf.gridLayout) {
                this.colVisHeadersTbl = tf.headTbl; //headers table
                this.colVisHeadersIndex = 0; //headers index
                this.onAfterColIsDisplayed = function () {};
                this.onAfterColIsHidden = function () {};
            }

            //Extension event definition
            //event name for TF event manager
            tf.Evt.name.colsvisibility = "ShowColsVisibility";
            //event status message
            tf.msgShowColsVisibility = "Show/Hide columns";
            tf.Evt._ShowColsVisibility = function () {
                o.ShowColsVisibility();
            };
            //event name for TF event manager
            tf.Evt.name.checkitem = "CheckItem";
            //event status message
            tf.msgCheckItem = "Showing/hiding columns";
            tf.Evt._CheckItem = function (li) {
                o.CheckItem(li);
            };

            //Loads extension stylesheet
            tf.includeFile(ext.name + "Style", this.colVisExtPath + this.colVisStylesheet, null, "link");

            this.tf = tf;

            //Sets button
            // if(this.colVisManager) o.SetShowHideColsBtn();
            this.init();
            this.colVisInitialized = true;
        }

        _createClass(ColsVisibility, {
            toggle: {
                value: function toggle(evt) {
                    var tf = this.tf;
                    var contDisplay = this.colVisContEl.style.display;
                    var onBeforeOpenColsManager = this.onBeforeOpenColsManager;
                    var onBeforeCloseColsManager = this.onBeforeCloseColsManager;
                    var onAfterOpenColsManager = this.onAfterOpenColsManager;

                    if (onBeforeOpenColsManager && contDisplay !== "inline") {
                        onBeforeOpenColsManager.call(null, this);
                    }
                    if (onBeforeCloseColsManager && contDisplay === "inline") {
                        onBeforeCloseColsManager.call(null, this);
                    }

                    this.colVisContEl.style.display = contDisplay === "inline" ? "none" : "inline";

                    if (onAfterOpenColsManager && contDisplay !== "inline") {
                        onAfterOpenColsManager.call(null, this);
                    }
                    if (onAfterCloseColsManager && contDisplay === "inline") {
                        onAfterCloseColsManager.call(null, this);
                    }
                }
            },
            checkItem: {
                value: function checkItem(evt) {
                    var li = event.target;
                    var lbl = Dom.tag(el, "label")[0];
                    if (!li || !li.firstChild || !lbl) {
                        return;
                    }
                    var isChecked = lbl.firstChild.checked;
                    var colIndex = lbl.firstChild.getAttribute("id").split("_")[1];
                    var parentNode = li.parentNode;
                    if (isChecked) {
                        Dom.addClass(parentNode, this.colVisListSlcItemCssClass);
                    } else {
                        Dom.removeClass(parentNode, this.colVisListSlcItemCssClass);
                    }
                    // var hide = (this.TickToHide && isChecked) || (!this.TickToHide && !isChecked) ? true : false;
                    var hide = false;
                    if (this.colViseTickToHide && isChecked || !this.colVisTickToHide && !isChecked) {
                        hide = true;
                    }
                    this.setHidden(colIndex, hide);
                }
            },
            init: {
                value: function init() {
                    if (this.colVisManager) {
                        this.buildBtn();
                    }
                }
            },
            buildBtn: {
                value: function buildBtn() {
                    var _this = this;

                    var tf = this.tf;
                    // if(!tf.hasGrid && !tf.isFirstLoad){
                    //     return;
                    // }
                    if (this.btnColVisEl) {
                        return;
                    }
                    var colVisSpan = Dom.create("span", ["id", this.prfxColVisSpan + tf.id]);
                    colVisSpan.className = this.colVisSpanCss;

                    //Container element (rdiv or custom element)
                    if (!this.btnColVisTgtId) {
                        tf.setToolbar();
                    }
                    var targetEl = !this.btnColVisTgtId ? tf.rDiv : Dom.id(this.btnColVisTgtId);

                    if (this.btnColVisTgtId) {
                        targetEl.firstChild.parentNode.insertBefore(colVisSpan, targetEl.firstChild);
                    } else {
                        targetEl.appendChild(colVisSpan);
                    }

                    if (!this.btnColVisHtml) {
                        var btn = Dom.create("a", ["href", "javascript:;"]);
                        btn.className = this.btnColVisCssClass;
                        btn.title = this.colVisExtDesc;

                        btn.innerHTML = this.btnColVisText;
                        colVisSpan.appendChild(btn);
                        if (!this.colVisEnableHover) {
                            // btn.onclick = this.Evt._ShowColsVisibility;
                            Event.add(btn, "click", function (evt) {
                                _this.toggle(evt);
                            });
                        } else {
                            // var o = this;
                            // btn.onmouseover = this.Evt._ShowColsVisibility;
                            Event.add(btn, "mouseover", function (evt) {
                                _this.toggle(evt);
                            });
                        }
                    } else {
                        //Custom html
                        colVisSpan.innerHTML = this.btnColVisHtml;
                        var colVisEl = colVisSpan.firstChild;
                        if (!this.colVisEnableHover) {
                            // colVisEl.onclick = this.Evt._ShowColsVisibility;
                            Event.add(colVisEl, "click", function (evt) {
                                _this.toggle(evt);
                            });
                        } else {
                            // colVisEl.onmouseover = this.Evt._ShowColsVisibility;
                            Event.add(colVisEl, "mouseover", function (evt) {
                                _this.toggle(evt);
                            });
                        }
                    }

                    this.colVisSpanEl = colVisSpan;
                    this.btnColVisEl = this.colVisSpanEl.firstChild;

                    // this.SetColsVisibilityManager();
                    this.buildManager();

                    if (this.onColsManagerLoaded) {
                        this.onColsManagerLoaded.call(null, this);
                    }
                }
            },
            buildManager: {
                value: function buildManager() {
                    var _this = this;

                    var tf = this.tf;
                    // if(!this.hasGrid && !this.isFirstLoad) return;

                    var container = !this.colVisContElTgtId ? Dom.create("div", ["id", this.prfxColVisCont + tf.id]) : Dom.id(this.colVisContElTgtId);
                    container.className = this.colVisContCss;

                    //Extension description
                    var extNameLabel = Dom.create("p");
                    extNameLabel.innerHTML = this.colVisText;
                    container.appendChild(extNameLabel);

                    //Headers list
                    var ul = Dom.create("ul", ["id", "ul" + this.colVisExtName + "_" + tf.id]);
                    ul.className = this.colVisListCss;

                    var tbl = this.colVisHeadersTbl ? this.colVisHeadersTbl : tf.tbl;
                    var headerIndex = this.colVisHeadersTbl ? this.colVisHeadersIndex : tf.getHeadersRowIndex();
                    var headerRow = tbl.rows[headerIndex];

                    //Tick all option
                    if (this.colVisEnableTickAll) {
                        var li = tf_CreateCheckItem("col__" + tf.id, this.colVisTickAllText, this.colVisTickAllText);
                        Dom.addClass(li, this.colVisListItemCssClass);
                        ul.appendChild(li);
                        var isAllTicked = false;
                        // li.check.onclick = function(){
                        //     for(var h=0; h<headerRow.cells.length; h++)
                        //     {
                        //         var itm = tf_Id('col_'+h+'_'+o.id);
                        //         if(!isAllTicked && itm.checked) itm.checked = false;
                        //         if(isAllTicked && !itm.checked) itm.checked = true;
                        //         if(itm) itm.click();
                        //     }
                        //     isAllTicked = (isAllTicked ? false : true);
                        // };

                        Event.add(li.check, "click", function (evt) {
                            for (var h = 0; h < headerRow.cells.length; h++) {
                                var itm = Dom.id("col_" + h + "_" + tf.id);
                                if (!isAllTicked && itm.checked) {
                                    itm.checked = false;
                                }
                                if (isAllTicked && !itm.checked) {
                                    itm.checked = true;
                                }
                                if (itm) {
                                    itm.click();
                                }
                            }
                            isAllTicked = !isAllTicked;
                        });

                        // if(tf_isIE)
                        // {//IE: label looses check capability
                        //     li.label.onclick = function(){ this.firstChild.click(); };
                        // }
                    }

                    for (var i = 0; i < headerRow.cells.length; i++) {
                        var cell = headerRow.cells[i];
                        var cellText = this.colVisHeadersText && this.colVisHeadersText[i] ? this.colVisHeadersText[i] : this._getHeaderText(cell);
                        var liElm = Dom.createCheckItem("col_" + i + "_" + tf.id, cellText, cellText);
                        Dom.addClass(liElm, this.colVisListItemCssClass);
                        if (!this.colVisTickToHide) {
                            Dom.addClass(liElm, this.colVisListSlcItemCssClass);
                        }
                        ul.appendChild(liElm);
                        if (!this.colVisTickToHide) {
                            liElm.check.checked = true;
                        }
                        // liElm.check.onclick = function(){ o.Evt._CheckItem(this.parentNode); };
                        Event.add(liElm.check, "click", function (evt) {
                            var elm = evt.target;
                            _this.checkItem(elm.parentNode);
                        });

                        // if(tf_isIE)
                        // {//IE: label looses check capability
                        //     li.label.onclick = function(){ this.firstChild.click(); };
                        // }
                    }

                    //separator
                    var p = Dom.create("p", ["align", "center"]);
                    var btn;
                    //Close link
                    if (!this.btnColVisCloseHtml) {
                        btn = Dom.create("a", ["href", "javascript:;"]);
                        btn.className = this.btnColVisCloseCssClass;
                        btn.innerHTML = this.btnColVisCloseText;
                        // btn.onclick = this.Evt._ShowColsVisibility;
                        Event.add(btn, "click", function (evt) {
                            _this.toggle(evt);
                        });
                        p.appendChild(btn);
                    } else {
                        p.innerHTML = this.btnColVisCloseHtml;
                        btn = p.firstChild;
                        // btn.onclick = this.Evt._ShowColsVisibility;
                        Event.add(btn, "click", function (evt) {
                            _this.toggle(evt);
                        });
                    }

                    container.appendChild(ul);
                    container.appendChild(p);

                    this.btnColVisEl.parentNode.insertBefore(container, this.btnColVisEl);
                    this.colVisContEl = container;

                    //IE6 only: options are not checked if colVisTickToHide=false
                    // if(tf_isIE && !o.colVisTickToHide)
                    //     for(var i=0; i<headerRow.cells.length; i++)
                    //         tf_Id('col_'+i+'_'+o.id).checked = true;

                    if (this.colVisAtStart) {
                        var a = this.colVisAtStart;
                        for (var k = 0; k < a.length; k++) {
                            var itm = Dom.id("col_" + a[k] + "_" + tf.id);
                            if (itm) {
                                itm.click();
                            }
                        }
                    }
                }
            },
            setHidden: {
                value: function setHidden(colIndex, hide) {
                    var tf = this.tf;
                    var col = Dom.tag(this.tbl, "col")[colIndex];
                    //External headers
                    var col1 = this.colVisHeadersTbl ? Dom.tag(this.colVisHeadersTbl, "col")[colIndex] : null;

                    if (this.onBeforeColIsHidden && hide) {
                        this.onBeforeColIsHidden.call(null, this, colIndex);
                    }
                    if (this.onBeforeColIsDisplayed && !hide) {
                        this.onBeforeColIsDisplayed.call(null, this, colIndex);
                    }

                    //cols can be hidden only under IE
                    if (this.tblHasColTag && Helpers.isIE()) {
                        var tbl = this.colVisHeadersTbl || tf.tbl;
                        var filtersRow = tbl.rows[tf.getFiltersRowIndex()];
                        var a1 = tf.getFiltersByType(tf.fltTypeSlc, true);
                        var a2 = tf.getFiltersByType(tf.fltTypeMulti, true);
                        var a = a1.concat(a2);

                        if (col) {
                            col.style.display = hide ? "none" : "";
                            //Selects are displayed even if column is hidden under IE6
                            if (a.indexOf(colIndex) !== -1) {
                                if (!this.colVisHeadersTbl) {
                                    filtersRow.cells[colIndex].style.visibility = hide ? "hidden" : "visible";
                                } else {
                                    var flt = Dom.id(tf.fltIds[colIndex]);
                                    flt.style.visibility = hide ? "hidden" : "visible";
                                }
                            }
                        }
                        if (col1) {
                            col1.style.display = hide ? "none" : "";
                        }
                    } else {
                        this._hideCells(o.tbl, colIndex, true);
                        if (this.colVisHeadersTbl) {
                            this._hideCells(this.colVisHeadersTbl, colIndex, true);
                        }
                    }

                    var hiddenCols = this.colVisHiddenCols;
                    if (hide) {
                        if (hiddenCols.indexOf(colIndex) === -1) {
                            this.colVisHiddenCols.push(colIndex);
                        }
                    } else {
                        // var itemIndex = o.showHideHiddenCols.tf_IndexByValue(colIndex, true);
                        var itemIndex = Arr.indexByValue(hiddenCols, colIndex, true);
                        if (hiddenCols.indexOf(colIndex) !== -1) {
                            this.colVisHiddenCols.splice(itemIndex, 1);
                        }
                    }

                    var gridLayout;
                    var headTbl;
                    var gridColElms;
                    if (this.onAfterColIsHidden && hide) {
                        //This event is fired just after a column is displayed for
                        //grid_layout compatibility
                        if (tf.gridLayout) {
                            //Returns the removed column widths
                            // function getHiddenWidth(){
                            //     var ths = o.headTbl.rows[o.showHideColsHeadersIndex].cells;
                            //     var hW = 0;
                            //     for(var i=0; i<o.nbCells; i++){
                            //         if(ths[i].style.display == 'none'){
                            //             var w = parseInt(ths[i].style.width);
                            //             ths[i].style.width = 0;
                            //             hW += w;
                            //         }
                            //     }
                            //     return hW;
                            // }
                            gridLayout = tf.Cpt.gridLayout;
                            headTbl = gridLayout.headTbl;
                            gridColElms = gridLayout.gridColElms;
                            if (Helpers.isIE()) {
                                tf.tbl.style.width = headTbl.clientWidth + "px";
                            } else {
                                var ths = headTbl.rows[this.colVisHeadersIndex].cells;
                                var hiddenWidth = 0;
                                for (var i = 0; i < o.nbCells; i++) {
                                    if (ths[i].style.display === "none") {
                                        var w = parseInt(ths[i].style.width, 10);
                                        ths[i].style.width = 0;
                                        hiddenWidth += w;
                                    }
                                }
                                var headTblW = parseInt(headTbl.style.width, 10);

                                headTbl.style.width = headTblW - hiddenWidth + "px";
                                tf.tbl.style.width = headTbl.style.width;
                                gridColElms[colIndex].style.display = "none";
                            }
                        }
                        this.onAfterColIsHidden.call(null, this, colIndex);
                    }

                    if (this.onAfterColIsDisplayed && !hide) {
                        //This event is fired just after a column is displayed for
                        //grid_layout compatibility
                        if (tf.gridLayout /*&& (!tf_isIE && !tf_isIE7)*/) {
                            gridLayout = tf.Cpt.gridLayout;
                            headTbl = gridLayout.headTbl;
                            gridColElms = gridLayout.gridColElms;
                            gridColElms[colIndex].style.display = "";
                            var width = parseInt(gridColElms[colIndex].style.width, 10);
                            gridLayout.crWColsRow.cells[colIndex].style.width = width + "px";
                            headTbl.style.width = parseInt(headTbl.style.width, 10) + width + "px";
                            tf.tbl.style.width = headTbl.style.width;
                        }
                        this.onAfterColIsDisplayed.call(null, this, colIndex);
                    }
                }
            },
            showCol: {
                value: function showCol(colIndex) {
                    if (colIndex === undefined || !this.IsColHidden(colIndex)) {
                        return;
                    }
                    if (this.colVisManager && this.colVisContEl) {
                        var itm = Dom.id("col_" + colIndex + "_" + this.tf.id);
                        if (itm) {
                            itm.click();
                        }
                    } else {
                        this.setHidden(colIndex, false);
                    }
                }
            },
            hideCol: {
                value: function hideCol(colIndex) {
                    if (colIndex === undefined || this.IsColHidden(colIndex)) {
                        return;
                    }
                    if (this.colVisManager && this.colVisContEl) {
                        var itm = Dom.id("col_" + colIndex + "_" + this.tf.id);
                        if (itm) {
                            itm.click();
                        }
                    } else {
                        this.setHidden(colIndex, true);
                    }
                }
            },
            isColHidden: {
                value: function isColHidden(colIndex) {
                    if (this.colVisHiddenCols.indexOf(colIndex) !== -1) {
                        return true;
                    }
                    return false;
                }
            },
            toggleCol: {
                value: function toggleCol(colIndex) {
                    if (colIndex === undefined || this.IsColHidden(colIndex)) {
                        this.ShowCol(colIndex);
                    } else {
                        this.HideCol(colIndex);
                    }
                }
            },
            getHiddenCols: {
                value: function getHiddenCols() {
                    return this.colVisHiddenCols;
                }
            },
            destroy: {
                value: function destroy() {
                    if (!this.btnColVisEl || !this.colVisContEl) {
                        return;
                    }
                    if (Dom.id(this.colVisContElTgtId)) {
                        Dom.id(this.colVisContElTgtId).innerHTML = "";
                    } else {
                        this.colVisContEl.innerHTML = "";
                        this.colVisContEl.parentNode.removeChild(this.colVisContEl);
                        this.colVisContEl = null;
                    }
                    this.btnColVisEl.innerHTML = "";
                    this.btnColVisEl.parentNode.removeChild(this.btnColVisEl);
                    this.btnColVisEl = null;
                    this.colVisInitialized = false;
                }
            },
            _getHeaderText: {
                value: function _getHeaderText(cell) {
                    if (!cell.hasChildNodes) {
                        return "";
                    }

                    for (var i = 0; i < cell.childNodes.length; i++) {
                        var n = cell.childNodes[i];
                        if (n.nodeType === 3) {
                            return n.nodeValue;
                        } else if (n.nodeType === 1) {
                            if (n.id && n.id.indexOf("popUp") !== -1) {
                                continue;
                            } else {
                                return Dom.getText(n);
                            }
                        }
                        continue;
                    }
                    return "";
                }
            },
            _hideCells: {
                value: function _hideCells(tbl, colIndex, hide) {
                    for (var i = 0; i < tbl.rows.length; i++) {
                        var row = tbl.rows[i];
                        var cell = row.cells[colIndex];
                        if (cell) {
                            cell.style.display = hide ? "none" : "";
                        }
                    }
                }
            }
        });

        return ColsVisibility;
    })();
});
//# sourceMappingURL=colsVisibility.js.map