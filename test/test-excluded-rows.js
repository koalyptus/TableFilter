(function(win, TableFilter){
    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        exclude_rows: [4, 9]
    });
    tf.init();

    module('Sanity checks');
    test('Excluded rows', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter type');
        deepEqual(tf.hasExcludedRows, true, 'Has excluded rows');
        deepEqual(tf.excludeRows, [4, 9], 'Excluded rows');
    });

    module('Behaviour');
    test('for filtered table', function() {
        tf.setFilterValue(0, 'Hello');
        tf.filter();
        var excludedRow1 = tf.dom().rows[4];
        var excludedRow2 = tf.dom().rows[9];
        deepEqual(
            tf.getRowDisplay(excludedRow1),
            '',
            'Row display for excludedRow1'
        );
        deepEqual(
            tf.getRowDisplay(excludedRow2),
            '',
            'Row display for excludedRow2'
        );
    });

    test('after filters are cleared', function() {
        tf.clearFilters();
        var excludedRow1 = tf.dom().rows[4];
        var excludedRow2 = tf.dom().rows[9];
        deepEqual(
            tf.getRowDisplay(excludedRow1),
            '',
            'Row display for excludedRow1'
        );
        deepEqual(
            tf.getRowDisplay(excludedRow2),
            '',
            'Row display for excludedRow2'
        );

        testPaging();
    });

    function testPaging(){
        tf.destroy();
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            exclude_rows: [4, 9],
            paging: {
                length: 2
            }
        });
        tf.init();
        var paging = tf.feature('paging');

        module('Behaviour with paging');
        test('for filtered table', function() {
            tf.setFilterValue(0, 'Hello');
            tf.filter();
            var excludedRow1 = tf.dom().rows[4];
            var excludedRow2 = tf.dom().rows[9];
            deepEqual(
                tf.getRowDisplay(excludedRow1),
                '',
                'Row display for excludedRow1'
            );
            deepEqual(
                tf.getRowDisplay(excludedRow2),
                '',
                'Row display for excludedRow2'
            );
        });

        test('after filters are cleared', function() {
            tf.clearFilters();
            var excludedRow1 = tf.dom().rows[4];
            var excludedRow2 = tf.dom().rows[9];
            deepEqual(
                tf.getRowDisplay(excludedRow1),
                'none',
                'Row display for excludedRow1'
            );
            deepEqual(
                tf.getRowDisplay(excludedRow2),
                'none',
                'Row display for excludedRow2'
            );
        });

        test('after changing pagination page', function() {
            paging.setPage(2);
            var excludedRow1 = tf.dom().rows[4];
            var excludedRow2 = tf.dom().rows[9];
            deepEqual(
                tf.getRowDisplay(excludedRow1),
                '',
                'Row display for excludedRow1'
            );
            deepEqual(
                tf.getRowDisplay(excludedRow2),
                'none',
                'Row display for excludedRow2'
            );

            tf.destroy();
        });
    }

})(window, TableFilter);
