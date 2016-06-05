import {Feature} from '../../feature';
import {
    addClass, removeClass, createCheckItem, createElm, elm, removeElm,
    getText, tag
} from '../../dom';
import {isFn} from '../../types';
import {addEvt, targetEvt} from '../../event';

export default class ColsVisibility extends Feature {

    /**
     * Columns Visibility extension
     * @param {Object} tf TableFilter instance
     * @param {Object} f Extension's configuration
     */
    constructor(tf, f) {
        super(tf, f.name);

        // Configuration object
        let cfg = tf.config();

        this.initialized = false;
        this.name = f.name;
        this.desc = f.description || 'Columns visibility manager';

        //show/hide cols span element
        this.spanEl = null;
        //show/hide cols button element
        this.btnEl = null;
        //show/hide cols container div element
        this.contEl = null;

        //tick to hide or show column
        this.tickToHide = f.tick_to_hide === false ? false : true;
        //enables/disables cols manager generation
        this.manager = f.manager === false ? false : true;
        //only if external headers
        this.headersTbl = f.headers_table || false;
        //only if external headers
        this.headersIndex = f.headers_index || 1;
        //id of container element
        this.contElTgtId = f.container_target_id || null;
        //alternative headers text
        this.headersText = f.headers_text || null;
        //id of button container element
        this.btnTgtId = f.btn_target_id || null;
        //defines show/hide cols text
        this.btnText = f.btn_text || 'Columns&#9660;';
        //defines show/hide cols button innerHtml
        this.btnHtml = f.btn_html || null;
        //defines css class for show/hide cols button
        this.btnCssClass = f.btn_css_class || 'colVis';
        //defines close link text
        this.btnCloseText = f.btn_close_text || 'Close';
        //defines close button innerHtml
        this.btnCloseHtml = f.btn_close_html || null;
        //defines css class for close button
        this.btnCloseCssClass = f.btn_close_css_class || this.btnCssClass;
        this.stylesheet = f.stylesheet || 'colsVisibility.css';
        //span containing show/hide cols button
        this.prfx = 'colVis_';
        //defines css class span containing show/hide cols
        this.spanCssClass = f.span_css_class || 'colVisSpan';
        this.prfxCont = this.prfx + 'Cont_';
        //defines css class div containing show/hide cols
        this.contCssClass = f.cont_css_class || 'colVisCont';
        //defines css class for cols list (ul)
        this.listCssClass = cfg.list_css_class || 'cols_checklist';
        //defines css class for list item (li)
        this.listItemCssClass = cfg.checklist_item_css_class ||
            'cols_checklist_item';
        //defines css class for selected list item (li)
        this.listSlcItemCssClass = cfg.checklist_selected_item_css_class ||
            'cols_checklist_slc_item';
        //text preceding columns list
        this.text = f.text || (this.tickToHide ? 'Hide: ' : 'Show: ');
        this.atStart = f.at_start || null;
        this.enableHover = Boolean(f.enable_hover);
        //enables select all option
        this.enableTickAll = Boolean(f.enable_tick_all);
        //text preceding columns list
        this.tickAllText = f.tick_all_text || 'Select all:';

        //array containing hidden columns indexes
        this.hiddenCols = [];
        this.tblHasColTag = tag(tf.tbl, 'col').length > 0;

        //callback invoked just after cols manager is loaded
        this.onLoaded = isFn(f.on_loaded) ? f.on_loaded : null;
        //calls function before cols manager is opened
        this.onBeforeOpen = isFn(f.on_before_open) ? f.on_before_open : null;
        //calls function after cols manager is opened
        this.onAfterOpen = isFn(f.on_after_open) ? f.on_after_open : null;
        //calls function before cols manager is closed
        this.onBeforeClose = isFn(f.on_before_close) ? f.on_before_close : null;
        //calls function after cols manager is closed
        this.onAfterClose = isFn(f.on_after_close) ? f.on_after_close : null;

        //callback before col is hidden
        this.onBeforeColHidden = isFn(f.on_before_col_hidden) ?
            f.on_before_col_hidden : null;
        //callback after col is hidden
        this.onAfterColHidden = isFn(f.on_after_col_hidden) ?
            f.on_after_col_hidden : null;
        //callback before col is displayed
        this.onBeforeColDisplayed = isFn(f.on_before_col_displayed) ?
            f.on_before_col_displayed : null;
        //callback after col is displayed
        this.onAfterColDisplayed = isFn(f.on_after_col_displayed) ?
            f.on_after_col_displayed : null;

        //Grid layout compatibility
        if (tf.gridLayout) {
            this.headersTbl = tf.feature('gridLayout').headTbl; //headers table
            this.headersIndex = 0; //headers index
            this.onAfterColDisplayed = function () { };
            this.onAfterColHidden = function () { };
        }

        //Loads extension stylesheet
        tf.import(f.name + 'Style', tf.stylePath + this.stylesheet, null,
            'link');

        this.enable();
    }

