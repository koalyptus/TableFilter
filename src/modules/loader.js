import {Feature} from '../feature';
import {createElm, createText, elm, removeElm} from '../dom';
import {EMPTY_FN} from '../types';
import {root} from '../root';
import {NONE} from '../const';
import {defaultsStr, defaultsFn} from '../settings';
import {sanitizeHtml} from '../sanitize';

const BEFORE_ACTION_EVENTS = [
    'before-filtering',
    'before-populating-filter',
    'before-page-change',
    'before-clearing-filters',
    'before-page-length-change',
    'before-reset-page',
    'before-reset-page-length',
    'before-loading-extensions',
    'before-loading-themes'
];

const AFTER_ACTION_EVENTS = [
    'after-filtering',
    'after-populating-filter',
    'after-page-change',
    'after-clearing-filters',
    'after-page-length-change',
    'after-reset-page',
    'after-reset-page-length',
    'after-loading-extensions',
    'after-loading-themes'
];

/**
 * Activity indicator
 *
 * @export
 * @class Loader
 * @extends {Feature}
 */
export class Loader extends Feature {

    /**
     * Creates an instance of Loader.
     *
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, Loader);

        let f = this.config.loader || {};

        /**
         * ID of custom container element
         * @type {String}
         */
        this.targetId = defaultsStr(f.target_id, null);

        /**
         * Loader container DOM element
         * @type {DOMElement}
         */
        this.cont = null;

        /**
         * Text displayed when indicator is visible
         * @type {String}
         */
        this.text = defaultsStr(f.text, 'Loading...');

        /**
         * Custom HTML injected in Loader's container element
         * @type {String}
         */
        this.html = defaultsStr(f.html, null);

        /**
         * Css class for Loader's container element
         * @type {String}
         */
        this.cssClass = defaultsStr(f.css_class, 'loader');

        /**
         * Close delay in milliseconds
         * @type {Number}
         */
        this.closeDelay = 250;

        /**
         * Callback fired when loader is displayed
         * @type {Function}
         */
        this.onShow = defaultsFn(f.on_show_loader, EMPTY_FN);

        /**
         * Callback fired when loader is closed
         * @type {Function}
         */
        this.onHide = defaultsFn(f.on_hide_loader, EMPTY_FN);

        /**
         * Subscribed before-action handler
         * @type {Function|null}
         * @private
         */
        this.boundShow = null;

        /**
         * Subscribed after-action handler
         * @type {Function|null}
         * @private
         */
        this.boundHide = null;
    }

    /**
     * Initializes Loader instance
     */
    init() {
        if (this.initialized) {
            return;
        }

        // Bridge to <tf-loader> (scaffold #916): a custom `css_class`, or
        // an unresolvable `target_id`, routes to the legacy div container.
        // TODO(#965): remove once the legacy webpack pipeline is retired.
        if (this.canUseCE()) {
            this.initCE();
        } else {
            this.initLegacy();
        }

        this.show(NONE);

        // Subscribe to events
        this.boundShow = () => this.show('');
        this.boundHide = () => this.show(NONE);
        this.emitter.on(BEFORE_ACTION_EVENTS, this.boundShow);
        this.emitter.on(AFTER_ACTION_EVENTS, this.boundHide);

        /** @inherited */
        this.initialized = true;
    }

    /**
     * Whether the feature renders through `<tf-loader>`.
     * @returns {Boolean} True when the element is registered and the
     * configuration keeps the default `loader` class
     * @private
     */
    canUseCE() {
        if (typeof customElements === 'undefined' ||
            !customElements.get('tf-loader')) {
            return false;
        }
        if (this.cssClass !== 'loader') {
            return false;
        }
        if (this.targetId) {
            return Boolean(elm(this.targetId));
        }
        return true;
    }

    /**
     * Initialize using the <tf-loader> custom element
     * @private
     */
    initCE() {
        const host = document.createElement('tf-loader');
        host.className = this.cssClass;
        host.setText(this.text);
        if (this.html) {
            host.innerHTML = sanitizeHtml(this.html);
        }

        if (this.targetId) {
            elm(this.targetId).appendChild(host);
        } else {
            const dom = this.tf.dom();
            dom.parentNode.insertBefore(host, dom);
        }
        this.cont = host;
    }

    /**
     * Initialize using the legacy div container
     * @private
     */
    initLegacy() {
        let containerDiv = createElm('div');
        containerDiv.className = this.cssClass;

        const dom = this.tf.dom();
        const targetEl = this.targetId ? elm(this.targetId) : null;
        if (targetEl) {
            targetEl.appendChild(containerDiv);
        } else {
            dom.parentNode.insertBefore(containerDiv, dom);
        }
        this.cont = containerDiv;
        if (!this.html) {
            this.cont.appendChild(createText(this.text));
        } else {
            this.cont.innerHTML = sanitizeHtml(this.html);
        }
    }

    /**
     * Shows or hides activity indicator
     * @param {String} Two possible values: '' or 'none'
     */
    show(p) {
        if (!this.isEnabled()) {
            return;
        }

        function displayLoader() {
            if (!this.cont) {
                return;
            }
            if (p !== NONE) {
                this.onShow(this);
            }
            this.cont.style.display = p;
            if (p === NONE) {
                this.onHide(this);
            }
        };

        let t = p === NONE ? this.closeDelay : 1;
        root.setTimeout(displayLoader.bind(this), t);
    }

    /**
     * Removes feature
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        let emitter = this.emitter;

        if (this.cont && this.cont.parentNode) {
            removeElm(this.cont);
        }
        this.cont = null;

        // Unsubscribe to events
        emitter.off(BEFORE_ACTION_EVENTS, this.boundShow);
        emitter.off(AFTER_ACTION_EVENTS, this.boundHide);
        this.boundShow = null;
        this.boundHide = null;

        this.initialized = false;
    }
}
