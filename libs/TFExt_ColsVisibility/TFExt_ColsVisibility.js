/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Columns Visibility Manager Extension v1.4
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
	- Special credit to: 
	Salman A. Kagzi for active contribution and/or inspiration
------------------------------------------------------------------------*/

TF.prototype.SetColsVisibility = function(extName)
{
	var o = this, f = o.fObj, ext = (extName) ? o.Ext.list[extName] : o.Ext.list['ColsVisibility'];
	o.colsVisibility = 	(f.cols_visibility==undefined) ? true : f.cols_visibility;
	if(!o.colsVisibility || o.showHideColsExtLoaded) return;
	
	o.showHideColsExtLoaded =			false;
	o.showHideColsExtName =				ext.name;
	o.showHideColsExtDesc =				ext.description;
	
	o.showHideColsSpanEl =				null; //show/hide cols span element
	o.btnShowHideColsEl =				null; //show/hide cols button element
	o.showHideColsContEl =				null; //show/hide cols container div element
	
	o.showHideColsTickToHide =			f.showHide_cols_tick_to_hide!=undefined //tick to hide or show column
											? f.showHide_cols_tick_to_hide : true;
	o.showHideColsManager =				f.showHide_cols_manager!=undefined //enables/disables cols manager generation
											? f.showHide_cols_manager : true;
	o.showHideColsHeadersTbl =			f.showHide_cols_headers_table!=undefined //only if external headers
											? f.showHide_cols_headers_table : null;
	o.showHideColsHeadersIndex = 		f.showHide_cols_headers_index!=undefined //only if external headers
											? f.showHide_cols_headers_index : 1;
	o.showHideColsContElTgtId =			f.showHide_cols_container_target_id!=undefined //id of container element
											? f.showHide_cols_container_target_id : null;
	o.showHideColsHeadersText =			f.showHide_cols_headers_text!=undefined //alternative headers text
											? f.showHide_cols_headers_text : null;								
	o.btnShowHideColsTgtId =			f.btn_showHide_cols_target_id!=undefined //id of button container element
											? f.btn_showHide_cols_target_id : null;	
	o.btnShowHideColsText =				f.btn_showHide_cols_text!=undefined 
											? f.btn_showHide_cols_text : 'Display columns&#9660;'; //defines show/hide cols text
	o.btnShowHideColsHtml =				f.btn_showHide_cols_html!=undefined 
											? f.btn_showHide_cols_html : null; //defines show/hide cols button innerHtml
	o.btnShowHideColsCssClass =			f.btn_showHide_cols_css_class!=undefined //defines css class for show/hide cols button
											? f.btn_showHide_cols_css_class :'showHideCols';
	o.btnShowHideColsCloseText =		f.btn_showHide_cols_close_text!=undefined 
											? f.btn_showHide_cols_close_text : 'Close'; //defines close link text
	o.btnShowHideColsCloseHtml =		f.btn_showHide_cols_close_html!=undefined 
											? f.btn_showHide_cols_close_html : null; //defines close button innerHtml
	o.btnShowHideColsCloseCssClass =	f.btn_showHide_cols_close_css_class!=undefined //defines css class for close button
											? f.btn_showHide_cols_close_css_class :o.btnShowHideColsCssClass;
	
	o.showHideColsExtPath = 			(ext.path == undefined) ? 'TFExt_ColsVisibility/' : ext.path;
	o.showHideColsStylesheet = 			'TFExt_ColsVisibility.css';	
	o.prfxShowHideColsSpan =			'showHideCols_'; //span containing show/hide cols button
	o.showHideColsSpanCss =				f.showHide_cols_span_css_class!=undefined //defines css class span containing show/hide cols
											? f.showHide_cols_span_css_class : 'showHideColsSpan';
	o.prfxShowHideColsCont =			'showHideColsCont_';
	o.showHideColsContCss =				f.showHide_cols_cont_css_class!=undefined //defines css class div containing show/hide cols
											? f.showHide_cols_cont_css_class : 'showHideColsCont';		
	o.showHideColsListCss =				f.showHide_cols_list_css_class!=undefined //defines css class for cols list (ul)
											? f.showHide_cols_list_css_class : 'cols_checklist';
	o.showHideColsListItemCssClass = 	f.checklist_item_css_class!=undefined //defines css class for list item (li)
											? f.checklist_item_css_class : 'cols_checklist_item';
	o.showHideColsListSlcItemCssClass = f.checklist_selected_item_css_class!=undefined //defines css class for selected list item (li)
											? f.checklist_selected_item_css_class : 'cols_checklist_slc_item';
	o.showHideColsText =				f.showHide_cols_text!=undefined //text preceding columns list
											? f.showHide_cols_text : 'Hide columns: ';
	o.showHideColsAtStart =				f.showHide_cols_at_start!=undefined
											? f.showHide_cols_at_start : null;
	o.showHideColsEnableHover =			f.showHide_cols_enable_hover!=undefined
											? f.showHide_cols_enable_hover : false;			
	o.showHideEnableTickAll =			f.showHide_enable_tick_all!=undefined //enables select all option
											? f.showHide_enable_tick_all : false;
	o.showHideTickAllText =				f.showHide_tick_all_text!=undefined //text preceding columns list
											? f.showHide_tick_all_text : 'Select all:';	
	o.showHideColsIsOpen =				false;
	o.showHideHiddenCols =				[]; //array containing hidden columns indexes
	o.tblHasColTag =					(tf_Tag(o.tbl,'col').length > 0) ? true : false;							
	
	/*** Extension events ***/
	//callback invoked just after cols manager is loaded
	o.onColsManagerLoaded = 			tf_IsFn(f.on_cols_manager_loaded) ? f.on_cols_manager_loaded : null;
	//calls function before cols manager is opened
	o.onBeforeOpenColsManager =			tf_IsFn(f.on_before_open_cols_manager) ? f.on_before_open_cols_manager : null;
	//calls function after cols manager is opened
	o.onAfterOpenColsManager =			tf_IsFn(f.on_after_open_cols_manager) ? f.on_after_open_cols_manager : null;
	//calls function before cols manager is closed
	o.onBeforeCloseColsManager =		tf_IsFn(f.on_before_close_cols_manager) ? f.on_before_close_cols_manager : null;
	//calls function after cols manager is closed
	o.onAfterCloseColsManager =			tf_IsFn(f.on_after_close_cols_manager) ? f.on_after_close_cols_manager : null;
	
	//calls function before col is hidden
	o.onBeforeColIsHidden =				tf_IsFn(f.on_before_col_is_hidden) ? f.on_before_col_is_hidden : null;
	//calls function after col is hidden
	o.onAfterColIsHidden =				tf_IsFn(f.on_after_col_is_hidden) ? f.on_after_col_is_hidden : null;
	//calls function before col is displayed
	o.onBeforeColIsDisplayed =			tf_IsFn(f.on_before_col_is_displayed) ? f.on_before_col_is_displayed : null;
	//calls function after col is displayed
	o.onAfterColIsDisplayed =			tf_IsFn(f.on_after_col_is_displayed) ? f.on_after_col_is_displayed : null;
	/*** ***/										
	
	//Grid layout compatibility
	if(o.gridLayout){
		o.showHideColsHeadersTbl = o.headTbl; //headers table
		o.showHideColsHeadersIndex = 0; //headers index
		o.onAfterColIsDisplayed = function(){};
		o.onAfterColIsHidden = function(){};
	}
	
	//Extension event definition
	o.Evt.name.colsvisibility = 		'ShowColsVisibility'; //event name for TF event manager
	o.msgShowColsVisibility =			'Show/Hide columns'; //event status message
	o.Evt._ShowColsVisibility = 		function(){ o.ShowColsVisibility(); }; //event
	o.Evt.name.checkitem = 				'CheckItem'; //event name for TF event manager
	o.msgCheckItem =					'Showing/hiding columns'; //event status message
	o.Evt._CheckItem = 					function(li){ o.CheckItem(li); }; //event
	
	//Loads extension stylesheet
	o.IncludeFile(ext.name+'Style', o.showHideColsExtPath + o.showHideColsStylesheet, null, 'link');
	
	//Sets button
	if(o.showHideColsManager) o.SetShowHideColsBtn();
	o.showHideColsExtLoaded = true;
}

