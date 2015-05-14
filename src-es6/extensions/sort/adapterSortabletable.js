import {Types} from '../../types';
import {Dom} from '../../dom';
import {Arr} from '../../array';
import {Event} from '../../event';
import {DateHelper} from '../../date';
import {Helpers} from '../../helpers';

export default class AdapterSortableTable{

    /**
     * SortableTable Adapter module
     * @param {Object} tf TableFilter instance
     */
    constructor(tf){
        // Configuration object
        var f = tf.config();

        this.isPaged = false;

        //indicates if tables was sorted
        this.sorted = false;

        // edit .sort-arrow.descending / .sort-arrow.ascending in filtergrid.css
        // to reflect any path change
        this.sortImgPath = f.sort_images_path || tf.themesPath;
        this.sortImgBlank = f.sort_image_blank || 'blank.png';
        this.sortImgClassName = f.sort_image_class_name || 'sort-arrow';
        this.sortImgAscClassName = f.sort_image_asc_class_name || 'ascending';
        this.sortImgDescClassName = f.sort_image_desc_class_name ||'descending';
        //cell attribute storing custom key
        this.sortCustomKey = f.sort_custom_key || 'data-tf-sortKey';

        /*** TF additional events ***/
        //additional paging events for alternating background
        // o.Evt._Paging.nextEvt = function(){ if(o.sorted && o.alternateBgs) o.Filter(); }
        // o.Evt._Paging.prevEvt = o.Evt._Paging.nextEvt;
        // o.Evt._Paging.firstEvt = o.Evt._Paging.nextEvt;
        // o.Evt._Paging.lastEvt = o.Evt._Paging.nextEvt;
        // o.Evt._OnSlcPagesChangeEvt = o.Evt._Paging.nextEvt;

        // callback invoked after sort is loaded and instanciated
        this.onSortLoaded = Types.isFn(f.on_sort_loaded) ?
            f.on_sort_loaded : null;
        // callback invoked before table is sorted
        this.onBeforeSort = Types.isFn(f.on_before_sort) ?
            f.on_before_sort : null;
        // callback invoked after table is sorted
        this.onAfterSort = Types.isFn(f.on_after_sort) ? f.on_after_sort : null;

        this.tf = tf;
    }

    init(){
        var tf = this.tf;
        var sortConfig = tf.sortConfig;
        var adpt = this;

        // SortableTable class sanity check (sortabletable.js)
        if(Types.isUndef(SortableTable)){
            throw new Error('SortableTable class not found.');
        }

        this.overrideSortableTable();
        this.setSortTypes();

        //Column sort at start
        if(sortConfig.sortCol){
            this.stt.sort(sortConfig.sortCol[0], sortConfig.sortCol[1]);
        }

        tf.isSortEnabled = true;
        if(this.onSortLoaded){
            this.onSortLoaded.call(null, tf, this);
        }

        /*** SortableTable callbacks ***/
        this.stt.onbeforesort = function(){
            if(this.onBeforeSort){
                this.onBeforeSort.call(null, tf, this.stt.sortColumn);
            }

            tf.performSort();

            /*** sort behaviour for paging ***/
            if(tf.paging){
                adpt.isPaged = true;
                tf.paging = false;
                tf.Cpt.paging.destroy();
            }
        };

        this.stt.onsort = function(){
            adpt.sorted = true;

            //rows alternating bg issue
            // TODO: move into AlternateRows component
            if(tf.alternateBgs){
                var rows = tf.tbl.rows, c = 0;

                var setClass = function(row, i, removeOnly){
                    if(Types.isUndef(removeOnly)){
                        removeOnly = false;
                    }
                    var altRows = tf.Cpt.alternateRows,
                        oddCls = altRows.oddCss,
                        evenCls = altRows.evenCss;
                    Dom.removeClass(row, oddCls);
                    Dom.removeClass(row, evenCls);

                    if(!removeOnly){
                        Dom.addClass(row, i % 2 ? oddCls : evenCls);
                    }
                };

                for (var i = tf.refRow; i < tf.nbRows; i++){
                    var isRowValid = rows[i].getAttribute('validRow');
                    if(tf.paging && rows[i].style.display === ''){
                        setClass(rows[i], c);
                        c++;
                    } else {
                        if((isRowValid==='true' || isRowValid===null) &&
                            rows[i].style.display === ''){
                            setClass(rows[i], c);
                            c++;
                        } else {
                            setClass(rows[i], c, true);
                        }
                    }
                }
            }
            //sort behaviour for paging
            if(adpt.isPaged){
                var paginator = tf.Cpt.paging,
                    config = tf.config();
                if(paginator.hasResultsPerPage){
                    var slc = paginator.resultsPerPageSlc;
                    config.paging_length = slc.options[slc.selectedIndex].value;
                }
                paginator.addPaging(false);
                paginator.setPage(paginator.currentPageNb);
                adpt.isPaged = false;
            }

            if(adpt.onAfterSort){
                adpt.onAfterSort.call(null, tf, tf.stt.sortColumn);
            }
        };
    }

