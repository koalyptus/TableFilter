import Dom from '../dom';
import Arr from '../array';
import Str from '../string';
import Sort from '../sort';
import Event from '../event';

export class CheckList{

    /**
     * Checklist UI component
     * @param {Object} tf TableFilter instance
     */
    constructor(tf){
        // Configuration object
        var f = tf.config();

        this.checkListDiv = []; //checklist container div
        //defines css class for div containing checklist filter
        this.checkListDivCssClass = f.div_checklist_css_class ||
            'div_checklist';
        //defines css class for checklist filters
        this.checkListCssClass = f.checklist_css_class || 'flt_checklist';
        //defines css class for checklist item (li)
        this.checkListItemCssClass = f.checklist_item_css_class ||
            'flt_checklist_item';
        //defines css class for selected checklist item (li)
        this.checkListSlcItemCssClass = f.checklist_selected_item_css_class ||
            'flt_checklist_slc_item';
        //Load on demand text
        this.activateCheckListTxt = f.activate_checklist_text ||
            'Click to load filter data';
        //defines css class for checklist filters
        this.checkListItemDisabledCssClass =
            f.checklist_item_disabled_css_class ||
            'flt_checklist_item_disabled';
        this.enableCheckListResetFilter =
            f.enable_checklist_reset_filter===false ? false : true;
        //checklist filter container div
        this.prfxCheckListDiv = 'chkdiv_';

        this.isCustom = null;
        this.opts = null;
        this.optsTxt = null;

        this.tf = tf;
    }

    // TODO: move event here
    onChange(evt){
        this.tf.Evt.onSlcChange(evt);
    }

    optionClick(evt){
        this.setCheckListValues(evt.target);
        this.onChange(evt);
    }

    /**
     * Build checklist UI asynchronously
     * @param  {Number}  colIndex   Column index
     * @param  {Boolean} isExternal Render in external container
     * @param  {String}  extFltId   External container id
     */
    build(colIndex, isExternal, extFltId){
        var tf = this.tf;
        tf.EvtManager(
            tf.Evt.name.checklist,
            { slcIndex:colIndex, slcExternal:isExternal, slcId:extFltId }
        );
    }

