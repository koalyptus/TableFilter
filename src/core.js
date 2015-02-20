 /*------------------------------------------------------------------------
    - HTML Table Filter Generator v3.0
    - By Max Guglielmi (tablefilter.free.fr)
    - Licensed under the MIT License
---------------------------------------------------------------------------
    - Special credit to:
    Cedric Wartel, cnx.claude@free.fr, Florent Hirchy, Váry Péter,
    Anthony Maes, Nuovella Williams, Fuggerbit, Venkata Seshagiri Rao
    Raya, Piepiax, Manuel Kern, Baladhandayutham for active contribution
    and/or inspiration
------------------------------------------------------------------------ */
define(function (require) {

var global = this,
    evt = require('event').Event,
    dom = require('dom').Dom,
    str = require('string').Str,
    cookie = require('cookie').Cookie,
    types = require('types').Types,
    array = require('array').Arr,
    hlp = require('helpers').Helpers,
    dateHelper = require('date').DateHelper,
    isValidDate = dateHelper.isValid,
    formatDate = dateHelper.format,
    Sort = require('sort').Sort,
    doc = global.document;

/**
 * TF object constructor
 * @param {String} id Table id
 * @param {Number} row index indicating the 1st row
 * @param {Object} configuration object
 */
function TableFilter(id) {
    if(arguments.length === 0){ return; }

    this.id = id;
    this.version = '3.0';
    this.year = new Date().getFullYear();
    this.tbl = dom.id(id);
    this.startRow = null;
    this.refRow = null;
    this.headersRow = null;
    this.fObj = null;
    this.nbFilterableRows = null;
    this.nbRows = null;
    this.nbCells = null;
    this.hasGrid = false;
    this.enableModules = false;

    if(!this.tbl || str.lower(this.tbl.nodeName) !== 'table' ||
        this.GetRowsNb() === 0){
        throw new Error(
            'Could not instantiate TF object: HTML table not found.');
    }

    if(arguments.length>1){
        for(var i=0; i<arguments.length; i++){
            var arg = arguments[i];
            var argtype = typeof arg;
            switch(str.lower(argtype)){
                case 'number':
                    this.startRow = arg;
                break;
                case 'object':
                    this.fObj = arg;
                break;
            }
        }
    }

    // configuration object
    var f = this.fObj || {};

    //Start row et cols nb
    this.refRow = this.startRow===null ? 2 : (this.startRow+1);
    try{ this.nbCells = this.GetCellsNb(this.refRow); }
    catch(e){ this.nbCells = this.GetCellsNb(0); }

    //default script base path
    this.basePath = f.base_path!==undefined ? f.base_path : '';

    /*** filter types ***/
    this.fltTypeInp =           'input';
    this.fltTypeSlc =           'select';
    this.fltTypeMulti =         'multiple';
    this.fltTypeCheckList =     'checklist';
    this.fltTypeNone =          'none';
    this.fltCol =               []; //filter type of each column

    for(var j=0; j<this.nbCells; j++){
        var cfgCol = f['col_'+j];
        var col = !cfgCol ? this.fltTypeInp : str.lower(cfgCol);
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
        if(this.tbl.outerHTML===undefined){ setOuterHtml(); }
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

    //defines css class for div containing paging elements, rows counter etc.
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
    this.stylesheet = f.stylesheet || this.basePath+'filtergrid.css';
    this.stylesheetId = this.id + '_style';
    //defines css class for filters row
    this.fltsRowCssClass = f.flts_row_css_class || 'fltrow';
     //enables/disables icons (paging, reset button)
    this.enableIcons = f.enable_icons===false ? false : true;
    //enables/disbles rows alternating bg colors
    this.alternateBgs = f.alternate_rows===true ? true : false;
    //defines widths of columns
    this.hasColWidth = f.col_width===true ? true : false;
    this.colWidth = this.hasColWidth ? f.col_width : null;
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
    //enables/disables alternative fn call
    this.isModFilterFn = f.mod_filter_fn===true ? true : false;
    // used by tf_DetectKey fn
    this.modFilterFn = this.isModFilterFn ? f.mod_filter_fn : null;
    //calls function before filtering starts
    this.onBeforeFilter = types.isFn(f.on_before_filter) ?
        f.on_before_filter : null;
    //calls function after filtering
    this.onAfterFilter = types.isFn(f.on_after_filter) ?
        f.on_after_filter : null;
    //enables/disables case sensitivity
    this.matchCase = f.match_case===true ? true : false;
    //enables/disbles exact match for search
    this.exactMatch = f.exact_match===true ? true : false;
    //refreshes drop-down lists upon validation
    this.refreshFilters = f.refresh_filters===true ? true : false;
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
    //enables/disables status messages
    this.status = f.status===true ? true : false;
    //calls function when filters grid loaded
    this.onFiltersLoaded = types.isFn(f.on_filters_loaded) ?
        f.on_filters_loaded : null;
    //enables/disables single filter search
    this.singleSearchFlt = f.single_search_filter===true ? true : false;
    //calls function after row is validated
    this.onRowValidated = types.isFn(f.on_row_validated) ?
        f.on_row_validated : null;
    //array defining columns for customCellData event
    this.customCellDataCols = f.custom_cell_data_cols ?
        f.custom_cell_data_cols : [];
    //calls custom function for retrieving cell data
    this.customCellData = types.isFn(f.custom_cell_data) ?
        f.custom_cell_data : null;
    //input watermark text array
    this.inpWatermark = f.input_watermark || '';
    //defines css class for input watermark
    this.inpWatermarkCssClass = f.input_watermark_css_class ||
        'fltWatermark';
    this.isInpWatermarkArray = types.isArray(f.input_watermark);
    //id of toolbar container element
    this.toolBarTgtId = f.toolbar_target_id || null;
    //enables/disables help div
    this.helpInstructions = f.help_instructions || false;
    //popup filters
    this.popUpFilters = f.popup_filters===true ? true : false;
    //active columns color
    this.markActiveColumns = f.mark_active_columns===true ? true : false;
    //defines css class for active column header
    this.activeColumnsCssClass = f.active_columns_css_class ||
        'activeHeader';
    //calls function before active column header is marked
    this.onBeforeActiveColumn = types.isFn(f.on_before_active_column) ?
        f.on_before_active_column : null;
    //calls function after active column header is marked
    this.onAfterActiveColumn = types.isFn(f.on_after_active_column) ?
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
    this.hasCustomSlcOptions = types.isObj(f.custom_slc_options) ?
        true : false;
    this.customSlcOptions = types.isArray(f.custom_slc_options) ?
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
    this.onBeforeReset = types.isFn(f.on_before_reset) ?
        f.on_before_reset : null;
    //callback function after filters are cleared
    this.onAfterReset = types.isFn(f.on_after_reset) ?
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
    //indicates if tables was sorted
    this.sorted = false;
    this.sortConfig = f.sort_config || {};
    this.sortConfig.name = this.sortConfig['name']!==undefined ?
        f.sort_config.name : 'sortabletable';
    this.sortConfig.src = this.sortConfig['src']!==undefined ?
        f.sort_config.src : this.basePath+'sortabletable.js';
    this.sortConfig.adapterSrc =
        this.sortConfig['adapter_src']!==undefined ?
        f.sort_config.adapter_src :
        this.basePath+'tfAdapter.sortabletable.js';
    this.sortConfig.initialize =
        this.sortConfig['initialize']!==undefined ?
            f.sort_config.initialize :
            function(o){
                if(o.SetSortTable){ o.SetSortTable(); }
            };
    this.sortConfig.sortTypes =
        types.isArray(this.sortConfig['sort_types']) ?
        f.sort_config.sort_types : [];
    this.sortConfig.sortCol = this.sortConfig['sort_col']!==undefined ?
        f.sort_config.sort_col : null;
    this.sortConfig.asyncSort =
        this.sortConfig['async_sort']===true ? true : false;
    this.sortConfig.triggerIds =
        types.isArray(this.sortConfig['sort_trigger_ids']) ?
        f.sort_config.sort_trigger_ids : [];

    /*** ezEditTable extension ***/
    //enables/disables table selection feature
    this.selectable = f.selectable===true ? true : false;
    //enables/disables editable table feature
    this.editable = f.editable===true ? true : false;
    this.ezEditTableConfig = f.ezEditTable_config || {};
    this.ezEditTableConfig.name =
        this.ezEditTableConfig['name']!==undefined ?
        f.ezEditTable_config.name : 'ezedittable';
    this.ezEditTableConfig.src = this.ezEditTableConfig['src']!==undefined ?
        f.ezEditTable_config.src :
        this.basePath+'ezEditTable/ezEditTable.js';
    //ezEditTable stylesheet not imported by default as filtergrid.css
    //applies
    this.ezEditTableConfig.loadStylesheet =
        this.ezEditTableConfig['loadStylesheet']===true ? true : false;
    this.ezEditTableConfig.stylesheet =
        this.ezEditTableConfig['stylesheet'] ||
        this.basePath+'ezEditTable/ezEditTable.css';
    this.ezEditTableConfig.stylesheetName =
        this.ezEditTableConfig['stylesheetName']!==undefined ?
        f.ezEditTable_config.stylesheetName : 'ezEditTableCss';
    this.ezEditTableConfig.err = 'Failed to instantiate EditTable ' +
        'object.\n"ezEditTable" module may not be available.';

    /*** onkeyup event ***/
    //enables/disables onkeyup event, table is filtered when user stops
    //typing
    this.onKeyUp = f.on_keyup===true ? true : false;
    //onkeyup delay timer (msecs)
    this.onKeyUpDelay = !isNaN(f.on_keyup_delay) ?
        f.on_keyup_delay : 900;
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
    this.colNbFormat = types.isArray(this.hasColNbFormat) ?
        f.col_number_format : null;
    //enables date type per column
    this.hasColDateType = f.col_date_type===true ? true : false;
    //array containing columns date type
    this.colDateType = types.isArray(this.hasColDateType) ?
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
    //table container if fixed headers enabled
    this.prfxContentDiv = 'cont_';
    //checklist filter container div
    this.prfxCheckListDiv = 'chkdiv_';
    //pages select
    this.prfxSlcPages = 'slcPages_';
    //results per page select
    this.prfxSlcResults = 'slcResults_';
    //label preciding results per page select
    this.prfxSlcResultsTxt = 'slcResultsTxt_';
    //span containing next page button
    this.prfxBtnNextSpan = 'btnNextSpan_';
    //span containing previous page button
    this.prfxBtnPrevSpan = 'btnPrevSpan_';
    //span containing last page button
    this.prfxBtnLastSpan = 'btnLastSpan_';
    //span containing first page button
    this.prfxBtnFirstSpan = 'btnFirstSpan_';
    //next button
    this.prfxBtnNext = 'btnNext_';
    //previous button
    this.prfxBtnPrev = 'btnPrev_';
    //last button
    this.prfxBtnLast = 'btnLast_';
    //first button
    this.prfxBtnFirst = 'btnFirst_';
    //span for tot nb pages
    this.prfxPgSpan = 'pgspan_';
    //span preceding pages select (contains 'Page')
    this.prfxPgBeforeSpan = 'pgbeforespan_';
    //span following pages select (contains ' of ')
    this.prfxPgAfterSpan = 'pgafterspan_';
    //rows counter div
    this.prfxCounter = 'counter_';
    //nb displayed rows label
    this.prfxTotRows = 'totrows_span_';
    //label preceding nb rows label
    this.prfxTotRowsTxt = 'totRowsTextSpan_';
    //span containing reset button
    this.prfxResetSpan = 'resetspan_';
    //loader div
    this.prfxLoader = 'load_';
    //status bar div
    this.prfxStatus = 'status_';
    //status bar label
    this.prfxStatusSpan = 'statusSpan_';
    //text preceding status bar label
    this.prfxStatusTxt = 'statusText_';
    //filter values cookie
    this.prfxCookieFltsValues = 'tf_flts_';
    //page nb cookie
    this.prfxCookiePageNb = 'tf_pgnb_';
    //page length cookie
    this.prfxCookiePageLen = 'tf_pglen_';
    //div containing grid elements if grid_layout true
    this.prfxMainTblCont = 'gridCont_';
    //div containing table if grid_layout true
    this.prfxTblCont = 'tblCont_';
    //div containing headers table if grid_layout true
    this.prfxHeadTblCont = 'tblHeadCont_';
    //headers' table if grid_layout true
    this.prfxHeadTbl = 'tblHead_';
    //id of td containing the filter if grid_layout true
    this.prfxGridFltTd = '_td_';
    //id of th containing column header if grid_layout true
    this.prfxGridTh = 'tblHeadTh_';
    //id prefix for help elements
    this.prfxHelpSpan = 'helpSpan_';
    //id prefix for help elements
    this.prfxHelpDiv = 'helpDiv_';
    //id prefix for pop-up filter span
    this.prfxPopUpSpan = 'popUpSpan_';
    //id prefix for pop-up div containing filter
    this.prfxPopUpDiv = 'popUpDiv_';

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
    this.hasExtensions = f.extensions===true ? true : false;
    this.extensions = this.hasExtensions ? f.extensions : null;

    /*** themes ***/
    this.enableDefaultTheme = f.enable_default_theme===true ?
        true : false;
    //imports themes
    this.hasThemes = (f.enable_default_theme ||
        (f.themes && types.isObj(f.themes))) ? true : false;
    this.themes = this.hasThemes ? f.themes : null;
    //themes path
    this.themesPath = f.themes_path || this.basePath+'TF_Themes/';

    // Components
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
        help: null
    };

    /*** TF events ***/
    var o = this;
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
            loadthemes: 'LoadThemes'
        },
        getKeyCode: function(evt){
            return evt.charCode ? evt.charCode :
                (evt.keyCode ? evt.keyCode: (evt.which ? evt.which : 0));
        },
        /*====================================================
            - Detects <enter> key for a given element
        =====================================================*/
        _DetectKey: function(e) {
            if(!o.enterKey){ return; }
            var _evt = e || global.event;
            if(_evt){
                var key = o.Evt.getKeyCode(_evt);
                if(key===13){
                    o._Filter();
                    evt.cancel(_evt);
                    evt.stop(_evt);
                } else {
                    o.isUserTyping = true;
                    global.clearInterval(o.onKeyUpTimer);
                    o.onKeyUpTimer = undefined;
                }
            }//if evt
        },
        /*====================================================
            - onkeyup event for text filters
        =====================================================*/
        _OnKeyUp: function(e) {
            if(!o.onKeyUp){
                return;
            }
            var _evt = e || global.event;
            var key = o.Evt.getKeyCode(_evt);
            o.isUserTyping = false;

            function filter() {
                global.clearInterval(o.onKeyUpTimer);
                o.onKeyUpTimer = undefined;
                if(!o.isUserTyping){
                    o.Filter();
                    o.isUserTyping = null;
                }
            }

            if(key!==13 && key!==9 && key!==27 && key!==38 && key!==40) {
                if(o.onKeyUpTimer===undefined){
                    o.onKeyUpTimer = global.setInterval(filter, o.onKeyUpDelay);
                }
            } else {
                global.clearInterval(o.onKeyUpTimer);
                o.onKeyUpTimer = undefined;
            }
        },
        /*====================================================
            - onkeydown event for input filters
        =====================================================*/
        _OnKeyDown: function(e) {
            if(!o.onKeyUp) { return; }
            o.isUserTyping = true;
        },
        /*====================================================
            - onblur event for input filters
        =====================================================*/
        _OnInpBlur: function(e) {
            if(o.onKeyUp){
                o.isUserTyping = false;
                global.clearInterval(o.onKeyUpTimer);
            }
            //Watermark
            if(this.value === '' && o.inpWatermark !== ''){
                this.value = (o.isInpWatermarkArray) ?
                    o.inpWatermark[this.getAttribute('ct')] :
                    o.inpWatermark;
                dom.addClass(this, o.inpWatermarkCssClass);
            }
            if(o.ezEditTable){
                if(o.editable){
                    o.ezEditTable.Editable.Set();
                }
                if(o.selectable){
                    o.ezEditTable.Selection.Set();
                }
            }
        },
        /*====================================================
            - onfocus event for input filters
        =====================================================*/
        _OnInpFocus: function(e) {
            var _evt = e || global.event;
            o.activeFilterId = this.getAttribute('id');
            o.activeFlt = dom.id(o.activeFilterId);
            //Watermark
            if(!o.isInpWatermarkArray){
                if(this.value === o.inpWatermark &&
                    o.inpWatermark !== ''){
                    this.value = '';
                    dom.removeClass(this, o.inpWatermarkCssClass);
                }
            } else {
                var inpWatermark = o.inpWatermark[this.getAttribute('ct')];
                if(this.value === inpWatermark && inpWatermark !== ''){
                    this.value = '';
                    dom.removeClass(this, o.inpWatermarkCssClass);
                }
            }
            if(o.popUpFilters){
                evt.cancel(_evt);
                evt.stop(_evt);
            }
            if(o.ezEditTable){
                if(o.editable){
                    o.ezEditTable.Editable.Remove();
                }
                if(o.selectable){
                    o.ezEditTable.Selection.Remove();
                }
            }
        },
        /*====================================================
            - onfocus event for select filters
        =====================================================*/
        _OnSlcFocus: function(e) {
            var _evt = e || global.event;
            o.activeFilterId = this.getAttribute('id');
            o.activeFlt = dom.id(o.activeFilterId);
            // select is populated when element has focus
            if(o.fillSlcOnDemand && this.getAttribute('filled') === '0'){
                var ct = this.getAttribute('ct');
                o.Cpt.dropdown._build(ct);
            }
            if(o.popUpFilters){
                evt.cancel(_evt);
                evt.stop(_evt);
            }
        },
        /*====================================================
            - onchange event for select filters
        =====================================================*/
        _OnSlcChange: function(e) {
            if(!o.activeFlt){ return; }
            var colIndex = o.activeFlt.getAttribute('colIndex');
            //Checks filter is a checklist and caller is not null
            // if(o.activeFlt && colIndex &&
            //     o['col'+colIndex]===o.fltTypeCheckList &&
            //     !o.Evt._OnSlcChange.caller){ return; }
            var _evt = e || global.event;
            if(o.popUpFilters){ evt.stop(_evt); }
            if(o.onSlcChange){ o.Filter(); }
        },
        /*====================================================
            - onblur event for select filters
        =====================================================*/
        _OnSlcBlur: function(e) {},
        /*====================================================
            - onclick event for checklist filters
        =====================================================*/
        _OnCheckListClick: function() {
            if(o.fillSlcOnDemand && this.getAttribute('filled') === '0'){
                var ct = this.getAttribute('ct');
                o.Cpt.checkList._build(ct);
                o.Cpt.checkList.checkListDiv[ct].onclick = null;
                o.Cpt.checkList.checkListDiv[ct].title = '';
            }
        },
        /*====================================================
            - onclick event for checklist filter container
        =====================================================*/
        _OnCheckListFocus: function(e) {
            o.activeFilterId = this.firstChild.getAttribute('id');
            o.activeFlt = dom.id(o.activeFilterId);
        },
        _OnCheckListBlur: function(e){},
        /*====================================================
            - onclick event for validation button
            (btn property)
        =====================================================*/
        _OnBtnClick: function() {
            o.Filter();
        },
        _OnSlcPagesChangeEvt: null, //used by sort adapter
        /*====================================================
            - onclick event slc parent node (enables filters)
            IE only
        =====================================================*/
        _EnableSlc: function() {
            this.firstChild.disabled = false;
            this.firstChild.focus();
            this.onclick = null;
        },

        _Paging: { //used by sort adapter
            nextEvt: null,
            prevEvt: null,
            lastEvt: null,
            firstEvt: null
        }
    };
}

