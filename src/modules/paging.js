define(["exports", "../dom", "../types", "../string", "../helpers"], function (exports, _dom, _types, _string, _helpers) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var Dom = _dom.Dom;
  var Types = _types.Types;
  var Str = _string.Str;
  var Helpers = _helpers.Helpers;
  var Paging = (function () {
    var Paging = function Paging(tf) {
      // TableFilter configuration
      var f = tf.fObj;

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
      //defines css class for results per page select
      this.resultsSlcCssClass = f.results_slc_css_class || "rspg";
      //css class for label preceding results per page select
      this.resultsSpanCssClass = f.results_span_css_class || "rspgSpan";
      //nb visible rows
      this.nbVisibleRows = 0;
      //nb hidden rows
      this.nbHiddenRows = 0;
      //1st row index of current page
      this.startPagingRow = 0;
      //total nb of pages
      this.nbPages = 0;
      //defines next page button text
      this.btnNextPageText = f.btn_next_page_text || ">";
      //defines previous page button text
      this.btnPrevPageText = f.btn_prev_page_text || "<";
      //defines last page button text
      this.btnLastPageText = f.btn_last_page_text || ">|";
      //defines first page button text
      this.btnFirstPageText = f.btn_first_page_text || "|<";
      //defines next page button html
      this.btnNextPageHtml = f.btn_next_page_html || (!this.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " nextPage\" title=\"Next page\" />");
      //defines previous page button html
      this.btnPrevPageHtml = f.btn_prev_page_html || (!this.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " previousPage\" title=\"Previous page\" />");
      //defines last page button html
      this.btnFirstPageHtml = f.btn_first_page_html || (!this.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " firstPage\" title=\"First page\" />");
      //defines previous page button html
      this.btnLastPageHtml = f.btn_last_page_html || (!this.enableIcons ? null : "<input type=\"button\" value=\"\" class=\"" + this.btnPageCssClass + " lastPage\" title=\"Last page\" />");
      //defines text preceeding page selector drop-down
      this.pageText = f.page_text || " Page ";
      //defines text after page selector drop-down
      this.ofText = f.of_text || " of ";
      //css class for span containing tot nb of pages
      this.nbPgSpanCssClass = f.nb_pages_css_class || "nbpg";
      //enables/disables paging buttons
      this.hasPagingBtns = f.paging_btns === false ? false : true;
      //stores paging buttons events
      this.pagingBtnEvents = null;
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

      var evt = tf.Evt;
      //Paging elements events
      if (!evt._Paging.next) {
        var o = this;
        evt._Paging = { // paging buttons events
          slcIndex: function () {
            return (o.pageSelectorType === tf.fltTypeSlc) ? o.pagingSlc.options.selectedIndex : parseInt(o.pagingSlc.value, 10) - 1;
          },
          nbOpts: function () {
            return (o.pageSelectorType === tf.fltTypeSlc) ? parseInt(o.pagingSlc.options.length, 10) - 1 : (o.nbPages - 1);
          },
          next: function () {
            if (evt._Paging.nextEvt) {
              evt._Paging.nextEvt();
            }
            var nextIndex = evt._Paging.slcIndex() < evt._Paging.nbOpts() ? evt._Paging.slcIndex() + 1 : 0;
            o.changePage(nextIndex);
          },
          prev: function () {
            if (evt._Paging.prevEvt) {
              evt._Paging.prevEvt();
            }
            var prevIndex = evt._Paging.slcIndex() > 0 ? evt._Paging.slcIndex() - 1 : evt._Paging.nbOpts();
            o.changePage(prevIndex);
          },
          last: function () {
            if (evt._Paging.lastEvt) {
              evt._Paging.lastEvt();
            }
            o.changePage(evt._Paging.nbOpts());
          },
          first: function () {
            if (evt._Paging.firstEvt) {
              evt._Paging.firstEvt();
            }
            o.changePage(0);
          },
          _detectKey: function (e) {
            var evt = e || global.event;
            if (evt) {
              var key = evt.getKeyCode(e);
              if (key === 13) {
                if (tf.sorted) {
                  tf.Filter();
                  o.changePage(evt._Paging.slcIndex());
                } else {
                  o.changePage();
                }
                this.blur();
              }
            }
          },
          nextEvt: null,
          prevEvt: null,
          lastEvt: null,
          firstEvt: null
        };
      }

      this.tf = tf;
    };

    _classProps(Paging, null, {
      init: {
        writable: true,
        value: function () {
          var slcPages;
          var tf = this.tf;
          var evt = tf.Evt;

          // Paging drop-down list selector
          if (this.pageSelectorType === tf.fltTypeSlc) {
            slcPages = Dom.create(tf.fltTypeSlc, ["id", tf.prfxSlcPages + tf.id]);
            slcPages.className = this.pgSlcCssClass;
            console.log(evt);
            slcPages.onchange = evt._OnSlcPagesChange;
            //slcPages.onchange = function(){ alert('hello'); }
          }

          // Paging input selector
          if (this.pageSelectorType === tf.fltTypeInp) {
            slcPages = Dom.create(tf.fltTypeInp, ["id", tf.prfxSlcPages + tf.id], ["value", tf.currentPageNb]);
            slcPages.className = this.pgInpCssClass;
            slcPages.onkeypress = evt._Paging._detectKey;
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
              btn_next.onclick = evt._Paging.next;
              btnNextSpan.appendChild(btn_next);
            } else {
              btnNextSpan.innerHTML = this.btnNextPageHtml;
              btnNextSpan.onclick = evt._Paging.next;
            }
            // Previous button
            if (!this.btnPrevPageHtml) {
              var btn_prev = Dom.create(tf.fltTypeInp, ["id", tf.prfxBtnPrev + tf.id], ["type", "button"], ["value", this.btnPrevPageText], ["title", "Previous"]);
              btn_prev.className = this.btnPageCssClass;
              btn_prev.onclick = evt._Paging.prev;
              btnPrevSpan.appendChild(btn_prev);
            } else {
              btnPrevSpan.innerHTML = this.btnPrevPageHtml;
              btnPrevSpan.onclick = evt._Paging.prev;
            }
            // Last button
            if (!this.btnLastPageHtml) {
              var btn_last = Dom.create(tf.fltTypeInp, ["id", tf.prfxBtnLast + tf.id], ["type", "button"], ["value", this.btnLastPageText], ["title", "Last"]);
              btn_last.className = this.btnPageCssClass;
              btn_last.onclick = evt._Paging.last;
              btnLastSpan.appendChild(btn_last);
            } else {
              btnLastSpan.innerHTML = this.btnLastPageHtml;
              btnLastSpan.onclick = evt._Paging.last;
            }
            // First button
            if (!this.btnFirstPageHtml) {
              var btn_first = Dom.create(tf.fltTypeInp, ["id", tf.prfxBtnFirst + tf.id], ["type", "button"], ["value", this.btnFirstPageText], ["title", "First"]);
              btn_first.className = this.btnPageCssClass;
              btn_first.onclick = evt._Paging.first;
              btnFirstSpan.appendChild(btn_first);
            } else {
              btnFirstSpan.innerHTML = this.btnFirstPageHtml;
              btnFirstSpan.onclick = evt._Paging.first;
            }
          }

          // paging elements (buttons+drop-down list) are added to defined element
          if (!this.pagingTgtId) {
            tf.SetTopDiv();
          }
          var targetEl = !this.pagingTgtId ? tf.mDiv : Dom.id(this.pagingTgtId);

          /***
          if paging previously removed this prevents IE memory leak with
          removeChild used in RemovePaging method. For more info refer to
          http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=2840253&SiteID=1
          ***/
          if (targetEl.innerHTML !== "") {
            targetEl.innerHTML = "";
          }
          /*** ***/

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

          /*====================================================
              - onchange event for paging select
          =====================================================*/
          var o = this;
          evt._OnSlcPagesChange = function () {
            if (evt._Paging._OnSlcPagesChangeEvt) {
              evt._Paging._OnSlcPagesChangeEvt();
            }
            o.changePage();
            this.blur();
            //ie only: blur is not enough...
            if (this.parentNode && Helpers.isIE()) {
              this.parentNode.focus();
            }
          };

          // if this.rememberGridValues==true this.SetPagingInfo() is called
          // in ResetGridValues() method
          if (!tf.rememberGridValues || tf.isPagingRemoved) {
            this.setPagingInfo();
          }
          if (!tf.fltGrid) {
            tf.ValidateAllRows();
            this.setPagingInfo(tf.validRowsIndex);
          }

          this.pagingBtnEvents = evt._Paging;
          tf.isPagingRemoved = false;
        }
      },
      addPaging: {
        writable: true,
        value: function (filterTable) {
          var tf = this.tf;
          if (!tf.hasGrid || tf.paging) {
            return;
          }
          tf.paging = true;
          tf.isPagingRemoved = true;
          this.init();
          tf.ResetValues();
          if (filterTable) {
            tf.Filter();
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
          tf.ApplyGridProps();
        }
      },
      setPage: {
        writable: true,
        value: function (cmd) {
          var tf = this.tf;
          if (!tf.hasGrid || !this.paging) {
            return;
          }
          var btnEvt = this.pagingBtnEvents, cmdtype = typeof cmd;
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
          }
          if (cmdtype === "number") {
            this.changePage(cmd - 1);
          }
        }
      },
      setResultsPerPage: {
        writable: true,
        value: function () {
          var tf = this.tf;
          var evt = tf.Evt;

          if (!tf.hasGrid && !tf.isFirstLoad) {
            return;
          }
          if (this.resultsPerPageSlc || !this.resultsPerPage) {
            return;
          }

          //Change nb results per page event
          if (!evt._OnSlcResultsChange) {
            /*====================================================
                - onchange event for results per page select
            =====================================================*/
            evt._OnSlcResultsChange = function () {
              this.changeResultsPerPage();
              this.blur();
              //ie only: blur is not enough...
              if (this.parentNode && Helpers.isIE()) {
                this.parentNode.focus();
              }
            };
          }

          var slcR = Dom.create(tf.fltTypeSlc, ["id", tf.prfxSlcResults + tf.id]);
          slcR.className = tf.resultsSlcCssClass;
          var slcRText = this.resultsPerPage[0], slcROpts = this.resultsPerPage[1];
          var slcRSpan = Dom.create("span", ["id", tf.prfxSlcResultsTxt + tf.id]);
          slcRSpan.className = this.resultsSpanCssClass;

          // results per page select is added to external element
          if (!this.resultsPerPageTgtId) {
            tf.SetTopDiv();
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
          slcR.onchange = evt._OnSlcResultsChange;
        }
      },
      removeResultsPerPage: {
        writable: true,
        value: function () {
          var tf = this.tf;
          if (!tf.hasGrid || !this.resultsPerPageSlc || !this.resultsPerPage) {
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
          if (index === undefined) {
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
              tf.Cpt.store.savePageNb(this.pgNbCookie);
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

          if (!tf.hasGrid || this.pagingSlc) {
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

          this.pagingSlc.parentNode.removeChild(this.pagingSlc);

          if (btnNextSpan) {
            btnNextSpan.parentNode.removeChild(btnNextSpan);
          }

          if (btnPrevSpan) {
            btnPrevSpan.parentNode.removeChild(btnPrevSpan);
          }

          if (btnLastSpan) {
            btnLastSpan.parentNode.removeChild(btnLastSpan);
          }

          if (btnFirstSpan) {
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

          this.pagingBtnEvents = null;
          this.pagingSlc = null;
          tf.isPagingRemoved = true;
        }
      }
    });

    return Paging;
  })();

  exports.Paging = Paging;
});