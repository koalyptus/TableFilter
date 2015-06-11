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
Find the complete documentation in the [WIKI](https://github.com/koalyptus/TableFilter/wiki).

## Support
* GitHub for reporting bugs and feature requests.

## License
MIT