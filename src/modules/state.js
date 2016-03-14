import {Feature} from './feature';

const global = window;
const hasHashChange = ()=> {
    var docMode = global.documentMode;
    return ('onhashchange' in global) && (docMode === undefined || docMode > 7);
};

export class State extends Feature{

    /**
     * Makes selected features stateful via URL hash
     * @param {Object} tf TableFilter instance
     */
    constructor(tf){
        super(tf, 'state');

        //configuration object
        let cfg = this.config.stateful;

        this.filters = cfg.filters === false ? false : true;

        this.lastHash = null;
        this.hashObj = {};
    }

    init(){
        if(this.initialized || !hasHashChange()){
            return;
        }

        // subscribe to after-filtering event
        this.emitter.on(['after-filtering'], ()=> this.update());

        this.initialized = true;
    }

    formatHash(){
        if(this.filters){
            let filterValues = this.tf.getFiltersValue();

            filterValues.forEach((val, idx)=> {
                this.hashObj['col_' + idx] = this.hashObj['col_' + idx] || {};
                this.hashObj['col_' + idx]['flt'] = val;
            });
        }

        return `#${JSON.stringify(this.hashObj)}`;
    }

    update(){
        let hash = this.formatHash();
        console.log(hash, this.lastHash, this.lastHash === hash);
        if(this.lastHash === hash){
            return;
        }

        global.location.hash = hash;
        this.lastHash = hash;
    }

    destroy(){
        if(!this.initialized){
            return;
        }

        this.emitter.off(['after-filtering'], ()=> this.update());

        this.initialized = false;
    }
}
