(function(win, TableFilter){

    var tf = new TableFilter('demo', 3, {
        base_path: '../dist/tablefilter/',
        filters_row_index: 3,
        headers_row_index: 2
    });
    tf.init();

    module('Sanity checks');
    test('Grouped headers', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(tf.getFiltersRowIndex(), 3, 'Filters row index');
        deepEqual(tf.getHeadersRowIndex(), 2, 'Headers row index');
        deepEqual(tf.getStartRowIndex(), 4, 'Reference row index');
    });

    test('Can perform a search', function() {
        tf.setFilterValue(1, 'Ade');
        tf.filter();
        deepEqual(tf.getValidRows(), [4], 'Filtered row');
    });

    module('Paging');
    test('Sanity checks', function() {
        tf.clearFilters();
        tf.destroy();
        tf = new TableFilter('demo', 3, {
            base_path: '../dist/tablefilter/',
            filters_row_index: 3,
            headers_row_index: 2,
            paging: true,
            paging_length: 3
        });
        tf.init();

        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(tf.getFiltersRowIndex(), 3, 'Filters row index');
        deepEqual(tf.getHeadersRowIndex(), 2, 'Headers row index');
        deepEqual(tf.getStartRowIndex(), 4, 'Reference row index');
    });

    test('Can perform a search', function() {
        tf.setFilterValue(2, '>100');
        tf.filter();

        deepEqual(tf.getValidRows(), [4, 5, 6, 7, 8, 9, 10], 'Filtered rows');
        deepEqual(
            tf.feature('paging').nbPages,
            3,
            'Number of pages for filtered rows'
        );
    });

    module('Pop-up filters');
    test('Sanity checks', function() {
        tf.clearFilters();
        tf.feature('paging').destroy();
        tf.destroy();
        tf = new TableFilter('demo', 3, {
            base_path: '../dist/tablefilter/',
            headers_row_index: 2,
            popup_filters: true
        });
        tf.init();

        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(tf.getHeadersRowIndex(), 3, 'Headers row index');
        deepEqual(tf.getStartRowIndex(), 4, 'Reference row index');
    });

    test('Can perform a search', function() {
        tf.setFilterValue(1, 'Melb');
        tf.filter();

        deepEqual(tf.getValidRows(), [7], 'Filtered rows');
    });

    //Grid-layout currently does not support grouped headers

    module('Tear-down');
    test('TableFilter removed', function() {
        tf.clearFilters();
        tf.destroy();
        deepEqual(tf.hasGrid(), false, 'Filters removed');
    });

})(window, TableFilter);
