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
<table id="tblGridConfig" cellspacing="0" class="mytable filterable">
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
      <td><strong>base_path</strong></td>
      <td>string</td>
      <td><sup>new</sup> defines the path to the script's directory (default: 'TableFilter/')</td>
      <td></td>
      <td><code>var tfConfig = { base_path: 'myDir/' }</code></td>
    </tr>
  <tr> 
      <td><strong>stylesheet</strong></td>
      <td>string</td>
      <td><sup>new</sup> defines the global stylesheet (default: 'filtergrid.css')</td>
      <td></td>
      <td><code>var tfConfig = { stylesheet: 'myDir/myStylesheet.css' }</code></td>
    </tr>
    <tr> 
      <td><strong>fixed_headers</strong></td>
      <td>boolean</td>
      <td>enables / disables fixed headers and table body scrolling (default 
        -false)</td>
      <td>Table needs to have <code>thead</code> and <code>tbody</code> tags 
        defined. Table headers are fixed with a light css solution. It doesn't 
        seem to work on browsers such as Opera and Chrome. In any case, it 
        is not the intent of this script to implement a fully tested solution 
        for generating fixed headers. A simple and easy alternative is to 
        place a table with same number of columns and widths above the data 
        table and use the <strong>external_flt_grid</strong> property to generate 
        filters in the corresponding columns (<strong>external_flt_grid_ids</strong>)! 
        Check this <a href="fixed-headers2.htm" target="_blank">example</a>.</td>
      <td><code>var tfConfig = { fixed_headers: true }</code></td>
    </tr>
    <tr> 
      <td><strong>tbody_height</strong></td>
      <td>number</td>
      <td>defines the height of the table body when fixed headers are enabled 
        (default - 200)</td>
      <td></td>
      <td><code>var tfConfig = { fixed_headers: true, tbody_height: 300 }</code></td>
    </tr>
    <tr> 
      <td><strong>filters_cell_tag</strong></td>
      <td>string</td>
      <td>specifies the tag of the cell containing a filter ('td' / 'th')</td>
      <td></td>
      <td><code>var tfConfig = { filters_cell_tag: 'th' }</code></td>
    </tr>
    <tr> 
      <td><strong>col_width</strong></td>
      <td>array</td>
      <td>this property defines column widths. It accepts an array containing 
        width values (['150px','10%']) </td>
      <td></td>
      <td><code>var tfConfig = { col_width: [&quot;150px&quot;,&quot;15%&quot;,null,null] 
        }</code></td>
    </tr>
    <tr> 
      <td><strong>inf_div_css_class</strong></td>
      <td> string</td>
      <td> defines the css class of div containing paging elements, rows counter 
        etc.</td>
      <td>This div contains the paging elements, subdivided in 3 divs (left, 
        middle and right).</td>
      <td> <code>var tfConfig = { inf_div_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>left_div_css_class</strong></td>
      <td> string</td>
      <td> defines the css class of left div</td>
      <td>This div contains the rows counter</td>
      <td> <code>var tfConfig = { left_div_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>right_div_css_class</strong></td>
      <td> string</td>
      <td> defines the css class of right div</td>
      <td>This div contains the <strong>Clear</strong> button and the results 
        per page drop-down list if paging is enabled</td>
      <td> <code>var tfConfig = { right_div_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>middle_div_css_class</strong></td>
      <td> string</td>
      <td> defines the css class of middle div</td>
      <td>This div contains the pages drop-down list and paging navigation 
        buttons</td>
      <td> <code>var tfConfig = { middle_div_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>flts_row_css_class</strong></td>
      <td> string</td>
      <td> defines the css class of filters row</td>
      <td></td>
      <td><code>var tfConfig = { flts_row_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>flt_css_class</strong></td>
      <td>string</td>
      <td> defines the css class of filters (inputs and selects)</td>
      <td></td>
      <td> <code>var tfConfig = { flt_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>flt_small_css_class</strong></td>
      <td> string</td>
      <td> defines the css class of smaller filters (if validation button 
        is generated in the same column of a filter)</td>
      <td></td>
      <td> <code>var tfConfig = { flt_small_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>flt_multi_css_class</strong></td>
      <td>string</td>
      <td>defines css class of multiple select filters</td>
      <td></td>
      <td> <code>var tfConfig = { flt_multi_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>single_flt_css_class</strong></td>
      <td>string</td>
      <td>defines the css class of the single filter when the <b>single_search_filter</b> property is on</td>
      <td></td>
      <td> <code>var tfConfig = { single_flt_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>highlight_css_class</strong></td>
      <td>string</td>
      <td>defines the css class of highlighted keywords</td>
      <td></td>
      <td><code>var tfConfig = { highlight_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>even_row_css_class</strong></td>
      <td>string</td>
      <td>defines the css class for even rows </td>
      <td></td>
      <td><code>var tfConfig = { even_row_css_class: "myclass" }</code></td>
    </tr>
    <tr> 
      <td><strong>odd_row_css_class</strong></td>
      <td>string</td>
      <td>defines the css class for odd rows </td>
      <td></td>
      <td><code>var tfConfig = { odd_row_css_class: "myclass" }</code></td>
    </tr>
    <tr>
      <td><strong>input_watermark_css_class</strong></td>
      <td>string</td>
      <td>defines the css class of the watermark in input filters (default - 
        fltWatermark) </td>
      <td></td>
      <td><code>var tfConfig = { input_watermark_css_class: "myclass" }</code></td>
    </tr>
    <tr>
      <td><strong>active_columns_css_class</strong></td>
      <td>string</td>
      <td> defines the css class of the active column headers (default - 
        activeHeader) </td>
      <td></td>
      <td><code>var tfConfig = { active_columns_css_class: "myclass" }</code></td>
    </tr>
  </tbody>
</table>