TableFilter.prototype = {
    /*====================================================
        - adds row with filtering grid bar and sets grid
        behaviours and layout
    =====================================================*/
    init: function(){
        if(this.hasGrid){
            return;
        }
        if(this.gridLayout){
            this.refRow = this.startRow===null ? 0 : this.startRow;
        }
        if(this.popUpFilters &&
            ((this.filtersRowIndex === 0 && this.headersRow === 1) ||
            this.gridLayout)){
            this.headersRow = 0;
        }
        var f = this.fObj || {},
            n = this.singleSearchFlt ? 1 : this.nbCells,
            inpclass;

        if(window['tf_'+this.id] === undefined){
            window['tf_'+this.id] = this;
        }

        //loads stylesheet if not imported
        //Issues with browsers != IE, IE rules in this case
        this.IncludeFile(this.stylesheetId, this.stylesheet, null, 'link');

        //loads theme
        if(this.hasThemes){ this._LoadThemes(); }

        if(this.rememberGridValues || this.rememberPageNb ||
            this.rememberPageLen){
            var Store = require('modules/store').Store;
            this.Cpt.store = new Store(this);
        }

        if(this.gridLayout){
            var GridLayout = require('modules/gridLayout').GridLayout;
            this.Cpt.gridLayout = new GridLayout(this);
            this.Cpt.gridLayout.init();
        }

        if(this.loader){
            if(!this.Cpt.loader){
                var Loader = require('modules/loader').Loader;
                this.Cpt.loader = new Loader(this);
            }
        }

        if(this.highlightKeywords){
            var Highlight =
                require('modules/highlightKeywords').HighlightKeyword;
            this.Cpt.highlightKeyword = new Highlight(this);
        }

        if(this.popUpFilters){
            if(!this.Cpt.popupFilter){
                var PopupFilter = require('modules/popupFilter').PopupFilter;
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
            this.nbFilterableRows = this.GetRowsNb();
            this.nbVisibleRows = this.nbFilterableRows;
            this.nbRows = this.nbFilterableRows + this.refRow;
        } else {
            if(this.isFirstLoad){
                var fltrow;
                if(!this.gridLayout){
                    var thead = dom.tag(this.tbl,'thead');
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

                this.nbFilterableRows = this.GetRowsNb();
                this.nbVisibleRows = this.nbFilterableRows;
                this.nbRows = this.tbl.rows.length;

                for(var i=0; i<n; i++){// this loop adds filters

                    if(this.popUpFilters){
                        this.Cpt.popupFilter.build(i);
                    }

                    var fltcell = dom.create(this.fltCellTag),
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
                            this.fltTypeInp : str.lower(f['col_'+i]);
                    }

                    //only 1 input for single search
                    if(this.singleSearchFlt){
                        col = this.fltTypeInp;
                        inpclass = this.singleFltCssClass;
                    }

                    //drop-down filters
                    if(col===this.fltTypeSlc || col===this.fltTypeMulti){
                        var dropdown;
                        if(!this.Cpt.dropdown){
                            var Dropdown = require('modules/dropdown').Dropdown;
                            dropdown = new Dropdown(this);
                        }
                        this.Cpt.dropdown = dropdown;

                        var slc = dom.create(this.fltTypeSlc,
                                ['id', this.prfxFlt+i+'_'+this.id],
                                ['ct', i], ['filled', '0']
                            );

                        if(col===this.fltTypeMulti){
                            slc.multiple = this.fltTypeMulti;
                            slc.title = dropdown.multipleSlcTooltip;
                        }
                        slc.className = str.lower(col)===this.fltTypeSlc ?
                            inpclass : this.fltMultiCssClass;// for ie<=6

                        //filter is appended in desired external element
                        if(externalFltTgtId){
                            dom.id(externalFltTgtId).appendChild(slc);
                            this.externalFltEls.push(slc);
                        } else {
                            fltcell.appendChild(slc);
                        }

                        this.fltIds.push(this.prfxFlt+i+'_'+this.id);

                        if(!this.fillSlcOnDemand){
                            dropdown._build(i);
                        }

                        evt.add(slc, 'keypress', this.Evt._DetectKey);
                        evt.add(slc, 'change', this.Evt._OnSlcChange);
                        evt.add(slc, 'focus', this.Evt._OnSlcFocus);
                        evt.add(slc, 'blur', this.Evt._OnSlcBlur);

                        //1st option is created here since dropdown.build isn't
                        //invoked
                        if(this.fillSlcOnDemand){
                            var opt0 = dom.createOpt(this.displayAllText, '');
                            slc.appendChild(opt0);
                        }
                    }
                    // checklist
                    else if(col===this.fltTypeCheckList){
                        if(!this.Cpt.checkList){
                            var CheckList =
                                    require('modules/checkList').CheckList;
                            this.Cpt.checkList = new CheckList(this);
                        }

                        var divCont = dom.create('div',
                            ['id',this.prfxCheckListDiv+i+'_'+this.id],
                            ['ct',i],['filled','0']);
                        divCont.className =
                            this.Cpt.checkList.checkListDivCssClass;

                        //filter is appended in desired element
                        if(externalFltTgtId){
                            dom.id(externalFltTgtId).appendChild(divCont);
                            this.externalFltEls.push(divCont);
                        } else {
                            fltcell.appendChild(divCont);
                        }

                        this.Cpt.checkList.checkListDiv[i] = divCont;
                        this.fltIds.push(this.prfxFlt+i+'_'+this.id);
                        if(!this.fillSlcOnDemand){
                            this.Cpt.checkList._build(i);
                        }

                        if(this.fillSlcOnDemand){
                            evt.add(
                                divCont, 'click', this.Evt._OnCheckListClick);
                            divCont.appendChild(
                                dom.text(
                                    this.Cpt.checkList.activateCheckListTxt));
                        }

                        evt.add(divCont, 'click', this.Evt._OnCheckListFocus);
                    }

                    else{
                        //show/hide input
                        var inptype = col===this.fltTypeInp ? 'text' : 'hidden';
                        var inp = dom.create(this.fltTypeInp,
                            ['id',this.prfxFlt+i+'_'+this.id],
                            ['type',inptype],['ct',i]);
                        if(inptype!='hidden'){
                            inp.value = (this.isInpWatermarkArray) ?
                                this.inpWatermark[i] : this.inpWatermark;
                        }
                        inp.className = inpclass;// for ie<=6
                        if(this.inpWatermark !== ''){
                            //watermark css class
                            dom.addClass(inp, this.inpWatermarkCssClass);
                        }
                        inp.onfocus = this.Evt._OnInpFocus;

                        //filter is appended in desired element
                        if(externalFltTgtId){
                            dom.id(externalFltTgtId).appendChild(inp);
                            this.externalFltEls.push(inp);
                        } else {
                            fltcell.appendChild(inp);
                        }

                        this.fltIds.push(this.prfxFlt+i+'_'+this.id);

                        inp.onkeypress = this.Evt._DetectKey;
                        inp.onkeydown = this.Evt._OnKeyDown;
                        inp.onkeyup = this.Evt._OnKeyUp;
                        inp.onblur = this.Evt._OnInpBlur;

                        if(this.rememberGridValues){
                            var flts_values = this.Cpt.store.getFilterValues(
                                this.fltsValuesCookie);
                            if(flts_values[i]!=' '){
                                this.SetFilterValue(i,flts_values[i],false);
                            }
                        }
                    }
                    // this adds submit button
                    if(i==n-1 && this.displayBtn){
                        var btn = dom.create(this.fltTypeInp,
                            ['id',this.prfxValButton+i+'_'+this.id],
                            ['type','button'], ['value',this.btnText]);
                        btn.className = this.btnCssClass;

                        //filter is appended in desired element
                        if(externalFltTgtId){
                            dom.id(externalFltTgtId).appendChild(btn);
                        } else{
                            fltcell.appendChild(btn);
                        }

                        btn.onclick = this.Evt._OnBtnClick;
                    }//if

                }// for i

            } else {
                this.__resetGrid();
            }//if isFirstLoad

        }//if this.fltGrid

        /* Filter behaviours */
        if(this.rowsCounter){
            var RowsCounter = require('modules/rowsCounter').RowsCounter;
            this.Cpt.rowsCounter = new RowsCounter(this);
            this.Cpt.rowsCounter.init();
        }
        if(this.statusBar){
            this.SetStatusBar();
        }
        if(this.paging){
            var Paging = require('modules/paging').Paging;
            this.Cpt.paging = new Paging(this);
            this.Cpt.paging.init();
        }
        if(this.btnReset){
            var ClearButton = require('modules/clearButton').ClearButton;
            this.Cpt.clearButton = new ClearButton(this);
            this.Cpt.clearButton.init();
        }
        if(this.helpInstructions){
            var Help = require('modules/help').Help;
            this.Cpt.help = new Help(this);
            this.Cpt.help.init();
        }
        if(this.hasColWidth && !this.gridLayout){
            this.SetColWidths();
        }
        if(this.alternateBgs){
            //1st time only if no paging and rememberGridValues
            var AlternateRows = require('modules/alternateRows').AlternateRows;
            this.Cpt.alternateRows = new AlternateRows(this);
            this.Cpt.alternateRows.init();
        }
        if(this.hasColOperation){
            var ColOps = require('modules/colOps').ColOps;
            this.Cpt.colOps = new ColOps(this);
            this.Cpt.colOps.calc();
        }
        if(this.sort || this.gridLayout){
            this.SetSort();
        }
        if(this.selectable || this.editable){
            this.SetEditable();
        }

        this.isFirstLoad = false;
        this.hasGrid = true;

        if(this.rememberGridValues || this.rememberPageLen ||
            this.rememberPageNb){
            this.ResetValues();
        }

        //TF css class is added to table
        if(!this.gridLayout){
            dom.addClass(this.tbl, this.prfxTf);
        }

        if(this.loader){
            this.Cpt.loader.show('none');
        }

        /* Loads extensions */
        if(this.hasExtensions){
            this.LoadExtensions();
        }

        if(this.onFiltersLoaded){
            this.onFiltersLoaded.call(null, this);
        }

    },// AddGrid

    /*====================================================
        - TF events manager
        - Params:
            - event name (string)
            - config object (optional literal object)
    =====================================================*/
    EvtManager: function(evt, s){
        var o = this;
        var slcIndex = s && s.slcIndex!==undefined ? s.slcIndex : null;
        var slcExternal = s && s.slcExternal!==undefined ?
            s.slcExternal : false;
        var slcId = s && s.slcId!==undefined ? s.slcId : null;
        var pgIndex = s && s.pgIndex!==undefined ? s.pgIndex : null;

        function efx(){
            if(!evt){ return; }
            switch(evt){
                case o.Evt.name.filter:
                    if(o.isModFilterFn){
                        o.modFilterFn.call(null,o);
                    } else {
                        o._Filter();
                    }
                break;
                case o.Evt.name.dropdown:
                    if(o.refreshFilters){
                        o.Cpt.dropdown._build(slcIndex, true);
                    } else {
                        o.Cpt.dropdown._build(
                            slcIndex, false, slcExternal, slcId);
                    }
                break;
                case o.Evt.name.checklist:
                    o.Cpt.checkList._build(slcIndex, slcExternal, slcId);
                break;
                case o.Evt.name.changepage:
                    o.Cpt.paging._changePage(pgIndex);
                break;
                case o.Evt.name.clear:
                    o._ClearFilters();
                    o._Filter();
                break;
                case o.Evt.name.changeresultsperpage:
                    o.Cpt.paging._changeResultsPerPage();
                break;
                case o.Evt.name.resetvalues:
                    o._ResetValues();
                    o._Filter();
                break;
                case o.Evt.name.resetpage:
                    o.Cpt.paging._resetPage(o.pgNbCookie);
                break;
                case o.Evt.name.resetpagelength:
                    o.Cpt.paging._resetPageLength(o.pgLenCookie);
                break;
                case o.Evt.name.sort:
                    void(0);
                break;
                case o.Evt.name.loadextensions:
                    o._LoadExtensions();
                break;
                case o.Evt.name.loadthemes:
                    o._LoadThemes();
                break;
                default: //to be used by extensions events when needed
                    o['_'+evt].call(null,o,s);
                break;
            }
            if(o.status || o.statusBar){
                o.StatusMsg('');
            }
            if(o.loader){
                o.Cpt.loader.show('none');
            }
        }

        if(this.loader || this.status || this.statusBar) {
            try{
                this.Cpt.loader.show('');
                this.StatusMsg(o['msg'+evt]);
            } catch(e){}
            global.setTimeout(efx, this.execDelay);
        } else {
            efx();
        }
    },

    ImportModule: function(module){
        if(!module.path || !module.name){
            return;
        }
        this.IncludeFile(module.name, module.path, module.init);
    },

    LoadExtensions : function(){
        if(!this.Ext){
            /*** TF extensions ***/
            var o = this;
            this.Ext = {
                list: {},
                add: function(extName, extDesc, extPath, extCallBack){
                    var file = extPath.split('/')[extPath.split('/').length-1],
                        re = new RegExp(file),
                        path = extPath.replace(re,'');
                    o.Ext.list[extName] = {
                        name: extName,
                        description: extDesc,
                        file: file,
                        path: path,
                        callback: extCallBack
                    };
                }
            };
        }
        this.EvtManager(this.Evt.name.loadextensions);
    },

    /*====================================================
        - loads TF extensions
    =====================================================*/
    _LoadExtensions : function(){
        if(!this.hasExtensions || !types.isArray(this.extensions.name) ||
            !types.isArray(this.extensions.src)){
            return;
        }
        var ext = this.extensions;
        for(var e=0; e<ext.name.length; e++){
            var extPath = ext.src[e],
                extName = ext.name[e],
                extInit = (ext.initialize && ext.initialize[e]) ?
                    ext.initialize[e] : null,
                extDesc = (ext.description && ext.description[e] ) ?
                    ext.description[e] : null;

            //Registers extension
            this.Ext.add(extName, extDesc, extPath, extInit);
            if(isImported(extPath)){
                extInit.call(null,this);
            } else {
                this.IncludeFile(extName, extPath, extInit);
            }
        }
    },

    LoadThemes: function(){
        this.EvtManager(this.Evt.name.loadthemes);
    },

    /*====================================================
        - loads TF themes
    =====================================================*/
    _LoadThemes: function(){
        if(!this.hasThemes){
            return;
        }
        if(!this.Thm){
            /*** TF themes ***/
            var o = this;
            this.Thm = {
                list: {},
                add: function(thmName, thmDesc, thmPath, thmCallBack){
                    var file = thmPath.split('/')[thmPath.split('/').length-1],
                        re = new RegExp(file),
                        path = thmPath.replace(re,'');
                    o.Thm.list[thmName] = {
                        name: thmName,
                        description: thmDesc,
                        file: file,
                        path: path,
                        callback: thmCallBack
                    };
                }
            };
        }

        //Default theme config
        if(this.enableDefaultTheme){
            this.themes = {
                name:['DefaultTheme'],
                src:[this.themesPath+'Default/TF_Default.css'],
                description:['Default Theme']
            };
            this.Thm.add('DefaultTheme',
                this.themesPath+'Default/TF_Default.css', 'Default Theme');
        }
        if(types.isArray(this.themes.name) &&
            types.isArray(this.themes.src)){
            var thm = this.themes;
            for(var i=0; i<thm.name.length; i++){
                var thmPath = thm.src[i],
                    thmName = thm.name[i],
                    thmInit = (thm.initialize && thm.initialize[i]) ?
                        thm.initialize[i] : null,
                    thmDesc = (thm.description && thm.description[i]) ?
                        thm.description[i] : null;

                //Registers theme
                this.Thm.add(thmName, thmDesc, thmPath, thmInit);

                if(!isImported(thmPath,'link')){
                    this.IncludeFile(thmName, thmPath, null, 'link');
                }
                if(types.isFn(thmInit)){
                    thmInit.call(null,this);
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
    },

    /*====================================================
        - removes a filter grid
    =====================================================*/
    RemoveGrid: function(){
        if(this.fltGrid && this.hasGrid){
            var rows = this.tbl.rows;
            if(this.paging){
                this.Cpt.paging.destroy();
            }
            if(this.statusBar){
                this.RemoveStatusBar();
            }
            if(this.rowsCounter){
                this.Cpt.rowsCounter.destroy();
            }
            if(this.btnReset){
                // this.RemoveResetBtn();
                this.Cpt.clearButton.destroy();
            }
            if(this.helpInstructions /*|| !this.helpInstructions*/){
                this.Cpt.help.destroy();
            }
            if(this.isExternalFlt && !this.popUpFilters){
                this.RemoveExternalFlts();
            }
            if(this.infDiv){
                this.RemoveTopDiv();
            }
            if(this.highlightKeywords){
                this.Cpt.highlightKeyword.unhighlightAll();
            }
            if(this.sort){
                this.RemoveSort();
            }
            if(this.loader){
                this.Cpt.loader.remove();
            }
            if(this.popUpFilters){
                this.Cpt.popupFilter.destroy();
            }
            if(this.markActiveColumns){
                this.ClearActiveColumns();
            }
            if(this.editable || this.selectable){
                this.RemoveEditable();
            }
            //this loop shows all rows and removes validRow attribute
            for(var j=this.refRow; j<this.nbRows; j++){
                rows[j].style.display = '';
                try{
                    if(rows[j].hasAttribute('validRow')){
                        rows[j].removeAttribute('validRow');
                    }
                } catch(e) {
                    //ie<=6 doesn't support hasAttribute method
                    var row = rows[j];
                    var attribs = row.attributes;
                    for(var x = 0; x < attribs.length; x++){
                        if(str.lower(attribs.nodeName)==='validrow'){
                            row.removeAttribute('validRow');
                        }
                    }
                }

                //removes alternating colors
                if(this.alternateBgs){
                    this.Cpt.alternateRows.removeRowBg(j);
                }

            }//for j

            if(this.fltGrid && !this.gridLayout){
                this.fltGridEl = rows[this.filtersRowIndex];
                this.tbl.deleteRow(this.filtersRowIndex);
            }
            if(this.gridLayout){
                this.Cpt.gridLayout.destroy();
            }
            dom.removeClass(this.tbl, this.prfxTf);
            this.activeFlt = null;
            this.isStartBgAlternate = true;
            this.hasGrid = false;

        }//if this.fltGrid
    },

    /*====================================================
        - Generates div above table where paging,
        reset button, rows counter label etc. are placed
    =====================================================*/
    SetTopDiv: function(){
        if(this.infDiv!==null){
            return;
        }

        /*** container div ***/
        var infdiv = dom.create('div', ['id',this.prfxInfDiv+this.id]);
        infdiv.className = this.infDivCssClass;

        //custom container
        if(this.toolBarTgtId){
            dom.id(this.toolBarTgtId).appendChild(infdiv);
        }
        //grid-layout
        else if(this.gridLayout){
            this.Cpt.gridLayout.tblMainCont.appendChild(infdiv);
            infdiv.className = this.gridInfDivCssClass;
        }
        //default location: just above the table
        else{
            this.tbl.parentNode.insertBefore(infdiv, this.tbl);
        }
        this.infDiv = dom.id(this.prfxInfDiv+this.id);

        /*** left div containing rows # displayer ***/
        var ldiv = dom.create('div', ['id',this.prfxLDiv+this.id]);
        ldiv.className = this.lDivCssClass;
        infdiv.appendChild(ldiv);
        this.lDiv = dom.id(this.prfxLDiv+this.id);

        /***    right div containing reset button
                + nb results per page select    ***/
        var rdiv = dom.create('div', ['id',this.prfxRDiv+this.id]);
        rdiv.className = this.rDivCssClass;
        infdiv.appendChild(rdiv);
        this.rDiv = dom.id(this.prfxRDiv+this.id);

        /*** mid div containing paging elements ***/
        var mdiv = dom.create('div', ['id',this.prfxMDiv+this.id]);
        mdiv.className = this.mDivCssClass;
        infdiv.appendChild(mdiv);
        this.mDiv = dom.id(this.prfxMDiv+this.id);

        // Enable help instructions by default is topbar is generated
        if(!this.helpInstructions){
            if(!this.Cpt.help){
                var Help = require('modules/help').Help;
                this.Cpt.help = new Help(this);
            }
            this.Cpt.help.init();
        }
    },

    /*====================================================
        - Removes div above table where paging,
        reset button, rows counter label etc. are placed
    =====================================================*/
    RemoveTopDiv: function(){
        if(!this.infDiv){
            return;
        }
        this.infDiv.parentNode.removeChild(this.infDiv);
        this.infDiv = null;
    },

    /*====================================================
        - removes external filters
    =====================================================*/
    RemoveExternalFlts: function(){
        if(!this.isExternalFlt && !this.externalFltTgtIds){
            return;
        }
        for(var ct=0; ct<this.externalFltTgtIds.length; ct++){
            var externalFltTgtId = this.externalFltTgtIds[ct],
                externalFlt = dom.id(externalFltTgtId);
            if(externalFlt){
                externalFlt.innerHTML = '';
            }
        }
    },

    /*====================================================
        - Sets sorting feature by loading
        WebFX Sortable Table 1.12 plugin by Erik Arvidsson
        and TF adapter by Max Guglielmi
    =====================================================*/
    SetSort: function(){
        var fn = this.Evt._EnableSort,
            sortConfig = this.sortConfig;

        if(!types.isFn(fn)){
            var o = this;
            /*====================================================
                - enables table sorting
            =====================================================*/
            this.Evt._EnableSort = function(){
                //gridLayout needs sort to be re-enabled
                if(o.isSortEnabled && !o.gridLayout){
                    return;
                }
                if(isImported(sortConfig.adapterSrc)){
                    sortConfig.initialize.call(null,o);
                } else {
                    o.IncludeFile(
                        sortConfig.name+'_adapter',
                        sortConfig.adapterSrc,
                        function(){ sortConfig.initialize.call(null,o); }
                    );
                }
            };
        }

        if(isImported(this.sortConfig.src)){
            this.Evt._EnableSort();
        } else {
            this.IncludeFile(
                sortConfig.name, sortConfig.src,this.Evt._EnableSort);
        }
    },

    /*====================================================
        - removes sorting feature
    =====================================================*/
    RemoveSort: function(){
        this.sort = false;
    },

    Sort: function(){
        this.EvtManager(this.Evt.name.sort);
    },

    /*====================================================
        - Sets selection or edition features by loading
        ezEditTable script by Max Guglielmi
    =====================================================*/
    SetEditable: function(){
        var ezEditConfig = this.ezEditTableConfig;
        if(isImported(ezEditConfig.src)){
            this._EnableEditable();
        } else {
            this.IncludeFile(
                ezEditConfig.name,
                ezEditConfig.src,
                this._EnableEditable
            );
        }
        if(ezEditConfig.loadStylesheet &&
            !isImported(ezEditConfig.stylesheet, 'link')){
            this.IncludeFile(
                ezEditConfig.stylesheetName,
                ezEditConfig.stylesheet, null, 'link'
            );
        }
    },

    /*====================================================
        - Removes selection or edition features
    =====================================================*/
    RemoveEditable: function(){
        var ezEditTable = this.ezEditTable;
        if(ezEditTable){
            if(this.selectable){
                ezEditTable.Selection.ClearSelections();
                ezEditTable.Selection.Remove();
            }
            if(this.editable){
                ezEditTable.Editable.Remove();
            }
        }
    },

    /*====================================================
        - Resets selection or edition features after
        removal
    =====================================================*/
    ResetEditable: function(){
        var ezEditTable = this.ezEditTable;
        if(ezEditTable){
            if(this.selectable){
                ezEditTable.Selection.Set();
            }
            if(this.editable){
                ezEditTable.Editable.Set();
            }
        }
    },

    _EnableEditable: function(o){
        if(!o){
            o = this;
        }

        //start row for EditTable constructor needs to be calculated
        var startRow,
            ezEditConfig = o.ezEditTableConfig,
            thead = dom.tag(o.tbl,'thead');

        //if thead exists and startRow not specified, startRow is calculated
        //automatically by EditTable
        if(thead.length > 0 && !ezEditConfig.startRow){
            startRow = undefined;
        }
        //otherwise startRow config property if any or TableFilter refRow
        else{
            startRow = ezEditConfig.startRow || o.refRow;
        }

        ezEditConfig.scroll_into_view = ezEditConfig.scroll_into_view===false ?
            false : true;
        ezEditConfig.base_path = ezEditConfig.base_path  ||
            o.basePath + 'ezEditTable/';
        ezEditConfig.editable = o.editable = o.fObj.editable;
        ezEditConfig.selection = o.selectable = o.fObj.selectable;

        if(o.selectable){
            ezEditConfig.default_selection =
                ezEditConfig.default_selection || 'row';
        }
        //CSS Styles
        ezEditConfig.active_cell_css = ezEditConfig.active_cell_css ||
            'ezETSelectedCell';

        o._lastValidRowIndex = 0;
        o._lastRowIndex = 0;

        if(o.selectable){
            //Row navigation needs to be calculated according to TableFilter's
            //validRowsIndex array
            var onAfterSelection = function(et, selectedElm, e){
                //table is not filtered
                if(!o.validRowsIndex){
                    return;
                }
                var validIndexes = o.validRowsIndex,
                    validIdxLen = validIndexes.length,
                    row = et.defaultSelection !== 'row' ?
                        selectedElm.parentNode : selectedElm,
                    //cell for default_selection = 'both' or 'cell'
                    cell = selectedElm.nodeName==='TD' ? selectedElm : null,
                    keyCode = e !== undefined ? et.Event.GetKey(e) : 0,
                    isRowValid = array.has(validIndexes, row.rowIndex),
                    nextRowIndex,
                    //pgup/pgdown keys
                    d = (keyCode === 34 || keyCode === 33 ?
                        (o.pagingLength || et.nbRowsPerPage) : 1);

                //If next row is not valid, next valid filtered row needs to be
                //calculated
                if(!isRowValid){
                    //Selection direction up/down
                    if(row.rowIndex>o._lastRowIndex){
                        //last row
                        if(row.rowIndex >= validIndexes[validIdxLen-1]){
                            nextRowIndex = validIndexes[validIdxLen-1];
                        } else {
                            var calcRowIndex = (o._lastValidRowIndex + d);
                            if(calcRowIndex > (validIdxLen-1)){
                                nextRowIndex = validIndexes[validIdxLen-1];
                            } else {
                                nextRowIndex = validIndexes[calcRowIndex];
                            }
                        }
                    } else{
                        //first row
                        if(row.rowIndex <= validIndexes[0]){
                            nextRowIndex = validIndexes[0];
                        } else {
                            var v = validIndexes[o._lastValidRowIndex - d];
                            nextRowIndex = v ? v : validIndexes[0];
                        }
                    }
                    o._lastRowIndex = row.rowIndex;
                    DoSelection(nextRowIndex);
                } else {
                    //If filtered row is valid, special calculation for
                    //pgup/pgdown keys
                    if(keyCode!==34 && keyCode!==33){
                        o._lastValidRowIndex = array.indexByValue(validIndexes,
                            row.rowIndex);
                        o._lastRowIndex = row.rowIndex;
                    } else {
                        if(keyCode === 34){ //pgdown
                            //last row
                            if((o._lastValidRowIndex + d) <= (validIdxLen-1)){
                                nextRowIndex = validIndexes[
                                o._lastValidRowIndex + d];
                            } else {
                                nextRowIndex = [validIdxLen-1];
                            }
                        } else { //pgup
                            //first row
                            if((o._lastValidRowIndex - d) <= validIndexes[0]){
                                nextRowIndex = validIndexes[0];
                            } else {
                                nextRowIndex = validIndexes[
                                    o._lastValidRowIndex - d];
                            }
                        }
                        o._lastRowIndex = nextRowIndex;
                        o._lastValidRowIndex = array.indexByValue(validIndexes,
                            nextRowIndex);
                        DoSelection(nextRowIndex);
                    }
                }

                //Next valid filtered row needs to be selected
                var DoSelection = function(nextRowIndex){
                    if(et.defaultSelection === 'row'){
                        et.Selection.SelectRowByIndex(nextRowIndex);
                    } else {
                        et.ClearSelections();
                        var cellIndex = selectedElm.cellIndex,
                            row = o.tbl.rows[nextRowIndex];
                        if(et.defaultSelection === 'both'){
                            et.Selection.SelectRowByIndex(nextRowIndex);
                        }
                        if(row){
                            et.Selection.SelectCell(row.cells[cellIndex]);
                        }
                    }
                    //Table is filtered
                    if(o.validRowsIndex.length !== o.GetRowsNb()){
                        var r = o.tbl.rows[nextRowIndex];
                        if(r){
                            r.scrollIntoView(false);
                        }
                        if(cell){
                            if(cell.cellIndex===(o.GetCellsNb()-1) &&
                                o.gridLayout){
                                o.tblCont.scrollLeft = 100000000;
                            }
                            else if(cell.cellIndex===0 && o.gridLayout){
                                o.tblCont.scrollLeft = 0;
                            } else {
                                cell.scrollIntoView(false);
                            }
                        }
                    }
                };
            };

            //Page navigation has to be enforced whenever selected row is out of
            //the current page range
            var onBeforeSelection = function(et, selectedElm, e){
                var row = et.defaultSelection !== 'row' ?
                    selectedElm.parentNode : selectedElm;
                if(o.paging){
                    if(o.nbPages>1){
                        //page length is re-assigned in case it has changed
                        et.nbRowsPerPage = o.pagingLength;
                        var validIndexes = o.validRowsIndex,
                            validIdxLen = validIndexes.length,
                            pagingEndRow = parseInt(o.startPagingRow, 10) +
                            parseInt(o.pagingLength, 10);
                        var rowIndex = row.rowIndex;
                        if((rowIndex === validIndexes[validIdxLen-1]) &&
                            o.currentPageNb!=o.nbPages){
                            // o.SetPage('last');
                            o.Cpt.paging.setPage('last');
                        }
                        else if((rowIndex == validIndexes[0]) &&
                            o.currentPageNb!==1){
                            // o.SetPage('first');
                            o.Cpt.paging.setPage('first');
                        }
                        else if(rowIndex > validIndexes[pagingEndRow-1] &&
                            rowIndex < validIndexes[validIdxLen-1]){
                            // o.SetPage('next');
                            o.Cpt.paging.setPage('next');
                        }
                        else if(rowIndex < validIndexes[o.startPagingRow] &&
                            rowIndex > validIndexes[0]){
                            // o.SetPage('previous');
                            o.Cpt.paging.setPage('previous');
                        }
                    }
                }
            };

            //Selected row needs to be visible when paging is activated
            if(o.paging){
                o.onAfterChangePage = function(tf, i){
                    var et = tf.ezEditTable;
                    var row = et.Selection.GetActiveRow();
                    if(row){
                        row.scrollIntoView(false);
                    }
                    var cell = et.Selection.GetActiveCell();
                    if(cell){
                        cell.scrollIntoView(false);
                    }
                };
            }

            //Rows navigation when rows are filtered is performed with the
            //EditTable row selection callback events
            if(ezEditConfig.default_selection==='row'){
                var fnB = ezEditConfig.on_before_selected_row;
                ezEditConfig.on_before_selected_row = function(){
                    onBeforeSelection(arguments[0], arguments[1], arguments[2]);
                    if(fnB){
                        fnB.call(
                            null, arguments[0], arguments[1], arguments[2]);
                    }
                };
                var fnA = ezEditConfig.on_after_selected_row;
                ezEditConfig.on_after_selected_row = function(){
                    onAfterSelection(arguments[0], arguments[1], arguments[2]);
                    if(fnA){
                        fnA.call(
                            null, arguments[0], arguments[1], arguments[2]);
                    }
                };
            } else {
                var fnD = ezEditConfig.on_before_selected_cell;
                ezEditConfig.on_before_selected_cell = function(){
                    onBeforeSelection(arguments[0], arguments[1], arguments[2]);
                    if(fnD){
                        fnD.call(
                            null, arguments[0], arguments[1], arguments[2]);
                    }
                };
                var fnC = ezEditConfig.on_after_selected_cell;
                ezEditConfig.on_after_selected_cell = function(){
                    onAfterSelection(arguments[0], arguments[1], arguments[2]);
                    if(fnC){
                        fnC.call(
                            null, arguments[0], arguments[1], arguments[2]);
                    }
                };
            }
        }
        if(o.editable){
            //Added or removed rows, TF rows number needs to be re-calculated
            var fnE = ezEditConfig.on_added_dom_row;
            ezEditConfig.on_added_dom_row = function(){
                o.nbFilterableRows++;
                if(!o.paging){
                    o.Cpt.rowsCounter.refresh();
                } else {
                    o.nbRows++;
                    o.nbVisibleRows++;
                    o.nbFilterableRows++;
                    o.paging=false;
                    o.Cpt.paging.destroy();
                    o.Cpt.paging.addPaging();
                }
                if(o.alternateBgs){
                    o.Cpt.alternateRows.init();
                }
                if(fnE){
                    fnE.call(null, arguments[0], arguments[1], arguments[2]);
                }
            };
            if(ezEditConfig.actions && ezEditConfig.actions['delete']){
                var fnF = ezEditConfig.actions['delete'].on_after_submit;
                ezEditConfig.actions['delete'].on_after_submit = function(){
                    o.nbFilterableRows--;
                    if(!o.paging){
                        o.Cpt.rowsCounter.refresh();
                    } else {
                        o.nbRows--;
                        o.nbVisibleRows--;
                        o.nbFilterableRows--;
                        o.paging=false;
                        o.Cpt.paging.destroy();
                        o.Cpt.paging.addPaging(false);
                    }
                    if(o.alternateBgs){
                        o.Cpt.alternateRows.init();
                    }
                    if(fnF){
                        fnF.call(null, arguments[0], arguments[1]);
                    }
                };
            }
        }

        try{
            o.ezEditTable = new EditTable(o.id, ezEditConfig, startRow);
            o.ezEditTable.Init();
        } catch(e) { console.log(ezEditConfig.err); }
    },

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
    __deferMultipleSelection: function(slc,index,filter){
        if(str.lower(slc.nodeName)!=='select'){
            return;
        }
        var doFilter = filter===undefined ? false : filter;
        var o = this;
        global.setTimeout(function(){
            slc.options[0].selected = false;

            if(slc.options[index].value===''){
                slc.options[index].selected = false;
            }
            else{
                slc.options[index].selected = true;
                if(doFilter){
                    o.Filter();
                }
            }
        }, 0.1);
    },

    /*====================================================
        - Returns an array [[values],[texts]] with
        custom values for a given filter
        - Param: column index (integer)
    =====================================================*/
    __getCustomValues: function(colIndex){
        if(!colIndex){
            return;
        }
        //custom select test
        var isCustomSlc = this.hasCustomSlcOptions &&
                array.has(this.customSlcOptions.cols, colIndex);
        if(!isCustomSlc){
            return;
        }
        var optTxt = [], optArray = [];
        var index = array.indexByValue(this.customSlcOptions.cols, colIndex);
        var slcValues = this.customSlcOptions.values[index];
        var slcTexts = this.customSlcOptions.texts[index];
        var slcSort = this.customSlcOptions.sorts[index];
        for(var r=0; r<slcValues.length; r++){
            optArray.push(slcValues[r]);
            if(slcTexts[r]){
                optTxt.push(slcTexts[r]);
            } else {
                optTxt.push(slcValues[r]);
            }
        }
        if(slcSort){
            optArray.sort();
            optTxt.sort();
        }
        return [optArray,optTxt];
    },

    /*====================================================
        - Generates status bar label
    =====================================================*/
    SetStatusBar: function(){
        if(!this.hasGrid && !this.isFirstLoad){
            return;
        }
        var f = this.fObj;
        //id of custom container element
        this.statusBarTgtId = f.status_bar_target_id || null;
        //element containing status bar label
        this.statusBarDiv = null;
        //status bar
        this.statusBarSpan = null;
        //status bar label
        this.statusBarSpanText = null;
        //defines status bar text
        this.statusBarText = f.status_bar_text || '';
        //defines css class status bar
        this.statusBarCssClass = f.status_bar_css_class || 'status';
        //delay for status bar clearing
        this.statusBarCloseDelay =  250;
        //status bar container
        var statusDiv = dom.create('div', ['id',this.prfxStatus+this.id]);
        statusDiv.className = this.statusBarCssClass;
        //status bar label
        var statusSpan = dom.create(
                'span', ['id',this.prfxStatusSpan+this.id]);
        //preceding text
        var statusSpanText = dom.create(
                'span', ['id',this.prfxStatusTxt+this.id]);
        statusSpanText.appendChild(dom.text(this.statusBarText));
        //calls function before message is displayed
        this.onBeforeShowMsg = types.isFn(f.on_before_show_msg) ?
            f.on_before_show_msg : null;
        //calls function after message is displayed
        this.onAfterShowMsg = types.isFn(f.on_after_show_msg) ?
            f.on_after_show_msg : null;

        // target element container
        if(!this.statusBarTgtId){
            this.SetTopDiv();
        }
        var targetEl = (!this.statusBarTgtId) ?
            this.lDiv : dom.id(this.statusBarTgtId);

        if(this.statusBarDiv && hlp.isIE()){
            this.statusBarDiv.outerHTML = '';
        }

        //default container: 'lDiv'
        if(!this.statusBarTgtId){
            statusDiv.appendChild(statusSpanText);
            statusDiv.appendChild(statusSpan);
            targetEl.appendChild(statusDiv);
        } else {
            // custom container, no need to append statusDiv
            targetEl.appendChild(statusSpanText);
            targetEl.appendChild(statusSpan);
        }

        this.statusBarDiv = dom.id( this.prfxStatus+this.id );
        this.statusBarSpan = dom.id( this.prfxStatusSpan+this.id );
        this.statusBarSpanText = dom.id( this.prfxStatusTxt+this.id );
    },

    /*====================================================
        - Removes status bar div
    =====================================================*/
    RemoveStatusBar: function(){
        if(!this.hasGrid && !this.statusBarDiv){
            return;
        }

        this.statusBarDiv.innerHTML = '';
        this.statusBarDiv.parentNode.removeChild(this.statusBarDiv);
        this.statusBarSpan = null;
        this.statusBarSpanText = null;
        this.statusBarDiv = null;
    },

    /*====================================================
        - sets status messages
    =====================================================*/
    StatusMsg: function(t){
        if(!t){
            this.StatusMsg('');
        }
        if(this.status){ this.WinStatusMsg(t); }
        if(this.statusBar){ this.StatusBarMsg(t); }
    },

    /*====================================================
        - sets window status messages
    =====================================================*/
    WinStatusMsg: function(t){
        if(!this.status){
            return;
        }
        if(this.onBeforeShowMsg){ this.onBeforeShowMsg.call(null, this, t); }
        global.status = t;
        if(this.onAfterShowMsg){ this.onAfterShowMsg.call(null, this, t); }
    },

    /*====================================================
        - sets status bar messages
    =====================================================*/
    StatusBarMsg: function(t){
        if(!this.statusBar || !this.statusBarSpan){
            return;
        }
        if(this.onBeforeShowMsg){ this.onBeforeShowMsg.call(null, this, t); }
        var o = this;
        function setMsg(){
            o.statusBarSpan.innerHTML = t;
            if(o.onAfterShowMsg){ o.onAfterShowMsg.call(null, o, t); }
        }
        var d = t==='' ? this.statusBarCloseDelay : 1;
        global.setTimeout(setMsg, d);
    },

    /*====================================================
        - inserts or removes input watermark
        - Params:
            - set: if true inserts watermark (boolean)
    =====================================================*/
    SetWatermark: function(set){
        if(!this.fltGrid && this.inpWatermark===''){
            return;
        }

        set = set===undefined ? true : set;
        for(var i=0; i<this.fltIds.length; i++){
            //only input type filters
            if(this['col'+i]!==this.fltTypeInp){
                continue;
            }
            var inpWatermark = !this.isInpWatermarkArray ?
                    this.inpWatermark : this.inpWatermark[i];
            if(this.GetFilterValue(i)===(set ? '' : inpWatermark)){
                this.SetFilterValue(i, (!set ? '' : inpWatermark));
                dom.addClass(
                    this.GetFilterElement(i), this.inpWatermarkCssClass);
            }
        }
    },

    ResetValues: function(){
        this.EvtManager(this.Evt.name.resetvalues);
    },

    /*==============================================
        - re-sets grid values when page is
        re-loaded. It invokes ResetGridValues,
        ResetPage and ResetPageLength methods
        - Params:
            - name: cookie name (string)
    ===============================================*/
    _ResetValues: function(){
        //only fillSlcOnDemand
        if(this.rememberGridValues && this.fillSlcOnDemand){
            this.ResetGridValues(this.fltsValuesCookie);
        }
        if(this.rememberPageLen){
            // this.ResetPageLength(this.pgLenCookie);
            this.Cpt.paging.resetPageLength(this.pgLenCookie);
        }
        if(this.rememberPageNb){
            // this.ResetPage(this.pgNbCookie);
            this.Cpt.paging.resetPage(this.pgNbCookie);
        }
    },

    /*==============================================
        - re-sets filters' values when page is
        re-loaded if load on demand is enabled
        - Params:
            - name: cookie name (string)
        - credits to Florent Hirchy
    ===============================================*/
    ResetGridValues: function(name){
        if(!this.fillSlcOnDemand){
            return;
        }
        var fltsValues = this.Cpt.store.getFilterValues(name),
            slcFltsIndex = this.GetFiltersByType(this.fltTypeSlc, true),
            multiFltsIndex = this.GetFiltersByType(this.fltTypeMulti, true);

        //if the number of columns is the same as before page reload
        if(Number(fltsValues[(fltsValues.length-1)]) === this.fltIds.length){
            for(var i=0; i<(fltsValues.length - 1); i++){
                if(fltsValues[i]===' '){
                    continue;
                }
                var s, opt;
                // if fillSlcOnDemand, drop-down needs to contain stored
                // value(s) for filtering
                if(this['col'+i]===this.fltTypeSlc ||
                    this['col'+i]===this.fltTypeMulti){
                    var slc = dom.id( this.fltIds[i] );
                    slc.options[0].selected = false;

                    //selects
                    if(array.has(slcFltsIndex, i)){
                        opt = dom.createOpt(fltsValues[i],fltsValues[i],true);
                        slc.appendChild(opt);
                        this.hasStoredValues = true;
                    }
                    //multiple select
                    if(array.has(multiFltsIndex, i)){
                        s = fltsValues[i].split(' '+this.orOperator+' ');
                        for(j=0; j<s.length; j++){
                            if(s[j]===''){
                                continue;
                            }
                            opt = dom.createOpt(s[j],s[j],true);
                            slc.appendChild(opt);
                            this.hasStoredValues = true;

                            // IE multiple selection work-around
                            if(hlp.isIE()){
                                this.__deferMultipleSelection(slc,j,false);
                                hasStoredValues = false;
                            }
                        }
                    }// if multiFltsIndex
                }
                else if(this['col'+i]==this.fltTypeCheckList){
                    var checkList = this.Cpt.checkList;
                    var divChk = checkList.checkListDiv[i];
                    divChk.title = divChk.innerHTML;
                    divChk.innerHTML = '';

                    var ul = dom.create(
                        'ul',['id',this.fltIds[i]],['colIndex',i]);
                    ul.className = checkList.checkListCssClass;

                    var li0 = dom.createCheckItem(
                        this.fltIds[i]+'_0', '', this.displayAllText);
                    li0.className = checkList.checkListItemCssClass;
                    ul.appendChild(li0);

                    divChk.appendChild(ul);

                    s = fltsValues[i].split(' '+this.orOperator+' ');
                    for(j=0; j<s.length; j++){
                        if(s[j]===''){
                            continue;
                        }
                        var li = dom.createCheckItem(
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
    },

    Filter: function(){
        this.EvtManager(this.Evt.name.filter);
    },
    /*====================================================
        - Filtering fn
        - retrieves data from each td in every single tr
        and compares to search string for current
        column
        - tr is hidden if all search strings are not
        found
    =====================================================*/
    _Filter: function(){
        if(!this.fltGrid || (!this.hasGrid && !this.isFirstLoad)){
            return;
        }
        //invokes onbefore callback
        if(this.onBeforeFilter){
            this.onBeforeFilter.call(null, this);
        }

        if(this.inpWatermark !== ''){
            this.SetWatermark(false);
        }

        var row = this.tbl.rows,
            f = this.fObj || {},
            hiddenrows = 0;
        this.validRowsIndex = [];
        var o = this;

        // removes keyword highlighting
        if(this.highlightKeywords){
            this.Cpt.highlightKeyword.unhighlightAll();
        }
        //removes popup filters active icons
        if(this.popUpFilters){
            this.Cpt.popupFilter.buildIcons();
        }
        //removes active column header class
        if(this.markActiveColumns){
            this.ClearActiveColumns();
        }
        // search args re-init
        this.searchArgs = this.GetFiltersValue();

        var num_cell_data, nbFormat;
        var re_le = new RegExp(this.leOperator),
            re_ge = new RegExp(this.geOperator),
            re_l = new RegExp(this.lwOperator),
            re_g = new RegExp(this.grOperator),
            re_d = new RegExp(this.dfOperator),
            re_lk = new RegExp(str.rgxEsc(this.lkOperator)),
            re_eq = new RegExp(this.eqOperator),
            re_st = new RegExp(this.stOperator),
            re_en = new RegExp(this.enOperator),
            re_an = new RegExp(this.anOperator),
            re_cr = new RegExp(this.curExp),
            re_em = this.emOperator,
            re_nm = this.nmOperator,
            re_re = new RegExp(str.rgxEsc(this.rgxOperator));

        //keyword highlighting
        function highlight(str, ok, cell){
            if(o.highlightKeywords && ok){
                str = str.replace(re_lk,'');
                str = str.replace(re_eq,'');
                str = str.replace(re_st,'');
                str = str.replace(re_en,'');
                var w = str;
                if(re_le.test(str) || re_ge.test(str) || re_l.test(str) ||
                    re_g.test(str) || re_d.test(str)){
                    w = dom.getText(cell);
                }
                if(w!==''){
                    o.Cpt.highlightKeyword.highlight(
                        cell, w, o.Cpt.highlightKeyword.highlightCssClass);
                }
            }
        }

        //looks for search argument in current row
        function hasArg(sA, cell_data, j){
            var occurence;
            //Search arg operator tests
            var hasLO = re_l.test(sA),
                hasLE = re_le.test(sA),
                hasGR = re_g.test(sA),
                hasGE = re_ge.test(sA),
                hasDF = re_d.test(sA),
                hasEQ = re_eq.test(sA),
                hasLK = re_lk.test(sA),
                hasAN = re_an.test(sA),
                hasST = re_st.test(sA),
                hasEN = re_en.test(sA),
                hasEM = (re_em === sA),
                hasNM = (re_nm === sA),
                hasRE = re_re.test(sA);

            //Search arg dates tests
            var isLDate = hasLO && isValidDate(sA.replace(re_l,''),dtType);
            var isLEDate = hasLE && isValidDate(sA.replace(re_le,''),dtType);
            var isGDate = hasGR && isValidDate(sA.replace(re_g,''),dtType);
            var isGEDate = hasGE && isValidDate(sA.replace(re_ge,''),dtType);
            var isDFDate = hasDF && isValidDate(sA.replace(re_d,''),dtType);
            var isEQDate = hasEQ && isValidDate(sA.replace(re_eq,''),dtType);

            var dte1, dte2;
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
                    occurence = o.__containsStr(
                        sA.replace(re_lk,''),cell_data,null,false);
                }
                else if(isValidDate(sA,dtType)){
                    dte2 = formatDate(sA,dtType);
                    occurence = dte1.toString() == dte2.toString();
                }
                //empty
                else if(hasEM){
                    occurence = str.isEmpty(cell_data);
                }
                //non-empty
                else if(hasNM){
                    occurence = !str.isEmpty(cell_data);
                }
            }

            else{
                //first numbers need to be formated
                if(o.hasColNbFormat && o.colNbFormat[j]){
                    num_cell_data = removeNbFormat(
                        cell_data,o.colNbFormat[j]);
                    nbFormat = o.colNbFormat[j];
                } else {
                    if(o.thousandsSeparator===',' && o.decimalSeparator==='.'){
                        num_cell_data = removeNbFormat(cell_data,'us');
                        nbFormat = 'us';
                    } else {
                        num_cell_data = removeNbFormat(cell_data,'eu');
                        nbFormat = 'eu';
                    }
                }

                // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},
                // rgx:)
                // lower equal
                if(hasLE){
                    occurence = num_cell_data <= removeNbFormat(
                        sA.replace(re_le,''),nbFormat);
                }
                //greater equal
                else if(hasGE){
                    occurence = num_cell_data >= removeNbFormat(
                        sA.replace(re_ge,''),nbFormat);
                }
                //lower
                else if(hasLO){
                    occurence = num_cell_data < removeNbFormat(
                        sA.replace(re_l,''),nbFormat);
                }
                //greater
                else if(hasGR){
                    occurence = num_cell_data > removeNbFormat(
                        sA.replace(re_g,''),nbFormat);
                }
                //different
                else if(hasDF){
                    occurence = o.__containsStr(
                        sA.replace(re_d,''),cell_data) ? false : true;
                }
                //like
                else if(hasLK){
                    occurence = o.__containsStr(
                        sA.replace(re_lk,''),cell_data,null,false);
                }
                //equal
                else if(hasEQ){
                    occurence = o.__containsStr(
                        sA.replace(re_eq,''),cell_data,null,true);
                }
                //starts with
                else if(hasST){
                    occurence = cell_data.indexOf(sA.replace(re_st,''))===0 ?
                        true : false;
                }
                //ends with
                else if(hasEN){
                    var searchArg = sA.replace(re_en,'');
                    occurence =
                        cell_data.lastIndexOf(searchArg,cell_data.length-1) ===
                        (cell_data.length-1)-(searchArg.length-1) &&
                        cell_data.lastIndexOf(
                            searchArg,cell_data.length-1) > -1 ? true : false;
                }
                //empty
                else if(hasEM){
                    occurence = str.isEmpty(cell_data);
                }
                //non-empty
                else if(hasNM){
                    occurence = !str.isEmpty(cell_data);
                }
                //regexp
                else if(hasRE){
                    //in case regexp fires an exception
                    try{
                        //operator is removed
                        var srchArg = sA.replace(re_re,'');
                        var rgx = new RegExp(srchArg);
                        occurence = rgx.test(cell_data);
                    } catch(e) { occurence = false; }
                }
                else{
                    var fCol = f['col_'+j];
                    occurence = o.__containsStr(
                        sA, cell_data, !fCol ? this.fltTypeInp : fCol);
                }

            }//else
            return occurence;
        }//fn

        for(var k=this.refRow; k<this.nbRows; k++){
            /*** if table already filtered some rows are not visible ***/
            if(row[k].style.display === 'none'){
                row[k].style.display = '';
            }

            var cell = row[k].cells,
                nchilds = cell.length;

            // checks if row has exact cell #
            if(nchilds !== this.nbCells){
                continue;
            }

            var occurence = [],
                isRowValid = this.searchType==='include' ? true : false,
                //only for single filter search
                singleFltRowValid = false;

            // this loop retrieves cell data
            for(var j=0; j<nchilds; j++){
                //searched keyword
                var sA = this.searchArgs[this.singleSearchFlt ? 0 : j],
                    dtType = this.hasColDateType ?
                        this.colDateType[j] : this.defaultDateType;
                if(sA===''){
                    continue;
                }

                var cell_data = str.matchCase(
                    this.GetCellData(j, cell[j]), this.matchCase);

                //multiple search parameter operator ||
                var sAOrSplit = sA.split(this.orOperator),
                //multiple search || parameter boolean
                hasMultiOrSA = (sAOrSplit.length>1) ? true : false,
                //multiple search parameter operator &&
                sAAndSplit = sA.split(this.anOperator),
                //multiple search && parameter boolean
                hasMultiAndSA = sAAndSplit.length>1 ? true : false;

                //multiple sarch parameters
                if(hasMultiOrSA || hasMultiAndSA){
                    var cS,
                        occur = false,
                        s = hasMultiOrSA ? sAOrSplit : sAAndSplit;
                    for(var w=0; w<s.length; w++){
                        cS = str.trim(s[w]);
                        occur = hasArg(cS,cell_data,j);
                        highlight(cS,occur,cell[j]);
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
                    occurence[j] = hasArg(str.trim(sA), cell_data, j);
                    highlight(sA, occurence[j], cell[j]);
                }//else single param

                if(!occurence[j]){
                    isRowValid = this.searchType==='include' ? false : true;
                }
                if(this.singleSearchFlt && occurence[j]){
                    singleFltRowValid = true;
                }
                if(this.popUpFilters){
                    this.Cpt.popupFilter.buildIcon(j, true);
                }
                if(this.markActiveColumns){
                    if(k === this.refRow){
                        if(this.onBeforeActiveColumn){
                            this.onBeforeActiveColumn.call(null, this, j);
                        }
                        dom.addClass(
                            this.GetHeaderElement(j),
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
                this.SetRowValidation(k,false);
                // always visible rows need to be counted as valid
                if(this.hasVisibleRows && array.has(this.visibleRows, k) &&
                    !this.paging){
                    this.validRowsIndex.push(k);
                } else {
                    hiddenrows++;
                }
            } else {
                this.SetRowValidation(k,true);
                this.validRowsIndex.push(k);
                if(this.alternateBgs){
                    this.Cpt.alternateRows.setRowBg(
                        k, this.validRowsIndex.length);
                }
                if(this.onRowValidated){
                    this.onRowValidated.call(null,this,k);
                }
            }
        }// for k

        this.nbVisibleRows = this.validRowsIndex.length;
        this.nbHiddenRows = hiddenrows;
        this.isStartBgAlternate = false;

        if(this.rememberGridValues){
            this.Cpt.store.saveFilterValues(this.fltsValuesCookie);
        }
        //applies filter props after filtering process
        if(!this.paging){
            this.ApplyGridProps();
        } else {
            this.startPagingRow = 0;
            this.currentPageNb = 1;
            this.Cpt.paging.setPagingInfo(this.validRowsIndex);
        }//starts paging process
        //invokes onafter callback
        if(this.onAfterFilter){
            this.onAfterFilter.call(null,this);
        }
    },

    /*====================================================
        - checks methods that should be called
        after filtering and/or paging process
    =====================================================*/
    ApplyGridProps: function(){
        // blurs active filter (IE)
        if(this.activeFlt &&
            str.lower(this.activeFlt.nodeName)===this.fltTypeSlc &&
            !this.popUpFilters){
            this.activeFlt.blur();
            if(this.activeFlt.parentNode){
                this.activeFlt.parentNode.focus();
            }
        }

        //shows rows always visible
        if(this.visibleRows){
            this.SetVisibleRows();
        }
        //makes operation on a col
        if(this.hasColOperation){
            this.Cpt.colOps.calc();
        }
        //re-populates drop-down filters
        if(this.refreshFilters){
            this.RefreshFiltersGrid();
        }
        var nr = !this.paging && this.hasVisibleRows ?
            this.nbVisibleRows - this.visibleRows.length : this.nbVisibleRows;
        //refreshes rows counter
        if(this.rowsCounter){
            this.Cpt.rowsCounter.refresh(nr);
        }

        if(this.inpWatermark !== ''){
            this.SetWatermark(true);
        }
        if(this.popUpFilters){
            this.Cpt.popupFilter.closeAll();
        }
    },

    /*====================================================
        - returns an array containing cell values of
        a column
        - needs following args:
            - column index (number)
            - a boolean set to true if we want only
            numbers to be returned
            - array containing rows index to be excluded
            from returned values
    =====================================================*/
    GetColValues: function(colindex, num, exclude){
        if(!this.fltGrid){
            return;
        }
        var row = this.tbl.rows,
            colValues = [];

        for(var i=this.refRow; i<this.nbRows; i++){
            var isExludedRow = false;
            // checks if current row index appears in exclude array
            if(exclude && types.isArray(exclude)){
                isExludedRow = array.has(exclude, i); //boolean
            }
            var cell = row[i].cells,
                nchilds = cell.length;

            // checks if row has exact cell # and is not excluded
            if(nchilds == this.nbCells && !isExludedRow){
                // this loop retrieves cell data
                for(var j=0; j<nchilds; j++){
                    if(j===colindex && row[i].style.display===''){
                        var cell_data = str.lower(
                                this.GetCellData(j, cell[j])),
                            nbFormat = this.colNbFormat ?
                                this.colNbFormat[colindex] : null,
                            data = num ?
                                removeNbFormat(cell_data,nbFormat) :
                                cell_data;
                        colValues.push(data);
                    }
                }
            }
        }//for i
        return colValues;
    },

    /*====================================================
        - Returns value of a specified filter
        - Params:
            - index: filter column index (numeric value)
    =====================================================*/
    GetFilterValue: function(index){
        if(!this.fltGrid){
            return;
        }
        var fltValue,
            flt = this.GetFilterElement(index);
        if(!flt){
            return '';
        }
        var fltColType = this.fltCol[index];
        if(fltColType !== this.fltTypeMulti &&
            fltColType !== this.fltTypeCheckList){
            fltValue = flt.value;
        }
        //mutiple select
        else if(fltColType === this.fltTypeMulti){
            fltValue = '';
            for(var j=0; j<flt.options.length; j++){
                if(flt.options[j].selected){
                    fltValue = fltValue.concat(
                        flt.options[j].value+' ' +
                        this.orOperator + ' '
                    );
                }
            }
            //removes last operator ||
            fltValue = fltValue.substr(0,fltValue.length-4);
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
    },

    /*====================================================
        - Returns the value of every single filter
    =====================================================*/
    GetFiltersValue: function(){
        if(!this.fltGrid){
            return;
        }
        var searchArgs = [];
        for(var i=0; i<this.fltIds.length; i++){
            searchArgs.push(
                str.trim(
                    str.matchCase(this.GetFilterValue(i), this.matchCase))
            );
        }
        return searchArgs;
    },

    /*====================================================
        - Returns filter id of a specified column
        - Params:
            - index: column index (numeric value)
    =====================================================*/
    GetFilterId: function(index){
        if(!this.fltGrid){
            return;
        }
        return this.fltIds[i];
    },

    /*====================================================
        - returns an array containing ids of filters of a
        specified type (inputs or selects)
        - Note that hidden filters are also returned
        - Needs folllowing args:
            - filter type string ('input','select',
            'multiple')
            - optional boolean: if set true method
            returns column indexes otherwise filters ids
    =====================================================*/
    GetFiltersByType: function(type, bool){
        if(!this.fltGrid){
            return;
        }
        var arr = [];
        for(var i=0; i<this.fltIds.length; i++){
            var fltType = this['col'+i];
            if(fltType === str.lower(type)){
                var a = (bool) ? i : this.fltIds[i];
                arr.push(a);
            }
        }
        return arr;
    },

    /*====================================================
        - returns filter DOM element for a given column
        index
    =====================================================*/
    GetFilterElement: function(index){
        if(!this.fltGrid){
            return null;
        }
        return dom.id(this.fltIds[index]);
    },

    /*====================================================
        - returns number of cells in a row
        - if rowIndex param is passed returns number of
        cells of specified row (number)
    =====================================================*/
    GetCellsNb: function(rowIndex){
        var tr = !rowIndex ? this.tbl.rows[0] : this.tbl.rows[rowIndex];
        return tr.cells.length;
    },

    /*====================================================
        - returns total nb of filterable rows starting
        from reference row if defined
        - Param:
            - includeHeaders: if true header rows are
            included in calculation(= table rows number)
    =====================================================*/
    GetRowsNb: function(includeHeaders){
        var s = !this.refRow ? 0 : this.refRow,
            ntrs = this.tbl.rows.length;
        if(includeHeaders){ s = 0; }
        return parseInt(ntrs-s, 10);
    },

    /*====================================================
        - returns text content of a given cell
        - Params:
            - i: index of the column (number)
            - cell: td DOM object
    =====================================================*/
    GetCellData: function(i, cell){
        if(i===undefined || !cell){
            return '';
        }
        //First checks for customCellData event
        if(this.customCellData && array.has(this.customCellDataCols, i)){
            return this.customCellData.call(null,this,cell,i);
        } else {
            return dom.getText(cell);
        }
    },

    /*====================================================
        - returns an array containing table data:
        [rowindex,[value1,value2,value3...]]
    =====================================================*/
    GetTableData: function(){
        var row = this.tbl.rows;
        for(var k=this.refRow; k<this.nbRows; k++){
            var rowData = [k,[]];
            var cells = row[k].cells;
            // this loop retrieves cell data
            for(var j=0; j<cells.length; j++){
                var cell_data = this.GetCellData(j, cells[j]);
                rowData[1].push(cell_data);
            }
            this.tblData.push(rowData);
        }
        return this.tblData;
    },

    /*====================================================
        - returns an array containing filtered data:
        [rowindex,[value1,value2,value3...]]
    =====================================================*/
    GetFilteredData: function(includeHeaders){
        if(!this.validRowsIndex){
            return [];
        }
        var row = this.tbl.rows,
            filteredData = [];
        if(includeHeaders){
            var table = this.gridLayout ? this.headTbl : this.tbl,
                r = table.rows[this.headersRow],
                rowData = [r.rowIndex,[]];
            for(var j=0; j<this.nbCells; j++){
                var headerText = this.GetCellData(j, r.cells[j]);
                rowData[1].push(headerText);
            }
            filteredData.push(rowData);
        }

        var validRows = this.GetValidRowsIndex(true);
        for(var i=0; i<validRows.length; i++){
            var rData = [this.validRowsIndex[i],[]],
                cells = row[this.validRowsIndex[i]].cells;
            for(var k=0; k<cells.length; k++){
                var cell_data = this.GetCellData(k, cells[k]);
                rData[1].push(cell_data);
            }
            filteredData.push(rData);
        }
        return filteredData;
    },

    /*====================================================
        - returns an array containing filtered data of a
        specified column.
        - Params:
            - colIndex: index of the column (number)
        - returned array:
        [value1,value2,value3...]
    =====================================================*/
    GetFilteredDataCol: function(colIndex){
        if(colIndex===undefined){
            return [];
        }
        var data =  this.GetFilteredData(),
            colData = [];
        for(var i=0; i<data.length; i++){
            var r = data[i],
                //cols values of current row
                d = r[1],
                //data of searched column
                c = d[colIndex];
            colData.push(c);
        }
        return colData;
    },

    GetRowDisplay: function(row){
        if(!this.fltGrid && !types.isObj(row)){
            return;
        }
        return row.style.display;
    },

    /*====================================================
        - Validates/unvalidates row by setting 'validRow'
        attribute and shows/hides row
        - Params:
            - rowIndex: index of the row (number)
            - isValid: boolean
    =====================================================*/
    SetRowValidation: function(rowIndex, isValid){
        var row = this.tbl.rows[rowIndex];
        if(!row || str.lower(typeof isValid)!=='boolean'){
            return;
        }

        // always visible rows are valid
        if(this.hasVisibleRows && array.has(this.visibleRows, rowIndex) &&
            !this.paging){
            isValid = true;
        }

        var displayFlag = isValid ? '' : 'none',
            validFlag = isValid ? 'true' : 'false';
        row.style.display = displayFlag;

        if(this.paging){
            row.setAttribute('validRow',validFlag);
        }
    },

    /*====================================================
        - Validates all filterable rows
    =====================================================*/
    ValidateAllRows: function(){
        if(!this.hasGrid){
            return;
        }
        this.validRowsIndex = [];
        for(var k=this.refRow; k<this.nbFilterableRows; k++){
            this.SetRowValidation(k, true);
            this.validRowsIndex.push(k);
        }
    },

    /*====================================================
        - Inserts value in a specified filter
        - Params:
            - index: filter column index (numeric value)
            - searcharg: search string
            - doFilter: optional boolean for multiple
            selects: executes filtering when multiple
            select populated... IE only!
    =====================================================*/
    SetFilterValue: function(index, searcharg, doFilter){
        if((!this.fltGrid && !this.isFirstLoad) ||
            !this.GetFilterElement(index)){
            return;
        }
        var slc = this.GetFilterElement(index),
            execFilter = doFilter===undefined ? true : doFilter,
            fltColType = this['col'+index];
        searcharg = searcharg===undefined ? '' : searcharg;

        if(fltColType !== this.fltTypeMulti &&
            fltColType != this.fltTypeCheckList){
            slc.value = searcharg;
            if(fltColType===this.fltTypeInp && this.inpWatermark!==''){
                dom.removeClass(slc, this.inpWatermarkCssClass);
            }
        }
        //multiple selects
        else if(fltColType === this.fltTypeMulti){
            var s = searcharg.split(' '+this.orOperator+' '),
                ct = 0; //keywords counter
            for(var j=0; j<slc.options.length; j++){
                if(s==='' || s[0]===''){
                    slc.options[j].selected = false;
                }
                if(slc.options[j].value===''){
                    slc.options[j].selected = false;
                }
                if(slc.options[j].value!=='' &&
                    array.has(s, slc.options[j].value, true)){
                    // IE multiple selection work-around
                    if(hlp.isIE()){
                        //when last value reached filtering can be executed
                        var filter = ct==(s.length-1) && execFilter ?
                            true : false;
                        this.__deferMultipleSelection(slc,j,filter);
                        ct++;
                    }
                    else{
                        slc.options[j].selected = true;
                    }
                }//if
            }//for j
        }
        //checklist
        else if(fltColType === this.fltTypeCheckList){
            searcharg = str.matchCase(searcharg, this.matchCase);
            var sarg = searcharg.split(' '+this.orOperator+' '),
                fltValue = slc.setAttribute('value',''),
                fltIndex = slc.setAttribute('indexes','');
            for(var k=0; k<dom.tag(slc,'li').length; k++){
                var li = dom.tag(slc,'li')[k],
                    lbl = dom.tag(li,'label')[0],
                    chk = dom.tag(li,'input')[0],
                    lblTxt = str.matchCase(
                        dom.getText(lbl), this.matchCase);
                if(lblTxt!=='' && array.has(sarg, lblTxt, true)){
                    chk.checked = true;
                    this.Cpt.checkList.setCheckListValues(chk);
                }
                else{
                    chk.checked = false;
                    this.Cpt.checkList.setCheckListValues(chk);
                }
            }
        }
    },

    /*====================================================
        - sets coluun widths in pixels
    =====================================================*/
    SetColWidths: function(rowIndex){
        if(!this.fltGrid || !this.hasColWidth){
            return;
        }
        var o = this, rIndex;
        if(rowIndex===undefined){
            rIndex = this.tbl.rows[0].style.display!='none' ? 0 : 1;
        } else{
            rIndex = rowIndex;
        }
        setWidths(this.tbl.rows[rIndex]);

        function setWidths(row){
            if(!o && (o.nbCells!=o.colWidth.length)){
                return;
            }
            if(o.nbCells==row.cells.length){
                for(var k=0; k<o.nbCells; k++){
                    row.cells[k].style.width = o.colWidth[k];
                }
            }
        }
    },

    /*====================================================
        - makes a row always visible
        - Note this works only if paging is false
    =====================================================*/
    SetVisibleRows: function(){
        if(this.hasGrid && this.hasVisibleRows && !this.paging){
            for(var i=0; i<this.visibleRows.length; i++){
                //row index cannot be > nrows
                if(this.visibleRows[i] <= this.nbRows){
                    this.SetRowValidation(this.visibleRows[i],true);
                }
            }
        }
    },

    ClearFilters: function(){
        this.EvtManager(this.Evt.name.clear);
    },
    /*====================================================
        - clears grid filters
    =====================================================*/
    _ClearFilters: function(){
        if(!this.fltGrid){
            return;
        }
        if(this.onBeforeReset){
            this.onBeforeReset.call(null, this, this.GetFiltersValue());
        }
        for(var i=0; i<this.fltIds.length; i++){
            this.SetFilterValue(i, '');
        }
        if(this.refreshFilters){
            this.activeFilterId = '';
            this.RefreshFiltersGrid();
        }
        if(this.rememberPageLen){ cookie.remove(this.pgLenCookie); }
        if(this.rememberPageNb){ cookie.remove(this.pgNbCookie); }
        if(this.onAfterReset){ this.onAfterReset.call(null, this); }
    },

    /*====================================================
        - clears active columns header class name
    =====================================================*/
    ClearActiveColumns: function(){
        for(var i=0; i<this.fltIds.length; i++){
            dom.removeClass(
                this.GetHeaderElement(i), this.activeColumnsCssClass);
        }
    },

    /*====================================================
        - Re-generates filters grid
    =====================================================*/
    RefreshGrid: function(config){
        var configObj = !config ? this.fObj : config;
        var hasSort = this.sort;
        //sort property is set to false in order to avoid sort object
        //re-instanciation
        if(hasSort){
            this.sort = false;
        }
        this.nbRows = this.GetRowsNb(); //in case table is refreshed
        this.RemoveGrid();
        window['tf_'+this.id] = new TableFilter(this.id, this.startRow, configObj);
        this.isFirstLoad = true;
        this.fltIds = [];
        this.init();
        //New tbody content needs to be referenced in sortabletable script with
        //setTBody() method
        if(hasSort){
            //this.st =  SortableTable object
            //Note this is a method of the Sortable Table 1.12 script
            //(Erik Arvidsson)
            this.st.setTBody(this.tbl.tBodies[0]);
            //finally sort property is enabled again
            this.sort = true;
        }
    },

    /*====================================================
        - retrieves select, multiple and checklist filters
        - calls method repopulating filters
    =====================================================*/
    RefreshFiltersGrid: function(){
        var slcA1 = this.GetFiltersByType(this.fltTypeSlc, true),
            slcA2 = this.GetFiltersByType(this.fltTypeMulti, true),
            slcA3 = this.GetFiltersByType(this.fltTypeCheckList, true),
            slcIndex = slcA1.concat(slcA2);
        slcIndex = slcIndex.concat(slcA3);

        if(this.activeFilterId){
            var activeFlt = this.activeFilterId.split('_')[0];
            activeFlt = activeFlt.split(this.prfxFlt)[1];
            var slcSelectedValue;
            for(var i=0; i<slcIndex.length; i++){
                var curSlc = dom.id(this.fltIds[slcIndex[i]]);
                slcSelectedValue = this.GetFilterValue(slcIndex[i]);
                if(activeFlt!==slcIndex[i] ||
                    (this.paging && array.has(slcA1, slcIndex[i]) &&
                        activeFlt === slcIndex[i] ) ||
                    (!this.paging && (array.has(slcA3, slcIndex[i]) ||
                        array.has(slcA2, slcIndex[i]))) ||
                    slcSelectedValue === this.displayAllText ){

                    if(array.has(slcA3, slcIndex[i])){
                        this.Cpt.checkList.checkListDiv[
                            slcIndex[i]].innerHTML = '';
                    } else {
                        curSlc.innerHTML = '';
                    }

                    //1st option needs to be inserted
                    if(this.fillSlcOnDemand) {
                        var opt0 = dom.createOpt(this.displayAllText, '');
                        if(curSlc){
                            curSlc.appendChild(opt0);
                        }
                    }

                    if(array.has(slcA3, slcIndex[i])){
                        this.Cpt.checkList._build(slcIndex[i]);
                    } else {
                        this.Cpt.dropdown._build(slcIndex[i], true);
                    }

                    this.SetFilterValue(slcIndex[i],slcSelectedValue);
                }
            }// for i
        }
    },

    /*====================================================
        - Private methods
    =====================================================*/

    /*====================================================
        - Only used by AddGrid() method
        - Resets filtering grid bar if previously removed
    =====================================================*/
    __resetGrid: function(){
        if(this.isFirstLoad){
            return;
        }

        // grid was removed, grid row element is stored in fltGridEl property
        if(!this.gridLayout){
            this.tbl.rows[this.filtersRowIndex].parentNode.insertBefore(
                this.fltGridEl,
                this.tbl.rows[this.filtersRowIndex]
            );
        }

        // filters are appended in external placeholders elements
        if(this.isExternalFlt){
            for(var ct=0; ct<this.externalFltTgtIds.length; ct++){
                var extFlt = dom.id(this.externalFltTgtIds[ct]);
                if(extFlt){
                    extFlt.appendChild(this.externalFltEls[ct]);
                    var colFltType = this['col'+ct];
                    //IE special treatment for gridLayout, appended filters are
                    //empty
                    if(this.gridLayout &&
                        this.externalFltEls[ct].innerHTML === '' &&
                        colFltType !== this.fltTypeInp){
                        if(colFltType === this.fltTypeSlc ||
                            colFltType === this.fltTypeMulti){
                            this.Cpt.dropdown.build(ct);
                        }
                        if(colFltType === this.fltTypeCheckList){
                            this.Cpt.checkList.build(ct);
                        }
                    }
                }
            }
        }

        this.nbFilterableRows = this.GetRowsNb();
        this.nbVisibleRows = this.nbFilterableRows;
        this.nbRows = this.tbl.rows.length;
        if(this.isSortEnabled){
            this.sort = true;
        }

        if(this.tbl.rows[this.filtersRowIndex].innerHTML === ''){
            refreshFilters(this);
        } else {
            if(this.popUpFilters){
                this.headersRow++;
                this.Cpt.popupFilter.buildAll();
            }
        }

        /***    ie bug work-around, filters need to be re-generated since row
                is empty; insertBefore method doesn't seem to work properly
                with previously generated DOM nodes modified by innerHTML   ***/
        function refreshFilters(o){
            o.tbl.deleteRow(o.filtersRowIndex);
            o.RemoveGrid();
            o.fltIds = [];
            o.isFirstLoad = true;
            if(o.popUpFilters){
                // o.RemovePopupFilters();
                o.Cpt.popupFilter.destroy();
            }
            o._AddGrid();
        }

        if(!this.gridLayout){
            dom.addClass(this.tbl, this.prfxTf);
        }
        this.hasGrid = true;
    },

    /*==============================================
        - Checks if data contains searched arg,
        returns a boolean
        - Params:
            - arg: searched string
            - data: data string
            - fltType: filter type (string,
            exact match by default for selects -
            optional)
            - forceMatch: boolean forcing exact
            match (optional)
    ===============================================*/
    __containsStr: function(arg, data, fltType, forceMatch){
        // Improved by Cedric Wartel (cwl)
        // automatic exact match for selects and special characters are now
        // filtered
        var regexp,
            modifier = (this.matchCase) ? 'g' : 'gi',
            exactMatch = !forceMatch ? this.exactMatch : forceMatch;
        if(exactMatch || (fltType!==this.fltTypeInp && fltType)){
            regexp = new RegExp(
                '(^\\s*)'+ str.rgxEsc(arg) +'(\\s*$)', modifier);
        } else{
            regexp = new RegExp(str.rgxEsc(arg), modifier);
        }
        return regexp.test(data);
    },

    IncludeFile: function(fileId, filePath, callback, type){
        var ftype = !type ? 'script' : type,
            imported = isImported(filePath, ftype);
        if(imported){
            return;
        }
        var o = this,
            isLoaded = false,
            file,
            head = dom.tag(doc,'head')[0];

        if(str.lower(ftype) === 'link'){
            file = dom.create(
                'link',
                ['id', fileId], ['type', 'text/css'],
                ['rel', 'stylesheet'], ['href', filePath]
            );
        } else {
            file = dom.create(
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
            throw new Error('TF script could not load:\n' + this.src);
        };
        head.appendChild(file);
    },

    /*====================================================
        - checks if table has a filter grid
        - returns a boolean
    =====================================================*/
    HasGrid: function(){
        return this.hasGrid;
    },

    /*====================================================
        - returns an array containing filters ids
        - Note that hidden filters are also returned
    =====================================================*/
    GetFiltersId: function(){
        if(!this.hasGrid){
            return;
        }
        return this.fltIds;
    },

    /*====================================================
        - returns an array containing valid rows indexes
        (valid rows upon filtering)
    =====================================================*/
    GetValidRowsIndex: function(reCalc){
        if(!this.hasGrid){
            return;
        }
        if(!reCalc){
            return this.validRowsIndex;
        }

        this.validRowsIndex = [];
        for(var k=this.refRow; k<this.GetRowsNb(true); k++){
            var r = this.tbl.rows[k];
            if(!this.paging){
                if(this.GetRowDisplay(r) !== 'none'){
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
    },

    /*====================================================
        - Returns the index of the row containing the
        filters
    =====================================================*/
    GetFiltersRowIndex: function(){
        if(!this.hasGrid){
            return;
        }
        return this.filtersRowIndex;
    },

    /*====================================================
        - Returns the index of the headers row
    =====================================================*/
    GetHeadersRowIndex: function(){
        if(!this.hasGrid){
            return;
        }
        return this.headersRow;
    },

    /*====================================================
        - Returns the index of the row from which will
        start the filtering process (1st filterable row)
    =====================================================*/
    GetStartRowIndex: function(){
        if(!this.hasGrid){
            return;
        }
        return this.refRow;
    },

    /*====================================================
        - Returns the index of the last row
    =====================================================*/
    GetLastRowIndex: function(){
        if(!this.hasGrid){
            return;
        }
        return (this.nbRows-1);
    },

    /*====================================================
        - returns a header DOM element for a given column
        index
    =====================================================*/
    GetHeaderElement: function(colIndex){
        var table = this.gridLayout ? this.headTbl : this.tbl;
        var header, tHead = dom.tag(this.tbl,'thead');
        for(var i=0; i<this.nbCells; i++){
            if(i !== colIndex){
                continue;
            }
            if(tHead.length === 0){
                header = table.rows[this.headersRow].cells[i];
            }
            if(tHead.length === 1){
                header = tHead[0].rows[this.headersRow].cells[i];
            }
            break;
        }
        return header;
    },

    /*====================================================
        - returns the original configuration object
    =====================================================*/
    GetConfigObject: function(){
        return this.fObj;
    },

    /*====================================================
        - returns the total number of rows that can be
        filtered
    =====================================================*/
    GetFilterableRowsNb: function(){
        return this.GetRowsNb(false);
    }
};

function numSortAsc(a, b){ return (a-b); }

function numSortDesc(a, b){ return (b-a); }

function removeNbFormat(data, format){
    if(!data){
        return;
    }
    if(!format){
        format = 'us';
    }
    var n = data;
    if(str.lower(format)==='us'){
        n =+ n.replace(/[^\d\.-]/g,'');
    } else {
        n =+ n.replace(/[^\d\,-]/g,'').replace(',','.');
    }
    return n;
}

function isImported(filePath, type){
    var imported = false,
        importType = !type ? 'script' : type,
        attr = importType == 'script' ? 'src' : 'href',
        files = dom.tag(doc,importType);
    for (var i=0; i<files.length; i++){
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

// function isStylesheetImported(stylesheet){
//     var isImported = false;
//     if(!doc.styleSheets){
//         return isImported;
//     }
//     var s = doc.styleSheets,
//         regexp = new RegExp(stylesheet);
//     for(var i=0; i<s.length; i++){
//         if(s[i].imports){//IE
//             var imp = s[i].imports;
//             for(var j=0; j<imp.length; j++){
//                 if(str.lower(imp[j].href) === str.lower(stylesheet)){
//                     isImported = true;
//                     break;
//                 }
//             }
//         } else {
//             var r = s[i].cssRules ? s[i].cssRules : s[i].rules;
//             for(var k=0; k<r.length; k++){
//                 if(regexp.test(r[k].cssText)){
//                     isImported = true;
//                     break;
//                 }
//             }
//         }
//     }
//     return isImported;
// }

//Firefox does not support outerHTML property
function setOuterHtml(){
    if(doc.body.__defineGetter__){
        if(HTMLElement) {
            var element = HTMLElement.prototype;
            if(element.__defineGetter__){
                element.__defineGetter__("outerHTML",
                    function(){
                        var parent = this.parentNode;
                        var el = dom.create(parent.tagName);
                        el.appendChild(this);
                        var shtml = el.innerHTML;
                        parent.appendChild(this);
                        return shtml;
                    }
                );
            }
            if(element.__defineSetter__) {
                HTMLElement.prototype.__defineSetter__(
                    "outerHTML", function(sHTML){
                   var r = this.ownerDocument.createRange();
                   r.setStartBefore(this);
                   var df = r.createContextualFragment(sHTML);
                   this.parentNode.replaceChild(df, this);
                   return sHTML;
                });
            }
        }
    }
}

return TableFilter;

});

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
//     var tf = new TableFilter(arguments[0], arguments[1], arguments[2]);
//     tf.init();
//     window['tf_'+id] = tf;
//     return tf;
// }

/*===BEGIN removable section===========================
    - Unobtrusive grid bar generation using
    'filterable' class
    - If you don't use it you can remove safely this
    section
/*=====================================================*/
// window['tf_isNotIE'] = !(/msie|MSIE/.test(navigator.userAgent));
// TF.Event.add(window,
//     (tf_isNotIE || (typeof window.addEventListener === 'function') ?
//         'DOMContentLoaded' : 'load'),
//     initFilterGrid);

// function initFilterGrid(){
//     if(!document.getElementsByTagName){ return; }
//     var tbls = dom.tag(document,'table'), config;
//     for (var i=0; i<tbls.length; i++){
//         var cTbl = tbls[i], cTblId = cTbl.getAttribute('id');
//         if(TF.Dom.hasClass(cTbl,'filterable') && cTblId){
//             if(TF.Types.isObj(cTblId+'_config')){
//                 config = window[cTblId+'_config'];
//             } else { config = undefined; }
//             window[cTblId+'_isUnob'] = true;
//             setFilterGrid(cTblId,config);
//         }
//     }// for i
// }
/*===END removable section===========================*/
