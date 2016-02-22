import {Feature} from './feature';
import Dom from '../dom';
import Types from '../types';

let global = window;

export class StatusBar extends Feature{

    /**
     * Status bar UI component
     * @param {Object} tf TableFilter instance
     */
    constructor(tf){
        super(tf, 'statusBar');

        // Configuration object
        let f = this.config;

        //id of custom container element
        this.statusBarTgtId = f.status_bar_target_id || null;
        //element containing status bar label
        this.statusBarDiv = null;
        //status bar
        this.statusBarSpan = null;
        //status bar label
        this.statusBarSpanText = null;
        //defines status bar text
        this.statusBarText = f.status_bar_text || '';
        //defines css class status bar
        this.statusBarCssClass = f.status_bar_css_class || 'status';
        //delay for status bar clearing
        this.statusBarCloseDelay = 250;

        //calls function before message is displayed
        this.onBeforeShowMsg = Types.isFn(f.on_before_show_msg) ?
            f.on_before_show_msg : null;
        //calls function after message is displayed
        this.onAfterShowMsg = Types.isFn(f.on_after_show_msg) ?
            f.on_after_show_msg : null;

        //status messages
        this.msgFilter = f.msg_filter || 'Filtering data...';
        //populating drop-downs
        this.msgPopulate = f.msg_populate || 'Populating filter...';
        //populating drop-downs
        this.msgPopulateCheckList = f.msg_populate_checklist ||
            'Populating list...';
        //changing paging page
        this.msgChangePage = f.msg_change_page || 'Collecting paging data...';
        //clearing filters
        this.msgClear = f.msg_clear || 'Clearing filters...';
        //changing nb results/page
        this.msgChangeResults = f.msg_change_results ||
            'Changing results per page...';
        //re-setting page
        this.msgResetPage = f.msg_reset_page || 'Re-setting page...';
        //re-setting page length
        this.msgResetPageLength = f.msg_reset_page_length ||
            'Re-setting page length...';
        //table sorting
        this.msgSort = f.msg_sort || 'Sorting data...';
        //extensions loading
        this.msgLoadExtensions = f.msg_load_extensions ||
            'Loading extensions...';
        //themes loading
        this.msgLoadThemes = f.msg_load_themes || 'Loading theme(s)...';

        // status bar div
        this.prfxStatus = 'status_';
        // status bar label
        this.prfxStatusSpan = 'statusSpan_';
        // text preceding status bar label
        this.prfxStatusTxt = 'statusText_';
    }

    init(){
        if(this.initialized){
            return;
        }

        let tf = this.tf;
        let emitter = this.emitter;

        //status bar container
        let statusDiv = Dom.create('div', ['id', this.prfxStatus+tf.id]);
        statusDiv.className = this.statusBarCssClass;

        //status bar label
        let statusSpan = Dom.create('span', ['id', this.prfxStatusSpan+tf.id]);
        //preceding text
        let statusSpanText = Dom.create('span',
            ['id', this.prfxStatusTxt+tf.id]);
        statusSpanText.appendChild(Dom.text(this.statusBarText));

        // target element container
        if(!this.statusBarTgtId){
            tf.setToolbar();
        }
        let targetEl = (!this.statusBarTgtId) ?
                tf.lDiv : Dom.id(this.statusBarTgtId);

        //default container: 'lDiv'
        if(!this.statusBarTgtId){
            statusDiv.appendChild(statusSpanText);
            statusDiv.appendChild(statusSpan);
            targetEl.appendChild(statusDiv);
        } else {
            // custom container, no need to append statusDiv
            targetEl.appendChild(statusSpanText);
            targetEl.appendChild(statusSpan);
        }

        this.statusBarDiv = statusDiv;
        this.statusBarSpan = statusSpan;
        this.statusBarSpanText = statusSpanText;

        // Subscribe to events
        emitter.on(['before-filtering'], ()=> this.message(this.msgFilter));
        emitter.on(['before-populating-filter'],
            ()=> this.message(this.msgPopulate));
        emitter.on(['before-changing-page'],
            ()=> this.message(this.msgChangePage));
        emitter.on(['before-clearing-filters'], ()=>
            this.message(this.msgClear));
        emitter.on(['before-changing-results-per-page'],
            ()=> this.message(this.msgChangeResults));
        emitter.on(['before-reset-page'], ()=> this.message(this.msgResetPage));
        emitter.on(['before-reset-page-length'],
            ()=> this.message(this.msgResetPageLength));
        emitter.on(['before-loading-extensions'],
            ()=> this.message(this.msgLoadExtensions));
        emitter.on(['before-loading-themes'],
            ()=> this.message(this.msgLoadThemes));

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
            ()=> this.message('')
        );

        this.initialized = true;
    }

    message(t=''){
        if(!this.isEnabled()){
            return;
        }

        if(this.onBeforeShowMsg){
            this.onBeforeShowMsg.call(null, this.tf, t);
        }

        let d = t==='' ? this.statusBarCloseDelay : 1;
        global.setTimeout(() => {
            if(!this.initialized){
                return;
            }
            this.statusBarSpan.innerHTML = t;
            if(this.onAfterShowMsg){
                this.onAfterShowMsg.call(null, this.tf, t);
            }
        }, d);
    }

    destroy(){
        if(!this.initialized){
            return;
        }

        let emitter = this.emitter;

        this.statusBarDiv.innerHTML = '';
        if(!this.statusBarTgtId){
            Dom.remove(this.statusBarDiv);
        }
        this.statusBarSpan = null;
        this.statusBarSpanText = null;
        this.statusBarDiv = null;

        // Unsubscribe to events
        emitter.off(['before-filtering'], ()=> this.message(this.msgFilter));
        emitter.off(['before-populating-filter'],
            ()=> this.message(this.msgPopulate));
        emitter.off(['before-changing-page'],
            ()=> this.message(this.msgChangePage));
        emitter.off(['before-clearing-filters'],
            ()=> this.message(this.msgClear));
        emitter.off(['before-changing-results-per-page'],
            ()=> this.message(this.msgChangeResults));
        emitter.off(['before-reset-page'], ()=>
            this.message(this.msgResetPage));
        emitter.off(['before-reset-page-length'],
            ()=> this.message(this.msgResetPageLength));
        emitter.off(['before-loading-extensions'],
            ()=> this.message(this.msgLoadExtensions));
        emitter.off(['before-loading-themes'],
            ()=> this.message(this.msgLoadThemes));

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
            ()=> this.message('')
        );

        this.initialized = false;
    }

}
