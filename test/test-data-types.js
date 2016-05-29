(function(win, TableFilter){
    // TODO: add sort to test it with different column types
    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_number_format: [
            null, null, null,
            'EU', 'US', null,
            null, null, null,
            'IpAddress'
        ],
        col_date_type: [
            null, null, null,
            null, null, null,
            'dmy', 'mdy', 'ddmmmyyyy',
            null
        ]
    });
    tf.init();
    window.tf = tf;

    module('Sanity checks');
    test('Data types', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(tf.hasColNbFormat, true, 'Has number column types');
        deepEqual(tf.hasColDateType, true, 'Has date column tyoes');
    });

    module('Data types filtering');
    test('Can filter a column with a string', function() {
        // act
        tf.setFilterValue(0, 'carl');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [14, 18], 'Expected rows');

    });

    test('Can filter a EU formatted number', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(3, '1.836,09');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [6], 'Expected rows');
    });

    test('Can filter a EU formatted number column with a number', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(3, 3876);
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [14], 'Expected rows');
    });

    test('Can filter a EU formatted number column with a number without ' +
        'thousands separator', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(3, '1393,52');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [13], 'Expected rows');
    });

    test('Can filter a EU formatted number column with a number without ' +
        'decimals', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(3, '2.805');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [7], 'Expected rows');
    });

    test('Can filter a US formatted number', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(4, '1,836.09');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [6], 'Expected rows');
    });

    test('Can filter a US formatted number column with a number', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(4, 3876);
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [14], 'Expected rows');
    });

    test('Can filter a US formatted number column with a number without ' +
        'thousands separator', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(4, '1393.52');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [13], 'Expected rows');
    });

    test('Can filter a US formatted number column with a number without ' +
        'decimals', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(4, '2,805');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [7], 'Expected rows');
    });

    test('Can filter a EU formatted date column', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(6, '14/7/1994');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [16], 'Expected rows');
    });

    test('Can filter a EU formatted date column with different date separator',
        function() {
            // setup
            tf.clearFilters();

            // act
            tf.setFilterValue(6, '20-10-97');
            tf.filter();

            // assert
            deepEqual(tf.getValidRows(), [17], 'Expected rows');
        });

    test('Can filter a US formatted date column', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(7, '7/14/1994');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [16], 'Expected rows');
    });

    test('Can filter a US formatted date column with different date separator',
        function() {
            // setup
            tf.clearFilters();

            // act
            tf.setFilterValue(7, '10-20-97');
            tf.filter();

            // assert
            deepEqual(tf.getValidRows(), [17], 'Expected rows');
        });

    test('Can filter a dd-MMM-yyy formatted date column', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(8, '3-Jul-2002');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [8], 'Expected rows');
    });

    test('Can filter a dd-MMM-yyy formatted date column with different date ' +
        'separator', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(8, '25.Mar.2000');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [4], 'Expected rows');
    });

    test('Can filter an IP address column', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(9, '219.115.156.145');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [8], 'Expected rows');
    });

    test('Can filter an IP address column with a truncated IP address',
        function() {
            // setup
            tf.clearFilters();

            // act
            tf.setFilterValue(9, '219.115.15');
            tf.filter();

            // assert
            deepEqual(tf.getValidRows(), [4, 8, 14], 'Expected rows');
        });

    module('Tear-down');
    test('can destroy TableFilter DOM elements', function() {
        tf.destroy();
        deepEqual(tf.isInitialized(), false, 'Filters removed');
    });

})(window, TableFilter);
