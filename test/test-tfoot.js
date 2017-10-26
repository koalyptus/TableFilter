
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/'
});
tf.init();

module('Sanity checks');
test('tfoot', function() {
    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    deepEqual(tf.getFiltersRowIndex(), 0, 'Filters row index');
    deepEqual(tf.refRow, 2, 'Reference row index');
    deepEqual(tf.getRowsNb(), 7, 'nb working rows');
    deepEqual(tf.getRowsNb(true), 9, 'nb working rows with headers');
    notEqual(tf.getFilterElement(0), null, 'Filter element for column 0');

    tf.setFilterValue(1, 'Ade');
    tf.filter();

    deepEqual(tf.getValidRows(), [2], 'Filtered row');
    deepEqual(
        tf.getVisibleColumnData(0),
        ['Sydney'],
        'Get data API does not include footer'
    );
    deepEqual(
        tf.getFilteredDataCol(0),
        ['Sydney'],
        'Get data API does not include footer'
    );
});

test('tfoot with paging', function() {
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        paging: { length: 3 }
    });
    tf.init();

    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    deepEqual(tf.getFiltersRowIndex(), 0, 'Filters row index');
    deepEqual(tf.refRow, 2, 'Reference row index');
    deepEqual(tf.getRowsNb(), 7, 'nb working rows');
    deepEqual(tf.getRowsNb(true), 9, 'nb working rows with headers');
    notEqual(tf.getFilterElement(0), null, 'Filter element for column 0');

    tf.setFilterValue(1, 'Ade');
    tf.filter();

    deepEqual(tf.getValidRows(), [2], 'Filtered row');

    deepEqual(tf.getValidRows(), [2], 'Filtered row');
    deepEqual(
        tf.getVisibleColumnData(0),
        ['Sydney'],
        'Get data API does not include footer'
    );
    deepEqual(
        tf.getFilteredDataCol(0),
        ['Sydney'],
        'Get data API does not include footer'
    );

    tf.clearFilters();

    var paging = tf.feature('paging');
    paging.setPage(3);

    deepEqual(tf.getRowDisplay(tf.dom().tFoot.rows[0]), '',
        'Footer row visible');

    deepEqual(tf.getRowDisplay(tf.dom().tFoot.rows[1]), '',
        'Footer row visible');
});

test('tfoot with grid-layout', function() {
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        grid_layout: true
    });
    tf.init();

    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    deepEqual(tf.getFiltersRowIndex(), 1, 'Filters row index');
    deepEqual(tf.refRow, 0, 'Reference row index');
    deepEqual(tf.getRowsNb(), 7, 'nb working rows');
    deepEqual(tf.getRowsNb(true), 7, 'nb working rows with headers');
    notEqual(tf.getFilterElement(0), null, 'Filter element for column 0');

    tf.setFilterValue(1, 'Ade');
    tf.filter();

    deepEqual(tf.getValidRows(), [0], 'Filtered row');

    tf.setFilterValue(1, 'Ade');
    tf.filter();

    deepEqual(tf.getValidRows(), [0], 'Filtered row');
    deepEqual(
        tf.getVisibleColumnData(0),
        ['Sydney'],
        'Get data API does not include footer'
    );
    deepEqual(
        tf.getFilteredDataCol(0),
        ['Sydney'],
        'Get data API does not include footer'
    );

    deepEqual(tf.getRowDisplay(tf.dom().tFoot.rows[0]), '',
        'Footer row visible');

    deepEqual(tf.getRowDisplay(tf.dom().tFoot.rows[1]), '',
        'Footer row visible');
});

module('Tear-down');
test('TableFilter removed', function() {
    tf.clearFilters();
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
