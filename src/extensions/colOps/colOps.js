import {Feature} from '../../feature';
import {createText, elm} from '../../dom';
import {isArray, isFn, isUndef, EMPTY_FN} from '../../types';
import {numSortAsc} from '../../sort';

const EVENTS = [
    'after-filtering',
    'after-page-change',
    'after-page-length-change'
];

/**
 * Column calculations extension
 */
export default class ColOps extends Feature {

    /**
     * Creates an instance of ColOps
     *
     * @param {TableFilter} tf TableFilter instance
     * @param {Object} opts Configuration object
     */
    constructor(tf, opts) {
        super(tf, opts.name);

        /**
         * Callback fired before columns operations start
         * @type {Function}
         */
        this.onBeforeOperation = isFn(opts.on_before_operation) ?
            opts.on_before_operation : EMPTY_FN;

        /**
         * Callback fired after columns operations are completed
         * @type {Function}
         */
        this.onAfterOperation = isFn(opts.on_after_operation) ?
            opts.on_after_operation : EMPTY_FN;

        /**
         * Configuration options
         * @type {Object}
         */
        this.opts = opts;

        this.enable();
    }

    /**
     * Initializes ColOps instance
     */
    init() {
        if (this.initialized) {
            return;
        }
        // subscribe to events
        this.emitter.on(EVENTS, () => this.calc());

        this.calc();

        /**
         * @inherited
         */
        this.initialized = true;
    }

    /**
     * Calculates columns' values
     * Configuration options are stored in 'opts' property
     * - 'id' contains ids of elements showing result (array)
     * - 'col' contains the columns' indexes (array)
     * - 'operation' contains operation type (array, values: 'sum', 'mean',
     *   'min', 'max', 'median', 'q1', 'q3')
     * - 'write_method' array defines which method to use for displaying the
     *    result (innerHTML, setValue, createTextNode) - default: 'innerHTML'
     * - 'tot_row_index' defines in which row results are displayed
     *   (integers array)
     *
     * - changes made by Nuovella:
     * (1) optimized the routine (now it will only process each column once),
     * (2) added calculations for the median, lower and upper quartile.
     */
    calc() {
        let tf = this.tf;
        if (!tf.isInitialized()) {
            return;
        }

        this.onBeforeOperation(tf, this);
        this.emitter.emit('before-column-operation', tf, this);

        let opts = this.opts,
            labelId = opts.id,
            colIndexes = opts.col,
            operation = opts.operation,
            outputType = opts.write_method,
            totRowIndex = opts.tot_row_index,
            excludeRow = opts.exclude_row,
            decimalPrecision = isUndef(opts.decimal_precision) ?
                2 : opts.decimal_precision;

        //nuovella: determine unique list of columns to operate on
        let uColIdx = [],
            uColMax = 0;
        uColIdx[uColMax] = colIndexes[0];

        for (let ii = 1; ii < colIndexes.length; ii++) {
            let saved = 0;
            //see if colIndexes[ii] is already in the list of unique indexes
            for (let jj = 0; jj <= uColMax; jj++) {
                if (uColIdx[jj] === colIndexes[ii]) {
                    saved = 1;
                }
            }
            //if not saved then, save the index
            if (saved === 0) {
                uColMax++;
                uColIdx[uColMax] = colIndexes[ii];
            }
        }

        if (isArray(labelId) && isArray(colIndexes) && isArray(operation)) {
            let rows = tf.tbl.rows,
                colValues = [],
                uCol = 0;

            for (; uCol <= uColMax; uCol++) {
                //this retrieves col values
                //use uColIdx because we only want to pass through this loop
                //once for each column get the values in this unique column
                colValues.push(tf
                    .getFilteredDataCol(uColIdx[uCol], false, true, excludeRow)
                );

                let curValues = colValues[uCol];

                //next: calculate all operations for this column
                let result,
                    meanValue = 0,
                    sumValue = 0,
                    minValue = null,
                    maxValue = null,
                    q1Value = null,
                    medValue = null,
                    q3Value = null,
                    meanFlag = false,
                    sumFlag = false,
                    minFlag = false,
                    maxFlag = false,
                    q1Flag = false,
                    medFlag = false,
                    q3Flag = false,
                    operations = [],
                    precisions = [],
                    labels = [],
                    writeType,
                    idx = -1,
                    k = 0,
                    i = 0;

                for (; k < colIndexes.length; k++) {
                    if (colIndexes[k] !== uColIdx[uCol]) {
                        continue;
                    }

                    idx++;
                    operations[idx] = operation[k].toLowerCase();
                    precisions[idx] = decimalPrecision[k];
                    labels[idx] = labelId[k];
                    writeType = isArray(outputType) ? outputType[k] : null;

                    switch (operations[idx]) {
                        case 'mean':
                            meanFlag = true;
                            break;
                        case 'sum':
                            sumFlag = true;
                            break;
                        case 'min':
                            minFlag = true;
                            break;
                        case 'max':
                            maxFlag = true;
                            break;
                        case 'median':
                            medFlag = true;
                            break;
                        case 'q1':
                            q1Flag = true;
                            break;
                        case 'q3':
                            q3Flag = true;
                            break;
                    }
                }

                //sort the values for calculation of median and quartiles
                if (q1Flag || q3Flag || medFlag) {
                    curValues = this.sortColumnValues(curValues, numSortAsc);
                }

                if (sumFlag || meanFlag) {
                    sumValue = this.calcSum(curValues);
                }
                if (maxFlag) {
                    maxValue = this.calcMax(curValues);
                }
                if (minFlag) {
                    minValue = this.calcMin(curValues);
                }
                if (meanFlag) {
                    meanValue = sumValue / curValues.length;
                }
                if (medFlag) {
                    medValue = this.calcMedian(curValues);
                }
                if (q1Flag) {
                    q1Value = this.calcQ1(curValues);
                }
                if (q3Flag) {
                    q3Value = this.calcQ3(curValues);
                }

                for (; i <= idx; i++) {
                    switch (operations[i]) {
                        case 'mean':
                            result = meanValue;
                            break;
                        case 'sum':
                            result = sumValue;
                            break;
                        case 'min':
                            result = minValue;
                            break;
                        case 'max':
                            result = maxValue;
                            break;
                        case 'median':
                            result = medValue;
                            break;
                        case 'q1':
                            result = q1Value;
                            break;
                        case 'q3':
                            result = q3Value;
                            break;
                    }

                    this.writeResult(
                        result,
                        labels[i],
                        writeType,
                        precisions[i]
                    );

                }//for i

                // row(s) with result are always visible
                let totRow = totRowIndex && totRowIndex[uCol] ?
                    rows[totRowIndex[uCol]] : null;
                if (totRow) {
                    totRow.style.display = '';
                }
            }//for uCol
        }//if typeof

        this.onAfterOperation(tf, this);
        this.emitter.emit('after-column-operation', tf, this);
    }