TF.prototype.SetShowHideColsBtn = function()
/*====================================================
	- Generates show/hide cols button
=====================================================*/
{
	if(!this.hasGrid && !this.isFirstLoad) return;
	if( this.btnShowHideColsEl!=null ) return;
	var showHideColsSpan = tf_CreateElm('span',['id',this.prfxShowHideColsSpan+this.id]);
	showHideColsSpan.className = this.showHideColsSpanCss;
	
	//Container element (rdiv or custom element)
	if(this.btnShowHideColsTgtId==null) this.SetTopDiv();
	var targetEl = ( this.btnShowHideColsTgtId==null ) ? this.rDiv : tf_Id( this.btnShowHideColsTgtId );

	if(this.btnShowHideColsTgtId==null)
		targetEl.firstChild.parentNode.insertBefore(showHideColsSpan,targetEl.firstChild);
	else
		targetEl.appendChild(showHideColsSpan);
		
	if(this.btnShowHideColsHtml==null)
	{ //Default link	
		var btn = tf_CreateElm( 'a', ['href','javascript:;'] );
		btn.className = this.btnShowHideColsCssClass;
		btn.title = this.showHideColsExtDesc;
		
		btn.innerHTML = this.btnShowHideColsText;
		showHideColsSpan.appendChild(btn);
		if(!this.showHideColsEnableHover)
			btn.onclick = this.Evt._ShowColsVisibility;
		else{
			var o = this;
			btn.onmouseover = this.Evt._ShowColsVisibility;
		}
	} else { //Custom html
		showHideColsSpan.innerHTML = this.btnShowHideColsHtml;
		var showHideColsEl = showHideColsSpan.firstChild;
		if(!this.showHideColsEnableHover)
			showHideColsEl.onclick = this.Evt._ShowColsVisibility;
		else
			showHideColsEl.onmouseover = this.Evt._ShowColsVisibility;
	}
	
	this.showHideColsSpanEl = showHideColsSpan;
	this.btnShowHideColsEl = this.showHideColsSpanEl.firstChild;
	
	this.SetColsVisibilityManager();

	if(this.onColsManagerLoaded) this.onColsManagerLoaded.call(null, this);	
}

