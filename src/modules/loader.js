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
        emitter.on('before-filtering', ()=> this.show(''));
        emitter.on('after-filtering', ()=> this.show('none'));
        emitter.on('before-populating-filter', ()=> this.show(''));
        emitter.on('after-populating-filter', ()=> this.show('none'));
        emitter.on('before-changing-page', ()=> this.show(''));
        emitter.on('after-changing-page', ()=> this.show('none'));
        emitter.on('before-clearing-filters', ()=> this.show(''));
        emitter.on('after-clearing-filters', ()=> this.show('none'));
        emitter.on('before-changing-results-per-page', ()=> this.show(''));
        emitter.on('after-changing-results-per-page', ()=> this.show('none'));
        emitter.on('before-reset-page', ()=> this.show(''));
        emitter.on('after-reset-page', ()=> this.show('none'));
        emitter.on('before-reset-page-length', ()=> this.show(''));
        emitter.on('after-reset-page-length', ()=> this.show('none'));
        emitter.on('before-loading-extensions', ()=> this.show(''));
        emitter.on('after-loading-extensions', ()=> this.show('none'));
        emitter.on('before-loading-themes',  ()=> this.show(''));
        emitter.on('after-loading-themes',  ()=> this.show('none'));

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
        emitter.off('before-filtering', ()=> this.show(''));
        emitter.off('after-filtering', ()=> this.show('none'));
        emitter.off('before-populating-filter', ()=> this.show(''));
        emitter.off('after-populating-filter', ()=> this.show('none'));
        emitter.off('before-changing-page', ()=> this.show(''));
        emitter.off('after-changing-page', ()=> this.show('none'));
        emitter.off('before-clearing-filters', ()=> this.show(''));
        emitter.off('after-clearing-filters', ()=> this.show('none'));
        emitter.off('before-changing-results-per-page', ()=> this.show(''));
        emitter.off('after-changing-results-per-page', ()=> this.show('none'));
        emitter.off('before-reset-page', ()=> this.show(''));
        emitter.off('after-reset-page', ()=> this.show('none'));
        emitter.off('before-reset-page-length', ()=> this.show(''));
        emitter.off('after-reset-page-length', ()=> this.show('none'));
        emitter.off('before-loading-extensions', ()=> this.show(''));
        emitter.off('after-loading-extensions', ()=> this.show('none'));
        emitter.off('before-loading-themes',  ()=> this.show(''));
        emitter.off('after-loading-themes',  ()=> this.show('none'));

        this.initialized = false;
    }
}
