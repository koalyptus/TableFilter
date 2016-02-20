import {Feature} from './feature';
import Dom from '../dom';
import Arr from '../array';
import Str from '../string';
import Sort from '../sort';
import Event from '../event';

const SORT_ERROR = 'Filter options for column {0} cannot be sorted in ' +
    '{1} manner.';

export class CheckList extends Feature{

    /**
     * Checklist UI component
     * @param {Object} tf TableFilter instance
     */
    constructor(tf){
        super(tf, 'checkList');

        // Configuration object
        let f = tf.config();

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
        this.excludedOpts = null;
    }

    onChange(evt){
        let elm = evt.target;
        let tf = this.tf;
        tf.activeFilterId = elm.getAttribute('id');
        tf.activeFlt = Dom.id(tf.activeFilterId);
        tf.filter();
    }

    optionClick(evt){
        this.setCheckListValues(evt.target);
        this.onChange(evt);
    }

    onCheckListClick(evt){
        let elm = Event.target(evt);
        if(this.tf.loadFltOnDemand && elm.getAttribute('filled') === '0'){
            let ct = elm.getAttribute('ct');
            let div = this.checkListDiv[ct];
            this.build(ct);
            Event.remove(div, 'click', (evt)=> this.onCheckListClick(evt));
        }
    }

    /**
     * Initialize checklist filter
     * @param  {Number}     colIndex   Column index
     * @param  {Boolean}    isExternal External filter flag
     * @param  {DOMElement} container  Dom element containing the filter
     */
    init(colIndex, isExternal, container){
        let tf = this.tf;
        let externalFltTgtId = isExternal ?
            tf.externalFltTgtIds[colIndex] : null;

        let divCont = Dom.create('div',
            ['id', this.prfxCheckListDiv+colIndex+'_'+tf.id],
            ['ct', colIndex], ['filled', '0']);
        divCont.className = this.checkListDivCssClass;

        //filter is appended in desired element
        if(externalFltTgtId){
            Dom.id(externalFltTgtId).appendChild(divCont);
            tf.externalFltEls.push(divCont);
        } else {
            container.appendChild(divCont);
        }

        this.checkListDiv[colIndex] = divCont;
        tf.fltIds.push(tf.prfxFlt+colIndex+'_'+tf.id);

        if(!tf.loadFltOnDemand){
            this.build(colIndex);
        } else {
            Event.add(divCont, 'click', (evt)=> this.onCheckListClick(evt));
            divCont.appendChild(Dom.text(this.activateCheckListTxt));
        }

        this.emitter.on(
            ['build-checklist-filter'],
            (tf, colIndex, isExternal)=> this.build(colIndex, isExternal)
        );

        this.emitter.on(
            ['select-checklist-options'],
            (tf, colIndex, values)=> this.selectOptions(colIndex, values)
        );

        this.initialized = true;
    }

