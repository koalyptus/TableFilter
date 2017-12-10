
(function(win, TableFilter){

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_1: 'checklist',
        col_3: 'select',
        custom_options: {
            cols: [1, 3],
            texts: [
                ['Perth', 'Canberra'],
                ['0-0.5', '0.5-1', '1-2', '>2']
            ],
            values: [
                ['rgx:^Perth$', 'rgx:^Canberra$'],
                ['>0 && <=0.5', '>0.5 && <=1', '>1 && <=2', '>2']
            ],
            sorts: [false, false]
        }
    });
    tf.init();

    module('Sanity checks');
    test('Filter type', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(
            tf.getFilterElement(3).nodeName, 'SELECT', 'Expected filter type');
    });

    module('Behaviour');
    test('Filter column with custom filter', function() {
        var flt = tf.getFilterElement(3);
        flt.selectedIndex = flt.options.length-1;
        tf.filter();

        deepEqual(
            tf.getFilteredData().length, 2, 'Expected nb of filtered rows');

        tf.clearFilters();

        deepEqual(
            tf.getFilteredData().length, 7, 'Expected nb of filtered rows');
    });

    test('set filter value with regex', function() {
        // act
        tf.setFilterValue(1, ['rgx:^Canberra$', 'rgx:^Perth$']);
        tf.filter();

        // assert
        deepEqual(
            tf.getFilteredData(),
            [
                [
                    4,
                    [
                        'Sydney',
                        'Canberra',
                        '286',
                        '.6',
                        '4.3'
                    ]
                ], [
                    6,
                    [
                        'Adelaide',
                        'Perth',
                        '2781',
                        '3.1',
                        '38'
                    ]
                ]
            ],
            'expected filtered data');
    });

    test('Paging: filter column with custom filter', function() {
        tf.destroy();
        tf = null;
        tf = new TableFilter('demo', {
            col_3: 'select',
            custom_options: {
                cols: [3],
                texts: [['0-0.5', '0.5-1', '1-2', '>2']],
                values: [['>0 && <=0.5', '>0.5 && <=1', '>1 && <=2', '>2']],
                sorts: [false]
            },
            paging: true,
            paging_length: 3
        });
        tf.init();

        var flt = tf.getFilterElement(3);
        flt.selectedIndex = flt.options.length-1;
        tf.filter();

        deepEqual(
            tf.getFilteredData().length, 2, 'Expected nb of filtered rows');

        tf.clearFilters();

        deepEqual(
            tf.getFilteredData().length, 7, 'Expected nb of filtered rows');

        tf.destroy();
        tf = null;
    });

    test('Grid layout: filter column with custom filter', function() {
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            col_3: 'select',
            custom_options: {
                cols: [3],
                texts: [['0-0.5', '0.5-1', '1-2', '>2']],
                values: [['>0 && <=0.5', '>0.5 && <=1', '>1 && <=2', '>2']],
                sorts: [false]
            },
            grid_layout: true
        });
        tf.init();

        var flt = tf.getFilterElement(3);
        flt.selectedIndex = flt.options.length-1;
        tf.filter();

        deepEqual(
            tf.getFilteredData().length, 2, 'Expected nb of filtered rows');

        tf.clearFilters();

        deepEqual(
            tf.getFilteredData().length, 7, 'Expected nb of filtered rows');

        tf.destroy();
        tf = null;
    });

})(window, TableFilter);
