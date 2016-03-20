import {Feature} from './feature';
import {Hash} from './hash';
import Str from '../string';
import Types from '../types';

export class State extends Feature {

    /**
     * Creates an instance of State
     *
     * @param tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'state');

        let cfg = this.config.state;

        this.enableHash = cfg.type && cfg.type.indexOf('hash') !== -1;
        this.persistFilters = cfg.filters === false ? false : true;
        this.persistPageNumber = Boolean(cfg.page_number);
        this.persistPageLength = Boolean(cfg.page_length);

        this.hash = null;
        this.pageNb = null;
        this.pageLength = null;

        this.state = {};
        this.prfxCol = 'col_';
        this.pageNbKey = 'page';
        this.pageLengthKey = 'page_length';
    }

    init() {
        if (this.initialized) {
            return;
        }

        this.emitter.on(['after-filtering'], () => this.update());
        this.emitter.on(['after-page-change'],
            (tf, pageNb) => this.updatePage(pageNb));
        this.emitter.on(['after-page-length-change'],
            (tf, index) => this.updatePageLength(index));

        if(this.enableHash){
            this.hash = new Hash(this);
            this.hash.init();
        }
        this.initialized = true;
    }

    update() {
        if(!this.isEnabled()){
            return;
        }
        let tf = this.tf;

        if (this.persistFilters) {
            let filterValues = tf.getFiltersValue();

            filterValues.forEach((val, idx) => {
                let key = `${this.prfxCol}${idx}`;

                if (Str.isEmpty(val)) {
                    if (this.state.hasOwnProperty(key)) {
                        this.state[key] = undefined;
                    }
                } else {
                    this.state[key] = this.state[key] || {};
                    this.state[key].flt = val;
                }

            });
        }

        if (this.persistPageNumber) {
            if(Types.isNull(this.pageNb)){
                this.state[this.pageNbKey] = undefined;
            } else {
                this.state[this.pageNbKey] = this.pageNb;
            }
        }

        if (this.persistPageLength) {
            if(Types.isNull(this.pageLength)){
                this.state[this.pageLengthKey] = undefined;
            } else {
                this.state[this.pageLengthKey] = this.pageLength;
            }
        }

        this.emitter.emit('state-changed', tf, this.state);
    }

    updatePage(pageNb){
        this.pageNb = pageNb;
        this.update();
    }

    updatePageLength(pageLength){
        this.pageLength = pageLength;
        this.update();
    }

    override(state){
        this.state = state;
    }

    sync() {
        let state = this.state;
        console.log('sync', state);
        let tf = this.tf;

        if (this.persistFilters) {
            Object.keys(state).forEach((key) => {
                if (key.indexOf(this.prfxCol) !== -1) {
                    let colIdx = parseInt(key.replace(this.prfxCol, ''), 10);
                    let val = state[key].flt;
                    tf.setFilterValue(colIdx, val);
                }
            });

            tf.filter();
        }

        if (this.persistPageNumber) {
            let pageNumber = state[this.pageNbKey];
            console.log('pageNumber',pageNumber);
            this.emitter.emit('change-page', this.tf, pageNumber);
        }

        if(this.persistPageLength){
            let pageLength = state[this.pageLengthKey];
            this.emitter.emit('change-page-results', this.tf, pageLength);
        }

        this.emitter.emit('state-synced', tf, this.state);
    }

    destroy() {
        if (!this.initialized) {
            return;
        }

        this.emitter.off(['after-filtering'], () => this.update());
        this.emitter.off(['after-page-change'],
            (tf, pageNb) => this.updatePage(pageNb));
        this.emitter.off(['after-page-length-change'],
            (tf, index) => this.updatePageLength(index));

        if(this.enableHash){
            this.hash.destroy();
            this.hash = null;
        }

        this.initialized = false;
    }
}