    /**
     * Sort specified column
     * @param  {Number} colIdx Column index
     */
    sortByColumnIndex(colIdx){
        this.stt.sort(colIdx);
    }

    overrideSortableTable(){
        var adpt = this,
            tf = this.tf;

        /**
         * Overrides headerOnclick method in order to handle th event
         * @param  {Object} e [description]
         */
        SortableTable.prototype.headerOnclick = function(evt){
            if(!tf.sort){
                return;
            }
            // find Header element
            var el = evt.target || evt.srcElement;

            while(el.tagName !== 'TD' && el.tagName !== 'TH'){
                el = el.parentNode;
            }

            this.sort(
                SortableTable.msie ?
                    SortableTable.getCellIndex(el) : el.cellIndex
            );
        };

        /**
         * Overrides getCellIndex IE returns wrong cellIndex when columns are
         * hidden
         * @param  {Object} oTd TD element
         * @return {Number}     Cell index
         */
        SortableTable.getCellIndex = function(oTd){
            var cells = oTd.parentNode.cells,
                l = cells.length, i;
            for (i = 0; cells[i] != oTd && i < l; i++){}
            return i;
        };

        /**
         * Overrides initHeader in order to handle filters row position
         * @param  {Array} oSortTypes
         */
        SortableTable.prototype.initHeader = function(oSortTypes){
            var stt = this;
            if (!stt.tHead){
                // throw new Error('Sorting feature requires a THEAD element');
                return;
            }
            stt.headersRow = tf.headersRow;
            var cells = stt.tHead.rows[stt.headersRow].cells;
            var doc = stt.tHead.ownerDocument || stt.tHead.document;
            stt.sortTypes = oSortTypes || [];
            var l = cells.length;
            var img, c;
            for (var i = 0; i < l; i++) {
                c = cells[i];
                if (stt.sortTypes[i] !== null && stt.sortTypes[i] !== 'None'){
                    c.style.cursor = 'pointer';
                    img = Dom.create('img',
                        ['src', adpt.sortImgPath + adpt.sortImgBlank]);
                    c.appendChild(img);
                    if (stt.sortTypes[i] !== null){
                        c.setAttribute( '_sortType', stt.sortTypes[i]);
                    }
                    Event.add(c, 'click', stt._headerOnclick);
                } else {
                    c.setAttribute('_sortType', oSortTypes[i]);
                    c._sortType = 'None';
                }
            }
            stt.updateHeaderArrows();
        };

        /**
         * Overrides updateHeaderArrows in order to handle arrows indicators
         */
        SortableTable.prototype.updateHeaderArrows = function(){
            var stt = this;
            var cells, l, img;
            // external headers
            if(tf.sortConfig.asyncSort && tf.sortConfig.triggerIds !== null){
                var triggers = tf.sortConfig.triggerIds;
                cells = [];
                l = triggers.length;
                for(var j=0; j<triggers.length; j++){
                    cells.push(Dom.id(triggers[j]));
                }
            } else {
                if(!this.tHead){
                    return;
                }
                cells = stt.tHead.rows[stt.headersRow].cells;
                l = cells.length;
            }
            for(var i = 0; i < l; i++){
                var cellAttr = cells[i].getAttribute('_sortType');
                if(cellAttr !== null && cellAttr !== 'None'){
                    img = cells[i].lastChild || cells[i];
                    if(img.nodeName.toLowerCase() !== 'img'){
                        img = Dom.create('img',
                            ['src', adpt.sortImgPath + adpt.sortImgBlank]);
                        cells[i].appendChild(img);
                    }
                    if (i === stt.sortColumn){
                        img.className = adpt.sortImgClassName +' '+
                            (this.descending ?
                                adpt.sortImgDescClassName :
                                adpt.sortImgAscClassName);
                    } else{
                        img.className = adpt.sortImgClassName;
                    }
                }
            }
        };

        /**
         * Overrides getRowValue for custom key value feature
         * @param  {Object} oRow    Row element
         * @param  {String} sType
         * @param  {Number} nColumn
         * @return {String}
         */
        SortableTable.prototype.getRowValue = function(oRow, sType, nColumn){
            var stt = this;
            // if we have defined a custom getRowValue use that
            var sortTypeInfo = stt._sortTypeInfo[sType];
            if (sortTypeInfo && sortTypeInfo.getRowValue){
                return sortTypeInfo.getRowValue(oRow, nColumn);
            }
            var c = oRow.cells[nColumn];
            var s = SortableTable.getInnerText(c);
            return stt.getValueFromString(s, sType);
        };

        /**
         * Overrides getInnerText in order to avoid Firefox unexpected sorting
         * behaviour with untrimmed text elements
         * @param  {Object} oNode DOM element
         * @return {String}       DOM element inner text
         */
        SortableTable.getInnerText = function(oNode){
            if(!oNode){
                return;
            }
            if(oNode.getAttribute(adpt.sortCustomKey)){
                return oNode.getAttribute(adpt.sortCustomKey);
            } else {
                return Dom.getText(oNode);
            }
        };
    }

