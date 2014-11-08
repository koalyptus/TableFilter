(function(TableFilter){

    var tf = new TableFilter('demo');
    tf.init();

    module("Sanity check tests");
    test("TableFilter object", function() {
        equal(tf.id, 'demo', 'id check');
        equal(tf.filtersRowIndex, 0, 'Filters row index');
        deepEqual(tf.fltCol.length, 5, 'filters type collection length');
    });

    module('DOM tests');
    test('Filters row', function() {
        equal(tf.tbl.rows[0].className, 'fltrow', 'Filters row CSS class name');
        equal(tf.GetFilterElement(0).nodeName, 'INPUT', 'Filter DOM element');
    });

})(TableFilter);