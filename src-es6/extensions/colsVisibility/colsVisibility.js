
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
        this.showHideColsTickToHide = Boolean(
            f.showHide_cols_tick_to_hide || true);
        //enables/disables cols manager generation
        this.showHideColsManager = Boolean(f.showHide_cols_manager || true);
        //only if external headers
        this.showHideColsHeadersTbl = f.showHide_cols_headers_table || null;
        //only if external headers
        this.showHideColsHeadersIndex = f.showHide_cols_headers_index || 1;
        //id of container element
        this.showHideColsContElTgtId =
            f.showHide_cols_container_target_id || null;
        //alternative headers text
        this.showHideColsHeadersText = f.showHide_cols_headers_text || null;
        //id of button container element
        this.btnShowHideColsTgtId = f.btn_showHide_cols_target_id || null;
        //defines show/hide cols text
        this.btnShowHideColsText = f.btn_showHide_cols_text ||
            'Display columns&#9660;';
            //defines show/hide cols button innerHtml
        this.btnShowHideColsHtml = f.btn_showHide_cols_html || null;
        //defines css class for show/hide cols button
        this.btnShowHideColsCssClass = f.btn_showHide_cols_css_class ||
            'showHideCols';
        //defines close link text
        this.btnShowHideColsCloseText = f.btn_showHide_cols_close_text ||
            'Close';
        //defines close button innerHtml
        this.btnShowHideColsCloseHtml = f.btn_showHide_cols_close_html || null;
        //defines css class for close button
        this.btnShowHideColsCloseCssClass =
            f.btn_showHide_cols_close_css_class || this.btnShowHideColsCssClass;
    }
}
