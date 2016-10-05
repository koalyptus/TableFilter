import {Feature} from '../feature';
import {isFn} from '../types';
import {createElm, removeElm} from '../dom';
import {addEvt, cancelEvt, stopEvt, targetEvt} from '../event';
import {INPUT, NONE} from '../const';

/**
 * Pop-up filter component
 * @export
 * @class PopupFilter
 * @extends {Feature}
 */
export class PopupFilter extends Feature {

    /**
     * Creates an instance of PopupFilter
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'popupFilters');

        // Configuration object
        let f = this.config;

        // Enable external filters
        tf.isExternalFlt = true;
        tf.externalFltTgtIds = [];

        /**
         * Filter icon path
         * @type {String}
         */
        this.iconPath = f.popup_filters_image ||
            tf.themesPath + 'icn_filter.gif';

        /**
         * Active filter icon path
         * @type {string}
         */
        this.activeIconPath = f.popup_filters_image_active ||
            tf.themesPath + 'icn_filterActive.gif';

        /**
         * HTML for the filter icon
         * @type {string}
         */
        this.iconHtml = f.popup_filters_image_html ||
            '<img src="' + this.iconPath + '" alt="Column filter" />';

        /**
         * Css class assigned to filter container element
         * @type {String}
         */
        this.containerCssClass = f.popup_div_css_class || 'popUpFilter';

        /**
         * Callback fired before a popup filter is opened
         * @type {Function}
         */
        this.onBeforeOpen = isFn(f.on_before_popup_filter_open) ?
            f.on_before_popup_filter_open : null;

        /**
         * Callback fired after a popup filter is opened
         * @type {Function}
         */
        this.onAfterOpen = isFn(f.on_after_popup_filter_open) ?
            f.on_after_popup_filter_open : null;

        /**
         * Callback fired before a popup filter is closed
         * @type {Function}
         */
        this.onBeforeClose = isFn(f.on_before_popup_filter_close) ?
            f.on_before_popup_filter_close : null;

        /**
         * Callback fired after a popup filter is closed
         * @type {Function}
         */
        this.onAfterClose = isFn(f.on_after_popup_filter_close) ?
            f.on_after_popup_filter_close : null;

        /**
         * Collection of filters spans
         * @type {Array}
         * @private
         */
        this.fltSpans = [];

        /**
         * Collection of filters icons
         * @type {Array}
         * @private
         */
        this.fltIcons = [];

        /**
         * Collection of filters icons cached after pop-up filters are removed
         * @type {Array}
         * @private
         */
        this.filtersCache = null;

        /**
         * Collection of filters containers
         * @type {Array}
         * @private
         */
        this.fltElms = this.filtersCache || [];

        /**
         * Ensure filter's container element width matches column width
         * @type {Boolean}
         */
        this.adjustToContainer = true;

        /**
         * Prefix for pop-up filter span ID
         * @type {String}
         * @private
         */
        this.prfxSpan = 'popUpSpan_';

