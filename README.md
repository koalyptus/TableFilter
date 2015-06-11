TableFilter
===========================

Filter HTML tables data easily

TableFilter is a modernised version of the ``HTML Table Filter generator`` plugin.
This script adds to any html table a "filter by column" feature that enables
users to filter and limit the data displayed within a long table. By default, the script automatically adds a filter grid bar at the top of the desired table.

##Features
* Convert a regular HTML table into an advanced grid component providing:
    * Advanced columns filtering model
    * Sorting and pagination facilities
    * Complete selection model (addon)
    * Extended keyboard navigation (addon)
    * Inline cell or row editing (addon)
    * Row insertion or deleting (addon)
    * And even more behaviors...
* Attach to an existing HTML table
* Integration with any server-side technology as this is a pure client-side
solution
* Callbacks for all events, and delegates for most actions
* Exhaustive documentation and API
* Valuable support provided under a Premium request

##Setup
Copy the ``tablefilter`` directory under ``dist`` and place it at desired location in your project. Then include the bundle js file in your page:
```shell
<script src="path/to/my/scripts/tablefilter/tablefilter.js"></script>
```
Place the following snippet just under the HTML table and always define a ``base_path`` property in the configuration object to reflect the path to the script
```shell
<script>
var tf = new TableFilter('my-table-id', {
    base_path: 'path/to/my/scripts/tablefilter/'
});
tf.init();
</script>
```

