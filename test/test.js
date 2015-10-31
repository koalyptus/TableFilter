(function(win, TableFilter) {

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/'
    });
    tf.init();

    module("Table 1: sanity checks");
    test("TableFilter object", function() {
        equal(tf.id, 'demo', 'id check');
        equal(tf.filtersRowIndex, 0, 'Filters row index');
        deepEqual(tf.getCellsNb(), 5, 'filters type collection length');
    });

    module('Table 1: DOM tests');
    test('Filters row', function() {
        equal(tf.tbl.rows[0].className, 'fltrow', 'Filters row CSS class name');
        equal(tf.getFilterElement(0).nodeName, 'INPUT', 'Filter DOM element');
    });


    var tf1 = new TableFilter(
        document.querySelector('.test'),
        {
            base_path: '../dist/tablefilter/',
            filters_row_index: 1
        }
    );
    tf1.init();

    module("Table 2: sanity checks");
    test("TableFilter object", function() {
        notEqual(tf1.id, null, 'id check');
        equal(tf1.filtersRowIndex, 1, 'Filters row index');
        deepEqual(tf1.getCellsNb(), 5, 'filters type collection length');
    });

    module('Table 2: DOM tests');
    test('Filters row', function() {
        equal(
            tf1.tbl.rows[1].className,
            'fltrow',
            'Filters row CSS class name'
        );
        equal(tf1.getFilterElement(0).nodeName, 'INPUT', 'Filter DOM element');
    });

})(window, TableFilter);
