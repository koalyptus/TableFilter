/*------------------------------------------------------------------------
	- ezEditTable v2.3 (edittable.free.fr)
	- Copyright (c) 2012 Max Guglielmi
	- License required for use
------------------------------------------------------------------------*/

var EditTable = function(id){
/*========================================================================
	- EditTable object constructor
	- Params:
		- id: table id (string)
		- startRow (optional): start row index (number)
		- config (optional): configuration object (literal object)
========================================================================*/
	if(arguments.length === 0){ return; }
	this.id = id;
	this.version = '2.3';
	this.table = this.Get(id);
	this.tBody = this.table.tBodies[0];
	this.startRow = 0;
	this.config = null;
	this.nbCells = null;
	if(!window['et_activeGrid']){ window.et_activeGrid = ''; }//global var for active grid in page

	if(this.table === null || this.table.nodeName.LCase() !== 'table'){ return; }
	var tBodyRows = this.Tag(this.tBody, 'tr');
	if(tBodyRows.length > 0){ this.startRow = tBodyRows[0].rowIndex; }

	if(arguments.length > 1){
		for(var i=0; i<arguments.length; i++){
			var argtype = typeof arguments[i];
			if(argtype.LCase() === 'number'){ this.startRow = arguments[i]; }
			if(argtype.LCase() === 'object'){ this.config = arguments[i]; }
		}
	}

	//cols nb
	this.nbCells = this.GetCellsNb(this.startRow);

	/********************************************
	* 		Configuration object 				*
	*********************************************/
	var f = this.config || {};
	/*** Common properties ***/
	this.selection = f.selection===false ? false : true; //enables/disables selection model
	this.keyNav = f.key_navigation!==undefined ? f.key_navigation : true; //enables/disables keyboard navigation
	this.editable = f.editable!==undefined ? f.editable : false; //enables/disables cell edition model
	this.tableCss = f.table_css!==undefined ? f.table_css : 'ezEditableTable'; //default css class applied to html table
	this.unselectableCss = f.unselectable_css!==undefined ? f.unselectable_css : 'ezUnselectable'; //default css class applied to html table to make text unselectable
	this.basePath = f.base_path!==undefined ? f.base_path : 'ezEditTable/'; //default script base path
	this.activityIndicatorCss = f.activity_indicator_css!==undefined ? f.activity_indicator_css : 'ezOpacity'; //server activity indicator default css class
	this.onServerActivityStart = this.IsFn(f.on_server_activity_start) ? f.on_server_activity_start : null; //function called on server-side operations start
	this.onServerActivityStop = this.IsFn(f.on_server_activity_stop) ? f.on_server_activity_stop : null; //function called when server-side operation completed

	//Selection properties
	this.selectionModel = f.selection_model!==undefined ? f.selection_model.LCase() : 'single'; //selection model: multiple or single
	this.defaultSelection = f.default_selection!==undefined ? f.default_selection.LCase() : 'row'; //default selection: row, cell, both
	this.keySelection = this.editable ? true : f.key_selection!==undefined  ? f.key_selection : true; //multiple selection: select muliple rows by holding Ctrl key down
	this.selectRowAtStart = f.select_row_at_start!==undefined ? f.select_row_at_start : false; //select a row at start
	this.rowIndexAtStart = f.row_index_at_start!==undefined ? parseInt(f.row_index_at_start, 10) : this.startRow; //select row at start
	this.scrollIntoView = f.scroll_into_view!==undefined ? f.scroll_into_view : false; //scrolls the element into view with key navigation
	this.activeRowCss = f.active_row_css!==undefined ? f.active_row_css : 'ezActiveRow'; //default css class applied to active row
	this.selectedRowCss = f.selected_row_css!==undefined ? f.selected_row_css : 'ezSelectedRow'; //default css class applied to selected row (multiple selection)
	this.activeCellCss = f.active_cell_css!==undefined ? f.active_cell_css : 'ezActiveCell'; //default css class applied to selected row
	this.nbRowsPerPage = f.nb_rows_per_page!==undefined ? f.nb_rows_per_page : 10; //nb of rows when pageup/pagedown is pressed

	//Selection callbacks
	this.onSelectionInit = this.IsFn(f.on_selection_initialized) ? f.on_selection_initialized : null; //selection object initialized callback
	this.onBeforeSelectedRow = this.IsFn(f.on_before_selected_row) ? f.on_before_selected_row : null; //callback invoked before a row is selected
	this.onAfterSelectedRow = this.IsFn(f.on_after_selected_row) ? f.on_after_selected_row : null; //callback invoked after a row is selected
	this.onBeforeSelectedCell = this.IsFn(f.on_before_selected_cell) ? f.on_before_selected_cell : null; //callback invoked before a row is selected
	this.onAfterSelectedCell = this.IsFn(f.on_after_selected_cell) ? f.on_after_selected_cell : null; //callback invoked after a cell is selected
	this.onBeforeDeselectedRow = this.IsFn(f.on_before_deselected_row) ? f.on_before_deselected_row : null; //callback invoked before a row is deselected
	this.onAfterDeselectedRow = this.IsFn(f.on_after_deselected_row) ? f.on_after_deselected_row : null; //callback invoked after a row is deselected
	this.onBeforeDeselectedCell = this.IsFn(f.on_before_deselected_cell) ? f.on_before_deselected_cell : null; //callback invoked before a cell is deselected
	this.onAfterDeselectedCell = this.IsFn(f.on_after_deselected_cell) ? f.on_after_deselected_cell : null; //callback invoked after a cell is deselected
	this.onValidateRow = this.IsFn(f.on_validate_row) ? f.on_validate_row : null; //callback invoked after a row is double-clicked or enter key pressed
	this.onValidateCell = this.IsFn(f.on_validate_cell) ? f.on_validate_cell : null; //callback invoked after a cell is double-clicked or enter key pressed

	//Editable properties
	this.editorModel = f.editor_model!==undefined ? f.editor_model.LCase() : 'cell'; //'cell' or 'row' (template later)
	this.openEditorAction = f.open_editor_action!==undefined ? f.open_editor_action.LCase() : 'dblclick'; //editor is shown on a dblclick or click
	this.ajax = window['jQuery'] && f.ajax!==false ? true : false; //enable/disable AJAX, if jquery is available has to be explicitly set to false to disable it
	this.autoSave = f.auto_save!==undefined ? f.auto_save : this.editable; //save pending changes on selection change
	this.autoSaveModel = f.auto_save_model!==undefined ? f.auto_save_model : 'row'; //'cell' or 'row', save on cell or row selection change
	this.autoSaveType = f.auto_save_type!==undefined ? f.auto_save_type : 'both'; //'update', 'insert' or 'both' save only inserts, updates or both
	this.editableOnKeystroke = f.editable_on_keystroke!==undefined ? f.editable_on_keystroke : false; //enable/disable inline editing by key stroke
	this.newRowPrefix = f.new_row_prefix!==undefined ? f.new_row_prefix : 'tr'; //prefix for new row element id
	this.formSubmitInterval = f.form_submit_interval!==undefined ? f.form_submit_interval : 50; //interval separating form submissions (overload server security policy)
	this.newRowPos = f.new_row_pos!==undefined ? f.new_row_pos : 'top'; //new row position 'top', 'bottom' or integer for row index

	//Cells editor properties
	this.edtTypes = {
		none:'none', input:'input', textarea:'textarea', select:'select', multiple:'multiple',
		bool:'boolean', uploader:'uploader', command:'command', custom:'custom'
	};
	this.editors = [];
	this.cellEditors = this.IsArray(f.cell_editors) ? f.cell_editors : []; //editors configuration objects
	this.editorTypes = []; this.editorCss = []; this.editorStyles = []; this.editorAttributes = []; this.customEditor = [];
	this.editorCustomSlcOptions = []; this.editorCustomSlcValues = []; this.editorSortSlcOptions = []; this.editorValuesSeparator = [];
	this.editorAllowEmptyValue = []; this.editorCmdColIndex = null; this.editorCmdBtns = {}; this.editorUploader = [];
	this.uplURI = []; this.uplPath = []; this.uplShowUpload = []; this.uplShowLink = []; this.linkCss = []; this.uplSqlField = [];
	this.uplLoaderImg = []; this.uplOkImg = []; this.uplMaxFileSize = []; this.uplValidExt = []; this.uplCss = []; this.uplOutputCss = [];
	this.uplDisplayCss = []; this.uplJsSuccess = []; this.uplRecordIdColIndex = []; this.showUpload = []; this.onBeforeOpenUploader = [];
	this.onAfterOpenUploader = []; this.onBeforeCloseUploader = []; this.onAfterCloseUploader = [];
	for(var i=0; i<this.nbCells; i++){
		var editor = this.cellEditors[i];
		if(!editor) continue;
		this.editorTypes[i] = editor['type']; this.editorCss[i] = editor['css'];
		this.editorAttributes[i] = editor['attributes']; this.editorStyles[i] = editor['style'];
		this.editorCustomSlcOptions[i] = editor['custom_slc_options']; this.editorCustomSlcValues[i] = editor['custom_slc_values'];
		this.editorSortSlcOptions[i] = editor['sort_slc_options']; this.editorValuesSeparator[i] = editor['values_separator'];
		this.customEditor[i] = editor['target']; this.editorAllowEmptyValue[i] = editor['allow_empty_value'];

		switch(this.editorTypes[i]){
			case this.edtTypes.command:
				this.editorCmdColIndex = editor['command_column_index']!==undefined ? parseInt(editor['command_column_index'], 10) : (this.nbCells-1);
				this.editorCmdBtns = editor['buttons'] || {};
			break;
			case this.edtTypes.uploader:
				var upl = this.editorUploader[i] = editor['uploader'] || {};
				this.hasUploader = true;
				//Uploader settings
				this.uplURI[i] = upl.hasOwnProperty('uri') ? upl['uri'] : null; //upload URI
				this.uplPath[i] = upl.hasOwnProperty('path') ? upl['path'] : null; //upload folder path
				this.uplShowUpload[i] = upl.hasOwnProperty('show_upload') ? upl['show_upload'] : true; //show uploaded file
				this.uplSqlField[i] = upl.hasOwnProperty('sql_field') ? upl['sql_field'] : 'IMAGENAME'; //SQL field name storing upload filename
				this.uplRecordIdColIndex[i] = upl.hasOwnProperty('record_id_column_index') ? upl['record_id_column_index'] : null; //Record id in a column
				this.uplShowLink[i] = upl.hasOwnProperty('show_link') ? upl['show_link'] : true; //Uploaded file appears as a link in Uploader box and in cell
				this.linkCss[i] = upl.hasOwnProperty('link_css') ? upl['link_css'] : ''; //Uploaded file link css
				this.uplLoaderImg[i] = upl.hasOwnProperty('loader_image') ? upl['loader_image'] : this.basePath + 'themes/img_loader.gif'; //local loader image path
				this.uplOkImg[i] = upl.hasOwnProperty('ok_image') ? upl['ok_image'] : this.basePath +'themes/icn_tick.png'; //local tick image path
				this.uplMaxFileSize[i] = upl.hasOwnProperty('max_file_size') ? upl['max_file_size'] : '102400'; //default max file size in bytes (100Kb)
				this.uplValidExt[i] =  upl.hasOwnProperty('valid_extensions') ? upl['valid_extensions'] : 'jpg, jpeg, gif, png'; //default file extension allowed
				this.uplCss[i] = upl.hasOwnProperty('css') ? upl.css : 'ezUploaderEditor'; //uploader container css
				this.uplOutputCss[i] = upl.hasOwnProperty('output_css') ? upl['output_css'] : 'ezUploaderEditorOutput'; //uploader output message css
				this.uplDisplayCss[i] = upl.hasOwnProperty('display_css') ? upl['display_css'] : 'ezUploaderEditorDisplay'; //image displayer css
				this.uplJsSuccess[i] = upl.hasOwnProperty('javascript_code_success') ? upl['javascript_code_success']
										: '<script>window.parent["{1}"].SetUploadSuccess(true); window.parent["{1}"].SetUploadName("{0}");' +
											'window.parent["{1}"].ShowUpload();</script>'; //js code invoked from server-side when file successfully uploaded

				//Uploader callbacks and delegates
				this.showUpload[i] =  upl.hasOwnProperty('show_upload')	&& this.IsFn(upl['show_upload']) ? upl['show_upload'] : null; //delegate function for showing uploaded file
				this.onBeforeOpenUploader[i] = upl.hasOwnProperty('on_before_open') && this.IsFn(upl['on_before_open']) ? upl['on_before_open'] : null;
				this.onAfterOpenUploader[i] = upl.hasOwnProperty('on_after_open') && this.IsFn(upl['on_after_open']) ? upl['on_after_open'] : null;
				this.onBeforeCloseUploader[i] = upl.hasOwnProperty('on_before_close') && this.IsFn(upl['on_before_close']) ? upl['on_before_close'] : null;
				this.onAfterCloseUploader[i] = upl.hasOwnProperty('on_after_close') && this.IsFn(upl['on_after_close']) ? upl['on_after_close'] : null;
			break;
		}
	}
	if(this.editorTypes.indexOf(this.edtTypes.command) != -1){ this.editorModel = 'row'; }
	this.inputEditorCss = f.input_editor_css!==undefined ? f.input_editor_css : 'ezInputEditor'; //default css class applied to input editor
	this.textareaEditorCss = f.textarea_editor_css!==undefined ? f.textarea_editor_css : 'ezTextareaEditor'; //default css class applied to textarea editor
	this.selectEditorCss = f.select_editor_css!==undefined ? f.select_editor_css : 'ezSelectEditor'; //default css class applied to select editor
	this.commandEditorCss = f.command_editor_css!==undefined ? f.command_editor_css : 'ezCommandEditor'; //default css class applied to command editor
	this.modifiedCellCss = f.modified_cell_css!==undefined ? f.modified_cell_css : 'ezModifiedCell'; //default css class applied to modified cell

	//Command type editor config
	this.cmdEnabledBtns = this.editorCmdBtns.hasOwnProperty('enable') ? this.editorCmdBtns.enable : ['update', 'insert', 'delete', 'submit', 'cancel']; //command buttons to be enabled
	this.cmdUpdateBtn = this.editorCmdBtns.hasOwnProperty('update') ? this.editorCmdBtns.update : {}; //update command button
	this.cmdInsertBtn = this.editorCmdBtns.hasOwnProperty('insert') ? this.editorCmdBtns.insert : {}; //insert command button
	this.cmdDeleteBtn = this.editorCmdBtns.hasOwnProperty('delete') ? this.editorCmdBtns['delete'] : {}; //delete command button
	this.cmdSubmitBtn = this.editorCmdBtns.hasOwnProperty('submit') ? this.editorCmdBtns['submit'] : {}; //submit command button
	this.cmdCancelBtn = this.editorCmdBtns.hasOwnProperty('cancel') ? this.editorCmdBtns.cancel : {}; //cancel command button

	this.cmdUpdateBtnText = this.cmdUpdateBtn.hasOwnProperty('text') ? this.cmdUpdateBtn.text : ''; //Default text is empty because icon is set by default
	this.cmdInsertBtnText = this.cmdInsertBtn.hasOwnProperty('text') ? this.cmdInsertBtn.text : ''; //Default text is empty because icon is set by default
	this.cmdDeleteBtnText = this.cmdDeleteBtn.hasOwnProperty('text') ? this.cmdDeleteBtn.text : ''; //Default text is empty because icon is set by default
	this.cmdSubmitBtnText = this.cmdSubmitBtn.hasOwnProperty('text') ? this.cmdSubmitBtn.text : 'Submit';
	this.cmdCancelBtnText = this.cmdCancelBtn.hasOwnProperty('text') ? this.cmdCancelBtn.text : 'Cancel';

	this.cmdUpdateBtnTitle = this.cmdUpdateBtn.hasOwnProperty('title') ? this.cmdUpdateBtn.title : 'Edit record';
	this.cmdInsertBtnTitle = this.cmdInsertBtn.hasOwnProperty('title') ? this.cmdInsertBtn.title : 'Create record';
	this.cmdDeleteBtnTitle = this.cmdDeleteBtn.hasOwnProperty('title') ? this.cmdDeleteBtn.title : 'Delete record';
	this.cmdSubmitBtnTitle = this.cmdSubmitBtn.hasOwnProperty('title') ? this.cmdSubmitBtn.title : 'Submit record';
	this.cmdCancelBtnTitle = this.cmdCancelBtn.hasOwnProperty('title') ? this.cmdCancelBtn.title : 'Cancel';

	this.cmdUpdateBtnIcon = this.cmdUpdateBtn.hasOwnProperty('icon') ? this.cmdUpdateBtn.icon : '<img src="'+this.basePath+'themes/icn_edit.gif" alt="" />';
	this.cmdInsertBtnIcon = this.cmdInsertBtn.hasOwnProperty('icon') ? this.cmdInsertBtn.icon : '<img src="'+this.basePath+'themes/icn_add.gif" alt="" />';
	this.cmdDeleteBtnIcon = this.cmdDeleteBtn.hasOwnProperty('icon') ? this.cmdDeleteBtn.icon : '<img src="'+this.basePath+'themes/icn_del.gif" alt="" />';
	this.cmdSubmitBtnIcon = this.cmdSubmitBtn.hasOwnProperty('icon') ? this.cmdSubmitBtn.icon : '';
	this.cmdCancelBtnIcon = this.cmdCancelBtn.hasOwnProperty('icon') ? this.cmdCancelBtn.icon : '';

	this.cmdUpdateBtnCss = this.cmdUpdateBtn.hasOwnProperty('css') ? this.cmdUpdateBtn.css : null;
	this.cmdInsertBtnCss = this.cmdInsertBtn.hasOwnProperty('css') ? this.cmdInsertBtn.css : null;
	this.cmdDeleteBtnCss = this.cmdDeleteBtn.hasOwnProperty('css') ? this.cmdDeleteBtn.css : null;
	this.cmdSubmitBtnCss = this.cmdSubmitBtn.hasOwnProperty('css') ? this.cmdSubmitBtn.css : null;
	this.cmdCancelBtnCss = this.cmdCancelBtn.hasOwnProperty('css') ? this.cmdCancelBtn.css : null;

	this.cmdUpdateBtnStyle = this.cmdUpdateBtn.hasOwnProperty('style') ? this.cmdUpdateBtn.style : null;
	this.cmdInsertBtnStyle = this.cmdInsertBtn.hasOwnProperty('style') ? this.cmdInsertBtn.style : null;
	this.cmdDeleteBtnStyle = this.cmdDeleteBtn.hasOwnProperty('style') ? this.cmdDeleteBtn.style : null;
	this.cmdSubmitBtnStyle = this.cmdSubmitBtn.hasOwnProperty('style') ? this.cmdSubmitBtn.style : null;
	this.cmdCancelBtnStyle = this.cmdCancelBtn.hasOwnProperty('style') ? this.cmdCancelBtn.style : null;

	this.cmdInsertBtnScroll = this.cmdInsertBtn.hasOwnProperty('scrollIntoView') ? this.cmdInsertBtn.scrollIntoView : false; //scroll new added row into view

	//Editor callbacks, delegates
	this.onEditableInit = this.IsFn(f.on_editable_initialized) ? f.on_editable_initialized : null;
	this.onBeforeOpenEditor = this.IsFn(f.on_before_open_editor) ? f.on_before_open_editor : null;
	this.onAfterOpenEditor = this.IsFn(f.on_after_open_editor) ? f.on_after_open_editor : null;
	this.onBeforeCloseEditor = this.IsFn(f.on_before_close_editor) ? f.on_before_close_editor : null;
	this.onAfterCloseEditor = this.IsFn(f.on_after_close_editor) ? f.on_after_close_editor : null;
	this.setCustomEditorValue = this.IsFn(f.set_custom_editor_value) ? f.set_custom_editor_value : null;
	this.getCustomEditorValue = this.IsFn(f.get_custom_editor_value) ? f.get_custom_editor_value : null;
	this.setCellModifiedValue = this.IsFn(f.set_cell_modified_value) ? f.set_cell_modified_value : null;
	this.validateModifiedValue = this.IsFn(f.validate_modified_value) ? f.validate_modified_value : null;
	this.openCustomEditor = this.IsFn(f.open_custom_editor) ? f.open_custom_editor : null;
	this.closeCustomEditor = this.IsFn(f.close_custom_editor) ? f.close_custom_editor : null;
	this.onAddedDomRow = this.IsFn(f.on_added_dom_row) ? f.on_added_dom_row : null;

	//Server actions config
	this.actions = this.IsObj(f.actions) ? f.actions : {};
	this.updateConfig = this.actions['update']!==undefined ? this.actions['update'] : {};
	this.insertConfig = this.actions['insert']!==undefined ? this.actions['insert'] : {};
	this.deleteConfig = this.actions['delete']!==undefined ? this.actions['delete'] : {};
	this.updateURI = this.updateConfig.hasOwnProperty('uri') ? this.updateConfig['uri'] : null;
	this.insertURI = this.insertConfig.hasOwnProperty('uri') ? this.insertConfig['uri'] : null;
	this.deleteURI = this.deleteConfig.hasOwnProperty('uri') ? this.deleteConfig['uri'] : null;
	this.updateFormMethod = this.updateConfig.hasOwnProperty('form_method') ? this.updateConfig['form_method'].LCase() : 'post';
	this.insertFormMethod = this.insertConfig.hasOwnProperty('form_method') ? this.insertConfig['form_method'].LCase() : 'post';
	this.deleteFormMethod = this.deleteConfig.hasOwnProperty('form_method') ? this.deleteConfig['form_method'].LCase() : 'post';
	this.updateSubmitMethod = this.updateConfig.hasOwnProperty('submit_method') ? this.updateConfig['submit_method'].LCase() : this.ajax ? 'ajax': 'form';
	this.insertSubmitMethod = this.insertConfig.hasOwnProperty('submit_method') ? this.insertConfig['submit_method'].LCase() : this.ajax ? 'ajax': 'form';
	this.deleteSubmitMethod = this.deleteConfig.hasOwnProperty('submit_method') ? this.deleteConfig['submit_method'].LCase() : this.ajax ? 'ajax': 'form';
	this.bulkDelete = this.deleteConfig.hasOwnProperty('bulk_delete') ? this.deleteConfig['bulk_delete'] : false; //enables delete of selected rows
	this.defaultRecord = this.insertConfig.hasOwnProperty('default_record')
							&& this.IsArray(this.insertConfig['default_record']) ? this.insertConfig['default_record'] : null;
	this.updateParams = this.updateConfig.hasOwnProperty('param_names')
							&& this.IsArray(this.updateConfig['param_names']) ? this.updateConfig['param_names'] : null;
	this.insertParams = this.insertConfig.hasOwnProperty('param_names')
							&& this.IsArray(this.insertConfig['param_names']) ? this.insertConfig['param_names'] : null;
	this.deleteParams = this.deleteConfig.hasOwnProperty('param_names')
							&& this.IsArray(this.deleteConfig['param_names']) ? this.deleteConfig['param_names'] : null;

	//Server actions delegates and callbacks
	this.onUpdateSubmit = this.updateConfig.hasOwnProperty('on_update_submit')
							&& this.IsFn(this.updateConfig['on_update_submit']) ? this.updateConfig['on_update_submit'] : null;
	this.onInsertSubmit = this.insertConfig.hasOwnProperty('on_insert_submit')
							&& this.IsFn(this.insertConfig['on_insert_submit']) ? this.insertConfig['on_insert_submit'] : null;
	this.onDeleteSubmit = this.deleteConfig.hasOwnProperty('on_delete_submit')
							&& this.IsFn(this.deleteConfig['on_delete_submit']) ? this.deleteConfig['on_delete_submit'] : null;
	this.onBeforeUpdateSubmit = this.updateConfig.hasOwnProperty('on_before_submit')
							&& this.IsFn(this.updateConfig['on_before_submit']) ? this.updateConfig['on_before_submit'] : null;
	this.onBeforeInsertSubmit = this.insertConfig.hasOwnProperty('on_before_submit')
							&& this.IsFn(this.insertConfig['on_before_submit']) ? this.insertConfig['on_before_submit'] : null;
	this.onBeforeDeleteSubmit = this.deleteConfig.hasOwnProperty('on_before_submit')
							&& this.IsFn(this.deleteConfig['on_before_submit']) ? this.deleteConfig['on_before_submit'] : null;
	this.onAfterUpdateSubmit = this.updateConfig.hasOwnProperty('on_after_submit')
							&& this.IsFn(this.updateConfig['on_after_submit']) ? this.updateConfig['on_after_submit'] : null;
	this.onAfterInsertSubmit = this.insertConfig.hasOwnProperty('on_after_submit')
							&& this.IsFn(this.insertConfig['on_after_submit']) ? this.insertConfig['on_after_submit'] : null;
	this.onAfterDeleteSubmit = this.deleteConfig.hasOwnProperty('on_after_submit')
							&& this.IsFn(this.deleteConfig['on_after_submit']) ? this.deleteConfig['on_after_submit'] : null;
	this.onUpdateError = this.updateConfig.hasOwnProperty('on_submit_error')
							&& this.IsFn(this.updateConfig['on_submit_error']) ? this.updateConfig['on_submit_error'] : null;
	this.onInsertError = this.insertConfig.hasOwnProperty('on_submit_error')
							&& this.IsFn(this.insertConfig['on_submit_error']) ? this.insertConfig['on_submit_error'] : null;
	this.onDeleteError = this.deleteConfig.hasOwnProperty('on_submit_error')
							&& this.IsFn(this.deleteConfig['on_submit_error']) ? this.deleteConfig['on_submit_error'] : null;
	this.checkUpdateResponseSanity = this.updateConfig.hasOwnProperty('check_response_sanity')
							&& this.IsFn(this.updateConfig['check_response_sanity']) ? this.updateConfig['check_response_sanity'] : null;
	this.checkInsertResponseSanity = this.insertConfig.hasOwnProperty('check_response_sanity')
							&& this.IsFn(this.insertConfig['check_response_sanity']) ? this.insertConfig['check_response_sanity'] : null;
	this.checkDeleteResponseSanity = this.deleteConfig.hasOwnProperty('check_response_sanity')
							&& this.IsFn(this.deleteConfig['check_response_sanity']) ? this.deleteConfig['check_response_sanity'] : null;
	this.processUpdateResponse = this.updateConfig.hasOwnProperty('process_response')
							&& this.IsFn(this.updateConfig['process_response']) ? this.updateConfig['process_response'] : null;
	this.processInsertResponse = this.insertConfig.hasOwnProperty('process_response')
							&& this.IsFn(this.insertConfig['process_response']) ? this.insertConfig['process_response'] : null;
	this.processDeleteResponse = this.deleteConfig.hasOwnProperty('process_response')
							&& this.IsFn(this.deleteConfig['process_response']) ? this.deleteConfig['process_response'] : null;

	//Messages
	this.msgSubmitOK = f.msg_submit_ok!==undefined ? f.msg_submit_ok : 'Changes were successfully submitted to server!';
	this.msgConfirmDelSelectedRows = f.msg_confirm_delete_selected_rows!==undefined ? f.msg_confirm_delete_selected_rows : 'Do you want to delete the selected row(s)?';
	this.msgErrOccur = f.msg_error_occured!==undefined ? f.msg_error_occured : 'An error occured!';
	this.msgSaveUnsuccess = f.msg_submit_unsuccessful!==undefined ? f.msg_submit_unsuccessful : 'Changes could not be saved!';
	this.msgUndefinedSubmitUrl = f.undefined_submit_url!==undefined ? f.undefined_submit_url : 'Changes could not be saved! Endpoint URL is not defined';
	this.msgNewRowNoUploader = f.msg_new_row_no_uploader!==undefined ? f.msg_new_row_no_uploader : 'Please save the newly added rows before using the Uploader.';
	this.msgInvalidData = f.msg_invalid_data!==undefined ? f.msg_invalid_data : 'Returned data is invalid.';

	//Containers
	this.ifrmContainer = {}; //submit forms container

	//Values
	this.valuesSeparator = ', ';
	this.defaultRecordUndefinedValue = '...';
	this.newRowClass = 'ezNewRow';
	this.recordKeyValue = 'new';

	//Attributes
	this.attrValue = 'data-ez-slc-value';
	this.attrText = 'data-ez-slc-text';
	this.attrCont = 'data-ez-html';
	this.attrData = 'data-ez-data';
	this.attrUplname = 'data-ez-uplname';
	this.attrColIndex = 'data-ez-col-index';
	this.attrRowIndex = 'data-ez-row-index';

	//Counters
	this.savedRowsNb = { 'insert': 0, 'update': 0, 'delete': 0 };

	//prefixes
	this.prfxEdt = 'edt_';
	this.prfxIFrm = 'iframe_';
	this.prfxFrm = 'form_';
	this.prfxScr = 'scr_';
	this.prfxParam = 'col_';
	//upload editor
	this.prfxUplCont = 'upl_';
	this.prfxUplForm = 'upl_form_';
	this.prfxUplIframe = 'upl_ifrm_';
	this.prfxUplInfo = 'upl_info_';
	this.prfxUplOutput = 'upl_output_';
	this.prfxUplBtn = 'upl_btn_';
	this.prfxUplBtnClose = 'upl_btn_close_';
	this.prfxUplImgDisplay = 'upl_img_display_';
	this.prfxUplWinRef = 'et_upl_';

	//Upload form
	this.uplFileInp = 'UPL_FILE';
	this.uplKeyInput = 'RECORD_KEY';
	this.uplFldPath = 'IMAGES_FOLDER_PATH';
	this.uplSqlFieldName = 'SQL_FIELD';
	this.uplFileSize = 'MAX_FILE_SIZE';
	this.uplValidExts = 'VALID_EXTENSIONS';
	this.uplJsCode = 'JS_CODE';

	this.Editable = new Editable(this);
	this.Selection = new Selection(this);
};