    /**
     * Build checklist UI
     * @param  {Number}  colIndex   Column index
     * @param  {Boolean} isExternal Render in external container
     * @param  {String}  extFltId   External container id
     */
    build(colIndex, isExternal=false, extFltId=null){
        let tf = this.tf;
        colIndex = parseInt(colIndex, 10);

        this.emitter.emit('before-populating-filter', tf, colIndex);

        this.opts = [];
        this.optsTxt = [];

        let divFltId = this.prfxCheckListDiv+colIndex+'_'+tf.id;
        if((!Dom.id(divFltId) && !isExternal) ||
            (!Dom.id(extFltId) && isExternal)){
            return;
        }

        let flt = !isExternal ? this.checkListDiv[colIndex] : Dom.id(extFltId);
        let ul = Dom.create(
            'ul', ['id', tf.fltIds[colIndex]], ['colIndex', colIndex]);
        ul.className = this.checkListCssClass;
        Event.add(ul, 'change', (evt)=> this.onChange(evt));

        let rows = tf.tbl.rows;
        this.isCustom = tf.isCustomOptions(colIndex);

        let activeFlt;
        if(tf.linkedFilters && tf.activeFilterId){
            activeFlt = tf.activeFilterId.split('_')[0];
            activeFlt = activeFlt.split(tf.prfxFlt)[1];
        }

        let filteredDataCol = [];
        if(tf.linkedFilters && tf.disableExcludedOptions){
            this.excludedOpts = [];
        }

        flt.innerHTML = '';

        for(let k=tf.refRow; k<tf.nbRows; k++){
            // always visible rows don't need to appear on selects as always
            // valid
            if(tf.hasVisibleRows && tf.visibleRows.indexOf(k) !== -1){
                continue;
            }

            let cells = rows[k].cells;
            let ncells = cells.length;

            // checks if row has exact cell #
            if(ncells !== tf.nbCells || this.isCustom){
                continue;
            }

            // this loop retrieves cell data
            for(let j=0; j<ncells; j++){
                // WTF: cyclomatic complexity hell :)
                if((colIndex===j && (!tf.linkedFilters ||
                    (tf.linkedFilters && tf.disableExcludedOptions)))||
                    (colIndex===j && tf.linkedFilters &&
                    ((rows[k].style.display === '' && !tf.paging) ||
                    (tf.paging && ((!activeFlt || activeFlt===colIndex )||
                    (activeFlt!=colIndex &&
                        tf.validRowsIndex.indexOf(k) != -1)) )))){
                    let cell_data = tf.getCellData(cells[j]);
                    //Vary Peter's patch
                    let cell_string = Str.matchCase(cell_data, tf.matchCase);
                    // checks if celldata is already in array
                    if(!Arr.has(this.opts, cell_string, tf.matchCase)){
                        this.opts.push(cell_data);
                    }
                    let filteredCol = filteredDataCol[j];
                    if(tf.linkedFilters && tf.disableExcludedOptions){
                        if(!filteredCol){
                            filteredCol = tf.getFilteredDataCol(j);
                        }
                        if(!Arr.has(filteredCol, cell_string, tf.matchCase) &&
                            !Arr.has(this.excludedOpts,
                                cell_string, tf.matchCase)){
                            this.excludedOpts.push(cell_data);
                        }
                    }
                }
            }
        }

        //Retrieves custom values
        if(this.isCustom){
            let customValues = tf.getCustomOptions(colIndex);
            this.opts = customValues[0];
            this.optsTxt = customValues[1];
        }

        if(tf.sortSlc && !this.isCustom){
            if (!tf.matchCase){
                this.opts.sort(Sort.ignoreCase);
                if(this.excludedOpts){
                    this.excludedOpts.sort(Sort.ignoreCase);
                }
            } else {
                this.opts.sort();
                if(this.excludedOpts){
                    this.excludedOpts.sort();
                }
            }
        }
        //asc sort
        if(tf.sortNumAsc.indexOf(colIndex) != -1){
            try{
                this.opts.sort(Sort.numSortAsc);
                if(this.excludedOpts){
                    this.excludedOpts.sort(Sort.numSortAsc);
                }
                if(this.isCustom){
                    this.optsTxt.sort(Sort.numSortAsc);
                }
            } catch(e) {
                throw new Error(SORT_ERROR.replace('{0}', colIndex)
                    .replace('{1}', 'ascending'));
            }//in case there are alphanumeric values
        }
        //desc sort
        if(tf.sortNumDesc.indexOf(colIndex) != -1){
            try{
                this.opts.sort(Sort.numSortDesc);
                if(this.excludedOpts){
                    this.excludedOpts.sort(Sort.numSortDesc);
                }
                if(this.isCustom){
                    this.optsTxt.sort(Sort.numSortDesc);
                }
            } catch(e) {
                throw new Error(SORT_ERROR.replace('{0}', colIndex)
                    .replace('{1}', 'descending'));
            }//in case there are alphanumeric values
        }

        this.addChecks(colIndex, ul);

        if(tf.loadFltOnDemand){
            flt.innerHTML = '';
        }
        flt.appendChild(ul);
        flt.setAttribute('filled', '1');

        this.emitter.emit('after-populating-filter', tf, colIndex, flt);
    }

    /**
     * Add checklist options
     * @param {Number} colIndex  Column index
     * @param {Object} ul        Ul element
     */
    addChecks(colIndex, ul){
        let tf = this.tf;
        let chkCt = this.addTChecks(colIndex, ul);

        for(let y=0; y<this.opts.length; y++){
            let val = this.opts[y]; //item value
            let lbl = this.isCustom ? this.optsTxt[y] : val; //item text
            let li = Dom.createCheckItem(
                        tf.fltIds[colIndex]+'_'+(y+chkCt), val, lbl);
            li.className = this.checkListItemCssClass;
            if(tf.linkedFilters && tf.disableExcludedOptions &&
                Arr.has(this.excludedOpts,
                    Str.matchCase(val, tf.matchCase), tf.matchCase)){
                Dom.addClass(li, this.checkListItemDisabledCssClass);
                li.check.disabled = true;
                li.disabled = true;
            } else {
                Event.add(li.check, 'click', (evt)=> this.optionClick(evt));
            }
            ul.appendChild(li);

            if(val === ''){
                //item is hidden
                li.style.display = 'none';
            }
        }
    }

