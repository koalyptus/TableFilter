(function(win, TableFilter) {

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/'
    });
    tf.init();

    module("Sanity checks");
    test("TableFilter object", function() {
        equal(tf.id, 'demo', 'id check');
        equal(tf.filtersRowIndex, 0, 'Filters row index');
        deepEqual(tf.getCellsNb(), 5, 'filters type collection length');
    });

    module('DOM tests');
    test('Filters row', function() {
        equal(tf.tbl.rows[0].className, 'fltrow', 'Filters row CSS class name');
        equal(tf.getFilterElement(0).nodeName, 'INPUT', 'Filter DOM element');
    });

})(window, TableFilter);
