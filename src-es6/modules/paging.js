import {Dom} from '../dom';
import {Helpers} from '../helpers';

export class Paging{
    
    /**
     * Pagination component
     * @param {Object} tf TableFilter instance
     */
    constructor(tf){
        // TableFilter configuration
        var f = tf.fObj;
        
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
        //defines css class for results per page select
        this.resultsSlcCssClass = f.results_slc_css_class || 'rspg';
        //css class for label preceding results per page select
        this.resultsSpanCssClass = f.results_span_css_class || 'rspgSpan';
        //nb visible rows
        this.nbVisibleRows = 0;
        //nb hidden rows
        this.nbHiddenRows = 0;
        //1st row index of current page
        this.startPagingRow = 0;
        //total nb of pages
        this.nbPages = 0;
        //defines next page button text
        this.btnNextPageText = f.btn_next_page_text || '>';
        //defines previous page button text
        this.btnPrevPageText = f.btn_prev_page_text || '<';
        //defines last page button text
        this.btnLastPageText = f.btn_last_page_text || '>|';
        //defines first page button text
        this.btnFirstPageText = f.btn_first_page_text || '|<';
        //defines next page button html
        this.btnNextPageHtml = f.btn_next_page_html ||
            (!this.enableIcons ? null :
            '<input type="button" value="" class="'+this.btnPageCssClass +
            ' nextPage" title="Next page" />');
        //defines previous page button html
        this.btnPrevPageHtml = f.btn_prev_page_html ||
            (!this.enableIcons ? null :
            '<input type="button" value="" class="'+this.btnPageCssClass +
            ' previousPage" title="Previous page" />');
        //defines last page button html
        this.btnFirstPageHtml = f.btn_first_page_html ||
            (!this.enableIcons ? null :
            '<input type="button" value="" class="'+this.btnPageCssClass +
            ' firstPage" title="First page" />');
        //defines previous page button html
        this.btnLastPageHtml = f.btn_last_page_html ||
            (!this.enableIcons ? null :
            '<input type="button" value="" class="'+this.btnPageCssClass +
            ' lastPage" title="Last page" />');
        //defines text preceeding page selector drop-down
        this.pageText = f.page_text || ' Page ';
        //defines text after page selector drop-down
        this.ofText = f.of_text || ' of ';
        //css class for span containing tot nb of pages
        this.nbPgSpanCssClass = f.nb_pages_css_class || 'nbpg';
        //enables/disables paging buttons
        this.hasPagingBtns = f.paging_btns===false ? false : true;
        //stores paging buttons events
        this.pagingBtnEvents = null;
        //defines previous page button html
        this.pageSelectorType = f.page_selector_type || this.fltTypeSlc;
        //calls function before page is changed
        this.onBeforeChangePage = types.isFn(f.on_before_change_page) ?
            f.on_before_change_page : null;
        //calls function before page is changed
        this.onAfterChangePage = types.isFn(f.on_after_change_page) ?
            f.on_after_change_page : null;
        var start_row = this.refRow;
        var nrows = this.nbRows;
        //calculates page nb
        this.nbPages = Math.ceil((nrows-start_row)/this.pagingLength);
        
        var evt = tf.Evt;
        //Paging elements events
        if(!evt._Paging.next){
            var o = tf;
            evt._Paging = {// paging buttons events
                slcIndex: function(){
                    return (o.pageSelectorType===o.fltTypeSlc) ?
                        o.pagingSlc.options.selectedIndex :
                        parseInt(o.pagingSlc.value,10)-1;
                },
                nbOpts: function(){
                    return (o.pageSelectorType===o.fltTypeSlc) ?
                        parseInt(o.pagingSlc.options.length,10)-1 :
                        (o.nbPages-1);
                },
                next: function(){
                    if(o.Evt._Paging.nextEvt){
                        o.Evt._Paging.nextEvt();
                    }
                    var nextIndex =
                        o.Evt._Paging.slcIndex()<o.Evt._Paging.nbOpts() ?
                        o.Evt._Paging.slcIndex()+1 : 0;
                    o.ChangePage(nextIndex);
                },
                prev: function(){
                    if(o.Evt._Paging.prevEvt){
                        o.Evt._Paging.prevEvt();
                    }
                    var prevIndex = o.Evt._Paging.slcIndex()>0 ?
                        o.Evt._Paging.slcIndex()-1 : o.Evt._Paging.nbOpts();
                    o.ChangePage(prevIndex);
                },
                last: function(){
                    if(o.Evt._Paging.lastEvt){
                        o.Evt._Paging.lastEvt();
                    }
                    o.ChangePage(o.Evt._Paging.nbOpts());
                },
                first: function(){
                    if(o.Evt._Paging.firstEvt){
                        o.Evt._Paging.firstEvt();
                    }
                    o.ChangePage(0);
                },
                _detectKey: function(e){
                    var evt = e || global.event;
                    if(evt){
                        var key = o.Evt.getKeyCode(e);
                        if(key===13){
                            if(o.sorted){
                                o.Filter();
                                o.ChangePage(o.Evt._Paging.slcIndex());
                            } else{
                                o.ChangePage();
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
    }
    
    buildUI(){
        
        var slcPages;
        var tf = this.tf;
        var evt = tf.Evt;

        // Paging drop-down list selector
        if(this.pageSelectorType === tf.fltTypeSlc){
            slcPages = dom.create(
                tf.fltTypeSlc, ['id', tf.prfxSlcPages+tf.id]);
            slcPages.className = this.pgSlcCssClass;
            slcPages.onchange = evt._OnSlcPagesChange;
        }

        // Paging input selector
        if(this.pageSelectorType === tf.fltTypeInp){
            slcPages = dom.create(
                tf.fltTypeInp,
                ['id', tf.prfxSlcPages+tf.id],
                ['value', tf.currentPageNb]
            );
            slcPages.className = this.pgInpCssClass;
            slcPages.onkeypress = evt._Paging._detectKey;
        }

        // btns containers
        var btnNextSpan = dom.create(
            'span',['id',this.prfxBtnNextSpan+tf.id]);
        var btnPrevSpan = dom.create(
            'span',['id',this.prfxBtnPrevSpan+tf.id]);
        var btnLastSpan = dom.create(
            'span',['id',this.prfxBtnLastSpan+tf.id]);
        var btnFirstSpan = dom.create(
            'span',['id',this.prfxBtnFirstSpan+tf.id]);

        if(this.hasPagingBtns){
            // Next button
            if(!this.btnNextPageHtml){
                var btn_next = dom.create(
                    tf.fltTypeInp,['id',tf.prfxBtnNext+tf.id],
                    ['type','button'],
                    ['value',this.btnNextPageText],
                    ['title','Next']
                );
                btn_next.className = this.btnPageCssClass;
                btn_next.onclick = evt._Paging.next;
                btnNextSpan.appendChild(btn_next);
            } else {
                btnNextSpan.innerHTML = this.btnNextPageHtml;
                btnNextSpan.onclick = evt._Paging.next;
            }
            // Previous button
            if(!this.btnPrevPageHtml){
                var btn_prev = dom.create(
                    tf.fltTypeInp,
                    ['id',tf.prfxBtnPrev+tf.id],
                    ['type','button'],
                    ['value',this.btnPrevPageText],
                    ['title','Previous']
                );
                btn_prev.className = this.btnPageCssClass;
                btn_prev.onclick = evt._Paging.prev;
                btnPrevSpan.appendChild(btn_prev);
            } else {
                btnPrevSpan.innerHTML = this.btnPrevPageHtml;
                btnPrevSpan.onclick = evt._Paging.prev;
            }
            // Last button
            if(!this.btnLastPageHtml){
                var btn_last = dom.create(
                    tf.fltTypeInp,
                    ['id',tf.prfxBtnLast+tf.id],
                    ['type','button'],
                    ['value',this.btnLastPageText],
                    ['title','Last']
                );
                btn_last.className = this.btnPageCssClass;
                btn_last.onclick = evt._Paging.last;
                btnLastSpan.appendChild(btn_last);
            } else {
                btnLastSpan.innerHTML = this.btnLastPageHtml;
                btnLastSpan.onclick = evt._Paging.last;
            }
            // First button
            if(!this.btnFirstPageHtml){
                var btn_first = dom.create(
                    tf.fltTypeInp,
                    ['id',tf.prfxBtnFirst+tf.id],
                    ['type','button'],
                    ['value',this.btnFirstPageText],
                    ['title','First']
                );
                btn_first.className = this.btnPageCssClass;
                btn_first.onclick = evt._Paging.first;
                btnFirstSpan.appendChild(btn_first);
            } else {
                btnFirstSpan.innerHTML = this.btnFirstPageHtml;
                btnFirstSpan.onclick = evt._Paging.first;
            }
        }

        // paging elements (buttons+drop-down list) are added to defined element
        if(!this.pagingTgtId){
            tf.SetTopDiv();
        }
        var targetEl = !this.pagingTgtId ? tf.mDiv : dom.id(this.pagingTgtId);

        /***
        if paging previously removed this prevents IE memory leak with
        removeChild used in RemovePaging method. For more info refer to
        http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=2840253&SiteID=1
        ***/
        if (targetEl.innerHTML!==''){
            targetEl.innerHTML = '';
        }
        /*** ***/

        targetEl.appendChild(btnFirstSpan);
        targetEl.appendChild(btnPrevSpan);

        var pgBeforeSpan = dom.create(
            'span',['id', tf.prfxPgBeforeSpan+tf.id] );
        pgBeforeSpan.appendChild( dom.text(this.pageText) );
        pgBeforeSpan.className = this.nbPgSpanCssClass;
        targetEl.appendChild(pgBeforeSpan);
        targetEl.appendChild(slcPages);
        var pgAfterSpan = dom.create(
            'span',['id', tf.prfxPgAfterSpan+tf.id]);
        pgAfterSpan.appendChild( dom.text(this.ofText) );
        pgAfterSpan.className = this.nbPgSpanCssClass;
        targetEl.appendChild(pgAfterSpan);
        var pgspan = dom.create( 'span',['id', tf.prfxPgSpan+tf.id] );
        pgspan.className = this.nbPgSpanCssClass;
        pgspan.appendChild( dom.text(' '+this.nbPages+' ') );
        targetEl.appendChild(pgspan);
        targetEl.appendChild(btnNextSpan);
        targetEl.appendChild(btnLastSpan);
        this.pagingSlc = dom.id(tf.prfxSlcPages+tf.id);
        
        /*====================================================
            - onchange event for paging select
        =====================================================*/
        if(!evt._OnSlcPagesChange){
           evt._OnSlcPagesChange = function(){
                if(evt._Paging._OnSlcPagesChangeEvt){
                    evt._Paging._OnSlcPagesChangeEvt();
                }
                tf.ChangePage();
                this.blur();
                //ie only: blur is not enough...
                if(this.parentNode && Helpers.isIE()){
                    this.parentNode.focus();
                }
            };
        }
    }
}