/* ------------------------------------------------------------------------
    - HTML Table Filter Generator v0.0.1
    - By Max Guglielmi (tablefilter.free.fr)
    - Licensed under the MIT License
---------------------------------------------------------------------------
    - Special credit to:
    Cedric Wartel, cnx.claude@free.fr, Florent Hirchy, Váry Péter,
    Anthony Maes, Nuovella Williams, Fuggerbit, Venkata Seshagiri Rao
    Raya, Piepiax, Manuel Kern, Baladhandayutham for active contribution
    and/or inspiration
------------------------------------------------------------------------ */

import Event from './event';
import Dom from './dom';
import Str from './string';
import Cookie from './cookie';
import Types from './types';
import Arr from './array';
import DateHelper from './date';
import Helpers from './helpers';

// Modules
import {Store} from './modules/store';
import {GridLayout} from './modules/gridLayout';
import {Loader} from './modules/loader';
import {HighlightKeyword} from './modules/highlightKeywords';
import {PopupFilter} from './modules/popupFilter';
import {Dropdown} from './modules/dropdown';
import {CheckList} from './modules/checkList';
import {RowsCounter} from './modules/rowsCounter';
import {StatusBar} from './modules/statusBar';
import {Paging} from './modules/paging';
import {ClearButton} from './modules/clearButton';
import {Help} from './modules/help';
import {AlternateRows} from './modules/alternateRows';
import {ColOps} from './modules/colOps';

var global = window,
    isValidDate = DateHelper.isValid,
    formatDate = DateHelper.format,
    doc = global.document;

export class TableFilter{

