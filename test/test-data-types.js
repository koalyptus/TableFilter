(function(TableFilter) {
    var id = function (id) { return document.getElementById(id); };

    // TODO: add sort to test it with different column types
    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_types: [
            null, null, null,
            { type: 'formatted-number', decimal: ',', thousands: ','},
            'formatted-number', null,
            { type: 'date', locale: 'fr', },
            { type: 'date', locale: 'en', format: '{dd}-{MM}-{yyyy|yy}' },
            { type: 'date', locale: 'en', format: ['{dd}-{months}-{yyyy|yy}'] },
            'IpAddress',
            {
                type: 'date', locale: 'en',
                format: ['{yyyy|yy}-{MM}-{dd} {HH}:{mm}:{ss}']
            }
        ]
    });
    tf.init();

    module('Sanity checks');
    test('Data types', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(
            tf.hasType(3, ['formatted-number']) &&
            tf.hasType(4, ['formatted-number']),
            true, 'Has number column types'
        );
        deepEqual(
            tf.hasType(6, ['date']) &&
            tf.hasType(7, ['date']) &&
            tf.hasType(8, ['date']),
            true, 'Has date column types'
        );
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

    test('Can filter a formatted number', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(4, '1,836.09');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [6], 'Expected rows');
    });

    test('Can filter a number', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(4, 1836.09);
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [6], 'Expected rows');
    });

    test('Can filter a formatted number column with a number', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(4, 3876);
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [14], 'Expected rows');
    });

    test('Can filter a formatted number column with a number without ' +
        'thousands separator', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(4, '1393.52');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [13], 'Expected rows');
    });

    test('Can filter a formatted number column with a number without ' +
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

    test('Can filter a formatted date column', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(7, '7/14/1994');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [16], 'Expected rows');
    });

    test('Can filter a formatted date column with different date separator',
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

    test('Can filter datetime format', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(10, '2006-06-03 11:59:48');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [8], 'Expected rows');
    });

    test('Can filter datetime format with operator', function() {
        // setup
        tf.clearFilters();

        // act
        tf.setFilterValue(10, '>2006-06-03 11:59:48');
        tf.filter();

        // assert
        deepEqual(tf.getValidRows().length, 7, 'Expected rows');
    });

    module('Locale helpers');
    test('Can get decimal separator for given column from config', function() {
        // act
        var result = tf.getDecimal(3);

        // assert
        deepEqual(result, ',', 'Decimal separator for given column');
    });

    test('Can get decimal separator for given column from global setting',
        function() {
            // act
            var result = tf.getDecimal(1);

            // assert
            deepEqual(result, '.', 'Decimal separator for given column');
        });

    module('Data types filters options sorting');
    test('Can sort date types', function () {
        // setup
        tf.clearFilters();
        tf.destroy();
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            col_6: 'checklist',
            col_7: 'multiple',
            col_8: 'checklist',
            col_10: 'select',
            col_types: [
                null, null, null,
                {type: 'formatted-number', decimal: ',', thousands: ','},
                'formatted-number', null,
                {type: 'date', locale: 'fr',},
                {type: 'date', locale: 'en', format: '{dd}-{MM}-{yyyy|yy}'},
                {
                    type: 'date', locale: 'en',
                    format: ['{dd}-{months}-{yyyy|yy}']
                },
                'IpAddress',
                {
                    type: 'date', locale: 'en',
                    format: ['{yyyy|yy}-{MM}-{dd} {HH}:{mm}:{ss}']
                }
            ],
            sort_filter_options_asc: [6, 7],
            sort_filter_options_desc: [8, 10]
        });

        // act
        tf.init();

        var flt6 = id(tf.fltIds[6]);
        var flt7 = id(tf.fltIds[7]);
        var flt8 = id(tf.fltIds[8]);
        var flt10 = id(tf.fltIds[10]);

        // assert
        deepEqual(
            flt6.getElementsByTagName('li')[1].firstChild.firstChild.value,
            '19/1/1984',
            'First option value for column 6'
        );
        deepEqual(
            flt6.getElementsByTagName('li')[20].firstChild.firstChild.value,
            '3/7/2002',
            'Last option value for column 6'
        );
        deepEqual(
            flt7.options[1].value,
            '1/19/1984',
            'First option value for column 7'
        );
        deepEqual(
            flt7.options[20].value,
            '7/3/2002',
            'Last option value for column 7'
        );
        deepEqual(
            flt8.getElementsByTagName('li')[1].firstChild.firstChild.value,
            '3-Jul-2002',
            'First option value for column 8'
        );
        deepEqual(
            flt8.getElementsByTagName('li')[20].firstChild.firstChild.value,
            '19-Jan-1984',
            'Last option value for column 8'
        );
        deepEqual(
            flt10.options[1].value,
            '03-11-21 12:02:04',
            'First option value for column 10'
        );
        deepEqual(
            flt10.options[19].value,
            '1899-11-27 02:02:04',
            'Last option value for column 10'
        );
    });

    module('Tear-down');
    test('can destroy TableFilter DOM elements', function() {
        tf.destroy();
        deepEqual(tf.isInitialized(), false, 'Filters removed');
    });

})(TableFilter);