TF.prototype.SetColsVisibilityManager = function()
/*====================================================
	- Generates show/hide cols manager
=====================================================*/
{
	if(!this.hasGrid && !this.isFirstLoad) return;

	var container = (!this.showHideColsContElTgtId) 
						? tf_CreateElm('div',['id',this.prfxShowHideColsCont+this.id]) 
						: tf_Id(this.showHideColsContElTgtId);
	container.className = this.showHideColsContCss;
	
	//Extension description
	var extNameLabel = tf_CreateElm('p');
	extNameLabel.innerHTML = this.showHideColsText;
	container.appendChild(extNameLabel);
	
	//Headers list 
	var ul = tf_CreateElm('ul',['id','ul'+this.showHideColsExtName+'_'+this.id]);
	ul.className = this.showHideColsListCss;
	
	var o = this;	
	var tbl = (o.showHideColsHeadersTbl) ? o.showHideColsHeadersTbl : o.tbl;
	var headerIndex = (o.showHideColsHeadersTbl) 
						? o.showHideColsHeadersIndex : o.GetHeadersRowIndex();
	var headerRow = tbl.rows[headerIndex];
	
	//Tick all option
	if(o.showHideEnableTickAll){
		var li = tf_CreateCheckItem('col__'+o.id, o.showHideTickAllText, o.showHideTickAllText);
		tf_AddClass(li,this.showHideColsListItemCssClass);
		ul.appendChild(li);
		var isAllTicked = false;
		li.check.onclick = function(){ 
			for(var h=0; h<headerRow.cells.length; h++)
			{
				var itm = tf_Id('col_'+h+'_'+o.id);
				if(!isAllTicked && itm.checked) itm.checked = false;
				if(isAllTicked && !itm.checked) itm.checked = true;
				if(itm) itm.click();
			}
			isAllTicked = (isAllTicked ? false : true);
		};
		if(tf_isIE)
		{//IE: label looses check capability
			li.label.onclick = function(){ this.firstChild.click(); };
		}
	}
	
	for(var i=0; i<headerRow.cells.length; i++)
	{
		var cell = headerRow.cells[i];
		var cellText = (o.showHideColsHeadersText && o.showHideColsHeadersText[i]) 
						? o.showHideColsHeadersText[i] : tf_GetHeaderText(cell);
		var li = tf_CreateCheckItem('col_'+i+'_'+o.id, cellText, cellText);
		tf_AddClass(li,this.showHideColsListItemCssClass);
		if(!o.showHideColsTickToHide) tf_AddClass(li,this.showHideColsListSlcItemCssClass);
		ul.appendChild(li);
		if(!o.showHideColsTickToHide) li.check.checked = true;
		li.check.onclick = function(){ o.Evt._CheckItem(this.parentNode); };
		if(tf_isIE)
		{//IE: label looses check capability
			li.label.onclick = function(){ this.firstChild.click(); };
		}
	}
	
	//separator
	var p = tf_CreateElm('p',['align','center']);
	
	//Close link
	if(this.btnShowHideColsCloseHtml==null)
	{ 
		var btn = tf_CreateElm( 'a', ['href','javascript:;'] );
		btn.className = this.btnShowHideColsCloseCssClass;
		btn.innerHTML = this.btnShowHideColsCloseText;
		btn.onclick = this.Evt._ShowColsVisibility;
		p.appendChild(btn);
	} else {
		p.innerHTML = this.btnShowHideColsCloseHtml;
		var btn = p.firstChild;
		btn.onclick = this.Evt._ShowColsVisibility;
	}

	container.appendChild(ul);
	container.appendChild(p);
	
	//this.showHideColsSpanEl.appendChild(container);	
	this.btnShowHideColsEl.parentNode.insertBefore(container, this.btnShowHideColsEl);
	this.showHideColsContEl = container;
	
	//IE6 only: options are not checked if showHideColsTickToHide=false
	if(tf_isIE && !o.showHideColsTickToHide)
		for(var i=0; i<headerRow.cells.length; i++)
			tf_Id('col_'+i+'_'+o.id).checked = true;
	
	if(this.showHideColsAtStart != null)
	{
		var a = this.showHideColsAtStart;
		for(var k=0; k<a.length; k++)
		{
			var itm = tf_Id('col_'+a[k]+'_'+o.id);
			if(itm) itm.click();
		}
	}
}

