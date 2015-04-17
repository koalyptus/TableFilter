import {Dom} from '../../dom';
import {Types} from '../../types';
import {Event} from '../../event';

export class ColsVisibility{

    /**
     * Columns Visibility extension
     * @param {Object} tf TableFilter instance
     */
    constructor(tf, ext){
        // Configuration object
        var f = tf.config();

        this.colsVisibility = f.cols_visibility;

        this.colVisExtLoaded = false;
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
        this.btnColVisText = f.btn_colvis_text || 'Display columns&#9660;';
            //defines show/hide cols button innerHtml
        this.btnColVisHtml = f.btn_colvis_html || null;
        //defines css class for show/hide cols button
        this.btnColVisCssClass = f.btn_colvis_css_class || 'colVis';
        //defines close link text
        this.btnColVisCloseText = f.btn_colvis_close_text || 'Close';
        //defines close button innerHtml
        this.btnColVisCloseHtml = f.btn_colvis_close_html || null;
        //defines css class for close button
        this.btnColVisCloseCssClass =
            f.btn_colvis_close_css_class || this.btnColVisCssClass;

        this.colVisExtPath = ext.path || 'TFExt_ColsVisibility/';
        this.colVisStylesheet = 'TFExt_ColsVisibility.css';
        //span containing show/hide cols button
        this.prfxColVisSpan = 'colVis_';
        //defines css class span containing show/hide cols
        this.colVisSpanCss =  f.colvis_span_css_class || 'colVisSpan';
        this.prfxColVisCont = 'colVisCont_';
        //defines css class div containing show/hide cols
        this.colVisContCss = f.colvis_cont_css_class || 'colVisCont';
        //defines css class for cols list (ul)
        this.colVisListCss = f.colvis_list_css_class ||'cols_checklist';
        //defines css class for list item (li)
        this.colVisListItemCssClass = f.checklist_item_css_class ||
            'cols_checklist_item';
        //defines css class for selected list item (li)
        this.colVisListSlcItemCssClass =
            f.checklist_selected_item_css_class || 'cols_checklist_slc_item';
        //text preceding columns list
        this.colVisText = f.colvis_text || 'Hide columns: ';
        this.colVisAtStart = f.colvis_at_start || null;
        this.colVisEnableHover = Boolean(f.colvis_enable_hover) || false;
        //enables select all option
        this.colVisEnableTickAll = Boolean(f.colvis_enable_tick_all) || false;
        //text preceding columns list
        this.colVisTickAllText = f.colvis_tick_all_text || 'Select all:';
        this.colVisIsOpen = false;
        //array containing hidden columns indexes
        this.colVisHiddenCols = [];
        this.tblHasColTag = (Dom.tag(tf.tbl,'col').length > 0);

        //callback invoked just after cols manager is loaded
        this.onColsManagerLoaded = Types.isFn(f.on_cols_manager_loaded) ?
            f.on_cols_manager_loaded : null;
        //calls function before cols manager is opened
        this.onBeforeOpenColsManager =
            Types.isFn(f.on_before_open_cols_manager) ?
            f.on_before_open_cols_manager : null;
        //calls function after cols manager is opened
        this.onAfterOpenColsManager = Types.isFn(f.on_after_open_cols_manager) ?
            f.on_after_open_cols_manager : null;
        //calls function before cols manager is closed
        this.onBeforeCloseColsManager =
            Types.isFn(f.on_before_close_cols_manager) ?
            f.on_before_close_cols_manager : null;
        //calls function after cols manager is closed
        this.onAfterCloseColsManager =
            Types.isFn(f.on_after_close_cols_manager) ?
            f.on_after_close_cols_manager : null;

        //calls function before col is hidden
        this.onBeforeColIsHidden = Types.isFn(f.on_before_col_is_hidden) ?
            f.on_before_col_is_hidden : null;
        //calls function after col is hidden
        this.onAfterColIsHidden = Types.isFn(f.on_after_col_is_hidden) ?
            f.on_after_col_is_hidden : null;
        //calls function before col is displayed
        this.onBeforeColIsDisplayed = Types.isFn(f.on_before_col_is_displayed) ?
            f.on_before_col_is_displayed : null;
        //calls function after col is displayed
        this.onAfterColIsDisplayed = Types.isFn(f.on_after_col_is_displayed) ?
            f.on_after_col_is_displayed : null;

        //Grid layout compatibility
        if(tf.gridLayout){
            this.colVisHeadersTbl = tf.headTbl; //headers table
            this.colVisHeadersIndex = 0; //headers index
            this.onAfterColIsDisplayed = function(){};
            this.onAfterColIsHidden = function(){};
        }

        //Extension event definition
        //event name for TF event manager
        tf.Evt.name.colsvisibility = 'ShowColsVisibility';
        //event status message
        tf.msgShowColsVisibility = 'Show/Hide columns';
        tf.Evt._ShowColsVisibility = function(){ o.ShowColsVisibility(); };
        //event name for TF event manager
        tf.Evt.name.checkitem = 'CheckItem';
        //event status message
        tf.msgCheckItem = 'Showing/hiding columns';
        tf.Evt._CheckItem = function(li){ o.CheckItem(li); };

        //Loads extension stylesheet
        tf.includeFile(
            ext.name+'Style',
            this.colVisExtPath + this.colVisStylesheet,
            null,
            'link'
        );

        this.tf = tf;

        //Sets button
        // if(this.colVisManager) o.SetShowHideColsBtn();
        this.init();
        this.colVisExtLoaded = true;
    }

