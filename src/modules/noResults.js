import {Feature} from '../feature';
import {createElm, elm, removeElm} from '../dom';
import {isEmpty, isFn} from '../types';
import {NONE} from '../const';

export class NoResults extends Feature {

    /**
     * No results message UI component
     * @param {Object} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'noResults');

        //configuration object
        let f = this.config.no_results_message;

        this.content = f.content || 'No results';
        this.customContainer = f.custom_container || null;
        this.customContainerId = f.custom_container_id || null;
        this.isExternal = !isEmpty(this.customContainer) ||
            !isEmpty(this.customContainerId);
        this.cssClass = f.css_class || 'no-results';

        this.cont = null;

        //callback before message is displayed
        this.onBeforeShowMsg = isFn(f.on_before_show_msg) ?
            f.on_before_show_msg : null;
        //callback after message is displayed
        this.onAfterShowMsg = isFn(f.on_after_show_msg) ?
            f.on_after_show_msg : null;
        //callback before message is hidden
        this.onBeforeHideMsg = isFn(f.on_before_hide_msg) ?
            f.on_before_hide_msg : null;
        //callback after message is hidden
        this.onAfterHideMsg = isFn(f.on_after_hide_msg) ?
            f.on_after_hide_msg : null;

        this.prfxNoResults = 'nores_';
    }

    init() {
        if (this.initialized) {
            return;
        }
        let tf = this.tf;
        let target = this.customContainer || elm(this.customContainerId) ||
            tf.tbl;

        //container
        let cont = createElm('div', ['id', this.prfxNoResults + tf.id]);
        cont.className = this.cssClass;
        cont.innerHTML = this.content;

        if (this.isExternal) {
            target.appendChild(cont);
        } else {
            target.parentNode.insertBefore(cont, target.nextSibling);
        }

        this.cont = cont;

        // subscribe to after-filtering event
        this.emitter.on(['after-filtering'], () => this.toggle());

        this.initialized = true;
        this.hide();
    }

    toggle() {
        if (this.tf.getValidRowsNb() > 0) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        if (!this.initialized || !this.isEnabled()) {
            return;
        }

        if (this.onBeforeShowMsg) {
            this.onBeforeShowMsg.call(null, this.tf, this);
        }

        this.setWidth();
        this.cont.style.display = 'block';

        if (this.onAfterShowMsg) {
            this.onAfterShowMsg.call(null, this.tf, this);
        }
    }

    hide() {
        if (!this.initialized || !this.isEnabled()) {
            return;
        }

        if (this.onBeforeHideMsg) {
            this.onBeforeHideMsg.call(null, this.tf, this);
        }

        this.cont.style.display = NONE;

        if (this.onBeforeHideMsg) {
            this.onBeforeHideMsg.call(null, this.tf, this);
        }
    }

    setWidth() {
        if (!this.initialized || this.isExternal || !this.isEnabled()) {
            return;
        }
        if (this.tf.gridLayout) {
            let gridLayout = this.tf.feature('gridLayout');
            this.cont.style.width = gridLayout.tblCont.clientWidth + 'px';
        } else {
            this.cont.style.width = this.tf.tbl.clientWidth + 'px';
        }

    }

    destroy() {
        if (!this.initialized) {
            return;
        }
        removeElm(this.cont);
        this.cont = null;
        // unsubscribe to after-filtering event
        this.emitter.off(['after-filtering'], () => this.toggle());

        this.initialized = false;
    }
}
