import {Feature} from '../feature';
import {createElm, removeElm, elm, tag} from '../dom';
import {isNull} from '../types';
import {addEvt, targetEvt} from '../event';
import {contains} from '../string';
import {NONE} from '../const';

/**
 * Grid layout, table with fixed headers
 */
export class GridLayout extends Feature {

    /**
     * Creates an instance of GridLayout
     * @param {Object} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'gridLayout');

        let f = this.config;

        /**
         * Grid-layout container width as CSS string
         * @type {String}
         */
        this.width = f.grid_width || null;

        /**
         * Grid-layout container height as CSS string
         * @type {String}
         */
        this.height = f.grid_height || null;

        /**
         * Css class for main container element
         * @type {String}
         */
        this.mainContCssClass = f.grid_cont_css_class || 'grd_Cont';

        /**
         * Css class for body table container element
         * @type {String}
         */
        this.contCssClass = f.grid_tbl_cont_css_class || 'grd_tblCont';

        /**
         * Css class for headers table container element
         * @type {String}
         */
        this.headContCssClass = f.grid_tblHead_cont_css_class ||
            'grd_headTblCont';

        /**
         * Css class for toolbar container element (rows counter, paging etc.)
         * @type {String}
         */
        this.infDivCssClass = f.grid_inf_grid_css_class || 'grd_inf';

        /**
         * Index of the headers row, default: 0
         * @type {Number}
         */
        this.headRowIndex = f.grid_headers_row_index || 0;

        /**
         * Collection of the header row indexes to be moved into headers table
         * @type {Array}
         */
        this.headRows = f.grid_headers_rows || [0];

        /**
         * Enable or disable column filters generation, default: true
         * @type {Boolean}
         */
        this.enableFilters = f.grid_enable_default_filters === false ?
            false : true;

        /**
         * Enable or disable column headers, default: false
         * @type {Boolean}
         */
        this.noHeaders = Boolean(f.grid_no_headers);

        /**
         * Grid-layout default column widht as CSS string
         * @type {String}
         */
        this.defaultColWidth = f.grid_default_col_width || '100px';

        /**
         * List of column elements
         * @type {Array}
         * @private
         */
        this.colElms = [];

        /**
         * Prefix for grid-layout main container ID
         * @type {String}
         * @private
         */
        this.prfxMainTblCont = 'gridCont_';

        /**
         * Prefix for grid-layout body table container ID
         * @type {String}
         * @private
         */
        this.prfxTblCont = 'tblCont_';

        /**
         * Prefix for grid-layout headers table container ID
         * @type {String}
         * @private
         */
        this.prfxHeadTblCont = 'tblHeadCont_';

        /**
         * Prefix for grid-layout headers table ID
         * @type {String}
         * @private
         */
        this.prfxHeadTbl = 'tblHead_';

        /**
         * Prefix for grid-layout filter's cell ID
         * @type {String}
         * @private
         */
        this.prfxGridFltTd = '_td_';

        /**
         * Prefix for grid-layout header's cell ID
         * @type {String}
         * @private
         */
        this.prfxGridTh = 'tblHeadTh_';

        /**
         * Mark-up of original HTML table
         * @type {String}
         * @private
         */
        this.sourceTblHtml = tf.tbl.outerHTML;

