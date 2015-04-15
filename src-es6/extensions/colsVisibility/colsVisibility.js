import {Dom} from 'dom';
import {Types} from 'types';

export class ColsVisibility{

    /**
     * Columns Visibility extension
     * @param {Object} tf TableFilter instance
     */
    constructor(tf, ext){
        // Configuration object
        var f = tf.config();

        this.colsVisibility = f.cols_visibility;

        this.showHideColsExtLoaded = false;
        this.showHideColsExtName = ext.name;
        this.showHideColsExtDesc = ext.description;

        //show/hide cols span element
        this.showHideColsSpanEl = null;
        //show/hide cols button element
        this.btnShowHideColsEl = null;
        //show/hide cols container div element
        this.showHideColsContEl = null;

        //tick to hide or show column
        this.showHideColsTickToHide = Boolean(f.colvis_tick_to_hide || true);
        //enables/disables cols manager generation
        this.showHideColsManager = Boolean(f.colvis_manager || true);
        //only if external headers
        this.showHideColsHeadersTbl = f.colvis_headers_table || null;
        //only if external headers
        this.showHideColsHeadersIndex = f.colvis_headers_index || 1;
        //id of container element
        this.showHideColsContElTgtId = f.colvis_container_target_id || null;
        //alternative headers text
        this.showHideColsHeadersText = f.colvis_headers_text || null;
        //id of button container element
        this.btnShowHideColsTgtId = f.btn_colvis_target_id || null;
        //defines show/hide cols text
        this.btnShowHideColsText = f.btn_colvis_text ||
            'Display columns&#9660;';
            //defines show/hide cols button innerHtml
        this.btnShowHideColsHtml = f.btn_colvis_html || null;
        //defines css class for show/hide cols button
        this.btnShowHideColsCssClass = f.btn_colvis_css_class || 'showHideCols';
        //defines close link text
        this.btnShowHideColsCloseText = f.btn_colvis_close_text || 'Close';
        //defines close button innerHtml
        this.btnShowHideColsCloseHtml = f.btn_colvis_close_html || null;
        //defines css class for close button
        this.btnShowHideColsCloseCssClass =
            f.btn_colvis_close_css_class || this.btnShowHideColsCssClass;

        this.showHideColsExtPath = ext.path || 'TFExt_ColsVisibility/';
        this.showHideColsStylesheet = 'TFExt_ColsVisibility.css';
        //span containing show/hide cols button
        this.prfxShowHideColsSpan = 'showHideCols_';
        //defines css class span containing show/hide cols
        this.showHideColsSpanCss =  f.colvis_span_css_class ||
            'showHideColsSpan';
        this.prfxShowHideColsCont = 'showHideColsCont_';
        //defines css class div containing show/hide cols
        this.showHideColsContCss = f.colvis_cont_css_class ||
            'showHideColsCont';
        //defines css class for cols list (ul)
        this.showHideColsListCss = f.colvis_list_css_class ||'cols_checklist';
        //defines css class for list item (li)
        this.showHideColsListItemCssClass = f.checklist_item_css_class ||
            'cols_checklist_item';
        //defines css class for selected list item (li)
        this.showHideColsListSlcItemCssClass =
            f.checklist_selected_item_css_class || 'cols_checklist_slc_item';
        //text preceding columns list
        this.showHideColsText = f.colvis_text || 'Hide columns: ';
        this.showHideColsAtStart = f.colvis_at_start || null;
        this.showHideColsEnableHover = Boolean(f.colvis_enable_hover) || false;
        //enables select all option
        this.showHideEnableTickAll = Boolean(f.colvis_enable_tick_all) ||
            false;
        //text preceding columns list
        this.showHideTickAllText = f.colvis_tick_all_text || 'Select all:';
        this.showHideColsIsOpen = false;
        //array containing hidden columns indexes
        this.showHideHiddenCols = [];
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
            this.showHideColsHeadersTbl = tf.headTbl; //headers table
            this.showHideColsHeadersIndex = 0; //headers index
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
            this.showHideColsExtPath + this.showHideColsStylesheet,
            null,
            'link'
        );

        //Sets button
        // if(this.showHideColsManager) o.SetShowHideColsBtn();
        this.init();
        this.showHideColsExtLoaded = true;
    }

    init(){

    }
}
