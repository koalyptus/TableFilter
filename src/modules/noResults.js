import {Feature} from './feature';
import Dom from '../dom';
import Types from '../types';

export class NoResults extends Feature{

    /**
     * No results message UI component
     * @param {Object} tf TableFilter instance
     */
    constructor(tf){
        super(tf, 'noResults');

        //configuration object
        let f = this.config.no_results_message;

        this.text = f.text || 'No results';
        this.customContainer = f.custom_container || null;
        this.customContainerId = f.custom_container_id || null;
        this.isExternal = !Types.isEmpty(this.customContainer) ||
            !Types.isEmpty(this.customContainerId);
        this.cssClass = f.css_class || 'no-results';

        this.cont = null;

        //callback before message is displayed
        this.onBeforeShowMsg = Types.isFn(f.on_before_show_msg) ?
            f.on_before_show_msg : null;
        //callback after message is displayed
        this.onAfterShowMsg = Types.isFn(f.on_after_show_msg) ?
            f.on_after_show_msg : null;

        this.prfxNoResults = 'nores_';
    }

    init(){
        if(this.initialized){
            return;
        }
        let tf = this.tf;
        let target = this.customContainer || Dom.id(this.customContainerId) ||
            tf.tbl;

        //container
        var cont = Dom.create('div', ['id', this.prfxNoResults+tf.id]);
        cont.className = this.cssClass;
        cont.appendChild(Dom.text(this.text));
        target.appendChild(cont);

        this.cont = cont;

        this.hide();
        this.initialized = true;
    }

    show(){
        this.setWidth();
        this.cont.style.display = '';
    }

    hide(){
        this.setWidth();
        this.cont.style.display = 'none';
    }

    setWidth(){
        if(this.isExternal){
            return;
        }
        this.cont.style.width = this.tf.tbl.clientWidth + 'px';
    }

    destroy(){
        if(!this.initialized){
            return;
        }
        Dom.remove(this.cont);
        this.cont = null;
        this.initialized = false;
    }
}
