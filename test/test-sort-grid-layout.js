requirejs(['test-config', '../src/tablefilter'], function(config, TableFilter){

    var types = require('types').Types,
        dom = require('dom').Dom;

    var tf = new TableFilter('demo', {
        base_path: '../src/',
        sort: true,
        sort_config: {
            sort_types: ['string','string','number','number','number']
        },
        grid_layout: true,
        on_sort_loaded: startSimple
    });
    tf.init();

    var tf1 = new TableFilter('demo2', {
        base_path: '../src/',
        paging: true,
        sort: true,
        sort_config: {
            sort_types: ['string','string','number','number','number']
        },
        grid_layout: true,
        on_sort_loaded: startPaging
    });
    tf1.init();

    QUnit.start();

    function startSimple(tf){
        var sort = tf.Extensions.sort;

        module('Sanity checks');
        test('Sort extension', function() {
            notEqual(sort, null, 'Sort instanciated');
            deepEqual(sort.stt instanceof SortableTable, true, 'Sort type');
            deepEqual(sort.sorted, false, 'Table not sorted');
        });

        test('Sort behaviour', function() {
            var th = tf.getHeaderElement(0);
            sort.sortByColumnIndex(0);

            deepEqual(sort.sorted, true, 'Table column sorted');
            deepEqual(sort.isPaged, false, 'Table is not paged');
        });

        module('Destroy and re-init');
        test('Remove sort', function() {
            sort.destroy();
            var th = tf.getHeaderElement(0),
                indicator = dom.tag(th, 'img');
            deepEqual(tf.sort, false, 'Sort is removed');
            deepEqual(indicator.length, 0, 'Sort indicator is removed');
        });

    }

    function startPaging(tf){
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
                indicator = dom.tag(th, 'img');

            deepEqual(indicator.length, 1, 'Sort indicator in header element');
        });

        test('Sort behaviour', function() {
            var th = tf.getHeaderElement(0);
            sort.sortByColumnIndex(0);

            deepEqual(sort.sorted, true, 'Table column sorted');
            deepEqual(tf.paging, true, 'Table is paged');
        });

        module('Destroy and re-init');
        test('Remove sort', function() {
            sort.destroy();
            var th = tf.getHeaderElement(0),
                indicator = dom.tag(th, 'img');
            deepEqual(tf.sort, false, 'Sort is removed');
            deepEqual(indicator.length, 0, 'Sort indicator is removed');
        });

    }

});
