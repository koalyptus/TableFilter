define(['../dom', '../string'], function (dom, str) {
    'use strict';

    /**
     * Column calculations
     * @param {Object} tf TableFilter instance
     */
    function ColOps(tf) {
        var f = tf.fObj;
        this.colOperation = f.col_operation;

        this.tf = tf;
    }

    /**
     * Calculates columns' values
     * Configuration options are stored in 'colOperation' property
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
    ColOps.prototype.set = function() {
        if(!this.tf.isFirstLoad && !this.tf.hasGrid){
            return;
        }

        if(this.tf.onBeforeOperation){
            this.tf.onBeforeOperation.call(null, this.tf);
        }

        var colOperation = this.colOperation,
            labelId = colOperation.id,
            colIndex = colOperation.col,
            operation = colOperation.operation,
            outputType = colOperation.write_method,
            totRowIndex = colOperation.tot_row_index,
            excludeRow = colOperation.exclude_row,
            decimalPrecision = colOperation.decimal_precision !== undefined ?
                colOperation.decimal_precision : 2;

        //nuovella: determine unique list of columns to operate on
        var ucolIndex = [],
            ucolMax = 0;
        ucolIndex[ucolMax] = colIndex[0];

        for(var ii=1; ii<colIndex.length; ii++){
            var saved = 0;
            //see if colIndex[ii] is already in the list of unique indexes
            for(var jj=0; jj<=ucolMax; jj++){
                if(ucolIndex[jj] === colIndex[ii]){
                    saved = 1;
                }
            }
            //if not saved then, save the index;
            if (saved === 0){
                ucolMax++;
                ucolIndex[ucolMax] = colIndex[ii];
            }
        }

        if(str.lower(typeof labelId)=='object' &&
            str.lower(typeof colIndex)=='object' &&
            str.lower(typeof operation)=='object'){
            var row = this.tf.tbl.rows,
                colvalues = [];

            for(var ucol=0; ucol<=ucolMax; ucol++){
                //this retrieves col values
                //use ucolIndex because we only want to pass through this loop
                //once for each column get the values in this unique column
                colvalues.push(
                    this.tf.GetColValues(ucolIndex[ucol], true, excludeRow));

                //next: calculate all operations for this column
                var result,
                    nbvalues=0,
                    temp,
                    meanValue=0,
                    sumValue=0,
                    minValue=null,
                    maxValue=null,
                    q1Value=null,
                    medValue=null,
                    q3Value=null,
                    meanFlag=0,
                    sumFlag=0,
                    minFlag=0,
                    maxFlag=0,
                    q1Flag=0,
                    medFlag=0,
                    q3Flag=0,
                    theList=[],
                    opsThisCol=[],
                    decThisCol=[],
                    labThisCol=[],
                    oTypeThisCol=[],
                    mThisCol=-1;

                for(var k=0; k<colIndex.length; k++){
                     if(colIndex[k] === ucolIndex[ucol]){
                        mThisCol++;
                        opsThisCol[mThisCol]=str.lower(operation[k]);
                        decThisCol[mThisCol]=decimalPrecision[k];
                        labThisCol[mThisCol]=labelId[k];
                        oTypeThisCol = outputType !== undefined &&
                            str.lower(typeof outputType)==='object' ?
                            outputType[k] : null;

                        switch(opsThisCol[mThisCol]){
                            case 'mean':
                                meanFlag=1;
                            break;
                            case 'sum':
                                sumFlag=1;
                            break;
                            case 'min':
                                minFlag=1;
                            break;
                            case 'max':
                                maxFlag=1;
                            break;
                            case 'median':
                                medFlag=1;
                                break;
                            case 'q1':
                                q1Flag=1;
                            break;
                            case 'q3':
                                q3Flag=1;
                            break;
                        }
                    }
                }

                for(var j=0; j<colvalues[ucol].length; j++){
                    //sort the list for calculation of median and quartiles
                    if((q1Flag==1)|| (q3Flag==1) || (medFlag==1)){
                        if (j<colvalues[ucol].length -1){
                            for(k=j+1; k<colvalues[ucol].length; k++) {
                                if(eval(colvalues[ucol][k]) <
                                    eval(colvalues[ucol][j])){
                                    temp = colvalues[ucol][j];
                                    colvalues[ucol][j] = colvalues[ucol][k];
                                    colvalues[ucol][k] = temp;
                                }
                            }
                        }
                    }
                    var cvalue = parseFloat(colvalues[ucol][j]);
                    theList[j] = parseFloat(cvalue);

                    if(!isNaN(cvalue)){
                        nbvalues++;
                        if(sumFlag===1 || meanFlag===1){
                            sumValue += parseFloat( cvalue );
                        }
                        if(minFlag===1){
                            if(minValue===null){
                                minValue = parseFloat( cvalue );
                            } else{
                                minValue = parseFloat( cvalue ) < minValue ?
                                    parseFloat( cvalue ): minValue;
                            }
                        }
                        if(maxFlag===1){
                            if (maxValue===null){
                                maxValue = parseFloat( cvalue );
                            } else {
                                maxValue = parseFloat( cvalue ) > maxValue ?
                                    parseFloat( cvalue ): maxValue;
                            }
                        }
                    }
                }//for j
                if(meanFlag===1){
                    meanValue = sumValue/nbvalues;
                }
                if(medFlag===1){
                    var aux = 0;
                    if(nbvalues%2 === 1){
                        aux = Math.floor(nbvalues/2);
                        medValue = theList[aux];
                    } else{
                        medValue =
                            (theList[nbvalues/2] + theList[((nbvalues/2)-1)])/2;
                    }
                }
                var posa;
                if(q1Flag===1){
                    posa=0.0;
                    posa = Math.floor(nbvalues/4);
                    if(4*posa == nbvalues){
                        q1Value = (theList[posa-1] + theList[posa])/2;
                    } else {
                        q1Value = theList[posa];
                    }
                }
                if (q3Flag===1){
                    posa=0.0;
                    var posb=0.0;
                    posa = Math.floor(nbvalues/4);
                    if (4*posa === nbvalues){
                        posb = 3*posa;
                        q3Value = (theList[posb] + theList[posb-1])/2;
                    } else {
                        q3Value = theList[nbvalues-posa-1];
                    }
                }

                for(var i=0; i<=mThisCol; i++){
                    switch( opsThisCol[i] ){
                        case 'mean':
                            result=meanValue;
                        break;
                        case 'sum':
                            result=sumValue;
                        break;
                        case 'min':
                            result=minValue;
                        break;
                        case 'max':
                            result=maxValue;
                        break;
                        case 'median':
                            result=medValue;
                            break;
                        case 'q1':
                            result=q1Value;
                        break;
                        case 'q3':
                            result=q3Value;
                        break;
                    }

                    var precision = !isNaN(decThisCol[i]) ? decThisCol[i] : 2;

                    //if outputType is defined
                    if(oTypeThisCol && result){
                        result = result.toFixed( precision );

                        if(dom.id(labThisCol[i])){
                            switch( str.lower(oTypeThisCol) ){
                                case 'innerhtml':
                                    if (isNaN(result) || !isFinite(result) ||
                                        nbvalues===0){
                                        dom.id(labThisCol[i]).innerHTML = '.';
                                    } else{
                                        dom.id(labThisCol[i]).innerHTML = result;
                                    }
                                break;
                                case 'setvalue':
                                    dom.id( labThisCol[i] ).value = result;
                                break;
                                case 'createtextnode':
                                    var oldnode = dom.id(labThisCol[i])
                                        .firstChild;
                                    var txtnode = dom.text(result);
                                    dom.id(labThisCol[i])
                                        .replaceChild(txtnode, oldnode);
                                break;
                            }//switch
                        }
                    } else {
                        try{
                            if(isNaN(result) || !isFinite(result) ||
                                nbvalues===0){
                                dom.id(labThisCol[i]).innerHTML = '.';
                            } else {
                                dom.id(labThisCol[i]).innerHTML =
                                    result.toFixed(precision);
                            }
                        } catch(e) {}//catch
                    }//else
                }//for i

                // row(s) with result are always visible
                var totRow = totRowIndex && totRowIndex[ucol] ?
                                row[totRowIndex[ucol]] : null;
                if(totRow){
                    totRow.style.display = '';
                }
            }//for ucol
        }//if typeof

        if(this.tf.onAfterOperation){
            this.tf.onAfterOperation.call(null, this.tf);
        }
    };

    return ColOps;
});