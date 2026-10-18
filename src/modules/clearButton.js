import {Feature} from '../feature';
import {createElm, createText, elm, removeElm} from '../dom';
import {addEvt} from '../event';
import {defaultsStr} from '../settings';
import {isNull} from '../types';
import {RIGHT} from './toolbar';

/**
 * Clear button UI component
 */
export class ClearButton extends Feature {

    /**
     * Creates an instance of ClearButton
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, ClearButton);

        let f = this.config.btn_reset || {};

        /**
         * Container element ID
         * @type {String}
         */
        this.targetId = defaultsStr(f.target_id, null);

        /**
         * Text for the clear button
         * @type {String}
         */
        this.text = defaultsStr(f.text, null);

        /**
         * Css class for reset button
         * @type {String}
         */
        this.cssClass = defaultsStr(f.css_class, 'reset');

        /**
         * Tooltip text for the clear button
         * @type {String}
         */
        this.tooltip = f.tooltip || 'Clear filters';

        /**
         * Custom Html string for the clear button
         * @type {String}
         */
        this.html = defaultsStr(f.html,
            (!tf.enableIcons || this.text ? null :
                '<input type="button" value="" class="' + this.cssClass +
                '" ' + 'title="' + this.tooltip + '" />'));

        /**
         * Default position in toolbar ('left'|'center'|'right')
         * @type {String}
         */
        this.toolbarPosition = defaultsStr(f.toolbar_position, RIGHT);

        /**
         * Clear button container element
         * @type {DOMElement}
         * @private
         */
        this.container = null;

        /**
         * Clear button element
         * @type {DOMElement}
         * @private
         */
        this.element = null;
    }

    /**
     * Click event handler for clear button
     * @private
     */
    onClick() {
        if (!this.isEnabled()) {
            return;
        }
        this.tf.clearFilters();
    }

    /**
     * Initialize clear button component
     */
    init() {
        let tf = this.tf;

        if (this.initialized) {
            return;
        }

        this.emitter.emit('initializing-feature', this, !isNull(this.targetId));

        const targetEl = !this.targetId ?
            tf.feature('toolbar').container(this.toolbarPosition) :
            elm(this.targetId);

        // Bridge to <tf-clear-button> (scaffold #911). If the custom
        // element is registered (Vite / module load) and there is no
        // custom html (icon mode uses the legacy markup), use it;
        // otherwise fall back to the legacy span/input|a structure (#912).
        // TODO(#965): restore static import once namespace migration lands.
        // initCE/initLegacy are split so the legacy path is a clean
        // deletion boundary when #965 lands.
        if (typeof customElements !== 'undefined' &&
            customElements.get('tf-clear-button') && !this.html) {
            this.initCE(targetEl);
        } else {
            this.initLegacy(targetEl);
        }

        /** @inherited */
        this.initialized = true;

        this.emitter.emit('feature-initialized', this);
    }

    /**
     * Initialize using the <tf-clear-button> custom element
     * @param {DOMElement} targetEl Target container element
     * @private
     */
    initCE(targetEl) {
        let cont = document.createElement('tf-clear-button');
        cont.className = this.cssClass;
        if (this.text) {
            cont.setAttribute('text', this.text);
        }
        if (this.tooltip) {
            cont.setAttribute('label', this.tooltip);
            cont.setAttribute('title', this.tooltip);
        }
        targetEl.appendChild(cont);

        let resetEl = cont.shadowRoot ?
            cont.shadowRoot.querySelector('button') : null;
        if (!resetEl) {
            resetEl = cont;
        }
        if (resetEl) {
            addEvt(resetEl, 'click', () => this.onClick());
        }
        this.element = resetEl;
        this.container = cont;
    }

    /**
     * Initialize using the legacy span/input|a structure
     * @param {DOMElement} targetEl Target container element
     * @private
     */
    initLegacy(targetEl) {
        let cont = createElm('span');
        targetEl.appendChild(cont);

        if (!this.html) {
            let fltReset = createElm('a', ['href', 'javascript:void(0);']);
            fltReset.className = this.cssClass;
            fltReset.appendChild(createText(this.text));
            cont.appendChild(fltReset);
            addEvt(fltReset, 'click', () => this.onClick());
        } else {
            cont.innerHTML = this.html;
            let resetElLegacy = cont.firstChild;
            addEvt(resetElLegacy, 'click', () => this.onClick());
        }
        this.element = cont.firstChild;
        this.container = cont;
    }

    /**
     * Destroy ClearButton instance
     */
    destroy() {
        if (!this.initialized) {
            return;
        }
        if (this.container && this.container.parentNode) {
            removeElm(this.container);
        } else if (this.element && this.element.parentNode) {
            removeElm(this.element);
        }
        this.element = null;
        this.container = null;
        this.initialized = false;
    }
}

// TODO: remove as soon as feature name is fixed
ClearButton.meta = {altName: 'btnReset'};
