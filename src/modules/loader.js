import {Feature} from '../feature';
import {createElm, createText, elm, removeElm} from '../dom';
import {isFn} from '../types';
import {root} from '../root';
import {NONE} from '../const';

export class Loader extends Feature {

    /**
     * Loading message/spinner
     * @param {Object} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'loader');

        // TableFilter configuration
        let f = this.config;

        //id of container element
        this.loaderTgtId = f.loader_target_id || null;
        //div containing loader
        this.loaderDiv = null;
        //defines loader text
        this.loaderText = f.loader_text || 'Loading...';
        //defines loader innerHtml
        this.loaderHtml = f.loader_html || null;
        //defines css class for loader div
        this.loaderCssClass = f.loader_css_class || 'loader';
        //delay for hiding loader
        this.loaderCloseDelay = 250;
        //callback function before loader is displayed
        this.onShowLoader = isFn(f.on_show_loader) ? f.on_show_loader : null;
        //callback function after loader is closed
        this.onHideLoader = isFn(f.on_hide_loader) ? f.on_hide_loader : null;
        //loader div
        this.prfxLoader = 'load_';
    }

    init() {
        if (this.initialized) {
            return;
        }

        let tf = this.tf;
        let emitter = this.emitter;

        let containerDiv = createElm('div', ['id', this.prfxLoader + tf.id]);
        containerDiv.className = this.loaderCssClass;

        let targetEl = !this.loaderTgtId ?
            tf.tbl.parentNode : elm(this.loaderTgtId);
        if (!this.loaderTgtId) {
            targetEl.insertBefore(containerDiv, tf.tbl);
        } else {
            targetEl.appendChild(containerDiv);
        }
        this.loaderDiv = containerDiv;
        if (!this.loaderHtml) {
            this.loaderDiv.appendChild(createText(this.loaderText));
        } else {
            this.loaderDiv.innerHTML = this.loaderHtml;
        }

        this.show(NONE);

        // Subscribe to events
        emitter.on([
            'before-filtering',
            'before-populating-filter',
            'before-page-change',
            'before-clearing-filters',
            'before-page-length-change',
            'before-reset-page',
            'before-reset-page-length',
            'before-loading-extensions',
            'before-loading-themes'],
            () => this.show('')
        );
        emitter.on([
            'after-filtering',
            'after-populating-filter',
            'after-page-change',
            'after-clearing-filters',
            'after-page-length-change',
            'after-reset-page',
            'after-reset-page-length',
            'after-loading-extensions',
            'after-loading-themes'],
            () => this.show(NONE)
        );

        this.initialized = true;
    }

    show(p) {
        if (!this.isEnabled()) {
            return;
        }

        let displayLoader = () => {
            if (!this.loaderDiv) {
                return;
            }
            if (this.onShowLoader && p !== NONE) {
                this.onShowLoader.call(null, this);
            }
            this.loaderDiv.style.display = p;
            if (this.onHideLoader && p === NONE) {
                this.onHideLoader.call(null, this);
            }
        };

        let t = p === NONE ? this.loaderCloseDelay : 1;
        root.setTimeout(displayLoader, t);
    }

    destroy() {
        if (!this.initialized) {
            return;
        }

        let emitter = this.emitter;

        removeElm(this.loaderDiv);
        this.loaderDiv = null;

        // Unsubscribe to events
        emitter.off([
            'before-filtering',
            'before-populating-filter',
            'before-page-change',
            'before-clearing-filters',
            'before-page-length-change',
            'before-reset-page',
            'before-reset-page-length',
            'before-loading-extensions',
            'before-loading-themes'],
            () => this.show('')
        );
        emitter.off([
            'after-filtering',
            'after-populating-filter',
            'after-page-change',
            'after-clearing-filters',
            'after-page-length-change',
            'after-reset-page',
            'after-reset-page-length',
            'after-loading-extensions',
            'after-loading-themes'],
            () => this.show(NONE)
        );

        this.initialized = false;
    }
}
