/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Filters Row Visibility Manager Extension v1.1
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
--------------------------------------------------------------------------
Copyright (c) 2009 Max Guglielmi

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
------------------------------------------------------------------------*/

TF.prototype.SetFiltersRowVisibility = function(extName)
{
	var o = this, f = o.fObj, ext = (extName) ? o.Ext.list[extName] : o.Ext.list['FiltersRowVisibility'];
	o.filtersRowVis = 	(f!=undefined && f.filters_row_visibility==undefined) ? true : f.filters_row_visibility;
	if(!o.filtersRowVis) return;
	if(o.filtersRowVisEl!=null) return;									
	
	//Extension info
	o.filtersRowVisExtLoaded =			false;
	o.filtersRowVisExtName =			ext.name;
	o.filtersRowVisDesc =				ext.description;
	
	//Paths, filenames
	o.filtersRowVisExtPath = 			(ext.path == undefined) 
											? 'TFExt_FiltersRowVisibility/' : ext.path;
	o.filtersRowVisStylesheet = 		'TFExt_FiltersRowVisibility.css';
	o.icnExpand =						'icn_exp.png'; //expand icon
	o.icnCollapse =						'icn_clp.png'; //collapse icon
	
	//Elements, inner code, texts
	o.filtersRowVisEl =					null; //expand/collapse filters span element
	o.btnFiltersRowVisEl =				null; //expand/collapse filters btn element
	o.icnExpandFiltersHtml = 			'<img src="'+o.filtersRowVisExtPath+o.icnExpand+'" alt="Expand filters" >';
	o.icnCollapseFiltersHtml = 			'<img src="'+o.filtersRowVisExtPath+o.icnCollapse+'" alt="Collapse filters" >';
	o.filtersRowVisDefaultText = 		'Expand/Collapse Filters';
	
	//id of container element
	o.filtersRowVisTgtId =				f!=undefined && f.filters_row_visibility_target_id!=undefined 
											? f.filters_row_visibility_target_id : null;
	//enables/disables expand/collapse icon
	o.filtersRowVisIcon =				f!=undefined && f.filters_row_visibility_icon!=undefined 
											? f.filters_row_visibility_icon : true;					
	//defines expand/collapse filters text
	o.btnFiltersRowVisText =			f!=undefined && f.btn_filters_row_visibility_text!=undefined 
											? (o.filtersRowVisIcon ? o.icnCollapseFiltersHtml + f.btn_filters_row_visibility_text : 
												f.btn_filters_row_visibility_text) : 
												(o.filtersRowVisIcon ? o.icnCollapseFiltersHtml : o.filtersRowVisDefaultText); 
	o.btnFiltersRowVisExpText =			f!=undefined && f.btn_filters_row_visibility_text!=undefined 
											? (o.filtersRowVisIcon ? o.icnExpandFiltersHtml + f.btn_filters_row_visibility_text :
												f.btn_filters_row_visibility_text) :
												(o.filtersRowVisIcon) ? o.icnExpandFiltersHtml : o.filtersRowVisDefaultText; 
											
	//defines expand/collapse filters button innerHtml
	o.btnFiltersRowVisHtml =			f!=undefined && f.btn_filters_row_visibility_html!=undefined 
											? f.btn_filters_row_visibility_html : null; 
	//defines css class for expand/collapse filters button
	o.btnFiltersRowVisClass =			f!=undefined && f.btn_filters_row_visibility_css_class!=undefined 
											? f.btn_filters_row_visibility_css_class :'btnExpClpFlt';
	//defines css class span containing expand/collapse filters
	o.filtersRowVisClass =				f!=undefined && f.filters_row_visibility_css_class!=undefined 
											? f.filters_row_visibility_css_class : 'expClpFlt';
	//only if external headers
	o.filtersRowVisFiltersTbl =			f!=undefined && f.filters_row_visibility_filters_table!=undefined 
											? tf_Id(f.filters_row_visibility_filters_table) : null;
	//only if external headers
	o.filtersRowVisFiltersIndex = 		f!=undefined && f.filters_row_visibility_filters_index!=undefined 
											? f.filters_row_visibility_filters_index : 1;
											
	o.filtersRowVisAtStart =			f!=undefined && f.filters_row_visibility_at_start!=undefined 
											? f.filters_row_visibility_at_start : true;
	
	//prefixes
	o.prfxFiltersRowVisSpan =			'fltsVis_'; //span containing expand/collapse filters button
	
	/*** Extension events ***/
	//calls function before filters row is shown
	o.onBeforeShowFilters =			f!=undefined && tf_isFn(f.on_before_filters_row_is_displayed)
									 		? f.on_before_filters_row_is_displayed : null;
	//calls function after filters row is shown
	o.onAfterShowFilters =			f!=undefined && tf_isFn(f.on_after_filters_row_is_displayed)
									 		? f.on_after_filters_row_is_displayed : null;
	//calls function before filters row is hidden
	o.onBeforeHideFilters =			f!=undefined && tf_isFn(f.on_before_filters_row_is_hidden)
									 		? f.on_before_filters_row_is_hidden : null;
	//calls function after filters row is hidden
	o.onAfterHideFilters =			f!=undefined && tf_isFn(f.on_after_filters_row_is_hidden)
									 		? f.on_after_filters_row_is_hidden : null;
	/*** ***/										
	
	//Extension event definition
	o.Evt.name.filtersrowvisibility = 	'DisplayFiltersRow'; //event name for TF event manager
	o.msgDisplayFiltersRow =			'Show/Hide filters row'; //event status message
	o.Evt._DisplayFiltersRow = 			function(){ o.DisplayFiltersRow(); }; //event
	
	//Loads extension stylesheet
	o.IncludeFile(ext.name+'Style', o.filtersRowVisExtPath + o.filtersRowVisStylesheet, null, 'link');
	
	//Sets button
	o.SetFiltersRowVisBtn();
	
	o.filtersRowVisExtLoaded = true;
	
}