var Editable = function(editTable){
    this.o = editTable;
};

var Selection = function(editTable){
    this.o = editTable;
};

var Uploader = function(editTable, colIndex){
    this.o = editTable;
	this.colIndex = colIndex;
	window[this.o.prfxUplWinRef + colIndex + this.o.id] = this; //global reference for server-side purposes
};

Uploader.prototype = {
	divUpl: null, formUpl: null, fileUpl: null, hiddenFileSize: null, hiddenFolderPath: null, hiddenValidExt: null, hiddenKey: null,
	ifrmUpl: null, divUplInfo: null, divUplOutput: null, divUplBtnsCont: null, divUplBtn: null, divUplBtnClose: null, divUplDisplay: null,
	initialValue: null,	isUploadSuccessful: false,
	Init: function(){
		if(!this.o.hasUploader){ return; }
		this.SetUploader();
	},
	SetUploader: function(){
		this.divUpl = this.o.CreateElm('div',
			['id', this.o.prfxUplCont + this.colIndex + this.o.id], ['style', 'display:none; z-index:10001;'], ['class', this.o.uplCss[this.colIndex]]
		);
		this.formUpl = this.o.CreateElm('form',
			['id', this.o.prfxUplForm + this.colIndex + this.o.id], ['name', this.o.prfxUplForm + this.colIndex + this.o.id], ['method', 'POST'],
			['action', this.o.uplURI[this.colIndex]], ['target', this.o.prfxUplIframe + this.colIndex + this.o.id], ['enctype', 'multipart/form-data']
		);
		this.fileUpl = this.o.CreateElm('input',['id', this.o.uplFileInp], ['name', this.o.uplFileInp], ['type', 'file']);
		this.hiddenFileSize = this.o.CreateElm('input', ['name', this.o.uplFileSize], ['type', 'hidden'], ['value', this.o.uplMaxFileSize[this.colIndex]]); //server-side info: max file size
		this.hiddenFolderPath = this.o.CreateElm('input', ['name', this.o.uplFldPath], ['type', 'hidden'], ['value', this.o.uplPath[this.colIndex]]); //server-side info: images folder path
		this.hiddenValidExt = this.o.CreateElm('input', ['name', this.o.uplValidExts], ['type', 'hidden'], ['value', this.o.uplValidExt[this.colIndex]]); //server-side info: allowed file extensions
		this.hiddenKey = this.o.CreateElm('input', ['name', this.o.uplKeyInput], ['type', 'hidden'], ['value', this.o.recordKeyValue]); //server-side info: record key
		this.hiddenSqlField = this.o.CreateElm('input', ['name', this.o.uplSqlFieldName], ['type', 'hidden'], ['value', this.o.uplSqlField[this.colIndex]]); //server-side info: SQL field name storing upload filename
		this.hiddenUplWinRef = this.o.CreateElm('input', ['name', this.o.uplJsCode], ['type', 'hidden'], ['value', this.o.uplJsSuccess[this.colIndex]]); //server-side info: js code invoked from server when upload successful
		this.ifrmUpl = this.o.CreateElm('iframe', ['id', this.o.prfxUplIframe + this.colIndex + this.o.id], ['name', this.o.prfxUplIframe + this.colIndex + this.o.id], ['style', 'display:none; left:-10001;']);
		this.divUplInfo = this.o.CreateElm('div',['id', this.o.prfxUplInfo + this.colIndex + this.o.id]);
		this.divUplOutput = this.o.CreateElm('div',['id', this.o.prfxUplOutput + this.colIndex + this.o.id], ['class', this.o.uplOutputCss[this.colIndex]]);
		this.divUplBtnsCont = this.o.CreateElm('div',['style', 'text-align:right']);
		this.divUplBtn = this.o.CreateElm('button',['id', this.o.prfxUplBtn + this.colIndex + this.o.id], ['style', 'display:none;']);
		this.divUplBtnClose = this.o.CreateElm('button',['id', this.o.prfxUplBtnClose + this.colIndex + this.o.id]);
		this.divUplDisplay = this.o.CreateElm('div',['id', this.o.prfxUplImgDisplay + this.colIndex + this.o.id], ['class', this.o.uplDisplayCss[this.colIndex]]);

		//IE<8 class, name, style attributes are not set correctly...
		if(!this.o.Css.Has(this.divUpl, this.o.uplCss[this.colIndex])){
			this.o.Css.Add(this.divUpl, this.o.uplCss[this.colIndex]);
			this.o.Css.Add(this.divUplOutput, this.o.uplOutputCss[this.colIndex]);
			this.o.Css.Add(this.divUplDisplay, this.o.uplDisplayCss[this.colIndex]);
			this.divUpl.style.cssText = 'display:none; z-index:10001;';
			this.divUplBtnsCont.style.cssText = 'text-align:right';
			this.divUplBtn.style.cssText = 'display:none;';
			this.formUpl = document.createElement(
				'<form id="'+this.o.prfxUplForm + this.colIndex + this.o.id+'" name="'+this.o.prfxUplForm + this.colIndex + this.o.id+'" method="POST" ' +
				'action="'+this.o.uplURI[this.colIndex]+'" target="'+this.o.prfxUplIframe + this.colIndex + this.o.id+'" enctype="multipart/form-data"></form>'
			);
			this.ifrmUpl = document.createElement(
				'<iframe name="'+this.o.prfxUplIframe + this.colIndex + this.o.id+'" id="'+this.o.prfxUplIframe + this.colIndex + this.o.id +
				'" style="display:none; left:-10001;"></iframe>'
			);
		}

		this.divUplInfo.innerHTML = parseInt(this.o.uplMaxFileSize[this.colIndex]/1024, 10) + 'Kb max (' + this.o.uplValidExt[this.colIndex].toString() + ')';
		this.divUplBtn.appendChild(this.o.CreateText('Upload'));
		this.divUplBtnClose.appendChild(this.o.CreateText('Close'));
		this.divUplBtnsCont.appendChild(this.divUplBtn);
		this.divUplBtnsCont.appendChild(this.divUplBtnClose);

		this.formUpl.appendChild(this.fileUpl);
		this.formUpl.appendChild(this.hiddenFileSize);
		this.formUpl.appendChild(this.hiddenFolderPath);
		this.formUpl.appendChild(this.hiddenUplWinRef);
		this.formUpl.appendChild(this.hiddenValidExt);
		this.formUpl.appendChild(this.hiddenKey);
		this.formUpl.appendChild(this.hiddenSqlField);

		this.divUpl.appendChild(this.formUpl);
		this.divUpl.appendChild(this.ifrmUpl);
		this.divUpl.appendChild(this.divUplInfo);
		this.divUpl.appendChild(this.divUplOutput);
		this.divUpl.appendChild(this.divUplBtnsCont);
		this.divUpl.appendChild(this.divUplDisplay);
		this.o.table.parentNode.insertBefore(this.divUpl, this.o.table);

		//Events
		var x = this;
		this.ifrmUpl.onload = this.ifrmUpl.onreadystatechange = function(){ //Iframe onload event
			if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
				try{
					var iframeDoc = this.contentDocument || this.contentWindow.document;
					if(iframeDoc.location.href != 'about:blank'){
						x.Output(iframeDoc.body.innerHTML);
						x.iframe.src = 'about:blank';
						x.HideUploadButton();
					}
				} catch(ex){}
			}
		};

		this.o.Event.Add(this.fileUpl, 'click', function(e){ x.OnUplClick(); });
		this.o.Event.Add(this.divUplBtn, 'click', function(e){ x.Upload(); });
		this.o.Event.Add(this.divUplBtnClose, 'click', function(e){ x.Close(x.o.Selection.GetActiveRow().cells[x.colIndex]); });

		//Js code passed to server
		var js = this.o.uplJsSuccess[this.colIndex].replace(/\{1\}/g, this.o.prfxUplWinRef + this.colIndex + this.o.id);
		this.hiddenUplWinRef.value = js;
	},
	GetValue: function(){ return this.fileUpl.value; },
	HasValueChanged: function(){ return this.initialValue != this.GetValue(); },
	OnUplClick: function(){ this.ShowUploadButton(); },
	Upload: function(){ this.ShowLoader(); this.formUpl.submit(); },
	SetRecordKey: function(key){ this.hiddenKey.value = key; },
	GetRecordKey: function(){ return this.hiddenKey.value; },
	ShowUploadButton: function(){ this.divUplBtn.style.display = 'inline'; },
	HideUploadButton: function(){ this.divUplBtn.style.display = 'none'; },
	ShowUploadContainer: function(){ this.divUplDisplay.style.display = 'block'; },
	HideUploadContainer: function(){ this.divUplDisplay.style.display = 'none'; },
	ShowUpload: function(){
		if(!this.o.uplShowUpload[this.colIndex]){ return; }
		var row = this.o.Selection.GetActiveRow();
		if(this.o.showUpload[this.colIndex]){
			this.ShowUploadContainer();
			this.o.showUpload[this.colIndex].call(this, this.o, this.divUplDisplay, this.GetUploadName(), this.o.uplPath[this.colIndex]);
			return;
		}
		if(row){
			var uplname = this.GetUploadName();
			if(uplname){
				if(this.o.uplShowLink[this.colIndex]){
					this.divUplDisplay.innerHTML = this.GetUploadLinkHtml();
				} else {
					this.divUplDisplay.innerHTML = '<img src="'+this.o.uplPath[this.colIndex]+uplname+'" alt="'+uplname+'" />';
				}
				this.ShowUploadContainer();
				this.divUpl.scrollIntoView(false);
			} else { this.ClearUpload(); }
		}
	},
	ClearUpload: function(){
		this.divUplDisplay.innerHTML = '';
		this.HideUploadContainer();
	},
	GetUploadName: function(){
		var cell = this.o.Selection.GetActiveRow().cells[this.colIndex];
		if(cell){ return cell.getAttribute(this.o.attrUplname); }
		return null;
	},
	SetUploadName: function(name){
		var cell = this.o.Selection.GetActiveRow().cells[this.colIndex];
		if(cell){ cell.setAttribute(this.o.attrUplname, name); }
	},
	GetUploadLinkHtml: function(){
		var uplname = this.GetUploadName();
		return '<a href="'+ this.o.uplPath[this.colIndex]+ uplname +'" target="blank" class="'+ this.o.linkCss[this.colIndex] +'">'+
				uplname.replace(this.GetRecordKey()+'_', '') + '</a>';
	},
	Open: function(cell){
		if(!cell){ return; }
		if(this.o.Css.Has(cell.parentNode, this.o.newRowClass) || !cell.parentNode.getAttribute('id')){ alert(this.o.msgNewRowNoUploader); return; }
		cell.appendChild(this.divUpl);
		if(this.o.onBeforeOpenUploader[this.colIndex]){
			this.o.onBeforeOpenUploader[this.colIndex].call(this, this.o, this.divUpl, cell);
		}
		var key = this.o.uplRecordIdColIndex[this.colIndex]
					? this.o.Selection.GetActiveRow()[this.o.uplRecordIdColIndex[this.colIndex]]
					: this.o.Selection.GetActiveRow().getAttribute('id').replace(this.o.newRowPrefix, '');
		if(key !== ''){
			this.divUpl.style.display = '';
			this.SetRecordKey(key);
			this.initialValue = this.GetValue();
			this.SetUploadSuccess(false);
			this.ShowUpload();
		}
		if(this.o.onAfterOpenUploader[this.colIndex]){
			this.o.onAfterOpenUploader[this.colIndex].call(this, this.o, this.divUpl, cell);
		}
	},
	Close: function(cell){
		if(this.divUpl.style.display == 'none'){ return; }
		if(this.o.onBeforeCloseUploader[this.colIndex]){
			this.o.onBeforeCloseUploader[this.colIndex].call(this, this.o, this.divUpl, cell);
		}
		if(cell && this.IsUploadSuccessful()){
			if(this.o.uplShowLink[this.colIndex]){
				var div = this.o.CreateElm('div');
				div.innerHTML = this.divUplDisplay.innerHTML;
				cell.appendChild(div);
			} else {
				var img = this.o.Tag(cell, 'img')[0];
				if(img){ img.src = this.o.uplOkImg[this.colIndex]; }
			}
		}
		this.Output('');
		this.SetRecordKey('');
		this.ClearUpload();
		this.HideUploadButton();
		this.divUpl.style.display = 'none';
		this.o.StandardBody().appendChild(this.divUpl);
		if(this.o.onAfterCloseUploader[this.colIndex]){
			this.o.onAfterCloseUploader[this.colIndex].call(this, this.o, this.divUpl, cell);
		}
	},
	Output: function(msg){ this.divUplOutput.innerHTML = msg; },
	SetUploadSuccess: function(val){ this.isUploadSuccessful = val; },
	IsUploadSuccessful: function(val){ return this.isUploadSuccessful; },
	ShowLoader: function(){	this.Output('<img src="'+this.o.uplLoaderImg[this.colIndex]+'" alt="Please wait..." />'); },
	HideLoader: function(){ this.Output(''); }
};