    toggle(evt){

    }

    init(){
        if(this.colVisManager){
            this.buildBtn();
        }
    }

    buildBtn(){
        var tf = this.tf;
        // if(!tf.hasGrid && !tf.isFirstLoad){
        //     return;
        // }
        if(this.btnColVisEl){
            return;
        }
        var colVisSpan = Dom.createElm('span',
            ['id', this.prfxColVisSpan+tf.id]);
        colVisSpan.className = this.colVisSpanCss;

        //Container element (rdiv or custom element)
        if(!this.btnColVisTgtId){
            this.SetTopDiv();
        }
        var targetEl = !this.btnColVisTgtId ?
            tf.rDiv : Dom.id(this.btnColVisTgtId);

        if(this.btnColVisTgtId){
            targetEl.firstChild.parentNode.insertBefore(
                colVisSpan, targetEl.firstChild);
        } else {
            targetEl.appendChild(colVisSpan);
        }

        if(!this.btnColVisHtml){
            var btn = Dom.createElm('a', ['href','javascript:;']);
            btn.className = this.btnColVisCssClass;
            btn.title = this.colVisExtDesc;

            btn.innerHTML = this.btnColVisText;
            colVisSpan.appendChild(btn);
            if(!this.colVisEnableHover){
                // btn.onclick = this.Evt._ShowColsVisibility;
                Event.add(btn, 'click', (evt)=> { this.toggle(evt); });
            } else {
                // var o = this;
                // btn.onmouseover = this.Evt._ShowColsVisibility;
                Event.add(btn, 'mouseover', (evt)=> { this.toggle(evt); });
            }
        } else { //Custom html
            colVisSpan.innerHTML = this.btnColVisHtml;
            var colVisEl = colVisSpan.firstChild;
            if(!this.colVisEnableHover){
                // colVisEl.onclick = this.Evt._ShowColsVisibility;
                Event.add(colVisEl,
                    'click', (evt)=> { this.toggle(evt); });
            } else {
                // colVisEl.onmouseover = this.Evt._ShowColsVisibility;
                Event.add(colVisEl,
                    'mouseover', (evt)=> { this.toggle(evt); });
            }
        }

        this.colVisSpanEl = colVisSpan;
        this.btnColVisEl = this.colVisSpanEl.firstChild;

        // this.SetColsVisibilityManager();
        this.setManager();

        if(this.onColsManagerLoaded){
            this.onColsManagerLoaded.call(null, this);
        }
    }

