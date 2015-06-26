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

## Documentation
Find the complete documentation in the [WIKI](https://github.com/koalyptus/TableFilter/wiki) section.

## Support
* GitHub for reporting bugs and feature requests.

## License
[MIT](LICENSE.md)


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
            <th>target_id</th>
            <td>string</td>
            <td>defines the id of the container element that will contain the link/button showing / hiding filters row (default - null)</td>
            <td></td>
            <td>
<code>var tfConfig = { 
    extensions: [{ 
        name: 'filtersVisibility' 
        target_id: 'my_container_id'
    }] 
};</code>
            </td>
        </tr>
        <tr>
            <th>enable_icon</th>
            <td>boolean</td>
            <td>enable/disable default icon placed just before the link (default - true)</td>
            <td></td>
            <td>
<code>var tfConfig = { 
    extensions: [{ 
        name: 'filtersVisibility' 
        target_id: 'my_container_id',
        enable_icon: false
    }] 
};</code>
            </td>
        </tr>
        <tr>
            <th>btn_text</th>
            <td>string</td>
            <td>sets the text of the link showing / hiding filters row (default - '')</td>
            <td></td>
            <td>
<code>var tfConfig = { 
    extensions: [{ 
        name: 'filtersVisibility' 
        target_id: 'my_container_id',
        enable_icon: false,
        btn_text: 'Filters'
    }] 
};</code>
            </td>
        </tr>
        <tr>
            <th>btn_filters_row_visibility_html</th>
            <td>string</td>
            <td>defines the HTML of the button showing / hiding filters row (default 
* null) </td>
            <td>note that the 
                        
                <code>onclick</code> event is added automatically 
to the html element and overwrites any eventual 
                        
                <code>onclick</code> 
attribute 
                    
            </td>
            <td>
                <code>var tfConfig = { btn_filters_row_visibility_html: '&lt;button 
class="myCssClass"&gt;Expand/collapse filters&lt;/button&gt;' 
}</code>
            </td>
        </tr>
        <tr>
            <th>btn_filters_row_visibility_css_class</th>
            <td>string</td>
            <td>defines the css class of the link showing / hiding filters row&nbsp;(default 
* 'btnExpClpFlt')</td>
            <td></td>
            <td>
                <code>var tfConfig = { btn_filters_row_visibility_css_class: 'myClass' 
}</code>
            </td>
        </tr>
        <tr>
            <th>filters_row_visibility_css_class</th>
            <td>string</td>
            <td>defines the css class of the container (default - 'expClpFlt')</td>
            <td></td>
            <td>
                <code>var tfConfig = { filters_row_visibility_css_class: 'myClass' 
}</code>
            </td>
        </tr>
        <tr>
            <th>filters_row_visibility_filters_table</th>
            <td>string</td>
            <td>If filters are in a separated table, this is the id of the filters 
table (default - null)</td>
            <td></td>
            <td>
                <code>var tfConfig = { filters_row_visibility_filters_table: 'myTableId' 
}</code>
            </td>
        </tr>
        <tr>
            <th>filters_row_visibility_filters_index</th>
            <td>number</td>
            <td>Only with external filters, this tells the scripts which row contains 
the filters (default - 1)</td>
            <td></td>
            <td>
                <code>var tfConfig = { filters_row_visibility_filters_index: 1 }</code>
            </td>
        </tr>
        <tr>
            <th>filters_row_visibility_at_start</th>
            <td>boolean</td>
            <td>if set false it will hide the filters row at extension first load</td>
            <td></td>
            <td>
                <code>var tfConfig = { filters_row_visibility_at_start: false }</code>
            </td>
        </tr>
        <tr>
            <th>on_before_filters_row_is_displayed</th>
            <td>function</td>
            <td>calls defined function before filters row is displayed</td>
            <td></td>
            <td>
                <code>var tfConfig = { on_before_filters_row_is_displayed: function(o){ 
alert(o.id); }</code>
            </td>
        </tr>
        <tr>
            <th>on_after_filters_row_is_displayed</th>
            <td>function</td>
            <td>calls defined function after filters row is displayed</td>
            <td></td>
            <td>
                <code>var tfConfig = { on_after_filters_row_is_displayed: function(o){ 
alert(o.id); }</code>
            </td>
        </tr>
        <tr>
            <th>on_before_filters_row_is_hidden</th>
            <td>function</td>
            <td>calls defined function before filters row is hidden</td>
            <td></td>
            <td>
                <code>var tfConfig = { on_before_filters_row_is_hidden: function(o){ 
alert(o.id); }</code>
            </td>
        </tr>
        <tr>
            <th>on_after_filters_row_is_hidden</th>
            <td>function</td>
            <td>calls defined function after filters row is hidden</td>
            <td></td>
            <td>
                <code>var tfConfig = { on_after_filters_row_is_hidden: function(o){ 
alert(o.id); }</code>
            </td>
        </tr>
    </tbody>
</table>