        /**
         * Prefix for pop-up filter container ID
         * @type {String}
         * @private
         */
        this.prfxDiv = 'popUpDiv_';
    }

    /**
     * Click event handler for pop-up filter icon
     * @private
     */
    onClick(evt) {
        let elm = targetEvt(evt).parentNode,
            colIndex = parseInt(elm.getAttribute('ci'), 10);

        this.closeAll(colIndex);
        this.toggle(colIndex);

        if (this.adjustToContainer) {
            let popUpDiv = this.fltElms[colIndex],
                header = this.tf.getHeaderElement(colIndex),
                headerWidth = header.clientWidth * 0.95;
            popUpDiv.style.width = parseInt(headerWidth, 10) + 'px';
        }
        cancelEvt(evt);
        stopEvt(evt);
    }

    /**
     * Initialize DOM elements
     */
    init() {
        if (this.initialized) {
            return;
        }

        let tf = this.tf;

        // Override headers row index if no grouped headers
        // TODO: Because of the filters row generation, headers row index needs
        // adjusting: prevent useless row generation
        if (tf.headersRow <= 1 && isNaN(tf.config().headers_row_index)) {
            tf.headersRow = 0;
        }

        // Adjust headers row index for grid-layout mode
        // TODO: Because of the filters row generation, headers row index needs
        // adjusting: prevent useless row generation
        if (tf.gridLayout) {
            tf.headersRow--;
            this.buildIcons();
        }

        // subscribe to events
        this.emitter.on(['before-filtering'], () => this.setIconsState());
        this.emitter.on(['after-filtering'], () => this.closeAll());
        this.emitter.on(['cell-processed'],
            (tf, cellIndex) => this.changeState(cellIndex, true));
        this.emitter.on(['filters-row-inserted'], () => this.buildIcons());
        this.emitter.on(['before-filter-init'],
            (tf, colIndex) => this.build(colIndex));

        /**
         * @inherited
         */
        this.initialized = true;
    }

    /**
     * Reset previously destroyed feature
     */
    reset() {
        this.enable();
        this.init();
        this.buildAll();
    }

    /**
     * Build all filters icons
     */
    buildIcons() {
        let tf = this.tf;

        // TODO: Because of the filters row generation, headers row index needs
        // adjusting: prevent useless row generation
        tf.headersRow++;

        for (let i = 0; i < tf.nbCells; i++) {
            if (tf.getFilterType(i) === NONE) {
                continue;
            }
            let popUpSpan = createElm(
                'span',
                ['id', this.prfxSpan + tf.id + '_' + i],
                ['ci', i]
            );
            popUpSpan.innerHTML = this.iconHtml;
            let header = tf.getHeaderElement(i);
            header.appendChild(popUpSpan);
            addEvt(popUpSpan, 'click', (evt) => this.onClick(evt));
            this.fltSpans[i] = popUpSpan;
            this.fltIcons[i] = popUpSpan.firstChild;
        }
    }

    /**
     * Build all pop-up filters elements
     */
    buildAll() {
        for (let i = 0; i < this.filtersCache.length; i++) {
            this.build(i, this.filtersCache[i]);
        }
    }

    /**
     * Build a specified pop-up filter elements
     * @param  {Number} colIndex Column index
     * @param  {Object} div      Optional container DOM element
     */
    build(colIndex, div) {
        let tf = this.tf;
        let popUpDiv = !div ?
            createElm('div',
                ['id', this.prfxDiv + tf.id + '_' + colIndex]) :
            div;
        popUpDiv.className = this.containerCssClass;
        tf.externalFltTgtIds.push(popUpDiv.id);
        let header = tf.getHeaderElement(colIndex);
        header.insertBefore(popUpDiv, header.firstChild);
        addEvt(popUpDiv, 'click', (evt) => stopEvt(evt));
        this.fltElms[colIndex] = popUpDiv;
    }

    /**
     * Toogle visibility of specified filter
     * @param  {Number} colIndex Column index
     */
    toggle(colIndex) {
        let tf = this.tf,
            popUpFltElm = this.fltElms[colIndex];

        if (popUpFltElm.style.display === NONE ||
            popUpFltElm.style.display === '') {
            if (this.onBeforeOpen) {
                this.onBeforeOpen.call(
                    null, this, this.fltElms[colIndex], colIndex);
            }
            popUpFltElm.style.display = 'block';
            if (tf.getFilterType(colIndex) === INPUT) {
                let flt = tf.getFilterElement(colIndex);
                if (flt) {
                    flt.focus();
                }
            }
            if (this.onAfterOpen) {
                this.onAfterOpen.call(
                    null, this, this.fltElms[colIndex], colIndex);
            }
        } else {
            if (this.onBeforeClose) {
                this.onBeforeClose.call(
                    null, this, this.fltElms[colIndex], colIndex);
            }
            popUpFltElm.style.display = NONE;
            if (this.onAfterClose) {
                this.onAfterClose.call(
                    null, this, this.fltElms[colIndex], colIndex);
            }
        }
    }

    /**
     * Close all filters excepted for the specified one if any
     * @param  {Number} exceptIdx Column index of the filter to not close
     */
    closeAll(exceptIdx) {
        for (let i = 0; i < this.fltElms.length; i++) {
            if (i === exceptIdx) {
                continue;
            }
            let popUpFltElm = this.fltElms[i];
            if (popUpFltElm) {
                popUpFltElm.style.display = NONE;
            }
        }
    }

    /**
     * Build all the icons representing the pop-up filters
     */
    setIconsState() {
        for (let i = 0; i < this.fltIcons.length; i++) {
            this.changeState(i, false);
        }
    }

    /**
     * Apply specified icon state
     * @param  {Number} colIndex Column index
     * @param  {Boolean} active   Apply active state
     */
    changeState(colIndex, active) {
        if (this.fltIcons[colIndex]) {
            this.fltIcons[colIndex].src = active ?
                this.activeIconPath : this.iconPath;
        }
    }

    /**
     * Remove pop-up filters
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        this.filtersCache = [];
        for (let i = 0; i < this.fltElms.length; i++) {
            let popUpFltElm = this.fltElms[i],
                popUpFltSpan = this.fltSpans[i],
                popUpFltImg = this.fltIcons[i];
            if (popUpFltElm) {
                removeElm(popUpFltElm);
                this.filtersCache[i] = popUpFltElm;
            }
            popUpFltElm = null;
            if (popUpFltSpan) {
                removeElm(popUpFltSpan);
            }
            popUpFltSpan = null;
            if (popUpFltImg) {
                removeElm(popUpFltImg);
            }
            popUpFltImg = null;
        }
        this.fltElms = [];
        this.fltSpans = [];
        this.fltIcons = [];

        // unsubscribe to events
        this.emitter.off(['before-filtering'], () => this.setIconsState());
        this.emitter.off(['after-filtering'], () => this.closeAll());
        this.emitter.off(['cell-processed'],
            (tf, cellIndex) => this.changeState(cellIndex, true));
        this.emitter.off(['filters-row-inserted'], () => this.buildIcons());
        this.emitter.off(['before-filter-init'],
            (tf, colIndex) => this.build(colIndex));

        this.initialized = false;
    }

}