    toggle() {
        let contDisplay = this.contEl.style.display;
        let onBeforeOpen = this.onBeforeOpen;
        let onBeforeClose = this.onBeforeClose;
        let onAfterOpen = this.onAfterOpen;
        let onAfterClose = this.onAfterClose;

        if (onBeforeOpen && contDisplay !== 'inline') {
            onBeforeOpen.call(null, this);
        }
        if (onBeforeClose && contDisplay === 'inline') {
            onBeforeClose.call(null, this);
        }

        this.contEl.style.display = contDisplay === 'inline' ?
            'none' : 'inline';

        if (onAfterOpen && contDisplay !== 'inline') {
            onAfterOpen.call(null, this);
        }
        if (onAfterClose && contDisplay === 'inline') {
            onAfterClose.call(null, this);
        }
    }

    checkItem(lbl) {
        let li = lbl.parentNode;
        if (!li || !lbl) {
            return;
        }
        let isChecked = lbl.firstChild.checked;
        let colIndex = lbl.firstChild.getAttribute('id').split('_')[1];
        colIndex = parseInt(colIndex, 10);
        if (isChecked) {
            addClass(li, this.listSlcItemCssClass);
        } else {
            removeClass(li, this.listSlcItemCssClass);
        }

        let hide = false;
        if ((this.tickToHide && isChecked) ||
            (!this.tickToHide && !isChecked)) {
            hide = true;
        }
        this.setHidden(colIndex, hide);
    }

    init() {
        if (this.initialized || !this.manager) {
            return;
        }

        this.emitter.on(['hide-column'],
            (tf, colIndex) => this.hideCol(colIndex));

        this.buildBtn();
        this.buildManager();

        this.initialized = true;
        this.emitter.emit('columns-visibility-initialized', this.tf, this);

        // Hide columns at start at very end of initialization
        this._hideAtStart();
    }

    /**
     * Build main button UI
     */
    buildBtn() {
        if (this.btnEl) {
            return;
        }
        let tf = this.tf;
        let span = createElm('span', ['id', this.prfx + tf.id]);
        span.className = this.spanCssClass;

        //Container element (rdiv or custom element)
        if (!this.btnTgtId) {
            tf.setToolbar();
        }
        let targetEl = !this.btnTgtId ? tf.rDiv : elm(this.btnTgtId);

        if (!this.btnTgtId) {
            let firstChild = targetEl.firstChild;
            firstChild.parentNode.insertBefore(span, firstChild);
        } else {
            targetEl.appendChild(span);
        }

        if (!this.btnHtml) {
            let btn = createElm('a', ['href', 'javascript:;']);
            btn.className = this.btnCssClass;
            btn.title = this.desc;

            btn.innerHTML = this.btnText;
            span.appendChild(btn);
            if (!this.enableHover) {
                addEvt(btn, 'click', (evt) => this.toggle(evt));
            } else {
                addEvt(btn, 'mouseover', (evt) => this.toggle(evt));
            }
        } else { //Custom html
            span.innerHTML = this.btnHtml;
            let colVisEl = span.firstChild;
            if (!this.enableHover) {
                addEvt(colVisEl, 'click', (evt) => this.toggle(evt));
            } else {
                addEvt(colVisEl, 'mouseover', (evt) => this.toggle(evt));
            }
        }

        this.spanEl = span;
        this.btnEl = this.spanEl.firstChild;

        if (this.onLoaded) {
            this.onLoaded.call(null, this);
        }
    }