Editable.prototype = {
    onEditAdded: false, activeCellEditor: null, openCellEditor: null, activeRow: null,
    modifiedRows: [], newRows: [], addedRows: [], deletedRows: [],
    Init: function(){
        if(!this.o.editable){ return; }
        this.SetEvents();
        this.SetCellsEditor();
        if(this.o.onEditableInit){ this.o.onEditableInit.call(null, this.o); }
    },
    Set: function(){ this.o.editable = true; this.SetEvents(); },
    Remove: function(){ this.o.editable = false; this.RemoveEvents(); },
    SetEvents: function(){
        if(!this.onEditAdded){
            var x = this;
            this.o.Event.Bind(this.o.table, this.o.openEditorAction, function(e){ x.Edit.call(x, e); });
            this.onEditAdded = true;
        }
    },
    RemoveEvents: function(){
        if(this.onEditAdded){
            var x = this;
            this.o.Event.Unbind(this.o.table, this.o.openEditorAction, function(e){ x.Edit.call(x, e); });
            this.onEditAdded = false;
        }
    },
    SetCellsEditor: function(){
        for (var i = 0; i < this.o.nbCells; i++){
            if(this.o.editorTypes.length == this.o.nbCells){
                switch (this.o.editorTypes[i]){
                    case this.o.edtTypes.none:
                        this.o.editors[i] = null;
                        break;
                    case this.o.edtTypes.input:
                        this.o.editors[i] = this.CreateInputEditor(i);
                        break;
                    case this.o.edtTypes.textarea:
                        this.o.editors[i] = this.CreateMultilineEditor(i);
                        break;
                    case this.o.edtTypes.select:
                    case this.o.edtTypes.multiple:
                        this.o.editors[i] = this.CreateSelectEditor(i);
                        break;
                    case this.o.edtTypes.bool:
                        this.o.editors[i] = {};
                        break;
                    case this.o.edtTypes.uploader:
                        this.o.editors[i] = this.CreateUploaderEditor(i);
                        break;
                    case this.o.edtTypes.command:
                        this.SetCommandEditor(i);
                        this.o.editors[i] = null;
                        break;
                    case this.o.edtTypes.custom:
                        this.o.editors[i] = this.o.Get(this.o.customEditor[i]);
                        break;
                    default:
                        this.o.editors[i] = null;
                        break;
                }
            } else {
                //If editor type not set, default type is input
                this.o.editorTypes[i] = this.o.edtTypes.input;
                this.o.editors[i] = this.CreateInputEditor(i);
            }
        }
    },
    CreateInputEditor: function(colIndex){
        if(colIndex === undefined) return null;
        var inp = this.o.CreateElm(this.o.edtTypes.input, ['id', this.o.prfxEdt + colIndex + '_' + this.o.id], ['type', 'text'],
			['class', this.o.inputEditorCss], [this.o.attrColIndex, colIndex]);
        var attr = this.o.editorAttributes[colIndex];
        if(attr) for (var i = 0; i < attr.length; i++){ inp.setAttribute(attr[i][0], attr[i][1]); } //additional attributes
        if(inp.className === '') inp.className = this.o.inputEditorCss; //for older IE versions...
        if(this.o.editorCss[colIndex]) this.o.Css.Add(inp, this.o.editorCss[colIndex]); //additional css
        if(this.o.editorStyles[colIndex]) inp.style.cssText = this.o.editorStyles[colIndex]; //inline style
        var x = this;
        this.o.Event.Add(inp, 'focus', function(e){ x.Event.OnInputFocus.call(x, e); });
        this.o.Event.Add(inp, 'blur', function(e){ x.Event.OnBlur.call(x, e); });
        return inp;
    },
    CreateMultilineEditor: function(colIndex){
        if(colIndex === undefined) return null;
        var txa = this.o.CreateElm(this.o.edtTypes.textarea, ['id', this.o.prfxEdt + colIndex + '_' + this.o.id],
			['class', this.o.textareaEditorCss], [this.o.attrColIndex, colIndex]);
        var attr = this.o.editorAttributes[colIndex];
        if(attr) for (var i = 0; i < attr.length; i++){ txa.setAttribute(attr[i][0], attr[i][1]); } //additional attributes
        if(txa.className === '') txa.className = this.o.textareaEditorCss; //for older IE versions...
        if(this.o.editorCss[colIndex]) this.o.Css.Add(txa, this.o.editorCss[colIndex]); //additional css
        if(this.o.editorStyles[colIndex]) txa.style.cssText = this.o.editorStyles[colIndex]; //inline style
        var x = this;
        this.o.Event.Add(txa, 'focus', function(e){ x.Event.OnInputFocus.call(x, e); });
        this.o.Event.Add(txa, 'blur', function(e){ x.Event.OnBlur.call(x, e); });
        this.o.Event.Add(txa, 'keypress', function(e){ x.Event.OnKeyPress.call(x, e); });
        return txa;
    },
    CreateSelectEditor: function(colIndex){
        if(colIndex === undefined) return null;
        var slc = this.o.CreateElm(this.o.edtTypes.select, ['id', this.o.prfxEdt + colIndex + '_' + this.o.id],
			['class', this.o.selectEditorCss], [this.o.attrColIndex, colIndex]);
        if(this.o.IsEditorType(colIndex, this.o.edtTypes.multiple)){ slc.setAttribute('multiple', 'multiple'); }
        var attr = this.o.editorAttributes[colIndex];
        if(attr) for (var i = 0; i < attr.length; i++){ slc.setAttribute(attr[i][0], attr[i][1]); } //additional attributes
        if(slc.className === '') slc.className = this.o.selectEditorCss; //for older IE versions...
        if(this.o.editorCss[colIndex]) this.o.Css.Add(slc, this.o.editorCss[colIndex]); //additional css
        if(this.o.editorStyles[colIndex]) slc.style.cssText = this.o.editorStyles[colIndex]; //inline style
        var optArray = [], valArray = []; //options arrays
        if(this.o.editorCustomSlcOptions[colIndex]){//custom values
            for (var i = 0; i < this.o.editorCustomSlcOptions[colIndex].length; i++){
                var data = this.o.editorCustomSlcOptions[colIndex][i];
                if(this.o.editorCustomSlcValues[colIndex]){
                    var val = this.o.editorCustomSlcValues[colIndex][i];
                    if(valArray.indexOf(val) == -1) valArray.push(val);
                }
                if(optArray.indexOf(data) == -1) optArray.push(data);
            }
        } else {//automatic column values
            for (var i = this.o.startRow; i < this.o.GetRowsNb(); i++){
                var row = this.o.table.rows[i];
                var cell = row.cells[colIndex];
                if(!row || !cell) continue;
                var data = this.o.GetText(cell);
                if(optArray.indexOf(data) == -1) optArray.push(data);
            }
        }
        if(this.o.editorSortSlcOptions[colIndex]){
            var sortType = this.o.editorSortSlcOptions[colIndex].LCase();
            if(sortType == 'numdesc'){
                try { optArray.sort(this.o.Sort.NumDesc); } catch (e){ }
            } else if(sortType == 'numasc'){
                try { optArray.sort(this.o.Sort.NumAsc); } catch (e){ }
            } else {
                try { optArray.sort(this.o.Sort.IgnoreCase); } catch (e){ }
            }
        }
        for (var j = 0; j < optArray.length; j++){
            var opt = this.o.CreateElm('option', ['value', valArray[j] || optArray[j]]);
            opt.appendChild(this.o.CreateText(optArray[j]));
            slc.appendChild(opt);
        }
        var x = this;
        this.o.Event.Add(slc, 'change', function(e){
            var cell = x.o.GetCell(e);
            if(cell){
                cell.setAttribute(x.o.attrText, slc.options[slc.selectedIndex].text); //for inserts
                cell.setAttribute(x.o.attrValue, slc.options[slc.selectedIndex].value); //for inserts
                slc.setAttribute(x.o.attrText, slc.options[slc.selectedIndex].text);
                slc.setAttribute(x.o.attrValue, slc.options[slc.selectedIndex].value);
            }
        });
        this.o.Event.Add(slc, 'blur', function(e){ x.Event.OnBlur.call(x, e); });
        this.o.Event.Add(slc, 'keypress', function(e){ x.Event.OnKeyPress.call(x, e); });
        return slc;
    },
    SetCommandEditor: function(colIndex){
        if(colIndex === undefined || !this.o.IsEditorType(colIndex, this.o.edtTypes.command)){ return; }
        this.edtBtns = []; this.addBtns = []; this.delBtns = []; this.submitBtns = []; this.cancelBtns = [];
        var x = this.o.Editable,
        	o = this.o;
        for (var i = this.o.startRow; i < this.o.GetRowsNb(); i++){
            var row = this.o.table.rows[i];
            var cell = row.cells[colIndex];
            if(!row || !cell) continue;

            var div = this.o.CreateElm('div', ['class', this.o.commandEditorCss]);
            if(this.o.cmdEnabledBtns.indexOf('update') != -1){
                var editBtn = this.o.CreateElm('button', ['id', 'editBtn_' + i + '_' + this.o.id], ['title', this.o.cmdUpdateBtnTitle],
								['css', this.o.cmdUpdateBtnCss], [this.o.attrColIndex, i]);
                if(this.o.cmdUpdateBtnStyle) editBtn.style.cssText = this.o.cmdUpdateBtnStyle; //inline style
                editBtn.innerHTML = this.o.cmdUpdateBtnIcon + this.o.cmdUpdateBtnText;
                div.appendChild(editBtn);
                this.o.Event.Add(editBtn, 'click', function(e){ x.Edit.call(x, e); });
                if(this.edtBtns.indexOf(editBtn) == -1) this.edtBtns[i] = editBtn;
            }
            if(this.o.cmdEnabledBtns.indexOf('insert') != -1){
                var createBtn = this.o.CreateElm('button', ['id', 'createBtn_' + i + '_' + this.o.id], ['title', this.o.cmdInsertBtnTitle],
								['css', this.o.cmdInsertBtnCss], [this.o.attrColIndex, i]);
                if(this.o.cmdInsertBtnStyle) createBtn.style.cssText = this.o.cmdInsertBtnStyle; //inline style
                createBtn.innerHTML = this.o.cmdInsertBtnIcon + this.o.cmdInsertBtnText;
                div.appendChild(createBtn);
                this.o.Event.Add(createBtn, 'click', function(e){ x.AddNewRow(); x.SetCommandEditor(x.o.editorCmdColIndex); });
                if(this.addBtns.indexOf(createBtn) == -1) this.addBtns[i] = createBtn;
            }
            if(this.o.cmdEnabledBtns.indexOf('delete') != -1){
                var delBtn = this.o.CreateElm('button', ['id', 'delBtn_' + i + '_' + this.o.id], ['title', this.o.cmdDeleteBtnTitle],
								['css', this.o.cmdDeleteBtnCss], [this.o.attrColIndex, i]);
                if(this.o.cmdDeleteBtnStyle) delBtn.style.cssText = this.o.cmdDeleteBtnStyle; //inline style
                delBtn.innerHTML = this.o.cmdDeleteBtnIcon + this.o.cmdDeleteBtnText;
                div.appendChild(delBtn);
                this.o.Event.Add(delBtn, 'click', function(e){ x.SubmitDeletedRows(); });
                if(this.delBtns.indexOf(delBtn) == -1) this.delBtns[i] = delBtn;
            }
            if(this.o.cmdEnabledBtns.indexOf('submit') != -1){
                var postBtn = this.o.CreateElm('button', ['id', 'postBtn_' + i + '_' + this.o.id], ['title', this.o.cmdSubmitBtnTitle],
								['style', 'display:none;'], ['css', this.o.cmdSubmitBtnCss], [this.o.attrColIndex, i]);
                postBtn.style.display = 'none'; //older versions of IE
                if(this.o.cmdSubmitBtnStyle) postBtn.style.cssText += this.o.cmdSubmitBtnStyle; //inline style
                postBtn.innerHTML = this.o.cmdSubmitBtnIcon + this.o.cmdSubmitBtnText;
                div.appendChild(postBtn);
                this.o.Event.Add(postBtn, 'click', function(e){
                	o.Event.Stop(e);
                    x.CloseRowEditor();
					x.SubmitAll();
                });
                if(this.submitBtns.indexOf(postBtn) == -1) this.submitBtns[i] = postBtn;
            }
            if(this.o.cmdEnabledBtns.indexOf('cancel') != -1){
                var cancelBtn = this.o.CreateElm('button', ['id', 'cancelBtn_' + i + '_' + this.o.id], ['title', this.o.cmdCancelBtnTitle],
								['style', 'display:none;'], ['css', this.o.cmdCancelBtnCss], [this.o.attrColIndex, i]);
                cancelBtn.style.display = 'none'; //older versions of IE
                if(this.o.cmdCancelBtnStyle) cancelBtn.style.cssText += this.o.cmdCancelBtnStyle; //inline style
                cancelBtn.innerHTML = this.o.cmdCancelBtnIcon + this.o.cmdCancelBtnText;
                div.appendChild(cancelBtn);
                this.o.Event.Add(cancelBtn, 'click', function(e){ o.Event.Stop(e); x.CloseRowEditor(); });
                if(this.cancelBtns.indexOf(cancelBtn) == -1) this.cancelBtns[i] = cancelBtn;
            }
            cell.innerHTML = '';
            cell.appendChild(div);
        }
    },
    CreateUploaderEditor: function(colIndex){
        var uploader = new Uploader(this.o, colIndex);
        uploader.Init();
        return uploader;
    },
    OpenCellEditor: function(cell){
        if(!cell){ return; }
        var cellIndex = cell.cellIndex;
        var editor = this.o.editors[cellIndex];
        if(this.o.onBeforeOpenEditor){ this.o.onBeforeOpenEditor.call(null, this.o, cell, editor); }
        this.activeCellEditor = cell;
        this.openCellEditor = cellIndex;
        if(!this.o.IsEditorType(cellIndex, this.o.edtTypes.uploader)){
            var data = this.o.GetText(cell);
            this.SetCellCache(cell, data);
            this.SetEditorValue(cellIndex, data);
            if(!this.o.IsEditorType(cellIndex, this.o.edtTypes.custom)){
                cell.innerHTML = '';
                cell.appendChild(editor);
                if(this.o.editorModel == 'cell'){ this.SetEditorFocus(cellIndex); }
            } else {
                if(this.o.openCustomEditor){ this.o.openCustomEditor.call(null, this.o, cell, editor); }
            }
        } else { editor.Open(cell); }
        if(this.o.onAfterOpenEditor){ this.o.onAfterOpenEditor.call(null, this.o, cell, editor); }
    },
    OpenRowEditor: function(row){
        if(!row) return;
        this.activeRow = row;
        for (var i = 0; i < this.o.nbCells; i++){
            if(!this.o.editors[i] || this.o.IsEditorType(i, this.o.edtTypes.bool)
				|| this.o.IsEditorType(i, this.o.edtTypes.command)){ continue; }
            var c = row.cells[i];
            this.OpenCellEditor(c);
            if(this.o.Selection.activeCell && this.o.Selection.activeCell.cellIndex === i){
                this.SetEditorFocus(i);
            }
        }
        this.ShowCommandBtns(row.rowIndex, false);
    },
    CloseRowEditor: function(){
        if(!this.activeRow) return;
        var row = this.activeRow;
        for (var i = 0; i < this.o.nbCells; i++){
            if(!this.o.editors[i] || this.o.IsEditorType(i, this.o.edtTypes.bool)) continue;
            this.activeCellEditor = row.cells[i];
            this.CloseCellEditor(i);
        }
        this.ShowCommandBtns(row.rowIndex, true);
		if(this.o.autoSave){ this.AutoSubmit(); }
        this.activeRow = null;
    },
    ShowCommandBtns: function(rowIndex, showIcons){
        if(rowIndex === undefined || showIcons === undefined || this.o.editorModel != 'row') return;
        if(!this.edtBtns || !this.addBtns || !this.delBtns || !this.submitBtns || !this.cancelBtns) return;
        if(showIcons){
            if(this.edtBtns[rowIndex]) this.edtBtns[rowIndex].style.display = 'inline';
            if(this.addBtns[rowIndex]) this.addBtns[rowIndex].style.display = 'inline';
            if(this.delBtns[rowIndex]) this.delBtns[rowIndex].style.display = 'inline';
            if(this.submitBtns[rowIndex]) this.submitBtns[rowIndex].style.display = 'none';
            if(this.cancelBtns[rowIndex]) this.cancelBtns[rowIndex].style.display = 'none';
        } else {
            if(this.edtBtns[rowIndex]) this.edtBtns[rowIndex].style.display = 'none';
            if(this.addBtns[rowIndex]) this.addBtns[rowIndex].style.display = 'none';
            if(this.delBtns[rowIndex]) this.delBtns[rowIndex].style.display = 'none';
            if(this.submitBtns[rowIndex]) this.submitBtns[rowIndex].style.display = 'inline';
            if(this.cancelBtns[rowIndex]) this.cancelBtns[rowIndex].style.display = 'inline';
        }
    },
    CloseCellEditor: function(colIndex){
        if(colIndex === undefined || !this.activeCellEditor){ return; }
        if(this.o.onBeforeCloseEditor){ this.o.onBeforeCloseEditor.call(null, this.o, this.activeCellEditor, this.o.editors[colIndex]); }
        var edtVal = this.GetEditorValue(colIndex),
			cache = this.GetCellCache(this.activeCellEditor),
			cellVal = cache[1], cellHtml = cache[0],
			editor = this.o.editors[colIndex],
			val;
        if(this.o.IsEditorType(colIndex, this.o.edtTypes.uploader)){
            editor.Close(this.activeCellEditor);
        } else {
            if(this.o.IsEditorType(colIndex, this.o.edtTypes.multiple)){//multiple selections need to be cleared
                for (var j = 0; j < editor.options.length; j++){
                    if(editor.options[j].selected){ editor.options[j].selected = false; }
                }
            }
            if(edtVal != cellVal){
                var reg = new RegExp(cellVal.RegexpEscape(), 'g');
                if(reg.test(cellHtml) && cellVal !== ''){ val = cellHtml.replace(reg, edtVal); } //value to be written
                else { val = edtVal; }
            }
            if(this.o.setCellModifiedValue){ this.o.setCellModifiedValue.call(null, this.o, this.activeCellEditor, val); }
            else {
                try { this.activeCellEditor.removeChild(editor); } catch (e){ if(this.activeCellEditor) this.activeCellEditor.innerHTML = ''; } //for older versions of IE
                try {
                    if(!this.o.validateModifiedValue ||
						this.o.validateModifiedValue.call(null, this.o, colIndex, cellVal, edtVal, this.activeCellEditor, editor)){ //validation ok
                        if(this.o.editorAllowEmptyValue[colIndex]){ //empty value is allowed
                            this.activeCellEditor.innerHTML = (val !== undefined ? val : cellHtml);
                        } else { this.activeCellEditor.innerHTML = (val !== undefined && val.Trim() !== '' ? val : cellHtml); }
                        if(edtVal != cellVal){
                            //select editor with option value different from option text
                            if(this.o.IsEditorType(colIndex, this.o.edtTypes.select)){ val = editor.getAttribute(this.o.attrValue); }
                            if(this.o.editorModel == 'row'){ this.SetModifiedCell(this.activeCellEditor, this.activeCellEditor.innerHTML, cellVal); }
                            else { this.SetModifiedCell(this.activeCellEditor, val, cellVal); }
                        }
                    } else { this.activeCellEditor.innerHTML = cellVal || cellHtml; } //resets cached value
                } catch (e){ } //Temp solution for mysterious Chrome bug
            }
            if(this.o.onAfterCloseEditor){ this.o.onAfterCloseEditor.call(null, this.o, this.activeCellEditor, editor); }
            this.RemoveCellCache(this.activeCellEditor);
            if(this.o.IsEditorType(colIndex, this.o.edtTypes.custom)){
                if(this.o.closeCustomEditor){ this.o.closeCustomEditor.call(null, this.o, this.activeCellEditor, editor); }
            }
        }
		if(this.o.autoSave && this.o.editorModel === 'cell' && this.o.autoSaveModel === 'cell'){ this.AutoSubmit(); }
        this.activeCellEditor = null;
        this.openCellEditor = null;
    },
    IsEditorOpen: function(colIndex){ return this.openCellEditor == colIndex; },
    IsRowEditorOpen: function(){ return this.activeRow !== null; },
    SetEditorFocus: function(colIndex){
        if(this.o.editors[colIndex] && (this.IsEditorOpen(colIndex) || this.activeRow) &&
			(!this.o.IsEditorType(colIndex, this.o.edtTypes.custom) && !this.o.IsEditorType(colIndex, this.o.edtTypes.command)
			&& !this.o.IsEditorType(colIndex, this.o.edtTypes.bool))){ this.o.editors[colIndex].focus(); }
    },
    BlurEditor: function(colIndex){ if(this.o.editors[colIndex] && (this.IsEditorOpen(colIndex) || this.activeRow)) this.o.editors[colIndex].blur(); },
    SetModifiedCell: function(cell, val, oldVal){
        if(!cell) return;
        var row = cell.parentNode;
        if(this.o.Css.Has(row, this.o.newRowClass)){ return; } //modified values of added rows don't need to be treated
        var r = {}; r.values = []; r.urlParams = ''; r.modified = [];
        var modRow = this.GetModifiedRow(row.rowIndex);
        if(!modRow){
            for (var i = 0; i < row.cells.length; i++){
                if(cell.cellIndex == i){ this.o.Css.Add(cell, this.o.modifiedCellCss); }
                var cache = this.GetCellCache(row.cells[i]);
                var t = cell.cellIndex == i ? val : (this.o.editorModel == 'row' && !this.o.IsEditorType(i, this.o.edtTypes.none) ? cache[1] || this.o.GetText(row.cells[i]) : this.o.GetText(row.cells[i]));
                if(this.o.IsEditorType(i, this.o.edtTypes.bool) && this.o.Tag(row.cells[i], 'input').length > 0)
                    t = this.o.Tag(row.cells[i], 'input')[0].checked;
                var paramName = this.o.prfxParam + i; //param name for server-side purposes
                r.values.push(t);
                r.modified.push(cell.cellIndex == i ? true : false);
                r.urlParams += '&' + paramName + '=' + encodeURIComponent(t); //params for submission
            }
            this.modifiedRows.push([row.rowIndex, r]);
        } else {
            var obj = modRow[1];
            obj.values[cell.cellIndex] = val;
            obj.modified[cell.cellIndex] = true;
            var paramName = this.o.prfxParam + cell.cellIndex;
            var oldParam = paramName + '=' + encodeURIComponent(oldVal);
            var newParam = paramName + '=' + encodeURIComponent(val);
            obj.urlParams = obj.urlParams.replace(oldParam, newParam);
        }
    },
    GetModifiedRow: function(rowIndex){
        if(rowIndex === undefined){ return null; }
        for (var i = 0; i < this.modifiedRows.length; i++){
            if(this.modifiedRows[i][0] == rowIndex){
                return this.modifiedRows[i];
            }
        } return null;
    },
    GetModifiedRows: function(){ return this.modifiedRows; },
    GetAddedRows: function(){ return this.addedRows; },
    SetRowsObject: function(rows, cmd){
        if(!rows) return;
        for (var i = 0; i < rows.length; i++){
            var row = rows[i];
            if(!row) continue;
            var r = {}; r.values = []; r.urlParams = ''; r.modified = [];
            for (var j = 0; j < row.cells.length; j++){
                var cell = row.cells[j];
                var t = this.o.GetText(row.cells[j]);
                if(this.o.IsEditorType(j, this.o.edtTypes.bool) && this.o.Tag(cell, 'input').length > 0){
                    t = this.o.Tag(cell, 'input')[0].checked;
                } else if(this.o.IsEditorType(j, this.o.edtTypes.select)){ t = cell.getAttribute(this.o.attrValue); }
                var paramName = this.o.prfxParam + j; //param name for server-side purposes
                r.values.push(t);
                r.modified.push((cmd == 'delete' ? false : true));
                r.urlParams += '&' + paramName + '=' + encodeURIComponent(t); //params for submission
            }
            if(cmd == 'delete') this.deletedRows.push([row.rowIndex, r]);
            else if(cmd == 'insert') this.addedRows.push([row.rowIndex, r]);
            else this.modifiedRows.push([row.rowIndex, r]);
        }
    },
    GetDeletedRows: function(){ return this.deletedRows; },
    RemoveModifiedRow: function(rowIndex){
        if(rowIndex === undefined) return;
        for (var i = 0; i < this.GetModifiedRows().length; i++){
            if(this.GetModifiedRows()[i][0] == rowIndex){
                this.modifiedRows.splice(i, 1); break;
            }
        }
    },
    RemoveModifiedCellMark: function(rowIndex, cellIndexes){
        if(rowIndex === undefined) return;
        var row = this.o.table.rows[rowIndex], cells = row.cells;
        for (var i = 0; i < cells.length; i++){
            var cell = cells[i];
            if(!cellIndexes || cellIndexes.indexOf(i) != -1)
                this.o.Css.Remove(cell, this.o.modifiedCellCss);
        }
    },
    SetCellCache: function(cell, data, htmlCont){
        if(!cell || data === undefined) return;
        var html = htmlCont || htmlCont === '' ? htmlCont : cell.innerHTML;
        cell.setAttribute(this.o.attrCont, escape(html));
        cell.setAttribute(this.o.attrData, escape(data));
    },
    GetCellCache: function(cell){
        if(!cell) return [];
        var a, b;
        if(cell.attributes[this.o.attrCont] !== undefined) a = unescape(cell.getAttribute(this.o.attrCont));
        if(cell.attributes[this.o.attrData] !== undefined) b = unescape(cell.getAttribute(this.o.attrData));
        return [a, b];
    },
    RemoveCellCache: function(cell){
        if(!cell) return;
        if(cell.attributes[this.o.attrCont] !== undefined) cell.removeAttribute(this.o.attrCont);
        if(cell.attributes[this.o.attrData] !== undefined) cell.removeAttribute(this.o.attrData);
    },
    GetEditorValue: function(colIndex){
        var editor = this.o.editors[colIndex];
        var editorType = this.o.editorTypes[colIndex];
        var val = '';
        if(!editor || !editorType) return val;
        switch (editorType.LCase()){
            case this.o.edtTypes.input:
            case this.o.edtTypes.textarea:
                val = editor.value;
                break;
            case this.o.edtTypes.select:
                val = editor.getAttribute(this.o.attrText) || editor.value;
                break;
            case this.o.edtTypes.multiple:
                var sep = !this.o.editorValuesSeparator[colIndex] ? this.o.valuesSeparator : this.o.editorValuesSeparator[colIndex];
                for (var j = 0; j < editor.options.length; j++)
                    if(editor.options[j].selected)
                        val = val.concat(editor.options[j].value, sep);
                val = val.substring(0, val.length - sep.length);
                break;
            case this.o.edtTypes.custom:
                if(this.o.getCustomEditorValue) val = this.o.getCustomEditorValue.call(null, this.o, editor, colIndex);
                break;
        }
        return val;
    },
    SetEditorValue: function(colIndex, val){
        var editor = this.o.editors[colIndex];
        var editorType = this.o.editorTypes[colIndex];
        switch (editorType.LCase()){
            case this.o.edtTypes.input:
            case this.o.edtTypes.textarea:
            case this.o.edtTypes.select:
                editor.value = val;
                break;
            case this.o.edtTypes.multiple:
                for (var j = 0; j < editor.options.length; j++)
                    if(editor.options[j].value == val) editor.options[j].selected = true;
                break;
            case this.o.edtTypes.custom:
                if(this.o.setCustomEditorValue) this.o.setCustomEditorValue.call(null, this.o, editor, colIndex, val);
                break;
        }
    },
    GetCheckBox: function(cell){
        if(!cell) return null;
        var chk = this.o.Tag(cell, 'input')[0];
        if(chk.getAttribute('type').LCase() == 'checkbox') return chk;
        else return null;
    },
    SetCheckBoxValue: function(e, cell){
        if(!cell) return;
        var x = this.o.Editable;
        var checkbox = x.GetCheckBox(cell);
        if(!checkbox || checkbox.type.LCase() != 'checkbox') return;
        if(this.o.Event.GetElement(e) != checkbox){//in case user clicks on cell instead of checkbox
            if(checkbox.checked) checkbox.checked = false;
            else checkbox.checked = true;
        }
        var data = !checkbox.checked;
        x.SetCellCache(cell, data, '');
        x.SetModifiedCell(cell);
		if(x.o.autoSave){ x.SubmitAll(); } //checkbox value set straightaway, prevents treatedRows inconsistency
    },
    AddNewRow: function(){
    	var row,
    		rowIdx = this.o.startRow;

    	if(this.o.newRowPos === 'bottom'){
    		rowIdx = -1;
    	}
    	else if(typeof this.o.newRowPos === 'number' &&
    		this.o.newRowPos >= -1){
    		rowIdx = this.o.newRowPos;
    	}

    	try{
	        row = this.o.table.insertRow(rowIdx);
      	} catch(e) {
      		row = this.o.table.insertRow(this.o.startRow);
			console.log(e);
		}
		row.setAttribute('id', this.o.CreateId()); //temp id for new row
        this.o.Css.Add(row, this.o.newRowClass);
        for (var i = 0; i < this.o.nbCells; i++){
            var cell = row.insertCell(i);
            if(this.o.defaultRecord){ cell.innerHTML = this.o.defaultRecord[i]; }
            else { cell.innerHTML = this.o.defaultRecordUndefinedValue; }
        }
        if(this.o.cmdInsertBtnScroll){ row.scrollIntoView(false); }
        this.newRows.push(row);
        if(this.o.onAddedDomRow){ this.o.onAddedDomRow.call(null, this.o, this.newRows, row); }
    },
    SubmitEditedRows: function(){ this.Submit('update'); },
    SubmitAddedRows: function(){ this.SetRowsObject(this.newRows, 'insert'); this.Submit('insert'); },
    SubmitDeletedRows: function(){
        if(this.o.selection){
            if(!this.o.Selection.activeRow && this.o.Selection.selectedRows.length === 0) return;
            var rows = (this.o.bulkDelete) ? this.o.Selection.selectedRows : [this.o.Selection.activeRow];
            if(rows.length === 0){ return; }
            this.SetRowsObject(rows, 'delete');
            if(confirm(this.o.msgConfirmDelSelectedRows)){ this.Submit('delete'); }
            else { this.deletedRows = []; }
        }
    },
	SubmitAll: function(){ this.submitAll = true; this.SubmitAddedRows(); this.SubmitEditedRows(); },
	AutoSubmit: function(){
		switch(this.o.autoSaveType){
			case 'both': this.SubmitAll(); break;
			case 'insert': this.SubmitAddedRows(); break;
			case 'update': default: this.SubmitEditedRows(); break;
		}
	},
    Submit: function(cmd){
        cmd = cmd.LCase();
		var x = this;
        var treatedRows, uri, submitMethod, formMethod, params;
        var beforeSubmitCallBack, afterSubmitCallBack, onSubmit, onSubmitError;
        var checkResponseSanity, processResponse;
        switch ((cmd || '')){
            case 'insert':
                treatedRows = this.GetAddedRows();
                uri = this.o.insertURI;
                submitMethod = this.o.insertSubmitMethod;
                formMethod = this.o.insertFormMethod;
                params = this.o.insertParams;
                beforeSubmitCallBack = this.o.onBeforeInsertSubmit;
                afterSubmitCallBack = this.o.onAfterInsertSubmit;
                onSubmit = this.o.onInsertSubmit;
                onSubmitError = this.o.onInsertError;
                checkResponseSanity = this.o.checkInsertResponseSanity;
                processResponse = this.o.processInsertResponse;
                break;
            case 'delete':
                treatedRows = this.GetDeletedRows();
                uri = this.o.deleteURI;
                submitMethod = this.o.deleteSubmitMethod;
                formMethod = this.o.deleteFormMethod;
                params = this.o.deleteParams;
                beforeSubmitCallBack = this.o.onBeforeDeleteSubmit;
                afterSubmitCallBack = this.o.onAfterDeleteSubmit;
                onSubmit = this.o.onDeleteSubmit;
                onSubmitError = this.o.onDeleteError;
                checkResponseSanity = this.o.checkDeleteResponseSanity;
                processResponse = this.o.processDeleteResponse;
                break;
            case 'update':
            default:
                treatedRows = this.GetModifiedRows();
                uri = this.o.updateURI;
                submitMethod = this.o.updateSubmitMethod;
                formMethod = this.o.updateFormMethod;
                params = this.o.updateParams;
                beforeSubmitCallBack = this.o.onBeforeUpdateSubmit;
                afterSubmitCallBack = this.o.onAfterUpdateSubmit;
                onSubmit = this.o.onUpdateSubmit;
                onSubmitError = this.o.onUpdateError;
                checkResponseSanity = this.o.checkUpdateResponseSanity;
                processResponse = this.o.processUpdateResponse;
                break;
        }
        if(beforeSubmitCallBack){ beforeSubmitCallBack.call(null, this.o, treatedRows); }
        if(onSubmit){ onSubmit.call(null, this.o, treatedRows); }
        else {
            if((!uri || uri === '') && treatedRows.length > 0){
            	alert(cmd.toUpperCase() + ': ' + this.o.msgUndefinedSubmitUrl);
            	treatedRows = []; x.o.savedRowsNb[cmd] = 0;
            	SubmitComplete(false);
            } else {
                for (var i = 0; i < treatedRows.length; i++){
                    var modArr = treatedRows[i], rowIndex = modArr[0], row = modArr[1];
                    if(rowIndex < 0) continue;
                    var rowValues = row.values;
                    var urlParams = row.urlParams, paramParts = urlParams.split('&');
                    var rowId = this.o.table.rows[rowIndex].getAttribute('id');
                    if(params && this.o.IsArray(params)){//params are replaced if defined
                        for (var j = 0; j < params.length; j++){
                            if(params[j] === ''){ continue; }
                            urlParams = urlParams.replace(paramParts[j + 1].split('=')[0], params[j]);
                        }
                        paramParts = urlParams.split('&');
                    }
                    this.o.Css.Add(this.o.table, this.o.activityIndicatorCss);
                    if(this.o.onServerActivityStart) this.o.onServerActivityStart.call(null, this.o, this.o.table.rows[rowIndex]);

                    if(submitMethod === 'script'){//GET method by using script tag inclusion
                        var prm = (uri.indexOf('?') === -1 ? '?rowId=' : '&rowId=') + rowId + urlParams;
                        try {//window.open(uri+prm);
                            this.o.IncludeFile(this.o.prfxScr + rowIndex + '_' + this.o.id, uri + prm,
								function(eg, scriptElm){
								    eg.savedRowsNb[cmd]++; var rIndex = scriptElm.id.replace(eg.prfxScr, '').replace('_' + eg.id, '');
								    eg.Editable.RemoveModifiedCellMark(parseInt(rIndex, 10));
									SubmitComplete(true);
								});
                        } catch (e){
                            this.o.Css.Remove(this.o.table, this.o.activityIndicatorCss);
                            if(this.o.onServerActivityStop) this.o.onServerActivityStop.call(null, this.o, this.o.table.rows[rowIndex]);
                            if(this.o.onSubmitError) this.o.onSubmitError.call(null, this.o, e, e.description);
                            else alert(this.o.msgErrOccur + '\n' + e.description + '\n' + this.o.msgSaveUnsuccess);
                        }
                    }
                    else if(submitMethod !== 'script' && this.o.ajax){
                    	var xhr = (function(rowIndex, arrIndex, rowId, urlParams) {
                    		var _self = this,
                    			div;
                    		// Submit data with intervals
                    		if(arrIndex===0){
                    			submitData(rowId, urlParams, rowIndex, arrIndex);
                    		} else {
								setTimeout(function() {
									submitData(rowId, urlParams, rowIndex, arrIndex); },
									(arrIndex*x.o.formSubmitInterval)
								);
							}

                    		function submitData(rowId, urlParams, rowIndex, arrIndex){
                    			var prm = 'rowId=' + rowId + '&rIndex=' + rowIndex + urlParams;

		                    	$.ajax({
					           		url: uri,
					              	type: formMethod,
					              	data: prm
					            }).done(function(data, status, xhr){
					            	// Determine response content-type
					            	var dataType = xhr.getResponseHeader('content-type') || 'application/json';

					            	if(dataType.indexOf('application/json') !== -1){
						            	var sane = sanityCheck(data);
						            	if(sane){
						            		// Process the response if needed
						            		if(processResponse){
						            			processResponse.call(_self.o, data);
						            		}

											// Ensure id attribute is set for newly created rows, so they can be updated immediately
											if(data.result && data.result.id && cmd === 'insert'){
												if(_self.o.table.rows[rowIndex]){
													_self.o.table.rows[rowIndex].setAttribute('id', _self.o.newRowPrefix + data.result.id);
												}
											}

											release();
										} else {
											fail(null, 'Invalid Data', _self.o.msgInvalidData);
										}
									} else {
										div = _self.o.CreateElm('div', ['id', 'xhr_' + rowIndex + '_' + _self.o.id]);
	                    				document.body.appendChild(div);
										$(div).html(data);
										release();
									}
					            }).always(function(data){
					            	if(div){ document.body.removeChild(div); }
					            }).fail(fail);
				            }

				            function sanityCheck(data) {
				            	if(checkResponseSanity){
				            		return checkResponseSanity.call(_self.o, data);
				            	}
				            	return (data && data.hasOwnProperty('result') &&
										data.result.hasOwnProperty('success') &&
										data.result.hasOwnProperty('id'));
				            }

				            function fail(jqXHR, textStatus, errDesc) {
				            	// remove reference from collection of rows to be treated
	                            if(cmd === 'insert'){
	                            	_self.o.Editable.addedRows.splice(arrIndex, 1);
	                            	_self.o.Editable.newRows.splice(arrIndex, 1);
	                            }
	                            treatedRows.splice(arrIndex, 1);
				            	_self.o.Css.Remove(_self.o.table, _self.o.activityIndicatorCss);
	                            if(_self.o.onServerActivityStop) _self.o.onServerActivityStop.call(null, _self.o, _self.o.table.rows[rowIndex]);
	                            if(_self.o.onSubmitError) _self.o.onSubmitError.call(null, _self.o, e, e.description);
	                            else alert(_self.o.msgErrOccur + '\n' + errDesc + '\n' + _self.o.msgSaveUnsuccess);
				            }

				            function release(){
				            	_self.o.savedRowsNb[cmd]++;
								_self.o.Editable.RemoveModifiedCellMark(rowIndex);
								_self.o.Css.Remove(_self.o.table.rows[rowIndex], _self.o.newRowClass);
								SubmitComplete(true);
				            }
			            }).call(this, rowIndex, i, rowId, urlParams);
                    } else {//GET or POST method by using form and iframe elements
                        if(!this.o.ifrmContainer[cmd]) this.o.ifrmContainer[cmd] = this.o.CreateElm('div', ['id', 'cont_' + this.o.id + cmd], ['style', 'display:none;']);
                        var iframeId = this.o.prfxIFrm + rowIndex + '_' + this.o.id + cmd;
                        var iframe; //below for older versions of IE, name attribute dynamically created problem, very ugly solution...
                        try { var iframe = document.createElement('<iframe src="about:blank" name="' + iframeId + '" id="' + iframeId + '" '+ this.o.attrRowIndex +'="' + rowIndex + '"></iframe>'); }
                        catch (e){ var iframe = this.o.CreateElm('iframe', ['id', iframeId], ['name', iframeId], ['src', 'about:blank'], [this.o.attrRowIndex, rowIndex]); }
                        iframe.style.cssText = 'display:none; width:0; height:0;';

                        var form = this.o.CreateElm( 'form',
							['id', this.o.prfxFrm + rowIndex + '_' + this.o.id + cmd], ['method', formMethod], ['action', uri],
							['target', iframeId], ['accept-charset', 'utf-8'] );
                        for (var j = 1; j < paramParts.length; j++){
                            var paramName = paramParts[j].split('=')[0];
                            var paramValue = paramParts[j].split('=')[1];
                            var hiddenField = this.o.CreateElm('input', ['type', 'hidden'], ['name', paramName], ['value', paramValue]);
                            form.appendChild(hiddenField);
                        }
                        var hiddenField = this.o.CreateElm('input', ['type', 'hidden'], ['name', 'rowId'], ['value', rowId]);
                        form.appendChild(hiddenField);

                        document.body.appendChild(this.o.ifrmContainer[cmd]);
                        this.o.ifrmContainer[cmd].appendChild(iframe);
                        this.o.ifrmContainer[cmd].appendChild(form);
                    }
                } //for i

				if(treatedRows.length > 0 && this.o.ifrmContainer[cmd]){
					var ifrms = this.o.Tag(this.o.ifrmContainer[cmd], 'iframe'),
						frms = this.o.Tag(this.o.ifrmContainer[cmd], 'form');
					for(var j=0; j<ifrms.length; j++){
						(function(k){
							var form = frms[k], iframe = ifrms[k];
							if(k===0){ form.submit(); } //1st form is submitted
							else{ setTimeout(function(){ form.submit(); }, (k*x.o.formSubmitInterval)); } //intervalled submits

							iframe.onload = iframe.onreadystatechange = function(){ //Iframe onload event
								try{
									var rIndex = this.getAttribute(x.o.attrRowIndex),
										iframeDoc = this.contentDocument || (this.contentWindow && this.contentWindow.document);

									if(iframeDoc && iframeDoc.readyState === 'complete'){
										//Below for FF, it doesn't seem to submit multiple forms correctly, this operation needs to be enforced
										if(iframeDoc.location.href === 'about:blank'){
											var form = x.o.Get(this.id.replace(x.o.prfxIFrm, x.o.prfxFrm));
											if(form){ form.submit(); }
										} //form is re-submitted
										else {
											x.o.savedRowsNb[cmd]++;
											x.o.Editable.RemoveModifiedCellMark(rIndex);
											x.o.Css.Remove(x.o.table.rows[rIndex], x.o.newRowClass);
											SubmitComplete(true);
										}
									}
								} catch(e) {
									x.o.Css.Remove(x.o.table, x.o.activityIndicatorCss);
									if(x.o.onServerActivityStop) x.o.onServerActivityStop.call(null, x.o, x.o.table.rows[rowIndex]);
									if(onSubmitError) onSubmitError.call(null, x.o, e, e.description);
									else alert(x.o.msgErrOccur +'\n'+e.description+'\n' + x.o.msgSaveUnsuccess);
								}
							}; //onload
						})(j); //closure
					} // for j
				}
            } //else uri
        }
        function SubmitComplete(verbose){
            if(x.o.savedRowsNb[cmd] === treatedRows.length){
                treatedRows = []; x.o.savedRowsNb[cmd] = 0;
                if(cmd == 'insert'){ x.o.Editable.newRows = []; x.o.Editable.addedRows = []; }
                else if(cmd == 'delete'){
                	if(uri){
	                	var selectedRow = x.o.Selection.GetActiveRow(),
	                		selectedCell = x.o.Selection.GetActiveCell(),
	                		curSlcRowIndex = null, curSlcCellIndex = null, slcRowIndex = null;
	                	if(selectedRow){
	                		curSlcRowIndex = selectedRow.rowIndex;
	                		if(curSlcRowIndex-1 >= x.o.startRow) {
	                			slcRowIndex = curSlcRowIndex-1;
	                		} else {
	                			slcRowIndex = x.o.startRow;
	                		}
	                	}
	                	if(selectedCell){
	                		curSlcCellIndex = selectedCell.cellIndex;
	                	}
	                    x.o.Selection.ClearSelections();
	                	var a = [];
	                	for (var k = 0; k < x.o.Editable.deletedRows.length; k++){
	                		a.push(x.o.Editable.deletedRows[k][0]);
	                	}
	                	a.sort(x.o.Sort.NumDesc); //rows indexes need to be sorted in desc manner for rows deleting operation
	                	for (var k = 0; k < a.length; k++){
	                		x.o.table.deleteRow(a[k]);
	                	}
	                    if(slcRowIndex !== null){
	                    	x.o.Selection.SelectRowByIndex(slcRowIndex);
	                    }
	                    if(curSlcCellIndex !== null){
	                    	if(selectedRow){
	                    		var cell = selectedRow.cells[curSlcCellIndex];
	                    		x.o.Selection.SelectCell(cell);
	                    	}
	                    }
                   	}
                    x.o.Editable.deletedRows = [];
                    x.o.Editable.SetCommandEditor(x.o.editorCmdColIndex);
                }
                else x.o.Editable.modifiedRows = [];
				if(x.o.savedRowsNb.update === 0 && x.o.savedRowsNb.insert === 0 && x.o.savedRowsNb['delete'] === 0){
					if(afterSubmitCallBack){ afterSubmitCallBack.call(null, x.o, treatedRows); }
					else { // message displayed if autosave false
						if(verbose && !x.o.autoSave && (!x.o.Editable.submitAll ||
							(x.o.Editable.submitAll && cmd === 'update'))){
								alert(x.o.msgSubmitOK);
						}
					}
					x.o.Editable.submitAll = false;
				}
                if(x.o.onServerActivityStop) x.o.onServerActivityStop.call(null, x.o, x.o.table.rows[rowIndex]);
                if(submitMethod === 'form' && !x.o.ajax && x.o.ifrmContainer[cmd]){
                	x.o.ifrmContainer[cmd].innerHTML = '';
                }
				x.o.Css.Remove(x.o.table, x.o.activityIndicatorCss);
            }
        }
    },
    Edit: function(e){
        var row, cell;
        if(e && e.type && e.type.LCase().indexOf('click') !== -1){
            row = this.o.GetRow(e);
            cell = this.o.GetCell(e);
        } else {
            if(!this.o.selection) return;
            if(!this.o.Selection.activeRow && !this.o.Selection.activeCell) return;
            row = this.o.Selection.activeRow;
            cell = this.o.Selection.activeCell;
        }
        if(!row || row.rowIndex < this.o.startRow) return;

        if(this.o.editorModel === 'cell' && cell){
            var cellIndex = cell.cellIndex;
            if(!this.activeCellEditor && this.o.editors[cellIndex]){
                if(this.o.IsEditorType(cellIndex, this.o.edtTypes.bool)){
                    this.SetCheckBoxValue(e, cell);
                } else { this.OpenCellEditor(cell); }
            }
        }
        if(this.o.editorModel === 'row' && !this.IsRowEditorOpen()){ this.OpenRowEditor(row); }
    },
    Event: {
        OnInputFocus: function(e){
            var elm = this.o.Event.GetElement(e);
            elm.select();
        },
        OnBlur: function(e){
            var elm = this.o.Event.GetElement(e);
            var colIndex = elm.getAttribute(this.o.attrColIndex);
            if(colIndex === null){
                var cell = this.o.GetElement(e, 'td');
                colIndex = cell.cellIndex;
            }
            if(this.o.editorModel == 'cell'){ this.CloseCellEditor(colIndex); }
        }
    }
};