    addSortType(){
        SortableTable.prototype.addSortType(
            arguments[0], arguments[1], arguments[2], arguments[3]);
    }

    setSortTypes(){
        var tf = this.tf,
            configSort = tf.sortConfig,
            configSortTypes = configSort.sortTypes,
            sortTypes = [];

        for(var i=0; i<tf.nbCells; i++){
            var colType;

            if(configSortTypes !== null && configSortTypes[i] != null){
                colType = configSortTypes[i].toLowerCase();
                if(colType === 'none'){
                    colType = 'None';
                }
            } else { // resolve column types
                if(tf.hasColNbFormat && tf.colNbFormat[i] !== null){
                    colType = tf.colNbFormat[i].toLowerCase();
                } else if(tf.hasColDateType && tf.colDateType[i] !== null){
                    colType = tf.colDateType[i].toLowerCase()+'date';
                } else {
                    colType = 'String';
                }
            }
            sortTypes.push(colType);
        }

        //Public TF method to add sort type

        //Custom sort types
        this.addSortType('number', Number);
        this.addSortType('caseinsensitivestring', SortableTable.toUpperCase);
        this.addSortType('date', SortableTable.toDate);
        this.addSortType('string');
        this.addSortType('us', usNumberConverter);
        this.addSortType('eu', euNumberConverter);
        this.addSortType('dmydate', dmyDateConverter );
        this.addSortType('ymddate', ymdDateConverter);
        this.addSortType('mdydate', mdyDateConverter);
        this.addSortType('ddmmmyyyydate', ddmmmyyyyDateConverter);
        this.addSortType('ipaddress', ipAddress, sortIP);

        this.stt = new SortableTable(tf.tbl, sortTypes);

        /*** external table headers adapter ***/
        if(configSort.asyncSort && configSort.triggerIds !== null){
            var triggers = configSort.triggerIds;
            for(var j=0; j<triggers.length; j++){
                if(triggers[j] === null){
                    continue;
                }
                var trigger = Dom.id(triggers[j]);
                if(trigger){
                    trigger.style.cursor = 'pointer';

                    Event.add(trigger, 'click', (evt) => {
                        var elm = evt.target;
                        if(!this.tf.sort){
                            return;
                        }
                        this.stt.asyncSort(
                            Arr.indexByValue(triggers, elm.id, true)
                        );
                    });
                    trigger.setAttribute('_sortType', sortTypes[j]);
                }
            }
        }
    }

    /**
     * Destroy sort
     */
    destroy(){
        var tf = this.tf;
        tf.sort = false;
        this.sorted = false;
        this.stt.destroy();

        var ids = tf.getFiltersId();
        for (var idx = 0; idx < ids.length; idx++){
            var header = tf.getHeaderElement(idx);
            var img = Dom.tag(header, 'img');

            if(img.length === 1){
                header.removeChild(img[0]);
            }
        }
    }

}

//Converters
function usNumberConverter(s){
    return Helpers.removeNbFormat(s, 'us');
}
function euNumberConverter(s){
    return Helpers.removeNbFormat(s, 'eu');
}
function dateConverter(s, format){
    return DateHelper.format(s, format);
}
function dmyDateConverter(s){
    return dateConverter(s, 'DMY');
}
function mdyDateConverter(s){
    return dateConverter(s, 'MDY');
}
function ymdDateConverter(s){
    return dateConverter(s, 'YMD');
}
function ddmmmyyyyDateConverter(s){
    return dateConverter(s, 'DDMMMYYYY');
}

function ipAddress(value){
    var vals = value.split('.');
    for (var x in vals) {
        var val = vals[x];
        while (3 > val.length){
            val = '0'+val;
        }
        vals[x] = val;
    }
    return vals.join('.');
}

function sortIP(a,b){
    var aa = ipAddress(a.value.toLowerCase());
    var bb = ipAddress(b.value.toLowerCase());
    if (aa==bb){
        return 0;
    } else if (aa<bb){
        return -1;
    } else {
        return 1;
    }
}