    /**
     * Build columns manager UI
     */
    buildManager() {
        let tf = this.tf;

        let container = !this.contElTgtId ?
            createElm('div', ['id', this.prfxCont + tf.id]) :
            elm(this.contElTgtId);
        container.className = this.contCssClass;

        //Extension description
        let extNameLabel = createElm('p');
        extNameLabel.innerHTML = this.text;
        container.appendChild(extNameLabel);

        //Headers list
        let ul = createElm('ul', ['id', 'ul' + this.name + '_' + tf.id]);
        ul.className = this.listCssClass;

        let tbl = this.headersTbl ? this.headersTbl : tf.tbl;
        let headerIndex = this.headersTbl ?
            this.headersIndex : tf.getHeadersRowIndex();
        let headerRow = tbl.rows[headerIndex];

        //Tick all option
        if (this.enableTickAll) {
            let li = createCheckItem('col__' + tf.id, this.tickAllText,
                this.tickAllText);
            addClass(li, this.listItemCssClass);
            ul.appendChild(li);
            li.check.checked = !this.tickToHide;

            addEvt(li.check, 'click', () => {
                for (let h = 0; h < headerRow.cells.length; h++) {
                    let itm = elm('col_' + h + '_' + tf.id);
                    if (itm && li.check.checked !== itm.checked) {
                        itm.click();
                        itm.checked = li.check.checked;
                    }
                }
            });
        }

        for (let i = 0; i < headerRow.cells.length; i++) {
            let cell = headerRow.cells[i];
            let cellText = this.headersText && this.headersText[i] ?
                this.headersText[i] : this._getHeaderText(cell);
            let liElm = createCheckItem('col_' + i + '_' + tf.id, cellText,
                cellText);
            addClass(liElm, this.listItemCssClass);
            if (!this.tickToHide) {
                addClass(liElm, this.listSlcItemCssClass);
            }
            ul.appendChild(liElm);
            if (!this.tickToHide) {
                liElm.check.checked = true;
            }

            addEvt(liElm.check, 'click', (evt) => {
                let elm = targetEvt(evt);
                let lbl = elm.parentNode;
                this.checkItem(lbl);
            });
        }

        //separator
        let p = createElm('p', ['align', 'center']);
        let btn;
        //Close link
        if (!this.btnCloseHtml) {
            btn = createElm('a', ['href', 'javascript:;']);
            btn.className = this.btnCloseCssClass;
            btn.innerHTML = this.btnCloseText;
            addEvt(btn, 'click', (evt) => this.toggle(evt));
            p.appendChild(btn);
        } else {
            p.innerHTML = this.btnCloseHtml;
            btn = p.firstChild;
            addEvt(btn, 'click', (evt) => this.toggle(evt));
        }

        container.appendChild(ul);
        container.appendChild(p);

        this.btnEl.parentNode.insertBefore(container, this.btnEl);
        this.contEl = container;
    }

    /**
     * Hide or show specified columns
     * @param {Numner} colIndex Column index
     * @param {Boolean} hide    Hide column if true or show if false
     */
    setHidden(colIndex, hide) {
        let tf = this.tf;
        let tbl = tf.tbl;

        if (this.onBeforeColHidden && hide) {
            this.onBeforeColHidden.call(null, this, colIndex);
        }
        if (this.onBeforeColDisplayed && !hide) {
            this.onBeforeColDisplayed.call(null, this, colIndex);
        }

        this._hideCells(tbl, colIndex, hide);
        if (this.headersTbl) {
            this._hideCells(this.headersTbl, colIndex, hide);
        }

        let hiddenCols = this.hiddenCols;
        let itemIndex = hiddenCols.indexOf(colIndex);
        if (hide) {
            if (itemIndex === -1) {
                this.hiddenCols.push(colIndex);
            }
        } else {
            if (itemIndex !== -1) {
                this.hiddenCols.splice(itemIndex, 1);
            }
        }

        let gridLayout;
        let headTbl;
        let gridColElms;
        if (hide) {
            //This event is fired just after a column is displayed for
            //grid_layout support
            //TODO: grid layout module should be responsible for those
            //calculations
            if (tf.gridLayout) {
                gridLayout = tf.feature('gridLayout');
                headTbl = gridLayout.headTbl;
                gridColElms = gridLayout.colElms;
                let hiddenWidth = parseInt(
                    gridColElms[colIndex].style.width, 10);

                let headTblW = parseInt(headTbl.style.width, 10);
                headTbl.style.width = headTblW - hiddenWidth + 'px';
                tbl.style.width = headTbl.style.width;
            }
            if (this.onAfterColHidden) {
                this.onAfterColHidden.call(null, this, colIndex);
            }
            this.emitter.emit('column-hidden', tf, this, colIndex,
                this.hiddenCols);
        }

        if (!hide) {
            //This event is fired just after a column is displayed for
            //grid_layout support
            //TODO: grid layout module should be responsible for those
            //calculations
            if (tf.gridLayout) {
                gridLayout = tf.feature('gridLayout');
                headTbl = gridLayout.headTbl;
                gridColElms = gridLayout.colElms;
                let width = parseInt(gridColElms[colIndex].style.width, 10);
                headTbl.style.width =
                    (parseInt(headTbl.style.width, 10) + width) + 'px';
                tf.tbl.style.width = headTbl.style.width;
            }
            if (this.onAfterColDisplayed) {
                this.onAfterColDisplayed.call(null, this, colIndex);
            }
            this.emitter.emit('column-shown', tf, this, colIndex,
                this.hiddenCols);
        }
    }

