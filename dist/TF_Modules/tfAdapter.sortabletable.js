/*------------------------------------------------------------------------
	- HTML Table Filter Generator Sorting Feature
	- TF Adapter v2.1 for WebFX Sortable Table 1.12 (Erik Arvidsson) 
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
--------------------------------------------------------------------------
Copyright (c) 2009-2012 Max Guglielmi

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
------------------------------------------------------------------------
	- Changelog:
		1.1 [30-09-09] 
		When table is paged now the whole table is sorted and not
		only the current page
		1.2 [05-12-09]
		Added on_before_sort and on_after_sort callback functions
		1.3 [06-09-10]
		Added IP adresses sort
		1.4 [22-01-11]
		Added DDMMMYYYY date format support
		1.5 [20-02-11]
		Image folder and sort icon can now be set in configuration 
		object
		1.6 [06-08-11]
		Added on_sort_loaded callback function
		1.7 [20-08-11]
		Added sort arrow css classes properties
		Added sort custom key property allowing custom sorts
		Added AddSortType public method
		1.8 [25-09-11]
		Bug fix: sort did not take into account results per page changes 
		1.9 [03-03-12]
		Bug fix: custom value attribute value was read only by Firefox
		2.0 [08-04-12]
		Bug fix: zebra rows background are no longer inverted after sort
		2.1 [25-08-12]
		Bug fix: IE9 did not sort columns correctly
------------------------------------------------------------------------*/

