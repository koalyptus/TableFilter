import {Feature} from '../feature';
import {createElm, createText, elm, removeElm} from '../dom';
import {addEvt} from '../event';

/**
 * Clear button UI component
 */
export class ClearButton extends Feature {

    /**
     * Creates an instance of ClearButton
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'btnReset');

        let f = this.config;

        /**
         * Container element ID
         * @type {String}
         */
        this.targetId = f.btn_reset_target_id || null;

        /**
         * Clear button element
         * @type {DOMElement}
         * @private
         */
        this.element = null;

        /**
         * Text for the clear button
         * @type {String}
         */
        this.text = f.btn_reset_text || 'Reset';

        /**
         * Tooltip text for the clear button
         * @type {String}
         */
        this.tooltip = f.btn_reset_tooltip || 'Clear filters';

        /**
         * Custom Html string for the clear button
         * @type {String}
         */
        this.html = f.btn_reset_html ||
            (!tf.enableIcons ? null :
                '<input type="button" value="" class="' + tf.btnResetCssClass +
                '" ' + 'title="' + this.tooltip + '" />');

        /**
         * Prefix fot ID of container element
         * @type {String}
         * @private
         */
        this.prfxCont = 'resetspan_';
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

        let resetspan = createElm('span', ['id', this.prfxCont + tf.id]);

        // reset button is added to defined element
        if (!this.targetId) {
            tf.setToolbar();
        }
        let targetEl = !this.targetId ? tf.rDiv : elm(this.targetId);
        targetEl.appendChild(resetspan);

        if (!this.html) {
            let fltreset = createElm('a', ['href', 'javascript:void(0);']);
            fltreset.className = tf.btnResetCssClass;
            fltreset.appendChild(createText(this.text));
            resetspan.appendChild(fltreset);
            addEvt(fltreset, 'click', () => this.onClick());
        } else {
            resetspan.innerHTML = this.html;
            let resetEl = resetspan.firstChild;
            addEvt(resetEl, 'click', () => this.onClick());
        }
        this.element = resetspan.firstChild;

        this.initialized = true;
    }

    /**
     * Destroy ClearButton instance
     */
    destroy() {
        let tf = this.tf;

        if (!this.initialized) {
            return;
        }

        let resetspan = elm(this.prfxCont + tf.id);
        if (resetspan) {
            removeElm(resetspan);
        }
        this.element = null;
        this.initialized = false;
    }
}