    /**
     * TF object constructor
     * @param {String} id Table id
     * @param {Number} row index indicating the 1st row
     * @param {Object} configuration object
     *
     * TODO: Accept a TABLE element or query selectors
     */
    constructor(id) {
        if(arguments.length === 0){ return; }

        this.id = id;
        this.version = '0.0.1';
        this.year = new Date().getFullYear();
        this.tbl = Dom.id(id);
        this.startRow = null;
        this.refRow = null;
        this.headersRow = null;
        this.cfg = {};
        this.nbFilterableRows = null;
        this.nbRows = null;
        this.nbCells = null;
        this._hasGrid = false;
        this.enableModules = false;

        if(!this.tbl || Str.lower(this.tbl.nodeName) !== 'table' ||
            this.getRowsNb() === 0){
            throw new Error(
                'Could not instantiate TableFilter class: ' +
                'HTML table not found.');
        }

        if(arguments.length > 1){
            for(let i=0; i<arguments.length; i++){
                let arg = arguments[i];
                let argtype = typeof arg;
                switch(Str.lower(argtype)){
                    case 'number':
                        this.startRow = arg;
                    break;
                    case 'object':
                        this.cfg = arg;
                    break;
                }
            }
        }

        // configuration object
        let f = this.cfg;

        //Start row et cols nb
        this.refRow = this.startRow===null ? 2 : (this.startRow+1);
        try{ this.nbCells = this.getCellsNb(this.refRow); }
        catch(e){ this.nbCells = this.getCellsNb(0); }

        //default script base path
        this.basePath = f.base_path || 'tablefilter/';
        this.extensionsPath = f.extensions_path || this.basePath+'extensions/';

        /*** filter types ***/
        this.fltTypeInp = 'input';
        this.fltTypeSlc = 'select';
        this.fltTypeMulti = 'multiple';
        this.fltTypeCheckList = 'checklist';
        this.fltTypeNone = 'none';
        this.fltCol = []; //filter type of each column

        for(let j=0; j<this.nbCells; j++){
            let cfgCol = f['col_'+j];
            let col = !cfgCol ? this.fltTypeInp : Str.lower(cfgCol);
            this.fltCol.push(col);
            this['col'+j] = col;
        }

        /*** Developer's additional methods ***/
        this.publicMethods = f.public_methods!==undefined ?
            f.public_methods : false;

        /*** filters' grid properties ***/

        //enables/disables filter grid
        this.fltGrid = f.grid===false ? false : true;

        /*** Grid layout ***/
        //enables/disables grid layout (fixed headers)
        this.gridLayout = f.grid_layout ? true : false;
        this.sourceTblHtml = null;
        if(this.gridLayout){
            //Firefox does not support outerHTML property...
            // if(this.tbl.outerHTML===undefined){ setOuterHtml(); }
            this.sourceTblHtml = this.tbl.outerHTML;
        }
        /*** ***/

        this.filtersRowIndex = f.filters_row_index || 0;
        this.headersRow = f.headers_row_index ||
            (this.filtersRowIndex===0 ? 1 : 0);

        if(this.gridLayout){
            if(this.headersRow > 1){
                this.filtersRowIndex = this.headersRow+1;
            } else {
                this.filtersRowIndex = 1;
                this.headersRow = 0;
            }
        }

        //defines tag of the cells containing filters (td/th)
        this.fltCellTag = f.filters_cell_tag!=='th' ||
            f.filters_cell_tag!=='td' ? 'td' : f.filters_cell_tag;

        //stores filters ids
        this.fltIds = [];
        //stores filters DOM elements
        this.fltElms = [];
        //stores filters values
        this.searchArgs = null;
        //stores table data
        this.tblData = [];
        //stores valid rows indexes (rows visible upon filtering)
        this.validRowsIndex = null;
        //stores filters row element
        this.fltGridEl = null;
        //is first load boolean
        this.isFirstLoad = true;
        //container div for paging elements, reset btn etc.
        this.infDiv = null;
        //div for rows counter
        this.lDiv = null;
        //div for reset button and results per page select
        this.rDiv = null;
        //div for paging elements
        this.mDiv = null;
        //table container div for fixed headers (IE only)
        this.contDiv = null;

        //defines css class for div containing paging elements, rows counter etc
        this.infDivCssClass = f.inf_div_css_class || 'inf';
        //defines css class for left div
        this.lDivCssClass = f.left_div_css_class || 'ldiv';
        //defines css class for right div
        this.rDivCssClass =  f.right_div_css_class || 'rdiv';
        //defines css class for mid div
        this.mDivCssClass = f.middle_div_css_class || 'mdiv';
        //table container div css class
        this.contDivCssClass = f.content_div_css_class || 'cont';

        /*** filters' grid appearance ***/
        //stylesheet file
        this.stylesheet = f.stylesheet || this.basePath+'tablefilter.css';
        this.stylesheetId = this.id + '_style';
        //defines css class for filters row
        this.fltsRowCssClass = f.flts_row_css_class || 'fltrow';
         //enables/disables icons (paging, reset button)
        this.enableIcons = f.enable_icons===false ? false : true;
        //enables/disbles rows alternating bg colors
        this.alternateBgs = f.alternate_rows===true ? true : false;
        //defines widths of columns
        this.hasColWidths = Types.isArray(f.col_widths);
        this.colWidths = this.hasColWidths ? f.col_widths : null;
        //enables/disables fixed headers
        this.fixedHeaders = f.fixed_headers===true ? true : false;
        //tbody height if fixed headers enabled
        this.tBodyH = !isNaN(f.tbody_height) ? f.tbody_height : 200;
        //defines css class for filters
        this.fltCssClass = f.flt_css_class || 'flt';
        //defines css class for multiple selects filters
        this.fltMultiCssClass = f.flt_multi_css_class || 'flt_multi';
        //defines css class for filters
        this.fltSmallCssClass = f.flt_small_css_class || 'flt_s';
        //defines css class for single-filter
        this.singleFltCssClass = f.single_flt_css_class || 'single_flt';
        this.isStartBgAlternate =   true;

        /*** filters' grid behaviours ***/
        //enables/disables enter key
        this.enterKey = f.enter_key===false ? false : true;
        //calls function before filtering starts
        this.onBeforeFilter = Types.isFn(f.on_before_filter) ?
            f.on_before_filter : null;
        //calls function after filtering
        this.onAfterFilter = Types.isFn(f.on_after_filter) ?
            f.on_after_filter : null;
        //enables/disables case sensitivity
        this.caseSensitive = f.case_sensitive===true ? true : false;
        //enables/disbles exact match for search
        this.exactMatch = f.exact_match===true ? true : false;
        //refreshes drop-down lists upon validation
        this.linkedFilters = f.linked_filters===true ? true : false;
        //wheter excluded options are disabled
        this.disableExcludedOptions = f.disable_excluded_options===true ?
            true : false;
        //stores active filter element
        this.activeFlt = null;
        //id of active filter
        this.activeFilterId = null;
        //enables/disbles column operation(sum,mean)
        this.hasColOperation = f.col_operation ? true : false;
        this.colOperation = null;
        //enables always visible rows
        this.hasVisibleRows = f.rows_always_visible ? true : false;
        //array containing always visible rows
        this.visibleRows = this.hasVisibleRows ? f.rows_always_visible : [];
        //defines search type: include or exclude
        this.searchType = f.search_type || 'include';
        //enables/disables external filters generation
        this.isExternalFlt = f.external_flt_grid===true ? true : false;
        //array containing ids of external elements containing filters
        this.externalFltTgtIds = f.external_flt_grid_ids || null;
        //stores filters elements if isExternalFlt is true
        this.externalFltEls = [];
        //delays any filtering process if loader true
        this.execDelay = !isNaN(f.exec_delay) ? parseInt(f.exec_delay,10) : 100;
        //calls function when filters grid loaded
        this.onFiltersLoaded = Types.isFn(f.on_filters_loaded) ?
            f.on_filters_loaded : null;
        //enables/disables single filter search
        this.singleSearchFlt = f.single_search_filter===true ? true : false;
        //calls function after row is validated
        this.onRowValidated = Types.isFn(f.on_row_validated) ?
            f.on_row_validated : null;
        //array defining columns for customCellData event
        this.customCellDataCols = f.custom_cell_data_cols ?
            f.custom_cell_data_cols : [];
        //calls custom function for retrieving cell data
        this.customCellData = Types.isFn(f.custom_cell_data) ?
            f.custom_cell_data : null;
        //input watermark text array
        this.watermark = f.watermark || '';
        this.isWatermarkArray = Types.isArray(this.watermark);
        //id of toolbar container element
        this.toolBarTgtId = f.toolbar_target_id || null;
        //enables/disables help div
        this.helpInstructions = !f.help_instructions ? false : true;
        //popup filters
        this.popUpFilters = f.popup_filters===true ? true : false;
        //active columns color
        this.markActiveColumns = f.mark_active_columns===true ? true : false;
        //defines css class for active column header
        this.activeColumnsCssClass = f.active_columns_css_class ||
            'activeHeader';
        //calls function before active column header is marked
        this.onBeforeActiveColumn = Types.isFn(f.on_before_active_column) ?
            f.on_before_active_column : null;
        //calls function after active column header is marked
        this.onAfterActiveColumn = Types.isFn(f.on_after_active_column) ?
            f.on_after_active_column : null;

        /*** select filter's customisation and behaviours ***/
        //defines 1st option text
        this.displayAllText = f.display_all_text || '';
        //enables/disables empty option in combo-box filters
        this.enableEmptyOption = f.enable_empty_option===true ? true : false;
        //defines empty option text
        this.emptyText = f.empty_text || '(Empty)';
        //enables/disables non empty option in combo-box filters
        this.enableNonEmptyOption = f.enable_non_empty_option===true ?
            true : false;
        //defines empty option text
        this.nonEmptyText = f.non_empty_text || '(Non empty)';
        //enables/disables onChange event on combo-box
        this.onSlcChange = f.on_change===false ? false : true;
        //enables/disables select options sorting
        this.sortSlc = f.sort_select===false ? false : true;
        //enables/disables ascending numeric options sorting
        this.isSortNumAsc = f.sort_num_asc===true ? true : false;
        this.sortNumAsc = this.isSortNumAsc ? f.sort_num_asc : null;
        //enables/disables descending numeric options sorting
        this.isSortNumDesc = f.sort_num_desc===true ? true : false;
        this.sortNumDesc = this.isSortNumDesc ? f.sort_num_desc : null;
        //enabled selects are populated on demand
        this.fillSlcOnDemand = f.fill_slc_on_demand===true ? true : false;
        this.hasCustomSlcOptions = Types.isObj(f.custom_slc_options) ?
            true : false;
        this.customSlcOptions = Types.isArray(f.custom_slc_options) ?
            f.custom_slc_options : null;

        /*** Filter operators ***/
        this.rgxOperator = f.regexp_operator || 'rgx:';
        this.emOperator = f.empty_operator || '[empty]';
        this.nmOperator = f.nonempty_operator || '[nonempty]';
        this.orOperator = f.or_operator || '||';
        this.anOperator = f.and_operator || '&&';
        this.grOperator = f.greater_operator || '>';
        this.lwOperator = f.lower_operator || '<';
        this.leOperator = f.lower_equal_operator || '<=';
        this.geOperator = f.greater_equal_operator || '>=';
        this.dfOperator = f.different_operator || '!';
        this.lkOperator = f.like_operator || '*';
        this.eqOperator = f.equal_operator || '=';
        this.stOperator = f.start_with_operator || '{';
        this.enOperator = f.end_with_operator || '}';
        this.curExp = f.cur_exp || '^[¥£€$]';
        this.separator = f.separator || ',';

        /*** rows counter ***/
        //show/hides rows counter
        this.rowsCounter = f.rows_counter===true ? true : false;

        /*** status bar ***/
        //show/hides status bar
        this.statusBar = f.status_bar===true ? true : false;

        /*** loader ***/
        //enables/disables loader/spinner indicator
        this.loader = f.loader===true ? true : false;

        /*** validation - reset buttons/links ***/
        //show/hides filter's validation button
        this.displayBtn = f.btn===true ? true : false;
        //defines validation button text
        this.btnText = f.btn_text || (!this.enableIcons ? 'Go' : '');
        //defines css class for validation button
        this.btnCssClass = f.btn_css_class ||
            (!this.enableIcons ? 'btnflt' : 'btnflt_icon');
        //show/hides reset link
        this.btnReset = f.btn_reset===true ? true : false;
        //defines css class for reset button
        this.btnResetCssClass = f.btn_reset_css_class || 'reset';
        //callback function before filters are cleared
        this.onBeforeReset = Types.isFn(f.on_before_reset) ?
            f.on_before_reset : null;
        //callback function after filters are cleared
        this.onAfterReset = Types.isFn(f.on_after_reset) ?
            f.on_after_reset : null;

        /*** paging ***/
        //enables/disables table paging
        this.paging = f.paging===true ? true : false;
        this.nbVisibleRows = 0; //nb visible rows
        this.nbHiddenRows = 0; //nb hidden rows

        /*** webfx sort adapter ***/
        //enables/disables default table sorting
        this.sort = f.sort===true ? true : false;
        //indicates if sort is set (used in tfAdapter.sortabletable.js)
        this.isSortEnabled = false;
        this.sortConfig = f.sort_config || {};
        this.sortConfig.name = this.sortConfig.name || 'sort';
        this.sortConfig.path = this.sortConfig.path || null;
        this.sortConfig.sortTypes = Types.isArray(this.sortConfig.sort_types) ?
            this.sortConfig.sort_types : [];
        this.sortConfig.sortCol = this.sortConfig.sort_col || null;
        this.sortConfig.asyncSort = this.sortConfig.async_sort===true ?
            true : false;
        this.sortConfig.triggerIds =
            Types.isArray(this.sortConfig.sort_trigger_ids) ?
            this.sortConfig.sort_trigger_ids : [];

        /*** ezEditTable extension ***/
        //enables/disables table selection feature
        // this.selectable = f.selectable===true ? true : false;
        //enables/disables editable table feature
        // this.editable = f.editable===true ? true : false;

        /*** onkeyup event ***/
        //enables/disables onkeyup event, table is filtered when user stops
        //typing
        this.onKeyUp = f.on_keyup===true ? true : false;
        //onkeyup delay timer (msecs)
        this.onKeyUpDelay = !isNaN(f.on_keyup_delay) ? f.on_keyup_delay : 900;
        this.isUserTyping = null; //typing indicator
        this.onKeyUpTimer = undefined;

        /*** keyword highlighting ***/
        //enables/disables keyword highlighting
        this.highlightKeywords = f.highlight_keywords===true ? true : false;

        /*** data types ***/
        //defines default date type (european DMY)
        this.defaultDateType = f.default_date_type || 'DMY';
        //defines default thousands separator
        //US = ',' EU = '.'
        this.thousandsSeparator = f.thousands_separator || ',';
        //defines default decimal separator
        //US & javascript = '.' EU = ','
        this.decimalSeparator = f.decimal_separator || '.';
        //enables number format per column
        this.hasColNbFormat = f.col_number_format===true ? true : false;
        //array containing columns nb formats
        this.colNbFormat = Types.isArray(this.hasColNbFormat) ?
            f.col_number_format : null;
        //enables date type per column
        this.hasColDateType = f.col_date_type===true ? true : false;
        //array containing columns date type
        this.colDateType = Types.isArray(this.hasColDateType) ?
            f.col_date_type : null;

        /*** status messages ***/
        //filtering
        this.msgFilter = f.msg_filter || 'Filtering data...';
        //populating drop-downs
        this.msgPopulate = f.msg_populate || 'Populating filter...';
        //populating drop-downs
        this.msgPopulateCheckList = f.msg_populate_checklist ||
            'Populating list...';
        //changing paging page
        this.msgChangePage = f.msg_change_page || 'Collecting paging data...';
        //clearing filters
        this.msgClear = f.msg_clear || 'Clearing filters...';
        //changing nb results/page
        this.msgChangeResults = f.msg_change_results ||
            'Changing results per page...';
        //re-setting grid values
        this.msgResetValues = f.msg_reset_grid_values ||
            'Re-setting filters values...';
        //re-setting page
        this.msgResetPage = f.msg_reset_page || 'Re-setting page...';
        //re-setting page length
        this.msgResetPageLength = f.msg_reset_page_length ||
            'Re-setting page length...';
        //table sorting
        this.msgSort = f.msg_sort || 'Sorting data...';
        //extensions loading
        this.msgLoadExtensions = f.msg_load_extensions ||
            'Loading extensions...';
        //themes loading
        this.msgLoadThemes = f.msg_load_themes || 'Loading theme(s)...';

        /*** ids prefixes ***/
        //css class name added to table
        this.prfxTf = 'TF';
        //filters (inputs - selects)
        this.prfxFlt = 'flt';
        //validation button
        this.prfxValButton = 'btn';
        //container div for paging elements, rows counter etc.
        this.prfxInfDiv = 'inf_';
        //left div
        this.prfxLDiv = 'ldiv_';
        //right div
        this.prfxRDiv = 'rdiv_';
        //middle div
        this.prfxMDiv = 'mdiv_';
        //filter values cookie
        this.prfxCookieFltsValues = 'tf_flts_';
        //page nb cookie
        this.prfxCookiePageNb = 'tf_pgnb_';
        //page length cookie
        this.prfxCookiePageLen = 'tf_pglen_';

        /*** cookies ***/
        this.hasStoredValues = false;
        //remembers filters values on page load
        this.rememberGridValues = f.remember_grid_values===true ?
            true : false;
        //cookie storing filter values
        this.fltsValuesCookie = this.prfxCookieFltsValues + this.id;
        //remembers page nb on page load
        this.rememberPageNb = this.paging && f.remember_page_number ?
            true : false;
        //cookie storing page nb
        this.pgNbCookie = this.prfxCookiePageNb + this.id;
        //remembers page length on page load
        this.rememberPageLen = this.paging && f.remember_page_length ?
            true : false;
        //cookie storing page length
        this.pgLenCookie = this.prfxCookiePageLen + this.id;

        /*** extensions ***/
        //imports external script
        this.extensions = f.extensions;
        this.hasExtensions = Types.isArray(this.extensions);

        /*** themes ***/
        this.enableDefaultTheme = f.enable_default_theme===true ?
            true : false;
        //imports themes
        this.hasThemes = (f.enable_default_theme || Types.isArray(f.themes));
        this.themes = f.themes || [];
        //themes path
        this.themesPath = f.themes_path || this.basePath + 'themes/';

        // Features registry
        this.Cpt = {
            loader: null,
            alternateRows: null,
            colOps: null,
            rowsCounter: null,
            gridLayout: null,
            store: null,
            highlightKeywords: null,
            paging: null,
            checkList: null,
            dropdown: null,
            popupFilter: null,
            clearButton: null,
            help: null,
            statusBar: null
        };

        // Extensions registry
        this.ExtRegistry = {
            sort: null
        };

        /*** TF events ***/
        let o = this;
        this.Evt = {
            name: {
                filter: 'Filter',
                dropdown: 'dropdown',
                checklist: 'checkList',
                changepage: 'changePage',
                clear: 'Clear',
                changeresultsperpage: 'changeResults',
                resetvalues: 'ResetValues',
                resetpage: 'resetPage',
                resetpagelength: 'resetPageLength',
                sort: 'Sort',
                loadextensions: 'LoadExtensions',
                loadthemes: 'loadThemes'
            },

            /*====================================================
                - Detects <enter> key for a given element
            =====================================================*/
            detectKey(e) {
                if(!o.enterKey){ return; }
                let _ev = e || global.event;
                if(_ev){
                    let key = Event.keyCode(_ev);
                    if(key===13){
                        o._filter();
                        Event.cancel(_ev);
                        Event.stop(_ev);
                    } else {
                        o.isUserTyping = true;
                        global.clearInterval(o.onKeyUpTimer);
                        o.onKeyUpTimer = undefined;
                    }
                }
            },
            /*====================================================
                - onkeyup event for text filters
            =====================================================*/
            onKeyUp(e) {
                if(!o.onKeyUp){
                    return;
                }
                let _ev = e || global.event;
                let key = Event.keyCode(_ev);
                o.isUserTyping = false;

                function filter() {
                    global.clearInterval(o.onKeyUpTimer);
                    o.onKeyUpTimer = undefined;
                    if(!o.isUserTyping){
                        o.filter();
                        o.isUserTyping = null;
                    }
                }

                if(key!==13 && key!==9 && key!==27 && key!==38 && key!==40) {
                    if(o.onKeyUpTimer===undefined){
                        o.onKeyUpTimer = global.setInterval(
                            filter, o.onKeyUpDelay);
                    }
                } else {
                    global.clearInterval(o.onKeyUpTimer);
                    o.onKeyUpTimer = undefined;
                }
            },
            /*====================================================
                - onkeydown event for input filters
            =====================================================*/
            onKeyDown() {
                if(!o.onKeyUp) { return; }
                o.isUserTyping = true;
            },
            /*====================================================
                - onblur event for input filters
            =====================================================*/
            onInpBlur() {
                if(o.onKeyUp){
                    o.isUserTyping = false;
                    global.clearInterval(o.onKeyUpTimer);
                }
                // if(o.ezEditTable){
                //     if(o.editable){
                //         o.ezEditTable.Editable.Set();
                //     }
                //     if(o.selectable){
                //         o.ezEditTable.Selection.Set();
                //     }
                // }
            },
            /*====================================================
                - onfocus event for input filters
            =====================================================*/
            onInpFocus(e) {
                let _ev = e || global.event;
                o.activeFilterId = this.getAttribute('id');
                o.activeFlt = Dom.id(o.activeFilterId);
                if(o.popUpFilters){
                    Event.cancel(_ev);
                    Event.stop(_ev);
                }
                // if(o.ezEditTable){
                //     if(o.editable){
                //         o.ezEditTable.Editable.Remove();
                //     }
                //     if(o.selectable){
                //         o.ezEditTable.Selection.Remove();
                //     }
                // }
            },
            /*====================================================
                - onfocus event for select filters
            =====================================================*/
            onSlcFocus(e) {
                let _ev = e || global.event;
                o.activeFilterId = this.getAttribute('id');
                o.activeFlt = Dom.id(o.activeFilterId);
                // select is populated when element has focus
                if(o.fillSlcOnDemand && this.getAttribute('filled') === '0'){
                    let ct = this.getAttribute('ct');
                    o.Cpt.dropdown._build(ct);
                }
                if(o.popUpFilters){
                    Event.cancel(_ev);
                    Event.stop(_ev);
                }
            },
            /*====================================================
                - onchange event for select filters
            =====================================================*/
            onSlcChange(e) {
                if(!o.activeFlt){ return; }
                // let colIndex = o.activeFlt.getAttribute('colIndex');
                //Checks filter is a checklist and caller is not null
                // if(o.activeFlt && colIndex &&
                //     o['col'+colIndex]===o.fltTypeCheckList &&
                //     !o.Evt.onSlcChange.caller){ return; }
                let _ev = e || global.event;
                if(o.popUpFilters){ Event.stop(_ev); }
                if(o.onSlcChange){ o.filter(); }
            },
            /*====================================================
                - onblur event for select filters
            =====================================================*/
            // _OnSlcBlur: function(e) {},
            /*====================================================
                - onclick event for checklist filters
            =====================================================*/
            onCheckListClick() {
                if(o.fillSlcOnDemand && this.getAttribute('filled') === '0'){
                    let ct = this.getAttribute('ct');
                    o.Cpt.checkList._build(ct);
                    o.Cpt.checkList.checkListDiv[ct].onclick = null;
                    o.Cpt.checkList.checkListDiv[ct].title = '';
                }
            },
            /*====================================================
                - onclick event for checklist filter container
            =====================================================*/
            onCheckListFocus() {
                o.activeFilterId = this.firstChild.getAttribute('id');
                o.activeFlt = Dom.id(o.activeFilterId);
            },
            /*====================================================
                - onclick event for validation button
                (btn property)
            =====================================================*/
            onBtnClick() {
                o.filter();
            }
            // ,
            // _OnSlcPagesChangeEvt: null, //used by sort adapter
            /*====================================================
                - onclick event slc parent node (enables filters)
                IE only
            =====================================================*/
            // _EnableSlc: function() {
            //     this.firstChild.disabled = false;
            //     this.firstChild.focus();
            //     this.onclick = null;
            // },

            // _Paging: { //used by sort adapter
            //     nextEvt: null,
            //     prevEvt: null,
            //     lastEvt: null,
            //     firstEvt: null
            // }
        };
    }

