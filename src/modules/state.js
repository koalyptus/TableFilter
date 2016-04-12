import {Feature} from './feature';
import {Hash} from './hash';
import {Storage} from './storage';
import Str from '../string';
import Types from '../types';

/**
 * Reflects the state of features to be persisted via hash, localStorage or
 * cookie
 *
 * @export
 * @class State
 * @extends {Feature}
 */
export class State extends Feature {

    /**
     * Creates an instance of State
     *
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'state');

        let cfg = this.config.state;

        this.enableHash = cfg === true ||
            (Types.isObj(cfg.types) && cfg.types.indexOf('hash') !== -1);
        this.enableLocalStorage = Types.isObj(cfg.types) &&
            cfg.types.indexOf('local_storage') !== -1;
        this.enableCookie = Types.isObj(cfg.types) &&
            cfg.types.indexOf('cookie') !== -1;
        this.persistFilters = cfg.filters === false ? false : true;
        this.persistPageNumber = Boolean(cfg.page_number);
        this.persistPageLength = Boolean(cfg.page_length);
        this.persistSort = Boolean(cfg.sort);
        this.cookieDuration = !isNaN(cfg.cookie_duration) ?
            parseInt(cfg.cookie_duration, 10) : 87600;

        this.hash = null;
        this.pageNb = null;
        this.pageLength = null;
        this.sortIndex = null;

        this.state = {};
        this.prfxCol = 'col_';
        this.pageNbKey = 'page';
        this.pageLengthKey = 'page_length';
    }

    /**
     * Initializes the State object
     */
    init() {
        if (this.initialized) {
            return;
        }

        this.emitter.on(['after-filtering'], () => this.update());
        this.emitter.on(['after-page-change', 'after-clearing-filters'],
            (tf, pageNb) => this.updatePage(pageNb));
        this.emitter.on(['after-page-length-change'],
            (tf, index) => this.updatePageLength(index));
        this.emitter.on(['column-sorted'],
            (tf, index) => this.updateSort(index));

        if (this.enableHash) {
            this.hash = new Hash(this);
            this.hash.init();
        }
        if (this.enableLocalStorage || this.enableCookie) {
            this.storage = new Storage(this);
            this.storage.init();
        }
        this.initialized = true;
    }


    /**
     * Update state field based on current features state
     */
    update() {
        if (!this.isEnabled()) {
            return;
        }
        let tf = this.tf;

        if (this.persistFilters) {
            let filterValues = tf.getFiltersValue();

            filterValues.forEach((val, idx) => {
                let key = `${this.prfxCol}${idx}`;

                if (Types.isString(val) && Str.isEmpty(val)) {
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
            if (Types.isNull(this.pageNb)) {
                this.state[this.pageNbKey] = undefined;
            } else {
                this.state[this.pageNbKey] = this.pageNb;
            }
        }

        if (this.persistPageLength) {
            if (Types.isNull(this.pageLength)) {
                this.state[this.pageLengthKey] = undefined;
            } else {
                this.state[this.pageLengthKey] = this.pageLength;
            }
        }

        if(this.persistSort){
            let key = `${this.prfxCol}${this.sortIndex}`;
        }

        this.emitter.emit('state-changed', tf, this.state);
    }

    /**
     * Refresh page number field on page number change
     *
     * @param pageNb Current page number
     */
    updatePage(pageNb) {
        this.pageNb = pageNb;
        this.update();
    }

    /**
     * Refresh page length field on page length change
     *
     * @param pageLength Current page length value
     */
    updatePageLength(pageLength) {
        this.pageLength = pageLength;
        this.update();
    }

    updateSort(index){
        this.sortIndex = index;
        this.update();
    }

    /**
     * Override state field
     *
     * @param state State object
     */
    override(state) {
        this.state = state;
    }

    /**
     * Apply current features state
     */
    sync() {
        let state = this.state;
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

        if (this.persistPageLength) {
            let pageLength = state[this.pageLengthKey];
            this.emitter.emit('change-page-results', this.tf, pageLength);
        }
    }

    /**
     * Override current state with passed one and sync features
     *
     * @param state State object
     */
    overrideAndSync(state) {
        // To prevent state to react to features changes, state is temporarily
        // disabled
        this.disable();
        // State is overriden with passed state object
        this.override(state);
        // New hash state is applied to features
        this.sync();
        // State is re-enabled
        this.enable();
    }

    /**
     * Destroy State instance
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        this.state = {};

        this.emitter.off(['after-filtering'], () => this.update());
        this.emitter.off(['after-page-change', 'after-clearing-filters'],
            (tf, pageNb) => this.updatePage(pageNb));
        this.emitter.off(['after-page-length-change'],
            (tf, index) => this.updatePageLength(index));
        this.emitter.off(['column-sorted'],
            (tf, index) => this.updateSort(index));

        if (this.enableHash) {
            this.hash.destroy();
            this.hash = null;
        }

        if (this.enableLocalStorage || this.enableCookie) {
            this.storage.destroy();
            this.storage = null;
        }

        this.initialized = false;
    }
}