##Development
If you are not familiar with ``Grunt`` visit this page: [gruntjs.com/getting-started](http://gruntjs.com/getting-started). Once ``Grunt`` is sorted out you can follow the instructions below. 
Start by installing any dependencies.

```shell
npm install
```
Use the Grunt ``dev`` task to launch a build / watch cycle and start the local
sever on port ``8080``:

```shell
grunt dev
```

Use the ``build`` task to generate a production build:

```shell
grunt build
```

The ``default`` Grunt task will create a production build and also run the
tests:

```shell
grunt
```

To run all the tests:

```shell
grunt test
```

and to run specific test(s):

```shell
grunt test-only:test.html
grunt test-only:test.html,test-sort.html
```

## Support
* GitHub for reporting bugs and feature requests.

## License
MIT

## Documentation

### Configuration

#### Filters appearance
<table>
  <thead>
    <tr> 
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Remarks</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr> 
      <th>base_path</th>
      <td>string</td>
      <td>defines the path to the script's directory (default: 'TableFilter/')</td>
      <td></td>
      <td><code>var tfConfig = { base_path: 'myDir/' }</code></td>
    </tr>
  <tr> 
      <th>stylesheet</th>
      <td>string</td>
      <td>defines the global stylesheet (default: 'filtergrid.css')</td>
      <td></td>
      <td><code>var tfConfig = { stylesheet: 'myDir/myStylesheet.css' }</code></td>
    </tr>
    <tr> 
      <th>filters_cell_tag</th>
      <td>string</td>
      <td>specifies the tag of the cell containing a filter ('td' / 'th')</td>
      <td></td>
      <td><code>var tfConfig = { filters_cell_tag: 'th' }</code></td>
    </tr>
    <tr> 
      <th>col_widths</th>
      <td>array</td>
      <td>this property defines column widths. It accepts an array containing 
        width values (['150px','10%']) </td>
      <td></td>
      <td><code>var tfConfig = { col_widths: [&quot;150px&quot;,&quot;15%&quot;,null,null] 
        }</code></td>
    </tr>
    <tr> 
      <th>inf_div_css_class</th>
      <td> string</td>
      <td> defines the css class of div containing paging elements, rows counter 
        etc.</td>
      <td>This div contains the paging elements, subdivided in 3 divs (left, 
        middle and right).</td>
      <td> <code>var tfConfig = { inf_div_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>left_div_css_class</th>
      <td> string</td>
      <td> defines the css class of left div</td>
      <td>This div contains the rows counter</td>
      <td> <code>var tfConfig = { left_div_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>right_div_css_class</th>
      <td> string</td>
      <td> defines the css class of right div</td>
      <td>This div contains the <strong>Clear</strong> button and the results 
        per page drop-down list if paging is enabled</td>
      <td> <code>var tfConfig = { right_div_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>middle_div_css_class</th>
      <td> string</td>
      <td> defines the css class of middle div</td>
      <td>This div contains the pages drop-down list and paging navigation 
        buttons</td>
      <td> <code>var tfConfig = { middle_div_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>flts_row_css_class</th>
      <td> string</td>
      <td> defines the css class of filters row</td>
      <td></td>
      <td><code>var tfConfig = { flts_row_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>flt_css_class</th>
      <td>string</td>
      <td> defines the css class of filters (inputs and selects)</td>
      <td></td>
      <td> <code>var tfConfig = { flt_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>flt_small_css_class</th>
      <td> string</td>
      <td> defines the css class of smaller filters (if validation button 
        is generated in the same column of a filter)</td>
      <td></td>
      <td> <code>var tfConfig = { flt_small_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>flt_multi_css_class</th>
      <td>string</td>
      <td>defines css class of multiple select filters</td>
      <td></td>
      <td> <code>var tfConfig = { flt_multi_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>single_flt_css_class</th>
      <td>string</td>
      <td>defines the css class of the single filter when the <b>single_search_filter</b> property is on</td>
      <td></td>
      <td> <code>var tfConfig = { single_flt_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>highlight_css_class</th>
      <td>string</td>
      <td>defines the css class of highlighted keywords</td>
      <td></td>
      <td><code>var tfConfig = { highlight_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>even_row_css_class</th>
      <td>string</td>
      <td>defines the css class for even rows </td>
      <td></td>
      <td><code>var tfConfig = { even_row_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <th>odd_row_css_class</th>
      <td>string</td>
      <td>defines the css class for odd rows </td>
      <td></td>
      <td><code>var tfConfig = { odd_row_css_class: "myclass" }</code></td>
    </tr>
    <tr>
      <th>input_watermark_css_class</th>
      <td>string</td>
      <td>defines the css class of the watermark in input filters (default - 
        fltWatermark) </td>
      <td></td>
      <td><code>var tfConfig = { input_watermark_css_class: "myclass" }</code></td>
    </tr>
    <tr>
      <th>active_columns_css_class</th>
      <td>string</td>
      <td> defines the css class of the active column headers (default - 
        activeHeader) </td>
      <td></td>
      <td><code>var tfConfig = { active_columns_css_class: "myclass" }</code></td>
    </tr>
  </tbody>
</table>

####Features and behaviours
<table>
  <thead>
    <tr> 
      <th >Property</th>
      <th >Type</th>
      <th >Description</th>
      <th >Remarks</th>
      <th >Example</th>
    </tr>
  </thead>
  <tbody>
    <tr> 
      <th>grid</th>
      <td>boolean</td>
      <td>enables / disables filters generation (default - true) </td>
      <td></td>
      <td><code>var tfConfig = { grid: false }</code></td>
    </tr>
    <tr> 
      <th>col_{n}</th>
      <td>string</td>
      <td>generates a filter type in specified column 
        (replace &quot;{n}&quot; by column index). Possible 
        values: &quot;input&quot;, &quot;select&quot;, 
        &quot;multiple&quot;, &quot;checklist&quot;, &quot;none&quot; 
        (default: &quot;input&quot;)</td>
      <td></td>
      <td><code> var tfConfig = { col_2: &quot;none&quot;, col_3: &quot;select&quot;, col_4: &quot;multiple&quot;, 
        col_5: &quot;checklist&quot;}</code></td>
    </tr>
    <tr> 
      <th>filters_row_index</th>
      <td>number</td>
      <td>this property defines in which row the filters grid will be generated: 
        <strong>0</strong> (before table headers) or <strong>1</strong> (after 
        table headers)</td>
      <td></td>
      <td><code>var tfConfig = { filters_row_index: 1 }</code></td>
    </tr>
    <tr> 
      <th>enter_key</th>
      <td>boolean</td>
      <td> enables / disables &quot;enter&quot; key for validation (default 
        * true) </td>
      <td></td>
      <td><code>var tfConfig = { enter_key: false }</code></td>
    </tr>
    <tr> 
      <th>on_before_filter</th>
      <td>function</td>
      <td>Callback fired before filtering starts</td>
      <td></td>
      <td><code>var tfConfig = { on_before_filter: function(o){ alert('Calls 
        function before filtering starts!!!'); }</code></td>
    </tr>
    <tr> 
      <th>on_after_filter</th>
      <td>function</td>
      <td>Callback fired after filtering is completed</td>
      <td></td>
      <td><code>var tfConfig = { on_after_filter: function(o){ alert('Calls 
        function after filtering process!!!'); }</code></td>
    </tr>
    <tr> 
      <th>on_filters_loaded</th>
      <td>function</td>
      <td>Callback fired after filters instantiation</td>
      <td></td>
      <td><code>var tfConfig = { on_filters_loaded: function(o){ alert('Calls 
        function after filters generation!!!'); }</code></td>
    </tr>
    <tr> 
      <th>on_before_operation</th>
      <td>function</td>
      <td>Callback fired before column operations are performed (default 
        * null)</td>
      <td></td>
      <td><code>var tfConfig = { on_before_operation: function(o){ alert('Calls 
        function before column operations are performed!!!'); }</code></td>
    </tr>
    <tr> 
      <th>on_after_operation</th>
      <td>function</td>
      <td>Callback fired after column operations are performed (default 
        * null)</td>
      <td></td>
      <td><code>var tfConfig = { on_after_operation: function(o){ alert('Calls 
        function after column operations are performed!!!'); }</code></td>
    </tr>
    <tr> 
      <th>on_row_validated</th>
      <td>function</td>
      <td>Callback fired after a row is validated (default - null)</td>
      <td><p>note that 2 parameters are sent to the callback:</p>
        <ul>
          <li>o is the current TF object</li>
          <li>k is the current row index</li>
        </ul></td>
      <td><code>var tfConfig = { on_row_validated: function(o, k){ alert('Calls 
        function after a row is validated!!! Validated row nb = '+k ); }</code></td>
    </tr>
    <tr> 
      <th>custom_cell_data_cols</th>
      <td>array</td>
      <td> specifies the columns that will use the <strong>custom_cell_data</strong> delegate (default - [])</td>
      <td></td>
      <td><code>var tfConfig = { custom_cell_data_cols: [0,2,3] };</code></td>
    </tr>
    <tr> 
      <th>custom_cell_data</th>
      <td>function</td>
      <td>Custom delegate function retrieving cell data (default - null)</td>
      <td><p>3 parameters are sent to the function:</p>
        <ul>
          <li>o is the current TF object</li>
          <li>cell is the current cell from which data is retrieved</li>
          <li>index is the current column index</li>
        </ul>
       </td>
      <td><code>var tfConfig = { custom_cell_data: function(o,cell,index){ 
        alert('Calls function when cell data is retrieved!!!'); }</code></td>
    </tr>
    <tr> 
      <th>exact_match</th>
      <td>boolean</td>
      <td>if set true, only exact matches will be displayed (default - false)</td>
      <td>note that this is case insensitive</td>
      <td><code>var tfConfig = { exact_match: true }</code></td>
    </tr>
    <tr> 
      <th>case_sensitive</th>
      <td>boolean</td>
      <td> if set true terms matching become case sensitive (default - false) </td>
      <td></td>
      <td><code>var tfConfig = { case_sensitive: true }</code></td>
    </tr>
    <tr> 
      <th>alternate_rows</th>
      <td>boolean</td>
      <td>if set true, it enables alternating rows background color (default 
        * false) </td>
      <td></td>
      <td><code>var tfConfig = { alternate_rows: true }</code></td>
    </tr>
    <tr> 
      <th>rows_always_visible</th>
      <td>array</td>
      <td>this property makes desired rows always visible. It accepts an array 
        definining the row indexes to be displayed ([1,2,3..]) </td>
      <td>since rows are always visible, cells value will not appear in corresponding 
        drop-down filters. Note that this property works only if paging is 
        disabled</td>
      <td><code>var tfConfig = { rows_always_visible: [9,10] }</code></td>
    </tr>
    <tr> 
      <th>refresh_filters</th>
      <td>boolean</td>
      <td> if set true this property modifies the filtering behaviour: drop-down 
        menus are refreshed and display only the visible options (default 
        * false).</td>
      <td></td>
      <td><code>var tfConfig = { refresh_filters: true }</code></td>
    </tr>
    <tr> 
      <th>disable_excluded_options</th>
      <td>boolean</td>
      <td> When refresh_filters is enabled, if set true this property disables the excluded options (default 
        * false).</td>
      <td>This feature was suggested by <a href="http://www.zehnplus.ch" target="_blank">zehnplus</a>.</td>
      <td><code>var tfConfig = { refresh_filters: true, disable_excluded_options: true }</code></td>
    </tr>
    <tr> 
      <th>auto_filter</th>
      <td>boolean</td>
      <td>if set true this property enables the 'filter as you type' behaviour 
        (default - false)</td>
      <td>table is filtered when user stops typing</td>
      <td><code>var tfConfig = { auto_filter: true }</code></td>
    </tr>
    <tr> 
      <th>auto_filter_delay</th>
      <td>number</td>
      <td>defines the filtering delay in milliseconds (default - 900)</td>
      <td>when user stops typing, table is filtered after defined delay</td>
      <td><code>var tfConfig = { auto_filter: true, auto_filter_delay: 1500 }</code></td>
    </tr>
    <tr> 
      <th>highlight_keywords</th>
      <td>boolean</td>
      <td>if set true this property enables keywords highlighting (default 
        * false) </td>
      <td></td>
      <td><code>var tfConfig = { highlight_keywords: true }</code></td>
    </tr>
    <tr> 
      <th>remember_grid_values</th>
      <td>boolean</td>
      <td> if set true this property will re-set filters' values at page reload 
        (default - false)</td>
      <td></td>
      <td><code>var tfConfig = { remember_grid_values: true }</code></td>
    </tr>
    <tr> 
      <th>remember_page_number</th>
      <td> boolean</td>
      <td> if set true this property will re-set the last accessed page at 
        page reload (default - false)</td>
      <td>&nbsp; </td>
      <td><code>var tfConfig = { remember_page_number: true }</code></td>
    </tr>
    <tr> 
      <th>remember_page_length</th>
      <td>boolean</td>
      <td>if set true this property will re-set the number of results per 
        page at page re-load (default - false)</td>
      <td></td>
      <td><code>var tfConfig = { remember_page_length: true }</code></td>
    </tr>
    <tr> 
      <th>single_search_filter</th>
      <td>boolean</td>
      <td>if set true this property enables a single criteria search. Only 
        1 text-box filter will be displayed (single criteria search vs. multi-criteria 
        search) searching in all table columns (default - false) </td>
      <td></td>
      <td><code>var tfConfig = { single_search_filter: true }</code></td>
    </tr>
    <tr> 
      <th>external_flt_grid</th>
      <td>boolean</td>
      <td>if set true this property enables filters generation in desired 
        container elements (default - false)</td>
      <td><p>Check this <a href="external-grid.htm" target="_blank">example</a>.</p></td>
      <td><code>var tfConfig = { external_flt_grid: true }</code> </td>
    </tr>
    <tr> 
      <th>external_flt_grid_ids</th>
      <td>array</td>
      <td>this array contains the id of the elements that will contain the 
        generated filters. The indexes of the array items match the indexes 
        ot the columns of the table ( ['id0','id1','id02'] corresponds to 
        col0, col1, col2) (default - null)</td>
      <td>&nbsp; </td>
      <td><code>var tfConfig = { external_flt_grid_ids: ['id0','id1','id2'] 
        }</code> </td>
    </tr>
    <tr> 
      <th>toolbar_target_id</th>
      <td>string</td>
      <td> defines the id of the element that will contain the 
        toolbar container, located above the table headers by default (default 
        * null)</td>
      <td></td>
      <td><code>var tfConfig = { toolbar_target_id: 'myContainerId' };</code></td>
    </tr>
    <tr> 
      <th>status</th>
      <td>boolean</td>
      <td>if set true this property displays status messages in the browser's 
        status bar </td>
      <td></td>
      <td><code>var tfConfig = { status: true }</code></td>
    </tr>
    <tr> 
      <th>or_operator</th>
      <td>string</td>
      <td>defines the <strong>or </strong>operator that enables multiple keywords 
        searches on a column (default - '||')</td>
      <td></td>
      <td><code>var tfConfig = { or_operator: ',' }</code></td>
    </tr>
    <tr> 
      <th>exec_delay</th>
      <td>number</td>
      <td>sets the delay in msecs of filtering process if loader set true 
        (default - 100)</td>
      <td></td>
      <td><code>var tfConfig = { exec_delay: 250 }</code></td>
    </tr>
    <tr> 
      <th>set_cookie_duration</th>
      <td>number</td>
      <td>sets the cookie duration in mms (default - 100000)</td>
      <td></td>
      <td><code>var tfConfig = { set_cookie_duration: 250000 }</code></td>
    </tr>
    <tr>
      <th>enable_icons</th>
      <td>boolean</td>
      <td> it makes the toolbar icons visible by default, paging 
        and clear filters button (default - true)</td>
      <td>Makes the configuration object a little bit less verbose</td>
      <td><code>var tfConfig = { enable_icons: false }</code></td>
    </tr>
    <tr> 
      <th>input_watermark</th>
      <td>string</td>
      <td> defines the watermark text for input type filters (default - '')</td>
      <td>Same text is set in all input filters</td>
      <td><code>var tfConfig = { input_watermark: 'Search...' }</code></td>
    </tr>
    <tr> 
      <th>watermark</th>
      <td>array or string</td>
      <td> if used as an array, a different text can be defined for each input 
        filter (default - '')</td>
      <td></td>
      <td><code>var tfConfig = { watermark: ['Search...', null, 'Dates 
        here...'] }</code></td>
    </tr>
    <tr> 
      <th>mark_active_columns</th>
      <td>boolean</td>
      <td> column headers are highlighted upon filtering(default 
        * false) </td>
      <td></td>
      <td><code>var tfConfig = { mark_active_columns: true }</code></td>
    </tr>
    <tr> 
      <th>on_before_active_column</th>
      <td>function</td>
      <td>Callback fired before column header is marked as 
      active (default - null)</td>
      <td> note that 2 parameters are sent to the function: 
        <ul>
          <li>o is the current TF object</li>
          <li>the current index of filtered column</li>
        </ul></td>
      <td><code>var tfConfig = { on_before_active_column: function(o, colIndex){ 
        alert(colIndex); } }</code></td>
    </tr>
    <tr> 
      <th>on_after_active_column</th>
      <td>function</td>
      <td>Callback fired after column header is marked as 
      active (default - null)</td>
      <td> note that 2 parameters are sent to the function: 
        <ul>
          <li>o is the current TF object</li>
          <li>the current index of filtered column</li>
        </ul></td>
      <td><code>var tfConfig = { on_after_active_column: function(o, colIndex){ 
        alert(colIndex); } }</code></td>
    </tr>
  </tbody>
</table>






