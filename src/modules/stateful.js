import {Feature} from './feature';
import Str from '../string';
import Event from '../event';
import Types from '../types';

const global = window;
const JSON = global.JSON;
const location = global.location;
const hasHashChange = () => {
    var docMode = global.documentMode;
    return ('onhashchange' in global) && (docMode === undefined || docMode > 7);
};

export class Stateful extends Feature {

    /**
     * Creates an instance of Stateful.
     *
     * @param tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'stateful');

        let cfg = this.config.stateful;

        this.persistFilters = cfg.filters === false ? false : true;
        this.persistPageNumber = Boolean(cfg.page_number);
        this.persistPageLength = Boolean(cfg.page_length);

        this.pageNb = null;
        this.pageLength = null;
        this.lastHash = null;

        this.state = {};
        this.prfxCol = 'col_';
        this.pageNbKey = 'page';
        this.pageLengthKey = 'results';
    }

    init() {
        if (this.initialized || !hasHashChange()) {
            return;
        }

        this.emitter.on(['initialized'], () => this.sync());
        this.emitter.on(['after-filtering'], () => this.update());
        this.emitter.on(['after-page-change'],
            (tf, pageNb) => this.updatePage(pageNb));
        this.emitter.on(['after-page-length-change'],
            (tf, index) => this.updatePageLength(index));

        Event.add(global, 'hashchange', () => this.sync());

        this.lastHash = location.hash;
        this.initialized = true;
    }

    format() {
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

        return `#${JSON.stringify(this.state)}`;
    }

    parse(hash) {
        if (hash.indexOf('#') === 0) {
            hash = hash.substr(1);
        } else {
            hash = '{}';
        }
        return JSON.parse(hash);
    }

    update() {
        let hash = this.format();
        console.log(hash, this.lastHash, this.lastHash === hash);
        if (this.lastHash === hash) {
            return;
        }

        location.hash = hash;
        this.lastHash = hash;
    }

    updatePage(pageNb){
        this.pageNb = pageNb;
        this.update();
    }

    updatePageLength(pageLength){
        this.pageLength = pageLength;
        this.update();
    }

    sync() {
        let state = this.parse(location.hash);
        console.log('sync',state);
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
            this.emitter.emit('change-page', this.tf, pageNumber);
        }

        if(this.persistPageLength){
            let pageLength = state[this.pageLengthKey];
            this.emitter.emit('change-page-results', this.tf, pageLength);
        }
    }

    destroy() {
        if (!this.initialized) {
            return;
        }

        this.emitter.off(['initialized'], () => this.sync());
        this.emitter.off(['after-filtering'], () => this.update());
        this.emitter.off(['after-page-change'],
            (tf, pageNb) => this.updatePage(pageNb));
        this.emitter.off(['after-page-length-change'],
            (tf, index) => this.updatePageLength(index));

        Event.remove(global, 'hashchange', () => this.sync());
        this.initialized = false;
    }
}
