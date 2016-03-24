import {Feature} from './feature';
import {Hash} from './hash';
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

        // hash enabled by default if state setting is simply set true
        this.enableHash = (cfg.types && cfg.types.indexOf('hash') !== -1) ||
            tf.state === true;
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

    /**
     * Initializes the State object
     */
    init() {
        if (this.initialized) {
            return;
        }

        this.emitter.on(['after-filtering'], () => this.update());
        this.emitter.on(['after-page-change'],
            (tf, pageNb) => this.updatePage(pageNb));
        this.emitter.on(['after-page-length-change'],
            (tf, index) => this.updatePageLength(index));

        if (this.enableHash) {
            this.hash = new Hash(this);
            this.hash.init();
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
     * Destroy State instance
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        this.state = {};

        this.emitter.off(['after-filtering'], () => this.update());
        this.emitter.off(['after-page-change'],
            (tf, pageNb) => this.updatePage(pageNb));
        this.emitter.off(['after-page-length-change'],
            (tf, index) => this.updatePageLength(index));

        if (this.enableHash) {
            this.hash.destroy();
            this.hash = null;
        }

        this.initialized = false;
    }
}