TF.prototype.ShowColsVisibility = function()
{
	this.EvtManager(this.Evt.name.colsvisibility); 
}

TF.prototype._ShowColsVisibility = function(o)
{
	var contDisplay = o.showHideColsContEl.style.display;
	
	if(o.onBeforeOpenColsManager && contDisplay!='inline') o.onBeforeOpenColsManager.call(null,o);
	if(o.onBeforeCloseColsManager && contDisplay=='inline') o.onBeforeCloseColsManager.call(null,o);
	
	o.showHideColsContEl.style.display = (contDisplay=='inline') ? 'none' : 'inline';
	
	if(o.onAfterOpenColsManager && contDisplay!='inline') o.onAfterOpenColsManager.call(null,o);
	if(o.onAfterCloseColsManager && contDisplay=='inline') o.onAfterCloseColsManager.call(null,o);
}

TF.prototype.CheckItem = function(n)
{
	this.EvtManager(this.Evt.name.checkitem,{ lbl:n });
}

TF.prototype._CheckItem = function(o, el)
{
	var li = el.lbl || tf_Tag(el, 'label')[0];
	if(li == null || li.firstChild == null) return;
	var isChecked = li.firstChild.checked;
	var colIndex = li.firstChild.getAttribute('id').split('_')[1];
	if(isChecked){
		tf_AddClass(li.parentNode,o.showHideColsListSlcItemCssClass);
	} else {
		tf_RemoveClass(li.parentNode,o.showHideColsListSlcItemCssClass);
	}
	var hide = ((o.showHideColsTickToHide && isChecked) || (!o.showHideColsTickToHide && !isChecked)) ? true : false;
	o._ShowHideCol(colIndex, hide);
}

