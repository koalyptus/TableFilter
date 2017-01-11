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

        /**
         * List of results per column
         * @type {Array}
         * @private
         */
        // this.list = [];

        // this.operations = [];

        // this.precisions = [];

        // this.labels = [];

        // this.writeType = null;

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
            //if not saved then, save the index;
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
                colValues.push(
                    tf.getColValues(uColIdx[uCol], false, true, excludeRow)
                );

                //next: calculate all operations for this column
                let result,
                    nbValues = 0,
                    // temp,
                    meanValue = 0,
                    sumValue = 0,
                    minValue = null,
                    maxValue = null,
                    q1Value = null,
                    medValue = null,
                    q3Value = null,
                    meanFlag = 0,
                    sumFlag = 0,
                    minFlag = 0,
                    maxFlag = 0,
                    q1Flag = 0,
                    medFlag = 0,
                    q3Flag = 0,
                    // theList = [],
                    // opsThisCol = [],
                    // decThisCol = [],
                    // labThisCol = [],
                    // oTypeThisCol = [],
                    list = [],
                    operations = [],
                    precisions = [],
                    labels = [],
                    writeType,
                    idx = -1,
                    k = 0,
                    j = 0,
                    i = 0;

                for (; k < colIndexes.length; k++) {
                    if (colIndexes[k] === uColIdx[uCol]) {
                        idx++;
                        operations[idx] = operation[k].toLowerCase();
                        precisions[idx] = decimalPrecision[k];
                        labels[idx] = labelId[k];
                        writeType = isArray(outputType) ? outputType[k] : null;

                        switch (operations[idx]) {
                            case 'mean':
                                meanFlag = 1;
                                break;
                            case 'sum':
                                sumFlag = 1;
                                break;
                            case 'min':
                                minFlag = 1;
                                break;
                            case 'max':
                                maxFlag = 1;
                                break;
                            case 'median':
                                medFlag = 1;
                                break;
                            case 'q1':
                                q1Flag = 1;
                                break;
                            case 'q3':
                                q3Flag = 1;
                                break;
                        }
                    }
                }

                //sort the list for calculation of median and quartiles
                if ((q1Flag === 1) || (q3Flag === 1) || (medFlag === 1)) {
                    colValues[uCol] =
                        this.sortColumnValues(colValues[uCol], numSortAsc);
                }

                for (; j < colValues[uCol].length; j++) {
                    //sort the list for calculation of median and quartiles
                    // if ((q1Flag === 1) || (q3Flag === 1) ||
                    // (medFlag === 1)) {
                    //     if (j < colValues[uCol].length - 1) {
                    //         for (k = j + 1; k < colValues[uCol].length; k++){
                    //             /* eslint-disable */
                    //             if (eval(colValues[uCol][k]) <
                    //                 eval(colValues[uCol][j])) {
                    //                 /* eslint-enable */
                    //                 temp = colValues[uCol][j];
                    //                 colValues[uCol][j] = colValues[uCol][k];
                    //                 colValues[uCol][k] = temp;
                    //             }
                    //         }
                    //     }
                    // }
                    let cValue = parseFloat(colValues[uCol][j]);
                    list[j] = cValue;

                    if (!isNaN(cValue)) {
                        nbValues++;
                        if (sumFlag === 1 || meanFlag === 1) {
                            sumValue += parseFloat(cValue);
                        }
                        // if (minFlag === 1) {
                        //     if (minValue === null) {
                        //         minValue = parseFloat(cValue);
                        //     } else {
                        //         minValue = parseFloat(cValue) < minValue ?
                        //             parseFloat(cValue) : minValue;
                        //     }
                        // }
                        // if (maxFlag === 1) {
                        //     if (maxValue === null) {
                        //         maxValue = parseFloat(cValue);
                        //     } else {
                        //         maxValue = parseFloat(cValue) > maxValue ?
                        //             parseFloat(cValue) : maxValue;
                        //     }
                        // }
                    }
                }//for j

                if (sumFlag === 1 || meanFlag === 1) {

                }
                if (maxFlag === 1) {
                    maxValue = this.calcMax(colValues[uCol]);
                }
                if (minFlag === 1) {
                    minValue = this.calcMin(colValues[uCol]);
                }

                if (meanFlag === 1) {
                    meanValue = sumValue / nbValues;
                }
                if (medFlag === 1) {
                    let aux = 0;
                    if (nbValues % 2 === 1) {
                        aux = Math.floor(nbValues / 2);
                        medValue = list[aux];
                    } else {
                        medValue = (list[nbValues / 2] +
                            list[((nbValues / 2) - 1)]) / 2;
                    }
                }
                let posa;
                if (q1Flag === 1) {
                    posa = 0.0;
                    posa = Math.floor(nbValues / 4);
                    if (4 * posa === nbValues) {
                        q1Value = (list[posa - 1] + list[posa]) / 2;
                    } else {
                        q1Value = list[posa];
                    }
                }
                if (q3Flag === 1) {
                    posa = 0.0;
                    let posb = 0.0;
                    posa = Math.floor(nbValues / 4);
                    if (4 * posa === nbValues) {
                        posb = 3 * posa;
                        q3Value = (list[posb] + list[posb - 1]) / 2;
                    } else {
                        q3Value = list[nbValues - posa - 1];
                    }
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

                    // let precision = !isNaN(precisions[i]) ?
                        // precisions[i] : 2;

                    this.writeResult(
                        result,
                        labels[i],
                        writeType,
                        precisions[i]
                    );

                    //if outputType is defined
                    // if (writeType && result) {
                    //     result = result.toFixed(precision);

                    //     if (elm(labels[i])) {
                    //         switch (writeType.toLowerCase()) {
                    //             case 'innerhtml':
                    //                 if (isNaN(result) || !isFinite(result) ||
                    //                     nbValues === 0) {
                    //                     elm(labels[i]).innerHTML = '.';
                    //                 } else {
                    //                     elm(labels[i]).innerHTML = result;
                    //                 }
                    //                 break;
                    //             case 'setvalue':
                    //                 elm(labels[i]).value = result;
                    //                 break;
                    //             case 'createtextnode':
                    //                 let oldnode =
                    //                     elm(labels[i]).firstChild;
                    //                 let txtnode = createText(result);
                    //                 elm(labels[i])
                    //                     .replaceChild(txtnode, oldnode);
                    //                 break;
                    //         }//switch
                    //     }
                    // } else {
                    //     try {
                    //         if (isNaN(result) || !isFinite(result) ||
                    //             nbValues === 0) {
                    //             elm(labels[i]).innerHTML = '.';
                    //         } else {
                    //             elm(labels[i]).innerHTML =
                    //                 result.toFixed(precision);
                    //         }
                    //     } catch (e) { }//catch
                    // }//else
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

    calcMax(values = []) {
        return Math.max.apply(null, values);
    }

    calcMin(values = []) {
        return Math.min.apply(null, values);
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