        // filters flag at TF level
        tf.fltGrid = this.enableFilters;
    }

    /**
     * Generates a grid with fixed headers
     *
     * TODO: reduce size of init by extracting single purposed methods
     */
    init() {
        let tf = this.tf;
        let f = this.config;
        let tbl = tf.tbl;

        if (this.initialized) {
            return;
        }

        // Override reference rows indexes
        tf.refRow = isNull(tf.startRow) ? 0 : tf.startRow;
        tf.headersRow = 0;
        tf.filtersRowIndex = 1;

        tf.isExternalFlt = true;

        // Assign default column widths
        this.setDefaultColWidths();

        // Initial table width
        let tblW = this.initialTableWidth();
        // if (tbl.width !== '') {
        //     tblW = tbl.width;
        // }
        // else if (tbl.style.width !== '') {
        //     tblW = parseInt(tbl.style.width, 10);
        // } else {
        //     tblW = tbl.clientWidth;
        // }

        //Main container: it will contain all the elements
        this.tblMainCont = createElm('div',
            ['id', this.prfxMainTblCont + tf.id]);
        this.tblMainCont.className = this.mainContCssClass;
        if (this.width) {
            this.tblMainCont.style.width = this.width;
        }
        tbl.parentNode.insertBefore(this.tblMainCont, tbl);

        //Table container: div wrapping content table
        this.tblCont = createElm('div', ['id', this.prfxTblCont + tf.id]);
        this.tblCont.className = this.contCssClass;
        if (this.width) {
            if (this.width.indexOf('%') !== -1) {
                this.tblCont.style.width = '100%';
            } else {
                this.tblCont.style.width = this.width;
            }
        }
        if (this.height) {
            this.tblCont.style.height = this.height;
        }
        tbl.parentNode.insertBefore(this.tblCont, tbl);
        let t = removeElm(tbl);
        this.tblCont.appendChild(t);

        //In case table width is expressed in %
        if (tbl.style.width === '') {
            tbl.style.width = (contains('%', tblW) ?
                tbl.clientWidth : tblW) + 'px';
        }

        let d = removeElm(this.tblCont);
        this.tblMainCont.appendChild(d);

        //Headers table container: div wrapping headers table
        this.headTblCont = createElm(
            'div', ['id', this.prfxHeadTblCont + tf.id]);
        this.headTblCont.className = this.headContCssClass;
        if (this.width) {
            if (this.width.indexOf('%') !== -1) {
                this.headTblCont.style.width = '100%';
            } else {
                this.headTblCont.style.width = this.width;
            }
        }

        //Headers table
        this.headTbl = createElm('table', ['id', this.prfxHeadTbl + tf.id]);
        let tH = createElm('tHead');

        //1st row should be headers row, ids are added if not set
        //Those ids are used by the sort feature
        let hRow = tbl.rows[this.headRowIndex];
        let sortTriggers = [];
        for (let n = 0; n < tf.nbCells; n++) {
            let c = hRow.cells[n];
            let thId = c.getAttribute('id');
            if (!thId || thId === '') {
                thId = this.prfxGridTh + n + '_' + tf.id;
                c.setAttribute('id', thId);
            }
            sortTriggers.push(thId);
        }

        //Filters row is created
        let filtersRow = createElm('tr');
        if (this.enableFilters && tf.fltGrid) {
            tf.externalFltTgtIds = [];
            for (let j = 0; j < tf.nbCells; j++) {
                let fltTdId = tf.prfxFlt + j + this.prfxGridFltTd + tf.id;
                let cl = createElm(tf.fltCellTag, ['id', fltTdId]);
                filtersRow.appendChild(cl);
                tf.externalFltTgtIds[j] = fltTdId;
            }
        }

        //Headers row are moved from content table to headers table
        if (!this.noHeaders) {
            for (let i = 0; i < this.headRows.length; i++) {
                let headRow = tbl.rows[this.headRows[i]];
                tH.appendChild(headRow);
            }
        } else {
            // Handle table with no headers, assuming here headers do not
            // exist
            tH.appendChild(createElm('tr'));
        }

        this.headTbl.appendChild(tH);
        if (tf.filtersRowIndex === 0) {
            tH.insertBefore(filtersRow, hRow);
        } else {
            tH.appendChild(filtersRow);
        }

        this.headTblCont.appendChild(this.headTbl);
        this.tblCont.parentNode.insertBefore(this.headTblCont, this.tblCont);

        //THead needs to be removed in content table for sort feature
        let thead = tag(tbl, 'thead');
        if (thead.length > 0) {
            tbl.removeChild(thead[0]);
        }

        //Headers table style
        this.headTbl.style.tableLayout = 'fixed';
        tbl.style.tableLayout = 'fixed';
        this.headTbl.cellPadding = tbl.cellPadding;
        this.headTbl.cellSpacing = tbl.cellSpacing;
        // this.headTbl.style.width = tbl.style.width;

        //content table without headers needs col widths to be reset
        tf.setColWidths(this.headTbl);

        //Headers container width
        // this.headTblCont.style.width = this.tblCont.clientWidth+'px';

        tbl.style.width = '';
        //
        this.headTbl.style.width = tbl.clientWidth + 'px';
        //

        //scroll synchronisation
        addEvt(this.tblCont, 'scroll', (evt) => {
            let elm = targetEvt(evt);
            let scrollLeft = elm.scrollLeft;
            this.headTblCont.scrollLeft = scrollLeft;
            //New pointerX calc taking into account scrollLeft
            // if(!o.isPointerXOverwritten){
            //     try{
            //         o.Evt.pointerX = function(evt){
            //             let e = evt || global.event;
            //             let bdScrollLeft = tf_StandardBody().scrollLeft +
            //                 scrollLeft;
            //             return (e.pageX + scrollLeft) ||
            //                 (e.clientX + bdScrollLeft);
            //         };
            //         o.isPointerXOverwritten = true;
            //     } catch(err) {
            //         o.isPointerXOverwritten = false;
            //     }
            // }
        });

        //Configure sort extension if any
        let sort = (f.extensions || []).filter(function (itm) {
            return itm.name === 'sort';
        });
        if (sort.length === 1) {
            sort[0].async_sort = true;
            sort[0].trigger_ids = sortTriggers;
        }

        //Cols generation for all browsers excepted IE<=7
        this.tblHasColTag = tag(tbl, 'col').length > 0 ? true : false;

        //Col elements are enough to keep column widths after sorting and
        //filtering
        let createColTags = function () {
            for (let k = (tf.nbCells - 1); k >= 0; k--) {
                let col = createElm('col', ['id', tf.id + '_col_' + k]);
                tbl.insertBefore(col, tbl.firstChild);
                col.style.width = tf.colWidths[k];
                this.colElms[k] = col;
            }
            this.tblHasColTag = true;
        };

        if (!this.tblHasColTag) {
            createColTags.call(this);
        } else {
            let cols = tag(tbl, 'col');
            for (let ii = 0; ii < tf.nbCells; ii++) {
                cols[ii].setAttribute('id', tf.id + '_col_' + ii);
                cols[ii].style.width = tf.colWidths[ii];
                this.colElms.push(cols[ii]);
            }
        }

        if (tf.popupFilters) {
            filtersRow.style.display = NONE;
        }

        if (tbl.clientWidth !== this.headTbl.clientWidth) {
            tbl.style.width = this.headTbl.clientWidth + 'px';
        }

        this.initialized = true;
    }

    /**
     * Set grid-layout default column widths if column widths are not defined
     * @private
     */
    setDefaultColWidths() {
        let tf = this.tf;
        if (tf.hasColWidths) {
            return;
        }
        for (let k = 0, len = tf.getCellsNb(); k < len; k++) {
            let colW;
            let cell = tf.tbl.rows[tf.getHeadersRowIndex()].cells[k];
            if (cell.width !== '') {
                colW = cell.width;
            } else if (cell.style.width !== '') {
                colW = parseInt(cell.style.width, 10);
            } else {
                colW = this.defaultColWidth;
            }
            tf.colWidths[k] = colW;
        }
        tf.hasColWidths = true;
        tf.setColWidths();
    }

    /**
     * Initial table width
     * @returns {Number}
     * @private
     */
    initialTableWidth() {
        let tbl = this.tf.tbl;
        let width; //initial table width

        if (tbl.width !== '') {
            width = tbl.width;
        }
        else if (tbl.style.width !== '') {
            width = tbl.style.width;
        } else {
            width = tbl.clientWidth;
        }
        return parseInt(width, 10);
    }

    /**
     * Removes the grid layout
     */
    destroy() {
        let tf = this.tf;
        let tbl = tf.tbl;

        if (!this.initialized) {
            return;
        }
        let t = removeElm(tbl);
        this.tblMainCont.parentNode.insertBefore(t, this.tblMainCont);
        removeElm(this.tblMainCont);

        this.tblMainCont = null;
        this.headTblCont = null;
        this.headTbl = null;
        this.tblCont = null;

        tbl.outerHTML = this.sourceTblHtml;
        //needed to keep reference of table element for future usage
        this.tf.tbl = elm(tf.id);

        this.initialized = false;
    }
}
