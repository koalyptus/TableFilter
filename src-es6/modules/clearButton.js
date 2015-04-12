import {Dom} from '../dom';
import {Event} from '../event';

export class ClearButton{

    /**
     * Clear button component
     * @param {Object} tf TableFilter instance
     */
    constructor(tf){
        // Configuration object
        var f = tf.config();

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
            '<input type="button" value="" class="'+tf.btnResetCssClass+'" ' +
            'title="'+this.btnResetTooltip+'" />');
        //span containing reset button
        this.prfxResetSpan = 'resetspan_';

        this.tf = tf;
    }

    onClick(){
        this.tf.clearFilters();
    }

    /**
     * Build DOM elements
     */
    init(){
        var tf = this.tf;

        if(!tf.hasGrid() && !tf.isFirstLoad && tf.btnResetEl){
            return;
        }

        var resetspan = Dom.create('span', ['id', this.prfxResetSpan+tf.id]);

        // reset button is added to defined element
        if(!this.btnResetTgtId){
            tf.setToolbar();
        }
        var targetEl = !this.btnResetTgtId ?
            tf.rDiv : Dom.id(this.btnResetTgtId);
        targetEl.appendChild(resetspan);

        if(!this.btnResetHtml){
            var fltreset = Dom.create('a', ['href', 'javascript:void(0);']);
            fltreset.className = tf.btnResetCssClass;
            fltreset.appendChild(Dom.text(this.btnResetText));
            resetspan.appendChild(fltreset);
            // fltreset.onclick = this.Evt._Clear;
            Event.add(fltreset, 'click', () => { this.onClick(); });
        } else {
            resetspan.innerHTML = this.btnResetHtml;
            var resetEl = resetspan.firstChild;
            // resetEl.onclick = this.Evt._Clear;
            Event.add(resetEl, 'click', () => { this.onClick(); });
        }
        this.btnResetEl = resetspan.firstChild;
    }

    /**
     * Remove clear button UI
     */
    destroy(){
        var tf = this.tf;

        if(!tf.hasGrid() || !this.btnResetEl){
            return;
        }

        var resetspan = Dom.id(tf.prfxResetSpan+tf.id);
        if(resetspan){
            resetspan.parentNode.removeChild(resetspan);
        }
        this.btnResetEl = null;
    }
}