    setManager(){
        var tf = this.tf;
        // if(!this.hasGrid && !this.isFirstLoad) return;

        var container = !this.colVisContElTgtId ?
            Dom.createElm('div', ['id', this.prfxColVisCont+tf.id]) :
            Dom.id(this.colVisContElTgtId);
        container.className = this.colVisContCss;

        //Extension description
        var extNameLabel = Dom.createElm('p');
        extNameLabel.innerHTML = this.colVisText;
        container.appendChild(extNameLabel);

        //Headers list
        var ul = Dom.createElm('ul' ,['id', 'ul'+this.colVisExtName+'_'+tf.id]);
        ul.className = this.colVisListCss;

        var tbl = this.colVisHeadersTbl ? this.colVisHeadersTbl : tf.tbl;
        var headerIndex = (o.colVisHeadersTbl)
                            ? o.colVisHeadersIndex : o.GetHeadersRowIndex();
        var headerRow = tbl.rows[headerIndex];

        //Tick all option
        if(o.showHideEnableTickAll){
            var li = tf_CreateCheckItem('col__'+o.id, o.showHideTickAllText, o.showHideTickAllText);
            tf_AddClass(li,this.colVisListItemCssClass);
            ul.appendChild(li);
            var isAllTicked = false;
            li.check.onclick = function(){
                for(var h=0; h<headerRow.cells.length; h++)
                {
                    var itm = tf_Id('col_'+h+'_'+o.id);
                    if(!isAllTicked && itm.checked) itm.checked = false;
                    if(isAllTicked && !itm.checked) itm.checked = true;
                    if(itm) itm.click();
                }
                isAllTicked = (isAllTicked ? false : true);
            };
            if(tf_isIE)
            {//IE: label looses check capability
                li.label.onclick = function(){ this.firstChild.click(); };
            }
        }

        for(var i=0; i<headerRow.cells.length; i++)
        {
            var cell = headerRow.cells[i];
            var cellText = (o.colVisHeadersText && o.colVisHeadersText[i])
                            ? o.colVisHeadersText[i] : tf_GetHeaderText(cell);
            var li = tf_CreateCheckItem('col_'+i+'_'+o.id, cellText, cellText);
            tf_AddClass(li,this.colVisListItemCssClass);
            if(!o.colVisTickToHide) tf_AddClass(li,this.colVisListSlcItemCssClass);
            ul.appendChild(li);
            if(!o.colVisTickToHide) li.check.checked = true;
            li.check.onclick = function(){ o.Evt._CheckItem(this.parentNode); };
            if(tf_isIE)
            {//IE: label looses check capability
                li.label.onclick = function(){ this.firstChild.click(); };
            }
        }

        //separator
        var p = tf_CreateElm('p',['align','center']);

        //Close link
        if(this.btnColVisCloseHtml==null)
        {
            var btn = tf_CreateElm( 'a', ['href','javascript:;'] );
            btn.className = this.btnColVisCloseCssClass;
            btn.innerHTML = this.btnColVisCloseText;
            btn.onclick = this.Evt._ShowColsVisibility;
            p.appendChild(btn);
        } else {
            p.innerHTML = this.btnColVisCloseHtml;
            var btn = p.firstChild;
            btn.onclick = this.Evt._ShowColsVisibility;
        }

        container.appendChild(ul);
        container.appendChild(p);

        //this.colVisSpanEl.appendChild(container);
        this.btnColVisEl.parentNode.insertBefore(container, this.btnColVisEl);
        this.colVisContEl = container;

        //IE6 only: options are not checked if colVisTickToHide=false
        if(tf_isIE && !o.colVisTickToHide)
            for(var i=0; i<headerRow.cells.length; i++)
                tf_Id('col_'+i+'_'+o.id).checked = true;

        if(this.colVisAtStart != null)
        {
            var a = this.colVisAtStart;
            for(var k=0; k<a.length; k++)
            {
                var itm = tf_Id('col_'+a[k]+'_'+o.id);
                if(itm) itm.click();
            }
        }
    }

}