    /**
     * Initialise filtering grid bar behaviours and layout
     *
     * TODO: decompose in smaller methods
     */
    init(){
        if(this._hasGrid){
            return;
        }
        if(!this.tbl){
            this.tbl = Dom.id(this.id);
        }
        if(this.gridLayout){
            this.refRow = this.startRow===null ? 0 : this.startRow;
        }
        if(this.popUpFilters &&
            ((this.filtersRowIndex === 0 && this.headersRow === 1) ||
            this.gridLayout)){
            this.headersRow = 0;
        }
        let f = this.cfg,
            n = this.singleSearchFlt ? 1 : this.nbCells,
            inpclass;

        // if(global['tf_'+this.id] === undefined){
        //     global['tf_'+this.id] = this;
        // }

        //loads stylesheet if not imported
        this.import(this.stylesheetId, this.stylesheet, null, 'link');

        //loads theme
        if(this.hasThemes){ this._loadThemes(); }

        if(this.rememberGridValues || this.rememberPageNb ||
            this.rememberPageLen){
            //let Store = require('modules/store').Store;
            // import {Store} from 'modules/store';
            this.Cpt.store = new Store(this);
        }

        if(this.gridLayout){
            // let GridLayout = require('modules/gridLayout').GridLayout;
            // import {GridLayout} from 'modules/gridLayout';
            this.Cpt.gridLayout = new GridLayout(this);
            this.Cpt.gridLayout.init();
        }

        if(this.loader){
            if(!this.Cpt.loader){
                // let Loader = require('modules/loader').Loader;
                // import {Loader} from 'modules/loader';
                this.Cpt.loader = new Loader(this);
            }
        }

        if(this.highlightKeywords){
            // let Highlight =
            //     require('modules/highlightKeywords').HighlightKeyword;
            // import {HighlightKeyword} from 'modules/highlightKeywords';
            this.Cpt.highlightKeyword = new HighlightKeyword(this);
        }

        if(this.popUpFilters){
            if(!this.Cpt.popupFilter){
                // let PopupFilter = require('modules/popupFilter').PopupFilter;
                // import {PopupFilter} from 'modules/popupFilter';
                this.Cpt.popupFilter = new PopupFilter(this);
            }
            this.Cpt.popupFilter.init();
        }

        //filters grid is not generated
        if(!this.fltGrid){
            this.refRow = this.refRow-1;
            if(this.gridLayout){
                this.refRow = 0;
            }
            this.nbFilterableRows = this.getRowsNb();
            this.nbVisibleRows = this.nbFilterableRows;
            this.nbRows = this.nbFilterableRows + this.refRow;
        } else {
            if(this.isFirstLoad){
                let fltrow;
                if(!this.gridLayout){
                    let thead = Dom.tag(this.tbl, 'thead');
                    if(thead.length > 0){
                        fltrow = thead[0].insertRow(this.filtersRowIndex);
                    } else {
                        fltrow = this.tbl.insertRow(this.filtersRowIndex);
                    }

                    if(this.headersRow > 1 &&
                        this.filtersRowIndex <= this.headersRow &&
                        !this.popUpFilters){
                        this.headersRow++;
                    }
                    if(this.popUpFilters){
                        this.headersRow++;
                    }

                    fltrow.className = this.fltsRowCssClass;
                    //Disable for grid_layout
                    if(this.isExternalFlt &&
                        (!this.gridLayout || this.popUpFilters)){
                        fltrow.style.display = 'none';
                    }
                }

                this.nbFilterableRows = this.getRowsNb();
                this.nbVisibleRows = this.nbFilterableRows;
                this.nbRows = this.tbl.rows.length;

                for(let i=0; i<n; i++){// this loop adds filters

                    if(this.popUpFilters){
                        this.Cpt.popupFilter.build(i);
                    }

                    let fltcell = Dom.create(this.fltCellTag),
                        col = this['col'+i],
                        externalFltTgtId =
                            this.isExternalFlt && this.externalFltTgtIds ?
                            this.externalFltTgtIds[i] : null;

                    if(this.singleSearchFlt){
                        fltcell.colSpan = this.nbCells;
                    }
                    if(!this.gridLayout){
                        fltrow.appendChild(fltcell);
                    }
                    inpclass = (i==n-1 && this.displayBtn) ?
                        this.fltSmallCssClass : this.fltCssClass;

                    if(col===undefined){
                        col = f['col_'+i]===undefined ?
                            this.fltTypeInp : Str.lower(f['col_'+i]);
                    }

                    //only 1 input for single search
                    if(this.singleSearchFlt){
                        col = this.fltTypeInp;
                        inpclass = this.singleFltCssClass;
                    }

                    //drop-down filters
                    if(col===this.fltTypeSlc || col===this.fltTypeMulti){
                        if(!this.Cpt.dropdown){
                            this.Cpt.dropdown = new Dropdown(this);
                        }
                        let dropdown = this.Cpt.dropdown;

                        let slc = Dom.create(this.fltTypeSlc,
                                ['id', this.prfxFlt+i+'_'+this.id],
                                ['ct', i], ['filled', '0']
                            );

                        if(col===this.fltTypeMulti){
                            slc.multiple = this.fltTypeMulti;
                            slc.title = dropdown.multipleSlcTooltip;
                        }
                        slc.className = Str.lower(col)===this.fltTypeSlc ?
                            inpclass : this.fltMultiCssClass;// for ie<=6

                        //filter is appended in desired external element
                        if(externalFltTgtId){
                            Dom.id(externalFltTgtId).appendChild(slc);
                            this.externalFltEls.push(slc);
                        } else {
                            fltcell.appendChild(slc);
                        }

                        this.fltIds.push(this.prfxFlt+i+'_'+this.id);

                        if(!this.fillSlcOnDemand){
                            dropdown._build(i);
                        }

                        Event.add(slc, 'keypress', this.Evt.detectKey);
                        Event.add(slc, 'change', this.Evt.onSlcChange);
                        Event.add(slc, 'focus', this.Evt.onSlcFocus);
                        // Event.add(slc, 'blur', this.Evt._OnSlcBlur);

                        //1st option is created here since dropdown.build isn't
                        //invoked
                        if(this.fillSlcOnDemand){
                            let opt0 = Dom.createOpt(this.displayAllText, '');
                            slc.appendChild(opt0);
                        }
                    }
                    // checklist
                    else if(col===this.fltTypeCheckList){
                        let checkList;
                        if(!this.Cpt.checkList){
                            this.Cpt.checkList = new CheckList(this);
                            checkList = this.Cpt.checkList;
                        }

                        let divCont = Dom.create('div',
                            ['id', checkList.prfxCheckListDiv+i+'_'+this.id],
                            ['ct', i], ['filled', '0']);
                        divCont.className = checkList.checkListDivCssClass;

                        //filter is appended in desired element
                        if(externalFltTgtId){
                            Dom.id(externalFltTgtId).appendChild(divCont);
                            this.externalFltEls.push(divCont);
                        } else {
                            fltcell.appendChild(divCont);
                        }

                        checkList.checkListDiv[i] = divCont;
                        this.fltIds.push(this.prfxFlt+i+'_'+this.id);
                        if(!this.fillSlcOnDemand){
                            checkList._build(i);
                        }

                        if(this.fillSlcOnDemand){
                            Event.add(
                                divCont, 'click', this.Evt.onCheckListClick);
                            divCont.appendChild(
                                Dom.text(checkList.activateCheckListTxt));
                        }

                        Event.add(divCont, 'click', this.Evt.onCheckListFocus);
                    }

                    else{
                        //show/hide input
                        let inptype = col===this.fltTypeInp ? 'text' : 'hidden';
                        let inp = Dom.create(this.fltTypeInp,
                            ['id',this.prfxFlt+i+'_'+this.id],
                            ['type',inptype],['ct',i]);
                        if(inptype!=='hidden' && this.watermark){
                            inp.setAttribute(
                                'placeholder',
                                this.isWatermarkArray ?
                                    (this.watermark[i] || '') : this.watermark
                            );
                        }
                        inp.className = inpclass;
                        inp.onfocus = this.Evt.onInpFocus;

                        //filter is appended in desired element
                        if(externalFltTgtId){
                            Dom.id(externalFltTgtId).appendChild(inp);
                            this.externalFltEls.push(inp);
                        } else {
                            fltcell.appendChild(inp);
                        }

                        this.fltIds.push(this.prfxFlt+i+'_'+this.id);

                        Event.add(inp, 'keypress', this.Evt.detectKey);
                        Event.add(inp, 'keydown', this.Evt.onKeyDown);
                        Event.add(inp, 'keyup', this.Evt.onKeyUp);
                        Event.add(inp, 'blur', this.Evt.onInpBlur);

                        if(this.rememberGridValues){
                            let flts_values = this.Cpt.store.getFilterValues(
                                this.fltsValuesCookie);
                            if(flts_values[i]!=' '){
                                this.setFilterValue(i, flts_values[i], false);
                            }
                        }
                    }
                    // this adds submit button
                    if(i==n-1 && this.displayBtn){
                        let btn = Dom.create(this.fltTypeInp,
                            ['id',this.prfxValButton+i+'_'+this.id],
                            ['type','button'], ['value',this.btnText]);
                        btn.className = this.btnCssClass;

                        //filter is appended in desired element
                        if(externalFltTgtId){
                            Dom.id(externalFltTgtId).appendChild(btn);
                        } else{
                            fltcell.appendChild(btn);
                        }

                        btn.onclick = this.Evt.onBtnClick;
                    }//if

                }// for i

            } else {
                this._resetGrid();
            }//if isFirstLoad

        }//if this.fltGrid

        /* Filter behaviours */
        if(this.rowsCounter){
            // let RowsCounter = require('modules/rowsCounter').RowsCounter;
            // import {RowsCounter} from 'modules/rowsCounter';
            this.Cpt.rowsCounter = new RowsCounter(this);
            this.Cpt.rowsCounter.init();
        }
        if(this.statusBar){
            // let StatusBar = require('modules/statusBar').StatusBar;
            // import {StatusBar} from 'modules/statusBar';
            this.Cpt.statusBar = new StatusBar(this);
            this.Cpt.statusBar.init();
        }
        if(this.paging || (this.Cpt.paging && this.Cpt.paging.isPagingRemoved)){
            // let Paging = require('modules/paging').Paging;
            // import {Paging} from 'modules/paging';
            // if(!this.Cpt.paging){
                this.Cpt.paging = new Paging(this);
            // }
            this.Cpt.paging.init();
        }
        if(this.btnReset){
            // let ClearButton = require('modules/clearButton').ClearButton;
            // import {ClearButton} from 'modules/clearButton';
            this.Cpt.clearButton = new ClearButton(this);
            this.Cpt.clearButton.init();
        }
        if(this.helpInstructions){
            // let Help = require('modules/help').Help;
            // import {Help} from 'modules/help';
            this.Cpt.help = new Help(this);
            this.Cpt.help.init();
        }
        if(this.hasColWidths && !this.gridLayout){
            this.setColWidths();
        }
        if(this.alternateBgs){
            //1st time only if no paging and rememberGridValues
            // let AlternateRows = require('modules/alternateRows')
            //  .AlternateRows;
            // import {AlternateRows} from 'modules/alternateRows';
            this.Cpt.alternateRows = new AlternateRows(this);
            this.Cpt.alternateRows.init();
        }
        if(this.hasColOperation){
            // let ColOps = require('modules/colOps').ColOps;
            // import {ColOps} from 'modules/colOps';
            this.Cpt.colOps = new ColOps(this);
            this.Cpt.colOps.calc();
        }
        if(this.sort /*|| this.gridLayout*/){
            this.importSort();
        }

        this.isFirstLoad = false;
        this._hasGrid = true;

        if(this.rememberGridValues || this.rememberPageLen ||
            this.rememberPageNb){
            this.resetValues();
        }

        //TF css class is added to table
        if(!this.gridLayout){
            Dom.addClass(this.tbl, this.prfxTf);
        }

        if(this.loader){
            this.Cpt.loader.show('none');
        }

        /* Loads extensions */
        if(this.hasExtensions){
            this.initExtensions();
        }

        if(this.onFiltersLoaded){
            this.onFiltersLoaded.call(null, this);
        }

    }

