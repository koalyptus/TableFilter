/* ------------------------------------------------------------------------
    - HTML Table Filter Generator v2.5
    - By Max Guglielmi (tablefilter.free.fr)
    - Licensed under the MIT License
---------------------------------------------------------------------------
Copyright (c) 2009-2014 Max Guglielmi

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
---------------------------------------------------------------------------
    - Special credit to:
    Cedric Wartel, cnx.claude@free.fr, Florent Hirchy, Váry Péter,
    Anthony Maes, Nuovella Williams, Fuggerbit, Venkata Seshagiri Rao
    Raya, Piepiax, Manuel Kern, Baladhandayutham for active contribution
    and/or inspiration
------------------------------------------------------------------------ */

/**
 * TF object constructor
 * @param {String} id Table id
 * @param {Number} row index indicating the 1st row
 * @param {Object} configuration object
 */
function TF(id) {
    if(arguments.length === 0){ return; }
    this.id = id;
    this.version = '2.5';
    this.year = new Date().getFullYear();
    this.tbl = tf_Id(id);
    this.startRow = null;
    this.refRow = null;
    this.headersRow = null;
    this.fObj = null;
    this.nbFilterableRows = null;
    this.nbRows = null;
    this.nbCells = null;
    this.hasGrid = false;
    this.enableModules = false;

    if(!this.tbl || this.tbl.nodeName.tf_LCase() !== 'table' ||
        this.GetRowsNb() === 0){
        throw new Error(
            'Could not instantiate TF object: table not found.');
    }

    if(arguments.length>1){
        for(var i=0; i<arguments.length; i++){
            var arg = arguments[i];
            var argtype = typeof arg;
            switch(argtype.tf_LCase()){
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
    this.basePath = f.base_path!==undefined ? f.base_path : 'TableFilter/';

    /*** filter types ***/
    this.fltTypeInp =           'input';
    this.fltTypeSlc =           'select';
    this.fltTypeMulti =         'multiple';
    this.fltTypeCheckList =     'checklist';
    this.fltTypeNone =          'none';
    this.fltCol =               []; //filter type of each column

    for(var j=0; j<this.nbCells; j++){
        var col = this['col'+j],
            cfgCol = f['col_'+j];
        if(col === undefined) {
            col = cfgCol === undefined ?
                this.fltTypeInp : cfgCol.tf_LCase();
        }
        this.fltCol.push(col);
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

    //flag indicating if the grid has an additional row for column
    //widths (IE<=7)
    this.hasGridWidthsRow = false;
    this.gridColElms = [];
    this.sourceTblHtml = null;
    if(this.gridLayout){
        //Firefox does not support outerHTML property...
        if(this.tbl.outerHTML===undefined){ tf_SetOuterHtml(); }
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
    //defines css class for even rows
    this.rowBgEvenCssClass = f.even_row_css_class || 'even';
    //defines css class for odd rows
    this.rowBgOddCssClass = f.odd_row_css_class || 'odd';

    /*** filters' grid behaviours ***/
    //enables/disables enter key
    this.enterKey = f.enter_key===false ? false : true;
    //enables/disables alternative fn call
    this.isModFilterFn = f.mod_filter_fn===true ? true : false;
    // used by tf_DetectKey fn
    this.modFilterFn = this.isModFilterFn ? f.mod_filter_fn : null;
    //calls function before filtering starts
    this.onBeforeFilter = tf_IsFn(f.on_before_filter) ?
        f.on_before_filter : null;
    //calls function after filtering
    this.onAfterFilter = tf_IsFn(f.on_after_filter) ?
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
    this.hasColOperation = f.col_operation===true ? true : false;
    this.colOperation = null;
    //enables always visible rows
    this.hasVisibleRows = f.rows_always_visible===true ? true : false;
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
    this.onFiltersLoaded = tf_IsFn(f.on_filters_loaded) ?
        f.on_filters_loaded : null;
    //enables/disables single filter search
    this.singleSearchFlt = f.single_search_filter===true ? true : false;
    //calls function after row is validated
    this.onRowValidated = tf_IsFn(f.on_row_validated) ?
        f.on_row_validated : null;
    //array defining columns for customCellData event
    this.customCellDataCols = f.custom_cell_data_cols ?
        f.custom_cell_data_cols : [];
    //calls custom function for retrieving cell data
    this.customCellData = tf_IsFn(f.custom_cell_data) ?
        f.custom_cell_data : null;
    //input watermark text array
    this.inpWatermark = f.input_watermark || '';
    //defines css class for input watermark
    this.inpWatermarkCssClass = f.input_watermark_css_class ||
        'fltWatermark';
    this.isInpWatermarkArray = tf_IsArray(f.input_watermark);
    //id of toolbar container element
    this.toolBarTgtId = f.toolbar_target_id || null;
    //enables/disables help div
    this.helpInstructions = f.help_instructions || null;
    //popup filters
    this.popUpFilters = f.popup_filters===true ? true : false;
    //active columns color
    this.markActiveColumns = f.mark_active_columns===true ? true : false;
    //defines css class for active column header
    this.activeColumnsCssClass = f.active_columns_css_class ||
        'activeHeader';
    //calls function before active column header is marked
    this.onBeforeActiveColumn = tf_IsFn(f.on_before_active_column) ?
        f.on_before_active_column : null;
    //calls function after active column header is marked
    this.onAfterActiveColumn = tf_IsFn(f.on_after_active_column) ?
        f.on_after_active_column : null;

    /*** select filter's customisation and behaviours ***/
    //defines 1st option text
    this.displayAllText = f.display_all_text || '';
    this.enableSlcResetFilter = f.enable_slc_reset_filter===false ?
        false : true;
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
    //sets select filling method: 'innerHTML' or 'createElement'
    this.slcFillingMethod = f.slc_filling_method || 'createElement';
    //enabled selects are populated on demand
    this.fillSlcOnDemand = f.fill_slc_on_demand===true ? true : false;
    //IE only, tooltip text appearing on select before it is populated
    this.activateSlcTooltip =  f.activate_slc_tooltip ||
        'Click to activate';
    //tooltip text appearing on multiple select
    this.multipleSlcTooltip = f.multiple_slc_tooltip ||
        'Use Ctrl key for multiple selections';
    this.hasCustomSlcOptions = tf_IsObj(f.custom_slc_options) ?
        true : false;
    this.customSlcOptions = tf_isArray(f.custom_slc_options) ?
        f.custom_slc_options : null;
    //calls function before col operation
    this.onBeforeOperation = tf_IsFn(f.on_before_operation) ?
        f.on_before_operation : null;
    //calls function after col operation
    this.onAfterOperation = tf_IsFn(f.on_after_operation) ?
        f.on_after_operation : null;

    /*** checklist customisation and behaviours ***/
    this.checkListDiv = []; //checklist container div
    //defines css class for div containing checklist filter
    this.checkListDivCssClass = f.div_checklist_css_class ||
        'div_checklist';
    //defines css class for checklist filters
    this.checkListCssClass = f.checklist_css_class || 'flt_checklist';
    //defines css class for checklist item (li)
    this.checkListItemCssClass = f.checklist_item_css_class ||
        'flt_checklist_item';
    //defines css class for selected checklist item (li)
    this.checkListSlcItemCssClass = f.checklist_selected_item_css_class ||
        'flt_checklist_slc_item';
    //Load on demand text
    this.activateCheckListTxt = f.activate_checklist_text ||
        'Click to load filter data';
    //defines css class for checklist filters
    this.checkListItemDisabledCssClass =
        f.checklist_item_disabled_css_class ||
        'flt_checklist_item_disabled';
    this.enableCheckListResetFilter =
        f.enable_checklist_reset_filter===false ? false : true;

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
    this.onBeforeReset = tf_IsFn(f.on_before_reset) ?
        f.on_before_reset : null;
    //callback function after filters are cleared
    this.onAfterReset = tf_IsFn(f.on_after_reset) ? f.on_after_reset : null;

    /*** paging ***/
    //enables/disables table paging
    this.paging = f.paging===true ? true : false;
    //enables/disables results per page drop-down
    this.hasResultsPerPage = f.results_per_page===true ? true : false;
    //css class for paging buttons (previous,next,etc.)
    this.btnPageCssClass = f.paging_btn_css_class || 'pgInp';
    //stores paging select element
    this.pagingSlc = null;
    //stores results per page text and values
    this.resultsPerPage = null;
    //results per page select element
    this.resultsPerPageSlc = null;
    //indicates if paging elements were previously removed
    this.isPagingRemoved = false;
    this.nbVisibleRows = 0; //nb visible rows
    this.nbHiddenRows = 0; //nb hidden rows
    this.startPagingRow = 0; //1st row index of current page
    this.nbPages = 0; //total nb of pages
    this.currentPageNb = 1; //current page nb

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
        tf_isArray(this.sortConfig['sort_types']) ?
        f.sort_config.sort_types : [];
    this.sortConfig.sortCol = this.sortConfig['sort_col']!==undefined ?
        f.sort_config.sort_col : null;
    this.sortConfig.asyncSort =
        this.sortConfig['async_sort']===true ? true : false;
    this.sortConfig.triggerIds =
        tf_isArray(this.sortConfig['sort_trigger_ids']) ?
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
    //defines css class for highlighting
    this.highlightCssClass = f.highlight_css_class || 'keyword';
    this.highlightedNodes = [];

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
    this.colNbFormat = tf_isArray(this.hasColNbFormat) ?
        f.col_number_format : null;
    //enables date type per column
    this.hasColDateType = f.col_date_type===true ? true : false;
    //array containing columns date type
    this.colDateType = tf_isArray(this.hasColDateType) ?
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
    //cookie duration
    this.cookieDuration = !isNaN(f.set_cookie_duration) ?
        parseInt(f.set_cookie_duration, 10) :100000;

    /*** extensions ***/
    //imports external script
    this.hasExtensions = f.extensions===true ? true : false;
    this.extensions = this.hasExtensions ? f.extensions : null;

    /*** themes ***/
    this.enableDefaultTheme = f.enable_default_theme===true ?
        true : false;
    //imports themes
    this.hasThemes = (f.enable_default_theme ||
        (f.themes && tf_IsObj(f.themes))) ? true : false;
    this.themes = this.hasThemes ? f.themes : null;
    //themes path
    this.themesPath = f.themes_path || this.basePath+'TF_Themes/';

    /***(deprecated: backward compatibility) ***/
    //imports external script
    this.hasBindScript = f.bind_script===true ? true : false;
    this.bindScript = (this.hasBindScript) ? f.bind_script : null;

    /*** TF events ***/
    var o = this;
    this.Evt = {
        name: {
            filter: 'Filter',
            populateselect: 'Populate',
            populatechecklist: 'PopulateCheckList',
            changepage: 'ChangePage',
            clear: 'Clear',
            changeresultsperpage: 'ChangeResults',
            resetvalues: 'ResetValues',
            resetpage: 'ResetPage',
            resetpagelength: 'ResetPageLength',
            sort: 'Sort',
            loadextensions: 'LoadExtensions',
            loadthemes: 'LoadThemes'
        },
        getKeyCode: function(e){
            return e.charCode ? evt.charCode :
                (evt.keyCode ? evt.keyCode: (evt.which ? evt.which : 0));
        },
        /*====================================================
            - Detects <enter> key for a given element
        =====================================================*/
        _DetectKey: function(e) {
            if(!o.enterKey){ return; }
            var evt = e || window.event;
            if(evt){
                var key = o.Evt.getKeyCode(evt);
                if(key===13){
                    o._Filter();
                    tf_CancelEvent(evt);
                    tf_StopEvent(evt);
                } else {
                    o.isUserTyping = true;
                    window.clearInterval(o.onKeyUpTimer);
                    o.onKeyUpTimer = undefined;
                }
            }//if evt
        },
        /*====================================================
            - onkeyup event for text filters
        =====================================================*/
        _OnKeyUp: function(e) {
            if(!o.onKeyUp) return;
            var evt = e || window.event;
            var key = o.Evt.getKeyCode(evt);
            o.isUserTyping = false;

            function filter() {
                window.clearInterval(o.onKeyUpTimer);
                o.onKeyUpTimer = undefined;
                if(!o.isUserTyping)
                {
                    o.Filter();
                    o.isUserTyping = null;
                }
            }

            if(key!==13 && key!==9 && key!==27 && key!==38 && key!==40) {
                if(o.onKeyUpTimer===undefined){
                    o.onKeyUpTimer = window.setInterval(filter, o.onKeyUpDelay);
                }
            } else {
                window.clearInterval(o.onKeyUpTimer);
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
                window.clearInterval(o.onKeyUpTimer);
            }
            //Watermark
            if(this.value === '' && o.inpWatermark !== ''){
                this.value = (o.isInpWatermarkArray) ?
                    o.inpWatermark[this.getAttribute('ct')] :
                    o.inpWatermark;
                tf_AddClass(this, o.inpWatermarkCssClass);
            }
            if(o.ezEditTable){
              if(o.editable) o.ezEditTable.Editable.Set();
              if(o.selectable) o.ezEditTable.Selection.Set();
            }
        },
        /*====================================================
            - onfocus event for input filters
        =====================================================*/
        _OnInpFocus: function(e) {
            var evt = e || window.event;
            o.activeFilterId = this.getAttribute('id');
            o.activeFlt = tf_Id(o.activeFilterId);
            //Watermark
            if(!o.isInpWatermarkArray){
                if(this.value === o.inpWatermark &&
                    o.inpWatermark !== ''){
                    this.value = '';
                    tf_RemoveClass(this, o.inpWatermarkCssClass);
                }
            } else {
                var inpWatermark = o.inpWatermark[this.getAttribute('ct')];
                if(this.value === inpWatermark && inpWatermark !== ''){
                    this.value = '';
                    tf_RemoveClass(this, o.inpWatermarkCssClass);
                }
            }
            if(o.popUpFilters){
                tf_CancelEvent(evt);
                tf_StopEvent(evt);
            }
            if(o.ezEditTable){
                if(o.editable) o.ezEditTable.Editable.Remove();
                if(o.selectable) o.ezEditTable.Selection.Remove();
            }
        },
        /*====================================================
            - onfocus event for select filters
        =====================================================*/
        _OnSlcFocus: function(e) {
            var evt = e || window.event;
            o.activeFilterId = this.getAttribute('id');
            o.activeFlt = tf_Id(o.activeFilterId);
            if(o.fillSlcOnDemand && this.getAttribute('filled') === '0')
            {// select is populated when element has focus
                var ct = this.getAttribute('ct');
                o.PopulateSelect(ct);
                if(!tf_isIE){ this.setAttribute('filled','1'); }
            }
            if(o.popUpFilters){
                tf_CancelEvent(evt);
                tf_StopEvent(evt);
            }
        },
        /*====================================================
            - onchange event for select filters
        =====================================================*/
        _OnSlcChange: function(e) {
            var colIndex = o.activeFlt.getAttribute('colIndex');
            //Checks filter is a checklist and caller is not null
            if(o.activeFlt && colIndex &&
                o['col'+colIndex]===o.fltTypeCheckList &&
                !o.Evt._OnSlcChange.caller){ return; }
            var evt = e || window.event;
            if(o.popUpFilters){ tf_StopEvent(evt); }
            if(o.onSlcChange){ o.Filter(); }
        },
        /*====================================================
            - onblur event for select filters
        =====================================================*/
        _OnSlcBlur: function(e) {},
        /*====================================================
            - onchange event for checklist filters
        =====================================================*/
        _OnCheckListChange: function(e) {
            //Checks caller is not null
            if(!o.Evt._OnCheckListChange.caller){ return; }
            o.Evt._OnSlcChange(e);
        },
        /*====================================================
            - onclick event for checklist filters
        =====================================================*/
        _OnCheckListClick: function() {
            if(o.fillSlcOnDemand && this.getAttribute('filled') === '0')
            {
                var ct = this.getAttribute('ct');
                o.PopulateCheckList(ct);
                o.checkListDiv[ct].onclick = null;
                o.checkListDiv[ct].title = '';
            }
        },
        /*====================================================
            - onclick event for checklist filter container
        =====================================================*/
        _OnCheckListFocus: function(e) {
            o.activeFilterId = this.firstChild.getAttribute('id');
            o.activeFlt = tf_Id(o.activeFilterId);
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
        /*====================================================
            - clears filters
        =====================================================*/
        _Clear: function() {
            o.ClearFilters();
        },
        /*====================================================
            - Help button onclick event
        =====================================================*/
        _OnHelpBtnClick: function() {
            o._ToggleHelp();
        },
        _Paging: { //used by sort adapter
            nextEvt: null,
            prevEvt: null,
            lastEvt: null,
            firstEvt: null
        }
    };
}

TF.prototype = {

    AddGrid: function(){ this._AddGrid();},
    Init: function(){ this.AddGrid(); },
    Initialize: function(){ this.AddGrid(); },
    init: function(){ this.AddGrid(); },
    initialize: function(){ this.AddGrid(); },
    /*====================================================
        - adds row with filtering grid bar and sets grid
        behaviours and layout
    =====================================================*/
    _AddGrid: function(){
        if(this.hasGrid) return;
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

        if(this.gridLayout){
            this.isExternalFlt = true;
            this.SetGridLayout();
            //Once grid generated 1st filterable row is 0 again
            this.refRow = (tf_isIE || tf_isIE7) ? (this.refRow+1) : 0;
        }

        if(this.loader){ this.SetLoader(); }

        if(this.popUpFilters){
            if(!this.isFirstLoad && !this.gridLayout){
                this.headersRow--;
            }
            this.SetPopupFilterIcons();
        }

        if(this.hasResultsPerPage){
            this.resultsPerPage = f['results_per_page'] || this.resultsPerPage;
            if(this.resultsPerPage.length<2){
                this.hasResultsPerPage = false;
            } else {
                this.pagingLength = this.resultsPerPage[1][0];
            }
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
                    var thead = tf_Tag(this.tbl,'thead');
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
                    if(this.fixedHeaders){
                        this.SetFixedHeaders();
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
                    var fltcell = tf_CreateElm(this.fltCellTag),
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

                    if(this.popUpFilters){
                        this.SetPopupFilter(i);
                    }

                    if(col===undefined){
                        col = f['col_'+i]===undefined ?
                            this.fltTypeInp : f['col_'+i].tf_LCase();
                    }

                    //only 1 input for single search
                    if(this.singleSearchFlt){
                        col = this.fltTypeInp;
                        inpclass = this.singleFltCssClass;
                    }

                    //selects
                    if(col===this.fltTypeSlc ||
                        col===this.fltTypeMulti){
                        var slc = tf_CreateElm(this.fltTypeSlc,
                            ['id',this.prfxFlt+i+'_'+this.id],
                            ['ct',i], ['filled','0']);

                        if(col===this.fltTypeMulti){
                            slc.multiple = this.fltTypeMulti;
                            slc.title = this.multipleSlcTooltip;
                        }
                        slc.className = (col.tf_LCase()===this.fltTypeSlc) ?
                            inpclass : this.fltMultiCssClass;// for ie<=6

                        //filter is appended in desired element
                        if(externalFltTgtId){
                            tf_Id(externalFltTgtId).appendChild(slc);
                            this.externalFltEls.push(slc);
                        } else {
                            fltcell.appendChild(slc);
                        }

                        this.fltIds.push(this.prfxFlt+i+'_'+this.id);

                        if(!this.fillSlcOnDemand){
                            this._PopulateSelect(i);
                        }

                        slc.onkeypress = this.Evt._DetectKey;
                        slc.onchange = this.Evt._OnSlcChange;
                        slc.onfocus = this.Evt._OnSlcFocus;
                        slc.onblur = this.Evt._OnSlcBlur;

                        //1st option is created here since PopulateSelect isn't
                        //invoked
                        if(this.fillSlcOnDemand){
                            var opt0 = tf_CreateOpt(this.displayAllText,'');
                            slc.appendChild(opt0);
                        }

                        /*  Code below for IE: it prevents select options to
                            slide out before select it-self is populated.
                            This is an unexpeted behavior for users since at
                            1st click options are empty. Work around:
                            select is disabled and by clicking on element
                            (parent td), users enable drop-down and select is
                            populated at same time.  */
                        if(this.fillSlcOnDemand && tf_isIE){
                            slc.disabled = true;
                            slc.title = this.activateSlcTooltip;
                            slc.parentNode.onclick = this.Evt._EnableSlc;
                            if(col===this.fltTypeMulti){
                                this.__deferMultipleSelection(slc,0);
                            }
                        }
                    }
                    // checklist
                    else if(col===this.fltTypeCheckList){
                        var divCont = tf_CreateElm('div',
                            ['id',this.prfxCheckListDiv+i+'_'+this.id],
                            ['ct',i],['filled','0']);
                        divCont.className = this.checkListDivCssClass;

                        //filter is appended in desired element
                        if(externalFltTgtId){
                            tf_Id(externalFltTgtId).appendChild(divCont);
                            this.externalFltEls.push(divCont);
                        } else {
                            fltcell.appendChild(divCont);
                        }

                        this.checkListDiv[i] = divCont;
                        this.fltIds.push(this.prfxFlt+i+'_'+this.id);
                        if(!this.fillSlcOnDemand){
                            this._PopulateCheckList(i);
                        }

                        divCont.onclick = this.Evt._OnCheckListFocus;

                        if(this.fillSlcOnDemand){
                            divCont.onclick = this.Evt._OnCheckListClick;
                            divCont.appendChild(
                                tf_CreateText(this.activateCheckListTxt));
                        }
                    }

                    else{
                        //show/hide input
                        var inptype = col===this.fltTypeInp ? 'text' : 'hidden';
                        var inp = tf_CreateElm(this.fltTypeInp,
                            ['id',this.prfxFlt+i+'_'+this.id],
                            ['type',inptype],['ct',i]);
                        if(inptype!='hidden'){
                            inp.value = (this.isInpWatermarkArray) ?
                                this.inpWatermark[i] : this.inpWatermark;
                        }
                        inp.className = inpclass;// for ie<=6
                        if(this.inpWatermark!==''){
                            //watermark css class
                            tf_AddClass(inp, this.inpWatermarkCssClass);
                        }
                        inp.onfocus = this.Evt._OnInpFocus;

                        //filter is appended in desired element
                        if(externalFltTgtId){
                            tf_Id(externalFltTgtId).appendChild(inp);
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
                            //reads the cookie
                            var flts = tf_ReadCookie(this.fltsValuesCookie);
                            var reg = new RegExp(this.separator,'g');
                            //creates an array with filters' values
                            var flts_values = flts.split(reg);
                            if(flts_values[i]!=' '){
                                this.SetFilterValue(i,flts_values[i],false);
                            }
                        }
                    }
                    // this adds submit button
                    if(i==n-1 && this.displayBtn){
                        var btn = tf_CreateElm(this.fltTypeInp,
                            ['id',this.prfxValButton+i+'_'+this.id],
                            ['type','button'], ['value',this.btnText]);
                        btn.className = this.btnCssClass;

                        //filter is appended in desired element
                        if(externalFltTgtId){
                            tf_Id(externalFltTgtId).appendChild(btn);
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
            this.SetRowsCounter();
        }
        if(this.statusBar){
            this.SetStatusBar();
        }
        if(this.fixedHeaders && !this.isFirstLoad){
            this.SetFixedHeaders();
        }
        if(this.paging){
            this.SetPaging();
        }
        if(this.hasResultsPerPage && this.paging){
            this.SetResultsPerPage();
        }
        if(this.btnReset){
            this.SetResetBtn();
        }
        if(this.helpInstructions){
            this.SetHelpInstructions();
        }
        if(this.hasColWidth && !this.gridLayout){
            this.SetColWidths();
        }
        if(this.alternateBgs && this.isStartBgAlternate){
            //1st time only if no paging and rememberGridValues
            this.SetAlternateRows();
        }
        if(this.hasColOperation && this.fltGrid){
            this.colOperation = f.col_operation;
            this.SetColOperation();
        }
        if(this.sort || this.gridLayout){
            this.SetSort();
        }
        if(this.selectable || this.editable){
            this.SetEditable();
        }

        /* Deprecated Loads external script */
        if(this.hasBindScript) {
            if(this.bindScript['src']!==undefined){
                var scriptPath = this.bindScript['src'];
                var scriptName = this.bindScript['name']!==undefined ?
                    this.bindScript['name'] : '';
                this.IncludeFile(
                    scriptName,scriptPath,this.bindScript['target_fn']);
            }
        }//if bindScript
        /* */

        this.isFirstLoad = false;
        this.hasGrid = true;

        if(this.rememberGridValues || this.rememberPageLen ||
            this.rememberPageNb){
            this.ResetValues();
        }

        //TF css class is added to table
        if(!this.gridLayout){
            tf_AddClass(this.tbl, this.prfxTf);
        }

        if(this.loader){
            this.ShowLoader('none');
        }

        /* Loads extensions */
        if(this.hasExtensions){
            this.LoadExtensions();
        }

        if(this.onFiltersLoaded){
            this.onFiltersLoaded.call(null,this);
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
                case o.Evt.name.populateselect:
                    if(o.refreshFilters){
                        o._PopulateSelect(slcIndex,true);
                    } else {
                        o._PopulateSelect(slcIndex,false,slcExternal,slcId);
                    }
                break;
                case o.Evt.name.populatechecklist:
                    o._PopulateCheckList(slcIndex,slcExternal,slcId);
                break;
                case o.Evt.name.changepage:
                    o._ChangePage(pgIndex);
                break;
                case o.Evt.name.clear:
                    o._ClearFilters();
                    o._Filter();
                break;
                case o.Evt.name.changeresultsperpage:
                    o._ChangeResultsPerPage();
                break;
                case o.Evt.name.resetvalues:
                    o._ResetValues();
                    o._Filter();
                break;
                case o.Evt.name.resetpage:
                    o._ResetPage(o.pgNbCookie);
                break;
                case o.Evt.name.resetpagelength:
                    o._ResetPageLength(o.pgLenCookie);
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
                o.ShowLoader('none');
            }
        }

        if(this.loader || this.status || this.statusBar) {
            try{
                this.ShowLoader('');
                this.StatusMsg(o['msg'+evt]);
            } catch(e){}
            window.setTimeout(efx,this.execDelay);
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
        if(!this.hasExtensions || !tf_IsArray(this.extensions.name) ||
            !tf_IsArray(this.extensions.src)){
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
            if(tf_IsImported(extPath)){
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
        if(tf_IsArray(this.themes.name) && tf_IsArray(this.themes.src)){
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

                if(!tf_IsImported(thmPath,'link')){
                    this.IncludeFile(thmName, thmPath, null, 'link');
                }
                if(tf_IsFn(thmInit)){
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
                this.RemovePaging();
            }
            if(this.statusBar){
                this.RemoveStatusBar();
            }
            if(this.rowsCounter){
                this.RemoveRowsCounter();
            }
            if(this.btnReset){
                this.RemoveResetBtn();
            }
            if(this.helpInstructions || !this.helpInstructions){
                this.RemoveHelpInstructions();
            }
            if(this.paging){
                this.RemoveResultsPerPage();
            }
            if(this.isExternalFlt && !this.popUpFilters){
                this.RemoveExternalFlts();
            }
            if(this.fixedHeaders){
                this.RemoveFixedHeaders();
            }
            if(this.infDiv){
                this.RemoveTopDiv();
            }
            if(this.highlightKeywords){
                this.UnhighlightAll();
            }
            if(this.sort){
                this.RemoveSort();
            }
            if(this.loader){
                this.RemoveLoader();
            }
            if(this.popUpFilters){
                this.RemovePopupFilters();
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
                        if(attribs.nodeName.tf_LCase()==='validrow'){
                            row.removeAttribute('validRow');
                        }
                    }
                }

                //removes alternating colors
                if(this.alternateBgs){
                    this.RemoveRowBg(j);
                }

            }//for j

            if(this.fltGrid && !this.gridLayout){
                this.fltGridEl = rows[this.filtersRowIndex];
                this.tbl.deleteRow(this.filtersRowIndex);
            }
            if(this.gridLayout){
                this.RemoveGridLayout();
            }
            tf_RemoveClass(this.tbl, this.prfxTf);
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
        var infdiv = tf_CreateElm('div', ['id',this.prfxInfDiv+this.id]);
        infdiv.className = this.infDivCssClass;

        //custom container
        if(this.toolBarTgtId){
            tf_Id(this.toolBarTgtId).appendChild(infdiv);
        }
        //fixed headers
        else if(this.fixedHeaders && this.contDiv){
            this.contDiv.parentNode.insertBefore(infdiv, this.contDiv);
        }
        //grid-layout
        else if(this.gridLayout){
            this.tblMainCont.appendChild(infdiv);
            infdiv.className = this.gridInfDivCssClass;
        }
        //default location: just above the table
        else{
            this.tbl.parentNode.insertBefore(infdiv, this.tbl);
        }
        this.infDiv = tf_Id(this.prfxInfDiv+this.id);

        /*** left div containing rows # displayer ***/
        var ldiv = tf_CreateElm('div', ['id',this.prfxLDiv+this.id]);
        ldiv.className = this.lDivCssClass;
        infdiv.appendChild(ldiv);
        this.lDiv = tf_Id(this.prfxLDiv+this.id);

        /***    right div containing reset button
                + nb results per page select    ***/
        var rdiv = tf_CreateElm('div', ['id',this.prfxRDiv+this.id]);
        rdiv.className = this.rDivCssClass;
        infdiv.appendChild(rdiv);
        this.rDiv = tf_Id(this.prfxRDiv+this.id);

        /*** mid div containing paging elements ***/
        var mdiv = tf_CreateElm('div', ['id',this.prfxMDiv+this.id]);
        mdiv.className = this.mDivCssClass;
        infdiv.appendChild(mdiv);
        this.mDiv = tf_Id(this.prfxMDiv+this.id);

        if(!this.helpInstructions){
            this.SetHelpInstructions();
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
                externalFlt = tf_Id(externalFltTgtId);
            if(externalFlt){
                externalFlt.innerHTML = '';
            }
        }
    },

    /*====================================================
        - generates loader div
    =====================================================*/
    SetLoader: function(){
        if(this.loaderDiv){
            return;
        }
        var f = this.fObj;
        //id of container element
        this.loaderTgtId = f.loader_target_id || null;
        //div containing loader
        this.loaderDiv = null;
        //defines loader text
        this.loaderText = f.loader_text || 'Loading...';
        //defines loader innerHtml
        this.loaderHtml = f.loader_html || null;
        //defines css class for loader div
        this.loaderCssClass = f.loader_css_class || 'loader';
        //delay for hiding loader
        this.loaderCloseDelay = 200;
        //callback function before loader is displayed
        this.onShowLoader = tf_IsFn(f.on_show_loader) ? f.on_show_loader : null;
        //callback function after loader is closed
        this.onHideLoader = tf_IsFn(f.on_hide_loader) ? f.on_hide_loader : null;

        var containerDiv = tf_CreateElm( 'div',['id',this.prfxLoader+this.id] );
        containerDiv.className = this.loaderCssClass;// for ie<=6

        var targetEl = (!this.loaderTgtId) ?
            (this.gridLayout ? this.tblCont : this.tbl.parentNode) :
            tf_Id(this.loaderTgtId);
        if(!this.loaderTgtId){
            targetEl.insertBefore(containerDiv, this.tbl);
        } else {
            targetEl.appendChild(containerDiv);
        }
        this.loaderDiv = tf_Id(this.prfxLoader+this.id);
        if(!this.loaderHtml){
            this.loaderDiv.appendChild(tf_CreateText(this.loaderText));
        } else {
            this.loaderDiv.innerHTML = this.loaderHtml;
        }
    },

    /*====================================================
        - removes loader div
    =====================================================*/
    RemoveLoader: function(){
        if(!this.loaderDiv){
            return;
        }
        var targetEl = (!this.loaderTgtId) ?
            (this.gridLayout ? this.tblCont : this.tbl.parentNode) :
            tf_Id(this.loaderTgtId);
        targetEl.removeChild(this.loaderDiv);
        this.loaderDiv = null;
    },

    /*====================================================
        - displays/hides loader div
    =====================================================*/
    ShowLoader: function(p){
        if(!this.loader || !this.loaderDiv || this.loaderDiv.style.display===p){
            return;
        }
        var o = this;

        function displayLoader(){
            if(!o.loaderDiv){
                return;
            }
            if(o.onShowLoader && p!=='none'){
                o.onShowLoader.call(null,o);
            }
            o.loaderDiv.style.display = p;
            if(o.onHideLoader && p==='none'){
                o.onHideLoader.call(null,o);
            }
        }

        var t = p==='none' ? this.loaderCloseDelay : 1;
        window.setTimeout(displayLoader,t);
    },

    /*====================================================
        - Sets sorting feature by loading
        WebFX Sortable Table 1.12 plugin by Erik Arvidsson
        and TF adapter by Max Guglielmi
    =====================================================*/
    SetSort: function(){
        var fn = this.Evt._EnableSort,
            sortConfig = this.sortConfig;

        if(!tf_IsFn(fn)){
            var o = this;
            /*====================================================
                - enables table sorting
            =====================================================*/
            this.Evt._EnableSort = function(){
                //gridLayout needs sort to be re-enabled
                if(o.isSortEnabled && !o.gridLayout){
                    return;
                }
                if(tf_IsImported(sortConfig.adapterSrc)){
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

        if(tf_IsImported(this.sortConfig.src)){
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
        if(tf_IsImported(ezEditConfig.src)){
            this._EnableEditable();
        } else {
            this.IncludeFile(
                ezEditConfig.name,
                ezEditConfig.src,
                this._EnableEditable
            );
        }
        if(ezEditConfig.loadStylesheet &&
            !tf_IsImported(ezEditConfig.stylesheet, 'link')){
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
            thead = tf_Tag(o.tbl,'thead');

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
                    isRowValid = validIndexes.tf_Has(row.rowIndex),
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
                        o._lastValidRowIndex = validIndexes.tf_IndexByValue(
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
                        o._lastValidRowIndex = validIndexes.tf_IndexByValue(
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
                            pagingEndRow = parseInt(o.startPagingRow,10) +
                            parseInt(o.pagingLength,10);
                        var rowIndex = row.rowIndex;
                        if((rowIndex === validIndexes[validIdxLen-1]) &&
                            o.currentPageNb!=o.nbPages){
                            o.SetPage('last');
                        }
                        else if((rowIndex == validIndexes[0]) &&
                            o.currentPageNb!==1){
                            o.SetPage('first');
                        }
                        else if(rowIndex > validIndexes[pagingEndRow-1] &&
                            rowIndex < validIndexes[validIdxLen-1]){
                            o.SetPage('next');
                        }
                        else if(rowIndex < validIndexes[o.startPagingRow] &&
                            rowIndex > validIndexes[0]){
                            o.SetPage('previous');
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
                if(!o.paging){ o.RefreshNbRows(); }
                else {
                    o.nbRows++;
                    o.nbVisibleRows++;
                    o.nbFilterableRows++;
                    o.paging=false;
                    o.RemovePaging();
                    o.AddPaging(false);
                }
                if(o.alternateBgs){
                    o.SetAlternateRows();
                }
                if(fnE){
                    fnE.call(null, arguments[0], arguments[1], arguments[2]);
                }
            };
            if(ezEditConfig.actions && ezEditConfig.actions['delete']){
                var fnF = ezEditConfig.actions['delete'].on_after_submit;
                ezEditConfig.actions['delete'].on_after_submit = function(){
                    o.nbFilterableRows--;
                    if(!o.paging){ o.RefreshNbRows(); }
                    else {
                        o.nbRows--;
                        o.nbVisibleRows--;
                        o.nbFilterableRows--;
                        o.paging=false;
                        o.RemovePaging();
                        o.AddPaging(false);
                    }
                    if(o.alternateBgs){
                        o.SetAlternateRows();
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
        - Generates paging elements:
            - pages drop-down list
            - previous, next, first, last buttons
    =====================================================*/
    SetPaging: function(){
        if(!this.hasGrid && !this.isFirstLoad || !this.paging ||
            (!this.isPagingRemoved && !this.isFirstLoad)){
            return;
        }

        var f = this.fObj;
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
        this.onBeforeChangePage = tf_IsFn(f.on_before_change_page) ?
            f.on_before_change_page : null;
        //calls function before page is changed
        this.onAfterChangePage = tf_IsFn(f.on_after_change_page) ?
            f.on_after_change_page : null;
        var start_row = this.refRow;
        var nrows = this.nbRows;
        //calculates page nb
        this.nbPages = Math.ceil((nrows-start_row)/this.pagingLength);

        //Paging elements events
        if(!this.Evt._Paging.next){
            var o = this;
            this.Evt._Paging = {// paging buttons events
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
                    if(o.Evt._Paging.lastEvt) o.Evt._Paging.lastEvt();
                    o.ChangePage(o.Evt._Paging.nbOpts());
                },
                first: function(){
                    if(o.Evt._Paging.firstEvt){
                        o.Evt._Paging.firstEvt();
                    }
                    o.ChangePage(0);
                },
                _detectKey: function(e){
                    var evt = e || window.event;
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

        /*====================================================
            - onchange event for paging select
        =====================================================*/
        if(!this.Evt._OnSlcPagesChange){
            this.Evt._OnSlcPagesChange = function(){
                if(o.Evt._Paging._OnSlcPagesChangeEvt){
                    o.Evt._Paging._OnSlcPagesChangeEvt();
                }
                o.ChangePage();
                this.blur();
                //ie only: blur is not enough...
                if(this.parentNode && tf_isIE){
                    this.parentNode.focus();
                }
            };
        }

        var slcPages;

        // Paging drop-down list selector
        if(this.pageSelectorType === this.fltTypeSlc){
            slcPages = tf_CreateElm(
                this.fltTypeSlc, ['id',this.prfxSlcPages+this.id]);
            slcPages.className = this.pgSlcCssClass;
            slcPages.onchange = this.Evt._OnSlcPagesChange;
        }

        // Paging input selector
        if(this.pageSelectorType === this.fltTypeInp){
            slcPages = tf_CreateElm(
                this.fltTypeInp,
                ['id',this.prfxSlcPages+this.id],
                ['value',this.currentPageNb]
            );
            slcPages.className = this.pgInpCssClass;
            slcPages.onkeypress = this.Evt._Paging._detectKey;
        }

        // btns containers
        var btnNextSpan = tf_CreateElm(
            'span',['id',this.prfxBtnNextSpan+this.id]);
        var btnPrevSpan = tf_CreateElm(
            'span',['id',this.prfxBtnPrevSpan+this.id]);
        var btnLastSpan = tf_CreateElm(
            'span',['id',this.prfxBtnLastSpan+this.id]);
        var btnFirstSpan = tf_CreateElm(
            'span',['id',this.prfxBtnFirstSpan+this.id]);

        if(this.hasPagingBtns){
            // Next button
            if(!this.btnNextPageHtml){
                var btn_next = tf_CreateElm(
                    this.fltTypeInp,['id',this.prfxBtnNext+this.id],
                    ['type','button'],
                    ['value',this.btnNextPageText],
                    ['title','Next']
                );
                btn_next.className = this.btnPageCssClass;
                btn_next.onclick = this.Evt._Paging.next;
                btnNextSpan.appendChild(btn_next);
            } else {
                btnNextSpan.innerHTML = this.btnNextPageHtml;
                btnNextSpan.onclick = this.Evt._Paging.next;
            }
            // Previous button
            if(!this.btnPrevPageHtml){
                var btn_prev = tf_CreateElm(
                    this.fltTypeInp,
                    ['id',this.prfxBtnPrev+this.id],
                    ['type','button'],
                    ['value',this.btnPrevPageText],
                    ['title','Previous']
                );
                btn_prev.className = this.btnPageCssClass;
                btn_prev.onclick = this.Evt._Paging.prev;
                btnPrevSpan.appendChild(btn_prev);
            } else {
                btnPrevSpan.innerHTML = this.btnPrevPageHtml;
                btnPrevSpan.onclick = this.Evt._Paging.prev;
            }
            // Last button
            if(!this.btnLastPageHtml){
                var btn_last = tf_CreateElm(
                    this.fltTypeInp,
                    ['id',this.prfxBtnLast+this.id],
                    ['type','button'],
                    ['value',this.btnLastPageText],
                    ['title','Last']
                );
                btn_last.className = this.btnPageCssClass;
                btn_last.onclick = this.Evt._Paging.last;
                btnLastSpan.appendChild(btn_last);
            } else {
                btnLastSpan.innerHTML = this.btnLastPageHtml;
                btnLastSpan.onclick = this.Evt._Paging.last;
            }
            // First button
            if(!this.btnFirstPageHtml){
                var btn_first = tf_CreateElm(
                    this.fltTypeInp,
                    ['id',this.prfxBtnFirst+this.id],
                    ['type','button'],
                    ['value',this.btnFirstPageText],
                    ['title','First']
                );
                btn_first.className = this.btnPageCssClass;
                btn_first.onclick = this.Evt._Paging.first;
                btnFirstSpan.appendChild(btn_first);
            } else {
                btnFirstSpan.innerHTML = this.btnFirstPageHtml;
                btnFirstSpan.onclick = this.Evt._Paging.first;
            }
        }

        // paging elements (buttons+drop-down list) are added to defined element
        if(!this.pagingTgtId){
            this.SetTopDiv();
        }
        var targetEl = !this.pagingTgtId ? this.mDiv : tf_Id(this.pagingTgtId);

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

        var pgBeforeSpan = tf_CreateElm(
            'span',['id',this.prfxPgBeforeSpan+this.id] );
        pgBeforeSpan.appendChild( tf_CreateText(this.pageText) );
        pgBeforeSpan.className = this.nbPgSpanCssClass;
        targetEl.appendChild(pgBeforeSpan);
        targetEl.appendChild(slcPages);
        var pgAfterSpan = tf_CreateElm(
            'span',['id',this.prfxPgAfterSpan+this.id]);
        pgAfterSpan.appendChild( tf_CreateText(this.ofText) );
        pgAfterSpan.className = this.nbPgSpanCssClass;
        targetEl.appendChild(pgAfterSpan)
        var pgspan = tf_CreateElm( 'span',['id',this.prfxPgSpan+this.id] );
        pgspan.className = this.nbPgSpanCssClass;
        pgspan.appendChild( tf_CreateText(' '+this.nbPages+' ') );
        targetEl.appendChild(pgspan);
        targetEl.appendChild(btnNextSpan);
        targetEl.appendChild(btnLastSpan);
        this.pagingSlc = tf_Id(this.prfxSlcPages+this.id);

        // if this.rememberGridValues==true this.SetPagingInfo() is called
        // in ResetGridValues() method
        if(!this.rememberGridValues || this.isPagingRemoved){
            this.SetPagingInfo();
        }
        if(!this.fltGrid){
            this.ValidateAllRows();
            this.SetPagingInfo(this.validRowsIndex);
        }

        this.pagingBtnEvents = this.Evt._Paging;
        this.isPagingRemoved = false;
    },

    /*====================================================
        - Removes paging elements
    =====================================================*/
    RemovePaging: function(){
        if(!this.hasGrid || !this.pagingSlc){
            return;
        }

        // btns containers
        var btnNextSpan, btnPrevSpan, btnLastSpan, btnFirstSpan;
        var pgBeforeSpan, pgAfterSpan, pgspan;
        btnNextSpan = tf_Id(this.prfxBtnNextSpan+this.id);
        btnPrevSpan = tf_Id(this.prfxBtnPrevSpan+this.id);
        btnLastSpan = tf_Id(this.prfxBtnLastSpan+this.id);
        btnFirstSpan = tf_Id(this.prfxBtnFirstSpan+this.id);
        //span containing 'Page' text
        pgBeforeSpan = tf_Id(this.prfxPgBeforeSpan+this.id);
        //span containing 'of' text
        pgAfterSpan = tf_Id(this.prfxPgAfterSpan+this.id);
        //span containing nb of pages
        pgspan = tf_Id(this.prfxPgSpan+this.id);

        this.pagingSlc.parentNode.removeChild(this.pagingSlc);

        if(btnNextSpan){
            btnNextSpan.parentNode.removeChild( btnNextSpan );
        }

        if(btnPrevSpan){
            btnPrevSpan.parentNode.removeChild( btnPrevSpan );
        }

        if(btnLastSpan){
            btnLastSpan.parentNode.removeChild( btnLastSpan );
        }

        if(btnFirstSpan){
            btnFirstSpan.parentNode.removeChild( btnFirstSpan );
        }

        if(pgBeforeSpan){
            pgBeforeSpan.parentNode.removeChild( pgBeforeSpan );
        }

        if(pgAfterSpan){
            pgAfterSpan.parentNode.removeChild( pgAfterSpan );
        }

        if(pgspan){
            pgspan.parentNode.removeChild( pgspan );
        }

        this.pagingBtnEvents = null;
        this.pagingSlc = null;
        this.isPagingRemoved = true;
    },

    /*====================================================
        - calculates page # according to valid rows
        - refreshes paging select according to page #
        - Calls GroupByPage method
    =====================================================*/
    SetPagingInfo: function(validRows){
        var rows = this.tbl.rows;
        var mdiv = !this.pagingTgtId ? this.mDiv : tf_Id(this.pagingTgtId);
        var pgspan = tf_Id(this.prfxPgSpan+this.id);
        //stores valid rows indexes
        if(validRows && validRows.length>0){
            this.validRowsIndex = validRows;
        } else {
            //re-sets valid rows indexes array
            this.validRowsIndex = [];

            //counts rows to be grouped
            for(var j=this.refRow; j<this.nbRows; j++){
                var row = rows[j];
                if(!row){
                    continue;
                }
                var isRowValid = row.getAttribute('validRow');
                if(isRowValid==='true' || !isRowValid){
                    this.validRowsIndex.push(j);
                }
            }
        }

        //calculate nb of pages
        this.nbPages = Math.ceil(this.validRowsIndex.length/this.pagingLength);
        //refresh page nb span
        pgspan.innerHTML = this.nbPages;
        //select clearing shortcut
        if(this.pageSelectorType===this.fltTypeSlc){
            this.pagingSlc.innerHTML = '';
        }

        if(this.nbPages>0){
            mdiv.style.visibility = 'visible';
            if(this.pageSelectorType===this.fltTypeSlc){
                for(var z=0; z<this.nbPages; z++){
                    var currOpt = new Option(
                        (z+1),
                        z*this.pagingLength,
                        false,
                        false
                    );
                    this.pagingSlc.options[z] = currOpt;
                }
            } else{
                //input type
                this.pagingSlc.value = this.currentPageNb;
            }

        } else {
            /*** if no results paging select and buttons are hidden ***/
            mdiv.style.visibility = 'hidden';
        }
        this.GroupByPage(this.validRowsIndex);
    },

    /*====================================================
        - Displays current page rows
    =====================================================*/
    GroupByPage: function(validRows){
        var rows = this.tbl.rows;
        var paging_end_row = parseInt(this.startPagingRow, 10) +
            parseInt(this.pagingLength, 10);

        //store valid rows indexes
        if(validRows){
            this.validRowsIndex = validRows;
        }

        //this loop shows valid rows of current page
        for(var h=0; h<this.validRowsIndex.length; h++){
            var r = rows[ this.validRowsIndex[h] ];
            if(h>=this.startPagingRow && h<paging_end_row){
                if(r.getAttribute('validRow')==='true' ||
                    !r.getAttribute('validRow')){
                    r.style.display = '';
                }
                if(this.alternateBgs){
                    this.SetRowBg(this.validRowsIndex[h], h);
                }
            } else {
                r.style.display = 'none';
                if(this.alternateBgs){
                    this.RemoveRowBg(this.validRowsIndex[h]);
                }
            }
        }

        this.nbVisibleRows = this.validRowsIndex.length;
        this.isStartBgAlternate = false;
        //re-applies filter behaviours after filtering process
        this.ApplyGridProps();
    },

    /*====================================================
        - If paging set true shows page according to
        param value (string or number):
            - strings: 'next','previous','last','first' or
            - number: page number
    =====================================================*/
    SetPage: function(cmd){
        if(!this.hasGrid || !this.paging){
            return;
        }
        var btnEvt = this.pagingBtnEvents,
            cmdtype = typeof cmd;
        if(cmdtype==='string'){
            switch(cmd.tf_LCase()){
                case 'next':
                    btnEvt.next();
                break;
                case 'previous':
                    btnEvt.prev();
                break;
                case 'last':
                    btnEvt.last();
                break;
                case 'first':
                    btnEvt.first();
                break;
                default:
                    btnEvt.next();
                break;
            }
        }
        if(cmdtype==='number'){
            this.ChangePage(cmd-1);
        }
    },

    /*====================================================
        - Generates results per page select + label
    =====================================================*/
    SetResultsPerPage: function(){
        if(!this.hasGrid && !this.isFirstLoad){
            return;
        }
        if(this.resultsPerPageSlc || !this.resultsPerPage){
            return;
        }

        //Change nb results per page event
        if(!this.Evt._OnSlcResultsChange){
            var o = this;
            /*====================================================
                - onchange event for results per page select
            =====================================================*/
            this.Evt._OnSlcResultsChange = function(){
                o.ChangeResultsPerPage();
                this.blur();
                //ie only: blur is not enough...
                if(this.parentNode && tf_isIE){
                    this.parentNode.focus();
                }
            };
        }

        var slcR = tf_CreateElm(
            this.fltTypeSlc, ['id',this.prfxSlcResults+this.id]);
        slcR.className = this.resultsSlcCssClass;
        var slcRText = this.resultsPerPage[0],
            slcROpts = this.resultsPerPage[1];
        var slcRSpan = tf_CreateElm(
            'span',['id',this.prfxSlcResultsTxt+this.id]);
        slcRSpan.className = this.resultsSpanCssClass;

        // results per page select is added to external element
        if(!this.resultsPerPageTgtId){
            this.SetTopDiv();
        }
        var targetEl = ( this.resultsPerPageTgtId==null ) ? this.rDiv : tf_Id( this.resultsPerPageTgtId );
        slcRSpan.appendChild(tf_CreateText(slcRText));
        targetEl.appendChild(slcRSpan);
        targetEl.appendChild(slcR);

        this.resultsPerPageSlc = tf_Id(this.prfxSlcResults+this.id);

        for(var r=0; r<slcROpts.length; r++)
        {
            var currOpt = new Option(slcROpts[r],slcROpts[r],false,false);
            this.resultsPerPageSlc.options[r] = currOpt;
        }
        slcR.onchange = this.Evt._OnSlcResultsChange;
    },

    /*====================================================
        - Removes results per page select + label
    =====================================================*/
    RemoveResultsPerPage: function(){
        if(!this.hasGrid || !this.resultsPerPageSlc || !this.resultsPerPage){
            return;
        }
        var slcR = this.resultsPerPageSlc,
            slcRSpan = tf_Id(this.prfxSlcResultsTxt+this.id);
        if(slcR){
            slcR.parentNode.removeChild( slcR );
        }
        if(slcRSpan){
            slcRSpan.parentNode.removeChild( slcRSpan );
        }
        this.resultsPerPageSlc = null;
    },

    /*====================================================
        - Generates help instructions
    =====================================================*/
    SetHelpInstructions: function(){
        if(this.helpInstrBtnEl){
            return;
        }
        var f = this.fObj;
        //id of custom container element for instructions
        this.helpInstrTgtId = f.help_instructions_target_id || null;
        //id of custom container element for instructions
        this.helpInstrContTgtId = f.help_instructions_container_target_id ||
            null;
        //defines help text
        this.helpInstrText = f.help_instructions_text  ?
            f.help_instructions_text :
            'Use the filters above each column to filter and limit table ' +
            'data. Avanced searches can be performed by using the following ' +
            'operators: <br /><b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, ' +
            '<b>&gt;=</b>, <b>=</b>, <b>*</b>, <b>!</b>, <b>{</b>, <b>}</b>, ' +
            '<b>||</b>,<b>&amp;&amp;</b>, <b>[empty]</b>, <b>[nonempty]</b>, ' +
            '<b>rgx:</b><br/> These operators are described here:<br/>' +
            '<a href="http://tablefilter.free.fr/#operators" ' +
            'target="_blank">http://tablefilter.free.fr/#operators</a><hr/>';
        //defines help innerHtml
        this.helpInstrHtml = f.help_instructions_html || null;
        //defines reset button text
        this.helpInstrBtnText = f.help_instructions_btn_text || '?';
        //defines reset button innerHtml
        this.helpInstrBtnHtml = f.help_instructions_btn_html || null;
        //defines css class for help button
        this.helpInstrBtnCssClass = f.help_instructions_btn_css_class ||
            'helpBtn';
        //defines css class for help container
        this.helpInstrContCssClass = f.help_instructions_container_css_class ||
            'helpCont';
        //help button element
        this.helpInstrBtnEl = null;
         //help content div
        this.helpInstrContEl = null;
        this.helpInstrDefaultHtml = '<div class="helpFooter"><h4>HTML Table ' +
            'Filter Generator v. '+ this.version +'</h4>' +
            '<a href="http://tablefilter.free.fr" target="_blank">' +
            'http://tablefilter.free.fr</a><br/>' +
            '<span>&copy;2009-'+ this.year +' Max Guglielmi.</span>' +
            '<div align="center" style="margin-top:8px;">' +
            '<a href="javascript:;" onclick="window[\'tf_'+ this.id +
            '\']._ToggleHelp();">Close</a></div></div>';

        var helpspan = tf_CreateElm('span',['id',this.prfxHelpSpan+this.id]);
        var helpdiv = tf_CreateElm('div',['id',this.prfxHelpDiv+this.id]);

        //help button is added to defined element
        if(!this.helpInstrTgtId){
            this.SetTopDiv();
        }
        var targetEl = !this.helpInstrTgtId ?
            this.rDiv : tf_Id(this.helpInstrTgtId);
        targetEl.appendChild(helpspan);

        var divContainer = !this.helpInstrContTgtId ?
            helpspan : tf_Id( this.helpInstrContTgtId );

        if(!this.helpInstrBtnHtml){
            divContainer.appendChild(helpdiv);
            var helplink = tf_CreateElm( 'a', ['href','javascript:void(0);']);
            helplink.className = this.helpInstrBtnCssClass;
            helplink.appendChild(tf_CreateText(this.helpInstrBtnText));
            helpspan.appendChild(helplink);
            helplink.onclick = this.Evt._OnHelpBtnClick;
        } else {
            helpspan.innerHTML = this.helpInstrBtnHtml;
            var helpEl = helpspan.firstChild;
            helpEl.onclick = this.Evt._OnHelpBtnClick;
            divContainer.appendChild(helpdiv);
        }

        if(!this.helpInstrHtml){
            helpdiv.innerHTML = this.helpInstrText;
            helpdiv.className = this.helpInstrContCssClass;
            helpdiv.ondblclick = this.Evt._OnHelpBtnClick;
        } else {
            if(this.helpInstrContTgtId) divContainer.appendChild(helpdiv);
            helpdiv.innerHTML = this.helpInstrHtml;
            if(!this.helpInstrContTgtId){
                helpdiv.className = this.helpInstrContCssClass;
                helpdiv.ondblclick = this.Evt._OnHelpBtnClick;
            }
        }
        helpdiv.innerHTML += this.helpInstrDefaultHtml;
        this.helpInstrContEl = helpdiv;
        this.helpInstrBtnEl = helpspan;
    },

    /*====================================================
        - Removes help instructions
    =====================================================*/
    RemoveHelpInstructions: function() {
        if(!this.helpInstrBtnEl){
            return;
        }
        this.helpInstrBtnEl.parentNode.removeChild(this.helpInstrBtnEl);
        this.helpInstrBtnEl = null;
        if(!this.helpInstrContEl){
            return;
        }
        this.helpInstrContEl.parentNode.removeChild(this.helpInstrContEl);
        this.helpInstrContEl = null;
    },

    /*====================================================
        - Toggles help div
    =====================================================*/
    _ToggleHelp: function(){
        if(!this.helpInstrContEl){
            return;
        }
        var divDisplay = this.helpInstrContEl.style.display;
        if(divDisplay==='' || divDisplay==='none'){
            this.helpInstrContEl.style.display = 'block';
            var btnLeft = tf_ObjPosition(
                this.helpInstrBtnEl, [this.helpInstrBtnEl.nodeName])[0];
            if(!this.helpInstrContTgtId){
                this.helpInstrContEl.style.left =
                    (btnLeft - this.helpInstrContEl.clientWidth + 25) + 'px';
            }
        } else {
            this.helpInstrContEl.style.display = 'none';
        }
    },

    ChangePage: function(index){
        this.EvtManager(this.Evt.name.changepage,{ pgIndex:index });
    },
    /*====================================================
        - Changes page
        - Param:
            - index: option index of paging select
            (numeric value)
    =====================================================*/
    _ChangePage: function(index){
        if(!this.paging){
            return;
        }
        if(!index){
            index = this.pageSelectorType===this.fltTypeSlc ?
                this.pagingSlc.options.selectedIndex : (this.pagingSlc.value-1);
        }
        if( index>=0 && index<=(this.nbPages-1) ){
            if(this.onBeforeChangePage){
                this.onBeforeChangePage.call(null, this, index);
            }
            this.currentPageNb = parseInt(index)+1;
            if(this.pageSelectorType===this.fltTypeSlc){
                this.pagingSlc.options[index].selected = true;
            } else {
                this.pagingSlc.value = this.currentPageNb;
            }

            if(this.rememberPageNb){
                this.RememberPageNb(this.pgNbCookie);
            }
            this.startPagingRow = (this.pageSelectorType===this.fltTypeSlc) ?
                this.pagingSlc.value : (index*this.pagingLength);
            this.GroupByPage();
            if(this.onAfterChangePage){
                this.onAfterChangePage.call(null, this, index);
            }
        }
    },

    ChangeResultsPerPage: function(){
        this.EvtManager(this.Evt.name.changeresultsperpage);
    },
    /*====================================================
        - calculates rows to be displayed in a page
        - method called by nb results per page select
    =====================================================*/
    _ChangeResultsPerPage: function(){
        if(!this.paging){
            return;
        }
        var slcR = this.resultsPerPageSlc;
        var slcPagesSelIndex = (this.pageSelectorType==this.fltTypeSlc) ?
                this.pagingSlc.selectedIndex :
                parseInt(this.pagingSlc.value-1,10);
        this.pagingLength = parseInt(slcR.options[slcR.selectedIndex].value,10);
        this.startPagingRow = this.pagingLength*slcPagesSelIndex;

        if(!isNaN(this.pagingLength)){
            if(this.startPagingRow>=this.nbFilterableRows){
                this.startPagingRow = (this.nbFilterableRows-this.pagingLength);
            }
            this.SetPagingInfo();

            if(this.pageSelectorType===this.fltTypeSlc){
                var slcIndex =
                    (this.pagingSlc.options.length-1<=slcPagesSelIndex ) ?
                    (this.pagingSlc.options.length-1) : slcPagesSelIndex;
                this.pagingSlc.options[slcIndex].selected = true;
            }
            if(this.rememberPageLen){
                this.RememberPageLength( this.pgLenCookie );
            }
        }
    },

    ResetPage: function(name){
        this.EvtManager(this.Evt.name.resetpage);
    },
    /*==============================================
        - re-sets page nb at page re-load
        - Params:
            - name: cookie name (string)
    ===============================================*/
    _ResetPage: function(name){
        var pgnb = tf_ReadCookie(name);
        if(pgnb!==''){
            this.ChangePage((pgnb-1));
        }
    },

    ResetPageLength: function(name){
        this.EvtManager(this.Evt.name.resetpagelength);
    },
    /*==============================================
        - re-sets page length at page re-load
        - Params:
            - name: cookie name (string)
    ===============================================*/
    _ResetPageLength: function(name){
        if(!this.paging){
            return;
        }
        var pglenIndex = tf_ReadCookie(name);

        if(pglenIndex!==''){
            this.resultsPerPageSlc.options[pglenIndex].selected = true;
            this.ChangeResultsPerPage();
        }
    },

    /*====================================================
        - Adds paging feature if filter grid bar is
        already set
        - Param(s):
            - execFilter: if true table is filtered
            (boolean)
    =====================================================*/
    AddPaging: function(filterTable){
        if(!this.hasGrid || this.paging){
            return;
        }
        this.paging = true;
        this.isPagingRemoved = true;
        this.SetPaging();
        this.ResetValues();
        if(filterTable){
            this.Filter();
        }
    },

    PopulateSelect: function(colIndex,isExternal,extSlcId){
        this.EvtManager(
            this.Evt.name.populateselect,
            { slcIndex:colIndex, slcExternal:isExternal, slcId:extSlcId }
        );
    },

    /*====================================================
        - populates drop-down filters
    =====================================================*/
    _PopulateSelect: function(colIndex,isRefreshed,isExternal,extSlcId) {
        isExternal = isExternal===undefined ? false : isExternal;
        var slcId = this.fltIds[colIndex];
        if((!tf_Id(slcId) && !isExternal) ||
            (!tf_Id(extSlcId) && isExternal)){
            return;
        }
        var slc = !isExternal ? tf_Id(slcId) : tf_Id(extSlcId),
            o = this,
            row = this.tbl.rows,
            matchCase = this.matchCase,
            fillMethod = this.slcFillingMethod.tf_LCase(),
            optArray = [],
            slcInnerHtml = '',
            opt0,
            //custom select test
            isCustomSlc = (this.hasCustomSlcOptions &&
                this.customSlcOptions.cols.tf_Has(colIndex));
        //custom selects text
        var optTxt = [],
            activeFlt;
        if(isRefreshed && this.activeFilterId){
            activeFlt = this.activeFilterId.split('_')[0];
            activeFlt = activeFlt.split(this.prfxFlt)[1];
        }

        /*** remember grid values ***/
        var flts_values = [], fltArr = [];
        if(this.rememberGridValues){
            flts_values = tf_CookieValueArray(
                this.fltsValuesCookie, this.separator);
            if(flts_values && flts_values.toString().tf_Trim()!==''){
                if(isCustomSlc){
                    fltArr.push(flts_values[colIndex]);
                } else {
                    fltArr = flts_values[colIndex].split(' '+o.orOperator+' ');
                }
            }
        }

        var excludedOpts = null,
            filteredDataCol = null;
        if(isRefreshed && this.disableExcludedOptions){
            excludedOpts = [];
            filteredDataCol = [];
        }

        for(var k=this.refRow; k<this.nbRows; k++){
            // always visible rows don't need to appear on selects as always
            // valid
            if(this.hasVisibleRows && this.visibleRows.tf_Has(k) &&
                !this.paging){
                continue;
            }

            var cell = row[k].cells,
                nchilds = cell.length;

            // checks if row has exact cell #
            if(nchilds === this.nbCells && !isCustomSlc){
                // this loop retrieves cell data
                for(var j=0; j<nchilds; j++){
                    if((colIndex===j &&
                        (!isRefreshed ||
                            (isRefreshed && this.disableExcludedOptions))) ||
                        (colIndex==j && isRefreshed &&
                            ((row[k].style.display == '' && !this.paging) ||
                        (this.paging && (!this.validRowsIndex ||
                            (this.validRowsIndex &&
                                this.validRowsIndex.tf_Has(k))) &&
                            ((activeFlt==undefined || activeFlt==colIndex)  ||
                                (activeFlt!=colIndex &&
                                    this.validRowsIndex.tf_Has(k) ))) ))){
                        var cell_data = this.GetCellData(j, cell[j]),
                            //V�ry P�ter's patch
                            cell_string = cell_data.tf_MatchCase(matchCase);

                        // checks if celldata is already in array
                        if(!optArray.tf_Has(cell_string, matchCase)){
                            optArray.push(cell_data);
                        }

                        if(isRefreshed && this.disableExcludedOptions){
                            var filteredCol = filteredDataCol[j];
                            if(!filteredCol){
                                filteredCol = this.GetFilteredDataCol(j);
                            }
                            if(!filteredCol.tf_Has(cell_string, matchCase) &&
                                !excludedOpts.tf_Has(cell_string, matchCase) &&
                                !this.isFirstLoad){
                                excludedOpts.push(cell_data);
                            }
                        }
                    }//if colIndex==j
                }//for j
            }//if
        }//for k

        //Retrieves custom values
        if(isCustomSlc){
            var customValues = this.__getCustomValues(colIndex);
            optArray = customValues[0];
            optTxt = customValues[1];
        }

        if(this.sortSlc && !isCustomSlc){
            if (!matchCase){
                optArray.sort(tf_IgnoreCaseSort);
                if(excludedOpts) excludedOpts.sort(tf_IgnoreCaseSort);
            } else {
                optArray.sort();
                if(excludedOpts){ excludedOpts.sort(); }
            }
        }

        //asc sort
        if(this.sortNumAsc && this.sortNumAsc.tf_Has(colIndex)){
            try{
                optArray.sort( tf_NumSortAsc );
                if(excludedOpts){
                    excludedOpts.sort( tf_NumSortAsc );
                }
                if(isCustomSlc){
                    optTxt.sort( tf_NumSortAsc );
                }
            } catch(e) {
                optArray.sort();
                if(excludedOpts){
                    excludedOpts.sort();
                }
                if(isCustomSlc){
                    optTxt.sort();
                }
            }//in case there are alphanumeric values
        }
        //desc sort
        if(this.sortNumDesc && this.sortNumDesc.tf_Has(colIndex)){
            try{
                optArray.sort( tf_NumSortDesc );
                if(excludedOpts){
                    excludedOpts.sort( tf_NumSortDesc );
                }
                if(isCustomSlc){
                    optTxt.sort( tf_NumSortDesc );
                }
            } catch(e) {
                optArray.sort();
                if(excludedOpts){ excludedOpts.sort(); }
                if(isCustomSlc){
                    optTxt.sort();
                }
            }//in case there are alphanumeric values
        }

        AddOpts();//populates drop-down

        // adds 1st option
        function AddOpt0(){
            if(fillMethod === 'innerhtml'){
                slcInnerHtml +='<option value="">'+o.displayAllText+'</option>';
            }
            else {
                var opt0 = tf_CreateOpt(
                    (!o.enableSlcResetFilter ? '' : o.displayAllText),'');
                if(!o.enableSlcResetFilter){
                    opt0.style.display = 'none';
                }
                slc.appendChild(opt0);
                if(o.enableEmptyOption){
                    var opt1 = tf_CreateOpt(o.emptyText,o.emOperator);
                    slc.appendChild(opt1);
                }
                if(o.enableNonEmptyOption){
                    var opt2 = tf_CreateOpt(o.nonEmptyText,o.nmOperator);
                    slc.appendChild(opt2);
                }
            }
        }

        // populates select
        function AddOpts(){
            var slcValue = slc.value;
            slc.innerHTML = '';
            AddOpt0();

            for(var y=0; y<optArray.length; y++){
                if(optArray[y]===''){
                    continue;
                }
                var val = optArray[y]; //option value
                var lbl = isCustomSlc ? optTxt[y] : val; //option text
                var isDisabled = false;
                if(isRefreshed && o.disableExcludedOptions &&
                    excludedOpts.tf_Has(
                        val.tf_MatchCase(o.matchCase), o.matchCase)){
                    isDisabled = true;
                }

                if(fillMethod === 'innerhtml'){
                    var slcAttr = '';
                    if(o.fillSlcOnDemand && slcValue==optArray[y]){
                        slcAttr = 'selected="selected"';
                    }
                    slcInnerHtml += '<option value="'+val+'" ' + slcAttr +
                        (isDisabled ? 'disabled="disabled"' : '')+ '>' +
                        lbl+'</option>';
                } else {
                    var opt;
                    //fill select on demand
                    if(o.fillSlcOnDemand && slcValue==optArray[y] &&
                        o['col'+colIndex]===o.fltTypeSlc){
                        opt = tf_CreateOpt(lbl, val, true);
                    } else {
                        if(o['col'+colIndex]!=o.fltTypeMulti){
                            opt = tf_CreateOpt(
                                lbl,
                                val,
                                (flts_values[colIndex]!==' ' &&
                                    val==flts_values[colIndex]) ? true : false
                            );
                        } else {
                            opt = tf_CreateOpt(
                                lbl,
                                val,
                                (fltArr.tf_Has(
                                    optArray[y].tf_MatchCase(
                                        o.matchCase),o.matchCase) ||
                                  fltArr.toString().indexOf(val)!== -1) ?
                                    true : false
                            );
                        }
                    }
                    if(isDisabled){
                        opt.disabled = true;
                    }
                    slc.appendChild(opt);
                }
            }// for y

            if(fillMethod === 'innerhtml'){
                slc.innerHTML += slcInnerHtml;
            }
            slc.setAttribute('filled','1');
        }// fn AddOpt
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
        if(slc.nodeName.tf_LCase() !== 'select'){
            return;
        }
        var doFilter = filter===undefined ? false : filter;
        var o = this;
        window.setTimeout(function(){
            slc.options[0].selected = false;

            if(slc.options[index].value=='')
                slc.options[index].selected = false;
            else
            slc.options[index].selected = true;
            if(doFilter) o.Filter();
        }, 0.1);
    },

    __getCustomValues: function(colIndex)
    /*====================================================
        - Returns an array [[values],[texts]] with
        custom values for a given filter
        - Param: column index (integer)
    =====================================================*/
    {
        if(colIndex==undefined) return;
        var isCustomSlc = (this.hasCustomSlcOptions  //custom select test
                            && this.customSlcOptions.cols.tf_Has(colIndex));
        if(!isCustomSlc) return;
        var optTxt = [], optArray = [];
        var index = this.customSlcOptions.cols.tf_IndexByValue(colIndex);
        var slcValues = this.customSlcOptions.values[index];
        var slcTexts = this.customSlcOptions.texts[index];
        var slcSort = this.customSlcOptions.sorts[index];
        for(var r=0; r<slcValues.length; r++)
        {
            optArray.push(slcValues[r]);
            if(slcTexts[r]!=undefined)
                optTxt.push(slcTexts[r]);
            else
                optTxt.push(slcValues[r]);
        }
        if(slcSort)
        {
            optArray.sort();
            optTxt.sort();
        }
        return [optArray,optTxt];
    },

    PopulateCheckList: function(colIndex, isExternal, extFltId)
    {
        this.EvtManager(
            this.Evt.name.populatechecklist,
            { slcIndex:colIndex, slcExternal:isExternal, slcId:extFltId }
        );
    },

    _PopulateCheckList: function(colIndex, isExternal, extFltId)
    /*====================================================
        - populates checklist filters
    =====================================================*/
    {
        isExternal = (isExternal==undefined) ? false : isExternal;
        var divFltId = this.prfxCheckListDiv+colIndex+'_'+this.id;
        if( tf_Id(divFltId)==null && !isExternal ) return;
        if( tf_Id(extFltId)==null && isExternal ) return;
        var flt = (!isExternal) ? this.checkListDiv[colIndex] : tf_Id(extFltId);
        var ul = tf_CreateElm('ul',['id',this.fltIds[colIndex]],['colIndex',colIndex]);
        ul.className = this.checkListCssClass;
        ul.onchange = this.Evt._OnCheckListChange;
        var o = this, row = this.tbl.rows;
        var optArray = [];
        var isCustomSlc = (this.hasCustomSlcOptions  //custom select test
                            && this.customSlcOptions.cols.tf_Has(colIndex));
        var optTxt = []; //custom selects text
        var activeFlt;
        if(this.refreshFilters && this.activeFilterId){
            activeFlt = this.activeFilterId.split('_')[0];
            activeFlt = activeFlt.split(this.prfxFlt)[1];
        }

        var excludedOpts = null, filteredDataCol = null;
        if(this.refreshFilters && this.disableExcludedOptions){ excludedOpts = []; filteredDataCol = []; }

        for(var k=this.refRow; k<this.nbRows; k++)
        {
            // always visible rows don't need to appear on selects as always valid
            if( this.hasVisibleRows && this.visibleRows.tf_Has(k) && !this.paging )
                continue;

            var cells = row[k].cells;
            var ncells = cells.length;

            if(ncells == this.nbCells && !isCustomSlc)
            {// checks if row has exact cell #
                for(var j=0; j<ncells; j++)
                {// this loop retrieves cell data
                    if((colIndex==j && (!this.refreshFilters || (this.refreshFilters && this.disableExcludedOptions))) ||
                        (colIndex==j && this.refreshFilters && ((row[k].style.display == '' && !this.paging) ||
                        (this.paging && ((activeFlt==undefined || activeFlt==colIndex ) ||(activeFlt!=colIndex && this.validRowsIndex.tf_Has(k))) ))))
                    {
                        var cell_data = this.GetCellData(j, cells[j]);
                        var cell_string = cell_data.tf_MatchCase(this.matchCase);//V�ry P�ter's patch
                        // checks if celldata is already in array
                        if(!optArray.tf_Has(cell_string,this.matchCase)) optArray.push(cell_data);

                        if(this.refreshFilters && this.disableExcludedOptions){
                            if(!filteredDataCol[j]) filteredDataCol[j] = this.GetFilteredDataCol(j);
                            if(!filteredDataCol[j].tf_Has(cell_string,this.matchCase)
                                && !excludedOpts.tf_Has(cell_string,this.matchCase) && !this.isFirstLoad) excludedOpts.push(cell_data);
                        }
                    }
                }
            }
        }

        //Retrieves custom values
        if(isCustomSlc)
        {
            var customValues = this.__getCustomValues(colIndex);
            optArray = customValues[0];
            optTxt = customValues[1];
        }

        if(this.sortSlc && !isCustomSlc){
            if (!this.matchCase){
                optArray.sort(tf_IgnoreCaseSort);
                if(excludedOpts) excludedOpts.sort(tf_IgnoreCaseSort);
            } else { optArray.sort(); if(excludedOpts){ excludedOpts.sort(); }  }
        }

        if(this.sortNumAsc && this.sortNumAsc.tf_Has(colIndex))
        {//asc sort
            try{
                optArray.sort( tf_NumSortAsc );
                if(excludedOpts) excludedOpts.sort( tf_NumSortAsc );
                if(isCustomSlc) optTxt.sort( tf_NumSortAsc );
            } catch(e) {
                optArray.sort(); if(excludedOpts){ excludedOpts.sort(); }
                if(isCustomSlc) optTxt.sort();
            }//in case there are alphanumeric values
        }
        if(this.sortNumDesc && this.sortNumDesc.tf_Has(colIndex))
        {//desc sort
            try{
                optArray.sort( tf_NumSortDesc );
                if(excludedOpts) excludedOpts.sort( tf_NumSortDesc );
                if(isCustomSlc) optTxt.sort( tf_NumSortDesc );
            } catch(e) {
                optArray.sort(); if(excludedOpts){ excludedOpts.sort(); }
                if(isCustomSlc) optTxt.sort();
            }//in case there are alphanumeric values
        }

        AddChecks(this.separator);

        function AddTChecks()
        {// adds 1st option
            var chkCt = 1;
            var li0 = tf_CreateCheckItem(o.fltIds[colIndex]+'_0', '', o.displayAllText);
            li0.className = o.checkListItemCssClass;
            ul.appendChild(li0);
            li0.check.onclick = function(e){ o.__setCheckListValues(this); ul.onchange.call(null, e); };
            if(!o.enableCheckListResetFilter) li0.style.display = 'none';

            if(tf_isIE)
            {//IE: label looses check capability
                li0.label.onclick = function(){ li0.check.click(); };
            }

            if(o.enableEmptyOption){
                var li1 = tf_CreateCheckItem(o.fltIds[colIndex]+'_1', o.emOperator, o.emptyText);
                li1.className = o.checkListItemCssClass;
                ul.appendChild(li1);
                li1.check.onclick = function(e){ o.__setCheckListValues(this); ul.onchange.call(null, e); };
                if(tf_isIE)
                {//IE: label looses check capability
                    li1.label.onclick = function(){ li1.check.click(); };
                }
                chkCt++;
            }

            if(o.enableNonEmptyOption){
                var li2 = tf_CreateCheckItem(o.fltIds[colIndex]+'_2', o.nmOperator, o.nonEmptyText);
                li2.className = o.checkListItemCssClass;
                ul.appendChild(li2);
                li2.check.onclick = function(e){ o.__setCheckListValues(this); ul.onchange.call(null, e); };
                if(tf_isIE)
                {//IE: label looses check capability
                    li2.label.onclick = function(){ li2.check.click(); };
                }
                chkCt++;
            }
            return chkCt;
        }

        function AddChecks(separator)
        {
            var chkCt = AddTChecks();

            var flts_values = [], fltArr = []; //remember grid values
            var tmpVal = tf_CookieValueByIndex(o.fltsValuesCookie, colIndex, separator);
            if(tmpVal != undefined && tmpVal.tf_Trim().length > 0){
                if(o.hasCustomSlcOptions && o.customSlcOptions.cols.tf_Has(colIndex)){
                    fltArr.push(tmpVal);
                } else { fltArr = tmpVal.split(' '+o.orOperator+' '); }
            }

            for(var y=0; y<optArray.length; y++)
            {
                var val = optArray[y]; //item value
                var lbl = (isCustomSlc) ? optTxt[y] : val; //item text
                var li = tf_CreateCheckItem(o.fltIds[colIndex]+'_'+(y+chkCt), val, lbl);
                li.className = o.checkListItemCssClass;
                if(o.refreshFilters && o.disableExcludedOptions &&
                    excludedOpts.tf_Has(val.tf_MatchCase(o.matchCase), o.matchCase)){
                        tf_AddClass(li, o.checkListItemDisabledCssClass);
                        li.check.disabled = true;
                        li.disabled = true;
                } else
                    li.check.onclick = function(e){ o.__setCheckListValues(this); ul.onchange.call(null, e); };
                ul.appendChild(li);

                if(val=='') li.style.display = 'none'; //item is hidden

                /*** remember grid values ***/
                if(o.rememberGridValues)
                {
                    if((o.hasCustomSlcOptions && o.customSlcOptions.cols.tf_Has(colIndex)
                        && fltArr.toString().indexOf(val)!= -1)
                        || fltArr.tf_Has(val.tf_MatchCase(o.matchCase),o.matchCase))
                    {
                        li.check.checked = true;
                        o.__setCheckListValues(li.check);
                    }
                }

                if(tf_isIE)
                {//IE: label looses check capability
                    li.label.onclick = function(){ this.firstChild.click(); };
                }
            }
        }

        if(this.fillSlcOnDemand) flt.innerHTML = '';
        flt.appendChild(ul);
        flt.setAttribute('filled','1');

        /*** remember grid values IE only, items remain un-checked ***/
        if(o.rememberGridValues && tf_isIE)
        {
            var slcIndexes = ul.getAttribute('indexes');
            if(slcIndexes != null)
            {
                var indSplit = slcIndexes.split(',');//items indexes
                for(var n=0; n<indSplit.length; n++)
                {
                    var cChk = tf_Id(this.fltIds[colIndex]+'_'+indSplit[n]); //checked item
                    if(cChk) cChk.checked = true;
                }
            }
        }
    },

    __setCheckListValues: function(o)
    /*====================================================
        - Sets checked items information of a checklist
    =====================================================*/
    {
        if(o==null) return;
        var chkValue = o.value; //checked item value
        var chkIndex = parseInt(o.id.split('_')[2]);
        var filterTag = 'ul', itemTag = 'li';
        var n = o;

        //ul tag search
        while(n.nodeName.tf_LCase() != filterTag)
            n = n.parentNode;

        if(n.nodeName.tf_LCase() != filterTag) return;

        var li = n.childNodes[chkIndex];
        var colIndex = n.getAttribute('colIndex');
        var fltValue = n.getAttribute('value'); //filter value (ul tag)
        var fltIndexes = n.getAttribute('indexes'); //selected items (ul tag)

        if(o.checked)
        {
            if(chkValue=='')
            {//show all item
                if((fltIndexes!=null && fltIndexes!=''))
                {
                    var indSplit = fltIndexes.split(this.separator);//items indexes
                    for(var u=0; u<indSplit.length; u++)
                    {//checked items loop
                        var cChk = tf_Id(this.fltIds[colIndex]+'_'+indSplit[u]); //checked item
                        if(cChk)
                        {
                            cChk.checked = false;
                            tf_RemoveClass(
                                n.childNodes[indSplit[u]],
                                this.checkListSlcItemCssClass
                            );
                        }
                    }
                }
                n.setAttribute('value', '');
                n.setAttribute('indexes', '');

            } else {
                fltValue = (fltValue) ? fltValue : '';
                chkValue = (fltValue+' '+chkValue +' '+this.orOperator).tf_Trim();
                chkIndex = fltIndexes + chkIndex + this.separator;
                n.setAttribute('value', chkValue );
                n.setAttribute('indexes', chkIndex);
                //1st option unchecked
                if(tf_Id(this.fltIds[colIndex]+'_0'))
                    tf_Id(this.fltIds[colIndex]+'_0').checked = false;
            }

            if(li.nodeName.tf_LCase() == itemTag)
            {
                tf_RemoveClass(n.childNodes[0],this.checkListSlcItemCssClass);
                tf_AddClass(li,this.checkListSlcItemCssClass);
            }
        } else { //removes values and indexes
            if(chkValue!='')
            {
                var replaceValue = new RegExp(tf_RegexpEscape(chkValue+' '+this.orOperator));
                fltValue = fltValue.replace(replaceValue,'');
                n.setAttribute('value', fltValue.tf_Trim());

                var replaceIndex = new RegExp(tf_RegexpEscape(chkIndex + this.separator));
                fltIndexes = fltIndexes.replace(replaceIndex,'');
                n.setAttribute('indexes', fltIndexes);
            }
            if(li.nodeName.tf_LCase() == itemTag)
                tf_RemoveClass(li,this.checkListSlcItemCssClass);
        }
    },

    SetResetBtn: function()
    /*====================================================
        - Generates reset button
    =====================================================*/
    {
        if(!this.hasGrid && !this.isFirstLoad) return;
        if( this.btnResetEl!=null ) return;
        var f = this.fObj;
        this.btnResetTgtId =        f.btn_reset_target_id!=undefined //id of container element
                                        ? f.btn_reset_target_id : null;
        this.btnResetEl =           null; //reset button element
        this.btnResetText =         f.btn_reset_text!=undefined ? f.btn_reset_text : 'Reset'; //defines reset text
        this.btnResetTooltip =      f.btn_reset_tooltip!=undefined ? f.btn_reset_tooltip : 'Clear filters'; //defines reset button tooltip
        this.btnResetHtml =         f.btn_reset_html!=undefined ? f.btn_reset_html : (!this.enableIcons ? null : //defines reset button innerHtml
                                    '<input type="button" value="" class="'+this.btnResetCssClass+'" title="'+this.btnResetTooltip+'" />');

        var resetspan = tf_CreateElm('span',['id',this.prfxResetSpan+this.id]);

        // reset button is added to defined element
        if(this.btnResetTgtId==null) this.SetTopDiv();
        var targetEl = ( this.btnResetTgtId==null ) ? this.rDiv : tf_Id( this.btnResetTgtId );
        targetEl.appendChild(resetspan);

        if(this.btnResetHtml==null)
        {
            var fltreset = tf_CreateElm( 'a', ['href','javascript:void(0);'] );
            fltreset.className = this.btnResetCssClass;
            fltreset.appendChild(tf_CreateText(this.btnResetText));
            resetspan.appendChild(fltreset);
            fltreset.onclick = this.Evt._Clear;
        } else {
            resetspan.innerHTML = this.btnResetHtml;
            var resetEl = resetspan.firstChild;
            resetEl.onclick = this.Evt._Clear;
        }
        this.btnResetEl = tf_Id(this.prfxResetSpan+this.id).firstChild;
    },

    RemoveResetBtn: function()
    /*====================================================
        - Removes reset button
    =====================================================*/
    {
        if(!this.hasGrid) return;
        if( this.btnResetEl==null ) return;
        var resetspan = tf_Id(this.prfxResetSpan+this.id);
        if( resetspan!=null )
            resetspan.parentNode.removeChild( resetspan );
        this.btnResetEl = null;
    },

    SetStatusBar: function()
    /*====================================================
        - Generates status bar label
    =====================================================*/
    {
        if(!this.hasGrid && !this.isFirstLoad) return;
        var f = this.fObj;
        this.statusBarTgtId =       f.status_bar_target_id!=undefined //id of custom container element
                                        ? f.status_bar_target_id : null;
        this.statusBarDiv =         null; //element containing status bar label
        this.statusBarSpan =        null; //status bar
        this.statusBarSpanText =    null; //status bar label
        this.statusBarText =        f.status_bar_text!=undefined
                                        ? f.status_bar_text : ''; //defines status bar text
        this.statusBarCssClass =    f.status_bar_css_class!=undefined //defines css class status bar
                                        ? f.status_bar_css_class : 'status';
        this.statusBarCloseDelay =  250; //delay for status bar clearing
        var statusDiv = tf_CreateElm( 'div',['id',this.prfxStatus+this.id] ); //status bar container
        statusDiv.className = this.statusBarCssClass;
        var statusSpan = tf_CreateElm( 'span',['id',this.prfxStatusSpan+this.id] ); //status bar label
        var statusSpanText = tf_CreateElm( 'span',['id',this.prfxStatusTxt+this.id] );//preceding text
        statusSpanText.appendChild( tf_CreateText(this.statusBarText) );
        this.onBeforeShowMsg = tf_IsFn(f.on_before_show_msg) ? f.on_before_show_msg : null; //calls function before message is displayed
        this.onAfterShowMsg = tf_IsFn(f.on_after_show_msg) ? f.on_after_show_msg : null; //calls function after message is displayed


        // target element container
        if(this.statusBarTgtId==null) this.SetTopDiv();
        var targetEl = ( this.statusBarTgtId==null ) ? this.lDiv : tf_Id( this.statusBarTgtId );

        if(this.statusBarDiv && tf_isIE)
            this.statusBarDiv.outerHTML = '';

        if( this.statusBarTgtId==null )
        {//default container: 'lDiv'
            statusDiv.appendChild(statusSpanText);
            statusDiv.appendChild(statusSpan);
            targetEl.appendChild(statusDiv);
        }
        else
        {// custom container, no need to append statusDiv
            targetEl.appendChild(statusSpanText);
            targetEl.appendChild(statusSpan);
        }

        this.statusBarDiv = tf_Id( this.prfxStatus+this.id );
        this.statusBarSpan = tf_Id( this.prfxStatusSpan+this.id );
        this.statusBarSpanText = tf_Id( this.prfxStatusTxt+this.id );
    },

    RemoveStatusBar: function()
    /*====================================================
        - Removes status bar div
    =====================================================*/
    {
        if(!this.hasGrid) return;
        if(this.statusBarDiv)
        {
            this.statusBarDiv.innerHTML = '';
            this.statusBarDiv.parentNode.removeChild(
                this.statusBarDiv
            );
            this.statusBarSpan = null;
            this.statusBarSpanText = null;
            this.statusBarDiv = null;
        }
    },

    StatusMsg: function(t)
    /*====================================================
        - sets status messages
    =====================================================*/
    {
        if(t==undefined) this.StatusMsg('');
        if(this.status) this.WinStatusMsg(t);
        if(this.statusBar) this.StatusBarMsg(t);
    },

    WinStatusMsg: function(t)
    /*====================================================
        - sets window status messages
    =====================================================*/
    {
        if(!this.status) return;
        if(this.onBeforeShowMsg){ this.onBeforeShowMsg.call(null, this, t); }
        window.status = t;
        if(this.onAfterShowMsg){ this.onAfterShowMsg.call(null, this, t); }
    },

    StatusBarMsg: function(t)
    /*====================================================
        - sets status bar messages
    =====================================================*/
    {
        if(!this.statusBar || !this.statusBarSpan) return;
        if(this.onBeforeShowMsg){ this.onBeforeShowMsg.call(null, this, t); }
        var o = this;
        function setMsg(){
            o.statusBarSpan.innerHTML = t;
            if(o.onAfterShowMsg){ o.onAfterShowMsg.call(null, o, t); }
        }
        var d = (t=='') ? (this.statusBarCloseDelay) : 1;
        window.setTimeout(setMsg,d);
    },

    SetRowsCounter: function()
    /*====================================================
        - Generates rows counter label
    =====================================================*/
    {
        if(!this.hasGrid && !this.isFirstLoad) return;
        if( this.rowsCounterSpan!=null ) return;
        var f = this.fObj;
        this.rowsCounterTgtId =     f.rows_counter_target_id!=undefined //id of custom container element
                                    ? f.rows_counter_target_id : null;
        this.rowsCounterDiv =       null; //element containing tot nb rows
        this.rowsCounterSpan =      null; //element containing tot nb rows label
        this.rowsCounterText =      f.rows_counter_text!=undefined ? f.rows_counter_text : 'Rows: '; //defines rows counter text
        this.fromToTextSeparator =  f.from_to_text_separator!=undefined ? f.from_to_text_separator : '-';
        this.overText =             f.over_text!=undefined ? f.over_text : ' / ';
        this.totRowsCssClass =      f.tot_rows_css_class!=undefined ? f.tot_rows_css_class : 'tot'; //defines css class rows counter
        this.onBeforeRefreshCounter = tf_IsFn(f.on_before_refresh_counter) ? f.on_before_refresh_counter : null; //callback raised before counter is refreshed
        this.onAfterRefreshCounter = tf_IsFn(f.on_after_refresh_counter) ? f.on_after_refresh_counter : null; //callback raised after counter is refreshed
        var countDiv = tf_CreateElm( 'div',['id',this.prfxCounter+this.id] ); //rows counter container
        countDiv.className = this.totRowsCssClass;
        var countSpan = tf_CreateElm( 'span',['id',this.prfxTotRows+this.id] ); //rows counter label
        var countText = tf_CreateElm( 'span',['id',this.prfxTotRowsTxt+this.id] );
        countText.appendChild( tf_CreateText(this.rowsCounterText) );

        // counter is added to defined element
        if(this.rowsCounterTgtId==null) this.SetTopDiv();
        var targetEl = ( this.rowsCounterTgtId==null ) ? this.lDiv : tf_Id( this.rowsCounterTgtId );

        //IE only: clears all for sure
        if(this.rowsCounterDiv && tf_isIE)
            this.rowsCounterDiv.outerHTML = '';

        if( this.rowsCounterTgtId==null )
        {//default container: 'lDiv'
            countDiv.appendChild(countText);
            countDiv.appendChild(countSpan);
            targetEl.appendChild(countDiv);
        }
        else
        {// custom container, no need to append statusDiv
            targetEl.appendChild(countText);
            targetEl.appendChild(countSpan);
        }
        this.rowsCounterDiv = tf_Id( this.prfxCounter+this.id );
        this.rowsCounterSpan = tf_Id( this.prfxTotRows+this.id );

        this.RefreshNbRows();
    },

    RemoveRowsCounter: function()
    /*====================================================
        - Removes rows counter label
    =====================================================*/
    {
        if(!this.hasGrid) return;
        if( this.rowsCounterSpan==null ) return;

        if(this.rowsCounterTgtId==null && this.rowsCounterDiv)
        {
            //IE only: clears all for sure
            if(tf_isIE) this.rowsCounterDiv.outerHTML = '';
            else
                this.rowsCounterDiv.parentNode.removeChild(
                    this.rowsCounterDiv
                );
        } else {
            tf_Id( this.rowsCounterTgtId ).innerHTML = '';
        }
        this.rowsCounterSpan = null;
        this.rowsCounterDiv = null;
    },

    RefreshNbRows: function(p)
    /*====================================================
        - Shows total number of filtered rows
    =====================================================*/
    {
        if(this.rowsCounterSpan == null) return;
        if(this.onBeforeRefreshCounter) this.onBeforeRefreshCounter.call(null, this, this.rowsCounterSpan);
        var totTxt;
        if(!this.paging)
        {
            if(p!=undefined && p!='') totTxt=p;
            else totTxt = (this.nbFilterableRows - this.nbHiddenRows - (this.hasVisibleRows ? this.visibleRows.length : 0) );
        } else {
            var paging_start_row = parseInt(this.startPagingRow)+((this.nbVisibleRows>0) ? 1 : 0);//paging start row
            var paging_end_row = (paging_start_row+this.pagingLength)-1 <= this.nbVisibleRows
                ? (paging_start_row+this.pagingLength)-1 : this.nbVisibleRows;
            totTxt = paging_start_row+ this.fromToTextSeparator +paging_end_row+ this.overText +this.nbVisibleRows;
        }
        this.rowsCounterSpan.innerHTML = totTxt;
        if(this.onAfterRefreshCounter) this.onAfterRefreshCounter.call(null, this, this.rowsCounterSpan, totTxt);
    },

    SetWatermark: function(set)
    /*====================================================
        - inserts or removes input watermark
        - Params:
            - set: if true inserts watermark (boolean)
    =====================================================*/
    {
        if( !this.fltGrid ) return;
        if(this.inpWatermark!=''){ //Not necessary if empty
            var set = (set || set==undefined) ? true : false;
            for(var i=0; i<this.fltIds.length; i++){
                if(this['col'+i]!=this.fltTypeInp) continue; //only input type filters
                var inpWatermark = (!this.isInpWatermarkArray ? this.inpWatermark : this.inpWatermark[i]);
                if(this.GetFilterValue(i) == (set ? '' : inpWatermark)){
                    this.SetFilterValue(i,(!set ? '' : inpWatermark));
                    tf_AddClass(this.GetFilterElement(i), this.inpWatermarkCssClass);
                }
            }
        }
    },

    SetGridLayout: function()
    /*====================================================
        - generates a grid with fixed headers
    =====================================================*/
    {
        if(!this.gridLayout) return;
        var f = this.fObj;
        this.gridWidth =            f.grid_width!=undefined ? f.grid_width : null; //defines grid width
        this.gridHeight =           f.grid_height!=undefined ? f.grid_height : null; //defines grid height
        this.gridMainContCssClass = f.grid_cont_css_class!=undefined //defines css class for main container
                                        ? f.grid_cont_css_class : 'grd_Cont';
        this.gridContCssClass =     f.grid_tbl_cont_css_class!=undefined //defines css class for div containing table
                                        ? f.grid_tbl_cont_css_class : 'grd_tblCont';
        this.gridHeadContCssClass = f.grid_tblHead_cont_css_class!=undefined //defines css class for div containing headers' table
                                        ? f.grid_tblHead_cont_css_class : 'grd_headTblCont';
        this.gridInfDivCssClass =   f.grid_inf_grid_css_class!=undefined //defines css class for div containing rows counter, paging etc.
                                        ? f.grid_inf_grid_css_class : 'grd_inf';
        this.gridHeadRowIndex =     f.grid_headers_row_index!=undefined //defines which row contains column headers
                                        ? f.grid_headers_row_index : 0;
        this.gridHeadRows =         f.grid_headers_rows!=undefined //array of headers row indexes to be placed in header table
                                        ? f.grid_headers_rows : [0];
        this.gridEnableFilters =    f.grid_enable_default_filters!=undefined
                                        ? f.grid_enable_default_filters : true; //generate filters in table headers
        this.gridDefaultColWidth =  f.grid_default_col_width!=undefined
                                        ? f.grid_default_col_width : '100px'; //default col width
        this.gridEnableColResizer = f.grid_enable_cols_resizer!=undefined
                                        ? f.grid_enable_cols_resizer : true; //enables/disables columns resizer
        this.gridColResizerPath =   f.grid_cont_col_resizer_path!=undefined //defines col resizer script path
                                        ? f.grid_cont_col_resizer_path : this.basePath+'TFExt_ColsResizer/TFExt_ColsResizer.js';
        if(!this.hasColWidth){// in case column widths are not set default width 100px
            this.colWidth = [];
            for(var k=0; k<this.nbCells; k++){
                var colW, cell = this.tbl.rows[this.gridHeadRowIndex].cells[k];
                if(cell.width!='') colW = cell.width;
                else if(cell.style.width!='') colW = parseInt(cell.style.width);
                else colW = this.gridDefaultColWidth;
                this.colWidth[k] = colW;
            }
            this.hasColWidth = true;
        }
        this.SetColWidths(this.gridHeadRowIndex);

        var tblW;//initial table width
        if(this.tbl.width!='') tblW = this.tbl.width;
        else if(this.tbl.style.width!='') tblW = parseInt(this.tbl.style.width);
        else tblW = this.tbl.clientWidth;

        //Main container: it will contain all the elements
        this.tblMainCont = tf_CreateElm('div',['id', this.prfxMainTblCont + this.id]);
        this.tblMainCont.className = this.gridMainContCssClass;
        if(this.gridWidth) this.tblMainCont.style.width = this.gridWidth;
        this.tbl.parentNode.insertBefore(this.tblMainCont, this.tbl);

        //Table container: div wrapping content table
        this.tblCont = tf_CreateElm('div',['id', this.prfxTblCont + this.id]);
        this.tblCont.className = this.gridContCssClass;
        if(this.gridWidth) this.tblCont.style.width = this.gridWidth;
        if(this.gridHeight) this.tblCont.style.height = this.gridHeight;
        this.tbl.parentNode.insertBefore(this.tblCont, this.tbl);
        var t = this.tbl.parentNode.removeChild(this.tbl);
        this.tblCont.appendChild(t);

        //In case table width is expressed in %
        if(this.tbl.style.width == '')
            this.tbl.style.width = (this.__containsStr('%',tblW)
                                    ? this.tbl.clientWidth : tblW) + 'px';

        var d = this.tblCont.parentNode.removeChild(this.tblCont);
        this.tblMainCont.appendChild(d);

        //Headers table container: div wrapping headers table
        this.headTblCont = tf_CreateElm('div',['id', this.prfxHeadTblCont + this.id]);
        this.headTblCont.className = this.gridHeadContCssClass;
        if(this.gridWidth) this.headTblCont.style.width = this.gridWidth;

        //Headers table
        this.headTbl = tf_CreateElm('table',['id', this.prfxHeadTbl + this.id]);
        var tH = tf_CreateElm('tHead'); //IE<7 needs it

        //1st row should be headers row, ids are added if not set
        //Those ids are used by the sort feature
        var hRow = this.tbl.rows[this.gridHeadRowIndex];
        var sortTriggers = [];
        for(var n=0; n<this.nbCells; n++){
            var cell = hRow.cells[n];
            var thId = cell.getAttribute('id');
            if(!thId || thId==''){
                thId = this.prfxGridTh+n+'_'+this.id
                cell.setAttribute('id', thId);
            }
            sortTriggers.push(thId);
        }

        //Filters row is created
        var filtersRow = tf_CreateElm('tr');
        if(this.gridEnableFilters && this.fltGrid){
            this.externalFltTgtIds = [];
            for(var j=0; j<this.nbCells; j++)
            {
                var fltTdId = this.prfxFlt+j+ this.prfxGridFltTd +this.id;
                var c = tf_CreateElm(this.fltCellTag, ['id', fltTdId]);
                filtersRow.appendChild(c);
                this.externalFltTgtIds[j] = fltTdId;
            }
        }
        //Headers row are moved from content table to headers table
        for(var i=0; i<this.gridHeadRows.length; i++)
        {
            var headRow = this.tbl.rows[this.gridHeadRows[0]];
            tH.appendChild(headRow);
        }
        this.headTbl.appendChild(tH);
        if(this.filtersRowIndex == 0) tH.insertBefore(filtersRow,hRow);
        else tH.appendChild(filtersRow);

        this.headTblCont.appendChild(this.headTbl);
        this.tblCont.parentNode.insertBefore(this.headTblCont, this.tblCont);

        //THead needs to be removed in content table for sort feature
        var thead = tf_Tag(this.tbl,'thead');
        if( thead.length>0 ) this.tbl.removeChild(thead[0]);

        //Headers table style
        this.headTbl.style.width = this.tbl.style.width;
        this.headTbl.style.tableLayout = 'fixed';
        this.tbl.style.tableLayout = 'fixed';
        this.headTbl.cellPadding = this.tbl.cellPadding;
        this.headTbl.cellSpacing = this.tbl.cellSpacing;

        //Headers container width
        this.headTblCont.style.width = this.tblCont.clientWidth+'px';

        //content table without headers needs col widths to be reset
        this.SetColWidths();

        this.tbl.style.width = '';
        if(tf_isIE || tf_isIE7) this.headTbl.style.width = '';

        //scroll synchronisation
        var o = this; //TF object
        this.tblCont.onscroll = function(){
            o.headTblCont.scrollLeft = this.scrollLeft;
            var _o = this; //this = scroll element
            //New pointerX calc taking into account scrollLeft
            if(!o.isPointerXOverwritten){
                try{
                    TF.Evt.pointerX = function(e)
                    {
                        e = e || window.event;
                        var scrollLeft = tf_StandardBody().scrollLeft + _o.scrollLeft;
                        return (e.pageX + _o.scrollLeft) || (e.clientX + scrollLeft);
                    }
                    o.isPointerXOverwritten = true;
                } catch(ee) {
                    o.isPointerXOverwritten = false;
                }
            }
        }

        /*** Default behaviours activation ***/
        var f = this.fObj==undefined ? {} : this.fObj;

        //Sort is enabled if not specified in config object
        if(f.sort != false){
            this.sort = true;
            this.sortConfig.asyncSort = true;
            this.sortConfig.triggerIds = sortTriggers;
        }

        if(this.gridEnableColResizer){
            if(!this.hasExtensions){
                this.extensions = {
                    name:['ColumnsResizer_'+this.id],
                    src:[this.gridColResizerPath],
                    description:['Columns Resizing'],
                    initialize:[function(o){o.SetColsResizer('ColumnsResizer_'+o.id);}]
                }
                this.hasExtensions = true;
            } else {
                if(!this.__containsStr('colsresizer',this.extensions.src.toString().tf_LCase())){
                    this.extensions.name.push('ColumnsResizer_'+this.id);
                    this.extensions.src.push(this.gridColResizerPath);
                    this.extensions.description.push('Columns Resizing');
                    this.extensions.initialize.push(function(o){o.SetColsResizer('ColumnsResizer_'+o.id);});
                }
            }
        }

        //Default columns resizer properties for grid layout
        f.col_resizer_cols_headers_table = this.headTbl.getAttribute('id');
        f.col_resizer_cols_headers_index = this.gridHeadRowIndex;
        f.col_resizer_width_adjustment = 0;
        f.col_enable_text_ellipsis = false;

        //Cols generation for all browsers excepted IE<=7
        o.tblHasColTag = (tf_Tag(o.tbl,'col').length > 0) ? true : false;
        if(!tf_isIE && !tf_isIE7){
            //Col elements are enough to keep column widths after sorting and filtering
            function createColTags(o)
            {
                if(!o) return;
                for(var k=(o.nbCells-1); k>=0; k--)
                {
                    var col = tf_CreateElm( 'col', ['id', o.id+'_col_'+k]);
                    o.tbl.firstChild.parentNode.insertBefore(col,o.tbl.firstChild);
                    col.style.width = o.colWidth[k];
                    o.gridColElms[k] = col;
                }
                o.tblHasColTag = true;
            }
            if(!o.tblHasColTag) createColTags(o);
            else{
                var cols = tf_Tag(o.tbl,'col');
                for(var i=0; i<o.nbCells; i++){
                    cols[i].setAttribute('id', o.id+'_col_'+i);
                    cols[i].style.width = o.colWidth[i];
                    o.gridColElms.push(cols[i]);
                }
            }
        }

        //IE <= 7 needs an additional row for widths as col element width is not enough...
        if(tf_isIE || tf_isIE7){
            var tbody = tf_Tag(o.tbl,'tbody'), r;
            if( tbody.length>0 ) r = tbody[0].insertRow(0);
            else r = o.tbl.insertRow(0);
            r.style.height = '0px';
            for(var i=0; i<o.nbCells; i++){
                var col = tf_CreateElm('td', ['id', o.id+'_col_'+i]);
                col.style.width = o.colWidth[i];
                o.tbl.rows[1].cells[i].style.width = '';
                r.appendChild(col);
                o.gridColElms.push(col);
            }
            this.hasGridWidthsRow = true;
            //Data table row with widths expressed
            o.leadColWidthsRow = o.tbl.rows[0];
            o.leadColWidthsRow.setAttribute('validRow','false');

            var beforeSortFn = tf_IsFn(f.on_before_sort) ? f.on_before_sort : null;
            f.on_before_sort = function(o,colIndex){
                o.leadColWidthsRow.setAttribute('validRow','false');
                if(beforeSortFn!=null) beforeSortFn.call(null,o,colIndex);
            }

            var afterSortFn = tf_IsFn(f.on_after_sort) ? f.on_after_sort : null;
            f.on_after_sort = function(o,colIndex){
                if(o.leadColWidthsRow.rowIndex != 0){
                    var r = o.leadColWidthsRow;
                    if( tbody.length>0 )
                        tbody[0].moveRow(o.leadColWidthsRow.rowIndex, 0);
                    else o.tbl.moveRow(o.leadColWidthsRow.rowIndex, 0);
                }
                if(afterSortFn!=null) afterSortFn.call(null,o,colIndex);
            }
        }

        var afterColResizedFn = tf_IsFn(f.on_after_col_resized) ? f.on_after_col_resized : null;
        f.on_after_col_resized = function(o,colIndex){
            if(colIndex==undefined) return;
            var w = o.crWColsRow.cells[colIndex].style.width;
            var col = o.gridColElms[colIndex];
            col.style.width = w;

            var thCW = o.crWColsRow.cells[colIndex].clientWidth;
            var tdCW = o.crWRowDataTbl.cells[colIndex].clientWidth;

            if(tf_isIE || tf_isIE7)
                o.tbl.style.width = o.headTbl.clientWidth+'px';

            if(thCW != tdCW && !tf_isIE && !tf_isIE7)
                o.headTbl.style.width = o.tbl.clientWidth+'px';

            if(afterColResizedFn!=null) afterColResizedFn.call(null,o,colIndex);
        }

        if(this.tbl.clientWidth != this.headTbl.clientWidth)
            this.tbl.style.width = this.headTbl.clientWidth+'px';

    },

    RemoveGridLayout: function()
    /*====================================================
        - removes the grid layout
    =====================================================*/
    {
        if(!this.gridLayout) return;
        var t = this.tbl.parentNode.removeChild(this.tbl);
        this.tblMainCont.parentNode.insertBefore(t, this.tblMainCont);
        this.tblMainCont.parentNode.removeChild( this.tblMainCont );

        this.tblMainCont = null;
        this.headTblCont = null;
        this.headTbl = null;
        this.tblCont = null;

        this.tbl.outerHTML = this.sourceTblHtml;
        this.tbl = tf_Id(this.id); //needed to keep reference
    },

    SetPopupFilterIcons: function()
    /*====================================================
        - generates popup filters div
    =====================================================*/
    {
        if(!this.popUpFilters) return;
        this.isExternalFlt = true; //external filters behaviour is enabled
        var f = this.fObj;
        this.popUpImgFlt =          f.popup_filters_image!=undefined //filter icon path
                                        ? f.popup_filters_image : this.themesPath+'icn_filter.gif';
        this.popUpImgFltActive =    f.popup_filters_image_active!=undefined //active filter icon path
                                        ? f.popup_filters_image_active : this.themesPath+'icn_filterActive.gif';
        this.popUpImgFltHtml =      f.popup_filters_image_html!=undefined
                                        ? f.popup_filters_image_html : '<img src="'+ this.popUpImgFlt +'" alt="Column filter" />';
        this.popUpDivCssClass =     f.popup_div_css_class!=undefined //defines css class for popup div containing filter
                                        ? f.popup_div_css_class : 'popUpFilter';
        this.onBeforePopUpOpen =    tf_IsFn(f.on_before_popup_filter_open) //callback function before popup filtes is opened
                                        ? f.on_before_popup_filter_open : null;
        this.onAfterPopUpOpen =     tf_IsFn(f.on_after_popup_filter_open) //callback function after popup filtes is opened
                                        ? f.on_after_popup_filter_open : null;
        this.onBeforePopUpClose =   tf_IsFn(f.on_before_popup_filter_close) //callback function before popup filtes is closed
                                        ? f.on_before_popup_filter_close : null;
        this.onAfterPopUpClose =    tf_IsFn(f.on_after_popup_filter_close) //callback function after popup filtes is closed
                                        ? f.on_after_popup_filter_close : null;
        this.externalFltTgtIds = [];
        this.popUpFltSpans = []; //stores filters spans
        this.popUpFltImgs = []; //stores filters icons
        this.popUpFltElms = !this.popUpFltElmCache ? [] : this.popUpFltElmCache; //stores filters containers
        this.popUpFltAdjustToContainer = true;

        var o = this;
        for(var i=0; i<this.nbCells; i++){
            if(this['col'+i] == this.fltTypeNone) continue;
            var popUpSpan = tf_CreateElm('span', ['id', this.prfxPopUpSpan+this.id+'_'+i], ['ci',i]);
            popUpSpan.innerHTML = this.popUpImgFltHtml;
            var header = this.GetHeaderElement(i);
            header.appendChild(popUpSpan);
            popUpSpan.onclick = function(e){
                var evt = e || window.event;
                var colIndex = parseInt(this.getAttribute('ci'));
                o.CloseAllPopupFilters(colIndex);
                o.TogglePopupFilter(colIndex);

                if(o.popUpFltAdjustToContainer){
                    var popUpDiv = o.popUpFltElms[colIndex];
                    var header = o.GetHeaderElement(colIndex);
                    var headerWidth = header.clientWidth * .95;
                    if(!tf_isNotIE){
                        var headerLeft = tf_ObjPosition(header, [header.nodeName])[0];
                        popUpDiv.style.left = (headerLeft) + 'px';
                    }
                    popUpDiv.style.width = parseInt(headerWidth)  + 'px';
                }
                tf_CancelEvent(evt);
                tf_StopEvent(evt);
            };
            this.popUpFltSpans[i] = popUpSpan;
            this.popUpFltImgs[i] = popUpSpan.firstChild;
        }
    },

    SetPopupFilters: function()
    /*====================================================
        - generates all popup filters div
    =====================================================*/
    {
        for(var i=0; i<this.popUpFltElmCache.length; i++)
            this.SetPopupFilter(i, this.popUpFltElmCache[i]);
    },

    SetPopupFilter: function(colIndex, div)
    /*====================================================
        - generates a popup filters div for specifies
        column
    =====================================================*/
    {
        var popUpDiv = !div ? tf_CreateElm('div', ['id', this.prfxPopUpDiv+this.id+'_'+colIndex]) : div;
        popUpDiv.className = this.popUpDivCssClass;
        this.externalFltTgtIds.push(this.prfxPopUpDiv+this.id+'_'+colIndex);
        var header = this.GetHeaderElement(colIndex);
        header.insertBefore(popUpDiv, header.firstChild);
        popUpDiv.onclick = function(e){ tf_StopEvent(e || window.event); };
        this.popUpFltElms[colIndex] = popUpDiv;
    },

    TogglePopupFilter: function(colIndex)
    /*====================================================
        - toggles popup filters div
    =====================================================*/
    {
        var popUpFltElm = this.popUpFltElms[colIndex];
        if(popUpFltElm.style.display == 'none' || popUpFltElm.style.display == ''){
            if(this.onBeforePopUpOpen!=null) this.onBeforePopUpOpen.call(null,this, this.popUpFltElms[colIndex],colIndex);
            popUpFltElm.style.display = 'block';
            if(this['col'+colIndex] == this.fltTypeInp) this.GetFilterElement(colIndex).focus();
            if(this.onAfterPopUpOpen!=null) this.onAfterPopUpOpen.call(null,this, this.popUpFltElms[colIndex],colIndex);
        } else {
            if(this.onBeforePopUpClose!=null) this.onBeforePopUpClose.call(null,this, this.popUpFltElms[colIndex],colIndex);
            popUpFltElm.style.display = 'none';
            if(this.onAfterPopUpClose!=null) this.onAfterPopUpClose.call(null,this, this.popUpFltElms[colIndex],colIndex);
        }
    },

    CloseAllPopupFilters: function(exceptColIndex)
    /*====================================================
        - closes all popup filters
    =====================================================*/
    {
        for(var i=0; i<this.popUpFltElms.length; i++){
            if(i == exceptColIndex) continue;
            var popUpFltElm = this.popUpFltElms[i];
            if(popUpFltElm) popUpFltElm.style.display = 'none';
        }
    },

    RemovePopupFilters: function()
    /*====================================================
        - removes popup filters div
    =====================================================*/
    {
        this.popUpFltElmCache = [];
        for(var i=0; i<this.popUpFltElms.length; i++){
            var popUpFltElm = this.popUpFltElms[i];
            var popUpFltSpan = this.popUpFltSpans[i];
            if(popUpFltElm){
                popUpFltElm.parentNode.removeChild(popUpFltElm);
                this.popUpFltElmCache[i] = popUpFltElm;
            }
            popUpFltElm = null;
            if(popUpFltSpan) popUpFltSpan.parentNode.removeChild(popUpFltSpan);
            popUpFltSpan = null;
        }
    },

    SetPopupFilterIcon: function(colIndex, active)
    /*====================================================
        - sets inactive or active filter icon
    =====================================================*/
    {
        var activeImg = active==undefined ? true : active;
        if(this.popUpFltImgs[colIndex])
            this.popUpFltImgs[colIndex].src = (active) ? this.popUpImgFltActive : this.popUpImgFlt;
    },

    SetAllPopupFiltersIcon: function(active)
    /*====================================================
        - sets inactive or active filter icon for all
        filters
    =====================================================*/
    {
        var activeImg = active==undefined ? false : active;
        for(var i=0; i<this.popUpFltImgs.length; i++)
            this.SetPopupFilterIcon(i, false);
    },

    RememberFiltersValue: function( name )
    /*==============================================
        - stores filters' values in a cookie
        when Filter() method is called
        - Params:
            - name: cookie name (string)
        - credits to Florent Hirchy
    ===============================================*/
    {
        var flt_values = [];
        for(var i=0; i<this.fltIds.length; i++)
        {//creates an array with filters' values
            value = this.GetFilterValue(i);
            if (value == '') value = ' ';
            flt_values.push(value);
        }
        flt_values.push(this.fltIds.length); //adds array size
        tf_WriteCookie(
            name,
            flt_values.join(this.separator),
            this.cookieDuration
        ); //writes cookie
    },

    RememberPageNb: function( name )
    /*==============================================
        - stores page number value in a cookie
        when ChangePage method is called
        - Params:
            - name: cookie name (string)
    ===============================================*/
    {
        tf_WriteCookie(
            name,
            this.currentPageNb,
            this.cookieDuration
        ); //writes cookie
    },

    RememberPageLength: function( name )
    /*==============================================
        - stores page length value in a cookie
        when ChangePageLength method is called
        - Params:
            - name: cookie name (string)
    ===============================================*/
    {
        tf_WriteCookie(
            name,
            this.resultsPerPageSlc.selectedIndex,
            this.cookieDuration
        ); //writes cookie
    },

    ResetValues: function()
    {
        this.EvtManager(this.Evt.name.resetvalues);
    },

    _ResetValues: function()
    /*==============================================
        - re-sets grid values when page is
        re-loaded. It invokes ResetGridValues,
        ResetPage and ResetPageLength methods
        - Params:
            - name: cookie name (string)
    ===============================================*/
    {
        if(this.rememberGridValues && this.fillSlcOnDemand) //only fillSlcOnDemand
            this.ResetGridValues(this.fltsValuesCookie);
        if(this.rememberPageLen) this.ResetPageLength( this.pgLenCookie );
        if(this.rememberPageNb) this.ResetPage( this.pgNbCookie );
    },

    ResetGridValues: function( name )
    /*==============================================
        - re-sets filters' values when page is
        re-loaded if load on demand is enabled
        - Params:
            - name: cookie name (string)
        - credits to Florent Hirchy
    ===============================================*/
    {
        if(!this.fillSlcOnDemand) return;
        var flts = tf_ReadCookie(name); //reads the cookie
        var reg = new RegExp(this.separator,'g');
        var flts_values = flts.split(reg); //creates an array with filters' values
        var slcFltsIndex = this.GetFiltersByType(this.fltTypeSlc, true);
        var multiFltsIndex = this.GetFiltersByType(this.fltTypeMulti, true);

        if(flts_values[(flts_values.length-1)] == this.fltIds.length)
        {//if the number of columns is the same as before page reload
            for(var i=0; i<(flts_values.length - 1); i++)
            {
                if (flts_values[i]==' ') continue;
                if(this['col'+i]==this.fltTypeSlc || this['col'+i]==this.fltTypeMulti)
                {// if fillSlcOnDemand, drop-down needs to contain stored value(s) for filtering
                    var slc = tf_Id( this.fltIds[i] );
                    slc.options[0].selected = false;

                    if( slcFltsIndex.tf_Has(i) )
                    {//selects
                        var opt = tf_CreateOpt(flts_values[i],flts_values[i],true);
                        slc.appendChild(opt);
                        this.hasStoredValues = true;
                    }
                    if(multiFltsIndex.tf_Has(i))
                    {//multiple select
                        var s = flts_values[i].split(' '+this.orOperator+' ');
                        for(j=0; j<s.length; j++)
                        {
                            if(s[j]=='') continue;
                            var opt = tf_CreateOpt(s[j],s[j],true);
                            slc.appendChild(opt);
                            this.hasStoredValues = true;

                            if(tf_isIE)
                            {// IE multiple selection work-around
                                this.__deferMultipleSelection(slc,j,false);
                                hasStoredValues = false;
                            }
                        }
                    }// if multiFltsIndex
                }
                else if(this['col'+i]==this.fltTypeCheckList)
                {
                    var divChk = this.checkListDiv[i];
                    divChk.title = divChk.innerHTML;
                    divChk.innerHTML = '';

                    var ul = tf_CreateElm('ul',['id',this.fltIds[i]],['colIndex',i]);
                    ul.className = this.checkListCssClass;

                    var li0 = tf_CreateCheckItem(this.fltIds[i]+'_0', '', this.displayAllText);
                    li0.className = this.checkListItemCssClass;
                    ul.appendChild(li0);

                    divChk.appendChild(ul);

                    var s = flts_values[i].split(' '+this.orOperator+' ');
                    for(j=0; j<s.length; j++)
                    {
                        if(s[j]=='') continue;
                        var li = tf_CreateCheckItem(this.fltIds[i]+'_'+(j+1), s[j], s[j]);
                        li.className = this.checkListItemCssClass;
                        ul.appendChild(li);
                        li.check.checked = true;
                        this.__setCheckListValues(li.check);
                        this.hasStoredValues = true;
                    }
                }
            }//end for

            if(!this.hasStoredValues && this.paging) this.SetPagingInfo();
        }//end if
    },

    SetRowBg: function(rIndex,index)
    /*====================================================
        - sets row background color
        - Params:
            - rIndex: row index (numeric value)
            - index: valid row collection index needed to
            calculate bg color
    =====================================================*/
    {
        if(!this.alternateBgs || isNaN(rIndex)) return;
        var rows = this.tbl.rows;
        var i = (index==undefined) ? rIndex : index;
        this.RemoveRowBg(rIndex);
        tf_AddClass(
            rows[rIndex],
            (i%2) ? this.rowBgEvenCssClass : this.rowBgOddCssClass
        );
    },

    RemoveRowBg: function(index)
    /*====================================================
        - removes row background color
        - Params:
            - index: row index (numeric value)
    =====================================================*/
    {
        if(isNaN(index)) return;
        var rows = this.tbl.rows;
        tf_RemoveClass(rows[index],this.rowBgOddCssClass);
        tf_RemoveClass(rows[index],this.rowBgEvenCssClass);
    },

    SetAlternateRows: function()
    /*====================================================
        - alternates row colors for better readability
    =====================================================*/
    {
        if( !this.hasGrid && !this.isFirstLoad ) return;
        var rows = this.tbl.rows;
        var noValidRowsIndex = this.validRowsIndex==null;
        var beginIndex = (noValidRowsIndex) ? this.refRow : 0; //1st index
        var indexLen = (noValidRowsIndex) // nb indexes
            ? (this.nbFilterableRows+beginIndex) : this.validRowsIndex.length;

        var idx = 0;
        for(var j=beginIndex; j<indexLen; j++)//alternates bg color
        {
            var rIndex = (noValidRowsIndex) ? j : this.validRowsIndex[j];
            this.SetRowBg(rIndex,idx);
            idx++;
        }
    },

    RemoveAlternateRows: function()
    /*====================================================
        - removes alternate row colors
    =====================================================*/
    {
        if(!this.hasGrid) return;
        var row = this.tbl.rows;
        for(var i=this.refRow; i<this.nbRows; i++)
            this.RemoveRowBg(i);
        this.isStartBgAlternate = true;
    },

    SetFixedHeaders: function()
    /*====================================================
        - CSS solution making headers fixed
    =====================================================*/
    {
        if((!this.hasGrid && !this.isFirstLoad) || !this.fixedHeaders) return;
        if(this.contDiv) return;
        var thead = tf_Tag(this.tbl,'thead');
        if( thead.length==0 ) return;
        var tbody = tf_Tag(this.tbl,'tbody');
        if( tbody[0].clientHeight!=0 )
        {//firefox returns tbody height
            //previous values
            this.prevTBodyH = tbody[0].clientHeight;
            this.prevTBodyOverflow = tbody[0].style.overflow;
            this.prevTBodyOverflowX = tbody[0].style.overflowX;

            tbody[0].style.height = this.tBodyH+'px';
            tbody[0].style.overflow = 'auto';
            tbody[0].style.overflowX = 'hidden';
        } else { //IE returns 0
            // cont div is added to emulate fixed headers behaviour
            var contDiv = tf_CreateElm( 'div',['id',this.prfxContentDiv+this.id] );
            contDiv.className = this.contDivCssClass;
            this.tbl.parentNode.insertBefore(contDiv, this.tbl);
            contDiv.appendChild(this.tbl);
            this.contDiv = tf_Id(this.prfxContentDiv+this.id);
            //prevents headers moving during window scroll (IE)
            this.contDiv.style.position = 'relative';

            var theadH = 0;
            var theadTr = tf_Tag(thead[0],'tr');
            for(var i=0; i<theadTr.length; i++)
            {//css below emulates fixed headers on IE<=6
                theadTr[i].style.cssText += 'position:relative; ' +
                                            'top:expression(offsetParent.scrollTop);';
                theadH += parseInt(theadTr[i].clientHeight);
            }

            this.contDiv.style.height = (this.tBodyH+theadH)+'px';

            var tfoot = tf_Tag(this.tbl,'tfoot');
            if( tfoot.length==0 ) return;

            var tfootTr = tf_Tag(tfoot[0],'tr');

            for(var j=0; j<tfootTr.length; j++)//css below emulates fixed footer on IE<=6
                tfootTr[j].style.cssText += 'position:relative; overflow-x: hidden; ' +
                                            'top: expression(parentNode.parentNode.offsetHeight >= ' +
                                            'offsetParent.offsetHeight ? 0 - parentNode.parentNode.offsetHeight + '+
                                            'offsetParent.offsetHeight + offsetParent.scrollTop : 0);';
        }
    },

    /*====================================================
        - Removes fixed headers
    =====================================================*/
    RemoveFixedHeaders: function(){
        if(!this.hasGrid || !this.fixedHeaders ) return;
        if( this.contDiv )//IE additional div
        {
            this.contDiv.parentNode.insertBefore(this.tbl, this.contDiv);
            this.contDiv.parentNode.removeChild( this.contDiv );
            this.contDiv = null;
            var thead = tf_Tag(this.tbl,'thead');
            if( thead.length==0 ) return;
            var theadTr = tf_Tag(thead[0],'tr');
            if( theadTr.length==0 ) return;
            for(var i=0; i<theadTr.length; i++)
                theadTr[i].style.cssText = '';
            var tfoot = tf_Tag(this.tbl,'tfoot');
            if( tfoot.length==0 ) return;
            var tfootTr = tf_Tag(tfoot[0],'tr');
            for(var j=0; j<tfootTr.length; j++)
            {
                tfootTr[j].style.position = 'relative';
                tfootTr[j].style.top = '';
                tfootTr[j].style.overeflowX = '';
            }
        } else {
            var tbody = tf_Tag(this.tbl,'tbody');
            if( tbody.length==0 ) return;
            tbody[0].style.height = this.prevTBodyH+'px';
            tbody[0].style.overflow = this.prevTBodyOverflow;
            tbody[0].style.overflowX = this.prevTBodyOverflowX;
        }
    },

    Filter: function()
    {
        this.EvtManager(this.Evt.name.filter);
    },
    _Filter: function()
    /*====================================================
        - Filtering fn
        - retrieves data from each td in every single tr
        and compares to search string for current
        column
        - tr is hidden if all search strings are not
        found
    =====================================================*/
    {
        if(!this.fltGrid || (!this.hasGrid && !this.isFirstLoad)) return;
        //invokes eventual onbefore method
        if(this.onBeforeFilter) this.onBeforeFilter.call(null,this);

        if(this.inpWatermark != '') this.SetWatermark(false);

        var row = this.tbl.rows;
        f = this.fObj!=undefined ? this.fObj : [];
        var hiddenrows = 0;
        this.validRowsIndex = [];
        var o = this;

        // removes keyword highlighting
        if(this.highlightKeywords) this.UnhighlightAll();
        //removes popup filters active icons
        if(this.popUpFilters) this.SetAllPopupFiltersIcon();
        //removes active column header class
        if(this.markActiveColumns) this.ClearActiveColumns();
        // search args re-init
        this.searchArgs = this.GetFiltersValue();

        var num_cell_data, nbFormat;
        var re_le = new RegExp(this.leOperator), re_ge = new RegExp(this.geOperator);
        var re_l = new RegExp(this.lwOperator), re_g = new RegExp(this.grOperator);
        var re_d = new RegExp(this.dfOperator), re_lk = new RegExp(tf_RegexpEscape(this.lkOperator));
        var re_eq = new RegExp(this.eqOperator), re_st = new RegExp(this.stOperator);
        var re_en = new RegExp(this.enOperator), re_an = new RegExp(this.anOperator);
        var re_cr = new RegExp(this.curExp), re_em = this.emOperator;
        var re_nm = this.nmOperator, re_re = new RegExp(tf_RegexpEscape(this.rgxOperator));

        function highlight(str,ok,cell){//keyword highlighting
            if(o.highlightKeywords && ok){
                str = str.replace(re_lk,'');
                str = str.replace(re_eq,'');
                str = str.replace(re_st,'');
                str = str.replace(re_en,'');
                var w = str;
                if(re_le.test(str) || re_ge.test(str) || re_l.test(str) || re_g.test(str) || re_d.test(str))
                    w = tf_GetNodeText(cell);
                if(w!='')
                    tf_HighlightWord(cell,w,o.highlightCssClass,o);
            }
        }

        //looks for search argument in current row
        function hasArg(sA,cell_data,j)
        {
            var occurence;
            //Search arg operator tests
            var hasLO = re_l.test(sA), hasLE = re_le.test(sA);
            var hasGR = re_g.test(sA), hasGE = re_ge.test(sA);
            var hasDF = re_d.test(sA), hasEQ = re_eq.test(sA);
            var hasLK = re_lk.test(sA), hasAN = re_an.test(sA);
            var hasST = re_st.test(sA), hasEN = re_en.test(sA);
            var hasEM = (re_em == sA), hasNM = (re_nm == sA);
            var hasRE = re_re.test(sA);

            //Search arg dates tests
            var isLDate = (hasLO && tf_IsValidDate(sA.replace(re_l,''),dtType));
            var isLEDate = (hasLE && tf_IsValidDate(sA.replace(re_le,''),dtType));
            var isGDate = (hasGR && tf_IsValidDate(sA.replace(re_g,''),dtType));
            var isGEDate = (hasGE && tf_IsValidDate(sA.replace(re_ge,''),dtType));
            var isDFDate = (hasDF && tf_IsValidDate(sA.replace(re_d,''),dtType));
            var isEQDate = (hasEQ && tf_IsValidDate(sA.replace(re_eq,''),dtType));

            if(tf_IsValidDate(cell_data,dtType))
            {//dates
                var dte1 = tf_FormatDate(cell_data,dtType);
                if(isLDate)
                {// lower date
                    var dte2 = tf_FormatDate(sA.replace(re_l,''),dtType);
                    occurence = (dte1 < dte2);
                }
                else if(isLEDate)
                {// lower equal date
                    var dte2 = tf_FormatDate(sA.replace(re_le,''),dtType);
                    occurence = (dte1 <= dte2);
                }
                else if(isGEDate)
                {// greater equal date
                    var dte2 = tf_FormatDate(sA.replace(re_ge,''),dtType);
                    occurence = (dte1 >= dte2);
                }
                else if(isGDate)
                {// greater date
                    var dte2 = tf_FormatDate(sA.replace(re_g,''),dtType);
                    occurence = (dte1 > dte2);
                }
                else if(isDFDate)
                {// different date
                    var dte2 = tf_FormatDate(sA.replace(re_d,''),dtType);
                    occurence = (dte1.toString() != dte2.toString());
                }
                else if(isEQDate)
                {// equal date
                    var dte2 = tf_FormatDate(sA.replace(re_eq,''),dtType);
                    occurence = (dte1.toString() == dte2.toString());
                }
                else if(re_lk.test(sA)) // searched keyword with * operator doesn't have to be a date
                {// like date
                    occurence = o.__containsStr(sA.replace(re_lk,''),cell_data,null,false);
                }
                else if(tf_IsValidDate(sA,dtType))
                {
                    var dte2 = tf_FormatDate(sA,dtType);
                    occurence = (dte1.toString() == dte2.toString());
                }
                else if(hasEM) //empty
                    occurence = (cell_data.tf_Trim()=='' ? true : false);

                else if(hasNM) //non-empty
                    occurence = (cell_data.tf_Trim()!='' ? true : false);
            }

            else
            {
                //first numbers need to be formated
                if(o.hasColNbFormat && o.colNbFormat[j]!=null)
                {
                    num_cell_data = tf_RemoveNbFormat(cell_data,o.colNbFormat[j]);
                    nbFormat = o.colNbFormat[j];
                } else {
                    if(o.thousandsSeparator==',' && o.decimalSeparator=='.')
                    {
                        num_cell_data = tf_RemoveNbFormat(cell_data,'us');
                        nbFormat = 'us';
                    } else {
                        num_cell_data = tf_RemoveNbFormat(cell_data,'eu');
                        nbFormat = 'eu';
                    }
                }

                // first checks if there is any operator (<,>,<=,>=,!,*,=,{,},rgx:)
                if(hasLE) //lower equal
                    occurence = num_cell_data <= tf_RemoveNbFormat(sA.replace(re_le,''),nbFormat);

                else if(hasGE) //greater equal
                    occurence = num_cell_data >= tf_RemoveNbFormat(sA.replace(re_ge,''),nbFormat);

                else if(hasLO) //lower
                    occurence = num_cell_data < tf_RemoveNbFormat(sA.replace(re_l,''),nbFormat);

                else if(hasGR) //greater
                    occurence = num_cell_data > tf_RemoveNbFormat(sA.replace(re_g,''),nbFormat);

                else if(hasDF) //different
                    occurence = o.__containsStr(sA.replace(re_d,''),cell_data) ? false : true;

                else if(hasLK) //like
                    occurence = o.__containsStr(sA.replace(re_lk,''),cell_data,null,false);

                else if(hasEQ) //equal
                    occurence = o.__containsStr(sA.replace(re_eq,''),cell_data,null,true);

                else if(hasST) //starts with
                    occurence = cell_data.indexOf(sA.replace(re_st,''))==0 ? true : false;

                else if(hasEN) //ends with
                {
                    var searchArg = sA.replace(re_en,'');
                    occurence = cell_data.lastIndexOf(searchArg,cell_data.length-1)==(cell_data.length-1)-(searchArg.length-1)
                        && cell_data.lastIndexOf(searchArg,cell_data.length-1) > -1
                        ? true : false;
                }

                else if(hasEM) //empty
                    occurence = (cell_data.tf_Trim()=='' ? true : false);

                else if(hasNM) //non-empty
                    occurence = (cell_data.tf_Trim()!='' ? true : false);

                else if(hasRE){ //regexp
                    try{ //in case regexp fires an exception
                        var searchArg = sA.replace(re_re,''); //operator is removed
                        var rgx = new RegExp(searchArg);
                        occurence = rgx.test(cell_data);
                    } catch(e) { occurence = false; }
                }

                else
                    occurence = o.__containsStr(sA,cell_data,(f['col_'+j]==undefined) ? this.fltTypeInp : f['col_'+j]);

            }//else
            return occurence;
        }//fn

        for(var k=this.refRow; k<this.nbRows; k++)
        {
            /*** if table already filtered some rows are not visible ***/
            if(row[k].style.display == 'none') row[k].style.display = '';

            var cell = row[k].cells;
            var nchilds = cell.length;

            // checks if row has exact cell #
            if(nchilds != this.nbCells) continue;

            var occurence = [];
            var isRowValid = (this.searchType=='include') ? true : false;
            var singleFltRowValid = false; //only for single filter search

            for(var j=0; j<nchilds; j++)
            {// this loop retrieves cell data
                var sA = this.searchArgs[(this.singleSearchFlt) ? 0 : j]; //searched keyword
                var dtType = (this.hasColDateType) ? this.colDateType[j] : this.defaultDateType;
                if(sA=='') continue;

                var cell_data = this.GetCellData(j, cell[j]).tf_MatchCase(this.matchCase);

                var sAOrSplit = sA.split(this.orOperator);//multiple search parameter operator ||
                var hasMultiOrSA = (sAOrSplit.length>1) ? true : false;//multiple search || parameter boolean
                var sAAndSplit = sA.split(this.anOperator);//multiple search parameter operator &&
                var hasMultiAndSA = (sAAndSplit.length>1) ? true : false;//multiple search && parameter boolean

                if(hasMultiOrSA || hasMultiAndSA)
                {//multiple sarch parameters
                    var cS, occur = false;
                    var s = (hasMultiOrSA) ? sAOrSplit : sAAndSplit;
                    for(var w=0; w<s.length; w++)
                    {
                        cS = s[w].tf_Trim();
                        occur = hasArg(cS,cell_data,j);
                        highlight(cS,occur,cell[j]);
                        if(hasMultiOrSA && occur) break;
                        if(hasMultiAndSA && !occur) break;
                    }
                    occurence[j] = occur;
                }
                else {//single search parameter
                    occurence[j] = hasArg(sA.tf_Trim(),cell_data,j);
                    highlight(sA,occurence[j],cell[j]);
                }//else single param

                if(!occurence[j]) isRowValid = (this.searchType=='include') ? false : true;
                if(this.singleSearchFlt && occurence[j]) singleFltRowValid = true;
                if(this.popUpFilters) this.SetPopupFilterIcon(j, true);
                if(this.markActiveColumns){
                    if(k == this.refRow){
                        if(this.onBeforeActiveColumn) this.onBeforeActiveColumn.call(null, this, j);
                        tf_AddClass(this.GetHeaderElement(j), this.activeColumnsCssClass);
                        if(this.onAfterActiveColumn) this.onAfterActiveColumn.call(null, this, j);
                    }
                }
            }//for j

            if(this.singleSearchFlt && singleFltRowValid) isRowValid = true;

            if(!isRowValid)
            {
                this.SetRowValidation(k,false);
                // always visible rows need to be counted as valid
                if(this.hasVisibleRows && this.visibleRows.tf_Has(k) && !this.paging)
                    this.validRowsIndex.push(k);
                else
                    hiddenrows++;
            } else {
                this.SetRowValidation(k,true);
                this.validRowsIndex.push(k);
                if(this.alternateBgs) this.SetRowBg(k,this.validRowsIndex.length);
                if(this.onRowValidated) this.onRowValidated.call(null,this,k);
            }
        }// for k

        this.nbVisibleRows = this.validRowsIndex.length;
        this.nbHiddenRows = hiddenrows;
        this.isStartBgAlternate = false;
        if(this.rememberGridValues) this.RememberFiltersValue(this.fltsValuesCookie);
        if(!this.paging) this.ApplyGridProps();//applies filter props after filtering process
        if(this.paging){
            this.startPagingRow = 0;
            this.currentPageNb = 1;
            this.SetPagingInfo(this.validRowsIndex);
        }//starts paging process
        //invokes eventual onafter function
        if(this.onAfterFilter) this.onAfterFilter.call(null,this);
    },

    ApplyGridProps: function()
    /*====================================================
        - checks methods that should be called
        after filtering and/or paging process
    =====================================================*/
    {
        if(this.activeFlt && this.activeFlt.nodeName.tf_LCase()==this.fltTypeSlc && !this.popUpFilters)
        {// blurs active filter (IE)
            this.activeFlt.blur();
            if(this.activeFlt.parentNode) this.activeFlt.parentNode.focus();
        }

        if(this.visibleRows) this.SetVisibleRows();//shows rows always visible
        if(this.colOperation) this.SetColOperation();//makes operation on a col
        if(this.refreshFilters) this.RefreshFiltersGrid();//re-populates drop-down filters
        var nr = (!this.paging && this.hasVisibleRows)
                    ? (this.nbVisibleRows - this.visibleRows.length) : this.nbVisibleRows;
        if(this.rowsCounter) this.RefreshNbRows(nr);//refreshes rows counter

        if(this.inpWatermark != '') this.SetWatermark(true);
        if(this.popUpFilters) this.CloseAllPopupFilters();
    },

    GetColValues: function(colindex,num,exclude)
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
    {
        if(!this.fltGrid) return;
        var row = this.tbl.rows;
        var colValues = [];

        for(var i=this.refRow; i<this.nbRows; i++)//iterates rows
        {
            var isExludedRow = false;
            if(exclude!=undefined && tf_IsObj(exclude))
            { // checks if current row index appears in exclude array
                isExludedRow = exclude.tf_Has(i); //boolean
            }
            var cell = row[i].cells;
            var nchilds = cell.length;

            if(nchilds == this.nbCells && !isExludedRow)
            {// checks if row has exact cell # and is not excluded
                for(var j=0; j<nchilds; j++)// this loop retrieves cell data
                {
                    if(j==colindex && row[i].style.display=='')
                    {
                        var cell_data = this.GetCellData(j, cell[j]).tf_LCase();
                        var nbFormat = this.colNbFormat ? this.colNbFormat[colindex] : null;
                        (num) ? colValues.push(tf_RemoveNbFormat(cell_data,nbFormat))
                                : colValues.push(cell_data);
                    }//if j==k
                }//for j
            }//if nchilds == this.nbCells
        }//for i
        return colValues;
    },

    GetFilterValue: function(index)
    /*====================================================
        - Returns value of a specified filter
        - Params:
            - index: filter column index (numeric value)
    =====================================================*/
    {
        if(!this.fltGrid) return;
        var fltValue;
        var flt = this.GetFilterElement(index);
        if(flt==null) return fltValue='';

        if(this['col'+index]!=this.fltTypeMulti &&
            this['col'+index]!=this.fltTypeCheckList)
            fltValue = flt.value;
        else if(this['col'+index] == this.fltTypeMulti)
        {//mutiple select
            fltValue = '';
            for(var j=0; j<flt.options.length; j++)
                if(flt.options[j].selected)
                    fltValue = fltValue.concat(
                                flt.options[j].value+' ' +
                                this.orOperator + ' '
                                );
            //removes last operator ||
            fltValue = fltValue.substr(0,fltValue.length-4);
        }
        else if(this['col'+index]==this.fltTypeCheckList)
        {//checklist
            if(flt.getAttribute('value')!=null)
            {
                fltValue = flt.getAttribute('value');
                //removes last operator ||
                fltValue = fltValue.substr(0,fltValue.length-3);
            } else fltValue = '';
        }
        return fltValue;
    },

    GetFiltersValue: function()
    /*====================================================
        - Returns the value of every single filter
    =====================================================*/
    {
        if(!this.fltGrid) return;
        var searchArgs = [];
        for(var i=0; i<this.fltIds.length; i++)
            searchArgs.push(
                this.GetFilterValue(i).tf_MatchCase(this.matchCase).tf_Trim()
            );
        return searchArgs;
    },

    GetFilterId: function(index)
    /*====================================================
        - Returns filter id of a specified column
        - Params:
            - index: column index (numeric value)
    =====================================================*/
    {
        if(!this.fltGrid) return;
        return this.fltIds[i];
    },

    GetFiltersByType: function(type,bool)
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
    {
        if(!this.fltGrid) return;
        var arr = [];
        for(var i=0; i<this.fltIds.length; i++)
        {
            var fltType = this['col'+i];
            if(fltType == type.tf_LCase())
            {
                var a = (bool) ? i : this.fltIds[i];
                arr.push(a);
            }
        }
        return arr;
    },

    GetFilterElement: function(index)
    /*====================================================
        - returns filter DOM element for a given column
        index
    =====================================================*/
    {
        if(!this.fltGrid) return null;
        return tf_Id(this.fltIds[index]);
    },

    GetCellsNb: function(rowIndex)
    /*====================================================
        - returns number of cells in a row
        - if rowIndex param is passed returns number of
        cells of specified row (number)
    =====================================================*/
    {
        var tr = (rowIndex == undefined) ? this.tbl.rows[0] : this.tbl.rows[rowIndex];
        return tr.cells.length;
    },

    GetRowsNb: function(includeHeaders)
    /*====================================================
        - returns total nb of filterable rows starting
        from reference row if defined
        - Param:
            - includeHeaders: if true header rows are
            included in calculation(= table rows number)
    =====================================================*/
    {
        var s = this.refRow==undefined ? 0 : this.refRow;
        var ntrs = this.tbl.rows.length;
        if(includeHeaders){ s = 0; }
        return parseInt(ntrs-s);
    },

    GetCellData: function(i, cell)
    /*====================================================
        - returns text content of a given cell
        - Params:
            - i: index of the column (number)
            - cell: td DOM object
    =====================================================*/
    {
        if(i==undefined || cell==null) return "";
        //First checks for customCellData event
        if(this.customCellData && this.customCellDataCols.tf_Has(i))
            return this.customCellData.call(null,this,cell,i);
        else
            return tf_GetNodeText(cell);
    },

    GetTableData: function()
    /*====================================================
        - returns an array containing table data:
        [rowindex,[value1,value2,value3...]]
    =====================================================*/
    {
        var row = this.tbl.rows;
        for(var k=this.refRow; k<this.nbRows; k++)
        {
            var rowData, cellData;
            rowData = [k,[]];
            var cells = row[k].cells;
            for(var j=0; j<cells.length; j++)
            {// this loop retrieves cell data
                var cell_data = this.GetCellData(j, cells[j]);
                rowData[1].push(cell_data);
            }
            this.tblData.push(rowData)
        }
        return this.tblData;
    },

    GetFilteredData: function(includeHeaders)
    /*====================================================
        - returns an array containing filtered data:
        [rowindex,[value1,value2,value3...]]
    =====================================================*/
    {
        if(!this.validRowsIndex) return [];
        var row = this.tbl.rows;
        var filteredData = [];
        if(includeHeaders){
            var table = (this.gridLayout) ? this.headTbl : this.tbl;
            var r = table.rows[this.headersRow];
            var rowData = [r.rowIndex,[]];
            for(var j=0; j<this.nbCells; j++)
            {
                var headerText = this.GetCellData(j, r.cells[j]);
                rowData[1].push(headerText);
            }
            filteredData.push(rowData);
        }
        //for(var i=0; i<this.validRowsIndex.length; i++)
        var validRows = this.GetValidRowsIndex(true);
        for(var i=0; i<validRows.length; i++)
        {
            var rowData, cellData;
            rowData = [this.validRowsIndex[i],[]];
            var cells = row[this.validRowsIndex[i]].cells;
            for(var j=0; j<cells.length; j++)
            {
                var cell_data = this.GetCellData(j, cells[j]);
                rowData[1].push(cell_data);
            }
            filteredData.push(rowData);
        }
        return filteredData;
    },

    GetFilteredDataCol: function(colIndex)
    /*====================================================
        - returns an array containing filtered data of a
        specified column.
        - Params:
            - colIndex: index of the column (number)
        - returned array:
        [value1,value2,value3...]
    =====================================================*/
    {
        if(colIndex==undefined) return [];
        var data =  this.GetFilteredData();
        var colData = [];
        for(var i=0; i<data.length; i++)
        {
            var r = data[i];
            var d = r[1]; //cols values of current row
            var c = d[colIndex]; //data of searched column
            colData.push(c);
        }
        return colData;
    },

    GetRowDisplay: function(row)
    {
        if(!this.fltGrid && !tf_IsObj(row)) return;
        return row.style.display;
    },

    SetRowValidation: function(rowIndex,isValid)
    /*====================================================
        - Validates/unvalidates row by setting 'validRow'
        attribute and shows/hides row
        - Params:
            - rowIndex: index of the row (number)
            - isValid: boolean
    =====================================================*/
    {
        var row = this.tbl.rows[rowIndex];
        if(!row || (typeof isValid).tf_LCase()!='boolean') return;

        // always visible rows are valid
        if(this.hasVisibleRows && this.visibleRows.tf_Has(rowIndex) && !this.paging)
            isValid = true;

        var displayFlag = (isValid) ? '' : 'none';
        var validFlag = (isValid) ? 'true' : 'false';
        row.style.display = displayFlag;

        if(this.paging)
            row.setAttribute('validRow',validFlag);
    },

    ValidateAllRows: function()
    /*====================================================
        - Validates all filterable rows
    =====================================================*/
    {
        if(!this.hasGrid) return;
        this.validRowsIndex = [];
        for(var k=this.refRow; k<this.nbFilterableRows; k++)
        {
            this.SetRowValidation(k,true);
            this.validRowsIndex.push(k);
        }
    },

    SetFilterValue: function(index,searcharg,doFilter)
    /*====================================================
        - Inserts value in a specified filter
        - Params:
            - index: filter column index (numeric value)
            - searcharg: search string
            - doFilter: optional boolean for multiple
            selects: executes filtering when multiple
            select populated... IE only!
    =====================================================*/
    {
        if((!this.fltGrid && !this.isFirstLoad) || this.GetFilterElement(index)==null) return;
        var slc = this.GetFilterElement(index);
        var execFilter = (doFilter==undefined) ? true : doFilter;
        searcharg = (searcharg==undefined) ? '' : searcharg;

        if(this['col'+index]!=this.fltTypeMulti &&
            this['col'+index]!=this.fltTypeCheckList){
            slc.value = searcharg;
            if(this['col'+index]==this.fltTypeInp && this.inpWatermark!='')
                tf_RemoveClass(slc, this.inpWatermarkCssClass);
        }

        else if(this['col'+index] == this.fltTypeMulti)
        {//multiple selects
            var s = searcharg.split(' '+this.orOperator+' ');
            var ct = 0; //keywords counter
            for(var j=0; j<slc.options.length; j++)
            {
                if(s=='') slc.options[j].selected = false;
                if(slc.options[j].value=='') slc.options[j].selected = false;
                if(slc.options[j].value!='' && s.tf_Has(slc.options[j].value,true))
                {
                    if(tf_isIE)
                    {// IE multiple selection work-around
                        //when last value reached filtering can be executed
                        var filter = (ct==(s.length-1) && execFilter) ? true : false;
                        this.__deferMultipleSelection(slc,j,filter);
                        ct++;
                    }
                    else
                        slc.options[j].selected = true;
                }//if
            }//for j
        }

        else if(this['col'+index]==this.fltTypeCheckList)
        {//checklist
            searcharg = searcharg.tf_MatchCase(this.matchCase);
            var s = searcharg.split(' '+this.orOperator+' ');
            var fltValue = slc.setAttribute('value','');
            var fltIndex = slc.setAttribute('indexes','');
            for(var k=0; k<tf_Tag(slc,'li').length; k++)
            {
                var li = tf_Tag(slc,'li')[k];
                var lbl = tf_Tag(li,'label')[0];
                var chk = tf_Tag(li,'input')[0];
                var lblTxt = tf_GetNodeText(lbl).tf_MatchCase(this.matchCase);
                if(lblTxt!='' && s.tf_Has(lblTxt,true))
                {
                    chk.checked = true;
                    this.__setCheckListValues(chk);
                }
                else{
                    chk.checked = false;
                    this.__setCheckListValues(chk);
                }
            }
        }
    },

    SetColWidths: function(rowIndex)
    /*====================================================
        - sets coluun widths in pixels
    =====================================================*/
    {
        if(!this.fltGrid || !this.hasColWidth) return;
        var o = this, rIndex;
        if(rowIndex==undefined) rIndex = this.tbl.rows[0].style.display!='none' ? 0 : 1;
        else rIndex = rowIndex;
        setWidths(this.tbl.rows[rIndex]);

        function setWidths(row)
        {
            if(!o && (o.nbCells!=o.colWidth.length)) return;
            if(o.nbCells==row.cells.length)
                for(var k=0; k<o.nbCells; k++)
                    row.cells[k].style.width = o.colWidth[k];
        }
    },

    SetVisibleRows: function()
    /*====================================================
        - makes a row always visible
        - Note this works only if paging is false
    =====================================================*/
    {
        if(this.hasGrid && this.hasVisibleRows && !this.paging)
        {
            for(var i=0; i<this.visibleRows.length; i++)
            {
                if(this.visibleRows[i]<=this.nbRows)//row index cannot be > nrows
                    this.SetRowValidation(this.visibleRows[i],true);
            }//for i
        }//if hasGrid
    },

    ClearFilters: function()
    {
        this.EvtManager(this.Evt.name.clear);
    },
    _ClearFilters: function()
    /*====================================================
        - clears grid filters
    =====================================================*/
    {
        if(!this.fltGrid) return;
        if(this.onBeforeReset){ this.onBeforeReset.call(null, this, this.GetFiltersValue()); }
        for(var i=0; i<this.fltIds.length; i++)
            this.SetFilterValue(i,'');
        if(this.refreshFilters){
            this.activeFilterId = '';
            this.RefreshFiltersGrid();
        }
        if(this.rememberPageLen){ tf_RemoveCookie(this.pgLenCookie); }
        if(this.rememberPageNb){ tf_RemoveCookie(this.pgNbCookie); }
        if(this.onAfterReset){ this.onAfterReset.call(null, this); }
    },

    ClearActiveColumns: function()
    /*====================================================
        - clears active columns header class name
    =====================================================*/
    {
        for(var i=0; i<this.fltIds.length; i++)
            tf_RemoveClass(this.GetHeaderElement(i), this.activeColumnsCssClass);
    },

    RefreshGrid: function(config)
    /*====================================================
        - Re-generates filters grid
    =====================================================*/
    {
        var configObj = !config ? this.fObj : config;
        var hasSort = this.sort;
        if(hasSort) this.sort = false; //sort property is set to false in order to avoid sort object re-instanciation
        this.nbRows = this.GetRowsNb(); //in case table is refreshed
        this.RemoveGrid();
        window['tf_'+this.id] = new TF(this.id, this.startRow, configObj);
        this.isFirstLoad = true;
        this.fltIds = [];
        this._AddGrid();
        if(hasSort){
            //New tbody content needs to be referenced in sortabletable script with setTBody() method
            //this.st =  SortableTable object
            this.st.setTBody(this.tbl.tBodies[0]); //Note this is a method of the Sortable Table 1.12 script (Erik Arvidsson)
            this.sort = true; //finally sort property is enabled again
        }
    },

    RefreshFiltersGrid: function()
    /*====================================================
        - retrieves select, multiple and checklist filters
        - calls method repopulating filters
    =====================================================*/
    {
        var slcA1 = this.GetFiltersByType( this.fltTypeSlc,true );
        var slcA2 = this.GetFiltersByType( this.fltTypeMulti,true );
        var slcA3 = this.GetFiltersByType( this.fltTypeCheckList,true );
        var slcIndex = slcA1.concat(slcA2);
        slcIndex = slcIndex.concat(slcA3);

        if( this.activeFilterId!=null )//for paging
        {
            var activeFlt = this.activeFilterId.split('_')[0];
            activeFlt = activeFlt.split(this.prfxFlt)[1];
            var slcSelectedValue;
            for(var i=0; i<slcIndex.length; i++)
            {
                var curSlc = tf_Id(this.fltIds[slcIndex[i]]);
                slcSelectedValue = this.GetFilterValue( slcIndex[i] );
                if(activeFlt!=slcIndex[i] || (this.paging && slcA1.tf_Has(slcIndex[i]) && activeFlt==slcIndex[i] ) ||
                    ( !this.paging && (slcA3.tf_Has(slcIndex[i]) || slcA2.tf_Has(slcIndex[i]) )) ||
                    slcSelectedValue==this.displayAllText )
                {
                    if(slcA3.tf_Has(slcIndex[i]))
                        this.checkListDiv[slcIndex[i]].innerHTML = '';
                    else curSlc.innerHTML = '';

                    if(this.fillSlcOnDemand) { //1st option needs to be inserted
                        var opt0 = tf_CreateOpt(this.displayAllText,'');
                        if(curSlc) curSlc.appendChild( opt0 );
                    }

                    if(slcA3.tf_Has(slcIndex[i]))
                        this._PopulateCheckList(slcIndex[i]);
                    else
                        this._PopulateSelect(slcIndex[i],true);

                    this.SetFilterValue(slcIndex[i],slcSelectedValue);
                }
            }// for i
        }
    },

    SetColOperation: function()
    /*====================================================
        - Calculates values of a column
        - params are stored in 'colOperation' table's
        attribute
            - colOperation['id'] contains ids of elements
            showing result (array)
            - colOperation['col'] contains index of
            columns (array)
            - colOperation['operation'] contains operation
            type (array, values: sum, mean)
            - colOperation['write_method'] array defines
            which method to use for displaying the
            result (innerHTML, setValue, createTextNode).
            Note that innerHTML is the default value.
            - colOperation['tot_row_index'] defines in
            which row results are displayed (integers array)

        - changes made by nuovella:
        (1) optimized the routine (now it will only
        process each column once),
        (2) added calculations for the median, lower and
        upper quartile.
    =====================================================*/
    {
        if( !this.isFirstLoad && !this.hasGrid ) return;

        if(this.onBeforeOperation) this.onBeforeOperation.call(null,this);

        var labelId = this.colOperation['id'];
        var colIndex = this.colOperation['col'];
        var operation = this.colOperation['operation'];
        var outputType = this.colOperation['write_method'];
        var totRowIndex = this.colOperation['tot_row_index'];
        var excludeRow = this.colOperation['exclude_row'];
        var decimalPrecision = this.colOperation['decimal_precision']!=undefined
                                ? this.colOperation['decimal_precision'] : 2;

        //nuovella: determine unique list of columns to operate on
        var ucolIndex =[];
        var ucolMax=0;

        ucolIndex[ucolMax]=colIndex[0];

        for(var i=1; i<colIndex.length; i++)
        {
            saved=0;
            //see if colIndex[i] is already in the list of unique indexes
            for(var j=0; j<=ucolMax; j++ )
            {
                if (ucolIndex[j]==colIndex[i])
                    saved=1;
            }
            if (saved==0)
            {//if not saved then, save the index;
                ucolMax++;
                ucolIndex[ucolMax]=colIndex[i];
            }
        }// for i

        if( (typeof labelId).tf_LCase()=='object'
            && (typeof colIndex).tf_LCase()=='object'
            && (typeof operation).tf_LCase()=='object' )
        {
            var row = this.tbl.rows;
            var colvalues = [];

            for(var ucol=0; ucol<=ucolMax; ucol++)
            {
                //this retrieves col values
                //use ucolIndex because we only want to pass through this loop once for each column
                //get the values in this unique column
                colvalues.push( this.GetColValues(ucolIndex[ucol],true,excludeRow) );

               //next: calculate all operations for this column
               var result, nbvalues=0,  temp;
               var meanValue=0, sumValue=0, minValue=null, maxValue=null, q1Value=null, medValue=null, q3Value=null;
               var meanFlag=0, sumFlag=0, minFlag=0, maxFlag=0, q1Flag=0, medFlag=0, q3Flag=0;
               var theList=[];
               var opsThisCol=[], decThisCol=[], labThisCol=[], oTypeThisCol=[];
               var mThisCol=-1;

                for(var i=0; i<colIndex.length; i++)
                {
                     if (colIndex[i]==ucolIndex[ucol])
                     {
                        mThisCol++;
                        opsThisCol[mThisCol]=operation[i].tf_LCase();
                        decThisCol[mThisCol]=decimalPrecision[i];
                        labThisCol[mThisCol]=labelId[i];
                        oTypeThisCol = (outputType != undefined && (typeof outputType).tf_LCase()=='object')
                                            ? outputType[i] : null;

                        switch( opsThisCol[mThisCol] )
                        {
                            case 'mean':
                                meanFlag=1;
                            break;
                            case 'sum':
                                sumFlag=1;
                            break;
                            case 'min':
                                minFlag=1;
                            break;
                            case 'max':
                                maxFlag=1;
                            break;
                            case 'median':
                                medFlag=1;
                                break;
                            case 'q1':
                                q1Flag=1;
                            break;
                            case 'q3':
                                q3Flag=1;
                            break;
                        }
                    }
                }

                for(var j=0; j<colvalues[ucol].length; j++ )
                {
                    if ((q1Flag==1)||(q3Flag==1) || (medFlag==1))
                    {//sort the list for calculation of median and quartiles
                        if (j<colvalues[ucol].length -1)
                        {
                            for(k=j+1;k<colvalues[ucol].length; k++) {

                                if( eval(colvalues[ucol][k]) < eval(colvalues[ucol][j]))
                                {
                                    temp = colvalues[ucol][j];
                                    colvalues[ucol][j] = colvalues[ucol][k];
                                    colvalues[ucol][k] = temp;
                                }
                            }
                        }
                    }
                    var cvalue = parseFloat(colvalues[ucol][j]);
                    theList[j]=parseFloat( cvalue );

                    if( !isNaN(cvalue) )
                    {
                        nbvalues++;
                        if ((sumFlag==1)|| (meanFlag==1)) sumValue += parseFloat( cvalue );
                        if (minFlag==1)
                        {
                            if (minValue==null)
                            {
                                minValue = parseFloat( cvalue );
                            }
                            else minValue= parseFloat( cvalue )<minValue? parseFloat( cvalue ): minValue;
                        }
                        if (maxFlag==1) {
                            if (maxValue==null)
                            {maxValue = parseFloat( cvalue );}
                        else {maxValue= parseFloat( cvalue )>maxValue? parseFloat( cvalue ): maxValue;}
                        }
                    }
                }//for j
                if (meanFlag==1) meanValue = sumValue/nbvalues;
                if (medFlag==1)
                {
                        var aux = 0;
                        if(nbvalues%2 == 1)
                        {
                            aux = Math.floor(nbvalues/2);
                            medValue = theList[aux];
                        }
                    else medValue = (theList[nbvalues/2]+theList[((nbvalues/2)-1)])/2;
                }
                if (q1Flag==1)
                {
                    var posa=0.0;
                    posa = Math.floor(nbvalues/4);
                    if (4*posa == nbvalues) {q1Value = (theList[posa-1] + theList[posa])/2;}
                    else {q1Value = theList[posa];}
                }
                if (q3Flag==1)
                {
                    var posa=0.0;
                    var posb=0.0;
                    posa = Math.floor(nbvalues/4);
                    if (4*posa == nbvalues)
                    {
                        posb = 3*posa;
                        q3Value = (theList[posb] + theList[posb-1])/2;
                    }
                    else
                        q3Value = theList[nbvalues-posa-1];
                }

                for(var i=0; i<=mThisCol; i++ )
                {
                   switch( opsThisCol[i] )
                   {
                        case 'mean':
                            result=meanValue;
                        break;
                        case 'sum':
                            result=sumValue;
                        break;
                        case 'min':
                            result=minValue;
                        break;
                        case 'max':
                            result=maxValue;
                        break;
                        case 'median':
                            result=medValue;
                            break;
                        case 'q1':
                            result=q1Value;
                        break;
                        case 'q3':
                            result=q3Value;
                        break;
                  }

                var precision = decThisCol[i]!=undefined && !isNaN( decThisCol[i] )
                                    ? decThisCol[i] : 2;

                if(oTypeThisCol!=null && result)
                {//if outputType is defined
                    result = result.toFixed( precision );
                    if( tf_Id( labThisCol[i] )!=undefined )
                    {
                        switch( oTypeThisCol.tf_LCase() )
                        {
                            case 'innerhtml':
                                if (isNaN(result) || !isFinite(result) || (nbvalues==0))
                                    tf_Id( labThisCol[i] ).innerHTML = '.';
                                else
                                    tf_Id( labThisCol[i] ).innerHTML = result;
                            break;
                            case 'setvalue':
                                tf_Id( labThisCol[i] ).value = result;
                            break;
                            case 'createtextnode':
                                var oldnode = tf_Id( labThisCol[i] ).firstChild;
                                var txtnode = tf_CreateText( result );
                                tf_Id( labThisCol[i] ).replaceChild( txtnode,oldnode );
                            break;
                        }//switch
                    }
                } else {
                    try
                    {
                        if (isNaN(result) || !isFinite(result) || (nbvalues==0))
                            tf_Id( labThisCol[i] ).innerHTML = '.';
                        else
                             tf_Id( labThisCol[i] ).innerHTML = result.toFixed( precision );
                    } catch(e){ }//catch
                }//else
             }//for i
            //eventual row(s) with result are always visible
            if(totRowIndex!=undefined && row[totRowIndex[ucol]])
                row[totRowIndex[ucol]].style.display = '';
            }//for ucol
        }//if typeof

        if(this.onAfterOperation) this.onAfterOperation.call(null,this);
    },

    UnhighlightAll: function()
    /*====================================================
        - removes keyword highlighting
    =====================================================*/
    {
        if( this.highlightKeywords && this.searchArgs!=null ){
            for(var y=0; y<this.searchArgs.length; y++){
                tf_UnhighlightWord(this, this.searchArgs[y], this.highlightCssClass);
            }
            this.highlightedNodes = [];
        }
    },

    /*====================================================
        - Private methods
    =====================================================*/

    __resetGrid: function()
    /*====================================================
        - Only used by AddGrid() method
        - Resets filtering grid bar if previously removed
    =====================================================*/
    {
        if(this.isFirstLoad) return;

        // grid was removed, grid row element is stored in fltGridEl property
        if(!this.gridLayout){
            this.tbl.rows[this.filtersRowIndex].parentNode.insertBefore(
                this.fltGridEl,
                this.tbl.rows[this.filtersRowIndex]
            );
        }

        if(this.isExternalFlt)
        {// filters are appended in external placeholders elements
            for(var ct=0; ct<this.externalFltTgtIds.length; ct++)
                if(tf_Id(this.externalFltTgtIds[ct])){
                    tf_Id(this.externalFltTgtIds[ct]).appendChild(this.externalFltEls[ct]);

                    //IE special treatment for gridLayout, appended filters are empty
                    if(this.gridLayout && this.externalFltEls[ct].innerHTML=='' && this['col'+ct] != this.fltTypeInp){
                        if(this['col'+ct] == this.fltTypeSlc || this['col'+ct] == this.fltTypeMulti)
                            this.PopulateSelect(ct);
                        if(this['col'+ct] == this.fltTypeCheckList) this.PopulateCheckList(ct);
                    }
                }
        }

        this.nbFilterableRows = this.GetRowsNb();
        this.nbVisibleRows = this.nbFilterableRows;
        this.nbRows = this.tbl.rows.length;
        if(this.isSortEnabled) this.sort = true;

        if(this.tbl.rows[this.filtersRowIndex].innerHTML=='')
            refreshFilters(this);
        else
            if(this.popUpFilters){ this.headersRow++; this.SetPopupFilters(); }

        /***    ie bug work-around, filters need to be re-generated
                since row is empty; insertBefore method doesn't seem to work properly
                with previously generated DOM nodes modified by innerHTML   ***/
        function refreshFilters(o){
            o.tbl.deleteRow(o.filtersRowIndex);
            o.RemoveGrid();
            o.fltIds = [];
            o.isFirstLoad = true;
            if(o.popUpFilters) o.RemovePopupFilters();
            o._AddGrid();
        }

        if(!this.gridLayout) tf_AddClass(this.tbl, this.prfxTf);
        this.hasGrid = true;
    },

    __containsStr: function(arg,data,fltType,forceMatch)
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
    {
        // Improved by Cedric Wartel (cwl)
        // automatic exact match for selects and special characters are now filtered
        var regexp;
        var modifier = (this.matchCase) ? 'g' : 'gi';
        var exactMatch = (forceMatch==undefined) ? this.exactMatch : forceMatch;
        if(exactMatch || (fltType!=this.fltTypeInp && fltType!=undefined))//V�ry P�ter's patch
            regexp = new RegExp('(^\\s*)'+tf_RegexpEscape(arg)+'(\\s*$)', modifier);
        else
            regexp = new RegExp(tf_RegexpEscape(arg), modifier);
        return regexp.test(data);
    },

    IncludeFile: function(fileId, filePath, callback, type)
    {
        var ftype = (type==undefined) ? 'script' : type;
        var isImported = tf_IsImported(filePath, ftype);
        if(isImported) return;
        var o = this, isLoaded = false, file;
        var head = tf_Tag(document,'head')[0];

        if(ftype.tf_LCase() == 'link')
            file = tf_CreateElm(
                        'link', ['id',fileId], ['type','text/css'],
                        ['rel','stylesheet'], ['href',filePath]
                    );
        else
            file = tf_CreateElm(
                        'script', ['id',fileId],
                        ['type','text/javascript'], ['src',filePath]
                    );

        file.onload = file.onreadystatechange = function()
        {//Browser <> IE onload event works only for scripts, not for stylesheets
            if(!isLoaded &&
                (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'))
            {
                isLoaded = true;
                if(typeof callback === 'function'){ callback.call(null,o); }
            }
        }
        file.onerror = function(){
            throw new Error('TF script could not load:\n' + this.src);
        }
        head.appendChild(file);
    },

    HasGrid: function()
    /*====================================================
        - checks if table has a filter grid
        - returns a boolean
    =====================================================*/
    {
        return this.hasGrid;
    },

    GetFiltersId: function()
    /*====================================================
        - returns an array containing filters ids
        - Note that hidden filters are also returned
    =====================================================*/
    {
        if( !this.hasGrid ) return;
        return this.fltIds;
    },

    GetValidRowsIndex: function(reCalc)
    /*====================================================
        - returns an array containing valid rows indexes
        (valid rows upon filtering)
    =====================================================*/
    {
        if( !this.hasGrid ) return;
        if(!reCalc){ return this.validRowsIndex; }
        this.validRowsIndex = [];
        for(var k=this.refRow; k<this.GetRowsNb(true); k++){
            var r = this.tbl.rows[k];
            if(!this.paging){
                if(this.GetRowDisplay(r) != 'none')
                    this.validRowsIndex.push(r.rowIndex);
            } else {
                if(r.getAttribute('validRow') == 'true' || r.getAttribute('validRow') == null)
                    this.validRowsIndex.push(r.rowIndex);
            }
        }
        return this.validRowsIndex;
    },

    GetFiltersRowIndex: function()
    /*====================================================
        - Returns the index of the row containing the
        filters
    =====================================================*/
    {
        if( !this.hasGrid ) return;
        return this.filtersRowIndex;
    },

    GetHeadersRowIndex: function()
    /*====================================================
        - Returns the index of the headers row
    =====================================================*/
    {
        if( !this.hasGrid ) return;
        return this.headersRow;
    },

    GetStartRowIndex: function()
    /*====================================================
        - Returns the index of the row from which will
        start the filtering process (1st filterable row)
    =====================================================*/
    {
        if( !this.hasGrid ) return;
        return this.refRow;
    },

    GetLastRowIndex: function()
    /*====================================================
        - Returns the index of the last row
    =====================================================*/
    {
        if( !this.hasGrid ) return;
        return (this.nbRows-1);
    },

    GetHeaderElement: function(colIndex)
    /*====================================================
        - returns a header DOM element for a given column
        index
    =====================================================*/
    {
        var table = (this.gridLayout) ? this.headTbl : this.tbl;
        var header, tHead = tf_Tag(this.tbl,'thead');
        for(var i=0; i<this.nbCells; i++)
        {
            if(i != colIndex) continue;
            if(tHead.length == 0)
                header = table.rows[this.headersRow].cells[i];
            if(tHead.length == 1)
                header = tHead[0].rows[this.headersRow].cells[i];
            break;
        }
        return header;
    },

    GetConfigObject: function()
    /*====================================================
        - returns the original configuration object
    =====================================================*/
    {
        return this.fObj;
    },

    GetFilterableRowsNb: function()
    /*====================================================
        - returns the total number of rows that can be
        filtered
    =====================================================*/
    {
        return this.GetRowsNb(false);
    }
};

/* --- */

/*====================================================
    - General TF utility fns below
=====================================================*/

function tf_GetNodeText(n)
/*====================================================
    - returns text + text of child nodes of a node
=====================================================*/
{
    var s = n.textContent || n.innerText || n.innerHTML.replace(/\<[^<>]+>/g, '');
    s = s.replace(/^\s+/, '').replace(/\s+$/, '')/*.tf_Trim()*/;
    return s.tf_Trim();
}

function tf_IsObj(v)
/*====================================================
    - checks if var exists and is an object
    - returns a boolean
=====================================================*/
{
    var isO = false;
    if((typeof v).tf_LCase()=='string'){
        if(window[v] && (typeof window[v]).tf_LCase()=='object')
            isO = true;
    } else {
        if(v && (typeof v).tf_LCase()=='object')
            isO = true;
    }
    return isO;
}

function tf_IsFn(fn)
/*====================================================
    - checks if passed param is a function
    - returns a boolean
=====================================================*/
{
    return (fn && fn.constructor == Function);
}

function tf_IsArray(obj){
/*====================================================
    - checks if passed param is an array
    - returns a boolean
=====================================================*/
    return (obj && obj.constructor == Array);
}

function tf_Id(id)
/*====================================================
    - this is just a getElementById shortcut
=====================================================*/
{
    return document.getElementById(id);
}

function tf_Tag(o,tagname)
/*====================================================
    - this is just a getElementsByTagName shortcut
=====================================================*/
{
    return o.getElementsByTagName(tagname);
}

function tf_RegexpEscape(s)
/*====================================================
    - escapes special characters [\^$.|?*+()
    for regexp
    - Many thanks to Cedric Wartel for this fn
=====================================================*/
{
    // traite les caract�res sp�ciaux [\^$.|?*+()
    //remplace le carct�re c par \c
    function escape(e)
    {
        a = new RegExp('\\'+e,'g');
        s = s.replace(a,'\\'+e);
    }

    chars = new Array('\\','[','^','$','.','|','?','*','+','(',')');
    //for(e in chars) escape(chars[e]); // compatibility issue with prototype
    for(var e=0; e<chars.length; e++) escape(chars[e]);
    return s;
}

function tf_CreateElm(tag)
/*====================================================
    - creates an html element with its attributes
    - accepts the following params:
        - a string defining the html tag
        to create
        - an undetermined # of arrays containing the
        couple 'attribute name','value' ['id','myId']
=====================================================*/
{
    if(tag==undefined || tag==null || tag=='') return;
    var el = document.createElement(tag);
    if(arguments.length>1)
    {
        for(var i=0; i<arguments.length; i++)
        {
            var argtype = typeof arguments[i];
            switch(argtype.tf_LCase())
            {
                case 'object':
                    if(arguments[i].length==2)
                    {
                        el.setAttribute(arguments[i][0],arguments[i][1]);
                    }//if array length==2
                break;
            }//switch
        }//for i
    }//if args
    return el;
}

function tf_CreateText(node)
/*====================================================
    - this is just a document.createTextNode shortcut
=====================================================*/
{
    return document.createTextNode(node);
}

function tf_CreateOpt(text,value,isSel)
/*====================================================
    - creates an option element and returns it:
        - text: displayed text (string)
        - value: option value (string)
        - isSel: is selected option (boolean)
=====================================================*/
{
    var isSelected = isSel ? true : false;
    var opt = (isSelected)
        ? tf_CreateElm('option',['value',value],['selected','true'])
        : tf_CreateElm('option',['value',value]);
    opt.appendChild(tf_CreateText(text));
    return opt;
}

function tf_CreateCheckItem(chkIndex, chkValue, labelText)
/*====================================================
    - creates an checklist item and returns it
    - accepts the following params:
        - chkIndex: index of check item (number)
        - chkValue: check item value (string)
        - labelText: check item label text (string)
=====================================================*/
{
    if(chkIndex==undefined || chkValue==undefined || labelText==undefined )
        return;
    var li = tf_CreateElm('li');
    var label = tf_CreateElm('label',['for',chkIndex]);
    var check = tf_CreateElm( 'input',
                    ['id',chkIndex],
                    ['name',chkIndex],
                    ['type','checkbox'],
                    ['value',chkValue] );
    label.appendChild(check);
    label.appendChild(tf_CreateText(labelText));
    li.appendChild(label);
    li.label = label;
    li.check = check;
    return li;
}

function tf_AddEvent(obj,event_name,func_name,use_capture){
    if(obj.attachEvent)
        obj.attachEvent('on'+event_name, func_name);
    else if(obj.addEventListener)
        obj.addEventListener(event_name,func_name,(use_capture==undefined ? false : use_capture));
    else
        obj['on'+event_name] = func_name;
}

function tf_RemoveEvent(obj,event_name,func_name,use_capture){
    if(obj.detachEvent)
        obj.detachEvent('on'+event_name,func_name);
    else if(obj.removeEventListener)
        obj.removeEventListener(event_name,func_name,(use_capture==undefined ? false : use_capture));
    else
        obj['on'+event_name] = null;
}

function tf_StopEvent(e){
    if(!e) e = window.event;
    if(e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

function tf_CancelEvent(e){
    if(!e) e = window.event;
    if(e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}

function tf_ObjPosition(obj, tag){
    var l = 0, t = 0;
    if (obj && obj.offsetParent && tag.tf_Has(obj.nodeName.tf_LCase())) {
        do {
            l += obj.offsetLeft;
            t += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return [l,t];
}

function tf_NumSortAsc(a, b){ return (a-b); }

function tf_NumSortDesc(a, b){ return (b-a); }

function tf_IgnoreCaseSort(a, b){
    var x = a.tf_LCase();
    var y = b.tf_LCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

String.prototype.tf_MatchCase = function (mc){
    if(!mc) return this.tf_LCase();
    else return this.toString();
}

String.prototype.tf_Trim = function()
{//optimised by Anthony Maes
    return this.replace(/(^[\s\xA0]*)|([\s\xA0]*$)/g,'');
}

String.prototype.tf_LCase = function(){
    return this.toLowerCase();
}

String.prototype.tf_UCase = function(){
    return this.toUpperCase();
}

Array.prototype.tf_Has = function(s,mc){
    //return this.indexOf(s) >= 0;
    var sCase = (mc==undefined) ? false : mc;
    for (i=0; i<this.length; i++)
        if(this[i].toString().tf_MatchCase(sCase)==s) return true;
    return false;
}

Array.prototype.tf_IndexByValue = function(s,mc){
    var sCase = (mc==undefined) ? false : mc;
    for (i=0; i<this.length; i++)
        if(this[i].toString().tf_MatchCase(sCase)==s) return i;
    return (-1);
}

// Is this IE 6? the ultimate browser sniffer ;-)
//window['tf_isIE'] = (window.innerHeight) ? false : true;
window['tf_isIE'] = (window.innerHeight) ? false : /msie|MSIE 6/.test(navigator.userAgent) ? true : false;
window['tf_isIE7'] = (window.innerHeight) ? false : /msie|MSIE 7/.test(navigator.userAgent) ? true : false;

function tf_HasClass(elm,cl){
    if(!elm) return false;
    return elm.className.match(new RegExp('(\\s|^)'+cl+'(\\s|$)'));
}

function tf_AddClass(elm,cl){
    if(!elm) return;
    if(!tf_HasClass(elm,cl))
        elm.className += ' '+cl;
}

function tf_RemoveClass(elm,cl){
    if(!elm) return;
    if(!tf_HasClass(elm,cl)) return;
    var reg = new RegExp('(\\s|^)'+cl+'(\\s|$)');
    elm.className = elm.className.replace(reg,'');
}

function tf_IsValidDate(dateStr, format){
    if(format == null) { format = 'DMY'; }
    format = format.toUpperCase();
    if(format.length != 3) {
        if(format=='DDMMMYYYY'){
            var d = tf_FormatDate(dateStr, format);
            dateStr = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
            format = 'DMY';
        }
    }
    if((format.indexOf('M') == -1) || (format.indexOf('D') == -1) ||
        (format.indexOf('Y') == -1)) { format = 'DMY'; }
    if(format.substring(0, 1) == 'Y') { // If the year is first
          var reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
          var reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
    } else if(format.substring(1, 2) == 'Y') { // If the year is second
          var reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/;
          var reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/;
    } else { // The year must be third
          var reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/;
          var reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;
    }
    // If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
    if((reg1.test(dateStr) == false) && (reg2.test(dateStr) == false)) { return false; }
    var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was
    // Check to see if the 3 parts end up making a valid date
    if(format.substring(0, 1) == 'M') { var mm = parts[0]; } else
        if(format.substring(1, 2) == 'M') { var mm = parts[1]; } else { var mm = parts[2]; }
    if(format.substring(0, 1) == 'D') { var dd = parts[0]; } else
        if(format.substring(1, 2) == 'D') { var dd = parts[1]; } else { var dd = parts[2]; }
    if(format.substring(0, 1) == 'Y') { var yy = parts[0]; } else
        if(format.substring(1, 2) == 'Y') { var yy = parts[1]; } else { var yy = parts[2]; }
    if(parseFloat(yy) <= 50) { yy = (parseFloat(yy) + 2000).toString(); }
    if(parseFloat(yy) <= 99) { yy = (parseFloat(yy) + 1900).toString(); }
    var dt = new Date(parseFloat(yy), parseFloat(mm)-1, parseFloat(dd), 0, 0, 0, 0);
    if(parseFloat(dd) != dt.getDate()) { return false; }
    if(parseFloat(mm)-1 != dt.getMonth()) { return false; }
    return true;
}

function tf_FormatDate(dateStr, format){
    if(format === null){ format = 'DMY'; }
    if(!dateStr || dateStr === ''){ return new Date(1001, 0, 1); }
    var oDate, parts;

    function y2kDate(yr){
        if(yr == undefined) return 0;
        if(yr.length>2) return yr;
        var y;
        if(yr <= 99 && yr>50) //>50 belong to 1900
            y = '19' + yr;
        if(yr<50 || yr =='00') //<50 belong to 2000
            y = '20' + yr;
        return y;
    }

    function mmm2mm(mmm){
        if(mmm == undefined){ return 0; }
        var mondigit;
        var MONTH_NAMES = new Array(
            'january','february','march','april','may','june','july','august','september','october','november','december',
            'jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'
        );
        for (var m_i=0; m_i < MONTH_NAMES.length; m_i++){
                var month_name = MONTH_NAMES[m_i];
                if (mmm.toLowerCase() === month_name){
                    mondigit = m_i+1;
                    break;
                }
        }
        if ((mondigit > 11) || (mondigit < 23)){ mondigit = mondigit - 12; }
        if ((mondigit < 1) || (mondigit > 12)){ return 0; }
        return mondigit;
    }

    switch(format.toUpperCase()){
        case 'DDMMMYYYY':
            parts = dateStr.replace(/[- \/.]/g,' ').split(' ');
            oDate = new Date(y2kDate(parts[2]),mmm2mm(parts[1])-1,parts[0]);
        break;
        case 'DMY':
            parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/,'$1 $3 $5').split(' ');
            oDate = new Date(y2kDate(parts[2]),parts[1]-1,parts[0]);
        break;
        case 'MDY':
            parts = dateStr.replace(/^(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])([- \/.])((\d\d)?\d\d)$/,'$1 $3 $5').split(' ');
            oDate = new Date(y2kDate(parts[2]),parts[0]-1,parts[1]);
        break;
        case 'YMD':
            parts = dateStr.replace(/^((\d\d)?\d\d)([- \/.])(0?[1-9]|1[012])([- \/.])(0?[1-9]|[12][0-9]|3[01])$/,'$1 $4 $6').split(' ');
            oDate = new Date(y2kDate(parts[0]),parts[1]-1,parts[2]);
        break;
        default: //in case format is not correct
            parts = dateStr.replace(/^(0?[1-9]|[12][0-9]|3[01])([- \/.])(0?[1-9]|1[012])([- \/.])((\d\d)?\d\d)$/,'$1 $3 $5').split(' ');
            oDate = new Date(y2kDate(parts[2]),parts[1]-1,parts[0]);
        break;
    }
    return oDate;
}

function tf_RemoveNbFormat(data,format){
    if(data==null) return;
    if(format==null) format = 'us';
    var n = data;
    if(format.tf_LCase()=='us')
        n =+ n.replace(/[^\d\.-]/g,'');
    else
        n =+ n.replace(/[^\d\,-]/g,'').replace(',','.');
    return n;
}

function tf_IsImported(filePath,type){
    var isImported = false;
    var importType = (type==undefined) ? 'script' : type;
    var attr = importType == 'script' ? 'src' : 'href';
    var files = tf_Tag(document,importType);
    for (var i=0; i<files.length; i++)
    {
        if(files[i][attr] == undefined) continue;
        if(files[i][attr].match(filePath))
        {
            isImported = true;
            break;
        }
    }
    return isImported;
}

function tf_IsStylesheetImported(stylesheet){
    var isImported = false;
    if(!document.styleSheets) return isImported;
    var s = document.styleSheets;
    var regexp = new RegExp(stylesheet);
    for(var i=0; i<s.length; i++){
        if(s[i].imports){ //IE
            var imp = s[i].imports;
            for(var j=0; j<imp.length; j++){
                if(imp[j].href.tf_LCase() == stylesheet.tf_LCase()){
                    isImported = true; break;
                }
            }
        } else {
            var r =  (s[i].cssRules ? s[i].cssRules : s[i].rules);
            for(var j=0; j<r.length; j++){
                if(regexp.test(r[j].cssText)){
                    isImported = true; break;
                }
            }
        }
    }
    return isImported;
}

function tf_WriteCookie(name, value, hours){
    var expire = '';
    if(hours != null)
    {
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = '; expires=' + expire.toGMTString();
    }
    document.cookie = name + '=' + escape(value) + expire;
}

function tf_ReadCookie(name){
    var cookieValue = '';
    var search = name + '=';
    if(document.cookie.length > 0)
    {
        offset = document.cookie.indexOf(search);
        if(offset != -1)
        {
            offset += search.length;
            end = document.cookie.indexOf(';', offset);
            if(end == -1) end = document.cookie.length;
            cookieValue = unescape(document.cookie.substring(offset, end))
        }
    }
    return cookieValue;
}

function tf_CookieValueArray(name, separator){
    if(separator==undefined) separator = ',';
    var val = tf_ReadCookie(name); //reads the cookie
    var arr = val.split(separator); //creates an array with filters' values
    return arr;
}

function tf_CookieValueByIndex(name, index, separator){
    if(separator==undefined) separator = ',';
    var val = tf_CookieValueArray(name, separator); //reads the cookie
    return val[index];
}

function tf_RemoveCookie(name){
    tf_WriteCookie(name,'',-1);
}

function tf_HighlightWord( node,word,cssClass,o )
/*====================================================
    - highlights keyword found in passed node
    - accepts the following params:
        - node
        - word to search
        - css class name for highlighting
=====================================================*/
{
    // Iterate into this nodes childNodes
    if(node.hasChildNodes)
        for( var i=0; i<node.childNodes.length; i++ )
            tf_HighlightWord(node.childNodes[i],word,cssClass,o);

    // And do this node itself
    if(node.nodeType == 3)
    { // text node
        var tempNodeVal = node.nodeValue.tf_LCase();
        var tempWordVal = word.tf_LCase();
        if(tempNodeVal.indexOf(tempWordVal) != -1)
        {
            var pn = node.parentNode;
            if(pn && pn.className != cssClass)
            {
                // word has not already been highlighted!
                var nv = node.nodeValue;
                var ni = tempNodeVal.indexOf(tempWordVal);
                // Create a load of replacement nodes
                var before = tf_CreateText(nv.substr(0,ni));
                var docWordVal = nv.substr(ni,word.length);
                var after = tf_CreateText(nv.substr(ni+word.length));
                var hiwordtext = tf_CreateText(docWordVal);
                var hiword = tf_CreateElm('span');
                hiword.className = cssClass;
                hiword.appendChild(hiwordtext);
                pn.insertBefore(before,node);
                pn.insertBefore(hiword,node);
                pn.insertBefore(after,node);
                pn.removeChild(node);
                o.highlightedNodes.push(hiword.firstChild);
            }
        }
    }// if node.nodeType == 3
}

function tf_UnhighlightWord( o,word,cssClass )
/*====================================================
    - removes highlights found in passed node
    - accepts the following params:
        - node
        - word to search
        - css class name for highlighting
=====================================================*/
{
    var arrRemove = [];
    for(var i=0; i<o.highlightedNodes.length; i++){
        var n = o.highlightedNodes[i];
        if(!n){ continue; }
        var tempNodeVal = n.nodeValue.tf_LCase();
        var tempWordVal = word.tf_LCase();
        if(tempNodeVal.indexOf(tempWordVal) != -1){
            var pn = n.parentNode;
            if(pn && pn.className == cssClass){
                var prevSib = pn.previousSibling;
                var nextSib = pn.nextSibling;
                if(!prevSib || !nextSib){ continue; }
                nextSib.nodeValue = prevSib.nodeValue + n.nodeValue + nextSib.nodeValue;
                prevSib.nodeValue = '';
                n.nodeValue = '';
                arrRemove.push(i);
            }
        }
    }
    for(var k=0; k<arrRemove.length; k++){
        o.highlightedNodes.splice(arrRemove[k], 1);
    }
}

//Firefox does not support outerHTML property
function tf_SetOuterHtml(){
    if(document.body.__defineGetter__) {
        if(HTMLElement) {
            var element = HTMLElement.prototype;
            if(element.__defineGetter__) {
                element.__defineGetter__("outerHTML",
                    function(){
                        var parent = this.parentNode;
                        var el = tf_CreateElm(parent.tagName);
                        el.appendChild(this);
                        var shtml = el.innerHTML;
                        parent.appendChild(this);
                        return shtml;
                    }
                );
            }
        }
    }

    if(element.__defineSetter__) {
        HTMLElement.prototype.__defineSetter__("outerHTML", function(sHTML) {
           var r = this.ownerDocument.createRange();
           r.setStartBefore(this);
           var df = r.createContextualFragment(sHTML);
           this.parentNode.replaceChild(df, this);
           return sHTML;
        });
    }
}
/* --- */

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
function setFilterGrid(id){
    if(arguments.length === 0){ return; }
    window['tf_'+id] = new TF(arguments[0], arguments[1], arguments[2]);
    window['tf_'+id].AddGrid();
    return window['tf_'+id];
}

/*===BEGIN removable section===========================
    - Unobtrusive grid bar generation using
    'filterable' class
    - If you don't use it you can remove safely this
    section
/*=====================================================*/
window['tf_isNotIE'] = !(/msie|MSIE/.test(navigator.userAgent));
tf_AddEvent(window, (tf_isNotIE || (typeof window.addEventListener == 'function') ? 'DOMContentLoaded' : 'load'), initFilterGrid);

function initFilterGrid(){
    if(!document.getElementsByTagName){ return; }
    var tbls = tf_Tag(document,'table'), config;
    for (var i=0; i<tbls.length; i++){
        var cTbl = tbls[i], cTblId = cTbl.getAttribute('id');
        if(tf_HasClass(cTbl,'filterable') && cTblId){
            if(tf_IsObj(cTblId+'_config')){
                config = window[cTblId+'_config'];
            } else { config = undefined; }
            window[cTblId+'_isUnob'] = true;
            setFilterGrid(cTblId,config);
        }
    }// for i
}
/*===END removable section===========================*/

/*====================================================
    - Backward compatibility fns
=====================================================*/
function grabEBI(id){ return tf_Id(id); }
function grabTag(obj,tagname){ return tf_Tag(obj,tagname); }
function tf_GetCellText(n){ return tf_GetNodeText(n); }
function tf_isObject(varname){ return tf_IsObj(varname); }
function tf_isObj(v){ return tf_IsObj(v); }
function tf_isFn(fn){ return tf_IsFn(fn); }
function tf_isArray(obj){ return tf_IsArray(obj); }
function tf_addEvent(obj,event_name,func_name){ return tf_AddEvent(obj,event_name,func_name); }
function tf_removeEvent(obj,event_name,func_name){ return tf_RemoveEvent(obj,event_name,func_name); }
function tf_addClass(elm,cl){ tf_AddClass(elm,cl); }
function tf_removeClass(elm,cl){ return tf_RemoveClass(elm,cl); }
function tf_hasClass(elm,cl){ return tf_HasClass(elm,cl); }
function tf_isValidDate(dateStr,format){ return tf_IsValidDate(dateStr,format); }
function tf_formatDate(dateStr,format){ return tf_FormatDate(dateStr,format); }
function tf_removeNbFormat(data,format){ return tf_RemoveNbFormat(data,format); }
/* --- */