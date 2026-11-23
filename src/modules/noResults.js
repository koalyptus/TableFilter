import {Feature} from '../feature';
import {createElm, elm, removeElm} from '../dom';
import {isEmpty, EMPTY_FN} from '../types';
import {NONE} from '../const';
import {defaultsStr, defaultsFn} from '../settings';
import {sanitizeHtml} from '../sanitize';

const TOGGLE_EVENTS = ['initialized', 'after-filtering'];

/**
 * UI when filtering yields no matches
 * @export
 * @class NoResults
 * @extends {Feature}
 */
export class NoResults extends Feature {

    /**
     * Creates an instance of NoResults
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, NoResults);

        //configuration object
        let f = this.config.no_results_message || {};

        /**
         * Text (accepts HTML)
         * @type {String}
         */
        this.content = defaultsStr(f.content, 'No results');

        /**
         * Custom container DOM element
         * @type {DOMElement}
         */
        this.customContainer = f.custom_container &&
            typeof f.custom_container.appendChild === 'function' ?
            f.custom_container : null;

        /**
         * ID of custom container element
         * @type {String}
         */
        this.customContainerId = defaultsStr(f.custom_container_id, null);

        /**
         * Indicates if UI is contained in a external element
         * @type {Boolean}
         * @private
         */
        this.isExternal = !isEmpty(this.customContainer) ||
            !isEmpty(this.customContainerId);

        /**
         * Css class assigned to container element
         * @type {String}
         */
        this.cssClass = defaultsStr(f.css_class, 'no-results');

        /**
         * Stores container DOM element
         * @type {DOMElement}
         */
        this.cont = null;

        /**
         * Callback fired before the message is displayed
         * @type {Function}
         */
        this.onBeforeShow = defaultsFn(f.on_before_show_msg, EMPTY_FN);

        /**
         * Callback fired after the message is displayed
         * @type {Function}
         */
        this.onAfterShow = defaultsFn(f.on_after_show_msg, EMPTY_FN);

        /**
         * Callback fired before the message is hidden
         * @type {Function}
         */
        this.onBeforeHide = defaultsFn(f.on_before_hide_msg, EMPTY_FN);

        /**
         * Callback fired after the message is hidden
         * @type {Function}
         */
        this.onAfterHide = defaultsFn(f.on_after_hide_msg, EMPTY_FN);

        /**
         * Subscribed toggle handler
         * @type {Function|null}
         * @private
         */
        this.boundToggle = null;
    }

    /**
     * Initializes NoResults instance
     */
    init() {
        if (this.initialized) {
            return;
        }
        let targetEl = this.isExternal ?
            this.customContainer || elm(this.customContainerId) : null;

        // TODO(#965): remove once the legacy webpack pipeline is retired.
        if (this.canUseCE(targetEl)) {
            this.initCE(targetEl);
        } else {
            this.initLegacy(targetEl);
        }

        this.boundToggle = () => this.toggle();
        this.emitter.on(TOGGLE_EVENTS, this.boundToggle);

        /** @inherited */
        this.initialized = true;
    }

    /**
     * Whether the feature renders through `<tf-no-results>`.
     * @param {DOMElement} targetEl Resolved external container, if any
     * @returns {Boolean} True when the registered element exposes `setText`
     * and no external container is configured, or the container resolves
     * @private
     */
    canUseCE(targetEl) {
        const NoResultsElement = typeof customElements === 'undefined' ?
            null : customElements.get('tf-no-results');
        return Boolean(NoResultsElement) &&
            typeof NoResultsElement.prototype.setText === 'function' &&
            (!this.isExternal || Boolean(targetEl &&
                typeof targetEl.appendChild === 'function'));
    }

    /**
     * Initialize using the <tf-no-results> custom element
     * @param {DOMElement} targetEl External container element
     * @private
     */
    initCE(targetEl) {
        const host = document.createElement('tf-no-results');
        host.className = this.cssClass;
        host.setText('');
        host.innerHTML = sanitizeHtml(this.content);

        if (this.isExternal) {
            targetEl.appendChild(host);
        } else {
            const dom = this.tf.dom();
            dom.parentNode.insertBefore(host, dom.nextSibling);
        }
        this.cont = host;
    }

    /**
     * Initialize using the legacy div container
     * @param {DOMElement} targetEl External container element
     * @private
     */
    initLegacy(targetEl) {
        let target = targetEl || this.tf.dom();
        let cont = createElm('div');
        cont.className = this.cssClass;
        cont.innerHTML = this.content;

        if (this.isExternal) {
            target.appendChild(cont);
        } else {
            target.parentNode.insertBefore(cont, target.nextSibling);
        }

        this.cont = cont;
    }

    /**
     * Toggle no results message
     */
    toggle() {
        if (this.tf.getValidRowsNb() > 0) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Show no results message
     */
    show() {
        if (!this.initialized || !this.isEnabled()) {
            return;
        }
        this.onBeforeShow(this.tf, this);

        this.setWidth();
        this.cont.style.display = 'block';

        this.onAfterShow(this.tf, this);
    }

    /**
     * Hide no results message
     */
    hide() {
        if (!this.initialized || !this.isEnabled()) {
            return;
        }
        this.onBeforeHide(this.tf, this);

        this.cont.style.display = NONE;

        this.onAfterHide(this.tf, this);
    }

    /**
     * Sets no results container width
     * @private
     */
    setWidth() {
        if (!this.initialized || this.isExternal || !this.isEnabled()) {
            return;
        }
        let tf = this.tf;
        if (tf.gridLayout) {
            let gridLayout = tf.feature('gridLayout');
            this.cont.style.width = gridLayout.headTbl.clientWidth + 'px';
        } else {
            this.cont.style.width = (tf.dom().tHead ?
                tf.dom().tHead.clientWidth :
                tf.dom().tBodies[0].clientWidth) + 'px';
        }
    }

    /** Remove feature */
    destroy() {
        if (!this.initialized) {
            return;
        }
        if (this.cont && this.cont.parentNode) {
            removeElm(this.cont);
        }
        this.cont = null;
        if (this.boundToggle) {
            this.emitter.off(TOGGLE_EVENTS, this.boundToggle);
            this.boundToggle = null;
        }

        this.initialized = false;
    }
}
