import {Feature} from '../feature';
import {isUndef, EMPTY_FN} from '../types';
import {createElm, removeElm} from '../dom';
import {addEvt, cancelEvt, stopEvt, targetEvt, removeEvt} from '../event';
import {INPUT, NONE, CHECKLIST, MULTIPLE} from '../const';
import {root} from '../root';
import {defaultsStr, defaultsBool, defaultsArr, defaultsFn} from '../settings';
import {sanitizeHtml} from '../sanitize';

// Focusable trigger controls; non-focusable `image_html` markup is wrapped
// in a button. Matches FOCUSABLE in components/tf-popup-filter.js.
const FOCUSABLE_TRIGGER = 'button:not([disabled]), a[href], ' +
    'input:not([disabled]), select:not([disabled]), ' +
    'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const FILTER_TRIGGER_TEXT = 'Filter';

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
        super(tf, PopupFilter);

        // Configuration object
        let f = this.config.popup_filters || {};

        /**
         * Close active popup filter upon filtering, enabled by default
         * @type {Boolean}
         */
        this.closeOnFiltering = defaultsBool(f.close_on_filtering, true);

        /**
         * Filter icon path
         * @type {String}
         */
        this.iconPath = defaultsStr(f.image, tf.themesPath + 'icn_filter.gif');

        /**
         * Active filter icon path
         * @type {string}
         */
        this.activeIconPath = defaultsStr(f.image_active,
            tf.themesPath + 'icn_filterActive.gif');

        /**
         * HTML for the filter icon
         * @type {string}
         */
        this.iconHtml = defaultsStr(f.image_html,
            '<img src="' + this.iconPath + '" alt="Column filter" />');

        /**
         * Css class assigned to the popup container element
         * @type {String}
         */
        this.placeholderCssClass = defaultsStr(f.placeholder_css_class,
            'popUpPlaceholder');

        /**
         * Css class assigned to filter container element
         * @type {String}
         */
        this.containerCssClass = defaultsStr(f.div_css_class, 'popUpFilter');

        /**
         * Ensure filter's container element width matches column width, enabled
         * by default
         * @type {Boolean}
         */
        this.adjustToContainer = defaultsBool(f.adjust_to_container, true);

        /**
         * Callback fired before a popup filter is opened
         * @type {Function}
         */
        this.onBeforeOpen = defaultsFn(f.on_before_popup_filter_open, EMPTY_FN);

        /**
         * Callback fired after a popup filter is opened
         * @type {Function}
         */
        this.onAfterOpen = defaultsFn(f.on_after_popup_filter_open, EMPTY_FN);

        /**
         * Callback fired before a popup filter is closed
         * @type {Function}
         */
        this.onBeforeClose = defaultsFn(f.on_before_popup_filter_close,
            EMPTY_FN);

        /**
         * Callback fired after a popup filter is closed
         * @type {Function}
         */
        this.onAfterClose = defaultsFn(f.on_after_popup_filter_close, EMPTY_FN);

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
        this.fltElms = defaultsArr(this.filtersCache, []);

        /**
         * Prefix for pop-up filter container ID
         * @type {String}
         * @private
         */
        this.prfxDiv = 'popup_';

        /**
         * Column index of popup filter currently active
         * @type {Number}
         * @private
         */
        this.activeFilterIdx = -1;

        /**
         * `<tf-popup-filter>` hosts, keyed by column index
         * @type {Array}
         * @private
         */
        this.hosts = [];

        /**
         * Bound element `open-change` handlers, keyed by column index
         * @type {Array}
         * @private
         */
        this.ceEvt = [];

        /**
         * Whether the bridge is applying an open state to an element
         * @type {Boolean}
         * @private
         */
        this.syncingCEOpen = false;

        /**
         * Stable handlers for emitter and document subscriptions
         * @private
         */
        this.boundHandlers = {
            mouseup: (event) => this.onMouseup(event),
            containerClick: (event) => stopEvt(event),
            beforeFiltering: () => this.setIconsState(),
            afterFiltering: () => this.closeAll(),
            cellProcessed: (tf, cellIndex) => this.changeState(cellIndex, true),
            filtersRowInserted: () => this.buildIcons(),
            beforeFilterInit: (tf, colIndex) => this.build(colIndex)
        };
    }

    /**
     * Click event handler for pop-up filter icon
     * @private
     */
    onClick(evt) {
        let elm = targetEvt(evt).parentNode;
        let colIndex = parseInt(elm.getAttribute('ci'), 10);

        this.closeAll(colIndex);
        this.toggle(colIndex);

        if (this.adjustToContainer) {
            let cont = this.fltElms[colIndex],
                header = this.tf.getHeaderElement(colIndex),
                headerWidth = header.clientWidth * 0.95;
            cont.style.width = parseInt(headerWidth, 10) + 'px';
        }
        cancelEvt(evt);
        stopEvt(evt);
    }

    /**
     * Mouse-up event handler handling popup filter auto-close behaviour
     * @private
     */
    onMouseup(evt) {
        if (this.activeFilterIdx === -1) {
            return;
        }
        let targetElm = targetEvt(evt);
        let activeFlt = this.fltElms[this.activeFilterIdx];
        let icon = this.fltIcons[this.activeFilterIdx];

        if (icon === targetElm) {
            return;
        }

        while (targetElm && targetElm !== activeFlt) {
            targetElm = targetElm.parentNode;
        }

        if (targetElm !== activeFlt) {
            this.close(this.activeFilterIdx);
        }

        return;
    }

    /**
     * Initialize DOM elements
     */
    init() {
        if (this.initialized) {
            return;
        }

        let tf = this.tf;

        // Enable external filters
        tf.externalFltIds = [''];

        // Override filters row index supplied by configuration
        tf.filtersRowIndex = 0;

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

        // TODO(#965): remove the legacy render path once the webpack
        // pipeline is retired.

        // subscribe to events
        this.emitter.on(['before-filtering'],
            this.boundHandlers.beforeFiltering);
        this.emitter.on(['after-filtering'],
            this.boundHandlers.afterFiltering);
        this.emitter.on(['cell-processed'], this.boundHandlers.cellProcessed);
        this.emitter.on(['filters-row-inserted'],
            this.boundHandlers.filtersRowInserted);
        this.emitter.on(['before-filter-init'],
            this.boundHandlers.beforeFilterInit);

        /** @inherited */
        this.initialized = true;
    }

    /**
     * Reset previously destroyed feature
     */
    reset() {
        this.enable();
        this.init();
        if (!this.tf.gridLayout) {
            this.buildIcons();
        }
        this.buildAll();
    }

    /**
     * Whether the feature renders through `<tf-popup-filter>`.
     * A definition is accepted when it exposes the bridge methods and the
     * shadow parts the bridge projects into.
     * @returns {Boolean} True when the bridge renders through the element
     * @private
     */
    canUseCE() {
        const PopupFilterElement = typeof customElements === 'undefined' ?
            null : customElements.get('tf-popup-filter');
        if (!PopupFilterElement ||
            typeof PopupFilterElement.prototype.setOpen !== 'function' ||
            typeof PopupFilterElement.prototype.setPopupLabel !== 'function' ||
            typeof PopupFilterElement.prototype.setLabel !== 'function' ||
            typeof PopupFilterElement.prototype.setText !== 'function') {
            return false;
        }

        let probe;
        try {
            probe = document.createElement('tf-popup-filter');
        } catch (e) {
            return false;
        }
        const shadow = probe.shadowRoot;
        return Boolean(shadow &&
            shadow.querySelector('slot[name="trigger"]') &&
            shadow.querySelector('[part="trigger"]') &&
            shadow.querySelector('[part="popup"]') &&
            shadow.querySelector('slot[part="content-slot"]'));
    }

    /**
     * Build all filters icons
     */
    buildIcons() {
        let tf = this.tf;
        const useCE = this.canUseCE();

        // TODO: Because of the filters row generation, headers row index needs
        // adjusting: prevent useless row generation
        tf.headersRow++;

        tf.eachCol(
            (i) => {
                if (useCE) {
                    this.buildIconCE(i);
                } else {
                    this.buildIconLegacy(i);
                }
            },
            // continue condition function
            (i) => tf.getFilterType(i) === NONE
        );
    }

    /**
     * Build a filter trigger using <tf-popup-filter>
     * @param {Number} colIndex Column index
     * @private
     */
    buildIconCE(colIndex) {
        const existing = this.hosts[colIndex];
        if (existing && existing.parentNode) {
            return;
        }

        const host = document.createElement('tf-popup-filter');
        host.className = this.placeholderCssClass;
        host.setText(FILTER_TRIGGER_TEXT);
        host.setLabel(FILTER_TRIGGER_TEXT);

        const label = this.appendTrigger(host);
        host.setPopupLabel(label || FILTER_TRIGGER_TEXT);

        const handler = (event) => this.onCEOpenChange(colIndex, event);
        this.ceEvt[colIndex] = handler;
        addEvt(host, 'open-change', handler);

        this.tf.getHeaderElement(colIndex).appendChild(host);
        this.hosts[colIndex] = host;
        this.fltIcons[colIndex] =
            host.querySelector('[slot="trigger"] img[src]');
    }

    /**
     * Append the sanitised `image_html` to the trigger slot
     * @param {DOMElement} host `<tf-popup-filter>` host
     * @returns {String} Accessible name of the projected trigger
     * @private
     */
    appendTrigger(host) {
        const wrapper = createElm('span');
        wrapper.innerHTML = sanitizeHtml(this.iconHtml);
        const nodes = [];
        while (wrapper.firstChild) {
            nodes.push(wrapper.removeChild(wrapper.firstChild));
        }
        if (!nodes.length) {
            return '';
        }

        const focusable = nodes.some((node) => node.nodeType === 1 &&
            (node.matches(FOCUSABLE_TRIGGER) ||
                node.querySelector(FOCUSABLE_TRIGGER)));
        if (!focusable) {
            const button = createElm('button');
            button.type = 'button';
            button.slot = 'trigger';
            nodes.forEach((node) => button.appendChild(node));
            host.appendChild(button);
        } else {
            nodes.forEach((node) => {
                if (node.nodeType === 1) {
                    node.slot = 'trigger';
                    host.appendChild(node);
                } else if (node.nodeType === 3 && node.textContent.trim()) {
                    const text = createElm('span');
                    text.slot = 'trigger';
                    text.appendChild(node);
                    host.appendChild(text);
                }
            });
        }
        const label = this.triggerName(host);
        if (!label) {
            this.applyTriggerLabel(host);
        }
        return label;
    }

    /**
     * Name the first slotted trigger without an accessible name
     * @param {DOMElement} host `<tf-popup-filter>` host
     * @private
     */
    applyTriggerLabel(host) {
        const triggers = host.querySelectorAll('[slot="trigger"]');
        for (let i = 0; i < triggers.length; i++) {
            const el = triggers[i];
            const target = el.matches(FOCUSABLE_TRIGGER) ?
                el : el.querySelector(FOCUSABLE_TRIGGER);
            if (target && !target.hasAttribute('aria-label')) {
                target.setAttribute('aria-label', FILTER_TRIGGER_TEXT);
                return;
            }
        }
    }

    /**
     * Read the accessible name of the first slotted trigger
     * @param {DOMElement} host `<tf-popup-filter>` host
     * @returns {String} Trigger name, or an empty string
     * @private
     */
    triggerName(host) {
        const triggers = host.querySelectorAll('[slot="trigger"]');
        for (let i = 0; i < triggers.length; i++) {
            const el = triggers[i];
            const label = (el.getAttribute('aria-label') || '').trim();
            if (label) {
                return label;
            }
            const text = (el.textContent || '').trim();
            if (text) {
                return text;
            }
            const image = el.querySelector('img[alt]') ||
                (el.matches('img[alt]') ? el : null);
            const alt = image ?
                (image.getAttribute('alt') || '').trim() : '';
            if (alt) {
                return alt;
            }
        }
        return '';
    }

    /**
     * Append the legacy icon to the header
     * @param {Number} colIndex Column index
     * @private
     */
    buildIconLegacy(colIndex) {
        const existing = this.fltSpans[colIndex];
        if (existing && existing.parentNode) {
            return;
        }

        let tf = this.tf;
        let icon = createElm('span', ['ci', colIndex]);
        icon.innerHTML = sanitizeHtml(this.iconHtml);
        let header = tf.getHeaderElement(colIndex);
        header.appendChild(icon);
        addEvt(icon, 'click', (evt) => this.onClick(evt));
        this.fltSpans[colIndex] = icon;
        this.fltIcons[colIndex] = icon.firstChild;
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
        let contId = `${this.prfxDiv}${tf.id}_${colIndex}`;
        let cont = div ||
            createElm('div', ['id', contId], ['class', this.containerCssClass]);
        tf.externalFltIds[colIndex] = cont.id;
        addEvt(cont, 'click', this.boundHandlers.containerClick);

        const host = this.hosts[colIndex];
        if (host) {
            host.appendChild(cont);
            this.fltElms[colIndex] = cont;
            return;
        }

        let placeholder = createElm('div', ['class', this.placeholderCssClass]);
        placeholder.appendChild(cont);

        let header = tf.getHeaderElement(colIndex);
        header.insertBefore(placeholder, header.firstChild);
        this.fltElms[colIndex] = cont;
    }

    /**
     * Toggle visibility of specified filter
     * @param  {Number} colIndex Column index
     */
    toggle(colIndex) {
        if (!this.isOpen(colIndex)) {
            this.open(colIndex);
        } else {
            this.close(colIndex);
        }
    }

    /**
     * Open popup filter of specified column
     * @param {Number} colIndex Column index
     */
    open(colIndex) {
        let tf = this.tf,
            container = this.fltElms[colIndex],
            host = this.hosts[colIndex];

        if (!container) {
            return;
        }
        this.onBeforeOpen(this, container, colIndex);

        container.style.display = 'block';
        if (host) {
            this.setCEOpen(host, true);
            if (this.adjustToContainer) {
                let header = tf.getHeaderElement(colIndex);
                host.style.width = parseInt(header.clientWidth * 0.95, 10) +
                    'px';
            }
        }
        this.activeFilterIdx = colIndex;

        if (!host) {
            addEvt(root, 'mouseup', this.boundHandlers.mouseup);
            if (tf.getFilterType(colIndex) === INPUT) {
                let flt = tf.getFilterElement(colIndex);
                if (flt) {
                    flt.focus();
                }
            }
        }

        this.onAfterOpen(this, container, colIndex);
    }

    /**
     * Close popup filter of specified column
     * @param {Number} colIndex Column index
     */
    close(colIndex) {
        let container = this.fltElms[colIndex],
            host = this.hosts[colIndex];

        if (!container) {
            return;
        }
        this.onBeforeClose(this, container, colIndex);

        if (host) {
            this.setCEOpen(host, false);
        }
        container.style.display = NONE;
        if (this.activeFilterIdx === colIndex) {
            this.activeFilterIdx = -1;
        }
        if (!host) {
            removeEvt(root, 'mouseup', this.boundHandlers.mouseup);
        }

        this.onAfterClose(this, container, colIndex);
    }

    /**
     * Apply an open state to `<tf-popup-filter>` without replaying the
     * bridge callbacks for its `open-change` event
     * @param {DOMElement} host `<tf-popup-filter>` host
     * @param {Boolean} open Whether the popup is open
     * @private
     */
    setCEOpen(host, open) {
        this.syncingCEOpen = true;
        host.setOpen(open);
        this.syncingCEOpen = false;
    }

    /**
     * Drive the bridge from `<tf-popup-filter>` state changes
     * @param {Number} colIndex Column index
     * @param {CustomEvent} event Element `open-change` event
     * @private
     */
    onCEOpenChange(colIndex, event) {
        if (this.syncingCEOpen || !event.detail) {
            return;
        }
        if (event.detail.open) {
            this.closeAll(colIndex);
            this.open(colIndex);
        } else {
            this.close(colIndex);
        }
    }

    /**
     * Check if popup filter for specified column is open
     * @param {Number} colIndex Column index
     * @returns {Boolean}
     */
    isOpen(colIndex) {
        const host = this.hosts[colIndex];
        if (host) {
            return host.hasAttribute('open');
        }
        return this.fltElms[colIndex].style.display === 'block';
    }

    /**
     * Close all filters excepted for the specified one if any
     * @param  {Number} exceptIdx Column index of the filter to not close
     */
    closeAll(exceptIdx) {
        // Do not close filters only if argument is undefined and close on
        // filtering option is disabled
        if (isUndef(exceptIdx) && !this.closeOnFiltering) {
            return;
        }
        for (let i = 0; i < this.fltElms.length; i++) {
            if (i === exceptIdx) {
                continue;
            }
            let fltType = this.tf.getFilterType(i);
            let isMultipleFilter =
                (fltType === CHECKLIST || fltType === MULTIPLE);

            // Always hide all single selection filter types but hide multiple
            // selection filter types only if index set
            if (!isMultipleFilter || !isUndef(exceptIdx)) {
                this.close(i);
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
        let icon = this.fltIcons[colIndex];
        if (icon) {
            icon.src = active ? this.activeIconPath : this.iconPath;
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
            let container = this.fltElms[i],
                host = this.hosts[i],
                placeholder = container && container.parentNode,
                icon = this.fltSpans[i],
                iconImg = this.fltIcons[i];
            if (container) {
                removeEvt(container, 'click',
                    this.boundHandlers.containerClick);
                if (container.parentNode) {
                    removeElm(container);
                }
                this.filtersCache[i] = container;
            }
            container = null;
            if (placeholder && placeholder !== host && placeholder.parentNode) {
                removeElm(placeholder);
            }
            placeholder = null;
            if (host) {
                if (this.ceEvt[i]) {
                    removeEvt(host, 'open-change', this.ceEvt[i]);
                }
                if (host.parentNode) {
                    removeElm(host);
                }
            }
            if (icon && icon.parentNode) {
                removeElm(icon);
            }
            icon = null;
            if (iconImg && iconImg.parentNode) {
                removeElm(iconImg);
            }
            iconImg = null;
        }
        this.fltElms = [];
        this.fltSpans = [];
        this.fltIcons = [];
        this.hosts = [];
        this.ceEvt = [];
        this.syncingCEOpen = false;
        this.activeFilterIdx = -1;
        removeEvt(root, 'mouseup', this.boundHandlers.mouseup);

        // TODO: expose an API to handle external filter IDs
        this.tf.externalFltIds = [];

        // unsubscribe to events
        this.emitter.off(['before-filtering'],
            this.boundHandlers.beforeFiltering);
        this.emitter.off(['after-filtering'],
            this.boundHandlers.afterFiltering);
        this.emitter.off(['cell-processed'], this.boundHandlers.cellProcessed);
        this.emitter.off(['filters-row-inserted'],
            this.boundHandlers.filtersRowInserted);
        this.emitter.off(['before-filter-init'],
            this.boundHandlers.beforeFilterInit);

        this.initialized = false;
    }

}

// TODO: remove as soon as feature name is fixed
PopupFilter.meta = {altName: 'popupFilters'};
