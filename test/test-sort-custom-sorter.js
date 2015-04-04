requirejs(['test-config', '../src/tablefilter'], function(config, TableFilter){

    var types = require('types').Types,
        dom = require('dom').Dom;

    var tf = new TableFilter('demo', {
        base_path: '../src/',
        sort: true,
        sort_config: {
            sort_types:[
                'String',
                'enforceinteger',
                'String',
                'String',
                'EU',
                'US',
                'String',
                'dmydate',
                'mdydate'
            ]
        },
        on_sort_loaded: function(tf, sort){
            sort.addSortType('enforceinteger', customIntegerSorter);
            startTest(tf);
        }
    });

    //Custom sorter function
    function customIntegerSorter(val){
        var m = val.match(/\d+/);
        return parseInt(m[0], 10);
    }

    tf.init();

    QUnit.start();

    function startTest(tf){
        var sort = tf.Extensions.sort;

        module('Sanity checks');
        test('Sort extension', function() {
            notEqual(sort, null, 'Sort instanciated');
            deepEqual(sort.stt instanceof SortableTable, true, 'Sort type');
            deepEqual(sort.sorted, false, 'Table not sorted');
        });

        module('UI elements');
        test('Sort UI elements', function() {
            var th = tf.getHeaderElement(0),
                indicator = dom.tag(th, 'img'),
                validRows = tf.getValidRowsIndex(true);

            deepEqual(indicator.length, 1, 'Sort indicator in header element');
            deepEqual(
                dom.getText(tf.tbl.rows[validRows[0]].cells[1]),
                'AUY78',
                'First custom key cell text before sorting');
        });

        test('Sort behaviour', function() {
            var th = tf.getHeaderElement(1),
                validRows = tf.getValidRowsIndex();
            sort.sortByColumnIndex(1);

            deepEqual(sort.sorted, true, 'Table column sorted');
            deepEqual(
                dom.getText(tf.tbl.rows[validRows[0]].cells[1]),
                'QT1',
                'First custom key cell text after sorting');
        });

        // module('Destroy and re-init');
        // test('Remove sort', function() {
        //     sort.destroy();
        //     var th = tf.getHeaderElement(0),
        //         indicator = dom.tag(th, 'img');
        //     deepEqual(tf.sort, false, 'Sort is removed');
        //     deepEqual(indicator.length, 0, 'Sort indicator is removed');
        // });

    }

});