Selection.prototype = {
	onClickAdded: false, activeRow: null, activeCell: null,	selectedRows: [],
	Init: function(){
		if(!this.o.selection) return;
		this.SetEvents();
		if(this.o.selectRowAtStart){
			this.SelectRowByIndex(this.o.rowIndexAtStart);
			if(this.activeRow) this.SelectCell(this.activeRow.cells[0]);
		}
		if(this.o.onSelectionInit) this.o.onSelectionInit.call(null, this.o);
	},
	Set: function(){
		this.o.selection = true;
		this.o.keyNav = true;
		this.SetEvents();
	},
	Remove: function(){
		this.o.selection = false;
		this.o.keyNav = false;
		this.RemoveEvents();
	},
	SetEvents: function(){
		if(!this.onClickAdded){
			var x = this;
			this.o.Event.Bind(this.o.table, 'click', function(e){ x.OnClick.call(x, e); });
			if(this.o.onValidateRow || this.o.onValidateCell) this.o.Event.Bind(this.o.table, 'dblclick', function(e){ x.OnDblClick.call(x, e); });
			this.onClickAdded = true;
		}
		if(this.o.keyNav){ this.o.Event.Bind(this.o.StandardBody(), 'keydown', function(e){ x.OnKeyDown.call(x, e); }); }
	},
	RemoveEvents: function(){
		if(this.onClickAdded){
			var x = this;
			this.o.Event.Unbind(this.o.table, 'click', function(e){ x.OnClick.call(x, e); });
			if(this.o.onValidateRow || this.o.onValidateCell) this.o.Event.Unbind(this.o.table, 'dblclick', function(e){ x.OnDblClick.call(x, e); });
			this.o.Event.Unbind(this.o.StandardBody(), 'keydown', function(e){ x.OnKeyDown.call(x, e); });
			this.onClickAdded = false;
		}
	},
	GetActiveRow: function(){ return this.activeRow; },
	GetActiveCell: function(){ return this.activeCell; },
	GetSelectedRows: function(){ return this.selectedRows; },
	GetSelectedValues: function(){
		var values = [];
		for(var i=0; i<this.GetSelectedRows().length; i++){
			var row = this.GetSelectedRows()[i];
			var r = this.GetRowValues(row);
			values.push(r);
		}
		return values;
	},
	GetActiveRowValues: function(){
		if(!this.GetActiveRow()) return [];
		return this.GetRowValues(this.GetActiveRow());
	},
	GetRowValues: function(row){
		if(!row) return [];
		var values = [];
		for(var i=0; i<row.cells.length; i++){
			var cell = row.cells[i];
			values.push(this.o.GetText(cell));
		}
		return values;
	},
	SelectRowByIndex: function(rowIndex){
		if(rowIndex === undefined || isNaN(rowIndex)){ rowIndex = 0; }
		var row = this.o.table.rows[rowIndex];
		if(!row){ return; }
		this.SelectRow(row);
	},
	SelectRowsByIndexes: function(rowIndexes){
		if(!this.o.IsArray(rowIndexes)){ return; }
		for(var i=0; i<rowIndexes.length; i++){
			this.SelectRowByIndex(rowIndexes[i]);
		}
	},
	SelectRow: function(row, e){
		if(this.o.defaultSelection == 'cell' || row.rowIndex<0){ return; }
		if(this.o.onBeforeSelectedRow){ this.o.onBeforeSelectedRow.call(null, this.o, row, e); }
		this.o.Css.Remove(this.activeRow, this.o.activeRowCss);
		if(this.o.selectionModel === 'multiple'){
			this.o.Css.Add(row, this.o.selectedRowCss);
			if(this.selectedRows.indexOf(row) == -1) this.selectedRows.push(row);
		}
		this.o.Css.Add(row, this.o.activeRowCss);
		this.activeRow = row;
		et_activeGrid = this.o.id;
		if(this.o.onAfterSelectedRow) this.o.onAfterSelectedRow.call(null, this.o, row, e);
	},
	DeselectRow: function(row, e){
		if(this.o.defaultSelection == 'cell') return;
		if(!this.IsRowSelected(row)) return;
		if(this.o.onBeforeDeselectedRow) this.o.onBeforeDeselectedRow.call(null, this.o, row, e);
		this.o.Css.Remove(row, this.o.activeRowCss);
		this.o.Css.Remove(row, this.o.selectedRowCss);
		if(this.o.selectionModel == 'multiple'){
			for(var i=0; i<this.GetSelectedRows().length; i++){
				var r = this.selectedRows[i];
				if(row == r){
					this.selectedRows.splice(i, 1);
					break;
				}
			}
		}
		this.o.Css.Remove(this.activeRow, this.o.activeRowCss);
		this.activeRow = null;
		if(this.o.onAfterDeselectedRow) this.o.onAfterDeselectedRow.call(null, this.o, row, e);
	},
	SelectCell: function(cell, e){
		if(this.o.defaultSelection == 'row') return;
		if(this.o.onBeforeSelectedCell) this.o.onBeforeSelectedCell.call(null, this.o, cell, e);
		this.o.Css.Add(cell, this.o.activeCellCss);
		this.activeCell = cell;
		try{ if(this.o.defaultSelection == 'cell' && cell.parentNode && cell.parentNode.nodeName.LCase()=='tr')
				this.activeRow = cell.parentNode; } catch(ex){} //ugly try-catch solution for old IE
		et_activeGrid = this.o.id;
		if(this.o.onAfterSelectedCell) this.o.onAfterSelectedCell.call(null, this.o, cell, e);
	},
	DeselectCell: function(cell, e){
		if(this.o.defaultSelection == 'row') return;
		if(this.o.onBeforeDeselectedCell) this.o.onBeforeDeselectedCell.call(null, this.o, cell, e);
		if(this.IsCellSelected(cell)){
			this.o.Css.Remove(cell, this.o.activeCellCss);
			this.activeCell = null;
			if(this.o.defaultSelection == 'cell') this.activeRow = null;
		}
		if(this.o.onAfterDeselectedCell) this.o.onAfterDeselectedCell.call(null, this.o, cell, e);
	},
	ClearSelections: function(){
		var selRow = this.activeRow;
		var selCell = this.activeCell;
		if(selCell) this.DeselectCell(selCell);
		if(selRow) this.DeselectRow(selRow);
		for(var i=0; i<this.GetSelectedRows().length; i++){
			var row = this.selectedRows[i];
			if(this.o.onBeforeDeselectedRow) this.o.onBeforeDeselectedRow.call(null, this.o, row);
			this.o.Css.Remove(row, this.o.selectedRowCss);
			this.o.Css.Remove(row, this.o.activeRowCss);
			if(this.o.onAfterDeselectedRow) this.o.onAfterDeselectedRow.call(null, this.o, row);
		}
		this.selectedRows = [];
	},
	IsRowSelected: function(row){
		if(this.o.selectionModel == 'single'){
			return row == this.activeRow;
		} else {
			for(var i=0; i<this.GetSelectedRows().length; i++){
				var r = this.selectedRows[i];
				if(r == row) return true;
			}
			return false;
		}
	},
	IsCellSelected: function(cell){
		return cell == this.activeCell;
	},
	OnDblClick: function(e){
		var row = this.o.GetRow(e);
		var cell = this.o.GetCell(e);
		if(!row || row.rowIndex < this.o.startRow) return;
		if(!this.o.editable){
			if(this.o.onValidateRow && this.o.defaultSelection != 'cell') this.o.onValidateRow.call(null, this.o, this.activeRow);
			if(this.o.onValidateCell && this.o.defaultSelection != 'row') this.o.onValidateCell.call(null, this.o, this.activeCell);
		}
	},
	OnClick: function(e){
		var row = this.o.GetRow(e);
		var cell = this.o.GetCell(e);
		if(!row || row.rowIndex < this.o.startRow) return;
		if(this.o.autoSave && this.o.autoSaveModel === 'row'){
			if(this.activeRow && this.activeRow.rowIndex !== row.rowIndex){
				this.o.Editable.AutoSubmit();
			}
		}
		if(this.o.selectionModel == 'single'){
			this.ClearSelections();
			this.SelectRow(row);
			this.SelectCell(cell);
		} else {
			if(!this.o.keySelection){
				//Selection keys are disabled, multiple selection is performed with clicks
				if(this.selectedRows.length > 0){
					if(!this.IsRowSelected(row)) this.SelectRow(row);
					else this.DeselectRow(row);
				} else this.SelectRow(row);
			}
			else if(this.o.keySelection && (!e.ctrlKey && !e.shiftKey)){
				this.ClearSelections();
				this.SelectRow(row);
			}
			else if(this.o.keySelection && e.ctrlKey && this.selectedRows.length > 0)
				this.SelectRow(row);
			else if(this.o.keySelection && e.shiftKey && this.selectedRows.length > 0){
				if(!this.activeRow) return;
				var prevRowIndex = this.activeRow.rowIndex;
				this.SelectRow(row);
				var curRowIndex = this.activeRow.rowIndex;
				if(prevRowIndex < curRowIndex){
					for(var i=prevRowIndex+1; i<curRowIndex; i++){
						var r = this.o.table.rows[i];
						if(r){
							if(!this.IsRowSelected(r)) this.SelectRow(r);
							else this.DeselectRow(r);
						}
					}
					if(!this.IsRowSelected(this.o.table.rows[prevRowIndex+1]))
						this.DeselectRow(this.o.table.rows[prevRowIndex]);
				} else {
					for(var i=prevRowIndex-1; i>curRowIndex; i--){
						var r = this.o.table.rows[i];
						if(r){
							if(!this.IsRowSelected(r)) this.SelectRow(r);
							else this.DeselectRow(r);
						}
					}
					if(!this.IsRowSelected(this.o.table.rows[prevRowIndex-1]))
						this.DeselectRow(this.o.table.rows[prevRowIndex]);
				}
				this.SelectRow(row);
			}
			else{ this.SelectRow(row); }
			this.DeselectCell(this.activeCell);
			if(this.IsRowSelected(row)){ this.SelectCell(cell); }
		}

		if(this.o.editable){
			if(this.o.editorModel=='cell'){
				var activeCellEditor = this.o.Editable.activeCellEditor;
				if(!activeCellEditor && cell && this.o.editors[cell.cellIndex]){
					//Boolean is set if cell clicked even if editor action is dblclick
					if(this.o.IsEditorType(cell.cellIndex, this.o.edtTypes.bool) && this.o.openEditorAction==='dblclick'){
						this.o.Editable.SetCheckBoxValue(e, cell);
					}
				}
				//Custom or uploader editor is closed if cell selection changes
				if(activeCellEditor && (this.o.IsEditorType(activeCellEditor.cellIndex, this.o.edtTypes.custom) ||
					this.o.IsEditorType(activeCellEditor.cellIndex, this.o.edtTypes.uploader))
					&& (cell && cell.cellIndex!=activeCellEditor.cellIndex || row.rowIndex!=activeCellEditor.parentNode.rowIndex)){
					this.o.Editable.CloseCellEditor(activeCellEditor.cellIndex);
				}
			}
			if(this.o.editorModel=='row'){
				if(row != this.o.Editable.activeRow) this.o.Editable.CloseRowEditor();
			}
		}
	},
	OnKeyDown: function(e){
		if(!this.activeRow) return;
		var t = this.o.GetTableFromElement(this.activeRow);
		if(!t || t.nodeName.LCase() != 'table' || t['id'] != et_activeGrid) return;
		var keyCode = this.o.Event.GetKey(e);
		var maxRowIndex = (this.o.table.rows.length - 1);
		var nbCells = (this.o.GetCellsNb() - 1);
		var curRowIndex = this.activeRow.rowIndex;
		var rowIndex, cellIndex;

		var x = this;
		var navigate = function(cmd){
			if(!x.activeRow){
				rowIndex = x.o.startRow; cellIndex = 0;
			} else {
				var curCellIndex = (x.activeCell ? x.activeCell.cellIndex : 0);
				if(x.o.selectionModel == 'single' || (x.o.selectionModel == 'multiple' && !e.shiftKey) || !x.o.keySelection) x.ClearSelections();
				else if(x.o.selectionModel == 'multiple' && e.shiftKey) x.DeselectCell(x.activeCell, e);
				cellIndex = curCellIndex;
				if(cmd === 'down') rowIndex = (curRowIndex < maxRowIndex) ? curRowIndex + 1 : maxRowIndex;
				else if(cmd === 'up') rowIndex = (curRowIndex == x.o.startRow) ? x.o.startRow : curRowIndex - 1;
				else if(cmd === 'pgdown') rowIndex = (curRowIndex+x.o.nbRowsPerPage < maxRowIndex) ? curRowIndex + x.o.nbRowsPerPage : maxRowIndex;
				else if(cmd === 'pgup') rowIndex = (curRowIndex-x.o.nbRowsPerPage <= x.o.startRow) ? x.o.startRow : curRowIndex - x.o.nbRowsPerPage;
				else if(cmd === 'home') rowIndex = x.o.startRow;
				else if(cmd === 'end') rowIndex = maxRowIndex;
				else if(cmd === 'right'){
					if(x.o.defaultSelection != 'row'){
						rowIndex = curRowIndex;
						cellIndex = (curCellIndex+1 > nbCells) ? 0 : curCellIndex+1;
						if((curCellIndex+1) > nbCells) rowIndex = (curRowIndex < maxRowIndex) ? curRowIndex + 1 : maxRowIndex;
					} else rowIndex = (curRowIndex < maxRowIndex) ? curRowIndex + 1 : maxRowIndex;
				}
				else if(cmd === 'left'){
					if(x.o.defaultSelection != 'row'){
						rowIndex = curRowIndex;
						cellIndex = (curCellIndex-1 < 0) ? nbCells : curCellIndex-1;
						if(curCellIndex-1 < 0) rowIndex = (curRowIndex == x.o.startRow) ? x.o.startRow : curRowIndex - 1;
					} else rowIndex = (curRowIndex == x.o.startRow) ? x.o.startRow : curRowIndex - 1;
				}
			}
			var row = x.o.table.rows[rowIndex];
			if(x.o.keySelection && e.shiftKey && x.selectedRows.length > 0 && (cmd=='pgdown' || cmd=='pgup' || cmd=='home' || cmd=='end')){
				if(!x.activeRow) return;
				if(curRowIndex < rowIndex){
					for(var i=curRowIndex+1; i<rowIndex; i++){
						var r = x.o.table.rows[i];
						if(r){
							if(!x.IsRowSelected(r)) x.SelectRow(r, e);
							else x.DeselectRow(r, e);
						}
					}
					if(!x.IsRowSelected(x.o.table.rows[curRowIndex+1]))
						x.DeselectRow(x.o.table.rows[curRowIndex], e);
				} else {
					for(var i=curRowIndex-1; i>rowIndex; i--){
						var r = x.o.table.rows[i];
						if(r){
							if(!x.IsRowSelected(r)) x.SelectRow(r, e);
							else x.DeselectRow(r, e);
						}
					}
					if(!x.IsRowSelected(x.o.table.rows[curRowIndex-1]))
						x.DeselectRow(x.o.table.rows[curRowIndex], e);
				}
				x.SelectRow(row, e);
			} else {
				if(x.o.keySelection && e.shiftKey && x.IsRowSelected(row)) x.DeselectRow(x.o.table.rows[curRowIndex], e);
				x.SelectRow(row, e);
			}

			if(x.o.defaultSelection != 'row'){
				var cell = row.cells[cellIndex];
				x.SelectCell(cell, e);
				if(x.o.scrollIntoView) cell.scrollIntoView(false);
			}
			if(x.o.scrollIntoView && x.o.defaultSelection=='row') row.scrollIntoView(false);
			if(x.o.autoSave && x.o.autoSaveModel === 'row'){
				if(rowIndex !== curRowIndex){ x.o.Editable.AutoSubmit(); }
			}
			x.o.Event.Cancel(e);
		};

		var ed = this.o.Editable;
		function closeEditor(){
			if(x.o.editable && ed.activeCellEditor && x.o.editorModel=='cell')
				ed.CloseCellEditor(ed.activeCellEditor.cellIndex);

			if(x.o.editable && ed.activeRow && x.o.editorModel=='row')
				if(ed.activeRow != x.activeRow) ed.CloseRowEditor();
		}

		switch(keyCode){
			case 40: //arrow down
				if(!x.o.editable || (x.o.editable && !ed.activeCellEditor && !ed.activeRow)) navigate('down');
			break;
			case 38: //arrow up
				if(!x.o.editable || (x.o.editable && !ed.activeCellEditor && !ed.activeRow)) navigate('up');
			break;
			case 37: //arrow left
				if(!x.o.editable || (x.o.editable && !ed.activeCellEditor && !ed.activeRow)) navigate('left');
			break;
			case 39: //arrow right
				if(!x.o.editable || (x.o.editable && !ed.activeCellEditor) && !ed.activeRow) navigate('right');
			break;
			case 34: //pagedown
				navigate('pgdown'); closeEditor();
			break;
			case 33: //pageup
				navigate('pgup'); closeEditor();
			break;
			case 36: //home
				navigate('home'); closeEditor();
			break;
			case 35: //end
				navigate('end'); closeEditor();
			break;
			case 9: //tab
				if(e.shiftKey) navigate('left');
				else navigate('right');
				if(x.o.editorModel == 'row'){
					if(x.activeCell && x.selectionModel!='row') ed.SetEditorFocus(x.activeCell.cellIndex);
					if(x.activeRow && ed.activeRow && x.activeRow.rowIndex != ed.activeRow.rowIndex) closeEditor();
				} else{ closeEditor(); }
			break;
			case 13: //enter
				if(!x.o.editable){
					if(!x.o.onValidateRow && !x.o.onValidateCell) navigate('down');
					else{
						if(x.o.onValidateRow && x.o.defaultSelection != 'cell') x.o.onValidateRow.call(null, x.o, x.activeRow);
						if(x.o.onValidateCell && x.o.defaultSelection != 'row') x.o.onValidateCell.call(null, x.o, x.activeCell);
					}
				} else {
					if(!ed.activeCellEditor){ ed.Edit.call(ed, e); x.o.Event.Cancel(e); }
					else
						if(x.o.IsEditorType(ed.activeCellEditor.cellIndex, x.o.edtTypes.input)){ closeEditor(); }
				}
			break;
			case 113: //F2
			case 32: //space bar
				if(x.o.editable && (!ed.activeCellEditor)){ ed.Edit.call(ed, e); x.o.Event.Cancel(e); }
			break;
			case 45: //insert
				if(x.o.editable && (!ed.activeCellEditor)){
					ed.AddNewRow();
					ed.SetCommandEditor(x.o.editorCmdColIndex);
					x.o.Event.Cancel(e);
				}
			break;
			case 46: //delete
				if(x.o.editable && (!ed.activeCellEditor)){ ed.SubmitDeletedRows(); x.o.Event.Cancel(e); }
			break;
			case 27: //escape
				if(x.o.editable && x.o.editorModel == 'cell'){ if(ed.activeCellEditor) closeEditor(); }
				if(x.o.editable && x.o.editorModel == 'row') closeEditor();
			break;
			default: //key stroke opens editor if edition is enabled
				if((x.o.editable && x.o.editableOnKeystroke &&
					x.o.editorModel == 'cell' && x.o.selectionModel == 'single' &&
					!ed.activeCellEditor && !ed.activeRow)){
					ed.Edit.call(ed, e);
					x.o.Event.Cancel(e);
				}
			break;
		}
		if(x.o.editable && x.o.openEditorAction=='click'){ ed.Edit.call(ed, e); }
	}
};//Selection

