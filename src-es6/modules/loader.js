
import {Dom} from '../dom';
import {Types} from '../types';

var global = window;

/**
 * Loading message/spinner
 * @param {Object} tf TableFilter instance
 */
export class Loader{

    constructor(tf){

        // TableFilter configuration
        var f = tf.config();
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
        this.loaderCloseDelay = 200;
        //callback function before loader is displayed
        this.onShowLoader = Types.isFn(f.on_show_loader) ?
            f.on_show_loader : null;
        //callback function after loader is closed
        this.onHideLoader = Types.isFn(f.on_hide_loader) ?
            f.on_hide_loader : null;
        //loader div
        this.prfxLoader = 'load_';

        this.tf = tf;

        var containerDiv = Dom.create('div', ['id', this.prfxLoader+tf.id]);
        containerDiv.className = this.loaderCssClass;

        var targetEl = !this.loaderTgtId ?
            tf.tbl.parentNode : Dom.id(this.loaderTgtId);
        if(!this.loaderTgtId){
            targetEl.insertBefore(containerDiv, tf.tbl);
        } else {
            targetEl.appendChild(containerDiv);
        }
        this.loaderDiv = Dom.id(this.prfxLoader+tf.id);
        if(!this.loaderHtml){
            this.loaderDiv.appendChild(Dom.text(this.loaderText));
        } else {
            this.loaderDiv.innerHTML = this.loaderHtml;
        }
    }

    show(p) {
        if(!this.tf.loader || !this.loaderDiv ||
            this.loaderDiv.style.display===p){
            return;
        }

        var displayLoader = () => {
            if(!this.loaderDiv){
                return;
            }
            if(this.onShowLoader && p!=='none'){
                this.onShowLoader.call(null, this);
            }
            this.loaderDiv.style.display = p;
            if(this.onHideLoader && p==='none'){
                this.onHideLoader.call(null, this);
            }
        };

        var t = p==='none' ? this.loaderCloseDelay : 1;
        global.setTimeout(displayLoader, t);
    }

    remove(){
        if(!this.loaderDiv){
            return;
        }
        var tf = this.tf,
            targetEl = !this.loaderTgtId ?
            (tf.gridLayout ? tf.Cpt.gridLayout.tblCont : tf.tbl.parentNode):
            Dom.id(this.loaderTgtId);
        targetEl.removeChild(this.loaderDiv);
        this.loaderDiv = null;
    }
}