TF.prototype._ShowHideCol = function(colIndex, hide)
{
	var o = this;
	var col = tf_Tag(o.tbl,'col')[colIndex];
	//External headers
	var col1 = (o.showHideColsHeadersTbl) 
				? tf_Tag(o.showHideColsHeadersTbl,'col')[colIndex] : null;
	
	if(o.onBeforeColIsHidden && hide) o.onBeforeColIsHidden.call(null, o, colIndex);
	if(o.onBeforeColIsDisplayed && !hide) o.onBeforeColIsDisplayed.call(null, o, colIndex);
	
	if(o.tblHasColTag && tf_isIE)
	{//cols can be hidden only under IE
		var tbl = (o.showHideColsHeadersTbl) ? o.showHideColsHeadersTbl : o.tbl;
		var filtersRow = tbl.rows[o.GetFiltersRowIndex()];
		var a1 = o.GetFiltersByType(o.fltTypeSlc,true);
		var a2 = o.GetFiltersByType(o.fltTypeMulti,true);
		var a = a1.concat(a2);
		
		if(col){
			col.style.display = (hide) ? 'none' : '';
			//Selects are displayed even if column is hidden under IE6
			if(a.tf_Has(colIndex))
			{
				if(o.showHideColsHeadersTbl == null){
					filtersRow.cells[colIndex].style.visibility = (hide) ? 'hidden' : 'visible';
				}
				else{
					var flt = tf_Id(o.fltIds[colIndex]);
					flt.style.visibility = (hide) ? 'hidden' : 'visible';
				}
			}
		}
		if(col1){ col1.style.display = (hide) ? 'none' : ''; }
	} else {
		function hideCells(tbl)
		{
			for(var i=0; i<tbl.rows.length; i++)
			{
				var row = tbl.rows[i];
				var cell = row.cells[colIndex];
				if(cell){
					cell.style.display = (hide) ? 'none' : '';
				}
			}
		}
		hideCells(o.tbl);
		if(o.showHideColsHeadersTbl) hideCells(o.showHideColsHeadersTbl);
	}
	
	if(hide){
		if(!o.showHideHiddenCols.tf_Has(colIndex)){ o.showHideHiddenCols.push(colIndex); }
	} else {
		var itemIndex = o.showHideHiddenCols.tf_IndexByValue(colIndex, true);
		if(o.showHideHiddenCols.tf_Has(colIndex)){ o.showHideHiddenCols.splice(itemIndex, 1); }
	}
	
	if(o.onAfterColIsHidden && hide){
		//This event is fired just after a column is displayed for grid_layout compatibility
		if(o.gridLayout){
			//Returns the removed column widths
			function getHiddenWidth(){
				var ths = o.headTbl.rows[o.showHideColsHeadersIndex].cells;
				var hW = 0;
				for(var i=0; i<o.nbCells; i++){
					if(ths[i].style.display == 'none'){ 
						var w = parseInt(ths[i].style.width);
						ths[i].style.width = 0;
						hW += w;
					}
				}
				return hW;
			}
			if(tf_isIE || tf_isIE7){
				o.tbl.style.width = o.headTbl.clientWidth+'px';
			} else {
				o.headTbl.style.width = (parseInt(o.headTbl.style.width) - getHiddenWidth()) + 'px';
				o.tbl.style.width = o.headTbl.style.width;
				o.gridColElms[colIndex].style.display = 'none';
			}
		}
		o.onAfterColIsHidden.call(null, o, colIndex);
	}
	if(o.onAfterColIsDisplayed && !hide){
		//This event is fired just after a column is displayed for grid_layout compatibility
		if(o.gridLayout && (!tf_isIE && !tf_isIE7)){
			o.gridColElms[colIndex].style.display = '';
			var w = parseInt(o.gridColElms[colIndex].style.width);
			o.crWColsRow.cells[colIndex].style.width = w+'px';
			o.headTbl.style.width = (parseInt(o.headTbl.style.width)+w) + 'px';
			o.tbl.style.width = o.headTbl.style.width;
		}
		o.onAfterColIsDisplayed.call(null, o, colIndex);
	}
}