EditTable.prototype = {
	Init: function(){
		this.Css.Add(this.table, this.tableCss+' '+this.unselectableCss);
		this.Selection.Init();
		this.Editable.Init();
	},
	GetCellsNb: function(rowIndex){
		var tr = (rowIndex === undefined) ? this.table.rows[this.startRow] : this.table.rows[rowIndex];
		return tr.cells.length;
	},
	GetRowsNb: function(){ return this.table.rows.length; },
	GetRow: function(e){ return this.GetElement(e, 'tr'); },
	GetRowByIndex: function(rowIndex){ return this.table.rows[rowIndex]; },
	GetCell: function(e){ return this.GetElement(e, 'td') || this.GetElement(e, 'th'); },
	GetTableFromElement: function(elm){
		if(!elm) return null;
		while(elm.parentNode){
			if(elm.nodeName.UCase() === 'TABLE'){ return elm; }
			elm = elm.parentNode;
		}
		return null;
	},
	GetElement: function(e, tagName){
		var elm, target = this.Event.GetElement(e);
		while(target.parentNode){
			if(target.nodeName.UCase() === tagName.UCase()
				&& this.IsParentValid(target)){
				elm = target; break;
			}
			target = target.parentNode;
		}
		return elm;
	},
	IsParentValid: function(elm){
		while(elm.parentNode){
			if(elm.nodeName.UCase() === 'TABLE'){
				if(elm.id == this.id) return true;
				else return false;
			}
			elm = elm.parentNode;
		}
		return false;
	},
	IsSelectable: function(){ return this.selection; },
	IsEditable: function(){ return this.editable; },
	ClearSelections: function(){ this.Selection.ClearSelections(); },
	IsEditorType: function(colIndex, type){ return this.editorTypes[colIndex] === type; },
	IsObj: function(o){ return (o && o.constructor == Object); },
	IsFn: function(fn){ return (fn && fn.constructor == Function); },
	IsArray: function(a){ return (a && a.constructor == Array); },
	Get: function(id){ return document.getElementById(id); },
	Tag: function(o, tagname){ if(!o){ return null; } else { return o.getElementsByTagName(tagname); } },
	GetText: function(n){
		if(!n){ return ''; }
		var s = n.textContent || n.innerText || n.innerHTML.replace(/\<[^<>]+>/g, '');
		return s.replace(/^\s+/, '').replace(/\s+$/, '').Trim();
	},
	CreateElm: function(tag){
		if(tag===undefined || tag===null || tag==='') return;
		var el = document.createElement(tag);
		if(arguments.length>1){
			for(var i=0; i<arguments.length; i++){
				var argtype = typeof arguments[i];
				if(argtype.LCase() == 'object' && arguments[i].length == 2){
					el.setAttribute(arguments[i][0],arguments[i][1]);
				}
			}
		}
		return el;
	},
	CreateText: function(text){ return document.createTextNode(text); },
	CreateId: function(prefix){ return (prefix || this.newRowPrefix) + new Date().getTime(); },
	StandardBody: function(){
		return (document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
	},
	Css: {
		Has: function(elm,cl){
			if(!elm){ return false; }
			return elm.className.match(new RegExp('(\\s|^)'+cl+'(\\s|$)'));
		},
		Add: function(elm,cl){
			if(!elm){ return; }
			if(!this.Has(elm,cl)){ elm.className += ' '+cl; }
		},
		Remove: function(elm,cl){
			if(!elm){ return; }
			if(!this.Has(elm,cl)){ return; }
			var reg = new RegExp('(\\s|^)'+cl+'(\\s|$)');
			elm.className = elm.className.replace(reg,'');
		}
	},
	Event: {
		evt: {},
		Bind: function(el, type, handler){
			if(!(el in this.evt)){
				this.evt[el] = {};
			}
			if(!(type in this.evt[el])){
				this.evt[el][type] = [];
			}
			this.evt[el][type].push([handler, true]);
			this.Add(el, type, handler);
		},
		Unbind: function(el, type, fn){
			if(el in this.evt){
				var handlers = this.evt[el];
				if(type in handlers){
					var eventHandlers = handlers[type];
					for(var i = eventHandlers.length; i--;){
						var handler = eventHandlers[i];
						if(handler[0].toString()==fn.toString()){
							this.Remove(el, type, handler[0]);
						}
					}
				}
			}
		},
		Add: function(el, type, fn, capture){
			if(el.attachEvent){
				el.attachEvent('on'+type, fn);
			} else if(el.addEventListener){
				el.addEventListener(type, fn, (capture===undefined ? false : capture));
			} else { el['on'+type] = fn; }
		},
		Remove: function(el, type, fn, capture){
			if(el.detachEvent){
				el.detachEvent('on'+type, fn);
			} else if(el.removeEventListener){
				el.removeEventListener(type, fn, (capture===undefined ? false : capture));
			} else { el['on'+type] = null; }
		},
		Get: function(e){ return e || window.event;	},
		GetElement: function(e){
			return (e && e.target) || (event && event.srcElement);
		},
		GetKey: function(e){
			var evt = this.Get(e);
			var key = (evt.charCode) ? evt.charCode:
						((evt.keyCode) ? evt.keyCode: ((evt.which) ? evt.which : 0));
			return key;
		},
		Stop: function(e){
			var evt = this.Get(e);
			if(evt.stopPropagation){ evt.stopPropagation(); }
			else{ evt.cancelBubble = true; }
		},
		Cancel: function(e){
			var evt = this.Get(e);
			if(evt.preventDefault){ evt.preventDefault(); }
			else{ evt.returnValue = false; }
		}
	},
	IncludeFile: function(fileId, filePath, callback, type){
		var ftype = (type===undefined) ? 'script' : type;
		var x = this, isLoaded = false, file;
		var head = this.Tag(document,'head')[0];
		if(ftype.LCase() == 'link'){
			file = this.CreateElm('link', ['id',fileId],['type','text/css'],['rel','stylesheet'],['href',filePath]);
		} else {
			file = this.CreateElm('script', ['id',fileId],['type','text/javascript'],['src',filePath]);
		}
		file.onload = file.onreadystatechange = function(){
		//Browser <> IE onload event works only for scripts, not for stylesheets
			if(!isLoaded &&
				(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')){
				isLoaded = true;
				if(typeof callback === 'function'){
					head.removeChild(file);
					callback.call(null, x, this);
				}
			}
		};
		head.appendChild(file);
	},
	Sort:{
		NumAsc: function(a, b){ return (a-b); },
		NumDesc: function(a, b){ return (b-a); },
		IgnoreCase: function(a, b){
			var x = a.LCase();
			var y = b.LCase();
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
	}
};

if(typeof String.prototype.LCase === 'undefined'){
	String.prototype.LCase = function(){ return this.toLowerCase(); };
}
if(typeof String.prototype.UCase === 'undefined'){
	String.prototype.UCase = function(){ return this.toUpperCase(); };
}
if(typeof String.prototype.Trim === 'undefined'){
	String.prototype.Trim = function(){//optimised by Anthony Maes
		return this.replace(/(^[\s\xA0]*)|([\s\xA0]*$)/g,'');
	};
}
if(typeof String.prototype.RegexpEscape === 'undefined'){
	String.prototype.RegexpEscape = function(){
		var s = this;
		function escape(e){
			a = new RegExp('\\'+e,'g');
			s = s.replace(a,'\\'+e);
		}
		chars = new Array('\\','[','^','$','.','|','?','*','+','(',')','�');
		for(var e=0; e<chars.length; e++) escape(chars[e]);
		return s;
	};
}

if(typeof Array.prototype.indexOf === 'undefined'){
	Array.prototype.indexOf = function(obj, start){
		for (var i = (start || 0), j = this.length; i < j; i++)
			if(this[i] === obj){ return i; }
		return -1;
	};
}

function setEditTable(id){
/*========================================================================
	- Calls EditTable Constructor
	- Params:
		- id: table id (string)
		- startRow (optional): start row index (number)
		- config (optional): configuration object (literal object)
	- Returns EditTable object
========================================================================*/
	if(arguments.length === 0){ return; }
	var et = new EditTable(arguments[0],arguments[1],arguments[2]);
	et.Init();
	return et;
}