    /**
     * Add checklist header option
     * @param {Number} colIndex Column index
     * @param {Object} ul       Ul element
     */
    addTChecks(colIndex, ul){
        let tf = this.tf;
        let chkCt = 1;
        let li0 = Dom.createCheckItem(
                    tf.fltIds[colIndex]+'_0', '', tf.displayAllText);
        li0.className = this.checkListItemCssClass;
        ul.appendChild(li0);

        Event.add(li0.check, 'click', (evt)=> this.optionClick(evt));

        if(!this.enableCheckListResetFilter){
            li0.style.display = 'none';
        }

        if(tf.enableEmptyOption){
            let li1 = Dom.createCheckItem(
                    tf.fltIds[colIndex]+'_1', tf.emOperator, tf.emptyText);
            li1.className = this.checkListItemCssClass;
            ul.appendChild(li1);
            Event.add(li1.check, 'click', (evt)=> this.optionClick(evt));
            chkCt++;
        }

        if(tf.enableNonEmptyOption){
            let li2 = Dom.createCheckItem(
                tf.fltIds[colIndex]+'_2',
                tf.nmOperator,
                tf.nonEmptyText
            );
            li2.className = this.checkListItemCssClass;
            ul.appendChild(li2);
            Event.add(li2.check, 'click', (evt)=> this.optionClick(evt));
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
        let tf = this.tf;
        let chkValue = o.value; //checked item value
        let chkIndex = parseInt(o.id.split('_')[2], 10);
        let filterTag = 'ul', itemTag = 'li';
        let n = o;

        //ul tag search
        while(Str.lower(n.nodeName)!==filterTag){
            n = n.parentNode;
        }

        let li = n.childNodes[chkIndex];
        let colIndex = n.getAttribute('colIndex');
        let fltValue = n.getAttribute('value'); //filter value (ul tag)
        let fltIndexes = n.getAttribute('indexes'); //selected items (ul tag)

        if(o.checked){
            //show all item
            if(chkValue===''){
                if((fltIndexes && fltIndexes!=='')){
                    //items indexes
                    let indSplit = fltIndexes.split(tf.separator);
                    //checked items loop
                    for(let u=0; u<indSplit.length; u++){
                        //checked item
                        let cChk = Dom.id(tf.fltIds[colIndex]+'_'+indSplit[u]);
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
                n.setAttribute('value', chkValue);
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
                let replaceValue = new RegExp(
                        Str.rgxEsc(chkValue+' '+tf.orOperator));
                fltValue = fltValue.replace(replaceValue,'');
                n.setAttribute('value', Str.trim(fltValue));

                let replaceIndex = new RegExp(
                        Str.rgxEsc(chkIndex + tf.separator));
                fltIndexes = fltIndexes.replace(replaceIndex, '');
                n.setAttribute('indexes', fltIndexes);
            }
            if(Str.lower(li.nodeName)===itemTag){
                Dom.removeClass(li, this.checkListSlcItemCssClass);
            }
        }
    }

    /**
     * Select filter options programmatically
     * @param  {Number} colIndex Column index
     * @param  {Array}  values   Array of option values to select
     */
    selectOptions(colIndex, values=[]){
        let tf = this.tf;
        if(tf.getFilterType(colIndex) !== tf.fltTypeCheckList ||
            values.length === 0){
            return;
        }
        let flt = tf.getFilterElement(colIndex);

        let lisNb = Dom.tag(flt, 'li').length;

        flt.setAttribute('value', '');
        flt.setAttribute('indexes', '');

        for(let k=0; k<lisNb; k++){
            let li = Dom.tag(flt, 'li')[k],
                lbl = Dom.tag(li, 'label')[0],
                chk = Dom.tag(li, 'input')[0],
                lblTxt = Str.matchCase(Dom.getText(lbl), tf.caseSensitive);
            if(lblTxt !== '' && Arr.has(values, lblTxt, tf.caseSensitive)){
                chk.checked = true;
                this.setCheckListValues(chk);
            }
            else{
                chk.checked = false;
                this.setCheckListValues(chk);
            }
        }
    }

    destroy(){
        this.emitter.off(
            ['build-checklist-filter'],
            (tf, colIndex, isExternal)=> this.build(colIndex, isExternal)
        );
        this.emitter.off(
            ['select-checklist-options'],
            (tf, colIndex, values)=> this.selectOptions(colIndex, values)
        );
    }
}