    /*====================================================
        - TF events manager
        - Params:
            - event name (string)
            - config object (optional literal object)
    =====================================================*/
    EvtManager(evt,
        cfg={ slcIndex: null, slcExternal: false, slcId: null, pgIndex: null }){
        let slcIndex = cfg.slcIndex;
        let slcExternal = cfg.slcExternal;
        let slcId = cfg.slcId;
        let pgIndex = cfg.pgIndex;
        let cpt = this.Cpt;

        function efx(){
            /*jshint validthis:true */
            let ev = this.Evt.name;

            switch(evt){
                case ev.filter:
                    this._filter();
                break;
                case ev.dropdown:
                    if(this.linkedFilters){
                        cpt.dropdown._build(slcIndex, true);
                    } else {
                        cpt.dropdown._build(
                            slcIndex, false, slcExternal, slcId);
                    }
                break;
                case ev.checklist:
                    cpt.checkList._build(slcIndex, slcExternal, slcId);
                break;
                case ev.changepage:
                    cpt.paging._changePage(pgIndex);
                break;
                case ev.clear:
                    this._clearFilters();
                    this._filter();
                break;
                case ev.changeresultsperpage:
                    cpt.paging._changeResultsPerPage();
                break;
                case ev.resetvalues:
                    this._resetValues();
                    this._filter();
                break;
                case ev.resetpage:
                    cpt.paging._resetPage(this.pgNbCookie);
                break;
                case ev.resetpagelength:
                    cpt.paging._resetPageLength(this.pgLenCookie);
                break;
                case ev.sort:
                break;
                case ev.loadextensions:
                    this._loadExtensions();
                break;
                case ev.loadthemes:
                    this._loadThemes();
                break;
                // default: //to be used by extensions events when needed
                //     this['_'+evt].call(null, o, s);
                // break;
            }
            if(this.statusBar){
                cpt.statusBar.message('');
            }
            if(this.loader){
                cpt.loader.show('none');
            }
        }

        if(!this.loader && !this.statusBar) {
            efx.call(this);
        } else {
            if(this.loader){
                cpt.loader.show('');
            }
            if(this.statusBar){
                cpt.statusBar.message(this['msg'+evt]);
            }
            global.setTimeout(efx.bind(this), this.execDelay);
        }
    }

    /**
     * Initialise all the extensions defined in the configuration object
     */
    initExtensions(){
        let exts = this.extensions;

        for(let i=0, len=exts.length; i<len; i++){
            let ext = exts[i];
            if(!this.ExtRegistry[ext.name]){
                this.loadExtension(ext);
            }
        }
    }

    /**
     * Load an extension module
     * @param  {Object} ext Extension config object
     */
    loadExtension(ext){
        if(!ext || !ext.name){
            return;
        }

        let name = ext.name;
        let path = ext.path;
        let modulePath;

        if(name && path){
            modulePath = ext.path + name;
        } else {
            name = name.replace('.js', '');
            modulePath = './extensions/{}/{}'.replace(/{}/g, name);
        }

        require([modulePath], (mod)=> {
            let inst = new mod(this, ext);
            inst.init();
            this.ExtRegistry[name] = inst;
        });
    }

    /**
     * Destroy all the extensions defined in the configuration object
     */
    destroyExtensions(){
        let exts = this.extensions;

        for(let i=0, len=exts.length; i<len; i++){
            let ext = exts[i];
            let extInstance = this.ExtRegistry[ext.name];
            if(extInstance){
                extInstance.destroy();
                this.ExtRegistry[ext.name] = null;
            }
        }
    }

    loadThemes(){
        this.EvtManager(this.Evt.name.loadthemes);
    }

    /**
     * Load themes defined in the configuration object
     */
    _loadThemes(){
        let themes = this.themes;
        //Default theme config
        if(this.enableDefaultTheme){
            let defaultTheme = { name: 'default' };
            this.themes.push(defaultTheme);
        }
        if(Types.isArray(themes)){
            for(let i=0, len=themes.length; i<len; i++){
                let theme = themes[i];
                let name = theme.name;
                let path = theme.path;
                if(name && !path){
                    path = this.themesPath + name + '/' + name + '.css';
                }
                else if(!name && theme.path){
                    name = 'theme{0}'.replace('{0}', i);
                }

                if(!this.isImported(path, 'link')){
                    this.import(name, path, null, 'link');
                }
            }
        }

        //Some elements need to be overriden for theme
        //Reset button
        this.btnResetText = null;
        this.btnResetHtml = '<input type="button" value="" class="' +
            this.btnResetCssClass+'" title="Clear filters" />';

        //Paging buttons
        this.btnPrevPageHtml = '<input type="button" value="" class="' +
            this.btnPageCssClass+' previousPage" title="Previous page" />';
        this.btnNextPageHtml = '<input type="button" value="" class="' +
            this.btnPageCssClass+' nextPage" title="Next page" />';
        this.btnFirstPageHtml = '<input type="button" value="" class="' +
            this.btnPageCssClass+' firstPage" title="First page" />';
        this.btnLastPageHtml = '<input type="button" value="" class="' +
            this.btnPageCssClass+' lastPage" title="Last page" />';

        //Loader
        this.loader = true;
        this.loaderHtml = '<div class="defaultLoader"></div>';
        this.loaderText = null;
    }

    /**
     * Destroy filter grid
     */
    destroy(){
        if(!this._hasGrid){
            return;
        }
        let rows = this.tbl.rows,
            Cpt = this.Cpt,
            ExtRegistry = this.ExtRegistry;
        if(this.paging){
            Cpt.paging.destroy();
        }
        if(this.statusBar){
            Cpt.statusBar.destroy();
        }
        if(this.rowsCounter){
            Cpt.rowsCounter.destroy();
        }
        if(this.btnReset){
            Cpt.clearButton.destroy();
        }
        if(this.helpInstructions){
            Cpt.help.destroy();
        }
        if(this.isExternalFlt && !this.popUpFilters){
            this.removeExternalFlts();
        }
        if(this.infDiv){
            this.removeToolbar();
        }
        if(this.highlightKeywords){
            Cpt.highlightKeyword.unhighlightAll();
        }
        if(this.sort){
            ExtRegistry.sort.destroy();
        }
        if(this.loader){
            Cpt.loader.destroy();
        }
        if(this.popUpFilters){
            Cpt.popupFilter.destroy();
        }
        if(this.markActiveColumns){
            this.clearActiveColumns();
        }
        if(this.hasExtensions){
            this.destroyExtensions();
        }

        //this loop shows all rows and removes validRow attribute
        for(let j=this.refRow; j<this.nbRows; j++){
            rows[j].style.display = '';
            try{
                if(rows[j].hasAttribute('validRow')){
                    rows[j].removeAttribute('validRow');
                }
            } catch(e) {
                //ie<=6 doesn't support hasAttribute method
                let row = rows[j];
                let attribs = row.attributes;
                for(let x = 0; x < attribs.length; x++){
                    if(Str.lower(attribs.nodeName)==='validrow'){
                        row.removeAttribute('validRow');
                    }
                }
            }

            //removes alternating colors
            if(this.alternateBgs){
                Cpt.alternateRows.removeRowBg(j);
            }

        }//for j

        if(this.fltGrid && !this.gridLayout){
            this.fltGridEl = rows[this.filtersRowIndex];
            this.tbl.deleteRow(this.filtersRowIndex);
        }
        if(this.gridLayout){
            Cpt.gridLayout.destroy();
        }
        Dom.removeClass(this.tbl, this.prfxTf);
        this.activeFlt = null;
        this.isStartBgAlternate = true;
        this._hasGrid = false;
        this.tbl = null;
    }

    /**
     * Generate container element for paging, reset button, rows counter etc.
     */
    setToolbar(){
        if(this.infDiv){
            return;
        }

        /*** container div ***/
        let infdiv = Dom.create('div', ['id', this.prfxInfDiv+this.id]);
        infdiv.className = this.infDivCssClass;

        //custom container
        if(this.toolBarTgtId){
            Dom.id(this.toolBarTgtId).appendChild(infdiv);
        }
        //grid-layout
        else if(this.gridLayout){
            let gridLayout = this.Cpt.gridLayout;
            gridLayout.tblMainCont.appendChild(infdiv);
            infdiv.className = gridLayout.gridInfDivCssClass;
        }
        //default location: just above the table
        else{
            this.tbl.parentNode.insertBefore(infdiv, this.tbl);
        }
        this.infDiv = Dom.id(this.prfxInfDiv+this.id);

        /*** left div containing rows # displayer ***/
        let ldiv = Dom.create('div', ['id', this.prfxLDiv+this.id]);
        ldiv.className = this.lDivCssClass;
        infdiv.appendChild(ldiv);
        this.lDiv = Dom.id(this.prfxLDiv+this.id);

        /***    right div containing reset button
                + nb results per page select    ***/
        let rdiv = Dom.create('div', ['id', this.prfxRDiv+this.id]);
        rdiv.className = this.rDivCssClass;
        infdiv.appendChild(rdiv);
        this.rDiv = Dom.id(this.prfxRDiv+this.id);

        /*** mid div containing paging elements ***/
        let mdiv = Dom.create('div', ['id', this.prfxMDiv+this.id]);
        mdiv.className = this.mDivCssClass;
        infdiv.appendChild(mdiv);
        this.mDiv = Dom.id(this.prfxMDiv+this.id);

        // Enable help instructions by default if topbar is generated
        if(!this.helpInstructions){
            if(!this.Cpt.help){
                this.Cpt.help = new Help(this);
            }
            this.Cpt.help.init();
            this.helpInstructions = true;
        }
    }