    /**
     * Show specified column
     * @param  {Number} colIndex Column index
     */
    showCol(colIndex) {
        if (colIndex === undefined || !this.isColHidden(colIndex)) {
            return;
        }
        if (this.manager && this.contEl) {
            let itm = elm('col_' + colIndex + '_' + this.tf.id);
            if (itm) {
                itm.click();
            }
        } else {
            this.setHidden(colIndex, false);
        }
    }

    /**
     * Hide specified column
     * @param  {Number} colIndex Column index
     */
    hideCol(colIndex) {
        if (colIndex === undefined || this.isColHidden(colIndex)) {
            return;
        }
        if (this.manager && this.contEl) {
            let itm = elm('col_' + colIndex + '_' + this.tf.id);
            if (itm) {
                itm.click();
            }
        } else {
            this.setHidden(colIndex, true);
        }
    }

    /**
     * Determine if specified column is hidden
     * @param  {Number} colIndex Column index
     */
    isColHidden(colIndex) {
        if (this.hiddenCols.indexOf(colIndex) !== -1) {
            return true;
        }
        return false;
    }

    /**
     * Toggle visibility of specified column
     * @param  {Number} colIndex Column index
     */
    toggleCol(colIndex) {
        if (colIndex === undefined || this.isColHidden(colIndex)) {
            this.showCol(colIndex);
        } else {
            this.hideCol(colIndex);
        }
    }

    /**
     * Return the indexes of the columns currently hidden
     * @return {Array} column indexes
     */
    getHiddenCols() {
        return this.hiddenCols;
    }

    /**
     * Remove the columns manager
     */
    destroy() {
        if (!this.initialized) {
            return;
        }
        if (elm(this.contElTgtId)) {
            elm(this.contElTgtId).innerHTML = '';
        } else {
            this.contEl.innerHTML = '';
            removeElm(this.contEl);
            this.contEl = null;
        }
        this.btnEl.innerHTML = '';
        removeElm(this.btnEl);
        this.btnEl = null;

        this.emitter.off(['hide-column'],
            (tf, colIndex) => this.hideCol(colIndex));

        this.initialized = false;
    }

    _getHeaderText(cell) {
        if (!cell.hasChildNodes) {
            return '';
        }

        for (let i = 0; i < cell.childNodes.length; i++) {
            let n = cell.childNodes[i];
            if (n.nodeType === 3) {
                return n.nodeValue;
            } else if (n.nodeType === 1) {
                if (n.id && n.id.indexOf('popUp') !== -1) {
                    continue;
                } else {
                    return getText(n);
                }
            }
            continue;
        }
        return '';
    }

    _hideCells(tbl, colIndex, hide) {
        for (let i = 0; i < tbl.rows.length; i++) {
            let row = tbl.rows[i];
            let cell = row.cells[colIndex];
            if (cell) {
                cell.style.display = hide ? 'none' : '';
            }
        }
    }

    _hideAtStart() {
        if (!this.atStart) {
            return;
        }
        this.atStart.forEach((colIdx) => {
            this.hideCol(colIdx);
        });
    }
}
