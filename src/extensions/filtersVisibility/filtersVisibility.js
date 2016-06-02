import {Feature} from '../../feature';
import {createElm, removeElm, elm} from '../../dom';
import {isFn, isUndef} from '../../types';
import {addEvt} from '../../event';

export default class FiltersVisibility extends Feature {

    /**
     * Filters Row Visibility extension
     * @param {Object} tf TableFilter instance
     * @param {Object} f Config
     */
    constructor(tf, f) {
        super(tf, f.name);

        this.name = f.name;
        this.desc = f.description || 'Filters row visibility manager';

        // Path and image filenames
        this.stylesheet = f.stylesheet || 'filtersVisibility.css';
        this.icnExpand = f.expand_icon_name || 'icn_exp.png';
        this.icnCollapse = f.collapse_icon_name || 'icn_clp.png';

        //expand/collapse filters span element
        this.contEl = null;
        //expand/collapse filters btn element
        this.btnEl = null;

        this.icnExpandHtml = '<img src="' + tf.themesPath + this.icnExpand +
            '" alt="Expand filters" >';
        this.icnCollapseHtml = '<img src="' + tf.themesPath + this.icnCollapse +
            '" alt="Collapse filters" >';
        this.defaultText = 'Toggle filters';

        //id of container element
        this.targetId = f.target_id || null;
        //enables/disables expand/collapse icon
        this.enableIcon = f.enable_icon === false ? false : true;
        this.btnText = f.btn_text || '';

        //defines expand/collapse filters text
        this.collapseBtnHtml = this.enableIcon ?
            this.icnCollapseHtml + this.btnText :
            this.btnText || this.defaultText;
        this.expandBtnHtml = this.enableIcon ?
            this.icnExpandHtml + this.btnText :
            this.btnText || this.defaultText;

        //defines expand/collapse filters button innerHtml
        this.btnHtml = f.btn_html || null;
        //defines css class for expand/collapse filters button
        this.btnCssClass = f.btn_css_class || 'btnExpClpFlt';
        //defines css class span containing expand/collapse filters
        this.contCssClass = f.cont_css_class || 'expClpFlt';
        this.filtersRowIndex = !isUndef(f.filters_row_index) ?
            f.filters_row_index : tf.getFiltersRowIndex();

        this.visibleAtStart = !isUndef(f.visible_at_start) ?
            Boolean(f.visible_at_start) : true;

        // Prefix
        this.prfx = 'fltsVis_';

        //callback before filters row is shown
        this.onBeforeShow = isFn(f.on_before_show) ? f.on_before_show : null;
        //callback after filters row is shown
        this.onAfterShow = isFn(f.on_after_show) ? f.on_after_show : null;
        //callback before filters row is hidden
        this.onBeforeHide = isFn(f.on_before_hide) ? f.on_before_hide : null;
        //callback after filters row is hidden
        this.onAfterHide = isFn(f.on_after_hide) ? f.on_after_hide : null;

        //Loads extension stylesheet
        tf.import(f.name + 'Style', tf.stylePath + this.stylesheet, null,
            'link');

        this.enable();
    }

    /**
     * Initialise extension
     */
    init() {
        if (this.initialized) {
            return;
        }

        this.buildUI();
        this.initialized = true;
        this.emitter.on(['show-filters'], (tf, visible) => this.show(visible));
        this.emitter.emit('filters-visibility-initialized', this.tf, this);
    }

    /**
     * Build UI elements
     */
    buildUI() {
        let tf = this.tf;
        let span = createElm('span', ['id', this.prfx + tf.id]);
        span.className = this.contCssClass;

        //Container element (rdiv or custom element)
        if (!this.targetId) {
            tf.setToolbar();
        }
        let targetEl = !this.targetId ? tf.rDiv : elm(this.targetId);

        if (!this.targetId) {
            let firstChild = targetEl.firstChild;
            firstChild.parentNode.insertBefore(span, firstChild);
        } else {
            targetEl.appendChild(span);
        }

        let btn;
        if (!this.btnHtml) {
            btn = createElm('a', ['href', 'javascript:void(0);']);
            btn.className = this.btnCssClass;
            btn.title = this.btnText || this.defaultText;
            btn.innerHTML = this.collapseBtnHtml;
            span.appendChild(btn);
        } else { //Custom html
            span.innerHTML = this.btnHtml;
            btn = span.firstChild;
        }

        addEvt(btn, 'click', () => this.toggle());

        this.contEl = span;
        this.btnEl = btn;

        if (!this.visibleAtStart) {
            this.toggle();
        }
    }

    /**
     * Toggle filters visibility
     */
    toggle() {
        let tf = this.tf;
        let tbl = tf.gridLayout ? tf.feature('gridLayout').headTbl : tf.tbl;
        let fltRow = tbl.rows[this.filtersRowIndex];
        let isDisplayed = fltRow.style.display === '';

        this.show(!isDisplayed);
    }

    /**
     * Show or hide filters
     *
     * @param {boolean} [visible=true] Visibility flag
     */
    show(visible = true) {
        let tf = this.tf;
        let tbl = tf.gridLayout ? tf.feature('gridLayout').headTbl : tf.tbl;
        let fltRow = tbl.rows[this.filtersRowIndex];

        if (this.onBeforeShow && visible) {
            this.onBeforeShow.call(this, this);
        }
        if (this.onBeforeHide && !visible) {
            this.onBeforeHide.call(null, this);
        }

        fltRow.style.display = visible ? '' : 'none';
        if (this.enableIcon && !this.btnHtml) {
            this.btnEl.innerHTML = visible ?
                this.collapseBtnHtml : this.expandBtnHtml;
        }

        if (this.onAfterShow && visible) {
            this.onAfterShow.call(null, this);
        }
        if (this.onAfterHide && !visible) {
            this.onAfterHide.call(null, this);
        }

        this.emitter.emit('filters-toggled', tf, this, visible);
    }

    /**
     * Destroy the UI
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        this.emitter.off(['show-filters'], (tf, visible) => this.show(visible));

        this.btnEl.innerHTML = '';
        removeElm(this.btnEl);
        this.btnEl = null;

        this.contEl.innerHTML = '';
        removeElm(this.contEl);
        this.contEl = null;
        this.initialized = false;
    }

}