    /**
     * Remove toolbar container element
     */
    removeToolbar(){
        if(!this.infDiv){
            return;
        }
        this.infDiv.parentNode.removeChild(this.infDiv);
        this.infDiv = null;
    }

    /**
     * Remove all the external column filters
     */
    removeExternalFlts(){
        if(!this.isExternalFlt || !this.externalFltTgtIds){
            return;
        }
        let ids = this.externalFltTgtIds,
            len = ids.length;
        for(let ct=0; ct<len; ct++){
            let externalFltTgtId = ids[ct],
                externalFlt = Dom.id(externalFltTgtId);
            if(externalFlt){
                externalFlt.innerHTML = '';
            }
        }
    }

    /**
     * Load sorting module:
     * - WebFX Sortable Table 1.12 plugin by Erik Arvidsson
     * - Sortable Table adapter
     */
    importSort(){
        this.loadExtension({
            name: this.sortConfig.name,
            path: this.sortConfig.path
            // path: './extensions/sort/sort.js'
        });
    }

    performSort(){
        this.EvtManager(this.Evt.name.sort);
    }

    /*====================================================
        - Sets selection or edition features by loading
        ezEditTable script by Max Guglielmi
    =====================================================*/
    // setEditable(){
    //     this.loadExtension({
    //         name: 'advancedGrid'
    //     });
    // }

    /*====================================================
        - IE bug: it seems there is no way to make
        multiple selections programatically, only last
        selection is kept (multiple select previously
        populated via DOM)
        - Work-around: defer selection with a setTimeout
        If you find a more elegant solution to
        this let me know ;-)
        - For the moment only this solution seems to work!
        - Params:
            - slc = select object (select obj)
            - index to be selected (integer)
            - execute filtering (boolean)
    =====================================================*/
    // __deferMultipleSelection: function(slc,index,filter){
    //     if(Str.lower(slc.nodeName)!=='select'){
    //         return;
    //     }
    //     let doFilter = filter===undefined ? false : filter;
    //     let o = this;
    //     global.setTimeout(function(){
    //         slc.options[0].selected = false;

    //         if(slc.options[index].value===''){
    //             slc.options[index].selected = false;
    //         }
    //         else{
    //             slc.options[index].selected = true;
    //             if(doFilter){
    //                 o.filter();
    //             }
    //         }
    //     }, 0.1);
    // },

    /*====================================================
        - Returns an array [[values],[texts]] with
        custom values for a given filter
        - Param: column index (integer)
    =====================================================*/
    // _getCustomValues: function(colIndex){
    //     if(!colIndex){
    //         return;
    //     }
    //     //custom select test
    //     let isCustomSlc = this.hasCustomSlcOptions &&
    //             Arr.has(this.customSlcOptions.cols, colIndex);
    //     if(!isCustomSlc){
    //         return;
    //     }
    //     let optTxt = [], optArray = [];
    //     let index = Arr.indexByValue(this.customSlcOptions.cols, colIndex);
    //     let slcValues = this.customSlcOptions.values[index];
    //     let slcTexts = this.customSlcOptions.texts[index];
    //     let slcSort = this.customSlcOptions.sorts[index];
    //     for(let r=0; r<slcValues.length; r++){
    //         optArray.push(slcValues[r]);
    //         if(slcTexts[r]){
    //             optTxt.push(slcTexts[r]);
    //         } else {
    //             optTxt.push(slcValues[r]);
    //         }
    //     }
    //     if(slcSort){
    //         optArray.sort();
    //         optTxt.sort();
    //     }
    //     return [optArray,optTxt];
    // },

    resetValues(){
        this.EvtManager(this.Evt.name.resetvalues);
    }

    /**
     * Reset persisted filter values
     */
    _resetValues(){
        //only fillSlcOnDemand
        if(this.rememberGridValues && this.fillSlcOnDemand){
            this._resetGridValues(this.fltsValuesCookie);
        }
        if(this.rememberPageLen && this.Cpt.paging){
            this.Cpt.paging.resetPageLength(this.pgLenCookie);
        }
        if(this.rememberPageNb && this.Cpt.paging){
            this.Cpt.paging.resetPage(this.pgNbCookie);
        }
    }

    /**
     * Reset persisted filter values when load filters on demand feature is
     * enabled
     * @param  {String} name cookie name storing filter values
     */
    _resetGridValues(name){
        if(!this.fillSlcOnDemand){
            return;
        }
        let fltsValues = this.Cpt.store.getFilterValues(name),
            slcFltsIndex = this.getFiltersByType(this.fltTypeSlc, true),
            multiFltsIndex = this.getFiltersByType(this.fltTypeMulti, true);

        //if the number of columns is the same as before page reload
        if(Number(fltsValues[(fltsValues.length-1)]) === this.fltIds.length){
            for(let i=0; i<(fltsValues.length - 1); i++){
                if(fltsValues[i]===' '){
                    continue;
                }
                let s, opt;
                // if fillSlcOnDemand, drop-down needs to contain stored
                // value(s) for filtering
                if(this['col'+i]===this.fltTypeSlc ||
                    this['col'+i]===this.fltTypeMulti){
                    let slc = Dom.id( this.fltIds[i] );
                    slc.options[0].selected = false;

                    //selects
                    if(Arr.has(slcFltsIndex, i)){
                        opt = Dom.createOpt(fltsValues[i],fltsValues[i],true);
                        slc.appendChild(opt);
                        this.hasStoredValues = true;
                    }
                    //multiple select
                    if(Arr.has(multiFltsIndex, i)){
                        s = fltsValues[i].split(' '+this.orOperator+' ');
                        for(j=0; j<s.length; j++){
                            if(s[j]===''){
                                continue;
                            }
                            opt = Dom.createOpt(s[j],s[j],true);
                            slc.appendChild(opt);
                            this.hasStoredValues = true;

                            // IE multiple selection work-around
                            // if(hlp.isIE()){
                            //     this.__deferMultipleSelection(slc,j,false);
                            //     hasStoredValues = false;
                            // }
                        }
                    }// if multiFltsIndex
                }
                else if(this['col'+i]==this.fltTypeCheckList){
                    let checkList = this.Cpt.checkList;
                    let divChk = checkList.checkListDiv[i];
                    divChk.title = divChk.innerHTML;
                    divChk.innerHTML = '';

                    let ul = Dom.create(
                        'ul',['id',this.fltIds[i]],['colIndex',i]);
                    ul.className = checkList.checkListCssClass;

                    let li0 = Dom.createCheckItem(
                        this.fltIds[i]+'_0', '', this.displayAllText);
                    li0.className = checkList.checkListItemCssClass;
                    ul.appendChild(li0);

                    divChk.appendChild(ul);

                    s = fltsValues[i].split(' '+this.orOperator+' ');
                    for(j=0; j<s.length; j++){
                        if(s[j]===''){
                            continue;
                        }
                        let li = Dom.createCheckItem(
                            this.fltIds[i]+'_'+(j+1), s[j], s[j]);
                        li.className = checkList.checkListItemCssClass;
                        ul.appendChild(li);
                        li.check.checked = true;
                        checkList.setCheckListValues(li.check);
                        this.hasStoredValues = true;
                    }
                }
            }//end for

            if(!this.hasStoredValues && this.paging){
                this.Cpt.paging.setPagingInfo();
            }
        }//end if
    }

    filter(){
        this.EvtManager(this.Evt.name.filter);
    }