function usNumberConverter(e){return tf_removeNbFormat(e,"us")}function euNumberConverter(e){return tf_removeNbFormat(e,"eu")}function dateConverter(e,t){return tf_formatDate(e,t)}function dmyDateConverter(e){return dateConverter(e,"DMY")}function mdyDateConverter(e){return dateConverter(e,"MDY")}function ymdDateConverter(e){return dateConverter(e,"YMD")}function ddmmmyyyyDateConverter(e){return dateConverter(e,"DDMMMYYYY")}function ipAddress(e){var t=e.split(".");for(x in t){e=t[x];while(3>e.length)e="0"+e;t[x]=e}return e=t.join("."),e}function sortIP(e,t){var n=ipAddress(e.value.tf_LCase()),r=ipAddress(t.value.tf_LCase());return n==r?0:n<r?-1:1}TF.prototype.SetSortTable=function(){var e=this,t=e.fObj,n=!1;e.sortImgPath=t.sort_images_path!=undefined?t.sort_images_path:e.themesPath,e.sortImgBlank=t.sort_image_blank!=undefined?t.sort_image_blank:"blank.png",e.sortImgClassName=t.sort_image_class_name!=undefined?t.sort_image_class_name:"sort-arrow",e.sortImgAscClassName=t.sort_image_asc_class_name!=undefined?t.sort_image_asc_class_name:"ascending",e.sortImgDescClassName=t.sort_image_desc_class_name!=undefined?t.sort_image_desc_class_name:"descending",e.sortCustomKey=t.sort_custom_key!=undefined?t.sort_custom_key:"_sortKey",e.Evt._Paging.nextEvt=function(){e.sorted&&e.alternateBgs&&e.Filter()},e.Evt._Paging.prevEvt=e.Evt._Paging.nextEvt,e.Evt._Paging.firstEvt=e.Evt._Paging.nextEvt,e.Evt._Paging.lastEvt=e.Evt._Paging.nextEvt,e.Evt._OnSlcPagesChangeEvt=e.Evt._Paging.nextEvt,e.onSortLoaded=tf_IsFn(t.on_sort_loaded)?t.on_sort_loaded:null,e.onBeforeSort=tf_IsFn(t.on_before_sort)?t.on_before_sort:null,e.onAfterSort=tf_IsFn(t.on_after_sort)?t.on_after_sort:null;if(typeof SortableTable=="undefined")return;SortableTable.prototype.headerOnclick=function(t){if(!e.sort)return;var n=t.target||t.srcElement;while(n.tagName!="TD"&&n.tagName!="TH")n=n.parentNode;this.sort(SortableTable.msie?SortableTable.getCellIndex(n):n.cellIndex)},SortableTable.getCellIndex=function(e){var t=e.parentNode.cells,n=t.length,r;for(r=0;t[r]!=e&&r<n;r++);return r},SortableTable.prototype.initHeader=function(t){if(!this.tHead)return;this.headersRow=e.headersRow;var n=this.tHead.rows[this.headersRow].cells,r=this.tHead.ownerDocument||this.tHead.document;this.sortTypes=t||[];var i=n.length,s,o;for(var u=0;u<i;u++)o=n[u],this.sortTypes[u]!=null&&this.sortTypes[u]!="None"?(o.style.cursor="pointer",s=tf_CreateElm("img",["src",e.sortImgPath+e.sortImgBlank]),o.appendChild(s),this.sortTypes[u]!=null&&o.setAttribute("_sortType",this.sortTypes[u]),tf_AddEvent(o,"click",this._headerOnclick)):(o.setAttribute("_sortType",t[u]),o._sortType="None");this.updateHeaderArrows()},SortableTable.prototype.updateHeaderArrows=function(){var t,n,r;if(e.sortConfig.asyncSort&&e.sortConfig.triggerIds!=null){var i=e.sortConfig.triggerIds;t=[],n=i.length;for(var s=0;s<i.length;s++)t.push(tf_Id(i[s]))}else{if(!this.tHead)return;t=this.tHead.rows[this.headersRow].cells,n=t.length}for(var o=0;o<n;o++)t[o].getAttribute("_sortType")!=null&&t[o].getAttribute("_sortType")!="None"&&(r=t[o].lastChild||t[o],r.nodeName.tf_LCase()!="img"&&(r=tf_CreateElm("img",["src",e.sortImgPath+e.sortImgBlank]),t[o].appendChild(r)),o==this.sortColumn?r.className=e.sortImgClassName+" "+(this.descending?e.sortImgDescClassName:e.sortImgAscClassName):r.className=e.sortImgClassName)},SortableTable.prototype.getRowValue=function(e,t,n){if(this._sortTypeInfo[t]&&this._sortTypeInfo[t].getRowValue)return this._sortTypeInfo[t].getRowValue(e,n);var r=e.cells[n],i=SortableTable.getInnerText(r);return this.getValueFromString(i,t)},SortableTable.getInnerText=function(t){return t.getAttribute(e.sortCustomKey)!=null?t.getAttribute(e.sortCustomKey):tf_GetNodeText(t)};var r=[];for(var i=0;i<e.nbCells;i++){var s;this.sortConfig.sortTypes!=null&&this.sortConfig.sortTypes[i]!=null?(s=this.sortConfig.sortTypes[i].tf_LCase(),s=="none"&&(s="None")):e.hasColNbFormat&&e.colNbFormat[i]!=null?s=e.colNbFormat[i].tf_LCase():e.hasColDateType&&e.colDateType[i]!=null?s=e.colDateType[i].tf_LCase()+"date":s="String",r.push(s)}this.AddSortType=function(){SortableTable.prototype.addSortType(arguments[0],arguments[1],arguments[2],arguments[3])},this.AddSortType("number",Number),this.AddSortType("caseinsensitivestring",SortableTable.toUpperCase),this.AddSortType("date",SortableTable.toDate),this.AddSortType("string"),this.AddSortType("us",usNumberConverter),this.AddSortType("eu",euNumberConverter),this.AddSortType("dmydate",dmyDateConverter),this.AddSortType("ymddate",ymdDateConverter),this.AddSortType("mdydate",mdyDateConverter),this.AddSortType("ddmmmyyyydate",ddmmmyyyyDateConverter),this.AddSortType("ipaddress",ipAddress,sortIP),this.st=new SortableTable(this.tbl,r);if(this.sortConfig.asyncSort&&this.sortConfig.triggerIds!=null){var o=this.sortConfig.triggerIds;for(var u=0;u<o.length;u++){if(o[u]==null)continue;var a=tf_Id(o[u]);a&&(a.style.cursor="pointer",a.onclick=function(){e.sort&&e.st.asyncSort(o.tf_IndexByValue(this.id,!0))},a.setAttribute("_sortType",r[u]))}}this.sortConfig.sortCol&&this.st.sort(this.sortConfig.sortCol[0],this.sortConfig.sortCol[1]),this.isSortEnabled=!0,this.onSortLoaded&&this.onSortLoaded.call(null,this,this.st),this.st.onbeforesort=function(){e.onBeforeSort&&e.onBeforeSort.call(null,e,e.st.sortColumn),e.Sort(),e.paging&&(n=!0,e.paging=!1,e.RemovePaging())},this.st.onsort=function(){e.sorted=!0;if(e.alternateBgs){var t=e.tbl.rows,r=0;function i(t,n,r){r==undefined&&(r=!1),tf_removeClass(t,e.rowBgEvenCssClass),tf_removeClass(t,e.rowBgOddCssClass),r||tf_addClass(t,n%2?e.rowBgOddCssClass:e.rowBgEvenCssClass)}for(var s=e.refRow;s<e.nbRows;s++){var o=t[s].getAttribute("validRow");e.paging&&t[s].style.display==""?(i(t[s],r),r++):o!="true"&&o!=null||t[s].style.display!=""?i(t[s],r,!0):(i(t[s],r),r++)}}n&&(e.hasResultsPerPage&&(e.fObj.paging_length=e.resultsPerPageSlc.options[e.resultsPerPageSlc.selectedIndex].value),e.AddPaging(!1),e.SetPage(e.currentPageNb),n=!1),e.onAfterSort&&e.onAfterSort.call(null,e,e.st.sortColumn)}};