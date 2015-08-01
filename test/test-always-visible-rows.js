(function(win, TableFilter){
    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        rows_always_visible: [4, 9]
    });
    tf.init();

    module('Sanity checks');
    test('Always visible rows', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter type');
        deepEqual(tf.hasVisibleRows, true, 'Contains always visible rows');
    });

    module('Behaviour');
    tf.setFilterValue(0, 'Hello');
    tf.filter();
    test('for filtered table', function() {
        var alwaysVisibleRow1 = tf.tbl.rows[4];
        var alwaysVisibleRow2 = tf.tbl.rows[9];
        deepEqual(
            tf.getRowDisplay(alwaysVisibleRow1),
            '',
            'Row display for alwaysVisibleRow1'
        );
        deepEqual(
            tf.getRowDisplay(alwaysVisibleRow2),
            '',
            'Row display for alwaysVisibleRow2'
        );
    });

    tf.clearFilters();
    test('after filters are cleared', function() {
        var alwaysVisibleRow1 = tf.tbl.rows[4];
        var alwaysVisibleRow2 = tf.tbl.rows[9];
        deepEqual(
            tf.getRowDisplay(alwaysVisibleRow1),
            '',
            'Row display for alwaysVisibleRow1'
        );
        deepEqual(
            tf.getRowDisplay(alwaysVisibleRow2),
            '',
            'Row display for alwaysVisibleRow2'
        );
    });

    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        rows_always_visible: [4, 9],
        paging: true,
        paging_length: 2
    });
    tf.init();
    var paging = tf.feature('paging');

    module('Behaviour with paging');
    tf.setFilterValue(0, 'Hello');
    tf.filter();
    test('for filtered table', function() {
        var alwaysVisibleRow1 = tf.tbl.rows[4];
        var alwaysVisibleRow2 = tf.tbl.rows[9];
        deepEqual(
            tf.getRowDisplay(alwaysVisibleRow1),
            '',
            'Row display for alwaysVisibleRow1'
        );
        deepEqual(
            tf.getRowDisplay(alwaysVisibleRow2),
            '',
            'Row display for alwaysVisibleRow2'
        );
    });

    tf.clearFilters();
    test('after filters are cleared', function() {
        var alwaysVisibleRow1 = tf.tbl.rows[4];
        var alwaysVisibleRow2 = tf.tbl.rows[9];
        deepEqual(
            tf.getRowDisplay(alwaysVisibleRow1),
            '',
            'Row display for alwaysVisibleRow1'
        );
        deepEqual(
            tf.getRowDisplay(alwaysVisibleRow2),
            '',
            'Row display for alwaysVisibleRow2'
        );
    });

    paging.setPage(2);
    test('after changing pagination page', function() {
        var alwaysVisibleRow1 = tf.tbl.rows[4];
        var alwaysVisibleRow2 = tf.tbl.rows[9];
        deepEqual(
            tf.getRowDisplay(alwaysVisibleRow1),
            '',
            'Row display for alwaysVisibleRow1'
        );
        deepEqual(
            tf.getRowDisplay(alwaysVisibleRow2),
            '',
            'Row display for alwaysVisibleRow2'
        );

        paging.setPage(0);
        tf.destroy();
    });

})(window, TableFilter);