    /**
     * Filter the table by retrieving the data from each cell in every single
     * row and comparing it to the search term for current column. A row is
     * hidden when all the search terms are not found in current row.
     */
    _filter(){
        if(!this.fltGrid || (!this._hasGrid && !this.isFirstLoad)){
            return;
        }
        //invoke onbefore callback
        if(this.onBeforeFilter){
            this.onBeforeFilter.call(null, this);
        }

        let row = this.tbl.rows,
            Cpt = this.Cpt,
            f = this.cfg,
            hiddenrows = 0;

        this.validRowsIndex = [];

        // removes keyword highlighting
        if(this.highlightKeywords){
            Cpt.highlightKeyword.unhighlightAll();
        }
        //removes popup filters active icons
        if(this.popUpFilters){
            Cpt.popupFilter.buildIcons();
        }
        //removes active column header class
        if(this.markActiveColumns){
            this.clearActiveColumns();
        }
        // search args re-init
        this.searchArgs = this.getFiltersValue();

        let num_cell_data, nbFormat;
        let re_le = new RegExp(this.leOperator),
            re_ge = new RegExp(this.geOperator),
            re_l = new RegExp(this.lwOperator),
            re_g = new RegExp(this.grOperator),
            re_d = new RegExp(this.dfOperator),
            re_lk = new RegExp(Str.rgxEsc(this.lkOperator)),
            re_eq = new RegExp(this.eqOperator),
            re_st = new RegExp(this.stOperator),
            re_en = new RegExp(this.enOperator),
            // re_an = new RegExp(this.anOperator),
            // re_cr = new RegExp(this.curExp),
            re_em = this.emOperator,
            re_nm = this.nmOperator,
            re_re = new RegExp(Str.rgxEsc(this.rgxOperator));

        //keyword highlighting
        function highlight(str, ok, cell){
            /*jshint validthis:true */
            if(this.highlightKeywords && ok){
                str = Str.replace(re_lk,'');
                str = Str.replace(re_eq,'');
                str = Str.replace(re_st,'');
                str = Str.replace(re_en,'');
                let w = str;
                if(re_le.test(str) || re_ge.test(str) || re_l.test(str) ||
                    re_g.test(str) || re_d.test(str)){
                    w = Dom.getText(cell);
                }
                if(w !== ''){
                    Cpt.highlightKeyword.highlight(
                        cell, w, Cpt.highlightKeyword.highlightCssClass);
                }
            }
        }

        //looks for search argument in current row
        function hasArg(sA, cell_data, j){
            /*jshint validthis:true */
            let occurence,
                removeNbFormat = Helpers.removeNbFormat;
            //Search arg operator tests
            let hasLO = re_l.test(sA),
                hasLE = re_le.test(sA),
                hasGR = re_g.test(sA),
                hasGE = re_ge.test(sA),
                hasDF = re_d.test(sA),
                hasEQ = re_eq.test(sA),
                hasLK = re_lk.test(sA),
                // hasAN = re_an.test(sA),
                hasST = re_st.test(sA),
                hasEN = re_en.test(sA),
                hasEM = (re_em === sA),
                hasNM = (re_nm === sA),
                hasRE = re_re.test(sA);

            //Search arg dates tests
            let isLDate = hasLO && isValidDate(sA.replace(re_l,''),dtType);
            let isLEDate = hasLE && isValidDate(sA.replace(re_le,''),dtType);
            let isGDate = hasGR && isValidDate(sA.replace(re_g,''),dtType);
            let isGEDate = hasGE && isValidDate(sA.replace(re_ge,''),dtType);
            let isDFDate = hasDF && isValidDate(sA.replace(re_d,''),dtType);
            let isEQDate = hasEQ && isValidDate(sA.replace(re_eq,''),dtType);

            let dte1, dte2;
            //dates
            if(isValidDate(cell_data,dtType)){
                dte1 = formatDate(cell_data,dtType);
                // lower date
                if(isLDate){
                    dte2 = formatDate(sA.replace(re_l,''),dtType);
                    occurence = dte1 < dte2;
                }
                // lower equal date
                else if(isLEDate){
                    dte2 = formatDate(sA.replace(re_le,''),dtType);
                    occurence = dte1 <= dte2;
                }
                // greater equal date
                else if(isGEDate){
                    dte2 = formatDate(sA.replace(re_ge,''),dtType);
                    occurence = dte1 >= dte2;
                }
                // greater date
                else if(isGDate){
                    dte2 = formatDate(sA.replace(re_g,''),dtType);
                    occurence = dte1 > dte2;
                }
                // different date
                else if(isDFDate){
                    dte2 = formatDate(sA.replace(re_d,''),dtType);
                    occurence = dte1.toString() != dte2.toString();
                }
                // equal date
                else if(isEQDate){
                    dte2 = formatDate(sA.replace(re_eq,''),dtType);
                    occurence = dte1.toString() == dte2.toString();
                }
                // searched keyword with * operator doesn't have to be a date
                else if(re_lk.test(sA)){// like date
                    occurence = this._containsStr(
                        sA.replace(re_lk,''),cell_data,null,false);
                }
                else if(isValidDate(sA,dtType)){
                    dte2 = formatDate(sA,dtType);
                    occurence = dte1.toString() == dte2.toString();
                }
                //empty
                else if(hasEM){
                    occurence = Str.isEmpty(cell_data);
                }
                //non-empty
                else if(hasNM){
                    occurence = !Str.isEmpty(cell_data);
                }
            }

            else{
                //first numbers need to be formated
                if(this.hasColNbFormat && this.colNbFormat[j]){
                    num_cell_data = removeNbFormat(
                        cell_data, this.colNbFormat[j]);
                    nbFormat = this.colNbFormat[j];
                } else {
                    if(this.thousandsSeparator === ',' &&
                        this.decimalSeparator === '.'){
                        num_cell_data = removeNbFormat(cell_data, 'us');
                        nbFormat = 'us';
                    } else {
                        num_cell_data = removeNbFormat(cell_data, 'eu');
                        nbFormat = 'eu';
                    }
                }

                // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},
                // rgx:)
                // lower equal
                if(hasLE){
                    occurence = num_cell_data <= removeNbFormat(
                        sA.replace(re_le,''), nbFormat);
                }
                //greater equal
                else if(hasGE){
                    occurence = num_cell_data >= removeNbFormat(
                        sA.replace(re_ge,''), nbFormat);
                }
                //lower
                else if(hasLO){
                    occurence = num_cell_data < removeNbFormat(
                        sA.replace(re_l,''), nbFormat);
                }
                //greater
                else if(hasGR){
                    occurence = num_cell_data > removeNbFormat(
                        sA.replace(re_g,''), nbFormat);
                }
                //different
                else if(hasDF){
                    occurence = this._containsStr(
                        sA.replace(re_d,''),cell_data) ? false : true;
                }
                //like
                else if(hasLK){
                    occurence = this._containsStr(
                        sA.replace(re_lk,''),cell_data,null,false);
                }
                //equal
                else if(hasEQ){
                    occurence = this._containsStr(
                        sA.replace(re_eq,''),cell_data,null,true);
                }
                //starts with
                else if(hasST){
                    occurence = cell_data.indexOf(sA.replace(re_st,''))===0 ?
                        true : false;
                }
                //ends with
                else if(hasEN){
                    let searchArg = sA.replace(re_en,'');
                    occurence =
                        cell_data.lastIndexOf(searchArg,cell_data.length-1) ===
                        (cell_data.length-1)-(searchArg.length-1) &&
                        cell_data.lastIndexOf(
                            searchArg,cell_data.length-1) > -1 ? true : false;
                }
                //empty
                else if(hasEM){
                    occurence = Str.isEmpty(cell_data);
                }
                //non-empty
                else if(hasNM){
                    occurence = !Str.isEmpty(cell_data);
                }
                //regexp
                else if(hasRE){
                    //in case regexp fires an exception
                    try{
                        //operator is removed
                        let srchArg = sA.replace(re_re,'');
                        let rgx = new RegExp(srchArg);
                        occurence = rgx.test(cell_data);
                    } catch(e) { occurence = false; }
                }
                else{
                    let fCol = f['col_'+j];
                    occurence = this._containsStr(
                        sA, cell_data, !fCol ? this.fltTypeInp : fCol);
                }

            }//else
            return occurence;
        }//fn

        for(let k=this.refRow; k<this.nbRows; k++){
            /*** if table already filtered some rows are not visible ***/
            if(row[k].style.display === 'none'){
                row[k].style.display = '';
            }

            let cell = row[k].cells,
                nchilds = cell.length;

            // checks if row has exact cell #
            if(nchilds !== this.nbCells){
                continue;
            }

            let occurence = [],
                isRowValid = this.searchType==='include' ? true : false,
                //only for single filter search
                singleFltRowValid = false;

            // this loop retrieves cell data
            for(let j=0; j<nchilds; j++){
                //searched keyword
                let sA = this.searchArgs[this.singleSearchFlt ? 0 : j];
                var dtType = this.hasColDateType ?
                        this.colDateType[j] : this.defaultDateType;
                if(sA===''){
                    continue;
                }

                let cell_data = Str.matchCase(
                    this.getCellData(j, cell[j]), this.caseSensitive);

                //multiple search parameter operator ||
                let sAOrSplit = sA.split(this.orOperator),
                //multiple search || parameter boolean
                hasMultiOrSA = (sAOrSplit.length>1) ? true : false,
                //multiple search parameter operator &&
                sAAndSplit = sA.split(this.anOperator),
                //multiple search && parameter boolean
                hasMultiAndSA = sAAndSplit.length>1 ? true : false;

                //multiple sarch parameters
                if(hasMultiOrSA || hasMultiAndSA){
                    let cS,
                        occur = false,
                        s = hasMultiOrSA ? sAOrSplit : sAAndSplit;
                    for(let w=0; w<s.length; w++){
                        cS = Str.trim(s[w]);
                        occur = hasArg.call(this, cS, cell_data, j);
                        highlight.call(this, cS, occur, cell[j]);
                        if(hasMultiOrSA && occur){
                            break;
                        }
                        if(hasMultiAndSA && !occur){
                            break;
                        }
                    }
                    occurence[j] = occur;
                }
                //single search parameter
                else {
                    occurence[j] =
                        hasArg.call(this, Str.trim(sA), cell_data, j);
                    highlight.call(this, sA, occurence[j], cell[j]);
                }//else single param

                if(!occurence[j]){
                    isRowValid = this.searchType==='include' ? false : true;
                }
                if(this.singleSearchFlt && occurence[j]){
                    singleFltRowValid = true;
                }
                if(this.popUpFilters){
                    Cpt.popupFilter.buildIcon(j, true);
                }
                if(this.markActiveColumns){
                    if(k === this.refRow){
                        if(this.onBeforeActiveColumn){
                            this.onBeforeActiveColumn.call(null, this, j);
                        }
                        Dom.addClass(
                            this.getHeaderElement(j),
                            this.activeColumnsCssClass);
                        if(this.onAfterActiveColumn){
                            this.onAfterActiveColumn.call(null, this, j);
                        }
                    }
                }
            }//for j

            if(this.singleSearchFlt && singleFltRowValid){
                isRowValid = true;
            }

            if(!isRowValid){
                this.validateRow(k, false);
                // always visible rows need to be counted as valid
                if(this.hasVisibleRows && Arr.has(this.visibleRows, k) &&
                    !this.paging){
                    this.validRowsIndex.push(k);
                } else {
                    hiddenrows++;
                }
            } else {
                this.validateRow(k, true);
                this.validRowsIndex.push(k);
                if(this.alternateBgs){
                    Cpt.alternateRows.setRowBg(k, this.validRowsIndex.length);
                }
                if(this.onRowValidated){
                    this.onRowValidated.call(null, this, k);
                }
            }
        }// for k

        this.nbVisibleRows = this.validRowsIndex.length;
        this.nbHiddenRows = hiddenrows;
        this.isStartBgAlternate = false;

        if(this.rememberGridValues){
            Cpt.store.saveFilterValues(this.fltsValuesCookie);
        }
        //applies filter props after filtering process
        if(!this.paging){
            this.applyGridProps();
        } else {
            this.startPagingRow = 0;
            this.currentPageNb = 1;
            Cpt.paging.setPagingInfo(this.validRowsIndex);
        }//starts paging process
        //invokes onafter callback
        if(this.onAfterFilter){
            this.onAfterFilter.call(null,this);
        }
    }

    /**
     * Re-apply the filters grid properties after a filtering/paging operation
     */
    applyGridProps(){
        // blurs active filter (IE)
        if(this.activeFlt &&
            Str.lower(this.activeFlt.nodeName)===this.fltTypeSlc &&
            !this.popUpFilters){
            this.activeFlt.blur();
            if(this.activeFlt.parentNode){
                this.activeFlt.parentNode.focus();
            }
        }

        let Cpt = this.Cpt;

        //shows rows always visible
        if(this.visibleRows){
            this.enforceVisibility();
        }
        //makes operation on a col
        if(this.hasColOperation){
            Cpt.colOps.calc();
        }
        //re-populates drop-down filters
        if(this.linkedFilters){
            this.linkFilters();
        }
        let nr = !this.paging && this.hasVisibleRows ?
            this.nbVisibleRows - this.visibleRows.length : this.nbVisibleRows;
        //refreshes rows counter
        if(this.rowsCounter){
            Cpt.rowsCounter.refresh(nr);
        }

        if(this.popUpFilters){
            Cpt.popupFilter.closeAll();
        }
    }

    /**
     * Return the data for a given colum
     * @param  {Number} colindex Column index
     * @param  {Boolean} num     Return unformatted number
     * @param  {Array} exclude   List of row indexes to be excluded
     * @return {Array}           Flat list of data for a column
     */
    getColValues(colindex, num, exclude){
        if(!this.fltGrid){
            return;
        }
        let row = this.tbl.rows,
            colValues = [];

        for(let i=this.refRow; i<this.nbRows; i++){
            let isExludedRow = false;
            // checks if current row index appears in exclude array
            if(exclude && Types.isArray(exclude)){
                isExludedRow = Arr.has(exclude, i); //boolean
            }
            let cell = row[i].cells,
                nchilds = cell.length;

            // checks if row has exact cell # and is not excluded
            if(nchilds === this.nbCells && !isExludedRow){
                // this loop retrieves cell data
                for(let j=0; j<nchilds; j++){
                    if(j === colindex && row[i].style.display === ''){
                        let cell_data = Str.lower(this.getCellData(j, cell[j])),
                            nbFormat = this.colNbFormat ?
                                this.colNbFormat[colindex] : null,
                            data = num ?
                                    Helpers.removeNbFormat(cell_data,nbFormat) :
                                    cell_data;
                        colValues.push(data);
                    }
                }
            }
        }
        return colValues;
    }

    /**
     * Return the filter's value of a specified column
     * @param  {Number} index Column index
     * @return {String}       Filter value
     */
    getFilterValue(index){
        if(!this.fltGrid){
            return;
        }
        let fltValue,
            flt = this.getFilterElement(index);
        if(!flt){
            return '';
        }
        let fltColType = this.fltCol[index];
        if(fltColType !== this.fltTypeMulti &&
            fltColType !== this.fltTypeCheckList){
            fltValue = flt.value;
        }
        //mutiple select
        else if(fltColType === this.fltTypeMulti){
            fltValue = '';
            for(let j=0; j<flt.options.length; j++){
                if(flt.options[j].selected){
                    fltValue = fltValue.concat(
                        flt.options[j].value+' ' +
                        this.orOperator + ' '
                    );
                }
            }
            //removes last operator ||
            fltValue = fltValue.substr(0, fltValue.length-4);
        }
        //checklist
        else if(fltColType === this.fltTypeCheckList){
            if(flt.getAttribute('value') !== null){
                fltValue = flt.getAttribute('value');
                //removes last operator ||
                fltValue = fltValue.substr(0,fltValue.length-3);
            } else{
                fltValue = '';
            }
        }
        return fltValue;
    }

    /**
     * Return the filters' values
     * @return {Array} List of filters' values
     */
    getFiltersValue(){
        if(!this.fltGrid){
            return;
        }
        let searchArgs = [];
        for(let i=0; i<this.fltIds.length; i++){
            searchArgs.push(
                Str.trim(
                    Str.matchCase(this.getFilterValue(i), this.caseSensitive))
            );
        }
        return searchArgs;
    }

    /**
     * Return the ID of the filter of a specified column
     * @param  {Number} index Column's index
     * @return {String}       ID of the filter element
     */
    getFilterId(index){
        if(!this.fltGrid){
            return;
        }
        return this.fltIds[index];
    }

