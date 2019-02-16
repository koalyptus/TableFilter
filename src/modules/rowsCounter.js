import {Feature} from '../feature';
import {createElm, createText, elm, removeElm} from '../dom';
import {EMPTY_FN, isNull} from '../types';
import {defaultsStr, defaultsFn} from '../settings';
import {LEFT} from './toolbar';

/**
 * Rows counter UI component
 * @export
 * @class RowsCounter
 * @extends {Feature}
 */
export class RowsCounter extends Feature {

    /**
     * Creates an instance of RowsCounter
     * @param {TableFilter} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, RowsCounter);

        // TableFilter configuration
        let f = this.config.rows_counter || {};

        /**
         * ID of custom container element
         * @type {String}
         */
        this.targetId = defaultsStr(f.target_id, null);

        /**
         * Container DOM element
         * @type {DOMElement}
         * @private
         */
        this.container = null;

        /**
         * Container DOM element for label displaying the total number of rows
         * @type {DOMElement}
         * @private
         */
        this.label = null;

        /**
         * Text preceding the total number of rows
         * @type {String}
         */
        this.text = defaultsStr(f.text, 'Rows: ');

        /**
         * Separator symbol appearing between the first and last visible rows of
         * current page when paging is enabled. ie: Rows: 31-40 / 70
         * @type {String}
         */
        this.fromToTextSeparator = defaultsStr(f.separator, '-');

        /**
         * Separator symbol appearing between the first and last visible rows of
         * current page and the total number of filterable rows when paging is
         * enabled. ie: Rows: 31-40 / 70
         * @type {String}
         */
        this.overText = defaultsStr(f.over_text, ' / ');

        /**
         * Css class for container element
         * @type {String}
         */
        this.cssClass = defaultsStr(f.css_class, 'tot');

        /**
         * Default position in toolbar ('left'|'center'|'right')
         * @type {String}
         */
        this.toolbarPosition = defaultsStr(f.toolbar_position, LEFT);

        /**
         * Callback fired before the counter is refreshed
         * @type {Function}
         */
        this.onBeforeRefreshCounter = defaultsFn(f.on_before_refresh_counter,
            EMPTY_FN);

        /**
         * Callback fired after the counter is refreshed
         * @type {Function}
         */
        this.onAfterRefreshCounter = defaultsFn(f.on_after_refresh_counter,
            EMPTY_FN);
    }

    /**
     * Initializes RowsCounter instance
     */
    init() {
        if (this.initialized) {
            return;
        }

        this.emitter.emit('initializing-feature', this, !isNull(this.targetId));

        let tf = this.tf;

        //rows counter container
        let countDiv = createElm('div');
        countDiv.className = this.cssClass;
        //rows counter label
        let countSpan = createElm('span');
        let countText = createElm('span');
        countText.appendChild(createText(this.text));

        // counter is added to defined element
        let targetEl = !this.targetId ?
            tf.feature('toolbar').container(this.toolbarPosition) :
            elm(this.targetId);

        //default container: 'lDiv'
        if (!this.targetId) {
            countDiv.appendChild(countText);
            countDiv.appendChild(countSpan);
            targetEl.appendChild(countDiv);
        } else {
            //custom container, no need to append statusDiv
            targetEl.appendChild(countText);
            targetEl.appendChild(countSpan);
        }
        this.container = countDiv;
        this.label = countSpan;

        // subscribe to events
        this.emitter.on(['after-filtering', 'grouped-by-page'],
            () => this.refresh(tf.getValidRowsNb()));
        this.emitter.on(['rows-changed'], () => this.refresh());

        /** @inherited */
        this.initialized = true;
        this.refresh();

        this.emitter.emit('feature-initialized', this);
    }

    /**
     * Refreshes the rows counter
     * @param {Number} p Optional parameter the total number of rows to display
     */
    refresh(p) {
        if (!this.initialized || !this.isEnabled()) {
            return;
        }

        let tf = this.tf;

        this.onBeforeRefreshCounter(tf, this.label);

        let totTxt;
        if (!tf.paging) {
            if (p && p !== '') {
                totTxt = p;
            } else {
                totTxt = tf.getFilterableRowsNb() - tf.nbHiddenRows;
            }
        } else {
            let paging = tf.feature('paging');
            if (paging) {
                let nbValidRows = tf.getValidRowsNb();
                //paging start row
                let pagingStartRow = parseInt(paging.startPagingRow, 10) +
                    ((nbValidRows > 0) ? 1 : 0);
                let pagingEndRow =
                    (pagingStartRow + paging.pageLength) - 1 <=
                    nbValidRows ?
                        pagingStartRow + paging.pageLength - 1 :
                        nbValidRows;
                totTxt = pagingStartRow + this.fromToTextSeparator +
                    pagingEndRow + this.overText + nbValidRows;
            }
        }

        this.label.innerHTML = totTxt;
        this.onAfterRefreshCounter(tf, this.label, totTxt);
    }

    /**
     * Remove feature
     */
    destroy() {
        if (!this.initialized) {
            return;
        }

        if (!this.targetId && this.container) {
            removeElm(this.container);
        } else {
            elm(this.targetId).innerHTML = '';
        }
        this.label = null;
        this.container = null;

        // unsubscribe to events
        this.emitter.off(['after-filtering', 'grouped-by-page'],
            () => this.refresh(tf.getValidRowsNb()));
        this.emitter.off(['rows-changed'], () => this.refresh());

        this.initialized = false;
    }
}
