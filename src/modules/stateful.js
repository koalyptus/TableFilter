import {Feature} from './feature';
import Str from '../string';
import Event from '../event';

const global = window;
const JSON = global.JSON;
const location = global.location;
const hasHashChange = () => {
    var docMode = global.documentMode;
    return ('onhashchange' in global) && (docMode === undefined || docMode > 7);
};

export class Stateful extends Feature {

    /**
     * Makes features stateful via URL hash
     * @param {Object} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'stateful');

        let cfg = this.config.stateful;

        this.persistFilters = cfg.filters === false ? false : true;
        this.persistPageNumber = Boolean(cfg.page_number);
        this.persistPageLength = Boolean(cfg.page_length);

        this.pageNb = null;
        this.lastHash = null;
        this.state = {};
        this.prfxCol = 'col_';
        this.pageNbKey = 'page';
        this.pageResultsKey = 'results';
    }

    init() {
        if (this.initialized || !hasHashChange()) {
            return;
        }

        this.emitter.on(['initialized'], () => this.sync());
        this.emitter.on([
            'after-filtering',
            'after-page-change',
            'after-page-length-change'
        ], () => this.update());

        Event.add(global, 'hashchange', () => this.sync());

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
            let pageNumber = tf.feature('paging').getPage();
            this.state[this.pageNbKey] = pageNumber;
        }

        if (this.persistPageLength) {

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

    sync() {
        let state = this.parse(location.hash);
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
            tf.feature('paging').setPage(pageNumber);
        }
    }

    destroy() {
        if (!this.initialized) {
            return;
        }

        this.emitter.on(['initialized'], () => this.sync());
        this.emitter.off([
            'after-filtering',
            'after-page-change',
            'after-page-length-change'
        ], () => this.update());

        Event.remove(global, 'hashchange', () => this.sync());

        this.initialized = false;
    }
}