    /**
     * Return the list of ids of filters matching a specified type.
     * Note: hidden filters are also returned
     *
     * @param  {String} type  Filter type string ('input', 'select', 'multiple',
     *                        'checklist')
     * @param  {Boolean} bool If true returns columns indexes instead of IDs
     * @return {[type]}       List of element IDs or column indexes
     */
    getFiltersByType(type, bool){
        if(!this.fltGrid){
            return;
        }
        let arr = [];
        for(let i=0; i<this.fltIds.length; i++){
            let fltType = this['col'+i];
            if(fltType === Str.lower(type)){
                let a = (bool) ? i : this.fltIds[i];
                arr.push(a);
            }
        }
        return arr;
    }

    /**
     * Return the filter's DOM element for a given column
     * @param  {Number} index     Column's index
     * @return {DOMElement}
     */
    getFilterElement(index){
        let fltId = this.fltIds[index];
        return Dom.id(fltId);
    }

    /**
     * Return the number of cells for a given row index
     * @param  {Number} rowIndex Index of the row
     * @return {Number}          Number of cells
     */
    getCellsNb(rowIndex){
        let tr = !rowIndex ? this.tbl.rows[0] : this.tbl.rows[rowIndex];
        return tr.cells.length;
    }

    /**
     * Return the number of filterable rows starting from reference row if
     * defined
     * @param  {Boolean} includeHeaders Include the headers row
     * @return {Number}                 Number of filterable rows
     */
    getRowsNb(includeHeaders){
        let s = !this.refRow ? 0 : this.refRow,
            ntrs = this.tbl.rows.length;
        if(includeHeaders){ s = 0; }
        return parseInt(ntrs-s, 10);
    }

    /**
     * Return the data of a given cell
     * @param  {Number} i    Column's index
     * @param  {Object} cell Cell's DOM object
     * @return {String}
     */
    getCellData(i, cell){
        if(i===undefined || !cell){
            return '';
        }
        //First checks for customCellData event
        if(this.customCellData && Arr.has(this.customCellDataCols, i)){
            return this.customCellData.call(null, this, cell, i);
        } else {
            return Dom.getText(cell);
        }
    }

    /**
     * Return the table data with following format:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @return {Array}
     *
     * TODO: provide an API returning data in JSON format
     */
    getTableData(){
        let row = this.tbl.rows;
        for(let k=this.refRow; k<this.nbRows; k++){
            let rowData = [k,[]];
            let cells = row[k].cells;
            // this loop retrieves cell data
            for(let j=0; j<cells.length; j++){
                let cell_data = this.getCellData(j, cells[j]);
                rowData[1].push(cell_data);
            }
            this.tblData.push(rowData);
        }
        return this.tblData;
    }

    /**
     * Return the filtered data with following format:
     * [
     *     [rowIndex, [value0, value1...]],
     *     [rowIndex, [value0, value1...]]
     * ]
     * @param  {Boolean} includeHeaders  Include headers row
     * @return {Array}
     *
     * TODO: provide an API returning data in JSON format
     */
    getFilteredData(includeHeaders){
        if(!this.validRowsIndex){
            return [];
        }
        let row = this.tbl.rows,
            filteredData = [];
        if(includeHeaders){
            let table = this.gridLayout ?
                    this.Cpt.gridLayout.headTbl : this.tbl,
                r = table.rows[this.headersRow],
                rowData = [r.rowIndex,[]];
            for(let j=0; j<this.nbCells; j++){
                let headerText = this.getCellData(j, r.cells[j]);
                rowData[1].push(headerText);
            }
            filteredData.push(rowData);
        }

        let validRows = this.getValidRows(true);
        for(let i=0; i<validRows.length; i++){
            let rData = [this.validRowsIndex[i],[]],
                cells = row[this.validRowsIndex[i]].cells;
            for(let k=0; k<cells.length; k++){
                let cell_data = this.getCellData(k, cells[k]);
                rData[1].push(cell_data);
            }
            filteredData.push(rData);
        }
        return filteredData;
    }

    /**
     * Return the filtered data for a given column index
     * @param  {Number} colIndex Colmun's index
     * @return {Array}           Flat list of values ['val0','val1','val2'...]
     *
     * TODO: provide an API returning data in JSON format
     */
    getFilteredDataCol(colIndex){
        if(colIndex===undefined){
            return [];
        }
        let data =  this.getFilteredData(),
            colData = [];
        for(let i=0; i<data.length; i++){
            let r = data[i],
                //cols values of current row
                d = r[1],
                //data of searched column
                c = d[colIndex];
            colData.push(c);
        }
        return colData;
    }

    /**
     * Get the display value of a row
     * @param  {RowElement} DOM element of the row
     * @return {String}     Usually 'none' or ''
     */
    getRowDisplay(row){
        if(!this.fltGrid || !Types.isObj(row)){
            return;
        }
        return row.style.display;
    }

    /**
     * Validate/invalidate row by setting the 'validRow' attribute on the row
     * @param  {Number}  rowIndex Index of the row
     * @param  {Boolean} isValid
     */
    validateRow(rowIndex, isValid){
        let row = this.tbl.rows[rowIndex];
        if(!row || Str.lower(typeof isValid)!=='boolean'){
            return;
        }

        // always visible rows are valid
        if(this.hasVisibleRows && Arr.has(this.visibleRows, rowIndex) &&
            !this.paging){
            isValid = true;
        }

        let displayFlag = isValid ? '' : 'none',
            validFlag = isValid ? 'true' : 'false';
        row.style.display = displayFlag;

        if(this.paging){
            row.setAttribute('validRow', validFlag);
        }
    }

    /**
     * Validate all filterable rows
     */
    validateAllRows(){
        if(!this._hasGrid){
            return;
        }
        this.validRowsIndex = [];
        for(let k=this.refRow; k<this.nbFilterableRows; k++){
            this.validateRow(k, true);
            this.validRowsIndex.push(k);
        }
    }

    /**
     * Set search value to a given filter
     * @param {Number} index     Column's index
     * @param {String} searcharg Search term
     */
    setFilterValue(index, searcharg/*, doFilter*/){
        if((!this.fltGrid && !this.isFirstLoad) ||
            !this.getFilterElement(index)){
            return;
        }
        let slc = this.getFilterElement(index),
            // execFilter = doFilter===undefined ? true : doFilter,
            fltColType = this['col'+index];
        searcharg = searcharg===undefined ? '' : searcharg;

        if(fltColType !== this.fltTypeMulti &&
            fltColType != this.fltTypeCheckList){
            slc.value = searcharg;
        }
        //multiple selects
        else if(fltColType === this.fltTypeMulti){
            let s = searcharg.split(' '+this.orOperator+' ');
            // let ct = 0; //keywords counter
            for(let j=0; j<slc.options.length; j++){
                if(s==='' || s[0]===''){
                    slc.options[j].selected = false;
                }
                if(slc.options[j].value===''){
                    slc.options[j].selected = false;
                }
                if(slc.options[j].value!=='' &&
                    Arr.has(s, slc.options[j].value, true)){
                    // IE multiple selection work-around
                    // if(hlp.isIE()){
                    //     //when last value reached filtering can be executed
                    //     let filter = ct==(s.length-1) && execFilter ?
                    //         true : false;
                    //     this.__deferMultipleSelection(slc,j,filter);
                    //     ct++;
                    // }
                    // else{
                    //     slc.options[j].selected = true;
                    // }
                    slc.options[j].selected = true;
                }//if
            }//for j
        }
        //checklist
        else if(fltColType === this.fltTypeCheckList){
            searcharg = Str.matchCase(searcharg, this.caseSensitive);
            let sarg = searcharg.split(' '+this.orOperator+' ');
            let lisNb = Dom.tag(slc,'li').length;

            slc.setAttribute('value','');
            slc.setAttribute('indexes','');

            for(let k=0; k<lisNb; k++){
                let li = Dom.tag(slc,'li')[k],
                    lbl = Dom.tag(li,'label')[0],
                    chk = Dom.tag(li,'input')[0],
                    lblTxt = Str.matchCase(
                        Dom.getText(lbl), this.caseSensitive);
                if(lblTxt !== '' && Arr.has(sarg, lblTxt, true)){
                    chk.checked = true;
                    this.Cpt.checkList.setCheckListValues(chk);
                }
                else{
                    chk.checked = false;
                    this.Cpt.checkList.setCheckListValues(chk);
                }
            }
        }
    }

    /**
     * Set them columns' widths as per configuration
     * @param {Number} rowIndex Optional row index to apply the widths to
     */
    setColWidths(rowIndex){
        if(!this.fltGrid || !this.hasColWidths){
            return;
        }
        let rIndex;
        if(rowIndex===undefined){
            rIndex = this.tbl.rows[0].style.display!='none' ? 0 : 1;
        } else{
            rIndex = rowIndex;
        }
        setWidths.call(this, this.tbl.rows[rIndex]);

        function setWidths(row){
            /*jshint validthis:true */
            let nbCols = this.nbCells;
            let colWidths = this.colWidths;
            if((nbCols != colWidths.length) || (nbCols != row.cells.length)){
                throw new Error('Columns number mismatch!');
            }

            for(let k=0; k<nbCols; k++){
                row.cells[k].style.width = colWidths[k];
            }

        }
    }

    /**
     * Makes defined rows always visible
     *
     * NOTE: This applies only when paging is disabled
     */
    enforceVisibility(){
        if(this._hasGrid && this.hasVisibleRows && !this.paging){
            for(let i=0, len=this.visibleRows.length; i<len; i++){
                let row = this.visibleRows[i];
                //row index cannot be > nrows
                if(row <= this.nbRows){
                    this.validateRow(row, true);
                }
            }
        }
    }

    clearFilters(){
        this.EvtManager(this.Evt.name.clear);
    }

    /**
     * Clear all the filters' values
     */
    _clearFilters(){
        if(!this.fltGrid){
            return;
        }
        if(this.onBeforeReset){
            this.onBeforeReset.call(null, this, this.getFiltersValue());
        }
        for(let i=0; i<this.fltIds.length; i++){
            this.setFilterValue(i, '');
        }
        if(this.linkedFilters){
            this.activeFilterId = '';
            this.linkFilters();
        }
        if(this.rememberPageLen){ Cookie.remove(this.pgLenCookie); }
        if(this.rememberPageNb){ Cookie.remove(this.pgNbCookie); }
        if(this.onAfterReset){ this.onAfterReset.call(null, this); }
    }

    /**
     * Clears filtered columns visual indicator (background color)
     * @return {[type]} [description]
     */
    clearActiveColumns(){
        for(let i=0, len=this.fltIds.length; i<len; i++){
            Dom.removeClass(
                this.getHeaderElement(i), this.activeColumnsCssClass);
        }
    }

    /**
     * Refresh the filters
     * @param  {Object} config Configuration literal object
     */
    // refresh(config){
    //     let configObj = !config ? this.cfg : config;
    //     let hasSort = this.sort;
    //     //sort property is set to false in order to avoid sort object
    //     //re-instanciation
    //     if(hasSort){
    //         this.sort = false;
    //     }
    //     this.nbRows = this.getRowsNb(); //in case table is refreshed
    //     this.remove();
    //     global['tf_'+this.id] = new TableFilter(
    //         this.id, this.startRow, configObj);
    //     this.isFirstLoad = true;
    //     this.fltIds = [];
    //     this.init();
    //     //New tbody content needs to be referenced in sortabletable script
    //     //with setTBody() method
    //     if(hasSort){
    //         //this.st =  SortableTable object
    //         //Note this is a method of the Sortable Table 1.12 script
    //         //(Erik Arvidsson)
    //         this.st.setTBody(this.tbl.tBodies[0]);
    //         //finally sort property is enabled again
    //         this.sort = true;
    //     }
    // }