    /**
     * Build checklist UI
     * @param  {Number}  colIndex   Column index
     * @param  {Boolean} isExternal Render in external container
     * @param  {String}  extFltId   External container id
     */
    _build(colIndex, isExternal=false, extFltId=null){
        var tf = this.tf;
        colIndex = parseInt(colIndex, 10);

        this.opts = [];
        this.optsTxt = [];

        var divFltId = this.prfxCheckListDiv+colIndex+'_'+tf.id;
        if((!Dom.id(divFltId) && !isExternal) ||
            (!Dom.id(extFltId) && isExternal)){
            return;
        }

        var flt = !isExternal ? this.checkListDiv[colIndex] : Dom.id(extFltId);
        var ul = Dom.create(
            'ul', ['id', tf.fltIds[colIndex]], ['colIndex', colIndex]);
        ul.className = this.checkListCssClass;
        Event.add(ul, 'change', (evt) => { this.onChange(evt); });

        var rows = tf.tbl.rows;
        this.isCustom = (tf.hasCustomSlcOptions &&
                Arr.has(tf.customSlcOptions.cols, colIndex));

        var activeFlt;
        if(tf.refreshFilters && tf.activeFilterId){
            activeFlt = tf.activeFilterId.split('_')[0];
            activeFlt = activeFlt.split(tf.prfxFlt)[1];
        }

        var excludedOpts,
            filteredDataCol = [];
        if(tf.refreshFilters && tf.disableExcludedOptions){
            excludedOpts = [];
        }

        for(var k=tf.refRow; k<tf.nbRows; k++){
            // always visible rows don't need to appear on selects as always
            // valid
            if(tf.hasVisibleRows && Arr.has(tf.visibleRows, k) && !tf.paging){
                continue;
            }

            var cells = rows[k].cells;
            var ncells = cells.length;

            // checks if row has exact cell #
            if(ncells !== tf.nbCells || this.isCustom){
                continue;
            }

            // this loop retrieves cell data
            for(var j=0; j<ncells; j++){
                if((colIndex===j && (!tf.refreshFilters ||
                    (tf.refreshFilters && tf.disableExcludedOptions)))||
                    (colIndex===j && tf.refreshFilters &&
                    ((rows[k].style.display === '' && !tf.paging) ||
                    (tf.paging && ((!activeFlt || activeFlt===colIndex )||
                    (activeFlt!=colIndex &&
                        Arr.has(tf.validRowsIndex, k))) )))){
                    var cell_data = tf.getCellData(j, cells[j]);
                    //Vary Peter's patch
                    var cell_string = Str.matchCase(
                        cell_data, tf.matchCase);
                    // checks if celldata is already in array
                    if(!Arr.has(this.opts, cell_string, tf.matchCase)){
                        this.opts.push(cell_data);
                    }
                    var filteredCol = filteredDataCol[j];
                    if(tf.refreshFilters && tf.disableExcludedOptions){
                        if(!filteredCol){
                            filteredDataCol[j] = tf.GetFilteredDataCol(j);
                        }
                        if(!Arr.has(filteredCol,
                            cell_string, tf.matchCase) &&
                            !Arr.has(excludedOpts,
                                cell_string, tf.matchCase) &&
                            !tf.isFirstLoad){
                            excludedOpts.push(cell_data);
                        }
                    }
                }
            }
        }

        //Retrieves custom values
        if(this.isCustom){
            var customValues = tf.__getCustomValues(colIndex);
            this.opts = customValues[0];
            this.optsTxt = customValues[1];
        }

        if(tf.sortSlc && !this.isCustom){
            if (!tf.matchCase){
                this.opts.sort(Sort.ignoreCase);
                if(excludedOpts){
                    excludedOpts.sort(Sort.ignoreCase);
                }
            } else {
                this.opts.sort();
                if(excludedOpts){
                    excludedOpts.sort();
                }
            }
        }
        //asc sort
        if(tf.sortNumAsc && Arr.has(tf.sortNumAsc, colIndex)){
            try{
                this.opts.sort(numSortAsc);
                if(excludedOpts){
                    excludedOpts.sort(numSortAsc);
                }
                if(this.isCustom){
                    this.optsTxt.sort(numSortAsc);
                }
            } catch(e) {
                this.opts.sort();
                if(excludedOpts){
                    excludedOpts.sort();
                }
                if(this.isCustom){
                    this.optsTxt.sort();
                }
            }//in case there are alphanumeric values
        }
        //desc sort
        if(tf.sortNumDesc && Arr.has(tf.sortNumDesc, colIndex)){
            try{
                this.opts.sort(numSortDesc);
                if(excludedOpts){
                    excludedOpts.sort(numSortDesc);
                }
                if(this.isCustom){
                    this.optsTxt.sort(numSortDesc);
                }
            } catch(e) {
                this.opts.sort();
                if(excludedOpts){
                    excludedOpts.sort(); }
                if(this.isCustom){
                    this.optsTxt.sort();
                }
            }//in case there are alphanumeric values
        }

        this.addChecks(colIndex, ul, tf.separator);

        if(tf.fillSlcOnDemand){
            flt.innerHTML = '';
        }
        flt.appendChild(ul);
        flt.setAttribute('filled', '1');
    }

    /**
     * Add checklist options
     * @param {Number} colIndex  Column index
     * @param {Object} ul        Ul element
     */
    addChecks(colIndex, ul){
        var tf = this.tf;
        var chkCt = this.addTChecks(colIndex, ul);
        var fltArr = []; //remember grid values
        var store = tf.Cpt.store;
        var tmpVal = store ?
                store.getFilterValues(tf.fltsValuesCookie)[colIndex] : null;
        if(tmpVal && Str.trim(tmpVal).length > 0){
            if(tf.hasCustomSlcOptions &&
                Arr.has(tf.customSlcOptions.cols, colIndex)){
                fltArr.push(tmpVal);
            } else {
                fltArr = tmpVal.split(' '+tf.orOperator+' ');
            }
        }

        for(var y=0; y<this.opts.length; y++){
            var val = this.opts[y]; //item value
            var lbl = this.isCustom ? this.optsTxt[y] : val; //item text
            var li = Dom.createCheckItem(
                        tf.fltIds[colIndex]+'_'+(y+chkCt), val, lbl);
            li.className = this.checkListItemCssClass;
            if(tf.refreshFilters && tf.disableExcludedOptions &&
                Arr.has(excludedOpts,
                        Str.matchCase(val, tf.matchCase), tf.matchCase)){
                    Dom.addClass(li, this.checkListItemDisabledCssClass);
                    li.check.disabled = true;
                    li.disabled = true;
            } else{
                Event.add(li.check, 'click',
                    (evt) => { this.optionClick(evt);
                });
            }
            ul.appendChild(li);

            if(val===''){
                //item is hidden
                li.style.display = 'none';
            }

            /*** remember grid values ***/
            if(tf.rememberGridValues){
                if((tf.hasCustomSlcOptions &&
                    Arr.has(tf.customSlcOptions.cols, colIndex) &&
                    fltArr.toString().indexOf(val)!= -1) ||
                    Arr.has(fltArr,
                        Str.matchCase(val, tf.matchCase), tf.matchCase)){
                    li.check.checked = true;
                    this.setCheckListValues(li.check);
                }
            }
        }
    }