TF.prototype.SetFiltersRowVisBtn = function()
{
	if(!this.hasGrid && !this.isFirstLoad) return;
	if( this.filtersRowVisEl!=null ) return;
	var span = tf_CreateElm('span',['id',this.prfxFiltersRowVisSpan+this.id]);
	span.className = this.filtersRowVisClass;

	//Container element (rdiv or custom element)
	if(this.filtersRowVisTgtId==null) this.SetTopDiv();
	var targetEl = ( this.filtersRowVisTgtId==null ) ? this.rDiv : tf_Id( this.filtersRowVisTgtId );
	
	if(this.filtersRowVisTgtId==null)
		targetEl.firstChild.parentNode.insertBefore(span,targetEl.firstChild);
	else
		targetEl.appendChild(span);
	
	if(this.btnFiltersRowVisHtml==null)
	{ //Default link	
		var btn = tf_CreateElm( 'a', ['href','javascript:;'] );
		btn.className = this.btnFiltersRowVisClass;
		btn.title = this.filtersRowVisDesc;
		btn.innerHTML = this.btnFiltersRowVisText;
		span.appendChild(btn);
		btn.onclick = this.Evt._DisplayFiltersRow;
	} else { //Custom html
		span.innerHTML = this.btnFiltersRowVisHtml;
		var showHideFltsEl = span.firstChild;
		showHideFltsEl.onclick = this.Evt._DisplayFiltersRow;
	}
	
	this.filtersRowVisEl = span;
	this.btnFiltersRowVisEl = this.filtersRowVisEl.firstChild;
	
	if(!this.filtersRowVisAtStart) this._DisplayFiltersRow(this);
}

TF.prototype.DisplayFiltersRow = function()
{
	this.EvtManager(this.Evt.name.filtersrowvisibility); 
}

TF.prototype._DisplayFiltersRow = function(o)
{
	var tbl = (o.filtersRowVisFiltersTbl) ? o.filtersRowVisFiltersTbl : o.tbl;
	var fltIndex = (o.filtersRowVisFiltersTbl) 
						? o.filtersRowVisFiltersIndex : o.GetFiltersRowIndex();
	var fltRow = tbl.rows[fltIndex];
	var fltRowDisplay = fltRow.style.display;
	
	if(o.onBeforeShowFilters && fltRowDisplay!='') o.onBeforeShowFilters.call(null,o);
	if(o.onBeforeHideFilters && fltRowDisplay=='') o.onBeforeHideFilters.call(null,o);
	
	fltRow.style.display = (fltRowDisplay=='') ? 'none' : '';
	if(o.filtersRowVisIcon && o.btnFiltersRowVisHtml==null)
		o.btnFiltersRowVisEl.innerHTML = (fltRowDisplay=='') 
											? o.btnFiltersRowVisExpText : o.btnFiltersRowVisText;
	
	if(o.onAfterShowFilters && fltRowDisplay!='') o.onAfterShowFilters.call(null,o);
	if(o.onAfterHideFilters && fltRowDisplay=='') o.onAfterHideFilters.call(null,o);
}

TF.prototype.RemoveFiltersRowVisibility = function()
{
	if(this.filtersRowVisEl==null) return;
	this.filtersRowVisEl.parentNode.removeChild(this.filtersRowVisEl);
	this.filtersRowVisEl = null;
	this.btnFiltersRowVisEl = null;
}