    /**
     * Refresh the filters subject to linking ('select', 'multiple',
     * 'checklist' type)
     */
    linkFilters(){
        let slcA1 = this.getFiltersByType(this.fltTypeSlc, true),
            slcA2 = this.getFiltersByType(this.fltTypeMulti, true),
            slcA3 = this.getFiltersByType(this.fltTypeCheckList, true),
            slcIndex = slcA1.concat(slcA2);
        slcIndex = slcIndex.concat(slcA3);

        if(!this.activeFilterId){
            return;
        }

        let activeFlt = this.activeFilterId.split('_')[0];
        activeFlt = activeFlt.split(this.prfxFlt)[1];
        let slcSelectedValue;
        for(let i=0; i<slcIndex.length; i++){
            let curSlc = Dom.id(this.fltIds[slcIndex[i]]);
            slcSelectedValue = this.getFilterValue(slcIndex[i]);
            if(activeFlt!==slcIndex[i] ||
                (this.paging && Arr.has(slcA1, slcIndex[i]) &&
                    activeFlt === slcIndex[i] ) ||
                (!this.paging && (Arr.has(slcA3, slcIndex[i]) ||
                    Arr.has(slcA2, slcIndex[i]))) ||
                slcSelectedValue === this.displayAllText ){

                if(Arr.has(slcA3, slcIndex[i])){
                    this.Cpt.checkList.checkListDiv[slcIndex[i]].innerHTML = '';
                } else {
                    curSlc.innerHTML = '';
                }

                //1st option needs to be inserted
                if(this.fillSlcOnDemand) {
                    let opt0 = Dom.createOpt(this.displayAllText, '');
                    if(curSlc){
                        curSlc.appendChild(opt0);
                    }
                }

                if(Arr.has(slcA3, slcIndex[i])){
                    this.Cpt.checkList._build(slcIndex[i]);
                } else {
                    this.Cpt.dropdown._build(slcIndex[i], true);
                }

                this.setFilterValue(slcIndex[i],slcSelectedValue);
            }
        }// for i
    }

    /**
     * Re-generate the filters grid bar when previously removed
     */
    _resetGrid(){
        if(this.isFirstLoad){
            return;
        }

        let Cpt = this.Cpt;
        let tbl = this.tbl;
        let rows = tbl.rows;
        let filtersRowIndex = this.filtersRowIndex;
        let filtersRow = rows[filtersRowIndex];

        // grid was removed, grid row element is stored in fltGridEl property
        if(!this.gridLayout){
            filtersRow.parentNode.insertBefore(this.fltGridEl, filtersRow);
        }

        // filters are appended in external placeholders elements
        if(this.isExternalFlt){
            let externalFltTgtIds = this.externalFltTgtIds;
            for(let ct=0, len=externalFltTgtIds.length; ct<len; ct++){
                let extFlt = Dom.id(externalFltTgtIds[ct]);

                if(!extFlt){ continue; }

                let externalFltEl = this.externalFltEls[ct];
                extFlt.appendChild(externalFltEl);
                let colFltType = this['col'+ct];
                //IE special treatment for gridLayout, appended filters are
                //empty
                if(this.gridLayout &&
                    externalFltEl.innerHTML === '' &&
                    colFltType !== this.fltTypeInp){
                    if(colFltType === this.fltTypeSlc ||
                        colFltType === this.fltTypeMulti){
                        Cpt.dropdown.build(ct);
                    }
                    if(colFltType === this.fltTypeCheckList){
                        Cpt.checkList.build(ct);
                    }
                }
            }
        }

        this.nbFilterableRows = this.getRowsNb();
        this.nbVisibleRows = this.nbFilterableRows;
        this.nbRows = rows.length;
        if(this.isSortEnabled){
            this.sort = true;
        }

        // if(filtersRow.innerHTML === ''){
        //     refreshFilters(this);
        // } else {
            if(this.popUpFilters){
                this.headersRow++;
                Cpt.popupFilter.buildAll();
            }
        // }

        /***    ie bug work-around, filters need to be re-generated since row
                is empty; insertBefore method doesn't seem to work properly
                with previously generated DOM nodes modified by innerHTML   ***/
        // function refreshFilters(o){
        //     tbl.deleteRow(filtersRowIndex);
        //     o.remove();
        //     o.fltIds = [];
        //     o.isFirstLoad = true;
        //     if(o.popUpFilters){
        //         // o.RemovePopupFilters();
        //         o.Cpt.popupFilter.destroy();
        //     }
        //     o.init();
        // }

        if(!this.gridLayout){
            Dom.addClass(this.tbl, this.prfxTf);
        }
        this._hasGrid = true;
    }

    /**
     * Checks if passed data contains the searched arg
     * @param  {String} arg         Search term
     * @param  {String} data        Data string
     * @param  {String} fltType     Filter type ('input', 'select')
     * @param  {Boolean} forceMatch Exact match
     * @return {Boolean]}
     *
     * TODO: move into string module, remove fltType in order to decouple it
     * from TableFilter module
     */
    _containsStr(arg, data, fltType, forceMatch){
        // Improved by Cedric Wartel (cwl)
        // automatic exact match for selects and special characters are now
        // filtered
        let regexp,
            modifier = (this.caseSensitive) ? 'g' : 'gi',
            exactMatch = !forceMatch ? this.exactMatch : forceMatch;
        if(exactMatch || (fltType!==this.fltTypeInp && fltType)){
            regexp = new RegExp(
                '(^\\s*)'+ Str.rgxEsc(arg) +'(\\s*$)', modifier);
        } else{
            regexp = new RegExp(Str.rgxEsc(arg), modifier);
        }
        return regexp.test(data);
    }

    /**
     * Check if passed script or stylesheet is already imported
     * @param  {String}  filePath Ressource path
     * @param  {String}  type     Possible values: 'script' or 'link'
     * @return {Boolean}
     */
    isImported(filePath, type){
        let imported = false,
            importType = !type ? 'script' : type,
            attr = importType == 'script' ? 'src' : 'href',
            files = Dom.tag(doc, importType);
        for (let i=0; i<files.length; i++){
            if(files[i][attr] === undefined){
                continue;
            }
            if(files[i][attr].match(filePath)){
                imported = true;
                break;
            }
        }
        return imported;
    }

    /**
     * Import script or stylesheet
     * @param  {String}   fileId   Ressource ID
     * @param  {String}   filePath Ressource path
     * @param  {Function} callback Callback
     * @param  {String}   type     Possible values: 'script' or 'link'
     */
    import(fileId, filePath, callback, type){
        let ftype = !type ? 'script' : type,
            imported = this.isImported(filePath, ftype);
        if(imported){
            return;
        }
        let o = this,
            isLoaded = false,
            file,
            head = Dom.tag(doc, 'head')[0];

        if(Str.lower(ftype) === 'link'){
            file = Dom.create(
                'link',
                ['id', fileId], ['type', 'text/css'],
                ['rel', 'stylesheet'], ['href', filePath]
            );
        } else {
            file = Dom.create(
                'script', ['id', fileId],
                ['type', 'text/javascript'], ['src', filePath]
            );
        }

        //Browser <> IE onload event works only for scripts, not for stylesheets
        file.onload = file.onreadystatechange = function(){
            if(!isLoaded &&
                (!this.readyState || this.readyState === 'loaded' ||
                    this.readyState === 'complete')){
                isLoaded = true;
                if(typeof callback === 'function'){
                    callback.call(null, o);
                }
            }
        };
        file.onerror = function(){
            throw new Error('TF script could not load: ' + filePath);
        };
        head.appendChild(file);
    }

    /**
     * Check if table has filters grid
     * @return {Boolean}
     */
    hasGrid(){
        return this._hasGrid;
    }

    /**
     * Get list of filter IDs
     * @return {[type]} [description]
     */
    getFiltersId(){
        return this.fltIds || [];
    }

    /**
     * Get filtered (valid) rows indexes
     * @param  {Boolean} reCalc Force calculation of filtered rows list
     * @return {Array}          List of row indexes
     */
    getValidRows(reCalc){
        if(!this._hasGrid){
            return;
        }
        if(!reCalc){
            return this.validRowsIndex;
        }

        this.validRowsIndex = [];
        for(let k=this.refRow; k<this.getRowsNb(true); k++){
            let r = this.tbl.rows[k];
            if(!this.paging){
                if(this.getRowDisplay(r) !== 'none'){
                    this.validRowsIndex.push(r.rowIndex);
                }
            } else {
                if(r.getAttribute('validRow') === 'true' ||
                    r.getAttribute('validRow') === null){
                    this.validRowsIndex.push(r.rowIndex);
                }
            }
        }
        return this.validRowsIndex;
    }

    /**
     * Get the index of the row containing the filters
     * @return {Number}
     */
    getFiltersRowIndex(){
        if(!this._hasGrid){
            return;
        }
        return this.filtersRowIndex;
    }

    /**
     * Get the index of the headers row
     * @return {Number}
     */
    getHeadersRowIndex(){
        if(!this._hasGrid){
            return;
        }
        return this.headersRow;
    }

    /**
     * Get the row index from where the filtering process start (1st filterable
     * row)
     * @return {Number}
     */
    getStartRowIndex(){
        if(!this._hasGrid){
            return;
        }
        return this.refRow;
    }

    /**
     * Get the index of the last row
     * @return {Number}
     */
    getLastRowIndex(){
        if(!this._hasGrid){
            return;
        }
        return (this.nbRows-1);
    }

    /**
     * Get the header DOM element for a given column index
     * @param  {Number} colIndex Column index
     * @return {Object}
     */
    getHeaderElement(colIndex){
        let table = this.gridLayout ? this.Cpt.gridLayout.headTbl : this.tbl;
        let tHead = Dom.tag(table, 'thead');
        let headersRow = this.headersRow;
        let header;
        for(let i=0; i<this.nbCells; i++){
            if(i !== colIndex){
                continue;
            }
            if(tHead.length === 0){
                header = table.rows[headersRow].cells[i];
            }
            if(tHead.length === 1){
                header = tHead[0].rows[headersRow].cells[i];
            }
            break;
        }
        return header;
    }

    /**
     * Get the configuration object (literal object)
     * @return {Object}
     */
    config(){
        return this.cfg;
    }

    /**
     * Get the total number of filterable rows
     * @return {Number}
     */
    getFilterableRowsNb(){
        return this.getRowsNb(false);
    }
}

TableFilter.Cookie = Cookie;
TableFilter.Store = Store;
TableFilter.GridLayout = GridLayout;
TableFilter.Loader = Loader;
TableFilter.HighlightKeyword = HighlightKeyword;
TableFilter.PopupFilter = PopupFilter;
TableFilter.Dropdown = Dropdown;
TableFilter.CheckList = CheckList;
TableFilter.RowsCounter = RowsCounter;
TableFilter.StatusBar = StatusBar;
TableFilter.Paging = Paging;
TableFilter.ClearButton = ClearButton;
TableFilter.Help = Help;
TableFilter.AlternateRows = AlternateRows;
TableFilter.ColOps = ColOps;

//Firefox does not support outerHTML property
// function setOuterHtml(){
//     if(doc.body.__defineGetter__){
//         if(HTMLElement) {
//             let element = HTMLElement.prototype;
//             if(element.__defineGetter__){
//                 element.__defineGetter__("outerHTML",
//                     function(){
//                         let parent = this.parentNode;
//                         let el = Dom.create(parent.tagName);
//                         el.appendChild(this);
//                         let shtml = el.innerHTML;
//                         parent.appendChild(this);
//                         return shtml;
//                     }
//                 );
//             }
//             if(element.__defineSetter__) {
//                 HTMLElement.prototype.__defineSetter__(
//                     "outerHTML", function(sHTML){
//                    let r = this.ownerDocument.createRange();
//                    r.setStartBefore(this);
//                    let df = r.createContextualFragment(sHTML);
//                    this.parentNode.replaceChild(df, this);
//                    return sHTML;
//                 });
//             }
//         }
//     }
// }

// return TableFilter;

// });

// }

/*====================================================
    - Sets filters grid bar
    - Calls TF Constructor and generates grid bar
    - Params:
            - id: table id (string)
            - refRow (optional): row index (number)
            - config (optional): configuration
            object (literal object)
    - Returns TF object
=====================================================*/
// function setFilterGrid(id){
//     if(arguments.length === 0){
//         return;
//     }
//     let tf = new TableFilter(arguments[0], arguments[1], arguments[2]);
//     tf.init();
//     window['tf_'+id] = tf;
//     return tf;
// }
