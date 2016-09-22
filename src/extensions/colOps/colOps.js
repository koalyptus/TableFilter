import {Feature} from '../../feature';
import {createText, elm} from '../../dom';
import {isArray, isFn, isUndef} from '../../types';

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
            opts.on_before_operation : null;

        /**
         * Callback fired after columns operations are completed
         * @type {Function}
         */
        this.onAfterOperation = isFn(opts.on_after_operation) ?
            opts.on_after_operation : null;

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
        this.emitter.on(['after-filtering'], () => this.calc());

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

        if (this.onBeforeOperation) {
            this.onBeforeOperation.call(null, tf, this);
        }
        this.emitter.emit('before-column-operation', tf, this);

        let opts = this.opts,
            labelId = opts.id,
            colIndex = opts.col,
            operation = opts.operation,
            outputType = opts.write_method,
            totRowIndex = opts.tot_row_index,
            excludeRow = opts.exclude_row,
            decimalPrecision = isUndef(opts.decimal_precision) ?
                2 : opts.decimal_precision;

        //nuovella: determine unique list of columns to operate on
        let ucolIndex = [],
            ucolMax = 0;
        ucolIndex[ucolMax] = colIndex[0];

        for (let ii = 1; ii < colIndex.length; ii++) {
            let saved = 0;
            //see if colIndex[ii] is already in the list of unique indexes
            for (let jj = 0; jj <= ucolMax; jj++) {
                if (ucolIndex[jj] === colIndex[ii]) {
                    saved = 1;
                }
            }
            //if not saved then, save the index;
            if (saved === 0) {
                ucolMax++;
                ucolIndex[ucolMax] = colIndex[ii];
            }
        }

        if (isArray(labelId) && isArray(colIndex) && isArray(operation)) {
            let rows = tf.tbl.rows,
                colvalues = [],
                ucol = 0;

            for (; ucol <= ucolMax; ucol++) {
                //this retrieves col values
                //use ucolIndex because we only want to pass through this loop
                //once for each column get the values in this unique column
                colvalues.push(
                    tf.getColValues(ucolIndex[ucol], false, true, excludeRow));

                //next: calculate all operations for this column
                let result,
                    nbvalues = 0,
                    temp,
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
                    theList = [],
                    opsThisCol = [],
                    decThisCol = [],
                    labThisCol = [],
                    oTypeThisCol = [],
                    mThisCol = -1,
                    k = 0,
                    j = 0,
                    i = 0;

                for (; k < colIndex.length; k++) {
                    if (colIndex[k] === ucolIndex[ucol]) {
                        mThisCol++;
                        opsThisCol[mThisCol] = operation[k].toLowerCase();
                        decThisCol[mThisCol] = decimalPrecision[k];
                        labThisCol[mThisCol] = labelId[k];
                        oTypeThisCol = isArray(outputType) ?
                            outputType[k] : null;

                        switch (opsThisCol[mThisCol]) {
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

                for (; j < colvalues[ucol].length; j++) {
                    //sort the list for calculation of median and quartiles
                    if ((q1Flag === 1) || (q3Flag === 1) || (medFlag === 1)) {
                        if (j < colvalues[ucol].length - 1) {
                            for (k = j + 1; k < colvalues[ucol].length; k++) {
                                /* eslint-disable */
                                if (eval(colvalues[ucol][k]) <
                                    eval(colvalues[ucol][j])) {
                                    /* eslint-enable */
                                    temp = colvalues[ucol][j];
                                    colvalues[ucol][j] = colvalues[ucol][k];
                                    colvalues[ucol][k] = temp;
                                }
                            }
                        }
                    }
                    let cvalue = parseFloat(colvalues[ucol][j]);
                    theList[j] = parseFloat(cvalue);

                    if (!isNaN(cvalue)) {
                        nbvalues++;
                        if (sumFlag === 1 || meanFlag === 1) {
                            sumValue += parseFloat(cvalue);
                        }
                        if (minFlag === 1) {
                            if (minValue === null) {
                                minValue = parseFloat(cvalue);
                            } else {
                                minValue = parseFloat(cvalue) < minValue ?
                                    parseFloat(cvalue) : minValue;
                            }
                        }
                        if (maxFlag === 1) {
                            if (maxValue === null) {
                                maxValue = parseFloat(cvalue);
                            } else {
                                maxValue = parseFloat(cvalue) > maxValue ?
                                    parseFloat(cvalue) : maxValue;
                            }
                        }
                    }
                }//for j
                if (meanFlag === 1) {
                    meanValue = sumValue / nbvalues;
                }
                if (medFlag === 1) {
                    let aux = 0;
                    if (nbvalues % 2 === 1) {
                        aux = Math.floor(nbvalues / 2);
                        medValue = theList[aux];
                    } else {
                        medValue = (theList[nbvalues / 2] +
                            theList[((nbvalues / 2) - 1)]) / 2;
                    }
                }
                let posa;
                if (q1Flag === 1) {
                    posa = 0.0;
                    posa = Math.floor(nbvalues / 4);
                    if (4 * posa === nbvalues) {
                        q1Value = (theList[posa - 1] + theList[posa]) / 2;
                    } else {
                        q1Value = theList[posa];
                    }
                }
                if (q3Flag === 1) {
                    posa = 0.0;
                    let posb = 0.0;
                    posa = Math.floor(nbvalues / 4);
                    if (4 * posa === nbvalues) {
                        posb = 3 * posa;
                        q3Value = (theList[posb] + theList[posb - 1]) / 2;
                    } else {
                        q3Value = theList[nbvalues - posa - 1];
                    }
                }

                for (; i <= mThisCol; i++) {
                    switch (opsThisCol[i]) {
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

                    let precision = !isNaN(decThisCol[i]) ? decThisCol[i] : 2;

                    //if outputType is defined
                    if (oTypeThisCol && result) {
                        result = result.toFixed(precision);

                        if (elm(labThisCol[i])) {
                            switch (oTypeThisCol.toLowerCase()) {
                                case 'innerhtml':
                                    if (isNaN(result) || !isFinite(result) ||
                                        nbvalues === 0) {
                                        elm(labThisCol[i]).innerHTML = '.';
                                    } else {
                                        elm(labThisCol[i]).innerHTML = result;
                                    }
                                    break;
                                case 'setvalue':
                                    elm(labThisCol[i]).value = result;
                                    break;
                                case 'createtextnode':
                                    let oldnode =
                                        elm(labThisCol[i]).firstChild;
                                    let txtnode = createText(result);
                                    elm(labThisCol[i])
                                        .replaceChild(txtnode, oldnode);
                                    break;
                            }//switch
                        }
                    } else {
                        try {
                            if (isNaN(result) || !isFinite(result) ||
                                nbvalues === 0) {
                                elm(labThisCol[i]).innerHTML = '.';
                            } else {
                                elm(labThisCol[i]).innerHTML =
                                    result.toFixed(precision);
                            }
                        } catch (e) { }//catch
                    }//else
                }//for i

                // row(s) with result are always visible
                let totRow = totRowIndex && totRowIndex[ucol] ?
                    rows[totRowIndex[ucol]] : null;
                if (totRow) {
                    totRow.style.display = '';
                }
            }//for ucol
        }//if typeof

        if (this.onAfterOperation) {
            this.onAfterOperation.call(null, tf, this);
        }
        this.emitter.emit('after-column-operation', tf, this);
    }

    /**
     * Remove extension
     */
    destroy() {
        if (!this.initialized) {
            return;
        }
        // unsubscribe to events
        this.emitter.off(['after-filtering'], () => this.calc());
        this.initialized = false;
    }

}