/* Public methods */
TF.prototype.ShowCol = function(colIndex){
	if(colIndex == undefined) return;
	if(!this.IsColHidden(colIndex)) return;
	if(this.showHideColsManager && this.showHideColsContEl){
		var itm = tf_Id('col_'+colIndex+'_'+this.id);
		if(itm){ itm.click(); }
	} else {
		this._ShowHideCol(colIndex, false);
	}
}
TF.prototype.HideCol = function(colIndex){
	if(colIndex == undefined) return;
	if(this.IsColHidden(colIndex)) return;
	if(this.showHideColsManager && this.showHideColsContEl){
		var itm = tf_Id('col_'+colIndex+'_'+this.id);
		if(itm){ itm.click(); }
	} else {
		this._ShowHideCol(colIndex, true);
	}
}
TF.prototype.IsColHidden = function(colIndex){
	if(this.showHideHiddenCols.tf_Has(colIndex)){ return true; }
	return false;
}
TF.prototype.ToggleCol = function(colIndex){
	if(colIndex == undefined) return;
	if(this.IsColHidden(colIndex)){
		this.ShowCol(colIndex);
	} else {
		this.HideCol(colIndex);
	}
}
TF.prototype.GetHiddenColIndexes = function(){ return this.showHideHiddenCols; }
TF.prototype.RemoveColsVisibility = function()
{
	if(!this.btnShowHideColsEl || !this.showHideColsContEl) return;
	if(tf_Id(this.showHideColsContElTgtId)){ 
		tf_Id(this.showHideColsContElTgtId).innerHTML = '';
	} else {
		this.showHideColsContEl.innerHTML = '';
		this.showHideColsContEl.parentNode.removeChild(this.showHideColsContEl);
		this.showHideColsContEl = null;	
	}
	this.btnShowHideColsEl.innerHTML = '';
	this.btnShowHideColsEl.parentNode.removeChild(this.btnShowHideColsEl);
	this.btnShowHideColsEl = null;
	this.showHideColsExtLoaded = false;
}

var tf_GetHeaderText = function(cell){
	if(cell.hasChildNodes){
		for( var i=0; i<cell.childNodes.length; i++ ){
			var n = cell.childNodes[i];
			if(n.nodeType == 3) return n.nodeValue;
			else if(n.nodeType == 1){
				if(n['id'] && n.id.indexOf('popUp')!=-1) continue;
				else return tf_GetNodeText(n);
			} else continue;
		} return '';
	} else { return ''; }
}