import {Feature} from '../feature';
import {createElm, createText, elm, removeElm} from '../dom';
import {isFn} from '../types';

export class RowsCounter extends Feature {

    /**
     * Rows counter
     * @param {Object} tf TableFilter instance
     */
    constructor(tf) {
        super(tf, 'rowsCounter');

        // TableFilter configuration
        var f = this.config;

        //id of custom container element
        this.rowsCounterTgtId = f.rows_counter_target_id || null;
        //element containing tot nb rows
        this.rowsCounterDiv = null;
        //element containing tot nb rows label
        this.rowsCounterSpan = null;
        //defines rows counter text
        this.rowsCounterText = f.rows_counter_text || 'Rows: ';
        this.fromToTextSeparator = f.from_to_text_separator || '-';
        this.overText = f.over_text || ' / ';
        //defines css class rows counter
        this.totRowsCssClass = f.tot_rows_css_class || 'tot';
        //rows counter div
        this.prfxCounter = 'counter_';
        //nb displayed rows label
        this.prfxTotRows = 'totrows_span_';
        //label preceding nb rows label
        this.prfxTotRowsTxt = 'totRowsTextSpan_';
        //callback raised before counter is refreshed
        this.onBeforeRefreshCounter = isFn(f.on_before_refresh_counter) ?
            f.on_before_refresh_counter : null;
        //callback raised after counter is refreshed
        this.onAfterRefreshCounter = isFn(f.on_after_refresh_counter) ?
            f.on_after_refresh_counter : null;
    }

    init() {
        if (this.initialized) {
            return;
        }

        var tf = this.tf;

        //rows counter container
        var countDiv = createElm('div', ['id', this.prfxCounter + tf.id]);
        countDiv.className = this.totRowsCssClass;
        //rows counter label
        var countSpan = createElm('span', ['id', this.prfxTotRows + tf.id]);
        var countText = createElm('span', ['id', this.prfxTotRowsTxt + tf.id]);
        countText.appendChild(createText(this.rowsCounterText));

        // counter is added to defined element
        if (!this.rowsCounterTgtId) {
            tf.setToolbar();
        }
        var targetEl = !this.rowsCounterTgtId ?
            tf.lDiv : elm(this.rowsCounterTgtId);

        //default container: 'lDiv'
        if (!this.rowsCounterTgtId) {
            countDiv.appendChild(countText);
            countDiv.appendChild(countSpan);
            targetEl.appendChild(countDiv);
        }
        else {
            //custom container, no need to append statusDiv
            targetEl.appendChild(countText);
            targetEl.appendChild(countSpan);
        }
        this.rowsCounterDiv = countDiv;
        this.rowsCounterSpan = countSpan;

        // subscribe to events
        this.emitter.on(['after-filtering', 'grouped-by-page'],
            () => this.refresh(tf.getValidRowsNb()));
        this.emitter.on(['rows-changed'], () => this.refresh());

        this.initialized = true;
        this.refresh();
    }

    refresh(p) {
        if (!this.initialized || !this.isEnabled()) {
            return;
        }

        var tf = this.tf;

        if (this.onBeforeRefreshCounter) {
            this.onBeforeRefreshCounter.call(null, tf, this.rowsCounterSpan);
        }

        var totTxt;
        if (!tf.paging) {
            if (p && p !== '') {
                totTxt = p;
            } else {
                totTxt = tf.getFilterableRowsNb() - tf.nbHiddenRows;
            }
        } else {
            var paging = tf.feature('paging');
            if (paging) {
                //paging start row
                var pagingStartRow = parseInt(paging.startPagingRow, 10) +
                    ((tf.getValidRowsNb() > 0) ? 1 : 0);
                var pagingEndRow =
                    (pagingStartRow + paging.pagingLength) - 1 <=
                    tf.getValidRowsNb() ?
                        pagingStartRow + paging.pagingLength - 1 :
                        tf.getValidRowsNb();
                totTxt = pagingStartRow + this.fromToTextSeparator +
                    pagingEndRow + this.overText + tf.getValidRowsNb();
            }
        }

        this.rowsCounterSpan.innerHTML = totTxt;
        if (this.onAfterRefreshCounter) {
            this.onAfterRefreshCounter.call(
                null, tf, this.rowsCounterSpan, totTxt);
        }
    }

    destroy() {
        if (!this.initialized) {
            return;
        }

        if (!this.rowsCounterTgtId && this.rowsCounterDiv) {
            removeElm(this.rowsCounterDiv);
        } else {
            elm(this.rowsCounterTgtId).innerHTML = '';
        }
        this.rowsCounterSpan = null;
        this.rowsCounterDiv = null;

        // unsubscribe to events
        this.emitter.off(['after-filtering', 'grouped-by-page'],
            () => this.refresh(tf.getValidRowsNb()));
        this.emitter.off(['rows-changed'], () => this.refresh());

        this.initialized = false;
    }
}
