import {Feature} from './feature';
import Dom from '../dom';
import Types from '../types';

let global = window;

export class Loader extends Feature{

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
        this.onShowLoader = Types.isFn(f.on_show_loader) ?
            f.on_show_loader : null;
        //callback function after loader is closed
        this.onHideLoader = Types.isFn(f.on_hide_loader) ?
            f.on_hide_loader : null;
        //loader div
        this.prfxLoader = 'load_';
    }

    init() {
        if(this.initialized){
            return;
        }

        let tf = this.tf;
        let emitter = this.emitter;

        let containerDiv = Dom.create('div', ['id', this.prfxLoader+tf.id]);
        containerDiv.className = this.loaderCssClass;

        let targetEl = !this.loaderTgtId ?
            tf.tbl.parentNode : Dom.id(this.loaderTgtId);
        if(!this.loaderTgtId){
            targetEl.insertBefore(containerDiv, tf.tbl);
        } else {
            targetEl.appendChild(containerDiv);
        }
        this.loaderDiv = containerDiv;
        if(!this.loaderHtml){
            this.loaderDiv.appendChild(Dom.text(this.loaderText));
        } else {
            this.loaderDiv.innerHTML = this.loaderHtml;
        }

        this.show('none');

        // Subscribe to events
        emitter.on([
            'before-filtering',
            'before-populating-filter',
            'before-changing-page',
            'before-clearing-filters',
            'before-changing-results-per-page',
            'before-reset-page',
            'before-reset-page-length',
            'before-loading-extensions',
            'before-loading-themes'],
            ()=> this.show('')
        );
        emitter.on([
            'after-filtering',
            'after-populating-filter',
            'after-changing-page',
            'after-clearing-filters',
            'after-changing-results-per-page',
            'after-reset-page',
            'after-reset-page-length',
            'after-loading-extensions',
            'after-loading-themes'],
            ()=> this.show('none')
        );

        this.initialized = true;
    }

    show(p) {
        if(!this.isEnabled() /*|| this.loaderDiv.style.display === p*/){
            return;
        }

        let displayLoader = () => {
            if(!this.loaderDiv){
                return;
            }
            if(this.onShowLoader && p !== 'none'){
                this.onShowLoader.call(null, this);
            }
            this.loaderDiv.style.display = p;
            if(this.onHideLoader && p === 'none'){
                this.onHideLoader.call(null, this);
            }
        };

        let t = p === 'none' ? this.loaderCloseDelay : 1;
        global.setTimeout(displayLoader, t);
    }

    destroy() {
        if(!this.initialized){
            return;
        }

        let emitter = this.emitter;

        Dom.remove(this.loaderDiv);
        this.loaderDiv = null;

        // Unsubscribe to events
        emitter.off([
            'before-filtering',
            'before-populating-filter',
            'before-changing-page',
            'before-clearing-filters',
            'before-changing-results-per-page',
            'before-reset-page',
            'before-reset-page-length',
            'before-loading-extensions',
            'before-loading-themes'],
            ()=> this.show('')
        );
        emitter.off([
            'after-filtering',
            'after-populating-filter',
            'after-changing-page',
            'after-clearing-filters',
            'after-changing-results-per-page',
            'after-reset-page',
            'after-reset-page-length',
            'after-loading-extensions',
            'after-loading-themes'],
            ()=> this.show('none')
        );

        this.initialized = false;
    }
}