    /**
     * Add checklist header option
     * @param {Number} colIndex Column index
     * @param {Object} ul       Ul element
     */
    addTChecks(colIndex, ul){
        var tf = this.tf;
        var chkCt = 1;
        var li0 = Dom.createCheckItem(
                    tf.fltIds[colIndex]+'_0', '', tf.displayAllText);
        li0.className = this.checkListItemCssClass;
        ul.appendChild(li0);

        Event.add(li0.check, 'click', (evt) => {
            this.optionClick(evt);
        });

        if(!this.enableCheckListResetFilter){
            li0.style.display = 'none';
        }

        if(tf.enableEmptyOption){
            var li1 = Dom.createCheckItem(
                    tf.fltIds[colIndex]+'_1', tf.emOperator, tf.emptyText);
            li1.className = this.checkListItemCssClass;
            ul.appendChild(li1);
            Event.add(li1.check, 'click', (evt) => {
                this.optionClick(evt);
            });
            chkCt++;
        }

        if(tf.enableNonEmptyOption){
            var li2 = Dom.createCheckItem(
                tf.fltIds[colIndex]+'_2',
                tf.nmOperator,
                tf.nonEmptyText
            );
            li2.className = this.checkListItemCssClass;
            ul.appendChild(li2);
            Event.add(li2.check, 'click', (evt) => {
                this.optionClick(evt);
            });
            chkCt++;
        }
        return chkCt;
    }

    /**
     * Store checked options in DOM element attribute
     * @param {Object} o checklist option DOM element
     */
    setCheckListValues(o){
        if(!o){
            return;
        }
        var tf = this.tf;
        var chkValue = o.value; //checked item value
        var chkIndex = parseInt(o.id.split('_')[2], 10);
        var filterTag = 'ul', itemTag = 'li';
        var n = o;

        //ul tag search
        while(Str.lower(n.nodeName)!==filterTag){
            n = n.parentNode;
        }

        var li = n.childNodes[chkIndex];
        var colIndex = n.getAttribute('colIndex');
        var fltValue = n.getAttribute('value'); //filter value (ul tag)
        var fltIndexes = n.getAttribute('indexes'); //selected items (ul tag)

        if(o.checked){
            //show all item
            if(chkValue===''){
                if((fltIndexes && fltIndexes!=='')){
                    //items indexes
                    var indSplit = fltIndexes.split(tf.separator);
                    //checked items loop
                    for(var u=0; u<indSplit.length; u++){
                        //checked item
                        var cChk = Dom.id(tf.fltIds[colIndex]+'_'+indSplit[u]);
                        if(cChk){
                            cChk.checked = false;
                            Dom.removeClass(
                                n.childNodes[indSplit[u]],
                                this.checkListSlcItemCssClass
                            );
                        }
                    }
                }
                n.setAttribute('value', '');
                n.setAttribute('indexes', '');

            } else {
                fltValue = (fltValue) ? fltValue : '';
                chkValue = Str.trim(
                    fltValue+' '+chkValue+' '+tf.orOperator);
                chkIndex = fltIndexes + chkIndex + tf.separator;
                n.setAttribute('value', chkValue );
                n.setAttribute('indexes', chkIndex);
                //1st option unchecked
                if(Dom.id(tf.fltIds[colIndex]+'_0')){
                    Dom.id(tf.fltIds[colIndex]+'_0').checked = false;
                }
            }

            if(Str.lower(li.nodeName) === itemTag){
                Dom.removeClass(
                    n.childNodes[0], this.checkListSlcItemCssClass);
                Dom.addClass(li, this.checkListSlcItemCssClass);
            }
        } else { //removes values and indexes
            if(chkValue!==''){
                var replaceValue = new RegExp(
                        Str.rgxEsc(chkValue+' '+tf.orOperator));
                fltValue = fltValue.replace(replaceValue,'');
                n.setAttribute('value', Str.trim(fltValue));

                var replaceIndex = new RegExp(
                        Str.rgxEsc(chkIndex + tf.separator));
                fltIndexes = fltIndexes.replace(replaceIndex, '');
                n.setAttribute('indexes', fltIndexes);
            }
            if(Str.lower(li.nodeName)===itemTag){
                Dom.removeClass(li, this.checkListSlcItemCssClass);
            }
        }
    }
}