    columnCalc(colIndex, operation = 'sum', precision = 2) {
        let result;
        let colValues = [];
        let excludeRows = this.opts.exclude_row || [];
        let sumValue = 0;

        colValues =
            this.tf.getFilteredDataCol(colIndex, false, true, excludeRows);

        if (operation === 'q1' || operation === 'q3' ||
            operation === 'median') {
            colValues = this.sortColumnValues(colValues, numSortAsc);
        }

        if (operation === 'sum' || operation === 'mean') {
            sumValue = this.calcSum(colValues);
        }

        switch (operation) {
            case 'mean':
                result = sumValue / colValues.length;
                break;
            case 'sum':
                result = sumValue;
                break;
            case 'min':
                result = this.calcMin(colValues);
                break;
            case 'max':
                result = this.calcMax(colValues);
                break;
            case 'median':
                result = this.calcMedian(colValues);
                break;
            case 'q1':
                result = this.calcQ1(colValues);
                break;
            case 'q3':
                result = this.calcQ3(colValues);
                break;
        }

        return result.toFixed(precision);
    }

    calcSum(values = []) {
        console.log(values);
        return values.reduce((x, y) => x + y);
    }

    calcMax(values = []) {
        return Math.max.apply(null, values);
    }

    calcMin(values = []) {
        return Math.min.apply(null, values);
    }

    calcMedian(values = []) {
        let nbValues = values.length;
        let aux = 0;
        if (nbValues % 2 === 1) {
            aux = Math.floor(nbValues / 2);
            return values[aux];
        } else {
            return (values[nbValues / 2] +
                values[((nbValues / 2) - 1)]) / 2;
        }
    }

    calcQ1(values = []) {
        let nbValues = values.length;
        let posa = 0.0;
        posa = Math.floor(nbValues / 4);
        if (4 * posa === nbValues) {
            return (values[posa - 1] + values[posa]) / 2;
        } else {
            return values[posa];
        }
    }

    calcQ3(values = []) {
        let nbValues = values.length;
        let posa = 0.0;
        let posb = 0.0;
        posa = Math.floor(nbValues / 4);
        if (4 * posa === nbValues) {
            posb = 3 * posa;
            return (values[posb] + values[posb - 1]) / 2;
        } else {
            return values[nbValues - posa - 1];
        }
    }

    sortColumnValues(values = [], sorter) {
        return values.sort(sorter);
    }

    writeResult(result = 0, label, writeType = 'innerhtml', precision = 2) {
        let labelElm = elm(label);

        if (!labelElm) {
            return;
        }

        result = result.toFixed(precision);
        if (isNaN(result) || !isFinite(result)) {
            result = '';
        }

        switch (writeType.toLowerCase()) {
            case 'innerhtml':
                labelElm.innerHTML = result;
                break;
            case 'setvalue':
                labelElm.value = result;
                break;
            case 'createtextnode':
                let oldnode = labelElm.firstChild;
                let txtnode = createText(result);
                labelElm.replaceChild(txtnode, oldnode);
                break;
        }

    }

    /**
     * Remove extension
     */
    destroy() {
        if (!this.initialized) {
            return;
        }
        // unsubscribe to events
        this.emitter.off(EVENTS, () => this.calc());

        this.initialized = false;
    }

}
