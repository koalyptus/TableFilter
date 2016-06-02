import {Feature} from '../feature';
import {createElm, createText, elm, removeElm} from '../dom';
import {addEvt} from '../event';

export class ClearButton extends Feature {

    /**
     * Clear button component
     * @param {Object} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'btnReset');

        // Configuration object
        let f = this.config;

        //id of container element
        this.btnResetTgtId = f.btn_reset_target_id || null;
        //reset button element
        this.btnResetEl = null;
        //defines reset text
        this.btnResetText = f.btn_reset_text || 'Reset';
        //defines reset button tooltip
        this.btnResetTooltip = f.btn_reset_tooltip || 'Clear filters';
        //defines reset button innerHtml
        this.btnResetHtml = f.btn_reset_html ||
            (!tf.enableIcons ? null :
                '<input type="button" value="" class="' + tf.btnResetCssClass +
                '" ' + 'title="' + this.btnResetTooltip + '" />');
        //span containing reset button
        this.prfxResetSpan = 'resetspan_';
    }

    onClick() {
        if (!this.isEnabled()) {
            return;
        }
        this.tf.clearFilters();
    }

    /**
     * Build DOM elements
     */
    init() {
        let tf = this.tf;

        if (this.initialized) {
            return;
        }

        let resetspan = createElm('span', ['id', this.prfxResetSpan + tf.id]);

        // reset button is added to defined element
        if (!this.btnResetTgtId) {
            tf.setToolbar();
        }
        let targetEl = !this.btnResetTgtId ? tf.rDiv : elm(this.btnResetTgtId);
        targetEl.appendChild(resetspan);

        if (!this.btnResetHtml) {
            let fltreset = createElm('a', ['href', 'javascript:voelm(0);']);
            fltreset.className = tf.btnResetCssClass;
            fltreset.appendChild(createText(this.btnResetText));
            resetspan.appendChild(fltreset);
            addEvt(fltreset, 'click', () => this.onClick());
        } else {
            resetspan.innerHTML = this.btnResetHtml;
            let resetEl = resetspan.firstChild;
            addEvt(resetEl, 'click', () => this.onClick());
        }
        this.btnResetEl = resetspan.firstChild;

        this.initialized = true;
    }

    /**
     * Remove clear button UI
     */
    destroy() {
        let tf = this.tf;

        if (!this.initialized) {
            return;
        }

        let resetspan = elm(this.prfxResetSpan + tf.id);
        if (resetspan) {
            removeElm(resetspan);
        }
        this.btnResetEl = null;
        this.initialized = false;
    }
}
