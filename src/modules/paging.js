define(["exports", "../dom", "../types", "../string", "../helpers", "../event"], function (exports, _dom, _types, _string, _helpers, _event) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var Dom = _dom.Dom;
  var Types = _types.Types;
  var Str = _string.Str;
  var Helpers = _helpers.Helpers;
  var Event = _event.Event;
  var Paging = (function () {
    var Paging = function Paging(tf) {
      // Configuration object
      var f = tf.config();

      //css class for paging buttons (previous,next,etc.)
      this.btnPageCssClass = f.paging_btn_css_class || "pgInp";
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
      this.pgSlcCssClass = f.paging_slc_css_class || "pgSlc";
      //css class for paging input element
      this.pgInpCssClass = f.paging_inp_css_class || "pgNbInp";
      //stores results per page text and values
      this.resultsPerPage = f.results_per_page || null;
      //enables/disables results per page drop-down
      this.hasResultsPerPage = Types.isArray(this.resultsPerPage);
      //defines css class for results per page select
      this.resultsSlcCssClass = f.results_slc_css_class || "rspg";
      //css class for label preceding results per page select
      this.resultsSpanCssClass = f.results_span_css_class || "rspgSpan";
      //1st row index of current page
      this.startPagingRow = 0;
      //total nb of pages
      this.nbPages = 0;
      //current page nb
      this.currentPageNb = 1;
      //defines next page button text
      this.btnNextPageText = f.btn_next_page_text || ">";
      //defines previous page button text
      this.btnPrevPageText = f.btn_prev_page_text || "<";
      //defines last page button text
      this.btnLastPageText = f.btn_last_page_text || ">|";
      //defines first page button text
      this.btnFirstPageText = f.btn_first_page_text || "|<";
      //defines next page button html
      this.btnNextPageHtml = f.btn_next_page_html || (!tf.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " nextPage\" title=\"Next page\" />");
      //defines previous page button html
      this.btnPrevPageHtml = f.btn_prev_page_html || (!tf.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " previousPage\" title=\"Previous page\" />");
      //defines last page button html
      this.btnFirstPageHtml = f.btn_first_page_html || (!tf.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " firstPage\" title=\"First page\" />");
      //defines previous page button html
      this.btnLastPageHtml = f.btn_last_page_html || (!tf.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " lastPage\" title=\"Last page\" />");
      //defines text preceeding page selector drop-down
      this.pageText = f.page_text || " Page ";
      //defines text after page selector drop-down
      this.ofText = f.of_text || " of ";
      //css class for span containing tot nb of pages
      this.nbPgSpanCssClass = f.nb_pages_css_class || "nbpg";
      //enables/disables paging buttons
      this.hasPagingBtns = f.paging_btns === false ? false : true;
      //defines previous page button html
      this.pageSelectorType = f.page_selector_type || tf.fltTypeSlc;
      //calls function before page is changed
      this.onBeforeChangePage = Types.isFn(f.on_before_change_page) ? f.on_before_change_page : null;
      //calls function before page is changed
      this.onAfterChangePage = Types.isFn(f.on_after_change_page) ? f.on_after_change_page : null;
      var start_row = this.refRow;
      var nrows = this.nbRows;
      //calculates page nb
      this.nbPages = Math.ceil((nrows - start_row) / this.pagingLength);

      //Paging elements events
      var o = this;
      // Paging DOM events
      this.evt = {
        slcIndex: function () {
          return (o.pageSelectorType === tf.fltTypeSlc) ? o.pagingSlc.options.selectedIndex : parseInt(o.pagingSlc.value, 10) - 1;
        },
        nbOpts: function () {
          return (o.pageSelectorType === tf.fltTypeSlc) ? parseInt(o.pagingSlc.options.length, 10) - 1 : (o.nbPages - 1);
        },
        next: function () {
          var nextIndex = o.evt.slcIndex() < o.evt.nbOpts() ? o.evt.slcIndex() + 1 : 0;
          o.changePage(nextIndex);
        },
        prev: function () {
          var prevIndex = o.evt.slcIndex() > 0 ? o.evt.slcIndex() - 1 : o.evt.nbOpts();
          o.changePage(prevIndex);
        },
        last: function () {
          o.changePage(o.evt.nbOpts());
        },
        first: function () {
          o.changePage(0);
        },
        _detectKey: function (e) {
          var key = tf.Evt.getKeyCode(e);
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
    };

    _classProps(Paging, null, {
      init: {
        writable: true,
        value: function () {
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
            // if(evt._Paging._OnSlcPagesChangeEvt){
            //     evt._Paging._OnSlcPagesChangeEvt();
            // }
            _this.changePage();
            event.target.blur();
          };

          // Paging drop-down list selector
          if (this.pageSelectorType === tf.fltTypeSlc) {
            slcPages = Dom.create(tf.fltTypeSlc, ["id", tf.prfxSlcPages + tf.id]);
            slcPages.className = this.pgSlcCssClass;
            Event.add(slcPages, "change", evt.slcPagesChange);
          }

          // Paging input selector
          if (this.pageSelectorType === tf.fltTypeInp) {
            slcPages = Dom.create(tf.fltTypeInp, ["id", tf.prfxSlcPages + tf.id], ["value", this.currentPageNb]);
            slcPages.className = this.pgInpCssClass;
            Event.add(slcPages, "keypress", evt._detectKey);
          }

          // btns containers
          var btnNextSpan = Dom.create("span", ["id", tf.prfxBtnNextSpan + tf.id]);
          var btnPrevSpan = Dom.create("span", ["id", tf.prfxBtnPrevSpan + tf.id]);
          var btnLastSpan = Dom.create("span", ["id", tf.prfxBtnLastSpan + tf.id]);
          var btnFirstSpan = Dom.create("span", ["id", tf.prfxBtnFirstSpan + tf.id]);

          if (this.hasPagingBtns) {
            // Next button
            if (!this.btnNextPageHtml) {
              var btn_next = Dom.create(tf.fltTypeInp, ["id", tf.prfxBtnNext + tf.id], ["type", "button"], ["value", this.btnNextPageText], ["title", "Next"]);
              btn_next.className = this.btnPageCssClass;
              Event.add(btn_next, "click", evt.next);
              btnNextSpan.appendChild(btn_next);
            } else {
              btnNextSpan.innerHTML = this.btnNextPageHtml;
              Event.add(btnNextSpan, "click", evt.next);
            }
            // Previous button
            if (!this.btnPrevPageHtml) {
              var btn_prev = Dom.create(tf.fltTypeInp, ["id", tf.prfxBtnPrev + tf.id], ["type", "button"], ["value", this.btnPrevPageText], ["title", "Previous"]);
              btn_prev.className = this.btnPageCssClass;
              Event.add(btn_prev, "click", evt.prev);
              btnPrevSpan.appendChild(btn_prev);
            } else {
              btnPrevSpan.innerHTML = this.btnPrevPageHtml;
              Event.add(btnPrevSpan, "click", evt.prev);
            }
            // Last button
            if (!this.btnLastPageHtml) {
              var btn_last = Dom.create(tf.fltTypeInp, ["id", tf.prfxBtnLast + tf.id], ["type", "button"], ["value", this.btnLastPageText], ["title", "Last"]);
              btn_last.className = this.btnPageCssClass;
              Event.add(btn_last, "click", evt.last);
              btnLastSpan.appendChild(btn_last);
            } else {
              btnLastSpan.innerHTML = this.btnLastPageHtml;
              Event.add(btnLastSpan, "click", evt.last);
            }
            // First button
            if (!this.btnFirstPageHtml) {
              var btn_first = Dom.create(tf.fltTypeInp, ["id", tf.prfxBtnFirst + tf.id], ["type", "button"], ["value", this.btnFirstPageText], ["title", "First"]);
              btn_first.className = this.btnPageCssClass;
              Event.add(btn_first, "click", evt.first);
              btnFirstSpan.appendChild(btn_first);
            } else {
              btnFirstSpan.innerHTML = this.btnFirstPageHtml;
              Event.add(btnFirstSpan, "click", evt.first);
            }
          }

          // paging elements (buttons+drop-down list) are added to defined element
          if (!this.pagingTgtId) {
            tf.setToolbar();
          }
          var targetEl = !this.pagingTgtId ? tf.mDiv : Dom.id(this.pagingTgtId);
          targetEl.appendChild(btnFirstSpan);
          targetEl.appendChild(btnPrevSpan);

          var pgBeforeSpan = Dom.create("span", ["id", tf.prfxPgBeforeSpan + tf.id]);
          pgBeforeSpan.appendChild(Dom.text(this.pageText));
          pgBeforeSpan.className = this.nbPgSpanCssClass;
          targetEl.appendChild(pgBeforeSpan);
          targetEl.appendChild(slcPages);
          var pgAfterSpan = Dom.create("span", ["id", tf.prfxPgAfterSpan + tf.id]);
          pgAfterSpan.appendChild(Dom.text(this.ofText));
          pgAfterSpan.className = this.nbPgSpanCssClass;
          targetEl.appendChild(pgAfterSpan);
          var pgspan = Dom.create("span", ["id", tf.prfxPgSpan + tf.id]);
          pgspan.className = this.nbPgSpanCssClass;
          pgspan.appendChild(Dom.text(" " + this.nbPages + " "));
          targetEl.appendChild(pgspan);
          targetEl.appendChild(btnNextSpan);
          targetEl.appendChild(btnLastSpan);
          this.pagingSlc = Dom.id(tf.prfxSlcPages + tf.id);

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
      },
      addPaging: {
        writable: true,
        value: function (filterTable) {
          if (filterTable === undefined) filterTable = false;
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
      },
      setPagingInfo: {
        writable: true,
        value: function (validRows) {
          var tf = this.tf;
          var rows = tf.tbl.rows;
          var mdiv = !this.pagingTgtId ? tf.mDiv : Dom.id(this.pagingTgtId);
          var pgspan = Dom.id(tf.prfxPgSpan + tf.id);
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
              var isRowValid = row.getAttribute("validRow");
              if (isRowValid === "true" || !isRowValid) {
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
            this.pagingSlc.innerHTML = "";
          }

          if (this.nbPages > 0) {
            mdiv.style.visibility = "visible";
            if (this.pageSelectorType === tf.fltTypeSlc) {
              for (var z = 0; z < this.nbPages; z++) {
                var currOpt = new Option((z + 1), z * this.pagingLength, false, false);
                this.pagingSlc.options[z] = currOpt;
              }
            } else {
              //input type
              this.pagingSlc.value = this.currentPageNb;
            }
          } else {
            /*** if no results paging select and buttons are hidden ***/
            mdiv.style.visibility = "hidden";
          }
          this.groupByPage(tf.validRowsIndex);
        }
      },
      groupByPage: {
        writable: true,
        value: function (validRows) {
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
              if (r.getAttribute("validRow") === "true" || !r.getAttribute("validRow")) {
                r.style.display = "";
              }
              if (tf.alternateBgs && tf.Cpt.alternateRows) {
                tf.Cpt.alternateRows.setRowBg(tf.validRowsIndex[h], h);
              }
            } else {
              r.style.display = "none";
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
      },
      setPage: {
        writable: true,
        value: function (cmd) {
          var tf = this.tf;
          if (!tf.hasGrid() || !this.paging) {
            return;
          }
          var btnEvt = this.evt, cmdtype = typeof cmd;
          if (cmdtype === "string") {
            switch (Str.lower(cmd)) {
              case "next":
                btnEvt.next();
                break;
              case "previous":
                btnEvt.prev();
                break;
              case "last":
                btnEvt.last();
                break;
              case "first":
                btnEvt.first();
                break;
              default:
                btnEvt.next();
                break;
            }
          } else if (cmdtype === "number") {
            this.changePage(cmd - 1);
          }
        }
      },
      setResultsPerPage: {
        writable: true,
        value: function () {
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

          var slcR = Dom.create(tf.fltTypeSlc, ["id", tf.prfxSlcResults + tf.id]);
          slcR.className = tf.resultsSlcCssClass;
          var slcRText = this.resultsPerPage[0], slcROpts = this.resultsPerPage[1];
          var slcRSpan = Dom.create("span", ["id", tf.prfxSlcResultsTxt + tf.id]);
          slcRSpan.className = this.resultsSpanCssClass;

          // results per page select is added to external element
          if (!this.resultsPerPageTgtId) {
            tf.setToolbar();
          }
          var targetEl = !this.resultsPerPageTgtId ? tf.rDiv : Dom.id(this.resultsPerPageTgtId);
          slcRSpan.appendChild(Dom.text(slcRText));
          targetEl.appendChild(slcRSpan);
          targetEl.appendChild(slcR);

          this.resultsPerPageSlc = Dom.id(tf.prfxSlcResults + tf.id);

          for (var r = 0; r < slcROpts.length; r++) {
            var currOpt = new Option(slcROpts[r], slcROpts[r], false, false);
            this.resultsPerPageSlc.options[r] = currOpt;
          }
          Event.add(slcR, "change", evt.slcResultsChange);
        }
      },
      removeResultsPerPage: {
        writable: true,
        value: function () {
          var tf = this.tf;
          if (!tf.hasGrid() || !this.resultsPerPageSlc || !this.resultsPerPage) {
            return;
          }
          var slcR = this.resultsPerPageSlc, slcRSpan = Dom.id(tf.prfxSlcResultsTxt + tf.id);
          if (slcR) {
            slcR.parentNode.removeChild(slcR);
          }
          if (slcRSpan) {
            slcRSpan.parentNode.removeChild(slcRSpan);
          }
          this.resultsPerPageSlc = null;
        }
      },
      changePage: {
        writable: true,
        value: function (index) {
          var tf = this.tf;
          var evt = tf.Evt;
          tf.EvtManager(evt.name.changepage, { pgIndex: index });
        }
      },
      changeResultsPerPage: {
        writable: true,
        value: function () {
          var tf = this.tf;
          var evt = tf.Evt;
          tf.EvtManager(evt.name.changeresultsperpage);
        }
      },
      resetPage: {
        writable: true,
        value: function () {
          var tf = this.tf;
          var evt = tf.Evt;
          tf.EvtManager(evt.name.resetpage);
        }
      },
      resetPageLength: {
        writable: true,
        value: function () {
          var tf = this.tf;
          var evt = tf.Evt;
          tf.EvtManager(evt.name.resetpagelength);
        }
      },
      _changePage: {
        writable: true,
        value: function (index) {
          var tf = this.tf;

          if (!tf.paging) {
            return;
          }
          if (index === null) {
            index = this.pageSelectorType === tf.fltTypeSlc ? this.pagingSlc.options.selectedIndex : (this.pagingSlc.value - 1);
          }
          if (index >= 0 && index <= (this.nbPages - 1)) {
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
            this.startPagingRow = (this.pageSelectorType === tf.fltTypeSlc) ? this.pagingSlc.value : (index * this.pagingLength);

            this.groupByPage();

            if (this.onAfterChangePage) {
              this.onAfterChangePage.call(null, this, index);
            }
          }
        }
      },
      _changeResultsPerPage: {
        writable: true,
        value: function () {
          var tf = this.tf;

          if (!tf.paging) {
            return;
          }
          var slcR = this.resultsPerPageSlc;
          var slcPagesSelIndex = (this.pageSelectorType === tf.fltTypeSlc) ? this.pagingSlc.selectedIndex : parseInt(this.pagingSlc.value - 1, 10);
          this.pagingLength = parseInt(slcR.options[slcR.selectedIndex].value, 10);
          this.startPagingRow = this.pagingLength * slcPagesSelIndex;

          if (!isNaN(this.pagingLength)) {
            if (this.startPagingRow >= tf.nbFilterableRows) {
              this.startPagingRow = (tf.nbFilterableRows - this.pagingLength);
            }
            this.setPagingInfo();

            if (this.pageSelectorType === tf.fltTypeSlc) {
              var slcIndex = (this.pagingSlc.options.length - 1 <= slcPagesSelIndex) ? (this.pagingSlc.options.length - 1) : slcPagesSelIndex;
              this.pagingSlc.options[slcIndex].selected = true;
            }
            if (tf.rememberPageLen) {
              tf.Cpt.store.savePageLength(tf.pgLenCookie);
            }
          }
        }
      },
      _resetPage: {
        writable: true,
        value: function (name) {
          var tf = this.tf;
          var pgnb = tf.Cpt.store.getPageNb(name);
          if (pgnb !== "") {
            this.changePage((pgnb - 1));
          }
        }
      },
      _resetPageLength: {
        writable: true,
        value: function (name) {
          var tf = this.tf;
          if (!tf.paging) {
            return;
          }
          var pglenIndex = tf.Cpt.store.getPageLength(name);

          if (pglenIndex !== "") {
            this.resultsPerPageSlc.options[pglenIndex].selected = true;
            this.changeResultsPerPage();
          }
        }
      },
      destroy: {
        writable: true,
        value: function () {
          var tf = this.tf;

          if (!tf.hasGrid()) {
            return;
          }
          // btns containers
          var btnNextSpan, btnPrevSpan, btnLastSpan, btnFirstSpan;
          var pgBeforeSpan, pgAfterSpan, pgspan;
          btnNextSpan = Dom.id(tf.prfxBtnNextSpan + tf.id);
          btnPrevSpan = Dom.id(tf.prfxBtnPrevSpan + tf.id);
          btnLastSpan = Dom.id(tf.prfxBtnLastSpan + tf.id);
          btnFirstSpan = Dom.id(tf.prfxBtnFirstSpan + tf.id);
          //span containing 'Page' text
          pgBeforeSpan = Dom.id(tf.prfxPgBeforeSpan + tf.id);
          //span containing 'of' text
          pgAfterSpan = Dom.id(tf.prfxPgAfterSpan + tf.id);
          //span containing nb of pages
          pgspan = Dom.id(tf.prfxPgSpan + tf.id);

          var evt = this.evt;

          if (this.pagingSlc) {
            if (this.pageSelectorType === tf.fltTypeSlc) {
              Event.remove(this.pagingSlc, "change", evt.slcPagesChange);
            } else if (this.pageSelectorType === tf.fltTypeInp) {
              Event.remove(this.pagingSlc, "keypress", evt._detectKey);
            }
            this.pagingSlc.parentNode.removeChild(this.pagingSlc);
          }

          if (btnNextSpan) {
            Event.remove(btnNextSpan, "click", evt.next);
            btnNextSpan.parentNode.removeChild(btnNextSpan);
          }

          if (btnPrevSpan) {
            Event.remove(btnPrevSpan, "click", evt.prev);
            btnPrevSpan.parentNode.removeChild(btnPrevSpan);
          }

          if (btnLastSpan) {
            Event.remove(btnLastSpan, "click", evt.last);
            btnLastSpan.parentNode.removeChild(btnLastSpan);
          }

          if (btnFirstSpan) {
            Event.remove(btnFirstSpan, "click", evt.first);
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
      }
    });

    return Paging;
  })();

  exports.Paging = Paging;
});